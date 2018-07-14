"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vote = exports.chat = exports.comment = exports.submit = exports.putThing = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _curry = require("ramda/src/curry");

var _curry2 = _interopRequireDefault(_curry);

var _objectHash = require("object-hash");

var _objectHash2 = _interopRequireDefault(_objectHash);

var _urllite = require("urllite");

var _urllite2 = _interopRequireDefault(_urllite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var putThing = exports.putThing = (0, _curry2.default)(function (peer, data) {
  var id = (0, _objectHash2.default)(data, { unorderedSets: true });
  var node = peer.souls.thing.get({ thingid: id });
  var dataNode = peer.souls.thingData.get({ thingid: id });
  dataNode.put(data);
  node.get("data").put(dataNode);
  node.put({ id: id, timestamp: data.timestamp });
  peer.souls.things.get().set(node);
  return node;
});

var submit = exports.submit = (0, _curry2.default)(function (peer, data) {
  var timestamp = new Date().getTime();
  var dayStr = peer.getDayStr(timestamp);
  var user = peer.isLoggedIn();
  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }

  var _dayStr$split = dayStr.split("/"),
      _dayStr$split2 = _slicedToArray(_dayStr$split, 3),
      year = _dayStr$split2[0],
      month = _dayStr$split2[1],
      day = _dayStr$split2[2];

  var urlInfo = data.url ? (0, _urllite2.default)(data.url) : {};
  var domainName = data.url ? (urlInfo.host || "").replace(/^www\./, "") : "self." + data.topic;
  var topicDays = peer.souls.topicDays.get({ topicname: data.topic });
  var allDay = peer.souls.topicDay.get({ topicname: "all", year: year, month: month, day: day });
  var all = peer.souls.topic.get({ topicname: "all" });
  var topicDay = peer.souls.topicDay.get({ topicname: data.topic, year: year, month: month, day: day });
  var topic = peer.souls.topic.get({ topicname: data.topic });
  var domain = peer.souls.domain.get({ domain: domainName });
  var thing = peer.putThing(_extends({}, data, { timestamp: timestamp, kind: "submission" }));

  topicDays.set(topicDay);
  thing.get("topic").put(topic);
  thing.get("domain").put(domain);
  topic.set(thing);
  topicDay.set(thing);
  all.set(thing);
  allDay.set(thing);
  domain.set(thing);

  if (data.url) {
    var urlNode = peer.souls.url.get({ url: data.url });
    thing.get("url").put(urlNode);
    urlNode.set(thing);
  }

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
  var timestamp = new Date().getTime();
  var user = peer.isLoggedIn();
  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }
  var thing = peer.putThing(_extends({}, data, { timestamp: timestamp, kind: "comment" }));
  var replyTo = peer.souls.thing.get({ thingid: data.replyToId });
  var op = peer.souls.thing.get({ thingid: data.opId });
  var comments = peer.souls.thingComments.get({ thingid: data.replyToId });
  var allcomments = peer.souls.thingAllComments.get({ thingid: data.opId });
  thing.get("replyTo").put(replyTo);
  thing.get("op").put(op);
  replyTo.get("comments").put(comments);
  op.get("allcomments").put(allcomments);
  comments.set(thing);
  allcomments.set(thing);
  if (user) {
    peer.gun.user().get("things").set(thing);
    peer.gun.user().get("comments").set(thing);
  }
  thing.once(peer.watchThing);

  return thing;
});

var chat = exports.chat = (0, _curry2.default)(function (peer, data) {
  var timestamp = new Date().getTime();
  var dayStr = peer.getDayStr(timestamp);

  var _dayStr$split3 = dayStr.split("/"),
      _dayStr$split4 = _slicedToArray(_dayStr$split3, 3),
      year = _dayStr$split4[0],
      month = _dayStr$split4[1],
      day = _dayStr$split4[2];

  var chatDay = peer.souls.topicDay.get({ topicname: "chat:" + data.topic, year: year, month: month, day: day });
  var user = peer.isLoggedIn();
  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }
  var thing = peer.putThing(_extends({}, data, { timestamp: timestamp, kind: "chatmsg" }));
  chatDay.set(thing);
  if (user) {
    peer.gun.user().get("things").set(thing);
  }
  thing.once(peer.watchThing);
  return thing;
});

var vote = exports.vote = (0, _curry2.default)(function (peer, id, kind, nonce) {
  var thing = peer.souls.thing.get({ thingid: id });
  var votes = peer.souls.thingVotes.get({ thingid: id, votekind: kind });
  thing.get("votes" + kind).put(votes);
  return votes.set(nonce);
});