import { compose, identity, keysIn, propOr, pathOr, prop, sortBy, filter, reduce } from "ramda";
import { scope as getScope, query } from "./scope";
import {
  singleSpace, multiThingData, multiThingMeta, thingMeta,
} from "./queries";
import * as SOULS from "./souls";

const calculateThingScores = query((scope, thingid) =>
  thingMeta(scope, SOULS.thing.soul({ thingid })).then(meta => {
    const ups = pathOr(0, ["votes", "up"], meta);
    const downs = pathOr(0, ["votes", "down"], meta);
    const comments = pathOr(0, ["votes", "comment"], meta);
    return { ups, downs, comments, score: ups - downs };
  }), "thingScores");

const scoreThing = ({ votes: { up = 0, down = 0 } = {} }) => (up - down);
const thresholdFilter = threshold => filter(compose(x => x >= threshold, scoreThing));
const metaSort = fn => (scope,  params) => multiThingMeta(scope, params)
  .then(compose(sortBy(fn), filter(x => !!x)));

const sorts = {
  new: metaSort(compose(x => -1 * x, prop("timestamp"))),
  old: metaSort(prop("timestamp")),
  active: metaSort(({ timestamp, lastActive }) => (-1 * (lastActive || timestamp))),
  top: metaSort(compose(x => -1 * x, scoreThing)),
  comments: metaSort(compose(x => -1 * x, pathOr(0, ["votes", "comment"]))),
  hot: metaSort(thing => {
    const ups = pathOr(0, ["votes", "up"], thing);
    const downs = pathOr(0, ["votes", "down"], thing);
    const timestamp = prop("timestamp", thing);
    const score = ups - downs;
    const seconds = (timestamp/1000) - 1134028003;
    const order = Math.log10(Math.max(Math.abs(score), 1));
    let sign = 0;
    if (score > 0) { sign = 1; } else if (score < 0) { sign = -1; }
    return -1 * (sign * order + seconds / 45000);
  }),
  best: metaSort(thing => {
    const ups = pathOr(0, ["votes", "up"], thing);
    const downs = pathOr(0, ["votes", "down"], thing);
    const n = ups + downs;
    if (n === 0) return 0;
    const z = 1.281551565545; // 80% confidence
    const p = ups / n;
    const left = p + 1/(2*n)*z*z;
    const right = z*Math.sqrt(p*(1-p)/n + z*z/(4*n*n));
    const under = 1+1/n*z*z;
    return -1 * ((left - right) / under);
  }),
  controversial: metaSort(thing => {
    const ups = pathOr(0, ["votes", "up"], thing);
    const downs = pathOr(0, ["votes", "down"], thing);
    if (ups <= 0 || downs <= 0) return 0;
    const magnitude = ups + downs;
    const balance = (ups > downs) ? downs / ups : ups /downs;
    return -1 * (magnitude ** balance);
  }),
};

const listingParams = (params) => {
  const sort = prop("sort", params) || "hot";
  const limit = parseInt(prop("limit", params) || 0, 10);
  const days = parseInt(prop("days", params) || 0, 10) || null;
  const count = parseInt(prop("count", params) || 0, 10);
  let threshold = propOr(null, "threshold", params);
  threshold = threshold === null ? null : parseInt(threshold, 10);
  return { sort, limit, count, threshold, days };
};

const listingSpaceDefinition = params => {
  const submissionId = (params.submissionId || params.opId);
  const domain = params.domain;
  if (submissionId) return { good: [{ submissionIds: [submissionId] }] };
  if (domain) return ({ good: [{ domains: [domain] }] });
  return { good: [{ topics: params.topics || ["all"] }] };
};

const sortThings = (scope, params) => (sorts[params.sort] || sorts.hot)(scope, params);
const sortSpace = (scope, params) => singleSpace(scope, params)
  .then(thingSouls => sortThings(scope, { ...params, thingSouls }))
  .then(params.threshold || params.threshold === 0 ? thresholdFilter(params.threshold) : identity)
  .then(reduce((thingsMap, thing) => {
    if (thing && thing.id) thingsMap[thing.id] = thing; // eslint-disable-line no-param-reassign
    return thingsMap;
  }, {}));

const sortedSpace = (scope, params) =>
  sortSpace(scope, { ...params, ...listingParams(params), space: listingSpaceDefinition(params) });

const calculateListing = query((scope, params) => sortedSpace(scope, params).then(things => {
  const { limit, count=0 } = params;
  const allIds = keysIn(things);
  const ids =  (limit || count) ? allIds.slice(count, count+limit) : allIds;
  return { ids, query: params, things };
}));

const listingThingIds = query((scope, params) => params.replyToId
  ? calculateReplyIds(scope, params)
  : calculateListing(scope, params).then(prop("ids")),
  "listing");

const calculateListingWithData = query((scope, params) => calculateListing(scope, params)
  .then(({ ids, ...other }) => multiThingData(scope, { thingIds: ids })
    .then(data => ({ ids, ...other, data }))));

const calculateReplyIds = query((scope, { replyToId, ...params }) =>
  calculateListingWithData(scope, { ...params, submissionId: params.opId }).then(({ data }) =>
    keysIn(data).filter(id => pathOr(null, [id, "replyToId"], data) === replyToId)));

export const thingsData = ({ gun }) => (opts={}) => multiThingData(opts.scope || getScope({ gun }));

const thingDataQuery = query((scope, thingid) =>
  scope.get(SOULS.thingData.soul({ thingid })), "thingData");

export const newScope = nab => (opts={}) => getScope({ ...opts, gun: nab.gun });
export const scopedListing = nab => (opts={}) => {
  const scope = opts.scope || (nab.scope = (nab.scope || getScope({ ...opts, gun: nab.gun }))); // eslint-disable-line
  const withScope = q => {
    const fn = (...args) => q(scope, ...args)
    fn.query = (...args) => q.query(scope, ...args);
    fn.cached = (...args) => q.cached(scope, ...args);
    fn.now = (...args) => q.now(scope, ...args);
    return fn;
  };
  const meta = withScope(calculateListing);
  const withData = withScope(calculateListingWithData);
  const ids = withScope(listingThingIds);
  const thingScores = withScope(calculateThingScores);
  const thingData = withScope(thingDataQuery);
  return { scope, meta, withData, ids, thingScores, thingData };
};
