"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = exports.scope = exports.now = exports.nowOr = exports.resolve = exports.all = exports.Promise = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

var _zalgoPromise = require("zalgo-promise");

var Promise = exports.Promise = _zalgoPromise.ZalgoPromise;
var all = _zalgoPromise.ZalgoPromise.all,
    resolve = _zalgoPromise.ZalgoPromise.resolve;
exports.all = all;
exports.resolve = resolve;


var nodeKeys = function nodeKeys(obj) {
  return Object.keys(obj || {}).filter(function (key) {
    return key && key !== "_" && key !== "#";
  });
};

var nowOr = exports.nowOr = (0, _ramda.curry)(function (defaultValue, promise) {
  var result = void 0;
  var resolved = void 0;
  promise.then(function (res) {
    resolved = true;
    result = res;
  });
  return resolved ? result : defaultValue;
});

var now = exports.now = nowOr(undefined);

var node = function node(scope, soul) {
  return new _zalgoPromise.ZalgoPromise(function (ok, fail) {
    var known = scope.known(soul);
    if (typeof known !== "undefined") ok(known);
    scope.fetch(soul).then(function () {
      return scope.known(soul);
    }).then(ok).catch(fail);
  });
};

var edge = function edge(scope, key, parentaccess) {
  return parentaccess.then(function (data) {
    var soul = (0, _ramda.path)([key, "#"], data);
    var val = (0, _ramda.prop)(key, data);
    return soul ? scope.get(soul).then() : val;
  });
};

var access = function access(scope, key) {
  var paccess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (key === []) throw new Error("bad key []");
  var accesses = {};
  var get = function get(gKey) {
    return accesses[gKey] || (accesses[gKey] = access(scope, gKey, thisaccess));
  };
  var then = function then(fn) {
    return (paccess ? edge : node)(scope, key, paccess).then(fn || _ramda.identity);
  };
  var keys = function keys(fn) {
    return then(nodeKeys).then(fn || _ramda.identity);
  };
  var count = function count(fn) {
    return keys(_ramda.length).then(fn || _ramda.identity);
  };
  var thisaccess = { get: get, then: then, keys: keys, souls: keys, count: count };
  return thisaccess;
};

var scope = exports.scope = function scope(_ref) {
  var _ref$graph = _ref.graph,
      defaultGraph = _ref$graph === undefined ? {} : _ref$graph,
      gun = _ref.gun,
      parentScope = _ref.parentScope,
      _ref$cache = _ref.cache,
      cache = _ref$cache === undefined ? null : _ref$cache,
      _ref$isCacheing = _ref.isCacheing,
      isCacheing = _ref$isCacheing === undefined ? false : _ref$isCacheing,
      _ref$isCached = _ref.isCached,
      isCached = _ref$isCached === undefined ? false : _ref$isCached,
      _ref$onlyCache = _ref.onlyCache,
      onlyCache = _ref$onlyCache === undefined ? false : _ref$onlyCache,
      _ref$isRealtime = _ref.isRealtime,
      isRealtime = _ref$isRealtime === undefined ? false : _ref$isRealtime;

  var listeners = [];
  var cachePromises = {};
  var promises = {};
  var cachedResults = _extends({}, cache || {});
  var accesses = {};
  var graph = _extends({}, defaultGraph);
  var get = function get(soul) {
    return accesses[soul] || (accesses[soul] = access(thisScope, soul));
  };
  var known = function known(soul) {
    return parentScope ? parentScope.known(soul) : graph[soul];
  };
  var on = function on(fn) {
    return listeners.push(fn);
  };
  var off = function off(fn) {
    return listeners = listeners.filter(function (x) {
      return x !== fn;
    });
  };

  var realtime = function realtime() {
    if (parentScope) return parentScope.realtime();
    if (!isRealtime) {
      promises = {};
      isRealtime = true; // eslint-disable-line
      onlyCache = false; // eslint-disable-line
      listeners.forEach(function (fn) {
        return fn();
      });
    }
  };
  var fetch = function fetch(soul) {
    return promises[soul] = promises[soul] || new _zalgoPromise.ZalgoPromise(function (ok) {
      if (parentScope) return parentScope.fetch(soul);
      if (!gun) return ok(null);
      var receive = function receive(data) {
        var actual = data;
        ok(graph[soul] = data ? actual : data);
        if (isRealtime) listeners.forEach(function (fn) {
          return fn(soul, data);
        });
      };
      if (typeof soul !== "string") throw new Error("bad soul " + soul);
      if (gun.redis) gun.redis.get(soul).then(receive);
      if (!gun.redis) gun.get(soul).on(receive);
      if (!gun.redis) {
        gun.get(soul).once(function (result) {
          if (isRealtime && typeof result === "undefined") {
            setTimeout(function () {
              return receive(result);
            }, 500);
          } else {
            receive(result);
          }
        });
      }
    });
  };
  var cachedQuery = function cachedQuery(name, queryFn) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (parentScope) return parentScope.cachedQuery.apply(parentScope, [name, queryFn].concat(args));
    var key = [name].concat(args).map(function (x) {
      return (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" ? JSON.stringify(x) : "" + x;
    });
    var cached = (0, _ramda.path)(key, cachedResults);
    if (onlyCache) return resolve(cached);
    var promise = queryFn.apply(undefined, [thisScope].concat(args)).then(function (result) {
      if (isCacheing || isCached) {
        cachedResults = (0, _ramda.assocPath)(key, result, cachedResults);
      }
      cachePromises = (0, _ramda.dissocPath)(_ramda.path, cachePromises);
      return result;
    });
    return cached ? resolve(nowOr(cached, promise)) : promise;
  };

  var getCache = function getCache() {
    return cachedResults;
  };
  var getGraph = function getGraph() {
    return graph;
  };
  var getAccesses = function getAccesses() {
    return accesses;
  };
  var loadCachedResults = function loadCachedResults(newResults) {
    cachedResults = (0, _ramda.mergeDeepRight)(cachedResults, newResults);
    listeners.forEach(function (fn) {
      return fn();
    });
  };
  var thisScope = {
    on: on, off: off, get: get, getCache: getCache, known: known, fetch: fetch, realtime: realtime, cachedQuery: cachedQuery, getGraph: getGraph, getAccesses: getAccesses,
    loadCachedResults: loadCachedResults
  };
  return thisScope;
};

var query = exports.query = function query(queryFn) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var doCachedQuery = name ? function (scopeObj) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return scopeObj.cachedQuery.apply(scopeObj, [name, queryFn].concat(args));
  } : queryFn;
  var result = (0, _ramda.compose)(name ? doCachedQuery : queryFn);
  result.query = queryFn;
  result.cached = doCachedQuery;
  result.now = (0, _ramda.compose)(now, doCachedQuery);
  return result;
};