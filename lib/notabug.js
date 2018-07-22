"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _etc = require("./etc");

Object.keys(_etc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _etc[key];
    }
  });
});

var _proofOfWork = require("proof-of-work");

Object.defineProperty(exports, "pow", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_proofOfWork).default;
  }
});

var _ramda = require("ramda");

var _sorts = require("./sorts");

var _watch = require("./watch");

var watch = _interopRequireWildcard(_watch);

var _fetch = require("./fetch");

var fetch = _interopRequireWildcard(_fetch);

var _write = require("./write");

var write = _interopRequireWildcard(_write);

var _souls = require("./souls");

var souls = _interopRequireWildcard(_souls);

var _schema = require("./schema");

var schema = _interopRequireWildcard(_schema);

var _serialized = require("./serialized");

var serialized = _interopRequireWildcard(_serialized);

var _auth = require("./auth");

var auth = _interopRequireWildcard(_auth);

var _accessors = require("./accessors");

var accessors = _interopRequireWildcard(_accessors);

var _listing = require("./listing");

var listing = _interopRequireWildcard(_listing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* globals Gun */


var DEFAULT_PEERS = ["https://notabug.io/gun"];

var notabug = function notabug() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var state = (0, _ramda.mergeDeepRight)({}, initialState);

  var _ref = config || {},
      _ref$peers = _ref.peers,
      peers = _ref$peers === undefined ? DEFAULT_PEERS : _ref$peers,
      disableValidation = _ref.disableValidation,
      _ref$blocked = _ref.blocked,
      blocked = _ref$blocked === undefined ? [] : _ref$blocked,
      _ref$noGun = _ref.noGun,
      noGun = _ref$noGun === undefined ? false : _ref$noGun,
      _ref$localStorage = _ref.localStorage,
      localStorage = _ref$localStorage === undefined ? false : _ref$localStorage,
      _ref$persist = _ref.persist,
      persist = _ref$persist === undefined ? false : _ref$persist,
      rest = _objectWithoutProperties(_ref, ["peers", "disableValidation", "blocked", "noGun", "localStorage", "persist"]);

  var blockedMap = blocked.reduce(function (res, soul) {
    return _extends({}, res, _defineProperty({}, soul, true));
  }, {});
  var peer = {
    config: config,
    schema: schema,
    isBlocked: function isBlocked(soul) {
      return !!blockedMap[soul];
    },
    getState: function getState() {
      return state;
    },
    setState: function setState(newState) {
      return state = _extends({}, state, newState);
    },
    mergeState: function mergeState(newState) {
      return state = (0, _ramda.mergeDeepRight)(state, newState);
    }
  };
  var gunConfig = _extends({ peers: peers, localStorage: localStorage }, rest);
  if (persist) {
    gunConfig.localStorage = false;
    gunConfig.radisk = true;
    gunConfig.until = gunConfig.until || 1000;
  } else {
    gunConfig.radisk = false;
  }
  peer.sorts = (0, _sorts.sorts)(peer);
  peer.souls = Object.keys(souls).reduce(function (res, key) {
    return (0, _ramda.assoc)(key, souls[key](peer), res);
  }, {});

  if (!noGun) {
    Gun.on("opt", function (context) {
      context.on("in", function wireInput(msg) {
        var _this = this;

        Promise.all(Object.keys(msg).map(function (key) {
          if (key === "put" && msg.mesh) {
            if (!disableValidation) {
              return Promise.resolve(peer.schema.types(key, msg[key], msg, null, msg, peer));
            }
          }
          return Promise.resolve(msg);
        })).then(function () {
          if (msg && msg.put && !Object.keys(msg.put).length) return; // Rejected all writes
          _this.to.next(msg);
        }).catch(function (e) {
          return console.error("Message rejected", e.stack || e, msg);
        }); // eslint-disable-line
      });
    });
  }

  peer.gun = noGun ? null : Gun(gunConfig);

  // Nuke gun's localStorage if it fills up, kinda lame but less lame than total failure
  if (!persist && localStorage) peer.gun.on("localStorage:error", function (ack) {
    return ack.retry({});
  });

  var fns = _extends({}, watch, fetch, accessors, listing, write, serialized, auth);
  Object.keys(fns).map(function (key) {
    return peer[key] = fns[key](peer);
  });
  if (peer.gun) blocked.forEach(function (soul) {
    return peer.gun.get(soul).put({ url: null, body: "[removed]" });
  });
  return peer;
};

exports.default = notabug;