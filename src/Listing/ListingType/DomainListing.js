import * as R from "ramda";
import { query } from "gun-scope";
import { Config } from "../../Config";
import { Query } from "../../Query";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";

const path = "/domain/:domain/:sort";
const tabs = ["hot", "new", "discussed", "controversial", "top"];

const getSidebar = query(scope =>
  Query.wikiPage(scope, Config.indexer, "listing:domain:sidebar")
);

const getSource = query((scope, { domain, sort }) => {
  const domains = Path.splitTopics(domain);

  return ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:domain",
    [
      `name ${domains[0]}`,
      "submit to whatever",
      `sort ${sort}`,
      "kind submission",
      ...R.map(domain => `domain ${domain}`, domains),
      ...R.map(tab => `tab ${tab} /domain/${domain}/${tab}`, tabs)
    ].join("\n")
  );
});

const getSpec = query((scope, match) =>
  getSource(scope, match).then(ListingSpec.fromSource)
);

export const DomainListing = Path.withRoute({ path, tabs, getSidebar, getSource, getSpec });
