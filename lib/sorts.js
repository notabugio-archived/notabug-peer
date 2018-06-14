"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sorts = undefined;

var _sortBy = require("ramda/src/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sorts = exports.sorts = function sorts(peer) {
  return {
    new: (0, _sortBy2.default)(function (id) {
      return -1 * peer.getTimestamp(id);
    }),
    old: (0, _sortBy2.default)(function (id) {
      return peer.getTimestamp(id);
    }),
    top: (0, _sortBy2.default)(function (id) {
      return -1 * peer.getScore(id);
    }),
    comments: (0, _sortBy2.default)(function (id) {
      return -1 * peer.getVoteCount(id, "comment");
    }),
    hot: (0, _sortBy2.default)(function (id) {
      var ups = peer.getVoteCount(id, "up");
      var downs = peer.getVoteCount(id, "down");
      var timestamp = peer.getTimestamp(id);
      var score = ups - downs;
      var seconds = timestamp / 1000 - 1134028003;
      var order = Math.log10(Math.max(Math.abs(score), 1));
      var sign = 0;
      if (score > 0) {
        sign = 1;
      } else if (score < 0) {
        sign = -1;
      }
      return -1 * (sign * order + seconds / 45000);
    }),
    best: (0, _sortBy2.default)(function (id) {
      var ups = peer.getVoteCount(id, "up");
      var downs = peer.getVoteCount(id, "down");
      var n = ups + downs;
      if (n === 0) return 0;
      var z = 1.281551565545; // 80% confidence
      var p = ups / n;
      var left = p + 1 / (2 * n) * z * z;
      var right = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n));
      var under = 1 + 1 / n * z * z;
      return -1 * ((left - right) / under);
    }),
    controversial: (0, _sortBy2.default)(function (id) {
      var ups = peer.getVoteCount(id, "up");
      var downs = peer.getVoteCount(id, "down");
      if (ups <= 0 || downs <= 0) return 0;
      var magnitude = ups + downs;
      var balance = ups > downs ? downs / ups : ups / downs;
      return -1 * Math.pow(magnitude, balance);
    })
  };
};