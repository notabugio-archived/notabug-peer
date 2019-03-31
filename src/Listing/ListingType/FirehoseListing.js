import * as R from "ramda";
import { query } from "gun-scope";
import { Config } from "../../Config";
import { Query } from "../../Query";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";
import { TopicListing } from "./TopicListing";

const path = "/t/:topic/firehose";
const tabs = TopicListing.tabs;

const getSidebar = query(scope =>
  Query.wikiPage(scope, Config.indexer, "listing:firehose:sidebar")
);

const getSource = query((scope, { topic, sort }) => {
  const normalTopics = Path.splitTopics(topic);
  const submitTo = topic === "all" ? "whatever" : normalTopics[0] || "whatever";
  const topics = normalTopics.reduce(
    (res, topic) => [...res, topic, `chat:${topic}`, `comments:${topic}`],
    []
  );

  return ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:firehose",
    [
      "sort new",
      "display as chat",
      `submit to ${submitTo}`,
      `sort ${sort}`,
      ...R.map(topic => `topic ${topic}`, topics),
      ...R.map(tab => `tab ${tab} /t/${topic}/${tab}`, tabs)
    ].join("\n")
  );
});

const getSpec = query((scope, match) =>
  getSource(scope, match).then(ListingSpec.fromSource)
);

export const FirehoseListing = Path.withRoute({
  tabs,
  path,
  getSidebar,
  getSource,
  getSpec
});
