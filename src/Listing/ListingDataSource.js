import * as R from "ramda";
import { Promise, query } from "gun-scope";
import { ThingSet } from "../Thing";
import { Schema } from "../Schema";
import { Query } from "../Query";
import { ListingSort } from "./ListingSort";

const needsScores = definition =>
  !!R.find(definition.isPresent, [
    "sort hot",
    "sort top",
    "sort best",
    "sort controversial",
    "ups",
    "downs",
    "score",
    "can remove"
  ]);

const needsData = definition =>
  !!R.find(definition.isPresent, [
    "topic",
    "domain",
    "author",
    "unique by content",
    "kind",
    "type",
    "require signed",
    "require anon",
    "alias",
    "ban domain",
    "ban topic",
    "ban author",
    "ban alias"
  ]);

const itemsFromThingSouls = query((scope, souls, definition) =>
  Promise.all(
    R.map(soul => ListingSort.itemFromSoul(scope, soul, definition), souls)
  ).then(ListingSort.sortItems)
);

const itemsFromThingSets = query((scope, souls, definition) =>
  Promise.all(R.map(scope.get, souls))
    .then(R.reduce(R.mergeRight, {}))
    .then(ThingSet.souls)
    .then(souls => itemsFromThingSouls(scope, souls, definition))
);

const listingSource = definition => {
  const listings = R.pathOr([], ["filters", "allow", "listings"], definition);
  const { sort } = definition;
  const listingPaths = R.map(l => `${l}/${sort}`, listings);

  return { listingPaths };
};

const topicSource = definition => {
  const { sort } = definition;
  const topics = R.path(["filters", "allow", "topics"], definition) || [];
  const listingPaths = R.map(t => `/t/${t}/${sort}`, topics);
  const query = scope =>
    Query.multiTopic(scope, { topics, sort }).then(souls =>
      itemsFromThingSouls(scope, souls, definition)
    );

  return { listingPaths, query };
};

const domainSource = definition => {
  const { sort } = definition;
  const domains = R.path(["filters", "allow", "domains"], definition) || [];

  if (!domains.length) return topicSource(definition);
  const listingPaths = R.map(d => `/domain/${d}/${sort}`, domains);
  const query = scope =>
    Query.multiDomain(scope, { domains, sort }).then(souls =>
      itemsFromThingSouls(scope, souls, definition)
    );

  return { listingPaths, query };
};

const authorSource = definition => {
  const { sort } = definition;
  const authorIds = R.path(["filters", "allow", "authors"], definition);
  const type = R.path(["filters", "allow", "type"], definition);

  if (!authorIds.length) return topicSource(definition);
  const listingPaths = R.map(id => `/user/${id}/${type}/${sort}`, authorIds);
  const query = scope =>
    Query.multiAuthor(scope, { type, authorIds }).then(souls =>
      itemsFromThingSouls(scope, souls, definition)
    );

  return { listingPaths, query };
};

const curatorSource = definition => {
  const { sort } = definition;
  const curators = R.prop("curators", definition) || [];

  if (!curators.length) return topicSource(definition);
  const listingPaths = R.map(id => `/user/${id}/commented/${sort}`, curators);
  const query = scope =>
    Query.curate(scope, curators, true)
      .then(ids => ids.map(thingId => Schema.Thing.route.reverse({ thingId })))
      .then(souls => itemsFromThingSouls(scope, souls, definition));

  return { listingPaths, query };
};

const opSource = definition => {
  const { sort } = definition;
  const submissionIds = R.path(["filters", "allow", "ops"], definition);

  if (!submissionIds.length) topicSource(definition);
  const listingPaths = R.map(
    id => `/things/${id}/comments/${sort}`,
    submissionIds
  );
  const query = scope =>
    Query.multiSubmission(scope, { submissionIds }).then(souls =>
      itemsFromThingSouls(scope, souls, definition)
    );

  return { listingPaths, query };
};

const repliesSource = definition => {
  const { sort } = definition;
  const id = R.path(["filters", "allow", "repliesTo"], definition);
  const type = R.path(["filters", "allow", "type"], definition);

  const listingPaths = [`/user/${id}/replies/${type}/${sort}`];
  const query = scope =>
    Query.repliesToAuthor(scope, {
      type,
      repliesToAuthorId: id,
      indexer: definition.indexer
    }).then(souls => itemsFromThingSouls(scope, souls, definition));

  return { listingPaths, query };
};

const sources = {
  listing: listingSource,
  replies: repliesSource,
  op: opSource,
  curator: curatorSource,
  author: authorSource,
  domain: domainSource,
  topic: topicSource
};

const sourceNames = R.keys(sources);
const sourceName = def => R.find(def.isPresent, sourceNames) || "topic";
const fromDefinition = definition => {
  const name = sourceName(definition);

  return R.mergeLeft({ name }, sources[name](definition));
};

export const ListingDataSource = {
  fromDefinition,
  sources,
  needsScores,
  needsData,
  itemsFromThingSets,
  itemsFromThingSouls
};
