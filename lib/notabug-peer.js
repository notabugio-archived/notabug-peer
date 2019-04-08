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
  init: R.compose(initAjv, R.always({
    removeAdditional: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIklOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkNIQVRfUFJFTE9BRF9JVEVNUyIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwicXVlcnkiLCJtdWx0aVRvcGljIiwiZG9tYWluU291cmNlIiwiZG9tYWlucyIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlZCIsImlkcyIsInRoaW5nSWQiLCJUaGluZyIsInJvdXRlIiwicmV2ZXJzZSIsIm9wU291cmNlIiwic3VibWlzc2lvbklkcyIsIm11bHRpU3VibWlzc2lvbiIsInJlcGxpZXNTb3VyY2UiLCJyZXBsaWVzVG9BdXRob3IiLCJyZXBsaWVzVG9BdXRob3JJZCIsInNvdXJjZXMiLCJsaXN0aW5nIiwicmVwbGllcyIsIm9wIiwiY3VyYXRvciIsImF1dGhvciIsImRvbWFpbiIsInRvcGljIiwic291cmNlTmFtZXMiLCJzb3VyY2VOYW1lIiwiZGVmIiwiZnJvbURlZmluaXRpb24iLCJuYW1lIiwibWVyZ2VMZWZ0IiwiTGlzdGluZ0RhdGFTb3VyY2UiLCJmcm9tU291cmNlIiwic291cmNlIiwib3duZXJJZCIsInNwYWNlTmFtZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsImlzQ2hhdCIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJiYXNlUGF0aCIsInN1Ym1pdFBhdGgiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsImZucyIsImFkZFZvdGVGaWx0ZXIiLCJ0IiwiaWRlbnRpY2FsIiwiaXRlbSIsImtpbmQiLCJhbGlhcyIsImx0ZSIsImd0ZSIsInRoaW5nIiwiY21kcyIsInRhZ05hbWUiLCJjb250ZW50RmlsdGVyIiwidm90ZUZpbHRlciIsInRoaW5nRmlsdGVyIiwiZ2V0RmlsdGVyZWRSb3dzIiwic3BlYyIsInNvcnRlZFJvd3MiLCJsaW1pdCIsImxpbWl0UHJvcCIsImNvdW50IiwiY291bnRQcm9wIiwiYWZ0ZXIiLCJmaWx0ZXJGbiIsInJvd3MiLCJzbGljZSIsImZpbHRlcmVkIiwiZmV0Y2hCYXRjaCIsInNpemUiLCJQcm9taXNlIiwicm93IiwiaW5MaXN0aW5nIiwiUE9TX0lEIiwiY29uc29sZSIsImxvZyIsInNwbGljZSIsIlBPU19WQUwiLCJnZXRGaWx0ZXJlZElkcyIsIngiLCJ0aGluZ01ldGEiLCJ0aGluZ1NvdWwiLCJzY29yZXMiLCJMaXN0aW5nRmlsdGVyIiwiUE9TX0lEWCIsInJvd3NUb0lkcyIsInJvd3NUb0l0ZW1zIiwic291bEZyb21QYXRoIiwicGF0aEZyb21Tb3VsIiwiUmVnRXhwIiwiaWRUb1NvdWwiLCJpZHNUb1NvdWxzIiwic291bFRvSWQiLCJtYXRjaCIsInNvdWxzVG9JZHMiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwiaXRlbUtleXMiLCJmaWx0ZXIiLCJzZXJpYWxpemUiLCJpdGVtcyIsImFkZEluZGV4IiwiYXNzb2MiLCJkZWZhdWx0VG8iLCJzb3J0Um93cyIsInNvcnRXaXRoIiwiYXNjZW5kIiwiY29uZCIsImlzTmlsIiwiSW5maW5pdHkiLCJUIiwic29ydGVkSWRzIiwiaXRlbXNUb1Jvd3MiLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImluc2VydGVkIiwicG9wIiwicmVwbGFjZWQiLCJjYXRlZ29yaXplRGlmZiIsIm9yaWdpbmFsIiwiYWxsS2V5cyIsIl9kaWZmSWR4IiwiZGlmZklkIiwiX29yaWdJZHgiLCJvcmlnSWQiLCJ1bmlvblJvd3MiLCJ1bmlxQnkiLCJyb3dzRnJvbVNvdWxzIiwicmVhZCIsIkxpc3RpbmdOb2RlIiwidXBkYXRlTGlzdGluZyIsIm9yYyIsIm5ld1Njb3BlIiwidG9JdGVtcyIsIndyaXRlIiwib25QdXQiLCJ1cGRhdGVkU291bCIsInByb3BzIiwidXBkYXRlZElkcyIsInNwZWNGcm9tUGF0aCIsIlRoaW5nVm90ZUNvdW50cyIsImlzU3RpY2t5IiwiZXF1YWxzIiwiZ2V0QWNjZXNzZXMiLCJsaXN0ZW4iLCJMaXN0aW5nT3JhY2xlIiwiY2FsY3VsYXRlUm93cyIsInN0aWNreUl0ZW1zIiwiZGF0YVNvdXJjZSIsImNhbGN1bGF0ZSIsInRvTm9kZSIsInBhdGhzIiwic3RpY2t5Um93cyIsImZyb21TcGVjIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsIm5vZGVGcm9tUGF0aCIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIm9sZCIsImFjdGl2ZSIsImxhc3RBY3RpdmUiLCJ0b3AiLCJjb21tZW50cyIsImRpc2N1c3NlZCIsInNjb3JlIiwic2Vjb25kcyIsIm9yZGVyIiwiTWF0aCIsImxvZzEwIiwibWF4IiwiYWJzIiwiaG90Iiwic2lnbiIsImJlc3QiLCJ1cHMiLCJkb3ducyIsIm4iLCJ6IiwibGVmdCIsInJpZ2h0Iiwic3FydCIsInVuZGVyIiwiY29udHJvdmVyc2lhbCIsIm1hZ25pdHVkZSIsImJhbGFuY2UiLCJpc1ZhbGlkU29ydCIsInRvSXRlbSIsImZyb21UaGluZ1NldHMiLCJwaXBlIiwidW5pb24iLCJMaXN0aW5nU29ydCIsImFwcGx5IiwiYXAiLCJvZiIsImdldFNvdXJjZSIsImV4dHJhIiwid2lraVBhZ2UiLCJMaXN0aW5nU3BlYyIsImdldFNpZGViYXIiLCJub3JtYWxUb3BpY3MiLCJzcGxpdFRvcGljcyIsInN1Ym1pdFRvIiwidGFiIiwiQ2hhdExpc3RpbmciLCJ3aXRoUm91dGUiLCJDb21tZW50TGlzdGluZyIsIkNvbW1lbnRlZExpc3RpbmciLCJEb21haW5MaXN0aW5nIiwiRmlyZWhvc2VMaXN0aW5nIiwiZGlmZkRhdGEiLCJ1cGRhdGVkQXV0aG9yZWQiLCJvcElkIiwicmVwbHlJZHMiLCJUaGluZ0NvbW1lbnRzIiwiSW5ib3hMaXN0aW5nIiwidXNlck1ldGEiLCJtZXRhIiwicHJvZmlsZUlkIiwiUHJvZmlsZUxpc3RpbmciLCJzaWRlYmFyUGFnZU5hbWUiLCJvcmlnaW5hbERhdGEiLCJyZW1vdmVkSWRzIiwidm90ZUNvdW50c01hdGNoIiwidGhpbmdNYXRjaCIsIlRoaW5nRGF0YVNpZ25lZCIsImF1dGhvck1hdGNoIiwiU0VBQXV0aG9yIiwiZnJvbVBhZ2VJZCIsImV4aXN0aW5nS2V5cyIsIndvcmsiLCJtZXRob2QiLCJwcmlvcml0eSIsIlNwYWNlTGlzdGluZyIsIlRvcGljTGlzdGluZyIsInR5cGVzIiwidHlwZXNBcnJheSIsInNpZGViYXJGcm9tUGF0aCIsIkVycm9yIiwiYmFzZVNwZWMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJQYXRoIiwiY29uZmlnUGFnZU5hbWUiLCJzb3VyY2VXaXRoRGVmYXVsdHMiLCJub2RlVG9TcGFjZU5hbWVzIiwidXNlclNwYWNlTmFtZXMiLCJ1c2VyUGFnZXMiLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwidHlwZUZyb21QYXRoIiwid2l0aE1hdGNoIiwicGFyYW1zIiwicHJlbG9hZCIsIndpdGhMaXN0aW5nTWF0Y2giLCJzaWRlYmFyIiwic3BhY2UiLCJyZWFsUXVlcnkiLCJwcmVsb2FkTGlzdGluZyIsInRoaW5nU291bHMiLCJ0aGluZ3MiLCJtdWx0aVRoaW5nTWV0YSIsIm9wSWRzIiwib3BTb3VscyIsImNoYXRQYXRoIiwiZ2V0Q2FjaGUiLCJwcmVmaXgiLCJkZWZhdWx0UHJlZml4IiwiaWRlbnRpZmllciIsImRlZmF1bHRJZGVudGlmaWVyIiwiZGVmYXVsdFNvcnQiLCJyZXN0IiwidGhpbmdDb21tZW50cyIsInNwYWNlTGlzdGluZyIsImRlZmF1bHROYW1lIiwiZGVmYXVsdEF1dGhvcklkIiwic3BhY2VUaGluZ0NvbW1lbnRzIiwic3BhY2VQYXRoIiwibGlzdGluZ1BhdGgiLCJwcm9maWxlIiwiZGVmYXVsdFR5cGUiLCJpbmJveCIsIlBhZ2UiLCJpbml0IiwiY29uZmlnIiwibGVlY2giLCJkaXNhYmxlVmFsaWRhdGlvbiIsIm5vR3VuIiwibG9jYWxTdG9yYWdlIiwicGVyc2lzdCIsImNmZyIsInJhZGlzayIsIm9uIiwiZ3VuV2lyZUlucHV0Iiwic3RvcmVGbiIsInN0b3JlIiwiYSIsInJldHJ5Iiwic2VuZExlZWNoIiwiXyIsImNyZWF0ZVNjb3BlIiwic3VibWl0IiwiY29tbWVudCIsImNoYXQiLCJ3cml0ZVBhZ2UiLCJ2b3RlIiwicXVlcmllcyIsIlBlZXIiLCJlbXB0eVByb21pc2UiLCJ1bmlvbkFycmF5cyIsInRvcGljU291bHMiLCJkYXlzIiwiZGF5U3RyaW5ncyIsIm9uZURheSIsInN0YXJ0IiwiRGF0ZSIsImdldFRpbWUiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJyZXBseVRvU291bCIsIm9wU291bCIsInRoaW5naWQiLCJyZXBseVRvSWQiLCJtdWx0aVF1ZXJ5Iiwic2luZ2xlUXVlcnkiLCJwbHVyYWwiLCJzaW5nbGUiLCJjb2xsYXRlIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwic3VibWlzc2lvbk9ubHkiLCJpZHMxIiwiaWRzMiIsInRoaW5nU2NvcmVzIiwidm90ZXMiLCJwcm9taXNlcyIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsImNyZWF0ZWRBdCIsIm5hYiIsIlF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzZWEiLCJBVVRIX1NDSEVNQSIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIlRvcGljRGF5IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiJHJlZiIsInllYXIiLCJtaW5pbXVtIiwibWF4aW11bSIsIm1vbnRoIiwiZGF5IiwicmVxdWlyZWQiLCJwcm9wc0Zyb21Tb3VsIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlZGdlTWF0Y2hlc0tleSIsImFueU9mIiwiVG9waWMiLCJ1cmwiLCJVUkwiLCJhbGxPZiIsInRoaW5nS2luZCIsIm9yaWdpbmFsSGFzaCIsIm9uZU9mIiwidGhpbmdSZWxhdGVkRWRnZSIsImFsbGNvbW1lbnRzIiwidm90ZXN1cCIsInZvdGVzZG93biIsInJlcGx5VG8iLCJ0aGluZ0hhc2hNYXRjaGVzU291bCIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZyIsInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2giLCJpc0xlZ2FjeVRoaW5nIiwiUHJvb2ZPZldvcmtWb3RlcyIsIiRhc3luYyIsImtleXNBcmVQcm9vZnNPZldvcmsiLCJhbGdvcml0aG0iLCJjb21wbGV4aXR5IiwiaGFzaExlbmd0aCIsInRpbWVDb3N0IiwibWVtb3J5Q29zdCIsInBhcmFsbGVsaXNtIiwiVGhpbmdWb3Rlc1VwIiwiVGhpbmdWb3Rlc0Rvd24iLCJUaGluZ0RhdGEiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWwiLCJ1cCIsImRvd24iLCJjb21tYW5kcyIsIkxpc3RpbmdEYXRhIiwicGF0dGVyblByb3BlcnRpZXMiLCJzb3J0TmFtZSIsImVudW0iLCJUaGluZ0NvbW1lbnRzTGlzdGluZyIsInVzZXJMaXN0aW5nVHlwZSIsIkF1dGhvclJlcGxpZXNMaXN0aW5nIiwiQXV0aG9yUHJvZmlsZUxpc3RpbmciLCJBdXRob3JDb21tZW50cyIsIkF1dGhvclN1Ym1pc3Npb25zIiwiQXV0aG9yVGhpbmdzIiwicm91dGVzIiwiZGVmc1dpdGhSb3V0ZXMiLCJTY2hlbWEiLCJ0YWJ1bGF0b3JRdWVyeSIsInJlcGx5U291bHMiLCJjb21tYW5kTWFwIiwiSlNPTiIsInN0cmluZ2lmeSIsIlRhYnVsYXRvciIsInRvcGljUHJlZml4ZXMiLCJjaGF0bXNnIiwiYmluZCIsImluZGV4IiwicmVjdiIsInRkIiwib2ZmIiwidG9waWNQcmVmaXgiLCJiYXNlVG9waWNOYW1lIiwidG9Mb3dlckNhc2UiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInNldCIsInVybEluZm8iLCJob3N0Iiwic2NoZW1lIiwidXJsTm9kZSIsInB1dCIsImRhdGFTb3VsIiwibWV0YURhdGEiLCJwdWIiLCJ0aGluZ3NTb3VsIiwic3VibWlzc2lvbnNTb3VsIiwiY29tbWVudHNTb3VsIiwicmVqZWN0IiwicGFnZXNTb3VsIiwiY2hhaW4iLCJub25jZSIsInVybFN0ciIsIlRoaW5nRGF0YU5vZGUiLCJkaXNzb2MiLCJkIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImRheU51bSIsImdldFVUQ0RhdGUiLCJUaGluZ1NldCIsInRva2VuTWFwIiwibGluZSIsInRva2VucyIsImNoZWNrIiwia2V5c0luIiwiZ2V0TGFzdFZhbHVlIiwibmV4dCIsInBhaXJzIiwiVG9rZW5pemVyIiwic2NoZW1hIiwibmV3ZXN0IiwiX3NjaGVtYSIsInN1YnN0ciIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXMiLCJzaWduZWRJZCIsImdldElzVGhpbmdSZWxhdGVkRWRnZSIsImFqdiIsIm5vZGVUeXBlTmFtZSIsIl9wU2NoZW1hIiwiX2NQYXRoIiwicGFyZW50RGF0YSIsInByb3BUaGluZ0lkIiwiY29tcGlsZSIsInRoaW5nRGF0YUhhc2hNYXRjaGVzIiwicmVjb3JkIiwiaXNWb3RlVmFsaWQiLCJhcmdvbjIiLCJCdWZmZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImZyb20iLCJzYWx0IiwiaGFzaCIsInJhdyIsIm1hc2siLCJyZXF1aXJlIiwiZGVsZXRlTGVnYWN5IiwicFNjaGVtYSIsImNQYXRoIiwia2V5SW5QYXJlbnQiLCJpbml0QWp2IiwiYWRkS2V5d29yZCIsInZhbGlkYXRlIiwibW9kaWZ5aW5nIiwic3VwcHJlc3NvciIsInJlbW92ZUFkZGl0aW9uYWwiLCJjb250ZXh0Iiwid2lyZUlucHV0IiwibXNnIiwicHJvbWlzZSIsInZhbGlkYXRlZCIsInRvIiwiY2F0Y2giLCJlcnJvciIsInN0YWNrIiwiVmFsaWRhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBRUEsTUFBTUEsTUFBTSxHQUFHQyxDQUFDLENBQUNDLEtBQUYsQ0FDYixDQUFDQyxJQUFELEVBQU9DLFFBQVAsRUFBaUJDLFFBQWpCLEVBQTJCQyxJQUFJLEdBQUcsRUFBbEMsS0FD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OEJMLEdBQTlCLEVBQW1DaHRCLEdBQUcsQ0FBQ3N0QixLQUFKLElBQWF0dEIsR0FBaEQsQ0FOaEI7QUFPRCxDQWpCRCxDQURtQixDQUFyQjtBQXFCTyxNQUFNdXRCLFVBQVUsR0FBRztBQUN4Qm5JLGVBRHdCO0FBRXhCSCxzQkFGd0I7QUFHeEI2Rix3QkFId0I7QUFJeEIzRiw4QkFKd0I7QUFLeEI2Rix1QkFMd0I7QUFNeEJRLHNCQU53QjtBQU94QkUsYUFQd0I7QUFReEJuRyxxQkFSd0I7QUFTeEJpSCxTQVR3QjtBQVV4QkksWUFWd0I7QUFXeEJoTztBQVh3QixDQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4TlA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBQ2UsV0FBS1YsSTs7Ozs7Ozs7Ozs7O0FDYnBCLG9EOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG9EIiwiZmlsZSI6Im5vdGFidWctcGVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJub3RhYnVnLXBlZXJcIiwgW1wiYXJnb24yXCIsIFwiZ3VuLXNjb3BlXCIsIFwiZ3VuLXN1cHByZXNzb3JcIiwgXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIsIFwib2JqZWN0LWhhc2hcIiwgXCJyYW1kYVwiLCBcInJvdXRlLXBhcnNlclwiLCBcInVyaS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcmdvbjJcIl0sIHJvb3RbXCJndW4tc2NvcGVcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3NvclwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yLXNlYXJcIl0sIHJvb3RbXCJvYmplY3QtaGFzaFwiXSwgcm9vdFtcInJhbWRhXCJdLCByb290W1wicm91dGUtcGFyc2VyXCJdLCByb290W1widXJpLWpzXCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5cbmNvbnN0IHNpZ251cCA9IFIuY3VycnkoXG4gIChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQsIG9wdHMgPSB7fSkgPT5cbiAgICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgdXNlci5jcmVhdGUoXG4gICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgYWNrID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjay5lcnIpIHtcbiAgICAgICAgICAgICAgICBmYWlsKGFjay5lcnIpO1xuICAgICAgICAgICAgICAgIHVzZXIubGVhdmUoKTtcbiAgICAgICAgICAgICAgICBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWVyLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkudGhlbihvayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgICAgfVxuICAgIH0pXG4pO1xuXG5jb25zdCBsb2dpbiA9IFIuY3VycnkoKHBlZXIsIHVzZXJuYW1lLCBwYXNzd29yZCkgPT5cbiAgbmV3IFByb21pc2UoKG9rLCBmYWlsKSA9PiB7XG4gICAgaWYgKHBlZXIgJiYgcGVlci5ndW4gJiYgcGVlci5ndW4udXNlcikge1xuICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgdXNlci5hdXRoKHVzZXJuYW1lLCBwYXNzd29yZCwgYWNrID0+XG4gICAgICAgIGFjay5lcnIgPyBmYWlsKGFjay5lcnIpIDogb2socGVlci5ndW4udXNlcigpLmlzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgIH1cbiAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgIHBlZXIuX29uTG9naW4gJiYgcGVlci5fb25Mb2dpbihyZXN1bHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IGxvZ291dCA9IHBlZXIgPT4gcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG5jb25zdCBpc0xvZ2dlZEluID0gcGVlciA9PiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyICYmIHBlZXIuZ3VuLnVzZXIoKS5pcztcbmNvbnN0IG9uTG9naW4gPSBSLmN1cnJ5KChwZWVyLCBmbikgPT4gKHBlZXIuX29uTG9naW4gPSBmbikpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbmV4cG9ydCBjb25zdCBBdXRoZW50aWNhdGlvbiA9IHtcbiAgc2lnbnVwLFxuICBsb2dpbixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBvbkxvZ2luXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCB0b2tlbml6ZSA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIiBcIiksXG4gIFIucmVwbGFjZShDb25zdGFudHMuQ09NTUFORF9SRSwgXCJcIiksXG4gIFIucHJvcE9yKFwiXCIsIDApLFxuICBSLnNwbGl0KFwiXFxuXCIpXG4pO1xuXG5jb25zdCBtYXAgPSB0aGluZ0RhdGEgPT5cbiAgUi5yZWR1Y2UoXG4gICAgKGNtZE1hcCwgaWQpID0+IHtcbiAgICAgIGNvbnN0IGJvZHkgPSBSLnBhdGgoW2lkLCBcImJvZHlcIl0sIHRoaW5nRGF0YSk7XG4gICAgICBjb25zdCBhdXRob3JJZCA9IFIucGF0aChbaWQsIFwiYXV0aG9ySWRcIl0sIHRoaW5nRGF0YSkgfHwgXCJhbm9uXCI7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBwYXJzZUZsb2F0KFIucGF0aChbaWQsIFwidGltZXN0YW1wXCJdLCB0aGluZ0RhdGEpKTtcblxuICAgICAgaWYgKCFSLnRlc3QoQ29uc3RhbnRzLkNPTU1BTkRfUkUsIGJvZHkpKSByZXR1cm4gY21kTWFwO1xuICAgICAgY29uc3QgdG9rZW5pemVkID0gW2F1dGhvcklkLCAuLi50b2tlbml6ZShib2R5KSwgaWRdO1xuXG4gICAgICByZXR1cm4gUi5hc3NvY1BhdGgodG9rZW5pemVkLCB0aW1lc3RhbXAgfHwgMCwgY21kTWFwKTtcbiAgICB9LFxuICAgIHt9LFxuICAgIFIua2V5cyh0aGluZ0RhdGEpXG4gICk7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50Q29tbWFuZCA9IHsgdG9rZW5pemUsIG1hcCB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgQ29uZmlnID0ge1xuICB0YWJ1bGF0b3I6IENvbnN0YW50cy5JTkRFWEVSLFxuICBpbmRleGVyOiBDb25zdGFudHMuSU5ERVhFUixcbiAgb3duZXI6IENvbnN0YW50cy5JTkRFWEVSLFxuICB1cGRhdGU6IFIuY29tcG9zZShcbiAgICBSLm1hcCgoW2tleSwgdmFsXSkgPT4gKENvbmZpZ1trZXldID0gdmFsKSksXG4gICAgUi50b1BhaXJzXG4gIClcbn07XG4iLCJjb25zdCBDT01NQU5EX1JFID0gL14gezR9fi87XG5jb25zdCBQUkVGSVggPSBcIm5hYlwiO1xuY29uc3QgU09VTF9ERUxJTUVURVIgPSBcInx+fnxcIjtcblxuY29uc3QgTElTVElOR19TSVpFID0gMTAwMDtcblxuY29uc3QgTUFYX0hBU0hfU0laRSA9IDY0O1xuY29uc3QgTUFYX1BPV19OT05DRV9TSVpFID0gNjQ7XG5jb25zdCBNQVhfVE9QSUNfU0laRSA9IDQyO1xuY29uc3QgTUFYX0FVVEhPUl9BTElBU19TSVpFID0gMjU2O1xuY29uc3QgTUFYX0FVVEhPUl9JRF9TSVpFID0gMTI4OyAvLyA/Pz9cbmNvbnN0IE1BWF9VUkxfU0laRSA9IDIwNDg7XG5jb25zdCBNQVhfRE9NQUlOX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfVEhJTkdfS0lORF9TSVpFID0gMTY7XG5jb25zdCBNQVhfVEhJTkdfVElUTEVfU0laRSA9IDMwMDtcbmNvbnN0IE1BWF9USElOR19CT0RZX1NJWkUgPSA1MDAwMDtcblxuY29uc3QgTUFYX0xJU1RJTkdfSURTX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFID0gNTAwMDA7XG5jb25zdCBNQVhfTElTVElOR19UQUJTX1NJWkUgPSA1MDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSA9IE1BWF9BVVRIT1JfSURfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFID0gMTY7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX1RZUEVfU0laRSA9IE1BWF9UT1BJQ19TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUgPSAxNjtcblxuY29uc3QgQ0hBVF9QUkVMT0FEX0lURU1TID0gMTA7XG5cbmNvbnN0IElOREVYRVIgPVxuICBcIkNFeUtyRGQxeHlQWHBXU1YwME1ndm5aWTJWSkxIWGd6Q3ZoTWVEd0tUWUEueWpTcTBEeVh6emhCX1pYcl9EemZKZ2lqM3RYVTAtM3QwUTViSkF0WnBqOFwiO1xuXG5leHBvcnQgY29uc3QgQ29uc3RhbnRzID0ge1xuICBDT01NQU5EX1JFLFxuICBQUkVGSVgsXG4gIFNPVUxfREVMSU1FVEVSLFxuICBMSVNUSU5HX1NJWkUsXG4gIE1BWF9IQVNIX1NJWkUsXG4gIE1BWF9QT1dfTk9OQ0VfU0laRSxcbiAgTUFYX1RPUElDX1NJWkUsXG4gIE1BWF9BVVRIT1JfQUxJQVNfU0laRSxcbiAgTUFYX0FVVEhPUl9JRF9TSVpFLFxuICBNQVhfVVJMX1NJWkUsXG4gIE1BWF9ET01BSU5fU0laRSxcbiAgTUFYX1RISU5HX0tJTkRfU0laRSxcbiAgTUFYX1RISU5HX1RJVExFX1NJWkUsXG4gIE1BWF9USElOR19CT0RZX1NJWkUsXG4gIE1BWF9MSVNUSU5HX0lEU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VSQ0VfU0laRSxcbiAgTUFYX0xJU1RJTkdfVEFCU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSxcbiAgQ0hBVF9QUkVMT0FEX0lURU1TLFxuICBJTkRFWEVSXG59O1xuIiwiLyogZ2xvYmFscyBHdW4gKi9cbmltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHNvdWwgPSBSLnBhdGhPcihcIlwiLCBbXCJfXCIsIFwiI1wiXSk7XG5jb25zdCBzdGF0ZSA9IFIucGF0aE9yKHt9LCBbXCJfXCIsIFwiPlwiXSk7XG5cbmNvbnN0IGxhdGVzdCA9IFIuY29tcG9zZShcbiAgUi5sYXN0LFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi52YWx1ZXMsXG4gIHN0YXRlXG4pO1xuXG5jb25zdCBlZGdlcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFwiI1wiKSksXG4gIFIudmFsdWVzXG4pO1xuXG5mdW5jdGlvbiBkZWNvZGVTRUEocmF3RGF0YSkge1xuICBjb25zdCBkYXRhID0gcmF3RGF0YSA/IHsgLi4ucmF3RGF0YSB9IDogcmF3RGF0YTtcbiAgY29uc3Qgc291bCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKCFzb3VsIHx8ICFHdW4uU0VBIHx8IHNvdWwuaW5kZXhPZihcIn5cIikgPT09IC0xKSByZXR1cm4gcmF3RGF0YTtcbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIEd1bi5TRUEudmVyaWZ5KFxuICAgICAgR3VuLlNFQS5vcHQucGFjayhyYXdEYXRhW2tleV0sIGtleSwgcmF3RGF0YSwgc291bCksXG4gICAgICBmYWxzZSxcbiAgICAgIHJlcyA9PiAoZGF0YVtrZXldID0gR3VuLlNFQS5vcHQudW5wYWNrKHJlcywga2V5LCByYXdEYXRhKSlcbiAgICApO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgR3VuTm9kZSA9IHsgc291bCwgc3RhdGUsIGxhdGVzdCwgZWRnZXMsIGRlY29kZVNFQSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UsIHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IG5lZWRzU2NvcmVzID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwic29ydCBob3RcIixcbiAgICBcInNvcnQgdG9wXCIsXG4gICAgXCJzb3J0IGJlc3RcIixcbiAgICBcInNvcnQgY29udHJvdmVyc2lhbFwiLFxuICAgIFwidXBzXCIsXG4gICAgXCJkb3duc1wiLFxuICAgIFwic2NvcmVcIixcbiAgICBcImNhbiByZW1vdmVcIlxuICBdKTtcblxuY29uc3QgbmVlZHNEYXRhID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwidG9waWNcIixcbiAgICBcImRvbWFpblwiLFxuICAgIFwiYXV0aG9yXCIsXG4gICAgXCJ1bmlxdWUgYnkgY29udGVudFwiLFxuICAgIFwia2luZFwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwicmVxdWlyZSBzaWduZWRcIixcbiAgICBcInJlcXVpcmUgYW5vblwiLFxuICAgIFwiYWxpYXNcIixcbiAgICBcImJhbiBkb21haW5cIixcbiAgICBcImJhbiB0b3BpY1wiLFxuICAgIFwiYmFuIGF1dGhvclwiLFxuICAgIFwiYmFuIGFsaWFzXCJcbiAgXSk7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSA9PlxuICBQcm9taXNlLmFsbChcbiAgICBSLm1hcChzb3VsID0+IExpc3RpbmdTb3J0Lml0ZW1Gcm9tU291bChzY29wZSwgc291bCwgZGVmaW5pdGlvbiksIHNvdWxzKVxuICApLnRoZW4oTGlzdGluZ1NvcnQuc29ydEl0ZW1zKVxuKTtcblxuY29uc3QgaXRlbXNGcm9tVGhpbmdTZXRzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgLnRoZW4oUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSkpXG4gICAgLnRoZW4oVGhpbmdTZXQuc291bHMpXG4gICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKVxuKTtcblxuY29uc3QgbGlzdGluZ1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBsaXN0aW5ncyA9IFIucGF0aE9yKFtdLCBbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJsaXN0aW5nc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAobCA9PiBgJHtsfS8ke3NvcnR9YCwgbGlzdGluZ3MpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocyB9O1xufTtcblxuY29uc3QgdG9waWNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCB0b3BpY3MgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidG9waWNzXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIXRvcGljcy5sZW5ndGgpIHRvcGljcy5wdXNoKFwiYWxsXCIpO1xuICAvLyBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcCh0ID0+IGAvdC8ke3R9LyR7c29ydH1gLCB0b3BpY3MpO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC90LyR7dG9waWNzLnNvcnQoKS5qb2luKFwiK1wiKX0vJHtzb3J0fWBdO1xuXG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVRvcGljKHNjb3BlLCB7IHRvcGljcywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGRvbWFpblNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGRvbWFpbnMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiZG9tYWluc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFkb21haW5zLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICAvLyBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChkID0+IGAvZG9tYWluLyR7ZH0vJHtzb3J0fWAsIGRvbWFpbnMpO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC9kb21haW4vJHtkb21haW5zLnNvcnQoKS5qb2luKFwiK1wiKX0vJHtzb3J0fWBdO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlEb21haW4oc2NvcGUsIHsgZG9tYWlucywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGF1dGhvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGF1dGhvcklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJhdXRob3JzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIWF1dGhvcklkcy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9LyR7dHlwZX0vJHtzb3J0fWAsIGF1dGhvcklkcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aUF1dGhvcihzY29wZSwgeyB0eXBlLCBhdXRob3JJZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBjdXJhdG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgY3VyYXRvcnMgPSBSLnByb3AoXCJjdXJhdG9yc1wiLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWN1cmF0b3JzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vY29tbWVudGVkLyR7c29ydH1gLCBjdXJhdG9ycyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5jdXJhdGVkKHNjb3BlLCBjdXJhdG9ycywgdHJ1ZSlcbiAgICAgIC50aGVuKGlkcyA9PiBpZHMubWFwKHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKSlcbiAgICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgb3BTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBzdWJtaXNzaW9uSWRzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcIm9wc1wiXSwgZGVmaW5pdGlvbik7XG5cbiAgaWYgKCFzdWJtaXNzaW9uSWRzLmxlbmd0aCkgdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKFxuICAgIGlkID0+IGAvdGhpbmdzLyR7aWR9L2NvbW1lbnRzLyR7c29ydH1gLFxuICAgIHN1Ym1pc3Npb25JZHNcbiAgKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpU3VibWlzc2lvbihzY29wZSwgeyBzdWJtaXNzaW9uSWRzIH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgcmVwbGllc1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGlkID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInJlcGxpZXNUb1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHR5cGUgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidHlwZVwiXSwgZGVmaW5pdGlvbik7XG5cbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvdXNlci8ke2lkfS9yZXBsaWVzLyR7dHlwZX0vJHtzb3J0fWBdO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkucmVwbGllc1RvQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlLFxuICAgICAgcmVwbGllc1RvQXV0aG9ySWQ6IGlkLFxuICAgICAgaW5kZXhlcjogZGVmaW5pdGlvbi5pbmRleGVyXG4gICAgfSkudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHNvdXJjZXMgPSB7XG4gIGxpc3Rpbmc6IGxpc3RpbmdTb3VyY2UsXG4gIHJlcGxpZXM6IHJlcGxpZXNTb3VyY2UsXG4gIG9wOiBvcFNvdXJjZSxcbiAgY3VyYXRvcjogY3VyYXRvclNvdXJjZSxcbiAgYXV0aG9yOiBhdXRob3JTb3VyY2UsXG4gIGRvbWFpbjogZG9tYWluU291cmNlLFxuICB0b3BpYzogdG9waWNTb3VyY2Vcbn07XG5cbmNvbnN0IHNvdXJjZU5hbWVzID0gUi5rZXlzKHNvdXJjZXMpO1xuY29uc3Qgc291cmNlTmFtZSA9IGRlZiA9PiBSLmZpbmQoZGVmLmlzUHJlc2VudCwgc291cmNlTmFtZXMpIHx8IFwidG9waWNcIjtcbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IG5hbWUgPSBzb3VyY2VOYW1lKGRlZmluaXRpb24pO1xuXG4gIHJldHVybiBSLm1lcmdlTGVmdCh7IG5hbWUgfSwgc291cmNlc1tuYW1lXShkZWZpbml0aW9uKSk7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RhdGFTb3VyY2UgPSB7XG4gIGZyb21EZWZpbml0aW9uLFxuICBzb3VyY2VzLFxuICBuZWVkc1Njb3JlcyxcbiAgbmVlZHNEYXRhLFxuICBpdGVtc0Zyb21UaGluZ1NldHMsXG4gIGl0ZW1zRnJvbVRoaW5nU291bHNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuXG5jb25zdCBmcm9tU291cmNlID0gKHNvdXJjZSwgb3duZXJJZCA9IG51bGwsIHNwYWNlTmFtZSA9IG51bGwpID0+IHtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG4gIGNvbnN0IG9iaiA9IHsgLi4udG9rZW5pemVkIH07XG4gIGNvbnN0IHsgaXNQcmVzZW50LCBnZXRWYWx1ZSwgZ2V0VmFsdWVzLCBnZXRWYWx1ZUNoYWluLCBnZXRQYWlycyB9ID0gdG9rZW5pemVkO1xuXG4gIFtcbiAgICBvYmouZnJvbVBhZ2VBdXRob3IgPSBvd25lcklkLFxuICAgIG9iai5mcm9tUGFnZU5hbWUgPSBzcGFjZU5hbWUgPyBgc3BhY2U6JHtzcGFjZU5hbWV9YCA6IHVuZGVmaW5lZFxuICBdID0gZ2V0VmFsdWVDaGFpbihcInNvdXJjZWQgZnJvbSBwYWdlXCIpO1xuICBvYmouZGlzcGxheU5hbWUgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJuYW1lXCIpIHx8IHNwYWNlTmFtZTtcbiAgb2JqLmluZGV4ZXIgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBDb25maWcuaW5kZXhlcjtcbiAgb2JqLnRhYnVsYXRvciA9IGdldFZhbHVlKFwidGFidWxhdG9yXCIpIHx8IG9iai5pbmRleGVyO1xuICBvYmoudGFicyA9IGdldFBhaXJzKFwidGFiXCIpO1xuICBvYmouc29ydCA9IGdldFZhbHVlKFwic29ydFwiKTtcblxuICAvLyBUT0RPOiBicmVha3Mgd2l0aCBjdXN0b20gbmFtZXNcbiAgaWYgKG9iai5zb3J0ID09PSBcImRlZmF1bHRcIikgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInRhYlwiKTtcblxuICBvYmoudW5pcXVlQnlDb250ZW50ID0gISFpc1ByZXNlbnQoXCJ1bmlxdWUgYnkgY29udGVudFwiKTtcbiAgb2JqLmN1cmF0b3JzID0gZ2V0VmFsdWVzKFwiY3VyYXRvclwiKTtcbiAgb2JqLm1vZGVyYXRvcnMgPSBnZXRWYWx1ZXMoXCJtb2RcIik7XG4gIG9iai5pbmNsdWRlUmFua3MgPSAhIWlzUHJlc2VudChcInNob3cgcmFua3NcIik7XG4gIG9iai5zdGlja3lJZHMgPSBnZXRWYWx1ZXMoXCJzdGlja3lcIik7XG4gIG9iai5pc0lkU3RpY2t5ID0gaWQgPT4gISF0b2tlbml6ZWQuaXNQcmVzZW50KFtcInN0aWNreVwiLCBpZF0pO1xuICBvYmouaXNDaGF0ID0gISFpc1ByZXNlbnQoXCJkaXNwbGF5IGFzIGNoYXRcIik7XG4gIG9iai5zdWJtaXRUb3BpY3MgPSBnZXRWYWx1ZXMoXCJzdWJtaXQgdG9cIik7XG4gIG9iai5zdWJtaXRUb3BpYyA9IGdldFZhbHVlKFwic3VibWl0IHRvXCIpO1xuICBvYmouY2hhdFRvcGljID0gZ2V0VmFsdWUoXCJjaGF0IGluXCIpO1xuXG4gIGlmIChvd25lcklkICYmIHNwYWNlTmFtZSkge1xuICAgIG9iai5zcGFjZU5hbWUgPSBzcGFjZU5hbWU7XG4gICAgb2JqLm93bmVyID0gb3duZXJJZDtcbiAgICBvYmoudXNlRm9yQ29tbWVudHMgPSAhdG9rZW5pemVkLmlzUHJlc2VudChcImNvbW1lbnRzIGxlYXZlIHNwYWNlXCIpO1xuICAgIG9iai5iYXNlUGF0aCA9IGAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke3NwYWNlTmFtZX1gO1xuICAgIGlmIChvYmouc3VibWl0VG9waWMpIG9iai5zdWJtaXRQYXRoID0gYCR7b2JqLmJhc2VQYXRofS9zdWJtaXRgO1xuICAgIG9iai5kZWZhdWx0VGFiID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpO1xuICAgIG9iai5kZWZhdWx0VGFiUGF0aCA9IG9iai5kZWZhdWx0VGFiXG4gICAgICA/IHRva2VuaXplZC5nZXRWYWx1ZShbXCJ0YWJcIiwgb2JqLmRlZmF1bHRUYWJdKVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgb2JqLmZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICBhbGxvdzoge1xuICAgICAgcmVwbGllc1RvOiBnZXRWYWx1ZShcInJlcGxpZXMgdG8gYXV0aG9yXCIpLFxuICAgICAgdHlwZTogZ2V0VmFsdWUoXCJ0eXBlXCIpLCAvLyBUT0RPOiB0aGlzIGZpZWxkIHNlZW1zIHJlZHVuZGFudCB3aXRoIGtpbmQgYW5kIHNob3VsZCBiZSBkZXByZWNhdGVkXG4gICAgICBvcHM6IGdldFZhbHVlcyhcIm9wXCIpLFxuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcInRvcGljXCIpLFxuICAgICAgbGlzdGluZ3M6IGdldFZhbHVlcyhcImxpc3RpbmdcIiksXG4gICAgICBraW5kczogZ2V0VmFsdWVzKFwia2luZFwiKSxcbiAgICAgIGFub246ICFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKVxuICAgIH0sXG4gICAgZGVueToge1xuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYmFuIGFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYmFuIGF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImJhbiBkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcImJhbiB0b3BpY1wiKSxcbiAgICAgIGFub246ICEhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICEhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpLFxuICAgICAgdGFnczogZ2V0UGFpcnMoXCJjYW4gcmVtb3ZlXCIpXG4gICAgfVxuICB9O1xuXG4gIG9iai52b3RlRmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIHVwc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHVwc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWluOiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNaW46IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGJlbG93XCIpLCAxMCkgfHwgbnVsbFxuICB9O1xuXG4gIG9iai5jZW5zb3JzID0gUi51bmlxKFIubWFwKFIucHJvcCgxKSwgb2JqLmZpbHRlcnMuZGVueS50YWdzKSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RlZmluaXRpb24gPSB7IGZyb21Tb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuXG5jb25zdCBpbnRQYXRoID0gcCA9PlxuICBSLmNvbXBvc2UoXG4gICAgcGFyc2VJbnQsXG4gICAgUi5wYXRoKHApXG4gICk7XG5cbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgZmlsdGVycywgdm90ZUZpbHRlcnMsIGlzUHJlc2VudCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0gW107XG4gIGNvbnN0IHZvdGVGaWx0ZXJGdW5jdGlvbnMgPSBbXTtcblxuICBjb25zdCBhZGRGaWx0ZXIgPSAoLi4uZm5zKSA9PiBmaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG4gIGNvbnN0IGFkZFZvdGVGaWx0ZXIgPSAoLi4uZm5zKSA9PiB2b3RlRmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImFsaWFzXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYXV0aG9yXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0ID0+ICEhaXNQcmVzZW50KFtcImRvbWFpblwiLCB0XSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpbixcbiAgICAgIFIucHJvcChcImRhdGFcIilcbiAgICApO1xuXG4gIGlmIChcbiAgICBmaWx0ZXJzLmFsbG93LnRvcGljcy5sZW5ndGggJiZcbiAgICAhUi5maW5kKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLmlkZW50aWNhbChcImFsbFwiKSxcbiAgICAgICAgUi5sYXN0LFxuICAgICAgICBSLnNwbGl0KFwiOlwiKVxuICAgICAgKSxcbiAgICAgIGZpbHRlcnMuYWxsb3cudG9waWNzXG4gICAgKVxuICApXG4gICAgYWRkRmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgbGV0IHRvcGljID0gUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSwgaXRlbSk7XG4gICAgICBjb25zdCBraW5kID0gUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdLCBpdGVtKTtcblxuICAgICAgaWYgKGtpbmQgPT09IFwiY2hhdG1zZ1wiKSB0b3BpYyA9IGBjaGF0OiR7dG9waWN9YDtcbiAgICAgIGlmIChraW5kID09PSBcImNvbW1lbnRcIikgdG9waWMgPSBgY29tbWVudHM6JHt0b3BpY31gO1xuICAgICAgcmV0dXJuICEhaXNQcmVzZW50KFtcInRvcGljXCIsIHRvcGljXSk7XG4gICAgfSk7XG5cbiAgaWYgKGZpbHRlcnMuYWxsb3cua2luZHMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihraW5kID0+ICEhaXNQcmVzZW50KFtcImtpbmRcIiwga2luZF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImtpbmRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cudHlwZSA9PT0gXCJjb21tYW5kc1wiKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi50ZXN0KENvbnN0YW50cy5DT01NQU5EX1JFKSxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJib2R5XCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS5hbGlhc2VzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhbGlhcyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImFsaWFzXCIsIGFsaWFzXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvclwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmF1dGhvcnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGF1dGhvcklkID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYXV0aG9yXCIsIGF1dGhvcklkXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuZG9tYWlucy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgZG9tYWluID0+ICFkb21haW4gfHwgIWlzUHJlc2VudChbXCJiYW5cIiwgXCJkb21haW5cIiwgZG9tYWluXSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpblxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkudG9waWNzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0b3BpYyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcInRvcGljXCIsIHRvcGljXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcInRvcGljXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYW5vbikgYWRkRmlsdGVyKFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5zaWduZWQpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBhdXRob3JJZCA9PiAhYXV0aG9ySWQsXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAodm90ZUZpbHRlcnMudXBzTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMudXBzTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy51cHNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy51cHNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuZG93bnNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5kb3duc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnNjb3JlTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnNjb3JlTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS50YWdzLmxlbmd0aClcbiAgICBhZGRWb3RlRmlsdGVyKHRoaW5nID0+IHtcbiAgICAgIGNvbnN0IGNtZHMgPSBSLnBhdGgoW1widm90ZXNcIiwgXCJjb21tYW5kc1wiXSwgdGhpbmcpIHx8IHt9O1xuXG4gICAgICByZXR1cm4gIWZpbHRlcnMuZGVueS50YWdzLmZpbmQoXG4gICAgICAgIChbdGFnTmFtZSwgYXV0aG9ySWRdKSA9PiAhIVIucGF0aChbYXV0aG9ySWQsIFwidGFnXCIsIHRhZ05hbWVdLCBjbWRzKVxuICAgICAgKTtcbiAgICB9KTtcblxuICBjb25zdCBjb250ZW50RmlsdGVyID0gdGhpbmcgPT4gIWZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB2b3RlRmlsdGVyID0gdGhpbmcgPT4gIXZvdGVGaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3QgdGhpbmdGaWx0ZXIgPSB0aGluZyA9PlxuICAgIGRlZmluaXRpb24uaXNJZFN0aWNreShSLnByb3AoXCJpZFwiLCB0aGluZykpIHx8XG4gICAgKGNvbnRlbnRGaWx0ZXIodGhpbmcpICYmIHZvdGVGaWx0ZXIodGhpbmcpKTtcblxuICByZXR1cm4geyB0aGluZ0ZpbHRlciwgY29udGVudEZpbHRlciwgdm90ZUZpbHRlciB9O1xufTtcblxuY29uc3QgZ2V0RmlsdGVyZWRSb3dzID0gYXN5bmMgKFxuICBzY29wZSxcbiAgc3BlYyxcbiAgc29ydGVkUm93cyxcbiAgeyBsaW1pdDogbGltaXRQcm9wID0gMjUsIGNvdW50OiBjb3VudFByb3AgPSAwLCBhZnRlciA9IG51bGwsIGZpbHRlckZuIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQobGltaXRQcm9wLCAxMCk7XG4gIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoY291bnRQcm9wLCAxMCkgfHwgMDtcbiAgY29uc3Qgcm93cyA9IHNvcnRlZFJvd3Muc2xpY2UoKTtcbiAgY29uc3QgZmlsdGVyZWQgPSBbXTtcbiAgY29uc3QgZmV0Y2hCYXRjaCA9IChzaXplID0gMzApID0+XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICBSLm1hcChhc3luYyByb3cgPT4ge1xuICAgICAgICBsZXQgaW5MaXN0aW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJibGFua1Jvd1wiLCByb3cpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWx0ZXJGbikgaW5MaXN0aW5nID0gYXdhaXQgZmlsdGVyRm4ocm93W0xpc3RpbmdOb2RlLlBPU19JRF0pO1xuICAgICAgICBpZiAoaW5MaXN0aW5nKSBmaWx0ZXJlZC5wdXNoKHJvdyk7XG4gICAgICB9LCByb3dzLnNwbGljZShjb3VudCwgc2l6ZSkpXG4gICAgKTtcblxuICB3aGlsZSAocm93cy5sZW5ndGggPiBjb3VudCkge1xuICAgIGF3YWl0IGZldGNoQmF0Y2goKTtcbiAgICBpZiAobGltaXQgJiYgZmlsdGVyZWQubGVuZ3RoID49IGxpbWl0KSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBSLmNvbXBvc2UoXG4gICAgbGltaXQgPyBSLnNsaWNlKDAsIGxpbWl0KSA6IFIuaWRlbnRpdHksXG4gICAgUi5zb3J0QnkoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19WQUwpKVxuICApKGZpbHRlcmVkKTtcbn07XG5cbmNvbnN0IGdldEZpbHRlcmVkSWRzID0gUi5jb21wb3NlKFxuICB4ID0+IHgudGhlbihSLm1hcChSLnByb3AoTGlzdGluZ05vZGUuUE9TX0lEKSkpLFxuICBnZXRGaWx0ZXJlZFJvd3Ncbik7XG5cbmNvbnN0IHRoaW5nRmlsdGVyID0gUi5jdXJyeSgoc2NvcGUsIHNwZWMsIHRoaW5nSWQpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSksXG4gICAgc2NvcmVzOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc1Njb3JlcyhzcGVjKSxcbiAgICBkYXRhOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc0RhdGEoc3BlYylcbiAgfSkudGhlbihzcGVjLnRoaW5nRmlsdGVyKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdGaWx0ZXIgPSB7XG4gIGZyb21EZWZpbml0aW9uLFxuICBnZXRGaWx0ZXJlZFJvd3MsXG4gIGdldEZpbHRlcmVkSWRzLFxuICB0aGluZ0ZpbHRlclxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcblxuY29uc3QgW1BPU19JRFgsIFBPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMSwgMiwgM107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHJvd3NUb0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHJvd3NUb0l0ZW1zID0gUi5tYXAoUi5zbGljZSgxLCAzKSk7XG5jb25zdCBzb3VyY2UgPSBSLnByb3BPcihcIlwiLCBcInNvdXJjZVwiKTtcbmNvbnN0IHNvdWxGcm9tUGF0aCA9IFIuY3VycnkoXG4gIChpbmRleGVyLCBwYXRoKSA9PiBgJHtDb25zdGFudHMuUFJFRklYfSR7cGF0aH1AfiR7aW5kZXhlcn0uYFxuKTtcbmNvbnN0IHBhdGhGcm9tU291bCA9IFIuY29tcG9zZShcbiAgUi5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke0NvbnN0YW50cy5QUkVGSVh9YCksIFwiXCIpLFxuICBSLnJlcGxhY2UoL0B+LipcXC4vLCBcIlwiKVxuKTtcblxuY29uc3QgaWRUb1NvdWwgPSB0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KTtcbmNvbnN0IGlkc1RvU291bHMgPSBSLm1hcChpZFRvU291bCk7XG5jb25zdCBzb3VsVG9JZCA9IHNvdWwgPT4gUi5wcm9wKFwidGhpbmdJZFwiLCBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goc291bCkpO1xuY29uc3Qgc291bHNUb0lkcyA9IFIubWFwKHNvdWxUb0lkKTtcblxuY29uc3QgZ2V0Um93ID0gUi5jdXJyeSgobm9kZSwgaWR4KSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmluc2VydCgwLCBwYXJzZUludChpZHgsIDEwKSksIFIuYWx3YXlzKG51bGwpKSxcbiAgICByb3cgPT4ge1xuICAgICAgcm93WzFdID0gcGFyc2VGbG9hdChyb3dbMV0pO1xuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LFxuICAgIFIubWFwKFIudHJpbSksXG4gICAgUi5zcGxpdChcIixcIiksXG4gICAgUi5wcm9wT3IoXCJcIiwgYCR7aWR4fWApXG4gICkobm9kZSlcbik7XG5cbmNvbnN0IGl0ZW1LZXlzID0gUi5jb21wb3NlKFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICB2YWwgPT4gISEodmFsID09PSAwIHx8IHZhbCksXG4gICAgICBwYXJzZUludFxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCBzZXJpYWxpemUgPSBSLmN1cnJ5KChzcGVjLCBpdGVtcykgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIuYWRkSW5kZXgoUi5yZWR1Y2UpKFxuICAgICAgKHJlcywgcm93LCBpZHgpID0+IFIuYXNzb2MoYCR7aWR4fWAsIHJvdy5qb2luKFwiLFwiKSwgcmVzKSxcbiAgICAgIHt9XG4gICAgKSxcbiAgICBSLmRlZmF1bHRUbyhbXSlcbiAgKShpdGVtcylcbik7XG5cbmNvbnN0IHJvd3MgPSBub2RlID0+XG4gIFIuY29tcG9zZShcbiAgICBSLm1hcChnZXRSb3cobm9kZSkpLFxuICAgIGl0ZW1LZXlzXG4gICkobm9kZSk7XG5cbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgcm93c1RvSWRzLFxuICByb3dzXG4pO1xuXG5jb25zdCBzb3J0Um93cyA9IFIuc29ydFdpdGgoW1xuICBSLmFzY2VuZChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLmNvbmQoW1tSLmlzTmlsLCBSLmFsd2F5cyhJbmZpbml0eSldLCBbUi5ULCBwYXJzZUZsb2F0XV0pLFxuICAgICAgUi5wcm9wKFBPU19WQUwpXG4gICAgKVxuICApXG5dKTtcblxuY29uc3Qgc29ydGVkSWRzID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgcm93c1xuKTtcblxuY29uc3QgaXRlbXNUb1Jvd3MgPSBSLmFkZEluZGV4KFIubWFwKSgoaXRlbSwgaWR4KSA9PiBbaWR4LCAuLi5pdGVtXSk7XG5cbmNvbnN0IGRpZmYgPSBhc3luYyAoXG4gIG5vZGUsXG4gIHVwZGF0ZWRJdGVtcyA9IFtdLFxuICByZW1vdmVJZHMgPSBbXSxcbiAgeyBtYXhTaXplID0gMTAwMCB9ID0ge31cbikgPT4ge1xuICBjb25zdCByZW1vdmVkID0gUi5pbmRleEJ5KFIuaWRlbnRpdHksIHJlbW92ZUlkcyk7XG4gIGNvbnN0IGJ5SWQgPSB7fTtcbiAgY29uc3QgY2hhbmdlcyA9IHt9O1xuICBjb25zdCByb3dzID0gW107XG4gIGNvbnN0IHVwZGF0ZWQgPSB7fTtcbiAgbGV0IHRvUmVwbGFjZSA9IFtdO1xuICBsZXQgbWF4SWR4ID0gMDtcbiAgbGV0IGtleTtcblxuICBmb3IgKGtleSBpbiBub2RlIHx8IHt9KSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoa2V5LCAxMCk7XG5cbiAgICBpZiAoIShwYXJzZWQgfHwgcGFyc2VkID09PSAwKSkgY29udGludWU7XG4gICAgY29uc3Qgcm93ID0gZ2V0Um93KG5vZGUsIGtleSkgfHwgW3BhcnNlZCwgbnVsbCwgbnVsbF07XG4gICAgY29uc3QgW2lkeCwgaWQgPSBudWxsLCByYXdWYWx1ZSA9IG51bGxdID0gcm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICByb3dbUE9TX1ZBTF0gPSByYXdWYWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBwYXJzZUZsb2F0KHJhd1ZhbHVlKTtcbiAgICBpZiAoaWQgJiYgcmVtb3ZlZFtpZF0pIHJvd1tQT1NfSURdID0gcm93W1BPU19WQUxdID0gbnVsbDtcbiAgICBpZiAoaWQpIGJ5SWRbaWRdID0gcm93O1xuICAgIGlmIChyb3dbUE9TX0lEXSkge1xuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvUmVwbGFjZS5wdXNoKHJvdyk7XG4gICAgfVxuICAgIGlmIChpZHggPiBtYXhJZHgpIG1heElkeCA9IGlkeDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW2lkLCB2YWx1ZV0gPSB1cGRhdGVkSXRlbXNbaV0gfHwgW251bGwsIG51bGxdO1xuXG4gICAgaWYgKCFpZCkgY29udGludWU7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBieUlkW2lkXTtcblxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgaWYgKGV4aXN0aW5nW1BPU19WQUxdICE9PSB2YWx1ZSkge1xuICAgICAgICBleGlzdGluZ1tQT1NfVkFMXSA9IHZhbHVlO1xuICAgICAgICB1cGRhdGVkW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtudWxsLCBpZCwgdmFsdWVdO1xuXG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhbGxTb3J0ZWQgPSBzb3J0Um93cyhyb3dzKTtcbiAgY29uc3Qgc29ydGVkID0gbWF4U2l6ZSA/IGFsbFNvcnRlZC5zbGljZSgwLCBtYXhTaXplKSA6IGFsbFNvcnRlZDtcbiAgY29uc3QgbWlzc2luZyA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UobWF4U2l6ZSwgYWxsU29ydGVkLmxlbmd0aCkgOiBbXTtcbiAgY29uc3QgYWRkZWQgPSBSLmZpbHRlcihyb3cgPT4gcm93W1BPU19JRFhdID09PSBudWxsLCBzb3J0ZWQpO1xuXG4gIHRvUmVwbGFjZSA9IHRvUmVwbGFjZVxuICAgIC5jb25jYXQoUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSAhPT0gbnVsbCwgbWlzc2luZykpXG4gICAgLnJldmVyc2UoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGlkID0gc29ydGVkW2ldW1BPU19JRF07XG4gICAgY29uc3QgaWR4ID0gc29ydGVkW2ldW1BPU19JRFhdO1xuICAgIGNvbnN0IHZhbCA9IHNvcnRlZFtpXVtQT1NfVkFMXTtcblxuICAgIGlmIChpZHggIT09IG51bGwgJiYgdXBkYXRlZFtpZF0pIGNoYW5nZXNbYCR7aWR4fWBdID0gW2lkLCB2YWxdLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgY29uc3QgaW5zZXJ0ZWQgPSBbXTtcblxuICB3aGlsZSAoYWRkZWQubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gYWRkZWQucG9wKCk7XG4gICAgY29uc3QgcmVwbGFjZWQgPSB0b1JlcGxhY2UucG9wKCk7XG4gICAgbGV0IFtpZHhdID0gcmVwbGFjZWQgfHwgW251bGxdO1xuXG4gICAgaWYgKGlkeCA9PT0gbnVsbCkge1xuICAgICAgaWR4ID0gcGFyc2VJbnQobWF4SWR4LCAxMCkgKyBpbnNlcnRlZC5sZW5ndGggKyAxO1xuICAgICAgaW5zZXJ0ZWQucHVzaChpZHgpO1xuICAgIH1cblxuICAgIGNoYW5nZXNbYCR7aWR4fWBdID0gW3Jvd1tQT1NfSURdLCByb3dbUE9TX1ZBTF1dLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgd2hpbGUgKHRvUmVwbGFjZS5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSB0b1JlcGxhY2UucG9wKCk7XG5cbiAgICBpZiAocm93ICYmICFyb3dbUE9TX0lEXSkge1xuICAgICAgY29uc3QgaWR4ID0gYCR7cm93W1BPU19JRFhdfWA7XG5cbiAgICAgIGlmIChub2RlW2lkeF0gIT09IG51bGwpIHtcbiAgICAgICAgY2hhbmdlc1tpZHhdID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJudWxsaW5nXCIsIGlkeCwgbm9kZVtpZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gUi5rZXlzKGNoYW5nZXMpLmxlbmd0aCA/IGNoYW5nZXMgOiBudWxsO1xufTtcblxuY29uc3QgY2F0ZWdvcml6ZURpZmYgPSAoZGlmZiwgb3JpZ2luYWwpID0+IHtcbiAgY29uc3QgYWxsS2V5cyA9IGl0ZW1LZXlzKFIubWVyZ2VMZWZ0KGRpZmYsIG9yaWdpbmFsKSk7XG4gIGNvbnN0IGFkZGVkID0gW107XG4gIGNvbnN0IHJlbW92ZWQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBhbGxLZXlzW2ldO1xuICAgIGNvbnN0IFtfZGlmZklkeCwgZGlmZklkXSA9IGdldFJvdyhkaWZmLCBrZXkpIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgY29uc3QgW19vcmlnSWR4LCBvcmlnSWRdID0gZ2V0Um93KG9yaWdpbmFsLCBrZXkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICBpZiAoZGlmZklkICE9PSBvcmlnSWQpIHtcbiAgICAgIGlmIChkaWZmSWQpIGFkZGVkLnB1c2goZGlmZklkKTtcbiAgICAgIGlmIChvcmlnSWQpIHJlbW92ZWQucHVzaChvcmlnSWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbYWRkZWQsIHJlbW92ZWRdO1xufTtcblxuY29uc3QgdW5pb25Sb3dzID0gUi5jb21wb3NlKFxuICBSLnVuaXFCeShSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLnJlZHVjZShSLmNvbmNhdCwgW10pLFxuICBSLm1hcChyb3dzKVxuKTtcblxuY29uc3Qgcm93c0Zyb21Tb3VscyA9IHF1ZXJ5KChzY29wZSwgc291bHMpID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKS50aGVuKHVuaW9uUm93cylcbik7XG5cbmNvbnN0IHJlYWQgPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgeyBpbmRleGVyID0gQ29uZmlnLmluZGV4ZXIgfSA9IG9wdHMgfHwge307XG5cbiAgcmV0dXJuIHJvd3NGcm9tU291bHMoc2NvcGUsIFtzb3VsRnJvbVBhdGgoaW5kZXhlciwgcGF0aCldKS50aGVuKHJvd3NUb0lkcyk7XG59LCBcImxpc3RpbmdSb3dzXCIpO1xuXG5jb25zdCBnZXQgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3VsKSA9PiAoc291bCA/IHNjb3BlLmdldChzb3VsKSA6IHJlc29sdmUobnVsbCkpLFxuICBcImxpc3RpbmdcIlxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdOb2RlID0ge1xuICBQT1NfSURYLFxuICBQT1NfSUQsXG4gIFBPU19WQUwsXG4gIHNvdXJjZSxcbiAgZ2V0LFxuICBnZXRSb3csXG4gIGl0ZW1LZXlzLFxuICBzZXJpYWxpemUsXG4gIHJvd3MsXG4gIGlkcyxcbiAgaWRUb1NvdWwsXG4gIGlkc1RvU291bHMsXG4gIHNvdWxUb0lkLFxuICBzb3Vsc1RvSWRzLFxuICByb3dzVG9JZHMsXG4gIHJvd3NUb0l0ZW1zLFxuICBpdGVtc1RvUm93cyxcbiAgc29ydFJvd3MsXG4gIHNvcnRlZElkcyxcbiAgc291bEZyb21QYXRoLFxuICBwYXRoRnJvbVNvdWwsXG4gIHJvd3NGcm9tU291bHMsXG4gIHJlYWQsXG4gIGRpZmYsXG4gIGNhdGVnb3JpemVEaWZmLFxuICB1bmlvblJvd3Ncbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5jb25zdCB1cGRhdGVMaXN0aW5nID0gYXN5bmMgKFxuICBvcmMsXG4gIHJvdXRlLFxuICBzY29wZSxcbiAgc3BlYyxcbiAgaWRzID0gW10sXG4gIHJlbW92ZUlkcyA9IFtdXG4pID0+IHtcbiAgaWYgKCFpZHMubGVuZ3RoICYmICFyZW1vdmVJZHMubGVuZ3RoKSByZXR1cm47XG4gIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgb3JjLm5ld1Njb3BlKCkuZ2V0KHJvdXRlLnNvdWwpO1xuICBjb25zdCB1cGRhdGVkSXRlbXMgPSBhd2FpdCBMaXN0aW5nU29ydC50b0l0ZW1zKHNjb3BlLCBpZHMsIHNwZWMpO1xuICBjb25zdCBjaGFuZ2VzID0gYXdhaXQgTGlzdGluZ05vZGUuZGlmZihleGlzdGluZywgdXBkYXRlZEl0ZW1zLCByZW1vdmVJZHMpO1xuXG4gIGlmIChjaGFuZ2VzKSBjb25zb2xlLmxvZyhcIkNIQU5HRVNcIiwgcm91dGUuc291bCwgY2hhbmdlcyk7XG4gIGlmIChjaGFuZ2VzKSByb3V0ZS53cml0ZShjaGFuZ2VzKTtcbn07XG5cbmNvbnN0IG9uUHV0ID0gYXN5bmMgKG9yYywgcm91dGUsIHsgc291bCwgdXBkYXRlZFNvdWwsIGRpZmYsIC4uLnByb3BzIH0pID0+IHtcbiAgbGV0IHVwZGF0ZWRJZHMgPSBbXTtcblxuICBjb25zdCBwYXRoID0gTGlzdGluZ05vZGUucGF0aEZyb21Tb3VsKHNvdWwpO1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuICBjb25zdCBzcGVjID0gYXdhaXQgTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoKTtcblxuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUubWF0Y2godXBkYXRlZFNvdWwpIHx8IHt9O1xuICBjb25zdCBpc1N0aWNreSA9IFIuZXF1YWxzKHJvdXRlLm1hdGNoLnRoaW5nSWQgfHwgbnVsbCk7XG5cbiAgaWYgKHRoaW5nSWQpIHVwZGF0ZWRJZHMucHVzaCh0aGluZ0lkKTtcbiAgdXBkYXRlZElkcyA9IFIuY29uY2F0KHVwZGF0ZWRJZHMsIFRoaW5nU2V0LmlkcyhHdW5Ob2RlLmRlY29kZVNFQShkaWZmKSkpO1xuXG4gIGF3YWl0IHVwZGF0ZUxpc3Rpbmcob3JjLCByb3V0ZSwgc2NvcGUsIHNwZWMsIHVwZGF0ZWRJZHMsIFtdLCBpc1N0aWNreSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nT3JhY2xlID0ge1xuICB1cGRhdGVMaXN0aW5nLFxuICBvblB1dFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IGNhbGN1bGF0ZVJvd3MgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT4ge1xuICBjb25zdCBmaWx0ZXJGbiA9IExpc3RpbmdGaWx0ZXIudGhpbmdGaWx0ZXIoc2NvcGUsIHNwZWMpO1xuICBjb25zdCBzdGlja3lJdGVtcyA9IFIubWFwKGlkID0+IFtpZCwgLUluZmluaXR5XSwgc3BlYy5zdGlja3lJZHMpO1xuXG4gIGlmICghc3BlYy5kYXRhU291cmNlLnF1ZXJ5KSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gIHJldHVybiBzcGVjLmRhdGFTb3VyY2UucXVlcnkoc2NvcGUpLnRoZW4oaXRlbXMgPT4ge1xuICAgIGNvbnN0IHJvd3MgPSBMaXN0aW5nTm9kZS5pdGVtc1RvUm93cyhbLi4uc3RpY2t5SXRlbXMsIC4uLml0ZW1zXSk7XG5cbiAgICByZXR1cm4gTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZFJvd3Moc2NvcGUsIHNwZWMsIHJvd3MsIHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICBmaWx0ZXJGblxuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5jb25zdCBjYWxjdWxhdGUgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT4ge30pO1xuXG5jb25zdCB0b05vZGUgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMpID0+XG4gIGNhbGN1bGF0ZVJvd3Moc2NvcGUsIHNwZWMsIG9wdHMpLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgTGlzdGluZ05vZGUuc2VyaWFsaXplKHNwZWMpLFxuICAgICAgTGlzdGluZ05vZGUucm93c1RvSXRlbXNcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHJlYWQgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT4ge1xuICBjb25zdCBmaWx0ZXJGbiA9IExpc3RpbmdGaWx0ZXIudGhpbmdGaWx0ZXIoc2NvcGUsIHNwZWMpO1xuICBjb25zdCBwYXRocyA9IFIucGF0aE9yKFtdLCBbXCJkYXRhU291cmNlXCIsIFwibGlzdGluZ1BhdGhzXCJdLCBzcGVjKTtcbiAgY29uc3Qgc3RpY2t5Um93cyA9IFIubWFwKGlkID0+IFstMSwgaWQsIC1JbmZpbml0eV0sIHNwZWMuc3RpY2t5SWRzKTtcbiAgY29uc3Qgc291bHMgPSBSLm1hcChcbiAgICBMaXN0aW5nTm9kZS5zb3VsRnJvbVBhdGgob3B0cy5pbmRleGVyIHx8IHNwZWMuaW5kZXhlciksXG4gICAgcGF0aHNcbiAgKTtcblxuICByZXR1cm4gTGlzdGluZ05vZGUucm93c0Zyb21Tb3VscyhzY29wZSwgc291bHMpLnRoZW4ocm93cyA9PlxuICAgIExpc3RpbmdGaWx0ZXIuZ2V0RmlsdGVyZWRJZHMoc2NvcGUsIHNwZWMsIFsuLi5zdGlja3lSb3dzLCAuLi5yb3dzXSwge1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGZpbHRlckZuXG4gICAgfSlcbiAgKTtcbn0pO1xuXG5jb25zdCBmcm9tU3BlYyA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PlxuICAob3B0cy5jYWxjdWxhdGUgPyBjYWxjdWxhdGUgOiByZWFkKShzY29wZSwgc3BlYywgb3B0cylcbik7XG5cbmNvbnN0IGZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBMaXN0aW5nVHlwZS5mcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUpIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICByZXR1cm4gdHlwZS5nZXRTcGVjKHNjb3BlLCB0eXBlLm1hdGNoKS50aGVuKHNwZWMgPT4ge1xuICAgIGlmIChzcGVjLmhhc0luZGV4ZXIgJiYgIW9wdHMuY2FsY3VsYXRlKSB7XG4gICAgICBpZiAoIXR5cGUgfHwgIXR5cGUucmVhZCkgcmV0dXJuIExpc3RpbmdOb2RlLnJlYWQoc2NvcGUsIHBhdGgsIG9wdHMpO1xuICAgICAgcmV0dXJuIHR5cGUucmVhZChzY29wZSwgdHlwZS5tYXRjaCwgb3B0cyk7XG4gICAgfVxuICAgIHJldHVybiBmcm9tU3BlYyhzY29wZSwgc3BlYywgb3B0cyk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IG5vZGVGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT5cbiAgTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoKS50aGVuKHNwZWMgPT5cbiAgICB0b05vZGUoc2NvcGUsIHNwZWMsIFIubWVyZ2VMZWZ0KG9wdHMsIHsgbGltaXQ6IENvbnN0YW50cy5MSVNUSU5HX1NJWkUgfSkpXG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nUXVlcnkgPSB7XG4gIGZyb21TcGVjLFxuICBmcm9tUGF0aCxcbiAgY2FsY3VsYXRlUm93cyxcbiAgdG9Ob2RlLFxuICBub2RlRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuXG5jb25zdCBbUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxXTtcbmNvbnN0IHRvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgc29ydEl0ZW1zID0gUi5zb3J0QnkoUi5wcm9wKFBPU19WQUwpKTtcblxuY29uc3Qgdm90ZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+IHtcbiAgaWYgKHNwZWMuaXNJZFN0aWNreSh0aGluZ0lkKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcbiAgaWYgKFIuY29udGFpbnModGhpbmdJZCwgc3BlYy5maWx0ZXJzLmFsbG93Lm9wcykpIHJldHVybiByZXNvbHZlKC1JbmZpbml0eSk7XG5cbiAgcmV0dXJuIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgc2NvcmVzOiB0cnVlLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pXG4gIH0pLnRoZW4ocmVzID0+IGZuKHJlcywgc3BlYykpO1xufSk7XG5cbmNvbnN0IHRpbWVTb3J0ID0gZm4gPT4gcXVlcnkoKHNjb3BlLCB0aGluZ0lkLCBzcGVjKSA9PlxuICBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pXG4gIH0pLnRoZW4oZm4pXG4pO1xuXG5jb25zdCBzb3J0cyA9IHtcbiAgbmV3OiB0aW1lU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm11bHRpcGx5KC0xKSxcbiAgICAgIFIuZGVmYXVsdFRvKDApLFxuICAgICAgUi5wcm9wKFwidGltZXN0YW1wXCIpLFxuICAgIClcbiAgKSxcbiAgb2xkOiB0aW1lU29ydChSLnByb3AoXCJ0aW1lc3RhbXBcIikpLFxuICBhY3RpdmU6IHZvdGVTb3J0KFxuICAgICh7IHRpbWVzdGFtcCwgbGFzdEFjdGl2ZSB9KSA9PiAtMSAqIChsYXN0QWN0aXZlIHx8IHRpbWVzdGFtcClcbiAgKSxcbiAgdG9wOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VJbnQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSlcbiAgICApXG4gICksXG4gIGNvbW1lbnRzOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VGbG9hdCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0pXG4gICAgKVxuICApLFxuICBkaXNjdXNzZWQ6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuXG4gICAgaWYgKCFzY29yZSkgcmV0dXJuIDEwMDAwMDAwMDAgLSBzZWNvbmRzO1xuICAgIHJldHVybiAtMSAqIChvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBob3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcbiAgICBsZXQgc2lnbiA9IDA7XG5cbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICBzaWduID0gMTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlIDwgMCkge1xuICAgICAgc2lnbiA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gLTEgKiAoc2lnbiAqIG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGJlc3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgbiA9IHVwcyArIGRvd25zO1xuXG4gICAgaWYgKG4gPT09IDApIHJldHVybiAwO1xuICAgIGNvbnN0IHogPSAxLjI4MTU1MTU2NTU0NTsgLy8gODAlIGNvbmZpZGVuY2VcbiAgICBjb25zdCBwID0gdXBzIC8gbjtcbiAgICBjb25zdCBsZWZ0ID0gcCArICgxIC8gKDIgKiBuKSkgKiB6ICogejtcbiAgICBjb25zdCByaWdodCA9IHogKiBNYXRoLnNxcnQoKHAgKiAoMSAtIHApKSAvIG4gKyAoeiAqIHopIC8gKDQgKiBuICogbikpO1xuICAgIGNvbnN0IHVuZGVyID0gMSArICgxIC8gbikgKiB6ICogejtcblxuICAgIHJldHVybiAtMSAqICgobGVmdCAtIHJpZ2h0KSAvIHVuZGVyKTtcbiAgfSksXG4gIGNvbnRyb3ZlcnNpYWw6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG5cbiAgICBpZiAodXBzIDw9IDAgfHwgZG93bnMgPD0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbWFnbml0dWRlID0gdXBzICsgZG93bnM7XG4gICAgY29uc3QgYmFsYW5jZSA9IHVwcyA+IGRvd25zID8gZG93bnMgLyB1cHMgOiB1cHMgLyBkb3ducztcblxuICAgIHJldHVybiAtMSAqIG1hZ25pdHVkZSAqKiBiYWxhbmNlO1xuICB9KVxufTtcblxuY29uc3QgaXNWYWxpZFNvcnQgPSBzb3J0ID0+ICEhc29ydHNbc29ydF07XG5cbmNvbnN0IHRvSXRlbSA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkLCBzcGVjKSA9PlxuICAgIChzb3J0c1tzcGVjLnNvcnRdIHx8IHNvcnRzLm5ldykoc2NvcGUsIGlkLCBzcGVjKS50aGVuKHZhbCA9PiBbaWQsIHZhbF0pXG4pO1xuXG5jb25zdCBpdGVtRnJvbVNvdWwgPSAoc2NvcGUsIHNvdWwsIHNwZWMpID0+IHRvSXRlbShzY29wZSwgTGlzdGluZ05vZGUuc291bFRvSWQoc291bCksIHNwZWMpO1xuXG5jb25zdCB0b0l0ZW1zID0gcXVlcnkoXG4gIChzY29wZSwgaWRzLCBzcGVjKSA9PiBhbGwoUi5tYXAoXG4gICAgaWQgPT4gdG9JdGVtKHNjb3BlLCBpZCwgc3BlYyksXG4gICAgaWRzXG4gICkpXG4pO1xuXG5jb25zdCBmcm9tVGhpbmdTZXRzID0gcXVlcnkoXG4gIChzY29wZSwgc291bHMsIHNwZWMpID0+XG4gICAgYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgICAgLnRoZW4oUi5waXBlKFxuICAgICAgICBUaGluZ1NldC51bmlvbixcbiAgICAgICAgVGhpbmdTZXQuaWRzLFxuICAgICAgICBpZHMgPT4gdG9JdGVtcyhzY29wZSwgaWRzLCBzcGVjKVxuICAgICAgKSlcbiAgICAgIC50aGVuKHNvcnRJdGVtcylcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU29ydCA9IHtcbiAgUE9TX0lELFxuICBQT1NfVkFMLFxuICBzb3J0cyxcbiAgaXNWYWxpZFNvcnQsXG4gIHRvSXRlbSxcbiAgdG9JdGVtcyxcbiAgdG9JZHMsXG4gIGl0ZW1Gcm9tU291bCxcbiAgc29ydEl0ZW1zLFxuICBmcm9tVGhpbmdTZXRzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmltcG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSBSLmNvbXBvc2UoXG4gIFIuYXBwbHkoUi5tZXJnZUxlZnQpLFxuICBSLmFwKFtMaXN0aW5nRmlsdGVyLmZyb21EZWZpbml0aW9uLCBSLmlkZW50aXR5XSksXG4gIFIub2YsXG4gIFIuYXBwbHkoUi5hc3NvYyhcImRhdGFTb3VyY2VcIikpLFxuICBSLmFwKFtMaXN0aW5nRGF0YVNvdXJjZS5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBMaXN0aW5nRGVmaW5pdGlvbi5mcm9tU291cmNlXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSA9IFwiXCIpID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSlcbiAgICAudGhlbihSLmNvbXBvc2UoXG4gICAgICBib2R5ID0+IGAke2JvZHl9XG4jIGFkZGVkIGJ5IGluZGV4ZXJcbiR7ZXh0cmEgfHwgXCJcIn1cbnNvdXJjZWQgZnJvbSBwYWdlICR7YXV0aG9ySWR9ICR7bmFtZX1cbmAsXG4gICAgICBUaGluZ0RhdGFOb2RlLmJvZHlcbiAgICApKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTcGVjID0geyBmcm9tU291cmNlLCBnZXRTb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljL2NoYXRcIjtcbmNvbnN0IHRhYnMgPSBbIC4uLlRvcGljTGlzdGluZy50YWJzLCBcImNoYXRcIiBdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNoYXQ6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3Qgbm9ybWFsVG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCBgY2hhdDoke3RvcGljfWBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y2hhdFwiLFxuICAgIFtcbiAgICAgIFwic29ydCBuZXdcIixcbiAgICAgIFwiZGlzcGxheSBhcyBjaGF0XCIsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ2hhdExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90aGluZ3MvOnRoaW5nSWQvY29tbWVudHMvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNvbW1lbnRzOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0aGluZ0lkLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y29tbWVudHNcIixcbiAgICBbYG9wICR7dGhpbmdJZH1gLCBgc29ydCAke3NvcnR9YF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvY29tbWVudGVkLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjb21tZW50ZWQ6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y29tbWVudGVkXCIsXG4gICAgW1xuICAgICAgYGN1cmF0b3IgJHthdXRob3JJZH1gLFxuICAgICAgYHNvcnQgJHtzb3J0fWBcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ZWRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTaWRlYmFyLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG5cbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi9kb21haW4vOmRvbWFpbi86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpkb21haW46c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiwgc29ydCB9KSA9PiB7XG4gIGNvbnN0IGRvbWFpbnMgPSBQYXRoLnNwbGl0VG9waWNzKGRvbWFpbik7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6ZG9tYWluXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHtkb21haW5zWzBdfWAsXG4gICAgICBcInN1Ym1pdCB0byB3aGF0ZXZlclwiLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICBcImtpbmQgc3VibWlzc2lvblwiLFxuICAgICAgLi4uUi5tYXAoZG9tYWluID0+IGBkb21haW4gJHtkb21haW59YCwgZG9tYWlucyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL2RvbWFpbi8ke2RvbWFpbn0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IERvbWFpbkxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIHRhYnMsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy9maXJlaG9zZVwiO1xuY29uc3QgdGFicyA9IFRvcGljTGlzdGluZy50YWJzO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6ZmlyZWhvc2U6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3Qgbm9ybWFsVG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCB0b3BpYywgYGNoYXQ6JHt0b3BpY31gLCBgY29tbWVudHM6JHt0b3BpY31gXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmZpcmVob3NlXCIsXG4gICAgW1xuICAgICAgXCJzb3J0IG5ld1wiLFxuICAgICAgXCJkaXNwbGF5IGFzIGNoYXRcIixcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBGaXJlaG9zZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHRhYnMsXG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uLy4uL1RoaW5nXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzp0b3BpYzpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgPSBcIm5ld1wiIH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6aW5ib3hcIixcbiAgICBbYHJlcGxpZXMgdG8gYXV0aG9yICR7YXV0aG9ySWR9YCwgXCJraW5kIGNvbW1lbnRcIiwgYHR5cGUgJHt0eXBlfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChvcmMsIHJvdXRlLCB7IHVwZGF0ZWRTb3VsLCBkaWZmIH0pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRBdXRob3JlZF0gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihkaWZmRGF0YSk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGxldCB1cGRhdGVkSWRzID0gVGhpbmdTZXQuaWRzKGRpZmZEYXRhKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRBdXRob3JlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wSWQgPSB1cGRhdGVkQXV0aG9yZWRbaV07XG4gICAgY29uc3QgcmVwbHlJZHMgPSBUaGluZ1NldC5pZHMoXG4gICAgICBhd2FpdCBzY29wZVxuICAgICAgICAuZ2V0KFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcElkIH0pKVxuICAgICAgICAudGhlbigpXG4gICAgKTtcblxuICAgIHVwZGF0ZWRJZHMgPSB1cGRhdGVkSWRzLmNvbmNhdChyZXBseUlkcyk7XG4gIH1cblxuICBpZiAodXBkYXRlZElkcy5sZW5ndGgpXG4gICAgYXdhaXQgTGlzdGluZ09yYWNsZS51cGRhdGVMaXN0aW5nKG9yYywgcm91dGUsIHNjb3BlLCBzcGVjLCB1cGRhdGVkSWRzLCBbXSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBJbmJveExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlYyxcbiAgb25QdXRcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wib3ZlcnZpZXdcIiwgXCJjb21tZW50c1wiLCBcInN1Ym1pdHRlZFwiLCBcImNvbW1hbmRzXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6cHJvZmlsZTpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpwcm9maWxlXCIsXG4gICAgW1xuICAgICAgYGF1dGhvciAke2F1dGhvcklkfWAsXG4gICAgICBgdHlwZSAke3R5cGV9YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC91c2VyLyR7YXV0aG9ySWR9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBRdWVyeS51c2VyTWV0YShzY29wZSwgbWF0Y2guYXV0aG9ySWQpLnRoZW4obWV0YSA9PlxuICAgIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oUi5waXBlKFxuICAgICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSxcbiAgICAgIFIubWVyZ2VMZWZ0KHtcbiAgICAgICAgcHJvZmlsZUlkOiBtYXRjaC5hdXRob3JJZCxcbiAgICAgICAgZGlzcGxheU5hbWU6IFIucHJvcE9yKFwiXCIsIFwiYWxpYXNcIiwgbWV0YSlcbiAgICAgIH0pXG4gICAgKSlcbikpO1xuXG5leHBvcnQgY29uc3QgUHJvZmlsZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIHRhYnMsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4uL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4uL0xpc3RpbmdPcmFjbGVcIjtcbmltcG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuLi9TcGFjZVNwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL3NwYWNlcy86bmFtZS86c29ydFwiO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGBzb3J0ICR7c29ydH1gKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBTcGFjZVNwZWMuZ2V0U3BlYyhzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGBzb3J0ICR7c29ydH1gKVxuKTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIFNwYWNlU3BlYy5zaWRlYmFyUGFnZU5hbWUobmFtZSkpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiwgb3JpZ2luYWwsIGxhdGVzdCA9IDAgfVxuKSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG5cbiAgY29uc3Qgb3JpZ2luYWxEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEob3JpZ2luYWwpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZElkcywgcmVtb3ZlZElkc10gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihcbiAgICBkaWZmRGF0YSxcbiAgICBvcmlnaW5hbERhdGFcbiAgKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgY29uc3Qgdm90ZUNvdW50c01hdGNoID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG4gIGNvbnN0IHRoaW5nTWF0Y2ggPSBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUubWF0Y2godXBkYXRlZFNvdWwpIHx8IHt9O1xuICBjb25zdCBhdXRob3JNYXRjaCA9IFNjaGVtYS5TRUFBdXRob3Iucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuXG4gIGlmICh2b3RlQ291bnRzTWF0Y2gpIHVwZGF0ZWRJZHMucHVzaCh2b3RlQ291bnRzTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ01hdGNoKSB1cGRhdGVkSWRzLnB1c2godGhpbmdNYXRjaC50aGluZ0lkKTtcbiAgaWYgKHRoaW5nSWQgJiYgdGhpbmdJZCAhPT0gc3BlYy5mcm9tUGFnZUlkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhcbiAgICBvcmMsXG4gICAgcm91dGUsXG4gICAgc2NvcGUsXG4gICAgc3BlYyxcbiAgICB1cGRhdGVkSWRzLFxuICAgIHJlbW92ZWRJZHNcbiAgKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xuICBpZiAoXG4gICAgUi5wcm9wKFwic2l6ZVwiLCBvcmlnaW5hbCkgfHxcbiAgICB1cGRhdGVkSWRzLmxlbmd0aCB8fFxuICAgIHJlbW92ZWRJZHMubGVuZ3RoIHx8XG4gICAgYXV0aG9yTWF0Y2hcbiAgKVxuICAgIHJldHVybjtcblxuICAvLyBiYXNlIGxvZ2ljIGZyb20gZ3VuLWNsZXJpYy1zY29wZSBuZWVkcyB0byBiZSBlbmNhcHN1YWx0ZWQgYmV0dGVyP1xuICBjb25zb2xlLmxvZyhcIi0tLVNUQU5EQVJEIFNQQUNFIFVQREFURS0tLVwiLCByb3V0ZS5zb3VsLCB1cGRhdGVkU291bCk7XG4gIGNvbnN0IG5vZGUgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IGV4aXN0aW5nS2V5cyA9IExpc3RpbmdOb2RlLml0ZW1LZXlzKG5vZGUpO1xuXG4gIGlmIChleGlzdGluZ0tleXMubGVuZ3RoKSB7XG4gICAgcm91dGUud3JpdGUoe1xuICAgICAgc2l6ZTogMCxcbiAgICAgIC4uLmV4aXN0aW5nS2V5cy5yZWR1Y2UoKGRpZmYsIGtleSkgPT4ge1xuICAgICAgICBkaWZmW2Ake2tleX1gXSA9IG51bGw7XG4gICAgICAgIHJldHVybiBkaWZmO1xuICAgICAgfSwge30pXG4gICAgfSk7XG4gIH1cblxuICBvcmMud29yayh7XG4gICAgaWQ6IGB1cGRhdGU6JHtyb3V0ZS5zb3VsfWAsXG4gICAgc291bDogcm91dGUuc291bCxcbiAgICBtZXRob2Q6IFwiZG9VcGRhdGVcIixcbiAgICBwcmlvcml0eTogcm91dGUucHJpb3JpdHkgfHwgNTBcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgU3BhY2VMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTb3VyY2UsXG4gIGdldFNpZGViYXIsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIiwgXCJmaXJlaG9zZVwiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnRvcGljOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IHRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljc1swXSA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IHRvcGljc1swXTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzp0b3BpY1wiLFxuICAgIFtcbiAgICAgIGBuYW1lICR7dG9waWN9YCxcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICB0b3BpYy5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBcImtpbmQgc3VibWlzc2lvblwiIDogXCJcIixcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihcbiAgICBSLnBpcGUoXG4gICAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlLFxuICAgICAgUi5hc3NvYyhcImJhc2VQYXRoXCIsIGAvdC8ke21hdGNoLnRvcGljfWApXG4gICAgKVxuICApXG4pO1xuXG5leHBvcnQgY29uc3QgVG9waWNMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICB0YWJzLFxuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ2hhdExpc3RpbmcgfSBmcm9tIFwiLi9DaGF0TGlzdGluZ1wiO1xuaW1wb3J0IHsgRmlyZWhvc2VMaXN0aW5nIH0gZnJvbSBcIi4vRmlyZWhvc2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBDb21tZW50ZWRMaXN0aW5nIH0gZnJvbSBcIi4vQ29tbWVudGVkTGlzdGluZ1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5pbXBvcnQgeyBEb21haW5MaXN0aW5nIH0gZnJvbSBcIi4vRG9tYWluTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50TGlzdGluZ1wiO1xuaW1wb3J0IHsgU3BhY2VMaXN0aW5nIH0gZnJvbSBcIi4vU3BhY2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBJbmJveExpc3RpbmcgfSBmcm9tIFwiLi9JbmJveExpc3RpbmdcIjtcbmltcG9ydCB7IFByb2ZpbGVMaXN0aW5nIH0gZnJvbSBcIi4vUHJvZmlsZUxpc3RpbmdcIjtcblxuY29uc3QgdHlwZXMgPSB7XG4gIENoYXRMaXN0aW5nLFxuICBGaXJlaG9zZUxpc3RpbmcsXG4gIFRvcGljTGlzdGluZyxcbiAgRG9tYWluTGlzdGluZyxcbiAgQ29tbWVudExpc3RpbmcsXG4gIFNwYWNlTGlzdGluZyxcbiAgSW5ib3hMaXN0aW5nLFxuICBDb21tZW50ZWRMaXN0aW5nLFxuICBQcm9maWxlTGlzdGluZ1xufTtcblxuY29uc3QgdHlwZXNBcnJheSA9IFIudmFsdWVzKHR5cGVzKTtcblxuY29uc3QgZnJvbVBhdGggPSBwYXRoID0+IHtcbiAgbGV0IG1hdGNoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIG1hdGNoID0gdHlwZXNBcnJheVtpXS5yb3V0ZS5tYXRjaChwYXRoKTtcbiAgICBpZiAobWF0Y2gpIHJldHVybiBSLmFzc29jKFwibWF0Y2hcIiwgbWF0Y2gsIHR5cGVzQXJyYXlbaV0pO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3Qgc2lkZWJhckZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBmcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUgfHwgIXR5cGUuZ2V0U2lkZWJhcikgcmV0dXJuIHJlc29sdmUoXCJcIik7XG4gIHJldHVybiB0eXBlLmdldFNpZGViYXIoc2NvcGUsIHR5cGUubWF0Y2gpO1xufSk7XG5cbmNvbnN0IHNwZWNGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCkgPT4ge1xuICBjb25zdCB0eXBlID0gZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlKSB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGZpbmQgdHlwZSBmb3IgcGF0aDogJHtwYXRofWApO1xuXG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oYmFzZVNwZWMgPT4ge1xuICAgIGxldCBzcGVjID0gYmFzZVNwZWM7XG5cbiAgICBpZiAodHlwZS5tYXRjaC5zb3J0ID09PSBcImRlZmF1bHRcIikge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJwYXRoXCIsIHR5cGUucm91dGUucmV2ZXJzZShSLmFzc29jKFwic29ydFwiLCBzcGVjLnNvcnQsIHR5cGUubWF0Y2gpKSwgc3BlYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwicGF0aFwiLCBwYXRoLCBiYXNlU3BlYyk7XG4gICAgfVxuXG4gICAgaWYgKHNwZWMuc3VibWl0VG9waWMgJiYgIXNwZWMuc3VibWl0UGF0aCkge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJzdWJtaXRQYXRoXCIsIGAvdC8ke3NwZWMuc3VibWl0VG9waWN9L3N1Ym1pdGAsIHNwZWMpO1xuICAgIH1cblxuICAgIHJldHVybiBzcGVjO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1R5cGUgPSB7XG4gIC4uLnR5cGVzLFxuICB0eXBlcyxcbiAgZnJvbVBhdGgsXG4gIHNpZGViYXJGcm9tUGF0aCxcbiAgc3BlY0Zyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5cbmNvbnN0IHNwbGl0RG9tYWlucyA9IFIuY29tcG9zZShcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICBSLm1hcChSLnRyaW0pLFxuICBSLnNwbGl0KFwiK1wiKSxcbiAgUi50b0xvd2VyLFxuICBSLnRyaW0sXG4gIFIuZGVmYXVsdFRvKFwiXCIpXG4pO1xuXG5jb25zdCBzcGxpdFRvcGljcyA9IFIuY29tcG9zZShcbiAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmlkZW50aXR5LCBSLmFsd2F5cyhbXCJhbGxcIl0pKSxcbiAgc3BsaXREb21haW5zXG4pO1xuXG5jb25zdCB3aXRoUm91dGUgPSBvYmogPT4gUi5hc3NvYyhcInJvdXRlXCIsIG5ldyBSb3V0ZShvYmoucGF0aCksIG9iaik7XG5cbmV4cG9ydCBjb25zdCBQYXRoID0geyBzcGxpdERvbWFpbnMsIHNwbGl0VG9waWNzLCB3aXRoUm91dGUgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuY29uc3QgY29uZmlnUGFnZU5hbWUgPSBuYW1lID0+IGBzcGFjZToke25hbWV9YDtcbmNvbnN0IHNpZGViYXJQYWdlTmFtZSA9IG5hbWUgPT4gYHNwYWNlOiR7bmFtZX06c2lkZWJhcmA7XG5cbmNvbnN0IHNvdXJjZVdpdGhEZWZhdWx0cyA9IFIuY3VycnkoKG93bmVySWQsIG5hbWUsIHNvdXJjZSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW3NvdXJjZSB8fCBcIlwiXTtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG5cbiAgaWYgKCF0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJcIikpIHtcbiAgICB0YWJzLm1hcCh0YWIgPT5cbiAgICAgIHJlc3VsdC5wdXNoKGB0YWIgJHt0YWJ9IC91c2VyLyR7b3duZXJJZH0vc3BhY2VzLyR7bmFtZX0vJHt0YWJ9YClcbiAgICApO1xuICB9XG5cbiAgbGV0IGluZGV4ZXIgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJpbmRleGVyXCIpO1xuXG4gIGlmICghaW5kZXhlcikge1xuICAgIHJlc3VsdC5wdXNoKGBpbmRleGVyICR7Q29uZmlnLmluZGV4ZXJ9YCk7XG4gICAgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyO1xuICB9XG5cbiAgbGV0IHRhYnVsYXRvciA9IHRva2VuaXplZC5nZXRWYWx1ZShcInRhYnVsYXRvclwiKTtcblxuICBpZiAoIXRhYnVsYXRvcikgcmVzdWx0LnB1c2goYHRhYnVsYXRvciAke2luZGV4ZXJ9YCk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKFwiXFxuXCIpO1xufSk7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBjb25maWdQYWdlTmFtZShuYW1lKSwgZXh0cmEpLnRoZW4oXG4gICAgc291cmNlV2l0aERlZmF1bHRzKGF1dGhvcklkLCBuYW1lKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpID0+XG4gIGdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKS50aGVuKHNvdXJjZSA9PlxuICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2Uoc291cmNlLCBhdXRob3JJZCwgbmFtZSlcbiAgKVxuKTtcblxuY29uc3Qgbm9kZVRvU3BhY2VOYW1lcyA9IFIuY29tcG9zZShcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIubWFwKFIucmVwbGFjZSgvXnNwYWNlOi8sIFwiXCIpKSxcbiAgUi5maWx0ZXIoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5wcm9wKFwibGVuZ3RoXCIpLFxuICAgICAgUi5tYXRjaCgvXnNwYWNlOlteOl0qJC8pXG4gICAgKVxuICApLFxuICBSLmtleXNcbik7XG5cbmNvbnN0IHVzZXJTcGFjZU5hbWVzID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCkgPT5cbiAgUXVlcnkudXNlclBhZ2VzKHNjb3BlLCBhdXRob3JJZCkudGhlbihub2RlVG9TcGFjZU5hbWVzKVxuKTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlU3BlYyA9IHtcbiAgY29uZmlnUGFnZU5hbWUsXG4gIHNpZGViYXJQYWdlTmFtZSxcbiAgbm9kZVRvU3BhY2VOYW1lcyxcbiAgdXNlclNwYWNlTmFtZXMsXG4gIHRhYnMsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufTtcbiIsImltcG9ydCB7IExpc3RpbmdRdWVyeSB9IGZyb20gXCIuL0xpc3RpbmdRdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5leHBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5leHBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5leHBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuZXhwb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuZXhwb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuL0xpc3RpbmdPcmFjbGVcIjtcbmV4cG9ydCB7IExpc3RpbmdRdWVyeSB9IGZyb20gXCIuL0xpc3RpbmdRdWVyeVwiO1xuZXhwb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuZXhwb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuZXhwb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuZXhwb3J0IHsgU3BhY2VTcGVjIH0gZnJvbSBcIi4vU3BhY2VTcGVjXCI7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nID0ge1xuICAuLi5MaXN0aW5nVHlwZS50eXBlcyxcbiAgTGlzdGluZ05vZGUsXG4gIExpc3RpbmdTcGVjLFxuICBpc1ZhbGlkU29ydDogTGlzdGluZ1NvcnQuaXNWYWxpZFNvcnQsXG4gIGlkc1RvU291bHM6IExpc3RpbmdOb2RlLmlkc1RvU291bHMsXG4gIGdldDogTGlzdGluZ05vZGUuZ2V0LFxuICBmcm9tU3BlYzogTGlzdGluZ1F1ZXJ5LmZyb21TcGVjLFxuICBmcm9tUGF0aDogTGlzdGluZ1F1ZXJ5LmZyb21QYXRoLFxuICB0eXBlRnJvbVBhdGg6IExpc3RpbmdUeXBlLmZyb21QYXRoLFxuICBzaWRlYmFyRnJvbVBhdGg6IExpc3RpbmdUeXBlLnNpZGViYXJGcm9tUGF0aCxcbiAgc3BlY0Zyb21QYXRoOiBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgsXG4gIG5vZGVGcm9tUGF0aDogTGlzdGluZ1F1ZXJ5Lm5vZGVGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZywgTGlzdGluZ1NwZWMsIExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1wiO1xuXG5jb25zdCB3aWtpUGFnZSA9IFIubWVyZ2VMZWZ0KHtcbiAgd2l0aE1hdGNoOiAoeyBwYXJhbXM6IHsgYXV0aG9ySWQgPSBDb25maWcub3duZXIsIG5hbWUgfSB9KSA9PiAoe1xuICAgIHByZWxvYWQ6IHNjb3BlID0+IFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSlcbiAgfSlcbn0pO1xuXG5jb25zdCB3aXRoTGlzdGluZ01hdGNoID0gKHBhdGgsIHBhcmFtcykgPT4ge1xuICBpZiAoIXBhdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJlbG9hZDogcXVlcnkoUi5hbHdheXMocmVzb2x2ZSh7fSkpKSxcbiAgICAgIHNpZGViYXI6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoXCJcIikpKSxcbiAgICAgIHNwYWNlOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UoXCJcIikpKSksXG4gICAgICBpZHM6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoW10pKSlcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgcmVhbFF1ZXJ5ID0gcXVlcnkoXG4gICAgKHNjb3BlLCBvcHRzID0ge30pID0+IExpc3RpbmcuZnJvbVBhdGgoc2NvcGUsIHBhdGgsIG9wdHMpLFxuICAgIGBpZHM6JHtwYXRofWBcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIHByZWxvYWQ6IHNjb3BlID0+IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBwYXRoLCBwYXJhbXMpLFxuICAgIHNpZGViYXI6IHF1ZXJ5KFxuICAgICAgc2NvcGUgPT4gTGlzdGluZy5zaWRlYmFyRnJvbVBhdGgoc2NvcGUsIHBhdGgpLFxuICAgICAgYHNpZGViYXI6JHtwYXRofWBcbiAgICApLFxuICAgIHNwYWNlOiBxdWVyeShzY29wZSA9PiBMaXN0aW5nLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCkpLFxuICAgIGlkczogcXVlcnkoKHNjb3BlLCBvcHRzID0ge30pID0+XG4gICAgICByZWFsUXVlcnkoc2NvcGUsIFIubWVyZ2VMZWZ0KG9wdHMsIHBhcmFtcykpXG4gICAgKVxuICB9O1xufTtcblxuY29uc3QgcHJlbG9hZExpc3RpbmcgPSBhc3luYyAoc2NvcGUsIHBhdGgsIHBhcmFtcykgPT4ge1xuICBjb25zdCBtYXRjaCA9IHdpdGhMaXN0aW5nTWF0Y2gocGF0aCwgcGFyYW1zKTtcbiAgbGV0IFtzcGVjLCBpZHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIG1hdGNoLnNwYWNlKHNjb3BlKSxcbiAgICBtYXRjaC5pZHMoc2NvcGUsIHt9KSxcbiAgICBtYXRjaC5zaWRlYmFyKHNjb3BlKVxuICBdKTtcblxuICBpZiAoIXNwZWMpIHNwZWMgPSBMaXN0aW5nU3BlYy5mcm9tU291cmNlKFwiXCIpO1xuXG4gIGNvbnN0IHRoaW5nU291bHMgPSBMaXN0aW5nLmlkc1RvU291bHMoaWRzKTtcbiAgY29uc3QgW3RoaW5nc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgUXVlcnkubXVsdGlUaGluZ01ldGEoc2NvcGUsIHtcbiAgICAgIHRoaW5nU291bHMsXG4gICAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsXG4gICAgICBzY29yZXM6IHRydWUsXG4gICAgICBkYXRhOiB0cnVlXG4gICAgfSksXG4gICAgLi4uUi5tYXAoXG4gICAgICBpZCA9PiBRdWVyeS51c2VyTWV0YShzY29wZSwgaWQpLFxuICAgICAgUi51bmlxKFtzcGVjICYmIHNwZWMuaW5kZXhlciwgc3BlYyAmJiBzcGVjLm93bmVyLCBzcGVjICYmIHNwZWMudGFidWxhdG9yXSlcbiAgICApXG4gIF0pO1xuICBjb25zdCBvcElkcyA9IFIuY29tcG9zZShcbiAgICBSLndpdGhvdXQoaWRzKSxcbiAgICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgICBSLnVuaXEsXG4gICAgUi5tYXAoUi5wYXRoT3IobnVsbCwgW1wiZGF0YVwiLCBcIm9wSWRcIl0pKVxuICApKHRoaW5ncyk7XG5cbiAgaWYgKG9wSWRzLmxlbmd0aCkge1xuICAgIGNvbnN0IG9wU291bHMgPSBMaXN0aW5nLmlkc1RvU291bHMob3BJZHMpO1xuXG4gICAgYXdhaXQgUXVlcnkubXVsdGlUaGluZ01ldGEoc2NvcGUsIHtcbiAgICAgIHRoaW5nU291bHM6IG9wU291bHMsXG4gICAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsXG4gICAgICBkYXRhOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBpZiAoc3BlYy5jaGF0VG9waWMpIHtcbiAgICBjb25zdCBjaGF0UGF0aCA9IGAvdC8ke3NwZWMuY2hhdFRvcGljfS9jaGF0YDtcblxuICAgIGlmIChjaGF0UGF0aCAhPT0gcGF0aClcbiAgICAgIGF3YWl0IHByZWxvYWRMaXN0aW5nKHNjb3BlLCBgL3QvJHtzcGVjLmNoYXRUb3BpY30vY2hhdGAsIHt9KTtcbiAgfVxuXG4gIHJldHVybiBzY29wZS5nZXRDYWNoZSgpO1xufTtcblxuY29uc3QgbGlzdGluZyA9ICh7XG4gIHByZWZpeDogZGVmYXVsdFByZWZpeCA9IFwidFwiLFxuICBpZGVudGlmaWVyOiBkZWZhdWx0SWRlbnRpZmllciA9IFwiYWxsXCIsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJob3RcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PiB3aXRoTGlzdGluZ01hdGNoKGAvJHtwcmVmaXh9LyR7aWRlbnRpZmllcn0vJHtzb3J0fWAsIHF1ZXJ5KVxufSk7XG5cbmNvbnN0IHRoaW5nQ29tbWVudHMgPSAoe1xuICBwcmVmaXg6IGRlZmF1bHRQcmVmaXggPSBcInRcIixcbiAgaWRlbnRpZmllcjogZGVmYXVsdElkZW50aWZpZXIgPSBcImFsbFwiLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiYmVzdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5Db21tZW50TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogb3BJZCxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBSLmFzc29jKFwibGltaXRcIiwgMTAwMCwgcXVlcnkpXG4gICAgKVxufSk7XG5cbmNvbnN0IHNwYWNlTGlzdGluZyA9ICh7XG4gIG5hbWU6IGRlZmF1bHROYW1lID0gXCJkZWZhdWx0XCIsXG4gIGF1dGhvcklkOiBkZWZhdWx0QXV0aG9ySWQsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJkZWZhdWx0XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgYXV0aG9ySWQgPSBkZWZhdWx0QXV0aG9ySWQsXG4gICAgICBuYW1lID0gZGVmYXVsdE5hbWUsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgYXV0aG9ySWQ6IGF1dGhvcklkIHx8IENvbmZpZy5vd25lcixcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5jb25zdCBzcGFjZVRoaW5nQ29tbWVudHMgPSAoe1xuICBuYW1lOiBkZWZhdWx0TmFtZSA9IFwiZGVmYXVsdFwiLFxuICBhdXRob3JJZDogZGVmYXVsdEF1dGhvcklkLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiaG90XCIsXG4gIC4uLnJlc3Rcbn0pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBhdXRob3JJZCA9IGRlZmF1bHRBdXRob3JJZCxcbiAgICAgIG5hbWUgPSBkZWZhdWx0TmFtZSxcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHNwYWNlUGF0aCA9IExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiBhdXRob3JJZCB8fCBDb25maWcub3duZXIsXG4gICAgICBuYW1lLFxuICAgICAgc29ydFxuICAgIH0pO1xuICAgIGNvbnN0IGxpc3RpbmdQYXRoID0gTGlzdGluZ1R5cGUuQ29tbWVudExpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBvcElkLFxuICAgICAgc29ydFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNwYWNlOiBxdWVyeShcbiAgICAgICAgc2NvcGUgPT4gTGlzdGluZy5zcGVjRnJvbVBhdGgoc2NvcGUsIHNwYWNlUGF0aCwgcXVlcnkpLFxuICAgICAgICBgc3BlYzoke3NwYWNlUGF0aH1gXG4gICAgICApLFxuICAgICAgaWRzOiBxdWVyeShcbiAgICAgICAgc2NvcGUgPT4gTGlzdGluZy5mcm9tUGF0aChzY29wZSwgbGlzdGluZ1BhdGgsIHF1ZXJ5KSxcbiAgICAgICAgbGlzdGluZ1BhdGhcbiAgICAgICksXG4gICAgICBwcmVsb2FkOiBzY29wZSA9PiBwcmVsb2FkTGlzdGluZyhzY29wZSwgbGlzdGluZ1BhdGgsIHF1ZXJ5KVxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm9maWxlID0gKHtcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcIm5ld1wiLFxuICB0eXBlOiBkZWZhdWx0VHlwZSA9IFwib3ZlcnZpZXdcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7IGF1dGhvcklkLCB0eXBlID0gZGVmYXVsdFR5cGUsIHNvcnQgPSBkZWZhdWx0U29ydCB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLlByb2ZpbGVMaXN0aW5nLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmNvbnN0IGluYm94ID0gKHtcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcIm5ld1wiLFxuICB0eXBlOiBkZWZhdWx0VHlwZSA9IFwib3ZlcnZpZXdcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgYXV0aG9ySWQsXG4gICAgcGFyYW1zOiB7IHR5cGUgPSBkZWZhdWx0VHlwZSwgc29ydCA9IGRlZmF1bHRTb3J0IH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuSW5ib3hMaXN0aW5nLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSxcbiAgICAgIHF1ZXJ5XG4gICAgKVxufSk7XG5cbmV4cG9ydCBjb25zdCBQYWdlID0ge1xuICB3aXRoTGlzdGluZ01hdGNoLFxuICBwcmVsb2FkTGlzdGluZyxcbiAgd2lraVBhZ2UsXG4gIHRoaW5nQ29tbWVudHMsXG4gIGxpc3RpbmcsXG4gIHNwYWNlTGlzdGluZyxcbiAgc3BhY2VUaGluZ0NvbW1lbnRzLFxuICBwcm9maWxlLFxuICBpbmJveFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi9BdXRoZW50aWNhdGlvblwiO1xuXG5mdW5jdGlvbiBpbml0KEd1biwgY29uZmlnID0ge30pIHtcbiAgY29uc3QgeyBsZWVjaCwgZGlzYWJsZVZhbGlkYXRpb24sIG5vR3VuLCBsb2NhbFN0b3JhZ2UsIHBlcnNpc3QsIC4uLnJlc3QgfSA9XG4gICAgY29uZmlnIHx8IHt9O1xuICBjb25zdCBwZWVyID0geyBjb25maWcgfTtcblxuICBpZiAoIW5vR3VuKSB7XG4gICAgY29uc3QgY2ZnID0geyBsb2NhbFN0b3JhZ2U6ICEhbG9jYWxTdG9yYWdlLCByYWRpc2s6ICEhcGVyc2lzdCwgLi4ucmVzdCB9O1xuXG4gICAgaWYgKHBlcnNpc3QpIGNmZy5sb2NhbFN0b3JhZ2UgPSBmYWxzZTtcbiAgICBpZiAoIWRpc2FibGVWYWxpZGF0aW9uKSBHdW4ub24oXCJvcHRcIiwgVmFsaWRhdGlvbi5ndW5XaXJlSW5wdXQocGVlcikpO1xuICAgIGlmIChjZmcuc3RvcmVGbikgY2ZnLnN0b3JlID0gY2ZnLnN0b3JlRm4oY2ZnKTsgLy8gZm9yIGluZGV4ZWRkYlxuICAgIHBlZXIuZ3VuID0gR3VuKGNmZyk7XG4gICAgaWYgKGNmZy5sb2NhbFN0b3JhZ2UpIHBlZXIuZ3VuLm9uKFwibG9jYWxTdG9yYWdlOmVycm9yXCIsIGEgPT4gYS5yZXRyeSh7fSkpO1xuICAgIGlmIChsZWVjaCkge1xuICAgICAgY29uc3Qgc2VuZExlZWNoID0gKCkgPT4gcGVlci5ndW4uXy5vbihcIm91dFwiLCB7IGxlZWNoOiB0cnVlIH0pO1xuXG4gICAgICBzZW5kTGVlY2goKTtcbiAgICB9XG4gIH1cblxuICBwZWVyLm5ld1Njb3BlID0gb3B0cyA9PiBRdWVyeS5jcmVhdGVTY29wZShwZWVyLCBvcHRzKTtcbiAgcGVlci5vbkxvZ2luID0gQXV0aGVudGljYXRpb24ub25Mb2dpbihwZWVyKTtcbiAgcGVlci5zaWdudXAgPSBBdXRoZW50aWNhdGlvbi5zaWdudXAocGVlcik7XG4gIHBlZXIubG9naW4gPSBBdXRoZW50aWNhdGlvbi5sb2dpbihwZWVyKTtcbiAgcGVlci5sb2dvdXQgPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5sb2dvdXQocGVlcik7XG4gIHBlZXIuaXNMb2dnZWRJbiA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4ocGVlcik7XG4gIHBlZXIuc3VibWl0ID0gVGhpbmcuc3VibWl0KHBlZXIpO1xuICBwZWVyLmNvbW1lbnQgPSBUaGluZy5jb21tZW50KHBlZXIpO1xuICBwZWVyLmNoYXQgPSBUaGluZy5jaGF0KHBlZXIpO1xuICBwZWVyLndyaXRlUGFnZSA9IFRoaW5nLndyaXRlUGFnZShwZWVyKTtcbiAgcGVlci52b3RlID0gVGhpbmcudm90ZShwZWVyKTtcbiAgcGVlci5xdWVyaWVzID0gUXVlcnk7XG4gIHJldHVybiBwZWVyO1xufVxuXG5leHBvcnQgY29uc3QgUGVlciA9IHtcbiAgaW5pdFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBzY29wZSBhcyBtYWtlU2NvcGUsIHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmcvTGlzdGluZ05vZGVcIjtcblxuY29uc3QgZW1wdHlQcm9taXNlID0gcmVzb2x2ZShudWxsKTtcbmNvbnN0IHVuaW9uQXJyYXlzID0gUi5yZWR1Y2UoUi51bmlvbiwgW10pO1xuXG5jb25zdCB0b3BpY1NvdWxzID0gcGFyYW1zID0+IHtcbiAgY29uc3QgeyB0b3BpY3MgPSBbXCJhbGxcIl0gfSA9IHBhcmFtcyB8fCB7fTtcbiAgY29uc3QgZGF5cyA9IFIucHJvcE9yKDM2NSwgXCJkYXlzXCIsIHBhcmFtcykgfHwgMzY1O1xuICBjb25zdCBkYXlTdHJpbmdzID0gW107XG4gIGNvbnN0IG9uZURheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBvbmVEYXkgKiBwYXJzZUludChkYXlzLCAxMCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZGF5cyArIDE7IGkrKylcbiAgICBkYXlTdHJpbmdzLnB1c2goVGhpbmdTZXQuZGF5U3RyKHN0YXJ0ICsgaSAqIG9uZURheSkpO1xuICByZXR1cm4gT2JqZWN0LmtleXMoXG4gICAgdG9waWNzLnJlZHVjZShcbiAgICAgIChyZXN1bHQsIHRvcGljTmFtZSkgPT5cbiAgICAgICAgZGF5U3RyaW5ncy5yZWR1Y2UoKHJlcywgZHMpID0+IHtcbiAgICAgICAgICByZXNbYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLyR7dG9waWNOYW1lfS9kYXlzLyR7ZHN9YF0gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sIHJlc3VsdCksXG4gICAgICB7fVxuICAgIClcbiAgKTtcbn07XG5cbmNvbnN0IHNpbmdsZVRvcGljID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgdFNvdWxzID0gdG9waWNTb3Vscyh7IC4uLnBhcmFtcywgdG9waWNzOiBbcGFyYW1zLnRvcGljXSB9KTtcbiAgbGV0IHNvdWxzID0gW107XG4gIGxldCBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcblxuICBpZiAocGFyYW1zLnNvcnQgPT09IFwibmV3XCIpIHtcbiAgICBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1zLnNvcnQgPT09IFwidG9wXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgICBpZiAocGFyYW1zLnRvcGljID09PSBcImFsbFwiKSBpdGVtTWF4ID0gaXRlbU1heCAqIDM7XG4gIH1cblxuICBjb25zdCBmZXRjaE1vcmUgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9waWNTb3VsID0gdFNvdWxzLnBvcCgpO1xuXG4gICAgaWYgKHNvdWxzLmxlbmd0aCA+IGl0ZW1NYXggfHwgIXRvcGljU291bCkgcmV0dXJuIHJlc29sdmUoc291bHMpO1xuICAgIHJldHVybiBzY29wZVxuICAgICAgLmdldCh0b3BpY1NvdWwpXG4gICAgICAuc291bHMoKVxuICAgICAgLnRoZW4obW9yZSA9PiB7XG4gICAgICAgIHNvdWxzID0gWy4uLnNvdWxzLCAuLi5tb3JlXTtcbiAgICAgICAgcmV0dXJuIGZldGNoTW9yZSgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZldGNoTW9yZSgpO1xufSk7XG5cbmNvbnN0IHNpbmdsZURvbWFpbiA9IHF1ZXJ5KChzY29wZSwgeyBkb21haW4gfSkgPT5cbiAgc2NvcGUuZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWU6IGRvbWFpbiB9KSkuc291bHMoKVxuKTtcblxuY29uc3Qgc2luZ2xlQXV0aG9yID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIGFsbChbXG4gICAgcGFyYW1zLnR5cGUgJiYgcGFyYW1zLnR5cGUgIT09IFwic3VibWl0dGVkXCIgJiYgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIlxuICAgICAgPyByZXNvbHZlKFtdKVxuICAgICAgOiBzY29wZVxuICAgICAgICAgIC5nZXQoYH4ke3BhcmFtcy5hdXRob3JJZH1gKVxuICAgICAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgICAgIC5zb3VscygpLFxuICAgIHBhcmFtcy50eXBlICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwiY29tbWVudHNcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcIm92ZXJ2aWV3XCIgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tYW5kc1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChgfiR7cGFyYW1zLmF1dGhvcklkfWApXG4gICAgICAgICAgLmdldChcImNvbW1lbnRzXCIpXG4gICAgICAgICAgLnNvdWxzKClcbiAgXSkudGhlbigoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pID0+IHVuaW9uQXJyYXlzKFtzdWJtaXNzaW9ucywgY29tbWVudHNdKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdJZHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3VsKSA9PiBzY29wZS5nZXQoc291bCkudGhlbihMaXN0aW5nTm9kZS5zb3J0ZWRJZHMpLFxuICBcImxpc3RpbmdJZHNcIlxuKTtcblxuY29uc3Qgc2luZ2xlTGlzdGluZyA9IHF1ZXJ5KChzY29wZSwgeyBsaXN0aW5nLCBzb3J0LCBpbmRleGVyIH0pID0+XG4gIGxpc3RpbmdJZHMoc2NvcGUsIGAke0NvbnN0YW50cy5QUkVGSVh9JHtsaXN0aW5nfS8ke3NvcnR9QH4ke2luZGV4ZXJ9LmApLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLFxuICAgICAgUi5maWx0ZXIoUi5pZGVudGl0eSlcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHJlcGxpZXNUb0F1dGhvciA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgcmVwbGllc1RvQXV0aG9ySWQsIHR5cGUgPSBcIm92ZXJ2aWV3XCIsIC4uLnBhcmFtcyB9KSA9PlxuICAgIHNpbmdsZUxpc3Rpbmcoc2NvcGUsIHtcbiAgICAgIGxpc3Rpbmc6IGAvdXNlci8ke3JlcGxpZXNUb0F1dGhvcklkfS8ke3R5cGV9YCxcbiAgICAgIHNvcnQ6IFwibmV3XCIsXG4gICAgICAuLi5wYXJhbXNcbiAgICB9KS50aGVuKGF1dGhvcmVkU291bHMgPT5cbiAgICAgIGFsbChcbiAgICAgICAgYXV0aG9yZWRTb3Vscy5tYXAoYXV0aG9yZWRTb3VsID0+XG4gICAgICAgICAgc2NvcGUuZ2V0KGAke2F1dGhvcmVkU291bH0vY29tbWVudHNgKS5zb3VscygpXG4gICAgICAgIClcbiAgICAgICkudGhlbih1bmlvbkFycmF5cylcbiAgICApXG4pO1xuXG5jb25zdCBzaW5nbGVTdWJtaXNzaW9uID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIHNjb3BlXG4gICAgLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBwYXJhbXMuc3VibWlzc2lvbklkIH0pXG4gICAgKVxuICAgIC5zb3VscyhcbiAgICAgIFIucHJlcGVuZChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSkpXG4gICAgKVxuKTtcblxuY29uc3QgdGhpbmcgPSBxdWVyeSgoc2NvcGUsIHRoaW5nU291bCkgPT5cbiAgc2NvcGUuZ2V0KHRoaW5nU291bCkudGhlbihtZXRhID0+IHtcbiAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgaWQ6IG1ldGEuaWQsIHRpbWVzdGFtcDogcGFyc2VGbG9hdChtZXRhLnRpbWVzdGFtcCwgMTApIH07XG4gICAgY29uc3QgcmVwbHlUb1NvdWwgPSBSLnBhdGgoW1wicmVwbHlUb1wiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wU291bCA9IFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wSWQgPSBvcFNvdWwgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gob3BTb3VsKS50aGluZ2lkIDogbnVsbDtcbiAgICBjb25zdCByZXBseVRvSWQgPSByZXBseVRvU291bFxuICAgICAgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gocmVwbHlUb1NvdWwpLnRoaW5naWRcbiAgICAgIDogbnVsbDtcblxuICAgIGlmIChvcElkKSByZXN1bHQub3BJZCA9IG9wSWQ7XG4gICAgaWYgKHJlcGx5VG9JZCkgcmVzdWx0LnJlcGx5VG9JZCA9IHJlcGx5VG9JZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgbXVsdGlRdWVyeSA9IChzaW5nbGVRdWVyeSwgcGx1cmFsLCBzaW5nbGUsIGNvbGxhdGUgPSB1bmlvbkFycmF5cykgPT5cbiAgcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IFIucHJvcChwbHVyYWwsIHBhcmFtcyk7XG5cbiAgICBpZiAoUi5pc05pbChpdGVtcykpIHJldHVybiBlbXB0eVByb21pc2U7XG4gICAgcmV0dXJuIGFsbChcbiAgICAgIFIubWFwKFxuICAgICAgICB2YWwgPT4gc2luZ2xlUXVlcnkoc2NvcGUsIHsgLi4ucGFyYW1zLCBbc2luZ2xlXTogdmFsIH0pLFxuICAgICAgICBSLnByb3BPcihbXSwgcGx1cmFsLCBwYXJhbXMpXG4gICAgICApXG4gICAgKS50aGVuKGNvbGxhdGUpO1xuICB9KTtcblxuY29uc3QgbXVsdGlUb3BpYyA9IG11bHRpUXVlcnkoc2luZ2xlVG9waWMsIFwidG9waWNzXCIsIFwidG9waWNcIik7XG5jb25zdCBtdWx0aURvbWFpbiA9IG11bHRpUXVlcnkoc2luZ2xlRG9tYWluLCBcImRvbWFpbnNcIiwgXCJkb21haW5cIik7XG5jb25zdCBtdWx0aUF1dGhvciA9IG11bHRpUXVlcnkoc2luZ2xlQXV0aG9yLCBcImF1dGhvcklkc1wiLCBcImF1dGhvcklkXCIpO1xuY29uc3QgbXVsdGlTdWJtaXNzaW9uID0gbXVsdGlRdWVyeShcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgXCJzdWJtaXNzaW9uSWRzXCIsXG4gIFwic3VibWlzc2lvbklkXCJcbik7XG5cbmNvbnN0IHRoaW5nRGF0YUZyb21Tb3VscyA9IHNjb3BlID0+IHNvdWxzID0+XG4gIGFsbChcbiAgICBzb3Vsc1xuICAgICAgLmZpbHRlcih4ID0+ICEheClcbiAgICAgIC5tYXAoc291bCA9PlxuICAgICAgICBzY29wZVxuICAgICAgICAgIC5nZXQoc291bClcbiAgICAgICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgICAgIC50aGVuKHggPT4geClcbiAgICAgIClcbiAgKTtcblxuY29uc3QgY3VyYXRlZCA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWRzLCBzdWJtaXNzaW9uT25seSA9IGZhbHNlKSA9PlxuICBhbGwoW1xuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcImNvbW1lbnRzXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KVxuICAgICAgLnRoZW4odGhpbmdEYXRhRnJvbVNvdWxzKHNjb3BlKSlcbiAgICAgIC50aGVuKFxuICAgICAgICBSLmNvbXBvc2UoXG4gICAgICAgICAgUi5tYXAoc3VibWlzc2lvbk9ubHkgPyBSLnByb3AoXCJvcElkXCIpIDogUi5wcm9wKFwicmVwbHlUb0lkXCIpKSxcbiAgICAgICAgICBSLmZpbHRlcihSLnByb3AoXCJyZXBseVRvSWRcIikpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgbXVsdGlBdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGU6IFwic3VibWl0dGVkXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KS50aGVuKFIubWFwKHNvdWwgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpLnRoaW5nSWQpKVxuICBdKS50aGVuKChbaWRzMSwgaWRzMl0pID0+IFIudW5pcShbLi4uaWRzMSwgLi4uaWRzMl0pKVxuKTtcblxuY29uc3QgdGhpbmdTY29yZXMgPSBxdWVyeShcbiAgKHNjb3BlLCB0YWJ1bGF0b3IsIHRoaW5nSWQpID0+XG4gICAgdGFidWxhdG9yICYmIHRoaW5nSWRcbiAgICAgID8gc2NvcGVcbiAgICAgICAgICAuZ2V0KFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQsIHRhYnVsYXRvciB9KSlcbiAgICAgICAgICAudGhlbigpXG4gICAgICA6IHJlc29sdmUoKSxcbiAgXCJ0aGluZ1Njb3Jlc1wiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGEgPSBxdWVyeSgoc2NvcGUsIHRoaW5nSWQpID0+IHtcbiAgcmV0dXJuIHRoaW5nSWRcbiAgICA/IHNjb3BlLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLmdldChcImRhdGFcIilcbiAgICA6IHJlc29sdmUobnVsbCk7XG59LCBcInRoaW5nRGF0YVwiKTtcblxuY29uc3QgdGhpbmdNZXRhID0gcXVlcnkoXG4gIChzY29wZSwgeyB0aGluZ1NvdWwsIHRhYnVsYXRvciwgZGF0YSA9IGZhbHNlLCBzY29yZXMgPSBmYWxzZSB9KSA9PiB7XG4gICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgIGNvbnN0IGlkID0gTGlzdGluZ05vZGUuc291bFRvSWQodGhpbmdTb3VsKTtcblxuICAgIHJldHVybiBhbGwoW1xuICAgICAgdGhpbmcoc2NvcGUsIHRoaW5nU291bCksXG4gICAgICBzY29yZXNcbiAgICAgICAgPyB0aGluZ1Njb3JlcyhzY29wZSwgdGFidWxhdG9yIHx8IENvbmZpZy50YWJ1bGF0b3IsIGlkKVxuICAgICAgICA6IHJlc29sdmUoKSxcbiAgICAgIGRhdGEgPyB0aGluZ0RhdGEoc2NvcGUsIGlkKSA6IHJlc29sdmUoKVxuICAgIF0pLnRoZW4oKFttZXRhLCB2b3RlcywgZGF0YV0pID0+IHtcbiAgICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4geyAuLi5tZXRhLCB2b3RlcywgZGF0YSB9O1xuICAgIH0pO1xuICB9XG4pO1xuXG5jb25zdCBtdWx0aVRoaW5nTWV0YSA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBhbGwoXG4gICAgUi5yZWR1Y2UoXG4gICAgICAocHJvbWlzZXMsIHRoaW5nU291bCkgPT4ge1xuICAgICAgICBpZiAoIXRoaW5nU291bCkgcmV0dXJuIHByb21pc2VzO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaW5nTWV0YShzY29wZSwgeyAuLi5wYXJhbXMsIHRoaW5nU291bCB9KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlcztcbiAgICAgIH0sXG4gICAgICBbXSxcbiAgICAgIFIucHJvcE9yKFtdLCBcInRoaW5nU291bHNcIiwgcGFyYW1zKVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgdXNlclBhZ2VzID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQpID0+XG4gICAgc2NvcGUuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpLFxuICBcInVzZXJQYWdlc1wiXG4pO1xuXG5jb25zdCB3aWtpUGFnZUlkID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT4ge1xuICBpZiAoIWF1dGhvcklkIHx8ICFuYW1lKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgcmV0dXJuIHNjb3BlXG4gICAgLmdldChTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkIH0pKVxuICAgIC5nZXQobmFtZSlcbiAgICAuZ2V0KFwiaWRcIik7XG59LCBcIndpa2lQYWdlSWRcIik7XG5cbmNvbnN0IHdpa2lQYWdlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgd2lraVBhZ2VJZChzY29wZSwgYXV0aG9ySWQsIG5hbWUpLnRoZW4oaWQgPT4gaWQgJiYgdGhpbmdEYXRhKHNjb3BlLCBpZCkpXG4pO1xuXG5jb25zdCB1c2VyTWV0YSA9IHF1ZXJ5KChzY29wZSwgaWQpID0+IHtcbiAgaWYgKCFpZCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gIHJldHVybiBzY29wZS5nZXQoYH4ke2lkfWApLnRoZW4obWV0YSA9PiAoe1xuICAgIGFsaWFzOiBSLnByb3AoXCJhbGlhc1wiLCBtZXRhKSxcbiAgICBjcmVhdGVkQXQ6IFIucGF0aChbXCJfXCIsIFwiPlwiLCBcInB1YlwiXSwgbWV0YSlcbiAgfSkpO1xufSwgXCJ1c2VyTWV0YVwiKTtcblxuY29uc3QgY3JlYXRlU2NvcGUgPSBSLmN1cnJ5KChuYWIsIG9wdHMpID0+XG4gIG1ha2VTY29wZShSLmFzc29jKFwiZ3VuXCIsIG5hYi5ndW4sIG9wdHMgfHwge30pKVxuKTtcblxuZXhwb3J0IGNvbnN0IFF1ZXJ5ID0ge1xuICBzaW5nbGVUb3BpYyxcbiAgc2luZ2xlRG9tYWluLFxuICBzaW5nbGVBdXRob3IsXG4gIHNpbmdsZUxpc3RpbmcsXG4gIHJlcGxpZXNUb0F1dGhvcixcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgdGhpbmdNZXRhLFxuICBtdWx0aVRoaW5nTWV0YSxcbiAgbXVsdGlUb3BpYyxcbiAgbXVsdGlEb21haW4sXG4gIG11bHRpQXV0aG9yLFxuICBtdWx0aVN1Ym1pc3Npb24sXG4gIHRoaW5nU2NvcmVzLFxuICB0aGluZ0RhdGEsXG4gIHRoaW5nRGF0YUZyb21Tb3VscyxcbiAgdG9waWNTb3VscyxcbiAgdXNlclBhZ2VzLFxuICB3aWtpUGFnZUlkLFxuICB3aWtpUGFnZSxcbiAgdXNlck1ldGEsXG4gIGNyZWF0ZVNjb3BlLFxuICBjdXJhdGVkXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgLi4uc2VhLkFVVEhfU0NIRU1BLFxuICB0b3BpY05hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRVxuICB9LFxuXG4gIFRvcGljRGF5OiB7XG4gICAgdGl0bGU6IFwiVG9waWMgRGF5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQSBzaW5nbGUgZGF5IG9mIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWUvZGF5cy86eWVhci86bW9udGgvOmRheWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICB5ZWFyOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDIwMTgsIG1heGltdW06IDIxMDAgfSxcbiAgICAgICAgbW9udGg6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMTIgfSxcbiAgICAgICAgZGF5OiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDMxIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCIsIFwieWVhclwiLCBcIm1vbnRoXCIsIFwiZGF5XCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBUb3BpYzoge1xuICAgIHRpdGxlOiBcIlRvcGljXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIGRvbWFpbk5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfRE9NQUlOX1NJWkVcbiAgfSxcblxuICBEb21haW46IHtcbiAgICB0aXRsZTogXCJEb21haW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgZG9tYWluXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWlucy86ZG9tYWluTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbk5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluTmFtZVwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB1cmw6IHsgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1VSTF9TSVpFIH0sXG4gIFVSTDoge1xuICAgIHRpdGxlOiBcIlVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgZm9yIGEgZ2l2ZW4gVVJMXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXJscy9cXCp1cmxgLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVybDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInVybFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aGluZ0lkOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfSEFTSF9TSVpFXG4gIH0sXG5cbiAgdGhpbmdTb3VsOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGhpbmdJZDogeyBcIiNyZWZcIjogXCIjZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdBbGxDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIEFsbCBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBjb21tZW50cyBmb3IgYSBnaXZlbiBzdWJtaXNzaW9uXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2FsbGNvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3QgcmVwbGllcyB0byBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aW1lc3RhbXA6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0sXG4gIHRoaW5nS2luZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0tJTkRfU0laRVxuICB9LFxuXG4gIFRoaW5nOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgUmVmZXJlbmNlXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoZXNlIGFyZSBzdWJtaXNzaW9ucywgY29tbWVudHMsIGNoYXQgbWVzc2FnZXMgYW5kIHdpa2kgcGFnZXNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWRgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IGlkOiBcInRoaW5nSWRcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGtpbmQ6IHsgXCIjcmVmXCI6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9LFxuICAgICAgb3JpZ2luYWxIYXNoOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb25lT2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFFZGdlXCIgfSxcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFTaWduZWRFZGdlXCIgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgdG9waWM6IHtcbiAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbWUgb2xkIHRoaW5ncyBoYWQgZ2VuZXJpYyB0b3BpYyBzb3Vsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgXCIjXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiA0MiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFtcIiNcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL0RvbWFpbkVkZ2VcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9VUkxFZGdlXCIgfSxcbiAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH0sXG4gICAgICBvcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIHJlcGx5VG86IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1NFQUF1dGhvckVkZ2VcIiB9XG4gICAgfSxcblxuICAgIGFueU9mOiBbXG4gICAgICB7XG4gICAgICAgIGFsbE9mOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpbmdIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgICAgIHsgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nOiB0cnVlIH0sXG4gICAgICAgICAgICAgIHsgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaDogdHJ1ZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyBpc0xlZ2FjeVRoaW5nOiB0cnVlIH0sXG4gICAgICB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU2VsZiB2ZXJpZnlpbmcgY2FuIGJlIHVwZGF0ZWQgaW4gaXNvbGF0aW9uXCIsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuXG4gIFByb29mT2ZXb3JrVm90ZXM6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAga2V5c0FyZVByb29mc09mV29yazoge1xuICAgICAgYWxnb3JpdGhtOiBcImFyZ29uMmRcIixcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjb21wbGV4aXR5OiA2LFxuICAgICAgICBoYXNoTGVuZ3RoOiAzMixcbiAgICAgICAgdGltZUNvc3Q6IDEsXG4gICAgICAgIG1lbW9yeUNvc3Q6IDEwMjQwLFxuICAgICAgICBwYXJhbGxlbGlzbTogMVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVzVXA6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXN1cGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdWb3Rlc0Rvd246IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXNkb3duYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ0RhdGE6IHtcbiAgICB0aXRsZTogXCJVbnNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH0sXG4gICAgICBhdXRob3JJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgb3BJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICByZXBseVRvSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdXJsXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfVxuICAgIH0sXG4gICAgdGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gIH0sXG5cbiAgVGhpbmdEYXRhU2lnbmVkOiB7XG4gICAgdGl0bGU6IFwiU2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZywgY3J5cHRvZ3JhcGhpY2FsbHkgc2lnbmVkXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGF+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCIsIFwiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0gfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSB9LFxuICAgICAgYm9keToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9XG4gICAgICB9LFxuICAgICAgYXV0aG9ySWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSB9LFxuICAgICAgb3BJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIHJlcGx5VG9JZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIGRvbWFpbjogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0gfSxcbiAgICAgIHVybDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfSB9LFxuICAgICAgdGltZXN0YW1wOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9IH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3RlQ291bnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgVm90ZSBDb3VudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBZ2dyZWdhdGVkIGNvdW50cyBmcm9tIGEgdGFidWxhdG9yXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVjb3VudHNAfjp0YWJ1bGF0b3IuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgdGFidWxhdG9yOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXA6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBkb3duOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWVudDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIHNjb3JlOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWFuZHM6IHsgc2VhOiB7IHR5cGU6IFtcIm9iamVjdFwiLCBcInN0cmluZ1wiXSB9IH1cbiAgICB9XG4gIH0sXG5cbiAgTGlzdGluZ0RhdGE6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAgdGl0bGU6IFwiTGlzdGluZyBOb2RlIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTaGFyZWQgZGVzY3JpcHRpb24gb2YgbGlzdGluZyBwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBwYXR0ZXJuUHJvcGVydGllczoge1xuICAgICAgXCJeZCskXCI6IHsgc2VhOiB7IHR5cGU6IFtcInN0cmluZ1wiLCBcIm51bGxcIiwgXCJ1bmRlZmluZWRcIl0gfSB9XG4gICAgfVxuICB9LFxuXG4gIHNvcnROYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXG4gICAgICBcIm5ld1wiLFxuICAgICAgXCJvbGRcIixcbiAgICAgIFwiYWN0aXZlXCIsXG4gICAgICBcInRvcFwiLFxuICAgICAgXCJjb21tZW50c1wiLFxuICAgICAgXCJkaXNjdXNzZWRcIixcbiAgICAgIFwiaG90XCIsXG4gICAgICBcImJlc3RcIixcbiAgICAgIFwiY29udHJvdmVyc2lhbFwiLFxuICAgICAgXCJyYW5kb21cIixcbiAgICAgIFwiZmlyZWhvc2VcIixcbiAgICAgIFwiY2hhdFwiXG4gICAgXVxuICB9LFxuXG4gIFRvcGljTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3QvOnRvcGljLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljXCIsIFwic29ydFwiLCBcImluZGV4ZXJcIl0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBEb21haW5MaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWluLzpkb21haW4vOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluXCIsIFwic29ydFwiLCBcImluZGV4ZXJcIl0sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgVGhpbmdDb21tZW50c0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvY29tbWVudHMvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgdXNlckxpc3RpbmdUeXBlOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXCJvdmVydmlld1wiLCBcInN1Ym1pdHRlZFwiLCBcImNvbW1lbnRzXCIsIFwiY29tbWFuZHNcIiwgXCJjb21tZW50ZWRcIl1cbiAgfSxcblxuICBBdXRob3JSZXBsaWVzTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke1xuICAgICAgICBDb25zdGFudHMuUFJFRklYXG4gICAgICB9L3VzZXIvOmF1dGhvcklkL3JlcGxpZXMvOnR5cGUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICB0eXBlOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VzZXJMaXN0aW5nVHlwZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvclByb2ZpbGVMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXNlci86YXV0aG9ySWQvOnR5cGUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICB0eXBlOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VzZXJMaXN0aW5nVHlwZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFNwYWNlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke1xuICAgICAgICBDb25zdGFudHMuUFJFRklYXG4gICAgICB9L3VzZXIvOmF1dGhvcklkL3NwYWNlcy86bmFtZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIG5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgQXV0aG9yQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3JzIGNvbW1lbnRzIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2NvbW1lbnRzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JTdWJtaXNzaW9uczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFN1Ym1pc3Npb25zXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcidzIHN1Ym1pc3Npb25zIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3N1Ym1pc3Npb25zfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yVGhpbmdzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgVGhpbmdzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcidzIHRoaW5ncyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3N+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclBhZ2VzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yIFBhZ2UgTWFwXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTWFwcGluZyBvZiBwYWdlIG5hbWVzIHRvIHRoaW5nc1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3BhZ2VzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3Qgcm91dGVzID0gUi5rZXlzKGRlZmluaXRpb25zKS5yZWR1Y2UoKHJlc3VsdCwgbmFtZSkgPT4ge1xuICBjb25zdCBwYXR0ZXJuID0gUi5wYXRoKFtuYW1lLCBcInNvdWxcIiwgXCJwYXR0ZXJuXCJdLCBkZWZpbml0aW9ucyk7XG5cbiAgaWYgKCFwYXR0ZXJuKSByZXR1cm4gcmVzdWx0O1xuICByZXR1cm4gUi5hc3NvYyhuYW1lLCBuZXcgUm91dGUocGF0dGVybiksIHJlc3VsdCk7XG59KTtcblxuY29uc3QgZGVmc1dpdGhSb3V0ZXMgPSBSLmNvbXBvc2UoXG4gIFIucmVkdWNlKFxuICAgIChyZXMsIFtuYW1lLCByb3V0ZV0pID0+XG4gICAgICBSLmFzc29jKG5hbWUsIFIuYXNzb2MoXCJyb3V0ZVwiLCByb3V0ZSwgUi5wcm9wKG5hbWUsIGRlZmluaXRpb25zKSksIHJlcyksXG4gICAge31cbiAgKSxcbiAgUi50b1BhaXJzXG4pKHJvdXRlcyk7XG5cbmV4cG9ydCBjb25zdCBTY2hlbWEgPSB7XG4gIC4uLmRlZnNXaXRoUm91dGVzLFxuICBkZWZpbml0aW9ucyxcbiAgcm91dGVzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCBhbGwgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IENvbW1lbnRDb21tYW5kIH0gZnJvbSBcIi4vQ29tbWVudENvbW1hbmRcIjtcblxuY29uc3QgdGFidWxhdG9yUXVlcnkgPSBxdWVyeShhc3luYyAoc2NvcGUsIHJvdXRlKSA9PiB7XG4gIGNvbnN0IHRoaW5nU291bCA9IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHJvdXRlLm1hdGNoKTtcbiAgY29uc3QgW3VwLCBkb3duLCBjb21tZW50LCByZXBseVNvdWxzXSA9IGF3YWl0IGFsbChbXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vdm90ZXN1cGApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vdm90ZXNkb3duYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS9hbGxjb21tZW50c2ApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vY29tbWVudHNgKS5zb3VscygpXG4gIF0pO1xuICBjb25zdCB0aGluZ0RhdGEgPSBhd2FpdCBRdWVyeS50aGluZ0RhdGFGcm9tU291bHMocmVwbHlTb3Vscyk7XG4gIGNvbnN0IGNvbW1hbmRNYXAgPSBDb21tZW50Q29tbWFuZC5tYXAodGhpbmdEYXRhKTtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHVwLFxuICAgIGRvd24sXG4gICAgY29tbWVudCxcbiAgICByZXBsaWVzOiByZXBseVNvdWxzLmxlbmd0aCxcbiAgICBzY29yZTogdXAgLSBkb3duXG4gIH07XG5cbiAgaWYgKFIua2V5cyhjb21tYW5kTWFwKS5sZW5ndGgpIHJlc3VsdC5jb21tYW5kcyA9IEpTT04uc3RyaW5naWZ5KGNvbW1hbmRNYXApO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbmV4cG9ydCBjb25zdCBUYWJ1bGF0b3IgPSB7IHF1ZXJ5OiB0YWJ1bGF0b3JRdWVyeSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgb2JqSGFzaCBmcm9tIFwib2JqZWN0LWhhc2hcIjtcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVVJJIH0gZnJvbSBcInVyaS1qc1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuXG5leHBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5leHBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdEYXRhTm9kZVwiO1xuXG5jb25zdCB0b3BpY1ByZWZpeGVzID0ge1xuICBjaGF0bXNnOiBcImNoYXQ6XCIsXG4gIGNvbW1lbnQ6IFwiY29tbWVudHM6XCJcbn07XG5cbmNvbnN0IHNvdWxUb0lkID0gUi5jb21wb3NlKFxuICBSLnByb3AoXCJ0aGluZ0lkXCIpLFxuICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4pO1xuXG5jb25zdCBzb3Vsc1RvSWRzID0gUi5tYXAoc291bFRvSWQpO1xuXG5jb25zdCBpbmRleCA9IFIuY3VycnkoKHBlZXIsIHRoaW5nSWQsIGRhdGEpID0+IHtcbiAgaWYgKCFkYXRhLnRvcGljICYmICFkYXRhLm9wSWQpIHJldHVybjtcblxuICBpZiAoZGF0YS5vcElkICYmICFkYXRhLnRvcGljKSB7XG4gICAgcGVlci5ndW5cbiAgICAgIC5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSkpXG4gICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgLm9uKGZ1bmN0aW9uIHJlY3YodGQpIHtcbiAgICAgICAgaWYgKCF0ZCkgcmV0dXJuO1xuICAgICAgICBpbmRleChwZWVyLCB0aGluZ0lkLCB7IC4uLmRhdGEsIHRvcGljOiB0ZC50b3BpYyB8fCBcImFsbFwiIH0pO1xuICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF5U3RyID0gVGhpbmdTZXQuZGF5U3RyKGRhdGEudGltZXN0YW1wKTtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF5U3RyLnNwbGl0KFwiL1wiKTtcbiAgY29uc3QgdG9waWNQcmVmaXggPSB0b3BpY1ByZWZpeGVzW2RhdGEua2luZF0gfHwgXCJcIjtcbiAgY29uc3QgYmFzZVRvcGljTmFtZSA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IHRvcGljTmFtZSA9IHRvcGljUHJlZml4ICsgYmFzZVRvcGljTmFtZTtcbiAgY29uc3QgdG9waWMgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUgfSkpO1xuICBjb25zdCB0b3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSwgeWVhciwgbW9udGgsIGRheSB9KVxuICApO1xuXG4gIGlmICghZGF0YS5za2lwQWxsICYmIGRhdGEudG9waWMgIT09IFwiYWxsXCIpIHtcbiAgICBjb25zdCBhbGxuYW1lID0gYCR7dG9waWNQcmVmaXh9YWxsYDtcbiAgICBjb25zdCBhbGxUb3BpYyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiBhbGxuYW1lIH0pXG4gICAgKTtcbiAgICBjb25zdCBhbGxUb3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdG9waWNOYW1lOiBhbGxuYW1lLFxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgZGF5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBhbGxUb3BpYy5zZXQodGhpbmcpO1xuICAgIGFsbFRvcGljRGF5LnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5raW5kID09PSBcInN1Ym1pc3Npb25cIikge1xuICAgIGNvbnN0IHVybEluZm8gPSBkYXRhLnVybCA/IHBhcnNlVVJJKGRhdGEudXJsKSA6IHt9O1xuICAgIGNvbnN0IGRvbWFpbk5hbWUgPSAoZGF0YS51cmxcbiAgICAgID8gKHVybEluZm8uaG9zdCB8fCB1cmxJbmZvLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIilcbiAgICAgIDogYHNlbGYuJHtkYXRhLnRvcGljfWBcbiAgICApLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZG9tYWluID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWUgfSkpO1xuXG4gICAgZG9tYWluLnNldCh0aGluZyk7XG5cbiAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgIGNvbnN0IHVybE5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlVSTC5yb3V0ZS5yZXZlcnNlKHsgdXJsOiBkYXRhLnVybCB9KSk7XG5cbiAgICAgIC8vIHRoaW5nLmdldChcInVybFwiKS5wdXQodXJsTm9kZSk7XG4gICAgICB1cmxOb2RlLnNldCh0aGluZyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGFsbGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KVxuICAgICk7XG5cbiAgICBhbGxjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRoaW5nSWQ6IGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHRvcGljLnNldCh0aGluZyk7XG4gIHRvcGljRGF5LnNldCh0aGluZyk7XG59KTtcblxuY29uc3QgcHV0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBkYXRhLnRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IG9yaWdpbmFsSGFzaCA9IG9iakhhc2goZGF0YSk7XG4gIGNvbnN0IHsgdGltZXN0YW1wLCBraW5kLCB0b3BpYywgYXV0aG9ySWQsIG9wSWQsIHJlcGx5VG9JZCB9ID0gZGF0YTtcbiAgY29uc3QgdGhpbmdJZCA9IG9iakhhc2goe1xuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIHRvcGljLFxuICAgIGF1dGhvcklkLFxuICAgIG9wSWQsXG4gICAgcmVwbHlUb0lkLFxuICAgIG9yaWdpbmFsSGFzaFxuICB9KTtcblxuICBjb25zdCBub2RlID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSk7XG4gIGNvbnN0IGRhdGFTb3VsID0gYXV0aG9ySWRcbiAgICA/IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQsIGF1dGhvcklkIH0pXG4gICAgOiBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcmlnaW5hbEhhc2ggfSk7XG5cbiAgY29uc3QgbWV0YURhdGEgPSB7XG4gICAgaWQ6IHRoaW5nSWQsXG4gICAgdGltZXN0YW1wLFxuICAgIGtpbmQsXG4gICAgb3JpZ2luYWxIYXNoLFxuICAgIGRhdGE6IHsgXCIjXCI6IGRhdGFTb3VsIH0sXG4gICAgdm90ZXN1cDogeyBcIiNcIjogU2NoZW1hLlRoaW5nVm90ZXNVcC5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIHZvdGVzZG93bjogeyBcIiNcIjogU2NoZW1hLlRoaW5nVm90ZXNEb3duLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgYWxsY29tbWVudHM6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgY29tbWVudHM6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH1cbiAgfTtcblxuICBpZiAodG9waWMpXG4gICAgbWV0YURhdGEudG9waWMgPSB7IFwiI1wiOiBTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZTogdG9waWMgfSkgfTtcbiAgaWYgKGF1dGhvcklkKSBtZXRhRGF0YS5hdXRob3IgPSB7IFwiI1wiOiBgfiR7YXV0aG9ySWR9YCB9O1xuICBpZiAob3BJZClcbiAgICBtZXRhRGF0YS5vcCA9IHsgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3BJZCB9KSB9O1xuICBpZiAocmVwbHlUb0lkKVxuICAgIG1ldGFEYXRhLnJlcGx5VG8gPSB7XG4gICAgICBcIiNcIjogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiByZXBseVRvSWQgfSlcbiAgICB9O1xuXG4gIHBlZXIuZ3VuLmdldChkYXRhU291bCkucHV0KGRhdGEpO1xuICBub2RlLnB1dChtZXRhRGF0YSk7XG4gIGluZGV4KHBlZXIsIHRoaW5nSWQsIGRhdGEpO1xuICByZXR1cm4gbm9kZTtcbn0pO1xuXG5jb25zdCBzdWJtaXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChkYXRhLmRvbWFpbikgZGF0YS5kb21haW4gPSBkYXRhLmRvbWFpbi50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCB0aW1lc3RhbXAsIGtpbmQ6IFwic3VibWlzc2lvblwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBzdWJtaXNzaW9uc1NvdWwgPSBTY2hlbWEuQXV0aG9yU3VibWlzc2lvbnMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnMgPSBwZWVyLmd1bi5nZXQoc3VibWlzc2lvbnNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgLnB1dChzdWJtaXNzaW9ucyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgc3VibWlzc2lvbnMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjb21tZW50ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY29tbWVudFwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBjb21tZW50c1NvdWwgPSBTY2hlbWEuQXV0aG9yQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoY29tbWVudHNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgLnB1dChjb21tZW50cyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjaGF0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY2hhdG1zZ1wiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IHdyaXRlUGFnZSA9IFIuY3VycnkoKHBlZXIsIG5hbWUsIGJvZHkpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmICghdXNlcikgcmV0dXJuIFByb21pc2UucmVqZWN0KFwibm90IGxvZ2dlZCBpblwiKTtcbiAgbGV0IHRoaW5nO1xuICBjb25zdCBwYWdlc1NvdWwgPSBTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkOiB1c2VyLnB1YiB9KTtcbiAgY29uc3QgY2hhaW4gPSBwZWVyLmd1bi5nZXQocGFnZXNTb3VsKS5nZXQobmFtZSk7XG5cbiAgcmV0dXJuIGNoYWluLnRoZW4ocmVzID0+IHtcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBjaGFpblxuICAgICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgICAuZ2V0KFwiYm9keVwiKVxuICAgICAgICAucHV0KGJvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBib2R5LFxuICAgICAgICB0aXRsZTogbmFtZSxcbiAgICAgICAga2luZDogXCJ3aWtpcGFnZVwiLFxuICAgICAgICBhdXRob3I6IHVzZXIuYWxpYXMsXG4gICAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgICAgfTtcblxuICAgICAgdGhpbmcgPSBwdXQocGVlciwgZGF0YSk7XG4gICAgICBjaGFpbi5wdXQodGhpbmcpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuY29uc3Qgdm90ZSA9IFIuY3VycnkoKHBlZXIsIGlkLCBraW5kLCBub25jZSkgPT4ge1xuICBjb25zdCB2b3RlcyA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWFba2luZCA9PT0gXCJ1cFwiID8gXCJUaGluZ1ZvdGVzVXBcIiA6IFwiVGhpbmdWb3Rlc0Rvd25cIl0ucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBpZFxuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIHZvdGVzLmdldChub25jZSkucHV0KFwiMVwiKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgVGhpbmcgPSB7XG4gIHNvdWxUb0lkLFxuICBzb3Vsc1RvSWRzLFxuICBwdXQsXG4gIHN1Ym1pdCxcbiAgY29tbWVudCxcbiAgY2hhdCxcbiAgd3JpdGVQYWdlLFxuICB2b3RlLFxuICBpbmRleFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcblxuY29uc3QgYm9keSA9IFIucHJvcE9yKFwiXCIsIFwiYm9keVwiKTtcbmNvbnN0IHVybCA9IFIucHJvcE9yKFwiXCIsIFwidXJsXCIpO1xuY29uc3QgZG9tYWluID0gUi5jb21wb3NlKFxuICB1cmxTdHIgPT4ge1xuICAgIGlmICghdXJsU3RyKSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZVVSSSh1cmxTdHIpO1xuXG4gICAgcmV0dXJuIChwYXJzZWQuaG9zdCB8fCBwYXJzZWQuc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKTtcbiAgfSxcbiAgdXJsXG4pO1xuXG5leHBvcnQgY29uc3QgVGhpbmdEYXRhTm9kZSA9IHsgYm9keSwgZG9tYWluIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5cbmNvbnN0IHNvdWxzID0gR3VuTm9kZS5lZGdlcztcbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcInRoaW5nSWRcIiksXG4gICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4gICAgKVxuICApLFxuICBHdW5Ob2RlLmVkZ2VzXG4pO1xuXG5jb25zdCB1bmlvbiA9IFIuY29tcG9zZShcbiAgUi5kaXNzb2MoXCJfXCIpLFxuICBSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KVxuKTtcblxuZnVuY3Rpb24gZGF5U3RyKHRpbWVzdGFtcCkge1xuICBjb25zdCBkID0gbmV3IERhdGUodGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgY29uc3QgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RhdGUoKTtcblxuICByZXR1cm4gYCR7eWVhcn0vJHttb250aH0vJHtkYXlOdW19YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRoaW5nU2V0ID0geyBpZHMsIHVuaW9uLCBzb3VscywgZGF5U3RyIH07XG4iLCJleHBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5leHBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdEYXRhTm9kZVwiO1xuZXhwb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcblxuY29uc3QgdG9rZW5pemUgPSBzb3VyY2UgPT4ge1xuICBjb25zdCB0b2tlbk1hcCA9IChzb3VyY2UgfHwgXCJcIikuc3BsaXQoXCJcXG5cIikucmVkdWNlKChkZWYsIGxpbmUpID0+IHtcbiAgICBjb25zdCB0b2tlbnMgPSBsaW5lXG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAubWFwKFIudHJpbSlcbiAgICAgIC5maWx0ZXIoeCA9PiB4KTtcblxuICAgIGlmICghdG9rZW5zLmxlbmd0aCkgcmV0dXJuIGRlZjtcbiAgICByZXR1cm4gUi5hc3NvY1BhdGgodG9rZW5zLCB7fSwgZGVmKTtcbiAgfSwge30pO1xuXG4gIGNvbnN0IGlzUHJlc2VudCA9IHAgPT4ge1xuICAgIGxldCBjaGVjayA9IHA7XG5cbiAgICBpZiAodHlwZW9mIHAgPT09IFwic3RyaW5nXCIpIGNoZWNrID0gcC5zcGxpdChcIiBcIik7XG4gICAgcmV0dXJuIGNoZWNrICYmIFIucGF0aChjaGVjaywgdG9rZW5NYXApO1xuICB9O1xuXG4gIGNvbnN0IGdldFZhbHVlcyA9IHAgPT4gUi5rZXlzSW4oaXNQcmVzZW50KHApKTtcbiAgY29uc3QgZ2V0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKVswXSB8fCBudWxsO1xuICBjb25zdCBnZXRMYXN0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKS5wb3AoKSB8fCBudWxsO1xuXG4gIGNvbnN0IGdldFZhbHVlQ2hhaW4gPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgbGV0IG5leHQgPSBwO1xuXG4gICAgd2hpbGUgKG5leHQpIHtcbiAgICAgIG5leHQgPSBnZXRWYWx1ZShbLi4ua2V5cywgLi4udmFsdWVzXSk7XG4gICAgICBuZXh0ICYmIHZhbHVlcy5wdXNoKG5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgY29uc3QgZ2V0UGFpcnMgPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG5cbiAgICByZXR1cm4gZ2V0VmFsdWVzKGtleXMpLnJlZHVjZSgocGFpcnMsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gZ2V0VmFsdWUoWy4uLmtleXMsIGtleV0pO1xuXG4gICAgICByZXR1cm4gWy4uLnBhaXJzLCBba2V5LCB2YWxdXTtcbiAgICB9LCBbXSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2UsXG4gICAgaXNQcmVzZW50LFxuICAgIGdldFZhbHVlLFxuICAgIGdldFZhbHVlcyxcbiAgICBnZXRMYXN0VmFsdWUsXG4gICAgZ2V0VmFsdWVDaGFpbixcbiAgICBnZXRQYWlyc1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IFRva2VuaXplciA9IHsgdG9rZW5pemUgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgb2JqSGFzaCBmcm9tIFwib2JqZWN0LWhhc2hcIjtcbmltcG9ydCB7IGNyZWF0ZVN1cHByZXNzb3IgfSBmcm9tIFwiZ3VuLXN1cHByZXNzb3JcIjtcbmltcG9ydCAqIGFzIHNlYSBmcm9tIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5cbmNvbnN0IGlzTGVnYWN5VGhpbmcgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGRhdGFTb3VsID0gUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKTtcbiAgY29uc3QgbmV3ZXN0ID0gUi53aXRob3V0KFxuICAgIFtcImNvbW1lbnRzXCIsIFwiYWxsY29tbWVudHNcIiwgXCJ2b3Rlc3VwXCIsIFwidm90ZXNkb3duXCJdLFxuICAgIFIua2V5cyhSLnBhdGgoW1wiX1wiLCBcIj5cIl0sIGRhdGEpKVxuICApXG4gICAgLm1hcChrZXkgPT4gUi5wYXRoKFtcIl9cIiwgXCI+XCIsIGtleV0sIGRhdGEpKVxuICAgIC5zb3J0KClcbiAgICAucG9wKCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChkYXRhU291bCkgfHwge307XG4gIGNvbnN0IGlkID0gUi5wcm9wKFwiaWRcIiwgZGF0YSk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSB0aGluZ0lkICYmIG5ld2VzdCAmJiBuZXdlc3QgPCAxNTQzMTAyODE0OTQ1O1xufTtcblxuY29uc3QgdGhpbmdIYXNoTWF0Y2hlc1NvdWwgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiAoXG4gICAgaWQgJiZcbiAgICBpZCA9PT1cbiAgICAgIG9iakhhc2goe1xuICAgICAgICBhdXRob3JJZDogKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkLFxuICAgICAgICB0aW1lc3RhbXA6IHBhcnNlSW50KFIucHJvcChcInRpbWVzdGFtcFwiLCBkYXRhKSwgMTApLFxuICAgICAgICBraW5kOiBSLnByb3AoXCJraW5kXCIsIGRhdGEpLFxuICAgICAgICB0b3BpYzogUi5wcm9wKFxuICAgICAgICAgIFwidG9waWNOYW1lXCIsXG4gICAgICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLm1hdGNoKFIucGF0aChbXCJ0b3BpY1wiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICBvcElkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICByZXBseVRvSWQ6IFIucHJvcChcbiAgICAgICAgICBcInRoaW5nSWRcIixcbiAgICAgICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcInJlcGx5VG9cIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3JpZ2luYWxIYXNoOiBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSlcbiAgICAgIH0pXG4gICk7XG59O1xuXG5jb25zdCBzaWduZWRUaGluZ0RhdGFNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgYXV0aG9ySWQgPSAoUi5wYXRoKFtcImF1dGhvclwiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpLnN1YnN0cigxKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IHNpZ25lZElkID0gUi5wcm9wKFxuICAgIFwiYXV0aG9ySWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGF1dGhvcklkICYmIGF1dGhvcklkID09PSBzaWduZWRJZDtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2ggPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSk7XG4gIGNvbnN0IGlkID0gUi5wcm9wKFxuICAgIFwidGhpbmdJZFwiLFxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKSlcbiAgKTtcblxuICByZXR1cm4gaWQgJiYgaWQgPT09IG9yaWdpbmFsSGFzaDtcbn07XG5cbmNvbnN0IGdldElzVGhpbmdSZWxhdGVkRWRnZSA9IGFqdiA9PiAoXG4gIG5vZGVUeXBlTmFtZSxcbiAgZGF0YSxcbiAgX3BTY2hlbWEsXG4gIF9jUGF0aCxcbiAgcGFyZW50RGF0YVxuKSA9PiB7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBwYXJlbnREYXRhKSB8fCBcIlwiKSB8fCB7fTtcbiAgY29uc3QgeyB0aGluZ0lkOiBwcm9wVGhpbmdJZCB9ID0gU2NoZW1hW25vZGVUeXBlTmFtZV0ucm91dGUubWF0Y2goXG4gICAgUi5wcm9wKFwiI1wiLCBkYXRhKSB8fCBcIlwiXG4gICk7XG5cbiAgaWYgKCF0aGluZ0lkIHx8IHRoaW5nSWQgIT09IHByb3BUaGluZ0lkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhanYuY29tcGlsZSh7ICRyZWY6IGBzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvJHtub2RlVHlwZU5hbWV9RWRnZWAgfSkoXG4gICAgZGF0YVxuICApO1xufTtcblxuY29uc3QgdGhpbmdEYXRhSGFzaE1hdGNoZXMgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCB7IF8sIC4uLnJlY29yZCB9ID0gZGF0YSB8fCB7fTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gIHJlY29yZC50aW1lc3RhbXAgPSBwYXJzZUZsb2F0KHJlY29yZC50aW1lc3RhbXAsIDEwKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPVxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKSB8fCB7fTtcblxuICByZXR1cm4gdGhpbmdJZCAmJiB0aGluZ0lkID09PSBvYmpIYXNoKHJlY29yZCk7XG59O1xuXG5jb25zdCBpc1ZvdGVWYWxpZCA9IChhcmdvbjIsIHNjaGVtYSwgcHJlZml4LCB2b3RlKSA9PiB7XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIsIGNvbmZpZyA9IHt9IH0gPSBzY2hlbWEgfHwge307XG5cbiAgY29uc3Qgbm9uY2UgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbSh2b3RlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcih2b3RlLCBcImhleFwiKTtcbiAgY29uc3Qgc2FsdCA9IEJ1ZmZlci5oYXNPd25Qcm9wZXJ0eShcImZyb21cIilcbiAgICA/IEJ1ZmZlci5mcm9tKG5vbmNlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcihub25jZSwgXCJoZXhcIik7XG4gIGNvbnN0IGhhc2ggPSBhcmdvbjIuaGFzaChwcmVmaXgsIHtcbiAgICBzYWx0LFxuICAgIGhhc2hMZW5ndGg6IGNvbmZpZy5oYXNoTGVuZ3RoLFxuICAgIHRpbWVDb3N0OiBjb25maWcudGltZUNvc3QsXG4gICAgbWVtb3J5Q29zdDogY29uZmlnLm1lbW9yeUNvc3QsXG4gICAgcGFyYWxsZWxpc206IGNvbmZpZy5wYXJhbGxlbGlzbSxcbiAgICByYXc6IHRydWUsXG4gICAgdHlwZTogYXJnb24yW2FsZ29yaXRobV1cbiAgfSk7XG4gIGxldCBvZmYgPSAwO1xuICBsZXQgaTtcblxuICBmb3IgKGkgPSAwOyBpIDw9IGNvbmZpZy5jb21wbGV4aXR5IC0gODsgaSArPSA4LCBvZmYrKykge1xuICAgIGlmIChoYXNoW29mZl0gIT09IDApIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBtYXNrID0gMHhmZiA8PCAoOCArIGkgLSBjb25maWcuY29tcGxleGl0eSk7XG5cbiAgcmV0dXJuIChoYXNoW29mZl0gJiBtYXNrKSA9PT0gMDtcbn07XG5cbmNvbnN0IGtleXNBcmVQcm9vZnNPZldvcmsgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGFyZ29uMiA9IHJlcXVpcmUoXCJhcmdvbjJcIik7XG5cbiAgaWYgKCFhcmdvbjIpIHJldHVybiB0cnVlOyAvLyBpbiBicm93c2VyIGRvbid0IGJvdGhlciBmb3Igbm93XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIgfSA9IHNjaGVtYSB8fCB7fTtcbiAgY29uc3QgcHJlZml4ID0gUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKTtcblxuICBpZiAoYWxnb3JpdGhtICE9PSBcImFyZ29uMmRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgYXJnb24yIHN1cHBvcnRlZCBmb3Igdm90ZSBoYXNoZXNcIik7XG4gIH1cblxuICBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKS5mb3JFYWNoKHZvdGUgPT4ge1xuICAgIGlmICghaXNWb3RlVmFsaWQoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCB2b3RlXCIsIHByZWZpeCwgdm90ZSk7XG4gICAgICBkZWxldGUgZGF0YVt2b3RlXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGRlbGV0ZUxlZ2FjeSA9IChcbiAgc2NoZW1hLFxuICBkYXRhLFxuICBwU2NoZW1hLFxuICBjUGF0aCxcbiAgcGFyZW50RGF0YSxcbiAga2V5SW5QYXJlbnRcbikgPT4ge1xuICBkZWxldGUgcGFyZW50RGF0YVtrZXlJblBhcmVudF07XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgaW5pdEFqdiA9IFIuY29tcG9zZShcbiAgYWp2ID0+IHtcbiAgICBhanYuYWRkS2V5d29yZChcImlzTGVnYWN5VGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IGlzTGVnYWN5VGhpbmdcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0hhc2hNYXRjaGVzU291bFxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBzaWduZWRUaGluZ0RhdGFNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ1JlbGF0ZWRFZGdlXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UoYWp2KVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFIYXNoTWF0Y2hlc1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwia2V5c0FyZVByb29mc09mV29ya1wiLCB7XG4gICAgICB2YWxpZGF0ZToga2V5c0FyZVByb29mc09mV29yayxcbiAgICAgIG1vZGlmeWluZzogdHJ1ZVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiZGVsZXRlTGVnYWN5XCIsIHtcbiAgICAgIHZhbGlkYXRlOiBkZWxldGVMZWdhY3lcbiAgICB9KTtcbiAgICByZXR1cm4gYWp2O1xuICB9LFxuICBzZWEuaW5pdEFqdlxuKTtcblxuZXhwb3J0IGNvbnN0IHN1cHByZXNzb3IgPSBjcmVhdGVTdXBwcmVzc29yKHtcbiAgZGVmaW5pdGlvbnM6IFNjaGVtYS5kZWZpbml0aW9ucyxcbiAgaW5pdDogUi5jb21wb3NlKGluaXRBanYsIFIuYWx3YXlzKHsgcmVtb3ZlQWRkaXRpb25hbDogdHJ1ZSB9KSlcbn0pO1xuXG5jb25zdCBndW5XaXJlSW5wdXQgPSBSLmN1cnJ5KChwZWVyLCBjb250ZXh0KSA9PlxuICBjb250ZXh0Lm9uKFwiaW5cIiwgZnVuY3Rpb24gd2lyZUlucHV0KG1zZykge1xuICAgIGNvbnN0IF8gPSBtc2dbXCJfXCJdO1xuXG4gICAgZGVsZXRlIG1zZ1tcIl9cIl07XG4gICAgaWYgKFwicGluZ1wiIGluIG1zZyB8fCBcImxlZWNoXCIgaW4gbXNnKSByZXR1cm47XG4gICAgaWYgKG1zZy5wdXQgJiYgIVIua2V5cyhtc2cucHV0KS5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBwcm9taXNlID0gcGVlci5jb25maWcuZGlzYWJsZVZhbGlkYXRpb25cbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKG1zZylcbiAgICAgIDogc3VwcHJlc3Nvci52YWxpZGF0ZShtc2cpO1xuXG4gICAgcHJvbWlzZVxuICAgICAgLnRoZW4odmFsaWRhdGVkID0+IHtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHJldHVybiBjb25zb2xlLmxvZyhcIm1zZyBkaWRuJ3QgdmFsaWRhdGVcIiwgbXNnKTtcbiAgICAgICAgbXNnW1wiX1wiXSA9IF87XG4gICAgICAgIHJldHVybiB0aGlzLnRvLm5leHQobXNnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJ2YWxpZGF0ZSBlcnJcIiwgbXNnLCBlcnIuc3RhY2sgfHwgZXJyKSk7XG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgVmFsaWRhdGlvbiA9IHtcbiAgaXNMZWdhY3lUaGluZyxcbiAgdGhpbmdIYXNoTWF0Y2hlc1NvdWwsXG4gIHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMsXG4gIHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2gsXG4gIGdldElzVGhpbmdSZWxhdGVkRWRnZSxcbiAgdGhpbmdEYXRhSGFzaE1hdGNoZXMsXG4gIGlzVm90ZVZhbGlkLFxuICBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICBpbml0QWp2LFxuICBzdXBwcmVzc29yLFxuICBndW5XaXJlSW5wdXRcbn07XG4iLCJpbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5leHBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmV4cG9ydCB7IENvbW1lbnRDb21tYW5kIH0gZnJvbSBcIi4vQ29tbWVudENvbW1hbmRcIjtcbmV4cG9ydCB7IExpc3RpbmcsIExpc3RpbmdPcmFjbGUsIFNwYWNlU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdcIjtcbmV4cG9ydCB7IFBhZ2UgfSBmcm9tIFwiLi9QYWdlXCI7XG5leHBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuZXhwb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5leHBvcnQgeyBUaGluZywgVGhpbmdTZXQsIFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ1wiO1xuZXhwb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gXCIuL1ZhbGlkYXRpb25cIjtcbmV4cG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5leHBvcnQgeyBUYWJ1bGF0b3IgfSBmcm9tIFwiLi9UYWJ1bGF0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IFBlZXIuaW5pdDtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9hcmdvbjJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3Njb3BlX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX3NlYXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfb2JqZWN0X2hhc2hfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcm91dGVfcGFyc2VyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3VyaV9qc19fOyJdLCJzb3VyY2VSb290IjoiIn0=