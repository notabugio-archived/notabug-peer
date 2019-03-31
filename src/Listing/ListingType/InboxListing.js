import { query } from "gun-scope";
import { Config } from "../../Config";
import { Query } from "../../Query";
import { GunNode } from "../../GunNode";
import { Schema } from "../../Schema";
import { ThingSet } from "../../Thing";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";
import { ListingNode } from "../ListingNode";
import { ListingOracle } from "../ListingOracle";

const path = "/user/:authorId/replied/:type/:sort";

const getSidebar = query(scope =>
  Query.wikiPage(scope, Config.indexer, "listing:topic:sidebar")
);

const getSource = query((scope, { authorId, type, sort = "new" }) =>
  ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:inbox",
    [`replies to author ${authorId}`, `type ${type}`, `sort ${sort}`].join("\n")
  )
);

const getSpec = query((scope, match) =>
  getSource(scope, match).then(ListingSpec.fromSource)
);

const onPut = async (orc, route, { updatedSoul, diff }) => {
  const scope = orc.newScope();
  const diffData = GunNode.decodeSEA(diff);
  const [updatedAuthored] = ListingNode.categorizeDiff(diffData);
  const spec = await getSpec(scope, route.match);
  let updatedIds = ThingSet.ids(diffData);

  for (let i = 0; i < updatedAuthored.length; i++) {
    const opId = updatedAuthored[i];
    const replyIds = ThingSet.ids(
      await scope
        .get(Schema.ThingComments.route.reverse({ thingId: opId }))
        .then()
    );

    updatedIds = updatedIds.concat(replyIds);
  }

  if (updatedIds.length)
    await ListingOracle.updateListing(orc, route, scope, spec, updatedIds, []);
  for (const key in scope.getAccesses()) orc.listen(key, route.soul);
};

export const InboxListing = Path.withRoute({
  path,
  getSidebar,
  getSource,
  getSpec,
  onPut
});
