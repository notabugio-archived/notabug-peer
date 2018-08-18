"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scopedListing = exports.newScope = exports.thingsData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

var _scope = require("./scope");

var _queries = require("./queries");

var _souls = require("./souls");

var SOULS = _interopRequireWildcard(_souls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var calculateThingScores = (0, _scope.query)(function (scope, thingid) {
  return (0, _queries.thingMeta)(scope, SOULS.thing.soul({ thingid: thingid })).then(function (meta) {
    var ups = (0, _ramda.pathOr)(0, ["votes", "up"], meta);
    var downs = (0, _ramda.pathOr)(0, ["votes", "down"], meta);
    var comments = (0, _ramda.pathOr)(0, ["votes", "comment"], meta);
    return { ups: ups, downs: downs, comments: comments, score: ups - downs };
  });
}, "thingScores");

var scoreThing = function scoreThing(_ref) {
  var _ref$votes = _ref.votes;
  _ref$votes = _ref$votes === undefined ? {} : _ref$votes;
  var _ref$votes$up = _ref$votes.up,
      up = _ref$votes$up === undefined ? 0 : _ref$votes$up,
      _ref$votes$down = _ref$votes.down,
      down = _ref$votes$down === undefined ? 0 : _ref$votes$down;
  return up - down;
};
var thresholdFilter = function thresholdFilter(threshold) {
  return (0, _ramda.filter)((0, _ramda.compose)(function (x) {
    return x >= threshold;
  }, scoreThing));
};
var metaSort = function metaSort(fn) {
  return function (scope, params) {
    return (0, _queries.multiThingMeta)(scope, params).then((0, _ramda.compose)((0, _ramda.sortBy)(fn), (0, _ramda.filter)(function (x) {
      return !!x;
    })));
  };
};

var sorts = {
  new: metaSort((0, _ramda.compose)(function (x) {
    return -1 * x;
  }, (0, _ramda.prop)("timestamp"))),
  old: metaSort((0, _ramda.prop)("timestamp")),
  active: metaSort(function (_ref2) {
    var timestamp = _ref2.timestamp,
        lastActive = _ref2.lastActive;
    return -1 * (lastActive || timestamp);
  }),
  top: metaSort((0, _ramda.compose)(function (x) {
    return -1 * x;
  }, scoreThing)),
  comments: metaSort((0, _ramda.compose)(function (x) {
    return -1 * x;
  }, (0, _ramda.pathOr)(0, ["votes", "comment"]))),
  hot: metaSort(function (thing) {
    var ups = (0, _ramda.pathOr)(0, ["votes", "up"], thing);
    var downs = (0, _ramda.pathOr)(0, ["votes", "down"], thing);
    var timestamp = (0, _ramda.prop)("timestamp", thing);
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
  best: metaSort(function (thing) {
    var ups = (0, _ramda.pathOr)(0, ["votes", "up"], thing);
    var downs = (0, _ramda.pathOr)(0, ["votes", "down"], thing);
    var n = ups + downs;
    if (n === 0) return 0;
    var z = 1.281551565545; // 80% confidence
    var p = ups / n;
    var left = p + 1 / (2 * n) * z * z;
    var right = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n));
    var under = 1 + 1 / n * z * z;
    return -1 * ((left - right) / under);
  }),
  controversial: metaSort(function (thing) {
    var ups = (0, _ramda.pathOr)(0, ["votes", "up"], thing);
    var downs = (0, _ramda.pathOr)(0, ["votes", "down"], thing);
    if (ups <= 0 || downs <= 0) return 0;
    var magnitude = ups + downs;
    var balance = ups > downs ? downs / ups : ups / downs;
    return -1 * Math.pow(magnitude, balance);
  })
};

var listingParams = function listingParams(params) {
  var sort = (0, _ramda.prop)("sort", params) || "hot";
  var limit = parseInt((0, _ramda.prop)("limit", params) || 0, 10);
  var days = parseInt((0, _ramda.prop)("days", params) || 0, 10) || null;
  var count = parseInt((0, _ramda.prop)("count", params) || 0, 10);
  var threshold = (0, _ramda.propOr)(null, "threshold", params);
  threshold = threshold === null ? null : parseInt(threshold, 10);
  return { sort: sort, limit: limit, count: count, threshold: threshold, days: days };
};

var listingSpaceDefinition = function listingSpaceDefinition(params) {
  var submissionId = params.submissionId || params.opId;
  var domain = params.domain;
  if (submissionId) return { good: [{ submissionIds: [submissionId] }] };
  if (domain) return { good: [{ domains: [domain] }] };
  return { good: [{ topics: params.topics || ["all"] }] };
};

var sortThings = function sortThings(scope, params) {
  return (sorts[params.sort] || sorts.hot)(scope, params);
};
var sortSpace = function sortSpace(scope, params) {
  return (0, _queries.singleSpace)(scope, params).then(function (thingSouls) {
    return sortThings(scope, _extends({}, params, { thingSouls: thingSouls }));
  }).then(params.threshold || params.threshold === 0 ? thresholdFilter(params.threshold) : _ramda.identity).then((0, _ramda.reduce)(function (thingsMap, thing) {
    if (thing && thing.id) thingsMap[thing.id] = thing; // eslint-disable-line no-param-reassign
    return thingsMap;
  }, {}));
};

var sortedSpace = function sortedSpace(scope, params) {
  return sortSpace(scope, _extends({}, params, listingParams(params), { space: listingSpaceDefinition(params) }));
};

var calculateListing = (0, _scope.query)(function (scope, params) {
  return sortedSpace(scope, params).then(function (things) {
    var limit = params.limit,
        _params$count = params.count,
        count = _params$count === undefined ? 0 : _params$count;

    var allIds = (0, _ramda.keysIn)(things);
    var ids = limit || count ? allIds.slice(count, count + limit) : allIds;
    return { ids: ids, query: params, things: things };
  });
});

var listingThingIds = (0, _scope.query)(function (scope, params) {
  return params.replyToId ? calculateReplyIds(scope, params) : calculateListing(scope, params).then((0, _ramda.prop)("ids"));
}, "listing");

var calculateListingWithData = (0, _scope.query)(function (scope, params) {
  return calculateListing(scope, params).then(function (_ref3) {
    var ids = _ref3.ids,
        other = _objectWithoutProperties(_ref3, ["ids"]);

    return (0, _queries.multiThingData)(scope, { thingIds: ids }).then(function (data) {
      return _extends({ ids: ids }, other, { data: data });
    });
  });
});

var calculateReplyIds = (0, _scope.query)(function (scope, _ref4) {
  var replyToId = _ref4.replyToId,
      params = _objectWithoutProperties(_ref4, ["replyToId"]);

  return calculateListingWithData(scope, _extends({}, params, { submissionId: params.opId })).then(function (_ref5) {
    var data = _ref5.data;
    return (0, _ramda.keysIn)(data).filter(function (id) {
      return (0, _ramda.pathOr)(null, [id, "replyToId"], data) === replyToId;
    });
  });
});

var thingsData = exports.thingsData = function thingsData(_ref6) {
  var gun = _ref6.gun;
  return function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _queries.multiThingData)(opts.scope || (0, _scope.scope)({ gun: gun }));
  };
};

var thingDataQuery = (0, _scope.query)(function (scope, thingid) {
  return scope.get(SOULS.thingData.soul({ thingid: thingid }));
}, "thingData");

var newScope = exports.newScope = function newScope(nab) {
  return function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _scope.scope)(_extends({}, opts, { gun: nab.gun }));
  };
};
var scopedListing = exports.scopedListing = function scopedListing(nab) {
  return function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var scope = opts.scope || (nab.scope = nab.scope || (0, _scope.scope)(_extends({}, opts, { gun: nab.gun }))); // eslint-disable-line
    var withScope = function withScope(q) {
      var fn = function fn() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return q.apply(undefined, [scope].concat(args));
      };
      fn.query = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return q.query.apply(q, [scope].concat(args));
      };
      fn.cached = function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return q.cached.apply(q, [scope].concat(args));
      };
      fn.now = function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return q.now.apply(q, [scope].concat(args));
      };
      return fn;
    };
    var meta = withScope(calculateListing);
    var withData = withScope(calculateListingWithData);
    var ids = withScope(listingThingIds);
    var thingScores = withScope(calculateThingScores);
    var thingData = withScope(thingDataQuery);
    return { scope: scope, meta: meta, withData: withData, ids: ids, thingScores: thingScores, thingData: thingData };
  };
};