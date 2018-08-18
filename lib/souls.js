"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.things = exports.thing = exports.thingComments = exports.thingAllComments = exports.thingVoteCounts = exports.thingVotes = exports.thingData = exports.url = exports.domain = exports.topics = exports.topic = exports.topicDays = exports.topicDay = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

var _routeParser = require("route-parser");

var _routeParser2 = _interopRequireDefault(_routeParser);

var _urllite = require("urllite");

var _urllite2 = _interopRequireDefault(_urllite);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectType = function objectType(path, checkMatch, options) {
  var routeMatcher = new _routeParser2.default(path);
  var methods = {
    checkMatch: checkMatch,
    isMatch: function isMatch(pathToCheck) {
      var didMatch = routeMatcher.match(pathToCheck);
      return didMatch && checkMatch(didMatch) ? didMatch : null;
    },

    soul: function soul(params) {
      return routeMatcher.reverse(params || {});
    }
  };
  var init = function init(peer) {
    return _extends({}, methods, { get: function get(params) {
        return peer.gun.get(routeMatcher.reverse(params || {}));
      }
    });
  };
  (0, _ramda.keysIn)(methods).forEach(function (key) {
    return init[key] = methods[key];
  });
  return init;
};

var checkTopicMatch = function checkTopicMatch(_ref) {
  var topicname = _ref.topicname;

  if (!topicname || typeof topicname !== "string") return false;
  if (topicname !== topicname.toLowerCase()) return false;
  return true;
};

var checkThingMatch = function checkThingMatch(_ref2) {
  var thingid = _ref2.thingid;

  if (!thingid || typeof thingid !== "string") return false;
  // TODO: check length?
  return true;
};

var topicDay = exports.topicDay = objectType(_util.PREFIX + "/topics/:topicname/days/:year/:month/:day", function (_ref3) {
  var topicname = _ref3.topicname,
      year = _ref3.year,
      month = _ref3.month,
      day = _ref3.day;

  var iyear = parseInt(year, 10);
  var imonth = parseInt(month, 10);
  var iday = parseInt(day, 10);
  if (!iyear || !imonth || !iday || !topicname) return false;
  var d = new Date(year, month - 1, day);
  if ((0, _util.getDayStr)(d) !== year + "/" + month + "/" + day) return false;
  return checkTopicMatch({ topicname: topicname });
});

var topicDays = exports.topicDays = objectType(_util.PREFIX + "/topics/:topicname/days", checkTopicMatch);

var topic = exports.topic = objectType(_util.PREFIX + "/topics/:topicname", checkTopicMatch);

var topics = exports.topics = objectType(_util.PREFIX + "/topics", (0, _ramda.always)(true));

var domain = exports.domain = objectType(_util.PREFIX + "/domains/:domain", (0, _ramda.always)(true) // TODO: verify domain structure
);

var url = exports.url = objectType([_util.PREFIX + "/urls/", "*url"].join(""), function (match) {
  var urlinfo = (0, _urllite2.default)(match.url);
  if (urlinfo.host && urlinfo.protocol) return true;
  return false;
});

var thingData = exports.thingData = objectType(_util.PREFIX + "/things/:thingid/data", checkThingMatch);

var thingVotes = exports.thingVotes = objectType(_util.PREFIX + "/things/:thingid/votes:votekind", checkThingMatch);

var thingVoteCounts = exports.thingVoteCounts = objectType(_util.PREFIX + "/things/:thingid/votecounts", checkThingMatch);

var thingAllComments = exports.thingAllComments = objectType(_util.PREFIX + "/things/:thingid/allcomments", checkThingMatch);

var thingComments = exports.thingComments = objectType(_util.PREFIX + "/things/:thingid/comments", checkThingMatch);

var thing = exports.thing = objectType(_util.PREFIX + "/things/:thingid", checkThingMatch);

var things = exports.things = objectType(_util.PREFIX + "/things", (0, _ramda.always)(true));