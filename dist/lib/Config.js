"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var Constants_1 = require("./Constants");
exports.Config = {
    tabulator: Constants_1.Constants.INDEXER,
    indexer: Constants_1.Constants.INDEXER,
    owner: Constants_1.Constants.INDEXER,
    update: R.compose(R.map(function (_a) {
        var key = _a[0], val = _a[1];
        return (exports.Config[key] = val);
    }), R.toPairs)
};
//# sourceMappingURL=Config.js.map