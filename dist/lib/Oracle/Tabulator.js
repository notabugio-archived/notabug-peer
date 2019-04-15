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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("gun-scope");
var Config_1 = require("../Config");
var GunNode_1 = require("../GunNode");
var Schema_1 = require("../Schema");
var Query_1 = require("../Query");
var CommentCommand_1 = require("../CommentCommand");
var ThingQueue_1 = require("./ThingQueue");
var tabulate = gun_scope_1.query(function (scope, thingId) { return __awaiter(_this, void 0, void 0, function () {
    var _a, up, down, comment, replySouls, thingData, result, commandMap;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!thingId)
                    return [2 /*return*/, null];
                return [4 /*yield*/, gun_scope_1.all([
                        scope.get(Schema_1.Schema.ThingVotesUp.route.reverse({ thingId: thingId })).count(),
                        scope.get(Schema_1.Schema.ThingVotesDown.route.reverse({ thingId: thingId })).count(),
                        scope.get(Schema_1.Schema.ThingAllComments.route.reverse({ thingId: thingId })).count(),
                        scope.get(Schema_1.Schema.ThingComments.route.reverse({ thingId: thingId })).souls()
                    ])];
            case 1:
                _a = _b.sent(), up = _a[0], down = _a[1], comment = _a[2], replySouls = _a[3];
                return [4 /*yield*/, Query_1.Query.thingDataFromSouls(scope, replySouls)];
            case 2:
                thingData = _b.sent();
                result = {
                    up: up,
                    down: down,
                    comment: comment,
                    replies: replySouls.length,
                    score: up - down
                };
                if (thingData) {
                    commandMap = CommentCommand_1.CommentCommand.map(thingData);
                    if (R.keys(commandMap).length)
                        result.commands = JSON.stringify(commandMap);
                }
                return [2 /*return*/, result];
        }
    });
}); });
var TabulatorQueue = /** @class */ (function (_super) {
    __extends(TabulatorQueue, _super);
    function TabulatorQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabulatorQueue.prototype.processNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var thingId, tabulator, countsSoul, scope, existingCounts, updatedCounts, diff, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.processingId)
                            return [2 /*return*/];
                        thingId = (this.processingId = this.dequeue());
                        tabulator = this.spec.tabulator;
                        if (!thingId)
                            return [2 /*return*/];
                        countsSoul = Schema_1.Schema.ThingVoteCounts.route.reverse({ thingId: thingId, tabulator: tabulator });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        scope = this.peer.newScope(this.scopeOpts);
                        return [4 /*yield*/, scope.get(countsSoul).then()];
                    case 2:
                        existingCounts = _a.sent();
                        return [4 /*yield*/, tabulate(scope, thingId)];
                    case 3:
                        updatedCounts = _a.sent();
                        diff = GunNode_1.GunNode.diff(existingCounts, updatedCounts);
                        if (R.keysIn(diff).length)
                            this.peer.gun.get(countsSoul).put(diff);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('Tabulator error', e_1.stack || e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        this.processingId = '';
                        // tslint:disable-next-line: no-floating-promises
                        this.processNext();
                        return [2 /*return*/];
                }
            });
        });
    };
    TabulatorQueue.prototype.onPut = function (msg) {
        var _this = this;
        R.compose(R.map(R.tap(function (_a) {
            var id = _a[0], isNew = _a[1];
            return id && _this.enqueue(id, isNew);
        })), R.uniqBy(R.nth(0)), R.map(function (soul) {
            var meta = R.pathOr({}, ['put', soul, '_', '>'], msg);
            var latest = R.values(meta)
                .sort()
                .pop();
            var now = new Date().getTime();
            var age = now - latest;
            if (age > Config_1.Config.oracleMaxStaleness)
                return [];
            var thingMatch = Schema_1.Schema.Thing.route.match(soul);
            var votesUpMatch = Schema_1.Schema.ThingVotesUp.route.match(soul);
            var votesDownMatch = Schema_1.Schema.ThingVotesDown.route.match(soul);
            var allCommentsMatch = Schema_1.Schema.ThingAllComments.route.match(soul);
            var commentsMatch = Schema_1.Schema.ThingAllComments.route.match(soul);
            var thingId = R.propOr('', 'thingId', thingMatch || votesUpMatch || votesDownMatch || allCommentsMatch || commentsMatch);
            return [thingId, !(votesUpMatch || votesDownMatch || allCommentsMatch || commentsMatch)];
        }), R.keysIn, R.propOr({}, 'put'))(msg);
    };
    return TabulatorQueue;
}(ThingQueue_1.ThingQueue));
exports.Tabulator = { Queue: TabulatorQueue, query: tabulate };
//# sourceMappingURL=Tabulator.js.map