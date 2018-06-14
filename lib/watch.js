"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scoreThingsForPeers = exports.onChangeListingOff = exports.onChangeListing = exports.onChangeThingOff = exports.onChangeThing = exports.sendMsgNotifications = exports.sendVoteNotifications = exports.sendChangeNotifications = exports.onMsg = exports.onVote = exports.onChangeOff = exports.onChange = exports.unwatchCollection = exports.watchCollection = exports.unwatchThing = exports.watchThing = exports.countVote = exports.getDayStr = undefined;

var _curry = require("ramda/src/curry");

var _curry2 = _interopRequireDefault(_curry);

var _assocPath = require("ramda/src/assocPath");

var _assocPath2 = _interopRequireDefault(_assocPath);

var _path = require("ramda/src/path");

var _path2 = _interopRequireDefault(_path);

var _pathOr = require("ramda/src/pathOr");

var _pathOr2 = _interopRequireDefault(_pathOr);

var _propOr = require("ramda/src/propOr");

var _propOr2 = _interopRequireDefault(_propOr);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getDayStr = exports.getDayStr = (0, _curry2.default)(function (peer, timestamp) {
  var d = new Date(timestamp || new Date().getTime());
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth() + 1;
  var dayNum = d.getUTCDate();
  return year + "/" + month + "/" + dayNum;
});

var countVote = exports.countVote = (0, _curry2.default)(function (peer, id, kind, vote) {
  if (!vote) return;
  var soul = peer.souls.thing.soul({ thingid: id });
  peer.setState((0, _assocPath2.default)(["things", id, "votes", kind], peer.getVoteCount(id, kind) + 1, peer.getState()));
  peer.sendVoteNotifications(id);
  peer.sendChangeNotifications(soul);
});

var watchThing = (0, _curry2.default)(function (peer, _ref) {
  var id = _ref.id,
      timestamp = _ref.timestamp,
      thing = _objectWithoutProperties(_ref, ["id", "timestamp"]);

  var state = peer.getState();
  var chain = peer.souls.thing.get({ thingid: id });
  var replyToSoul = (0, _path2.default)(["replyTo", "#"], thing);
  var opSoul = (0, _path2.default)(["op", "#"], thing);
  var replyToId = replyToSoul ? peer.souls.thing.isMatch(replyToSoul).thingid : null;
  var opId = opSoul ? peer.souls.thing.isMatch(opSoul).thingid : null;
  var votes = (0, _pathOr2.default)({}, ["things", id, "votes"], state);
  var existingTimestamp = peer.getTimestamp(id);

  if (existingTimestamp && peer.config.countVotes) return;

  if (!peer.config.countVotes) {
    ["up", "down", "comment"].forEach(function (kind) {
      var voteCount = (0, _propOr2.default)(votes[kind] || 0, "votes" + kind + "count", thing);
      if (voteCount) votes[kind] = voteCount;
    });
  }

  peer.setState((0, _assocPath2.default)(["things", id], { id: id, timestamp: timestamp, chain: chain, replyToId: replyToId, opId: opId, votes: votes }, state));
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));

  if (peer.config.countVotes && timestamp) {
    chain.get("allcomments").map().once(peer.countVote(id, "comment"));
    chain.get("votesup").map().once(peer.countVote(id, "up"));
    chain.get("votesdown").map().once(peer.countVote(id, "down"));
  } else {
    peer.sendVoteNotifications(id);
  }
});

exports.watchThing = watchThing;
var unwatchThing = exports.unwatchThing = (0, _curry2.default)(function (peer, id) {
  var state = peer.getState();
  var chain = (0, _path2.default)(["things", id, "chain"], state);
  peer.setState((0, _assocPath2.default)(["things", id], null, state));
  return chain && chain.off && chain.off();
});

var watchCollection = exports.watchCollection = (0, _curry2.default)(function (peer, soul) {
  var state = peer.getState();
  if ((0, _path2.default)(["collections", soul], state)) return null;
  var chain = peer.gun.get(soul);
  peer.setState((0, _assocPath2.default)(["collections", soul, "chain"], chain, state));
  var onThing = function onThing(thing) {
    if (!thing || !thing.id) return null;
    peer.setState((0, _assocPath2.default)(["collections", soul, "things", thing.id], true, peer.getState()));
    return peer.watchThing(thing);
  };

  /*
  if (peer.config.countVotes) {
    return chain.map().once(onThing);
  }
  */
  return chain.map().on(onThing);
});

var unwatchCollection = exports.unwatchCollection = (0, _curry2.default)(function (peer, soul) {
  var state = peer.getState();
  var chain = (0, _path2.default)(["collections", soul, "chain"], state);
  peer.setState((0, _assocPath2.default)(["collections", soul], null, state));
  return chain && chain.off && chain.off();
});

var onChange = exports.onChange = (0, _curry2.default)(function (peer, soul, fn) {
  var state = peer.getState();
  var subs = (0, _pathOr2.default)([], ["changeSubscriptions", soul || null], state);
  if (subs.indexOf(fn) !== -1) return;
  peer.setState((0, _assocPath2.default)(["changeSubscriptions", soul || null], [].concat(_toConsumableArray(subs), [fn]), state));
});

var onChangeOff = exports.onChangeOff = (0, _curry2.default)(function (peer, soul, fn) {
  var state = peer.getState();
  var subs = (0, _pathOr2.default)([], ["changeSubscriptions", soul || null], state).filter(function (f) {
    return f !== fn;
  });
  peer.setState((0, _assocPath2.default)(["changeSubscriptions", soul || null], subs, state));
});

var onVote = exports.onVote = (0, _curry2.default)(function (peer, soul, fn) {
  var state = peer.getState();
  var subs = (0, _pathOr2.default)([], ["voteSubscriptions", soul || null], state);
  if (subs.indexOf(fn) !== -1) return;
  peer.setState((0, _assocPath2.default)(["voteSubscriptions", soul || null], [].concat(_toConsumableArray(subs), [fn]), state));
});

var onMsg = exports.onMsg = function onMsg(peer) {
  return function (fn) {
    var state = peer.getState();
    var subs = (0, _pathOr2.default)([], ["msgSubscriptions"], state);
    if (subs.indexOf(fn) !== -1) return;
    peer.setState((0, _assocPath2.default)(["msgSubscriptions"], [].concat(_toConsumableArray(subs), [fn]), state));
  };
};

var sendChangeNotifications = exports.sendChangeNotifications = (0, _curry2.default)(function (peer, soul) {
  (0, _pathOr2.default)([], ["changeSubscriptions", soul], peer.getState()).forEach(function (fn) {
    return fn();
  });
  (0, _pathOr2.default)([], ["changeSubscriptions", null], peer.getState()).forEach(function (fn) {
    return fn();
  });
});

var sendVoteNotifications = exports.sendVoteNotifications = (0, _curry2.default)(function (peer, id) {
  (0, _pathOr2.default)([], ["voteSubscriptions", id], peer.getState()).forEach(function (fn) {
    return fn(id);
  });
  (0, _pathOr2.default)([], ["voteSubscriptions", null], peer.getState()).forEach(function (fn) {
    return fn(id);
  });
});

var sendMsgNotifications = exports.sendMsgNotifications = (0, _curry2.default)(function (peer, msg) {
  (0, _pathOr2.default)([], ["msgSubscriptions"], peer.getState()).forEach(function (fn) {
    return fn(msg);
  });
});

var onChangeThing = exports.onChangeThing = (0, _curry2.default)(function (peer, id, fn) {
  var soul = peer.souls.thing.soul({ thingid: id });
  peer.gun.get(soul).once(peer.watchThing);
  peer.onChange(peer.souls.thing.soul({ thingid: id }), fn);
});

var onChangeThingOff = exports.onChangeThingOff = (0, _curry2.default)(function (peer, id, fn) {
  return peer.onChangeOff(peer.souls.thing.soul({ thingid: id }), fn);
});

var onChangeListing = exports.onChangeListing = (0, _curry2.default)(function (peer, params, fn) {
  return peer.getListingSouls(params).map(function (soul) {
    return peer.onChange(soul, fn);
  });
});

var onChangeListingOff = exports.onChangeListingOff = (0, _curry2.default)(function (peer, params, fn) {
  return peer.getListingSouls(params).map(function (soul) {
    return peer.onChangeOff(soul, fn);
  });
});

var scoreThingsForPeers = exports.scoreThingsForPeers = function scoreThingsForPeers(peer) {
  return function () {
    var updaters = {};
    var updateScores = function updateScores(id) {
      return (0, _debounce2.default)(function () {
        var thing = peer.souls.thing.get({ thingid: id });
        var counts = {};
        ["up", "down", "comment"].forEach(function (kind) {
          var voteCount = peer.getVoteCount(id, kind);
          if (voteCount) {
            counts["votes" + kind + "count"] = voteCount;
          }
        });
        if (Object.keys(counts).length) {
          thing.put(counts);
        }
      }, 100, { trailing: true });
    };

    peer.onMsg(function (msg) {
      Object.keys(msg).forEach(function (key) {
        if (key === "get" && msg.mesh && msg.how !== "mem") {
          var soul = (0, _path2.default)([key, "#"], msg);
          if (peer.souls.topic.isMatch(soul) || peer.souls.topicDay.isMatch(soul) || peer.souls.domain.isMatch(soul) || peer.souls.url.isMatch(soul) || peer.souls.thingComments.isMatch(soul)) {
            peer.watchCollection(soul);
          }
        }
      });
    });

    peer.onVote(null, function (id) {
      return (updaters[id] || (updaters[id] = updateScores(id)))();
    });
  };
};