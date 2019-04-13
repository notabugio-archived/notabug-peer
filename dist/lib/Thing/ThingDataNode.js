"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var uri_js_1 = require("uri-js");
var Constants_1 = require("../Constants");
var kind = R.propOr('submission', 'kind');
var body = R.propOr('', 'body');
var isCommand = R.compose(R.test(Constants_1.Constants.COMMAND_RE), body);
var url = R.propOr('', 'url');
var topic = R.propOr('', 'topic');
var domain = R.compose(function (urlStr) {
    if (!urlStr)
        return '';
    var parsed = uri_js_1.parse(urlStr);
    return (parsed.host || parsed.scheme || '').replace(/^www\./, '');
}, url);
var authorId = R.propOr('', 'authorId');
var opId = R.propOr('', 'opId');
var replyToId = R.propOr('', 'replyToId');
exports.ThingDataNode = {
    kind: kind,
    body: body,
    isCommand: isCommand,
    url: url,
    topic: topic,
    domain: domain,
    authorId: authorId,
    opId: opId,
    replyToId: replyToId
};
//# sourceMappingURL=ThingDataNode.js.map