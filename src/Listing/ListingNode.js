import * as R from "ramda";
import { query, resolve } from "gun-scope";
import { Constants } from "../Constants";
import { Config } from "../Config";

const [POS_IDX, POS_ID, POS_VAL] = [0, 1, 2, 3]; // eslint-disable-line no-unused-vars
const rowsToIds = R.map(R.prop(POS_ID));
const rowsToItems = R.map(R.slice(1, 3));
const source = R.propOr("", "source");
const soulFromPath = R.curry(
  (indexer, path) => `${Constants.PREFIX}${path}@~${indexer}.`
);

const getRow = R.curry((node, idx) =>
  R.compose(
    R.ifElse(R.prop("length"), R.insert(0, parseInt(idx, 10)), R.always(null)),
    row => {
      row[1] = parseFloat(row[1]);
      return row;
    },
    R.map(R.trim),
    R.split(","),
    R.propOr("", `${idx}`)
  )(node)
);

const itemKeys = R.compose(
  R.filter(
    R.compose(
      val => !!(val === 0 || val),
      parseInt
    )
  ),
  R.keys
);

const rows = node =>
  R.compose(
    R.map(getRow(node)),
    itemKeys
  )(node);

const ids = R.compose(
  rowsToIds,
  rows
);

const sortRows = R.sortWith([
  R.ascend(
    R.compose(
      R.cond([[R.isNil, R.always(Infinity)], [R.T, parseFloat]]),
      R.prop(POS_VAL)
    )
  )
]);

const sortedIds = R.compose(
  R.map(R.prop(POS_ID)),
  sortRows,
  R.filter(R.identity),
  rows
);

const itemsToRows = R.addIndex(R.map)(
  (item, idx) => [idx, ...item]
);

const diff = async (
  node,
  updatedItems = [],
  removeIds = [],
  { maxSize = 1000 } = {}
) => {
  const removed = R.indexBy(R.identity, removeIds);
  const byId = {};
  const changes = {};
  const rows = [];
  const updated = {};
  let toReplace = [];
  let maxIdx = 0;
  let key;

  for (key in node || {}) {
    const parsed = parseInt(key, 10);

    if (!(parsed || parsed === 0)) continue;
    const row = getRow(node, key) || [parsed, null, null];
    const [idx, id = null, rawValue = null] = row; // eslint-disable-line no-unused-vars

    row[POS_VAL] = rawValue === null ? null : parseFloat(rawValue);
    if (id && removed[id]) row[POS_ID] = row[POS_VAL] = null;
    if (id) byId[id] = row;
    if (row[POS_ID]) {
      rows.push(row);
    } else {
      toReplace.push(row);
    }
    if (idx > maxIdx) maxIdx = idx;
  }

  for (let i = 0; i < updatedItems.length; i++) {
    const [id, value] = updatedItems[i] || [null, null];

    if (!id) continue;
    const existing = byId[id];

    if (existing) {
      if (existing[POS_VAL] !== value) {
        existing[POS_VAL] = value;
        updated[id] = true;
      }
    } else {
      const row = [null, id, value];

      rows.push(row);
    }
  }

  const allSorted = sortRows(rows);
  const sorted = maxSize ? allSorted.slice(0, maxSize) : allSorted;
  const missing = maxSize ? allSorted.slice(maxSize, allSorted.length) : [];
  const added = R.filter(row => row[POS_IDX] === null, sorted);

  toReplace = toReplace
    .concat(R.filter(row => row[POS_IDX] !== null, missing))
    .reverse();

  for (let i = 0; i < sorted.length; i++) {
    const id = sorted[i][POS_ID];
    const idx = sorted[i][POS_IDX];
    const val = sorted[i][POS_VAL];

    if (idx !== null && updated[id]) changes[`${idx}`] = [id, val].join(",");
  }

  const inserted = [];

  while (added.length) {
    const row = added.pop();
    const replaced = toReplace.pop();
    let [idx] = replaced || [null];

    if (idx === null) {
      idx = parseInt(maxIdx, 10) + inserted.length + 1;
      inserted.push(idx);
    }

    changes[`${idx}`] = [row[POS_ID], row[POS_VAL]].join(",");
  }

  while (toReplace.length) {
    const row = toReplace.pop();

    if (row && !row[POS_ID]) {
      const idx = `${row[POS_IDX]}`;

      if (node[idx] !== null) {
        changes[idx] = null;
        console.log("nulling", idx, node[idx]);
      }
    }
  }

  return R.keys(changes).length ? changes : null;
};

const categorizeDiff = (diff, original) => {
  const allKeys = itemKeys(R.mergeLeft(diff, original));
  const added = [];
  const removed = [];

  for (let i = 0; i < allKeys.length; i++) {
    const key = allKeys[i];
    const [_diffIdx, diffId] = getRow(diff, key) || []; // eslint-disable-line no-unused-vars
    const [_origIdx, origId] = getRow(original, key); // eslint-disable-line no-unused-vars

    if (diffId !== origId) {
      if (diffId) added.push(diffId);
      if (origId) removed.push(origId);
    }
  }

  return [added, removed];
};

const unionRows = R.compose(
  R.uniqBy(R.prop(POS_ID)),
  sortRows,
  R.reduce(R.concat, []),
  R.map(rows)
);

const rowsFromSouls = query((scope, souls) =>
  Promise.all(R.map(scope.get, souls)).then(unionRows)
);

const read = query((scope, path, opts) => {
  const { indexer = Config.indexer } = opts || {};

  console.log("ListingNode.read", path);

  return rowsFromSouls(scope, [soulFromPath(indexer, path)]).then(rowsToIds);
}, "listingRows");

const get = query(
  (scope, soul) => (soul ? scope.get(soul) : resolve(null)),
  "listing"
);

export const ListingNode = {
  POS_IDX,
  POS_ID,
  POS_VAL,
  source,
  get,
  getRow,
  itemKeys,
  rows,
  ids,
  rowsToIds,
  rowsToItems,
  itemsToRows,
  sortRows,
  sortedIds,
  soulFromPath,
  rowsFromSouls,
  read,
  diff,
  categorizeDiff,
  unionRows
};
