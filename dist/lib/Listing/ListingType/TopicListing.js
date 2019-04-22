"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("@notabug/gun-scope");
var Config_1 = require("../../Config");
var Path_1 = require("../Path");
var ListingSpec_1 = require("../ListingSpec");
var path = '/t/:topic/:sort';
var tabs = ['hot', 'new', 'discussed', 'controversial', 'top', 'firehose'];
var getSource = gun_scope_1.query(function (scope, _a) {
    var topic = _a.topic, sort = _a.sort;
    var topics = Path_1.Path.splitTopics(topic);
    var submitTo = topics[0] === 'all' ? 'whatever' : topics[0];
    return ListingSpec_1.ListingSpec.getSource(scope, Config_1.Config.indexer, 'listing:topic', [
        "name " + topic,
        "submit to " + submitTo,
        "sort " + sort,
        topic.indexOf(':') === -1 ? 'kind submission' : ''
    ].concat(R.map(function (topic) { return "topic " + topic; }, topics), R.map(function (tab) { return "tab " + tab + " /t/" + topic + "/" + tab; }, tabs)).join('\n'));
});
var getSpec = gun_scope_1.query(function (scope, match) {
    return getSource(scope, match).then(R.pipe(ListingSpec_1.ListingSpec.fromSource, R.assoc('basePath', "/t/" + match.topic)));
});
exports.TopicListing = Path_1.Path.withRoute({
    tabs: tabs,
    path: path,
    getSource: getSource,
    getSpec: getSpec
});
//# sourceMappingURL=TopicListing.js.map