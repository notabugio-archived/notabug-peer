"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexThing = exports.vote = exports.chat = exports.comment = exports.submit = exports.putThing = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _curry = require("ramda/src/curry");

var _curry2 = _interopRequireDefault(_curry);

var _objectHash = require("object-hash");

var _objectHash2 = _interopRequireDefault(_objectHash);

var _urllite = require("urllite");

var _urllite2 = _interopRequireDefault(_urllite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var putThing = exports.putThing = (0, _curry2.default)(function (peer, data) {
  data.timestamp = data.timestamp || new Date().getTime(); // eslint-disable-line
  var id = (0, _objectHash2.default)(data, { unorderedSets: true });
  var node = peer.souls.thing.get({ thingid: id });
  var dataNode = peer.souls.thingData.get({ thingid: id });
  dataNode.put(data);
  node.get("data").put(dataNode);
  node.put({ id: id, timestamp: data.timestamp });
  peer.souls.things.get().set(node);
  peer.indexThing(id, data);
  return node;
});

var submit = exports.submit = (0, _curry2.default)(function (peer, data) {
  var timestamp = data.timestamp || new Date().getTime();
  var user = peer.isLoggedIn();

  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }

  var thing = peer.putThing(_extends({}, data, { timestamp: timestamp, kind: "submission" }));

  if (user) {
    peer.gun.user().get("things").set(thing);
    peer.gun.user().get("submissions").set(thing);
  }

  return new Promise(function (resolve, reject) {
    thing.on(function (result) {
      if (!result) return;
      thing.off();
      resolve(result);
    });
  });
});

var comment = exports.comment = (0, _curry2.default)(function (peer, data) {
  var user = peer.isLoggedIn();

  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }

  var thing = peer.putThing(_extends({}, data, { kind: "comment" }));

  if (user) {
    peer.gun.user().get("things").set(thing);
    peer.gun.user().get("comments").set(thing);
  }

  thing.once(peer.watchThing);
  return thing;
});

var chat = exports.chat = (0, _curry2.default)(function (peer, data) {
  var user = peer.isLoggedIn();
  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }

  var thing = peer.putThing(_extends({}, data, { kind: "chatmsg" }));

  if (user) peer.gun.user().get("things").set(thing);
  thing.once(peer.watchThing);
  return thing;
});

var vote = exports.vote = (0, _curry2.default)(function (peer, id, kind, nonce) {
  var thing = peer.souls.thing.get({ thingid: id });
  var votes = peer.souls.thingVotes.get({ thingid: id, votekind: kind });
  thing.get("votes" + kind).put(votes);
  return votes.set(nonce);
});

var topicPrefixes = {
  chatmsg: "chat:",
  comment: "comments:"
};

var indexThing = exports.indexThing = (0, _curry2.default)(function (peer, thingid, data) {
  if (!data.topic && !data.opId) return;

  if (data.opId && !data.topic) {
    peer.souls.thingData.get({ thingid: data.opId }).on(function recv(td) {
      if (!td) return;
      peer.indexThing(thingid, _extends({}, data, { topic: td.topic || "all" }));
      this.off();
    });
    return;
  }

  var thing = peer.souls.thing.get({ thingid: thingid });
  var dayStr = peer.getDayStr(data.timestamp);

  var _dayStr$split = dayStr.split("/"),
      _dayStr$split2 = _slicedToArray(_dayStr$split, 3),
      year = _dayStr$split2[0],
      month = _dayStr$split2[1],
      day = _dayStr$split2[2];

  var topicPrefix = topicPrefixes[data.kind] || "";
  var topicname = topicPrefix + data.topic;
  var topic = peer.souls.topic.get({ topicname: topicname });
  var topicDay = peer.souls.topicDay.get({ topicname: topicname, year: year, month: month, day: day });

  if (!data.skipAll && data.topic !== "all") {
    var allname = topicPrefix + "all";
    var allTopic = peer.souls.topic.get({ topicname: allname });
    var allTopicDay = peer.souls.topicDay.get({ topicname: allname, year: year, month: month, day: day });
    allTopic.set(thing);
    allTopicDay.set(thing);
  }

  if (data.kind === "submission") {
    var urlInfo = data.url ? (0, _urllite2.default)(data.url) : {};
    var domainName = data.url ? (urlInfo.host || "").replace(/^www\./, "") : "self." + data.topic;
    var domain = peer.souls.domain.get({ domain: domainName });
    domain.set(thing);

    if (data.url) {
      var urlNode = peer.souls.url.get({ url: data.url });
      thing.get("url").put(urlNode);
      urlNode.set(thing);
    }
  }

  if (data.opId) {
    var op = peer.souls.thing.get({ thingid: data.opId });
    var allcomments = peer.souls.thingAllComments.get({ thingid: data.opId });
    thing.get("op").put(op);
    op.get("allcomments").put(allcomments);
    allcomments.set(thing);
  }

  if (data.replyToId || data.opId) {
    var replyTo = peer.souls.thing.get({ thingid: data.replyToId || data.opId });
    var comments = peer.souls.thingComments.get({ thingid: data.replyToId || data.opId });
    comments.set(thing);
    thing.get("replyTo").put(replyTo);
    replyTo.get("comments").put(comments);
  }

  topic.set(thing);
  topicDay.set(thing);
  thing.get("topic").set(topic);
});