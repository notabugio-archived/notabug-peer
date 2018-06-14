"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thingData = exports.things = exports.thingVotes = exports.thing = exports.thingComments = exports.thingAllComments = exports.domain = exports.url = exports.topics = exports.topicDays = exports.topicDay = exports.topic = exports.types = undefined;

var _prop = require("ramda/src/prop");

var _prop2 = _interopRequireDefault(_prop);

var _etc = require("./etc");

var _objectHash = require("object-hash");

var _objectHash2 = _interopRequireDefault(_objectHash);

var _proofOfWork = require("proof-of-work");

var _proofOfWork2 = _interopRequireDefault(_proofOfWork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var types = exports.types = (0, _etc.allowFields)((0, _etc.isSoul)("topicDay"), (0, _etc.isSoul)("topicDays"), (0, _etc.isSoul)("topics"), (0, _etc.isSoul)("topic"), (0, _etc.isSoul)("domain"), (0, _etc.isSoul)("url"), (0, _etc.isSoul)("thingData"), (0, _etc.isSoul)("thingVotes"), (0, _etc.isSoul)("thingAllComments"), (0, _etc.isSoul)("thingComments"), (0, _etc.isSoul)("thing"), (0, _etc.isSoul)("things"));

var topic = exports.topic = (0, _etc.allowFields)((0, _etc.and)((0, _etc.keyIs)("name"), (0, _etc.valFromSoul)("topic", "topicname")), (0, _etc.and)((0, _etc.isSoul)("thing"), _etc.soulMatchesKey));

var topicDay = exports.topicDay = (0, _etc.allowFields)((0, _etc.and)((0, _etc.keyIs)("name"), (0, _etc.valFromSoul)("topicDay", "topicname")), (0, _etc.and)((0, _etc.isSoul)("thing"), _etc.soulMatchesKey));

var topicDays = exports.topicDays = (0, _etc.allowFields)((0, _etc.and)((0, _etc.keyIs)("name"), (0, _etc.valFromSoul)("topicDays", "topicname")), (0, _etc.and)((0, _etc.isSoul)("topicDay"), _etc.soulMatchesKey));

var topics = exports.topics = (0, _etc.allowFields)((0, _etc.and)((0, _etc.isSoul)("topic"), _etc.soulMatchesKey));

var url = exports.url = (0, _etc.allowFields)((0, _etc.and)((0, _etc.isSoul)("thing"), _etc.soulMatchesKey));

var domain = exports.domain = (0, _etc.allowFields)((0, _etc.and)((0, _etc.isSoul)("thing"), _etc.soulMatchesKey));

var thingAllComments = exports.thingAllComments = (0, _etc.allowFields)((0, _etc.and)((0, _etc.isSoul)("thing"), _etc.soulMatchesKey));

var thingComments = exports.thingComments = (0, _etc.allowFields)((0, _etc.and)((0, _etc.isSoul)("thing"), _etc.soulMatchesKey));

var thing = exports.thing = (0, _etc.allowFields)((0, _etc.and)((0, _etc.keyIs)("id"), (0, _etc.valFromSoul)("thing", "thingid")), (0, _etc.and)((0, _etc.keyIs)("data"), (0, _etc.isSoul)("thingData")), (0, _etc.and)((0, _etc.keyIs)("topic"), (0, _etc.isSoul)("topic")), (0, _etc.and)((0, _etc.keyIs)("domain"), (0, _etc.isSoul)("domain")), (0, _etc.and)((0, _etc.keyIs)("url"), (0, _etc.isSoul)("url")), (0, _etc.and)((0, _etc.keyIs)("comments"), (0, _etc.isSoul)("thingComments")), (0, _etc.and)((0, _etc.keyIs)("allcomments"), (0, _etc.isSoul)("thingAllComments")), (0, _etc.and)((0, _etc.keyIs)("votesup"), (0, _etc.isSoul)("thingVotes")), (0, _etc.and)((0, _etc.keyIs)("votesdown"), (0, _etc.isSoul)("thingVotes")), (0, _etc.and)((0, _etc.keyIs)("op"), (0, _etc.isSoul)("thing")), (0, _etc.and)((0, _etc.keyIs)("replyTo"), (0, _etc.isSoul)("thing")), (0, _etc.keyIs)("timestamp"));

var thingVotes = exports.thingVotes = function thingVotes(key, val, parent, pKey, msg, peer) {
  var complexity = _etc.DEFAULT_POW_COMPLEXITY;
  var match = peer.souls.thingVotes.isMatch(val["#"] || key);
  Object.keys(val).map(function (voteKey) {
    if (voteKey === "#" || voteKey === "_") return;
    var vote = val[voteKey];
    var verifier = new _proofOfWork2.default.Verifier({
      size: 1024,
      n: 16,
      complexity: complexity,
      prefix: key,
      validity: Infinity
    });

    var nonce = Buffer.hasOwnProperty("from") ? Buffer.from(vote, "hex") : new Buffer(vote, "hex");

    if (!verifier.check(nonce, complexity)) {
      console.warn("invalid vote", key, vote); // eslint-disable-line
      delete val[voteKey]; // eslint-disable-line
    }
  });
  return !!match;
};

var things = exports.things = (0, _etc.allowFields)((0, _etc.and)((0, _etc.isSoul)("thing"), _etc.soulMatchesKey));

var sanitizeThingData = (0, _etc.allowFields)((0, _etc.keyIs)("kind"), (0, _etc.keyIs)("title"), (0, _etc.keyIs)("topic"), (0, _etc.keyIs)("body"), (0, _etc.keyIs)("author"), (0, _etc.keyIs)("authorId"), (0, _etc.keyIs)("opId"), (0, _etc.keyIs)("replyToId"), (0, _etc.keyIs)("domain"), (0, _etc.keyIs)("url"), (0, _etc.keyIs)("timestamp"));

var thingData = function thingData(key, val, parent, pKey, msg, peer) {
  return sanitizeThingData(key, val, parent, pKey, msg, peer).then(function () {
    var _ = val._,
        record = _objectWithoutProperties(val, ["_"]);

    delete record["#"];

    if (peer.isBlocked(key)) {
      val["url"] = null; // eslint-disable-line
      val["body"] = "[removed]"; // eslint-disable-line
      Object.keys(val).forEach(function (vk) {
        if (vk !== "url" && vk !== "body" && vk !== "_" && vk !== "#") {
          delete val[vk]; // eslint-disable-line
        }
      });
    } else if (Object.keys(record).length) {
      var id = (0, _objectHash2.default)(record, { unorderedSets: true });
      var match = peer.souls.thingData.isMatch((0, _prop2.default)("#", val) || key);

      if (id !== match.thingid) {
        console.warn("thing data mismatch", id, match.thingid, msg, record); // eslint-disable-line
        Object.keys(val).forEach(function (vk) {
          if (vk !== "_" && vk !== "#") {
            delete val[vk]; // eslint-disable-line
          }
        });
      }
    }

    return val;
  });
};
exports.thingData = thingData;