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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("gun-scope");
var Config_1 = require("./Config");
var Query_1 = require("./Query");
var Listing_1 = require("./Listing");
var wikiPage = R.mergeLeft({
    withMatch: function (_a) {
        var _b = _a.params, _c = _b.authorId, authorId = _c === void 0 ? Config_1.Config.owner : _c, name = _b.name;
        return ({
            preload: function (scope) { return Query_1.Query.wikiPage(scope, authorId, name); }
        });
    }
});
var withListingMatch = function (path, params) {
    if (!path) {
        return {
            preload: gun_scope_1.query(R.always(gun_scope_1.resolve({}))),
            sidebar: gun_scope_1.query(R.always(gun_scope_1.resolve(''))),
            space: gun_scope_1.query(R.always(gun_scope_1.resolve(Listing_1.ListingSpec.fromSource('')))),
            ids: gun_scope_1.query(R.always(gun_scope_1.resolve([])))
        };
    }
    var view = new Listing_1.ListingView(path);
    var realQuery = gun_scope_1.query(view.query.bind(view), "ids:" + path);
    return {
        preload: function (scope) { return preloadListing(scope, path, params); },
        sidebar: gun_scope_1.query(function (scope) { return Listing_1.Listing.sidebarFromPath(scope, path); }, "sidebar:" + path),
        space: gun_scope_1.query(function (scope) { return Listing_1.Listing.specFromPath(scope, path); }),
        ids: gun_scope_1.query(function (scope, opts) {
            if (opts === void 0) { opts = {}; }
            return realQuery(scope, R.mergeLeft(opts, params));
        })
    };
};
var preloadListing = function (scope, path, params) { return __awaiter(_this, void 0, void 0, function () {
    var match, _a, spec, ids, thingSouls, things, opIds, opSouls, chatPath;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                match = withListingMatch(path, params);
                return [4 /*yield*/, Promise.all([
                        match.space(scope),
                        match.ids(scope, {}),
                        match.sidebar(scope)
                    ])];
            case 1:
                _a = _b.sent(), spec = _a[0], ids = _a[1];
                if (!spec)
                    spec = Listing_1.ListingSpec.fromSource('');
                thingSouls = Listing_1.Listing.idsToSouls(ids);
                return [4 /*yield*/, Promise.all([
                        Query_1.Query.multiThingMeta(scope, {
                            thingSouls: thingSouls,
                            tabulator: spec.tabulator || Config_1.Config.tabulator,
                            scores: true,
                            data: true
                        })
                    ].concat(R.map(function (id) { return Query_1.Query.userMeta(scope, id); }, R.uniq([spec && spec.indexer, spec && spec.owner, spec && spec.tabulator]))))];
            case 2:
                things = (_b.sent())[0];
                opIds = R.compose(R.without(ids), function (ids) { return ids.filter(function (x) { return !!x; }); }, R.uniq, R.map(R.pathOr(null, ['data', 'opId'])))(things);
                if (!opIds.length) return [3 /*break*/, 4];
                opSouls = Listing_1.Listing.idsToSouls(opIds);
                return [4 /*yield*/, Query_1.Query.multiThingMeta(scope, {
                        thingSouls: opSouls,
                        tabulator: spec.tabulator || Config_1.Config.tabulator,
                        data: true
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!spec.chatTopic) return [3 /*break*/, 6];
                chatPath = "/t/" + spec.chatTopic + "/chat";
                if (!(chatPath !== path)) return [3 /*break*/, 6];
                return [4 /*yield*/, preloadListing(scope, "/t/" + spec.chatTopic + "/chat", {})];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [2 /*return*/, scope.getCache()];
        }
    });
}); };
var listing = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.prefix, defaultPrefix = _b === void 0 ? 't' : _b, _c = _a.identifier, defaultIdentifier = _c === void 0 ? 'all' : _c, _d = _a.sort, defaultSort = _d === void 0 ? 'hot' : _d, rest = __rest(_a, ["prefix", "identifier", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.prefix, prefix = _c === void 0 ? defaultPrefix : _c, _d = _b.identifier, identifier = _d === void 0 ? defaultIdentifier : _d, _e = _b.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, queryParams = _f === void 0 ? {} : _f;
            return withListingMatch("/" + prefix + "/" + identifier + "/" + sort, queryParams);
        } }));
};
var thingComments = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.prefix, defaultPrefix = _b === void 0 ? 't' : _b, _c = _a.identifier, defaultIdentifier = _c === void 0 ? 'all' : _c, _d = _a.sort, defaultSort = _d === void 0 ? 'best' : _d, rest = __rest(_a, ["prefix", "identifier", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params.opId, opId = _b === void 0 ? '' : _b, _c = _a.query, queryParams = _c === void 0 ? {} : _c;
            return withListingMatch(Listing_1.ListingType.CommentListing.route.reverse({
                thingId: opId,
                sort: R.propOr(defaultSort, 'sort', queryParams)
            }), R.assoc('limit', 1000, queryParams));
        } }));
};
var spaceListing = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.name, defaultName = _b === void 0 ? 'default' : _b, _c = _a.authorId, defaultAuthorId = _c === void 0 ? '' : _c, _d = _a.sort, defaultSort = _d === void 0 ? 'default' : _d, rest = __rest(_a, ["name", "authorId", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.authorId, authorId = _c === void 0 ? defaultAuthorId : _c, _d = _b.name, name = _d === void 0 ? defaultName : _d, _e = _b.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, queryParams = _f === void 0 ? {} : _f;
            return withListingMatch(Listing_1.ListingType.SpaceListing.route.reverse({
                authorId: authorId || Config_1.Config.owner,
                name: name,
                sort: sort
            }), queryParams);
        } }));
};
var spaceThingComments = function (_a) {
    var _b = _a.name, defaultName = _b === void 0 ? 'default' : _b, _c = _a.authorId, defaultAuthorId = _c === void 0 ? '' : _c, _d = _a.sort, defaultSort = _d === void 0 ? 'hot' : _d, rest = __rest(_a, ["name", "authorId", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.opId, opId = _c === void 0 ? '' : _c, _d = _b.authorId, authorId = _d === void 0 ? defaultAuthorId : _d, _e = _b.name, name = _e === void 0 ? defaultName : _e, _f = _b.sort, sort = _f === void 0 ? defaultSort : _f, _g = _a.query, queryParams = _g === void 0 ? {} : _g;
            var spacePath = Listing_1.ListingType.SpaceListing.route.reverse({
                authorId: authorId || Config_1.Config.owner,
                name: name,
                sort: sort
            });
            var listingPath = Listing_1.ListingType.CommentListing.route.reverse({
                thingId: opId,
                sort: sort
            });
            return {
                space: gun_scope_1.query(function (scope) { return Listing_1.Listing.specFromPath(scope, spacePath, queryParams); }, "spec:" + spacePath),
                ids: gun_scope_1.query(function (scope) { return Listing_1.Listing.fromPath(scope, listingPath, queryParams); }, listingPath),
                preload: gun_scope_1.query(function (scope) { return preloadListing(scope, listingPath, queryParams); })
            };
        } }));
};
var profile = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.sort, defaultSort = _b === void 0 ? 'new' : _b, _c = _a.type, defaultType = _c === void 0 ? 'overview' : _c, rest = __rest(_a, ["sort", "type"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.authorId, authorId = _c === void 0 ? '' : _c, _d = _b.type, type = _d === void 0 ? defaultType : _d, _e = _b.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, query = _f === void 0 ? {} : _f;
            return withListingMatch(Listing_1.ListingType.ProfileListing.route.reverse({ authorId: authorId, type: type, sort: sort }), query);
        } }));
};
var inbox = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.sort, defaultSort = _b === void 0 ? 'new' : _b, _c = _a.type, defaultType = _c === void 0 ? 'overview' : _c, rest = __rest(_a, ["sort", "type"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.authorId, authorId = _b === void 0 ? '' : _b, _c = _a.params, _d = _c.type, type = _d === void 0 ? defaultType : _d, _e = _c.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, query = _f === void 0 ? {} : _f;
            return withListingMatch(Listing_1.ListingType.InboxListing.route.reverse({ authorId: authorId, type: type, sort: sort }), query);
        } }));
};
exports.Page = {
    withListingMatch: withListingMatch,
    preloadListing: preloadListing,
    wikiPage: wikiPage,
    thingComments: thingComments,
    listing: listing,
    spaceListing: spaceListing,
    spaceThingComments: spaceThingComments,
    profile: profile,
    inbox: inbox
};
//# sourceMappingURL=Page.js.map