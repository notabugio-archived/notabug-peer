"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCollectionsArray = exports.getCollections = exports.getCollection = exports.getScore = exports.getOpId = exports.getVoteCount = exports.getLastActive = exports.getTimestamp = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _compose = require("ramda/src/compose");

var _compose2 = _interopRequireDefault(_compose);

var _pathOr = require("ramda/src/pathOr");

var _pathOr2 = _interopRequireDefault(_pathOr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTimestamp = exports.getTimestamp = function getTimestamp(peer) {
  return function (id) {
    return (0, _pathOr2.default)(0, ["things", id, "timestamp"], peer.getState());
  };
};

var getLastActive = exports.getLastActive = function getLastActive(peer) {
  return function (id) {
    return (0, _pathOr2.default)(peer.getTimestamp(id), ["things", id, "lastActive"], peer.getState());
  };
};

var getVoteCount = exports.getVoteCount = function getVoteCount(peer) {
  return function (id, type) {
    return (0, _pathOr2.default)(0, ["things", id, "votes", type], peer.getState());
  };
};

var getOpId = exports.getOpId = function getOpId(peer) {
  return function (id) {
    return (0, _pathOr2.default)(id, ["things", id, "opId"], peer.getState());
  };
};

var getScore = exports.getScore = function getScore(peer) {
  return function (id) {
    return peer.getVoteCount(id, "up") - peer.getVoteCount(id, "down");
  };
};

var getCollection = exports.getCollection = function getCollection(peer) {
  return function (soul) {
    return (0, _pathOr2.default)({}, ["collections", soul, "things"], peer.getState());
  };
};

var getCollections = exports.getCollections = function getCollections(peer) {
  return function (souls) {
    return souls.reduce(function (ids, collection) {
      return _extends({}, ids, getCollection(peer)(collection));
    }, {});
  };
};

var getCollectionsArray = exports.getCollectionsArray = function getCollectionsArray(peer) {
  return (0, _compose2.default)(Object.keys, getCollections(peer));
};