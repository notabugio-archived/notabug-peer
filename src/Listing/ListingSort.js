import * as R from "ramda";
import { query, all, resolve } from "gun-scope";
import { Schema } from "../Schema";
import { ThingSet } from "../Thing";
import { Query } from "../Query";
import { ListingNode } from "./ListingNode";

const [POS_ID, POS_VAL] = [0, 1];
const toIds = R.map(R.prop(POS_ID));
const sortItems = R.sortBy(R.prop(POS_VAL));

const voteSort = fn => query((scope, thingId, spec) => {
  if (spec.isIdSticky(thingId)) return resolve(-Infinity);
  if (R.contains(thingId, spec.filters.allow.ops)) return resolve(-Infinity);

  return Query.thingMeta(scope, {
    tabulator: spec.tabulator,
    scores: true,
    thingSoul: Schema.Thing.route.reverse({ thingId })
  }).then(res => fn(res, spec));
});

const timeSort = fn => query((scope, thingId, spec) =>
  Query.thingMeta(scope, {
    tabulator: spec.tabulator,
    thingSoul: Schema.Thing.route.reverse({ thingId })
  }).then(fn)
);

const sorts = {
  new: timeSort(
    R.compose(
      R.multiply(-1),
      R.defaultTo(0),
      R.prop("timestamp"),
    )
  ),
  old: timeSort(R.prop("timestamp")),
  active: voteSort(
    ({ timestamp, lastActive }) => -1 * (lastActive || timestamp)
  ),
  top: voteSort(
    R.compose(
      x => -1 * parseInt(x, 10),
      R.pathOr(0, ["votes", "score"])
    )
  ),
  comments: voteSort(
    R.compose(
      x => -1 * parseFloat(x, 10),
      R.pathOr(0, ["votes", "comment"])
    )
  ),
  discussed: voteSort(thing => {
    const timestamp = R.prop("timestamp", thing);
    const score = parseInt(R.pathOr(0, ["votes", "comment"], thing), 10);
    const seconds = timestamp / 1000 - 1134028003;
    const order = Math.log10(Math.max(Math.abs(score), 1));

    if (!score) return 1000000000 - seconds;
    return -1 * (order + seconds / 45000);
  }),
  hot: voteSort(thing => {
    const timestamp = R.prop("timestamp", thing);
    const score = parseInt(R.pathOr(0, ["votes", "score"], thing), 10);
    const seconds = timestamp / 1000 - 1134028003;
    const order = Math.log10(Math.max(Math.abs(score), 1));
    let sign = 0;

    if (score > 0) {
      sign = 1;
    } else if (score < 0) {
      sign = -1;
    }
    return -1 * (sign * order + seconds / 45000);
  }),
  best: voteSort(thing => {
    const ups = parseInt(R.pathOr(0, ["votes", "up"], thing), 10);
    const downs = parseInt(R.pathOr(0, ["votes", "down"], thing), 10);
    const n = ups + downs;

    if (n === 0) return 0;
    const z = 1.281551565545; // 80% confidence
    const p = ups / n;
    const left = p + (1 / (2 * n)) * z * z;
    const right = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
    const under = 1 + (1 / n) * z * z;

    return -1 * ((left - right) / under);
  }),
  controversial: voteSort(thing => {
    const ups = parseInt(R.pathOr(0, ["votes", "up"], thing), 10);
    const downs = parseInt(R.pathOr(0, ["votes", "down"], thing), 10);

    if (ups <= 0 || downs <= 0) return 0;
    const magnitude = ups + downs;
    const balance = ups > downs ? downs / ups : ups / downs;

    return -1 * magnitude ** balance;
  })
};

const isValidSort = sort => !!sorts[sort];

const toItem = query(
  (scope, id, spec) =>
    (sorts[spec.sort] || sorts.new)(scope, id, spec).then(val => [id, val])
);

const itemFromSoul = (scope, soul, spec) => toItem(scope, ListingNode.soulToId(soul), spec);

const toItems = query(
  (scope, ids, spec) => all(R.map(
    id => toItem(scope, id, spec),
    ids
  ))
);

const fromThingSets = query(
  (scope, souls, spec) =>
    all(R.map(scope.get, souls))
      .then(R.pipe(
        ThingSet.union,
        ThingSet.ids,
        ids => toItems(scope, ids, spec)
      ))
      .then(sortItems)
);

export const ListingSort = {
  POS_ID,
  POS_VAL,
  sorts,
  isValidSort,
  toItem,
  toItems,
  toIds,
  itemFromSoul,
  sortItems,
  fromThingSets
};
