(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("argon2"), require("gun-scope"), require("gun-suppressor"), require("gun-suppressor-sear"), require("object-hash"), require("query-string"), require("ramda"), require("route-parser"), require("uri-js"));
	else if(typeof define === 'function' && define.amd)
		define("notabug-peer", ["argon2", "gun-scope", "gun-suppressor", "gun-suppressor-sear", "object-hash", "query-string", "ramda", "route-parser", "uri-js"], factory);
	else if(typeof exports === 'object')
		exports["notabug-peer"] = factory(require("argon2"), require("gun-scope"), require("gun-suppressor"), require("gun-suppressor-sear"), require("object-hash"), require("query-string"), require("ramda"), require("route-parser"), require("uri-js"));
	else
		root["notabug-peer"] = factory(root["argon2"], root["gun-scope"], root["gun-suppressor"], root["gun-suppressor-sear"], root["object-hash"], root["query-string"], root["ramda"], root["route-parser"], root["uri-js"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_argon2__, __WEBPACK_EXTERNAL_MODULE_gun_scope__, __WEBPACK_EXTERNAL_MODULE_gun_suppressor__, __WEBPACK_EXTERNAL_MODULE_gun_suppressor_sear__, __WEBPACK_EXTERNAL_MODULE_object_hash__, __WEBPACK_EXTERNAL_MODULE_query_string__, __WEBPACK_EXTERNAL_MODULE_ramda__, __WEBPACK_EXTERNAL_MODULE_route_parser__, __WEBPACK_EXTERNAL_MODULE_uri_js__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Authentication.js":
/*!*******************************!*\
  !*** ./src/Authentication.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authentication = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const signup = R.curry((peer, username, password, opts = {}) => new _gunScope.Promise((ok, fail) => {
  if (peer && peer.gun && peer.gun.user) {
    const user = peer.gun.user();

    _gunScope.Promise.resolve(user.create(username, password, ack => {
      if (ack.err) {
        fail(ack.err);
        user.leave();
        peer.gun.user().leave();
      } else {
        peer.login(username, password).then(ok);
      }
    }, opts));
  } else {
    fail("SEA is not loaded");
  }
}));
const login = R.curry((peer, username, password) => new _gunScope.Promise((ok, fail) => {
  if (peer && peer.gun && peer.gun.user) {
    const user = peer.gun.user();
    user.auth(username, password, ack => ack.err ? fail(ack.err) : ok(peer.gun.user().is));
  } else {
    fail("SEA is not loaded");
  }
}).then(result => {
  peer._onLogin && peer._onLogin(result); // eslint-disable-line

  return result;
}));

const logout = peer => peer.gun.user().leave();

const isLoggedIn = peer => peer.gun && peer.gun.user && peer.gun.user().is;

const onLogin = R.curry((peer, fn) => peer._onLogin = fn); // eslint-disable-line

const Authentication = {
  signup,
  login,
  logout,
  isLoggedIn,
  onLogin
};
exports.Authentication = Authentication;

/***/ }),

/***/ "./src/CommentCommand.js":
/*!*******************************!*\
  !*** ./src/CommentCommand.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentCommand = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const tokenize = R.compose(R.map(R.trim), R.split(" "), R.replace(_Constants.Constants.COMMAND_RE, ""), R.propOr("", 0), R.split("\n"));

const map = thingData => R.reduce((cmdMap, id) => {
  const body = R.path([id, "body"], thingData);
  const authorId = R.path([id, "authorId"], thingData) || "anon";
  const timestamp = parseFloat(R.path([id, "timestamp"], thingData));
  if (!R.test(_Constants.Constants.COMMAND_RE, body)) return cmdMap;
  const tokenized = [authorId, ...tokenize(body), id];
  return R.assocPath(tokenized, timestamp || 0, cmdMap);
}, {}, R.keys(thingData));

const CommentCommand = {
  tokenize,
  map
};
exports.CommentCommand = CommentCommand;

/***/ }),

/***/ "./src/Config.js":
/*!***********************!*\
  !*** ./src/Config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Config = {
  tabulator: _Constants.Constants.INDEXER,
  indexer: _Constants.Constants.INDEXER,
  owner: _Constants.Constants.INDEXER,
  update: R.compose(R.map(([key, val]) => Config[key] = val), R.toPairs)
};
exports.Config = Config;

/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constants = void 0;
const COMMAND_RE = /^ {4}~/;
const PREFIX = "nab";
const SOUL_DELIMETER = "|~~|";
const LISTING_SIZE = 1000;
const MAX_HASH_SIZE = 64;
const MAX_POW_NONCE_SIZE = 64;
const MAX_TOPIC_SIZE = 42;
const MAX_AUTHOR_ALIAS_SIZE = 256;
const MAX_AUTHOR_ID_SIZE = 128; // ???

const MAX_URL_SIZE = 2048;
const MAX_DOMAIN_SIZE = 256;
const MAX_THING_KIND_SIZE = 16;
const MAX_THING_TITLE_SIZE = 300;
const MAX_THING_BODY_SIZE = 50000;
const MAX_LISTING_IDS_SIZE = 50000;
const MAX_LISTING_SOURCE_SIZE = 50000;
const MAX_LISTING_TABS_SIZE = 5000;
const MAX_LISTING_SOUL_PREFIX_SIZE = MAX_TOPIC_SIZE;
const MAX_LISTING_SOUL_IDENTIFIER_SIZE = MAX_AUTHOR_ID_SIZE;
const MAX_LISTING_SOUL_SORT_SIZE = 16;
const MAX_LISTING_SOUL_TYPE_SIZE = MAX_TOPIC_SIZE;
const MAX_LISTING_SOUL_KIND_SIZE = 16;
const CHAT_PRELOAD_ITEMS = 10;
const INDEXER = "CEyKrDd1xyPXpWSV00MgvnZY2VJLHXgzCvhMeDwKTYA.yjSq0DyXzzhB_ZXr_DzfJgij3tXU0-3t0Q5bJAtZpj8";
const Constants = {
  COMMAND_RE,
  PREFIX,
  SOUL_DELIMETER,
  LISTING_SIZE,
  MAX_HASH_SIZE,
  MAX_POW_NONCE_SIZE,
  MAX_TOPIC_SIZE,
  MAX_AUTHOR_ALIAS_SIZE,
  MAX_AUTHOR_ID_SIZE,
  MAX_URL_SIZE,
  MAX_DOMAIN_SIZE,
  MAX_THING_KIND_SIZE,
  MAX_THING_TITLE_SIZE,
  MAX_THING_BODY_SIZE,
  MAX_LISTING_IDS_SIZE,
  MAX_LISTING_SOURCE_SIZE,
  MAX_LISTING_TABS_SIZE,
  MAX_LISTING_SOUL_PREFIX_SIZE,
  MAX_LISTING_SOUL_IDENTIFIER_SIZE,
  MAX_LISTING_SOUL_SORT_SIZE,
  MAX_LISTING_SOUL_TYPE_SIZE,
  MAX_LISTING_SOUL_KIND_SIZE,
  CHAT_PRELOAD_ITEMS,
  INDEXER
};
exports.Constants = Constants;

/***/ }),

/***/ "./src/GunNode.js":
/*!************************!*\
  !*** ./src/GunNode.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GunNode = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/* globals Gun */
const soul = R.pathOr("", ["_", "#"]);
const state = R.pathOr({}, ["_", ">"]);
const latest = R.compose(R.last, R.sortBy(R.identity), R.values, state);
const edges = R.compose(R.map(R.prop("#")), R.values);

function decodeSEA(rawData) {
  const data = rawData ? { ...rawData
  } : rawData;
  const soul = R.path(["_", "#"], data);
  if (!soul || !Gun.SEA || soul.indexOf("~") === -1) return rawData;
  R.without(["_"], R.keys(data)).forEach(key => {
    Gun.SEA.verify(Gun.SEA.opt.pack(rawData[key], key, rawData, soul), false, res => data[key] = Gun.SEA.opt.unpack(res, key, rawData));
  });
  return data;
}

;
const GunNode = {
  soul,
  state,
  latest,
  edges,
  decodeSEA
};
exports.GunNode = GunNode;

/***/ }),

/***/ "./src/Listing/ListingDataSource.js":
/*!******************************************!*\
  !*** ./src/Listing/ListingDataSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingDataSource = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Thing = __webpack_require__(/*! ../Thing */ "./src/Thing/index.js");

var _Schema = __webpack_require__(/*! ../Schema */ "./src/Schema.js");

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

var _ListingSort = __webpack_require__(/*! ./ListingSort */ "./src/Listing/ListingSort.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const needsScores = definition => !!R.find(definition.isPresent, ["sort hot", "sort top", "sort best", "sort controversial", "ups", "downs", "score", "can remove"]);

const needsData = definition => !!R.find(definition.isPresent, ["topic", "domain", "author", "unique by content", "kind", "type", "require signed", "require anon", "alias", "ban domain", "ban topic", "ban author", "ban alias"]);

const itemsFromThingSouls = (0, _gunScope.query)((scope, souls, definition) => _gunScope.Promise.all(R.map(soul => _ListingSort.ListingSort.itemFromSoul(scope, soul, definition), souls)).then(_ListingSort.ListingSort.sortItems));
const itemsFromThingSets = (0, _gunScope.query)((scope, souls, definition) => _gunScope.Promise.all(R.map(scope.get, souls)).then(R.reduce(R.mergeRight, {})).then(_Thing.ThingSet.souls).then(souls => itemsFromThingSouls(scope, souls, definition)));

const listingSource = definition => {
  const listings = R.pathOr([], ["filters", "allow", "listings"], definition);
  const {
    sort
  } = definition;
  const listingPaths = R.map(l => `${l}/${sort}`, listings);
  return {
    listingPaths
  };
};

const topicSource = definition => {
  const {
    sort
  } = definition;
  const topics = R.path(["filters", "allow", "topics"], definition) || [];
  if (!topics.length) topics.push("all"); // const listingPaths = R.map(t => `/t/${t}/${sort}`, topics);

  const listingPaths = [`/t/${topics.sort().join("+")}/${sort}`];

  const query = scope => _Query.Query.multiTopic(scope, {
    topics,
    sort
  }).then(souls => itemsFromThingSouls(scope, souls, definition));

  return {
    listingPaths,
    query
  };
};

const domainSource = definition => {
  const {
    sort
  } = definition;
  const domains = R.path(["filters", "allow", "domains"], definition) || [];
  if (!domains.length) return topicSource(definition); // const listingPaths = R.map(d => `/domain/${d}/${sort}`, domains);

  const listingPaths = [`/domain/${domains.sort().join("+")}/${sort}`];

  const query = scope => _Query.Query.multiDomain(scope, {
    domains,
    sort
  }).then(souls => itemsFromThingSouls(scope, souls, definition));

  return {
    listingPaths,
    query
  };
};

const authorSource = definition => {
  const {
    sort
  } = definition;
  const authorIds = R.path(["filters", "allow", "authors"], definition);
  const type = R.path(["filters", "allow", "type"], definition);
  if (!authorIds.length) return topicSource(definition);
  const listingPaths = R.map(id => `/user/${id}/${type}/${sort}`, authorIds);

  const query = scope => _Query.Query.multiAuthor(scope, {
    type,
    authorIds
  }).then(souls => itemsFromThingSouls(scope, souls, definition));

  return {
    listingPaths,
    query
  };
};

const curatorSource = definition => {
  const {
    sort
  } = definition;
  const curators = R.prop("curators", definition) || [];
  if (!curators.length) return topicSource(definition);
  const listingPaths = R.map(id => `/user/${id}/commented/${sort}`, curators);

  const query = scope => _Query.Query.curate(scope, curators, true).then(ids => ids.map(thingId => _Schema.Schema.Thing.route.reverse({
    thingId
  }))).then(souls => itemsFromThingSouls(scope, souls, definition));

  return {
    listingPaths,
    query
  };
};

const opSource = definition => {
  const {
    sort
  } = definition;
  const submissionIds = R.path(["filters", "allow", "ops"], definition);
  if (!submissionIds.length) topicSource(definition);
  const listingPaths = R.map(id => `/things/${id}/comments/${sort}`, submissionIds);

  const query = scope => _Query.Query.multiSubmission(scope, {
    submissionIds
  }).then(souls => itemsFromThingSouls(scope, souls, definition));

  return {
    listingPaths,
    query
  };
};

const repliesSource = definition => {
  const {
    sort
  } = definition;
  const id = R.path(["filters", "allow", "repliesTo"], definition);
  const type = R.path(["filters", "allow", "type"], definition);
  const listingPaths = [`/user/${id}/replies/${type}/${sort}`];

  const query = scope => _Query.Query.repliesToAuthor(scope, {
    type,
    repliesToAuthorId: id,
    indexer: definition.indexer
  }).then(souls => itemsFromThingSouls(scope, souls, definition));

  return {
    listingPaths,
    query
  };
};

const sources = {
  listing: listingSource,
  replies: repliesSource,
  op: opSource,
  curator: curatorSource,
  author: authorSource,
  domain: domainSource,
  topic: topicSource
};
const sourceNames = R.keys(sources);

const sourceName = def => R.find(def.isPresent, sourceNames) || "topic";

const fromDefinition = definition => {
  const name = sourceName(definition);
  return R.mergeLeft({
    name
  }, sources[name](definition));
};

const ListingDataSource = {
  fromDefinition,
  sources,
  needsScores,
  needsData,
  itemsFromThingSets,
  itemsFromThingSouls
};
exports.ListingDataSource = ListingDataSource;

/***/ }),

/***/ "./src/Listing/ListingDefinition.js":
/*!******************************************!*\
  !*** ./src/Listing/ListingDefinition.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingDefinition = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _Tokenizer = __webpack_require__(/*! ../Tokenizer */ "./src/Tokenizer.js");

var _Config = __webpack_require__(/*! ../Config */ "./src/Config.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const fromSource = (source, ownerId = null, spaceName = null) => {
  const tokenized = _Tokenizer.Tokenizer.tokenize(source);

  const obj = { ...tokenized
  };
  const {
    isPresent,
    getValue,
    getValues,
    getValueChain,
    getPairs
  } = tokenized;
  [obj.fromPageAuthor = ownerId, obj.fromPageName = spaceName ? `space:${spaceName}` : undefined] = getValueChain("sourced from page");
  obj.displayName = tokenized.getValue("name") || spaceName;
  obj.indexer = getValue("tabulator") || _Config.Config.indexer;
  obj.tabulator = getValue("tabulator") || obj.indexer;
  obj.tabs = getPairs("tab");
  obj.sort = getValue("sort"); // TODO: breaks with custom names

  if (obj.sort === "default") obj.sort = getValue("tab");
  obj.uniqueByContent = !!isPresent("unique by content");
  obj.curators = getValues("curator");
  obj.moderators = getValues("mod");
  obj.includeRanks = !!isPresent("show ranks");
  obj.stickyIds = getValues("sticky");

  obj.isIdSticky = id => !!tokenized.isPresent(["sticky", id]);

  obj.isChat = !!isPresent("display as chat");
  obj.submitTopics = getValues("submit to");
  obj.submitTopic = getValue("submit to");
  obj.chatTopic = getValue("chat in");

  if (ownerId && spaceName) {
    obj.spaceName = spaceName;
    obj.owner = ownerId;
    obj.useForComments = !tokenized.isPresent("comments leave space");
    obj.basePath = `/user/${ownerId}/spaces/${spaceName}`;
    if (obj.submitTopic) obj.submitPath = `${obj.basePath}/submit`;
    obj.defaultTab = tokenized.getValue("tab");
    obj.defaultTabPath = obj.defaultTab ? tokenized.getValue(["tab", obj.defaultTab]) : null;
  }

  obj.filters = {
    functions: [],
    allow: {
      repliesTo: getValue("replies to author"),
      type: getValue("type"),
      // TODO: this field seems redundant with kind and should be deprecated
      ops: getValues("op"),
      aliases: getValues("alias"),
      authors: getValues("author"),
      domains: getValues("domain"),
      topics: getValues("topic"),
      listings: getValues("listing"),
      kinds: getValues("kind"),
      anon: !isPresent("require signed"),
      signed: !isPresent("require anon")
    },
    deny: {
      aliases: getValues("ban alias"),
      authors: getValues("ban author"),
      domains: getValues("ban domain"),
      topics: getValues("ban topic"),
      anon: !!isPresent("require signed"),
      signed: !!isPresent("require anon"),
      tags: getPairs("can remove")
    }
  };
  obj.voteFilters = {
    functions: [],
    upsMin: parseInt(getValue("ups above"), 10) || null,
    upsMax: parseInt(getValue("ups below"), 10) || null,
    downsMin: parseInt(getValue("downs above"), 10) || null,
    downsMax: parseInt(getValue("downs below"), 10) || null,
    scoreMin: parseInt(getValue("score above"), 10) || null,
    scoreMax: parseInt(getValue("score below"), 10) || null
  };
  obj.censors = R.uniq(R.map(R.prop(1), obj.filters.deny.tags));
  return obj;
};

const ListingDefinition = {
  fromSource
};
exports.ListingDefinition = ListingDefinition;

/***/ }),

/***/ "./src/Listing/ListingFilter.js":
/*!**************************************!*\
  !*** ./src/Listing/ListingFilter.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingFilter = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _Constants = __webpack_require__(/*! ../Constants */ "./src/Constants.js");

var _Schema = __webpack_require__(/*! ../Schema */ "./src/Schema.js");

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

var _Thing = __webpack_require__(/*! ../Thing */ "./src/Thing/index.js");

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const intPath = p => R.compose(parseInt, R.path(p));

const fromDefinition = definition => {
  const {
    filters,
    voteFilters,
    isPresent
  } = definition;
  const filterFunctions = [];
  const voteFilterFunctions = [];

  const addFilter = (...fns) => filterFunctions.push(R.compose(...fns));

  const addVoteFilter = (...fns) => voteFilterFunctions.push(R.compose(...fns));

  if (filters.allow.aliases.length) addFilter(t => !!isPresent(["alias", t]), R.path(["data", "author"]));
  if (filters.allow.authors.length) addFilter(t => !!isPresent(["author", t]), R.path(["data", "authorId"]));
  if (filters.allow.domains.length) addFilter(t => !!isPresent(["domain", t]), _Thing.ThingDataNode.domain, R.prop("data"));
  if (filters.allow.topics.length && !R.find(R.compose(R.identical("all"), R.last, R.split(":")), filters.allow.topics)) addFilter(item => {
    let topic = R.path(["data", "topic"], item);
    const kind = R.path(["data", "kind"], item);
    if (kind === "chatmsg") topic = `chat:${topic}`;
    if (kind === "comment") topic = `comments:${topic}`;
    return !!isPresent(["topic", topic]);
  });
  if (filters.allow.kinds.length) addFilter(kind => !!isPresent(["kind", kind]), R.path(["data", "kind"]));
  if (filters.allow.type === "commands") addFilter(R.compose(R.test(_Constants.Constants.COMMAND_RE), R.path(["data", "body"])));
  if (filters.deny.aliases.length) addFilter(alias => !isPresent(["ban", "alias", alias]), R.path(["data", "author"]));
  if (filters.deny.authors.length) addFilter(authorId => !isPresent(["ban", "author", authorId]), R.path(["data", "authorId"]));
  if (filters.deny.domains.length) addFilter(domain => !domain || !isPresent(["ban", "domain", domain]), _Thing.ThingDataNode.domain);
  if (filters.deny.topics.length) addFilter(topic => !isPresent(["ban", "topic", topic]), R.path(["data", "topic"]));
  if (filters.deny.anon) addFilter(R.path(["data", "authorId"]));
  if (filters.deny.signed) addFilter(R.compose(authorId => !authorId, R.path(["data", "authorId"])));
  if (voteFilters.upsMin !== null) addVoteFilter(R.lte(voteFilters.upsMin), intPath(["votes", "up"]));
  if (voteFilters.upsMax !== null) addVoteFilter(R.gte(voteFilters.upsMax), intPath(["votes", "up"]));
  if (voteFilters.downsMin !== null) addVoteFilter(R.lte(voteFilters.downsMin), intPath(["votes", "down"]));
  if (voteFilters.downsMax !== null) addVoteFilter(R.gte(voteFilters.downsMax), intPath(["votes", "down"]));
  if (voteFilters.scoreMin !== null) addVoteFilter(R.lte(voteFilters.scoreMin), intPath(["votes", "score"]));
  if (voteFilters.scoreMax !== null) addVoteFilter(R.gte(voteFilters.scoreMax), intPath(["votes", "score"]));
  if (filters.deny.tags.length) addVoteFilter(thing => {
    const cmds = R.path(["votes", "commands"], thing) || {};
    return !filters.deny.tags.find(([tagName, authorId]) => !!R.path([authorId, "tag", tagName], cmds));
  });

  const contentFilter = thing => !filterFunctions.find(fn => !fn(thing));

  const voteFilter = thing => !voteFilterFunctions.find(fn => !fn(thing));

  const thingFilter = thing => definition.isIdSticky(R.prop("id", thing)) || contentFilter(thing) && voteFilter(thing);

  return {
    thingFilter,
    contentFilter,
    voteFilter
  };
};

const getFilteredRows = async (scope, spec, sortedRows, {
  limit: limitProp = 25,
  count: countProp = 0,
  after = null,
  filterFn
} = {}) => {
  const limit = parseInt(limitProp, 10);
  const count = parseInt(countProp, 10) || 0;
  const rows = sortedRows.slice();
  const filtered = [];

  const fetchBatch = (size = 30) => Promise.all(R.map(async row => {
    let inListing = true;

    if (!row[_ListingNode.ListingNode.POS_ID]) {
      console.log("blankRow", row);
      return;
    }

    if (filterFn) inListing = await filterFn(row[_ListingNode.ListingNode.POS_ID]);
    if (inListing) filtered.push(row);
  }, rows.splice(count, size)));

  while (rows.length > count) {
    await fetchBatch();
    if (limit && filtered.length >= limit) break;
  }

  return R.compose(limit ? R.slice(0, limit) : R.identity, R.sortBy(R.prop(_ListingNode.ListingNode.POS_VAL)))(filtered);
};

const getFilteredIds = R.compose(x => x.then(R.map(R.prop(_ListingNode.ListingNode.POS_ID))), getFilteredRows);
const thingFilter = R.curry((scope, spec, thingId) => _Query.Query.thingMeta(scope, {
  tabulator: spec.tabulator,
  thingSoul: _Schema.Schema.Thing.route.reverse({
    thingId
  }),
  scores: _ListingDataSource.ListingDataSource.needsScores(spec),
  data: _ListingDataSource.ListingDataSource.needsData(spec)
}).then(spec.thingFilter));
const ListingFilter = {
  fromDefinition,
  getFilteredRows,
  getFilteredIds,
  thingFilter
};
exports.ListingFilter = ListingFilter;

/***/ }),

/***/ "./src/Listing/ListingNode.js":
/*!************************************!*\
  !*** ./src/Listing/ListingNode.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingNode = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Constants = __webpack_require__(/*! ../Constants */ "./src/Constants.js");

var _Config = __webpack_require__(/*! ../Config */ "./src/Config.js");

var _Schema = __webpack_require__(/*! ../Schema */ "./src/Schema.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const [POS_IDX, POS_ID, POS_VAL] = [0, 1, 2, 3]; // eslint-disable-line no-unused-vars

const rowsToIds = R.map(R.prop(POS_ID));
const rowsToItems = R.map(R.slice(1, 3));
const source = R.propOr("", "source");
const soulFromPath = R.curry((indexer, path) => `${_Constants.Constants.PREFIX}${path}@~${indexer}.`);
const pathFromSoul = R.compose(R.replace(new RegExp(`^${_Constants.Constants.PREFIX}`), ""), R.replace(/@~.*\./, ""));

const idToSoul = thingId => _Schema.Schema.Thing.route.reverse({
  thingId
});

const idsToSouls = R.map(idToSoul);

const soulToId = soul => R.prop("thingId", _Schema.Schema.Thing.route.match(soul));

const soulsToIds = R.map(soulToId);
const getRow = R.curry((node, idx) => R.compose(R.ifElse(R.prop("length"), R.insert(0, parseInt(idx, 10)), R.always(null)), row => {
  row[1] = parseFloat(row[1]);
  return row;
}, R.map(R.trim), R.split(","), R.propOr("", `${idx}`))(node));
const itemKeys = R.compose(R.filter(R.compose(val => !!(val === 0 || val), parseInt)), R.keys);
const serialize = R.curry((spec, items) => R.compose(R.addIndex(R.reduce)((res, row, idx) => R.assoc(`${idx}`, row.join(","), res), {}), R.defaultTo([]))(items));

const rows = node => R.compose(R.map(getRow(node)), itemKeys)(node);

const ids = R.compose(rowsToIds, rows);
const sortRows = R.sortWith([R.ascend(R.compose(R.cond([[R.isNil, R.always(Infinity)], [R.T, parseFloat]]), R.prop(POS_VAL)))]);
const sortedIds = R.compose(R.map(R.prop(POS_ID)), sortRows, R.filter(R.identity), rows);
const itemsToRows = R.addIndex(R.map)((item, idx) => [idx, ...item]);

const diff = async (node, updatedItems = [], removeIds = [], {
  maxSize = 1000
} = {}) => {
  const removed = R.indexBy(R.identity, removeIds);
  const byId = {};
  const changes = {};
  const rows = [];
  const updated = {};
  let toReplace = [];
  let maxIdx = 0;
  let key;

  for (key in node || {}) {
    const parsed = parseInt(key, 10);
    if (!(parsed || parsed === 0)) continue;
    const row = getRow(node, key) || [parsed, null, null];
    const [idx, id = null, rawValue = null] = row; // eslint-disable-line no-unused-vars

    row[POS_VAL] = rawValue === null ? null : parseFloat(rawValue);
    if (id && removed[id]) row[POS_ID] = row[POS_VAL] = null;
    if (id) byId[id] = row;

    if (row[POS_ID]) {
      rows.push(row);
    } else {
      toReplace.push(row);
    }

    if (idx > maxIdx) maxIdx = idx;
  }

  for (let i = 0; i < updatedItems.length; i++) {
    const [id, value] = updatedItems[i] || [null, null];
    if (!id) continue;
    const existing = byId[id];

    if (existing) {
      if (existing[POS_VAL] !== value) {
        existing[POS_VAL] = value;
        updated[id] = true;
      }
    } else {
      const row = [null, id, value];
      rows.push(row);
    }
  }

  const allSorted = sortRows(rows);
  const sorted = maxSize ? allSorted.slice(0, maxSize) : allSorted;
  const missing = maxSize ? allSorted.slice(maxSize, allSorted.length) : [];
  const added = R.filter(row => row[POS_IDX] === null, sorted);
  toReplace = toReplace.concat(R.filter(row => row[POS_IDX] !== null, missing)).reverse();

  for (let i = 0; i < sorted.length; i++) {
    const id = sorted[i][POS_ID];
    const idx = sorted[i][POS_IDX];
    const val = sorted[i][POS_VAL];
    if (idx !== null && updated[id]) changes[`${idx}`] = [id, val].join(",");
  }

  const inserted = [];

  while (added.length) {
    const row = added.pop();
    const replaced = toReplace.pop();
    let [idx] = replaced || [null];

    if (idx === null) {
      idx = parseInt(maxIdx, 10) + inserted.length + 1;
      inserted.push(idx);
    }

    changes[`${idx}`] = [row[POS_ID], row[POS_VAL]].join(",");
  }

  while (toReplace.length) {
    const row = toReplace.pop();

    if (row && !row[POS_ID]) {
      const idx = `${row[POS_IDX]}`;

      if (node[idx] !== null) {
        changes[idx] = null;
        console.log("nulling", idx, node[idx]);
      }
    }
  }

  return R.keys(changes).length ? changes : null;
};

const categorizeDiff = (diff, original) => {
  const allKeys = itemKeys(R.mergeLeft(diff, original));
  const added = [];
  const removed = [];

  for (let i = 0; i < allKeys.length; i++) {
    const key = allKeys[i];
    const [_diffIdx, diffId] = getRow(diff, key) || []; // eslint-disable-line no-unused-vars

    const [_origIdx, origId] = getRow(original, key); // eslint-disable-line no-unused-vars

    if (diffId !== origId) {
      if (diffId) added.push(diffId);
      if (origId) removed.push(origId);
    }
  }

  return [added, removed];
};

const unionRows = R.compose(R.uniqBy(R.prop(POS_ID)), sortRows, R.reduce(R.concat, []), R.map(rows));
const rowsFromSouls = (0, _gunScope.query)((scope, souls) => Promise.all(R.map(scope.get, souls)).then(unionRows));
const read = (0, _gunScope.query)((scope, path, opts) => {
  const {
    indexer = _Config.Config.indexer
  } = opts || {};
  return rowsFromSouls(scope, [soulFromPath(indexer, path)]).then(rowsToIds);
}, "listingRows");
const get = (0, _gunScope.query)((scope, soul) => soul ? scope.get(soul) : (0, _gunScope.resolve)(null), "listing");
const ListingNode = {
  POS_IDX,
  POS_ID,
  POS_VAL,
  source,
  get,
  getRow,
  itemKeys,
  serialize,
  rows,
  ids,
  idToSoul,
  idsToSouls,
  soulToId,
  soulsToIds,
  rowsToIds,
  rowsToItems,
  itemsToRows,
  sortRows,
  sortedIds,
  soulFromPath,
  pathFromSoul,
  rowsFromSouls,
  read,
  diff,
  categorizeDiff,
  unionRows
};
exports.ListingNode = ListingNode;

/***/ }),

/***/ "./src/Listing/ListingOracle.js":
/*!**************************************!*\
  !*** ./src/Listing/ListingOracle.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingOracle = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _GunNode = __webpack_require__(/*! ../GunNode */ "./src/GunNode.js");

var _Schema = __webpack_require__(/*! ../Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ../Thing */ "./src/Thing/index.js");

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

var _ListingSort = __webpack_require__(/*! ./ListingSort */ "./src/Listing/ListingSort.js");

var _ListingType = __webpack_require__(/*! ./ListingType */ "./src/Listing/ListingType/index.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const updateListing = async (orc, route, scope, spec, ids = [], removeIds = []) => {
  if (!ids.length && !removeIds.length) return;
  const existing = await orc.newScope().get(route.soul);
  const updatedItems = await _ListingSort.ListingSort.toItems(scope, ids, spec);
  const changes = await _ListingNode.ListingNode.diff(existing, updatedItems, removeIds);
  if (changes) console.log("CHANGES", route.soul, changes);
  if (changes) route.write(changes);
};

const onPut = async (orc, route, {
  soul,
  updatedSoul,
  diff,
  ...props
}) => {
  let updatedIds = [];

  const path = _ListingNode.ListingNode.pathFromSoul(soul);

  const scope = orc.newScope();
  const spec = await _ListingType.ListingType.specFromPath(scope, path);
  const {
    thingId
  } = _Schema.Schema.ThingVoteCounts.route.match(updatedSoul) || {};
  const isSticky = R.equals(route.match.thingId || null);
  if (thingId) updatedIds.push(thingId);
  updatedIds = R.concat(updatedIds, _Thing.ThingSet.ids(_GunNode.GunNode.decodeSEA(diff)));
  await updateListing(orc, route, scope, spec, updatedIds, [], isSticky);

  for (const key in scope.getAccesses()) orc.listen(key, route.soul);
};

const ListingOracle = {
  updateListing,
  onPut
};
exports.ListingOracle = ListingOracle;

/***/ }),

/***/ "./src/Listing/ListingQuery.js":
/*!*************************************!*\
  !*** ./src/Listing/ListingQuery.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingQuery = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Constants = __webpack_require__(/*! ../Constants */ "./src/Constants.js");

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

var _ListingType = __webpack_require__(/*! ./ListingType */ "./src/Listing/ListingType/index.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const calculateRows = (0, _gunScope.query)((scope, spec, opts = {}) => {
  const filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

  const stickyItems = R.map(id => [id, -Infinity], spec.stickyIds);
  if (!spec.dataSource.query) return (0, _gunScope.resolve)([]);
  return spec.dataSource.query(scope).then(items => {
    const rows = _ListingNode.ListingNode.itemsToRows([...stickyItems, ...items]);

    return _ListingFilter.ListingFilter.getFilteredRows(scope, spec, rows, { ...opts,
      filterFn
    });
  });
});
const calculate = (0, _gunScope.query)((scope, spec, opts = {}) => {});
const toNode = (0, _gunScope.query)((scope, spec, opts) => calculateRows(scope, spec, opts).then(R.compose(_ListingNode.ListingNode.serialize(spec), _ListingNode.ListingNode.rowsToItems)));
const read = (0, _gunScope.query)((scope, spec, opts = {}) => {
  const filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

  const paths = R.pathOr([], ["dataSource", "listingPaths"], spec);
  const stickyRows = R.map(id => [-1, id, -Infinity], spec.stickyIds);
  const souls = R.map(_ListingNode.ListingNode.soulFromPath(opts.indexer || spec.indexer), paths);
  return _ListingNode.ListingNode.rowsFromSouls(scope, souls).then(rows => _ListingFilter.ListingFilter.getFilteredIds(scope, spec, [...stickyRows, ...rows], { ...opts,
    filterFn
  }));
});
const fromSpec = (0, _gunScope.query)((scope, spec, opts = {}) => (opts.calculate ? calculate : read)(scope, spec, opts));
const fromPath = (0, _gunScope.query)((scope, path, opts) => {
  const type = _ListingType.ListingType.fromPath(path);

  if (!type) return Promise.resolve([]);
  return type.getSpec(scope, type.match).then(spec => {
    if (spec.hasIndexer && !opts.calculate) {
      if (!type || !type.read) return _ListingNode.ListingNode.read(scope, path, opts);
      return type.read(scope, type.match, opts);
    }

    return fromSpec(scope, spec, opts);
  });
});
const nodeFromPath = (0, _gunScope.query)((scope, path, opts) => _ListingType.ListingType.specFromPath(scope, path).then(spec => toNode(scope, spec, R.mergeLeft(opts, {
  limit: _Constants.Constants.LISTING_SIZE
}))));
const ListingQuery = {
  fromSpec,
  fromPath,
  calculateRows,
  toNode,
  nodeFromPath
};
exports.ListingQuery = ListingQuery;

/***/ }),

/***/ "./src/Listing/ListingSort.js":
/*!************************************!*\
  !*** ./src/Listing/ListingSort.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingSort = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Schema = __webpack_require__(/*! ../Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ../Thing */ "./src/Thing/index.js");

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const [POS_ID, POS_VAL] = [0, 1];
const toIds = R.map(R.prop(POS_ID));
const sortItems = R.sortBy(R.prop(POS_VAL));

const voteSort = fn => (0, _gunScope.query)((scope, thingId, spec) => {
  if (spec.isIdSticky(thingId)) return (0, _gunScope.resolve)(-Infinity);
  if (R.contains(thingId, spec.filters.allow.ops)) return (0, _gunScope.resolve)(-Infinity);
  return _Query.Query.thingMeta(scope, {
    tabulator: spec.tabulator,
    scores: true,
    thingSoul: _Schema.Schema.Thing.route.reverse({
      thingId
    })
  }).then(res => fn(res, spec));
});

const timeSort = fn => (0, _gunScope.query)((scope, thingId, spec) => _Query.Query.thingMeta(scope, {
  tabulator: spec.tabulator,
  thingSoul: _Schema.Schema.Thing.route.reverse({
    thingId
  })
}).then(fn));

const sorts = {
  new: timeSort(R.compose(R.multiply(-1), R.defaultTo(0), R.prop("timestamp"))),
  old: timeSort(R.prop("timestamp")),
  active: voteSort(({
    timestamp,
    lastActive
  }) => -1 * (lastActive || timestamp)),
  top: voteSort(R.compose(x => -1 * parseInt(x, 10), R.pathOr(0, ["votes", "score"]))),
  comments: voteSort(R.compose(x => -1 * parseFloat(x, 10), R.pathOr(0, ["votes", "comment"]))),
  discussed: voteSort(thing => {
    const timestamp = R.prop("timestamp", thing);
    const score = parseInt(R.pathOr(0, ["votes", "comment"], thing), 10);
    const seconds = timestamp / 1000 - 1134028003;
    const order = Math.log10(Math.max(Math.abs(score), 1));
    if (!score) return 1000000000 - seconds;
    return -1 * (order + seconds / 45000);
  }),
  hot: voteSort(thing => {
    const timestamp = R.prop("timestamp", thing);
    const score = parseInt(R.pathOr(0, ["votes", "score"], thing), 10);
    const seconds = timestamp / 1000 - 1134028003;
    const order = Math.log10(Math.max(Math.abs(score), 1));
    let sign = 0;

    if (score > 0) {
      sign = 1;
    } else if (score < 0) {
      sign = -1;
    }

    return -1 * (sign * order + seconds / 45000);
  }),
  best: voteSort(thing => {
    const ups = parseInt(R.pathOr(0, ["votes", "up"], thing), 10);
    const downs = parseInt(R.pathOr(0, ["votes", "down"], thing), 10);
    const n = ups + downs;
    if (n === 0) return 0;
    const z = 1.281551565545; // 80% confidence

    const p = ups / n;
    const left = p + 1 / (2 * n) * z * z;
    const right = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n));
    const under = 1 + 1 / n * z * z;
    return -1 * ((left - right) / under);
  }),
  controversial: voteSort(thing => {
    const ups = parseInt(R.pathOr(0, ["votes", "up"], thing), 10);
    const downs = parseInt(R.pathOr(0, ["votes", "down"], thing), 10);
    if (ups <= 0 || downs <= 0) return 0;
    const magnitude = ups + downs;
    const balance = ups > downs ? downs / ups : ups / downs;
    return -1 * magnitude ** balance;
  })
};

const isValidSort = sort => !!sorts[sort];

const toItem = (0, _gunScope.query)((scope, id, spec) => (sorts[spec.sort] || sorts.new)(scope, id, spec).then(val => [id, val]));

const itemFromSoul = (scope, soul, spec) => toItem(scope, _ListingNode.ListingNode.soulToId(soul), spec);

const toItems = (0, _gunScope.query)((scope, ids, spec) => (0, _gunScope.all)(R.map(id => toItem(scope, id, spec), ids)));
const fromThingSets = (0, _gunScope.query)((scope, souls, spec) => (0, _gunScope.all)(R.map(scope.get, souls)).then(R.pipe(_Thing.ThingSet.union, _Thing.ThingSet.ids, ids => toItems(scope, ids, spec))).then(sortItems));
const ListingSort = {
  POS_ID,
  POS_VAL,
  sorts,
  isValidSort,
  toItem,
  toItems,
  toIds,
  itemFromSoul,
  sortItems,
  fromThingSets
};
exports.ListingSort = ListingSort;

/***/ }),

/***/ "./src/Listing/ListingSpec.js":
/*!************************************!*\
  !*** ./src/Listing/ListingSpec.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingSpec = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

var _Thing = __webpack_require__(/*! ../Thing */ "./src/Thing/index.js");

var _ListingDefinition = __webpack_require__(/*! ./ListingDefinition */ "./src/Listing/ListingDefinition.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const fromSource = R.compose(R.apply(R.mergeLeft), R.ap([_ListingFilter.ListingFilter.fromDefinition, R.identity]), R.of, R.apply(R.assoc("dataSource")), R.ap([_ListingDataSource.ListingDataSource.fromDefinition, R.identity]), R.of, _ListingDefinition.ListingDefinition.fromSource);
const getSource = (0, _gunScope.query)((scope, authorId, name, extra = "") => _Query.Query.wikiPage(scope, authorId, name).then(R.compose(body => `${body}
# added by indexer
${extra || ""}
sourced from page ${authorId} ${name}
`, _Thing.ThingDataNode.body)));
const ListingSpec = {
  fromSource,
  getSource
};
exports.ListingSpec = ListingSpec;

/***/ }),

/***/ "./src/Listing/ListingType/ChatListing.js":
/*!************************************************!*\
  !*** ./src/Listing/ListingType/ChatListing.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatListing = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

var _TopicListing = __webpack_require__(/*! ./TopicListing */ "./src/Listing/ListingType/TopicListing.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const path = "/t/:topic/chat";
const tabs = [..._TopicListing.TopicListing.tabs, "chat"];
const getSidebar = (0, _gunScope.query)((scope, {
  topic,
  sort
}) => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:chat:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  topic,
  sort
}) => {
  const normalTopics = _Path.Path.splitTopics(topic);

  const submitTo = topic === "all" ? "whatever" : normalTopics[0] || "whatever";
  const topics = normalTopics.reduce((res, topic) => [...res, `chat:${topic}`], []);
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:chat", ["sort new", "display as chat", `submit to ${submitTo}`, `sort ${sort}`, ...R.map(topic => `topic ${topic}`, topics), ...R.map(tab => `tab ${tab} /t/${topic}/${tab}`, tabs)].join("\n"));
});
const getSpec = (0, _gunScope.query)((scope, match) => getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource));

const ChatListing = _Path.Path.withRoute({
  path,
  getSidebar,
  getSource,
  getSpec
});

exports.ChatListing = ChatListing;

/***/ }),

/***/ "./src/Listing/ListingType/CommentListing.js":
/*!***************************************************!*\
  !*** ./src/Listing/ListingType/CommentListing.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentListing = void 0;

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

const path = "/things/:thingId/comments/:sort";
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:comments:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  thingId,
  sort
}) => _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:comments", [`op ${thingId}`, `sort ${sort}`].join("\n")));
const getSpec = (0, _gunScope.query)((scope, match) => getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource));

const CommentListing = _Path.Path.withRoute({
  path,
  getSidebar,
  getSource,
  getSpec
});

exports.CommentListing = CommentListing;

/***/ }),

/***/ "./src/Listing/ListingType/CommentedListing.js":
/*!*****************************************************!*\
  !*** ./src/Listing/ListingType/CommentedListing.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentedListing = void 0;

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

const path = "/user/:authorId/commented/:sort";
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:commented:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  authorId,
  sort
}) => _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:commented", [`curator ${authorId}`, `sort ${sort}`].join("\n")));
const getSpec = (0, _gunScope.query)((scope, match) => getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource));

const CommentedListing = _Path.Path.withRoute({
  path,
  getSidebar,
  getSource,
  getSpec
});

exports.CommentedListing = CommentedListing;

/***/ }),

/***/ "./src/Listing/ListingType/DomainListing.js":
/*!**************************************************!*\
  !*** ./src/Listing/ListingType/DomainListing.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomainListing = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const path = "/domain/:domain/:sort";
const tabs = ["hot", "new", "discussed", "controversial", "top"];
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:domain:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  domain,
  sort
}) => {
  const domains = _Path.Path.splitTopics(domain);

  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:domain", [`name ${domains[0]}`, "submit to whatever", `sort ${sort}`, "kind submission", ...R.map(domain => `domain ${domain}`, domains), ...R.map(tab => `tab ${tab} /domain/${domain}/${tab}`, tabs)].join("\n"));
});
const getSpec = (0, _gunScope.query)((scope, match) => getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource));

const DomainListing = _Path.Path.withRoute({
  path,
  tabs,
  getSidebar,
  getSource,
  getSpec
});

exports.DomainListing = DomainListing;

/***/ }),

/***/ "./src/Listing/ListingType/FirehoseListing.js":
/*!****************************************************!*\
  !*** ./src/Listing/ListingType/FirehoseListing.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirehoseListing = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

var _TopicListing = __webpack_require__(/*! ./TopicListing */ "./src/Listing/ListingType/TopicListing.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const path = "/t/:topic/firehose";
const tabs = _TopicListing.TopicListing.tabs;
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:firehose:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  topic,
  sort
}) => {
  const normalTopics = _Path.Path.splitTopics(topic);

  const submitTo = topic === "all" ? "whatever" : normalTopics[0] || "whatever";
  const topics = normalTopics.reduce((res, topic) => [...res, topic, `chat:${topic}`, `comments:${topic}`], []);
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:firehose", ["sort new", "display as chat", `submit to ${submitTo}`, `sort ${sort}`, ...R.map(topic => `topic ${topic}`, topics), ...R.map(tab => `tab ${tab} /t/${topic}/${tab}`, tabs)].join("\n"));
});
const getSpec = (0, _gunScope.query)((scope, match) => getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource));

const FirehoseListing = _Path.Path.withRoute({
  tabs,
  path,
  getSidebar,
  getSource,
  getSpec
});

exports.FirehoseListing = FirehoseListing;

/***/ }),

/***/ "./src/Listing/ListingType/InboxListing.js":
/*!*************************************************!*\
  !*** ./src/Listing/ListingType/InboxListing.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InboxListing = void 0;

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _GunNode = __webpack_require__(/*! ../../GunNode */ "./src/GunNode.js");

var _Schema = __webpack_require__(/*! ../../Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ../../Thing */ "./src/Thing/index.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

var _ListingNode = __webpack_require__(/*! ../ListingNode */ "./src/Listing/ListingNode.js");

var _ListingOracle = __webpack_require__(/*! ../ListingOracle */ "./src/Listing/ListingOracle.js");

const path = "/user/:authorId/replies/:type/:sort";
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:topic:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  authorId,
  type,
  sort = "new"
}) => _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:inbox", [`replies to author ${authorId}`, "kind comment", `type ${type}`, `sort ${sort}`].join("\n")));
const getSpec = (0, _gunScope.query)((scope, match) => getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource));

const onPut = async (orc, route, {
  updatedSoul,
  diff
}) => {
  const scope = orc.newScope();

  const diffData = _GunNode.GunNode.decodeSEA(diff);

  const [updatedAuthored] = _ListingNode.ListingNode.categorizeDiff(diffData);

  const spec = await getSpec(scope, route.match);

  let updatedIds = _Thing.ThingSet.ids(diffData);

  for (let i = 0; i < updatedAuthored.length; i++) {
    const opId = updatedAuthored[i];

    const replyIds = _Thing.ThingSet.ids((await scope.get(_Schema.Schema.ThingComments.route.reverse({
      thingId: opId
    })).then()));

    updatedIds = updatedIds.concat(replyIds);
  }

  if (updatedIds.length) await _ListingOracle.ListingOracle.updateListing(orc, route, scope, spec, updatedIds, []);

  for (const key in scope.getAccesses()) orc.listen(key, route.soul);
};

const InboxListing = _Path.Path.withRoute({
  path,
  getSidebar,
  getSource,
  getSpec,
  onPut
});

exports.InboxListing = InboxListing;

/***/ }),

/***/ "./src/Listing/ListingType/ProfileListing.js":
/*!***************************************************!*\
  !*** ./src/Listing/ListingType/ProfileListing.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileListing = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const path = "/user/:authorId/:type/:sort";
const tabs = ["overview", "comments", "submitted", "commands"];
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:profile:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  authorId,
  type,
  sort
}) => _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:profile", [`author ${authorId}`, `type ${type}`, `sort ${sort}`, ...R.map(tab => `tab ${tab} /user/${authorId}/${tab}`, tabs)].join("\n")));
const getSpec = (0, _gunScope.query)((scope, match) => _Query.Query.userMeta(scope, match.authorId).then(meta => getSource(scope, match).then(R.pipe(_ListingSpec.ListingSpec.fromSource, R.mergeLeft({
  profileId: match.authorId,
  displayName: R.propOr("", "alias", meta)
})))));

const ProfileListing = _Path.Path.withRoute({
  path,
  tabs,
  getSidebar,
  getSource,
  getSpec
});

exports.ProfileListing = ProfileListing;

/***/ }),

/***/ "./src/Listing/ListingType/SpaceListing.js":
/*!*************************************************!*\
  !*** ./src/Listing/ListingType/SpaceListing.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceListing = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Schema = __webpack_require__(/*! ../../Schema */ "./src/Schema.js");

var _GunNode = __webpack_require__(/*! ../../GunNode */ "./src/GunNode.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingNode = __webpack_require__(/*! ../ListingNode */ "./src/Listing/ListingNode.js");

var _ListingOracle = __webpack_require__(/*! ../ListingOracle */ "./src/Listing/ListingOracle.js");

var _SpaceSpec = __webpack_require__(/*! ../SpaceSpec */ "./src/Listing/SpaceSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const path = "/user/:authorId/spaces/:name/:sort";
const getSource = (0, _gunScope.query)((scope, {
  authorId,
  name,
  sort
}) => _SpaceSpec.SpaceSpec.getSource(scope, authorId, name, `sort ${sort}`));
const getSpec = (0, _gunScope.query)((scope, {
  authorId,
  name,
  sort
}) => _SpaceSpec.SpaceSpec.getSpec(scope, authorId, name, `sort ${sort}`));
const getSidebar = (0, _gunScope.query)((scope, {
  authorId,
  name,
  sort
}) => _Query.Query.wikiPage(scope, authorId, _SpaceSpec.SpaceSpec.sidebarPageName(name)));

const onPut = async (orc, route, {
  updatedSoul,
  diff,
  original,
  latest = 0
}) => {
  const scope = orc.newScope();

  const originalData = _GunNode.GunNode.decodeSEA(original);

  const diffData = _GunNode.GunNode.decodeSEA(diff);

  const [updatedIds, removedIds] = _ListingNode.ListingNode.categorizeDiff(diffData, originalData);

  const spec = await getSpec(scope, route.match);

  const voteCountsMatch = _Schema.Schema.ThingVoteCounts.route.match(updatedSoul);

  const thingMatch = _Schema.Schema.Thing.route.match(updatedSoul);

  const {
    thingId
  } = _Schema.Schema.ThingDataSigned.route.match(updatedSoul) || {};

  const authorMatch = _Schema.Schema.SEAAuthor.route.match(updatedSoul);

  if (voteCountsMatch) updatedIds.push(voteCountsMatch.thingId);
  if (thingMatch) updatedIds.push(thingMatch.thingId);
  if (thingId && thingId !== spec.fromPageId) updatedIds.push(thingId);
  await _ListingOracle.ListingOracle.updateListing(orc, route, scope, spec, updatedIds, removedIds);

  for (const key in scope.getAccesses()) orc.listen(key, route.soul);

  if (R.prop("size", original) || updatedIds.length || removedIds.length || authorMatch) return; // base logic from gun-cleric-scope needs to be encapsualted better?

  console.log("---STANDARD SPACE UPDATE---", route.soul, updatedSoul);
  const node = await orc.newScope().get(route.soul);

  const existingKeys = _ListingNode.ListingNode.itemKeys(node);

  if (existingKeys.length) {
    route.write({
      size: 0,
      ...existingKeys.reduce((diff, key) => {
        diff[`${key}`] = null;
        return diff;
      }, {})
    });
  }

  orc.work({
    id: `update:${route.soul}`,
    soul: route.soul,
    method: "doUpdate",
    priority: route.priority || 50
  });
};

const SpaceListing = _Path.Path.withRoute({
  path,
  getSource,
  getSidebar,
  getSpec,
  onPut
});

exports.SpaceListing = SpaceListing;

/***/ }),

/***/ "./src/Listing/ListingType/TopicListing.js":
/*!*************************************************!*\
  !*** ./src/Listing/ListingType/TopicListing.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopicListing = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const path = "/t/:topic/:sort";
const tabs = ["hot", "new", "discussed", "controversial", "top", "firehose"];
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:topic:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  topic,
  sort
}) => {
  const topics = _Path.Path.splitTopics(topic);

  const submitTo = topics[0] === "all" ? "whatever" : topics[0];
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:topic", [`name ${topic}`, `submit to ${submitTo}`, `sort ${sort}`, topic.indexOf(":") === -1 ? "kind submission" : "", ...R.map(topic => `topic ${topic}`, topics), ...R.map(tab => `tab ${tab} /t/${topic}/${tab}`, tabs)].join("\n"));
});
const getSpec = (0, _gunScope.query)((scope, match) => getSource(scope, match).then(R.pipe(_ListingSpec.ListingSpec.fromSource, R.assoc("basePath", `/t/${match.topic}`))));

const TopicListing = _Path.Path.withRoute({
  tabs,
  path,
  getSidebar,
  getSource,
  getSpec
});

exports.TopicListing = TopicListing;

/***/ }),

/***/ "./src/Listing/ListingType/index.js":
/*!******************************************!*\
  !*** ./src/Listing/ListingType/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListingType = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _ChatListing = __webpack_require__(/*! ./ChatListing */ "./src/Listing/ListingType/ChatListing.js");

var _FirehoseListing = __webpack_require__(/*! ./FirehoseListing */ "./src/Listing/ListingType/FirehoseListing.js");

var _CommentedListing = __webpack_require__(/*! ./CommentedListing */ "./src/Listing/ListingType/CommentedListing.js");

var _TopicListing = __webpack_require__(/*! ./TopicListing */ "./src/Listing/ListingType/TopicListing.js");

var _DomainListing = __webpack_require__(/*! ./DomainListing */ "./src/Listing/ListingType/DomainListing.js");

var _CommentListing = __webpack_require__(/*! ./CommentListing */ "./src/Listing/ListingType/CommentListing.js");

var _SpaceListing = __webpack_require__(/*! ./SpaceListing */ "./src/Listing/ListingType/SpaceListing.js");

var _InboxListing = __webpack_require__(/*! ./InboxListing */ "./src/Listing/ListingType/InboxListing.js");

var _ProfileListing = __webpack_require__(/*! ./ProfileListing */ "./src/Listing/ListingType/ProfileListing.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const types = {
  ChatListing: _ChatListing.ChatListing,
  FirehoseListing: _FirehoseListing.FirehoseListing,
  TopicListing: _TopicListing.TopicListing,
  DomainListing: _DomainListing.DomainListing,
  CommentListing: _CommentListing.CommentListing,
  SpaceListing: _SpaceListing.SpaceListing,
  InboxListing: _InboxListing.InboxListing,
  CommentedListing: _CommentedListing.CommentedListing,
  ProfileListing: _ProfileListing.ProfileListing
};
const typesArray = R.values(types);

const fromPath = path => {
  let match;

  for (let i = 0; i < typesArray.length; i++) {
    match = typesArray[i].route.match(path);
    if (match) return R.assoc("match", match, typesArray[i]);
  }

  return null;
};

const sidebarFromPath = (0, _gunScope.query)((scope, path) => {
  const type = fromPath(path);
  if (!type || !type.getSidebar) return (0, _gunScope.resolve)("");
  return type.getSidebar(scope, type.match);
});
const specFromPath = (0, _gunScope.query)((scope, path) => {
  const type = fromPath(path);
  if (!type) throw new Error(`Can't find type for path: ${path}`);
  return type.getSpec(scope, type.match).then(baseSpec => {
    let spec = baseSpec;

    if (type.match.sort === "default") {
      spec = R.assoc("path", type.route.reverse(R.assoc("sort", spec.sort, type.match)), spec);
    } else {
      spec = R.assoc("path", path, baseSpec);
    }

    if (spec.submitTopic && !spec.submitPath) {
      spec = R.assoc("submitPath", `/t/${spec.submitTopic}/submit`, spec);
    }

    return spec;
  });
});
const ListingType = { ...types,
  types,
  fromPath,
  sidebarFromPath,
  specFromPath
};
exports.ListingType = ListingType;

/***/ }),

/***/ "./src/Listing/Path.js":
/*!*****************************!*\
  !*** ./src/Listing/Path.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _routeParser = _interopRequireDefault(__webpack_require__(/*! route-parser */ "route-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const splitDomains = R.compose(R.sortBy(R.identity), R.filter(R.identity), R.map(R.trim), R.split("+"), R.toLower, R.trim, R.defaultTo(""));
const splitTopics = R.compose(R.ifElse(R.prop("length"), R.identity, R.always(["all"])), splitDomains);

const withRoute = obj => R.assoc("route", new _routeParser.default(obj.path), obj);

const Path = {
  splitDomains,
  splitTopics,
  withRoute
};
exports.Path = Path;

/***/ }),

/***/ "./src/Listing/SpaceSpec.js":
/*!**********************************!*\
  !*** ./src/Listing/SpaceSpec.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceSpec = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ../Config */ "./src/Config.js");

var _Tokenizer = __webpack_require__(/*! ../Tokenizer */ "./src/Tokenizer.js");

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

var _ListingSpec = __webpack_require__(/*! ./ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const tabs = ["hot", "new", "discussed", "controversial", "top"];

const configPageName = name => `space:${name}`;

const sidebarPageName = name => `space:${name}:sidebar`;

const sourceWithDefaults = R.curry((ownerId, name, source) => {
  let result = [source || ""];

  const tokenized = _Tokenizer.Tokenizer.tokenize(source);

  if (!tokenized.getValue("tab")) {
    tabs.map(tab => result.push(`tab ${tab} /user/${ownerId}/spaces/${name}/${tab}`));
  }

  let indexer = tokenized.getValue("indexer");

  if (!indexer) {
    result.push(`indexer ${_Config.Config.indexer}`);
    indexer = _Config.Config.indexer;
  }

  let tabulator = tokenized.getValue("tabulator");
  if (!tabulator) result.push(`tabulator ${indexer}`);
  return result.join("\n");
});
const getSource = (0, _gunScope.query)((scope, authorId, name, extra) => _ListingSpec.ListingSpec.getSource(scope, authorId, configPageName(name), extra).then(sourceWithDefaults(authorId, name)));
const getSpec = (0, _gunScope.query)((scope, authorId, name, extra) => getSource(scope, authorId, name, extra).then(source => _ListingSpec.ListingSpec.fromSource(source, authorId, name)));
const nodeToSpaceNames = R.compose(R.sortBy(R.identity), R.map(R.replace(/^space:/, "")), R.filter(R.compose(R.prop("length"), R.match(/^space:[^:]*$/))), R.keys);
const userSpaceNames = (0, _gunScope.query)((scope, authorId) => _Query.Query.userPages(scope, authorId).then(nodeToSpaceNames));
const SpaceSpec = {
  configPageName,
  sidebarPageName,
  nodeToSpaceNames,
  userSpaceNames,
  tabs,
  getSource,
  getSpec
};
exports.SpaceSpec = SpaceSpec;

/***/ }),

/***/ "./src/Listing/index.js":
/*!******************************!*\
  !*** ./src/Listing/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ListingQuery", {
  enumerable: true,
  get: function () {
    return _ListingQuery.ListingQuery;
  }
});
Object.defineProperty(exports, "ListingNode", {
  enumerable: true,
  get: function () {
    return _ListingNode.ListingNode;
  }
});
Object.defineProperty(exports, "ListingSpec", {
  enumerable: true,
  get: function () {
    return _ListingSpec.ListingSpec;
  }
});
Object.defineProperty(exports, "ListingSort", {
  enumerable: true,
  get: function () {
    return _ListingSort.ListingSort;
  }
});
Object.defineProperty(exports, "ListingType", {
  enumerable: true,
  get: function () {
    return _ListingType.ListingType;
  }
});
Object.defineProperty(exports, "ListingDataSource", {
  enumerable: true,
  get: function () {
    return _ListingDataSource.ListingDataSource;
  }
});
Object.defineProperty(exports, "ListingDefinition", {
  enumerable: true,
  get: function () {
    return _ListingDefinition.ListingDefinition;
  }
});
Object.defineProperty(exports, "ListingFilter", {
  enumerable: true,
  get: function () {
    return _ListingFilter.ListingFilter;
  }
});
Object.defineProperty(exports, "ListingOracle", {
  enumerable: true,
  get: function () {
    return _ListingOracle.ListingOracle;
  }
});
Object.defineProperty(exports, "SpaceSpec", {
  enumerable: true,
  get: function () {
    return _SpaceSpec.SpaceSpec;
  }
});
exports.Listing = void 0;

var _ListingQuery = __webpack_require__(/*! ./ListingQuery */ "./src/Listing/ListingQuery.js");

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

var _ListingSpec = __webpack_require__(/*! ./ListingSpec */ "./src/Listing/ListingSpec.js");

var _ListingSort = __webpack_require__(/*! ./ListingSort */ "./src/Listing/ListingSort.js");

var _ListingType = __webpack_require__(/*! ./ListingType */ "./src/Listing/ListingType/index.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

var _ListingDefinition = __webpack_require__(/*! ./ListingDefinition */ "./src/Listing/ListingDefinition.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

var _ListingOracle = __webpack_require__(/*! ./ListingOracle */ "./src/Listing/ListingOracle.js");

var _SpaceSpec = __webpack_require__(/*! ./SpaceSpec */ "./src/Listing/SpaceSpec.js");

const Listing = { ..._ListingType.ListingType.types,
  ListingNode: _ListingNode.ListingNode,
  ListingSpec: _ListingSpec.ListingSpec,
  isValidSort: _ListingSort.ListingSort.isValidSort,
  idsToSouls: _ListingNode.ListingNode.idsToSouls,
  get: _ListingNode.ListingNode.get,
  fromSpec: _ListingQuery.ListingQuery.fromSpec,
  fromPath: _ListingQuery.ListingQuery.fromPath,
  typeFromPath: _ListingType.ListingType.fromPath,
  sidebarFromPath: _ListingType.ListingType.sidebarFromPath,
  specFromPath: _ListingType.ListingType.specFromPath,
  nodeFromPath: _ListingQuery.ListingQuery.nodeFromPath
};
exports.Listing = Listing;

/***/ }),

/***/ "./src/Page.js":
/*!*********************!*\
  !*** ./src/Page.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _queryString = _interopRequireDefault(__webpack_require__(/*! query-string */ "query-string"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ./Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ./Query */ "./src/Query.js");

var _Listing = __webpack_require__(/*! ./Listing */ "./src/Listing/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const wikiPage = R.mergeLeft({
  withMatch: ({
    params: {
      authorId = _Config.Config.owner,
      name
    }
  }) => ({
    preload: scope => _Query.Query.wikiPage(scope, authorId, name)
  })
});

const withListingMatch = (path, params) => {
  if (!path) {
    return {
      preload: (0, _gunScope.query)(R.always((0, _gunScope.resolve)({}))),
      sidebar: (0, _gunScope.query)(R.always((0, _gunScope.resolve)(""))),
      space: (0, _gunScope.query)(R.always((0, _gunScope.resolve)(_Listing.ListingSpec.fromSource("")))),
      ids: (0, _gunScope.query)(R.always((0, _gunScope.resolve)([])))
    };
  }

  return {
    // eslint-disable-next-line no-use-before-define
    preload: scope => preloadListing(scope, path, params),
    sidebar: (0, _gunScope.query)(scope => _Listing.Listing.sidebarFromPath(scope, path), `sidebar:${path}`),
    space: (0, _gunScope.query)(scope => _Listing.Listing.specFromPath(scope, path, params), `spec:${path}`),
    ids: (0, _gunScope.query)((scope, opts = {}) => _Listing.Listing.fromPath(scope, path, R.mergeLeft(opts, params)), `ids:${path}:${_queryString.default.stringify(params)}`)
  };
};

const preloadListing = async (scope, path, params) => {
  const match = withListingMatch(path, params);
  let [spec, ids] = await Promise.all([match.space(scope), match.ids(scope, {}), match.sidebar(scope)]);
  if (!spec) spec = _Listing.ListingSpec.fromSource("");

  const thingSouls = _Listing.Listing.idsToSouls(ids);

  const [things] = await Promise.all([_Query.Query.multiThingMeta(scope, {
    thingSouls,
    tabulator: spec.tabulator || _Config.Config.tabulator,
    scores: true,
    data: true
  }), ...R.map(id => _Query.Query.userMeta(scope, id), R.uniq([spec && spec.indexer, spec && spec.owner, spec && spec.tabulator]))]);
  const opIds = R.compose(R.without(ids), R.filter(R.identity), R.uniq, R.map(R.pathOr(null, ["data", "opId"])))(things);
  console.log("opIds", opIds);

  if (opIds.length) {
    const opSouls = _Listing.Listing.idsToSouls(opIds);

    await _Query.Query.multiThingMeta(scope, {
      thingSouls: opSouls,
      tabulator: spec.tabulator || _Config.Config.tabulator,
      data: true
    });
  }

  if (spec.chatTopic) {
    const chatPath = `/t/${spec.chatTopic}/chat`;
    if (chatPath !== path) await preloadListing(scope, `/t/${spec.chatTopic}/chat`, {});
  }

  return scope.getCache();
};

const listing = ({
  prefix: defaultPrefix = "t",
  identifier: defaultIdentifier = "all",
  sort: defaultSort = "hot",
  ...rest
} = {}) => ({ ...rest,
  withMatch: ({
    params: {
      prefix = defaultPrefix,
      identifier = defaultIdentifier,
      sort = defaultSort
    },
    query
  }) => withListingMatch(`/${prefix}/${identifier}/${sort}`, query)
});

const thingComments = ({
  prefix: defaultPrefix = "t",
  identifier: defaultIdentifier = "all",
  sort: defaultSort = "best",
  ...rest
} = {}) => ({ ...rest,
  withMatch: ({
    params: {
      opId,
      prefix = defaultPrefix,
      identifier = defaultIdentifier,
      sort = defaultSort
    },
    query
  }) => withListingMatch(_Listing.ListingType.CommentListing.route.reverse({
    thingId: opId,
    sort
  }), R.assoc("limit", 1000, query))
});

const spaceListing = ({
  name: defaultName = "default",
  authorId: defaultAuthorId,
  sort: defaultSort = "default",
  ...rest
} = {}) => ({ ...rest,
  withMatch: ({
    params: {
      authorId = defaultAuthorId,
      name = defaultName,
      sort = defaultSort
    },
    query
  }) => withListingMatch(_Listing.ListingType.SpaceListing.route.reverse({
    authorId: authorId || _Config.Config.owner,
    name,
    sort
  }), query)
});

const spaceThingComments = ({
  name: defaultName = "default",
  authorId: defaultAuthorId,
  sort: defaultSort = "hot",
  ...rest
}) => ({ ...rest,
  withMatch: ({
    params: {
      opId,
      authorId = defaultAuthorId,
      name = defaultName,
      sort = defaultSort
    },
    query
  }) => {
    const spacePath = _Listing.ListingType.SpaceListing.route.reverse({
      authorId: authorId || _Config.Config.owner,
      name,
      sort
    });

    const listingPath = _Listing.ListingType.CommentListing.route.reverse({
      thingId: opId,
      sort
    });

    return {
      space: query(scope => _Listing.Listing.specFromPath(scope, spacePath, query), `spec:${spacePath}`),
      ids: query(scope => _Listing.Listing.fromPath(scope, listingPath, query), listingPath),
      preload: scope => preloadListing(scope, listingPath, query)
    };
  }
});

const profile = ({
  sort: defaultSort = "new",
  type: defaultType = "overview",
  ...rest
} = {}) => ({ ...rest,
  withMatch: ({
    params: {
      authorId,
      type = defaultType,
      sort = defaultSort
    },
    query
  }) => withListingMatch(_Listing.ListingType.ProfileListing.route.reverse({
    authorId,
    type,
    sort
  }), query)
});

const inbox = ({
  sort: defaultSort = "new",
  type: defaultType = "overview",
  ...rest
} = {}) => ({ ...rest,
  withMatch: ({
    authorId,
    params: {
      type = defaultType,
      sort = defaultSort
    },
    query
  }) => withListingMatch(_Listing.ListingType.InboxListing.route.reverse({
    authorId,
    type,
    sort
  }), query)
});

const Page = {
  withListingMatch,
  preloadListing,
  wikiPage,
  thingComments,
  listing,
  spaceListing,
  spaceThingComments,
  profile,
  inbox
};
exports.Page = Page;

/***/ }),

/***/ "./src/Peer.js":
/*!*********************!*\
  !*** ./src/Peer.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Peer = void 0;

var _Validation = __webpack_require__(/*! ./Validation */ "./src/Validation.js");

var _Query = __webpack_require__(/*! ./Query */ "./src/Query.js");

var _Thing = __webpack_require__(/*! ./Thing */ "./src/Thing/index.js");

var _Authentication = __webpack_require__(/*! ./Authentication */ "./src/Authentication.js");

/* eslint-disable */
function init(Gun, config = {}) {
  const {
    leech,
    disableValidation,
    noGun,
    localStorage,
    persist,
    ...rest
  } = config || {};
  const peer = {
    config
  };

  if (!noGun) {
    const cfg = {
      localStorage: !!localStorage,
      radisk: !!persist,
      ...rest
    };
    if (persist) cfg.localStorage = false;
    if (!disableValidation) Gun.on("opt", _Validation.Validation.gunWireInput(peer));
    if (cfg.storeFn) cfg.store = cfg.storeFn(cfg); // for indexeddb

    peer.gun = Gun(cfg);
    if (cfg.localStorage) peer.gun.on("localStorage:error", a => a.retry({}));

    if (leech) {
      const sendLeech = () => peer.gun._.on("out", {
        leech: true
      });

      sendLeech();
    }
  }

  peer.newScope = opts => _Query.Query.createScope(peer, opts);

  peer.onLogin = _Authentication.Authentication.onLogin(peer);
  peer.signup = _Authentication.Authentication.signup(peer);
  peer.login = _Authentication.Authentication.login(peer);

  peer.logout = () => _Authentication.Authentication.logout(peer);

  peer.isLoggedIn = () => _Authentication.Authentication.isLoggedIn(peer);

  peer.submit = _Thing.Thing.submit(peer);
  peer.comment = _Thing.Thing.comment(peer);
  peer.chat = _Thing.Thing.chat(peer);
  peer.writePage = _Thing.Thing.writePage(peer);
  peer.vote = _Thing.Thing.vote(peer);
  peer.queries = _Query.Query;
  return peer;
}

const Peer = {
  init
};
exports.Peer = Peer;

/***/ }),

/***/ "./src/Query.js":
/*!**********************!*\
  !*** ./src/Query.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ./Config */ "./src/Config.js");

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

var _Schema = __webpack_require__(/*! ./Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ./Thing */ "./src/Thing/index.js");

var _ListingNode = __webpack_require__(/*! ./Listing/ListingNode */ "./src/Listing/ListingNode.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const emptyPromise = (0, _gunScope.resolve)(null);
const unionArrays = R.reduce(R.union, []);

const topicSouls = params => {
  const {
    topics = ["all"]
  } = params || {};
  const days = R.propOr(365, "days", params) || 365;
  const dayStrings = [];
  const oneDay = 1000 * 60 * 60 * 24;
  const start = new Date().getTime() - oneDay * parseInt(days, 10);

  for (let i = 0; i <= days + 1; i++) dayStrings.push(_Thing.ThingSet.dayStr(start + i * oneDay));

  return Object.keys(topics.reduce((result, topicName) => dayStrings.reduce((res, ds) => {
    res[`${_Constants.Constants.PREFIX}/topics/${topicName}/days/${ds}`] = true;
    return res;
  }, result), {}));
};

const singleTopic = (0, _gunScope.query)((scope, params) => {
  const tSouls = topicSouls({ ...params,
    topics: [params.topic]
  });
  let souls = [];
  let itemMax = _Constants.Constants.LISTING_SIZE;

  if (params.sort === "new") {
    itemMax = _Constants.Constants.LISTING_SIZE;
  } else {
    if (params.sort === "top") itemMax = itemMax * 3;
    if (params.topic === "all") itemMax = itemMax * 3;
  }

  const fetchMore = () => {
    const topicSoul = tSouls.pop();
    if (souls.length > itemMax || !topicSoul) return (0, _gunScope.resolve)(souls);
    return scope.get(topicSoul).souls().then(more => {
      souls = [...souls, ...more];
      return fetchMore();
    });
  };

  return fetchMore();
});
const singleDomain = (0, _gunScope.query)((scope, {
  domain
}) => scope.get(_Schema.Schema.Domain.route.reverse({
  domainName: domain
})).souls());
const singleAuthor = (0, _gunScope.query)((scope, params) => (0, _gunScope.all)([params.type && params.type !== "submitted" && params.type !== "overview" ? (0, _gunScope.resolve)([]) : scope.get(`~${params.authorId}`).get("submissions").souls(), params.type && params.type !== "comments" && params.type !== "overview" && params.type !== "commands" ? (0, _gunScope.resolve)([]) : scope.get(`~${params.authorId}`).get("comments").souls()]).then(([submissions, comments]) => unionArrays([submissions, comments])));
const listingIds = (0, _gunScope.query)((scope, soul) => scope.get(soul).then(_ListingNode.ListingNode.sortedIds), "listingIds");
const singleListing = (0, _gunScope.query)((scope, {
  listing,
  sort,
  indexer
}) => listingIds(scope, `${_Constants.Constants.PREFIX}${listing}/${sort}@~${indexer}.`).then(R.compose(R.map(thingId => _Schema.Schema.Thing.route.reverse({
  thingId
})), R.filter(R.identity))));
const repliesToAuthor = (0, _gunScope.query)((scope, {
  repliesToAuthorId,
  type = "overview",
  ...params
}) => singleListing(scope, {
  listing: `/user/${repliesToAuthorId}/${type}`,
  sort: "new",
  ...params
}).then(authoredSouls => (0, _gunScope.all)(authoredSouls.map(authoredSoul => scope.get(`${authoredSoul}/comments`).souls())).then(unionArrays)));
const singleSubmission = (0, _gunScope.query)((scope, params) => scope.get(_Schema.Schema.ThingAllComments.route.reverse({
  thingId: params.submissionId
})).souls(R.prepend(_Schema.Schema.Thing.route.reverse({
  thingId: params.submissionId
}))));
const thing = (0, _gunScope.query)((scope, thingSoul) => scope.get(thingSoul).then(meta => {
  if (!meta || !meta.id) return null;
  const result = {
    id: meta.id,
    timestamp: parseFloat(meta.timestamp, 10)
  };
  const replyToSoul = R.path(["replyTo", "#"], meta);
  const opSoul = R.path(["op", "#"], meta);
  const opId = opSoul ? _Schema.Schema.Thing.route.match(opSoul).thingid : null;
  const replyToId = replyToSoul ? _Schema.Schema.Thing.route.match(replyToSoul).thingid : null;
  if (opId) result.opId = opId;
  if (replyToId) result.replyToId = replyToId;
  return result;
}));

const multiQuery = (singleQuery, plural, single, collate = unionArrays) => (0, _gunScope.query)((scope, params) => {
  const items = R.prop(plural, params);
  if (R.isNil(items)) return emptyPromise;
  return (0, _gunScope.all)(R.map(val => singleQuery(scope, { ...params,
    [single]: val
  }), R.propOr([], plural, params))).then(collate);
});

const multiTopic = multiQuery(singleTopic, "topics", "topic");
const multiDomain = multiQuery(singleDomain, "domains", "domain");
const multiAuthor = multiQuery(singleAuthor, "authorIds", "authorId");
const multiSubmission = multiQuery(singleSubmission, "submissionIds", "submissionId");

const thingDataFromSouls = scope => souls => (0, _gunScope.all)(souls.filter(x => !!x).map(soul => scope.get(soul).get("data").then(x => x)));

const curated = (0, _gunScope.query)((scope, authorIds, submissionOnly = false) => (0, _gunScope.all)([multiAuthor(scope, {
  type: "comments",
  authorIds
}).then(thingDataFromSouls(scope)).then(R.compose(R.map(submissionOnly ? R.prop("opId") : R.prop("replyToId")), R.filter(R.prop("replyToId")))), multiAuthor(scope, {
  type: "submitted",
  authorIds
}).then(R.map(soul => _Schema.Schema.Thing.route.match(soul).thingId))]).then(([ids1, ids2]) => R.uniq([...ids1, ...ids2])));
const thingScores = (0, _gunScope.query)((scope, tabulator, thingId) => tabulator && thingId ? scope.get(_Schema.Schema.ThingVoteCounts.route.reverse({
  thingId,
  tabulator
})).then() : (0, _gunScope.resolve)(), "thingScores");
const thingData = (0, _gunScope.query)((scope, thingId) => {
  return thingId ? scope.get(_Schema.Schema.Thing.route.reverse({
    thingId
  })).get("data") : (0, _gunScope.resolve)(null);
}, "thingData");
const thingMeta = (0, _gunScope.query)((scope, {
  thingSoul,
  tabulator,
  data = false,
  scores = false
}) => {
  if (!thingSoul) return (0, _gunScope.resolve)(null);

  const id = _ListingNode.ListingNode.soulToId(thingSoul);

  return (0, _gunScope.all)([thing(scope, thingSoul), scores ? thingScores(scope, tabulator || _Config.Config.tabulator, id) : (0, _gunScope.resolve)(), data ? thingData(scope, id) : (0, _gunScope.resolve)()]).then(([meta, votes, data]) => {
    if (!meta || !meta.id) return null;
    return { ...meta,
      votes,
      data
    };
  });
});
const multiThingMeta = (0, _gunScope.query)((scope, params) => (0, _gunScope.all)(R.reduce((promises, thingSoul) => {
  if (!thingSoul) return promises;
  promises.push(thingMeta(scope, { ...params,
    thingSoul
  }));
  return promises;
}, [], R.propOr([], "thingSouls", params))));
const userPages = (0, _gunScope.query)((scope, authorId) => scope.get(_Schema.Schema.AuthorPages.route.reverse({
  authorId
})), "userPages");
const wikiPageId = (0, _gunScope.query)((scope, authorId, name) => {
  if (!authorId || !name) return (0, _gunScope.resolve)(null);
  return scope.get(_Schema.Schema.AuthorPages.route.reverse({
    authorId
  })).get(name).get("id");
}, "wikiPageId");
const wikiPage = (0, _gunScope.query)((scope, authorId, name) => wikiPageId(scope, authorId, name).then(id => id && thingData(scope, id)));
const userMeta = (0, _gunScope.query)((scope, id) => {
  if (!id) return (0, _gunScope.resolve)(null);
  return scope.get(`~${id}`).then(meta => ({
    alias: R.prop("alias", meta),
    createdAt: R.path(["_", ">", "pub"], meta)
  }));
}, "userMeta");
const createScope = R.curry((nab, opts) => (0, _gunScope.scope)(R.assoc("gun", nab.gun, opts || {})));
const Query = {
  singleTopic,
  singleDomain,
  singleAuthor,
  singleListing,
  repliesToAuthor,
  singleSubmission,
  thingMeta,
  multiThingMeta,
  multiTopic,
  multiDomain,
  multiAuthor,
  multiSubmission,
  thingScores,
  thingData,
  thingDataFromSouls,
  topicSouls,
  userPages,
  wikiPageId,
  wikiPage,
  userMeta,
  createScope,
  curated
};
exports.Query = Query;

/***/ }),

/***/ "./src/Schema.js":
/*!***********************!*\
  !*** ./src/Schema.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _routeParser = _interopRequireDefault(__webpack_require__(/*! route-parser */ "route-parser"));

var sea = _interopRequireWildcard(__webpack_require__(/*! gun-suppressor-sear */ "gun-suppressor-sear"));

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const definitions = { ...sea.AUTH_SCHEMA,
  topicName: {
    type: "string",
    minLength: 1,
    maxLength: _Constants.Constants.MAX_TOPIC_SIZE
  },
  TopicDay: {
    title: "Topic Day",
    description: "A single day of things in a topic",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/topics/:topicName/days/:year/:month/:day`,
      properties: {
        topicName: {
          $ref: "schema.json#/definitions/topicName"
        },
        year: {
          type: "number",
          minimum: 2018,
          maximum: 2100
        },
        month: {
          type: "number",
          minimum: 1,
          maximum: 12
        },
        day: {
          type: "number",
          minimum: 1,
          maximum: 31
        }
      },
      required: ["topicName", "year", "month", "day"]
    },
    propsFromSoul: {
      name: "topicName"
    },
    properties: {
      name: {
        description: "Deprecated as unnecessary",
        type: "string"
      }
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{
        $ref: "#/definitions/ThingEdge"
      }, {
        $ref: "#/definitions/TopicEdge"
      }]
    }
  },
  Topic: {
    title: "Topic",
    description: "All things in a topic",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/topics/:topicName`,
      properties: {
        topicName: {
          $ref: "schema.json#/definitions/topicName"
        }
      },
      required: ["topicName"]
    },
    propsFromSoul: {
      name: "topicName"
    },
    properties: {
      name: {
        description: "Deprecated as unnecessary",
        type: "string"
      }
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{
        $ref: "#/definitions/ThingEdge"
      }, {
        $ref: "#/definitions/TopicEdge"
      }]
    }
  },
  domainName: {
    type: "string",
    minLength: 1,
    maxLength: _Constants.Constants.MAX_DOMAIN_SIZE
  },
  Domain: {
    title: "Domain",
    description: "All things in a domain",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/domains/:domainName`,
      properties: {
        domainName: {
          $ref: "schema.json#/definitions/domainName"
        }
      },
      required: ["domainName"]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{
        $ref: "#/definitions/ThingEdge"
      }]
    }
  },
  url: {
    type: ["null", "string"],
    maxLength: _Constants.Constants.MAX_URL_SIZE
  },
  URL: {
    title: "URL",
    description: "All things for a given URL",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/urls/\*url`,
      // eslint-disable-line no-useless-escape
      properties: {
        url: {
          $ref: "schema.json#/definitions/url"
        }
      },
      required: ["url"]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{
        $ref: "#/definitions/ThingEdge"
      }]
    }
  },
  thingId: {
    type: "string",
    maxLength: _Constants.Constants.MAX_HASH_SIZE
  },
  thingSoul: {
    properties: {
      thingId: {
        "#ref": "#definitions/thingId"
      }
    }
  },
  ThingAllComments: {
    title: "Thing All Comments",
    description: "All comments for a given submission",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/allcomments`,
      allOf: [{
        $ref: "schema.json#/definitions/thingSoul"
      }]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{
        $ref: "#/definitions/ThingEdge"
      }]
    }
  },
  ThingComments: {
    title: "Thing Comments",
    description: "Direct replies to a thing",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/comments`,
      allOf: [{
        $ref: "schema.json#/definitions/thingSoul"
      }]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{
        $ref: "#/definitions/ThingEdge"
      }]
    }
  },
  timestamp: {
    type: ["number", "string"]
  },
  thingKind: {
    type: "string",
    maxLength: _Constants.Constants.MAX_THING_KIND_SIZE
  },
  Thing: {
    title: "Thing Reference",
    description: "These are submissions, comments, chat messages and wiki pages",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId`,
      allOf: [{
        $ref: "schema.json#/definitions/thingSoul"
      }]
    },
    propsFromSoul: {
      id: "thingId"
    },
    properties: {
      id: {
        $ref: "#/definitions/thingId"
      },
      kind: {
        "#ref": "#/definitions/thingKind"
      },
      timestamp: {
        $ref: "#/definitions/timestamp"
      },
      originalHash: {
        $ref: "#/definitions/thingId"
      },
      data: {
        oneOf: [{
          $ref: "#/definitions/ThingDataEdge"
        }, {
          $ref: "#/definitions/ThingDataSignedEdge"
        }]
      },
      topic: {
        anyOf: [{
          $ref: "#/definitions/TopicEdge"
        }, {
          description: "Some old things had generic topic souls",
          type: "object",
          additionalProperties: false,
          properties: {
            "#": {
              type: "string",
              maxLength: 42
            }
          },
          required: ["#"]
        }]
      },
      domain: {
        $ref: "#/definitions/DomainEdge"
      },
      url: {
        $ref: "#/definitions/URLEdge"
      },
      comments: {
        thingRelatedEdge: "ThingComments"
      },
      allcomments: {
        thingRelatedEdge: "ThingAllComments"
      },
      votesup: {
        thingRelatedEdge: "ThingVotesUp"
      },
      votesdown: {
        thingRelatedEdge: "ThingVotesDown"
      },
      op: {
        $ref: "#/definitions/ThingEdge"
      },
      replyTo: {
        $ref: "#/definitions/ThingEdge"
      },
      author: {
        $ref: "#/definitions/SEAAuthorEdge"
      }
    },
    anyOf: [{
      allOf: [{
        thingHashMatchesSoul: true
      }, {
        anyOf: [{
          signedThingDataMatchesThing: true
        }, {
          thingDataMatchesOriginalHash: true
        }]
      }]
    }, {
      isLegacyThing: true
    }, {
      additionalProperties: false,
      description: "Self verifying can be updated in isolation",
      properties: {
        id: {
          $ref: "#/definitions/thingId"
        },
        comments: {
          thingRelatedEdge: "ThingComments"
        },
        allcomments: {
          thingRelatedEdge: "ThingAllComments"
        },
        votesup: {
          thingRelatedEdge: "ThingVotesUp"
        },
        votesdown: {
          thingRelatedEdge: "ThingVotesDown"
        }
      }
    }]
  },
  ProofOfWorkVotes: {
    $async: true,
    keysAreProofsOfWork: {
      algorithm: "argon2d",
      config: {
        complexity: 6,
        hashLength: 32,
        timeCost: 1,
        memoryCost: 10240,
        parallelism: 1
      }
    }
  },
  ThingVotesUp: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/votesup`,
      allOf: [{
        $ref: "schema.json#/definitions/thingSoul"
      }]
    },
    allOf: [{
      $ref: "#/definitions/ProofOfWorkVotes"
    }]
  },
  ThingVotesDown: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/votesdown`,
      allOf: [{
        $ref: "schema.json#/definitions/thingSoul"
      }]
    },
    allOf: [{
      $ref: "#/definitions/ProofOfWorkVotes"
    }]
  },
  ThingData: {
    title: "Unsigned Thing Data",
    description: "This is the actual content of a thing",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/data`,
      allOf: [{
        $ref: "schema.json#/definitions/thingSoul"
      }],
      required: ["thingId"]
    },
    properties: {
      kind: {
        $ref: "#/definitions/thingKind"
      },
      title: {
        type: "string",
        minLength: 1,
        maxLength: _Constants.Constants.MAX_THING_TITLE_SIZE
      },
      topic: {
        $ref: "#/definitions/topicName"
      },
      body: {
        type: ["null", "string"],
        maxLength: _Constants.Constants.MAX_THING_BODY_SIZE
      },
      author: {
        $ref: "#/definitions/seaAlias"
      },
      authorId: {
        $ref: "#/definitions/seaAuthorId"
      },
      opId: {
        $ref: "#/definitions/thingId"
      },
      replyToId: {
        $ref: "#/definitions/thingId"
      },
      domain: {
        $ref: "#/definitions/domainName"
      },
      url: {
        $ref: "#/definitions/url"
      },
      timestamp: {
        $ref: "#/definitions/timestamp"
      }
    },
    thingDataHashMatchesSoul: true
  },
  ThingDataSigned: {
    title: "Signed Thing Data",
    description: "This is the actual content of a thing, cryptographically signed",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/data~:authorId.`,
      properties: {
        thingId: {
          $ref: "schema.json#/definitions/thingId"
        },
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      },
      required: ["thingId", "authorId"]
    },
    properties: {
      kind: {
        sea: {
          $ref: "schema.json#/definitions/thingKind"
        }
      },
      title: {
        sea: {
          type: "string",
          minLength: 1,
          maxLength: _Constants.Constants.MAX_THING_TITLE_SIZE
        }
      },
      topic: {
        sea: {
          $ref: "schema.json#/definitions/topicName"
        }
      },
      body: {
        sea: {
          type: ["null", "string"],
          maxLength: _Constants.Constants.MAX_THING_BODY_SIZE
        }
      },
      author: {
        sea: {
          $ref: "schema.json#/definitions/seaAlias"
        }
      },
      authorId: {
        sea: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      },
      opId: {
        sea: {
          $ref: "schema.json#/definitions/thingId"
        }
      },
      replyToId: {
        sea: {
          $ref: "schema.json#/definitions/thingId"
        }
      },
      domain: {
        sea: {
          $ref: "schema.json#/definitions/domainName"
        }
      },
      url: {
        sea: {
          $ref: "schema.json#/definitions/url"
        }
      },
      timestamp: {
        sea: {
          $ref: "schema.json#/definitions/timestamp"
        }
      }
    }
  },
  ThingVoteCounts: {
    title: "Thing Vote Counts",
    description: "Aggregated counts from a tabulator",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/votecounts@~:tabulator.`,
      properties: {
        thingId: {
          $ref: "schema.json#/definitions/thingId"
        },
        tabulator: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      }
    },
    properties: {
      up: {
        sea: {
          type: ["number", "string"]
        }
      },
      down: {
        sea: {
          type: ["number", "string"]
        }
      },
      comment: {
        sea: {
          type: ["number", "string"]
        }
      },
      score: {
        sea: {
          type: ["number", "string"]
        }
      },
      commands: {
        sea: {
          type: ["object", "string"]
        }
      }
    }
  },
  ListingData: {
    $async: true,
    title: "Listing Node Data",
    description: "Shared description of listing properties",
    type: "object",
    properties: {
      // XXX: these are all deprecated
      ids: {
        sea: {
          maxLength: _Constants.Constants.MAX_LISTING_IDS_SIZE
        }
      },
      source: {
        sea: {
          maxLength: _Constants.Constants.MAX_LISTING_SOURCE_SIZE
        }
      },
      name: {
        sea: {
          maxLength: _Constants.Constants.MAX_TOPIC_SIZE
        }
      },
      submitTopic: {
        sea: {
          maxLength: _Constants.Constants.MAX_TOPIC_SIZE
        }
      },
      tabs: {
        sea: {
          maxLength: _Constants.Constants.MAX_LISTING_TABS_SIZE
        }
      },
      curators: {
        sea: {
          maxLength: _Constants.Constants.MAX_LISTING_SOURCE_SIZE
        }
      },
      censors: {
        sea: {
          maxLength: _Constants.Constants.MAX_LISTING_SOURCE_SIZE
        }
      },
      userId: {
        sea: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      },
      opId: {
        sea: {
          $ref: "schema.json#/definitions/thingId"
        }
      },
      isChat: {
        sea: {
          type: ["boolean", "string"]
        }
      }
    },
    patternProperties: {
      "^d+$": {
        sea: {
          type: ["string", "null", "undefined"]
        }
      }
    }
  },
  sortName: {
    type: "string",
    enum: ["new", "old", "active", "top", "comments", "discussed", "hot", "best", "controversial", "random", "firehose", "chat"]
  },
  TopicListing: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/t/:topic/:sort@~:indexer.`,
      required: ["topic", "sort", "indexer"],
      properties: {
        topic: {
          type: "string"
        },
        sort: {
          $ref: "schema.json#/definitions/sortName"
        },
        indexer: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      }
    },
    allOf: [{
      $ref: "#/definitions/ListingData"
    }]
  },
  DomainListing: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/domain/:domain/:sort@~:indexer.`,
      required: ["domain", "sort", "indexer"],
      properties: {
        domain: {
          type: "string"
        },
        sort: {
          $ref: "schema.json#/definitions/sortName"
        },
        indexer: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      }
    },
    allOf: [{
      $ref: "#/definitions/ListingData"
    }]
  },
  ThingCommentsListing: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things/:thingId/comments/:sort@~:indexer.`,
      properties: {
        thingId: {
          $ref: "schema.json#/definitions/thingId"
        },
        sort: {
          $ref: "schema.json#/definitions/sortName"
        },
        indexer: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      }
    },
    allOf: [{
      $ref: "#/definitions/ListingData"
    }]
  },
  userListingType: {
    type: "string",
    enum: ["overview", "submitted", "comments", "commands", "commented"]
  },
  AuthorRepliesListing: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/user/:authorId/replies/:type/:sort@~:indexer.`,
      properties: {
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        },
        sort: {
          $ref: "schema.json#/definitions/sortName"
        },
        indexer: {
          $ref: "schema.json#/definitions/seaAuthorId"
        },
        type: {
          $ref: "schema.json#/definitions/userListingType"
        }
      }
    },
    allOf: [{
      $ref: "#/definitions/ListingData"
    }]
  },
  AuthorProfileListing: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/user/:authorId/:type/:sort@~:indexer.`,
      properties: {
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        },
        sort: {
          $ref: "schema.json#/definitions/sortName"
        },
        indexer: {
          $ref: "schema.json#/definitions/seaAuthorId"
        },
        type: {
          $ref: "schema.json#/definitions/userListingType"
        }
      }
    },
    allOf: [{
      $ref: "#/definitions/ListingData"
    }]
  },
  SpaceListing: {
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/user/:authorId/spaces/:name/:sort@~:indexer.`,
      properties: {
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        },
        sort: {
          $ref: "schema.json#/definitions/sortName"
        },
        indexer: {
          $ref: "schema.json#/definitions/seaAuthorId"
        },
        name: {
          $ref: "schema.json#/definitions/topicName"
        }
      }
    },
    allOf: [{
      $ref: "#/definitions/ListingData"
    }]
  },
  AuthorComments: {
    title: "Author's Comments",
    description: "All of an authors comments should be linked here",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/comments~:authorId.`,
      properties: {
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      },
      required: ["authorId"]
    },
    additionalProperties: {
      sea: {
        edgeMatchesKey: true,
        anyOf: [{
          $ref: "schema.json#/definitions/ThingEdge"
        }]
      }
    }
  },
  AuthorSubmissions: {
    title: "Author's Submissions",
    description: "All of an author's submissions should be linked here",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/submissions~:authorId.`,
      properties: {
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      },
      required: ["authorId"]
    }
  },
  AuthorThings: {
    title: "Author's Things",
    description: "All of an author's things should be linked here",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/things~:authorId.`,
      properties: {
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      },
      required: ["authorId"]
    },
    additionalProperties: {
      sea: {
        edgeMatchesKey: true,
        anyOf: [{
          $ref: "schema.json#/definitions/ThingEdge"
        }]
      }
    }
  },
  AuthorPages: {
    title: "Author Page Map",
    description: "Mapping of page names to things",
    soul: {
      pattern: `${_Constants.Constants.PREFIX}/pages~:authorId.`,
      properties: {
        authorId: {
          $ref: "schema.json#/definitions/seaAuthorId"
        }
      },
      required: ["authorId"]
    },
    additionalProperties: {
      sea: {
        edgeMatchesKey: true,
        anyOf: [{
          $ref: "schema.json#/definitions/ThingEdge"
        }]
      }
    }
  }
};
const routes = R.keys(definitions).reduce((result, name) => {
  const pattern = R.path([name, "soul", "pattern"], definitions);
  if (!pattern) return result;
  return R.assoc(name, new _routeParser.default(pattern), result);
});
const defsWithRoutes = R.compose(R.reduce((res, [name, route]) => R.assoc(name, R.assoc("route", route, R.prop(name, definitions)), res), {}), R.toPairs)(routes);
const Schema = { ...defsWithRoutes,
  definitions,
  routes
};
exports.Schema = Schema;

/***/ }),

/***/ "./src/Tabulator.js":
/*!**************************!*\
  !*** ./src/Tabulator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabulator = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Schema = __webpack_require__(/*! ./Schema */ "./src/Schema.js");

var _Query = __webpack_require__(/*! ./Query */ "./src/Query.js");

var _CommentCommand = __webpack_require__(/*! ./CommentCommand */ "./src/CommentCommand.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const tabulatorQuery = (0, _gunScope.query)(async (scope, route) => {
  const thingSoul = _Schema.Schema.Thing.route.reverse(route.match);

  const [up, down, comment, replySouls] = await (0, _gunScope.all)([scope.get(`${thingSoul}/votesup`).count(), scope.get(`${thingSoul}/votesdown`).count(), scope.get(`${thingSoul}/allcomments`).count(), scope.get(`${thingSoul}/comments`).souls()]);
  const thingData = await _Query.Query.thingDataFromSouls(replySouls);

  const commandMap = _CommentCommand.CommentCommand.map(thingData);

  const result = {
    up,
    down,
    comment,
    replies: replySouls.length,
    score: up - down
  };
  if (R.keys(commandMap).length) result.commands = JSON.stringify(commandMap);
  return result;
});
const Tabulator = {
  query: tabulatorQuery
};
exports.Tabulator = Tabulator;

/***/ }),

/***/ "./src/Thing/Thing.js":
/*!****************************!*\
  !*** ./src/Thing/Thing.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ThingSet", {
  enumerable: true,
  get: function () {
    return _ThingSet.ThingSet;
  }
});
Object.defineProperty(exports, "ThingDataNode", {
  enumerable: true,
  get: function () {
    return _ThingDataNode.ThingDataNode;
  }
});
exports.Thing = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _objectHash = _interopRequireDefault(__webpack_require__(/*! object-hash */ "object-hash"));

var _uriJs = __webpack_require__(/*! uri-js */ "uri-js");

var _Schema = __webpack_require__(/*! ../Schema */ "./src/Schema.js");

var _ThingSet = __webpack_require__(/*! ./ThingSet */ "./src/Thing/ThingSet.js");

var _ThingDataNode = __webpack_require__(/*! ./ThingDataNode */ "./src/Thing/ThingDataNode.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const topicPrefixes = {
  chatmsg: "chat:",
  comment: "comments:"
};
const soulToId = R.compose(R.prop("thingId"), _Schema.Schema.Thing.route.match.bind(_Schema.Schema.Thing.route));
const soulsToIds = R.map(soulToId);
const index = R.curry((peer, thingId, data) => {
  if (!data.topic && !data.opId) return;

  if (data.opId && !data.topic) {
    peer.gun.get(_Schema.Schema.Thing.route.reverse({
      thingId: data.opId
    })).get("data").on(function recv(td) {
      if (!td) return;
      index(peer, thingId, { ...data,
        topic: td.topic || "all"
      });
      this.off();
    });
    return;
  }

  const thing = peer.gun.get(_Schema.Schema.Thing.route.reverse({
    thingId
  }));

  const dayStr = _ThingSet.ThingSet.dayStr(data.timestamp);

  const [year, month, day] = dayStr.split("/");
  const topicPrefix = topicPrefixes[data.kind] || "";
  const baseTopicName = data.topic.toLowerCase().trim();
  const topicName = topicPrefix + baseTopicName;
  const topic = peer.gun.get(_Schema.Schema.Topic.route.reverse({
    topicName
  }));
  const topicDay = peer.gun.get(_Schema.Schema.TopicDay.route.reverse({
    topicName,
    year,
    month,
    day
  }));

  if (!data.skipAll && data.topic !== "all") {
    const allname = `${topicPrefix}all`;
    const allTopic = peer.gun.get(_Schema.Schema.Topic.route.reverse({
      topicName: allname
    }));
    const allTopicDay = peer.gun.get(_Schema.Schema.TopicDay.route.reverse({
      topicName: allname,
      year,
      month,
      day
    }));
    allTopic.set(thing);
    allTopicDay.set(thing);
  }

  if (data.kind === "submission") {
    const urlInfo = data.url ? (0, _uriJs.parse)(data.url) : {};
    const domainName = (data.url ? (urlInfo.host || urlInfo.scheme || "").replace(/^www\./, "") : `self.${data.topic}`).toLowerCase();
    const domain = peer.gun.get(_Schema.Schema.Domain.route.reverse({
      domainName
    }));
    domain.set(thing);

    if (data.url) {
      const urlNode = peer.gun.get(_Schema.Schema.URL.route.reverse({
        url: data.url
      })); // thing.get("url").put(urlNode);

      urlNode.set(thing);
    }
  }

  if (data.opId) {
    const allcomments = peer.gun.get(_Schema.Schema.ThingAllComments.route.reverse({
      thingId: data.opId
    }));
    allcomments.set(thing);
  }

  if (data.replyToId || data.opId) {
    const comments = peer.gun.get(_Schema.Schema.ThingComments.route.reverse({
      thingId: data.replyToId || data.opId
    }));
    comments.set(thing);
  }

  topic.set(thing);
  topicDay.set(thing);
});
const put = R.curry((peer, data) => {
  data.timestamp = data.timestamp || new Date().getTime(); // eslint-disable-line

  const originalHash = (0, _objectHash.default)(data);
  const {
    timestamp,
    kind,
    topic,
    authorId,
    opId,
    replyToId
  } = data;
  const thingId = (0, _objectHash.default)({
    timestamp,
    kind,
    topic,
    authorId,
    opId,
    replyToId,
    originalHash
  });
  const node = peer.gun.get(_Schema.Schema.Thing.route.reverse({
    thingId
  }));
  const dataSoul = authorId ? _Schema.Schema.ThingDataSigned.route.reverse({
    thingId,
    authorId
  }) : _Schema.Schema.ThingData.route.reverse({
    thingId: originalHash
  });
  const metaData = {
    id: thingId,
    timestamp,
    kind,
    originalHash,
    data: {
      "#": dataSoul
    },
    votesup: {
      "#": _Schema.Schema.ThingVotesUp.route.reverse({
        thingId
      })
    },
    votesdown: {
      "#": _Schema.Schema.ThingVotesDown.route.reverse({
        thingId
      })
    },
    allcomments: {
      "#": _Schema.Schema.ThingAllComments.route.reverse({
        thingId
      })
    },
    comments: {
      "#": _Schema.Schema.ThingComments.route.reverse({
        thingId
      })
    }
  };
  if (topic) metaData.topic = {
    "#": _Schema.Schema.Topic.route.reverse({
      topicName: topic
    })
  };
  if (authorId) metaData.author = {
    "#": `~${authorId}`
  };
  if (opId) metaData.op = {
    "#": _Schema.Schema.Thing.route.reverse({
      thingId: opId
    })
  };
  if (replyToId) metaData.replyTo = {
    "#": _Schema.Schema.Thing.route.reverse({
      thingId: replyToId
    })
  };
  peer.gun.get(dataSoul).put(data);
  node.put(metaData);
  index(peer, thingId, data);
  return node;
});
const submit = R.curry((peer, data) => {
  const timestamp = data.timestamp || new Date().getTime();
  const user = peer.isLoggedIn();
  if (data.topic) data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line

  if (data.domain) data.domain = data.domain.toLowerCase().trim(); // eslint-disable-line

  if (user) {
    data.author = user.alias; // eslint-disable-line

    data.authorId = user.pub; // eslint-disable-line
  }

  const thing = put(peer, { ...data,
    timestamp,
    kind: "submission"
  });

  if (user) {
    const thingsSoul = _Schema.Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });

    const submissionsSoul = _Schema.Schema.AuthorSubmissions.route.reverse({
      authorId: user.pub
    });

    const things = peer.gun.get(thingsSoul);
    const submissions = peer.gun.get(submissionsSoul);
    peer.gun.user().get("things").put(things);
    peer.gun.user().get("submissions").put(submissions);
    things.set(thing);
    submissions.set(thing);
  }

  return thing;
});
const comment = R.curry((peer, data) => {
  const user = peer.isLoggedIn();
  if (data.topic) data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line

  if (user) {
    data.author = user.alias; // eslint-disable-line

    data.authorId = user.pub; // eslint-disable-line
  }

  const thing = put(peer, { ...data,
    kind: "comment"
  });

  if (user) {
    const thingsSoul = _Schema.Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });

    const commentsSoul = _Schema.Schema.AuthorComments.route.reverse({
      authorId: user.pub
    });

    const things = peer.gun.get(thingsSoul);
    const comments = peer.gun.get(commentsSoul);
    peer.gun.user().get("things").put(things);
    peer.gun.user().get("comments").put(comments);
    things.set(thing);
    comments.set(thing);
  }

  return thing;
});
const chat = R.curry((peer, data) => {
  const user = peer.isLoggedIn();
  if (data.topic) data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line

  if (user) {
    data.author = user.alias; // eslint-disable-line

    data.authorId = user.pub; // eslint-disable-line
  }

  const thing = put(peer, { ...data,
    kind: "chatmsg"
  });

  if (user) {
    const thingsSoul = _Schema.Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });

    const things = peer.gun.get(thingsSoul);
    peer.gun.user().get("things").put(things);
    things.set(thing);
  }

  return thing;
});
const writePage = R.curry((peer, name, body) => {
  const user = peer.isLoggedIn();
  if (!user) return _gunScope.Promise.reject("not logged in");
  let thing;

  const pagesSoul = _Schema.Schema.AuthorPages.route.reverse({
    authorId: user.pub
  });

  const chain = peer.gun.get(pagesSoul).get(name);
  return chain.then(res => {
    if (res && res.data) {
      chain.get("data").get("body").put(body);
    } else {
      const data = {
        body,
        title: name,
        kind: "wikipage",
        author: user.alias,
        authorId: user.pub
      };
      thing = put(peer, data);
      chain.put(thing);
    }
  });
});
const vote = R.curry((peer, id, kind, nonce) => {
  const votes = peer.gun.get(_Schema.Schema[kind === "up" ? "ThingVotesUp" : "ThingVotesDown"].route.reverse({
    thingId: id
  }));
  return votes.get(nonce).put("1");
});
const Thing = {
  soulToId,
  soulsToIds,
  put,
  submit,
  comment,
  chat,
  writePage,
  vote,
  index
};
exports.Thing = Thing;

/***/ }),

/***/ "./src/Thing/ThingDataNode.js":
/*!************************************!*\
  !*** ./src/Thing/ThingDataNode.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThingDataNode = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _uriJs = __webpack_require__(/*! uri-js */ "uri-js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const body = R.propOr("", "body");
const url = R.propOr("", "url");
const domain = R.compose(urlStr => {
  if (!urlStr) return "";
  const parsed = (0, _uriJs.parse)(urlStr);
  return (parsed.host || parsed.scheme || "").replace(/^www\./, "");
}, url);
const ThingDataNode = {
  body,
  domain
};
exports.ThingDataNode = ThingDataNode;

/***/ }),

/***/ "./src/Thing/ThingSet.js":
/*!*******************************!*\
  !*** ./src/Thing/ThingSet.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThingSet = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _Schema = __webpack_require__(/*! ../Schema */ "./src/Schema.js");

var _GunNode = __webpack_require__(/*! ../GunNode */ "./src/GunNode.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const souls = _GunNode.GunNode.edges;
const ids = R.compose(R.filter(R.identity), R.map(R.compose(R.prop("thingId"), _Schema.Schema.Thing.route.match.bind(_Schema.Schema.Thing.route))), _GunNode.GunNode.edges);
const union = R.compose(R.dissoc("_"), R.reduce(R.mergeRight, {}));

function dayStr(timestamp) {
  const d = new Date(timestamp || new Date().getTime());
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const dayNum = d.getUTCDate();
  return `${year}/${month}/${dayNum}`;
}

const ThingSet = {
  ids,
  union,
  souls,
  dayStr
};
exports.ThingSet = ThingSet;

/***/ }),

/***/ "./src/Thing/index.js":
/*!****************************!*\
  !*** ./src/Thing/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ThingSet", {
  enumerable: true,
  get: function () {
    return _ThingSet.ThingSet;
  }
});
Object.defineProperty(exports, "ThingDataNode", {
  enumerable: true,
  get: function () {
    return _ThingDataNode.ThingDataNode;
  }
});
Object.defineProperty(exports, "Thing", {
  enumerable: true,
  get: function () {
    return _Thing.Thing;
  }
});

var _ThingSet = __webpack_require__(/*! ./ThingSet */ "./src/Thing/ThingSet.js");

var _ThingDataNode = __webpack_require__(/*! ./ThingDataNode */ "./src/Thing/ThingDataNode.js");

var _Thing = __webpack_require__(/*! ./Thing */ "./src/Thing/Thing.js");

/***/ }),

/***/ "./src/Tokenizer.js":
/*!**************************!*\
  !*** ./src/Tokenizer.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tokenizer = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const tokenize = source => {
  const tokenMap = (source || "").split("\n").reduce((def, line) => {
    const tokens = line.trim().split(" ").map(R.trim).filter(x => x);
    if (!tokens.length) return def;
    return R.assocPath(tokens, {}, def);
  }, {});

  const isPresent = p => {
    let check = p;
    if (typeof p === "string") check = p.split(" ");
    return check && R.path(check, tokenMap);
  };

  const getValues = p => R.keysIn(isPresent(p));

  const getValue = p => getValues(p)[0] || null;

  const getLastValue = p => getValues(p).pop() || null;

  const getValueChain = p => {
    const keys = typeof p === "string" ? p.split(" ") : p;
    const values = [];
    let next = p;

    while (next) {
      next = getValue([...keys, ...values]);
      next && values.push(next);
    }

    return values;
  };

  const getPairs = p => {
    const keys = typeof p === "string" ? p.split(" ") : p;
    return getValues(keys).reduce((pairs, key) => {
      const val = getValue([...keys, key]);
      return [...pairs, [key, val]];
    }, []);
  };

  return {
    source,
    isPresent,
    getValue,
    getValues,
    getLastValue,
    getValueChain,
    getPairs
  };
};

const Tokenizer = {
  tokenize
};
exports.Tokenizer = Tokenizer;

/***/ }),

/***/ "./src/Validation.js":
/*!***************************!*\
  !*** ./src/Validation.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = exports.suppressor = void 0;

var R = _interopRequireWildcard(__webpack_require__(/*! ramda */ "ramda"));

var _objectHash = _interopRequireDefault(__webpack_require__(/*! object-hash */ "object-hash"));

var _gunSuppressor = __webpack_require__(/*! gun-suppressor */ "gun-suppressor");

var sea = _interopRequireWildcard(__webpack_require__(/*! gun-suppressor-sear */ "gun-suppressor-sear"));

var _Schema = __webpack_require__(/*! ./Schema */ "./src/Schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const isLegacyThing = (schema, data) => {
  const dataSoul = R.path(["data", "#"], data);
  const newest = R.without(["comments", "allcomments", "votesup", "votesdown"], R.keys(R.path(["_", ">"], data))).map(key => R.path(["_", ">", key], data)).sort().pop();
  const {
    thingId
  } = _Schema.Schema.ThingData.route.match(dataSoul) || {};
  const id = R.prop("id", data);
  return id && id === thingId && newest && newest < 1543102814945;
};

const thingHashMatchesSoul = (_schema, data) => {
  const id = R.prop("id", data);
  return id && id === (0, _objectHash.default)({
    authorId: (R.path(["author", "#"], data) || "").substr(1) || undefined,
    timestamp: parseInt(R.prop("timestamp", data), 10),
    kind: R.prop("kind", data),
    topic: R.prop("topicName", _Schema.Schema.Topic.route.match(R.path(["topic", "#"], data))),
    opId: R.prop("thingId", _Schema.Schema.Thing.route.match(R.path(["op", "#"], data))),
    replyToId: R.prop("thingId", _Schema.Schema.Thing.route.match(R.path(["replyTo", "#"], data))),
    originalHash: R.prop("originalHash", data)
  });
};

const signedThingDataMatches = (_schema, data) => {
  const authorId = (R.path(["author", "#"], data) || "").substr(1) || undefined;
  const signedId = R.prop("authorId", _Schema.Schema.ThingDataSigned.route.match(R.path(["data", "#"], data)));
  return authorId && authorId === signedId;
};

const thingDataMatchesOriginalHash = (_schema, data) => {
  const originalHash = R.prop("originalHash", data);
  const id = R.prop("thingId", _Schema.Schema.ThingData.route.match(R.path(["data", "#"], data)));
  return id && id === originalHash;
};

const getIsThingRelatedEdge = ajv => (nodeTypeName, data, _pSchema, _cPath, parentData) => {
  const {
    thingId
  } = _Schema.Schema.Thing.route.match(R.path(["_", "#"], parentData) || "") || {};

  const {
    thingId: propThingId
  } = _Schema.Schema[nodeTypeName].route.match(R.prop("#", data) || "");

  if (!thingId || thingId !== propThingId) return false;
  return ajv.compile({
    $ref: `schema.json#/definitions/${nodeTypeName}Edge`
  })(data);
};

const thingDataHashMatches = (_schema, data) => {
  const {
    _,
    ...record
  } = data || {}; // eslint-disable-line no-unused-vars

  record.timestamp = parseFloat(record.timestamp, 10);
  const {
    thingId
  } = _Schema.Schema.ThingData.route.match(R.path(["_", "#"], data) || "") || {};
  return thingId && thingId === (0, _objectHash.default)(record);
};

const isVoteValid = (argon2, schema, prefix, vote) => {
  const {
    algorithm = "argon2d",
    config = {}
  } = schema || {};
  const nonce = Buffer.hasOwnProperty("from") ? Buffer.from(vote, "hex") : new Buffer(vote, "hex");
  const salt = Buffer.hasOwnProperty("from") ? Buffer.from(nonce, "hex") : new Buffer(nonce, "hex");
  const hash = argon2.hash(prefix, {
    salt,
    hashLength: config.hashLength,
    timeCost: config.timeCost,
    memoryCost: config.memoryCost,
    parallelism: config.parallelism,
    raw: true,
    type: argon2[algorithm]
  });
  let off = 0;
  let i;

  for (i = 0; i <= config.complexity - 8; i += 8, off++) {
    if (hash[off] !== 0) return false;
  }

  const mask = 0xff << 8 + i - config.complexity;
  return (hash[off] & mask) === 0;
};

const keysAreProofsOfWork = (schema, data) => {
  const argon2 = __webpack_require__(/*! argon2 */ "argon2");

  if (!argon2) return true; // in browser don't bother for now

  const {
    algorithm = "argon2d"
  } = schema || {};
  const prefix = R.path(["_", "#"], data);

  if (algorithm !== "argon2d") {
    throw new Error("Only argon2 supported for vote hashes");
  }

  R.without(["_"], R.keys(data)).forEach(vote => {
    if (!isVoteValid(argon2, schema, prefix, vote)) {
      console.log("invalid vote", prefix, vote);
      delete data[vote];
    }
  });
  return true;
};

const initAjv = R.compose(ajv => {
  ajv.addKeyword("isLegacyThing", {
    validate: isLegacyThing
  });
  ajv.addKeyword("thingHashMatchesSoul", {
    validate: thingHashMatchesSoul
  });
  ajv.addKeyword("signedThingDataMatchesThing", {
    validate: signedThingDataMatches
  });
  ajv.addKeyword("thingDataMatchesOriginalHash", {
    validate: thingDataMatchesOriginalHash
  });
  ajv.addKeyword("thingRelatedEdge", {
    validate: getIsThingRelatedEdge(ajv)
  });
  ajv.addKeyword("thingDataHashMatchesSoul", {
    validate: thingDataHashMatches
  });
  ajv.addKeyword("keysAreProofsOfWork", {
    validate: keysAreProofsOfWork,
    modifying: true
  });
  return ajv;
}, sea.initAjv);
const suppressor = (0, _gunSuppressor.createSuppressor)({
  definitions: _Schema.Schema.definitions,
  init: initAjv
});
exports.suppressor = suppressor;
const gunWireInput = R.curry((peer, context) => context.on("in", function wireInput(msg) {
  const _ = msg["_"];
  delete msg["_"];
  if ("ping" in msg || "leech" in msg) return;
  if (msg.put && !R.keys(msg.put).length) return;
  const promise = peer.config.disableValidation ? Promise.resolve(msg) : suppressor.validate(msg);
  promise.then(validated => {
    if (!validated) return console.log("msg didn't validate", msg);
    msg["_"] = _;
    return this.to.next(msg);
  }).catch(err => console.error("validate err", msg, err.stack || err));
}));
const Validation = {
  isLegacyThing,
  thingHashMatchesSoul,
  signedThingDataMatches,
  thingDataMatchesOriginalHash,
  getIsThingRelatedEdge,
  thingDataHashMatches,
  isVoteValid,
  keysAreProofsOfWork,
  initAjv,
  suppressor,
  gunWireInput
};
exports.Validation = Validation;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Peer", {
  enumerable: true,
  get: function () {
    return _Peer.Peer;
  }
});
Object.defineProperty(exports, "Config", {
  enumerable: true,
  get: function () {
    return _Config.Config;
  }
});
Object.defineProperty(exports, "Constants", {
  enumerable: true,
  get: function () {
    return _Constants.Constants;
  }
});
Object.defineProperty(exports, "CommentCommand", {
  enumerable: true,
  get: function () {
    return _CommentCommand.CommentCommand;
  }
});
Object.defineProperty(exports, "Listing", {
  enumerable: true,
  get: function () {
    return _Listing.Listing;
  }
});
Object.defineProperty(exports, "ListingOracle", {
  enumerable: true,
  get: function () {
    return _Listing.ListingOracle;
  }
});
Object.defineProperty(exports, "SpaceSpec", {
  enumerable: true,
  get: function () {
    return _Listing.SpaceSpec;
  }
});
Object.defineProperty(exports, "Page", {
  enumerable: true,
  get: function () {
    return _Page.Page;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function () {
    return _Query.Query;
  }
});
Object.defineProperty(exports, "Schema", {
  enumerable: true,
  get: function () {
    return _Schema.Schema;
  }
});
Object.defineProperty(exports, "Thing", {
  enumerable: true,
  get: function () {
    return _Thing.Thing;
  }
});
Object.defineProperty(exports, "ThingSet", {
  enumerable: true,
  get: function () {
    return _Thing.ThingSet;
  }
});
Object.defineProperty(exports, "ThingDataNode", {
  enumerable: true,
  get: function () {
    return _Thing.ThingDataNode;
  }
});
Object.defineProperty(exports, "Validation", {
  enumerable: true,
  get: function () {
    return _Validation.Validation;
  }
});
Object.defineProperty(exports, "Promise", {
  enumerable: true,
  get: function () {
    return _gunScope.Promise;
  }
});
Object.defineProperty(exports, "Tabulator", {
  enumerable: true,
  get: function () {
    return _Tabulator.Tabulator;
  }
});
exports.default = void 0;

var _Peer = __webpack_require__(/*! ./Peer */ "./src/Peer.js");

var _Config = __webpack_require__(/*! ./Config */ "./src/Config.js");

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

var _CommentCommand = __webpack_require__(/*! ./CommentCommand */ "./src/CommentCommand.js");

var _Listing = __webpack_require__(/*! ./Listing */ "./src/Listing/index.js");

var _Page = __webpack_require__(/*! ./Page */ "./src/Page.js");

var _Query = __webpack_require__(/*! ./Query */ "./src/Query.js");

var _Schema = __webpack_require__(/*! ./Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ./Thing */ "./src/Thing/index.js");

var _Validation = __webpack_require__(/*! ./Validation */ "./src/Validation.js");

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Tabulator = __webpack_require__(/*! ./Tabulator */ "./src/Tabulator.js");

var _default = _Peer.Peer.init;
exports.default = _default;

/***/ }),

/***/ "argon2":
/*!*************************!*\
  !*** external "argon2" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_argon2__;

/***/ }),

/***/ "gun-scope":
/*!****************************!*\
  !*** external "gun-scope" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_gun_scope__;

/***/ }),

/***/ "gun-suppressor":
/*!*********************************!*\
  !*** external "gun-suppressor" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_gun_suppressor__;

/***/ }),

/***/ "gun-suppressor-sear":
/*!**************************************!*\
  !*** external "gun-suppressor-sear" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_gun_suppressor_sear__;

/***/ }),

/***/ "object-hash":
/*!******************************!*\
  !*** external "object-hash" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_object_hash__;

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_query_string__;

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ramda__;

/***/ }),

/***/ "route-parser":
/*!*******************************!*\
  !*** external "route-parser" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_route_parser__;

/***/ }),

/***/ "uri-js":
/*!*************************!*\
  !*** external "uri-js" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_uri_js__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInF1ZXJ5LXN0cmluZ1wiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIklOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkNIQVRfUFJFTE9BRF9JVEVNUyIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwicXVlcnkiLCJtdWx0aVRvcGljIiwiZG9tYWluU291cmNlIiwiZG9tYWlucyIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlIiwiaWRzIiwidGhpbmdJZCIsIlRoaW5nIiwicm91dGUiLCJyZXZlcnNlIiwib3BTb3VyY2UiLCJzdWJtaXNzaW9uSWRzIiwibXVsdGlTdWJtaXNzaW9uIiwicmVwbGllc1NvdXJjZSIsInJlcGxpZXNUb0F1dGhvciIsInJlcGxpZXNUb0F1dGhvcklkIiwic291cmNlcyIsImxpc3RpbmciLCJyZXBsaWVzIiwib3AiLCJjdXJhdG9yIiwiYXV0aG9yIiwiZG9tYWluIiwidG9waWMiLCJzb3VyY2VOYW1lcyIsInNvdXJjZU5hbWUiLCJkZWYiLCJmcm9tRGVmaW5pdGlvbiIsIm5hbWUiLCJtZXJnZUxlZnQiLCJMaXN0aW5nRGF0YVNvdXJjZSIsImZyb21Tb3VyY2UiLCJzb3VyY2UiLCJvd25lcklkIiwic3BhY2VOYW1lIiwib2JqIiwiZ2V0VmFsdWUiLCJnZXRWYWx1ZXMiLCJnZXRWYWx1ZUNoYWluIiwiZ2V0UGFpcnMiLCJmcm9tUGFnZUF1dGhvciIsImZyb21QYWdlTmFtZSIsInVuZGVmaW5lZCIsImRpc3BsYXlOYW1lIiwidGFicyIsInVuaXF1ZUJ5Q29udGVudCIsIm1vZGVyYXRvcnMiLCJpbmNsdWRlUmFua3MiLCJzdGlja3lJZHMiLCJpc0lkU3RpY2t5IiwiaXNDaGF0Iiwic3VibWl0VG9waWNzIiwic3VibWl0VG9waWMiLCJjaGF0VG9waWMiLCJ1c2VGb3JDb21tZW50cyIsImJhc2VQYXRoIiwic3VibWl0UGF0aCIsImRlZmF1bHRUYWIiLCJkZWZhdWx0VGFiUGF0aCIsImZpbHRlcnMiLCJmdW5jdGlvbnMiLCJhbGxvdyIsInJlcGxpZXNUbyIsIm9wcyIsImFsaWFzZXMiLCJhdXRob3JzIiwia2luZHMiLCJhbm9uIiwic2lnbmVkIiwiZGVueSIsInRhZ3MiLCJ2b3RlRmlsdGVycyIsInVwc01pbiIsInBhcnNlSW50IiwidXBzTWF4IiwiZG93bnNNaW4iLCJkb3duc01heCIsInNjb3JlTWluIiwic2NvcmVNYXgiLCJjZW5zb3JzIiwidW5pcSIsIkxpc3RpbmdEZWZpbml0aW9uIiwiaW50UGF0aCIsInAiLCJmaWx0ZXJGdW5jdGlvbnMiLCJ2b3RlRmlsdGVyRnVuY3Rpb25zIiwiYWRkRmlsdGVyIiwiZm5zIiwiYWRkVm90ZUZpbHRlciIsInQiLCJpZGVudGljYWwiLCJpdGVtIiwia2luZCIsImFsaWFzIiwibHRlIiwiZ3RlIiwidGhpbmciLCJjbWRzIiwidGFnTmFtZSIsImNvbnRlbnRGaWx0ZXIiLCJ2b3RlRmlsdGVyIiwidGhpbmdGaWx0ZXIiLCJnZXRGaWx0ZXJlZFJvd3MiLCJzcGVjIiwic29ydGVkUm93cyIsImxpbWl0IiwibGltaXRQcm9wIiwiY291bnQiLCJjb3VudFByb3AiLCJhZnRlciIsImZpbHRlckZuIiwicm93cyIsInNsaWNlIiwiZmlsdGVyZWQiLCJmZXRjaEJhdGNoIiwic2l6ZSIsIlByb21pc2UiLCJyb3ciLCJpbkxpc3RpbmciLCJQT1NfSUQiLCJjb25zb2xlIiwibG9nIiwic3BsaWNlIiwiUE9TX1ZBTCIsImdldEZpbHRlcmVkSWRzIiwieCIsInRoaW5nTWV0YSIsInRoaW5nU291bCIsInNjb3JlcyIsIkxpc3RpbmdGaWx0ZXIiLCJQT1NfSURYIiwicm93c1RvSWRzIiwicm93c1RvSXRlbXMiLCJzb3VsRnJvbVBhdGgiLCJwYXRoRnJvbVNvdWwiLCJSZWdFeHAiLCJpZFRvU291bCIsImlkc1RvU291bHMiLCJzb3VsVG9JZCIsIm1hdGNoIiwic291bHNUb0lkcyIsImdldFJvdyIsIm5vZGUiLCJpZHgiLCJpZkVsc2UiLCJpbnNlcnQiLCJhbHdheXMiLCJpdGVtS2V5cyIsImZpbHRlciIsInNlcmlhbGl6ZSIsIml0ZW1zIiwiYWRkSW5kZXgiLCJhc3NvYyIsImRlZmF1bHRUbyIsInNvcnRSb3dzIiwic29ydFdpdGgiLCJhc2NlbmQiLCJjb25kIiwiaXNOaWwiLCJJbmZpbml0eSIsIlQiLCJzb3J0ZWRJZHMiLCJpdGVtc1RvUm93cyIsImRpZmYiLCJ1cGRhdGVkSXRlbXMiLCJyZW1vdmVJZHMiLCJtYXhTaXplIiwicmVtb3ZlZCIsImluZGV4QnkiLCJieUlkIiwiY2hhbmdlcyIsInVwZGF0ZWQiLCJ0b1JlcGxhY2UiLCJtYXhJZHgiLCJwYXJzZWQiLCJyYXdWYWx1ZSIsImkiLCJ2YWx1ZSIsImV4aXN0aW5nIiwiYWxsU29ydGVkIiwic29ydGVkIiwibWlzc2luZyIsImFkZGVkIiwiY29uY2F0IiwiaW5zZXJ0ZWQiLCJwb3AiLCJyZXBsYWNlZCIsImNhdGVnb3JpemVEaWZmIiwib3JpZ2luYWwiLCJhbGxLZXlzIiwiX2RpZmZJZHgiLCJkaWZmSWQiLCJfb3JpZ0lkeCIsIm9yaWdJZCIsInVuaW9uUm93cyIsInVuaXFCeSIsInJvd3NGcm9tU291bHMiLCJyZWFkIiwiTGlzdGluZ05vZGUiLCJ1cGRhdGVMaXN0aW5nIiwib3JjIiwibmV3U2NvcGUiLCJ0b0l0ZW1zIiwid3JpdGUiLCJvblB1dCIsInVwZGF0ZWRTb3VsIiwicHJvcHMiLCJ1cGRhdGVkSWRzIiwic3BlY0Zyb21QYXRoIiwiVGhpbmdWb3RlQ291bnRzIiwiaXNTdGlja3kiLCJlcXVhbHMiLCJnZXRBY2Nlc3NlcyIsImxpc3RlbiIsIkxpc3RpbmdPcmFjbGUiLCJjYWxjdWxhdGVSb3dzIiwic3RpY2t5SXRlbXMiLCJkYXRhU291cmNlIiwiY2FsY3VsYXRlIiwidG9Ob2RlIiwicGF0aHMiLCJzdGlja3lSb3dzIiwiZnJvbVNwZWMiLCJmcm9tUGF0aCIsImdldFNwZWMiLCJoYXNJbmRleGVyIiwibm9kZUZyb21QYXRoIiwiTGlzdGluZ1F1ZXJ5IiwidG9JZHMiLCJ2b3RlU29ydCIsImNvbnRhaW5zIiwidGltZVNvcnQiLCJzb3J0cyIsIm5ldyIsIm11bHRpcGx5Iiwib2xkIiwiYWN0aXZlIiwibGFzdEFjdGl2ZSIsInRvcCIsImNvbW1lbnRzIiwiZGlzY3Vzc2VkIiwic2NvcmUiLCJzZWNvbmRzIiwib3JkZXIiLCJNYXRoIiwibG9nMTAiLCJtYXgiLCJhYnMiLCJob3QiLCJzaWduIiwiYmVzdCIsInVwcyIsImRvd25zIiwibiIsInoiLCJsZWZ0IiwicmlnaHQiLCJzcXJ0IiwidW5kZXIiLCJjb250cm92ZXJzaWFsIiwibWFnbml0dWRlIiwiYmFsYW5jZSIsImlzVmFsaWRTb3J0IiwidG9JdGVtIiwiZnJvbVRoaW5nU2V0cyIsInBpcGUiLCJ1bmlvbiIsIkxpc3RpbmdTb3J0IiwiYXBwbHkiLCJhcCIsIm9mIiwiZ2V0U291cmNlIiwiZXh0cmEiLCJ3aWtpUGFnZSIsIkxpc3RpbmdTcGVjIiwiZ2V0U2lkZWJhciIsIm5vcm1hbFRvcGljcyIsInNwbGl0VG9waWNzIiwic3VibWl0VG8iLCJ0YWIiLCJDaGF0TGlzdGluZyIsIndpdGhSb3V0ZSIsIkNvbW1lbnRMaXN0aW5nIiwiQ29tbWVudGVkTGlzdGluZyIsIkRvbWFpbkxpc3RpbmciLCJGaXJlaG9zZUxpc3RpbmciLCJkaWZmRGF0YSIsInVwZGF0ZWRBdXRob3JlZCIsIm9wSWQiLCJyZXBseUlkcyIsIlRoaW5nQ29tbWVudHMiLCJJbmJveExpc3RpbmciLCJ1c2VyTWV0YSIsIm1ldGEiLCJwcm9maWxlSWQiLCJQcm9maWxlTGlzdGluZyIsInNpZGViYXJQYWdlTmFtZSIsIm9yaWdpbmFsRGF0YSIsInJlbW92ZWRJZHMiLCJ2b3RlQ291bnRzTWF0Y2giLCJ0aGluZ01hdGNoIiwiVGhpbmdEYXRhU2lnbmVkIiwiYXV0aG9yTWF0Y2giLCJTRUFBdXRob3IiLCJmcm9tUGFnZUlkIiwiZXhpc3RpbmdLZXlzIiwid29yayIsIm1ldGhvZCIsInByaW9yaXR5IiwiU3BhY2VMaXN0aW5nIiwiVG9waWNMaXN0aW5nIiwidHlwZXMiLCJ0eXBlc0FycmF5Iiwic2lkZWJhckZyb21QYXRoIiwiRXJyb3IiLCJiYXNlU3BlYyIsIkxpc3RpbmdUeXBlIiwic3BsaXREb21haW5zIiwidG9Mb3dlciIsIlBhdGgiLCJjb25maWdQYWdlTmFtZSIsInNvdXJjZVdpdGhEZWZhdWx0cyIsIm5vZGVUb1NwYWNlTmFtZXMiLCJ1c2VyU3BhY2VOYW1lcyIsInVzZXJQYWdlcyIsIlNwYWNlU3BlYyIsIkxpc3RpbmciLCJ0eXBlRnJvbVBhdGgiLCJ3aXRoTWF0Y2giLCJwYXJhbXMiLCJwcmVsb2FkIiwid2l0aExpc3RpbmdNYXRjaCIsInNpZGViYXIiLCJzcGFjZSIsInByZWxvYWRMaXN0aW5nIiwic3RyaW5naWZ5IiwidGhpbmdTb3VscyIsInRoaW5ncyIsIm11bHRpVGhpbmdNZXRhIiwib3BJZHMiLCJvcFNvdWxzIiwiY2hhdFBhdGgiLCJnZXRDYWNoZSIsInByZWZpeCIsImRlZmF1bHRQcmVmaXgiLCJpZGVudGlmaWVyIiwiZGVmYXVsdElkZW50aWZpZXIiLCJkZWZhdWx0U29ydCIsInJlc3QiLCJ0aGluZ0NvbW1lbnRzIiwic3BhY2VMaXN0aW5nIiwiZGVmYXVsdE5hbWUiLCJkZWZhdWx0QXV0aG9ySWQiLCJzcGFjZVRoaW5nQ29tbWVudHMiLCJzcGFjZVBhdGgiLCJsaXN0aW5nUGF0aCIsInByb2ZpbGUiLCJkZWZhdWx0VHlwZSIsImluYm94IiwiUGFnZSIsImluaXQiLCJjb25maWciLCJsZWVjaCIsImRpc2FibGVWYWxpZGF0aW9uIiwibm9HdW4iLCJsb2NhbFN0b3JhZ2UiLCJwZXJzaXN0IiwiY2ZnIiwicmFkaXNrIiwib24iLCJndW5XaXJlSW5wdXQiLCJzdG9yZUZuIiwic3RvcmUiLCJhIiwicmV0cnkiLCJzZW5kTGVlY2giLCJfIiwiY3JlYXRlU2NvcGUiLCJzdWJtaXQiLCJjb21tZW50IiwiY2hhdCIsIndyaXRlUGFnZSIsInZvdGUiLCJxdWVyaWVzIiwiUGVlciIsImVtcHR5UHJvbWlzZSIsInVuaW9uQXJyYXlzIiwidG9waWNTb3VscyIsImRheXMiLCJkYXlTdHJpbmdzIiwib25lRGF5Iiwic3RhcnQiLCJEYXRlIiwiZ2V0VGltZSIsImRheVN0ciIsIk9iamVjdCIsInRvcGljTmFtZSIsImRzIiwic2luZ2xlVG9waWMiLCJ0U291bHMiLCJpdGVtTWF4IiwiZmV0Y2hNb3JlIiwidG9waWNTb3VsIiwibW9yZSIsInNpbmdsZURvbWFpbiIsIkRvbWFpbiIsImRvbWFpbk5hbWUiLCJzaW5nbGVBdXRob3IiLCJzdWJtaXNzaW9ucyIsImxpc3RpbmdJZHMiLCJzaW5nbGVMaXN0aW5nIiwiYXV0aG9yZWRTb3VscyIsImF1dGhvcmVkU291bCIsInNpbmdsZVN1Ym1pc3Npb24iLCJUaGluZ0FsbENvbW1lbnRzIiwic3VibWlzc2lvbklkIiwicHJlcGVuZCIsInJlcGx5VG9Tb3VsIiwib3BTb3VsIiwidGhpbmdpZCIsInJlcGx5VG9JZCIsIm11bHRpUXVlcnkiLCJzaW5nbGVRdWVyeSIsInBsdXJhbCIsInNpbmdsZSIsImNvbGxhdGUiLCJ0aGluZ0RhdGFGcm9tU291bHMiLCJjdXJhdGVkIiwic3VibWlzc2lvbk9ubHkiLCJpZHMxIiwiaWRzMiIsInRoaW5nU2NvcmVzIiwidm90ZXMiLCJwcm9taXNlcyIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsImNyZWF0ZWRBdCIsIm5hYiIsIlF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzZWEiLCJBVVRIX1NDSEVNQSIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIlRvcGljRGF5IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiJHJlZiIsInllYXIiLCJtaW5pbXVtIiwibWF4aW11bSIsIm1vbnRoIiwiZGF5IiwicmVxdWlyZWQiLCJwcm9wc0Zyb21Tb3VsIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlZGdlTWF0Y2hlc0tleSIsImFueU9mIiwiVG9waWMiLCJ1cmwiLCJVUkwiLCJhbGxPZiIsInRoaW5nS2luZCIsIm9yaWdpbmFsSGFzaCIsIm9uZU9mIiwidGhpbmdSZWxhdGVkRWRnZSIsImFsbGNvbW1lbnRzIiwidm90ZXN1cCIsInZvdGVzZG93biIsInJlcGx5VG8iLCJ0aGluZ0hhc2hNYXRjaGVzU291bCIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZyIsInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2giLCJpc0xlZ2FjeVRoaW5nIiwiUHJvb2ZPZldvcmtWb3RlcyIsIiRhc3luYyIsImtleXNBcmVQcm9vZnNPZldvcmsiLCJhbGdvcml0aG0iLCJjb21wbGV4aXR5IiwiaGFzaExlbmd0aCIsInRpbWVDb3N0IiwibWVtb3J5Q29zdCIsInBhcmFsbGVsaXNtIiwiVGhpbmdWb3Rlc1VwIiwiVGhpbmdWb3Rlc0Rvd24iLCJUaGluZ0RhdGEiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWwiLCJ1cCIsImRvd24iLCJjb21tYW5kcyIsIkxpc3RpbmdEYXRhIiwidXNlcklkIiwicGF0dGVyblByb3BlcnRpZXMiLCJzb3J0TmFtZSIsImVudW0iLCJUaGluZ0NvbW1lbnRzTGlzdGluZyIsInVzZXJMaXN0aW5nVHlwZSIsIkF1dGhvclJlcGxpZXNMaXN0aW5nIiwiQXV0aG9yUHJvZmlsZUxpc3RpbmciLCJBdXRob3JDb21tZW50cyIsIkF1dGhvclN1Ym1pc3Npb25zIiwiQXV0aG9yVGhpbmdzIiwicm91dGVzIiwiZGVmc1dpdGhSb3V0ZXMiLCJTY2hlbWEiLCJ0YWJ1bGF0b3JRdWVyeSIsInJlcGx5U291bHMiLCJjb21tYW5kTWFwIiwiSlNPTiIsIlRhYnVsYXRvciIsInRvcGljUHJlZml4ZXMiLCJjaGF0bXNnIiwiYmluZCIsImluZGV4IiwicmVjdiIsInRkIiwib2ZmIiwidG9waWNQcmVmaXgiLCJiYXNlVG9waWNOYW1lIiwidG9Mb3dlckNhc2UiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInNldCIsInVybEluZm8iLCJob3N0Iiwic2NoZW1lIiwidXJsTm9kZSIsInB1dCIsImRhdGFTb3VsIiwibWV0YURhdGEiLCJwdWIiLCJ0aGluZ3NTb3VsIiwic3VibWlzc2lvbnNTb3VsIiwiY29tbWVudHNTb3VsIiwicmVqZWN0IiwicGFnZXNTb3VsIiwiY2hhaW4iLCJub25jZSIsInVybFN0ciIsIlRoaW5nRGF0YU5vZGUiLCJkaXNzb2MiLCJkIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImRheU51bSIsImdldFVUQ0RhdGUiLCJUaGluZ1NldCIsInRva2VuTWFwIiwibGluZSIsInRva2VucyIsImNoZWNrIiwia2V5c0luIiwiZ2V0TGFzdFZhbHVlIiwibmV4dCIsInBhaXJzIiwiVG9rZW5pemVyIiwic2NoZW1hIiwibmV3ZXN0IiwiX3NjaGVtYSIsInN1YnN0ciIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXMiLCJzaWduZWRJZCIsImdldElzVGhpbmdSZWxhdGVkRWRnZSIsImFqdiIsIm5vZGVUeXBlTmFtZSIsIl9wU2NoZW1hIiwiX2NQYXRoIiwicGFyZW50RGF0YSIsInByb3BUaGluZ0lkIiwiY29tcGlsZSIsInRoaW5nRGF0YUhhc2hNYXRjaGVzIiwicmVjb3JkIiwiaXNWb3RlVmFsaWQiLCJhcmdvbjIiLCJCdWZmZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImZyb20iLCJzYWx0IiwiaGFzaCIsInJhdyIsIm1hc2siLCJyZXF1aXJlIiwiaW5pdEFqdiIsImFkZEtleXdvcmQiLCJ2YWxpZGF0ZSIsIm1vZGlmeWluZyIsInN1cHByZXNzb3IiLCJjb250ZXh0Iiwid2lyZUlucHV0IiwibXNnIiwicHJvbWlzZSIsInZhbGlkYXRlZCIsInRvIiwiY2F0Y2giLCJlcnJvciIsInN0YWNrIiwiVmFsaWRhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBRUEsTUFBTUEsTUFBTSxHQUFHQyxDQUFDLENBQUNDLEtBQUYsQ0FDYixDQUFDQyxJQUFELEVBQU9DLFFBQVAsRUFBaUJDLFFBQWpCLEVBQTJCQyxJQUFJLEdBQUcsRUFBbEMsS0FDRSxzQkFBWSxD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QTs7QUFDQTs7ZUFDZSxXQUFLVixJOzs7Ozs7Ozs7Ozs7QUNicEIsb0Q7Ozs7Ozs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsaUU7Ozs7Ozs7Ozs7O0FDQUEseUQ7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsb0QiLCJmaWxlIjoibm90YWJ1Zy1wZWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXJnb24yXCIpLCByZXF1aXJlKFwiZ3VuLXNjb3BlXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3JcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIpLCByZXF1aXJlKFwib2JqZWN0LWhhc2hcIiksIHJlcXVpcmUoXCJxdWVyeS1zdHJpbmdcIiksIHJlcXVpcmUoXCJyYW1kYVwiKSwgcmVxdWlyZShcInJvdXRlLXBhcnNlclwiKSwgcmVxdWlyZShcInVyaS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIm5vdGFidWctcGVlclwiLCBbXCJhcmdvbjJcIiwgXCJndW4tc2NvcGVcIiwgXCJndW4tc3VwcHJlc3NvclwiLCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiwgXCJvYmplY3QtaGFzaFwiLCBcInF1ZXJ5LXN0cmluZ1wiLCBcInJhbWRhXCIsIFwicm91dGUtcGFyc2VyXCIsIFwidXJpLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5vdGFidWctcGVlclwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicXVlcnktc3RyaW5nXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5vdGFidWctcGVlclwiXSA9IGZhY3Rvcnkocm9vdFtcImFyZ29uMlwiXSwgcm9vdFtcImd1bi1zY29wZVwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yXCJdLCByb290W1wiZ3VuLXN1cHByZXNzb3Itc2VhclwiXSwgcm9vdFtcIm9iamVjdC1oYXNoXCJdLCByb290W1wicXVlcnktc3RyaW5nXCJdLCByb290W1wicmFtZGFcIl0sIHJvb3RbXCJyb3V0ZS1wYXJzZXJcIl0sIHJvb3RbXCJ1cmktanNcIl0pO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3Njb3BlX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3JfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfb2JqZWN0X2hhc2hfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9xdWVyeV9zdHJpbmdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JvdXRlX3BhcnNlcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3VyaV9qc19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcblxuY29uc3Qgc2lnbnVwID0gUi5jdXJyeShcbiAgKHBlZXIsIHVzZXJuYW1lLCBwYXNzd29yZCwgb3B0cyA9IHt9KSA9PlxuICAgIG5ldyBQcm9taXNlKChvaywgZmFpbCkgPT4ge1xuICAgICAgaWYgKHBlZXIgJiYgcGVlci5ndW4gJiYgcGVlci5ndW4udXNlcikge1xuICAgICAgICBjb25zdCB1c2VyID0gcGVlci5ndW4udXNlcigpO1xuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICB1c2VyLmNyZWF0ZShcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBhY2sgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWNrLmVycikge1xuICAgICAgICAgICAgICAgIGZhaWwoYWNrLmVycik7XG4gICAgICAgICAgICAgICAgdXNlci5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgIHBlZXIuZ3VuLnVzZXIoKS5sZWF2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZXIubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKG9rKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdHNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICB9XG4gICAgfSlcbik7XG5cbmNvbnN0IGxvZ2luID0gUi5jdXJyeSgocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkKSA9PlxuICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICBjb25zdCB1c2VyID0gcGVlci5ndW4udXNlcigpO1xuXG4gICAgICB1c2VyLmF1dGgodXNlcm5hbWUsIHBhc3N3b3JkLCBhY2sgPT5cbiAgICAgICAgYWNrLmVyciA/IGZhaWwoYWNrLmVycikgOiBvayhwZWVyLmd1bi51c2VyKCkuaXMpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgfVxuICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgcGVlci5fb25Mb2dpbiAmJiBwZWVyLl9vbkxvZ2luKHJlc3VsdCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgbG9nb3V0ID0gcGVlciA9PiBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbmNvbnN0IGlzTG9nZ2VkSW4gPSBwZWVyID0+IHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIgJiYgcGVlci5ndW4udXNlcigpLmlzO1xuY29uc3Qgb25Mb2dpbiA9IFIuY3VycnkoKHBlZXIsIGZuKSA9PiAocGVlci5fb25Mb2dpbiA9IGZuKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZXhwb3J0IGNvbnN0IEF1dGhlbnRpY2F0aW9uID0ge1xuICBzaWdudXAsXG4gIGxvZ2luLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIG9uTG9naW5cbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IHRva2VuaXplID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnRyaW0pLFxuICBSLnNwbGl0KFwiIFwiKSxcbiAgUi5yZXBsYWNlKENvbnN0YW50cy5DT01NQU5EX1JFLCBcIlwiKSxcbiAgUi5wcm9wT3IoXCJcIiwgMCksXG4gIFIuc3BsaXQoXCJcXG5cIilcbik7XG5cbmNvbnN0IG1hcCA9IHRoaW5nRGF0YSA9PlxuICBSLnJlZHVjZShcbiAgICAoY21kTWFwLCBpZCkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IFIucGF0aChbaWQsIFwiYm9keVwiXSwgdGhpbmdEYXRhKTtcbiAgICAgIGNvbnN0IGF1dGhvcklkID0gUi5wYXRoKFtpZCwgXCJhdXRob3JJZFwiXSwgdGhpbmdEYXRhKSB8fCBcImFub25cIjtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBhcnNlRmxvYXQoUi5wYXRoKFtpZCwgXCJ0aW1lc3RhbXBcIl0sIHRoaW5nRGF0YSkpO1xuXG4gICAgICBpZiAoIVIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSwgYm9keSkpIHJldHVybiBjbWRNYXA7XG4gICAgICBjb25zdCB0b2tlbml6ZWQgPSBbYXV0aG9ySWQsIC4uLnRva2VuaXplKGJvZHkpLCBpZF07XG5cbiAgICAgIHJldHVybiBSLmFzc29jUGF0aCh0b2tlbml6ZWQsIHRpbWVzdGFtcCB8fCAwLCBjbWRNYXApO1xuICAgIH0sXG4gICAge30sXG4gICAgUi5rZXlzKHRoaW5nRGF0YSlcbiAgKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRDb21tYW5kID0geyB0b2tlbml6ZSwgbWFwIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBDb25maWcgPSB7XG4gIHRhYnVsYXRvcjogQ29uc3RhbnRzLklOREVYRVIsXG4gIGluZGV4ZXI6IENvbnN0YW50cy5JTkRFWEVSLFxuICBvd25lcjogQ29uc3RhbnRzLklOREVYRVIsXG4gIHVwZGF0ZTogUi5jb21wb3NlKFxuICAgIFIubWFwKChba2V5LCB2YWxdKSA9PiAoQ29uZmlnW2tleV0gPSB2YWwpKSxcbiAgICBSLnRvUGFpcnNcbiAgKVxufTtcbiIsImNvbnN0IENPTU1BTkRfUkUgPSAvXiB7NH1+LztcbmNvbnN0IFBSRUZJWCA9IFwibmFiXCI7XG5jb25zdCBTT1VMX0RFTElNRVRFUiA9IFwifH5+fFwiO1xuXG5jb25zdCBMSVNUSU5HX1NJWkUgPSAxMDAwO1xuXG5jb25zdCBNQVhfSEFTSF9TSVpFID0gNjQ7XG5jb25zdCBNQVhfUE9XX05PTkNFX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9UT1BJQ19TSVpFID0gNDI7XG5jb25zdCBNQVhfQVVUSE9SX0FMSUFTX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfQVVUSE9SX0lEX1NJWkUgPSAxMjg7IC8vID8/P1xuY29uc3QgTUFYX1VSTF9TSVpFID0gMjA0ODtcbmNvbnN0IE1BWF9ET01BSU5fU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9USElOR19LSU5EX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9USElOR19USVRMRV9TSVpFID0gMzAwO1xuY29uc3QgTUFYX1RISU5HX0JPRFlfU0laRSA9IDUwMDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19JRFNfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1RBQlNfU0laRSA9IDUwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFID0gTUFYX0FVVEhPUl9JRF9TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSA9IDE2O1xuXG5jb25zdCBDSEFUX1BSRUxPQURfSVRFTVMgPSAxMDtcblxuY29uc3QgSU5ERVhFUiA9XG4gIFwiQ0V5S3JEZDF4eVBYcFdTVjAwTWd2blpZMlZKTEhYZ3pDdmhNZUR3S1RZQS55alNxMER5WHp6aEJfWlhyX0R6ZkpnaWozdFhVMC0zdDBRNWJKQXRacGo4XCI7XG5cbmV4cG9ydCBjb25zdCBDb25zdGFudHMgPSB7XG4gIENPTU1BTkRfUkUsXG4gIFBSRUZJWCxcbiAgU09VTF9ERUxJTUVURVIsXG4gIExJU1RJTkdfU0laRSxcbiAgTUFYX0hBU0hfU0laRSxcbiAgTUFYX1BPV19OT05DRV9TSVpFLFxuICBNQVhfVE9QSUNfU0laRSxcbiAgTUFYX0FVVEhPUl9BTElBU19TSVpFLFxuICBNQVhfQVVUSE9SX0lEX1NJWkUsXG4gIE1BWF9VUkxfU0laRSxcbiAgTUFYX0RPTUFJTl9TSVpFLFxuICBNQVhfVEhJTkdfS0lORF9TSVpFLFxuICBNQVhfVEhJTkdfVElUTEVfU0laRSxcbiAgTUFYX1RISU5HX0JPRFlfU0laRSxcbiAgTUFYX0xJU1RJTkdfSURTX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFLFxuICBNQVhfTElTVElOR19UQUJTX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfS0lORF9TSVpFLFxuICBDSEFUX1BSRUxPQURfSVRFTVMsXG4gIElOREVYRVJcbn07XG4iLCIvKiBnbG9iYWxzIEd1biAqL1xuaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcblxuY29uc3Qgc291bCA9IFIucGF0aE9yKFwiXCIsIFtcIl9cIiwgXCIjXCJdKTtcbmNvbnN0IHN0YXRlID0gUi5wYXRoT3Ioe30sIFtcIl9cIiwgXCI+XCJdKTtcblxuY29uc3QgbGF0ZXN0ID0gUi5jb21wb3NlKFxuICBSLmxhc3QsXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLnZhbHVlcyxcbiAgc3RhdGVcbik7XG5cbmNvbnN0IGVkZ2VzID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnByb3AoXCIjXCIpKSxcbiAgUi52YWx1ZXNcbik7XG5cbmZ1bmN0aW9uIGRlY29kZVNFQShyYXdEYXRhKSB7XG4gIGNvbnN0IGRhdGEgPSByYXdEYXRhID8geyAuLi5yYXdEYXRhIH0gOiByYXdEYXRhO1xuICBjb25zdCBzb3VsID0gUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKTtcblxuICBpZiAoIXNvdWwgfHwgIUd1bi5TRUEgfHwgc291bC5pbmRleE9mKFwiflwiKSA9PT0gLTEpIHJldHVybiByYXdEYXRhO1xuICBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgR3VuLlNFQS52ZXJpZnkoXG4gICAgICBHdW4uU0VBLm9wdC5wYWNrKHJhd0RhdGFba2V5XSwga2V5LCByYXdEYXRhLCBzb3VsKSxcbiAgICAgIGZhbHNlLFxuICAgICAgcmVzID0+IChkYXRhW2tleV0gPSBHdW4uU0VBLm9wdC51bnBhY2socmVzLCBrZXksIHJhd0RhdGEpKVxuICAgICk7XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCBjb25zdCBHdW5Ob2RlID0geyBzb3VsLCBzdGF0ZSwgbGF0ZXN0LCBlZGdlcywgZGVjb2RlU0VBIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSwgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcblxuY29uc3QgbmVlZHNTY29yZXMgPSBkZWZpbml0aW9uID0+XG4gICEhUi5maW5kKGRlZmluaXRpb24uaXNQcmVzZW50LCBbXG4gICAgXCJzb3J0IGhvdFwiLFxuICAgIFwic29ydCB0b3BcIixcbiAgICBcInNvcnQgYmVzdFwiLFxuICAgIFwic29ydCBjb250cm92ZXJzaWFsXCIsXG4gICAgXCJ1cHNcIixcbiAgICBcImRvd25zXCIsXG4gICAgXCJzY29yZVwiLFxuICAgIFwiY2FuIHJlbW92ZVwiXG4gIF0pO1xuXG5jb25zdCBuZWVkc0RhdGEgPSBkZWZpbml0aW9uID0+XG4gICEhUi5maW5kKGRlZmluaXRpb24uaXNQcmVzZW50LCBbXG4gICAgXCJ0b3BpY1wiLFxuICAgIFwiZG9tYWluXCIsXG4gICAgXCJhdXRob3JcIixcbiAgICBcInVuaXF1ZSBieSBjb250ZW50XCIsXG4gICAgXCJraW5kXCIsXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJyZXF1aXJlIHNpZ25lZFwiLFxuICAgIFwicmVxdWlyZSBhbm9uXCIsXG4gICAgXCJhbGlhc1wiLFxuICAgIFwiYmFuIGRvbWFpblwiLFxuICAgIFwiYmFuIHRvcGljXCIsXG4gICAgXCJiYW4gYXV0aG9yXCIsXG4gICAgXCJiYW4gYWxpYXNcIlxuICBdKTtcblxuY29uc3QgaXRlbXNGcm9tVGhpbmdTb3VscyA9IHF1ZXJ5KChzY29wZSwgc291bHMsIGRlZmluaXRpb24pID0+XG4gIFByb21pc2UuYWxsKFxuICAgIFIubWFwKHNvdWwgPT4gTGlzdGluZ1NvcnQuaXRlbUZyb21Tb3VsKHNjb3BlLCBzb3VsLCBkZWZpbml0aW9uKSwgc291bHMpXG4gICkudGhlbihMaXN0aW5nU29ydC5zb3J0SXRlbXMpXG4pO1xuXG5jb25zdCBpdGVtc0Zyb21UaGluZ1NldHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSA9PlxuICBQcm9taXNlLmFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSlcbiAgICAudGhlbihSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KSlcbiAgICAudGhlbihUaGluZ1NldC5zb3VscylcbiAgICAudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpXG4pO1xuXG5jb25zdCBsaXN0aW5nU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IGxpc3RpbmdzID0gUi5wYXRoT3IoW10sIFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImxpc3RpbmdzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChsID0+IGAke2x9LyR7c29ydH1gLCBsaXN0aW5ncyk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzIH07XG59O1xuXG5jb25zdCB0b3BpY1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IHRvcGljcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0b3BpY3NcIl0sIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghdG9waWNzLmxlbmd0aCkgdG9waWNzLnB1c2goXCJhbGxcIik7XG4gIC8vIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKHQgPT4gYC90LyR7dH0vJHtzb3J0fWAsIHRvcGljcyk7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL3QvJHt0b3BpY3Muc29ydCgpLmpvaW4oXCIrXCIpfS8ke3NvcnR9YF07XG5cbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpVG9waWMoc2NvcGUsIHsgdG9waWNzLCBzb3J0IH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgZG9tYWluU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZG9tYWlucyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJkb21haW5zXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWRvbWFpbnMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIC8vIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGQgPT4gYC9kb21haW4vJHtkfS8ke3NvcnR9YCwgZG9tYWlucyk7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL2RvbWFpbi8ke2RvbWFpbnMuc29ydCgpLmpvaW4oXCIrXCIpfS8ke3NvcnR9YF07XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aURvbWFpbihzY29wZSwgeyBkb21haW5zLCBzb3J0IH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgYXV0aG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgYXV0aG9ySWRzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImF1dGhvcnNcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB0eXBlID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInR5cGVcIl0sIGRlZmluaXRpb24pO1xuXG4gIGlmICghYXV0aG9ySWRzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vJHt0eXBlfS8ke3NvcnR9YCwgYXV0aG9ySWRzKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpQXV0aG9yKHNjb3BlLCB7IHR5cGUsIGF1dGhvcklkcyB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGN1cmF0b3JTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBjdXJhdG9ycyA9IFIucHJvcChcImN1cmF0b3JzXCIsIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghY3VyYXRvcnMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGlkID0+IGAvdXNlci8ke2lkfS9jb21tZW50ZWQvJHtzb3J0fWAsIGN1cmF0b3JzKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5LmN1cmF0ZShzY29wZSwgY3VyYXRvcnMsIHRydWUpXG4gICAgICAudGhlbihpZHMgPT4gaWRzLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkpXG4gICAgICAudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IG9wU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3Qgc3VibWlzc2lvbklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJvcHNcIl0sIGRlZmluaXRpb24pO1xuXG4gIGlmICghc3VibWlzc2lvbklkcy5sZW5ndGgpIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChcbiAgICBpZCA9PiBgL3RoaW5ncy8ke2lkfS9jb21tZW50cy8ke3NvcnR9YCxcbiAgICBzdWJtaXNzaW9uSWRzXG4gICk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVN1Ym1pc3Npb24oc2NvcGUsIHsgc3VibWlzc2lvbklkcyB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHJlcGxpZXNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBpZCA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJyZXBsaWVzVG9cIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB0eXBlID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInR5cGVcIl0sIGRlZmluaXRpb24pO1xuXG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL3VzZXIvJHtpZH0vcmVwbGllcy8ke3R5cGV9LyR7c29ydH1gXTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5LnJlcGxpZXNUb0F1dGhvcihzY29wZSwge1xuICAgICAgdHlwZSxcbiAgICAgIHJlcGxpZXNUb0F1dGhvcklkOiBpZCxcbiAgICAgIGluZGV4ZXI6IGRlZmluaXRpb24uaW5kZXhlclxuICAgIH0pLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBzb3VyY2VzID0ge1xuICBsaXN0aW5nOiBsaXN0aW5nU291cmNlLFxuICByZXBsaWVzOiByZXBsaWVzU291cmNlLFxuICBvcDogb3BTb3VyY2UsXG4gIGN1cmF0b3I6IGN1cmF0b3JTb3VyY2UsXG4gIGF1dGhvcjogYXV0aG9yU291cmNlLFxuICBkb21haW46IGRvbWFpblNvdXJjZSxcbiAgdG9waWM6IHRvcGljU291cmNlXG59O1xuXG5jb25zdCBzb3VyY2VOYW1lcyA9IFIua2V5cyhzb3VyY2VzKTtcbmNvbnN0IHNvdXJjZU5hbWUgPSBkZWYgPT4gUi5maW5kKGRlZi5pc1ByZXNlbnQsIHNvdXJjZU5hbWVzKSB8fCBcInRvcGljXCI7XG5jb25zdCBmcm9tRGVmaW5pdGlvbiA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBuYW1lID0gc291cmNlTmFtZShkZWZpbml0aW9uKTtcblxuICByZXR1cm4gUi5tZXJnZUxlZnQoeyBuYW1lIH0sIHNvdXJjZXNbbmFtZV0oZGVmaW5pdGlvbikpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEYXRhU291cmNlID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgc291cmNlcyxcbiAgbmVlZHNTY29yZXMsXG4gIG5lZWRzRGF0YSxcbiAgaXRlbXNGcm9tVGhpbmdTZXRzLFxuICBpdGVtc0Zyb21UaGluZ1NvdWxzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IChzb3VyY2UsIG93bmVySWQgPSBudWxsLCBzcGFjZU5hbWUgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuICBjb25zdCBvYmogPSB7IC4uLnRva2VuaXplZCB9O1xuICBjb25zdCB7IGlzUHJlc2VudCwgZ2V0VmFsdWUsIGdldFZhbHVlcywgZ2V0VmFsdWVDaGFpbiwgZ2V0UGFpcnMgfSA9IHRva2VuaXplZDtcblxuICBbXG4gICAgb2JqLmZyb21QYWdlQXV0aG9yID0gb3duZXJJZCxcbiAgICBvYmouZnJvbVBhZ2VOYW1lID0gc3BhY2VOYW1lID8gYHNwYWNlOiR7c3BhY2VOYW1lfWAgOiB1bmRlZmluZWRcbiAgXSA9IGdldFZhbHVlQ2hhaW4oXCJzb3VyY2VkIGZyb20gcGFnZVwiKTtcbiAgb2JqLmRpc3BsYXlOYW1lID0gdG9rZW5pemVkLmdldFZhbHVlKFwibmFtZVwiKSB8fCBzcGFjZU5hbWU7XG4gIG9iai5pbmRleGVyID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgQ29uZmlnLmluZGV4ZXI7XG4gIG9iai50YWJ1bGF0b3IgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBvYmouaW5kZXhlcjtcbiAgb2JqLnRhYnMgPSBnZXRQYWlycyhcInRhYlwiKTtcbiAgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInNvcnRcIik7XG5cbiAgLy8gVE9ETzogYnJlYWtzIHdpdGggY3VzdG9tIG5hbWVzXG4gIGlmIChvYmouc29ydCA9PT0gXCJkZWZhdWx0XCIpIG9iai5zb3J0ID0gZ2V0VmFsdWUoXCJ0YWJcIik7XG5cbiAgb2JqLnVuaXF1ZUJ5Q29udGVudCA9ICEhaXNQcmVzZW50KFwidW5pcXVlIGJ5IGNvbnRlbnRcIik7XG4gIG9iai5jdXJhdG9ycyA9IGdldFZhbHVlcyhcImN1cmF0b3JcIik7XG4gIG9iai5tb2RlcmF0b3JzID0gZ2V0VmFsdWVzKFwibW9kXCIpO1xuICBvYmouaW5jbHVkZVJhbmtzID0gISFpc1ByZXNlbnQoXCJzaG93IHJhbmtzXCIpO1xuICBvYmouc3RpY2t5SWRzID0gZ2V0VmFsdWVzKFwic3RpY2t5XCIpO1xuICBvYmouaXNJZFN0aWNreSA9IGlkID0+ICEhdG9rZW5pemVkLmlzUHJlc2VudChbXCJzdGlja3lcIiwgaWRdKTtcbiAgb2JqLmlzQ2hhdCA9ICEhaXNQcmVzZW50KFwiZGlzcGxheSBhcyBjaGF0XCIpO1xuICBvYmouc3VibWl0VG9waWNzID0gZ2V0VmFsdWVzKFwic3VibWl0IHRvXCIpO1xuICBvYmouc3VibWl0VG9waWMgPSBnZXRWYWx1ZShcInN1Ym1pdCB0b1wiKTtcbiAgb2JqLmNoYXRUb3BpYyA9IGdldFZhbHVlKFwiY2hhdCBpblwiKTtcblxuICBpZiAob3duZXJJZCAmJiBzcGFjZU5hbWUpIHtcbiAgICBvYmouc3BhY2VOYW1lID0gc3BhY2VOYW1lO1xuICAgIG9iai5vd25lciA9IG93bmVySWQ7XG4gICAgb2JqLnVzZUZvckNvbW1lbnRzID0gIXRva2VuaXplZC5pc1ByZXNlbnQoXCJjb21tZW50cyBsZWF2ZSBzcGFjZVwiKTtcbiAgICBvYmouYmFzZVBhdGggPSBgL3VzZXIvJHtvd25lcklkfS9zcGFjZXMvJHtzcGFjZU5hbWV9YDtcbiAgICBpZiAob2JqLnN1Ym1pdFRvcGljKSBvYmouc3VibWl0UGF0aCA9IGAke29iai5iYXNlUGF0aH0vc3VibWl0YDtcbiAgICBvYmouZGVmYXVsdFRhYiA9IHRva2VuaXplZC5nZXRWYWx1ZShcInRhYlwiKTtcbiAgICBvYmouZGVmYXVsdFRhYlBhdGggPSBvYmouZGVmYXVsdFRhYlxuICAgICAgPyB0b2tlbml6ZWQuZ2V0VmFsdWUoW1widGFiXCIsIG9iai5kZWZhdWx0VGFiXSlcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIG9iai5maWx0ZXJzID0ge1xuICAgIGZ1bmN0aW9uczogW10sXG4gICAgYWxsb3c6IHtcbiAgICAgIHJlcGxpZXNUbzogZ2V0VmFsdWUoXCJyZXBsaWVzIHRvIGF1dGhvclwiKSxcbiAgICAgIHR5cGU6IGdldFZhbHVlKFwidHlwZVwiKSwgLy8gVE9ETzogdGhpcyBmaWVsZCBzZWVtcyByZWR1bmRhbnQgd2l0aCBraW5kIGFuZCBzaG91bGQgYmUgZGVwcmVjYXRlZFxuICAgICAgb3BzOiBnZXRWYWx1ZXMoXCJvcFwiKSxcbiAgICAgIGFsaWFzZXM6IGdldFZhbHVlcyhcImFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYXV0aG9yXCIpLFxuICAgICAgZG9tYWluczogZ2V0VmFsdWVzKFwiZG9tYWluXCIpLFxuICAgICAgdG9waWNzOiBnZXRWYWx1ZXMoXCJ0b3BpY1wiKSxcbiAgICAgIGxpc3RpbmdzOiBnZXRWYWx1ZXMoXCJsaXN0aW5nXCIpLFxuICAgICAga2luZHM6IGdldFZhbHVlcyhcImtpbmRcIiksXG4gICAgICBhbm9uOiAhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICFpc1ByZXNlbnQoXCJyZXF1aXJlIGFub25cIilcbiAgICB9LFxuICAgIGRlbnk6IHtcbiAgICAgIGFsaWFzZXM6IGdldFZhbHVlcyhcImJhbiBhbGlhc1wiKSxcbiAgICAgIGF1dGhvcnM6IGdldFZhbHVlcyhcImJhbiBhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJiYW4gZG9tYWluXCIpLFxuICAgICAgdG9waWNzOiBnZXRWYWx1ZXMoXCJiYW4gdG9waWNcIiksXG4gICAgICBhbm9uOiAhIWlzUHJlc2VudChcInJlcXVpcmUgc2lnbmVkXCIpLFxuICAgICAgc2lnbmVkOiAhIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKSxcbiAgICAgIHRhZ3M6IGdldFBhaXJzKFwiY2FuIHJlbW92ZVwiKVxuICAgIH1cbiAgfTtcblxuICBvYmoudm90ZUZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICB1cHNNaW46IHBhcnNlSW50KGdldFZhbHVlKFwidXBzIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICB1cHNNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwidXBzIGJlbG93XCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgZG93bnNNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwiZG93bnMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWluOiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBzY29yZU1heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJzY29yZSBiZWxvd1wiKSwgMTApIHx8IG51bGxcbiAgfTtcblxuICBvYmouY2Vuc29ycyA9IFIudW5pcShSLm1hcChSLnByb3AoMSksIG9iai5maWx0ZXJzLmRlbnkudGFncykpO1xuICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEZWZpbml0aW9uID0geyBmcm9tU291cmNlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcblxuY29uc3QgaW50UGF0aCA9IHAgPT5cbiAgUi5jb21wb3NlKFxuICAgIHBhcnNlSW50LFxuICAgIFIucGF0aChwKVxuICApO1xuXG5jb25zdCBmcm9tRGVmaW5pdGlvbiA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IGZpbHRlcnMsIHZvdGVGaWx0ZXJzLCBpc1ByZXNlbnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IFtdO1xuICBjb25zdCB2b3RlRmlsdGVyRnVuY3Rpb25zID0gW107XG5cbiAgY29uc3QgYWRkRmlsdGVyID0gKC4uLmZucykgPT4gZmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuICBjb25zdCBhZGRWb3RlRmlsdGVyID0gKC4uLmZucykgPT4gdm90ZUZpbHRlckZ1bmN0aW9ucy5wdXNoKFIuY29tcG9zZSguLi5mbnMpKTtcblxuICBpZiAoZmlsdGVycy5hbGxvdy5hbGlhc2VzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJhbGlhc1wiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9yXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LmF1dGhvcnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImF1dGhvclwiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuZG9tYWlucy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgdCA9PiAhIWlzUHJlc2VudChbXCJkb21haW5cIiwgdF0pLFxuICAgICAgVGhpbmdEYXRhTm9kZS5kb21haW4sXG4gICAgICBSLnByb3AoXCJkYXRhXCIpXG4gICAgKTtcblxuICBpZiAoXG4gICAgZmlsdGVycy5hbGxvdy50b3BpY3MubGVuZ3RoICYmXG4gICAgIVIuZmluZChcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi5pZGVudGljYWwoXCJhbGxcIiksXG4gICAgICAgIFIubGFzdCxcbiAgICAgICAgUi5zcGxpdChcIjpcIilcbiAgICAgICksXG4gICAgICBmaWx0ZXJzLmFsbG93LnRvcGljc1xuICAgIClcbiAgKVxuICAgIGFkZEZpbHRlcihpdGVtID0+IHtcbiAgICAgIGxldCB0b3BpYyA9IFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0sIGl0ZW0pO1xuICAgICAgY29uc3Qga2luZCA9IFIucGF0aChbXCJkYXRhXCIsIFwia2luZFwiXSwgaXRlbSk7XG5cbiAgICAgIGlmIChraW5kID09PSBcImNoYXRtc2dcIikgdG9waWMgPSBgY2hhdDoke3RvcGljfWA7XG4gICAgICBpZiAoa2luZCA9PT0gXCJjb21tZW50XCIpIHRvcGljID0gYGNvbW1lbnRzOiR7dG9waWN9YDtcbiAgICAgIHJldHVybiAhIWlzUHJlc2VudChbXCJ0b3BpY1wiLCB0b3BpY10pO1xuICAgIH0pO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmtpbmRzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoa2luZCA9PiAhIWlzUHJlc2VudChbXCJraW5kXCIsIGtpbmRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LnR5cGUgPT09IFwiY29tbWFuZHNcIilcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSksXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYm9keVwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkuYWxpYXNlcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYWxpYXMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhbGlhc1wiLCBhbGlhc10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hdXRob3JzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhdXRob3JJZCA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImF1dGhvclwiLCBhdXRob3JJZF0pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmRvbWFpbnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGRvbWFpbiA9PiAhZG9tYWluIHx8ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiZG9tYWluXCIsIGRvbWFpbl0pLFxuICAgICAgVGhpbmdEYXRhTm9kZS5kb21haW5cbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LnRvcGljcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgdG9waWMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJ0b3BpY1wiLCB0b3BpY10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmFub24pIGFkZEZpbHRlcihSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuc2lnbmVkKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgYXV0aG9ySWQgPT4gIWF1dGhvcklkLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnVwc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMudXBzTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMudXBzTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLmRvd25zTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuZG93bnNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5zY29yZU1pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5zY29yZU1heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkudGFncy5sZW5ndGgpXG4gICAgYWRkVm90ZUZpbHRlcih0aGluZyA9PiB7XG4gICAgICBjb25zdCBjbWRzID0gUi5wYXRoKFtcInZvdGVzXCIsIFwiY29tbWFuZHNcIl0sIHRoaW5nKSB8fCB7fTtcblxuICAgICAgcmV0dXJuICFmaWx0ZXJzLmRlbnkudGFncy5maW5kKFxuICAgICAgICAoW3RhZ05hbWUsIGF1dGhvcklkXSkgPT4gISFSLnBhdGgoW2F1dGhvcklkLCBcInRhZ1wiLCB0YWdOYW1lXSwgY21kcylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgY29uc3QgY29udGVudEZpbHRlciA9IHRoaW5nID0+ICFmaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3Qgdm90ZUZpbHRlciA9IHRoaW5nID0+ICF2b3RlRmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHRoaW5nRmlsdGVyID0gdGhpbmcgPT5cbiAgICBkZWZpbml0aW9uLmlzSWRTdGlja3koUi5wcm9wKFwiaWRcIiwgdGhpbmcpKSB8fFxuICAgIChjb250ZW50RmlsdGVyKHRoaW5nKSAmJiB2b3RlRmlsdGVyKHRoaW5nKSk7XG5cbiAgcmV0dXJuIHsgdGhpbmdGaWx0ZXIsIGNvbnRlbnRGaWx0ZXIsIHZvdGVGaWx0ZXIgfTtcbn07XG5cbmNvbnN0IGdldEZpbHRlcmVkUm93cyA9IGFzeW5jIChcbiAgc2NvcGUsXG4gIHNwZWMsXG4gIHNvcnRlZFJvd3MsXG4gIHsgbGltaXQ6IGxpbWl0UHJvcCA9IDI1LCBjb3VudDogY291bnRQcm9wID0gMCwgYWZ0ZXIgPSBudWxsLCBmaWx0ZXJGbiB9ID0ge31cbikgPT4ge1xuICBjb25zdCBsaW1pdCA9IHBhcnNlSW50KGxpbWl0UHJvcCwgMTApO1xuICBjb25zdCBjb3VudCA9IHBhcnNlSW50KGNvdW50UHJvcCwgMTApIHx8IDA7XG4gIGNvbnN0IHJvd3MgPSBzb3J0ZWRSb3dzLnNsaWNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gW107XG4gIGNvbnN0IGZldGNoQmF0Y2ggPSAoc2l6ZSA9IDMwKSA9PlxuICAgIFByb21pc2UuYWxsKFxuICAgICAgUi5tYXAoYXN5bmMgcm93ID0+IHtcbiAgICAgICAgbGV0IGluTGlzdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFyb3dbTGlzdGluZ05vZGUuUE9TX0lEXSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmxhbmtSb3dcIiwgcm93KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsdGVyRm4pIGluTGlzdGluZyA9IGF3YWl0IGZpbHRlckZuKHJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKTtcbiAgICAgICAgaWYgKGluTGlzdGluZykgZmlsdGVyZWQucHVzaChyb3cpO1xuICAgICAgfSwgcm93cy5zcGxpY2UoY291bnQsIHNpemUpKVxuICAgICk7XG5cbiAgd2hpbGUgKHJvd3MubGVuZ3RoID4gY291bnQpIHtcbiAgICBhd2FpdCBmZXRjaEJhdGNoKCk7XG4gICAgaWYgKGxpbWl0ICYmIGZpbHRlcmVkLmxlbmd0aCA+PSBsaW1pdCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gUi5jb21wb3NlKFxuICAgIGxpbWl0ID8gUi5zbGljZSgwLCBsaW1pdCkgOiBSLmlkZW50aXR5LFxuICAgIFIuc29ydEJ5KFIucHJvcChMaXN0aW5nTm9kZS5QT1NfVkFMKSlcbiAgKShmaWx0ZXJlZCk7XG59O1xuXG5jb25zdCBnZXRGaWx0ZXJlZElkcyA9IFIuY29tcG9zZShcbiAgeCA9PiB4LnRoZW4oUi5tYXAoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19JRCkpKSxcbiAgZ2V0RmlsdGVyZWRSb3dzXG4pO1xuXG5jb25zdCB0aGluZ0ZpbHRlciA9IFIuY3VycnkoKHNjb3BlLCBzcGVjLCB0aGluZ0lkKSA9PlxuICBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pLFxuICAgIHNjb3JlczogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNTY29yZXMoc3BlYyksXG4gICAgZGF0YTogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNEYXRhKHNwZWMpXG4gIH0pLnRoZW4oc3BlYy50aGluZ0ZpbHRlcilcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRmlsdGVyID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgZ2V0RmlsdGVyZWRSb3dzLFxuICBnZXRGaWx0ZXJlZElkcyxcbiAgdGhpbmdGaWx0ZXJcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5cbmNvbnN0IFtQT1NfSURYLCBQT1NfSUQsIFBPU19WQUxdID0gWzAsIDEsIDIsIDNdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCByb3dzVG9JZHMgPSBSLm1hcChSLnByb3AoUE9TX0lEKSk7XG5jb25zdCByb3dzVG9JdGVtcyA9IFIubWFwKFIuc2xpY2UoMSwgMykpO1xuY29uc3Qgc291cmNlID0gUi5wcm9wT3IoXCJcIiwgXCJzb3VyY2VcIik7XG5jb25zdCBzb3VsRnJvbVBhdGggPSBSLmN1cnJ5KFxuICAoaW5kZXhlciwgcGF0aCkgPT4gYCR7Q29uc3RhbnRzLlBSRUZJWH0ke3BhdGh9QH4ke2luZGV4ZXJ9LmBcbik7XG5jb25zdCBwYXRoRnJvbVNvdWwgPSBSLmNvbXBvc2UoXG4gIFIucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtDb25zdGFudHMuUFJFRklYfWApLCBcIlwiKSxcbiAgUi5yZXBsYWNlKC9Afi4qXFwuLywgXCJcIilcbik7XG5cbmNvbnN0IGlkVG9Tb3VsID0gdGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSk7XG5jb25zdCBpZHNUb1NvdWxzID0gUi5tYXAoaWRUb1NvdWwpO1xuY29uc3Qgc291bFRvSWQgPSBzb3VsID0+IFIucHJvcChcInRoaW5nSWRcIiwgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpKTtcbmNvbnN0IHNvdWxzVG9JZHMgPSBSLm1hcChzb3VsVG9JZCk7XG5cbmNvbnN0IGdldFJvdyA9IFIuY3VycnkoKG5vZGUsIGlkeCkgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pbnNlcnQoMCwgcGFyc2VJbnQoaWR4LCAxMCkpLCBSLmFsd2F5cyhudWxsKSksXG4gICAgcm93ID0+IHtcbiAgICAgIHJvd1sxXSA9IHBhcnNlRmxvYXQocm93WzFdKTtcbiAgICAgIHJldHVybiByb3c7XG4gICAgfSxcbiAgICBSLm1hcChSLnRyaW0pLFxuICAgIFIuc3BsaXQoXCIsXCIpLFxuICAgIFIucHJvcE9yKFwiXCIsIGAke2lkeH1gKVxuICApKG5vZGUpXG4pO1xuXG5jb25zdCBpdGVtS2V5cyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoXG4gICAgUi5jb21wb3NlKFxuICAgICAgdmFsID0+ICEhKHZhbCA9PT0gMCB8fCB2YWwpLFxuICAgICAgcGFyc2VJbnRcbiAgICApXG4gICksXG4gIFIua2V5c1xuKTtcblxuY29uc3Qgc2VyaWFsaXplID0gUi5jdXJyeSgoc3BlYywgaXRlbXMpID0+XG4gIFIuY29tcG9zZShcbiAgICBSLmFkZEluZGV4KFIucmVkdWNlKShcbiAgICAgIChyZXMsIHJvdywgaWR4KSA9PiBSLmFzc29jKGAke2lkeH1gLCByb3cuam9pbihcIixcIiksIHJlcyksXG4gICAgICB7fVxuICAgICksXG4gICAgUi5kZWZhdWx0VG8oW10pXG4gICkoaXRlbXMpXG4pO1xuXG5jb25zdCByb3dzID0gbm9kZSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5tYXAoZ2V0Um93KG5vZGUpKSxcbiAgICBpdGVtS2V5c1xuICApKG5vZGUpO1xuXG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIHJvd3NUb0lkcyxcbiAgcm93c1xuKTtcblxuY29uc3Qgc29ydFJvd3MgPSBSLnNvcnRXaXRoKFtcbiAgUi5hc2NlbmQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5jb25kKFtbUi5pc05pbCwgUi5hbHdheXMoSW5maW5pdHkpXSwgW1IuVCwgcGFyc2VGbG9hdF1dKSxcbiAgICAgIFIucHJvcChQT1NfVkFMKVxuICAgIClcbiAgKVxuXSk7XG5cbmNvbnN0IHNvcnRlZElkcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIHJvd3Ncbik7XG5cbmNvbnN0IGl0ZW1zVG9Sb3dzID0gUi5hZGRJbmRleChSLm1hcCkoKGl0ZW0sIGlkeCkgPT4gW2lkeCwgLi4uaXRlbV0pO1xuXG5jb25zdCBkaWZmID0gYXN5bmMgKFxuICBub2RlLFxuICB1cGRhdGVkSXRlbXMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW10sXG4gIHsgbWF4U2l6ZSA9IDEwMDAgfSA9IHt9XG4pID0+IHtcbiAgY29uc3QgcmVtb3ZlZCA9IFIuaW5kZXhCeShSLmlkZW50aXR5LCByZW1vdmVJZHMpO1xuICBjb25zdCBieUlkID0ge307XG4gIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBjb25zdCB1cGRhdGVkID0ge307XG4gIGxldCB0b1JlcGxhY2UgPSBbXTtcbiAgbGV0IG1heElkeCA9IDA7XG4gIGxldCBrZXk7XG5cbiAgZm9yIChrZXkgaW4gbm9kZSB8fCB7fSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGtleSwgMTApO1xuXG4gICAgaWYgKCEocGFyc2VkIHx8IHBhcnNlZCA9PT0gMCkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHJvdyA9IGdldFJvdyhub2RlLCBrZXkpIHx8IFtwYXJzZWQsIG51bGwsIG51bGxdO1xuICAgIGNvbnN0IFtpZHgsIGlkID0gbnVsbCwgcmF3VmFsdWUgPSBudWxsXSA9IHJvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgcm93W1BPU19WQUxdID0gcmF3VmFsdWUgPT09IG51bGwgPyBudWxsIDogcGFyc2VGbG9hdChyYXdWYWx1ZSk7XG4gICAgaWYgKGlkICYmIHJlbW92ZWRbaWRdKSByb3dbUE9TX0lEXSA9IHJvd1tQT1NfVkFMXSA9IG51bGw7XG4gICAgaWYgKGlkKSBieUlkW2lkXSA9IHJvdztcbiAgICBpZiAocm93W1BPU19JRF0pIHtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b1JlcGxhY2UucHVzaChyb3cpO1xuICAgIH1cbiAgICBpZiAoaWR4ID4gbWF4SWR4KSBtYXhJZHggPSBpZHg7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFtpZCwgdmFsdWVdID0gdXBkYXRlZEl0ZW1zW2ldIHx8IFtudWxsLCBudWxsXTtcblxuICAgIGlmICghaWQpIGNvbnRpbnVlO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gYnlJZFtpZF07XG5cbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGlmIChleGlzdGluZ1tQT1NfVkFMXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZXhpc3RpbmdbUE9TX1ZBTF0gPSB2YWx1ZTtcbiAgICAgICAgdXBkYXRlZFtpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByb3cgPSBbbnVsbCwgaWQsIHZhbHVlXTtcblxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWxsU29ydGVkID0gc29ydFJvd3Mocm93cyk7XG4gIGNvbnN0IHNvcnRlZCA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UoMCwgbWF4U2l6ZSkgOiBhbGxTb3J0ZWQ7XG4gIGNvbnN0IG1pc3NpbmcgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKG1heFNpemUsIGFsbFNvcnRlZC5sZW5ndGgpIDogW107XG4gIGNvbnN0IGFkZGVkID0gUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSA9PT0gbnVsbCwgc29ydGVkKTtcblxuICB0b1JlcGxhY2UgPSB0b1JlcGxhY2VcbiAgICAuY29uY2F0KFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gIT09IG51bGwsIG1pc3NpbmcpKVxuICAgIC5yZXZlcnNlKCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpZCA9IHNvcnRlZFtpXVtQT1NfSURdO1xuICAgIGNvbnN0IGlkeCA9IHNvcnRlZFtpXVtQT1NfSURYXTtcbiAgICBjb25zdCB2YWwgPSBzb3J0ZWRbaV1bUE9TX1ZBTF07XG5cbiAgICBpZiAoaWR4ICE9PSBudWxsICYmIHVwZGF0ZWRbaWRdKSBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtpZCwgdmFsXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIGNvbnN0IGluc2VydGVkID0gW107XG5cbiAgd2hpbGUgKGFkZGVkLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IGFkZGVkLnBvcCgpO1xuICAgIGNvbnN0IHJlcGxhY2VkID0gdG9SZXBsYWNlLnBvcCgpO1xuICAgIGxldCBbaWR4XSA9IHJlcGxhY2VkIHx8IFtudWxsXTtcblxuICAgIGlmIChpZHggPT09IG51bGwpIHtcbiAgICAgIGlkeCA9IHBhcnNlSW50KG1heElkeCwgMTApICsgaW5zZXJ0ZWQubGVuZ3RoICsgMTtcbiAgICAgIGluc2VydGVkLnB1c2goaWR4KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtyb3dbUE9TX0lEXSwgcm93W1BPU19WQUxdXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIHdoaWxlICh0b1JlcGxhY2UubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gdG9SZXBsYWNlLnBvcCgpO1xuXG4gICAgaWYgKHJvdyAmJiAhcm93W1BPU19JRF0pIHtcbiAgICAgIGNvbnN0IGlkeCA9IGAke3Jvd1tQT1NfSURYXX1gO1xuXG4gICAgICBpZiAobm9kZVtpZHhdICE9PSBudWxsKSB7XG4gICAgICAgIGNoYW5nZXNbaWR4XSA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibnVsbGluZ1wiLCBpZHgsIG5vZGVbaWR4XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFIua2V5cyhjaGFuZ2VzKS5sZW5ndGggPyBjaGFuZ2VzIDogbnVsbDtcbn07XG5cbmNvbnN0IGNhdGVnb3JpemVEaWZmID0gKGRpZmYsIG9yaWdpbmFsKSA9PiB7XG4gIGNvbnN0IGFsbEtleXMgPSBpdGVtS2V5cyhSLm1lcmdlTGVmdChkaWZmLCBvcmlnaW5hbCkpO1xuICBjb25zdCBhZGRlZCA9IFtdO1xuICBjb25zdCByZW1vdmVkID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gYWxsS2V5c1tpXTtcbiAgICBjb25zdCBbX2RpZmZJZHgsIGRpZmZJZF0gPSBnZXRSb3coZGlmZiwga2V5KSB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGNvbnN0IFtfb3JpZ0lkeCwgb3JpZ0lkXSA9IGdldFJvdyhvcmlnaW5hbCwga2V5KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgaWYgKGRpZmZJZCAhPT0gb3JpZ0lkKSB7XG4gICAgICBpZiAoZGlmZklkKSBhZGRlZC5wdXNoKGRpZmZJZCk7XG4gICAgICBpZiAob3JpZ0lkKSByZW1vdmVkLnB1c2gob3JpZ0lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2FkZGVkLCByZW1vdmVkXTtcbn07XG5cbmNvbnN0IHVuaW9uUm93cyA9IFIuY29tcG9zZShcbiAgUi51bmlxQnkoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5yZWR1Y2UoUi5jb25jYXQsIFtdKSxcbiAgUi5tYXAocm93cylcbik7XG5cbmNvbnN0IHJvd3NGcm9tU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzKSA9PlxuICBQcm9taXNlLmFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSkudGhlbih1bmlvblJvd3MpXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyIH0gPSBvcHRzIHx8IHt9O1xuXG4gIHJldHVybiByb3dzRnJvbVNvdWxzKHNjb3BlLCBbc291bEZyb21QYXRoKGluZGV4ZXIsIHBhdGgpXSkudGhlbihyb3dzVG9JZHMpO1xufSwgXCJsaXN0aW5nUm93c1wiKTtcblxuY29uc3QgZ2V0ID0gcXVlcnkoXG4gIChzY29wZSwgc291bCkgPT4gKHNvdWwgPyBzY29wZS5nZXQoc291bCkgOiByZXNvbHZlKG51bGwpKSxcbiAgXCJsaXN0aW5nXCJcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nTm9kZSA9IHtcbiAgUE9TX0lEWCxcbiAgUE9TX0lELFxuICBQT1NfVkFMLFxuICBzb3VyY2UsXG4gIGdldCxcbiAgZ2V0Um93LFxuICBpdGVtS2V5cyxcbiAgc2VyaWFsaXplLFxuICByb3dzLFxuICBpZHMsXG4gIGlkVG9Tb3VsLFxuICBpZHNUb1NvdWxzLFxuICBzb3VsVG9JZCxcbiAgc291bHNUb0lkcyxcbiAgcm93c1RvSWRzLFxuICByb3dzVG9JdGVtcyxcbiAgaXRlbXNUb1Jvd3MsXG4gIHNvcnRSb3dzLFxuICBzb3J0ZWRJZHMsXG4gIHNvdWxGcm9tUGF0aCxcbiAgcGF0aEZyb21Tb3VsLFxuICByb3dzRnJvbVNvdWxzLFxuICByZWFkLFxuICBkaWZmLFxuICBjYXRlZ29yaXplRGlmZixcbiAgdW5pb25Sb3dzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuY29uc3QgdXBkYXRlTGlzdGluZyA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgc2NvcGUsXG4gIHNwZWMsXG4gIGlkcyA9IFtdLFxuICByZW1vdmVJZHMgPSBbXVxuKSA9PiB7XG4gIGlmICghaWRzLmxlbmd0aCAmJiAhcmVtb3ZlSWRzLmxlbmd0aCkgcmV0dXJuO1xuICBjb25zdCBleGlzdGluZyA9IGF3YWl0IG9yYy5uZXdTY29wZSgpLmdldChyb3V0ZS5zb3VsKTtcbiAgY29uc3QgdXBkYXRlZEl0ZW1zID0gYXdhaXQgTGlzdGluZ1NvcnQudG9JdGVtcyhzY29wZSwgaWRzLCBzcGVjKTtcbiAgY29uc3QgY2hhbmdlcyA9IGF3YWl0IExpc3RpbmdOb2RlLmRpZmYoZXhpc3RpbmcsIHVwZGF0ZWRJdGVtcywgcmVtb3ZlSWRzKTtcblxuICBpZiAoY2hhbmdlcykgY29uc29sZS5sb2coXCJDSEFOR0VTXCIsIHJvdXRlLnNvdWwsIGNoYW5nZXMpO1xuICBpZiAoY2hhbmdlcykgcm91dGUud3JpdGUoY2hhbmdlcyk7XG59O1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChvcmMsIHJvdXRlLCB7IHNvdWwsIHVwZGF0ZWRTb3VsLCBkaWZmLCAuLi5wcm9wcyB9KSA9PiB7XG4gIGxldCB1cGRhdGVkSWRzID0gW107XG5cbiAgY29uc3QgcGF0aCA9IExpc3RpbmdOb2RlLnBhdGhGcm9tU291bChzb3VsKTtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCk7XG5cbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgaXNTdGlja3kgPSBSLmVxdWFscyhyb3V0ZS5tYXRjaC50aGluZ0lkIHx8IG51bGwpO1xuXG4gIGlmICh0aGluZ0lkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIHVwZGF0ZWRJZHMgPSBSLmNvbmNhdCh1cGRhdGVkSWRzLCBUaGluZ1NldC5pZHMoR3VuTm9kZS5kZWNvZGVTRUEoZGlmZikpKTtcblxuICBhd2FpdCB1cGRhdGVMaXN0aW5nKG9yYywgcm91dGUsIHNjb3BlLCBzcGVjLCB1cGRhdGVkSWRzLCBbXSwgaXNTdGlja3kpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ09yYWNsZSA9IHtcbiAgdXBkYXRlTGlzdGluZyxcbiAgb25QdXRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5jb25zdCBjYWxjdWxhdGVSb3dzID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3Qgc3RpY2t5SXRlbXMgPSBSLm1hcChpZCA9PiBbaWQsIC1JbmZpbml0eV0sIHNwZWMuc3RpY2t5SWRzKTtcblxuICBpZiAoIXNwZWMuZGF0YVNvdXJjZS5xdWVyeSkgcmV0dXJuIHJlc29sdmUoW10pO1xuICByZXR1cm4gc3BlYy5kYXRhU291cmNlLnF1ZXJ5KHNjb3BlKS50aGVuKGl0ZW1zID0+IHtcbiAgICBjb25zdCByb3dzID0gTGlzdGluZ05vZGUuaXRlbXNUb1Jvd3MoWy4uLnN0aWNreUl0ZW1zLCAuLi5pdGVtc10pO1xuXG4gICAgcmV0dXJuIExpc3RpbmdGaWx0ZXIuZ2V0RmlsdGVyZWRSb3dzKHNjb3BlLCBzcGVjLCByb3dzLCB7XG4gICAgICAuLi5vcHRzLFxuICAgICAgZmlsdGVyRm5cbiAgICB9KTtcbiAgfSk7XG59KTtcblxuY29uc3QgY2FsY3VsYXRlID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHt9KTtcblxuY29uc3QgdG9Ob2RlID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzKSA9PlxuICBjYWxjdWxhdGVSb3dzKHNjb3BlLCBzcGVjLCBvcHRzKS50aGVuKFxuICAgIFIuY29tcG9zZShcbiAgICAgIExpc3RpbmdOb2RlLnNlcmlhbGl6ZShzcGVjKSxcbiAgICAgIExpc3RpbmdOb2RlLnJvd3NUb0l0ZW1zXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3QgcGF0aHMgPSBSLnBhdGhPcihbXSwgW1wiZGF0YVNvdXJjZVwiLCBcImxpc3RpbmdQYXRoc1wiXSwgc3BlYyk7XG4gIGNvbnN0IHN0aWNreVJvd3MgPSBSLm1hcChpZCA9PiBbLTEsIGlkLCAtSW5maW5pdHldLCBzcGVjLnN0aWNreUlkcyk7XG4gIGNvbnN0IHNvdWxzID0gUi5tYXAoXG4gICAgTGlzdGluZ05vZGUuc291bEZyb21QYXRoKG9wdHMuaW5kZXhlciB8fCBzcGVjLmluZGV4ZXIpLFxuICAgIHBhdGhzXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdOb2RlLnJvd3NGcm9tU291bHMoc2NvcGUsIHNvdWxzKS50aGVuKHJvd3MgPT5cbiAgICBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCBzcGVjLCBbLi4uc3RpY2t5Um93cywgLi4ucm93c10sIHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICBmaWx0ZXJGblxuICAgIH0pXG4gICk7XG59KTtcblxuY29uc3QgZnJvbVNwZWMgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT5cbiAgKG9wdHMuY2FsY3VsYXRlID8gY2FsY3VsYXRlIDogcmVhZCkoc2NvcGUsIHNwZWMsIG9wdHMpXG4pO1xuXG5jb25zdCBmcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT4ge1xuICBjb25zdCB0eXBlID0gTGlzdGluZ1R5cGUuZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgcmV0dXJuIHR5cGUuZ2V0U3BlYyhzY29wZSwgdHlwZS5tYXRjaCkudGhlbihzcGVjID0+IHtcbiAgICBpZiAoc3BlYy5oYXNJbmRleGVyICYmICFvcHRzLmNhbGN1bGF0ZSkge1xuICAgICAgaWYgKCF0eXBlIHx8ICF0eXBlLnJlYWQpIHJldHVybiBMaXN0aW5nTm9kZS5yZWFkKHNjb3BlLCBwYXRoLCBvcHRzKTtcbiAgICAgIHJldHVybiB0eXBlLnJlYWQoc2NvcGUsIHR5cGUubWF0Y2gsIG9wdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbVNwZWMoc2NvcGUsIHNwZWMsIG9wdHMpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBub2RlRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+XG4gIExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCkudGhlbihzcGVjID0+XG4gICAgdG9Ob2RlKHNjb3BlLCBzcGVjLCBSLm1lcmdlTGVmdChvcHRzLCB7IGxpbWl0OiBDb25zdGFudHMuTElTVElOR19TSVpFIH0pKVxuICApXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1F1ZXJ5ID0ge1xuICBmcm9tU3BlYyxcbiAgZnJvbVBhdGgsXG4gIGNhbGN1bGF0ZVJvd3MsXG4gIHRvTm9kZSxcbiAgbm9kZUZyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcblxuY29uc3QgW1BPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMV07XG5jb25zdCB0b0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHNvcnRJdGVtcyA9IFIuc29ydEJ5KFIucHJvcChQT1NfVkFMKSk7XG5cbmNvbnN0IHZvdGVTb3J0ID0gZm4gPT4gcXVlcnkoKHNjb3BlLCB0aGluZ0lkLCBzcGVjKSA9PiB7XG4gIGlmIChzcGVjLmlzSWRTdGlja3kodGhpbmdJZCkpIHJldHVybiByZXNvbHZlKC1JbmZpbml0eSk7XG4gIGlmIChSLmNvbnRhaW5zKHRoaW5nSWQsIHNwZWMuZmlsdGVycy5hbGxvdy5vcHMpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuXG4gIHJldHVybiBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHNjb3JlczogdHJ1ZSxcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KVxuICB9KS50aGVuKHJlcyA9PiBmbihyZXMsIHNwZWMpKTtcbn0pO1xuXG5jb25zdCB0aW1lU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT5cbiAgUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KVxuICB9KS50aGVuKGZuKVxuKTtcblxuY29uc3Qgc29ydHMgPSB7XG4gIG5ldzogdGltZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5tdWx0aXBseSgtMSksXG4gICAgICBSLmRlZmF1bHRUbygwKSxcbiAgICAgIFIucHJvcChcInRpbWVzdGFtcFwiKSxcbiAgICApXG4gICksXG4gIG9sZDogdGltZVNvcnQoUi5wcm9wKFwidGltZXN0YW1wXCIpKSxcbiAgYWN0aXZlOiB2b3RlU29ydChcbiAgICAoeyB0aW1lc3RhbXAsIGxhc3RBY3RpdmUgfSkgPT4gLTEgKiAobGFzdEFjdGl2ZSB8fCB0aW1lc3RhbXApXG4gICksXG4gIHRvcDogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlSW50KHgsIDEwKSxcbiAgICAgIFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0pXG4gICAgKVxuICApLFxuICBjb21tZW50czogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlRmxvYXQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdKVxuICAgIClcbiAgKSxcbiAgZGlzY3Vzc2VkOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiY29tbWVudFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcblxuICAgIGlmICghc2NvcmUpIHJldHVybiAxMDAwMDAwMDAwIC0gc2Vjb25kcztcbiAgICByZXR1cm4gLTEgKiAob3JkZXIgKyBzZWNvbmRzIC8gNDUwMDApO1xuICB9KSxcbiAgaG90OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lc3RhbXAgLyAxMDAwIC0gMTEzNDAyODAwMztcbiAgICBjb25zdCBvcmRlciA9IE1hdGgubG9nMTAoTWF0aC5tYXgoTWF0aC5hYnMoc2NvcmUpLCAxKSk7XG4gICAgbGV0IHNpZ24gPSAwO1xuXG4gICAgaWYgKHNjb3JlID4gMCkge1xuICAgICAgc2lnbiA9IDE7XG4gICAgfSBlbHNlIGlmIChzY29yZSA8IDApIHtcbiAgICAgIHNpZ24gPSAtMTtcbiAgICB9XG4gICAgcmV0dXJuIC0xICogKHNpZ24gKiBvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBiZXN0OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IG4gPSB1cHMgKyBkb3ducztcblxuICAgIGlmIChuID09PSAwKSByZXR1cm4gMDtcbiAgICBjb25zdCB6ID0gMS4yODE1NTE1NjU1NDU7IC8vIDgwJSBjb25maWRlbmNlXG4gICAgY29uc3QgcCA9IHVwcyAvIG47XG4gICAgY29uc3QgbGVmdCA9IHAgKyAoMSAvICgyICogbikpICogeiAqIHo7XG4gICAgY29uc3QgcmlnaHQgPSB6ICogTWF0aC5zcXJ0KChwICogKDEgLSBwKSkgLyBuICsgKHogKiB6KSAvICg0ICogbiAqIG4pKTtcbiAgICBjb25zdCB1bmRlciA9IDEgKyAoMSAvIG4pICogeiAqIHo7XG5cbiAgICByZXR1cm4gLTEgKiAoKGxlZnQgLSByaWdodCkgLyB1bmRlcik7XG4gIH0pLFxuICBjb250cm92ZXJzaWFsOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuXG4gICAgaWYgKHVwcyA8PSAwIHx8IGRvd25zIDw9IDApIHJldHVybiAwO1xuICAgIGNvbnN0IG1hZ25pdHVkZSA9IHVwcyArIGRvd25zO1xuICAgIGNvbnN0IGJhbGFuY2UgPSB1cHMgPiBkb3ducyA/IGRvd25zIC8gdXBzIDogdXBzIC8gZG93bnM7XG5cbiAgICByZXR1cm4gLTEgKiBtYWduaXR1ZGUgKiogYmFsYW5jZTtcbiAgfSlcbn07XG5cbmNvbnN0IGlzVmFsaWRTb3J0ID0gc29ydCA9PiAhIXNvcnRzW3NvcnRdO1xuXG5jb25zdCB0b0l0ZW0gPSBxdWVyeShcbiAgKHNjb3BlLCBpZCwgc3BlYykgPT5cbiAgICAoc29ydHNbc3BlYy5zb3J0XSB8fCBzb3J0cy5uZXcpKHNjb3BlLCBpZCwgc3BlYykudGhlbih2YWwgPT4gW2lkLCB2YWxdKVxuKTtcblxuY29uc3QgaXRlbUZyb21Tb3VsID0gKHNjb3BlLCBzb3VsLCBzcGVjKSA9PiB0b0l0ZW0oc2NvcGUsIExpc3RpbmdOb2RlLnNvdWxUb0lkKHNvdWwpLCBzcGVjKTtcblxuY29uc3QgdG9JdGVtcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkcywgc3BlYykgPT4gYWxsKFIubWFwKFxuICAgIGlkID0+IHRvSXRlbShzY29wZSwgaWQsIHNwZWMpLFxuICAgIGlkc1xuICApKVxuKTtcblxuY29uc3QgZnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWxzLCBzcGVjKSA9PlxuICAgIGFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSlcbiAgICAgIC50aGVuKFIucGlwZShcbiAgICAgICAgVGhpbmdTZXQudW5pb24sXG4gICAgICAgIFRoaW5nU2V0LmlkcyxcbiAgICAgICAgaWRzID0+IHRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYylcbiAgICAgICkpXG4gICAgICAudGhlbihzb3J0SXRlbXMpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1NvcnQgPSB7XG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc29ydHMsXG4gIGlzVmFsaWRTb3J0LFxuICB0b0l0ZW0sXG4gIHRvSXRlbXMsXG4gIHRvSWRzLFxuICBpdGVtRnJvbVNvdWwsXG4gIHNvcnRJdGVtcyxcbiAgZnJvbVRoaW5nU2V0c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuXG5jb25zdCBmcm9tU291cmNlID0gUi5jb21wb3NlKFxuICBSLmFwcGx5KFIubWVyZ2VMZWZ0KSxcbiAgUi5hcChbTGlzdGluZ0ZpbHRlci5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBSLmFwcGx5KFIuYXNzb2MoXCJkYXRhU291cmNlXCIpKSxcbiAgUi5hcChbTGlzdGluZ0RhdGFTb3VyY2UuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgTGlzdGluZ0RlZmluaXRpb24uZnJvbVNvdXJjZVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEgPSBcIlwiKSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIG5hbWUpXG4gICAgLnRoZW4oUi5jb21wb3NlKFxuICAgICAgYm9keSA9PiBgJHtib2R5fVxuIyBhZGRlZCBieSBpbmRleGVyXG4ke2V4dHJhIHx8IFwiXCJ9XG5zb3VyY2VkIGZyb20gcGFnZSAke2F1dGhvcklkfSAke25hbWV9XG5gLFxuICAgICAgVGhpbmdEYXRhTm9kZS5ib2R5XG4gICAgKSlcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU3BlYyA9IHsgZnJvbVNvdXJjZSwgZ2V0U291cmNlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy9jaGF0XCI7XG5jb25zdCB0YWJzID0gWyAuLi5Ub3BpY0xpc3RpbmcudGFicywgXCJjaGF0XCIgXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjaGF0OnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogbm9ybWFsVG9waWNzWzBdIHx8IFwid2hhdGV2ZXJcIjtcbiAgY29uc3QgdG9waWNzID0gbm9ybWFsVG9waWNzLnJlZHVjZShcbiAgICAocmVzLCB0b3BpYykgPT4gWy4uLnJlcywgYGNoYXQ6JHt0b3BpY31gXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNoYXRcIixcbiAgICBbXG4gICAgICBcInNvcnQgbmV3XCIsXG4gICAgICBcImRpc3BsYXkgYXMgY2hhdFwiLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENoYXRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjb21tZW50czpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdGhpbmdJZCwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNvbW1lbnRzXCIsXG4gICAgW2BvcCAke3RoaW5nSWR9YCwgYHNvcnQgJHtzb3J0fWBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL2NvbW1lbnRlZC86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y29tbWVudGVkOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNvbW1lbnRlZFwiLFxuICAgIFtcbiAgICAgIGBjdXJhdG9yICR7YXV0aG9ySWR9YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudGVkTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgZ2V0U2lkZWJhciwgZ2V0U291cmNlLCBnZXRTcGVjIH0pO1xuXG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvZG9tYWluLzpkb21haW4vOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6ZG9tYWluOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBkb21haW4sIHNvcnQgfSkgPT4ge1xuICBjb25zdCBkb21haW5zID0gUGF0aC5zcGxpdFRvcGljcyhkb21haW4pO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmRvbWFpblwiLFxuICAgIFtcbiAgICAgIGBuYW1lICR7ZG9tYWluc1swXX1gLFxuICAgICAgXCJzdWJtaXQgdG8gd2hhdGV2ZXJcIixcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgXCJraW5kIHN1Ym1pc3Npb25cIixcbiAgICAgIC4uLlIubWFwKGRvbWFpbiA9PiBgZG9tYWluICR7ZG9tYWlufWAsIGRvbWFpbnMpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC9kb21haW4vJHtkb21haW59LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBEb21haW5MaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICB0YWJzLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvZmlyZWhvc2VcIjtcbmNvbnN0IHRhYnMgPSBUb3BpY0xpc3RpbmcudGFicztcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmZpcmVob3NlOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogbm9ybWFsVG9waWNzWzBdIHx8IFwid2hhdGV2ZXJcIjtcbiAgY29uc3QgdG9waWNzID0gbm9ybWFsVG9waWNzLnJlZHVjZShcbiAgICAocmVzLCB0b3BpYykgPT4gWy4uLnJlcywgdG9waWMsIGBjaGF0OiR7dG9waWN9YCwgYGNvbW1lbnRzOiR7dG9waWN9YF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpmaXJlaG9zZVwiLFxuICAgIFtcbiAgICAgIFwic29ydCBuZXdcIixcbiAgICAgIFwiZGlzcGxheSBhcyBjaGF0XCIsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRmlyZWhvc2VMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICB0YWJzLFxuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi8uLi9UaGluZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvcmVwbGllcy86dHlwZS86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6dG9waWM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCB0eXBlLCBzb3J0ID0gXCJuZXdcIiB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmluYm94XCIsXG4gICAgW2ByZXBsaWVzIHRvIGF1dGhvciAke2F1dGhvcklkfWAsIFwia2luZCBjb21tZW50XCIsIGB0eXBlICR7dHlwZX1gLCBgc29ydCAke3NvcnR9YF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyB1cGRhdGVkU291bCwgZGlmZiB9KSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IGRpZmZEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEoZGlmZik7XG4gIGNvbnN0IFt1cGRhdGVkQXV0aG9yZWRdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoZGlmZkRhdGEpO1xuICBjb25zdCBzcGVjID0gYXdhaXQgZ2V0U3BlYyhzY29wZSwgcm91dGUubWF0Y2gpO1xuICBsZXQgdXBkYXRlZElkcyA9IFRoaW5nU2V0LmlkcyhkaWZmRGF0YSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkQXV0aG9yZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBvcElkID0gdXBkYXRlZEF1dGhvcmVkW2ldO1xuICAgIGNvbnN0IHJlcGx5SWRzID0gVGhpbmdTZXQuaWRzKFxuICAgICAgYXdhaXQgc2NvcGVcbiAgICAgICAgLmdldChTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3BJZCB9KSlcbiAgICAgICAgLnRoZW4oKVxuICAgICk7XG5cbiAgICB1cGRhdGVkSWRzID0gdXBkYXRlZElkcy5jb25jYXQocmVwbHlJZHMpO1xuICB9XG5cbiAgaWYgKHVwZGF0ZWRJZHMubGVuZ3RoKVxuICAgIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10pO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC86dHlwZS86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcIm92ZXJ2aWV3XCIsIFwiY29tbWVudHNcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tYW5kc1wiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnByb2ZpbGU6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6cHJvZmlsZVwiLFxuICAgIFtcbiAgICAgIGBhdXRob3IgJHthdXRob3JJZH1gLFxuICAgICAgYHR5cGUgJHt0eXBlfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdXNlci8ke2F1dGhvcklkfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgUXVlcnkudXNlck1ldGEoc2NvcGUsIG1hdGNoLmF1dGhvcklkKS50aGVuKG1ldGEgPT5cbiAgICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKFIucGlwZShcbiAgICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2UsXG4gICAgICBSLm1lcmdlTGVmdCh7XG4gICAgICAgIHByb2ZpbGVJZDogbWF0Y2guYXV0aG9ySWQsXG4gICAgICAgIGRpc3BsYXlOYW1lOiBSLnByb3BPcihcIlwiLCBcImFsaWFzXCIsIG1ldGEpXG4gICAgICB9KVxuICAgICkpXG4pKTtcblxuZXhwb3J0IGNvbnN0IFByb2ZpbGVMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICB0YWJzLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uLy4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5pbXBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi4vU3BhY2VTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRcIjtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFNwYWNlU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNwZWMoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBTcGFjZVNwZWMuc2lkZWJhclBhZ2VOYW1lKG5hbWUpKVxuKTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHsgdXBkYXRlZFNvdWwsIGRpZmYsIG9yaWdpbmFsLCBsYXRlc3QgPSAwIH1cbikgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuXG4gIGNvbnN0IG9yaWdpbmFsRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKG9yaWdpbmFsKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRJZHMsIHJlbW92ZWRJZHNdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoXG4gICAgZGlmZkRhdGEsXG4gICAgb3JpZ2luYWxEYXRhXG4gICk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IHZvdGVDb3VudHNNYXRjaCA9IFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB0aGluZ01hdGNoID0gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgYXV0aG9yTWF0Y2ggPSBTY2hlbWEuU0VBQXV0aG9yLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcblxuICBpZiAodm90ZUNvdW50c01hdGNoKSB1cGRhdGVkSWRzLnB1c2godm90ZUNvdW50c01hdGNoLnRoaW5nSWQpO1xuICBpZiAodGhpbmdNYXRjaCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ0lkICYmIHRoaW5nSWQgIT09IHNwZWMuZnJvbVBhZ2VJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICBhd2FpdCBMaXN0aW5nT3JhY2xlLnVwZGF0ZUxpc3RpbmcoXG4gICAgb3JjLFxuICAgIHJvdXRlLFxuICAgIHNjb3BlLFxuICAgIHNwZWMsXG4gICAgdXBkYXRlZElkcyxcbiAgICByZW1vdmVkSWRzXG4gICk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbiAgaWYgKFxuICAgIFIucHJvcChcInNpemVcIiwgb3JpZ2luYWwpIHx8XG4gICAgdXBkYXRlZElkcy5sZW5ndGggfHxcbiAgICByZW1vdmVkSWRzLmxlbmd0aCB8fFxuICAgIGF1dGhvck1hdGNoXG4gIClcbiAgICByZXR1cm47XG5cbiAgLy8gYmFzZSBsb2dpYyBmcm9tIGd1bi1jbGVyaWMtc2NvcGUgbmVlZHMgdG8gYmUgZW5jYXBzdWFsdGVkIGJldHRlcj9cbiAgY29uc29sZS5sb2coXCItLS1TVEFOREFSRCBTUEFDRSBVUERBVEUtLS1cIiwgcm91dGUuc291bCwgdXBkYXRlZFNvdWwpO1xuICBjb25zdCBub2RlID0gYXdhaXQgb3JjLm5ld1Njb3BlKCkuZ2V0KHJvdXRlLnNvdWwpO1xuICBjb25zdCBleGlzdGluZ0tleXMgPSBMaXN0aW5nTm9kZS5pdGVtS2V5cyhub2RlKTtcblxuICBpZiAoZXhpc3RpbmdLZXlzLmxlbmd0aCkge1xuICAgIHJvdXRlLndyaXRlKHtcbiAgICAgIHNpemU6IDAsXG4gICAgICAuLi5leGlzdGluZ0tleXMucmVkdWNlKChkaWZmLCBrZXkpID0+IHtcbiAgICAgICAgZGlmZltgJHtrZXl9YF0gPSBudWxsO1xuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgIH0sIHt9KVxuICAgIH0pO1xuICB9XG5cbiAgb3JjLndvcmsoe1xuICAgIGlkOiBgdXBkYXRlOiR7cm91dGUuc291bH1gLFxuICAgIHNvdWw6IHJvdXRlLnNvdWwsXG4gICAgbWV0aG9kOiBcImRvVXBkYXRlXCIsXG4gICAgcHJpb3JpdHk6IHJvdXRlLnByaW9yaXR5IHx8IDUwXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U291cmNlLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTcGVjLFxuICBvblB1dFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCIsIFwiZmlyZWhvc2VcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzp0b3BpYzpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCB0b3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpY3NbMF0gPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiB0b3BpY3NbMF07XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6dG9waWNcIixcbiAgICBbXG4gICAgICBgbmFtZSAke3RvcGljfWAsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgdG9waWMuaW5kZXhPZihcIjpcIikgPT09IC0xID8gXCJraW5kIHN1Ym1pc3Npb25cIiA6IFwiXCIsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oXG4gICAgUi5waXBlKFxuICAgICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSxcbiAgICAgIFIuYXNzb2MoXCJiYXNlUGF0aFwiLCBgL3QvJHttYXRjaC50b3BpY31gKVxuICAgIClcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IFRvcGljTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgdGFicyxcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENoYXRMaXN0aW5nIH0gZnJvbSBcIi4vQ2hhdExpc3RpbmdcIjtcbmltcG9ydCB7IEZpcmVob3NlTGlzdGluZyB9IGZyb20gXCIuL0ZpcmVob3NlTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudGVkTGlzdGluZyB9IGZyb20gXCIuL0NvbW1lbnRlZExpc3RpbmdcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuaW1wb3J0IHsgRG9tYWluTGlzdGluZyB9IGZyb20gXCIuL0RvbWFpbkxpc3RpbmdcIjtcbmltcG9ydCB7IENvbW1lbnRMaXN0aW5nIH0gZnJvbSBcIi4vQ29tbWVudExpc3RpbmdcIjtcbmltcG9ydCB7IFNwYWNlTGlzdGluZyB9IGZyb20gXCIuL1NwYWNlTGlzdGluZ1wiO1xuaW1wb3J0IHsgSW5ib3hMaXN0aW5nIH0gZnJvbSBcIi4vSW5ib3hMaXN0aW5nXCI7XG5pbXBvcnQgeyBQcm9maWxlTGlzdGluZyB9IGZyb20gXCIuL1Byb2ZpbGVMaXN0aW5nXCI7XG5cbmNvbnN0IHR5cGVzID0ge1xuICBDaGF0TGlzdGluZyxcbiAgRmlyZWhvc2VMaXN0aW5nLFxuICBUb3BpY0xpc3RpbmcsXG4gIERvbWFpbkxpc3RpbmcsXG4gIENvbW1lbnRMaXN0aW5nLFxuICBTcGFjZUxpc3RpbmcsXG4gIEluYm94TGlzdGluZyxcbiAgQ29tbWVudGVkTGlzdGluZyxcbiAgUHJvZmlsZUxpc3Rpbmdcbn07XG5cbmNvbnN0IHR5cGVzQXJyYXkgPSBSLnZhbHVlcyh0eXBlcyk7XG5cbmNvbnN0IGZyb21QYXRoID0gcGF0aCA9PiB7XG4gIGxldCBtYXRjaDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBtYXRjaCA9IHR5cGVzQXJyYXlbaV0ucm91dGUubWF0Y2gocGF0aCk7XG4gICAgaWYgKG1hdGNoKSByZXR1cm4gUi5hc3NvYyhcIm1hdGNoXCIsIG1hdGNoLCB0eXBlc0FycmF5W2ldKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHNpZGViYXJGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCkgPT4ge1xuICBjb25zdCB0eXBlID0gZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlIHx8ICF0eXBlLmdldFNpZGViYXIpIHJldHVybiByZXNvbHZlKFwiXCIpO1xuICByZXR1cm4gdHlwZS5nZXRTaWRlYmFyKHNjb3BlLCB0eXBlLm1hdGNoKTtcbn0pO1xuXG5jb25zdCBzcGVjRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgpID0+IHtcbiAgY29uc3QgdHlwZSA9IGZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBmaW5kIHR5cGUgZm9yIHBhdGg6ICR7cGF0aH1gKTtcblxuICByZXR1cm4gdHlwZS5nZXRTcGVjKHNjb3BlLCB0eXBlLm1hdGNoKS50aGVuKGJhc2VTcGVjID0+IHtcbiAgICBsZXQgc3BlYyA9IGJhc2VTcGVjO1xuXG4gICAgaWYgKHR5cGUubWF0Y2guc29ydCA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwicGF0aFwiLCB0eXBlLnJvdXRlLnJldmVyc2UoUi5hc3NvYyhcInNvcnRcIiwgc3BlYy5zb3J0LCB0eXBlLm1hdGNoKSksIHNwZWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGVjID0gUi5hc3NvYyhcInBhdGhcIiwgcGF0aCwgYmFzZVNwZWMpO1xuICAgIH1cblxuICAgIGlmIChzcGVjLnN1Ym1pdFRvcGljICYmICFzcGVjLnN1Ym1pdFBhdGgpIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwic3VibWl0UGF0aFwiLCBgL3QvJHtzcGVjLnN1Ym1pdFRvcGljfS9zdWJtaXRgLCBzcGVjKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BlYztcbiAgfSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdUeXBlID0ge1xuICAuLi50eXBlcyxcbiAgdHlwZXMsXG4gIGZyb21QYXRoLFxuICBzaWRlYmFyRnJvbVBhdGgsXG4gIHNwZWNGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuXG5jb25zdCBzcGxpdERvbWFpbnMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIitcIiksXG4gIFIudG9Mb3dlcixcbiAgUi50cmltLFxuICBSLmRlZmF1bHRUbyhcIlwiKVxuKTtcblxuY29uc3Qgc3BsaXRUb3BpY3MgPSBSLmNvbXBvc2UoXG4gIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoW1wiYWxsXCJdKSksXG4gIHNwbGl0RG9tYWluc1xuKTtcblxuY29uc3Qgd2l0aFJvdXRlID0gb2JqID0+IFIuYXNzb2MoXCJyb3V0ZVwiLCBuZXcgUm91dGUob2JqLnBhdGgpLCBvYmopO1xuXG5leHBvcnQgY29uc3QgUGF0aCA9IHsgc3BsaXREb21haW5zLCBzcGxpdFRvcGljcywgd2l0aFJvdXRlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcbmNvbnN0IGNvbmZpZ1BhZ2VOYW1lID0gbmFtZSA9PiBgc3BhY2U6JHtuYW1lfWA7XG5jb25zdCBzaWRlYmFyUGFnZU5hbWUgPSBuYW1lID0+IGBzcGFjZToke25hbWV9OnNpZGViYXJgO1xuXG5jb25zdCBzb3VyY2VXaXRoRGVmYXVsdHMgPSBSLmN1cnJ5KChvd25lcklkLCBuYW1lLCBzb3VyY2UpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtzb3VyY2UgfHwgXCJcIl07XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuXG4gIGlmICghdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpKSB7XG4gICAgdGFicy5tYXAodGFiID0+XG4gICAgICByZXN1bHQucHVzaChgdGFiICR7dGFifSAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke25hbWV9LyR7dGFifWApXG4gICAgKTtcbiAgfVxuXG4gIGxldCBpbmRleGVyID0gdG9rZW5pemVkLmdldFZhbHVlKFwiaW5kZXhlclwiKTtcblxuICBpZiAoIWluZGV4ZXIpIHtcbiAgICByZXN1bHQucHVzaChgaW5kZXhlciAke0NvbmZpZy5pbmRleGVyfWApO1xuICAgIGluZGV4ZXIgPSBDb25maWcuaW5kZXhlcjtcbiAgfVxuXG4gIGxldCB0YWJ1bGF0b3IgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIik7XG5cbiAgaWYgKCF0YWJ1bGF0b3IpIHJlc3VsdC5wdXNoKGB0YWJ1bGF0b3IgJHtpbmRleGVyfWApO1xuXG4gIHJldHVybiByZXN1bHQuam9pbihcIlxcblwiKTtcbn0pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgY29uZmlnUGFnZU5hbWUobmFtZSksIGV4dHJhKS50aGVuKFxuICAgIHNvdXJjZVdpdGhEZWZhdWx0cyhhdXRob3JJZCwgbmFtZSlcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkudGhlbihzb3VyY2UgPT5cbiAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlKHNvdXJjZSwgYXV0aG9ySWQsIG5hbWUpXG4gIClcbik7XG5cbmNvbnN0IG5vZGVUb1NwYWNlTmFtZXMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLm1hcChSLnJlcGxhY2UoL15zcGFjZTovLCBcIlwiKSksXG4gIFIuZmlsdGVyKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcImxlbmd0aFwiKSxcbiAgICAgIFIubWF0Y2goL15zcGFjZTpbXjpdKiQvKVxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCB1c2VyU3BhY2VOYW1lcyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQpID0+XG4gIFF1ZXJ5LnVzZXJQYWdlcyhzY29wZSwgYXV0aG9ySWQpLnRoZW4obm9kZVRvU3BhY2VOYW1lcylcbik7XG5cbmV4cG9ydCBjb25zdCBTcGFjZVNwZWMgPSB7XG4gIGNvbmZpZ1BhZ2VOYW1lLFxuICBzaWRlYmFyUGFnZU5hbWUsXG4gIG5vZGVUb1NwYWNlTmFtZXMsXG4gIHVzZXJTcGFjZU5hbWVzLFxuICB0YWJzLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn07XG4iLCJpbXBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuZXhwb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuZXhwb3J0IHsgTGlzdGluZ0RlZmluaXRpb24gfSBmcm9tIFwiLi9MaXN0aW5nRGVmaW5pdGlvblwiO1xuZXhwb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmV4cG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmV4cG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi9MaXN0aW5nT3JhY2xlXCI7XG5leHBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmV4cG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmV4cG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmV4cG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcbmV4cG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuL1NwYWNlU3BlY1wiO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZyA9IHtcbiAgLi4uTGlzdGluZ1R5cGUudHlwZXMsXG4gIExpc3RpbmdOb2RlLFxuICBMaXN0aW5nU3BlYyxcbiAgaXNWYWxpZFNvcnQ6IExpc3RpbmdTb3J0LmlzVmFsaWRTb3J0LFxuICBpZHNUb1NvdWxzOiBMaXN0aW5nTm9kZS5pZHNUb1NvdWxzLFxuICBnZXQ6IExpc3RpbmdOb2RlLmdldCxcbiAgZnJvbVNwZWM6IExpc3RpbmdRdWVyeS5mcm9tU3BlYyxcbiAgZnJvbVBhdGg6IExpc3RpbmdRdWVyeS5mcm9tUGF0aCxcbiAgdHlwZUZyb21QYXRoOiBMaXN0aW5nVHlwZS5mcm9tUGF0aCxcbiAgc2lkZWJhckZyb21QYXRoOiBMaXN0aW5nVHlwZS5zaWRlYmFyRnJvbVBhdGgsXG4gIHNwZWNGcm9tUGF0aDogTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoLFxuICBub2RlRnJvbVBhdGg6IExpc3RpbmdRdWVyeS5ub2RlRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHFzIGZyb20gXCJxdWVyeS1zdHJpbmdcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nLCBMaXN0aW5nU3BlYywgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nXCI7XG5cbmNvbnN0IHdpa2lQYWdlID0gUi5tZXJnZUxlZnQoe1xuICB3aXRoTWF0Y2g6ICh7IHBhcmFtczogeyBhdXRob3JJZCA9IENvbmZpZy5vd25lciwgbmFtZSB9IH0pID0+ICh7XG4gICAgcHJlbG9hZDogc2NvcGUgPT4gUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lKVxuICB9KVxufSk7XG5cbmNvbnN0IHdpdGhMaXN0aW5nTWF0Y2ggPSAocGF0aCwgcGFyYW1zKSA9PiB7XG4gIGlmICghcGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcmVsb2FkOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKHt9KSkpLFxuICAgICAgc2lkZWJhcjogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShcIlwiKSkpLFxuICAgICAgc3BhY2U6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShcIlwiKSkpKSxcbiAgICAgIGlkczogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShbXSkpKVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIHByZWxvYWQ6IHNjb3BlID0+IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBwYXRoLCBwYXJhbXMpLFxuICAgIHNpZGViYXI6IHF1ZXJ5KFxuICAgICAgc2NvcGUgPT4gTGlzdGluZy5zaWRlYmFyRnJvbVBhdGgoc2NvcGUsIHBhdGgpLFxuICAgICAgYHNpZGViYXI6JHtwYXRofWBcbiAgICApLFxuICAgIHNwYWNlOiBxdWVyeShcbiAgICAgIHNjb3BlID0+IExpc3Rpbmcuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoLCBwYXJhbXMpLFxuICAgICAgYHNwZWM6JHtwYXRofWBcbiAgICApLFxuICAgIGlkczogcXVlcnkoXG4gICAgICAoc2NvcGUsIG9wdHMgPSB7fSkgPT5cbiAgICAgICAgTGlzdGluZy5mcm9tUGF0aChzY29wZSwgcGF0aCwgUi5tZXJnZUxlZnQob3B0cywgcGFyYW1zKSksXG4gICAgICBgaWRzOiR7cGF0aH06JHtxcy5zdHJpbmdpZnkocGFyYW1zKX1gXG4gICAgKVxuICB9O1xufTtcblxuY29uc3QgcHJlbG9hZExpc3RpbmcgPSBhc3luYyAoc2NvcGUsIHBhdGgsIHBhcmFtcykgPT4ge1xuICBjb25zdCBtYXRjaCA9IHdpdGhMaXN0aW5nTWF0Y2gocGF0aCwgcGFyYW1zKTtcbiAgbGV0IFtzcGVjLCBpZHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIG1hdGNoLnNwYWNlKHNjb3BlKSxcbiAgICBtYXRjaC5pZHMoc2NvcGUsIHt9KSxcbiAgICBtYXRjaC5zaWRlYmFyKHNjb3BlKVxuICBdKTtcblxuICBpZiAoIXNwZWMpIHNwZWMgPSBMaXN0aW5nU3BlYy5mcm9tU291cmNlKFwiXCIpO1xuXG4gIGNvbnN0IHRoaW5nU291bHMgPSBMaXN0aW5nLmlkc1RvU291bHMoaWRzKTtcbiAgY29uc3QgW3RoaW5nc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgUXVlcnkubXVsdGlUaGluZ01ldGEoc2NvcGUsIHtcbiAgICAgIHRoaW5nU291bHMsXG4gICAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsXG4gICAgICBzY29yZXM6IHRydWUsXG4gICAgICBkYXRhOiB0cnVlXG4gICAgfSksXG4gICAgLi4uUi5tYXAoXG4gICAgICBpZCA9PiBRdWVyeS51c2VyTWV0YShzY29wZSwgaWQpLFxuICAgICAgUi51bmlxKFtzcGVjICYmIHNwZWMuaW5kZXhlciwgc3BlYyAmJiBzcGVjLm93bmVyLCBzcGVjICYmIHNwZWMudGFidWxhdG9yXSlcbiAgICApXG4gIF0pO1xuICBjb25zdCBvcElkcyA9IFIuY29tcG9zZShcbiAgICBSLndpdGhvdXQoaWRzKSxcbiAgICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgICBSLnVuaXEsXG4gICAgUi5tYXAoUi5wYXRoT3IobnVsbCwgW1wiZGF0YVwiLCBcIm9wSWRcIl0pKVxuICApKHRoaW5ncyk7XG5cbiAgY29uc29sZS5sb2coXCJvcElkc1wiLCBvcElkcyk7XG5cbiAgaWYgKG9wSWRzLmxlbmd0aCkge1xuICAgIGNvbnN0IG9wU291bHMgPSBMaXN0aW5nLmlkc1RvU291bHMob3BJZHMpO1xuXG4gICAgYXdhaXQgUXVlcnkubXVsdGlUaGluZ01ldGEoc2NvcGUsIHtcbiAgICAgIHRoaW5nU291bHM6IG9wU291bHMsXG4gICAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsXG4gICAgICBkYXRhOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBpZiAoc3BlYy5jaGF0VG9waWMpIHtcbiAgICBjb25zdCBjaGF0UGF0aCA9IGAvdC8ke3NwZWMuY2hhdFRvcGljfS9jaGF0YDtcblxuICAgIGlmIChjaGF0UGF0aCAhPT0gcGF0aClcbiAgICAgIGF3YWl0IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBgL3QvJHtzcGVjLmNoYXRUb3BpY30vY2hhdGAsIHt9KTtcbiAgfVxuXG4gIHJldHVybiBzY29wZS5nZXRDYWNoZSgpO1xufTtcblxuY29uc3QgbGlzdGluZyA9ICh7XG4gIHByZWZpeDogZGVmYXVsdFByZWZpeCA9IFwidFwiLFxuICBpZGVudGlmaWVyOiBkZWZhdWx0SWRlbnRpZmllciA9IFwiYWxsXCIsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJob3RcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PiB3aXRoTGlzdGluZ01hdGNoKGAvJHtwcmVmaXh9LyR7aWRlbnRpZmllcn0vJHtzb3J0fWAsIHF1ZXJ5KVxufSk7XG5cbmNvbnN0IHRoaW5nQ29tbWVudHMgPSAoe1xuICBwcmVmaXg6IGRlZmF1bHRQcmVmaXggPSBcInRcIixcbiAgaWRlbnRpZmllcjogZGVmYXVsdElkZW50aWZpZXIgPSBcImFsbFwiLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiYmVzdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5Db21tZW50TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogb3BJZCxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBSLmFzc29jKFwibGltaXRcIiwgMTAwMCwgcXVlcnkpXG4gICAgKVxufSk7XG5cbmNvbnN0IHNwYWNlTGlzdGluZyA9ICh7XG4gIG5hbWU6IGRlZmF1bHROYW1lID0gXCJkZWZhdWx0XCIsXG4gIGF1dGhvcklkOiBkZWZhdWx0QXV0aG9ySWQsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJkZWZhdWx0XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgYXV0aG9ySWQgPSBkZWZhdWx0QXV0aG9ySWQsXG4gICAgICBuYW1lID0gZGVmYXVsdE5hbWUsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgYXV0aG9ySWQ6IGF1dGhvcklkIHx8IENvbmZpZy5vd25lcixcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5jb25zdCBzcGFjZVRoaW5nQ29tbWVudHMgPSAoe1xuICBuYW1lOiBkZWZhdWx0TmFtZSA9IFwiZGVmYXVsdFwiLFxuICBhdXRob3JJZDogZGVmYXVsdEF1dGhvcklkLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiaG90XCIsXG4gIC4uLnJlc3Rcbn0pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBhdXRob3JJZCA9IGRlZmF1bHRBdXRob3JJZCxcbiAgICAgIG5hbWUgPSBkZWZhdWx0TmFtZSxcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHNwYWNlUGF0aCA9IExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiBhdXRob3JJZCB8fCBDb25maWcub3duZXIsXG4gICAgICBuYW1lLFxuICAgICAgc29ydFxuICAgIH0pO1xuICAgIGNvbnN0IGxpc3RpbmdQYXRoID0gTGlzdGluZ1R5cGUuQ29tbWVudExpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBvcElkLFxuICAgICAgc29ydFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNwYWNlOiBxdWVyeShcbiAgICAgICAgc2NvcGUgPT4gTGlzdGluZy5zcGVjRnJvbVBhdGgoc2NvcGUsIHNwYWNlUGF0aCwgcXVlcnkpLFxuICAgICAgICBgc3BlYzoke3NwYWNlUGF0aH1gXG4gICAgICApLFxuICAgICAgaWRzOiBxdWVyeShcbiAgICAgICAgc2NvcGUgPT4gTGlzdGluZy5mcm9tUGF0aChzY29wZSwgbGlzdGluZ1BhdGgsIHF1ZXJ5KSxcbiAgICAgICAgbGlzdGluZ1BhdGhcbiAgICAgICksXG4gICAgICBwcmVsb2FkOiBzY29wZSA9PiBwcmVsb2FkTGlzdGluZyhzY29wZSwgbGlzdGluZ1BhdGgsIHF1ZXJ5KVxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm9maWxlID0gKHtcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcIm5ld1wiLFxuICB0eXBlOiBkZWZhdWx0VHlwZSA9IFwib3ZlcnZpZXdcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7IGF1dGhvcklkLCB0eXBlID0gZGVmYXVsdFR5cGUsIHNvcnQgPSBkZWZhdWx0U29ydCB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLlByb2ZpbGVMaXN0aW5nLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmNvbnN0IGluYm94ID0gKHtcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcIm5ld1wiLFxuICB0eXBlOiBkZWZhdWx0VHlwZSA9IFwib3ZlcnZpZXdcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgYXV0aG9ySWQsXG4gICAgcGFyYW1zOiB7IHR5cGUgPSBkZWZhdWx0VHlwZSwgc29ydCA9IGRlZmF1bHRTb3J0IH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuSW5ib3hMaXN0aW5nLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmV4cG9ydCBjb25zdCBQYWdlID0ge1xuICB3aXRoTGlzdGluZ01hdGNoLFxuICBwcmVsb2FkTGlzdGluZyxcbiAgd2lraVBhZ2UsXG4gIHRoaW5nQ29tbWVudHMsXG4gIGxpc3RpbmcsXG4gIHNwYWNlTGlzdGluZyxcbiAgc3BhY2VUaGluZ0NvbW1lbnRzLFxuICBwcm9maWxlLFxuICBpbmJveFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi9BdXRoZW50aWNhdGlvblwiO1xuXG5mdW5jdGlvbiBpbml0KEd1biwgY29uZmlnID0ge30pIHtcbiAgY29uc3QgeyBsZWVjaCwgZGlzYWJsZVZhbGlkYXRpb24sIG5vR3VuLCBsb2NhbFN0b3JhZ2UsIHBlcnNpc3QsIC4uLnJlc3QgfSA9XG4gICAgY29uZmlnIHx8IHt9O1xuICBjb25zdCBwZWVyID0geyBjb25maWcgfTtcblxuICBpZiAoIW5vR3VuKSB7XG4gICAgY29uc3QgY2ZnID0geyBsb2NhbFN0b3JhZ2U6ICEhbG9jYWxTdG9yYWdlLCByYWRpc2s6ICEhcGVyc2lzdCwgLi4ucmVzdCB9O1xuXG4gICAgaWYgKHBlcnNpc3QpIGNmZy5sb2NhbFN0b3JhZ2UgPSBmYWxzZTtcbiAgICBpZiAoIWRpc2FibGVWYWxpZGF0aW9uKSBHdW4ub24oXCJvcHRcIiwgVmFsaWRhdGlvbi5ndW5XaXJlSW5wdXQocGVlcikpO1xuICAgIGlmIChjZmcuc3RvcmVGbikgY2ZnLnN0b3JlID0gY2ZnLnN0b3JlRm4oY2ZnKTsgLy8gZm9yIGluZGV4ZWRkYlxuICAgIHBlZXIuZ3VuID0gR3VuKGNmZyk7XG4gICAgaWYgKGNmZy5sb2NhbFN0b3JhZ2UpIHBlZXIuZ3VuLm9uKFwibG9jYWxTdG9yYWdlOmVycm9yXCIsIGEgPT4gYS5yZXRyeSh7fSkpO1xuICAgIGlmIChsZWVjaCkge1xuICAgICAgY29uc3Qgc2VuZExlZWNoID0gKCkgPT4gcGVlci5ndW4uXy5vbihcIm91dFwiLCB7IGxlZWNoOiB0cnVlIH0pO1xuXG4gICAgICBzZW5kTGVlY2goKTtcbiAgICB9XG4gIH1cblxuICBwZWVyLm5ld1Njb3BlID0gb3B0cyA9PiBRdWVyeS5jcmVhdGVTY29wZShwZWVyLCBvcHRzKTtcbiAgcGVlci5vbkxvZ2luID0gQXV0aGVudGljYXRpb24ub25Mb2dpbihwZWVyKTtcbiAgcGVlci5zaWdudXAgPSBBdXRoZW50aWNhdGlvbi5zaWdudXAocGVlcik7XG4gIHBlZXIubG9naW4gPSBBdXRoZW50aWNhdGlvbi5sb2dpbihwZWVyKTtcbiAgcGVlci5sb2dvdXQgPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5sb2dvdXQocGVlcik7XG4gIHBlZXIuaXNMb2dnZWRJbiA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4ocGVlcik7XG4gIHBlZXIuc3VibWl0ID0gVGhpbmcuc3VibWl0KHBlZXIpO1xuICBwZWVyLmNvbW1lbnQgPSBUaGluZy5jb21tZW50KHBlZXIpO1xuICBwZWVyLmNoYXQgPSBUaGluZy5jaGF0KHBlZXIpO1xuICBwZWVyLndyaXRlUGFnZSA9IFRoaW5nLndyaXRlUGFnZShwZWVyKTtcbiAgcGVlci52b3RlID0gVGhpbmcudm90ZShwZWVyKTtcbiAgcGVlci5xdWVyaWVzID0gUXVlcnk7XG4gIHJldHVybiBwZWVyO1xufVxuXG5leHBvcnQgY29uc3QgUGVlciA9IHtcbiAgaW5pdFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBzY29wZSBhcyBtYWtlU2NvcGUsIHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmcvTGlzdGluZ05vZGVcIjtcblxuY29uc3QgZW1wdHlQcm9taXNlID0gcmVzb2x2ZShudWxsKTtcbmNvbnN0IHVuaW9uQXJyYXlzID0gUi5yZWR1Y2UoUi51bmlvbiwgW10pO1xuXG5jb25zdCB0b3BpY1NvdWxzID0gcGFyYW1zID0+IHtcbiAgY29uc3QgeyB0b3BpY3MgPSBbXCJhbGxcIl0gfSA9IHBhcmFtcyB8fCB7fTtcbiAgY29uc3QgZGF5cyA9IFIucHJvcE9yKDM2NSwgXCJkYXlzXCIsIHBhcmFtcykgfHwgMzY1O1xuICBjb25zdCBkYXlTdHJpbmdzID0gW107XG4gIGNvbnN0IG9uZURheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBvbmVEYXkgKiBwYXJzZUludChkYXlzLCAxMCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZGF5cyArIDE7IGkrKylcbiAgICBkYXlTdHJpbmdzLnB1c2goVGhpbmdTZXQuZGF5U3RyKHN0YXJ0ICsgaSAqIG9uZURheSkpO1xuICByZXR1cm4gT2JqZWN0LmtleXMoXG4gICAgdG9waWNzLnJlZHVjZShcbiAgICAgIChyZXN1bHQsIHRvcGljTmFtZSkgPT5cbiAgICAgICAgZGF5U3RyaW5ncy5yZWR1Y2UoKHJlcywgZHMpID0+IHtcbiAgICAgICAgICByZXNbYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLyR7dG9waWNOYW1lfS9kYXlzLyR7ZHN9YF0gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sIHJlc3VsdCksXG4gICAgICB7fVxuICAgIClcbiAgKTtcbn07XG5cbmNvbnN0IHNpbmdsZVRvcGljID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgdFNvdWxzID0gdG9waWNTb3Vscyh7IC4uLnBhcmFtcywgdG9waWNzOiBbcGFyYW1zLnRvcGljXSB9KTtcbiAgbGV0IHNvdWxzID0gW107XG4gIGxldCBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcblxuICBpZiAocGFyYW1zLnNvcnQgPT09IFwibmV3XCIpIHtcbiAgICBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1zLnNvcnQgPT09IFwidG9wXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgICBpZiAocGFyYW1zLnRvcGljID09PSBcImFsbFwiKSBpdGVtTWF4ID0gaXRlbU1heCAqIDM7XG4gIH1cblxuICBjb25zdCBmZXRjaE1vcmUgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9waWNTb3VsID0gdFNvdWxzLnBvcCgpO1xuXG4gICAgaWYgKHNvdWxzLmxlbmd0aCA+IGl0ZW1NYXggfHwgIXRvcGljU291bCkgcmV0dXJuIHJlc29sdmUoc291bHMpO1xuICAgIHJldHVybiBzY29wZVxuICAgICAgLmdldCh0b3BpY1NvdWwpXG4gICAgICAuc291bHMoKVxuICAgICAgLnRoZW4obW9yZSA9PiB7XG4gICAgICAgIHNvdWxzID0gWy4uLnNvdWxzLCAuLi5tb3JlXTtcbiAgICAgICAgcmV0dXJuIGZldGNoTW9yZSgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZldGNoTW9yZSgpO1xufSk7XG5cbmNvbnN0IHNpbmdsZURvbWFpbiA9IHF1ZXJ5KChzY29wZSwgeyBkb21haW4gfSkgPT5cbiAgc2NvcGUuZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWU6IGRvbWFpbiB9KSkuc291bHMoKVxuKTtcblxuY29uc3Qgc2luZ2xlQXV0aG9yID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIGFsbChbXG4gICAgcGFyYW1zLnR5cGUgJiYgcGFyYW1zLnR5cGUgIT09IFwic3VibWl0dGVkXCIgJiYgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIlxuICAgICAgPyByZXNvbHZlKFtdKVxuICAgICAgOiBzY29wZVxuICAgICAgICAgIC5nZXQoYH4ke3BhcmFtcy5hdXRob3JJZH1gKVxuICAgICAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgICAgIC5zb3VscygpLFxuICAgIHBhcmFtcy50eXBlICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwiY29tbWVudHNcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcIm92ZXJ2aWV3XCIgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tYW5kc1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChgfiR7cGFyYW1zLmF1dGhvcklkfWApXG4gICAgICAgICAgLmdldChcImNvbW1lbnRzXCIpXG4gICAgICAgICAgLnNvdWxzKClcbiAgXSkudGhlbigoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pID0+IHVuaW9uQXJyYXlzKFtzdWJtaXNzaW9ucywgY29tbWVudHNdKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdJZHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3VsKSA9PiBzY29wZS5nZXQoc291bCkudGhlbihMaXN0aW5nTm9kZS5zb3J0ZWRJZHMpLFxuICBcImxpc3RpbmdJZHNcIlxuKTtcblxuY29uc3Qgc2luZ2xlTGlzdGluZyA9IHF1ZXJ5KChzY29wZSwgeyBsaXN0aW5nLCBzb3J0LCBpbmRleGVyIH0pID0+XG4gIGxpc3RpbmdJZHMoc2NvcGUsIGAke0NvbnN0YW50cy5QUkVGSVh9JHtsaXN0aW5nfS8ke3NvcnR9QH4ke2luZGV4ZXJ9LmApLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLFxuICAgICAgUi5maWx0ZXIoUi5pZGVudGl0eSlcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHJlcGxpZXNUb0F1dGhvciA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgcmVwbGllc1RvQXV0aG9ySWQsIHR5cGUgPSBcIm92ZXJ2aWV3XCIsIC4uLnBhcmFtcyB9KSA9PlxuICAgIHNpbmdsZUxpc3Rpbmcoc2NvcGUsIHtcbiAgICAgIGxpc3Rpbmc6IGAvdXNlci8ke3JlcGxpZXNUb0F1dGhvcklkfS8ke3R5cGV9YCxcbiAgICAgIHNvcnQ6IFwibmV3XCIsXG4gICAgICAuLi5wYXJhbXNcbiAgICB9KS50aGVuKGF1dGhvcmVkU291bHMgPT5cbiAgICAgIGFsbChcbiAgICAgICAgYXV0aG9yZWRTb3Vscy5tYXAoYXV0aG9yZWRTb3VsID0+XG4gICAgICAgICAgc2NvcGUuZ2V0KGAke2F1dGhvcmVkU291bH0vY29tbWVudHNgKS5zb3VscygpXG4gICAgICAgIClcbiAgICAgICkudGhlbih1bmlvbkFycmF5cylcbiAgICApXG4pO1xuXG5jb25zdCBzaW5nbGVTdWJtaXNzaW9uID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIHNjb3BlXG4gICAgLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBwYXJhbXMuc3VibWlzc2lvbklkIH0pXG4gICAgKVxuICAgIC5zb3VscyhcbiAgICAgIFIucHJlcGVuZChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSkpXG4gICAgKVxuKTtcblxuY29uc3QgdGhpbmcgPSBxdWVyeSgoc2NvcGUsIHRoaW5nU291bCkgPT5cbiAgc2NvcGUuZ2V0KHRoaW5nU291bCkudGhlbihtZXRhID0+IHtcbiAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgaWQ6IG1ldGEuaWQsIHRpbWVzdGFtcDogcGFyc2VGbG9hdChtZXRhLnRpbWVzdGFtcCwgMTApIH07XG4gICAgY29uc3QgcmVwbHlUb1NvdWwgPSBSLnBhdGgoW1wicmVwbHlUb1wiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wU291bCA9IFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wSWQgPSBvcFNvdWwgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gob3BTb3VsKS50aGluZ2lkIDogbnVsbDtcbiAgICBjb25zdCByZXBseVRvSWQgPSByZXBseVRvU291bFxuICAgICAgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gocmVwbHlUb1NvdWwpLnRoaW5naWRcbiAgICAgIDogbnVsbDtcblxuICAgIGlmIChvcElkKSByZXN1bHQub3BJZCA9IG9wSWQ7XG4gICAgaWYgKHJlcGx5VG9JZCkgcmVzdWx0LnJlcGx5VG9JZCA9IHJlcGx5VG9JZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgbXVsdGlRdWVyeSA9IChzaW5nbGVRdWVyeSwgcGx1cmFsLCBzaW5nbGUsIGNvbGxhdGUgPSB1bmlvbkFycmF5cykgPT5cbiAgcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IFIucHJvcChwbHVyYWwsIHBhcmFtcyk7XG5cbiAgICBpZiAoUi5pc05pbChpdGVtcykpIHJldHVybiBlbXB0eVByb21pc2U7XG4gICAgcmV0dXJuIGFsbChcbiAgICAgIFIubWFwKFxuICAgICAgICB2YWwgPT4gc2luZ2xlUXVlcnkoc2NvcGUsIHsgLi4ucGFyYW1zLCBbc2luZ2xlXTogdmFsIH0pLFxuICAgICAgICBSLnByb3BPcihbXSwgcGx1cmFsLCBwYXJhbXMpXG4gICAgICApXG4gICAgKS50aGVuKGNvbGxhdGUpO1xuICB9KTtcblxuY29uc3QgbXVsdGlUb3BpYyA9IG11bHRpUXVlcnkoc2luZ2xlVG9waWMsIFwidG9waWNzXCIsIFwidG9waWNcIik7XG5jb25zdCBtdWx0aURvbWFpbiA9IG11bHRpUXVlcnkoc2luZ2xlRG9tYWluLCBcImRvbWFpbnNcIiwgXCJkb21haW5cIik7XG5jb25zdCBtdWx0aUF1dGhvciA9IG11bHRpUXVlcnkoc2luZ2xlQXV0aG9yLCBcImF1dGhvcklkc1wiLCBcImF1dGhvcklkXCIpO1xuY29uc3QgbXVsdGlTdWJtaXNzaW9uID0gbXVsdGlRdWVyeShcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgXCJzdWJtaXNzaW9uSWRzXCIsXG4gIFwic3VibWlzc2lvbklkXCJcbik7XG5cbmNvbnN0IHRoaW5nRGF0YUZyb21Tb3VscyA9IHNjb3BlID0+IHNvdWxzID0+XG4gIGFsbChcbiAgICBzb3Vsc1xuICAgICAgLmZpbHRlcih4ID0+ICEheClcbiAgICAgIC5tYXAoc291bCA9PlxuICAgICAgICBzY29wZVxuICAgICAgICAgIC5nZXQoc291bClcbiAgICAgICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgICAgIC50aGVuKHggPT4geClcbiAgICAgIClcbiAgKTtcblxuY29uc3QgY3VyYXRlZCA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWRzLCBzdWJtaXNzaW9uT25seSA9IGZhbHNlKSA9PlxuICBhbGwoW1xuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcImNvbW1lbnRzXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KVxuICAgICAgLnRoZW4odGhpbmdEYXRhRnJvbVNvdWxzKHNjb3BlKSlcbiAgICAgIC50aGVuKFxuICAgICAgICBSLmNvbXBvc2UoXG4gICAgICAgICAgUi5tYXAoc3VibWlzc2lvbk9ubHkgPyBSLnByb3AoXCJvcElkXCIpIDogUi5wcm9wKFwicmVwbHlUb0lkXCIpKSxcbiAgICAgICAgICBSLmZpbHRlcihSLnByb3AoXCJyZXBseVRvSWRcIikpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgbXVsdGlBdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGU6IFwic3VibWl0dGVkXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KS50aGVuKFIubWFwKHNvdWwgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpLnRoaW5nSWQpKVxuICBdKS50aGVuKChbaWRzMSwgaWRzMl0pID0+IFIudW5pcShbLi4uaWRzMSwgLi4uaWRzMl0pKVxuKTtcblxuY29uc3QgdGhpbmdTY29yZXMgPSBxdWVyeShcbiAgKHNjb3BlLCB0YWJ1bGF0b3IsIHRoaW5nSWQpID0+XG4gICAgdGFidWxhdG9yICYmIHRoaW5nSWRcbiAgICAgID8gc2NvcGVcbiAgICAgICAgICAuZ2V0KFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQsIHRhYnVsYXRvciB9KSlcbiAgICAgICAgICAudGhlbigpXG4gICAgICA6IHJlc29sdmUoKSxcbiAgXCJ0aGluZ1Njb3Jlc1wiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGEgPSBxdWVyeSgoc2NvcGUsIHRoaW5nSWQpID0+IHtcbiAgcmV0dXJuIHRoaW5nSWRcbiAgICA/IHNjb3BlLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLmdldChcImRhdGFcIilcbiAgICA6IHJlc29sdmUobnVsbCk7XG59LCBcInRoaW5nRGF0YVwiKTtcblxuY29uc3QgdGhpbmdNZXRhID0gcXVlcnkoXG4gIChzY29wZSwgeyB0aGluZ1NvdWwsIHRhYnVsYXRvciwgZGF0YSA9IGZhbHNlLCBzY29yZXMgPSBmYWxzZSB9KSA9PiB7XG4gICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgIGNvbnN0IGlkID0gTGlzdGluZ05vZGUuc291bFRvSWQodGhpbmdTb3VsKTtcblxuICAgIHJldHVybiBhbGwoW1xuICAgICAgdGhpbmcoc2NvcGUsIHRoaW5nU291bCksXG4gICAgICBzY29yZXNcbiAgICAgICAgPyB0aGluZ1Njb3JlcyhzY29wZSwgdGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsIGlkKVxuICAgICAgICA6IHJlc29sdmUoKSxcbiAgICAgIGRhdGEgPyB0aGluZ0RhdGEoc2NvcGUsIGlkKSA6IHJlc29sdmUoKVxuICAgIF0pLnRoZW4oKFttZXRhLCB2b3RlcywgZGF0YV0pID0+IHtcbiAgICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4geyAuLi5tZXRhLCB2b3RlcywgZGF0YSB9O1xuICAgIH0pO1xuICB9XG4pO1xuXG5jb25zdCBtdWx0aVRoaW5nTWV0YSA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBhbGwoXG4gICAgUi5yZWR1Y2UoXG4gICAgICAocHJvbWlzZXMsIHRoaW5nU291bCkgPT4ge1xuICAgICAgICBpZiAoIXRoaW5nU291bCkgcmV0dXJuIHByb21pc2VzO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaW5nTWV0YShzY29wZSwgeyAuLi5wYXJhbXMsIHRoaW5nU291bCB9KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlcztcbiAgICAgIH0sXG4gICAgICBbXSxcbiAgICAgIFIucHJvcE9yKFtdLCBcInRoaW5nU291bHNcIiwgcGFyYW1zKVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgdXNlclBhZ2VzID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQpID0+XG4gICAgc2NvcGUuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpLFxuICBcInVzZXJQYWdlc1wiXG4pO1xuXG5jb25zdCB3aWtpUGFnZUlkID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT4ge1xuICBpZiAoIWF1dGhvcklkIHx8ICFuYW1lKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgcmV0dXJuIHNjb3BlXG4gICAgLmdldChTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkIH0pKVxuICAgIC5nZXQobmFtZSlcbiAgICAuZ2V0KFwiaWRcIik7XG59LCBcIndpa2lQYWdlSWRcIik7XG5cbmNvbnN0IHdpa2lQYWdlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgd2lraVBhZ2VJZChzY29wZSwgYXV0aG9ySWQsIG5hbWUpLnRoZW4oaWQgPT4gaWQgJiYgdGhpbmdEYXRhKHNjb3BlLCBpZCkpXG4pO1xuXG5jb25zdCB1c2VyTWV0YSA9IHF1ZXJ5KChzY29wZSwgaWQpID0+IHtcbiAgaWYgKCFpZCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gIHJldHVybiBzY29wZS5nZXQoYH4ke2lkfWApLnRoZW4obWV0YSA9PiAoe1xuICAgIGFsaWFzOiBSLnByb3AoXCJhbGlhc1wiLCBtZXRhKSxcbiAgICBjcmVhdGVkQXQ6IFIucGF0aChbXCJfXCIsIFwiPlwiLCBcInB1YlwiXSwgbWV0YSlcbiAgfSkpO1xufSwgXCJ1c2VyTWV0YVwiKTtcblxuY29uc3QgY3JlYXRlU2NvcGUgPSBSLmN1cnJ5KChuYWIsIG9wdHMpID0+XG4gIG1ha2VTY29wZShSLmFzc29jKFwiZ3VuXCIsIG5hYi5ndW4sIG9wdHMgfHwge30pKVxuKTtcblxuZXhwb3J0IGNvbnN0IFF1ZXJ5ID0ge1xuICBzaW5nbGVUb3BpYyxcbiAgc2luZ2xlRG9tYWluLFxuICBzaW5nbGVBdXRob3IsXG4gIHNpbmdsZUxpc3RpbmcsXG4gIHJlcGxpZXNUb0F1dGhvcixcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgdGhpbmdNZXRhLFxuICBtdWx0aVRoaW5nTWV0YSxcbiAgbXVsdGlUb3BpYyxcbiAgbXVsdGlEb21haW4sXG4gIG11bHRpQXV0aG9yLFxuICBtdWx0aVN1Ym1pc3Npb24sXG4gIHRoaW5nU2NvcmVzLFxuICB0aGluZ0RhdGEsXG4gIHRoaW5nRGF0YUZyb21Tb3VscyxcbiAgdG9waWNTb3VscyxcbiAgdXNlclBhZ2VzLFxuICB3aWtpUGFnZUlkLFxuICB3aWtpUGFnZSxcbiAgdXNlck1ldGEsXG4gIGNyZWF0ZVNjb3BlLFxuICBjdXJhdGVkXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgLi4uc2VhLkFVVEhfU0NIRU1BLFxuICB0b3BpY05hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRVxuICB9LFxuXG4gIFRvcGljRGF5OiB7XG4gICAgdGl0bGU6IFwiVG9waWMgRGF5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQSBzaW5nbGUgZGF5IG9mIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWUvZGF5cy86eWVhci86bW9udGgvOmRheWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICB5ZWFyOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDIwMTgsIG1heGltdW06IDIxMDAgfSxcbiAgICAgICAgbW9udGg6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMTIgfSxcbiAgICAgICAgZGF5OiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDMxIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCIsIFwieWVhclwiLCBcIm1vbnRoXCIsIFwiZGF5XCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBUb3BpYzoge1xuICAgIHRpdGxlOiBcIlRvcGljXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIGRvbWFpbk5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfRE9NQUlOX1NJWkVcbiAgfSxcblxuICBEb21haW46IHtcbiAgICB0aXRsZTogXCJEb21haW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgZG9tYWluXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWlucy86ZG9tYWluTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbk5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluTmFtZVwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB1cmw6IHsgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1VSTF9TSVpFIH0sXG4gIFVSTDoge1xuICAgIHRpdGxlOiBcIlVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgZm9yIGEgZ2l2ZW4gVVJMXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXJscy9cXCp1cmxgLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVybDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInVybFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aGluZ0lkOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfSEFTSF9TSVpFXG4gIH0sXG5cbiAgdGhpbmdTb3VsOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGhpbmdJZDogeyBcIiNyZWZcIjogXCIjZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdBbGxDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIEFsbCBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBjb21tZW50cyBmb3IgYSBnaXZlbiBzdWJtaXNzaW9uXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2FsbGNvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3QgcmVwbGllcyB0byBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aW1lc3RhbXA6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0sXG4gIHRoaW5nS2luZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0tJTkRfU0laRVxuICB9LFxuXG4gIFRoaW5nOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgUmVmZXJlbmNlXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoZXNlIGFyZSBzdWJtaXNzaW9ucywgY29tbWVudHMsIGNoYXQgbWVzc2FnZXMgYW5kIHdpa2kgcGFnZXNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWRgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IGlkOiBcInRoaW5nSWRcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGtpbmQ6IHsgXCIjcmVmXCI6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9LFxuICAgICAgb3JpZ2luYWxIYXNoOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb25lT2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFFZGdlXCIgfSxcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFTaWduZWRFZGdlXCIgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgdG9waWM6IHtcbiAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbWUgb2xkIHRoaW5ncyBoYWQgZ2VuZXJpYyB0b3BpYyBzb3Vsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgXCIjXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiA0MiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFtcIiNcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL0RvbWFpbkVkZ2VcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9VUkxFZGdlXCIgfSxcbiAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH0sXG4gICAgICBvcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIHJlcGx5VG86IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1NFQUF1dGhvckVkZ2VcIiB9XG4gICAgfSxcblxuICAgIGFueU9mOiBbXG4gICAgICB7XG4gICAgICAgIGFsbE9mOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpbmdIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgICAgIHsgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nOiB0cnVlIH0sXG4gICAgICAgICAgICAgIHsgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaDogdHJ1ZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyBpc0xlZ2FjeVRoaW5nOiB0cnVlIH0sXG4gICAgICB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU2VsZiB2ZXJpZnlpbmcgY2FuIGJlIHVwZGF0ZWQgaW4gaXNvbGF0aW9uXCIsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuXG4gIFByb29mT2ZXb3JrVm90ZXM6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAga2V5c0FyZVByb29mc09mV29yazoge1xuICAgICAgYWxnb3JpdGhtOiBcImFyZ29uMmRcIixcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjb21wbGV4aXR5OiA2LFxuICAgICAgICBoYXNoTGVuZ3RoOiAzMixcbiAgICAgICAgdGltZUNvc3Q6IDEsXG4gICAgICAgIG1lbW9yeUNvc3Q6IDEwMjQwLFxuICAgICAgICBwYXJhbGxlbGlzbTogMVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVzVXA6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXN1cGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdWb3Rlc0Rvd246IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXNkb3duYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ0RhdGE6IHtcbiAgICB0aXRsZTogXCJVbnNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH0sXG4gICAgICBhdXRob3JJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgb3BJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICByZXBseVRvSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdXJsXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfVxuICAgIH0sXG4gICAgdGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gIH0sXG5cbiAgVGhpbmdEYXRhU2lnbmVkOiB7XG4gICAgdGl0bGU6IFwiU2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZywgY3J5cHRvZ3JhcGhpY2FsbHkgc2lnbmVkXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGF+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCIsIFwiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0gfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSB9LFxuICAgICAgYm9keToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9XG4gICAgICB9LFxuICAgICAgYXV0aG9ySWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSB9LFxuICAgICAgb3BJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIHJlcGx5VG9JZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIGRvbWFpbjogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0gfSxcbiAgICAgIHVybDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfSB9LFxuICAgICAgdGltZXN0YW1wOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9IH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3RlQ291bnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgVm90ZSBDb3VudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBZ2dyZWdhdGVkIGNvdW50cyBmcm9tIGEgdGFidWxhdG9yXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVjb3VudHNAfjp0YWJ1bGF0b3IuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgdGFidWxhdG9yOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXA6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBkb3duOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWVudDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIHNjb3JlOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWFuZHM6IHsgc2VhOiB7IHR5cGU6IFtcIm9iamVjdFwiLCBcInN0cmluZ1wiXSB9IH1cbiAgICB9XG4gIH0sXG5cbiAgTGlzdGluZ0RhdGE6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAgdGl0bGU6IFwiTGlzdGluZyBOb2RlIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTaGFyZWQgZGVzY3JpcHRpb24gb2YgbGlzdGluZyBwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAvLyBYWFg6IHRoZXNlIGFyZSBhbGwgZGVwcmVjYXRlZFxuICAgICAgaWRzOiB7XG4gICAgICAgIHNlYTogeyBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19JRFNfU0laRSB9XG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHNlYTogeyBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19TT1VSQ0VfU0laRSB9XG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICBzZWE6IHsgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RPUElDX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIHN1Ym1pdFRvcGljOiB7XG4gICAgICAgIHNlYTogeyBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRSB9XG4gICAgICB9LFxuICAgICAgdGFiczoge1xuICAgICAgICBzZWE6IHsgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0xJU1RJTkdfVEFCU19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBjdXJhdG9yczoge1xuICAgICAgICBzZWE6IHsgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIGNlbnNvcnM6IHtcbiAgICAgICAgc2VhOiB7IG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG4gICAgICB1c2VySWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSB9LFxuICAgICAgb3BJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIGlzQ2hhdDogeyBzZWE6IHsgdHlwZTogW1wiYm9vbGVhblwiLCBcInN0cmluZ1wiXSB9IH1cbiAgICB9LFxuICAgIHBhdHRlcm5Qcm9wZXJ0aWVzOiB7XG4gICAgICBcIl5kKyRcIjogeyBzZWE6IHsgdHlwZTogW1wic3RyaW5nXCIsIFwibnVsbFwiLCBcInVuZGVmaW5lZFwiXSB9IH1cbiAgICB9XG4gIH0sXG5cbiAgc29ydE5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGVudW06IFtcbiAgICAgIFwibmV3XCIsXG4gICAgICBcIm9sZFwiLFxuICAgICAgXCJhY3RpdmVcIixcbiAgICAgIFwidG9wXCIsXG4gICAgICBcImNvbW1lbnRzXCIsXG4gICAgICBcImRpc2N1c3NlZFwiLFxuICAgICAgXCJob3RcIixcbiAgICAgIFwiYmVzdFwiLFxuICAgICAgXCJjb250cm92ZXJzaWFsXCIsXG4gICAgICBcInJhbmRvbVwiLFxuICAgICAgXCJmaXJlaG9zZVwiLFxuICAgICAgXCJjaGF0XCJcbiAgICBdXG4gIH0sXG5cbiAgVG9waWNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdC86dG9waWMvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICByZXF1aXJlZDogW1widG9waWNcIiwgXCJzb3J0XCIsIFwiaW5kZXhlclwiXSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWM6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIERvbWFpbkxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9kb21haW4vOmRvbWFpbi86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHJlcXVpcmVkOiBbXCJkb21haW5cIiwgXCJzb3J0XCIsIFwiaW5kZXhlclwiXSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZG9tYWluOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICB1c2VyTGlzdGluZ1R5cGU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGVudW06IFtcIm92ZXJ2aWV3XCIsIFwic3VibWl0dGVkXCIsIFwiY29tbWVudHNcIiwgXCJjb21tYW5kc1wiLCBcImNvbW1lbnRlZFwiXVxuICB9LFxuXG4gIEF1dGhvclJlcGxpZXNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7XG4gICAgICAgIENvbnN0YW50cy5QUkVGSVhcbiAgICAgIH0vdXNlci86YXV0aG9ySWQvcmVwbGllcy86dHlwZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHR5cGU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXNlckxpc3RpbmdUeXBlXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgQXV0aG9yUHJvZmlsZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS91c2VyLzphdXRob3JJZC86dHlwZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHR5cGU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXNlckxpc3RpbmdUeXBlXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgU3BhY2VMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7XG4gICAgICAgIENvbnN0YW50cy5QUkVGSVhcbiAgICAgIH0vdXNlci86YXV0aG9ySWQvc3BhY2VzLzpuYW1lLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgbmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JDb21tZW50czoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcnMgY29tbWVudHMgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vY29tbWVudHN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclN1Ym1pc3Npb25zOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgU3VibWlzc2lvbnNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9yJ3Mgc3VibWlzc2lvbnMgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vc3VibWlzc2lvbnN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JUaGluZ3M6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBUaGluZ3NcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9yJ3MgdGhpbmdzIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5nc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yUGFnZXM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IgUGFnZSBNYXBcIixcbiAgICBkZXNjcmlwdGlvbjogXCJNYXBwaW5nIG9mIHBhZ2UgbmFtZXMgdG8gdGhpbmdzXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vcGFnZXN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCByb3V0ZXMgPSBSLmtleXMoZGVmaW5pdGlvbnMpLnJlZHVjZSgocmVzdWx0LCBuYW1lKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBSLnBhdGgoW25hbWUsIFwic291bFwiLCBcInBhdHRlcm5cIl0sIGRlZmluaXRpb25zKTtcblxuICBpZiAoIXBhdHRlcm4pIHJldHVybiByZXN1bHQ7XG4gIHJldHVybiBSLmFzc29jKG5hbWUsIG5ldyBSb3V0ZShwYXR0ZXJuKSwgcmVzdWx0KTtcbn0pO1xuXG5jb25zdCBkZWZzV2l0aFJvdXRlcyA9IFIuY29tcG9zZShcbiAgUi5yZWR1Y2UoXG4gICAgKHJlcywgW25hbWUsIHJvdXRlXSkgPT5cbiAgICAgIFIuYXNzb2MobmFtZSwgUi5hc3NvYyhcInJvdXRlXCIsIHJvdXRlLCBSLnByb3AobmFtZSwgZGVmaW5pdGlvbnMpKSwgcmVzKSxcbiAgICB7fVxuICApLFxuICBSLnRvUGFpcnNcbikocm91dGVzKTtcblxuZXhwb3J0IGNvbnN0IFNjaGVtYSA9IHtcbiAgLi4uZGVmc1dpdGhSb3V0ZXMsXG4gIGRlZmluaXRpb25zLFxuICByb3V0ZXNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgQ29tbWVudENvbW1hbmQgfSBmcm9tIFwiLi9Db21tZW50Q29tbWFuZFwiO1xuXG5jb25zdCB0YWJ1bGF0b3JRdWVyeSA9IHF1ZXJ5KGFzeW5jIChzY29wZSwgcm91dGUpID0+IHtcbiAgY29uc3QgdGhpbmdTb3VsID0gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2Uocm91dGUubWF0Y2gpO1xuICBjb25zdCBbdXAsIGRvd24sIGNvbW1lbnQsIHJlcGx5U291bHNdID0gYXdhaXQgYWxsKFtcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3Rlc3VwYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3Rlc2Rvd25gKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2FsbGNvbW1lbnRzYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgXSk7XG4gIGNvbnN0IHRoaW5nRGF0YSA9IGF3YWl0IFF1ZXJ5LnRoaW5nRGF0YUZyb21Tb3VscyhyZXBseVNvdWxzKTtcbiAgY29uc3QgY29tbWFuZE1hcCA9IENvbW1lbnRDb21tYW5kLm1hcCh0aGluZ0RhdGEpO1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdXAsXG4gICAgZG93bixcbiAgICBjb21tZW50LFxuICAgIHJlcGxpZXM6IHJlcGx5U291bHMubGVuZ3RoLFxuICAgIHNjb3JlOiB1cCAtIGRvd25cbiAgfTtcblxuICBpZiAoUi5rZXlzKGNvbW1hbmRNYXApLmxlbmd0aCkgcmVzdWx0LmNvbW1hbmRzID0gSlNPTi5zdHJpbmdpZnkoY29tbWFuZE1hcCk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRhYnVsYXRvciA9IHsgcXVlcnk6IHRhYnVsYXRvclF1ZXJ5IH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5cbmV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5cbmNvbnN0IHRvcGljUHJlZml4ZXMgPSB7XG4gIGNoYXRtc2c6IFwiY2hhdDpcIixcbiAgY29tbWVudDogXCJjb21tZW50czpcIlxufTtcblxuY29uc3Qgc291bFRvSWQgPSBSLmNvbXBvc2UoXG4gIFIucHJvcChcInRoaW5nSWRcIiksXG4gIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaC5iaW5kKFNjaGVtYS5UaGluZy5yb3V0ZSlcbik7XG5cbmNvbnN0IHNvdWxzVG9JZHMgPSBSLm1hcChzb3VsVG9JZCk7XG5cbmNvbnN0IGluZGV4ID0gUi5jdXJyeSgocGVlciwgdGhpbmdJZCwgZGF0YSkgPT4ge1xuICBpZiAoIWRhdGEudG9waWMgJiYgIWRhdGEub3BJZCkgcmV0dXJuO1xuXG4gIGlmIChkYXRhLm9wSWQgJiYgIWRhdGEudG9waWMpIHtcbiAgICBwZWVyLmd1blxuICAgICAgLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KSlcbiAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAub24oZnVuY3Rpb24gcmVjdih0ZCkge1xuICAgICAgICBpZiAoIXRkKSByZXR1cm47XG4gICAgICAgIGluZGV4KHBlZXIsIHRoaW5nSWQsIHsgLi4uZGF0YSwgdG9waWM6IHRkLnRvcGljIHx8IFwiYWxsXCIgfSk7XG4gICAgICAgIHRoaXMub2ZmKCk7XG4gICAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0aGluZyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXlTdHIgPSBUaGluZ1NldC5kYXlTdHIoZGF0YS50aW1lc3RhbXApO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXlTdHIuc3BsaXQoXCIvXCIpO1xuICBjb25zdCB0b3BpY1ByZWZpeCA9IHRvcGljUHJlZml4ZXNbZGF0YS5raW5kXSB8fCBcIlwiO1xuICBjb25zdCBiYXNlVG9waWNOYW1lID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3QgdG9waWNOYW1lID0gdG9waWNQcmVmaXggKyBiYXNlVG9waWNOYW1lO1xuICBjb25zdCB0b3BpYyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSB9KSk7XG4gIGNvbnN0IHRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lLCB5ZWFyLCBtb250aCwgZGF5IH0pXG4gICk7XG5cbiAgaWYgKCFkYXRhLnNraXBBbGwgJiYgZGF0YS50b3BpYyAhPT0gXCJhbGxcIikge1xuICAgIGNvbnN0IGFsbG5hbWUgPSBgJHt0b3BpY1ByZWZpeH1hbGxgO1xuICAgIGNvbnN0IGFsbFRvcGljID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IGFsbG5hbWUgfSlcbiAgICApO1xuICAgIGNvbnN0IGFsbFRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljRGF5LnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0b3BpY05hbWU6IGFsbG5hbWUsXG4gICAgICAgIHllYXIsXG4gICAgICAgIG1vbnRoLFxuICAgICAgICBkYXlcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGFsbFRvcGljLnNldCh0aGluZyk7XG4gICAgYWxsVG9waWNEYXkuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIGlmIChkYXRhLmtpbmQgPT09IFwic3VibWlzc2lvblwiKSB7XG4gICAgY29uc3QgdXJsSW5mbyA9IGRhdGEudXJsID8gcGFyc2VVUkkoZGF0YS51cmwpIDoge307XG4gICAgY29uc3QgZG9tYWluTmFtZSA9IChkYXRhLnVybFxuICAgICAgPyAodXJsSW5mby5ob3N0IHx8IHVybEluZm8uc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKVxuICAgICAgOiBgc2VsZi4ke2RhdGEudG9waWN9YFxuICAgICkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBkb21haW4gPSBwZWVyLmd1bi5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZSB9KSk7XG5cbiAgICBkb21haW4uc2V0KHRoaW5nKTtcblxuICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgY29uc3QgdXJsTm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVVJMLnJvdXRlLnJldmVyc2UoeyB1cmw6IGRhdGEudXJsIH0pKTtcblxuICAgICAgLy8gdGhpbmcuZ2V0KFwidXJsXCIpLnB1dCh1cmxOb2RlKTtcbiAgICAgIHVybE5vZGUuc2V0KHRoaW5nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGF0YS5vcElkKSB7XG4gICAgY29uc3QgYWxsY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogZGF0YS5vcElkIH0pXG4gICAgKTtcblxuICAgIGFsbGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkKSB7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgdG9waWMuc2V0KHRoaW5nKTtcbiAgdG9waWNEYXkuc2V0KHRoaW5nKTtcbn0pO1xuXG5jb25zdCBwdXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGRhdGEudGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gb2JqSGFzaChkYXRhKTtcbiAgY29uc3QgeyB0aW1lc3RhbXAsIGtpbmQsIHRvcGljLCBhdXRob3JJZCwgb3BJZCwgcmVwbHlUb0lkIH0gPSBkYXRhO1xuICBjb25zdCB0aGluZ0lkID0gb2JqSGFzaCh7XG4gICAgdGltZXN0YW1wLFxuICAgIGtpbmQsXG4gICAgdG9waWMsXG4gICAgYXV0aG9ySWQsXG4gICAgb3BJZCxcbiAgICByZXBseVRvSWQsXG4gICAgb3JpZ2luYWxIYXNoXG4gIH0pO1xuXG4gIGNvbnN0IG5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF0YVNvdWwgPSBhdXRob3JJZFxuICAgID8gU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCwgYXV0aG9ySWQgfSlcbiAgICA6IFNjaGVtYS5UaGluZ0RhdGEucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9yaWdpbmFsSGFzaCB9KTtcblxuICBjb25zdCBtZXRhRGF0YSA9IHtcbiAgICBpZDogdGhpbmdJZCxcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICBvcmlnaW5hbEhhc2gsXG4gICAgZGF0YTogeyBcIiNcIjogZGF0YVNvdWwgfSxcbiAgICB2b3Rlc3VwOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdWb3Rlc1VwLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgdm90ZXNkb3duOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdWb3Rlc0Rvd24ucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICBhbGxjb21tZW50czogeyBcIiNcIjogU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICBjb21tZW50czogeyBcIiNcIjogU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfVxuICB9O1xuXG4gIGlmICh0b3BpYylcbiAgICBtZXRhRGF0YS50b3BpYyA9IHsgXCIjXCI6IFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiB0b3BpYyB9KSB9O1xuICBpZiAoYXV0aG9ySWQpIG1ldGFEYXRhLmF1dGhvciA9IHsgXCIjXCI6IGB+JHthdXRob3JJZH1gIH07XG4gIGlmIChvcElkKVxuICAgIG1ldGFEYXRhLm9wID0geyBcIiNcIjogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcElkIH0pIH07XG4gIGlmIChyZXBseVRvSWQpXG4gICAgbWV0YURhdGEucmVwbHlUbyA9IHtcbiAgICAgIFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHJlcGx5VG9JZCB9KVxuICAgIH07XG5cbiAgcGVlci5ndW4uZ2V0KGRhdGFTb3VsKS5wdXQoZGF0YSk7XG4gIG5vZGUucHV0KG1ldGFEYXRhKTtcbiAgaW5kZXgocGVlciwgdGhpbmdJZCwgZGF0YSk7XG4gIHJldHVybiBub2RlO1xufSk7XG5cbmNvbnN0IHN1Ym1pdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKGRhdGEuZG9tYWluKSBkYXRhLmRvbWFpbiA9IGRhdGEuZG9tYWluLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIHRpbWVzdGFtcCwga2luZDogXCJzdWJtaXNzaW9uXCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHN1Ym1pc3Npb25zU291bCA9IFNjaGVtYS5BdXRob3JTdWJtaXNzaW9ucy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcbiAgICBjb25zdCBzdWJtaXNzaW9ucyA9IHBlZXIuZ3VuLmdldChzdWJtaXNzaW9uc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAucHV0KHN1Ym1pc3Npb25zKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgICBzdWJtaXNzaW9ucy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IGNvbW1lbnQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwga2luZDogXCJjb21tZW50XCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IGNvbW1lbnRzU291bCA9IFNjaGVtYS5BdXRob3JDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcbiAgICBjb25zdCBjb21tZW50cyA9IHBlZXIuZ3VuLmdldChjb21tZW50c1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcImNvbW1lbnRzXCIpXG4gICAgICAucHV0KGNvbW1lbnRzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgICBjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IGNoYXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwga2luZDogXCJjaGF0bXNnXCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3Qgd3JpdGVQYWdlID0gUi5jdXJyeSgocGVlciwgbmFtZSwgYm9keSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKCF1c2VyKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJub3QgbG9nZ2VkIGluXCIpO1xuICBsZXQgdGhpbmc7XG4gIGNvbnN0IHBhZ2VzU291bCA9IFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQ6IHVzZXIucHViIH0pO1xuICBjb25zdCBjaGFpbiA9IHBlZXIuZ3VuLmdldChwYWdlc1NvdWwpLmdldChuYW1lKTtcblxuICByZXR1cm4gY2hhaW4udGhlbihyZXMgPT4ge1xuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNoYWluXG4gICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgIC5nZXQoXCJib2R5XCIpXG4gICAgICAgIC5wdXQoYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGJvZHksXG4gICAgICAgIHRpdGxlOiBuYW1lLFxuICAgICAgICBraW5kOiBcIndpa2lwYWdlXCIsXG4gICAgICAgIGF1dGhvcjogdXNlci5hbGlhcyxcbiAgICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgICB9O1xuXG4gICAgICB0aGluZyA9IHB1dChwZWVyLCBkYXRhKTtcbiAgICAgIGNoYWluLnB1dCh0aGluZyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5jb25zdCB2b3RlID0gUi5jdXJyeSgocGVlciwgaWQsIGtpbmQsIG5vbmNlKSA9PiB7XG4gIGNvbnN0IHZvdGVzID0gcGVlci5ndW4uZ2V0KFxuICAgIFNjaGVtYVtraW5kID09PSBcInVwXCIgPyBcIlRoaW5nVm90ZXNVcFwiIDogXCJUaGluZ1ZvdGVzRG93blwiXS5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIHRoaW5nSWQ6IGlkXG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4gdm90ZXMuZ2V0KG5vbmNlKS5wdXQoXCIxXCIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBUaGluZyA9IHtcbiAgc291bFRvSWQsXG4gIHNvdWxzVG9JZHMsXG4gIHB1dCxcbiAgc3VibWl0LFxuICBjb21tZW50LFxuICBjaGF0LFxuICB3cml0ZVBhZ2UsXG4gIHZvdGUsXG4gIGluZGV4XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVVJJIH0gZnJvbSBcInVyaS1qc1wiO1xuXG5jb25zdCBib2R5ID0gUi5wcm9wT3IoXCJcIiwgXCJib2R5XCIpO1xuY29uc3QgdXJsID0gUi5wcm9wT3IoXCJcIiwgXCJ1cmxcIik7XG5jb25zdCBkb21haW4gPSBSLmNvbXBvc2UoXG4gIHVybFN0ciA9PiB7XG4gICAgaWYgKCF1cmxTdHIpIHJldHVybiBcIlwiO1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlVVJJKHVybFN0cik7XG5cbiAgICByZXR1cm4gKHBhcnNlZC5ob3N0IHx8IHBhcnNlZC5zY2hlbWUgfHwgXCJcIikucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpO1xuICB9LFxuICB1cmxcbik7XG5cbmV4cG9ydCBjb25zdCBUaGluZ0RhdGFOb2RlID0geyBib2R5LCBkb21haW4gfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcblxuY29uc3Qgc291bHMgPSBHdW5Ob2RlLmVkZ2VzO1xuY29uc3QgaWRzID0gUi5jb21wb3NlKFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5wcm9wKFwidGhpbmdJZFwiKSxcbiAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaC5iaW5kKFNjaGVtYS5UaGluZy5yb3V0ZSlcbiAgICApXG4gICksXG4gIEd1bk5vZGUuZWRnZXNcbik7XG5cbmNvbnN0IHVuaW9uID0gUi5jb21wb3NlKFxuICBSLmRpc3NvYyhcIl9cIiksXG4gIFIucmVkdWNlKFIubWVyZ2VSaWdodCwge30pXG4pO1xuXG5mdW5jdGlvbiBkYXlTdHIodGltZXN0YW1wKSB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICBjb25zdCB5ZWFyID0gZC5nZXRVVENGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IGQuZ2V0VVRDTW9udGgoKSArIDE7XG4gIGNvbnN0IGRheU51bSA9IGQuZ2V0VVRDRGF0ZSgpO1xuXG4gIHJldHVybiBgJHt5ZWFyfS8ke21vbnRofS8ke2RheU51bX1gO1xufVxuXG5leHBvcnQgY29uc3QgVGhpbmdTZXQgPSB7IGlkcywgdW5pb24sIHNvdWxzLCBkYXlTdHIgfTtcbiIsImV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5leHBvcnQgeyBUaGluZyB9IGZyb20gXCIuL1RoaW5nXCI7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCB0b2tlbml6ZSA9IHNvdXJjZSA9PiB7XG4gIGNvbnN0IHRva2VuTWFwID0gKHNvdXJjZSB8fCBcIlwiKS5zcGxpdChcIlxcblwiKS5yZWR1Y2UoKGRlZiwgbGluZSkgPT4ge1xuICAgIGNvbnN0IHRva2VucyA9IGxpbmVcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgIC5tYXAoUi50cmltKVxuICAgICAgLmZpbHRlcih4ID0+IHgpO1xuXG4gICAgaWYgKCF0b2tlbnMubGVuZ3RoKSByZXR1cm4gZGVmO1xuICAgIHJldHVybiBSLmFzc29jUGF0aCh0b2tlbnMsIHt9LCBkZWYpO1xuICB9LCB7fSk7XG5cbiAgY29uc3QgaXNQcmVzZW50ID0gcCA9PiB7XG4gICAgbGV0IGNoZWNrID0gcDtcblxuICAgIGlmICh0eXBlb2YgcCA9PT0gXCJzdHJpbmdcIikgY2hlY2sgPSBwLnNwbGl0KFwiIFwiKTtcbiAgICByZXR1cm4gY2hlY2sgJiYgUi5wYXRoKGNoZWNrLCB0b2tlbk1hcCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0VmFsdWVzID0gcCA9PiBSLmtleXNJbihpc1ByZXNlbnQocCkpO1xuICBjb25zdCBnZXRWYWx1ZSA9IHAgPT4gZ2V0VmFsdWVzKHApWzBdIHx8IG51bGw7XG4gIGNvbnN0IGdldExhc3RWYWx1ZSA9IHAgPT4gZ2V0VmFsdWVzKHApLnBvcCgpIHx8IG51bGw7XG5cbiAgY29uc3QgZ2V0VmFsdWVDaGFpbiA9IHAgPT4ge1xuICAgIGNvbnN0IGtleXMgPSB0eXBlb2YgcCA9PT0gXCJzdHJpbmdcIiA/IHAuc3BsaXQoXCIgXCIpIDogcDtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICBsZXQgbmV4dCA9IHA7XG5cbiAgICB3aGlsZSAobmV4dCkge1xuICAgICAgbmV4dCA9IGdldFZhbHVlKFsuLi5rZXlzLCAuLi52YWx1ZXNdKTtcbiAgICAgIG5leHQgJiYgdmFsdWVzLnB1c2gobmV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICBjb25zdCBnZXRQYWlycyA9IHAgPT4ge1xuICAgIGNvbnN0IGtleXMgPSB0eXBlb2YgcCA9PT0gXCJzdHJpbmdcIiA/IHAuc3BsaXQoXCIgXCIpIDogcDtcblxuICAgIHJldHVybiBnZXRWYWx1ZXMoa2V5cykucmVkdWNlKChwYWlycywga2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWwgPSBnZXRWYWx1ZShbLi4ua2V5cywga2V5XSk7XG5cbiAgICAgIHJldHVybiBbLi4ucGFpcnMsIFtrZXksIHZhbF1dO1xuICAgIH0sIFtdKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNvdXJjZSxcbiAgICBpc1ByZXNlbnQsXG4gICAgZ2V0VmFsdWUsXG4gICAgZ2V0VmFsdWVzLFxuICAgIGdldExhc3RWYWx1ZSxcbiAgICBnZXRWYWx1ZUNoYWluLFxuICAgIGdldFBhaXJzXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgVG9rZW5pemVyID0geyB0b2tlbml6ZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgY3JlYXRlU3VwcHJlc3NvciB9IGZyb20gXCJndW4tc3VwcHJlc3NvclwiO1xuaW1wb3J0ICogYXMgc2VhIGZyb20gXCJndW4tc3VwcHJlc3Nvci1zZWFyXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcblxuY29uc3QgaXNMZWdhY3lUaGluZyA9IChzY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgZGF0YVNvdWwgPSBSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpO1xuICBjb25zdCBuZXdlc3QgPSBSLndpdGhvdXQoXG4gICAgW1wiY29tbWVudHNcIiwgXCJhbGxjb21tZW50c1wiLCBcInZvdGVzdXBcIiwgXCJ2b3Rlc2Rvd25cIl0sXG4gICAgUi5rZXlzKFIucGF0aChbXCJfXCIsIFwiPlwiXSwgZGF0YSkpXG4gIClcbiAgICAubWFwKGtleSA9PiBSLnBhdGgoW1wiX1wiLCBcIj5cIiwga2V5XSwgZGF0YSkpXG4gICAgLnNvcnQoKVxuICAgIC5wb3AoKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKGRhdGFTb3VsKSB8fCB7fTtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gaWQgJiYgaWQgPT09IHRoaW5nSWQgJiYgbmV3ZXN0ICYmIG5ld2VzdCA8IDE1NDMxMDI4MTQ5NDU7XG59O1xuXG5jb25zdCB0aGluZ0hhc2hNYXRjaGVzU291bCA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGlkID0gUi5wcm9wKFwiaWRcIiwgZGF0YSk7XG5cbiAgcmV0dXJuIChcbiAgICBpZCAmJlxuICAgIGlkID09PVxuICAgICAgb2JqSGFzaCh7XG4gICAgICAgIGF1dGhvcklkOiAoUi5wYXRoKFtcImF1dGhvclwiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpLnN1YnN0cigxKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHRpbWVzdGFtcDogcGFyc2VJbnQoUi5wcm9wKFwidGltZXN0YW1wXCIsIGRhdGEpLCAxMCksXG4gICAgICAgIGtpbmQ6IFIucHJvcChcImtpbmRcIiwgZGF0YSksXG4gICAgICAgIHRvcGljOiBSLnByb3AoXG4gICAgICAgICAgXCJ0b3BpY05hbWVcIixcbiAgICAgICAgICBTY2hlbWEuVG9waWMucm91dGUubWF0Y2goUi5wYXRoKFtcInRvcGljXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9wSWQ6IFIucHJvcChcbiAgICAgICAgICBcInRoaW5nSWRcIixcbiAgICAgICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcIm9wXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIHJlcGx5VG9JZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wicmVwbHlUb1wiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICBvcmlnaW5hbEhhc2g6IFIucHJvcChcIm9yaWdpbmFsSGFzaFwiLCBkYXRhKVxuICAgICAgfSlcbiAgKTtcbn07XG5cbmNvbnN0IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhdXRob3JJZCA9IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2lnbmVkSWQgPSBSLnByb3AoXG4gICAgXCJhdXRob3JJZFwiLFxuICAgIFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUubWF0Y2goUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKSlcbiAgKTtcblxuICByZXR1cm4gYXV0aG9ySWQgJiYgYXV0aG9ySWQgPT09IHNpZ25lZElkO1xufTtcblxuY29uc3QgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaCA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsSGFzaCA9IFIucHJvcChcIm9yaWdpbmFsSGFzaFwiLCBkYXRhKTtcbiAgY29uc3QgaWQgPSBSLnByb3AoXG4gICAgXCJ0aGluZ0lkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gb3JpZ2luYWxIYXNoO1xufTtcblxuY29uc3QgZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlID0gYWp2ID0+IChcbiAgbm9kZVR5cGVOYW1lLFxuICBkYXRhLFxuICBfcFNjaGVtYSxcbiAgX2NQYXRoLFxuICBwYXJlbnREYXRhXG4pID0+IHtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPVxuICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIHBhcmVudERhdGEpIHx8IFwiXCIpIHx8IHt9O1xuICBjb25zdCB7IHRoaW5nSWQ6IHByb3BUaGluZ0lkIH0gPSBTY2hlbWFbbm9kZVR5cGVOYW1lXS5yb3V0ZS5tYXRjaChcbiAgICBSLnByb3AoXCIjXCIsIGRhdGEpIHx8IFwiXCJcbiAgKTtcblxuICBpZiAoIXRoaW5nSWQgfHwgdGhpbmdJZCAhPT0gcHJvcFRoaW5nSWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGFqdi5jb21waWxlKHsgJHJlZjogYHNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy8ke25vZGVUeXBlTmFtZX1FZGdlYCB9KShcbiAgICBkYXRhXG4gICk7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFIYXNoTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHsgXywgLi4ucmVjb3JkIH0gPSBkYXRhIHx8IHt9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgcmVjb3JkLnRpbWVzdGFtcCA9IHBhcnNlRmxvYXQocmVjb3JkLnRpbWVzdGFtcCwgMTApO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpIHx8IHt9O1xuXG4gIHJldHVybiB0aGluZ0lkICYmIHRoaW5nSWQgPT09IG9iakhhc2gocmVjb3JkKTtcbn07XG5cbmNvbnN0IGlzVm90ZVZhbGlkID0gKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpID0+IHtcbiAgY29uc3QgeyBhbGdvcml0aG0gPSBcImFyZ29uMmRcIiwgY29uZmlnID0ge30gfSA9IHNjaGVtYSB8fCB7fTtcblxuICBjb25zdCBub25jZSA9IEJ1ZmZlci5oYXNPd25Qcm9wZXJ0eShcImZyb21cIilcbiAgICA/IEJ1ZmZlci5mcm9tKHZvdGUsIFwiaGV4XCIpXG4gICAgOiBuZXcgQnVmZmVyKHZvdGUsIFwiaGV4XCIpO1xuICBjb25zdCBzYWx0ID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20obm9uY2UsIFwiaGV4XCIpXG4gICAgOiBuZXcgQnVmZmVyKG5vbmNlLCBcImhleFwiKTtcbiAgY29uc3QgaGFzaCA9IGFyZ29uMi5oYXNoKHByZWZpeCwge1xuICAgIHNhbHQsXG4gICAgaGFzaExlbmd0aDogY29uZmlnLmhhc2hMZW5ndGgsXG4gICAgdGltZUNvc3Q6IGNvbmZpZy50aW1lQ29zdCxcbiAgICBtZW1vcnlDb3N0OiBjb25maWcubWVtb3J5Q29zdCxcbiAgICBwYXJhbGxlbGlzbTogY29uZmlnLnBhcmFsbGVsaXNtLFxuICAgIHJhdzogdHJ1ZSxcbiAgICB0eXBlOiBhcmdvbjJbYWxnb3JpdGhtXVxuICB9KTtcbiAgbGV0IG9mZiA9IDA7XG4gIGxldCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPD0gY29uZmlnLmNvbXBsZXhpdHkgLSA4OyBpICs9IDgsIG9mZisrKSB7XG4gICAgaWYgKGhhc2hbb2ZmXSAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IG1hc2sgPSAweGZmIDw8ICg4ICsgaSAtIGNvbmZpZy5jb21wbGV4aXR5KTtcblxuICByZXR1cm4gKGhhc2hbb2ZmXSAmIG1hc2spID09PSAwO1xufTtcblxuY29uc3Qga2V5c0FyZVByb29mc09mV29yayA9IChzY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgYXJnb24yID0gcmVxdWlyZShcImFyZ29uMlwiKTtcblxuICBpZiAoIWFyZ29uMikgcmV0dXJuIHRydWU7IC8vIGluIGJyb3dzZXIgZG9uJ3QgYm90aGVyIGZvciBub3dcbiAgY29uc3QgeyBhbGdvcml0aG0gPSBcImFyZ29uMmRcIiB9ID0gc2NoZW1hIHx8IHt9O1xuICBjb25zdCBwcmVmaXggPSBSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpO1xuXG4gIGlmIChhbGdvcml0aG0gIT09IFwiYXJnb24yZFwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBhcmdvbjIgc3VwcG9ydGVkIGZvciB2b3RlIGhhc2hlc1wiKTtcbiAgfVxuXG4gIFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpLmZvckVhY2godm90ZSA9PiB7XG4gICAgaWYgKCFpc1ZvdGVWYWxpZChhcmdvbjIsIHNjaGVtYSwgcHJlZml4LCB2b3RlKSkge1xuICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHZvdGVcIiwgcHJlZml4LCB2b3RlKTtcbiAgICAgIGRlbGV0ZSBkYXRhW3ZvdGVdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgaW5pdEFqdiA9IFIuY29tcG9zZShcbiAgYWp2ID0+IHtcbiAgICBhanYuYWRkS2V5d29yZChcImlzTGVnYWN5VGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IGlzTGVnYWN5VGhpbmdcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0hhc2hNYXRjaGVzU291bFxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBzaWduZWRUaGluZ0RhdGFNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ1JlbGF0ZWRFZGdlXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UoYWp2KVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFIYXNoTWF0Y2hlc1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwia2V5c0FyZVByb29mc09mV29ya1wiLCB7XG4gICAgICB2YWxpZGF0ZToga2V5c0FyZVByb29mc09mV29yayxcbiAgICAgIG1vZGlmeWluZzogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBhanY7XG4gIH0sXG4gIHNlYS5pbml0QWp2XG4pO1xuXG5leHBvcnQgY29uc3Qgc3VwcHJlc3NvciA9IGNyZWF0ZVN1cHByZXNzb3Ioe1xuICBkZWZpbml0aW9uczogU2NoZW1hLmRlZmluaXRpb25zLFxuICBpbml0OiBpbml0QWp2XG59KTtcblxuY29uc3QgZ3VuV2lyZUlucHV0ID0gUi5jdXJyeSgocGVlciwgY29udGV4dCkgPT5cbiAgY29udGV4dC5vbihcImluXCIsIGZ1bmN0aW9uIHdpcmVJbnB1dChtc2cpIHtcbiAgICBjb25zdCBfID0gbXNnW1wiX1wiXTtcblxuICAgIGRlbGV0ZSBtc2dbXCJfXCJdO1xuICAgIGlmIChcInBpbmdcIiBpbiBtc2cgfHwgXCJsZWVjaFwiIGluIG1zZykgcmV0dXJuO1xuICAgIGlmIChtc2cucHV0ICYmICFSLmtleXMobXNnLnB1dCkubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcHJvbWlzZSA9IHBlZXIuY29uZmlnLmRpc2FibGVWYWxpZGF0aW9uXG4gICAgICA/IFByb21pc2UucmVzb2x2ZShtc2cpXG4gICAgICA6IHN1cHByZXNzb3IudmFsaWRhdGUobXNnKTtcblxuICAgIHByb21pc2VcbiAgICAgIC50aGVuKHZhbGlkYXRlZCA9PiB7XG4gICAgICAgIGlmICghdmFsaWRhdGVkKSByZXR1cm4gY29uc29sZS5sb2coXCJtc2cgZGlkbid0IHZhbGlkYXRlXCIsIG1zZyk7XG4gICAgICAgIG1zZ1tcIl9cIl0gPSBfO1xuICAgICAgICByZXR1cm4gdGhpcy50by5uZXh0KG1zZyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKFwidmFsaWRhdGUgZXJyXCIsIG1zZywgZXJyLnN0YWNrIHx8IGVycikpO1xuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IFZhbGlkYXRpb24gPSB7XG4gIGlzTGVnYWN5VGhpbmcsXG4gIHRoaW5nSGFzaE1hdGNoZXNTb3VsLFxuICBzaWduZWRUaGluZ0RhdGFNYXRjaGVzLFxuICB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoLFxuICBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UsXG4gIHRoaW5nRGF0YUhhc2hNYXRjaGVzLFxuICBpc1ZvdGVWYWxpZCxcbiAga2V5c0FyZVByb29mc09mV29yayxcbiAgaW5pdEFqdixcbiAgc3VwcHJlc3NvcixcbiAgZ3VuV2lyZUlucHV0XG59O1xuIiwiaW1wb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuZXhwb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5leHBvcnQgeyBDb21tZW50Q29tbWFuZCB9IGZyb20gXCIuL0NvbW1lbnRDb21tYW5kXCI7XG5leHBvcnQgeyBMaXN0aW5nLCBMaXN0aW5nT3JhY2xlLCBTcGFjZVNwZWMgfSBmcm9tIFwiLi9MaXN0aW5nXCI7XG5leHBvcnQgeyBQYWdlIH0gZnJvbSBcIi4vUGFnZVwiO1xuZXhwb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmV4cG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuZXhwb3J0IHsgVGhpbmcsIFRoaW5nU2V0LCBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmV4cG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tIFwiLi9WYWxpZGF0aW9uXCI7XG5leHBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuZXhwb3J0IHsgVGFidWxhdG9yIH0gZnJvbSBcIi4vVGFidWxhdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBQZWVyLmluaXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3F1ZXJ5X3N0cmluZ19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX187Il0sInNvdXJjZVJvb3QiOiIifQ==