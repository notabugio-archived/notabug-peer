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
var gun_scope_1 = require("gun-scope");
var ListingNode_1 = require("./ListingNode");
var ListingFilter_1 = require("./ListingFilter");
var ListingType_1 = require("./ListingType");
var read = gun_scope_1.query(function (scope, spec, opts) {
    if (opts === void 0) { opts = {}; }
    var filterFn = ListingFilter_1.ListingFilter.thingFilter(scope, spec);
    var paths = R.pathOr([], ['dataSource', 'listingPaths'], spec);
    var stickyRows = R.map(function (id) { return [-1, id, -Infinity]; }, spec.stickyIds);
    var souls = R.map(ListingNode_1.ListingNode.soulFromPath(opts.indexer || spec.indexer), paths);
    return ListingNode_1.ListingNode.rowsFromSouls(scope, souls).then(function (rows) {
        return ListingFilter_1.ListingFilter.getFilteredIds(scope, spec, stickyRows.concat(rows), __assign({}, opts, { filterFn: filterFn }));
    });
});
var fromSpec = gun_scope_1.query(function (scope, spec, opts) {
    if (opts === void 0) { opts = {}; }
    return read(scope, spec, opts);
});
var fromPath = gun_scope_1.query(function (scope, path, opts) {
    var type = ListingType_1.ListingType.fromPath(path);
    if (!type)
        return Promise.resolve([]);
    return type.getSpec(scope, type.match).then(function (spec) {
        if (spec.hasIndexer && !opts.calculate) {
            if (!type || !type.read)
                return ListingNode_1.ListingNode.read(scope, path, opts);
            return type.read(scope, type.match, opts);
        }
        return fromSpec(scope, spec, opts);
    });
});
exports.ListingQuery = {
    fromSpec: fromSpec,
    fromPath: fromPath
};
//# sourceMappingURL=ListingQuery.js.map