"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var signup = R.curry(function (peer, username, password, opts) {
    if (opts === void 0) { opts = {}; }
    return new Promise(function (ok, fail) {
        if (peer && peer.gun && peer.gun.user) {
            var user_1 = peer.gun.user();
            user_1.create(username, password, function (ack) {
                if (ack.err) {
                    fail(ack.err);
                    user_1.leave();
                    peer.gun.user().leave();
                }
                else {
                    peer.login(username, password).then(ok);
                }
            }, opts);
        }
        else {
            fail('SEA is not loaded');
        }
    });
});
var login = R.curry(function (peer, username, password) {
    return new Promise(function (ok, fail) {
        if (peer && peer.gun && peer.gun.user) {
            var user = peer.gun.user();
            user.auth(username, password, function (ack) {
                return ack.err ? fail(ack.err) : ok(peer.gun.user().is);
            });
        }
        else {
            fail('SEA is not loaded');
        }
    }).then(function (result) {
        peer._onLogin && peer._onLogin(result); // eslint-disable-line
        return result;
    });
});
var logout = function (peer) { return peer.gun.user().leave(); };
var isLoggedIn = function (peer) { return peer.gun && peer.gun.user && peer.gun.user().is; };
var onLogin = R.curry(function (peer, fn) { return (peer._onLogin = fn); }); // eslint-disable-line
exports.Authentication = {
    signup: signup,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    onLogin: onLogin
};
//# sourceMappingURL=Authentication.js.map