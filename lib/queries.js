"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiSpace = exports.multiLens = exports.multiSubmission = exports.multiTopic = exports.multiUrl = exports.multiDomain = exports.multiAuthor = exports.multiThingData = exports.singleSpace = exports.singleLens = exports.singleSubmission = exports.singleTopic = exports.singleUrl = exports.singleDomain = exports.singleAuthor = exports.singleThingData = exports.multiThingMeta = exports.thingMeta = exports.thingScores = exports.thing = exports.thingAllCommentsCount = exports.thingVotesDown = exports.thingVotesUp = exports.getTopicSouls = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

var _util = require("./util");

var _scope = require("./scope");

var _souls = require("./souls");

var SOULS = _interopRequireWildcard(_souls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getTopicSouls = exports.getTopicSouls = function getTopicSouls(params) {
  var _ref = params || {},
      _ref$topics = _ref.topics,
      topics = _ref$topics === undefined ? ["all"] : _ref$topics;

  var days = (0, _ramda.propOr)(90, "days", params) || 90;
  var dayStrings = [];
  var oneDay = 1000 * 60 * 60 * 24;
  var start = new Date().getTime() - oneDay * parseInt(days, 10);
  for (var i = 0; i <= days + 1; i++) {
    dayStrings.push((0, _util.getDayStr)(start + i * oneDay));
  }return Object.keys(topics.reduce(function (result, topicName) {
    return dayStrings.reverse().reduce(function (res, ds) {
      return _extends({}, res, _defineProperty({}, _util.PREFIX + "/topics/" + topicName + "/days/" + ds, true));
    }, result);
  }, {}));
};

var thingVoteCount = function thingVoteCount(voteType) {
  return (0, _scope.query)(function (scope, thingSoul) {
    return scope.get(thingSoul + "/" + voteType).count();
  });
};

var thingVotesUp = exports.thingVotesUp = thingVoteCount("votesup");
var thingVotesDown = exports.thingVotesDown = thingVoteCount("votesdown");
var thingAllCommentsCount = exports.thingAllCommentsCount = (0, _scope.query)(function (scope, thingSoul) {
  return scope.get(thingSoul + "/allcomments").count();
});

var thing = exports.thing = (0, _scope.query)(function (scope, thingSoul) {
  return scope.get(thingSoul).then(function (meta) {
    if (!meta || !meta.id) return null;
    var result = { id: meta.id, timestamp: meta.timestamp };
    var replyToSoul = (0, _ramda.path)(["replyTo", "#"], meta);
    var opSoul = (0, _ramda.path)(["op", "#"], meta);
    var opId = opSoul ? SOULS.thing.isMatch(opSoul).thingid : null;
    var replyToId = replyToSoul ? SOULS.thing.isMatch(replyToSoul).thingid : null;
    if (opId) result.opId = opId;
    if (replyToId) result.replyToId = replyToId;
    return result;
  });
});

var thingScores = exports.thingScores = (0, _scope.query)(function (scope, thingSoul) {
  return (0, _scope.all)([thingVotesUp(scope, thingSoul), thingVotesDown(scope, thingSoul), thingAllCommentsCount(scope, thingSoul)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 3),
        up = _ref3[0],
        down = _ref3[1],
        comment = _ref3[2];

    return { up: up, down: down, comment: comment, score: up - down };
  });
});

var thingMeta = exports.thingMeta = (0, _scope.query)(function (scope, thingSoul) {
  return (0, _scope.all)([thing(scope, thingSoul), scope.get(thingSoul + "/votecounts").then()]).then(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        meta = _ref5[0],
        _ref5$ = _ref5[1],
        votes = _ref5$ === undefined ? {} : _ref5$;

    if (!meta || !meta.id) return null;
    return _extends({}, meta, { votes: votes });
  });
});

var multiThingMeta = exports.multiThingMeta = (0, _scope.query)(function (scope, params) {
  return (0, _scope.all)((0, _ramda.propOr)([], "thingSouls", params).map(function (thingSoul) {
    return thingMeta(scope, thingSoul);
  }));
});

var singleThingData = (0, _scope.query)(function (scope, _ref6) {
  var thingid = _ref6.thingId;
  return scope.get(SOULS.thingData.soul({ thingid: thingid })).then(function (data) {
    var _ref7 = data || {},
        _ = _ref7._,
        actual = _objectWithoutProperties(_ref7, ["_"]);

    return _defineProperty({}, thingid, data ? actual : data);
  });
});

exports.singleThingData = singleThingData;
var singleAuthor = exports.singleAuthor = (0, _scope.query)(function (scope, params) {
  return scope.get(params.authorId).get("things").souls();
});

var singleDomain = exports.singleDomain = (0, _scope.query)(function (scope, _ref9) {
  var domain = _ref9.domain;
  return scope.get(SOULS.domain.soul({ domain: domain })).souls();
});

var singleUrl = exports.singleUrl = (0, _scope.query)(function (scope, _ref10) {
  var url = _ref10.url;
  return scope.get(SOULS.url.soul({ url: url })).souls();
});

var singleTopic = exports.singleTopic = (0, _scope.query)(function (scope, params) {
  return (0, _scope.all)((0, _ramda.map)(function (soul) {
    return scope.get(soul).souls();
  }, getTopicSouls(_extends({}, params, { topics: [params.topic] })))).then((0, _ramda.reduce)(function (souls, more) {
    return souls.length < 1000 ? [].concat(_toConsumableArray(souls), _toConsumableArray(more)) : souls;
  }, []));
});

var singleSubmission = exports.singleSubmission = (0, _scope.query)(function (scope, params) {
  return scope.get(SOULS.thingAllComments.soul({ thingid: params.submissionId })).souls(function (souls) {
    return [SOULS.thing.soul({ thingid: params.submissionId })].concat(_toConsumableArray(souls));
  });
});

var singleLens = exports.singleLens = (0, _scope.query)(function (scope, params) {
  return (0, _scope.all)([multiAuthor(scope, _extends({}, params.lens, params)), multiDomain(scope, _extends({}, params.lens, params)), multiUrl(scope, _extends({}, params.lens, params)), multiTopic(scope, _extends({}, params.lens, params)), multiSubmission(scope, _extends({}, params.lens, params)), multiSpace(scope, _extends({}, params.lens, params))]).then(_util.intersectArrays);
});

var singleSpace = exports.singleSpace = (0, _scope.query)(function (scope, params) {
  return !params.space ? _util.emptyPromise : (0, _scope.all)([multiLens(scope, _extends({}, params, { lenses: params.space.good })), multiLens(scope, _extends({}, params, { lenses: params.space.bad }))]).then(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        goodSouls = _ref12[0],
        badSouls = _ref12[1];

    return (0, _ramda.difference)(goodSouls || [], badSouls || []);
  });
});

var multiQuery = function multiQuery(singleQuery, plural, single) {
  var collate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _util.unionArrays;
  return (0, _scope.query)(function (scope, params) {
    return (0, _ramda.isNil)((0, _ramda.prop)(plural, params)) ? _util.emptyPromise : (0, _scope.all)((0, _ramda.map)(function (val) {
      return singleQuery(scope, _extends({}, params, _defineProperty({}, single, val)));
    }, (0, _ramda.propOr)([], plural, params))).then(collate);
  });
};

var multiThingData = exports.multiThingData = multiQuery(singleThingData, "thingIds", "thingId", _util.mergeObjects);
var multiAuthor = exports.multiAuthor = multiQuery(singleAuthor, "authorIds", "authorId");
var multiDomain = exports.multiDomain = multiQuery(singleDomain, "domains", "domain");
var multiUrl = exports.multiUrl = multiQuery(singleUrl, "urls", "url");
var multiTopic = exports.multiTopic = multiQuery(singleTopic, "topics", "topic");
var multiSubmission = exports.multiSubmission = multiQuery(singleSubmission, "submissionIds", "submissionId");
var multiLens = exports.multiLens = multiQuery(singleLens, "lenses", "lens");
var multiSpace = exports.multiSpace = multiQuery(singleSpace, "spaces", "space");