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
var ChatListing_1 = require("./ChatListing");
var FirehoseListing_1 = require("./FirehoseListing");
var CommentedListing_1 = require("./CommentedListing");
var TopicListing_1 = require("./TopicListing");
var DomainListing_1 = require("./DomainListing");
var CommentListing_1 = require("./CommentListing");
var SpaceListing_1 = require("./SpaceListing");
var SpaceCommentListing_1 = require("./SpaceCommentListing");
var InboxListing_1 = require("./InboxListing");
var ProfileListing_1 = require("./ProfileListing");
var types = {
    ChatListing: ChatListing_1.ChatListing,
    FirehoseListing: FirehoseListing_1.FirehoseListing,
    TopicListing: TopicListing_1.TopicListing,
    DomainListing: DomainListing_1.DomainListing,
    CommentListing: CommentListing_1.CommentListing,
    SpaceCommentListing: SpaceCommentListing_1.SpaceCommentListing,
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
exports.ListingType = __assign({}, types, { types: types,
    fromPath: fromPath });
//# sourceMappingURL=index.js.map