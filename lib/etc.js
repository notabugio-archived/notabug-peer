"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.and = exports.allowFields = exports.valFromSoul = exports.soulMatchesKey = exports.isSoul = exports.valIs = exports.keyIs = exports.TOPIC_NAME_MAX = exports.SUBMISSION_BODY_MAX = exports.SUBMISSION_TITLE_MAX = exports.COMMENT_BODY_MAX = exports.DEFAULT_POW_COMPLEXITY = exports.PREFIX = undefined;

var _prop = require("ramda/src/prop");

var _prop2 = _interopRequireDefault(_prop);

var _identity = require("ramda/src/identity");

var _identity2 = _interopRequireDefault(_identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREFIX = exports.PREFIX = "nab";
var DEFAULT_POW_COMPLEXITY = exports.DEFAULT_POW_COMPLEXITY = 22;
var COMMENT_BODY_MAX = exports.COMMENT_BODY_MAX = 10000;
var SUBMISSION_TITLE_MAX = exports.SUBMISSION_TITLE_MAX = 300;
var SUBMISSION_BODY_MAX = exports.SUBMISSION_BODY_MAX = 40000;
var TOPIC_NAME_MAX = exports.TOPIC_NAME_MAX = 42;

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
    var isMatch = peer.souls[soul].isMatch((0, _prop2.default)("#", val) || key);
    if (isMatch) {
      var schemaCheck = peer.schema[soul](key, val, parent, parentKey, msg, peer);
      return isMatch && schemaCheck;
    }
  };
};
var soulMatchesKey = exports.soulMatchesKey = function soulMatchesKey(key, val) {
  return (0, _prop2.default)("#", val) === key;
};
var valFromSoul = exports.valFromSoul = function valFromSoul(soul, routeKey) {
  return function (key, val, parent, pKey, _msg, peer) {
    return val === peer.souls[soul].isMatch((0, _prop2.default)("#", parent) || pKey)[routeKey];
  };
};

var allowFields = exports.allowFields = function allowFields() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return function (pKey, val, _parent, _pKey, msg, peer) {
    return Promise.all(Object.keys(val || {}).map(function (key) {
      return Promise.all([keyIs("_"), keyIs("#")].concat(validators).map(function (fn) {
        return Promise.resolve(fn(key, val[key], val, pKey, msg, peer));
      })).then(function (results) {
        if (!results.find(_identity2.default)) {
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