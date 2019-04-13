"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validation_1 = require("./Validation");
var Query_1 = require("./Query");
var Thing_1 = require("./Thing");
var Authentication_1 = require("./Authentication");
var Indexer_1 = require("./Oracle/Indexer");
var Tabulator_1 = require("./Oracle/Tabulator");
var Oracle_1 = require("./Oracle/Oracle");
function init(Gun, config) {
    if (config === void 0) { config = {}; }
    var _a = config || {}, _b = _a.leech, leech = _b === void 0 ? false : _b, _c = _a.disableValidation, disableValidation = _c === void 0 ? false : _c, _d = _a.noGun, noGun = _d === void 0 ? false : _d, _e = _a.localStorage, localStorage = _e === void 0 ? false : _e, _f = _a.persist, persist = _f === void 0 ? false : _f, rest = __rest(_a, ["leech", "disableValidation", "noGun", "localStorage", "persist"]);
    var peer = { config: config };
    if (!noGun) {
        var cfg = __assign({ localStorage: !!localStorage, radisk: !!persist }, rest);
        if (persist)
            cfg.localStorage = false;
        if (!disableValidation)
            Gun.on('opt', Validation_1.Validation.gunWireInput(peer));
        if (cfg.storeFn)
            cfg.store = cfg.storeFn(cfg); // for indexeddb
        peer.gun = Gun(cfg);
        if (cfg.localStorage)
            peer.gun.on('localStorage:error', function (a) { return a.retry({}); });
        if (leech) {
            var sendLeech = function () { return peer.gun._.on('out', { leech: true }); };
            sendLeech();
        }
    }
    var oracle;
    peer.oracle = function () { return (oracle = oracle || new Oracle_1.Oracle(peer)); };
    peer.newScope = function (opts) { return Query_1.Query.createScope(peer, opts); };
    peer.onLogin = Authentication_1.Authentication.onLogin(peer);
    peer.signup = Authentication_1.Authentication.signup(peer);
    peer.login = Authentication_1.Authentication.login(peer);
    peer.logout = function () { return Authentication_1.Authentication.logout(peer); };
    peer.isLoggedIn = function () { return Authentication_1.Authentication.isLoggedIn(peer); };
    peer.submit = Thing_1.Thing.submit(peer);
    peer.comment = Thing_1.Thing.comment(peer);
    peer.chat = Thing_1.Thing.chat(peer);
    peer.writePage = Thing_1.Thing.writePage(peer);
    peer.vote = Thing_1.Thing.vote(peer);
    peer.queries = Query_1.Query;
    peer.index = function (scopeOpts) {
        if (scopeOpts === void 0) { scopeOpts = { timeout: 5000 }; }
        return peer.oracle().use(new Indexer_1.Indexer.Queue(peer, '', scopeOpts));
    };
    peer.tabulate = function (scopeOpts) {
        if (scopeOpts === void 0) { scopeOpts = { timeout: 5000 }; }
        return peer.oracle().use(new Tabulator_1.Tabulator.Queue(peer, '', scopeOpts));
    };
    return peer;
}
exports.Peer = {
    init: init
};
//# sourceMappingURL=Peer.js.map