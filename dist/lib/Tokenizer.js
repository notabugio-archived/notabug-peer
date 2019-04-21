"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var tokenize = function (source) {
    var tokenMap = (source || '').split('\n').reduce(function (def, line) {
        var tokens = line
            .trim()
            .split(' ')
            .map(R.trim)
            .filter(function (x) { return x; });
        if (!tokens.length)
            return def;
        return R.assocPath(tokens.slice(0, 6), {}, def);
    }, {});
    var isPresent = function (p) {
        var check = p;
        if (typeof p === 'string')
            check = p.split(' ');
        return check && R.path(check, tokenMap);
    };
    var getValues = function (p) { return R.keysIn(isPresent(p)); };
    var getValue = function (p) { return getValues(p)[0] || null; };
    var getLastValue = function (p) { return getValues(p).pop() || null; };
    var getValueChain = function (p) {
        var keys = typeof p === 'string' ? p.split(' ') : p;
        var values = [];
        var next = 'start';
        while (next) {
            next = getValue(keys.concat(values)) || '';
            next && values.push(next);
        }
        return values;
    };
    var getPairs = function (p) {
        var keys = typeof p === 'string' ? p.split(' ') : p;
        return getValues(keys).reduce(function (pairs, key) {
            var val = getValue(keys.concat([key]));
            return pairs.concat([[key, val]]);
        }, []);
    };
    return {
        source: source,
        isPresent: isPresent,
        getValue: getValue,
        getValues: getValues,
        getLastValue: getLastValue,
        getValueChain: getValueChain,
        getPairs: getPairs
    };
};
exports.Tokenizer = { tokenize: tokenize };
//# sourceMappingURL=Tokenizer.js.map