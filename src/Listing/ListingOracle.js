import * as R from "ramda";
import { GunNode } from "../GunNode";
import { Schema } from "../Schema";
import { ThingSet } from "../Thing";
import { ListingNode } from "./ListingNode";
import { ListingSort } from "./ListingSort";
import { ListingType } from "./ListingType";

const updateListing = async (
  orc,
  route,
  scope,
  spec,
  ids = [],
  removeIds = []
) => {
  if (!ids.length && !removeIds.length) return;
  const existing = await orc.newScope().get(route.soul);
  const updatedItems = await ListingSort.toItems(scope, ids, spec);
  const changes = await ListingNode.diff(existing, updatedItems, removeIds);

  if (changes) console.log("CHANGES", route.soul, changes);
  if (changes) route.write(changes);
};

const onPut = async (orc, route, { soul, updatedSoul, diff, ...props }) => {
  let updatedIds = [];

  const path = ListingNode.pathFromSoul(soul);
  const scope = orc.newScope();
  const spec = await ListingType.specFromPath(scope, path);

  const { thingId } = Schema.ThingVoteCounts.route.match(updatedSoul) || {};
  const isSticky = R.equals(route.match.thingId || null);

  if (thingId) updatedIds.push(thingId);
  updatedIds = R.concat(updatedIds, ThingSet.ids(GunNode.decodeSEA(diff)));

  await updateListing(orc, route, scope, spec, updatedIds, [], isSticky);
  for (const key in scope.getAccesses()) orc.listen(key, route.soul);
};

export const ListingOracle = {
  updateListing,
  onPut
};
