import { pathOr, assocPath } from "ramda";

export const getListingJson = peer => params => {
  peer.watchListing(params);
  const things = peer.getListingIds(params).map(id => {
    const {
      opId, replyToId, timestamp, lastActive, votes={},
    } = pathOr({}, ["things", id], peer.getState());

    const result = { id };

    if (Object.keys(votes || {}).length) result.votes = votes;
    if (opId) result.opId = opId;
    if (replyToId) result.replyToId = replyToId;
    if (timestamp) result.timestamp = timestamp;
    if (lastActive && lastActive !== timestamp) result.lastActive = lastActive; return result;
  }).reduce((res, thing) => ({ ...res, [thing.id]: thing }), {});

  const collections = peer.getListingSouls(params).reduce(
    (result, soul) => {
      const ids = peer.getCollection(soul);
      return Object.keys(ids).length ? { ...result, [soul]: { things:ids } } : result;
    },
    {}
  );

  return { things, collections }
};

export const reconstituteState = peer => state => {
  let result = state;
  const { things } = state;
  Object.values(things).forEach(({ id, replyToId }) =>
    result = assocPath(["things", replyToId, "replies", id], 1, result));
  return result;
};
