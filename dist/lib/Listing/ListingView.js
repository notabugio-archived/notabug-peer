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
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var fast_memoize_1 = require("fast-memoize");
var ListingNode_1 = require("./ListingNode");
var ListingFilter_1 = require("./ListingFilter");
var ListingType_1 = require("./ListingType");
var ListingView = /** @class */ (function () {
    function ListingView(path) {
        this.path = path;
        this.type = ListingType_1.ListingType.fromPath(path);
        this.rowsFromNode = fast_memoize_1.default(ListingNode_1.ListingNode.rows);
        this.combineSourceRows = fast_memoize_1.default(R.pipe(R.reduce(R.concat, []), ListingNode_1.ListingNode.sortRows, R.uniqBy(R.nth(ListingNode_1.ListingNode.POS_ID))));
    }
    ListingView.prototype.getSortedSourceRows = function (scope, sourceSouls) {
        var _this = this;
        return Promise.all(sourceSouls.map(function (soul) { return scope.get(soul).then(_this.rowsFromNode); })).then(this.combineSourceRows);
    };
    ListingView.prototype.query = function (scope, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        if (!this.type)
            return Promise.resolve([]);
        return this.type.getSpec(scope, this.type.match).then(function (spec) {
            var stickyRows = R.map(function (id) { return [-1, id, -Infinity]; }, spec.stickyIds);
            var paths = R.pathOr([], ['dataSource', 'listingPaths'], spec);
            var sourceSouls = R.map(ListingNode_1.ListingNode.soulFromPath(spec.indexer), paths);
            var filterFn = ListingFilter_1.ListingFilter.thingFilter(scope, spec);
            return _this.getSortedSourceRows(scope, sourceSouls).then(function (rows) {
                return ListingFilter_1.ListingFilter.getFilteredIds(scope, spec, stickyRows.concat(rows), __assign({}, opts, { filterFn: filterFn }));
            });
        });
    };
    return ListingView;
}());
exports.ListingView = ListingView;
//# sourceMappingURL=ListingView.js.map