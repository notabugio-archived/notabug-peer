import * as R from "ramda";
import { query } from "gun-scope";
import { Config } from "../../Config";
import { Path } from "../Path";
import { ListingSpec } from "../ListingSpec";

const path = "/t/:topic/:sort";
const tabs = ["hot", "new", "discussed", "controversial", "top", "firehose"];

const getSource = query((scope, { topic, sort }) => {
  const topics = Path.splitTopics(topic);
  const submitTo = topics[0] === "all" ? "whatever" : topics[0];

  return ListingSpec.getSource(
    scope,
    Config.indexer,
    "listing:topic",
    [
      `name ${topic}`,
      `submit to ${submitTo}`,
      `sort ${sort}`,
      topic.indexOf(":") === -1 ? "kind submission" : "",
      ...R.map(topic => `topic ${topic}`, topics),
      ...R.map(tab => `tab ${tab} /t/${topic}/${tab}`, tabs)
    ].join("\n")
  );
});

const getSpec = query((scope, match) =>
  getSource(scope, match).then(ListingSpec.fromSource)
);

export const TopicListing = Path.withRoute({ path, getSource, getSpec });
