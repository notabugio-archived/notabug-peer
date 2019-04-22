"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gun_scope_1 = require("@notabug/gun-scope");
var Config_1 = require("../../Config");
var Path_1 = require("../Path");
var ListingSpec_1 = require("../ListingSpec");
var path = '/user/:authorId/replies/:type/:sort';
var getSource = gun_scope_1.query(function (scope, _a) {
    var authorId = _a.authorId, type = _a.type, _b = _a.sort, sort = _b === void 0 ? 'new' : _b;
    return ListingSpec_1.ListingSpec.getSource(scope, Config_1.Config.indexer, 'listing:inbox', ["replies to author " + authorId, 'kind comment', "type " + type, "sort " + sort].join('\n'));
});
var getSpec = gun_scope_1.query(function (scope, match) { return getSource(scope, match).then(ListingSpec_1.ListingSpec.fromSource); });
exports.InboxListing = Path_1.Path.withRoute({
    path: path,
    getSource: getSource,
    getSpec: getSpec
});
//# sourceMappingURL=InboxListing.js.map