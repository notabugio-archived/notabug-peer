import { compose, filter, identity, lte, slice, pathOr } from "ramda";
import { PREFIX } from "./etc";

export const getListingSouls = peer => params => {
  const { days, topics=["all"], opId, replyToId, domain, url } = (params || {});
  let dayStrings;

  if (opId) {
    return [`${PREFIX}/things/${opId}/allcomments`];
  } else if (replyToId) {
    return [`${PREFIX}/things/${peer.getOpId(replyToId)}/allcomments`];
  } else if (url) {
    return [`${PREFIX}/urls/${url}`];
  } else if (domain) {
    return [`${PREFIX}/domains/${domain}`];
  } else if (days) {
    const oneDay = (1000*60*60*24);
    const start = (new Date()).getTime() - oneDay * parseInt(days, 10);
    dayStrings = [];

    for (let i = 0; i <= (days + 1); i++) {
      dayStrings.push(peer.getDayStr(start + (i * oneDay)));
    }

    dayStrings.reverse();
  }

  return Object.keys(topics.reduce(
    (result, topicName) => dayStrings
      ? dayStrings.reduce(
        (topicResult, dayString) => ({
          ...topicResult,
          [`${PREFIX}/topics/${topicName}/days/${dayString}`]: true,
        }),
        result
      )
      : { ...result, [`${PREFIX}/topics/${topicName}`]: true },
    {}
  ));
};

const getReplies = (peer, params) => {
  const { limit, sort="hot", replyToId, count=0, threshold=null } = (params || {});
  return compose(
    limit ? slice(count, count+limit) : identity,
    peer.sorts[sort],
    threshold === null ? identity : filter(compose(lte(threshold), peer.getScore)),
    Object.keys,
    pathOr({}, ["things", replyToId, "replies"])
  )(peer.getState());
}

export const getListingIds = peer => params => {
  const { limit, sort="hot", count=0, threshold=null } = (params || {});
  if (!peer.sorts[sort]) throw new Error(`Unknown sort: ${sort}`);
  if (params.replyToId) return getReplies(peer, params);
  return compose(
    limit ? slice(count, count+limit) : identity,
    peer.sorts[sort],
    threshold === null ? identity : filter(compose(lte(threshold), peer.getScore)),
    peer.getCollectionsArray,
    peer.getListingSouls
  )(params);
};

export const watchListing = peer => params =>
  peer.getListingSouls(params).map(peer.watchCollection);

export const unwatchListing = peer => params =>
  peer.getListingSouls(params).map(peer.unwatchCollection);
