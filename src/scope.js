import {
  compose, dissocPath, assocPath, curry, path, prop, length, identity,
  mergeDeepRight,
} from "ramda";
import { ZalgoPromise } from "zalgo-promise";
export const Promise = ZalgoPromise;
export const { all, resolve } = ZalgoPromise;

const nodeKeys = (obj) => Object.keys(obj || {}).filter(key => key && key !== "_" && key !== "#");

export const nowOr = curry((defaultValue, promise) => {
  let result;
  let resolved;
  promise.then(res => {
    resolved = true;
    result = res;
  });
  return resolved ? result : defaultValue;
});

export const now = nowOr(undefined);

const node = (scope, soul) => (new ZalgoPromise((ok, fail) => {
  const known = scope.known(soul);
  if (typeof known !== "undefined") ok(known);
  scope.fetch(soul).then(() => scope.known(soul)).then(ok).catch(fail);
}));

const edge = (scope, key, parentaccess) => parentaccess.then(data => {
  const soul = path([key, "#"], data);
  const val = prop(key, data);
  return soul ? scope.get(soul).then() : val;
});

const access = (scope, key, paccess=null) => {
  if (key === []) throw new Error("bad key []");
  const accesses = {};
  const get = gKey => (accesses[gKey] || (accesses[gKey] = access(scope, gKey, thisaccess)));
  const then = fn => (paccess ? edge : node)(scope, key, paccess).then(fn || identity);
  const keys = fn => then(nodeKeys).then(fn || identity);
  const count = fn => keys(length).then(fn || identity);
  const thisaccess = { get, then, keys, souls: keys, count };
  return thisaccess;
};

export const scope = ({
  graph: defaultGraph = {},
  gun,
  parentScope,
  cache = null,
  isCacheing = false,
  isCached = false,
  onlyCache = false,
  isRealtime = false,
}) => {
  let listeners = [];
  let cachePromises = {};
  let promises = {};
  let cachedResults = { ...(cache || {}) };
  const accesses = {};
  const graph = { ...defaultGraph };
  const get = soul => (accesses[soul] || (accesses[soul] = access(thisScope, soul)));
  const known = soul => parentScope ? parentScope.known(soul) : graph[soul];
  const on = fn => listeners.push(fn);
  const off = fn => listeners = listeners.filter(x => x !== fn);

  const realtime = () => {
    if (parentScope) return parentScope.realtime();
    if (!isRealtime) {
      promises = {};
      isRealtime = true; // eslint-disable-line
      onlyCache = false; // eslint-disable-line
      listeners.forEach(fn => fn());
    }
  };
  const fetch = soul => (
    promises[soul] = promises[soul] || (new ZalgoPromise(ok => {
      if (parentScope) return parentScope.fetch(soul);
      if (!gun) return ok(null);
      const receive = data => {
        const actual = data;
        ok(graph[soul] = data ? actual : data);
        if (isRealtime) listeners.forEach(fn => fn(soul, data));
      };
      if (typeof soul !== "string") throw new Error(`bad soul ${soul}`);
      if (gun.redis) gun.redis.get(soul).then(receive);
      if (!gun.redis) gun.get(soul).on(receive);
      if (!gun.redis) {
        gun.get(soul).once(result => {
          if (isRealtime && typeof result === "undefined") {
            setTimeout(() => receive(result), 500);
          } else {
            receive(result);
          }
        });
      }
    }))
  );
  const cachedQuery = (name, queryFn, ...args) => {
    if (parentScope) return parentScope.cachedQuery(name, queryFn, ...args);
    const key = [name, ...args].map(x => typeof x === "object" ? JSON.stringify(x) : `${x}`);
    const cached = path(key, cachedResults);
    if (onlyCache) return resolve(cached);
    const promise = queryFn(thisScope, ...args).then(result => {
      if (isCacheing || isCached) {
        cachedResults = assocPath(key, result, cachedResults);
      }
      cachePromises = dissocPath(path, cachePromises);
      return result;
    });
    return cached ? resolve(nowOr(cached, promise)) : promise;
  };

  const getCache = () => cachedResults;
  const getGraph = () => graph;
  const getAccesses = () => accesses;
  const loadCachedResults = (newResults) => {
    cachedResults = mergeDeepRight(cachedResults, newResults);
    listeners.forEach(fn => fn());
  };
  const thisScope = {
    on, off, get, getCache, known, fetch, realtime, cachedQuery, getGraph, getAccesses,
    loadCachedResults,
  };
  return thisScope;
};

export const query = (queryFn, name=null) => {
  const doCachedQuery = name ? (scopeObj, ...args) =>
    scopeObj.cachedQuery(name, queryFn, ...args) : queryFn;
  const result = compose(name ? doCachedQuery : queryFn);
  result.query = queryFn;
  result.cached = doCachedQuery;
  result.now = compose(now, doCachedQuery);
  return result;
};
