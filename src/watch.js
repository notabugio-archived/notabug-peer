import { curry, assocPath, path, pathOr, merge } from "ramda";

export const getDayStr = curry((peer, timestamp) => {
  const d = new Date(timestamp || (new Date()).getTime());
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const dayNum = d.getUTCDate();
  return `${year}/${month}/${dayNum}`;
});

export const countVotes = curry((peer, id, kind, data) => {
  const state = { ...peer.getState() };
  const existing = pathOr(0, ["things", id, "votes", kind], state);
  let count = Object.keys(data || { _: null }).length - 1;
  if (!count) return;
  if (count < existing && count === 1) count = existing + 1; // GUN loses votes
  if (count < existing) return;

  const thingState = state.things[id] = pathOr({}, ["things", id], state);
  const thingVotes = thingState.votes || pathOr({}, ["things", id, "votes"], state);
  thingVotes[kind] = count;
  peer.setState(state);

  // peer.setState(assocPath(["things", id, "votes", kind], count, state));
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));
});

export const watchThing = curry((peer, data) => {
  if (!data) return;
  let { id, ...thing } = data; // eslint-disable-line
  // let state = peer.getState();
  const state = { ...peer.getState() };

  const existingChain = path(["things", id, "chain"], state);
  thing = merge(pathOr({}, ["things", id], state), thing); // eslint-disable-line
  const { timestamp } = thing;
  const replyToSoul = path(["replyTo", "#"], thing);
  const opSoul = path(["op", "#"], thing);
  const replyToId = replyToSoul ? peer.souls.thing.isMatch(replyToSoul).thingid : null;
  const opId = opSoul ? peer.souls.thing.isMatch(opSoul).thingid : null;
  const lastActive = thing.lastActive || timestamp;

  const chain = existingChain || peer.souls.thing.get({ thingid: id });

  const thingState = state.things[id] = pathOr({}, ["things", id], state);
  thingState.id = id;
  thingState.timestamp = timestamp;
  thingState.lastActive = lastActive;
  thingState.chain = chain;
  thingState.replyToId = replyToId;
  thingState.opId = opId;

  /*
  state = assocPath(
    ["things", id],
    merge(
      pathOr({}, ["things", id], state),
      { id, timestamp, lastActive, chain, replyToId, opId },
    ),
    state
  );
  */

  if (replyToId) {
    const replyToState = state.things[replyToId] = pathOr({}, ["things", replyToId], state);
    const replies = replyToState.replies = pathOr({}, ["things", replyToId, "replies"], state);
    replies[id] = 1;
    // state = assocPath(["things", replyToId, "replies", id], 1, state);
  }

  peer.setState(state);
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));

  if (existingChain) return;
  peer.souls.thingVotes.get({ thingid: id, votekind: "up" }).on(peer.countVotes(id, "up"));
  peer.souls.thingVotes.get({ thingid: id, votekind: "down" }).on(peer.countVotes(id, "down"));
  peer.souls.thingAllComments.get({ thingid: id }).on(peer.countVotes(id, "comment"));
  peer.souls.thingComments.get({ thingid: id }).on(peer.countVotes(id, "replies"));
});

export const unwatchThing = curry((peer, id) => {
  const state = peer.getState();
  const chain = path(["things", id, "chain"], state);
  peer.setState(assocPath(["things", id], null, state));
  return chain && chain.off && chain.off();
});

export const watchCollection = curry((peer, soul) => {
  const state = peer.getState();
  let hasPreloaded = false;

  if (path(["collections", soul, "chain"], state)) return null;
  const chain = peer.gun.get(soul);
  peer.setState(assocPath(["collections", soul, "chain"], chain, state));

  const onThing = thing => {
    if (!thing || !thing.id) return null;
    const state2 = { ...peer.getState() };
    const collectionState = path(["collections", soul], state2);
    const collectionThings = collectionState.things = collectionState.things || {};
    collectionThings[thing.id] = 1;
    peer.setState(state2);

    // peer.setState(assocPath(["collections", soul, "things", thing.id], 1, state2));
    return peer.watchThing(thing);
  };


  if (!hasPreloaded) {
    chain.on(souls => {
      if (!souls) return;

      Object.keys(souls).map(thingSoul => {
        if (!peer.souls.thing.isMatch(thingSoul)) return;
        chain.get(thingSoul).on(onThing);
      });

      hasPreloaded = true;
    });
  }

  return chain.map().on(onThing);
});

export const unwatchCollection = curry((peer, soul) => {
  const state = peer.getState();
  const chain = path(["collections", soul, "chain"], state);
  peer.setState(assocPath(["collections", soul], null, state));
  return chain && chain.off && chain.off();
});

export const onChange = curry((peer, soul, fn) => {
  const state = peer.getState();
  const subs = pathOr([], ["changeSubscriptions", soul || null], state);
  if (subs.indexOf(fn) !== -1) return;
  peer.setState(assocPath(["changeSubscriptions", soul || null], [...subs, fn], state));
});

export const onChangeOff = curry((peer, soul, fn) => {
  const state = peer.getState();
  const subs = pathOr([], ["changeSubscriptions", soul || null], state).filter(f => f !== fn);
  peer.setState(assocPath(["changeSubscriptions", soul || null], subs, state));
});

export const sendChangeNotifications = curry((peer, soul) => {
  pathOr([], ["changeSubscriptions", soul], peer.getState())
    .forEach(fn => fn());
  pathOr([], ["changeSubscriptions", null], peer.getState())
    .forEach(fn => fn());
});

export const onChangeThing = curry((peer, id, fn) => {
  const soul = peer.souls.thing.soul({ thingid: id });
  peer.onChange(soul, fn);
  if (path(["things", id, "chain"], peer.getState())) return;
  const chain = peer.gun.get(soul);
  chain.on(data => peer.watchThing(data));
});

export const onChangeThingOff = curry((peer, id, fn) =>
  peer.onChangeOff(peer.souls.thing.soul({ thingid: id }), fn));

export const onChangeListing = curry((peer, params, fn) =>
  peer.getListingSouls(params).map(soul => peer.onChange(soul, fn)));

export const onChangeListingOff = curry((peer, params, fn) =>
  peer.getListingSouls(params).map(soul => peer.onChangeOff(soul, fn)));
