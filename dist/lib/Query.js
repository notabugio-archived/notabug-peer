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
var gun_scope_1 = require("gun-scope");
var Config_1 = require("./Config");
var Schema_1 = require("./Schema");
var ListingNode_1 = require("./Listing/ListingNode");
var Thing_1 = require("./Thing");
var thing = gun_scope_1.query(function (scope, thingSoul) {
    return scope.get(thingSoul).then(function (meta) {
        if (!meta || !meta.id)
            return null;
        var result = {
            id: meta.id,
            timestamp: parseFloat(meta.timestamp)
        };
        var replyToSoul = R.pathOr('', ['replyTo', '#'], meta);
        var opSoul = R.pathOr('', ['op', '#'], meta);
        var opId = R.propOr('', 'thingId', opSoul && Schema_1.Schema.Thing.route.match(opSoul));
        var replyToId = R.propOr('', 'thingId', replyToSoul && Schema_1.Schema.Thing.route.match(replyToSoul));
        if (opId)
            result.opId = opId;
        if (replyToId)
            result.replyToId = replyToId;
        return result;
    });
});
var thingDataFromSouls = R.curry(function (scope, souls) {
    var ids = ListingNode_1.ListingNode.soulsToIds(souls || []);
    return gun_scope_1.all(R.map(function (id) { return thingData(scope, id).then(function (data) { return [id, data]; }); }, ids)).then(function (pairs) {
        return pairs.reduce(function (res, _a) {
            var id = _a[0], data = _a[1];
            return R.assoc(id, data, res);
        }, {});
    });
});
var thingScores = gun_scope_1.query(function (scope, thingId, tabulator) {
    if (tabulator === void 0) { tabulator = ''; }
    if (!thingId)
        return gun_scope_1.resolve(null);
    return scope
        .get(Schema_1.Schema.ThingVoteCounts.route.reverse({
        thingId: thingId,
        tabulator: tabulator || Config_1.Config.tabulator
    }))
        .then();
}, 'thingScores');
var thingData = gun_scope_1.query(function (scope, thingId) {
    return thingId ? scope.get(Schema_1.Schema.Thing.route.reverse({ thingId: thingId })).get('data') : gun_scope_1.resolve(null);
}, 'thingData');
var thingMeta = gun_scope_1.query(function (scope, _a) {
    var thingSoul = _a.thingSoul, tabulator = _a.tabulator, _b = _a.data, data = _b === void 0 ? false : _b, _c = _a.scores, scores = _c === void 0 ? false : _c;
    if (!thingSoul)
        return gun_scope_1.resolve(null);
    var id = ListingNode_1.ListingNode.soulToId(thingSoul);
    return gun_scope_1.all([
        thing(scope, thingSoul),
        scores ? thingScores(scope, id, tabulator) : gun_scope_1.resolve(null),
        data ? thingData(scope, id) : gun_scope_1.resolve(null)
    ]).then(function (_a) {
        var meta = _a[0], votes = _a[1], data = _a[2];
        if (!meta || !meta.id)
            return null;
        return __assign({}, meta, { votes: votes, data: data });
    });
});
var thingForDisplay = gun_scope_1.query(function (scope, thingId, tabulator) {
    if (tabulator === void 0) { tabulator = null; }
    return Promise.all([thingData(scope, thingId), thingScores(scope, thingId, tabulator)]).then(function (_a) {
        var data = _a[0], scores = _a[1];
        var opId = Thing_1.ThingDataNode.opId(data);
        if (!opId)
            return { data: data, scores: scores };
        return thingData(scope, opId).then(function (opData) { return ({
            data: data,
            scores: scores,
            opData: opData
        }); });
    });
}, 'thing');
var multiThingMeta = gun_scope_1.query(function (scope, params) {
    return gun_scope_1.all(R.reduce(function (promises, thingSoul) {
        if (!thingSoul)
            return promises;
        promises.push(thingMeta(scope, __assign({}, params, { thingSoul: thingSoul })));
        return promises;
    }, [], R.propOr([], 'thingSouls', params)));
});
var userPages = gun_scope_1.query(function (scope, authorId) { return scope.get(Schema_1.Schema.AuthorPages.route.reverse({ authorId: authorId })); }, 'userPages');
var wikiPageId = gun_scope_1.query(function (scope, authorId, name) {
    if (!authorId || !name)
        return gun_scope_1.resolve(null);
    return scope
        .get(Schema_1.Schema.AuthorPages.route.reverse({ authorId: authorId }))
        .get(name)
        .get('id');
}, 'wikiPageId');
var wikiPage = gun_scope_1.query(function (scope, authorId, name) {
    return wikiPageId(scope, authorId, name).then(function (id) { return id && thingData(scope, id); });
});
var userMeta = gun_scope_1.query(function (scope, id) {
    if (!id)
        return gun_scope_1.resolve(null);
    return scope.get("~" + id).then(function (meta) { return ({
        alias: R.prop('alias', meta),
        createdAt: R.path(['_', '>', 'pub'], meta)
    }); });
}, 'userMeta');
var createScope = R.curry(function (nab, opts) { return gun_scope_1.scope(R.assoc('gun', nab.gun, opts || {})); });
exports.Query = {
    thingMeta: thingMeta,
    multiThingMeta: multiThingMeta,
    thingScores: thingScores,
    thingData: thingData,
    thingDataFromSouls: thingDataFromSouls,
    thingForDisplay: thingForDisplay,
    userPages: userPages,
    wikiPageId: wikiPageId,
    wikiPage: wikiPage,
    userMeta: userMeta,
    createScope: createScope
};
//# sourceMappingURL=Query.js.map