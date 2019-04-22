"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("@notabug/gun-scope");
var Query_1 = require("../Query");
var Thing_1 = require("../Thing");
var ListingDefinition_1 = require("./ListingDefinition");
var ListingDataSource_1 = require("./ListingDataSource");
var ListingFilter_1 = require("./ListingFilter");
var fromSource = R.compose(R.apply(R.mergeLeft), R.juxt([ListingFilter_1.ListingFilter.fromDefinition, R.identity]), R.apply(R.assoc('dataSource')), R.juxt([ListingDataSource_1.ListingDataSource.fromDefinition, R.identity]), ListingDefinition_1.ListingDefinition.fromSource);
var getSource = gun_scope_1.query(function (scope, authorId, name, extra) {
    if (extra === void 0) { extra = ''; }
    return Query_1.Query.wikiPage(scope, authorId, name).then(R.compose(function (body) { return body + "\n# added by indexer\n" + (extra || '') + "\nsourced from page " + authorId + " " + name + "\n"; }, Thing_1.ThingDataNode.body));
});
exports.ListingSpec = { fromSource: fromSource, getSource: getSource };
//# sourceMappingURL=ListingSpec.js.map