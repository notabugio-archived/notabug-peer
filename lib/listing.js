"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unwatchListing = exports.watchListing = exports.getListingIds = exports.getListingSouls = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

var _etc = require("./etc");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getListingSouls = exports.getListingSouls = function getListingSouls(peer) {
  return function (params) {
    var _ref = params || {},
        days = _ref.days,
        _ref$topics = _ref.topics,
        topics = _ref$topics === undefined ? ["all"] : _ref$topics,
        replyToId = _ref.replyToId,
        domain = _ref.domain,
        url = _ref.url;

    var dayStrings = void 0;

    if (replyToId) {
      return [_etc.PREFIX + "/things/" + peer.getOpId(replyToId) + "/allcomments"];
    } else if (url) {
      return [_etc.PREFIX + "/urls/" + url];
    } else if (domain) {
      return [_etc.PREFIX + "/domains/" + domain];
    } else if (days) {
      var oneDay = 1000 * 60 * 60 * 24;
      var start = new Date().getTime() - oneDay * parseInt(days, 10);
      dayStrings = [];

      for (var i = 0; i <= days + 1; i++) {
        dayStrings.push(peer.getDayStr(start + i * oneDay));
      }
    }

    return Object.keys(topics.reduce(function (result, topicName) {
      return dayStrings ? dayStrings.reduce(function (topicResult, dayString) {
        return _extends({}, topicResult, _defineProperty({}, _etc.PREFIX + "/topics/" + topicName + "/days/" + dayString, true));
      }, result) : _extends({}, result, _defineProperty({}, _etc.PREFIX + "/topics/" + topicName, true));
    }, {}));
  };
};

var getReplies = function getReplies(peer, params) {
  var _ref2 = params || {},
      limit = _ref2.limit,
      _ref2$sort = _ref2.sort,
      sort = _ref2$sort === undefined ? "hot" : _ref2$sort,
      replyToId = _ref2.replyToId,
      _ref2$count = _ref2.count,
      count = _ref2$count === undefined ? 0 : _ref2$count,
      _ref2$threshold = _ref2.threshold,
      threshold = _ref2$threshold === undefined ? null : _ref2$threshold;

  return (0, _ramda.compose)(limit ? (0, _ramda.slice)(count, count + limit) : _ramda.identity, peer.sorts[sort], threshold === null ? _ramda.identity : (0, _ramda.filter)((0, _ramda.compose)((0, _ramda.lte)(threshold), peer.getScore)), Object.keys, (0, _ramda.pathOr)({}, ["things", replyToId, "replies"]))(peer.getState());
};

var getListingIds = exports.getListingIds = function getListingIds(peer) {
  return function (params) {
    var _ref3 = params || {},
        limit = _ref3.limit,
        _ref3$sort = _ref3.sort,
        sort = _ref3$sort === undefined ? "hot" : _ref3$sort,
        _ref3$count = _ref3.count,
        count = _ref3$count === undefined ? 0 : _ref3$count,
        _ref3$threshold = _ref3.threshold,
        threshold = _ref3$threshold === undefined ? null : _ref3$threshold;

    if (!peer.sorts[sort]) throw new Error("Unknown sort: " + sort);

    if (params.replyToId) return getReplies(peer, params);

    return (0, _ramda.compose)(limit ? (0, _ramda.slice)(count, count + limit) : _ramda.identity, peer.sorts[sort], threshold === null ? _ramda.identity : (0, _ramda.filter)((0, _ramda.compose)((0, _ramda.lte)(threshold), peer.getScore)), peer.getCollectionsArray, peer.getListingSouls)(params);
  };
};

var watchListing = exports.watchListing = function watchListing(peer) {
  return function (params) {
    return peer.getListingSouls(params).map(peer.watchCollection);
  };
};

var unwatchListing = exports.unwatchListing = function unwatchListing(peer) {
  return function (params) {
    return peer.getListingSouls(params).map(peer.unwatchCollection);
  };
};