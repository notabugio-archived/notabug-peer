"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("gun-scope");
var Config_1 = require("../../Config");
var Query_1 = require("../../Query");
var Path_1 = require("../Path");
var ListingSpec_1 = require("../ListingSpec");
var path = '/user/:authorId/:type/:sort';
var tabs = ['overview', 'comments', 'submitted', 'commands'];
var getSource = gun_scope_1.query(function (scope, _a) {
    var authorId = _a.authorId, type = _a.type, sort = _a.sort;
    return ListingSpec_1.ListingSpec.getSource(scope, Config_1.Config.indexer, 'listing:profile', [
        "author " + authorId,
        "type " + type,
        "sort " + sort
    ].concat(R.map(function (tab) { return "tab " + tab + " /user/" + authorId + "/" + tab; }, tabs)).join('\n'));
});
var getSpec = gun_scope_1.query(function (scope, match) {
    return Query_1.Query.userMeta(scope, match.authorId).then(function (meta) {
        return getSource(scope, match).then(R.pipe(ListingSpec_1.ListingSpec.fromSource, R.mergeLeft({
            profileId: match.authorId,
            displayName: R.propOr('', 'alias', meta)
        })));
    });
});
exports.ProfileListing = Path_1.Path.withRoute({
    path: path,
    tabs: tabs,
    getSource: getSource,
    getSpec: getSpec
});
//# sourceMappingURL=ProfileListing.js.map