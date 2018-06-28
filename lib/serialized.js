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
    var things = peer.getListingIds(params).map(function (id) {
      var _pathOr = (0, _ramda.pathOr)({}, ["things", id], peer.getState()),
          opId = _pathOr.opId,
          replyToId = _pathOr.replyToId,
          timestamp = _pathOr.timestamp,
          lastActive = _pathOr.lastActive,
          _pathOr$votes = _pathOr.votes,
          votes = _pathOr$votes === undefined ? {} : _pathOr$votes;

      var result = { id: id };

      if (Object.keys(votes || {}).length) result.votes = votes;
      if (opId) result.opId = opId;
      if (replyToId) result.replyToId = replyToId;
      if (timestamp) result.timestamp = timestamp;
      if (lastActive && lastActive !== timestamp) result.lastActive = lastActive;return result;
    }).reduce(function (res, thing) {
      return _extends({}, res, _defineProperty({}, thing.id, thing));
    }, {});

    var collections = peer.getListingSouls(params).reduce(function (result, soul) {
      var ids = peer.getCollection(soul);
      return Object.keys(ids).length ? _extends({}, result, _defineProperty({}, soul, { things: ids })) : result;
    }, {});

    return { things: things, collections: collections };
  };
};

var reconstituteState = exports.reconstituteState = function reconstituteState(peer) {
  return function (state) {
    var result = state;
    var things = state.things;

    Object.values(things).forEach(function (_ref) {
      var id = _ref.id,
          replyToId = _ref.replyToId;
      return result = (0, _ramda.assocPath)(["things", replyToId, "replies", id], 1, result);
    });
    return result;
  };
};