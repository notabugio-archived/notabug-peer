"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadState = exports.reconstituteState = exports.getListingJson = undefined;

var _ramda = require("ramda");

var getListingJson = exports.getListingJson = function getListingJson(peer) {
  return function (params) {
    var things = {};
    var state = peer.getState();
    peer.watchListing(params);
    peer.getListingIds(params).forEach(function (id) {
      var thing = {};

      var _pathOr = (0, _ramda.pathOr)({}, ["things", id], state),
          opId = _pathOr.opId,
          replyToId = _pathOr.replyToId,
          timestamp = _pathOr.timestamp,
          lastActive = _pathOr.lastActive,
          _pathOr$votes = _pathOr.votes,
          votes = _pathOr$votes === undefined ? {} : _pathOr$votes;

      if (Object.keys(votes || {}).length) thing.votes = votes;
      if (opId) thing.opId = opId;
      if (replyToId) thing.replyToId = replyToId;
      if (timestamp) thing.timestamp = timestamp;
      if (lastActive && lastActive !== timestamp) thing.lastActive = lastActive;
      things[id] = thing;
    });
    return { things: things };
  };
};

var reconstituteState = exports.reconstituteState = function reconstituteState(peer) {
  return function (state) {
    var things = state.things,
        topic = state.topic,
        collectionSoul = state.collectionSoul;

    var collections = state.collections = state.collections || {}; // eslint-disable-line
    var topicSoul = topic ? peer.souls.topic.soul({ topicname: topic }) : null;

    var setInCollection = function setInCollection(soul, id) {
      var collection = collections[soul] = collections[soul] || { things: {} }; // eslint-disable-line
      collection.things[id] = 1;
    };

    Object.keys(things).forEach(function (id) {
      var _things$id = things[id],
          replyToId = _things$id.replyToId,
          timestamp = _things$id.timestamp,
          opId = _things$id.opId;

      var replyTo = things[replyToId || opId] = things[replyToId || opId] || {};
      var replies = replyTo.replies = replyTo.replies || {};
      replies[id] = 1;
      things[id].id = id;

      if (topic) {
        var topicDaySoul = topicSoul + "/days/" + peer.getDayStr(timestamp);
        setInCollection(topicSoul, id);
        setInCollection(topicDaySoul, id);
      }

      if (collectionSoul) {
        setInCollection(collectionSoul, id);
      }
    });

    return state;
  };
};

var loadState = exports.loadState = function loadState(peer) {
  return (0, _ramda.compose)(peer.mergeState, peer.reconstituteState);
};