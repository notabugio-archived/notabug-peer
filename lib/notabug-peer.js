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
    additionalProperties: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIklOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkNIQVRfUFJFTE9BRF9JVEVNUyIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwicXVlcnkiLCJtdWx0aVRvcGljIiwiZG9tYWluU291cmNlIiwiZG9tYWlucyIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlZCIsImlkcyIsInRoaW5nSWQiLCJUaGluZyIsInJvdXRlIiwicmV2ZXJzZSIsIm9wU291cmNlIiwic3VibWlzc2lvbklkcyIsIm11bHRpU3VibWlzc2lvbiIsInJlcGxpZXNTb3VyY2UiLCJyZXBsaWVzVG9BdXRob3IiLCJyZXBsaWVzVG9BdXRob3JJZCIsInNvdXJjZXMiLCJsaXN0aW5nIiwicmVwbGllcyIsIm9wIiwiY3VyYXRvciIsImF1dGhvciIsImRvbWFpbiIsInRvcGljIiwic291cmNlTmFtZXMiLCJzb3VyY2VOYW1lIiwiZGVmIiwiZnJvbURlZmluaXRpb24iLCJuYW1lIiwibWVyZ2VMZWZ0IiwiTGlzdGluZ0RhdGFTb3VyY2UiLCJmcm9tU291cmNlIiwic291cmNlIiwib3duZXJJZCIsInNwYWNlTmFtZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsImlzQ2hhdCIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJiYXNlUGF0aCIsInN1Ym1pdFBhdGgiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsImZucyIsImFkZFZvdGVGaWx0ZXIiLCJ0IiwiaWRlbnRpY2FsIiwiaXRlbSIsImtpbmQiLCJhbGlhcyIsImx0ZSIsImd0ZSIsInRoaW5nIiwiY21kcyIsInRhZ05hbWUiLCJjb250ZW50RmlsdGVyIiwidm90ZUZpbHRlciIsInRoaW5nRmlsdGVyIiwiZ2V0RmlsdGVyZWRSb3dzIiwic3BlYyIsInNvcnRlZFJvd3MiLCJsaW1pdCIsImxpbWl0UHJvcCIsImNvdW50IiwiY291bnRQcm9wIiwiYWZ0ZXIiLCJmaWx0ZXJGbiIsInJvd3MiLCJzbGljZSIsImZpbHRlcmVkIiwiZmV0Y2hCYXRjaCIsInNpemUiLCJQcm9taXNlIiwicm93IiwiaW5MaXN0aW5nIiwiUE9TX0lEIiwiY29uc29sZSIsImxvZyIsInNwbGljZSIsIlBPU19WQUwiLCJnZXRGaWx0ZXJlZElkcyIsIngiLCJ0aGluZ01ldGEiLCJ0aGluZ1NvdWwiLCJzY29yZXMiLCJMaXN0aW5nRmlsdGVyIiwiUE9TX0lEWCIsInJvd3NUb0lkcyIsInJvd3NUb0l0ZW1zIiwic291bEZyb21QYXRoIiwicGF0aEZyb21Tb3VsIiwiUmVnRXhwIiwiaWRUb1NvdWwiLCJpZHNUb1NvdWxzIiwic291bFRvSWQiLCJtYXRjaCIsInNvdWxzVG9JZHMiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwiaXRlbUtleXMiLCJmaWx0ZXIiLCJzZXJpYWxpemUiLCJpdGVtcyIsImFkZEluZGV4IiwiYXNzb2MiLCJkZWZhdWx0VG8iLCJzb3J0Um93cyIsInNvcnRXaXRoIiwiYXNjZW5kIiwiY29uZCIsImlzTmlsIiwiSW5maW5pdHkiLCJUIiwic29ydGVkSWRzIiwiaXRlbXNUb1Jvd3MiLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImluc2VydGVkIiwicG9wIiwicmVwbGFjZWQiLCJjYXRlZ29yaXplRGlmZiIsIm9yaWdpbmFsIiwiYWxsS2V5cyIsIl9kaWZmSWR4IiwiZGlmZklkIiwiX29yaWdJZHgiLCJvcmlnSWQiLCJ1bmlvblJvd3MiLCJ1bmlxQnkiLCJyb3dzRnJvbVNvdWxzIiwicmVhZCIsIkxpc3RpbmdOb2RlIiwidXBkYXRlTGlzdGluZyIsIm9yYyIsIm5ld1Njb3BlIiwidG9JdGVtcyIsIndyaXRlIiwib25QdXQiLCJ1cGRhdGVkU291bCIsInByb3BzIiwidXBkYXRlZElkcyIsInNwZWNGcm9tUGF0aCIsIlRoaW5nVm90ZUNvdW50cyIsImlzU3RpY2t5IiwiZXF1YWxzIiwiZ2V0QWNjZXNzZXMiLCJsaXN0ZW4iLCJMaXN0aW5nT3JhY2xlIiwiY2FsY3VsYXRlUm93cyIsInN0aWNreUl0ZW1zIiwiZGF0YVNvdXJjZSIsImNhbGN1bGF0ZSIsInRvTm9kZSIsInBhdGhzIiwic3RpY2t5Um93cyIsImZyb21TcGVjIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsIm5vZGVGcm9tUGF0aCIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIm9sZCIsImFjdGl2ZSIsImxhc3RBY3RpdmUiLCJ0b3AiLCJjb21tZW50cyIsImRpc2N1c3NlZCIsInNjb3JlIiwic2Vjb25kcyIsIm9yZGVyIiwiTWF0aCIsImxvZzEwIiwibWF4IiwiYWJzIiwiaG90Iiwic2lnbiIsImJlc3QiLCJ1cHMiLCJkb3ducyIsIm4iLCJ6IiwibGVmdCIsInJpZ2h0Iiwic3FydCIsInVuZGVyIiwiY29udHJvdmVyc2lhbCIsIm1hZ25pdHVkZSIsImJhbGFuY2UiLCJpc1ZhbGlkU29ydCIsInRvSXRlbSIsImZyb21UaGluZ1NldHMiLCJwaXBlIiwidW5pb24iLCJMaXN0aW5nU29ydCIsImFwcGx5IiwiYXAiLCJvZiIsImdldFNvdXJjZSIsImV4dHJhIiwid2lraVBhZ2UiLCJMaXN0aW5nU3BlYyIsImdldFNpZGViYXIiLCJub3JtYWxUb3BpY3MiLCJzcGxpdFRvcGljcyIsInN1Ym1pdFRvIiwidGFiIiwiQ2hhdExpc3RpbmciLCJ3aXRoUm91dGUiLCJDb21tZW50TGlzdGluZyIsIkNvbW1lbnRlZExpc3RpbmciLCJEb21haW5MaXN0aW5nIiwiRmlyZWhvc2VMaXN0aW5nIiwiZGlmZkRhdGEiLCJ1cGRhdGVkQXV0aG9yZWQiLCJvcElkIiwicmVwbHlJZHMiLCJUaGluZ0NvbW1lbnRzIiwiSW5ib3hMaXN0aW5nIiwidXNlck1ldGEiLCJtZXRhIiwicHJvZmlsZUlkIiwiUHJvZmlsZUxpc3RpbmciLCJzaWRlYmFyUGFnZU5hbWUiLCJvcmlnaW5hbERhdGEiLCJyZW1vdmVkSWRzIiwidm90ZUNvdW50c01hdGNoIiwidGhpbmdNYXRjaCIsIlRoaW5nRGF0YVNpZ25lZCIsImF1dGhvck1hdGNoIiwiU0VBQXV0aG9yIiwiZnJvbVBhZ2VJZCIsImV4aXN0aW5nS2V5cyIsIndvcmsiLCJtZXRob2QiLCJwcmlvcml0eSIsIlNwYWNlTGlzdGluZyIsIlRvcGljTGlzdGluZyIsInR5cGVzIiwidHlwZXNBcnJheSIsInNpZGViYXJGcm9tUGF0aCIsIkVycm9yIiwiYmFzZVNwZWMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJQYXRoIiwiY29uZmlnUGFnZU5hbWUiLCJzb3VyY2VXaXRoRGVmYXVsdHMiLCJub2RlVG9TcGFjZU5hbWVzIiwidXNlclNwYWNlTmFtZXMiLCJ1c2VyUGFnZXMiLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwidHlwZUZyb21QYXRoIiwid2l0aE1hdGNoIiwicGFyYW1zIiwicHJlbG9hZCIsIndpdGhMaXN0aW5nTWF0Y2giLCJzaWRlYmFyIiwic3BhY2UiLCJyZWFsUXVlcnkiLCJwcmVsb2FkTGlzdGluZyIsInRoaW5nU291bHMiLCJ0aGluZ3MiLCJtdWx0aVRoaW5nTWV0YSIsIm9wSWRzIiwib3BTb3VscyIsImNoYXRQYXRoIiwiZ2V0Q2FjaGUiLCJwcmVmaXgiLCJkZWZhdWx0UHJlZml4IiwiaWRlbnRpZmllciIsImRlZmF1bHRJZGVudGlmaWVyIiwiZGVmYXVsdFNvcnQiLCJyZXN0IiwidGhpbmdDb21tZW50cyIsInNwYWNlTGlzdGluZyIsImRlZmF1bHROYW1lIiwiZGVmYXVsdEF1dGhvcklkIiwic3BhY2VUaGluZ0NvbW1lbnRzIiwic3BhY2VQYXRoIiwibGlzdGluZ1BhdGgiLCJwcm9maWxlIiwiZGVmYXVsdFR5cGUiLCJpbmJveCIsIlBhZ2UiLCJpbml0IiwiY29uZmlnIiwibGVlY2giLCJkaXNhYmxlVmFsaWRhdGlvbiIsIm5vR3VuIiwibG9jYWxTdG9yYWdlIiwicGVyc2lzdCIsImNmZyIsInJhZGlzayIsIm9uIiwiZ3VuV2lyZUlucHV0Iiwic3RvcmVGbiIsInN0b3JlIiwiYSIsInJldHJ5Iiwic2VuZExlZWNoIiwiXyIsImNyZWF0ZVNjb3BlIiwic3VibWl0IiwiY29tbWVudCIsImNoYXQiLCJ3cml0ZVBhZ2UiLCJ2b3RlIiwicXVlcmllcyIsIlBlZXIiLCJlbXB0eVByb21pc2UiLCJ1bmlvbkFycmF5cyIsInRvcGljU291bHMiLCJkYXlzIiwiZGF5U3RyaW5ncyIsIm9uZURheSIsInN0YXJ0IiwiRGF0ZSIsImdldFRpbWUiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJyZXBseVRvU291bCIsIm9wU291bCIsInRoaW5naWQiLCJyZXBseVRvSWQiLCJtdWx0aVF1ZXJ5Iiwic2luZ2xlUXVlcnkiLCJwbHVyYWwiLCJzaW5nbGUiLCJjb2xsYXRlIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwic3VibWlzc2lvbk9ubHkiLCJpZHMxIiwiaWRzMiIsInRoaW5nU2NvcmVzIiwidm90ZXMiLCJwcm9taXNlcyIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsImNyZWF0ZWRBdCIsIm5hYiIsIlF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzZWEiLCJBVVRIX1NDSEVNQSIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIlRvcGljRGF5IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiJHJlZiIsInllYXIiLCJtaW5pbXVtIiwibWF4aW11bSIsIm1vbnRoIiwiZGF5IiwicmVxdWlyZWQiLCJwcm9wc0Zyb21Tb3VsIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlZGdlTWF0Y2hlc0tleSIsImFueU9mIiwiVG9waWMiLCJ1cmwiLCJVUkwiLCJhbGxPZiIsInRoaW5nS2luZCIsIm9yaWdpbmFsSGFzaCIsIm9uZU9mIiwidGhpbmdSZWxhdGVkRWRnZSIsImFsbGNvbW1lbnRzIiwidm90ZXN1cCIsInZvdGVzZG93biIsInJlcGx5VG8iLCJ0aGluZ0hhc2hNYXRjaGVzU291bCIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZyIsInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2giLCJpc0xlZ2FjeVRoaW5nIiwiUHJvb2ZPZldvcmtWb3RlcyIsIiRhc3luYyIsImtleXNBcmVQcm9vZnNPZldvcmsiLCJhbGdvcml0aG0iLCJjb21wbGV4aXR5IiwiaGFzaExlbmd0aCIsInRpbWVDb3N0IiwibWVtb3J5Q29zdCIsInBhcmFsbGVsaXNtIiwiVGhpbmdWb3Rlc1VwIiwiVGhpbmdWb3Rlc0Rvd24iLCJUaGluZ0RhdGEiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWwiLCJ1cCIsImRvd24iLCJjb21tYW5kcyIsIkxpc3RpbmdEYXRhIiwicGF0dGVyblByb3BlcnRpZXMiLCJkZWxldGVOb25OdW1lcmljS2V5cyIsImRlbGV0ZU1ldGFGb3JNaXNzaW5nIiwic29ydE5hbWUiLCJlbnVtIiwiVGhpbmdDb21tZW50c0xpc3RpbmciLCJ1c2VyTGlzdGluZ1R5cGUiLCJBdXRob3JSZXBsaWVzTGlzdGluZyIsIkF1dGhvclByb2ZpbGVMaXN0aW5nIiwiQXV0aG9yQ29tbWVudHMiLCJBdXRob3JTdWJtaXNzaW9ucyIsIkF1dGhvclRoaW5ncyIsInJvdXRlcyIsImRlZnNXaXRoUm91dGVzIiwiU2NoZW1hIiwidGFidWxhdG9yUXVlcnkiLCJyZXBseVNvdWxzIiwiY29tbWFuZE1hcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJUYWJ1bGF0b3IiLCJ0b3BpY1ByZWZpeGVzIiwiY2hhdG1zZyIsImJpbmQiLCJpbmRleCIsInJlY3YiLCJ0ZCIsIm9mZiIsInRvcGljUHJlZml4IiwiYmFzZVRvcGljTmFtZSIsInRvTG93ZXJDYXNlIiwidG9waWNEYXkiLCJza2lwQWxsIiwiYWxsbmFtZSIsImFsbFRvcGljIiwiYWxsVG9waWNEYXkiLCJzZXQiLCJ1cmxJbmZvIiwiaG9zdCIsInNjaGVtZSIsInVybE5vZGUiLCJwdXQiLCJkYXRhU291bCIsIm1ldGFEYXRhIiwicHViIiwidGhpbmdzU291bCIsInN1Ym1pc3Npb25zU291bCIsImNvbW1lbnRzU291bCIsInJlamVjdCIsInBhZ2VzU291bCIsImNoYWluIiwibm9uY2UiLCJ1cmxTdHIiLCJUaGluZ0RhdGFOb2RlIiwiZGlzc29jIiwiZCIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJkYXlOdW0iLCJnZXRVVENEYXRlIiwiVGhpbmdTZXQiLCJ0b2tlbk1hcCIsImxpbmUiLCJ0b2tlbnMiLCJjaGVjayIsImtleXNJbiIsImdldExhc3RWYWx1ZSIsIm5leHQiLCJwYWlycyIsIlRva2VuaXplciIsInNjaGVtYSIsIm5ld2VzdCIsIl9zY2hlbWEiLCJzdWJzdHIiLCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzIiwic2lnbmVkSWQiLCJnZXRJc1RoaW5nUmVsYXRlZEVkZ2UiLCJhanYiLCJub2RlVHlwZU5hbWUiLCJfcFNjaGVtYSIsIl9jUGF0aCIsInBhcmVudERhdGEiLCJwcm9wVGhpbmdJZCIsImNvbXBpbGUiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlcyIsInJlY29yZCIsImlzVm90ZVZhbGlkIiwiYXJnb24yIiwiQnVmZmVyIiwiaGFzT3duUHJvcGVydHkiLCJmcm9tIiwic2FsdCIsImhhc2giLCJyYXciLCJtYXNrIiwicmVxdWlyZSIsInBTY2hlbWEiLCJjUGF0aCIsImtleUluUGFyZW50IiwibWV0YUtleXMiLCJkaWZmZXJlbmNlIiwib21pdCIsImluaXRBanYiLCJhZGRLZXl3b3JkIiwidmFsaWRhdGUiLCJtb2RpZnlpbmciLCJzdXBwcmVzc29yIiwicmVtb3ZlQWRkaXRpb25hbCIsImNvbnRleHQiLCJ3aXJlSW5wdXQiLCJtc2ciLCJwcm9taXNlIiwidmFsaWRhdGVkIiwidG8iLCJjYXRjaCIsImVycm9yIiwic3RhY2siLCJWYWxpZGF0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsS0FBRixDQUNi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QUFDQTs7ZUFDZSxXQUFLVixJOzs7Ozs7Ozs7Ozs7QUNicEIsb0Q7Ozs7Ozs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsaUU7Ozs7Ozs7Ozs7O0FDQUEseUQ7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7Ozs7O0FDQUEsb0QiLCJmaWxlIjoibm90YWJ1Zy1wZWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXJnb24yXCIpLCByZXF1aXJlKFwiZ3VuLXNjb3BlXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3JcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIpLCByZXF1aXJlKFwib2JqZWN0LWhhc2hcIiksIHJlcXVpcmUoXCJyYW1kYVwiKSwgcmVxdWlyZShcInJvdXRlLXBhcnNlclwiKSwgcmVxdWlyZShcInVyaS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIm5vdGFidWctcGVlclwiLCBbXCJhcmdvbjJcIiwgXCJndW4tc2NvcGVcIiwgXCJndW4tc3VwcHJlc3NvclwiLCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiwgXCJvYmplY3QtaGFzaFwiLCBcInJhbWRhXCIsIFwicm91dGUtcGFyc2VyXCIsIFwidXJpLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5vdGFidWctcGVlclwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5vdGFidWctcGVlclwiXSA9IGZhY3Rvcnkocm9vdFtcImFyZ29uMlwiXSwgcm9vdFtcImd1bi1zY29wZVwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yXCJdLCByb290W1wiZ3VuLXN1cHByZXNzb3Itc2VhclwiXSwgcm9vdFtcIm9iamVjdC1oYXNoXCJdLCByb290W1wicmFtZGFcIl0sIHJvb3RbXCJyb3V0ZS1wYXJzZXJcIl0sIHJvb3RbXCJ1cmktanNcIl0pO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3Njb3BlX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3JfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfb2JqZWN0X2hhc2hfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JvdXRlX3BhcnNlcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3VyaV9qc19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcblxuY29uc3Qgc2lnbnVwID0gUi5jdXJyeShcbiAgKHBlZXIsIHVzZXJuYW1lLCBwYXNzd29yZCwgb3B0cyA9IHt9KSA9PlxuICAgIG5ldyBQcm9taXNlKChvaywgZmFpbCkgPT4ge1xuICAgICAgaWYgKHBlZXIgJiYgcGVlci5ndW4gJiYgcGVlci5ndW4udXNlcikge1xuICAgICAgICBjb25zdCB1c2VyID0gcGVlci5ndW4udXNlcigpO1xuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICB1c2VyLmNyZWF0ZShcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBhY2sgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWNrLmVycikge1xuICAgICAgICAgICAgICAgIGZhaWwoYWNrLmVycik7XG4gICAgICAgICAgICAgICAgdXNlci5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgIHBlZXIuZ3VuLnVzZXIoKS5sZWF2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZXIubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKG9rKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdHNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICB9XG4gICAgfSlcbik7XG5cbmNvbnN0IGxvZ2luID0gUi5jdXJyeSgocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkKSA9PlxuICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICBjb25zdCB1c2VyID0gcGVlci5ndW4udXNlcigpO1xuXG4gICAgICB1c2VyLmF1dGgodXNlcm5hbWUsIHBhc3N3b3JkLCBhY2sgPT5cbiAgICAgICAgYWNrLmVyciA/IGZhaWwoYWNrLmVycikgOiBvayhwZWVyLmd1bi51c2VyKCkuaXMpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgfVxuICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgcGVlci5fb25Mb2dpbiAmJiBwZWVyLl9vbkxvZ2luKHJlc3VsdCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgbG9nb3V0ID0gcGVlciA9PiBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbmNvbnN0IGlzTG9nZ2VkSW4gPSBwZWVyID0+IHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIgJiYgcGVlci5ndW4udXNlcigpLmlzO1xuY29uc3Qgb25Mb2dpbiA9IFIuY3VycnkoKHBlZXIsIGZuKSA9PiAocGVlci5fb25Mb2dpbiA9IGZuKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZXhwb3J0IGNvbnN0IEF1dGhlbnRpY2F0aW9uID0ge1xuICBzaWdudXAsXG4gIGxvZ2luLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIG9uTG9naW5cbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IHRva2VuaXplID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnRyaW0pLFxuICBSLnNwbGl0KFwiIFwiKSxcbiAgUi5yZXBsYWNlKENvbnN0YW50cy5DT01NQU5EX1JFLCBcIlwiKSxcbiAgUi5wcm9wT3IoXCJcIiwgMCksXG4gIFIuc3BsaXQoXCJcXG5cIilcbik7XG5cbmNvbnN0IG1hcCA9IHRoaW5nRGF0YSA9PlxuICBSLnJlZHVjZShcbiAgICAoY21kTWFwLCBpZCkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IFIucGF0aChbaWQsIFwiYm9keVwiXSwgdGhpbmdEYXRhKTtcbiAgICAgIGNvbnN0IGF1dGhvcklkID0gUi5wYXRoKFtpZCwgXCJhdXRob3JJZFwiXSwgdGhpbmdEYXRhKSB8fCBcImFub25cIjtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBhcnNlRmxvYXQoUi5wYXRoKFtpZCwgXCJ0aW1lc3RhbXBcIl0sIHRoaW5nRGF0YSkpO1xuXG4gICAgICBpZiAoIVIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSwgYm9keSkpIHJldHVybiBjbWRNYXA7XG4gICAgICBjb25zdCB0b2tlbml6ZWQgPSBbYXV0aG9ySWQsIC4uLnRva2VuaXplKGJvZHkpLCBpZF07XG5cbiAgICAgIHJldHVybiBSLmFzc29jUGF0aCh0b2tlbml6ZWQsIHRpbWVzdGFtcCB8fCAwLCBjbWRNYXApO1xuICAgIH0sXG4gICAge30sXG4gICAgUi5rZXlzKHRoaW5nRGF0YSlcbiAgKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRDb21tYW5kID0geyB0b2tlbml6ZSwgbWFwIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBDb25maWcgPSB7XG4gIHRhYnVsYXRvcjogQ29uc3RhbnRzLklOREVYRVIsXG4gIGluZGV4ZXI6IENvbnN0YW50cy5JTkRFWEVSLFxuICBvd25lcjogQ29uc3RhbnRzLklOREVYRVIsXG4gIHVwZGF0ZTogUi5jb21wb3NlKFxuICAgIFIubWFwKChba2V5LCB2YWxdKSA9PiAoQ29uZmlnW2tleV0gPSB2YWwpKSxcbiAgICBSLnRvUGFpcnNcbiAgKVxufTtcbiIsImNvbnN0IENPTU1BTkRfUkUgPSAvXiB7NH1+LztcbmNvbnN0IFBSRUZJWCA9IFwibmFiXCI7XG5jb25zdCBTT1VMX0RFTElNRVRFUiA9IFwifH5+fFwiO1xuXG5jb25zdCBMSVNUSU5HX1NJWkUgPSAxMDAwO1xuXG5jb25zdCBNQVhfSEFTSF9TSVpFID0gNjQ7XG5jb25zdCBNQVhfUE9XX05PTkNFX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9UT1BJQ19TSVpFID0gNDI7XG5jb25zdCBNQVhfQVVUSE9SX0FMSUFTX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfQVVUSE9SX0lEX1NJWkUgPSAxMjg7IC8vID8/P1xuY29uc3QgTUFYX1VSTF9TSVpFID0gMjA0ODtcbmNvbnN0IE1BWF9ET01BSU5fU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9USElOR19LSU5EX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9USElOR19USVRMRV9TSVpFID0gMzAwO1xuY29uc3QgTUFYX1RISU5HX0JPRFlfU0laRSA9IDUwMDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19JRFNfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1RBQlNfU0laRSA9IDUwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFID0gTUFYX0FVVEhPUl9JRF9TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSA9IDE2O1xuXG5jb25zdCBDSEFUX1BSRUxPQURfSVRFTVMgPSAxMDtcblxuY29uc3QgSU5ERVhFUiA9XG4gIFwiQ0V5S3JEZDF4eVBYcFdTVjAwTWd2blpZMlZKTEhYZ3pDdmhNZUR3S1RZQS55alNxMER5WHp6aEJfWlhyX0R6ZkpnaWozdFhVMC0zdDBRNWJKQXRacGo4XCI7XG5cbmV4cG9ydCBjb25zdCBDb25zdGFudHMgPSB7XG4gIENPTU1BTkRfUkUsXG4gIFBSRUZJWCxcbiAgU09VTF9ERUxJTUVURVIsXG4gIExJU1RJTkdfU0laRSxcbiAgTUFYX0hBU0hfU0laRSxcbiAgTUFYX1BPV19OT05DRV9TSVpFLFxuICBNQVhfVE9QSUNfU0laRSxcbiAgTUFYX0FVVEhPUl9BTElBU19TSVpFLFxuICBNQVhfQVVUSE9SX0lEX1NJWkUsXG4gIE1BWF9VUkxfU0laRSxcbiAgTUFYX0RPTUFJTl9TSVpFLFxuICBNQVhfVEhJTkdfS0lORF9TSVpFLFxuICBNQVhfVEhJTkdfVElUTEVfU0laRSxcbiAgTUFYX1RISU5HX0JPRFlfU0laRSxcbiAgTUFYX0xJU1RJTkdfSURTX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFLFxuICBNQVhfTElTVElOR19UQUJTX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfS0lORF9TSVpFLFxuICBDSEFUX1BSRUxPQURfSVRFTVMsXG4gIElOREVYRVJcbn07XG4iLCIvKiBnbG9iYWxzIEd1biAqL1xuaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcblxuY29uc3Qgc291bCA9IFIucGF0aE9yKFwiXCIsIFtcIl9cIiwgXCIjXCJdKTtcbmNvbnN0IHN0YXRlID0gUi5wYXRoT3Ioe30sIFtcIl9cIiwgXCI+XCJdKTtcblxuY29uc3QgbGF0ZXN0ID0gUi5jb21wb3NlKFxuICBSLmxhc3QsXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLnZhbHVlcyxcbiAgc3RhdGVcbik7XG5cbmNvbnN0IGVkZ2VzID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnByb3AoXCIjXCIpKSxcbiAgUi52YWx1ZXNcbik7XG5cbmZ1bmN0aW9uIGRlY29kZVNFQShyYXdEYXRhKSB7XG4gIGNvbnN0IGRhdGEgPSByYXdEYXRhID8geyAuLi5yYXdEYXRhIH0gOiByYXdEYXRhO1xuICBjb25zdCBzb3VsID0gUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKTtcblxuICBpZiAoIXNvdWwgfHwgIUd1bi5TRUEgfHwgc291bC5pbmRleE9mKFwiflwiKSA9PT0gLTEpIHJldHVybiByYXdEYXRhO1xuICBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgR3VuLlNFQS52ZXJpZnkoXG4gICAgICBHdW4uU0VBLm9wdC5wYWNrKHJhd0RhdGFba2V5XSwga2V5LCByYXdEYXRhLCBzb3VsKSxcbiAgICAgIGZhbHNlLFxuICAgICAgcmVzID0+IChkYXRhW2tleV0gPSBHdW4uU0VBLm9wdC51bnBhY2socmVzLCBrZXksIHJhd0RhdGEpKVxuICAgICk7XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCBjb25zdCBHdW5Ob2RlID0geyBzb3VsLCBzdGF0ZSwgbGF0ZXN0LCBlZGdlcywgZGVjb2RlU0VBIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSwgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcblxuY29uc3QgbmVlZHNTY29yZXMgPSBkZWZpbml0aW9uID0+XG4gICEhUi5maW5kKGRlZmluaXRpb24uaXNQcmVzZW50LCBbXG4gICAgXCJzb3J0IGhvdFwiLFxuICAgIFwic29ydCB0b3BcIixcbiAgICBcInNvcnQgYmVzdFwiLFxuICAgIFwic29ydCBjb250cm92ZXJzaWFsXCIsXG4gICAgXCJ1cHNcIixcbiAgICBcImRvd25zXCIsXG4gICAgXCJzY29yZVwiLFxuICAgIFwiY2FuIHJlbW92ZVwiXG4gIF0pO1xuXG5jb25zdCBuZWVkc0RhdGEgPSBkZWZpbml0aW9uID0+XG4gICEhUi5maW5kKGRlZmluaXRpb24uaXNQcmVzZW50LCBbXG4gICAgXCJ0b3BpY1wiLFxuICAgIFwiZG9tYWluXCIsXG4gICAgXCJhdXRob3JcIixcbiAgICBcInVuaXF1ZSBieSBjb250ZW50XCIsXG4gICAgXCJraW5kXCIsXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJyZXF1aXJlIHNpZ25lZFwiLFxuICAgIFwicmVxdWlyZSBhbm9uXCIsXG4gICAgXCJhbGlhc1wiLFxuICAgIFwiYmFuIGRvbWFpblwiLFxuICAgIFwiYmFuIHRvcGljXCIsXG4gICAgXCJiYW4gYXV0aG9yXCIsXG4gICAgXCJiYW4gYWxpYXNcIlxuICBdKTtcblxuY29uc3QgaXRlbXNGcm9tVGhpbmdTb3VscyA9IHF1ZXJ5KChzY29wZSwgc291bHMsIGRlZmluaXRpb24pID0+XG4gIFByb21pc2UuYWxsKFxuICAgIFIubWFwKHNvdWwgPT4gTGlzdGluZ1NvcnQuaXRlbUZyb21Tb3VsKHNjb3BlLCBzb3VsLCBkZWZpbml0aW9uKSwgc291bHMpXG4gICkudGhlbihMaXN0aW5nU29ydC5zb3J0SXRlbXMpXG4pO1xuXG5jb25zdCBpdGVtc0Zyb21UaGluZ1NldHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSA9PlxuICBQcm9taXNlLmFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSlcbiAgICAudGhlbihSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KSlcbiAgICAudGhlbihUaGluZ1NldC5zb3VscylcbiAgICAudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpXG4pO1xuXG5jb25zdCBsaXN0aW5nU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IGxpc3RpbmdzID0gUi5wYXRoT3IoW10sIFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImxpc3RpbmdzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChsID0+IGAke2x9LyR7c29ydH1gLCBsaXN0aW5ncyk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzIH07XG59O1xuXG5jb25zdCB0b3BpY1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IHRvcGljcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0b3BpY3NcIl0sIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghdG9waWNzLmxlbmd0aCkgdG9waWNzLnB1c2goXCJhbGxcIik7XG4gIC8vIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKHQgPT4gYC90LyR7dH0vJHtzb3J0fWAsIHRvcGljcyk7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL3QvJHt0b3BpY3Muc29ydCgpLmpvaW4oXCIrXCIpfS8ke3NvcnR9YF07XG5cbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpVG9waWMoc2NvcGUsIHsgdG9waWNzLCBzb3J0IH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgZG9tYWluU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZG9tYWlucyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJkb21haW5zXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWRvbWFpbnMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIC8vIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGQgPT4gYC9kb21haW4vJHtkfS8ke3NvcnR9YCwgZG9tYWlucyk7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL2RvbWFpbi8ke2RvbWFpbnMuc29ydCgpLmpvaW4oXCIrXCIpfS8ke3NvcnR9YF07XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aURvbWFpbihzY29wZSwgeyBkb21haW5zLCBzb3J0IH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgYXV0aG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgYXV0aG9ySWRzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImF1dGhvcnNcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB0eXBlID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInR5cGVcIl0sIGRlZmluaXRpb24pO1xuXG4gIGlmICghYXV0aG9ySWRzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vJHt0eXBlfS8ke3NvcnR9YCwgYXV0aG9ySWRzKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpQXV0aG9yKHNjb3BlLCB7IHR5cGUsIGF1dGhvcklkcyB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGN1cmF0b3JTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBjdXJhdG9ycyA9IFIucHJvcChcImN1cmF0b3JzXCIsIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghY3VyYXRvcnMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGlkID0+IGAvdXNlci8ke2lkfS9jb21tZW50ZWQvJHtzb3J0fWAsIGN1cmF0b3JzKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5LmN1cmF0ZWQoc2NvcGUsIGN1cmF0b3JzLCB0cnVlKVxuICAgICAgLnRoZW4oaWRzID0+IGlkcy5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpKVxuICAgICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBvcFNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IHN1Ym1pc3Npb25JZHMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwib3BzXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIXN1Ym1pc3Npb25JZHMubGVuZ3RoKSB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoXG4gICAgaWQgPT4gYC90aGluZ3MvJHtpZH0vY29tbWVudHMvJHtzb3J0fWAsXG4gICAgc3VibWlzc2lvbklkc1xuICApO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlTdWJtaXNzaW9uKHNjb3BlLCB7IHN1Ym1pc3Npb25JZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCByZXBsaWVzU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgaWQgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwicmVwbGllc1RvXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC91c2VyLyR7aWR9L3JlcGxpZXMvJHt0eXBlfS8ke3NvcnR9YF07XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5yZXBsaWVzVG9BdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGUsXG4gICAgICByZXBsaWVzVG9BdXRob3JJZDogaWQsXG4gICAgICBpbmRleGVyOiBkZWZpbml0aW9uLmluZGV4ZXJcbiAgICB9KS50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgc291cmNlcyA9IHtcbiAgbGlzdGluZzogbGlzdGluZ1NvdXJjZSxcbiAgcmVwbGllczogcmVwbGllc1NvdXJjZSxcbiAgb3A6IG9wU291cmNlLFxuICBjdXJhdG9yOiBjdXJhdG9yU291cmNlLFxuICBhdXRob3I6IGF1dGhvclNvdXJjZSxcbiAgZG9tYWluOiBkb21haW5Tb3VyY2UsXG4gIHRvcGljOiB0b3BpY1NvdXJjZVxufTtcblxuY29uc3Qgc291cmNlTmFtZXMgPSBSLmtleXMoc291cmNlcyk7XG5jb25zdCBzb3VyY2VOYW1lID0gZGVmID0+IFIuZmluZChkZWYuaXNQcmVzZW50LCBzb3VyY2VOYW1lcykgfHwgXCJ0b3BpY1wiO1xuY29uc3QgZnJvbURlZmluaXRpb24gPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbmFtZSA9IHNvdXJjZU5hbWUoZGVmaW5pdGlvbik7XG5cbiAgcmV0dXJuIFIubWVyZ2VMZWZ0KHsgbmFtZSB9LCBzb3VyY2VzW25hbWVdKGRlZmluaXRpb24pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRGF0YVNvdXJjZSA9IHtcbiAgZnJvbURlZmluaXRpb24sXG4gIHNvdXJjZXMsXG4gIG5lZWRzU2NvcmVzLFxuICBuZWVkc0RhdGEsXG4gIGl0ZW1zRnJvbVRoaW5nU2V0cyxcbiAgaXRlbXNGcm9tVGhpbmdTb3Vsc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSAoc291cmNlLCBvd25lcklkID0gbnVsbCwgc3BhY2VOYW1lID0gbnVsbCkgPT4ge1xuICBjb25zdCB0b2tlbml6ZWQgPSBUb2tlbml6ZXIudG9rZW5pemUoc291cmNlKTtcbiAgY29uc3Qgb2JqID0geyAuLi50b2tlbml6ZWQgfTtcbiAgY29uc3QgeyBpc1ByZXNlbnQsIGdldFZhbHVlLCBnZXRWYWx1ZXMsIGdldFZhbHVlQ2hhaW4sIGdldFBhaXJzIH0gPSB0b2tlbml6ZWQ7XG5cbiAgW1xuICAgIG9iai5mcm9tUGFnZUF1dGhvciA9IG93bmVySWQsXG4gICAgb2JqLmZyb21QYWdlTmFtZSA9IHNwYWNlTmFtZSA/IGBzcGFjZToke3NwYWNlTmFtZX1gIDogdW5kZWZpbmVkXG4gIF0gPSBnZXRWYWx1ZUNoYWluKFwic291cmNlZCBmcm9tIHBhZ2VcIik7XG4gIG9iai5kaXNwbGF5TmFtZSA9IHRva2VuaXplZC5nZXRWYWx1ZShcIm5hbWVcIikgfHwgc3BhY2VOYW1lO1xuICBvYmouaW5kZXhlciA9IGdldFZhbHVlKFwidGFidWxhdG9yXCIpIHx8IENvbmZpZy5pbmRleGVyO1xuICBvYmoudGFidWxhdG9yID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgb2JqLmluZGV4ZXI7XG4gIG9iai50YWJzID0gZ2V0UGFpcnMoXCJ0YWJcIik7XG4gIG9iai5zb3J0ID0gZ2V0VmFsdWUoXCJzb3J0XCIpO1xuXG4gIC8vIFRPRE86IGJyZWFrcyB3aXRoIGN1c3RvbSBuYW1lc1xuICBpZiAob2JqLnNvcnQgPT09IFwiZGVmYXVsdFwiKSBvYmouc29ydCA9IGdldFZhbHVlKFwidGFiXCIpO1xuXG4gIG9iai51bmlxdWVCeUNvbnRlbnQgPSAhIWlzUHJlc2VudChcInVuaXF1ZSBieSBjb250ZW50XCIpO1xuICBvYmouY3VyYXRvcnMgPSBnZXRWYWx1ZXMoXCJjdXJhdG9yXCIpO1xuICBvYmoubW9kZXJhdG9ycyA9IGdldFZhbHVlcyhcIm1vZFwiKTtcbiAgb2JqLmluY2x1ZGVSYW5rcyA9ICEhaXNQcmVzZW50KFwic2hvdyByYW5rc1wiKTtcbiAgb2JqLnN0aWNreUlkcyA9IGdldFZhbHVlcyhcInN0aWNreVwiKTtcbiAgb2JqLmlzSWRTdGlja3kgPSBpZCA9PiAhIXRva2VuaXplZC5pc1ByZXNlbnQoW1wic3RpY2t5XCIsIGlkXSk7XG4gIG9iai5pc0NoYXQgPSAhIWlzUHJlc2VudChcImRpc3BsYXkgYXMgY2hhdFwiKTtcbiAgb2JqLnN1Ym1pdFRvcGljcyA9IGdldFZhbHVlcyhcInN1Ym1pdCB0b1wiKTtcbiAgb2JqLnN1Ym1pdFRvcGljID0gZ2V0VmFsdWUoXCJzdWJtaXQgdG9cIik7XG4gIG9iai5jaGF0VG9waWMgPSBnZXRWYWx1ZShcImNoYXQgaW5cIik7XG5cbiAgaWYgKG93bmVySWQgJiYgc3BhY2VOYW1lKSB7XG4gICAgb2JqLnNwYWNlTmFtZSA9IHNwYWNlTmFtZTtcbiAgICBvYmoub3duZXIgPSBvd25lcklkO1xuICAgIG9iai51c2VGb3JDb21tZW50cyA9ICF0b2tlbml6ZWQuaXNQcmVzZW50KFwiY29tbWVudHMgbGVhdmUgc3BhY2VcIik7XG4gICAgb2JqLmJhc2VQYXRoID0gYC91c2VyLyR7b3duZXJJZH0vc3BhY2VzLyR7c3BhY2VOYW1lfWA7XG4gICAgaWYgKG9iai5zdWJtaXRUb3BpYykgb2JqLnN1Ym1pdFBhdGggPSBgJHtvYmouYmFzZVBhdGh9L3N1Ym1pdGA7XG4gICAgb2JqLmRlZmF1bHRUYWIgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJcIik7XG4gICAgb2JqLmRlZmF1bHRUYWJQYXRoID0gb2JqLmRlZmF1bHRUYWJcbiAgICAgID8gdG9rZW5pemVkLmdldFZhbHVlKFtcInRhYlwiLCBvYmouZGVmYXVsdFRhYl0pXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBvYmouZmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIGFsbG93OiB7XG4gICAgICByZXBsaWVzVG86IGdldFZhbHVlKFwicmVwbGllcyB0byBhdXRob3JcIiksXG4gICAgICB0eXBlOiBnZXRWYWx1ZShcInR5cGVcIiksIC8vIFRPRE86IHRoaXMgZmllbGQgc2VlbXMgcmVkdW5kYW50IHdpdGgga2luZCBhbmQgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbiAgICAgIG9wczogZ2V0VmFsdWVzKFwib3BcIiksXG4gICAgICBhbGlhc2VzOiBnZXRWYWx1ZXMoXCJhbGlhc1wiKSxcbiAgICAgIGF1dGhvcnM6IGdldFZhbHVlcyhcImF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImRvbWFpblwiKSxcbiAgICAgIHRvcGljczogZ2V0VmFsdWVzKFwidG9waWNcIiksXG4gICAgICBsaXN0aW5nczogZ2V0VmFsdWVzKFwibGlzdGluZ1wiKSxcbiAgICAgIGtpbmRzOiBnZXRWYWx1ZXMoXCJraW5kXCIpLFxuICAgICAgYW5vbjogIWlzUHJlc2VudChcInJlcXVpcmUgc2lnbmVkXCIpLFxuICAgICAgc2lnbmVkOiAhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpXG4gICAgfSxcbiAgICBkZW55OiB7XG4gICAgICBhbGlhc2VzOiBnZXRWYWx1ZXMoXCJiYW4gYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJiYW4gYXV0aG9yXCIpLFxuICAgICAgZG9tYWluczogZ2V0VmFsdWVzKFwiYmFuIGRvbWFpblwiKSxcbiAgICAgIHRvcGljczogZ2V0VmFsdWVzKFwiYmFuIHRvcGljXCIpLFxuICAgICAgYW5vbjogISFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogISFpc1ByZXNlbnQoXCJyZXF1aXJlIGFub25cIiksXG4gICAgICB0YWdzOiBnZXRQYWlycyhcImNhbiByZW1vdmVcIilcbiAgICB9XG4gIH07XG5cbiAgb2JqLnZvdGVGaWx0ZXJzID0ge1xuICAgIGZ1bmN0aW9uczogW10sXG4gICAgdXBzTWluOiBwYXJzZUludChnZXRWYWx1ZShcInVwcyBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgdXBzTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInVwcyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgZG93bnNNaW46IHBhcnNlSW50KGdldFZhbHVlKFwiZG93bnMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWF4OiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGJlbG93XCIpLCAxMCkgfHwgbnVsbCxcbiAgICBzY29yZU1pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJzY29yZSBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYmVsb3dcIiksIDEwKSB8fCBudWxsXG4gIH07XG5cbiAgb2JqLmNlbnNvcnMgPSBSLnVuaXEoUi5tYXAoUi5wcm9wKDEpLCBvYmouZmlsdGVycy5kZW55LnRhZ3MpKTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRGVmaW5pdGlvbiA9IHsgZnJvbVNvdXJjZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5cbmNvbnN0IGludFBhdGggPSBwID0+XG4gIFIuY29tcG9zZShcbiAgICBwYXJzZUludCxcbiAgICBSLnBhdGgocClcbiAgKTtcblxuY29uc3QgZnJvbURlZmluaXRpb24gPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBmaWx0ZXJzLCB2b3RlRmlsdGVycywgaXNQcmVzZW50IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSBbXTtcbiAgY29uc3Qgdm90ZUZpbHRlckZ1bmN0aW9ucyA9IFtdO1xuXG4gIGNvbnN0IGFkZEZpbHRlciA9ICguLi5mbnMpID0+IGZpbHRlckZ1bmN0aW9ucy5wdXNoKFIuY29tcG9zZSguLi5mbnMpKTtcbiAgY29uc3QgYWRkVm90ZUZpbHRlciA9ICguLi5mbnMpID0+IHZvdGVGaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG5cbiAgaWYgKGZpbHRlcnMuYWxsb3cuYWxpYXNlcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYWxpYXNcIiwgdF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvclwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5hdXRob3JzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJhdXRob3JcIiwgdF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LmRvbWFpbnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIHQgPT4gISFpc1ByZXNlbnQoW1wiZG9tYWluXCIsIHRdKSxcbiAgICAgIFRoaW5nRGF0YU5vZGUuZG9tYWluLFxuICAgICAgUi5wcm9wKFwiZGF0YVwiKVxuICAgICk7XG5cbiAgaWYgKFxuICAgIGZpbHRlcnMuYWxsb3cudG9waWNzLmxlbmd0aCAmJlxuICAgICFSLmZpbmQoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIuaWRlbnRpY2FsKFwiYWxsXCIpLFxuICAgICAgICBSLmxhc3QsXG4gICAgICAgIFIuc3BsaXQoXCI6XCIpXG4gICAgICApLFxuICAgICAgZmlsdGVycy5hbGxvdy50b3BpY3NcbiAgICApXG4gIClcbiAgICBhZGRGaWx0ZXIoaXRlbSA9PiB7XG4gICAgICBsZXQgdG9waWMgPSBSLnBhdGgoW1wiZGF0YVwiLCBcInRvcGljXCJdLCBpdGVtKTtcbiAgICAgIGNvbnN0IGtpbmQgPSBSLnBhdGgoW1wiZGF0YVwiLCBcImtpbmRcIl0sIGl0ZW0pO1xuXG4gICAgICBpZiAoa2luZCA9PT0gXCJjaGF0bXNnXCIpIHRvcGljID0gYGNoYXQ6JHt0b3BpY31gO1xuICAgICAgaWYgKGtpbmQgPT09IFwiY29tbWVudFwiKSB0b3BpYyA9IGBjb21tZW50czoke3RvcGljfWA7XG4gICAgICByZXR1cm4gISFpc1ByZXNlbnQoW1widG9waWNcIiwgdG9waWNdKTtcbiAgICB9KTtcblxuICBpZiAoZmlsdGVycy5hbGxvdy5raW5kcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKGtpbmQgPT4gISFpc1ByZXNlbnQoW1wia2luZFwiLCBraW5kXSksIFIucGF0aChbXCJkYXRhXCIsIFwia2luZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy50eXBlID09PSBcImNvbW1hbmRzXCIpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLnRlc3QoQ29uc3RhbnRzLkNPTU1BTkRfUkUpLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImJvZHlcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAoZmlsdGVycy5kZW55LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGFsaWFzID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYWxpYXNcIiwgYWxpYXNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9yXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYXV0aG9ySWQgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhdXRob3JcIiwgYXV0aG9ySWRdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBkb21haW4gPT4gIWRvbWFpbiB8fCAhaXNQcmVzZW50KFtcImJhblwiLCBcImRvbWFpblwiLCBkb21haW5dKSxcbiAgICAgIFRoaW5nRGF0YU5vZGUuZG9tYWluXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS50b3BpY3MubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIHRvcGljID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwidG9waWNcIiwgdG9waWNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hbm9uKSBhZGRGaWx0ZXIoUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5kZW55LnNpZ25lZClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIGF1dGhvcklkID0+ICFhdXRob3JJZCxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmICh2b3RlRmlsdGVycy51cHNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy51cHNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnVwc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5kb3duc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLmRvd25zTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuc2NvcmVNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuc2NvcmVNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcblxuICBpZiAoZmlsdGVycy5kZW55LnRhZ3MubGVuZ3RoKVxuICAgIGFkZFZvdGVGaWx0ZXIodGhpbmcgPT4ge1xuICAgICAgY29uc3QgY21kcyA9IFIucGF0aChbXCJ2b3Rlc1wiLCBcImNvbW1hbmRzXCJdLCB0aGluZykgfHwge307XG5cbiAgICAgIHJldHVybiAhZmlsdGVycy5kZW55LnRhZ3MuZmluZChcbiAgICAgICAgKFt0YWdOYW1lLCBhdXRob3JJZF0pID0+ICEhUi5wYXRoKFthdXRob3JJZCwgXCJ0YWdcIiwgdGFnTmFtZV0sIGNtZHMpXG4gICAgICApO1xuICAgIH0pO1xuXG4gIGNvbnN0IGNvbnRlbnRGaWx0ZXIgPSB0aGluZyA9PiAhZmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHZvdGVGaWx0ZXIgPSB0aGluZyA9PiAhdm90ZUZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB0aGluZ0ZpbHRlciA9IHRoaW5nID0+XG4gICAgZGVmaW5pdGlvbi5pc0lkU3RpY2t5KFIucHJvcChcImlkXCIsIHRoaW5nKSkgfHxcbiAgICAoY29udGVudEZpbHRlcih0aGluZykgJiYgdm90ZUZpbHRlcih0aGluZykpO1xuXG4gIHJldHVybiB7IHRoaW5nRmlsdGVyLCBjb250ZW50RmlsdGVyLCB2b3RlRmlsdGVyIH07XG59O1xuXG5jb25zdCBnZXRGaWx0ZXJlZFJvd3MgPSBhc3luYyAoXG4gIHNjb3BlLFxuICBzcGVjLFxuICBzb3J0ZWRSb3dzLFxuICB7IGxpbWl0OiBsaW1pdFByb3AgPSAyNSwgY291bnQ6IGNvdW50UHJvcCA9IDAsIGFmdGVyID0gbnVsbCwgZmlsdGVyRm4gfSA9IHt9XG4pID0+IHtcbiAgY29uc3QgbGltaXQgPSBwYXJzZUludChsaW1pdFByb3AsIDEwKTtcbiAgY29uc3QgY291bnQgPSBwYXJzZUludChjb3VudFByb3AsIDEwKSB8fCAwO1xuICBjb25zdCByb3dzID0gc29ydGVkUm93cy5zbGljZSgpO1xuICBjb25zdCBmaWx0ZXJlZCA9IFtdO1xuICBjb25zdCBmZXRjaEJhdGNoID0gKHNpemUgPSAzMCkgPT5cbiAgICBQcm9taXNlLmFsbChcbiAgICAgIFIubWFwKGFzeW5jIHJvdyA9PiB7XG4gICAgICAgIGxldCBpbkxpc3RpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmICghcm93W0xpc3RpbmdOb2RlLlBPU19JRF0pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImJsYW5rUm93XCIsIHJvdyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlckZuKSBpbkxpc3RpbmcgPSBhd2FpdCBmaWx0ZXJGbihyb3dbTGlzdGluZ05vZGUuUE9TX0lEXSk7XG4gICAgICAgIGlmIChpbkxpc3RpbmcpIGZpbHRlcmVkLnB1c2gocm93KTtcbiAgICAgIH0sIHJvd3Muc3BsaWNlKGNvdW50LCBzaXplKSlcbiAgICApO1xuXG4gIHdoaWxlIChyb3dzLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgYXdhaXQgZmV0Y2hCYXRjaCgpO1xuICAgIGlmIChsaW1pdCAmJiBmaWx0ZXJlZC5sZW5ndGggPj0gbGltaXQpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIFIuY29tcG9zZShcbiAgICBsaW1pdCA/IFIuc2xpY2UoMCwgbGltaXQpIDogUi5pZGVudGl0eSxcbiAgICBSLnNvcnRCeShSLnByb3AoTGlzdGluZ05vZGUuUE9TX1ZBTCkpXG4gICkoZmlsdGVyZWQpO1xufTtcblxuY29uc3QgZ2V0RmlsdGVyZWRJZHMgPSBSLmNvbXBvc2UoXG4gIHggPT4geC50aGVuKFIubWFwKFIucHJvcChMaXN0aW5nTm9kZS5QT1NfSUQpKSksXG4gIGdldEZpbHRlcmVkUm93c1xuKTtcblxuY29uc3QgdGhpbmdGaWx0ZXIgPSBSLmN1cnJ5KChzY29wZSwgc3BlYywgdGhpbmdJZCkgPT5cbiAgUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSxcbiAgICBzY29yZXM6IExpc3RpbmdEYXRhU291cmNlLm5lZWRzU2NvcmVzKHNwZWMpLFxuICAgIGRhdGE6IExpc3RpbmdEYXRhU291cmNlLm5lZWRzRGF0YShzcGVjKVxuICB9KS50aGVuKHNwZWMudGhpbmdGaWx0ZXIpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0ZpbHRlciA9IHtcbiAgZnJvbURlZmluaXRpb24sXG4gIGdldEZpbHRlcmVkUm93cyxcbiAgZ2V0RmlsdGVyZWRJZHMsXG4gIHRoaW5nRmlsdGVyXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuXG5jb25zdCBbUE9TX0lEWCwgUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxLCAyLCAzXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuY29uc3Qgcm93c1RvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgcm93c1RvSXRlbXMgPSBSLm1hcChSLnNsaWNlKDEsIDMpKTtcbmNvbnN0IHNvdXJjZSA9IFIucHJvcE9yKFwiXCIsIFwic291cmNlXCIpO1xuY29uc3Qgc291bEZyb21QYXRoID0gUi5jdXJyeShcbiAgKGluZGV4ZXIsIHBhdGgpID0+IGAke0NvbnN0YW50cy5QUkVGSVh9JHtwYXRofUB+JHtpbmRleGVyfS5gXG4pO1xuY29uc3QgcGF0aEZyb21Tb3VsID0gUi5jb21wb3NlKFxuICBSLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7Q29uc3RhbnRzLlBSRUZJWH1gKSwgXCJcIiksXG4gIFIucmVwbGFjZSgvQH4uKlxcLi8sIFwiXCIpXG4pO1xuXG5jb25zdCBpZFRvU291bCA9IHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pO1xuY29uc3QgaWRzVG9Tb3VscyA9IFIubWFwKGlkVG9Tb3VsKTtcbmNvbnN0IHNvdWxUb0lkID0gc291bCA9PiBSLnByb3AoXCJ0aGluZ0lkXCIsIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChzb3VsKSk7XG5jb25zdCBzb3Vsc1RvSWRzID0gUi5tYXAoc291bFRvSWQpO1xuXG5jb25zdCBnZXRSb3cgPSBSLmN1cnJ5KChub2RlLCBpZHgpID0+XG4gIFIuY29tcG9zZShcbiAgICBSLmlmRWxzZShSLnByb3AoXCJsZW5ndGhcIiksIFIuaW5zZXJ0KDAsIHBhcnNlSW50KGlkeCwgMTApKSwgUi5hbHdheXMobnVsbCkpLFxuICAgIHJvdyA9PiB7XG4gICAgICByb3dbMV0gPSBwYXJzZUZsb2F0KHJvd1sxXSk7XG4gICAgICByZXR1cm4gcm93O1xuICAgIH0sXG4gICAgUi5tYXAoUi50cmltKSxcbiAgICBSLnNwbGl0KFwiLFwiKSxcbiAgICBSLnByb3BPcihcIlwiLCBgJHtpZHh9YClcbiAgKShub2RlKVxuKTtcblxuY29uc3QgaXRlbUtleXMgPSBSLmNvbXBvc2UoXG4gIFIuZmlsdGVyKFxuICAgIFIuY29tcG9zZShcbiAgICAgIHZhbCA9PiAhISh2YWwgPT09IDAgfHwgdmFsKSxcbiAgICAgIHBhcnNlSW50XG4gICAgKVxuICApLFxuICBSLmtleXNcbik7XG5cbmNvbnN0IHNlcmlhbGl6ZSA9IFIuY3VycnkoKHNwZWMsIGl0ZW1zKSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5hZGRJbmRleChSLnJlZHVjZSkoXG4gICAgICAocmVzLCByb3csIGlkeCkgPT4gUi5hc3NvYyhgJHtpZHh9YCwgcm93LmpvaW4oXCIsXCIpLCByZXMpLFxuICAgICAge31cbiAgICApLFxuICAgIFIuZGVmYXVsdFRvKFtdKVxuICApKGl0ZW1zKVxuKTtcblxuY29uc3Qgcm93cyA9IG5vZGUgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIubWFwKGdldFJvdyhub2RlKSksXG4gICAgaXRlbUtleXNcbiAgKShub2RlKTtcblxuY29uc3QgaWRzID0gUi5jb21wb3NlKFxuICByb3dzVG9JZHMsXG4gIHJvd3Ncbik7XG5cbmNvbnN0IHNvcnRSb3dzID0gUi5zb3J0V2l0aChbXG4gIFIuYXNjZW5kKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIuY29uZChbW1IuaXNOaWwsIFIuYWx3YXlzKEluZmluaXR5KV0sIFtSLlQsIHBhcnNlRmxvYXRdXSksXG4gICAgICBSLnByb3AoUE9TX1ZBTClcbiAgICApXG4gIClcbl0pO1xuXG5jb25zdCBzb3J0ZWRJZHMgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIucHJvcChQT1NfSUQpKSxcbiAgc29ydFJvd3MsXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICByb3dzXG4pO1xuXG5jb25zdCBpdGVtc1RvUm93cyA9IFIuYWRkSW5kZXgoUi5tYXApKChpdGVtLCBpZHgpID0+IFtpZHgsIC4uLml0ZW1dKTtcblxuY29uc3QgZGlmZiA9IGFzeW5jIChcbiAgbm9kZSxcbiAgdXBkYXRlZEl0ZW1zID0gW10sXG4gIHJlbW92ZUlkcyA9IFtdLFxuICB7IG1heFNpemUgPSAxMDAwIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IHJlbW92ZWQgPSBSLmluZGV4QnkoUi5pZGVudGl0eSwgcmVtb3ZlSWRzKTtcbiAgY29uc3QgYnlJZCA9IHt9O1xuICBjb25zdCBjaGFuZ2VzID0ge307XG4gIGNvbnN0IHJvd3MgPSBbXTtcbiAgY29uc3QgdXBkYXRlZCA9IHt9O1xuICBsZXQgdG9SZXBsYWNlID0gW107XG4gIGxldCBtYXhJZHggPSAwO1xuICBsZXQga2V5O1xuXG4gIGZvciAoa2V5IGluIG5vZGUgfHwge30pIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChrZXksIDEwKTtcblxuICAgIGlmICghKHBhcnNlZCB8fCBwYXJzZWQgPT09IDApKSBjb250aW51ZTtcbiAgICBjb25zdCByb3cgPSBnZXRSb3cobm9kZSwga2V5KSB8fCBbcGFyc2VkLCBudWxsLCBudWxsXTtcbiAgICBjb25zdCBbaWR4LCBpZCA9IG51bGwsIHJhd1ZhbHVlID0gbnVsbF0gPSByb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIHJvd1tQT1NfVkFMXSA9IHJhd1ZhbHVlID09PSBudWxsID8gbnVsbCA6IHBhcnNlRmxvYXQocmF3VmFsdWUpO1xuICAgIGlmIChpZCAmJiByZW1vdmVkW2lkXSkgcm93W1BPU19JRF0gPSByb3dbUE9TX1ZBTF0gPSBudWxsO1xuICAgIGlmIChpZCkgYnlJZFtpZF0gPSByb3c7XG4gICAgaWYgKHJvd1tQT1NfSURdKSB7XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9SZXBsYWNlLnB1c2gocm93KTtcbiAgICB9XG4gICAgaWYgKGlkeCA+IG1heElkeCkgbWF4SWR4ID0gaWR4O1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBbaWQsIHZhbHVlXSA9IHVwZGF0ZWRJdGVtc1tpXSB8fCBbbnVsbCwgbnVsbF07XG5cbiAgICBpZiAoIWlkKSBjb250aW51ZTtcbiAgICBjb25zdCBleGlzdGluZyA9IGJ5SWRbaWRdO1xuXG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICBpZiAoZXhpc3RpbmdbUE9TX1ZBTF0gIT09IHZhbHVlKSB7XG4gICAgICAgIGV4aXN0aW5nW1BPU19WQUxdID0gdmFsdWU7XG4gICAgICAgIHVwZGF0ZWRbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgcm93ID0gW251bGwsIGlkLCB2YWx1ZV07XG5cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFsbFNvcnRlZCA9IHNvcnRSb3dzKHJvd3MpO1xuICBjb25zdCBzb3J0ZWQgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKDAsIG1heFNpemUpIDogYWxsU29ydGVkO1xuICBjb25zdCBtaXNzaW5nID0gbWF4U2l6ZSA/IGFsbFNvcnRlZC5zbGljZShtYXhTaXplLCBhbGxTb3J0ZWQubGVuZ3RoKSA6IFtdO1xuICBjb25zdCBhZGRlZCA9IFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gPT09IG51bGwsIHNvcnRlZCk7XG5cbiAgdG9SZXBsYWNlID0gdG9SZXBsYWNlXG4gICAgLmNvbmNhdChSLmZpbHRlcihyb3cgPT4gcm93W1BPU19JRFhdICE9PSBudWxsLCBtaXNzaW5nKSlcbiAgICAucmV2ZXJzZSgpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaWQgPSBzb3J0ZWRbaV1bUE9TX0lEXTtcbiAgICBjb25zdCBpZHggPSBzb3J0ZWRbaV1bUE9TX0lEWF07XG4gICAgY29uc3QgdmFsID0gc29ydGVkW2ldW1BPU19WQUxdO1xuXG4gICAgaWYgKGlkeCAhPT0gbnVsbCAmJiB1cGRhdGVkW2lkXSkgY2hhbmdlc1tgJHtpZHh9YF0gPSBbaWQsIHZhbF0uam9pbihcIixcIik7XG4gIH1cblxuICBjb25zdCBpbnNlcnRlZCA9IFtdO1xuXG4gIHdoaWxlIChhZGRlZC5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSBhZGRlZC5wb3AoKTtcbiAgICBjb25zdCByZXBsYWNlZCA9IHRvUmVwbGFjZS5wb3AoKTtcbiAgICBsZXQgW2lkeF0gPSByZXBsYWNlZCB8fCBbbnVsbF07XG5cbiAgICBpZiAoaWR4ID09PSBudWxsKSB7XG4gICAgICBpZHggPSBwYXJzZUludChtYXhJZHgsIDEwKSArIGluc2VydGVkLmxlbmd0aCArIDE7XG4gICAgICBpbnNlcnRlZC5wdXNoKGlkeCk7XG4gICAgfVxuXG4gICAgY2hhbmdlc1tgJHtpZHh9YF0gPSBbcm93W1BPU19JRF0sIHJvd1tQT1NfVkFMXV0uam9pbihcIixcIik7XG4gIH1cblxuICB3aGlsZSAodG9SZXBsYWNlLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IHRvUmVwbGFjZS5wb3AoKTtcblxuICAgIGlmIChyb3cgJiYgIXJvd1tQT1NfSURdKSB7XG4gICAgICBjb25zdCBpZHggPSBgJHtyb3dbUE9TX0lEWF19YDtcblxuICAgICAgaWYgKG5vZGVbaWR4XSAhPT0gbnVsbCkge1xuICAgICAgICBjaGFuZ2VzW2lkeF0gPSBudWxsO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm51bGxpbmdcIiwgaWR4LCBub2RlW2lkeF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBSLmtleXMoY2hhbmdlcykubGVuZ3RoID8gY2hhbmdlcyA6IG51bGw7XG59O1xuXG5jb25zdCBjYXRlZ29yaXplRGlmZiA9IChkaWZmLCBvcmlnaW5hbCkgPT4ge1xuICBjb25zdCBhbGxLZXlzID0gaXRlbUtleXMoUi5tZXJnZUxlZnQoZGlmZiwgb3JpZ2luYWwpKTtcbiAgY29uc3QgYWRkZWQgPSBbXTtcbiAgY29uc3QgcmVtb3ZlZCA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGFsbEtleXNbaV07XG4gICAgY29uc3QgW19kaWZmSWR4LCBkaWZmSWRdID0gZ2V0Um93KGRpZmYsIGtleSkgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBjb25zdCBbX29yaWdJZHgsIG9yaWdJZF0gPSBnZXRSb3cob3JpZ2luYWwsIGtleSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIGlmIChkaWZmSWQgIT09IG9yaWdJZCkge1xuICAgICAgaWYgKGRpZmZJZCkgYWRkZWQucHVzaChkaWZmSWQpO1xuICAgICAgaWYgKG9yaWdJZCkgcmVtb3ZlZC5wdXNoKG9yaWdJZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFthZGRlZCwgcmVtb3ZlZF07XG59O1xuXG5jb25zdCB1bmlvblJvd3MgPSBSLmNvbXBvc2UoXG4gIFIudW5pcUJ5KFIucHJvcChQT1NfSUQpKSxcbiAgc29ydFJvd3MsXG4gIFIucmVkdWNlKFIuY29uY2F0LCBbXSksXG4gIFIubWFwKHJvd3MpXG4pO1xuXG5jb25zdCByb3dzRnJvbVNvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscykgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpLnRoZW4odW5pb25Sb3dzKVxuKTtcblxuY29uc3QgcmVhZCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT4ge1xuICBjb25zdCB7IGluZGV4ZXIgPSBDb25maWcuaW5kZXhlciB9ID0gb3B0cyB8fCB7fTtcblxuICByZXR1cm4gcm93c0Zyb21Tb3VscyhzY29wZSwgW3NvdWxGcm9tUGF0aChpbmRleGVyLCBwYXRoKV0pLnRoZW4ocm93c1RvSWRzKTtcbn0sIFwibGlzdGluZ1Jvd3NcIik7XG5cbmNvbnN0IGdldCA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IChzb3VsID8gc2NvcGUuZ2V0KHNvdWwpIDogcmVzb2x2ZShudWxsKSksXG4gIFwibGlzdGluZ1wiXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ05vZGUgPSB7XG4gIFBPU19JRFgsXG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc291cmNlLFxuICBnZXQsXG4gIGdldFJvdyxcbiAgaXRlbUtleXMsXG4gIHNlcmlhbGl6ZSxcbiAgcm93cyxcbiAgaWRzLFxuICBpZFRvU291bCxcbiAgaWRzVG9Tb3VscyxcbiAgc291bFRvSWQsXG4gIHNvdWxzVG9JZHMsXG4gIHJvd3NUb0lkcyxcbiAgcm93c1RvSXRlbXMsXG4gIGl0ZW1zVG9Sb3dzLFxuICBzb3J0Um93cyxcbiAgc29ydGVkSWRzLFxuICBzb3VsRnJvbVBhdGgsXG4gIHBhdGhGcm9tU291bCxcbiAgcm93c0Zyb21Tb3VscyxcbiAgcmVhZCxcbiAgZGlmZixcbiAgY2F0ZWdvcml6ZURpZmYsXG4gIHVuaW9uUm93c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IHVwZGF0ZUxpc3RpbmcgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHNjb3BlLFxuICBzcGVjLFxuICBpZHMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW11cbikgPT4ge1xuICBpZiAoIWlkcy5sZW5ndGggJiYgIXJlbW92ZUlkcy5sZW5ndGgpIHJldHVybjtcbiAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IGF3YWl0IExpc3RpbmdTb3J0LnRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYyk7XG4gIGNvbnN0IGNoYW5nZXMgPSBhd2FpdCBMaXN0aW5nTm9kZS5kaWZmKGV4aXN0aW5nLCB1cGRhdGVkSXRlbXMsIHJlbW92ZUlkcyk7XG5cbiAgaWYgKGNoYW5nZXMpIGNvbnNvbGUubG9nKFwiQ0hBTkdFU1wiLCByb3V0ZS5zb3VsLCBjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXMpIHJvdXRlLndyaXRlKGNoYW5nZXMpO1xufTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyBzb3VsLCB1cGRhdGVkU291bCwgZGlmZiwgLi4ucHJvcHMgfSkgPT4ge1xuICBsZXQgdXBkYXRlZElkcyA9IFtdO1xuXG4gIGNvbnN0IHBhdGggPSBMaXN0aW5nTm9kZS5wYXRoRnJvbVNvdWwoc291bCk7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgpO1xuXG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGlzU3RpY2t5ID0gUi5lcXVhbHMocm91dGUubWF0Y2gudGhpbmdJZCB8fCBudWxsKTtcblxuICBpZiAodGhpbmdJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICB1cGRhdGVkSWRzID0gUi5jb25jYXQodXBkYXRlZElkcywgVGhpbmdTZXQuaWRzKEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpKSk7XG5cbiAgYXdhaXQgdXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10sIGlzU3RpY2t5KTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdPcmFjbGUgPSB7XG4gIHVwZGF0ZUxpc3RpbmcsXG4gIG9uUHV0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuY29uc3QgY2FsY3VsYXRlUm93cyA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHN0aWNreUl0ZW1zID0gUi5tYXAoaWQgPT4gW2lkLCAtSW5maW5pdHldLCBzcGVjLnN0aWNreUlkcyk7XG5cbiAgaWYgKCFzcGVjLmRhdGFTb3VyY2UucXVlcnkpIHJldHVybiByZXNvbHZlKFtdKTtcbiAgcmV0dXJuIHNwZWMuZGF0YVNvdXJjZS5xdWVyeShzY29wZSkudGhlbihpdGVtcyA9PiB7XG4gICAgY29uc3Qgcm93cyA9IExpc3RpbmdOb2RlLml0ZW1zVG9Sb3dzKFsuLi5zdGlja3lJdGVtcywgLi4uaXRlbXNdKTtcblxuICAgIHJldHVybiBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkUm93cyhzY29wZSwgc3BlYywgcm93cywge1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGZpbHRlckZuXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IGNhbGN1bGF0ZSA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7fSk7XG5cbmNvbnN0IHRvTm9kZSA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cykgPT5cbiAgY2FsY3VsYXRlUm93cyhzY29wZSwgc3BlYywgb3B0cykudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBMaXN0aW5nTm9kZS5zZXJpYWxpemUoc3BlYyksXG4gICAgICBMaXN0aW5nTm9kZS5yb3dzVG9JdGVtc1xuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVhZCA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHBhdGhzID0gUi5wYXRoT3IoW10sIFtcImRhdGFTb3VyY2VcIiwgXCJsaXN0aW5nUGF0aHNcIl0sIHNwZWMpO1xuICBjb25zdCBzdGlja3lSb3dzID0gUi5tYXAoaWQgPT4gWy0xLCBpZCwgLUluZmluaXR5XSwgc3BlYy5zdGlja3lJZHMpO1xuICBjb25zdCBzb3VscyA9IFIubWFwKFxuICAgIExpc3RpbmdOb2RlLnNvdWxGcm9tUGF0aChvcHRzLmluZGV4ZXIgfHwgc3BlYy5pbmRleGVyKSxcbiAgICBwYXRoc1xuICApO1xuXG4gIHJldHVybiBMaXN0aW5nTm9kZS5yb3dzRnJvbVNvdWxzKHNjb3BlLCBzb3VscykudGhlbihyb3dzID0+XG4gICAgTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZElkcyhzY29wZSwgc3BlYywgWy4uLnN0aWNreVJvd3MsIC4uLnJvd3NdLCB7XG4gICAgICAuLi5vcHRzLFxuICAgICAgZmlsdGVyRm5cbiAgICB9KVxuICApO1xufSk7XG5cbmNvbnN0IGZyb21TcGVjID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+XG4gIChvcHRzLmNhbGN1bGF0ZSA/IGNhbGN1bGF0ZSA6IHJlYWQpKHNjb3BlLCBzcGVjLCBvcHRzKVxuKTtcblxuY29uc3QgZnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgdHlwZSA9IExpc3RpbmdUeXBlLmZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oc3BlYyA9PiB7XG4gICAgaWYgKHNwZWMuaGFzSW5kZXhlciAmJiAhb3B0cy5jYWxjdWxhdGUpIHtcbiAgICAgIGlmICghdHlwZSB8fCAhdHlwZS5yZWFkKSByZXR1cm4gTGlzdGluZ05vZGUucmVhZChzY29wZSwgcGF0aCwgb3B0cyk7XG4gICAgICByZXR1cm4gdHlwZS5yZWFkKHNjb3BlLCB0eXBlLm1hdGNoLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyb21TcGVjKHNjb3BlLCBzcGVjLCBvcHRzKTtcbiAgfSk7XG59KTtcblxuY29uc3Qgbm9kZUZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PlxuICBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgpLnRoZW4oc3BlYyA9PlxuICAgIHRvTm9kZShzY29wZSwgc3BlYywgUi5tZXJnZUxlZnQob3B0cywgeyBsaW1pdDogQ29uc3RhbnRzLkxJU1RJTkdfU0laRSB9KSlcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdRdWVyeSA9IHtcbiAgZnJvbVNwZWMsXG4gIGZyb21QYXRoLFxuICBjYWxjdWxhdGVSb3dzLFxuICB0b05vZGUsXG4gIG5vZGVGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgYWxsLCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5cbmNvbnN0IFtQT1NfSUQsIFBPU19WQUxdID0gWzAsIDFdO1xuY29uc3QgdG9JZHMgPSBSLm1hcChSLnByb3AoUE9TX0lEKSk7XG5jb25zdCBzb3J0SXRlbXMgPSBSLnNvcnRCeShSLnByb3AoUE9TX1ZBTCkpO1xuXG5jb25zdCB2b3RlU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT4ge1xuICBpZiAoc3BlYy5pc0lkU3RpY2t5KHRoaW5nSWQpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuICBpZiAoUi5jb250YWlucyh0aGluZ0lkLCBzcGVjLmZpbHRlcnMuYWxsb3cub3BzKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcblxuICByZXR1cm4gUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICBzY29yZXM6IHRydWUsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihyZXMgPT4gZm4ocmVzLCBzcGVjKSk7XG59KTtcblxuY29uc3QgdGltZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihmbilcbik7XG5cbmNvbnN0IHNvcnRzID0ge1xuICBuZXc6IHRpbWVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubXVsdGlwbHkoLTEpLFxuICAgICAgUi5kZWZhdWx0VG8oMCksXG4gICAgICBSLnByb3AoXCJ0aW1lc3RhbXBcIiksXG4gICAgKVxuICApLFxuICBvbGQ6IHRpbWVTb3J0KFIucHJvcChcInRpbWVzdGFtcFwiKSksXG4gIGFjdGl2ZTogdm90ZVNvcnQoXG4gICAgKHsgdGltZXN0YW1wLCBsYXN0QWN0aXZlIH0pID0+IC0xICogKGxhc3RBY3RpdmUgfHwgdGltZXN0YW1wKVxuICApLFxuICB0b3A6IHZvdGVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIHggPT4gLTEgKiBwYXJzZUludCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKVxuICAgIClcbiAgKSxcbiAgY29tbWVudHM6IHZvdGVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIHggPT4gLTEgKiBwYXJzZUZsb2F0KHgsIDEwKSxcbiAgICAgIFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiY29tbWVudFwiXSlcbiAgICApXG4gICksXG4gIGRpc2N1c3NlZDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IFIucHJvcChcInRpbWVzdGFtcFwiLCB0aGluZyk7XG4gICAgY29uc3Qgc2NvcmUgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lc3RhbXAgLyAxMDAwIC0gMTEzNDAyODAwMztcbiAgICBjb25zdCBvcmRlciA9IE1hdGgubG9nMTAoTWF0aC5tYXgoTWF0aC5hYnMoc2NvcmUpLCAxKSk7XG5cbiAgICBpZiAoIXNjb3JlKSByZXR1cm4gMTAwMDAwMDAwMCAtIHNlY29uZHM7XG4gICAgcmV0dXJuIC0xICogKG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGhvdDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IFIucHJvcChcInRpbWVzdGFtcFwiLCB0aGluZyk7XG4gICAgY29uc3Qgc2NvcmUgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuICAgIGxldCBzaWduID0gMDtcblxuICAgIGlmIChzY29yZSA+IDApIHtcbiAgICAgIHNpZ24gPSAxO1xuICAgIH0gZWxzZSBpZiAoc2NvcmUgPCAwKSB7XG4gICAgICBzaWduID0gLTE7XG4gICAgfVxuICAgIHJldHVybiAtMSAqIChzaWduICogb3JkZXIgKyBzZWNvbmRzIC8gNDUwMDApO1xuICB9KSxcbiAgYmVzdDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHVwcyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwidXBcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IGRvd25zID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJkb3duXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBuID0gdXBzICsgZG93bnM7XG5cbiAgICBpZiAobiA9PT0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgeiA9IDEuMjgxNTUxNTY1NTQ1OyAvLyA4MCUgY29uZmlkZW5jZVxuICAgIGNvbnN0IHAgPSB1cHMgLyBuO1xuICAgIGNvbnN0IGxlZnQgPSBwICsgKDEgLyAoMiAqIG4pKSAqIHogKiB6O1xuICAgIGNvbnN0IHJpZ2h0ID0geiAqIE1hdGguc3FydCgocCAqICgxIC0gcCkpIC8gbiArICh6ICogeikgLyAoNCAqIG4gKiBuKSk7XG4gICAgY29uc3QgdW5kZXIgPSAxICsgKDEgLyBuKSAqIHogKiB6O1xuXG4gICAgcmV0dXJuIC0xICogKChsZWZ0IC0gcmlnaHQpIC8gdW5kZXIpO1xuICB9KSxcbiAgY29udHJvdmVyc2lhbDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHVwcyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwidXBcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IGRvd25zID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJkb3duXCJdLCB0aGluZyksIDEwKTtcblxuICAgIGlmICh1cHMgPD0gMCB8fCBkb3ducyA8PSAwKSByZXR1cm4gMDtcbiAgICBjb25zdCBtYWduaXR1ZGUgPSB1cHMgKyBkb3ducztcbiAgICBjb25zdCBiYWxhbmNlID0gdXBzID4gZG93bnMgPyBkb3ducyAvIHVwcyA6IHVwcyAvIGRvd25zO1xuXG4gICAgcmV0dXJuIC0xICogbWFnbml0dWRlICoqIGJhbGFuY2U7XG4gIH0pXG59O1xuXG5jb25zdCBpc1ZhbGlkU29ydCA9IHNvcnQgPT4gISFzb3J0c1tzb3J0XTtcblxuY29uc3QgdG9JdGVtID0gcXVlcnkoXG4gIChzY29wZSwgaWQsIHNwZWMpID0+XG4gICAgKHNvcnRzW3NwZWMuc29ydF0gfHwgc29ydHMubmV3KShzY29wZSwgaWQsIHNwZWMpLnRoZW4odmFsID0+IFtpZCwgdmFsXSlcbik7XG5cbmNvbnN0IGl0ZW1Gcm9tU291bCA9IChzY29wZSwgc291bCwgc3BlYykgPT4gdG9JdGVtKHNjb3BlLCBMaXN0aW5nTm9kZS5zb3VsVG9JZChzb3VsKSwgc3BlYyk7XG5cbmNvbnN0IHRvSXRlbXMgPSBxdWVyeShcbiAgKHNjb3BlLCBpZHMsIHNwZWMpID0+IGFsbChSLm1hcChcbiAgICBpZCA9PiB0b0l0ZW0oc2NvcGUsIGlkLCBzcGVjKSxcbiAgICBpZHNcbiAgKSlcbik7XG5cbmNvbnN0IGZyb21UaGluZ1NldHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3Vscywgc3BlYykgPT5cbiAgICBhbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgICAudGhlbihSLnBpcGUoXG4gICAgICAgIFRoaW5nU2V0LnVuaW9uLFxuICAgICAgICBUaGluZ1NldC5pZHMsXG4gICAgICAgIGlkcyA9PiB0b0l0ZW1zKHNjb3BlLCBpZHMsIHNwZWMpXG4gICAgICApKVxuICAgICAgLnRoZW4oc29ydEl0ZW1zKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTb3J0ID0ge1xuICBQT1NfSUQsXG4gIFBPU19WQUwsXG4gIHNvcnRzLFxuICBpc1ZhbGlkU29ydCxcbiAgdG9JdGVtLFxuICB0b0l0ZW1zLFxuICB0b0lkcyxcbiAgaXRlbUZyb21Tb3VsLFxuICBzb3J0SXRlbXMsXG4gIGZyb21UaGluZ1NldHNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ0RlZmluaXRpb24gfSBmcm9tIFwiLi9MaXN0aW5nRGVmaW5pdGlvblwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IFIuY29tcG9zZShcbiAgUi5hcHBseShSLm1lcmdlTGVmdCksXG4gIFIuYXAoW0xpc3RpbmdGaWx0ZXIuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgUi5hcHBseShSLmFzc29jKFwiZGF0YVNvdXJjZVwiKSksXG4gIFIuYXAoW0xpc3RpbmdEYXRhU291cmNlLmZyb21EZWZpbml0aW9uLCBSLmlkZW50aXR5XSksXG4gIFIub2YsXG4gIExpc3RpbmdEZWZpbml0aW9uLmZyb21Tb3VyY2Vcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhID0gXCJcIikgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lKVxuICAgIC50aGVuKFIuY29tcG9zZShcbiAgICAgIGJvZHkgPT4gYCR7Ym9keX1cbiMgYWRkZWQgYnkgaW5kZXhlclxuJHtleHRyYSB8fCBcIlwifVxuc291cmNlZCBmcm9tIHBhZ2UgJHthdXRob3JJZH0gJHtuYW1lfVxuYCxcbiAgICAgIFRoaW5nRGF0YU5vZGUuYm9keVxuICAgICkpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1NwZWMgPSB7IGZyb21Tb3VyY2UsIGdldFNvdXJjZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvY2hhdFwiO1xuY29uc3QgdGFicyA9IFsgLi4uVG9waWNMaXN0aW5nLnRhYnMsIFwiY2hhdFwiIF07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y2hhdDpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCBub3JtYWxUb3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpYyA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IG5vcm1hbFRvcGljc1swXSB8fCBcIndoYXRldmVyXCI7XG4gIGNvbnN0IHRvcGljcyA9IG5vcm1hbFRvcGljcy5yZWR1Y2UoXG4gICAgKHJlcywgdG9waWMpID0+IFsuLi5yZXMsIGBjaGF0OiR7dG9waWN9YF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjaGF0XCIsXG4gICAgW1xuICAgICAgXCJzb3J0IG5ld1wiLFxuICAgICAgXCJkaXNwbGF5IGFzIGNoYXRcIixcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDaGF0TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y29tbWVudHM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRoaW5nSWQsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjb21tZW50c1wiLFxuICAgIFtgb3AgJHt0aGluZ0lkfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9jb21tZW50ZWQvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNvbW1lbnRlZDpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjb21tZW50ZWRcIixcbiAgICBbXG4gICAgICBgY3VyYXRvciAke2F1dGhvcklkfWAsXG4gICAgICBgc29ydCAke3NvcnR9YFxuICAgIF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRlZExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIGdldFNpZGViYXIsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcblxuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL2RvbWFpbi86ZG9tYWluLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmRvbWFpbjpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgZG9tYWluLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgZG9tYWlucyA9IFBhdGguc3BsaXRUb3BpY3MoZG9tYWluKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpkb21haW5cIixcbiAgICBbXG4gICAgICBgbmFtZSAke2RvbWFpbnNbMF19YCxcbiAgICAgIFwic3VibWl0IHRvIHdoYXRldmVyXCIsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIFwia2luZCBzdWJtaXNzaW9uXCIsXG4gICAgICAuLi5SLm1hcChkb21haW4gPT4gYGRvbWFpbiAke2RvbWFpbn1gLCBkb21haW5zKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvZG9tYWluLyR7ZG9tYWlufS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRG9tYWluTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgdGFicyxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljL2ZpcmVob3NlXCI7XG5jb25zdCB0YWJzID0gVG9waWNMaXN0aW5nLnRhYnM7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpmaXJlaG9zZTpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCBub3JtYWxUb3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpYyA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IG5vcm1hbFRvcGljc1swXSB8fCBcIndoYXRldmVyXCI7XG4gIGNvbnN0IHRvcGljcyA9IG5vcm1hbFRvcGljcy5yZWR1Y2UoXG4gICAgKHJlcywgdG9waWMpID0+IFsuLi5yZXMsIHRvcGljLCBgY2hhdDoke3RvcGljfWAsIGBjb21tZW50czoke3RvcGljfWBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6ZmlyZWhvc2VcIixcbiAgICBbXG4gICAgICBcInNvcnQgbmV3XCIsXG4gICAgICBcImRpc3BsYXkgYXMgY2hhdFwiLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IEZpcmVob3NlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgdGFicyxcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uLy4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vLi4vVGhpbmdcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4uL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4uL0xpc3RpbmdPcmFjbGVcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL3JlcGxpZXMvOnR5cGUvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnRvcGljOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgdHlwZSwgc29ydCA9IFwibmV3XCIgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzppbmJveFwiLFxuICAgIFtgcmVwbGllcyB0byBhdXRob3IgJHthdXRob3JJZH1gLCBcImtpbmQgY29tbWVudFwiLCBgdHlwZSAke3R5cGV9YCwgYHNvcnQgJHtzb3J0fWBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmNvbnN0IG9uUHV0ID0gYXN5bmMgKG9yYywgcm91dGUsIHsgdXBkYXRlZFNvdWwsIGRpZmYgfSkgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZEF1dGhvcmVkXSA9IExpc3RpbmdOb2RlLmNhdGVnb3JpemVEaWZmKGRpZmZEYXRhKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgbGV0IHVwZGF0ZWRJZHMgPSBUaGluZ1NldC5pZHMoZGlmZkRhdGEpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZEF1dGhvcmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgb3BJZCA9IHVwZGF0ZWRBdXRob3JlZFtpXTtcbiAgICBjb25zdCByZXBseUlkcyA9IFRoaW5nU2V0LmlkcyhcbiAgICAgIGF3YWl0IHNjb3BlXG4gICAgICAgIC5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkpXG4gICAgICAgIC50aGVuKClcbiAgICApO1xuXG4gICAgdXBkYXRlZElkcyA9IHVwZGF0ZWRJZHMuY29uY2F0KHJlcGx5SWRzKTtcbiAgfVxuXG4gIGlmICh1cGRhdGVkSWRzLmxlbmd0aClcbiAgICBhd2FpdCBMaXN0aW5nT3JhY2xlLnVwZGF0ZUxpc3Rpbmcob3JjLCByb3V0ZSwgc2NvcGUsIHNwZWMsIHVwZGF0ZWRJZHMsIFtdKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IEluYm94TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjLFxuICBvblB1dFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvOnR5cGUvOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJvdmVydmlld1wiLCBcImNvbW1lbnRzXCIsIFwic3VibWl0dGVkXCIsIFwiY29tbWFuZHNcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpwcm9maWxlOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnByb2ZpbGVcIixcbiAgICBbXG4gICAgICBgYXV0aG9yICR7YXV0aG9ySWR9YCxcbiAgICAgIGB0eXBlICR7dHlwZX1gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3VzZXIvJHthdXRob3JJZH0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIFF1ZXJ5LnVzZXJNZXRhKHNjb3BlLCBtYXRjaC5hdXRob3JJZCkudGhlbihtZXRhID0+XG4gICAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihSLnBpcGUoXG4gICAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlLFxuICAgICAgUi5tZXJnZUxlZnQoe1xuICAgICAgICBwcm9maWxlSWQ6IG1hdGNoLmF1dGhvcklkLFxuICAgICAgICBkaXNwbGF5TmFtZTogUi5wcm9wT3IoXCJcIiwgXCJhbGlhc1wiLCBtZXRhKVxuICAgICAgfSlcbiAgICApKVxuKSk7XG5cbmV4cG9ydCBjb25zdCBQcm9maWxlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgdGFicyxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuaW1wb3J0IHsgU3BhY2VTcGVjIH0gZnJvbSBcIi4uL1NwYWNlU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvc3BhY2VzLzpuYW1lLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBTcGFjZVNwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgYHNvcnQgJHtzb3J0fWApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFNwYWNlU3BlYy5nZXRTcGVjKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgYHNvcnQgJHtzb3J0fWApXG4pO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgU3BhY2VTcGVjLnNpZGViYXJQYWdlTmFtZShuYW1lKSlcbik7XG5cbmNvbnN0IG9uUHV0ID0gYXN5bmMgKFxuICBvcmMsXG4gIHJvdXRlLFxuICB7IHVwZGF0ZWRTb3VsLCBkaWZmLCBvcmlnaW5hbCwgbGF0ZXN0ID0gMCB9XG4pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcblxuICBjb25zdCBvcmlnaW5hbERhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShvcmlnaW5hbCk7XG4gIGNvbnN0IGRpZmZEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEoZGlmZik7XG4gIGNvbnN0IFt1cGRhdGVkSWRzLCByZW1vdmVkSWRzXSA9IExpc3RpbmdOb2RlLmNhdGVnb3JpemVEaWZmKFxuICAgIGRpZmZEYXRhLFxuICAgIG9yaWdpbmFsRGF0YVxuICApO1xuICBjb25zdCBzcGVjID0gYXdhaXQgZ2V0U3BlYyhzY29wZSwgcm91dGUubWF0Y2gpO1xuICBjb25zdCB2b3RlQ291bnRzTWF0Y2ggPSBTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcbiAgY29uc3QgdGhpbmdNYXRjaCA9IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGF1dGhvck1hdGNoID0gU2NoZW1hLlNFQUF1dGhvci5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG5cbiAgaWYgKHZvdGVDb3VudHNNYXRjaCkgdXBkYXRlZElkcy5wdXNoKHZvdGVDb3VudHNNYXRjaC50aGluZ0lkKTtcbiAgaWYgKHRoaW5nTWF0Y2gpIHVwZGF0ZWRJZHMucHVzaCh0aGluZ01hdGNoLnRoaW5nSWQpO1xuICBpZiAodGhpbmdJZCAmJiB0aGluZ0lkICE9PSBzcGVjLmZyb21QYWdlSWQpIHVwZGF0ZWRJZHMucHVzaCh0aGluZ0lkKTtcbiAgYXdhaXQgTGlzdGluZ09yYWNsZS51cGRhdGVMaXN0aW5nKFxuICAgIG9yYyxcbiAgICByb3V0ZSxcbiAgICBzY29wZSxcbiAgICBzcGVjLFxuICAgIHVwZGF0ZWRJZHMsXG4gICAgcmVtb3ZlZElkc1xuICApO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG4gIGlmIChcbiAgICBSLnByb3AoXCJzaXplXCIsIG9yaWdpbmFsKSB8fFxuICAgIHVwZGF0ZWRJZHMubGVuZ3RoIHx8XG4gICAgcmVtb3ZlZElkcy5sZW5ndGggfHxcbiAgICBhdXRob3JNYXRjaFxuICApXG4gICAgcmV0dXJuO1xuXG4gIC8vIGJhc2UgbG9naWMgZnJvbSBndW4tY2xlcmljLXNjb3BlIG5lZWRzIHRvIGJlIGVuY2Fwc3VhbHRlZCBiZXR0ZXI/XG4gIGNvbnNvbGUubG9nKFwiLS0tU1RBTkRBUkQgU1BBQ0UgVVBEQVRFLS0tXCIsIHJvdXRlLnNvdWwsIHVwZGF0ZWRTb3VsKTtcbiAgY29uc3Qgbm9kZSA9IGF3YWl0IG9yYy5uZXdTY29wZSgpLmdldChyb3V0ZS5zb3VsKTtcbiAgY29uc3QgZXhpc3RpbmdLZXlzID0gTGlzdGluZ05vZGUuaXRlbUtleXMobm9kZSk7XG5cbiAgaWYgKGV4aXN0aW5nS2V5cy5sZW5ndGgpIHtcbiAgICByb3V0ZS53cml0ZSh7XG4gICAgICBzaXplOiAwLFxuICAgICAgLi4uZXhpc3RpbmdLZXlzLnJlZHVjZSgoZGlmZiwga2V5KSA9PiB7XG4gICAgICAgIGRpZmZbYCR7a2V5fWBdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgICB9LCB7fSlcbiAgICB9KTtcbiAgfVxuXG4gIG9yYy53b3JrKHtcbiAgICBpZDogYHVwZGF0ZToke3JvdXRlLnNvdWx9YCxcbiAgICBzb3VsOiByb3V0ZS5zb3VsLFxuICAgIG1ldGhvZDogXCJkb1VwZGF0ZVwiLFxuICAgIHByaW9yaXR5OiByb3V0ZS5wcmlvcml0eSB8fCA1MFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTcGFjZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U3BlYyxcbiAgb25QdXRcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiLCBcImZpcmVob3NlXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6dG9waWM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgdG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWNzWzBdID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogdG9waWNzWzBdO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnRvcGljXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHt0b3BpY31gLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIHRvcGljLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IFwia2luZCBzdWJtaXNzaW9uXCIgOiBcIlwiLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKFxuICAgIFIucGlwZShcbiAgICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2UsXG4gICAgICBSLmFzc29jKFwiYmFzZVBhdGhcIiwgYC90LyR7bWF0Y2gudG9waWN9YClcbiAgICApXG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBUb3BpY0xpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHRhYnMsXG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDaGF0TGlzdGluZyB9IGZyb20gXCIuL0NoYXRMaXN0aW5nXCI7XG5pbXBvcnQgeyBGaXJlaG9zZUxpc3RpbmcgfSBmcm9tIFwiLi9GaXJlaG9zZUxpc3RpbmdcIjtcbmltcG9ydCB7IENvbW1lbnRlZExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50ZWRMaXN0aW5nXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcbmltcG9ydCB7IERvbWFpbkxpc3RpbmcgfSBmcm9tIFwiLi9Eb21haW5MaXN0aW5nXCI7XG5pbXBvcnQgeyBDb21tZW50TGlzdGluZyB9IGZyb20gXCIuL0NvbW1lbnRMaXN0aW5nXCI7XG5pbXBvcnQgeyBTcGFjZUxpc3RpbmcgfSBmcm9tIFwiLi9TcGFjZUxpc3RpbmdcIjtcbmltcG9ydCB7IEluYm94TGlzdGluZyB9IGZyb20gXCIuL0luYm94TGlzdGluZ1wiO1xuaW1wb3J0IHsgUHJvZmlsZUxpc3RpbmcgfSBmcm9tIFwiLi9Qcm9maWxlTGlzdGluZ1wiO1xuXG5jb25zdCB0eXBlcyA9IHtcbiAgQ2hhdExpc3RpbmcsXG4gIEZpcmVob3NlTGlzdGluZyxcbiAgVG9waWNMaXN0aW5nLFxuICBEb21haW5MaXN0aW5nLFxuICBDb21tZW50TGlzdGluZyxcbiAgU3BhY2VMaXN0aW5nLFxuICBJbmJveExpc3RpbmcsXG4gIENvbW1lbnRlZExpc3RpbmcsXG4gIFByb2ZpbGVMaXN0aW5nXG59O1xuXG5jb25zdCB0eXBlc0FycmF5ID0gUi52YWx1ZXModHlwZXMpO1xuXG5jb25zdCBmcm9tUGF0aCA9IHBhdGggPT4ge1xuICBsZXQgbWF0Y2g7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWF0Y2ggPSB0eXBlc0FycmF5W2ldLnJvdXRlLm1hdGNoKHBhdGgpO1xuICAgIGlmIChtYXRjaCkgcmV0dXJuIFIuYXNzb2MoXCJtYXRjaFwiLCBtYXRjaCwgdHlwZXNBcnJheVtpXSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBzaWRlYmFyRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgpID0+IHtcbiAgY29uc3QgdHlwZSA9IGZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSB8fCAhdHlwZS5nZXRTaWRlYmFyKSByZXR1cm4gcmVzb2x2ZShcIlwiKTtcbiAgcmV0dXJuIHR5cGUuZ2V0U2lkZWJhcihzY29wZSwgdHlwZS5tYXRjaCk7XG59KTtcblxuY29uc3Qgc3BlY0Zyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBmcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUpIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgZmluZCB0eXBlIGZvciBwYXRoOiAke3BhdGh9YCk7XG5cbiAgcmV0dXJuIHR5cGUuZ2V0U3BlYyhzY29wZSwgdHlwZS5tYXRjaCkudGhlbihiYXNlU3BlYyA9PiB7XG4gICAgbGV0IHNwZWMgPSBiYXNlU3BlYztcblxuICAgIGlmICh0eXBlLm1hdGNoLnNvcnQgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICBzcGVjID0gUi5hc3NvYyhcInBhdGhcIiwgdHlwZS5yb3V0ZS5yZXZlcnNlKFIuYXNzb2MoXCJzb3J0XCIsIHNwZWMuc29ydCwgdHlwZS5tYXRjaCkpLCBzcGVjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJwYXRoXCIsIHBhdGgsIGJhc2VTcGVjKTtcbiAgICB9XG5cbiAgICBpZiAoc3BlYy5zdWJtaXRUb3BpYyAmJiAhc3BlYy5zdWJtaXRQYXRoKSB7XG4gICAgICBzcGVjID0gUi5hc3NvYyhcInN1Ym1pdFBhdGhcIiwgYC90LyR7c3BlYy5zdWJtaXRUb3BpY30vc3VibWl0YCwgc3BlYyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwZWM7XG4gIH0pO1xufSk7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nVHlwZSA9IHtcbiAgLi4udHlwZXMsXG4gIHR5cGVzLFxuICBmcm9tUGF0aCxcbiAgc2lkZWJhckZyb21QYXRoLFxuICBzcGVjRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IFJvdXRlIGZyb20gXCJyb3V0ZS1wYXJzZXJcIjtcblxuY29uc3Qgc3BsaXREb21haW5zID0gUi5jb21wb3NlKFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFIudHJpbSksXG4gIFIuc3BsaXQoXCIrXCIpLFxuICBSLnRvTG93ZXIsXG4gIFIudHJpbSxcbiAgUi5kZWZhdWx0VG8oXCJcIilcbik7XG5cbmNvbnN0IHNwbGl0VG9waWNzID0gUi5jb21wb3NlKFxuICBSLmlmRWxzZShSLnByb3AoXCJsZW5ndGhcIiksIFIuaWRlbnRpdHksIFIuYWx3YXlzKFtcImFsbFwiXSkpLFxuICBzcGxpdERvbWFpbnNcbik7XG5cbmNvbnN0IHdpdGhSb3V0ZSA9IG9iaiA9PiBSLmFzc29jKFwicm91dGVcIiwgbmV3IFJvdXRlKG9iai5wYXRoKSwgb2JqKTtcblxuZXhwb3J0IGNvbnN0IFBhdGggPSB7IHNwbGl0RG9tYWlucywgc3BsaXRUb3BpY3MsIHdpdGhSb3V0ZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIl07XG5jb25zdCBjb25maWdQYWdlTmFtZSA9IG5hbWUgPT4gYHNwYWNlOiR7bmFtZX1gO1xuY29uc3Qgc2lkZWJhclBhZ2VOYW1lID0gbmFtZSA9PiBgc3BhY2U6JHtuYW1lfTpzaWRlYmFyYDtcblxuY29uc3Qgc291cmNlV2l0aERlZmF1bHRzID0gUi5jdXJyeSgob3duZXJJZCwgbmFtZSwgc291cmNlKSA9PiB7XG4gIGxldCByZXN1bHQgPSBbc291cmNlIHx8IFwiXCJdO1xuICBjb25zdCB0b2tlbml6ZWQgPSBUb2tlbml6ZXIudG9rZW5pemUoc291cmNlKTtcblxuICBpZiAoIXRva2VuaXplZC5nZXRWYWx1ZShcInRhYlwiKSkge1xuICAgIHRhYnMubWFwKHRhYiA9PlxuICAgICAgcmVzdWx0LnB1c2goYHRhYiAke3RhYn0gL3VzZXIvJHtvd25lcklkfS9zcGFjZXMvJHtuYW1lfS8ke3RhYn1gKVxuICAgICk7XG4gIH1cblxuICBsZXQgaW5kZXhlciA9IHRva2VuaXplZC5nZXRWYWx1ZShcImluZGV4ZXJcIik7XG5cbiAgaWYgKCFpbmRleGVyKSB7XG4gICAgcmVzdWx0LnB1c2goYGluZGV4ZXIgJHtDb25maWcuaW5kZXhlcn1gKTtcbiAgICBpbmRleGVyID0gQ29uZmlnLmluZGV4ZXI7XG4gIH1cblxuICBsZXQgdGFidWxhdG9yID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFidWxhdG9yXCIpO1xuXG4gIGlmICghdGFidWxhdG9yKSByZXN1bHQucHVzaChgdGFidWxhdG9yICR7aW5kZXhlcn1gKTtcblxuICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcXG5cIik7XG59KTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIGNvbmZpZ1BhZ2VOYW1lKG5hbWUpLCBleHRyYSkudGhlbihcbiAgICBzb3VyY2VXaXRoRGVmYXVsdHMoYXV0aG9ySWQsIG5hbWUpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpLnRoZW4oc291cmNlID0+XG4gICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShzb3VyY2UsIGF1dGhvcklkLCBuYW1lKVxuICApXG4pO1xuXG5jb25zdCBub2RlVG9TcGFjZU5hbWVzID0gUi5jb21wb3NlKFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi5yZXBsYWNlKC9ec3BhY2U6LywgXCJcIikpLFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLnByb3AoXCJsZW5ndGhcIiksXG4gICAgICBSLm1hdGNoKC9ec3BhY2U6W146XSokLylcbiAgICApXG4gICksXG4gIFIua2V5c1xuKTtcblxuY29uc3QgdXNlclNwYWNlTmFtZXMgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkKSA9PlxuICBRdWVyeS51c2VyUGFnZXMoc2NvcGUsIGF1dGhvcklkKS50aGVuKG5vZGVUb1NwYWNlTmFtZXMpXG4pO1xuXG5leHBvcnQgY29uc3QgU3BhY2VTcGVjID0ge1xuICBjb25maWdQYWdlTmFtZSxcbiAgc2lkZWJhclBhZ2VOYW1lLFxuICBub2RlVG9TcGFjZU5hbWVzLFxuICB1c2VyU3BhY2VOYW1lcyxcbiAgdGFicyxcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59O1xuIiwiaW1wb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmV4cG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmV4cG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmV4cG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5leHBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5leHBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4vTGlzdGluZ09yYWNsZVwiO1xuZXhwb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5leHBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5leHBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5leHBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5leHBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi9TcGFjZVNwZWNcIjtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmcgPSB7XG4gIC4uLkxpc3RpbmdUeXBlLnR5cGVzLFxuICBMaXN0aW5nTm9kZSxcbiAgTGlzdGluZ1NwZWMsXG4gIGlzVmFsaWRTb3J0OiBMaXN0aW5nU29ydC5pc1ZhbGlkU29ydCxcbiAgaWRzVG9Tb3VsczogTGlzdGluZ05vZGUuaWRzVG9Tb3VscyxcbiAgZ2V0OiBMaXN0aW5nTm9kZS5nZXQsXG4gIGZyb21TcGVjOiBMaXN0aW5nUXVlcnkuZnJvbVNwZWMsXG4gIGZyb21QYXRoOiBMaXN0aW5nUXVlcnkuZnJvbVBhdGgsXG4gIHR5cGVGcm9tUGF0aDogTGlzdGluZ1R5cGUuZnJvbVBhdGgsXG4gIHNpZGViYXJGcm9tUGF0aDogTGlzdGluZ1R5cGUuc2lkZWJhckZyb21QYXRoLFxuICBzcGVjRnJvbVBhdGg6IExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aCxcbiAgbm9kZUZyb21QYXRoOiBMaXN0aW5nUXVlcnkubm9kZUZyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nLCBMaXN0aW5nU3BlYywgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nXCI7XG5cbmNvbnN0IHdpa2lQYWdlID0gUi5tZXJnZUxlZnQoe1xuICB3aXRoTWF0Y2g6ICh7IHBhcmFtczogeyBhdXRob3JJZCA9IENvbmZpZy5vd25lciwgbmFtZSB9IH0pID0+ICh7XG4gICAgcHJlbG9hZDogc2NvcGUgPT4gUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lKVxuICB9KVxufSk7XG5cbmNvbnN0IHdpdGhMaXN0aW5nTWF0Y2ggPSAocGF0aCwgcGFyYW1zKSA9PiB7XG4gIGlmICghcGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcmVsb2FkOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKHt9KSkpLFxuICAgICAgc2lkZWJhcjogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShcIlwiKSkpLFxuICAgICAgc3BhY2U6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShcIlwiKSkpKSxcbiAgICAgIGlkczogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShbXSkpKVxuICAgIH07XG4gIH1cblxuICBjb25zdCByZWFsUXVlcnkgPSBxdWVyeShcbiAgICAoc2NvcGUsIG9wdHMgPSB7fSkgPT4gTGlzdGluZy5mcm9tUGF0aChzY29wZSwgcGF0aCwgb3B0cyksXG4gICAgYGlkczoke3BhdGh9YFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgcHJlbG9hZDogc2NvcGUgPT4gcHJlbG9hZExpc3Rpbmcoc2NvcGUsIHBhdGgsIHBhcmFtcyksXG4gICAgc2lkZWJhcjogcXVlcnkoXG4gICAgICBzY29wZSA9PiBMaXN0aW5nLnNpZGViYXJGcm9tUGF0aChzY29wZSwgcGF0aCksXG4gICAgICBgc2lkZWJhcjoke3BhdGh9YFxuICAgICksXG4gICAgc3BhY2U6IHF1ZXJ5KHNjb3BlID0+IExpc3Rpbmcuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoKSksXG4gICAgaWRzOiBxdWVyeSgoc2NvcGUsIG9wdHMgPSB7fSkgPT5cbiAgICAgIHJlYWxRdWVyeShzY29wZSwgUi5tZXJnZUxlZnQob3B0cywgcGFyYW1zKSlcbiAgICApXG4gIH07XG59O1xuXG5jb25zdCBwcmVsb2FkTGlzdGluZyA9IGFzeW5jIChzY29wZSwgcGF0aCwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IG1hdGNoID0gd2l0aExpc3RpbmdNYXRjaChwYXRoLCBwYXJhbXMpO1xuICBsZXQgW3NwZWMsIGlkc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgbWF0Y2guc3BhY2Uoc2NvcGUpLFxuICAgIG1hdGNoLmlkcyhzY29wZSwge30pLFxuICAgIG1hdGNoLnNpZGViYXIoc2NvcGUpXG4gIF0pO1xuXG4gIGlmICghc3BlYykgc3BlYyA9IExpc3RpbmdTcGVjLmZyb21Tb3VyY2UoXCJcIik7XG5cbiAgY29uc3QgdGhpbmdTb3VscyA9IExpc3RpbmcuaWRzVG9Tb3VscyhpZHMpO1xuICBjb25zdCBbdGhpbmdzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBRdWVyeS5tdWx0aVRoaW5nTWV0YShzY29wZSwge1xuICAgICAgdGhpbmdTb3VscyxcbiAgICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IgfHwgQ29uZmlnLnRhYnVsYXRvcixcbiAgICAgIHNjb3JlczogdHJ1ZSxcbiAgICAgIGRhdGE6IHRydWVcbiAgICB9KSxcbiAgICAuLi5SLm1hcChcbiAgICAgIGlkID0+IFF1ZXJ5LnVzZXJNZXRhKHNjb3BlLCBpZCksXG4gICAgICBSLnVuaXEoW3NwZWMgJiYgc3BlYy5pbmRleGVyLCBzcGVjICYmIHNwZWMub3duZXIsIHNwZWMgJiYgc3BlYy50YWJ1bGF0b3JdKVxuICAgIClcbiAgXSk7XG4gIGNvbnN0IG9wSWRzID0gUi5jb21wb3NlKFxuICAgIFIud2l0aG91dChpZHMpLFxuICAgIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICAgIFIudW5pcSxcbiAgICBSLm1hcChSLnBhdGhPcihudWxsLCBbXCJkYXRhXCIsIFwib3BJZFwiXSkpXG4gICkodGhpbmdzKTtcblxuICBpZiAob3BJZHMubGVuZ3RoKSB7XG4gICAgY29uc3Qgb3BTb3VscyA9IExpc3RpbmcuaWRzVG9Tb3VscyhvcElkcyk7XG5cbiAgICBhd2FpdCBRdWVyeS5tdWx0aVRoaW5nTWV0YShzY29wZSwge1xuICAgICAgdGhpbmdTb3Vsczogb3BTb3VscyxcbiAgICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IgfHwgQ29uZmlnLnRhYnVsYXRvcixcbiAgICAgIGRhdGE6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChzcGVjLmNoYXRUb3BpYykge1xuICAgIGNvbnN0IGNoYXRQYXRoID0gYC90LyR7c3BlYy5jaGF0VG9waWN9L2NoYXRgO1xuXG4gICAgaWYgKGNoYXRQYXRoICE9PSBwYXRoKVxuICAgICAgYXdhaXQgcHJlbG9hZExpc3Rpbmcoc2NvcGUsIGAvdC8ke3NwZWMuY2hhdFRvcGljfS9jaGF0YCwge30pO1xuICB9XG5cbiAgcmV0dXJuIHNjb3BlLmdldENhY2hlKCk7XG59O1xuXG5jb25zdCBsaXN0aW5nID0gKHtcbiAgcHJlZml4OiBkZWZhdWx0UHJlZml4ID0gXCJ0XCIsXG4gIGlkZW50aWZpZXI6IGRlZmF1bHRJZGVudGlmaWVyID0gXCJhbGxcIixcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImhvdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIHByZWZpeCA9IGRlZmF1bHRQcmVmaXgsXG4gICAgICBpZGVudGlmaWVyID0gZGVmYXVsdElkZW50aWZpZXIsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+IHdpdGhMaXN0aW5nTWF0Y2goYC8ke3ByZWZpeH0vJHtpZGVudGlmaWVyfS8ke3NvcnR9YCwgcXVlcnkpXG59KTtcblxuY29uc3QgdGhpbmdDb21tZW50cyA9ICh7XG4gIHByZWZpeDogZGVmYXVsdFByZWZpeCA9IFwidFwiLFxuICBpZGVudGlmaWVyOiBkZWZhdWx0SWRlbnRpZmllciA9IFwiYWxsXCIsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJiZXN0XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgb3BJZCxcbiAgICAgIHByZWZpeCA9IGRlZmF1bHRQcmVmaXgsXG4gICAgICBpZGVudGlmaWVyID0gZGVmYXVsdElkZW50aWZpZXIsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLkNvbW1lbnRMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0aGluZ0lkOiBvcElkLFxuICAgICAgICBzb3J0XG4gICAgICB9KSxcbiAgICAgIFIuYXNzb2MoXCJsaW1pdFwiLCAxMDAwLCBxdWVyeSlcbiAgICApXG59KTtcblxuY29uc3Qgc3BhY2VMaXN0aW5nID0gKHtcbiAgbmFtZTogZGVmYXVsdE5hbWUgPSBcImRlZmF1bHRcIixcbiAgYXV0aG9ySWQ6IGRlZmF1bHRBdXRob3JJZCxcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImRlZmF1bHRcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBhdXRob3JJZCA9IGRlZmF1bHRBdXRob3JJZCxcbiAgICAgIG5hbWUgPSBkZWZhdWx0TmFtZSxcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuU3BhY2VMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICBhdXRob3JJZDogYXV0aG9ySWQgfHwgQ29uZmlnLm93bmVyLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzb3J0XG4gICAgICB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmNvbnN0IHNwYWNlVGhpbmdDb21tZW50cyA9ICh7XG4gIG5hbWU6IGRlZmF1bHROYW1lID0gXCJkZWZhdWx0XCIsXG4gIGF1dGhvcklkOiBkZWZhdWx0QXV0aG9ySWQsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJob3RcIixcbiAgLi4ucmVzdFxufSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgb3BJZCxcbiAgICAgIGF1dGhvcklkID0gZGVmYXVsdEF1dGhvcklkLFxuICAgICAgbmFtZSA9IGRlZmF1bHROYW1lLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PiB7XG4gICAgY29uc3Qgc3BhY2VQYXRoID0gTGlzdGluZ1R5cGUuU3BhY2VMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IGF1dGhvcklkIHx8IENvbmZpZy5vd25lcixcbiAgICAgIG5hbWUsXG4gICAgICBzb3J0XG4gICAgfSk7XG4gICAgY29uc3QgbGlzdGluZ1BhdGggPSBMaXN0aW5nVHlwZS5Db21tZW50TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIHRoaW5nSWQ6IG9wSWQsXG4gICAgICBzb3J0XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3BhY2U6IHF1ZXJ5KFxuICAgICAgICBzY29wZSA9PiBMaXN0aW5nLnNwZWNGcm9tUGF0aChzY29wZSwgc3BhY2VQYXRoLCBxdWVyeSksXG4gICAgICAgIGBzcGVjOiR7c3BhY2VQYXRofWBcbiAgICAgICksXG4gICAgICBpZHM6IHF1ZXJ5KFxuICAgICAgICBzY29wZSA9PiBMaXN0aW5nLmZyb21QYXRoKHNjb3BlLCBsaXN0aW5nUGF0aCwgcXVlcnkpLFxuICAgICAgICBsaXN0aW5nUGF0aFxuICAgICAgKSxcbiAgICAgIHByZWxvYWQ6IHNjb3BlID0+IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBsaXN0aW5nUGF0aCwgcXVlcnkpXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb2ZpbGUgPSAoe1xuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwibmV3XCIsXG4gIHR5cGU6IGRlZmF1bHRUeXBlID0gXCJvdmVydmlld1wiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHsgYXV0aG9ySWQsIHR5cGUgPSBkZWZhdWx0VHlwZSwgc29ydCA9IGRlZmF1bHRTb3J0IH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuUHJvZmlsZUxpc3Rpbmcucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pLFxuICAgICAgcXVlcnlcbiAgICApXG59KTtcblxuY29uc3QgaW5ib3ggPSAoe1xuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwibmV3XCIsXG4gIHR5cGU6IGRlZmF1bHRUeXBlID0gXCJvdmVydmlld1wiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBhdXRob3JJZCxcbiAgICBwYXJhbXM6IHsgdHlwZSA9IGRlZmF1bHRUeXBlLCBzb3J0ID0gZGVmYXVsdFNvcnQgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5JbmJveExpc3Rpbmcucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pLFxuICAgICAgcXVlcnlcbiAgICApXG59KTtcblxuZXhwb3J0IGNvbnN0IFBhZ2UgPSB7XG4gIHdpdGhMaXN0aW5nTWF0Y2gsXG4gIHByZWxvYWRMaXN0aW5nLFxuICB3aWtpUGFnZSxcbiAgdGhpbmdDb21tZW50cyxcbiAgbGlzdGluZyxcbiAgc3BhY2VMaXN0aW5nLFxuICBzcGFjZVRoaW5nQ29tbWVudHMsXG4gIHByb2ZpbGUsXG4gIGluYm94XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tIFwiLi9WYWxpZGF0aW9uXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZyB9IGZyb20gXCIuL1RoaW5nXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gXCIuL0F1dGhlbnRpY2F0aW9uXCI7XG5cbmZ1bmN0aW9uIGluaXQoR3VuLCBjb25maWcgPSB7fSkge1xuICBjb25zdCB7IGxlZWNoLCBkaXNhYmxlVmFsaWRhdGlvbiwgbm9HdW4sIGxvY2FsU3RvcmFnZSwgcGVyc2lzdCwgLi4ucmVzdCB9ID1cbiAgICBjb25maWcgfHwge307XG4gIGNvbnN0IHBlZXIgPSB7IGNvbmZpZyB9O1xuXG4gIGlmICghbm9HdW4pIHtcbiAgICBjb25zdCBjZmcgPSB7IGxvY2FsU3RvcmFnZTogISFsb2NhbFN0b3JhZ2UsIHJhZGlzazogISFwZXJzaXN0LCAuLi5yZXN0IH07XG5cbiAgICBpZiAocGVyc2lzdCkgY2ZnLmxvY2FsU3RvcmFnZSA9IGZhbHNlO1xuICAgIGlmICghZGlzYWJsZVZhbGlkYXRpb24pIEd1bi5vbihcIm9wdFwiLCBWYWxpZGF0aW9uLmd1bldpcmVJbnB1dChwZWVyKSk7XG4gICAgaWYgKGNmZy5zdG9yZUZuKSBjZmcuc3RvcmUgPSBjZmcuc3RvcmVGbihjZmcpOyAvLyBmb3IgaW5kZXhlZGRiXG4gICAgcGVlci5ndW4gPSBHdW4oY2ZnKTtcbiAgICBpZiAoY2ZnLmxvY2FsU3RvcmFnZSkgcGVlci5ndW4ub24oXCJsb2NhbFN0b3JhZ2U6ZXJyb3JcIiwgYSA9PiBhLnJldHJ5KHt9KSk7XG4gICAgaWYgKGxlZWNoKSB7XG4gICAgICBjb25zdCBzZW5kTGVlY2ggPSAoKSA9PiBwZWVyLmd1bi5fLm9uKFwib3V0XCIsIHsgbGVlY2g6IHRydWUgfSk7XG5cbiAgICAgIHNlbmRMZWVjaCgpO1xuICAgIH1cbiAgfVxuXG4gIHBlZXIubmV3U2NvcGUgPSBvcHRzID0+IFF1ZXJ5LmNyZWF0ZVNjb3BlKHBlZXIsIG9wdHMpO1xuICBwZWVyLm9uTG9naW4gPSBBdXRoZW50aWNhdGlvbi5vbkxvZ2luKHBlZXIpO1xuICBwZWVyLnNpZ251cCA9IEF1dGhlbnRpY2F0aW9uLnNpZ251cChwZWVyKTtcbiAgcGVlci5sb2dpbiA9IEF1dGhlbnRpY2F0aW9uLmxvZ2luKHBlZXIpO1xuICBwZWVyLmxvZ291dCA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmxvZ291dChwZWVyKTtcbiAgcGVlci5pc0xvZ2dlZEluID0gKCkgPT4gQXV0aGVudGljYXRpb24uaXNMb2dnZWRJbihwZWVyKTtcbiAgcGVlci5zdWJtaXQgPSBUaGluZy5zdWJtaXQocGVlcik7XG4gIHBlZXIuY29tbWVudCA9IFRoaW5nLmNvbW1lbnQocGVlcik7XG4gIHBlZXIuY2hhdCA9IFRoaW5nLmNoYXQocGVlcik7XG4gIHBlZXIud3JpdGVQYWdlID0gVGhpbmcud3JpdGVQYWdlKHBlZXIpO1xuICBwZWVyLnZvdGUgPSBUaGluZy52b3RlKHBlZXIpO1xuICBwZWVyLnF1ZXJpZXMgPSBRdWVyeTtcbiAgcmV0dXJuIHBlZXI7XG59XG5cbmV4cG9ydCBjb25zdCBQZWVyID0ge1xuICBpbml0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHNjb3BlIGFzIG1ha2VTY29wZSwgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZy9MaXN0aW5nTm9kZVwiO1xuXG5jb25zdCBlbXB0eVByb21pc2UgPSByZXNvbHZlKG51bGwpO1xuY29uc3QgdW5pb25BcnJheXMgPSBSLnJlZHVjZShSLnVuaW9uLCBbXSk7XG5cbmNvbnN0IHRvcGljU291bHMgPSBwYXJhbXMgPT4ge1xuICBjb25zdCB7IHRvcGljcyA9IFtcImFsbFwiXSB9ID0gcGFyYW1zIHx8IHt9O1xuICBjb25zdCBkYXlzID0gUi5wcm9wT3IoMzY1LCBcImRheXNcIiwgcGFyYW1zKSB8fCAzNjU7XG4gIGNvbnN0IGRheVN0cmluZ3MgPSBbXTtcbiAgY29uc3Qgb25lRGF5ID0gMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG9uZURheSAqIHBhcnNlSW50KGRheXMsIDEwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBkYXlzICsgMTsgaSsrKVxuICAgIGRheVN0cmluZ3MucHVzaChUaGluZ1NldC5kYXlTdHIoc3RhcnQgKyBpICogb25lRGF5KSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhcbiAgICB0b3BpY3MucmVkdWNlKFxuICAgICAgKHJlc3VsdCwgdG9waWNOYW1lKSA9PlxuICAgICAgICBkYXlTdHJpbmdzLnJlZHVjZSgocmVzLCBkcykgPT4ge1xuICAgICAgICAgIHJlc1tgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvJHt0b3BpY05hbWV9L2RheXMvJHtkc31gXSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSwgcmVzdWx0KSxcbiAgICAgIHt9XG4gICAgKVxuICApO1xufTtcblxuY29uc3Qgc2luZ2xlVG9waWMgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICBjb25zdCB0U291bHMgPSB0b3BpY1NvdWxzKHsgLi4ucGFyYW1zLCB0b3BpY3M6IFtwYXJhbXMudG9waWNdIH0pO1xuICBsZXQgc291bHMgPSBbXTtcbiAgbGV0IGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuXG4gIGlmIChwYXJhbXMuc29ydCA9PT0gXCJuZXdcIikge1xuICAgIGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuICB9IGVsc2Uge1xuICAgIGlmIChwYXJhbXMuc29ydCA9PT0gXCJ0b3BcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICAgIGlmIChwYXJhbXMudG9waWMgPT09IFwiYWxsXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgfVxuXG4gIGNvbnN0IGZldGNoTW9yZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b3BpY1NvdWwgPSB0U291bHMucG9wKCk7XG5cbiAgICBpZiAoc291bHMubGVuZ3RoID4gaXRlbU1heCB8fCAhdG9waWNTb3VsKSByZXR1cm4gcmVzb2x2ZShzb3Vscyk7XG4gICAgcmV0dXJuIHNjb3BlXG4gICAgICAuZ2V0KHRvcGljU291bClcbiAgICAgIC5zb3VscygpXG4gICAgICAudGhlbihtb3JlID0+IHtcbiAgICAgICAgc291bHMgPSBbLi4uc291bHMsIC4uLm1vcmVdO1xuICAgICAgICByZXR1cm4gZmV0Y2hNb3JlKCk7XG4gICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZmV0Y2hNb3JlKCk7XG59KTtcblxuY29uc3Qgc2luZ2xlRG9tYWluID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiB9KSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZTogZG9tYWluIH0pKS5zb3VscygpXG4pO1xuXG5jb25zdCBzaW5nbGVBdXRob3IgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFtcbiAgICBwYXJhbXMudHlwZSAmJiBwYXJhbXMudHlwZSAhPT0gXCJzdWJtaXR0ZWRcIiAmJiBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChgfiR7cGFyYW1zLmF1dGhvcklkfWApXG4gICAgICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAgICAgLnNvdWxzKCksXG4gICAgcGFyYW1zLnR5cGUgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tZW50c1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1hbmRzXCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KGB+JHtwYXJhbXMuYXV0aG9ySWR9YClcbiAgICAgICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgICAgICAuc291bHMoKVxuICBdKS50aGVuKChbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkgPT4gdW5pb25BcnJheXMoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pKVxuKTtcblxuY29uc3QgbGlzdGluZ0lkcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IHNjb3BlLmdldChzb3VsKS50aGVuKExpc3RpbmdOb2RlLnNvcnRlZElkcyksXG4gIFwibGlzdGluZ0lkc1wiXG4pO1xuXG5jb25zdCBzaW5nbGVMaXN0aW5nID0gcXVlcnkoKHNjb3BlLCB7IGxpc3RpbmcsIHNvcnQsIGluZGV4ZXIgfSkgPT5cbiAgbGlzdGluZ0lkcyhzY29wZSwgYCR7Q29uc3RhbnRzLlBSRUZJWH0ke2xpc3Rpbmd9LyR7c29ydH1AfiR7aW5kZXhlcn0uYCkudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSksXG4gICAgICBSLmZpbHRlcihSLmlkZW50aXR5KVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVwbGllc1RvQXV0aG9yID0gcXVlcnkoXG4gIChzY29wZSwgeyByZXBsaWVzVG9BdXRob3JJZCwgdHlwZSA9IFwib3ZlcnZpZXdcIiwgLi4ucGFyYW1zIH0pID0+XG4gICAgc2luZ2xlTGlzdGluZyhzY29wZSwge1xuICAgICAgbGlzdGluZzogYC91c2VyLyR7cmVwbGllc1RvQXV0aG9ySWR9LyR7dHlwZX1gLFxuICAgICAgc29ydDogXCJuZXdcIixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH0pLnRoZW4oYXV0aG9yZWRTb3VscyA9PlxuICAgICAgYWxsKFxuICAgICAgICBhdXRob3JlZFNvdWxzLm1hcChhdXRob3JlZFNvdWwgPT5cbiAgICAgICAgICBzY29wZS5nZXQoYCR7YXV0aG9yZWRTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgICAgICAgKVxuICAgICAgKS50aGVuKHVuaW9uQXJyYXlzKVxuICAgIClcbik7XG5cbmNvbnN0IHNpbmdsZVN1Ym1pc3Npb24gPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgc2NvcGVcbiAgICAuZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSlcbiAgICApXG4gICAgLnNvdWxzKFxuICAgICAgUi5wcmVwZW5kKFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KSlcbiAgICApXG4pO1xuXG5jb25zdCB0aGluZyA9IHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICBzY29wZS5nZXQodGhpbmdTb3VsKS50aGVuKG1ldGEgPT4ge1xuICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcmVzdWx0ID0geyBpZDogbWV0YS5pZCwgdGltZXN0YW1wOiBwYXJzZUZsb2F0KG1ldGEudGltZXN0YW1wLCAxMCkgfTtcbiAgICBjb25zdCByZXBseVRvU291bCA9IFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BTb3VsID0gUi5wYXRoKFtcIm9wXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BJZCA9IG9wU291bCA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChvcFNvdWwpLnRoaW5naWQgOiBudWxsO1xuICAgIGNvbnN0IHJlcGx5VG9JZCA9IHJlcGx5VG9Tb3VsXG4gICAgICA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChyZXBseVRvU291bCkudGhpbmdpZFxuICAgICAgOiBudWxsO1xuXG4gICAgaWYgKG9wSWQpIHJlc3VsdC5vcElkID0gb3BJZDtcbiAgICBpZiAocmVwbHlUb0lkKSByZXN1bHQucmVwbHlUb0lkID0gcmVwbHlUb0lkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pXG4pO1xuXG5jb25zdCBtdWx0aVF1ZXJ5ID0gKHNpbmdsZVF1ZXJ5LCBwbHVyYWwsIHNpbmdsZSwgY29sbGF0ZSA9IHVuaW9uQXJyYXlzKSA9PlxuICBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IGl0ZW1zID0gUi5wcm9wKHBsdXJhbCwgcGFyYW1zKTtcblxuICAgIGlmIChSLmlzTmlsKGl0ZW1zKSkgcmV0dXJuIGVtcHR5UHJvbWlzZTtcbiAgICByZXR1cm4gYWxsKFxuICAgICAgUi5tYXAoXG4gICAgICAgIHZhbCA9PiBzaW5nbGVRdWVyeShzY29wZSwgeyAuLi5wYXJhbXMsIFtzaW5nbGVdOiB2YWwgfSksXG4gICAgICAgIFIucHJvcE9yKFtdLCBwbHVyYWwsIHBhcmFtcylcbiAgICAgIClcbiAgICApLnRoZW4oY29sbGF0ZSk7XG4gIH0pO1xuXG5jb25zdCBtdWx0aVRvcGljID0gbXVsdGlRdWVyeShzaW5nbGVUb3BpYywgXCJ0b3BpY3NcIiwgXCJ0b3BpY1wiKTtcbmNvbnN0IG11bHRpRG9tYWluID0gbXVsdGlRdWVyeShzaW5nbGVEb21haW4sIFwiZG9tYWluc1wiLCBcImRvbWFpblwiKTtcbmNvbnN0IG11bHRpQXV0aG9yID0gbXVsdGlRdWVyeShzaW5nbGVBdXRob3IsIFwiYXV0aG9ySWRzXCIsIFwiYXV0aG9ySWRcIik7XG5jb25zdCBtdWx0aVN1Ym1pc3Npb24gPSBtdWx0aVF1ZXJ5KFxuICBzaW5nbGVTdWJtaXNzaW9uLFxuICBcInN1Ym1pc3Npb25JZHNcIixcbiAgXCJzdWJtaXNzaW9uSWRcIlxuKTtcblxuY29uc3QgdGhpbmdEYXRhRnJvbVNvdWxzID0gc2NvcGUgPT4gc291bHMgPT5cbiAgYWxsKFxuICAgIHNvdWxzXG4gICAgICAuZmlsdGVyKHggPT4gISF4KVxuICAgICAgLm1hcChzb3VsID0+XG4gICAgICAgIHNjb3BlXG4gICAgICAgICAgLmdldChzb3VsKVxuICAgICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgICAgLnRoZW4oeCA9PiB4KVxuICAgICAgKVxuICApO1xuXG5jb25zdCBjdXJhdGVkID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZHMsIHN1Ym1pc3Npb25Pbmx5ID0gZmFsc2UpID0+XG4gIGFsbChbXG4gICAgbXVsdGlBdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGU6IFwiY29tbWVudHNcIixcbiAgICAgIGF1dGhvcklkc1xuICAgIH0pXG4gICAgICAudGhlbih0aGluZ0RhdGFGcm9tU291bHMoc2NvcGUpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIFIuY29tcG9zZShcbiAgICAgICAgICBSLm1hcChzdWJtaXNzaW9uT25seSA/IFIucHJvcChcIm9wSWRcIikgOiBSLnByb3AoXCJyZXBseVRvSWRcIikpLFxuICAgICAgICAgIFIuZmlsdGVyKFIucHJvcChcInJlcGx5VG9JZFwiKSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJzdWJtaXR0ZWRcIixcbiAgICAgIGF1dGhvcklkc1xuICAgIH0pLnRoZW4oUi5tYXAoc291bCA9PiBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goc291bCkudGhpbmdJZCkpXG4gIF0pLnRoZW4oKFtpZHMxLCBpZHMyXSkgPT4gUi51bmlxKFsuLi5pZHMxLCAuLi5pZHMyXSkpXG4pO1xuXG5jb25zdCB0aGluZ1Njb3JlcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHRhYnVsYXRvciwgdGhpbmdJZCkgPT5cbiAgICB0YWJ1bGF0b3IgJiYgdGhpbmdJZFxuICAgICAgPyBzY29wZVxuICAgICAgICAgIC5nZXQoU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCwgdGFidWxhdG9yIH0pKVxuICAgICAgICAgIC50aGVuKClcbiAgICAgIDogcmVzb2x2ZSgpLFxuICBcInRoaW5nU2NvcmVzXCJcbik7XG5cbmNvbnN0IHRoaW5nRGF0YSA9IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCkgPT4ge1xuICByZXR1cm4gdGhpbmdJZFxuICAgID8gc2NvcGUuZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkuZ2V0KFwiZGF0YVwiKVxuICAgIDogcmVzb2x2ZShudWxsKTtcbn0sIFwidGhpbmdEYXRhXCIpO1xuXG5jb25zdCB0aGluZ01ldGEgPSBxdWVyeShcbiAgKHNjb3BlLCB7IHRoaW5nU291bCwgdGFidWxhdG9yLCBkYXRhID0gZmFsc2UsIHNjb3JlcyA9IGZhbHNlIH0pID0+IHtcbiAgICBpZiAoIXRoaW5nU291bCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgY29uc3QgaWQgPSBMaXN0aW5nTm9kZS5zb3VsVG9JZCh0aGluZ1NvdWwpO1xuXG4gICAgcmV0dXJuIGFsbChbXG4gICAgICB0aGluZyhzY29wZSwgdGhpbmdTb3VsKSxcbiAgICAgIHNjb3Jlc1xuICAgICAgICA/IHRoaW5nU2NvcmVzKHNjb3BlLCB0YWJ1bGF0b3IgfHwgQ29uZmlnLnRhYnVsYXRvciwgaWQpXG4gICAgICAgIDogcmVzb2x2ZSgpLFxuICAgICAgZGF0YSA/IHRoaW5nRGF0YShzY29wZSwgaWQpIDogcmVzb2x2ZSgpXG4gICAgXSkudGhlbigoW21ldGEsIHZvdGVzLCBkYXRhXSkgPT4ge1xuICAgICAgaWYgKCFtZXRhIHx8ICFtZXRhLmlkKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7IC4uLm1ldGEsIHZvdGVzLCBkYXRhIH07XG4gICAgfSk7XG4gIH1cbik7XG5cbmNvbnN0IG11bHRpVGhpbmdNZXRhID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIGFsbChcbiAgICBSLnJlZHVjZShcbiAgICAgIChwcm9taXNlcywgdGhpbmdTb3VsKSA9PiB7XG4gICAgICAgIGlmICghdGhpbmdTb3VsKSByZXR1cm4gcHJvbWlzZXM7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpbmdNZXRhKHNjb3BlLCB7IC4uLnBhcmFtcywgdGhpbmdTb3VsIH0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuICAgICAgfSxcbiAgICAgIFtdLFxuICAgICAgUi5wcm9wT3IoW10sIFwidGhpbmdTb3Vsc1wiLCBwYXJhbXMpXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCB1c2VyUGFnZXMgPSBxdWVyeShcbiAgKHNjb3BlLCBhdXRob3JJZCkgPT5cbiAgICBzY29wZS5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSksXG4gIFwidXNlclBhZ2VzXCJcbik7XG5cbmNvbnN0IHdpa2lQYWdlSWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PiB7XG4gIGlmICghYXV0aG9ySWQgfHwgIW5hbWUpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICByZXR1cm4gc2NvcGVcbiAgICAuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpXG4gICAgLmdldChuYW1lKVxuICAgIC5nZXQoXCJpZFwiKTtcbn0sIFwid2lraVBhZ2VJZFwiKTtcblxuY29uc3Qgd2lraVBhZ2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PlxuICB3aWtpUGFnZUlkKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkudGhlbihpZCA9PiBpZCAmJiB0aGluZ0RhdGEoc2NvcGUsIGlkKSlcbik7XG5cbmNvbnN0IHVzZXJNZXRhID0gcXVlcnkoKHNjb3BlLCBpZCkgPT4ge1xuICBpZiAoIWlkKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgcmV0dXJuIHNjb3BlLmdldChgfiR7aWR9YCkudGhlbihtZXRhID0+ICh7XG4gICAgYWxpYXM6IFIucHJvcChcImFsaWFzXCIsIG1ldGEpLFxuICAgIGNyZWF0ZWRBdDogUi5wYXRoKFtcIl9cIiwgXCI+XCIsIFwicHViXCJdLCBtZXRhKVxuICB9KSk7XG59LCBcInVzZXJNZXRhXCIpO1xuXG5jb25zdCBjcmVhdGVTY29wZSA9IFIuY3VycnkoKG5hYiwgb3B0cykgPT5cbiAgbWFrZVNjb3BlKFIuYXNzb2MoXCJndW5cIiwgbmFiLmd1biwgb3B0cyB8fCB7fSkpXG4pO1xuXG5leHBvcnQgY29uc3QgUXVlcnkgPSB7XG4gIHNpbmdsZVRvcGljLFxuICBzaW5nbGVEb21haW4sXG4gIHNpbmdsZUF1dGhvcixcbiAgc2luZ2xlTGlzdGluZyxcbiAgcmVwbGllc1RvQXV0aG9yLFxuICBzaW5nbGVTdWJtaXNzaW9uLFxuICB0aGluZ01ldGEsXG4gIG11bHRpVGhpbmdNZXRhLFxuICBtdWx0aVRvcGljLFxuICBtdWx0aURvbWFpbixcbiAgbXVsdGlBdXRob3IsXG4gIG11bHRpU3VibWlzc2lvbixcbiAgdGhpbmdTY29yZXMsXG4gIHRoaW5nRGF0YSxcbiAgdGhpbmdEYXRhRnJvbVNvdWxzLFxuICB0b3BpY1NvdWxzLFxuICB1c2VyUGFnZXMsXG4gIHdpa2lQYWdlSWQsXG4gIHdpa2lQYWdlLFxuICB1c2VyTWV0YSxcbiAgY3JlYXRlU2NvcGUsXG4gIGN1cmF0ZWRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IFJvdXRlIGZyb20gXCJyb3V0ZS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIHNlYSBmcm9tIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICAuLi5zZWEuQVVUSF9TQ0hFTUEsXG4gIHRvcGljTmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWluTGVuZ3RoOiAxLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFXG4gIH0sXG5cbiAgVG9waWNEYXk6IHtcbiAgICB0aXRsZTogXCJUb3BpYyBEYXlcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBIHNpbmdsZSBkYXkgb2YgdGhpbmdzIGluIGEgdG9waWNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvOnRvcGljTmFtZS9kYXlzLzp5ZWFyLzptb250aC86ZGF5YCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWNOYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0sXG4gICAgICAgIHllYXI6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMjAxOCwgbWF4aW11bTogMjEwMCB9LFxuICAgICAgICBtb250aDogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAxLCBtYXhpbXVtOiAxMiB9LFxuICAgICAgICBkYXk6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMzEgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIiwgXCJ5ZWFyXCIsIFwibW9udGhcIiwgXCJkYXlcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIFRvcGljOiB7XG4gICAgdGl0bGU6IFwiVG9waWNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgdG9waWNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvOnRvcGljTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljTmFtZVwiXVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBuYW1lOiBcInRvcGljTmFtZVwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbmFtZToge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXByZWNhdGVkIGFzIHVubmVjZXNzYXJ5XCIsXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG5cbiAgZG9tYWluTmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWluTGVuZ3RoOiAxLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9ET01BSU5fU0laRVxuICB9LFxuXG4gIERvbWFpbjoge1xuICAgIHRpdGxlOiBcIkRvbWFpblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgaW4gYSBkb21haW5cIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9kb21haW5zLzpkb21haW5OYW1lYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZG9tYWluTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJkb21haW5OYW1lXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHVybDogeyB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVVJMX1NJWkUgfSxcbiAgVVJMOiB7XG4gICAgdGl0bGU6IFwiVVJMXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBmb3IgYSBnaXZlbiBVUkxcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS91cmxzL1xcKnVybGAsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXJsOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VybFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widXJsXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHRoaW5nSWQ6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9IQVNIX1NJWkVcbiAgfSxcblxuICB0aGluZ1NvdWw6IHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB0aGluZ0lkOiB7IFwiI3JlZlwiOiBcIiNkZWZpbml0aW9ucy90aGluZ0lkXCIgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0FsbENvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQWxsIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIGNvbW1lbnRzIGZvciBhIGdpdmVuIHN1Ym1pc3Npb25cIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvYWxsY29tbWVudHNgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdCByZXBsaWVzIHRvIGEgdGhpbmdcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvY29tbWVudHNgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHRpbWVzdGFtcDogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSxcbiAgdGhpbmdLaW5kOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfS0lORF9TSVpFXG4gIH0sXG5cbiAgVGhpbmc6IHtcbiAgICB0aXRsZTogXCJUaGluZyBSZWZlcmVuY2VcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhlc2UgYXJlIHN1Ym1pc3Npb25zLCBjb21tZW50cywgY2hhdCBtZXNzYWdlcyBhbmQgd2lraSBwYWdlc1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgaWQ6IFwidGhpbmdJZFwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgaWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAga2luZDogeyBcIiNyZWZcIjogXCIjL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0sXG4gICAgICB0aW1lc3RhbXA6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH0sXG4gICAgICBvcmlnaW5hbEhhc2g6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBvbmVPZjogW1xuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRGF0YUVkZ2VcIiB9LFxuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRGF0YVNpZ25lZEVkZ2VcIiB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB0b3BpYzoge1xuICAgICAgICBhbnlPZjogW1xuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29tZSBvbGQgdGhpbmdzIGhhZCBnZW5lcmljIHRvcGljIHNvdWxzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBcIiNcIjogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IDQyIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogW1wiI1wiXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGRvbWFpbjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvRG9tYWluRWRnZVwiIH0sXG4gICAgICB1cmw6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1VSTEVkZ2VcIiB9LFxuICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgIGFsbGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdBbGxDb21tZW50c1wiIH0sXG4gICAgICB2b3Rlc3VwOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc1VwXCIgfSxcbiAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfSxcbiAgICAgIG9wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgcmVwbHlUbzogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIGF1dGhvcjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvU0VBQXV0aG9yRWRnZVwiIH1cbiAgICB9LFxuXG4gICAgYW55T2Y6IFtcbiAgICAgIHtcbiAgICAgICAgYWxsT2Y6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aGluZ0hhc2hNYXRjaGVzU291bDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICAgICAgeyBzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmc6IHRydWUgfSxcbiAgICAgICAgICAgICAgeyB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoOiB0cnVlIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7IGlzTGVnYWN5VGhpbmc6IHRydWUgfSxcbiAgICAgIHtcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTZWxmIHZlcmlmeWluZyBjYW4gYmUgdXBkYXRlZCBpbiBpc29sYXRpb25cIixcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgICBjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQ29tbWVudHNcIiB9LFxuICAgICAgICAgIGFsbGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdBbGxDb21tZW50c1wiIH0sXG4gICAgICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICAgICAgdm90ZXNkb3duOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc0Rvd25cIiB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG5cbiAgUHJvb2ZPZldvcmtWb3Rlczoge1xuICAgICRhc3luYzogdHJ1ZSxcbiAgICBrZXlzQXJlUHJvb2ZzT2ZXb3JrOiB7XG4gICAgICBhbGdvcml0aG06IFwiYXJnb24yZFwiLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNvbXBsZXhpdHk6IDYsXG4gICAgICAgIGhhc2hMZW5ndGg6IDMyLFxuICAgICAgICB0aW1lQ29zdDogMSxcbiAgICAgICAgbWVtb3J5Q29zdDogMTAyNDAsXG4gICAgICAgIHBhcmFsbGVsaXNtOiAxXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nVm90ZXNVcDoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3Rlc3VwYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ1ZvdGVzRG93bjoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3Rlc2Rvd25gLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1Byb29mT2ZXb3JrVm90ZXNcIiB9XVxuICB9LFxuXG4gIFRoaW5nRGF0YToge1xuICAgIHRpdGxlOiBcIlVuc2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGlzIGlzIHRoZSBhY3R1YWwgY29udGVudCBvZiBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGFgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dLFxuICAgICAgcmVxdWlyZWQ6IFtcInRoaW5nSWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICB9LFxuICAgICAgdG9waWM6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3NlYUFsaWFzXCIgfSxcbiAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICBvcElkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIHJlcGx5VG9JZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy91cmxcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9XG4gICAgfSxcbiAgICB0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgfSxcblxuICBUaGluZ0RhdGFTaWduZWQ6IHtcbiAgICB0aXRsZTogXCJTaWduZWQgVGhpbmcgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJUaGlzIGlzIHRoZSBhY3R1YWwgY29udGVudCBvZiBhIHRoaW5nLCBjcnlwdG9ncmFwaGljYWxseSBzaWduZWRcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvZGF0YX46YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRoaW5nSWRcIiwgXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAga2luZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgc2VhOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX1RJVExFX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9IH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0JPRFlfU0laRVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH1cbiAgICAgIH0sXG4gICAgICBhdXRob3JJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9IH0sXG4gICAgICBvcElkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgcmVwbHlUb0lkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgZG9tYWluOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSB9LFxuICAgICAgdXJsOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9IH0sXG4gICAgICB0aW1lc3RhbXA6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH0gfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVDb3VudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBWb3RlIENvdW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFnZ3JlZ2F0ZWQgY291bnRzIGZyb20gYSB0YWJ1bGF0b3JcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZWNvdW50c0B+OnRhYnVsYXRvci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICB0YWJ1bGF0b3I6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGRvd246IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBjb21tZW50OiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgc2NvcmU6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBjb21tYW5kczogeyBzZWE6IHsgdHlwZTogW1wib2JqZWN0XCIsIFwic3RyaW5nXCJdIH0gfVxuICAgIH1cbiAgfSxcblxuICBMaXN0aW5nRGF0YToge1xuICAgICRhc3luYzogdHJ1ZSxcbiAgICB0aXRsZTogXCJMaXN0aW5nIE5vZGUgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNoYXJlZCBkZXNjcmlwdGlvbiBvZiBsaXN0aW5nIHByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBfOiB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICBwYXR0ZXJuUHJvcGVydGllczoge1xuICAgICAgXCJeZCskXCI6IHsgc2VhOiB7IHR5cGU6IFtcInN0cmluZ1wiLCBcIm51bGxcIiwgXCJ1bmRlZmluZWRcIl0gfSB9XG4gICAgfSxcblxuICAgIGRlbGV0ZU5vbk51bWVyaWNLZXlzOiB0cnVlLFxuICAgIGRlbGV0ZU1ldGFGb3JNaXNzaW5nOiB0cnVlXG4gIH0sXG5cbiAgc29ydE5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGVudW06IFtcbiAgICAgIFwibmV3XCIsXG4gICAgICBcIm9sZFwiLFxuICAgICAgXCJhY3RpdmVcIixcbiAgICAgIFwidG9wXCIsXG4gICAgICBcImNvbW1lbnRzXCIsXG4gICAgICBcImRpc2N1c3NlZFwiLFxuICAgICAgXCJob3RcIixcbiAgICAgIFwiYmVzdFwiLFxuICAgICAgXCJjb250cm92ZXJzaWFsXCIsXG4gICAgICBcInJhbmRvbVwiLFxuICAgICAgXCJmaXJlaG9zZVwiLFxuICAgICAgXCJjaGF0XCJcbiAgICBdXG4gIH0sXG5cbiAgVG9waWNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdC86dG9waWMvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICByZXF1aXJlZDogW1widG9waWNcIiwgXCJzb3J0XCIsIFwiaW5kZXhlclwiXSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWM6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbXG4gICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1cbiAgICBdXG4gIH0sXG5cbiAgRG9tYWluTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2RvbWFpbi86ZG9tYWluLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcmVxdWlyZWQ6IFtcImRvbWFpblwiLCBcInNvcnRcIiwgXCJpbmRleGVyXCJdLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkb21haW46IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIHVzZXJMaXN0aW5nVHlwZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1wib3ZlcnZpZXdcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tZW50c1wiLCBcImNvbW1hbmRzXCIsIFwiY29tbWVudGVkXCJdXG4gIH0sXG5cbiAgQXV0aG9yUmVwbGllc0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JQcm9maWxlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBTcGFjZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBuYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvckNvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9ycyBjb21tZW50cyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9jb21tZW50c346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yU3VibWlzc2lvbnM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBTdWJtaXNzaW9uc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyBzdWJtaXNzaW9ucyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9zdWJtaXNzaW9uc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclRoaW5nczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFRoaW5nc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyB0aGluZ3Mgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JQYWdlczoge1xuICAgIHRpdGxlOiBcIkF1dGhvciBQYWdlIE1hcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1hcHBpbmcgb2YgcGFnZSBuYW1lcyB0byB0aGluZ3NcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9wYWdlc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlcyA9IFIua2V5cyhkZWZpbml0aW9ucykucmVkdWNlKChyZXN1bHQsIG5hbWUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IFIucGF0aChbbmFtZSwgXCJzb3VsXCIsIFwicGF0dGVyblwiXSwgZGVmaW5pdGlvbnMpO1xuXG4gIGlmICghcGF0dGVybikgcmV0dXJuIHJlc3VsdDtcbiAgcmV0dXJuIFIuYXNzb2MobmFtZSwgbmV3IFJvdXRlKHBhdHRlcm4pLCByZXN1bHQpO1xufSk7XG5cbmNvbnN0IGRlZnNXaXRoUm91dGVzID0gUi5jb21wb3NlKFxuICBSLnJlZHVjZShcbiAgICAocmVzLCBbbmFtZSwgcm91dGVdKSA9PlxuICAgICAgUi5hc3NvYyhuYW1lLCBSLmFzc29jKFwicm91dGVcIiwgcm91dGUsIFIucHJvcChuYW1lLCBkZWZpbml0aW9ucykpLCByZXMpLFxuICAgIHt9XG4gICksXG4gIFIudG9QYWlyc1xuKShyb3V0ZXMpO1xuXG5leHBvcnQgY29uc3QgU2NoZW1hID0ge1xuICAuLi5kZWZzV2l0aFJvdXRlcyxcbiAgZGVmaW5pdGlvbnMsXG4gIHJvdXRlc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgYWxsIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBDb21tZW50Q29tbWFuZCB9IGZyb20gXCIuL0NvbW1lbnRDb21tYW5kXCI7XG5cbmNvbnN0IHRhYnVsYXRvclF1ZXJ5ID0gcXVlcnkoYXN5bmMgKHNjb3BlLCByb3V0ZSkgPT4ge1xuICBjb25zdCB0aGluZ1NvdWwgPSBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZShyb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IFt1cCwgZG93biwgY29tbWVudCwgcmVwbHlTb3Vsc10gPSBhd2FpdCBhbGwoW1xuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L3ZvdGVzdXBgKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L3ZvdGVzZG93bmApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vYWxsY29tbWVudHNgKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2NvbW1lbnRzYCkuc291bHMoKVxuICBdKTtcbiAgY29uc3QgdGhpbmdEYXRhID0gYXdhaXQgUXVlcnkudGhpbmdEYXRhRnJvbVNvdWxzKHJlcGx5U291bHMpO1xuICBjb25zdCBjb21tYW5kTWFwID0gQ29tbWVudENvbW1hbmQubWFwKHRoaW5nRGF0YSk7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICB1cCxcbiAgICBkb3duLFxuICAgIGNvbW1lbnQsXG4gICAgcmVwbGllczogcmVwbHlTb3Vscy5sZW5ndGgsXG4gICAgc2NvcmU6IHVwIC0gZG93blxuICB9O1xuXG4gIGlmIChSLmtleXMoY29tbWFuZE1hcCkubGVuZ3RoKSByZXN1bHQuY29tbWFuZHMgPSBKU09OLnN0cmluZ2lmeShjb21tYW5kTWFwKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5leHBvcnQgY29uc3QgVGFidWxhdG9yID0geyBxdWVyeTogdGFidWxhdG9yUXVlcnkgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcblxuZXhwb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuZXhwb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nRGF0YU5vZGVcIjtcblxuY29uc3QgdG9waWNQcmVmaXhlcyA9IHtcbiAgY2hhdG1zZzogXCJjaGF0OlwiLFxuICBjb21tZW50OiBcImNvbW1lbnRzOlwiXG59O1xuXG5jb25zdCBzb3VsVG9JZCA9IFIuY29tcG9zZShcbiAgUi5wcm9wKFwidGhpbmdJZFwiKSxcbiAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoLmJpbmQoU2NoZW1hLlRoaW5nLnJvdXRlKVxuKTtcblxuY29uc3Qgc291bHNUb0lkcyA9IFIubWFwKHNvdWxUb0lkKTtcblxuY29uc3QgaW5kZXggPSBSLmN1cnJ5KChwZWVyLCB0aGluZ0lkLCBkYXRhKSA9PiB7XG4gIGlmICghZGF0YS50b3BpYyAmJiAhZGF0YS5vcElkKSByZXR1cm47XG5cbiAgaWYgKGRhdGEub3BJZCAmJiAhZGF0YS50b3BpYykge1xuICAgIHBlZXIuZ3VuXG4gICAgICAuZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogZGF0YS5vcElkIH0pKVxuICAgICAgLmdldChcImRhdGFcIilcbiAgICAgIC5vbihmdW5jdGlvbiByZWN2KHRkKSB7XG4gICAgICAgIGlmICghdGQpIHJldHVybjtcbiAgICAgICAgaW5kZXgocGVlciwgdGhpbmdJZCwgeyAuLi5kYXRhLCB0b3BpYzogdGQudG9waWMgfHwgXCJhbGxcIiB9KTtcbiAgICAgICAgdGhpcy5vZmYoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSk7XG4gIGNvbnN0IGRheVN0ciA9IFRoaW5nU2V0LmRheVN0cihkYXRhLnRpbWVzdGFtcCk7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRheVN0ci5zcGxpdChcIi9cIik7XG4gIGNvbnN0IHRvcGljUHJlZml4ID0gdG9waWNQcmVmaXhlc1tkYXRhLmtpbmRdIHx8IFwiXCI7XG4gIGNvbnN0IGJhc2VUb3BpY05hbWUgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCB0b3BpY05hbWUgPSB0b3BpY1ByZWZpeCArIGJhc2VUb3BpY05hbWU7XG4gIGNvbnN0IHRvcGljID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lIH0pKTtcbiAgY29uc3QgdG9waWNEYXkgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hLlRvcGljRGF5LnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUsIHllYXIsIG1vbnRoLCBkYXkgfSlcbiAgKTtcblxuICBpZiAoIWRhdGEuc2tpcEFsbCAmJiBkYXRhLnRvcGljICE9PSBcImFsbFwiKSB7XG4gICAgY29uc3QgYWxsbmFtZSA9IGAke3RvcGljUHJlZml4fWFsbGA7XG4gICAgY29uc3QgYWxsVG9waWMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZTogYWxsbmFtZSB9KVxuICAgICk7XG4gICAgY29uc3QgYWxsVG9waWNEYXkgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRvcGljTmFtZTogYWxsbmFtZSxcbiAgICAgICAgeWVhcixcbiAgICAgICAgbW9udGgsXG4gICAgICAgIGRheVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgYWxsVG9waWMuc2V0KHRoaW5nKTtcbiAgICBhbGxUb3BpY0RheS5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEua2luZCA9PT0gXCJzdWJtaXNzaW9uXCIpIHtcbiAgICBjb25zdCB1cmxJbmZvID0gZGF0YS51cmwgPyBwYXJzZVVSSShkYXRhLnVybCkgOiB7fTtcbiAgICBjb25zdCBkb21haW5OYW1lID0gKGRhdGEudXJsXG4gICAgICA/ICh1cmxJbmZvLmhvc3QgfHwgdXJsSW5mby5zY2hlbWUgfHwgXCJcIikucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpXG4gICAgICA6IGBzZWxmLiR7ZGF0YS50b3BpY31gXG4gICAgKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRvbWFpbiA9IHBlZXIuZ3VuLmdldChTY2hlbWEuRG9tYWluLnJvdXRlLnJldmVyc2UoeyBkb21haW5OYW1lIH0pKTtcblxuICAgIGRvbWFpbi5zZXQodGhpbmcpO1xuXG4gICAgaWYgKGRhdGEudXJsKSB7XG4gICAgICBjb25zdCB1cmxOb2RlID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5VUkwucm91dGUucmV2ZXJzZSh7IHVybDogZGF0YS51cmwgfSkpO1xuXG4gICAgICAvLyB0aGluZy5nZXQoXCJ1cmxcIikucHV0KHVybE5vZGUpO1xuICAgICAgdXJsTm9kZS5zZXQodGhpbmcpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRhLm9wSWQpIHtcbiAgICBjb25zdCBhbGxjb21tZW50cyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSlcbiAgICApO1xuXG4gICAgYWxsY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIGlmIChkYXRhLnJlcGx5VG9JZCB8fCBkYXRhLm9wSWQpIHtcbiAgICBjb25zdCBjb21tZW50cyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0aGluZ0lkOiBkYXRhLnJlcGx5VG9JZCB8fCBkYXRhLm9wSWRcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICB0b3BpYy5zZXQodGhpbmcpO1xuICB0b3BpY0RheS5zZXQodGhpbmcpO1xufSk7XG5cbmNvbnN0IHB1dCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgZGF0YS50aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBvYmpIYXNoKGRhdGEpO1xuICBjb25zdCB7IHRpbWVzdGFtcCwga2luZCwgdG9waWMsIGF1dGhvcklkLCBvcElkLCByZXBseVRvSWQgfSA9IGRhdGE7XG4gIGNvbnN0IHRoaW5nSWQgPSBvYmpIYXNoKHtcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICB0b3BpYyxcbiAgICBhdXRob3JJZCxcbiAgICBvcElkLFxuICAgIHJlcGx5VG9JZCxcbiAgICBvcmlnaW5hbEhhc2hcbiAgfSk7XG5cbiAgY29uc3Qgbm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXRhU291bCA9IGF1dGhvcklkXG4gICAgPyBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCBhdXRob3JJZCB9KVxuICAgIDogU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3JpZ2luYWxIYXNoIH0pO1xuXG4gIGNvbnN0IG1ldGFEYXRhID0ge1xuICAgIGlkOiB0aGluZ0lkLFxuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIG9yaWdpbmFsSGFzaCxcbiAgICBkYXRhOiB7IFwiI1wiOiBkYXRhU291bCB9LFxuICAgIHZvdGVzdXA6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzVXAucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICB2b3Rlc2Rvd246IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzRG93bi5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGFsbGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9XG4gIH07XG5cbiAgaWYgKHRvcGljKVxuICAgIG1ldGFEYXRhLnRvcGljID0geyBcIiNcIjogU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IHRvcGljIH0pIH07XG4gIGlmIChhdXRob3JJZCkgbWV0YURhdGEuYXV0aG9yID0geyBcIiNcIjogYH4ke2F1dGhvcklkfWAgfTtcbiAgaWYgKG9wSWQpXG4gICAgbWV0YURhdGEub3AgPSB7IFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkgfTtcbiAgaWYgKHJlcGx5VG9JZClcbiAgICBtZXRhRGF0YS5yZXBseVRvID0ge1xuICAgICAgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcmVwbHlUb0lkIH0pXG4gICAgfTtcblxuICBwZWVyLmd1bi5nZXQoZGF0YVNvdWwpLnB1dChkYXRhKTtcbiAgbm9kZS5wdXQobWV0YURhdGEpO1xuICBpbmRleChwZWVyLCB0aGluZ0lkLCBkYXRhKTtcbiAgcmV0dXJuIG5vZGU7XG59KTtcblxuY29uc3Qgc3VibWl0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB0aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAoZGF0YS5kb21haW4pIGRhdGEuZG9tYWluID0gZGF0YS5kb21haW4udG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwgdGltZXN0YW1wLCBraW5kOiBcInN1Ym1pc3Npb25cIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnNTb3VsID0gU2NoZW1hLkF1dGhvclN1Ym1pc3Npb25zLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gcGVlci5ndW4uZ2V0KHN1Ym1pc3Npb25zU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwic3VibWlzc2lvbnNcIilcbiAgICAgIC5wdXQoc3VibWlzc2lvbnMpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICAgIHN1Ym1pc3Npb25zLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY29tbWVudCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNvbW1lbnRcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgY29tbWVudHNTb3VsID0gU2NoZW1hLkF1dGhvckNvbW1lbnRzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KGNvbW1lbnRzU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgIC5wdXQoY29tbWVudHMpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICAgIGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY2hhdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNoYXRtc2dcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCB3cml0ZVBhZ2UgPSBSLmN1cnJ5KChwZWVyLCBuYW1lLCBib2R5KSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoIXVzZXIpIHJldHVybiBQcm9taXNlLnJlamVjdChcIm5vdCBsb2dnZWQgaW5cIik7XG4gIGxldCB0aGluZztcbiAgY29uc3QgcGFnZXNTb3VsID0gU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZDogdXNlci5wdWIgfSk7XG4gIGNvbnN0IGNoYWluID0gcGVlci5ndW4uZ2V0KHBhZ2VzU291bCkuZ2V0KG5hbWUpO1xuXG4gIHJldHVybiBjaGFpbi50aGVuKHJlcyA9PiB7XG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY2hhaW5cbiAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgLmdldChcImJvZHlcIilcbiAgICAgICAgLnB1dChib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgYm9keSxcbiAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgIGtpbmQ6IFwid2lraXBhZ2VcIixcbiAgICAgICAgYXV0aG9yOiB1c2VyLmFsaWFzLFxuICAgICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICAgIH07XG5cbiAgICAgIHRoaW5nID0gcHV0KHBlZXIsIGRhdGEpO1xuICAgICAgY2hhaW4ucHV0KHRoaW5nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHZvdGUgPSBSLmN1cnJ5KChwZWVyLCBpZCwga2luZCwgbm9uY2UpID0+IHtcbiAgY29uc3Qgdm90ZXMgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hW2tpbmQgPT09IFwidXBcIiA/IFwiVGhpbmdWb3Rlc1VwXCIgOiBcIlRoaW5nVm90ZXNEb3duXCJdLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogaWRcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiB2b3Rlcy5nZXQobm9uY2UpLnB1dChcIjFcIik7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nID0ge1xuICBzb3VsVG9JZCxcbiAgc291bHNUb0lkcyxcbiAgcHV0LFxuICBzdWJtaXQsXG4gIGNvbW1lbnQsXG4gIGNoYXQsXG4gIHdyaXRlUGFnZSxcbiAgdm90ZSxcbiAgaW5kZXhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5cbmNvbnN0IGJvZHkgPSBSLnByb3BPcihcIlwiLCBcImJvZHlcIik7XG5jb25zdCB1cmwgPSBSLnByb3BPcihcIlwiLCBcInVybFwiKTtcbmNvbnN0IGRvbWFpbiA9IFIuY29tcG9zZShcbiAgdXJsU3RyID0+IHtcbiAgICBpZiAoIXVybFN0cikgcmV0dXJuIFwiXCI7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VVUkkodXJsU3RyKTtcblxuICAgIHJldHVybiAocGFyc2VkLmhvc3QgfHwgcGFyc2VkLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIik7XG4gIH0sXG4gIHVybFxuKTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nRGF0YU5vZGUgPSB7IGJvZHksIGRvbWFpbiB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vR3VuTm9kZVwiO1xuXG5jb25zdCBzb3VscyA9IEd1bk5vZGUuZWRnZXM7XG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICBSLm1hcChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLnByb3AoXCJ0aGluZ0lkXCIpLFxuICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoLmJpbmQoU2NoZW1hLlRoaW5nLnJvdXRlKVxuICAgIClcbiAgKSxcbiAgR3VuTm9kZS5lZGdlc1xuKTtcblxuY29uc3QgdW5pb24gPSBSLmNvbXBvc2UoXG4gIFIuZGlzc29jKFwiX1wiKSxcbiAgUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSlcbik7XG5cbmZ1bmN0aW9uIGRheVN0cih0aW1lc3RhbXApIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGNvbnN0IHllYXIgPSBkLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gZC5nZXRVVENNb250aCgpICsgMTtcbiAgY29uc3QgZGF5TnVtID0gZC5nZXRVVENEYXRlKCk7XG5cbiAgcmV0dXJuIGAke3llYXJ9LyR7bW9udGh9LyR7ZGF5TnVtfWA7XG59XG5cbmV4cG9ydCBjb25zdCBUaGluZ1NldCA9IHsgaWRzLCB1bmlvbiwgc291bHMsIGRheVN0ciB9O1xuIiwiZXhwb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuZXhwb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nRGF0YU5vZGVcIjtcbmV4cG9ydCB7IFRoaW5nIH0gZnJvbSBcIi4vVGhpbmdcIjtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHRva2VuaXplID0gc291cmNlID0+IHtcbiAgY29uc3QgdG9rZW5NYXAgPSAoc291cmNlIHx8IFwiXCIpLnNwbGl0KFwiXFxuXCIpLnJlZHVjZSgoZGVmLCBsaW5lKSA9PiB7XG4gICAgY29uc3QgdG9rZW5zID0gbGluZVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLm1hcChSLnRyaW0pXG4gICAgICAuZmlsdGVyKHggPT4geCk7XG5cbiAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHJldHVybiBkZWY7XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2Vucywge30sIGRlZik7XG4gIH0sIHt9KTtcblxuICBjb25zdCBpc1ByZXNlbnQgPSBwID0+IHtcbiAgICBsZXQgY2hlY2sgPSBwO1xuXG4gICAgaWYgKHR5cGVvZiBwID09PSBcInN0cmluZ1wiKSBjaGVjayA9IHAuc3BsaXQoXCIgXCIpO1xuICAgIHJldHVybiBjaGVjayAmJiBSLnBhdGgoY2hlY2ssIHRva2VuTWFwKTtcbiAgfTtcblxuICBjb25zdCBnZXRWYWx1ZXMgPSBwID0+IFIua2V5c0luKGlzUHJlc2VudChwKSk7XG4gIGNvbnN0IGdldFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocClbMF0gfHwgbnVsbDtcbiAgY29uc3QgZ2V0TGFzdFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocCkucG9wKCkgfHwgbnVsbDtcblxuICBjb25zdCBnZXRWYWx1ZUNoYWluID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGxldCBuZXh0ID0gcDtcblxuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBuZXh0ID0gZ2V0VmFsdWUoWy4uLmtleXMsIC4uLnZhbHVlc10pO1xuICAgICAgbmV4dCAmJiB2YWx1ZXMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFBhaXJzID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuXG4gICAgcmV0dXJuIGdldFZhbHVlcyhrZXlzKS5yZWR1Y2UoKHBhaXJzLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldFZhbHVlKFsuLi5rZXlzLCBrZXldKTtcblxuICAgICAgcmV0dXJuIFsuLi5wYWlycywgW2tleSwgdmFsXV07XG4gICAgfSwgW10pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlLFxuICAgIGlzUHJlc2VudCxcbiAgICBnZXRWYWx1ZSxcbiAgICBnZXRWYWx1ZXMsXG4gICAgZ2V0TGFzdFZhbHVlLFxuICAgIGdldFZhbHVlQ2hhaW4sXG4gICAgZ2V0UGFpcnNcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2tlbml6ZXIgPSB7IHRva2VuaXplIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBjcmVhdGVTdXBwcmVzc29yIH0gZnJvbSBcImd1bi1zdXBwcmVzc29yXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuXG5jb25zdCBpc0xlZ2FjeVRoaW5nID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBkYXRhU291bCA9IFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSk7XG4gIGNvbnN0IG5ld2VzdCA9IFIud2l0aG91dChcbiAgICBbXCJjb21tZW50c1wiLCBcImFsbGNvbW1lbnRzXCIsIFwidm90ZXN1cFwiLCBcInZvdGVzZG93blwiXSxcbiAgICBSLmtleXMoUi5wYXRoKFtcIl9cIiwgXCI+XCJdLCBkYXRhKSlcbiAgKVxuICAgIC5tYXAoa2V5ID0+IFIucGF0aChbXCJfXCIsIFwiPlwiLCBrZXldLCBkYXRhKSlcbiAgICAuc29ydCgpXG4gICAgLnBvcCgpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goZGF0YVNvdWwpIHx8IHt9O1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gdGhpbmdJZCAmJiBuZXdlc3QgJiYgbmV3ZXN0IDwgMTU0MzEwMjgxNDk0NTtcbn07XG5cbmNvbnN0IHRoaW5nSGFzaE1hdGNoZXNTb3VsID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gKFxuICAgIGlkICYmXG4gICAgaWQgPT09XG4gICAgICBvYmpIYXNoKHtcbiAgICAgICAgYXV0aG9ySWQ6IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGltZXN0YW1wOiBwYXJzZUludChSLnByb3AoXCJ0aW1lc3RhbXBcIiwgZGF0YSksIDEwKSxcbiAgICAgICAga2luZDogUi5wcm9wKFwia2luZFwiLCBkYXRhKSxcbiAgICAgICAgdG9waWM6IFIucHJvcChcbiAgICAgICAgICBcInRvcGljTmFtZVwiLFxuICAgICAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5tYXRjaChSLnBhdGgoW1widG9waWNcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3BJZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgcmVwbHlUb0lkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9yaWdpbmFsSGFzaDogUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpXG4gICAgICB9KVxuICApO1xufTtcblxuY29uc3Qgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGF1dGhvcklkID0gKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkO1xuICBjb25zdCBzaWduZWRJZCA9IFIucHJvcChcbiAgICBcImF1dGhvcklkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBhdXRob3JJZCAmJiBhdXRob3JJZCA9PT0gc2lnbmVkSWQ7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpO1xuICBjb25zdCBpZCA9IFIucHJvcChcbiAgICBcInRoaW5nSWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSBvcmlnaW5hbEhhc2g7XG59O1xuXG5jb25zdCBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UgPSBhanYgPT4gKFxuICBub2RlVHlwZU5hbWUsXG4gIGRhdGEsXG4gIF9wU2NoZW1hLFxuICBfY1BhdGgsXG4gIHBhcmVudERhdGFcbikgPT4ge1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgcGFyZW50RGF0YSkgfHwgXCJcIikgfHwge307XG4gIGNvbnN0IHsgdGhpbmdJZDogcHJvcFRoaW5nSWQgfSA9IFNjaGVtYVtub2RlVHlwZU5hbWVdLnJvdXRlLm1hdGNoKFxuICAgIFIucHJvcChcIiNcIiwgZGF0YSkgfHwgXCJcIlxuICApO1xuXG4gIGlmICghdGhpbmdJZCB8fCB0aGluZ0lkICE9PSBwcm9wVGhpbmdJZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYWp2LmNvbXBpbGUoeyAkcmVmOiBgc2NoZW1hLmpzb24jL2RlZmluaXRpb25zLyR7bm9kZVR5cGVOYW1lfUVkZ2VgIH0pKFxuICAgIGRhdGFcbiAgKTtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YUhhc2hNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgeyBfLCAuLi5yZWNvcmQgfSA9IGRhdGEgfHwge307IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICByZWNvcmQudGltZXN0YW1wID0gcGFyc2VGbG9hdChyZWNvcmQudGltZXN0YW1wLCAxMCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikgfHwge307XG5cbiAgcmV0dXJuIHRoaW5nSWQgJiYgdGhpbmdJZCA9PT0gb2JqSGFzaChyZWNvcmQpO1xufTtcblxuY29uc3QgaXNWb3RlVmFsaWQgPSAoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkgPT4ge1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiLCBjb25maWcgPSB7fSB9ID0gc2NoZW1hIHx8IHt9O1xuXG4gIGNvbnN0IG5vbmNlID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20odm90ZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIodm90ZSwgXCJoZXhcIik7XG4gIGNvbnN0IHNhbHQgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbShub25jZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIobm9uY2UsIFwiaGV4XCIpO1xuICBjb25zdCBoYXNoID0gYXJnb24yLmhhc2gocHJlZml4LCB7XG4gICAgc2FsdCxcbiAgICBoYXNoTGVuZ3RoOiBjb25maWcuaGFzaExlbmd0aCxcbiAgICB0aW1lQ29zdDogY29uZmlnLnRpbWVDb3N0LFxuICAgIG1lbW9yeUNvc3Q6IGNvbmZpZy5tZW1vcnlDb3N0LFxuICAgIHBhcmFsbGVsaXNtOiBjb25maWcucGFyYWxsZWxpc20sXG4gICAgcmF3OiB0cnVlLFxuICAgIHR5cGU6IGFyZ29uMlthbGdvcml0aG1dXG4gIH0pO1xuICBsZXQgb2ZmID0gMDtcbiAgbGV0IGk7XG5cbiAgZm9yIChpID0gMDsgaSA8PSBjb25maWcuY29tcGxleGl0eSAtIDg7IGkgKz0gOCwgb2ZmKyspIHtcbiAgICBpZiAoaGFzaFtvZmZdICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWFzayA9IDB4ZmYgPDwgKDggKyBpIC0gY29uZmlnLmNvbXBsZXhpdHkpO1xuXG4gIHJldHVybiAoaGFzaFtvZmZdICYgbWFzaykgPT09IDA7XG59O1xuXG5jb25zdCBrZXlzQXJlUHJvb2ZzT2ZXb3JrID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhcmdvbjIgPSByZXF1aXJlKFwiYXJnb24yXCIpO1xuXG4gIGlmICghYXJnb24yKSByZXR1cm4gdHJ1ZTsgLy8gaW4gYnJvd3NlciBkb24ndCBib3RoZXIgZm9yIG5vd1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiIH0gPSBzY2hlbWEgfHwge307XG4gIGNvbnN0IHByZWZpeCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKGFsZ29yaXRobSAhPT0gXCJhcmdvbjJkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGFyZ29uMiBzdXBwb3J0ZWQgZm9yIHZvdGUgaGFzaGVzXCIpO1xuICB9XG5cbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaCh2b3RlID0+IHtcbiAgICBpZiAoIWlzVm90ZVZhbGlkKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgdm90ZVwiLCBwcmVmaXgsIHZvdGUpO1xuICAgICAgZGVsZXRlIGRhdGFbdm90ZV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBkZWxldGVOb25OdW1lcmljS2V5cyA9IChcbiAgc2NoZW1hLFxuICBkYXRhLFxuICBwU2NoZW1hLFxuICBjUGF0aCxcbiAgcGFyZW50RGF0YSxcbiAga2V5SW5QYXJlbnRcbikgPT4ge1xuICBjb25zdCBrZXlzID0gUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSk7XG4gIGNvbnN0IG1ldGEgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0sIGRhdGEpO1xuXG4gIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHBhcnNlSW50KGtleSwgMTApO1xuXG4gICAgaWYgKCF2YWwgJiYgdmFsICE9PSAwKSB7XG4gICAgICBkZWxldGUgbWV0YVtrZXldO1xuICAgICAgZGVsZXRlIGRhdGFba2V5XTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGRlbGV0ZU1ldGFGb3JNaXNzaW5nID0gKFxuICBzY2hlbWEsXG4gIGRhdGEsXG4gIHBTY2hlbWEsXG4gIGNQYXRoLFxuICBwYXJlbnREYXRhLFxuICBrZXlJblBhcmVudFxuKSA9PiB7XG4gIGNvbnN0IGtleXMgPSBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKTtcbiAgY29uc3QgbWV0YSA9IFIucGF0aE9yKHt9LCBbXCJfXCIsIFwiPlwiXSwgZGF0YSk7XG4gIGNvbnN0IG1ldGFLZXlzID0gUi5rZXlzKG1ldGEpO1xuICBjb25zdCBtaXNzaW5nID0gUi5kaWZmZXJlbmNlKG1ldGFLZXlzLCBrZXlzKTtcblxuICBpZiAobWlzc2luZy5sZW5ndGgpIGRhdGFbXCJfXCJdW1wiPlwiXSA9IFIub21pdChtaXNzaW5nLCBtZXRhKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBpbml0QWp2ID0gUi5jb21wb3NlKFxuICBhanYgPT4ge1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiaXNMZWdhY3lUaGluZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogaXNMZWdhY3lUaGluZ1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nSGFzaE1hdGNoZXNTb3VsXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nUmVsYXRlZEVkZ2VcIiwge1xuICAgICAgdmFsaWRhdGU6IGdldElzVGhpbmdSZWxhdGVkRWRnZShhanYpXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YUhhc2hNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJrZXlzQXJlUHJvb2ZzT2ZXb3JrXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJkZWxldGVOb25OdW1lcmljS2V5c1wiLCB7XG4gICAgICB2YWxpZGF0ZTogZGVsZXRlTm9uTnVtZXJpY0tleXMsXG4gICAgICBtb2RpZnlpbmc6IHRydWVcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcImRlbGV0ZU1ldGFGb3JNaXNzaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBkZWxldGVNZXRhRm9yTWlzc2luZyxcbiAgICAgIG1vZGlmeWluZzogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBhanY7XG4gIH0sXG4gIHNlYS5pbml0QWp2XG4pO1xuXG5leHBvcnQgY29uc3Qgc3VwcHJlc3NvciA9IGNyZWF0ZVN1cHByZXNzb3Ioe1xuICBkZWZpbml0aW9uczogU2NoZW1hLmRlZmluaXRpb25zLFxuICBpbml0OiBSLmNvbXBvc2UoXG4gICAgaW5pdEFqdixcbiAgICBSLmFsd2F5cyh7IHJlbW92ZUFkZGl0aW9uYWw6IGZhbHNlIH0pXG4gIClcbn0pO1xuXG5jb25zdCBndW5XaXJlSW5wdXQgPSBSLmN1cnJ5KChwZWVyLCBjb250ZXh0KSA9PlxuICBjb250ZXh0Lm9uKFwiaW5cIiwgZnVuY3Rpb24gd2lyZUlucHV0KG1zZykge1xuICAgIGNvbnN0IF8gPSBtc2dbXCJfXCJdO1xuXG4gICAgZGVsZXRlIG1zZ1tcIl9cIl07XG4gICAgaWYgKFwicGluZ1wiIGluIG1zZyB8fCBcImxlZWNoXCIgaW4gbXNnKSByZXR1cm47XG4gICAgaWYgKG1zZy5wdXQgJiYgIVIua2V5cyhtc2cucHV0KS5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBwcm9taXNlID0gcGVlci5jb25maWcuZGlzYWJsZVZhbGlkYXRpb25cbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKG1zZylcbiAgICAgIDogc3VwcHJlc3Nvci52YWxpZGF0ZShtc2cpO1xuXG4gICAgcHJvbWlzZVxuICAgICAgLnRoZW4odmFsaWRhdGVkID0+IHtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHJldHVybiBjb25zb2xlLmxvZyhcIm1zZyBkaWRuJ3QgdmFsaWRhdGVcIiwgbXNnKTtcbiAgICAgICAgbXNnW1wiX1wiXSA9IF87XG4gICAgICAgIHJldHVybiB0aGlzLnRvLm5leHQobXNnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJ2YWxpZGF0ZSBlcnJcIiwgbXNnLCBlcnIuc3RhY2sgfHwgZXJyKSk7XG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgVmFsaWRhdGlvbiA9IHtcbiAgaXNMZWdhY3lUaGluZyxcbiAgdGhpbmdIYXNoTWF0Y2hlc1NvdWwsXG4gIHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMsXG4gIHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2gsXG4gIGdldElzVGhpbmdSZWxhdGVkRWRnZSxcbiAgdGhpbmdEYXRhSGFzaE1hdGNoZXMsXG4gIGlzVm90ZVZhbGlkLFxuICBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICBpbml0QWp2LFxuICBzdXBwcmVzc29yLFxuICBndW5XaXJlSW5wdXRcbn07XG4iLCJpbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5leHBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmV4cG9ydCB7IENvbW1lbnRDb21tYW5kIH0gZnJvbSBcIi4vQ29tbWVudENvbW1hbmRcIjtcbmV4cG9ydCB7IExpc3RpbmcsIExpc3RpbmdPcmFjbGUsIFNwYWNlU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdcIjtcbmV4cG9ydCB7IFBhZ2UgfSBmcm9tIFwiLi9QYWdlXCI7XG5leHBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuZXhwb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5leHBvcnQgeyBUaGluZywgVGhpbmdTZXQsIFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ1wiO1xuZXhwb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gXCIuL1ZhbGlkYXRpb25cIjtcbmV4cG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5leHBvcnQgeyBUYWJ1bGF0b3IgfSBmcm9tIFwiLi9UYWJ1bGF0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IFBlZXIuaW5pdDtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9hcmdvbjJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3Njb3BlX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX3NlYXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfb2JqZWN0X2hhc2hfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcm91dGVfcGFyc2VyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3VyaV9qc19fOyJdLCJzb3VyY2VSb290IjoiIn0=