import curry from "ramda/src/curry";
import assocPath from "ramda/src/assocPath";
import path from "ramda/src/path";
import pathOr from "ramda/src/pathOr";
import propOr from "ramda/src/propOr";
import debounce from "lodash/debounce";

export const getDayStr = curry((peer, timestamp) => {
  const d = new Date(timestamp || (new Date()).getTime());
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const dayNum = d.getUTCDate();
  return `${year}/${month}/${dayNum}`;
});

export const countVote = curry((peer, id, kind, vote) => {
  if (!vote) return;
  const soul = peer.souls.thing.soul({ thingid: id });
  peer.setState(assocPath(
    ["things", id, "votes", kind],
    peer.getVoteCount(id, kind) + 1,
    peer.getState()
  ))
  peer.sendVoteNotifications(id);
  peer.sendChangeNotifications(soul);
});

export const watchThing = curry((peer, { id, timestamp, ...thing }) => {
  const state = peer.getState();
  const chain = peer.souls.thing.get({ thingid: id });
  const replyToSoul = path(["replyTo", "#"], thing);
  const opSoul = path(["op", "#"], thing);
  const replyToId = replyToSoul ? peer.souls.thing.isMatch(replyToSoul).thingid : null;
  const opId = opSoul ? peer.souls.thing.isMatch(opSoul).thingid : null;
  const votes = pathOr({}, ["things", id, "votes"], state);
  const existingTimestamp = peer.getTimestamp(id);

  if (existingTimestamp && peer.config.countVotes) return;


  if (!peer.config.countVotes) {
    ["up", "down", "comment"].forEach(kind => {
      const voteCount = propOr(votes[kind] || 0, `votes${kind}count`, thing);
      if (voteCount) votes[kind] = voteCount;
    });
  }

  peer.setState(assocPath(["things", id], { id, timestamp, chain, replyToId, opId, votes }, state));
  peer.sendChangeNotifications(peer.souls.thing.soul({ thingid: id }));

  if (peer.config.countVotes && timestamp) {
    chain.get("allcomments").map().once(peer.countVote(id, "comment"));
    chain.get("votesup").map().once(peer.countVote(id, "up"));
    chain.get("votesdown").map().once(peer.countVote(id, "down"));
  } else {
    peer.sendVoteNotifications(id);
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
  if (path(["collections", soul], state)) return null;
  const chain = peer.gun.get(soul);
  peer.setState(assocPath(["collections", soul, "chain"], chain, state));
  const onThing = thing => {
    if (!thing || !thing.id) return null;
    peer.setState(assocPath(["collections", soul, "things", thing.id], true, peer.getState()));
    return peer.watchThing(thing);
  };

  /*
  if (peer.config.countVotes) {
    return chain.map().once(onThing);
  }
  */
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

export const scoreThingsForPeers = peer => () => {
  const updaters = {};
  const updateScores = id => debounce(
    () => {
      const thing = peer.souls.thing.get({ thingid: id });
      const counts = {};
      ["up", "down", "comment"].forEach(kind => {
        const voteCount = peer.getVoteCount(id, kind);
        if (voteCount) {
          counts[`votes${kind}count`] = voteCount;
        }
      });
      if (Object.keys(counts).length) {
        thing.put(counts);
      }
    },
    100,
    { trailing: true }
  );

  peer.onMsg(msg => {
    Object.keys(msg).forEach(key => {
      if (key === "get" && msg.mesh && msg.how !== "mem") {
        const soul = path([key, "#"], msg);
        if (
          peer.souls.topic.isMatch(soul) ||
          peer.souls.topicDay.isMatch(soul) ||
          peer.souls.domain.isMatch(soul) ||
          peer.souls.url.isMatch(soul) ||
          peer.souls.thingComments.isMatch(soul)
        ) {
          peer.watchCollection(soul);
        }
      }
    });
  });

  peer.onVote(null, id => (updaters[id] || (updaters[id] = updateScores(id)))());
};
