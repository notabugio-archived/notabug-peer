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
        deleteLegacy: true
      },
      source: {
        deleteLegacy: true
      },
      name: {
        deleteLegacy: true
      },
      submitTopic: {
        deleteLegacy: true
      },
      tabs: {
        deleteLegacy: true
      },
      curators: {
        deleteLegacy: true
      },
      censors: {
        deleteLegacy: true
      },
      opId: {
        deleteLegacy: true
      },
      isChat: {
        deleteLegacy: true
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

const deleteLegacy = (schema, data, pSchema, cPath, parentData, keyInParent) => {
  delete parentData[keyInParent];
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
  ajv.addKeyword("deleteLegacy", {
    validate: deleteLegacy
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIklOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkNIQVRfUFJFTE9BRF9JVEVNUyIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwicXVlcnkiLCJtdWx0aVRvcGljIiwiZG9tYWluU291cmNlIiwiZG9tYWlucyIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlZCIsImlkcyIsInRoaW5nSWQiLCJUaGluZyIsInJvdXRlIiwicmV2ZXJzZSIsIm9wU291cmNlIiwic3VibWlzc2lvbklkcyIsIm11bHRpU3VibWlzc2lvbiIsInJlcGxpZXNTb3VyY2UiLCJyZXBsaWVzVG9BdXRob3IiLCJyZXBsaWVzVG9BdXRob3JJZCIsInNvdXJjZXMiLCJsaXN0aW5nIiwicmVwbGllcyIsIm9wIiwiY3VyYXRvciIsImF1dGhvciIsImRvbWFpbiIsInRvcGljIiwic291cmNlTmFtZXMiLCJzb3VyY2VOYW1lIiwiZGVmIiwiZnJvbURlZmluaXRpb24iLCJuYW1lIiwibWVyZ2VMZWZ0IiwiTGlzdGluZ0RhdGFTb3VyY2UiLCJmcm9tU291cmNlIiwic291cmNlIiwib3duZXJJZCIsInNwYWNlTmFtZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsImlzQ2hhdCIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJiYXNlUGF0aCIsInN1Ym1pdFBhdGgiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsImZucyIsImFkZFZvdGVGaWx0ZXIiLCJ0IiwiaWRlbnRpY2FsIiwiaXRlbSIsImtpbmQiLCJhbGlhcyIsImx0ZSIsImd0ZSIsInRoaW5nIiwiY21kcyIsInRhZ05hbWUiLCJjb250ZW50RmlsdGVyIiwidm90ZUZpbHRlciIsInRoaW5nRmlsdGVyIiwiZ2V0RmlsdGVyZWRSb3dzIiwic3BlYyIsInNvcnRlZFJvd3MiLCJsaW1pdCIsImxpbWl0UHJvcCIsImNvdW50IiwiY291bnRQcm9wIiwiYWZ0ZXIiLCJmaWx0ZXJGbiIsInJvd3MiLCJzbGljZSIsImZpbHRlcmVkIiwiZmV0Y2hCYXRjaCIsInNpemUiLCJQcm9taXNlIiwicm93IiwiaW5MaXN0aW5nIiwiUE9TX0lEIiwiY29uc29sZSIsImxvZyIsInNwbGljZSIsIlBPU19WQUwiLCJnZXRGaWx0ZXJlZElkcyIsIngiLCJ0aGluZ01ldGEiLCJ0aGluZ1NvdWwiLCJzY29yZXMiLCJMaXN0aW5nRmlsdGVyIiwiUE9TX0lEWCIsInJvd3NUb0lkcyIsInJvd3NUb0l0ZW1zIiwic291bEZyb21QYXRoIiwicGF0aEZyb21Tb3VsIiwiUmVnRXhwIiwiaWRUb1NvdWwiLCJpZHNUb1NvdWxzIiwic291bFRvSWQiLCJtYXRjaCIsInNvdWxzVG9JZHMiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwiaXRlbUtleXMiLCJmaWx0ZXIiLCJzZXJpYWxpemUiLCJpdGVtcyIsImFkZEluZGV4IiwiYXNzb2MiLCJkZWZhdWx0VG8iLCJzb3J0Um93cyIsInNvcnRXaXRoIiwiYXNjZW5kIiwiY29uZCIsImlzTmlsIiwiSW5maW5pdHkiLCJUIiwic29ydGVkSWRzIiwiaXRlbXNUb1Jvd3MiLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImluc2VydGVkIiwicG9wIiwicmVwbGFjZWQiLCJjYXRlZ29yaXplRGlmZiIsIm9yaWdpbmFsIiwiYWxsS2V5cyIsIl9kaWZmSWR4IiwiZGlmZklkIiwiX29yaWdJZHgiLCJvcmlnSWQiLCJ1bmlvblJvd3MiLCJ1bmlxQnkiLCJyb3dzRnJvbVNvdWxzIiwicmVhZCIsIkxpc3RpbmdOb2RlIiwidXBkYXRlTGlzdGluZyIsIm9yYyIsIm5ld1Njb3BlIiwidG9JdGVtcyIsIndyaXRlIiwib25QdXQiLCJ1cGRhdGVkU291bCIsInByb3BzIiwidXBkYXRlZElkcyIsInNwZWNGcm9tUGF0aCIsIlRoaW5nVm90ZUNvdW50cyIsImlzU3RpY2t5IiwiZXF1YWxzIiwiZ2V0QWNjZXNzZXMiLCJsaXN0ZW4iLCJMaXN0aW5nT3JhY2xlIiwiY2FsY3VsYXRlUm93cyIsInN0aWNreUl0ZW1zIiwiZGF0YVNvdXJjZSIsImNhbGN1bGF0ZSIsInRvTm9kZSIsInBhdGhzIiwic3RpY2t5Um93cyIsImZyb21TcGVjIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsIm5vZGVGcm9tUGF0aCIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIm9sZCIsImFjdGl2ZSIsImxhc3RBY3RpdmUiLCJ0b3AiLCJjb21tZW50cyIsImRpc2N1c3NlZCIsInNjb3JlIiwic2Vjb25kcyIsIm9yZGVyIiwiTWF0aCIsImxvZzEwIiwibWF4IiwiYWJzIiwiaG90Iiwic2lnbiIsImJlc3QiLCJ1cHMiLCJkb3ducyIsIm4iLCJ6IiwibGVmdCIsInJpZ2h0Iiwic3FydCIsInVuZGVyIiwiY29udHJvdmVyc2lhbCIsIm1hZ25pdHVkZSIsImJhbGFuY2UiLCJpc1ZhbGlkU29ydCIsInRvSXRlbSIsImZyb21UaGluZ1NldHMiLCJwaXBlIiwidW5pb24iLCJMaXN0aW5nU29ydCIsImFwcGx5IiwiYXAiLCJvZiIsImdldFNvdXJjZSIsImV4dHJhIiwid2lraVBhZ2UiLCJMaXN0aW5nU3BlYyIsImdldFNpZGViYXIiLCJub3JtYWxUb3BpY3MiLCJzcGxpdFRvcGljcyIsInN1Ym1pdFRvIiwidGFiIiwiQ2hhdExpc3RpbmciLCJ3aXRoUm91dGUiLCJDb21tZW50TGlzdGluZyIsIkNvbW1lbnRlZExpc3RpbmciLCJEb21haW5MaXN0aW5nIiwiRmlyZWhvc2VMaXN0aW5nIiwiZGlmZkRhdGEiLCJ1cGRhdGVkQXV0aG9yZWQiLCJvcElkIiwicmVwbHlJZHMiLCJUaGluZ0NvbW1lbnRzIiwiSW5ib3hMaXN0aW5nIiwidXNlck1ldGEiLCJtZXRhIiwicHJvZmlsZUlkIiwiUHJvZmlsZUxpc3RpbmciLCJzaWRlYmFyUGFnZU5hbWUiLCJvcmlnaW5hbERhdGEiLCJyZW1vdmVkSWRzIiwidm90ZUNvdW50c01hdGNoIiwidGhpbmdNYXRjaCIsIlRoaW5nRGF0YVNpZ25lZCIsImF1dGhvck1hdGNoIiwiU0VBQXV0aG9yIiwiZnJvbVBhZ2VJZCIsImV4aXN0aW5nS2V5cyIsIndvcmsiLCJtZXRob2QiLCJwcmlvcml0eSIsIlNwYWNlTGlzdGluZyIsIlRvcGljTGlzdGluZyIsInR5cGVzIiwidHlwZXNBcnJheSIsInNpZGViYXJGcm9tUGF0aCIsIkVycm9yIiwiYmFzZVNwZWMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJQYXRoIiwiY29uZmlnUGFnZU5hbWUiLCJzb3VyY2VXaXRoRGVmYXVsdHMiLCJub2RlVG9TcGFjZU5hbWVzIiwidXNlclNwYWNlTmFtZXMiLCJ1c2VyUGFnZXMiLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwidHlwZUZyb21QYXRoIiwid2l0aE1hdGNoIiwicGFyYW1zIiwicHJlbG9hZCIsIndpdGhMaXN0aW5nTWF0Y2giLCJzaWRlYmFyIiwic3BhY2UiLCJyZWFsUXVlcnkiLCJwcmVsb2FkTGlzdGluZyIsInRoaW5nU291bHMiLCJ0aGluZ3MiLCJtdWx0aVRoaW5nTWV0YSIsIm9wSWRzIiwib3BTb3VscyIsImNoYXRQYXRoIiwiZ2V0Q2FjaGUiLCJwcmVmaXgiLCJkZWZhdWx0UHJlZml4IiwiaWRlbnRpZmllciIsImRlZmF1bHRJZGVudGlmaWVyIiwiZGVmYXVsdFNvcnQiLCJyZXN0IiwidGhpbmdDb21tZW50cyIsInNwYWNlTGlzdGluZyIsImRlZmF1bHROYW1lIiwiZGVmYXVsdEF1dGhvcklkIiwic3BhY2VUaGluZ0NvbW1lbnRzIiwic3BhY2VQYXRoIiwibGlzdGluZ1BhdGgiLCJwcm9maWxlIiwiZGVmYXVsdFR5cGUiLCJpbmJveCIsIlBhZ2UiLCJpbml0IiwiY29uZmlnIiwibGVlY2giLCJkaXNhYmxlVmFsaWRhdGlvbiIsIm5vR3VuIiwibG9jYWxTdG9yYWdlIiwicGVyc2lzdCIsImNmZyIsInJhZGlzayIsIm9uIiwiZ3VuV2lyZUlucHV0Iiwic3RvcmVGbiIsInN0b3JlIiwiYSIsInJldHJ5Iiwic2VuZExlZWNoIiwiXyIsImNyZWF0ZVNjb3BlIiwic3VibWl0IiwiY29tbWVudCIsImNoYXQiLCJ3cml0ZVBhZ2UiLCJ2b3RlIiwicXVlcmllcyIsIlBlZXIiLCJlbXB0eVByb21pc2UiLCJ1bmlvbkFycmF5cyIsInRvcGljU291bHMiLCJkYXlzIiwiZGF5U3RyaW5ncyIsIm9uZURheSIsInN0YXJ0IiwiRGF0ZSIsImdldFRpbWUiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJyZXBseVRvU291bCIsIm9wU291bCIsInRoaW5naWQiLCJyZXBseVRvSWQiLCJtdWx0aVF1ZXJ5Iiwic2luZ2xlUXVlcnkiLCJwbHVyYWwiLCJzaW5nbGUiLCJjb2xsYXRlIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwic3VibWlzc2lvbk9ubHkiLCJpZHMxIiwiaWRzMiIsInRoaW5nU2NvcmVzIiwidm90ZXMiLCJwcm9taXNlcyIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsImNyZWF0ZWRBdCIsIm5hYiIsIlF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzZWEiLCJBVVRIX1NDSEVNQSIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIlRvcGljRGF5IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiJHJlZiIsInllYXIiLCJtaW5pbXVtIiwibWF4aW11bSIsIm1vbnRoIiwiZGF5IiwicmVxdWlyZWQiLCJwcm9wc0Zyb21Tb3VsIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlZGdlTWF0Y2hlc0tleSIsImFueU9mIiwiVG9waWMiLCJ1cmwiLCJVUkwiLCJhbGxPZiIsInRoaW5nS2luZCIsIm9yaWdpbmFsSGFzaCIsIm9uZU9mIiwidGhpbmdSZWxhdGVkRWRnZSIsImFsbGNvbW1lbnRzIiwidm90ZXN1cCIsInZvdGVzZG93biIsInJlcGx5VG8iLCJ0aGluZ0hhc2hNYXRjaGVzU291bCIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZyIsInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2giLCJpc0xlZ2FjeVRoaW5nIiwiUHJvb2ZPZldvcmtWb3RlcyIsIiRhc3luYyIsImtleXNBcmVQcm9vZnNPZldvcmsiLCJhbGdvcml0aG0iLCJjb21wbGV4aXR5IiwiaGFzaExlbmd0aCIsInRpbWVDb3N0IiwibWVtb3J5Q29zdCIsInBhcmFsbGVsaXNtIiwiVGhpbmdWb3Rlc1VwIiwiVGhpbmdWb3Rlc0Rvd24iLCJUaGluZ0RhdGEiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWwiLCJ1cCIsImRvd24iLCJjb21tYW5kcyIsIkxpc3RpbmdEYXRhIiwiZGVsZXRlTGVnYWN5IiwicGF0dGVyblByb3BlcnRpZXMiLCJzb3J0TmFtZSIsImVudW0iLCJUaGluZ0NvbW1lbnRzTGlzdGluZyIsInVzZXJMaXN0aW5nVHlwZSIsIkF1dGhvclJlcGxpZXNMaXN0aW5nIiwiQXV0aG9yUHJvZmlsZUxpc3RpbmciLCJBdXRob3JDb21tZW50cyIsIkF1dGhvclN1Ym1pc3Npb25zIiwiQXV0aG9yVGhpbmdzIiwicm91dGVzIiwiZGVmc1dpdGhSb3V0ZXMiLCJTY2hlbWEiLCJ0YWJ1bGF0b3JRdWVyeSIsInJlcGx5U291bHMiLCJjb21tYW5kTWFwIiwiSlNPTiIsInN0cmluZ2lmeSIsIlRhYnVsYXRvciIsInRvcGljUHJlZml4ZXMiLCJjaGF0bXNnIiwiYmluZCIsImluZGV4IiwicmVjdiIsInRkIiwib2ZmIiwidG9waWNQcmVmaXgiLCJiYXNlVG9waWNOYW1lIiwidG9Mb3dlckNhc2UiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInNldCIsInVybEluZm8iLCJob3N0Iiwic2NoZW1lIiwidXJsTm9kZSIsInB1dCIsImRhdGFTb3VsIiwibWV0YURhdGEiLCJwdWIiLCJ0aGluZ3NTb3VsIiwic3VibWlzc2lvbnNTb3VsIiwiY29tbWVudHNTb3VsIiwicmVqZWN0IiwicGFnZXNTb3VsIiwiY2hhaW4iLCJub25jZSIsInVybFN0ciIsIlRoaW5nRGF0YU5vZGUiLCJkaXNzb2MiLCJkIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImRheU51bSIsImdldFVUQ0RhdGUiLCJUaGluZ1NldCIsInRva2VuTWFwIiwibGluZSIsInRva2VucyIsImNoZWNrIiwia2V5c0luIiwiZ2V0TGFzdFZhbHVlIiwibmV4dCIsInBhaXJzIiwiVG9rZW5pemVyIiwic2NoZW1hIiwibmV3ZXN0IiwiX3NjaGVtYSIsInN1YnN0ciIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXMiLCJzaWduZWRJZCIsImdldElzVGhpbmdSZWxhdGVkRWRnZSIsImFqdiIsIm5vZGVUeXBlTmFtZSIsIl9wU2NoZW1hIiwiX2NQYXRoIiwicGFyZW50RGF0YSIsInByb3BUaGluZ0lkIiwiY29tcGlsZSIsInRoaW5nRGF0YUhhc2hNYXRjaGVzIiwicmVjb3JkIiwiaXNWb3RlVmFsaWQiLCJhcmdvbjIiLCJCdWZmZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImZyb20iLCJzYWx0IiwiaGFzaCIsInJhdyIsIm1hc2siLCJyZXF1aXJlIiwicFNjaGVtYSIsImNQYXRoIiwia2V5SW5QYXJlbnQiLCJpbml0QWp2IiwiYWRkS2V5d29yZCIsInZhbGlkYXRlIiwibW9kaWZ5aW5nIiwic3VwcHJlc3NvciIsImNvbnRleHQiLCJ3aXJlSW5wdXQiLCJtc2ciLCJwcm9taXNlIiwidmFsaWRhdGVkIiwidG8iLCJjYXRjaCIsImVycm9yIiwic3RhY2siLCJWYWxpZGF0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsS0FBRixDQUNiLENBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFpQkMsUUFBakIsRUFBMkJDLElBQUksR0FBRyxFQUFsQyxLQUNFLHNCQUFZLENBQUNDLEVBQUQs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QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSxvRCIsImZpbGUiOiJub3RhYnVnLXBlZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwibm90YWJ1Zy1wZWVyXCIsIFtcImFyZ29uMlwiLCBcImd1bi1zY29wZVwiLCBcImd1bi1zdXBwcmVzc29yXCIsIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiLCBcIm9iamVjdC1oYXNoXCIsIFwicmFtZGFcIiwgXCJyb3V0ZS1wYXJzZXJcIiwgXCJ1cmktanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibm90YWJ1Zy1wZWVyXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXJnb24yXCIpLCByZXF1aXJlKFwiZ3VuLXNjb3BlXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3JcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIpLCByZXF1aXJlKFwib2JqZWN0LWhhc2hcIiksIHJlcXVpcmUoXCJyYW1kYVwiKSwgcmVxdWlyZShcInJvdXRlLXBhcnNlclwiKSwgcmVxdWlyZShcInVyaS1qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibm90YWJ1Zy1wZWVyXCJdID0gZmFjdG9yeShyb290W1wiYXJnb24yXCJdLCByb290W1wiZ3VuLXNjb3BlXCJdLCByb290W1wiZ3VuLXN1cHByZXNzb3JcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3Nvci1zZWFyXCJdLCByb290W1wib2JqZWN0LWhhc2hcIl0sIHJvb3RbXCJyYW1kYVwiXSwgcm9vdFtcInJvdXRlLXBhcnNlclwiXSwgcm9vdFtcInVyaS1qc1wiXSk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9hcmdvbjJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc2NvcGVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX3NlYXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9vYmplY3RfaGFzaF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JhbWRhX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcm91dGVfcGFyc2VyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuXG5jb25zdCBzaWdudXAgPSBSLmN1cnJ5KFxuICAocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkLCBvcHRzID0ge30pID0+XG4gICAgbmV3IFByb21pc2UoKG9rLCBmYWlsKSA9PiB7XG4gICAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBwZWVyLmd1bi51c2VyKCk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgIHVzZXIuY3JlYXRlKFxuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIGFjayA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY2suZXJyKSB7XG4gICAgICAgICAgICAgICAgZmFpbChhY2suZXJyKTtcbiAgICAgICAgICAgICAgICB1c2VyLmxlYXZlKCk7XG4gICAgICAgICAgICAgICAgcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVlci5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpLnRoZW4ob2spO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3B0c1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwoXCJTRUEgaXMgbm90IGxvYWRlZFwiKTtcbiAgICAgIH1cbiAgICB9KVxuKTtcblxuY29uc3QgbG9naW4gPSBSLmN1cnJ5KChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQpID0+XG4gIG5ldyBQcm9taXNlKChvaywgZmFpbCkgPT4ge1xuICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBwZWVyLmd1bi51c2VyKCk7XG5cbiAgICAgIHVzZXIuYXV0aCh1c2VybmFtZSwgcGFzc3dvcmQsIGFjayA9PlxuICAgICAgICBhY2suZXJyID8gZmFpbChhY2suZXJyKSA6IG9rKHBlZXIuZ3VuLnVzZXIoKS5pcylcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhaWwoXCJTRUEgaXMgbm90IGxvYWRlZFwiKTtcbiAgICB9XG4gIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICBwZWVyLl9vbkxvZ2luICYmIHBlZXIuX29uTG9naW4ocmVzdWx0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pXG4pO1xuXG5jb25zdCBsb2dvdXQgPSBwZWVyID0+IHBlZXIuZ3VuLnVzZXIoKS5sZWF2ZSgpO1xuY29uc3QgaXNMb2dnZWRJbiA9IHBlZXIgPT4gcGVlci5ndW4gJiYgcGVlci5ndW4udXNlciAmJiBwZWVyLmd1bi51c2VyKCkuaXM7XG5jb25zdCBvbkxvZ2luID0gUi5jdXJyeSgocGVlciwgZm4pID0+IChwZWVyLl9vbkxvZ2luID0gZm4pKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgY29uc3QgQXV0aGVudGljYXRpb24gPSB7XG4gIHNpZ251cCxcbiAgbG9naW4sXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgb25Mb2dpblxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuY29uc3QgdG9rZW5pemUgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIudHJpbSksXG4gIFIuc3BsaXQoXCIgXCIpLFxuICBSLnJlcGxhY2UoQ29uc3RhbnRzLkNPTU1BTkRfUkUsIFwiXCIpLFxuICBSLnByb3BPcihcIlwiLCAwKSxcbiAgUi5zcGxpdChcIlxcblwiKVxuKTtcblxuY29uc3QgbWFwID0gdGhpbmdEYXRhID0+XG4gIFIucmVkdWNlKFxuICAgIChjbWRNYXAsIGlkKSA9PiB7XG4gICAgICBjb25zdCBib2R5ID0gUi5wYXRoKFtpZCwgXCJib2R5XCJdLCB0aGluZ0RhdGEpO1xuICAgICAgY29uc3QgYXV0aG9ySWQgPSBSLnBhdGgoW2lkLCBcImF1dGhvcklkXCJdLCB0aGluZ0RhdGEpIHx8IFwiYW5vblwiO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gcGFyc2VGbG9hdChSLnBhdGgoW2lkLCBcInRpbWVzdGFtcFwiXSwgdGhpbmdEYXRhKSk7XG5cbiAgICAgIGlmICghUi50ZXN0KENvbnN0YW50cy5DT01NQU5EX1JFLCBib2R5KSkgcmV0dXJuIGNtZE1hcDtcbiAgICAgIGNvbnN0IHRva2VuaXplZCA9IFthdXRob3JJZCwgLi4udG9rZW5pemUoYm9keSksIGlkXTtcblxuICAgICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2VuaXplZCwgdGltZXN0YW1wIHx8IDAsIGNtZE1hcCk7XG4gICAgfSxcbiAgICB7fSxcbiAgICBSLmtleXModGhpbmdEYXRhKVxuICApO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudENvbW1hbmQgPSB7IHRva2VuaXplLCBtYXAgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IENvbmZpZyA9IHtcbiAgdGFidWxhdG9yOiBDb25zdGFudHMuSU5ERVhFUixcbiAgaW5kZXhlcjogQ29uc3RhbnRzLklOREVYRVIsXG4gIG93bmVyOiBDb25zdGFudHMuSU5ERVhFUixcbiAgdXBkYXRlOiBSLmNvbXBvc2UoXG4gICAgUi5tYXAoKFtrZXksIHZhbF0pID0+IChDb25maWdba2V5XSA9IHZhbCkpLFxuICAgIFIudG9QYWlyc1xuICApXG59O1xuIiwiY29uc3QgQ09NTUFORF9SRSA9IC9eIHs0fX4vO1xuY29uc3QgUFJFRklYID0gXCJuYWJcIjtcbmNvbnN0IFNPVUxfREVMSU1FVEVSID0gXCJ8fn58XCI7XG5cbmNvbnN0IExJU1RJTkdfU0laRSA9IDEwMDA7XG5cbmNvbnN0IE1BWF9IQVNIX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9QT1dfTk9OQ0VfU0laRSA9IDY0O1xuY29uc3QgTUFYX1RPUElDX1NJWkUgPSA0MjtcbmNvbnN0IE1BWF9BVVRIT1JfQUxJQVNfU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9BVVRIT1JfSURfU0laRSA9IDEyODsgLy8gPz8/XG5jb25zdCBNQVhfVVJMX1NJWkUgPSAyMDQ4O1xuY29uc3QgTUFYX0RPTUFJTl9TSVpFID0gMjU2O1xuY29uc3QgTUFYX1RISU5HX0tJTkRfU0laRSA9IDE2O1xuY29uc3QgTUFYX1RISU5HX1RJVExFX1NJWkUgPSAzMDA7XG5jb25zdCBNQVhfVEhJTkdfQk9EWV9TSVpFID0gNTAwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX0lEU19TSVpFID0gNTAwMDA7XG5jb25zdCBNQVhfTElTVElOR19TT1VSQ0VfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfVEFCU19TSVpFID0gNTAwMDtcblxuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9QUkVGSVhfU0laRSA9IE1BWF9UT1BJQ19TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUgPSBNQVhfQVVUSE9SX0lEX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSA9IDE2O1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfS0lORF9TSVpFID0gMTY7XG5cbmNvbnN0IENIQVRfUFJFTE9BRF9JVEVNUyA9IDEwO1xuXG5jb25zdCBJTkRFWEVSID1cbiAgXCJDRXlLckRkMXh5UFhwV1NWMDBNZ3ZuWlkyVkpMSFhnekN2aE1lRHdLVFlBLnlqU3EwRHlYenpoQl9aWHJfRHpmSmdpajN0WFUwLTN0MFE1YkpBdFpwajhcIjtcblxuZXhwb3J0IGNvbnN0IENvbnN0YW50cyA9IHtcbiAgQ09NTUFORF9SRSxcbiAgUFJFRklYLFxuICBTT1VMX0RFTElNRVRFUixcbiAgTElTVElOR19TSVpFLFxuICBNQVhfSEFTSF9TSVpFLFxuICBNQVhfUE9XX05PTkNFX1NJWkUsXG4gIE1BWF9UT1BJQ19TSVpFLFxuICBNQVhfQVVUSE9SX0FMSUFTX1NJWkUsXG4gIE1BWF9BVVRIT1JfSURfU0laRSxcbiAgTUFYX1VSTF9TSVpFLFxuICBNQVhfRE9NQUlOX1NJWkUsXG4gIE1BWF9USElOR19LSU5EX1NJWkUsXG4gIE1BWF9USElOR19USVRMRV9TSVpFLFxuICBNQVhfVEhJTkdfQk9EWV9TSVpFLFxuICBNQVhfTElTVElOR19JRFNfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1RBQlNfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9QUkVGSVhfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1RZUEVfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUsXG4gIENIQVRfUFJFTE9BRF9JVEVNUyxcbiAgSU5ERVhFUlxufTtcbiIsIi8qIGdsb2JhbHMgR3VuICovXG5pbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCBzb3VsID0gUi5wYXRoT3IoXCJcIiwgW1wiX1wiLCBcIiNcIl0pO1xuY29uc3Qgc3RhdGUgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0pO1xuXG5jb25zdCBsYXRlc3QgPSBSLmNvbXBvc2UoXG4gIFIubGFzdCxcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIudmFsdWVzLFxuICBzdGF0ZVxuKTtcblxuY29uc3QgZWRnZXMgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIucHJvcChcIiNcIikpLFxuICBSLnZhbHVlc1xuKTtcblxuZnVuY3Rpb24gZGVjb2RlU0VBKHJhd0RhdGEpIHtcbiAgY29uc3QgZGF0YSA9IHJhd0RhdGEgPyB7IC4uLnJhd0RhdGEgfSA6IHJhd0RhdGE7XG4gIGNvbnN0IHNvdWwgPSBSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpO1xuXG4gIGlmICghc291bCB8fCAhR3VuLlNFQSB8fCBzb3VsLmluZGV4T2YoXCJ+XCIpID09PSAtMSkgcmV0dXJuIHJhd0RhdGE7XG4gIFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpLmZvckVhY2goa2V5ID0+IHtcbiAgICBHdW4uU0VBLnZlcmlmeShcbiAgICAgIEd1bi5TRUEub3B0LnBhY2socmF3RGF0YVtrZXldLCBrZXksIHJhd0RhdGEsIHNvdWwpLFxuICAgICAgZmFsc2UsXG4gICAgICByZXMgPT4gKGRhdGFba2V5XSA9IEd1bi5TRUEub3B0LnVucGFjayhyZXMsIGtleSwgcmF3RGF0YSkpXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IEd1bk5vZGUgPSB7IHNvdWwsIHN0YXRlLCBsYXRlc3QsIGVkZ2VzLCBkZWNvZGVTRUEgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlLCBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuXG5jb25zdCBuZWVkc1Njb3JlcyA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInNvcnQgaG90XCIsXG4gICAgXCJzb3J0IHRvcFwiLFxuICAgIFwic29ydCBiZXN0XCIsXG4gICAgXCJzb3J0IGNvbnRyb3ZlcnNpYWxcIixcbiAgICBcInVwc1wiLFxuICAgIFwiZG93bnNcIixcbiAgICBcInNjb3JlXCIsXG4gICAgXCJjYW4gcmVtb3ZlXCJcbiAgXSk7XG5cbmNvbnN0IG5lZWRzRGF0YSA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInRvcGljXCIsXG4gICAgXCJkb21haW5cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidW5pcXVlIGJ5IGNvbnRlbnRcIixcbiAgICBcImtpbmRcIixcbiAgICBcInR5cGVcIixcbiAgICBcInJlcXVpcmUgc2lnbmVkXCIsXG4gICAgXCJyZXF1aXJlIGFub25cIixcbiAgICBcImFsaWFzXCIsXG4gICAgXCJiYW4gZG9tYWluXCIsXG4gICAgXCJiYW4gdG9waWNcIixcbiAgICBcImJhbiBhdXRob3JcIixcbiAgICBcImJhbiBhbGlhc1wiXG4gIF0pO1xuXG5jb25zdCBpdGVtc0Zyb21UaGluZ1NvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoXG4gICAgUi5tYXAoc291bCA9PiBMaXN0aW5nU29ydC5pdGVtRnJvbVNvdWwoc2NvcGUsIHNvdWwsIGRlZmluaXRpb24pLCBzb3VscylcbiAgKS50aGVuKExpc3RpbmdTb3J0LnNvcnRJdGVtcylcbik7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KChzY29wZSwgc291bHMsIGRlZmluaXRpb24pID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgIC50aGVuKFIucmVkdWNlKFIubWVyZ2VSaWdodCwge30pKVxuICAgIC50aGVuKFRoaW5nU2V0LnNvdWxzKVxuICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbGlzdGluZ3MgPSBSLnBhdGhPcihbXSwgW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwibGlzdGluZ3NcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGwgPT4gYCR7bH0vJHtzb3J0fWAsIGxpc3RpbmdzKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMgfTtcbn07XG5cbmNvbnN0IHRvcGljU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgdG9waWNzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInRvcGljc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCF0b3BpY3MubGVuZ3RoKSB0b3BpY3MucHVzaChcImFsbFwiKTtcbiAgLy8gY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAodCA9PiBgL3QvJHt0fS8ke3NvcnR9YCwgdG9waWNzKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvdC8ke3RvcGljcy5zb3J0KCkuam9pbihcIitcIil9LyR7c29ydH1gXTtcblxuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlUb3BpYyhzY29wZSwgeyB0b3BpY3MsIHNvcnQgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBkb21haW5Tb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBkb21haW5zID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImRvbWFpbnNcIl0sIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghZG9tYWlucy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgLy8gY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoZCA9PiBgL2RvbWFpbi8ke2R9LyR7c29ydH1gLCBkb21haW5zKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvZG9tYWluLyR7ZG9tYWlucy5zb3J0KCkuam9pbihcIitcIil9LyR7c29ydH1gXTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpRG9tYWluKHNjb3BlLCB7IGRvbWFpbnMsIHNvcnQgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBhdXRob3JTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBhdXRob3JJZHMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiYXV0aG9yc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHR5cGUgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidHlwZVwiXSwgZGVmaW5pdGlvbik7XG5cbiAgaWYgKCFhdXRob3JJZHMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGlkID0+IGAvdXNlci8ke2lkfS8ke3R5cGV9LyR7c29ydH1gLCBhdXRob3JJZHMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlBdXRob3Ioc2NvcGUsIHsgdHlwZSwgYXV0aG9ySWRzIH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgY3VyYXRvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGN1cmF0b3JzID0gUi5wcm9wKFwiY3VyYXRvcnNcIiwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFjdXJhdG9ycy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9L2NvbW1lbnRlZC8ke3NvcnR9YCwgY3VyYXRvcnMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkuY3VyYXRlZChzY29wZSwgY3VyYXRvcnMsIHRydWUpXG4gICAgICAudGhlbihpZHMgPT4gaWRzLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkpXG4gICAgICAudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IG9wU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3Qgc3VibWlzc2lvbklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJvcHNcIl0sIGRlZmluaXRpb24pO1xuXG4gIGlmICghc3VibWlzc2lvbklkcy5sZW5ndGgpIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChcbiAgICBpZCA9PiBgL3RoaW5ncy8ke2lkfS9jb21tZW50cy8ke3NvcnR9YCxcbiAgICBzdWJtaXNzaW9uSWRzXG4gICk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVN1Ym1pc3Npb24oc2NvcGUsIHsgc3VibWlzc2lvbklkcyB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHJlcGxpZXNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBpZCA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJyZXBsaWVzVG9cIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB0eXBlID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInR5cGVcIl0sIGRlZmluaXRpb24pO1xuXG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL3VzZXIvJHtpZH0vcmVwbGllcy8ke3R5cGV9LyR7c29ydH1gXTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5LnJlcGxpZXNUb0F1dGhvcihzY29wZSwge1xuICAgICAgdHlwZSxcbiAgICAgIHJlcGxpZXNUb0F1dGhvcklkOiBpZCxcbiAgICAgIGluZGV4ZXI6IGRlZmluaXRpb24uaW5kZXhlclxuICAgIH0pLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBzb3VyY2VzID0ge1xuICBsaXN0aW5nOiBsaXN0aW5nU291cmNlLFxuICByZXBsaWVzOiByZXBsaWVzU291cmNlLFxuICBvcDogb3BTb3VyY2UsXG4gIGN1cmF0b3I6IGN1cmF0b3JTb3VyY2UsXG4gIGF1dGhvcjogYXV0aG9yU291cmNlLFxuICBkb21haW46IGRvbWFpblNvdXJjZSxcbiAgdG9waWM6IHRvcGljU291cmNlXG59O1xuXG5jb25zdCBzb3VyY2VOYW1lcyA9IFIua2V5cyhzb3VyY2VzKTtcbmNvbnN0IHNvdXJjZU5hbWUgPSBkZWYgPT4gUi5maW5kKGRlZi5pc1ByZXNlbnQsIHNvdXJjZU5hbWVzKSB8fCBcInRvcGljXCI7XG5jb25zdCBmcm9tRGVmaW5pdGlvbiA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBuYW1lID0gc291cmNlTmFtZShkZWZpbml0aW9uKTtcblxuICByZXR1cm4gUi5tZXJnZUxlZnQoeyBuYW1lIH0sIHNvdXJjZXNbbmFtZV0oZGVmaW5pdGlvbikpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEYXRhU291cmNlID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgc291cmNlcyxcbiAgbmVlZHNTY29yZXMsXG4gIG5lZWRzRGF0YSxcbiAgaXRlbXNGcm9tVGhpbmdTZXRzLFxuICBpdGVtc0Zyb21UaGluZ1NvdWxzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IChzb3VyY2UsIG93bmVySWQgPSBudWxsLCBzcGFjZU5hbWUgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuICBjb25zdCBvYmogPSB7IC4uLnRva2VuaXplZCB9O1xuICBjb25zdCB7IGlzUHJlc2VudCwgZ2V0VmFsdWUsIGdldFZhbHVlcywgZ2V0VmFsdWVDaGFpbiwgZ2V0UGFpcnMgfSA9IHRva2VuaXplZDtcblxuICBbXG4gICAgb2JqLmZyb21QYWdlQXV0aG9yID0gb3duZXJJZCxcbiAgICBvYmouZnJvbVBhZ2VOYW1lID0gc3BhY2VOYW1lID8gYHNwYWNlOiR7c3BhY2VOYW1lfWAgOiB1bmRlZmluZWRcbiAgXSA9IGdldFZhbHVlQ2hhaW4oXCJzb3VyY2VkIGZyb20gcGFnZVwiKTtcbiAgb2JqLmRpc3BsYXlOYW1lID0gdG9rZW5pemVkLmdldFZhbHVlKFwibmFtZVwiKSB8fCBzcGFjZU5hbWU7XG4gIG9iai5pbmRleGVyID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgQ29uZmlnLmluZGV4ZXI7XG4gIG9iai50YWJ1bGF0b3IgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBvYmouaW5kZXhlcjtcbiAgb2JqLnRhYnMgPSBnZXRQYWlycyhcInRhYlwiKTtcbiAgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInNvcnRcIik7XG5cbiAgLy8gVE9ETzogYnJlYWtzIHdpdGggY3VzdG9tIG5hbWVzXG4gIGlmIChvYmouc29ydCA9PT0gXCJkZWZhdWx0XCIpIG9iai5zb3J0ID0gZ2V0VmFsdWUoXCJ0YWJcIik7XG5cbiAgb2JqLnVuaXF1ZUJ5Q29udGVudCA9ICEhaXNQcmVzZW50KFwidW5pcXVlIGJ5IGNvbnRlbnRcIik7XG4gIG9iai5jdXJhdG9ycyA9IGdldFZhbHVlcyhcImN1cmF0b3JcIik7XG4gIG9iai5tb2RlcmF0b3JzID0gZ2V0VmFsdWVzKFwibW9kXCIpO1xuICBvYmouaW5jbHVkZVJhbmtzID0gISFpc1ByZXNlbnQoXCJzaG93IHJhbmtzXCIpO1xuICBvYmouc3RpY2t5SWRzID0gZ2V0VmFsdWVzKFwic3RpY2t5XCIpO1xuICBvYmouaXNJZFN0aWNreSA9IGlkID0+ICEhdG9rZW5pemVkLmlzUHJlc2VudChbXCJzdGlja3lcIiwgaWRdKTtcbiAgb2JqLmlzQ2hhdCA9ICEhaXNQcmVzZW50KFwiZGlzcGxheSBhcyBjaGF0XCIpO1xuICBvYmouc3VibWl0VG9waWNzID0gZ2V0VmFsdWVzKFwic3VibWl0IHRvXCIpO1xuICBvYmouc3VibWl0VG9waWMgPSBnZXRWYWx1ZShcInN1Ym1pdCB0b1wiKTtcbiAgb2JqLmNoYXRUb3BpYyA9IGdldFZhbHVlKFwiY2hhdCBpblwiKTtcblxuICBpZiAob3duZXJJZCAmJiBzcGFjZU5hbWUpIHtcbiAgICBvYmouc3BhY2VOYW1lID0gc3BhY2VOYW1lO1xuICAgIG9iai5vd25lciA9IG93bmVySWQ7XG4gICAgb2JqLnVzZUZvckNvbW1lbnRzID0gIXRva2VuaXplZC5pc1ByZXNlbnQoXCJjb21tZW50cyBsZWF2ZSBzcGFjZVwiKTtcbiAgICBvYmouYmFzZVBhdGggPSBgL3VzZXIvJHtvd25lcklkfS9zcGFjZXMvJHtzcGFjZU5hbWV9YDtcbiAgICBpZiAob2JqLnN1Ym1pdFRvcGljKSBvYmouc3VibWl0UGF0aCA9IGAke29iai5iYXNlUGF0aH0vc3VibWl0YDtcbiAgICBvYmouZGVmYXVsdFRhYiA9IHRva2VuaXplZC5nZXRWYWx1ZShcInRhYlwiKTtcbiAgICBvYmouZGVmYXVsdFRhYlBhdGggPSBvYmouZGVmYXVsdFRhYlxuICAgICAgPyB0b2tlbml6ZWQuZ2V0VmFsdWUoW1widGFiXCIsIG9iai5kZWZhdWx0VGFiXSlcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIG9iai5maWx0ZXJzID0ge1xuICAgIGZ1bmN0aW9uczogW10sXG4gICAgYWxsb3c6IHtcbiAgICAgIHJlcGxpZXNUbzogZ2V0VmFsdWUoXCJyZXBsaWVzIHRvIGF1dGhvclwiKSxcbiAgICAgIHR5cGU6IGdldFZhbHVlKFwidHlwZVwiKSwgLy8gVE9ETzogdGhpcyBmaWVsZCBzZWVtcyByZWR1bmRhbnQgd2l0aCBraW5kIGFuZCBzaG91bGQgYmUgZGVwcmVjYXRlZFxuICAgICAgb3BzOiBnZXRWYWx1ZXMoXCJvcFwiKSxcbiAgICAgIGFsaWFzZXM6IGdldFZhbHVlcyhcImFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYXV0aG9yXCIpLFxuICAgICAgZG9tYWluczogZ2V0VmFsdWVzKFwiZG9tYWluXCIpLFxuICAgICAgdG9waWNzOiBnZXRWYWx1ZXMoXCJ0b3BpY1wiKSxcbiAgICAgIGxpc3RpbmdzOiBnZXRWYWx1ZXMoXCJsaXN0aW5nXCIpLFxuICAgICAga2luZHM6IGdldFZhbHVlcyhcImtpbmRcIiksXG4gICAgICBhbm9uOiAhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICFpc1ByZXNlbnQoXCJyZXF1aXJlIGFub25cIilcbiAgICB9LFxuICAgIGRlbnk6IHtcbiAgICAgIGFsaWFzZXM6IGdldFZhbHVlcyhcImJhbiBhbGlhc1wiKSxcbiAgICAgIGF1dGhvcnM6IGdldFZhbHVlcyhcImJhbiBhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJiYW4gZG9tYWluXCIpLFxuICAgICAgdG9waWNzOiBnZXRWYWx1ZXMoXCJiYW4gdG9waWNcIiksXG4gICAgICBhbm9uOiAhIWlzUHJlc2VudChcInJlcXVpcmUgc2lnbmVkXCIpLFxuICAgICAgc2lnbmVkOiAhIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKSxcbiAgICAgIHRhZ3M6IGdldFBhaXJzKFwiY2FuIHJlbW92ZVwiKVxuICAgIH1cbiAgfTtcblxuICBvYmoudm90ZUZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICB1cHNNaW46IHBhcnNlSW50KGdldFZhbHVlKFwidXBzIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICB1cHNNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwidXBzIGJlbG93XCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgZG93bnNNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwiZG93bnMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWluOiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBzY29yZU1heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJzY29yZSBiZWxvd1wiKSwgMTApIHx8IG51bGxcbiAgfTtcblxuICBvYmouY2Vuc29ycyA9IFIudW5pcShSLm1hcChSLnByb3AoMSksIG9iai5maWx0ZXJzLmRlbnkudGFncykpO1xuICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEZWZpbml0aW9uID0geyBmcm9tU291cmNlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcblxuY29uc3QgaW50UGF0aCA9IHAgPT5cbiAgUi5jb21wb3NlKFxuICAgIHBhcnNlSW50LFxuICAgIFIucGF0aChwKVxuICApO1xuXG5jb25zdCBmcm9tRGVmaW5pdGlvbiA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IGZpbHRlcnMsIHZvdGVGaWx0ZXJzLCBpc1ByZXNlbnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IFtdO1xuICBjb25zdCB2b3RlRmlsdGVyRnVuY3Rpb25zID0gW107XG5cbiAgY29uc3QgYWRkRmlsdGVyID0gKC4uLmZucykgPT4gZmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuICBjb25zdCBhZGRWb3RlRmlsdGVyID0gKC4uLmZucykgPT4gdm90ZUZpbHRlckZ1bmN0aW9ucy5wdXNoKFIuY29tcG9zZSguLi5mbnMpKTtcblxuICBpZiAoZmlsdGVycy5hbGxvdy5hbGlhc2VzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJhbGlhc1wiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9yXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LmF1dGhvcnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImF1dGhvclwiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuZG9tYWlucy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgdCA9PiAhIWlzUHJlc2VudChbXCJkb21haW5cIiwgdF0pLFxuICAgICAgVGhpbmdEYXRhTm9kZS5kb21haW4sXG4gICAgICBSLnByb3AoXCJkYXRhXCIpXG4gICAgKTtcblxuICBpZiAoXG4gICAgZmlsdGVycy5hbGxvdy50b3BpY3MubGVuZ3RoICYmXG4gICAgIVIuZmluZChcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi5pZGVudGljYWwoXCJhbGxcIiksXG4gICAgICAgIFIubGFzdCxcbiAgICAgICAgUi5zcGxpdChcIjpcIilcbiAgICAgICksXG4gICAgICBmaWx0ZXJzLmFsbG93LnRvcGljc1xuICAgIClcbiAgKVxuICAgIGFkZEZpbHRlcihpdGVtID0+IHtcbiAgICAgIGxldCB0b3BpYyA9IFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0sIGl0ZW0pO1xuICAgICAgY29uc3Qga2luZCA9IFIucGF0aChbXCJkYXRhXCIsIFwia2luZFwiXSwgaXRlbSk7XG5cbiAgICAgIGlmIChraW5kID09PSBcImNoYXRtc2dcIikgdG9waWMgPSBgY2hhdDoke3RvcGljfWA7XG4gICAgICBpZiAoa2luZCA9PT0gXCJjb21tZW50XCIpIHRvcGljID0gYGNvbW1lbnRzOiR7dG9waWN9YDtcbiAgICAgIHJldHVybiAhIWlzUHJlc2VudChbXCJ0b3BpY1wiLCB0b3BpY10pO1xuICAgIH0pO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmtpbmRzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoa2luZCA9PiAhIWlzUHJlc2VudChbXCJraW5kXCIsIGtpbmRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LnR5cGUgPT09IFwiY29tbWFuZHNcIilcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSksXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYm9keVwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkuYWxpYXNlcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYWxpYXMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhbGlhc1wiLCBhbGlhc10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hdXRob3JzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhdXRob3JJZCA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImF1dGhvclwiLCBhdXRob3JJZF0pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmRvbWFpbnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGRvbWFpbiA9PiAhZG9tYWluIHx8ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiZG9tYWluXCIsIGRvbWFpbl0pLFxuICAgICAgVGhpbmdEYXRhTm9kZS5kb21haW5cbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LnRvcGljcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgdG9waWMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJ0b3BpY1wiLCB0b3BpY10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmFub24pIGFkZEZpbHRlcihSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuc2lnbmVkKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgYXV0aG9ySWQgPT4gIWF1dGhvcklkLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnVwc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMudXBzTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMudXBzTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLmRvd25zTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuZG93bnNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5zY29yZU1pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5zY29yZU1heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkudGFncy5sZW5ndGgpXG4gICAgYWRkVm90ZUZpbHRlcih0aGluZyA9PiB7XG4gICAgICBjb25zdCBjbWRzID0gUi5wYXRoKFtcInZvdGVzXCIsIFwiY29tbWFuZHNcIl0sIHRoaW5nKSB8fCB7fTtcblxuICAgICAgcmV0dXJuICFmaWx0ZXJzLmRlbnkudGFncy5maW5kKFxuICAgICAgICAoW3RhZ05hbWUsIGF1dGhvcklkXSkgPT4gISFSLnBhdGgoW2F1dGhvcklkLCBcInRhZ1wiLCB0YWdOYW1lXSwgY21kcylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgY29uc3QgY29udGVudEZpbHRlciA9IHRoaW5nID0+ICFmaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3Qgdm90ZUZpbHRlciA9IHRoaW5nID0+ICF2b3RlRmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHRoaW5nRmlsdGVyID0gdGhpbmcgPT5cbiAgICBkZWZpbml0aW9uLmlzSWRTdGlja3koUi5wcm9wKFwiaWRcIiwgdGhpbmcpKSB8fFxuICAgIChjb250ZW50RmlsdGVyKHRoaW5nKSAmJiB2b3RlRmlsdGVyKHRoaW5nKSk7XG5cbiAgcmV0dXJuIHsgdGhpbmdGaWx0ZXIsIGNvbnRlbnRGaWx0ZXIsIHZvdGVGaWx0ZXIgfTtcbn07XG5cbmNvbnN0IGdldEZpbHRlcmVkUm93cyA9IGFzeW5jIChcbiAgc2NvcGUsXG4gIHNwZWMsXG4gIHNvcnRlZFJvd3MsXG4gIHsgbGltaXQ6IGxpbWl0UHJvcCA9IDI1LCBjb3VudDogY291bnRQcm9wID0gMCwgYWZ0ZXIgPSBudWxsLCBmaWx0ZXJGbiB9ID0ge31cbikgPT4ge1xuICBjb25zdCBsaW1pdCA9IHBhcnNlSW50KGxpbWl0UHJvcCwgMTApO1xuICBjb25zdCBjb3VudCA9IHBhcnNlSW50KGNvdW50UHJvcCwgMTApIHx8IDA7XG4gIGNvbnN0IHJvd3MgPSBzb3J0ZWRSb3dzLnNsaWNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gW107XG4gIGNvbnN0IGZldGNoQmF0Y2ggPSAoc2l6ZSA9IDMwKSA9PlxuICAgIFByb21pc2UuYWxsKFxuICAgICAgUi5tYXAoYXN5bmMgcm93ID0+IHtcbiAgICAgICAgbGV0IGluTGlzdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFyb3dbTGlzdGluZ05vZGUuUE9TX0lEXSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmxhbmtSb3dcIiwgcm93KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsdGVyRm4pIGluTGlzdGluZyA9IGF3YWl0IGZpbHRlckZuKHJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKTtcbiAgICAgICAgaWYgKGluTGlzdGluZykgZmlsdGVyZWQucHVzaChyb3cpO1xuICAgICAgfSwgcm93cy5zcGxpY2UoY291bnQsIHNpemUpKVxuICAgICk7XG5cbiAgd2hpbGUgKHJvd3MubGVuZ3RoID4gY291bnQpIHtcbiAgICBhd2FpdCBmZXRjaEJhdGNoKCk7XG4gICAgaWYgKGxpbWl0ICYmIGZpbHRlcmVkLmxlbmd0aCA+PSBsaW1pdCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gUi5jb21wb3NlKFxuICAgIGxpbWl0ID8gUi5zbGljZSgwLCBsaW1pdCkgOiBSLmlkZW50aXR5LFxuICAgIFIuc29ydEJ5KFIucHJvcChMaXN0aW5nTm9kZS5QT1NfVkFMKSlcbiAgKShmaWx0ZXJlZCk7XG59O1xuXG5jb25zdCBnZXRGaWx0ZXJlZElkcyA9IFIuY29tcG9zZShcbiAgeCA9PiB4LnRoZW4oUi5tYXAoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19JRCkpKSxcbiAgZ2V0RmlsdGVyZWRSb3dzXG4pO1xuXG5jb25zdCB0aGluZ0ZpbHRlciA9IFIuY3VycnkoKHNjb3BlLCBzcGVjLCB0aGluZ0lkKSA9PlxuICBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pLFxuICAgIHNjb3JlczogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNTY29yZXMoc3BlYyksXG4gICAgZGF0YTogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNEYXRhKHNwZWMpXG4gIH0pLnRoZW4oc3BlYy50aGluZ0ZpbHRlcilcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRmlsdGVyID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgZ2V0RmlsdGVyZWRSb3dzLFxuICBnZXRGaWx0ZXJlZElkcyxcbiAgdGhpbmdGaWx0ZXJcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5cbmNvbnN0IFtQT1NfSURYLCBQT1NfSUQsIFBPU19WQUxdID0gWzAsIDEsIDIsIDNdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCByb3dzVG9JZHMgPSBSLm1hcChSLnByb3AoUE9TX0lEKSk7XG5jb25zdCByb3dzVG9JdGVtcyA9IFIubWFwKFIuc2xpY2UoMSwgMykpO1xuY29uc3Qgc291cmNlID0gUi5wcm9wT3IoXCJcIiwgXCJzb3VyY2VcIik7XG5jb25zdCBzb3VsRnJvbVBhdGggPSBSLmN1cnJ5KFxuICAoaW5kZXhlciwgcGF0aCkgPT4gYCR7Q29uc3RhbnRzLlBSRUZJWH0ke3BhdGh9QH4ke2luZGV4ZXJ9LmBcbik7XG5jb25zdCBwYXRoRnJvbVNvdWwgPSBSLmNvbXBvc2UoXG4gIFIucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtDb25zdGFudHMuUFJFRklYfWApLCBcIlwiKSxcbiAgUi5yZXBsYWNlKC9Afi4qXFwuLywgXCJcIilcbik7XG5cbmNvbnN0IGlkVG9Tb3VsID0gdGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSk7XG5jb25zdCBpZHNUb1NvdWxzID0gUi5tYXAoaWRUb1NvdWwpO1xuY29uc3Qgc291bFRvSWQgPSBzb3VsID0+IFIucHJvcChcInRoaW5nSWRcIiwgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpKTtcbmNvbnN0IHNvdWxzVG9JZHMgPSBSLm1hcChzb3VsVG9JZCk7XG5cbmNvbnN0IGdldFJvdyA9IFIuY3VycnkoKG5vZGUsIGlkeCkgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pbnNlcnQoMCwgcGFyc2VJbnQoaWR4LCAxMCkpLCBSLmFsd2F5cyhudWxsKSksXG4gICAgcm93ID0+IHtcbiAgICAgIHJvd1sxXSA9IHBhcnNlRmxvYXQocm93WzFdKTtcbiAgICAgIHJldHVybiByb3c7XG4gICAgfSxcbiAgICBSLm1hcChSLnRyaW0pLFxuICAgIFIuc3BsaXQoXCIsXCIpLFxuICAgIFIucHJvcE9yKFwiXCIsIGAke2lkeH1gKVxuICApKG5vZGUpXG4pO1xuXG5jb25zdCBpdGVtS2V5cyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoXG4gICAgUi5jb21wb3NlKFxuICAgICAgdmFsID0+ICEhKHZhbCA9PT0gMCB8fCB2YWwpLFxuICAgICAgcGFyc2VJbnRcbiAgICApXG4gICksXG4gIFIua2V5c1xuKTtcblxuY29uc3Qgc2VyaWFsaXplID0gUi5jdXJyeSgoc3BlYywgaXRlbXMpID0+XG4gIFIuY29tcG9zZShcbiAgICBSLmFkZEluZGV4KFIucmVkdWNlKShcbiAgICAgIChyZXMsIHJvdywgaWR4KSA9PiBSLmFzc29jKGAke2lkeH1gLCByb3cuam9pbihcIixcIiksIHJlcyksXG4gICAgICB7fVxuICAgICksXG4gICAgUi5kZWZhdWx0VG8oW10pXG4gICkoaXRlbXMpXG4pO1xuXG5jb25zdCByb3dzID0gbm9kZSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5tYXAoZ2V0Um93KG5vZGUpKSxcbiAgICBpdGVtS2V5c1xuICApKG5vZGUpO1xuXG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIHJvd3NUb0lkcyxcbiAgcm93c1xuKTtcblxuY29uc3Qgc29ydFJvd3MgPSBSLnNvcnRXaXRoKFtcbiAgUi5hc2NlbmQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5jb25kKFtbUi5pc05pbCwgUi5hbHdheXMoSW5maW5pdHkpXSwgW1IuVCwgcGFyc2VGbG9hdF1dKSxcbiAgICAgIFIucHJvcChQT1NfVkFMKVxuICAgIClcbiAgKVxuXSk7XG5cbmNvbnN0IHNvcnRlZElkcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIHJvd3Ncbik7XG5cbmNvbnN0IGl0ZW1zVG9Sb3dzID0gUi5hZGRJbmRleChSLm1hcCkoKGl0ZW0sIGlkeCkgPT4gW2lkeCwgLi4uaXRlbV0pO1xuXG5jb25zdCBkaWZmID0gYXN5bmMgKFxuICBub2RlLFxuICB1cGRhdGVkSXRlbXMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW10sXG4gIHsgbWF4U2l6ZSA9IDEwMDAgfSA9IHt9XG4pID0+IHtcbiAgY29uc3QgcmVtb3ZlZCA9IFIuaW5kZXhCeShSLmlkZW50aXR5LCByZW1vdmVJZHMpO1xuICBjb25zdCBieUlkID0ge307XG4gIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBjb25zdCB1cGRhdGVkID0ge307XG4gIGxldCB0b1JlcGxhY2UgPSBbXTtcbiAgbGV0IG1heElkeCA9IDA7XG4gIGxldCBrZXk7XG5cbiAgZm9yIChrZXkgaW4gbm9kZSB8fCB7fSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGtleSwgMTApO1xuXG4gICAgaWYgKCEocGFyc2VkIHx8IHBhcnNlZCA9PT0gMCkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHJvdyA9IGdldFJvdyhub2RlLCBrZXkpIHx8IFtwYXJzZWQsIG51bGwsIG51bGxdO1xuICAgIGNvbnN0IFtpZHgsIGlkID0gbnVsbCwgcmF3VmFsdWUgPSBudWxsXSA9IHJvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgcm93W1BPU19WQUxdID0gcmF3VmFsdWUgPT09IG51bGwgPyBudWxsIDogcGFyc2VGbG9hdChyYXdWYWx1ZSk7XG4gICAgaWYgKGlkICYmIHJlbW92ZWRbaWRdKSByb3dbUE9TX0lEXSA9IHJvd1tQT1NfVkFMXSA9IG51bGw7XG4gICAgaWYgKGlkKSBieUlkW2lkXSA9IHJvdztcbiAgICBpZiAocm93W1BPU19JRF0pIHtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b1JlcGxhY2UucHVzaChyb3cpO1xuICAgIH1cbiAgICBpZiAoaWR4ID4gbWF4SWR4KSBtYXhJZHggPSBpZHg7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFtpZCwgdmFsdWVdID0gdXBkYXRlZEl0ZW1zW2ldIHx8IFtudWxsLCBudWxsXTtcblxuICAgIGlmICghaWQpIGNvbnRpbnVlO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gYnlJZFtpZF07XG5cbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGlmIChleGlzdGluZ1tQT1NfVkFMXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZXhpc3RpbmdbUE9TX1ZBTF0gPSB2YWx1ZTtcbiAgICAgICAgdXBkYXRlZFtpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByb3cgPSBbbnVsbCwgaWQsIHZhbHVlXTtcblxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWxsU29ydGVkID0gc29ydFJvd3Mocm93cyk7XG4gIGNvbnN0IHNvcnRlZCA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UoMCwgbWF4U2l6ZSkgOiBhbGxTb3J0ZWQ7XG4gIGNvbnN0IG1pc3NpbmcgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKG1heFNpemUsIGFsbFNvcnRlZC5sZW5ndGgpIDogW107XG4gIGNvbnN0IGFkZGVkID0gUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSA9PT0gbnVsbCwgc29ydGVkKTtcblxuICB0b1JlcGxhY2UgPSB0b1JlcGxhY2VcbiAgICAuY29uY2F0KFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gIT09IG51bGwsIG1pc3NpbmcpKVxuICAgIC5yZXZlcnNlKCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpZCA9IHNvcnRlZFtpXVtQT1NfSURdO1xuICAgIGNvbnN0IGlkeCA9IHNvcnRlZFtpXVtQT1NfSURYXTtcbiAgICBjb25zdCB2YWwgPSBzb3J0ZWRbaV1bUE9TX1ZBTF07XG5cbiAgICBpZiAoaWR4ICE9PSBudWxsICYmIHVwZGF0ZWRbaWRdKSBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtpZCwgdmFsXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIGNvbnN0IGluc2VydGVkID0gW107XG5cbiAgd2hpbGUgKGFkZGVkLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IGFkZGVkLnBvcCgpO1xuICAgIGNvbnN0IHJlcGxhY2VkID0gdG9SZXBsYWNlLnBvcCgpO1xuICAgIGxldCBbaWR4XSA9IHJlcGxhY2VkIHx8IFtudWxsXTtcblxuICAgIGlmIChpZHggPT09IG51bGwpIHtcbiAgICAgIGlkeCA9IHBhcnNlSW50KG1heElkeCwgMTApICsgaW5zZXJ0ZWQubGVuZ3RoICsgMTtcbiAgICAgIGluc2VydGVkLnB1c2goaWR4KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtyb3dbUE9TX0lEXSwgcm93W1BPU19WQUxdXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIHdoaWxlICh0b1JlcGxhY2UubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gdG9SZXBsYWNlLnBvcCgpO1xuXG4gICAgaWYgKHJvdyAmJiAhcm93W1BPU19JRF0pIHtcbiAgICAgIGNvbnN0IGlkeCA9IGAke3Jvd1tQT1NfSURYXX1gO1xuXG4gICAgICBpZiAobm9kZVtpZHhdICE9PSBudWxsKSB7XG4gICAgICAgIGNoYW5nZXNbaWR4XSA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibnVsbGluZ1wiLCBpZHgsIG5vZGVbaWR4XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFIua2V5cyhjaGFuZ2VzKS5sZW5ndGggPyBjaGFuZ2VzIDogbnVsbDtcbn07XG5cbmNvbnN0IGNhdGVnb3JpemVEaWZmID0gKGRpZmYsIG9yaWdpbmFsKSA9PiB7XG4gIGNvbnN0IGFsbEtleXMgPSBpdGVtS2V5cyhSLm1lcmdlTGVmdChkaWZmLCBvcmlnaW5hbCkpO1xuICBjb25zdCBhZGRlZCA9IFtdO1xuICBjb25zdCByZW1vdmVkID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gYWxsS2V5c1tpXTtcbiAgICBjb25zdCBbX2RpZmZJZHgsIGRpZmZJZF0gPSBnZXRSb3coZGlmZiwga2V5KSB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGNvbnN0IFtfb3JpZ0lkeCwgb3JpZ0lkXSA9IGdldFJvdyhvcmlnaW5hbCwga2V5KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgaWYgKGRpZmZJZCAhPT0gb3JpZ0lkKSB7XG4gICAgICBpZiAoZGlmZklkKSBhZGRlZC5wdXNoKGRpZmZJZCk7XG4gICAgICBpZiAob3JpZ0lkKSByZW1vdmVkLnB1c2gob3JpZ0lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2FkZGVkLCByZW1vdmVkXTtcbn07XG5cbmNvbnN0IHVuaW9uUm93cyA9IFIuY29tcG9zZShcbiAgUi51bmlxQnkoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5yZWR1Y2UoUi5jb25jYXQsIFtdKSxcbiAgUi5tYXAocm93cylcbik7XG5cbmNvbnN0IHJvd3NGcm9tU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzKSA9PlxuICBQcm9taXNlLmFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSkudGhlbih1bmlvblJvd3MpXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyIH0gPSBvcHRzIHx8IHt9O1xuXG4gIHJldHVybiByb3dzRnJvbVNvdWxzKHNjb3BlLCBbc291bEZyb21QYXRoKGluZGV4ZXIsIHBhdGgpXSkudGhlbihyb3dzVG9JZHMpO1xufSwgXCJsaXN0aW5nUm93c1wiKTtcblxuY29uc3QgZ2V0ID0gcXVlcnkoXG4gIChzY29wZSwgc291bCkgPT4gKHNvdWwgPyBzY29wZS5nZXQoc291bCkgOiByZXNvbHZlKG51bGwpKSxcbiAgXCJsaXN0aW5nXCJcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nTm9kZSA9IHtcbiAgUE9TX0lEWCxcbiAgUE9TX0lELFxuICBQT1NfVkFMLFxuICBzb3VyY2UsXG4gIGdldCxcbiAgZ2V0Um93LFxuICBpdGVtS2V5cyxcbiAgc2VyaWFsaXplLFxuICByb3dzLFxuICBpZHMsXG4gIGlkVG9Tb3VsLFxuICBpZHNUb1NvdWxzLFxuICBzb3VsVG9JZCxcbiAgc291bHNUb0lkcyxcbiAgcm93c1RvSWRzLFxuICByb3dzVG9JdGVtcyxcbiAgaXRlbXNUb1Jvd3MsXG4gIHNvcnRSb3dzLFxuICBzb3J0ZWRJZHMsXG4gIHNvdWxGcm9tUGF0aCxcbiAgcGF0aEZyb21Tb3VsLFxuICByb3dzRnJvbVNvdWxzLFxuICByZWFkLFxuICBkaWZmLFxuICBjYXRlZ29yaXplRGlmZixcbiAgdW5pb25Sb3dzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuY29uc3QgdXBkYXRlTGlzdGluZyA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgc2NvcGUsXG4gIHNwZWMsXG4gIGlkcyA9IFtdLFxuICByZW1vdmVJZHMgPSBbXVxuKSA9PiB7XG4gIGlmICghaWRzLmxlbmd0aCAmJiAhcmVtb3ZlSWRzLmxlbmd0aCkgcmV0dXJuO1xuICBjb25zdCBleGlzdGluZyA9IGF3YWl0IG9yYy5uZXdTY29wZSgpLmdldChyb3V0ZS5zb3VsKTtcbiAgY29uc3QgdXBkYXRlZEl0ZW1zID0gYXdhaXQgTGlzdGluZ1NvcnQudG9JdGVtcyhzY29wZSwgaWRzLCBzcGVjKTtcbiAgY29uc3QgY2hhbmdlcyA9IGF3YWl0IExpc3RpbmdOb2RlLmRpZmYoZXhpc3RpbmcsIHVwZGF0ZWRJdGVtcywgcmVtb3ZlSWRzKTtcblxuICBpZiAoY2hhbmdlcykgY29uc29sZS5sb2coXCJDSEFOR0VTXCIsIHJvdXRlLnNvdWwsIGNoYW5nZXMpO1xuICBpZiAoY2hhbmdlcykgcm91dGUud3JpdGUoY2hhbmdlcyk7XG59O1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChvcmMsIHJvdXRlLCB7IHNvdWwsIHVwZGF0ZWRTb3VsLCBkaWZmLCAuLi5wcm9wcyB9KSA9PiB7XG4gIGxldCB1cGRhdGVkSWRzID0gW107XG5cbiAgY29uc3QgcGF0aCA9IExpc3RpbmdOb2RlLnBhdGhGcm9tU291bChzb3VsKTtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCk7XG5cbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgaXNTdGlja3kgPSBSLmVxdWFscyhyb3V0ZS5tYXRjaC50aGluZ0lkIHx8IG51bGwpO1xuXG4gIGlmICh0aGluZ0lkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIHVwZGF0ZWRJZHMgPSBSLmNvbmNhdCh1cGRhdGVkSWRzLCBUaGluZ1NldC5pZHMoR3VuTm9kZS5kZWNvZGVTRUEoZGlmZikpKTtcblxuICBhd2FpdCB1cGRhdGVMaXN0aW5nKG9yYywgcm91dGUsIHNjb3BlLCBzcGVjLCB1cGRhdGVkSWRzLCBbXSwgaXNTdGlja3kpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ09yYWNsZSA9IHtcbiAgdXBkYXRlTGlzdGluZyxcbiAgb25QdXRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5jb25zdCBjYWxjdWxhdGVSb3dzID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3Qgc3RpY2t5SXRlbXMgPSBSLm1hcChpZCA9PiBbaWQsIC1JbmZpbml0eV0sIHNwZWMuc3RpY2t5SWRzKTtcblxuICBpZiAoIXNwZWMuZGF0YVNvdXJjZS5xdWVyeSkgcmV0dXJuIHJlc29sdmUoW10pO1xuICByZXR1cm4gc3BlYy5kYXRhU291cmNlLnF1ZXJ5KHNjb3BlKS50aGVuKGl0ZW1zID0+IHtcbiAgICBjb25zdCByb3dzID0gTGlzdGluZ05vZGUuaXRlbXNUb1Jvd3MoWy4uLnN0aWNreUl0ZW1zLCAuLi5pdGVtc10pO1xuXG4gICAgcmV0dXJuIExpc3RpbmdGaWx0ZXIuZ2V0RmlsdGVyZWRSb3dzKHNjb3BlLCBzcGVjLCByb3dzLCB7XG4gICAgICAuLi5vcHRzLFxuICAgICAgZmlsdGVyRm5cbiAgICB9KTtcbiAgfSk7XG59KTtcblxuY29uc3QgY2FsY3VsYXRlID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHt9KTtcblxuY29uc3QgdG9Ob2RlID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzKSA9PlxuICBjYWxjdWxhdGVSb3dzKHNjb3BlLCBzcGVjLCBvcHRzKS50aGVuKFxuICAgIFIuY29tcG9zZShcbiAgICAgIExpc3RpbmdOb2RlLnNlcmlhbGl6ZShzcGVjKSxcbiAgICAgIExpc3RpbmdOb2RlLnJvd3NUb0l0ZW1zXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3QgcGF0aHMgPSBSLnBhdGhPcihbXSwgW1wiZGF0YVNvdXJjZVwiLCBcImxpc3RpbmdQYXRoc1wiXSwgc3BlYyk7XG4gIGNvbnN0IHN0aWNreVJvd3MgPSBSLm1hcChpZCA9PiBbLTEsIGlkLCAtSW5maW5pdHldLCBzcGVjLnN0aWNreUlkcyk7XG4gIGNvbnN0IHNvdWxzID0gUi5tYXAoXG4gICAgTGlzdGluZ05vZGUuc291bEZyb21QYXRoKG9wdHMuaW5kZXhlciB8fCBzcGVjLmluZGV4ZXIpLFxuICAgIHBhdGhzXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdOb2RlLnJvd3NGcm9tU291bHMoc2NvcGUsIHNvdWxzKS50aGVuKHJvd3MgPT5cbiAgICBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCBzcGVjLCBbLi4uc3RpY2t5Um93cywgLi4ucm93c10sIHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICBmaWx0ZXJGblxuICAgIH0pXG4gICk7XG59KTtcblxuY29uc3QgZnJvbVNwZWMgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT5cbiAgKG9wdHMuY2FsY3VsYXRlID8gY2FsY3VsYXRlIDogcmVhZCkoc2NvcGUsIHNwZWMsIG9wdHMpXG4pO1xuXG5jb25zdCBmcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT4ge1xuICBjb25zdCB0eXBlID0gTGlzdGluZ1R5cGUuZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgcmV0dXJuIHR5cGUuZ2V0U3BlYyhzY29wZSwgdHlwZS5tYXRjaCkudGhlbihzcGVjID0+IHtcbiAgICBpZiAoc3BlYy5oYXNJbmRleGVyICYmICFvcHRzLmNhbGN1bGF0ZSkge1xuICAgICAgaWYgKCF0eXBlIHx8ICF0eXBlLnJlYWQpIHJldHVybiBMaXN0aW5nTm9kZS5yZWFkKHNjb3BlLCBwYXRoLCBvcHRzKTtcbiAgICAgIHJldHVybiB0eXBlLnJlYWQoc2NvcGUsIHR5cGUubWF0Y2gsIG9wdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbVNwZWMoc2NvcGUsIHNwZWMsIG9wdHMpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBub2RlRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+XG4gIExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCkudGhlbihzcGVjID0+XG4gICAgdG9Ob2RlKHNjb3BlLCBzcGVjLCBSLm1lcmdlTGVmdChvcHRzLCB7IGxpbWl0OiBDb25zdGFudHMuTElTVElOR19TSVpFIH0pKVxuICApXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1F1ZXJ5ID0ge1xuICBmcm9tU3BlYyxcbiAgZnJvbVBhdGgsXG4gIGNhbGN1bGF0ZVJvd3MsXG4gIHRvTm9kZSxcbiAgbm9kZUZyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcblxuY29uc3QgW1BPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMV07XG5jb25zdCB0b0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHNvcnRJdGVtcyA9IFIuc29ydEJ5KFIucHJvcChQT1NfVkFMKSk7XG5cbmNvbnN0IHZvdGVTb3J0ID0gZm4gPT4gcXVlcnkoKHNjb3BlLCB0aGluZ0lkLCBzcGVjKSA9PiB7XG4gIGlmIChzcGVjLmlzSWRTdGlja3kodGhpbmdJZCkpIHJldHVybiByZXNvbHZlKC1JbmZpbml0eSk7XG4gIGlmIChSLmNvbnRhaW5zKHRoaW5nSWQsIHNwZWMuZmlsdGVycy5hbGxvdy5vcHMpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuXG4gIHJldHVybiBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHNjb3JlczogdHJ1ZSxcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KVxuICB9KS50aGVuKHJlcyA9PiBmbihyZXMsIHNwZWMpKTtcbn0pO1xuXG5jb25zdCB0aW1lU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT5cbiAgUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KVxuICB9KS50aGVuKGZuKVxuKTtcblxuY29uc3Qgc29ydHMgPSB7XG4gIG5ldzogdGltZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5tdWx0aXBseSgtMSksXG4gICAgICBSLmRlZmF1bHRUbygwKSxcbiAgICAgIFIucHJvcChcInRpbWVzdGFtcFwiKSxcbiAgICApXG4gICksXG4gIG9sZDogdGltZVNvcnQoUi5wcm9wKFwidGltZXN0YW1wXCIpKSxcbiAgYWN0aXZlOiB2b3RlU29ydChcbiAgICAoeyB0aW1lc3RhbXAsIGxhc3RBY3RpdmUgfSkgPT4gLTEgKiAobGFzdEFjdGl2ZSB8fCB0aW1lc3RhbXApXG4gICksXG4gIHRvcDogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlSW50KHgsIDEwKSxcbiAgICAgIFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0pXG4gICAgKVxuICApLFxuICBjb21tZW50czogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlRmxvYXQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdKVxuICAgIClcbiAgKSxcbiAgZGlzY3Vzc2VkOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiY29tbWVudFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcblxuICAgIGlmICghc2NvcmUpIHJldHVybiAxMDAwMDAwMDAwIC0gc2Vjb25kcztcbiAgICByZXR1cm4gLTEgKiAob3JkZXIgKyBzZWNvbmRzIC8gNDUwMDApO1xuICB9KSxcbiAgaG90OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lc3RhbXAgLyAxMDAwIC0gMTEzNDAyODAwMztcbiAgICBjb25zdCBvcmRlciA9IE1hdGgubG9nMTAoTWF0aC5tYXgoTWF0aC5hYnMoc2NvcmUpLCAxKSk7XG4gICAgbGV0IHNpZ24gPSAwO1xuXG4gICAgaWYgKHNjb3JlID4gMCkge1xuICAgICAgc2lnbiA9IDE7XG4gICAgfSBlbHNlIGlmIChzY29yZSA8IDApIHtcbiAgICAgIHNpZ24gPSAtMTtcbiAgICB9XG4gICAgcmV0dXJuIC0xICogKHNpZ24gKiBvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBiZXN0OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IG4gPSB1cHMgKyBkb3ducztcblxuICAgIGlmIChuID09PSAwKSByZXR1cm4gMDtcbiAgICBjb25zdCB6ID0gMS4yODE1NTE1NjU1NDU7IC8vIDgwJSBjb25maWRlbmNlXG4gICAgY29uc3QgcCA9IHVwcyAvIG47XG4gICAgY29uc3QgbGVmdCA9IHAgKyAoMSAvICgyICogbikpICogeiAqIHo7XG4gICAgY29uc3QgcmlnaHQgPSB6ICogTWF0aC5zcXJ0KChwICogKDEgLSBwKSkgLyBuICsgKHogKiB6KSAvICg0ICogbiAqIG4pKTtcbiAgICBjb25zdCB1bmRlciA9IDEgKyAoMSAvIG4pICogeiAqIHo7XG5cbiAgICByZXR1cm4gLTEgKiAoKGxlZnQgLSByaWdodCkgLyB1bmRlcik7XG4gIH0pLFxuICBjb250cm92ZXJzaWFsOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuXG4gICAgaWYgKHVwcyA8PSAwIHx8IGRvd25zIDw9IDApIHJldHVybiAwO1xuICAgIGNvbnN0IG1hZ25pdHVkZSA9IHVwcyArIGRvd25zO1xuICAgIGNvbnN0IGJhbGFuY2UgPSB1cHMgPiBkb3ducyA/IGRvd25zIC8gdXBzIDogdXBzIC8gZG93bnM7XG5cbiAgICByZXR1cm4gLTEgKiBtYWduaXR1ZGUgKiogYmFsYW5jZTtcbiAgfSlcbn07XG5cbmNvbnN0IGlzVmFsaWRTb3J0ID0gc29ydCA9PiAhIXNvcnRzW3NvcnRdO1xuXG5jb25zdCB0b0l0ZW0gPSBxdWVyeShcbiAgKHNjb3BlLCBpZCwgc3BlYykgPT5cbiAgICAoc29ydHNbc3BlYy5zb3J0XSB8fCBzb3J0cy5uZXcpKHNjb3BlLCBpZCwgc3BlYykudGhlbih2YWwgPT4gW2lkLCB2YWxdKVxuKTtcblxuY29uc3QgaXRlbUZyb21Tb3VsID0gKHNjb3BlLCBzb3VsLCBzcGVjKSA9PiB0b0l0ZW0oc2NvcGUsIExpc3RpbmdOb2RlLnNvdWxUb0lkKHNvdWwpLCBzcGVjKTtcblxuY29uc3QgdG9JdGVtcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkcywgc3BlYykgPT4gYWxsKFIubWFwKFxuICAgIGlkID0+IHRvSXRlbShzY29wZSwgaWQsIHNwZWMpLFxuICAgIGlkc1xuICApKVxuKTtcblxuY29uc3QgZnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWxzLCBzcGVjKSA9PlxuICAgIGFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSlcbiAgICAgIC50aGVuKFIucGlwZShcbiAgICAgICAgVGhpbmdTZXQudW5pb24sXG4gICAgICAgIFRoaW5nU2V0LmlkcyxcbiAgICAgICAgaWRzID0+IHRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYylcbiAgICAgICkpXG4gICAgICAudGhlbihzb3J0SXRlbXMpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1NvcnQgPSB7XG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc29ydHMsXG4gIGlzVmFsaWRTb3J0LFxuICB0b0l0ZW0sXG4gIHRvSXRlbXMsXG4gIHRvSWRzLFxuICBpdGVtRnJvbVNvdWwsXG4gIHNvcnRJdGVtcyxcbiAgZnJvbVRoaW5nU2V0c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuXG5jb25zdCBmcm9tU291cmNlID0gUi5jb21wb3NlKFxuICBSLmFwcGx5KFIubWVyZ2VMZWZ0KSxcbiAgUi5hcChbTGlzdGluZ0ZpbHRlci5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBSLmFwcGx5KFIuYXNzb2MoXCJkYXRhU291cmNlXCIpKSxcbiAgUi5hcChbTGlzdGluZ0RhdGFTb3VyY2UuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgTGlzdGluZ0RlZmluaXRpb24uZnJvbVNvdXJjZVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEgPSBcIlwiKSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIG5hbWUpXG4gICAgLnRoZW4oUi5jb21wb3NlKFxuICAgICAgYm9keSA9PiBgJHtib2R5fVxuIyBhZGRlZCBieSBpbmRleGVyXG4ke2V4dHJhIHx8IFwiXCJ9XG5zb3VyY2VkIGZyb20gcGFnZSAke2F1dGhvcklkfSAke25hbWV9XG5gLFxuICAgICAgVGhpbmdEYXRhTm9kZS5ib2R5XG4gICAgKSlcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU3BlYyA9IHsgZnJvbVNvdXJjZSwgZ2V0U291cmNlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy9jaGF0XCI7XG5jb25zdCB0YWJzID0gWyAuLi5Ub3BpY0xpc3RpbmcudGFicywgXCJjaGF0XCIgXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjaGF0OnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogbm9ybWFsVG9waWNzWzBdIHx8IFwid2hhdGV2ZXJcIjtcbiAgY29uc3QgdG9waWNzID0gbm9ybWFsVG9waWNzLnJlZHVjZShcbiAgICAocmVzLCB0b3BpYykgPT4gWy4uLnJlcywgYGNoYXQ6JHt0b3BpY31gXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNoYXRcIixcbiAgICBbXG4gICAgICBcInNvcnQgbmV3XCIsXG4gICAgICBcImRpc3BsYXkgYXMgY2hhdFwiLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENoYXRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjb21tZW50czpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdGhpbmdJZCwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNvbW1lbnRzXCIsXG4gICAgW2BvcCAke3RoaW5nSWR9YCwgYHNvcnQgJHtzb3J0fWBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL2NvbW1lbnRlZC86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y29tbWVudGVkOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNvbW1lbnRlZFwiLFxuICAgIFtcbiAgICAgIGBjdXJhdG9yICR7YXV0aG9ySWR9YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudGVkTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgZ2V0U2lkZWJhciwgZ2V0U291cmNlLCBnZXRTcGVjIH0pO1xuXG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvZG9tYWluLzpkb21haW4vOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6ZG9tYWluOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBkb21haW4sIHNvcnQgfSkgPT4ge1xuICBjb25zdCBkb21haW5zID0gUGF0aC5zcGxpdFRvcGljcyhkb21haW4pO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmRvbWFpblwiLFxuICAgIFtcbiAgICAgIGBuYW1lICR7ZG9tYWluc1swXX1gLFxuICAgICAgXCJzdWJtaXQgdG8gd2hhdGV2ZXJcIixcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgXCJraW5kIHN1Ym1pc3Npb25cIixcbiAgICAgIC4uLlIubWFwKGRvbWFpbiA9PiBgZG9tYWluICR7ZG9tYWlufWAsIGRvbWFpbnMpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC9kb21haW4vJHtkb21haW59LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBEb21haW5MaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICB0YWJzLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvZmlyZWhvc2VcIjtcbmNvbnN0IHRhYnMgPSBUb3BpY0xpc3RpbmcudGFicztcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmZpcmVob3NlOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogbm9ybWFsVG9waWNzWzBdIHx8IFwid2hhdGV2ZXJcIjtcbiAgY29uc3QgdG9waWNzID0gbm9ybWFsVG9waWNzLnJlZHVjZShcbiAgICAocmVzLCB0b3BpYykgPT4gWy4uLnJlcywgdG9waWMsIGBjaGF0OiR7dG9waWN9YCwgYGNvbW1lbnRzOiR7dG9waWN9YF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpmaXJlaG9zZVwiLFxuICAgIFtcbiAgICAgIFwic29ydCBuZXdcIixcbiAgICAgIFwiZGlzcGxheSBhcyBjaGF0XCIsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRmlyZWhvc2VMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICB0YWJzLFxuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi8uLi9UaGluZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvcmVwbGllcy86dHlwZS86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6dG9waWM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCB0eXBlLCBzb3J0ID0gXCJuZXdcIiB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmluYm94XCIsXG4gICAgW2ByZXBsaWVzIHRvIGF1dGhvciAke2F1dGhvcklkfWAsIFwia2luZCBjb21tZW50XCIsIGB0eXBlICR7dHlwZX1gLCBgc29ydCAke3NvcnR9YF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyB1cGRhdGVkU291bCwgZGlmZiB9KSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IGRpZmZEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEoZGlmZik7XG4gIGNvbnN0IFt1cGRhdGVkQXV0aG9yZWRdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoZGlmZkRhdGEpO1xuICBjb25zdCBzcGVjID0gYXdhaXQgZ2V0U3BlYyhzY29wZSwgcm91dGUubWF0Y2gpO1xuICBsZXQgdXBkYXRlZElkcyA9IFRoaW5nU2V0LmlkcyhkaWZmRGF0YSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkQXV0aG9yZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBvcElkID0gdXBkYXRlZEF1dGhvcmVkW2ldO1xuICAgIGNvbnN0IHJlcGx5SWRzID0gVGhpbmdTZXQuaWRzKFxuICAgICAgYXdhaXQgc2NvcGVcbiAgICAgICAgLmdldChTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3BJZCB9KSlcbiAgICAgICAgLnRoZW4oKVxuICAgICk7XG5cbiAgICB1cGRhdGVkSWRzID0gdXBkYXRlZElkcy5jb25jYXQocmVwbHlJZHMpO1xuICB9XG5cbiAgaWYgKHVwZGF0ZWRJZHMubGVuZ3RoKVxuICAgIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10pO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC86dHlwZS86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcIm92ZXJ2aWV3XCIsIFwiY29tbWVudHNcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tYW5kc1wiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnByb2ZpbGU6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6cHJvZmlsZVwiLFxuICAgIFtcbiAgICAgIGBhdXRob3IgJHthdXRob3JJZH1gLFxuICAgICAgYHR5cGUgJHt0eXBlfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdXNlci8ke2F1dGhvcklkfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgUXVlcnkudXNlck1ldGEoc2NvcGUsIG1hdGNoLmF1dGhvcklkKS50aGVuKG1ldGEgPT5cbiAgICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKFIucGlwZShcbiAgICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2UsXG4gICAgICBSLm1lcmdlTGVmdCh7XG4gICAgICAgIHByb2ZpbGVJZDogbWF0Y2guYXV0aG9ySWQsXG4gICAgICAgIGRpc3BsYXlOYW1lOiBSLnByb3BPcihcIlwiLCBcImFsaWFzXCIsIG1ldGEpXG4gICAgICB9KVxuICAgICkpXG4pKTtcblxuZXhwb3J0IGNvbnN0IFByb2ZpbGVMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICB0YWJzLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uLy4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5pbXBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi4vU3BhY2VTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRcIjtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFNwYWNlU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNwZWMoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBTcGFjZVNwZWMuc2lkZWJhclBhZ2VOYW1lKG5hbWUpKVxuKTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHsgdXBkYXRlZFNvdWwsIGRpZmYsIG9yaWdpbmFsLCBsYXRlc3QgPSAwIH1cbikgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuXG4gIGNvbnN0IG9yaWdpbmFsRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKG9yaWdpbmFsKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRJZHMsIHJlbW92ZWRJZHNdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoXG4gICAgZGlmZkRhdGEsXG4gICAgb3JpZ2luYWxEYXRhXG4gICk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IHZvdGVDb3VudHNNYXRjaCA9IFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB0aGluZ01hdGNoID0gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgYXV0aG9yTWF0Y2ggPSBTY2hlbWEuU0VBQXV0aG9yLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcblxuICBpZiAodm90ZUNvdW50c01hdGNoKSB1cGRhdGVkSWRzLnB1c2godm90ZUNvdW50c01hdGNoLnRoaW5nSWQpO1xuICBpZiAodGhpbmdNYXRjaCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ0lkICYmIHRoaW5nSWQgIT09IHNwZWMuZnJvbVBhZ2VJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICBhd2FpdCBMaXN0aW5nT3JhY2xlLnVwZGF0ZUxpc3RpbmcoXG4gICAgb3JjLFxuICAgIHJvdXRlLFxuICAgIHNjb3BlLFxuICAgIHNwZWMsXG4gICAgdXBkYXRlZElkcyxcbiAgICByZW1vdmVkSWRzXG4gICk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbiAgaWYgKFxuICAgIFIucHJvcChcInNpemVcIiwgb3JpZ2luYWwpIHx8XG4gICAgdXBkYXRlZElkcy5sZW5ndGggfHxcbiAgICByZW1vdmVkSWRzLmxlbmd0aCB8fFxuICAgIGF1dGhvck1hdGNoXG4gIClcbiAgICByZXR1cm47XG5cbiAgLy8gYmFzZSBsb2dpYyBmcm9tIGd1bi1jbGVyaWMtc2NvcGUgbmVlZHMgdG8gYmUgZW5jYXBzdWFsdGVkIGJldHRlcj9cbiAgY29uc29sZS5sb2coXCItLS1TVEFOREFSRCBTUEFDRSBVUERBVEUtLS1cIiwgcm91dGUuc291bCwgdXBkYXRlZFNvdWwpO1xuICBjb25zdCBub2RlID0gYXdhaXQgb3JjLm5ld1Njb3BlKCkuZ2V0KHJvdXRlLnNvdWwpO1xuICBjb25zdCBleGlzdGluZ0tleXMgPSBMaXN0aW5nTm9kZS5pdGVtS2V5cyhub2RlKTtcblxuICBpZiAoZXhpc3RpbmdLZXlzLmxlbmd0aCkge1xuICAgIHJvdXRlLndyaXRlKHtcbiAgICAgIHNpemU6IDAsXG4gICAgICAuLi5leGlzdGluZ0tleXMucmVkdWNlKChkaWZmLCBrZXkpID0+IHtcbiAgICAgICAgZGlmZltgJHtrZXl9YF0gPSBudWxsO1xuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgIH0sIHt9KVxuICAgIH0pO1xuICB9XG5cbiAgb3JjLndvcmsoe1xuICAgIGlkOiBgdXBkYXRlOiR7cm91dGUuc291bH1gLFxuICAgIHNvdWw6IHJvdXRlLnNvdWwsXG4gICAgbWV0aG9kOiBcImRvVXBkYXRlXCIsXG4gICAgcHJpb3JpdHk6IHJvdXRlLnByaW9yaXR5IHx8IDUwXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U291cmNlLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTcGVjLFxuICBvblB1dFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCIsIFwiZmlyZWhvc2VcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzp0b3BpYzpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCB0b3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpY3NbMF0gPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiB0b3BpY3NbMF07XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6dG9waWNcIixcbiAgICBbXG4gICAgICBgbmFtZSAke3RvcGljfWAsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgdG9waWMuaW5kZXhPZihcIjpcIikgPT09IC0xID8gXCJraW5kIHN1Ym1pc3Npb25cIiA6IFwiXCIsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oXG4gICAgUi5waXBlKFxuICAgICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSxcbiAgICAgIFIuYXNzb2MoXCJiYXNlUGF0aFwiLCBgL3QvJHttYXRjaC50b3BpY31gKVxuICAgIClcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IFRvcGljTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgdGFicyxcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENoYXRMaXN0aW5nIH0gZnJvbSBcIi4vQ2hhdExpc3RpbmdcIjtcbmltcG9ydCB7IEZpcmVob3NlTGlzdGluZyB9IGZyb20gXCIuL0ZpcmVob3NlTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudGVkTGlzdGluZyB9IGZyb20gXCIuL0NvbW1lbnRlZExpc3RpbmdcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuaW1wb3J0IHsgRG9tYWluTGlzdGluZyB9IGZyb20gXCIuL0RvbWFpbkxpc3RpbmdcIjtcbmltcG9ydCB7IENvbW1lbnRMaXN0aW5nIH0gZnJvbSBcIi4vQ29tbWVudExpc3RpbmdcIjtcbmltcG9ydCB7IFNwYWNlTGlzdGluZyB9IGZyb20gXCIuL1NwYWNlTGlzdGluZ1wiO1xuaW1wb3J0IHsgSW5ib3hMaXN0aW5nIH0gZnJvbSBcIi4vSW5ib3hMaXN0aW5nXCI7XG5pbXBvcnQgeyBQcm9maWxlTGlzdGluZyB9IGZyb20gXCIuL1Byb2ZpbGVMaXN0aW5nXCI7XG5cbmNvbnN0IHR5cGVzID0ge1xuICBDaGF0TGlzdGluZyxcbiAgRmlyZWhvc2VMaXN0aW5nLFxuICBUb3BpY0xpc3RpbmcsXG4gIERvbWFpbkxpc3RpbmcsXG4gIENvbW1lbnRMaXN0aW5nLFxuICBTcGFjZUxpc3RpbmcsXG4gIEluYm94TGlzdGluZyxcbiAgQ29tbWVudGVkTGlzdGluZyxcbiAgUHJvZmlsZUxpc3Rpbmdcbn07XG5cbmNvbnN0IHR5cGVzQXJyYXkgPSBSLnZhbHVlcyh0eXBlcyk7XG5cbmNvbnN0IGZyb21QYXRoID0gcGF0aCA9PiB7XG4gIGxldCBtYXRjaDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBtYXRjaCA9IHR5cGVzQXJyYXlbaV0ucm91dGUubWF0Y2gocGF0aCk7XG4gICAgaWYgKG1hdGNoKSByZXR1cm4gUi5hc3NvYyhcIm1hdGNoXCIsIG1hdGNoLCB0eXBlc0FycmF5W2ldKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHNpZGViYXJGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCkgPT4ge1xuICBjb25zdCB0eXBlID0gZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlIHx8ICF0eXBlLmdldFNpZGViYXIpIHJldHVybiByZXNvbHZlKFwiXCIpO1xuICByZXR1cm4gdHlwZS5nZXRTaWRlYmFyKHNjb3BlLCB0eXBlLm1hdGNoKTtcbn0pO1xuXG5jb25zdCBzcGVjRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgpID0+IHtcbiAgY29uc3QgdHlwZSA9IGZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBmaW5kIHR5cGUgZm9yIHBhdGg6ICR7cGF0aH1gKTtcblxuICByZXR1cm4gdHlwZS5nZXRTcGVjKHNjb3BlLCB0eXBlLm1hdGNoKS50aGVuKGJhc2VTcGVjID0+IHtcbiAgICBsZXQgc3BlYyA9IGJhc2VTcGVjO1xuXG4gICAgaWYgKHR5cGUubWF0Y2guc29ydCA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwicGF0aFwiLCB0eXBlLnJvdXRlLnJldmVyc2UoUi5hc3NvYyhcInNvcnRcIiwgc3BlYy5zb3J0LCB0eXBlLm1hdGNoKSksIHNwZWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGVjID0gUi5hc3NvYyhcInBhdGhcIiwgcGF0aCwgYmFzZVNwZWMpO1xuICAgIH1cblxuICAgIGlmIChzcGVjLnN1Ym1pdFRvcGljICYmICFzcGVjLnN1Ym1pdFBhdGgpIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwic3VibWl0UGF0aFwiLCBgL3QvJHtzcGVjLnN1Ym1pdFRvcGljfS9zdWJtaXRgLCBzcGVjKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BlYztcbiAgfSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdUeXBlID0ge1xuICAuLi50eXBlcyxcbiAgdHlwZXMsXG4gIGZyb21QYXRoLFxuICBzaWRlYmFyRnJvbVBhdGgsXG4gIHNwZWNGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuXG5jb25zdCBzcGxpdERvbWFpbnMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIitcIiksXG4gIFIudG9Mb3dlcixcbiAgUi50cmltLFxuICBSLmRlZmF1bHRUbyhcIlwiKVxuKTtcblxuY29uc3Qgc3BsaXRUb3BpY3MgPSBSLmNvbXBvc2UoXG4gIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoW1wiYWxsXCJdKSksXG4gIHNwbGl0RG9tYWluc1xuKTtcblxuY29uc3Qgd2l0aFJvdXRlID0gb2JqID0+IFIuYXNzb2MoXCJyb3V0ZVwiLCBuZXcgUm91dGUob2JqLnBhdGgpLCBvYmopO1xuXG5leHBvcnQgY29uc3QgUGF0aCA9IHsgc3BsaXREb21haW5zLCBzcGxpdFRvcGljcywgd2l0aFJvdXRlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcbmNvbnN0IGNvbmZpZ1BhZ2VOYW1lID0gbmFtZSA9PiBgc3BhY2U6JHtuYW1lfWA7XG5jb25zdCBzaWRlYmFyUGFnZU5hbWUgPSBuYW1lID0+IGBzcGFjZToke25hbWV9OnNpZGViYXJgO1xuXG5jb25zdCBzb3VyY2VXaXRoRGVmYXVsdHMgPSBSLmN1cnJ5KChvd25lcklkLCBuYW1lLCBzb3VyY2UpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtzb3VyY2UgfHwgXCJcIl07XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuXG4gIGlmICghdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpKSB7XG4gICAgdGFicy5tYXAodGFiID0+XG4gICAgICByZXN1bHQucHVzaChgdGFiICR7dGFifSAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke25hbWV9LyR7dGFifWApXG4gICAgKTtcbiAgfVxuXG4gIGxldCBpbmRleGVyID0gdG9rZW5pemVkLmdldFZhbHVlKFwiaW5kZXhlclwiKTtcblxuICBpZiAoIWluZGV4ZXIpIHtcbiAgICByZXN1bHQucHVzaChgaW5kZXhlciAke0NvbmZpZy5pbmRleGVyfWApO1xuICAgIGluZGV4ZXIgPSBDb25maWcuaW5kZXhlcjtcbiAgfVxuXG4gIGxldCB0YWJ1bGF0b3IgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIik7XG5cbiAgaWYgKCF0YWJ1bGF0b3IpIHJlc3VsdC5wdXNoKGB0YWJ1bGF0b3IgJHtpbmRleGVyfWApO1xuXG4gIHJldHVybiByZXN1bHQuam9pbihcIlxcblwiKTtcbn0pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgY29uZmlnUGFnZU5hbWUobmFtZSksIGV4dHJhKS50aGVuKFxuICAgIHNvdXJjZVdpdGhEZWZhdWx0cyhhdXRob3JJZCwgbmFtZSlcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkudGhlbihzb3VyY2UgPT5cbiAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlKHNvdXJjZSwgYXV0aG9ySWQsIG5hbWUpXG4gIClcbik7XG5cbmNvbnN0IG5vZGVUb1NwYWNlTmFtZXMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLm1hcChSLnJlcGxhY2UoL15zcGFjZTovLCBcIlwiKSksXG4gIFIuZmlsdGVyKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcImxlbmd0aFwiKSxcbiAgICAgIFIubWF0Y2goL15zcGFjZTpbXjpdKiQvKVxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCB1c2VyU3BhY2VOYW1lcyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQpID0+XG4gIFF1ZXJ5LnVzZXJQYWdlcyhzY29wZSwgYXV0aG9ySWQpLnRoZW4obm9kZVRvU3BhY2VOYW1lcylcbik7XG5cbmV4cG9ydCBjb25zdCBTcGFjZVNwZWMgPSB7XG4gIGNvbmZpZ1BhZ2VOYW1lLFxuICBzaWRlYmFyUGFnZU5hbWUsXG4gIG5vZGVUb1NwYWNlTmFtZXMsXG4gIHVzZXJTcGFjZU5hbWVzLFxuICB0YWJzLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn07XG4iLCJpbXBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuZXhwb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuZXhwb3J0IHsgTGlzdGluZ0RlZmluaXRpb24gfSBmcm9tIFwiLi9MaXN0aW5nRGVmaW5pdGlvblwiO1xuZXhwb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmV4cG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmV4cG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi9MaXN0aW5nT3JhY2xlXCI7XG5leHBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmV4cG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmV4cG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmV4cG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcbmV4cG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuL1NwYWNlU3BlY1wiO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZyA9IHtcbiAgLi4uTGlzdGluZ1R5cGUudHlwZXMsXG4gIExpc3RpbmdOb2RlLFxuICBMaXN0aW5nU3BlYyxcbiAgaXNWYWxpZFNvcnQ6IExpc3RpbmdTb3J0LmlzVmFsaWRTb3J0LFxuICBpZHNUb1NvdWxzOiBMaXN0aW5nTm9kZS5pZHNUb1NvdWxzLFxuICBnZXQ6IExpc3RpbmdOb2RlLmdldCxcbiAgZnJvbVNwZWM6IExpc3RpbmdRdWVyeS5mcm9tU3BlYyxcbiAgZnJvbVBhdGg6IExpc3RpbmdRdWVyeS5mcm9tUGF0aCxcbiAgdHlwZUZyb21QYXRoOiBMaXN0aW5nVHlwZS5mcm9tUGF0aCxcbiAgc2lkZWJhckZyb21QYXRoOiBMaXN0aW5nVHlwZS5zaWRlYmFyRnJvbVBhdGgsXG4gIHNwZWNGcm9tUGF0aDogTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoLFxuICBub2RlRnJvbVBhdGg6IExpc3RpbmdRdWVyeS5ub2RlRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmcsIExpc3RpbmdTcGVjLCBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdcIjtcblxuY29uc3Qgd2lraVBhZ2UgPSBSLm1lcmdlTGVmdCh7XG4gIHdpdGhNYXRjaDogKHsgcGFyYW1zOiB7IGF1dGhvcklkID0gQ29uZmlnLm93bmVyLCBuYW1lIH0gfSkgPT4gKHtcbiAgICBwcmVsb2FkOiBzY29wZSA9PiBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIG5hbWUpXG4gIH0pXG59KTtcblxuY29uc3Qgd2l0aExpc3RpbmdNYXRjaCA9IChwYXRoLCBwYXJhbXMpID0+IHtcbiAgaWYgKCFwYXRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByZWxvYWQ6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoe30pKSksXG4gICAgICBzaWRlYmFyOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKFwiXCIpKSksXG4gICAgICBzcGFjZTogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShMaXN0aW5nU3BlYy5mcm9tU291cmNlKFwiXCIpKSkpLFxuICAgICAgaWRzOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKFtdKSkpXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHJlYWxRdWVyeSA9IHF1ZXJ5KFxuICAgIChzY29wZSwgb3B0cyA9IHt9KSA9PiBMaXN0aW5nLmZyb21QYXRoKHNjb3BlLCBwYXRoLCBvcHRzKSxcbiAgICBgaWRzOiR7cGF0aH1gXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICBwcmVsb2FkOiBzY29wZSA9PiBwcmVsb2FkTGlzdGluZyhzY29wZSwgcGF0aCwgcGFyYW1zKSxcbiAgICBzaWRlYmFyOiBxdWVyeShcbiAgICAgIHNjb3BlID0+IExpc3Rpbmcuc2lkZWJhckZyb21QYXRoKHNjb3BlLCBwYXRoKSxcbiAgICAgIGBzaWRlYmFyOiR7cGF0aH1gXG4gICAgKSxcbiAgICBzcGFjZTogcXVlcnkoc2NvcGUgPT4gTGlzdGluZy5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgpKSxcbiAgICBpZHM6IHF1ZXJ5KChzY29wZSwgb3B0cyA9IHt9KSA9PlxuICAgICAgcmVhbFF1ZXJ5KHNjb3BlLCBSLm1lcmdlTGVmdChvcHRzLCBwYXJhbXMpKVxuICAgIClcbiAgfTtcbn07XG5cbmNvbnN0IHByZWxvYWRMaXN0aW5nID0gYXN5bmMgKHNjb3BlLCBwYXRoLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgbWF0Y2ggPSB3aXRoTGlzdGluZ01hdGNoKHBhdGgsIHBhcmFtcyk7XG4gIGxldCBbc3BlYywgaWRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBtYXRjaC5zcGFjZShzY29wZSksXG4gICAgbWF0Y2guaWRzKHNjb3BlLCB7fSksXG4gICAgbWF0Y2guc2lkZWJhcihzY29wZSlcbiAgXSk7XG5cbiAgaWYgKCFzcGVjKSBzcGVjID0gTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShcIlwiKTtcblxuICBjb25zdCB0aGluZ1NvdWxzID0gTGlzdGluZy5pZHNUb1NvdWxzKGlkcyk7XG4gIGNvbnN0IFt0aGluZ3NdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIFF1ZXJ5Lm11bHRpVGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgICB0aGluZ1NvdWxzLFxuICAgICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLFxuICAgICAgc2NvcmVzOiB0cnVlLFxuICAgICAgZGF0YTogdHJ1ZVxuICAgIH0pLFxuICAgIC4uLlIubWFwKFxuICAgICAgaWQgPT4gUXVlcnkudXNlck1ldGEoc2NvcGUsIGlkKSxcbiAgICAgIFIudW5pcShbc3BlYyAmJiBzcGVjLmluZGV4ZXIsIHNwZWMgJiYgc3BlYy5vd25lciwgc3BlYyAmJiBzcGVjLnRhYnVsYXRvcl0pXG4gICAgKVxuICBdKTtcbiAgY29uc3Qgb3BJZHMgPSBSLmNvbXBvc2UoXG4gICAgUi53aXRob3V0KGlkcyksXG4gICAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gICAgUi51bmlxLFxuICAgIFIubWFwKFIucGF0aE9yKG51bGwsIFtcImRhdGFcIiwgXCJvcElkXCJdKSlcbiAgKSh0aGluZ3MpO1xuXG4gIGlmIChvcElkcy5sZW5ndGgpIHtcbiAgICBjb25zdCBvcFNvdWxzID0gTGlzdGluZy5pZHNUb1NvdWxzKG9wSWRzKTtcblxuICAgIGF3YWl0IFF1ZXJ5Lm11bHRpVGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgICB0aGluZ1NvdWxzOiBvcFNvdWxzLFxuICAgICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLFxuICAgICAgZGF0YTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHNwZWMuY2hhdFRvcGljKSB7XG4gICAgY29uc3QgY2hhdFBhdGggPSBgL3QvJHtzcGVjLmNoYXRUb3BpY30vY2hhdGA7XG5cbiAgICBpZiAoY2hhdFBhdGggIT09IHBhdGgpXG4gICAgICBhd2FpdCBwcmVsb2FkTGlzdGluZyhzY29wZSwgYC90LyR7c3BlYy5jaGF0VG9waWN9L2NoYXRgLCB7fSk7XG4gIH1cblxuICByZXR1cm4gc2NvcGUuZ2V0Q2FjaGUoKTtcbn07XG5cbmNvbnN0IGxpc3RpbmcgPSAoe1xuICBwcmVmaXg6IGRlZmF1bHRQcmVmaXggPSBcInRcIixcbiAgaWRlbnRpZmllcjogZGVmYXVsdElkZW50aWZpZXIgPSBcImFsbFwiLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiaG90XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgcHJlZml4ID0gZGVmYXVsdFByZWZpeCxcbiAgICAgIGlkZW50aWZpZXIgPSBkZWZhdWx0SWRlbnRpZmllcixcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT4gd2l0aExpc3RpbmdNYXRjaChgLyR7cHJlZml4fS8ke2lkZW50aWZpZXJ9LyR7c29ydH1gLCBxdWVyeSlcbn0pO1xuXG5jb25zdCB0aGluZ0NvbW1lbnRzID0gKHtcbiAgcHJlZml4OiBkZWZhdWx0UHJlZml4ID0gXCJ0XCIsXG4gIGlkZW50aWZpZXI6IGRlZmF1bHRJZGVudGlmaWVyID0gXCJhbGxcIixcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImJlc3RcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBvcElkLFxuICAgICAgcHJlZml4ID0gZGVmYXVsdFByZWZpeCxcbiAgICAgIGlkZW50aWZpZXIgPSBkZWZhdWx0SWRlbnRpZmllcixcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuQ29tbWVudExpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRoaW5nSWQ6IG9wSWQsXG4gICAgICAgIHNvcnRcbiAgICAgIH0pLFxuICAgICAgUi5hc3NvYyhcImxpbWl0XCIsIDEwMDAsIHF1ZXJ5KVxuICAgIClcbn0pO1xuXG5jb25zdCBzcGFjZUxpc3RpbmcgPSAoe1xuICBuYW1lOiBkZWZhdWx0TmFtZSA9IFwiZGVmYXVsdFwiLFxuICBhdXRob3JJZDogZGVmYXVsdEF1dGhvcklkLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiZGVmYXVsdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIGF1dGhvcklkID0gZGVmYXVsdEF1dGhvcklkLFxuICAgICAgbmFtZSA9IGRlZmF1bHROYW1lLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5TcGFjZUxpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIGF1dGhvcklkOiBhdXRob3JJZCB8fCBDb25maWcub3duZXIsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNvcnRcbiAgICAgIH0pLFxuICAgICAgcXVlcnlcbiAgICApXG59KTtcblxuY29uc3Qgc3BhY2VUaGluZ0NvbW1lbnRzID0gKHtcbiAgbmFtZTogZGVmYXVsdE5hbWUgPSBcImRlZmF1bHRcIixcbiAgYXV0aG9ySWQ6IGRlZmF1bHRBdXRob3JJZCxcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImhvdFwiLFxuICAuLi5yZXN0XG59KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBvcElkLFxuICAgICAgYXV0aG9ySWQgPSBkZWZhdWx0QXV0aG9ySWQsXG4gICAgICBuYW1lID0gZGVmYXVsdE5hbWUsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+IHtcbiAgICBjb25zdCBzcGFjZVBhdGggPSBMaXN0aW5nVHlwZS5TcGFjZUxpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogYXV0aG9ySWQgfHwgQ29uZmlnLm93bmVyLFxuICAgICAgbmFtZSxcbiAgICAgIHNvcnRcbiAgICB9KTtcbiAgICBjb25zdCBsaXN0aW5nUGF0aCA9IExpc3RpbmdUeXBlLkNvbW1lbnRMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogb3BJZCxcbiAgICAgIHNvcnRcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBzcGFjZTogcXVlcnkoXG4gICAgICAgIHNjb3BlID0+IExpc3Rpbmcuc3BlY0Zyb21QYXRoKHNjb3BlLCBzcGFjZVBhdGgsIHF1ZXJ5KSxcbiAgICAgICAgYHNwZWM6JHtzcGFjZVBhdGh9YFxuICAgICAgKSxcbiAgICAgIGlkczogcXVlcnkoXG4gICAgICAgIHNjb3BlID0+IExpc3RpbmcuZnJvbVBhdGgoc2NvcGUsIGxpc3RpbmdQYXRoLCBxdWVyeSksXG4gICAgICAgIGxpc3RpbmdQYXRoXG4gICAgICApLFxuICAgICAgcHJlbG9hZDogc2NvcGUgPT4gcHJlbG9hZExpc3Rpbmcoc2NvcGUsIGxpc3RpbmdQYXRoLCBxdWVyeSlcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvZmlsZSA9ICh7XG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJuZXdcIixcbiAgdHlwZTogZGVmYXVsdFR5cGUgPSBcIm92ZXJ2aWV3XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczogeyBhdXRob3JJZCwgdHlwZSA9IGRlZmF1bHRUeXBlLCBzb3J0ID0gZGVmYXVsdFNvcnQgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5Qcm9maWxlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5jb25zdCBpbmJveCA9ICh7XG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJuZXdcIixcbiAgdHlwZTogZGVmYXVsdFR5cGUgPSBcIm92ZXJ2aWV3XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIGF1dGhvcklkLFxuICAgIHBhcmFtczogeyB0eXBlID0gZGVmYXVsdFR5cGUsIHNvcnQgPSBkZWZhdWx0U29ydCB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLkluYm94TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5leHBvcnQgY29uc3QgUGFnZSA9IHtcbiAgd2l0aExpc3RpbmdNYXRjaCxcbiAgcHJlbG9hZExpc3RpbmcsXG4gIHdpa2lQYWdlLFxuICB0aGluZ0NvbW1lbnRzLFxuICBsaXN0aW5nLFxuICBzcGFjZUxpc3RpbmcsXG4gIHNwYWNlVGhpbmdDb21tZW50cyxcbiAgcHJvZmlsZSxcbiAgaW5ib3hcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gXCIuL1ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSBcIi4vQXV0aGVudGljYXRpb25cIjtcblxuZnVuY3Rpb24gaW5pdChHdW4sIGNvbmZpZyA9IHt9KSB7XG4gIGNvbnN0IHsgbGVlY2gsIGRpc2FibGVWYWxpZGF0aW9uLCBub0d1biwgbG9jYWxTdG9yYWdlLCBwZXJzaXN0LCAuLi5yZXN0IH0gPVxuICAgIGNvbmZpZyB8fCB7fTtcbiAgY29uc3QgcGVlciA9IHsgY29uZmlnIH07XG5cbiAgaWYgKCFub0d1bikge1xuICAgIGNvbnN0IGNmZyA9IHsgbG9jYWxTdG9yYWdlOiAhIWxvY2FsU3RvcmFnZSwgcmFkaXNrOiAhIXBlcnNpc3QsIC4uLnJlc3QgfTtcblxuICAgIGlmIChwZXJzaXN0KSBjZmcubG9jYWxTdG9yYWdlID0gZmFsc2U7XG4gICAgaWYgKCFkaXNhYmxlVmFsaWRhdGlvbikgR3VuLm9uKFwib3B0XCIsIFZhbGlkYXRpb24uZ3VuV2lyZUlucHV0KHBlZXIpKTtcbiAgICBpZiAoY2ZnLnN0b3JlRm4pIGNmZy5zdG9yZSA9IGNmZy5zdG9yZUZuKGNmZyk7IC8vIGZvciBpbmRleGVkZGJcbiAgICBwZWVyLmd1biA9IEd1bihjZmcpO1xuICAgIGlmIChjZmcubG9jYWxTdG9yYWdlKSBwZWVyLmd1bi5vbihcImxvY2FsU3RvcmFnZTplcnJvclwiLCBhID0+IGEucmV0cnkoe30pKTtcbiAgICBpZiAobGVlY2gpIHtcbiAgICAgIGNvbnN0IHNlbmRMZWVjaCA9ICgpID0+IHBlZXIuZ3VuLl8ub24oXCJvdXRcIiwgeyBsZWVjaDogdHJ1ZSB9KTtcblxuICAgICAgc2VuZExlZWNoKCk7XG4gICAgfVxuICB9XG5cbiAgcGVlci5uZXdTY29wZSA9IG9wdHMgPT4gUXVlcnkuY3JlYXRlU2NvcGUocGVlciwgb3B0cyk7XG4gIHBlZXIub25Mb2dpbiA9IEF1dGhlbnRpY2F0aW9uLm9uTG9naW4ocGVlcik7XG4gIHBlZXIuc2lnbnVwID0gQXV0aGVudGljYXRpb24uc2lnbnVwKHBlZXIpO1xuICBwZWVyLmxvZ2luID0gQXV0aGVudGljYXRpb24ubG9naW4ocGVlcik7XG4gIHBlZXIubG9nb3V0ID0gKCkgPT4gQXV0aGVudGljYXRpb24ubG9nb3V0KHBlZXIpO1xuICBwZWVyLmlzTG9nZ2VkSW4gPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluKHBlZXIpO1xuICBwZWVyLnN1Ym1pdCA9IFRoaW5nLnN1Ym1pdChwZWVyKTtcbiAgcGVlci5jb21tZW50ID0gVGhpbmcuY29tbWVudChwZWVyKTtcbiAgcGVlci5jaGF0ID0gVGhpbmcuY2hhdChwZWVyKTtcbiAgcGVlci53cml0ZVBhZ2UgPSBUaGluZy53cml0ZVBhZ2UocGVlcik7XG4gIHBlZXIudm90ZSA9IFRoaW5nLnZvdGUocGVlcik7XG4gIHBlZXIucXVlcmllcyA9IFF1ZXJ5O1xuICByZXR1cm4gcGVlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFBlZXIgPSB7XG4gIGluaXRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgc2NvcGUgYXMgbWFrZVNjb3BlLCBxdWVyeSwgYWxsLCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nL0xpc3RpbmdOb2RlXCI7XG5cbmNvbnN0IGVtcHR5UHJvbWlzZSA9IHJlc29sdmUobnVsbCk7XG5jb25zdCB1bmlvbkFycmF5cyA9IFIucmVkdWNlKFIudW5pb24sIFtdKTtcblxuY29uc3QgdG9waWNTb3VscyA9IHBhcmFtcyA9PiB7XG4gIGNvbnN0IHsgdG9waWNzID0gW1wiYWxsXCJdIH0gPSBwYXJhbXMgfHwge307XG4gIGNvbnN0IGRheXMgPSBSLnByb3BPcigzNjUsIFwiZGF5c1wiLCBwYXJhbXMpIHx8IDM2NTtcbiAgY29uc3QgZGF5U3RyaW5ncyA9IFtdO1xuICBjb25zdCBvbmVEYXkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gb25lRGF5ICogcGFyc2VJbnQoZGF5cywgMTApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IGRheXMgKyAxOyBpKyspXG4gICAgZGF5U3RyaW5ncy5wdXNoKFRoaW5nU2V0LmRheVN0cihzdGFydCArIGkgKiBvbmVEYXkpKTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKFxuICAgIHRvcGljcy5yZWR1Y2UoXG4gICAgICAocmVzdWx0LCB0b3BpY05hbWUpID0+XG4gICAgICAgIGRheVN0cmluZ3MucmVkdWNlKChyZXMsIGRzKSA9PiB7XG4gICAgICAgICAgcmVzW2Ake0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy8ke3RvcGljTmFtZX0vZGF5cy8ke2RzfWBdID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LCByZXN1bHQpLFxuICAgICAge31cbiAgICApXG4gICk7XG59O1xuXG5jb25zdCBzaW5nbGVUb3BpYyA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHRTb3VscyA9IHRvcGljU291bHMoeyAuLi5wYXJhbXMsIHRvcGljczogW3BhcmFtcy50b3BpY10gfSk7XG4gIGxldCBzb3VscyA9IFtdO1xuICBsZXQgaXRlbU1heCA9IENvbnN0YW50cy5MSVNUSU5HX1NJWkU7XG5cbiAgaWYgKHBhcmFtcy5zb3J0ID09PSBcIm5ld1wiKSB7XG4gICAgaXRlbU1heCA9IENvbnN0YW50cy5MSVNUSU5HX1NJWkU7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBhcmFtcy5zb3J0ID09PSBcInRvcFwiKSBpdGVtTWF4ID0gaXRlbU1heCAqIDM7XG4gICAgaWYgKHBhcmFtcy50b3BpYyA9PT0gXCJhbGxcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICB9XG5cbiAgY29uc3QgZmV0Y2hNb3JlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvcGljU291bCA9IHRTb3Vscy5wb3AoKTtcblxuICAgIGlmIChzb3Vscy5sZW5ndGggPiBpdGVtTWF4IHx8ICF0b3BpY1NvdWwpIHJldHVybiByZXNvbHZlKHNvdWxzKTtcbiAgICByZXR1cm4gc2NvcGVcbiAgICAgIC5nZXQodG9waWNTb3VsKVxuICAgICAgLnNvdWxzKClcbiAgICAgIC50aGVuKG1vcmUgPT4ge1xuICAgICAgICBzb3VscyA9IFsuLi5zb3VscywgLi4ubW9yZV07XG4gICAgICAgIHJldHVybiBmZXRjaE1vcmUoKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBmZXRjaE1vcmUoKTtcbn0pO1xuXG5jb25zdCBzaW5nbGVEb21haW4gPSBxdWVyeSgoc2NvcGUsIHsgZG9tYWluIH0pID0+XG4gIHNjb3BlLmdldChTY2hlbWEuRG9tYWluLnJvdXRlLnJldmVyc2UoeyBkb21haW5OYW1lOiBkb21haW4gfSkpLnNvdWxzKClcbik7XG5cbmNvbnN0IHNpbmdsZUF1dGhvciA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBhbGwoW1xuICAgIHBhcmFtcy50eXBlICYmIHBhcmFtcy50eXBlICE9PSBcInN1Ym1pdHRlZFwiICYmIHBhcmFtcy50eXBlICE9PSBcIm92ZXJ2aWV3XCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KGB+JHtwYXJhbXMuYXV0aG9ySWR9YClcbiAgICAgICAgICAuZ2V0KFwic3VibWlzc2lvbnNcIilcbiAgICAgICAgICAuc291bHMoKSxcbiAgICBwYXJhbXMudHlwZSAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1lbnRzXCIgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwiY29tbWFuZHNcIlxuICAgICAgPyByZXNvbHZlKFtdKVxuICAgICAgOiBzY29wZVxuICAgICAgICAgIC5nZXQoYH4ke3BhcmFtcy5hdXRob3JJZH1gKVxuICAgICAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgICAgIC5zb3VscygpXG4gIF0pLnRoZW4oKFtzdWJtaXNzaW9ucywgY29tbWVudHNdKSA9PiB1bmlvbkFycmF5cyhbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkpXG4pO1xuXG5jb25zdCBsaXN0aW5nSWRzID0gcXVlcnkoXG4gIChzY29wZSwgc291bCkgPT4gc2NvcGUuZ2V0KHNvdWwpLnRoZW4oTGlzdGluZ05vZGUuc29ydGVkSWRzKSxcbiAgXCJsaXN0aW5nSWRzXCJcbik7XG5cbmNvbnN0IHNpbmdsZUxpc3RpbmcgPSBxdWVyeSgoc2NvcGUsIHsgbGlzdGluZywgc29ydCwgaW5kZXhlciB9KSA9PlxuICBsaXN0aW5nSWRzKHNjb3BlLCBgJHtDb25zdGFudHMuUFJFRklYfSR7bGlzdGluZ30vJHtzb3J0fUB+JHtpbmRleGVyfS5gKS50aGVuKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubWFwKHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKSxcbiAgICAgIFIuZmlsdGVyKFIuaWRlbnRpdHkpXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCByZXBsaWVzVG9BdXRob3IgPSBxdWVyeShcbiAgKHNjb3BlLCB7IHJlcGxpZXNUb0F1dGhvcklkLCB0eXBlID0gXCJvdmVydmlld1wiLCAuLi5wYXJhbXMgfSkgPT5cbiAgICBzaW5nbGVMaXN0aW5nKHNjb3BlLCB7XG4gICAgICBsaXN0aW5nOiBgL3VzZXIvJHtyZXBsaWVzVG9BdXRob3JJZH0vJHt0eXBlfWAsXG4gICAgICBzb3J0OiBcIm5ld1wiLFxuICAgICAgLi4ucGFyYW1zXG4gICAgfSkudGhlbihhdXRob3JlZFNvdWxzID0+XG4gICAgICBhbGwoXG4gICAgICAgIGF1dGhvcmVkU291bHMubWFwKGF1dGhvcmVkU291bCA9PlxuICAgICAgICAgIHNjb3BlLmdldChgJHthdXRob3JlZFNvdWx9L2NvbW1lbnRzYCkuc291bHMoKVxuICAgICAgICApXG4gICAgICApLnRoZW4odW5pb25BcnJheXMpXG4gICAgKVxuKTtcblxuY29uc3Qgc2luZ2xlU3VibWlzc2lvbiA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBzY29wZVxuICAgIC5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KVxuICAgIClcbiAgICAuc291bHMoXG4gICAgICBSLnByZXBlbmQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBwYXJhbXMuc3VibWlzc2lvbklkIH0pKVxuICAgIClcbik7XG5cbmNvbnN0IHRoaW5nID0gcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gIHNjb3BlLmdldCh0aGluZ1NvdWwpLnRoZW4obWV0YSA9PiB7XG4gICAgaWYgKCFtZXRhIHx8ICFtZXRhLmlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCByZXN1bHQgPSB7IGlkOiBtZXRhLmlkLCB0aW1lc3RhbXA6IHBhcnNlRmxvYXQobWV0YS50aW1lc3RhbXAsIDEwKSB9O1xuICAgIGNvbnN0IHJlcGx5VG9Tb3VsID0gUi5wYXRoKFtcInJlcGx5VG9cIiwgXCIjXCJdLCBtZXRhKTtcbiAgICBjb25zdCBvcFNvdWwgPSBSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBtZXRhKTtcbiAgICBjb25zdCBvcElkID0gb3BTb3VsID8gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKG9wU291bCkudGhpbmdpZCA6IG51bGw7XG4gICAgY29uc3QgcmVwbHlUb0lkID0gcmVwbHlUb1NvdWxcbiAgICAgID8gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHJlcGx5VG9Tb3VsKS50aGluZ2lkXG4gICAgICA6IG51bGw7XG5cbiAgICBpZiAob3BJZCkgcmVzdWx0Lm9wSWQgPSBvcElkO1xuICAgIGlmIChyZXBseVRvSWQpIHJlc3VsdC5yZXBseVRvSWQgPSByZXBseVRvSWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IG11bHRpUXVlcnkgPSAoc2luZ2xlUXVlcnksIHBsdXJhbCwgc2luZ2xlLCBjb2xsYXRlID0gdW5pb25BcnJheXMpID0+XG4gIHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBSLnByb3AocGx1cmFsLCBwYXJhbXMpO1xuXG4gICAgaWYgKFIuaXNOaWwoaXRlbXMpKSByZXR1cm4gZW1wdHlQcm9taXNlO1xuICAgIHJldHVybiBhbGwoXG4gICAgICBSLm1hcChcbiAgICAgICAgdmFsID0+IHNpbmdsZVF1ZXJ5KHNjb3BlLCB7IC4uLnBhcmFtcywgW3NpbmdsZV06IHZhbCB9KSxcbiAgICAgICAgUi5wcm9wT3IoW10sIHBsdXJhbCwgcGFyYW1zKVxuICAgICAgKVxuICAgICkudGhlbihjb2xsYXRlKTtcbiAgfSk7XG5cbmNvbnN0IG11bHRpVG9waWMgPSBtdWx0aVF1ZXJ5KHNpbmdsZVRvcGljLCBcInRvcGljc1wiLCBcInRvcGljXCIpO1xuY29uc3QgbXVsdGlEb21haW4gPSBtdWx0aVF1ZXJ5KHNpbmdsZURvbWFpbiwgXCJkb21haW5zXCIsIFwiZG9tYWluXCIpO1xuY29uc3QgbXVsdGlBdXRob3IgPSBtdWx0aVF1ZXJ5KHNpbmdsZUF1dGhvciwgXCJhdXRob3JJZHNcIiwgXCJhdXRob3JJZFwiKTtcbmNvbnN0IG11bHRpU3VibWlzc2lvbiA9IG11bHRpUXVlcnkoXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIFwic3VibWlzc2lvbklkc1wiLFxuICBcInN1Ym1pc3Npb25JZFwiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGFGcm9tU291bHMgPSBzY29wZSA9PiBzb3VscyA9PlxuICBhbGwoXG4gICAgc291bHNcbiAgICAgIC5maWx0ZXIoeCA9PiAhIXgpXG4gICAgICAubWFwKHNvdWwgPT5cbiAgICAgICAgc2NvcGVcbiAgICAgICAgICAuZ2V0KHNvdWwpXG4gICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAudGhlbih4ID0+IHgpXG4gICAgICApXG4gICk7XG5cbmNvbnN0IGN1cmF0ZWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkcywgc3VibWlzc2lvbk9ubHkgPSBmYWxzZSkgPT5cbiAgYWxsKFtcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJjb21tZW50c1wiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSlcbiAgICAgIC50aGVuKHRoaW5nRGF0YUZyb21Tb3VscyhzY29wZSkpXG4gICAgICAudGhlbihcbiAgICAgICAgUi5jb21wb3NlKFxuICAgICAgICAgIFIubWFwKHN1Ym1pc3Npb25Pbmx5ID8gUi5wcm9wKFwib3BJZFwiKSA6IFIucHJvcChcInJlcGx5VG9JZFwiKSksXG4gICAgICAgICAgUi5maWx0ZXIoUi5wcm9wKFwicmVwbHlUb0lkXCIpKVxuICAgICAgICApXG4gICAgICApLFxuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcInN1Ym1pdHRlZFwiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSkudGhlbihSLm1hcChzb3VsID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChzb3VsKS50aGluZ0lkKSlcbiAgXSkudGhlbigoW2lkczEsIGlkczJdKSA9PiBSLnVuaXEoWy4uLmlkczEsIC4uLmlkczJdKSlcbik7XG5cbmNvbnN0IHRoaW5nU2NvcmVzID0gcXVlcnkoXG4gIChzY29wZSwgdGFidWxhdG9yLCB0aGluZ0lkKSA9PlxuICAgIHRhYnVsYXRvciAmJiB0aGluZ0lkXG4gICAgICA/IHNjb3BlXG4gICAgICAgICAgLmdldChTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCB0YWJ1bGF0b3IgfSkpXG4gICAgICAgICAgLnRoZW4oKVxuICAgICAgOiByZXNvbHZlKCksXG4gIFwidGhpbmdTY29yZXNcIlxuKTtcblxuY29uc3QgdGhpbmdEYXRhID0gcXVlcnkoKHNjb3BlLCB0aGluZ0lkKSA9PiB7XG4gIHJldHVybiB0aGluZ0lkXG4gICAgPyBzY29wZS5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKS5nZXQoXCJkYXRhXCIpXG4gICAgOiByZXNvbHZlKG51bGwpO1xufSwgXCJ0aGluZ0RhdGFcIik7XG5cbmNvbnN0IHRoaW5nTWV0YSA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgdGhpbmdTb3VsLCB0YWJ1bGF0b3IsIGRhdGEgPSBmYWxzZSwgc2NvcmVzID0gZmFsc2UgfSkgPT4ge1xuICAgIGlmICghdGhpbmdTb3VsKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICBjb25zdCBpZCA9IExpc3RpbmdOb2RlLnNvdWxUb0lkKHRoaW5nU291bCk7XG5cbiAgICByZXR1cm4gYWxsKFtcbiAgICAgIHRoaW5nKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgICAgc2NvcmVzXG4gICAgICAgID8gdGhpbmdTY29yZXMoc2NvcGUsIHRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLCBpZClcbiAgICAgICAgOiByZXNvbHZlKCksXG4gICAgICBkYXRhID8gdGhpbmdEYXRhKHNjb3BlLCBpZCkgOiByZXNvbHZlKClcbiAgICBdKS50aGVuKChbbWV0YSwgdm90ZXMsIGRhdGFdKSA9PiB7XG4gICAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHsgLi4ubWV0YSwgdm90ZXMsIGRhdGEgfTtcbiAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgbXVsdGlUaGluZ01ldGEgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFxuICAgIFIucmVkdWNlKFxuICAgICAgKHByb21pc2VzLCB0aGluZ1NvdWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiBwcm9taXNlcztcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGluZ01ldGEoc2NvcGUsIHsgLi4ucGFyYW1zLCB0aGluZ1NvdWwgfSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG4gICAgICB9LFxuICAgICAgW10sXG4gICAgICBSLnByb3BPcihbXSwgXCJ0aGluZ1NvdWxzXCIsIHBhcmFtcylcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHVzZXJQYWdlcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIGF1dGhvcklkKSA9PlxuICAgIHNjb3BlLmdldChTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkIH0pKSxcbiAgXCJ1c2VyUGFnZXNcIlxuKTtcblxuY29uc3Qgd2lraVBhZ2VJZCA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUpID0+IHtcbiAgaWYgKCFhdXRob3JJZCB8fCAhbmFtZSkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gIHJldHVybiBzY29wZVxuICAgIC5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSlcbiAgICAuZ2V0KG5hbWUpXG4gICAgLmdldChcImlkXCIpO1xufSwgXCJ3aWtpUGFnZUlkXCIpO1xuXG5jb25zdCB3aWtpUGFnZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUpID0+XG4gIHdpa2lQYWdlSWQoc2NvcGUsIGF1dGhvcklkLCBuYW1lKS50aGVuKGlkID0+IGlkICYmIHRoaW5nRGF0YShzY29wZSwgaWQpKVxuKTtcblxuY29uc3QgdXNlck1ldGEgPSBxdWVyeSgoc2NvcGUsIGlkKSA9PiB7XG4gIGlmICghaWQpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICByZXR1cm4gc2NvcGUuZ2V0KGB+JHtpZH1gKS50aGVuKG1ldGEgPT4gKHtcbiAgICBhbGlhczogUi5wcm9wKFwiYWxpYXNcIiwgbWV0YSksXG4gICAgY3JlYXRlZEF0OiBSLnBhdGgoW1wiX1wiLCBcIj5cIiwgXCJwdWJcIl0sIG1ldGEpXG4gIH0pKTtcbn0sIFwidXNlck1ldGFcIik7XG5cbmNvbnN0IGNyZWF0ZVNjb3BlID0gUi5jdXJyeSgobmFiLCBvcHRzKSA9PlxuICBtYWtlU2NvcGUoUi5hc3NvYyhcImd1blwiLCBuYWIuZ3VuLCBvcHRzIHx8IHt9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBRdWVyeSA9IHtcbiAgc2luZ2xlVG9waWMsXG4gIHNpbmdsZURvbWFpbixcbiAgc2luZ2xlQXV0aG9yLFxuICBzaW5nbGVMaXN0aW5nLFxuICByZXBsaWVzVG9BdXRob3IsXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIHRoaW5nTWV0YSxcbiAgbXVsdGlUaGluZ01ldGEsXG4gIG11bHRpVG9waWMsXG4gIG11bHRpRG9tYWluLFxuICBtdWx0aUF1dGhvcixcbiAgbXVsdGlTdWJtaXNzaW9uLFxuICB0aGluZ1Njb3JlcyxcbiAgdGhpbmdEYXRhLFxuICB0aGluZ0RhdGFGcm9tU291bHMsXG4gIHRvcGljU291bHMsXG4gIHVzZXJQYWdlcyxcbiAgd2lraVBhZ2VJZCxcbiAgd2lraVBhZ2UsXG4gIHVzZXJNZXRhLFxuICBjcmVhdGVTY29wZSxcbiAgY3VyYXRlZFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuaW1wb3J0ICogYXMgc2VhIGZyb20gXCJndW4tc3VwcHJlc3Nvci1zZWFyXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIC4uLnNlYS5BVVRIX1NDSEVNQSxcbiAgdG9waWNOYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtaW5MZW5ndGg6IDEsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RPUElDX1NJWkVcbiAgfSxcblxuICBUb3BpY0RheToge1xuICAgIHRpdGxlOiBcIlRvcGljIERheVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkEgc2luZ2xlIGRheSBvZiB0aGluZ3MgaW4gYSB0b3BpY1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy86dG9waWNOYW1lL2RheXMvOnllYXIvOm1vbnRoLzpkYXlgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgICAgeWVhcjogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAyMDE4LCBtYXhpbXVtOiAyMTAwIH0sXG4gICAgICAgIG1vbnRoOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDEyIH0sXG4gICAgICAgIGRheTogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAxLCBtYXhpbXVtOiAzMSB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljTmFtZVwiLCBcInllYXJcIiwgXCJtb250aFwiLCBcImRheVwiXVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBuYW1lOiBcInRvcGljTmFtZVwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbmFtZToge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXByZWNhdGVkIGFzIHVubmVjZXNzYXJ5XCIsXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG5cbiAgVG9waWM6IHtcbiAgICB0aXRsZTogXCJUb3BpY1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgaW4gYSB0b3BpY1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy86dG9waWNOYW1lYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWNOYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBkb21haW5OYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtaW5MZW5ndGg6IDEsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0RPTUFJTl9TSVpFXG4gIH0sXG5cbiAgRG9tYWluOiB7XG4gICAgdGl0bGU6IFwiRG9tYWluXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIGRvbWFpblwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2RvbWFpbnMvOmRvbWFpbk5hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkb21haW5OYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImRvbWFpbk5hbWVcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdXJsOiB7IHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9VUkxfU0laRSB9LFxuICBVUkw6IHtcbiAgICB0aXRsZTogXCJVUkxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGZvciBhIGdpdmVuIFVSTFwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VybHMvXFwqdXJsYCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cmw6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ1cmxcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdGhpbmdJZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0hBU0hfU0laRVxuICB9LFxuXG4gIHRoaW5nU291bDoge1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHRoaW5nSWQ6IHsgXCIjcmVmXCI6IFwiI2RlZmluaXRpb25zL3RoaW5nSWRcIiB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nQWxsQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBBbGwgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgY29tbWVudHMgZm9yIGEgZ2l2ZW4gc3VibWlzc2lvblwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9hbGxjb21tZW50c2AsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRGlyZWN0IHJlcGxpZXMgdG8gYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9jb21tZW50c2AsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdGltZXN0YW1wOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9LFxuICB0aGluZ0tpbmQ6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19LSU5EX1NJWkVcbiAgfSxcblxuICBUaGluZzoge1xuICAgIHRpdGxlOiBcIlRoaW5nIFJlZmVyZW5jZVwiLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJUaGVzZSBhcmUgc3VibWlzc2lvbnMsIGNvbW1lbnRzLCBjaGF0IG1lc3NhZ2VzIGFuZCB3aWtpIHBhZ2VzXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBpZDogXCJ0aGluZ0lkXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBraW5kOiB7IFwiI3JlZlwiOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfSxcbiAgICAgIG9yaWdpbmFsSGFzaDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG9uZU9mOiBbXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdEYXRhRWRnZVwiIH0sXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdEYXRhU2lnbmVkRWRnZVwiIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7XG4gICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb21lIG9sZCB0aGluZ3MgaGFkIGdlbmVyaWMgdG9waWMgc291bHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIFwiI1wiOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogNDIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBbXCIjXCJdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Eb21haW5FZGdlXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVVJMRWRnZVwiIH0sXG4gICAgICBjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQ29tbWVudHNcIiB9LFxuICAgICAgYWxsY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0FsbENvbW1lbnRzXCIgfSxcbiAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgdm90ZXNkb3duOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc0Rvd25cIiB9LFxuICAgICAgb3A6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICByZXBseVRvOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9TRUFBdXRob3JFZGdlXCIgfVxuICAgIH0sXG5cbiAgICBhbnlPZjogW1xuICAgICAge1xuICAgICAgICBhbGxPZjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaW5nSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhbnlPZjogW1xuICAgICAgICAgICAgICB7IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZzogdHJ1ZSB9LFxuICAgICAgICAgICAgICB7IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2g6IHRydWUgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHsgaXNMZWdhY3lUaGluZzogdHJ1ZSB9LFxuICAgICAge1xuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNlbGYgdmVyaWZ5aW5nIGNhbiBiZSB1cGRhdGVkIGluIGlzb2xhdGlvblwiLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgaWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICAgICAgYWxsY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0FsbENvbW1lbnRzXCIgfSxcbiAgICAgICAgICB2b3Rlc3VwOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc1VwXCIgfSxcbiAgICAgICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSxcblxuICBQcm9vZk9mV29ya1ZvdGVzOiB7XG4gICAgJGFzeW5jOiB0cnVlLFxuICAgIGtleXNBcmVQcm9vZnNPZldvcms6IHtcbiAgICAgIGFsZ29yaXRobTogXCJhcmdvbjJkXCIsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgY29tcGxleGl0eTogNixcbiAgICAgICAgaGFzaExlbmd0aDogMzIsXG4gICAgICAgIHRpbWVDb3N0OiAxLFxuICAgICAgICBtZW1vcnlDb3N0OiAxMDI0MCxcbiAgICAgICAgcGFyYWxsZWxpc206IDFcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3Rlc1VwOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVzdXBgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1Byb29mT2ZXb3JrVm90ZXNcIiB9XVxuICB9LFxuXG4gIFRoaW5nVm90ZXNEb3duOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVzZG93bmAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdEYXRhOiB7XG4gICAgdGl0bGU6IFwiVW5zaWduZWQgVGhpbmcgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgaXMgdGhlIGFjdHVhbCBjb250ZW50IG9mIGEgdGhpbmdcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvZGF0YWAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV0sXG4gICAgICByZXF1aXJlZDogW1widGhpbmdJZFwiXVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAga2luZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX1RJVExFX1NJWkVcbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0JPRFlfU0laRVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9LFxuICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgIG9wSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgcmVwbHlUb0lkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRvbWFpbjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0sXG4gICAgICB1cmw6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3VybFwiIH0sXG4gICAgICB0aW1lc3RhbXA6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH1cbiAgICB9LFxuICAgIHRoaW5nRGF0YUhhc2hNYXRjaGVzU291bDogdHJ1ZVxuICB9LFxuXG4gIFRoaW5nRGF0YVNpZ25lZDoge1xuICAgIHRpdGxlOiBcIlNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoaXMgaXMgdGhlIGFjdHVhbCBjb250ZW50IG9mIGEgdGhpbmcsIGNyeXB0b2dyYXBoaWNhbGx5IHNpZ25lZFwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widGhpbmdJZFwiLCBcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9IH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9waWM6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0gfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgc2VhOiB7XG4gICAgICAgICAgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUFsaWFzXCIgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcklkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0gfSxcbiAgICAgIG9wSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICByZXBseVRvSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICBkb21haW46IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9IH0sXG4gICAgICB1cmw6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VybFwiIH0gfSxcbiAgICAgIHRpbWVzdGFtcDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfSB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nVm90ZUNvdW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIFZvdGUgQ291bnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWdncmVnYXRlZCBjb3VudHMgZnJvbSBhIHRhYnVsYXRvclwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3RlY291bnRzQH46dGFidWxhdG9yLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIHRhYnVsYXRvcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgZG93bjogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGNvbW1lbnQ6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBzY29yZTogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGNvbW1hbmRzOiB7IHNlYTogeyB0eXBlOiBbXCJvYmplY3RcIiwgXCJzdHJpbmdcIl0gfSB9XG4gICAgfVxuICB9LFxuXG4gIExpc3RpbmdEYXRhOiB7XG4gICAgJGFzeW5jOiB0cnVlLFxuICAgIHRpdGxlOiBcIkxpc3RpbmcgTm9kZSBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU2hhcmVkIGRlc2NyaXB0aW9uIG9mIGxpc3RpbmcgcHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgLy8gWFhYOiB0aGVzZSBhcmUgYWxsIGRlcHJlY2F0ZWRcbiAgICAgIGlkczoge1xuICAgICAgICBkZWxldGVMZWdhY3k6IHRydWVcbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgZGVsZXRlTGVnYWN5OiB0cnVlXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICBkZWxldGVMZWdhY3k6IHRydWVcbiAgICAgIH0sXG4gICAgICBzdWJtaXRUb3BpYzoge1xuICAgICAgICBkZWxldGVMZWdhY3k6IHRydWVcbiAgICAgIH0sXG4gICAgICB0YWJzOiB7XG4gICAgICAgIGRlbGV0ZUxlZ2FjeTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGN1cmF0b3JzOiB7XG4gICAgICAgIGRlbGV0ZUxlZ2FjeTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGNlbnNvcnM6IHtcbiAgICAgICAgZGVsZXRlTGVnYWN5OiB0cnVlXG4gICAgICB9LFxuICAgICAgb3BJZDoge1xuICAgICAgICBkZWxldGVMZWdhY3k6IHRydWVcbiAgICAgIH0sXG4gICAgICBpc0NoYXQ6IHtcbiAgICAgICAgZGVsZXRlTGVnYWN5OiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICBwYXR0ZXJuUHJvcGVydGllczoge1xuICAgICAgXCJeZCskXCI6IHsgc2VhOiB7IHR5cGU6IFtcInN0cmluZ1wiLCBcIm51bGxcIiwgXCJ1bmRlZmluZWRcIl0gfSB9XG4gICAgfVxuICB9LFxuXG4gIHNvcnROYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXG4gICAgICBcIm5ld1wiLFxuICAgICAgXCJvbGRcIixcbiAgICAgIFwiYWN0aXZlXCIsXG4gICAgICBcInRvcFwiLFxuICAgICAgXCJjb21tZW50c1wiLFxuICAgICAgXCJkaXNjdXNzZWRcIixcbiAgICAgIFwiaG90XCIsXG4gICAgICBcImJlc3RcIixcbiAgICAgIFwiY29udHJvdmVyc2lhbFwiLFxuICAgICAgXCJyYW5kb21cIixcbiAgICAgIFwiZmlyZWhvc2VcIixcbiAgICAgIFwiY2hhdFwiXG4gICAgXVxuICB9LFxuXG4gIFRvcGljTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3QvOnRvcGljLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljXCIsIFwic29ydFwiLCBcImluZGV4ZXJcIl0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBEb21haW5MaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWluLzpkb21haW4vOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluXCIsIFwic29ydFwiLCBcImluZGV4ZXJcIl0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgVGhpbmdDb21tZW50c0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvY29tbWVudHMvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgdXNlckxpc3RpbmdUeXBlOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXCJvdmVydmlld1wiLCBcInN1Ym1pdHRlZFwiLCBcImNvbW1lbnRzXCIsIFwiY29tbWFuZHNcIiwgXCJjb21tZW50ZWRcIl1cbiAgfSxcblxuICBBdXRob3JSZXBsaWVzTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke1xuICAgICAgICBDb25zdGFudHMuUFJFRklYXG4gICAgICB9L3VzZXIvOmF1dGhvcklkL3JlcGxpZXMvOnR5cGUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICB0eXBlOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VzZXJMaXN0aW5nVHlwZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvclByb2ZpbGVMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXNlci86YXV0aG9ySWQvOnR5cGUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICB0eXBlOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VzZXJMaXN0aW5nVHlwZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFNwYWNlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke1xuICAgICAgICBDb25zdGFudHMuUFJFRklYXG4gICAgICB9L3VzZXIvOmF1dGhvcklkL3NwYWNlcy86bmFtZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIG5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgQXV0aG9yQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3JzIGNvbW1lbnRzIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2NvbW1lbnRzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JTdWJtaXNzaW9uczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFN1Ym1pc3Npb25zXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcidzIHN1Ym1pc3Npb25zIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3N1Ym1pc3Npb25zfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yVGhpbmdzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgVGhpbmdzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcidzIHRoaW5ncyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3N+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclBhZ2VzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yIFBhZ2UgTWFwXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTWFwcGluZyBvZiBwYWdlIG5hbWVzIHRvIHRoaW5nc1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3BhZ2VzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3Qgcm91dGVzID0gUi5rZXlzKGRlZmluaXRpb25zKS5yZWR1Y2UoKHJlc3VsdCwgbmFtZSkgPT4ge1xuICBjb25zdCBwYXR0ZXJuID0gUi5wYXRoKFtuYW1lLCBcInNvdWxcIiwgXCJwYXR0ZXJuXCJdLCBkZWZpbml0aW9ucyk7XG5cbiAgaWYgKCFwYXR0ZXJuKSByZXR1cm4gcmVzdWx0O1xuICByZXR1cm4gUi5hc3NvYyhuYW1lLCBuZXcgUm91dGUocGF0dGVybiksIHJlc3VsdCk7XG59KTtcblxuY29uc3QgZGVmc1dpdGhSb3V0ZXMgPSBSLmNvbXBvc2UoXG4gIFIucmVkdWNlKFxuICAgIChyZXMsIFtuYW1lLCByb3V0ZV0pID0+XG4gICAgICBSLmFzc29jKG5hbWUsIFIuYXNzb2MoXCJyb3V0ZVwiLCByb3V0ZSwgUi5wcm9wKG5hbWUsIGRlZmluaXRpb25zKSksIHJlcyksXG4gICAge31cbiAgKSxcbiAgUi50b1BhaXJzXG4pKHJvdXRlcyk7XG5cbmV4cG9ydCBjb25zdCBTY2hlbWEgPSB7XG4gIC4uLmRlZnNXaXRoUm91dGVzLFxuICBkZWZpbml0aW9ucyxcbiAgcm91dGVzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCBhbGwgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IENvbW1lbnRDb21tYW5kIH0gZnJvbSBcIi4vQ29tbWVudENvbW1hbmRcIjtcblxuY29uc3QgdGFidWxhdG9yUXVlcnkgPSBxdWVyeShhc3luYyAoc2NvcGUsIHJvdXRlKSA9PiB7XG4gIGNvbnN0IHRoaW5nU291bCA9IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHJvdXRlLm1hdGNoKTtcbiAgY29uc3QgW3VwLCBkb3duLCBjb21tZW50LCByZXBseVNvdWxzXSA9IGF3YWl0IGFsbChbXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vdm90ZXN1cGApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vdm90ZXNkb3duYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS9hbGxjb21tZW50c2ApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vY29tbWVudHNgKS5zb3VscygpXG4gIF0pO1xuICBjb25zdCB0aGluZ0RhdGEgPSBhd2FpdCBRdWVyeS50aGluZ0RhdGFGcm9tU291bHMocmVwbHlTb3Vscyk7XG4gIGNvbnN0IGNvbW1hbmRNYXAgPSBDb21tZW50Q29tbWFuZC5tYXAodGhpbmdEYXRhKTtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHVwLFxuICAgIGRvd24sXG4gICAgY29tbWVudCxcbiAgICByZXBsaWVzOiByZXBseVNvdWxzLmxlbmd0aCxcbiAgICBzY29yZTogdXAgLSBkb3duXG4gIH07XG5cbiAgaWYgKFIua2V5cyhjb21tYW5kTWFwKS5sZW5ndGgpIHJlc3VsdC5jb21tYW5kcyA9IEpTT04uc3RyaW5naWZ5KGNvbW1hbmRNYXApO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbmV4cG9ydCBjb25zdCBUYWJ1bGF0b3IgPSB7IHF1ZXJ5OiB0YWJ1bGF0b3JRdWVyeSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgb2JqSGFzaCBmcm9tIFwib2JqZWN0LWhhc2hcIjtcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVVJJIH0gZnJvbSBcInVyaS1qc1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuXG5leHBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5leHBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdEYXRhTm9kZVwiO1xuXG5jb25zdCB0b3BpY1ByZWZpeGVzID0ge1xuICBjaGF0bXNnOiBcImNoYXQ6XCIsXG4gIGNvbW1lbnQ6IFwiY29tbWVudHM6XCJcbn07XG5cbmNvbnN0IHNvdWxUb0lkID0gUi5jb21wb3NlKFxuICBSLnByb3AoXCJ0aGluZ0lkXCIpLFxuICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4pO1xuXG5jb25zdCBzb3Vsc1RvSWRzID0gUi5tYXAoc291bFRvSWQpO1xuXG5jb25zdCBpbmRleCA9IFIuY3VycnkoKHBlZXIsIHRoaW5nSWQsIGRhdGEpID0+IHtcbiAgaWYgKCFkYXRhLnRvcGljICYmICFkYXRhLm9wSWQpIHJldHVybjtcblxuICBpZiAoZGF0YS5vcElkICYmICFkYXRhLnRvcGljKSB7XG4gICAgcGVlci5ndW5cbiAgICAgIC5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSkpXG4gICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgLm9uKGZ1bmN0aW9uIHJlY3YodGQpIHtcbiAgICAgICAgaWYgKCF0ZCkgcmV0dXJuO1xuICAgICAgICBpbmRleChwZWVyLCB0aGluZ0lkLCB7IC4uLmRhdGEsIHRvcGljOiB0ZC50b3BpYyB8fCBcImFsbFwiIH0pO1xuICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF5U3RyID0gVGhpbmdTZXQuZGF5U3RyKGRhdGEudGltZXN0YW1wKTtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF5U3RyLnNwbGl0KFwiL1wiKTtcbiAgY29uc3QgdG9waWNQcmVmaXggPSB0b3BpY1ByZWZpeGVzW2RhdGEua2luZF0gfHwgXCJcIjtcbiAgY29uc3QgYmFzZVRvcGljTmFtZSA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IHRvcGljTmFtZSA9IHRvcGljUHJlZml4ICsgYmFzZVRvcGljTmFtZTtcbiAgY29uc3QgdG9waWMgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUgfSkpO1xuICBjb25zdCB0b3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSwgeWVhciwgbW9udGgsIGRheSB9KVxuICApO1xuXG4gIGlmICghZGF0YS5za2lwQWxsICYmIGRhdGEudG9waWMgIT09IFwiYWxsXCIpIHtcbiAgICBjb25zdCBhbGxuYW1lID0gYCR7dG9waWNQcmVmaXh9YWxsYDtcbiAgICBjb25zdCBhbGxUb3BpYyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiBhbGxuYW1lIH0pXG4gICAgKTtcbiAgICBjb25zdCBhbGxUb3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdG9waWNOYW1lOiBhbGxuYW1lLFxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgZGF5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBhbGxUb3BpYy5zZXQodGhpbmcpO1xuICAgIGFsbFRvcGljRGF5LnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5raW5kID09PSBcInN1Ym1pc3Npb25cIikge1xuICAgIGNvbnN0IHVybEluZm8gPSBkYXRhLnVybCA/IHBhcnNlVVJJKGRhdGEudXJsKSA6IHt9O1xuICAgIGNvbnN0IGRvbWFpbk5hbWUgPSAoZGF0YS51cmxcbiAgICAgID8gKHVybEluZm8uaG9zdCB8fCB1cmxJbmZvLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIilcbiAgICAgIDogYHNlbGYuJHtkYXRhLnRvcGljfWBcbiAgICApLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZG9tYWluID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWUgfSkpO1xuXG4gICAgZG9tYWluLnNldCh0aGluZyk7XG5cbiAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgIGNvbnN0IHVybE5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlVSTC5yb3V0ZS5yZXZlcnNlKHsgdXJsOiBkYXRhLnVybCB9KSk7XG5cbiAgICAgIC8vIHRoaW5nLmdldChcInVybFwiKS5wdXQodXJsTm9kZSk7XG4gICAgICB1cmxOb2RlLnNldCh0aGluZyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGFsbGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KVxuICAgICk7XG5cbiAgICBhbGxjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRoaW5nSWQ6IGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHRvcGljLnNldCh0aGluZyk7XG4gIHRvcGljRGF5LnNldCh0aGluZyk7XG59KTtcblxuY29uc3QgcHV0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBkYXRhLnRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IG9yaWdpbmFsSGFzaCA9IG9iakhhc2goZGF0YSk7XG4gIGNvbnN0IHsgdGltZXN0YW1wLCBraW5kLCB0b3BpYywgYXV0aG9ySWQsIG9wSWQsIHJlcGx5VG9JZCB9ID0gZGF0YTtcbiAgY29uc3QgdGhpbmdJZCA9IG9iakhhc2goe1xuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIHRvcGljLFxuICAgIGF1dGhvcklkLFxuICAgIG9wSWQsXG4gICAgcmVwbHlUb0lkLFxuICAgIG9yaWdpbmFsSGFzaFxuICB9KTtcblxuICBjb25zdCBub2RlID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSk7XG4gIGNvbnN0IGRhdGFTb3VsID0gYXV0aG9ySWRcbiAgICA/IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQsIGF1dGhvcklkIH0pXG4gICAgOiBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcmlnaW5hbEhhc2ggfSk7XG5cbiAgY29uc3QgbWV0YURhdGEgPSB7XG4gICAgaWQ6IHRoaW5nSWQsXG4gICAgdGltZXN0YW1wLFxuICAgIGtpbmQsXG4gICAgb3JpZ2luYWxIYXNoLFxuICAgIGRhdGE6IHsgXCIjXCI6IGRhdGFTb3VsIH0sXG4gICAgdm90ZXN1cDogeyBcIiNcIjogU2NoZW1hLlRoaW5nVm90ZXNVcC5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIHZvdGVzZG93bjogeyBcIiNcIjogU2NoZW1hLlRoaW5nVm90ZXNEb3duLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgYWxsY29tbWVudHM6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgY29tbWVudHM6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH1cbiAgfTtcblxuICBpZiAodG9waWMpXG4gICAgbWV0YURhdGEudG9waWMgPSB7IFwiI1wiOiBTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZTogdG9waWMgfSkgfTtcbiAgaWYgKGF1dGhvcklkKSBtZXRhRGF0YS5hdXRob3IgPSB7IFwiI1wiOiBgfiR7YXV0aG9ySWR9YCB9O1xuICBpZiAob3BJZClcbiAgICBtZXRhRGF0YS5vcCA9IHsgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3BJZCB9KSB9O1xuICBpZiAocmVwbHlUb0lkKVxuICAgIG1ldGFEYXRhLnJlcGx5VG8gPSB7XG4gICAgICBcIiNcIjogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiByZXBseVRvSWQgfSlcbiAgICB9O1xuXG4gIHBlZXIuZ3VuLmdldChkYXRhU291bCkucHV0KGRhdGEpO1xuICBub2RlLnB1dChtZXRhRGF0YSk7XG4gIGluZGV4KHBlZXIsIHRoaW5nSWQsIGRhdGEpO1xuICByZXR1cm4gbm9kZTtcbn0pO1xuXG5jb25zdCBzdWJtaXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChkYXRhLmRvbWFpbikgZGF0YS5kb21haW4gPSBkYXRhLmRvbWFpbi50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCB0aW1lc3RhbXAsIGtpbmQ6IFwic3VibWlzc2lvblwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBzdWJtaXNzaW9uc1NvdWwgPSBTY2hlbWEuQXV0aG9yU3VibWlzc2lvbnMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnMgPSBwZWVyLmd1bi5nZXQoc3VibWlzc2lvbnNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgLnB1dChzdWJtaXNzaW9ucyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgc3VibWlzc2lvbnMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjb21tZW50ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY29tbWVudFwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBjb21tZW50c1NvdWwgPSBTY2hlbWEuQXV0aG9yQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoY29tbWVudHNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgLnB1dChjb21tZW50cyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjaGF0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY2hhdG1zZ1wiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IHdyaXRlUGFnZSA9IFIuY3VycnkoKHBlZXIsIG5hbWUsIGJvZHkpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmICghdXNlcikgcmV0dXJuIFByb21pc2UucmVqZWN0KFwibm90IGxvZ2dlZCBpblwiKTtcbiAgbGV0IHRoaW5nO1xuICBjb25zdCBwYWdlc1NvdWwgPSBTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkOiB1c2VyLnB1YiB9KTtcbiAgY29uc3QgY2hhaW4gPSBwZWVyLmd1bi5nZXQocGFnZXNTb3VsKS5nZXQobmFtZSk7XG5cbiAgcmV0dXJuIGNoYWluLnRoZW4ocmVzID0+IHtcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBjaGFpblxuICAgICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgICAuZ2V0KFwiYm9keVwiKVxuICAgICAgICAucHV0KGJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBib2R5LFxuICAgICAgICB0aXRsZTogbmFtZSxcbiAgICAgICAga2luZDogXCJ3aWtpcGFnZVwiLFxuICAgICAgICBhdXRob3I6IHVzZXIuYWxpYXMsXG4gICAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgICAgfTtcblxuICAgICAgdGhpbmcgPSBwdXQocGVlciwgZGF0YSk7XG4gICAgICBjaGFpbi5wdXQodGhpbmcpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuY29uc3Qgdm90ZSA9IFIuY3VycnkoKHBlZXIsIGlkLCBraW5kLCBub25jZSkgPT4ge1xuICBjb25zdCB2b3RlcyA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWFba2luZCA9PT0gXCJ1cFwiID8gXCJUaGluZ1ZvdGVzVXBcIiA6IFwiVGhpbmdWb3Rlc0Rvd25cIl0ucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBpZFxuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIHZvdGVzLmdldChub25jZSkucHV0KFwiMVwiKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgVGhpbmcgPSB7XG4gIHNvdWxUb0lkLFxuICBzb3Vsc1RvSWRzLFxuICBwdXQsXG4gIHN1Ym1pdCxcbiAgY29tbWVudCxcbiAgY2hhdCxcbiAgd3JpdGVQYWdlLFxuICB2b3RlLFxuICBpbmRleFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcblxuY29uc3QgYm9keSA9IFIucHJvcE9yKFwiXCIsIFwiYm9keVwiKTtcbmNvbnN0IHVybCA9IFIucHJvcE9yKFwiXCIsIFwidXJsXCIpO1xuY29uc3QgZG9tYWluID0gUi5jb21wb3NlKFxuICB1cmxTdHIgPT4ge1xuICAgIGlmICghdXJsU3RyKSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZVVSSSh1cmxTdHIpO1xuXG4gICAgcmV0dXJuIChwYXJzZWQuaG9zdCB8fCBwYXJzZWQuc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKTtcbiAgfSxcbiAgdXJsXG4pO1xuXG5leHBvcnQgY29uc3QgVGhpbmdEYXRhTm9kZSA9IHsgYm9keSwgZG9tYWluIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5cbmNvbnN0IHNvdWxzID0gR3VuTm9kZS5lZGdlcztcbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcInRoaW5nSWRcIiksXG4gICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4gICAgKVxuICApLFxuICBHdW5Ob2RlLmVkZ2VzXG4pO1xuXG5jb25zdCB1bmlvbiA9IFIuY29tcG9zZShcbiAgUi5kaXNzb2MoXCJfXCIpLFxuICBSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KVxuKTtcblxuZnVuY3Rpb24gZGF5U3RyKHRpbWVzdGFtcCkge1xuICBjb25zdCBkID0gbmV3IERhdGUodGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgY29uc3QgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RhdGUoKTtcblxuICByZXR1cm4gYCR7eWVhcn0vJHttb250aH0vJHtkYXlOdW19YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRoaW5nU2V0ID0geyBpZHMsIHVuaW9uLCBzb3VscywgZGF5U3RyIH07XG4iLCJleHBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5leHBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdEYXRhTm9kZVwiO1xuZXhwb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcblxuY29uc3QgdG9rZW5pemUgPSBzb3VyY2UgPT4ge1xuICBjb25zdCB0b2tlbk1hcCA9IChzb3VyY2UgfHwgXCJcIikuc3BsaXQoXCJcXG5cIikucmVkdWNlKChkZWYsIGxpbmUpID0+IHtcbiAgICBjb25zdCB0b2tlbnMgPSBsaW5lXG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAubWFwKFIudHJpbSlcbiAgICAgIC5maWx0ZXIoeCA9PiB4KTtcblxuICAgIGlmICghdG9rZW5zLmxlbmd0aCkgcmV0dXJuIGRlZjtcbiAgICByZXR1cm4gUi5hc3NvY1BhdGgodG9rZW5zLCB7fSwgZGVmKTtcbiAgfSwge30pO1xuXG4gIGNvbnN0IGlzUHJlc2VudCA9IHAgPT4ge1xuICAgIGxldCBjaGVjayA9IHA7XG5cbiAgICBpZiAodHlwZW9mIHAgPT09IFwic3RyaW5nXCIpIGNoZWNrID0gcC5zcGxpdChcIiBcIik7XG4gICAgcmV0dXJuIGNoZWNrICYmIFIucGF0aChjaGVjaywgdG9rZW5NYXApO1xuICB9O1xuXG4gIGNvbnN0IGdldFZhbHVlcyA9IHAgPT4gUi5rZXlzSW4oaXNQcmVzZW50KHApKTtcbiAgY29uc3QgZ2V0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKVswXSB8fCBudWxsO1xuICBjb25zdCBnZXRMYXN0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKS5wb3AoKSB8fCBudWxsO1xuXG4gIGNvbnN0IGdldFZhbHVlQ2hhaW4gPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgbGV0IG5leHQgPSBwO1xuXG4gICAgd2hpbGUgKG5leHQpIHtcbiAgICAgIG5leHQgPSBnZXRWYWx1ZShbLi4ua2V5cywgLi4udmFsdWVzXSk7XG4gICAgICBuZXh0ICYmIHZhbHVlcy5wdXNoKG5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgY29uc3QgZ2V0UGFpcnMgPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG5cbiAgICByZXR1cm4gZ2V0VmFsdWVzKGtleXMpLnJlZHVjZSgocGFpcnMsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gZ2V0VmFsdWUoWy4uLmtleXMsIGtleV0pO1xuXG4gICAgICByZXR1cm4gWy4uLnBhaXJzLCBba2V5LCB2YWxdXTtcbiAgICB9LCBbXSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2UsXG4gICAgaXNQcmVzZW50LFxuICAgIGdldFZhbHVlLFxuICAgIGdldFZhbHVlcyxcbiAgICBnZXRMYXN0VmFsdWUsXG4gICAgZ2V0VmFsdWVDaGFpbixcbiAgICBnZXRQYWlyc1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IFRva2VuaXplciA9IHsgdG9rZW5pemUgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgb2JqSGFzaCBmcm9tIFwib2JqZWN0LWhhc2hcIjtcbmltcG9ydCB7IGNyZWF0ZVN1cHByZXNzb3IgfSBmcm9tIFwiZ3VuLXN1cHByZXNzb3JcIjtcbmltcG9ydCAqIGFzIHNlYSBmcm9tIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5cbmNvbnN0IGlzTGVnYWN5VGhpbmcgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGRhdGFTb3VsID0gUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKTtcbiAgY29uc3QgbmV3ZXN0ID0gUi53aXRob3V0KFxuICAgIFtcImNvbW1lbnRzXCIsIFwiYWxsY29tbWVudHNcIiwgXCJ2b3Rlc3VwXCIsIFwidm90ZXNkb3duXCJdLFxuICAgIFIua2V5cyhSLnBhdGgoW1wiX1wiLCBcIj5cIl0sIGRhdGEpKVxuICApXG4gICAgLm1hcChrZXkgPT4gUi5wYXRoKFtcIl9cIiwgXCI+XCIsIGtleV0sIGRhdGEpKVxuICAgIC5zb3J0KClcbiAgICAucG9wKCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChkYXRhU291bCkgfHwge307XG4gIGNvbnN0IGlkID0gUi5wcm9wKFwiaWRcIiwgZGF0YSk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSB0aGluZ0lkICYmIG5ld2VzdCAmJiBuZXdlc3QgPCAxNTQzMTAyODE0OTQ1O1xufTtcblxuY29uc3QgdGhpbmdIYXNoTWF0Y2hlc1NvdWwgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiAoXG4gICAgaWQgJiZcbiAgICBpZCA9PT1cbiAgICAgIG9iakhhc2goe1xuICAgICAgICBhdXRob3JJZDogKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkLFxuICAgICAgICB0aW1lc3RhbXA6IHBhcnNlSW50KFIucHJvcChcInRpbWVzdGFtcFwiLCBkYXRhKSwgMTApLFxuICAgICAgICBraW5kOiBSLnByb3AoXCJraW5kXCIsIGRhdGEpLFxuICAgICAgICB0b3BpYzogUi5wcm9wKFxuICAgICAgICAgIFwidG9waWNOYW1lXCIsXG4gICAgICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLm1hdGNoKFIucGF0aChbXCJ0b3BpY1wiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICBvcElkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICByZXBseVRvSWQ6IFIucHJvcChcbiAgICAgICAgICBcInRoaW5nSWRcIixcbiAgICAgICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcInJlcGx5VG9cIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3JpZ2luYWxIYXNoOiBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSlcbiAgICAgIH0pXG4gICk7XG59O1xuXG5jb25zdCBzaWduZWRUaGluZ0RhdGFNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgYXV0aG9ySWQgPSAoUi5wYXRoKFtcImF1dGhvclwiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpLnN1YnN0cigxKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IHNpZ25lZElkID0gUi5wcm9wKFxuICAgIFwiYXV0aG9ySWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGF1dGhvcklkICYmIGF1dGhvcklkID09PSBzaWduZWRJZDtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2ggPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSk7XG4gIGNvbnN0IGlkID0gUi5wcm9wKFxuICAgIFwidGhpbmdJZFwiLFxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKSlcbiAgKTtcblxuICByZXR1cm4gaWQgJiYgaWQgPT09IG9yaWdpbmFsSGFzaDtcbn07XG5cbmNvbnN0IGdldElzVGhpbmdSZWxhdGVkRWRnZSA9IGFqdiA9PiAoXG4gIG5vZGVUeXBlTmFtZSxcbiAgZGF0YSxcbiAgX3BTY2hlbWEsXG4gIF9jUGF0aCxcbiAgcGFyZW50RGF0YVxuKSA9PiB7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBwYXJlbnREYXRhKSB8fCBcIlwiKSB8fCB7fTtcbiAgY29uc3QgeyB0aGluZ0lkOiBwcm9wVGhpbmdJZCB9ID0gU2NoZW1hW25vZGVUeXBlTmFtZV0ucm91dGUubWF0Y2goXG4gICAgUi5wcm9wKFwiI1wiLCBkYXRhKSB8fCBcIlwiXG4gICk7XG5cbiAgaWYgKCF0aGluZ0lkIHx8IHRoaW5nSWQgIT09IHByb3BUaGluZ0lkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhanYuY29tcGlsZSh7ICRyZWY6IGBzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvJHtub2RlVHlwZU5hbWV9RWRnZWAgfSkoXG4gICAgZGF0YVxuICApO1xufTtcblxuY29uc3QgdGhpbmdEYXRhSGFzaE1hdGNoZXMgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCB7IF8sIC4uLnJlY29yZCB9ID0gZGF0YSB8fCB7fTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gIHJlY29yZC50aW1lc3RhbXAgPSBwYXJzZUZsb2F0KHJlY29yZC50aW1lc3RhbXAsIDEwKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPVxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKSB8fCB7fTtcblxuICByZXR1cm4gdGhpbmdJZCAmJiB0aGluZ0lkID09PSBvYmpIYXNoKHJlY29yZCk7XG59O1xuXG5jb25zdCBpc1ZvdGVWYWxpZCA9IChhcmdvbjIsIHNjaGVtYSwgcHJlZml4LCB2b3RlKSA9PiB7XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIsIGNvbmZpZyA9IHt9IH0gPSBzY2hlbWEgfHwge307XG5cbiAgY29uc3Qgbm9uY2UgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbSh2b3RlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcih2b3RlLCBcImhleFwiKTtcbiAgY29uc3Qgc2FsdCA9IEJ1ZmZlci5oYXNPd25Qcm9wZXJ0eShcImZyb21cIilcbiAgICA/IEJ1ZmZlci5mcm9tKG5vbmNlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcihub25jZSwgXCJoZXhcIik7XG4gIGNvbnN0IGhhc2ggPSBhcmdvbjIuaGFzaChwcmVmaXgsIHtcbiAgICBzYWx0LFxuICAgIGhhc2hMZW5ndGg6IGNvbmZpZy5oYXNoTGVuZ3RoLFxuICAgIHRpbWVDb3N0OiBjb25maWcudGltZUNvc3QsXG4gICAgbWVtb3J5Q29zdDogY29uZmlnLm1lbW9yeUNvc3QsXG4gICAgcGFyYWxsZWxpc206IGNvbmZpZy5wYXJhbGxlbGlzbSxcbiAgICByYXc6IHRydWUsXG4gICAgdHlwZTogYXJnb24yW2FsZ29yaXRobV1cbiAgfSk7XG4gIGxldCBvZmYgPSAwO1xuICBsZXQgaTtcblxuICBmb3IgKGkgPSAwOyBpIDw9IGNvbmZpZy5jb21wbGV4aXR5IC0gODsgaSArPSA4LCBvZmYrKykge1xuICAgIGlmIChoYXNoW29mZl0gIT09IDApIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBtYXNrID0gMHhmZiA8PCAoOCArIGkgLSBjb25maWcuY29tcGxleGl0eSk7XG5cbiAgcmV0dXJuIChoYXNoW29mZl0gJiBtYXNrKSA9PT0gMDtcbn07XG5cbmNvbnN0IGtleXNBcmVQcm9vZnNPZldvcmsgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGFyZ29uMiA9IHJlcXVpcmUoXCJhcmdvbjJcIik7XG5cbiAgaWYgKCFhcmdvbjIpIHJldHVybiB0cnVlOyAvLyBpbiBicm93c2VyIGRvbid0IGJvdGhlciBmb3Igbm93XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIgfSA9IHNjaGVtYSB8fCB7fTtcbiAgY29uc3QgcHJlZml4ID0gUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKTtcblxuICBpZiAoYWxnb3JpdGhtICE9PSBcImFyZ29uMmRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgYXJnb24yIHN1cHBvcnRlZCBmb3Igdm90ZSBoYXNoZXNcIik7XG4gIH1cblxuICBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKS5mb3JFYWNoKHZvdGUgPT4ge1xuICAgIGlmICghaXNWb3RlVmFsaWQoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCB2b3RlXCIsIHByZWZpeCwgdm90ZSk7XG4gICAgICBkZWxldGUgZGF0YVt2b3RlXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGRlbGV0ZUxlZ2FjeSA9IChcbiAgc2NoZW1hLFxuICBkYXRhLFxuICBwU2NoZW1hLFxuICBjUGF0aCxcbiAgcGFyZW50RGF0YSxcbiAga2V5SW5QYXJlbnRcbikgPT4ge1xuICBkZWxldGUgcGFyZW50RGF0YVtrZXlJblBhcmVudF07XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgaW5pdEFqdiA9IFIuY29tcG9zZShcbiAgYWp2ID0+IHtcbiAgICBhanYuYWRkS2V5d29yZChcImlzTGVnYWN5VGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IGlzTGVnYWN5VGhpbmdcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0hhc2hNYXRjaGVzU291bFxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBzaWduZWRUaGluZ0RhdGFNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ1JlbGF0ZWRFZGdlXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UoYWp2KVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFIYXNoTWF0Y2hlc1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwia2V5c0FyZVByb29mc09mV29ya1wiLCB7XG4gICAgICB2YWxpZGF0ZToga2V5c0FyZVByb29mc09mV29yayxcbiAgICAgIG1vZGlmeWluZzogdHJ1ZVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiZGVsZXRlTGVnYWN5XCIsIHtcbiAgICAgIHZhbGlkYXRlOiBkZWxldGVMZWdhY3lcbiAgICB9KTtcbiAgICByZXR1cm4gYWp2O1xuICB9LFxuICBzZWEuaW5pdEFqdlxuKTtcblxuZXhwb3J0IGNvbnN0IHN1cHByZXNzb3IgPSBjcmVhdGVTdXBwcmVzc29yKHtcbiAgZGVmaW5pdGlvbnM6IFNjaGVtYS5kZWZpbml0aW9ucyxcbiAgaW5pdDogaW5pdEFqdlxufSk7XG5cbmNvbnN0IGd1bldpcmVJbnB1dCA9IFIuY3VycnkoKHBlZXIsIGNvbnRleHQpID0+XG4gIGNvbnRleHQub24oXCJpblwiLCBmdW5jdGlvbiB3aXJlSW5wdXQobXNnKSB7XG4gICAgY29uc3QgXyA9IG1zZ1tcIl9cIl07XG5cbiAgICBkZWxldGUgbXNnW1wiX1wiXTtcbiAgICBpZiAoXCJwaW5nXCIgaW4gbXNnIHx8IFwibGVlY2hcIiBpbiBtc2cpIHJldHVybjtcbiAgICBpZiAobXNnLnB1dCAmJiAhUi5rZXlzKG1zZy5wdXQpLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHByb21pc2UgPSBwZWVyLmNvbmZpZy5kaXNhYmxlVmFsaWRhdGlvblxuICAgICAgPyBQcm9taXNlLnJlc29sdmUobXNnKVxuICAgICAgOiBzdXBwcmVzc29yLnZhbGlkYXRlKG1zZyk7XG5cbiAgICBwcm9taXNlXG4gICAgICAudGhlbih2YWxpZGF0ZWQgPT4ge1xuICAgICAgICBpZiAoIXZhbGlkYXRlZCkgcmV0dXJuIGNvbnNvbGUubG9nKFwibXNnIGRpZG4ndCB2YWxpZGF0ZVwiLCBtc2cpO1xuICAgICAgICBtc2dbXCJfXCJdID0gXztcbiAgICAgICAgcmV0dXJuIHRoaXMudG8ubmV4dChtc2cpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihcInZhbGlkYXRlIGVyclwiLCBtc2csIGVyci5zdGFjayB8fCBlcnIpKTtcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBWYWxpZGF0aW9uID0ge1xuICBpc0xlZ2FjeVRoaW5nLFxuICB0aGluZ0hhc2hNYXRjaGVzU291bCxcbiAgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyxcbiAgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaCxcbiAgZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlLFxuICB0aGluZ0RhdGFIYXNoTWF0Y2hlcyxcbiAgaXNWb3RlVmFsaWQsXG4gIGtleXNBcmVQcm9vZnNPZldvcmssXG4gIGluaXRBanYsXG4gIHN1cHByZXNzb3IsXG4gIGd1bldpcmVJbnB1dFxufTtcbiIsImltcG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmV4cG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuZXhwb3J0IHsgQ29tbWVudENvbW1hbmQgfSBmcm9tIFwiLi9Db21tZW50Q29tbWFuZFwiO1xuZXhwb3J0IHsgTGlzdGluZywgTGlzdGluZ09yYWNsZSwgU3BhY2VTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1wiO1xuZXhwb3J0IHsgUGFnZSB9IGZyb20gXCIuL1BhZ2VcIjtcbmV4cG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5leHBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmV4cG9ydCB7IFRoaW5nLCBUaGluZ1NldCwgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nXCI7XG5leHBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuZXhwb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmV4cG9ydCB7IFRhYnVsYXRvciB9IGZyb20gXCIuL1RhYnVsYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgUGVlci5pbml0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc2NvcGVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3JfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9vYmplY3RfaGFzaF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX187Il0sInNvdXJjZVJvb3QiOiIifQ==