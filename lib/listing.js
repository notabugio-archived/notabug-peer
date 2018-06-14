"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unwatchListing = exports.watchListing = exports.getListingIds = exports.getListingSouls = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _compose = require("ramda/src/compose");

var _compose2 = _interopRequireDefault(_compose);

var _filter = require("ramda/src/filter");

var _filter2 = _interopRequireDefault(_filter);

var _identity = require("ramda/src/identity");

var _identity2 = _interopRequireDefault(_identity);

var _lte = require("ramda/src/lte");

var _lte2 = _interopRequireDefault(_lte);

var _slice = require("ramda/src/slice");

var _slice2 = _interopRequireDefault(_slice);

var _etc = require("./etc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      return [_etc.PREFIX + "/things/" + replyToId + "/comments"];
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

var getListingIds = exports.getListingIds = function getListingIds(peer) {
  return function (params) {
    var _ref2 = params || {},
        limit = _ref2.limit,
        _ref2$sort = _ref2.sort,
        sort = _ref2$sort === undefined ? "hot" : _ref2$sort,
        _ref2$count = _ref2.count,
        count = _ref2$count === undefined ? 0 : _ref2$count,
        _ref2$threshold = _ref2.threshold,
        threshold = _ref2$threshold === undefined ? null : _ref2$threshold;

    if (!peer.sorts[sort]) throw new Error("Unknown sort: " + sort);

    return (0, _compose2.default)(limit ? (0, _slice2.default)(count, count + limit) : _identity2.default, peer.sorts[sort], threshold === null ? _identity2.default : (0, _filter2.default)((0, _compose2.default)((0, _lte2.default)(threshold), peer.getScore)), peer.getCollectionsArray, peer.getListingSouls)(params);
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