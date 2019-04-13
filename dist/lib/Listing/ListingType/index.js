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
var Query_1 = require("../../Query");
var ChatListing_1 = require("./ChatListing");
var FirehoseListing_1 = require("./FirehoseListing");
var CommentedListing_1 = require("./CommentedListing");
var TopicListing_1 = require("./TopicListing");
var DomainListing_1 = require("./DomainListing");
var CommentListing_1 = require("./CommentListing");
var SpaceListing_1 = require("./SpaceListing");
var InboxListing_1 = require("./InboxListing");
var ProfileListing_1 = require("./ProfileListing");
var types = {
    ChatListing: ChatListing_1.ChatListing,
    FirehoseListing: FirehoseListing_1.FirehoseListing,
    TopicListing: TopicListing_1.TopicListing,
    DomainListing: DomainListing_1.DomainListing,
    CommentListing: CommentListing_1.CommentListing,
    SpaceListing: SpaceListing_1.SpaceListing,
    InboxListing: InboxListing_1.InboxListing,
    CommentedListing: CommentedListing_1.CommentedListing,
    ProfileListing: ProfileListing_1.ProfileListing
};
var typesArray = R.values(types);
var fromPath = function (path) {
    var match;
    for (var i = 0; i < typesArray.length; i++) {
        match = typesArray[i].route.match(path);
        if (match)
            return R.assoc('match', match, typesArray[i]);
    }
    return null;
};
var sidebarFromPath = gun_scope_1.query(function (scope, path) {
    return specFromPath(scope, path).then(function (spec) {
        var _a = spec || {}, _b = _a.fromPageAuthor, fromPageAuthor = _b === void 0 ? '' : _b, _c = _a.fromPageName, fromPageName = _c === void 0 ? '' : _c;
        if (!fromPageAuthor || !fromPageName)
            return null;
        return Query_1.Query.wikiPage(scope, fromPageAuthor, fromPageName + ":sidebar");
    });
});
var specFromPath = gun_scope_1.query(function (scope, path) {
    var type = fromPath(path);
    if (!type)
        throw new Error("Can't find type for path: " + path);
    return type.getSpec(scope, type.match).then(function (baseSpec) {
        var spec = baseSpec;
        if (type.match.sort === 'default') {
            spec = R.assoc('path', type.route.reverse(R.assoc('sort', spec.sort, type.match)), spec);
        }
        else {
            spec = R.assoc('path', path, baseSpec);
        }
        if (spec.submitTopic && !spec.submitPath) {
            spec = R.assoc('submitPath', "/t/" + spec.submitTopic + "/submit", spec);
        }
        return spec;
    });
});
exports.ListingType = __assign({}, types, { types: types,
    fromPath: fromPath,
    sidebarFromPath: sidebarFromPath,
    specFromPath: specFromPath });
//# sourceMappingURL=index.js.map