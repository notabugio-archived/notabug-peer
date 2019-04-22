"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("@notabug/gun-scope");
var Config_1 = require("../../Config");
var Path_1 = require("../Path");
var ListingSpec_1 = require("../ListingSpec");
var path = '/domain/:domain/:sort';
var tabs = ['hot', 'new', 'discussed', 'controversial', 'top'];
var getSource = gun_scope_1.query(function (scope, _a) {
    var domain = _a.domain, sort = _a.sort;
    var domains = Path_1.Path.splitTopics(domain);
    return ListingSpec_1.ListingSpec.getSource(scope, Config_1.Config.indexer, 'listing:domain', [
        "name " + domains[0],
        'submit to whatever',
        "sort " + sort,
        'kind submission'
    ].concat(R.map(function (domain) { return "domain " + domain; }, domains), R.map(function (tab) { return "tab " + tab + " /domain/" + domain + "/" + tab; }, tabs)).join('\n'));
});
var getSpec = gun_scope_1.query(function (scope, match) { return getSource(scope, match).then(ListingSpec_1.ListingSpec.fromSource); });
exports.DomainListing = Path_1.Path.withRoute({
    path: path,
    tabs: tabs,
    getSource: getSource,
    getSpec: getSpec
});
//# sourceMappingURL=DomainListing.js.map