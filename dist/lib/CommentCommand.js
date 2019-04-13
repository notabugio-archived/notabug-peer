"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var Constants_1 = require("./Constants");
var tokenize = R.compose(R.map(R.trim), R.split(' '), R.replace(Constants_1.Constants.COMMAND_RE, ''), R.defaultTo(''), R.nth(0), R.split('\n'));
var map = function (thingData) {
    return R.reduce(function (cmdMap, id) {
        var body = R.pathOr('', [id, 'body'], thingData);
        var authorId = R.pathOr('anon', [id, 'authorId'], thingData);
        var timestamp = parseFloat(R.pathOr('', [id, 'timestamp'], thingData));
        if (!R.test(Constants_1.Constants.COMMAND_RE, body))
            return cmdMap;
        var tokenized = [authorId].concat(tokenize(body), [id]);
        return R.assocPath(tokenized, timestamp || 0, cmdMap);
    }, {}, R.keys(thingData));
};
exports.CommentCommand = { tokenize: tokenize, map: map };
//# sourceMappingURL=CommentCommand.js.map