(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("argon2"), require("gun-scope"), require("gun-suppressor"), require("gun-suppressor-sear"), require("object-hash"), require("ramda"), require("route-parser"), require("uri-js"));
	else if(typeof define === 'function' && define.amd)
		define("notabug-peer", ["argon2", "gun-scope", "gun-suppressor", "gun-suppressor-sear", "object-hash", "ramda", "route-parser", "uri-js"], factory);
	else if(typeof exports === 'object')
		exports["notabug-peer"] = factory(require("argon2"), require("gun-scope"), require("gun-suppressor"), require("gun-suppressor-sear"), require("object-hash"), require("ramda"), require("route-parser"), require("uri-js"));
	else
		root["notabug-peer"] = factory(root["argon2"], root["gun-scope"], root["gun-suppressor"], root["gun-suppressor-sear"], root["object-hash"], root["ramda"], root["route-parser"], root["uri-js"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_argon2__, __WEBPACK_EXTERNAL_MODULE_gun_scope__, __WEBPACK_EXTERNAL_MODULE_gun_suppressor__, __WEBPACK_EXTERNAL_MODULE_gun_suppressor_sear__, __WEBPACK_EXTERNAL_MODULE_object_hash__, __WEBPACK_EXTERNAL_MODULE_ramda__, __WEBPACK_EXTERNAL_MODULE_route_parser__, __WEBPACK_EXTERNAL_MODULE_uri_js__) {
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

  const query = scope => _Query.Query.curated(scope, curators, true).then(ids => ids.map(thingId => _Schema.Schema.Thing.route.reverse({
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

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

var _Config = __webpack_require__(/*! ./Config */ "./src/Config.js");

var _Query = __webpack_require__(/*! ./Query */ "./src/Query.js");

var _Listing = __webpack_require__(/*! ./Listing */ "./src/Listing/index.js");

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

  const realQuery = (0, _gunScope.query)((scope, opts = {}) => _Listing.Listing.fromPath(scope, path, opts), `ids:${path}`);
  return {
    // eslint-disable-next-line no-use-before-define
    preload: scope => preloadListing(scope, path, params),
    sidebar: (0, _gunScope.query)(scope => _Listing.Listing.sidebarFromPath(scope, path), `sidebar:${path}`),
    space: (0, _gunScope.query)(scope => _Listing.Listing.specFromPath(scope, path)),
    ids: (0, _gunScope.query)((scope, opts = {}) => realQuery(scope, R.mergeLeft(opts, params)))
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
const thingDataFromSouls = R.curry((scope, souls) => (0, _gunScope.all)(souls.filter(x => !!x).map(soul => scope.get(soul).get("data").then(x => x))));
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
      _: {
        additionalProperties: true
      }
    },
    patternProperties: {
      "^d+$": {
        sea: {
          type: ["string", "null", "undefined"]
        }
      }
    },
    deleteNonNumericKeys: true,
    deleteMetaForMissing: true
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
  const thingData = await _Query.Query.thingDataFromSouls(scope, replySouls);

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

const deleteNonNumericKeys = (schema, data, pSchema, cPath, parentData, keyInParent) => {
  const keys = R.without(["_"], R.keys(data));
  const meta = R.pathOr({}, ["_", ">"], data);
  keys.forEach(key => {
    const val = parseInt(key, 10);

    if (!val && val !== 0) {
      delete meta[key];
      delete data[key];
    }
  });
  return true;
};

const deleteMetaForMissing = (schema, data, pSchema, cPath, parentData, keyInParent) => {
  const keys = R.without(["_"], R.keys(data));
  const meta = R.pathOr({}, ["_", ">"], data);
  const metaKeys = R.keys(meta);
  const missing = R.difference(metaKeys, keys);
  if (missing.length) data["_"][">"] = R.omit(missing, meta);
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
  ajv.addKeyword("deleteNonNumericKeys", {
    validate: deleteNonNumericKeys,
    modifying: true
  });
  ajv.addKeyword("deleteMetaForMissing", {
    validate: deleteMetaForMissing,
    modifying: true
  });
  return ajv;
}, sea.initAjv);
const suppressor = (0, _gunSuppressor.createSuppressor)({
  definitions: _Schema.Schema.definitions,
  init: R.compose(initAjv, R.always({
    removeAdditional: false
  }))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIklOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkNIQVRfUFJFTE9BRF9JVEVNUyIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwicXVlcnkiLCJtdWx0aVRvcGljIiwiZG9tYWluU291cmNlIiwiZG9tYWlucyIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlZCIsImlkcyIsInRoaW5nSWQiLCJUaGluZyIsInJvdXRlIiwicmV2ZXJzZSIsIm9wU291cmNlIiwic3VibWlzc2lvbklkcyIsIm11bHRpU3VibWlzc2lvbiIsInJlcGxpZXNTb3VyY2UiLCJyZXBsaWVzVG9BdXRob3IiLCJyZXBsaWVzVG9BdXRob3JJZCIsInNvdXJjZXMiLCJsaXN0aW5nIiwicmVwbGllcyIsIm9wIiwiY3VyYXRvciIsImF1dGhvciIsImRvbWFpbiIsInRvcGljIiwic291cmNlTmFtZXMiLCJzb3VyY2VOYW1lIiwiZGVmIiwiZnJvbURlZmluaXRpb24iLCJuYW1lIiwibWVyZ2VMZWZ0IiwiTGlzdGluZ0RhdGFTb3VyY2UiLCJmcm9tU291cmNlIiwic291cmNlIiwib3duZXJJZCIsInNwYWNlTmFtZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsImlzQ2hhdCIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJiYXNlUGF0aCIsInN1Ym1pdFBhdGgiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsImZucyIsImFkZFZvdGVGaWx0ZXIiLCJ0IiwiaWRlbnRpY2FsIiwiaXRlbSIsImtpbmQiLCJhbGlhcyIsImx0ZSIsImd0ZSIsInRoaW5nIiwiY21kcyIsInRhZ05hbWUiLCJjb250ZW50RmlsdGVyIiwidm90ZUZpbHRlciIsInRoaW5nRmlsdGVyIiwiZ2V0RmlsdGVyZWRSb3dzIiwic3BlYyIsInNvcnRlZFJvd3MiLCJsaW1pdCIsImxpbWl0UHJvcCIsImNvdW50IiwiY291bnRQcm9wIiwiYWZ0ZXIiLCJmaWx0ZXJGbiIsInJvd3MiLCJzbGljZSIsImZpbHRlcmVkIiwiZmV0Y2hCYXRjaCIsInNpemUiLCJQcm9taXNlIiwicm93IiwiaW5MaXN0aW5nIiwiUE9TX0lEIiwiY29uc29sZSIsImxvZyIsInNwbGljZSIsIlBPU19WQUwiLCJnZXRGaWx0ZXJlZElkcyIsIngiLCJ0aGluZ01ldGEiLCJ0aGluZ1NvdWwiLCJzY29yZXMiLCJMaXN0aW5nRmlsdGVyIiwiUE9TX0lEWCIsInJvd3NUb0lkcyIsInJvd3NUb0l0ZW1zIiwic291bEZyb21QYXRoIiwicGF0aEZyb21Tb3VsIiwiUmVnRXhwIiwiaWRUb1NvdWwiLCJpZHNUb1NvdWxzIiwic291bFRvSWQiLCJtYXRjaCIsInNvdWxzVG9JZHMiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwiaXRlbUtleXMiLCJmaWx0ZXIiLCJzZXJpYWxpemUiLCJpdGVtcyIsImFkZEluZGV4IiwiYXNzb2MiLCJkZWZhdWx0VG8iLCJzb3J0Um93cyIsInNvcnRXaXRoIiwiYXNjZW5kIiwiY29uZCIsImlzTmlsIiwiSW5maW5pdHkiLCJUIiwic29ydGVkSWRzIiwiaXRlbXNUb1Jvd3MiLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImluc2VydGVkIiwicG9wIiwicmVwbGFjZWQiLCJjYXRlZ29yaXplRGlmZiIsIm9yaWdpbmFsIiwiYWxsS2V5cyIsIl9kaWZmSWR4IiwiZGlmZklkIiwiX29yaWdJZHgiLCJvcmlnSWQiLCJ1bmlvblJvd3MiLCJ1bmlxQnkiLCJyb3dzRnJvbVNvdWxzIiwicmVhZCIsIkxpc3RpbmdOb2RlIiwidXBkYXRlTGlzdGluZyIsIm9yYyIsIm5ld1Njb3BlIiwidG9JdGVtcyIsIndyaXRlIiwib25QdXQiLCJ1cGRhdGVkU291bCIsInByb3BzIiwidXBkYXRlZElkcyIsInNwZWNGcm9tUGF0aCIsIlRoaW5nVm90ZUNvdW50cyIsImlzU3RpY2t5IiwiZXF1YWxzIiwiZ2V0QWNjZXNzZXMiLCJsaXN0ZW4iLCJMaXN0aW5nT3JhY2xlIiwiY2FsY3VsYXRlUm93cyIsInN0aWNreUl0ZW1zIiwiZGF0YVNvdXJjZSIsImNhbGN1bGF0ZSIsInRvTm9kZSIsInBhdGhzIiwic3RpY2t5Um93cyIsImZyb21TcGVjIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsIm5vZGVGcm9tUGF0aCIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIm9sZCIsImFjdGl2ZSIsImxhc3RBY3RpdmUiLCJ0b3AiLCJjb21tZW50cyIsImRpc2N1c3NlZCIsInNjb3JlIiwic2Vjb25kcyIsIm9yZGVyIiwiTWF0aCIsImxvZzEwIiwibWF4IiwiYWJzIiwiaG90Iiwic2lnbiIsImJlc3QiLCJ1cHMiLCJkb3ducyIsIm4iLCJ6IiwibGVmdCIsInJpZ2h0Iiwic3FydCIsInVuZGVyIiwiY29udHJvdmVyc2lhbCIsIm1hZ25pdHVkZSIsImJhbGFuY2UiLCJpc1ZhbGlkU29ydCIsInRvSXRlbSIsImZyb21UaGluZ1NldHMiLCJwaXBlIiwidW5pb24iLCJMaXN0aW5nU29ydCIsImFwcGx5IiwiYXAiLCJvZiIsImdldFNvdXJjZSIsImV4dHJhIiwid2lraVBhZ2UiLCJMaXN0aW5nU3BlYyIsImdldFNpZGViYXIiLCJub3JtYWxUb3BpY3MiLCJzcGxpdFRvcGljcyIsInN1Ym1pdFRvIiwidGFiIiwiQ2hhdExpc3RpbmciLCJ3aXRoUm91dGUiLCJDb21tZW50TGlzdGluZyIsIkNvbW1lbnRlZExpc3RpbmciLCJEb21haW5MaXN0aW5nIiwiRmlyZWhvc2VMaXN0aW5nIiwiZGlmZkRhdGEiLCJ1cGRhdGVkQXV0aG9yZWQiLCJvcElkIiwicmVwbHlJZHMiLCJUaGluZ0NvbW1lbnRzIiwiSW5ib3hMaXN0aW5nIiwidXNlck1ldGEiLCJtZXRhIiwicHJvZmlsZUlkIiwiUHJvZmlsZUxpc3RpbmciLCJzaWRlYmFyUGFnZU5hbWUiLCJvcmlnaW5hbERhdGEiLCJyZW1vdmVkSWRzIiwidm90ZUNvdW50c01hdGNoIiwidGhpbmdNYXRjaCIsIlRoaW5nRGF0YVNpZ25lZCIsImF1dGhvck1hdGNoIiwiU0VBQXV0aG9yIiwiZnJvbVBhZ2VJZCIsImV4aXN0aW5nS2V5cyIsIndvcmsiLCJtZXRob2QiLCJwcmlvcml0eSIsIlNwYWNlTGlzdGluZyIsIlRvcGljTGlzdGluZyIsInR5cGVzIiwidHlwZXNBcnJheSIsInNpZGViYXJGcm9tUGF0aCIsIkVycm9yIiwiYmFzZVNwZWMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJQYXRoIiwiY29uZmlnUGFnZU5hbWUiLCJzb3VyY2VXaXRoRGVmYXVsdHMiLCJub2RlVG9TcGFjZU5hbWVzIiwidXNlclNwYWNlTmFtZXMiLCJ1c2VyUGFnZXMiLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwidHlwZUZyb21QYXRoIiwid2l0aE1hdGNoIiwicGFyYW1zIiwicHJlbG9hZCIsIndpdGhMaXN0aW5nTWF0Y2giLCJzaWRlYmFyIiwic3BhY2UiLCJyZWFsUXVlcnkiLCJwcmVsb2FkTGlzdGluZyIsInRoaW5nU291bHMiLCJ0aGluZ3MiLCJtdWx0aVRoaW5nTWV0YSIsIm9wSWRzIiwib3BTb3VscyIsImNoYXRQYXRoIiwiZ2V0Q2FjaGUiLCJwcmVmaXgiLCJkZWZhdWx0UHJlZml4IiwiaWRlbnRpZmllciIsImRlZmF1bHRJZGVudGlmaWVyIiwiZGVmYXVsdFNvcnQiLCJyZXN0IiwidGhpbmdDb21tZW50cyIsInNwYWNlTGlzdGluZyIsImRlZmF1bHROYW1lIiwiZGVmYXVsdEF1dGhvcklkIiwic3BhY2VUaGluZ0NvbW1lbnRzIiwic3BhY2VQYXRoIiwibGlzdGluZ1BhdGgiLCJwcm9maWxlIiwiZGVmYXVsdFR5cGUiLCJpbmJveCIsIlBhZ2UiLCJpbml0IiwiY29uZmlnIiwibGVlY2giLCJkaXNhYmxlVmFsaWRhdGlvbiIsIm5vR3VuIiwibG9jYWxTdG9yYWdlIiwicGVyc2lzdCIsImNmZyIsInJhZGlzayIsIm9uIiwiZ3VuV2lyZUlucHV0Iiwic3RvcmVGbiIsInN0b3JlIiwiYSIsInJldHJ5Iiwic2VuZExlZWNoIiwiXyIsImNyZWF0ZVNjb3BlIiwic3VibWl0IiwiY29tbWVudCIsImNoYXQiLCJ3cml0ZVBhZ2UiLCJ2b3RlIiwicXVlcmllcyIsIlBlZXIiLCJlbXB0eVByb21pc2UiLCJ1bmlvbkFycmF5cyIsInRvcGljU291bHMiLCJkYXlzIiwiZGF5U3RyaW5ncyIsIm9uZURheSIsInN0YXJ0IiwiRGF0ZSIsImdldFRpbWUiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJyZXBseVRvU291bCIsIm9wU291bCIsInRoaW5naWQiLCJyZXBseVRvSWQiLCJtdWx0aVF1ZXJ5Iiwic2luZ2xlUXVlcnkiLCJwbHVyYWwiLCJzaW5nbGUiLCJjb2xsYXRlIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwic3VibWlzc2lvbk9ubHkiLCJpZHMxIiwiaWRzMiIsInRoaW5nU2NvcmVzIiwidm90ZXMiLCJwcm9taXNlcyIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsImNyZWF0ZWRBdCIsIm5hYiIsIlF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzZWEiLCJBVVRIX1NDSEVNQSIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIlRvcGljRGF5IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiJHJlZiIsInllYXIiLCJtaW5pbXVtIiwibWF4aW11bSIsIm1vbnRoIiwiZGF5IiwicmVxdWlyZWQiLCJwcm9wc0Zyb21Tb3VsIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlZGdlTWF0Y2hlc0tleSIsImFueU9mIiwiVG9waWMiLCJ1cmwiLCJVUkwiLCJhbGxPZiIsInRoaW5nS2luZCIsIm9yaWdpbmFsSGFzaCIsIm9uZU9mIiwidGhpbmdSZWxhdGVkRWRnZSIsImFsbGNvbW1lbnRzIiwidm90ZXN1cCIsInZvdGVzZG93biIsInJlcGx5VG8iLCJ0aGluZ0hhc2hNYXRjaGVzU291bCIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZyIsInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2giLCJpc0xlZ2FjeVRoaW5nIiwiUHJvb2ZPZldvcmtWb3RlcyIsIiRhc3luYyIsImtleXNBcmVQcm9vZnNPZldvcmsiLCJhbGdvcml0aG0iLCJjb21wbGV4aXR5IiwiaGFzaExlbmd0aCIsInRpbWVDb3N0IiwibWVtb3J5Q29zdCIsInBhcmFsbGVsaXNtIiwiVGhpbmdWb3Rlc1VwIiwiVGhpbmdWb3Rlc0Rvd24iLCJUaGluZ0RhdGEiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWwiLCJ1cCIsImRvd24iLCJjb21tYW5kcyIsIkxpc3RpbmdEYXRhIiwicGF0dGVyblByb3BlcnRpZXMiLCJkZWxldGVOb25OdW1lcmljS2V5cyIsImRlbGV0ZU1ldGFGb3JNaXNzaW5nIiwic29ydE5hbWUiLCJlbnVtIiwiVGhpbmdDb21tZW50c0xpc3RpbmciLCJ1c2VyTGlzdGluZ1R5cGUiLCJBdXRob3JSZXBsaWVzTGlzdGluZyIsIkF1dGhvclByb2ZpbGVMaXN0aW5nIiwiQXV0aG9yQ29tbWVudHMiLCJBdXRob3JTdWJtaXNzaW9ucyIsIkF1dGhvclRoaW5ncyIsInJvdXRlcyIsImRlZnNXaXRoUm91dGVzIiwiU2NoZW1hIiwidGFidWxhdG9yUXVlcnkiLCJyZXBseVNvdWxzIiwiY29tbWFuZE1hcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJUYWJ1bGF0b3IiLCJ0b3BpY1ByZWZpeGVzIiwiY2hhdG1zZyIsImJpbmQiLCJpbmRleCIsInJlY3YiLCJ0ZCIsIm9mZiIsInRvcGljUHJlZml4IiwiYmFzZVRvcGljTmFtZSIsInRvTG93ZXJDYXNlIiwidG9waWNEYXkiLCJza2lwQWxsIiwiYWxsbmFtZSIsImFsbFRvcGljIiwiYWxsVG9waWNEYXkiLCJzZXQiLCJ1cmxJbmZvIiwiaG9zdCIsInNjaGVtZSIsInVybE5vZGUiLCJwdXQiLCJkYXRhU291bCIsIm1ldGFEYXRhIiwicHViIiwidGhpbmdzU291bCIsInN1Ym1pc3Npb25zU291bCIsImNvbW1lbnRzU291bCIsInJlamVjdCIsInBhZ2VzU291bCIsImNoYWluIiwibm9uY2UiLCJ1cmxTdHIiLCJUaGluZ0RhdGFOb2RlIiwiZGlzc29jIiwiZCIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJkYXlOdW0iLCJnZXRVVENEYXRlIiwiVGhpbmdTZXQiLCJ0b2tlbk1hcCIsImxpbmUiLCJ0b2tlbnMiLCJjaGVjayIsImtleXNJbiIsImdldExhc3RWYWx1ZSIsIm5leHQiLCJwYWlycyIsIlRva2VuaXplciIsInNjaGVtYSIsIm5ld2VzdCIsIl9zY2hlbWEiLCJzdWJzdHIiLCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzIiwic2lnbmVkSWQiLCJnZXRJc1RoaW5nUmVsYXRlZEVkZ2UiLCJhanYiLCJub2RlVHlwZU5hbWUiLCJfcFNjaGVtYSIsIl9jUGF0aCIsInBhcmVudERhdGEiLCJwcm9wVGhpbmdJZCIsImNvbXBpbGUiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlcyIsInJlY29yZCIsImlzVm90ZVZhbGlkIiwiYXJnb24yIiwiQnVmZmVyIiwiaGFzT3duUHJvcGVydHkiLCJmcm9tIiwic2FsdCIsImhhc2giLCJyYXciLCJtYXNrIiwicmVxdWlyZSIsInBTY2hlbWEiLCJjUGF0aCIsImtleUluUGFyZW50IiwibWV0YUtleXMiLCJkaWZmZXJlbmNlIiwib21pdCIsImluaXRBanYiLCJhZGRLZXl3b3JkIiwidmFsaWRhdGUiLCJtb2RpZnlpbmciLCJzdXBwcmVzc29yIiwicmVtb3ZlQWRkaXRpb25hbCIsImNvbnRleHQiLCJ3aXJlSW5wdXQiLCJtc2ciLCJwcm9taXNlIiwidmFsaWRhdGVkIiwidG8iLCJjYXRjaCIsImVycm9yIiwic3RhY2siLCJWYWxpZGF0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsS0FBRixDQUNi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Q0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBQ2UsV0FBS1YsSTs7Ozs7Ozs7Ozs7O0FDYnBCLG9EOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG9EIiwiZmlsZSI6Im5vdGFidWctcGVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJub3RhYnVnLXBlZXJcIiwgW1wiYXJnb24yXCIsIFwiZ3VuLXNjb3BlXCIsIFwiZ3VuLXN1cHByZXNzb3JcIiwgXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIsIFwib2JqZWN0LWhhc2hcIiwgXCJyYW1kYVwiLCBcInJvdXRlLXBhcnNlclwiLCBcInVyaS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcmdvbjJcIl0sIHJvb3RbXCJndW4tc2NvcGVcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3NvclwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yLXNlYXJcIl0sIHJvb3RbXCJvYmplY3QtaGFzaFwiXSwgcm9vdFtcInJhbWRhXCJdLCByb290W1wicm91dGUtcGFyc2VyXCJdLCByb290W1widXJpLWpzXCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5cbmNvbnN0IHNpZ251cCA9IFIuY3VycnkoXG4gIChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQsIG9wdHMgPSB7fSkgPT5cbiAgICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgdXNlci5jcmVhdGUoXG4gICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgYWNrID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjay5lcnIpIHtcbiAgICAgICAgICAgICAgICBmYWlsKGFjay5lcnIpO1xuICAgICAgICAgICAgICAgIHVzZXIubGVhdmUoKTtcbiAgICAgICAgICAgICAgICBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWVyLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkudGhlbihvayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgICAgfVxuICAgIH0pXG4pO1xuXG5jb25zdCBsb2dpbiA9IFIuY3VycnkoKHBlZXIsIHVzZXJuYW1lLCBwYXNzd29yZCkgPT5cbiAgbmV3IFByb21pc2UoKG9rLCBmYWlsKSA9PiB7XG4gICAgaWYgKHBlZXIgJiYgcGVlci5ndW4gJiYgcGVlci5ndW4udXNlcikge1xuICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgdXNlci5hdXRoKHVzZXJuYW1lLCBwYXNzd29yZCwgYWNrID0+XG4gICAgICAgIGFjay5lcnIgPyBmYWlsKGFjay5lcnIpIDogb2socGVlci5ndW4udXNlcigpLmlzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgIH1cbiAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgIHBlZXIuX29uTG9naW4gJiYgcGVlci5fb25Mb2dpbihyZXN1bHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IGxvZ291dCA9IHBlZXIgPT4gcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG5jb25zdCBpc0xvZ2dlZEluID0gcGVlciA9PiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyICYmIHBlZXIuZ3VuLnVzZXIoKS5pcztcbmNvbnN0IG9uTG9naW4gPSBSLmN1cnJ5KChwZWVyLCBmbikgPT4gKHBlZXIuX29uTG9naW4gPSBmbikpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbmV4cG9ydCBjb25zdCBBdXRoZW50aWNhdGlvbiA9IHtcbiAgc2lnbnVwLFxuICBsb2dpbixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBvbkxvZ2luXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCB0b2tlbml6ZSA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIiBcIiksXG4gIFIucmVwbGFjZShDb25zdGFudHMuQ09NTUFORF9SRSwgXCJcIiksXG4gIFIucHJvcE9yKFwiXCIsIDApLFxuICBSLnNwbGl0KFwiXFxuXCIpXG4pO1xuXG5jb25zdCBtYXAgPSB0aGluZ0RhdGEgPT5cbiAgUi5yZWR1Y2UoXG4gICAgKGNtZE1hcCwgaWQpID0+IHtcbiAgICAgIGNvbnN0IGJvZHkgPSBSLnBhdGgoW2lkLCBcImJvZHlcIl0sIHRoaW5nRGF0YSk7XG4gICAgICBjb25zdCBhdXRob3JJZCA9IFIucGF0aChbaWQsIFwiYXV0aG9ySWRcIl0sIHRoaW5nRGF0YSkgfHwgXCJhbm9uXCI7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBwYXJzZUZsb2F0KFIucGF0aChbaWQsIFwidGltZXN0YW1wXCJdLCB0aGluZ0RhdGEpKTtcblxuICAgICAgaWYgKCFSLnRlc3QoQ29uc3RhbnRzLkNPTU1BTkRfUkUsIGJvZHkpKSByZXR1cm4gY21kTWFwO1xuICAgICAgY29uc3QgdG9rZW5pemVkID0gW2F1dGhvcklkLCAuLi50b2tlbml6ZShib2R5KSwgaWRdO1xuXG4gICAgICByZXR1cm4gUi5hc3NvY1BhdGgodG9rZW5pemVkLCB0aW1lc3RhbXAgfHwgMCwgY21kTWFwKTtcbiAgICB9LFxuICAgIHt9LFxuICAgIFIua2V5cyh0aGluZ0RhdGEpXG4gICk7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50Q29tbWFuZCA9IHsgdG9rZW5pemUsIG1hcCB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgQ29uZmlnID0ge1xuICB0YWJ1bGF0b3I6IENvbnN0YW50cy5JTkRFWEVSLFxuICBpbmRleGVyOiBDb25zdGFudHMuSU5ERVhFUixcbiAgb3duZXI6IENvbnN0YW50cy5JTkRFWEVSLFxuICB1cGRhdGU6IFIuY29tcG9zZShcbiAgICBSLm1hcCgoW2tleSwgdmFsXSkgPT4gKENvbmZpZ1trZXldID0gdmFsKSksXG4gICAgUi50b1BhaXJzXG4gIClcbn07XG4iLCJjb25zdCBDT01NQU5EX1JFID0gL14gezR9fi87XG5jb25zdCBQUkVGSVggPSBcIm5hYlwiO1xuY29uc3QgU09VTF9ERUxJTUVURVIgPSBcInx+fnxcIjtcblxuY29uc3QgTElTVElOR19TSVpFID0gMTAwMDtcblxuY29uc3QgTUFYX0hBU0hfU0laRSA9IDY0O1xuY29uc3QgTUFYX1BPV19OT05DRV9TSVpFID0gNjQ7XG5jb25zdCBNQVhfVE9QSUNfU0laRSA9IDQyO1xuY29uc3QgTUFYX0FVVEhPUl9BTElBU19TSVpFID0gMjU2O1xuY29uc3QgTUFYX0FVVEhPUl9JRF9TSVpFID0gMTI4OyAvLyA/Pz9cbmNvbnN0IE1BWF9VUkxfU0laRSA9IDIwNDg7XG5jb25zdCBNQVhfRE9NQUlOX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfVEhJTkdfS0lORF9TSVpFID0gMTY7XG5jb25zdCBNQVhfVEhJTkdfVElUTEVfU0laRSA9IDMwMDtcbmNvbnN0IE1BWF9USElOR19CT0RZX1NJWkUgPSA1MDAwMDtcblxuY29uc3QgTUFYX0xJU1RJTkdfSURTX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFID0gNTAwMDA7XG5jb25zdCBNQVhfTElTVElOR19UQUJTX1NJWkUgPSA1MDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSA9IE1BWF9BVVRIT1JfSURfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFID0gMTY7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX1RZUEVfU0laRSA9IE1BWF9UT1BJQ19TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUgPSAxNjtcblxuY29uc3QgQ0hBVF9QUkVMT0FEX0lURU1TID0gMTA7XG5cbmNvbnN0IElOREVYRVIgPVxuICBcIkNFeUtyRGQxeHlQWHBXU1YwME1ndm5aWTJWSkxIWGd6Q3ZoTWVEd0tUWUEueWpTcTBEeVh6emhCX1pYcl9EemZKZ2lqM3RYVTAtM3QwUTViSkF0WnBqOFwiO1xuXG5leHBvcnQgY29uc3QgQ29uc3RhbnRzID0ge1xuICBDT01NQU5EX1JFLFxuICBQUkVGSVgsXG4gIFNPVUxfREVMSU1FVEVSLFxuICBMSVNUSU5HX1NJWkUsXG4gIE1BWF9IQVNIX1NJWkUsXG4gIE1BWF9QT1dfTk9OQ0VfU0laRSxcbiAgTUFYX1RPUElDX1NJWkUsXG4gIE1BWF9BVVRIT1JfQUxJQVNfU0laRSxcbiAgTUFYX0FVVEhPUl9JRF9TSVpFLFxuICBNQVhfVVJMX1NJWkUsXG4gIE1BWF9ET01BSU5fU0laRSxcbiAgTUFYX1RISU5HX0tJTkRfU0laRSxcbiAgTUFYX1RISU5HX1RJVExFX1NJWkUsXG4gIE1BWF9USElOR19CT0RZX1NJWkUsXG4gIE1BWF9MSVNUSU5HX0lEU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VSQ0VfU0laRSxcbiAgTUFYX0xJU1RJTkdfVEFCU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSxcbiAgQ0hBVF9QUkVMT0FEX0lURU1TLFxuICBJTkRFWEVSXG59O1xuIiwiLyogZ2xvYmFscyBHdW4gKi9cbmltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHNvdWwgPSBSLnBhdGhPcihcIlwiLCBbXCJfXCIsIFwiI1wiXSk7XG5jb25zdCBzdGF0ZSA9IFIucGF0aE9yKHt9LCBbXCJfXCIsIFwiPlwiXSk7XG5cbmNvbnN0IGxhdGVzdCA9IFIuY29tcG9zZShcbiAgUi5sYXN0LFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi52YWx1ZXMsXG4gIHN0YXRlXG4pO1xuXG5jb25zdCBlZGdlcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFwiI1wiKSksXG4gIFIudmFsdWVzXG4pO1xuXG5mdW5jdGlvbiBkZWNvZGVTRUEocmF3RGF0YSkge1xuICBjb25zdCBkYXRhID0gcmF3RGF0YSA/IHsgLi4ucmF3RGF0YSB9IDogcmF3RGF0YTtcbiAgY29uc3Qgc291bCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKCFzb3VsIHx8ICFHdW4uU0VBIHx8IHNvdWwuaW5kZXhPZihcIn5cIikgPT09IC0xKSByZXR1cm4gcmF3RGF0YTtcbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIEd1bi5TRUEudmVyaWZ5KFxuICAgICAgR3VuLlNFQS5vcHQucGFjayhyYXdEYXRhW2tleV0sIGtleSwgcmF3RGF0YSwgc291bCksXG4gICAgICBmYWxzZSxcbiAgICAgIHJlcyA9PiAoZGF0YVtrZXldID0gR3VuLlNFQS5vcHQudW5wYWNrKHJlcywga2V5LCByYXdEYXRhKSlcbiAgICApO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgR3VuTm9kZSA9IHsgc291bCwgc3RhdGUsIGxhdGVzdCwgZWRnZXMsIGRlY29kZVNFQSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UsIHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IG5lZWRzU2NvcmVzID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwic29ydCBob3RcIixcbiAgICBcInNvcnQgdG9wXCIsXG4gICAgXCJzb3J0IGJlc3RcIixcbiAgICBcInNvcnQgY29udHJvdmVyc2lhbFwiLFxuICAgIFwidXBzXCIsXG4gICAgXCJkb3duc1wiLFxuICAgIFwic2NvcmVcIixcbiAgICBcImNhbiByZW1vdmVcIlxuICBdKTtcblxuY29uc3QgbmVlZHNEYXRhID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwidG9waWNcIixcbiAgICBcImRvbWFpblwiLFxuICAgIFwiYXV0aG9yXCIsXG4gICAgXCJ1bmlxdWUgYnkgY29udGVudFwiLFxuICAgIFwia2luZFwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwicmVxdWlyZSBzaWduZWRcIixcbiAgICBcInJlcXVpcmUgYW5vblwiLFxuICAgIFwiYWxpYXNcIixcbiAgICBcImJhbiBkb21haW5cIixcbiAgICBcImJhbiB0b3BpY1wiLFxuICAgIFwiYmFuIGF1dGhvclwiLFxuICAgIFwiYmFuIGFsaWFzXCJcbiAgXSk7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSA9PlxuICBQcm9taXNlLmFsbChcbiAgICBSLm1hcChzb3VsID0+IExpc3RpbmdTb3J0Lml0ZW1Gcm9tU291bChzY29wZSwgc291bCwgZGVmaW5pdGlvbiksIHNvdWxzKVxuICApLnRoZW4oTGlzdGluZ1NvcnQuc29ydEl0ZW1zKVxuKTtcblxuY29uc3QgaXRlbXNGcm9tVGhpbmdTZXRzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgLnRoZW4oUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSkpXG4gICAgLnRoZW4oVGhpbmdTZXQuc291bHMpXG4gICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKVxuKTtcblxuY29uc3QgbGlzdGluZ1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBsaXN0aW5ncyA9IFIucGF0aE9yKFtdLCBbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJsaXN0aW5nc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAobCA9PiBgJHtsfS8ke3NvcnR9YCwgbGlzdGluZ3MpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocyB9O1xufTtcblxuY29uc3QgdG9waWNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCB0b3BpY3MgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidG9waWNzXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIXRvcGljcy5sZW5ndGgpIHRvcGljcy5wdXNoKFwiYWxsXCIpO1xuICAvLyBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcCh0ID0+IGAvdC8ke3R9LyR7c29ydH1gLCB0b3BpY3MpO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC90LyR7dG9waWNzLnNvcnQoKS5qb2luKFwiK1wiKX0vJHtzb3J0fWBdO1xuXG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVRvcGljKHNjb3BlLCB7IHRvcGljcywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGRvbWFpblNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGRvbWFpbnMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiZG9tYWluc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFkb21haW5zLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICAvLyBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChkID0+IGAvZG9tYWluLyR7ZH0vJHtzb3J0fWAsIGRvbWFpbnMpO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC9kb21haW4vJHtkb21haW5zLnNvcnQoKS5qb2luKFwiK1wiKX0vJHtzb3J0fWBdO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlEb21haW4oc2NvcGUsIHsgZG9tYWlucywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGF1dGhvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGF1dGhvcklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJhdXRob3JzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIWF1dGhvcklkcy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9LyR7dHlwZX0vJHtzb3J0fWAsIGF1dGhvcklkcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aUF1dGhvcihzY29wZSwgeyB0eXBlLCBhdXRob3JJZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBjdXJhdG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgY3VyYXRvcnMgPSBSLnByb3AoXCJjdXJhdG9yc1wiLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWN1cmF0b3JzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vY29tbWVudGVkLyR7c29ydH1gLCBjdXJhdG9ycyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5jdXJhdGVkKHNjb3BlLCBjdXJhdG9ycywgdHJ1ZSlcbiAgICAgIC50aGVuKGlkcyA9PiBpZHMubWFwKHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKSlcbiAgICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgb3BTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBzdWJtaXNzaW9uSWRzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcIm9wc1wiXSwgZGVmaW5pdGlvbik7XG5cbiAgaWYgKCFzdWJtaXNzaW9uSWRzLmxlbmd0aCkgdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKFxuICAgIGlkID0+IGAvdGhpbmdzLyR7aWR9L2NvbW1lbnRzLyR7c29ydH1gLFxuICAgIHN1Ym1pc3Npb25JZHNcbiAgKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpU3VibWlzc2lvbihzY29wZSwgeyBzdWJtaXNzaW9uSWRzIH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgcmVwbGllc1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGlkID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInJlcGxpZXNUb1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHR5cGUgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidHlwZVwiXSwgZGVmaW5pdGlvbik7XG5cbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvdXNlci8ke2lkfS9yZXBsaWVzLyR7dHlwZX0vJHtzb3J0fWBdO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkucmVwbGllc1RvQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlLFxuICAgICAgcmVwbGllc1RvQXV0aG9ySWQ6IGlkLFxuICAgICAgaW5kZXhlcjogZGVmaW5pdGlvbi5pbmRleGVyXG4gICAgfSkudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHNvdXJjZXMgPSB7XG4gIGxpc3Rpbmc6IGxpc3RpbmdTb3VyY2UsXG4gIHJlcGxpZXM6IHJlcGxpZXNTb3VyY2UsXG4gIG9wOiBvcFNvdXJjZSxcbiAgY3VyYXRvcjogY3VyYXRvclNvdXJjZSxcbiAgYXV0aG9yOiBhdXRob3JTb3VyY2UsXG4gIGRvbWFpbjogZG9tYWluU291cmNlLFxuICB0b3BpYzogdG9waWNTb3VyY2Vcbn07XG5cbmNvbnN0IHNvdXJjZU5hbWVzID0gUi5rZXlzKHNvdXJjZXMpO1xuY29uc3Qgc291cmNlTmFtZSA9IGRlZiA9PiBSLmZpbmQoZGVmLmlzUHJlc2VudCwgc291cmNlTmFtZXMpIHx8IFwidG9waWNcIjtcbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IG5hbWUgPSBzb3VyY2VOYW1lKGRlZmluaXRpb24pO1xuXG4gIHJldHVybiBSLm1lcmdlTGVmdCh7IG5hbWUgfSwgc291cmNlc1tuYW1lXShkZWZpbml0aW9uKSk7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RhdGFTb3VyY2UgPSB7XG4gIGZyb21EZWZpbml0aW9uLFxuICBzb3VyY2VzLFxuICBuZWVkc1Njb3JlcyxcbiAgbmVlZHNEYXRhLFxuICBpdGVtc0Zyb21UaGluZ1NldHMsXG4gIGl0ZW1zRnJvbVRoaW5nU291bHNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuXG5jb25zdCBmcm9tU291cmNlID0gKHNvdXJjZSwgb3duZXJJZCA9IG51bGwsIHNwYWNlTmFtZSA9IG51bGwpID0+IHtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG4gIGNvbnN0IG9iaiA9IHsgLi4udG9rZW5pemVkIH07XG4gIGNvbnN0IHsgaXNQcmVzZW50LCBnZXRWYWx1ZSwgZ2V0VmFsdWVzLCBnZXRWYWx1ZUNoYWluLCBnZXRQYWlycyB9ID0gdG9rZW5pemVkO1xuXG4gIFtcbiAgICBvYmouZnJvbVBhZ2VBdXRob3IgPSBvd25lcklkLFxuICAgIG9iai5mcm9tUGFnZU5hbWUgPSBzcGFjZU5hbWUgPyBgc3BhY2U6JHtzcGFjZU5hbWV9YCA6IHVuZGVmaW5lZFxuICBdID0gZ2V0VmFsdWVDaGFpbihcInNvdXJjZWQgZnJvbSBwYWdlXCIpO1xuICBvYmouZGlzcGxheU5hbWUgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJuYW1lXCIpIHx8IHNwYWNlTmFtZTtcbiAgb2JqLmluZGV4ZXIgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBDb25maWcuaW5kZXhlcjtcbiAgb2JqLnRhYnVsYXRvciA9IGdldFZhbHVlKFwidGFidWxhdG9yXCIpIHx8IG9iai5pbmRleGVyO1xuICBvYmoudGFicyA9IGdldFBhaXJzKFwidGFiXCIpO1xuICBvYmouc29ydCA9IGdldFZhbHVlKFwic29ydFwiKTtcblxuICAvLyBUT0RPOiBicmVha3Mgd2l0aCBjdXN0b20gbmFtZXNcbiAgaWYgKG9iai5zb3J0ID09PSBcImRlZmF1bHRcIikgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInRhYlwiKTtcblxuICBvYmoudW5pcXVlQnlDb250ZW50ID0gISFpc1ByZXNlbnQoXCJ1bmlxdWUgYnkgY29udGVudFwiKTtcbiAgb2JqLmN1cmF0b3JzID0gZ2V0VmFsdWVzKFwiY3VyYXRvclwiKTtcbiAgb2JqLm1vZGVyYXRvcnMgPSBnZXRWYWx1ZXMoXCJtb2RcIik7XG4gIG9iai5pbmNsdWRlUmFua3MgPSAhIWlzUHJlc2VudChcInNob3cgcmFua3NcIik7XG4gIG9iai5zdGlja3lJZHMgPSBnZXRWYWx1ZXMoXCJzdGlja3lcIik7XG4gIG9iai5pc0lkU3RpY2t5ID0gaWQgPT4gISF0b2tlbml6ZWQuaXNQcmVzZW50KFtcInN0aWNreVwiLCBpZF0pO1xuICBvYmouaXNDaGF0ID0gISFpc1ByZXNlbnQoXCJkaXNwbGF5IGFzIGNoYXRcIik7XG4gIG9iai5zdWJtaXRUb3BpY3MgPSBnZXRWYWx1ZXMoXCJzdWJtaXQgdG9cIik7XG4gIG9iai5zdWJtaXRUb3BpYyA9IGdldFZhbHVlKFwic3VibWl0IHRvXCIpO1xuICBvYmouY2hhdFRvcGljID0gZ2V0VmFsdWUoXCJjaGF0IGluXCIpO1xuXG4gIGlmIChvd25lcklkICYmIHNwYWNlTmFtZSkge1xuICAgIG9iai5zcGFjZU5hbWUgPSBzcGFjZU5hbWU7XG4gICAgb2JqLm93bmVyID0gb3duZXJJZDtcbiAgICBvYmoudXNlRm9yQ29tbWVudHMgPSAhdG9rZW5pemVkLmlzUHJlc2VudChcImNvbW1lbnRzIGxlYXZlIHNwYWNlXCIpO1xuICAgIG9iai5iYXNlUGF0aCA9IGAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke3NwYWNlTmFtZX1gO1xuICAgIGlmIChvYmouc3VibWl0VG9waWMpIG9iai5zdWJtaXRQYXRoID0gYCR7b2JqLmJhc2VQYXRofS9zdWJtaXRgO1xuICAgIG9iai5kZWZhdWx0VGFiID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpO1xuICAgIG9iai5kZWZhdWx0VGFiUGF0aCA9IG9iai5kZWZhdWx0VGFiXG4gICAgICA/IHRva2VuaXplZC5nZXRWYWx1ZShbXCJ0YWJcIiwgb2JqLmRlZmF1bHRUYWJdKVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgb2JqLmZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICBhbGxvdzoge1xuICAgICAgcmVwbGllc1RvOiBnZXRWYWx1ZShcInJlcGxpZXMgdG8gYXV0aG9yXCIpLFxuICAgICAgdHlwZTogZ2V0VmFsdWUoXCJ0eXBlXCIpLCAvLyBUT0RPOiB0aGlzIGZpZWxkIHNlZW1zIHJlZHVuZGFudCB3aXRoIGtpbmQgYW5kIHNob3VsZCBiZSBkZXByZWNhdGVkXG4gICAgICBvcHM6IGdldFZhbHVlcyhcIm9wXCIpLFxuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcInRvcGljXCIpLFxuICAgICAgbGlzdGluZ3M6IGdldFZhbHVlcyhcImxpc3RpbmdcIiksXG4gICAgICBraW5kczogZ2V0VmFsdWVzKFwia2luZFwiKSxcbiAgICAgIGFub246ICFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKVxuICAgIH0sXG4gICAgZGVueToge1xuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYmFuIGFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYmFuIGF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImJhbiBkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcImJhbiB0b3BpY1wiKSxcbiAgICAgIGFub246ICEhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICEhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpLFxuICAgICAgdGFnczogZ2V0UGFpcnMoXCJjYW4gcmVtb3ZlXCIpXG4gICAgfVxuICB9O1xuXG4gIG9iai52b3RlRmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIHVwc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHVwc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWluOiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNaW46IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGJlbG93XCIpLCAxMCkgfHwgbnVsbFxuICB9O1xuXG4gIG9iai5jZW5zb3JzID0gUi51bmlxKFIubWFwKFIucHJvcCgxKSwgb2JqLmZpbHRlcnMuZGVueS50YWdzKSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RlZmluaXRpb24gPSB7IGZyb21Tb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuXG5jb25zdCBpbnRQYXRoID0gcCA9PlxuICBSLmNvbXBvc2UoXG4gICAgcGFyc2VJbnQsXG4gICAgUi5wYXRoKHApXG4gICk7XG5cbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgZmlsdGVycywgdm90ZUZpbHRlcnMsIGlzUHJlc2VudCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0gW107XG4gIGNvbnN0IHZvdGVGaWx0ZXJGdW5jdGlvbnMgPSBbXTtcblxuICBjb25zdCBhZGRGaWx0ZXIgPSAoLi4uZm5zKSA9PiBmaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG4gIGNvbnN0IGFkZFZvdGVGaWx0ZXIgPSAoLi4uZm5zKSA9PiB2b3RlRmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImFsaWFzXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYXV0aG9yXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0ID0+ICEhaXNQcmVzZW50KFtcImRvbWFpblwiLCB0XSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpbixcbiAgICAgIFIucHJvcChcImRhdGFcIilcbiAgICApO1xuXG4gIGlmIChcbiAgICBmaWx0ZXJzLmFsbG93LnRvcGljcy5sZW5ndGggJiZcbiAgICAhUi5maW5kKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLmlkZW50aWNhbChcImFsbFwiKSxcbiAgICAgICAgUi5sYXN0LFxuICAgICAgICBSLnNwbGl0KFwiOlwiKVxuICAgICAgKSxcbiAgICAgIGZpbHRlcnMuYWxsb3cudG9waWNzXG4gICAgKVxuICApXG4gICAgYWRkRmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgbGV0IHRvcGljID0gUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSwgaXRlbSk7XG4gICAgICBjb25zdCBraW5kID0gUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdLCBpdGVtKTtcblxuICAgICAgaWYgKGtpbmQgPT09IFwiY2hhdG1zZ1wiKSB0b3BpYyA9IGBjaGF0OiR7dG9waWN9YDtcbiAgICAgIGlmIChraW5kID09PSBcImNvbW1lbnRcIikgdG9waWMgPSBgY29tbWVudHM6JHt0b3BpY31gO1xuICAgICAgcmV0dXJuICEhaXNQcmVzZW50KFtcInRvcGljXCIsIHRvcGljXSk7XG4gICAgfSk7XG5cbiAgaWYgKGZpbHRlcnMuYWxsb3cua2luZHMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihraW5kID0+ICEhaXNQcmVzZW50KFtcImtpbmRcIiwga2luZF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImtpbmRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cudHlwZSA9PT0gXCJjb21tYW5kc1wiKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi50ZXN0KENvbnN0YW50cy5DT01NQU5EX1JFKSxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJib2R5XCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS5hbGlhc2VzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhbGlhcyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImFsaWFzXCIsIGFsaWFzXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvclwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmF1dGhvcnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGF1dGhvcklkID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYXV0aG9yXCIsIGF1dGhvcklkXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuZG9tYWlucy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgZG9tYWluID0+ICFkb21haW4gfHwgIWlzUHJlc2VudChbXCJiYW5cIiwgXCJkb21haW5cIiwgZG9tYWluXSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpblxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkudG9waWNzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0b3BpYyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcInRvcGljXCIsIHRvcGljXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcInRvcGljXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYW5vbikgYWRkRmlsdGVyKFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5zaWduZWQpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBhdXRob3JJZCA9PiAhYXV0aG9ySWQsXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAodm90ZUZpbHRlcnMudXBzTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMudXBzTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy51cHNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy51cHNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuZG93bnNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5kb3duc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnNjb3JlTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnNjb3JlTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS50YWdzLmxlbmd0aClcbiAgICBhZGRWb3RlRmlsdGVyKHRoaW5nID0+IHtcbiAgICAgIGNvbnN0IGNtZHMgPSBSLnBhdGgoW1widm90ZXNcIiwgXCJjb21tYW5kc1wiXSwgdGhpbmcpIHx8IHt9O1xuXG4gICAgICByZXR1cm4gIWZpbHRlcnMuZGVueS50YWdzLmZpbmQoXG4gICAgICAgIChbdGFnTmFtZSwgYXV0aG9ySWRdKSA9PiAhIVIucGF0aChbYXV0aG9ySWQsIFwidGFnXCIsIHRhZ05hbWVdLCBjbWRzKVxuICAgICAgKTtcbiAgICB9KTtcblxuICBjb25zdCBjb250ZW50RmlsdGVyID0gdGhpbmcgPT4gIWZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB2b3RlRmlsdGVyID0gdGhpbmcgPT4gIXZvdGVGaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3QgdGhpbmdGaWx0ZXIgPSB0aGluZyA9PlxuICAgIGRlZmluaXRpb24uaXNJZFN0aWNreShSLnByb3AoXCJpZFwiLCB0aGluZykpIHx8XG4gICAgKGNvbnRlbnRGaWx0ZXIodGhpbmcpICYmIHZvdGVGaWx0ZXIodGhpbmcpKTtcblxuICByZXR1cm4geyB0aGluZ0ZpbHRlciwgY29udGVudEZpbHRlciwgdm90ZUZpbHRlciB9O1xufTtcblxuY29uc3QgZ2V0RmlsdGVyZWRSb3dzID0gYXN5bmMgKFxuICBzY29wZSxcbiAgc3BlYyxcbiAgc29ydGVkUm93cyxcbiAgeyBsaW1pdDogbGltaXRQcm9wID0gMjUsIGNvdW50OiBjb3VudFByb3AgPSAwLCBhZnRlciA9IG51bGwsIGZpbHRlckZuIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQobGltaXRQcm9wLCAxMCk7XG4gIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoY291bnRQcm9wLCAxMCkgfHwgMDtcbiAgY29uc3Qgcm93cyA9IHNvcnRlZFJvd3Muc2xpY2UoKTtcbiAgY29uc3QgZmlsdGVyZWQgPSBbXTtcbiAgY29uc3QgZmV0Y2hCYXRjaCA9IChzaXplID0gMzApID0+XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICBSLm1hcChhc3luYyByb3cgPT4ge1xuICAgICAgICBsZXQgaW5MaXN0aW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJibGFua1Jvd1wiLCByb3cpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWx0ZXJGbikgaW5MaXN0aW5nID0gYXdhaXQgZmlsdGVyRm4ocm93W0xpc3RpbmdOb2RlLlBPU19JRF0pO1xuICAgICAgICBpZiAoaW5MaXN0aW5nKSBmaWx0ZXJlZC5wdXNoKHJvdyk7XG4gICAgICB9LCByb3dzLnNwbGljZShjb3VudCwgc2l6ZSkpXG4gICAgKTtcblxuICB3aGlsZSAocm93cy5sZW5ndGggPiBjb3VudCkge1xuICAgIGF3YWl0IGZldGNoQmF0Y2goKTtcbiAgICBpZiAobGltaXQgJiYgZmlsdGVyZWQubGVuZ3RoID49IGxpbWl0KSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBSLmNvbXBvc2UoXG4gICAgbGltaXQgPyBSLnNsaWNlKDAsIGxpbWl0KSA6IFIuaWRlbnRpdHksXG4gICAgUi5zb3J0QnkoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19WQUwpKVxuICApKGZpbHRlcmVkKTtcbn07XG5cbmNvbnN0IGdldEZpbHRlcmVkSWRzID0gUi5jb21wb3NlKFxuICB4ID0+IHgudGhlbihSLm1hcChSLnByb3AoTGlzdGluZ05vZGUuUE9TX0lEKSkpLFxuICBnZXRGaWx0ZXJlZFJvd3Ncbik7XG5cbmNvbnN0IHRoaW5nRmlsdGVyID0gUi5jdXJyeSgoc2NvcGUsIHNwZWMsIHRoaW5nSWQpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSksXG4gICAgc2NvcmVzOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc1Njb3JlcyhzcGVjKSxcbiAgICBkYXRhOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc0RhdGEoc3BlYylcbiAgfSkudGhlbihzcGVjLnRoaW5nRmlsdGVyKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdGaWx0ZXIgPSB7XG4gIGZyb21EZWZpbml0aW9uLFxuICBnZXRGaWx0ZXJlZFJvd3MsXG4gIGdldEZpbHRlcmVkSWRzLFxuICB0aGluZ0ZpbHRlclxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcblxuY29uc3QgW1BPU19JRFgsIFBPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMSwgMiwgM107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHJvd3NUb0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHJvd3NUb0l0ZW1zID0gUi5tYXAoUi5zbGljZSgxLCAzKSk7XG5jb25zdCBzb3VyY2UgPSBSLnByb3BPcihcIlwiLCBcInNvdXJjZVwiKTtcbmNvbnN0IHNvdWxGcm9tUGF0aCA9IFIuY3VycnkoXG4gIChpbmRleGVyLCBwYXRoKSA9PiBgJHtDb25zdGFudHMuUFJFRklYfSR7cGF0aH1AfiR7aW5kZXhlcn0uYFxuKTtcbmNvbnN0IHBhdGhGcm9tU291bCA9IFIuY29tcG9zZShcbiAgUi5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke0NvbnN0YW50cy5QUkVGSVh9YCksIFwiXCIpLFxuICBSLnJlcGxhY2UoL0B+LipcXC4vLCBcIlwiKVxuKTtcblxuY29uc3QgaWRUb1NvdWwgPSB0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KTtcbmNvbnN0IGlkc1RvU291bHMgPSBSLm1hcChpZFRvU291bCk7XG5jb25zdCBzb3VsVG9JZCA9IHNvdWwgPT4gUi5wcm9wKFwidGhpbmdJZFwiLCBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goc291bCkpO1xuY29uc3Qgc291bHNUb0lkcyA9IFIubWFwKHNvdWxUb0lkKTtcblxuY29uc3QgZ2V0Um93ID0gUi5jdXJyeSgobm9kZSwgaWR4KSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmluc2VydCgwLCBwYXJzZUludChpZHgsIDEwKSksIFIuYWx3YXlzKG51bGwpKSxcbiAgICByb3cgPT4ge1xuICAgICAgcm93WzFdID0gcGFyc2VGbG9hdChyb3dbMV0pO1xuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LFxuICAgIFIubWFwKFIudHJpbSksXG4gICAgUi5zcGxpdChcIixcIiksXG4gICAgUi5wcm9wT3IoXCJcIiwgYCR7aWR4fWApXG4gICkobm9kZSlcbik7XG5cbmNvbnN0IGl0ZW1LZXlzID0gUi5jb21wb3NlKFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICB2YWwgPT4gISEodmFsID09PSAwIHx8IHZhbCksXG4gICAgICBwYXJzZUludFxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCBzZXJpYWxpemUgPSBSLmN1cnJ5KChzcGVjLCBpdGVtcykgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIuYWRkSW5kZXgoUi5yZWR1Y2UpKFxuICAgICAgKHJlcywgcm93LCBpZHgpID0+IFIuYXNzb2MoYCR7aWR4fWAsIHJvdy5qb2luKFwiLFwiKSwgcmVzKSxcbiAgICAgIHt9XG4gICAgKSxcbiAgICBSLmRlZmF1bHRUbyhbXSlcbiAgKShpdGVtcylcbik7XG5cbmNvbnN0IHJvd3MgPSBub2RlID0+XG4gIFIuY29tcG9zZShcbiAgICBSLm1hcChnZXRSb3cobm9kZSkpLFxuICAgIGl0ZW1LZXlzXG4gICkobm9kZSk7XG5cbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgcm93c1RvSWRzLFxuICByb3dzXG4pO1xuXG5jb25zdCBzb3J0Um93cyA9IFIuc29ydFdpdGgoW1xuICBSLmFzY2VuZChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLmNvbmQoW1tSLmlzTmlsLCBSLmFsd2F5cyhJbmZpbml0eSldLCBbUi5ULCBwYXJzZUZsb2F0XV0pLFxuICAgICAgUi5wcm9wKFBPU19WQUwpXG4gICAgKVxuICApXG5dKTtcblxuY29uc3Qgc29ydGVkSWRzID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgcm93c1xuKTtcblxuY29uc3QgaXRlbXNUb1Jvd3MgPSBSLmFkZEluZGV4KFIubWFwKSgoaXRlbSwgaWR4KSA9PiBbaWR4LCAuLi5pdGVtXSk7XG5cbmNvbnN0IGRpZmYgPSBhc3luYyAoXG4gIG5vZGUsXG4gIHVwZGF0ZWRJdGVtcyA9IFtdLFxuICByZW1vdmVJZHMgPSBbXSxcbiAgeyBtYXhTaXplID0gMTAwMCB9ID0ge31cbikgPT4ge1xuICBjb25zdCByZW1vdmVkID0gUi5pbmRleEJ5KFIuaWRlbnRpdHksIHJlbW92ZUlkcyk7XG4gIGNvbnN0IGJ5SWQgPSB7fTtcbiAgY29uc3QgY2hhbmdlcyA9IHt9O1xuICBjb25zdCByb3dzID0gW107XG4gIGNvbnN0IHVwZGF0ZWQgPSB7fTtcbiAgbGV0IHRvUmVwbGFjZSA9IFtdO1xuICBsZXQgbWF4SWR4ID0gMDtcbiAgbGV0IGtleTtcblxuICBmb3IgKGtleSBpbiBub2RlIHx8IHt9KSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoa2V5LCAxMCk7XG5cbiAgICBpZiAoIShwYXJzZWQgfHwgcGFyc2VkID09PSAwKSkgY29udGludWU7XG4gICAgY29uc3Qgcm93ID0gZ2V0Um93KG5vZGUsIGtleSkgfHwgW3BhcnNlZCwgbnVsbCwgbnVsbF07XG4gICAgY29uc3QgW2lkeCwgaWQgPSBudWxsLCByYXdWYWx1ZSA9IG51bGxdID0gcm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICByb3dbUE9TX1ZBTF0gPSByYXdWYWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBwYXJzZUZsb2F0KHJhd1ZhbHVlKTtcbiAgICBpZiAoaWQgJiYgcmVtb3ZlZFtpZF0pIHJvd1tQT1NfSURdID0gcm93W1BPU19WQUxdID0gbnVsbDtcbiAgICBpZiAoaWQpIGJ5SWRbaWRdID0gcm93O1xuICAgIGlmIChyb3dbUE9TX0lEXSkge1xuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvUmVwbGFjZS5wdXNoKHJvdyk7XG4gICAgfVxuICAgIGlmIChpZHggPiBtYXhJZHgpIG1heElkeCA9IGlkeDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW2lkLCB2YWx1ZV0gPSB1cGRhdGVkSXRlbXNbaV0gfHwgW251bGwsIG51bGxdO1xuXG4gICAgaWYgKCFpZCkgY29udGludWU7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBieUlkW2lkXTtcblxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgaWYgKGV4aXN0aW5nW1BPU19WQUxdICE9PSB2YWx1ZSkge1xuICAgICAgICBleGlzdGluZ1tQT1NfVkFMXSA9IHZhbHVlO1xuICAgICAgICB1cGRhdGVkW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtudWxsLCBpZCwgdmFsdWVdO1xuXG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhbGxTb3J0ZWQgPSBzb3J0Um93cyhyb3dzKTtcbiAgY29uc3Qgc29ydGVkID0gbWF4U2l6ZSA/IGFsbFNvcnRlZC5zbGljZSgwLCBtYXhTaXplKSA6IGFsbFNvcnRlZDtcbiAgY29uc3QgbWlzc2luZyA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UobWF4U2l6ZSwgYWxsU29ydGVkLmxlbmd0aCkgOiBbXTtcbiAgY29uc3QgYWRkZWQgPSBSLmZpbHRlcihyb3cgPT4gcm93W1BPU19JRFhdID09PSBudWxsLCBzb3J0ZWQpO1xuXG4gIHRvUmVwbGFjZSA9IHRvUmVwbGFjZVxuICAgIC5jb25jYXQoUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSAhPT0gbnVsbCwgbWlzc2luZykpXG4gICAgLnJldmVyc2UoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGlkID0gc29ydGVkW2ldW1BPU19JRF07XG4gICAgY29uc3QgaWR4ID0gc29ydGVkW2ldW1BPU19JRFhdO1xuICAgIGNvbnN0IHZhbCA9IHNvcnRlZFtpXVtQT1NfVkFMXTtcblxuICAgIGlmIChpZHggIT09IG51bGwgJiYgdXBkYXRlZFtpZF0pIGNoYW5nZXNbYCR7aWR4fWBdID0gW2lkLCB2YWxdLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgY29uc3QgaW5zZXJ0ZWQgPSBbXTtcblxuICB3aGlsZSAoYWRkZWQubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gYWRkZWQucG9wKCk7XG4gICAgY29uc3QgcmVwbGFjZWQgPSB0b1JlcGxhY2UucG9wKCk7XG4gICAgbGV0IFtpZHhdID0gcmVwbGFjZWQgfHwgW251bGxdO1xuXG4gICAgaWYgKGlkeCA9PT0gbnVsbCkge1xuICAgICAgaWR4ID0gcGFyc2VJbnQobWF4SWR4LCAxMCkgKyBpbnNlcnRlZC5sZW5ndGggKyAxO1xuICAgICAgaW5zZXJ0ZWQucHVzaChpZHgpO1xuICAgIH1cblxuICAgIGNoYW5nZXNbYCR7aWR4fWBdID0gW3Jvd1tQT1NfSURdLCByb3dbUE9TX1ZBTF1dLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgd2hpbGUgKHRvUmVwbGFjZS5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSB0b1JlcGxhY2UucG9wKCk7XG5cbiAgICBpZiAocm93ICYmICFyb3dbUE9TX0lEXSkge1xuICAgICAgY29uc3QgaWR4ID0gYCR7cm93W1BPU19JRFhdfWA7XG5cbiAgICAgIGlmIChub2RlW2lkeF0gIT09IG51bGwpIHtcbiAgICAgICAgY2hhbmdlc1tpZHhdID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJudWxsaW5nXCIsIGlkeCwgbm9kZVtpZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gUi5rZXlzKGNoYW5nZXMpLmxlbmd0aCA/IGNoYW5nZXMgOiBudWxsO1xufTtcblxuY29uc3QgY2F0ZWdvcml6ZURpZmYgPSAoZGlmZiwgb3JpZ2luYWwpID0+IHtcbiAgY29uc3QgYWxsS2V5cyA9IGl0ZW1LZXlzKFIubWVyZ2VMZWZ0KGRpZmYsIG9yaWdpbmFsKSk7XG4gIGNvbnN0IGFkZGVkID0gW107XG4gIGNvbnN0IHJlbW92ZWQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBhbGxLZXlzW2ldO1xuICAgIGNvbnN0IFtfZGlmZklkeCwgZGlmZklkXSA9IGdldFJvdyhkaWZmLCBrZXkpIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgY29uc3QgW19vcmlnSWR4LCBvcmlnSWRdID0gZ2V0Um93KG9yaWdpbmFsLCBrZXkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICBpZiAoZGlmZklkICE9PSBvcmlnSWQpIHtcbiAgICAgIGlmIChkaWZmSWQpIGFkZGVkLnB1c2goZGlmZklkKTtcbiAgICAgIGlmIChvcmlnSWQpIHJlbW92ZWQucHVzaChvcmlnSWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbYWRkZWQsIHJlbW92ZWRdO1xufTtcblxuY29uc3QgdW5pb25Sb3dzID0gUi5jb21wb3NlKFxuICBSLnVuaXFCeShSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLnJlZHVjZShSLmNvbmNhdCwgW10pLFxuICBSLm1hcChyb3dzKVxuKTtcblxuY29uc3Qgcm93c0Zyb21Tb3VscyA9IHF1ZXJ5KChzY29wZSwgc291bHMpID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKS50aGVuKHVuaW9uUm93cylcbik7XG5cbmNvbnN0IHJlYWQgPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgeyBpbmRleGVyID0gQ29uZmlnLmluZGV4ZXIgfSA9IG9wdHMgfHwge307XG5cbiAgcmV0dXJuIHJvd3NGcm9tU291bHMoc2NvcGUsIFtzb3VsRnJvbVBhdGgoaW5kZXhlciwgcGF0aCldKS50aGVuKHJvd3NUb0lkcyk7XG59LCBcImxpc3RpbmdSb3dzXCIpO1xuXG5jb25zdCBnZXQgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3VsKSA9PiAoc291bCA/IHNjb3BlLmdldChzb3VsKSA6IHJlc29sdmUobnVsbCkpLFxuICBcImxpc3RpbmdcIlxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdOb2RlID0ge1xuICBQT1NfSURYLFxuICBQT1NfSUQsXG4gIFBPU19WQUwsXG4gIHNvdXJjZSxcbiAgZ2V0LFxuICBnZXRSb3csXG4gIGl0ZW1LZXlzLFxuICBzZXJpYWxpemUsXG4gIHJvd3MsXG4gIGlkcyxcbiAgaWRUb1NvdWwsXG4gIGlkc1RvU291bHMsXG4gIHNvdWxUb0lkLFxuICBzb3Vsc1RvSWRzLFxuICByb3dzVG9JZHMsXG4gIHJvd3NUb0l0ZW1zLFxuICBpdGVtc1RvUm93cyxcbiAgc29ydFJvd3MsXG4gIHNvcnRlZElkcyxcbiAgc291bEZyb21QYXRoLFxuICBwYXRoRnJvbVNvdWwsXG4gIHJvd3NGcm9tU291bHMsXG4gIHJlYWQsXG4gIGRpZmYsXG4gIGNhdGVnb3JpemVEaWZmLFxuICB1bmlvblJvd3Ncbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5jb25zdCB1cGRhdGVMaXN0aW5nID0gYXN5bmMgKFxuICBvcmMsXG4gIHJvdXRlLFxuICBzY29wZSxcbiAgc3BlYyxcbiAgaWRzID0gW10sXG4gIHJlbW92ZUlkcyA9IFtdXG4pID0+IHtcbiAgaWYgKCFpZHMubGVuZ3RoICYmICFyZW1vdmVJZHMubGVuZ3RoKSByZXR1cm47XG4gIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgb3JjLm5ld1Njb3BlKCkuZ2V0KHJvdXRlLnNvdWwpO1xuICBjb25zdCB1cGRhdGVkSXRlbXMgPSBhd2FpdCBMaXN0aW5nU29ydC50b0l0ZW1zKHNjb3BlLCBpZHMsIHNwZWMpO1xuICBjb25zdCBjaGFuZ2VzID0gYXdhaXQgTGlzdGluZ05vZGUuZGlmZihleGlzdGluZywgdXBkYXRlZEl0ZW1zLCByZW1vdmVJZHMpO1xuXG4gIGlmIChjaGFuZ2VzKSBjb25zb2xlLmxvZyhcIkNIQU5HRVNcIiwgcm91dGUuc291bCwgY2hhbmdlcyk7XG4gIGlmIChjaGFuZ2VzKSByb3V0ZS53cml0ZShjaGFuZ2VzKTtcbn07XG5cbmNvbnN0IG9uUHV0ID0gYXN5bmMgKG9yYywgcm91dGUsIHsgc291bCwgdXBkYXRlZFNvdWwsIGRpZmYsIC4uLnByb3BzIH0pID0+IHtcbiAgbGV0IHVwZGF0ZWRJZHMgPSBbXTtcblxuICBjb25zdCBwYXRoID0gTGlzdGluZ05vZGUucGF0aEZyb21Tb3VsKHNvdWwpO1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuICBjb25zdCBzcGVjID0gYXdhaXQgTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoKTtcblxuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUubWF0Y2godXBkYXRlZFNvdWwpIHx8IHt9O1xuICBjb25zdCBpc1N0aWNreSA9IFIuZXF1YWxzKHJvdXRlLm1hdGNoLnRoaW5nSWQgfHwgbnVsbCk7XG5cbiAgaWYgKHRoaW5nSWQpIHVwZGF0ZWRJZHMucHVzaCh0aGluZ0lkKTtcbiAgdXBkYXRlZElkcyA9IFIuY29uY2F0KHVwZGF0ZWRJZHMsIFRoaW5nU2V0LmlkcyhHdW5Ob2RlLmRlY29kZVNFQShkaWZmKSkpO1xuXG4gIGF3YWl0IHVwZGF0ZUxpc3Rpbmcob3JjLCByb3V0ZSwgc2NvcGUsIHNwZWMsIHVwZGF0ZWRJZHMsIFtdLCBpc1N0aWNreSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nT3JhY2xlID0ge1xuICB1cGRhdGVMaXN0aW5nLFxuICBvblB1dFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IGNhbGN1bGF0ZVJvd3MgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT4ge1xuICBjb25zdCBmaWx0ZXJGbiA9IExpc3RpbmdGaWx0ZXIudGhpbmdGaWx0ZXIoc2NvcGUsIHNwZWMpO1xuICBjb25zdCBzdGlja3lJdGVtcyA9IFIubWFwKGlkID0+IFtpZCwgLUluZmluaXR5XSwgc3BlYy5zdGlja3lJZHMpO1xuXG4gIGlmICghc3BlYy5kYXRhU291cmNlLnF1ZXJ5KSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gIHJldHVybiBzcGVjLmRhdGFTb3VyY2UucXVlcnkoc2NvcGUpLnRoZW4oaXRlbXMgPT4ge1xuICAgIGNvbnN0IHJvd3MgPSBMaXN0aW5nTm9kZS5pdGVtc1RvUm93cyhbLi4uc3RpY2t5SXRlbXMsIC4uLml0ZW1zXSk7XG5cbiAgICByZXR1cm4gTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZFJvd3Moc2NvcGUsIHNwZWMsIHJvd3MsIHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICBmaWx0ZXJGblxuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5jb25zdCBjYWxjdWxhdGUgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT4ge30pO1xuXG5jb25zdCB0b05vZGUgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMpID0+XG4gIGNhbGN1bGF0ZVJvd3Moc2NvcGUsIHNwZWMsIG9wdHMpLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgTGlzdGluZ05vZGUuc2VyaWFsaXplKHNwZWMpLFxuICAgICAgTGlzdGluZ05vZGUucm93c1RvSXRlbXNcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHJlYWQgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT4ge1xuICBjb25zdCBmaWx0ZXJGbiA9IExpc3RpbmdGaWx0ZXIudGhpbmdGaWx0ZXIoc2NvcGUsIHNwZWMpO1xuICBjb25zdCBwYXRocyA9IFIucGF0aE9yKFtdLCBbXCJkYXRhU291cmNlXCIsIFwibGlzdGluZ1BhdGhzXCJdLCBzcGVjKTtcbiAgY29uc3Qgc3RpY2t5Um93cyA9IFIubWFwKGlkID0+IFstMSwgaWQsIC1JbmZpbml0eV0sIHNwZWMuc3RpY2t5SWRzKTtcbiAgY29uc3Qgc291bHMgPSBSLm1hcChcbiAgICBMaXN0aW5nTm9kZS5zb3VsRnJvbVBhdGgob3B0cy5pbmRleGVyIHx8IHNwZWMuaW5kZXhlciksXG4gICAgcGF0aHNcbiAgKTtcblxuICByZXR1cm4gTGlzdGluZ05vZGUucm93c0Zyb21Tb3VscyhzY29wZSwgc291bHMpLnRoZW4ocm93cyA9PlxuICAgIExpc3RpbmdGaWx0ZXIuZ2V0RmlsdGVyZWRJZHMoc2NvcGUsIHNwZWMsIFsuLi5zdGlja3lSb3dzLCAuLi5yb3dzXSwge1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGZpbHRlckZuXG4gICAgfSlcbiAgKTtcbn0pO1xuXG5jb25zdCBmcm9tU3BlYyA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PlxuICAob3B0cy5jYWxjdWxhdGUgPyBjYWxjdWxhdGUgOiByZWFkKShzY29wZSwgc3BlYywgb3B0cylcbik7XG5cbmNvbnN0IGZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBMaXN0aW5nVHlwZS5mcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUpIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICByZXR1cm4gdHlwZS5nZXRTcGVjKHNjb3BlLCB0eXBlLm1hdGNoKS50aGVuKHNwZWMgPT4ge1xuICAgIGlmIChzcGVjLmhhc0luZGV4ZXIgJiYgIW9wdHMuY2FsY3VsYXRlKSB7XG4gICAgICBpZiAoIXR5cGUgfHwgIXR5cGUucmVhZCkgcmV0dXJuIExpc3RpbmdOb2RlLnJlYWQoc2NvcGUsIHBhdGgsIG9wdHMpO1xuICAgICAgcmV0dXJuIHR5cGUucmVhZChzY29wZSwgdHlwZS5tYXRjaCwgb3B0cyk7XG4gICAgfVxuICAgIHJldHVybiBmcm9tU3BlYyhzY29wZSwgc3BlYywgb3B0cyk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IG5vZGVGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT5cbiAgTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoKS50aGVuKHNwZWMgPT5cbiAgICB0b05vZGUoc2NvcGUsIHNwZWMsIFIubWVyZ2VMZWZ0KG9wdHMsIHsgbGltaXQ6IENvbnN0YW50cy5MSVNUSU5HX1NJWkUgfSkpXG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nUXVlcnkgPSB7XG4gIGZyb21TcGVjLFxuICBmcm9tUGF0aCxcbiAgY2FsY3VsYXRlUm93cyxcbiAgdG9Ob2RlLFxuICBub2RlRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuXG5jb25zdCBbUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxXTtcbmNvbnN0IHRvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgc29ydEl0ZW1zID0gUi5zb3J0QnkoUi5wcm9wKFBPU19WQUwpKTtcblxuY29uc3Qgdm90ZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+IHtcbiAgaWYgKHNwZWMuaXNJZFN0aWNreSh0aGluZ0lkKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcbiAgaWYgKFIuY29udGFpbnModGhpbmdJZCwgc3BlYy5maWx0ZXJzLmFsbG93Lm9wcykpIHJldHVybiByZXNvbHZlKC1JbmZpbml0eSk7XG5cbiAgcmV0dXJuIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgc2NvcmVzOiB0cnVlLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pXG4gIH0pLnRoZW4ocmVzID0+IGZuKHJlcywgc3BlYykpO1xufSk7XG5cbmNvbnN0IHRpbWVTb3J0ID0gZm4gPT4gcXVlcnkoKHNjb3BlLCB0aGluZ0lkLCBzcGVjKSA9PlxuICBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pXG4gIH0pLnRoZW4oZm4pXG4pO1xuXG5jb25zdCBzb3J0cyA9IHtcbiAgbmV3OiB0aW1lU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm11bHRpcGx5KC0xKSxcbiAgICAgIFIuZGVmYXVsdFRvKDApLFxuICAgICAgUi5wcm9wKFwidGltZXN0YW1wXCIpLFxuICAgIClcbiAgKSxcbiAgb2xkOiB0aW1lU29ydChSLnByb3AoXCJ0aW1lc3RhbXBcIikpLFxuICBhY3RpdmU6IHZvdGVTb3J0KFxuICAgICh7IHRpbWVzdGFtcCwgbGFzdEFjdGl2ZSB9KSA9PiAtMSAqIChsYXN0QWN0aXZlIHx8IHRpbWVzdGFtcClcbiAgKSxcbiAgdG9wOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VJbnQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSlcbiAgICApXG4gICksXG4gIGNvbW1lbnRzOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VGbG9hdCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0pXG4gICAgKVxuICApLFxuICBkaXNjdXNzZWQ6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuXG4gICAgaWYgKCFzY29yZSkgcmV0dXJuIDEwMDAwMDAwMDAgLSBzZWNvbmRzO1xuICAgIHJldHVybiAtMSAqIChvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBob3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcbiAgICBsZXQgc2lnbiA9IDA7XG5cbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICBzaWduID0gMTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlIDwgMCkge1xuICAgICAgc2lnbiA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gLTEgKiAoc2lnbiAqIG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGJlc3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgbiA9IHVwcyArIGRvd25zO1xuXG4gICAgaWYgKG4gPT09IDApIHJldHVybiAwO1xuICAgIGNvbnN0IHogPSAxLjI4MTU1MTU2NTU0NTsgLy8gODAlIGNvbmZpZGVuY2VcbiAgICBjb25zdCBwID0gdXBzIC8gbjtcbiAgICBjb25zdCBsZWZ0ID0gcCArICgxIC8gKDIgKiBuKSkgKiB6ICogejtcbiAgICBjb25zdCByaWdodCA9IHogKiBNYXRoLnNxcnQoKHAgKiAoMSAtIHApKSAvIG4gKyAoeiAqIHopIC8gKDQgKiBuICogbikpO1xuICAgIGNvbnN0IHVuZGVyID0gMSArICgxIC8gbikgKiB6ICogejtcblxuICAgIHJldHVybiAtMSAqICgobGVmdCAtIHJpZ2h0KSAvIHVuZGVyKTtcbiAgfSksXG4gIGNvbnRyb3ZlcnNpYWw6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG5cbiAgICBpZiAodXBzIDw9IDAgfHwgZG93bnMgPD0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbWFnbml0dWRlID0gdXBzICsgZG93bnM7XG4gICAgY29uc3QgYmFsYW5jZSA9IHVwcyA+IGRvd25zID8gZG93bnMgLyB1cHMgOiB1cHMgLyBkb3ducztcblxuICAgIHJldHVybiAtMSAqIG1hZ25pdHVkZSAqKiBiYWxhbmNlO1xuICB9KVxufTtcblxuY29uc3QgaXNWYWxpZFNvcnQgPSBzb3J0ID0+ICEhc29ydHNbc29ydF07XG5cbmNvbnN0IHRvSXRlbSA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkLCBzcGVjKSA9PlxuICAgIChzb3J0c1tzcGVjLnNvcnRdIHx8IHNvcnRzLm5ldykoc2NvcGUsIGlkLCBzcGVjKS50aGVuKHZhbCA9PiBbaWQsIHZhbF0pXG4pO1xuXG5jb25zdCBpdGVtRnJvbVNvdWwgPSAoc2NvcGUsIHNvdWwsIHNwZWMpID0+IHRvSXRlbShzY29wZSwgTGlzdGluZ05vZGUuc291bFRvSWQoc291bCksIHNwZWMpO1xuXG5jb25zdCB0b0l0ZW1zID0gcXVlcnkoXG4gIChzY29wZSwgaWRzLCBzcGVjKSA9PiBhbGwoUi5tYXAoXG4gICAgaWQgPT4gdG9JdGVtKHNjb3BlLCBpZCwgc3BlYyksXG4gICAgaWRzXG4gICkpXG4pO1xuXG5jb25zdCBmcm9tVGhpbmdTZXRzID0gcXVlcnkoXG4gIChzY29wZSwgc291bHMsIHNwZWMpID0+XG4gICAgYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgICAgLnRoZW4oUi5waXBlKFxuICAgICAgICBUaGluZ1NldC51bmlvbixcbiAgICAgICAgVGhpbmdTZXQuaWRzLFxuICAgICAgICBpZHMgPT4gdG9JdGVtcyhzY29wZSwgaWRzLCBzcGVjKVxuICAgICAgKSlcbiAgICAgIC50aGVuKHNvcnRJdGVtcylcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU29ydCA9IHtcbiAgUE9TX0lELFxuICBQT1NfVkFMLFxuICBzb3J0cyxcbiAgaXNWYWxpZFNvcnQsXG4gIHRvSXRlbSxcbiAgdG9JdGVtcyxcbiAgdG9JZHMsXG4gIGl0ZW1Gcm9tU291bCxcbiAgc29ydEl0ZW1zLFxuICBmcm9tVGhpbmdTZXRzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmltcG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSBSLmNvbXBvc2UoXG4gIFIuYXBwbHkoUi5tZXJnZUxlZnQpLFxuICBSLmFwKFtMaXN0aW5nRmlsdGVyLmZyb21EZWZpbml0aW9uLCBSLmlkZW50aXR5XSksXG4gIFIub2YsXG4gIFIuYXBwbHkoUi5hc3NvYyhcImRhdGFTb3VyY2VcIikpLFxuICBSLmFwKFtMaXN0aW5nRGF0YVNvdXJjZS5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBMaXN0aW5nRGVmaW5pdGlvbi5mcm9tU291cmNlXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSA9IFwiXCIpID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSlcbiAgICAudGhlbihSLmNvbXBvc2UoXG4gICAgICBib2R5ID0+IGAke2JvZHl9XG4jIGFkZGVkIGJ5IGluZGV4ZXJcbiR7ZXh0cmEgfHwgXCJcIn1cbnNvdXJjZWQgZnJvbSBwYWdlICR7YXV0aG9ySWR9ICR7bmFtZX1cbmAsXG4gICAgICBUaGluZ0RhdGFOb2RlLmJvZHlcbiAgICApKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTcGVjID0geyBmcm9tU291cmNlLCBnZXRTb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljL2NoYXRcIjtcbmNvbnN0IHRhYnMgPSBbIC4uLlRvcGljTGlzdGluZy50YWJzLCBcImNoYXRcIiBdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNoYXQ6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3Qgbm9ybWFsVG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCBgY2hhdDoke3RvcGljfWBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y2hhdFwiLFxuICAgIFtcbiAgICAgIFwic29ydCBuZXdcIixcbiAgICAgIFwiZGlzcGxheSBhcyBjaGF0XCIsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ2hhdExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90aGluZ3MvOnRoaW5nSWQvY29tbWVudHMvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNvbW1lbnRzOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0aGluZ0lkLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y29tbWVudHNcIixcbiAgICBbYG9wICR7dGhpbmdJZH1gLCBgc29ydCAke3NvcnR9YF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvY29tbWVudGVkLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjb21tZW50ZWQ6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y29tbWVudGVkXCIsXG4gICAgW1xuICAgICAgYGN1cmF0b3IgJHthdXRob3JJZH1gLFxuICAgICAgYHNvcnQgJHtzb3J0fWBcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ZWRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTaWRlYmFyLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG5cbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi9kb21haW4vOmRvbWFpbi86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpkb21haW46c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiwgc29ydCB9KSA9PiB7XG4gIGNvbnN0IGRvbWFpbnMgPSBQYXRoLnNwbGl0VG9waWNzKGRvbWFpbik7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6ZG9tYWluXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHtkb21haW5zWzBdfWAsXG4gICAgICBcInN1Ym1pdCB0byB3aGF0ZXZlclwiLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICBcImtpbmQgc3VibWlzc2lvblwiLFxuICAgICAgLi4uUi5tYXAoZG9tYWluID0+IGBkb21haW4gJHtkb21haW59YCwgZG9tYWlucyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL2RvbWFpbi8ke2RvbWFpbn0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IERvbWFpbkxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIHRhYnMsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy9maXJlaG9zZVwiO1xuY29uc3QgdGFicyA9IFRvcGljTGlzdGluZy50YWJzO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6ZmlyZWhvc2U6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3Qgbm9ybWFsVG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCB0b3BpYywgYGNoYXQ6JHt0b3BpY31gLCBgY29tbWVudHM6JHt0b3BpY31gXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmZpcmVob3NlXCIsXG4gICAgW1xuICAgICAgXCJzb3J0IG5ld1wiLFxuICAgICAgXCJkaXNwbGF5IGFzIGNoYXRcIixcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBGaXJlaG9zZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHRhYnMsXG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uLy4uL1RoaW5nXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzp0b3BpYzpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgPSBcIm5ld1wiIH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6aW5ib3hcIixcbiAgICBbYHJlcGxpZXMgdG8gYXV0aG9yICR7YXV0aG9ySWR9YCwgXCJraW5kIGNvbW1lbnRcIiwgYHR5cGUgJHt0eXBlfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChvcmMsIHJvdXRlLCB7IHVwZGF0ZWRTb3VsLCBkaWZmIH0pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRBdXRob3JlZF0gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihkaWZmRGF0YSk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGxldCB1cGRhdGVkSWRzID0gVGhpbmdTZXQuaWRzKGRpZmZEYXRhKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRBdXRob3JlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wSWQgPSB1cGRhdGVkQXV0aG9yZWRbaV07XG4gICAgY29uc3QgcmVwbHlJZHMgPSBUaGluZ1NldC5pZHMoXG4gICAgICBhd2FpdCBzY29wZVxuICAgICAgICAuZ2V0KFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcElkIH0pKVxuICAgICAgICAudGhlbigpXG4gICAgKTtcblxuICAgIHVwZGF0ZWRJZHMgPSB1cGRhdGVkSWRzLmNvbmNhdChyZXBseUlkcyk7XG4gIH1cblxuICBpZiAodXBkYXRlZElkcy5sZW5ndGgpXG4gICAgYXdhaXQgTGlzdGluZ09yYWNsZS51cGRhdGVMaXN0aW5nKG9yYywgcm91dGUsIHNjb3BlLCBzcGVjLCB1cGRhdGVkSWRzLCBbXSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBJbmJveExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlYyxcbiAgb25QdXRcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wib3ZlcnZpZXdcIiwgXCJjb21tZW50c1wiLCBcInN1Ym1pdHRlZFwiLCBcImNvbW1hbmRzXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6cHJvZmlsZTpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpwcm9maWxlXCIsXG4gICAgW1xuICAgICAgYGF1dGhvciAke2F1dGhvcklkfWAsXG4gICAgICBgdHlwZSAke3R5cGV9YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC91c2VyLyR7YXV0aG9ySWR9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBRdWVyeS51c2VyTWV0YShzY29wZSwgbWF0Y2guYXV0aG9ySWQpLnRoZW4obWV0YSA9PlxuICAgIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oUi5waXBlKFxuICAgICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSxcbiAgICAgIFIubWVyZ2VMZWZ0KHtcbiAgICAgICAgcHJvZmlsZUlkOiBtYXRjaC5hdXRob3JJZCxcbiAgICAgICAgZGlzcGxheU5hbWU6IFIucHJvcE9yKFwiXCIsIFwiYWxpYXNcIiwgbWV0YSlcbiAgICAgIH0pXG4gICAgKSlcbikpO1xuXG5leHBvcnQgY29uc3QgUHJvZmlsZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIHRhYnMsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4uL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4uL0xpc3RpbmdPcmFjbGVcIjtcbmltcG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuLi9TcGFjZVNwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL3NwYWNlcy86bmFtZS86c29ydFwiO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGBzb3J0ICR7c29ydH1gKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBTcGFjZVNwZWMuZ2V0U3BlYyhzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGBzb3J0ICR7c29ydH1gKVxuKTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIFNwYWNlU3BlYy5zaWRlYmFyUGFnZU5hbWUobmFtZSkpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiwgb3JpZ2luYWwsIGxhdGVzdCA9IDAgfVxuKSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG5cbiAgY29uc3Qgb3JpZ2luYWxEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEob3JpZ2luYWwpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZElkcywgcmVtb3ZlZElkc10gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihcbiAgICBkaWZmRGF0YSxcbiAgICBvcmlnaW5hbERhdGFcbiAgKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgY29uc3Qgdm90ZUNvdW50c01hdGNoID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG4gIGNvbnN0IHRoaW5nTWF0Y2ggPSBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUubWF0Y2godXBkYXRlZFNvdWwpIHx8IHt9O1xuICBjb25zdCBhdXRob3JNYXRjaCA9IFNjaGVtYS5TRUFBdXRob3Iucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuXG4gIGlmICh2b3RlQ291bnRzTWF0Y2gpIHVwZGF0ZWRJZHMucHVzaCh2b3RlQ291bnRzTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ01hdGNoKSB1cGRhdGVkSWRzLnB1c2godGhpbmdNYXRjaC50aGluZ0lkKTtcbiAgaWYgKHRoaW5nSWQgJiYgdGhpbmdJZCAhPT0gc3BlYy5mcm9tUGFnZUlkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhcbiAgICBvcmMsXG4gICAgcm91dGUsXG4gICAgc2NvcGUsXG4gICAgc3BlYyxcbiAgICB1cGRhdGVkSWRzLFxuICAgIHJlbW92ZWRJZHNcbiAgKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xuICBpZiAoXG4gICAgUi5wcm9wKFwic2l6ZVwiLCBvcmlnaW5hbCkgfHxcbiAgICB1cGRhdGVkSWRzLmxlbmd0aCB8fFxuICAgIHJlbW92ZWRJZHMubGVuZ3RoIHx8XG4gICAgYXV0aG9yTWF0Y2hcbiAgKVxuICAgIHJldHVybjtcblxuICAvLyBiYXNlIGxvZ2ljIGZyb20gZ3VuLWNsZXJpYy1zY29wZSBuZWVkcyB0byBiZSBlbmNhcHN1YWx0ZWQgYmV0dGVyP1xuICBjb25zb2xlLmxvZyhcIi0tLVNUQU5EQVJEIFNQQUNFIFVQREFURS0tLVwiLCByb3V0ZS5zb3VsLCB1cGRhdGVkU291bCk7XG4gIGNvbnN0IG5vZGUgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IGV4aXN0aW5nS2V5cyA9IExpc3RpbmdOb2RlLml0ZW1LZXlzKG5vZGUpO1xuXG4gIGlmIChleGlzdGluZ0tleXMubGVuZ3RoKSB7XG4gICAgcm91dGUud3JpdGUoe1xuICAgICAgc2l6ZTogMCxcbiAgICAgIC4uLmV4aXN0aW5nS2V5cy5yZWR1Y2UoKGRpZmYsIGtleSkgPT4ge1xuICAgICAgICBkaWZmW2Ake2tleX1gXSA9IG51bGw7XG4gICAgICAgIHJldHVybiBkaWZmO1xuICAgICAgfSwge30pXG4gICAgfSk7XG4gIH1cblxuICBvcmMud29yayh7XG4gICAgaWQ6IGB1cGRhdGU6JHtyb3V0ZS5zb3VsfWAsXG4gICAgc291bDogcm91dGUuc291bCxcbiAgICBtZXRob2Q6IFwiZG9VcGRhdGVcIixcbiAgICBwcmlvcml0eTogcm91dGUucHJpb3JpdHkgfHwgNTBcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgU3BhY2VMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTb3VyY2UsXG4gIGdldFNpZGViYXIsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIiwgXCJmaXJlaG9zZVwiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnRvcGljOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IHRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljc1swXSA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IHRvcGljc1swXTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzp0b3BpY1wiLFxuICAgIFtcbiAgICAgIGBuYW1lICR7dG9waWN9YCxcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICB0b3BpYy5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBcImtpbmQgc3VibWlzc2lvblwiIDogXCJcIixcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihcbiAgICBSLnBpcGUoXG4gICAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlLFxuICAgICAgUi5hc3NvYyhcImJhc2VQYXRoXCIsIGAvdC8ke21hdGNoLnRvcGljfWApXG4gICAgKVxuICApXG4pO1xuXG5leHBvcnQgY29uc3QgVG9waWNMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICB0YWJzLFxuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ2hhdExpc3RpbmcgfSBmcm9tIFwiLi9DaGF0TGlzdGluZ1wiO1xuaW1wb3J0IHsgRmlyZWhvc2VMaXN0aW5nIH0gZnJvbSBcIi4vRmlyZWhvc2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBDb21tZW50ZWRMaXN0aW5nIH0gZnJvbSBcIi4vQ29tbWVudGVkTGlzdGluZ1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5pbXBvcnQgeyBEb21haW5MaXN0aW5nIH0gZnJvbSBcIi4vRG9tYWluTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50TGlzdGluZ1wiO1xuaW1wb3J0IHsgU3BhY2VMaXN0aW5nIH0gZnJvbSBcIi4vU3BhY2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBJbmJveExpc3RpbmcgfSBmcm9tIFwiLi9JbmJveExpc3RpbmdcIjtcbmltcG9ydCB7IFByb2ZpbGVMaXN0aW5nIH0gZnJvbSBcIi4vUHJvZmlsZUxpc3RpbmdcIjtcblxuY29uc3QgdHlwZXMgPSB7XG4gIENoYXRMaXN0aW5nLFxuICBGaXJlaG9zZUxpc3RpbmcsXG4gIFRvcGljTGlzdGluZyxcbiAgRG9tYWluTGlzdGluZyxcbiAgQ29tbWVudExpc3RpbmcsXG4gIFNwYWNlTGlzdGluZyxcbiAgSW5ib3hMaXN0aW5nLFxuICBDb21tZW50ZWRMaXN0aW5nLFxuICBQcm9maWxlTGlzdGluZ1xufTtcblxuY29uc3QgdHlwZXNBcnJheSA9IFIudmFsdWVzKHR5cGVzKTtcblxuY29uc3QgZnJvbVBhdGggPSBwYXRoID0+IHtcbiAgbGV0IG1hdGNoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIG1hdGNoID0gdHlwZXNBcnJheVtpXS5yb3V0ZS5tYXRjaChwYXRoKTtcbiAgICBpZiAobWF0Y2gpIHJldHVybiBSLmFzc29jKFwibWF0Y2hcIiwgbWF0Y2gsIHR5cGVzQXJyYXlbaV0pO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3Qgc2lkZWJhckZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBmcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUgfHwgIXR5cGUuZ2V0U2lkZWJhcikgcmV0dXJuIHJlc29sdmUoXCJcIik7XG4gIHJldHVybiB0eXBlLmdldFNpZGViYXIoc2NvcGUsIHR5cGUubWF0Y2gpO1xufSk7XG5cbmNvbnN0IHNwZWNGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCkgPT4ge1xuICBjb25zdCB0eXBlID0gZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlKSB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGZpbmQgdHlwZSBmb3IgcGF0aDogJHtwYXRofWApO1xuXG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oYmFzZVNwZWMgPT4ge1xuICAgIGxldCBzcGVjID0gYmFzZVNwZWM7XG5cbiAgICBpZiAodHlwZS5tYXRjaC5zb3J0ID09PSBcImRlZmF1bHRcIikge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJwYXRoXCIsIHR5cGUucm91dGUucmV2ZXJzZShSLmFzc29jKFwic29ydFwiLCBzcGVjLnNvcnQsIHR5cGUubWF0Y2gpKSwgc3BlYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwicGF0aFwiLCBwYXRoLCBiYXNlU3BlYyk7XG4gICAgfVxuXG4gICAgaWYgKHNwZWMuc3VibWl0VG9waWMgJiYgIXNwZWMuc3VibWl0UGF0aCkge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJzdWJtaXRQYXRoXCIsIGAvdC8ke3NwZWMuc3VibWl0VG9waWN9L3N1Ym1pdGAsIHNwZWMpO1xuICAgIH1cblxuICAgIHJldHVybiBzcGVjO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1R5cGUgPSB7XG4gIC4uLnR5cGVzLFxuICB0eXBlcyxcbiAgZnJvbVBhdGgsXG4gIHNpZGViYXJGcm9tUGF0aCxcbiAgc3BlY0Zyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5cbmNvbnN0IHNwbGl0RG9tYWlucyA9IFIuY29tcG9zZShcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICBSLm1hcChSLnRyaW0pLFxuICBSLnNwbGl0KFwiK1wiKSxcbiAgUi50b0xvd2VyLFxuICBSLnRyaW0sXG4gIFIuZGVmYXVsdFRvKFwiXCIpXG4pO1xuXG5jb25zdCBzcGxpdFRvcGljcyA9IFIuY29tcG9zZShcbiAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmlkZW50aXR5LCBSLmFsd2F5cyhbXCJhbGxcIl0pKSxcbiAgc3BsaXREb21haW5zXG4pO1xuXG5jb25zdCB3aXRoUm91dGUgPSBvYmogPT4gUi5hc3NvYyhcInJvdXRlXCIsIG5ldyBSb3V0ZShvYmoucGF0aCksIG9iaik7XG5cbmV4cG9ydCBjb25zdCBQYXRoID0geyBzcGxpdERvbWFpbnMsIHNwbGl0VG9waWNzLCB3aXRoUm91dGUgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuY29uc3QgY29uZmlnUGFnZU5hbWUgPSBuYW1lID0+IGBzcGFjZToke25hbWV9YDtcbmNvbnN0IHNpZGViYXJQYWdlTmFtZSA9IG5hbWUgPT4gYHNwYWNlOiR7bmFtZX06c2lkZWJhcmA7XG5cbmNvbnN0IHNvdXJjZVdpdGhEZWZhdWx0cyA9IFIuY3VycnkoKG93bmVySWQsIG5hbWUsIHNvdXJjZSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW3NvdXJjZSB8fCBcIlwiXTtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG5cbiAgaWYgKCF0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJcIikpIHtcbiAgICB0YWJzLm1hcCh0YWIgPT5cbiAgICAgIHJlc3VsdC5wdXNoKGB0YWIgJHt0YWJ9IC91c2VyLyR7b3duZXJJZH0vc3BhY2VzLyR7bmFtZX0vJHt0YWJ9YClcbiAgICApO1xuICB9XG5cbiAgbGV0IGluZGV4ZXIgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJpbmRleGVyXCIpO1xuXG4gIGlmICghaW5kZXhlcikge1xuICAgIHJlc3VsdC5wdXNoKGBpbmRleGVyICR7Q29uZmlnLmluZGV4ZXJ9YCk7XG4gICAgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyO1xuICB9XG5cbiAgbGV0IHRhYnVsYXRvciA9IHRva2VuaXplZC5nZXRWYWx1ZShcInRhYnVsYXRvclwiKTtcblxuICBpZiAoIXRhYnVsYXRvcikgcmVzdWx0LnB1c2goYHRhYnVsYXRvciAke2luZGV4ZXJ9YCk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKFwiXFxuXCIpO1xufSk7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBjb25maWdQYWdlTmFtZShuYW1lKSwgZXh0cmEpLnRoZW4oXG4gICAgc291cmNlV2l0aERlZmF1bHRzKGF1dGhvcklkLCBuYW1lKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpID0+XG4gIGdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKS50aGVuKHNvdXJjZSA9PlxuICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2Uoc291cmNlLCBhdXRob3JJZCwgbmFtZSlcbiAgKVxuKTtcblxuY29uc3Qgbm9kZVRvU3BhY2VOYW1lcyA9IFIuY29tcG9zZShcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIubWFwKFIucmVwbGFjZSgvXnNwYWNlOi8sIFwiXCIpKSxcbiAgUi5maWx0ZXIoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5wcm9wKFwibGVuZ3RoXCIpLFxuICAgICAgUi5tYXRjaCgvXnNwYWNlOlteOl0qJC8pXG4gICAgKVxuICApLFxuICBSLmtleXNcbik7XG5cbmNvbnN0IHVzZXJTcGFjZU5hbWVzID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCkgPT5cbiAgUXVlcnkudXNlclBhZ2VzKHNjb3BlLCBhdXRob3JJZCkudGhlbihub2RlVG9TcGFjZU5hbWVzKVxuKTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlU3BlYyA9IHtcbiAgY29uZmlnUGFnZU5hbWUsXG4gIHNpZGViYXJQYWdlTmFtZSxcbiAgbm9kZVRvU3BhY2VOYW1lcyxcbiAgdXNlclNwYWNlTmFtZXMsXG4gIHRhYnMsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufTtcbiIsImltcG9ydCB7IExpc3RpbmdRdWVyeSB9IGZyb20gXCIuL0xpc3RpbmdRdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5leHBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5leHBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5leHBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuZXhwb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuZXhwb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuL0xpc3RpbmdPcmFjbGVcIjtcbmV4cG9ydCB7IExpc3RpbmdRdWVyeSB9IGZyb20gXCIuL0xpc3RpbmdRdWVyeVwiO1xuZXhwb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuZXhwb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuZXhwb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuZXhwb3J0IHsgU3BhY2VTcGVjIH0gZnJvbSBcIi4vU3BhY2VTcGVjXCI7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nID0ge1xuICAuLi5MaXN0aW5nVHlwZS50eXBlcyxcbiAgTGlzdGluZ05vZGUsXG4gIExpc3RpbmdTcGVjLFxuICBpc1ZhbGlkU29ydDogTGlzdGluZ1NvcnQuaXNWYWxpZFNvcnQsXG4gIGlkc1RvU291bHM6IExpc3RpbmdOb2RlLmlkc1RvU291bHMsXG4gIGdldDogTGlzdGluZ05vZGUuZ2V0LFxuICBmcm9tU3BlYzogTGlzdGluZ1F1ZXJ5LmZyb21TcGVjLFxuICBmcm9tUGF0aDogTGlzdGluZ1F1ZXJ5LmZyb21QYXRoLFxuICB0eXBlRnJvbVBhdGg6IExpc3RpbmdUeXBlLmZyb21QYXRoLFxuICBzaWRlYmFyRnJvbVBhdGg6IExpc3RpbmdUeXBlLnNpZGViYXJGcm9tUGF0aCxcbiAgc3BlY0Zyb21QYXRoOiBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgsXG4gIG5vZGVGcm9tUGF0aDogTGlzdGluZ1F1ZXJ5Lm5vZGVGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZywgTGlzdGluZ1NwZWMsIExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1wiO1xuXG5jb25zdCB3aWtpUGFnZSA9IFIubWVyZ2VMZWZ0KHtcbiAgd2l0aE1hdGNoOiAoeyBwYXJhbXM6IHsgYXV0aG9ySWQgPSBDb25maWcub3duZXIsIG5hbWUgfSB9KSA9PiAoe1xuICAgIHByZWxvYWQ6IHNjb3BlID0+IFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSlcbiAgfSlcbn0pO1xuXG5jb25zdCB3aXRoTGlzdGluZ01hdGNoID0gKHBhdGgsIHBhcmFtcykgPT4ge1xuICBpZiAoIXBhdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJlbG9hZDogcXVlcnkoUi5hbHdheXMocmVzb2x2ZSh7fSkpKSxcbiAgICAgIHNpZGViYXI6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoXCJcIikpKSxcbiAgICAgIHNwYWNlOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UoXCJcIikpKSksXG4gICAgICBpZHM6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoW10pKSlcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgcmVhbFF1ZXJ5ID0gcXVlcnkoXG4gICAgKHNjb3BlLCBvcHRzID0ge30pID0+IExpc3RpbmcuZnJvbVBhdGgoc2NvcGUsIHBhdGgsIG9wdHMpLFxuICAgIGBpZHM6JHtwYXRofWBcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIHByZWxvYWQ6IHNjb3BlID0+IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBwYXRoLCBwYXJhbXMpLFxuICAgIHNpZGViYXI6IHF1ZXJ5KFxuICAgICAgc2NvcGUgPT4gTGlzdGluZy5zaWRlYmFyRnJvbVBhdGgoc2NvcGUsIHBhdGgpLFxuICAgICAgYHNpZGViYXI6JHtwYXRofWBcbiAgICApLFxuICAgIHNwYWNlOiBxdWVyeShzY29wZSA9PiBMaXN0aW5nLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCkpLFxuICAgIGlkczogcXVlcnkoKHNjb3BlLCBvcHRzID0ge30pID0+XG4gICAgICByZWFsUXVlcnkoc2NvcGUsIFIubWVyZ2VMZWZ0KG9wdHMsIHBhcmFtcykpXG4gICAgKVxuICB9O1xufTtcblxuY29uc3QgcHJlbG9hZExpc3RpbmcgPSBhc3luYyAoc2NvcGUsIHBhdGgsIHBhcmFtcykgPT4ge1xuICBjb25zdCBtYXRjaCA9IHdpdGhMaXN0aW5nTWF0Y2gocGF0aCwgcGFyYW1zKTtcbiAgbGV0IFtzcGVjLCBpZHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIG1hdGNoLnNwYWNlKHNjb3BlKSxcbiAgICBtYXRjaC5pZHMoc2NvcGUsIHt9KSxcbiAgICBtYXRjaC5zaWRlYmFyKHNjb3BlKVxuICBdKTtcblxuICBpZiAoIXNwZWMpIHNwZWMgPSBMaXN0aW5nU3BlYy5mcm9tU291cmNlKFwiXCIpO1xuXG4gIGNvbnN0IHRoaW5nU291bHMgPSBMaXN0aW5nLmlkc1RvU291bHMoaWRzKTtcbiAgY29uc3QgW3RoaW5nc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgUXVlcnkubXVsdGlUaGluZ01ldGEoc2NvcGUsIHtcbiAgICAgIHRoaW5nU291bHMsXG4gICAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsXG4gICAgICBzY29yZXM6IHRydWUsXG4gICAgICBkYXRhOiB0cnVlXG4gICAgfSksXG4gICAgLi4uUi5tYXAoXG4gICAgICBpZCA9PiBRdWVyeS51c2VyTWV0YShzY29wZSwgaWQpLFxuICAgICAgUi51bmlxKFtzcGVjICYmIHNwZWMuaW5kZXhlciwgc3BlYyAmJiBzcGVjLm93bmVyLCBzcGVjICYmIHNwZWMudGFidWxhdG9yXSlcbiAgICApXG4gIF0pO1xuICBjb25zdCBvcElkcyA9IFIuY29tcG9zZShcbiAgICBSLndpdGhvdXQoaWRzKSxcbiAgICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgICBSLnVuaXEsXG4gICAgUi5tYXAoUi5wYXRoT3IobnVsbCwgW1wiZGF0YVwiLCBcIm9wSWRcIl0pKVxuICApKHRoaW5ncyk7XG5cbiAgaWYgKG9wSWRzLmxlbmd0aCkge1xuICAgIGNvbnN0IG9wU291bHMgPSBMaXN0aW5nLmlkc1RvU291bHMob3BJZHMpO1xuXG4gICAgYXdhaXQgUXVlcnkubXVsdGlUaGluZ01ldGEoc2NvcGUsIHtcbiAgICAgIHRoaW5nU291bHM6IG9wU291bHMsXG4gICAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsXG4gICAgICBkYXRhOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBpZiAoc3BlYy5jaGF0VG9waWMpIHtcbiAgICBjb25zdCBjaGF0UGF0aCA9IGAvdC8ke3NwZWMuY2hhdFRvcGljfS9jaGF0YDtcblxuICAgIGlmIChjaGF0UGF0aCAhPT0gcGF0aClcbiAgICAgIGF3YWl0IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBgL3QvJHtzcGVjLmNoYXRUb3BpY30vY2hhdGAsIHt9KTtcbiAgfVxuXG4gIHJldHVybiBzY29wZS5nZXRDYWNoZSgpO1xufTtcblxuY29uc3QgbGlzdGluZyA9ICh7XG4gIHByZWZpeDogZGVmYXVsdFByZWZpeCA9IFwidFwiLFxuICBpZGVudGlmaWVyOiBkZWZhdWx0SWRlbnRpZmllciA9IFwiYWxsXCIsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJob3RcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PiB3aXRoTGlzdGluZ01hdGNoKGAvJHtwcmVmaXh9LyR7aWRlbnRpZmllcn0vJHtzb3J0fWAsIHF1ZXJ5KVxufSk7XG5cbmNvbnN0IHRoaW5nQ29tbWVudHMgPSAoe1xuICBwcmVmaXg6IGRlZmF1bHRQcmVmaXggPSBcInRcIixcbiAgaWRlbnRpZmllcjogZGVmYXVsdElkZW50aWZpZXIgPSBcImFsbFwiLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiYmVzdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5Db21tZW50TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogb3BJZCxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBSLmFzc29jKFwibGltaXRcIiwgMTAwMCwgcXVlcnkpXG4gICAgKVxufSk7XG5cbmNvbnN0IHNwYWNlTGlzdGluZyA9ICh7XG4gIG5hbWU6IGRlZmF1bHROYW1lID0gXCJkZWZhdWx0XCIsXG4gIGF1dGhvcklkOiBkZWZhdWx0QXV0aG9ySWQsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJkZWZhdWx0XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgYXV0aG9ySWQgPSBkZWZhdWx0QXV0aG9ySWQsXG4gICAgICBuYW1lID0gZGVmYXVsdE5hbWUsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgYXV0aG9ySWQ6IGF1dGhvcklkIHx8IENvbmZpZy5vd25lcixcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5jb25zdCBzcGFjZVRoaW5nQ29tbWVudHMgPSAoe1xuICBuYW1lOiBkZWZhdWx0TmFtZSA9IFwiZGVmYXVsdFwiLFxuICBhdXRob3JJZDogZGVmYXVsdEF1dGhvcklkLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiaG90XCIsXG4gIC4uLnJlc3Rcbn0pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBhdXRob3JJZCA9IGRlZmF1bHRBdXRob3JJZCxcbiAgICAgIG5hbWUgPSBkZWZhdWx0TmFtZSxcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHNwYWNlUGF0aCA9IExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiBhdXRob3JJZCB8fCBDb25maWcub3duZXIsXG4gICAgICBuYW1lLFxuICAgICAgc29ydFxuICAgIH0pO1xuICAgIGNvbnN0IGxpc3RpbmdQYXRoID0gTGlzdGluZ1R5cGUuQ29tbWVudExpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBvcElkLFxuICAgICAgc29ydFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNwYWNlOiBxdWVyeShcbiAgICAgICAgc2NvcGUgPT4gTGlzdGluZy5zcGVjRnJvbVBhdGgoc2NvcGUsIHNwYWNlUGF0aCwgcXVlcnkpLFxuICAgICAgICBgc3BlYzoke3NwYWNlUGF0aH1gXG4gICAgICApLFxuICAgICAgaWRzOiBxdWVyeShcbiAgICAgICAgc2NvcGUgPT4gTGlzdGluZy5mcm9tUGF0aChzY29wZSwgbGlzdGluZ1BhdGgsIHF1ZXJ5KSxcbiAgICAgICAgbGlzdGluZ1BhdGhcbiAgICAgICksXG4gICAgICBwcmVsb2FkOiBzY29wZSA9PiBwcmVsb2FkTGlzdGluZyhzY29wZSwgbGlzdGluZ1BhdGgsIHF1ZXJ5KVxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm9maWxlID0gKHtcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcIm5ld1wiLFxuICB0eXBlOiBkZWZhdWx0VHlwZSA9IFwib3ZlcnZpZXdcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7IGF1dGhvcklkLCB0eXBlID0gZGVmYXVsdFR5cGUsIHNvcnQgPSBkZWZhdWx0U29ydCB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLlByb2ZpbGVMaXN0aW5nLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmNvbnN0IGluYm94ID0gKHtcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcIm5ld1wiLFxuICB0eXBlOiBkZWZhdWx0VHlwZSA9IFwib3ZlcnZpZXdcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgYXV0aG9ySWQsXG4gICAgcGFyYW1zOiB7IHR5cGUgPSBkZWZhdWx0VHlwZSwgc29ydCA9IGRlZmF1bHRTb3J0IH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuSW5ib3hMaXN0aW5nLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmV4cG9ydCBjb25zdCBQYWdlID0ge1xuICB3aXRoTGlzdGluZ01hdGNoLFxuICBwcmVsb2FkTGlzdGluZyxcbiAgd2lraVBhZ2UsXG4gIHRoaW5nQ29tbWVudHMsXG4gIGxpc3RpbmcsXG4gIHNwYWNlTGlzdGluZyxcbiAgc3BhY2VUaGluZ0NvbW1lbnRzLFxuICBwcm9maWxlLFxuICBpbmJveFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi9BdXRoZW50aWNhdGlvblwiO1xuXG5mdW5jdGlvbiBpbml0KEd1biwgY29uZmlnID0ge30pIHtcbiAgY29uc3QgeyBsZWVjaCwgZGlzYWJsZVZhbGlkYXRpb24sIG5vR3VuLCBsb2NhbFN0b3JhZ2UsIHBlcnNpc3QsIC4uLnJlc3QgfSA9XG4gICAgY29uZmlnIHx8IHt9O1xuICBjb25zdCBwZWVyID0geyBjb25maWcgfTtcblxuICBpZiAoIW5vR3VuKSB7XG4gICAgY29uc3QgY2ZnID0geyBsb2NhbFN0b3JhZ2U6ICEhbG9jYWxTdG9yYWdlLCByYWRpc2s6ICEhcGVyc2lzdCwgLi4ucmVzdCB9O1xuXG4gICAgaWYgKHBlcnNpc3QpIGNmZy5sb2NhbFN0b3JhZ2UgPSBmYWxzZTtcbiAgICBpZiAoIWRpc2FibGVWYWxpZGF0aW9uKSBHdW4ub24oXCJvcHRcIiwgVmFsaWRhdGlvbi5ndW5XaXJlSW5wdXQocGVlcikpO1xuICAgIGlmIChjZmcuc3RvcmVGbikgY2ZnLnN0b3JlID0gY2ZnLnN0b3JlRm4oY2ZnKTsgLy8gZm9yIGluZGV4ZWRkYlxuICAgIHBlZXIuZ3VuID0gR3VuKGNmZyk7XG4gICAgaWYgKGNmZy5sb2NhbFN0b3JhZ2UpIHBlZXIuZ3VuLm9uKFwibG9jYWxTdG9yYWdlOmVycm9yXCIsIGEgPT4gYS5yZXRyeSh7fSkpO1xuICAgIGlmIChsZWVjaCkge1xuICAgICAgY29uc3Qgc2VuZExlZWNoID0gKCkgPT4gcGVlci5ndW4uXy5vbihcIm91dFwiLCB7IGxlZWNoOiB0cnVlIH0pO1xuXG4gICAgICBzZW5kTGVlY2goKTtcbiAgICB9XG4gIH1cblxuICBwZWVyLm5ld1Njb3BlID0gb3B0cyA9PiBRdWVyeS5jcmVhdGVTY29wZShwZWVyLCBvcHRzKTtcbiAgcGVlci5vbkxvZ2luID0gQXV0aGVudGljYXRpb24ub25Mb2dpbihwZWVyKTtcbiAgcGVlci5zaWdudXAgPSBBdXRoZW50aWNhdGlvbi5zaWdudXAocGVlcik7XG4gIHBlZXIubG9naW4gPSBBdXRoZW50aWNhdGlvbi5sb2dpbihwZWVyKTtcbiAgcGVlci5sb2dvdXQgPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5sb2dvdXQocGVlcik7XG4gIHBlZXIuaXNMb2dnZWRJbiA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4ocGVlcik7XG4gIHBlZXIuc3VibWl0ID0gVGhpbmcuc3VibWl0KHBlZXIpO1xuICBwZWVyLmNvbW1lbnQgPSBUaGluZy5jb21tZW50KHBlZXIpO1xuICBwZWVyLmNoYXQgPSBUaGluZy5jaGF0KHBlZXIpO1xuICBwZWVyLndyaXRlUGFnZSA9IFRoaW5nLndyaXRlUGFnZShwZWVyKTtcbiAgcGVlci52b3RlID0gVGhpbmcudm90ZShwZWVyKTtcbiAgcGVlci5xdWVyaWVzID0gUXVlcnk7XG4gIHJldHVybiBwZWVyO1xufVxuXG5leHBvcnQgY29uc3QgUGVlciA9IHtcbiAgaW5pdFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBzY29wZSBhcyBtYWtlU2NvcGUsIHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmcvTGlzdGluZ05vZGVcIjtcblxuY29uc3QgZW1wdHlQcm9taXNlID0gcmVzb2x2ZShudWxsKTtcbmNvbnN0IHVuaW9uQXJyYXlzID0gUi5yZWR1Y2UoUi51bmlvbiwgW10pO1xuXG5jb25zdCB0b3BpY1NvdWxzID0gcGFyYW1zID0+IHtcbiAgY29uc3QgeyB0b3BpY3MgPSBbXCJhbGxcIl0gfSA9IHBhcmFtcyB8fCB7fTtcbiAgY29uc3QgZGF5cyA9IFIucHJvcE9yKDM2NSwgXCJkYXlzXCIsIHBhcmFtcykgfHwgMzY1O1xuICBjb25zdCBkYXlTdHJpbmdzID0gW107XG4gIGNvbnN0IG9uZURheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBvbmVEYXkgKiBwYXJzZUludChkYXlzLCAxMCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZGF5cyArIDE7IGkrKylcbiAgICBkYXlTdHJpbmdzLnB1c2goVGhpbmdTZXQuZGF5U3RyKHN0YXJ0ICsgaSAqIG9uZURheSkpO1xuICByZXR1cm4gT2JqZWN0LmtleXMoXG4gICAgdG9waWNzLnJlZHVjZShcbiAgICAgIChyZXN1bHQsIHRvcGljTmFtZSkgPT5cbiAgICAgICAgZGF5U3RyaW5ncy5yZWR1Y2UoKHJlcywgZHMpID0+IHtcbiAgICAgICAgICByZXNbYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLyR7dG9waWNOYW1lfS9kYXlzLyR7ZHN9YF0gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sIHJlc3VsdCksXG4gICAgICB7fVxuICAgIClcbiAgKTtcbn07XG5cbmNvbnN0IHNpbmdsZVRvcGljID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgdFNvdWxzID0gdG9waWNTb3Vscyh7IC4uLnBhcmFtcywgdG9waWNzOiBbcGFyYW1zLnRvcGljXSB9KTtcbiAgbGV0IHNvdWxzID0gW107XG4gIGxldCBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcblxuICBpZiAocGFyYW1zLnNvcnQgPT09IFwibmV3XCIpIHtcbiAgICBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1zLnNvcnQgPT09IFwidG9wXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgICBpZiAocGFyYW1zLnRvcGljID09PSBcImFsbFwiKSBpdGVtTWF4ID0gaXRlbU1heCAqIDM7XG4gIH1cblxuICBjb25zdCBmZXRjaE1vcmUgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9waWNTb3VsID0gdFNvdWxzLnBvcCgpO1xuXG4gICAgaWYgKHNvdWxzLmxlbmd0aCA+IGl0ZW1NYXggfHwgIXRvcGljU291bCkgcmV0dXJuIHJlc29sdmUoc291bHMpO1xuICAgIHJldHVybiBzY29wZVxuICAgICAgLmdldCh0b3BpY1NvdWwpXG4gICAgICAuc291bHMoKVxuICAgICAgLnRoZW4obW9yZSA9PiB7XG4gICAgICAgIHNvdWxzID0gWy4uLnNvdWxzLCAuLi5tb3JlXTtcbiAgICAgICAgcmV0dXJuIGZldGNoTW9yZSgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZldGNoTW9yZSgpO1xufSk7XG5cbmNvbnN0IHNpbmdsZURvbWFpbiA9IHF1ZXJ5KChzY29wZSwgeyBkb21haW4gfSkgPT5cbiAgc2NvcGUuZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWU6IGRvbWFpbiB9KSkuc291bHMoKVxuKTtcblxuY29uc3Qgc2luZ2xlQXV0aG9yID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIGFsbChbXG4gICAgcGFyYW1zLnR5cGUgJiYgcGFyYW1zLnR5cGUgIT09IFwic3VibWl0dGVkXCIgJiYgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIlxuICAgICAgPyByZXNvbHZlKFtdKVxuICAgICAgOiBzY29wZVxuICAgICAgICAgIC5nZXQoYH4ke3BhcmFtcy5hdXRob3JJZH1gKVxuICAgICAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgICAgIC5zb3VscygpLFxuICAgIHBhcmFtcy50eXBlICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwiY29tbWVudHNcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcIm92ZXJ2aWV3XCIgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tYW5kc1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChgfiR7cGFyYW1zLmF1dGhvcklkfWApXG4gICAgICAgICAgLmdldChcImNvbW1lbnRzXCIpXG4gICAgICAgICAgLnNvdWxzKClcbiAgXSkudGhlbigoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pID0+IHVuaW9uQXJyYXlzKFtzdWJtaXNzaW9ucywgY29tbWVudHNdKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdJZHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3VsKSA9PiBzY29wZS5nZXQoc291bCkudGhlbihMaXN0aW5nTm9kZS5zb3J0ZWRJZHMpLFxuICBcImxpc3RpbmdJZHNcIlxuKTtcblxuY29uc3Qgc2luZ2xlTGlzdGluZyA9IHF1ZXJ5KChzY29wZSwgeyBsaXN0aW5nLCBzb3J0LCBpbmRleGVyIH0pID0+XG4gIGxpc3RpbmdJZHMoc2NvcGUsIGAke0NvbnN0YW50cy5QUkVGSVh9JHtsaXN0aW5nfS8ke3NvcnR9QH4ke2luZGV4ZXJ9LmApLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLFxuICAgICAgUi5maWx0ZXIoUi5pZGVudGl0eSlcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHJlcGxpZXNUb0F1dGhvciA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgcmVwbGllc1RvQXV0aG9ySWQsIHR5cGUgPSBcIm92ZXJ2aWV3XCIsIC4uLnBhcmFtcyB9KSA9PlxuICAgIHNpbmdsZUxpc3Rpbmcoc2NvcGUsIHtcbiAgICAgIGxpc3Rpbmc6IGAvdXNlci8ke3JlcGxpZXNUb0F1dGhvcklkfS8ke3R5cGV9YCxcbiAgICAgIHNvcnQ6IFwibmV3XCIsXG4gICAgICAuLi5wYXJhbXNcbiAgICB9KS50aGVuKGF1dGhvcmVkU291bHMgPT5cbiAgICAgIGFsbChcbiAgICAgICAgYXV0aG9yZWRTb3Vscy5tYXAoYXV0aG9yZWRTb3VsID0+XG4gICAgICAgICAgc2NvcGUuZ2V0KGAke2F1dGhvcmVkU291bH0vY29tbWVudHNgKS5zb3VscygpXG4gICAgICAgIClcbiAgICAgICkudGhlbih1bmlvbkFycmF5cylcbiAgICApXG4pO1xuXG5jb25zdCBzaW5nbGVTdWJtaXNzaW9uID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIHNjb3BlXG4gICAgLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBwYXJhbXMuc3VibWlzc2lvbklkIH0pXG4gICAgKVxuICAgIC5zb3VscyhcbiAgICAgIFIucHJlcGVuZChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSkpXG4gICAgKVxuKTtcblxuY29uc3QgdGhpbmcgPSBxdWVyeSgoc2NvcGUsIHRoaW5nU291bCkgPT5cbiAgc2NvcGUuZ2V0KHRoaW5nU291bCkudGhlbihtZXRhID0+IHtcbiAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgaWQ6IG1ldGEuaWQsIHRpbWVzdGFtcDogcGFyc2VGbG9hdChtZXRhLnRpbWVzdGFtcCwgMTApIH07XG4gICAgY29uc3QgcmVwbHlUb1NvdWwgPSBSLnBhdGgoW1wicmVwbHlUb1wiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wU291bCA9IFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wSWQgPSBvcFNvdWwgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gob3BTb3VsKS50aGluZ2lkIDogbnVsbDtcbiAgICBjb25zdCByZXBseVRvSWQgPSByZXBseVRvU291bFxuICAgICAgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gocmVwbHlUb1NvdWwpLnRoaW5naWRcbiAgICAgIDogbnVsbDtcblxuICAgIGlmIChvcElkKSByZXN1bHQub3BJZCA9IG9wSWQ7XG4gICAgaWYgKHJlcGx5VG9JZCkgcmVzdWx0LnJlcGx5VG9JZCA9IHJlcGx5VG9JZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgbXVsdGlRdWVyeSA9IChzaW5nbGVRdWVyeSwgcGx1cmFsLCBzaW5nbGUsIGNvbGxhdGUgPSB1bmlvbkFycmF5cykgPT5cbiAgcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IFIucHJvcChwbHVyYWwsIHBhcmFtcyk7XG5cbiAgICBpZiAoUi5pc05pbChpdGVtcykpIHJldHVybiBlbXB0eVByb21pc2U7XG4gICAgcmV0dXJuIGFsbChcbiAgICAgIFIubWFwKFxuICAgICAgICB2YWwgPT4gc2luZ2xlUXVlcnkoc2NvcGUsIHsgLi4ucGFyYW1zLCBbc2luZ2xlXTogdmFsIH0pLFxuICAgICAgICBSLnByb3BPcihbXSwgcGx1cmFsLCBwYXJhbXMpXG4gICAgICApXG4gICAgKS50aGVuKGNvbGxhdGUpO1xuICB9KTtcblxuY29uc3QgbXVsdGlUb3BpYyA9IG11bHRpUXVlcnkoc2luZ2xlVG9waWMsIFwidG9waWNzXCIsIFwidG9waWNcIik7XG5jb25zdCBtdWx0aURvbWFpbiA9IG11bHRpUXVlcnkoc2luZ2xlRG9tYWluLCBcImRvbWFpbnNcIiwgXCJkb21haW5cIik7XG5jb25zdCBtdWx0aUF1dGhvciA9IG11bHRpUXVlcnkoc2luZ2xlQXV0aG9yLCBcImF1dGhvcklkc1wiLCBcImF1dGhvcklkXCIpO1xuY29uc3QgbXVsdGlTdWJtaXNzaW9uID0gbXVsdGlRdWVyeShcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgXCJzdWJtaXNzaW9uSWRzXCIsXG4gIFwic3VibWlzc2lvbklkXCJcbik7XG5cbmNvbnN0IHRoaW5nRGF0YUZyb21Tb3VscyA9IFIuY3VycnkoKHNjb3BlLCBzb3VscykgPT5cbiAgYWxsKFxuICAgIHNvdWxzXG4gICAgICAuZmlsdGVyKHggPT4gISF4KVxuICAgICAgLm1hcChzb3VsID0+XG4gICAgICAgIHNjb3BlXG4gICAgICAgICAgLmdldChzb3VsKVxuICAgICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgICAgLnRoZW4oeCA9PiB4KVxuICAgICAgKVxuICApKTtcblxuY29uc3QgY3VyYXRlZCA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWRzLCBzdWJtaXNzaW9uT25seSA9IGZhbHNlKSA9PlxuICBhbGwoW1xuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcImNvbW1lbnRzXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KVxuICAgICAgLnRoZW4odGhpbmdEYXRhRnJvbVNvdWxzKHNjb3BlKSlcbiAgICAgIC50aGVuKFxuICAgICAgICBSLmNvbXBvc2UoXG4gICAgICAgICAgUi5tYXAoc3VibWlzc2lvbk9ubHkgPyBSLnByb3AoXCJvcElkXCIpIDogUi5wcm9wKFwicmVwbHlUb0lkXCIpKSxcbiAgICAgICAgICBSLmZpbHRlcihSLnByb3AoXCJyZXBseVRvSWRcIikpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgbXVsdGlBdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGU6IFwic3VibWl0dGVkXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KS50aGVuKFIubWFwKHNvdWwgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpLnRoaW5nSWQpKVxuICBdKS50aGVuKChbaWRzMSwgaWRzMl0pID0+IFIudW5pcShbLi4uaWRzMSwgLi4uaWRzMl0pKVxuKTtcblxuY29uc3QgdGhpbmdTY29yZXMgPSBxdWVyeShcbiAgKHNjb3BlLCB0YWJ1bGF0b3IsIHRoaW5nSWQpID0+XG4gICAgdGFidWxhdG9yICYmIHRoaW5nSWRcbiAgICAgID8gc2NvcGVcbiAgICAgICAgICAuZ2V0KFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQsIHRhYnVsYXRvciB9KSlcbiAgICAgICAgICAudGhlbigpXG4gICAgICA6IHJlc29sdmUoKSxcbiAgXCJ0aGluZ1Njb3Jlc1wiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGEgPSBxdWVyeSgoc2NvcGUsIHRoaW5nSWQpID0+IHtcbiAgcmV0dXJuIHRoaW5nSWRcbiAgICA/IHNjb3BlLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLmdldChcImRhdGFcIilcbiAgICA6IHJlc29sdmUobnVsbCk7XG59LCBcInRoaW5nRGF0YVwiKTtcblxuY29uc3QgdGhpbmdNZXRhID0gcXVlcnkoXG4gIChzY29wZSwgeyB0aGluZ1NvdWwsIHRhYnVsYXRvciwgZGF0YSA9IGZhbHNlLCBzY29yZXMgPSBmYWxzZSB9KSA9PiB7XG4gICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgIGNvbnN0IGlkID0gTGlzdGluZ05vZGUuc291bFRvSWQodGhpbmdTb3VsKTtcblxuICAgIHJldHVybiBhbGwoW1xuICAgICAgdGhpbmcoc2NvcGUsIHRoaW5nU291bCksXG4gICAgICBzY29yZXNcbiAgICAgICAgPyB0aGluZ1Njb3JlcyhzY29wZSwgdGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsIGlkKVxuICAgICAgICA6IHJlc29sdmUoKSxcbiAgICAgIGRhdGEgPyB0aGluZ0RhdGEoc2NvcGUsIGlkKSA6IHJlc29sdmUoKVxuICAgIF0pLnRoZW4oKFttZXRhLCB2b3RlcywgZGF0YV0pID0+IHtcbiAgICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4geyAuLi5tZXRhLCB2b3RlcywgZGF0YSB9O1xuICAgIH0pO1xuICB9XG4pO1xuXG5jb25zdCBtdWx0aVRoaW5nTWV0YSA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBhbGwoXG4gICAgUi5yZWR1Y2UoXG4gICAgICAocHJvbWlzZXMsIHRoaW5nU291bCkgPT4ge1xuICAgICAgICBpZiAoIXRoaW5nU291bCkgcmV0dXJuIHByb21pc2VzO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaW5nTWV0YShzY29wZSwgeyAuLi5wYXJhbXMsIHRoaW5nU291bCB9KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlcztcbiAgICAgIH0sXG4gICAgICBbXSxcbiAgICAgIFIucHJvcE9yKFtdLCBcInRoaW5nU291bHNcIiwgcGFyYW1zKVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgdXNlclBhZ2VzID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQpID0+XG4gICAgc2NvcGUuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpLFxuICBcInVzZXJQYWdlc1wiXG4pO1xuXG5jb25zdCB3aWtpUGFnZUlkID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT4ge1xuICBpZiAoIWF1dGhvcklkIHx8ICFuYW1lKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgcmV0dXJuIHNjb3BlXG4gICAgLmdldChTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkIH0pKVxuICAgIC5nZXQobmFtZSlcbiAgICAuZ2V0KFwiaWRcIik7XG59LCBcIndpa2lQYWdlSWRcIik7XG5cbmNvbnN0IHdpa2lQYWdlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgd2lraVBhZ2VJZChzY29wZSwgYXV0aG9ySWQsIG5hbWUpLnRoZW4oaWQgPT4gaWQgJiYgdGhpbmdEYXRhKHNjb3BlLCBpZCkpXG4pO1xuXG5jb25zdCB1c2VyTWV0YSA9IHF1ZXJ5KChzY29wZSwgaWQpID0+IHtcbiAgaWYgKCFpZCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gIHJldHVybiBzY29wZS5nZXQoYH4ke2lkfWApLnRoZW4obWV0YSA9PiAoe1xuICAgIGFsaWFzOiBSLnByb3AoXCJhbGlhc1wiLCBtZXRhKSxcbiAgICBjcmVhdGVkQXQ6IFIucGF0aChbXCJfXCIsIFwiPlwiLCBcInB1YlwiXSwgbWV0YSlcbiAgfSkpO1xufSwgXCJ1c2VyTWV0YVwiKTtcblxuY29uc3QgY3JlYXRlU2NvcGUgPSBSLmN1cnJ5KChuYWIsIG9wdHMpID0+XG4gIG1ha2VTY29wZShSLmFzc29jKFwiZ3VuXCIsIG5hYi5ndW4sIG9wdHMgfHwge30pKVxuKTtcblxuZXhwb3J0IGNvbnN0IFF1ZXJ5ID0ge1xuICBzaW5nbGVUb3BpYyxcbiAgc2luZ2xlRG9tYWluLFxuICBzaW5nbGVBdXRob3IsXG4gIHNpbmdsZUxpc3RpbmcsXG4gIHJlcGxpZXNUb0F1dGhvcixcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgdGhpbmdNZXRhLFxuICBtdWx0aVRoaW5nTWV0YSxcbiAgbXVsdGlUb3BpYyxcbiAgbXVsdGlEb21haW4sXG4gIG11bHRpQXV0aG9yLFxuICBtdWx0aVN1Ym1pc3Npb24sXG4gIHRoaW5nU2NvcmVzLFxuICB0aGluZ0RhdGEsXG4gIHRoaW5nRGF0YUZyb21Tb3VscyxcbiAgdG9waWNTb3VscyxcbiAgdXNlclBhZ2VzLFxuICB3aWtpUGFnZUlkLFxuICB3aWtpUGFnZSxcbiAgdXNlck1ldGEsXG4gIGNyZWF0ZVNjb3BlLFxuICBjdXJhdGVkXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgLi4uc2VhLkFVVEhfU0NIRU1BLFxuICB0b3BpY05hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRVxuICB9LFxuXG4gIFRvcGljRGF5OiB7XG4gICAgdGl0bGU6IFwiVG9waWMgRGF5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQSBzaW5nbGUgZGF5IG9mIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWUvZGF5cy86eWVhci86bW9udGgvOmRheWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICB5ZWFyOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDIwMTgsIG1heGltdW06IDIxMDAgfSxcbiAgICAgICAgbW9udGg6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMTIgfSxcbiAgICAgICAgZGF5OiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDMxIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCIsIFwieWVhclwiLCBcIm1vbnRoXCIsIFwiZGF5XCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBUb3BpYzoge1xuICAgIHRpdGxlOiBcIlRvcGljXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIGRvbWFpbk5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfRE9NQUlOX1NJWkVcbiAgfSxcblxuICBEb21haW46IHtcbiAgICB0aXRsZTogXCJEb21haW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgZG9tYWluXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWlucy86ZG9tYWluTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbk5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluTmFtZVwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB1cmw6IHsgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1VSTF9TSVpFIH0sXG4gIFVSTDoge1xuICAgIHRpdGxlOiBcIlVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgZm9yIGEgZ2l2ZW4gVVJMXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXJscy9cXCp1cmxgLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVybDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInVybFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aGluZ0lkOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfSEFTSF9TSVpFXG4gIH0sXG5cbiAgdGhpbmdTb3VsOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGhpbmdJZDogeyBcIiNyZWZcIjogXCIjZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdBbGxDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIEFsbCBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBjb21tZW50cyBmb3IgYSBnaXZlbiBzdWJtaXNzaW9uXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2FsbGNvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3QgcmVwbGllcyB0byBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aW1lc3RhbXA6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0sXG4gIHRoaW5nS2luZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0tJTkRfU0laRVxuICB9LFxuXG4gIFRoaW5nOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgUmVmZXJlbmNlXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoZXNlIGFyZSBzdWJtaXNzaW9ucywgY29tbWVudHMsIGNoYXQgbWVzc2FnZXMgYW5kIHdpa2kgcGFnZXNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWRgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IGlkOiBcInRoaW5nSWRcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGtpbmQ6IHsgXCIjcmVmXCI6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9LFxuICAgICAgb3JpZ2luYWxIYXNoOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb25lT2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFFZGdlXCIgfSxcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFTaWduZWRFZGdlXCIgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgdG9waWM6IHtcbiAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbWUgb2xkIHRoaW5ncyBoYWQgZ2VuZXJpYyB0b3BpYyBzb3Vsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgXCIjXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiA0MiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFtcIiNcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL0RvbWFpbkVkZ2VcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9VUkxFZGdlXCIgfSxcbiAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH0sXG4gICAgICBvcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIHJlcGx5VG86IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1NFQUF1dGhvckVkZ2VcIiB9XG4gICAgfSxcblxuICAgIGFueU9mOiBbXG4gICAgICB7XG4gICAgICAgIGFsbE9mOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpbmdIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgICAgIHsgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nOiB0cnVlIH0sXG4gICAgICAgICAgICAgIHsgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaDogdHJ1ZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyBpc0xlZ2FjeVRoaW5nOiB0cnVlIH0sXG4gICAgICB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU2VsZiB2ZXJpZnlpbmcgY2FuIGJlIHVwZGF0ZWQgaW4gaXNvbGF0aW9uXCIsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuXG4gIFByb29mT2ZXb3JrVm90ZXM6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAga2V5c0FyZVByb29mc09mV29yazoge1xuICAgICAgYWxnb3JpdGhtOiBcImFyZ29uMmRcIixcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjb21wbGV4aXR5OiA2LFxuICAgICAgICBoYXNoTGVuZ3RoOiAzMixcbiAgICAgICAgdGltZUNvc3Q6IDEsXG4gICAgICAgIG1lbW9yeUNvc3Q6IDEwMjQwLFxuICAgICAgICBwYXJhbGxlbGlzbTogMVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVzVXA6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXN1cGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdWb3Rlc0Rvd246IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXNkb3duYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ0RhdGE6IHtcbiAgICB0aXRsZTogXCJVbnNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH0sXG4gICAgICBhdXRob3JJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgb3BJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICByZXBseVRvSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdXJsXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfVxuICAgIH0sXG4gICAgdGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gIH0sXG5cbiAgVGhpbmdEYXRhU2lnbmVkOiB7XG4gICAgdGl0bGU6IFwiU2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZywgY3J5cHRvZ3JhcGhpY2FsbHkgc2lnbmVkXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGF+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCIsIFwiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0gfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSB9LFxuICAgICAgYm9keToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9XG4gICAgICB9LFxuICAgICAgYXV0aG9ySWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSB9LFxuICAgICAgb3BJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIHJlcGx5VG9JZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIGRvbWFpbjogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0gfSxcbiAgICAgIHVybDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfSB9LFxuICAgICAgdGltZXN0YW1wOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9IH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3RlQ291bnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgVm90ZSBDb3VudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBZ2dyZWdhdGVkIGNvdW50cyBmcm9tIGEgdGFidWxhdG9yXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVjb3VudHNAfjp0YWJ1bGF0b3IuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgdGFidWxhdG9yOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXA6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBkb3duOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWVudDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIHNjb3JlOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWFuZHM6IHsgc2VhOiB7IHR5cGU6IFtcIm9iamVjdFwiLCBcInN0cmluZ1wiXSB9IH1cbiAgICB9XG4gIH0sXG5cbiAgTGlzdGluZ0RhdGE6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAgdGl0bGU6IFwiTGlzdGluZyBOb2RlIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTaGFyZWQgZGVzY3JpcHRpb24gb2YgbGlzdGluZyBwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBfOiB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICBwYXR0ZXJuUHJvcGVydGllczoge1xuICAgICAgXCJeZCskXCI6IHsgc2VhOiB7IHR5cGU6IFtcInN0cmluZ1wiLCBcIm51bGxcIiwgXCJ1bmRlZmluZWRcIl0gfSB9XG4gICAgfSxcblxuICAgIGRlbGV0ZU5vbk51bWVyaWNLZXlzOiB0cnVlLFxuICAgIGRlbGV0ZU1ldGFGb3JNaXNzaW5nOiB0cnVlXG4gIH0sXG5cbiAgc29ydE5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGVudW06IFtcbiAgICAgIFwibmV3XCIsXG4gICAgICBcIm9sZFwiLFxuICAgICAgXCJhY3RpdmVcIixcbiAgICAgIFwidG9wXCIsXG4gICAgICBcImNvbW1lbnRzXCIsXG4gICAgICBcImRpc2N1c3NlZFwiLFxuICAgICAgXCJob3RcIixcbiAgICAgIFwiYmVzdFwiLFxuICAgICAgXCJjb250cm92ZXJzaWFsXCIsXG4gICAgICBcInJhbmRvbVwiLFxuICAgICAgXCJmaXJlaG9zZVwiLFxuICAgICAgXCJjaGF0XCJcbiAgICBdXG4gIH0sXG5cbiAgVG9waWNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdC86dG9waWMvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICByZXF1aXJlZDogW1widG9waWNcIiwgXCJzb3J0XCIsIFwiaW5kZXhlclwiXSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWM6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbXG4gICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1cbiAgICBdXG4gIH0sXG5cbiAgRG9tYWluTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2RvbWFpbi86ZG9tYWluLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcmVxdWlyZWQ6IFtcImRvbWFpblwiLCBcInNvcnRcIiwgXCJpbmRleGVyXCJdLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkb21haW46IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIHVzZXJMaXN0aW5nVHlwZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1wib3ZlcnZpZXdcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tZW50c1wiLCBcImNvbW1hbmRzXCIsIFwiY29tbWVudGVkXCJdXG4gIH0sXG5cbiAgQXV0aG9yUmVwbGllc0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JQcm9maWxlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBTcGFjZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBuYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvckNvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9ycyBjb21tZW50cyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9jb21tZW50c346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yU3VibWlzc2lvbnM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBTdWJtaXNzaW9uc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyBzdWJtaXNzaW9ucyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9zdWJtaXNzaW9uc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclRoaW5nczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFRoaW5nc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyB0aGluZ3Mgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JQYWdlczoge1xuICAgIHRpdGxlOiBcIkF1dGhvciBQYWdlIE1hcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1hcHBpbmcgb2YgcGFnZSBuYW1lcyB0byB0aGluZ3NcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9wYWdlc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlcyA9IFIua2V5cyhkZWZpbml0aW9ucykucmVkdWNlKChyZXN1bHQsIG5hbWUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IFIucGF0aChbbmFtZSwgXCJzb3VsXCIsIFwicGF0dGVyblwiXSwgZGVmaW5pdGlvbnMpO1xuXG4gIGlmICghcGF0dGVybikgcmV0dXJuIHJlc3VsdDtcbiAgcmV0dXJuIFIuYXNzb2MobmFtZSwgbmV3IFJvdXRlKHBhdHRlcm4pLCByZXN1bHQpO1xufSk7XG5cbmNvbnN0IGRlZnNXaXRoUm91dGVzID0gUi5jb21wb3NlKFxuICBSLnJlZHVjZShcbiAgICAocmVzLCBbbmFtZSwgcm91dGVdKSA9PlxuICAgICAgUi5hc3NvYyhuYW1lLCBSLmFzc29jKFwicm91dGVcIiwgcm91dGUsIFIucHJvcChuYW1lLCBkZWZpbml0aW9ucykpLCByZXMpLFxuICAgIHt9XG4gICksXG4gIFIudG9QYWlyc1xuKShyb3V0ZXMpO1xuXG5leHBvcnQgY29uc3QgU2NoZW1hID0ge1xuICAuLi5kZWZzV2l0aFJvdXRlcyxcbiAgZGVmaW5pdGlvbnMsXG4gIHJvdXRlc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgYWxsIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBDb21tZW50Q29tbWFuZCB9IGZyb20gXCIuL0NvbW1lbnRDb21tYW5kXCI7XG5cbmNvbnN0IHRhYnVsYXRvclF1ZXJ5ID0gcXVlcnkoYXN5bmMgKHNjb3BlLCByb3V0ZSkgPT4ge1xuICBjb25zdCB0aGluZ1NvdWwgPSBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZShyb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IFt1cCwgZG93biwgY29tbWVudCwgcmVwbHlTb3Vsc10gPSBhd2FpdCBhbGwoW1xuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L3ZvdGVzdXBgKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L3ZvdGVzZG93bmApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vYWxsY29tbWVudHNgKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2NvbW1lbnRzYCkuc291bHMoKVxuICBdKTtcbiAgY29uc3QgdGhpbmdEYXRhID0gYXdhaXQgUXVlcnkudGhpbmdEYXRhRnJvbVNvdWxzKHNjb3BlLCByZXBseVNvdWxzKTtcbiAgY29uc3QgY29tbWFuZE1hcCA9IENvbW1lbnRDb21tYW5kLm1hcCh0aGluZ0RhdGEpO1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdXAsXG4gICAgZG93bixcbiAgICBjb21tZW50LFxuICAgIHJlcGxpZXM6IHJlcGx5U291bHMubGVuZ3RoLFxuICAgIHNjb3JlOiB1cCAtIGRvd25cbiAgfTtcblxuICBpZiAoUi5rZXlzKGNvbW1hbmRNYXApLmxlbmd0aCkgcmVzdWx0LmNvbW1hbmRzID0gSlNPTi5zdHJpbmdpZnkoY29tbWFuZE1hcCk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRhYnVsYXRvciA9IHsgcXVlcnk6IHRhYnVsYXRvclF1ZXJ5IH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5cbmV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5cbmNvbnN0IHRvcGljUHJlZml4ZXMgPSB7XG4gIGNoYXRtc2c6IFwiY2hhdDpcIixcbiAgY29tbWVudDogXCJjb21tZW50czpcIlxufTtcblxuY29uc3Qgc291bFRvSWQgPSBSLmNvbXBvc2UoXG4gIFIucHJvcChcInRoaW5nSWRcIiksXG4gIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaC5iaW5kKFNjaGVtYS5UaGluZy5yb3V0ZSlcbik7XG5cbmNvbnN0IHNvdWxzVG9JZHMgPSBSLm1hcChzb3VsVG9JZCk7XG5cbmNvbnN0IGluZGV4ID0gUi5jdXJyeSgocGVlciwgdGhpbmdJZCwgZGF0YSkgPT4ge1xuICBpZiAoIWRhdGEudG9waWMgJiYgIWRhdGEub3BJZCkgcmV0dXJuO1xuXG4gIGlmIChkYXRhLm9wSWQgJiYgIWRhdGEudG9waWMpIHtcbiAgICBwZWVyLmd1blxuICAgICAgLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KSlcbiAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAub24oZnVuY3Rpb24gcmVjdih0ZCkge1xuICAgICAgICBpZiAoIXRkKSByZXR1cm47XG4gICAgICAgIGluZGV4KHBlZXIsIHRoaW5nSWQsIHsgLi4uZGF0YSwgdG9waWM6IHRkLnRvcGljIHx8IFwiYWxsXCIgfSk7XG4gICAgICAgIHRoaXMub2ZmKCk7XG4gICAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0aGluZyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXlTdHIgPSBUaGluZ1NldC5kYXlTdHIoZGF0YS50aW1lc3RhbXApO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXlTdHIuc3BsaXQoXCIvXCIpO1xuICBjb25zdCB0b3BpY1ByZWZpeCA9IHRvcGljUHJlZml4ZXNbZGF0YS5raW5kXSB8fCBcIlwiO1xuICBjb25zdCBiYXNlVG9waWNOYW1lID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3QgdG9waWNOYW1lID0gdG9waWNQcmVmaXggKyBiYXNlVG9waWNOYW1lO1xuICBjb25zdCB0b3BpYyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSB9KSk7XG4gIGNvbnN0IHRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lLCB5ZWFyLCBtb250aCwgZGF5IH0pXG4gICk7XG5cbiAgaWYgKCFkYXRhLnNraXBBbGwgJiYgZGF0YS50b3BpYyAhPT0gXCJhbGxcIikge1xuICAgIGNvbnN0IGFsbG5hbWUgPSBgJHt0b3BpY1ByZWZpeH1hbGxgO1xuICAgIGNvbnN0IGFsbFRvcGljID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IGFsbG5hbWUgfSlcbiAgICApO1xuICAgIGNvbnN0IGFsbFRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljRGF5LnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0b3BpY05hbWU6IGFsbG5hbWUsXG4gICAgICAgIHllYXIsXG4gICAgICAgIG1vbnRoLFxuICAgICAgICBkYXlcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGFsbFRvcGljLnNldCh0aGluZyk7XG4gICAgYWxsVG9waWNEYXkuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIGlmIChkYXRhLmtpbmQgPT09IFwic3VibWlzc2lvblwiKSB7XG4gICAgY29uc3QgdXJsSW5mbyA9IGRhdGEudXJsID8gcGFyc2VVUkkoZGF0YS51cmwpIDoge307XG4gICAgY29uc3QgZG9tYWluTmFtZSA9IChkYXRhLnVybFxuICAgICAgPyAodXJsSW5mby5ob3N0IHx8IHVybEluZm8uc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKVxuICAgICAgOiBgc2VsZi4ke2RhdGEudG9waWN9YFxuICAgICkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBkb21haW4gPSBwZWVyLmd1bi5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZSB9KSk7XG5cbiAgICBkb21haW4uc2V0KHRoaW5nKTtcblxuICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgY29uc3QgdXJsTm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVVJMLnJvdXRlLnJldmVyc2UoeyB1cmw6IGRhdGEudXJsIH0pKTtcblxuICAgICAgLy8gdGhpbmcuZ2V0KFwidXJsXCIpLnB1dCh1cmxOb2RlKTtcbiAgICAgIHVybE5vZGUuc2V0KHRoaW5nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGF0YS5vcElkKSB7XG4gICAgY29uc3QgYWxsY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogZGF0YS5vcElkIH0pXG4gICAgKTtcblxuICAgIGFsbGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkKSB7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgdG9waWMuc2V0KHRoaW5nKTtcbiAgdG9waWNEYXkuc2V0KHRoaW5nKTtcbn0pO1xuXG5jb25zdCBwdXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGRhdGEudGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gb2JqSGFzaChkYXRhKTtcbiAgY29uc3QgeyB0aW1lc3RhbXAsIGtpbmQsIHRvcGljLCBhdXRob3JJZCwgb3BJZCwgcmVwbHlUb0lkIH0gPSBkYXRhO1xuICBjb25zdCB0aGluZ0lkID0gb2JqSGFzaCh7XG4gICAgdGltZXN0YW1wLFxuICAgIGtpbmQsXG4gICAgdG9waWMsXG4gICAgYXV0aG9ySWQsXG4gICAgb3BJZCxcbiAgICByZXBseVRvSWQsXG4gICAgb3JpZ2luYWxIYXNoXG4gIH0pO1xuXG4gIGNvbnN0IG5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF0YVNvdWwgPSBhdXRob3JJZFxuICAgID8gU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCwgYXV0aG9ySWQgfSlcbiAgICA6IFNjaGVtYS5UaGluZ0RhdGEucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9yaWdpbmFsSGFzaCB9KTtcblxuICBjb25zdCBtZXRhRGF0YSA9IHtcbiAgICBpZDogdGhpbmdJZCxcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICBvcmlnaW5hbEhhc2gsXG4gICAgZGF0YTogeyBcIiNcIjogZGF0YVNvdWwgfSxcbiAgICB2b3Rlc3VwOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdWb3Rlc1VwLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgdm90ZXNkb3duOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdWb3Rlc0Rvd24ucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICBhbGxjb21tZW50czogeyBcIiNcIjogU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICBjb21tZW50czogeyBcIiNcIjogU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfVxuICB9O1xuXG4gIGlmICh0b3BpYylcbiAgICBtZXRhRGF0YS50b3BpYyA9IHsgXCIjXCI6IFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiB0b3BpYyB9KSB9O1xuICBpZiAoYXV0aG9ySWQpIG1ldGFEYXRhLmF1dGhvciA9IHsgXCIjXCI6IGB+JHthdXRob3JJZH1gIH07XG4gIGlmIChvcElkKVxuICAgIG1ldGFEYXRhLm9wID0geyBcIiNcIjogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcElkIH0pIH07XG4gIGlmIChyZXBseVRvSWQpXG4gICAgbWV0YURhdGEucmVwbHlUbyA9IHtcbiAgICAgIFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHJlcGx5VG9JZCB9KVxuICAgIH07XG5cbiAgcGVlci5ndW4uZ2V0KGRhdGFTb3VsKS5wdXQoZGF0YSk7XG4gIG5vZGUucHV0KG1ldGFEYXRhKTtcbiAgaW5kZXgocGVlciwgdGhpbmdJZCwgZGF0YSk7XG4gIHJldHVybiBub2RlO1xufSk7XG5cbmNvbnN0IHN1Ym1pdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKGRhdGEuZG9tYWluKSBkYXRhLmRvbWFpbiA9IGRhdGEuZG9tYWluLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIHRpbWVzdGFtcCwga2luZDogXCJzdWJtaXNzaW9uXCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHN1Ym1pc3Npb25zU291bCA9IFNjaGVtYS5BdXRob3JTdWJtaXNzaW9ucy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcbiAgICBjb25zdCBzdWJtaXNzaW9ucyA9IHBlZXIuZ3VuLmdldChzdWJtaXNzaW9uc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAucHV0KHN1Ym1pc3Npb25zKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgICBzdWJtaXNzaW9ucy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IGNvbW1lbnQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwga2luZDogXCJjb21tZW50XCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IGNvbW1lbnRzU291bCA9IFNjaGVtYS5BdXRob3JDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcbiAgICBjb25zdCBjb21tZW50cyA9IHBlZXIuZ3VuLmdldChjb21tZW50c1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcImNvbW1lbnRzXCIpXG4gICAgICAucHV0KGNvbW1lbnRzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgICBjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IGNoYXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwga2luZDogXCJjaGF0bXNnXCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3Qgd3JpdGVQYWdlID0gUi5jdXJyeSgocGVlciwgbmFtZSwgYm9keSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKCF1c2VyKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJub3QgbG9nZ2VkIGluXCIpO1xuICBsZXQgdGhpbmc7XG4gIGNvbnN0IHBhZ2VzU291bCA9IFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQ6IHVzZXIucHViIH0pO1xuICBjb25zdCBjaGFpbiA9IHBlZXIuZ3VuLmdldChwYWdlc1NvdWwpLmdldChuYW1lKTtcblxuICByZXR1cm4gY2hhaW4udGhlbihyZXMgPT4ge1xuICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcbiAgICAgIGNoYWluXG4gICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgIC5nZXQoXCJib2R5XCIpXG4gICAgICAgIC5wdXQoYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGJvZHksXG4gICAgICAgIHRpdGxlOiBuYW1lLFxuICAgICAgICBraW5kOiBcIndpa2lwYWdlXCIsXG4gICAgICAgIGF1dGhvcjogdXNlci5hbGlhcyxcbiAgICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgICB9O1xuXG4gICAgICB0aGluZyA9IHB1dChwZWVyLCBkYXRhKTtcbiAgICAgIGNoYWluLnB1dCh0aGluZyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5jb25zdCB2b3RlID0gUi5jdXJyeSgocGVlciwgaWQsIGtpbmQsIG5vbmNlKSA9PiB7XG4gIGNvbnN0IHZvdGVzID0gcGVlci5ndW4uZ2V0KFxuICAgIFNjaGVtYVtraW5kID09PSBcInVwXCIgPyBcIlRoaW5nVm90ZXNVcFwiIDogXCJUaGluZ1ZvdGVzRG93blwiXS5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIHRoaW5nSWQ6IGlkXG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4gdm90ZXMuZ2V0KG5vbmNlKS5wdXQoXCIxXCIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBUaGluZyA9IHtcbiAgc291bFRvSWQsXG4gIHNvdWxzVG9JZHMsXG4gIHB1dCxcbiAgc3VibWl0LFxuICBjb21tZW50LFxuICBjaGF0LFxuICB3cml0ZVBhZ2UsXG4gIHZvdGUsXG4gIGluZGV4XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVVJJIH0gZnJvbSBcInVyaS1qc1wiO1xuXG5jb25zdCBib2R5ID0gUi5wcm9wT3IoXCJcIiwgXCJib2R5XCIpO1xuY29uc3QgdXJsID0gUi5wcm9wT3IoXCJcIiwgXCJ1cmxcIik7XG5jb25zdCBkb21haW4gPSBSLmNvbXBvc2UoXG4gIHVybFN0ciA9PiB7XG4gICAgaWYgKCF1cmxTdHIpIHJldHVybiBcIlwiO1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlVVJJKHVybFN0cik7XG5cbiAgICByZXR1cm4gKHBhcnNlZC5ob3N0IHx8IHBhcnNlZC5zY2hlbWUgfHwgXCJcIikucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpO1xuICB9LFxuICB1cmxcbik7XG5cbmV4cG9ydCBjb25zdCBUaGluZ0RhdGFOb2RlID0geyBib2R5LCBkb21haW4gfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcblxuY29uc3Qgc291bHMgPSBHdW5Ob2RlLmVkZ2VzO1xuY29uc3QgaWRzID0gUi5jb21wb3NlKFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5wcm9wKFwidGhpbmdJZFwiKSxcbiAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaC5iaW5kKFNjaGVtYS5UaGluZy5yb3V0ZSlcbiAgICApXG4gICksXG4gIEd1bk5vZGUuZWRnZXNcbik7XG5cbmNvbnN0IHVuaW9uID0gUi5jb21wb3NlKFxuICBSLmRpc3NvYyhcIl9cIiksXG4gIFIucmVkdWNlKFIubWVyZ2VSaWdodCwge30pXG4pO1xuXG5mdW5jdGlvbiBkYXlTdHIodGltZXN0YW1wKSB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICBjb25zdCB5ZWFyID0gZC5nZXRVVENGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IGQuZ2V0VVRDTW9udGgoKSArIDE7XG4gIGNvbnN0IGRheU51bSA9IGQuZ2V0VVRDRGF0ZSgpO1xuXG4gIHJldHVybiBgJHt5ZWFyfS8ke21vbnRofS8ke2RheU51bX1gO1xufVxuXG5leHBvcnQgY29uc3QgVGhpbmdTZXQgPSB7IGlkcywgdW5pb24sIHNvdWxzLCBkYXlTdHIgfTtcbiIsImV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5leHBvcnQgeyBUaGluZyB9IGZyb20gXCIuL1RoaW5nXCI7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCB0b2tlbml6ZSA9IHNvdXJjZSA9PiB7XG4gIGNvbnN0IHRva2VuTWFwID0gKHNvdXJjZSB8fCBcIlwiKS5zcGxpdChcIlxcblwiKS5yZWR1Y2UoKGRlZiwgbGluZSkgPT4ge1xuICAgIGNvbnN0IHRva2VucyA9IGxpbmVcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgIC5tYXAoUi50cmltKVxuICAgICAgLmZpbHRlcih4ID0+IHgpO1xuXG4gICAgaWYgKCF0b2tlbnMubGVuZ3RoKSByZXR1cm4gZGVmO1xuICAgIHJldHVybiBSLmFzc29jUGF0aCh0b2tlbnMsIHt9LCBkZWYpO1xuICB9LCB7fSk7XG5cbiAgY29uc3QgaXNQcmVzZW50ID0gcCA9PiB7XG4gICAgbGV0IGNoZWNrID0gcDtcblxuICAgIGlmICh0eXBlb2YgcCA9PT0gXCJzdHJpbmdcIikgY2hlY2sgPSBwLnNwbGl0KFwiIFwiKTtcbiAgICByZXR1cm4gY2hlY2sgJiYgUi5wYXRoKGNoZWNrLCB0b2tlbk1hcCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0VmFsdWVzID0gcCA9PiBSLmtleXNJbihpc1ByZXNlbnQocCkpO1xuICBjb25zdCBnZXRWYWx1ZSA9IHAgPT4gZ2V0VmFsdWVzKHApWzBdIHx8IG51bGw7XG4gIGNvbnN0IGdldExhc3RWYWx1ZSA9IHAgPT4gZ2V0VmFsdWVzKHApLnBvcCgpIHx8IG51bGw7XG5cbiAgY29uc3QgZ2V0VmFsdWVDaGFpbiA9IHAgPT4ge1xuICAgIGNvbnN0IGtleXMgPSB0eXBlb2YgcCA9PT0gXCJzdHJpbmdcIiA/IHAuc3BsaXQoXCIgXCIpIDogcDtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICBsZXQgbmV4dCA9IHA7XG5cbiAgICB3aGlsZSAobmV4dCkge1xuICAgICAgbmV4dCA9IGdldFZhbHVlKFsuLi5rZXlzLCAuLi52YWx1ZXNdKTtcbiAgICAgIG5leHQgJiYgdmFsdWVzLnB1c2gobmV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICBjb25zdCBnZXRQYWlycyA9IHAgPT4ge1xuICAgIGNvbnN0IGtleXMgPSB0eXBlb2YgcCA9PT0gXCJzdHJpbmdcIiA/IHAuc3BsaXQoXCIgXCIpIDogcDtcblxuICAgIHJldHVybiBnZXRWYWx1ZXMoa2V5cykucmVkdWNlKChwYWlycywga2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWwgPSBnZXRWYWx1ZShbLi4ua2V5cywga2V5XSk7XG5cbiAgICAgIHJldHVybiBbLi4ucGFpcnMsIFtrZXksIHZhbF1dO1xuICAgIH0sIFtdKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNvdXJjZSxcbiAgICBpc1ByZXNlbnQsXG4gICAgZ2V0VmFsdWUsXG4gICAgZ2V0VmFsdWVzLFxuICAgIGdldExhc3RWYWx1ZSxcbiAgICBnZXRWYWx1ZUNoYWluLFxuICAgIGdldFBhaXJzXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgVG9rZW5pemVyID0geyB0b2tlbml6ZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgY3JlYXRlU3VwcHJlc3NvciB9IGZyb20gXCJndW4tc3VwcHJlc3NvclwiO1xuaW1wb3J0ICogYXMgc2VhIGZyb20gXCJndW4tc3VwcHJlc3Nvci1zZWFyXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcblxuY29uc3QgaXNMZWdhY3lUaGluZyA9IChzY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgZGF0YVNvdWwgPSBSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpO1xuICBjb25zdCBuZXdlc3QgPSBSLndpdGhvdXQoXG4gICAgW1wiY29tbWVudHNcIiwgXCJhbGxjb21tZW50c1wiLCBcInZvdGVzdXBcIiwgXCJ2b3Rlc2Rvd25cIl0sXG4gICAgUi5rZXlzKFIucGF0aChbXCJfXCIsIFwiPlwiXSwgZGF0YSkpXG4gIClcbiAgICAubWFwKGtleSA9PiBSLnBhdGgoW1wiX1wiLCBcIj5cIiwga2V5XSwgZGF0YSkpXG4gICAgLnNvcnQoKVxuICAgIC5wb3AoKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKGRhdGFTb3VsKSB8fCB7fTtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gaWQgJiYgaWQgPT09IHRoaW5nSWQgJiYgbmV3ZXN0ICYmIG5ld2VzdCA8IDE1NDMxMDI4MTQ5NDU7XG59O1xuXG5jb25zdCB0aGluZ0hhc2hNYXRjaGVzU291bCA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGlkID0gUi5wcm9wKFwiaWRcIiwgZGF0YSk7XG5cbiAgcmV0dXJuIChcbiAgICBpZCAmJlxuICAgIGlkID09PVxuICAgICAgb2JqSGFzaCh7XG4gICAgICAgIGF1dGhvcklkOiAoUi5wYXRoKFtcImF1dGhvclwiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpLnN1YnN0cigxKSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHRpbWVzdGFtcDogcGFyc2VJbnQoUi5wcm9wKFwidGltZXN0YW1wXCIsIGRhdGEpLCAxMCksXG4gICAgICAgIGtpbmQ6IFIucHJvcChcImtpbmRcIiwgZGF0YSksXG4gICAgICAgIHRvcGljOiBSLnByb3AoXG4gICAgICAgICAgXCJ0b3BpY05hbWVcIixcbiAgICAgICAgICBTY2hlbWEuVG9waWMucm91dGUubWF0Y2goUi5wYXRoKFtcInRvcGljXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9wSWQ6IFIucHJvcChcbiAgICAgICAgICBcInRoaW5nSWRcIixcbiAgICAgICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcIm9wXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIHJlcGx5VG9JZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wicmVwbHlUb1wiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICBvcmlnaW5hbEhhc2g6IFIucHJvcChcIm9yaWdpbmFsSGFzaFwiLCBkYXRhKVxuICAgICAgfSlcbiAgKTtcbn07XG5cbmNvbnN0IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhdXRob3JJZCA9IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2lnbmVkSWQgPSBSLnByb3AoXG4gICAgXCJhdXRob3JJZFwiLFxuICAgIFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUubWF0Y2goUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKSlcbiAgKTtcblxuICByZXR1cm4gYXV0aG9ySWQgJiYgYXV0aG9ySWQgPT09IHNpZ25lZElkO1xufTtcblxuY29uc3QgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaCA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsSGFzaCA9IFIucHJvcChcIm9yaWdpbmFsSGFzaFwiLCBkYXRhKTtcbiAgY29uc3QgaWQgPSBSLnByb3AoXG4gICAgXCJ0aGluZ0lkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gb3JpZ2luYWxIYXNoO1xufTtcblxuY29uc3QgZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlID0gYWp2ID0+IChcbiAgbm9kZVR5cGVOYW1lLFxuICBkYXRhLFxuICBfcFNjaGVtYSxcbiAgX2NQYXRoLFxuICBwYXJlbnREYXRhXG4pID0+IHtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPVxuICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIHBhcmVudERhdGEpIHx8IFwiXCIpIHx8IHt9O1xuICBjb25zdCB7IHRoaW5nSWQ6IHByb3BUaGluZ0lkIH0gPSBTY2hlbWFbbm9kZVR5cGVOYW1lXS5yb3V0ZS5tYXRjaChcbiAgICBSLnByb3AoXCIjXCIsIGRhdGEpIHx8IFwiXCJcbiAgKTtcblxuICBpZiAoIXRoaW5nSWQgfHwgdGhpbmdJZCAhPT0gcHJvcFRoaW5nSWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGFqdi5jb21waWxlKHsgJHJlZjogYHNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy8ke25vZGVUeXBlTmFtZX1FZGdlYCB9KShcbiAgICBkYXRhXG4gICk7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFIYXNoTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHsgXywgLi4ucmVjb3JkIH0gPSBkYXRhIHx8IHt9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgcmVjb3JkLnRpbWVzdGFtcCA9IHBhcnNlRmxvYXQocmVjb3JkLnRpbWVzdGFtcCwgMTApO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpIHx8IHt9O1xuXG4gIHJldHVybiB0aGluZ0lkICYmIHRoaW5nSWQgPT09IG9iakhhc2gocmVjb3JkKTtcbn07XG5cbmNvbnN0IGlzVm90ZVZhbGlkID0gKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpID0+IHtcbiAgY29uc3QgeyBhbGdvcml0aG0gPSBcImFyZ29uMmRcIiwgY29uZmlnID0ge30gfSA9IHNjaGVtYSB8fCB7fTtcblxuICBjb25zdCBub25jZSA9IEJ1ZmZlci5oYXNPd25Qcm9wZXJ0eShcImZyb21cIilcbiAgICA/IEJ1ZmZlci5mcm9tKHZvdGUsIFwiaGV4XCIpXG4gICAgOiBuZXcgQnVmZmVyKHZvdGUsIFwiaGV4XCIpO1xuICBjb25zdCBzYWx0ID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20obm9uY2UsIFwiaGV4XCIpXG4gICAgOiBuZXcgQnVmZmVyKG5vbmNlLCBcImhleFwiKTtcbiAgY29uc3QgaGFzaCA9IGFyZ29uMi5oYXNoKHByZWZpeCwge1xuICAgIHNhbHQsXG4gICAgaGFzaExlbmd0aDogY29uZmlnLmhhc2hMZW5ndGgsXG4gICAgdGltZUNvc3Q6IGNvbmZpZy50aW1lQ29zdCxcbiAgICBtZW1vcnlDb3N0OiBjb25maWcubWVtb3J5Q29zdCxcbiAgICBwYXJhbGxlbGlzbTogY29uZmlnLnBhcmFsbGVsaXNtLFxuICAgIHJhdzogdHJ1ZSxcbiAgICB0eXBlOiBhcmdvbjJbYWxnb3JpdGhtXVxuICB9KTtcbiAgbGV0IG9mZiA9IDA7XG4gIGxldCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPD0gY29uZmlnLmNvbXBsZXhpdHkgLSA4OyBpICs9IDgsIG9mZisrKSB7XG4gICAgaWYgKGhhc2hbb2ZmXSAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IG1hc2sgPSAweGZmIDw8ICg4ICsgaSAtIGNvbmZpZy5jb21wbGV4aXR5KTtcblxuICByZXR1cm4gKGhhc2hbb2ZmXSAmIG1hc2spID09PSAwO1xufTtcblxuY29uc3Qga2V5c0FyZVByb29mc09mV29yayA9IChzY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgYXJnb24yID0gcmVxdWlyZShcImFyZ29uMlwiKTtcblxuICBpZiAoIWFyZ29uMikgcmV0dXJuIHRydWU7IC8vIGluIGJyb3dzZXIgZG9uJ3QgYm90aGVyIGZvciBub3dcbiAgY29uc3QgeyBhbGdvcml0aG0gPSBcImFyZ29uMmRcIiB9ID0gc2NoZW1hIHx8IHt9O1xuICBjb25zdCBwcmVmaXggPSBSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpO1xuXG4gIGlmIChhbGdvcml0aG0gIT09IFwiYXJnb24yZFwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBhcmdvbjIgc3VwcG9ydGVkIGZvciB2b3RlIGhhc2hlc1wiKTtcbiAgfVxuXG4gIFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpLmZvckVhY2godm90ZSA9PiB7XG4gICAgaWYgKCFpc1ZvdGVWYWxpZChhcmdvbjIsIHNjaGVtYSwgcHJlZml4LCB2b3RlKSkge1xuICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHZvdGVcIiwgcHJlZml4LCB2b3RlKTtcbiAgICAgIGRlbGV0ZSBkYXRhW3ZvdGVdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgZGVsZXRlTm9uTnVtZXJpY0tleXMgPSAoXG4gIHNjaGVtYSxcbiAgZGF0YSxcbiAgcFNjaGVtYSxcbiAgY1BhdGgsXG4gIHBhcmVudERhdGEsXG4gIGtleUluUGFyZW50XG4pID0+IHtcbiAgY29uc3Qga2V5cyA9IFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpO1xuICBjb25zdCBtZXRhID0gUi5wYXRoT3Ioe30sIFtcIl9cIiwgXCI+XCJdLCBkYXRhKTtcblxuICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICBjb25zdCB2YWwgPSBwYXJzZUludChrZXksIDEwKTtcblxuICAgIGlmICghdmFsICYmIHZhbCAhPT0gMCkge1xuICAgICAgZGVsZXRlIG1ldGFba2V5XTtcbiAgICAgIGRlbGV0ZSBkYXRhW2tleV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBkZWxldGVNZXRhRm9yTWlzc2luZyA9IChcbiAgc2NoZW1hLFxuICBkYXRhLFxuICBwU2NoZW1hLFxuICBjUGF0aCxcbiAgcGFyZW50RGF0YSxcbiAga2V5SW5QYXJlbnRcbikgPT4ge1xuICBjb25zdCBrZXlzID0gUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSk7XG4gIGNvbnN0IG1ldGEgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0sIGRhdGEpO1xuICBjb25zdCBtZXRhS2V5cyA9IFIua2V5cyhtZXRhKTtcbiAgY29uc3QgbWlzc2luZyA9IFIuZGlmZmVyZW5jZShtZXRhS2V5cywga2V5cyk7XG5cbiAgaWYgKG1pc3NpbmcubGVuZ3RoKSBkYXRhW1wiX1wiXVtcIj5cIl0gPSBSLm9taXQobWlzc2luZywgbWV0YSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgaW5pdEFqdiA9IFIuY29tcG9zZShcbiAgYWp2ID0+IHtcbiAgICBhanYuYWRkS2V5d29yZChcImlzTGVnYWN5VGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IGlzTGVnYWN5VGhpbmdcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0hhc2hNYXRjaGVzU291bFxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBzaWduZWRUaGluZ0RhdGFNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ1JlbGF0ZWRFZGdlXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UoYWp2KVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFIYXNoTWF0Y2hlc1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwia2V5c0FyZVByb29mc09mV29ya1wiLCB7XG4gICAgICB2YWxpZGF0ZToga2V5c0FyZVByb29mc09mV29yayxcbiAgICAgIG1vZGlmeWluZzogdHJ1ZVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiZGVsZXRlTm9uTnVtZXJpY0tleXNcIiwge1xuICAgICAgdmFsaWRhdGU6IGRlbGV0ZU5vbk51bWVyaWNLZXlzLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJkZWxldGVNZXRhRm9yTWlzc2luZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogZGVsZXRlTWV0YUZvck1pc3NpbmcsXG4gICAgICBtb2RpZnlpbmc6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gYWp2O1xuICB9LFxuICBzZWEuaW5pdEFqdlxuKTtcblxuZXhwb3J0IGNvbnN0IHN1cHByZXNzb3IgPSBjcmVhdGVTdXBwcmVzc29yKHtcbiAgZGVmaW5pdGlvbnM6IFNjaGVtYS5kZWZpbml0aW9ucyxcbiAgaW5pdDogUi5jb21wb3NlKFxuICAgIGluaXRBanYsXG4gICAgUi5hbHdheXMoeyByZW1vdmVBZGRpdGlvbmFsOiBmYWxzZSB9KVxuICApXG59KTtcblxuY29uc3QgZ3VuV2lyZUlucHV0ID0gUi5jdXJyeSgocGVlciwgY29udGV4dCkgPT5cbiAgY29udGV4dC5vbihcImluXCIsIGZ1bmN0aW9uIHdpcmVJbnB1dChtc2cpIHtcbiAgICBjb25zdCBfID0gbXNnW1wiX1wiXTtcblxuICAgIGRlbGV0ZSBtc2dbXCJfXCJdO1xuICAgIGlmIChcInBpbmdcIiBpbiBtc2cgfHwgXCJsZWVjaFwiIGluIG1zZykgcmV0dXJuO1xuICAgIGlmIChtc2cucHV0ICYmICFSLmtleXMobXNnLnB1dCkubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcHJvbWlzZSA9IHBlZXIuY29uZmlnLmRpc2FibGVWYWxpZGF0aW9uXG4gICAgICA/IFByb21pc2UucmVzb2x2ZShtc2cpXG4gICAgICA6IHN1cHByZXNzb3IudmFsaWRhdGUobXNnKTtcblxuICAgIHByb21pc2VcbiAgICAgIC50aGVuKHZhbGlkYXRlZCA9PiB7XG4gICAgICAgIGlmICghdmFsaWRhdGVkKSByZXR1cm4gY29uc29sZS5sb2coXCJtc2cgZGlkbid0IHZhbGlkYXRlXCIsIG1zZyk7XG4gICAgICAgIG1zZ1tcIl9cIl0gPSBfO1xuICAgICAgICByZXR1cm4gdGhpcy50by5uZXh0KG1zZyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKFwidmFsaWRhdGUgZXJyXCIsIG1zZywgZXJyLnN0YWNrIHx8IGVycikpO1xuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IFZhbGlkYXRpb24gPSB7XG4gIGlzTGVnYWN5VGhpbmcsXG4gIHRoaW5nSGFzaE1hdGNoZXNTb3VsLFxuICBzaWduZWRUaGluZ0RhdGFNYXRjaGVzLFxuICB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoLFxuICBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UsXG4gIHRoaW5nRGF0YUhhc2hNYXRjaGVzLFxuICBpc1ZvdGVWYWxpZCxcbiAga2V5c0FyZVByb29mc09mV29yayxcbiAgaW5pdEFqdixcbiAgc3VwcHJlc3NvcixcbiAgZ3VuV2lyZUlucHV0XG59O1xuIiwiaW1wb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuZXhwb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5leHBvcnQgeyBDb21tZW50Q29tbWFuZCB9IGZyb20gXCIuL0NvbW1lbnRDb21tYW5kXCI7XG5leHBvcnQgeyBMaXN0aW5nLCBMaXN0aW5nT3JhY2xlLCBTcGFjZVNwZWMgfSBmcm9tIFwiLi9MaXN0aW5nXCI7XG5leHBvcnQgeyBQYWdlIH0gZnJvbSBcIi4vUGFnZVwiO1xuZXhwb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmV4cG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuZXhwb3J0IHsgVGhpbmcsIFRoaW5nU2V0LCBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmV4cG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tIFwiLi9WYWxpZGF0aW9uXCI7XG5leHBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuZXhwb3J0IHsgVGFidWxhdG9yIH0gZnJvbSBcIi4vVGFidWxhdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBQZWVyLmluaXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JhbWRhX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JvdXRlX3BhcnNlcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXzsiXSwic291cmNlUm9vdCI6IiJ9