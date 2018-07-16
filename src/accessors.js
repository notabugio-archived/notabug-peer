import compose from "ramda/src/compose";
import pathOr from "ramda/src/pathOr";

export const getTimestamp = peer => id =>
  pathOr(0, ["things", id, "timestamp"], peer.getState());

export const getLastActive = peer => id =>
  pathOr(peer.getTimestamp(id), ["things", id, "lastActive"], peer.getState());

export const getVoteCount = peer => (id, type) =>
  pathOr(0, ["things", id, "votes", type], peer.getState());

export const getOpId = peer => id =>
  pathOr(id, ["things", id, "opId"], peer.getState());
  
export const getThingData = peer => id =>
  pathOr(null, ["data", id], peer.getState());

export const getScore = peer => id =>
  peer.getVoteCount(id, "up") - peer.getVoteCount(id, "down");

export const getCollection = peer => soul =>
  pathOr({}, ["collections", soul, "things"], peer.getState());

export const getCollections = peer => souls => souls.reduce(
  (ids, collection) => ({ ...ids, ...getCollection(peer)(collection) }), {}
);

export const getCollectionsArray = peer => compose(Object.keys, getCollections(peer));
