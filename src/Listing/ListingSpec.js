import * as R from "ramda";
import { query } from "gun-scope";
import { ListingNode } from "./ListingNode";
import { ListingDefinition } from "./ListingDefinition";
import { ListingDataSource } from "./ListingDataSource";
import { ListingFilter } from "./ListingFilter";
import { Query } from "../Query";

const fromSource = R.compose(
  R.apply(R.mergeLeft),
  R.ap([ListingFilter.fromDefinition, R.identity]),
  R.of,
  R.apply(R.assoc("dataSource")),
  R.ap([ListingDataSource.fromDefinition, R.identity]),
  R.of,
  ListingDefinition.fromSource
);

const getSource = query((scope, authorId, name, extra = "") =>
  Query.getWikiPage(scope, authorId, name)
    .then(R.compose(
      body => `${body}
# added by indexer
${extra || ""}
sourced from page ${authorId} ${name}
`,
      ListingNode.body
    ))
);

export const ListingSpec = { fromSource, getSource };
