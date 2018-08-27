import { map, reduce, prop, propOr, difference, path, isNil } from "ramda";
import {
  emptyPromise, unionArrays, intersectArrays, mergeObjects, getDayStr, PREFIX,
} from "./util";
import { query, all } from "./scope";
import * as SOULS from "./souls";

export const getTopicSouls = params => {
  const { topics=["all"] } = (params || {});
  const days = propOr(90, "days", params) || 90;
  const dayStrings = [];
  const oneDay = (1000*60*60*24);
  const start = (new Date()).getTime() - oneDay * parseInt(days, 10);
  for (let i = 0; i <= (days + 1); i++) dayStrings.push(getDayStr(start + (i * oneDay)));
  return Object.keys(topics.reduce(
    (result, topicName) => dayStrings.reverse().reduce(
      (res, ds) => ({ ...res, [`${PREFIX}/topics/${topicName}/days/${ds}`]: true }), result
    ), {}
  ));
};

const thingVoteCount = voteType => query((scope, thingSoul) =>
  scope.get(`${thingSoul}/${voteType}`).count());

export const thingVotesUp = thingVoteCount("votesup");
export const thingVotesDown = thingVoteCount("votesdown");
export const thingAllCommentsCount = query((scope, thingSoul) =>
  scope.get(`${thingSoul}/allcomments`).count());

export const thing = query((scope, thingSoul) => scope.get(thingSoul).then(meta => {
  if (!meta || !meta.id) return null;
  const result = { id: meta.id, timestamp: meta.timestamp };
  const replyToSoul = path(["replyTo", "#"], meta);
  const opSoul = path(["op", "#"], meta);
  const opId = opSoul ? SOULS.thing.isMatch(opSoul).thingid : null;
  const replyToId = replyToSoul ? SOULS.thing.isMatch(replyToSoul).thingid : null;
  if (opId) result.opId = opId;
  if (replyToId) result.replyToId = replyToId;
  return result;
}));

export const thingScores = query((scope, thingSoul) => all([
  thingVotesUp(scope, thingSoul),
  thingVotesDown(scope, thingSoul),
  thingAllCommentsCount(scope, thingSoul),
]).then(([up, down, comment]) => ({ up, down, comment, score: up - down })));

export const thingMeta = query((scope, thingSoul) => all([
  thing(scope, thingSoul),
  scope.get(`${thingSoul}/votecounts`).then(),
]).then(([meta, votes = {}]) => {
  if (!meta || !meta.id) return null;
  return { ...meta, votes };
}));

export const multiThingMeta = query((scope, params) => all(propOr([], "thingSouls", params)
  .map(thingSoul => thingMeta(scope, thingSoul))));

export const singleThingData = query((scope, { thingId: thingid }) =>
  scope.get(SOULS.thingData.soul({ thingid })).then(data => {
    const { _, ...actual } = data || {};
    return { [thingid]: data ? actual : data };
  }));

export const singleAuthor = query((scope, params) =>
  scope.get(params.authorId).get("things").souls());

export const singleDomain = query((scope, { domain }) =>
  scope.get(SOULS.domain.soul({ domain })).souls());

export const singleUrl = query((scope, { url }) => scope.get(SOULS.url.soul({ url })).souls());

export const singleTopic = query((scope, params) => all(map(
  soul => scope.get(soul).souls(),
  getTopicSouls({ ...params, topics: [params.topic] })
)).then(reduce((souls, more) => (souls.length < 1000) ? [...souls, ...more] : souls, [])));

export const singleSubmission = query((scope, params) =>
  scope.get(SOULS.thingAllComments.soul({ thingid: params.submissionId }))
    .souls(souls => [SOULS.thing.soul({ thingid: params.submissionId }), ...souls]));

export const singleLens = query((scope, params) => all([
  multiAuthor(scope, { ...params.lens, ...params }),
  multiDomain(scope, { ...params.lens, ...params }),
  multiUrl(scope, { ...params.lens, ...params }),
  multiTopic(scope, { ...params.lens, ...params }),
  multiSubmission(scope, { ...params.lens, ...params }),
  multiSpace(scope, { ...params.lens, ...params }),
]).then(intersectArrays));

export const singleSpace = query((scope, params) => !params.space ? emptyPromise : all([
  multiLens(scope, { ...params, lenses: params.space.good }),
  multiLens(scope, { ...params, lenses: params.space.bad }),
]).then(([goodSouls, badSouls]) => difference(goodSouls || [], badSouls || [])));

const multiQuery = (singleQuery, plural, single, collate=unionArrays) =>
  query((scope, params) => isNil(prop(plural, params)) ? emptyPromise : all(map(
    val => singleQuery(scope, { ...params, [single]: val }), propOr([], plural, params)
  )).then(collate));

export const multiThingData = multiQuery(singleThingData, "thingIds", "thingId", mergeObjects);
export const multiAuthor = multiQuery(singleAuthor, "authorIds", "authorId");
export const multiDomain = multiQuery(singleDomain, "domains", "domain");
export const multiUrl = multiQuery(singleUrl, "urls", "url");
export const multiTopic = multiQuery(singleTopic, "topics", "topic");
export const multiSubmission = multiQuery(singleSubmission, "submissionIds", "submissionId");
export const multiLens = multiQuery(singleLens, "lenses", "lens");
export const multiSpace = multiQuery(singleSpace, "spaces", "space");
