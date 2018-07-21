import { curry, assocPath, path, pathOr, propOr, merge } from "ramda";

export const getDayStr = curry((peer, timestamp) => {
  const d = new Date(timestamp || (new Date()).getTime());
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const dayNum = d.getUTCDate();
  return `${year}/${month}/${dayNum}`;
});

export const watchThing = curry((peer, data) => {
  if (!data) return;
  let { id, ...thing } = data; // eslint-disable-line
  let state = peer.getState();
  let updatedActive = false;
  thing = merge(pathOr({}, ["things", id], state), thing); // eslint-disable-line
  const { timestamp } = thing;
  const chain = peer.souls.thing.get({ thingid: id });
  const replyToSoul = path(["replyTo", "#"], thing);
  const opSoul = path(["op", "#"], thing);
  const replyToId = replyToSoul ? peer.souls.thing.isMatch(replyToSoul).thingid : null;
  const opId = opSoul ? peer.souls.thing.isMatch(opSoul).thingid : null;
  const votes = pathOr({}, ["things", id, "votes"], state);
  const lastActive = thing.lastActive || timestamp;

  ["up", "down", "comment"].forEach(kind => {
    const voteCount = propOr(votes[kind] || 0, `votes${kind}count`, thing);
    if (voteCount && voteCount > votes[kind]) votes[kind] = voteCount;
  });

  state = assocPath(
    ["things", id],
    merge(
      pathOr({}, ["things", id], state),
      { id, timestamp, lastActive, chain, replyToId, opId, votes },
    ),
    state
  );

  if (replyToId) {
    state = assocPath(["things", replyToId, "replies", id], 1, state);
  }

  if (opId && peer.getLastActive(opId) < timestamp) {
    state = assocPath(["things", opId, "lastActive"], timestamp, state);
    updatedActive = true;
  }

  peer.setState(state);
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));

  if (updatedActive) {
    peer.sendVoteNotifications(opId);
  }

  peer.sendVoteNotifications(id);

  if (peer.config.scoreThingsForPeers) {
    peer.souls.thingVotes.get({ thingid: id, votekind: "up" }).once(() => null);
    peer.souls.thingVotes.get({ thingid: id, votekind: "down" }).once(() => null);
    peer.souls.thingAllComments.get({ thingid: id }).once(() => null);
    peer.souls.thingComments.get({ thingid: id }).once(() => null);
  }
});

export const unwatchThing = curry((peer, id) => {
  const state = peer.getState();
  const chain = path(["things", id, "chain"], state);
  peer.setState(assocPath(["things", id], null, state));
  return chain && chain.off && chain.off();
});

export const watchCollection = curry((peer, soul) => {
  const state = peer.getState();
  if (path(["collections", soul, "chain"], state)) return null;
  const chain = peer.gun.get(soul);
  peer.setState(assocPath(["collections", soul, "chain"], chain, state));
  const onThing = thing => {
    if (!thing || !thing.id) return null;
    peer.setState(assocPath(["collections", soul, "things", thing.id], 1, peer.getState()));
    return peer.watchThing(thing);
  };

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

export const onVote = curry((peer, soul, fn) => {
  const state = peer.getState();
  const subs = pathOr([], ["voteSubscriptions", soul || null], state);
  if (subs.indexOf(fn) !== -1) return;
  peer.setState(assocPath(["voteSubscriptions", soul || null], [...subs, fn], state));
});

export const onMsg = peer => fn => {
  const state = peer.getState();
  const subs = pathOr([], ["msgSubscriptions"], state);
  if (subs.indexOf(fn) !== -1) return;
  peer.setState(assocPath(["msgSubscriptions"], [...subs, fn], state));
};

export const sendChangeNotifications = curry((peer, soul) => {
  pathOr([], ["changeSubscriptions", soul], peer.getState())
    .forEach(fn => fn());
  pathOr([], ["changeSubscriptions", null], peer.getState())
    .forEach(fn => fn());
});

export const sendVoteNotifications = curry((peer, id) => {
  pathOr([], ["voteSubscriptions", id], peer.getState())
    .forEach(fn => fn(id));
  pathOr([], ["voteSubscriptions", null], peer.getState())
    .forEach(fn => fn(id));
});

export const sendMsgNotifications = curry((peer, msg) => {
  pathOr([], ["msgSubscriptions"], peer.getState())
    .forEach(fn => fn(msg));
});

export const onChangeThing = curry((peer, id, fn) => {
  const soul = peer.souls.thing.soul({ thingid: id });
  peer.gun.get(soul).once(peer.watchThing);
  peer.onChange(peer.souls.thing.soul({ thingid: id }), fn);
});

export const onChangeThingOff = curry((peer, id, fn) =>
  peer.onChangeOff(peer.souls.thing.soul({ thingid: id }), fn));

export const onChangeListing = curry((peer, params, fn) =>
  peer.getListingSouls(params).map(soul => peer.onChange(soul, fn)));

export const onChangeListingOff = curry((peer, params, fn) =>
  peer.getListingSouls(params).map(soul => peer.onChangeOff(soul, fn)));

export const scoreThingsForPeers = peer => () => peer.onMsg(msg =>
  Object.keys(msg).forEach(key => {
    if (key === "put" && msg.mesh && msg.how !== "mem") {
      Object.keys(msg.put).forEach((soul) => {
        const votesMatch = (
          peer.souls.thingVotes.isMatch(soul) ||
          peer.souls.thingAllComments.isMatch(soul)
        );
        const thingDataMatch = peer.souls.thingData.isMatch(soul);

        if (votesMatch) {
          setTimeout(() => {
            const thingSoul = peer.souls.thing.soul({ thingid: votesMatch.thingid });
            peer.get(soul).then(votes => {
              if (!votes) return;
              const votecount = Object.keys(votes || { _: null }).length - 1;
              const chain = peer.gun.get(thingSoul);
              chain.get(`votes${votesMatch.votekind || "comment"}count`).put(votecount);
            });
          }, 200);
        } else if (thingDataMatch) {
          setTimeout(() => peer.indexThing(thingDataMatch.thingid, msg.put[soul]), 200);
        }
      });
    }
  }));
