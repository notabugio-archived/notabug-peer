"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scoreThingsForPeers = exports.onChangeListingOff = exports.onChangeListing = exports.onChangeThingOff = exports.onChangeThing = exports.sendMsgNotifications = exports.sendVoteNotifications = exports.sendChangeNotifications = exports.onMsg = exports.onVote = exports.onChangeOff = exports.onChange = exports.unwatchCollection = exports.watchCollection = exports.unwatchThing = exports.watchThing = exports.countVote = exports.getDayStr = undefined;

var _ramda = require("ramda");

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getDayStr = exports.getDayStr = (0, _ramda.curry)(function (peer, timestamp) {
  var d = new Date(timestamp || new Date().getTime());
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth() + 1;
  var dayNum = d.getUTCDate();
  return year + "/" + month + "/" + dayNum;
});

var countVote = exports.countVote = (0, _ramda.curry)(function (peer, id, kind, vote) {
  if (!vote) return;
  var soul = peer.souls.thing.soul({ thingid: id });
  peer.setState((0, _ramda.assocPath)(["things", id, "votes", kind], peer.getVoteCount(id, kind) + 1, peer.getState()));
  peer.sendVoteNotifications(id);
  peer.sendChangeNotifications(soul);
});

var watchThing = (0, _ramda.curry)(function (peer, data) {
  if (!data) return;

  var id = data.id,
      thing = _objectWithoutProperties(data, ["id"]); // eslint-disable-line


  var state = peer.getState();
  var updatedActive = false;
  thing = (0, _ramda.merge)((0, _ramda.pathOr)({}, ["things", id], state), thing); // eslint-disable-line
  var _thing = thing,
      timestamp = _thing.timestamp;

  var chain = peer.souls.thing.get({ thingid: id });
  var replyToSoul = (0, _ramda.path)(["replyTo", "#"], thing);
  var opSoul = (0, _ramda.path)(["op", "#"], thing);
  var replyToId = replyToSoul ? peer.souls.thing.isMatch(replyToSoul).thingid : null;
  var opId = opSoul ? peer.souls.thing.isMatch(opSoul).thingid : null;
  var votes = (0, _ramda.pathOr)({}, ["things", id, "votes"], state);
  var existingTimestamp = peer.getTimestamp(id);
  var lastActive = thing.lastActive || timestamp;

  if (existingTimestamp && peer.config.countVotes) return;

  if (!peer.config.countVotes) {
    ["up", "down", "comment"].forEach(function (kind) {
      var voteCount = (0, _ramda.propOr)(votes[kind] || 0, "votes" + kind + "count", thing);
      if (voteCount) votes[kind] = voteCount;
    });
  }

  state = (0, _ramda.assocPath)(["things", id], (0, _ramda.merge)((0, _ramda.pathOr)({}, ["things", id], state), { id: id, timestamp: timestamp, lastActive: lastActive, chain: chain, replyToId: replyToId, opId: opId, votes: votes }), state);

  if (replyToId) {
    state = (0, _ramda.assocPath)(["things", replyToId, "replies", id], 1, state);
  }

  if (opId && peer.getLastActive(opId) < timestamp) {
    state = (0, _ramda.assocPath)(["things", opId, "lastActive"], timestamp, state);
    updatedActive = true;
  }

  peer.setState(state);
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));

  if (updatedActive) {
    peer.sendVoteNotifications(opId);
  }

  if (peer.config.countVotes && timestamp) {
    chain.get("allcomments").map().once(function (comment) {
      if (peer.getLastActive(id) < comment.timestamp) {
        peer.setState((0, _ramda.assocPath)(["things", id, "lastActive"], comment.timestamp, peer.getState()));
      }
      peer.countVote(id, "comment")(comment);
    });
    chain.get("votesup").map().once(peer.countVote(id, "up"));
    chain.get("votesdown").map().once(peer.countVote(id, "down"));
  } else {
    peer.sendVoteNotifications(id);
  }
});

exports.watchThing = watchThing;
var unwatchThing = exports.unwatchThing = (0, _ramda.curry)(function (peer, id) {
  var state = peer.getState();
  var chain = (0, _ramda.path)(["things", id, "chain"], state);
  peer.setState((0, _ramda.assocPath)(["things", id], null, state));
  return chain && chain.off && chain.off();
});

var watchCollection = exports.watchCollection = (0, _ramda.curry)(function (peer, soul) {
  var state = peer.getState();
  if ((0, _ramda.path)(["collections", soul, "chain"], state)) return null;
  var chain = peer.gun.get(soul);
  peer.setState((0, _ramda.assocPath)(["collections", soul, "chain"], chain, state));
  var onThing = function onThing(thing) {
    if (!thing || !thing.id) return null;
    peer.setState((0, _ramda.assocPath)(["collections", soul, "things", thing.id], 1, peer.getState()));
    return peer.watchThing(thing);
  };

  /*
  if (peer.config.countVotes) {
    return chain.map().once(onThing);
  }
  */
  return chain.map().on(onThing);
});

var unwatchCollection = exports.unwatchCollection = (0, _ramda.curry)(function (peer, soul) {
  var state = peer.getState();
  var chain = (0, _ramda.path)(["collections", soul, "chain"], state);
  peer.setState((0, _ramda.assocPath)(["collections", soul], null, state));
  return chain && chain.off && chain.off();
});

var onChange = exports.onChange = (0, _ramda.curry)(function (peer, soul, fn) {
  var state = peer.getState();
  var subs = (0, _ramda.pathOr)([], ["changeSubscriptions", soul || null], state);
  if (subs.indexOf(fn) !== -1) return;
  peer.setState((0, _ramda.assocPath)(["changeSubscriptions", soul || null], [].concat(_toConsumableArray(subs), [fn]), state));
});

var onChangeOff = exports.onChangeOff = (0, _ramda.curry)(function (peer, soul, fn) {
  var state = peer.getState();
  var subs = (0, _ramda.pathOr)([], ["changeSubscriptions", soul || null], state).filter(function (f) {
    return f !== fn;
  });
  peer.setState((0, _ramda.assocPath)(["changeSubscriptions", soul || null], subs, state));
});

var onVote = exports.onVote = (0, _ramda.curry)(function (peer, soul, fn) {
  var state = peer.getState();
  var subs = (0, _ramda.pathOr)([], ["voteSubscriptions", soul || null], state);
  if (subs.indexOf(fn) !== -1) return;
  peer.setState((0, _ramda.assocPath)(["voteSubscriptions", soul || null], [].concat(_toConsumableArray(subs), [fn]), state));
});

var onMsg = exports.onMsg = function onMsg(peer) {
  return function (fn) {
    var state = peer.getState();
    var subs = (0, _ramda.pathOr)([], ["msgSubscriptions"], state);
    if (subs.indexOf(fn) !== -1) return;
    peer.setState((0, _ramda.assocPath)(["msgSubscriptions"], [].concat(_toConsumableArray(subs), [fn]), state));
  };
};

var sendChangeNotifications = exports.sendChangeNotifications = (0, _ramda.curry)(function (peer, soul) {
  (0, _ramda.pathOr)([], ["changeSubscriptions", soul], peer.getState()).forEach(function (fn) {
    return fn();
  });
  (0, _ramda.pathOr)([], ["changeSubscriptions", null], peer.getState()).forEach(function (fn) {
    return fn();
  });
});

var sendVoteNotifications = exports.sendVoteNotifications = (0, _ramda.curry)(function (peer, id) {
  (0, _ramda.pathOr)([], ["voteSubscriptions", id], peer.getState()).forEach(function (fn) {
    return fn(id);
  });
  (0, _ramda.pathOr)([], ["voteSubscriptions", null], peer.getState()).forEach(function (fn) {
    return fn(id);
  });
});

var sendMsgNotifications = exports.sendMsgNotifications = (0, _ramda.curry)(function (peer, msg) {
  (0, _ramda.pathOr)([], ["msgSubscriptions"], peer.getState()).forEach(function (fn) {
    return fn(msg);
  });
});

var onChangeThing = exports.onChangeThing = (0, _ramda.curry)(function (peer, id, fn) {
  var soul = peer.souls.thing.soul({ thingid: id });
  peer.gun.get(soul).once(peer.watchThing);
  peer.onChange(peer.souls.thing.soul({ thingid: id }), fn);
});

var onChangeThingOff = exports.onChangeThingOff = (0, _ramda.curry)(function (peer, id, fn) {
  return peer.onChangeOff(peer.souls.thing.soul({ thingid: id }), fn);
});

var onChangeListing = exports.onChangeListing = (0, _ramda.curry)(function (peer, params, fn) {
  return peer.getListingSouls(params).map(function (soul) {
    return peer.onChange(soul, fn);
  });
});

var onChangeListingOff = exports.onChangeListingOff = (0, _ramda.curry)(function (peer, params, fn) {
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
          counts.lastActive = peer.getLastActive(id);
          thing.put(counts);
        }
      }, 100, { trailing: true });
    };

    peer.onMsg(function (msg) {
      Object.keys(msg).forEach(function (key) {
        if (key === "get" && msg.mesh && msg.how !== "mem") {
          var soul = (0, _ramda.path)([key, "#"], msg);
          if (peer.souls.topic.isMatch(soul) || peer.souls.topicDay.isMatch(soul) || peer.souls.domain.isMatch(soul) || peer.souls.url.isMatch(soul) || peer.souls.thingAllComments.isMatch(soul)) {
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