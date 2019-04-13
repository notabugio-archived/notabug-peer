"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("gun-scope");
var Schema_1 = require("../Schema");
var Query_1 = require("../Query");
var _a = [0, 1], POS_ID = _a[0], POS_VAL = _a[1];
var toIds = R.map(R.nth(POS_ID));
var sortItems = R.sortBy(R.nth(POS_VAL));
var voteSort = function (fn) {
    return gun_scope_1.query(function (scope, thingId, spec) {
        if (spec.isIdSticky(thingId))
            return gun_scope_1.resolve(-Infinity);
        if (R.includes(thingId, spec.filters.allow.ops))
            return gun_scope_1.resolve(-Infinity);
        return Query_1.Query.thingMeta(scope, {
            tabulator: spec.tabulator,
            scores: true,
            thingSoul: Schema_1.Schema.Thing.route.reverse({ thingId: thingId })
        }).then(fn);
    });
};
var timeSort = function (fn) {
    return gun_scope_1.query(function (scope, thingId, spec) {
        return Query_1.Query.thingMeta(scope, {
            tabulator: spec.tabulator,
            thingSoul: Schema_1.Schema.Thing.route.reverse({ thingId: thingId })
        }).then(fn);
    });
};
var sorts = {
    new: timeSort(R.compose(R.multiply(-1), parseInt, R.propOr(0, 'timestamp'))),
    top: voteSort(R.compose(function (x) { return -1 * parseInt(x, 10); }, R.pathOr('0', ['votes', 'score']))),
    comments: voteSort(R.compose(function (x) { return -1 * parseFloat(x); }, R.pathOr('0', ['votes', 'comment']))),
    discussed: voteSort(function (thing) {
        var timestamp = parseInt(R.propOr('', 'timestamp', thing), 10);
        var score = parseInt(R.pathOr(0, ['votes', 'comment'], thing), 10);
        var seconds = timestamp / 1000 - 1134028003;
        var order = Math.log10(Math.max(Math.abs(score), 1));
        if (!score)
            return 1000000000 - seconds;
        return -1 * (order + seconds / 45000);
    }),
    hot: voteSort(function (thing) {
        var timestamp = parseInt(R.propOr('', 'timestamp', thing), 10);
        var score = parseInt(R.pathOr(0, ['votes', 'score'], thing), 10);
        var seconds = timestamp / 1000 - 1134028003;
        var order = Math.log10(Math.max(Math.abs(score), 1));
        var sign = 0;
        if (score > 0) {
            sign = 1;
        }
        else if (score < 0) {
            sign = -1;
        }
        return -1 * (sign * order + seconds / 45000);
    }),
    best: voteSort(function (thing) {
        var ups = parseInt(R.pathOr(0, ['votes', 'up'], thing), 10);
        var downs = parseInt(R.pathOr(0, ['votes', 'down'], thing), 10);
        var n = ups + downs;
        if (n === 0)
            return 0;
        var z = 1.281551565545; // 80% confidence
        var p = ups / n;
        var left = p + (1 / (2 * n)) * z * z;
        var right = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
        var under = 1 + (1 / n) * z * z;
        return -1 * ((left - right) / under);
    }),
    controversial: voteSort(function (thing) {
        var ups = parseInt(R.pathOr(0, ['votes', 'up'], thing), 10);
        var downs = parseInt(R.pathOr(0, ['votes', 'down'], thing), 10);
        if (ups <= 0 || downs <= 0)
            return 0;
        var magnitude = ups + downs;
        var balance = ups > downs ? downs / ups : ups / downs;
        return -1 * Math.pow(magnitude, balance);
    })
};
var isValidSort = function (sort) { return !!(sort in sorts); };
exports.ListingSort = {
    POS_ID: POS_ID,
    POS_VAL: POS_VAL,
    sorts: sorts,
    isValidSort: isValidSort,
    toIds: toIds,
    sortItems: sortItems
};
//# sourceMappingURL=ListingSort.js.map