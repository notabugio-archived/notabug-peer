import { pathOr } from "ramda";

export const getListingJson = peer => params => {
  const things = {};
  const state = peer.getState();
  peer.watchListing(params);
  peer.getListingIds(params).forEach((id) => {
    const thing = { };
    const {
      opId, replyToId, timestamp, lastActive, votes={},
    } = pathOr({}, ["things", id], state);

    if (Object.keys(votes || {}).length) thing.votes = votes;
    if (opId) thing.opId = opId;
    if (replyToId) thing.replyToId = replyToId;
    if (timestamp) thing.timestamp = timestamp;
    if (lastActive && lastActive !== timestamp) thing.lastActive = lastActive;
    things[id] = thing;
  });
  return { things }
};

export const reconstituteState = peer => state => {
  const { things, topic, collectionSoul } = state;
  const collections = state.collections = state.collections || {}; // eslint-disable-line
  const topicSoul = topic ? peer.souls.topic.soul({ topicname: topic }) : null;

  const setInCollection = (soul, id) => {
    const collection = collections[soul] = collections[soul] || { things: {} }; // eslint-disable-line
    collection.things[id] = 1;
  };

  Object.keys(things).forEach(id => {
    const { replyToId, timestamp } = things[id];
    const replyTo = things[replyToId] = things[replyToId] || {};
    replyTo[id] = 1;
    things[id].id = id;

    if (topic) {
      const topicDaySoul = `${topicSoul}/days/${peer.getDayStr(timestamp)}`;
      setInCollection(topicSoul, id);
      setInCollection(topicDaySoul, id);
    }

    if (collectionSoul) {
      setInCollection(collectionSoul, id);
    }
  });

  return state;
};
