"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gun_scope_1 = require("gun-scope");
var Path_1 = require("../Path");
var SpaceSpec_1 = require("../SpaceSpec");
var path = '/user/:authorId/spaces/:name/comments/:thingId/:sort';
var getSource = gun_scope_1.query(function (scope, _a) {
    var thingId = _a.thingId, authorId = _a.authorId, name = _a.name, sort = _a.sort;
    return SpaceSpec_1.SpaceSpec.getSource(scope, authorId, name, ["op " + thingId, "sort " + sort].join('\n'));
});
var getSpec = gun_scope_1.query(function (scope, _a) {
    var thingId = _a.thingId, authorId = _a.authorId, name = _a.name, sort = _a.sort;
    return SpaceSpec_1.SpaceSpec.getSpec(scope, authorId, name, ["op " + thingId, "sort " + sort].join('\n'));
});
exports.SpaceCommentListing = Path_1.Path.withRoute({
    path: path,
    getSource: getSource,
    getSpec: getSpec
});
//# sourceMappingURL=SpaceCommentListing.js.map