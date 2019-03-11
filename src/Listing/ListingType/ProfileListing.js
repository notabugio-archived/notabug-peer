import * as R from "ramda";
import { query } from "gun-scope";
import { Config } from "../../Config";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";

const path = "/user/:authorId/:type/:sort";
const tabs = ["overview", "comments", "submitted", "commands"];

const getSource = query((scope, { authorId, type, sort }) =>
  ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:profile",
    [
      `author ${authorId}`,
      `type ${type}`,
      "submit to whatever",
      `sort ${sort}`,
      ...R.map(tab => `tab ${tab} /user/${authorId}/${tab}`, tabs)
    ].join("\n")
  )
);

const getSpec = query((scope, match) =>
  getSource(scope, match).then(ListingSpec.fromSource)
);

export const ProfileListing = Path.withRoute({ path, tabs, getSource, getSpec });
