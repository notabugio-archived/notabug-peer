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
  tabulator: _Constants.Constants.DEV_INDEXER,
  indexer: _Constants.Constants.DEV_INDEXER,
  owner: _Constants.Constants.DEV_INDEXER,
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
const INDEXER = "CEyKrDd1xyPXpWSV00MgvnZY2VJLHXgzCvhMeDwKTYA.yjSq0DyXzzhB_ZXr_DzfJgij3tXU0-3t0Q5bJAtZpj8";
const DEV_INDEXER = "l2nSedlSlvomTqCYhmPnANoQLXe4sj5rR2OrC7YqPpU.zimaWwdlfyTrVITgwWoDVdbJQKReOTqV5zNjTRc-yQA";
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
  INDEXER,
  DEV_INDEXER
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
  const listingPaths = R.map(t => `/t/${t}/${sort}`, topics); // const listingPaths = [`/t/${topics.sort().join("+")}/${sort}`];

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
  if (!domains.length) return topicSource(definition);
  const listingPaths = R.map(d => `/domain/${d}/${sort}`, domains);

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

// import memoize from "fast-memoize";
const memoize = R.compose;
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
const itemKeys = memoize(R.compose(R.filter(R.compose(val => !!(val === 0 || val), parseInt)), R.keys));
const serialize = R.curry((spec, items) => R.compose(R.addIndex(R.reduce)((res, row, idx) => R.assoc(`${idx}`, row.join(","), res), {}), R.defaultTo([]))(items));

const rows = node => R.compose(R.map(getRow(node)), itemKeys)(node);

const ids = R.compose(rowsToIds, rows);
const sortRows = R.sortWith([R.ascend(R.compose(R.cond([[R.isNil, R.always(Infinity)], [R.T, parseFloat]]), R.prop(POS_VAL)))]);
const sortedIds = memoize(R.compose(R.map(R.prop(POS_ID)), sortRows, R.filter(R.identity), rows));
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
  console.log("ListingNode.read", path);
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
  console.log("onPut", soul, updatedSoul);

  const path = _ListingNode.ListingNode.pathFromSoul(soul);

  const scope = orc.newScope();
  const spec = await _ListingType.ListingType.specFromPath(scope, path);
  console.log("path", path);
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
  limit: 1000
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
  new: timeSort(R.compose(R.multiply(-1), val => val || new Date().getTime(), R.prop("timestamp"))),
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

const path = "/user/:authorId/replied/:type/:sort";
const getSidebar = (0, _gunScope.query)(scope => _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:topic:sidebar"));
const getSource = (0, _gunScope.query)((scope, {
  authorId,
  type,
  sort = "new"
}) => _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:inbox", [`replies to author ${authorId}`, `type ${type}`, `sort ${sort}`].join("\n")));
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

const preloadPath = match => async (scope, path, params) => {
  const [spec, ids] = await Promise.all([match.space(scope), match.ids(scope, params || {}), match.sidebar(scope)]);

  const thingSouls = _Listing.Listing.idsToSouls(ids);

  const [things] = await Promise.all([_Query.Query.multiThingMeta(scope, {
    thingSouls,
    tabulator: spec.tabulator || _Config.Config.tabulator,
    scores: true,
    data: true
  }), ...R.map(id => _Query.Query.userMeta(scope, id), R.uniq([spec.indexer, spec.owner, spec.tabulator]))]);
  const opIds = R.compose(R.without(ids), R.filter(R.identity), R.uniq, R.map(R.pathOr(null, ["data", "opId"])))(things);

  if (opIds.length) {
    const opSouls = _Listing.Listing.idsToSouls(opIds);

    await _Query.Query.multiThingMeta(scope, {
      thingSouls: opSouls,
      tabulator: spec.tabulator || _Config.Config.tabulator,
      data: true
    });
  }

  return scope.getCache();
};

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
const withListingMatch = R.compose(match => R.assoc("preload", preloadPath(match), match), (path, params) => ({
  sidebar: (0, _gunScope.query)(scope => _Listing.Listing.sidebarFromPath(scope, path), `sidebar:${path}`),
  space: (0, _gunScope.query)(scope => _Listing.Listing.specFromPath(scope, path, params), `spec:${path}`),
  ids: (0, _gunScope.query)((scope, opts = {}) => _Listing.Listing.fromPath(scope, path, R.mergeLeft(opts, params)), `ids:${path}`)
}));

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

    const match = {
      space: query(scope => _Listing.Listing.specFromPath(scope, spacePath, query), `spec:${spacePath}`),
      ids: query(scope => _Listing.Listing.fromPath(scope, listingPath, query), listingPath)
    };
    return R.assoc("preload", preloadPath(match), match);
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

const inbox = R.always({});
const Page = {
  withListingMatch,
  preloadPath,
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
      /*
      const sendLeech = () => peer.gun._.on("out", { leech: true });
       sendLeech();
      */
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
const singleAuthor = (0, _gunScope.query)((scope, params) => (0, _gunScope.all)([params.type && params.type !== "submitted" && params.type !== "overview" ? (0, _gunScope.resolve)([]) : scope.get(params.authorId).get("submissions").souls(), params.type && params.type !== "comments" && params.type !== "overview" && params.type !== "commands" ? (0, _gunScope.resolve)([]) : scope.get(params.authorId).get("comments").souls()]).then(([submissions, comments]) => unionArrays([submissions, comments])));
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
          type: "string",
          maxLength: _Constants.Constants.MAX_LISTING_IDS_SIZE
        }
      },
      source: {
        sea: {
          type: "string",
          maxLength: _Constants.Constants.MAX_LISTING_SOURCE_SIZE
        }
      },
      name: {
        sea: {
          type: ["string", "null"],
          maxLength: _Constants.Constants.MAX_TOPIC_SIZE
        }
      },
      submitTopic: {
        sea: {
          type: "string",
          maxLength: _Constants.Constants.MAX_TOPIC_SIZE
        }
      },
      tabs: {
        sea: {
          type: "string",
          maxLength: _Constants.Constants.MAX_LISTING_TABS_SIZE
        }
      },
      curators: {
        sea: {
          type: "string",
          maxLength: _Constants.Constants.MAX_LISTING_SOURCE_SIZE
        }
      },
      censors: {
        sea: {
          type: "string",
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
          type: "string"
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
      properties: {
        topic: {
          $ref: "schema.json#/definitions/topicName"
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
      properties: {
        domain: {
          $ref: "schema.json#/definitions/domainName"
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
  console.log("created", thingId);
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
      console.log("res", res);
      chain.get("data").get("body").put(body);
    } else {
      const data = {
        body,
        title: name,
        kind: "wikipage",
        author: user.alias,
        authorId: user.pub
      };
      console.log("page data", data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nRGF0YU5vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL1RoaW5nU2V0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9UaGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9WYWxpZGF0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJhcmdvbjJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc2NvcGVcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJndW4tc3VwcHJlc3NvclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJvYmplY3QtaGFzaFwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcInJhbWRhXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicm91dGUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwidXJpLWpzXCIiXSwibmFtZXMiOlsic2lnbnVwIiwiUiIsImN1cnJ5IiwicGVlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvcHRzIiwib2siLCJmYWlsIiwiZ3VuIiwidXNlciIsInJlc29sdmUiLCJjcmVhdGUiLCJhY2siLCJlcnIiLCJsZWF2ZSIsImxvZ2luIiwidGhlbiIsImF1dGgiLCJpcyIsInJlc3VsdCIsIl9vbkxvZ2luIiwibG9nb3V0IiwiaXNMb2dnZWRJbiIsIm9uTG9naW4iLCJmbiIsIkF1dGhlbnRpY2F0aW9uIiwidG9rZW5pemUiLCJjb21wb3NlIiwibWFwIiwidHJpbSIsInNwbGl0IiwicmVwbGFjZSIsIkNPTU1BTkRfUkUiLCJwcm9wT3IiLCJ0aGluZ0RhdGEiLCJyZWR1Y2UiLCJjbWRNYXAiLCJpZCIsImJvZHkiLCJwYXRoIiwiYXV0aG9ySWQiLCJ0aW1lc3RhbXAiLCJwYXJzZUZsb2F0IiwidGVzdCIsInRva2VuaXplZCIsImFzc29jUGF0aCIsImtleXMiLCJDb21tZW50Q29tbWFuZCIsIkNvbmZpZyIsInRhYnVsYXRvciIsIkRFVl9JTkRFWEVSIiwiaW5kZXhlciIsIm93bmVyIiwidXBkYXRlIiwia2V5IiwidmFsIiwidG9QYWlycyIsIlBSRUZJWCIsIlNPVUxfREVMSU1FVEVSIiwiTElTVElOR19TSVpFIiwiTUFYX0hBU0hfU0laRSIsIk1BWF9QT1dfTk9OQ0VfU0laRSIsIk1BWF9UT1BJQ19TSVpFIiwiTUFYX0FVVEhPUl9BTElBU19TSVpFIiwiTUFYX0FVVEhPUl9JRF9TSVpFIiwiTUFYX1VSTF9TSVpFIiwiTUFYX0RPTUFJTl9TSVpFIiwiTUFYX1RISU5HX0tJTkRfU0laRSIsIk1BWF9USElOR19USVRMRV9TSVpFIiwiTUFYX1RISU5HX0JPRFlfU0laRSIsIk1BWF9MSVNUSU5HX0lEU19TSVpFIiwiTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUiLCJNQVhfTElTVElOR19UQUJTX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUiLCJJTkRFWEVSIiwiQ29uc3RhbnRzIiwic291bCIsInBhdGhPciIsInN0YXRlIiwibGF0ZXN0IiwibGFzdCIsInNvcnRCeSIsImlkZW50aXR5IiwidmFsdWVzIiwiZWRnZXMiLCJwcm9wIiwiZGVjb2RlU0VBIiwicmF3RGF0YSIsImRhdGEiLCJHdW4iLCJTRUEiLCJpbmRleE9mIiwid2l0aG91dCIsImZvckVhY2giLCJ2ZXJpZnkiLCJvcHQiLCJwYWNrIiwicmVzIiwidW5wYWNrIiwiR3VuTm9kZSIsIm5lZWRzU2NvcmVzIiwiZGVmaW5pdGlvbiIsImZpbmQiLCJpc1ByZXNlbnQiLCJuZWVkc0RhdGEiLCJpdGVtc0Zyb21UaGluZ1NvdWxzIiwic2NvcGUiLCJzb3VscyIsImFsbCIsIml0ZW1Gcm9tU291bCIsInNvcnRJdGVtcyIsIml0ZW1zRnJvbVRoaW5nU2V0cyIsImdldCIsIm1lcmdlUmlnaHQiLCJsaXN0aW5nU291cmNlIiwibGlzdGluZ3MiLCJzb3J0IiwibGlzdGluZ1BhdGhzIiwibCIsInRvcGljU291cmNlIiwidG9waWNzIiwidCIsInF1ZXJ5IiwibXVsdGlUb3BpYyIsImRvbWFpblNvdXJjZSIsImRvbWFpbnMiLCJsZW5ndGgiLCJkIiwibXVsdGlEb21haW4iLCJhdXRob3JTb3VyY2UiLCJhdXRob3JJZHMiLCJ0eXBlIiwibXVsdGlBdXRob3IiLCJjdXJhdG9yU291cmNlIiwiY3VyYXRvcnMiLCJjdXJhdGUiLCJpZHMiLCJ0aGluZ0lkIiwiVGhpbmciLCJyb3V0ZSIsInJldmVyc2UiLCJvcFNvdXJjZSIsInN1Ym1pc3Npb25JZHMiLCJtdWx0aVN1Ym1pc3Npb24iLCJyZXBsaWVzU291cmNlIiwicmVwbGllc1RvQXV0aG9yIiwicmVwbGllc1RvQXV0aG9ySWQiLCJzb3VyY2VzIiwibGlzdGluZyIsInJlcGxpZXMiLCJvcCIsImN1cmF0b3IiLCJhdXRob3IiLCJkb21haW4iLCJ0b3BpYyIsInNvdXJjZU5hbWVzIiwic291cmNlTmFtZSIsImRlZiIsImZyb21EZWZpbml0aW9uIiwibmFtZSIsIm1lcmdlTGVmdCIsIkxpc3RpbmdEYXRhU291cmNlIiwiZnJvbVNvdXJjZSIsInNvdXJjZSIsIm93bmVySWQiLCJzcGFjZU5hbWUiLCJvYmoiLCJnZXRWYWx1ZSIsImdldFZhbHVlcyIsImdldFZhbHVlQ2hhaW4iLCJnZXRQYWlycyIsImZyb21QYWdlQXV0aG9yIiwiZnJvbVBhZ2VOYW1lIiwidW5kZWZpbmVkIiwiZGlzcGxheU5hbWUiLCJ0YWJzIiwidW5pcXVlQnlDb250ZW50IiwibW9kZXJhdG9ycyIsImluY2x1ZGVSYW5rcyIsInN0aWNreUlkcyIsImlzSWRTdGlja3kiLCJpc0NoYXQiLCJzdWJtaXRUb3BpY3MiLCJzdWJtaXRUb3BpYyIsImNoYXRUb3BpYyIsInVzZUZvckNvbW1lbnRzIiwiYmFzZVBhdGgiLCJzdWJtaXRQYXRoIiwiZGVmYXVsdFRhYiIsImRlZmF1bHRUYWJQYXRoIiwiZmlsdGVycyIsImZ1bmN0aW9ucyIsImFsbG93IiwicmVwbGllc1RvIiwib3BzIiwiYWxpYXNlcyIsImF1dGhvcnMiLCJraW5kcyIsImFub24iLCJzaWduZWQiLCJkZW55IiwidGFncyIsInZvdGVGaWx0ZXJzIiwidXBzTWluIiwicGFyc2VJbnQiLCJ1cHNNYXgiLCJkb3duc01pbiIsImRvd25zTWF4Iiwic2NvcmVNaW4iLCJzY29yZU1heCIsImNlbnNvcnMiLCJ1bmlxIiwiTGlzdGluZ0RlZmluaXRpb24iLCJpbnRQYXRoIiwicCIsImZpbHRlckZ1bmN0aW9ucyIsInZvdGVGaWx0ZXJGdW5jdGlvbnMiLCJhZGRGaWx0ZXIiLCJmbnMiLCJwdXNoIiwiYWRkVm90ZUZpbHRlciIsImlkZW50aWNhbCIsIml0ZW0iLCJraW5kIiwiYWxpYXMiLCJsdGUiLCJndGUiLCJ0aGluZyIsImNtZHMiLCJ0YWdOYW1lIiwiY29udGVudEZpbHRlciIsInZvdGVGaWx0ZXIiLCJ0aGluZ0ZpbHRlciIsImdldEZpbHRlcmVkUm93cyIsInNwZWMiLCJzb3J0ZWRSb3dzIiwibGltaXQiLCJsaW1pdFByb3AiLCJjb3VudCIsImNvdW50UHJvcCIsImFmdGVyIiwiZmlsdGVyRm4iLCJyb3dzIiwic2xpY2UiLCJmaWx0ZXJlZCIsImZldGNoQmF0Y2giLCJzaXplIiwiUHJvbWlzZSIsInJvdyIsImluTGlzdGluZyIsIlBPU19JRCIsInNwbGljZSIsIlBPU19WQUwiLCJnZXRGaWx0ZXJlZElkcyIsIngiLCJ0aGluZ01ldGEiLCJ0aGluZ1NvdWwiLCJzY29yZXMiLCJMaXN0aW5nRmlsdGVyIiwibWVtb2l6ZSIsIlBPU19JRFgiLCJyb3dzVG9JZHMiLCJyb3dzVG9JdGVtcyIsInNvdWxGcm9tUGF0aCIsInBhdGhGcm9tU291bCIsIlJlZ0V4cCIsImlkVG9Tb3VsIiwiaWRzVG9Tb3VscyIsInNvdWxUb0lkIiwibWF0Y2giLCJzb3Vsc1RvSWRzIiwiZ2V0Um93Iiwibm9kZSIsImlkeCIsImlmRWxzZSIsImluc2VydCIsImFsd2F5cyIsIml0ZW1LZXlzIiwiZmlsdGVyIiwic2VyaWFsaXplIiwiaXRlbXMiLCJhZGRJbmRleCIsImFzc29jIiwiam9pbiIsImRlZmF1bHRUbyIsInNvcnRSb3dzIiwic29ydFdpdGgiLCJhc2NlbmQiLCJjb25kIiwiaXNOaWwiLCJJbmZpbml0eSIsIlQiLCJzb3J0ZWRJZHMiLCJpdGVtc1RvUm93cyIsImRpZmYiLCJ1cGRhdGVkSXRlbXMiLCJyZW1vdmVJZHMiLCJtYXhTaXplIiwicmVtb3ZlZCIsImluZGV4QnkiLCJieUlkIiwiY2hhbmdlcyIsInVwZGF0ZWQiLCJ0b1JlcGxhY2UiLCJtYXhJZHgiLCJwYXJzZWQiLCJyYXdWYWx1ZSIsImkiLCJ2YWx1ZSIsImV4aXN0aW5nIiwiYWxsU29ydGVkIiwic29ydGVkIiwibWlzc2luZyIsImFkZGVkIiwiY29uY2F0IiwiaW5zZXJ0ZWQiLCJwb3AiLCJyZXBsYWNlZCIsImNvbnNvbGUiLCJsb2ciLCJjYXRlZ29yaXplRGlmZiIsIm9yaWdpbmFsIiwiYWxsS2V5cyIsIl9kaWZmSWR4IiwiZGlmZklkIiwiX29yaWdJZHgiLCJvcmlnSWQiLCJ1bmlvblJvd3MiLCJ1bmlxQnkiLCJyb3dzRnJvbVNvdWxzIiwicmVhZCIsIkxpc3RpbmdOb2RlIiwidXBkYXRlTGlzdGluZyIsIm9yYyIsIm5ld1Njb3BlIiwidG9JdGVtcyIsIndyaXRlIiwib25QdXQiLCJ1cGRhdGVkU291bCIsInByb3BzIiwidXBkYXRlZElkcyIsInNwZWNGcm9tUGF0aCIsIlRoaW5nVm90ZUNvdW50cyIsImlzU3RpY2t5IiwiZXF1YWxzIiwiZ2V0QWNjZXNzZXMiLCJsaXN0ZW4iLCJMaXN0aW5nT3JhY2xlIiwiY2FsY3VsYXRlUm93cyIsInN0aWNreUl0ZW1zIiwiZGF0YVNvdXJjZSIsImNhbGN1bGF0ZSIsInRvTm9kZSIsInBhdGhzIiwic3RpY2t5Um93cyIsImZyb21TcGVjIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsIm5vZGVGcm9tUGF0aCIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIkRhdGUiLCJnZXRUaW1lIiwib2xkIiwiYWN0aXZlIiwibGFzdEFjdGl2ZSIsInRvcCIsImNvbW1lbnRzIiwiZGlzY3Vzc2VkIiwic2NvcmUiLCJzZWNvbmRzIiwib3JkZXIiLCJNYXRoIiwibG9nMTAiLCJtYXgiLCJhYnMiLCJob3QiLCJzaWduIiwiYmVzdCIsInVwcyIsImRvd25zIiwibiIsInoiLCJsZWZ0IiwicmlnaHQiLCJzcXJ0IiwidW5kZXIiLCJjb250cm92ZXJzaWFsIiwibWFnbml0dWRlIiwiYmFsYW5jZSIsImlzVmFsaWRTb3J0IiwidG9JdGVtIiwiZnJvbVRoaW5nU2V0cyIsInBpcGUiLCJ1bmlvbiIsIkxpc3RpbmdTb3J0IiwiYXBwbHkiLCJhcCIsIm9mIiwiZ2V0U291cmNlIiwiZXh0cmEiLCJ3aWtpUGFnZSIsIkxpc3RpbmdTcGVjIiwiZ2V0U2lkZWJhciIsIm5vcm1hbFRvcGljcyIsInNwbGl0VG9waWNzIiwic3VibWl0VG8iLCJ0YWIiLCJDaGF0TGlzdGluZyIsIndpdGhSb3V0ZSIsIkNvbW1lbnRMaXN0aW5nIiwiQ29tbWVudGVkTGlzdGluZyIsIkRvbWFpbkxpc3RpbmciLCJGaXJlaG9zZUxpc3RpbmciLCJkaWZmRGF0YSIsInVwZGF0ZWRBdXRob3JlZCIsIm9wSWQiLCJyZXBseUlkcyIsIlRoaW5nQ29tbWVudHMiLCJJbmJveExpc3RpbmciLCJ1c2VyTWV0YSIsIm1ldGEiLCJwcm9maWxlSWQiLCJQcm9maWxlTGlzdGluZyIsInNpZGViYXJQYWdlTmFtZSIsIm9yaWdpbmFsRGF0YSIsInJlbW92ZWRJZHMiLCJ2b3RlQ291bnRzTWF0Y2giLCJ0aGluZ01hdGNoIiwiVGhpbmdEYXRhU2lnbmVkIiwiYXV0aG9yTWF0Y2giLCJTRUFBdXRob3IiLCJmcm9tUGFnZUlkIiwiZXhpc3RpbmdLZXlzIiwid29yayIsIm1ldGhvZCIsInByaW9yaXR5IiwiU3BhY2VMaXN0aW5nIiwiVG9waWNMaXN0aW5nIiwidHlwZXMiLCJ0eXBlc0FycmF5Iiwic2lkZWJhckZyb21QYXRoIiwiRXJyb3IiLCJiYXNlU3BlYyIsIkxpc3RpbmdUeXBlIiwic3BsaXREb21haW5zIiwidG9Mb3dlciIsIlBhdGgiLCJjb25maWdQYWdlTmFtZSIsInNvdXJjZVdpdGhEZWZhdWx0cyIsIm5vZGVUb1NwYWNlTmFtZXMiLCJ1c2VyU3BhY2VOYW1lcyIsInVzZXJQYWdlcyIsIlNwYWNlU3BlYyIsIkxpc3RpbmciLCJ0eXBlRnJvbVBhdGgiLCJwcmVsb2FkUGF0aCIsInBhcmFtcyIsInNwYWNlIiwic2lkZWJhciIsInRoaW5nU291bHMiLCJ0aGluZ3MiLCJtdWx0aVRoaW5nTWV0YSIsIm9wSWRzIiwib3BTb3VscyIsImdldENhY2hlIiwid2l0aE1hdGNoIiwicHJlbG9hZCIsIndpdGhMaXN0aW5nTWF0Y2giLCJwcmVmaXgiLCJkZWZhdWx0UHJlZml4IiwiaWRlbnRpZmllciIsImRlZmF1bHRJZGVudGlmaWVyIiwiZGVmYXVsdFNvcnQiLCJyZXN0IiwidGhpbmdDb21tZW50cyIsInNwYWNlTGlzdGluZyIsImRlZmF1bHROYW1lIiwiZGVmYXVsdEF1dGhvcklkIiwic3BhY2VUaGluZ0NvbW1lbnRzIiwic3BhY2VQYXRoIiwibGlzdGluZ1BhdGgiLCJwcm9maWxlIiwiZGVmYXVsdFR5cGUiLCJpbmJveCIsIlBhZ2UiLCJpbml0IiwiY29uZmlnIiwibGVlY2giLCJkaXNhYmxlVmFsaWRhdGlvbiIsIm5vR3VuIiwibG9jYWxTdG9yYWdlIiwicGVyc2lzdCIsImNmZyIsInJhZGlzayIsIm9uIiwiZ3VuV2lyZUlucHV0Iiwic3RvcmVGbiIsInN0b3JlIiwiYSIsInJldHJ5IiwiY3JlYXRlU2NvcGUiLCJzdWJtaXQiLCJjb21tZW50IiwiY2hhdCIsIndyaXRlUGFnZSIsInZvdGUiLCJxdWVyaWVzIiwiUGVlciIsImVtcHR5UHJvbWlzZSIsInVuaW9uQXJyYXlzIiwidG9waWNTb3VscyIsImRheXMiLCJkYXlTdHJpbmdzIiwib25lRGF5Iiwic3RhcnQiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJyZXBseVRvU291bCIsIm9wU291bCIsInRoaW5naWQiLCJyZXBseVRvSWQiLCJtdWx0aVF1ZXJ5Iiwic2luZ2xlUXVlcnkiLCJwbHVyYWwiLCJzaW5nbGUiLCJjb2xsYXRlIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwiY3VyYXRlZCIsInN1Ym1pc3Npb25Pbmx5IiwiaWRzMSIsImlkczIiLCJ0aGluZ1Njb3JlcyIsInZvdGVzIiwicHJvbWlzZXMiLCJBdXRob3JQYWdlcyIsIndpa2lQYWdlSWQiLCJjcmVhdGVkQXQiLCJuYWIiLCJRdWVyeSIsImRlZmluaXRpb25zIiwic2VhIiwiQVVUSF9TQ0hFTUEiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJUb3BpY0RheSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwYXR0ZXJuIiwicHJvcGVydGllcyIsIiRyZWYiLCJ5ZWFyIiwibWluaW11bSIsIm1heGltdW0iLCJtb250aCIsImRheSIsInJlcXVpcmVkIiwicHJvcHNGcm9tU291bCIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZWRnZU1hdGNoZXNLZXkiLCJhbnlPZiIsIlRvcGljIiwidXJsIiwiVVJMIiwiYWxsT2YiLCJ0aGluZ0tpbmQiLCJvcmlnaW5hbEhhc2giLCJvbmVPZiIsInRoaW5nUmVsYXRlZEVkZ2UiLCJhbGxjb21tZW50cyIsInZvdGVzdXAiLCJ2b3Rlc2Rvd24iLCJyZXBseVRvIiwidGhpbmdIYXNoTWF0Y2hlc1NvdWwiLCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmciLCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoIiwiaXNMZWdhY3lUaGluZyIsIlByb29mT2ZXb3JrVm90ZXMiLCIkYXN5bmMiLCJrZXlzQXJlUHJvb2ZzT2ZXb3JrIiwiYWxnb3JpdGhtIiwiY29tcGxleGl0eSIsImhhc2hMZW5ndGgiLCJ0aW1lQ29zdCIsIm1lbW9yeUNvc3QiLCJwYXJhbGxlbGlzbSIsIlRoaW5nVm90ZXNVcCIsIlRoaW5nVm90ZXNEb3duIiwiVGhpbmdEYXRhIiwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsIiwidXAiLCJkb3duIiwiY29tbWFuZHMiLCJMaXN0aW5nRGF0YSIsInVzZXJJZCIsInBhdHRlcm5Qcm9wZXJ0aWVzIiwic29ydE5hbWUiLCJlbnVtIiwiVGhpbmdDb21tZW50c0xpc3RpbmciLCJ1c2VyTGlzdGluZ1R5cGUiLCJBdXRob3JSZXBsaWVzTGlzdGluZyIsIkF1dGhvclByb2ZpbGVMaXN0aW5nIiwiQXV0aG9yQ29tbWVudHMiLCJBdXRob3JTdWJtaXNzaW9ucyIsIkF1dGhvclRoaW5ncyIsInJvdXRlcyIsImRlZnNXaXRoUm91dGVzIiwiU2NoZW1hIiwidGFidWxhdG9yUXVlcnkiLCJyZXBseVNvdWxzIiwiY29tbWFuZE1hcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJUYWJ1bGF0b3IiLCJ0b3BpY1ByZWZpeGVzIiwiY2hhdG1zZyIsImJpbmQiLCJpbmRleCIsInJlY3YiLCJ0ZCIsIm9mZiIsInRvcGljUHJlZml4IiwiYmFzZVRvcGljTmFtZSIsInRvTG93ZXJDYXNlIiwidG9waWNEYXkiLCJza2lwQWxsIiwiYWxsbmFtZSIsImFsbFRvcGljIiwiYWxsVG9waWNEYXkiLCJzZXQiLCJ1cmxJbmZvIiwiaG9zdCIsInNjaGVtZSIsInVybE5vZGUiLCJwdXQiLCJkYXRhU291bCIsIm1ldGFEYXRhIiwicHViIiwidGhpbmdzU291bCIsInN1Ym1pc3Npb25zU291bCIsImNvbW1lbnRzU291bCIsInJlamVjdCIsInBhZ2VzU291bCIsImNoYWluIiwibm9uY2UiLCJ1cmxTdHIiLCJUaGluZ0RhdGFOb2RlIiwiZGlzc29jIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImRheU51bSIsImdldFVUQ0RhdGUiLCJUaGluZ1NldCIsInRva2VuTWFwIiwibGluZSIsInRva2VucyIsImNoZWNrIiwia2V5c0luIiwiZ2V0TGFzdFZhbHVlIiwibmV4dCIsInBhaXJzIiwiVG9rZW5pemVyIiwic2NoZW1hIiwibmV3ZXN0IiwiX3NjaGVtYSIsInN1YnN0ciIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXMiLCJzaWduZWRJZCIsImdldElzVGhpbmdSZWxhdGVkRWRnZSIsImFqdiIsIm5vZGVUeXBlTmFtZSIsIl9wU2NoZW1hIiwiX2NQYXRoIiwicGFyZW50RGF0YSIsInByb3BUaGluZ0lkIiwiY29tcGlsZSIsInRoaW5nRGF0YUhhc2hNYXRjaGVzIiwiXyIsInJlY29yZCIsImlzVm90ZVZhbGlkIiwiYXJnb24yIiwiQnVmZmVyIiwiaGFzT3duUHJvcGVydHkiLCJmcm9tIiwic2FsdCIsImhhc2giLCJyYXciLCJtYXNrIiwicmVxdWlyZSIsImluaXRBanYiLCJhZGRLZXl3b3JkIiwidmFsaWRhdGUiLCJtb2RpZnlpbmciLCJzdXBwcmVzc29yIiwiY29udGV4dCIsIndpcmVJbnB1dCIsIm1zZyIsInByb21pc2UiLCJ2YWxpZGF0ZWQiLCJ0byIsImNhdGNoIiwiZXJyb3IiLCJzdGFjayIsIlZhbGlkYXRpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFDQTs7OztBQUVBLE1BQU1BLE1BQU0sR0FBR0MsQ0FBQyxDQUFDQyxLQUFGLENBQ2IsQ0FBQ0MsSUFBRCxFQUFPQyxRQUFQLEVBQWlCQyxRQUFqQixFQUEyQkMsSUFBSSxHQUFHLEVBQWxDLEtBQ0Usc0JBQVksQ0FBQ0MsRUFBRCxFQUFLQyxJQUFMLEtBQWM7QUFDeEIsTUFBSUwsSUFBSSxJQUFJQSxJQUFJLENBQUNNLEdBQWIsSUFBb0JOLElB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O0FDQUEsb0QiLCJmaWxlIjoibm90YWJ1Zy1wZWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXJnb24yXCIpLCByZXF1aXJlKFwiZ3VuLXNjb3BlXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3JcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIpLCByZXF1aXJlKFwib2JqZWN0LWhhc2hcIiksIHJlcXVpcmUoXCJyYW1kYVwiKSwgcmVxdWlyZShcInJvdXRlLXBhcnNlclwiKSwgcmVxdWlyZShcInVyaS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIm5vdGFidWctcGVlclwiLCBbXCJhcmdvbjJcIiwgXCJndW4tc2NvcGVcIiwgXCJndW4tc3VwcHJlc3NvclwiLCBcImd1bi1zdXBwcmVzc29yLXNlYXJcIiwgXCJvYmplY3QtaGFzaFwiLCBcInJhbWRhXCIsIFwicm91dGUtcGFyc2VyXCIsIFwidXJpLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5vdGFidWctcGVlclwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5vdGFidWctcGVlclwiXSA9IGZhY3Rvcnkocm9vdFtcImFyZ29uMlwiXSwgcm9vdFtcImd1bi1zY29wZVwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yXCJdLCByb290W1wiZ3VuLXN1cHByZXNzb3Itc2VhclwiXSwgcm9vdFtcIm9iamVjdC1oYXNoXCJdLCByb290W1wicmFtZGFcIl0sIHJvb3RbXCJyb3V0ZS1wYXJzZXJcIl0sIHJvb3RbXCJ1cmktanNcIl0pO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3Njb3BlX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3JfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfb2JqZWN0X2hhc2hfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JvdXRlX3BhcnNlcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3VyaV9qc19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcblxuY29uc3Qgc2lnbnVwID0gUi5jdXJyeShcbiAgKHBlZXIsIHVzZXJuYW1lLCBwYXNzd29yZCwgb3B0cyA9IHt9KSA9PlxuICAgIG5ldyBQcm9taXNlKChvaywgZmFpbCkgPT4ge1xuICAgICAgaWYgKHBlZXIgJiYgcGVlci5ndW4gJiYgcGVlci5ndW4udXNlcikge1xuICAgICAgICBjb25zdCB1c2VyID0gcGVlci5ndW4udXNlcigpO1xuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICB1c2VyLmNyZWF0ZShcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBhY2sgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWNrLmVycikge1xuICAgICAgICAgICAgICAgIGZhaWwoYWNrLmVycik7XG4gICAgICAgICAgICAgICAgdXNlci5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgIHBlZXIuZ3VuLnVzZXIoKS5sZWF2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZXIubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKG9rKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdHNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICB9XG4gICAgfSlcbik7XG5cbmNvbnN0IGxvZ2luID0gUi5jdXJyeSgocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkKSA9PlxuICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICBjb25zdCB1c2VyID0gcGVlci5ndW4udXNlcigpO1xuXG4gICAgICB1c2VyLmF1dGgodXNlcm5hbWUsIHBhc3N3b3JkLCBhY2sgPT5cbiAgICAgICAgYWNrLmVyciA/IGZhaWwoYWNrLmVycikgOiBvayhwZWVyLmd1bi51c2VyKCkuaXMpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgfVxuICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgcGVlci5fb25Mb2dpbiAmJiBwZWVyLl9vbkxvZ2luKHJlc3VsdCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgbG9nb3V0ID0gcGVlciA9PiBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbmNvbnN0IGlzTG9nZ2VkSW4gPSBwZWVyID0+IHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIgJiYgcGVlci5ndW4udXNlcigpLmlzO1xuY29uc3Qgb25Mb2dpbiA9IFIuY3VycnkoKHBlZXIsIGZuKSA9PiAocGVlci5fb25Mb2dpbiA9IGZuKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZXhwb3J0IGNvbnN0IEF1dGhlbnRpY2F0aW9uID0ge1xuICBzaWdudXAsXG4gIGxvZ2luLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIG9uTG9naW5cbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IHRva2VuaXplID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnRyaW0pLFxuICBSLnNwbGl0KFwiIFwiKSxcbiAgUi5yZXBsYWNlKENvbnN0YW50cy5DT01NQU5EX1JFLCBcIlwiKSxcbiAgUi5wcm9wT3IoXCJcIiwgMCksXG4gIFIuc3BsaXQoXCJcXG5cIilcbik7XG5cbmNvbnN0IG1hcCA9IHRoaW5nRGF0YSA9PlxuICBSLnJlZHVjZShcbiAgICAoY21kTWFwLCBpZCkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IFIucGF0aChbaWQsIFwiYm9keVwiXSwgdGhpbmdEYXRhKTtcbiAgICAgIGNvbnN0IGF1dGhvcklkID0gUi5wYXRoKFtpZCwgXCJhdXRob3JJZFwiXSwgdGhpbmdEYXRhKSB8fCBcImFub25cIjtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBhcnNlRmxvYXQoUi5wYXRoKFtpZCwgXCJ0aW1lc3RhbXBcIl0sIHRoaW5nRGF0YSkpO1xuXG4gICAgICBpZiAoIVIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSwgYm9keSkpIHJldHVybiBjbWRNYXA7XG4gICAgICBjb25zdCB0b2tlbml6ZWQgPSBbYXV0aG9ySWQsIC4uLnRva2VuaXplKGJvZHkpLCBpZF07XG5cbiAgICAgIHJldHVybiBSLmFzc29jUGF0aCh0b2tlbml6ZWQsIHRpbWVzdGFtcCB8fCAwLCBjbWRNYXApO1xuICAgIH0sXG4gICAge30sXG4gICAgUi5rZXlzKHRoaW5nRGF0YSlcbiAgKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRDb21tYW5kID0geyB0b2tlbml6ZSwgbWFwIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBDb25maWcgPSB7XG4gIHRhYnVsYXRvcjogQ29uc3RhbnRzLkRFVl9JTkRFWEVSLFxuICBpbmRleGVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIG93bmVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIHVwZGF0ZTogUi5jb21wb3NlKFxuICAgIFIubWFwKChba2V5LCB2YWxdKSA9PiAoQ29uZmlnW2tleV0gPSB2YWwpKSxcbiAgICBSLnRvUGFpcnNcbiAgKVxufTtcbiIsImNvbnN0IENPTU1BTkRfUkUgPSAvXiB7NH1+LztcbmNvbnN0IFBSRUZJWCA9IFwibmFiXCI7XG5jb25zdCBTT1VMX0RFTElNRVRFUiA9IFwifH5+fFwiO1xuXG5jb25zdCBMSVNUSU5HX1NJWkUgPSAxMDAwO1xuXG5jb25zdCBNQVhfSEFTSF9TSVpFID0gNjQ7XG5jb25zdCBNQVhfUE9XX05PTkNFX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9UT1BJQ19TSVpFID0gNDI7XG5jb25zdCBNQVhfQVVUSE9SX0FMSUFTX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfQVVUSE9SX0lEX1NJWkUgPSAxMjg7IC8vID8/P1xuY29uc3QgTUFYX1VSTF9TSVpFID0gMjA0ODtcbmNvbnN0IE1BWF9ET01BSU5fU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9USElOR19LSU5EX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9USElOR19USVRMRV9TSVpFID0gMzAwO1xuY29uc3QgTUFYX1RISU5HX0JPRFlfU0laRSA9IDUwMDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19JRFNfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1RBQlNfU0laRSA9IDUwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFID0gTUFYX0FVVEhPUl9JRF9TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSA9IDE2O1xuXG5jb25zdCBJTkRFWEVSID0gXCJDRXlLckRkMXh5UFhwV1NWMDBNZ3ZuWlkyVkpMSFhnekN2aE1lRHdLVFlBLnlqU3EwRHlYenpoQl9aWHJfRHpmSmdpajN0WFUwLTN0MFE1YkpBdFpwajhcIjtcbmNvbnN0IERFVl9JTkRFWEVSID0gXCJsMm5TZWRsU2x2b21UcUNZaG1QbkFOb1FMWGU0c2o1clIyT3JDN1lxUHBVLnppbWFXd2RsZnlUclZJVGd3V29EVmRiSlFLUmVPVHFWNXpOalRSYy15UUFcIjtcblxuZXhwb3J0IGNvbnN0IENvbnN0YW50cyA9IHtcbiAgQ09NTUFORF9SRSxcbiAgUFJFRklYLFxuICBTT1VMX0RFTElNRVRFUixcbiAgTElTVElOR19TSVpFLFxuICBNQVhfSEFTSF9TSVpFLFxuICBNQVhfUE9XX05PTkNFX1NJWkUsXG4gIE1BWF9UT1BJQ19TSVpFLFxuICBNQVhfQVVUSE9SX0FMSUFTX1NJWkUsXG4gIE1BWF9BVVRIT1JfSURfU0laRSxcbiAgTUFYX1VSTF9TSVpFLFxuICBNQVhfRE9NQUlOX1NJWkUsXG4gIE1BWF9USElOR19LSU5EX1NJWkUsXG4gIE1BWF9USElOR19USVRMRV9TSVpFLFxuICBNQVhfVEhJTkdfQk9EWV9TSVpFLFxuICBNQVhfTElTVElOR19JRFNfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1RBQlNfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9QUkVGSVhfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1RZUEVfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUsXG4gIElOREVYRVIsXG4gIERFVl9JTkRFWEVSXG59O1xuIiwiLyogZ2xvYmFscyBHdW4gKi9cbmltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHNvdWwgPSBSLnBhdGhPcihcIlwiLCBbXCJfXCIsIFwiI1wiXSk7XG5jb25zdCBzdGF0ZSA9IFIucGF0aE9yKHt9LCBbXCJfXCIsIFwiPlwiXSk7XG5cbmNvbnN0IGxhdGVzdCA9IFIuY29tcG9zZShcbiAgUi5sYXN0LFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi52YWx1ZXMsXG4gIHN0YXRlXG4pO1xuXG5jb25zdCBlZGdlcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFwiI1wiKSksXG4gIFIudmFsdWVzXG4pO1xuXG5mdW5jdGlvbiBkZWNvZGVTRUEocmF3RGF0YSkge1xuICBjb25zdCBkYXRhID0gcmF3RGF0YSA/IHsgLi4ucmF3RGF0YSB9IDogcmF3RGF0YTtcbiAgY29uc3Qgc291bCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKCFzb3VsIHx8ICFHdW4uU0VBIHx8IHNvdWwuaW5kZXhPZihcIn5cIikgPT09IC0xKSByZXR1cm4gcmF3RGF0YTtcbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIEd1bi5TRUEudmVyaWZ5KFxuICAgICAgR3VuLlNFQS5vcHQucGFjayhyYXdEYXRhW2tleV0sIGtleSwgcmF3RGF0YSwgc291bCksXG4gICAgICBmYWxzZSxcbiAgICAgIHJlcyA9PiAoZGF0YVtrZXldID0gR3VuLlNFQS5vcHQudW5wYWNrKHJlcywga2V5LCByYXdEYXRhKSlcbiAgICApO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgR3VuTm9kZSA9IHsgc291bCwgc3RhdGUsIGxhdGVzdCwgZWRnZXMsIGRlY29kZVNFQSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UsIHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IG5lZWRzU2NvcmVzID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwic29ydCBob3RcIixcbiAgICBcInNvcnQgdG9wXCIsXG4gICAgXCJzb3J0IGJlc3RcIixcbiAgICBcInNvcnQgY29udHJvdmVyc2lhbFwiLFxuICAgIFwidXBzXCIsXG4gICAgXCJkb3duc1wiLFxuICAgIFwic2NvcmVcIixcbiAgICBcImNhbiByZW1vdmVcIlxuICBdKTtcblxuY29uc3QgbmVlZHNEYXRhID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwidG9waWNcIixcbiAgICBcImRvbWFpblwiLFxuICAgIFwiYXV0aG9yXCIsXG4gICAgXCJ1bmlxdWUgYnkgY29udGVudFwiLFxuICAgIFwia2luZFwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwicmVxdWlyZSBzaWduZWRcIixcbiAgICBcInJlcXVpcmUgYW5vblwiLFxuICAgIFwiYWxpYXNcIixcbiAgICBcImJhbiBkb21haW5cIixcbiAgICBcImJhbiB0b3BpY1wiLFxuICAgIFwiYmFuIGF1dGhvclwiLFxuICAgIFwiYmFuIGFsaWFzXCJcbiAgXSk7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSA9PlxuICBQcm9taXNlLmFsbChcbiAgICBSLm1hcChzb3VsID0+IExpc3RpbmdTb3J0Lml0ZW1Gcm9tU291bChzY29wZSwgc291bCwgZGVmaW5pdGlvbiksIHNvdWxzKVxuICApLnRoZW4oTGlzdGluZ1NvcnQuc29ydEl0ZW1zKVxuKTtcblxuY29uc3QgaXRlbXNGcm9tVGhpbmdTZXRzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgLnRoZW4oUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSkpXG4gICAgLnRoZW4oVGhpbmdTZXQuc291bHMpXG4gICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKVxuKTtcblxuY29uc3QgbGlzdGluZ1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBsaXN0aW5ncyA9IFIucGF0aE9yKFtdLCBbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJsaXN0aW5nc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAobCA9PiBgJHtsfS8ke3NvcnR9YCwgbGlzdGluZ3MpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocyB9O1xufTtcblxuY29uc3QgdG9waWNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCB0b3BpY3MgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidG9waWNzXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAodCA9PiBgL3QvJHt0fS8ke3NvcnR9YCwgdG9waWNzKTtcbiAgLy8gY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvdC8ke3RvcGljcy5zb3J0KCkuam9pbihcIitcIil9LyR7c29ydH1gXTtcblxuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlUb3BpYyhzY29wZSwgeyB0b3BpY3MsIHNvcnQgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBkb21haW5Tb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBkb21haW5zID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImRvbWFpbnNcIl0sIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghZG9tYWlucy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoZCA9PiBgL2RvbWFpbi8ke2R9LyR7c29ydH1gLCBkb21haW5zKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpRG9tYWluKHNjb3BlLCB7IGRvbWFpbnMsIHNvcnQgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBhdXRob3JTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBhdXRob3JJZHMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiYXV0aG9yc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHR5cGUgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidHlwZVwiXSwgZGVmaW5pdGlvbik7XG5cbiAgaWYgKCFhdXRob3JJZHMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGlkID0+IGAvdXNlci8ke2lkfS8ke3R5cGV9LyR7c29ydH1gLCBhdXRob3JJZHMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlBdXRob3Ioc2NvcGUsIHsgdHlwZSwgYXV0aG9ySWRzIH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgY3VyYXRvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGN1cmF0b3JzID0gUi5wcm9wKFwiY3VyYXRvcnNcIiwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFjdXJhdG9ycy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9L2NvbW1lbnRlZC8ke3NvcnR9YCwgY3VyYXRvcnMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkuY3VyYXRlKHNjb3BlLCBjdXJhdG9ycywgdHJ1ZSlcbiAgICAgIC50aGVuKGlkcyA9PiBpZHMubWFwKHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKSlcbiAgICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgb3BTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBzdWJtaXNzaW9uSWRzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcIm9wc1wiXSwgZGVmaW5pdGlvbik7XG5cbiAgaWYgKCFzdWJtaXNzaW9uSWRzLmxlbmd0aCkgdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKFxuICAgIGlkID0+IGAvdGhpbmdzLyR7aWR9L2NvbW1lbnRzLyR7c29ydH1gLFxuICAgIHN1Ym1pc3Npb25JZHNcbiAgKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpU3VibWlzc2lvbihzY29wZSwgeyBzdWJtaXNzaW9uSWRzIH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgcmVwbGllc1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGlkID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInJlcGxpZXNUb1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHR5cGUgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidHlwZVwiXSwgZGVmaW5pdGlvbik7XG5cbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gW2AvdXNlci8ke2lkfS9yZXBsaWVzLyR7dHlwZX0vJHtzb3J0fWBdO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkucmVwbGllc1RvQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlLFxuICAgICAgcmVwbGllc1RvQXV0aG9ySWQ6IGlkLFxuICAgICAgaW5kZXhlcjogZGVmaW5pdGlvbi5pbmRleGVyXG4gICAgfSkudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHNvdXJjZXMgPSB7XG4gIGxpc3Rpbmc6IGxpc3RpbmdTb3VyY2UsXG4gIHJlcGxpZXM6IHJlcGxpZXNTb3VyY2UsXG4gIG9wOiBvcFNvdXJjZSxcbiAgY3VyYXRvcjogY3VyYXRvclNvdXJjZSxcbiAgYXV0aG9yOiBhdXRob3JTb3VyY2UsXG4gIGRvbWFpbjogZG9tYWluU291cmNlLFxuICB0b3BpYzogdG9waWNTb3VyY2Vcbn07XG5cbmNvbnN0IHNvdXJjZU5hbWVzID0gUi5rZXlzKHNvdXJjZXMpO1xuY29uc3Qgc291cmNlTmFtZSA9IGRlZiA9PiBSLmZpbmQoZGVmLmlzUHJlc2VudCwgc291cmNlTmFtZXMpIHx8IFwidG9waWNcIjtcbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IG5hbWUgPSBzb3VyY2VOYW1lKGRlZmluaXRpb24pO1xuXG4gIHJldHVybiBSLm1lcmdlTGVmdCh7IG5hbWUgfSwgc291cmNlc1tuYW1lXShkZWZpbml0aW9uKSk7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RhdGFTb3VyY2UgPSB7XG4gIGZyb21EZWZpbml0aW9uLFxuICBzb3VyY2VzLFxuICBuZWVkc1Njb3JlcyxcbiAgbmVlZHNEYXRhLFxuICBpdGVtc0Zyb21UaGluZ1NldHMsXG4gIGl0ZW1zRnJvbVRoaW5nU291bHNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuXG5jb25zdCBmcm9tU291cmNlID0gKHNvdXJjZSwgb3duZXJJZCA9IG51bGwsIHNwYWNlTmFtZSA9IG51bGwpID0+IHtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG4gIGNvbnN0IG9iaiA9IHsgLi4udG9rZW5pemVkIH07XG4gIGNvbnN0IHsgaXNQcmVzZW50LCBnZXRWYWx1ZSwgZ2V0VmFsdWVzLCBnZXRWYWx1ZUNoYWluLCBnZXRQYWlycyB9ID0gdG9rZW5pemVkO1xuXG4gIFtcbiAgICBvYmouZnJvbVBhZ2VBdXRob3IgPSBvd25lcklkLFxuICAgIG9iai5mcm9tUGFnZU5hbWUgPSBzcGFjZU5hbWUgPyBgc3BhY2U6JHtzcGFjZU5hbWV9YCA6IHVuZGVmaW5lZFxuICBdID0gZ2V0VmFsdWVDaGFpbihcInNvdXJjZWQgZnJvbSBwYWdlXCIpO1xuICBvYmouZGlzcGxheU5hbWUgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJuYW1lXCIpIHx8IHNwYWNlTmFtZTtcbiAgb2JqLmluZGV4ZXIgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBDb25maWcuaW5kZXhlcjtcbiAgb2JqLnRhYnVsYXRvciA9IGdldFZhbHVlKFwidGFidWxhdG9yXCIpIHx8IG9iai5pbmRleGVyO1xuICBvYmoudGFicyA9IGdldFBhaXJzKFwidGFiXCIpO1xuICBvYmouc29ydCA9IGdldFZhbHVlKFwic29ydFwiKTtcblxuICAvLyBUT0RPOiBicmVha3Mgd2l0aCBjdXN0b20gbmFtZXNcbiAgaWYgKG9iai5zb3J0ID09PSBcImRlZmF1bHRcIikgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInRhYlwiKTtcblxuICBvYmoudW5pcXVlQnlDb250ZW50ID0gISFpc1ByZXNlbnQoXCJ1bmlxdWUgYnkgY29udGVudFwiKTtcbiAgb2JqLmN1cmF0b3JzID0gZ2V0VmFsdWVzKFwiY3VyYXRvclwiKTtcbiAgb2JqLm1vZGVyYXRvcnMgPSBnZXRWYWx1ZXMoXCJtb2RcIik7XG4gIG9iai5pbmNsdWRlUmFua3MgPSAhIWlzUHJlc2VudChcInNob3cgcmFua3NcIik7XG4gIG9iai5zdGlja3lJZHMgPSBnZXRWYWx1ZXMoXCJzdGlja3lcIik7XG4gIG9iai5pc0lkU3RpY2t5ID0gaWQgPT4gISF0b2tlbml6ZWQuaXNQcmVzZW50KFtcInN0aWNreVwiLCBpZF0pO1xuICBvYmouaXNDaGF0ID0gISFpc1ByZXNlbnQoXCJkaXNwbGF5IGFzIGNoYXRcIik7XG4gIG9iai5zdWJtaXRUb3BpY3MgPSBnZXRWYWx1ZXMoXCJzdWJtaXQgdG9cIik7XG4gIG9iai5zdWJtaXRUb3BpYyA9IGdldFZhbHVlKFwic3VibWl0IHRvXCIpO1xuICBvYmouY2hhdFRvcGljID0gZ2V0VmFsdWUoXCJjaGF0IGluXCIpO1xuXG4gIGlmIChvd25lcklkICYmIHNwYWNlTmFtZSkge1xuICAgIG9iai5zcGFjZU5hbWUgPSBzcGFjZU5hbWU7XG4gICAgb2JqLm93bmVyID0gb3duZXJJZDtcbiAgICBvYmoudXNlRm9yQ29tbWVudHMgPSAhdG9rZW5pemVkLmlzUHJlc2VudChcImNvbW1lbnRzIGxlYXZlIHNwYWNlXCIpO1xuICAgIG9iai5iYXNlUGF0aCA9IGAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke3NwYWNlTmFtZX1gO1xuICAgIGlmIChvYmouc3VibWl0VG9waWMpIG9iai5zdWJtaXRQYXRoID0gYCR7b2JqLmJhc2VQYXRofS9zdWJtaXRgO1xuICAgIG9iai5kZWZhdWx0VGFiID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpO1xuICAgIG9iai5kZWZhdWx0VGFiUGF0aCA9IG9iai5kZWZhdWx0VGFiXG4gICAgICA/IHRva2VuaXplZC5nZXRWYWx1ZShbXCJ0YWJcIiwgb2JqLmRlZmF1bHRUYWJdKVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgb2JqLmZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICBhbGxvdzoge1xuICAgICAgcmVwbGllc1RvOiBnZXRWYWx1ZShcInJlcGxpZXMgdG8gYXV0aG9yXCIpLFxuICAgICAgdHlwZTogZ2V0VmFsdWUoXCJ0eXBlXCIpLCAvLyBUT0RPOiB0aGlzIGZpZWxkIHNlZW1zIHJlZHVuZGFudCB3aXRoIGtpbmQgYW5kIHNob3VsZCBiZSBkZXByZWNhdGVkXG4gICAgICBvcHM6IGdldFZhbHVlcyhcIm9wXCIpLFxuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcInRvcGljXCIpLFxuICAgICAgbGlzdGluZ3M6IGdldFZhbHVlcyhcImxpc3RpbmdcIiksXG4gICAgICBraW5kczogZ2V0VmFsdWVzKFwia2luZFwiKSxcbiAgICAgIGFub246ICFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKVxuICAgIH0sXG4gICAgZGVueToge1xuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYmFuIGFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYmFuIGF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImJhbiBkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcImJhbiB0b3BpY1wiKSxcbiAgICAgIGFub246ICEhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICEhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpLFxuICAgICAgdGFnczogZ2V0UGFpcnMoXCJjYW4gcmVtb3ZlXCIpXG4gICAgfVxuICB9O1xuXG4gIG9iai52b3RlRmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIHVwc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHVwc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWluOiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNaW46IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGJlbG93XCIpLCAxMCkgfHwgbnVsbFxuICB9O1xuXG4gIG9iai5jZW5zb3JzID0gUi51bmlxKFIubWFwKFIucHJvcCgxKSwgb2JqLmZpbHRlcnMuZGVueS50YWdzKSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RlZmluaXRpb24gPSB7IGZyb21Tb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuXG5jb25zdCBpbnRQYXRoID0gcCA9PlxuICBSLmNvbXBvc2UoXG4gICAgcGFyc2VJbnQsXG4gICAgUi5wYXRoKHApXG4gICk7XG5cbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgZmlsdGVycywgdm90ZUZpbHRlcnMsIGlzUHJlc2VudCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0gW107XG4gIGNvbnN0IHZvdGVGaWx0ZXJGdW5jdGlvbnMgPSBbXTtcblxuICBjb25zdCBhZGRGaWx0ZXIgPSAoLi4uZm5zKSA9PiBmaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG4gIGNvbnN0IGFkZFZvdGVGaWx0ZXIgPSAoLi4uZm5zKSA9PiB2b3RlRmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImFsaWFzXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYXV0aG9yXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0ID0+ICEhaXNQcmVzZW50KFtcImRvbWFpblwiLCB0XSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpbixcbiAgICAgIFIucHJvcChcImRhdGFcIilcbiAgICApO1xuXG4gIGlmIChcbiAgICBmaWx0ZXJzLmFsbG93LnRvcGljcy5sZW5ndGggJiZcbiAgICAhUi5maW5kKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLmlkZW50aWNhbChcImFsbFwiKSxcbiAgICAgICAgUi5sYXN0LFxuICAgICAgICBSLnNwbGl0KFwiOlwiKVxuICAgICAgKSxcbiAgICAgIGZpbHRlcnMuYWxsb3cudG9waWNzXG4gICAgKVxuICApXG4gICAgYWRkRmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgbGV0IHRvcGljID0gUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSwgaXRlbSk7XG4gICAgICBjb25zdCBraW5kID0gUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdLCBpdGVtKTtcblxuICAgICAgaWYgKGtpbmQgPT09IFwiY2hhdG1zZ1wiKSB0b3BpYyA9IGBjaGF0OiR7dG9waWN9YDtcbiAgICAgIGlmIChraW5kID09PSBcImNvbW1lbnRcIikgdG9waWMgPSBgY29tbWVudHM6JHt0b3BpY31gO1xuICAgICAgcmV0dXJuICEhaXNQcmVzZW50KFtcInRvcGljXCIsIHRvcGljXSk7XG4gICAgfSk7XG5cbiAgaWYgKGZpbHRlcnMuYWxsb3cua2luZHMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihraW5kID0+ICEhaXNQcmVzZW50KFtcImtpbmRcIiwga2luZF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImtpbmRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cudHlwZSA9PT0gXCJjb21tYW5kc1wiKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi50ZXN0KENvbnN0YW50cy5DT01NQU5EX1JFKSxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJib2R5XCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS5hbGlhc2VzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhbGlhcyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImFsaWFzXCIsIGFsaWFzXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvclwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmF1dGhvcnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGF1dGhvcklkID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYXV0aG9yXCIsIGF1dGhvcklkXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuZG9tYWlucy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgZG9tYWluID0+ICFkb21haW4gfHwgIWlzUHJlc2VudChbXCJiYW5cIiwgXCJkb21haW5cIiwgZG9tYWluXSksXG4gICAgICBUaGluZ0RhdGFOb2RlLmRvbWFpblxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkudG9waWNzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICB0b3BpYyA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcInRvcGljXCIsIHRvcGljXSksXG4gICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcInRvcGljXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYW5vbikgYWRkRmlsdGVyKFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5zaWduZWQpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBhdXRob3JJZCA9PiAhYXV0aG9ySWQsXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAodm90ZUZpbHRlcnMudXBzTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMudXBzTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy51cHNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy51cHNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuZG93bnNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5kb3duc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnNjb3JlTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5zY29yZU1heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnNjb3JlTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInNjb3JlXCJdKSk7XG5cbiAgaWYgKGZpbHRlcnMuZGVueS50YWdzLmxlbmd0aClcbiAgICBhZGRWb3RlRmlsdGVyKHRoaW5nID0+IHtcbiAgICAgIGNvbnN0IGNtZHMgPSBSLnBhdGgoW1widm90ZXNcIiwgXCJjb21tYW5kc1wiXSwgdGhpbmcpIHx8IHt9O1xuXG4gICAgICByZXR1cm4gIWZpbHRlcnMuZGVueS50YWdzLmZpbmQoXG4gICAgICAgIChbdGFnTmFtZSwgYXV0aG9ySWRdKSA9PiAhIVIucGF0aChbYXV0aG9ySWQsIFwidGFnXCIsIHRhZ05hbWVdLCBjbWRzKVxuICAgICAgKTtcbiAgICB9KTtcblxuICBjb25zdCBjb250ZW50RmlsdGVyID0gdGhpbmcgPT4gIWZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB2b3RlRmlsdGVyID0gdGhpbmcgPT4gIXZvdGVGaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3QgdGhpbmdGaWx0ZXIgPSB0aGluZyA9PlxuICAgIGRlZmluaXRpb24uaXNJZFN0aWNreShSLnByb3AoXCJpZFwiLCB0aGluZykpIHx8XG4gICAgKGNvbnRlbnRGaWx0ZXIodGhpbmcpICYmIHZvdGVGaWx0ZXIodGhpbmcpKTtcblxuICByZXR1cm4geyB0aGluZ0ZpbHRlciwgY29udGVudEZpbHRlciwgdm90ZUZpbHRlciB9O1xufTtcblxuY29uc3QgZ2V0RmlsdGVyZWRSb3dzID0gYXN5bmMgKFxuICBzY29wZSxcbiAgc3BlYyxcbiAgc29ydGVkUm93cyxcbiAgeyBsaW1pdDogbGltaXRQcm9wID0gMjUsIGNvdW50OiBjb3VudFByb3AgPSAwLCBhZnRlciA9IG51bGwsIGZpbHRlckZuIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQobGltaXRQcm9wLCAxMCk7XG4gIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoY291bnRQcm9wLCAxMCkgfHwgMDtcbiAgY29uc3Qgcm93cyA9IHNvcnRlZFJvd3Muc2xpY2UoKTtcbiAgY29uc3QgZmlsdGVyZWQgPSBbXTtcbiAgY29uc3QgZmV0Y2hCYXRjaCA9IChzaXplID0gMzApID0+XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICBSLm1hcChhc3luYyByb3cgPT4ge1xuICAgICAgICBsZXQgaW5MaXN0aW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAoZmlsdGVyRm4pIGluTGlzdGluZyA9IGF3YWl0IGZpbHRlckZuKHJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKTtcbiAgICAgICAgaWYgKGluTGlzdGluZykgZmlsdGVyZWQucHVzaChyb3cpO1xuICAgICAgfSwgcm93cy5zcGxpY2UoY291bnQsIHNpemUpKVxuICAgICk7XG5cbiAgd2hpbGUgKHJvd3MubGVuZ3RoID4gY291bnQpIHtcbiAgICBhd2FpdCBmZXRjaEJhdGNoKCk7XG4gICAgaWYgKGxpbWl0ICYmIGZpbHRlcmVkLmxlbmd0aCA+PSBsaW1pdCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gUi5jb21wb3NlKFxuICAgIGxpbWl0ID8gUi5zbGljZSgwLCBsaW1pdCkgOiBSLmlkZW50aXR5LFxuICAgIFIuc29ydEJ5KFIucHJvcChMaXN0aW5nTm9kZS5QT1NfVkFMKSlcbiAgKShmaWx0ZXJlZCk7XG59O1xuXG5jb25zdCBnZXRGaWx0ZXJlZElkcyA9IFIuY29tcG9zZShcbiAgeCA9PiB4LnRoZW4oUi5tYXAoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19JRCkpKSxcbiAgZ2V0RmlsdGVyZWRSb3dzXG4pO1xuXG5jb25zdCB0aGluZ0ZpbHRlciA9IFIuY3VycnkoKHNjb3BlLCBzcGVjLCB0aGluZ0lkKSA9PlxuICBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pLFxuICAgIHNjb3JlczogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNTY29yZXMoc3BlYyksXG4gICAgZGF0YTogTGlzdGluZ0RhdGFTb3VyY2UubmVlZHNEYXRhKHNwZWMpXG4gIH0pLnRoZW4oc3BlYy50aGluZ0ZpbHRlcilcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRmlsdGVyID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgZ2V0RmlsdGVyZWRSb3dzLFxuICBnZXRGaWx0ZXJlZElkcyxcbiAgdGhpbmdGaWx0ZXJcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG4vLyBpbXBvcnQgbWVtb2l6ZSBmcm9tIFwiZmFzdC1tZW1vaXplXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5cbmNvbnN0IG1lbW9pemUgPSBSLmNvbXBvc2U7XG5cbmNvbnN0IFtQT1NfSURYLCBQT1NfSUQsIFBPU19WQUxdID0gWzAsIDEsIDIsIDNdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCByb3dzVG9JZHMgPSBSLm1hcChSLnByb3AoUE9TX0lEKSk7XG5jb25zdCByb3dzVG9JdGVtcyA9IFIubWFwKFIuc2xpY2UoMSwgMykpO1xuY29uc3Qgc291cmNlID0gUi5wcm9wT3IoXCJcIiwgXCJzb3VyY2VcIik7XG5jb25zdCBzb3VsRnJvbVBhdGggPSBSLmN1cnJ5KFxuICAoaW5kZXhlciwgcGF0aCkgPT4gYCR7Q29uc3RhbnRzLlBSRUZJWH0ke3BhdGh9QH4ke2luZGV4ZXJ9LmBcbik7XG5jb25zdCBwYXRoRnJvbVNvdWwgPSBSLmNvbXBvc2UoXG4gIFIucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtDb25zdGFudHMuUFJFRklYfWApLCBcIlwiKSxcbiAgUi5yZXBsYWNlKC9Afi4qXFwuLywgXCJcIilcbik7XG5cbmNvbnN0IGlkVG9Tb3VsID0gdGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSk7XG5jb25zdCBpZHNUb1NvdWxzID0gUi5tYXAoaWRUb1NvdWwpO1xuY29uc3Qgc291bFRvSWQgPSBzb3VsID0+IFIucHJvcChcInRoaW5nSWRcIiwgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpKTtcbmNvbnN0IHNvdWxzVG9JZHMgPSBSLm1hcChzb3VsVG9JZCk7XG5cbmNvbnN0IGdldFJvdyA9IFIuY3VycnkoKG5vZGUsIGlkeCkgPT5cbiAgUi5jb21wb3NlKFxuICAgIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pbnNlcnQoMCwgcGFyc2VJbnQoaWR4LCAxMCkpLCBSLmFsd2F5cyhudWxsKSksXG4gICAgcm93ID0+IHtcbiAgICAgIHJvd1sxXSA9IHBhcnNlRmxvYXQocm93WzFdKTtcbiAgICAgIHJldHVybiByb3c7XG4gICAgfSxcbiAgICBSLm1hcChSLnRyaW0pLFxuICAgIFIuc3BsaXQoXCIsXCIpLFxuICAgIFIucHJvcE9yKFwiXCIsIGAke2lkeH1gKVxuICApKG5vZGUpXG4pO1xuXG5jb25zdCBpdGVtS2V5cyA9IG1lbW9pemUoUi5jb21wb3NlKFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICB2YWwgPT4gISEodmFsID09PSAwIHx8IHZhbCksXG4gICAgICBwYXJzZUludFxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pKTtcblxuY29uc3Qgc2VyaWFsaXplID0gUi5jdXJyeSgoc3BlYywgaXRlbXMpID0+XG4gIFIuY29tcG9zZShcbiAgICBSLmFkZEluZGV4KFIucmVkdWNlKShcbiAgICAgIChyZXMsIHJvdywgaWR4KSA9PiBSLmFzc29jKGAke2lkeH1gLCByb3cuam9pbihcIixcIiksIHJlcyksXG4gICAgICB7fVxuICAgICksXG4gICAgUi5kZWZhdWx0VG8oW10pXG4gICkoaXRlbXMpXG4pO1xuXG5jb25zdCByb3dzID0gbm9kZSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5tYXAoZ2V0Um93KG5vZGUpKSxcbiAgICBpdGVtS2V5c1xuICApKG5vZGUpO1xuXG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIHJvd3NUb0lkcyxcbiAgcm93c1xuKTtcblxuY29uc3Qgc29ydFJvd3MgPSBSLnNvcnRXaXRoKFtcbiAgUi5hc2NlbmQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5jb25kKFtbUi5pc05pbCwgUi5hbHdheXMoSW5maW5pdHkpXSwgW1IuVCwgcGFyc2VGbG9hdF1dKSxcbiAgICAgIFIucHJvcChQT1NfVkFMKVxuICAgIClcbiAgKVxuXSk7XG5cbmNvbnN0IHNvcnRlZElkcyA9IG1lbW9pemUoUi5jb21wb3NlKFxuICBSLm1hcChSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgcm93c1xuKSk7XG5cbmNvbnN0IGl0ZW1zVG9Sb3dzID0gUi5hZGRJbmRleChSLm1hcCkoKGl0ZW0sIGlkeCkgPT4gW2lkeCwgLi4uaXRlbV0pO1xuXG5jb25zdCBkaWZmID0gYXN5bmMgKFxuICBub2RlLFxuICB1cGRhdGVkSXRlbXMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW10sXG4gIHsgbWF4U2l6ZSA9IDEwMDAgfSA9IHt9XG4pID0+IHtcbiAgY29uc3QgcmVtb3ZlZCA9IFIuaW5kZXhCeShSLmlkZW50aXR5LCByZW1vdmVJZHMpO1xuICBjb25zdCBieUlkID0ge307XG4gIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBjb25zdCB1cGRhdGVkID0ge307XG4gIGxldCB0b1JlcGxhY2UgPSBbXTtcbiAgbGV0IG1heElkeCA9IDA7XG4gIGxldCBrZXk7XG5cbiAgZm9yIChrZXkgaW4gbm9kZSB8fCB7fSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGtleSwgMTApO1xuXG4gICAgaWYgKCEocGFyc2VkIHx8IHBhcnNlZCA9PT0gMCkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHJvdyA9IGdldFJvdyhub2RlLCBrZXkpIHx8IFtwYXJzZWQsIG51bGwsIG51bGxdO1xuICAgIGNvbnN0IFtpZHgsIGlkID0gbnVsbCwgcmF3VmFsdWUgPSBudWxsXSA9IHJvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgcm93W1BPU19WQUxdID0gcmF3VmFsdWUgPT09IG51bGwgPyBudWxsIDogcGFyc2VGbG9hdChyYXdWYWx1ZSk7XG4gICAgaWYgKGlkICYmIHJlbW92ZWRbaWRdKSByb3dbUE9TX0lEXSA9IHJvd1tQT1NfVkFMXSA9IG51bGw7XG4gICAgaWYgKGlkKSBieUlkW2lkXSA9IHJvdztcbiAgICBpZiAocm93W1BPU19JRF0pIHtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b1JlcGxhY2UucHVzaChyb3cpO1xuICAgIH1cbiAgICBpZiAoaWR4ID4gbWF4SWR4KSBtYXhJZHggPSBpZHg7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFtpZCwgdmFsdWVdID0gdXBkYXRlZEl0ZW1zW2ldIHx8IFtudWxsLCBudWxsXTtcblxuICAgIGlmICghaWQpIGNvbnRpbnVlO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gYnlJZFtpZF07XG5cbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGlmIChleGlzdGluZ1tQT1NfVkFMXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZXhpc3RpbmdbUE9TX1ZBTF0gPSB2YWx1ZTtcbiAgICAgICAgdXBkYXRlZFtpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByb3cgPSBbbnVsbCwgaWQsIHZhbHVlXTtcblxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWxsU29ydGVkID0gc29ydFJvd3Mocm93cyk7XG4gIGNvbnN0IHNvcnRlZCA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UoMCwgbWF4U2l6ZSkgOiBhbGxTb3J0ZWQ7XG4gIGNvbnN0IG1pc3NpbmcgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKG1heFNpemUsIGFsbFNvcnRlZC5sZW5ndGgpIDogW107XG4gIGNvbnN0IGFkZGVkID0gUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSA9PT0gbnVsbCwgc29ydGVkKTtcblxuICB0b1JlcGxhY2UgPSB0b1JlcGxhY2VcbiAgICAuY29uY2F0KFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gIT09IG51bGwsIG1pc3NpbmcpKVxuICAgIC5yZXZlcnNlKCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpZCA9IHNvcnRlZFtpXVtQT1NfSURdO1xuICAgIGNvbnN0IGlkeCA9IHNvcnRlZFtpXVtQT1NfSURYXTtcbiAgICBjb25zdCB2YWwgPSBzb3J0ZWRbaV1bUE9TX1ZBTF07XG5cbiAgICBpZiAoaWR4ICE9PSBudWxsICYmIHVwZGF0ZWRbaWRdKSBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtpZCwgdmFsXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIGNvbnN0IGluc2VydGVkID0gW107XG5cbiAgd2hpbGUgKGFkZGVkLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IGFkZGVkLnBvcCgpO1xuICAgIGNvbnN0IHJlcGxhY2VkID0gdG9SZXBsYWNlLnBvcCgpO1xuICAgIGxldCBbaWR4XSA9IHJlcGxhY2VkIHx8IFtudWxsXTtcblxuICAgIGlmIChpZHggPT09IG51bGwpIHtcbiAgICAgIGlkeCA9IHBhcnNlSW50KG1heElkeCwgMTApICsgaW5zZXJ0ZWQubGVuZ3RoICsgMTtcbiAgICAgIGluc2VydGVkLnB1c2goaWR4KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtyb3dbUE9TX0lEXSwgcm93W1BPU19WQUxdXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIHdoaWxlICh0b1JlcGxhY2UubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gdG9SZXBsYWNlLnBvcCgpO1xuXG4gICAgaWYgKHJvdyAmJiAhcm93W1BPU19JRF0pIHtcbiAgICAgIGNvbnN0IGlkeCA9IGAke3Jvd1tQT1NfSURYXX1gO1xuXG4gICAgICBpZiAobm9kZVtpZHhdICE9PSBudWxsKSB7XG4gICAgICAgIGNoYW5nZXNbaWR4XSA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibnVsbGluZ1wiLCBpZHgsIG5vZGVbaWR4XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFIua2V5cyhjaGFuZ2VzKS5sZW5ndGggPyBjaGFuZ2VzIDogbnVsbDtcbn07XG5cbmNvbnN0IGNhdGVnb3JpemVEaWZmID0gKGRpZmYsIG9yaWdpbmFsKSA9PiB7XG4gIGNvbnN0IGFsbEtleXMgPSBpdGVtS2V5cyhSLm1lcmdlTGVmdChkaWZmLCBvcmlnaW5hbCkpO1xuICBjb25zdCBhZGRlZCA9IFtdO1xuICBjb25zdCByZW1vdmVkID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gYWxsS2V5c1tpXTtcbiAgICBjb25zdCBbX2RpZmZJZHgsIGRpZmZJZF0gPSBnZXRSb3coZGlmZiwga2V5KSB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGNvbnN0IFtfb3JpZ0lkeCwgb3JpZ0lkXSA9IGdldFJvdyhvcmlnaW5hbCwga2V5KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgaWYgKGRpZmZJZCAhPT0gb3JpZ0lkKSB7XG4gICAgICBpZiAoZGlmZklkKSBhZGRlZC5wdXNoKGRpZmZJZCk7XG4gICAgICBpZiAob3JpZ0lkKSByZW1vdmVkLnB1c2gob3JpZ0lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2FkZGVkLCByZW1vdmVkXTtcbn07XG5cbmNvbnN0IHVuaW9uUm93cyA9IFIuY29tcG9zZShcbiAgUi51bmlxQnkoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5yZWR1Y2UoUi5jb25jYXQsIFtdKSxcbiAgUi5tYXAocm93cylcbik7XG5cbmNvbnN0IHJvd3NGcm9tU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzKSA9PlxuICBQcm9taXNlLmFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSkudGhlbih1bmlvblJvd3MpXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyIH0gPSBvcHRzIHx8IHt9O1xuXG4gIGNvbnNvbGUubG9nKFwiTGlzdGluZ05vZGUucmVhZFwiLCBwYXRoKTtcblxuICByZXR1cm4gcm93c0Zyb21Tb3VscyhzY29wZSwgW3NvdWxGcm9tUGF0aChpbmRleGVyLCBwYXRoKV0pLnRoZW4ocm93c1RvSWRzKTtcbn0sIFwibGlzdGluZ1Jvd3NcIik7XG5cbmNvbnN0IGdldCA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IChzb3VsID8gc2NvcGUuZ2V0KHNvdWwpIDogcmVzb2x2ZShudWxsKSksXG4gIFwibGlzdGluZ1wiXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ05vZGUgPSB7XG4gIFBPU19JRFgsXG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc291cmNlLFxuICBnZXQsXG4gIGdldFJvdyxcbiAgaXRlbUtleXMsXG4gIHNlcmlhbGl6ZSxcbiAgcm93cyxcbiAgaWRzLFxuICBpZFRvU291bCxcbiAgaWRzVG9Tb3VscyxcbiAgc291bFRvSWQsXG4gIHNvdWxzVG9JZHMsXG4gIHJvd3NUb0lkcyxcbiAgcm93c1RvSXRlbXMsXG4gIGl0ZW1zVG9Sb3dzLFxuICBzb3J0Um93cyxcbiAgc29ydGVkSWRzLFxuICBzb3VsRnJvbVBhdGgsXG4gIHBhdGhGcm9tU291bCxcbiAgcm93c0Zyb21Tb3VscyxcbiAgcmVhZCxcbiAgZGlmZixcbiAgY2F0ZWdvcml6ZURpZmYsXG4gIHVuaW9uUm93c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IHVwZGF0ZUxpc3RpbmcgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHNjb3BlLFxuICBzcGVjLFxuICBpZHMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW11cbikgPT4ge1xuICBpZiAoIWlkcy5sZW5ndGggJiYgIXJlbW92ZUlkcy5sZW5ndGgpIHJldHVybjtcbiAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IGF3YWl0IExpc3RpbmdTb3J0LnRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYyk7XG4gIGNvbnN0IGNoYW5nZXMgPSBhd2FpdCBMaXN0aW5nTm9kZS5kaWZmKGV4aXN0aW5nLCB1cGRhdGVkSXRlbXMsIHJlbW92ZUlkcyk7XG5cbiAgaWYgKGNoYW5nZXMpIGNvbnNvbGUubG9nKFwiQ0hBTkdFU1wiLCByb3V0ZS5zb3VsLCBjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXMpIHJvdXRlLndyaXRlKGNoYW5nZXMpO1xufTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyBzb3VsLCB1cGRhdGVkU291bCwgZGlmZiwgLi4ucHJvcHMgfSkgPT4ge1xuICBsZXQgdXBkYXRlZElkcyA9IFtdO1xuXG4gIGNvbnNvbGUubG9nKFwib25QdXRcIiwgc291bCwgdXBkYXRlZFNvdWwpO1xuICBjb25zdCBwYXRoID0gTGlzdGluZ05vZGUucGF0aEZyb21Tb3VsKHNvdWwpO1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuICBjb25zdCBzcGVjID0gYXdhaXQgTGlzdGluZ1R5cGUuc3BlY0Zyb21QYXRoKHNjb3BlLCBwYXRoKTtcblxuICBjb25zb2xlLmxvZyhcInBhdGhcIiwgcGF0aCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGlzU3RpY2t5ID0gUi5lcXVhbHMocm91dGUubWF0Y2gudGhpbmdJZCB8fCBudWxsKTtcblxuICBpZiAodGhpbmdJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICB1cGRhdGVkSWRzID0gUi5jb25jYXQodXBkYXRlZElkcywgVGhpbmdTZXQuaWRzKEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpKSk7XG5cbiAgYXdhaXQgdXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10sIGlzU3RpY2t5KTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdPcmFjbGUgPSB7XG4gIHVwZGF0ZUxpc3RpbmcsXG4gIG9uUHV0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuY29uc3QgY2FsY3VsYXRlUm93cyA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHN0aWNreUl0ZW1zID0gUi5tYXAoaWQgPT4gW2lkLCAtSW5maW5pdHldLCBzcGVjLnN0aWNreUlkcyk7XG5cbiAgaWYgKCFzcGVjLmRhdGFTb3VyY2UucXVlcnkpIHJldHVybiByZXNvbHZlKFtdKTtcbiAgcmV0dXJuIHNwZWMuZGF0YVNvdXJjZS5xdWVyeShzY29wZSkudGhlbihpdGVtcyA9PiB7XG4gICAgY29uc3Qgcm93cyA9IExpc3RpbmdOb2RlLml0ZW1zVG9Sb3dzKFsuLi5zdGlja3lJdGVtcywgLi4uaXRlbXNdKTtcblxuICAgIHJldHVybiBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkUm93cyhzY29wZSwgc3BlYywgcm93cywge1xuICAgICAgLi4ub3B0cyxcbiAgICAgIGZpbHRlckZuXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmNvbnN0IGNhbGN1bGF0ZSA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7fSk7XG5cbmNvbnN0IHRvTm9kZSA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cykgPT5cbiAgY2FsY3VsYXRlUm93cyhzY29wZSwgc3BlYywgb3B0cykudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBMaXN0aW5nTm9kZS5zZXJpYWxpemUoc3BlYyksXG4gICAgICBMaXN0aW5nTm9kZS5yb3dzVG9JdGVtc1xuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVhZCA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHBhdGhzID0gUi5wYXRoT3IoW10sIFtcImRhdGFTb3VyY2VcIiwgXCJsaXN0aW5nUGF0aHNcIl0sIHNwZWMpO1xuICBjb25zdCBzdGlja3lSb3dzID0gUi5tYXAoaWQgPT4gWy0xLCBpZCwgLUluZmluaXR5XSwgc3BlYy5zdGlja3lJZHMpO1xuICBjb25zdCBzb3VscyA9IFIubWFwKFxuICAgIExpc3RpbmdOb2RlLnNvdWxGcm9tUGF0aChvcHRzLmluZGV4ZXIgfHwgc3BlYy5pbmRleGVyKSxcbiAgICBwYXRoc1xuICApO1xuXG4gIHJldHVybiBMaXN0aW5nTm9kZS5yb3dzRnJvbVNvdWxzKHNjb3BlLCBzb3VscykudGhlbihyb3dzID0+XG4gICAgTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZElkcyhzY29wZSwgc3BlYywgWy4uLnN0aWNreVJvd3MsIC4uLnJvd3NdLCB7XG4gICAgICAuLi5vcHRzLFxuICAgICAgZmlsdGVyRm5cbiAgICB9KVxuICApO1xufSk7XG5cbmNvbnN0IGZyb21TcGVjID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+XG4gIChvcHRzLmNhbGN1bGF0ZSA/IGNhbGN1bGF0ZSA6IHJlYWQpKHNjb3BlLCBzcGVjLCBvcHRzKVxuKTtcblxuY29uc3QgZnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgdHlwZSA9IExpc3RpbmdUeXBlLmZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oc3BlYyA9PiB7XG4gICAgaWYgKHNwZWMuaGFzSW5kZXhlciAmJiAhb3B0cy5jYWxjdWxhdGUpIHtcbiAgICAgIGlmICghdHlwZSB8fCAhdHlwZS5yZWFkKSByZXR1cm4gTGlzdGluZ05vZGUucmVhZChzY29wZSwgcGF0aCwgb3B0cyk7XG4gICAgICByZXR1cm4gdHlwZS5yZWFkKHNjb3BlLCB0eXBlLm1hdGNoLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyb21TcGVjKHNjb3BlLCBzcGVjLCBvcHRzKTtcbiAgfSk7XG59KTtcblxuY29uc3Qgbm9kZUZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PlxuICBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgpLnRoZW4oc3BlYyA9PiB0b05vZGUoc2NvcGUsIHNwZWMsIFIubWVyZ2VMZWZ0KG9wdHMsIHsgbGltaXQ6IDEwMDAgfSkpKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdRdWVyeSA9IHtcbiAgZnJvbVNwZWMsXG4gIGZyb21QYXRoLFxuICBjYWxjdWxhdGVSb3dzLFxuICB0b05vZGUsXG4gIG5vZGVGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgYWxsLCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5cbmNvbnN0IFtQT1NfSUQsIFBPU19WQUxdID0gWzAsIDFdO1xuY29uc3QgdG9JZHMgPSBSLm1hcChSLnByb3AoUE9TX0lEKSk7XG5jb25zdCBzb3J0SXRlbXMgPSBSLnNvcnRCeShSLnByb3AoUE9TX1ZBTCkpO1xuXG5jb25zdCB2b3RlU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT4ge1xuICBpZiAoc3BlYy5pc0lkU3RpY2t5KHRoaW5nSWQpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuICBpZiAoUi5jb250YWlucyh0aGluZ0lkLCBzcGVjLmZpbHRlcnMuYWxsb3cub3BzKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcblxuICByZXR1cm4gUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICBzY29yZXM6IHRydWUsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihyZXMgPT4gZm4ocmVzLCBzcGVjKSk7XG59KTtcblxuY29uc3QgdGltZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihmbilcbik7XG5cbmNvbnN0IHNvcnRzID0ge1xuICBuZXc6IHRpbWVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubXVsdGlwbHkoLTEpLFxuICAgICAgdmFsID0+IHZhbCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIFIucHJvcChcInRpbWVzdGFtcFwiKVxuICAgIClcbiAgKSxcbiAgb2xkOiB0aW1lU29ydChSLnByb3AoXCJ0aW1lc3RhbXBcIikpLFxuICBhY3RpdmU6IHZvdGVTb3J0KFxuICAgICh7IHRpbWVzdGFtcCwgbGFzdEFjdGl2ZSB9KSA9PiAtMSAqIChsYXN0QWN0aXZlIHx8IHRpbWVzdGFtcClcbiAgKSxcbiAgdG9wOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VJbnQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSlcbiAgICApXG4gICksXG4gIGNvbW1lbnRzOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VGbG9hdCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0pXG4gICAgKVxuICApLFxuICBkaXNjdXNzZWQ6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuXG4gICAgaWYgKCFzY29yZSkgcmV0dXJuIDEwMDAwMDAwMDAgLSBzZWNvbmRzO1xuICAgIHJldHVybiAtMSAqIChvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBob3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcbiAgICBsZXQgc2lnbiA9IDA7XG5cbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICBzaWduID0gMTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlIDwgMCkge1xuICAgICAgc2lnbiA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gLTEgKiAoc2lnbiAqIG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGJlc3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgbiA9IHVwcyArIGRvd25zO1xuXG4gICAgaWYgKG4gPT09IDApIHJldHVybiAwO1xuICAgIGNvbnN0IHogPSAxLjI4MTU1MTU2NTU0NTsgLy8gODAlIGNvbmZpZGVuY2VcbiAgICBjb25zdCBwID0gdXBzIC8gbjtcbiAgICBjb25zdCBsZWZ0ID0gcCArICgxIC8gKDIgKiBuKSkgKiB6ICogejtcbiAgICBjb25zdCByaWdodCA9IHogKiBNYXRoLnNxcnQoKHAgKiAoMSAtIHApKSAvIG4gKyAoeiAqIHopIC8gKDQgKiBuICogbikpO1xuICAgIGNvbnN0IHVuZGVyID0gMSArICgxIC8gbikgKiB6ICogejtcblxuICAgIHJldHVybiAtMSAqICgobGVmdCAtIHJpZ2h0KSAvIHVuZGVyKTtcbiAgfSksXG4gIGNvbnRyb3ZlcnNpYWw6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG5cbiAgICBpZiAodXBzIDw9IDAgfHwgZG93bnMgPD0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbWFnbml0dWRlID0gdXBzICsgZG93bnM7XG4gICAgY29uc3QgYmFsYW5jZSA9IHVwcyA+IGRvd25zID8gZG93bnMgLyB1cHMgOiB1cHMgLyBkb3ducztcblxuICAgIHJldHVybiAtMSAqIG1hZ25pdHVkZSAqKiBiYWxhbmNlO1xuICB9KVxufTtcblxuY29uc3QgaXNWYWxpZFNvcnQgPSBzb3J0ID0+ICEhc29ydHNbc29ydF07XG5cbmNvbnN0IHRvSXRlbSA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkLCBzcGVjKSA9PlxuICAgIChzb3J0c1tzcGVjLnNvcnRdIHx8IHNvcnRzLm5ldykoc2NvcGUsIGlkLCBzcGVjKS50aGVuKHZhbCA9PiBbaWQsIHZhbF0pXG4pO1xuXG5jb25zdCBpdGVtRnJvbVNvdWwgPSAoc2NvcGUsIHNvdWwsIHNwZWMpID0+IHRvSXRlbShzY29wZSwgTGlzdGluZ05vZGUuc291bFRvSWQoc291bCksIHNwZWMpO1xuXG5jb25zdCB0b0l0ZW1zID0gcXVlcnkoXG4gIChzY29wZSwgaWRzLCBzcGVjKSA9PiBhbGwoUi5tYXAoXG4gICAgaWQgPT4gdG9JdGVtKHNjb3BlLCBpZCwgc3BlYyksXG4gICAgaWRzXG4gICkpXG4pO1xuXG5jb25zdCBmcm9tVGhpbmdTZXRzID0gcXVlcnkoXG4gIChzY29wZSwgc291bHMsIHNwZWMpID0+XG4gICAgYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgICAgLnRoZW4oUi5waXBlKFxuICAgICAgICBUaGluZ1NldC51bmlvbixcbiAgICAgICAgVGhpbmdTZXQuaWRzLFxuICAgICAgICBpZHMgPT4gdG9JdGVtcyhzY29wZSwgaWRzLCBzcGVjKVxuICAgICAgKSlcbiAgICAgIC50aGVuKHNvcnRJdGVtcylcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU29ydCA9IHtcbiAgUE9TX0lELFxuICBQT1NfVkFMLFxuICBzb3J0cyxcbiAgaXNWYWxpZFNvcnQsXG4gIHRvSXRlbSxcbiAgdG9JdGVtcyxcbiAgdG9JZHMsXG4gIGl0ZW1Gcm9tU291bCxcbiAgc29ydEl0ZW1zLFxuICBmcm9tVGhpbmdTZXRzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmltcG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSBSLmNvbXBvc2UoXG4gIFIuYXBwbHkoUi5tZXJnZUxlZnQpLFxuICBSLmFwKFtMaXN0aW5nRmlsdGVyLmZyb21EZWZpbml0aW9uLCBSLmlkZW50aXR5XSksXG4gIFIub2YsXG4gIFIuYXBwbHkoUi5hc3NvYyhcImRhdGFTb3VyY2VcIikpLFxuICBSLmFwKFtMaXN0aW5nRGF0YVNvdXJjZS5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBMaXN0aW5nRGVmaW5pdGlvbi5mcm9tU291cmNlXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSA9IFwiXCIpID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSlcbiAgICAudGhlbihSLmNvbXBvc2UoXG4gICAgICBib2R5ID0+IGAke2JvZHl9XG4jIGFkZGVkIGJ5IGluZGV4ZXJcbiR7ZXh0cmEgfHwgXCJcIn1cbnNvdXJjZWQgZnJvbSBwYWdlICR7YXV0aG9ySWR9ICR7bmFtZX1cbmAsXG4gICAgICBUaGluZ0RhdGFOb2RlLmJvZHlcbiAgICApKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTcGVjID0geyBmcm9tU291cmNlLCBnZXRTb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljL2NoYXRcIjtcbmNvbnN0IHRhYnMgPSBbIC4uLlRvcGljTGlzdGluZy50YWJzLCBcImNoYXRcIiBdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNoYXQ6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3Qgbm9ybWFsVG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCBgY2hhdDoke3RvcGljfWBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y2hhdFwiLFxuICAgIFtcbiAgICAgIFwic29ydCBuZXdcIixcbiAgICAgIFwiZGlzcGxheSBhcyBjaGF0XCIsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgQ2hhdExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90aGluZ3MvOnRoaW5nSWQvY29tbWVudHMvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNvbW1lbnRzOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0aGluZ0lkLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y29tbWVudHNcIixcbiAgICBbYG9wICR7dGhpbmdJZH1gLCBgc29ydCAke3NvcnR9YF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvY29tbWVudGVkLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjb21tZW50ZWQ6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y29tbWVudGVkXCIsXG4gICAgW1xuICAgICAgYGN1cmF0b3IgJHthdXRob3JJZH1gLFxuICAgICAgYHNvcnQgJHtzb3J0fWBcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ZWRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTaWRlYmFyLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG5cbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi9kb21haW4vOmRvbWFpbi86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIl07XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpkb21haW46c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiwgc29ydCB9KSA9PiB7XG4gIGNvbnN0IGRvbWFpbnMgPSBQYXRoLnNwbGl0VG9waWNzKGRvbWFpbik7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6ZG9tYWluXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHtkb21haW5zWzBdfWAsXG4gICAgICBcInN1Ym1pdCB0byB3aGF0ZXZlclwiLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICBcImtpbmQgc3VibWlzc2lvblwiLFxuICAgICAgLi4uUi5tYXAoZG9tYWluID0+IGBkb21haW4gJHtkb21haW59YCwgZG9tYWlucyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL2RvbWFpbi8ke2RvbWFpbn0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IERvbWFpbkxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIHRhYnMsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi8uLi9RdWVyeVwiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy9maXJlaG9zZVwiO1xuY29uc3QgdGFicyA9IFRvcGljTGlzdGluZy50YWJzO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6ZmlyZWhvc2U6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3Qgbm9ybWFsVG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCB0b3BpYywgYGNoYXQ6JHt0b3BpY31gLCBgY29tbWVudHM6JHt0b3BpY31gXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmZpcmVob3NlXCIsXG4gICAgW1xuICAgICAgXCJzb3J0IG5ld1wiLFxuICAgICAgXCJkaXNwbGF5IGFzIGNoYXRcIixcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBGaXJlaG9zZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHRhYnMsXG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uLy4uL1RoaW5nXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9yZXBsaWVkLzp0eXBlLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzp0b3BpYzpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgPSBcIm5ld1wiIH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6aW5ib3hcIixcbiAgICBbYHJlcGxpZXMgdG8gYXV0aG9yICR7YXV0aG9ySWR9YCwgYHR5cGUgJHt0eXBlfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChvcmMsIHJvdXRlLCB7IHVwZGF0ZWRTb3VsLCBkaWZmIH0pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRBdXRob3JlZF0gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihkaWZmRGF0YSk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGxldCB1cGRhdGVkSWRzID0gVGhpbmdTZXQuaWRzKGRpZmZEYXRhKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRBdXRob3JlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wSWQgPSB1cGRhdGVkQXV0aG9yZWRbaV07XG4gICAgY29uc3QgcmVwbHlJZHMgPSBUaGluZ1NldC5pZHMoXG4gICAgICBhd2FpdCBzY29wZVxuICAgICAgICAuZ2V0KFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcElkIH0pKVxuICAgICAgICAudGhlbigpXG4gICAgKTtcblxuICAgIHVwZGF0ZWRJZHMgPSB1cGRhdGVkSWRzLmNvbmNhdChyZXBseUlkcyk7XG4gIH1cblxuICBpZiAodXBkYXRlZElkcy5sZW5ndGgpXG4gICAgYXdhaXQgTGlzdGluZ09yYWNsZS51cGRhdGVMaXN0aW5nKG9yYywgcm91dGUsIHNjb3BlLCBzcGVjLCB1cGRhdGVkSWRzLCBbXSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBJbmJveExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlYyxcbiAgb25QdXRcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wib3ZlcnZpZXdcIiwgXCJjb21tZW50c1wiLCBcInN1Ym1pdHRlZFwiLCBcImNvbW1hbmRzXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6cHJvZmlsZTpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpwcm9maWxlXCIsXG4gICAgW1xuICAgICAgYGF1dGhvciAke2F1dGhvcklkfWAsXG4gICAgICBgdHlwZSAke3R5cGV9YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC91c2VyLyR7YXV0aG9ySWR9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBRdWVyeS51c2VyTWV0YShzY29wZSwgbWF0Y2guYXV0aG9ySWQpLnRoZW4obWV0YSA9PlxuICAgIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oUi5waXBlKFxuICAgICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSxcbiAgICAgIFIubWVyZ2VMZWZ0KHtcbiAgICAgICAgcHJvZmlsZUlkOiBtYXRjaC5hdXRob3JJZCxcbiAgICAgICAgZGlzcGxheU5hbWU6IFIucHJvcE9yKFwiXCIsIFwiYWxpYXNcIiwgbWV0YSlcbiAgICAgIH0pXG4gICAgKSlcbikpO1xuXG5leHBvcnQgY29uc3QgUHJvZmlsZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIHRhYnMsXG4gIGdldFNpZGViYXIsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4uL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4uL0xpc3RpbmdPcmFjbGVcIjtcbmltcG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuLi9TcGFjZVNwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL3NwYWNlcy86bmFtZS86c29ydFwiO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGBzb3J0ICR7c29ydH1gKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBTcGFjZVNwZWMuZ2V0U3BlYyhzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGBzb3J0ICR7c29ydH1gKVxuKTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIFNwYWNlU3BlYy5zaWRlYmFyUGFnZU5hbWUobmFtZSkpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiwgb3JpZ2luYWwsIGxhdGVzdCA9IDAgfVxuKSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG5cbiAgY29uc3Qgb3JpZ2luYWxEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEob3JpZ2luYWwpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZElkcywgcmVtb3ZlZElkc10gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihcbiAgICBkaWZmRGF0YSxcbiAgICBvcmlnaW5hbERhdGFcbiAgKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgY29uc3Qgdm90ZUNvdW50c01hdGNoID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG4gIGNvbnN0IHRoaW5nTWF0Y2ggPSBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUubWF0Y2godXBkYXRlZFNvdWwpIHx8IHt9O1xuICBjb25zdCBhdXRob3JNYXRjaCA9IFNjaGVtYS5TRUFBdXRob3Iucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuXG4gIGlmICh2b3RlQ291bnRzTWF0Y2gpIHVwZGF0ZWRJZHMucHVzaCh2b3RlQ291bnRzTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ01hdGNoKSB1cGRhdGVkSWRzLnB1c2godGhpbmdNYXRjaC50aGluZ0lkKTtcbiAgaWYgKHRoaW5nSWQgJiYgdGhpbmdJZCAhPT0gc3BlYy5mcm9tUGFnZUlkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhcbiAgICBvcmMsXG4gICAgcm91dGUsXG4gICAgc2NvcGUsXG4gICAgc3BlYyxcbiAgICB1cGRhdGVkSWRzLFxuICAgIHJlbW92ZWRJZHNcbiAgKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xuICBpZiAoXG4gICAgUi5wcm9wKFwic2l6ZVwiLCBvcmlnaW5hbCkgfHxcbiAgICB1cGRhdGVkSWRzLmxlbmd0aCB8fFxuICAgIHJlbW92ZWRJZHMubGVuZ3RoIHx8XG4gICAgYXV0aG9yTWF0Y2hcbiAgKVxuICAgIHJldHVybjtcblxuICAvLyBiYXNlIGxvZ2ljIGZyb20gZ3VuLWNsZXJpYy1zY29wZSBuZWVkcyB0byBiZSBlbmNhcHN1YWx0ZWQgYmV0dGVyP1xuICBjb25zb2xlLmxvZyhcIi0tLVNUQU5EQVJEIFNQQUNFIFVQREFURS0tLVwiLCByb3V0ZS5zb3VsLCB1cGRhdGVkU291bCk7XG4gIGNvbnN0IG5vZGUgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IGV4aXN0aW5nS2V5cyA9IExpc3RpbmdOb2RlLml0ZW1LZXlzKG5vZGUpO1xuXG4gIGlmIChleGlzdGluZ0tleXMubGVuZ3RoKSB7XG4gICAgcm91dGUud3JpdGUoe1xuICAgICAgc2l6ZTogMCxcbiAgICAgIC4uLmV4aXN0aW5nS2V5cy5yZWR1Y2UoKGRpZmYsIGtleSkgPT4ge1xuICAgICAgICBkaWZmW2Ake2tleX1gXSA9IG51bGw7XG4gICAgICAgIHJldHVybiBkaWZmO1xuICAgICAgfSwge30pXG4gICAgfSk7XG4gIH1cblxuICBvcmMud29yayh7XG4gICAgaWQ6IGB1cGRhdGU6JHtyb3V0ZS5zb3VsfWAsXG4gICAgc291bDogcm91dGUuc291bCxcbiAgICBtZXRob2Q6IFwiZG9VcGRhdGVcIixcbiAgICBwcmlvcml0eTogcm91dGUucHJpb3JpdHkgfHwgNTBcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgU3BhY2VMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICBwYXRoLFxuICBnZXRTb3VyY2UsXG4gIGdldFNpZGViYXIsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIiwgXCJmaXJlaG9zZVwiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnRvcGljOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IHRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljc1swXSA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IHRvcGljc1swXTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzp0b3BpY1wiLFxuICAgIFtcbiAgICAgIGBuYW1lICR7dG9waWN9YCxcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICB0b3BpYy5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBcImtpbmQgc3VibWlzc2lvblwiIDogXCJcIixcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihcbiAgICBSLnBpcGUoXG4gICAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlLFxuICAgICAgUi5hc3NvYyhcImJhc2VQYXRoXCIsIGAvdC8ke21hdGNoLnRvcGljfWApXG4gICAgKVxuICApXG4pO1xuXG5leHBvcnQgY29uc3QgVG9waWNMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoe1xuICB0YWJzLFxuICBwYXRoLFxuICBnZXRTaWRlYmFyLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ2hhdExpc3RpbmcgfSBmcm9tIFwiLi9DaGF0TGlzdGluZ1wiO1xuaW1wb3J0IHsgRmlyZWhvc2VMaXN0aW5nIH0gZnJvbSBcIi4vRmlyZWhvc2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBDb21tZW50ZWRMaXN0aW5nIH0gZnJvbSBcIi4vQ29tbWVudGVkTGlzdGluZ1wiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5pbXBvcnQgeyBEb21haW5MaXN0aW5nIH0gZnJvbSBcIi4vRG9tYWluTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50TGlzdGluZ1wiO1xuaW1wb3J0IHsgU3BhY2VMaXN0aW5nIH0gZnJvbSBcIi4vU3BhY2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBJbmJveExpc3RpbmcgfSBmcm9tIFwiLi9JbmJveExpc3RpbmdcIjtcbmltcG9ydCB7IFByb2ZpbGVMaXN0aW5nIH0gZnJvbSBcIi4vUHJvZmlsZUxpc3RpbmdcIjtcblxuY29uc3QgdHlwZXMgPSB7XG4gIENoYXRMaXN0aW5nLFxuICBGaXJlaG9zZUxpc3RpbmcsXG4gIFRvcGljTGlzdGluZyxcbiAgRG9tYWluTGlzdGluZyxcbiAgQ29tbWVudExpc3RpbmcsXG4gIFNwYWNlTGlzdGluZyxcbiAgSW5ib3hMaXN0aW5nLFxuICBDb21tZW50ZWRMaXN0aW5nLFxuICBQcm9maWxlTGlzdGluZ1xufTtcblxuY29uc3QgdHlwZXNBcnJheSA9IFIudmFsdWVzKHR5cGVzKTtcblxuY29uc3QgZnJvbVBhdGggPSBwYXRoID0+IHtcbiAgbGV0IG1hdGNoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIG1hdGNoID0gdHlwZXNBcnJheVtpXS5yb3V0ZS5tYXRjaChwYXRoKTtcbiAgICBpZiAobWF0Y2gpIHJldHVybiBSLmFzc29jKFwibWF0Y2hcIiwgbWF0Y2gsIHR5cGVzQXJyYXlbaV0pO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3Qgc2lkZWJhckZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBmcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUgfHwgIXR5cGUuZ2V0U2lkZWJhcikgcmV0dXJuIHJlc29sdmUoXCJcIik7XG4gIHJldHVybiB0eXBlLmdldFNpZGViYXIoc2NvcGUsIHR5cGUubWF0Y2gpO1xufSk7XG5cbmNvbnN0IHNwZWNGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCkgPT4ge1xuICBjb25zdCB0eXBlID0gZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlKSB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGZpbmQgdHlwZSBmb3IgcGF0aDogJHtwYXRofWApO1xuXG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oYmFzZVNwZWMgPT4ge1xuICAgIGxldCBzcGVjID0gYmFzZVNwZWM7XG5cbiAgICBpZiAodHlwZS5tYXRjaC5zb3J0ID09PSBcImRlZmF1bHRcIikge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJwYXRoXCIsIHR5cGUucm91dGUucmV2ZXJzZShSLmFzc29jKFwic29ydFwiLCBzcGVjLnNvcnQsIHR5cGUubWF0Y2gpKSwgc3BlYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwZWMgPSBSLmFzc29jKFwicGF0aFwiLCBwYXRoLCBiYXNlU3BlYyk7XG4gICAgfVxuXG4gICAgaWYgKHNwZWMuc3VibWl0VG9waWMgJiYgIXNwZWMuc3VibWl0UGF0aCkge1xuICAgICAgc3BlYyA9IFIuYXNzb2MoXCJzdWJtaXRQYXRoXCIsIGAvdC8ke3NwZWMuc3VibWl0VG9waWN9L3N1Ym1pdGAsIHNwZWMpO1xuICAgIH1cblxuICAgIHJldHVybiBzcGVjO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1R5cGUgPSB7XG4gIC4uLnR5cGVzLFxuICB0eXBlcyxcbiAgZnJvbVBhdGgsXG4gIHNpZGViYXJGcm9tUGF0aCxcbiAgc3BlY0Zyb21QYXRoXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5cbmNvbnN0IHNwbGl0RG9tYWlucyA9IFIuY29tcG9zZShcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICBSLm1hcChSLnRyaW0pLFxuICBSLnNwbGl0KFwiK1wiKSxcbiAgUi50b0xvd2VyLFxuICBSLnRyaW0sXG4gIFIuZGVmYXVsdFRvKFwiXCIpXG4pO1xuXG5jb25zdCBzcGxpdFRvcGljcyA9IFIuY29tcG9zZShcbiAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmlkZW50aXR5LCBSLmFsd2F5cyhbXCJhbGxcIl0pKSxcbiAgc3BsaXREb21haW5zXG4pO1xuXG5jb25zdCB3aXRoUm91dGUgPSBvYmogPT4gUi5hc3NvYyhcInJvdXRlXCIsIG5ldyBSb3V0ZShvYmoucGF0aCksIG9iaik7XG5cbmV4cG9ydCBjb25zdCBQYXRoID0geyBzcGxpdERvbWFpbnMsIHNwbGl0VG9waWNzLCB3aXRoUm91dGUgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuY29uc3QgY29uZmlnUGFnZU5hbWUgPSBuYW1lID0+IGBzcGFjZToke25hbWV9YDtcbmNvbnN0IHNpZGViYXJQYWdlTmFtZSA9IG5hbWUgPT4gYHNwYWNlOiR7bmFtZX06c2lkZWJhcmA7XG5cbmNvbnN0IHNvdXJjZVdpdGhEZWZhdWx0cyA9IFIuY3VycnkoKG93bmVySWQsIG5hbWUsIHNvdXJjZSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW3NvdXJjZSB8fCBcIlwiXTtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG5cbiAgaWYgKCF0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJcIikpIHtcbiAgICB0YWJzLm1hcCh0YWIgPT5cbiAgICAgIHJlc3VsdC5wdXNoKGB0YWIgJHt0YWJ9IC91c2VyLyR7b3duZXJJZH0vc3BhY2VzLyR7bmFtZX0vJHt0YWJ9YClcbiAgICApO1xuICB9XG5cbiAgbGV0IGluZGV4ZXIgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJpbmRleGVyXCIpO1xuXG4gIGlmICghaW5kZXhlcikge1xuICAgIHJlc3VsdC5wdXNoKGBpbmRleGVyICR7Q29uZmlnLmluZGV4ZXJ9YCk7XG4gICAgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyO1xuICB9XG5cbiAgbGV0IHRhYnVsYXRvciA9IHRva2VuaXplZC5nZXRWYWx1ZShcInRhYnVsYXRvclwiKTtcblxuICBpZiAoIXRhYnVsYXRvcikgcmVzdWx0LnB1c2goYHRhYnVsYXRvciAke2luZGV4ZXJ9YCk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKFwiXFxuXCIpO1xufSk7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBjb25maWdQYWdlTmFtZShuYW1lKSwgZXh0cmEpLnRoZW4oXG4gICAgc291cmNlV2l0aERlZmF1bHRzKGF1dGhvcklkLCBuYW1lKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpID0+XG4gIGdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKS50aGVuKHNvdXJjZSA9PlxuICAgIExpc3RpbmdTcGVjLmZyb21Tb3VyY2Uoc291cmNlLCBhdXRob3JJZCwgbmFtZSlcbiAgKVxuKTtcblxuY29uc3Qgbm9kZVRvU3BhY2VOYW1lcyA9IFIuY29tcG9zZShcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIubWFwKFIucmVwbGFjZSgvXnNwYWNlOi8sIFwiXCIpKSxcbiAgUi5maWx0ZXIoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5wcm9wKFwibGVuZ3RoXCIpLFxuICAgICAgUi5tYXRjaCgvXnNwYWNlOlteOl0qJC8pXG4gICAgKVxuICApLFxuICBSLmtleXNcbik7XG5cbmNvbnN0IHVzZXJTcGFjZU5hbWVzID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCkgPT5cbiAgUXVlcnkudXNlclBhZ2VzKHNjb3BlLCBhdXRob3JJZCkudGhlbihub2RlVG9TcGFjZU5hbWVzKVxuKTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlU3BlYyA9IHtcbiAgY29uZmlnUGFnZU5hbWUsXG4gIHNpZGViYXJQYWdlTmFtZSxcbiAgbm9kZVRvU3BhY2VOYW1lcyxcbiAgdXNlclNwYWNlTmFtZXMsXG4gIHRhYnMsXG4gIGdldFNvdXJjZSxcbiAgZ2V0U3BlY1xufTtcbiIsImltcG9ydCB7IExpc3RpbmdRdWVyeSB9IGZyb20gXCIuL0xpc3RpbmdRdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuaW1wb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuXG5leHBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5leHBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5leHBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuZXhwb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuZXhwb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuL0xpc3RpbmdPcmFjbGVcIjtcbmV4cG9ydCB7IExpc3RpbmdRdWVyeSB9IGZyb20gXCIuL0xpc3RpbmdRdWVyeVwiO1xuZXhwb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuZXhwb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuZXhwb3J0IHsgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nVHlwZVwiO1xuZXhwb3J0IHsgU3BhY2VTcGVjIH0gZnJvbSBcIi4vU3BhY2VTcGVjXCI7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nID0ge1xuICAuLi5MaXN0aW5nVHlwZS50eXBlcyxcbiAgTGlzdGluZ05vZGUsXG4gIExpc3RpbmdTcGVjLFxuICBpc1ZhbGlkU29ydDogTGlzdGluZ1NvcnQuaXNWYWxpZFNvcnQsXG4gIGlkc1RvU291bHM6IExpc3RpbmdOb2RlLmlkc1RvU291bHMsXG4gIGdldDogTGlzdGluZ05vZGUuZ2V0LFxuICBmcm9tU3BlYzogTGlzdGluZ1F1ZXJ5LmZyb21TcGVjLFxuICBmcm9tUGF0aDogTGlzdGluZ1F1ZXJ5LmZyb21QYXRoLFxuICB0eXBlRnJvbVBhdGg6IExpc3RpbmdUeXBlLmZyb21QYXRoLFxuICBzaWRlYmFyRnJvbVBhdGg6IExpc3RpbmdUeXBlLnNpZGViYXJGcm9tUGF0aCxcbiAgc3BlY0Zyb21QYXRoOiBMaXN0aW5nVHlwZS5zcGVjRnJvbVBhdGgsXG4gIG5vZGVGcm9tUGF0aDogTGlzdGluZ1F1ZXJ5Lm5vZGVGcm9tUGF0aFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZywgTGlzdGluZ1R5cGUgfSBmcm9tIFwiLi9MaXN0aW5nXCI7XG5cbmNvbnN0IHByZWxvYWRQYXRoID0gbWF0Y2ggPT4gYXN5bmMgKHNjb3BlLCBwYXRoLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgW3NwZWMsIGlkc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgbWF0Y2guc3BhY2Uoc2NvcGUpLFxuICAgIG1hdGNoLmlkcyhzY29wZSwgcGFyYW1zIHx8IHt9KSxcbiAgICBtYXRjaC5zaWRlYmFyKHNjb3BlKVxuICBdKTtcbiAgY29uc3QgdGhpbmdTb3VscyA9IExpc3RpbmcuaWRzVG9Tb3VscyhpZHMpO1xuICBjb25zdCBbIHRoaW5ncyBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIFF1ZXJ5Lm11bHRpVGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgICB0aGluZ1NvdWxzLFxuICAgICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLFxuICAgICAgc2NvcmVzOiB0cnVlLFxuICAgICAgZGF0YTogdHJ1ZVxuICAgIH0pLFxuICAgIC4uLlIubWFwKFxuICAgICAgaWQgPT4gUXVlcnkudXNlck1ldGEoc2NvcGUsIGlkKSxcbiAgICAgIFIudW5pcShbc3BlYy5pbmRleGVyLCBzcGVjLm93bmVyLCBzcGVjLnRhYnVsYXRvcl0pXG4gICAgKVxuICBdKTtcbiAgY29uc3Qgb3BJZHMgPSBSLmNvbXBvc2UoXG4gICAgUi53aXRob3V0KGlkcyksXG4gICAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gICAgUi51bmlxLFxuICAgIFIubWFwKFIucGF0aE9yKG51bGwsIFtcImRhdGFcIiwgXCJvcElkXCJdKSlcbiAgKSh0aGluZ3MpO1xuXG4gIGlmIChvcElkcy5sZW5ndGgpIHtcbiAgICBjb25zdCBvcFNvdWxzID0gTGlzdGluZy5pZHNUb1NvdWxzKG9wSWRzKTtcblxuICAgIGF3YWl0IFF1ZXJ5Lm11bHRpVGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgICB0aGluZ1NvdWxzOiBvcFNvdWxzLFxuICAgICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvciB8fCBDb25maWcudGFidWxhdG9yLFxuICAgICAgZGF0YTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHNjb3BlLmdldENhY2hlKCk7XG59O1xuXG5jb25zdCB3aWtpUGFnZSA9IFIubWVyZ2VMZWZ0KHtcbiAgd2l0aE1hdGNoOiAoeyBwYXJhbXM6IHsgYXV0aG9ySWQgPSBDb25maWcub3duZXIsIG5hbWUgfSB9KSA9PiAoe1xuICAgIHByZWxvYWQ6IHNjb3BlID0+IFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSlcbiAgfSlcbn0pO1xuXG5jb25zdCB3aXRoTGlzdGluZ01hdGNoID0gUi5jb21wb3NlKFxuICBtYXRjaCA9PiBSLmFzc29jKFwicHJlbG9hZFwiLCBwcmVsb2FkUGF0aChtYXRjaCksIG1hdGNoKSxcbiAgKHBhdGgsIHBhcmFtcykgPT4gKHtcbiAgICBzaWRlYmFyOiBxdWVyeShzY29wZSA9PiBMaXN0aW5nLnNpZGViYXJGcm9tUGF0aChzY29wZSwgcGF0aCksIGBzaWRlYmFyOiR7cGF0aH1gKSxcbiAgICBzcGFjZTogcXVlcnkoc2NvcGUgPT4gTGlzdGluZy5zcGVjRnJvbVBhdGgoc2NvcGUsIHBhdGgsIHBhcmFtcyksIGBzcGVjOiR7cGF0aH1gKSxcbiAgICBpZHM6IHF1ZXJ5KChzY29wZSwgb3B0cyA9IHt9KSA9PlxuICAgICAgTGlzdGluZy5mcm9tUGF0aChzY29wZSwgcGF0aCwgUi5tZXJnZUxlZnQob3B0cywgcGFyYW1zKSksXG4gICAgICBgaWRzOiR7cGF0aH1gXG4gICAgKVxuICB9KVxuKTtcblxuY29uc3QgbGlzdGluZyA9ICh7XG4gIHByZWZpeDogZGVmYXVsdFByZWZpeCA9IFwidFwiLFxuICBpZGVudGlmaWVyOiBkZWZhdWx0SWRlbnRpZmllciA9IFwiYWxsXCIsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJob3RcIixcbiAgLi4ucmVzdFxufSA9IHt9KSA9PiAoe1xuICAuLi5yZXN0LFxuICB3aXRoTWF0Y2g6ICh7XG4gICAgcGFyYW1zOiB7XG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PiB3aXRoTGlzdGluZ01hdGNoKGAvJHtwcmVmaXh9LyR7aWRlbnRpZmllcn0vJHtzb3J0fWAsIHF1ZXJ5KVxufSk7XG5cbmNvbnN0IHRoaW5nQ29tbWVudHMgPSAoe1xuICBwcmVmaXg6IGRlZmF1bHRQcmVmaXggPSBcInRcIixcbiAgaWRlbnRpZmllcjogZGVmYXVsdElkZW50aWZpZXIgPSBcImFsbFwiLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiYmVzdFwiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBwcmVmaXggPSBkZWZhdWx0UHJlZml4LFxuICAgICAgaWRlbnRpZmllciA9IGRlZmF1bHRJZGVudGlmaWVyLFxuICAgICAgc29ydCA9IGRlZmF1bHRTb3J0XG4gICAgfSxcbiAgICBxdWVyeVxuICB9KSA9PlxuICAgIHdpdGhMaXN0aW5nTWF0Y2goXG4gICAgICBMaXN0aW5nVHlwZS5Db21tZW50TGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogb3BJZCxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBSLmFzc29jKFwibGltaXRcIiwgMTAwMCwgcXVlcnkpXG4gICAgKVxufSk7XG5cbmNvbnN0IHNwYWNlTGlzdGluZyA9ICh7XG4gIG5hbWU6IGRlZmF1bHROYW1lID0gXCJkZWZhdWx0XCIsXG4gIGF1dGhvcklkOiBkZWZhdWx0QXV0aG9ySWQsXG4gIHNvcnQ6IGRlZmF1bHRTb3J0ID0gXCJkZWZhdWx0XCIsXG4gIC4uLnJlc3Rcbn0gPSB7fSkgPT4gKHtcbiAgLi4ucmVzdCxcbiAgd2l0aE1hdGNoOiAoe1xuICAgIHBhcmFtczoge1xuICAgICAgYXV0aG9ySWQgPSBkZWZhdWx0QXV0aG9ySWQsXG4gICAgICBuYW1lID0gZGVmYXVsdE5hbWUsXG4gICAgICBzb3J0ID0gZGVmYXVsdFNvcnRcbiAgICB9LFxuICAgIHF1ZXJ5XG4gIH0pID0+XG4gICAgd2l0aExpc3RpbmdNYXRjaChcbiAgICAgIExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgYXV0aG9ySWQ6IGF1dGhvcklkIHx8IENvbmZpZy5vd25lcixcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc29ydFxuICAgICAgfSksXG4gICAgICBxdWVyeVxuICAgIClcbn0pO1xuXG5jb25zdCBzcGFjZVRoaW5nQ29tbWVudHMgPSAoe1xuICBuYW1lOiBkZWZhdWx0TmFtZSA9IFwiZGVmYXVsdFwiLFxuICBhdXRob3JJZDogZGVmYXVsdEF1dGhvcklkLFxuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwiaG90XCIsXG4gIC4uLnJlc3Rcbn0pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9wSWQsXG4gICAgICBhdXRob3JJZCA9IGRlZmF1bHRBdXRob3JJZCxcbiAgICAgIG5hbWUgPSBkZWZhdWx0TmFtZSxcbiAgICAgIHNvcnQgPSBkZWZhdWx0U29ydFxuICAgIH0sXG4gICAgcXVlcnlcbiAgfSkgPT4ge1xuICAgIGNvbnN0IHNwYWNlUGF0aCA9IExpc3RpbmdUeXBlLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiBhdXRob3JJZCB8fCBDb25maWcub3duZXIsXG4gICAgICBuYW1lLFxuICAgICAgc29ydFxuICAgIH0pO1xuICAgIGNvbnN0IGxpc3RpbmdQYXRoID0gTGlzdGluZ1R5cGUuQ29tbWVudExpc3Rpbmcucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBvcElkLFxuICAgICAgc29ydFxuICAgIH0pO1xuXG4gICAgY29uc3QgbWF0Y2ggPSB7XG4gICAgICBzcGFjZTogcXVlcnkoc2NvcGUgPT4gTGlzdGluZy5zcGVjRnJvbVBhdGgoc2NvcGUsIHNwYWNlUGF0aCwgcXVlcnkpLCBgc3BlYzoke3NwYWNlUGF0aH1gKSxcbiAgICAgIGlkczogcXVlcnkoc2NvcGUgPT4gTGlzdGluZy5mcm9tUGF0aChzY29wZSwgbGlzdGluZ1BhdGgsIHF1ZXJ5KSwgbGlzdGluZ1BhdGgpXG4gICAgfTtcblxuICAgIHJldHVybiBSLmFzc29jKFwicHJlbG9hZFwiLCBwcmVsb2FkUGF0aChtYXRjaCksIG1hdGNoKTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb2ZpbGUgPSAoe1xuICBzb3J0OiBkZWZhdWx0U29ydCA9IFwibmV3XCIsXG4gIHR5cGU6IGRlZmF1bHRUeXBlID0gXCJvdmVydmlld1wiLFxuICAuLi5yZXN0XG59ID0ge30pID0+ICh7XG4gIC4uLnJlc3QsXG4gIHdpdGhNYXRjaDogKHtcbiAgICBwYXJhbXM6IHsgYXV0aG9ySWQsIHR5cGUgPSBkZWZhdWx0VHlwZSwgc29ydCA9IGRlZmF1bHRTb3J0IH0sXG4gICAgcXVlcnlcbiAgfSkgPT5cbiAgICB3aXRoTGlzdGluZ01hdGNoKFxuICAgICAgTGlzdGluZ1R5cGUuUHJvZmlsZUxpc3Rpbmcucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pLFxuICAgICAgcXVlcnlcbiAgICApXG59KTtcblxuY29uc3QgaW5ib3ggPSBSLmFsd2F5cyh7fSk7XG5cbmV4cG9ydCBjb25zdCBQYWdlID0ge1xuICB3aXRoTGlzdGluZ01hdGNoLFxuICBwcmVsb2FkUGF0aCxcbiAgd2lraVBhZ2UsXG4gIHRoaW5nQ29tbWVudHMsXG4gIGxpc3RpbmcsXG4gIHNwYWNlTGlzdGluZyxcbiAgc3BhY2VUaGluZ0NvbW1lbnRzLFxuICBwcm9maWxlLFxuICBpbmJveFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi9BdXRoZW50aWNhdGlvblwiO1xuXG5mdW5jdGlvbiBpbml0KEd1biwgY29uZmlnID0ge30pIHtcbiAgY29uc3QgeyBsZWVjaCwgZGlzYWJsZVZhbGlkYXRpb24sIG5vR3VuLCBsb2NhbFN0b3JhZ2UsIHBlcnNpc3QsIC4uLnJlc3QgfSA9XG4gICAgY29uZmlnIHx8IHt9O1xuICBjb25zdCBwZWVyID0geyBjb25maWcgfTtcblxuICBpZiAoIW5vR3VuKSB7XG4gICAgY29uc3QgY2ZnID0geyBsb2NhbFN0b3JhZ2U6ICEhbG9jYWxTdG9yYWdlLCByYWRpc2s6ICEhcGVyc2lzdCwgLi4ucmVzdCB9O1xuXG4gICAgaWYgKHBlcnNpc3QpIGNmZy5sb2NhbFN0b3JhZ2UgPSBmYWxzZTtcbiAgICBpZiAoIWRpc2FibGVWYWxpZGF0aW9uKSBHdW4ub24oXCJvcHRcIiwgVmFsaWRhdGlvbi5ndW5XaXJlSW5wdXQocGVlcikpO1xuICAgIGlmIChjZmcuc3RvcmVGbikgY2ZnLnN0b3JlID0gY2ZnLnN0b3JlRm4oY2ZnKTsgLy8gZm9yIGluZGV4ZWRkYlxuICAgIHBlZXIuZ3VuID0gR3VuKGNmZyk7XG4gICAgaWYgKGNmZy5sb2NhbFN0b3JhZ2UpIHBlZXIuZ3VuLm9uKFwibG9jYWxTdG9yYWdlOmVycm9yXCIsIGEgPT4gYS5yZXRyeSh7fSkpO1xuICAgIGlmIChsZWVjaCkge1xuICAgICAgLypcbiAgICAgIGNvbnN0IHNlbmRMZWVjaCA9ICgpID0+IHBlZXIuZ3VuLl8ub24oXCJvdXRcIiwgeyBsZWVjaDogdHJ1ZSB9KTtcblxuICAgICAgc2VuZExlZWNoKCk7XG4gICAgICAqL1xuICAgIH1cbiAgfVxuXG4gIHBlZXIubmV3U2NvcGUgPSBvcHRzID0+IFF1ZXJ5LmNyZWF0ZVNjb3BlKHBlZXIsIG9wdHMpO1xuICBwZWVyLm9uTG9naW4gPSBBdXRoZW50aWNhdGlvbi5vbkxvZ2luKHBlZXIpO1xuICBwZWVyLnNpZ251cCA9IEF1dGhlbnRpY2F0aW9uLnNpZ251cChwZWVyKTtcbiAgcGVlci5sb2dpbiA9IEF1dGhlbnRpY2F0aW9uLmxvZ2luKHBlZXIpO1xuICBwZWVyLmxvZ291dCA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmxvZ291dChwZWVyKTtcbiAgcGVlci5pc0xvZ2dlZEluID0gKCkgPT4gQXV0aGVudGljYXRpb24uaXNMb2dnZWRJbihwZWVyKTtcbiAgcGVlci5zdWJtaXQgPSBUaGluZy5zdWJtaXQocGVlcik7XG4gIHBlZXIuY29tbWVudCA9IFRoaW5nLmNvbW1lbnQocGVlcik7XG4gIHBlZXIuY2hhdCA9IFRoaW5nLmNoYXQocGVlcik7XG4gIHBlZXIud3JpdGVQYWdlID0gVGhpbmcud3JpdGVQYWdlKHBlZXIpO1xuICBwZWVyLnZvdGUgPSBUaGluZy52b3RlKHBlZXIpO1xuICBwZWVyLnF1ZXJpZXMgPSBRdWVyeTtcbiAgcmV0dXJuIHBlZXI7XG59XG5cbmV4cG9ydCBjb25zdCBQZWVyID0ge1xuICBpbml0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHNjb3BlIGFzIG1ha2VTY29wZSwgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL0NvbmZpZ1wiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZy9MaXN0aW5nTm9kZVwiO1xuXG5jb25zdCBlbXB0eVByb21pc2UgPSByZXNvbHZlKG51bGwpO1xuY29uc3QgdW5pb25BcnJheXMgPSBSLnJlZHVjZShSLnVuaW9uLCBbXSk7XG5cbmNvbnN0IHRvcGljU291bHMgPSBwYXJhbXMgPT4ge1xuICBjb25zdCB7IHRvcGljcyA9IFtcImFsbFwiXSB9ID0gcGFyYW1zIHx8IHt9O1xuICBjb25zdCBkYXlzID0gUi5wcm9wT3IoMzY1LCBcImRheXNcIiwgcGFyYW1zKSB8fCAzNjU7XG4gIGNvbnN0IGRheVN0cmluZ3MgPSBbXTtcbiAgY29uc3Qgb25lRGF5ID0gMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG9uZURheSAqIHBhcnNlSW50KGRheXMsIDEwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBkYXlzICsgMTsgaSsrKVxuICAgIGRheVN0cmluZ3MucHVzaChUaGluZ1NldC5kYXlTdHIoc3RhcnQgKyBpICogb25lRGF5KSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhcbiAgICB0b3BpY3MucmVkdWNlKFxuICAgICAgKHJlc3VsdCwgdG9waWNOYW1lKSA9PlxuICAgICAgICBkYXlTdHJpbmdzLnJlZHVjZSgocmVzLCBkcykgPT4ge1xuICAgICAgICAgIHJlc1tgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvJHt0b3BpY05hbWV9L2RheXMvJHtkc31gXSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSwgcmVzdWx0KSxcbiAgICAgIHt9XG4gICAgKVxuICApO1xufTtcblxuY29uc3Qgc2luZ2xlVG9waWMgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICBjb25zdCB0U291bHMgPSB0b3BpY1NvdWxzKHsgLi4ucGFyYW1zLCB0b3BpY3M6IFtwYXJhbXMudG9waWNdIH0pO1xuICBsZXQgc291bHMgPSBbXTtcbiAgbGV0IGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuXG4gIGlmIChwYXJhbXMuc29ydCA9PT0gXCJuZXdcIikge1xuICAgIGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuICB9IGVsc2Uge1xuICAgIGlmIChwYXJhbXMuc29ydCA9PT0gXCJ0b3BcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICAgIGlmIChwYXJhbXMudG9waWMgPT09IFwiYWxsXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgfVxuXG4gIGNvbnN0IGZldGNoTW9yZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b3BpY1NvdWwgPSB0U291bHMucG9wKCk7XG5cbiAgICBpZiAoc291bHMubGVuZ3RoID4gaXRlbU1heCB8fCAhdG9waWNTb3VsKSByZXR1cm4gcmVzb2x2ZShzb3Vscyk7XG4gICAgcmV0dXJuIHNjb3BlXG4gICAgICAuZ2V0KHRvcGljU291bClcbiAgICAgIC5zb3VscygpXG4gICAgICAudGhlbihtb3JlID0+IHtcbiAgICAgICAgc291bHMgPSBbLi4uc291bHMsIC4uLm1vcmVdO1xuICAgICAgICByZXR1cm4gZmV0Y2hNb3JlKCk7XG4gICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZmV0Y2hNb3JlKCk7XG59KTtcblxuY29uc3Qgc2luZ2xlRG9tYWluID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiB9KSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZTogZG9tYWluIH0pKS5zb3VscygpXG4pO1xuXG5jb25zdCBzaW5nbGVBdXRob3IgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFtcbiAgICBwYXJhbXMudHlwZSAmJiBwYXJhbXMudHlwZSAhPT0gXCJzdWJtaXR0ZWRcIiAmJiBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChwYXJhbXMuYXV0aG9ySWQpXG4gICAgICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAgICAgLnNvdWxzKCksXG4gICAgcGFyYW1zLnR5cGUgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tZW50c1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1hbmRzXCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KHBhcmFtcy5hdXRob3JJZClcbiAgICAgICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgICAgICAuc291bHMoKVxuICBdKS50aGVuKChbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkgPT4gdW5pb25BcnJheXMoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pKVxuKTtcblxuY29uc3QgbGlzdGluZ0lkcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IHNjb3BlLmdldChzb3VsKS50aGVuKExpc3RpbmdOb2RlLnNvcnRlZElkcyksXG4gIFwibGlzdGluZ0lkc1wiXG4pO1xuXG5jb25zdCBzaW5nbGVMaXN0aW5nID0gcXVlcnkoKHNjb3BlLCB7IGxpc3RpbmcsIHNvcnQsIGluZGV4ZXIgfSkgPT5cbiAgbGlzdGluZ0lkcyhzY29wZSwgYCR7Q29uc3RhbnRzLlBSRUZJWH0ke2xpc3Rpbmd9LyR7c29ydH1AfiR7aW5kZXhlcn0uYCkudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSksXG4gICAgICBSLmZpbHRlcihSLmlkZW50aXR5KVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVwbGllc1RvQXV0aG9yID0gcXVlcnkoXG4gIChzY29wZSwgeyByZXBsaWVzVG9BdXRob3JJZCwgdHlwZSA9IFwib3ZlcnZpZXdcIiwgLi4ucGFyYW1zIH0pID0+XG4gICAgc2luZ2xlTGlzdGluZyhzY29wZSwge1xuICAgICAgbGlzdGluZzogYC91c2VyLyR7cmVwbGllc1RvQXV0aG9ySWR9LyR7dHlwZX1gLFxuICAgICAgc29ydDogXCJuZXdcIixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH0pLnRoZW4oYXV0aG9yZWRTb3VscyA9PlxuICAgICAgYWxsKFxuICAgICAgICBhdXRob3JlZFNvdWxzLm1hcChhdXRob3JlZFNvdWwgPT5cbiAgICAgICAgICBzY29wZS5nZXQoYCR7YXV0aG9yZWRTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgICAgICAgKVxuICAgICAgKS50aGVuKHVuaW9uQXJyYXlzKVxuICAgIClcbik7XG5cbmNvbnN0IHNpbmdsZVN1Ym1pc3Npb24gPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgc2NvcGVcbiAgICAuZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSlcbiAgICApXG4gICAgLnNvdWxzKFxuICAgICAgUi5wcmVwZW5kKFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KSlcbiAgICApXG4pO1xuXG5jb25zdCB0aGluZyA9IHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICBzY29wZS5nZXQodGhpbmdTb3VsKS50aGVuKG1ldGEgPT4ge1xuICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcmVzdWx0ID0geyBpZDogbWV0YS5pZCwgdGltZXN0YW1wOiBwYXJzZUZsb2F0KG1ldGEudGltZXN0YW1wLCAxMCkgfTtcbiAgICBjb25zdCByZXBseVRvU291bCA9IFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BTb3VsID0gUi5wYXRoKFtcIm9wXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BJZCA9IG9wU291bCA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChvcFNvdWwpLnRoaW5naWQgOiBudWxsO1xuICAgIGNvbnN0IHJlcGx5VG9JZCA9IHJlcGx5VG9Tb3VsXG4gICAgICA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChyZXBseVRvU291bCkudGhpbmdpZFxuICAgICAgOiBudWxsO1xuXG4gICAgaWYgKG9wSWQpIHJlc3VsdC5vcElkID0gb3BJZDtcbiAgICBpZiAocmVwbHlUb0lkKSByZXN1bHQucmVwbHlUb0lkID0gcmVwbHlUb0lkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pXG4pO1xuXG5jb25zdCBtdWx0aVF1ZXJ5ID0gKHNpbmdsZVF1ZXJ5LCBwbHVyYWwsIHNpbmdsZSwgY29sbGF0ZSA9IHVuaW9uQXJyYXlzKSA9PlxuICBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IGl0ZW1zID0gUi5wcm9wKHBsdXJhbCwgcGFyYW1zKTtcblxuICAgIGlmIChSLmlzTmlsKGl0ZW1zKSkgcmV0dXJuIGVtcHR5UHJvbWlzZTtcbiAgICByZXR1cm4gYWxsKFxuICAgICAgUi5tYXAoXG4gICAgICAgIHZhbCA9PiBzaW5nbGVRdWVyeShzY29wZSwgeyAuLi5wYXJhbXMsIFtzaW5nbGVdOiB2YWwgfSksXG4gICAgICAgIFIucHJvcE9yKFtdLCBwbHVyYWwsIHBhcmFtcylcbiAgICAgIClcbiAgICApLnRoZW4oY29sbGF0ZSk7XG4gIH0pO1xuXG5jb25zdCBtdWx0aVRvcGljID0gbXVsdGlRdWVyeShzaW5nbGVUb3BpYywgXCJ0b3BpY3NcIiwgXCJ0b3BpY1wiKTtcbmNvbnN0IG11bHRpRG9tYWluID0gbXVsdGlRdWVyeShzaW5nbGVEb21haW4sIFwiZG9tYWluc1wiLCBcImRvbWFpblwiKTtcbmNvbnN0IG11bHRpQXV0aG9yID0gbXVsdGlRdWVyeShzaW5nbGVBdXRob3IsIFwiYXV0aG9ySWRzXCIsIFwiYXV0aG9ySWRcIik7XG5jb25zdCBtdWx0aVN1Ym1pc3Npb24gPSBtdWx0aVF1ZXJ5KFxuICBzaW5nbGVTdWJtaXNzaW9uLFxuICBcInN1Ym1pc3Npb25JZHNcIixcbiAgXCJzdWJtaXNzaW9uSWRcIlxuKTtcblxuY29uc3QgdGhpbmdEYXRhRnJvbVNvdWxzID0gc2NvcGUgPT4gc291bHMgPT5cbiAgYWxsKFxuICAgIHNvdWxzXG4gICAgICAuZmlsdGVyKHggPT4gISF4KVxuICAgICAgLm1hcChzb3VsID0+XG4gICAgICAgIHNjb3BlXG4gICAgICAgICAgLmdldChzb3VsKVxuICAgICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgICAgLnRoZW4oeCA9PiB4KVxuICAgICAgKVxuICApO1xuXG5jb25zdCBjdXJhdGVkID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZHMsIHN1Ym1pc3Npb25Pbmx5ID0gZmFsc2UpID0+XG4gIGFsbChbXG4gICAgbXVsdGlBdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGU6IFwiY29tbWVudHNcIixcbiAgICAgIGF1dGhvcklkc1xuICAgIH0pXG4gICAgICAudGhlbih0aGluZ0RhdGFGcm9tU291bHMoc2NvcGUpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIFIuY29tcG9zZShcbiAgICAgICAgICBSLm1hcChzdWJtaXNzaW9uT25seSA/IFIucHJvcChcIm9wSWRcIikgOiBSLnByb3AoXCJyZXBseVRvSWRcIikpLFxuICAgICAgICAgIFIuZmlsdGVyKFIucHJvcChcInJlcGx5VG9JZFwiKSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJzdWJtaXR0ZWRcIixcbiAgICAgIGF1dGhvcklkc1xuICAgIH0pLnRoZW4oUi5tYXAoc291bCA9PiBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goc291bCkudGhpbmdJZCkpXG4gIF0pLnRoZW4oKFtpZHMxLCBpZHMyXSkgPT4gUi51bmlxKFsuLi5pZHMxLCAuLi5pZHMyXSkpXG4pO1xuXG5jb25zdCB0aGluZ1Njb3JlcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHRhYnVsYXRvciwgdGhpbmdJZCkgPT5cbiAgICB0YWJ1bGF0b3IgJiYgdGhpbmdJZFxuICAgICAgPyBzY29wZVxuICAgICAgICAgIC5nZXQoU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCwgdGFidWxhdG9yIH0pKVxuICAgICAgICAgIC50aGVuKClcbiAgICAgIDogcmVzb2x2ZSgpLFxuICBcInRoaW5nU2NvcmVzXCJcbik7XG5cbmNvbnN0IHRoaW5nRGF0YSA9IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCkgPT4ge1xuICByZXR1cm4gdGhpbmdJZFxuICAgID8gc2NvcGUuZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkuZ2V0KFwiZGF0YVwiKVxuICAgIDogcmVzb2x2ZShudWxsKTtcbn0sIFwidGhpbmdEYXRhXCIpO1xuXG5jb25zdCB0aGluZ01ldGEgPSBxdWVyeShcbiAgKHNjb3BlLCB7IHRoaW5nU291bCwgdGFidWxhdG9yLCBkYXRhID0gZmFsc2UsIHNjb3JlcyA9IGZhbHNlIH0pID0+IHtcbiAgICBpZiAoIXRoaW5nU291bCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgY29uc3QgaWQgPSBMaXN0aW5nTm9kZS5zb3VsVG9JZCh0aGluZ1NvdWwpO1xuXG4gICAgcmV0dXJuIGFsbChbXG4gICAgICB0aGluZyhzY29wZSwgdGhpbmdTb3VsKSxcbiAgICAgIHNjb3Jlc1xuICAgICAgICA/IHRoaW5nU2NvcmVzKHNjb3BlLCB0YWJ1bGF0b3IgfHwgQ29uZmlnLnRhYnVsYXRvciwgaWQpXG4gICAgICAgIDogcmVzb2x2ZSgpLFxuICAgICAgZGF0YSA/IHRoaW5nRGF0YShzY29wZSwgaWQpIDogcmVzb2x2ZSgpXG4gICAgXSkudGhlbigoW21ldGEsIHZvdGVzLCBkYXRhXSkgPT4ge1xuICAgICAgaWYgKCFtZXRhIHx8ICFtZXRhLmlkKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7IC4uLm1ldGEsIHZvdGVzLCBkYXRhIH07XG4gICAgfSk7XG4gIH1cbik7XG5cbmNvbnN0IG11bHRpVGhpbmdNZXRhID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIGFsbChcbiAgICBSLnJlZHVjZShcbiAgICAgIChwcm9taXNlcywgdGhpbmdTb3VsKSA9PiB7XG4gICAgICAgIGlmICghdGhpbmdTb3VsKSByZXR1cm4gcHJvbWlzZXM7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpbmdNZXRhKHNjb3BlLCB7IC4uLnBhcmFtcywgdGhpbmdTb3VsIH0pKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuICAgICAgfSxcbiAgICAgIFtdLFxuICAgICAgUi5wcm9wT3IoW10sIFwidGhpbmdTb3Vsc1wiLCBwYXJhbXMpXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCB1c2VyUGFnZXMgPSBxdWVyeShcbiAgKHNjb3BlLCBhdXRob3JJZCkgPT5cbiAgICBzY29wZS5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSksXG4gIFwidXNlclBhZ2VzXCJcbik7XG5cbmNvbnN0IHdpa2lQYWdlSWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PiB7XG4gIGlmICghYXV0aG9ySWQgfHwgIW5hbWUpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICByZXR1cm4gc2NvcGVcbiAgICAuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpXG4gICAgLmdldChuYW1lKVxuICAgIC5nZXQoXCJpZFwiKTtcbn0sIFwid2lraVBhZ2VJZFwiKTtcblxuY29uc3Qgd2lraVBhZ2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PlxuICB3aWtpUGFnZUlkKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkudGhlbihpZCA9PiBpZCAmJiB0aGluZ0RhdGEoc2NvcGUsIGlkKSlcbik7XG5cbmNvbnN0IHVzZXJNZXRhID0gcXVlcnkoKHNjb3BlLCBpZCkgPT4ge1xuICBpZiAoIWlkKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgcmV0dXJuIHNjb3BlLmdldChgfiR7aWR9YCkudGhlbihtZXRhID0+ICh7XG4gICAgYWxpYXM6IFIucHJvcChcImFsaWFzXCIsIG1ldGEpLFxuICAgIGNyZWF0ZWRBdDogUi5wYXRoKFtcIl9cIiwgXCI+XCIsIFwicHViXCJdLCBtZXRhKVxuICB9KSk7XG59LCBcInVzZXJNZXRhXCIpO1xuXG5jb25zdCBjcmVhdGVTY29wZSA9IFIuY3VycnkoKG5hYiwgb3B0cykgPT5cbiAgbWFrZVNjb3BlKFIuYXNzb2MoXCJndW5cIiwgbmFiLmd1biwgb3B0cyB8fCB7fSkpXG4pO1xuXG5leHBvcnQgY29uc3QgUXVlcnkgPSB7XG4gIHNpbmdsZVRvcGljLFxuICBzaW5nbGVEb21haW4sXG4gIHNpbmdsZUF1dGhvcixcbiAgc2luZ2xlTGlzdGluZyxcbiAgcmVwbGllc1RvQXV0aG9yLFxuICBzaW5nbGVTdWJtaXNzaW9uLFxuICB0aGluZ01ldGEsXG4gIG11bHRpVGhpbmdNZXRhLFxuICBtdWx0aVRvcGljLFxuICBtdWx0aURvbWFpbixcbiAgbXVsdGlBdXRob3IsXG4gIG11bHRpU3VibWlzc2lvbixcbiAgdGhpbmdTY29yZXMsXG4gIHRoaW5nRGF0YSxcbiAgdGhpbmdEYXRhRnJvbVNvdWxzLFxuICB0b3BpY1NvdWxzLFxuICB1c2VyUGFnZXMsXG4gIHdpa2lQYWdlSWQsXG4gIHdpa2lQYWdlLFxuICB1c2VyTWV0YSxcbiAgY3JlYXRlU2NvcGUsXG4gIGN1cmF0ZWRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IFJvdXRlIGZyb20gXCJyb3V0ZS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIHNlYSBmcm9tIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICAuLi5zZWEuQVVUSF9TQ0hFTUEsXG4gIHRvcGljTmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWluTGVuZ3RoOiAxLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFXG4gIH0sXG5cbiAgVG9waWNEYXk6IHtcbiAgICB0aXRsZTogXCJUb3BpYyBEYXlcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBIHNpbmdsZSBkYXkgb2YgdGhpbmdzIGluIGEgdG9waWNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvOnRvcGljTmFtZS9kYXlzLzp5ZWFyLzptb250aC86ZGF5YCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWNOYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0sXG4gICAgICAgIHllYXI6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMjAxOCwgbWF4aW11bTogMjEwMCB9LFxuICAgICAgICBtb250aDogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAxLCBtYXhpbXVtOiAxMiB9LFxuICAgICAgICBkYXk6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMzEgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIiwgXCJ5ZWFyXCIsIFwibW9udGhcIiwgXCJkYXlcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIFRvcGljOiB7XG4gICAgdGl0bGU6IFwiVG9waWNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgdG9waWNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvOnRvcGljTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljTmFtZVwiXVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBuYW1lOiBcInRvcGljTmFtZVwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbmFtZToge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXByZWNhdGVkIGFzIHVubmVjZXNzYXJ5XCIsXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG5cbiAgZG9tYWluTmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWluTGVuZ3RoOiAxLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9ET01BSU5fU0laRVxuICB9LFxuXG4gIERvbWFpbjoge1xuICAgIHRpdGxlOiBcIkRvbWFpblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgaW4gYSBkb21haW5cIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9kb21haW5zLzpkb21haW5OYW1lYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZG9tYWluTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJkb21haW5OYW1lXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHVybDogeyB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVVJMX1NJWkUgfSxcbiAgVVJMOiB7XG4gICAgdGl0bGU6IFwiVVJMXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBmb3IgYSBnaXZlbiBVUkxcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS91cmxzL1xcKnVybGAsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXJsOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VybFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widXJsXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHRoaW5nSWQ6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9IQVNIX1NJWkVcbiAgfSxcblxuICB0aGluZ1NvdWw6IHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB0aGluZ0lkOiB7IFwiI3JlZlwiOiBcIiNkZWZpbml0aW9ucy90aGluZ0lkXCIgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0FsbENvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQWxsIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIGNvbW1lbnRzIGZvciBhIGdpdmVuIHN1Ym1pc3Npb25cIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvYWxsY29tbWVudHNgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdCByZXBsaWVzIHRvIGEgdGhpbmdcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvY29tbWVudHNgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgfVxuICB9LFxuXG4gIHRpbWVzdGFtcDogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSxcbiAgdGhpbmdLaW5kOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfS0lORF9TSVpFXG4gIH0sXG5cbiAgVGhpbmc6IHtcbiAgICB0aXRsZTogXCJUaGluZyBSZWZlcmVuY2VcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhlc2UgYXJlIHN1Ym1pc3Npb25zLCBjb21tZW50cywgY2hhdCBtZXNzYWdlcyBhbmQgd2lraSBwYWdlc1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgaWQ6IFwidGhpbmdJZFwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgaWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAga2luZDogeyBcIiNyZWZcIjogXCIjL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0sXG4gICAgICB0aW1lc3RhbXA6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH0sXG4gICAgICBvcmlnaW5hbEhhc2g6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBvbmVPZjogW1xuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRGF0YUVkZ2VcIiB9LFxuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRGF0YVNpZ25lZEVkZ2VcIiB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB0b3BpYzoge1xuICAgICAgICBhbnlPZjogW1xuICAgICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29tZSBvbGQgdGhpbmdzIGhhZCBnZW5lcmljIHRvcGljIHNvdWxzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBcIiNcIjogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IDQyIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogW1wiI1wiXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGRvbWFpbjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvRG9tYWluRWRnZVwiIH0sXG4gICAgICB1cmw6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1VSTEVkZ2VcIiB9LFxuICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgIGFsbGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdBbGxDb21tZW50c1wiIH0sXG4gICAgICB2b3Rlc3VwOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc1VwXCIgfSxcbiAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfSxcbiAgICAgIG9wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgcmVwbHlUbzogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIGF1dGhvcjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvU0VBQXV0aG9yRWRnZVwiIH1cbiAgICB9LFxuXG4gICAgYW55T2Y6IFtcbiAgICAgIHtcbiAgICAgICAgYWxsT2Y6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aGluZ0hhc2hNYXRjaGVzU291bDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICAgICAgeyBzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmc6IHRydWUgfSxcbiAgICAgICAgICAgICAgeyB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoOiB0cnVlIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7IGlzTGVnYWN5VGhpbmc6IHRydWUgfSxcbiAgICAgIHtcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTZWxmIHZlcmlmeWluZyBjYW4gYmUgdXBkYXRlZCBpbiBpc29sYXRpb25cIixcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgICBjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQ29tbWVudHNcIiB9LFxuICAgICAgICAgIGFsbGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdBbGxDb21tZW50c1wiIH0sXG4gICAgICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICAgICAgdm90ZXNkb3duOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc0Rvd25cIiB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG5cbiAgUHJvb2ZPZldvcmtWb3Rlczoge1xuICAgICRhc3luYzogdHJ1ZSxcbiAgICBrZXlzQXJlUHJvb2ZzT2ZXb3JrOiB7XG4gICAgICBhbGdvcml0aG06IFwiYXJnb24yZFwiLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNvbXBsZXhpdHk6IDYsXG4gICAgICAgIGhhc2hMZW5ndGg6IDMyLFxuICAgICAgICB0aW1lQ29zdDogMSxcbiAgICAgICAgbWVtb3J5Q29zdDogMTAyNDAsXG4gICAgICAgIHBhcmFsbGVsaXNtOiAxXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nVm90ZXNVcDoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3Rlc3VwYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ1ZvdGVzRG93bjoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3Rlc2Rvd25gLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1Byb29mT2ZXb3JrVm90ZXNcIiB9XVxuICB9LFxuXG4gIFRoaW5nRGF0YToge1xuICAgIHRpdGxlOiBcIlVuc2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGlzIGlzIHRoZSBhY3R1YWwgY29udGVudCBvZiBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGFgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dLFxuICAgICAgcmVxdWlyZWQ6IFtcInRoaW5nSWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICB9LFxuICAgICAgdG9waWM6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3NlYUFsaWFzXCIgfSxcbiAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICBvcElkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIHJlcGx5VG9JZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy91cmxcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9XG4gICAgfSxcbiAgICB0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgfSxcblxuICBUaGluZ0RhdGFTaWduZWQ6IHtcbiAgICB0aXRsZTogXCJTaWduZWQgVGhpbmcgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJUaGlzIGlzIHRoZSBhY3R1YWwgY29udGVudCBvZiBhIHRoaW5nLCBjcnlwdG9ncmFwaGljYWxseSBzaWduZWRcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvZGF0YX46YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRoaW5nSWRcIiwgXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAga2luZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgc2VhOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX1RJVExFX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9IH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0JPRFlfU0laRVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH1cbiAgICAgIH0sXG4gICAgICBhdXRob3JJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9IH0sXG4gICAgICBvcElkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgcmVwbHlUb0lkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgZG9tYWluOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSB9LFxuICAgICAgdXJsOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9IH0sXG4gICAgICB0aW1lc3RhbXA6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH0gfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVDb3VudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBWb3RlIENvdW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFnZ3JlZ2F0ZWQgY291bnRzIGZyb20gYSB0YWJ1bGF0b3JcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZWNvdW50c0B+OnRhYnVsYXRvci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICB0YWJ1bGF0b3I6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICB1cDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGRvd246IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBjb21tZW50OiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgc2NvcmU6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBjb21tYW5kczogeyBzZWE6IHsgdHlwZTogW1wib2JqZWN0XCIsIFwic3RyaW5nXCJdIH0gfVxuICAgIH1cbiAgfSxcblxuICBMaXN0aW5nRGF0YToge1xuICAgICRhc3luYzogdHJ1ZSxcbiAgICB0aXRsZTogXCJMaXN0aW5nIE5vZGUgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNoYXJlZCBkZXNjcmlwdGlvbiBvZiBsaXN0aW5nIHByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIC8vIFhYWDogdGhlc2UgYXJlIGFsbCBkZXByZWNhdGVkXG4gICAgICBpZHM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX0lEU19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBbXCJzdHJpbmdcIiwgXCJudWxsXCJdLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRSB9XG4gICAgICB9LFxuICAgICAgc3VibWl0VG9waWM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFIH1cbiAgICAgIH0sXG4gICAgICB0YWJzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19UQUJTX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIGN1cmF0b3JzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19TT1VSQ0VfU0laRSB9XG4gICAgICB9LFxuICAgICAgY2Vuc29yczoge1xuICAgICAgICBzZWE6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIHVzZXJJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9IH0sXG4gICAgICBvcElkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgaXNDaGF0OiB7IHNlYTogeyB0eXBlOiBbXCJib29sZWFuXCIsIFwic3RyaW5nXCJdIH0gfVxuICAgIH0sXG4gICAgcGF0dGVyblByb3BlcnRpZXM6IHtcbiAgICAgIFwiXmQrJFwiOiB7IHNlYTogeyB0eXBlOiBcInN0cmluZ1wiIH0gfVxuICAgIH1cbiAgfSxcblxuICBzb3J0TmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1xuICAgICAgXCJuZXdcIixcbiAgICAgIFwib2xkXCIsXG4gICAgICBcImFjdGl2ZVwiLFxuICAgICAgXCJ0b3BcIixcbiAgICAgIFwiY29tbWVudHNcIixcbiAgICAgIFwiZGlzY3Vzc2VkXCIsXG4gICAgICBcImhvdFwiLFxuICAgICAgXCJiZXN0XCIsXG4gICAgICBcImNvbnRyb3ZlcnNpYWxcIixcbiAgICAgIFwicmFuZG9tXCIsXG4gICAgICBcImZpcmVob3NlXCIsXG4gICAgICBcImNoYXRcIlxuICAgIF1cbiAgfSxcblxuICBUb3BpY0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90Lzp0b3BpYy86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWM6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBEb21haW5MaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWluLzpkb21haW4vOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICB1c2VyTGlzdGluZ1R5cGU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGVudW06IFtcIm92ZXJ2aWV3XCIsIFwic3VibWl0dGVkXCIsIFwiY29tbWVudHNcIiwgXCJjb21tYW5kc1wiLCBcImNvbW1lbnRlZFwiXVxuICB9LFxuXG4gIEF1dGhvclJlcGxpZXNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7XG4gICAgICAgIENvbnN0YW50cy5QUkVGSVhcbiAgICAgIH0vdXNlci86YXV0aG9ySWQvcmVwbGllcy86dHlwZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHR5cGU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXNlckxpc3RpbmdUeXBlXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgQXV0aG9yUHJvZmlsZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS91c2VyLzphdXRob3JJZC86dHlwZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHR5cGU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXNlckxpc3RpbmdUeXBlXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgU3BhY2VMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7XG4gICAgICAgIENvbnN0YW50cy5QUkVGSVhcbiAgICAgIH0vdXNlci86YXV0aG9ySWQvc3BhY2VzLzpuYW1lLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgbmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JDb21tZW50czoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcnMgY29tbWVudHMgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vY29tbWVudHN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclN1Ym1pc3Npb25zOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgU3VibWlzc2lvbnNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9yJ3Mgc3VibWlzc2lvbnMgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vc3VibWlzc2lvbnN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JUaGluZ3M6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBUaGluZ3NcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9yJ3MgdGhpbmdzIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5nc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yUGFnZXM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IgUGFnZSBNYXBcIixcbiAgICBkZXNjcmlwdGlvbjogXCJNYXBwaW5nIG9mIHBhZ2UgbmFtZXMgdG8gdGhpbmdzXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vcGFnZXN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCByb3V0ZXMgPSBSLmtleXMoZGVmaW5pdGlvbnMpLnJlZHVjZSgocmVzdWx0LCBuYW1lKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBSLnBhdGgoW25hbWUsIFwic291bFwiLCBcInBhdHRlcm5cIl0sIGRlZmluaXRpb25zKTtcblxuICBpZiAoIXBhdHRlcm4pIHJldHVybiByZXN1bHQ7XG4gIHJldHVybiBSLmFzc29jKG5hbWUsIG5ldyBSb3V0ZShwYXR0ZXJuKSwgcmVzdWx0KTtcbn0pO1xuXG5jb25zdCBkZWZzV2l0aFJvdXRlcyA9IFIuY29tcG9zZShcbiAgUi5yZWR1Y2UoXG4gICAgKHJlcywgW25hbWUsIHJvdXRlXSkgPT5cbiAgICAgIFIuYXNzb2MobmFtZSwgUi5hc3NvYyhcInJvdXRlXCIsIHJvdXRlLCBSLnByb3AobmFtZSwgZGVmaW5pdGlvbnMpKSwgcmVzKSxcbiAgICB7fVxuICApLFxuICBSLnRvUGFpcnNcbikocm91dGVzKTtcblxuZXhwb3J0IGNvbnN0IFNjaGVtYSA9IHtcbiAgLi4uZGVmc1dpdGhSb3V0ZXMsXG4gIGRlZmluaXRpb25zLFxuICByb3V0ZXNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgQ29tbWVudENvbW1hbmQgfSBmcm9tIFwiLi9Db21tZW50Q29tbWFuZFwiO1xuXG5jb25zdCB0YWJ1bGF0b3JRdWVyeSA9IHF1ZXJ5KGFzeW5jIChzY29wZSwgcm91dGUpID0+IHtcbiAgY29uc3QgdGhpbmdTb3VsID0gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2Uocm91dGUubWF0Y2gpO1xuICBjb25zdCBbdXAsIGRvd24sIGNvbW1lbnQsIHJlcGx5U291bHNdID0gYXdhaXQgYWxsKFtcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3Rlc3VwYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3Rlc2Rvd25gKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2FsbGNvbW1lbnRzYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgXSk7XG4gIGNvbnN0IHRoaW5nRGF0YSA9IGF3YWl0IFF1ZXJ5LnRoaW5nRGF0YUZyb21Tb3VscyhyZXBseVNvdWxzKTtcbiAgY29uc3QgY29tbWFuZE1hcCA9IENvbW1lbnRDb21tYW5kLm1hcCh0aGluZ0RhdGEpO1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdXAsXG4gICAgZG93bixcbiAgICBjb21tZW50LFxuICAgIHJlcGxpZXM6IHJlcGx5U291bHMubGVuZ3RoLFxuICAgIHNjb3JlOiB1cCAtIGRvd25cbiAgfTtcblxuICBpZiAoUi5rZXlzKGNvbW1hbmRNYXApLmxlbmd0aCkgcmVzdWx0LmNvbW1hbmRzID0gSlNPTi5zdHJpbmdpZnkoY29tbWFuZE1hcCk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRhYnVsYXRvciA9IHsgcXVlcnk6IHRhYnVsYXRvclF1ZXJ5IH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5cbmV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5cbmNvbnN0IHRvcGljUHJlZml4ZXMgPSB7XG4gIGNoYXRtc2c6IFwiY2hhdDpcIixcbiAgY29tbWVudDogXCJjb21tZW50czpcIlxufTtcblxuY29uc3Qgc291bFRvSWQgPSBSLmNvbXBvc2UoXG4gIFIucHJvcChcInRoaW5nSWRcIiksXG4gIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaC5iaW5kKFNjaGVtYS5UaGluZy5yb3V0ZSlcbik7XG5cbmNvbnN0IHNvdWxzVG9JZHMgPSBSLm1hcChzb3VsVG9JZCk7XG5cbmNvbnN0IGluZGV4ID0gUi5jdXJyeSgocGVlciwgdGhpbmdJZCwgZGF0YSkgPT4ge1xuICBpZiAoIWRhdGEudG9waWMgJiYgIWRhdGEub3BJZCkgcmV0dXJuO1xuXG4gIGlmIChkYXRhLm9wSWQgJiYgIWRhdGEudG9waWMpIHtcbiAgICBwZWVyLmd1blxuICAgICAgLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KSlcbiAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAub24oZnVuY3Rpb24gcmVjdih0ZCkge1xuICAgICAgICBpZiAoIXRkKSByZXR1cm47XG4gICAgICAgIGluZGV4KHBlZXIsIHRoaW5nSWQsIHsgLi4uZGF0YSwgdG9waWM6IHRkLnRvcGljIHx8IFwiYWxsXCIgfSk7XG4gICAgICAgIHRoaXMub2ZmKCk7XG4gICAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0aGluZyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXlTdHIgPSBUaGluZ1NldC5kYXlTdHIoZGF0YS50aW1lc3RhbXApO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXlTdHIuc3BsaXQoXCIvXCIpO1xuICBjb25zdCB0b3BpY1ByZWZpeCA9IHRvcGljUHJlZml4ZXNbZGF0YS5raW5kXSB8fCBcIlwiO1xuICBjb25zdCBiYXNlVG9waWNOYW1lID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3QgdG9waWNOYW1lID0gdG9waWNQcmVmaXggKyBiYXNlVG9waWNOYW1lO1xuICBjb25zdCB0b3BpYyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSB9KSk7XG4gIGNvbnN0IHRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lLCB5ZWFyLCBtb250aCwgZGF5IH0pXG4gICk7XG5cbiAgaWYgKCFkYXRhLnNraXBBbGwgJiYgZGF0YS50b3BpYyAhPT0gXCJhbGxcIikge1xuICAgIGNvbnN0IGFsbG5hbWUgPSBgJHt0b3BpY1ByZWZpeH1hbGxgO1xuICAgIGNvbnN0IGFsbFRvcGljID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IGFsbG5hbWUgfSlcbiAgICApO1xuICAgIGNvbnN0IGFsbFRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljRGF5LnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0b3BpY05hbWU6IGFsbG5hbWUsXG4gICAgICAgIHllYXIsXG4gICAgICAgIG1vbnRoLFxuICAgICAgICBkYXlcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGFsbFRvcGljLnNldCh0aGluZyk7XG4gICAgYWxsVG9waWNEYXkuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIGlmIChkYXRhLmtpbmQgPT09IFwic3VibWlzc2lvblwiKSB7XG4gICAgY29uc3QgdXJsSW5mbyA9IGRhdGEudXJsID8gcGFyc2VVUkkoZGF0YS51cmwpIDoge307XG4gICAgY29uc3QgZG9tYWluTmFtZSA9IChkYXRhLnVybFxuICAgICAgPyAodXJsSW5mby5ob3N0IHx8IHVybEluZm8uc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKVxuICAgICAgOiBgc2VsZi4ke2RhdGEudG9waWN9YFxuICAgICkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBkb21haW4gPSBwZWVyLmd1bi5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZSB9KSk7XG5cbiAgICBkb21haW4uc2V0KHRoaW5nKTtcblxuICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgY29uc3QgdXJsTm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVVJMLnJvdXRlLnJldmVyc2UoeyB1cmw6IGRhdGEudXJsIH0pKTtcblxuICAgICAgLy8gdGhpbmcuZ2V0KFwidXJsXCIpLnB1dCh1cmxOb2RlKTtcbiAgICAgIHVybE5vZGUuc2V0KHRoaW5nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGF0YS5vcElkKSB7XG4gICAgY29uc3QgYWxsY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogZGF0YS5vcElkIH0pXG4gICAgKTtcblxuICAgIGFsbGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkKSB7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgdG9waWMuc2V0KHRoaW5nKTtcbiAgdG9waWNEYXkuc2V0KHRoaW5nKTtcbn0pO1xuXG5jb25zdCBwdXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGRhdGEudGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gb2JqSGFzaChkYXRhKTtcbiAgY29uc3QgeyB0aW1lc3RhbXAsIGtpbmQsIHRvcGljLCBhdXRob3JJZCwgb3BJZCwgcmVwbHlUb0lkIH0gPSBkYXRhO1xuICBjb25zdCB0aGluZ0lkID0gb2JqSGFzaCh7XG4gICAgdGltZXN0YW1wLFxuICAgIGtpbmQsXG4gICAgdG9waWMsXG4gICAgYXV0aG9ySWQsXG4gICAgb3BJZCxcbiAgICByZXBseVRvSWQsXG4gICAgb3JpZ2luYWxIYXNoXG4gIH0pO1xuXG4gIGNvbnN0IG5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF0YVNvdWwgPSBhdXRob3JJZFxuICAgID8gU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCwgYXV0aG9ySWQgfSlcbiAgICA6IFNjaGVtYS5UaGluZ0RhdGEucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9yaWdpbmFsSGFzaCB9KTtcblxuICBjb25zdCBtZXRhRGF0YSA9IHtcbiAgICBpZDogdGhpbmdJZCxcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICBvcmlnaW5hbEhhc2gsXG4gICAgZGF0YTogeyBcIiNcIjogZGF0YVNvdWwgfSxcbiAgICB2b3Rlc3VwOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdWb3Rlc1VwLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgdm90ZXNkb3duOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdWb3Rlc0Rvd24ucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICBhbGxjb21tZW50czogeyBcIiNcIjogU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICBjb21tZW50czogeyBcIiNcIjogU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfVxuICB9O1xuXG4gIGlmICh0b3BpYylcbiAgICBtZXRhRGF0YS50b3BpYyA9IHsgXCIjXCI6IFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiB0b3BpYyB9KSB9O1xuICBpZiAoYXV0aG9ySWQpIG1ldGFEYXRhLmF1dGhvciA9IHsgXCIjXCI6IGB+JHthdXRob3JJZH1gIH07XG4gIGlmIChvcElkKVxuICAgIG1ldGFEYXRhLm9wID0geyBcIiNcIjogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcElkIH0pIH07XG4gIGlmIChyZXBseVRvSWQpXG4gICAgbWV0YURhdGEucmVwbHlUbyA9IHtcbiAgICAgIFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHJlcGx5VG9JZCB9KVxuICAgIH07XG5cbiAgY29uc29sZS5sb2coXCJjcmVhdGVkXCIsIHRoaW5nSWQpO1xuXG4gIHBlZXIuZ3VuLmdldChkYXRhU291bCkucHV0KGRhdGEpO1xuICBub2RlLnB1dChtZXRhRGF0YSk7XG4gIGluZGV4KHBlZXIsIHRoaW5nSWQsIGRhdGEpO1xuICByZXR1cm4gbm9kZTtcbn0pO1xuXG5jb25zdCBzdWJtaXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChkYXRhLmRvbWFpbikgZGF0YS5kb21haW4gPSBkYXRhLmRvbWFpbi50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCB0aW1lc3RhbXAsIGtpbmQ6IFwic3VibWlzc2lvblwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBzdWJtaXNzaW9uc1NvdWwgPSBTY2hlbWEuQXV0aG9yU3VibWlzc2lvbnMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnMgPSBwZWVyLmd1bi5nZXQoc3VibWlzc2lvbnNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgLnB1dChzdWJtaXNzaW9ucyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgc3VibWlzc2lvbnMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjb21tZW50ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY29tbWVudFwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBjb21tZW50c1NvdWwgPSBTY2hlbWEuQXV0aG9yQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoY29tbWVudHNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgLnB1dChjb21tZW50cyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjaGF0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY2hhdG1zZ1wiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IHdyaXRlUGFnZSA9IFIuY3VycnkoKHBlZXIsIG5hbWUsIGJvZHkpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmICghdXNlcikgcmV0dXJuIFByb21pc2UucmVqZWN0KFwibm90IGxvZ2dlZCBpblwiKTtcbiAgbGV0IHRoaW5nO1xuICBjb25zdCBwYWdlc1NvdWwgPSBTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkOiB1c2VyLnB1YiB9KTtcbiAgY29uc3QgY2hhaW4gPSBwZWVyLmd1bi5nZXQocGFnZXNTb3VsKS5nZXQobmFtZSk7XG5cbiAgcmV0dXJuIGNoYWluLnRoZW4ocmVzID0+IHtcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc1wiLCByZXMpO1xuICAgICAgY2hhaW5cbiAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgLmdldChcImJvZHlcIilcbiAgICAgICAgLnB1dChib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgYm9keSxcbiAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgIGtpbmQ6IFwid2lraXBhZ2VcIixcbiAgICAgICAgYXV0aG9yOiB1c2VyLmFsaWFzLFxuICAgICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICAgIH07XG5cbiAgICAgIGNvbnNvbGUubG9nKFwicGFnZSBkYXRhXCIsIGRhdGEpO1xuICAgICAgdGhpbmcgPSBwdXQocGVlciwgZGF0YSk7XG4gICAgICBjaGFpbi5wdXQodGhpbmcpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuY29uc3Qgdm90ZSA9IFIuY3VycnkoKHBlZXIsIGlkLCBraW5kLCBub25jZSkgPT4ge1xuICBjb25zdCB2b3RlcyA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWFba2luZCA9PT0gXCJ1cFwiID8gXCJUaGluZ1ZvdGVzVXBcIiA6IFwiVGhpbmdWb3Rlc0Rvd25cIl0ucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBpZFxuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIHZvdGVzLmdldChub25jZSkucHV0KFwiMVwiKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgVGhpbmcgPSB7XG4gIHNvdWxUb0lkLFxuICBzb3Vsc1RvSWRzLFxuICBwdXQsXG4gIHN1Ym1pdCxcbiAgY29tbWVudCxcbiAgY2hhdCxcbiAgd3JpdGVQYWdlLFxuICB2b3RlLFxuICBpbmRleFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcblxuY29uc3QgYm9keSA9IFIucHJvcE9yKFwiXCIsIFwiYm9keVwiKTtcbmNvbnN0IHVybCA9IFIucHJvcE9yKFwiXCIsIFwidXJsXCIpO1xuY29uc3QgZG9tYWluID0gUi5jb21wb3NlKFxuICB1cmxTdHIgPT4ge1xuICAgIGlmICghdXJsU3RyKSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZVVSSSh1cmxTdHIpO1xuXG4gICAgcmV0dXJuIChwYXJzZWQuaG9zdCB8fCBwYXJzZWQuc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKTtcbiAgfSxcbiAgdXJsXG4pO1xuXG5leHBvcnQgY29uc3QgVGhpbmdEYXRhTm9kZSA9IHsgYm9keSwgZG9tYWluIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5cbmNvbnN0IHNvdWxzID0gR3VuTm9kZS5lZGdlcztcbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcInRoaW5nSWRcIiksXG4gICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4gICAgKVxuICApLFxuICBHdW5Ob2RlLmVkZ2VzXG4pO1xuXG5jb25zdCB1bmlvbiA9IFIuY29tcG9zZShcbiAgUi5kaXNzb2MoXCJfXCIpLFxuICBSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KVxuKTtcblxuZnVuY3Rpb24gZGF5U3RyKHRpbWVzdGFtcCkge1xuICBjb25zdCBkID0gbmV3IERhdGUodGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgY29uc3QgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RhdGUoKTtcblxuICByZXR1cm4gYCR7eWVhcn0vJHttb250aH0vJHtkYXlOdW19YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRoaW5nU2V0ID0geyBpZHMsIHVuaW9uLCBzb3VscywgZGF5U3RyIH07XG4iLCJleHBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5leHBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdEYXRhTm9kZVwiO1xuZXhwb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcblxuY29uc3QgdG9rZW5pemUgPSBzb3VyY2UgPT4ge1xuICBjb25zdCB0b2tlbk1hcCA9IChzb3VyY2UgfHwgXCJcIikuc3BsaXQoXCJcXG5cIikucmVkdWNlKChkZWYsIGxpbmUpID0+IHtcbiAgICBjb25zdCB0b2tlbnMgPSBsaW5lXG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAubWFwKFIudHJpbSlcbiAgICAgIC5maWx0ZXIoeCA9PiB4KTtcblxuICAgIGlmICghdG9rZW5zLmxlbmd0aCkgcmV0dXJuIGRlZjtcbiAgICByZXR1cm4gUi5hc3NvY1BhdGgodG9rZW5zLCB7fSwgZGVmKTtcbiAgfSwge30pO1xuXG4gIGNvbnN0IGlzUHJlc2VudCA9IHAgPT4ge1xuICAgIGxldCBjaGVjayA9IHA7XG5cbiAgICBpZiAodHlwZW9mIHAgPT09IFwic3RyaW5nXCIpIGNoZWNrID0gcC5zcGxpdChcIiBcIik7XG4gICAgcmV0dXJuIGNoZWNrICYmIFIucGF0aChjaGVjaywgdG9rZW5NYXApO1xuICB9O1xuXG4gIGNvbnN0IGdldFZhbHVlcyA9IHAgPT4gUi5rZXlzSW4oaXNQcmVzZW50KHApKTtcbiAgY29uc3QgZ2V0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKVswXSB8fCBudWxsO1xuICBjb25zdCBnZXRMYXN0VmFsdWUgPSBwID0+IGdldFZhbHVlcyhwKS5wb3AoKSB8fCBudWxsO1xuXG4gIGNvbnN0IGdldFZhbHVlQ2hhaW4gPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgbGV0IG5leHQgPSBwO1xuXG4gICAgd2hpbGUgKG5leHQpIHtcbiAgICAgIG5leHQgPSBnZXRWYWx1ZShbLi4ua2V5cywgLi4udmFsdWVzXSk7XG4gICAgICBuZXh0ICYmIHZhbHVlcy5wdXNoKG5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgY29uc3QgZ2V0UGFpcnMgPSBwID0+IHtcbiAgICBjb25zdCBrZXlzID0gdHlwZW9mIHAgPT09IFwic3RyaW5nXCIgPyBwLnNwbGl0KFwiIFwiKSA6IHA7XG5cbiAgICByZXR1cm4gZ2V0VmFsdWVzKGtleXMpLnJlZHVjZSgocGFpcnMsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gZ2V0VmFsdWUoWy4uLmtleXMsIGtleV0pO1xuXG4gICAgICByZXR1cm4gWy4uLnBhaXJzLCBba2V5LCB2YWxdXTtcbiAgICB9LCBbXSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2UsXG4gICAgaXNQcmVzZW50LFxuICAgIGdldFZhbHVlLFxuICAgIGdldFZhbHVlcyxcbiAgICBnZXRMYXN0VmFsdWUsXG4gICAgZ2V0VmFsdWVDaGFpbixcbiAgICBnZXRQYWlyc1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IFRva2VuaXplciA9IHsgdG9rZW5pemUgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgb2JqSGFzaCBmcm9tIFwib2JqZWN0LWhhc2hcIjtcbmltcG9ydCB7IGNyZWF0ZVN1cHByZXNzb3IgfSBmcm9tIFwiZ3VuLXN1cHByZXNzb3JcIjtcbmltcG9ydCAqIGFzIHNlYSBmcm9tIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5cbmNvbnN0IGlzTGVnYWN5VGhpbmcgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGRhdGFTb3VsID0gUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKTtcbiAgY29uc3QgbmV3ZXN0ID0gUi53aXRob3V0KFxuICAgIFtcImNvbW1lbnRzXCIsIFwiYWxsY29tbWVudHNcIiwgXCJ2b3Rlc3VwXCIsIFwidm90ZXNkb3duXCJdLFxuICAgIFIua2V5cyhSLnBhdGgoW1wiX1wiLCBcIj5cIl0sIGRhdGEpKVxuICApXG4gICAgLm1hcChrZXkgPT4gUi5wYXRoKFtcIl9cIiwgXCI+XCIsIGtleV0sIGRhdGEpKVxuICAgIC5zb3J0KClcbiAgICAucG9wKCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5tYXRjaChkYXRhU291bCkgfHwge307XG4gIGNvbnN0IGlkID0gUi5wcm9wKFwiaWRcIiwgZGF0YSk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSB0aGluZ0lkICYmIG5ld2VzdCAmJiBuZXdlc3QgPCAxNTQzMTAyODE0OTQ1O1xufTtcblxuY29uc3QgdGhpbmdIYXNoTWF0Y2hlc1NvdWwgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiAoXG4gICAgaWQgJiZcbiAgICBpZCA9PT1cbiAgICAgIG9iakhhc2goe1xuICAgICAgICBhdXRob3JJZDogKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkLFxuICAgICAgICB0aW1lc3RhbXA6IHBhcnNlSW50KFIucHJvcChcInRpbWVzdGFtcFwiLCBkYXRhKSwgMTApLFxuICAgICAgICBraW5kOiBSLnByb3AoXCJraW5kXCIsIGRhdGEpLFxuICAgICAgICB0b3BpYzogUi5wcm9wKFxuICAgICAgICAgIFwidG9waWNOYW1lXCIsXG4gICAgICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLm1hdGNoKFIucGF0aChbXCJ0b3BpY1wiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICBvcElkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIGRhdGEpKVxuICAgICAgICApLFxuICAgICAgICByZXBseVRvSWQ6IFIucHJvcChcbiAgICAgICAgICBcInRoaW5nSWRcIixcbiAgICAgICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcInJlcGx5VG9cIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3JpZ2luYWxIYXNoOiBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSlcbiAgICAgIH0pXG4gICk7XG59O1xuXG5jb25zdCBzaWduZWRUaGluZ0RhdGFNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgYXV0aG9ySWQgPSAoUi5wYXRoKFtcImF1dGhvclwiLCBcIiNcIl0sIGRhdGEpIHx8IFwiXCIpLnN1YnN0cigxKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IHNpZ25lZElkID0gUi5wcm9wKFxuICAgIFwiYXV0aG9ySWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGF1dGhvcklkICYmIGF1dGhvcklkID09PSBzaWduZWRJZDtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2ggPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBSLnByb3AoXCJvcmlnaW5hbEhhc2hcIiwgZGF0YSk7XG4gIGNvbnN0IGlkID0gUi5wcm9wKFxuICAgIFwidGhpbmdJZFwiLFxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcImRhdGFcIiwgXCIjXCJdLCBkYXRhKSlcbiAgKTtcblxuICByZXR1cm4gaWQgJiYgaWQgPT09IG9yaWdpbmFsSGFzaDtcbn07XG5cbmNvbnN0IGdldElzVGhpbmdSZWxhdGVkRWRnZSA9IGFqdiA9PiAoXG4gIG5vZGVUeXBlTmFtZSxcbiAgZGF0YSxcbiAgX3BTY2hlbWEsXG4gIF9jUGF0aCxcbiAgcGFyZW50RGF0YVxuKSA9PiB7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBwYXJlbnREYXRhKSB8fCBcIlwiKSB8fCB7fTtcbiAgY29uc3QgeyB0aGluZ0lkOiBwcm9wVGhpbmdJZCB9ID0gU2NoZW1hW25vZGVUeXBlTmFtZV0ucm91dGUubWF0Y2goXG4gICAgUi5wcm9wKFwiI1wiLCBkYXRhKSB8fCBcIlwiXG4gICk7XG5cbiAgaWYgKCF0aGluZ0lkIHx8IHRoaW5nSWQgIT09IHByb3BUaGluZ0lkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhanYuY29tcGlsZSh7ICRyZWY6IGBzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvJHtub2RlVHlwZU5hbWV9RWRnZWAgfSkoXG4gICAgZGF0YVxuICApO1xufTtcblxuY29uc3QgdGhpbmdEYXRhSGFzaE1hdGNoZXMgPSAoX3NjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCB7IF8sIC4uLnJlY29yZCB9ID0gZGF0YSB8fCB7fTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gIHJlY29yZC50aW1lc3RhbXAgPSBwYXJzZUZsb2F0KHJlY29yZC50aW1lc3RhbXAsIDEwKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPVxuICAgIFNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKSB8fCB7fTtcblxuICByZXR1cm4gdGhpbmdJZCAmJiB0aGluZ0lkID09PSBvYmpIYXNoKHJlY29yZCk7XG59O1xuXG5jb25zdCBpc1ZvdGVWYWxpZCA9IChhcmdvbjIsIHNjaGVtYSwgcHJlZml4LCB2b3RlKSA9PiB7XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIsIGNvbmZpZyA9IHt9IH0gPSBzY2hlbWEgfHwge307XG5cbiAgY29uc3Qgbm9uY2UgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbSh2b3RlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcih2b3RlLCBcImhleFwiKTtcbiAgY29uc3Qgc2FsdCA9IEJ1ZmZlci5oYXNPd25Qcm9wZXJ0eShcImZyb21cIilcbiAgICA/IEJ1ZmZlci5mcm9tKG5vbmNlLCBcImhleFwiKVxuICAgIDogbmV3IEJ1ZmZlcihub25jZSwgXCJoZXhcIik7XG4gIGNvbnN0IGhhc2ggPSBhcmdvbjIuaGFzaChwcmVmaXgsIHtcbiAgICBzYWx0LFxuICAgIGhhc2hMZW5ndGg6IGNvbmZpZy5oYXNoTGVuZ3RoLFxuICAgIHRpbWVDb3N0OiBjb25maWcudGltZUNvc3QsXG4gICAgbWVtb3J5Q29zdDogY29uZmlnLm1lbW9yeUNvc3QsXG4gICAgcGFyYWxsZWxpc206IGNvbmZpZy5wYXJhbGxlbGlzbSxcbiAgICByYXc6IHRydWUsXG4gICAgdHlwZTogYXJnb24yW2FsZ29yaXRobV1cbiAgfSk7XG4gIGxldCBvZmYgPSAwO1xuICBsZXQgaTtcblxuICBmb3IgKGkgPSAwOyBpIDw9IGNvbmZpZy5jb21wbGV4aXR5IC0gODsgaSArPSA4LCBvZmYrKykge1xuICAgIGlmIChoYXNoW29mZl0gIT09IDApIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBtYXNrID0gMHhmZiA8PCAoOCArIGkgLSBjb25maWcuY29tcGxleGl0eSk7XG5cbiAgcmV0dXJuIChoYXNoW29mZl0gJiBtYXNrKSA9PT0gMDtcbn07XG5cbmNvbnN0IGtleXNBcmVQcm9vZnNPZldvcmsgPSAoc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGFyZ29uMiA9IHJlcXVpcmUoXCJhcmdvbjJcIik7XG5cbiAgaWYgKCFhcmdvbjIpIHJldHVybiB0cnVlOyAvLyBpbiBicm93c2VyIGRvbid0IGJvdGhlciBmb3Igbm93XG4gIGNvbnN0IHsgYWxnb3JpdGhtID0gXCJhcmdvbjJkXCIgfSA9IHNjaGVtYSB8fCB7fTtcbiAgY29uc3QgcHJlZml4ID0gUi5wYXRoKFtcIl9cIiwgXCIjXCJdLCBkYXRhKTtcblxuICBpZiAoYWxnb3JpdGhtICE9PSBcImFyZ29uMmRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgYXJnb24yIHN1cHBvcnRlZCBmb3Igdm90ZSBoYXNoZXNcIik7XG4gIH1cblxuICBSLndpdGhvdXQoW1wiX1wiXSwgUi5rZXlzKGRhdGEpKS5mb3JFYWNoKHZvdGUgPT4ge1xuICAgIGlmICghaXNWb3RlVmFsaWQoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCB2b3RlXCIsIHByZWZpeCwgdm90ZSk7XG4gICAgICBkZWxldGUgZGF0YVt2b3RlXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGluaXRBanYgPSBSLmNvbXBvc2UoXG4gIGFqdiA9PiB7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJpc0xlZ2FjeVRoaW5nXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBpc0xlZ2FjeVRoaW5nXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0hhc2hNYXRjaGVzU291bFwiLCB7XG4gICAgICB2YWxpZGF0ZTogdGhpbmdIYXNoTWF0Y2hlc1NvdWxcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaFwiLCB7XG4gICAgICB2YWxpZGF0ZTogdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaFxuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdSZWxhdGVkRWRnZVwiLCB7XG4gICAgICB2YWxpZGF0ZTogZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlKGFqdilcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nRGF0YUhhc2hNYXRjaGVzU291bFwiLCB7XG4gICAgICB2YWxpZGF0ZTogdGhpbmdEYXRhSGFzaE1hdGNoZXNcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcImtleXNBcmVQcm9vZnNPZldvcmtcIiwge1xuICAgICAgdmFsaWRhdGU6IGtleXNBcmVQcm9vZnNPZldvcmssXG4gICAgICBtb2RpZnlpbmc6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gYWp2O1xuICB9LFxuICBzZWEuaW5pdEFqdlxuKTtcblxuZXhwb3J0IGNvbnN0IHN1cHByZXNzb3IgPSBjcmVhdGVTdXBwcmVzc29yKHtcbiAgZGVmaW5pdGlvbnM6IFNjaGVtYS5kZWZpbml0aW9ucyxcbiAgaW5pdDogaW5pdEFqdlxufSk7XG5cbmNvbnN0IGd1bldpcmVJbnB1dCA9IFIuY3VycnkoKHBlZXIsIGNvbnRleHQpID0+XG4gIGNvbnRleHQub24oXCJpblwiLCBmdW5jdGlvbiB3aXJlSW5wdXQobXNnKSB7XG4gICAgY29uc3QgXyA9IG1zZ1tcIl9cIl07XG5cbiAgICBkZWxldGUgbXNnW1wiX1wiXTtcbiAgICBpZiAoXCJwaW5nXCIgaW4gbXNnIHx8IFwibGVlY2hcIiBpbiBtc2cpIHJldHVybjtcbiAgICBpZiAobXNnLnB1dCAmJiAhUi5rZXlzKG1zZy5wdXQpLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHByb21pc2UgPSBwZWVyLmNvbmZpZy5kaXNhYmxlVmFsaWRhdGlvblxuICAgICAgPyBQcm9taXNlLnJlc29sdmUobXNnKVxuICAgICAgOiBzdXBwcmVzc29yLnZhbGlkYXRlKG1zZyk7XG5cbiAgICBwcm9taXNlXG4gICAgICAudGhlbih2YWxpZGF0ZWQgPT4ge1xuICAgICAgICBpZiAoIXZhbGlkYXRlZCkgcmV0dXJuIGNvbnNvbGUubG9nKFwibXNnIGRpZG4ndCB2YWxpZGF0ZVwiLCBtc2cpO1xuICAgICAgICBtc2dbXCJfXCJdID0gXztcbiAgICAgICAgcmV0dXJuIHRoaXMudG8ubmV4dChtc2cpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihcInZhbGlkYXRlIGVyclwiLCBtc2csIGVyci5zdGFjayB8fCBlcnIpKTtcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBWYWxpZGF0aW9uID0ge1xuICBpc0xlZ2FjeVRoaW5nLFxuICB0aGluZ0hhc2hNYXRjaGVzU291bCxcbiAgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyxcbiAgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaCxcbiAgZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlLFxuICB0aGluZ0RhdGFIYXNoTWF0Y2hlcyxcbiAgaXNWb3RlVmFsaWQsXG4gIGtleXNBcmVQcm9vZnNPZldvcmssXG4gIGluaXRBanYsXG4gIHN1cHByZXNzb3IsXG4gIGd1bldpcmVJbnB1dFxufTtcbiIsImltcG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9Db25maWdcIjtcbmV4cG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuZXhwb3J0IHsgQ29tbWVudENvbW1hbmQgfSBmcm9tIFwiLi9Db21tZW50Q29tbWFuZFwiO1xuZXhwb3J0IHsgTGlzdGluZywgTGlzdGluZ09yYWNsZSwgU3BhY2VTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1wiO1xuZXhwb3J0IHsgUGFnZSB9IGZyb20gXCIuL1BhZ2VcIjtcbmV4cG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5leHBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmV4cG9ydCB7IFRoaW5nLCBUaGluZ1NldCwgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nXCI7XG5leHBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuZXhwb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmV4cG9ydCB7IFRhYnVsYXRvciB9IGZyb20gXCIuL1RhYnVsYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgUGVlci5pbml0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc2NvcGVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3JfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9vYmplY3RfaGFzaF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX187Il0sInNvdXJjZVJvb3QiOiIifQ==