import * as R from "ramda";
import { Schema } from "../Schema";
import { GunNode } from "../GunNode";

const souls = GunNode.edges;
const ids = R.compose(
  R.filter(R.identity),
  R.map(
    R.compose(
      R.prop("thingId"),
      Schema.Thing.route.match.bind(Schema.Thing.route)
    )
  ),
  GunNode.edges
);

const union = R.compose(
  R.dissoc("_"),
  R.reduce(R.mergeRight, {})
);

function dayStr(timestamp) {
  const d = new Date(timestamp || new Date().getTime());
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const dayNum = d.getUTCDate();

  return `${year}/${month}/${dayNum}`;
}

export const ThingSet = { ids, union, souls, dayStr };
