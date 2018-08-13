"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onChangeListingOff = exports.onChangeListing = exports.onChangeThingOff = exports.onChangeThing = exports.sendChangeNotifications = exports.onChangeOff = exports.onChange = exports.unwatchCollection = exports.watchCollection = exports.unwatchThing = exports.watchThing = exports.countVotes = exports.getDayStr = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getDayStr = exports.getDayStr = (0, _ramda.curry)(function (peer, timestamp) {
  var d = new Date(timestamp || new Date().getTime());
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth() + 1;
  var dayNum = d.getUTCDate();
  return year + "/" + month + "/" + dayNum;
});

var countVotes = exports.countVotes = (0, _ramda.curry)(function (peer, id, kind, data) {
  var state = _extends({}, peer.getState());
  var existing = (0, _ramda.pathOr)(0, ["things", id, "votes", kind], state);
  var count = Object.keys(data || { _: null }).length - 1;
  if (!count) return;
  if (count < existing && count === 1) count = existing + 1; // GUN loses votes
  if (count < existing) return;

  var thingState = state.things[id] = (0, _ramda.pathOr)({}, ["things", id], state);
  var thingVotes = thingState.votes = (0, _ramda.pathOr)({}, ["things", id, "votes"], state);
  thingVotes[kind] = count;
  peer.setState(state);

  // peer.setState(assocPath(["things", id, "votes", kind], count, state));
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));
});

var watchThing = (0, _ramda.curry)(function (peer, data) {
  if (!data) return;

  var id = data.id,
      thing = _objectWithoutProperties(data, ["id"]); // eslint-disable-line
  // let state = peer.getState();


  var state = _extends({}, peer.getState());

  var existingChain = (0, _ramda.path)(["things", id, "chain"], state);
  thing = (0, _ramda.merge)((0, _ramda.pathOr)({}, ["things", id], state), thing); // eslint-disable-line
  var _thing = thing,
      timestamp = _thing.timestamp;

  var replyToSoul = (0, _ramda.path)(["replyTo", "#"], thing);
  var opSoul = (0, _ramda.path)(["op", "#"], thing);
  var replyToId = replyToSoul ? peer.souls.thing.isMatch(replyToSoul).thingid : null;
  var opId = opSoul ? peer.souls.thing.isMatch(opSoul).thingid : null;
  var lastActive = thing.lastActive || timestamp;

  var chain = existingChain || peer.souls.thing.get({ thingid: id });

  var thingState = state.things[id] = (0, _ramda.pathOr)({}, ["things", id], state);
  thingState.id = id;
  thingState.timestamp = timestamp;
  thingState.lastActive = lastActive;
  thingState.chain = chain;
  thingState.replyToId = replyToId;
  thingState.opId = opId;

  /*
  state = assocPath(
    ["things", id],
    merge(
      pathOr({}, ["things", id], state),
      { id, timestamp, lastActive, chain, replyToId, opId },
    ),
    state
  );
  */

  if (replyToId) {
    var replyToState = state.things[replyToId] = (0, _ramda.pathOr)({}, ["things", replyToId], state);
    var replies = replyToState.replies = (0, _ramda.pathOr)({}, ["things", replyToId, "replies"], state);
    replies[id] = 1;
    // state = assocPath(["things", replyToId, "replies", id], 1, state);
  }

  peer.setState(state);
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));

  if (existingChain) return;
  peer.souls.thingVotes.get({ thingid: id, votekind: "up" }).on(peer.countVotes(id, "up"));
  peer.souls.thingVotes.get({ thingid: id, votekind: "down" }).on(peer.countVotes(id, "down"));
  peer.souls.thingAllComments.get({ thingid: id }).on(peer.countVotes(id, "comment"));
  peer.souls.thingComments.get({ thingid: id }).on(peer.countVotes(id, "replies"));
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
  var hasPreloaded = false;

  if ((0, _ramda.path)(["collections", soul, "chain"], state)) return null;
  var chain = peer.gun.get(soul);
  peer.setState((0, _ramda.assocPath)(["collections", soul, "chain"], chain, state));

  var onThing = function onThing(thing) {
    if (!thing || !thing.id) return null;
    var state2 = _extends({}, peer.getState());
    var collectionState = (0, _ramda.path)(["collections", soul], state2);
    var collectionThings = collectionState.things = collectionState.things || {};
    collectionThings[thing.id] = 1;
    peer.setState(state2);

    // peer.setState(assocPath(["collections", soul, "things", thing.id], 1, state2));
    return peer.watchThing(thing);
  };

  if (!hasPreloaded) {
    chain.on(function (souls) {
      if (!souls) return;

      Object.keys(souls).map(function (thingSoul) {
        if (!peer.souls.thing.isMatch(thingSoul)) return;
        chain.get(thingSoul).on(onThing);
      });

      hasPreloaded = true;
    });
  }

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

var sendChangeNotifications = exports.sendChangeNotifications = (0, _ramda.curry)(function (peer, soul) {
  (0, _ramda.pathOr)([], ["changeSubscriptions", soul], peer.getState()).forEach(function (fn) {
    return fn();
  });
  (0, _ramda.pathOr)([], ["changeSubscriptions", null], peer.getState()).forEach(function (fn) {
    return fn();
  });
});

var onChangeThing = exports.onChangeThing = (0, _ramda.curry)(function (peer, id, fn) {
  var soul = peer.souls.thing.soul({ thingid: id });
  peer.onChange(soul, fn);
  if ((0, _ramda.path)(["things", id, "chain"], peer.getState())) return;
  var chain = peer.gun.get(soul);
  chain.on(function (data) {
    return peer.watchThing(data);
  });
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