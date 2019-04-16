"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var gun_scope_1 = require("gun-scope");
var Constants_1 = require("../Constants");
var Config_1 = require("../Config");
var Schema_1 = require("../Schema");
var _a = [0, 1, 2, 3], POS_IDX = _a[0], POS_ID = _a[1], POS_VAL = _a[2]; // eslint-disable-line no-ustringnused-vars
var rowsToIds = function (rows) {
    return rows.map(function (row) { return ((row && row[POS_ID]) || ''); }).filter(function (id) { return !!id; });
};
var rowsToItems = R.map(R.slice(1, 3));
var source = R.propOr('', 'source');
var soulFromPath = R.curry(function (indexer, path) { return "" + Constants_1.Constants.PREFIX + path + "@~" + indexer + "."; });
var pathFromSoul = R.compose(R.replace(new RegExp("^" + Constants_1.Constants.PREFIX), ''), R.replace(/@~.*\./, ''));
var idToSoul = function (thingId) { return Schema_1.Schema.Thing.route.reverse({ thingId: thingId }) || ''; };
var idsToSouls = function (ids) { return ids.map(idToSoul).filter(function (id) { return !!id; }); };
var soulToId = function (soul) { return R.propOr('', 'thingId', Schema_1.Schema.Thing.route.match(soul)); };
var soulsToIds = R.map(soulToId);
function getRow(node, idx) {
    var row = R.split(',', R.propOr('', "" + idx, node));
    row[0] = (row[0] || '').trim();
    row[1] = parseFloat(row[1]);
    row.splice(0, 0, parseInt(idx, 10));
    return row;
}
var itemKeys = R.compose(R.filter(R.compose(function (val) { return !!(val === 0 || val); }, function (val) { return parseInt(val, 10); })), R.keysIn);
function rows(node) {
    var keys = R.keysIn(node);
    var result = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var keyVal = parseInt(key, 10);
        if (!keyVal && keyVal !== 0)
            continue;
        result.push(getRow(node, key));
    }
    return result;
}
var ids = R.compose(rowsToIds, rows);
var sortRows = R.sortWith([
    R.ascend(R.compose(R.cond([[R.isNil, R.always(Infinity)], [R.T, parseFloat]]), R.nth(POS_VAL)))
]);
var sortedIds = R.compose(R.map(R.nth(POS_ID)), sortRows, R.filter(R.identity), rows);
var mapSortData = R.addIndex(R.map);
var itemsToRows = mapSortData(function (item, idx) { return [idx, item[0], item[1]]; });
var diff = function (node, updatedItems, removeIds, _a) {
    if (updatedItems === void 0) { updatedItems = []; }
    if (removeIds === void 0) { removeIds = []; }
    var _b = (_a === void 0 ? {} : _a).maxSize, maxSize = _b === void 0 ? 1000 : _b;
    return __awaiter(_this, void 0, void 0, function () {
        var removed, byId, changes, rows, updated, toReplace, maxIdx, key, parsed, row, idx, _c, id, _d, rawValue, i, _e, id, value, existing, row, allSorted, sorted, missing, added, i, id, idx, val, inserted, row, replaced, idx, row, idx;
        return __generator(this, function (_f) {
            removed = R.indexBy(R.identity, removeIds);
            byId = {};
            changes = {};
            rows = [];
            updated = {};
            toReplace = [];
            maxIdx = 0;
            for (key in node || {}) {
                parsed = parseInt(key, 10);
                if (!(parsed || parsed === 0))
                    continue;
                row = getRow(node, key);
                idx = row[0], _c = row[1], id = _c === void 0 ? null : _c, _d = row[2], rawValue = _d === void 0 ? null : _d;
                row[POS_VAL] = rawValue === null ? null : rawValue;
                if (id && removed[id])
                    row[POS_ID] = row[POS_VAL] = null;
                if (id)
                    byId[id] = row;
                if (row[POS_ID]) {
                    rows.push(row);
                }
                else {
                    toReplace.push(row);
                }
                if (idx && idx > maxIdx)
                    maxIdx = idx;
            }
            for (i = 0; i < updatedItems.length; i++) {
                _e = updatedItems[i] || [null, null], id = _e[0], value = _e[1];
                if (!id)
                    continue;
                existing = byId[id];
                if (existing) {
                    if (existing[POS_VAL] !== value) {
                        existing[POS_VAL] = value;
                        updated[id] = true;
                    }
                }
                else {
                    row = [null, id, value];
                    rows.push(row);
                }
            }
            allSorted = sortRows(rows);
            sorted = maxSize ? allSorted.slice(0, maxSize) : allSorted;
            missing = maxSize ? allSorted.slice(maxSize, allSorted.length) : [];
            added = R.filter(function (row) { return row[POS_IDX] === null; }, sorted);
            toReplace = toReplace.concat(R.filter(function (row) { return row[POS_IDX] !== null; }, missing)).reverse();
            for (i = 0; i < sorted.length; i++) {
                id = sorted[i][POS_ID];
                idx = sorted[i][POS_IDX];
                val = sorted[i][POS_VAL];
                if (idx !== null && updated[id || ''])
                    changes["" + idx] = [id, val].join(',');
            }
            inserted = [];
            while (added.length) {
                row = added.pop();
                replaced = toReplace.pop();
                idx = (replaced || [null])[0];
                if (idx === null) {
                    idx = maxIdx + inserted.length + 1;
                    inserted.push(idx);
                }
                if (row)
                    changes["" + idx] = [row[POS_ID], row[POS_VAL]].join(',');
            }
            while (toReplace.length) {
                row = toReplace.pop();
                if (row && !row[POS_ID]) {
                    idx = "" + row[POS_IDX];
                    if (node[idx] !== null) {
                        changes[idx] = null;
                        console.log('nulling', idx, node[idx]);
                    }
                }
            }
            return [2 /*return*/, R.keys(changes).length ? changes : null];
        });
    });
};
var unionRows = R.compose(R.uniqBy(R.nth(POS_ID)), sortRows, R.reduce(R.concat, []), R.map(rows));
var rowsFromSouls = gun_scope_1.query(function (scope, souls) {
    return Promise.all(R.map(scope.get, souls)).then(unionRows);
});
var read = gun_scope_1.query(function (scope, path, opts) {
    var _a = (opts || {}).indexer, indexer = _a === void 0 ? Config_1.Config.indexer : _a;
    return rowsFromSouls(scope, [soulFromPath(indexer, path)]).then(rowsToIds);
}, 'listingRows');
var get = gun_scope_1.query(function (scope, soul) { return (soul ? scope.get(soul).then() : gun_scope_1.resolve(null)); }, 'listing');
exports.ListingNode = {
    POS_IDX: POS_IDX,
    POS_ID: POS_ID,
    POS_VAL: POS_VAL,
    source: source,
    get: get,
    getRow: getRow,
    itemKeys: itemKeys,
    rows: rows,
    ids: ids,
    idToSoul: idToSoul,
    idsToSouls: idsToSouls,
    soulToId: soulToId,
    soulsToIds: soulsToIds,
    rowsToIds: rowsToIds,
    rowsToItems: rowsToItems,
    itemsToRows: itemsToRows,
    sortRows: sortRows,
    sortedIds: sortedIds,
    soulFromPath: soulFromPath,
    pathFromSoul: pathFromSoul,
    rowsFromSouls: rowsFromSouls,
    read: read,
    diff: diff,
    unionRows: unionRows
};
//# sourceMappingURL=ListingNode.js.map