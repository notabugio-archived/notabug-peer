/* eslint-disable */
import { Validation } from "./Validation";
import { Query } from "./Query";
import { Thing } from "./Thing";
import { Authentication } from "./Authentication";

function init(Gun, config = {}) {
  const { leech, disableValidation, noGun, localStorage, persist, ...rest } =
    config || {};
  const peer = { config };

  if (!noGun) {
    const cfg = { localStorage: !!localStorage, radisk: !!persist, ...rest };

    if (persist) cfg.localStorage = false;
    if (!disableValidation) Gun.on("opt", Validation.gunWireInput(peer));
    if (cfg.storeFn) cfg.store = cfg.storeFn(cfg); // for indexeddb
    peer.gun = Gun(cfg);
    if (cfg.localStorage) peer.gun.on("localStorage:error", a => a.retry({}));
    if (leech) {
      const sendLeech = () => peer.gun._.on("out", { leech: true });

      sendLeech();
    }
  }

  peer.newScope = opts => Query.createScope(peer, opts);
  peer.onLogin = Authentication.onLogin(peer);
  peer.signup = Authentication.signup(peer);
  peer.login = Authentication.login(peer);
  peer.logout = () => Authentication.logout(peer);
  peer.isLoggedIn = () => Authentication.isLoggedIn(peer);
  peer.submit = Thing.submit(peer);
  peer.comment = Thing.comment(peer);
  peer.chat = Thing.chat(peer);
  peer.writePage = Thing.writePage(peer);
  peer.vote = Thing.vote(peer);
  peer.queries = Query;
  return peer;
}

export const Peer = {
  init
};
