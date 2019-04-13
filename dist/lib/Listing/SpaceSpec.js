"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("gun-scope");
var Config_1 = require("../Config");
var Tokenizer_1 = require("../Tokenizer");
var Query_1 = require("../Query");
var ListingSpec_1 = require("./ListingSpec");
var tabs = ['hot', 'new', 'discussed', 'controversial', 'top'];
var configPageName = function (name) { return "space:" + name; };
var sidebarPageName = function (name) { return "space:" + name + ":sidebar"; };
var sourceWithDefaults = R.curry(function (ownerId, name, source) {
    var result = [source || ''];
    var tokenized = Tokenizer_1.Tokenizer.tokenize(source);
    if (!tokenized.getValue('tab')) {
        tabs.map(function (tab) { return result.push("tab " + tab + " /user/" + ownerId + "/spaces/" + name + "/" + tab); });
    }
    var indexer = tokenized.getValue('indexer');
    if (!indexer) {
        result.push("indexer " + Config_1.Config.indexer);
        indexer = Config_1.Config.indexer;
    }
    var tabulator = tokenized.getValue('tabulator');
    if (!tabulator)
        result.push("tabulator " + indexer);
    return result.join('\n');
});
var getSource = gun_scope_1.query(function (scope, authorId, name, extra) {
    return ListingSpec_1.ListingSpec.getSource(scope, authorId, configPageName(name), extra).then(sourceWithDefaults(authorId, name));
});
var getSpec = gun_scope_1.query(function (scope, authorId, name, extra) {
    return getSource(scope, authorId, name, extra).then(function (source) {
        return ListingSpec_1.ListingSpec.fromSource(source, authorId, name);
    });
});
var nodeToSpaceNames = R.compose(R.sortBy(R.identity), R.map(R.replace(/^space:/, '')), R.filter(R.compose(R.propOr(false, 'length'), R.match(/^space:[^:]*$/))), R.keysIn);
var userSpaceNames = gun_scope_1.query(function (scope, authorId) {
    return Query_1.Query.userPages(scope, authorId).then(nodeToSpaceNames);
});
exports.SpaceSpec = {
    configPageName: configPageName,
    sidebarPageName: sidebarPageName,
    nodeToSpaceNames: nodeToSpaceNames,
    userSpaceNames: userSpaceNames,
    tabs: tabs,
    getSource: getSource,
    getSpec: getSpec
};
//# sourceMappingURL=SpaceSpec.js.map