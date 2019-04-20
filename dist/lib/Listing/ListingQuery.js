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
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var fast_memoize_1 = require("fast-memoize");
var Query_1 = require("../Query");
var ListingNode_1 = require("./ListingNode");
var ListingFilter_1 = require("./ListingFilter");
var ListingType_1 = require("./ListingType");
var ListingSpec_1 = require("./ListingSpec");
var ListingQuery = /** @class */ (function () {
    function ListingQuery(path, parent) {
        this.listings = [];
        this.viewCache = parent ? parent.viewCache : {};
        this.sourced = {};
        this.checked = {};
        this.path = path;
        this.type = ListingType_1.ListingType.fromPath(path);
        if (!this.type)
            throw new Error("Can't find type for path: " + path);
        this.spec = ListingSpec_1.ListingSpec.fromSource('');
        this.rowsFromNode = parent ? parent.rowsFromNode : fast_memoize_1.default(ListingNode_1.ListingNode.rows);
        this.combineSourceRows = parent
            ? parent.combineSourceRows
            : fast_memoize_1.default(R.pipe(R.reduce(R.concat, []), ListingNode_1.ListingNode.sortRows, R.uniqBy(R.nth(ListingNode_1.ListingNode.POS_ID))));
    }
    ListingQuery.prototype.space = function (scope) {
        var _this = this;
        return this.type.getSpec(scope, this.type.match).then(function (baseSpec) {
            var spec = baseSpec;
            if (_this.type.match.sort === 'default') {
                spec = R.assoc('path', _this.type.route.reverse(R.assoc('sort', spec.sort, _this.type.match)), spec);
            }
            else {
                spec = R.assoc('path', _this.path, baseSpec);
            }
            if (spec.submitTopic && !spec.submitPath) {
                spec = R.assoc('submitPath', "/t/" + spec.submitTopic + "/submit", spec);
            }
            if (!R.equals(_this.spec, spec)) {
                _this.spec = spec;
                _this.checked = {};
            }
            return _this.spec;
        });
    };
    ListingQuery.prototype.sidebar = function (scope) {
        return this.space(scope).then(function (spec) {
            var _a = spec || {}, _b = _a.fromPageAuthor, fromPageAuthor = _b === void 0 ? '' : _b, _c = _a.fromPageName, fromPageName = _c === void 0 ? '' : _c;
            if (!fromPageAuthor || !fromPageName)
                return null;
            return Query_1.Query.wikiPage(scope, fromPageAuthor, fromPageName + ":sidebar");
        });
    };
    ListingQuery.prototype.unfilteredRows = function (scope) {
        var _this = this;
        if (!this.type)
            return Promise.resolve([]);
        return this.space(scope)
            .then(function (spec) {
            var paths = R.pathOr([], ['dataSource', 'listingPaths'], spec);
            var listingPaths = R.without([_this.path], paths);
            _this.listings = listingPaths.map(function (path) { return _this.viewCache[path] || (_this.viewCache[path] = new ListingQuery(path, _this)); });
            if (!_this.listings.length) {
                return scope.get(ListingNode_1.ListingNode.soulFromPath(spec.indexer, _this.path)).then(R.pipe(_this.rowsFromNode, R.of, _this.combineSourceRows));
            }
            return Promise.all(_this.listings.map(function (l) { return l.unfilteredRows(scope); })).then(_this.combineSourceRows);
        })
            .then(function (rows) {
            _this.sourced = R.indexBy(R.nth(ListingNode_1.ListingNode.POS_ID), rows);
            return rows;
        });
    };
    ListingQuery.prototype._setChecked = function (id, checked) {
        this.checked[id] = checked;
        return checked;
    };
    ListingQuery.prototype.checkId = function (scope, id) {
        return __awaiter(this, void 0, void 0, function () {
            var filterFn, listings, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.checked[id])
                            return [2 /*return*/, true];
                        if (this.spec.isIdSticky(id))
                            return [2 /*return*/, this._setChecked(id, true)];
                        if (!(id in this.sourced))
                            return [2 /*return*/, this._setChecked(id, false)];
                        filterFn = ListingFilter_1.ListingFilter.thingFilter(scope, this.spec);
                        return [4 /*yield*/, filterFn(id)];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/, this._setChecked(id, false)];
                        listings = this.listings.slice();
                        if (!listings.length)
                            return [2 /*return*/, this._setChecked(id, true)];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < listings.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, listings[i].checkId(scope, id)];
                    case 3:
                        if (_a.sent()) {
                            return [2 /*return*/, this._setChecked(id, true)];
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, this._setChecked(id, false)];
                }
            });
        });
    };
    ListingQuery.prototype.ids = function (scope, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        return this.unfilteredRows(scope).then(function (rows) {
            var stickyRows = R.map(function (id) { return [-1, id, -Infinity]; }, _this.spec.stickyIds);
            var filterFn = function (id) { return _this.checkId(scope, id); };
            return ListingFilter_1.ListingFilter.getFilteredIds(scope, _this.spec, stickyRows.concat(rows), __assign({}, opts, { filterFn: filterFn }));
        });
    };
    return ListingQuery;
}());
exports.ListingQuery = ListingQuery;
//# sourceMappingURL=ListingQuery.js.map