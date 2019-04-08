import * as R from "ramda";
import { Constants } from "../Constants";
import { Schema } from "../Schema";
import { Query } from "../Query";
import { ThingDataNode } from "../Thing";
import { ListingNode } from "./ListingNode";
import { ListingDataSource } from "./ListingDataSource";

const intPath = p =>
  R.compose(
    parseInt,
    R.path(p)
  );

const fromDefinition = definition => {
  const { filters, voteFilters, isPresent } = definition;
  const filterFunctions = [];
  const voteFilterFunctions = [];

  const addFilter = (...fns) => filterFunctions.push(R.compose(...fns));
  const addVoteFilter = (...fns) => voteFilterFunctions.push(R.compose(...fns));

  if (filters.allow.aliases.length)
    addFilter(t => !!isPresent(["alias", t]), R.path(["data", "author"]));
  if (filters.allow.authors.length)
    addFilter(t => !!isPresent(["author", t]), R.path(["data", "authorId"]));
  if (filters.allow.domains.length)
    addFilter(
      t => !!isPresent(["domain", t]),
      ThingDataNode.domain,
      R.prop("data")
    );

  if (
    filters.allow.topics.length &&
    !R.find(
      R.compose(
        R.identical("all"),
        R.last,
        R.split(":")
      ),
      filters.allow.topics
    )
  )
    addFilter(item => {
      let topic = R.path(["data", "topic"], item);
      const kind = R.path(["data", "kind"], item);

      if (kind === "chatmsg") topic = `chat:${topic}`;
      if (kind === "comment") topic = `comments:${topic}`;
      return !!isPresent(["topic", topic]);
    });

  if (filters.allow.kinds.length)
    addFilter(kind => !!isPresent(["kind", kind]), R.path(["data", "kind"]));
  if (filters.allow.type === "commands")
    addFilter(
      R.compose(
        R.test(Constants.COMMAND_RE),
        R.path(["data", "body"])
      )
    );

  if (filters.deny.aliases.length)
    addFilter(
      alias => !isPresent(["ban", "alias", alias]),
      R.path(["data", "author"])
    );
  if (filters.deny.authors.length)
    addFilter(
      authorId => !isPresent(["ban", "author", authorId]),
      R.path(["data", "authorId"])
    );
  if (filters.deny.domains.length)
    addFilter(
      domain => !domain || !isPresent(["ban", "domain", domain]),
      ThingDataNode.domain
    );
  if (filters.deny.topics.length)
    addFilter(
      topic => !isPresent(["ban", "topic", topic]),
      R.path(["data", "topic"])
    );
  if (filters.deny.anon) addFilter(R.path(["data", "authorId"]));
  if (filters.deny.signed)
    addFilter(
      R.compose(
        authorId => !authorId,
        R.path(["data", "authorId"])
      )
    );

  if (voteFilters.upsMin !== null)
    addVoteFilter(R.lte(voteFilters.upsMin), intPath(["votes", "up"]));
  if (voteFilters.upsMax !== null)
    addVoteFilter(R.gte(voteFilters.upsMax), intPath(["votes", "up"]));
  if (voteFilters.downsMin !== null)
    addVoteFilter(R.lte(voteFilters.downsMin), intPath(["votes", "down"]));
  if (voteFilters.downsMax !== null)
    addVoteFilter(R.gte(voteFilters.downsMax), intPath(["votes", "down"]));
  if (voteFilters.scoreMin !== null)
    addVoteFilter(R.lte(voteFilters.scoreMin), intPath(["votes", "score"]));
  if (voteFilters.scoreMax !== null)
    addVoteFilter(R.gte(voteFilters.scoreMax), intPath(["votes", "score"]));

  if (filters.deny.tags.length)
    addVoteFilter(thing => {
      const cmds = R.path(["votes", "commands"], thing) || {};

      return !filters.deny.tags.find(
        ([tagName, authorId]) => !!R.path([authorId, "tag", tagName], cmds)
      );
    });

  const contentFilter = thing => !filterFunctions.find(fn => !fn(thing));
  const voteFilter = thing => !voteFilterFunctions.find(fn => !fn(thing));
  const thingFilter = thing =>
    definition.isIdSticky(R.prop("id", thing)) ||
    (contentFilter(thing) && voteFilter(thing));

  return { thingFilter, contentFilter, voteFilter };
};

const getFilteredRows = async (
  scope,
  spec,
  sortedRows,
  { limit: limitProp = 25, count: countProp = 0, after = null, filterFn } = {}
) => {
  const limit = parseInt(limitProp, 10);
  const count = parseInt(countProp, 10) || 0;
  const rows = sortedRows.slice();
  const filtered = [];
  const fetchBatch = (size = 30) =>
    Promise.all(
      R.map(async row => {
        let inListing = true;

        if (!row[ListingNode.POS_ID]) {
          console.log("blankRow", row);
          return;
        }

        if (filterFn) inListing = await filterFn(row[ListingNode.POS_ID]);
        if (inListing) filtered.push(row);
      }, rows.splice(count, size))
    );

  while (rows.length > count) {
    await fetchBatch();
    if (limit && filtered.length >= limit) break;
  }

  return R.compose(
    limit ? R.slice(0, limit) : R.identity,
    R.sortBy(R.prop(ListingNode.POS_VAL))
  )(filtered);
};

const getFilteredIds = R.compose(
  x => x.then(R.map(R.prop(ListingNode.POS_ID))),
  getFilteredRows
);

const thingFilter = R.curry((scope, spec, thingId) =>
  Query.thingMeta(scope, {
    tabulator: spec.tabulator,
    thingSoul: Schema.Thing.route.reverse({ thingId }),
    scores: ListingDataSource.needsScores(spec),
    data: ListingDataSource.needsData(spec)
  }).then(spec.thingFilter)
);

export const ListingFilter = {
  fromDefinition,
  getFilteredRows,
  getFilteredIds,
  thingFilter
};
