"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("@notabug/gun-scope");
var Constants_1 = require("../Constants");
var Schema_1 = require("../Schema");
var Query_1 = require("../Query");
var Thing_1 = require("../Thing");
var ListingNode_1 = require("./ListingNode");
var ListingDataSource_1 = require("./ListingDataSource");
var intPath = function (p) {
    return R.compose(parseInt, R.pathOr('', p));
};
var fromDefinition = function (definition) {
    var filters = definition.filters, voteFilters = definition.voteFilters, isPresent = definition.isPresent;
    var filterFunctions = [];
    var voteFilterFunctions = [];
    var addFilter = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return filterFunctions.push(R.compose.apply(R, fns));
    };
    var addSubmissionFilter = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return addFilter(R.cond([
            [R.pathEq(['data', 'kind'], 'submission'), R.compose.apply(R, fns)],
            [R.T, R.T]
        ]));
    };
    var addVoteFilter = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return voteFilterFunctions.push(R.compose.apply(R, fns));
    };
    if (filters.allow.aliases.length) {
        addFilter(function (t) { return !!isPresent(['alias', t]); }, R.path(['data', 'author']));
    }
    if (filters.allow.authors.length) {
        addFilter(function (t) { return !!isPresent(['author', t]); }, R.path(['data', 'authorId']));
    }
    if (filters.allow.domains.length) {
        addSubmissionFilter(function (t) { return !!isPresent(['domain', t]); }, Thing_1.ThingDataNode.domain, R.prop('data'));
    }
    if (filters.allow.topics.length &&
        !R.find(R.compose(R.identical('all'), R.last, R.split(':')), filters.allow.topics)) {
        addFilter(function (item) {
            var topic = R.path(['data', 'topic'], item);
            var kind = R.path(['data', 'kind'], item);
            if (kind === 'chatmsg')
                topic = "chat:" + topic;
            return !!isPresent(['topic', topic]);
        });
    }
    if (filters.allow.kinds.length) {
        addFilter(function (kind) { return !!isPresent(['kind', kind]); }, R.path(['data', 'kind']));
    }
    if (filters.allow.type === 'commands') {
        addFilter(R.compose(R.test(Constants_1.Constants.COMMAND_RE), R.pathOr('', ['data', 'body'])));
    }
    if (filters.deny.aliases.length) {
        addFilter(function (alias) { return !isPresent(['ban', 'alias', alias]); }, R.path(['data', 'author']));
    }
    if (filters.deny.authors.length) {
        addFilter(function (authorId) { return !isPresent(['ban', 'author', authorId]); }, R.path(['data', 'authorId']));
    }
    if (filters.deny.domains.length) {
        addSubmissionFilter(function (domain) { return !domain || !isPresent(['ban', 'domain', domain]); }, Thing_1.ThingDataNode.domain, R.prop('data'));
    }
    if (filters.deny.topics.length) {
        addFilter(function (topic) { return !isPresent(['ban', 'topic', topic]); }, R.path(['data', 'topic']));
    }
    if (filters.deny.anon)
        addFilter(R.path(['data', 'authorId']));
    if (filters.deny.signed) {
        addFilter(R.compose(function (authorId) { return !authorId; }, R.pathOr('', ['data', 'authorId'])));
    }
    if (voteFilters.upsMin !== null) {
        addVoteFilter(R.lte(voteFilters.upsMin), intPath(['votes', 'up']));
    }
    if (voteFilters.upsMax !== null) {
        addVoteFilter(R.gte(voteFilters.upsMax), intPath(['votes', 'up']));
    }
    if (voteFilters.downsMin !== null) {
        addVoteFilter(R.lte(voteFilters.downsMin), intPath(['votes', 'down']));
    }
    if (voteFilters.downsMax !== null) {
        addVoteFilter(R.gte(voteFilters.downsMax), intPath(['votes', 'down']));
    }
    if (voteFilters.scoreMin !== null) {
        addVoteFilter(R.lte(voteFilters.scoreMin), intPath(['votes', 'score']));
    }
    if (voteFilters.scoreMax !== null) {
        addVoteFilter(R.gte(voteFilters.scoreMax), intPath(['votes', 'score']));
    }
    if (filters.deny.tags.length) {
        addVoteFilter(function (thing) {
            var cmds = R.path(['votes', 'commands'], thing) || {};
            return !filters.deny.tags.find(function (_a) {
                var tagName = _a[0], authorId = _a[1];
                return !!R.path([authorId, 'tag', tagName], cmds);
            });
        });
    }
    var contentFilter = function (thing) { return !filterFunctions.find(function (fn) { return !fn(thing); }); };
    var voteFilter = function (thing) { return !voteFilterFunctions.find(function (fn) { return !fn(thing); }); };
    var thingFilter = function (thing) {
        return definition.isIdSticky(R.propOr('', 'id', thing)) || (contentFilter(thing) && voteFilter(thing));
    };
    return { thingFilter: thingFilter, contentFilter: contentFilter, voteFilter: voteFilter };
};
var getFilteredRows = function (scope, spec, sortedRows, params) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, limitProp, _c, countProp, _d, after, _e, filterFn, limit, count, rows, filtered, data, fetchBatch, res;
    var _this = this;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = params || {}, _b = _a.limit, limitProp = _b === void 0 ? '25' : _b, _c = _a.count, countProp = _c === void 0 ? '0' : _c, _d = _a.after, after = _d === void 0 ? null : _d, _e = _a.filterFn, filterFn = _e === void 0 ? R.always(gun_scope_1.resolve(true)) : _e;
                limit = parseInt(limitProp, 10);
                count = parseInt(countProp, 10) || 0;
                rows = sortedRows.slice();
                filtered = [];
                data = [];
                fetchBatch = function (size) {
                    if (size === void 0) { size = 30; }
                    return gun_scope_1.all(R.map(function (row) { return __awaiter(_this, void 0, void 0, function () {
                        var inListing, itemData, url;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    inListing = true;
                                    if (!row[ListingNode_1.ListingNode.POS_ID]) {
                                        console.log('blankRow', row);
                                        return [2 /*return*/];
                                    }
                                    if (!filterFn) return [3 /*break*/, 2];
                                    return [4 /*yield*/, filterFn(row[ListingNode_1.ListingNode.POS_ID] || '')];
                                case 1:
                                    inListing = _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (!inListing) return [3 /*break*/, 5];
                                    if (!spec.uniqueByContent) return [3 /*break*/, 4];
                                    return [4 /*yield*/, Query_1.Query.thingData(scope, row[ListingNode_1.ListingNode.POS_ID])];
                                case 3:
                                    itemData = _a.sent();
                                    url = Thing_1.ThingDataNode.url(itemData);
                                    if (url &&
                                        R.find(R.compose(R.equals(url), Thing_1.ThingDataNode.url), data)) {
                                        return [2 /*return*/];
                                    }
                                    data.push(itemData);
                                    _a.label = 4;
                                case 4:
                                    filtered.push(row);
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); }, rows.splice(count, size)));
                };
                _f.label = 1;
            case 1:
                if (!(rows.length > count)) return [3 /*break*/, 3];
                return [4 /*yield*/, fetchBatch()];
            case 2:
                res = _f.sent();
                if (limit && filtered.length >= limit)
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, R.compose(limit
                    ? R.slice(0, limit)
                    : R.identity, R.sortBy(R.nth(ListingNode_1.ListingNode.POS_VAL)), R.always(filtered))()];
        }
    });
}); };
var getFilteredIds = R.compose(function (x) { return x.then(R.map(R.nth(ListingNode_1.ListingNode.POS_ID))); }, getFilteredRows);
var thingFilter = R.curry(function (scope, spec, thingId) {
    if (spec.isIdSticky(thingId))
        return gun_scope_1.resolve(true);
    return Query_1.Query.thingMeta(scope, {
        tabulator: spec.tabulator,
        thingSoul: Schema_1.Schema.Thing.route.reverse({ thingId: thingId }),
        scores: ListingDataSource_1.ListingDataSource.needsScores(spec),
        data: ListingDataSource_1.ListingDataSource.needsData(spec)
    }).then(spec.thingFilter);
});
exports.ListingFilter = {
    fromDefinition: fromDefinition,
    getFilteredRows: getFilteredRows,
    getFilteredIds: getFilteredIds,
    thingFilter: thingFilter
};
//# sourceMappingURL=ListingFilter.js.map