"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var object_hash_1 = require("object-hash");
var uri_js_1 = require("uri-js");
var Schema_1 = require("../Schema");
var ThingSet_1 = require("./ThingSet");
var ThingSet_2 = require("./ThingSet");
exports.ThingSet = ThingSet_2.ThingSet;
var ThingDataNode_1 = require("./ThingDataNode");
exports.ThingDataNode = ThingDataNode_1.ThingDataNode;
var topicPrefixes = {
    chatmsg: 'chat:',
    comment: 'comments:'
};
var soulToId = R.compose(R.propOr('', 'thingId'), Schema_1.Schema.Thing.route.match.bind(Schema_1.Schema.Thing.route));
var soulsToIds = R.map(soulToId);
var index = R.curry(function (peer, thingId, data) {
    if (!data.topic && !data.opId)
        return;
    if (data.opId && !data.topic) {
        peer.gun
            .get(Schema_1.Schema.Thing.route.reverse({ thingId: data.opId }))
            .get('data')
            .on(function recv(td) {
            if (!td)
                return;
            index(peer, thingId, __assign({}, data, { topic: td.topic || 'all' }));
            this.off();
        });
        return;
    }
    var thing = peer.gun.get(Schema_1.Schema.Thing.route.reverse({ thingId: thingId }));
    var dayStr = ThingSet_1.ThingSet.dayStr(data.timestamp);
    var _a = dayStr.split('/'), year = _a[0], month = _a[1], day = _a[2];
    var topicPrefix = R.propOr('', data.kind || '', topicPrefixes);
    var baseTopicName = data.topic.toLowerCase().trim();
    var topicName = topicPrefix + baseTopicName;
    var topic = peer.gun.get(Schema_1.Schema.Topic.route.reverse({ topicName: topicName }));
    var topicDay = peer.gun.get(Schema_1.Schema.TopicDay.route.reverse({ topicName: topicName, year: year, month: month, day: day }));
    if (!data.skipAll && data.topic !== 'all') {
        var allname = topicPrefix + "all";
        var allTopic = peer.gun.get(Schema_1.Schema.Topic.route.reverse({ topicName: allname }));
        var allTopicDay = peer.gun.get(Schema_1.Schema.TopicDay.route.reverse({
            topicName: allname,
            year: year,
            month: month,
            day: day
        }));
        allTopic.set(thing);
        allTopicDay.set(thing);
    }
    if (data.kind === 'submission') {
        var urlInfo = data.url ? uri_js_1.parse(data.url) : {};
        var domainName = (data.url
            ? (urlInfo.host || urlInfo.scheme || '').replace(/^www\./, '')
            : "self." + data.topic).toLowerCase();
        var domain = peer.gun.get(Schema_1.Schema.Domain.route.reverse({ domainName: domainName }));
        domain.set(thing);
        if (data.url) {
            var urlNode = peer.gun.get(Schema_1.Schema.URL.route.reverse({ url: data.url }));
            // thing.get("url").put(urlNode);
            urlNode.set(thing);
        }
    }
    if (data.opId) {
        var allcomments = peer.gun.get(Schema_1.Schema.ThingAllComments.route.reverse({ thingId: data.opId }));
        allcomments.set(thing);
    }
    if (data.replyToId || data.opId) {
        var comments = peer.gun.get(Schema_1.Schema.ThingComments.route.reverse({
            thingId: data.replyToId || data.opId
        }));
        comments.set(thing);
    }
    topic.set(thing);
    topicDay.set(thing);
});
var put = R.curry(function (peer, data) {
    data.timestamp = data.timestamp || new Date().getTime(); // eslint-disable-line
    var originalHash = object_hash_1.default(data);
    var timestamp = data.timestamp, kind = data.kind, topic = data.topic, authorId = data.authorId, opId = data.opId, replyToId = data.replyToId;
    var thingId = object_hash_1.default({
        timestamp: timestamp,
        kind: kind,
        topic: topic,
        authorId: authorId,
        opId: opId,
        replyToId: replyToId,
        originalHash: originalHash
    });
    var node = peer.gun.get(Schema_1.Schema.Thing.route.reverse({ thingId: thingId }));
    var dataSoul = authorId
        ? Schema_1.Schema.ThingDataSigned.route.reverse({ thingId: thingId, authorId: authorId })
        : Schema_1.Schema.ThingData.route.reverse({ thingId: originalHash });
    var metaData = {
        id: thingId,
        timestamp: timestamp,
        kind: kind,
        originalHash: originalHash,
        data: { '#': dataSoul },
        votesup: { '#': Schema_1.Schema.ThingVotesUp.route.reverse({ thingId: thingId }) },
        votesdown: { '#': Schema_1.Schema.ThingVotesDown.route.reverse({ thingId: thingId }) },
        allcomments: { '#': Schema_1.Schema.ThingAllComments.route.reverse({ thingId: thingId }) },
        comments: { '#': Schema_1.Schema.ThingComments.route.reverse({ thingId: thingId }) }
    };
    if (topic)
        metaData.topic = { '#': Schema_1.Schema.Topic.route.reverse({ topicName: topic }) };
    if (authorId)
        metaData.author = { '#': "~" + authorId };
    if (opId)
        metaData.op = { '#': Schema_1.Schema.Thing.route.reverse({ thingId: opId }) };
    if (replyToId) {
        metaData.replyTo = {
            '#': Schema_1.Schema.Thing.route.reverse({ thingId: replyToId })
        };
    }
    peer.gun.get(dataSoul).put(data);
    node.put(metaData);
    index(peer, thingId, data);
    return node;
});
var submit = R.curry(function (peer, data) {
    var timestamp = data.timestamp || new Date().getTime();
    var user = peer.isLoggedIn();
    if (data.topic)
        data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line
    if (data.domain)
        data.domain = data.domain.toLowerCase().trim(); // eslint-disable-line
    if (user) {
        data.author = user.alias; // eslint-disable-line
        data.authorId = user.pub; // eslint-disable-line
    }
    var thing = put(peer, __assign({}, data, { timestamp: timestamp, kind: 'submission' }));
    if (user) {
        var thingsSoul = Schema_1.Schema.AuthorThings.route.reverse({
            authorId: user.pub
        });
        var submissionsSoul = Schema_1.Schema.AuthorSubmissions.route.reverse({
            authorId: user.pub
        });
        var things = peer.gun.get(thingsSoul);
        var submissions = peer.gun.get(submissionsSoul);
        peer.gun
            .user()
            .get('things')
            .put(things);
        peer.gun
            .user()
            .get('submissions')
            .put(submissions);
        things.set(thing);
        submissions.set(thing);
    }
    return thing;
});
var comment = R.curry(function (peer, data) {
    var user = peer.isLoggedIn();
    if (data.topic)
        data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line
    if (user) {
        data.author = user.alias; // eslint-disable-line
        data.authorId = user.pub; // eslint-disable-line
    }
    var thing = put(peer, __assign({}, data, { kind: 'comment' }));
    if (user) {
        var thingsSoul = Schema_1.Schema.AuthorThings.route.reverse({
            authorId: user.pub
        });
        var commentsSoul = Schema_1.Schema.AuthorComments.route.reverse({
            authorId: user.pub
        });
        var things = peer.gun.get(thingsSoul);
        var comments = peer.gun.get(commentsSoul);
        peer.gun
            .user()
            .get('things')()
            .put(things);
        peer.gun
            .user()
            .get('comments')
            .put(comments);
        things.set(thing);
        comments.set(thing);
    }
    return thing;
});
var chat = R.curry(function (peer, data) {
    var user = peer.isLoggedIn();
    if (data.topic)
        data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line
    if (user) {
        data.author = user.alias; // eslint-disable-line
        data.authorId = user.pub; // eslint-disable-line
    }
    var thing = put(peer, __assign({}, data, { kind: 'chatmsg' }));
    if (user) {
        var thingsSoul = Schema_1.Schema.AuthorThings.route.reverse({
            authorId: user.pub
        });
        var things = peer.gun.get(thingsSoul);
        peer.gun
            .user()
            .get('things')
            .put(things);
        things.set(thing);
    }
    return thing;
});
var writePage = R.curry(function (peer, name, body) {
    var user = peer.isLoggedIn();
    if (!user)
        return Promise.reject('not logged in');
    var thing;
    var pagesSoul = Schema_1.Schema.AuthorPages.route.reverse({ authorId: user.pub });
    var chain = peer.gun.get(pagesSoul).get(name);
    return chain.then(function (res) {
        if (res && res.data) {
            chain
                .get('data')
                .get('body')
                .put(body);
        }
        else {
            var data = {
                body: body,
                title: name,
                kind: 'wikipage',
                author: user.alias,
                authorId: user.pub
            };
            thing = put(peer, data);
            chain.put(thing);
        }
    });
});
var vote = R.curry(function (peer, id, kind, nonce) {
    var votes = peer.gun.get(Schema_1.Schema[kind === 'up' ? 'ThingVotesUp' : 'ThingVotesDown'].route.reverse({
        thingId: id
    }));
    return votes.get(nonce).put('1');
});
exports.Thing = {
    soulToId: soulToId,
    soulsToIds: soulsToIds,
    put: put,
    submit: submit,
    comment: comment,
    chat: chat,
    writePage: writePage,
    vote: vote,
    index: index
};
//# sourceMappingURL=Thing.js.map