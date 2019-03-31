import * as R from "ramda";
import { query } from "gun-scope";
import { Config } from "../../Config";
import { Query } from "../../Query";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";
import { TopicListing } from "./TopicListing";

const path = "/t/:topic/chat";
const tabs = [ ...TopicListing.tabs, "chat" ];

const getSidebar = query((scope, { topic, sort }) =>
  Query.wikiPage(scope, Config.indexer, "listing:chat:sidebar")
);

const getSource = query((scope, { topic, sort }) => {
  const normalTopics = Path.splitTopics(topic);
  const submitTo = topic === "all" ? "whatever" : normalTopics[0] || "whatever";
  const topics = normalTopics.reduce(
    (res, topic) => [...res, `chat:${topic}`],
    []
  );

  return ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:chat",
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

export const ChatListing = Path.withRoute({
  path,
  getSidebar,
  getSource,
  getSpec
});
