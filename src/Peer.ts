import { Validation } from './Validation';
import { Query } from './Query';
import { Thing } from './Thing';
import { Authentication } from './Authentication';
import { Indexer } from './Oracle/Indexer';
import { Tabulator } from './Oracle/Tabulator';
import { Synchronizer } from './Oracle/Synchronizer';
import { Oracle } from './Oracle/Oracle';

function init(Gun: any, config: any = {}) {
  const {
    leech = false,
    disableValidation = false,
    noGun = false,
    localStorage = false,
    persist = false,
    ...rest
  } = config || {};
  const peer: any = { config };

  if (!noGun) {
    const cfg = { localStorage: !!localStorage, radisk: !!persist, ...rest };

    if (persist) cfg.localStorage = false;
    if (!disableValidation) Gun.on('opt', Validation.gunWireInput(peer));
    if (cfg.storeFn) cfg.store = cfg.storeFn(cfg); // for indexeddb
    peer.Gun = Gun;
    peer.gun = new Gun(cfg);
    if (cfg.localStorage) peer.gun.on('localStorage:error', (a: any) => a.retry({}));
    if (leech) {
      const sendLeech = () => peer.gun._.on('out', { leech: true });

      sendLeech();
    }
  }

  let oracle: Oracle;
  peer.oracle = () => (oracle = oracle || new Oracle(peer));
  peer.newScope = (opts: any) => Query.createScope(peer, opts);
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

  peer.index = (scopeOpts: any = { timeout: 5000 }) =>
    peer.oracle().use(new Indexer.Queue(peer, '', scopeOpts));
  peer.tabulate = (scopeOpts: any = { timeout: 5000 }) =>
    peer.oracle().use(new Tabulator.Queue(peer, '', scopeOpts));
  peer.synchronize = (scopeOpts: any = { timeout: 5000 }) =>
    peer.oracle().use(new Synchronizer.Queue(peer, '', scopeOpts));
  return peer;
}

export const Peer = {
  init
};
