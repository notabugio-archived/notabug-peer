/* globals Gun */
import { assoc, mergeDeepRight } from "ramda";
import { sorts } from "./sorts";
import * as watch from "./watch";
import * as fetch from "./fetch";
import * as write from "./write";
import * as souls from "./souls";
import * as schema from "./schema";
import * as serialized from "./serialized";
import * as auth from "./auth";
import * as accessors from "./accessors";
import * as listing from "./listing";
export * from "./etc";
export { default as pow } from "proof-of-work";

const DEFAULT_PEERS = [];

const notabug = (config={}, initialState={}) => {
  let state = mergeDeepRight({}, initialState);
  const {
    peers=DEFAULT_PEERS, disableValidation, blocked=[], noGun=false, localStorage=false,
    persist=false, ...rest,
  } = config || {};
  const blockedMap = blocked.reduce((res, soul) => ({ ...res, [soul]: true }), {});
  const peer = {
    config,
    schema,
    isBlocked: soul => !!blockedMap[soul],
    getState: () => state,
    setState: (newState) => state = ({ ...state, ...newState }),
    mergeState: (newState) => state = mergeDeepRight(state, newState),
  };
  const gunConfig = { peers, localStorage, ...rest };
  if (persist) {
    gunConfig.localStorage = false;
    gunConfig.radisk = true;
    gunConfig.until = gunConfig.until || 1000;
  } else {
    gunConfig.radisk = false;
  }
  peer.sorts = sorts(peer);
  peer.souls = Object.keys(souls).reduce((res, key) => assoc(key, souls[key](peer), res), {});

  if (!noGun) {
    Gun.on("opt", context => {
      context.on("in", function wireInput(msg) {
        Promise.all(Object.keys(msg).map(key => {
          if (key === "put" && msg.mesh) {
            const validated = msg;

            Object.keys(validated.put || {}).forEach(putKey => {
              validated.put[putKey] = config.putMutate
                ? config.putMutate(msg.put[putKey], putKey)
                : validated.put[putKey];
            });

            if (!disableValidation) {
              return Promise
                .resolve(peer.schema.types(key, validated[key], validated, null, validated, peer));
            }
          }
          return Promise.resolve(msg);
        }))
          .then(() => {
            if (msg && msg.put && !Object.keys(msg.put).length) return; // Rejected all writes
            this.to.next(msg);
          })
          .catch(e => console.error("Message rejected", e.stack || e, msg)); // eslint-disable-line
      });
    });
  }

  peer.gun = noGun ? null : Gun(gunConfig);

  // Nuke gun's localStorage if it fills up, kinda lame but less lame than total failure
  if (!persist && localStorage) peer.gun.on("localStorage:error", ack => ack.retry({}));

  const fns = { ...watch, ...fetch, ...accessors, ...listing, ...write, ...serialized, ...auth };
  Object.keys(fns).map(key => peer[key] = fns[key](peer));
  if (peer.gun) blocked.forEach(soul => peer.gun.get(soul).put({ url: null, body: "[removed]" }));
  return peer;
};

export default notabug;
