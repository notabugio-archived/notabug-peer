import * as R from "ramda";
import { query } from "gun-scope";
import { Schema } from "../../Schema";
import { GunNode } from "../../GunNode";
import { Query } from "../../Query";
import { Path } from "../Path";
import { ListingNode } from "../ListingNode";
import { ListingOracle } from "../ListingOracle";
import { SpaceSpec } from "../SpaceSpec";

const path = "/user/:authorId/spaces/:name/:sort";

const getSource = query((scope, { authorId, name, sort }) =>
  SpaceSpec.getSource(scope, authorId, name, `sort ${sort}`)
);

const getSpec = query((scope, { authorId, name, sort }) =>
  SpaceSpec.getSpec(scope, authorId, name, `sort ${sort}`)
);

const getSidebar = query((scope, { authorId, name, sort }) =>
  Query.wikiPage(scope, authorId, SpaceSpec.sidebarPageName(name))
);

const onPut = async (
  orc,
  route,
  { updatedSoul, diff, original, latest = 0 }
) => {
  const scope = orc.newScope();

  const originalData = GunNode.decodeSEA(original);
  const diffData = GunNode.decodeSEA(diff);
  const [updatedIds, removedIds] = ListingNode.categorizeDiff(
    diffData,
    originalData
  );
  const spec = await getSpec(scope, route.match);
  const voteCountsMatch = Schema.ThingVoteCounts.route.match(updatedSoul);
  const thingMatch = Schema.Thing.route.match(updatedSoul);
  const { thingId } = Schema.ThingDataSigned.route.match(updatedSoul) || {};
  const authorMatch = Schema.SEAAuthor.route.match(updatedSoul);

  if (voteCountsMatch) updatedIds.push(voteCountsMatch.thingId);
  if (thingMatch) updatedIds.push(thingMatch.thingId);
  if (thingId && thingId !== spec.fromPageId) updatedIds.push(thingId);
  await ListingOracle.updateListing(
    orc,
    route,
    scope,
    spec,
    updatedIds,
    removedIds
  );
  for (const key in scope.getAccesses()) orc.listen(key, route.soul);
  if (
    R.prop("size", original) ||
    updatedIds.length ||
    removedIds.length ||
    authorMatch
  )
    return;

  // base logic from gun-cleric-scope needs to be encapsualted better?
  console.log("---STANDARD SPACE UPDATE---", route.soul, updatedSoul);
  const node = await orc.newScope().get(route.soul);
  const existingKeys = ListingNode.itemKeys(node);

  if (existingKeys.length) {
    route.write({
      size: 0,
      ...existingKeys.reduce((diff, key) => {
        diff[`${key}`] = null;
        return diff;
      }, {})
    });
  }

  orc.work({
    id: `update:${route.soul}`,
    soul: route.soul,
    method: "doUpdate",
    priority: route.priority || 50
  });
};

export const SpaceListing = Path.withRoute({
  path,
  getSource,
  getSidebar,
  getSpec,
  onPut
});
