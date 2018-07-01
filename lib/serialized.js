"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reconstituteState = exports.getListingJson = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getListingJson = exports.getListingJson = function getListingJson(peer) {
  return function (params) {
    peer.watchListing(params);
    var things = peer.getListingIds(params).reduce(function (result, id) {
      var thing = {};

      var _pathOr = (0, _ramda.pathOr)({}, ["things", id], peer.getState()),
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
      return _extends({}, result, _defineProperty({}, id, thing));
    }, {});
    return { things: things };
  };
};

var reconstituteState = exports.reconstituteState = function reconstituteState(peer) {
  return function (state) {
    var things = state.things,
        topic = state.topic,
        collectionSoul = state.collectionSoul;

    var collections = {};

    return (0, _ramda.mergeDeepRight)(Object.keys(things).reduce(function (result, id) {
      var _things$id = things[id],
          replyToId = _things$id.replyToId,
          timestamp = _things$id.timestamp;


      result = (0, _ramda.assocPath)(["things", id, "id"], id, result); // eslint-disable-line
      result = (0, _ramda.assocPath)(["things", replyToId, "replies", id], 1, result); // eslint-disable-line

      if (topic) {
        var topicSoul = peer.souls.topic.soul({ topicname: topic });
        var topicDaySoul = topicSoul + "/days/" + peer.getDayStr(timestamp);
        collections = (0, _ramda.assocPath)([topicSoul, "things", id], 1, collections);
        collections = (0, _ramda.assocPath)([topicDaySoul, "things", id], 1, collections);
      }

      if (collectionSoul) {
        collections = (0, _ramda.assocPath)([collectionSoul, "things", id], 1, collections);
      }

      return result;
    }, state), { collections: collections });
  };
};