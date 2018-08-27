"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voteCounts = undefined;

var _souls = require("./souls");

var SOULS = _interopRequireWildcard(_souls);

var _scope = require("./scope");

var _queries = require("./queries");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var watchedComputed = function watchedComputed(peer, soul, match, queryFn) {
  peer.watched = peer.watched || {}; // eslint-disable-line no-param-reassign
  if (peer.watched[soul]) return peer.watched[soul];
  var scope = peer.newScope();
  var update = function update(qscope) {
    return queryFn(qscope || peer.newScope(), match).then(function (r) {
      return peer.gun.get(soul).once(function (existing) {
        if (!existing || Object.keys(r || {}).find(function (key) {
          return key !== "_" && r[key] !== existing[key];
        })) peer.gun.get(soul).put(r);
      });
    });
  };
  var onIn = function onIn(msg) {
    if (!msg.put) return;
    var access = scope.getAccesses();
    var updated = false;
    var prop = void 0;
    for (prop in msg.put) {
      // eslint-disable-line
      if (prop in access) updated = prop;
    }
    if (updated) update();
  };
  update(scope);
  peer.watched[soul] = { onIn: onIn }; // eslint-disable-line no-param-reassign
  return peer.watched[soul];
};

var gunComputed = function gunComputed(soulType, queryFn) {
  var onIn = function onIn(peer, msg) {
    var prop = void 0;
    var match = void 0;
    var soul = void 0;
    for (prop in msg.get || {}) {
      // eslint-disable-line guard-for-in
      soul = msg.get[prop];
      match = soulType.isMatch(soul);
      if (match) {
        watchedComputed(peer, soul, match, queryFn);
      }
    }
    Object.keys(peer.watched || {}).forEach(function (key) {
      return peer.watched[key].onIn(msg);
    });
  };
  return { onIn: onIn };
};

var voteCounts = exports.voteCounts = gunComputed(SOULS.thingVoteCounts, (0, _scope.query)(function (scope, params) {
  return (0, _queries.thingScores)(scope, SOULS.thing.soul(params));
}));