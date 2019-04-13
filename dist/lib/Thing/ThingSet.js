"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var Schema_1 = require("../Schema");
var GunNode_1 = require("../GunNode");
var souls = GunNode_1.GunNode.edges;
var ids = R.compose(R.filter(R.identity), R.map(R.compose(R.prop('thingId'), Schema_1.Schema.Thing.route.match.bind(Schema_1.Schema.Thing.route))), GunNode_1.GunNode.edges);
var union = R.compose(R.dissoc('_'), R.reduce(R.mergeRight, {}));
function dayStr(timestamp) {
    var d = new Date(timestamp || new Date().getTime());
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth() + 1;
    var dayNum = d.getUTCDate();
    return year + "/" + month + "/" + dayNum;
}
exports.ThingSet = { ids: ids, union: union, souls: souls, dayStr: dayStr };
//# sourceMappingURL=ThingSet.js.map