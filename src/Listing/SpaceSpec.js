import * as R from "ramda";
import { query } from "gun-scope";
import { Config } from "../Config";
import { Tokenizer } from "../Tokenizer";
import { ThingDataNode } from "../Thing";
import { ListingSpec } from "./ListingSpec";

const tabs = ["hot", "new", "discussed", "controversial", "top"];
const spaceConfigPageName = name => `space:${name}`;

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

const getConfig = query((scope, authorId, name) =>
  ListingSpec.getSource(scope, authorId, spaceConfigPageName(name))
);

const getSource = query((scope, authorId, name) =>
  getConfig.then(
    R.compose(
      sourceWithDefaults(authorId, name),
      ThingDataNode.body
    )
  )
);

export const SpaceSpec = { tabs, getSource };
