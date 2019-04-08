import * as R from "ramda";
import { scope as makeScope, query, all, resolve } from "gun-scope";
import { Config } from "./Config";
import { Constants } from "./Constants";
import { Schema } from "./Schema";
import { ThingSet } from "./Thing";
import { ListingNode } from "./Listing/ListingNode";

const emptyPromise = resolve(null);
const unionArrays = R.reduce(R.union, []);

const topicSouls = params => {
  const { topics = ["all"] } = params || {};
  const days = R.propOr(365, "days", params) || 365;
  const dayStrings = [];
  const oneDay = 1000 * 60 * 60 * 24;
  const start = new Date().getTime() - oneDay * parseInt(days, 10);

  for (let i = 0; i <= days + 1; i++)
    dayStrings.push(ThingSet.dayStr(start + i * oneDay));
  return Object.keys(
    topics.reduce(
      (result, topicName) =>
        dayStrings.reduce((res, ds) => {
          res[`${Constants.PREFIX}/topics/${topicName}/days/${ds}`] = true;
          return res;
        }, result),
      {}
    )
  );
};

const singleTopic = query((scope, params) => {
  const tSouls = topicSouls({ ...params, topics: [params.topic] });
  let souls = [];
  let itemMax = Constants.LISTING_SIZE;

  if (params.sort === "new") {
    itemMax = Constants.LISTING_SIZE;
  } else {
    if (params.sort === "top") itemMax = itemMax * 3;
    if (params.topic === "all") itemMax = itemMax * 3;
  }

  const fetchMore = () => {
    const topicSoul = tSouls.pop();

    if (souls.length > itemMax || !topicSoul) return resolve(souls);
    return scope
      .get(topicSoul)
      .souls()
      .then(more => {
        souls = [...souls, ...more];
        return fetchMore();
      });
  };

  return fetchMore();
});

const singleDomain = query((scope, { domain }) =>
  scope.get(Schema.Domain.route.reverse({ domainName: domain })).souls()
);

const singleAuthor = query((scope, params) =>
  all([
    params.type && params.type !== "submitted" && params.type !== "overview"
      ? resolve([])
      : scope
          .get(`~${params.authorId}`)
          .get("submissions")
          .souls(),
    params.type &&
    params.type !== "comments" &&
    params.type !== "overview" &&
    params.type !== "commands"
      ? resolve([])
      : scope
          .get(`~${params.authorId}`)
          .get("comments")
          .souls()
  ]).then(([submissions, comments]) => unionArrays([submissions, comments]))
);

const listingIds = query(
  (scope, soul) => scope.get(soul).then(ListingNode.sortedIds),
  "listingIds"
);

const singleListing = query((scope, { listing, sort, indexer }) =>
  listingIds(scope, `${Constants.PREFIX}${listing}/${sort}@~${indexer}.`).then(
    R.compose(
      R.map(thingId => Schema.Thing.route.reverse({ thingId })),
      R.filter(R.identity)
    )
  )
);

const repliesToAuthor = query(
  (scope, { repliesToAuthorId, type = "overview", ...params }) =>
    singleListing(scope, {
      listing: `/user/${repliesToAuthorId}/${type}`,
      sort: "new",
      ...params
    }).then(authoredSouls =>
      all(
        authoredSouls.map(authoredSoul =>
          scope.get(`${authoredSoul}/comments`).souls()
        )
      ).then(unionArrays)
    )
);

const singleSubmission = query((scope, params) =>
  scope
    .get(
      Schema.ThingAllComments.route.reverse({ thingId: params.submissionId })
    )
    .souls(
      R.prepend(Schema.Thing.route.reverse({ thingId: params.submissionId }))
    )
);

const thing = query((scope, thingSoul) =>
  scope.get(thingSoul).then(meta => {
    if (!meta || !meta.id) return null;
    const result = { id: meta.id, timestamp: parseFloat(meta.timestamp, 10) };
    const replyToSoul = R.path(["replyTo", "#"], meta);
    const opSoul = R.path(["op", "#"], meta);
    const opId = opSoul ? Schema.Thing.route.match(opSoul).thingid : null;
    const replyToId = replyToSoul
      ? Schema.Thing.route.match(replyToSoul).thingid
      : null;

    if (opId) result.opId = opId;
    if (replyToId) result.replyToId = replyToId;
    return result;
  })
);

const multiQuery = (singleQuery, plural, single, collate = unionArrays) =>
  query((scope, params) => {
    const items = R.prop(plural, params);

    if (R.isNil(items)) return emptyPromise;
    return all(
      R.map(
        val => singleQuery(scope, { ...params, [single]: val }),
        R.propOr([], plural, params)
      )
    ).then(collate);
  });

const multiTopic = multiQuery(singleTopic, "topics", "topic");
const multiDomain = multiQuery(singleDomain, "domains", "domain");
const multiAuthor = multiQuery(singleAuthor, "authorIds", "authorId");
const multiSubmission = multiQuery(
  singleSubmission,
  "submissionIds",
  "submissionId"
);

const thingDataFromSouls = scope => souls =>
  all(
    souls
      .filter(x => !!x)
      .map(soul =>
        scope
          .get(soul)
          .get("data")
          .then(x => x)
      )
  );

const curated = query((scope, authorIds, submissionOnly = false) =>
  all([
    multiAuthor(scope, {
      type: "comments",
      authorIds
    })
      .then(thingDataFromSouls(scope))
      .then(
        R.compose(
          R.map(submissionOnly ? R.prop("opId") : R.prop("replyToId")),
          R.filter(R.prop("replyToId"))
        )
      ),
    multiAuthor(scope, {
      type: "submitted",
      authorIds
    }).then(R.map(soul => Schema.Thing.route.match(soul).thingId))
  ]).then(([ids1, ids2]) => R.uniq([...ids1, ...ids2]))
);

const thingScores = query(
  (scope, tabulator, thingId) =>
    tabulator && thingId
      ? scope
          .get(Schema.ThingVoteCounts.route.reverse({ thingId, tabulator }))
          .then()
      : resolve(),
  "thingScores"
);

const thingData = query((scope, thingId) => {
  return thingId
    ? scope.get(Schema.Thing.route.reverse({ thingId })).get("data")
    : resolve(null);
}, "thingData");

const thingMeta = query(
  (scope, { thingSoul, tabulator, data = false, scores = false }) => {
    if (!thingSoul) return resolve(null);
    const id = ListingNode.soulToId(thingSoul);

    return all([
      thing(scope, thingSoul),
      scores
        ? thingScores(scope, tabulator || Config.tabulator, id)
        : resolve(),
      data ? thingData(scope, id) : resolve()
    ]).then(([meta, votes, data]) => {
      if (!meta || !meta.id) return null;
      return { ...meta, votes, data };
    });
  }
);

const multiThingMeta = query((scope, params) =>
  all(
    R.reduce(
      (promises, thingSoul) => {
        if (!thingSoul) return promises;
        promises.push(thingMeta(scope, { ...params, thingSoul }));
        return promises;
      },
      [],
      R.propOr([], "thingSouls", params)
    )
  )
);

const userPages = query(
  (scope, authorId) =>
    scope.get(Schema.AuthorPages.route.reverse({ authorId })),
  "userPages"
);

const wikiPageId = query((scope, authorId, name) => {
  if (!authorId || !name) return resolve(null);
  return scope
    .get(Schema.AuthorPages.route.reverse({ authorId }))
    .get(name)
    .get("id");
}, "wikiPageId");

const wikiPage = query((scope, authorId, name) =>
  wikiPageId(scope, authorId, name).then(id => id && thingData(scope, id))
);

const userMeta = query((scope, id) => {
  if (!id) return resolve(null);
  return scope.get(`~${id}`).then(meta => ({
    alias: R.prop("alias", meta),
    createdAt: R.path(["_", ">", "pub"], meta)
  }));
}, "userMeta");

const createScope = R.curry((nab, opts) =>
  makeScope(R.assoc("gun", nab.gun, opts || {}))
);

export const Query = {
  singleTopic,
  singleDomain,
  singleAuthor,
  singleListing,
  repliesToAuthor,
  singleSubmission,
  thingMeta,
  multiThingMeta,
  multiTopic,
  multiDomain,
  multiAuthor,
  multiSubmission,
  thingScores,
  thingData,
  thingDataFromSouls,
  topicSouls,
  userPages,
  wikiPageId,
  wikiPage,
  userMeta,
  createScope,
  curated
};
