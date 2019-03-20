import { query } from "gun-scope";
import { Config } from "../../Config";
import { Query } from "../../Query";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";

const path = "/user/:authorId/commented/:sort";

const getSidebar = query(scope =>
  Query.wikiPage(scope, Config.indexer, "listing:commented:sidebar")
);

const getSource = query((scope, { authorId, sort }) =>
  ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:commented",
    [
      `curator ${authorId}`,
      `sort ${sort}`
    ].join("\n")
  )
);

const getSpec = query((scope, match) =>
  getSource(scope, match).then(ListingSpec.fromSource)
);

export const CommentedListing = Path.withRoute({ path, getSidebar, getSource, getSpec });

