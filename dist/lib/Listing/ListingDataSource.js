"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var needsScores = function (definition) {
    return !!R.find(definition.isPresent, [
        'sort hot',
        'sort top',
        'sort best',
        'sort controversial',
        'ups',
        'downs',
        'score',
        'can remove'
    ]);
};
var needsData = function (definition) {
    return !!R.find(definition.isPresent, [
        'topic',
        'domain',
        'author',
        'unique by content',
        'kind',
        'type',
        'require signed',
        'require anon',
        'alias',
        'ban domain',
        'ban topic',
        'ban author',
        'ban alias'
    ]);
};
var listingSource = function (definition) {
    var listings = R.pathOr([], ['filters', 'allow', 'listings'], definition);
    var sort = definition.sort;
    var listingPaths = R.map(function (l) { return l + "/" + sort; }, listings);
    return { listingPaths: listingPaths };
};
var topicSource = function (definition) {
    var sort = definition.sort;
    var topics = R.pathOr([], ['filters', 'allow', 'topics'], definition);
    if (!topics.length)
        topics.push('all');
    var listingPaths = R.map(function (t) { return "/t/" + t + "/" + sort; }, topics);
    return { listingPaths: listingPaths };
};
var domainSource = function (definition) {
    var sort = definition.sort;
    var domains = R.pathOr([], ['filters', 'allow', 'domains'], definition);
    if (!domains.length)
        return topicSource(definition);
    var listingPaths = R.map(function (d) { return "/domain/" + d + "/" + sort; }, domains);
    return { listingPaths: listingPaths };
};
var authorSource = function (definition) {
    var sort = definition.sort;
    var authorIds = R.pathOr([], ['filters', 'allow', 'authors'], definition);
    var type = R.path(['filters', 'allow', 'type'], definition) || 'overview';
    if (!authorIds.length)
        return topicSource(definition);
    var listingPaths = R.map(function (id) { return "/user/" + id + "/" + type + "/" + sort; }, authorIds);
    return { listingPaths: listingPaths };
};
var curatorSource = function (definition) {
    var sort = definition.sort;
    var curators = R.prop('curators', definition) || [];
    if (!curators.length)
        return topicSource(definition);
    var listingPaths = R.map(function (id) { return "/user/" + id + "/commented/" + sort; }, curators);
    return { listingPaths: listingPaths };
};
var opSource = function (definition) {
    var sort = definition.sort;
    var submissionIds = R.pathOr([], ['filters', 'allow', 'ops'], definition);
    if (!submissionIds.length)
        topicSource(definition);
    var listingPaths = R.map(function (id) { return "/things/" + id + "/comments/" + sort; }, submissionIds);
    return { listingPaths: listingPaths };
};
var repliesSource = function (definition) {
    var sort = definition.sort;
    var id = R.path(['filters', 'allow', 'repliesTo'], definition);
    var type = R.path(['filters', 'allow', 'type'], definition);
    var listingPaths = ["/user/" + id + "/replies/" + type + "/" + sort];
    return { listingPaths: listingPaths };
};
var sources = {
    op: opSource,
    listing: listingSource,
    replies: repliesSource,
    curator: curatorSource,
    author: authorSource,
    domain: domainSource,
    topic: topicSource
};
var sourceNames = R.keys(sources);
var sourceName = function (def) { return R.find(def.isPresent, sourceNames) || 'topic'; };
var fromDefinition = function (definition) {
    var name = sourceName(definition);
    return R.mergeLeft({ name: name }, sources[name](definition));
};
exports.ListingDataSource = {
    fromDefinition: fromDefinition,
    sources: sources,
    needsScores: needsScores,
    needsData: needsData
};
//# sourceMappingURL=ListingDataSource.js.map