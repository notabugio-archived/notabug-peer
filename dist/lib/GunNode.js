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
/* globals Gun */
var R = require("ramda");
var soul = R.pathOr('', ['_', '#']);
var state = R.pathOr({}, ['_', '>']);
var latest = R.compose(R.last, R.sortBy(R.identity), R.values, state);
var edges = R.compose(R.map(R.propOr('', '#')), R.values);
var diff = function (existing, updated) {
    var changedKeys = R.without(['_'], R.keysIn(updated)).filter(function (k) {
        var newVal = updated[k];
        var oldVal = R.prop(k, existing);
        return !R.equals(newVal, oldVal) && "" + newVal !== "" + oldVal;
    });
    return R.pick(changedKeys, updated);
};
function decodeSEA(rawData) {
    var data = rawData ? __assign({}, rawData) : rawData;
    var soul = R.pathOr('', ['_', '#'], data);
    if (!soul || !Gun.SEA || soul.indexOf('~') === -1)
        return rawData;
    R.without(['_'], R.keys(data)).forEach(function (key) {
        Gun.SEA.verify(Gun.SEA.opt.pack(rawData[key], key, rawData, soul), false, function (res) { return (data[key] = Gun.SEA.opt.unpack(res, key, rawData)); });
    });
    return data;
}
exports.GunNode = { soul: soul, state: state, diff: diff, latest: latest, edges: edges, decodeSEA: decodeSEA };
//# sourceMappingURL=GunNode.js.map