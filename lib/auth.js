"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onLogin = exports.isLoggedIn = exports.user = exports.login = exports.signup = undefined;

var _curry = require("ramda/src/curry");

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = exports.signup = (0, _curry2.default)(function (peer, username, password) {
  return new Promise(function (ok, fail) {
    if (peer && peer.gun && peer.gun.user) {
      var _user = peer.user();
      _user.create(username, password, function (ack) {
        if (ack.err) {
          fail(ack.err);
          _user.leave();
          peer.gun.user().leave();
        } else {
          ok(peer.login(username, password));
        }
      });
    } else {
      fail("SEA is not loaded");
    }
  });
}); /* globals Gun */
var login = exports.login = (0, _curry2.default)(function (peer, username, password) {
  return new Promise(function (ok, fail) {
    if (peer && peer.gun && peer.gun.user) {
      var _user2 = peer.user();
      _user2.auth(username, password, function (ack) {
        return ack.err ? fail(ack.err) : ok(peer.user().is);
      });
    } else {
      fail("SEA is not loaded");
    }
  }).then(function (result) {
    peer._onLogin && peer._onLogin(result); // eslint-disable-line
    return result;
  });
});

var user = exports.user = function user(peer) {
  return function () {
    return peer.gun.user();
  };
};

var isLoggedIn = exports.isLoggedIn = function isLoggedIn(peer) {
  return function () {
    return peer.gun && peer.gun.user && peer.user().is;
  };
};

var onLogin = exports.onLogin = function onLogin(peer) {
  return function (fn) {
    return peer._onLogin = fn;
  };
}; // eslint-disable-line