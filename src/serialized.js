import { pathOr, assocPath, mergeDeepRight } from "ramda";

export const getListingJson = peer => params => {
  peer.watchListing(params);
  const things = peer.getListingIds(params).reduce((result, id) => {
    const thing = { };
    const {
      opId, replyToId, timestamp, lastActive, votes={},
    } = pathOr({}, ["things", id], peer.getState());

    if (Object.keys(votes || {}).length) thing.votes = votes;
    if (opId) thing.opId = opId;
    if (replyToId) thing.replyToId = replyToId;
    if (timestamp) thing.timestamp = timestamp;
    if (lastActive && lastActive !== timestamp) thing.lastActive = lastActive;
    return { ...result, [id]: thing };
  }, {});
  return { things }
};

export const reconstituteState = peer => state => {
  const { things, topic, collectionSoul } = state;
  let collections = {};

  return mergeDeepRight(
    Object.keys(things).reduce(
      (result, id) => {
        const { replyToId, timestamp } = things[id];

        result = assocPath(["things", id, "id"], id, result); // eslint-disable-line
        result = assocPath(["things", replyToId, "replies", id], 1, result); // eslint-disable-line

        if (topic) {
          const topicSoul = peer.souls.topic.soul({ topicname: topic });
          const topicDaySoul = `${topicSoul}/days/${peer.getDayStr(timestamp)}`;
          collections = assocPath([topicSoul, "things", id], 1, collections);
          collections = assocPath([topicDaySoul, "things", id], 1, collections);
        }

        if (collectionSoul) {
          collections = assocPath([collectionSoul, "things", id], 1, collections);
        }

        return result;
      },
      state
    ),
    { collections }
  );
};
