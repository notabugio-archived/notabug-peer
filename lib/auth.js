"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onLogin = exports.isLoggedIn = exports.user = exports.login = exports.signup = undefined;

var _ramda = require("ramda");

var _zalgoPromise = require("zalgo-promise");

/* globals Gun */
var signup = exports.signup = (0, _ramda.curry)(function (peer, username, password) {
  return new _zalgoPromise.ZalgoPromise(function (ok, fail) {
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
});

var login = exports.login = (0, _ramda.curry)(function (peer, username, password) {
  return new _zalgoPromise.ZalgoPromise(function (ok, fail) {
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