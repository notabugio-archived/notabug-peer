import * as SOULS from "./souls";
import { query } from "./scope";
import { thingScores } from "./queries";

const watchedComputed = (peer, soul, match, queryFn) => {
  peer.watched = peer.watched || {}; // eslint-disable-line no-param-reassign
  if (peer.watched[soul]) return peer.watched[soul];
  const scope = peer.newScope();
  const update = (qscope) => queryFn(qscope || peer.newScope(), match)
    .then(r => peer.gun.get(soul).once(existing => {
      if (
        !existing ||
        Object.keys(r || {}).find(key => key !== "_" && r[key] !== existing[key])
      ) peer.gun.get(soul).put(r);
    }));
  const onIn = msg => {
    if (!msg.put) return;
    const access = scope.getAccesses();
    let updated = false;
    let prop;
    for (prop in msg.put) { // eslint-disable-line
      if (prop in access) updated = prop;
    }
    if (updated) update();
  };
  update(scope);
  peer.watched[soul] = { onIn }; // eslint-disable-line no-param-reassign
  return peer.watched[soul];
};

const gunComputed = (soulType, queryFn) => {
  const onIn = (peer, msg) => {
    let prop;
    let match;
    let soul;
    for (prop in msg.get || {}) { // eslint-disable-line guard-for-in
      soul = msg.get[prop];
      match = soulType.isMatch(soul);
      if (match) {
        watchedComputed(peer, soul, match, queryFn);
      }
    }
    Object.keys(peer.watched || {}).forEach(key => peer.watched[key].onIn(msg));
  }
  return { onIn };
};

export const voteCounts = gunComputed(
  SOULS.thingVoteCounts,
  query((scope, params) => thingScores(scope, SOULS.thing.soul(params)))
);
