"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var route_parser_1 = require("route-parser");
var splitDomains = R.compose(R.sortBy(R.identity), R.filter(R.identity), R.map(R.trim), R.split('+'), R.toLower, R.defaultTo(''));
var splitTopics = R.compose(R.ifElse(R.prop('length'), R.identity, R.always(['all'])), splitDomains);
var withRoute = function (obj) { return R.assoc('route', new route_parser_1.default(obj.path), obj); };
exports.Path = { splitDomains: splitDomains, splitTopics: splitTopics, withRoute: withRoute };
//# sourceMappingURL=Path.js.map