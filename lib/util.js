"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeObjects = exports.intersectArrays = exports.unionArrays = exports.unionSets = exports.intersectSets = exports.hasItems = exports.getSouls = exports.countKeys = exports.getKeys = exports.emptyPromise = exports.getRecord = exports.and = exports.allowFields = exports.valFromSoul = exports.soulMatchesKey = exports.isSoul = exports.valIs = exports.keyIs = exports.getDayStr = exports.TOPIC_NAME_MAX = exports.SUBMISSION_BODY_MAX = exports.SUBMISSION_TITLE_MAX = exports.COMMENT_BODY_MAX = exports.DEFAULT_POW_COMPLEXITY = exports.PREFIX = undefined;

var _zalgoPromise = require("zalgo-promise");

var _ramda = require("ramda");

var resolve = _zalgoPromise.ZalgoPromise.resolve;
var PREFIX = exports.PREFIX = "nab";
var DEFAULT_POW_COMPLEXITY = exports.DEFAULT_POW_COMPLEXITY = 18;
var COMMENT_BODY_MAX = exports.COMMENT_BODY_MAX = 10000;
var SUBMISSION_TITLE_MAX = exports.SUBMISSION_TITLE_MAX = 300;
var SUBMISSION_BODY_MAX = exports.SUBMISSION_BODY_MAX = 40000;
var TOPIC_NAME_MAX = exports.TOPIC_NAME_MAX = 42;

var getDayStr = exports.getDayStr = function getDayStr(timestamp) {
  var d = new Date(timestamp || new Date().getTime());
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth() + 1;
  var dayNum = d.getUTCDate();
  return year + "/" + month + "/" + dayNum;
};

var keyIs = exports.keyIs = function keyIs(val) {
  return function (key) {
    return key === val;
  };
};
var valIs = exports.valIs = function valIs(checkVal) {
  return function (_k, val) {
    return checkVal === val;
  };
};
var isSoul = exports.isSoul = function isSoul(soul) {
  return function (key, val, parent, parentKey, msg, peer) {
    var isMatch = peer.souls[soul].isMatch((0, _ramda.prop)("#", val) || key);
    if (isMatch) {
      var schemaCheck = peer.schema[soul](key, val, parent, parentKey, msg, peer);
      return isMatch && schemaCheck;
    }
  };
};
var soulMatchesKey = exports.soulMatchesKey = function soulMatchesKey(key, val) {
  return (0, _ramda.prop)("#", val) === key;
};
var valFromSoul = exports.valFromSoul = function valFromSoul(soul, routeKey) {
  return function (key, val, parent, pKey, _msg, peer) {
    return val === peer.souls[soul].isMatch((0, _ramda.prop)("#", parent) || pKey)[routeKey];
  };
};

var allowFields = exports.allowFields = function allowFields() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return function (pKey, val, _parent, _pKey, msg, peer) {
    return _zalgoPromise.ZalgoPromise.all(Object.keys(val || {}).map(function (key) {
      return _zalgoPromise.ZalgoPromise.all([keyIs("_"), keyIs("#")].concat(validators).map(function (fn) {
        return _zalgoPromise.ZalgoPromise.resolve(fn(key, val[key], val, pKey, msg, peer));
      })).then(function (results) {
        if (!results.find(_ramda.identity)) {
          if (key.indexOf("~") === -1) {
            // console.warn("sanitizing message", pKey, key); // eslint-disable-line
            delete val[key]; // eslint-disable-line
          } else {
              // console.warn("sea", pKey, key, msg); // eslint-disable-line
            }
        }
      });
    })).then(function () {
      return val;
    });
  };
};

var and = exports.and = function and() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var result = void 0;
    return !fns.find(function (fn, idx) {
      return idx === 0 // eslint-disable-line
      ? !(result = fn.apply(undefined, args)) : !fn.apply(undefined, args);
    }) ? result : false;
  };
};

var count = function count(x) {
  return x && x.length || 0;
};

var getRecord = exports.getRecord = function getRecord(peer, soul) {
  return (peer.gun.redis ? peer.gun.redis.get : peer.get)(soul);
};

var emptyPromise = exports.emptyPromise = resolve(null);
var getKeys = exports.getKeys = function getKeys(node) {
  return (0, _ramda.keysIn)(node || {}).filter(function (x) {
    return x && x !== "#" && x !== "_" && x !== "undefined";
  });
};
var countKeys = exports.countKeys = (0, _ramda.compose)(count, getKeys);
var getSouls = exports.getSouls = (0, _ramda.compose)((0, _ramda.filter)(function (x) {
  return !!x;
}), getKeys); // TODO: better implementation
var hasItems = exports.hasItems = function hasItems(node) {
  return getSouls(node).length > 0;
};

// eslint-disable-next-line
var intersectSetsReducer = function intersectSetsReducer(souls, items) {
  return items === null ? souls : souls === null ? getSouls(items) : (0, _ramda.intersection)(souls, getSouls(items));
};
var intersectSets = exports.intersectSets = (0, _ramda.compose)(function (souls) {
  return souls || [];
}, (0, _ramda.reduce)(intersectSetsReducer, null));

var unionSetsReducer = function unionSetsReducer(souls, items) {
  return items === null ? souls : souls === null ? getSouls(items) : (0, _ramda.union)(souls, getSouls(items));
};
var unionSets = exports.unionSets = (0, _ramda.compose)(function (souls) {
  return souls || [];
}, (0, _ramda.reduce)(unionSetsReducer, null));
var unionArrays = exports.unionArrays = (0, _ramda.reduce)(_ramda.union, []);
var intersectArrays = exports.intersectArrays = (0, _ramda.reduce)(function (res, ary) {
  return (0, _ramda.isNil)(ary) ? res : (0, _ramda.isNil)(res) ? ary : (0, _ramda.intersection)(res, ary);
}, null);

var mergeObjects = exports.mergeObjects = function mergeObjects(objList) {
  var res = {};
  objList.forEach(function (obj) {
    return (0, _ramda.keysIn)(obj || {}).forEach(function (key) {
      return res[key] = obj[key];
    });
  });
  return res;
};