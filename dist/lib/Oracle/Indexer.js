"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Config_1 = require("../Config");
var Query_1 = require("../Query");
var Listing_1 = require("../Listing");
var Schema_1 = require("../Schema");
var Thing_1 = require("../Thing");
var ThingQueue_1 = require("./ThingQueue");
function getListings(scope, thingId) {
    return __awaiter(this, void 0, void 0, function () {
        var listings, _a, data, scores, kind, authorId, topic, domain, taggedBy, opId, replyToId, isCommand, replyToThingData, replyToAuthorId, replyToKind;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!thingId)
                        return [2 /*return*/, []];
                    listings = [];
                    return [4 /*yield*/, Promise.all([
                            Query_1.Query.thingData(scope, thingId),
                            Query_1.Query.thingScores(scope, thingId)
                        ])];
                case 1:
                    _a = _b.sent(), data = _a[0], scores = _a[1];
                    if (!data)
                        return [2 /*return*/, []];
                    kind = Thing_1.ThingDataNode.kind(data);
                    authorId = Thing_1.ThingDataNode.authorId(data);
                    topic = Thing_1.ThingDataNode.topic(data)
                        .trim()
                        .toLowerCase();
                    if (!(kind === 'submission')) return [3 /*break*/, 2];
                    domain = Thing_1.ThingDataNode.domain(data);
                    taggedBy = R.compose(R.without(['anon']), R.keysIn, function (x) { return (typeof x === 'string' ? {} : x); }, R.propOr({}, 'commands'))(scores);
                    if (topic)
                        listings.push("/t/" + topic);
                    if (topic !== 'all')
                        listings.push('/t/all');
                    if (domain)
                        listings.push("/domain/" + domain);
                    if (authorId) {
                        listings.push("/user/" + authorId + "/submitted");
                        listings.push("/user/" + authorId + "/overview");
                    }
                    taggedBy.forEach(function (tagAuthorId) { return listings.push("/user/" + tagAuthorId + "/commented"); });
                    return [3 /*break*/, 6];
                case 2:
                    if (!(kind === 'comment')) return [3 /*break*/, 5];
                    opId = Thing_1.ThingDataNode.opId(data);
                    replyToId = Thing_1.ThingDataNode.replyToId(data);
                    isCommand = Thing_1.ThingDataNode.isCommand(data);
                    if (opId)
                        listings.push("/things/" + opId + "/comments");
                    if (topic)
                        listings.push("/t/comments:" + topic);
                    if (topic !== 'all')
                        listings.push('/t/comments:all');
                    if (!replyToId) return [3 /*break*/, 4];
                    return [4 /*yield*/, Query_1.Query.thingData(scope, replyToId)];
                case 3:
                    replyToThingData = _b.sent();
                    replyToAuthorId = Thing_1.ThingDataNode.authorId(replyToThingData);
                    if (replyToAuthorId) {
                        replyToKind = Thing_1.ThingDataNode.kind(replyToThingData);
                        listings.push("/user/" + replyToAuthorId + "/replies/overview");
                        if (replyToKind === 'submission') {
                            listings.push("/user/" + replyToAuthorId + "/replies/submitted");
                        }
                        else if (replyToKind === 'comment') {
                            listings.push("/user/" + replyToAuthorId + "/replies/comments");
                        }
                    }
                    _b.label = 4;
                case 4:
                    if (authorId) {
                        listings.push("/user/" + authorId + "/comments");
                        listings.push("/user/" + authorId + "/overview");
                        if (isCommand)
                            listings.push("/user/" + authorId + "/commands");
                        // TODO: update commented
                    }
                    return [3 /*break*/, 6];
                case 5:
                    if (kind === 'chatmsg') {
                        if (topic)
                            listings.push("/t/chat:" + topic);
                        if (topic !== 'all')
                            listings.push('/t/chat:all');
                    }
                    _b.label = 6;
                case 6: return [2 /*return*/, listings];
            }
        });
    });
}
function describeThingId(scope, thingId) {
    return __awaiter(this, void 0, void 0, function () {
        var spec, includes, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!thingId)
                        return [2 /*return*/];
                    spec = Listing_1.ListingSpec.fromSource('');
                    return [4 /*yield*/, getListings(scope, thingId)];
                case 1:
                    includes = _b.sent();
                    if (!includes.length)
                        return [2 /*return*/];
                    _a = {
                        id: thingId,
                        includes: includes
                    };
                    return [4 /*yield*/, Promise.all(R.toPairs(Listing_1.ListingSort.sorts).map(function (_a) {
                            var name = _a[0], sortFn = _a[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = [name];
                                            return [4 /*yield*/, sortFn(scope, thingId, spec)];
                                        case 1: return [2 /*return*/, _b.concat([
                                                _c.sent()
                                            ])];
                                    }
                                });
                            });
                        }))];
                case 2: return [2 /*return*/, (_a.sorts = _b.sent(),
                        _a)];
            }
        });
    });
}
var descriptionToListingMap = function (declarativeUpdate) {
    var id = R.propOr('', 'id', declarativeUpdate);
    var includes = R.propOr([], 'includes', declarativeUpdate);
    var sorts = R.propOr([], 'sorts', declarativeUpdate);
    var results = [];
    for (var i = 0; i < includes.length; i++) {
        var listing = includes[i];
        for (var j = 0; j < sorts.length; j++) {
            var _a = sorts[j], sortName = _a[0], value = _a[1];
            results.push([listing + "/" + sortName, [[id, value]]]);
        }
    }
    return results;
};
var IndexerQueue = /** @class */ (function (_super) {
    __extends(IndexerQueue, _super);
    function IndexerQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexerQueue.prototype.processNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, startedAt, scope_1, description, listingMap, e_1, endedAt;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.processingId)
                            return [2 /*return*/];
                        id = (this.processingId = this.dequeue());
                        if (!id)
                            return [2 /*return*/];
                        startedAt = new Date().getTime();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        scope_1 = this.peer.newScope(this.scopeOpts);
                        return [4 /*yield*/, describeThingId(scope_1, id)];
                    case 2:
                        description = _a.sent();
                        listingMap = descriptionToListingMap(description);
                        // tslint:disable-next-line: await-promise
                        return [4 /*yield*/, Promise.all(listingMap.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var listingPath, updatedItems, soul, existing, diff;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            listingPath = item[0], updatedItems = item[1];
                                            soul = Listing_1.ListingNode.soulFromPath(Config_1.Config.indexer, listingPath);
                                            return [4 /*yield*/, scope_1.get(soul).then()];
                                        case 1:
                                            existing = _a.sent();
                                            return [4 /*yield*/, Listing_1.ListingNode.diff(existing, updatedItems, [])];
                                        case 2:
                                            diff = _a.sent();
                                            if (!diff)
                                                return [2 /*return*/];
                                            console.log('writing', soul, diff);
                                            this.peer.gun.get(soul).put(diff);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        // tslint:disable-next-line: await-promise
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('Indexer error', e_1.stack || e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        endedAt = new Date().getTime();
                        console.log('indexed', (endedAt - startedAt) / 1000, this.length(), id);
                        this.processingId = '';
                        // tslint:disable-next-line: no-floating-promises
                        this.processNext();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexerQueue.prototype.onPut = function (msg) {
        var _this = this;
        R.compose(R.map(R.tap(function (_a) {
            var id = _a[0], isNew = _a[1];
            return id && _this.enqueue(id, isNew);
        })), R.uniqBy(R.nth(0)), R.map(function (soul) {
            var thingMatch = Schema_1.Schema.Thing.route.match(soul);
            var thingDataMatch = Schema_1.Schema.ThingDataSigned.route.match(soul);
            var countsMatch = Schema_1.Schema.ThingVoteCounts.route.match(soul);
            var thingId = R.propOr('', 'thingId', thingMatch || thingDataMatch || countsMatch);
            return [thingId, !countsMatch];
        }), R.keysIn, R.propOr({}, 'put'))(msg);
    };
    return IndexerQueue;
}(ThingQueue_1.ThingQueue));
exports.Indexer = {
    Queue: IndexerQueue,
    describeThingId: describeThingId
};
//# sourceMappingURL=Indexer.js.map