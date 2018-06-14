"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.things = exports.thing = exports.thingComments = exports.thingAllComments = exports.thingVotes = exports.thingData = exports.url = exports.domain = exports.topics = exports.topic = exports.topicDays = exports.topicDay = undefined;

var _always = require("ramda/src/always");

var _always2 = _interopRequireDefault(_always);

var _routeParser = require("route-parser");

var _routeParser2 = _interopRequireDefault(_routeParser);

var _urllite = require("urllite");

var _urllite2 = _interopRequireDefault(_urllite);

var _etc = require("./etc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectType = function objectType(path, checkMatch, options) {
  var routeMatcher = new _routeParser2.default(path);

  return function (peer) {
    var type = {
      checkMatch: checkMatch,
      isMatch: function isMatch(pathToCheck) {
        var didMatch = routeMatcher.match(pathToCheck);
        return didMatch && checkMatch(didMatch, peer) ? didMatch : null;
      },
      soul: function soul(params) {
        return routeMatcher.reverse(params || {});
      },
      get: function get(params) {
        return peer.gun.get(routeMatcher.reverse(params || {}));
      }
    };

    return type;
  };
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

var topicDay = exports.topicDay = objectType(_etc.PREFIX + "/topics/:topicname/days/:year/:month/:day", function (_ref3, peer) {
  var topicname = _ref3.topicname,
      year = _ref3.year,
      month = _ref3.month,
      day = _ref3.day;

  var iyear = parseInt(year, 10);
  var imonth = parseInt(month, 10);
  var iday = parseInt(day, 10);
  if (!iyear || !imonth || !iday || !topicname) return false;
  var d = new Date(year, month - 1, day);
  if (peer.getDayStr(d) !== year + "/" + month + "/" + day) return false;
  return checkTopicMatch({ topicname: topicname });
});

var topicDays = exports.topicDays = objectType(_etc.PREFIX + "/topics/:topicname/days", checkTopicMatch);

var topic = exports.topic = objectType(_etc.PREFIX + "/topics/:topicname", checkTopicMatch);

var topics = exports.topics = objectType(_etc.PREFIX + "/topics", (0, _always2.default)(true));

var domain = exports.domain = objectType(_etc.PREFIX + "/domains/:domain", (0, _always2.default)(true) // TODO: verify domain structure
);

var url = exports.url = objectType([_etc.PREFIX + "/urls/", "*url"].join(""), function (match) {
  var urlinfo = (0, _urllite2.default)(match.url);
  if (urlinfo.host && urlinfo.protocol) return true;
  return false;
});

var thingData = exports.thingData = objectType(_etc.PREFIX + "/things/:thingid/data", checkThingMatch);

var thingVotes = exports.thingVotes = objectType(_etc.PREFIX + "/things/:thingid/votes:votekind", checkThingMatch);

var thingAllComments = exports.thingAllComments = objectType(_etc.PREFIX + "/things/:thingid/allcomments", checkThingMatch);

var thingComments = exports.thingComments = objectType(_etc.PREFIX + "/things/:thingid/comments", checkThingMatch);

var thing = exports.thing = objectType(_etc.PREFIX + "/things/:thingid", checkThingMatch);

var things = exports.things = objectType(_etc.PREFIX + "/things", (0, _always2.default)(true));