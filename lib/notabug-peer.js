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
  const data = [];

  const fetchBatch = (size = 30) => Promise.all(R.map(async row => {
    let inListing = true;

    if (!row[_ListingNode.ListingNode.POS_ID]) {
      console.log("blankRow", row);
      return;
    }

    if (filterFn) inListing = await filterFn(row[_ListingNode.ListingNode.POS_ID]);

    if (inListing) {
      if (spec.uniqueByContent) {
        const itemData = await _Query.Query.thingData(scope, row[_ListingNode.ListingNode.POS_ID]);

        const url = _Thing.ThingDataNode.url(itemData);

        if (url && R.find(R.compose(R.equals(url), _Thing.ThingDataNode.url), data)) return;
        data.push(itemData);
      }

      filtered.push(row);
    }
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
  url,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIklOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkNIQVRfUFJFTE9BRF9JVEVNUyIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwicXVlcnkiLCJtdWx0aVRvcGljIiwiZG9tYWluU291cmNlIiwiZG9tYWlucyIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlZCIsImlkcyIsInRoaW5nSWQiLCJUaGluZyIsInJvdXRlIiwicmV2ZXJzZSIsIm9wU291cmNlIiwic3VibWlzc2lvbklkcyIsIm11bHRpU3VibWlzc2lvbiIsInJlcGxpZXNTb3VyY2UiLCJyZXBsaWVzVG9BdXRob3IiLCJyZXBsaWVzVG9BdXRob3JJZCIsInNvdXJjZXMiLCJsaXN0aW5nIiwicmVwbGllcyIsIm9wIiwiY3VyYXRvciIsImF1dGhvciIsImRvbWFpbiIsInRvcGljIiwic291cmNlTmFtZXMiLCJzb3VyY2VOYW1lIiwiZGVmIiwiZnJvbURlZmluaXRpb24iLCJuYW1lIiwibWVyZ2VMZWZ0IiwiTGlzdGluZ0RhdGFTb3VyY2UiLCJmcm9tU291cmNlIiwic291cmNlIiwib3duZXJJZCIsInNwYWNlTmFtZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsImlzQ2hhdCIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJiYXNlUGF0aCIsInN1Ym1pdFBhdGgiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsImZucyIsImFkZFZvdGVGaWx0ZXIiLCJ0IiwiaWRlbnRpY2FsIiwiaXRlbSIsImtpbmQiLCJhbGlhcyIsImx0ZSIsImd0ZSIsInRoaW5nIiwiY21kcyIsInRhZ05hbWUiLCJjb250ZW50RmlsdGVyIiwidm90ZUZpbHRlciIsInRoaW5nRmlsdGVyIiwiZ2V0RmlsdGVyZWRSb3dzIiwic3BlYyIsInNvcnRlZFJvd3MiLCJsaW1pdCIsImxpbWl0UHJvcCIsImNvdW50IiwiY291bnRQcm9wIiwiYWZ0ZXIiLCJmaWx0ZXJGbiIsInJvd3MiLCJzbGljZSIsImZpbHRlcmVkIiwiZmV0Y2hCYXRjaCIsInNpemUiLCJQcm9taXNlIiwicm93IiwiaW5MaXN0aW5nIiwiUE9TX0lEIiwiY29uc29sZSIsImxvZyIsIml0ZW1EYXRhIiwidXJsIiwiZXF1YWxzIiwic3BsaWNlIiwiUE9TX1ZBTCIsImdldEZpbHRlcmVkSWRzIiwieCIsInRoaW5nTWV0YSIsInRoaW5nU291bCIsInNjb3JlcyIsIkxpc3RpbmdGaWx0ZXIiLCJQT1NfSURYIiwicm93c1RvSWRzIiwicm93c1RvSXRlbXMiLCJzb3VsRnJvbVBhdGgiLCJwYXRoRnJvbVNvdWwiLCJSZWdFeHAiLCJpZFRvU291bCIsImlkc1RvU291bHMiLCJzb3VsVG9JZCIsIm1hdGNoIiwic291bHNUb0lkcyIsImdldFJvdyIsIm5vZGUiLCJpZHgiLCJpZkVsc2UiLCJpbnNlcnQiLCJhbHdheXMiLCJpdGVtS2V5cyIsImZpbHRlciIsInNlcmlhbGl6ZSIsIml0ZW1zIiwiYWRkSW5kZXgiLCJhc3NvYyIsImRlZmF1bHRUbyIsInNvcnRSb3dzIiwic29ydFdpdGgiLCJhc2NlbmQiLCJjb25kIiwiaXNOaWwiLCJJbmZpbml0eSIsIlQiLCJzb3J0ZWRJZHMiLCJpdGVtc1RvUm93cyIsImRpZmYiLCJ1cGRhdGVkSXRlbXMiLCJyZW1vdmVJZHMiLCJtYXhTaXplIiwicmVtb3ZlZCIsImluZGV4QnkiLCJieUlkIiwiY2hhbmdlcyIsInVwZGF0ZWQiLCJ0b1JlcGxhY2UiLCJtYXhJZHgiLCJwYXJzZWQiLCJyYXdWYWx1ZSIsImkiLCJ2YWx1ZSIsImV4aXN0aW5nIiwiYWxsU29ydGVkIiwic29ydGVkIiwibWlzc2luZyIsImFkZGVkIiwiY29uY2F0IiwiaW5zZXJ0ZWQiLCJwb3AiLCJyZXBsYWNlZCIsImNhdGVnb3JpemVEaWZmIiwib3JpZ2luYWwiLCJhbGxLZXlzIiwiX2RpZmZJZHgiLCJkaWZmSWQiLCJfb3JpZ0lkeCIsIm9yaWdJZCIsInVuaW9uUm93cyIsInVuaXFCeSIsInJvd3NGcm9tU291bHMiLCJyZWFkIiwiTGlzdGluZ05vZGUiLCJ1cGRhdGVMaXN0aW5nIiwib3JjIiwibmV3U2NvcGUiLCJ0b0l0ZW1zIiwid3JpdGUiLCJvblB1dCIsInVwZGF0ZWRTb3VsIiwicHJvcHMiLCJ1cGRhdGVkSWRzIiwic3BlY0Zyb21QYXRoIiwiVGhpbmdWb3RlQ291bnRzIiwiaXNTdGlja3kiLCJnZXRBY2Nlc3NlcyIsImxpc3RlbiIsIkxpc3RpbmdPcmFjbGUiLCJjYWxjdWxhdGVSb3dzIiwic3RpY2t5SXRlbXMiLCJkYXRhU291cmNlIiwiY2FsY3VsYXRlIiwidG9Ob2RlIiwicGF0aHMiLCJzdGlja3lSb3dzIiwiZnJvbVNwZWMiLCJmcm9tUGF0aCIsImdldFNwZWMiLCJoYXNJbmRleGVyIiwibm9kZUZyb21QYXRoIiwiTGlzdGluZ1F1ZXJ5IiwidG9JZHMiLCJ2b3RlU29ydCIsImNvbnRhaW5zIiwidGltZVNvcnQiLCJzb3J0cyIsIm5ldyIsIm11bHRpcGx5Iiwib2xkIiwiYWN0aXZlIiwibGFzdEFjdGl2ZSIsInRvcCIsImNvbW1lbnRzIiwiZGlzY3Vzc2VkIiwic2NvcmUiLCJzZWNvbmRzIiwib3JkZXIiLCJNYXRoIiwibG9nMTAiLCJtYXgiLCJhYnMiLCJob3QiLCJzaWduIiwiYmVzdCIsInVwcyIsImRvd25zIiwibiIsInoiLCJsZWZ0IiwicmlnaHQiLCJzcXJ0IiwidW5kZXIiLCJjb250cm92ZXJzaWFsIiwibWFnbml0dWRlIiwiYmFsYW5jZSIsImlzVmFsaWRTb3J0IiwidG9JdGVtIiwiZnJvbVRoaW5nU2V0cyIsInBpcGUiLCJ1bmlvbiIsIkxpc3RpbmdTb3J0IiwiYXBwbHkiLCJhcCIsIm9mIiwiZ2V0U291cmNlIiwiZXh0cmEiLCJ3aWtpUGFnZSIsIkxpc3RpbmdTcGVjIiwiZ2V0U2lkZWJhciIsIm5vcm1hbFRvcGljcyIsInNwbGl0VG9waWNzIiwic3VibWl0VG8iLCJ0YWIiLCJDaGF0TGlzdGluZyIsIndpdGhSb3V0ZSIsIkNvbW1lbnRMaXN0aW5nIiwiQ29tbWVudGVkTGlzdGluZyIsIkRvbWFpbkxpc3RpbmciLCJGaXJlaG9zZUxpc3RpbmciLCJkaWZmRGF0YSIsInVwZGF0ZWRBdXRob3JlZCIsIm9wSWQiLCJyZXBseUlkcyIsIlRoaW5nQ29tbWVudHMiLCJJbmJveExpc3RpbmciLCJ1c2VyTWV0YSIsIm1ldGEiLCJwcm9maWxlSWQiLCJQcm9maWxlTGlzdGluZyIsInNpZGViYXJQYWdlTmFtZSIsIm9yaWdpbmFsRGF0YSIsInJlbW92ZWRJZHMiLCJ2b3RlQ291bnRzTWF0Y2giLCJ0aGluZ01hdGNoIiwiVGhpbmdEYXRhU2lnbmVkIiwiYXV0aG9yTWF0Y2giLCJTRUFBdXRob3IiLCJmcm9tUGFnZUlkIiwiZXhpc3RpbmdLZXlzIiwid29yayIsIm1ldGhvZCIsInByaW9yaXR5IiwiU3BhY2VMaXN0aW5nIiwiVG9waWNMaXN0aW5nIiwidHlwZXMiLCJ0eXBlc0FycmF5Iiwic2lkZWJhckZyb21QYXRoIiwiRXJyb3IiLCJiYXNlU3BlYyIsIkxpc3RpbmdUeXBlIiwic3BsaXREb21haW5zIiwidG9Mb3dlciIsIlBhdGgiLCJjb25maWdQYWdlTmFtZSIsInNvdXJjZVdpdGhEZWZhdWx0cyIsIm5vZGVUb1NwYWNlTmFtZXMiLCJ1c2VyU3BhY2VOYW1lcyIsInVzZXJQYWdlcyIsIlNwYWNlU3BlYyIsIkxpc3RpbmciLCJ0eXBlRnJvbVBhdGgiLCJ3aXRoTWF0Y2giLCJwYXJhbXMiLCJwcmVsb2FkIiwid2l0aExpc3RpbmdNYXRjaCIsInNpZGViYXIiLCJzcGFjZSIsInJlYWxRdWVyeSIsInByZWxvYWRMaXN0aW5nIiwidGhpbmdTb3VscyIsInRoaW5ncyIsIm11bHRpVGhpbmdNZXRhIiwib3BJZHMiLCJvcFNvdWxzIiwiY2hhdFBhdGgiLCJnZXRDYWNoZSIsInByZWZpeCIsImRlZmF1bHRQcmVmaXgiLCJpZGVudGlmaWVyIiwiZGVmYXVsdElkZW50aWZpZXIiLCJkZWZhdWx0U29ydCIsInJlc3QiLCJ0aGluZ0NvbW1lbnRzIiwic3BhY2VMaXN0aW5nIiwiZGVmYXVsdE5hbWUiLCJkZWZhdWx0QXV0aG9ySWQiLCJzcGFjZVRoaW5nQ29tbWVudHMiLCJzcGFjZVBhdGgiLCJsaXN0aW5nUGF0aCIsInByb2ZpbGUiLCJkZWZhdWx0VHlwZSIsImluYm94IiwiUGFnZSIsImluaXQiLCJjb25maWciLCJsZWVjaCIsImRpc2FibGVWYWxpZGF0aW9uIiwibm9HdW4iLCJsb2NhbFN0b3JhZ2UiLCJwZXJzaXN0IiwiY2ZnIiwicmFkaXNrIiwib24iLCJndW5XaXJlSW5wdXQiLCJzdG9yZUZuIiwic3RvcmUiLCJhIiwicmV0cnkiLCJzZW5kTGVlY2giLCJfIiwiY3JlYXRlU2NvcGUiLCJzdWJtaXQiLCJjb21tZW50IiwiY2hhdCIsIndyaXRlUGFnZSIsInZvdGUiLCJxdWVyaWVzIiwiUGVlciIsImVtcHR5UHJvbWlzZSIsInVuaW9uQXJyYXlzIiwidG9waWNTb3VscyIsImRheXMiLCJkYXlTdHJpbmdzIiwib25lRGF5Iiwic3RhcnQiLCJEYXRlIiwiZ2V0VGltZSIsImRheVN0ciIsIk9iamVjdCIsInRvcGljTmFtZSIsImRzIiwic2luZ2xlVG9waWMiLCJ0U291bHMiLCJpdGVtTWF4IiwiZmV0Y2hNb3JlIiwidG9waWNTb3VsIiwibW9yZSIsInNpbmdsZURvbWFpbiIsIkRvbWFpbiIsImRvbWFpbk5hbWUiLCJzaW5nbGVBdXRob3IiLCJzdWJtaXNzaW9ucyIsImxpc3RpbmdJZHMiLCJzaW5nbGVMaXN0aW5nIiwiYXV0aG9yZWRTb3VscyIsImF1dGhvcmVkU291bCIsInNpbmdsZVN1Ym1pc3Npb24iLCJUaGluZ0FsbENvbW1lbnRzIiwic3VibWlzc2lvbklkIiwicHJlcGVuZCIsInJlcGx5VG9Tb3VsIiwib3BTb3VsIiwidGhpbmdpZCIsInJlcGx5VG9JZCIsIm11bHRpUXVlcnkiLCJzaW5nbGVRdWVyeSIsInBsdXJhbCIsInNpbmdsZSIsImNvbGxhdGUiLCJ0aGluZ0RhdGFGcm9tU291bHMiLCJzdWJtaXNzaW9uT25seSIsImlkczEiLCJpZHMyIiwidGhpbmdTY29yZXMiLCJ2b3RlcyIsInByb21pc2VzIiwiQXV0aG9yUGFnZXMiLCJ3aWtpUGFnZUlkIiwiY3JlYXRlZEF0IiwibmFiIiwiUXVlcnkiLCJkZWZpbml0aW9ucyIsInNlYSIsIkFVVEhfU0NIRU1BIiwibWluTGVuZ3RoIiwibWF4TGVuZ3RoIiwiVG9waWNEYXkiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicGF0dGVybiIsInByb3BlcnRpZXMiLCIkcmVmIiwieWVhciIsIm1pbmltdW0iLCJtYXhpbXVtIiwibW9udGgiLCJkYXkiLCJyZXF1aXJlZCIsInByb3BzRnJvbVNvdWwiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImVkZ2VNYXRjaGVzS2V5IiwiYW55T2YiLCJUb3BpYyIsIlVSTCIsImFsbE9mIiwidGhpbmdLaW5kIiwib3JpZ2luYWxIYXNoIiwib25lT2YiLCJ0aGluZ1JlbGF0ZWRFZGdlIiwiYWxsY29tbWVudHMiLCJ2b3Rlc3VwIiwidm90ZXNkb3duIiwicmVwbHlUbyIsInRoaW5nSGFzaE1hdGNoZXNTb3VsIiwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nIiwidGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaCIsImlzTGVnYWN5VGhpbmciLCJQcm9vZk9mV29ya1ZvdGVzIiwiJGFzeW5jIiwia2V5c0FyZVByb29mc09mV29yayIsImFsZ29yaXRobSIsImNvbXBsZXhpdHkiLCJoYXNoTGVuZ3RoIiwidGltZUNvc3QiLCJtZW1vcnlDb3N0IiwicGFyYWxsZWxpc20iLCJUaGluZ1ZvdGVzVXAiLCJUaGluZ1ZvdGVzRG93biIsIlRoaW5nRGF0YSIsInRoaW5nRGF0YUhhc2hNYXRjaGVzU291bCIsInVwIiwiZG93biIsImNvbW1hbmRzIiwiTGlzdGluZ0RhdGEiLCJwYXR0ZXJuUHJvcGVydGllcyIsImRlbGV0ZU5vbk51bWVyaWNLZXlzIiwiZGVsZXRlTWV0YUZvck1pc3NpbmciLCJzb3J0TmFtZSIsImVudW0iLCJUaGluZ0NvbW1lbnRzTGlzdGluZyIsInVzZXJMaXN0aW5nVHlwZSIsIkF1dGhvclJlcGxpZXNMaXN0aW5nIiwiQXV0aG9yUHJvZmlsZUxpc3RpbmciLCJBdXRob3JDb21tZW50cyIsIkF1dGhvclN1Ym1pc3Npb25zIiwiQXV0aG9yVGhpbmdzIiwicm91dGVzIiwiZGVmc1dpdGhSb3V0ZXMiLCJTY2hlbWEiLCJ0YWJ1bGF0b3JRdWVyeSIsInJlcGx5U291bHMiLCJjb21tYW5kTWFwIiwiSlNPTiIsInN0cmluZ2lmeSIsIlRhYnVsYXRvciIsInRvcGljUHJlZml4ZXMiLCJjaGF0bXNnIiwiYmluZCIsImluZGV4IiwicmVjdiIsInRkIiwib2ZmIiwidG9waWNQcmVmaXgiLCJiYXNlVG9waWNOYW1lIiwidG9Mb3dlckNhc2UiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInNldCIsInVybEluZm8iLCJob3N0Iiwic2NoZW1lIiwidXJsTm9kZSIsInB1dCIsImRhdGFTb3VsIiwibWV0YURhdGEiLCJwdWIiLCJ0aGluZ3NTb3VsIiwic3VibWlzc2lvbnNTb3VsIiwiY29tbWVudHNTb3VsIiwicmVqZWN0IiwicGFnZXNTb3VsIiwiY2hhaW4iLCJub25jZSIsInVybFN0ciIsIlRoaW5nRGF0YU5vZGUiLCJkaXNzb2MiLCJkIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImRheU51bSIsImdldFVUQ0RhdGUiLCJUaGluZ1NldCIsInRva2VuTWFwIiwibGluZSIsInRva2VucyIsImNoZWNrIiwia2V5c0luIiwiZ2V0TGFzdFZhbHVlIiwibmV4dCIsInBhaXJzIiwiVG9rZW5pemVyIiwic2NoZW1hIiwibmV3ZXN0IiwiX3NjaGVtYSIsInN1YnN0ciIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXMiLCJzaWduZWRJZCIsImdldElzVGhpbmdSZWxhdGVkRWRnZSIsImFqdiIsIm5vZGVUeXBlTmFtZSIsIl9wU2NoZW1hIiwiX2NQYXRoIiwicGFyZW50RGF0YSIsInByb3BUaGluZ0lkIiwiY29tcGlsZSIsInRoaW5nRGF0YUhhc2hNYXRjaGVzIiwicmVjb3JkIiwiaXNWb3RlVmFsaWQiLCJhcmdvbjIiLCJCdWZmZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImZyb20iLCJzYWx0IiwiaGFzaCIsInJhdyIsIm1hc2siLCJyZXF1aXJlIiwicFNjaGVtYSIsImNQYXRoIiwia2V5SW5QYXJlbnQiLCJtZXRhS2V5cyIsImRpZmZlcmVuY2UiLCJvbWl0IiwiaW5pdEFqdiIsImFkZEtleXdvcmQiLCJ2YWxpZGF0ZSIsIm1vZGlmeWluZyIsInN1cHByZXNzb3IiLCJyZW1vdmVBZGRpdGlvbmFsIiwiY29udGV4dCIsIndpcmVJbnB1dCIsIm1zZyIsInByb21pc2UiLCJ2YWxpZGF0ZWQiLCJ0byIsImNhdGNoIiwiZXJyb3IiLCJzdGFjayIsIlZhbGlkYXRpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFDQTs7OztBQUVBLE1BQU1BLE1BQU0sR0FBR0MsQ0FBQyxDQUFD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TyxDQUFDd2UsS0FBUixDQUFjLGNBQWQsRUFBOEJMLEdBQTlCLEVBQW1DcnRCLEdBQUcsQ0FBQzJ0QixLQUFKLElBQWEzdEIsR0FBaEQsQ0FOaEI7QUFPRCxDQWpCRCxDQURtQixDQUFyQjtBQXFCTyxNQUFNNHRCLFVBQVUsR0FBRztBQUN4QnZJLGVBRHdCO0FBRXhCSCxzQkFGd0I7QUFHeEIrRix3QkFId0I7QUFJeEI3Riw4QkFKd0I7QUFLeEIrRix1QkFMd0I7QUFNeEJRLHNCQU53QjtBQU94QkUsYUFQd0I7QUFReEJyRyxxQkFSd0I7QUFTeEJxSCxTQVR3QjtBQVV4QkksWUFWd0I7QUFXeEJuTztBQVh3QixDQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzUFA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBQ2UsV0FBS1YsSTs7Ozs7Ozs7Ozs7O0FDYnBCLG9EOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG9EIiwiZmlsZSI6Im5vdGFidWctcGVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJub3RhYnVnLXBlZXJcIiwgW1wiYXJnb24yXCIsIFwiZ3VuLXNjb3BlXCIsIFwiZ3VuLXN1cHByZXNzb3JcIiwgXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIsIFwib2JqZWN0LWhhc2hcIiwgXCJyYW1kYVwiLCBcInJvdXRlLXBhcnNlclwiLCBcInVyaS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcmdvbjJcIl0sIHJvb3RbXCJndW4tc2NvcGVcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3NvclwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yLXNlYXJcIl0sIHJvb3RbXCJvYmplY3QtaGFzaFwiXSwgcm9vdFtcInJhbWRhXCJdLCByb290W1wicm91dGUtcGFyc2VyXCJdLCByb290W1widXJpLWpzXCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5cbmNvbnN0IHNpZ251cCA9IFIuY3VycnkoXG4gIChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQsIG9wdHMgPSB7fSkgPT5cbiAgICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgdXNlci5jcmVhdGUoXG4gICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgYWNrID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjay5lcnIpIHtcbiAgICAgICAgICAgICAgICBmYWlsKGFjay5lcnIpO1xuICAgICAgICAgICAgICAgIHVzZXIubGVhdmUoKTtcbiAgICAgICAgICAgICAgICBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWVyLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkudGhlbihvayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgICAgfVxuICAgIH0pXG4pO1xuXG5jb25zdCBsb2dpbiA9IFIuY3VycnkoKHBlZXIsIHVzZXJuYW1lLCBwYXNzd29yZCkgPT5cbiAgbmV3IFByb21pc2UoKG9rLCBmYWlsKSA9PiB7XG4gICAgaWYgKHBlZXIgJiYgcGVlci5ndW4gJiYgcGVlci5ndW4udXNlcikge1xuICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgdXNlci5hdXRoKHVzZXJuYW1lLCBwYXNzd29yZCwgYWNrID0+XG4gICAgICAgIGFjay5lcnIgPyBmYWlsKGFjay5lcnIpIDogb2socGVlci5ndW4udXNlcigpLmlzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgIH1cbiAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgIHBlZXIuX29uTG9naW4gJiYgcGVlci5fb25Mb2dpbihyZXN1bHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IGxvZ291dCA9IHBlZXIgPT4gcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG5jb25zdCBpc0xvZ2dlZEluID0gcGVlciA9PiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyICYmIHBlZXIuZ3VuLnVzZXIoKS5pcztcbmNvbnN0IG9uTG9naW4gPSBSLmN1cnJ5KChwZWVyLCBmbikgPT4gKHBlZXIuX29uTG9naW4gPSBmbikpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbmV4cG9ydCBjb25zdCBBdXRoZW50aWNhdGlvbiA9IHtcbiAgc2lnbnVwLFxuICBsb2dpbixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBvbkxvZ2luXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCB0b2tlbml6ZSA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIiBcIiksXG4gIFIucmVwbGFjZShDb25zdGFudHMuQ09NTUFORF9SRSwgXCJcIiksXG4gIFIucHJvcE9yKFwiXCIsIDApLFxuICBSLnNwbGl0KFwiXFxuXCIpXG4pO1xuXG5jb25zdCBtYXAgPSB0aGluZ0RhdGEgPT5cbiAgUi5yZWR1Y2UoXG4gICAgKGNtZE1hcCwgaWQpID0+IHtcbiAgICAgIGNvbnN0IGJvZHkgPSBSLnBhdGgoW2lkLCBcImJvZHlcIl0sIHRoaW5nRGF0YSk7XG4gICAgICBjb25zdCBhdXRob3JJZCA9IFIucGF0aChbaWQsIFwiYXV0aG9ySWRcIl0sIHRoaW5nRGF0YSkgfHwgXCJhbm9uXCI7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBwYXJzZUZsb2F0KFIucGF0aChbaWQsIFwidGltZXN0YW1wXCJdLCB0aGluZ0RhdGEpKTtcblxuICAgICAgaWYgKCFSLnRlc3QoQ29uc3RhbnRzLkNPTU1BTkRfUkUsIGJvZHkpKSByZXR1cm4gY21kTWFwO1xuICAgICAgY29uc3QgdG9rZW5pemVkID0gW2F1dGhvcklkLCAuLi50b2tlbml6ZShib2R5KSwgaWRdO1xuXG4gICAgICByZXR1cm4gUi5hc3NvY1BhdGgodG9rZW5pemVkLCB0aW1lc3RhbXAgfHwgMCwgY21kTWFwKTtcbiAgICB9LFxuICAgIHt9LFxuICAgIFIua2V5cyh0aGluZ0RhdGEpXG4gICk7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50Q29tbWFuZCA9IHsgdG9rZW5pemUsIG1hcCB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgQ29uZmlnID0ge1xuICB0YWJ1bGF0b3I6IENvbnN0YW50cy5JTkRFWEVSLFxuICBpbmRleGVyOiBDb25zdGFudHMuSU5ERVhFUixcbiAgb3duZXI6IENvbnN0YW50cy5JTkRFWEVSLFxuICB1cGRhdGU6IFIuY29tcG9zZShcbiAgICBSLm1hcCgoW2tleSwgdmFsXSkgPT4gKENvbmZpZ1trZXldID0gdmFsKSksXG4gICAgUi50b1BhaXJzXG4gIClcbn07XG4iLCJjb25zdCBDT01NQU5EX1JFID0gL14gezR9fi87XG5jb25zdCBQUkVGSVggPSBcIm5hYlwiO1xuY29uc3QgU09VTF9ERUxJTUVURVIgPSBcInx+fnxcIjtcblxuY29uc3QgTElTVElOR19TSVpFID0gMTAwMDtcblxuY29uc3QgTUFYX0hBU0hfU0laRSA9IDY0O1xuY29uc3QgTUFYX1BPV19OT05DRV9TSVpFID0gNjQ7XG5jb25zdCBNQVhfVE9QSUNfU0laRSA9IDQyO1xuY29uc3QgTUFYX0FVVEhPUl9BTElBU19TSVpFID0gMjU2O1xuY29uc3QgTUFYX0FVVEhPUl9JRF9TSVpFID0gMTI4OyAvLyA/Pz9cbmNvbnN0IE1BWF9VUkxfU0laRSA9IDIwNDg7XG5jb25zdCBNQVhfRE9NQUlOX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfVEhJTkdfS0lORF9TSVpFID0gMTY7XG5jb25zdCBNQVhfVEhJTkdfVElUTEVfU0laRSA9IDMwMDtcbmNvbnN0IE1BWF9USElOR19CT0RZX1NJWkUgPSA1MDAwMDtcblxuY29uc3QgTUFYX0xJU1RJTkdfSURTX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFID0gNTAwMDA7XG5jb25zdCBNQVhfTElTVElOR19UQUJTX1NJWkUgPSA1MDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSA9IE1BWF9BVVRIT1JfSURfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFID0gMTY7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX1RZUEVfU0laRSA9IE1BWF9UT1BJQ19TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUgPSAxNjtcblxuY29uc3QgQ0hBVF9QUkVMT0FEX0lURU1TID0gMTA7XG5cbmNvbnN0IElOREVYRVIgPVxuICBcIkNFeUtyRGQxeHlQWHBXU1YwME1ndm5aWTJWSkxIWGd6Q3ZoTWVEd0tUWUEueWpTcTBEeVh6emhCX1pYcl9EemZKZ2lqM3RYVTAtM3QwUTViSkF0WnBqOFwiO1xuXG5leHBvcnQgY29uc3QgQ29uc3RhbnRzID0ge1xuICBDT01NQU5EX1JFLFxuICBQUkVGSVgsXG4gIFNPVUxfREVMSU1FVEVSLFxuICBMSVNUSU5HX1NJWkUsXG4gIE1BWF9IQVNIX1NJWkUsXG4gIE1BWF9QT1dfTk9OQ0VfU0laRSxcbiAgTUFYX1RPUElDX1NJWkUsXG4gIE1BWF9BVVRIT1JfQUxJQVNfU0laRSxcbiAgTUFYX0FVVEhPUl9JRF9TSVpFLFxuICBNQVhfVVJMX1NJWkUsXG4gIE1BWF9ET01BSU5fU0laRSxcbiAgTUFYX1RISU5HX0tJTkRfU0laRSxcbiAgTUFYX1RISU5HX1RJVExFX1NJWkUsXG4gIE1BWF9USElOR19CT0RZX1NJWkUsXG4gIE1BWF9MSVNUSU5HX0lEU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VSQ0VfU0laRSxcbiAgTUFYX0xJU1RJTkdfVEFCU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSxcbiAgQ0hBVF9QUkVMT0FEX0lURU1TLFxuICBJTkRFWEVSXG59O1xuIiwiLyogZ2xvYmFscyBHdW4gKi9cbmltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHNvdWwgPSBSLnBhdGhPcihcIlwiLCBbXCJfXCIsIFwiI1wiXSk7XG5jb25zdCBzdGF0ZSA9IFIucGF0aE9yKHt9LCBbXCJfXCIsIFwiPlwiXSk7XG5cbmNvbnN0IGxhdGVzdCA9IFIuY29tcG9zZShcbiAgUi5sYXN0LFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi52YWx1ZXMsXG4gIHN0YXRlXG4pO1xuXG5jb25zdCBlZGdlcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFwiI1wiKSksXG4gIFIudmFsdWVzXG4pO1xuXG5mdW5jdGlvbiBkZWNvZGVTRUEocmF3RGF0YSkge1xuICBjb25zdCBkYXRhID0gcmF3RGF0YSA/IHsgLi4ucmF3RGF0YSB9IDogcmF3RGF0YTtcbiAgY29uc3Qgc291bCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKCFzb3VsIHx8ICFHdW4uU0VBIHx8IHNvdWwuaW5kZXhPZihcIn5cIikgPT09IC0xKSByZXR1cm4gcmF3RGF0YTtcbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIEd1bi5TRUEudmVyaWZ5KFxuICAgICAgR3VuLlNFQS5vcHQucGFjayhyYXdEYXRhW2tleV0sIGtleSwgcmF3RGF0YSwgc291bCksXG4gICAgICBmYWxzZSxcbiAgICAgIHJlcyA9PiAoZGF0YVtrZXldID0gR3VuLlNFQS5vcHQudW5wYWNrKHJlcywga2V5LCByYXdEYXRhKSlcbiAgICApO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgR3VuTm9kZSA9IHsgc291bCwgc3RhdGUsIGxhdGVzdCwgZWRnZXMsIGRlY29kZVNFQSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UsIHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IG5lZWRzU2NvcmVzID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwic29ydCBob3RcIixcbiAgICBcInNvcnQgdG9wXCIsXG4gICAgXCJzb3J0IGJlc3RcIixcbiAgICBcInNvcnQgY29udHJvdmVyc2lhbFwiLFxuICAgIFwidXBzXCIsXG4gICAgXCJkb3duc1wiLFxuICAgIFwic2NvcmVcIixcbiAgICBcImNhbiByZW1vdmVcIlxuICBdKTtcblxuY29uc3QgbmVlZHNEYXRhID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwidG9waWNcIixcbiAgICBcImRvbWFpblwiLFxuICAgIFwiYXV0aG9yXCIsXG4gICAgXCJ1bmlxdWUgYnkgY29udGVudFwiLFxuICAgIFwia2luZFwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwicmVxdWlyZSBzaWduZWRcIixcbiAgICBcInJlcXVpcmUgYW5vblwiLFxuICAgIFwiYWxpYXNcIixcbiAgICBcImJhbiBkb21haW5cIixcbiAgICBcImJhbiB0b3BpY1wiLFxuICAgIFwiYmFuIGF1dGhvclwiLFxuICAgIFwiYmFuIGFsaWFzXCJcbiAgXSk7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSA9PlxuICBQcm9taXNlLmFsbChcbiAgICBSLm1hcChzb3VsID0+IExpc3RpbmdTb3J0Lml0ZW1Gcm9tU291bChzY29wZSwgc291bCwgZGVmaW5pdGlvbiksIHNvdWxzKVxuICApLnRoZW4oTGlzdGluZ1NvcnQuc29ydEl0ZW1zKVxuKTtcblxuY29uc3QgaXRlbXNGcm9tVGhpbmdTZXRzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgLnRoZW4oUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSkpXG4gICAgLnRoZW4oVGhpbmdTZXQuc291bHMpXG4gICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKVxuKTtcblxuY29uc3QgbGlzdGluZ1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBsaXN0aW5ncyA9IFIucGF0aE9yKFtdLCBbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJsaXN0aW5nc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAobCA9PiBgJHtsfS8ke3NvcnR9YCwgbGlzdGluZ3MpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocyB9O1xufTtcblxuY29uc3QgdG9waWNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCB0b3BpY3MgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidG9waWNzXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIXRvcGljcy5sZW5ndGgpIHRvcGljcy5wdXNoKFwiYWxsXCIpO1xuICAvLyBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcCh0ID0+IGAvdC8ke3R9LyR7c29ydH1gLCB0b3BpY3MpO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC90LyR7dG9waWNzLnNvcnQoKS5qb2luKFwiK1wiKX0vJHtzb3J0fWBdO1xuXG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVRvcGljKHNjb3BlLCB7IHRvcGljcywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGRvbWFpblNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGRvbWFpbnMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiZG9tYWluc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFkb21haW5zLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICAvLyBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChkID0+IGAvZG9tYWluLyR7ZH0vJHtzb3J0fWAsIGRvbWFpbnMpO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC9kb21haW4vJHtkb21haW5zLnNvcnQoKS5qb2luKFwiK1wiKX0vJHtzb3J0fWBdO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlEb21haW4oc2NvcGUsIHsgZG9tYWlucywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGF1dGhvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGF1dGhvcklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJhdXRob3JzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIWF1dGhvcklkcy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9LyR7dHlwZX0vJHtzb3J0fWAsIGF1dGhvcklkcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aUF1dGhvcihzY29wZSwgeyB0eXBlLCBhdXRob3JJZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBjdXJhdG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgY3VyYXRvcnMgPSBSLnByb3AoXCJjdXJhdG9yc1wiLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWN1cmF0b3JzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vY29tbWVudGVkLyR7c29ydH1gLCBjdXJhdG9ycyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5jdXJhdGVkKHNjb3BlLCBjdXJhdG9ycywgdHJ1ZSlcbiAgICAgIC50aGVuKGlkcyA9PiBpZHMubWFwKHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKSlcbiAgICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgb3BTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBzdWJtaXNzaW9uSWRzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcIm9wc1wiXSwgZGVmaW5pdGlvbik7XG5cbiAgaWYgKCFzdWJtaXNzaW9uSWRzLmxlbmd0aCkgdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKFxuICAgIGlkID0+IGAvdGhpbmdzLyR7aWR9L2NvbW1lbnRzLyR7c29ydH1gLFxuICAgIHN1Ym1pc3Npb25JZHNcbiAgKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpU3VibWlzc2lvbihzY29wZSwgeyBzdWJtaXNzaW9uSWRzIH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgcmVwbGllc1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGlkID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInJlcGxpZXNUb1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHR5cGUgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidHlwZVwiXSwgZGVmaW5pdGlvbik7XG5cbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvdXNlci8ke2lkfS9yZXBsaWVzLyR7dHlwZX0vJHtzb3J0fWBdO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkucmVwbGllc1RvQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlLFxuICAgICAgcmVwbGllc1RvQXV0aG9ySWQ6IGlkLFxuICAgICAgaW5kZXhlcjogZGVmaW5pdGlvbi5pbmRleGVyXG4gICAgfSkudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHNvdXJjZXMgPSB7XG4gIGxpc3Rpbmc6IGxpc3RpbmdTb3VyY2UsXG4gIHJlcGxpZXM6IHJlcGxpZXNTb3VyY2UsXG4gIG9wOiBvcFNvdXJjZSxcbiAgY3VyYXRvcjogY3VyYXRvclNvdXJjZSxcbiAgYXV0aG9yOiBhdXRob3JTb3VyY2UsXG4gIGRvbWFpbjogZG9tYWluU291cmNlLFxuICB0b3BpYzogdG9waWNTb3VyY2Vcbn07XG5cbmNvbnN0IHNvdXJjZU5hbWVzID0gUi5rZXlzKHNvdXJjZXMpO1xuY29uc3Qgc291cmNlTmFtZSA9IGRlZiA9PiBSLmZpbmQoZGVmLmlzUHJlc2VudCwgc291cmNlTmFtZXMpIHx8IFwidG9waWNcIjtcbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IG5hbWUgPSBzb3VyY2VOYW1lKGRlZmluaXRpb24pO1xuXG4gIHJldHVybiBSLm1lcmdlTGVmdCh7IG5hbWUgfSwgc291cmNlc1tuYW1lXShkZWZpbml0aW9uKSk7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RhdGFTb3VyY2UgPSB7XG4gIGZyb21EZWZpbml0aW9uLFxuICBzb3VyY2VzLFxuICBuZWVkc1Njb3JlcyxcbiAgbmVlZHNEYXRhLFxuICBpdGVtc0Zyb21UaGluZ1NldHMsXG4gIGl0ZW1zRnJvbVRoaW5nU291bHNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuXG5jb25zdCBmcm9tU291cmNlID0gKHNvdXJjZSwgb3duZXJJZCA9IG51bGwsIHNwYWNlTmFtZSA9IG51bGwpID0+IHtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG4gIGNvbnN0IG9iaiA9IHsgLi4udG9rZW5pemVkIH07XG4gIGNvbnN0IHsgaXNQcmVzZW50LCBnZXRWYWx1ZSwgZ2V0VmFsdWVzLCBnZXRWYWx1ZUNoYWluLCBnZXRQYWlycyB9ID0gdG9rZW5pemVkO1xuXG4gIFtcbiAgICBvYmouZnJvbVBhZ2VBdXRob3IgPSBvd25lcklkLFxuICAgIG9iai5mcm9tUGFnZU5hbWUgPSBzcGFjZU5hbWUgPyBgc3BhY2U6JHtzcGFjZU5hbWV9YCA6IHVuZGVmaW5lZFxuICBdID0gZ2V0VmFsdWVDaGFpbihcInNvdXJjZWQgZnJvbSBwYWdlXCIpO1xuICBvYmouZGlzcGxheU5hbWUgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJuYW1lXCIpIHx8IHNwYWNlTmFtZTtcbiAgb2JqLmluZGV4ZXIgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBDb25maWcuaW5kZXhlcjtcbiAgb2JqLnRhYnVsYXRvciA9IGdldFZhbHVlKFwidGFidWxhdG9yXCIpIHx8IG9iai5pbmRleGVyO1xuICBvYmoudGFicyA9IGdldFBhaXJzKFwidGFiXCIpO1xuICBvYmouc29ydCA9IGdldFZhbHVlKFwic29ydFwiKTtcblxuICAvLyBUT0RPOiBicmVha3Mgd2l0aCBjdXN0b20gbmFtZXNcbiAgaWYgKG9iai5zb3J0ID09PSBcImRlZmF1bHRcIikgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInRhYlwiKTtcblxuICBvYmoudW5pcXVlQnlDb250ZW50ID0gISFpc1ByZXNlbnQoXCJ1bmlxdWUgYnkgY29udGVudFwiKTtcbiAgb2JqLmN1cmF0b3JzID0gZ2V0VmFsdWVzKFwiY3VyYXRvclwiKTtcbiAgb2JqLm1vZGVyYXRvcnMgPSBnZXRWYWx1ZXMoXCJtb2RcIik7XG4gIG9iai5pbmNsdWRlUmFua3MgPSAhIWlzUHJlc2VudChcInNob3cgcmFua3NcIik7XG4gIG9iai5zdGlja3lJZHMgPSBnZXRWYWx1ZXMoXCJzdGlja3lcIik7XG4gIG9iai5pc0lkU3RpY2t5ID0gaWQgPT4gISF0b2tlbml6ZWQuaXNQcmVzZW50KFtcInN0aWNreVwiLCBpZF0pO1xuICBvYmouaXNDaGF0ID0gISFpc1ByZXNlbnQoXCJkaXNwbGF5IGFzIGNoYXRcIik7XG4gIG9iai5zdWJtaXRUb3BpY3MgPSBnZXRWYWx1ZXMoXCJzdWJtaXQgdG9cIik7XG4gIG9iai5zdWJtaXRUb3BpYyA9IGdldFZhbHVlKFwic3VibWl0IHRvXCIpO1xuICBvYmouY2hhdFRvcGljID0gZ2V0VmFsdWUoXCJjaGF0IGluXCIpO1xuXG4gIGlmIChvd25lcklkICYmIHNwYWNlTmFtZSkge1xuICAgIG9iai5zcGFjZU5hbWUgPSBzcGFjZU5hbWU7XG4gICAgb2JqLm93bmVyID0gb3duZXJJZDtcbiAgICBvYmoudXNlRm9yQ29tbWVudHMgPSAhdG9rZW5pemVkLmlzUHJlc2VudChcImNvbW1lbnRzIGxlYXZlIHNwYWNlXCIpO1xuICAgIG9iai5iYXNlUGF0aCA9IGAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke3NwYWNlTmFtZX1gO1xuICAgIGlmIChvYmouc3VibWl0VG9waWMpIG9iai5zdWJtaXRQYXRoID0gYCR7b2JqLmJhc2VQYXRofS9zdWJtaXRgO1xuICAgIG9iai5kZWZhdWx0VGFiID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpO1xuICAgIG9iai5kZWZhdWx0VGFiUGF0aCA9IG9iai5kZWZhdWx0VGFiXG4gICAgICA/IHRva2VuaXplZC5nZXRWYWx1ZShbXCJ0YWJcIiwgb2JqLmRlZmF1bHRUYWJdKVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgb2JqLmZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICBhbGxvdzoge1xuICAgICAgcmVwbGllc1RvOiBnZXRWYWx1ZShcInJlcGxpZXMgdG8gYXV0aG9yXCIpLFxuICAgICAgdHlwZTogZ2V0VmFsdWUoXCJ0eXBlXCIpLCAvLyBUT0RPOiB0aGlzIGZpZWxkIHNlZW1zIHJlZHVuZGFudCB3aXRoIGtpbmQgYW5kIHNob3VsZCBiZSBkZXByZWNhdGVkXG4gICAgICBvcHM6IGdldFZhbHVlcyhcIm9wXCIpLFxuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcInRvcGljXCIpLFxuICAgICAgbGlzdGluZ3M6IGdldFZhbHVlcyhcImxpc3RpbmdcIiksXG4gICAgICBraW5kczogZ2V0VmFsdWVzKFwia2luZFwiKSxcbiAgICAgIGFub246ICFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKVxuICAgIH0sXG4gICAgZGVueToge1xuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYmFuIGFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYmFuIGF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImJhbiBkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcImJhbiB0b3BpY1wiKSxcbiAgICAgIGFub246ICEhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICEhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpLFxuICAgICAgdGFnczogZ2V0UGFpcnMoXCJjYW4gcmVtb3ZlXCIpXG4gICAgfVxuICB9O1xuXG4gIG9iai52b3RlRmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIHVwc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHVwc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWluOiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNaW46IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGJlbG93XCIpLCAxMCkgfHwgbnVsbFxuICB9O1xuXG4gIG9iai5jZW5zb3JzID0gUi51bmlxKFIubWFwKFIucHJvcCgxKSwgb2JqLmZpbHRlcnMuZGVueS50YWdzKSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RlZmluaXRpb24gPSB7IGZyb21Tb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuXG5jb25zdCBpbnRQYXRoID0gcCA9PlxuICBSLmNvbXBvc2UoXG4gICAgcGFyc2VJbnQsXG4gICAgUi5wYXRoKHApXG4gICk7XG5cbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgZmlsdGVycywgdm90ZUZpbHRlcnMsIGlzUHJlc2VudCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0gW107XG4gIGNvbnN0IHZvdGVGaWx0ZXJGdW5jdGlvbnMgPSBbXTtcblxuICBjb25zdCBhZGRGaWx0ZXIgPSAoLi4uZm5zKSA9PiBmaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG4gIGNvbnN0IGFkZFZvdGVGaWx0ZXIgPSAoLi4uZm5zKSA9PiB2b3RlRmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImFsaWFzXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYXV0aG9yXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0ID0+ICEhaXNQcmVzZW50KFtcImRvbWFpblwiLCB0XSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpbixcbiAgICAgIFIucHJvcChcImRhdGFcIilcbiAgICApO1xuXG4gIGlmIChcbiAgICBmaWx0ZXJzLmFsbG93LnRvcGljcy5sZW5ndGggJiZcbiAgICAhUi5maW5kKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLmlkZW50aWNhbChcImFsbFwiKSxcbiAgICAgICAgUi5sYXN0LFxuICAgICAgICBSLnNwbGl0KFwiOlwiKVxuICAgICAgKSxcbiAgICAgIGZpbHRlcnMuYWxsb3cudG9waWNzXG4gICAgKVxuICApXG4gICAgYWRkRmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgbGV0IHRvcGljID0gUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSwgaXRlbSk7XG4gICAgICBjb25zdCBraW5kID0gUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdLCBpdGVtKTtcblxuICAgICAgaWYgKGtpbmQgPT09IFwiY2hhdG1zZ1wiKSB0b3BpYyA9IGBjaGF0OiR7dG9waWN9YDtcbiAgICAgIGlmIChraW5kID09PSBcImNvbW1lbnRcIikgdG9waWMgPSBgY29tbWVudHM6JHt0b3BpY31gO1xuICAgICAgcmV0dXJuICEhaXNQcmVzZW50KFtcInRvcGljXCIsIHRvcGljXSk7XG4gICAgfSk7XG5cbiAgaWYgKGZpbHRlcnMuYWxsb3cua2luZHMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihraW5kID0+ICEhaXNQcmVzZW50KFtcImtpbmRcIiwga2luZF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImtpbmRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cudHlwZSA9PT0gXCJjb21tYW5kc1wiKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi50ZXN0KENvbnN0YW50cy5DT01NQU5EX1JFKSxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJib2R5XCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS5hbGlhc2VzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhbGlhcyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImFsaWFzXCIsIGFsaWFzXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvclwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmF1dGhvcnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGF1dGhvcklkID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYXV0aG9yXCIsIGF1dGhvcklkXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuZG9tYWlucy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgZG9tYWluID0+ICFkb21haW4gfHwgIWlzUHJlc2VudChbXCJiYW5cIiwgXCJkb21haW5cIiwgZG9tYWluXSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpblxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkudG9waWNzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0b3BpYyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcInRvcGljXCIsIHRvcGljXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcInRvcGljXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYW5vbikgYWRkRmlsdGVyKFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5zaWduZWQpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBhdXRob3JJZCA9PiAhYXV0aG9ySWQsXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAodm90ZUZpbHRlcnMudXBzTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMudXBzTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy51cHNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy51cHNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuZG93bnNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5kb3duc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnNjb3JlTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnNjb3JlTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS50YWdzLmxlbmd0aClcbiAgICBhZGRWb3RlRmlsdGVyKHRoaW5nID0+IHtcbiAgICAgIGNvbnN0IGNtZHMgPSBSLnBhdGgoW1widm90ZXNcIiwgXCJjb21tYW5kc1wiXSwgdGhpbmcpIHx8IHt9O1xuXG4gICAgICByZXR1cm4gIWZpbHRlcnMuZGVueS50YWdzLmZpbmQoXG4gICAgICAgIChbdGFnTmFtZSwgYXV0aG9ySWRdKSA9PiAhIVIucGF0aChbYXV0aG9ySWQsIFwidGFnXCIsIHRhZ05hbWVdLCBjbWRzKVxuICAgICAgKTtcbiAgICB9KTtcblxuICBjb25zdCBjb250ZW50RmlsdGVyID0gdGhpbmcgPT4gIWZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB2b3RlRmlsdGVyID0gdGhpbmcgPT4gIXZvdGVGaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3QgdGhpbmdGaWx0ZXIgPSB0aGluZyA9PlxuICAgIGRlZmluaXRpb24uaXNJZFN0aWNreShSLnByb3AoXCJpZFwiLCB0aGluZykpIHx8XG4gICAgKGNvbnRlbnRGaWx0ZXIodGhpbmcpICYmIHZvdGVGaWx0ZXIodGhpbmcpKTtcblxuICByZXR1cm4geyB0aGluZ0ZpbHRlciwgY29udGVudEZpbHRlciwgdm90ZUZpbHRlciB9O1xufTtcblxuY29uc3QgZ2V0RmlsdGVyZWRSb3dzID0gYXN5bmMgKFxuICBzY29wZSxcbiAgc3BlYyxcbiAgc29ydGVkUm93cyxcbiAgeyBsaW1pdDogbGltaXRQcm9wID0gMjUsIGNvdW50OiBjb3VudFByb3AgPSAwLCBhZnRlciA9IG51bGwsIGZpbHRlckZuIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQobGltaXRQcm9wLCAxMCk7XG4gIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoY291bnRQcm9wLCAxMCkgfHwgMDtcbiAgY29uc3Qgcm93cyA9IHNvcnRlZFJvd3Muc2xpY2UoKTtcbiAgY29uc3QgZmlsdGVyZWQgPSBbXTtcbiAgY29uc3QgZGF0YSA9IFtdO1xuICBjb25zdCBmZXRjaEJhdGNoID0gKHNpemUgPSAzMCkgPT5cbiAgICBQcm9taXNlLmFsbChcbiAgICAgIFIubWFwKGFzeW5jIHJvdyA9PiB7XG4gICAgICAgIGxldCBpbkxpc3RpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmICghcm93W0xpc3RpbmdOb2RlLlBPU19JRF0pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImJsYW5rUm93XCIsIHJvdyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlckZuKSBpbkxpc3RpbmcgPSBhd2FpdCBmaWx0ZXJGbihyb3dbTGlzdGluZ05vZGUuUE9TX0lEXSk7XG4gICAgICAgIGlmIChpbkxpc3RpbmcpIHtcbiAgICAgICAgICBpZiAoc3BlYy51bmlxdWVCeUNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EYXRhID0gYXdhaXQgUXVlcnkudGhpbmdEYXRhKFxuICAgICAgICAgICAgICBzY29wZSxcbiAgICAgICAgICAgICAgcm93W0xpc3RpbmdOb2RlLlBPU19JRF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBUaGluZ0RhdGFOb2RlLnVybChpdGVtRGF0YSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdXJsICYmXG4gICAgICAgICAgICAgIFIuZmluZChcbiAgICAgICAgICAgICAgICBSLmNvbXBvc2UoXG4gICAgICAgICAgICAgICAgICBSLmVxdWFscyh1cmwpLFxuICAgICAgICAgICAgICAgICAgVGhpbmdEYXRhTm9kZS51cmxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkYXRhLnB1c2goaXRlbURhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaWx0ZXJlZC5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgIH0sIHJvd3Muc3BsaWNlKGNvdW50LCBzaXplKSlcbiAgICApO1xuXG4gIHdoaWxlIChyb3dzLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgYXdhaXQgZmV0Y2hCYXRjaCgpO1xuICAgIGlmIChsaW1pdCAmJiBmaWx0ZXJlZC5sZW5ndGggPj0gbGltaXQpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIFIuY29tcG9zZShcbiAgICBsaW1pdCA/IFIuc2xpY2UoMCwgbGltaXQpIDogUi5pZGVudGl0eSxcbiAgICBSLnNvcnRCeShSLnByb3AoTGlzdGluZ05vZGUuUE9TX1ZBTCkpXG4gICkoZmlsdGVyZWQpO1xufTtcblxuY29uc3QgZ2V0RmlsdGVyZWRJZHMgPSBSLmNvbXBvc2UoXG4gIHggPT4geC50aGVuKFIubWFwKFIucHJvcChMaXN0aW5nTm9kZS5QT1NfSUQpKSksXG4gIGdldEZpbHRlcmVkUm93c1xuKTtcblxuY29uc3QgdGhpbmdGaWx0ZXIgPSBSLmN1cnJ5KChzY29wZSwgc3BlYywgdGhpbmdJZCkgPT5cbiAgUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSxcbiAgICBzY29yZXM6IExpc3RpbmdEYXRhU291cmNlLm5lZWRzU2NvcmVzKHNwZWMpLFxuICAgIGRhdGE6IExpc3RpbmdEYXRhU291cmNlLm5lZWRzRGF0YShzcGVjKVxuICB9KS50aGVuKHNwZWMudGhpbmdGaWx0ZXIpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0ZpbHRlciA9IHtcbiAgZnJvbURlZmluaXRpb24sXG4gIGdldEZpbHRlcmVkUm93cyxcbiAgZ2V0RmlsdGVyZWRJZHMsXG4gIHRoaW5nRmlsdGVyXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuXG5jb25zdCBbUE9TX0lEWCwgUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxLCAyLCAzXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuY29uc3Qgcm93c1RvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgcm93c1RvSXRlbXMgPSBSLm1hcChSLnNsaWNlKDEsIDMpKTtcbmNvbnN0IHNvdXJjZSA9IFIucHJvcE9yKFwiXCIsIFwic291cmNlXCIpO1xuY29uc3Qgc291bEZyb21QYXRoID0gUi5jdXJyeShcbiAgKGluZGV4ZXIsIHBhdGgpID0+IGAke0NvbnN0YW50cy5QUkVGSVh9JHtwYXRofUB+JHtpbmRleGVyfS5gXG4pO1xuY29uc3QgcGF0aEZyb21Tb3VsID0gUi5jb21wb3NlKFxuICBSLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7Q29uc3RhbnRzLlBSRUZJWH1gKSwgXCJcIiksXG4gIFIucmVwbGFjZSgvQH4uKlxcLi8sIFwiXCIpXG4pO1xuXG5jb25zdCBpZFRvU291bCA9IHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pO1xuY29uc3QgaWRzVG9Tb3VscyA9IFIubWFwKGlkVG9Tb3VsKTtcbmNvbnN0IHNvdWxUb0lkID0gc291bCA9PiBSLnByb3AoXCJ0aGluZ0lkXCIsIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChzb3VsKSk7XG5jb25zdCBzb3Vsc1RvSWRzID0gUi5tYXAoc291bFRvSWQpO1xuXG5jb25zdCBnZXRSb3cgPSBSLmN1cnJ5KChub2RlLCBpZHgpID0+XG4gIFIuY29tcG9zZShcbiAgICBSLmlmRWxzZShSLnByb3AoXCJsZW5ndGhcIiksIFIuaW5zZXJ0KDAsIHBhcnNlSW50KGlkeCwgMTApKSwgUi5hbHdheXMobnVsbCkpLFxuICAgIHJvdyA9PiB7XG4gICAgICByb3dbMV0gPSBwYXJzZUZsb2F0KHJvd1sxXSk7XG4gICAgICByZXR1cm4gcm93O1xuICAgIH0sXG4gICAgUi5tYXAoUi50cmltKSxcbiAgICBSLnNwbGl0KFwiLFwiKSxcbiAgICBSLnByb3BPcihcIlwiLCBgJHtpZHh9YClcbiAgKShub2RlKVxuKTtcblxuY29uc3QgaXRlbUtleXMgPSBSLmNvbXBvc2UoXG4gIFIuZmlsdGVyKFxuICAgIFIuY29tcG9zZShcbiAgICAgIHZhbCA9PiAhISh2YWwgPT09IDAgfHwgdmFsKSxcbiAgICAgIHBhcnNlSW50XG4gICAgKVxuICApLFxuICBSLmtleXNcbik7XG5cbmNvbnN0IHNlcmlhbGl6ZSA9IFIuY3VycnkoKHNwZWMsIGl0ZW1zKSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5hZGRJbmRleChSLnJlZHVjZSkoXG4gICAgICAocmVzLCByb3csIGlkeCkgPT4gUi5hc3NvYyhgJHtpZHh9YCwgcm93LmpvaW4oXCIsXCIpLCByZXMpLFxuICAgICAge31cbiAgICApLFxuICAgIFIuZGVmYXVsdFRvKFtdKVxuICApKGl0ZW1zKVxuKTtcblxuY29uc3Qgcm93cyA9IG5vZGUgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIubWFwKGdldFJvdyhub2RlKSksXG4gICAgaXRlbUtleXNcbiAgKShub2RlKTtcblxuY29uc3QgaWRzID0gUi5jb21wb3NlKFxuICByb3dzVG9JZHMsXG4gIHJvd3Ncbik7XG5cbmNvbnN0IHNvcnRSb3dzID0gUi5zb3J0V2l0aChbXG4gIFIuYXNjZW5kKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIuY29uZChbW1IuaXNOaWwsIFIuYWx3YXlzKEluZmluaXR5KV0sIFtSLlQsIHBhcnNlRmxvYXRdXSksXG4gICAgICBSLnByb3AoUE9TX1ZBTClcbiAgICApXG4gIClcbl0pO1xuXG5jb25zdCBzb3J0ZWRJZHMgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIucHJvcChQT1NfSUQpKSxcbiAgc29ydFJvd3MsXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICByb3dzXG4pO1xuXG5jb25zdCBpdGVtc1RvUm93cyA9IFIuYWRkSW5kZXgoUi5tYXApKChpdGVtLCBpZHgpID0+IFtpZHgsIC4uLml0ZW1dKTtcblxuY29uc3QgZGlmZiA9IGFzeW5jIChcbiAgbm9kZSxcbiAgdXBkYXRlZEl0ZW1zID0gW10sXG4gIHJlbW92ZUlkcyA9IFtdLFxuICB7IG1heFNpemUgPSAxMDAwIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IHJlbW92ZWQgPSBSLmluZGV4QnkoUi5pZGVudGl0eSwgcmVtb3ZlSWRzKTtcbiAgY29uc3QgYnlJZCA9IHt9O1xuICBjb25zdCBjaGFuZ2VzID0ge307XG4gIGNvbnN0IHJvd3MgPSBbXTtcbiAgY29uc3QgdXBkYXRlZCA9IHt9O1xuICBsZXQgdG9SZXBsYWNlID0gW107XG4gIGxldCBtYXhJZHggPSAwO1xuICBsZXQga2V5O1xuXG4gIGZvciAoa2V5IGluIG5vZGUgfHwge30pIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChrZXksIDEwKTtcblxuICAgIGlmICghKHBhcnNlZCB8fCBwYXJzZWQgPT09IDApKSBjb250aW51ZTtcbiAgICBjb25zdCByb3cgPSBnZXRSb3cobm9kZSwga2V5KSB8fCBbcGFyc2VkLCBudWxsLCBudWxsXTtcbiAgICBjb25zdCBbaWR4LCBpZCA9IG51bGwsIHJhd1ZhbHVlID0gbnVsbF0gPSByb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIHJvd1tQT1NfVkFMXSA9IHJhd1ZhbHVlID09PSBudWxsID8gbnVsbCA6IHBhcnNlRmxvYXQocmF3VmFsdWUpO1xuICAgIGlmIChpZCAmJiByZW1vdmVkW2lkXSkgcm93W1BPU19JRF0gPSByb3dbUE9TX1ZBTF0gPSBudWxsO1xuICAgIGlmIChpZCkgYnlJZFtpZF0gPSByb3c7XG4gICAgaWYgKHJvd1tQT1NfSURdKSB7XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9SZXBsYWNlLnB1c2gocm93KTtcbiAgICB9XG4gICAgaWYgKGlkeCA+IG1heElkeCkgbWF4SWR4ID0gaWR4O1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBbaWQsIHZhbHVlXSA9IHVwZGF0ZWRJdGVtc1tpXSB8fCBbbnVsbCwgbnVsbF07XG5cbiAgICBpZiAoIWlkKSBjb250aW51ZTtcbiAgICBjb25zdCBleGlzdGluZyA9IGJ5SWRbaWRdO1xuXG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICBpZiAoZXhpc3RpbmdbUE9TX1ZBTF0gIT09IHZhbHVlKSB7XG4gICAgICAgIGV4aXN0aW5nW1BPU19WQUxdID0gdmFsdWU7XG4gICAgICAgIHVwZGF0ZWRbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgcm93ID0gW251bGwsIGlkLCB2YWx1ZV07XG5cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFsbFNvcnRlZCA9IHNvcnRSb3dzKHJvd3MpO1xuICBjb25zdCBzb3J0ZWQgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKDAsIG1heFNpemUpIDogYWxsU29ydGVkO1xuICBjb25zdCBtaXNzaW5nID0gbWF4U2l6ZSA/IGFsbFNvcnRlZC5zbGljZShtYXhTaXplLCBhbGxTb3J0ZWQubGVuZ3RoKSA6IFtdO1xuICBjb25zdCBhZGRlZCA9IFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gPT09IG51bGwsIHNvcnRlZCk7XG5cbiAgdG9SZXBsYWNlID0gdG9SZXBsYWNlXG4gICAgLmNvbmNhdChSLmZpbHRlcihyb3cgPT4gcm93W1BPU19JRFhdICE9PSBudWxsLCBtaXNzaW5nKSlcbiAgICAucmV2ZXJzZSgpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaWQgPSBzb3J0ZWRbaV1bUE9TX0lEXTtcbiAgICBjb25zdCBpZHggPSBzb3J0ZWRbaV1bUE9TX0lEWF07XG4gICAgY29uc3QgdmFsID0gc29ydGVkW2ldW1BPU19WQUxdO1xuXG4gICAgaWYgKGlkeCAhPT0gbnVsbCAmJiB1cGRhdGVkW2lkXSkgY2hhbmdlc1tgJHtpZHh9YF0gPSBbaWQsIHZhbF0uam9pbihcIixcIik7XG4gIH1cblxuICBjb25zdCBpbnNlcnRlZCA9IFtdO1xuXG4gIHdoaWxlIChhZGRlZC5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSBhZGRlZC5wb3AoKTtcbiAgICBjb25zdCByZXBsYWNlZCA9IHRvUmVwbGFjZS5wb3AoKTtcbiAgICBsZXQgW2lkeF0gPSByZXBsYWNlZCB8fCBbbnVsbF07XG5cbiAgICBpZiAoaWR4ID09PSBudWxsKSB7XG4gICAgICBpZHggPSBwYXJzZUludChtYXhJZHgsIDEwKSArIGluc2VydGVkLmxlbmd0aCArIDE7XG4gICAgICBpbnNlcnRlZC5wdXNoKGlkeCk7XG4gICAgfVxuXG4gICAgY2hhbmdlc1tgJHtpZHh9YF0gPSBbcm93W1BPU19JRF0sIHJvd1tQT1NfVkFMXV0uam9pbihcIixcIik7XG4gIH1cblxuICB3aGlsZSAodG9SZXBsYWNlLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IHRvUmVwbGFjZS5wb3AoKTtcblxuICAgIGlmIChyb3cgJiYgIXJvd1tQT1NfSURdKSB7XG4gICAgICBjb25zdCBpZHggPSBgJHtyb3dbUE9TX0lEWF19YDtcblxuICAgICAgaWYgKG5vZGVbaWR4XSAhPT0gbnVsbCkge1xuICAgICAgICBjaGFuZ2VzW2lkeF0gPSBudWxsO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm51bGxpbmdcIiwgaWR4LCBub2RlW2lkeF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBSLmtleXMoY2hhbmdlcykubGVuZ3RoID8gY2hhbmdlcyA6IG51bGw7XG59O1xuXG5jb25zdCBjYXRlZ29yaXplRGlmZiA9IChkaWZmLCBvcmlnaW5hbCkgPT4ge1xuICBjb25zdCBhbGxLZXlzID0gaXRlbUtleXMoUi5tZXJnZUxlZnQoZGlmZiwgb3JpZ2luYWwpKTtcbiAgY29uc3QgYWRkZWQgPSBbXTtcbiAgY29uc3QgcmVtb3ZlZCA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGFsbEtleXNbaV07XG4gICAgY29uc3QgW19kaWZmSWR4LCBkaWZmSWRdID0gZ2V0Um93KGRpZmYsIGtleSkgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBjb25zdCBbX29yaWdJZHgsIG9yaWdJZF0gPSBnZXRSb3cob3JpZ2luYWwsIGtleSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIGlmIChkaWZmSWQgIT09IG9yaWdJZCkge1xuICAgICAgaWYgKGRpZmZJZCkgYWRkZWQucHVzaChkaWZmSWQpO1xuICAgICAgaWYgKG9yaWdJZCkgcmVtb3ZlZC5wdXNoKG9yaWdJZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFthZGRlZCwgcmVtb3ZlZF07XG59O1xuXG5jb25zdCB1bmlvblJvd3MgPSBSLmNvbXBvc2UoXG4gIFIudW5pcUJ5KFIucHJvcChQT1NfSUQpKSxcbiAgc29ydFJvd3MsXG4gIFIucmVkdWNlKFIuY29uY2F0LCBbXSksXG4gIFIubWFwKHJvd3MpXG4pO1xuXG5jb25zdCByb3dzRnJvbVNvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscykgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpLnRoZW4odW5pb25Sb3dzKVxuKTtcblxuY29uc3QgcmVhZCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT4ge1xuICBjb25zdCB7IGluZGV4ZXIgPSBDb25maWcuaW5kZXhlciB9ID0gb3B0cyB8fCB7fTtcblxuICByZXR1cm4gcm93c0Zyb21Tb3VscyhzY29wZSwgW3NvdWxGcm9tUGF0aChpbmRleGVyLCBwYXRoKV0pLnRoZW4ocm93c1RvSWRzKTtcbn0sIFwibGlzdGluZ1Jvd3NcIik7XG5cbmNvbnN0IGdldCA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IChzb3VsID8gc2NvcGUuZ2V0KHNvdWwpIDogcmVzb2x2ZShudWxsKSksXG4gIFwibGlzdGluZ1wiXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ05vZGUgPSB7XG4gIFBPU19JRFgsXG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc291cmNlLFxuICBnZXQsXG4gIGdldFJvdyxcbiAgaXRlbUtleXMsXG4gIHNlcmlhbGl6ZSxcbiAgcm93cyxcbiAgaWRzLFxuICBpZFRvU291bCxcbiAgaWRzVG9Tb3VscyxcbiAgc291bFRvSWQsXG4gIHNvdWxzVG9JZHMsXG4gIHJvd3NUb0lkcyxcbiAgcm93c1RvSXRlbXMsXG4gIGl0ZW1zVG9Sb3dzLFxuICBzb3J0Um93cyxcbiAgc29ydGVkSWRzLFxuICBzb3VsRnJvbVBhdGgsXG4gIHBhdGhGcm9tU291bCxcbiAgcm93c0Zyb21Tb3VscyxcbiAgcmVhZCxcbiAgZGlmZixcbiAgY2F0ZWdvcml6ZURpZmYsXG4gIHVuaW9uUm93c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IHVwZGF0ZUxpc3RpbmcgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHNjb3BlLFxuICBzcGVjLFxuICBpZHMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW11cbikgPT4ge1xuICBpZiAoIWlkcy5sZW5ndGggJiYgIXJlbW92ZUlkcy5sZW5ndGgpIHJldHVybjtcbiAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IGF3YWl0IExpc3RpbmdTb3J0LnRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYyk7XG4gIGNvbnN0IGNoYW5nZXMgPSBhd2FpdCBMaXN0aW5nTm9kZS5kaWZmKGV4aXN0aW5nLCB1cGRhdGVkSXRlbXMsIHJlbW92ZUlkcyk7XG5cbiAgaWYgKGNoYW5nZXMpIGNvbnNvbGUubG9nKFwiQ0hBTkdFU1wiLCByb3V0ZS5zb3VsLCBjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXMpIHJvdXRlLndyaXRlKGNoYW5nZXMpO1xufTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyBzb3VsLCB1cGRhdGVkU291bCwgZGlmZiwgLi4ucHJvcHMgfSkgPT4ge1xuICBsZXQgdXBkYXRlZElkcyA9IFtdO1xuXG4gIGNvbnN0IHBhdGggPSBMaXN0aW5nTm9kZS5wYXRoRnJvbVNvdWwoc291bCk7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgpO1xuXG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGlzU3RpY2t5ID0gUi5lcXVhbHMocm91dGUubWF0Y2gudGhpbmdJZCB8fCBudWxsKTtcblxuICBpZiAodGhpbmdJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICB1cGRhdGVkSWRzID0gUi5jb25jYXQodXBkYXRlZElkcywgVGhpbmdTZXQuaWRzKEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpKSk7XG5cbiAgYXdhaXQgdXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10sIGlzU3RpY2t5KTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdPcmFjbGUgPSB7XG4gIHVwZGF0ZUxpc3RpbmcsXG4gIG9uUHV0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuY29uc3QgY2FsY3VsYXRlUm93cyA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHN0aWNreUl0ZW1zID0gUi5tYXAoaWQgPT4gW2lkLCAtSW5maW5pdHldLCBzcGVjLnN0aWNreUlkcyk7XG5cbiAgaWYgKCFzcGVjLmRhdGFTb3VyY2UucXVlcnkpIHJldHVybiByZXNvbHZlKFtdKTtcbiAgcmV0dXJuIHNwZWMuZGF0YVNvdXJjZS5xdWVyeShzY29wZSkudGhlbihpdGVtcyA9PiB7XG4gICAgY29uc3Qgcm93cyA9IExpc3RpbmdOb2RlLml0ZW1zVG9Sb3dzKFsuLi5zdGlja3lJdGVtcywgLi4uaXRlbXNdKTtcblxuICAgIHJldHVybiBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkUm93cyhzY29wZSwgc3BlYywgcm93cywge1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGZpbHRlckZuXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IGNhbGN1bGF0ZSA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7fSk7XG5cbmNvbnN0IHRvTm9kZSA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cykgPT5cbiAgY2FsY3VsYXRlUm93cyhzY29wZSwgc3BlYywgb3B0cykudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBMaXN0aW5nTm9kZS5zZXJpYWxpemUoc3BlYyksXG4gICAgICBMaXN0aW5nTm9kZS5yb3dzVG9JdGVtc1xuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVhZCA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHBhdGhzID0gUi5wYXRoT3IoW10sIFtcImRhdGFTb3VyY2VcIiwgXCJsaXN0aW5nUGF0aHNcIl0sIHNwZWMpO1xuICBjb25zdCBzdGlja3lSb3dzID0gUi5tYXAoaWQgPT4gWy0xLCBpZCwgLUluZmluaXR5XSwgc3BlYy5zdGlja3lJZHMpO1xuICBjb25zdCBzb3VscyA9IFIubWFwKFxuICAgIExpc3RpbmdOb2RlLnNvdWxGcm9tUGF0aChvcHRzLmluZGV4ZXIgfHwgc3BlYy5pbmRleGVyKSxcbiAgICBwYXRoc1xuICApO1xuXG4gIHJldHVybiBMaXN0aW5nTm9kZS5yb3dzRnJvbVNvdWxzKHNjb3BlLCBzb3VscykudGhlbihyb3dzID0+XG4gICAgTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZElkcyhzY29wZSwgc3BlYywgWy4uLnN0aWNreVJvd3MsIC4uLnJvd3NdLCB7XG4gICAgICAuLi5vcHRzLFxuICAgICAgZmlsdGVyRm5cbiAgICB9KVxuICApO1xufSk7XG5cbmNvbnN0IGZyb21TcGVjID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+XG4gIChvcHRzLmNhbGN1bGF0ZSA/IGNhbGN1bGF0ZSA6IHJlYWQpKHNjb3BlLCBzcGVjLCBvcHRzKVxuKTtcblxuY29uc3QgZnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgdHlwZSA9IExpc3RpbmdUeXBlLmZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oc3BlYyA9PiB7XG4gICAgaWYgKHNwZWMuaGFzSW5kZXhlciAmJiAhb3B0cy5jYWxjdWxhdGUpIHtcbiAgICAgIGlmICghdHlwZSB8fCAhdHlwZS5yZWFkKSByZXR1cm4gTGlzdGluZ05vZGUucmVhZChzY29wZSwgcGF0aCwgb3B0cyk7XG4gICAgICByZXR1cm4gdHlwZS5yZWFkKHNjb3BlLCB0eXBlLm1hdGNoLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyb21TcGVjKHNjb3BlLCBzcGVjLCBvcHRzKTtcbiAgfSk7XG59KTtcblxuY29uc3Qgbm9kZUZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PlxuICBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgpLnRoZW4oc3BlYyA9PlxuICAgIHRvTm9kZShzY29wZSwgc3BlYywgUi5tZXJnZUxlZnQob3B0cywgeyBsaW1pdDogQ29uc3RhbnRzLkxJU1RJTkdfU0laRSB9KSlcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdRdWVyeSA9IHtcbiAgZnJvbVNwZWMsXG4gIGZyb21QYXRoLFxuICBjYWxjdWxhdGVSb3dzLFxuICB0b05vZGUsXG4gIG5vZGVGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgYWxsLCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5cbmNvbnN0IFtQT1NfSUQsIFBPU19WQUxdID0gWzAsIDFdO1xuY29uc3QgdG9JZHMgPSBSLm1hcChSLnByb3AoUE9TX0lEKSk7XG5jb25zdCBzb3J0SXRlbXMgPSBSLnNvcnRCeShSLnByb3AoUE9TX1ZBTCkpO1xuXG5jb25zdCB2b3RlU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT4ge1xuICBpZiAoc3BlYy5pc0lkU3RpY2t5KHRoaW5nSWQpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuICBpZiAoUi5jb250YWlucyh0aGluZ0lkLCBzcGVjLmZpbHRlcnMuYWxsb3cub3BzKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcblxuICByZXR1cm4gUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICBzY29yZXM6IHRydWUsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihyZXMgPT4gZm4ocmVzLCBzcGVjKSk7XG59KTtcblxuY29uc3QgdGltZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihmbilcbik7XG5cbmNvbnN0IHNvcnRzID0ge1xuICBuZXc6IHRpbWVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubXVsdGlwbHkoLTEpLFxuICAgICAgUi5kZWZhdWx0VG8oMCksXG4gICAgICBSLnByb3AoXCJ0aW1lc3RhbXBcIiksXG4gICAgKVxuICApLFxuICBvbGQ6IHRpbWVTb3J0KFIucHJvcChcInRpbWVzdGFtcFwiKSksXG4gIGFjdGl2ZTogdm90ZVNvcnQoXG4gICAgKHsgdGltZXN0YW1wLCBsYXN0QWN0aXZlIH0pID0+IC0xICogKGxhc3RBY3RpdmUgfHwgdGltZXN0YW1wKVxuICApLFxuICB0b3A6IHZvdGVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIHggPT4gLTEgKiBwYXJzZUludCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKVxuICAgIClcbiAgKSxcbiAgY29tbWVudHM6IHZvdGVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIHggPT4gLTEgKiBwYXJzZUZsb2F0KHgsIDEwKSxcbiAgICAgIFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiY29tbWVudFwiXSlcbiAgICApXG4gICksXG4gIGRpc2N1c3NlZDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IFIucHJvcChcInRpbWVzdGFtcFwiLCB0aGluZyk7XG4gICAgY29uc3Qgc2NvcmUgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lc3RhbXAgLyAxMDAwIC0gMTEzNDAyODAwMztcbiAgICBjb25zdCBvcmRlciA9IE1hdGgubG9nMTAoTWF0aC5tYXgoTWF0aC5hYnMoc2NvcmUpLCAxKSk7XG5cbiAgICBpZiAoIXNjb3JlKSByZXR1cm4gMTAwMDAwMDAwMCAtIHNlY29uZHM7XG4gICAgcmV0dXJuIC0xICogKG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGhvdDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IFIucHJvcChcInRpbWVzdGFtcFwiLCB0aGluZyk7XG4gICAgY29uc3Qgc2NvcmUgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuICAgIGxldCBzaWduID0gMDtcblxuICAgIGlmIChzY29yZSA+IDApIHtcbiAgICAgIHNpZ24gPSAxO1xuICAgIH0gZWxzZSBpZiAoc2NvcmUgPCAwKSB7XG4gICAgICBzaWduID0gLTE7XG4gICAgfVxuICAgIHJldHVybiAtMSAqIChzaWduICogb3JkZXIgKyBzZWNvbmRzIC8gNDUwMDApO1xuICB9KSxcbiAgYmVzdDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHVwcyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwidXBcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IGRvd25zID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJkb3duXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBuID0gdXBzICsgZG93bnM7XG5cbiAgICBpZiAobiA9PT0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgeiA9IDEuMjgxNTUxNTY1NTQ1OyAvLyA4MCUgY29uZmlkZW5jZVxuICAgIGNvbnN0IHAgPSB1cHMgLyBuO1xuICAgIGNvbnN0IGxlZnQgPSBwICsgKDEgLyAoMiAqIG4pKSAqIHogKiB6O1xuICAgIGNvbnN0IHJpZ2h0ID0geiAqIE1hdGguc3FydCgocCAqICgxIC0gcCkpIC8gbiArICh6ICogeikgLyAoNCAqIG4gKiBuKSk7XG4gICAgY29uc3QgdW5kZXIgPSAxICsgKDEgLyBuKSAqIHogKiB6O1xuXG4gICAgcmV0dXJuIC0xICogKChsZWZ0IC0gcmlnaHQpIC8gdW5kZXIpO1xuICB9KSxcbiAgY29udHJvdmVyc2lhbDogdm90ZVNvcnQodGhpbmcgPT4ge1xuICAgIGNvbnN0IHVwcyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwidXBcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IGRvd25zID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJkb3duXCJdLCB0aGluZyksIDEwKTtcblxuICAgIGlmICh1cHMgPD0gMCB8fCBkb3ducyA8PSAwKSByZXR1cm4gMDtcbiAgICBjb25zdCBtYWduaXR1ZGUgPSB1cHMgKyBkb3ducztcbiAgICBjb25zdCBiYWxhbmNlID0gdXBzID4gZG93bnMgPyBkb3ducyAvIHVwcyA6IHVwcyAvIGRvd25zO1xuXG4gICAgcmV0dXJuIC0xICogbWFnbml0dWRlICoqIGJhbGFuY2U7XG4gIH0pXG59O1xuXG5jb25zdCBpc1ZhbGlkU29ydCA9IHNvcnQgPT4gISFzb3J0c1tzb3J0XTtcblxuY29uc3QgdG9JdGVtID0gcXVlcnkoXG4gIChzY29wZSwgaWQsIHNwZWMpID0+XG4gICAgKHNvcnRzW3NwZWMuc29ydF0gfHwgc29ydHMubmV3KShzY29wZSwgaWQsIHNwZWMpLnRoZW4odmFsID0+IFtpZCwgdmFsXSlcbik7XG5cbmNvbnN0IGl0ZW1Gcm9tU291bCA9IChzY29wZSwgc291bCwgc3BlYykgPT4gdG9JdGVtKHNjb3BlLCBMaXN0aW5nTm9kZS5zb3VsVG9JZChzb3VsKSwgc3BlYyk7XG5cbmNvbnN0IHRvSXRlbXMgPSBxdWVyeShcbiAgKHNjb3BlLCBpZHMsIHNwZWMpID0+IGFsbChSLm1hcChcbiAgICBpZCA9PiB0b0l0ZW0oc2NvcGUsIGlkLCBzcGVjKSxcbiAgICBpZHNcbiAgKSlcbik7XG5cbmNvbnN0IGZyb21UaGluZ1NldHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3Vscywgc3BlYykgPT5cbiAgICBhbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgICAudGhlbihSLnBpcGUoXG4gICAgICAgIFRoaW5nU2V0LnVuaW9uLFxuICAgICAgICBUaGluZ1NldC5pZHMsXG4gICAgICAgIGlkcyA9PiB0b0l0ZW1zKHNjb3BlLCBpZHMsIHNwZWMpXG4gICAgICApKVxuICAgICAgLnRoZW4oc29ydEl0ZW1zKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTb3J0ID0ge1xuICBQT1NfSUQsXG4gIFBPU19WQUwsXG4gIHNvcnRzLFxuICBpc1ZhbGlkU29ydCxcbiAgdG9JdGVtLFxuICB0b0l0ZW1zLFxuICB0b0lkcyxcbiAgaXRlbUZyb21Tb3VsLFxuICBzb3J0SXRlbXMsXG4gIGZyb21UaGluZ1NldHNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ0RlZmluaXRpb24gfSBmcm9tIFwiLi9MaXN0aW5nRGVmaW5pdGlvblwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IFIuY29tcG9zZShcbiAgUi5hcHBseShSLm1lcmdlTGVmdCksXG4gIFIuYXAoW0xpc3RpbmdGaWx0ZXIuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgUi5hcHBseShSLmFzc29jKFwiZGF0YVNvdXJjZVwiKSksXG4gIFIuYXAoW0xpc3RpbmdEYXRhU291cmNlLmZyb21EZWZpbml0aW9uLCBSLmlkZW50aXR5XSksXG4gIFIub2YsXG4gIExpc3RpbmdEZWZpbml0aW9uLmZyb21Tb3VyY2Vcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhID0gXCJcIikgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lKVxuICAgIC50aGVuKFIuY29tcG9zZShcbiAgICAgIGJvZHkgPT4gYCR7Ym9keX1cbiMgYWRkZWQgYnkgaW5kZXhlclxuJHtleHRyYSB8fCBcIlwifVxuc291cmNlZCBmcm9tIHBhZ2UgJHthdXRob3JJZH0gJHtuYW1lfVxuYCxcbiAgICAgIFRoaW5nRGF0YU5vZGUuYm9keVxuICAgICkpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1NwZWMgPSB7IGZyb21Tb3VyY2UsIGdldFNvdXJjZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvY2hhdFwiO1xuY29uc3QgdGFicyA9IFsgLi4uVG9waWNMaXN0aW5nLnRhYnMsIFwiY2hhdFwiIF07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y2hhdDpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCBub3JtYWxUb3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpYyA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IG5vcm1hbFRvcGljc1swXSB8fCBcIndoYXRldmVyXCI7XG4gIGNvbnN0IHRvcGljcyA9IG5vcm1hbFRvcGljcy5yZWR1Y2UoXG4gICAgKHJlcywgdG9waWMpID0+IFsuLi5yZXMsIGBjaGF0OiR7dG9waWN9YF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjaGF0XCIsXG4gICAgW1xuICAgICAgXCJzb3J0IG5ld1wiLFxuICAgICAgXCJkaXNwbGF5IGFzIGNoYXRcIixcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDaGF0TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y29tbWVudHM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRoaW5nSWQsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjb21tZW50c1wiLFxuICAgIFtgb3AgJHt0aGluZ0lkfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9jb21tZW50ZWQvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNvbW1lbnRlZDpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjb21tZW50ZWRcIixcbiAgICBbXG4gICAgICBgY3VyYXRvciAke2F1dGhvcklkfWAsXG4gICAgICBgc29ydCAke3NvcnR9YFxuICAgIF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRlZExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIGdldFNpZGViYXIsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcblxuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL2RvbWFpbi86ZG9tYWluLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmRvbWFpbjpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgZG9tYWluLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgZG9tYWlucyA9IFBhdGguc3BsaXRUb3BpY3MoZG9tYWluKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpkb21haW5cIixcbiAgICBbXG4gICAgICBgbmFtZSAke2RvbWFpbnNbMF19YCxcbiAgICAgIFwic3VibWl0IHRvIHdoYXRldmVyXCIsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIFwia2luZCBzdWJtaXNzaW9uXCIsXG4gICAgICAuLi5SLm1hcChkb21haW4gPT4gYGRvbWFpbiAke2RvbWFpbn1gLCBkb21haW5zKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvZG9tYWluLyR7ZG9tYWlufS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRG9tYWluTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgdGFicyxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljL2ZpcmVob3NlXCI7XG5jb25zdCB0YWJzID0gVG9waWNMaXN0aW5nLnRhYnM7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpmaXJlaG9zZTpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCBub3JtYWxUb3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpYyA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IG5vcm1hbFRvcGljc1swXSB8fCBcIndoYXRldmVyXCI7XG4gIGNvbnN0IHRvcGljcyA9IG5vcm1hbFRvcGljcy5yZWR1Y2UoXG4gICAgKHJlcywgdG9waWMpID0+IFsuLi5yZXMsIHRvcGljLCBgY2hhdDoke3RvcGljfWAsIGBjb21tZW50czoke3RvcGljfWBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6ZmlyZWhvc2VcIixcbiAgICBbXG4gICAgICBcInNvcnQgbmV3XCIsXG4gICAgICBcImRpc3BsYXkgYXMgY2hhdFwiLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IEZpcmVob3NlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgdGFicyxcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uLy4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vLi4vVGhpbmdcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4uL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4uL0xpc3RpbmdPcmFjbGVcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL3JlcGxpZXMvOnR5cGUvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnRvcGljOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgdHlwZSwgc29ydCA9IFwibmV3XCIgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzppbmJveFwiLFxuICAgIFtgcmVwbGllcyB0byBhdXRob3IgJHthdXRob3JJZH1gLCBcImtpbmQgY29tbWVudFwiLCBgdHlwZSAke3R5cGV9YCwgYHNvcnQgJHtzb3J0fWBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmNvbnN0IG9uUHV0ID0gYXN5bmMgKG9yYywgcm91dGUsIHsgdXBkYXRlZFNvdWwsIGRpZmYgfSkgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZEF1dGhvcmVkXSA9IExpc3RpbmdOb2RlLmNhdGVnb3JpemVEaWZmKGRpZmZEYXRhKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgbGV0IHVwZGF0ZWRJZHMgPSBUaGluZ1NldC5pZHMoZGlmZkRhdGEpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZEF1dGhvcmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgb3BJZCA9IHVwZGF0ZWRBdXRob3JlZFtpXTtcbiAgICBjb25zdCByZXBseUlkcyA9IFRoaW5nU2V0LmlkcyhcbiAgICAgIGF3YWl0IHNjb3BlXG4gICAgICAgIC5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkpXG4gICAgICAgIC50aGVuKClcbiAgICApO1xuXG4gICAgdXBkYXRlZElkcyA9IHVwZGF0ZWRJZHMuY29uY2F0KHJlcGx5SWRzKTtcbiAgfVxuXG4gIGlmICh1cGRhdGVkSWRzLmxlbmd0aClcbiAgICBhd2FpdCBMaXN0aW5nT3JhY2xlLnVwZGF0ZUxpc3Rpbmcob3JjLCByb3V0ZSwgc2NvcGUsIHNwZWMsIHVwZGF0ZWRJZHMsIFtdKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IEluYm94TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjLFxuICBvblB1dFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvOnR5cGUvOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJvdmVydmlld1wiLCBcImNvbW1lbnRzXCIsIFwic3VibWl0dGVkXCIsIFwiY29tbWFuZHNcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpwcm9maWxlOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnByb2ZpbGVcIixcbiAgICBbXG4gICAgICBgYXV0aG9yICR7YXV0aG9ySWR9YCxcbiAgICAgIGB0eXBlICR7dHlwZX1gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3VzZXIvJHthdXRob3JJZH0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIFF1ZXJ5LnVzZXJNZXRhKHNjb3BlLCBtYXRjaC5hdXRob3JJZCkudGhlbihtZXRhID0+XG4gICAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihSLnBpcGUoXG4gICAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlLFxuICAgICAgUi5tZXJnZUxlZnQoe1xuICAgICAgICBwcm9maWxlSWQ6IG1hdGNoLmF1dGhvcklkLFxuICAgICAgICBkaXNwbGF5TmFtZTogUi5wcm9wT3IoXCJcIiwgXCJhbGlhc1wiLCBtZXRhKVxuICAgICAgfSlcbiAgICApKVxuKSk7XG5cbmV4cG9ydCBjb25zdCBQcm9maWxlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgdGFicyxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuaW1wb3J0IHsgU3BhY2VTcGVjIH0gZnJvbSBcIi4uL1NwYWNlU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvc3BhY2VzLzpuYW1lLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBTcGFjZVNwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgYHNvcnQgJHtzb3J0fWApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFNwYWNlU3BlYy5nZXRTcGVjKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgYHNvcnQgJHtzb3J0fWApXG4pO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgU3BhY2VTcGVjLnNpZGViYXJQYWdlTmFtZShuYW1lKSlcbik7XG5cbmNvbnN0IG9uUHV0ID0gYXN5bmMgKFxuICBvcmMsXG4gIHJvdXRlLFxuICB7IHVwZGF0ZWRTb3VsLCBkaWZmLCBvcmlnaW5hbCwgbGF0ZXN0ID0gMCB9XG4pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcblxuICBjb25zdCBvcmlnaW5hbERhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShvcmlnaW5hbCk7XG4gIGNvbnN0IGRpZmZEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEoZGlmZik7XG4gIGNvbnN0IFt1cGRhdGVkSWRzLCByZW1vdmVkSWRzXSA9IExpc3RpbmdOb2RlLmNhdGVnb3JpemVEaWZmKFxuICAgIGRpZmZEYXRhLFxuICAgIG9yaWdpbmFsRGF0YVxuICApO1xuICBjb25zdCBzcGVjID0gYXdhaXQgZ2V0U3BlYyhzY29wZSwgcm91dGUubWF0Y2gpO1xuICBjb25zdCB2b3RlQ291bnRzTWF0Y2ggPSBTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcbiAgY29uc3QgdGhpbmdNYXRjaCA9IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGF1dGhvck1hdGNoID0gU2NoZW1hLlNFQUF1dGhvci5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG5cbiAgaWYgKHZvdGVDb3VudHNNYXRjaCkgdXBkYXRlZElkcy5wdXNoKHZvdGVDb3VudHNNYXRjaC50aGluZ0lkKTtcbiAgaWYgKHRoaW5nTWF0Y2gpIHVwZGF0ZWRJZHMucHVzaCh0aGluZ01hdGNoLnRoaW5nSWQpO1xuICBpZiAodGhpbmdJZCAmJiB0aGluZ0lkICE9PSBzcGVjLmZyb21QYWdlSWQpIHVwZGF0ZWRJZHMucHVzaCh0aGluZ0lkKTtcbiAgYXdhaXQgTGlzdGluZ09yYWNsZS51cGRhdGVMaXN0aW5nKFxuICAgIG9yYyxcbiAgICByb3V0ZSxcbiAgICBzY29wZSxcbiAgICBzcGVjLFxuICAgIHVwZGF0ZWRJZHMsXG4gICAgcmVtb3ZlZElkc1xuICApO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG4gIGlmIChcbiAgICBSLnByb3AoXCJzaXplXCIsIG9yaWdpbmFsKSB8fFxuICAgIHVwZGF0ZWRJZHMubGVuZ3RoIHx8XG4gICAgcmVtb3ZlZElkcy5sZW5ndGggfHxcbiAgICBhdXRob3JNYXRjaFxuICApXG4gICAgcmV0dXJuO1xuXG4gIC8vIGJhc2UgbG9naWMgZnJvbSBndW4tY2xlcmljLXNjb3BlIG5lZWRzIHRvIGJlIGVuY2Fwc3VhbHRlZCBiZXR0ZXI/XG4gIGNvbnNvbGUubG9nKFwiLS0tU1RBTkRBUkQgU1BBQ0UgVVBEQVRFLS0tXCIsIHJvdXRlLnNvdWwsIHVwZGF0ZWRTb3VsKTtcbiAgY29uc3Qgbm9kZSA9IGF3YWl0IG9yYy5uZXdTY29wZSgpLmdldChyb3V0ZS5zb3VsKTtcbiAgY29uc3QgZXhpc3RpbmdLZXlzID0gTGlzdGluZ05vZGUuaXRlbUtleXMobm9kZSk7XG5cbiAgaWYgKGV4aXN0aW5nS2V5cy5sZW5ndGgpIHtcbiAgICByb3V0ZS53cml0ZSh7XG4gICAgICBzaXplOiAwLFxuICAgICAgLi4uZXhpc3RpbmdLZXlzLnJlZHVjZSgoZGlmZiwga2V5KSA9PiB7XG4gICAgICAgIGRpZmZbYCR7a2V5fWBdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgICB9LCB7fSlcbiAgICB9KTtcbiAgfVxuXG4gIG9yYy53b3JrKHtcbiAgICBpZDogYHVwZGF0ZToke3JvdXRlLnNvdWx9YCxcbiAgICBzb3VsOiByb3V0ZS5zb3VsLFxuICAgIG1ldGhvZDogXCJkb1VwZGF0ZVwiLFxuICAgIHByaW9yaXR5OiByb3V0ZS5wcmlvcml0eSB8fCA1MFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTcGFjZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U3BlYyxcbiAgb25QdXRcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiLCBcImZpcmVob3NlXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6dG9waWM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgdG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWNzWzBdID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogdG9waWNzWzBdO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnRvcGljXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHt0b3BpY31gLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIHRvcGljLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IFwia2luZCBzdWJtaXNzaW9uXCIgOiBcIlwiLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKFxuICAgIFIucGlwZShcbiAgICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2UsXG4gICAgICBSLmFzc29jKFwiYmFzZVBhdGhcIiwgYC90LyR7bWF0Y2gudG9waWN9YClcbiAgICApXG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBUb3BpY0xpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHRhYnMsXG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDaGF0TGlzdGluZyB9IGZyb20gXCIuL0NoYXRMaXN0aW5nXCI7XG5pbXBvcnQgeyBGaXJlaG9zZUxpc3RpbmcgfSBmcm9tIFwiLi9GaXJlaG9zZUxpc3RpbmdcIjtcbmltcG9ydCB7IENvbW1lbnRlZExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50ZWRMaXN0aW5nXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcbmltcG9ydCB7IERvbWFpbkxpc3RpbmcgfSBmcm9tIFwiLi9Eb21haW5MaXN0aW5nXCI7XG5pbXBvcnQgeyBDb21tZW50TGlzdGluZyB9IGZyb20gXCIuL0NvbW1lbnRMaXN0aW5nXCI7XG5pbXBvcnQgeyBTcGFjZUxpc3RpbmcgfSBmcm9tIFwiLi9TcGFjZUxpc3RpbmdcIjtcbmltcG9ydCB7IEluYm94TGlzdGluZyB9IGZyb20gXCIuL0luYm94TGlzdGluZ1wiO1xuaW1wb3J0IHsgUHJvZmlsZUxpc3RpbmcgfSBmcm9tIFwiLi9Qcm9maWxlTGlzdGluZ1wiO1xuXG5jb25zdCB0eXBlcyA9IHtcbiAgQ2hhdExpc3RpbmcsXG4gIEZpcmVob3NlTGlzdGluZyxcbiAgVG9waWNMaXN0aW5nLFxuICBEb21haW5MaXN0aW5nLFxuICBDb21tZW50TGlzdGluZyxcbiAgU3BhY2VMaXN0aW5nLFxuICBJbmJveExpc3RpbmcsXG4gIENvbW1lbnRlZExpc3RpbmcsXG4gIFByb2ZpbGVMaXN0aW5nXG59O1xuXG5jb25zdCB0eXBlc0FycmF5ID0gUi52YWx1ZXModHlwZXMpO1xuXG5jb25zdCBmcm9tUGF0aCA9IHBhdGggPT4ge1xuICBsZXQgbWF0Y2g7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWF0Y2ggPSB0eXBlc0FycmF5W2ldLnJvdXRlLm1hdGNoKHBhdGgpO1xuICAgIGlmIChtYXRjaCkgcmV0dXJuIFIuYXNzb2MoXCJtYXRjaFwiLCBtYXRjaCwgdHlwZXNBcnJheVtpXSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBzaWRlYmFyRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgpID0+IHtcbiAgY29uc3QgdHlwZSA9IGZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSB8fCAhdHlwZS5nZXRTaWRlYmFyKSByZXR1cm4gcmVzb2x2ZShcIlwiKTtcbiAgcmV0dXJuIHR5cGUuZ2V0U2lkZWJhcihzY29wZSwgdHlwZS5tYXRjaCk7XG59KTtcblxuY29uc3Qgc3BlY0Zyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBmcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUpIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgZmluZCB0eXBlIGZvciBwYXRoOiAke3BhdGh9YCk7XG5cbiAgcmV0dXJuIHR5cGUuZ2V0U3BlYyhzY29wZSwgdHlwZS5tYXRjaCkudGhlbihiYXNlU3BlYyA9PiB7XG4gICAgbGV0IHNwZWMgPSBiYXNlU3BlYztcblxuICAgIGlmICh0eXBlLm1hdGNoLnNvcnQgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICBzcGVjID0gUi5hc3NvYyhcInBhdGhcIiwgdHlwZS5yb3V0ZS5yZXZlcnNlKFIuYXNzb2MoXCJzb3J0XCIsIHNwZWMuc29ydCwgdHlwZS5tYXRjaCkpLCBzcGVjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJwYXRoXCIsIHBhdGgsIGJhc2VTcGVjKTtcbiAgICB9XG5cbiAgICBpZiAoc3BlYy5zdWJtaXRUb3BpYyAmJiAhc3BlYy5zdWJtaXRQYXRoKSB7XG4gICAgICBzcGVjID0gUi5hc3NvYyhcInN1Ym1pdFBhdGhcIiwgYC90LyR7c3BlYy5zdWJtaXRUb3BpY30vc3VibWl0YCwgc3BlYyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwZWM7XG4gIH0pO1xufSk7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nVHlwZSA9IHtcbiAgLi4udHlwZXMsXG4gIHR5cGVzLFxuICBmcm9tUGF0aCxcbiAgc2lkZWJhckZyb21QYXRoLFxuICBzcGVjRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IFJvdXRlIGZyb20gXCJyb3V0ZS1wYXJzZXJcIjtcblxuY29uc3Qgc3BsaXREb21haW5zID0gUi5jb21wb3NlKFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFIudHJpbSksXG4gIFIuc3BsaXQoXCIrXCIpLFxuICBSLnRvTG93ZXIsXG4gIFIudHJpbSxcbiAgUi5kZWZhdWx0VG8oXCJcIilcbik7XG5cbmNvbnN0IHNwbGl0VG9waWNzID0gUi5jb21wb3NlKFxuICBSLmlmRWxzZShSLnByb3AoXCJsZW5ndGhcIiksIFIuaWRlbnRpdHksIFIuYWx3YXlzKFtcImFsbFwiXSkpLFxuICBzcGxpdERvbWFpbnNcbik7XG5cbmNvbnN0IHdpdGhSb3V0ZSA9IG9iaiA9PiBSLmFzc29jKFwicm91dGVcIiwgbmV3IFJvdXRlKG9iai5wYXRoKSwgb2JqKTtcblxuZXhwb3J0IGNvbnN0IFBhdGggPSB7IHNwbGl0RG9tYWlucywgc3BsaXRUb3BpY3MsIHdpdGhSb3V0ZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIl07XG5jb25zdCBjb25maWdQYWdlTmFtZSA9IG5hbWUgPT4gYHNwYWNlOiR7bmFtZX1gO1xuY29uc3Qgc2lkZWJhclBhZ2VOYW1lID0gbmFtZSA9PiBgc3BhY2U6JHtuYW1lfTpzaWRlYmFyYDtcblxuY29uc3Qgc291cmNlV2l0aERlZmF1bHRzID0gUi5jdXJyeSgob3duZXJJZCwgbmFtZSwgc291cmNlKSA9PiB7XG4gIGxldCByZXN1bHQgPSBbc291cmNlIHx8IFwiXCJdO1xuICBjb25zdCB0b2tlbml6ZWQgPSBUb2tlbml6ZXIudG9rZW5pemUoc291cmNlKTtcblxuICBpZiAoIXRva2VuaXplZC5nZXRWYWx1ZShcInRhYlwiKSkge1xuICAgIHRhYnMubWFwKHRhYiA9PlxuICAgICAgcmVzdWx0LnB1c2goYHRhYiAke3RhYn0gL3VzZXIvJHtvd25lcklkfS9zcGFjZXMvJHtuYW1lfS8ke3RhYn1gKVxuICAgICk7XG4gIH1cblxuICBsZXQgaW5kZXhlciA9IHRva2VuaXplZC5nZXRWYWx1ZShcImluZGV4ZXJcIik7XG5cbiAgaWYgKCFpbmRleGVyKSB7XG4gICAgcmVzdWx0LnB1c2goYGluZGV4ZXIgJHtDb25maWcuaW5kZXhlcn1gKTtcbiAgICBpbmRleGVyID0gQ29uZmlnLmluZGV4ZXI7XG4gIH1cblxuICBsZXQgdGFidWxhdG9yID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFidWxhdG9yXCIpO1xuXG4gIGlmICghdGFidWxhdG9yKSByZXN1bHQucHVzaChgdGFidWxhdG9yICR7aW5kZXhlcn1gKTtcblxuICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcXG5cIik7XG59KTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIGNvbmZpZ1BhZ2VOYW1lKG5hbWUpLCBleHRyYSkudGhlbihcbiAgICBzb3VyY2VXaXRoRGVmYXVsdHMoYXV0aG9ySWQsIG5hbWUpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpLnRoZW4oc291cmNlID0+XG4gICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShzb3VyY2UsIGF1dGhvcklkLCBuYW1lKVxuICApXG4pO1xuXG5jb25zdCBub2RlVG9TcGFjZU5hbWVzID0gUi5jb21wb3NlKFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi5yZXBsYWNlKC9ec3BhY2U6LywgXCJcIikpLFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLnByb3AoXCJsZW5ndGhcIiksXG4gICAgICBSLm1hdGNoKC9ec3BhY2U6W146XSokLylcbiAgICApXG4gICksXG4gIFIua2V5c1xuKTtcblxuY29uc3QgdXNlclNwYWNlTmFtZXMgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkKSA9PlxuICBRdWVyeS51c2VyUGFnZXMoc2NvcGUsIGF1dGhvcklkKS50aGVuKG5vZGVUb1NwYWNlTmFtZXMpXG4pO1xuXG5leHBvcnQgY29uc3QgU3BhY2VTcGVjID0ge1xuICBjb25maWdQYWdlTmFtZSxcbiAgc2lkZWJhclBhZ2VOYW1lLFxuICBub2RlVG9TcGFjZU5hbWVzLFxuICB1c2VyU3BhY2VOYW1lcyxcbiAgdGFicyxcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59O1xuIiwiaW1wb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmV4cG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmV4cG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmV4cG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5leHBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5leHBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4vTGlzdGluZ09yYWNsZVwiO1xuZXhwb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5leHBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5leHBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5leHBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5leHBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi9TcGFjZVNwZWNcIjtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmcgPSB7XG4gIC4uLkxpc3RpbmdUeXBlLnR5cGVzLFxuICBMaXN0aW5nTm9kZSxcbiAgTGlzdGluZ1NwZWMsXG4gIGlzVmFsaWRTb3J0OiBMaXN0aW5nU29ydC5pc1ZhbGlkU29ydCxcbiAgaWRzVG9Tb3VsczogTGlzdGluZ05vZGUuaWRzVG9Tb3VscyxcbiAgZ2V0OiBMaXN0aW5nTm9kZS5nZXQsXG4gIGZyb21TcGVjOiBMaXN0aW5nUXVlcnkuZnJvbVNwZWMsXG4gIGZyb21QYXRoOiBMaXN0aW5nUXVlcnkuZnJvbVBhdGgsXG4gIHR5cGVGcm9tUGF0aDogTGlzdGluZ1R5cGUuZnJvbVBhdGgsXG4gIHNpZGViYXJGcm9tUGF0aDogTGlzdGluZ1R5cGUuc2lkZWJhckZyb21QYXRoLFxuICBzcGVjRnJvbVBhdGg6IExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aCxcbiAgbm9kZUZyb21QYXRoOiBMaXN0aW5nUXVlcnkubm9kZUZyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nLCBMaXN0aW5nU3BlYywgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nXCI7XG5cbmNvbnN0IHdpa2lQYWdlID0gUi5tZXJnZUxlZnQoe1xuICB3aXRoTWF0Y2g6ICh7IHBhcmFtczogeyBhdXRob3JJZCA9IENvbmZpZy5vd25lciwgbmFtZSB9IH0pID0+ICh7XG4gICAgcHJlbG9hZDogc2NvcGUgPT4gUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lKVxuICB9KVxufSk7XG5cbmNvbnN0IHdpdGhMaXN0aW5nTWF0Y2ggPSAocGF0aCwgcGFyYW1zKSA9PiB7XG4gIGlmICghcGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcmVsb2FkOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKHt9KSkpLFxuICAgICAgc2lkZWJhcjogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShcIlwiKSkpLFxuICAgICAgc3BhY2U6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShcIlwiKSkpKSxcbiAgICAgIGlkczogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShbXSkpKVxuICAgIH07XG4gIH1cblxuICBjb25zdCByZWFsUXVlcnkgPSBxdWVyeShcbiAgICAoc2NvcGUsIG9wdHMgPSB7fSkgPT4gTGlzdGluZy5mcm9tUGF0aChzY29wZSwgcGF0aCwgb3B0cyksXG4gICAgYGlkczoke3BhdGh9YFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgcHJlbG9hZDogc2NvcGUgPT4gcHJlbG9hZExpc3Rpbmcoc2NvcGUsIHBhdGgsIHBhcmFtcyksXG4gICAgc2lkZWJhcjogcXVlcnkoXG4gICAgICBzY29wZSA9PiBMaXN0aW5nLnNpZGViYXJGcm9tUGF0aChzY29wZSwgcGF0aCksXG4gICAgICBgc2lkZWJhcjoke3BhdGh9YFxuICAgICksXG4gICAgc3BhY2U6IHF1ZXJ5KHNjb3BlID0+IExpc3Rpbmcuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoKSksXG4gICAgaWRzOiBxdWVyeSgoc2NvcGUsIG9wdHMgPSB7fSkgPT5cbiAgICAgIHJlYWxRdWVyeShzY29wZSwgUi5tZXJnZUxlZnQob3B0cywgcGFyYW1zKSlcbiAgICApXG4gIH07XG59O1xuXG5jb25zdCBwcmVsb2FkTGlzdGluZyA9IGFzeW5jIChzY29wZSwgcGF0aCwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IG1hdGNoID0gd2l0aExpc3RpbmdNYXRjaChwYXRoLCBwYXJhbXMpO1xuICBsZXQgW3NwZWMsIGlkc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgbWF0Y2guc3BhY2Uoc2NvcGUpLFxuICAgIG1hdGNoLmlkcyhzY29wZSwge30pLFxuICAgIG1hdGNoLnNpZGViYXIoc2NvcGUpXG4gIF0pO1xuXG4gIGlmICghc3BlYykgc3BlYyA9IExpc3RpbmdTcGVjLmZyb21Tb3VyY2UoXCJcIik7XG5cbiAgY29uc3QgdGhpbmdTb3VscyA9IExpc3RpbmcuaWRzVG9Tb3VscyhpZHMpO1xuICBjb25zdCBbdGhpbmdzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBRdWVyeS5tdWx0aVRoaW5nTWV0YShzY29wZSwge1xuICAgICAgdGhpbmdTb3VscyxcbiAgICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IgfHwgQ29uZmlnLnRhYnVsYXRvcixcbiAgICAgIHNjb3JlczogdHJ1ZSxcbiAgICAgIGRhdGE6IHRydWVcbiAgICB9KSxcbiAgICAuLi5SLm1hcChcbiAgICAgIGlkID0+IFF1ZXJ5LnVzZXJNZXRhKHNjb3BlLCBpZCksXG4gICAgICBSLnVuaXEoW3NwZWMgJiYgc3BlYy5pbmRleGVyLCBzcGVjICYmIHNwZWMub3duZXIsIHNwZWMgJiYgc3BlYy50YWJ1bGF0b3JdKVxuICAgIClcbiAgXSk7XG4gIGNvbnN0IG9wSWRzID0gUi5jb21wb3NlKFxuICAgIFIud2l0aG91dChpZHMpLFxuICAgIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICAgIFIudW5pcSxcbiAgICBSLm1hcChSLnBhdGhPcihudWxsLCBbXCJkYXRhXCIsIFwib3BJZFwiXSkpXG4gICkodGhpbmdzKTtcblxuICBpZiAob3BJZHMubGVuZ3RoKSB7XG4gICAgY29uc3Qgb3BTb3VscyA9IExpc3RpbmcuaWRzVG9Tb3VscyhvcElkcyk7XG5cbiAgICBhd2FpdCBRdWVyeS5tdWx0aVRoaW5nTWV0YShzY29wZSwge1xuICAgICAgdGhpbmdTb3Vsczogb3BTb3VscyxcbiAgICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IgfHwgQ29uZmlnLnRhYnVsYXRvcixcbiAgICAgIGRhdGE6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChzcGVjLmNoYXRUb3BpYykge1xuICAgIGNvbnN0IGNoYXRQYXRoID0gYC90LyR7c3BlYy5jaGF0VG9waWN9L2NoYXRgO1xuXG4gICAgaWYgKGNoYXRQYXRoICE9PSBwYXRoKVxuICAgICAgYXdhaXQgcHJlbG9hZExpc3Rpbmcoc2NvcGUsIGAvdC8ke3NwZWMuY2hhdFRvcGljfS9jaGF0YCwge30pO1xuICB9XG5cbiAgcmV0dXJuIHNjb3BlLmdldENhY2hlKCk7XG59O1xuXG5jb25zdCBsaXN0aW5nID0gKHtcbiAgcHJlZml4OiBkZWZhdWx0UHJlZml4ID0gXCJ0XCIsXG4gIGlkZW50aWZpZXI6IGRlZmF1bHRJZGVudGlmaWVyID0gXCJhbGxcIixcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImhvdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIHByZWZpeCA9IGRlZmF1bHRQcmVmaXgsXG4gICAgICBpZGVudGlmaWVyID0gZGVmYXVsdElkZW50aWZpZXIsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+IHdpdGhMaXN0aW5nTWF0Y2goYC8ke3ByZWZpeH0vJHtpZGVudGlmaWVyfS8ke3NvcnR9YCwgcXVlcnkpXG59KTtcblxuY29uc3QgdGhpbmdDb21tZW50cyA9ICh7XG4gIHByZWZpeDogZGVmYXVsdFByZWZpeCA9IFwidFwiLFxuICBpZGVudGlmaWVyOiBkZWZhdWx0SWRlbnRpZmllciA9IFwiYWxsXCIsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJiZXN0XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgb3BJZCxcbiAgICAgIHByZWZpeCA9IGRlZmF1bHRQcmVmaXgsXG4gICAgICBpZGVudGlmaWVyID0gZGVmYXVsdElkZW50aWZpZXIsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLkNvbW1lbnRMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0aGluZ0lkOiBvcElkLFxuICAgICAgICBzb3J0XG4gICAgICB9KSxcbiAgICAgIFIuYXNzb2MoXCJsaW1pdFwiLCAxMDAwLCBxdWVyeSlcbiAgICApXG59KTtcblxuY29uc3Qgc3BhY2VMaXN0aW5nID0gKHtcbiAgbmFtZTogZGVmYXVsdE5hbWUgPSBcImRlZmF1bHRcIixcbiAgYXV0aG9ySWQ6IGRlZmF1bHRBdXRob3JJZCxcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImRlZmF1bHRcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBhdXRob3JJZCA9IGRlZmF1bHRBdXRob3JJZCxcbiAgICAgIG5hbWUgPSBkZWZhdWx0TmFtZSxcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuU3BhY2VMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICBhdXRob3JJZDogYXV0aG9ySWQgfHwgQ29uZmlnLm93bmVyLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzb3J0XG4gICAgICB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmNvbnN0IHNwYWNlVGhpbmdDb21tZW50cyA9ICh7XG4gIG5hbWU6IGRlZmF1bHROYW1lID0gXCJkZWZhdWx0XCIsXG4gIGF1dGhvcklkOiBkZWZhdWx0QXV0aG9ySWQsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJob3RcIixcbiAgLi4ucmVzdFxufSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgb3BJZCxcbiAgICAgIGF1dGhvcklkID0gZGVmYXVsdEF1dGhvcklkLFxuICAgICAgbmFtZSA9IGRlZmF1bHROYW1lLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PiB7XG4gICAgY29uc3Qgc3BhY2VQYXRoID0gTGlzdGluZ1R5cGUuU3BhY2VMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IGF1dGhvcklkIHx8IENvbmZpZy5vd25lcixcbiAgICAgIG5hbWUsXG4gICAgICBzb3J0XG4gICAgfSk7XG4gICAgY29uc3QgbGlzdGluZ1BhdGggPSBMaXN0aW5nVHlwZS5Db21tZW50TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIHRoaW5nSWQ6IG9wSWQsXG4gICAgICBzb3J0XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3BhY2U6IHF1ZXJ5KFxuICAgICAgICBzY29wZSA9PiBMaXN0aW5nLnNwZWNGcm9tUGF0aChzY29wZSwgc3BhY2VQYXRoLCBxdWVyeSksXG4gICAgICAgIGBzcGVjOiR7c3BhY2VQYXRofWBcbiAgICAgICksXG4gICAgICBpZHM6IHF1ZXJ5KFxuICAgICAgICBzY29wZSA9PiBMaXN0aW5nLmZyb21QYXRoKHNjb3BlLCBsaXN0aW5nUGF0aCwgcXVlcnkpLFxuICAgICAgICBsaXN0aW5nUGF0aFxuICAgICAgKSxcbiAgICAgIHByZWxvYWQ6IHNjb3BlID0+IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBsaXN0aW5nUGF0aCwgcXVlcnkpXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb2ZpbGUgPSAoe1xuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwibmV3XCIsXG4gIHR5cGU6IGRlZmF1bHRUeXBlID0gXCJvdmVydmlld1wiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHsgYXV0aG9ySWQsIHR5cGUgPSBkZWZhdWx0VHlwZSwgc29ydCA9IGRlZmF1bHRTb3J0IH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuUHJvZmlsZUxpc3Rpbmcucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pLFxuICAgICAgcXVlcnlcbiAgICApXG59KTtcblxuY29uc3QgaW5ib3ggPSAoe1xuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwibmV3XCIsXG4gIHR5cGU6IGRlZmF1bHRUeXBlID0gXCJvdmVydmlld1wiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBhdXRob3JJZCxcbiAgICBwYXJhbXM6IHsgdHlwZSA9IGRlZmF1bHRUeXBlLCBzb3J0ID0gZGVmYXVsdFNvcnQgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5JbmJveExpc3Rpbmcucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pLFxuICAgICAgcXVlcnlcbiAgICApXG59KTtcblxuZXhwb3J0IGNvbnN0IFBhZ2UgPSB7XG4gIHdpdGhMaXN0aW5nTWF0Y2gsXG4gIHByZWxvYWRMaXN0aW5nLFxuICB3aWtpUGFnZSxcbiAgdGhpbmdDb21tZW50cyxcbiAgbGlzdGluZyxcbiAgc3BhY2VMaXN0aW5nLFxuICBzcGFjZVRoaW5nQ29tbWVudHMsXG4gIHByb2ZpbGUsXG4gIGluYm94XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tIFwiLi9WYWxpZGF0aW9uXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZyB9IGZyb20gXCIuL1RoaW5nXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gXCIuL0F1dGhlbnRpY2F0aW9uXCI7XG5cbmZ1bmN0aW9uIGluaXQoR3VuLCBjb25maWcgPSB7fSkge1xuICBjb25zdCB7IGxlZWNoLCBkaXNhYmxlVmFsaWRhdGlvbiwgbm9HdW4sIGxvY2FsU3RvcmFnZSwgcGVyc2lzdCwgLi4ucmVzdCB9ID1cbiAgICBjb25maWcgfHwge307XG4gIGNvbnN0IHBlZXIgPSB7IGNvbmZpZyB9O1xuXG4gIGlmICghbm9HdW4pIHtcbiAgICBjb25zdCBjZmcgPSB7IGxvY2FsU3RvcmFnZTogISFsb2NhbFN0b3JhZ2UsIHJhZGlzazogISFwZXJzaXN0LCAuLi5yZXN0IH07XG5cbiAgICBpZiAocGVyc2lzdCkgY2ZnLmxvY2FsU3RvcmFnZSA9IGZhbHNlO1xuICAgIGlmICghZGlzYWJsZVZhbGlkYXRpb24pIEd1bi5vbihcIm9wdFwiLCBWYWxpZGF0aW9uLmd1bldpcmVJbnB1dChwZWVyKSk7XG4gICAgaWYgKGNmZy5zdG9yZUZuKSBjZmcuc3RvcmUgPSBjZmcuc3RvcmVGbihjZmcpOyAvLyBmb3IgaW5kZXhlZGRiXG4gICAgcGVlci5ndW4gPSBHdW4oY2ZnKTtcbiAgICBpZiAoY2ZnLmxvY2FsU3RvcmFnZSkgcGVlci5ndW4ub24oXCJsb2NhbFN0b3JhZ2U6ZXJyb3JcIiwgYSA9PiBhLnJldHJ5KHt9KSk7XG4gICAgaWYgKGxlZWNoKSB7XG4gICAgICBjb25zdCBzZW5kTGVlY2ggPSAoKSA9PiBwZWVyLmd1bi5fLm9uKFwib3V0XCIsIHsgbGVlY2g6IHRydWUgfSk7XG5cbiAgICAgIHNlbmRMZWVjaCgpO1xuICAgIH1cbiAgfVxuXG4gIHBlZXIubmV3U2NvcGUgPSBvcHRzID0+IFF1ZXJ5LmNyZWF0ZVNjb3BlKHBlZXIsIG9wdHMpO1xuICBwZWVyLm9uTG9naW4gPSBBdXRoZW50aWNhdGlvbi5vbkxvZ2luKHBlZXIpO1xuICBwZWVyLnNpZ251cCA9IEF1dGhlbnRpY2F0aW9uLnNpZ251cChwZWVyKTtcbiAgcGVlci5sb2dpbiA9IEF1dGhlbnRpY2F0aW9uLmxvZ2luKHBlZXIpO1xuICBwZWVyLmxvZ291dCA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmxvZ291dChwZWVyKTtcbiAgcGVlci5pc0xvZ2dlZEluID0gKCkgPT4gQXV0aGVudGljYXRpb24uaXNMb2dnZWRJbihwZWVyKTtcbiAgcGVlci5zdWJtaXQgPSBUaGluZy5zdWJtaXQocGVlcik7XG4gIHBlZXIuY29tbWVudCA9IFRoaW5nLmNvbW1lbnQocGVlcik7XG4gIHBlZXIuY2hhdCA9IFRoaW5nLmNoYXQocGVlcik7XG4gIHBlZXIud3JpdGVQYWdlID0gVGhpbmcud3JpdGVQYWdlKHBlZXIpO1xuICBwZWVyLnZvdGUgPSBUaGluZy52b3RlKHBlZXIpO1xuICBwZWVyLnF1ZXJpZXMgPSBRdWVyeTtcbiAgcmV0dXJuIHBlZXI7XG59XG5cbmV4cG9ydCBjb25zdCBQZWVyID0ge1xuICBpbml0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHNjb3BlIGFzIG1ha2VTY29wZSwgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZy9MaXN0aW5nTm9kZVwiO1xuXG5jb25zdCBlbXB0eVByb21pc2UgPSByZXNvbHZlKG51bGwpO1xuY29uc3QgdW5pb25BcnJheXMgPSBSLnJlZHVjZShSLnVuaW9uLCBbXSk7XG5cbmNvbnN0IHRvcGljU291bHMgPSBwYXJhbXMgPT4ge1xuICBjb25zdCB7IHRvcGljcyA9IFtcImFsbFwiXSB9ID0gcGFyYW1zIHx8IHt9O1xuICBjb25zdCBkYXlzID0gUi5wcm9wT3IoMzY1LCBcImRheXNcIiwgcGFyYW1zKSB8fCAzNjU7XG4gIGNvbnN0IGRheVN0cmluZ3MgPSBbXTtcbiAgY29uc3Qgb25lRGF5ID0gMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG9uZURheSAqIHBhcnNlSW50KGRheXMsIDEwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBkYXlzICsgMTsgaSsrKVxuICAgIGRheVN0cmluZ3MucHVzaChUaGluZ1NldC5kYXlTdHIoc3RhcnQgKyBpICogb25lRGF5KSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhcbiAgICB0b3BpY3MucmVkdWNlKFxuICAgICAgKHJlc3VsdCwgdG9waWNOYW1lKSA9PlxuICAgICAgICBkYXlTdHJpbmdzLnJlZHVjZSgocmVzLCBkcykgPT4ge1xuICAgICAgICAgIHJlc1tgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvJHt0b3BpY05hbWV9L2RheXMvJHtkc31gXSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSwgcmVzdWx0KSxcbiAgICAgIHt9XG4gICAgKVxuICApO1xufTtcblxuY29uc3Qgc2luZ2xlVG9waWMgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICBjb25zdCB0U291bHMgPSB0b3BpY1NvdWxzKHsgLi4ucGFyYW1zLCB0b3BpY3M6IFtwYXJhbXMudG9waWNdIH0pO1xuICBsZXQgc291bHMgPSBbXTtcbiAgbGV0IGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuXG4gIGlmIChwYXJhbXMuc29ydCA9PT0gXCJuZXdcIikge1xuICAgIGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuICB9IGVsc2Uge1xuICAgIGlmIChwYXJhbXMuc29ydCA9PT0gXCJ0b3BcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICAgIGlmIChwYXJhbXMudG9waWMgPT09IFwiYWxsXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgfVxuXG4gIGNvbnN0IGZldGNoTW9yZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b3BpY1NvdWwgPSB0U291bHMucG9wKCk7XG5cbiAgICBpZiAoc291bHMubGVuZ3RoID4gaXRlbU1heCB8fCAhdG9waWNTb3VsKSByZXR1cm4gcmVzb2x2ZShzb3Vscyk7XG4gICAgcmV0dXJuIHNjb3BlXG4gICAgICAuZ2V0KHRvcGljU291bClcbiAgICAgIC5zb3VscygpXG4gICAgICAudGhlbihtb3JlID0+IHtcbiAgICAgICAgc291bHMgPSBbLi4uc291bHMsIC4uLm1vcmVdO1xuICAgICAgICByZXR1cm4gZmV0Y2hNb3JlKCk7XG4gICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZmV0Y2hNb3JlKCk7XG59KTtcblxuY29uc3Qgc2luZ2xlRG9tYWluID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiB9KSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZTogZG9tYWluIH0pKS5zb3VscygpXG4pO1xuXG5jb25zdCBzaW5nbGVBdXRob3IgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFtcbiAgICBwYXJhbXMudHlwZSAmJiBwYXJhbXMudHlwZSAhPT0gXCJzdWJtaXR0ZWRcIiAmJiBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChgfiR7cGFyYW1zLmF1dGhvcklkfWApXG4gICAgICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAgICAgLnNvdWxzKCksXG4gICAgcGFyYW1zLnR5cGUgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tZW50c1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1hbmRzXCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KGB+JHtwYXJhbXMuYXV0aG9ySWR9YClcbiAgICAgICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgICAgICAuc291bHMoKVxuICBdKS50aGVuKChbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkgPT4gdW5pb25BcnJheXMoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pKVxuKTtcblxuY29uc3QgbGlzdGluZ0lkcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IHNjb3BlLmdldChzb3VsKS50aGVuKExpc3RpbmdOb2RlLnNvcnRlZElkcyksXG4gIFwibGlzdGluZ0lkc1wiXG4pO1xuXG5jb25zdCBzaW5nbGVMaXN0aW5nID0gcXVlcnkoKHNjb3BlLCB7IGxpc3RpbmcsIHNvcnQsIGluZGV4ZXIgfSkgPT5cbiAgbGlzdGluZ0lkcyhzY29wZSwgYCR7Q29uc3RhbnRzLlBSRUZJWH0ke2xpc3Rpbmd9LyR7c29ydH1AfiR7aW5kZXhlcn0uYCkudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSksXG4gICAgICBSLmZpbHRlcihSLmlkZW50aXR5KVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVwbGllc1RvQXV0aG9yID0gcXVlcnkoXG4gIChzY29wZSwgeyByZXBsaWVzVG9BdXRob3JJZCwgdHlwZSA9IFwib3ZlcnZpZXdcIiwgLi4ucGFyYW1zIH0pID0+XG4gICAgc2luZ2xlTGlzdGluZyhzY29wZSwge1xuICAgICAgbGlzdGluZzogYC91c2VyLyR7cmVwbGllc1RvQXV0aG9ySWR9LyR7dHlwZX1gLFxuICAgICAgc29ydDogXCJuZXdcIixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH0pLnRoZW4oYXV0aG9yZWRTb3VscyA9PlxuICAgICAgYWxsKFxuICAgICAgICBhdXRob3JlZFNvdWxzLm1hcChhdXRob3JlZFNvdWwgPT5cbiAgICAgICAgICBzY29wZS5nZXQoYCR7YXV0aG9yZWRTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgICAgICAgKVxuICAgICAgKS50aGVuKHVuaW9uQXJyYXlzKVxuICAgIClcbik7XG5cbmNvbnN0IHNpbmdsZVN1Ym1pc3Npb24gPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgc2NvcGVcbiAgICAuZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSlcbiAgICApXG4gICAgLnNvdWxzKFxuICAgICAgUi5wcmVwZW5kKFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KSlcbiAgICApXG4pO1xuXG5jb25zdCB0aGluZyA9IHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICBzY29wZS5nZXQodGhpbmdTb3VsKS50aGVuKG1ldGEgPT4ge1xuICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcmVzdWx0ID0geyBpZDogbWV0YS5pZCwgdGltZXN0YW1wOiBwYXJzZUZsb2F0KG1ldGEudGltZXN0YW1wLCAxMCkgfTtcbiAgICBjb25zdCByZXBseVRvU291bCA9IFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BTb3VsID0gUi5wYXRoKFtcIm9wXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BJZCA9IG9wU291bCA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChvcFNvdWwpLnRoaW5naWQgOiBudWxsO1xuICAgIGNvbnN0IHJlcGx5VG9JZCA9IHJlcGx5VG9Tb3VsXG4gICAgICA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChyZXBseVRvU291bCkudGhpbmdpZFxuICAgICAgOiBudWxsO1xuXG4gICAgaWYgKG9wSWQpIHJlc3VsdC5vcElkID0gb3BJZDtcbiAgICBpZiAocmVwbHlUb0lkKSByZXN1bHQucmVwbHlUb0lkID0gcmVwbHlUb0lkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pXG4pO1xuXG5jb25zdCBtdWx0aVF1ZXJ5ID0gKHNpbmdsZVF1ZXJ5LCBwbHVyYWwsIHNpbmdsZSwgY29sbGF0ZSA9IHVuaW9uQXJyYXlzKSA9PlxuICBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IGl0ZW1zID0gUi5wcm9wKHBsdXJhbCwgcGFyYW1zKTtcblxuICAgIGlmIChSLmlzTmlsKGl0ZW1zKSkgcmV0dXJuIGVtcHR5UHJvbWlzZTtcbiAgICByZXR1cm4gYWxsKFxuICAgICAgUi5tYXAoXG4gICAgICAgIHZhbCA9PiBzaW5nbGVRdWVyeShzY29wZSwgeyAuLi5wYXJhbXMsIFtzaW5nbGVdOiB2YWwgfSksXG4gICAgICAgIFIucHJvcE9yKFtdLCBwbHVyYWwsIHBhcmFtcylcbiAgICAgIClcbiAgICApLnRoZW4oY29sbGF0ZSk7XG4gIH0pO1xuXG5jb25zdCBtdWx0aVRvcGljID0gbXVsdGlRdWVyeShzaW5nbGVUb3BpYywgXCJ0b3BpY3NcIiwgXCJ0b3BpY1wiKTtcbmNvbnN0IG11bHRpRG9tYWluID0gbXVsdGlRdWVyeShzaW5nbGVEb21haW4sIFwiZG9tYWluc1wiLCBcImRvbWFpblwiKTtcbmNvbnN0IG11bHRpQXV0aG9yID0gbXVsdGlRdWVyeShzaW5nbGVBdXRob3IsIFwiYXV0aG9ySWRzXCIsIFwiYXV0aG9ySWRcIik7XG5jb25zdCBtdWx0aVN1Ym1pc3Npb24gPSBtdWx0aVF1ZXJ5KFxuICBzaW5nbGVTdWJtaXNzaW9uLFxuICBcInN1Ym1pc3Npb25JZHNcIixcbiAgXCJzdWJtaXNzaW9uSWRcIlxuKTtcblxuY29uc3QgdGhpbmdEYXRhRnJvbVNvdWxzID0gUi5jdXJyeSgoc2NvcGUsIHNvdWxzKSA9PlxuICBhbGwoXG4gICAgc291bHNcbiAgICAgIC5maWx0ZXIoeCA9PiAhIXgpXG4gICAgICAubWFwKHNvdWwgPT5cbiAgICAgICAgc2NvcGVcbiAgICAgICAgICAuZ2V0KHNvdWwpXG4gICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAudGhlbih4ID0+IHgpXG4gICAgICApXG4gICkpO1xuXG5jb25zdCBjdXJhdGVkID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZHMsIHN1Ym1pc3Npb25Pbmx5ID0gZmFsc2UpID0+XG4gIGFsbChbXG4gICAgbXVsdGlBdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGU6IFwiY29tbWVudHNcIixcbiAgICAgIGF1dGhvcklkc1xuICAgIH0pXG4gICAgICAudGhlbih0aGluZ0RhdGFGcm9tU291bHMoc2NvcGUpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIFIuY29tcG9zZShcbiAgICAgICAgICBSLm1hcChzdWJtaXNzaW9uT25seSA/IFIucHJvcChcIm9wSWRcIikgOiBSLnByb3AoXCJyZXBseVRvSWRcIikpLFxuICAgICAgICAgIFIuZmlsdGVyKFIucHJvcChcInJlcGx5VG9JZFwiKSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJzdWJtaXR0ZWRcIixcbiAgICAgIGF1dGhvcklkc1xuICAgIH0pLnRoZW4oUi5tYXAoc291bCA9PiBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goc291bCkudGhpbmdJZCkpXG4gIF0pLnRoZW4oKFtpZHMxLCBpZHMyXSkgPT4gUi51bmlxKFsuLi5pZHMxLCAuLi5pZHMyXSkpXG4pO1xuXG5jb25zdCB0aGluZ1Njb3JlcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHRhYnVsYXRvciwgdGhpbmdJZCkgPT5cbiAgICB0YWJ1bGF0b3IgJiYgdGhpbmdJZFxuICAgICAgPyBzY29wZVxuICAgICAgICAgIC5nZXQoU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCwgdGFidWxhdG9yIH0pKVxuICAgICAgICAgIC50aGVuKClcbiAgICAgIDogcmVzb2x2ZSgpLFxuICBcInRoaW5nU2NvcmVzXCJcbik7XG5cbmNvbnN0IHRoaW5nRGF0YSA9IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCkgPT4ge1xuICByZXR1cm4gdGhpbmdJZFxuICAgID8gc2NvcGUuZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkuZ2V0KFwiZGF0YVwiKVxuICAgIDogcmVzb2x2ZShudWxsKTtcbn0sIFwidGhpbmdEYXRhXCIpO1xuXG5jb25zdCB0aGluZ01ldGEgPSBxdWVyeShcbiAgKHNjb3BlLCB7IHRoaW5nU291bCwgdGFidWxhdG9yLCBkYXRhID0gZmFsc2UsIHNjb3JlcyA9IGZhbHNlIH0pID0+IHtcbiAgICBpZiAoIXRoaW5nU291bCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgY29uc3QgaWQgPSBMaXN0aW5nTm9kZS5zb3VsVG9JZCh0aGluZ1NvdWwpO1xuXG4gICAgcmV0dXJuIGFsbChbXG4gICAgICB0aGluZyhzY29wZSwgdGhpbmdTb3VsKSxcbiAgICAgIHNjb3Jlc1xuICAgICAgICA/IHRoaW5nU2NvcmVzKHNjb3BlLCB0YWJ1bGF0b3IgfHwgQ29uZmlnLnRhYnVsYXRvciwgaWQpXG4gICAgICAgIDogcmVzb2x2ZSgpLFxuICAgICAgZGF0YSA/IHRoaW5nRGF0YShzY29wZSwgaWQpIDogcmVzb2x2ZSgpXG4gICAgXSkudGhlbigoW21ldGEsIHZvdGVzLCBkYXRhXSkgPT4ge1xuICAgICAgaWYgKCFtZXRhIHx8ICFtZXRhLmlkKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7IC4uLm1ldGEsIHZvdGVzLCBkYXRhIH07XG4gICAgfSk7XG4gIH1cbik7XG5cbmNvbnN0IG11bHRpVGhpbmdNZXRhID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIGFsbChcbiAgICBSLnJlZHVjZShcbiAgICAgIChwcm9taXNlcywgdGhpbmdTb3VsKSA9PiB7XG4gICAgICAgIGlmICghdGhpbmdTb3VsKSByZXR1cm4gcHJvbWlzZXM7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpbmdNZXRhKHNjb3BlLCB7IC4uLnBhcmFtcywgdGhpbmdTb3VsIH0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuICAgICAgfSxcbiAgICAgIFtdLFxuICAgICAgUi5wcm9wT3IoW10sIFwidGhpbmdTb3Vsc1wiLCBwYXJhbXMpXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCB1c2VyUGFnZXMgPSBxdWVyeShcbiAgKHNjb3BlLCBhdXRob3JJZCkgPT5cbiAgICBzY29wZS5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSksXG4gIFwidXNlclBhZ2VzXCJcbik7XG5cbmNvbnN0IHdpa2lQYWdlSWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PiB7XG4gIGlmICghYXV0aG9ySWQgfHwgIW5hbWUpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICByZXR1cm4gc2NvcGVcbiAgICAuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpXG4gICAgLmdldChuYW1lKVxuICAgIC5nZXQoXCJpZFwiKTtcbn0sIFwid2lraVBhZ2VJZFwiKTtcblxuY29uc3Qgd2lraVBhZ2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PlxuICB3aWtpUGFnZUlkKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkudGhlbihpZCA9PiBpZCAmJiB0aGluZ0RhdGEoc2NvcGUsIGlkKSlcbik7XG5cbmNvbnN0IHVzZXJNZXRhID0gcXVlcnkoKHNjb3BlLCBpZCkgPT4ge1xuICBpZiAoIWlkKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgcmV0dXJuIHNjb3BlLmdldChgfiR7aWR9YCkudGhlbihtZXRhID0+ICh7XG4gICAgYWxpYXM6IFIucHJvcChcImFsaWFzXCIsIG1ldGEpLFxuICAgIGNyZWF0ZWRBdDogUi5wYXRoKFtcIl9cIiwgXCI+XCIsIFwicHViXCJdLCBtZXRhKVxuICB9KSk7XG59LCBcInVzZXJNZXRhXCIpO1xuXG5jb25zdCBjcmVhdGVTY29wZSA9IFIuY3VycnkoKG5hYiwgb3B0cykgPT5cbiAgbWFrZVNjb3BlKFIuYXNzb2MoXCJndW5cIiwgbmFiLmd1biwgb3B0cyB8fCB7fSkpXG4pO1xuXG5leHBvcnQgY29uc3QgUXVlcnkgPSB7XG4gIHNpbmdsZVRvcGljLFxuICBzaW5nbGVEb21haW4sXG4gIHNpbmdsZUF1dGhvcixcbiAgc2luZ2xlTGlzdGluZyxcbiAgcmVwbGllc1RvQXV0aG9yLFxuICBzaW5nbGVTdWJtaXNzaW9uLFxuICB0aGluZ01ldGEsXG4gIG11bHRpVGhpbmdNZXRhLFxuICBtdWx0aVRvcGljLFxuICBtdWx0aURvbWFpbixcbiAgbXVsdGlBdXRob3IsXG4gIG11bHRpU3VibWlzc2lvbixcbiAgdGhpbmdTY29yZXMsXG4gIHRoaW5nRGF0YSxcbiAgdGhpbmdEYXRhRnJvbVNvdWxzLFxuICB0b3BpY1NvdWxzLFxuICB1c2VyUGFnZXMsXG4gIHdpa2lQYWdlSWQsXG4gIHdpa2lQYWdlLFxuICB1c2VyTWV0YSxcbiAgY3JlYXRlU2NvcGUsXG4gIGN1cmF0ZWRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IFJvdXRlIGZyb20gXCJyb3V0ZS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIHNlYSBmcm9tIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICAuLi5zZWEuQVVUSF9TQ0hFTUEsXG4gIHRvcGljTmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWluTGVuZ3RoOiAxLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFXG4gIH0sXG5cbiAgVG9waWNEYXk6IHtcbiAgICB0aXRsZTogXCJUb3BpYyBEYXlcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBIHNpbmdsZSBkYXkgb2YgdGhpbmdzIGluIGEgdG9waWNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvOnRvcGljTmFtZS9kYXlzLzp5ZWFyLzptb250aC86ZGF5YCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWNOYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0sXG4gICAgICAgIHllYXI6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMjAxOCwgbWF4aW11bTogMjEwMCB9LFxuICAgICAgICBtb250aDogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAxLCBtYXhpbXVtOiAxMiB9LFxuICAgICAgICBkYXk6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMzEgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIiwgXCJ5ZWFyXCIsIFwibW9udGhcIiwgXCJkYXlcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIFRvcGljOiB7XG4gICAgdGl0bGU6IFwiVG9waWNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgdG9waWNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvOnRvcGljTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljTmFtZVwiXVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBuYW1lOiBcInRvcGljTmFtZVwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbmFtZToge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXByZWNhdGVkIGFzIHVubmVjZXNzYXJ5XCIsXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG5cbiAgZG9tYWluTmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWluTGVuZ3RoOiAxLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9ET01BSU5fU0laRVxuICB9LFxuXG4gIERvbWFpbjoge1xuICAgIHRpdGxlOiBcIkRvbWFpblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgaW4gYSBkb21haW5cIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9kb21haW5zLzpkb21haW5OYW1lYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZG9tYWluTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJkb21haW5OYW1lXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHVybDogeyB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVVJMX1NJWkUgfSxcbiAgVVJMOiB7XG4gICAgdGl0bGU6IFwiVVJMXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBmb3IgYSBnaXZlbiBVUkxcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS91cmxzL1xcKnVybGAsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXJsOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VybFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widXJsXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHRoaW5nSWQ6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9IQVNIX1NJWkVcbiAgfSxcblxuICB0aGluZ1NvdWw6IHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB0aGluZ0lkOiB7IFwiI3JlZlwiOiBcIiNkZWZpbml0aW9ucy90aGluZ0lkXCIgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0FsbENvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQWxsIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIGNvbW1lbnRzIGZvciBhIGdpdmVuIHN1Ym1pc3Npb25cIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvYWxsY29tbWVudHNgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdCByZXBsaWVzIHRvIGEgdGhpbmdcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvY29tbWVudHNgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHRpbWVzdGFtcDogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSxcbiAgdGhpbmdLaW5kOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfS0lORF9TSVpFXG4gIH0sXG5cbiAgVGhpbmc6IHtcbiAgICB0aXRsZTogXCJUaGluZyBSZWZlcmVuY2VcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhlc2UgYXJlIHN1Ym1pc3Npb25zLCBjb21tZW50cywgY2hhdCBtZXNzYWdlcyBhbmQgd2lraSBwYWdlc1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgaWQ6IFwidGhpbmdJZFwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgaWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAga2luZDogeyBcIiNyZWZcIjogXCIjL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0sXG4gICAgICB0aW1lc3RhbXA6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH0sXG4gICAgICBvcmlnaW5hbEhhc2g6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBvbmVPZjogW1xuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRGF0YUVkZ2VcIiB9LFxuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRGF0YVNpZ25lZEVkZ2VcIiB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB0b3BpYzoge1xuICAgICAgICBhbnlPZjogW1xuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29tZSBvbGQgdGhpbmdzIGhhZCBnZW5lcmljIHRvcGljIHNvdWxzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBcIiNcIjogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IDQyIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogW1wiI1wiXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGRvbWFpbjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvRG9tYWluRWRnZVwiIH0sXG4gICAgICB1cmw6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1VSTEVkZ2VcIiB9LFxuICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgIGFsbGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdBbGxDb21tZW50c1wiIH0sXG4gICAgICB2b3Rlc3VwOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc1VwXCIgfSxcbiAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfSxcbiAgICAgIG9wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgcmVwbHlUbzogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIGF1dGhvcjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvU0VBQXV0aG9yRWRnZVwiIH1cbiAgICB9LFxuXG4gICAgYW55T2Y6IFtcbiAgICAgIHtcbiAgICAgICAgYWxsT2Y6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aGluZ0hhc2hNYXRjaGVzU291bDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICAgICAgeyBzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmc6IHRydWUgfSxcbiAgICAgICAgICAgICAgeyB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoOiB0cnVlIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7IGlzTGVnYWN5VGhpbmc6IHRydWUgfSxcbiAgICAgIHtcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTZWxmIHZlcmlmeWluZyBjYW4gYmUgdXBkYXRlZCBpbiBpc29sYXRpb25cIixcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgICBjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQ29tbWVudHNcIiB9LFxuICAgICAgICAgIGFsbGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdBbGxDb21tZW50c1wiIH0sXG4gICAgICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICAgICAgdm90ZXNkb3duOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc0Rvd25cIiB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG5cbiAgUHJvb2ZPZldvcmtWb3Rlczoge1xuICAgICRhc3luYzogdHJ1ZSxcbiAgICBrZXlzQXJlUHJvb2ZzT2ZXb3JrOiB7XG4gICAgICBhbGdvcml0aG06IFwiYXJnb24yZFwiLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNvbXBsZXhpdHk6IDYsXG4gICAgICAgIGhhc2hMZW5ndGg6IDMyLFxuICAgICAgICB0aW1lQ29zdDogMSxcbiAgICAgICAgbWVtb3J5Q29zdDogMTAyNDAsXG4gICAgICAgIHBhcmFsbGVsaXNtOiAxXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nVm90ZXNVcDoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3Rlc3VwYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ1ZvdGVzRG93bjoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3Rlc2Rvd25gLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1Byb29mT2ZXb3JrVm90ZXNcIiB9XVxuICB9LFxuXG4gIFRoaW5nRGF0YToge1xuICAgIHRpdGxlOiBcIlVuc2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGlzIGlzIHRoZSBhY3R1YWwgY29udGVudCBvZiBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGFgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dLFxuICAgICAgcmVxdWlyZWQ6IFtcInRoaW5nSWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICB9LFxuICAgICAgdG9waWM6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3NlYUFsaWFzXCIgfSxcbiAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICBvcElkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIHJlcGx5VG9JZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy91cmxcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9XG4gICAgfSxcbiAgICB0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgfSxcblxuICBUaGluZ0RhdGFTaWduZWQ6IHtcbiAgICB0aXRsZTogXCJTaWduZWQgVGhpbmcgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJUaGlzIGlzIHRoZSBhY3R1YWwgY29udGVudCBvZiBhIHRoaW5nLCBjcnlwdG9ncmFwaGljYWxseSBzaWduZWRcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvZGF0YX46YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRoaW5nSWRcIiwgXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAga2luZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgc2VhOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX1RJVExFX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9IH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0JPRFlfU0laRVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH1cbiAgICAgIH0sXG4gICAgICBhdXRob3JJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9IH0sXG4gICAgICBvcElkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgcmVwbHlUb0lkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgZG9tYWluOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSB9LFxuICAgICAgdXJsOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9IH0sXG4gICAgICB0aW1lc3RhbXA6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH0gfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVDb3VudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBWb3RlIENvdW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFnZ3JlZ2F0ZWQgY291bnRzIGZyb20gYSB0YWJ1bGF0b3JcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZWNvdW50c0B+OnRhYnVsYXRvci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICB0YWJ1bGF0b3I6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGRvd246IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBjb21tZW50OiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgc2NvcmU6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBjb21tYW5kczogeyBzZWE6IHsgdHlwZTogW1wib2JqZWN0XCIsIFwic3RyaW5nXCJdIH0gfVxuICAgIH1cbiAgfSxcblxuICBMaXN0aW5nRGF0YToge1xuICAgICRhc3luYzogdHJ1ZSxcbiAgICB0aXRsZTogXCJMaXN0aW5nIE5vZGUgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNoYXJlZCBkZXNjcmlwdGlvbiBvZiBsaXN0aW5nIHByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIF86IHtcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhdHRlcm5Qcm9wZXJ0aWVzOiB7XG4gICAgICBcIl5kKyRcIjogeyBzZWE6IHsgdHlwZTogW1wic3RyaW5nXCIsIFwibnVsbFwiLCBcInVuZGVmaW5lZFwiXSB9IH1cbiAgICB9LFxuXG4gICAgZGVsZXRlTm9uTnVtZXJpY0tleXM6IHRydWUsXG4gICAgZGVsZXRlTWV0YUZvck1pc3Npbmc6IHRydWVcbiAgfSxcblxuICBzb3J0TmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1xuICAgICAgXCJuZXdcIixcbiAgICAgIFwib2xkXCIsXG4gICAgICBcImFjdGl2ZVwiLFxuICAgICAgXCJ0b3BcIixcbiAgICAgIFwiY29tbWVudHNcIixcbiAgICAgIFwiZGlzY3Vzc2VkXCIsXG4gICAgICBcImhvdFwiLFxuICAgICAgXCJiZXN0XCIsXG4gICAgICBcImNvbnRyb3ZlcnNpYWxcIixcbiAgICAgIFwicmFuZG9tXCIsXG4gICAgICBcImZpcmVob3NlXCIsXG4gICAgICBcImNoYXRcIlxuICAgIF1cbiAgfSxcblxuICBUb3BpY0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90Lzp0b3BpYy86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY1wiLCBcInNvcnRcIiwgXCJpbmRleGVyXCJdLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpYzogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFtcbiAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfVxuICAgIF1cbiAgfSxcblxuICBEb21haW5MaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWluLzpkb21haW4vOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluXCIsIFwic29ydFwiLCBcImluZGV4ZXJcIl0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgVGhpbmdDb21tZW50c0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvY29tbWVudHMvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgdXNlckxpc3RpbmdUeXBlOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXCJvdmVydmlld1wiLCBcInN1Ym1pdHRlZFwiLCBcImNvbW1lbnRzXCIsIFwiY29tbWFuZHNcIiwgXCJjb21tZW50ZWRcIl1cbiAgfSxcblxuICBBdXRob3JSZXBsaWVzTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke1xuICAgICAgICBDb25zdGFudHMuUFJFRklYXG4gICAgICB9L3VzZXIvOmF1dGhvcklkL3JlcGxpZXMvOnR5cGUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICB0eXBlOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VzZXJMaXN0aW5nVHlwZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvclByb2ZpbGVMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXNlci86YXV0aG9ySWQvOnR5cGUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICB0eXBlOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VzZXJMaXN0aW5nVHlwZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFNwYWNlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke1xuICAgICAgICBDb25zdGFudHMuUFJFRklYXG4gICAgICB9L3VzZXIvOmF1dGhvcklkL3NwYWNlcy86bmFtZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIG5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgQXV0aG9yQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3JzIGNvbW1lbnRzIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2NvbW1lbnRzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JTdWJtaXNzaW9uczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFN1Ym1pc3Npb25zXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcidzIHN1Ym1pc3Npb25zIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3N1Ym1pc3Npb25zfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yVGhpbmdzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgVGhpbmdzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcidzIHRoaW5ncyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3N+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclBhZ2VzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yIFBhZ2UgTWFwXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTWFwcGluZyBvZiBwYWdlIG5hbWVzIHRvIHRoaW5nc1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3BhZ2VzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3Qgcm91dGVzID0gUi5rZXlzKGRlZmluaXRpb25zKS5yZWR1Y2UoKHJlc3VsdCwgbmFtZSkgPT4ge1xuICBjb25zdCBwYXR0ZXJuID0gUi5wYXRoKFtuYW1lLCBcInNvdWxcIiwgXCJwYXR0ZXJuXCJdLCBkZWZpbml0aW9ucyk7XG5cbiAgaWYgKCFwYXR0ZXJuKSByZXR1cm4gcmVzdWx0O1xuICByZXR1cm4gUi5hc3NvYyhuYW1lLCBuZXcgUm91dGUocGF0dGVybiksIHJlc3VsdCk7XG59KTtcblxuY29uc3QgZGVmc1dpdGhSb3V0ZXMgPSBSLmNvbXBvc2UoXG4gIFIucmVkdWNlKFxuICAgIChyZXMsIFtuYW1lLCByb3V0ZV0pID0+XG4gICAgICBSLmFzc29jKG5hbWUsIFIuYXNzb2MoXCJyb3V0ZVwiLCByb3V0ZSwgUi5wcm9wKG5hbWUsIGRlZmluaXRpb25zKSksIHJlcyksXG4gICAge31cbiAgKSxcbiAgUi50b1BhaXJzXG4pKHJvdXRlcyk7XG5cbmV4cG9ydCBjb25zdCBTY2hlbWEgPSB7XG4gIC4uLmRlZnNXaXRoUm91dGVzLFxuICBkZWZpbml0aW9ucyxcbiAgcm91dGVzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCBhbGwgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IENvbW1lbnRDb21tYW5kIH0gZnJvbSBcIi4vQ29tbWVudENvbW1hbmRcIjtcblxuY29uc3QgdGFidWxhdG9yUXVlcnkgPSBxdWVyeShhc3luYyAoc2NvcGUsIHJvdXRlKSA9PiB7XG4gIGNvbnN0IHRoaW5nU291bCA9IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHJvdXRlLm1hdGNoKTtcbiAgY29uc3QgW3VwLCBkb3duLCBjb21tZW50LCByZXBseVNvdWxzXSA9IGF3YWl0IGFsbChbXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vdm90ZXN1cGApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vdm90ZXNkb3duYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS9hbGxjb21tZW50c2ApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vY29tbWVudHNgKS5zb3VscygpXG4gIF0pO1xuICBjb25zdCB0aGluZ0RhdGEgPSBhd2FpdCBRdWVyeS50aGluZ0RhdGFGcm9tU291bHMoc2NvcGUsIHJlcGx5U291bHMpO1xuICBjb25zdCBjb21tYW5kTWFwID0gQ29tbWVudENvbW1hbmQubWFwKHRoaW5nRGF0YSk7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICB1cCxcbiAgICBkb3duLFxuICAgIGNvbW1lbnQsXG4gICAgcmVwbGllczogcmVwbHlTb3Vscy5sZW5ndGgsXG4gICAgc2NvcmU6IHVwIC0gZG93blxuICB9O1xuXG4gIGlmIChSLmtleXMoY29tbWFuZE1hcCkubGVuZ3RoKSByZXN1bHQuY29tbWFuZHMgPSBKU09OLnN0cmluZ2lmeShjb21tYW5kTWFwKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5leHBvcnQgY29uc3QgVGFidWxhdG9yID0geyBxdWVyeTogdGFidWxhdG9yUXVlcnkgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcblxuZXhwb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuZXhwb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nRGF0YU5vZGVcIjtcblxuY29uc3QgdG9waWNQcmVmaXhlcyA9IHtcbiAgY2hhdG1zZzogXCJjaGF0OlwiLFxuICBjb21tZW50OiBcImNvbW1lbnRzOlwiXG59O1xuXG5jb25zdCBzb3VsVG9JZCA9IFIuY29tcG9zZShcbiAgUi5wcm9wKFwidGhpbmdJZFwiKSxcbiAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoLmJpbmQoU2NoZW1hLlRoaW5nLnJvdXRlKVxuKTtcblxuY29uc3Qgc291bHNUb0lkcyA9IFIubWFwKHNvdWxUb0lkKTtcblxuY29uc3QgaW5kZXggPSBSLmN1cnJ5KChwZWVyLCB0aGluZ0lkLCBkYXRhKSA9PiB7XG4gIGlmICghZGF0YS50b3BpYyAmJiAhZGF0YS5vcElkKSByZXR1cm47XG5cbiAgaWYgKGRhdGEub3BJZCAmJiAhZGF0YS50b3BpYykge1xuICAgIHBlZXIuZ3VuXG4gICAgICAuZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogZGF0YS5vcElkIH0pKVxuICAgICAgLmdldChcImRhdGFcIilcbiAgICAgIC5vbihmdW5jdGlvbiByZWN2KHRkKSB7XG4gICAgICAgIGlmICghdGQpIHJldHVybjtcbiAgICAgICAgaW5kZXgocGVlciwgdGhpbmdJZCwgeyAuLi5kYXRhLCB0b3BpYzogdGQudG9waWMgfHwgXCJhbGxcIiB9KTtcbiAgICAgICAgdGhpcy5vZmYoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSk7XG4gIGNvbnN0IGRheVN0ciA9IFRoaW5nU2V0LmRheVN0cihkYXRhLnRpbWVzdGFtcCk7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRheVN0ci5zcGxpdChcIi9cIik7XG4gIGNvbnN0IHRvcGljUHJlZml4ID0gdG9waWNQcmVmaXhlc1tkYXRhLmtpbmRdIHx8IFwiXCI7XG4gIGNvbnN0IGJhc2VUb3BpY05hbWUgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCB0b3BpY05hbWUgPSB0b3BpY1ByZWZpeCArIGJhc2VUb3BpY05hbWU7XG4gIGNvbnN0IHRvcGljID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lIH0pKTtcbiAgY29uc3QgdG9waWNEYXkgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hLlRvcGljRGF5LnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUsIHllYXIsIG1vbnRoLCBkYXkgfSlcbiAgKTtcblxuICBpZiAoIWRhdGEuc2tpcEFsbCAmJiBkYXRhLnRvcGljICE9PSBcImFsbFwiKSB7XG4gICAgY29uc3QgYWxsbmFtZSA9IGAke3RvcGljUHJlZml4fWFsbGA7XG4gICAgY29uc3QgYWxsVG9waWMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZTogYWxsbmFtZSB9KVxuICAgICk7XG4gICAgY29uc3QgYWxsVG9waWNEYXkgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRvcGljTmFtZTogYWxsbmFtZSxcbiAgICAgICAgeWVhcixcbiAgICAgICAgbW9udGgsXG4gICAgICAgIGRheVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgYWxsVG9waWMuc2V0KHRoaW5nKTtcbiAgICBhbGxUb3BpY0RheS5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEua2luZCA9PT0gXCJzdWJtaXNzaW9uXCIpIHtcbiAgICBjb25zdCB1cmxJbmZvID0gZGF0YS51cmwgPyBwYXJzZVVSSShkYXRhLnVybCkgOiB7fTtcbiAgICBjb25zdCBkb21haW5OYW1lID0gKGRhdGEudXJsXG4gICAgICA/ICh1cmxJbmZvLmhvc3QgfHwgdXJsSW5mby5zY2hlbWUgfHwgXCJcIikucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpXG4gICAgICA6IGBzZWxmLiR7ZGF0YS50b3BpY31gXG4gICAgKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRvbWFpbiA9IHBlZXIuZ3VuLmdldChTY2hlbWEuRG9tYWluLnJvdXRlLnJldmVyc2UoeyBkb21haW5OYW1lIH0pKTtcblxuICAgIGRvbWFpbi5zZXQodGhpbmcpO1xuXG4gICAgaWYgKGRhdGEudXJsKSB7XG4gICAgICBjb25zdCB1cmxOb2RlID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5VUkwucm91dGUucmV2ZXJzZSh7IHVybDogZGF0YS51cmwgfSkpO1xuXG4gICAgICAvLyB0aGluZy5nZXQoXCJ1cmxcIikucHV0KHVybE5vZGUpO1xuICAgICAgdXJsTm9kZS5zZXQodGhpbmcpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRhLm9wSWQpIHtcbiAgICBjb25zdCBhbGxjb21tZW50cyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSlcbiAgICApO1xuXG4gICAgYWxsY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIGlmIChkYXRhLnJlcGx5VG9JZCB8fCBkYXRhLm9wSWQpIHtcbiAgICBjb25zdCBjb21tZW50cyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0aGluZ0lkOiBkYXRhLnJlcGx5VG9JZCB8fCBkYXRhLm9wSWRcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICB0b3BpYy5zZXQodGhpbmcpO1xuICB0b3BpY0RheS5zZXQodGhpbmcpO1xufSk7XG5cbmNvbnN0IHB1dCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgZGF0YS50aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBvYmpIYXNoKGRhdGEpO1xuICBjb25zdCB7IHRpbWVzdGFtcCwga2luZCwgdG9waWMsIGF1dGhvcklkLCBvcElkLCByZXBseVRvSWQgfSA9IGRhdGE7XG4gIGNvbnN0IHRoaW5nSWQgPSBvYmpIYXNoKHtcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICB0b3BpYyxcbiAgICBhdXRob3JJZCxcbiAgICBvcElkLFxuICAgIHJlcGx5VG9JZCxcbiAgICBvcmlnaW5hbEhhc2hcbiAgfSk7XG5cbiAgY29uc3Qgbm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXRhU291bCA9IGF1dGhvcklkXG4gICAgPyBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCBhdXRob3JJZCB9KVxuICAgIDogU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3JpZ2luYWxIYXNoIH0pO1xuXG4gIGNvbnN0IG1ldGFEYXRhID0ge1xuICAgIGlkOiB0aGluZ0lkLFxuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIG9yaWdpbmFsSGFzaCxcbiAgICBkYXRhOiB7IFwiI1wiOiBkYXRhU291bCB9LFxuICAgIHZvdGVzdXA6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzVXAucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICB2b3Rlc2Rvd246IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzRG93bi5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGFsbGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9XG4gIH07XG5cbiAgaWYgKHRvcGljKVxuICAgIG1ldGFEYXRhLnRvcGljID0geyBcIiNcIjogU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IHRvcGljIH0pIH07XG4gIGlmIChhdXRob3JJZCkgbWV0YURhdGEuYXV0aG9yID0geyBcIiNcIjogYH4ke2F1dGhvcklkfWAgfTtcbiAgaWYgKG9wSWQpXG4gICAgbWV0YURhdGEub3AgPSB7IFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkgfTtcbiAgaWYgKHJlcGx5VG9JZClcbiAgICBtZXRhRGF0YS5yZXBseVRvID0ge1xuICAgICAgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcmVwbHlUb0lkIH0pXG4gICAgfTtcblxuICBwZWVyLmd1bi5nZXQoZGF0YVNvdWwpLnB1dChkYXRhKTtcbiAgbm9kZS5wdXQobWV0YURhdGEpO1xuICBpbmRleChwZWVyLCB0aGluZ0lkLCBkYXRhKTtcbiAgcmV0dXJuIG5vZGU7XG59KTtcblxuY29uc3Qgc3VibWl0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB0aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAoZGF0YS5kb21haW4pIGRhdGEuZG9tYWluID0gZGF0YS5kb21haW4udG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwgdGltZXN0YW1wLCBraW5kOiBcInN1Ym1pc3Npb25cIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnNTb3VsID0gU2NoZW1hLkF1dGhvclN1Ym1pc3Npb25zLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gcGVlci5ndW4uZ2V0KHN1Ym1pc3Npb25zU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwic3VibWlzc2lvbnNcIilcbiAgICAgIC5wdXQoc3VibWlzc2lvbnMpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICAgIHN1Ym1pc3Npb25zLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY29tbWVudCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNvbW1lbnRcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgY29tbWVudHNTb3VsID0gU2NoZW1hLkF1dGhvckNvbW1lbnRzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KGNvbW1lbnRzU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgIC5wdXQoY29tbWVudHMpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICAgIGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY2hhdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNoYXRtc2dcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCB3cml0ZVBhZ2UgPSBSLmN1cnJ5KChwZWVyLCBuYW1lLCBib2R5KSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoIXVzZXIpIHJldHVybiBQcm9taXNlLnJlamVjdChcIm5vdCBsb2dnZWQgaW5cIik7XG4gIGxldCB0aGluZztcbiAgY29uc3QgcGFnZXNTb3VsID0gU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZDogdXNlci5wdWIgfSk7XG4gIGNvbnN0IGNoYWluID0gcGVlci5ndW4uZ2V0KHBhZ2VzU291bCkuZ2V0KG5hbWUpO1xuXG4gIHJldHVybiBjaGFpbi50aGVuKHJlcyA9PiB7XG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY2hhaW5cbiAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgLmdldChcImJvZHlcIilcbiAgICAgICAgLnB1dChib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgYm9keSxcbiAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgIGtpbmQ6IFwid2lraXBhZ2VcIixcbiAgICAgICAgYXV0aG9yOiB1c2VyLmFsaWFzLFxuICAgICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICAgIH07XG5cbiAgICAgIHRoaW5nID0gcHV0KHBlZXIsIGRhdGEpO1xuICAgICAgY2hhaW4ucHV0KHRoaW5nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHZvdGUgPSBSLmN1cnJ5KChwZWVyLCBpZCwga2luZCwgbm9uY2UpID0+IHtcbiAgY29uc3Qgdm90ZXMgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hW2tpbmQgPT09IFwidXBcIiA/IFwiVGhpbmdWb3Rlc1VwXCIgOiBcIlRoaW5nVm90ZXNEb3duXCJdLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogaWRcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiB2b3Rlcy5nZXQobm9uY2UpLnB1dChcIjFcIik7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nID0ge1xuICBzb3VsVG9JZCxcbiAgc291bHNUb0lkcyxcbiAgcHV0LFxuICBzdWJtaXQsXG4gIGNvbW1lbnQsXG4gIGNoYXQsXG4gIHdyaXRlUGFnZSxcbiAgdm90ZSxcbiAgaW5kZXhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5cbmNvbnN0IGJvZHkgPSBSLnByb3BPcihcIlwiLCBcImJvZHlcIik7XG5jb25zdCB1cmwgPSBSLnByb3BPcihcIlwiLCBcInVybFwiKTtcbmNvbnN0IGRvbWFpbiA9IFIuY29tcG9zZShcbiAgdXJsU3RyID0+IHtcbiAgICBpZiAoIXVybFN0cikgcmV0dXJuIFwiXCI7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VVUkkodXJsU3RyKTtcblxuICAgIHJldHVybiAocGFyc2VkLmhvc3QgfHwgcGFyc2VkLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIik7XG4gIH0sXG4gIHVybFxuKTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nRGF0YU5vZGUgPSB7IGJvZHksIHVybCwgZG9tYWluIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5cbmNvbnN0IHNvdWxzID0gR3VuTm9kZS5lZGdlcztcbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcInRoaW5nSWRcIiksXG4gICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4gICAgKVxuICApLFxuICBHdW5Ob2RlLmVkZ2VzXG4pO1xuXG5jb25zdCB1bmlvbiA9IFIuY29tcG9zZShcbiAgUi5kaXNzb2MoXCJfXCIpLFxuICBSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KVxuKTtcblxuZnVuY3Rpb24gZGF5U3RyKHRpbWVzdGFtcCkge1xuICBjb25zdCBkID0gbmV3IERhdGUodGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgY29uc3QgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RhdGUoKTtcblxuICByZXR1cm4gYCR7eWVhcn0vJHttb250aH0vJHtkYXlOdW19YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRoaW5nU2V0ID0geyBpZHMsIHVuaW9uLCBzb3VscywgZGF5U3RyIH07XG4iLCJleHBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5leHBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdEYXRhTm9kZVwiO1xuZXhwb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcblxuY29uc3QgdG9rZW5pemUgPSBzb3VyY2UgPT4ge1xuICBjb25zdCB0b2tlbk1hcCA9IChzb3VyY2UgfHwgXCJcIikuc3BsaXQoXCJcXG5cIikucmVkdWNlKChkZWYsIGxpbmUpID0+IHtcbiAgICBjb25zdCB0b2tlbnMgPSBsaW5lXG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAubWFwKFIudHJpbSlcbiAgICAgIC5maWx0ZXIoeCA9PiB4KTtcblxuICAgIGlmICghdG9rZW5zLmxlbmd0aCkgcmV0dXJuIGRlZjtcbiAgICByZXR1cm4gUi5hc3NvY1BhdGgodG9rZW5zLCB7fSwgZGVmKTtcbiAgfSwge30pO1xuXG4gIGNvbnN0IGlzUHJlc2VudCA9IHAgPT4ge1xuICAgIGxldCBjaGVjayA9IHA7XG5cbiAgICBpZiAodHlwZW9mIHAgPT09IFwic3RyaW5nXCIpIGNoZWNrID0gcC5zcGxpdChcIiBcIik7XG4gICAgcmV0dXJuIGNoZWNrICYmIFIucGF0aChjaGVjaywgdG9rZW5NYXApO1xuICB9O1xuXG4gIGNvbnN0IGdldFZhbHVlcyA9IHAgPT4gUi5rZXlzSW4oaXNQcmVzZW50KHApKTtcbiAgY29uc3QgZ2V0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKVswXSB8fCBudWxsO1xuICBjb25zdCBnZXRMYXN0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKS5wb3AoKSB8fCBudWxsO1xuXG4gIGNvbnN0IGdldFZhbHVlQ2hhaW4gPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgbGV0IG5leHQgPSBwO1xuXG4gICAgd2hpbGUgKG5leHQpIHtcbiAgICAgIG5leHQgPSBnZXRWYWx1ZShbLi4ua2V5cywgLi4udmFsdWVzXSk7XG4gICAgICBuZXh0ICYmIHZhbHVlcy5wdXNoKG5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgY29uc3QgZ2V0UGFpcnMgPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG5cbiAgICByZXR1cm4gZ2V0VmFsdWVzKGtleXMpLnJlZHVjZSgocGFpcnMsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gZ2V0VmFsdWUoWy4uLmtleXMsIGtleV0pO1xuXG4gICAgICByZXR1cm4gWy4uLnBhaXJzLCBba2V5LCB2YWxdXTtcbiAgICB9LCBbXSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2UsXG4gICAgaXNQcmVzZW50LFxuICAgIGdldFZhbHVlLFxuICAgIGdldFZhbHVlcyxcbiAgICBnZXRMYXN0VmFsdWUsXG4gICAgZ2V0VmFsdWVDaGFpbixcbiAgICBnZXRQYWlyc1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IFRva2VuaXplciA9IHsgdG9rZW5pemUgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgb2JqSGFzaCBmcm9tIFwib2JqZWN0LWhhc2hcIjtcbmltcG9ydCB7IGNyZWF0ZVN1cHByZXNzb3IgfSBmcm9tIFwiZ3VuLXN1cHByZXNzb3JcIjtcbmltcG9ydCAqIGFzIHNlYSBmcm9tIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5cbmNvbnN0IGlzTGVnYWN5VGhpbmcgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGRhdGFTb3VsID0gUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKTtcbiAgY29uc3QgbmV3ZXN0ID0gUi53aXRob3V0KFxuICAgIFtcImNvbW1lbnRzXCIsIFwiYWxsY29tbWVudHNcIiwgXCJ2b3Rlc3VwXCIsIFwidm90ZXNkb3duXCJdLFxuICAgIFIua2V5cyhSLnBhdGgoW1wiX1wiLCBcIj5cIl0sIGRhdGEpKVxuICApXG4gICAgLm1hcChrZXkgPT4gUi5wYXRoKFtcIl9cIiwgXCI+XCIsIGtleV0sIGRhdGEpKVxuICAgIC5zb3J0KClcbiAgICAucG9wKCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChkYXRhU291bCkgfHwge307XG4gIGNvbnN0IGlkID0gUi5wcm9wKFwiaWRcIiwgZGF0YSk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSB0aGluZ0lkICYmIG5ld2VzdCAmJiBuZXdlc3QgPCAxNTQzMTAyODE0OTQ1O1xufTtcblxuY29uc3QgdGhpbmdIYXNoTWF0Y2hlc1NvdWwgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiAoXG4gICAgaWQgJiZcbiAgICBpZCA9PT1cbiAgICAgIG9iakhhc2goe1xuICAgICAgICBhdXRob3JJZDogKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkLFxuICAgICAgICB0aW1lc3RhbXA6IHBhcnNlSW50KFIucHJvcChcInRpbWVzdGFtcFwiLCBkYXRhKSwgMTApLFxuICAgICAgICBraW5kOiBSLnByb3AoXCJraW5kXCIsIGRhdGEpLFxuICAgICAgICB0b3BpYzogUi5wcm9wKFxuICAgICAgICAgIFwidG9waWNOYW1lXCIsXG4gICAgICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLm1hdGNoKFIucGF0aChbXCJ0b3BpY1wiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICBvcElkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICByZXBseVRvSWQ6IFIucHJvcChcbiAgICAgICAgICBcInRoaW5nSWRcIixcbiAgICAgICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcInJlcGx5VG9cIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3JpZ2luYWxIYXNoOiBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSlcbiAgICAgIH0pXG4gICk7XG59O1xuXG5jb25zdCBzaWduZWRUaGluZ0RhdGFNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgYXV0aG9ySWQgPSAoUi5wYXRoKFtcImF1dGhvclwiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpLnN1YnN0cigxKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IHNpZ25lZElkID0gUi5wcm9wKFxuICAgIFwiYXV0aG9ySWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGF1dGhvcklkICYmIGF1dGhvcklkID09PSBzaWduZWRJZDtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2ggPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSk7XG4gIGNvbnN0IGlkID0gUi5wcm9wKFxuICAgIFwidGhpbmdJZFwiLFxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKSlcbiAgKTtcblxuICByZXR1cm4gaWQgJiYgaWQgPT09IG9yaWdpbmFsSGFzaDtcbn07XG5cbmNvbnN0IGdldElzVGhpbmdSZWxhdGVkRWRnZSA9IGFqdiA9PiAoXG4gIG5vZGVUeXBlTmFtZSxcbiAgZGF0YSxcbiAgX3BTY2hlbWEsXG4gIF9jUGF0aCxcbiAgcGFyZW50RGF0YVxuKSA9PiB7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBwYXJlbnREYXRhKSB8fCBcIlwiKSB8fCB7fTtcbiAgY29uc3QgeyB0aGluZ0lkOiBwcm9wVGhpbmdJZCB9ID0gU2NoZW1hW25vZGVUeXBlTmFtZV0ucm91dGUubWF0Y2goXG4gICAgUi5wcm9wKFwiI1wiLCBkYXRhKSB8fCBcIlwiXG4gICk7XG5cbiAgaWYgKCF0aGluZ0lkIHx8IHRoaW5nSWQgIT09IHByb3BUaGluZ0lkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhanYuY29tcGlsZSh7ICRyZWY6IGBzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvJHtub2RlVHlwZU5hbWV9RWRnZWAgfSkoXG4gICAgZGF0YVxuICApO1xufTtcblxuY29uc3QgdGhpbmdEYXRhSGFzaE1hdGNoZXMgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCB7IF8sIC4uLnJlY29yZCB9ID0gZGF0YSB8fCB7fTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gIHJlY29yZC50aW1lc3RhbXAgPSBwYXJzZUZsb2F0KHJlY29yZC50aW1lc3RhbXAsIDEwKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPVxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKSB8fCB7fTtcblxuICByZXR1cm4gdGhpbmdJZCAmJiB0aGluZ0lkID09PSBvYmpIYXNoKHJlY29yZCk7XG59O1xuXG5jb25zdCBpc1ZvdGVWYWxpZCA9IChhcmdvbjIsIHNjaGVtYSwgcHJlZml4LCB2b3RlKSA9PiB7XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIsIGNvbmZpZyA9IHt9IH0gPSBzY2hlbWEgfHwge307XG5cbiAgY29uc3Qgbm9uY2UgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbSh2b3RlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcih2b3RlLCBcImhleFwiKTtcbiAgY29uc3Qgc2FsdCA9IEJ1ZmZlci5oYXNPd25Qcm9wZXJ0eShcImZyb21cIilcbiAgICA/IEJ1ZmZlci5mcm9tKG5vbmNlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcihub25jZSwgXCJoZXhcIik7XG4gIGNvbnN0IGhhc2ggPSBhcmdvbjIuaGFzaChwcmVmaXgsIHtcbiAgICBzYWx0LFxuICAgIGhhc2hMZW5ndGg6IGNvbmZpZy5oYXNoTGVuZ3RoLFxuICAgIHRpbWVDb3N0OiBjb25maWcudGltZUNvc3QsXG4gICAgbWVtb3J5Q29zdDogY29uZmlnLm1lbW9yeUNvc3QsXG4gICAgcGFyYWxsZWxpc206IGNvbmZpZy5wYXJhbGxlbGlzbSxcbiAgICByYXc6IHRydWUsXG4gICAgdHlwZTogYXJnb24yW2FsZ29yaXRobV1cbiAgfSk7XG4gIGxldCBvZmYgPSAwO1xuICBsZXQgaTtcblxuICBmb3IgKGkgPSAwOyBpIDw9IGNvbmZpZy5jb21wbGV4aXR5IC0gODsgaSArPSA4LCBvZmYrKykge1xuICAgIGlmIChoYXNoW29mZl0gIT09IDApIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBtYXNrID0gMHhmZiA8PCAoOCArIGkgLSBjb25maWcuY29tcGxleGl0eSk7XG5cbiAgcmV0dXJuIChoYXNoW29mZl0gJiBtYXNrKSA9PT0gMDtcbn07XG5cbmNvbnN0IGtleXNBcmVQcm9vZnNPZldvcmsgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGFyZ29uMiA9IHJlcXVpcmUoXCJhcmdvbjJcIik7XG5cbiAgaWYgKCFhcmdvbjIpIHJldHVybiB0cnVlOyAvLyBpbiBicm93c2VyIGRvbid0IGJvdGhlciBmb3Igbm93XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIgfSA9IHNjaGVtYSB8fCB7fTtcbiAgY29uc3QgcHJlZml4ID0gUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKTtcblxuICBpZiAoYWxnb3JpdGhtICE9PSBcImFyZ29uMmRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgYXJnb24yIHN1cHBvcnRlZCBmb3Igdm90ZSBoYXNoZXNcIik7XG4gIH1cblxuICBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKS5mb3JFYWNoKHZvdGUgPT4ge1xuICAgIGlmICghaXNWb3RlVmFsaWQoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCB2b3RlXCIsIHByZWZpeCwgdm90ZSk7XG4gICAgICBkZWxldGUgZGF0YVt2b3RlXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGRlbGV0ZU5vbk51bWVyaWNLZXlzID0gKFxuICBzY2hlbWEsXG4gIGRhdGEsXG4gIHBTY2hlbWEsXG4gIGNQYXRoLFxuICBwYXJlbnREYXRhLFxuICBrZXlJblBhcmVudFxuKSA9PiB7XG4gIGNvbnN0IGtleXMgPSBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKTtcbiAgY29uc3QgbWV0YSA9IFIucGF0aE9yKHt9LCBbXCJfXCIsIFwiPlwiXSwgZGF0YSk7XG5cbiAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgY29uc3QgdmFsID0gcGFyc2VJbnQoa2V5LCAxMCk7XG5cbiAgICBpZiAoIXZhbCAmJiB2YWwgIT09IDApIHtcbiAgICAgIGRlbGV0ZSBtZXRhW2tleV07XG4gICAgICBkZWxldGUgZGF0YVtrZXldO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgZGVsZXRlTWV0YUZvck1pc3NpbmcgPSAoXG4gIHNjaGVtYSxcbiAgZGF0YSxcbiAgcFNjaGVtYSxcbiAgY1BhdGgsXG4gIHBhcmVudERhdGEsXG4gIGtleUluUGFyZW50XG4pID0+IHtcbiAgY29uc3Qga2V5cyA9IFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpO1xuICBjb25zdCBtZXRhID0gUi5wYXRoT3Ioe30sIFtcIl9cIiwgXCI+XCJdLCBkYXRhKTtcbiAgY29uc3QgbWV0YUtleXMgPSBSLmtleXMobWV0YSk7XG4gIGNvbnN0IG1pc3NpbmcgPSBSLmRpZmZlcmVuY2UobWV0YUtleXMsIGtleXMpO1xuXG4gIGlmIChtaXNzaW5nLmxlbmd0aCkgZGF0YVtcIl9cIl1bXCI+XCJdID0gUi5vbWl0KG1pc3NpbmcsIG1ldGEpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGluaXRBanYgPSBSLmNvbXBvc2UoXG4gIGFqdiA9PiB7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJpc0xlZ2FjeVRoaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBpc0xlZ2FjeVRoaW5nXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0hhc2hNYXRjaGVzU291bFwiLCB7XG4gICAgICB2YWxpZGF0ZTogdGhpbmdIYXNoTWF0Y2hlc1NvdWxcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaFwiLCB7XG4gICAgICB2YWxpZGF0ZTogdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaFxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdSZWxhdGVkRWRnZVwiLCB7XG4gICAgICB2YWxpZGF0ZTogZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlKGFqdilcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nRGF0YUhhc2hNYXRjaGVzU291bFwiLCB7XG4gICAgICB2YWxpZGF0ZTogdGhpbmdEYXRhSGFzaE1hdGNoZXNcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcImtleXNBcmVQcm9vZnNPZldvcmtcIiwge1xuICAgICAgdmFsaWRhdGU6IGtleXNBcmVQcm9vZnNPZldvcmssXG4gICAgICBtb2RpZnlpbmc6IHRydWVcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcImRlbGV0ZU5vbk51bWVyaWNLZXlzXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBkZWxldGVOb25OdW1lcmljS2V5cyxcbiAgICAgIG1vZGlmeWluZzogdHJ1ZVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiZGVsZXRlTWV0YUZvck1pc3NpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IGRlbGV0ZU1ldGFGb3JNaXNzaW5nLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGFqdjtcbiAgfSxcbiAgc2VhLmluaXRBanZcbik7XG5cbmV4cG9ydCBjb25zdCBzdXBwcmVzc29yID0gY3JlYXRlU3VwcHJlc3Nvcih7XG4gIGRlZmluaXRpb25zOiBTY2hlbWEuZGVmaW5pdGlvbnMsXG4gIGluaXQ6IFIuY29tcG9zZShcbiAgICBpbml0QWp2LFxuICAgIFIuYWx3YXlzKHsgcmVtb3ZlQWRkaXRpb25hbDogZmFsc2UgfSlcbiAgKVxufSk7XG5cbmNvbnN0IGd1bldpcmVJbnB1dCA9IFIuY3VycnkoKHBlZXIsIGNvbnRleHQpID0+XG4gIGNvbnRleHQub24oXCJpblwiLCBmdW5jdGlvbiB3aXJlSW5wdXQobXNnKSB7XG4gICAgY29uc3QgXyA9IG1zZ1tcIl9cIl07XG5cbiAgICBkZWxldGUgbXNnW1wiX1wiXTtcbiAgICBpZiAoXCJwaW5nXCIgaW4gbXNnIHx8IFwibGVlY2hcIiBpbiBtc2cpIHJldHVybjtcbiAgICBpZiAobXNnLnB1dCAmJiAhUi5rZXlzKG1zZy5wdXQpLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHByb21pc2UgPSBwZWVyLmNvbmZpZy5kaXNhYmxlVmFsaWRhdGlvblxuICAgICAgPyBQcm9taXNlLnJlc29sdmUobXNnKVxuICAgICAgOiBzdXBwcmVzc29yLnZhbGlkYXRlKG1zZyk7XG5cbiAgICBwcm9taXNlXG4gICAgICAudGhlbih2YWxpZGF0ZWQgPT4ge1xuICAgICAgICBpZiAoIXZhbGlkYXRlZCkgcmV0dXJuIGNvbnNvbGUubG9nKFwibXNnIGRpZG4ndCB2YWxpZGF0ZVwiLCBtc2cpO1xuICAgICAgICBtc2dbXCJfXCJdID0gXztcbiAgICAgICAgcmV0dXJuIHRoaXMudG8ubmV4dChtc2cpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihcInZhbGlkYXRlIGVyclwiLCBtc2csIGVyci5zdGFjayB8fCBlcnIpKTtcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBWYWxpZGF0aW9uID0ge1xuICBpc0xlZ2FjeVRoaW5nLFxuICB0aGluZ0hhc2hNYXRjaGVzU291bCxcbiAgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyxcbiAgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaCxcbiAgZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlLFxuICB0aGluZ0RhdGFIYXNoTWF0Y2hlcyxcbiAgaXNWb3RlVmFsaWQsXG4gIGtleXNBcmVQcm9vZnNPZldvcmssXG4gIGluaXRBanYsXG4gIHN1cHByZXNzb3IsXG4gIGd1bldpcmVJbnB1dFxufTtcbiIsImltcG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmV4cG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuZXhwb3J0IHsgQ29tbWVudENvbW1hbmQgfSBmcm9tIFwiLi9Db21tZW50Q29tbWFuZFwiO1xuZXhwb3J0IHsgTGlzdGluZywgTGlzdGluZ09yYWNsZSwgU3BhY2VTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1wiO1xuZXhwb3J0IHsgUGFnZSB9IGZyb20gXCIuL1BhZ2VcIjtcbmV4cG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5leHBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmV4cG9ydCB7IFRoaW5nLCBUaGluZ1NldCwgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nXCI7XG5leHBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuZXhwb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmV4cG9ydCB7IFRhYnVsYXRvciB9IGZyb20gXCIuL1RhYnVsYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgUGVlci5pbml0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc2NvcGVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3JfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9vYmplY3RfaGFzaF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX187Il0sInNvdXJjZVJvb3QiOiIifQ==