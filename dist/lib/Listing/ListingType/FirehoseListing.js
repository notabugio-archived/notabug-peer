"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("@notabug/gun-scope");
var Config_1 = require("../../Config");
var Path_1 = require("../Path");
var ListingSpec_1 = require("../ListingSpec");
var TopicListing_1 = require("./TopicListing");
var path = '/t/:topic/firehose';
var tabs = TopicListing_1.TopicListing.tabs;
var getSource = gun_scope_1.query(function (scope, _a) {
    var topic = _a.topic, sort = _a.sort;
    var normalTopics = Path_1.Path.splitTopics(topic);
    var submitTo = topic === 'all' ? 'whatever' : normalTopics[0] || 'whatever';
    var topics = normalTopics.reduce(function (res, topic) { return res.concat([topic, "chat:" + topic, "comments:" + topic]); }, []);
    return ListingSpec_1.ListingSpec.getSource(scope, Config_1.Config.indexer, 'listing:firehose', [
        'sort new',
        'display as chat',
        "submit to " + submitTo,
        "sort " + sort
    ].concat(R.map(function (topic) { return "topic " + topic; }, topics), R.map(function (tab) { return "tab " + tab + " /t/" + topic + "/" + tab; }, tabs)).join('\n'));
});
var getSpec = gun_scope_1.query(function (scope, match) { return getSource(scope, match).then(ListingSpec_1.ListingSpec.fromSource); });
exports.FirehoseListing = Path_1.Path.withRoute({
    tabs: tabs,
    path: path,
    getSource: getSource,
    getSpec: getSpec
});
//# sourceMappingURL=FirehoseListing.js.map