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
    patternProperties: {
      "^d+$": {
        sea: {
          type: ["string", "null", "undefined"]
        }
      }
    },
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

const deleteMetaForMissing = (schema, data, pSchema, cPath, parentData, keyInParent) => {
  const keys = R.without(["_"], R.keys(data));
  const meta = R.pathOr({}, ["_", ">"], data);
  const metaKeys = R.keys(meta);
  const missing = R.difference(metaKeys, keys);

  if (missing.length) {
    console.log("omiting", missing);
    data["_"][">"] = R.omit(missing, meta);
  }

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
  ajv.addKeyword("deleteMetaForMissing", {
    validate: deleteMetaForMissing,
    modifying: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIklOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkNIQVRfUFJFTE9BRF9JVEVNUyIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsImxlbmd0aCIsInB1c2giLCJqb2luIiwicXVlcnkiLCJtdWx0aVRvcGljIiwiZG9tYWluU291cmNlIiwiZG9tYWlucyIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlZCIsImlkcyIsInRoaW5nSWQiLCJUaGluZyIsInJvdXRlIiwicmV2ZXJzZSIsIm9wU291cmNlIiwic3VibWlzc2lvbklkcyIsIm11bHRpU3VibWlzc2lvbiIsInJlcGxpZXNTb3VyY2UiLCJyZXBsaWVzVG9BdXRob3IiLCJyZXBsaWVzVG9BdXRob3JJZCIsInNvdXJjZXMiLCJsaXN0aW5nIiwicmVwbGllcyIsIm9wIiwiY3VyYXRvciIsImF1dGhvciIsImRvbWFpbiIsInRvcGljIiwic291cmNlTmFtZXMiLCJzb3VyY2VOYW1lIiwiZGVmIiwiZnJvbURlZmluaXRpb24iLCJuYW1lIiwibWVyZ2VMZWZ0IiwiTGlzdGluZ0RhdGFTb3VyY2UiLCJmcm9tU291cmNlIiwic291cmNlIiwib3duZXJJZCIsInNwYWNlTmFtZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsImlzQ2hhdCIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJiYXNlUGF0aCIsInN1Ym1pdFBhdGgiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsImZucyIsImFkZFZvdGVGaWx0ZXIiLCJ0IiwiaWRlbnRpY2FsIiwiaXRlbSIsImtpbmQiLCJhbGlhcyIsImx0ZSIsImd0ZSIsInRoaW5nIiwiY21kcyIsInRhZ05hbWUiLCJjb250ZW50RmlsdGVyIiwidm90ZUZpbHRlciIsInRoaW5nRmlsdGVyIiwiZ2V0RmlsdGVyZWRSb3dzIiwic3BlYyIsInNvcnRlZFJvd3MiLCJsaW1pdCIsImxpbWl0UHJvcCIsImNvdW50IiwiY291bnRQcm9wIiwiYWZ0ZXIiLCJmaWx0ZXJGbiIsInJvd3MiLCJzbGljZSIsImZpbHRlcmVkIiwiZmV0Y2hCYXRjaCIsInNpemUiLCJQcm9taXNlIiwicm93IiwiaW5MaXN0aW5nIiwiUE9TX0lEIiwiY29uc29sZSIsImxvZyIsInNwbGljZSIsIlBPU19WQUwiLCJnZXRGaWx0ZXJlZElkcyIsIngiLCJ0aGluZ01ldGEiLCJ0aGluZ1NvdWwiLCJzY29yZXMiLCJMaXN0aW5nRmlsdGVyIiwiUE9TX0lEWCIsInJvd3NUb0lkcyIsInJvd3NUb0l0ZW1zIiwic291bEZyb21QYXRoIiwicGF0aEZyb21Tb3VsIiwiUmVnRXhwIiwiaWRUb1NvdWwiLCJpZHNUb1NvdWxzIiwic291bFRvSWQiLCJtYXRjaCIsInNvdWxzVG9JZHMiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwiaXRlbUtleXMiLCJmaWx0ZXIiLCJzZXJpYWxpemUiLCJpdGVtcyIsImFkZEluZGV4IiwiYXNzb2MiLCJkZWZhdWx0VG8iLCJzb3J0Um93cyIsInNvcnRXaXRoIiwiYXNjZW5kIiwiY29uZCIsImlzTmlsIiwiSW5maW5pdHkiLCJUIiwic29ydGVkSWRzIiwiaXRlbXNUb1Jvd3MiLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImluc2VydGVkIiwicG9wIiwicmVwbGFjZWQiLCJjYXRlZ29yaXplRGlmZiIsIm9yaWdpbmFsIiwiYWxsS2V5cyIsIl9kaWZmSWR4IiwiZGlmZklkIiwiX29yaWdJZHgiLCJvcmlnSWQiLCJ1bmlvblJvd3MiLCJ1bmlxQnkiLCJyb3dzRnJvbVNvdWxzIiwicmVhZCIsIkxpc3RpbmdOb2RlIiwidXBkYXRlTGlzdGluZyIsIm9yYyIsIm5ld1Njb3BlIiwidG9JdGVtcyIsIndyaXRlIiwib25QdXQiLCJ1cGRhdGVkU291bCIsInByb3BzIiwidXBkYXRlZElkcyIsInNwZWNGcm9tUGF0aCIsIlRoaW5nVm90ZUNvdW50cyIsImlzU3RpY2t5IiwiZXF1YWxzIiwiZ2V0QWNjZXNzZXMiLCJsaXN0ZW4iLCJMaXN0aW5nT3JhY2xlIiwiY2FsY3VsYXRlUm93cyIsInN0aWNreUl0ZW1zIiwiZGF0YVNvdXJjZSIsImNhbGN1bGF0ZSIsInRvTm9kZSIsInBhdGhzIiwic3RpY2t5Um93cyIsImZyb21TcGVjIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsIm5vZGVGcm9tUGF0aCIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIm9sZCIsImFjdGl2ZSIsImxhc3RBY3RpdmUiLCJ0b3AiLCJjb21tZW50cyIsImRpc2N1c3NlZCIsInNjb3JlIiwic2Vjb25kcyIsIm9yZGVyIiwiTWF0aCIsImxvZzEwIiwibWF4IiwiYWJzIiwiaG90Iiwic2lnbiIsImJlc3QiLCJ1cHMiLCJkb3ducyIsIm4iLCJ6IiwibGVmdCIsInJpZ2h0Iiwic3FydCIsInVuZGVyIiwiY29udHJvdmVyc2lhbCIsIm1hZ25pdHVkZSIsImJhbGFuY2UiLCJpc1ZhbGlkU29ydCIsInRvSXRlbSIsImZyb21UaGluZ1NldHMiLCJwaXBlIiwidW5pb24iLCJMaXN0aW5nU29ydCIsImFwcGx5IiwiYXAiLCJvZiIsImdldFNvdXJjZSIsImV4dHJhIiwid2lraVBhZ2UiLCJMaXN0aW5nU3BlYyIsImdldFNpZGViYXIiLCJub3JtYWxUb3BpY3MiLCJzcGxpdFRvcGljcyIsInN1Ym1pdFRvIiwidGFiIiwiQ2hhdExpc3RpbmciLCJ3aXRoUm91dGUiLCJDb21tZW50TGlzdGluZyIsIkNvbW1lbnRlZExpc3RpbmciLCJEb21haW5MaXN0aW5nIiwiRmlyZWhvc2VMaXN0aW5nIiwiZGlmZkRhdGEiLCJ1cGRhdGVkQXV0aG9yZWQiLCJvcElkIiwicmVwbHlJZHMiLCJUaGluZ0NvbW1lbnRzIiwiSW5ib3hMaXN0aW5nIiwidXNlck1ldGEiLCJtZXRhIiwicHJvZmlsZUlkIiwiUHJvZmlsZUxpc3RpbmciLCJzaWRlYmFyUGFnZU5hbWUiLCJvcmlnaW5hbERhdGEiLCJyZW1vdmVkSWRzIiwidm90ZUNvdW50c01hdGNoIiwidGhpbmdNYXRjaCIsIlRoaW5nRGF0YVNpZ25lZCIsImF1dGhvck1hdGNoIiwiU0VBQXV0aG9yIiwiZnJvbVBhZ2VJZCIsImV4aXN0aW5nS2V5cyIsIndvcmsiLCJtZXRob2QiLCJwcmlvcml0eSIsIlNwYWNlTGlzdGluZyIsIlRvcGljTGlzdGluZyIsInR5cGVzIiwidHlwZXNBcnJheSIsInNpZGViYXJGcm9tUGF0aCIsIkVycm9yIiwiYmFzZVNwZWMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJQYXRoIiwiY29uZmlnUGFnZU5hbWUiLCJzb3VyY2VXaXRoRGVmYXVsdHMiLCJub2RlVG9TcGFjZU5hbWVzIiwidXNlclNwYWNlTmFtZXMiLCJ1c2VyUGFnZXMiLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwidHlwZUZyb21QYXRoIiwid2l0aE1hdGNoIiwicGFyYW1zIiwicHJlbG9hZCIsIndpdGhMaXN0aW5nTWF0Y2giLCJzaWRlYmFyIiwic3BhY2UiLCJyZWFsUXVlcnkiLCJwcmVsb2FkTGlzdGluZyIsInRoaW5nU291bHMiLCJ0aGluZ3MiLCJtdWx0aVRoaW5nTWV0YSIsIm9wSWRzIiwib3BTb3VscyIsImNoYXRQYXRoIiwiZ2V0Q2FjaGUiLCJwcmVmaXgiLCJkZWZhdWx0UHJlZml4IiwiaWRlbnRpZmllciIsImRlZmF1bHRJZGVudGlmaWVyIiwiZGVmYXVsdFNvcnQiLCJyZXN0IiwidGhpbmdDb21tZW50cyIsInNwYWNlTGlzdGluZyIsImRlZmF1bHROYW1lIiwiZGVmYXVsdEF1dGhvcklkIiwic3BhY2VUaGluZ0NvbW1lbnRzIiwic3BhY2VQYXRoIiwibGlzdGluZ1BhdGgiLCJwcm9maWxlIiwiZGVmYXVsdFR5cGUiLCJpbmJveCIsIlBhZ2UiLCJpbml0IiwiY29uZmlnIiwibGVlY2giLCJkaXNhYmxlVmFsaWRhdGlvbiIsIm5vR3VuIiwibG9jYWxTdG9yYWdlIiwicGVyc2lzdCIsImNmZyIsInJhZGlzayIsIm9uIiwiZ3VuV2lyZUlucHV0Iiwic3RvcmVGbiIsInN0b3JlIiwiYSIsInJldHJ5Iiwic2VuZExlZWNoIiwiXyIsImNyZWF0ZVNjb3BlIiwic3VibWl0IiwiY29tbWVudCIsImNoYXQiLCJ3cml0ZVBhZ2UiLCJ2b3RlIiwicXVlcmllcyIsIlBlZXIiLCJlbXB0eVByb21pc2UiLCJ1bmlvbkFycmF5cyIsInRvcGljU291bHMiLCJkYXlzIiwiZGF5U3RyaW5ncyIsIm9uZURheSIsInN0YXJ0IiwiRGF0ZSIsImdldFRpbWUiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJyZXBseVRvU291bCIsIm9wU291bCIsInRoaW5naWQiLCJyZXBseVRvSWQiLCJtdWx0aVF1ZXJ5Iiwic2luZ2xlUXVlcnkiLCJwbHVyYWwiLCJzaW5nbGUiLCJjb2xsYXRlIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwic3VibWlzc2lvbk9ubHkiLCJpZHMxIiwiaWRzMiIsInRoaW5nU2NvcmVzIiwidm90ZXMiLCJwcm9taXNlcyIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsImNyZWF0ZWRBdCIsIm5hYiIsIlF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzZWEiLCJBVVRIX1NDSEVNQSIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIlRvcGljRGF5IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiJHJlZiIsInllYXIiLCJtaW5pbXVtIiwibWF4aW11bSIsIm1vbnRoIiwiZGF5IiwicmVxdWlyZWQiLCJwcm9wc0Zyb21Tb3VsIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlZGdlTWF0Y2hlc0tleSIsImFueU9mIiwiVG9waWMiLCJ1cmwiLCJVUkwiLCJhbGxPZiIsInRoaW5nS2luZCIsIm9yaWdpbmFsSGFzaCIsIm9uZU9mIiwidGhpbmdSZWxhdGVkRWRnZSIsImFsbGNvbW1lbnRzIiwidm90ZXN1cCIsInZvdGVzZG93biIsInJlcGx5VG8iLCJ0aGluZ0hhc2hNYXRjaGVzU291bCIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZyIsInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2giLCJpc0xlZ2FjeVRoaW5nIiwiUHJvb2ZPZldvcmtWb3RlcyIsIiRhc3luYyIsImtleXNBcmVQcm9vZnNPZldvcmsiLCJhbGdvcml0aG0iLCJjb21wbGV4aXR5IiwiaGFzaExlbmd0aCIsInRpbWVDb3N0IiwibWVtb3J5Q29zdCIsInBhcmFsbGVsaXNtIiwiVGhpbmdWb3Rlc1VwIiwiVGhpbmdWb3Rlc0Rvd24iLCJUaGluZ0RhdGEiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWwiLCJ1cCIsImRvd24iLCJjb21tYW5kcyIsIkxpc3RpbmdEYXRhIiwicGF0dGVyblByb3BlcnRpZXMiLCJkZWxldGVNZXRhRm9yTWlzc2luZyIsInNvcnROYW1lIiwiZW51bSIsIlRoaW5nQ29tbWVudHNMaXN0aW5nIiwidXNlckxpc3RpbmdUeXBlIiwiQXV0aG9yUmVwbGllc0xpc3RpbmciLCJBdXRob3JQcm9maWxlTGlzdGluZyIsIkF1dGhvckNvbW1lbnRzIiwiQXV0aG9yU3VibWlzc2lvbnMiLCJBdXRob3JUaGluZ3MiLCJyb3V0ZXMiLCJkZWZzV2l0aFJvdXRlcyIsIlNjaGVtYSIsInRhYnVsYXRvclF1ZXJ5IiwicmVwbHlTb3VscyIsImNvbW1hbmRNYXAiLCJKU09OIiwic3RyaW5naWZ5IiwiVGFidWxhdG9yIiwidG9waWNQcmVmaXhlcyIsImNoYXRtc2ciLCJiaW5kIiwiaW5kZXgiLCJyZWN2IiwidGQiLCJvZmYiLCJ0b3BpY1ByZWZpeCIsImJhc2VUb3BpY05hbWUiLCJ0b0xvd2VyQ2FzZSIsInRvcGljRGF5Iiwic2tpcEFsbCIsImFsbG5hbWUiLCJhbGxUb3BpYyIsImFsbFRvcGljRGF5Iiwic2V0IiwidXJsSW5mbyIsImhvc3QiLCJzY2hlbWUiLCJ1cmxOb2RlIiwicHV0IiwiZGF0YVNvdWwiLCJtZXRhRGF0YSIsInB1YiIsInRoaW5nc1NvdWwiLCJzdWJtaXNzaW9uc1NvdWwiLCJjb21tZW50c1NvdWwiLCJyZWplY3QiLCJwYWdlc1NvdWwiLCJjaGFpbiIsIm5vbmNlIiwidXJsU3RyIiwiVGhpbmdEYXRhTm9kZSIsImRpc3NvYyIsImQiLCJnZXRVVENGdWxsWWVhciIsImdldFVUQ01vbnRoIiwiZGF5TnVtIiwiZ2V0VVRDRGF0ZSIsIlRoaW5nU2V0IiwidG9rZW5NYXAiLCJsaW5lIiwidG9rZW5zIiwiY2hlY2siLCJrZXlzSW4iLCJnZXRMYXN0VmFsdWUiLCJuZXh0IiwicGFpcnMiLCJUb2tlbml6ZXIiLCJzY2hlbWEiLCJuZXdlc3QiLCJfc2NoZW1hIiwic3Vic3RyIiwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyIsInNpZ25lZElkIiwiZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlIiwiYWp2Iiwibm9kZVR5cGVOYW1lIiwiX3BTY2hlbWEiLCJfY1BhdGgiLCJwYXJlbnREYXRhIiwicHJvcFRoaW5nSWQiLCJjb21waWxlIiwidGhpbmdEYXRhSGFzaE1hdGNoZXMiLCJyZWNvcmQiLCJpc1ZvdGVWYWxpZCIsImFyZ29uMiIsIkJ1ZmZlciIsImhhc093blByb3BlcnR5IiwiZnJvbSIsInNhbHQiLCJoYXNoIiwicmF3IiwibWFzayIsInJlcXVpcmUiLCJwU2NoZW1hIiwiY1BhdGgiLCJrZXlJblBhcmVudCIsIm1ldGFLZXlzIiwiZGlmZmVyZW5jZSIsIm9taXQiLCJpbml0QWp2IiwiYWRkS2V5d29yZCIsInZhbGlkYXRlIiwibW9kaWZ5aW5nIiwic3VwcHJlc3NvciIsInJlbW92ZUFkZGl0aW9uYWwiLCJjb250ZXh0Iiwid2lyZUlucHV0IiwibXNnIiwicHJvbWlzZSIsInZhbGlkYXRlZCIsInRvIiwiY2F0Y2giLCJlcnJvciIsInN0YWNrIiwiVmFsaWRhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBRUEsTUFBTUEsTUFBTSxHQUFHQyxDQUFDLENBQUNDLEtBQUYsQ0FDYixDQUFDQyxJQUFELEVBQU9DLFFBQVAsRUFBaUJDLFFBQWpCLEVBQTJCQyxJQUFJLEdBQUcsRUFBbEMsS0FDRSxzQkFBWSxDQUFDQyxFQUFELEVBQUtDLElBQUwsS0FBYztBQUN4QixNQUFJTCxJQUFJLElBQUlBLElBQUksQ0FBQ00sR0FBYixJQUFvQk4sSUFBSSxDQUFDTSxHQUFMLENBQVNDLElBQWpDLEVBQXVDO0FBQ3JDLFVBQU1BLElBQUksR0FBR1AsSUFBSSxDQUFDTSxHQUFMLENBQVNDLElBQVQsRUFBYjs7QUFFQSxzQkFBUUMsT0FBUixDQUNFRCxJQUFJLENBQUNFLE1BQUwsQ0FDRVIsUUFERixFQUVFQyxRQUZGLEVBR0VRLEdBQUcsSUFBSTtBQUNMLFVBQUlBLEdBQUcsQ0FBQ0MsR0FBUixFQUFhO0FBQ1hOLFlBQUksQ0FBQ0ssR0FBRyxDQUFDQyxHQUFMLENBQUo7QUFDQUosWUFBSSxDQUFDSyxLQUFMO0FBQ0FaLFlBQUksQ0FBQ00sR0FBTCxDQUFTQyxJQUFULEdBQWdCSyxLQUFoQjtBQUNELE9BSkQsTUFJTztBQUNMWixZQUFJLENBQUNhLEtBQUwsQ0FBV1osUUFBWCxFQUFxQkMsUUFBckIsRUFBK0JZLElBQS9CLENBQW9DVixFQUFwQztBQUNEO0FBQ0YsS0FYSCxFQVlFRCxJQVpGLENBREY7QUFnQkQsR0FuQkQsTUFtQk87QUFDTEUsUUFBSSxDQUFDLG1CQUFELENBQUo7QUFDRDtBQUNGLENBdkJELENBRlcsQ0FBZjtBQTRCQSxNQUFNUSxLQUFLLEdBQUdmLENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFpQkMsUUFBakIsS0FDcEIsc0JBQVksQ0FBQ0UsRUFBRCxFQUFLQyxJQUFMLEtBQWM7QUFDeEIsTUFBSUwsSUFBSSxJQUFJQSxJQUFJLENBQUNNLEdBQWIsSUFBb0JOLElBQUksQ0FBQ00sR0FBTCxDQUFTQyxJQUFqQyxFQUF1QztBQUNyQyxVQUFNQSxJQUFJLEdBQUdQLElBQUksQ0FBQ00sR0FBTCxDQUFTQyxJQUFULEVBQWI7QUFFQUEsUUFBSSxDQUFDUSxJQUFMLENBQVVkLFFBQVYsRUFBb0JDLFFBQXBCLEVBQThCUSxHQUFHLElBQy9CQSxHQUFHLENBQUNDLEdBQUosR0FBVU4sSUFBSSxDQUFDSyxHQUFHLENBQUNDLEdBQUwsQ0FBZCxHQUEwQlAsRUFBRSxDQUFDSixJQUFJLENBQUNNLEdBQUwsQ0FBU0MsSUFBVCxHQUFnQlMsRUFBakIsQ0FEOUI7QUFHRCxHQU5ELE1BTU87QUFDTFgsUUFBSSxDQUFDLG1CQUFELENBQUo7QUFDRDtBQUNGLENBVkQsRUFVR1MsSUFWSCxDQVVRRyxNQUFNLElBQUk7QUFDaEJqQixNQUFJLENBQUNrQixRQUFMLElBQWlCbEIsSUFBSSxDQUFDa0IsUUFBTCxDQUFjRCxNQUFkLENBQWpCLENBRGdCLENBQ3dCOztBQUN4QyxTQUFPQSxNQUFQO0FBQ0QsQ0FiRCxDQURZLENBQWQ7O0FBaUJBLE1BQU1FLE1BQU0sR0FBR25CLElBQUksSUFBSUEsSUFBSSxDQUFDTSxHQUFMLENBQVNDLElBQVQsR0FBZ0JLLEtBQWhCLEVBQXZCOztBQUNBLE1BQU1RLFVBQVUsR0FBR3BCLElBQUksSUFBSUEsSUFBSSxDQUFDTSxHQUFMLElBQVlOLElBQUksQ0FBQ00sR0FBTCxDQUFTQyxJQUFyQixJQUE2QlAsSUFBSSxDQUFDTSxHQUFMLENBQVNDLElBQVQsR0FBZ0JTLEVBQXhFOztBQUNBLE1BQU1LLE9BQU8sR0FBR3ZCLENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQUNDLElBQUQsRUFBT3NCLEVBQVAsS0FBZXRCLElBQUksQ0FBQ2tCLFFBQUwsR0FBZ0JJLEVBQXZDLENBQWhCLEMsQ0FBNkQ7O0FBRXRELE1BQU1DLGNBQWMsR0FBRztBQUM1QjFCLFFBRDRCO0FBRTVCZ0IsT0FGNEI7QUFHNUJNLFFBSDRCO0FBSTVCQyxZQUo0QjtBQUs1QkM7QUFMNEIsQ0FBdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERQOztBQUNBOzs7O0FBRUEsTUFBTUcsUUFBUSxHQUFHMUIsQ0FBQyxDQUFDMkIsT0FBRixDQUNmM0IsQ0FBQyxDQUFDNEIsR0FBRixDQUFNNUIsQ0FBQyxDQUFDNkIsSUFBUixDQURlLEVBRWY3QixDQUFDLENBQUM4QixLQUFGLENBQVEsR0FBUixDQUZlLEVBR2Y5QixDQUFDLENBQUMrQixPQUFGLENBQVUscUJBQVVDLFVBQXBCLEVBQWdDLEVBQWhDLENBSGUsRUFJZmhDLENBQUMsQ0FBQ2lDLE1BQUYsQ0FBUyxFQUFULEVBQWEsQ0FBYixDQUplLEVBS2ZqQyxDQUFDLENBQUM4QixLQUFGLENBQVEsSUFBUixDQUxlLENBQWpCOztBQVFBLE1BQU1GLEdBQUcsR0FBR00sU0FBUyxJQUNuQmxDLENBQUMsQ0FBQ21DLE1BQUYsQ0FDRSxDQUFDQyxNQUFELEVBQVNDLEVBQVQsS0FBZ0I7QUFDZCxRQUFNQyxJQUFJLEdBQUd0QyxDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQ0YsRUFBRCxFQUFLLE1BQUwsQ0FBUCxFQUFxQkgsU0FBckIsQ0FBYjtBQUNBLFFBQU1NLFFBQVEsR0FBR3hDLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDRixFQUFELEVBQUssVUFBTCxDQUFQLEVBQXlCSCxTQUF6QixLQUF1QyxNQUF4RDtBQUNBLFFBQU1PLFNBQVMsR0FBR0MsVUFBVSxDQUFDMUMsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUNGLEVBQUQsRUFBSyxXQUFMLENBQVAsRUFBMEJILFNBQTFCLENBQUQsQ0FBNUI7QUFFQSxNQUFJLENBQUNsQyxDQUFDLENBQUMyQyxJQUFGLENBQU8scUJBQVVYLFVBQWpCLEVBQTZCTSxJQUE3QixDQUFMLEVBQXlDLE9BQU9GLE1BQVA7QUFDekMsUUFBTVEsU0FBUyxHQUFHLENBQUNKLFFBQUQsRUFBVyxHQUFHZCxRQUFRLENBQUNZLElBQUQsQ0FBdEIsRUFBOEJELEVBQTlCLENBQWxCO0FBRUEsU0FBT3JDLENBQUMsQ0FBQzZDLFNBQUYsQ0FBWUQsU0FBWixFQUF1QkgsU0FBUyxJQUFJLENBQXBDLEVBQXVDTCxNQUF2QyxDQUFQO0FBQ0QsQ0FWSCxFQVdFLEVBWEYsRUFZRXBDLENBQUMsQ0FBQzhDLElBQUYsQ0FBT1osU0FBUCxDQVpGLENBREY7O0FBZ0JPLE1BQU1hLGNBQWMsR0FBRztBQUFFckIsVUFBRjtBQUFZRTtBQUFaLENBQXZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCUDs7QUFDQTs7OztBQUVPLE1BQU1vQixNQUFNLEdBQUc7QUFDcEJDLFdBQVMsRUFBRSxxQkFBVUMsT0FERDtBQUVwQkMsU0FBTyxFQUFFLHFCQUFVRCxPQUZDO0FBR3BCRSxPQUFLLEVBQUUscUJBQVVGLE9BSEc7QUFJcEJHLFFBQU0sRUFBRXJELENBQUMsQ0FBQzJCLE9BQUYsQ0FDTjNCLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTSxDQUFDLENBQUMwQixHQUFELEVBQU1DLEdBQU4sQ0FBRCxLQUFpQlAsTUFBTSxDQUFDTSxHQUFELENBQU4sR0FBY0MsR0FBckMsQ0FETSxFQUVOdkQsQ0FBQyxDQUFDd0QsT0FGSTtBQUpZLENBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIUCxNQUFNeEIsVUFBVSxHQUFHLFFBQW5CO0FBQ0EsTUFBTXlCLE1BQU0sR0FBRyxLQUFmO0FBQ0EsTUFBTUMsY0FBYyxHQUFHLE1BQXZCO0FBRUEsTUFBTUMsWUFBWSxHQUFHLElBQXJCO0FBRUEsTUFBTUMsYUFBYSxHQUFHLEVBQXRCO0FBQ0EsTUFBTUMsa0JBQWtCLEdBQUcsRUFBM0I7QUFDQSxNQUFNQyxjQUFjLEdBQUcsRUFBdkI7QUFDQSxNQUFNQyxxQkFBcUIsR0FBRyxHQUE5QjtBQUNBLE1BQU1DLGtCQUFrQixHQUFHLEdBQTNCLEMsQ0FBZ0M7O0FBQ2hDLE1BQU1DLFlBQVksR0FBRyxJQUFyQjtBQUNBLE1BQU1DLGVBQWUsR0FBRyxHQUF4QjtBQUNBLE1BQU1DLG1CQUFtQixHQUFHLEVBQTVCO0FBQ0EsTUFBTUMsb0JBQW9CLEdBQUcsR0FBN0I7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxLQUE1QjtBQUVBLE1BQU1DLG9CQUFvQixHQUFHLEtBQTdCO0FBQ0EsTUFBTUMsdUJBQXVCLEdBQUcsS0FBaEM7QUFDQSxNQUFNQyxxQkFBcUIsR0FBRyxJQUE5QjtBQUVBLE1BQU1DLDRCQUE0QixHQUFHWCxjQUFyQztBQUNBLE1BQU1ZLGdDQUFnQyxHQUFHVixrQkFBekM7QUFDQSxNQUFNVywwQkFBMEIsR0FBRyxFQUFuQztBQUNBLE1BQU1DLDBCQUEwQixHQUFHZCxjQUFuQztBQUNBLE1BQU1lLDBCQUEwQixHQUFHLEVBQW5DO0FBRUEsTUFBTUMsa0JBQWtCLEdBQUcsRUFBM0I7QUFFQSxNQUFNNUIsT0FBTyxHQUNYLHlGQURGO0FBR08sTUFBTTZCLFNBQVMsR0FBRztBQUN2Qi9DLFlBRHVCO0FBRXZCeUIsUUFGdUI7QUFHdkJDLGdCQUh1QjtBQUl2QkMsY0FKdUI7QUFLdkJDLGVBTHVCO0FBTXZCQyxvQkFOdUI7QUFPdkJDLGdCQVB1QjtBQVF2QkMsdUJBUnVCO0FBU3ZCQyxvQkFUdUI7QUFVdkJDLGNBVnVCO0FBV3ZCQyxpQkFYdUI7QUFZdkJDLHFCQVp1QjtBQWF2QkMsc0JBYnVCO0FBY3ZCQyxxQkFkdUI7QUFldkJDLHNCQWZ1QjtBQWdCdkJDLHlCQWhCdUI7QUFpQnZCQyx1QkFqQnVCO0FBa0J2QkMsOEJBbEJ1QjtBQW1CdkJDLGtDQW5CdUI7QUFvQnZCQyw0QkFwQnVCO0FBcUJ2QkMsNEJBckJ1QjtBQXNCdkJDLDRCQXRCdUI7QUF1QnZCQyxvQkF2QnVCO0FBd0J2QjVCO0FBeEJ1QixDQUFsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQlA7Ozs7QUFEQTtBQUdBLE1BQU04QixJQUFJLEdBQUdoRixDQUFDLENBQUNpRixNQUFGLENBQVMsRUFBVCxFQUFhLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBYixDQUFiO0FBQ0EsTUFBTUMsS0FBSyxHQUFHbEYsQ0FBQyxDQUFDaUYsTUFBRixDQUFTLEVBQVQsRUFBYSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsQ0FBZDtBQUVBLE1BQU1FLE1BQU0sR0FBR25GLENBQUMsQ0FBQzJCLE9BQUYsQ0FDYjNCLENBQUMsQ0FBQ29GLElBRFcsRUFFYnBGLENBQUMsQ0FBQ3FGLE1BQUYsQ0FBU3JGLENBQUMsQ0FBQ3NGLFFBQVgsQ0FGYSxFQUdidEYsQ0FBQyxDQUFDdUYsTUFIVyxFQUliTCxLQUphLENBQWY7QUFPQSxNQUFNTSxLQUFLLEdBQUd4RixDQUFDLENBQUMyQixPQUFGLENBQ1ozQixDQUFDLENBQUM0QixHQUFGLENBQU01QixDQUFDLENBQUN5RixJQUFGLENBQU8sR0FBUCxDQUFOLENBRFksRUFFWnpGLENBQUMsQ0FBQ3VGLE1BRlUsQ0FBZDs7QUFLQSxTQUFTRyxTQUFULENBQW1CQyxPQUFuQixFQUE0QjtBQUMxQixRQUFNQyxJQUFJLEdBQUdELE9BQU8sR0FBRyxFQUFFLEdBQUdBO0FBQUwsR0FBSCxHQUFvQkEsT0FBeEM7QUFDQSxRQUFNWCxJQUFJLEdBQUdoRixDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFQLEVBQW1CcUQsSUFBbkIsQ0FBYjtBQUVBLE1BQUksQ0FBQ1osSUFBRCxJQUFTLENBQUNhLEdBQUcsQ0FBQ0MsR0FBZCxJQUFxQmQsSUFBSSxDQUFDZSxPQUFMLENBQWEsR0FBYixNQUFzQixDQUFDLENBQWhELEVBQW1ELE9BQU9KLE9BQVA7QUFDbkQzRixHQUFDLENBQUNnRyxPQUFGLENBQVUsQ0FBQyxHQUFELENBQVYsRUFBaUJoRyxDQUFDLENBQUM4QyxJQUFGLENBQU84QyxJQUFQLENBQWpCLEVBQStCSyxPQUEvQixDQUF1QzNDLEdBQUcsSUFBSTtBQUM1Q3VDLE9BQUcsQ0FBQ0MsR0FBSixDQUFRSSxNQUFSLENBQ0VMLEdBQUcsQ0FBQ0MsR0FBSixDQUFRSyxHQUFSLENBQVlDLElBQVosQ0FBaUJULE9BQU8sQ0FBQ3JDLEdBQUQsQ0FBeEIsRUFBK0JBLEdBQS9CLEVBQW9DcUMsT0FBcEMsRUFBNkNYLElBQTdDLENBREYsRUFFRSxLQUZGLEVBR0VxQixHQUFHLElBQUtULElBQUksQ0FBQ3RDLEdBQUQsQ0FBSixHQUFZdUMsR0FBRyxDQUFDQyxHQUFKLENBQVFLLEdBQVIsQ0FBWUcsTUFBWixDQUFtQkQsR0FBbkIsRUFBd0IvQyxHQUF4QixFQUE2QnFDLE9BQTdCLENBSHRCO0FBS0QsR0FORDtBQU9BLFNBQU9DLElBQVA7QUFDRDs7QUFBQTtBQUVNLE1BQU1XLE9BQU8sR0FBRztBQUFFdkIsTUFBRjtBQUFRRSxPQUFSO0FBQWVDLFFBQWY7QUFBdUJLLE9BQXZCO0FBQThCRTtBQUE5QixDQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ1A7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNYyxXQUFXLEdBQUdDLFVBQVUsSUFDNUIsQ0FBQyxDQUFDekcsQ0FBQyxDQUFDMEcsSUFBRixDQUFPRCxVQUFVLENBQUNFLFNBQWxCLEVBQTZCLENBQzdCLFVBRDZCLEVBRTdCLFVBRjZCLEVBRzdCLFdBSDZCLEVBSTdCLG9CQUo2QixFQUs3QixLQUw2QixFQU03QixPQU42QixFQU83QixPQVA2QixFQVE3QixZQVI2QixDQUE3QixDQURKOztBQVlBLE1BQU1DLFNBQVMsR0FBR0gsVUFBVSxJQUMxQixDQUFDLENBQUN6RyxDQUFDLENBQUMwRyxJQUFGLENBQU9ELFVBQVUsQ0FBQ0UsU0FBbEIsRUFBNkIsQ0FDN0IsT0FENkIsRUFFN0IsUUFGNkIsRUFHN0IsUUFINkIsRUFJN0IsbUJBSjZCLEVBSzdCLE1BTDZCLEVBTTdCLE1BTjZCLEVBTzdCLGdCQVA2QixFQVE3QixjQVI2QixFQVM3QixPQVQ2QixFQVU3QixZQVY2QixFQVc3QixXQVg2QixFQVk3QixZQVo2QixFQWE3QixXQWI2QixDQUE3QixDQURKOztBQWlCQSxNQUFNRSxtQkFBbUIsR0FBRyxxQkFBTSxDQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZU4sVUFBZixLQUNoQyxrQkFBUU8sR0FBUixDQUNFaEgsQ0FBQyxDQUFDNEIsR0FBRixDQUFNb0QsSUFBSSxJQUFJLHlCQUFZaUMsWUFBWixDQUF5QkgsS0FBekIsRUFBZ0M5QixJQUFoQyxFQUFzQ3lCLFVBQXRDLENBQWQsRUFBaUVNLEtBQWpFLENBREYsRUFFRS9GLElBRkYsQ0FFTyx5QkFBWWtHLFNBRm5CLENBRDBCLENBQTVCO0FBTUEsTUFBTUMsa0JBQWtCLEdBQUcscUJBQU0sQ0FBQ0wsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWYsS0FDL0Isa0JBQVFPLEdBQVIsQ0FBWWhILENBQUMsQ0FBQzRCLEdBQUYsQ0FBTWtGLEtBQUssQ0FBQ00sR0FBWixFQUFpQkwsS0FBakIsQ0FBWixFQUNHL0YsSUFESCxDQUNRaEIsQ0FBQyxDQUFDbUMsTUFBRixDQUFTbkMsQ0FBQyxDQUFDcUgsVUFBWCxFQUF1QixFQUF2QixDQURSLEVBRUdyRyxJQUZILENBRVEsZ0JBQVMrRixLQUZqQixFQUdHL0YsSUFISCxDQUdRK0YsS0FBSyxJQUFJRixtQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWYsQ0FIcEMsQ0FEeUIsQ0FBM0I7O0FBT0EsTUFBTWEsYUFBYSxHQUFHYixVQUFVLElBQUk7QUFDbEMsUUFBTWMsUUFBUSxHQUFHdkgsQ0FBQyxDQUFDaUYsTUFBRixDQUFTLEVBQVQsRUFBYSxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXFCLFVBQXJCLENBQWIsRUFBK0N3QixVQUEvQyxDQUFqQjtBQUNBLFFBQU07QUFBRWU7QUFBRixNQUFXZixVQUFqQjtBQUNBLFFBQU1nQixZQUFZLEdBQUd6SCxDQUFDLENBQUM0QixHQUFGLENBQU04RixDQUFDLElBQUssR0FBRUEsQ0FBRSxJQUFHRixJQUFLLEVBQXhCLEVBQTJCRCxRQUEzQixDQUFyQjtBQUVBLFNBQU87QUFBRUU7QUFBRixHQUFQO0FBQ0QsQ0FORDs7QUFRQSxNQUFNRSxXQUFXLEdBQUdsQixVQUFVLElBQUk7QUFDaEMsUUFBTTtBQUFFZTtBQUFGLE1BQVdmLFVBQWpCO0FBQ0EsUUFBTW1CLE1BQU0sR0FBRzVILENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXFCLFFBQXJCLENBQVAsRUFBdUNrRSxVQUF2QyxLQUFzRCxFQUFyRTtBQUVBLE1BQUksQ0FBQ21CLE1BQU0sQ0FBQ0MsTUFBWixFQUFvQkQsTUFBTSxDQUFDRSxJQUFQLENBQVksS0FBWixFQUpZLENBS2hDOztBQUNBLFFBQU1MLFlBQVksR0FBRyxDQUFFLE1BQUtHLE1BQU0sQ0FBQ0osSUFBUCxHQUFjTyxJQUFkLENBQW1CLEdBQW5CLENBQXdCLElBQUdQLElBQUssRUFBdkMsQ0FBckI7O0FBRUEsUUFBTVEsS0FBSyxHQUFHbEIsS0FBSyxJQUNqQixhQUFNbUIsVUFBTixDQUFpQm5CLEtBQWpCLEVBQXdCO0FBQUVjLFVBQUY7QUFBVUo7QUFBVixHQUF4QixFQUEwQ3hHLElBQTFDLENBQStDK0YsS0FBSyxJQUNsREYsbUJBQW1CLENBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFlTixVQUFmLENBRHJCLENBREY7O0FBS0EsU0FBTztBQUFFZ0IsZ0JBQUY7QUFBZ0JPO0FBQWhCLEdBQVA7QUFDRCxDQWREOztBQWdCQSxNQUFNRSxZQUFZLEdBQUd6QixVQUFVLElBQUk7QUFDakMsUUFBTTtBQUFFZTtBQUFGLE1BQVdmLFVBQWpCO0FBQ0EsUUFBTTBCLE9BQU8sR0FBR25JLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXFCLFNBQXJCLENBQVAsRUFBd0NrRSxVQUF4QyxLQUF1RCxFQUF2RTtBQUVBLE1BQUksQ0FBQzBCLE9BQU8sQ0FBQ04sTUFBYixFQUFxQixPQUFPRixXQUFXLENBQUNsQixVQUFELENBQWxCLENBSlksQ0FLakM7O0FBQ0EsUUFBTWdCLFlBQVksR0FBRyxDQUFFLFdBQVVVLE9BQU8sQ0FBQ1gsSUFBUixHQUFlTyxJQUFmLENBQW9CLEdBQXBCLENBQXlCLElBQUdQLElBQUssRUFBN0MsQ0FBckI7O0FBQ0EsUUFBTVEsS0FBSyxHQUFHbEIsS0FBSyxJQUNqQixhQUFNc0IsV0FBTixDQUFrQnRCLEtBQWxCLEVBQXlCO0FBQUVxQixXQUFGO0FBQVdYO0FBQVgsR0FBekIsRUFBNEN4RyxJQUE1QyxDQUFpRCtGLEtBQUssSUFDcERGLG1CQUFtQixDQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZU4sVUFBZixDQURyQixDQURGOztBQUtBLFNBQU87QUFBRWdCLGdCQUFGO0FBQWdCTztBQUFoQixHQUFQO0FBQ0QsQ0FiRDs7QUFlQSxNQUFNSyxZQUFZLEdBQUc1QixVQUFVLElBQUk7QUFDakMsUUFBTTtBQUFFZTtBQUFGLE1BQVdmLFVBQWpCO0FBQ0EsUUFBTTZCLFNBQVMsR0FBR3RJLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXFCLFNBQXJCLENBQVAsRUFBd0NrRSxVQUF4QyxDQUFsQjtBQUNBLFFBQU04QixJQUFJLEdBQUd2SSxDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxTQUFELEVBQVksT0FBWixFQUFxQixNQUFyQixDQUFQLEVBQXFDa0UsVUFBckMsQ0FBYjtBQUVBLE1BQUksQ0FBQzZCLFNBQVMsQ0FBQ1QsTUFBZixFQUF1QixPQUFPRixXQUFXLENBQUNsQixVQUFELENBQWxCO0FBQ3ZCLFFBQU1nQixZQUFZLEdBQUd6SCxDQUFDLENBQUM0QixHQUFGLENBQU1TLEVBQUUsSUFBSyxTQUFRQSxFQUFHLElBQUdrRyxJQUFLLElBQUdmLElBQUssRUFBeEMsRUFBMkNjLFNBQTNDLENBQXJCOztBQUNBLFFBQU1OLEtBQUssR0FBR2xCLEtBQUssSUFDakIsYUFBTTBCLFdBQU4sQ0FBa0IxQixLQUFsQixFQUF5QjtBQUFFeUIsUUFBRjtBQUFRRDtBQUFSLEdBQXpCLEVBQThDdEgsSUFBOUMsQ0FBbUQrRixLQUFLLElBQ3RERixtQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWYsQ0FEckIsQ0FERjs7QUFLQSxTQUFPO0FBQUVnQixnQkFBRjtBQUFnQk87QUFBaEIsR0FBUDtBQUNELENBYkQ7O0FBZUEsTUFBTVMsYUFBYSxHQUFHaEMsVUFBVSxJQUFJO0FBQ2xDLFFBQU07QUFBRWU7QUFBRixNQUFXZixVQUFqQjtBQUNBLFFBQU1pQyxRQUFRLEdBQUcxSSxDQUFDLENBQUN5RixJQUFGLENBQU8sVUFBUCxFQUFtQmdCLFVBQW5CLEtBQWtDLEVBQW5EO0FBRUEsTUFBSSxDQUFDaUMsUUFBUSxDQUFDYixNQUFkLEVBQXNCLE9BQU9GLFdBQVcsQ0FBQ2xCLFVBQUQsQ0FBbEI7QUFDdEIsUUFBTWdCLFlBQVksR0FBR3pILENBQUMsQ0FBQzRCLEdBQUYsQ0FBTVMsRUFBRSxJQUFLLFNBQVFBLEVBQUcsY0FBYW1GLElBQUssRUFBMUMsRUFBNkNrQixRQUE3QyxDQUFyQjs7QUFDQSxRQUFNVixLQUFLLEdBQUdsQixLQUFLLElBQ2pCLGFBQU02QixPQUFOLENBQWM3QixLQUFkLEVBQXFCNEIsUUFBckIsRUFBK0IsSUFBL0IsRUFDRzFILElBREgsQ0FDUTRILEdBQUcsSUFBSUEsR0FBRyxDQUFDaEgsR0FBSixDQUFRaUgsT0FBTyxJQUFJLGVBQU9DLEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRUg7QUFBRixHQUEzQixDQUFuQixDQURmLEVBRUc3SCxJQUZILENBRVErRixLQUFLLElBQUlGLG1CQUFtQixDQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZU4sVUFBZixDQUZwQyxDQURGOztBQUtBLFNBQU87QUFBRWdCLGdCQUFGO0FBQWdCTztBQUFoQixHQUFQO0FBQ0QsQ0FaRDs7QUFjQSxNQUFNaUIsUUFBUSxHQUFHeEMsVUFBVSxJQUFJO0FBQzdCLFFBQU07QUFBRWU7QUFBRixNQUFXZixVQUFqQjtBQUNBLFFBQU15QyxhQUFhLEdBQUdsSixDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxTQUFELEVBQVksT0FBWixFQUFxQixLQUFyQixDQUFQLEVBQW9Da0UsVUFBcEMsQ0FBdEI7QUFFQSxNQUFJLENBQUN5QyxhQUFhLENBQUNyQixNQUFuQixFQUEyQkYsV0FBVyxDQUFDbEIsVUFBRCxDQUFYO0FBQzNCLFFBQU1nQixZQUFZLEdBQUd6SCxDQUFDLENBQUM0QixHQUFGLENBQ25CUyxFQUFFLElBQUssV0FBVUEsRUFBRyxhQUFZbUYsSUFBSyxFQURsQixFQUVuQjBCLGFBRm1CLENBQXJCOztBQUlBLFFBQU1sQixLQUFLLEdBQUdsQixLQUFLLElBQ2pCLGFBQU1xQyxlQUFOLENBQXNCckMsS0FBdEIsRUFBNkI7QUFBRW9DO0FBQUYsR0FBN0IsRUFBZ0RsSSxJQUFoRCxDQUFxRCtGLEtBQUssSUFDeERGLG1CQUFtQixDQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZU4sVUFBZixDQURyQixDQURGOztBQUtBLFNBQU87QUFBRWdCLGdCQUFGO0FBQWdCTztBQUFoQixHQUFQO0FBQ0QsQ0FmRDs7QUFpQkEsTUFBTW9CLGFBQWEsR0FBRzNDLFVBQVUsSUFBSTtBQUNsQyxRQUFNO0FBQUVlO0FBQUYsTUFBV2YsVUFBakI7QUFDQSxRQUFNcEUsRUFBRSxHQUFHckMsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBcUIsV0FBckIsQ0FBUCxFQUEwQ2tFLFVBQTFDLENBQVg7QUFDQSxRQUFNOEIsSUFBSSxHQUFHdkksQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBcUIsTUFBckIsQ0FBUCxFQUFxQ2tFLFVBQXJDLENBQWI7QUFFQSxRQUFNZ0IsWUFBWSxHQUFHLENBQUUsU0FBUXBGLEVBQUcsWUFBV2tHLElBQUssSUFBR2YsSUFBSyxFQUFyQyxDQUFyQjs7QUFDQSxRQUFNUSxLQUFLLEdBQUdsQixLQUFLLElBQ2pCLGFBQU11QyxlQUFOLENBQXNCdkMsS0FBdEIsRUFBNkI7QUFDM0J5QixRQUQyQjtBQUUzQmUscUJBQWlCLEVBQUVqSCxFQUZRO0FBRzNCYyxXQUFPLEVBQUVzRCxVQUFVLENBQUN0RDtBQUhPLEdBQTdCLEVBSUduQyxJQUpILENBSVErRixLQUFLLElBQUlGLG1CQUFtQixDQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZU4sVUFBZixDQUpwQyxDQURGOztBQU9BLFNBQU87QUFBRWdCLGdCQUFGO0FBQWdCTztBQUFoQixHQUFQO0FBQ0QsQ0FkRDs7QUFnQkEsTUFBTXVCLE9BQU8sR0FBRztBQUNkQyxTQUFPLEVBQUVsQyxhQURLO0FBRWRtQyxTQUFPLEVBQUVMLGFBRks7QUFHZE0sSUFBRSxFQUFFVCxRQUhVO0FBSWRVLFNBQU8sRUFBRWxCLGFBSks7QUFLZG1CLFFBQU0sRUFBRXZCLFlBTE07QUFNZHdCLFFBQU0sRUFBRTNCLFlBTk07QUFPZDRCLE9BQUssRUFBRW5DO0FBUE8sQ0FBaEI7QUFVQSxNQUFNb0MsV0FBVyxHQUFHL0osQ0FBQyxDQUFDOEMsSUFBRixDQUFPeUcsT0FBUCxDQUFwQjs7QUFDQSxNQUFNUyxVQUFVLEdBQUdDLEdBQUcsSUFBSWpLLENBQUMsQ0FBQzBHLElBQUYsQ0FBT3VELEdBQUcsQ0FBQ3RELFNBQVgsRUFBc0JvRCxXQUF0QixLQUFzQyxPQUFoRTs7QUFDQSxNQUFNRyxjQUFjLEdBQUd6RCxVQUFVLElBQUk7QUFDbkMsUUFBTTBELElBQUksR0FBR0gsVUFBVSxDQUFDdkQsVUFBRCxDQUF2QjtBQUVBLFNBQU96RyxDQUFDLENBQUNvSyxTQUFGLENBQVk7QUFBRUQ7QUFBRixHQUFaLEVBQXNCWixPQUFPLENBQUNZLElBQUQsQ0FBUCxDQUFjMUQsVUFBZCxDQUF0QixDQUFQO0FBQ0QsQ0FKRDs7QUFNTyxNQUFNNEQsaUJBQWlCLEdBQUc7QUFDL0JILGdCQUQrQjtBQUUvQlgsU0FGK0I7QUFHL0IvQyxhQUgrQjtBQUkvQkksV0FKK0I7QUFLL0JPLG9CQUwrQjtBQU0vQk47QUFOK0IsQ0FBMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEtQOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTXlELFVBQVUsR0FBRyxDQUFDQyxNQUFELEVBQVNDLE9BQU8sR0FBRyxJQUFuQixFQUF5QkMsU0FBUyxHQUFHLElBQXJDLEtBQThDO0FBQy9ELFFBQU03SCxTQUFTLEdBQUcscUJBQVVsQixRQUFWLENBQW1CNkksTUFBbkIsQ0FBbEI7O0FBQ0EsUUFBTUcsR0FBRyxHQUFHLEVBQUUsR0FBRzlIO0FBQUwsR0FBWjtBQUNBLFFBQU07QUFBRStELGFBQUY7QUFBYWdFLFlBQWI7QUFBdUJDLGFBQXZCO0FBQWtDQyxpQkFBbEM7QUFBaURDO0FBQWpELE1BQThEbEksU0FBcEU7QUFFQSxHQUNFOEgsR0FBRyxDQUFDSyxjQUFKLEdBQXFCUCxPQUR2QixFQUVFRSxHQUFHLENBQUNNLFlBQUosR0FBbUJQLFNBQVMsR0FBSSxTQUFRQSxTQUFVLEVBQXRCLEdBQTBCUSxTQUZ4RCxJQUdJSixhQUFhLENBQUMsbUJBQUQsQ0FIakI7QUFJQUgsS0FBRyxDQUFDUSxXQUFKLEdBQWtCdEksU0FBUyxDQUFDK0gsUUFBVixDQUFtQixNQUFuQixLQUE4QkYsU0FBaEQ7QUFDQUMsS0FBRyxDQUFDdkgsT0FBSixHQUFjd0gsUUFBUSxDQUFDLFdBQUQsQ0FBUixJQUF5QixlQUFPeEgsT0FBOUM7QUFDQXVILEtBQUcsQ0FBQ3pILFNBQUosR0FBZ0IwSCxRQUFRLENBQUMsV0FBRCxDQUFSLElBQXlCRCxHQUFHLENBQUN2SCxPQUE3QztBQUNBdUgsS0FBRyxDQUFDUyxJQUFKLEdBQVdMLFFBQVEsQ0FBQyxLQUFELENBQW5CO0FBQ0FKLEtBQUcsQ0FBQ2xELElBQUosR0FBV21ELFFBQVEsQ0FBQyxNQUFELENBQW5CLENBYitELENBZS9EOztBQUNBLE1BQUlELEdBQUcsQ0FBQ2xELElBQUosS0FBYSxTQUFqQixFQUE0QmtELEdBQUcsQ0FBQ2xELElBQUosR0FBV21ELFFBQVEsQ0FBQyxLQUFELENBQW5CO0FBRTVCRCxLQUFHLENBQUNVLGVBQUosR0FBc0IsQ0FBQyxDQUFDekUsU0FBUyxDQUFDLG1CQUFELENBQWpDO0FBQ0ErRCxLQUFHLENBQUNoQyxRQUFKLEdBQWVrQyxTQUFTLENBQUMsU0FBRCxDQUF4QjtBQUNBRixLQUFHLENBQUNXLFVBQUosR0FBaUJULFNBQVMsQ0FBQyxLQUFELENBQTFCO0FBQ0FGLEtBQUcsQ0FBQ1ksWUFBSixHQUFtQixDQUFDLENBQUMzRSxTQUFTLENBQUMsWUFBRCxDQUE5QjtBQUNBK0QsS0FBRyxDQUFDYSxTQUFKLEdBQWdCWCxTQUFTLENBQUMsUUFBRCxDQUF6Qjs7QUFDQUYsS0FBRyxDQUFDYyxVQUFKLEdBQWlCbkosRUFBRSxJQUFJLENBQUMsQ0FBQ08sU0FBUyxDQUFDK0QsU0FBVixDQUFvQixDQUFDLFFBQUQsRUFBV3RFLEVBQVgsQ0FBcEIsQ0FBekI7O0FBQ0FxSSxLQUFHLENBQUNlLE1BQUosR0FBYSxDQUFDLENBQUM5RSxTQUFTLENBQUMsaUJBQUQsQ0FBeEI7QUFDQStELEtBQUcsQ0FBQ2dCLFlBQUosR0FBbUJkLFNBQVMsQ0FBQyxXQUFELENBQTVCO0FBQ0FGLEtBQUcsQ0FBQ2lCLFdBQUosR0FBa0JoQixRQUFRLENBQUMsV0FBRCxDQUExQjtBQUNBRCxLQUFHLENBQUNrQixTQUFKLEdBQWdCakIsUUFBUSxDQUFDLFNBQUQsQ0FBeEI7O0FBRUEsTUFBSUgsT0FBTyxJQUFJQyxTQUFmLEVBQTBCO0FBQ3hCQyxPQUFHLENBQUNELFNBQUosR0FBZ0JBLFNBQWhCO0FBQ0FDLE9BQUcsQ0FBQ3RILEtBQUosR0FBWW9ILE9BQVo7QUFDQUUsT0FBRyxDQUFDbUIsY0FBSixHQUFxQixDQUFDakosU0FBUyxDQUFDK0QsU0FBVixDQUFvQixzQkFBcEIsQ0FBdEI7QUFDQStELE9BQUcsQ0FBQ29CLFFBQUosR0FBZ0IsU0FBUXRCLE9BQVEsV0FBVUMsU0FBVSxFQUFwRDtBQUNBLFFBQUlDLEdBQUcsQ0FBQ2lCLFdBQVIsRUFBcUJqQixHQUFHLENBQUNxQixVQUFKLEdBQWtCLEdBQUVyQixHQUFHLENBQUNvQixRQUFTLFNBQWpDO0FBQ3JCcEIsT0FBRyxDQUFDc0IsVUFBSixHQUFpQnBKLFNBQVMsQ0FBQytILFFBQVYsQ0FBbUIsS0FBbkIsQ0FBakI7QUFDQUQsT0FBRyxDQUFDdUIsY0FBSixHQUFxQnZCLEdBQUcsQ0FBQ3NCLFVBQUosR0FDakJwSixTQUFTLENBQUMrSCxRQUFWLENBQW1CLENBQUMsS0FBRCxFQUFRRCxHQUFHLENBQUNzQixVQUFaLENBQW5CLENBRGlCLEdBRWpCLElBRko7QUFHRDs7QUFFRHRCLEtBQUcsQ0FBQ3dCLE9BQUosR0FBYztBQUNaQyxhQUFTLEVBQUUsRUFEQztBQUVaQyxTQUFLLEVBQUU7QUFDTEMsZUFBUyxFQUFFMUIsUUFBUSxDQUFDLG1CQUFELENBRGQ7QUFFTHBDLFVBQUksRUFBRW9DLFFBQVEsQ0FBQyxNQUFELENBRlQ7QUFFbUI7QUFDeEIyQixTQUFHLEVBQUUxQixTQUFTLENBQUMsSUFBRCxDQUhUO0FBSUwyQixhQUFPLEVBQUUzQixTQUFTLENBQUMsT0FBRCxDQUpiO0FBS0w0QixhQUFPLEVBQUU1QixTQUFTLENBQUMsUUFBRCxDQUxiO0FBTUx6QyxhQUFPLEVBQUV5QyxTQUFTLENBQUMsUUFBRCxDQU5iO0FBT0xoRCxZQUFNLEVBQUVnRCxTQUFTLENBQUMsT0FBRCxDQVBaO0FBUUxyRCxjQUFRLEVBQUVxRCxTQUFTLENBQUMsU0FBRCxDQVJkO0FBU0w2QixXQUFLLEVBQUU3QixTQUFTLENBQUMsTUFBRCxDQVRYO0FBVUw4QixVQUFJLEVBQUUsQ0FBQy9GLFNBQVMsQ0FBQyxnQkFBRCxDQVZYO0FBV0xnRyxZQUFNLEVBQUUsQ0FBQ2hHLFNBQVMsQ0FBQyxjQUFEO0FBWGIsS0FGSztBQWVaaUcsUUFBSSxFQUFFO0FBQ0pMLGFBQU8sRUFBRTNCLFNBQVMsQ0FBQyxXQUFELENBRGQ7QUFFSjRCLGFBQU8sRUFBRTVCLFNBQVMsQ0FBQyxZQUFELENBRmQ7QUFHSnpDLGFBQU8sRUFBRXlDLFNBQVMsQ0FBQyxZQUFELENBSGQ7QUFJSmhELFlBQU0sRUFBRWdELFNBQVMsQ0FBQyxXQUFELENBSmI7QUFLSjhCLFVBQUksRUFBRSxDQUFDLENBQUMvRixTQUFTLENBQUMsZ0JBQUQsQ0FMYjtBQU1KZ0csWUFBTSxFQUFFLENBQUMsQ0FBQ2hHLFNBQVMsQ0FBQyxjQUFELENBTmY7QUFPSmtHLFVBQUksRUFBRS9CLFFBQVEsQ0FBQyxZQUFEO0FBUFY7QUFmTSxHQUFkO0FBMEJBSixLQUFHLENBQUNvQyxXQUFKLEdBQWtCO0FBQ2hCWCxhQUFTLEVBQUUsRUFESztBQUVoQlksVUFBTSxFQUFFQyxRQUFRLENBQUNyQyxRQUFRLENBQUMsV0FBRCxDQUFULEVBQXdCLEVBQXhCLENBQVIsSUFBdUMsSUFGL0I7QUFHaEJzQyxVQUFNLEVBQUVELFFBQVEsQ0FBQ3JDLFFBQVEsQ0FBQyxXQUFELENBQVQsRUFBd0IsRUFBeEIsQ0FBUixJQUF1QyxJQUgvQjtBQUloQnVDLFlBQVEsRUFBRUYsUUFBUSxDQUFDckMsUUFBUSxDQUFDLGFBQUQsQ0FBVCxFQUEwQixFQUExQixDQUFSLElBQXlDLElBSm5DO0FBS2hCd0MsWUFBUSxFQUFFSCxRQUFRLENBQUNyQyxRQUFRLENBQUMsYUFBRCxDQUFULEVBQTBCLEVBQTFCLENBQVIsSUFBeUMsSUFMbkM7QUFNaEJ5QyxZQUFRLEVBQUVKLFFBQVEsQ0FBQ3JDLFFBQVEsQ0FBQyxhQUFELENBQVQsRUFBMEIsRUFBMUIsQ0FBUixJQUF5QyxJQU5uQztBQU9oQjBDLFlBQVEsRUFBRUwsUUFBUSxDQUFDckMsUUFBUSxDQUFDLGFBQUQsQ0FBVCxFQUEwQixFQUExQixDQUFSLElBQXlDO0FBUG5DLEdBQWxCO0FBVUFELEtBQUcsQ0FBQzRDLE9BQUosR0FBY3ROLENBQUMsQ0FBQ3VOLElBQUYsQ0FBT3ZOLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTTVCLENBQUMsQ0FBQ3lGLElBQUYsQ0FBTyxDQUFQLENBQU4sRUFBaUJpRixHQUFHLENBQUN3QixPQUFKLENBQVlVLElBQVosQ0FBaUJDLElBQWxDLENBQVAsQ0FBZDtBQUNBLFNBQU9uQyxHQUFQO0FBQ0QsQ0EvRUQ7O0FBaUZPLE1BQU04QyxpQkFBaUIsR0FBRztBQUFFbEQ7QUFBRixDQUExQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRlA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNbUQsT0FBTyxHQUFHQyxDQUFDLElBQ2YxTixDQUFDLENBQUMyQixPQUFGLENBQ0VxTCxRQURGLEVBRUVoTixDQUFDLENBQUN1QyxJQUFGLENBQU9tTCxDQUFQLENBRkYsQ0FERjs7QUFNQSxNQUFNeEQsY0FBYyxHQUFHekQsVUFBVSxJQUFJO0FBQ25DLFFBQU07QUFBRXlGLFdBQUY7QUFBV1ksZUFBWDtBQUF3Qm5HO0FBQXhCLE1BQXNDRixVQUE1QztBQUNBLFFBQU1rSCxlQUFlLEdBQUcsRUFBeEI7QUFDQSxRQUFNQyxtQkFBbUIsR0FBRyxFQUE1Qjs7QUFFQSxRQUFNQyxTQUFTLEdBQUcsQ0FBQyxHQUFHQyxHQUFKLEtBQVlILGVBQWUsQ0FBQzdGLElBQWhCLENBQXFCOUgsQ0FBQyxDQUFDMkIsT0FBRixDQUFVLEdBQUdtTSxHQUFiLENBQXJCLENBQTlCOztBQUNBLFFBQU1DLGFBQWEsR0FBRyxDQUFDLEdBQUdELEdBQUosS0FBWUYsbUJBQW1CLENBQUM5RixJQUFwQixDQUF5QjlILENBQUMsQ0FBQzJCLE9BQUYsQ0FBVSxHQUFHbU0sR0FBYixDQUF6QixDQUFsQzs7QUFFQSxNQUFJNUIsT0FBTyxDQUFDRSxLQUFSLENBQWNHLE9BQWQsQ0FBc0IxRSxNQUExQixFQUNFZ0csU0FBUyxDQUFDRyxDQUFDLElBQUksQ0FBQyxDQUFDckgsU0FBUyxDQUFDLENBQUMsT0FBRCxFQUFVcUgsQ0FBVixDQUFELENBQWpCLEVBQWlDaE8sQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FBUCxDQUFqQyxDQUFUO0FBQ0YsTUFBSTJKLE9BQU8sQ0FBQ0UsS0FBUixDQUFjSSxPQUFkLENBQXNCM0UsTUFBMUIsRUFDRWdHLFNBQVMsQ0FBQ0csQ0FBQyxJQUFJLENBQUMsQ0FBQ3JILFNBQVMsQ0FBQyxDQUFDLFFBQUQsRUFBV3FILENBQVgsQ0FBRCxDQUFqQixFQUFrQ2hPLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxVQUFULENBQVAsQ0FBbEMsQ0FBVDtBQUNGLE1BQUkySixPQUFPLENBQUNFLEtBQVIsQ0FBY2pFLE9BQWQsQ0FBc0JOLE1BQTFCLEVBQ0VnRyxTQUFTLENBQ1BHLENBQUMsSUFBSSxDQUFDLENBQUNySCxTQUFTLENBQUMsQ0FBQyxRQUFELEVBQVdxSCxDQUFYLENBQUQsQ0FEVCxFQUVQLHFCQUFjbkUsTUFGUCxFQUdQN0osQ0FBQyxDQUFDeUYsSUFBRixDQUFPLE1BQVAsQ0FITyxDQUFUO0FBTUYsTUFDRXlHLE9BQU8sQ0FBQ0UsS0FBUixDQUFjeEUsTUFBZCxDQUFxQkMsTUFBckIsSUFDQSxDQUFDN0gsQ0FBQyxDQUFDMEcsSUFBRixDQUNDMUcsQ0FBQyxDQUFDMkIsT0FBRixDQUNFM0IsQ0FBQyxDQUFDaU8sU0FBRixDQUFZLEtBQVosQ0FERixFQUVFak8sQ0FBQyxDQUFDb0YsSUFGSixFQUdFcEYsQ0FBQyxDQUFDOEIsS0FBRixDQUFRLEdBQVIsQ0FIRixDQURELEVBTUNvSyxPQUFPLENBQUNFLEtBQVIsQ0FBY3hFLE1BTmYsQ0FGSCxFQVdFaUcsU0FBUyxDQUFDSyxJQUFJLElBQUk7QUFDaEIsUUFBSXBFLEtBQUssR0FBRzlKLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxPQUFULENBQVAsRUFBMEIyTCxJQUExQixDQUFaO0FBQ0EsVUFBTUMsSUFBSSxHQUFHbk8sQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBUCxFQUF5QjJMLElBQXpCLENBQWI7QUFFQSxRQUFJQyxJQUFJLEtBQUssU0FBYixFQUF3QnJFLEtBQUssR0FBSSxRQUFPQSxLQUFNLEVBQXRCO0FBQ3hCLFFBQUlxRSxJQUFJLEtBQUssU0FBYixFQUF3QnJFLEtBQUssR0FBSSxZQUFXQSxLQUFNLEVBQTFCO0FBQ3hCLFdBQU8sQ0FBQyxDQUFDbkQsU0FBUyxDQUFDLENBQUMsT0FBRCxFQUFVbUQsS0FBVixDQUFELENBQWxCO0FBQ0QsR0FQUSxDQUFUO0FBU0YsTUFBSW9DLE9BQU8sQ0FBQ0UsS0FBUixDQUFjSyxLQUFkLENBQW9CNUUsTUFBeEIsRUFDRWdHLFNBQVMsQ0FBQ00sSUFBSSxJQUFJLENBQUMsQ0FBQ3hILFNBQVMsQ0FBQyxDQUFDLE1BQUQsRUFBU3dILElBQVQsQ0FBRCxDQUFwQixFQUFzQ25PLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxNQUFULENBQVAsQ0FBdEMsQ0FBVDtBQUNGLE1BQUkySixPQUFPLENBQUNFLEtBQVIsQ0FBYzdELElBQWQsS0FBdUIsVUFBM0IsRUFDRXNGLFNBQVMsQ0FDUDdOLENBQUMsQ0FBQzJCLE9BQUYsQ0FDRTNCLENBQUMsQ0FBQzJDLElBQUYsQ0FBTyxxQkFBVVgsVUFBakIsQ0FERixFQUVFaEMsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBUCxDQUZGLENBRE8sQ0FBVDtBQU9GLE1BQUkySixPQUFPLENBQUNVLElBQVIsQ0FBYUwsT0FBYixDQUFxQjFFLE1BQXpCLEVBQ0VnRyxTQUFTLENBQ1BPLEtBQUssSUFBSSxDQUFDekgsU0FBUyxDQUFDLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUJ5SCxLQUFqQixDQUFELENBRFosRUFFUHBPLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxRQUFULENBQVAsQ0FGTyxDQUFUO0FBSUYsTUFBSTJKLE9BQU8sQ0FBQ1UsSUFBUixDQUFhSixPQUFiLENBQXFCM0UsTUFBekIsRUFDRWdHLFNBQVMsQ0FDUHJMLFFBQVEsSUFBSSxDQUFDbUUsU0FBUyxDQUFDLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0JuRSxRQUFsQixDQUFELENBRGYsRUFFUHhDLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxVQUFULENBQVAsQ0FGTyxDQUFUO0FBSUYsTUFBSTJKLE9BQU8sQ0FBQ1UsSUFBUixDQUFhekUsT0FBYixDQUFxQk4sTUFBekIsRUFDRWdHLFNBQVMsQ0FDUGhFLE1BQU0sSUFBSSxDQUFDQSxNQUFELElBQVcsQ0FBQ2xELFNBQVMsQ0FBQyxDQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCa0QsTUFBbEIsQ0FBRCxDQUR4QixFQUVQLHFCQUFjQSxNQUZQLENBQVQ7QUFJRixNQUFJcUMsT0FBTyxDQUFDVSxJQUFSLENBQWFoRixNQUFiLENBQW9CQyxNQUF4QixFQUNFZ0csU0FBUyxDQUNQL0QsS0FBSyxJQUFJLENBQUNuRCxTQUFTLENBQUMsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQm1ELEtBQWpCLENBQUQsQ0FEWixFQUVQOUosQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLE9BQVQsQ0FBUCxDQUZPLENBQVQ7QUFJRixNQUFJMkosT0FBTyxDQUFDVSxJQUFSLENBQWFGLElBQWpCLEVBQXVCbUIsU0FBUyxDQUFDN04sQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLFVBQVQsQ0FBUCxDQUFELENBQVQ7QUFDdkIsTUFBSTJKLE9BQU8sQ0FBQ1UsSUFBUixDQUFhRCxNQUFqQixFQUNFa0IsU0FBUyxDQUNQN04sQ0FBQyxDQUFDMkIsT0FBRixDQUNFYSxRQUFRLElBQUksQ0FBQ0EsUUFEZixFQUVFeEMsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLFVBQVQsQ0FBUCxDQUZGLENBRE8sQ0FBVDtBQU9GLE1BQUl1SyxXQUFXLENBQUNDLE1BQVosS0FBdUIsSUFBM0IsRUFDRWdCLGFBQWEsQ0FBQy9OLENBQUMsQ0FBQ3FPLEdBQUYsQ0FBTXZCLFdBQVcsQ0FBQ0MsTUFBbEIsQ0FBRCxFQUE0QlUsT0FBTyxDQUFDLENBQUMsT0FBRCxFQUFVLElBQVYsQ0FBRCxDQUFuQyxDQUFiO0FBQ0YsTUFBSVgsV0FBVyxDQUFDRyxNQUFaLEtBQXVCLElBQTNCLEVBQ0VjLGFBQWEsQ0FBQy9OLENBQUMsQ0FBQ3NPLEdBQUYsQ0FBTXhCLFdBQVcsQ0FBQ0csTUFBbEIsQ0FBRCxFQUE0QlEsT0FBTyxDQUFDLENBQUMsT0FBRCxFQUFVLElBQVYsQ0FBRCxDQUFuQyxDQUFiO0FBQ0YsTUFBSVgsV0FBVyxDQUFDSSxRQUFaLEtBQXlCLElBQTdCLEVBQ0VhLGFBQWEsQ0FBQy9OLENBQUMsQ0FBQ3FPLEdBQUYsQ0FBTXZCLFdBQVcsQ0FBQ0ksUUFBbEIsQ0FBRCxFQUE4Qk8sT0FBTyxDQUFDLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBRCxDQUFyQyxDQUFiO0FBQ0YsTUFBSVgsV0FBVyxDQUFDSyxRQUFaLEtBQXlCLElBQTdCLEVBQ0VZLGFBQWEsQ0FBQy9OLENBQUMsQ0FBQ3NPLEdBQUYsQ0FBTXhCLFdBQVcsQ0FBQ0ssUUFBbEIsQ0FBRCxFQUE4Qk0sT0FBTyxDQUFDLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBRCxDQUFyQyxDQUFiO0FBQ0YsTUFBSVgsV0FBVyxDQUFDTSxRQUFaLEtBQXlCLElBQTdCLEVBQ0VXLGFBQWEsQ0FBQy9OLENBQUMsQ0FBQ3FPLEdBQUYsQ0FBTXZCLFdBQVcsQ0FBQ00sUUFBbEIsQ0FBRCxFQUE4QkssT0FBTyxDQUFDLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FBRCxDQUFyQyxDQUFiO0FBQ0YsTUFBSVgsV0FBVyxDQUFDTyxRQUFaLEtBQXlCLElBQTdCLEVBQ0VVLGFBQWEsQ0FBQy9OLENBQUMsQ0FBQ3NPLEdBQUYsQ0FBTXhCLFdBQVcsQ0FBQ08sUUFBbEIsQ0FBRCxFQUE4QkksT0FBTyxDQUFDLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FBRCxDQUFyQyxDQUFiO0FBRUYsTUFBSXZCLE9BQU8sQ0FBQ1UsSUFBUixDQUFhQyxJQUFiLENBQWtCaEYsTUFBdEIsRUFDRWtHLGFBQWEsQ0FBQ1EsS0FBSyxJQUFJO0FBQ3JCLFVBQU1DLElBQUksR0FBR3hPLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLE9BQUQsRUFBVSxVQUFWLENBQVAsRUFBOEJnTSxLQUE5QixLQUF3QyxFQUFyRDtBQUVBLFdBQU8sQ0FBQ3JDLE9BQU8sQ0FBQ1UsSUFBUixDQUFhQyxJQUFiLENBQWtCbkcsSUFBbEIsQ0FDTixDQUFDLENBQUMrSCxPQUFELEVBQVVqTSxRQUFWLENBQUQsS0FBeUIsQ0FBQyxDQUFDeEMsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUNDLFFBQUQsRUFBVyxLQUFYLEVBQWtCaU0sT0FBbEIsQ0FBUCxFQUFtQ0QsSUFBbkMsQ0FEckIsQ0FBUjtBQUdELEdBTlksQ0FBYjs7QUFRRixRQUFNRSxhQUFhLEdBQUdILEtBQUssSUFBSSxDQUFDWixlQUFlLENBQUNqSCxJQUFoQixDQUFxQmxGLEVBQUUsSUFBSSxDQUFDQSxFQUFFLENBQUMrTSxLQUFELENBQTlCLENBQWhDOztBQUNBLFFBQU1JLFVBQVUsR0FBR0osS0FBSyxJQUFJLENBQUNYLG1CQUFtQixDQUFDbEgsSUFBcEIsQ0FBeUJsRixFQUFFLElBQUksQ0FBQ0EsRUFBRSxDQUFDK00sS0FBRCxDQUFsQyxDQUE3Qjs7QUFDQSxRQUFNSyxXQUFXLEdBQUdMLEtBQUssSUFDdkI5SCxVQUFVLENBQUMrRSxVQUFYLENBQXNCeEwsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLElBQVAsRUFBYThJLEtBQWIsQ0FBdEIsS0FDQ0csYUFBYSxDQUFDSCxLQUFELENBQWIsSUFBd0JJLFVBQVUsQ0FBQ0osS0FBRCxDQUZyQzs7QUFJQSxTQUFPO0FBQUVLLGVBQUY7QUFBZUYsaUJBQWY7QUFBOEJDO0FBQTlCLEdBQVA7QUFDRCxDQTNHRDs7QUE2R0EsTUFBTUUsZUFBZSxHQUFHLE9BQ3RCL0gsS0FEc0IsRUFFdEJnSSxJQUZzQixFQUd0QkMsVUFIc0IsRUFJdEI7QUFBRUMsT0FBSyxFQUFFQyxTQUFTLEdBQUcsRUFBckI7QUFBeUJDLE9BQUssRUFBRUMsU0FBUyxHQUFHLENBQTVDO0FBQStDQyxPQUFLLEdBQUcsSUFBdkQ7QUFBNkRDO0FBQTdELElBQTBFLEVBSnBELEtBS25CO0FBQ0gsUUFBTUwsS0FBSyxHQUFHaEMsUUFBUSxDQUFDaUMsU0FBRCxFQUFZLEVBQVosQ0FBdEI7QUFDQSxRQUFNQyxLQUFLLEdBQUdsQyxRQUFRLENBQUNtQyxTQUFELEVBQVksRUFBWixDQUFSLElBQTJCLENBQXpDO0FBQ0EsUUFBTUcsSUFBSSxHQUFHUCxVQUFVLENBQUNRLEtBQVgsRUFBYjtBQUNBLFFBQU1DLFFBQVEsR0FBRyxFQUFqQjs7QUFDQSxRQUFNQyxVQUFVLEdBQUcsQ0FBQ0MsSUFBSSxHQUFHLEVBQVIsS0FDakJDLE9BQU8sQ0FBQzNJLEdBQVIsQ0FDRWhILENBQUMsQ0FBQzRCLEdBQUYsQ0FBTSxNQUFNZ08sR0FBTixJQUFhO0FBQ2pCLFFBQUlDLFNBQVMsR0FBRyxJQUFoQjs7QUFFQSxRQUFJLENBQUNELEdBQUcsQ0FBQyx5QkFBWUUsTUFBYixDQUFSLEVBQThCO0FBQzVCQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCSixHQUF4QjtBQUNBO0FBQ0Q7O0FBRUQsUUFBSVAsUUFBSixFQUFjUSxTQUFTLEdBQUcsTUFBTVIsUUFBUSxDQUFDTyxHQUFHLENBQUMseUJBQVlFLE1BQWIsQ0FBSixDQUExQjtBQUNkLFFBQUlELFNBQUosRUFBZUwsUUFBUSxDQUFDMUgsSUFBVCxDQUFjOEgsR0FBZDtBQUNoQixHQVZELEVBVUdOLElBQUksQ0FBQ1csTUFBTCxDQUFZZixLQUFaLEVBQW1CUSxJQUFuQixDQVZILENBREYsQ0FERjs7QUFlQSxTQUFPSixJQUFJLENBQUN6SCxNQUFMLEdBQWNxSCxLQUFyQixFQUE0QjtBQUMxQixVQUFNTyxVQUFVLEVBQWhCO0FBQ0EsUUFBSVQsS0FBSyxJQUFJUSxRQUFRLENBQUMzSCxNQUFULElBQW1CbUgsS0FBaEMsRUFBdUM7QUFDeEM7O0FBRUQsU0FBT2hQLENBQUMsQ0FBQzJCLE9BQUYsQ0FDTHFOLEtBQUssR0FBR2hQLENBQUMsQ0FBQ3VQLEtBQUYsQ0FBUSxDQUFSLEVBQVdQLEtBQVgsQ0FBSCxHQUF1QmhQLENBQUMsQ0FBQ3NGLFFBRHpCLEVBRUx0RixDQUFDLENBQUNxRixNQUFGLENBQVNyRixDQUFDLENBQUN5RixJQUFGLENBQU8seUJBQVl5SyxPQUFuQixDQUFULENBRkssRUFHTFYsUUFISyxDQUFQO0FBSUQsQ0FsQ0Q7O0FBb0NBLE1BQU1XLGNBQWMsR0FBR25RLENBQUMsQ0FBQzJCLE9BQUYsQ0FDckJ5TyxDQUFDLElBQUlBLENBQUMsQ0FBQ3BQLElBQUYsQ0FBT2hCLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTTVCLENBQUMsQ0FBQ3lGLElBQUYsQ0FBTyx5QkFBWXFLLE1BQW5CLENBQU4sQ0FBUCxDQURnQixFQUVyQmpCLGVBRnFCLENBQXZCO0FBS0EsTUFBTUQsV0FBVyxHQUFHNU8sQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBQzZHLEtBQUQsRUFBUWdJLElBQVIsRUFBY2pHLE9BQWQsS0FDMUIsYUFBTXdILFNBQU4sQ0FBZ0J2SixLQUFoQixFQUF1QjtBQUNyQjdELFdBQVMsRUFBRTZMLElBQUksQ0FBQzdMLFNBREs7QUFFckJxTixXQUFTLEVBQUUsZUFBT3hILEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRUg7QUFBRixHQUEzQixDQUZVO0FBR3JCMEgsUUFBTSxFQUFFLHFDQUFrQi9KLFdBQWxCLENBQThCc0ksSUFBOUIsQ0FIYTtBQUlyQmxKLE1BQUksRUFBRSxxQ0FBa0JnQixTQUFsQixDQUE0QmtJLElBQTVCO0FBSmUsQ0FBdkIsRUFLRzlOLElBTEgsQ0FLUThOLElBQUksQ0FBQ0YsV0FMYixDQURrQixDQUFwQjtBQVNPLE1BQU00QixhQUFhLEdBQUc7QUFDM0J0RyxnQkFEMkI7QUFFM0IyRSxpQkFGMkI7QUFHM0JzQixnQkFIMkI7QUFJM0J2QjtBQUoyQixDQUF0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3S1A7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUM2QixPQUFELEVBQVVYLE1BQVYsRUFBa0JJLE9BQWxCLElBQTZCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUFuQyxDLENBQWlEOztBQUNqRCxNQUFNUSxTQUFTLEdBQUcxUSxDQUFDLENBQUM0QixHQUFGLENBQU01QixDQUFDLENBQUN5RixJQUFGLENBQU9xSyxNQUFQLENBQU4sQ0FBbEI7QUFDQSxNQUFNYSxXQUFXLEdBQUczUSxDQUFDLENBQUM0QixHQUFGLENBQU01QixDQUFDLENBQUN1UCxLQUFGLENBQVEsQ0FBUixFQUFXLENBQVgsQ0FBTixDQUFwQjtBQUNBLE1BQU1oRixNQUFNLEdBQUd2SyxDQUFDLENBQUNpQyxNQUFGLENBQVMsRUFBVCxFQUFhLFFBQWIsQ0FBZjtBQUNBLE1BQU0yTyxZQUFZLEdBQUc1USxDQUFDLENBQUNDLEtBQUYsQ0FDbkIsQ0FBQ2tELE9BQUQsRUFBVVosSUFBVixLQUFvQixHQUFFLHFCQUFVa0IsTUFBTyxHQUFFbEIsSUFBSyxLQUFJWSxPQUFRLEdBRHZDLENBQXJCO0FBR0EsTUFBTTBOLFlBQVksR0FBRzdRLENBQUMsQ0FBQzJCLE9BQUYsQ0FDbkIzQixDQUFDLENBQUMrQixPQUFGLENBQVUsSUFBSStPLE1BQUosQ0FBWSxJQUFHLHFCQUFVck4sTUFBTyxFQUFoQyxDQUFWLEVBQThDLEVBQTlDLENBRG1CLEVBRW5CekQsQ0FBQyxDQUFDK0IsT0FBRixDQUFVLFFBQVYsRUFBb0IsRUFBcEIsQ0FGbUIsQ0FBckI7O0FBS0EsTUFBTWdQLFFBQVEsR0FBR2xJLE9BQU8sSUFBSSxlQUFPQyxLQUFQLENBQWFDLEtBQWIsQ0FBbUJDLE9BQW5CLENBQTJCO0FBQUVIO0FBQUYsQ0FBM0IsQ0FBNUI7O0FBQ0EsTUFBTW1JLFVBQVUsR0FBR2hSLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTW1QLFFBQU4sQ0FBbkI7O0FBQ0EsTUFBTUUsUUFBUSxHQUFHak0sSUFBSSxJQUFJaEYsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLFNBQVAsRUFBa0IsZUFBT3FELEtBQVAsQ0FBYUMsS0FBYixDQUFtQm1JLEtBQW5CLENBQXlCbE0sSUFBekIsQ0FBbEIsQ0FBekI7O0FBQ0EsTUFBTW1NLFVBQVUsR0FBR25SLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTXFQLFFBQU4sQ0FBbkI7QUFFQSxNQUFNRyxNQUFNLEdBQUdwUixDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFDb1IsSUFBRCxFQUFPQyxHQUFQLEtBQ3JCdFIsQ0FBQyxDQUFDMkIsT0FBRixDQUNFM0IsQ0FBQyxDQUFDdVIsTUFBRixDQUFTdlIsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLFFBQVAsQ0FBVCxFQUEyQnpGLENBQUMsQ0FBQ3dSLE1BQUYsQ0FBUyxDQUFULEVBQVl4RSxRQUFRLENBQUNzRSxHQUFELEVBQU0sRUFBTixDQUFwQixDQUEzQixFQUEyRHRSLENBQUMsQ0FBQ3lSLE1BQUYsQ0FBUyxJQUFULENBQTNELENBREYsRUFFRTdCLEdBQUcsSUFBSTtBQUNMQSxLQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNsTixVQUFVLENBQUNrTixHQUFHLENBQUMsQ0FBRCxDQUFKLENBQW5CO0FBQ0EsU0FBT0EsR0FBUDtBQUNELENBTEgsRUFNRTVQLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTTVCLENBQUMsQ0FBQzZCLElBQVIsQ0FORixFQU9FN0IsQ0FBQyxDQUFDOEIsS0FBRixDQUFRLEdBQVIsQ0FQRixFQVFFOUIsQ0FBQyxDQUFDaUMsTUFBRixDQUFTLEVBQVQsRUFBYyxHQUFFcVAsR0FBSSxFQUFwQixDQVJGLEVBU0VELElBVEYsQ0FEYSxDQUFmO0FBYUEsTUFBTUssUUFBUSxHQUFHMVIsQ0FBQyxDQUFDMkIsT0FBRixDQUNmM0IsQ0FBQyxDQUFDMlIsTUFBRixDQUNFM1IsQ0FBQyxDQUFDMkIsT0FBRixDQUNFNEIsR0FBRyxJQUFJLENBQUMsRUFBRUEsR0FBRyxLQUFLLENBQVIsSUFBYUEsR0FBZixDQURWLEVBRUV5SixRQUZGLENBREYsQ0FEZSxFQU9maE4sQ0FBQyxDQUFDOEMsSUFQYSxDQUFqQjtBQVVBLE1BQU04TyxTQUFTLEdBQUc1UixDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFDNk8sSUFBRCxFQUFPK0MsS0FBUCxLQUN4QjdSLENBQUMsQ0FBQzJCLE9BQUYsQ0FDRTNCLENBQUMsQ0FBQzhSLFFBQUYsQ0FBVzlSLENBQUMsQ0FBQ21DLE1BQWIsRUFDRSxDQUFDa0UsR0FBRCxFQUFNdUosR0FBTixFQUFXMEIsR0FBWCxLQUFtQnRSLENBQUMsQ0FBQytSLEtBQUYsQ0FBUyxHQUFFVCxHQUFJLEVBQWYsRUFBa0IxQixHQUFHLENBQUM3SCxJQUFKLENBQVMsR0FBVCxDQUFsQixFQUFpQzFCLEdBQWpDLENBRHJCLEVBRUUsRUFGRixDQURGLEVBS0VyRyxDQUFDLENBQUNnUyxTQUFGLENBQVksRUFBWixDQUxGLEVBTUVILEtBTkYsQ0FEZ0IsQ0FBbEI7O0FBVUEsTUFBTXZDLElBQUksR0FBRytCLElBQUksSUFDZnJSLENBQUMsQ0FBQzJCLE9BQUYsQ0FDRTNCLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTXdQLE1BQU0sQ0FBQ0MsSUFBRCxDQUFaLENBREYsRUFFRUssUUFGRixFQUdFTCxJQUhGLENBREY7O0FBTUEsTUFBTXpJLEdBQUcsR0FBRzVJLENBQUMsQ0FBQzJCLE9BQUYsQ0FDVitPLFNBRFUsRUFFVnBCLElBRlUsQ0FBWjtBQUtBLE1BQU0yQyxRQUFRLEdBQUdqUyxDQUFDLENBQUNrUyxRQUFGLENBQVcsQ0FDMUJsUyxDQUFDLENBQUNtUyxNQUFGLENBQ0VuUyxDQUFDLENBQUMyQixPQUFGLENBQ0UzQixDQUFDLENBQUNvUyxJQUFGLENBQU8sQ0FBQyxDQUFDcFMsQ0FBQyxDQUFDcVMsS0FBSCxFQUFVclMsQ0FBQyxDQUFDeVIsTUFBRixDQUFTYSxRQUFULENBQVYsQ0FBRCxFQUFnQyxDQUFDdFMsQ0FBQyxDQUFDdVMsQ0FBSCxFQUFNN1AsVUFBTixDQUFoQyxDQUFQLENBREYsRUFFRTFDLENBQUMsQ0FBQ3lGLElBQUYsQ0FBT3lLLE9BQVAsQ0FGRixDQURGLENBRDBCLENBQVgsQ0FBakI7QUFTQSxNQUFNc0MsU0FBUyxHQUFHeFMsQ0FBQyxDQUFDMkIsT0FBRixDQUNoQjNCLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTTVCLENBQUMsQ0FBQ3lGLElBQUYsQ0FBT3FLLE1BQVAsQ0FBTixDQURnQixFQUVoQm1DLFFBRmdCLEVBR2hCalMsQ0FBQyxDQUFDMlIsTUFBRixDQUFTM1IsQ0FBQyxDQUFDc0YsUUFBWCxDQUhnQixFQUloQmdLLElBSmdCLENBQWxCO0FBT0EsTUFBTW1ELFdBQVcsR0FBR3pTLENBQUMsQ0FBQzhSLFFBQUYsQ0FBVzlSLENBQUMsQ0FBQzRCLEdBQWIsRUFBa0IsQ0FBQ3NNLElBQUQsRUFBT29ELEdBQVAsS0FBZSxDQUFDQSxHQUFELEVBQU0sR0FBR3BELElBQVQsQ0FBakMsQ0FBcEI7O0FBRUEsTUFBTXdFLElBQUksR0FBRyxPQUNYckIsSUFEVyxFQUVYc0IsWUFBWSxHQUFHLEVBRkosRUFHWEMsU0FBUyxHQUFHLEVBSEQsRUFJWDtBQUFFQyxTQUFPLEdBQUc7QUFBWixJQUFxQixFQUpWLEtBS1I7QUFDSCxRQUFNQyxPQUFPLEdBQUc5UyxDQUFDLENBQUMrUyxPQUFGLENBQVUvUyxDQUFDLENBQUNzRixRQUFaLEVBQXNCc04sU0FBdEIsQ0FBaEI7QUFDQSxRQUFNSSxJQUFJLEdBQUcsRUFBYjtBQUNBLFFBQU1DLE9BQU8sR0FBRyxFQUFoQjtBQUNBLFFBQU0zRCxJQUFJLEdBQUcsRUFBYjtBQUNBLFFBQU00RCxPQUFPLEdBQUcsRUFBaEI7QUFDQSxNQUFJQyxTQUFTLEdBQUcsRUFBaEI7QUFDQSxNQUFJQyxNQUFNLEdBQUcsQ0FBYjtBQUNBLE1BQUk5UCxHQUFKOztBQUVBLE9BQUtBLEdBQUwsSUFBWStOLElBQUksSUFBSSxFQUFwQixFQUF3QjtBQUN0QixVQUFNZ0MsTUFBTSxHQUFHckcsUUFBUSxDQUFDMUosR0FBRCxFQUFNLEVBQU4sQ0FBdkI7QUFFQSxRQUFJLEVBQUUrUCxNQUFNLElBQUlBLE1BQU0sS0FBSyxDQUF2QixDQUFKLEVBQStCO0FBQy9CLFVBQU16RCxHQUFHLEdBQUd3QixNQUFNLENBQUNDLElBQUQsRUFBTy9OLEdBQVAsQ0FBTixJQUFxQixDQUFDK1AsTUFBRCxFQUFTLElBQVQsRUFBZSxJQUFmLENBQWpDO0FBQ0EsVUFBTSxDQUFDL0IsR0FBRCxFQUFNalAsRUFBRSxHQUFHLElBQVgsRUFBaUJpUixRQUFRLEdBQUcsSUFBNUIsSUFBb0MxRCxHQUExQyxDQUxzQixDQUt5Qjs7QUFFL0NBLE9BQUcsQ0FBQ00sT0FBRCxDQUFILEdBQWVvRCxRQUFRLEtBQUssSUFBYixHQUFvQixJQUFwQixHQUEyQjVRLFVBQVUsQ0FBQzRRLFFBQUQsQ0FBcEQ7QUFDQSxRQUFJalIsRUFBRSxJQUFJeVEsT0FBTyxDQUFDelEsRUFBRCxDQUFqQixFQUF1QnVOLEdBQUcsQ0FBQ0UsTUFBRCxDQUFILEdBQWNGLEdBQUcsQ0FBQ00sT0FBRCxDQUFILEdBQWUsSUFBN0I7QUFDdkIsUUFBSTdOLEVBQUosRUFBUTJRLElBQUksQ0FBQzNRLEVBQUQsQ0FBSixHQUFXdU4sR0FBWDs7QUFDUixRQUFJQSxHQUFHLENBQUNFLE1BQUQsQ0FBUCxFQUFpQjtBQUNmUixVQUFJLENBQUN4SCxJQUFMLENBQVU4SCxHQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0x1RCxlQUFTLENBQUNyTCxJQUFWLENBQWU4SCxHQUFmO0FBQ0Q7O0FBQ0QsUUFBSTBCLEdBQUcsR0FBRzhCLE1BQVYsRUFBa0JBLE1BQU0sR0FBRzlCLEdBQVQ7QUFDbkI7O0FBRUQsT0FBSyxJQUFJaUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1osWUFBWSxDQUFDOUssTUFBakMsRUFBeUMwTCxDQUFDLEVBQTFDLEVBQThDO0FBQzVDLFVBQU0sQ0FBQ2xSLEVBQUQsRUFBS21SLEtBQUwsSUFBY2IsWUFBWSxDQUFDWSxDQUFELENBQVosSUFBbUIsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUF2QztBQUVBLFFBQUksQ0FBQ2xSLEVBQUwsRUFBUztBQUNULFVBQU1vUixRQUFRLEdBQUdULElBQUksQ0FBQzNRLEVBQUQsQ0FBckI7O0FBRUEsUUFBSW9SLFFBQUosRUFBYztBQUNaLFVBQUlBLFFBQVEsQ0FBQ3ZELE9BQUQsQ0FBUixLQUFzQnNELEtBQTFCLEVBQWlDO0FBQy9CQyxnQkFBUSxDQUFDdkQsT0FBRCxDQUFSLEdBQW9Cc0QsS0FBcEI7QUFDQU4sZUFBTyxDQUFDN1EsRUFBRCxDQUFQLEdBQWMsSUFBZDtBQUNEO0FBQ0YsS0FMRCxNQUtPO0FBQ0wsWUFBTXVOLEdBQUcsR0FBRyxDQUFDLElBQUQsRUFBT3ZOLEVBQVAsRUFBV21SLEtBQVgsQ0FBWjtBQUVBbEUsVUFBSSxDQUFDeEgsSUFBTCxDQUFVOEgsR0FBVjtBQUNEO0FBQ0Y7O0FBRUQsUUFBTThELFNBQVMsR0FBR3pCLFFBQVEsQ0FBQzNDLElBQUQsQ0FBMUI7QUFDQSxRQUFNcUUsTUFBTSxHQUFHZCxPQUFPLEdBQUdhLFNBQVMsQ0FBQ25FLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUJzRCxPQUFuQixDQUFILEdBQWlDYSxTQUF2RDtBQUNBLFFBQU1FLE9BQU8sR0FBR2YsT0FBTyxHQUFHYSxTQUFTLENBQUNuRSxLQUFWLENBQWdCc0QsT0FBaEIsRUFBeUJhLFNBQVMsQ0FBQzdMLE1BQW5DLENBQUgsR0FBZ0QsRUFBdkU7QUFDQSxRQUFNZ00sS0FBSyxHQUFHN1QsQ0FBQyxDQUFDMlIsTUFBRixDQUFTL0IsR0FBRyxJQUFJQSxHQUFHLENBQUNhLE9BQUQsQ0FBSCxLQUFpQixJQUFqQyxFQUF1Q2tELE1BQXZDLENBQWQ7QUFFQVIsV0FBUyxHQUFHQSxTQUFTLENBQ2xCVyxNQURTLENBQ0Y5VCxDQUFDLENBQUMyUixNQUFGLENBQVMvQixHQUFHLElBQUlBLEdBQUcsQ0FBQ2EsT0FBRCxDQUFILEtBQWlCLElBQWpDLEVBQXVDbUQsT0FBdkMsQ0FERSxFQUVUNUssT0FGUyxFQUFaOztBQUlBLE9BQUssSUFBSXVLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdJLE1BQU0sQ0FBQzlMLE1BQTNCLEVBQW1DMEwsQ0FBQyxFQUFwQyxFQUF3QztBQUN0QyxVQUFNbFIsRUFBRSxHQUFHc1IsTUFBTSxDQUFDSixDQUFELENBQU4sQ0FBVXpELE1BQVYsQ0FBWDtBQUNBLFVBQU13QixHQUFHLEdBQUdxQyxNQUFNLENBQUNKLENBQUQsQ0FBTixDQUFVOUMsT0FBVixDQUFaO0FBQ0EsVUFBTWxOLEdBQUcsR0FBR29RLE1BQU0sQ0FBQ0osQ0FBRCxDQUFOLENBQVVyRCxPQUFWLENBQVo7QUFFQSxRQUFJb0IsR0FBRyxLQUFLLElBQVIsSUFBZ0I0QixPQUFPLENBQUM3USxFQUFELENBQTNCLEVBQWlDNFEsT0FBTyxDQUFFLEdBQUUzQixHQUFJLEVBQVIsQ0FBUCxHQUFvQixDQUFDalAsRUFBRCxFQUFLa0IsR0FBTCxFQUFVd0UsSUFBVixDQUFlLEdBQWYsQ0FBcEI7QUFDbEM7O0FBRUQsUUFBTWdNLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxTQUFPRixLQUFLLENBQUNoTSxNQUFiLEVBQXFCO0FBQ25CLFVBQU0rSCxHQUFHLEdBQUdpRSxLQUFLLENBQUNHLEdBQU4sRUFBWjtBQUNBLFVBQU1DLFFBQVEsR0FBR2QsU0FBUyxDQUFDYSxHQUFWLEVBQWpCO0FBQ0EsUUFBSSxDQUFDMUMsR0FBRCxJQUFRMkMsUUFBUSxJQUFJLENBQUMsSUFBRCxDQUF4Qjs7QUFFQSxRQUFJM0MsR0FBRyxLQUFLLElBQVosRUFBa0I7QUFDaEJBLFNBQUcsR0FBR3RFLFFBQVEsQ0FBQ29HLE1BQUQsRUFBUyxFQUFULENBQVIsR0FBdUJXLFFBQVEsQ0FBQ2xNLE1BQWhDLEdBQXlDLENBQS9DO0FBQ0FrTSxjQUFRLENBQUNqTSxJQUFULENBQWN3SixHQUFkO0FBQ0Q7O0FBRUQyQixXQUFPLENBQUUsR0FBRTNCLEdBQUksRUFBUixDQUFQLEdBQW9CLENBQUMxQixHQUFHLENBQUNFLE1BQUQsQ0FBSixFQUFjRixHQUFHLENBQUNNLE9BQUQsQ0FBakIsRUFBNEJuSSxJQUE1QixDQUFpQyxHQUFqQyxDQUFwQjtBQUNEOztBQUVELFNBQU9vTCxTQUFTLENBQUN0TCxNQUFqQixFQUF5QjtBQUN2QixVQUFNK0gsR0FBRyxHQUFHdUQsU0FBUyxDQUFDYSxHQUFWLEVBQVo7O0FBRUEsUUFBSXBFLEdBQUcsSUFBSSxDQUFDQSxHQUFHLENBQUNFLE1BQUQsQ0FBZixFQUF5QjtBQUN2QixZQUFNd0IsR0FBRyxHQUFJLEdBQUUxQixHQUFHLENBQUNhLE9BQUQsQ0FBVSxFQUE1Qjs7QUFFQSxVQUFJWSxJQUFJLENBQUNDLEdBQUQsQ0FBSixLQUFjLElBQWxCLEVBQXdCO0FBQ3RCMkIsZUFBTyxDQUFDM0IsR0FBRCxDQUFQLEdBQWUsSUFBZjtBQUNBdkIsZUFBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUF1QnNCLEdBQXZCLEVBQTRCRCxJQUFJLENBQUNDLEdBQUQsQ0FBaEM7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBT3RSLENBQUMsQ0FBQzhDLElBQUYsQ0FBT21RLE9BQVAsRUFBZ0JwTCxNQUFoQixHQUF5Qm9MLE9BQXpCLEdBQW1DLElBQTFDO0FBQ0QsQ0FqR0Q7O0FBbUdBLE1BQU1pQixjQUFjLEdBQUcsQ0FBQ3hCLElBQUQsRUFBT3lCLFFBQVAsS0FBb0I7QUFDekMsUUFBTUMsT0FBTyxHQUFHMUMsUUFBUSxDQUFDMVIsQ0FBQyxDQUFDb0ssU0FBRixDQUFZc0ksSUFBWixFQUFrQnlCLFFBQWxCLENBQUQsQ0FBeEI7QUFDQSxRQUFNTixLQUFLLEdBQUcsRUFBZDtBQUNBLFFBQU1mLE9BQU8sR0FBRyxFQUFoQjs7QUFFQSxPQUFLLElBQUlTLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdhLE9BQU8sQ0FBQ3ZNLE1BQTVCLEVBQW9DMEwsQ0FBQyxFQUFyQyxFQUF5QztBQUN2QyxVQUFNalEsR0FBRyxHQUFHOFEsT0FBTyxDQUFDYixDQUFELENBQW5CO0FBQ0EsVUFBTSxDQUFDYyxRQUFELEVBQVdDLE1BQVgsSUFBcUJsRCxNQUFNLENBQUNzQixJQUFELEVBQU9wUCxHQUFQLENBQU4sSUFBcUIsRUFBaEQsQ0FGdUMsQ0FFYTs7QUFDcEQsVUFBTSxDQUFDaVIsUUFBRCxFQUFXQyxNQUFYLElBQXFCcEQsTUFBTSxDQUFDK0MsUUFBRCxFQUFXN1EsR0FBWCxDQUFqQyxDQUh1QyxDQUdXOztBQUVsRCxRQUFJZ1IsTUFBTSxLQUFLRSxNQUFmLEVBQXVCO0FBQ3JCLFVBQUlGLE1BQUosRUFBWVQsS0FBSyxDQUFDL0wsSUFBTixDQUFXd00sTUFBWDtBQUNaLFVBQUlFLE1BQUosRUFBWTFCLE9BQU8sQ0FBQ2hMLElBQVIsQ0FBYTBNLE1BQWI7QUFDYjtBQUNGOztBQUVELFNBQU8sQ0FBQ1gsS0FBRCxFQUFRZixPQUFSLENBQVA7QUFDRCxDQWpCRDs7QUFtQkEsTUFBTTJCLFNBQVMsR0FBR3pVLENBQUMsQ0FBQzJCLE9BQUYsQ0FDaEIzQixDQUFDLENBQUMwVSxNQUFGLENBQVMxVSxDQUFDLENBQUN5RixJQUFGLENBQU9xSyxNQUFQLENBQVQsQ0FEZ0IsRUFFaEJtQyxRQUZnQixFQUdoQmpTLENBQUMsQ0FBQ21DLE1BQUYsQ0FBU25DLENBQUMsQ0FBQzhULE1BQVgsRUFBbUIsRUFBbkIsQ0FIZ0IsRUFJaEI5VCxDQUFDLENBQUM0QixHQUFGLENBQU0wTixJQUFOLENBSmdCLENBQWxCO0FBT0EsTUFBTXFGLGFBQWEsR0FBRyxxQkFBTSxDQUFDN04sS0FBRCxFQUFRQyxLQUFSLEtBQzFCNEksT0FBTyxDQUFDM0ksR0FBUixDQUFZaEgsQ0FBQyxDQUFDNEIsR0FBRixDQUFNa0YsS0FBSyxDQUFDTSxHQUFaLEVBQWlCTCxLQUFqQixDQUFaLEVBQXFDL0YsSUFBckMsQ0FBMEN5VCxTQUExQyxDQURvQixDQUF0QjtBQUlBLE1BQU1HLElBQUksR0FBRyxxQkFBTSxDQUFDOU4sS0FBRCxFQUFRdkUsSUFBUixFQUFjbEMsSUFBZCxLQUF1QjtBQUN4QyxRQUFNO0FBQUU4QyxXQUFPLEdBQUcsZUFBT0E7QUFBbkIsTUFBK0I5QyxJQUFJLElBQUksRUFBN0M7QUFFQSxTQUFPc1UsYUFBYSxDQUFDN04sS0FBRCxFQUFRLENBQUM4SixZQUFZLENBQUN6TixPQUFELEVBQVVaLElBQVYsQ0FBYixDQUFSLENBQWIsQ0FBb0R2QixJQUFwRCxDQUF5RDBQLFNBQXpELENBQVA7QUFDRCxDQUpZLEVBSVYsYUFKVSxDQUFiO0FBTUEsTUFBTXRKLEdBQUcsR0FBRyxxQkFDVixDQUFDTixLQUFELEVBQVE5QixJQUFSLEtBQWtCQSxJQUFJLEdBQUc4QixLQUFLLENBQUNNLEdBQU4sQ0FBVXBDLElBQVYsQ0FBSCxHQUFxQix1QkFBUSxJQUFSLENBRGpDLEVBRVYsU0FGVSxDQUFaO0FBS08sTUFBTTZQLFdBQVcsR0FBRztBQUN6QnBFLFNBRHlCO0FBRXpCWCxRQUZ5QjtBQUd6QkksU0FIeUI7QUFJekIzRixRQUp5QjtBQUt6Qm5ELEtBTHlCO0FBTXpCZ0ssUUFOeUI7QUFPekJNLFVBUHlCO0FBUXpCRSxXQVJ5QjtBQVN6QnRDLE1BVHlCO0FBVXpCMUcsS0FWeUI7QUFXekJtSSxVQVh5QjtBQVl6QkMsWUFaeUI7QUFhekJDLFVBYnlCO0FBY3pCRSxZQWR5QjtBQWV6QlQsV0FmeUI7QUFnQnpCQyxhQWhCeUI7QUFpQnpCOEIsYUFqQnlCO0FBa0J6QlIsVUFsQnlCO0FBbUJ6Qk8sV0FuQnlCO0FBb0J6QjVCLGNBcEJ5QjtBQXFCekJDLGNBckJ5QjtBQXNCekI4RCxlQXRCeUI7QUF1QnpCQyxNQXZCeUI7QUF3QnpCbEMsTUF4QnlCO0FBeUJ6QndCLGdCQXpCeUI7QUEwQnpCTztBQTFCeUIsQ0FBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDak9QOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUssYUFBYSxHQUFHLE9BQ3BCQyxHQURvQixFQUVwQmhNLEtBRm9CLEVBR3BCakMsS0FIb0IsRUFJcEJnSSxJQUpvQixFQUtwQmxHLEdBQUcsR0FBRyxFQUxjLEVBTXBCZ0ssU0FBUyxHQUFHLEVBTlEsS0FPakI7QUFDSCxNQUFJLENBQUNoSyxHQUFHLENBQUNmLE1BQUwsSUFBZSxDQUFDK0ssU0FBUyxDQUFDL0ssTUFBOUIsRUFBc0M7QUFDdEMsUUFBTTRMLFFBQVEsR0FBRyxNQUFNc0IsR0FBRyxDQUFDQyxRQUFKLEdBQWU1TixHQUFmLENBQW1CMkIsS0FBSyxDQUFDL0QsSUFBekIsQ0FBdkI7QUFDQSxRQUFNMk4sWUFBWSxHQUFHLE1BQU0seUJBQVlzQyxPQUFaLENBQW9Cbk8sS0FBcEIsRUFBMkI4QixHQUEzQixFQUFnQ2tHLElBQWhDLENBQTNCO0FBQ0EsUUFBTW1FLE9BQU8sR0FBRyxNQUFNLHlCQUFZUCxJQUFaLENBQWlCZSxRQUFqQixFQUEyQmQsWUFBM0IsRUFBeUNDLFNBQXpDLENBQXRCO0FBRUEsTUFBSUssT0FBSixFQUFhbEQsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUF1QmpILEtBQUssQ0FBQy9ELElBQTdCLEVBQW1DaU8sT0FBbkM7QUFDYixNQUFJQSxPQUFKLEVBQWFsSyxLQUFLLENBQUNtTSxLQUFOLENBQVlqQyxPQUFaO0FBQ2QsQ0FmRDs7QUFpQkEsTUFBTWtDLEtBQUssR0FBRyxPQUFPSixHQUFQLEVBQVloTSxLQUFaLEVBQW1CO0FBQUUvRCxNQUFGO0FBQVFvUSxhQUFSO0FBQXFCMUMsTUFBckI7QUFBMkIsS0FBRzJDO0FBQTlCLENBQW5CLEtBQTZEO0FBQ3pFLE1BQUlDLFVBQVUsR0FBRyxFQUFqQjs7QUFFQSxRQUFNL1MsSUFBSSxHQUFHLHlCQUFZc08sWUFBWixDQUF5QjdMLElBQXpCLENBQWI7O0FBQ0EsUUFBTThCLEtBQUssR0FBR2lPLEdBQUcsQ0FBQ0MsUUFBSixFQUFkO0FBQ0EsUUFBTWxHLElBQUksR0FBRyxNQUFNLHlCQUFZeUcsWUFBWixDQUF5QnpPLEtBQXpCLEVBQWdDdkUsSUFBaEMsQ0FBbkI7QUFFQSxRQUFNO0FBQUVzRztBQUFGLE1BQWMsZUFBTzJNLGVBQVAsQ0FBdUJ6TSxLQUF2QixDQUE2Qm1JLEtBQTdCLENBQW1Da0UsV0FBbkMsS0FBbUQsRUFBdkU7QUFDQSxRQUFNSyxRQUFRLEdBQUd6VixDQUFDLENBQUMwVixNQUFGLENBQVMzTSxLQUFLLENBQUNtSSxLQUFOLENBQVlySSxPQUFaLElBQXVCLElBQWhDLENBQWpCO0FBRUEsTUFBSUEsT0FBSixFQUFheU0sVUFBVSxDQUFDeE4sSUFBWCxDQUFnQmUsT0FBaEI7QUFDYnlNLFlBQVUsR0FBR3RWLENBQUMsQ0FBQzhULE1BQUYsQ0FBU3dCLFVBQVQsRUFBcUIsZ0JBQVMxTSxHQUFULENBQWEsaUJBQVFsRCxTQUFSLENBQWtCZ04sSUFBbEIsQ0FBYixDQUFyQixDQUFiO0FBRUEsUUFBTW9DLGFBQWEsQ0FBQ0MsR0FBRCxFQUFNaE0sS0FBTixFQUFhakMsS0FBYixFQUFvQmdJLElBQXBCLEVBQTBCd0csVUFBMUIsRUFBc0MsRUFBdEMsRUFBMENHLFFBQTFDLENBQW5COztBQUNBLE9BQUssTUFBTW5TLEdBQVgsSUFBa0J3RCxLQUFLLENBQUM2TyxXQUFOLEVBQWxCLEVBQXVDWixHQUFHLENBQUNhLE1BQUosQ0FBV3RTLEdBQVgsRUFBZ0J5RixLQUFLLENBQUMvRCxJQUF0QjtBQUN4QyxDQWZEOztBQWlCTyxNQUFNNlEsYUFBYSxHQUFHO0FBQzNCZixlQUQyQjtBQUUzQks7QUFGMkIsQ0FBdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUNQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTVcsYUFBYSxHQUFHLHFCQUFNLENBQUNoUCxLQUFELEVBQVFnSSxJQUFSLEVBQWN6TyxJQUFJLEdBQUcsRUFBckIsS0FBNEI7QUFDdEQsUUFBTWdQLFFBQVEsR0FBRyw2QkFBY1QsV0FBZCxDQUEwQjlILEtBQTFCLEVBQWlDZ0ksSUFBakMsQ0FBakI7O0FBQ0EsUUFBTWlILFdBQVcsR0FBRy9WLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTVMsRUFBRSxJQUFJLENBQUNBLEVBQUQsRUFBSyxDQUFDaVEsUUFBTixDQUFaLEVBQTZCeEQsSUFBSSxDQUFDdkQsU0FBbEMsQ0FBcEI7QUFFQSxNQUFJLENBQUN1RCxJQUFJLENBQUNrSCxVQUFMLENBQWdCaE8sS0FBckIsRUFBNEIsT0FBTyx1QkFBUSxFQUFSLENBQVA7QUFDNUIsU0FBTzhHLElBQUksQ0FBQ2tILFVBQUwsQ0FBZ0JoTyxLQUFoQixDQUFzQmxCLEtBQXRCLEVBQTZCOUYsSUFBN0IsQ0FBa0M2USxLQUFLLElBQUk7QUFDaEQsVUFBTXZDLElBQUksR0FBRyx5QkFBWW1ELFdBQVosQ0FBd0IsQ0FBQyxHQUFHc0QsV0FBSixFQUFpQixHQUFHbEUsS0FBcEIsQ0FBeEIsQ0FBYjs7QUFFQSxXQUFPLDZCQUFjaEQsZUFBZCxDQUE4Qi9ILEtBQTlCLEVBQXFDZ0ksSUFBckMsRUFBMkNRLElBQTNDLEVBQWlELEVBQ3RELEdBQUdqUCxJQURtRDtBQUV0RGdQO0FBRnNELEtBQWpELENBQVA7QUFJRCxHQVBNLENBQVA7QUFRRCxDQWJxQixDQUF0QjtBQWVBLE1BQU00RyxTQUFTLEdBQUcscUJBQU0sQ0FBQ25QLEtBQUQsRUFBUWdJLElBQVIsRUFBY3pPLElBQUksR0FBRyxFQUFyQixLQUE0QixDQUFFLENBQXBDLENBQWxCO0FBRUEsTUFBTTZWLE1BQU0sR0FBRyxxQkFBTSxDQUFDcFAsS0FBRCxFQUFRZ0ksSUFBUixFQUFjek8sSUFBZCxLQUNuQnlWLGFBQWEsQ0FBQ2hQLEtBQUQsRUFBUWdJLElBQVIsRUFBY3pPLElBQWQsQ0FBYixDQUFpQ1csSUFBakMsQ0FDRWhCLENBQUMsQ0FBQzJCLE9BQUYsQ0FDRSx5QkFBWWlRLFNBQVosQ0FBc0I5QyxJQUF0QixDQURGLEVBRUUseUJBQVk2QixXQUZkLENBREYsQ0FEYSxDQUFmO0FBU0EsTUFBTWlFLElBQUksR0FBRyxxQkFBTSxDQUFDOU4sS0FBRCxFQUFRZ0ksSUFBUixFQUFjek8sSUFBSSxHQUFHLEVBQXJCLEtBQTRCO0FBQzdDLFFBQU1nUCxRQUFRLEdBQUcsNkJBQWNULFdBQWQsQ0FBMEI5SCxLQUExQixFQUFpQ2dJLElBQWpDLENBQWpCOztBQUNBLFFBQU1xSCxLQUFLLEdBQUduVyxDQUFDLENBQUNpRixNQUFGLENBQVMsRUFBVCxFQUFhLENBQUMsWUFBRCxFQUFlLGNBQWYsQ0FBYixFQUE2QzZKLElBQTdDLENBQWQ7QUFDQSxRQUFNc0gsVUFBVSxHQUFHcFcsQ0FBQyxDQUFDNEIsR0FBRixDQUFNUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUYsRUFBS0EsRUFBTCxFQUFTLENBQUNpUSxRQUFWLENBQVosRUFBaUN4RCxJQUFJLENBQUN2RCxTQUF0QyxDQUFuQjtBQUNBLFFBQU14RSxLQUFLLEdBQUcvRyxDQUFDLENBQUM0QixHQUFGLENBQ1oseUJBQVlnUCxZQUFaLENBQXlCdlEsSUFBSSxDQUFDOEMsT0FBTCxJQUFnQjJMLElBQUksQ0FBQzNMLE9BQTlDLENBRFksRUFFWmdULEtBRlksQ0FBZDtBQUtBLFNBQU8seUJBQVl4QixhQUFaLENBQTBCN04sS0FBMUIsRUFBaUNDLEtBQWpDLEVBQXdDL0YsSUFBeEMsQ0FBNkNzTyxJQUFJLElBQ3RELDZCQUFjYSxjQUFkLENBQTZCckosS0FBN0IsRUFBb0NnSSxJQUFwQyxFQUEwQyxDQUFDLEdBQUdzSCxVQUFKLEVBQWdCLEdBQUc5RyxJQUFuQixDQUExQyxFQUFvRSxFQUNsRSxHQUFHalAsSUFEK0Q7QUFFbEVnUDtBQUZrRSxHQUFwRSxDQURLLENBQVA7QUFNRCxDQWZZLENBQWI7QUFpQkEsTUFBTWdILFFBQVEsR0FBRyxxQkFBTSxDQUFDdlAsS0FBRCxFQUFRZ0ksSUFBUixFQUFjek8sSUFBSSxHQUFHLEVBQXJCLEtBQ3JCLENBQUNBLElBQUksQ0FBQzRWLFNBQUwsR0FBaUJBLFNBQWpCLEdBQTZCckIsSUFBOUIsRUFBb0M5TixLQUFwQyxFQUEyQ2dJLElBQTNDLEVBQWlEek8sSUFBakQsQ0FEZSxDQUFqQjtBQUlBLE1BQU1pVyxRQUFRLEdBQUcscUJBQU0sQ0FBQ3hQLEtBQUQsRUFBUXZFLElBQVIsRUFBY2xDLElBQWQsS0FBdUI7QUFDNUMsUUFBTWtJLElBQUksR0FBRyx5QkFBWStOLFFBQVosQ0FBcUIvVCxJQUFyQixDQUFiOztBQUVBLE1BQUksQ0FBQ2dHLElBQUwsRUFBVyxPQUFPb0gsT0FBTyxDQUFDalAsT0FBUixDQUFnQixFQUFoQixDQUFQO0FBQ1gsU0FBTzZILElBQUksQ0FBQ2dPLE9BQUwsQ0FBYXpQLEtBQWIsRUFBb0J5QixJQUFJLENBQUMySSxLQUF6QixFQUFnQ2xRLElBQWhDLENBQXFDOE4sSUFBSSxJQUFJO0FBQ2xELFFBQUlBLElBQUksQ0FBQzBILFVBQUwsSUFBbUIsQ0FBQ25XLElBQUksQ0FBQzRWLFNBQTdCLEVBQXdDO0FBQ3RDLFVBQUksQ0FBQzFOLElBQUQsSUFBUyxDQUFDQSxJQUFJLENBQUNxTSxJQUFuQixFQUF5QixPQUFPLHlCQUFZQSxJQUFaLENBQWlCOU4sS0FBakIsRUFBd0J2RSxJQUF4QixFQUE4QmxDLElBQTlCLENBQVA7QUFDekIsYUFBT2tJLElBQUksQ0FBQ3FNLElBQUwsQ0FBVTlOLEtBQVYsRUFBaUJ5QixJQUFJLENBQUMySSxLQUF0QixFQUE2QjdRLElBQTdCLENBQVA7QUFDRDs7QUFDRCxXQUFPZ1csUUFBUSxDQUFDdlAsS0FBRCxFQUFRZ0ksSUFBUixFQUFjek8sSUFBZCxDQUFmO0FBQ0QsR0FOTSxDQUFQO0FBT0QsQ0FYZ0IsQ0FBakI7QUFhQSxNQUFNb1csWUFBWSxHQUFHLHFCQUFNLENBQUMzUCxLQUFELEVBQVF2RSxJQUFSLEVBQWNsQyxJQUFkLEtBQ3pCLHlCQUFZa1YsWUFBWixDQUF5QnpPLEtBQXpCLEVBQWdDdkUsSUFBaEMsRUFBc0N2QixJQUF0QyxDQUEyQzhOLElBQUksSUFDN0NvSCxNQUFNLENBQUNwUCxLQUFELEVBQVFnSSxJQUFSLEVBQWM5TyxDQUFDLENBQUNvSyxTQUFGLENBQVkvSixJQUFaLEVBQWtCO0FBQUUyTyxPQUFLLEVBQUUscUJBQVVyTDtBQUFuQixDQUFsQixDQUFkLENBRFIsQ0FEbUIsQ0FBckI7QUFNTyxNQUFNK1MsWUFBWSxHQUFHO0FBQzFCTCxVQUQwQjtBQUUxQkMsVUFGMEI7QUFHMUJSLGVBSDBCO0FBSTFCSSxRQUowQjtBQUsxQk87QUFMMEIsQ0FBckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxDQUFDM0csTUFBRCxFQUFTSSxPQUFULElBQW9CLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBMUI7QUFDQSxNQUFNeUcsS0FBSyxHQUFHM1csQ0FBQyxDQUFDNEIsR0FBRixDQUFNNUIsQ0FBQyxDQUFDeUYsSUFBRixDQUFPcUssTUFBUCxDQUFOLENBQWQ7QUFDQSxNQUFNNUksU0FBUyxHQUFHbEgsQ0FBQyxDQUFDcUYsTUFBRixDQUFTckYsQ0FBQyxDQUFDeUYsSUFBRixDQUFPeUssT0FBUCxDQUFULENBQWxCOztBQUVBLE1BQU0wRyxRQUFRLEdBQUdwVixFQUFFLElBQUkscUJBQU0sQ0FBQ3NGLEtBQUQsRUFBUStCLE9BQVIsRUFBaUJpRyxJQUFqQixLQUEwQjtBQUNyRCxNQUFJQSxJQUFJLENBQUN0RCxVQUFMLENBQWdCM0MsT0FBaEIsQ0FBSixFQUE4QixPQUFPLHVCQUFRLENBQUN5SixRQUFULENBQVA7QUFDOUIsTUFBSXRTLENBQUMsQ0FBQzZXLFFBQUYsQ0FBV2hPLE9BQVgsRUFBb0JpRyxJQUFJLENBQUM1QyxPQUFMLENBQWFFLEtBQWIsQ0FBbUJFLEdBQXZDLENBQUosRUFBaUQsT0FBTyx1QkFBUSxDQUFDZ0csUUFBVCxDQUFQO0FBRWpELFNBQU8sYUFBTWpDLFNBQU4sQ0FBZ0J2SixLQUFoQixFQUF1QjtBQUM1QjdELGFBQVMsRUFBRTZMLElBQUksQ0FBQzdMLFNBRFk7QUFFNUJzTixVQUFNLEVBQUUsSUFGb0I7QUFHNUJELGFBQVMsRUFBRSxlQUFPeEgsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSDtBQUFGLEtBQTNCO0FBSGlCLEdBQXZCLEVBSUo3SCxJQUpJLENBSUNxRixHQUFHLElBQUk3RSxFQUFFLENBQUM2RSxHQUFELEVBQU15SSxJQUFOLENBSlYsQ0FBUDtBQUtELENBVHNCLENBQXZCOztBQVdBLE1BQU1nSSxRQUFRLEdBQUd0VixFQUFFLElBQUkscUJBQU0sQ0FBQ3NGLEtBQUQsRUFBUStCLE9BQVIsRUFBaUJpRyxJQUFqQixLQUMzQixhQUFNdUIsU0FBTixDQUFnQnZKLEtBQWhCLEVBQXVCO0FBQ3JCN0QsV0FBUyxFQUFFNkwsSUFBSSxDQUFDN0wsU0FESztBQUVyQnFOLFdBQVMsRUFBRSxlQUFPeEgsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSDtBQUFGLEdBQTNCO0FBRlUsQ0FBdkIsRUFHRzdILElBSEgsQ0FHUVEsRUFIUixDQURxQixDQUF2Qjs7QUFPQSxNQUFNdVYsS0FBSyxHQUFHO0FBQ1pDLEtBQUcsRUFBRUYsUUFBUSxDQUNYOVcsQ0FBQyxDQUFDMkIsT0FBRixDQUNFM0IsQ0FBQyxDQUFDaVgsUUFBRixDQUFXLENBQUMsQ0FBWixDQURGLEVBRUVqWCxDQUFDLENBQUNnUyxTQUFGLENBQVksQ0FBWixDQUZGLEVBR0VoUyxDQUFDLENBQUN5RixJQUFGLENBQU8sV0FBUCxDQUhGLENBRFcsQ0FERDtBQVFaeVIsS0FBRyxFQUFFSixRQUFRLENBQUM5VyxDQUFDLENBQUN5RixJQUFGLENBQU8sV0FBUCxDQUFELENBUkQ7QUFTWjBSLFFBQU0sRUFBRVAsUUFBUSxDQUNkLENBQUM7QUFBRW5VLGFBQUY7QUFBYTJVO0FBQWIsR0FBRCxLQUErQixDQUFDLENBQUQsSUFBTUEsVUFBVSxJQUFJM1UsU0FBcEIsQ0FEakIsQ0FUSjtBQVlaNFUsS0FBRyxFQUFFVCxRQUFRLENBQ1g1VyxDQUFDLENBQUMyQixPQUFGLENBQ0V5TyxDQUFDLElBQUksQ0FBQyxDQUFELEdBQUtwRCxRQUFRLENBQUNvRCxDQUFELEVBQUksRUFBSixDQURwQixFQUVFcFEsQ0FBQyxDQUFDaUYsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxPQUFWLENBQVosQ0FGRixDQURXLENBWkQ7QUFrQlpxUyxVQUFRLEVBQUVWLFFBQVEsQ0FDaEI1VyxDQUFDLENBQUMyQixPQUFGLENBQ0V5TyxDQUFDLElBQUksQ0FBQyxDQUFELEdBQUsxTixVQUFVLENBQUMwTixDQUFELEVBQUksRUFBSixDQUR0QixFQUVFcFEsQ0FBQyxDQUFDaUYsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVosQ0FGRixDQURnQixDQWxCTjtBQXdCWnNTLFdBQVMsRUFBRVgsUUFBUSxDQUFDckksS0FBSyxJQUFJO0FBQzNCLFVBQU05TCxTQUFTLEdBQUd6QyxDQUFDLENBQUN5RixJQUFGLENBQU8sV0FBUCxFQUFvQjhJLEtBQXBCLENBQWxCO0FBQ0EsVUFBTWlKLEtBQUssR0FBR3hLLFFBQVEsQ0FBQ2hOLENBQUMsQ0FBQ2lGLE1BQUYsQ0FBUyxDQUFULEVBQVksQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFaLEVBQWtDc0osS0FBbEMsQ0FBRCxFQUEyQyxFQUEzQyxDQUF0QjtBQUNBLFVBQU1rSixPQUFPLEdBQUdoVixTQUFTLEdBQUcsSUFBWixHQUFtQixVQUFuQztBQUNBLFVBQU1pVixLQUFLLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLEdBQUwsQ0FBU0YsSUFBSSxDQUFDRyxHQUFMLENBQVNOLEtBQVQsQ0FBVCxFQUEwQixDQUExQixDQUFYLENBQWQ7QUFFQSxRQUFJLENBQUNBLEtBQUwsRUFBWSxPQUFPLGFBQWFDLE9BQXBCO0FBQ1osV0FBTyxDQUFDLENBQUQsSUFBTUMsS0FBSyxHQUFHRCxPQUFPLEdBQUcsS0FBeEIsQ0FBUDtBQUNELEdBUmtCLENBeEJQO0FBaUNaTSxLQUFHLEVBQUVuQixRQUFRLENBQUNySSxLQUFLLElBQUk7QUFDckIsVUFBTTlMLFNBQVMsR0FBR3pDLENBQUMsQ0FBQ3lGLElBQUYsQ0FBTyxXQUFQLEVBQW9COEksS0FBcEIsQ0FBbEI7QUFDQSxVQUFNaUosS0FBSyxHQUFHeEssUUFBUSxDQUFDaE4sQ0FBQyxDQUFDaUYsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxPQUFWLENBQVosRUFBZ0NzSixLQUFoQyxDQUFELEVBQXlDLEVBQXpDLENBQXRCO0FBQ0EsVUFBTWtKLE9BQU8sR0FBR2hWLFNBQVMsR0FBRyxJQUFaLEdBQW1CLFVBQW5DO0FBQ0EsVUFBTWlWLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsR0FBTCxDQUFTRixJQUFJLENBQUNHLEdBQUwsQ0FBU04sS0FBVCxDQUFULEVBQTBCLENBQTFCLENBQVgsQ0FBZDtBQUNBLFFBQUlRLElBQUksR0FBRyxDQUFYOztBQUVBLFFBQUlSLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDYlEsVUFBSSxHQUFHLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSVIsS0FBSyxHQUFHLENBQVosRUFBZTtBQUNwQlEsVUFBSSxHQUFHLENBQUMsQ0FBUjtBQUNEOztBQUNELFdBQU8sQ0FBQyxDQUFELElBQU1BLElBQUksR0FBR04sS0FBUCxHQUFlRCxPQUFPLEdBQUcsS0FBL0IsQ0FBUDtBQUNELEdBYlksQ0FqQ0Q7QUErQ1pRLE1BQUksRUFBRXJCLFFBQVEsQ0FBQ3JJLEtBQUssSUFBSTtBQUN0QixVQUFNMkosR0FBRyxHQUFHbEwsUUFBUSxDQUFDaE4sQ0FBQyxDQUFDaUYsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxJQUFWLENBQVosRUFBNkJzSixLQUE3QixDQUFELEVBQXNDLEVBQXRDLENBQXBCO0FBQ0EsVUFBTTRKLEtBQUssR0FBR25MLFFBQVEsQ0FBQ2hOLENBQUMsQ0FBQ2lGLE1BQUYsQ0FBUyxDQUFULEVBQVksQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFaLEVBQStCc0osS0FBL0IsQ0FBRCxFQUF3QyxFQUF4QyxDQUF0QjtBQUNBLFVBQU02SixDQUFDLEdBQUdGLEdBQUcsR0FBR0MsS0FBaEI7QUFFQSxRQUFJQyxDQUFDLEtBQUssQ0FBVixFQUFhLE9BQU8sQ0FBUDtBQUNiLFVBQU1DLENBQUMsR0FBRyxjQUFWLENBTnNCLENBTUk7O0FBQzFCLFVBQU0zSyxDQUFDLEdBQUd3SyxHQUFHLEdBQUdFLENBQWhCO0FBQ0EsVUFBTUUsSUFBSSxHQUFHNUssQ0FBQyxHQUFJLEtBQUssSUFBSTBLLENBQVQsQ0FBRCxHQUFnQkMsQ0FBaEIsR0FBb0JBLENBQXJDO0FBQ0EsVUFBTUUsS0FBSyxHQUFHRixDQUFDLEdBQUdWLElBQUksQ0FBQ2EsSUFBTCxDQUFXOUssQ0FBQyxJQUFJLElBQUlBLENBQVIsQ0FBRixHQUFnQjBLLENBQWhCLEdBQXFCQyxDQUFDLEdBQUdBLENBQUwsSUFBVyxJQUFJRCxDQUFKLEdBQVFBLENBQW5CLENBQTlCLENBQWxCO0FBQ0EsVUFBTUssS0FBSyxHQUFHLElBQUssSUFBSUwsQ0FBTCxHQUFVQyxDQUFWLEdBQWNBLENBQWhDO0FBRUEsV0FBTyxDQUFDLENBQUQsSUFBTSxDQUFDQyxJQUFJLEdBQUdDLEtBQVIsSUFBaUJFLEtBQXZCLENBQVA7QUFDRCxHQWJhLENBL0NGO0FBNkRaQyxlQUFhLEVBQUU5QixRQUFRLENBQUNySSxLQUFLLElBQUk7QUFDL0IsVUFBTTJKLEdBQUcsR0FBR2xMLFFBQVEsQ0FBQ2hOLENBQUMsQ0FBQ2lGLE1BQUYsQ0FBUyxDQUFULEVBQVksQ0FBQyxPQUFELEVBQVUsSUFBVixDQUFaLEVBQTZCc0osS0FBN0IsQ0FBRCxFQUFzQyxFQUF0QyxDQUFwQjtBQUNBLFVBQU00SixLQUFLLEdBQUduTCxRQUFRLENBQUNoTixDQUFDLENBQUNpRixNQUFGLENBQVMsQ0FBVCxFQUFZLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBWixFQUErQnNKLEtBQS9CLENBQUQsRUFBd0MsRUFBeEMsQ0FBdEI7QUFFQSxRQUFJMkosR0FBRyxJQUFJLENBQVAsSUFBWUMsS0FBSyxJQUFJLENBQXpCLEVBQTRCLE9BQU8sQ0FBUDtBQUM1QixVQUFNUSxTQUFTLEdBQUdULEdBQUcsR0FBR0MsS0FBeEI7QUFDQSxVQUFNUyxPQUFPLEdBQUdWLEdBQUcsR0FBR0MsS0FBTixHQUFjQSxLQUFLLEdBQUdELEdBQXRCLEdBQTRCQSxHQUFHLEdBQUdDLEtBQWxEO0FBRUEsV0FBTyxDQUFDLENBQUQsR0FBS1EsU0FBUyxJQUFJQyxPQUF6QjtBQUNELEdBVHNCO0FBN0RYLENBQWQ7O0FBeUVBLE1BQU1DLFdBQVcsR0FBR3JSLElBQUksSUFBSSxDQUFDLENBQUN1UCxLQUFLLENBQUN2UCxJQUFELENBQW5DOztBQUVBLE1BQU1zUixNQUFNLEdBQUcscUJBQ2IsQ0FBQ2hTLEtBQUQsRUFBUXpFLEVBQVIsRUFBWXlNLElBQVosS0FDRSxDQUFDaUksS0FBSyxDQUFDakksSUFBSSxDQUFDdEgsSUFBTixDQUFMLElBQW9CdVAsS0FBSyxDQUFDQyxHQUEzQixFQUFnQ2xRLEtBQWhDLEVBQXVDekUsRUFBdkMsRUFBMkN5TSxJQUEzQyxFQUFpRDlOLElBQWpELENBQXNEdUMsR0FBRyxJQUFJLENBQUNsQixFQUFELEVBQUtrQixHQUFMLENBQTdELENBRlcsQ0FBZjs7QUFLQSxNQUFNMEQsWUFBWSxHQUFHLENBQUNILEtBQUQsRUFBUTlCLElBQVIsRUFBYzhKLElBQWQsS0FBdUJnSyxNQUFNLENBQUNoUyxLQUFELEVBQVEseUJBQVltSyxRQUFaLENBQXFCak0sSUFBckIsQ0FBUixFQUFvQzhKLElBQXBDLENBQWxEOztBQUVBLE1BQU1tRyxPQUFPLEdBQUcscUJBQ2QsQ0FBQ25PLEtBQUQsRUFBUThCLEdBQVIsRUFBYWtHLElBQWIsS0FBc0IsbUJBQUk5TyxDQUFDLENBQUM0QixHQUFGLENBQ3hCUyxFQUFFLElBQUl5VyxNQUFNLENBQUNoUyxLQUFELEVBQVF6RSxFQUFSLEVBQVl5TSxJQUFaLENBRFksRUFFeEJsRyxHQUZ3QixDQUFKLENBRFIsQ0FBaEI7QUFPQSxNQUFNbVEsYUFBYSxHQUFHLHFCQUNwQixDQUFDalMsS0FBRCxFQUFRQyxLQUFSLEVBQWUrSCxJQUFmLEtBQ0UsbUJBQUk5TyxDQUFDLENBQUM0QixHQUFGLENBQU1rRixLQUFLLENBQUNNLEdBQVosRUFBaUJMLEtBQWpCLENBQUosRUFDRy9GLElBREgsQ0FDUWhCLENBQUMsQ0FBQ2daLElBQUYsQ0FDSixnQkFBU0MsS0FETCxFQUVKLGdCQUFTclEsR0FGTCxFQUdKQSxHQUFHLElBQUlxTSxPQUFPLENBQUNuTyxLQUFELEVBQVE4QixHQUFSLEVBQWFrRyxJQUFiLENBSFYsQ0FEUixFQU1HOU4sSUFOSCxDQU1Ra0csU0FOUixDQUZrQixDQUF0QjtBQVdPLE1BQU1nUyxXQUFXLEdBQUc7QUFDekJwSixRQUR5QjtBQUV6QkksU0FGeUI7QUFHekI2RyxPQUh5QjtBQUl6QjhCLGFBSnlCO0FBS3pCQyxRQUx5QjtBQU16QjdELFNBTnlCO0FBT3pCMEIsT0FQeUI7QUFRekIxUCxjQVJ5QjtBQVN6QkMsV0FUeUI7QUFVekI2UjtBQVZ5QixDQUFwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSVA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNek8sVUFBVSxHQUFHdEssQ0FBQyxDQUFDMkIsT0FBRixDQUNqQjNCLENBQUMsQ0FBQ21aLEtBQUYsQ0FBUW5aLENBQUMsQ0FBQ29LLFNBQVYsQ0FEaUIsRUFFakJwSyxDQUFDLENBQUNvWixFQUFGLENBQUssQ0FBQyw2QkFBY2xQLGNBQWYsRUFBK0JsSyxDQUFDLENBQUNzRixRQUFqQyxDQUFMLENBRmlCLEVBR2pCdEYsQ0FBQyxDQUFDcVosRUFIZSxFQUlqQnJaLENBQUMsQ0FBQ21aLEtBQUYsQ0FBUW5aLENBQUMsQ0FBQytSLEtBQUYsQ0FBUSxZQUFSLENBQVIsQ0FKaUIsRUFLakIvUixDQUFDLENBQUNvWixFQUFGLENBQUssQ0FBQyxxQ0FBa0JsUCxjQUFuQixFQUFtQ2xLLENBQUMsQ0FBQ3NGLFFBQXJDLENBQUwsQ0FMaUIsRUFNakJ0RixDQUFDLENBQUNxWixFQU5lLEVBT2pCLHFDQUFrQi9PLFVBUEQsQ0FBbkI7QUFVQSxNQUFNZ1AsU0FBUyxHQUFHLHFCQUFNLENBQUN4UyxLQUFELEVBQVF0RSxRQUFSLEVBQWtCMkgsSUFBbEIsRUFBd0JvUCxLQUFLLEdBQUcsRUFBaEMsS0FDdEIsYUFBTUMsUUFBTixDQUFlMVMsS0FBZixFQUFzQnRFLFFBQXRCLEVBQWdDMkgsSUFBaEMsRUFDR25KLElBREgsQ0FDUWhCLENBQUMsQ0FBQzJCLE9BQUYsQ0FDSlcsSUFBSSxJQUFLLEdBQUVBLElBQUs7O0VBRXBCaVgsS0FBSyxJQUFJLEVBQUc7b0JBQ00vVyxRQUFTLElBQUcySCxJQUFLO0NBSjNCLEVBTUoscUJBQWM3SCxJQU5WLENBRFIsQ0FEZ0IsQ0FBbEI7QUFZTyxNQUFNbVgsV0FBVyxHQUFHO0FBQUVuUCxZQUFGO0FBQWNnUDtBQUFkLENBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0vVyxJQUFJLEdBQUcsZ0JBQWI7QUFDQSxNQUFNNEksSUFBSSxHQUFHLENBQUUsR0FBRywyQkFBYUEsSUFBbEIsRUFBd0IsTUFBeEIsQ0FBYjtBQUVBLE1BQU11TyxVQUFVLEdBQUcscUJBQU0sQ0FBQzVTLEtBQUQsRUFBUTtBQUFFZ0QsT0FBRjtBQUFTdEM7QUFBVCxDQUFSLEtBQ3ZCLGFBQU1nUyxRQUFOLENBQWUxUyxLQUFmLEVBQXNCLGVBQU8zRCxPQUE3QixFQUFzQyxzQkFBdEMsQ0FEaUIsQ0FBbkI7QUFJQSxNQUFNbVcsU0FBUyxHQUFHLHFCQUFNLENBQUN4UyxLQUFELEVBQVE7QUFBRWdELE9BQUY7QUFBU3RDO0FBQVQsQ0FBUixLQUE0QjtBQUNsRCxRQUFNbVMsWUFBWSxHQUFHLFdBQUtDLFdBQUwsQ0FBaUI5UCxLQUFqQixDQUFyQjs7QUFDQSxRQUFNK1AsUUFBUSxHQUFHL1AsS0FBSyxLQUFLLEtBQVYsR0FBa0IsVUFBbEIsR0FBK0I2UCxZQUFZLENBQUMsQ0FBRCxDQUFaLElBQW1CLFVBQW5FO0FBQ0EsUUFBTS9SLE1BQU0sR0FBRytSLFlBQVksQ0FBQ3hYLE1BQWIsQ0FDYixDQUFDa0UsR0FBRCxFQUFNeUQsS0FBTixLQUFnQixDQUFDLEdBQUd6RCxHQUFKLEVBQVUsUUFBT3lELEtBQU0sRUFBdkIsQ0FESCxFQUViLEVBRmEsQ0FBZjtBQUtBLFNBQU8seUJBQVl3UCxTQUFaLENBQ0x4UyxLQURLLEVBRUwsZUFBTzNELE9BRkYsRUFHTCxjQUhLLEVBSUwsQ0FDRSxVQURGLEVBRUUsaUJBRkYsRUFHRyxhQUFZMFcsUUFBUyxFQUh4QixFQUlHLFFBQU9yUyxJQUFLLEVBSmYsRUFLRSxHQUFHeEgsQ0FBQyxDQUFDNEIsR0FBRixDQUFNa0ksS0FBSyxJQUFLLFNBQVFBLEtBQU0sRUFBOUIsRUFBaUNsQyxNQUFqQyxDQUxMLEVBTUUsR0FBRzVILENBQUMsQ0FBQzRCLEdBQUYsQ0FBTWtZLEdBQUcsSUFBSyxPQUFNQSxHQUFJLE9BQU1oUSxLQUFNLElBQUdnUSxHQUFJLEVBQTNDLEVBQThDM08sSUFBOUMsQ0FOTCxFQU9FcEQsSUFQRixDQU9PLElBUFAsQ0FKSyxDQUFQO0FBYUQsQ0FyQmlCLENBQWxCO0FBdUJBLE1BQU13TyxPQUFPLEdBQUcscUJBQU0sQ0FBQ3pQLEtBQUQsRUFBUW9LLEtBQVIsS0FDcEJvSSxTQUFTLENBQUN4UyxLQUFELEVBQVFvSyxLQUFSLENBQVQsQ0FBd0JsUSxJQUF4QixDQUE2Qix5QkFBWXNKLFVBQXpDLENBRGMsQ0FBaEI7O0FBSU8sTUFBTXlQLFdBQVcsR0FBRyxXQUFLQyxTQUFMLENBQWU7QUFDeEN6WCxNQUR3QztBQUV4Q21YLFlBRndDO0FBR3hDSixXQUh3QztBQUl4Qy9DO0FBSndDLENBQWYsQ0FBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNaFUsSUFBSSxHQUFHLGlDQUFiO0FBRUEsTUFBTW1YLFVBQVUsR0FBRyxxQkFBTTVTLEtBQUssSUFDNUIsYUFBTTBTLFFBQU4sQ0FBZTFTLEtBQWYsRUFBc0IsZUFBTzNELE9BQTdCLEVBQXNDLDBCQUF0QyxDQURpQixDQUFuQjtBQUlBLE1BQU1tVyxTQUFTLEdBQUcscUJBQU0sQ0FBQ3hTLEtBQUQsRUFBUTtBQUFFK0IsU0FBRjtBQUFXckI7QUFBWCxDQUFSLEtBQ3RCLHlCQUFZOFIsU0FBWixDQUNFeFMsS0FERixFQUVFLGVBQU8zRCxPQUZULEVBR0Usa0JBSEYsRUFJRSxDQUFFLE1BQUswRixPQUFRLEVBQWYsRUFBbUIsUUFBT3JCLElBQUssRUFBL0IsRUFBa0NPLElBQWxDLENBQXVDLElBQXZDLENBSkYsQ0FEZ0IsQ0FBbEI7QUFTQSxNQUFNd08sT0FBTyxHQUFHLHFCQUFNLENBQUN6UCxLQUFELEVBQVFvSyxLQUFSLEtBQ3BCb0ksU0FBUyxDQUFDeFMsS0FBRCxFQUFRb0ssS0FBUixDQUFULENBQXdCbFEsSUFBeEIsQ0FBNkIseUJBQVlzSixVQUF6QyxDQURjLENBQWhCOztBQUlPLE1BQU0yUCxjQUFjLEdBQUcsV0FBS0QsU0FBTCxDQUFlO0FBQzNDelgsTUFEMkM7QUFFM0NtWCxZQUYyQztBQUczQ0osV0FIMkM7QUFJM0MvQztBQUoyQyxDQUFmLENBQXZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QlA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTWhVLElBQUksR0FBRyxpQ0FBYjtBQUVBLE1BQU1tWCxVQUFVLEdBQUcscUJBQU01UyxLQUFLLElBQzVCLGFBQU0wUyxRQUFOLENBQWUxUyxLQUFmLEVBQXNCLGVBQU8zRCxPQUE3QixFQUFzQywyQkFBdEMsQ0FEaUIsQ0FBbkI7QUFJQSxNQUFNbVcsU0FBUyxHQUFHLHFCQUFNLENBQUN4UyxLQUFELEVBQVE7QUFBRXRFLFVBQUY7QUFBWWdGO0FBQVosQ0FBUixLQUN0Qix5QkFBWThSLFNBQVosQ0FDRXhTLEtBREYsRUFFRSxlQUFPM0QsT0FGVCxFQUdFLG1CQUhGLEVBSUUsQ0FDRyxXQUFVWCxRQUFTLEVBRHRCLEVBRUcsUUFBT2dGLElBQUssRUFGZixFQUdFTyxJQUhGLENBR08sSUFIUCxDQUpGLENBRGdCLENBQWxCO0FBWUEsTUFBTXdPLE9BQU8sR0FBRyxxQkFBTSxDQUFDelAsS0FBRCxFQUFRb0ssS0FBUixLQUNwQm9JLFNBQVMsQ0FBQ3hTLEtBQUQsRUFBUW9LLEtBQVIsQ0FBVCxDQUF3QmxRLElBQXhCLENBQTZCLHlCQUFZc0osVUFBekMsQ0FEYyxDQUFoQjs7QUFJTyxNQUFNNFAsZ0JBQWdCLEdBQUcsV0FBS0YsU0FBTCxDQUFlO0FBQUV6WCxNQUFGO0FBQVFtWCxZQUFSO0FBQW9CSixXQUFwQjtBQUErQi9DO0FBQS9CLENBQWYsQ0FBekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1oVSxJQUFJLEdBQUcsdUJBQWI7QUFDQSxNQUFNNEksSUFBSSxHQUFHLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxXQUFmLEVBQTRCLGVBQTVCLEVBQTZDLEtBQTdDLENBQWI7QUFFQSxNQUFNdU8sVUFBVSxHQUFHLHFCQUFNNVMsS0FBSyxJQUM1QixhQUFNMFMsUUFBTixDQUFlMVMsS0FBZixFQUFzQixlQUFPM0QsT0FBN0IsRUFBc0Msd0JBQXRDLENBRGlCLENBQW5CO0FBSUEsTUFBTW1XLFNBQVMsR0FBRyxxQkFBTSxDQUFDeFMsS0FBRCxFQUFRO0FBQUUrQyxRQUFGO0FBQVVyQztBQUFWLENBQVIsS0FBNkI7QUFDbkQsUUFBTVcsT0FBTyxHQUFHLFdBQUt5UixXQUFMLENBQWlCL1AsTUFBakIsQ0FBaEI7O0FBRUEsU0FBTyx5QkFBWXlQLFNBQVosQ0FDTHhTLEtBREssRUFFTCxlQUFPM0QsT0FGRixFQUdMLGdCQUhLLEVBSUwsQ0FDRyxRQUFPZ0YsT0FBTyxDQUFDLENBQUQsQ0FBSSxFQURyQixFQUVFLG9CQUZGLEVBR0csUUFBT1gsSUFBSyxFQUhmLEVBSUUsaUJBSkYsRUFLRSxHQUFHeEgsQ0FBQyxDQUFDNEIsR0FBRixDQUFNaUksTUFBTSxJQUFLLFVBQVNBLE1BQU8sRUFBakMsRUFBb0MxQixPQUFwQyxDQUxMLEVBTUUsR0FBR25JLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTWtZLEdBQUcsSUFBSyxPQUFNQSxHQUFJLFlBQVdqUSxNQUFPLElBQUdpUSxHQUFJLEVBQWpELEVBQW9EM08sSUFBcEQsQ0FOTCxFQU9FcEQsSUFQRixDQU9PLElBUFAsQ0FKSyxDQUFQO0FBYUQsQ0FoQmlCLENBQWxCO0FBa0JBLE1BQU13TyxPQUFPLEdBQUcscUJBQU0sQ0FBQ3pQLEtBQUQsRUFBUW9LLEtBQVIsS0FDcEJvSSxTQUFTLENBQUN4UyxLQUFELEVBQVFvSyxLQUFSLENBQVQsQ0FBd0JsUSxJQUF4QixDQUE2Qix5QkFBWXNKLFVBQXpDLENBRGMsQ0FBaEI7O0FBSU8sTUFBTTZQLGFBQWEsR0FBRyxXQUFLSCxTQUFMLENBQWU7QUFDMUN6WCxNQUQwQztBQUUxQzRJLE1BRjBDO0FBRzFDdU8sWUFIMEM7QUFJMUNKLFdBSjBDO0FBSzFDL0M7QUFMMEMsQ0FBZixDQUF0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTWhVLElBQUksR0FBRyxvQkFBYjtBQUNBLE1BQU00SSxJQUFJLEdBQUcsMkJBQWFBLElBQTFCO0FBRUEsTUFBTXVPLFVBQVUsR0FBRyxxQkFBTTVTLEtBQUssSUFDNUIsYUFBTTBTLFFBQU4sQ0FBZTFTLEtBQWYsRUFBc0IsZUFBTzNELE9BQTdCLEVBQXNDLDBCQUF0QyxDQURpQixDQUFuQjtBQUlBLE1BQU1tVyxTQUFTLEdBQUcscUJBQU0sQ0FBQ3hTLEtBQUQsRUFBUTtBQUFFZ0QsT0FBRjtBQUFTdEM7QUFBVCxDQUFSLEtBQTRCO0FBQ2xELFFBQU1tUyxZQUFZLEdBQUcsV0FBS0MsV0FBTCxDQUFpQjlQLEtBQWpCLENBQXJCOztBQUNBLFFBQU0rUCxRQUFRLEdBQUcvUCxLQUFLLEtBQUssS0FBVixHQUFrQixVQUFsQixHQUErQjZQLFlBQVksQ0FBQyxDQUFELENBQVosSUFBbUIsVUFBbkU7QUFDQSxRQUFNL1IsTUFBTSxHQUFHK1IsWUFBWSxDQUFDeFgsTUFBYixDQUNiLENBQUNrRSxHQUFELEVBQU15RCxLQUFOLEtBQWdCLENBQUMsR0FBR3pELEdBQUosRUFBU3lELEtBQVQsRUFBaUIsUUFBT0EsS0FBTSxFQUE5QixFQUFrQyxZQUFXQSxLQUFNLEVBQW5ELENBREgsRUFFYixFQUZhLENBQWY7QUFLQSxTQUFPLHlCQUFZd1AsU0FBWixDQUNMeFMsS0FESyxFQUVMLGVBQU8zRCxPQUZGLEVBR0wsa0JBSEssRUFJTCxDQUNFLFVBREYsRUFFRSxpQkFGRixFQUdHLGFBQVkwVyxRQUFTLEVBSHhCLEVBSUcsUUFBT3JTLElBQUssRUFKZixFQUtFLEdBQUd4SCxDQUFDLENBQUM0QixHQUFGLENBQU1rSSxLQUFLLElBQUssU0FBUUEsS0FBTSxFQUE5QixFQUFpQ2xDLE1BQWpDLENBTEwsRUFNRSxHQUFHNUgsQ0FBQyxDQUFDNEIsR0FBRixDQUFNa1ksR0FBRyxJQUFLLE9BQU1BLEdBQUksT0FBTWhRLEtBQU0sSUFBR2dRLEdBQUksRUFBM0MsRUFBOEMzTyxJQUE5QyxDQU5MLEVBT0VwRCxJQVBGLENBT08sSUFQUCxDQUpLLENBQVA7QUFhRCxDQXJCaUIsQ0FBbEI7QUF1QkEsTUFBTXdPLE9BQU8sR0FBRyxxQkFBTSxDQUFDelAsS0FBRCxFQUFRb0ssS0FBUixLQUNwQm9JLFNBQVMsQ0FBQ3hTLEtBQUQsRUFBUW9LLEtBQVIsQ0FBVCxDQUF3QmxRLElBQXhCLENBQTZCLHlCQUFZc0osVUFBekMsQ0FEYyxDQUFoQjs7QUFJTyxNQUFNOFAsZUFBZSxHQUFHLFdBQUtKLFNBQUwsQ0FBZTtBQUM1QzdPLE1BRDRDO0FBRTVDNUksTUFGNEM7QUFHNUNtWCxZQUg0QztBQUk1Q0osV0FKNEM7QUFLNUMvQztBQUw0QyxDQUFmLENBQXhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ1A7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTWhVLElBQUksR0FBRyxxQ0FBYjtBQUVBLE1BQU1tWCxVQUFVLEdBQUcscUJBQU01UyxLQUFLLElBQzVCLGFBQU0wUyxRQUFOLENBQWUxUyxLQUFmLEVBQXNCLGVBQU8zRCxPQUE3QixFQUFzQyx1QkFBdEMsQ0FEaUIsQ0FBbkI7QUFJQSxNQUFNbVcsU0FBUyxHQUFHLHFCQUFNLENBQUN4UyxLQUFELEVBQVE7QUFBRXRFLFVBQUY7QUFBWStGLE1BQVo7QUFBa0JmLE1BQUksR0FBRztBQUF6QixDQUFSLEtBQ3RCLHlCQUFZOFIsU0FBWixDQUNFeFMsS0FERixFQUVFLGVBQU8zRCxPQUZULEVBR0UsZUFIRixFQUlFLENBQUUscUJBQW9CWCxRQUFTLEVBQS9CLEVBQWtDLGNBQWxDLEVBQW1ELFFBQU8rRixJQUFLLEVBQS9ELEVBQW1FLFFBQU9mLElBQUssRUFBL0UsRUFBa0ZPLElBQWxGLENBQXVGLElBQXZGLENBSkYsQ0FEZ0IsQ0FBbEI7QUFTQSxNQUFNd08sT0FBTyxHQUFHLHFCQUFNLENBQUN6UCxLQUFELEVBQVFvSyxLQUFSLEtBQ3BCb0ksU0FBUyxDQUFDeFMsS0FBRCxFQUFRb0ssS0FBUixDQUFULENBQXdCbFEsSUFBeEIsQ0FBNkIseUJBQVlzSixVQUF6QyxDQURjLENBQWhCOztBQUlBLE1BQU02SyxLQUFLLEdBQUcsT0FBT0osR0FBUCxFQUFZaE0sS0FBWixFQUFtQjtBQUFFcU0sYUFBRjtBQUFlMUM7QUFBZixDQUFuQixLQUE2QztBQUN6RCxRQUFNNUwsS0FBSyxHQUFHaU8sR0FBRyxDQUFDQyxRQUFKLEVBQWQ7O0FBQ0EsUUFBTXFGLFFBQVEsR0FBRyxpQkFBUTNVLFNBQVIsQ0FBa0JnTixJQUFsQixDQUFqQjs7QUFDQSxRQUFNLENBQUM0SCxlQUFELElBQW9CLHlCQUFZcEcsY0FBWixDQUEyQm1HLFFBQTNCLENBQTFCOztBQUNBLFFBQU12TCxJQUFJLEdBQUcsTUFBTXlILE9BQU8sQ0FBQ3pQLEtBQUQsRUFBUWlDLEtBQUssQ0FBQ21JLEtBQWQsQ0FBMUI7O0FBQ0EsTUFBSW9FLFVBQVUsR0FBRyxnQkFBUzFNLEdBQVQsQ0FBYXlSLFFBQWIsQ0FBakI7O0FBRUEsT0FBSyxJQUFJOUcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRytHLGVBQWUsQ0FBQ3pTLE1BQXBDLEVBQTRDMEwsQ0FBQyxFQUE3QyxFQUFpRDtBQUMvQyxVQUFNZ0gsSUFBSSxHQUFHRCxlQUFlLENBQUMvRyxDQUFELENBQTVCOztBQUNBLFVBQU1pSCxRQUFRLEdBQUcsZ0JBQVM1UixHQUFULEVBQ2YsTUFBTTlCLEtBQUssQ0FDUk0sR0FERyxDQUNDLGVBQU9xVCxhQUFQLENBQXFCMVIsS0FBckIsQ0FBMkJDLE9BQTNCLENBQW1DO0FBQUVILGFBQU8sRUFBRTBSO0FBQVgsS0FBbkMsQ0FERCxFQUVIdlosSUFGRyxFQURTLEVBQWpCOztBQU1Bc1UsY0FBVSxHQUFHQSxVQUFVLENBQUN4QixNQUFYLENBQWtCMEcsUUFBbEIsQ0FBYjtBQUNEOztBQUVELE1BQUlsRixVQUFVLENBQUN6TixNQUFmLEVBQ0UsTUFBTSw2QkFBY2lOLGFBQWQsQ0FBNEJDLEdBQTVCLEVBQWlDaE0sS0FBakMsRUFBd0NqQyxLQUF4QyxFQUErQ2dJLElBQS9DLEVBQXFEd0csVUFBckQsRUFBaUUsRUFBakUsQ0FBTjs7QUFDRixPQUFLLE1BQU1oUyxHQUFYLElBQWtCd0QsS0FBSyxDQUFDNk8sV0FBTixFQUFsQixFQUF1Q1osR0FBRyxDQUFDYSxNQUFKLENBQVd0UyxHQUFYLEVBQWdCeUYsS0FBSyxDQUFDL0QsSUFBdEI7QUFDeEMsQ0FyQkQ7O0FBdUJPLE1BQU0wVixZQUFZLEdBQUcsV0FBS1YsU0FBTCxDQUFlO0FBQ3pDelgsTUFEeUM7QUFFekNtWCxZQUZ5QztBQUd6Q0osV0FIeUM7QUFJekMvQyxTQUp5QztBQUt6Q3BCO0FBTHlDLENBQWYsQ0FBckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU01UyxJQUFJLEdBQUcsNkJBQWI7QUFDQSxNQUFNNEksSUFBSSxHQUFHLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsV0FBekIsRUFBc0MsVUFBdEMsQ0FBYjtBQUVBLE1BQU11TyxVQUFVLEdBQUcscUJBQU01UyxLQUFLLElBQzVCLGFBQU0wUyxRQUFOLENBQWUxUyxLQUFmLEVBQXNCLGVBQU8zRCxPQUE3QixFQUFzQyx5QkFBdEMsQ0FEaUIsQ0FBbkI7QUFJQSxNQUFNbVcsU0FBUyxHQUFHLHFCQUFNLENBQUN4UyxLQUFELEVBQVE7QUFBRXRFLFVBQUY7QUFBWStGLE1BQVo7QUFBa0JmO0FBQWxCLENBQVIsS0FDdEIseUJBQVk4UixTQUFaLENBQ0V4UyxLQURGLEVBRUUsZUFBTzNELE9BRlQsRUFHRSxpQkFIRixFQUlFLENBQ0csVUFBU1gsUUFBUyxFQURyQixFQUVHLFFBQU8rRixJQUFLLEVBRmYsRUFHRyxRQUFPZixJQUFLLEVBSGYsRUFJRSxHQUFHeEgsQ0FBQyxDQUFDNEIsR0FBRixDQUFNa1ksR0FBRyxJQUFLLE9BQU1BLEdBQUksVUFBU3RYLFFBQVMsSUFBR3NYLEdBQUksRUFBakQsRUFBb0QzTyxJQUFwRCxDQUpMLEVBS0VwRCxJQUxGLENBS08sSUFMUCxDQUpGLENBRGdCLENBQWxCO0FBY0EsTUFBTXdPLE9BQU8sR0FBRyxxQkFBTSxDQUFDelAsS0FBRCxFQUFRb0ssS0FBUixLQUNwQixhQUFNeUosUUFBTixDQUFlN1QsS0FBZixFQUFzQm9LLEtBQUssQ0FBQzFPLFFBQTVCLEVBQXNDeEIsSUFBdEMsQ0FBMkM0WixJQUFJLElBQzdDdEIsU0FBUyxDQUFDeFMsS0FBRCxFQUFRb0ssS0FBUixDQUFULENBQXdCbFEsSUFBeEIsQ0FBNkJoQixDQUFDLENBQUNnWixJQUFGLENBQzNCLHlCQUFZMU8sVUFEZSxFQUUzQnRLLENBQUMsQ0FBQ29LLFNBQUYsQ0FBWTtBQUNWeVEsV0FBUyxFQUFFM0osS0FBSyxDQUFDMU8sUUFEUDtBQUVWMEksYUFBVyxFQUFFbEwsQ0FBQyxDQUFDaUMsTUFBRixDQUFTLEVBQVQsRUFBYSxPQUFiLEVBQXNCMlksSUFBdEI7QUFGSCxDQUFaLENBRjJCLENBQTdCLENBREYsQ0FEYyxDQUFoQjs7QUFXTyxNQUFNRSxjQUFjLEdBQUcsV0FBS2QsU0FBTCxDQUFlO0FBQzNDelgsTUFEMkM7QUFFM0M0SSxNQUYyQztBQUczQ3VPLFlBSDJDO0FBSTNDSixXQUoyQztBQUszQy9DO0FBTDJDLENBQWYsQ0FBdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1oVSxJQUFJLEdBQUcsb0NBQWI7QUFFQSxNQUFNK1csU0FBUyxHQUFHLHFCQUFNLENBQUN4UyxLQUFELEVBQVE7QUFBRXRFLFVBQUY7QUFBWTJILE1BQVo7QUFBa0IzQztBQUFsQixDQUFSLEtBQ3RCLHFCQUFVOFIsU0FBVixDQUFvQnhTLEtBQXBCLEVBQTJCdEUsUUFBM0IsRUFBcUMySCxJQUFyQyxFQUE0QyxRQUFPM0MsSUFBSyxFQUF4RCxDQURnQixDQUFsQjtBQUlBLE1BQU0rTyxPQUFPLEdBQUcscUJBQU0sQ0FBQ3pQLEtBQUQsRUFBUTtBQUFFdEUsVUFBRjtBQUFZMkgsTUFBWjtBQUFrQjNDO0FBQWxCLENBQVIsS0FDcEIscUJBQVUrTyxPQUFWLENBQWtCelAsS0FBbEIsRUFBeUJ0RSxRQUF6QixFQUFtQzJILElBQW5DLEVBQTBDLFFBQU8zQyxJQUFLLEVBQXRELENBRGMsQ0FBaEI7QUFJQSxNQUFNa1MsVUFBVSxHQUFHLHFCQUFNLENBQUM1UyxLQUFELEVBQVE7QUFBRXRFLFVBQUY7QUFBWTJILE1BQVo7QUFBa0IzQztBQUFsQixDQUFSLEtBQ3ZCLGFBQU1nUyxRQUFOLENBQWUxUyxLQUFmLEVBQXNCdEUsUUFBdEIsRUFBZ0MscUJBQVV1WSxlQUFWLENBQTBCNVEsSUFBMUIsQ0FBaEMsQ0FEaUIsQ0FBbkI7O0FBSUEsTUFBTWdMLEtBQUssR0FBRyxPQUNaSixHQURZLEVBRVpoTSxLQUZZLEVBR1o7QUFBRXFNLGFBQUY7QUFBZTFDLE1BQWY7QUFBcUJ5QixVQUFyQjtBQUErQmhQLFFBQU0sR0FBRztBQUF4QyxDQUhZLEtBSVQ7QUFDSCxRQUFNMkIsS0FBSyxHQUFHaU8sR0FBRyxDQUFDQyxRQUFKLEVBQWQ7O0FBRUEsUUFBTWdHLFlBQVksR0FBRyxpQkFBUXRWLFNBQVIsQ0FBa0J5TyxRQUFsQixDQUFyQjs7QUFDQSxRQUFNa0csUUFBUSxHQUFHLGlCQUFRM1UsU0FBUixDQUFrQmdOLElBQWxCLENBQWpCOztBQUNBLFFBQU0sQ0FBQzRDLFVBQUQsRUFBYTJGLFVBQWIsSUFBMkIseUJBQVkvRyxjQUFaLENBQy9CbUcsUUFEK0IsRUFFL0JXLFlBRitCLENBQWpDOztBQUlBLFFBQU1sTSxJQUFJLEdBQUcsTUFBTXlILE9BQU8sQ0FBQ3pQLEtBQUQsRUFBUWlDLEtBQUssQ0FBQ21JLEtBQWQsQ0FBMUI7O0FBQ0EsUUFBTWdLLGVBQWUsR0FBRyxlQUFPMUYsZUFBUCxDQUF1QnpNLEtBQXZCLENBQTZCbUksS0FBN0IsQ0FBbUNrRSxXQUFuQyxDQUF4Qjs7QUFDQSxRQUFNK0YsVUFBVSxHQUFHLGVBQU9yUyxLQUFQLENBQWFDLEtBQWIsQ0FBbUJtSSxLQUFuQixDQUF5QmtFLFdBQXpCLENBQW5COztBQUNBLFFBQU07QUFBRXZNO0FBQUYsTUFBYyxlQUFPdVMsZUFBUCxDQUF1QnJTLEtBQXZCLENBQTZCbUksS0FBN0IsQ0FBbUNrRSxXQUFuQyxLQUFtRCxFQUF2RTs7QUFDQSxRQUFNaUcsV0FBVyxHQUFHLGVBQU9DLFNBQVAsQ0FBaUJ2UyxLQUFqQixDQUF1Qm1JLEtBQXZCLENBQTZCa0UsV0FBN0IsQ0FBcEI7O0FBRUEsTUFBSThGLGVBQUosRUFBcUI1RixVQUFVLENBQUN4TixJQUFYLENBQWdCb1QsZUFBZSxDQUFDclMsT0FBaEM7QUFDckIsTUFBSXNTLFVBQUosRUFBZ0I3RixVQUFVLENBQUN4TixJQUFYLENBQWdCcVQsVUFBVSxDQUFDdFMsT0FBM0I7QUFDaEIsTUFBSUEsT0FBTyxJQUFJQSxPQUFPLEtBQUtpRyxJQUFJLENBQUN5TSxVQUFoQyxFQUE0Q2pHLFVBQVUsQ0FBQ3hOLElBQVgsQ0FBZ0JlLE9BQWhCO0FBQzVDLFFBQU0sNkJBQWNpTSxhQUFkLENBQ0pDLEdBREksRUFFSmhNLEtBRkksRUFHSmpDLEtBSEksRUFJSmdJLElBSkksRUFLSndHLFVBTEksRUFNSjJGLFVBTkksQ0FBTjs7QUFRQSxPQUFLLE1BQU0zWCxHQUFYLElBQWtCd0QsS0FBSyxDQUFDNk8sV0FBTixFQUFsQixFQUF1Q1osR0FBRyxDQUFDYSxNQUFKLENBQVd0UyxHQUFYLEVBQWdCeUYsS0FBSyxDQUFDL0QsSUFBdEI7O0FBQ3ZDLE1BQ0VoRixDQUFDLENBQUN5RixJQUFGLENBQU8sTUFBUCxFQUFlME8sUUFBZixLQUNBbUIsVUFBVSxDQUFDek4sTUFEWCxJQUVBb1QsVUFBVSxDQUFDcFQsTUFGWCxJQUdBd1QsV0FKRixFQU1FLE9BakNDLENBbUNIOztBQUNBdEwsU0FBTyxDQUFDQyxHQUFSLENBQVksNkJBQVosRUFBMkNqSCxLQUFLLENBQUMvRCxJQUFqRCxFQUF1RG9RLFdBQXZEO0FBQ0EsUUFBTS9ELElBQUksR0FBRyxNQUFNMEQsR0FBRyxDQUFDQyxRQUFKLEdBQWU1TixHQUFmLENBQW1CMkIsS0FBSyxDQUFDL0QsSUFBekIsQ0FBbkI7O0FBQ0EsUUFBTXdXLFlBQVksR0FBRyx5QkFBWTlKLFFBQVosQ0FBcUJMLElBQXJCLENBQXJCOztBQUVBLE1BQUltSyxZQUFZLENBQUMzVCxNQUFqQixFQUF5QjtBQUN2QmtCLFNBQUssQ0FBQ21NLEtBQU4sQ0FBWTtBQUNWeEYsVUFBSSxFQUFFLENBREk7QUFFVixTQUFHOEwsWUFBWSxDQUFDclosTUFBYixDQUFvQixDQUFDdVEsSUFBRCxFQUFPcFAsR0FBUCxLQUFlO0FBQ3BDb1AsWUFBSSxDQUFFLEdBQUVwUCxHQUFJLEVBQVIsQ0FBSixHQUFpQixJQUFqQjtBQUNBLGVBQU9vUCxJQUFQO0FBQ0QsT0FIRSxFQUdBLEVBSEE7QUFGTyxLQUFaO0FBT0Q7O0FBRURxQyxLQUFHLENBQUMwRyxJQUFKLENBQVM7QUFDUHBaLE1BQUUsRUFBRyxVQUFTMEcsS0FBSyxDQUFDL0QsSUFBSyxFQURsQjtBQUVQQSxRQUFJLEVBQUUrRCxLQUFLLENBQUMvRCxJQUZMO0FBR1AwVyxVQUFNLEVBQUUsVUFIRDtBQUlQQyxZQUFRLEVBQUU1UyxLQUFLLENBQUM0UyxRQUFOLElBQWtCO0FBSnJCLEdBQVQ7QUFNRCxDQTVERDs7QUE4RE8sTUFBTUMsWUFBWSxHQUFHLFdBQUs1QixTQUFMLENBQWU7QUFDekN6WCxNQUR5QztBQUV6QytXLFdBRnlDO0FBR3pDSSxZQUh5QztBQUl6Q25ELFNBSnlDO0FBS3pDcEI7QUFMeUMsQ0FBZixDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTTVTLElBQUksR0FBRyxpQkFBYjtBQUNBLE1BQU00SSxJQUFJLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLFdBQWYsRUFBNEIsZUFBNUIsRUFBNkMsS0FBN0MsRUFBb0QsVUFBcEQsQ0FBYjtBQUVBLE1BQU11TyxVQUFVLEdBQUcscUJBQU01UyxLQUFLLElBQzVCLGFBQU0wUyxRQUFOLENBQWUxUyxLQUFmLEVBQXNCLGVBQU8zRCxPQUE3QixFQUFzQyx1QkFBdEMsQ0FEaUIsQ0FBbkI7QUFJQSxNQUFNbVcsU0FBUyxHQUFHLHFCQUFNLENBQUN4UyxLQUFELEVBQVE7QUFBRWdELE9BQUY7QUFBU3RDO0FBQVQsQ0FBUixLQUE0QjtBQUNsRCxRQUFNSSxNQUFNLEdBQUcsV0FBS2dTLFdBQUwsQ0FBaUI5UCxLQUFqQixDQUFmOztBQUNBLFFBQU0rUCxRQUFRLEdBQUdqUyxNQUFNLENBQUMsQ0FBRCxDQUFOLEtBQWMsS0FBZCxHQUFzQixVQUF0QixHQUFtQ0EsTUFBTSxDQUFDLENBQUQsQ0FBMUQ7QUFFQSxTQUFPLHlCQUFZMFIsU0FBWixDQUNMeFMsS0FESyxFQUVMLGVBQU8zRCxPQUZGLEVBR0wsZUFISyxFQUlMLENBQ0csUUFBTzJHLEtBQU0sRUFEaEIsRUFFRyxhQUFZK1AsUUFBUyxFQUZ4QixFQUdHLFFBQU9yUyxJQUFLLEVBSGYsRUFJRXNDLEtBQUssQ0FBQy9ELE9BQU4sQ0FBYyxHQUFkLE1BQXVCLENBQUMsQ0FBeEIsR0FBNEIsaUJBQTVCLEdBQWdELEVBSmxELEVBS0UsR0FBRy9GLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTWtJLEtBQUssSUFBSyxTQUFRQSxLQUFNLEVBQTlCLEVBQWlDbEMsTUFBakMsQ0FMTCxFQU1FLEdBQUc1SCxDQUFDLENBQUM0QixHQUFGLENBQU1rWSxHQUFHLElBQUssT0FBTUEsR0FBSSxPQUFNaFEsS0FBTSxJQUFHZ1EsR0FBSSxFQUEzQyxFQUE4QzNPLElBQTlDLENBTkwsRUFPRXBELElBUEYsQ0FPTyxJQVBQLENBSkssQ0FBUDtBQWFELENBakJpQixDQUFsQjtBQW1CQSxNQUFNd08sT0FBTyxHQUFHLHFCQUFNLENBQUN6UCxLQUFELEVBQVFvSyxLQUFSLEtBQ3BCb0ksU0FBUyxDQUFDeFMsS0FBRCxFQUFRb0ssS0FBUixDQUFULENBQXdCbFEsSUFBeEIsQ0FDRWhCLENBQUMsQ0FBQ2daLElBQUYsQ0FDRSx5QkFBWTFPLFVBRGQsRUFFRXRLLENBQUMsQ0FBQytSLEtBQUYsQ0FBUSxVQUFSLEVBQXFCLE1BQUtiLEtBQUssQ0FBQ3BILEtBQU0sRUFBdEMsQ0FGRixDQURGLENBRGMsQ0FBaEI7O0FBU08sTUFBTStSLFlBQVksR0FBRyxXQUFLN0IsU0FBTCxDQUFlO0FBQ3pDN08sTUFEeUM7QUFFekM1SSxNQUZ5QztBQUd6Q21YLFlBSHlDO0FBSXpDSixXQUp5QztBQUt6Qy9DO0FBTHlDLENBQWYsQ0FBckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU11RixLQUFLLEdBQUc7QUFDWi9CLGFBQVcsMEJBREM7QUFFWkssaUJBQWUsa0NBRkg7QUFHWnlCLGNBQVksNEJBSEE7QUFJWjFCLGVBQWEsOEJBSkQ7QUFLWkYsZ0JBQWMsZ0NBTEY7QUFNWjJCLGNBQVksNEJBTkE7QUFPWmxCLGNBQVksNEJBUEE7QUFRWlIsa0JBQWdCLG9DQVJKO0FBU1pZLGdCQUFjO0FBVEYsQ0FBZDtBQVlBLE1BQU1pQixVQUFVLEdBQUcvYixDQUFDLENBQUN1RixNQUFGLENBQVN1VyxLQUFULENBQW5COztBQUVBLE1BQU14RixRQUFRLEdBQUcvVCxJQUFJLElBQUk7QUFDdkIsTUFBSTJPLEtBQUo7O0FBRUEsT0FBSyxJQUFJcUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3dJLFVBQVUsQ0FBQ2xVLE1BQS9CLEVBQXVDMEwsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQ3JDLFNBQUssR0FBRzZLLFVBQVUsQ0FBQ3hJLENBQUQsQ0FBVixDQUFjeEssS0FBZCxDQUFvQm1JLEtBQXBCLENBQTBCM08sSUFBMUIsQ0FBUjtBQUNBLFFBQUkyTyxLQUFKLEVBQVcsT0FBT2xSLENBQUMsQ0FBQytSLEtBQUYsQ0FBUSxPQUFSLEVBQWlCYixLQUFqQixFQUF3QjZLLFVBQVUsQ0FBQ3hJLENBQUQsQ0FBbEMsQ0FBUDtBQUNaOztBQUNELFNBQU8sSUFBUDtBQUNELENBUkQ7O0FBVUEsTUFBTXlJLGVBQWUsR0FBRyxxQkFBTSxDQUFDbFYsS0FBRCxFQUFRdkUsSUFBUixLQUFpQjtBQUM3QyxRQUFNZ0csSUFBSSxHQUFHK04sUUFBUSxDQUFDL1QsSUFBRCxDQUFyQjtBQUVBLE1BQUksQ0FBQ2dHLElBQUQsSUFBUyxDQUFDQSxJQUFJLENBQUNtUixVQUFuQixFQUErQixPQUFPLHVCQUFRLEVBQVIsQ0FBUDtBQUMvQixTQUFPblIsSUFBSSxDQUFDbVIsVUFBTCxDQUFnQjVTLEtBQWhCLEVBQXVCeUIsSUFBSSxDQUFDMkksS0FBNUIsQ0FBUDtBQUNELENBTHVCLENBQXhCO0FBT0EsTUFBTXFFLFlBQVksR0FBRyxxQkFBTSxDQUFDek8sS0FBRCxFQUFRdkUsSUFBUixLQUFpQjtBQUMxQyxRQUFNZ0csSUFBSSxHQUFHK04sUUFBUSxDQUFDL1QsSUFBRCxDQUFyQjtBQUVBLE1BQUksQ0FBQ2dHLElBQUwsRUFBVyxNQUFNLElBQUkwVCxLQUFKLENBQVcsNkJBQTRCMVosSUFBSyxFQUE1QyxDQUFOO0FBRVgsU0FBT2dHLElBQUksQ0FBQ2dPLE9BQUwsQ0FBYXpQLEtBQWIsRUFBb0J5QixJQUFJLENBQUMySSxLQUF6QixFQUFnQ2xRLElBQWhDLENBQXFDa2IsUUFBUSxJQUFJO0FBQ3RELFFBQUlwTixJQUFJLEdBQUdvTixRQUFYOztBQUVBLFFBQUkzVCxJQUFJLENBQUMySSxLQUFMLENBQVcxSixJQUFYLEtBQW9CLFNBQXhCLEVBQW1DO0FBQ2pDc0gsVUFBSSxHQUFHOU8sQ0FBQyxDQUFDK1IsS0FBRixDQUFRLE1BQVIsRUFBZ0J4SixJQUFJLENBQUNRLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQmhKLENBQUMsQ0FBQytSLEtBQUYsQ0FBUSxNQUFSLEVBQWdCakQsSUFBSSxDQUFDdEgsSUFBckIsRUFBMkJlLElBQUksQ0FBQzJJLEtBQWhDLENBQW5CLENBQWhCLEVBQTRFcEMsSUFBNUUsQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMQSxVQUFJLEdBQUc5TyxDQUFDLENBQUMrUixLQUFGLENBQVEsTUFBUixFQUFnQnhQLElBQWhCLEVBQXNCMlosUUFBdEIsQ0FBUDtBQUNEOztBQUVELFFBQUlwTixJQUFJLENBQUNuRCxXQUFMLElBQW9CLENBQUNtRCxJQUFJLENBQUMvQyxVQUE5QixFQUEwQztBQUN4QytDLFVBQUksR0FBRzlPLENBQUMsQ0FBQytSLEtBQUYsQ0FBUSxZQUFSLEVBQXVCLE1BQUtqRCxJQUFJLENBQUNuRCxXQUFZLFNBQTdDLEVBQXVEbUQsSUFBdkQsQ0FBUDtBQUNEOztBQUVELFdBQU9BLElBQVA7QUFDRCxHQWRNLENBQVA7QUFlRCxDQXBCb0IsQ0FBckI7QUFzQk8sTUFBTXFOLFdBQVcsR0FBRyxFQUN6QixHQUFHTCxLQURzQjtBQUV6QkEsT0FGeUI7QUFHekJ4RixVQUh5QjtBQUl6QjBGLGlCQUp5QjtBQUt6QnpHO0FBTHlCLENBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFUDs7QUFDQTs7Ozs7O0FBRUEsTUFBTTZHLFlBQVksR0FBR3BjLENBQUMsQ0FBQzJCLE9BQUYsQ0FDbkIzQixDQUFDLENBQUNxRixNQUFGLENBQVNyRixDQUFDLENBQUNzRixRQUFYLENBRG1CLEVBRW5CdEYsQ0FBQyxDQUFDMlIsTUFBRixDQUFTM1IsQ0FBQyxDQUFDc0YsUUFBWCxDQUZtQixFQUduQnRGLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTTVCLENBQUMsQ0FBQzZCLElBQVIsQ0FIbUIsRUFJbkI3QixDQUFDLENBQUM4QixLQUFGLENBQVEsR0FBUixDQUptQixFQUtuQjlCLENBQUMsQ0FBQ3FjLE9BTGlCLEVBTW5CcmMsQ0FBQyxDQUFDNkIsSUFOaUIsRUFPbkI3QixDQUFDLENBQUNnUyxTQUFGLENBQVksRUFBWixDQVBtQixDQUFyQjtBQVVBLE1BQU00SCxXQUFXLEdBQUc1WixDQUFDLENBQUMyQixPQUFGLENBQ2xCM0IsQ0FBQyxDQUFDdVIsTUFBRixDQUFTdlIsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLFFBQVAsQ0FBVCxFQUEyQnpGLENBQUMsQ0FBQ3NGLFFBQTdCLEVBQXVDdEYsQ0FBQyxDQUFDeVIsTUFBRixDQUFTLENBQUMsS0FBRCxDQUFULENBQXZDLENBRGtCLEVBRWxCMkssWUFGa0IsQ0FBcEI7O0FBS0EsTUFBTXBDLFNBQVMsR0FBR3RQLEdBQUcsSUFBSTFLLENBQUMsQ0FBQytSLEtBQUYsQ0FBUSxPQUFSLEVBQWlCLHlCQUFVckgsR0FBRyxDQUFDbkksSUFBZCxDQUFqQixFQUFzQ21JLEdBQXRDLENBQXpCOztBQUVPLE1BQU00UixJQUFJLEdBQUc7QUFBRUYsY0FBRjtBQUFnQnhDLGFBQWhCO0FBQTZCSTtBQUE3QixDQUFiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU03TyxJQUFJLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLFdBQWYsRUFBNEIsZUFBNUIsRUFBNkMsS0FBN0MsQ0FBYjs7QUFDQSxNQUFNb1IsY0FBYyxHQUFHcFMsSUFBSSxJQUFLLFNBQVFBLElBQUssRUFBN0M7O0FBQ0EsTUFBTTRRLGVBQWUsR0FBRzVRLElBQUksSUFBSyxTQUFRQSxJQUFLLFVBQTlDOztBQUVBLE1BQU1xUyxrQkFBa0IsR0FBR3hjLENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQUN1SyxPQUFELEVBQVVMLElBQVYsRUFBZ0JJLE1BQWhCLEtBQTJCO0FBQzVELE1BQUlwSixNQUFNLEdBQUcsQ0FBQ29KLE1BQU0sSUFBSSxFQUFYLENBQWI7O0FBQ0EsUUFBTTNILFNBQVMsR0FBRyxxQkFBVWxCLFFBQVYsQ0FBbUI2SSxNQUFuQixDQUFsQjs7QUFFQSxNQUFJLENBQUMzSCxTQUFTLENBQUMrSCxRQUFWLENBQW1CLEtBQW5CLENBQUwsRUFBZ0M7QUFDOUJRLFFBQUksQ0FBQ3ZKLEdBQUwsQ0FBU2tZLEdBQUcsSUFDVjNZLE1BQU0sQ0FBQzJHLElBQVAsQ0FBYSxPQUFNZ1MsR0FBSSxVQUFTdFAsT0FBUSxXQUFVTCxJQUFLLElBQUcyUCxHQUFJLEVBQTlELENBREY7QUFHRDs7QUFFRCxNQUFJM1csT0FBTyxHQUFHUCxTQUFTLENBQUMrSCxRQUFWLENBQW1CLFNBQW5CLENBQWQ7O0FBRUEsTUFBSSxDQUFDeEgsT0FBTCxFQUFjO0FBQ1poQyxVQUFNLENBQUMyRyxJQUFQLENBQWEsV0FBVSxlQUFPM0UsT0FBUSxFQUF0QztBQUNBQSxXQUFPLEdBQUcsZUFBT0EsT0FBakI7QUFDRDs7QUFFRCxNQUFJRixTQUFTLEdBQUdMLFNBQVMsQ0FBQytILFFBQVYsQ0FBbUIsV0FBbkIsQ0FBaEI7QUFFQSxNQUFJLENBQUMxSCxTQUFMLEVBQWdCOUIsTUFBTSxDQUFDMkcsSUFBUCxDQUFhLGFBQVkzRSxPQUFRLEVBQWpDO0FBRWhCLFNBQU9oQyxNQUFNLENBQUM0RyxJQUFQLENBQVksSUFBWixDQUFQO0FBQ0QsQ0F0QjBCLENBQTNCO0FBd0JBLE1BQU11UixTQUFTLEdBQUcscUJBQU0sQ0FBQ3hTLEtBQUQsRUFBUXRFLFFBQVIsRUFBa0IySCxJQUFsQixFQUF3Qm9QLEtBQXhCLEtBQ3RCLHlCQUFZRCxTQUFaLENBQXNCeFMsS0FBdEIsRUFBNkJ0RSxRQUE3QixFQUF1QytaLGNBQWMsQ0FBQ3BTLElBQUQsQ0FBckQsRUFBNkRvUCxLQUE3RCxFQUFvRXZZLElBQXBFLENBQ0V3YixrQkFBa0IsQ0FBQ2hhLFFBQUQsRUFBVzJILElBQVgsQ0FEcEIsQ0FEZ0IsQ0FBbEI7QUFNQSxNQUFNb00sT0FBTyxHQUFHLHFCQUFNLENBQUN6UCxLQUFELEVBQVF0RSxRQUFSLEVBQWtCMkgsSUFBbEIsRUFBd0JvUCxLQUF4QixLQUNwQkQsU0FBUyxDQUFDeFMsS0FBRCxFQUFRdEUsUUFBUixFQUFrQjJILElBQWxCLEVBQXdCb1AsS0FBeEIsQ0FBVCxDQUF3Q3ZZLElBQXhDLENBQTZDdUosTUFBTSxJQUNqRCx5QkFBWUQsVUFBWixDQUF1QkMsTUFBdkIsRUFBK0IvSCxRQUEvQixFQUF5QzJILElBQXpDLENBREYsQ0FEYyxDQUFoQjtBQU1BLE1BQU1zUyxnQkFBZ0IsR0FBR3pjLENBQUMsQ0FBQzJCLE9BQUYsQ0FDdkIzQixDQUFDLENBQUNxRixNQUFGLENBQVNyRixDQUFDLENBQUNzRixRQUFYLENBRHVCLEVBRXZCdEYsQ0FBQyxDQUFDNEIsR0FBRixDQUFNNUIsQ0FBQyxDQUFDK0IsT0FBRixDQUFVLFNBQVYsRUFBcUIsRUFBckIsQ0FBTixDQUZ1QixFQUd2Qi9CLENBQUMsQ0FBQzJSLE1BQUYsQ0FDRTNSLENBQUMsQ0FBQzJCLE9BQUYsQ0FDRTNCLENBQUMsQ0FBQ3lGLElBQUYsQ0FBTyxRQUFQLENBREYsRUFFRXpGLENBQUMsQ0FBQ2tSLEtBQUYsQ0FBUSxlQUFSLENBRkYsQ0FERixDQUh1QixFQVN2QmxSLENBQUMsQ0FBQzhDLElBVHFCLENBQXpCO0FBWUEsTUFBTTRaLGNBQWMsR0FBRyxxQkFBTSxDQUFDNVYsS0FBRCxFQUFRdEUsUUFBUixLQUMzQixhQUFNbWEsU0FBTixDQUFnQjdWLEtBQWhCLEVBQXVCdEUsUUFBdkIsRUFBaUN4QixJQUFqQyxDQUFzQ3liLGdCQUF0QyxDQURxQixDQUF2QjtBQUlPLE1BQU1HLFNBQVMsR0FBRztBQUN2QkwsZ0JBRHVCO0FBRXZCeEIsaUJBRnVCO0FBR3ZCMEIsa0JBSHVCO0FBSXZCQyxnQkFKdUI7QUFLdkJ2UixNQUx1QjtBQU12Qm1PLFdBTnVCO0FBT3ZCL0M7QUFQdUIsQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0RQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUtBOztBQUVPLE1BQU1zRyxPQUFPLEdBQUcsRUFDckIsR0FBRyx5QkFBWWYsS0FETTtBQUVyQmpILGFBQVcsMEJBRlU7QUFHckI0RSxhQUFXLDBCQUhVO0FBSXJCWixhQUFXLEVBQUUseUJBQVlBLFdBSko7QUFLckI3SCxZQUFVLEVBQUUseUJBQVlBLFVBTEg7QUFNckI1SixLQUFHLEVBQUUseUJBQVlBLEdBTkk7QUFPckJpUCxVQUFRLEVBQUUsMkJBQWFBLFFBUEY7QUFRckJDLFVBQVEsRUFBRSwyQkFBYUEsUUFSRjtBQVNyQndHLGNBQVksRUFBRSx5QkFBWXhHLFFBVEw7QUFVckIwRixpQkFBZSxFQUFFLHlCQUFZQSxlQVZSO0FBV3JCekcsY0FBWSxFQUFFLHlCQUFZQSxZQVhMO0FBWXJCa0IsY0FBWSxFQUFFLDJCQUFhQTtBQVpOLENBQWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0rQyxRQUFRLEdBQUd4WixDQUFDLENBQUNvSyxTQUFGLENBQVk7QUFDM0IyUyxXQUFTLEVBQUUsQ0FBQztBQUFFQyxVQUFNLEVBQUU7QUFBRXhhLGNBQVEsR0FBRyxlQUFPWSxLQUFwQjtBQUEyQitHO0FBQTNCO0FBQVYsR0FBRCxNQUFvRDtBQUM3RDhTLFdBQU8sRUFBRW5XLEtBQUssSUFBSSxhQUFNMFMsUUFBTixDQUFlMVMsS0FBZixFQUFzQnRFLFFBQXRCLEVBQWdDMkgsSUFBaEM7QUFEMkMsR0FBcEQ7QUFEZ0IsQ0FBWixDQUFqQjs7QUFNQSxNQUFNK1MsZ0JBQWdCLEdBQUcsQ0FBQzNhLElBQUQsRUFBT3lhLE1BQVAsS0FBa0I7QUFDekMsTUFBSSxDQUFDemEsSUFBTCxFQUFXO0FBQ1QsV0FBTztBQUNMMGEsYUFBTyxFQUFFLHFCQUFNamQsQ0FBQyxDQUFDeVIsTUFBRixDQUFTLHVCQUFRLEVBQVIsQ0FBVCxDQUFOLENBREo7QUFFTDBMLGFBQU8sRUFBRSxxQkFBTW5kLENBQUMsQ0FBQ3lSLE1BQUYsQ0FBUyx1QkFBUSxFQUFSLENBQVQsQ0FBTixDQUZKO0FBR0wyTCxXQUFLLEVBQUUscUJBQU1wZCxDQUFDLENBQUN5UixNQUFGLENBQVMsdUJBQVEscUJBQVluSCxVQUFaLENBQXVCLEVBQXZCLENBQVIsQ0FBVCxDQUFOLENBSEY7QUFJTDFCLFNBQUcsRUFBRSxxQkFBTTVJLENBQUMsQ0FBQ3lSLE1BQUYsQ0FBUyx1QkFBUSxFQUFSLENBQVQsQ0FBTjtBQUpBLEtBQVA7QUFNRDs7QUFFRCxRQUFNNEwsU0FBUyxHQUFHLHFCQUNoQixDQUFDdlcsS0FBRCxFQUFRekcsSUFBSSxHQUFHLEVBQWYsS0FBc0IsaUJBQVFpVyxRQUFSLENBQWlCeFAsS0FBakIsRUFBd0J2RSxJQUF4QixFQUE4QmxDLElBQTlCLENBRE4sRUFFZixPQUFNa0MsSUFBSyxFQUZJLENBQWxCO0FBS0EsU0FBTztBQUNMO0FBQ0EwYSxXQUFPLEVBQUVuVyxLQUFLLElBQUl3VyxjQUFjLENBQUN4VyxLQUFELEVBQVF2RSxJQUFSLEVBQWN5YSxNQUFkLENBRjNCO0FBR0xHLFdBQU8sRUFBRSxxQkFDUHJXLEtBQUssSUFBSSxpQkFBUWtWLGVBQVIsQ0FBd0JsVixLQUF4QixFQUErQnZFLElBQS9CLENBREYsRUFFTixXQUFVQSxJQUFLLEVBRlQsQ0FISjtBQU9MNmEsU0FBSyxFQUFFLHFCQUFNdFcsS0FBSyxJQUFJLGlCQUFReU8sWUFBUixDQUFxQnpPLEtBQXJCLEVBQTRCdkUsSUFBNUIsQ0FBZixDQVBGO0FBUUxxRyxPQUFHLEVBQUUscUJBQU0sQ0FBQzlCLEtBQUQsRUFBUXpHLElBQUksR0FBRyxFQUFmLEtBQ1RnZCxTQUFTLENBQUN2VyxLQUFELEVBQVE5RyxDQUFDLENBQUNvSyxTQUFGLENBQVkvSixJQUFaLEVBQWtCMmMsTUFBbEIsQ0FBUixDQUROO0FBUkEsR0FBUDtBQVlELENBM0JEOztBQTZCQSxNQUFNTSxjQUFjLEdBQUcsT0FBT3hXLEtBQVAsRUFBY3ZFLElBQWQsRUFBb0J5YSxNQUFwQixLQUErQjtBQUNwRCxRQUFNOUwsS0FBSyxHQUFHZ00sZ0JBQWdCLENBQUMzYSxJQUFELEVBQU95YSxNQUFQLENBQTlCO0FBQ0EsTUFBSSxDQUFDbE8sSUFBRCxFQUFPbEcsR0FBUCxJQUFjLE1BQU0rRyxPQUFPLENBQUMzSSxHQUFSLENBQVksQ0FDbENrSyxLQUFLLENBQUNrTSxLQUFOLENBQVl0VyxLQUFaLENBRGtDLEVBRWxDb0ssS0FBSyxDQUFDdEksR0FBTixDQUFVOUIsS0FBVixFQUFpQixFQUFqQixDQUZrQyxFQUdsQ29LLEtBQUssQ0FBQ2lNLE9BQU4sQ0FBY3JXLEtBQWQsQ0FIa0MsQ0FBWixDQUF4QjtBQU1BLE1BQUksQ0FBQ2dJLElBQUwsRUFBV0EsSUFBSSxHQUFHLHFCQUFZeEUsVUFBWixDQUF1QixFQUF2QixDQUFQOztBQUVYLFFBQU1pVCxVQUFVLEdBQUcsaUJBQVF2TSxVQUFSLENBQW1CcEksR0FBbkIsQ0FBbkI7O0FBQ0EsUUFBTSxDQUFDNFUsTUFBRCxJQUFXLE1BQU03TixPQUFPLENBQUMzSSxHQUFSLENBQVksQ0FDakMsYUFBTXlXLGNBQU4sQ0FBcUIzVyxLQUFyQixFQUE0QjtBQUMxQnlXLGNBRDBCO0FBRTFCdGEsYUFBUyxFQUFFNkwsSUFBSSxDQUFDN0wsU0FBTCxJQUFrQixlQUFPQSxTQUZWO0FBRzFCc04sVUFBTSxFQUFFLElBSGtCO0FBSTFCM0ssUUFBSSxFQUFFO0FBSm9CLEdBQTVCLENBRGlDLEVBT2pDLEdBQUc1RixDQUFDLENBQUM0QixHQUFGLENBQ0RTLEVBQUUsSUFBSSxhQUFNc1ksUUFBTixDQUFlN1QsS0FBZixFQUFzQnpFLEVBQXRCLENBREwsRUFFRHJDLENBQUMsQ0FBQ3VOLElBQUYsQ0FBTyxDQUFDdUIsSUFBSSxJQUFJQSxJQUFJLENBQUMzTCxPQUFkLEVBQXVCMkwsSUFBSSxJQUFJQSxJQUFJLENBQUMxTCxLQUFwQyxFQUEyQzBMLElBQUksSUFBSUEsSUFBSSxDQUFDN0wsU0FBeEQsQ0FBUCxDQUZDLENBUDhCLENBQVosQ0FBdkI7QUFZQSxRQUFNeWEsS0FBSyxHQUFHMWQsQ0FBQyxDQUFDMkIsT0FBRixDQUNaM0IsQ0FBQyxDQUFDZ0csT0FBRixDQUFVNEMsR0FBVixDQURZLEVBRVo1SSxDQUFDLENBQUMyUixNQUFGLENBQVMzUixDQUFDLENBQUNzRixRQUFYLENBRlksRUFHWnRGLENBQUMsQ0FBQ3VOLElBSFUsRUFJWnZOLENBQUMsQ0FBQzRCLEdBQUYsQ0FBTTVCLENBQUMsQ0FBQ2lGLE1BQUYsQ0FBUyxJQUFULEVBQWUsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUFmLENBQU4sQ0FKWSxFQUtadVksTUFMWSxDQUFkOztBQU9BLE1BQUlFLEtBQUssQ0FBQzdWLE1BQVYsRUFBa0I7QUFDaEIsVUFBTThWLE9BQU8sR0FBRyxpQkFBUTNNLFVBQVIsQ0FBbUIwTSxLQUFuQixDQUFoQjs7QUFFQSxVQUFNLGFBQU1ELGNBQU4sQ0FBcUIzVyxLQUFyQixFQUE0QjtBQUNoQ3lXLGdCQUFVLEVBQUVJLE9BRG9CO0FBRWhDMWEsZUFBUyxFQUFFNkwsSUFBSSxDQUFDN0wsU0FBTCxJQUFrQixlQUFPQSxTQUZKO0FBR2hDMkMsVUFBSSxFQUFFO0FBSDBCLEtBQTVCLENBQU47QUFLRDs7QUFFRCxNQUFJa0osSUFBSSxDQUFDbEQsU0FBVCxFQUFvQjtBQUNsQixVQUFNZ1MsUUFBUSxHQUFJLE1BQUs5TyxJQUFJLENBQUNsRCxTQUFVLE9BQXRDO0FBRUEsUUFBSWdTLFFBQVEsS0FBS3JiLElBQWpCLEVBQ0UsTUFBTSthLGNBQWMsQ0FBQ3hXLEtBQUQsRUFBUyxNQUFLZ0ksSUFBSSxDQUFDbEQsU0FBVSxPQUE3QixFQUFxQyxFQUFyQyxDQUFwQjtBQUNIOztBQUVELFNBQU85RSxLQUFLLENBQUMrVyxRQUFOLEVBQVA7QUFDRCxDQWhERDs7QUFrREEsTUFBTXJVLE9BQU8sR0FBRyxDQUFDO0FBQ2ZzVSxRQUFNLEVBQUVDLGFBQWEsR0FBRyxHQURUO0FBRWZDLFlBQVUsRUFBRUMsaUJBQWlCLEdBQUcsS0FGakI7QUFHZnpXLE1BQUksRUFBRTBXLFdBQVcsR0FBRyxLQUhMO0FBSWYsS0FBR0M7QUFKWSxJQUtiLEVBTFksTUFLSixFQUNWLEdBQUdBLElBRE87QUFFVnBCLFdBQVMsRUFBRSxDQUFDO0FBQ1ZDLFVBQU0sRUFBRTtBQUNOYyxZQUFNLEdBQUdDLGFBREg7QUFFTkMsZ0JBQVUsR0FBR0MsaUJBRlA7QUFHTnpXLFVBQUksR0FBRzBXO0FBSEQsS0FERTtBQU1WbFc7QUFOVSxHQUFELEtBT0xrVixnQkFBZ0IsQ0FBRSxJQUFHWSxNQUFPLElBQUdFLFVBQVcsSUFBR3hXLElBQUssRUFBbEMsRUFBcUNRLEtBQXJDO0FBVFosQ0FMSSxDQUFoQjs7QUFpQkEsTUFBTW9XLGFBQWEsR0FBRyxDQUFDO0FBQ3JCTixRQUFNLEVBQUVDLGFBQWEsR0FBRyxHQURIO0FBRXJCQyxZQUFVLEVBQUVDLGlCQUFpQixHQUFHLEtBRlg7QUFHckJ6VyxNQUFJLEVBQUUwVyxXQUFXLEdBQUcsTUFIQztBQUlyQixLQUFHQztBQUprQixJQUtuQixFQUxrQixNQUtWLEVBQ1YsR0FBR0EsSUFETztBQUVWcEIsV0FBUyxFQUFFLENBQUM7QUFDVkMsVUFBTSxFQUFFO0FBQ056QyxVQURNO0FBRU51RCxZQUFNLEdBQUdDLGFBRkg7QUFHTkMsZ0JBQVUsR0FBR0MsaUJBSFA7QUFJTnpXLFVBQUksR0FBRzBXO0FBSkQsS0FERTtBQU9WbFc7QUFQVSxHQUFELEtBU1RrVixnQkFBZ0IsQ0FDZCxxQkFBWWpELGNBQVosQ0FBMkJsUixLQUEzQixDQUFpQ0MsT0FBakMsQ0FBeUM7QUFDdkNILFdBQU8sRUFBRTBSLElBRDhCO0FBRXZDL1M7QUFGdUMsR0FBekMsQ0FEYyxFQUtkeEgsQ0FBQyxDQUFDK1IsS0FBRixDQUFRLE9BQVIsRUFBaUIsSUFBakIsRUFBdUIvSixLQUF2QixDQUxjO0FBWFIsQ0FMVSxDQUF0Qjs7QUF5QkEsTUFBTXFXLFlBQVksR0FBRyxDQUFDO0FBQ3BCbFUsTUFBSSxFQUFFbVUsV0FBVyxHQUFHLFNBREE7QUFFcEI5YixVQUFRLEVBQUUrYixlQUZVO0FBR3BCL1csTUFBSSxFQUFFMFcsV0FBVyxHQUFHLFNBSEE7QUFJcEIsS0FBR0M7QUFKaUIsSUFLbEIsRUFMaUIsTUFLVCxFQUNWLEdBQUdBLElBRE87QUFFVnBCLFdBQVMsRUFBRSxDQUFDO0FBQ1ZDLFVBQU0sRUFBRTtBQUNOeGEsY0FBUSxHQUFHK2IsZUFETDtBQUVOcFUsVUFBSSxHQUFHbVUsV0FGRDtBQUdOOVcsVUFBSSxHQUFHMFc7QUFIRCxLQURFO0FBTVZsVztBQU5VLEdBQUQsS0FRVGtWLGdCQUFnQixDQUNkLHFCQUFZdEIsWUFBWixDQUF5QjdTLEtBQXpCLENBQStCQyxPQUEvQixDQUF1QztBQUNyQ3hHLFlBQVEsRUFBRUEsUUFBUSxJQUFJLGVBQU9ZLEtBRFE7QUFFckMrRyxRQUZxQztBQUdyQzNDO0FBSHFDLEdBQXZDLENBRGMsRUFNZFEsS0FOYztBQVZSLENBTFMsQ0FBckI7O0FBeUJBLE1BQU13VyxrQkFBa0IsR0FBRyxDQUFDO0FBQzFCclUsTUFBSSxFQUFFbVUsV0FBVyxHQUFHLFNBRE07QUFFMUI5YixVQUFRLEVBQUUrYixlQUZnQjtBQUcxQi9XLE1BQUksRUFBRTBXLFdBQVcsR0FBRyxLQUhNO0FBSTFCLEtBQUdDO0FBSnVCLENBQUQsTUFLcEIsRUFDTCxHQUFHQSxJQURFO0FBRUxwQixXQUFTLEVBQUUsQ0FBQztBQUNWQyxVQUFNLEVBQUU7QUFDTnpDLFVBRE07QUFFTi9YLGNBQVEsR0FBRytiLGVBRkw7QUFHTnBVLFVBQUksR0FBR21VLFdBSEQ7QUFJTjlXLFVBQUksR0FBRzBXO0FBSkQsS0FERTtBQU9WbFc7QUFQVSxHQUFELEtBUUw7QUFDSixVQUFNeVcsU0FBUyxHQUFHLHFCQUFZN0MsWUFBWixDQUF5QjdTLEtBQXpCLENBQStCQyxPQUEvQixDQUF1QztBQUN2RHhHLGNBQVEsRUFBRUEsUUFBUSxJQUFJLGVBQU9ZLEtBRDBCO0FBRXZEK0csVUFGdUQ7QUFHdkQzQztBQUh1RCxLQUF2QyxDQUFsQjs7QUFLQSxVQUFNa1gsV0FBVyxHQUFHLHFCQUFZekUsY0FBWixDQUEyQmxSLEtBQTNCLENBQWlDQyxPQUFqQyxDQUF5QztBQUMzREgsYUFBTyxFQUFFMFIsSUFEa0Q7QUFFM0QvUztBQUYyRCxLQUF6QyxDQUFwQjs7QUFLQSxXQUFPO0FBQ0w0VixXQUFLLEVBQUVwVixLQUFLLENBQ1ZsQixLQUFLLElBQUksaUJBQVF5TyxZQUFSLENBQXFCek8sS0FBckIsRUFBNEIyWCxTQUE1QixFQUF1Q3pXLEtBQXZDLENBREMsRUFFVCxRQUFPeVcsU0FBVSxFQUZSLENBRFA7QUFLTDdWLFNBQUcsRUFBRVosS0FBSyxDQUNSbEIsS0FBSyxJQUFJLGlCQUFRd1AsUUFBUixDQUFpQnhQLEtBQWpCLEVBQXdCNFgsV0FBeEIsRUFBcUMxVyxLQUFyQyxDQURELEVBRVIwVyxXQUZRLENBTEw7QUFTTHpCLGFBQU8sRUFBRW5XLEtBQUssSUFBSXdXLGNBQWMsQ0FBQ3hXLEtBQUQsRUFBUTRYLFdBQVIsRUFBcUIxVyxLQUFyQjtBQVQzQixLQUFQO0FBV0Q7QUFoQ0ksQ0FMb0IsQ0FBM0I7O0FBd0NBLE1BQU0yVyxPQUFPLEdBQUcsQ0FBQztBQUNmblgsTUFBSSxFQUFFMFcsV0FBVyxHQUFHLEtBREw7QUFFZjNWLE1BQUksRUFBRXFXLFdBQVcsR0FBRyxVQUZMO0FBR2YsS0FBR1Q7QUFIWSxJQUliLEVBSlksTUFJSixFQUNWLEdBQUdBLElBRE87QUFFVnBCLFdBQVMsRUFBRSxDQUFDO0FBQ1ZDLFVBQU0sRUFBRTtBQUFFeGEsY0FBRjtBQUFZK0YsVUFBSSxHQUFHcVcsV0FBbkI7QUFBZ0NwWCxVQUFJLEdBQUcwVztBQUF2QyxLQURFO0FBRVZsVztBQUZVLEdBQUQsS0FJVGtWLGdCQUFnQixDQUNkLHFCQUFZcEMsY0FBWixDQUEyQi9SLEtBQTNCLENBQWlDQyxPQUFqQyxDQUF5QztBQUFFeEcsWUFBRjtBQUFZK0YsUUFBWjtBQUFrQmY7QUFBbEIsR0FBekMsQ0FEYyxFQUVkUSxLQUZjO0FBTlIsQ0FKSSxDQUFoQjs7QUFnQkEsTUFBTTZXLEtBQUssR0FBRyxDQUFDO0FBQ2JyWCxNQUFJLEVBQUUwVyxXQUFXLEdBQUcsS0FEUDtBQUViM1YsTUFBSSxFQUFFcVcsV0FBVyxHQUFHLFVBRlA7QUFHYixLQUFHVDtBQUhVLElBSVgsRUFKVSxNQUlGLEVBQ1YsR0FBR0EsSUFETztBQUVWcEIsV0FBUyxFQUFFLENBQUM7QUFDVnZhLFlBRFU7QUFFVndhLFVBQU0sRUFBRTtBQUFFelUsVUFBSSxHQUFHcVcsV0FBVDtBQUFzQnBYLFVBQUksR0FBRzBXO0FBQTdCLEtBRkU7QUFHVmxXO0FBSFUsR0FBRCxLQUtUa1YsZ0JBQWdCLENBQ2QscUJBQVl4QyxZQUFaLENBQXlCM1IsS0FBekIsQ0FBK0JDLE9BQS9CLENBQXVDO0FBQUV4RyxZQUFGO0FBQVkrRixRQUFaO0FBQWtCZjtBQUFsQixHQUF2QyxDQURjLEVBRWRRLEtBRmM7QUFQUixDQUpFLENBQWQ7O0FBaUJPLE1BQU04VyxJQUFJLEdBQUc7QUFDbEI1QixrQkFEa0I7QUFFbEJJLGdCQUZrQjtBQUdsQjlELFVBSGtCO0FBSWxCNEUsZUFKa0I7QUFLbEI1VSxTQUxrQjtBQU1sQjZVLGNBTmtCO0FBT2xCRyxvQkFQa0I7QUFRbEJHLFNBUmtCO0FBU2xCRTtBQVRrQixDQUFiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RPUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFKQTtBQU1BLFNBQVNFLElBQVQsQ0FBY2xaLEdBQWQsRUFBbUJtWixNQUFNLEdBQUcsRUFBNUIsRUFBZ0M7QUFDOUIsUUFBTTtBQUFFQyxTQUFGO0FBQVNDLHFCQUFUO0FBQTRCQyxTQUE1QjtBQUFtQ0MsZ0JBQW5DO0FBQWlEQyxXQUFqRDtBQUEwRCxPQUFHbEI7QUFBN0QsTUFDSmEsTUFBTSxJQUFJLEVBRFo7QUFFQSxRQUFNOWUsSUFBSSxHQUFHO0FBQUU4ZTtBQUFGLEdBQWI7O0FBRUEsTUFBSSxDQUFDRyxLQUFMLEVBQVk7QUFDVixVQUFNRyxHQUFHLEdBQUc7QUFBRUYsa0JBQVksRUFBRSxDQUFDLENBQUNBLFlBQWxCO0FBQWdDRyxZQUFNLEVBQUUsQ0FBQyxDQUFDRixPQUExQztBQUFtRCxTQUFHbEI7QUFBdEQsS0FBWjtBQUVBLFFBQUlrQixPQUFKLEVBQWFDLEdBQUcsQ0FBQ0YsWUFBSixHQUFtQixLQUFuQjtBQUNiLFFBQUksQ0FBQ0YsaUJBQUwsRUFBd0JyWixHQUFHLENBQUMyWixFQUFKLENBQU8sS0FBUCxFQUFjLHVCQUFXQyxZQUFYLENBQXdCdmYsSUFBeEIsQ0FBZDtBQUN4QixRQUFJb2YsR0FBRyxDQUFDSSxPQUFSLEVBQWlCSixHQUFHLENBQUNLLEtBQUosR0FBWUwsR0FBRyxDQUFDSSxPQUFKLENBQVlKLEdBQVosQ0FBWixDQUxQLENBS3FDOztBQUMvQ3BmLFFBQUksQ0FBQ00sR0FBTCxHQUFXcUYsR0FBRyxDQUFDeVosR0FBRCxDQUFkO0FBQ0EsUUFBSUEsR0FBRyxDQUFDRixZQUFSLEVBQXNCbGYsSUFBSSxDQUFDTSxHQUFMLENBQVNnZixFQUFULENBQVksb0JBQVosRUFBa0NJLENBQUMsSUFBSUEsQ0FBQyxDQUFDQyxLQUFGLENBQVEsRUFBUixDQUF2Qzs7QUFDdEIsUUFBSVosS0FBSixFQUFXO0FBQ1QsWUFBTWEsU0FBUyxHQUFHLE1BQU01ZixJQUFJLENBQUNNLEdBQUwsQ0FBU3VmLENBQVQsQ0FBV1AsRUFBWCxDQUFjLEtBQWQsRUFBcUI7QUFBRVAsYUFBSyxFQUFFO0FBQVQsT0FBckIsQ0FBeEI7O0FBRUFhLGVBQVM7QUFDVjtBQUNGOztBQUVENWYsTUFBSSxDQUFDOFUsUUFBTCxHQUFnQjNVLElBQUksSUFBSSxhQUFNMmYsV0FBTixDQUFrQjlmLElBQWxCLEVBQXdCRyxJQUF4QixDQUF4Qjs7QUFDQUgsTUFBSSxDQUFDcUIsT0FBTCxHQUFlLCtCQUFlQSxPQUFmLENBQXVCckIsSUFBdkIsQ0FBZjtBQUNBQSxNQUFJLENBQUNILE1BQUwsR0FBYywrQkFBZUEsTUFBZixDQUFzQkcsSUFBdEIsQ0FBZDtBQUNBQSxNQUFJLENBQUNhLEtBQUwsR0FBYSwrQkFBZUEsS0FBZixDQUFxQmIsSUFBckIsQ0FBYjs7QUFDQUEsTUFBSSxDQUFDbUIsTUFBTCxHQUFjLE1BQU0sK0JBQWVBLE1BQWYsQ0FBc0JuQixJQUF0QixDQUFwQjs7QUFDQUEsTUFBSSxDQUFDb0IsVUFBTCxHQUFrQixNQUFNLCtCQUFlQSxVQUFmLENBQTBCcEIsSUFBMUIsQ0FBeEI7O0FBQ0FBLE1BQUksQ0FBQytmLE1BQUwsR0FBYyxhQUFNQSxNQUFOLENBQWEvZixJQUFiLENBQWQ7QUFDQUEsTUFBSSxDQUFDZ2dCLE9BQUwsR0FBZSxhQUFNQSxPQUFOLENBQWNoZ0IsSUFBZCxDQUFmO0FBQ0FBLE1BQUksQ0FBQ2lnQixJQUFMLEdBQVksYUFBTUEsSUFBTixDQUFXamdCLElBQVgsQ0FBWjtBQUNBQSxNQUFJLENBQUNrZ0IsU0FBTCxHQUFpQixhQUFNQSxTQUFOLENBQWdCbGdCLElBQWhCLENBQWpCO0FBQ0FBLE1BQUksQ0FBQ21nQixJQUFMLEdBQVksYUFBTUEsSUFBTixDQUFXbmdCLElBQVgsQ0FBWjtBQUNBQSxNQUFJLENBQUNvZ0IsT0FBTDtBQUNBLFNBQU9wZ0IsSUFBUDtBQUNEOztBQUVNLE1BQU1xZ0IsSUFBSSxHQUFHO0FBQ2xCeEI7QUFEa0IsQ0FBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q1A7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNeUIsWUFBWSxHQUFHLHVCQUFRLElBQVIsQ0FBckI7QUFDQSxNQUFNQyxXQUFXLEdBQUd6Z0IsQ0FBQyxDQUFDbUMsTUFBRixDQUFTbkMsQ0FBQyxDQUFDaVosS0FBWCxFQUFrQixFQUFsQixDQUFwQjs7QUFFQSxNQUFNeUgsVUFBVSxHQUFHMUQsTUFBTSxJQUFJO0FBQzNCLFFBQU07QUFBRXBWLFVBQU0sR0FBRyxDQUFDLEtBQUQ7QUFBWCxNQUF1Qm9WLE1BQU0sSUFBSSxFQUF2QztBQUNBLFFBQU0yRCxJQUFJLEdBQUczZ0IsQ0FBQyxDQUFDaUMsTUFBRixDQUFTLEdBQVQsRUFBYyxNQUFkLEVBQXNCK2EsTUFBdEIsS0FBaUMsR0FBOUM7QUFDQSxRQUFNNEQsVUFBVSxHQUFHLEVBQW5CO0FBQ0EsUUFBTUMsTUFBTSxHQUFHLE9BQU8sRUFBUCxHQUFZLEVBQVosR0FBaUIsRUFBaEM7QUFDQSxRQUFNQyxLQUFLLEdBQUcsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEtBQXVCSCxNQUFNLEdBQUc3VCxRQUFRLENBQUMyVCxJQUFELEVBQU8sRUFBUCxDQUF0RDs7QUFFQSxPQUFLLElBQUlwTixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJb04sSUFBSSxHQUFHLENBQTVCLEVBQStCcE4sQ0FBQyxFQUFoQyxFQUNFcU4sVUFBVSxDQUFDOVksSUFBWCxDQUFnQixnQkFBU21aLE1BQVQsQ0FBZ0JILEtBQUssR0FBR3ZOLENBQUMsR0FBR3NOLE1BQTVCLENBQWhCOztBQUNGLFNBQU9LLE1BQU0sQ0FBQ3BlLElBQVAsQ0FDTDhFLE1BQU0sQ0FBQ3pGLE1BQVAsQ0FDRSxDQUFDaEIsTUFBRCxFQUFTZ2dCLFNBQVQsS0FDRVAsVUFBVSxDQUFDemUsTUFBWCxDQUFrQixDQUFDa0UsR0FBRCxFQUFNK2EsRUFBTixLQUFhO0FBQzdCL2EsT0FBRyxDQUFFLEdBQUUscUJBQVU1QyxNQUFPLFdBQVUwZCxTQUFVLFNBQVFDLEVBQUcsRUFBcEQsQ0FBSCxHQUE0RCxJQUE1RDtBQUNBLFdBQU8vYSxHQUFQO0FBQ0QsR0FIRCxFQUdHbEYsTUFISCxDQUZKLEVBTUUsRUFORixDQURLLENBQVA7QUFVRCxDQW5CRDs7QUFxQkEsTUFBTWtnQixXQUFXLEdBQUcscUJBQU0sQ0FBQ3ZhLEtBQUQsRUFBUWtXLE1BQVIsS0FBbUI7QUFDM0MsUUFBTXNFLE1BQU0sR0FBR1osVUFBVSxDQUFDLEVBQUUsR0FBRzFELE1BQUw7QUFBYXBWLFVBQU0sRUFBRSxDQUFDb1YsTUFBTSxDQUFDbFQsS0FBUjtBQUFyQixHQUFELENBQXpCO0FBQ0EsTUFBSS9DLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSXdhLE9BQU8sR0FBRyxxQkFBVTVkLFlBQXhCOztBQUVBLE1BQUlxWixNQUFNLENBQUN4VixJQUFQLEtBQWdCLEtBQXBCLEVBQTJCO0FBQ3pCK1osV0FBTyxHQUFHLHFCQUFVNWQsWUFBcEI7QUFDRCxHQUZELE1BRU87QUFDTCxRQUFJcVosTUFBTSxDQUFDeFYsSUFBUCxLQUFnQixLQUFwQixFQUEyQitaLE9BQU8sR0FBR0EsT0FBTyxHQUFHLENBQXBCO0FBQzNCLFFBQUl2RSxNQUFNLENBQUNsVCxLQUFQLEtBQWlCLEtBQXJCLEVBQTRCeVgsT0FBTyxHQUFHQSxPQUFPLEdBQUcsQ0FBcEI7QUFDN0I7O0FBRUQsUUFBTUMsU0FBUyxHQUFHLE1BQU07QUFDdEIsVUFBTUMsU0FBUyxHQUFHSCxNQUFNLENBQUN0TixHQUFQLEVBQWxCO0FBRUEsUUFBSWpOLEtBQUssQ0FBQ2MsTUFBTixHQUFlMFosT0FBZixJQUEwQixDQUFDRSxTQUEvQixFQUEwQyxPQUFPLHVCQUFRMWEsS0FBUixDQUFQO0FBQzFDLFdBQU9ELEtBQUssQ0FDVE0sR0FESSxDQUNBcWEsU0FEQSxFQUVKMWEsS0FGSSxHQUdKL0YsSUFISSxDQUdDMGdCLElBQUksSUFBSTtBQUNaM2EsV0FBSyxHQUFHLENBQUMsR0FBR0EsS0FBSixFQUFXLEdBQUcyYSxJQUFkLENBQVI7QUFDQSxhQUFPRixTQUFTLEVBQWhCO0FBQ0QsS0FOSSxDQUFQO0FBT0QsR0FYRDs7QUFhQSxTQUFPQSxTQUFTLEVBQWhCO0FBQ0QsQ0ExQm1CLENBQXBCO0FBNEJBLE1BQU1HLFlBQVksR0FBRyxxQkFBTSxDQUFDN2EsS0FBRCxFQUFRO0FBQUUrQztBQUFGLENBQVIsS0FDekIvQyxLQUFLLENBQUNNLEdBQU4sQ0FBVSxlQUFPd2EsTUFBUCxDQUFjN1ksS0FBZCxDQUFvQkMsT0FBcEIsQ0FBNEI7QUFBRTZZLFlBQVUsRUFBRWhZO0FBQWQsQ0FBNUIsQ0FBVixFQUErRDlDLEtBQS9ELEVBRG1CLENBQXJCO0FBSUEsTUFBTSthLFlBQVksR0FBRyxxQkFBTSxDQUFDaGIsS0FBRCxFQUFRa1csTUFBUixLQUN6QixtQkFBSSxDQUNGQSxNQUFNLENBQUN6VSxJQUFQLElBQWV5VSxNQUFNLENBQUN6VSxJQUFQLEtBQWdCLFdBQS9CLElBQThDeVUsTUFBTSxDQUFDelUsSUFBUCxLQUFnQixVQUE5RCxHQUNJLHVCQUFRLEVBQVIsQ0FESixHQUVJekIsS0FBSyxDQUNGTSxHQURILENBQ1EsSUFBRzRWLE1BQU0sQ0FBQ3hhLFFBQVMsRUFEM0IsRUFFRzRFLEdBRkgsQ0FFTyxhQUZQLEVBR0dMLEtBSEgsRUFIRixFQU9GaVcsTUFBTSxDQUFDelUsSUFBUCxJQUNBeVUsTUFBTSxDQUFDelUsSUFBUCxLQUFnQixVQURoQixJQUVBeVUsTUFBTSxDQUFDelUsSUFBUCxLQUFnQixVQUZoQixJQUdBeVUsTUFBTSxDQUFDelUsSUFBUCxLQUFnQixVQUhoQixHQUlJLHVCQUFRLEVBQVIsQ0FKSixHQUtJekIsS0FBSyxDQUNGTSxHQURILENBQ1EsSUFBRzRWLE1BQU0sQ0FBQ3hhLFFBQVMsRUFEM0IsRUFFRzRFLEdBRkgsQ0FFTyxVQUZQLEVBR0dMLEtBSEgsRUFaRixDQUFKLEVBZ0JHL0YsSUFoQkgsQ0FnQlEsQ0FBQyxDQUFDK2dCLFdBQUQsRUFBY3pLLFFBQWQsQ0FBRCxLQUE2Qm1KLFdBQVcsQ0FBQyxDQUFDc0IsV0FBRCxFQUFjekssUUFBZCxDQUFELENBaEJoRCxDQURtQixDQUFyQjtBQW9CQSxNQUFNMEssVUFBVSxHQUFHLHFCQUNqQixDQUFDbGIsS0FBRCxFQUFROUIsSUFBUixLQUFpQjhCLEtBQUssQ0FBQ00sR0FBTixDQUFVcEMsSUFBVixFQUFnQmhFLElBQWhCLENBQXFCLHlCQUFZd1IsU0FBakMsQ0FEQSxFQUVqQixZQUZpQixDQUFuQjtBQUtBLE1BQU15UCxhQUFhLEdBQUcscUJBQU0sQ0FBQ25iLEtBQUQsRUFBUTtBQUFFMEMsU0FBRjtBQUFXaEMsTUFBWDtBQUFpQnJFO0FBQWpCLENBQVIsS0FDMUI2ZSxVQUFVLENBQUNsYixLQUFELEVBQVMsR0FBRSxxQkFBVXJELE1BQU8sR0FBRStGLE9BQVEsSUFBR2hDLElBQUssS0FBSXJFLE9BQVEsR0FBMUQsQ0FBVixDQUF3RW5DLElBQXhFLENBQ0VoQixDQUFDLENBQUMyQixPQUFGLENBQ0UzQixDQUFDLENBQUM0QixHQUFGLENBQU1pSCxPQUFPLElBQUksZUFBT0MsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSDtBQUFGLENBQTNCLENBQWpCLENBREYsRUFFRTdJLENBQUMsQ0FBQzJSLE1BQUYsQ0FBUzNSLENBQUMsQ0FBQ3NGLFFBQVgsQ0FGRixDQURGLENBRG9CLENBQXRCO0FBU0EsTUFBTStELGVBQWUsR0FBRyxxQkFDdEIsQ0FBQ3ZDLEtBQUQsRUFBUTtBQUFFd0MsbUJBQUY7QUFBcUJmLE1BQUksR0FBRyxVQUE1QjtBQUF3QyxLQUFHeVU7QUFBM0MsQ0FBUixLQUNFaUYsYUFBYSxDQUFDbmIsS0FBRCxFQUFRO0FBQ25CMEMsU0FBTyxFQUFHLFNBQVFGLGlCQUFrQixJQUFHZixJQUFLLEVBRHpCO0FBRW5CZixNQUFJLEVBQUUsS0FGYTtBQUduQixLQUFHd1Y7QUFIZ0IsQ0FBUixDQUFiLENBSUdoYyxJQUpILENBSVFraEIsYUFBYSxJQUNuQixtQkFDRUEsYUFBYSxDQUFDdGdCLEdBQWQsQ0FBa0J1Z0IsWUFBWSxJQUM1QnJiLEtBQUssQ0FBQ00sR0FBTixDQUFXLEdBQUUrYSxZQUFhLFdBQTFCLEVBQXNDcGIsS0FBdEMsRUFERixDQURGLEVBSUUvRixJQUpGLENBSU95ZixXQUpQLENBTEYsQ0FGb0IsQ0FBeEI7QUFlQSxNQUFNMkIsZ0JBQWdCLEdBQUcscUJBQU0sQ0FBQ3RiLEtBQUQsRUFBUWtXLE1BQVIsS0FDN0JsVyxLQUFLLENBQ0ZNLEdBREgsQ0FFSSxlQUFPaWIsZ0JBQVAsQ0FBd0J0WixLQUF4QixDQUE4QkMsT0FBOUIsQ0FBc0M7QUFBRUgsU0FBTyxFQUFFbVUsTUFBTSxDQUFDc0Y7QUFBbEIsQ0FBdEMsQ0FGSixFQUlHdmIsS0FKSCxDQUtJL0csQ0FBQyxDQUFDdWlCLE9BQUYsQ0FBVSxlQUFPelosS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxTQUFPLEVBQUVtVSxNQUFNLENBQUNzRjtBQUFsQixDQUEzQixDQUFWLENBTEosQ0FEdUIsQ0FBekI7QUFVQSxNQUFNL1QsS0FBSyxHQUFHLHFCQUFNLENBQUN6SCxLQUFELEVBQVF3SixTQUFSLEtBQ2xCeEosS0FBSyxDQUFDTSxHQUFOLENBQVVrSixTQUFWLEVBQXFCdFAsSUFBckIsQ0FBMEI0WixJQUFJLElBQUk7QUFDaEMsTUFBSSxDQUFDQSxJQUFELElBQVMsQ0FBQ0EsSUFBSSxDQUFDdlksRUFBbkIsRUFBdUIsT0FBTyxJQUFQO0FBQ3ZCLFFBQU1sQixNQUFNLEdBQUc7QUFBRWtCLE1BQUUsRUFBRXVZLElBQUksQ0FBQ3ZZLEVBQVg7QUFBZUksYUFBUyxFQUFFQyxVQUFVLENBQUNrWSxJQUFJLENBQUNuWSxTQUFOLEVBQWlCLEVBQWpCO0FBQXBDLEdBQWY7QUFDQSxRQUFNK2YsV0FBVyxHQUFHeGlCLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLFNBQUQsRUFBWSxHQUFaLENBQVAsRUFBeUJxWSxJQUF6QixDQUFwQjtBQUNBLFFBQU02SCxNQUFNLEdBQUd6aUIsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsSUFBRCxFQUFPLEdBQVAsQ0FBUCxFQUFvQnFZLElBQXBCLENBQWY7QUFDQSxRQUFNTCxJQUFJLEdBQUdrSSxNQUFNLEdBQUcsZUFBTzNaLEtBQVAsQ0FBYUMsS0FBYixDQUFtQm1JLEtBQW5CLENBQXlCdVIsTUFBekIsRUFBaUNDLE9BQXBDLEdBQThDLElBQWpFO0FBQ0EsUUFBTUMsU0FBUyxHQUFHSCxXQUFXLEdBQ3pCLGVBQU8xWixLQUFQLENBQWFDLEtBQWIsQ0FBbUJtSSxLQUFuQixDQUF5QnNSLFdBQXpCLEVBQXNDRSxPQURiLEdBRXpCLElBRko7QUFJQSxNQUFJbkksSUFBSixFQUFVcFosTUFBTSxDQUFDb1osSUFBUCxHQUFjQSxJQUFkO0FBQ1YsTUFBSW9JLFNBQUosRUFBZXhoQixNQUFNLENBQUN3aEIsU0FBUCxHQUFtQkEsU0FBbkI7QUFDZixTQUFPeGhCLE1BQVA7QUFDRCxDQWJELENBRFksQ0FBZDs7QUFpQkEsTUFBTXloQixVQUFVLEdBQUcsQ0FBQ0MsV0FBRCxFQUFjQyxNQUFkLEVBQXNCQyxNQUF0QixFQUE4QkMsT0FBTyxHQUFHdkMsV0FBeEMsS0FDakIscUJBQU0sQ0FBQzNaLEtBQUQsRUFBUWtXLE1BQVIsS0FBbUI7QUFDdkIsUUFBTW5MLEtBQUssR0FBRzdSLENBQUMsQ0FBQ3lGLElBQUYsQ0FBT3FkLE1BQVAsRUFBZTlGLE1BQWYsQ0FBZDtBQUVBLE1BQUloZCxDQUFDLENBQUNxUyxLQUFGLENBQVFSLEtBQVIsQ0FBSixFQUFvQixPQUFPMk8sWUFBUDtBQUNwQixTQUFPLG1CQUNMeGdCLENBQUMsQ0FBQzRCLEdBQUYsQ0FDRTJCLEdBQUcsSUFBSXNmLFdBQVcsQ0FBQy9iLEtBQUQsRUFBUSxFQUFFLEdBQUdrVyxNQUFMO0FBQWEsS0FBQytGLE1BQUQsR0FBVXhmO0FBQXZCLEdBQVIsQ0FEcEIsRUFFRXZELENBQUMsQ0FBQ2lDLE1BQUYsQ0FBUyxFQUFULEVBQWE2Z0IsTUFBYixFQUFxQjlGLE1BQXJCLENBRkYsQ0FESyxFQUtMaGMsSUFMSyxDQUtBZ2lCLE9BTEEsQ0FBUDtBQU1ELENBVkQsQ0FERjs7QUFhQSxNQUFNL2EsVUFBVSxHQUFHMmEsVUFBVSxDQUFDdkIsV0FBRCxFQUFjLFFBQWQsRUFBd0IsT0FBeEIsQ0FBN0I7QUFDQSxNQUFNalosV0FBVyxHQUFHd2EsVUFBVSxDQUFDakIsWUFBRCxFQUFlLFNBQWYsRUFBMEIsUUFBMUIsQ0FBOUI7QUFDQSxNQUFNblosV0FBVyxHQUFHb2EsVUFBVSxDQUFDZCxZQUFELEVBQWUsV0FBZixFQUE0QixVQUE1QixDQUE5QjtBQUNBLE1BQU0zWSxlQUFlLEdBQUd5WixVQUFVLENBQ2hDUixnQkFEZ0MsRUFFaEMsZUFGZ0MsRUFHaEMsY0FIZ0MsQ0FBbEM7O0FBTUEsTUFBTWEsa0JBQWtCLEdBQUduYyxLQUFLLElBQUlDLEtBQUssSUFDdkMsbUJBQ0VBLEtBQUssQ0FDRjRLLE1BREgsQ0FDVXZCLENBQUMsSUFBSSxDQUFDLENBQUNBLENBRGpCLEVBRUd4TyxHQUZILENBRU9vRCxJQUFJLElBQ1A4QixLQUFLLENBQ0ZNLEdBREgsQ0FDT3BDLElBRFAsRUFFR29DLEdBRkgsQ0FFTyxNQUZQLEVBR0dwRyxJQUhILENBR1FvUCxDQUFDLElBQUlBLENBSGIsQ0FISixDQURGLENBREY7O0FBWUEsTUFBTXpILE9BQU8sR0FBRyxxQkFBTSxDQUFDN0IsS0FBRCxFQUFRd0IsU0FBUixFQUFtQjRhLGNBQWMsR0FBRyxLQUFwQyxLQUNwQixtQkFBSSxDQUNGMWEsV0FBVyxDQUFDMUIsS0FBRCxFQUFRO0FBQ2pCeUIsTUFBSSxFQUFFLFVBRFc7QUFFakJEO0FBRmlCLENBQVIsQ0FBWCxDQUlHdEgsSUFKSCxDQUlRaWlCLGtCQUFrQixDQUFDbmMsS0FBRCxDQUoxQixFQUtHOUYsSUFMSCxDQU1JaEIsQ0FBQyxDQUFDMkIsT0FBRixDQUNFM0IsQ0FBQyxDQUFDNEIsR0FBRixDQUFNc2hCLGNBQWMsR0FBR2xqQixDQUFDLENBQUN5RixJQUFGLENBQU8sTUFBUCxDQUFILEdBQW9CekYsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLFdBQVAsQ0FBeEMsQ0FERixFQUVFekYsQ0FBQyxDQUFDMlIsTUFBRixDQUFTM1IsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLFdBQVAsQ0FBVCxDQUZGLENBTkosQ0FERSxFQVlGK0MsV0FBVyxDQUFDMUIsS0FBRCxFQUFRO0FBQ2pCeUIsTUFBSSxFQUFFLFdBRFc7QUFFakJEO0FBRmlCLENBQVIsQ0FBWCxDQUdHdEgsSUFISCxDQUdRaEIsQ0FBQyxDQUFDNEIsR0FBRixDQUFNb0QsSUFBSSxJQUFJLGVBQU84RCxLQUFQLENBQWFDLEtBQWIsQ0FBbUJtSSxLQUFuQixDQUF5QmxNLElBQXpCLEVBQStCNkQsT0FBN0MsQ0FIUixDQVpFLENBQUosRUFnQkc3SCxJQWhCSCxDQWdCUSxDQUFDLENBQUNtaUIsSUFBRCxFQUFPQyxJQUFQLENBQUQsS0FBa0JwakIsQ0FBQyxDQUFDdU4sSUFBRixDQUFPLENBQUMsR0FBRzRWLElBQUosRUFBVSxHQUFHQyxJQUFiLENBQVAsQ0FoQjFCLENBRGMsQ0FBaEI7QUFvQkEsTUFBTUMsV0FBVyxHQUFHLHFCQUNsQixDQUFDdmMsS0FBRCxFQUFRN0QsU0FBUixFQUFtQjRGLE9BQW5CLEtBQ0U1RixTQUFTLElBQUk0RixPQUFiLEdBQ0kvQixLQUFLLENBQ0ZNLEdBREgsQ0FDTyxlQUFPb08sZUFBUCxDQUF1QnpNLEtBQXZCLENBQTZCQyxPQUE3QixDQUFxQztBQUFFSCxTQUFGO0FBQVc1RjtBQUFYLENBQXJDLENBRFAsRUFFR2pDLElBRkgsRUFESixHQUlJLHdCQU5ZLEVBT2xCLGFBUGtCLENBQXBCO0FBVUEsTUFBTWtCLFNBQVMsR0FBRyxxQkFBTSxDQUFDNEUsS0FBRCxFQUFRK0IsT0FBUixLQUFvQjtBQUMxQyxTQUFPQSxPQUFPLEdBQ1YvQixLQUFLLENBQUNNLEdBQU4sQ0FBVSxlQUFPMEIsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSDtBQUFGLEdBQTNCLENBQVYsRUFBbUR6QixHQUFuRCxDQUF1RCxNQUF2RCxDQURVLEdBRVYsdUJBQVEsSUFBUixDQUZKO0FBR0QsQ0FKaUIsRUFJZixXQUplLENBQWxCO0FBTUEsTUFBTWlKLFNBQVMsR0FBRyxxQkFDaEIsQ0FBQ3ZKLEtBQUQsRUFBUTtBQUFFd0osV0FBRjtBQUFhck4sV0FBYjtBQUF3QjJDLE1BQUksR0FBRyxLQUEvQjtBQUFzQzJLLFFBQU0sR0FBRztBQUEvQyxDQUFSLEtBQW1FO0FBQ2pFLE1BQUksQ0FBQ0QsU0FBTCxFQUFnQixPQUFPLHVCQUFRLElBQVIsQ0FBUDs7QUFDaEIsUUFBTWpPLEVBQUUsR0FBRyx5QkFBWTRPLFFBQVosQ0FBcUJYLFNBQXJCLENBQVg7O0FBRUEsU0FBTyxtQkFBSSxDQUNUL0IsS0FBSyxDQUFDekgsS0FBRCxFQUFRd0osU0FBUixDQURJLEVBRVRDLE1BQU0sR0FDRjhTLFdBQVcsQ0FBQ3ZjLEtBQUQsRUFBUTdELFNBQVMsSUFBSSxlQUFPQSxTQUE1QixFQUF1Q1osRUFBdkMsQ0FEVCxHQUVGLHdCQUpLLEVBS1R1RCxJQUFJLEdBQUcxRCxTQUFTLENBQUM0RSxLQUFELEVBQVF6RSxFQUFSLENBQVosR0FBMEIsd0JBTHJCLENBQUosRUFNSnJCLElBTkksQ0FNQyxDQUFDLENBQUM0WixJQUFELEVBQU8wSSxLQUFQLEVBQWMxZCxJQUFkLENBQUQsS0FBeUI7QUFDL0IsUUFBSSxDQUFDZ1YsSUFBRCxJQUFTLENBQUNBLElBQUksQ0FBQ3ZZLEVBQW5CLEVBQXVCLE9BQU8sSUFBUDtBQUN2QixXQUFPLEVBQUUsR0FBR3VZLElBQUw7QUFBVzBJLFdBQVg7QUFBa0IxZDtBQUFsQixLQUFQO0FBQ0QsR0FUTSxDQUFQO0FBVUQsQ0FmZSxDQUFsQjtBQWtCQSxNQUFNNlgsY0FBYyxHQUFHLHFCQUFNLENBQUMzVyxLQUFELEVBQVFrVyxNQUFSLEtBQzNCLG1CQUNFaGQsQ0FBQyxDQUFDbUMsTUFBRixDQUNFLENBQUNvaEIsUUFBRCxFQUFXalQsU0FBWCxLQUF5QjtBQUN2QixNQUFJLENBQUNBLFNBQUwsRUFBZ0IsT0FBT2lULFFBQVA7QUFDaEJBLFVBQVEsQ0FBQ3piLElBQVQsQ0FBY3VJLFNBQVMsQ0FBQ3ZKLEtBQUQsRUFBUSxFQUFFLEdBQUdrVyxNQUFMO0FBQWExTTtBQUFiLEdBQVIsQ0FBdkI7QUFDQSxTQUFPaVQsUUFBUDtBQUNELENBTEgsRUFNRSxFQU5GLEVBT0V2akIsQ0FBQyxDQUFDaUMsTUFBRixDQUFTLEVBQVQsRUFBYSxZQUFiLEVBQTJCK2EsTUFBM0IsQ0FQRixDQURGLENBRHFCLENBQXZCO0FBY0EsTUFBTUwsU0FBUyxHQUFHLHFCQUNoQixDQUFDN1YsS0FBRCxFQUFRdEUsUUFBUixLQUNFc0UsS0FBSyxDQUFDTSxHQUFOLENBQVUsZUFBT29jLFdBQVAsQ0FBbUJ6YSxLQUFuQixDQUF5QkMsT0FBekIsQ0FBaUM7QUFBRXhHO0FBQUYsQ0FBakMsQ0FBVixDQUZjLEVBR2hCLFdBSGdCLENBQWxCO0FBTUEsTUFBTWloQixVQUFVLEdBQUcscUJBQU0sQ0FBQzNjLEtBQUQsRUFBUXRFLFFBQVIsRUFBa0IySCxJQUFsQixLQUEyQjtBQUNsRCxNQUFJLENBQUMzSCxRQUFELElBQWEsQ0FBQzJILElBQWxCLEVBQXdCLE9BQU8sdUJBQVEsSUFBUixDQUFQO0FBQ3hCLFNBQU9yRCxLQUFLLENBQ1RNLEdBREksQ0FDQSxlQUFPb2MsV0FBUCxDQUFtQnphLEtBQW5CLENBQXlCQyxPQUF6QixDQUFpQztBQUFFeEc7QUFBRixHQUFqQyxDQURBLEVBRUo0RSxHQUZJLENBRUErQyxJQUZBLEVBR0ovQyxHQUhJLENBR0EsSUFIQSxDQUFQO0FBSUQsQ0FOa0IsRUFNaEIsWUFOZ0IsQ0FBbkI7QUFRQSxNQUFNb1MsUUFBUSxHQUFHLHFCQUFNLENBQUMxUyxLQUFELEVBQVF0RSxRQUFSLEVBQWtCMkgsSUFBbEIsS0FDckJzWixVQUFVLENBQUMzYyxLQUFELEVBQVF0RSxRQUFSLEVBQWtCMkgsSUFBbEIsQ0FBVixDQUFrQ25KLElBQWxDLENBQXVDcUIsRUFBRSxJQUFJQSxFQUFFLElBQUlILFNBQVMsQ0FBQzRFLEtBQUQsRUFBUXpFLEVBQVIsQ0FBNUQsQ0FEZSxDQUFqQjtBQUlBLE1BQU1zWSxRQUFRLEdBQUcscUJBQU0sQ0FBQzdULEtBQUQsRUFBUXpFLEVBQVIsS0FBZTtBQUNwQyxNQUFJLENBQUNBLEVBQUwsRUFBUyxPQUFPLHVCQUFRLElBQVIsQ0FBUDtBQUNULFNBQU95RSxLQUFLLENBQUNNLEdBQU4sQ0FBVyxJQUFHL0UsRUFBRyxFQUFqQixFQUFvQnJCLElBQXBCLENBQXlCNFosSUFBSSxLQUFLO0FBQ3ZDeE0sU0FBSyxFQUFFcE8sQ0FBQyxDQUFDeUYsSUFBRixDQUFPLE9BQVAsRUFBZ0JtVixJQUFoQixDQURnQztBQUV2QzhJLGFBQVMsRUFBRTFqQixDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEtBQVgsQ0FBUCxFQUEwQnFZLElBQTFCO0FBRjRCLEdBQUwsQ0FBN0IsQ0FBUDtBQUlELENBTmdCLEVBTWQsVUFOYyxDQUFqQjtBQVFBLE1BQU1vRixXQUFXLEdBQUdoZ0IsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBQzBqQixHQUFELEVBQU10akIsSUFBTixLQUMxQixxQkFBVUwsQ0FBQyxDQUFDK1IsS0FBRixDQUFRLEtBQVIsRUFBZTRSLEdBQUcsQ0FBQ25qQixHQUFuQixFQUF3QkgsSUFBSSxJQUFJLEVBQWhDLENBQVYsQ0FEa0IsQ0FBcEI7QUFJTyxNQUFNdWpCLEtBQUssR0FBRztBQUNuQnZDLGFBRG1CO0FBRW5CTSxjQUZtQjtBQUduQkcsY0FIbUI7QUFJbkJHLGVBSm1CO0FBS25CNVksaUJBTG1CO0FBTW5CK1ksa0JBTm1CO0FBT25CL1IsV0FQbUI7QUFRbkJvTixnQkFSbUI7QUFTbkJ4VixZQVRtQjtBQVVuQkcsYUFWbUI7QUFXbkJJLGFBWG1CO0FBWW5CVyxpQkFabUI7QUFhbkJrYSxhQWJtQjtBQWNuQm5oQixXQWRtQjtBQWVuQitnQixvQkFmbUI7QUFnQm5CdkMsWUFoQm1CO0FBaUJuQi9ELFdBakJtQjtBQWtCbkI4RyxZQWxCbUI7QUFtQm5CakssVUFuQm1CO0FBb0JuQm1CLFVBcEJtQjtBQXFCbkJxRixhQXJCbUI7QUFzQm5Cclg7QUF0Qm1CLENBQWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFJQOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNa2IsV0FBVyxHQUFHLEVBQ2xCLEdBQUdDLEdBQUcsQ0FBQ0MsV0FEVztBQUVsQjVDLFdBQVMsRUFBRTtBQUNUNVksUUFBSSxFQUFFLFFBREc7QUFFVHliLGFBQVMsRUFBRSxDQUZGO0FBR1RDLGFBQVMsRUFBRSxxQkFBVW5nQjtBQUhaLEdBRk87QUFRbEJvZ0IsVUFBUSxFQUFFO0FBQ1JDLFNBQUssRUFBRSxXQURDO0FBRVJDLGVBQVcsRUFBRSxtQ0FGTDtBQUdScGYsUUFBSSxFQUFFO0FBQ0pxZixhQUFPLEVBQUcsR0FBRSxxQkFBVTVnQixNQUFPLDJDQUR6QjtBQUVKNmdCLGdCQUFVLEVBQUU7QUFDVm5ELGlCQUFTLEVBQUU7QUFBRW9ELGNBQUksRUFBRTtBQUFSLFNBREQ7QUFFVkMsWUFBSSxFQUFFO0FBQUVqYyxjQUFJLEVBQUUsUUFBUjtBQUFrQmtjLGlCQUFPLEVBQUUsSUFBM0I7QUFBaUNDLGlCQUFPLEVBQUU7QUFBMUMsU0FGSTtBQUdWQyxhQUFLLEVBQUU7QUFBRXBjLGNBQUksRUFBRSxRQUFSO0FBQWtCa2MsaUJBQU8sRUFBRSxDQUEzQjtBQUE4QkMsaUJBQU8sRUFBRTtBQUF2QyxTQUhHO0FBSVZFLFdBQUcsRUFBRTtBQUFFcmMsY0FBSSxFQUFFLFFBQVI7QUFBa0JrYyxpQkFBTyxFQUFFLENBQTNCO0FBQThCQyxpQkFBTyxFQUFFO0FBQXZDO0FBSkssT0FGUjtBQVFKRyxjQUFRLEVBQUUsQ0FBQyxXQUFELEVBQWMsTUFBZCxFQUFzQixPQUF0QixFQUErQixLQUEvQjtBQVJOLEtBSEU7QUFhUkMsaUJBQWEsRUFBRTtBQUFFM2EsVUFBSSxFQUFFO0FBQVIsS0FiUDtBQWNSbWEsY0FBVSxFQUFFO0FBQ1ZuYSxVQUFJLEVBQUU7QUFDSmlhLG1CQUFXLEVBQUUsMkJBRFQ7QUFFSjdiLFlBQUksRUFBRTtBQUZGO0FBREksS0FkSjtBQW9CUndjLHdCQUFvQixFQUFFO0FBQ3BCQyxvQkFBYyxFQUFFLElBREk7QUFFcEJDLFdBQUssRUFBRSxDQUNMO0FBQUVWLFlBQUksRUFBRTtBQUFSLE9BREssRUFFTDtBQUFFQSxZQUFJLEVBQUU7QUFBUixPQUZLO0FBRmE7QUFwQmQsR0FSUTtBQXFDbEJXLE9BQUssRUFBRTtBQUNMZixTQUFLLEVBQUUsT0FERjtBQUVMQyxlQUFXLEVBQUUsdUJBRlI7QUFHTHBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyxvQkFEekI7QUFFSjZnQixnQkFBVSxFQUFFO0FBQ1ZuRCxpQkFBUyxFQUFFO0FBQUVvRCxjQUFJLEVBQUU7QUFBUjtBQURELE9BRlI7QUFLSk0sY0FBUSxFQUFFLENBQUMsV0FBRDtBQUxOLEtBSEQ7QUFVTEMsaUJBQWEsRUFBRTtBQUFFM2EsVUFBSSxFQUFFO0FBQVIsS0FWVjtBQVdMbWEsY0FBVSxFQUFFO0FBQ1ZuYSxVQUFJLEVBQUU7QUFDSmlhLG1CQUFXLEVBQUUsMkJBRFQ7QUFFSjdiLFlBQUksRUFBRTtBQUZGO0FBREksS0FYUDtBQWlCTHdjLHdCQUFvQixFQUFFO0FBQ3BCQyxvQkFBYyxFQUFFLElBREk7QUFFcEJDLFdBQUssRUFBRSxDQUNMO0FBQUVWLFlBQUksRUFBRTtBQUFSLE9BREssRUFFTDtBQUFFQSxZQUFJLEVBQUU7QUFBUixPQUZLO0FBRmE7QUFqQmpCLEdBckNXO0FBK0RsQjFDLFlBQVUsRUFBRTtBQUNWdFosUUFBSSxFQUFFLFFBREk7QUFFVnliLGFBQVMsRUFBRSxDQUZEO0FBR1ZDLGFBQVMsRUFBRSxxQkFBVS9mO0FBSFgsR0EvRE07QUFxRWxCMGQsUUFBTSxFQUFFO0FBQ051QyxTQUFLLEVBQUUsUUFERDtBQUVOQyxlQUFXLEVBQUUsd0JBRlA7QUFHTnBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyxzQkFEekI7QUFFSjZnQixnQkFBVSxFQUFFO0FBQ1Z6QyxrQkFBVSxFQUFFO0FBQUUwQyxjQUFJLEVBQUU7QUFBUjtBQURGLE9BRlI7QUFLSk0sY0FBUSxFQUFFLENBQUMsWUFBRDtBQUxOLEtBSEE7QUFVTkUsd0JBQW9CLEVBQUU7QUFDcEJDLG9CQUFjLEVBQUUsSUFESTtBQUVwQkMsV0FBSyxFQUFFLENBQUM7QUFBRVYsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZhO0FBVmhCLEdBckVVO0FBcUZsQlksS0FBRyxFQUFFO0FBQUU1YyxRQUFJLEVBQUUsQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFSO0FBQTRCMGIsYUFBUyxFQUFFLHFCQUFVaGdCO0FBQWpELEdBckZhO0FBc0ZsQm1oQixLQUFHLEVBQUU7QUFDSGpCLFNBQUssRUFBRSxLQURKO0FBRUhDLGVBQVcsRUFBRSw0QkFGVjtBQUdIcGYsUUFBSSxFQUFFO0FBQ0pxZixhQUFPLEVBQUcsR0FBRSxxQkFBVTVnQixNQUFPLGFBRHpCO0FBQ3VDO0FBQzNDNmdCLGdCQUFVLEVBQUU7QUFDVmEsV0FBRyxFQUFFO0FBQUVaLGNBQUksRUFBRTtBQUFSO0FBREssT0FGUjtBQUtKTSxjQUFRLEVBQUUsQ0FBQyxLQUFEO0FBTE4sS0FISDtBQVVIRSx3QkFBb0IsRUFBRTtBQUNwQkMsb0JBQWMsRUFBRSxJQURJO0FBRXBCQyxXQUFLLEVBQUUsQ0FBQztBQUFFVixZQUFJLEVBQUU7QUFBUixPQUFEO0FBRmE7QUFWbkIsR0F0RmE7QUFzR2xCMWIsU0FBTyxFQUFFO0FBQ1BOLFFBQUksRUFBRSxRQURDO0FBRVAwYixhQUFTLEVBQUUscUJBQVVyZ0I7QUFGZCxHQXRHUztBQTJHbEIwTSxXQUFTLEVBQUU7QUFDVGdVLGNBQVUsRUFBRTtBQUNWemIsYUFBTyxFQUFFO0FBQUUsZ0JBQVE7QUFBVjtBQURDO0FBREgsR0EzR087QUFpSGxCd1osa0JBQWdCLEVBQUU7QUFDaEI4QixTQUFLLEVBQUUsb0JBRFM7QUFFaEJDLGVBQVcsRUFBRSxxQ0FGRztBQUdoQnBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyw4QkFEekI7QUFFSjRoQixXQUFLLEVBQUUsQ0FBQztBQUFFZCxZQUFJLEVBQUU7QUFBUixPQUFEO0FBRkgsS0FIVTtBQU9oQlEsd0JBQW9CLEVBQUU7QUFDcEJDLG9CQUFjLEVBQUUsSUFESTtBQUVwQkMsV0FBSyxFQUFFLENBQUM7QUFBRVYsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZhO0FBUE4sR0FqSEE7QUE4SGxCOUosZUFBYSxFQUFFO0FBQ2IwSixTQUFLLEVBQUUsZ0JBRE07QUFFYkMsZUFBVyxFQUFFLDJCQUZBO0FBR2JwZixRQUFJLEVBQUU7QUFDSnFmLGFBQU8sRUFBRyxHQUFFLHFCQUFVNWdCLE1BQU8sMkJBRHpCO0FBRUo0aEIsV0FBSyxFQUFFLENBQUM7QUFBRWQsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZILEtBSE87QUFPYlEsd0JBQW9CLEVBQUU7QUFDcEJDLG9CQUFjLEVBQUUsSUFESTtBQUVwQkMsV0FBSyxFQUFFLENBQUM7QUFBRVYsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZhO0FBUFQsR0E5SEc7QUEySWxCOWhCLFdBQVMsRUFBRTtBQUFFOEYsUUFBSSxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVg7QUFBUixHQTNJTztBQTRJbEIrYyxXQUFTLEVBQUU7QUFDVC9jLFFBQUksRUFBRSxRQURHO0FBRVQwYixhQUFTLEVBQUUscUJBQVU5ZjtBQUZaLEdBNUlPO0FBaUpsQjJFLE9BQUssRUFBRTtBQUNMcWIsU0FBSyxFQUFFLGlCQURGO0FBRUxDLGVBQVcsRUFDVCwrREFIRztBQUlMcGYsUUFBSSxFQUFFO0FBQ0pxZixhQUFPLEVBQUcsR0FBRSxxQkFBVTVnQixNQUFPLGtCQUR6QjtBQUVKNGhCLFdBQUssRUFBRSxDQUFDO0FBQUVkLFlBQUksRUFBRTtBQUFSLE9BQUQ7QUFGSCxLQUpEO0FBUUxPLGlCQUFhLEVBQUU7QUFBRXppQixRQUFFLEVBQUU7QUFBTixLQVJWO0FBU0xpaUIsY0FBVSxFQUFFO0FBQ1ZqaUIsUUFBRSxFQUFFO0FBQUVraUIsWUFBSSxFQUFFO0FBQVIsT0FETTtBQUVWcFcsVUFBSSxFQUFFO0FBQUUsZ0JBQVE7QUFBVixPQUZJO0FBR1YxTCxlQUFTLEVBQUU7QUFBRThoQixZQUFJLEVBQUU7QUFBUixPQUhEO0FBSVZnQixrQkFBWSxFQUFFO0FBQUVoQixZQUFJLEVBQUU7QUFBUixPQUpKO0FBS1YzZSxVQUFJLEVBQUU7QUFDSjRmLGFBQUssRUFBRSxDQUNMO0FBQUVqQixjQUFJLEVBQUU7QUFBUixTQURLLEVBRUw7QUFBRUEsY0FBSSxFQUFFO0FBQVIsU0FGSztBQURILE9BTEk7QUFXVnphLFdBQUssRUFBRTtBQUNMbWIsYUFBSyxFQUFFLENBQ0w7QUFBRVYsY0FBSSxFQUFFO0FBQVIsU0FESyxFQUVMO0FBQ0VILHFCQUFXLEVBQUUseUNBRGY7QUFFRTdiLGNBQUksRUFBRSxRQUZSO0FBR0V3Yyw4QkFBb0IsRUFBRSxLQUh4QjtBQUlFVCxvQkFBVSxFQUFFO0FBQ1YsaUJBQUs7QUFBRS9iLGtCQUFJLEVBQUUsUUFBUjtBQUFrQjBiLHVCQUFTLEVBQUU7QUFBN0I7QUFESyxXQUpkO0FBT0VZLGtCQUFRLEVBQUUsQ0FBQyxHQUFEO0FBUFosU0FGSztBQURGLE9BWEc7QUF5QlZoYixZQUFNLEVBQUU7QUFBRTBhLFlBQUksRUFBRTtBQUFSLE9BekJFO0FBMEJWWSxTQUFHLEVBQUU7QUFBRVosWUFBSSxFQUFFO0FBQVIsT0ExQks7QUEyQlZqTixjQUFRLEVBQUU7QUFBRW1PLHdCQUFnQixFQUFFO0FBQXBCLE9BM0JBO0FBNEJWQyxpQkFBVyxFQUFFO0FBQUVELHdCQUFnQixFQUFFO0FBQXBCLE9BNUJIO0FBNkJWRSxhQUFPLEVBQUU7QUFBRUYsd0JBQWdCLEVBQUU7QUFBcEIsT0E3QkM7QUE4QlZHLGVBQVMsRUFBRTtBQUFFSCx3QkFBZ0IsRUFBRTtBQUFwQixPQTlCRDtBQStCVi9iLFFBQUUsRUFBRTtBQUFFNmEsWUFBSSxFQUFFO0FBQVIsT0EvQk07QUFnQ1ZzQixhQUFPLEVBQUU7QUFBRXRCLFlBQUksRUFBRTtBQUFSLE9BaENDO0FBaUNWM2EsWUFBTSxFQUFFO0FBQUUyYSxZQUFJLEVBQUU7QUFBUjtBQWpDRSxLQVRQO0FBNkNMVSxTQUFLLEVBQUUsQ0FDTDtBQUNFSSxXQUFLLEVBQUUsQ0FDTDtBQUNFUyw0QkFBb0IsRUFBRTtBQUR4QixPQURLLEVBSUw7QUFDRWIsYUFBSyxFQUFFLENBQ0w7QUFBRWMscUNBQTJCLEVBQUU7QUFBL0IsU0FESyxFQUVMO0FBQUVDLHNDQUE0QixFQUFFO0FBQWhDLFNBRks7QUFEVCxPQUpLO0FBRFQsS0FESyxFQWNMO0FBQUVDLG1CQUFhLEVBQUU7QUFBakIsS0FkSyxFQWVMO0FBQ0VsQiwwQkFBb0IsRUFBRSxLQUR4QjtBQUVFWCxpQkFBVyxFQUFFLDRDQUZmO0FBR0VFLGdCQUFVLEVBQUU7QUFDVmppQixVQUFFLEVBQUU7QUFBRWtpQixjQUFJLEVBQUU7QUFBUixTQURNO0FBRVZqTixnQkFBUSxFQUFFO0FBQUVtTywwQkFBZ0IsRUFBRTtBQUFwQixTQUZBO0FBR1ZDLG1CQUFXLEVBQUU7QUFBRUQsMEJBQWdCLEVBQUU7QUFBcEIsU0FISDtBQUlWRSxlQUFPLEVBQUU7QUFBRUYsMEJBQWdCLEVBQUU7QUFBcEIsU0FKQztBQUtWRyxpQkFBUyxFQUFFO0FBQUVILDBCQUFnQixFQUFFO0FBQXBCO0FBTEQ7QUFIZCxLQWZLO0FBN0NGLEdBakpXO0FBMk5sQlMsa0JBQWdCLEVBQUU7QUFDaEJDLFVBQU0sRUFBRSxJQURRO0FBRWhCQyx1QkFBbUIsRUFBRTtBQUNuQkMsZUFBUyxFQUFFLFNBRFE7QUFFbkJySCxZQUFNLEVBQUU7QUFDTnNILGtCQUFVLEVBQUUsQ0FETjtBQUVOQyxrQkFBVSxFQUFFLEVBRk47QUFHTkMsZ0JBQVEsRUFBRSxDQUhKO0FBSU5DLGtCQUFVLEVBQUUsS0FKTjtBQUtOQyxtQkFBVyxFQUFFO0FBTFA7QUFGVztBQUZMLEdBM05BO0FBeU9sQkMsY0FBWSxFQUFFO0FBQ1ozaEIsUUFBSSxFQUFFO0FBQ0pxZixhQUFPLEVBQUcsR0FBRSxxQkFBVTVnQixNQUFPLDBCQUR6QjtBQUVKNGhCLFdBQUssRUFBRSxDQUFDO0FBQUVkLFlBQUksRUFBRTtBQUFSLE9BQUQ7QUFGSCxLQURNO0FBS1pjLFNBQUssRUFBRSxDQUFDO0FBQUVkLFVBQUksRUFBRTtBQUFSLEtBQUQ7QUFMSyxHQXpPSTtBQWlQbEJxQyxnQkFBYyxFQUFFO0FBQ2Q1aEIsUUFBSSxFQUFFO0FBQ0pxZixhQUFPLEVBQUcsR0FBRSxxQkFBVTVnQixNQUFPLDRCQUR6QjtBQUVKNGhCLFdBQUssRUFBRSxDQUFDO0FBQUVkLFlBQUksRUFBRTtBQUFSLE9BQUQ7QUFGSCxLQURRO0FBS2RjLFNBQUssRUFBRSxDQUFDO0FBQUVkLFVBQUksRUFBRTtBQUFSLEtBQUQ7QUFMTyxHQWpQRTtBQXlQbEJzQyxXQUFTLEVBQUU7QUFDVDFDLFNBQUssRUFBRSxxQkFERTtBQUVUQyxlQUFXLEVBQUUsdUNBRko7QUFHVHBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyx1QkFEekI7QUFFSjRoQixXQUFLLEVBQUUsQ0FBQztBQUFFZCxZQUFJLEVBQUU7QUFBUixPQUFELENBRkg7QUFHSk0sY0FBUSxFQUFFLENBQUMsU0FBRDtBQUhOLEtBSEc7QUFRVFAsY0FBVSxFQUFFO0FBQ1ZuVyxVQUFJLEVBQUU7QUFBRW9XLFlBQUksRUFBRTtBQUFSLE9BREk7QUFFVkosV0FBSyxFQUFFO0FBQ0w1YixZQUFJLEVBQUUsUUFERDtBQUVMeWIsaUJBQVMsRUFBRSxDQUZOO0FBR0xDLGlCQUFTLEVBQUUscUJBQVU3ZjtBQUhoQixPQUZHO0FBT1YwRixXQUFLLEVBQUU7QUFBRXlhLFlBQUksRUFBRTtBQUFSLE9BUEc7QUFRVmppQixVQUFJLEVBQUU7QUFDSmlHLFlBQUksRUFBRSxDQUFDLE1BQUQsRUFBUyxRQUFULENBREY7QUFFSjBiLGlCQUFTLEVBQUUscUJBQVU1ZjtBQUZqQixPQVJJO0FBWVZ1RixZQUFNLEVBQUU7QUFBRTJhLFlBQUksRUFBRTtBQUFSLE9BWkU7QUFhVi9oQixjQUFRLEVBQUU7QUFBRStoQixZQUFJLEVBQUU7QUFBUixPQWJBO0FBY1ZoSyxVQUFJLEVBQUU7QUFBRWdLLFlBQUksRUFBRTtBQUFSLE9BZEk7QUFlVjVCLGVBQVMsRUFBRTtBQUFFNEIsWUFBSSxFQUFFO0FBQVIsT0FmRDtBQWdCVjFhLFlBQU0sRUFBRTtBQUFFMGEsWUFBSSxFQUFFO0FBQVIsT0FoQkU7QUFpQlZZLFNBQUcsRUFBRTtBQUFFWixZQUFJLEVBQUU7QUFBUixPQWpCSztBQWtCVjloQixlQUFTLEVBQUU7QUFBRThoQixZQUFJLEVBQUU7QUFBUjtBQWxCRCxLQVJIO0FBNEJUdUMsNEJBQXdCLEVBQUU7QUE1QmpCLEdBelBPO0FBd1JsQjFMLGlCQUFlLEVBQUU7QUFDZitJLFNBQUssRUFBRSxtQkFEUTtBQUVmQyxlQUFXLEVBQ1QsaUVBSGE7QUFJZnBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyxrQ0FEekI7QUFFSjZnQixnQkFBVSxFQUFFO0FBQ1Z6YixlQUFPLEVBQUU7QUFBRTBiLGNBQUksRUFBRTtBQUFSLFNBREM7QUFFVi9oQixnQkFBUSxFQUFFO0FBQUUraEIsY0FBSSxFQUFFO0FBQVI7QUFGQSxPQUZSO0FBTUpNLGNBQVEsRUFBRSxDQUFDLFNBQUQsRUFBWSxVQUFaO0FBTk4sS0FKUztBQVlmUCxjQUFVLEVBQUU7QUFDVm5XLFVBQUksRUFBRTtBQUFFMlYsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0FESTtBQUVWSixXQUFLLEVBQUU7QUFDTEwsV0FBRyxFQUFFO0FBQ0h2YixjQUFJLEVBQUUsUUFESDtBQUVIeWIsbUJBQVMsRUFBRSxDQUZSO0FBR0hDLG1CQUFTLEVBQUUscUJBQVU3ZjtBQUhsQjtBQURBLE9BRkc7QUFTVjBGLFdBQUssRUFBRTtBQUFFZ2EsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0FURztBQVVWamlCLFVBQUksRUFBRTtBQUNKd2hCLFdBQUcsRUFBRTtBQUNIdmIsY0FBSSxFQUFFLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FESDtBQUVIMGIsbUJBQVMsRUFBRSxxQkFBVTVmO0FBRmxCO0FBREQsT0FWSTtBQWdCVnVGLFlBQU0sRUFBRTtBQUNOa2EsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBREMsT0FoQkU7QUFtQlYvaEIsY0FBUSxFQUFFO0FBQUVzaEIsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0FuQkE7QUFvQlZoSyxVQUFJLEVBQUU7QUFBRXVKLFdBQUcsRUFBRTtBQUFFUyxjQUFJLEVBQUU7QUFBUjtBQUFQLE9BcEJJO0FBcUJWNUIsZUFBUyxFQUFFO0FBQUVtQixXQUFHLEVBQUU7QUFBRVMsY0FBSSxFQUFFO0FBQVI7QUFBUCxPQXJCRDtBQXNCVjFhLFlBQU0sRUFBRTtBQUFFaWEsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0F0QkU7QUF1QlZZLFNBQUcsRUFBRTtBQUFFckIsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0F2Qks7QUF3QlY5aEIsZUFBUyxFQUFFO0FBQUVxaEIsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVA7QUF4QkQ7QUFaRyxHQXhSQztBQWdVbEIvTyxpQkFBZSxFQUFFO0FBQ2YyTyxTQUFLLEVBQUUsbUJBRFE7QUFFZkMsZUFBVyxFQUFFLG9DQUZFO0FBR2ZwZixRQUFJLEVBQUU7QUFDSnFmLGFBQU8sRUFBRyxHQUFFLHFCQUFVNWdCLE1BQU8sMENBRHpCO0FBRUo2Z0IsZ0JBQVUsRUFBRTtBQUNWemIsZUFBTyxFQUFFO0FBQUUwYixjQUFJLEVBQUU7QUFBUixTQURDO0FBRVZ0aEIsaUJBQVMsRUFBRTtBQUFFc2hCLGNBQUksRUFBRTtBQUFSO0FBRkQ7QUFGUixLQUhTO0FBVWZELGNBQVUsRUFBRTtBQUNWeUMsUUFBRSxFQUFFO0FBQUVqRCxXQUFHLEVBQUU7QUFBRXZiLGNBQUksRUFBRSxDQUFDLFFBQUQsRUFBVyxRQUFYO0FBQVI7QUFBUCxPQURNO0FBRVZ5ZSxVQUFJLEVBQUU7QUFBRWxELFdBQUcsRUFBRTtBQUFFdmIsY0FBSSxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVg7QUFBUjtBQUFQLE9BRkk7QUFHVjJYLGFBQU8sRUFBRTtBQUFFNEQsV0FBRyxFQUFFO0FBQUV2YixjQUFJLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWDtBQUFSO0FBQVAsT0FIQztBQUlWaVAsV0FBSyxFQUFFO0FBQUVzTSxXQUFHLEVBQUU7QUFBRXZiLGNBQUksRUFBRSxDQUFDLFFBQUQsRUFBVyxRQUFYO0FBQVI7QUFBUCxPQUpHO0FBS1YwZSxjQUFRLEVBQUU7QUFBRW5ELFdBQUcsRUFBRTtBQUFFdmIsY0FBSSxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVg7QUFBUjtBQUFQO0FBTEE7QUFWRyxHQWhVQztBQW1WbEIyZSxhQUFXLEVBQUU7QUFDWGYsVUFBTSxFQUFFLElBREc7QUFFWGhDLFNBQUssRUFBRSxtQkFGSTtBQUdYQyxlQUFXLEVBQUUsMENBSEY7QUFJWDdiLFFBQUksRUFBRSxRQUpLO0FBS1h3Yyx3QkFBb0IsRUFBRSxLQUxYO0FBTVhvQyxxQkFBaUIsRUFBRTtBQUNqQixjQUFRO0FBQUVyRCxXQUFHLEVBQUU7QUFBRXZiLGNBQUksRUFBRSxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLFdBQW5CO0FBQVI7QUFBUDtBQURTLEtBTlI7QUFVWDZlLHdCQUFvQixFQUFFO0FBVlgsR0FuVks7QUFnV2xCQyxVQUFRLEVBQUU7QUFDUjllLFFBQUksRUFBRSxRQURFO0FBRVIrZSxRQUFJLEVBQUUsQ0FDSixLQURJLEVBRUosS0FGSSxFQUdKLFFBSEksRUFJSixLQUpJLEVBS0osVUFMSSxFQU1KLFdBTkksRUFPSixLQVBJLEVBUUosTUFSSSxFQVNKLGVBVEksRUFVSixRQVZJLEVBV0osVUFYSSxFQVlKLE1BWkk7QUFGRSxHQWhXUTtBQWtYbEJ6TCxjQUFZLEVBQUU7QUFDWjdXLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyw0QkFEekI7QUFFSm9oQixjQUFRLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixFQUFrQixTQUFsQixDQUZOO0FBR0pQLGdCQUFVLEVBQUU7QUFDVnhhLGFBQUssRUFBRTtBQUFFdkIsY0FBSSxFQUFFO0FBQVIsU0FERztBQUVWZixZQUFJLEVBQUU7QUFBRStjLGNBQUksRUFBRTtBQUFSLFNBRkk7QUFHVnBoQixlQUFPLEVBQUU7QUFBRW9oQixjQUFJLEVBQUU7QUFBUjtBQUhDO0FBSFIsS0FETTtBQVVaYyxTQUFLLEVBQUUsQ0FBQztBQUFFZCxVQUFJLEVBQUU7QUFBUixLQUFEO0FBVkssR0FsWEk7QUErWGxCcEssZUFBYSxFQUFFO0FBQ2JuVixRQUFJLEVBQUU7QUFDSnFmLGFBQU8sRUFBRyxHQUFFLHFCQUFVNWdCLE1BQU8sa0NBRHpCO0FBRUpvaEIsY0FBUSxFQUFFLENBQUMsUUFBRCxFQUFXLE1BQVgsRUFBbUIsU0FBbkIsQ0FGTjtBQUdKUCxnQkFBVSxFQUFFO0FBQ1Z6YSxjQUFNLEVBQUU7QUFBRXRCLGNBQUksRUFBRTtBQUFSLFNBREU7QUFFVmYsWUFBSSxFQUFFO0FBQUUrYyxjQUFJLEVBQUU7QUFBUixTQUZJO0FBR1ZwaEIsZUFBTyxFQUFFO0FBQUVvaEIsY0FBSSxFQUFFO0FBQVI7QUFIQztBQUhSLEtBRE87QUFVYmMsU0FBSyxFQUFFLENBQUM7QUFBRWQsVUFBSSxFQUFFO0FBQVIsS0FBRDtBQVZNLEdBL1hHO0FBNFlsQmdELHNCQUFvQixFQUFFO0FBQ3BCdmlCLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyw0Q0FEekI7QUFFSjZnQixnQkFBVSxFQUFFO0FBQ1Z6YixlQUFPLEVBQUU7QUFBRTBiLGNBQUksRUFBRTtBQUFSLFNBREM7QUFFVi9jLFlBQUksRUFBRTtBQUFFK2MsY0FBSSxFQUFFO0FBQVIsU0FGSTtBQUdWcGhCLGVBQU8sRUFBRTtBQUFFb2hCLGNBQUksRUFBRTtBQUFSO0FBSEM7QUFGUixLQURjO0FBU3BCYyxTQUFLLEVBQUUsQ0FBQztBQUFFZCxVQUFJLEVBQUU7QUFBUixLQUFEO0FBVGEsR0E1WUo7QUF3WmxCaUQsaUJBQWUsRUFBRTtBQUNmamYsUUFBSSxFQUFFLFFBRFM7QUFFZitlLFFBQUksRUFBRSxDQUFDLFVBQUQsRUFBYSxXQUFiLEVBQTBCLFVBQTFCLEVBQXNDLFVBQXRDLEVBQWtELFdBQWxEO0FBRlMsR0F4WkM7QUE2WmxCRyxzQkFBb0IsRUFBRTtBQUNwQnppQixRQUFJLEVBQUU7QUFDSnFmLGFBQU8sRUFBRyxHQUNSLHFCQUFVNWdCLE1BQ1gsZ0RBSEc7QUFJSjZnQixnQkFBVSxFQUFFO0FBQ1Y5aEIsZ0JBQVEsRUFBRTtBQUFFK2hCLGNBQUksRUFBRTtBQUFSLFNBREE7QUFFVi9jLFlBQUksRUFBRTtBQUFFK2MsY0FBSSxFQUFFO0FBQVIsU0FGSTtBQUdWcGhCLGVBQU8sRUFBRTtBQUFFb2hCLGNBQUksRUFBRTtBQUFSLFNBSEM7QUFJVmhjLFlBQUksRUFBRTtBQUFFZ2MsY0FBSSxFQUFFO0FBQVI7QUFKSTtBQUpSLEtBRGM7QUFZcEJjLFNBQUssRUFBRSxDQUFDO0FBQUVkLFVBQUksRUFBRTtBQUFSLEtBQUQ7QUFaYSxHQTdaSjtBQTRhbEJtRCxzQkFBb0IsRUFBRTtBQUNwQjFpQixRQUFJLEVBQUU7QUFDSnFmLGFBQU8sRUFBRyxHQUFFLHFCQUFVNWdCLE1BQU8sd0NBRHpCO0FBRUo2Z0IsZ0JBQVUsRUFBRTtBQUNWOWhCLGdCQUFRLEVBQUU7QUFBRStoQixjQUFJLEVBQUU7QUFBUixTQURBO0FBRVYvYyxZQUFJLEVBQUU7QUFBRStjLGNBQUksRUFBRTtBQUFSLFNBRkk7QUFHVnBoQixlQUFPLEVBQUU7QUFBRW9oQixjQUFJLEVBQUU7QUFBUixTQUhDO0FBSVZoYyxZQUFJLEVBQUU7QUFBRWdjLGNBQUksRUFBRTtBQUFSO0FBSkk7QUFGUixLQURjO0FBVXBCYyxTQUFLLEVBQUUsQ0FBQztBQUFFZCxVQUFJLEVBQUU7QUFBUixLQUFEO0FBVmEsR0E1YUo7QUF5YmxCM0ksY0FBWSxFQUFFO0FBQ1o1VyxRQUFJLEVBQUU7QUFDSnFmLGFBQU8sRUFBRyxHQUNSLHFCQUFVNWdCLE1BQ1gsK0NBSEc7QUFJSjZnQixnQkFBVSxFQUFFO0FBQ1Y5aEIsZ0JBQVEsRUFBRTtBQUFFK2hCLGNBQUksRUFBRTtBQUFSLFNBREE7QUFFVi9jLFlBQUksRUFBRTtBQUFFK2MsY0FBSSxFQUFFO0FBQVIsU0FGSTtBQUdWcGhCLGVBQU8sRUFBRTtBQUFFb2hCLGNBQUksRUFBRTtBQUFSLFNBSEM7QUFJVnBhLFlBQUksRUFBRTtBQUFFb2EsY0FBSSxFQUFFO0FBQVI7QUFKSTtBQUpSLEtBRE07QUFZWmMsU0FBSyxFQUFFLENBQUM7QUFBRWQsVUFBSSxFQUFFO0FBQVIsS0FBRDtBQVpLLEdBemJJO0FBd2NsQm9ELGdCQUFjLEVBQUU7QUFDZHhELFNBQUssRUFBRSxtQkFETztBQUVkQyxlQUFXLEVBQUUsa0RBRkM7QUFHZHBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyxzQkFEekI7QUFFSjZnQixnQkFBVSxFQUFFO0FBQ1Y5aEIsZ0JBQVEsRUFBRTtBQUFFK2hCLGNBQUksRUFBRTtBQUFSO0FBREEsT0FGUjtBQUtKTSxjQUFRLEVBQUUsQ0FBQyxVQUFEO0FBTE4sS0FIUTtBQVVkRSx3QkFBb0IsRUFBRTtBQUNwQmpCLFNBQUcsRUFBRTtBQUNIa0Isc0JBQWMsRUFBRSxJQURiO0FBRUhDLGFBQUssRUFBRSxDQUFDO0FBQUVWLGNBQUksRUFBRTtBQUFSLFNBQUQ7QUFGSjtBQURlO0FBVlIsR0F4Y0U7QUEwZGxCcUQsbUJBQWlCLEVBQUU7QUFDakJ6RCxTQUFLLEVBQUUsc0JBRFU7QUFFakJDLGVBQVcsRUFBRSxzREFGSTtBQUdqQnBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyx5QkFEekI7QUFFSjZnQixnQkFBVSxFQUFFO0FBQ1Y5aEIsZ0JBQVEsRUFBRTtBQUFFK2hCLGNBQUksRUFBRTtBQUFSO0FBREEsT0FGUjtBQUtKTSxjQUFRLEVBQUUsQ0FBQyxVQUFEO0FBTE47QUFIVyxHQTFkRDtBQXNlbEJnRCxjQUFZLEVBQUU7QUFDWjFELFNBQUssRUFBRSxpQkFESztBQUVaQyxlQUFXLEVBQUUsaURBRkQ7QUFHWnBmLFFBQUksRUFBRTtBQUNKcWYsYUFBTyxFQUFHLEdBQUUscUJBQVU1Z0IsTUFBTyxvQkFEekI7QUFFSjZnQixnQkFBVSxFQUFFO0FBQ1Y5aEIsZ0JBQVEsRUFBRTtBQUFFK2hCLGNBQUksRUFBRTtBQUFSO0FBREEsT0FGUjtBQUtKTSxjQUFRLEVBQUUsQ0FBQyxVQUFEO0FBTE4sS0FITTtBQVVaRSx3QkFBb0IsRUFBRTtBQUNwQmpCLFNBQUcsRUFBRTtBQUNIa0Isc0JBQWMsRUFBRSxJQURiO0FBRUhDLGFBQUssRUFBRSxDQUFDO0FBQUVWLGNBQUksRUFBRTtBQUFSLFNBQUQ7QUFGSjtBQURlO0FBVlYsR0F0ZUk7QUF3ZmxCZixhQUFXLEVBQUU7QUFDWFcsU0FBSyxFQUFFLGlCQURJO0FBRVhDLGVBQVcsRUFBRSxpQ0FGRjtBQUdYcGYsUUFBSSxFQUFFO0FBQ0pxZixhQUFPLEVBQUcsR0FBRSxxQkFBVTVnQixNQUFPLG1CQUR6QjtBQUVKNmdCLGdCQUFVLEVBQUU7QUFDVjloQixnQkFBUSxFQUFFO0FBQUUraEIsY0FBSSxFQUFFO0FBQVI7QUFEQSxPQUZSO0FBS0pNLGNBQVEsRUFBRSxDQUFDLFVBQUQ7QUFMTixLQUhLO0FBVVhFLHdCQUFvQixFQUFFO0FBQ3BCakIsU0FBRyxFQUFFO0FBQ0hrQixzQkFBYyxFQUFFLElBRGI7QUFFSEMsYUFBSyxFQUFFLENBQUM7QUFBRVYsY0FBSSxFQUFFO0FBQVIsU0FBRDtBQUZKO0FBRGU7QUFWWDtBQXhmSyxDQUFwQjtBQTJnQkEsTUFBTXVELE1BQU0sR0FBRzluQixDQUFDLENBQUM4QyxJQUFGLENBQU8rZ0IsV0FBUCxFQUFvQjFoQixNQUFwQixDQUEyQixDQUFDaEIsTUFBRCxFQUFTZ0osSUFBVCxLQUFrQjtBQUMxRCxRQUFNa2EsT0FBTyxHQUFHcmtCLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDNEgsSUFBRCxFQUFPLE1BQVAsRUFBZSxTQUFmLENBQVAsRUFBa0MwWixXQUFsQyxDQUFoQjtBQUVBLE1BQUksQ0FBQ1EsT0FBTCxFQUFjLE9BQU9sakIsTUFBUDtBQUNkLFNBQU9uQixDQUFDLENBQUMrUixLQUFGLENBQVE1SCxJQUFSLEVBQWMseUJBQVVrYSxPQUFWLENBQWQsRUFBa0NsakIsTUFBbEMsQ0FBUDtBQUNELENBTGMsQ0FBZjtBQU9BLE1BQU00bUIsY0FBYyxHQUFHL25CLENBQUMsQ0FBQzJCLE9BQUYsQ0FDckIzQixDQUFDLENBQUNtQyxNQUFGLENBQ0UsQ0FBQ2tFLEdBQUQsRUFBTSxDQUFDOEQsSUFBRCxFQUFPcEIsS0FBUCxDQUFOLEtBQ0UvSSxDQUFDLENBQUMrUixLQUFGLENBQVE1SCxJQUFSLEVBQWNuSyxDQUFDLENBQUMrUixLQUFGLENBQVEsT0FBUixFQUFpQmhKLEtBQWpCLEVBQXdCL0ksQ0FBQyxDQUFDeUYsSUFBRixDQUFPMEUsSUFBUCxFQUFhMFosV0FBYixDQUF4QixDQUFkLEVBQWtFeGQsR0FBbEUsQ0FGSixFQUdFLEVBSEYsQ0FEcUIsRUFNckJyRyxDQUFDLENBQUN3RCxPQU5tQixFQU9yQnNrQixNQVBxQixDQUF2QjtBQVNPLE1BQU1FLE1BQU0sR0FBRyxFQUNwQixHQUFHRCxjQURpQjtBQUVwQmxFLGFBRm9CO0FBR3BCaUU7QUFIb0IsQ0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoaUJQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUcsY0FBYyxHQUFHLHFCQUFNLE9BQU9uaEIsS0FBUCxFQUFjaUMsS0FBZCxLQUF3QjtBQUNuRCxRQUFNdUgsU0FBUyxHQUFHLGVBQU94SCxLQUFQLENBQWFDLEtBQWIsQ0FBbUJDLE9BQW5CLENBQTJCRCxLQUFLLENBQUNtSSxLQUFqQyxDQUFsQjs7QUFDQSxRQUFNLENBQUM2VixFQUFELEVBQUtDLElBQUwsRUFBVzlHLE9BQVgsRUFBb0JnSSxVQUFwQixJQUFrQyxNQUFNLG1CQUFJLENBQ2hEcGhCLEtBQUssQ0FBQ00sR0FBTixDQUFXLEdBQUVrSixTQUFVLFVBQXZCLEVBQWtDcEIsS0FBbEMsRUFEZ0QsRUFFaERwSSxLQUFLLENBQUNNLEdBQU4sQ0FBVyxHQUFFa0osU0FBVSxZQUF2QixFQUFvQ3BCLEtBQXBDLEVBRmdELEVBR2hEcEksS0FBSyxDQUFDTSxHQUFOLENBQVcsR0FBRWtKLFNBQVUsY0FBdkIsRUFBc0NwQixLQUF0QyxFQUhnRCxFQUloRHBJLEtBQUssQ0FBQ00sR0FBTixDQUFXLEdBQUVrSixTQUFVLFdBQXZCLEVBQW1DdkosS0FBbkMsRUFKZ0QsQ0FBSixDQUE5QztBQU1BLFFBQU03RSxTQUFTLEdBQUcsTUFBTSxhQUFNK2dCLGtCQUFOLENBQXlCaUYsVUFBekIsQ0FBeEI7O0FBQ0EsUUFBTUMsVUFBVSxHQUFHLCtCQUFldm1CLEdBQWYsQ0FBbUJNLFNBQW5CLENBQW5COztBQUNBLFFBQU1mLE1BQU0sR0FBRztBQUNiNGxCLE1BRGE7QUFFYkMsUUFGYTtBQUdiOUcsV0FIYTtBQUlielcsV0FBTyxFQUFFeWUsVUFBVSxDQUFDcmdCLE1BSlA7QUFLYjJQLFNBQUssRUFBRXVQLEVBQUUsR0FBR0M7QUFMQyxHQUFmO0FBUUEsTUFBSWhuQixDQUFDLENBQUM4QyxJQUFGLENBQU9xbEIsVUFBUCxFQUFtQnRnQixNQUF2QixFQUErQjFHLE1BQU0sQ0FBQzhsQixRQUFQLEdBQWtCbUIsSUFBSSxDQUFDQyxTQUFMLENBQWVGLFVBQWYsQ0FBbEI7QUFDL0IsU0FBT2huQixNQUFQO0FBQ0QsQ0FwQnNCLENBQXZCO0FBc0JPLE1BQU1tbkIsU0FBUyxHQUFHO0FBQUV0Z0IsT0FBSyxFQUFFaWdCO0FBQVQsQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7QUFFQSxNQUFNTSxhQUFhLEdBQUc7QUFDcEJDLFNBQU8sRUFBRSxPQURXO0FBRXBCdEksU0FBTyxFQUFFO0FBRlcsQ0FBdEI7QUFLQSxNQUFNalAsUUFBUSxHQUFHalIsQ0FBQyxDQUFDMkIsT0FBRixDQUNmM0IsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLFNBQVAsQ0FEZSxFQUVmLGVBQU9xRCxLQUFQLENBQWFDLEtBQWIsQ0FBbUJtSSxLQUFuQixDQUF5QnVYLElBQXpCLENBQThCLGVBQU8zZixLQUFQLENBQWFDLEtBQTNDLENBRmUsQ0FBakI7QUFLQSxNQUFNb0ksVUFBVSxHQUFHblIsQ0FBQyxDQUFDNEIsR0FBRixDQUFNcVAsUUFBTixDQUFuQjtBQUVBLE1BQU15WCxLQUFLLEdBQUcxb0IsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBQ0MsSUFBRCxFQUFPMkksT0FBUCxFQUFnQmpELElBQWhCLEtBQXlCO0FBQzdDLE1BQUksQ0FBQ0EsSUFBSSxDQUFDa0UsS0FBTixJQUFlLENBQUNsRSxJQUFJLENBQUMyVSxJQUF6QixFQUErQjs7QUFFL0IsTUFBSTNVLElBQUksQ0FBQzJVLElBQUwsSUFBYSxDQUFDM1UsSUFBSSxDQUFDa0UsS0FBdkIsRUFBOEI7QUFDNUI1SixRQUFJLENBQUNNLEdBQUwsQ0FDRzRHLEdBREgsQ0FDTyxlQUFPMEIsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxhQUFPLEVBQUVqRCxJQUFJLENBQUMyVTtBQUFoQixLQUEzQixDQURQLEVBRUduVCxHQUZILENBRU8sTUFGUCxFQUdHb1ksRUFISCxDQUdNLFNBQVNtSixJQUFULENBQWNDLEVBQWQsRUFBa0I7QUFDcEIsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDVEYsV0FBSyxDQUFDeG9CLElBQUQsRUFBTzJJLE9BQVAsRUFBZ0IsRUFBRSxHQUFHakQsSUFBTDtBQUFXa0UsYUFBSyxFQUFFOGUsRUFBRSxDQUFDOWUsS0FBSCxJQUFZO0FBQTlCLE9BQWhCLENBQUw7QUFDQSxXQUFLK2UsR0FBTDtBQUNELEtBUEg7QUFRQTtBQUNEOztBQUVELFFBQU10YSxLQUFLLEdBQUdyTyxJQUFJLENBQUNNLEdBQUwsQ0FBUzRHLEdBQVQsQ0FBYSxlQUFPMEIsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSDtBQUFGLEdBQTNCLENBQWIsQ0FBZDs7QUFDQSxRQUFNb1ksTUFBTSxHQUFHLG1CQUFTQSxNQUFULENBQWdCcmIsSUFBSSxDQUFDbkQsU0FBckIsQ0FBZjs7QUFDQSxRQUFNLENBQUMraEIsSUFBRCxFQUFPRyxLQUFQLEVBQWNDLEdBQWQsSUFBcUIzRCxNQUFNLENBQUNuZixLQUFQLENBQWEsR0FBYixDQUEzQjtBQUNBLFFBQU1nbkIsV0FBVyxHQUFHUCxhQUFhLENBQUMzaUIsSUFBSSxDQUFDdUksSUFBTixDQUFiLElBQTRCLEVBQWhEO0FBQ0EsUUFBTTRhLGFBQWEsR0FBR25qQixJQUFJLENBQUNrRSxLQUFMLENBQVdrZixXQUFYLEdBQXlCbm5CLElBQXpCLEVBQXRCO0FBQ0EsUUFBTXNmLFNBQVMsR0FBRzJILFdBQVcsR0FBR0MsYUFBaEM7QUFDQSxRQUFNamYsS0FBSyxHQUFHNUosSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQWEsZUFBTzhkLEtBQVAsQ0FBYW5jLEtBQWIsQ0FBbUJDLE9BQW5CLENBQTJCO0FBQUVtWTtBQUFGLEdBQTNCLENBQWIsQ0FBZDtBQUNBLFFBQU04SCxRQUFRLEdBQUcvb0IsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQ2YsZUFBTzhjLFFBQVAsQ0FBZ0JuYixLQUFoQixDQUFzQkMsT0FBdEIsQ0FBOEI7QUFBRW1ZLGFBQUY7QUFBYXFELFFBQWI7QUFBbUJHLFNBQW5CO0FBQTBCQztBQUExQixHQUE5QixDQURlLENBQWpCOztBQUlBLE1BQUksQ0FBQ2hmLElBQUksQ0FBQ3NqQixPQUFOLElBQWlCdGpCLElBQUksQ0FBQ2tFLEtBQUwsS0FBZSxLQUFwQyxFQUEyQztBQUN6QyxVQUFNcWYsT0FBTyxHQUFJLEdBQUVMLFdBQVksS0FBL0I7QUFDQSxVQUFNTSxRQUFRLEdBQUdscEIsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQ2YsZUFBTzhkLEtBQVAsQ0FBYW5jLEtBQWIsQ0FBbUJDLE9BQW5CLENBQTJCO0FBQUVtWSxlQUFTLEVBQUVnSTtBQUFiLEtBQTNCLENBRGUsQ0FBakI7QUFHQSxVQUFNRSxXQUFXLEdBQUducEIsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQ2xCLGVBQU84YyxRQUFQLENBQWdCbmIsS0FBaEIsQ0FBc0JDLE9BQXRCLENBQThCO0FBQzVCbVksZUFBUyxFQUFFZ0ksT0FEaUI7QUFFNUIzRSxVQUY0QjtBQUc1QkcsV0FINEI7QUFJNUJDO0FBSjRCLEtBQTlCLENBRGtCLENBQXBCO0FBU0F3RSxZQUFRLENBQUNFLEdBQVQsQ0FBYS9hLEtBQWI7QUFDQThhLGVBQVcsQ0FBQ0MsR0FBWixDQUFnQi9hLEtBQWhCO0FBQ0Q7O0FBRUQsTUFBSTNJLElBQUksQ0FBQ3VJLElBQUwsS0FBYyxZQUFsQixFQUFnQztBQUM5QixVQUFNb2IsT0FBTyxHQUFHM2pCLElBQUksQ0FBQ3VmLEdBQUwsR0FBVyxrQkFBU3ZmLElBQUksQ0FBQ3VmLEdBQWQsQ0FBWCxHQUFnQyxFQUFoRDtBQUNBLFVBQU10RCxVQUFVLEdBQUcsQ0FBQ2pjLElBQUksQ0FBQ3VmLEdBQUwsR0FDaEIsQ0FBQ29FLE9BQU8sQ0FBQ0MsSUFBUixJQUFnQkQsT0FBTyxDQUFDRSxNQUF4QixJQUFrQyxFQUFuQyxFQUF1QzFuQixPQUF2QyxDQUErQyxRQUEvQyxFQUF5RCxFQUF6RCxDQURnQixHQUVmLFFBQU82RCxJQUFJLENBQUNrRSxLQUFNLEVBRkosRUFHakJrZixXQUhpQixFQUFuQjtBQUlBLFVBQU1uZixNQUFNLEdBQUczSixJQUFJLENBQUNNLEdBQUwsQ0FBUzRHLEdBQVQsQ0FBYSxlQUFPd2EsTUFBUCxDQUFjN1ksS0FBZCxDQUFvQkMsT0FBcEIsQ0FBNEI7QUFBRTZZO0FBQUYsS0FBNUIsQ0FBYixDQUFmO0FBRUFoWSxVQUFNLENBQUN5ZixHQUFQLENBQVcvYSxLQUFYOztBQUVBLFFBQUkzSSxJQUFJLENBQUN1ZixHQUFULEVBQWM7QUFDWixZQUFNdUUsT0FBTyxHQUFHeHBCLElBQUksQ0FBQ00sR0FBTCxDQUFTNEcsR0FBVCxDQUFhLGVBQU9nZSxHQUFQLENBQVdyYyxLQUFYLENBQWlCQyxPQUFqQixDQUF5QjtBQUFFbWMsV0FBRyxFQUFFdmYsSUFBSSxDQUFDdWY7QUFBWixPQUF6QixDQUFiLENBQWhCLENBRFksQ0FHWjs7QUFDQXVFLGFBQU8sQ0FBQ0osR0FBUixDQUFZL2EsS0FBWjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSTNJLElBQUksQ0FBQzJVLElBQVQsRUFBZTtBQUNiLFVBQU1tTCxXQUFXLEdBQUd4bEIsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQ2xCLGVBQU9pYixnQkFBUCxDQUF3QnRaLEtBQXhCLENBQThCQyxPQUE5QixDQUFzQztBQUFFSCxhQUFPLEVBQUVqRCxJQUFJLENBQUMyVTtBQUFoQixLQUF0QyxDQURrQixDQUFwQjtBQUlBbUwsZUFBVyxDQUFDNEQsR0FBWixDQUFnQi9hLEtBQWhCO0FBQ0Q7O0FBRUQsTUFBSTNJLElBQUksQ0FBQytjLFNBQUwsSUFBa0IvYyxJQUFJLENBQUMyVSxJQUEzQixFQUFpQztBQUMvQixVQUFNakQsUUFBUSxHQUFHcFgsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQ2YsZUFBT3FULGFBQVAsQ0FBcUIxUixLQUFyQixDQUEyQkMsT0FBM0IsQ0FBbUM7QUFDakNILGFBQU8sRUFBRWpELElBQUksQ0FBQytjLFNBQUwsSUFBa0IvYyxJQUFJLENBQUMyVTtBQURDLEtBQW5DLENBRGUsQ0FBakI7QUFNQWpELFlBQVEsQ0FBQ2dTLEdBQVQsQ0FBYS9hLEtBQWI7QUFDRDs7QUFFRHpFLE9BQUssQ0FBQ3dmLEdBQU4sQ0FBVS9hLEtBQVY7QUFDQTBhLFVBQVEsQ0FBQ0ssR0FBVCxDQUFhL2EsS0FBYjtBQUNELENBbEZhLENBQWQ7QUFvRkEsTUFBTW9iLEdBQUcsR0FBRzNwQixDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFDQyxJQUFELEVBQU8wRixJQUFQLEtBQWdCO0FBQ2xDQSxNQUFJLENBQUNuRCxTQUFMLEdBQWlCbUQsSUFBSSxDQUFDbkQsU0FBTCxJQUFrQixJQUFJc2UsSUFBSixHQUFXQyxPQUFYLEVBQW5DLENBRGtDLENBQ3VCOztBQUN6RCxRQUFNdUUsWUFBWSxHQUFHLHlCQUFRM2YsSUFBUixDQUFyQjtBQUNBLFFBQU07QUFBRW5ELGFBQUY7QUFBYTBMLFFBQWI7QUFBbUJyRSxTQUFuQjtBQUEwQnRILFlBQTFCO0FBQW9DK1gsUUFBcEM7QUFBMENvSTtBQUExQyxNQUF3RC9jLElBQTlEO0FBQ0EsUUFBTWlELE9BQU8sR0FBRyx5QkFBUTtBQUN0QnBHLGFBRHNCO0FBRXRCMEwsUUFGc0I7QUFHdEJyRSxTQUhzQjtBQUl0QnRILFlBSnNCO0FBS3RCK1gsUUFMc0I7QUFNdEJvSSxhQU5zQjtBQU90QjRDO0FBUHNCLEdBQVIsQ0FBaEI7QUFVQSxRQUFNbFUsSUFBSSxHQUFHblIsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQWEsZUFBTzBCLEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRUg7QUFBRixHQUEzQixDQUFiLENBQWI7QUFDQSxRQUFNK2dCLFFBQVEsR0FBR3BuQixRQUFRLEdBQ3JCLGVBQU80WSxlQUFQLENBQXVCclMsS0FBdkIsQ0FBNkJDLE9BQTdCLENBQXFDO0FBQUVILFdBQUY7QUFBV3JHO0FBQVgsR0FBckMsQ0FEcUIsR0FFckIsZUFBT3FrQixTQUFQLENBQWlCOWQsS0FBakIsQ0FBdUJDLE9BQXZCLENBQStCO0FBQUVILFdBQU8sRUFBRTBjO0FBQVgsR0FBL0IsQ0FGSjtBQUlBLFFBQU1zRSxRQUFRLEdBQUc7QUFDZnhuQixNQUFFLEVBQUV3RyxPQURXO0FBRWZwRyxhQUZlO0FBR2YwTCxRQUhlO0FBSWZvWCxnQkFKZTtBQUtmM2YsUUFBSSxFQUFFO0FBQUUsV0FBS2drQjtBQUFQLEtBTFM7QUFNZmpFLFdBQU8sRUFBRTtBQUFFLFdBQUssZUFBT2dCLFlBQVAsQ0FBb0I1ZCxLQUFwQixDQUEwQkMsT0FBMUIsQ0FBa0M7QUFBRUg7QUFBRixPQUFsQztBQUFQLEtBTk07QUFPZitjLGFBQVMsRUFBRTtBQUFFLFdBQUssZUFBT2dCLGNBQVAsQ0FBc0I3ZCxLQUF0QixDQUE0QkMsT0FBNUIsQ0FBb0M7QUFBRUg7QUFBRixPQUFwQztBQUFQLEtBUEk7QUFRZjZjLGVBQVcsRUFBRTtBQUFFLFdBQUssZUFBT3JELGdCQUFQLENBQXdCdFosS0FBeEIsQ0FBOEJDLE9BQTlCLENBQXNDO0FBQUVIO0FBQUYsT0FBdEM7QUFBUCxLQVJFO0FBU2Z5TyxZQUFRLEVBQUU7QUFBRSxXQUFLLGVBQU9tRCxhQUFQLENBQXFCMVIsS0FBckIsQ0FBMkJDLE9BQTNCLENBQW1DO0FBQUVIO0FBQUYsT0FBbkM7QUFBUDtBQVRLLEdBQWpCO0FBWUEsTUFBSWlCLEtBQUosRUFDRStmLFFBQVEsQ0FBQy9mLEtBQVQsR0FBaUI7QUFBRSxTQUFLLGVBQU9vYixLQUFQLENBQWFuYyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFbVksZUFBUyxFQUFFclg7QUFBYixLQUEzQjtBQUFQLEdBQWpCO0FBQ0YsTUFBSXRILFFBQUosRUFBY3FuQixRQUFRLENBQUNqZ0IsTUFBVCxHQUFrQjtBQUFFLFNBQU0sSUFBR3BILFFBQVM7QUFBcEIsR0FBbEI7QUFDZCxNQUFJK1gsSUFBSixFQUNFc1AsUUFBUSxDQUFDbmdCLEVBQVQsR0FBYztBQUFFLFNBQUssZUFBT1osS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxhQUFPLEVBQUUwUjtBQUFYLEtBQTNCO0FBQVAsR0FBZDtBQUNGLE1BQUlvSSxTQUFKLEVBQ0VrSCxRQUFRLENBQUNoRSxPQUFULEdBQW1CO0FBQ2pCLFNBQUssZUFBTy9jLEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRUgsYUFBTyxFQUFFOFo7QUFBWCxLQUEzQjtBQURZLEdBQW5CO0FBSUZ6aUIsTUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQWF3aUIsUUFBYixFQUF1QkQsR0FBdkIsQ0FBMkIvakIsSUFBM0I7QUFDQXlMLE1BQUksQ0FBQ3NZLEdBQUwsQ0FBU0UsUUFBVDtBQUNBbkIsT0FBSyxDQUFDeG9CLElBQUQsRUFBTzJJLE9BQVAsRUFBZ0JqRCxJQUFoQixDQUFMO0FBQ0EsU0FBT3lMLElBQVA7QUFDRCxDQTdDVyxDQUFaO0FBK0NBLE1BQU00TyxNQUFNLEdBQUdqZ0IsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBQ0MsSUFBRCxFQUFPMEYsSUFBUCxLQUFnQjtBQUNyQyxRQUFNbkQsU0FBUyxHQUFHbUQsSUFBSSxDQUFDbkQsU0FBTCxJQUFrQixJQUFJc2UsSUFBSixHQUFXQyxPQUFYLEVBQXBDO0FBQ0EsUUFBTXZnQixJQUFJLEdBQUdQLElBQUksQ0FBQ29CLFVBQUwsRUFBYjtBQUVBLE1BQUlzRSxJQUFJLENBQUNrRSxLQUFULEVBQWdCbEUsSUFBSSxDQUFDa0UsS0FBTCxHQUFhbEUsSUFBSSxDQUFDa0UsS0FBTCxDQUFXa2YsV0FBWCxHQUF5Qm5uQixJQUF6QixFQUFiLENBSnFCLENBSXlCOztBQUM5RCxNQUFJK0QsSUFBSSxDQUFDaUUsTUFBVCxFQUFpQmpFLElBQUksQ0FBQ2lFLE1BQUwsR0FBY2pFLElBQUksQ0FBQ2lFLE1BQUwsQ0FBWW1mLFdBQVosR0FBMEJubkIsSUFBMUIsRUFBZCxDQUxvQixDQUs0Qjs7QUFDakUsTUFBSXBCLElBQUosRUFBVTtBQUNSbUYsUUFBSSxDQUFDZ0UsTUFBTCxHQUFjbkosSUFBSSxDQUFDMk4sS0FBbkIsQ0FEUSxDQUNrQjs7QUFDMUJ4SSxRQUFJLENBQUNwRCxRQUFMLEdBQWdCL0IsSUFBSSxDQUFDcXBCLEdBQXJCLENBRlEsQ0FFa0I7QUFDM0I7O0FBRUQsUUFBTXZiLEtBQUssR0FBR29iLEdBQUcsQ0FBQ3pwQixJQUFELEVBQU8sRUFBRSxHQUFHMEYsSUFBTDtBQUFXbkQsYUFBWDtBQUFzQjBMLFFBQUksRUFBRTtBQUE1QixHQUFQLENBQWpCOztBQUVBLE1BQUkxTixJQUFKLEVBQVU7QUFDUixVQUFNc3BCLFVBQVUsR0FBRyxlQUFPbEMsWUFBUCxDQUFvQjllLEtBQXBCLENBQTBCQyxPQUExQixDQUFrQztBQUNuRHhHLGNBQVEsRUFBRS9CLElBQUksQ0FBQ3FwQjtBQURvQyxLQUFsQyxDQUFuQjs7QUFHQSxVQUFNRSxlQUFlLEdBQUcsZUFBT3BDLGlCQUFQLENBQXlCN2UsS0FBekIsQ0FBK0JDLE9BQS9CLENBQXVDO0FBQzdEeEcsY0FBUSxFQUFFL0IsSUFBSSxDQUFDcXBCO0FBRDhDLEtBQXZDLENBQXhCOztBQUdBLFVBQU10TSxNQUFNLEdBQUd0ZCxJQUFJLENBQUNNLEdBQUwsQ0FBUzRHLEdBQVQsQ0FBYTJpQixVQUFiLENBQWY7QUFDQSxVQUFNaEksV0FBVyxHQUFHN2hCLElBQUksQ0FBQ00sR0FBTCxDQUFTNEcsR0FBVCxDQUFhNGlCLGVBQWIsQ0FBcEI7QUFFQTlwQixRQUFJLENBQUNNLEdBQUwsQ0FDR0MsSUFESCxHQUVHMkcsR0FGSCxDQUVPLFFBRlAsRUFHR3VpQixHQUhILENBR09uTSxNQUhQO0FBSUF0ZCxRQUFJLENBQUNNLEdBQUwsQ0FDR0MsSUFESCxHQUVHMkcsR0FGSCxDQUVPLGFBRlAsRUFHR3VpQixHQUhILENBR081SCxXQUhQO0FBSUF2RSxVQUFNLENBQUM4TCxHQUFQLENBQVcvYSxLQUFYO0FBQ0F3VCxlQUFXLENBQUN1SCxHQUFaLENBQWdCL2EsS0FBaEI7QUFDRDs7QUFFRCxTQUFPQSxLQUFQO0FBQ0QsQ0FwQ2MsQ0FBZjtBQXNDQSxNQUFNMlIsT0FBTyxHQUFHbGdCLENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQUNDLElBQUQsRUFBTzBGLElBQVAsS0FBZ0I7QUFDdEMsUUFBTW5GLElBQUksR0FBR1AsSUFBSSxDQUFDb0IsVUFBTCxFQUFiO0FBRUEsTUFBSXNFLElBQUksQ0FBQ2tFLEtBQVQsRUFBZ0JsRSxJQUFJLENBQUNrRSxLQUFMLEdBQWFsRSxJQUFJLENBQUNrRSxLQUFMLENBQVdrZixXQUFYLEdBQXlCbm5CLElBQXpCLEVBQWIsQ0FIc0IsQ0FHd0I7O0FBQzlELE1BQUlwQixJQUFKLEVBQVU7QUFDUm1GLFFBQUksQ0FBQ2dFLE1BQUwsR0FBY25KLElBQUksQ0FBQzJOLEtBQW5CLENBRFEsQ0FDa0I7O0FBQzFCeEksUUFBSSxDQUFDcEQsUUFBTCxHQUFnQi9CLElBQUksQ0FBQ3FwQixHQUFyQixDQUZRLENBRWtCO0FBQzNCOztBQUVELFFBQU12YixLQUFLLEdBQUdvYixHQUFHLENBQUN6cEIsSUFBRCxFQUFPLEVBQUUsR0FBRzBGLElBQUw7QUFBV3VJLFFBQUksRUFBRTtBQUFqQixHQUFQLENBQWpCOztBQUVBLE1BQUkxTixJQUFKLEVBQVU7QUFDUixVQUFNc3BCLFVBQVUsR0FBRyxlQUFPbEMsWUFBUCxDQUFvQjllLEtBQXBCLENBQTBCQyxPQUExQixDQUFrQztBQUNuRHhHLGNBQVEsRUFBRS9CLElBQUksQ0FBQ3FwQjtBQURvQyxLQUFsQyxDQUFuQjs7QUFHQSxVQUFNRyxZQUFZLEdBQUcsZUFBT3RDLGNBQVAsQ0FBc0I1ZSxLQUF0QixDQUE0QkMsT0FBNUIsQ0FBb0M7QUFDdkR4RyxjQUFRLEVBQUUvQixJQUFJLENBQUNxcEI7QUFEd0MsS0FBcEMsQ0FBckI7O0FBR0EsVUFBTXRNLE1BQU0sR0FBR3RkLElBQUksQ0FBQ00sR0FBTCxDQUFTNEcsR0FBVCxDQUFhMmlCLFVBQWIsQ0FBZjtBQUNBLFVBQU16UyxRQUFRLEdBQUdwWCxJQUFJLENBQUNNLEdBQUwsQ0FBUzRHLEdBQVQsQ0FBYTZpQixZQUFiLENBQWpCO0FBRUEvcEIsUUFBSSxDQUFDTSxHQUFMLENBQ0dDLElBREgsR0FFRzJHLEdBRkgsQ0FFTyxRQUZQLEVBR0d1aUIsR0FISCxDQUdPbk0sTUFIUDtBQUlBdGQsUUFBSSxDQUFDTSxHQUFMLENBQ0dDLElBREgsR0FFRzJHLEdBRkgsQ0FFTyxVQUZQLEVBR0d1aUIsR0FISCxDQUdPclMsUUFIUDtBQUlBa0csVUFBTSxDQUFDOEwsR0FBUCxDQUFXL2EsS0FBWDtBQUNBK0ksWUFBUSxDQUFDZ1MsR0FBVCxDQUFhL2EsS0FBYjtBQUNEOztBQUVELFNBQU9BLEtBQVA7QUFDRCxDQWxDZSxDQUFoQjtBQW9DQSxNQUFNNFIsSUFBSSxHQUFHbmdCLENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQUNDLElBQUQsRUFBTzBGLElBQVAsS0FBZ0I7QUFDbkMsUUFBTW5GLElBQUksR0FBR1AsSUFBSSxDQUFDb0IsVUFBTCxFQUFiO0FBRUEsTUFBSXNFLElBQUksQ0FBQ2tFLEtBQVQsRUFBZ0JsRSxJQUFJLENBQUNrRSxLQUFMLEdBQWFsRSxJQUFJLENBQUNrRSxLQUFMLENBQVdrZixXQUFYLEdBQXlCbm5CLElBQXpCLEVBQWIsQ0FIbUIsQ0FHMkI7O0FBQzlELE1BQUlwQixJQUFKLEVBQVU7QUFDUm1GLFFBQUksQ0FBQ2dFLE1BQUwsR0FBY25KLElBQUksQ0FBQzJOLEtBQW5CLENBRFEsQ0FDa0I7O0FBQzFCeEksUUFBSSxDQUFDcEQsUUFBTCxHQUFnQi9CLElBQUksQ0FBQ3FwQixHQUFyQixDQUZRLENBRWtCO0FBQzNCOztBQUVELFFBQU12YixLQUFLLEdBQUdvYixHQUFHLENBQUN6cEIsSUFBRCxFQUFPLEVBQUUsR0FBRzBGLElBQUw7QUFBV3VJLFFBQUksRUFBRTtBQUFqQixHQUFQLENBQWpCOztBQUVBLE1BQUkxTixJQUFKLEVBQVU7QUFDUixVQUFNc3BCLFVBQVUsR0FBRyxlQUFPbEMsWUFBUCxDQUFvQjllLEtBQXBCLENBQTBCQyxPQUExQixDQUFrQztBQUNuRHhHLGNBQVEsRUFBRS9CLElBQUksQ0FBQ3FwQjtBQURvQyxLQUFsQyxDQUFuQjs7QUFHQSxVQUFNdE0sTUFBTSxHQUFHdGQsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQWEyaUIsVUFBYixDQUFmO0FBRUE3cEIsUUFBSSxDQUFDTSxHQUFMLENBQ0dDLElBREgsR0FFRzJHLEdBRkgsQ0FFTyxRQUZQLEVBR0d1aUIsR0FISCxDQUdPbk0sTUFIUDtBQUlBQSxVQUFNLENBQUM4TCxHQUFQLENBQVcvYSxLQUFYO0FBQ0Q7O0FBRUQsU0FBT0EsS0FBUDtBQUNELENBekJZLENBQWI7QUEyQkEsTUFBTTZSLFNBQVMsR0FBR3BnQixDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFDQyxJQUFELEVBQU9pSyxJQUFQLEVBQWE3SCxJQUFiLEtBQXNCO0FBQzlDLFFBQU03QixJQUFJLEdBQUdQLElBQUksQ0FBQ29CLFVBQUwsRUFBYjtBQUVBLE1BQUksQ0FBQ2IsSUFBTCxFQUFXLE9BQU8sa0JBQVF5cEIsTUFBUixDQUFlLGVBQWYsQ0FBUDtBQUNYLE1BQUkzYixLQUFKOztBQUNBLFFBQU00YixTQUFTLEdBQUcsZUFBTzNHLFdBQVAsQ0FBbUJ6YSxLQUFuQixDQUF5QkMsT0FBekIsQ0FBaUM7QUFBRXhHLFlBQVEsRUFBRS9CLElBQUksQ0FBQ3FwQjtBQUFqQixHQUFqQyxDQUFsQjs7QUFDQSxRQUFNTSxLQUFLLEdBQUdscUIsSUFBSSxDQUFDTSxHQUFMLENBQVM0RyxHQUFULENBQWEraUIsU0FBYixFQUF3Qi9pQixHQUF4QixDQUE0QitDLElBQTVCLENBQWQ7QUFFQSxTQUFPaWdCLEtBQUssQ0FBQ3BwQixJQUFOLENBQVdxRixHQUFHLElBQUk7QUFDdkIsUUFBSUEsR0FBRyxJQUFJQSxHQUFHLENBQUNULElBQWYsRUFBcUI7QUFDbkJ3a0IsV0FBSyxDQUNGaGpCLEdBREgsQ0FDTyxNQURQLEVBRUdBLEdBRkgsQ0FFTyxNQUZQLEVBR0d1aUIsR0FISCxDQUdPcm5CLElBSFA7QUFJRCxLQUxELE1BS087QUFDTCxZQUFNc0QsSUFBSSxHQUFHO0FBQ1h0RCxZQURXO0FBRVg2aEIsYUFBSyxFQUFFaGEsSUFGSTtBQUdYZ0UsWUFBSSxFQUFFLFVBSEs7QUFJWHZFLGNBQU0sRUFBRW5KLElBQUksQ0FBQzJOLEtBSkY7QUFLWDVMLGdCQUFRLEVBQUUvQixJQUFJLENBQUNxcEI7QUFMSixPQUFiO0FBUUF2YixXQUFLLEdBQUdvYixHQUFHLENBQUN6cEIsSUFBRCxFQUFPMEYsSUFBUCxDQUFYO0FBQ0F3a0IsV0FBSyxDQUFDVCxHQUFOLENBQVVwYixLQUFWO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJELENBM0JpQixDQUFsQjtBQTZCQSxNQUFNOFIsSUFBSSxHQUFHcmdCLENBQUMsQ0FBQ0MsS0FBRixDQUFRLENBQUNDLElBQUQsRUFBT21DLEVBQVAsRUFBVzhMLElBQVgsRUFBaUJrYyxLQUFqQixLQUEyQjtBQUM5QyxRQUFNL0csS0FBSyxHQUFHcGpCLElBQUksQ0FBQ00sR0FBTCxDQUFTNEcsR0FBVCxDQUNaLGVBQU8rRyxJQUFJLEtBQUssSUFBVCxHQUFnQixjQUFoQixHQUFpQyxnQkFBeEMsRUFBMERwRixLQUExRCxDQUFnRUMsT0FBaEUsQ0FBd0U7QUFDdEVILFdBQU8sRUFBRXhHO0FBRDZELEdBQXhFLENBRFksQ0FBZDtBQU1BLFNBQU9paEIsS0FBSyxDQUFDbGMsR0FBTixDQUFVaWpCLEtBQVYsRUFBaUJWLEdBQWpCLENBQXFCLEdBQXJCLENBQVA7QUFDRCxDQVJZLENBQWI7QUFVTyxNQUFNN2dCLEtBQUssR0FBRztBQUNuQm1JLFVBRG1CO0FBRW5CRSxZQUZtQjtBQUduQndZLEtBSG1CO0FBSW5CMUosUUFKbUI7QUFLbkJDLFNBTG1CO0FBTW5CQyxNQU5tQjtBQU9uQkMsV0FQbUI7QUFRbkJDLE1BUm1CO0FBU25CcUk7QUFUbUIsQ0FBZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyU1A7O0FBQ0E7Ozs7QUFFQSxNQUFNcG1CLElBQUksR0FBR3RDLENBQUMsQ0FBQ2lDLE1BQUYsQ0FBUyxFQUFULEVBQWEsTUFBYixDQUFiO0FBQ0EsTUFBTWtqQixHQUFHLEdBQUdubEIsQ0FBQyxDQUFDaUMsTUFBRixDQUFTLEVBQVQsRUFBYSxLQUFiLENBQVo7QUFDQSxNQUFNNEgsTUFBTSxHQUFHN0osQ0FBQyxDQUFDMkIsT0FBRixDQUNiMm9CLE1BQU0sSUFBSTtBQUNSLE1BQUksQ0FBQ0EsTUFBTCxFQUFhLE9BQU8sRUFBUDtBQUNiLFFBQU1qWCxNQUFNLEdBQUcsa0JBQVNpWCxNQUFULENBQWY7QUFFQSxTQUFPLENBQUNqWCxNQUFNLENBQUNtVyxJQUFQLElBQWVuVyxNQUFNLENBQUNvVyxNQUF0QixJQUFnQyxFQUFqQyxFQUFxQzFuQixPQUFyQyxDQUE2QyxRQUE3QyxFQUF1RCxFQUF2RCxDQUFQO0FBQ0QsQ0FOWSxFQU9ib2pCLEdBUGEsQ0FBZjtBQVVPLE1BQU1vRixhQUFhLEdBQUc7QUFBRWpvQixNQUFGO0FBQVF1SDtBQUFSLENBQXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZQOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTTlDLEtBQUssR0FBRyxpQkFBUXZCLEtBQXRCO0FBQ0EsTUFBTW9ELEdBQUcsR0FBRzVJLENBQUMsQ0FBQzJCLE9BQUYsQ0FDVjNCLENBQUMsQ0FBQzJSLE1BQUYsQ0FBUzNSLENBQUMsQ0FBQ3NGLFFBQVgsQ0FEVSxFQUVWdEYsQ0FBQyxDQUFDNEIsR0FBRixDQUNFNUIsQ0FBQyxDQUFDMkIsT0FBRixDQUNFM0IsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLFNBQVAsQ0FERixFQUVFLGVBQU9xRCxLQUFQLENBQWFDLEtBQWIsQ0FBbUJtSSxLQUFuQixDQUF5QnVYLElBQXpCLENBQThCLGVBQU8zZixLQUFQLENBQWFDLEtBQTNDLENBRkYsQ0FERixDQUZVLEVBUVYsaUJBQVF2RCxLQVJFLENBQVo7QUFXQSxNQUFNeVQsS0FBSyxHQUFHalosQ0FBQyxDQUFDMkIsT0FBRixDQUNaM0IsQ0FBQyxDQUFDd3FCLE1BQUYsQ0FBUyxHQUFULENBRFksRUFFWnhxQixDQUFDLENBQUNtQyxNQUFGLENBQVNuQyxDQUFDLENBQUNxSCxVQUFYLEVBQXVCLEVBQXZCLENBRlksQ0FBZDs7QUFLQSxTQUFTNFosTUFBVCxDQUFnQnhlLFNBQWhCLEVBQTJCO0FBQ3pCLFFBQU1nb0IsQ0FBQyxHQUFHLElBQUkxSixJQUFKLENBQVN0ZSxTQUFTLElBQUksSUFBSXNlLElBQUosR0FBV0MsT0FBWCxFQUF0QixDQUFWO0FBQ0EsUUFBTXdELElBQUksR0FBR2lHLENBQUMsQ0FBQ0MsY0FBRixFQUFiO0FBQ0EsUUFBTS9GLEtBQUssR0FBRzhGLENBQUMsQ0FBQ0UsV0FBRixLQUFrQixDQUFoQztBQUNBLFFBQU1DLE1BQU0sR0FBR0gsQ0FBQyxDQUFDSSxVQUFGLEVBQWY7QUFFQSxTQUFRLEdBQUVyRyxJQUFLLElBQUdHLEtBQU0sSUFBR2lHLE1BQU8sRUFBbEM7QUFDRDs7QUFFTSxNQUFNRSxRQUFRLEdBQUc7QUFBRWxpQixLQUFGO0FBQU9xUSxPQUFQO0FBQWNsUyxPQUFkO0FBQXFCa2E7QUFBckIsQ0FBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QlA7O0FBQ0E7O0FBQ0Esd0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7OztBQUVBLE1BQU12ZixRQUFRLEdBQUc2SSxNQUFNLElBQUk7QUFDekIsUUFBTXdnQixRQUFRLEdBQUcsQ0FBQ3hnQixNQUFNLElBQUksRUFBWCxFQUFlekksS0FBZixDQUFxQixJQUFyQixFQUEyQkssTUFBM0IsQ0FBa0MsQ0FBQzhILEdBQUQsRUFBTStnQixJQUFOLEtBQWU7QUFDaEUsVUFBTUMsTUFBTSxHQUFHRCxJQUFJLENBQ2hCbnBCLElBRFksR0FFWkMsS0FGWSxDQUVOLEdBRk0sRUFHWkYsR0FIWSxDQUdSNUIsQ0FBQyxDQUFDNkIsSUFITSxFQUlaOFAsTUFKWSxDQUlMdkIsQ0FBQyxJQUFJQSxDQUpBLENBQWY7QUFNQSxRQUFJLENBQUM2YSxNQUFNLENBQUNwakIsTUFBWixFQUFvQixPQUFPb0MsR0FBUDtBQUNwQixXQUFPakssQ0FBQyxDQUFDNkMsU0FBRixDQUFZb29CLE1BQVosRUFBb0IsRUFBcEIsRUFBd0JoaEIsR0FBeEIsQ0FBUDtBQUNELEdBVGdCLEVBU2QsRUFUYyxDQUFqQjs7QUFXQSxRQUFNdEQsU0FBUyxHQUFHK0csQ0FBQyxJQUFJO0FBQ3JCLFFBQUl3ZCxLQUFLLEdBQUd4ZCxDQUFaO0FBRUEsUUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBakIsRUFBMkJ3ZCxLQUFLLEdBQUd4ZCxDQUFDLENBQUM1TCxLQUFGLENBQVEsR0FBUixDQUFSO0FBQzNCLFdBQU9vcEIsS0FBSyxJQUFJbHJCLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTzJvQixLQUFQLEVBQWNILFFBQWQsQ0FBaEI7QUFDRCxHQUxEOztBQU9BLFFBQU1uZ0IsU0FBUyxHQUFHOEMsQ0FBQyxJQUFJMU4sQ0FBQyxDQUFDbXJCLE1BQUYsQ0FBU3hrQixTQUFTLENBQUMrRyxDQUFELENBQWxCLENBQXZCOztBQUNBLFFBQU0vQyxRQUFRLEdBQUcrQyxDQUFDLElBQUk5QyxTQUFTLENBQUM4QyxDQUFELENBQVQsQ0FBYSxDQUFiLEtBQW1CLElBQXpDOztBQUNBLFFBQU0wZCxZQUFZLEdBQUcxZCxDQUFDLElBQUk5QyxTQUFTLENBQUM4QyxDQUFELENBQVQsQ0FBYXNHLEdBQWIsTUFBc0IsSUFBaEQ7O0FBRUEsUUFBTW5KLGFBQWEsR0FBRzZDLENBQUMsSUFBSTtBQUN6QixVQUFNNUssSUFBSSxHQUFHLE9BQU80SyxDQUFQLEtBQWEsUUFBYixHQUF3QkEsQ0FBQyxDQUFDNUwsS0FBRixDQUFRLEdBQVIsQ0FBeEIsR0FBdUM0TCxDQUFwRDtBQUNBLFVBQU1uSSxNQUFNLEdBQUcsRUFBZjtBQUNBLFFBQUk4bEIsSUFBSSxHQUFHM2QsQ0FBWDs7QUFFQSxXQUFPMmQsSUFBUCxFQUFhO0FBQ1hBLFVBQUksR0FBRzFnQixRQUFRLENBQUMsQ0FBQyxHQUFHN0gsSUFBSixFQUFVLEdBQUd5QyxNQUFiLENBQUQsQ0FBZjtBQUNBOGxCLFVBQUksSUFBSTlsQixNQUFNLENBQUN1QyxJQUFQLENBQVl1akIsSUFBWixDQUFSO0FBQ0Q7O0FBRUQsV0FBTzlsQixNQUFQO0FBQ0QsR0FYRDs7QUFhQSxRQUFNdUYsUUFBUSxHQUFHNEMsQ0FBQyxJQUFJO0FBQ3BCLFVBQU01SyxJQUFJLEdBQUcsT0FBTzRLLENBQVAsS0FBYSxRQUFiLEdBQXdCQSxDQUFDLENBQUM1TCxLQUFGLENBQVEsR0FBUixDQUF4QixHQUF1QzRMLENBQXBEO0FBRUEsV0FBTzlDLFNBQVMsQ0FBQzlILElBQUQsQ0FBVCxDQUFnQlgsTUFBaEIsQ0FBdUIsQ0FBQ21wQixLQUFELEVBQVFob0IsR0FBUixLQUFnQjtBQUM1QyxZQUFNQyxHQUFHLEdBQUdvSCxRQUFRLENBQUMsQ0FBQyxHQUFHN0gsSUFBSixFQUFVUSxHQUFWLENBQUQsQ0FBcEI7QUFFQSxhQUFPLENBQUMsR0FBR2dvQixLQUFKLEVBQVcsQ0FBQ2hvQixHQUFELEVBQU1DLEdBQU4sQ0FBWCxDQUFQO0FBQ0QsS0FKTSxFQUlKLEVBSkksQ0FBUDtBQUtELEdBUkQ7O0FBVUEsU0FBTztBQUNMZ0gsVUFESztBQUVMNUQsYUFGSztBQUdMZ0UsWUFISztBQUlMQyxhQUpLO0FBS0x3Z0IsZ0JBTEs7QUFNTHZnQixpQkFOSztBQU9MQztBQVBLLEdBQVA7QUFTRCxDQXZERDs7QUF5RE8sTUFBTXlnQixTQUFTLEdBQUc7QUFBRTdwQjtBQUFGLENBQWxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTXVrQixhQUFhLEdBQUcsQ0FBQ3VGLE1BQUQsRUFBUzVsQixJQUFULEtBQWtCO0FBQ3RDLFFBQU1na0IsUUFBUSxHQUFHNXBCLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxHQUFULENBQVAsRUFBc0JxRCxJQUF0QixDQUFqQjtBQUNBLFFBQU02bEIsTUFBTSxHQUFHenJCLENBQUMsQ0FBQ2dHLE9BQUYsQ0FDYixDQUFDLFVBQUQsRUFBYSxhQUFiLEVBQTRCLFNBQTVCLEVBQXVDLFdBQXZDLENBRGEsRUFFYmhHLENBQUMsQ0FBQzhDLElBQUYsQ0FBTzlDLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQVAsRUFBbUJxRCxJQUFuQixDQUFQLENBRmEsRUFJWmhFLEdBSlksQ0FJUjBCLEdBQUcsSUFBSXRELENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVdlLEdBQVgsQ0FBUCxFQUF3QnNDLElBQXhCLENBSkMsRUFLWjRCLElBTFksR0FNWndNLEdBTlksRUFBZjtBQU9BLFFBQU07QUFBRW5MO0FBQUYsTUFBYyxlQUFPZ2UsU0FBUCxDQUFpQjlkLEtBQWpCLENBQXVCbUksS0FBdkIsQ0FBNkIwWSxRQUE3QixLQUEwQyxFQUE5RDtBQUNBLFFBQU12bkIsRUFBRSxHQUFHckMsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLElBQVAsRUFBYUcsSUFBYixDQUFYO0FBRUEsU0FBT3ZELEVBQUUsSUFBSUEsRUFBRSxLQUFLd0csT0FBYixJQUF3QjRpQixNQUF4QixJQUFrQ0EsTUFBTSxHQUFHLGFBQWxEO0FBQ0QsQ0FiRDs7QUFlQSxNQUFNM0Ysb0JBQW9CLEdBQUcsQ0FBQzRGLE9BQUQsRUFBVTlsQixJQUFWLEtBQW1CO0FBQzlDLFFBQU12RCxFQUFFLEdBQUdyQyxDQUFDLENBQUN5RixJQUFGLENBQU8sSUFBUCxFQUFhRyxJQUFiLENBQVg7QUFFQSxTQUNFdkQsRUFBRSxJQUNGQSxFQUFFLEtBQ0EseUJBQVE7QUFDTkcsWUFBUSxFQUFFLENBQUN4QyxDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxRQUFELEVBQVcsR0FBWCxDQUFQLEVBQXdCcUQsSUFBeEIsS0FBaUMsRUFBbEMsRUFBc0MrbEIsTUFBdEMsQ0FBNkMsQ0FBN0MsS0FBbUQxZ0IsU0FEdkQ7QUFFTnhJLGFBQVMsRUFBRXVLLFFBQVEsQ0FBQ2hOLENBQUMsQ0FBQ3lGLElBQUYsQ0FBTyxXQUFQLEVBQW9CRyxJQUFwQixDQUFELEVBQTRCLEVBQTVCLENBRmI7QUFHTnVJLFFBQUksRUFBRW5PLENBQUMsQ0FBQ3lGLElBQUYsQ0FBTyxNQUFQLEVBQWVHLElBQWYsQ0FIQTtBQUlOa0UsU0FBSyxFQUFFOUosQ0FBQyxDQUFDeUYsSUFBRixDQUNMLFdBREssRUFFTCxlQUFPeWYsS0FBUCxDQUFhbmMsS0FBYixDQUFtQm1JLEtBQW5CLENBQXlCbFIsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsT0FBRCxFQUFVLEdBQVYsQ0FBUCxFQUF1QnFELElBQXZCLENBQXpCLENBRkssQ0FKRDtBQVFOMlUsUUFBSSxFQUFFdmEsQ0FBQyxDQUFDeUYsSUFBRixDQUNKLFNBREksRUFFSixlQUFPcUQsS0FBUCxDQUFhQyxLQUFiLENBQW1CbUksS0FBbkIsQ0FBeUJsUixDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFQLEVBQW9CcUQsSUFBcEIsQ0FBekIsQ0FGSSxDQVJBO0FBWU4rYyxhQUFTLEVBQUUzaUIsQ0FBQyxDQUFDeUYsSUFBRixDQUNULFNBRFMsRUFFVCxlQUFPcUQsS0FBUCxDQUFhQyxLQUFiLENBQW1CbUksS0FBbkIsQ0FBeUJsUixDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxTQUFELEVBQVksR0FBWixDQUFQLEVBQXlCcUQsSUFBekIsQ0FBekIsQ0FGUyxDQVpMO0FBZ0JOMmYsZ0JBQVksRUFBRXZsQixDQUFDLENBQUN5RixJQUFGLENBQU8sY0FBUCxFQUF1QkcsSUFBdkI7QUFoQlIsR0FBUixDQUhKO0FBc0JELENBekJEOztBQTJCQSxNQUFNZ21CLHNCQUFzQixHQUFHLENBQUNGLE9BQUQsRUFBVTlsQixJQUFWLEtBQW1CO0FBQ2hELFFBQU1wRCxRQUFRLEdBQUcsQ0FBQ3hDLENBQUMsQ0FBQ3VDLElBQUYsQ0FBTyxDQUFDLFFBQUQsRUFBVyxHQUFYLENBQVAsRUFBd0JxRCxJQUF4QixLQUFpQyxFQUFsQyxFQUFzQytsQixNQUF0QyxDQUE2QyxDQUE3QyxLQUFtRDFnQixTQUFwRTtBQUNBLFFBQU00Z0IsUUFBUSxHQUFHN3JCLENBQUMsQ0FBQ3lGLElBQUYsQ0FDZixVQURlLEVBRWYsZUFBTzJWLGVBQVAsQ0FBdUJyUyxLQUF2QixDQUE2Qm1JLEtBQTdCLENBQW1DbFIsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLEdBQVQsQ0FBUCxFQUFzQnFELElBQXRCLENBQW5DLENBRmUsQ0FBakI7QUFLQSxTQUFPcEQsUUFBUSxJQUFJQSxRQUFRLEtBQUtxcEIsUUFBaEM7QUFDRCxDQVJEOztBQVVBLE1BQU03Riw0QkFBNEIsR0FBRyxDQUFDMEYsT0FBRCxFQUFVOWxCLElBQVYsS0FBbUI7QUFDdEQsUUFBTTJmLFlBQVksR0FBR3ZsQixDQUFDLENBQUN5RixJQUFGLENBQU8sY0FBUCxFQUF1QkcsSUFBdkIsQ0FBckI7QUFDQSxRQUFNdkQsRUFBRSxHQUFHckMsQ0FBQyxDQUFDeUYsSUFBRixDQUNULFNBRFMsRUFFVCxlQUFPb2hCLFNBQVAsQ0FBaUI5ZCxLQUFqQixDQUF1Qm1JLEtBQXZCLENBQTZCbFIsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLEdBQVQsQ0FBUCxFQUFzQnFELElBQXRCLENBQTdCLENBRlMsQ0FBWDtBQUtBLFNBQU92RCxFQUFFLElBQUlBLEVBQUUsS0FBS2tqQixZQUFwQjtBQUNELENBUkQ7O0FBVUEsTUFBTXVHLHFCQUFxQixHQUFHQyxHQUFHLElBQUksQ0FDbkNDLFlBRG1DLEVBRW5DcG1CLElBRm1DLEVBR25DcW1CLFFBSG1DLEVBSW5DQyxNQUptQyxFQUtuQ0MsVUFMbUMsS0FNaEM7QUFDSCxRQUFNO0FBQUV0akI7QUFBRixNQUNKLGVBQU9DLEtBQVAsQ0FBYUMsS0FBYixDQUFtQm1JLEtBQW5CLENBQXlCbFIsQ0FBQyxDQUFDdUMsSUFBRixDQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBUCxFQUFtQjRwQixVQUFuQixLQUFrQyxFQUEzRCxLQUFrRSxFQURwRTs7QUFFQSxRQUFNO0FBQUV0akIsV0FBTyxFQUFFdWpCO0FBQVgsTUFBMkIsZUFBT0osWUFBUCxFQUFxQmpqQixLQUFyQixDQUEyQm1JLEtBQTNCLENBQy9CbFIsQ0FBQyxDQUFDeUYsSUFBRixDQUFPLEdBQVAsRUFBWUcsSUFBWixLQUFxQixFQURVLENBQWpDOztBQUlBLE1BQUksQ0FBQ2lELE9BQUQsSUFBWUEsT0FBTyxLQUFLdWpCLFdBQTVCLEVBQXlDLE9BQU8sS0FBUDtBQUN6QyxTQUFPTCxHQUFHLENBQUNNLE9BQUosQ0FBWTtBQUFFOUgsUUFBSSxFQUFHLDRCQUEyQnlILFlBQWE7QUFBakQsR0FBWixFQUNMcG1CLElBREssQ0FBUDtBQUdELENBakJEOztBQW1CQSxNQUFNMG1CLG9CQUFvQixHQUFHLENBQUNaLE9BQUQsRUFBVTlsQixJQUFWLEtBQW1CO0FBQzlDLFFBQU07QUFBRW1hLEtBQUY7QUFBSyxPQUFHd007QUFBUixNQUFtQjNtQixJQUFJLElBQUksRUFBakMsQ0FEOEMsQ0FDVDs7QUFFckMybUIsUUFBTSxDQUFDOXBCLFNBQVAsR0FBbUJDLFVBQVUsQ0FBQzZwQixNQUFNLENBQUM5cEIsU0FBUixFQUFtQixFQUFuQixDQUE3QjtBQUNBLFFBQU07QUFBRW9HO0FBQUYsTUFDSixlQUFPZ2UsU0FBUCxDQUFpQjlkLEtBQWpCLENBQXVCbUksS0FBdkIsQ0FBNkJsUixDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFQLEVBQW1CcUQsSUFBbkIsS0FBNEIsRUFBekQsS0FBZ0UsRUFEbEU7QUFHQSxTQUFPaUQsT0FBTyxJQUFJQSxPQUFPLEtBQUsseUJBQVEwakIsTUFBUixDQUE5QjtBQUNELENBUkQ7O0FBVUEsTUFBTUMsV0FBVyxHQUFHLENBQUNDLE1BQUQsRUFBU2pCLE1BQVQsRUFBaUIxTixNQUFqQixFQUF5QnVDLElBQXpCLEtBQWtDO0FBQ3BELFFBQU07QUFBRWdHLGFBQVMsR0FBRyxTQUFkO0FBQXlCckgsVUFBTSxHQUFHO0FBQWxDLE1BQXlDd00sTUFBTSxJQUFJLEVBQXpEO0FBRUEsUUFBTW5CLEtBQUssR0FBR3FDLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixNQUF0QixJQUNWRCxNQUFNLENBQUNFLElBQVAsQ0FBWXZNLElBQVosRUFBa0IsS0FBbEIsQ0FEVSxHQUVWLElBQUlxTSxNQUFKLENBQVdyTSxJQUFYLEVBQWlCLEtBQWpCLENBRko7QUFHQSxRQUFNd00sSUFBSSxHQUFHSCxNQUFNLENBQUNDLGNBQVAsQ0FBc0IsTUFBdEIsSUFDVEQsTUFBTSxDQUFDRSxJQUFQLENBQVl2QyxLQUFaLEVBQW1CLEtBQW5CLENBRFMsR0FFVCxJQUFJcUMsTUFBSixDQUFXckMsS0FBWCxFQUFrQixLQUFsQixDQUZKO0FBR0EsUUFBTXlDLElBQUksR0FBR0wsTUFBTSxDQUFDSyxJQUFQLENBQVloUCxNQUFaLEVBQW9CO0FBQy9CK08sUUFEK0I7QUFFL0J0RyxjQUFVLEVBQUV2SCxNQUFNLENBQUN1SCxVQUZZO0FBRy9CQyxZQUFRLEVBQUV4SCxNQUFNLENBQUN3SCxRQUhjO0FBSS9CQyxjQUFVLEVBQUV6SCxNQUFNLENBQUN5SCxVQUpZO0FBSy9CQyxlQUFXLEVBQUUxSCxNQUFNLENBQUMwSCxXQUxXO0FBTS9CcUcsT0FBRyxFQUFFLElBTjBCO0FBTy9CeGtCLFFBQUksRUFBRWtrQixNQUFNLENBQUNwRyxTQUFEO0FBUG1CLEdBQXBCLENBQWI7QUFTQSxNQUFJd0MsR0FBRyxHQUFHLENBQVY7QUFDQSxNQUFJdFYsQ0FBSjs7QUFFQSxPQUFLQSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLElBQUl5TCxNQUFNLENBQUNzSCxVQUFQLEdBQW9CLENBQXJDLEVBQXdDL1MsQ0FBQyxJQUFJLENBQUwsRUFBUXNWLEdBQUcsRUFBbkQsRUFBdUQ7QUFDckQsUUFBSWlFLElBQUksQ0FBQ2pFLEdBQUQsQ0FBSixLQUFjLENBQWxCLEVBQXFCLE9BQU8sS0FBUDtBQUN0Qjs7QUFDRCxRQUFNbUUsSUFBSSxHQUFHLFFBQVMsSUFBSXpaLENBQUosR0FBUXlMLE1BQU0sQ0FBQ3NILFVBQXJDO0FBRUEsU0FBTyxDQUFDd0csSUFBSSxDQUFDakUsR0FBRCxDQUFKLEdBQVltRSxJQUFiLE1BQXVCLENBQTlCO0FBQ0QsQ0EzQkQ7O0FBNkJBLE1BQU01RyxtQkFBbUIsR0FBRyxDQUFDb0YsTUFBRCxFQUFTNWxCLElBQVQsS0FBa0I7QUFDNUMsUUFBTTZtQixNQUFNLEdBQUdRLG1CQUFPLENBQUMsc0JBQUQsQ0FBdEI7O0FBRUEsTUFBSSxDQUFDUixNQUFMLEVBQWEsT0FBTyxJQUFQLENBSCtCLENBR2xCOztBQUMxQixRQUFNO0FBQUVwRyxhQUFTLEdBQUc7QUFBZCxNQUE0Qm1GLE1BQU0sSUFBSSxFQUE1QztBQUNBLFFBQU0xTixNQUFNLEdBQUc5ZCxDQUFDLENBQUN1QyxJQUFGLENBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFQLEVBQW1CcUQsSUFBbkIsQ0FBZjs7QUFFQSxNQUFJeWdCLFNBQVMsS0FBSyxTQUFsQixFQUE2QjtBQUMzQixVQUFNLElBQUlwSyxLQUFKLENBQVUsdUNBQVYsQ0FBTjtBQUNEOztBQUVEamMsR0FBQyxDQUFDZ0csT0FBRixDQUFVLENBQUMsR0FBRCxDQUFWLEVBQWlCaEcsQ0FBQyxDQUFDOEMsSUFBRixDQUFPOEMsSUFBUCxDQUFqQixFQUErQkssT0FBL0IsQ0FBdUNvYSxJQUFJLElBQUk7QUFDN0MsUUFBSSxDQUFDbU0sV0FBVyxDQUFDQyxNQUFELEVBQVNqQixNQUFULEVBQWlCMU4sTUFBakIsRUFBeUJ1QyxJQUF6QixDQUFoQixFQUFnRDtBQUM5Q3RRLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVosRUFBNEI4TixNQUE1QixFQUFvQ3VDLElBQXBDO0FBQ0EsYUFBT3phLElBQUksQ0FBQ3lhLElBQUQsQ0FBWDtBQUNEO0FBQ0YsR0FMRDtBQU1BLFNBQU8sSUFBUDtBQUNELENBbEJEOztBQW9CQSxNQUFNK0csb0JBQW9CLEdBQUcsQ0FDM0JvRSxNQUQyQixFQUUzQjVsQixJQUYyQixFQUczQnNuQixPQUgyQixFQUkzQkMsS0FKMkIsRUFLM0JoQixVQUwyQixFQU0zQmlCLFdBTjJCLEtBT3hCO0FBQ0gsUUFBTXRxQixJQUFJLEdBQUc5QyxDQUFDLENBQUNnRyxPQUFGLENBQVUsQ0FBQyxHQUFELENBQVYsRUFBaUJoRyxDQUFDLENBQUM4QyxJQUFGLENBQU84QyxJQUFQLENBQWpCLENBQWI7QUFDQSxRQUFNZ1YsSUFBSSxHQUFHNWEsQ0FBQyxDQUFDaUYsTUFBRixDQUFTLEVBQVQsRUFBYSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsRUFBeUJXLElBQXpCLENBQWI7QUFDQSxRQUFNeW5CLFFBQVEsR0FBR3J0QixDQUFDLENBQUM4QyxJQUFGLENBQU84WCxJQUFQLENBQWpCO0FBQ0EsUUFBTWhILE9BQU8sR0FBRzVULENBQUMsQ0FBQ3N0QixVQUFGLENBQWFELFFBQWIsRUFBdUJ2cUIsSUFBdkIsQ0FBaEI7O0FBRUEsTUFBSThRLE9BQU8sQ0FBQy9MLE1BQVosRUFBb0I7QUFDbEJrSSxXQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCNEQsT0FBdkI7QUFDQWhPLFFBQUksQ0FBQyxHQUFELENBQUosQ0FBVSxHQUFWLElBQWlCNUYsQ0FBQyxDQUFDdXRCLElBQUYsQ0FBTzNaLE9BQVAsRUFBZ0JnSCxJQUFoQixDQUFqQjtBQUNEOztBQUVELFNBQU8sSUFBUDtBQUNELENBbkJEOztBQXFCQSxNQUFNNFMsT0FBTyxHQUFHeHRCLENBQUMsQ0FBQzJCLE9BQUYsQ0FDZG9xQixHQUFHLElBQUk7QUFDTEEsS0FBRyxDQUFDMEIsVUFBSixDQUFlLGVBQWYsRUFBZ0M7QUFDOUJDLFlBQVEsRUFBRXpIO0FBRG9CLEdBQWhDO0FBR0E4RixLQUFHLENBQUMwQixVQUFKLENBQWUsc0JBQWYsRUFBdUM7QUFDckNDLFlBQVEsRUFBRTVIO0FBRDJCLEdBQXZDO0FBR0FpRyxLQUFHLENBQUMwQixVQUFKLENBQWUsNkJBQWYsRUFBOEM7QUFDNUNDLFlBQVEsRUFBRTlCO0FBRGtDLEdBQTlDO0FBR0FHLEtBQUcsQ0FBQzBCLFVBQUosQ0FBZSw4QkFBZixFQUErQztBQUM3Q0MsWUFBUSxFQUFFMUg7QUFEbUMsR0FBL0M7QUFHQStGLEtBQUcsQ0FBQzBCLFVBQUosQ0FBZSxrQkFBZixFQUFtQztBQUNqQ0MsWUFBUSxFQUFFNUIscUJBQXFCLENBQUNDLEdBQUQ7QUFERSxHQUFuQztBQUdBQSxLQUFHLENBQUMwQixVQUFKLENBQWUsMEJBQWYsRUFBMkM7QUFDekNDLFlBQVEsRUFBRXBCO0FBRCtCLEdBQTNDO0FBR0FQLEtBQUcsQ0FBQzBCLFVBQUosQ0FBZSxxQkFBZixFQUFzQztBQUNwQ0MsWUFBUSxFQUFFdEgsbUJBRDBCO0FBRXBDdUgsYUFBUyxFQUFFO0FBRnlCLEdBQXRDO0FBSUE1QixLQUFHLENBQUMwQixVQUFKLENBQWUsc0JBQWYsRUFBdUM7QUFDckNDLFlBQVEsRUFBRXRHLG9CQUQyQjtBQUVyQ3VHLGFBQVMsRUFBRTtBQUYwQixHQUF2QztBQUlBLFNBQU81QixHQUFQO0FBQ0QsQ0E3QmEsRUE4QmRqSSxHQUFHLENBQUMwSixPQTlCVSxDQUFoQjtBQWlDTyxNQUFNSSxVQUFVLEdBQUcscUNBQWlCO0FBQ3pDL0osYUFBVyxFQUFFLGVBQU9BLFdBRHFCO0FBRXpDOUUsTUFBSSxFQUFFL2UsQ0FBQyxDQUFDMkIsT0FBRixDQUNKNnJCLE9BREksRUFFSnh0QixDQUFDLENBQUN5UixNQUFGLENBQVM7QUFBRW9jLG9CQUFnQixFQUFFO0FBQXBCLEdBQVQsQ0FGSTtBQUZtQyxDQUFqQixDQUFuQjs7QUFRUCxNQUFNcE8sWUFBWSxHQUFHemYsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBQ0MsSUFBRCxFQUFPNHRCLE9BQVAsS0FDM0JBLE9BQU8sQ0FBQ3RPLEVBQVIsQ0FBVyxJQUFYLEVBQWlCLFNBQVN1TyxTQUFULENBQW1CQyxHQUFuQixFQUF3QjtBQUN2QyxRQUFNak8sQ0FBQyxHQUFHaU8sR0FBRyxDQUFDLEdBQUQsQ0FBYjtBQUVBLFNBQU9BLEdBQUcsQ0FBQyxHQUFELENBQVY7QUFDQSxNQUFJLFVBQVVBLEdBQVYsSUFBaUIsV0FBV0EsR0FBaEMsRUFBcUM7QUFDckMsTUFBSUEsR0FBRyxDQUFDckUsR0FBSixJQUFXLENBQUMzcEIsQ0FBQyxDQUFDOEMsSUFBRixDQUFPa3JCLEdBQUcsQ0FBQ3JFLEdBQVgsRUFBZ0I5aEIsTUFBaEMsRUFBd0M7QUFDeEMsUUFBTW9tQixPQUFPLEdBQUcvdEIsSUFBSSxDQUFDOGUsTUFBTCxDQUFZRSxpQkFBWixHQUNadlAsT0FBTyxDQUFDalAsT0FBUixDQUFnQnN0QixHQUFoQixDQURZLEdBRVpKLFVBQVUsQ0FBQ0YsUUFBWCxDQUFvQk0sR0FBcEIsQ0FGSjtBQUlBQyxTQUFPLENBQ0pqdEIsSUFESCxDQUNRa3RCLFNBQVMsSUFBSTtBQUNqQixRQUFJLENBQUNBLFNBQUwsRUFBZ0IsT0FBT25lLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaLEVBQW1DZ2UsR0FBbkMsQ0FBUDtBQUNoQkEsT0FBRyxDQUFDLEdBQUQsQ0FBSCxHQUFXak8sQ0FBWDtBQUNBLFdBQU8sS0FBS29PLEVBQUwsQ0FBUTlDLElBQVIsQ0FBYTJDLEdBQWIsQ0FBUDtBQUNELEdBTEgsRUFNR0ksS0FOSCxDQU1TdnRCLEdBQUcsSUFBSWtQLE9BQU8sQ0FBQ3NlLEtBQVIsQ0FBYyxjQUFkLEVBQThCTCxHQUE5QixFQUFtQ250QixHQUFHLENBQUN5dEIsS0FBSixJQUFhenRCLEdBQWhELENBTmhCO0FBT0QsQ0FqQkQsQ0FEbUIsQ0FBckI7QUFxQk8sTUFBTTB0QixVQUFVLEdBQUc7QUFDeEJ0SSxlQUR3QjtBQUV4Qkgsc0JBRndCO0FBR3hCOEYsd0JBSHdCO0FBSXhCNUYsOEJBSndCO0FBS3hCOEYsdUJBTHdCO0FBTXhCUSxzQkFOd0I7QUFPeEJFLGFBUHdCO0FBUXhCcEcscUJBUndCO0FBU3hCb0gsU0FUd0I7QUFVeEJJLFlBVndCO0FBV3hCbk87QUFYd0IsQ0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck9QOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztlQUNlLFdBQUtWLEk7Ozs7Ozs7Ozs7OztBQ2JwQixvRDs7Ozs7Ozs7Ozs7QUNBQSx1RDs7Ozs7Ozs7Ozs7QUNBQSw0RDs7Ozs7Ozs7Ozs7QUNBQSxpRTs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSxvRCIsImZpbGUiOiJub3RhYnVnLXBlZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwibm90YWJ1Zy1wZWVyXCIsIFtcImFyZ29uMlwiLCBcImd1bi1zY29wZVwiLCBcImd1bi1zdXBwcmVzc29yXCIsIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiLCBcIm9iamVjdC1oYXNoXCIsIFwicmFtZGFcIiwgXCJyb3V0ZS1wYXJzZXJcIiwgXCJ1cmktanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibm90YWJ1Zy1wZWVyXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXJnb24yXCIpLCByZXF1aXJlKFwiZ3VuLXNjb3BlXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3JcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIpLCByZXF1aXJlKFwib2JqZWN0LWhhc2hcIiksIHJlcXVpcmUoXCJyYW1kYVwiKSwgcmVxdWlyZShcInJvdXRlLXBhcnNlclwiKSwgcmVxdWlyZShcInVyaS1qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibm90YWJ1Zy1wZWVyXCJdID0gZmFjdG9yeShyb290W1wiYXJnb24yXCJdLCByb290W1wiZ3VuLXNjb3BlXCJdLCByb290W1wiZ3VuLXN1cHByZXNzb3JcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3Nvci1zZWFyXCJdLCByb290W1wib2JqZWN0LWhhc2hcIl0sIHJvb3RbXCJyYW1kYVwiXSwgcm9vdFtcInJvdXRlLXBhcnNlclwiXSwgcm9vdFtcInVyaS1qc1wiXSk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9hcmdvbjJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc2NvcGVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX3NlYXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9vYmplY3RfaGFzaF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JhbWRhX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcm91dGVfcGFyc2VyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuXG5jb25zdCBzaWdudXAgPSBSLmN1cnJ5KFxuICAocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkLCBvcHRzID0ge30pID0+XG4gICAgbmV3IFByb21pc2UoKG9rLCBmYWlsKSA9PiB7XG4gICAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBwZWVyLmd1bi51c2VyKCk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgIHVzZXIuY3JlYXRlKFxuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIGFjayA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY2suZXJyKSB7XG4gICAgICAgICAgICAgICAgZmFpbChhY2suZXJyKTtcbiAgICAgICAgICAgICAgICB1c2VyLmxlYXZlKCk7XG4gICAgICAgICAgICAgICAgcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVlci5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpLnRoZW4ob2spO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3B0c1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwoXCJTRUEgaXMgbm90IGxvYWRlZFwiKTtcbiAgICAgIH1cbiAgICB9KVxuKTtcblxuY29uc3QgbG9naW4gPSBSLmN1cnJ5KChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQpID0+XG4gIG5ldyBQcm9taXNlKChvaywgZmFpbCkgPT4ge1xuICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBwZWVyLmd1bi51c2VyKCk7XG5cbiAgICAgIHVzZXIuYXV0aCh1c2VybmFtZSwgcGFzc3dvcmQsIGFjayA9PlxuICAgICAgICBhY2suZXJyID8gZmFpbChhY2suZXJyKSA6IG9rKHBlZXIuZ3VuLnVzZXIoKS5pcylcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhaWwoXCJTRUEgaXMgbm90IGxvYWRlZFwiKTtcbiAgICB9XG4gIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICBwZWVyLl9vbkxvZ2luICYmIHBlZXIuX29uTG9naW4ocmVzdWx0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pXG4pO1xuXG5jb25zdCBsb2dvdXQgPSBwZWVyID0+IHBlZXIuZ3VuLnVzZXIoKS5sZWF2ZSgpO1xuY29uc3QgaXNMb2dnZWRJbiA9IHBlZXIgPT4gcGVlci5ndW4gJiYgcGVlci5ndW4udXNlciAmJiBwZWVyLmd1bi51c2VyKCkuaXM7XG5jb25zdCBvbkxvZ2luID0gUi5jdXJyeSgocGVlciwgZm4pID0+IChwZWVyLl9vbkxvZ2luID0gZm4pKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgY29uc3QgQXV0aGVudGljYXRpb24gPSB7XG4gIHNpZ251cCxcbiAgbG9naW4sXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgb25Mb2dpblxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuY29uc3QgdG9rZW5pemUgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIudHJpbSksXG4gIFIuc3BsaXQoXCIgXCIpLFxuICBSLnJlcGxhY2UoQ29uc3RhbnRzLkNPTU1BTkRfUkUsIFwiXCIpLFxuICBSLnByb3BPcihcIlwiLCAwKSxcbiAgUi5zcGxpdChcIlxcblwiKVxuKTtcblxuY29uc3QgbWFwID0gdGhpbmdEYXRhID0+XG4gIFIucmVkdWNlKFxuICAgIChjbWRNYXAsIGlkKSA9PiB7XG4gICAgICBjb25zdCBib2R5ID0gUi5wYXRoKFtpZCwgXCJib2R5XCJdLCB0aGluZ0RhdGEpO1xuICAgICAgY29uc3QgYXV0aG9ySWQgPSBSLnBhdGgoW2lkLCBcImF1dGhvcklkXCJdLCB0aGluZ0RhdGEpIHx8IFwiYW5vblwiO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gcGFyc2VGbG9hdChSLnBhdGgoW2lkLCBcInRpbWVzdGFtcFwiXSwgdGhpbmdEYXRhKSk7XG5cbiAgICAgIGlmICghUi50ZXN0KENvbnN0YW50cy5DT01NQU5EX1JFLCBib2R5KSkgcmV0dXJuIGNtZE1hcDtcbiAgICAgIGNvbnN0IHRva2VuaXplZCA9IFthdXRob3JJZCwgLi4udG9rZW5pemUoYm9keSksIGlkXTtcblxuICAgICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2VuaXplZCwgdGltZXN0YW1wIHx8IDAsIGNtZE1hcCk7XG4gICAgfSxcbiAgICB7fSxcbiAgICBSLmtleXModGhpbmdEYXRhKVxuICApO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudENvbW1hbmQgPSB7IHRva2VuaXplLCBtYXAgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IENvbmZpZyA9IHtcbiAgdGFidWxhdG9yOiBDb25zdGFudHMuSU5ERVhFUixcbiAgaW5kZXhlcjogQ29uc3RhbnRzLklOREVYRVIsXG4gIG93bmVyOiBDb25zdGFudHMuSU5ERVhFUixcbiAgdXBkYXRlOiBSLmNvbXBvc2UoXG4gICAgUi5tYXAoKFtrZXksIHZhbF0pID0+IChDb25maWdba2V5XSA9IHZhbCkpLFxuICAgIFIudG9QYWlyc1xuICApXG59O1xuIiwiY29uc3QgQ09NTUFORF9SRSA9IC9eIHs0fX4vO1xuY29uc3QgUFJFRklYID0gXCJuYWJcIjtcbmNvbnN0IFNPVUxfREVMSU1FVEVSID0gXCJ8fn58XCI7XG5cbmNvbnN0IExJU1RJTkdfU0laRSA9IDEwMDA7XG5cbmNvbnN0IE1BWF9IQVNIX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9QT1dfTk9OQ0VfU0laRSA9IDY0O1xuY29uc3QgTUFYX1RPUElDX1NJWkUgPSA0MjtcbmNvbnN0IE1BWF9BVVRIT1JfQUxJQVNfU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9BVVRIT1JfSURfU0laRSA9IDEyODsgLy8gPz8/XG5jb25zdCBNQVhfVVJMX1NJWkUgPSAyMDQ4O1xuY29uc3QgTUFYX0RPTUFJTl9TSVpFID0gMjU2O1xuY29uc3QgTUFYX1RISU5HX0tJTkRfU0laRSA9IDE2O1xuY29uc3QgTUFYX1RISU5HX1RJVExFX1NJWkUgPSAzMDA7XG5jb25zdCBNQVhfVEhJTkdfQk9EWV9TSVpFID0gNTAwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX0lEU19TSVpFID0gNTAwMDA7XG5jb25zdCBNQVhfTElTVElOR19TT1VSQ0VfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfVEFCU19TSVpFID0gNTAwMDtcblxuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9QUkVGSVhfU0laRSA9IE1BWF9UT1BJQ19TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUgPSBNQVhfQVVUSE9SX0lEX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSA9IDE2O1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfS0lORF9TSVpFID0gMTY7XG5cbmNvbnN0IENIQVRfUFJFTE9BRF9JVEVNUyA9IDEwO1xuXG5jb25zdCBJTkRFWEVSID1cbiAgXCJDRXlLckRkMXh5UFhwV1NWMDBNZ3ZuWlkyVkpMSFhnekN2aE1lRHdLVFlBLnlqU3EwRHlYenpoQl9aWHJfRHpmSmdpajN0WFUwLTN0MFE1YkpBdFpwajhcIjtcblxuZXhwb3J0IGNvbnN0IENvbnN0YW50cyA9IHtcbiAgQ09NTUFORF9SRSxcbiAgUFJFRklYLFxuICBTT1VMX0RFTElNRVRFUixcbiAgTElTVElOR19TSVpFLFxuICBNQVhfSEFTSF9TSVpFLFxuICBNQVhfUE9XX05PTkNFX1NJWkUsXG4gIE1BWF9UT1BJQ19TSVpFLFxuICBNQVhfQVVUSE9SX0FMSUFTX1NJWkUsXG4gIE1BWF9BVVRIT1JfSURfU0laRSxcbiAgTUFYX1VSTF9TSVpFLFxuICBNQVhfRE9NQUlOX1NJWkUsXG4gIE1BWF9USElOR19LSU5EX1NJWkUsXG4gIE1BWF9USElOR19USVRMRV9TSVpFLFxuICBNQVhfVEhJTkdfQk9EWV9TSVpFLFxuICBNQVhfTElTVElOR19JRFNfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1RBQlNfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9QUkVGSVhfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1RZUEVfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUsXG4gIENIQVRfUFJFTE9BRF9JVEVNUyxcbiAgSU5ERVhFUlxufTtcbiIsIi8qIGdsb2JhbHMgR3VuICovXG5pbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCBzb3VsID0gUi5wYXRoT3IoXCJcIiwgW1wiX1wiLCBcIiNcIl0pO1xuY29uc3Qgc3RhdGUgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0pO1xuXG5jb25zdCBsYXRlc3QgPSBSLmNvbXBvc2UoXG4gIFIubGFzdCxcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIudmFsdWVzLFxuICBzdGF0ZVxuKTtcblxuY29uc3QgZWRnZXMgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIucHJvcChcIiNcIikpLFxuICBSLnZhbHVlc1xuKTtcblxuZnVuY3Rpb24gZGVjb2RlU0VBKHJhd0RhdGEpIHtcbiAgY29uc3QgZGF0YSA9IHJhd0RhdGEgPyB7IC4uLnJhd0RhdGEgfSA6IHJhd0RhdGE7XG4gIGNvbnN0IHNvdWwgPSBSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpO1xuXG4gIGlmICghc291bCB8fCAhR3VuLlNFQSB8fCBzb3VsLmluZGV4T2YoXCJ+XCIpID09PSAtMSkgcmV0dXJuIHJhd0RhdGE7XG4gIFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpLmZvckVhY2goa2V5ID0+IHtcbiAgICBHdW4uU0VBLnZlcmlmeShcbiAgICAgIEd1bi5TRUEub3B0LnBhY2socmF3RGF0YVtrZXldLCBrZXksIHJhd0RhdGEsIHNvdWwpLFxuICAgICAgZmFsc2UsXG4gICAgICByZXMgPT4gKGRhdGFba2V5XSA9IEd1bi5TRUEub3B0LnVucGFjayhyZXMsIGtleSwgcmF3RGF0YSkpXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IEd1bk5vZGUgPSB7IHNvdWwsIHN0YXRlLCBsYXRlc3QsIGVkZ2VzLCBkZWNvZGVTRUEgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlLCBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuXG5jb25zdCBuZWVkc1Njb3JlcyA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInNvcnQgaG90XCIsXG4gICAgXCJzb3J0IHRvcFwiLFxuICAgIFwic29ydCBiZXN0XCIsXG4gICAgXCJzb3J0IGNvbnRyb3ZlcnNpYWxcIixcbiAgICBcInVwc1wiLFxuICAgIFwiZG93bnNcIixcbiAgICBcInNjb3JlXCIsXG4gICAgXCJjYW4gcmVtb3ZlXCJcbiAgXSk7XG5cbmNvbnN0IG5lZWRzRGF0YSA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInRvcGljXCIsXG4gICAgXCJkb21haW5cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidW5pcXVlIGJ5IGNvbnRlbnRcIixcbiAgICBcImtpbmRcIixcbiAgICBcInR5cGVcIixcbiAgICBcInJlcXVpcmUgc2lnbmVkXCIsXG4gICAgXCJyZXF1aXJlIGFub25cIixcbiAgICBcImFsaWFzXCIsXG4gICAgXCJiYW4gZG9tYWluXCIsXG4gICAgXCJiYW4gdG9waWNcIixcbiAgICBcImJhbiBhdXRob3JcIixcbiAgICBcImJhbiBhbGlhc1wiXG4gIF0pO1xuXG5jb25zdCBpdGVtc0Zyb21UaGluZ1NvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoXG4gICAgUi5tYXAoc291bCA9PiBMaXN0aW5nU29ydC5pdGVtRnJvbVNvdWwoc2NvcGUsIHNvdWwsIGRlZmluaXRpb24pLCBzb3VscylcbiAgKS50aGVuKExpc3RpbmdTb3J0LnNvcnRJdGVtcylcbik7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KChzY29wZSwgc291bHMsIGRlZmluaXRpb24pID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgIC50aGVuKFIucmVkdWNlKFIubWVyZ2VSaWdodCwge30pKVxuICAgIC50aGVuKFRoaW5nU2V0LnNvdWxzKVxuICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbGlzdGluZ3MgPSBSLnBhdGhPcihbXSwgW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwibGlzdGluZ3NcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGwgPT4gYCR7bH0vJHtzb3J0fWAsIGxpc3RpbmdzKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMgfTtcbn07XG5cbmNvbnN0IHRvcGljU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgdG9waWNzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInRvcGljc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCF0b3BpY3MubGVuZ3RoKSB0b3BpY3MucHVzaChcImFsbFwiKTtcbiAgLy8gY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAodCA9PiBgL3QvJHt0fS8ke3NvcnR9YCwgdG9waWNzKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvdC8ke3RvcGljcy5zb3J0KCkuam9pbihcIitcIil9LyR7c29ydH1gXTtcblxuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlUb3BpYyhzY29wZSwgeyB0b3BpY3MsIHNvcnQgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBkb21haW5Tb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBkb21haW5zID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImRvbWFpbnNcIl0sIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghZG9tYWlucy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgLy8gY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoZCA9PiBgL2RvbWFpbi8ke2R9LyR7c29ydH1gLCBkb21haW5zKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvZG9tYWluLyR7ZG9tYWlucy5zb3J0KCkuam9pbihcIitcIil9LyR7c29ydH1gXTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpRG9tYWluKHNjb3BlLCB7IGRvbWFpbnMsIHNvcnQgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBhdXRob3JTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBhdXRob3JJZHMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiYXV0aG9yc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHR5cGUgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidHlwZVwiXSwgZGVmaW5pdGlvbik7XG5cbiAgaWYgKCFhdXRob3JJZHMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGlkID0+IGAvdXNlci8ke2lkfS8ke3R5cGV9LyR7c29ydH1gLCBhdXRob3JJZHMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlBdXRob3Ioc2NvcGUsIHsgdHlwZSwgYXV0aG9ySWRzIH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgY3VyYXRvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGN1cmF0b3JzID0gUi5wcm9wKFwiY3VyYXRvcnNcIiwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFjdXJhdG9ycy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9L2NvbW1lbnRlZC8ke3NvcnR9YCwgY3VyYXRvcnMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkuY3VyYXRlZChzY29wZSwgY3VyYXRvcnMsIHRydWUpXG4gICAgICAudGhlbihpZHMgPT4gaWRzLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkpXG4gICAgICAudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IG9wU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3Qgc3VibWlzc2lvbklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJvcHNcIl0sIGRlZmluaXRpb24pO1xuXG4gIGlmICghc3VibWlzc2lvbklkcy5sZW5ndGgpIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChcbiAgICBpZCA9PiBgL3RoaW5ncy8ke2lkfS9jb21tZW50cy8ke3NvcnR9YCxcbiAgICBzdWJtaXNzaW9uSWRzXG4gICk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVN1Ym1pc3Npb24oc2NvcGUsIHsgc3VibWlzc2lvbklkcyB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHJlcGxpZXNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBpZCA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJyZXBsaWVzVG9cIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB0eXBlID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInR5cGVcIl0sIGRlZmluaXRpb24pO1xuXG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL3VzZXIvJHtpZH0vcmVwbGllcy8ke3R5cGV9LyR7c29ydH1gXTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5LnJlcGxpZXNUb0F1dGhvcihzY29wZSwge1xuICAgICAgdHlwZSxcbiAgICAgIHJlcGxpZXNUb0F1dGhvcklkOiBpZCxcbiAgICAgIGluZGV4ZXI6IGRlZmluaXRpb24uaW5kZXhlclxuICAgIH0pLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBzb3VyY2VzID0ge1xuICBsaXN0aW5nOiBsaXN0aW5nU291cmNlLFxuICByZXBsaWVzOiByZXBsaWVzU291cmNlLFxuICBvcDogb3BTb3VyY2UsXG4gIGN1cmF0b3I6IGN1cmF0b3JTb3VyY2UsXG4gIGF1dGhvcjogYXV0aG9yU291cmNlLFxuICBkb21haW46IGRvbWFpblNvdXJjZSxcbiAgdG9waWM6IHRvcGljU291cmNlXG59O1xuXG5jb25zdCBzb3VyY2VOYW1lcyA9IFIua2V5cyhzb3VyY2VzKTtcbmNvbnN0IHNvdXJjZU5hbWUgPSBkZWYgPT4gUi5maW5kKGRlZi5pc1ByZXNlbnQsIHNvdXJjZU5hbWVzKSB8fCBcInRvcGljXCI7XG5jb25zdCBmcm9tRGVmaW5pdGlvbiA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBuYW1lID0gc291cmNlTmFtZShkZWZpbml0aW9uKTtcblxuICByZXR1cm4gUi5tZXJnZUxlZnQoeyBuYW1lIH0sIHNvdXJjZXNbbmFtZV0oZGVmaW5pdGlvbikpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEYXRhU291cmNlID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgc291cmNlcyxcbiAgbmVlZHNTY29yZXMsXG4gIG5lZWRzRGF0YSxcbiAgaXRlbXNGcm9tVGhpbmdTZXRzLFxuICBpdGVtc0Zyb21UaGluZ1NvdWxzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IChzb3VyY2UsIG93bmVySWQgPSBudWxsLCBzcGFjZU5hbWUgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuICBjb25zdCBvYmogPSB7IC4uLnRva2VuaXplZCB9O1xuICBjb25zdCB7IGlzUHJlc2VudCwgZ2V0VmFsdWUsIGdldFZhbHVlcywgZ2V0VmFsdWVDaGFpbiwgZ2V0UGFpcnMgfSA9IHRva2VuaXplZDtcblxuICBbXG4gICAgb2JqLmZyb21QYWdlQXV0aG9yID0gb3duZXJJZCxcbiAgICBvYmouZnJvbVBhZ2VOYW1lID0gc3BhY2VOYW1lID8gYHNwYWNlOiR7c3BhY2VOYW1lfWAgOiB1bmRlZmluZWRcbiAgXSA9IGdldFZhbHVlQ2hhaW4oXCJzb3VyY2VkIGZyb20gcGFnZVwiKTtcbiAgb2JqLmRpc3BsYXlOYW1lID0gdG9rZW5pemVkLmdldFZhbHVlKFwibmFtZVwiKSB8fCBzcGFjZU5hbWU7XG4gIG9iai5pbmRleGVyID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgQ29uZmlnLmluZGV4ZXI7XG4gIG9iai50YWJ1bGF0b3IgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBvYmouaW5kZXhlcjtcbiAgb2JqLnRhYnMgPSBnZXRQYWlycyhcInRhYlwiKTtcbiAgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInNvcnRcIik7XG5cbiAgLy8gVE9ETzogYnJlYWtzIHdpdGggY3VzdG9tIG5hbWVzXG4gIGlmIChvYmouc29ydCA9PT0gXCJkZWZhdWx0XCIpIG9iai5zb3J0ID0gZ2V0VmFsdWUoXCJ0YWJcIik7XG5cbiAgb2JqLnVuaXF1ZUJ5Q29udGVudCA9ICEhaXNQcmVzZW50KFwidW5pcXVlIGJ5IGNvbnRlbnRcIik7XG4gIG9iai5jdXJhdG9ycyA9IGdldFZhbHVlcyhcImN1cmF0b3JcIik7XG4gIG9iai5tb2RlcmF0b3JzID0gZ2V0VmFsdWVzKFwibW9kXCIpO1xuICBvYmouaW5jbHVkZVJhbmtzID0gISFpc1ByZXNlbnQoXCJzaG93IHJhbmtzXCIpO1xuICBvYmouc3RpY2t5SWRzID0gZ2V0VmFsdWVzKFwic3RpY2t5XCIpO1xuICBvYmouaXNJZFN0aWNreSA9IGlkID0+ICEhdG9rZW5pemVkLmlzUHJlc2VudChbXCJzdGlja3lcIiwgaWRdKTtcbiAgb2JqLmlzQ2hhdCA9ICEhaXNQcmVzZW50KFwiZGlzcGxheSBhcyBjaGF0XCIpO1xuICBvYmouc3VibWl0VG9waWNzID0gZ2V0VmFsdWVzKFwic3VibWl0IHRvXCIpO1xuICBvYmouc3VibWl0VG9waWMgPSBnZXRWYWx1ZShcInN1Ym1pdCB0b1wiKTtcbiAgb2JqLmNoYXRUb3BpYyA9IGdldFZhbHVlKFwiY2hhdCBpblwiKTtcblxuICBpZiAob3duZXJJZCAmJiBzcGFjZU5hbWUpIHtcbiAgICBvYmouc3BhY2VOYW1lID0gc3BhY2VOYW1lO1xuICAgIG9iai5vd25lciA9IG93bmVySWQ7XG4gICAgb2JqLnVzZUZvckNvbW1lbnRzID0gIXRva2VuaXplZC5pc1ByZXNlbnQoXCJjb21tZW50cyBsZWF2ZSBzcGFjZVwiKTtcbiAgICBvYmouYmFzZVBhdGggPSBgL3VzZXIvJHtvd25lcklkfS9zcGFjZXMvJHtzcGFjZU5hbWV9YDtcbiAgICBpZiAob2JqLnN1Ym1pdFRvcGljKSBvYmouc3VibWl0UGF0aCA9IGAke29iai5iYXNlUGF0aH0vc3VibWl0YDtcbiAgICBvYmouZGVmYXVsdFRhYiA9IHRva2VuaXplZC5nZXRWYWx1ZShcInRhYlwiKTtcbiAgICBvYmouZGVmYXVsdFRhYlBhdGggPSBvYmouZGVmYXVsdFRhYlxuICAgICAgPyB0b2tlbml6ZWQuZ2V0VmFsdWUoW1widGFiXCIsIG9iai5kZWZhdWx0VGFiXSlcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIG9iai5maWx0ZXJzID0ge1xuICAgIGZ1bmN0aW9uczogW10sXG4gICAgYWxsb3c6IHtcbiAgICAgIHJlcGxpZXNUbzogZ2V0VmFsdWUoXCJyZXBsaWVzIHRvIGF1dGhvclwiKSxcbiAgICAgIHR5cGU6IGdldFZhbHVlKFwidHlwZVwiKSwgLy8gVE9ETzogdGhpcyBmaWVsZCBzZWVtcyByZWR1bmRhbnQgd2l0aCBraW5kIGFuZCBzaG91bGQgYmUgZGVwcmVjYXRlZFxuICAgICAgb3BzOiBnZXRWYWx1ZXMoXCJvcFwiKSxcbiAgICAgIGFsaWFzZXM6IGdldFZhbHVlcyhcImFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYXV0aG9yXCIpLFxuICAgICAgZG9tYWluczogZ2V0VmFsdWVzKFwiZG9tYWluXCIpLFxuICAgICAgdG9waWNzOiBnZXRWYWx1ZXMoXCJ0b3BpY1wiKSxcbiAgICAgIGxpc3RpbmdzOiBnZXRWYWx1ZXMoXCJsaXN0aW5nXCIpLFxuICAgICAga2luZHM6IGdldFZhbHVlcyhcImtpbmRcIiksXG4gICAgICBhbm9uOiAhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICFpc1ByZXNlbnQoXCJyZXF1aXJlIGFub25cIilcbiAgICB9LFxuICAgIGRlbnk6IHtcbiAgICAgIGFsaWFzZXM6IGdldFZhbHVlcyhcImJhbiBhbGlhc1wiKSxcbiAgICAgIGF1dGhvcnM6IGdldFZhbHVlcyhcImJhbiBhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJiYW4gZG9tYWluXCIpLFxuICAgICAgdG9waWNzOiBnZXRWYWx1ZXMoXCJiYW4gdG9waWNcIiksXG4gICAgICBhbm9uOiAhIWlzUHJlc2VudChcInJlcXVpcmUgc2lnbmVkXCIpLFxuICAgICAgc2lnbmVkOiAhIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKSxcbiAgICAgIHRhZ3M6IGdldFBhaXJzKFwiY2FuIHJlbW92ZVwiKVxuICAgIH1cbiAgfTtcblxuICBvYmoudm90ZUZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICB1cHNNaW46IHBhcnNlSW50KGdldFZhbHVlKFwidXBzIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICB1cHNNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwidXBzIGJlbG93XCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgZG93bnNNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwiZG93bnMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWluOiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBzY29yZU1heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJzY29yZSBiZWxvd1wiKSwgMTApIHx8IG51bGxcbiAgfTtcblxuICBvYmouY2Vuc29ycyA9IFIudW5pcShSLm1hcChSLnByb3AoMSksIG9iai5maWx0ZXJzLmRlbnkudGFncykpO1xuICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEZWZpbml0aW9uID0geyBmcm9tU291cmNlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcblxuY29uc3QgaW50UGF0aCA9IHAgPT5cbiAgUi5jb21wb3NlKFxuICAgIHBhcnNlSW50LFxuICAgIFIucGF0aChwKVxuICApO1xuXG5jb25zdCBmcm9tRGVmaW5pdGlvbiA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IGZpbHRlcnMsIHZvdGVGaWx0ZXJzLCBpc1ByZXNlbnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGZpbHRlckZ1bmN0aW9ucyA9IFtdO1xuICBjb25zdCB2b3RlRmlsdGVyRnVuY3Rpb25zID0gW107XG5cbiAgY29uc3QgYWRkRmlsdGVyID0gKC4uLmZucykgPT4gZmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuICBjb25zdCBhZGRWb3RlRmlsdGVyID0gKC4uLmZucykgPT4gdm90ZUZpbHRlckZ1bmN0aW9ucy5wdXNoKFIuY29tcG9zZSguLi5mbnMpKTtcblxuICBpZiAoZmlsdGVycy5hbGxvdy5hbGlhc2VzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJhbGlhc1wiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9yXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LmF1dGhvcnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImF1dGhvclwiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuZG9tYWlucy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgdCA9PiAhIWlzUHJlc2VudChbXCJkb21haW5cIiwgdF0pLFxuICAgICAgVGhpbmdEYXRhTm9kZS5kb21haW4sXG4gICAgICBSLnByb3AoXCJkYXRhXCIpXG4gICAgKTtcblxuICBpZiAoXG4gICAgZmlsdGVycy5hbGxvdy50b3BpY3MubGVuZ3RoICYmXG4gICAgIVIuZmluZChcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi5pZGVudGljYWwoXCJhbGxcIiksXG4gICAgICAgIFIubGFzdCxcbiAgICAgICAgUi5zcGxpdChcIjpcIilcbiAgICAgICksXG4gICAgICBmaWx0ZXJzLmFsbG93LnRvcGljc1xuICAgIClcbiAgKVxuICAgIGFkZEZpbHRlcihpdGVtID0+IHtcbiAgICAgIGxldCB0b3BpYyA9IFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0sIGl0ZW0pO1xuICAgICAgY29uc3Qga2luZCA9IFIucGF0aChbXCJkYXRhXCIsIFwia2luZFwiXSwgaXRlbSk7XG5cbiAgICAgIGlmIChraW5kID09PSBcImNoYXRtc2dcIikgdG9waWMgPSBgY2hhdDoke3RvcGljfWA7XG4gICAgICBpZiAoa2luZCA9PT0gXCJjb21tZW50XCIpIHRvcGljID0gYGNvbW1lbnRzOiR7dG9waWN9YDtcbiAgICAgIHJldHVybiAhIWlzUHJlc2VudChbXCJ0b3BpY1wiLCB0b3BpY10pO1xuICAgIH0pO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmtpbmRzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoa2luZCA9PiAhIWlzUHJlc2VudChbXCJraW5kXCIsIGtpbmRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LnR5cGUgPT09IFwiY29tbWFuZHNcIilcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSksXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYm9keVwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkuYWxpYXNlcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYWxpYXMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhbGlhc1wiLCBhbGlhc10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hdXRob3JzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhdXRob3JJZCA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImF1dGhvclwiLCBhdXRob3JJZF0pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmRvbWFpbnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGRvbWFpbiA9PiAhZG9tYWluIHx8ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiZG9tYWluXCIsIGRvbWFpbl0pLFxuICAgICAgVGhpbmdEYXRhTm9kZS5kb21haW5cbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LnRvcGljcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgdG9waWMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJ0b3BpY1wiLCB0b3BpY10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmFub24pIGFkZEZpbHRlcihSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuc2lnbmVkKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgYXV0aG9ySWQgPT4gIWF1dGhvcklkLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnVwc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMudXBzTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMudXBzTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLmRvd25zTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuZG93bnNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5zY29yZU1pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5zY29yZU1heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkudGFncy5sZW5ndGgpXG4gICAgYWRkVm90ZUZpbHRlcih0aGluZyA9PiB7XG4gICAgICBjb25zdCBjbWRzID0gUi5wYXRoKFtcInZvdGVzXCIsIFwiY29tbWFuZHNcIl0sIHRoaW5nKSB8fCB7fTtcblxuICAgICAgcmV0dXJuICFmaWx0ZXJzLmRlbnkudGFncy5maW5kKFxuICAgICAgICAoW3RhZ05hbWUsIGF1dGhvcklkXSkgPT4gISFSLnBhdGgoW2F1dGhvcklkLCBcInRhZ1wiLCB0YWdOYW1lXSwgY21kcylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgY29uc3QgY29udGVudEZpbHRlciA9IHRoaW5nID0+ICFmaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3Qgdm90ZUZpbHRlciA9IHRoaW5nID0+ICF2b3RlRmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHRoaW5nRmlsdGVyID0gdGhpbmcgPT5cbiAgICBkZWZpbml0aW9uLmlzSWRTdGlja3koUi5wcm9wKFwiaWRcIiwgdGhpbmcpKSB8fFxuICAgIChjb250ZW50RmlsdGVyKHRoaW5nKSAmJiB2b3RlRmlsdGVyKHRoaW5nKSk7XG5cbiAgcmV0dXJuIHsgdGhpbmdGaWx0ZXIsIGNvbnRlbnRGaWx0ZXIsIHZvdGVGaWx0ZXIgfTtcbn07XG5cbmNvbnN0IGdldEZpbHRlcmVkUm93cyA9IGFzeW5jIChcbiAgc2NvcGUsXG4gIHNwZWMsXG4gIHNvcnRlZFJvd3MsXG4gIHsgbGltaXQ6IGxpbWl0UHJvcCA9IDI1LCBjb3VudDogY291bnRQcm9wID0gMCwgYWZ0ZXIgPSBudWxsLCBmaWx0ZXJGbiB9ID0ge31cbikgPT4ge1xuICBjb25zdCBsaW1pdCA9IHBhcnNlSW50KGxpbWl0UHJvcCwgMTApO1xuICBjb25zdCBjb3VudCA9IHBhcnNlSW50KGNvdW50UHJvcCwgMTApIHx8IDA7XG4gIGNvbnN0IHJvd3MgPSBzb3J0ZWRSb3dzLnNsaWNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gW107XG4gIGNvbnN0IGZldGNoQmF0Y2ggPSAoc2l6ZSA9IDMwKSA9PlxuICAgIFByb21pc2UuYWxsKFxuICAgICAgUi5tYXAoYXN5bmMgcm93ID0+IHtcbiAgICAgICAgbGV0IGluTGlzdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFyb3dbTGlzdGluZ05vZGUuUE9TX0lEXSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmxhbmtSb3dcIiwgcm93KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsdGVyRm4pIGluTGlzdGluZyA9IGF3YWl0IGZpbHRlckZuKHJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKTtcbiAgICAgICAgaWYgKGluTGlzdGluZykgZmlsdGVyZWQucHVzaChyb3cpO1xuICAgICAgfSwgcm93cy5zcGxpY2UoY291bnQsIHNpemUpKVxuICAgICk7XG5cbiAgd2hpbGUgKHJvd3MubGVuZ3RoID4gY291bnQpIHtcbiAgICBhd2FpdCBmZXRjaEJhdGNoKCk7XG4gICAgaWYgKGxpbWl0ICYmIGZpbHRlcmVkLmxlbmd0aCA+PSBsaW1pdCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gUi5jb21wb3NlKFxuICAgIGxpbWl0ID8gUi5zbGljZSgwLCBsaW1pdCkgOiBSLmlkZW50aXR5LFxuICAgIFIuc29ydEJ5KFIucHJvcChMaXN0aW5nTm9kZS5QT1NfVkFMKSlcbiAgKShmaWx0ZXJlZCk7XG59O1xuXG5jb25zdCBnZXRGaWx0ZXJlZElkcyA9IFIuY29tcG9zZShcbiAgeCA9PiB4LnRoZW4oUi5tYXAoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19JRCkpKSxcbiAgZ2V0RmlsdGVyZWRSb3dzXG4pO1xuXG5jb25zdCB0aGluZ0ZpbHRlciA9IFIuY3VycnkoKHNjb3BlLCBzcGVjLCB0aGluZ0lkKSA9PlxuICBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pLFxuICAgIHNjb3JlczogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNTY29yZXMoc3BlYyksXG4gICAgZGF0YTogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNEYXRhKHNwZWMpXG4gIH0pLnRoZW4oc3BlYy50aGluZ0ZpbHRlcilcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRmlsdGVyID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgZ2V0RmlsdGVyZWRSb3dzLFxuICBnZXRGaWx0ZXJlZElkcyxcbiAgdGhpbmdGaWx0ZXJcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5cbmNvbnN0IFtQT1NfSURYLCBQT1NfSUQsIFBPU19WQUxdID0gWzAsIDEsIDIsIDNdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCByb3dzVG9JZHMgPSBSLm1hcChSLnByb3AoUE9TX0lEKSk7XG5jb25zdCByb3dzVG9JdGVtcyA9IFIubWFwKFIuc2xpY2UoMSwgMykpO1xuY29uc3Qgc291cmNlID0gUi5wcm9wT3IoXCJcIiwgXCJzb3VyY2VcIik7XG5jb25zdCBzb3VsRnJvbVBhdGggPSBSLmN1cnJ5KFxuICAoaW5kZXhlciwgcGF0aCkgPT4gYCR7Q29uc3RhbnRzLlBSRUZJWH0ke3BhdGh9QH4ke2luZGV4ZXJ9LmBcbik7XG5jb25zdCBwYXRoRnJvbVNvdWwgPSBSLmNvbXBvc2UoXG4gIFIucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtDb25zdGFudHMuUFJFRklYfWApLCBcIlwiKSxcbiAgUi5yZXBsYWNlKC9Afi4qXFwuLywgXCJcIilcbik7XG5cbmNvbnN0IGlkVG9Tb3VsID0gdGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSk7XG5jb25zdCBpZHNUb1NvdWxzID0gUi5tYXAoaWRUb1NvdWwpO1xuY29uc3Qgc291bFRvSWQgPSBzb3VsID0+IFIucHJvcChcInRoaW5nSWRcIiwgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpKTtcbmNvbnN0IHNvdWxzVG9JZHMgPSBSLm1hcChzb3VsVG9JZCk7XG5cbmNvbnN0IGdldFJvdyA9IFIuY3VycnkoKG5vZGUsIGlkeCkgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pbnNlcnQoMCwgcGFyc2VJbnQoaWR4LCAxMCkpLCBSLmFsd2F5cyhudWxsKSksXG4gICAgcm93ID0+IHtcbiAgICAgIHJvd1sxXSA9IHBhcnNlRmxvYXQocm93WzFdKTtcbiAgICAgIHJldHVybiByb3c7XG4gICAgfSxcbiAgICBSLm1hcChSLnRyaW0pLFxuICAgIFIuc3BsaXQoXCIsXCIpLFxuICAgIFIucHJvcE9yKFwiXCIsIGAke2lkeH1gKVxuICApKG5vZGUpXG4pO1xuXG5jb25zdCBpdGVtS2V5cyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoXG4gICAgUi5jb21wb3NlKFxuICAgICAgdmFsID0+ICEhKHZhbCA9PT0gMCB8fCB2YWwpLFxuICAgICAgcGFyc2VJbnRcbiAgICApXG4gICksXG4gIFIua2V5c1xuKTtcblxuY29uc3Qgc2VyaWFsaXplID0gUi5jdXJyeSgoc3BlYywgaXRlbXMpID0+XG4gIFIuY29tcG9zZShcbiAgICBSLmFkZEluZGV4KFIucmVkdWNlKShcbiAgICAgIChyZXMsIHJvdywgaWR4KSA9PiBSLmFzc29jKGAke2lkeH1gLCByb3cuam9pbihcIixcIiksIHJlcyksXG4gICAgICB7fVxuICAgICksXG4gICAgUi5kZWZhdWx0VG8oW10pXG4gICkoaXRlbXMpXG4pO1xuXG5jb25zdCByb3dzID0gbm9kZSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5tYXAoZ2V0Um93KG5vZGUpKSxcbiAgICBpdGVtS2V5c1xuICApKG5vZGUpO1xuXG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIHJvd3NUb0lkcyxcbiAgcm93c1xuKTtcblxuY29uc3Qgc29ydFJvd3MgPSBSLnNvcnRXaXRoKFtcbiAgUi5hc2NlbmQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5jb25kKFtbUi5pc05pbCwgUi5hbHdheXMoSW5maW5pdHkpXSwgW1IuVCwgcGFyc2VGbG9hdF1dKSxcbiAgICAgIFIucHJvcChQT1NfVkFMKVxuICAgIClcbiAgKVxuXSk7XG5cbmNvbnN0IHNvcnRlZElkcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIHJvd3Ncbik7XG5cbmNvbnN0IGl0ZW1zVG9Sb3dzID0gUi5hZGRJbmRleChSLm1hcCkoKGl0ZW0sIGlkeCkgPT4gW2lkeCwgLi4uaXRlbV0pO1xuXG5jb25zdCBkaWZmID0gYXN5bmMgKFxuICBub2RlLFxuICB1cGRhdGVkSXRlbXMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW10sXG4gIHsgbWF4U2l6ZSA9IDEwMDAgfSA9IHt9XG4pID0+IHtcbiAgY29uc3QgcmVtb3ZlZCA9IFIuaW5kZXhCeShSLmlkZW50aXR5LCByZW1vdmVJZHMpO1xuICBjb25zdCBieUlkID0ge307XG4gIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBjb25zdCB1cGRhdGVkID0ge307XG4gIGxldCB0b1JlcGxhY2UgPSBbXTtcbiAgbGV0IG1heElkeCA9IDA7XG4gIGxldCBrZXk7XG5cbiAgZm9yIChrZXkgaW4gbm9kZSB8fCB7fSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGtleSwgMTApO1xuXG4gICAgaWYgKCEocGFyc2VkIHx8IHBhcnNlZCA9PT0gMCkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHJvdyA9IGdldFJvdyhub2RlLCBrZXkpIHx8IFtwYXJzZWQsIG51bGwsIG51bGxdO1xuICAgIGNvbnN0IFtpZHgsIGlkID0gbnVsbCwgcmF3VmFsdWUgPSBudWxsXSA9IHJvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgcm93W1BPU19WQUxdID0gcmF3VmFsdWUgPT09IG51bGwgPyBudWxsIDogcGFyc2VGbG9hdChyYXdWYWx1ZSk7XG4gICAgaWYgKGlkICYmIHJlbW92ZWRbaWRdKSByb3dbUE9TX0lEXSA9IHJvd1tQT1NfVkFMXSA9IG51bGw7XG4gICAgaWYgKGlkKSBieUlkW2lkXSA9IHJvdztcbiAgICBpZiAocm93W1BPU19JRF0pIHtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b1JlcGxhY2UucHVzaChyb3cpO1xuICAgIH1cbiAgICBpZiAoaWR4ID4gbWF4SWR4KSBtYXhJZHggPSBpZHg7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFtpZCwgdmFsdWVdID0gdXBkYXRlZEl0ZW1zW2ldIHx8IFtudWxsLCBudWxsXTtcblxuICAgIGlmICghaWQpIGNvbnRpbnVlO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gYnlJZFtpZF07XG5cbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGlmIChleGlzdGluZ1tQT1NfVkFMXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZXhpc3RpbmdbUE9TX1ZBTF0gPSB2YWx1ZTtcbiAgICAgICAgdXBkYXRlZFtpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByb3cgPSBbbnVsbCwgaWQsIHZhbHVlXTtcblxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWxsU29ydGVkID0gc29ydFJvd3Mocm93cyk7XG4gIGNvbnN0IHNvcnRlZCA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UoMCwgbWF4U2l6ZSkgOiBhbGxTb3J0ZWQ7XG4gIGNvbnN0IG1pc3NpbmcgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKG1heFNpemUsIGFsbFNvcnRlZC5sZW5ndGgpIDogW107XG4gIGNvbnN0IGFkZGVkID0gUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSA9PT0gbnVsbCwgc29ydGVkKTtcblxuICB0b1JlcGxhY2UgPSB0b1JlcGxhY2VcbiAgICAuY29uY2F0KFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gIT09IG51bGwsIG1pc3NpbmcpKVxuICAgIC5yZXZlcnNlKCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpZCA9IHNvcnRlZFtpXVtQT1NfSURdO1xuICAgIGNvbnN0IGlkeCA9IHNvcnRlZFtpXVtQT1NfSURYXTtcbiAgICBjb25zdCB2YWwgPSBzb3J0ZWRbaV1bUE9TX1ZBTF07XG5cbiAgICBpZiAoaWR4ICE9PSBudWxsICYmIHVwZGF0ZWRbaWRdKSBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtpZCwgdmFsXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIGNvbnN0IGluc2VydGVkID0gW107XG5cbiAgd2hpbGUgKGFkZGVkLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IGFkZGVkLnBvcCgpO1xuICAgIGNvbnN0IHJlcGxhY2VkID0gdG9SZXBsYWNlLnBvcCgpO1xuICAgIGxldCBbaWR4XSA9IHJlcGxhY2VkIHx8IFtudWxsXTtcblxuICAgIGlmIChpZHggPT09IG51bGwpIHtcbiAgICAgIGlkeCA9IHBhcnNlSW50KG1heElkeCwgMTApICsgaW5zZXJ0ZWQubGVuZ3RoICsgMTtcbiAgICAgIGluc2VydGVkLnB1c2goaWR4KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtyb3dbUE9TX0lEXSwgcm93W1BPU19WQUxdXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIHdoaWxlICh0b1JlcGxhY2UubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gdG9SZXBsYWNlLnBvcCgpO1xuXG4gICAgaWYgKHJvdyAmJiAhcm93W1BPU19JRF0pIHtcbiAgICAgIGNvbnN0IGlkeCA9IGAke3Jvd1tQT1NfSURYXX1gO1xuXG4gICAgICBpZiAobm9kZVtpZHhdICE9PSBudWxsKSB7XG4gICAgICAgIGNoYW5nZXNbaWR4XSA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibnVsbGluZ1wiLCBpZHgsIG5vZGVbaWR4XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFIua2V5cyhjaGFuZ2VzKS5sZW5ndGggPyBjaGFuZ2VzIDogbnVsbDtcbn07XG5cbmNvbnN0IGNhdGVnb3JpemVEaWZmID0gKGRpZmYsIG9yaWdpbmFsKSA9PiB7XG4gIGNvbnN0IGFsbEtleXMgPSBpdGVtS2V5cyhSLm1lcmdlTGVmdChkaWZmLCBvcmlnaW5hbCkpO1xuICBjb25zdCBhZGRlZCA9IFtdO1xuICBjb25zdCByZW1vdmVkID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gYWxsS2V5c1tpXTtcbiAgICBjb25zdCBbX2RpZmZJZHgsIGRpZmZJZF0gPSBnZXRSb3coZGlmZiwga2V5KSB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGNvbnN0IFtfb3JpZ0lkeCwgb3JpZ0lkXSA9IGdldFJvdyhvcmlnaW5hbCwga2V5KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgaWYgKGRpZmZJZCAhPT0gb3JpZ0lkKSB7XG4gICAgICBpZiAoZGlmZklkKSBhZGRlZC5wdXNoKGRpZmZJZCk7XG4gICAgICBpZiAob3JpZ0lkKSByZW1vdmVkLnB1c2gob3JpZ0lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2FkZGVkLCByZW1vdmVkXTtcbn07XG5cbmNvbnN0IHVuaW9uUm93cyA9IFIuY29tcG9zZShcbiAgUi51bmlxQnkoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5yZWR1Y2UoUi5jb25jYXQsIFtdKSxcbiAgUi5tYXAocm93cylcbik7XG5cbmNvbnN0IHJvd3NGcm9tU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzKSA9PlxuICBQcm9taXNlLmFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSkudGhlbih1bmlvblJvd3MpXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyIH0gPSBvcHRzIHx8IHt9O1xuXG4gIHJldHVybiByb3dzRnJvbVNvdWxzKHNjb3BlLCBbc291bEZyb21QYXRoKGluZGV4ZXIsIHBhdGgpXSkudGhlbihyb3dzVG9JZHMpO1xufSwgXCJsaXN0aW5nUm93c1wiKTtcblxuY29uc3QgZ2V0ID0gcXVlcnkoXG4gIChzY29wZSwgc291bCkgPT4gKHNvdWwgPyBzY29wZS5nZXQoc291bCkgOiByZXNvbHZlKG51bGwpKSxcbiAgXCJsaXN0aW5nXCJcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nTm9kZSA9IHtcbiAgUE9TX0lEWCxcbiAgUE9TX0lELFxuICBQT1NfVkFMLFxuICBzb3VyY2UsXG4gIGdldCxcbiAgZ2V0Um93LFxuICBpdGVtS2V5cyxcbiAgc2VyaWFsaXplLFxuICByb3dzLFxuICBpZHMsXG4gIGlkVG9Tb3VsLFxuICBpZHNUb1NvdWxzLFxuICBzb3VsVG9JZCxcbiAgc291bHNUb0lkcyxcbiAgcm93c1RvSWRzLFxuICByb3dzVG9JdGVtcyxcbiAgaXRlbXNUb1Jvd3MsXG4gIHNvcnRSb3dzLFxuICBzb3J0ZWRJZHMsXG4gIHNvdWxGcm9tUGF0aCxcbiAgcGF0aEZyb21Tb3VsLFxuICByb3dzRnJvbVNvdWxzLFxuICByZWFkLFxuICBkaWZmLFxuICBjYXRlZ29yaXplRGlmZixcbiAgdW5pb25Sb3dzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuY29uc3QgdXBkYXRlTGlzdGluZyA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgc2NvcGUsXG4gIHNwZWMsXG4gIGlkcyA9IFtdLFxuICByZW1vdmVJZHMgPSBbXVxuKSA9PiB7XG4gIGlmICghaWRzLmxlbmd0aCAmJiAhcmVtb3ZlSWRzLmxlbmd0aCkgcmV0dXJuO1xuICBjb25zdCBleGlzdGluZyA9IGF3YWl0IG9yYy5uZXdTY29wZSgpLmdldChyb3V0ZS5zb3VsKTtcbiAgY29uc3QgdXBkYXRlZEl0ZW1zID0gYXdhaXQgTGlzdGluZ1NvcnQudG9JdGVtcyhzY29wZSwgaWRzLCBzcGVjKTtcbiAgY29uc3QgY2hhbmdlcyA9IGF3YWl0IExpc3RpbmdOb2RlLmRpZmYoZXhpc3RpbmcsIHVwZGF0ZWRJdGVtcywgcmVtb3ZlSWRzKTtcblxuICBpZiAoY2hhbmdlcykgY29uc29sZS5sb2coXCJDSEFOR0VTXCIsIHJvdXRlLnNvdWwsIGNoYW5nZXMpO1xuICBpZiAoY2hhbmdlcykgcm91dGUud3JpdGUoY2hhbmdlcyk7XG59O1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChvcmMsIHJvdXRlLCB7IHNvdWwsIHVwZGF0ZWRTb3VsLCBkaWZmLCAuLi5wcm9wcyB9KSA9PiB7XG4gIGxldCB1cGRhdGVkSWRzID0gW107XG5cbiAgY29uc3QgcGF0aCA9IExpc3RpbmdOb2RlLnBhdGhGcm9tU291bChzb3VsKTtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCk7XG5cbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgaXNTdGlja3kgPSBSLmVxdWFscyhyb3V0ZS5tYXRjaC50aGluZ0lkIHx8IG51bGwpO1xuXG4gIGlmICh0aGluZ0lkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIHVwZGF0ZWRJZHMgPSBSLmNvbmNhdCh1cGRhdGVkSWRzLCBUaGluZ1NldC5pZHMoR3VuTm9kZS5kZWNvZGVTRUEoZGlmZikpKTtcblxuICBhd2FpdCB1cGRhdGVMaXN0aW5nKG9yYywgcm91dGUsIHNjb3BlLCBzcGVjLCB1cGRhdGVkSWRzLCBbXSwgaXNTdGlja3kpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ09yYWNsZSA9IHtcbiAgdXBkYXRlTGlzdGluZyxcbiAgb25QdXRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5jb25zdCBjYWxjdWxhdGVSb3dzID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3Qgc3RpY2t5SXRlbXMgPSBSLm1hcChpZCA9PiBbaWQsIC1JbmZpbml0eV0sIHNwZWMuc3RpY2t5SWRzKTtcblxuICBpZiAoIXNwZWMuZGF0YVNvdXJjZS5xdWVyeSkgcmV0dXJuIHJlc29sdmUoW10pO1xuICByZXR1cm4gc3BlYy5kYXRhU291cmNlLnF1ZXJ5KHNjb3BlKS50aGVuKGl0ZW1zID0+IHtcbiAgICBjb25zdCByb3dzID0gTGlzdGluZ05vZGUuaXRlbXNUb1Jvd3MoWy4uLnN0aWNreUl0ZW1zLCAuLi5pdGVtc10pO1xuXG4gICAgcmV0dXJuIExpc3RpbmdGaWx0ZXIuZ2V0RmlsdGVyZWRSb3dzKHNjb3BlLCBzcGVjLCByb3dzLCB7XG4gICAgICAuLi5vcHRzLFxuICAgICAgZmlsdGVyRm5cbiAgICB9KTtcbiAgfSk7XG59KTtcblxuY29uc3QgY2FsY3VsYXRlID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHt9KTtcblxuY29uc3QgdG9Ob2RlID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzKSA9PlxuICBjYWxjdWxhdGVSb3dzKHNjb3BlLCBzcGVjLCBvcHRzKS50aGVuKFxuICAgIFIuY29tcG9zZShcbiAgICAgIExpc3RpbmdOb2RlLnNlcmlhbGl6ZShzcGVjKSxcbiAgICAgIExpc3RpbmdOb2RlLnJvd3NUb0l0ZW1zXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3QgcGF0aHMgPSBSLnBhdGhPcihbXSwgW1wiZGF0YVNvdXJjZVwiLCBcImxpc3RpbmdQYXRoc1wiXSwgc3BlYyk7XG4gIGNvbnN0IHN0aWNreVJvd3MgPSBSLm1hcChpZCA9PiBbLTEsIGlkLCAtSW5maW5pdHldLCBzcGVjLnN0aWNreUlkcyk7XG4gIGNvbnN0IHNvdWxzID0gUi5tYXAoXG4gICAgTGlzdGluZ05vZGUuc291bEZyb21QYXRoKG9wdHMuaW5kZXhlciB8fCBzcGVjLmluZGV4ZXIpLFxuICAgIHBhdGhzXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdOb2RlLnJvd3NGcm9tU291bHMoc2NvcGUsIHNvdWxzKS50aGVuKHJvd3MgPT5cbiAgICBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCBzcGVjLCBbLi4uc3RpY2t5Um93cywgLi4ucm93c10sIHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICBmaWx0ZXJGblxuICAgIH0pXG4gICk7XG59KTtcblxuY29uc3QgZnJvbVNwZWMgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT5cbiAgKG9wdHMuY2FsY3VsYXRlID8gY2FsY3VsYXRlIDogcmVhZCkoc2NvcGUsIHNwZWMsIG9wdHMpXG4pO1xuXG5jb25zdCBmcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT4ge1xuICBjb25zdCB0eXBlID0gTGlzdGluZ1R5cGUuZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgcmV0dXJuIHR5cGUuZ2V0U3BlYyhzY29wZSwgdHlwZS5tYXRjaCkudGhlbihzcGVjID0+IHtcbiAgICBpZiAoc3BlYy5oYXNJbmRleGVyICYmICFvcHRzLmNhbGN1bGF0ZSkge1xuICAgICAgaWYgKCF0eXBlIHx8ICF0eXBlLnJlYWQpIHJldHVybiBMaXN0aW5nTm9kZS5yZWFkKHNjb3BlLCBwYXRoLCBvcHRzKTtcbiAgICAgIHJldHVybiB0eXBlLnJlYWQoc2NvcGUsIHR5cGUubWF0Y2gsIG9wdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbVNwZWMoc2NvcGUsIHNwZWMsIG9wdHMpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBub2RlRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+XG4gIExpc3RpbmdUeXBlLnNwZWNGcm9tUGF0aChzY29wZSwgcGF0aCkudGhlbihzcGVjID0+XG4gICAgdG9Ob2RlKHNjb3BlLCBzcGVjLCBSLm1lcmdlTGVmdChvcHRzLCB7IGxpbWl0OiBDb25zdGFudHMuTElTVElOR19TSVpFIH0pKVxuICApXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1F1ZXJ5ID0ge1xuICBmcm9tU3BlYyxcbiAgZnJvbVBhdGgsXG4gIGNhbGN1bGF0ZVJvd3MsXG4gIHRvTm9kZSxcbiAgbm9kZUZyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcblxuY29uc3QgW1BPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMV07XG5jb25zdCB0b0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHNvcnRJdGVtcyA9IFIuc29ydEJ5KFIucHJvcChQT1NfVkFMKSk7XG5cbmNvbnN0IHZvdGVTb3J0ID0gZm4gPT4gcXVlcnkoKHNjb3BlLCB0aGluZ0lkLCBzcGVjKSA9PiB7XG4gIGlmIChzcGVjLmlzSWRTdGlja3kodGhpbmdJZCkpIHJldHVybiByZXNvbHZlKC1JbmZpbml0eSk7XG4gIGlmIChSLmNvbnRhaW5zKHRoaW5nSWQsIHNwZWMuZmlsdGVycy5hbGxvdy5vcHMpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuXG4gIHJldHVybiBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHNjb3JlczogdHJ1ZSxcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KVxuICB9KS50aGVuKHJlcyA9PiBmbihyZXMsIHNwZWMpKTtcbn0pO1xuXG5jb25zdCB0aW1lU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT5cbiAgUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KVxuICB9KS50aGVuKGZuKVxuKTtcblxuY29uc3Qgc29ydHMgPSB7XG4gIG5ldzogdGltZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5tdWx0aXBseSgtMSksXG4gICAgICBSLmRlZmF1bHRUbygwKSxcbiAgICAgIFIucHJvcChcInRpbWVzdGFtcFwiKSxcbiAgICApXG4gICksXG4gIG9sZDogdGltZVNvcnQoUi5wcm9wKFwidGltZXN0YW1wXCIpKSxcbiAgYWN0aXZlOiB2b3RlU29ydChcbiAgICAoeyB0aW1lc3RhbXAsIGxhc3RBY3RpdmUgfSkgPT4gLTEgKiAobGFzdEFjdGl2ZSB8fCB0aW1lc3RhbXApXG4gICksXG4gIHRvcDogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlSW50KHgsIDEwKSxcbiAgICAgIFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0pXG4gICAgKVxuICApLFxuICBjb21tZW50czogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlRmxvYXQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdKVxuICAgIClcbiAgKSxcbiAgZGlzY3Vzc2VkOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiY29tbWVudFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcblxuICAgIGlmICghc2NvcmUpIHJldHVybiAxMDAwMDAwMDAwIC0gc2Vjb25kcztcbiAgICByZXR1cm4gLTEgKiAob3JkZXIgKyBzZWNvbmRzIC8gNDUwMDApO1xuICB9KSxcbiAgaG90OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lc3RhbXAgLyAxMDAwIC0gMTEzNDAyODAwMztcbiAgICBjb25zdCBvcmRlciA9IE1hdGgubG9nMTAoTWF0aC5tYXgoTWF0aC5hYnMoc2NvcmUpLCAxKSk7XG4gICAgbGV0IHNpZ24gPSAwO1xuXG4gICAgaWYgKHNjb3JlID4gMCkge1xuICAgICAgc2lnbiA9IDE7XG4gICAgfSBlbHNlIGlmIChzY29yZSA8IDApIHtcbiAgICAgIHNpZ24gPSAtMTtcbiAgICB9XG4gICAgcmV0dXJuIC0xICogKHNpZ24gKiBvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBiZXN0OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IG4gPSB1cHMgKyBkb3ducztcblxuICAgIGlmIChuID09PSAwKSByZXR1cm4gMDtcbiAgICBjb25zdCB6ID0gMS4yODE1NTE1NjU1NDU7IC8vIDgwJSBjb25maWRlbmNlXG4gICAgY29uc3QgcCA9IHVwcyAvIG47XG4gICAgY29uc3QgbGVmdCA9IHAgKyAoMSAvICgyICogbikpICogeiAqIHo7XG4gICAgY29uc3QgcmlnaHQgPSB6ICogTWF0aC5zcXJ0KChwICogKDEgLSBwKSkgLyBuICsgKHogKiB6KSAvICg0ICogbiAqIG4pKTtcbiAgICBjb25zdCB1bmRlciA9IDEgKyAoMSAvIG4pICogeiAqIHo7XG5cbiAgICByZXR1cm4gLTEgKiAoKGxlZnQgLSByaWdodCkgLyB1bmRlcik7XG4gIH0pLFxuICBjb250cm92ZXJzaWFsOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuXG4gICAgaWYgKHVwcyA8PSAwIHx8IGRvd25zIDw9IDApIHJldHVybiAwO1xuICAgIGNvbnN0IG1hZ25pdHVkZSA9IHVwcyArIGRvd25zO1xuICAgIGNvbnN0IGJhbGFuY2UgPSB1cHMgPiBkb3ducyA/IGRvd25zIC8gdXBzIDogdXBzIC8gZG93bnM7XG5cbiAgICByZXR1cm4gLTEgKiBtYWduaXR1ZGUgKiogYmFsYW5jZTtcbiAgfSlcbn07XG5cbmNvbnN0IGlzVmFsaWRTb3J0ID0gc29ydCA9PiAhIXNvcnRzW3NvcnRdO1xuXG5jb25zdCB0b0l0ZW0gPSBxdWVyeShcbiAgKHNjb3BlLCBpZCwgc3BlYykgPT5cbiAgICAoc29ydHNbc3BlYy5zb3J0XSB8fCBzb3J0cy5uZXcpKHNjb3BlLCBpZCwgc3BlYykudGhlbih2YWwgPT4gW2lkLCB2YWxdKVxuKTtcblxuY29uc3QgaXRlbUZyb21Tb3VsID0gKHNjb3BlLCBzb3VsLCBzcGVjKSA9PiB0b0l0ZW0oc2NvcGUsIExpc3RpbmdOb2RlLnNvdWxUb0lkKHNvdWwpLCBzcGVjKTtcblxuY29uc3QgdG9JdGVtcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkcywgc3BlYykgPT4gYWxsKFIubWFwKFxuICAgIGlkID0+IHRvSXRlbShzY29wZSwgaWQsIHNwZWMpLFxuICAgIGlkc1xuICApKVxuKTtcblxuY29uc3QgZnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWxzLCBzcGVjKSA9PlxuICAgIGFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSlcbiAgICAgIC50aGVuKFIucGlwZShcbiAgICAgICAgVGhpbmdTZXQudW5pb24sXG4gICAgICAgIFRoaW5nU2V0LmlkcyxcbiAgICAgICAgaWRzID0+IHRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYylcbiAgICAgICkpXG4gICAgICAudGhlbihzb3J0SXRlbXMpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1NvcnQgPSB7XG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc29ydHMsXG4gIGlzVmFsaWRTb3J0LFxuICB0b0l0ZW0sXG4gIHRvSXRlbXMsXG4gIHRvSWRzLFxuICBpdGVtRnJvbVNvdWwsXG4gIHNvcnRJdGVtcyxcbiAgZnJvbVRoaW5nU2V0c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuXG5jb25zdCBmcm9tU291cmNlID0gUi5jb21wb3NlKFxuICBSLmFwcGx5KFIubWVyZ2VMZWZ0KSxcbiAgUi5hcChbTGlzdGluZ0ZpbHRlci5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBSLmFwcGx5KFIuYXNzb2MoXCJkYXRhU291cmNlXCIpKSxcbiAgUi5hcChbTGlzdGluZ0RhdGFTb3VyY2UuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgTGlzdGluZ0RlZmluaXRpb24uZnJvbVNvdXJjZVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEgPSBcIlwiKSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIG5hbWUpXG4gICAgLnRoZW4oUi5jb21wb3NlKFxuICAgICAgYm9keSA9PiBgJHtib2R5fVxuIyBhZGRlZCBieSBpbmRleGVyXG4ke2V4dHJhIHx8IFwiXCJ9XG5zb3VyY2VkIGZyb20gcGFnZSAke2F1dGhvcklkfSAke25hbWV9XG5gLFxuICAgICAgVGhpbmdEYXRhTm9kZS5ib2R5XG4gICAgKSlcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU3BlYyA9IHsgZnJvbVNvdXJjZSwgZ2V0U291cmNlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy9jaGF0XCI7XG5jb25zdCB0YWJzID0gWyAuLi5Ub3BpY0xpc3RpbmcudGFicywgXCJjaGF0XCIgXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjaGF0OnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogbm9ybWFsVG9waWNzWzBdIHx8IFwid2hhdGV2ZXJcIjtcbiAgY29uc3QgdG9waWNzID0gbm9ybWFsVG9waWNzLnJlZHVjZShcbiAgICAocmVzLCB0b3BpYykgPT4gWy4uLnJlcywgYGNoYXQ6JHt0b3BpY31gXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNoYXRcIixcbiAgICBbXG4gICAgICBcInNvcnQgbmV3XCIsXG4gICAgICBcImRpc3BsYXkgYXMgY2hhdFwiLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENoYXRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjb21tZW50czpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdGhpbmdJZCwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNvbW1lbnRzXCIsXG4gICAgW2BvcCAke3RoaW5nSWR9YCwgYHNvcnQgJHtzb3J0fWBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL2NvbW1lbnRlZC86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y29tbWVudGVkOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNvbW1lbnRlZFwiLFxuICAgIFtcbiAgICAgIGBjdXJhdG9yICR7YXV0aG9ySWR9YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudGVkTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgZ2V0U2lkZWJhciwgZ2V0U291cmNlLCBnZXRTcGVjIH0pO1xuXG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvZG9tYWluLzpkb21haW4vOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6ZG9tYWluOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBkb21haW4sIHNvcnQgfSkgPT4ge1xuICBjb25zdCBkb21haW5zID0gUGF0aC5zcGxpdFRvcGljcyhkb21haW4pO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmRvbWFpblwiLFxuICAgIFtcbiAgICAgIGBuYW1lICR7ZG9tYWluc1swXX1gLFxuICAgICAgXCJzdWJtaXQgdG8gd2hhdGV2ZXJcIixcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgXCJraW5kIHN1Ym1pc3Npb25cIixcbiAgICAgIC4uLlIubWFwKGRvbWFpbiA9PiBgZG9tYWluICR7ZG9tYWlufWAsIGRvbWFpbnMpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC9kb21haW4vJHtkb21haW59LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBEb21haW5MaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICB0YWJzLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvZmlyZWhvc2VcIjtcbmNvbnN0IHRhYnMgPSBUb3BpY0xpc3RpbmcudGFicztcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmZpcmVob3NlOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogbm9ybWFsVG9waWNzWzBdIHx8IFwid2hhdGV2ZXJcIjtcbiAgY29uc3QgdG9waWNzID0gbm9ybWFsVG9waWNzLnJlZHVjZShcbiAgICAocmVzLCB0b3BpYykgPT4gWy4uLnJlcywgdG9waWMsIGBjaGF0OiR7dG9waWN9YCwgYGNvbW1lbnRzOiR7dG9waWN9YF0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpmaXJlaG9zZVwiLFxuICAgIFtcbiAgICAgIFwic29ydCBuZXdcIixcbiAgICAgIFwiZGlzcGxheSBhcyBjaGF0XCIsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRmlyZWhvc2VMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICB0YWJzLFxuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi8uLi9UaGluZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvcmVwbGllcy86dHlwZS86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6dG9waWM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCB0eXBlLCBzb3J0ID0gXCJuZXdcIiB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmluYm94XCIsXG4gICAgW2ByZXBsaWVzIHRvIGF1dGhvciAke2F1dGhvcklkfWAsIFwia2luZCBjb21tZW50XCIsIGB0eXBlICR7dHlwZX1gLCBgc29ydCAke3NvcnR9YF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyB1cGRhdGVkU291bCwgZGlmZiB9KSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IGRpZmZEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEoZGlmZik7XG4gIGNvbnN0IFt1cGRhdGVkQXV0aG9yZWRdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoZGlmZkRhdGEpO1xuICBjb25zdCBzcGVjID0gYXdhaXQgZ2V0U3BlYyhzY29wZSwgcm91dGUubWF0Y2gpO1xuICBsZXQgdXBkYXRlZElkcyA9IFRoaW5nU2V0LmlkcyhkaWZmRGF0YSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkQXV0aG9yZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBvcElkID0gdXBkYXRlZEF1dGhvcmVkW2ldO1xuICAgIGNvbnN0IHJlcGx5SWRzID0gVGhpbmdTZXQuaWRzKFxuICAgICAgYXdhaXQgc2NvcGVcbiAgICAgICAgLmdldChTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3BJZCB9KSlcbiAgICAgICAgLnRoZW4oKVxuICAgICk7XG5cbiAgICB1cGRhdGVkSWRzID0gdXBkYXRlZElkcy5jb25jYXQocmVwbHlJZHMpO1xuICB9XG5cbiAgaWYgKHVwZGF0ZWRJZHMubGVuZ3RoKVxuICAgIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10pO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC86dHlwZS86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcIm92ZXJ2aWV3XCIsIFwiY29tbWVudHNcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tYW5kc1wiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnByb2ZpbGU6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6cHJvZmlsZVwiLFxuICAgIFtcbiAgICAgIGBhdXRob3IgJHthdXRob3JJZH1gLFxuICAgICAgYHR5cGUgJHt0eXBlfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdXNlci8ke2F1dGhvcklkfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgUXVlcnkudXNlck1ldGEoc2NvcGUsIG1hdGNoLmF1dGhvcklkKS50aGVuKG1ldGEgPT5cbiAgICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKFIucGlwZShcbiAgICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2UsXG4gICAgICBSLm1lcmdlTGVmdCh7XG4gICAgICAgIHByb2ZpbGVJZDogbWF0Y2guYXV0aG9ySWQsXG4gICAgICAgIGRpc3BsYXlOYW1lOiBSLnByb3BPcihcIlwiLCBcImFsaWFzXCIsIG1ldGEpXG4gICAgICB9KVxuICAgICkpXG4pKTtcblxuZXhwb3J0IGNvbnN0IFByb2ZpbGVMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICB0YWJzLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uLy4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5pbXBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi4vU3BhY2VTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRcIjtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFNwYWNlU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNwZWMoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBTcGFjZVNwZWMuc2lkZWJhclBhZ2VOYW1lKG5hbWUpKVxuKTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHsgdXBkYXRlZFNvdWwsIGRpZmYsIG9yaWdpbmFsLCBsYXRlc3QgPSAwIH1cbikgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuXG4gIGNvbnN0IG9yaWdpbmFsRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKG9yaWdpbmFsKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRJZHMsIHJlbW92ZWRJZHNdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoXG4gICAgZGlmZkRhdGEsXG4gICAgb3JpZ2luYWxEYXRhXG4gICk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IHZvdGVDb3VudHNNYXRjaCA9IFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB0aGluZ01hdGNoID0gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgYXV0aG9yTWF0Y2ggPSBTY2hlbWEuU0VBQXV0aG9yLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcblxuICBpZiAodm90ZUNvdW50c01hdGNoKSB1cGRhdGVkSWRzLnB1c2godm90ZUNvdW50c01hdGNoLnRoaW5nSWQpO1xuICBpZiAodGhpbmdNYXRjaCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ0lkICYmIHRoaW5nSWQgIT09IHNwZWMuZnJvbVBhZ2VJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICBhd2FpdCBMaXN0aW5nT3JhY2xlLnVwZGF0ZUxpc3RpbmcoXG4gICAgb3JjLFxuICAgIHJvdXRlLFxuICAgIHNjb3BlLFxuICAgIHNwZWMsXG4gICAgdXBkYXRlZElkcyxcbiAgICByZW1vdmVkSWRzXG4gICk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbiAgaWYgKFxuICAgIFIucHJvcChcInNpemVcIiwgb3JpZ2luYWwpIHx8XG4gICAgdXBkYXRlZElkcy5sZW5ndGggfHxcbiAgICByZW1vdmVkSWRzLmxlbmd0aCB8fFxuICAgIGF1dGhvck1hdGNoXG4gIClcbiAgICByZXR1cm47XG5cbiAgLy8gYmFzZSBsb2dpYyBmcm9tIGd1bi1jbGVyaWMtc2NvcGUgbmVlZHMgdG8gYmUgZW5jYXBzdWFsdGVkIGJldHRlcj9cbiAgY29uc29sZS5sb2coXCItLS1TVEFOREFSRCBTUEFDRSBVUERBVEUtLS1cIiwgcm91dGUuc291bCwgdXBkYXRlZFNvdWwpO1xuICBjb25zdCBub2RlID0gYXdhaXQgb3JjLm5ld1Njb3BlKCkuZ2V0KHJvdXRlLnNvdWwpO1xuICBjb25zdCBleGlzdGluZ0tleXMgPSBMaXN0aW5nTm9kZS5pdGVtS2V5cyhub2RlKTtcblxuICBpZiAoZXhpc3RpbmdLZXlzLmxlbmd0aCkge1xuICAgIHJvdXRlLndyaXRlKHtcbiAgICAgIHNpemU6IDAsXG4gICAgICAuLi5leGlzdGluZ0tleXMucmVkdWNlKChkaWZmLCBrZXkpID0+IHtcbiAgICAgICAgZGlmZltgJHtrZXl9YF0gPSBudWxsO1xuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgIH0sIHt9KVxuICAgIH0pO1xuICB9XG5cbiAgb3JjLndvcmsoe1xuICAgIGlkOiBgdXBkYXRlOiR7cm91dGUuc291bH1gLFxuICAgIHNvdWw6IHJvdXRlLnNvdWwsXG4gICAgbWV0aG9kOiBcImRvVXBkYXRlXCIsXG4gICAgcHJpb3JpdHk6IHJvdXRlLnByaW9yaXR5IHx8IDUwXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U291cmNlLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTcGVjLFxuICBvblB1dFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCIsIFwiZmlyZWhvc2VcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzp0b3BpYzpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCB0b3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpY3NbMF0gPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiB0b3BpY3NbMF07XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6dG9waWNcIixcbiAgICBbXG4gICAgICBgbmFtZSAke3RvcGljfWAsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgdG9waWMuaW5kZXhPZihcIjpcIikgPT09IC0xID8gXCJraW5kIHN1Ym1pc3Npb25cIiA6IFwiXCIsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oXG4gICAgUi5waXBlKFxuICAgICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSxcbiAgICAgIFIuYXNzb2MoXCJiYXNlUGF0aFwiLCBgL3QvJHttYXRjaC50b3BpY31gKVxuICAgIClcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IFRvcGljTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgdGFicyxcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENoYXRMaXN0aW5nIH0gZnJvbSBcIi4vQ2hhdExpc3RpbmdcIjtcbmltcG9ydCB7IEZpcmVob3NlTGlzdGluZyB9IGZyb20gXCIuL0ZpcmVob3NlTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudGVkTGlzdGluZyB9IGZyb20gXCIuL0NvbW1lbnRlZExpc3RpbmdcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuaW1wb3J0IHsgRG9tYWluTGlzdGluZyB9IGZyb20gXCIuL0RvbWFpbkxpc3RpbmdcIjtcbmltcG9ydCB7IENvbW1lbnRMaXN0aW5nIH0gZnJvbSBcIi4vQ29tbWVudExpc3RpbmdcIjtcbmltcG9ydCB7IFNwYWNlTGlzdGluZyB9IGZyb20gXCIuL1NwYWNlTGlzdGluZ1wiO1xuaW1wb3J0IHsgSW5ib3hMaXN0aW5nIH0gZnJvbSBcIi4vSW5ib3hMaXN0aW5nXCI7XG5pbXBvcnQgeyBQcm9maWxlTGlzdGluZyB9IGZyb20gXCIuL1Byb2ZpbGVMaXN0aW5nXCI7XG5cbmNvbnN0IHR5cGVzID0ge1xuICBDaGF0TGlzdGluZyxcbiAgRmlyZWhvc2VMaXN0aW5nLFxuICBUb3BpY0xpc3RpbmcsXG4gIERvbWFpbkxpc3RpbmcsXG4gIENvbW1lbnRMaXN0aW5nLFxuICBTcGFjZUxpc3RpbmcsXG4gIEluYm94TGlzdGluZyxcbiAgQ29tbWVudGVkTGlzdGluZyxcbiAgUHJvZmlsZUxpc3Rpbmdcbn07XG5cbmNvbnN0IHR5cGVzQXJyYXkgPSBSLnZhbHVlcyh0eXBlcyk7XG5cbmNvbnN0IGZyb21QYXRoID0gcGF0aCA9PiB7XG4gIGxldCBtYXRjaDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBtYXRjaCA9IHR5cGVzQXJyYXlbaV0ucm91dGUubWF0Y2gocGF0aCk7XG4gICAgaWYgKG1hdGNoKSByZXR1cm4gUi5hc3NvYyhcIm1hdGNoXCIsIG1hdGNoLCB0eXBlc0FycmF5W2ldKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHNpZGViYXJGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCkgPT4ge1xuICBjb25zdCB0eXBlID0gZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlIHx8ICF0eXBlLmdldFNpZGViYXIpIHJldHVybiByZXNvbHZlKFwiXCIpO1xuICByZXR1cm4gdHlwZS5nZXRTaWRlYmFyKHNjb3BlLCB0eXBlLm1hdGNoKTtcbn0pO1xuXG5jb25zdCBzcGVjRnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgpID0+IHtcbiAgY29uc3QgdHlwZSA9IGZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBmaW5kIHR5cGUgZm9yIHBhdGg6ICR7cGF0aH1gKTtcblxuICByZXR1cm4gdHlwZS5nZXRTcGVjKHNjb3BlLCB0eXBlLm1hdGNoKS50aGVuKGJhc2VTcGVjID0+IHtcbiAgICBsZXQgc3BlYyA9IGJhc2VTcGVjO1xuXG4gICAgaWYgKHR5cGUubWF0Y2guc29ydCA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwicGF0aFwiLCB0eXBlLnJvdXRlLnJldmVyc2UoUi5hc3NvYyhcInNvcnRcIiwgc3BlYy5zb3J0LCB0eXBlLm1hdGNoKSksIHNwZWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGVjID0gUi5hc3NvYyhcInBhdGhcIiwgcGF0aCwgYmFzZVNwZWMpO1xuICAgIH1cblxuICAgIGlmIChzcGVjLnN1Ym1pdFRvcGljICYmICFzcGVjLnN1Ym1pdFBhdGgpIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwic3VibWl0UGF0aFwiLCBgL3QvJHtzcGVjLnN1Ym1pdFRvcGljfS9zdWJtaXRgLCBzcGVjKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BlYztcbiAgfSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdUeXBlID0ge1xuICAuLi50eXBlcyxcbiAgdHlwZXMsXG4gIGZyb21QYXRoLFxuICBzaWRlYmFyRnJvbVBhdGgsXG4gIHNwZWNGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuXG5jb25zdCBzcGxpdERvbWFpbnMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIitcIiksXG4gIFIudG9Mb3dlcixcbiAgUi50cmltLFxuICBSLmRlZmF1bHRUbyhcIlwiKVxuKTtcblxuY29uc3Qgc3BsaXRUb3BpY3MgPSBSLmNvbXBvc2UoXG4gIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoW1wiYWxsXCJdKSksXG4gIHNwbGl0RG9tYWluc1xuKTtcblxuY29uc3Qgd2l0aFJvdXRlID0gb2JqID0+IFIuYXNzb2MoXCJyb3V0ZVwiLCBuZXcgUm91dGUob2JqLnBhdGgpLCBvYmopO1xuXG5leHBvcnQgY29uc3QgUGF0aCA9IHsgc3BsaXREb21haW5zLCBzcGxpdFRvcGljcywgd2l0aFJvdXRlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcbmNvbnN0IGNvbmZpZ1BhZ2VOYW1lID0gbmFtZSA9PiBgc3BhY2U6JHtuYW1lfWA7XG5jb25zdCBzaWRlYmFyUGFnZU5hbWUgPSBuYW1lID0+IGBzcGFjZToke25hbWV9OnNpZGViYXJgO1xuXG5jb25zdCBzb3VyY2VXaXRoRGVmYXVsdHMgPSBSLmN1cnJ5KChvd25lcklkLCBuYW1lLCBzb3VyY2UpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtzb3VyY2UgfHwgXCJcIl07XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuXG4gIGlmICghdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpKSB7XG4gICAgdGFicy5tYXAodGFiID0+XG4gICAgICByZXN1bHQucHVzaChgdGFiICR7dGFifSAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke25hbWV9LyR7dGFifWApXG4gICAgKTtcbiAgfVxuXG4gIGxldCBpbmRleGVyID0gdG9rZW5pemVkLmdldFZhbHVlKFwiaW5kZXhlclwiKTtcblxuICBpZiAoIWluZGV4ZXIpIHtcbiAgICByZXN1bHQucHVzaChgaW5kZXhlciAke0NvbmZpZy5pbmRleGVyfWApO1xuICAgIGluZGV4ZXIgPSBDb25maWcuaW5kZXhlcjtcbiAgfVxuXG4gIGxldCB0YWJ1bGF0b3IgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIik7XG5cbiAgaWYgKCF0YWJ1bGF0b3IpIHJlc3VsdC5wdXNoKGB0YWJ1bGF0b3IgJHtpbmRleGVyfWApO1xuXG4gIHJldHVybiByZXN1bHQuam9pbihcIlxcblwiKTtcbn0pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgY29uZmlnUGFnZU5hbWUobmFtZSksIGV4dHJhKS50aGVuKFxuICAgIHNvdXJjZVdpdGhEZWZhdWx0cyhhdXRob3JJZCwgbmFtZSlcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkudGhlbihzb3VyY2UgPT5cbiAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlKHNvdXJjZSwgYXV0aG9ySWQsIG5hbWUpXG4gIClcbik7XG5cbmNvbnN0IG5vZGVUb1NwYWNlTmFtZXMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLm1hcChSLnJlcGxhY2UoL15zcGFjZTovLCBcIlwiKSksXG4gIFIuZmlsdGVyKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcImxlbmd0aFwiKSxcbiAgICAgIFIubWF0Y2goL15zcGFjZTpbXjpdKiQvKVxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCB1c2VyU3BhY2VOYW1lcyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQpID0+XG4gIFF1ZXJ5LnVzZXJQYWdlcyhzY29wZSwgYXV0aG9ySWQpLnRoZW4obm9kZVRvU3BhY2VOYW1lcylcbik7XG5cbmV4cG9ydCBjb25zdCBTcGFjZVNwZWMgPSB7XG4gIGNvbmZpZ1BhZ2VOYW1lLFxuICBzaWRlYmFyUGFnZU5hbWUsXG4gIG5vZGVUb1NwYWNlTmFtZXMsXG4gIHVzZXJTcGFjZU5hbWVzLFxuICB0YWJzLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn07XG4iLCJpbXBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuZXhwb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuZXhwb3J0IHsgTGlzdGluZ0RlZmluaXRpb24gfSBmcm9tIFwiLi9MaXN0aW5nRGVmaW5pdGlvblwiO1xuZXhwb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmV4cG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmV4cG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi9MaXN0aW5nT3JhY2xlXCI7XG5leHBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmV4cG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmV4cG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmV4cG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcbmV4cG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuL1NwYWNlU3BlY1wiO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZyA9IHtcbiAgLi4uTGlzdGluZ1R5cGUudHlwZXMsXG4gIExpc3RpbmdOb2RlLFxuICBMaXN0aW5nU3BlYyxcbiAgaXNWYWxpZFNvcnQ6IExpc3RpbmdTb3J0LmlzVmFsaWRTb3J0LFxuICBpZHNUb1NvdWxzOiBMaXN0aW5nTm9kZS5pZHNUb1NvdWxzLFxuICBnZXQ6IExpc3RpbmdOb2RlLmdldCxcbiAgZnJvbVNwZWM6IExpc3RpbmdRdWVyeS5mcm9tU3BlYyxcbiAgZnJvbVBhdGg6IExpc3RpbmdRdWVyeS5mcm9tUGF0aCxcbiAgdHlwZUZyb21QYXRoOiBMaXN0aW5nVHlwZS5mcm9tUGF0aCxcbiAgc2lkZWJhckZyb21QYXRoOiBMaXN0aW5nVHlwZS5zaWRlYmFyRnJvbVBhdGgsXG4gIHNwZWNGcm9tUGF0aDogTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoLFxuICBub2RlRnJvbVBhdGg6IExpc3RpbmdRdWVyeS5ub2RlRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmcsIExpc3RpbmdTcGVjLCBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdcIjtcblxuY29uc3Qgd2lraVBhZ2UgPSBSLm1lcmdlTGVmdCh7XG4gIHdpdGhNYXRjaDogKHsgcGFyYW1zOiB7IGF1dGhvcklkID0gQ29uZmlnLm93bmVyLCBuYW1lIH0gfSkgPT4gKHtcbiAgICBwcmVsb2FkOiBzY29wZSA9PiBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIG5hbWUpXG4gIH0pXG59KTtcblxuY29uc3Qgd2l0aExpc3RpbmdNYXRjaCA9IChwYXRoLCBwYXJhbXMpID0+IHtcbiAgaWYgKCFwYXRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByZWxvYWQ6IHF1ZXJ5KFIuYWx3YXlzKHJlc29sdmUoe30pKSksXG4gICAgICBzaWRlYmFyOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKFwiXCIpKSksXG4gICAgICBzcGFjZTogcXVlcnkoUi5hbHdheXMocmVzb2x2ZShMaXN0aW5nU3BlYy5mcm9tU291cmNlKFwiXCIpKSkpLFxuICAgICAgaWRzOiBxdWVyeShSLmFsd2F5cyhyZXNvbHZlKFtdKSkpXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHJlYWxRdWVyeSA9IHF1ZXJ5KFxuICAgIChzY29wZSwgb3B0cyA9IHt9KSA9PiBMaXN0aW5nLmZyb21QYXRoKHNjb3BlLCBwYXRoLCBvcHRzKSxcbiAgICBgaWRzOiR7cGF0aH1gXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICBwcmVsb2FkOiBzY29wZSA9PiBwcmVsb2FkTGlzdGluZyhzY29wZSwgcGF0aCwgcGFyYW1zKSxcbiAgICBzaWRlYmFyOiBxdWVyeShcbiAgICAgIHNjb3BlID0+IExpc3Rpbmcuc2lkZWJhckZyb21QYXRoKHNjb3BlLCBwYXRoKSxcbiAgICAgIGBzaWRlYmFyOiR7cGF0aH1gXG4gICAgKSxcbiAgICBzcGFjZTogcXVlcnkoc2NvcGUgPT4gTGlzdGluZy5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgpKSxcbiAgICBpZHM6IHF1ZXJ5KChzY29wZSwgb3B0cyA9IHt9KSA9PlxuICAgICAgcmVhbFF1ZXJ5KHNjb3BlLCBSLm1lcmdlTGVmdChvcHRzLCBwYXJhbXMpKVxuICAgIClcbiAgfTtcbn07XG5cbmNvbnN0IHByZWxvYWRMaXN0aW5nID0gYXN5bmMgKHNjb3BlLCBwYXRoLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgbWF0Y2ggPSB3aXRoTGlzdGluZ01hdGNoKHBhdGgsIHBhcmFtcyk7XG4gIGxldCBbc3BlYywgaWRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBtYXRjaC5zcGFjZShzY29wZSksXG4gICAgbWF0Y2guaWRzKHNjb3BlLCB7fSksXG4gICAgbWF0Y2guc2lkZWJhcihzY29wZSlcbiAgXSk7XG5cbiAgaWYgKCFzcGVjKSBzcGVjID0gTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShcIlwiKTtcblxuICBjb25zdCB0aGluZ1NvdWxzID0gTGlzdGluZy5pZHNUb1NvdWxzKGlkcyk7XG4gIGNvbnN0IFt0aGluZ3NdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIFF1ZXJ5Lm11bHRpVGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgICB0aGluZ1NvdWxzLFxuICAgICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLFxuICAgICAgc2NvcmVzOiB0cnVlLFxuICAgICAgZGF0YTogdHJ1ZVxuICAgIH0pLFxuICAgIC4uLlIubWFwKFxuICAgICAgaWQgPT4gUXVlcnkudXNlck1ldGEoc2NvcGUsIGlkKSxcbiAgICAgIFIudW5pcShbc3BlYyAmJiBzcGVjLmluZGV4ZXIsIHNwZWMgJiYgc3BlYy5vd25lciwgc3BlYyAmJiBzcGVjLnRhYnVsYXRvcl0pXG4gICAgKVxuICBdKTtcbiAgY29uc3Qgb3BJZHMgPSBSLmNvbXBvc2UoXG4gICAgUi53aXRob3V0KGlkcyksXG4gICAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gICAgUi51bmlxLFxuICAgIFIubWFwKFIucGF0aE9yKG51bGwsIFtcImRhdGFcIiwgXCJvcElkXCJdKSlcbiAgKSh0aGluZ3MpO1xuXG4gIGlmIChvcElkcy5sZW5ndGgpIHtcbiAgICBjb25zdCBvcFNvdWxzID0gTGlzdGluZy5pZHNUb1NvdWxzKG9wSWRzKTtcblxuICAgIGF3YWl0IFF1ZXJ5Lm11bHRpVGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgICB0aGluZ1NvdWxzOiBvcFNvdWxzLFxuICAgICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLFxuICAgICAgZGF0YTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHNwZWMuY2hhdFRvcGljKSB7XG4gICAgY29uc3QgY2hhdFBhdGggPSBgL3QvJHtzcGVjLmNoYXRUb3BpY30vY2hhdGA7XG5cbiAgICBpZiAoY2hhdFBhdGggIT09IHBhdGgpXG4gICAgICBhd2FpdCBwcmVsb2FkTGlzdGluZyhzY29wZSwgYC90LyR7c3BlYy5jaGF0VG9waWN9L2NoYXRgLCB7fSk7XG4gIH1cblxuICByZXR1cm4gc2NvcGUuZ2V0Q2FjaGUoKTtcbn07XG5cbmNvbnN0IGxpc3RpbmcgPSAoe1xuICBwcmVmaXg6IGRlZmF1bHRQcmVmaXggPSBcInRcIixcbiAgaWRlbnRpZmllcjogZGVmYXVsdElkZW50aWZpZXIgPSBcImFsbFwiLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiaG90XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgcHJlZml4ID0gZGVmYXVsdFByZWZpeCxcbiAgICAgIGlkZW50aWZpZXIgPSBkZWZhdWx0SWRlbnRpZmllcixcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT4gd2l0aExpc3RpbmdNYXRjaChgLyR7cHJlZml4fS8ke2lkZW50aWZpZXJ9LyR7c29ydH1gLCBxdWVyeSlcbn0pO1xuXG5jb25zdCB0aGluZ0NvbW1lbnRzID0gKHtcbiAgcHJlZml4OiBkZWZhdWx0UHJlZml4ID0gXCJ0XCIsXG4gIGlkZW50aWZpZXI6IGRlZmF1bHRJZGVudGlmaWVyID0gXCJhbGxcIixcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImJlc3RcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBvcElkLFxuICAgICAgcHJlZml4ID0gZGVmYXVsdFByZWZpeCxcbiAgICAgIGlkZW50aWZpZXIgPSBkZWZhdWx0SWRlbnRpZmllcixcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuQ29tbWVudExpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRoaW5nSWQ6IG9wSWQsXG4gICAgICAgIHNvcnRcbiAgICAgIH0pLFxuICAgICAgUi5hc3NvYyhcImxpbWl0XCIsIDEwMDAsIHF1ZXJ5KVxuICAgIClcbn0pO1xuXG5jb25zdCBzcGFjZUxpc3RpbmcgPSAoe1xuICBuYW1lOiBkZWZhdWx0TmFtZSA9IFwiZGVmYXVsdFwiLFxuICBhdXRob3JJZDogZGVmYXVsdEF1dGhvcklkLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiZGVmYXVsdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIGF1dGhvcklkID0gZGVmYXVsdEF1dGhvcklkLFxuICAgICAgbmFtZSA9IGRlZmF1bHROYW1lLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5TcGFjZUxpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIGF1dGhvcklkOiBhdXRob3JJZCB8fCBDb25maWcub3duZXIsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNvcnRcbiAgICAgIH0pLFxuICAgICAgcXVlcnlcbiAgICApXG59KTtcblxuY29uc3Qgc3BhY2VUaGluZ0NvbW1lbnRzID0gKHtcbiAgbmFtZTogZGVmYXVsdE5hbWUgPSBcImRlZmF1bHRcIixcbiAgYXV0aG9ySWQ6IGRlZmF1bHRBdXRob3JJZCxcbiAgc29ydDogZGVmYXVsdFNvcnQgPSBcImhvdFwiLFxuICAuLi5yZXN0XG59KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBvcElkLFxuICAgICAgYXV0aG9ySWQgPSBkZWZhdWx0QXV0aG9ySWQsXG4gICAgICBuYW1lID0gZGVmYXVsdE5hbWUsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+IHtcbiAgICBjb25zdCBzcGFjZVBhdGggPSBMaXN0aW5nVHlwZS5TcGFjZUxpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogYXV0aG9ySWQgfHwgQ29uZmlnLm93bmVyLFxuICAgICAgbmFtZSxcbiAgICAgIHNvcnRcbiAgICB9KTtcbiAgICBjb25zdCBsaXN0aW5nUGF0aCA9IExpc3RpbmdUeXBlLkNvbW1lbnRMaXN0aW5nLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogb3BJZCxcbiAgICAgIHNvcnRcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBzcGFjZTogcXVlcnkoXG4gICAgICAgIHNjb3BlID0+IExpc3Rpbmcuc3BlY0Zyb21QYXRoKHNjb3BlLCBzcGFjZVBhdGgsIHF1ZXJ5KSxcbiAgICAgICAgYHNwZWM6JHtzcGFjZVBhdGh9YFxuICAgICAgKSxcbiAgICAgIGlkczogcXVlcnkoXG4gICAgICAgIHNjb3BlID0+IExpc3RpbmcuZnJvbVBhdGgoc2NvcGUsIGxpc3RpbmdQYXRoLCBxdWVyeSksXG4gICAgICAgIGxpc3RpbmdQYXRoXG4gICAgICApLFxuICAgICAgcHJlbG9hZDogc2NvcGUgPT4gcHJlbG9hZExpc3Rpbmcoc2NvcGUsIGxpc3RpbmdQYXRoLCBxdWVyeSlcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvZmlsZSA9ICh7XG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJuZXdcIixcbiAgdHlwZTogZGVmYXVsdFR5cGUgPSBcIm92ZXJ2aWV3XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczogeyBhdXRob3JJZCwgdHlwZSA9IGRlZmF1bHRUeXBlLCBzb3J0ID0gZGVmYXVsdFNvcnQgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5Qcm9maWxlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5jb25zdCBpbmJveCA9ICh7XG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJuZXdcIixcbiAgdHlwZTogZGVmYXVsdFR5cGUgPSBcIm92ZXJ2aWV3XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIGF1dGhvcklkLFxuICAgIHBhcmFtczogeyB0eXBlID0gZGVmYXVsdFR5cGUsIHNvcnQgPSBkZWZhdWx0U29ydCB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLkluYm94TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5leHBvcnQgY29uc3QgUGFnZSA9IHtcbiAgd2l0aExpc3RpbmdNYXRjaCxcbiAgcHJlbG9hZExpc3RpbmcsXG4gIHdpa2lQYWdlLFxuICB0aGluZ0NvbW1lbnRzLFxuICBsaXN0aW5nLFxuICBzcGFjZUxpc3RpbmcsXG4gIHNwYWNlVGhpbmdDb21tZW50cyxcbiAgcHJvZmlsZSxcbiAgaW5ib3hcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gXCIuL1ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSBcIi4vQXV0aGVudGljYXRpb25cIjtcblxuZnVuY3Rpb24gaW5pdChHdW4sIGNvbmZpZyA9IHt9KSB7XG4gIGNvbnN0IHsgbGVlY2gsIGRpc2FibGVWYWxpZGF0aW9uLCBub0d1biwgbG9jYWxTdG9yYWdlLCBwZXJzaXN0LCAuLi5yZXN0IH0gPVxuICAgIGNvbmZpZyB8fCB7fTtcbiAgY29uc3QgcGVlciA9IHsgY29uZmlnIH07XG5cbiAgaWYgKCFub0d1bikge1xuICAgIGNvbnN0IGNmZyA9IHsgbG9jYWxTdG9yYWdlOiAhIWxvY2FsU3RvcmFnZSwgcmFkaXNrOiAhIXBlcnNpc3QsIC4uLnJlc3QgfTtcblxuICAgIGlmIChwZXJzaXN0KSBjZmcubG9jYWxTdG9yYWdlID0gZmFsc2U7XG4gICAgaWYgKCFkaXNhYmxlVmFsaWRhdGlvbikgR3VuLm9uKFwib3B0XCIsIFZhbGlkYXRpb24uZ3VuV2lyZUlucHV0KHBlZXIpKTtcbiAgICBpZiAoY2ZnLnN0b3JlRm4pIGNmZy5zdG9yZSA9IGNmZy5zdG9yZUZuKGNmZyk7IC8vIGZvciBpbmRleGVkZGJcbiAgICBwZWVyLmd1biA9IEd1bihjZmcpO1xuICAgIGlmIChjZmcubG9jYWxTdG9yYWdlKSBwZWVyLmd1bi5vbihcImxvY2FsU3RvcmFnZTplcnJvclwiLCBhID0+IGEucmV0cnkoe30pKTtcbiAgICBpZiAobGVlY2gpIHtcbiAgICAgIGNvbnN0IHNlbmRMZWVjaCA9ICgpID0+IHBlZXIuZ3VuLl8ub24oXCJvdXRcIiwgeyBsZWVjaDogdHJ1ZSB9KTtcblxuICAgICAgc2VuZExlZWNoKCk7XG4gICAgfVxuICB9XG5cbiAgcGVlci5uZXdTY29wZSA9IG9wdHMgPT4gUXVlcnkuY3JlYXRlU2NvcGUocGVlciwgb3B0cyk7XG4gIHBlZXIub25Mb2dpbiA9IEF1dGhlbnRpY2F0aW9uLm9uTG9naW4ocGVlcik7XG4gIHBlZXIuc2lnbnVwID0gQXV0aGVudGljYXRpb24uc2lnbnVwKHBlZXIpO1xuICBwZWVyLmxvZ2luID0gQXV0aGVudGljYXRpb24ubG9naW4ocGVlcik7XG4gIHBlZXIubG9nb3V0ID0gKCkgPT4gQXV0aGVudGljYXRpb24ubG9nb3V0KHBlZXIpO1xuICBwZWVyLmlzTG9nZ2VkSW4gPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluKHBlZXIpO1xuICBwZWVyLnN1Ym1pdCA9IFRoaW5nLnN1Ym1pdChwZWVyKTtcbiAgcGVlci5jb21tZW50ID0gVGhpbmcuY29tbWVudChwZWVyKTtcbiAgcGVlci5jaGF0ID0gVGhpbmcuY2hhdChwZWVyKTtcbiAgcGVlci53cml0ZVBhZ2UgPSBUaGluZy53cml0ZVBhZ2UocGVlcik7XG4gIHBlZXIudm90ZSA9IFRoaW5nLnZvdGUocGVlcik7XG4gIHBlZXIucXVlcmllcyA9IFF1ZXJ5O1xuICByZXR1cm4gcGVlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFBlZXIgPSB7XG4gIGluaXRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgc2NvcGUgYXMgbWFrZVNjb3BlLCBxdWVyeSwgYWxsLCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nL0xpc3RpbmdOb2RlXCI7XG5cbmNvbnN0IGVtcHR5UHJvbWlzZSA9IHJlc29sdmUobnVsbCk7XG5jb25zdCB1bmlvbkFycmF5cyA9IFIucmVkdWNlKFIudW5pb24sIFtdKTtcblxuY29uc3QgdG9waWNTb3VscyA9IHBhcmFtcyA9PiB7XG4gIGNvbnN0IHsgdG9waWNzID0gW1wiYWxsXCJdIH0gPSBwYXJhbXMgfHwge307XG4gIGNvbnN0IGRheXMgPSBSLnByb3BPcigzNjUsIFwiZGF5c1wiLCBwYXJhbXMpIHx8IDM2NTtcbiAgY29uc3QgZGF5U3RyaW5ncyA9IFtdO1xuICBjb25zdCBvbmVEYXkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gb25lRGF5ICogcGFyc2VJbnQoZGF5cywgMTApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IGRheXMgKyAxOyBpKyspXG4gICAgZGF5U3RyaW5ncy5wdXNoKFRoaW5nU2V0LmRheVN0cihzdGFydCArIGkgKiBvbmVEYXkpKTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKFxuICAgIHRvcGljcy5yZWR1Y2UoXG4gICAgICAocmVzdWx0LCB0b3BpY05hbWUpID0+XG4gICAgICAgIGRheVN0cmluZ3MucmVkdWNlKChyZXMsIGRzKSA9PiB7XG4gICAgICAgICAgcmVzW2Ake0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy8ke3RvcGljTmFtZX0vZGF5cy8ke2RzfWBdID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LCByZXN1bHQpLFxuICAgICAge31cbiAgICApXG4gICk7XG59O1xuXG5jb25zdCBzaW5nbGVUb3BpYyA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHRTb3VscyA9IHRvcGljU291bHMoeyAuLi5wYXJhbXMsIHRvcGljczogW3BhcmFtcy50b3BpY10gfSk7XG4gIGxldCBzb3VscyA9IFtdO1xuICBsZXQgaXRlbU1heCA9IENvbnN0YW50cy5MSVNUSU5HX1NJWkU7XG5cbiAgaWYgKHBhcmFtcy5zb3J0ID09PSBcIm5ld1wiKSB7XG4gICAgaXRlbU1heCA9IENvbnN0YW50cy5MSVNUSU5HX1NJWkU7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBhcmFtcy5zb3J0ID09PSBcInRvcFwiKSBpdGVtTWF4ID0gaXRlbU1heCAqIDM7XG4gICAgaWYgKHBhcmFtcy50b3BpYyA9PT0gXCJhbGxcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICB9XG5cbiAgY29uc3QgZmV0Y2hNb3JlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvcGljU291bCA9IHRTb3Vscy5wb3AoKTtcblxuICAgIGlmIChzb3Vscy5sZW5ndGggPiBpdGVtTWF4IHx8ICF0b3BpY1NvdWwpIHJldHVybiByZXNvbHZlKHNvdWxzKTtcbiAgICByZXR1cm4gc2NvcGVcbiAgICAgIC5nZXQodG9waWNTb3VsKVxuICAgICAgLnNvdWxzKClcbiAgICAgIC50aGVuKG1vcmUgPT4ge1xuICAgICAgICBzb3VscyA9IFsuLi5zb3VscywgLi4ubW9yZV07XG4gICAgICAgIHJldHVybiBmZXRjaE1vcmUoKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBmZXRjaE1vcmUoKTtcbn0pO1xuXG5jb25zdCBzaW5nbGVEb21haW4gPSBxdWVyeSgoc2NvcGUsIHsgZG9tYWluIH0pID0+XG4gIHNjb3BlLmdldChTY2hlbWEuRG9tYWluLnJvdXRlLnJldmVyc2UoeyBkb21haW5OYW1lOiBkb21haW4gfSkpLnNvdWxzKClcbik7XG5cbmNvbnN0IHNpbmdsZUF1dGhvciA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBhbGwoW1xuICAgIHBhcmFtcy50eXBlICYmIHBhcmFtcy50eXBlICE9PSBcInN1Ym1pdHRlZFwiICYmIHBhcmFtcy50eXBlICE9PSBcIm92ZXJ2aWV3XCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KGB+JHtwYXJhbXMuYXV0aG9ySWR9YClcbiAgICAgICAgICAuZ2V0KFwic3VibWlzc2lvbnNcIilcbiAgICAgICAgICAuc291bHMoKSxcbiAgICBwYXJhbXMudHlwZSAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1lbnRzXCIgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwiY29tbWFuZHNcIlxuICAgICAgPyByZXNvbHZlKFtdKVxuICAgICAgOiBzY29wZVxuICAgICAgICAgIC5nZXQoYH4ke3BhcmFtcy5hdXRob3JJZH1gKVxuICAgICAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgICAgIC5zb3VscygpXG4gIF0pLnRoZW4oKFtzdWJtaXNzaW9ucywgY29tbWVudHNdKSA9PiB1bmlvbkFycmF5cyhbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkpXG4pO1xuXG5jb25zdCBsaXN0aW5nSWRzID0gcXVlcnkoXG4gIChzY29wZSwgc291bCkgPT4gc2NvcGUuZ2V0KHNvdWwpLnRoZW4oTGlzdGluZ05vZGUuc29ydGVkSWRzKSxcbiAgXCJsaXN0aW5nSWRzXCJcbik7XG5cbmNvbnN0IHNpbmdsZUxpc3RpbmcgPSBxdWVyeSgoc2NvcGUsIHsgbGlzdGluZywgc29ydCwgaW5kZXhlciB9KSA9PlxuICBsaXN0aW5nSWRzKHNjb3BlLCBgJHtDb25zdGFudHMuUFJFRklYfSR7bGlzdGluZ30vJHtzb3J0fUB+JHtpbmRleGVyfS5gKS50aGVuKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubWFwKHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKSxcbiAgICAgIFIuZmlsdGVyKFIuaWRlbnRpdHkpXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCByZXBsaWVzVG9BdXRob3IgPSBxdWVyeShcbiAgKHNjb3BlLCB7IHJlcGxpZXNUb0F1dGhvcklkLCB0eXBlID0gXCJvdmVydmlld1wiLCAuLi5wYXJhbXMgfSkgPT5cbiAgICBzaW5nbGVMaXN0aW5nKHNjb3BlLCB7XG4gICAgICBsaXN0aW5nOiBgL3VzZXIvJHtyZXBsaWVzVG9BdXRob3JJZH0vJHt0eXBlfWAsXG4gICAgICBzb3J0OiBcIm5ld1wiLFxuICAgICAgLi4ucGFyYW1zXG4gICAgfSkudGhlbihhdXRob3JlZFNvdWxzID0+XG4gICAgICBhbGwoXG4gICAgICAgIGF1dGhvcmVkU291bHMubWFwKGF1dGhvcmVkU291bCA9PlxuICAgICAgICAgIHNjb3BlLmdldChgJHthdXRob3JlZFNvdWx9L2NvbW1lbnRzYCkuc291bHMoKVxuICAgICAgICApXG4gICAgICApLnRoZW4odW5pb25BcnJheXMpXG4gICAgKVxuKTtcblxuY29uc3Qgc2luZ2xlU3VibWlzc2lvbiA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBzY29wZVxuICAgIC5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KVxuICAgIClcbiAgICAuc291bHMoXG4gICAgICBSLnByZXBlbmQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBwYXJhbXMuc3VibWlzc2lvbklkIH0pKVxuICAgIClcbik7XG5cbmNvbnN0IHRoaW5nID0gcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gIHNjb3BlLmdldCh0aGluZ1NvdWwpLnRoZW4obWV0YSA9PiB7XG4gICAgaWYgKCFtZXRhIHx8ICFtZXRhLmlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCByZXN1bHQgPSB7IGlkOiBtZXRhLmlkLCB0aW1lc3RhbXA6IHBhcnNlRmxvYXQobWV0YS50aW1lc3RhbXAsIDEwKSB9O1xuICAgIGNvbnN0IHJlcGx5VG9Tb3VsID0gUi5wYXRoKFtcInJlcGx5VG9cIiwgXCIjXCJdLCBtZXRhKTtcbiAgICBjb25zdCBvcFNvdWwgPSBSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBtZXRhKTtcbiAgICBjb25zdCBvcElkID0gb3BTb3VsID8gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKG9wU291bCkudGhpbmdpZCA6IG51bGw7XG4gICAgY29uc3QgcmVwbHlUb0lkID0gcmVwbHlUb1NvdWxcbiAgICAgID8gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHJlcGx5VG9Tb3VsKS50aGluZ2lkXG4gICAgICA6IG51bGw7XG5cbiAgICBpZiAob3BJZCkgcmVzdWx0Lm9wSWQgPSBvcElkO1xuICAgIGlmIChyZXBseVRvSWQpIHJlc3VsdC5yZXBseVRvSWQgPSByZXBseVRvSWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IG11bHRpUXVlcnkgPSAoc2luZ2xlUXVlcnksIHBsdXJhbCwgc2luZ2xlLCBjb2xsYXRlID0gdW5pb25BcnJheXMpID0+XG4gIHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBSLnByb3AocGx1cmFsLCBwYXJhbXMpO1xuXG4gICAgaWYgKFIuaXNOaWwoaXRlbXMpKSByZXR1cm4gZW1wdHlQcm9taXNlO1xuICAgIHJldHVybiBhbGwoXG4gICAgICBSLm1hcChcbiAgICAgICAgdmFsID0+IHNpbmdsZVF1ZXJ5KHNjb3BlLCB7IC4uLnBhcmFtcywgW3NpbmdsZV06IHZhbCB9KSxcbiAgICAgICAgUi5wcm9wT3IoW10sIHBsdXJhbCwgcGFyYW1zKVxuICAgICAgKVxuICAgICkudGhlbihjb2xsYXRlKTtcbiAgfSk7XG5cbmNvbnN0IG11bHRpVG9waWMgPSBtdWx0aVF1ZXJ5KHNpbmdsZVRvcGljLCBcInRvcGljc1wiLCBcInRvcGljXCIpO1xuY29uc3QgbXVsdGlEb21haW4gPSBtdWx0aVF1ZXJ5KHNpbmdsZURvbWFpbiwgXCJkb21haW5zXCIsIFwiZG9tYWluXCIpO1xuY29uc3QgbXVsdGlBdXRob3IgPSBtdWx0aVF1ZXJ5KHNpbmdsZUF1dGhvciwgXCJhdXRob3JJZHNcIiwgXCJhdXRob3JJZFwiKTtcbmNvbnN0IG11bHRpU3VibWlzc2lvbiA9IG11bHRpUXVlcnkoXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIFwic3VibWlzc2lvbklkc1wiLFxuICBcInN1Ym1pc3Npb25JZFwiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGFGcm9tU291bHMgPSBzY29wZSA9PiBzb3VscyA9PlxuICBhbGwoXG4gICAgc291bHNcbiAgICAgIC5maWx0ZXIoeCA9PiAhIXgpXG4gICAgICAubWFwKHNvdWwgPT5cbiAgICAgICAgc2NvcGVcbiAgICAgICAgICAuZ2V0KHNvdWwpXG4gICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAudGhlbih4ID0+IHgpXG4gICAgICApXG4gICk7XG5cbmNvbnN0IGN1cmF0ZWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkcywgc3VibWlzc2lvbk9ubHkgPSBmYWxzZSkgPT5cbiAgYWxsKFtcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJjb21tZW50c1wiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSlcbiAgICAgIC50aGVuKHRoaW5nRGF0YUZyb21Tb3VscyhzY29wZSkpXG4gICAgICAudGhlbihcbiAgICAgICAgUi5jb21wb3NlKFxuICAgICAgICAgIFIubWFwKHN1Ym1pc3Npb25Pbmx5ID8gUi5wcm9wKFwib3BJZFwiKSA6IFIucHJvcChcInJlcGx5VG9JZFwiKSksXG4gICAgICAgICAgUi5maWx0ZXIoUi5wcm9wKFwicmVwbHlUb0lkXCIpKVxuICAgICAgICApXG4gICAgICApLFxuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcInN1Ym1pdHRlZFwiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSkudGhlbihSLm1hcChzb3VsID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChzb3VsKS50aGluZ0lkKSlcbiAgXSkudGhlbigoW2lkczEsIGlkczJdKSA9PiBSLnVuaXEoWy4uLmlkczEsIC4uLmlkczJdKSlcbik7XG5cbmNvbnN0IHRoaW5nU2NvcmVzID0gcXVlcnkoXG4gIChzY29wZSwgdGFidWxhdG9yLCB0aGluZ0lkKSA9PlxuICAgIHRhYnVsYXRvciAmJiB0aGluZ0lkXG4gICAgICA/IHNjb3BlXG4gICAgICAgICAgLmdldChTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCB0YWJ1bGF0b3IgfSkpXG4gICAgICAgICAgLnRoZW4oKVxuICAgICAgOiByZXNvbHZlKCksXG4gIFwidGhpbmdTY29yZXNcIlxuKTtcblxuY29uc3QgdGhpbmdEYXRhID0gcXVlcnkoKHNjb3BlLCB0aGluZ0lkKSA9PiB7XG4gIHJldHVybiB0aGluZ0lkXG4gICAgPyBzY29wZS5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKS5nZXQoXCJkYXRhXCIpXG4gICAgOiByZXNvbHZlKG51bGwpO1xufSwgXCJ0aGluZ0RhdGFcIik7XG5cbmNvbnN0IHRoaW5nTWV0YSA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgdGhpbmdTb3VsLCB0YWJ1bGF0b3IsIGRhdGEgPSBmYWxzZSwgc2NvcmVzID0gZmFsc2UgfSkgPT4ge1xuICAgIGlmICghdGhpbmdTb3VsKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICBjb25zdCBpZCA9IExpc3RpbmdOb2RlLnNvdWxUb0lkKHRoaW5nU291bCk7XG5cbiAgICByZXR1cm4gYWxsKFtcbiAgICAgIHRoaW5nKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgICAgc2NvcmVzXG4gICAgICAgID8gdGhpbmdTY29yZXMoc2NvcGUsIHRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLCBpZClcbiAgICAgICAgOiByZXNvbHZlKCksXG4gICAgICBkYXRhID8gdGhpbmdEYXRhKHNjb3BlLCBpZCkgOiByZXNvbHZlKClcbiAgICBdKS50aGVuKChbbWV0YSwgdm90ZXMsIGRhdGFdKSA9PiB7XG4gICAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHsgLi4ubWV0YSwgdm90ZXMsIGRhdGEgfTtcbiAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgbXVsdGlUaGluZ01ldGEgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFxuICAgIFIucmVkdWNlKFxuICAgICAgKHByb21pc2VzLCB0aGluZ1NvdWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiBwcm9taXNlcztcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGluZ01ldGEoc2NvcGUsIHsgLi4ucGFyYW1zLCB0aGluZ1NvdWwgfSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG4gICAgICB9LFxuICAgICAgW10sXG4gICAgICBSLnByb3BPcihbXSwgXCJ0aGluZ1NvdWxzXCIsIHBhcmFtcylcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHVzZXJQYWdlcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIGF1dGhvcklkKSA9PlxuICAgIHNjb3BlLmdldChTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkIH0pKSxcbiAgXCJ1c2VyUGFnZXNcIlxuKTtcblxuY29uc3Qgd2lraVBhZ2VJZCA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUpID0+IHtcbiAgaWYgKCFhdXRob3JJZCB8fCAhbmFtZSkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gIHJldHVybiBzY29wZVxuICAgIC5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSlcbiAgICAuZ2V0KG5hbWUpXG4gICAgLmdldChcImlkXCIpO1xufSwgXCJ3aWtpUGFnZUlkXCIpO1xuXG5jb25zdCB3aWtpUGFnZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUpID0+XG4gIHdpa2lQYWdlSWQoc2NvcGUsIGF1dGhvcklkLCBuYW1lKS50aGVuKGlkID0+IGlkICYmIHRoaW5nRGF0YShzY29wZSwgaWQpKVxuKTtcblxuY29uc3QgdXNlck1ldGEgPSBxdWVyeSgoc2NvcGUsIGlkKSA9PiB7XG4gIGlmICghaWQpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICByZXR1cm4gc2NvcGUuZ2V0KGB+JHtpZH1gKS50aGVuKG1ldGEgPT4gKHtcbiAgICBhbGlhczogUi5wcm9wKFwiYWxpYXNcIiwgbWV0YSksXG4gICAgY3JlYXRlZEF0OiBSLnBhdGgoW1wiX1wiLCBcIj5cIiwgXCJwdWJcIl0sIG1ldGEpXG4gIH0pKTtcbn0sIFwidXNlck1ldGFcIik7XG5cbmNvbnN0IGNyZWF0ZVNjb3BlID0gUi5jdXJyeSgobmFiLCBvcHRzKSA9PlxuICBtYWtlU2NvcGUoUi5hc3NvYyhcImd1blwiLCBuYWIuZ3VuLCBvcHRzIHx8IHt9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBRdWVyeSA9IHtcbiAgc2luZ2xlVG9waWMsXG4gIHNpbmdsZURvbWFpbixcbiAgc2luZ2xlQXV0aG9yLFxuICBzaW5nbGVMaXN0aW5nLFxuICByZXBsaWVzVG9BdXRob3IsXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIHRoaW5nTWV0YSxcbiAgbXVsdGlUaGluZ01ldGEsXG4gIG11bHRpVG9waWMsXG4gIG11bHRpRG9tYWluLFxuICBtdWx0aUF1dGhvcixcbiAgbXVsdGlTdWJtaXNzaW9uLFxuICB0aGluZ1Njb3JlcyxcbiAgdGhpbmdEYXRhLFxuICB0aGluZ0RhdGFGcm9tU291bHMsXG4gIHRvcGljU291bHMsXG4gIHVzZXJQYWdlcyxcbiAgd2lraVBhZ2VJZCxcbiAgd2lraVBhZ2UsXG4gIHVzZXJNZXRhLFxuICBjcmVhdGVTY29wZSxcbiAgY3VyYXRlZFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuaW1wb3J0ICogYXMgc2VhIGZyb20gXCJndW4tc3VwcHJlc3Nvci1zZWFyXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIC4uLnNlYS5BVVRIX1NDSEVNQSxcbiAgdG9waWNOYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtaW5MZW5ndGg6IDEsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RPUElDX1NJWkVcbiAgfSxcblxuICBUb3BpY0RheToge1xuICAgIHRpdGxlOiBcIlRvcGljIERheVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkEgc2luZ2xlIGRheSBvZiB0aGluZ3MgaW4gYSB0b3BpY1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy86dG9waWNOYW1lL2RheXMvOnllYXIvOm1vbnRoLzpkYXlgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgICAgeWVhcjogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAyMDE4LCBtYXhpbXVtOiAyMTAwIH0sXG4gICAgICAgIG1vbnRoOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDEyIH0sXG4gICAgICAgIGRheTogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAxLCBtYXhpbXVtOiAzMSB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljTmFtZVwiLCBcInllYXJcIiwgXCJtb250aFwiLCBcImRheVwiXVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBuYW1lOiBcInRvcGljTmFtZVwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbmFtZToge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXByZWNhdGVkIGFzIHVubmVjZXNzYXJ5XCIsXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG5cbiAgVG9waWM6IHtcbiAgICB0aXRsZTogXCJUb3BpY1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgaW4gYSB0b3BpY1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy86dG9waWNOYW1lYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWNOYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBkb21haW5OYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtaW5MZW5ndGg6IDEsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0RPTUFJTl9TSVpFXG4gIH0sXG5cbiAgRG9tYWluOiB7XG4gICAgdGl0bGU6IFwiRG9tYWluXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIGRvbWFpblwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2RvbWFpbnMvOmRvbWFpbk5hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkb21haW5OYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImRvbWFpbk5hbWVcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdXJsOiB7IHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9VUkxfU0laRSB9LFxuICBVUkw6IHtcbiAgICB0aXRsZTogXCJVUkxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGZvciBhIGdpdmVuIFVSTFwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VybHMvXFwqdXJsYCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cmw6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ1cmxcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdGhpbmdJZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0hBU0hfU0laRVxuICB9LFxuXG4gIHRoaW5nU291bDoge1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHRoaW5nSWQ6IHsgXCIjcmVmXCI6IFwiI2RlZmluaXRpb25zL3RoaW5nSWRcIiB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nQWxsQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBBbGwgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgY29tbWVudHMgZm9yIGEgZ2l2ZW4gc3VibWlzc2lvblwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9hbGxjb21tZW50c2AsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRGlyZWN0IHJlcGxpZXMgdG8gYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9jb21tZW50c2AsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdGltZXN0YW1wOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9LFxuICB0aGluZ0tpbmQ6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19LSU5EX1NJWkVcbiAgfSxcblxuICBUaGluZzoge1xuICAgIHRpdGxlOiBcIlRoaW5nIFJlZmVyZW5jZVwiLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJUaGVzZSBhcmUgc3VibWlzc2lvbnMsIGNvbW1lbnRzLCBjaGF0IG1lc3NhZ2VzIGFuZCB3aWtpIHBhZ2VzXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBpZDogXCJ0aGluZ0lkXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBraW5kOiB7IFwiI3JlZlwiOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfSxcbiAgICAgIG9yaWdpbmFsSGFzaDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG9uZU9mOiBbXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdEYXRhRWRnZVwiIH0sXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdEYXRhU2lnbmVkRWRnZVwiIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7XG4gICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb21lIG9sZCB0aGluZ3MgaGFkIGdlbmVyaWMgdG9waWMgc291bHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIFwiI1wiOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogNDIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBbXCIjXCJdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Eb21haW5FZGdlXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVVJMRWRnZVwiIH0sXG4gICAgICBjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQ29tbWVudHNcIiB9LFxuICAgICAgYWxsY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0FsbENvbW1lbnRzXCIgfSxcbiAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgdm90ZXNkb3duOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc0Rvd25cIiB9LFxuICAgICAgb3A6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICByZXBseVRvOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9TRUFBdXRob3JFZGdlXCIgfVxuICAgIH0sXG5cbiAgICBhbnlPZjogW1xuICAgICAge1xuICAgICAgICBhbGxPZjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaW5nSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhbnlPZjogW1xuICAgICAgICAgICAgICB7IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZzogdHJ1ZSB9LFxuICAgICAgICAgICAgICB7IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2g6IHRydWUgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHsgaXNMZWdhY3lUaGluZzogdHJ1ZSB9LFxuICAgICAge1xuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNlbGYgdmVyaWZ5aW5nIGNhbiBiZSB1cGRhdGVkIGluIGlzb2xhdGlvblwiLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgaWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICAgICAgYWxsY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0FsbENvbW1lbnRzXCIgfSxcbiAgICAgICAgICB2b3Rlc3VwOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc1VwXCIgfSxcbiAgICAgICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSxcblxuICBQcm9vZk9mV29ya1ZvdGVzOiB7XG4gICAgJGFzeW5jOiB0cnVlLFxuICAgIGtleXNBcmVQcm9vZnNPZldvcms6IHtcbiAgICAgIGFsZ29yaXRobTogXCJhcmdvbjJkXCIsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgY29tcGxleGl0eTogNixcbiAgICAgICAgaGFzaExlbmd0aDogMzIsXG4gICAgICAgIHRpbWVDb3N0OiAxLFxuICAgICAgICBtZW1vcnlDb3N0OiAxMDI0MCxcbiAgICAgICAgcGFyYWxsZWxpc206IDFcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3Rlc1VwOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVzdXBgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1Byb29mT2ZXb3JrVm90ZXNcIiB9XVxuICB9LFxuXG4gIFRoaW5nVm90ZXNEb3duOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVzZG93bmAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdEYXRhOiB7XG4gICAgdGl0bGU6IFwiVW5zaWduZWQgVGhpbmcgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgaXMgdGhlIGFjdHVhbCBjb250ZW50IG9mIGEgdGhpbmdcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvZGF0YWAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV0sXG4gICAgICByZXF1aXJlZDogW1widGhpbmdJZFwiXVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAga2luZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX1RJVExFX1NJWkVcbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0JPRFlfU0laRVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9LFxuICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgIG9wSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgcmVwbHlUb0lkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRvbWFpbjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0sXG4gICAgICB1cmw6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3VybFwiIH0sXG4gICAgICB0aW1lc3RhbXA6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH1cbiAgICB9LFxuICAgIHRoaW5nRGF0YUhhc2hNYXRjaGVzU291bDogdHJ1ZVxuICB9LFxuXG4gIFRoaW5nRGF0YVNpZ25lZDoge1xuICAgIHRpdGxlOiBcIlNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoaXMgaXMgdGhlIGFjdHVhbCBjb250ZW50IG9mIGEgdGhpbmcsIGNyeXB0b2dyYXBoaWNhbGx5IHNpZ25lZFwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widGhpbmdJZFwiLCBcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9IH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9waWM6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0gfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgc2VhOiB7XG4gICAgICAgICAgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUFsaWFzXCIgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcklkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0gfSxcbiAgICAgIG9wSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICByZXBseVRvSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICBkb21haW46IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9IH0sXG4gICAgICB1cmw6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VybFwiIH0gfSxcbiAgICAgIHRpbWVzdGFtcDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfSB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nVm90ZUNvdW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIFZvdGUgQ291bnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWdncmVnYXRlZCBjb3VudHMgZnJvbSBhIHRhYnVsYXRvclwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3RlY291bnRzQH46dGFidWxhdG9yLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIHRhYnVsYXRvcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgZG93bjogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGNvbW1lbnQ6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBzY29yZTogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGNvbW1hbmRzOiB7IHNlYTogeyB0eXBlOiBbXCJvYmplY3RcIiwgXCJzdHJpbmdcIl0gfSB9XG4gICAgfVxuICB9LFxuXG4gIExpc3RpbmdEYXRhOiB7XG4gICAgJGFzeW5jOiB0cnVlLFxuICAgIHRpdGxlOiBcIkxpc3RpbmcgTm9kZSBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU2hhcmVkIGRlc2NyaXB0aW9uIG9mIGxpc3RpbmcgcHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgIHBhdHRlcm5Qcm9wZXJ0aWVzOiB7XG4gICAgICBcIl5kKyRcIjogeyBzZWE6IHsgdHlwZTogW1wic3RyaW5nXCIsIFwibnVsbFwiLCBcInVuZGVmaW5lZFwiXSB9IH1cbiAgICB9LFxuXG4gICAgZGVsZXRlTWV0YUZvck1pc3Npbmc6IHRydWVcbiAgfSxcblxuICBzb3J0TmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1xuICAgICAgXCJuZXdcIixcbiAgICAgIFwib2xkXCIsXG4gICAgICBcImFjdGl2ZVwiLFxuICAgICAgXCJ0b3BcIixcbiAgICAgIFwiY29tbWVudHNcIixcbiAgICAgIFwiZGlzY3Vzc2VkXCIsXG4gICAgICBcImhvdFwiLFxuICAgICAgXCJiZXN0XCIsXG4gICAgICBcImNvbnRyb3ZlcnNpYWxcIixcbiAgICAgIFwicmFuZG9tXCIsXG4gICAgICBcImZpcmVob3NlXCIsXG4gICAgICBcImNoYXRcIlxuICAgIF1cbiAgfSxcblxuICBUb3BpY0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90Lzp0b3BpYy86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY1wiLCBcInNvcnRcIiwgXCJpbmRleGVyXCJdLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpYzogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgRG9tYWluTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2RvbWFpbi86ZG9tYWluLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcmVxdWlyZWQ6IFtcImRvbWFpblwiLCBcInNvcnRcIiwgXCJpbmRleGVyXCJdLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkb21haW46IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIHVzZXJMaXN0aW5nVHlwZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1wib3ZlcnZpZXdcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tZW50c1wiLCBcImNvbW1hbmRzXCIsIFwiY29tbWVudGVkXCJdXG4gIH0sXG5cbiAgQXV0aG9yUmVwbGllc0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JQcm9maWxlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBTcGFjZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBuYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvckNvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9ycyBjb21tZW50cyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9jb21tZW50c346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yU3VibWlzc2lvbnM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBTdWJtaXNzaW9uc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyBzdWJtaXNzaW9ucyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9zdWJtaXNzaW9uc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclRoaW5nczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFRoaW5nc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyB0aGluZ3Mgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JQYWdlczoge1xuICAgIHRpdGxlOiBcIkF1dGhvciBQYWdlIE1hcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1hcHBpbmcgb2YgcGFnZSBuYW1lcyB0byB0aGluZ3NcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9wYWdlc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlcyA9IFIua2V5cyhkZWZpbml0aW9ucykucmVkdWNlKChyZXN1bHQsIG5hbWUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IFIucGF0aChbbmFtZSwgXCJzb3VsXCIsIFwicGF0dGVyblwiXSwgZGVmaW5pdGlvbnMpO1xuXG4gIGlmICghcGF0dGVybikgcmV0dXJuIHJlc3VsdDtcbiAgcmV0dXJuIFIuYXNzb2MobmFtZSwgbmV3IFJvdXRlKHBhdHRlcm4pLCByZXN1bHQpO1xufSk7XG5cbmNvbnN0IGRlZnNXaXRoUm91dGVzID0gUi5jb21wb3NlKFxuICBSLnJlZHVjZShcbiAgICAocmVzLCBbbmFtZSwgcm91dGVdKSA9PlxuICAgICAgUi5hc3NvYyhuYW1lLCBSLmFzc29jKFwicm91dGVcIiwgcm91dGUsIFIucHJvcChuYW1lLCBkZWZpbml0aW9ucykpLCByZXMpLFxuICAgIHt9XG4gICksXG4gIFIudG9QYWlyc1xuKShyb3V0ZXMpO1xuXG5leHBvcnQgY29uc3QgU2NoZW1hID0ge1xuICAuLi5kZWZzV2l0aFJvdXRlcyxcbiAgZGVmaW5pdGlvbnMsXG4gIHJvdXRlc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgYWxsIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5pbXBvcnQgeyBDb21tZW50Q29tbWFuZCB9IGZyb20gXCIuL0NvbW1lbnRDb21tYW5kXCI7XG5cbmNvbnN0IHRhYnVsYXRvclF1ZXJ5ID0gcXVlcnkoYXN5bmMgKHNjb3BlLCByb3V0ZSkgPT4ge1xuICBjb25zdCB0aGluZ1NvdWwgPSBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZShyb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IFt1cCwgZG93biwgY29tbWVudCwgcmVwbHlTb3Vsc10gPSBhd2FpdCBhbGwoW1xuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L3ZvdGVzdXBgKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L3ZvdGVzZG93bmApLmNvdW50KCksXG4gICAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vYWxsY29tbWVudHNgKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2NvbW1lbnRzYCkuc291bHMoKVxuICBdKTtcbiAgY29uc3QgdGhpbmdEYXRhID0gYXdhaXQgUXVlcnkudGhpbmdEYXRhRnJvbVNvdWxzKHJlcGx5U291bHMpO1xuICBjb25zdCBjb21tYW5kTWFwID0gQ29tbWVudENvbW1hbmQubWFwKHRoaW5nRGF0YSk7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICB1cCxcbiAgICBkb3duLFxuICAgIGNvbW1lbnQsXG4gICAgcmVwbGllczogcmVwbHlTb3Vscy5sZW5ndGgsXG4gICAgc2NvcmU6IHVwIC0gZG93blxuICB9O1xuXG4gIGlmIChSLmtleXMoY29tbWFuZE1hcCkubGVuZ3RoKSByZXN1bHQuY29tbWFuZHMgPSBKU09OLnN0cmluZ2lmeShjb21tYW5kTWFwKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5leHBvcnQgY29uc3QgVGFidWxhdG9yID0geyBxdWVyeTogdGFidWxhdG9yUXVlcnkgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcblxuZXhwb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuZXhwb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nRGF0YU5vZGVcIjtcblxuY29uc3QgdG9waWNQcmVmaXhlcyA9IHtcbiAgY2hhdG1zZzogXCJjaGF0OlwiLFxuICBjb21tZW50OiBcImNvbW1lbnRzOlwiXG59O1xuXG5jb25zdCBzb3VsVG9JZCA9IFIuY29tcG9zZShcbiAgUi5wcm9wKFwidGhpbmdJZFwiKSxcbiAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoLmJpbmQoU2NoZW1hLlRoaW5nLnJvdXRlKVxuKTtcblxuY29uc3Qgc291bHNUb0lkcyA9IFIubWFwKHNvdWxUb0lkKTtcblxuY29uc3QgaW5kZXggPSBSLmN1cnJ5KChwZWVyLCB0aGluZ0lkLCBkYXRhKSA9PiB7XG4gIGlmICghZGF0YS50b3BpYyAmJiAhZGF0YS5vcElkKSByZXR1cm47XG5cbiAgaWYgKGRhdGEub3BJZCAmJiAhZGF0YS50b3BpYykge1xuICAgIHBlZXIuZ3VuXG4gICAgICAuZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogZGF0YS5vcElkIH0pKVxuICAgICAgLmdldChcImRhdGFcIilcbiAgICAgIC5vbihmdW5jdGlvbiByZWN2KHRkKSB7XG4gICAgICAgIGlmICghdGQpIHJldHVybjtcbiAgICAgICAgaW5kZXgocGVlciwgdGhpbmdJZCwgeyAuLi5kYXRhLCB0b3BpYzogdGQudG9waWMgfHwgXCJhbGxcIiB9KTtcbiAgICAgICAgdGhpcy5vZmYoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSk7XG4gIGNvbnN0IGRheVN0ciA9IFRoaW5nU2V0LmRheVN0cihkYXRhLnRpbWVzdGFtcCk7XG4gIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRheVN0ci5zcGxpdChcIi9cIik7XG4gIGNvbnN0IHRvcGljUHJlZml4ID0gdG9waWNQcmVmaXhlc1tkYXRhLmtpbmRdIHx8IFwiXCI7XG4gIGNvbnN0IGJhc2VUb3BpY05hbWUgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCB0b3BpY05hbWUgPSB0b3BpY1ByZWZpeCArIGJhc2VUb3BpY05hbWU7XG4gIGNvbnN0IHRvcGljID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lIH0pKTtcbiAgY29uc3QgdG9waWNEYXkgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hLlRvcGljRGF5LnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUsIHllYXIsIG1vbnRoLCBkYXkgfSlcbiAgKTtcblxuICBpZiAoIWRhdGEuc2tpcEFsbCAmJiBkYXRhLnRvcGljICE9PSBcImFsbFwiKSB7XG4gICAgY29uc3QgYWxsbmFtZSA9IGAke3RvcGljUHJlZml4fWFsbGA7XG4gICAgY29uc3QgYWxsVG9waWMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZTogYWxsbmFtZSB9KVxuICAgICk7XG4gICAgY29uc3QgYWxsVG9waWNEYXkgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRvcGljTmFtZTogYWxsbmFtZSxcbiAgICAgICAgeWVhcixcbiAgICAgICAgbW9udGgsXG4gICAgICAgIGRheVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgYWxsVG9waWMuc2V0KHRoaW5nKTtcbiAgICBhbGxUb3BpY0RheS5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEua2luZCA9PT0gXCJzdWJtaXNzaW9uXCIpIHtcbiAgICBjb25zdCB1cmxJbmZvID0gZGF0YS51cmwgPyBwYXJzZVVSSShkYXRhLnVybCkgOiB7fTtcbiAgICBjb25zdCBkb21haW5OYW1lID0gKGRhdGEudXJsXG4gICAgICA/ICh1cmxJbmZvLmhvc3QgfHwgdXJsSW5mby5zY2hlbWUgfHwgXCJcIikucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpXG4gICAgICA6IGBzZWxmLiR7ZGF0YS50b3BpY31gXG4gICAgKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRvbWFpbiA9IHBlZXIuZ3VuLmdldChTY2hlbWEuRG9tYWluLnJvdXRlLnJldmVyc2UoeyBkb21haW5OYW1lIH0pKTtcblxuICAgIGRvbWFpbi5zZXQodGhpbmcpO1xuXG4gICAgaWYgKGRhdGEudXJsKSB7XG4gICAgICBjb25zdCB1cmxOb2RlID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5VUkwucm91dGUucmV2ZXJzZSh7IHVybDogZGF0YS51cmwgfSkpO1xuXG4gICAgICAvLyB0aGluZy5nZXQoXCJ1cmxcIikucHV0KHVybE5vZGUpO1xuICAgICAgdXJsTm9kZS5zZXQodGhpbmcpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkYXRhLm9wSWQpIHtcbiAgICBjb25zdCBhbGxjb21tZW50cyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSlcbiAgICApO1xuXG4gICAgYWxsY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIGlmIChkYXRhLnJlcGx5VG9JZCB8fCBkYXRhLm9wSWQpIHtcbiAgICBjb25zdCBjb21tZW50cyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0aGluZ0lkOiBkYXRhLnJlcGx5VG9JZCB8fCBkYXRhLm9wSWRcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICB0b3BpYy5zZXQodGhpbmcpO1xuICB0b3BpY0RheS5zZXQodGhpbmcpO1xufSk7XG5cbmNvbnN0IHB1dCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgZGF0YS50aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBvYmpIYXNoKGRhdGEpO1xuICBjb25zdCB7IHRpbWVzdGFtcCwga2luZCwgdG9waWMsIGF1dGhvcklkLCBvcElkLCByZXBseVRvSWQgfSA9IGRhdGE7XG4gIGNvbnN0IHRoaW5nSWQgPSBvYmpIYXNoKHtcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICB0b3BpYyxcbiAgICBhdXRob3JJZCxcbiAgICBvcElkLFxuICAgIHJlcGx5VG9JZCxcbiAgICBvcmlnaW5hbEhhc2hcbiAgfSk7XG5cbiAgY29uc3Qgbm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXRhU291bCA9IGF1dGhvcklkXG4gICAgPyBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCBhdXRob3JJZCB9KVxuICAgIDogU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3JpZ2luYWxIYXNoIH0pO1xuXG4gIGNvbnN0IG1ldGFEYXRhID0ge1xuICAgIGlkOiB0aGluZ0lkLFxuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIG9yaWdpbmFsSGFzaCxcbiAgICBkYXRhOiB7IFwiI1wiOiBkYXRhU291bCB9LFxuICAgIHZvdGVzdXA6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzVXAucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICB2b3Rlc2Rvd246IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzRG93bi5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGFsbGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9XG4gIH07XG5cbiAgaWYgKHRvcGljKVxuICAgIG1ldGFEYXRhLnRvcGljID0geyBcIiNcIjogU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IHRvcGljIH0pIH07XG4gIGlmIChhdXRob3JJZCkgbWV0YURhdGEuYXV0aG9yID0geyBcIiNcIjogYH4ke2F1dGhvcklkfWAgfTtcbiAgaWYgKG9wSWQpXG4gICAgbWV0YURhdGEub3AgPSB7IFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkgfTtcbiAgaWYgKHJlcGx5VG9JZClcbiAgICBtZXRhRGF0YS5yZXBseVRvID0ge1xuICAgICAgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcmVwbHlUb0lkIH0pXG4gICAgfTtcblxuICBwZWVyLmd1bi5nZXQoZGF0YVNvdWwpLnB1dChkYXRhKTtcbiAgbm9kZS5wdXQobWV0YURhdGEpO1xuICBpbmRleChwZWVyLCB0aGluZ0lkLCBkYXRhKTtcbiAgcmV0dXJuIG5vZGU7XG59KTtcblxuY29uc3Qgc3VibWl0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB0aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAoZGF0YS5kb21haW4pIGRhdGEuZG9tYWluID0gZGF0YS5kb21haW4udG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwgdGltZXN0YW1wLCBraW5kOiBcInN1Ym1pc3Npb25cIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnNTb3VsID0gU2NoZW1hLkF1dGhvclN1Ym1pc3Npb25zLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gcGVlci5ndW4uZ2V0KHN1Ym1pc3Npb25zU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwic3VibWlzc2lvbnNcIilcbiAgICAgIC5wdXQoc3VibWlzc2lvbnMpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICAgIHN1Ym1pc3Npb25zLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY29tbWVudCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNvbW1lbnRcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgY29tbWVudHNTb3VsID0gU2NoZW1hLkF1dGhvckNvbW1lbnRzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KGNvbW1lbnRzU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgIC5wdXQoY29tbWVudHMpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICAgIGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY2hhdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNoYXRtc2dcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCB3cml0ZVBhZ2UgPSBSLmN1cnJ5KChwZWVyLCBuYW1lLCBib2R5KSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoIXVzZXIpIHJldHVybiBQcm9taXNlLnJlamVjdChcIm5vdCBsb2dnZWQgaW5cIik7XG4gIGxldCB0aGluZztcbiAgY29uc3QgcGFnZXNTb3VsID0gU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZDogdXNlci5wdWIgfSk7XG4gIGNvbnN0IGNoYWluID0gcGVlci5ndW4uZ2V0KHBhZ2VzU291bCkuZ2V0KG5hbWUpO1xuXG4gIHJldHVybiBjaGFpbi50aGVuKHJlcyA9PiB7XG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY2hhaW5cbiAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgLmdldChcImJvZHlcIilcbiAgICAgICAgLnB1dChib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgYm9keSxcbiAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgIGtpbmQ6IFwid2lraXBhZ2VcIixcbiAgICAgICAgYXV0aG9yOiB1c2VyLmFsaWFzLFxuICAgICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICAgIH07XG5cbiAgICAgIHRoaW5nID0gcHV0KHBlZXIsIGRhdGEpO1xuICAgICAgY2hhaW4ucHV0KHRoaW5nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHZvdGUgPSBSLmN1cnJ5KChwZWVyLCBpZCwga2luZCwgbm9uY2UpID0+IHtcbiAgY29uc3Qgdm90ZXMgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hW2tpbmQgPT09IFwidXBcIiA/IFwiVGhpbmdWb3Rlc1VwXCIgOiBcIlRoaW5nVm90ZXNEb3duXCJdLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogaWRcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiB2b3Rlcy5nZXQobm9uY2UpLnB1dChcIjFcIik7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nID0ge1xuICBzb3VsVG9JZCxcbiAgc291bHNUb0lkcyxcbiAgcHV0LFxuICBzdWJtaXQsXG4gIGNvbW1lbnQsXG4gIGNoYXQsXG4gIHdyaXRlUGFnZSxcbiAgdm90ZSxcbiAgaW5kZXhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5cbmNvbnN0IGJvZHkgPSBSLnByb3BPcihcIlwiLCBcImJvZHlcIik7XG5jb25zdCB1cmwgPSBSLnByb3BPcihcIlwiLCBcInVybFwiKTtcbmNvbnN0IGRvbWFpbiA9IFIuY29tcG9zZShcbiAgdXJsU3RyID0+IHtcbiAgICBpZiAoIXVybFN0cikgcmV0dXJuIFwiXCI7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VVUkkodXJsU3RyKTtcblxuICAgIHJldHVybiAocGFyc2VkLmhvc3QgfHwgcGFyc2VkLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIik7XG4gIH0sXG4gIHVybFxuKTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nRGF0YU5vZGUgPSB7IGJvZHksIGRvbWFpbiB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vR3VuTm9kZVwiO1xuXG5jb25zdCBzb3VscyA9IEd1bk5vZGUuZWRnZXM7XG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICBSLm1hcChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLnByb3AoXCJ0aGluZ0lkXCIpLFxuICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoLmJpbmQoU2NoZW1hLlRoaW5nLnJvdXRlKVxuICAgIClcbiAgKSxcbiAgR3VuTm9kZS5lZGdlc1xuKTtcblxuY29uc3QgdW5pb24gPSBSLmNvbXBvc2UoXG4gIFIuZGlzc29jKFwiX1wiKSxcbiAgUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSlcbik7XG5cbmZ1bmN0aW9uIGRheVN0cih0aW1lc3RhbXApIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGNvbnN0IHllYXIgPSBkLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gZC5nZXRVVENNb250aCgpICsgMTtcbiAgY29uc3QgZGF5TnVtID0gZC5nZXRVVENEYXRlKCk7XG5cbiAgcmV0dXJuIGAke3llYXJ9LyR7bW9udGh9LyR7ZGF5TnVtfWA7XG59XG5cbmV4cG9ydCBjb25zdCBUaGluZ1NldCA9IHsgaWRzLCB1bmlvbiwgc291bHMsIGRheVN0ciB9O1xuIiwiZXhwb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuZXhwb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nRGF0YU5vZGVcIjtcbmV4cG9ydCB7IFRoaW5nIH0gZnJvbSBcIi4vVGhpbmdcIjtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHRva2VuaXplID0gc291cmNlID0+IHtcbiAgY29uc3QgdG9rZW5NYXAgPSAoc291cmNlIHx8IFwiXCIpLnNwbGl0KFwiXFxuXCIpLnJlZHVjZSgoZGVmLCBsaW5lKSA9PiB7XG4gICAgY29uc3QgdG9rZW5zID0gbGluZVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLm1hcChSLnRyaW0pXG4gICAgICAuZmlsdGVyKHggPT4geCk7XG5cbiAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHJldHVybiBkZWY7XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2Vucywge30sIGRlZik7XG4gIH0sIHt9KTtcblxuICBjb25zdCBpc1ByZXNlbnQgPSBwID0+IHtcbiAgICBsZXQgY2hlY2sgPSBwO1xuXG4gICAgaWYgKHR5cGVvZiBwID09PSBcInN0cmluZ1wiKSBjaGVjayA9IHAuc3BsaXQoXCIgXCIpO1xuICAgIHJldHVybiBjaGVjayAmJiBSLnBhdGgoY2hlY2ssIHRva2VuTWFwKTtcbiAgfTtcblxuICBjb25zdCBnZXRWYWx1ZXMgPSBwID0+IFIua2V5c0luKGlzUHJlc2VudChwKSk7XG4gIGNvbnN0IGdldFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocClbMF0gfHwgbnVsbDtcbiAgY29uc3QgZ2V0TGFzdFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocCkucG9wKCkgfHwgbnVsbDtcblxuICBjb25zdCBnZXRWYWx1ZUNoYWluID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGxldCBuZXh0ID0gcDtcblxuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBuZXh0ID0gZ2V0VmFsdWUoWy4uLmtleXMsIC4uLnZhbHVlc10pO1xuICAgICAgbmV4dCAmJiB2YWx1ZXMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFBhaXJzID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuXG4gICAgcmV0dXJuIGdldFZhbHVlcyhrZXlzKS5yZWR1Y2UoKHBhaXJzLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldFZhbHVlKFsuLi5rZXlzLCBrZXldKTtcblxuICAgICAgcmV0dXJuIFsuLi5wYWlycywgW2tleSwgdmFsXV07XG4gICAgfSwgW10pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlLFxuICAgIGlzUHJlc2VudCxcbiAgICBnZXRWYWx1ZSxcbiAgICBnZXRWYWx1ZXMsXG4gICAgZ2V0TGFzdFZhbHVlLFxuICAgIGdldFZhbHVlQ2hhaW4sXG4gICAgZ2V0UGFpcnNcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2tlbml6ZXIgPSB7IHRva2VuaXplIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBjcmVhdGVTdXBwcmVzc29yIH0gZnJvbSBcImd1bi1zdXBwcmVzc29yXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuXG5jb25zdCBpc0xlZ2FjeVRoaW5nID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBkYXRhU291bCA9IFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSk7XG4gIGNvbnN0IG5ld2VzdCA9IFIud2l0aG91dChcbiAgICBbXCJjb21tZW50c1wiLCBcImFsbGNvbW1lbnRzXCIsIFwidm90ZXN1cFwiLCBcInZvdGVzZG93blwiXSxcbiAgICBSLmtleXMoUi5wYXRoKFtcIl9cIiwgXCI+XCJdLCBkYXRhKSlcbiAgKVxuICAgIC5tYXAoa2V5ID0+IFIucGF0aChbXCJfXCIsIFwiPlwiLCBrZXldLCBkYXRhKSlcbiAgICAuc29ydCgpXG4gICAgLnBvcCgpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goZGF0YVNvdWwpIHx8IHt9O1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gdGhpbmdJZCAmJiBuZXdlc3QgJiYgbmV3ZXN0IDwgMTU0MzEwMjgxNDk0NTtcbn07XG5cbmNvbnN0IHRoaW5nSGFzaE1hdGNoZXNTb3VsID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gKFxuICAgIGlkICYmXG4gICAgaWQgPT09XG4gICAgICBvYmpIYXNoKHtcbiAgICAgICAgYXV0aG9ySWQ6IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGltZXN0YW1wOiBwYXJzZUludChSLnByb3AoXCJ0aW1lc3RhbXBcIiwgZGF0YSksIDEwKSxcbiAgICAgICAga2luZDogUi5wcm9wKFwia2luZFwiLCBkYXRhKSxcbiAgICAgICAgdG9waWM6IFIucHJvcChcbiAgICAgICAgICBcInRvcGljTmFtZVwiLFxuICAgICAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5tYXRjaChSLnBhdGgoW1widG9waWNcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3BJZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgcmVwbHlUb0lkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9yaWdpbmFsSGFzaDogUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpXG4gICAgICB9KVxuICApO1xufTtcblxuY29uc3Qgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGF1dGhvcklkID0gKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkO1xuICBjb25zdCBzaWduZWRJZCA9IFIucHJvcChcbiAgICBcImF1dGhvcklkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBhdXRob3JJZCAmJiBhdXRob3JJZCA9PT0gc2lnbmVkSWQ7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpO1xuICBjb25zdCBpZCA9IFIucHJvcChcbiAgICBcInRoaW5nSWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSBvcmlnaW5hbEhhc2g7XG59O1xuXG5jb25zdCBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UgPSBhanYgPT4gKFxuICBub2RlVHlwZU5hbWUsXG4gIGRhdGEsXG4gIF9wU2NoZW1hLFxuICBfY1BhdGgsXG4gIHBhcmVudERhdGFcbikgPT4ge1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgcGFyZW50RGF0YSkgfHwgXCJcIikgfHwge307XG4gIGNvbnN0IHsgdGhpbmdJZDogcHJvcFRoaW5nSWQgfSA9IFNjaGVtYVtub2RlVHlwZU5hbWVdLnJvdXRlLm1hdGNoKFxuICAgIFIucHJvcChcIiNcIiwgZGF0YSkgfHwgXCJcIlxuICApO1xuXG4gIGlmICghdGhpbmdJZCB8fCB0aGluZ0lkICE9PSBwcm9wVGhpbmdJZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYWp2LmNvbXBpbGUoeyAkcmVmOiBgc2NoZW1hLmpzb24jL2RlZmluaXRpb25zLyR7bm9kZVR5cGVOYW1lfUVkZ2VgIH0pKFxuICAgIGRhdGFcbiAgKTtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YUhhc2hNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgeyBfLCAuLi5yZWNvcmQgfSA9IGRhdGEgfHwge307IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICByZWNvcmQudGltZXN0YW1wID0gcGFyc2VGbG9hdChyZWNvcmQudGltZXN0YW1wLCAxMCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikgfHwge307XG5cbiAgcmV0dXJuIHRoaW5nSWQgJiYgdGhpbmdJZCA9PT0gb2JqSGFzaChyZWNvcmQpO1xufTtcblxuY29uc3QgaXNWb3RlVmFsaWQgPSAoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkgPT4ge1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiLCBjb25maWcgPSB7fSB9ID0gc2NoZW1hIHx8IHt9O1xuXG4gIGNvbnN0IG5vbmNlID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20odm90ZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIodm90ZSwgXCJoZXhcIik7XG4gIGNvbnN0IHNhbHQgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbShub25jZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIobm9uY2UsIFwiaGV4XCIpO1xuICBjb25zdCBoYXNoID0gYXJnb24yLmhhc2gocHJlZml4LCB7XG4gICAgc2FsdCxcbiAgICBoYXNoTGVuZ3RoOiBjb25maWcuaGFzaExlbmd0aCxcbiAgICB0aW1lQ29zdDogY29uZmlnLnRpbWVDb3N0LFxuICAgIG1lbW9yeUNvc3Q6IGNvbmZpZy5tZW1vcnlDb3N0LFxuICAgIHBhcmFsbGVsaXNtOiBjb25maWcucGFyYWxsZWxpc20sXG4gICAgcmF3OiB0cnVlLFxuICAgIHR5cGU6IGFyZ29uMlthbGdvcml0aG1dXG4gIH0pO1xuICBsZXQgb2ZmID0gMDtcbiAgbGV0IGk7XG5cbiAgZm9yIChpID0gMDsgaSA8PSBjb25maWcuY29tcGxleGl0eSAtIDg7IGkgKz0gOCwgb2ZmKyspIHtcbiAgICBpZiAoaGFzaFtvZmZdICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWFzayA9IDB4ZmYgPDwgKDggKyBpIC0gY29uZmlnLmNvbXBsZXhpdHkpO1xuXG4gIHJldHVybiAoaGFzaFtvZmZdICYgbWFzaykgPT09IDA7XG59O1xuXG5jb25zdCBrZXlzQXJlUHJvb2ZzT2ZXb3JrID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhcmdvbjIgPSByZXF1aXJlKFwiYXJnb24yXCIpO1xuXG4gIGlmICghYXJnb24yKSByZXR1cm4gdHJ1ZTsgLy8gaW4gYnJvd3NlciBkb24ndCBib3RoZXIgZm9yIG5vd1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiIH0gPSBzY2hlbWEgfHwge307XG4gIGNvbnN0IHByZWZpeCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKGFsZ29yaXRobSAhPT0gXCJhcmdvbjJkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGFyZ29uMiBzdXBwb3J0ZWQgZm9yIHZvdGUgaGFzaGVzXCIpO1xuICB9XG5cbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaCh2b3RlID0+IHtcbiAgICBpZiAoIWlzVm90ZVZhbGlkKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgdm90ZVwiLCBwcmVmaXgsIHZvdGUpO1xuICAgICAgZGVsZXRlIGRhdGFbdm90ZV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBkZWxldGVNZXRhRm9yTWlzc2luZyA9IChcbiAgc2NoZW1hLFxuICBkYXRhLFxuICBwU2NoZW1hLFxuICBjUGF0aCxcbiAgcGFyZW50RGF0YSxcbiAga2V5SW5QYXJlbnRcbikgPT4ge1xuICBjb25zdCBrZXlzID0gUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSk7XG4gIGNvbnN0IG1ldGEgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0sIGRhdGEpO1xuICBjb25zdCBtZXRhS2V5cyA9IFIua2V5cyhtZXRhKTtcbiAgY29uc3QgbWlzc2luZyA9IFIuZGlmZmVyZW5jZShtZXRhS2V5cywga2V5cyk7XG5cbiAgaWYgKG1pc3NpbmcubGVuZ3RoKSB7XG4gICAgY29uc29sZS5sb2coXCJvbWl0aW5nXCIsIG1pc3NpbmcpO1xuICAgIGRhdGFbXCJfXCJdW1wiPlwiXSA9IFIub21pdChtaXNzaW5nLCBtZXRhKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgaW5pdEFqdiA9IFIuY29tcG9zZShcbiAgYWp2ID0+IHtcbiAgICBhanYuYWRkS2V5d29yZChcImlzTGVnYWN5VGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IGlzTGVnYWN5VGhpbmdcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0hhc2hNYXRjaGVzU291bFxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBzaWduZWRUaGluZ0RhdGFNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ1JlbGF0ZWRFZGdlXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UoYWp2KVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsXCIsIHtcbiAgICAgIHZhbGlkYXRlOiB0aGluZ0RhdGFIYXNoTWF0Y2hlc1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwia2V5c0FyZVByb29mc09mV29ya1wiLCB7XG4gICAgICB2YWxpZGF0ZToga2V5c0FyZVByb29mc09mV29yayxcbiAgICAgIG1vZGlmeWluZzogdHJ1ZVxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiZGVsZXRlTWV0YUZvck1pc3NpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IGRlbGV0ZU1ldGFGb3JNaXNzaW5nLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGFqdjtcbiAgfSxcbiAgc2VhLmluaXRBanZcbik7XG5cbmV4cG9ydCBjb25zdCBzdXBwcmVzc29yID0gY3JlYXRlU3VwcHJlc3Nvcih7XG4gIGRlZmluaXRpb25zOiBTY2hlbWEuZGVmaW5pdGlvbnMsXG4gIGluaXQ6IFIuY29tcG9zZShcbiAgICBpbml0QWp2LFxuICAgIFIuYWx3YXlzKHsgcmVtb3ZlQWRkaXRpb25hbDogdHJ1ZSB9KVxuICApXG59KTtcblxuY29uc3QgZ3VuV2lyZUlucHV0ID0gUi5jdXJyeSgocGVlciwgY29udGV4dCkgPT5cbiAgY29udGV4dC5vbihcImluXCIsIGZ1bmN0aW9uIHdpcmVJbnB1dChtc2cpIHtcbiAgICBjb25zdCBfID0gbXNnW1wiX1wiXTtcblxuICAgIGRlbGV0ZSBtc2dbXCJfXCJdO1xuICAgIGlmIChcInBpbmdcIiBpbiBtc2cgfHwgXCJsZWVjaFwiIGluIG1zZykgcmV0dXJuO1xuICAgIGlmIChtc2cucHV0ICYmICFSLmtleXMobXNnLnB1dCkubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgcHJvbWlzZSA9IHBlZXIuY29uZmlnLmRpc2FibGVWYWxpZGF0aW9uXG4gICAgICA/IFByb21pc2UucmVzb2x2ZShtc2cpXG4gICAgICA6IHN1cHByZXNzb3IudmFsaWRhdGUobXNnKTtcblxuICAgIHByb21pc2VcbiAgICAgIC50aGVuKHZhbGlkYXRlZCA9PiB7XG4gICAgICAgIGlmICghdmFsaWRhdGVkKSByZXR1cm4gY29uc29sZS5sb2coXCJtc2cgZGlkbid0IHZhbGlkYXRlXCIsIG1zZyk7XG4gICAgICAgIG1zZ1tcIl9cIl0gPSBfO1xuICAgICAgICByZXR1cm4gdGhpcy50by5uZXh0KG1zZyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKFwidmFsaWRhdGUgZXJyXCIsIG1zZywgZXJyLnN0YWNrIHx8IGVycikpO1xuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IFZhbGlkYXRpb24gPSB7XG4gIGlzTGVnYWN5VGhpbmcsXG4gIHRoaW5nSGFzaE1hdGNoZXNTb3VsLFxuICBzaWduZWRUaGluZ0RhdGFNYXRjaGVzLFxuICB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoLFxuICBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UsXG4gIHRoaW5nRGF0YUhhc2hNYXRjaGVzLFxuICBpc1ZvdGVWYWxpZCxcbiAga2V5c0FyZVByb29mc09mV29yayxcbiAgaW5pdEFqdixcbiAgc3VwcHJlc3NvcixcbiAgZ3VuV2lyZUlucHV0XG59O1xuIiwiaW1wb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuZXhwb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5leHBvcnQgeyBDb21tZW50Q29tbWFuZCB9IGZyb20gXCIuL0NvbW1lbnRDb21tYW5kXCI7XG5leHBvcnQgeyBMaXN0aW5nLCBMaXN0aW5nT3JhY2xlLCBTcGFjZVNwZWMgfSBmcm9tIFwiLi9MaXN0aW5nXCI7XG5leHBvcnQgeyBQYWdlIH0gZnJvbSBcIi4vUGFnZVwiO1xuZXhwb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmV4cG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuZXhwb3J0IHsgVGhpbmcsIFRoaW5nU2V0LCBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmV4cG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tIFwiLi9WYWxpZGF0aW9uXCI7XG5leHBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuZXhwb3J0IHsgVGFidWxhdG9yIH0gZnJvbSBcIi4vVGFidWxhdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBQZWVyLmluaXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JhbWRhX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JvdXRlX3BhcnNlcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXzsiXSwic291cmNlUm9vdCI6IiJ9