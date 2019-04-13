"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gun_scope_1 = require("gun-scope");
var Config_1 = require("../../Config");
var Path_1 = require("../Path");
var ListingSpec_1 = require("../ListingSpec");
var path = '/user/:authorId/commented/:sort';
var getSource = gun_scope_1.query(function (scope, _a) {
    var authorId = _a.authorId, sort = _a.sort;
    return ListingSpec_1.ListingSpec.getSource(scope, Config_1.Config.indexer, 'listing:commented', ["curator " + authorId, "sort " + sort].join('\n'));
});
var getSpec = gun_scope_1.query(function (scope, match) { return getSource(scope, match).then(ListingSpec_1.ListingSpec.fromSource); });
exports.CommentedListing = Path_1.Path.withRoute({ path: path, getSource: getSource, getSpec: getSpec });
//# sourceMappingURL=CommentedListing.js.map