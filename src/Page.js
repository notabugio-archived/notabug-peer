import * as R from "ramda";
import { Config } from "./Config";
import { Query } from "./Query";
import { Listing } from "./Listing";

const preload = async (scope, path, params) => {
  const type = Listing.typeFromPath(path);
  const [spec, ids] = await Promise.all([
    type.getSpec(scope, type.match),
    Listing.fromPath(scope, path, params),
    Listing.sidebarFromPath(scope, path)
  ]);
  const thingSouls = Listing.idsToSouls(ids);
  const things = await Query.multiThingMeta(scope, {
    thingSouls,
    tabulator: spec.tabulator || Config.tabulator,
    scores: true,
    data: true
  });
  const opIds = R.compose(
    R.without(ids),
    R.filter(R.identity),
    R.uniq,
    R.map(R.pathOr(null, ["data", "opId"]))
  )(things);

  if (opIds.length) {
    const opSouls = Listing.idsToSouls(opIds);

    await Query.multiThingMeta(scope, {
      thingSouls: opSouls,
      tabulator: spec.tabulator || Config.tabulator,
      data: true
    });
  }

  return scope.getCache();
};

export const Page = {
  preload
};
