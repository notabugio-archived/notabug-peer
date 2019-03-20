import * as R from "ramda";
import { query } from "gun-scope";
import { Config } from "../Config";
import { Tokenizer } from "../Tokenizer";
import { Query } from "../Query";
import { ListingSpec } from "./ListingSpec";

const tabs = ["hot", "new", "discussed", "controversial", "top"];
const configPageName = name => `space:${name}`;
const sidebarPageName = name => `space:${name}:sidebar`;

const sourceWithDefaults = R.curry((ownerId, name, source) => {
  let result = [source || ""];
  const tokenized = Tokenizer.tokenize(source);

  if (!tokenized.getValue("tab")) {
    tabs.map(tab =>
      result.push(`tab ${tab} /user/${ownerId}/spaces/${name}/${tab}`)
    );
  }

  let indexer = tokenized.getValue("indexer");

  if (!indexer) {
    result.push(`indexer ${Config.indexer}`);
    indexer = Config.indexer;
  }

  let tabulator = tokenized.getValue("tabulator");

  if (!tabulator) result.push(`tabulator ${indexer}`);

  return result.join("\n");
});

const getSource = query((scope, authorId, name, extra) =>
  ListingSpec.getSource(scope, authorId, configPageName(name), extra).then(
    sourceWithDefaults(authorId, name)
  )
);

const getSpec = query((scope, authorId, name, extra) =>
  getSource(scope, authorId, name, extra).then(source =>
    ListingSpec.fromSource(source, authorId, name)
  )
);

const nodeToSpaceNames = R.compose(
  R.sortBy(R.identity),
  R.map(R.replace(/^space:/, "")),
  R.filter(
    R.compose(
      R.prop("length"),
      R.match(/^space:[^:]*$/)
    )
  ),
  R.keys
);

const userSpaceNames = query((scope, authorId) =>
  Query.userPages(scope, authorId).then(nodeToSpaceNames)
);

export const SpaceSpec = {
  configPageName,
  sidebarPageName,
  nodeToSpaceNames,
  userSpaceNames,
  tabs,
  getSource,
  getSpec
};
