import { query } from "gun-scope";
import { Config } from "../../Config";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";

const path = "/things/:thingId/comments/:sort";

const getSpec = query((scope, { thingId, sort }) =>
  ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:comments",
    [`op ${thingId}`, `sort ${sort}`].join("\n")
  )
);

export const CommentListing = Path.withRoute({ path, getSpec });
