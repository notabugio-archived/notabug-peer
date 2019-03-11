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

var signup = R.curry(function (peer, username, password) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return new _gunScope.Promise(function (ok, fail) {
    if (peer && peer.gun && peer.gun.user) {
      var user = peer.user();

      _gunScope.Promise.resolve(user.create(username, password, function (ack) {
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
  });
});
var login = R.curry(function (peer, username, password) {
  return new _gunScope.Promise(function (ok, fail) {
    if (peer && peer.gun && peer.gun.user) {
      var user = peer.user();
      user.auth(username, password, function (ack) {
        return ack.err ? fail(ack.err) : ok(peer.user().is);
      });
    } else {
      fail("SEA is not loaded");
    }
  }).then(function (result) {
    peer._onLogin && peer._onLogin(result); // eslint-disable-line

    return result;
  });
});

var logout = function logout(peer) {
  return peer.gun.user().leave();
};

var isLoggedIn = function isLoggedIn(peer) {
  return peer.gun && peer.gun.user && peer.user().is;
};

var onLogin = R.curry(function (peer, fn) {
  return peer._onLogin = fn;
}); // eslint-disable-line

var Authentication = {
  signup: signup,
  login: login,
  logout: logout,
  isLoggedIn: isLoggedIn,
  onLogin: onLogin
};
exports.Authentication = Authentication;

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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Config = {
  tabulator: _Constants.Constants.DEV_INDEXER,
  indexer: _Constants.Constants.DEV_INDEXER,
  owner: _Constants.Constants.DEV_INDEXER,
  update: R.compose(R.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return Config[key] = val;
  }), R.toPairs)
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
var COMMAND_RE = /^ {4}~/;
var PREFIX = "nab";
var SOUL_DELIMETER = "|~~|";
var LISTING_SIZE = 1000;
var MAX_HASH_SIZE = 64;
var MAX_POW_NONCE_SIZE = 64;
var MAX_TOPIC_SIZE = 42;
var MAX_AUTHOR_ALIAS_SIZE = 256;
var MAX_AUTHOR_ID_SIZE = 128; // ???

var MAX_URL_SIZE = 2048;
var MAX_DOMAIN_SIZE = 256;
var MAX_THING_KIND_SIZE = 16;
var MAX_THING_TITLE_SIZE = 300;
var MAX_THING_BODY_SIZE = 50000;
var MAX_LISTING_IDS_SIZE = 50000;
var MAX_LISTING_SOURCE_SIZE = 50000;
var MAX_LISTING_TABS_SIZE = 5000;
var MAX_LISTING_SOUL_PREFIX_SIZE = MAX_TOPIC_SIZE;
var MAX_LISTING_SOUL_IDENTIFIER_SIZE = MAX_AUTHOR_ID_SIZE;
var MAX_LISTING_SOUL_SORT_SIZE = 16;
var MAX_LISTING_SOUL_TYPE_SIZE = MAX_TOPIC_SIZE;
var MAX_LISTING_SOUL_KIND_SIZE = 16;
var DEFAULT_INDEXER = "CEyKrDd1xyPXpWSV00MgvnZY2VJLHXgzCvhMeDwKTYA.yjSq0DyXzzhB_ZXr_DzfJgij3tXU0-3t0Q5bJAtZpj8";
var DEV_INDEXER = "l2nSedlSlvomTqCYhmPnANoQLXe4sj5rR2OrC7YqPpU.zimaWwdlfyTrVITgwWoDVdbJQKReOTqV5zNjTRc-yQA";
var Constants = {
  COMMAND_RE: COMMAND_RE,
  PREFIX: PREFIX,
  SOUL_DELIMETER: SOUL_DELIMETER,
  LISTING_SIZE: LISTING_SIZE,
  MAX_HASH_SIZE: MAX_HASH_SIZE,
  MAX_POW_NONCE_SIZE: MAX_POW_NONCE_SIZE,
  MAX_TOPIC_SIZE: MAX_TOPIC_SIZE,
  MAX_AUTHOR_ALIAS_SIZE: MAX_AUTHOR_ALIAS_SIZE,
  MAX_AUTHOR_ID_SIZE: MAX_AUTHOR_ID_SIZE,
  MAX_URL_SIZE: MAX_URL_SIZE,
  MAX_DOMAIN_SIZE: MAX_DOMAIN_SIZE,
  MAX_THING_KIND_SIZE: MAX_THING_KIND_SIZE,
  MAX_THING_TITLE_SIZE: MAX_THING_TITLE_SIZE,
  MAX_THING_BODY_SIZE: MAX_THING_BODY_SIZE,
  MAX_LISTING_IDS_SIZE: MAX_LISTING_IDS_SIZE,
  MAX_LISTING_SOURCE_SIZE: MAX_LISTING_SOURCE_SIZE,
  MAX_LISTING_TABS_SIZE: MAX_LISTING_TABS_SIZE,
  MAX_LISTING_SOUL_PREFIX_SIZE: MAX_LISTING_SOUL_PREFIX_SIZE,
  MAX_LISTING_SOUL_IDENTIFIER_SIZE: MAX_LISTING_SOUL_IDENTIFIER_SIZE,
  MAX_LISTING_SOUL_SORT_SIZE: MAX_LISTING_SOUL_SORT_SIZE,
  MAX_LISTING_SOUL_TYPE_SIZE: MAX_LISTING_SOUL_TYPE_SIZE,
  MAX_LISTING_SOUL_KIND_SIZE: MAX_LISTING_SOUL_KIND_SIZE,
  DEFAULT_INDEXER: DEFAULT_INDEXER,
  DEV_INDEXER: DEV_INDEXER
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
var soul = R.pathOr("", ["_", "#"]);
var state = R.pathOr({}, ["_", ">"]);
var latest = R.compose(R.last, R.sortBy(R.identity), R.values, state);
var edges = R.compose(R.map(R.prop("#")), R.values);

function decodeSEA(rawData) {
  var data = rawData ? { ...rawData
  } : rawData;
  var soul = R.path(["_", "#"], data);
  if (!soul || !Gun.SEA || soul.indexOf("~") === -1) return rawData;
  R.without(["_"], R.keys(data)).forEach(function (key) {
    Gun.SEA.verify(Gun.SEA.opt.pack(rawData[key], key, rawData, soul), false, function (res) {
      return data[key] = Gun.SEA.opt.unpack(res, key, rawData);
    });
  });
  return data;
}

;
var GunNode = {
  soul: soul,
  state: state,
  latest: latest,
  edges: edges,
  decodeSEA: decodeSEA
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

var needsScores = function needsScores(definition) {
  return !!R.find(definition.isPresent, ["sort hot", "sort top", "sort best", "sort controversial", "ups", "downs", "score", "can remove"]);
};

var needsData = function needsData(definition) {
  return !!R.find(definition.isPresent, ["topic", "domain", "author", "unique by content", "kind", "type", "require signed", "require anon", "alias", "ban domain", "ban topic", "ban author", "ban alias"]);
};

var itemsFromThingSouls = (0, _gunScope.query)(function (scope, souls, definition) {
  return _gunScope.Promise.all(R.map(function (soul) {
    return _ListingSort.ListingSort.itemFromSoul(scope, soul, definition);
  }, souls)).then(_ListingSort.ListingSort.sortItems);
});
var itemsFromThingSets = (0, _gunScope.query)(function (scope, souls, definition) {
  return _gunScope.Promise.all(R.map(scope.get, souls)).then(R.reduce(R.mergeRight, {})).then(_Thing.ThingSet.souls).then(function (souls) {
    return itemsFromThingSouls(scope, souls, definition);
  });
});

var listingSource = function listingSource(definition) {
  var listings = R.pathOr([], ["filters", "allow", "listings"], definition);
  var sort = definition.sort;
  var listingPaths = R.map(function (l) {
    return "".concat(l, "/").concat(sort);
  }, listings);
  return {
    listingPaths: listingPaths
  };
};

var topicSource = function topicSource(definition) {
  var sort = definition.sort;
  var topics = R.path(["filters", "allow", "topics"], definition) || [];
  var listingPaths = R.map(function (t) {
    return "/t/".concat(t, "/").concat(sort);
  }, topics);

  var query = function query(scope) {
    return _Query.Query.multiTopic(scope, {
      topics: topics,
      sort: sort
    }).then(function (souls) {
      return itemsFromThingSouls(scope, souls, definition);
    });
  };

  return {
    listingPaths: listingPaths,
    query: query
  };
};

var domainSource = function domainSource(definition) {
  var sort = definition.sort;
  var domains = R.path(["filters", "allow", "domains"], definition) || [];
  if (!domains.length) return topicSource(definition);
  var listingPaths = R.map(function (d) {
    return "/domain/".concat(d, "/").concat(sort);
  }, domains);

  var query = function query(scope) {
    return _Query.Query.multiDomain(scope, {
      domains: domains,
      sort: sort
    }).then(function (souls) {
      return itemsFromThingSouls(scope, souls, definition);
    });
  };

  return {
    listingPaths: listingPaths,
    query: query
  };
};

var authorSource = function authorSource(definition) {
  var sort = definition.sort;
  var authorIds = R.path(["filters", "allow", "authors"], definition);
  var type = R.path(["filters", "allow", "type"], definition);
  if (!authorIds.length) return topicSource(definition);
  var listingPaths = R.map(function (id) {
    return "/user/".concat(id, "/").concat(type, "/").concat(sort);
  }, authorIds);

  var query = function query(scope) {
    return _Query.Query.multiAuthor(scope, {
      type: type,
      authorIds: authorIds
    }).then(function (souls) {
      return itemsFromThingSouls(scope, souls, definition);
    });
  };

  return {
    listingPaths: listingPaths,
    query: query
  };
};

var curatorSource = function curatorSource(definition) {
  var sort = definition.sort;
  var curators = R.prop("curators", definition) || [];
  if (!curators.length) return topicSource(definition);
  var listingPaths = R.map(function (id) {
    return "/user/".concat(id, "/commented/").concat(sort);
  }, curators);

  var query = function query(scope) {
    return _Query.Query.curate(scope, curators, true).then(function (ids) {
      return ids.map(function (thingId) {
        return _Schema.Schema.Thing.route.reverse({
          thingId: thingId
        });
      });
    }).then(function (souls) {
      return itemsFromThingSouls(scope, souls, definition);
    });
  };

  return {
    listingPaths: listingPaths,
    query: query
  };
};

var opSource = function opSource(definition) {
  var sort = definition.sort;
  var submissionIds = R.path(["filters", "allow", "ops"], definition);
  if (!submissionIds.length) topicSource(definition);
  var listingPaths = R.map(function (id) {
    return "/things/".concat(id, "/comments/").concat(sort);
  }, submissionIds);

  var query = function query(scope) {
    return _Query.Query.multiSubmission(scope, {
      submissionIds: submissionIds
    }).then(function (souls) {
      return itemsFromThingSouls(scope, souls, definition);
    });
  };

  return {
    listingPaths: listingPaths,
    query: query
  };
};

var repliesSource = function repliesSource(definition) {
  var sort = definition.sort;
  var id = R.path(["filters", "allow", "repliesTo"], definition);
  var type = R.path(["filters", "allow", "type"], definition);
  var listingPaths = ["/user/".concat(id, "/replies/").concat(type, "/").concat(sort)];

  var query = function query(scope) {
    return _Query.Query.repliesToAuthor(scope, {
      type: type,
      repliesToAuthorId: id,
      indexer: definition.indexer
    }).then(function (souls) {
      return itemsFromThingSouls(scope, souls, definition);
    });
  };

  return {
    listingPaths: listingPaths,
    query: query
  };
};

var sources = {
  listing: listingSource,
  replies: repliesSource,
  op: opSource,
  curator: curatorSource,
  author: authorSource,
  domain: domainSource,
  topic: topicSource
};
var sourceNames = R.keys(sources);

var sourceName = function sourceName(def) {
  return R.find(def.isPresent, sourceNames) || "topic";
};

var fromDefinition = function fromDefinition(definition) {
  return R.mergeLeft({
    name: sourceName(definition)
  }, sources[name](definition));
};

var ListingDataSource = {
  fromDefinition: fromDefinition,
  sources: sources,
  needsScores: needsScores,
  needsData: needsData,
  itemsFromThingSets: itemsFromThingSets,
  itemsFromThingSouls: itemsFromThingSouls
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fromSource = function fromSource(source) {
  var ownerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var spaceName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var tokenized = _Tokenizer.Tokenizer.tokenize(source);

  var obj = { ...tokenized
  };
  var isPresent = tokenized.isPresent,
      getValue = tokenized.getValue,
      getValues = tokenized.getValues,
      getValueChain = tokenized.getValueChain,
      getPairs = tokenized.getPairs;

  var _getValueChain = getValueChain("sourced from page");

  var _getValueChain2 = _slicedToArray(_getValueChain, 2);

  var _getValueChain2$ = _getValueChain2[0];
  obj.fromPageAuthor = _getValueChain2$ === void 0 ? ownerId : _getValueChain2$;
  var _getValueChain2$2 = _getValueChain2[1];
  obj.fromPageName = _getValueChain2$2 === void 0 ? spaceName ? "space:".concat(spaceName) : undefined : _getValueChain2$2;
  obj.displayName = tokenized.getValue("name") || spaceName;
  obj.indexer = getValue("tabulator") || _Config.Config.indexer;
  obj.tabulator = getValue("tabulator") || obj.indexer;
  obj.tabs = getPairs("tab");
  obj.sort = getValue("sort");
  obj.uniqueByContent = !!isPresent("unique by content");
  obj.curators = getValues("curator");
  obj.moderators = getValues("mod");
  obj.includeRanks = !!isPresent("show ranks");
  obj.stickyIds = getValues("sticky");

  obj.isIdSticky = function (id) {
    return !!tokenized.isPresent(["sticky", id]);
  };

  obj.submitTopics = getValues("submit to");
  obj.submitTopic = getValue("submit to");
  obj.chatTopic = getValue("chat in");

  if (ownerId && spaceName) {
    obj.spaceName = spaceName;
    obj.owner = ownerId;
    obj.useForComments = !tokenized.isPresent("comments leave space");
    obj.path = "/user/".concat(ownerId, "/spaces/").concat(spaceName);
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

var ListingDefinition = {
  fromSource: fromSource
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var intPath = function intPath(p) {
  return R.compose(parseInt, R.path(p));
};

var fromDefinition = function fromDefinition(definition) {
  var filters = definition.filters,
      voteFilters = definition.voteFilters,
      isPresent = definition.isPresent,
      itemSource = definition.itemSource;
  var filterFunctions = [];
  var voteFilterFunctions = [];

  var addFilter = function addFilter() {
    return filterFunctions.push(R.compose.apply(R, arguments));
  };

  var addVoteFilter = function addVoteFilter() {
    return voteFilterFunctions.push(R.compose.apply(R, arguments));
  };

  if (filters.allow.aliases.length) addFilter(function (t) {
    return !!isPresent(["alias", t]);
  }, R.path(["data", "author"]));
  if (filters.allow.authors.length) addFilter(function (t) {
    return !!isPresent(["author", t]);
  }, R.path(["data", "authorId"]));
  if (filters.allow.domains.length) addFilter(function (t) {
    return !!isPresent(["domain", t]);
  }, _Thing.ThingDataNode.domain);
  if (filters.allow.topics.length && itemSource !== "topic") addFilter(function (t) {
    return !!isPresent(["topic", t]);
  }, R.path(["data", "topic"]));
  if (filters.allow.topics.length && !R.find(R.compose(R.identical("all"), R.last, R.split(":")), filters.allow.topics)) addFilter(function (t) {
    return !!isPresent(["topic", t]);
  }, R.path(["data", "topic"]));
  if (filters.allow.kinds.length) addFilter(function (kind) {
    return !!isPresent(["kind", kind]);
  }, R.path(["data", "kind"]));
  if (filters.allow.type === "commands") addFilter(R.compose(R.test(_Constants.Constants.COMMAND_RE), R.path(["data", "body"])));
  if (filters.deny.aliases.length) addFilter(function (alias) {
    return !isPresent(["ban", "alias", alias]);
  }, R.path(["data", "author"]));
  if (filters.deny.authors.length) addFilter(function (authorId) {
    return !isPresent(["ban", "author", authorId]);
  }, R.path(["data", "authorId"]));
  if (filters.deny.domains.length) addFilter(function (domain) {
    return !domain || !isPresent(["ban", "domain", domain]);
  }, _Thing.ThingDataNode.domain);
  if (filters.deny.topics.length) addFilter(function (topic) {
    return !isPresent(["ban", "topic", topic]);
  }, R.path(["data", "topic"]));
  if (filters.deny.anon) addFilter(R.path(["data", "authorId"]));
  if (filters.deny.signed) addFilter(R.compose(function (authorId) {
    return !authorId;
  }, R.path(["data", "authorId"])));
  if (voteFilters.upsMin !== null) addVoteFilter(R.lte(voteFilters.upsMin), intPath(["votes", "up"]));
  if (voteFilters.upsMax !== null) addVoteFilter(R.gte(voteFilters.upsMax), intPath(["votes", "up"]));
  if (voteFilters.downsMin !== null) addVoteFilter(R.lte(voteFilters.downsMin), intPath(["votes", "down"]));
  if (voteFilters.downsMax !== null) addVoteFilter(R.gte(voteFilters.downsMax), intPath(["votes", "down"]));
  if (voteFilters.scoreMin !== null) addVoteFilter(R.lte(voteFilters.scoreMin), intPath(["votes", "score"]));
  if (voteFilters.scoreMax !== null) addVoteFilter(R.gte(voteFilters.scoreMax), intPath(["votes", "score"]));
  if (filters.deny.tags.length) addVoteFilter(function (thing) {
    var cmds = R.path(["votes", "commands"], thing) || {};
    return !filters.deny.tags.find(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          tagName = _ref2[0],
          authorId = _ref2[1];

      return !!R.path([authorId, "tag", tagName], cmds);
    });
  });

  var contentFilter = function contentFilter(thing) {
    return !filterFunctions.find(function (fn) {
      return !fn(thing);
    });
  };

  var voteFilter = function voteFilter(thing) {
    return !voteFilterFunctions.find(function (fn) {
      return !fn(thing);
    });
  };

  var thingFilter = function thingFilter(thing) {
    return contentFilter(thing) && voteFilter(thing);
  };

  return {
    thingFilter: thingFilter,
    contentFilter: contentFilter,
    voteFilter: voteFilter
  };
};

var getFilteredIds = function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(scope, sortedRows) {
    var _ref4,
        _ref4$limit,
        limit,
        _ref4$count,
        count,
        _ref4$after,
        after,
        filterFn,
        rows,
        filtered,
        fetchBatch,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref4 = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {}, _ref4$limit = _ref4.limit, limit = _ref4$limit === void 0 ? 25 : _ref4$limit, _ref4$count = _ref4.count, count = _ref4$count === void 0 ? 0 : _ref4$count, _ref4$after = _ref4.after, after = _ref4$after === void 0 ? null : _ref4$after, filterFn = _ref4.filterFn;
            rows = sortedRows.slice();
            filtered = [];

            fetchBatch = function fetchBatch() {
              var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;
              return Promise.all(R.map(function () {
                var _ref5 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(row) {
                  var inListing;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          inListing = true;

                          if (!filterFn) {
                            _context.next = 5;
                            break;
                          }

                          _context.next = 4;
                          return filterFn(row[_ListingNode.ListingNode.POS_ID]);

                        case 4:
                          inListing = _context.sent;

                        case 5:
                          if (inListing) filtered.push(row);

                        case 6:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }(), rows.splice(count, count + size)));
            };

          case 4:
            if (!rows.length) {
              _context2.next = 11;
              break;
            }

            _context2.next = 7;
            return fetchBatch();

          case 7:
            if (!(limit && filtered.length >= limit)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("break", 11);

          case 9:
            _context2.next = 4;
            break;

          case 11:
            return _context2.abrupt("return", R.compose(R.map(R.prop(_ListingNode.ListingNode.POS_ID)), limit ? R.slice(0, limit) : R.identity, R.sortBy(R.prop(_ListingNode.ListingNode.POS_VAL)))(filtered));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getFilteredIds(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var thingFilter = R.curry(function (scope, spec, thingId) {
  return _Query.Query.thingMeta(scope, {
    tabulator: spec.tabulator,
    thingSoul: _Schema.Schema.Thing.route.reverse({
      thingId: thingId
    }),
    scores: _ListingDataSource.ListingDataSource.needsScores(spec),
    data: _ListingDataSource.ListingDataSource.needsData(spec)
  }).then(spec.thingFilter);
});
var ListingFilter = {
  fromDefinition: fromDefinition,
  getFilteredIds: getFilteredIds,
  thingFilter: thingFilter
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ref = [0, 1, 2, 3],
    POS_IDX = _ref[0],
    POS_ID = _ref[1],
    POS_VAL = _ref[2]; // eslint-disable-line no-unused-vars

var rowsToIds = R.map(R.prop(POS_ID));
var rowsToItems = R.map(R.slice(1, 3));
var source = R.propOr("", "source");
var soulFromPath = R.curry(function (indexer, path) {
  return "".concat(_Constants.Constants.PREFIX).concat(path, "@~").concat(indexer, ".");
});
var getRow = R.curry(function (node, idx) {
  return R.compose(R.ifElse(R.prop("length"), R.insert(0, parseInt(idx, 10)), R.always(null)), function (row) {
    row[1] = parseFloat(row[1]);
    return row;
  }, R.map(R.trim), R.split(","), R.propOr("", "".concat(idx)))(node);
});
var itemKeys = R.compose(R.filter(R.compose(function (val) {
  return !!(val === 0 || val);
}, parseInt)), R.keys);

var rows = function rows(node) {
  return R.compose(R.map(getRow(node)), itemKeys)(node);
};

var ids = R.compose(rowsToIds, rows);
var sortRows = R.sortWith([R.ascend(R.compose(R.cond([[R.isNil, R.always(Infinity)], [R.T, parseFloat]]), R.prop(POS_VAL)))]);
var sortedIds = R.compose(R.map(R.prop(POS_ID)), sortRows, R.filter(R.identity), rows);

var diff = function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(node) {
    var updatedItems,
        removeIds,
        _ref3,
        _ref3$maxSize,
        maxSize,
        removed,
        byId,
        changes,
        rows,
        updated,
        toReplace,
        maxIdx,
        key,
        parsed,
        row,
        _row,
        idx,
        _row$,
        id,
        _row$2,
        rawValue,
        i,
        _ref4,
        _ref5,
        _id,
        value,
        existing,
        _row2,
        allSorted,
        sorted,
        missing,
        added,
        _i2,
        _id2,
        _idx,
        val,
        inserted,
        _row3,
        replaced,
        _ref6,
        _ref7,
        _idx2,
        _row4,
        _idx3,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updatedItems = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
            removeIds = _args.length > 2 && _args[2] !== undefined ? _args[2] : [];
            _ref3 = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, _ref3$maxSize = _ref3.maxSize, maxSize = _ref3$maxSize === void 0 ? 1000 : _ref3$maxSize;
            removed = R.indexBy(R.identity, removeIds);
            byId = {};
            changes = {};
            rows = [];
            updated = {};
            toReplace = [];
            maxIdx = 0;
            _context.t0 = regeneratorRuntime.keys(node || {});

          case 11:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 25;
              break;
            }

            key = _context.t1.value;
            parsed = parseInt(key, 10);

            if (parsed || parsed === 0) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("continue", 11);

          case 16:
            row = getRow(node, key) || [parsed, null, null];
            _row = _slicedToArray(row, 3), idx = _row[0], _row$ = _row[1], id = _row$ === void 0 ? null : _row$, _row$2 = _row[2], rawValue = _row$2 === void 0 ? null : _row$2; // eslint-disable-line no-unused-vars

            row[POS_VAL] = rawValue === null ? null : parseFloat(rawValue);
            if (id && removed[id]) row[POS_ID] = row[POS_VAL] = null;
            if (id) byId[id] = row;

            if (row[POS_ID]) {
              rows.push(row);
            } else {
              toReplace.push(row);
            }

            if (idx > maxIdx) maxIdx = idx;
            _context.next = 11;
            break;

          case 25:
            i = 0;

          case 26:
            if (!(i < updatedItems.length)) {
              _context.next = 35;
              break;
            }

            _ref4 = updatedItems[i] || [null, null], _ref5 = _slicedToArray(_ref4, 2), _id = _ref5[0], value = _ref5[1];

            if (_id) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("continue", 32);

          case 30:
            existing = byId[_id];

            if (existing) {
              if (existing[POS_VAL] !== value) {
                existing[POS_VAL] = value;
                updated[_id] = true;
              }
            } else {
              _row2 = [null, _id, value];
              rows.push(_row2);
            }

          case 32:
            i++;
            _context.next = 26;
            break;

          case 35:
            allSorted = sortRows(rows);
            sorted = maxSize ? allSorted.slice(0, maxSize) : allSorted;
            missing = maxSize ? allSorted.slice(maxSize, allSorted.length) : [];
            added = R.filter(function (row) {
              return row[POS_IDX] === null;
            }, sorted);
            toReplace = toReplace.concat(R.filter(function (row) {
              return row[POS_IDX] !== null;
            }, missing)).reverse();

            for (_i2 = 0; _i2 < sorted.length; _i2++) {
              _id2 = sorted[_i2][POS_ID];
              _idx = sorted[_i2][POS_IDX];
              val = sorted[_i2][POS_VAL];
              if (_idx !== null && updated[_id2]) changes["".concat(_idx)] = [_id2, val].join(",");
            }

            inserted = [];

            while (added.length) {
              _row3 = added.pop();
              replaced = toReplace.pop();
              _ref6 = replaced || [null], _ref7 = _slicedToArray(_ref6, 1), _idx2 = _ref7[0];

              if (_idx2 === null) {
                _idx2 = parseInt(maxIdx, 10) + inserted.length + 1;
                inserted.push(_idx2);
              }

              changes["".concat(_idx2)] = [_row3[POS_ID], _row3[POS_VAL]].join(",");
            }

            while (toReplace.length) {
              _row4 = toReplace.pop();

              if (_row4 && !_row4[POS_ID]) {
                _idx3 = "".concat(_row4[POS_IDX]);

                if (node[_idx3] !== null) {
                  changes[_idx3] = null;
                  console.log("nulling", _idx3, node[_idx3]);
                }
              }
            }

            return _context.abrupt("return", R.keys(changes).length ? changes : null);

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function diff(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var categorizeDiff = function categorizeDiff(diff, original) {
  var allKeys = itemKeys(R.mergeLeft(diff, original));
  var added = [];
  var removed = [];

  for (var i = 0; i < allKeys.length; i++) {
    var key = allKeys[i];

    var _ref8 = getRow(diff, key) || [],
        _ref9 = _slicedToArray(_ref8, 2),
        _diffIdx = _ref9[0],
        diffId = _ref9[1]; // eslint-disable-line no-unused-vars


    var _getRow = getRow(original, key),
        _getRow2 = _slicedToArray(_getRow, 2),
        _origIdx = _getRow2[0],
        origId = _getRow2[1]; // eslint-disable-line no-unused-vars


    if (diffId !== origId) {
      if (diffId) added.push(diffId);
      if (origId) removed.push(origId);
    }
  }

  return [added, removed];
};

var unionRows = R.compose(R.uniqBy(R.prop(POS_ID)), sortRows, R.reduce(R.concat, []), R.map(rows));
var rowsFromSouls = (0, _gunScope.query)(function (scope, souls) {
  return Promise.all(R.map(function (soul) {
    return scope.get(soul);
  })).then(unionRows);
});
var read = (0, _gunScope.query)(function (scope, path, opts) {
  var _ref10 = opts || {},
      _ref10$indexer = _ref10.indexer,
      indexer = _ref10$indexer === void 0 ? _Config.Config.indexer : _ref10$indexer;

  return rowsFromSouls(scope, [soulFromPath(indexer, path)]).then(rowsToIds);
}, "listingIds");
var ListingNode = {
  POS_IDX: POS_IDX,
  POS_ID: POS_ID,
  POS_VAL: POS_VAL,
  source: source,
  getRow: getRow,
  itemKeys: itemKeys,
  rows: rows,
  ids: ids,
  rowsToIds: rowsToIds,
  rowsToItems: rowsToItems,
  sortRows: sortRows,
  sortedIds: sortedIds,
  soulFromPath: soulFromPath,
  read: read,
  diff: diff,
  categorizeDiff: categorizeDiff,
  unionRows: unionRows
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateListing = function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(orc, route, scope, spec) {
    var ids,
        removeIds,
        existing,
        updatedItems,
        changes,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ids = _args.length > 4 && _args[4] !== undefined ? _args[4] : [];
            removeIds = _args.length > 5 && _args[5] !== undefined ? _args[5] : [];

            if (!(!ids.length && !removeIds.length)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return orc.newScope().get(route.soul);

          case 6:
            existing = _context.sent;
            _context.next = 9;
            return _ListingSort.ListingSort.toItems(scope, ids, spec);

          case 9:
            updatedItems = _context.sent;
            changes = _ListingNode.ListingNode.diff(existing, updatedItems, removeIds);
            if (changes) console.log("CHANGES", route.soul, changes);
            if (changes) route.write(changes);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function updateListing(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var onPut = function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(orc, route, _ref2) {
    var sort, updatedSoul, diff, updatedIds, scope, _ref4, thingId, isSticky, key;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sort = _ref2.sort, updatedSoul = _ref2.updatedSoul, diff = _ref2.diff;
            updatedIds = [];
            scope = orc.newScope();
            _ref4 = _Schema.Schema.ThingVoteCounts.route.match(updatedSoul) || {}, thingId = _ref4.thingId;
            isSticky = R.equals(route.match.thingId || null);
            if (thingId) updatedIds.push(thingId);
            updatedIds = R.concat(updatedIds, _Thing.ThingSet.ids(_GunNode.GunNode.decodeSEA(diff)));
            _context2.next = 9;
            return updateListing(orc, route, scope, sort, updatedIds, [], isSticky);

          case 9:
            for (key in scope.getAccesses()) {
              orc.listen(key, route.soul);
            }

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function onPut(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var ListingOracle = {
  updateListing: updateListing,
  onPut: onPut
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

var fromSpec = (0, _gunScope.query)(function (scope, spec, opts) {
  var filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

  var paths = R.pathOr([], ["dataSource", "listingPaths"], spec);
  var souls = R.map(_ListingNode.ListingNode.soulFromPath(opts.indexer || spec.indexer), paths);
  return _ListingNode.ListingNode.getRowsFromSouls(scope, souls).then(function (rows) {
    return _ListingFilter.ListingFilter.getFilteredIds(scope, rows, { ...opts,
      filterFn: filterFn
    });
  });
});
var fromPath = (0, _gunScope.query)(function (scope, path, opts) {
  var type = _ListingType.ListingType.fromPath(path);

  if (!type) return Promise.resolve([]);
  return type.getSpec(scope, path).then(function (spec) {
    if (spec.hasIndexer && !opts.calculate) {
      if (!type || !type.read) return _ListingNode.ListingNode.read(scope, path, opts);
      return type.read(scope, type.match, opts);
    }

    return fromSpec(scope, spec, opts);
  });
});
var ListingQuery = {
  fromSpec: fromSpec,
  fromPath: fromPath
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var POS_ID = 0,
    POS_VAL = 1;
var toIds = R.map(R.prop(POS_ID));
var sortItems = R.sortWith(R.prop(POS_VAL));

var voteSort = function voteSort(fn) {
  return (0, _gunScope.query)(function (scope, thingId, spec) {
    if (spec.isIdSticky(thingId)) return (0, _gunScope.resolve)(-Infinity);
    if (R.contains(thingId, spec.filters.allow.ops)) return (0, _gunScope.resolve)(-Infinity);
    return _Query.Query.thingMeta(scope, {
      tabulator: spec.tabulator,
      scores: true,
      thingSoul: _Schema.Schema.Thing.route.reverse({
        thingId: thingId
      })
    }).then(function (res) {
      return fn(res, spec);
    });
  });
};

var timeSort = function timeSort(fn) {
  return (0, _gunScope.query)(function (scope, thingId, spec) {
    return _Query.Query.thingMeta(scope, {
      tabulator: spec.tabulator,
      thingSoul: _Schema.Schema.Thing.route.reverse({
        thingId: thingId
      })
    }).then(fn);
  });
};

var sorts = {
  new: timeSort(R.compose(R.multiply(-1), function (val) {
    return val || new Date().getTime();
  }, R.prop("timestamp"))),
  old: timeSort(R.prop("timestamp")),
  active: voteSort(function (_ref) {
    var timestamp = _ref.timestamp,
        lastActive = _ref.lastActive;
    return -1 * (lastActive || timestamp);
  }),
  top: voteSort(R.compose(function (x) {
    return -1 * parseInt(x, 10);
  }, R.pathOr(0, ["votes", "score"]))),
  comments: voteSort(R.compose(function (x) {
    return -1 * parseFloat(x, 10);
  }, R.pathOr(0, ["votes", "comment"]))),
  discussed: voteSort(function (thing) {
    var timestamp = R.prop("timestamp", thing);
    var score = parseInt(R.pathOr(0, ["votes", "comment"], thing), 10);
    var seconds = timestamp / 1000 - 1134028003;
    var order = Math.log10(Math.max(Math.abs(score), 1));
    if (!score) return 1000000000 - seconds;
    return -1 * (order + seconds / 45000);
  }),
  hot: voteSort(function (thing) {
    var timestamp = R.prop("timestamp", thing);
    var score = parseInt(R.pathOr(0, ["votes", "score"], thing), 10);
    var seconds = timestamp / 1000 - 1134028003;
    var order = Math.log10(Math.max(Math.abs(score), 1));
    var sign = 0;

    if (score > 0) {
      sign = 1;
    } else if (score < 0) {
      sign = -1;
    }

    return -1 * (sign * order + seconds / 45000);
  }),
  best: voteSort(function (thing) {
    var ups = parseInt(R.pathOr(0, ["votes", "up"], thing), 10);
    var downs = parseInt(R.pathOr(0, ["votes", "down"], thing), 10);
    var n = ups + downs;
    if (n === 0) return 0;
    var z = 1.281551565545; // 80% confidence

    var p = ups / n;
    var left = p + 1 / (2 * n) * z * z;
    var right = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n));
    var under = 1 + 1 / n * z * z;
    return -1 * ((left - right) / under);
  }),
  controversial: voteSort(function (thing) {
    var ups = parseInt(R.pathOr(0, ["votes", "up"], thing), 10);
    var downs = parseInt(R.pathOr(0, ["votes", "down"], thing), 10);
    if (ups <= 0 || downs <= 0) return 0;
    var magnitude = ups + downs;
    var balance = ups > downs ? downs / ups : ups / downs;
    return -1 * Math.pow(magnitude, balance);
  })
};
var toItem = (0, _gunScope.query)(function (scope, id, spec) {
  return (sorts[spec.sort] || sorts.new)(id, spec).then(function (val) {
    return [id, val];
  });
});
var toItems = (0, _gunScope.query)(function (scope, ids, spec) {
  return (0, _gunScope.all)(R.map(function (id) {
    return toItem(scope, id, spec);
  }, ids));
});
var fromThingSets = (0, _gunScope.query)(function (scope, souls, spec) {
  return (0, _gunScope.all)(R.map(scope.get, souls)).then(R.pipe(_Thing.ThingSet.union, _Thing.ThingSet.ids, function (ids) {
    return toItems(scope, ids, spec);
  })).then(sortItems);
});
var ListingSort = {
  POS_ID: POS_ID,
  POS_VAL: POS_VAL,
  sorts: sorts,
  toItem: toItem,
  toItems: toItems,
  toIds: toIds,
  sortItems: sortItems,
  fromThingSets: fromThingSets
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

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

var _ListingDefinition = __webpack_require__(/*! ./ListingDefinition */ "./src/Listing/ListingDefinition.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var fromSource = R.compose(R.apply(R.mergeLeft), R.ap([_ListingFilter.ListingFilter.fromDefinition, R.identity]), R.of, R.apply(R.assoc("dataSource")), R.ap([_ListingDataSource.ListingDataSource.fromDefinition, R.identity]), R.of, _ListingDefinition.ListingDefinition.fromSource);
var getSource = (0, _gunScope.query)(function (scope, authorId, name) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  return _Query.Query.getWikiPage(scope, authorId, name).then(R.compose(function (body) {
    return "".concat(body, "\n# added by indexer\n").concat(extra || "", "\nsourced from page ").concat(authorId, " ").concat(name, "\n");
  }, _ListingNode.ListingNode.body));
});
var ListingSpec = {
  fromSource: fromSource,
  getSource: getSource
};
exports.ListingSpec = ListingSpec;

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

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

var path = "/things/:thingId/comments/:sort";
var getSpec = (0, _gunScope.query)(function (scope, _ref) {
  var thingId = _ref.thingId,
      sort = _ref.sort;
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:comments", ["op ".concat(thingId), "sort ".concat(sort)].join("\n"));
});

var CommentListing = _Path.Path.withRoute({
  path: path,
  getSpec: getSpec
});

exports.CommentListing = CommentListing;

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

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/domain/:domain/:sort";
var tabs = ["hot", "new", "discussed", "controversial", "top"];
var getSource = (0, _gunScope.query)(function (scope, _ref) {
  var domain = _ref.domain,
      sort = _ref.sort;

  var domains = _Path.Path.splitTopics(domain);

  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:domain", ["name ".concat(domains[0]), "submit to whatever", "sort ".concat(sort), "kind submission"].concat(_toConsumableArray(R.map(function (domain) {
    return "domain ".concat(domain);
  }, domains)), _toConsumableArray(R.map(function (tab) {
    return "tab ".concat(tab, " /domain/").concat(domain, "/").concat(tab);
  }, tabs))).join("\n"));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource);
});

var DomainListing = _Path.Path.withRoute({
  path: path,
  tabs: tabs,
  getSource: getSource,
  getSpec: getSpec
});

exports.DomainListing = DomainListing;

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

var _GunNode = __webpack_require__(/*! ../../GunNode */ "./src/GunNode.js");

var _Schema = __webpack_require__(/*! ../../Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ../../Thing */ "./src/Thing/index.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

var _ListingNode = __webpack_require__(/*! ../ListingNode */ "./src/Listing/ListingNode.js");

var _ListingOracle = __webpack_require__(/*! ../ListingOracle */ "./src/Listing/ListingOracle.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = "/user/:authorId/replied/:type/:sort";
var getSource = (0, _gunScope.query)(function (scope, _ref) {
  var authorId = _ref.authorId,
      type = _ref.type,
      _ref$sort = _ref.sort,
      sort = _ref$sort === void 0 ? "new" : _ref$sort;
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:inbox", ["replies to author ".concat(authorId), "type ".concat(type), "sort ".concat(sort)].join("\n"));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource);
});

var onPut = function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(orc, route, _ref2) {
    var updatedSoul, diff, scope, diffData, _ListingNode$categori, _ListingNode$categori2, updatedAuthored, spec, updatedIds, i, opId, replyIds, key;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updatedSoul = _ref2.updatedSoul, diff = _ref2.diff;
            scope = orc.newScope();
            diffData = _GunNode.GunNode.decodeSEA(diff);
            _ListingNode$categori = _ListingNode.ListingNode.categorizeDiff(diffData), _ListingNode$categori2 = _slicedToArray(_ListingNode$categori, 1), updatedAuthored = _ListingNode$categori2[0];
            _context.next = 6;
            return getSpec(scope, route.match);

          case 6:
            spec = _context.sent;
            updatedIds = _Thing.ThingSet.ids(diffData);
            i = 0;

          case 9:
            if (!(i < updatedAuthored.length)) {
              _context.next = 20;
              break;
            }

            opId = updatedAuthored[i];
            _context.t0 = _Thing.ThingSet;
            _context.next = 14;
            return scope.get(_Schema.Schema.ThingComments.route.reverse({
              thingId: opId
            })).then();

          case 14:
            _context.t1 = _context.sent;
            replyIds = _context.t0.ids.call(_context.t0, _context.t1);
            updatedIds = updatedIds.concat(replyIds);

          case 17:
            i++;
            _context.next = 9;
            break;

          case 20:
            if (!updatedIds.length) {
              _context.next = 23;
              break;
            }

            _context.next = 23;
            return _ListingOracle.ListingOracle.updateListing(orc, route, scope, spec, updatedIds, []);

          case 23:
            for (key in scope.getAccesses()) {
              orc.listen(key, route.soul);
            }

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function onPut(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var InboxListing = _Path.Path.withRoute({
  path: path,
  getSource: getSource,
  getSpec: getSpec,
  onPut: onPut
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

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/user/:authorId/:type/:sort";
var tabs = ["overview", "comments", "submitted", "commands"];
var getSource = (0, _gunScope.query)(function (scope, _ref) {
  var authorId = _ref.authorId,
      type = _ref.type,
      sort = _ref.sort;
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:profile", ["author ".concat(authorId), "type ".concat(type), "submit to whatever", "sort ".concat(sort)].concat(_toConsumableArray(R.map(function (tab) {
    return "tab ".concat(tab, " /user/").concat(authorId, "/").concat(tab);
  }, tabs))).join("\n"));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource);
});

var ProfileListing = _Path.Path.withRoute({
  path: path,
  tabs: tabs,
  getSource: getSource,
  getSpec: getSpec
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

var _Config = __webpack_require__(/*! ../../Config */ "./src/Config.js");

var _Schema = __webpack_require__(/*! ../../Schema */ "./src/Schema.js");

var _GunNode = __webpack_require__(/*! ../../GunNode */ "./src/GunNode.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingNode = __webpack_require__(/*! ../ListingNode */ "./src/Listing/ListingNode.js");

var _ListingFilter = __webpack_require__(/*! ../ListingFilter */ "./src/Listing/ListingFilter.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

var _ListingOracle = __webpack_require__(/*! ../ListingOracle */ "./src/Listing/ListingOracle.js");

var _SpaceSpec = __webpack_require__(/*! ../SpaceSpec */ "./src/Listing/SpaceSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var path = "/user/:authorId/spaces/:name/:sort";
var getSource = (0, _gunScope.query)(function (scope, _ref) {
  var authorId = _ref.authorId,
      name = _ref.name,
      sort = _ref.sort;
  return _SpaceSpec.SpaceSpec.getSource(scope, authorId, name, "sort ".concat(sort));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(function (source) {
    return _ListingSpec.ListingSpec.fromSource(source, match.authorId, match.name);
  });
});
var calculate = (0, _gunScope.query)(function (scope, match, opts) {
  var authorId = match.authorId,
      name = match.name,
      sort = match.sort;
  var routeProps = {
    authorId: authorId,
    name: name,
    sort: sort,
    indexer: _Config.Config.indexer
  };
  var souls = [_Schema.Schema.SpaceListing.route.reverse(routeProps)];
  return (0, _gunScope.all)([getSpec(scope, match), _ListingNode.ListingNode.getRowsFromSouls(scope, souls)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        spec = _ref3[0],
        rows = _ref3[1];

    var filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

    return _ListingFilter.ListingFilter.getFilteredIds(scope, rows, { ...opts,
      filterFn: filterFn
    });
  });
});

var onPut = function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(orc, route, _ref4) {
    var updatedSoul, diff, original, _ref4$latest, latest, scope, originalData, diffData, _ListingNode$categori, _ListingNode$categori2, updatedIds, removedIds, spec, voteCountsMatch, thingMatch, _ref6, thingId, authorMatch, key, node, existingKeys;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updatedSoul = _ref4.updatedSoul, diff = _ref4.diff, original = _ref4.original, _ref4$latest = _ref4.latest, latest = _ref4$latest === void 0 ? 0 : _ref4$latest;
            scope = orc.newScope();
            originalData = _GunNode.GunNode.decodeSEA(original);
            diffData = _GunNode.GunNode.decodeSEA(diff);
            _ListingNode$categori = _ListingNode.ListingNode.categorizeDiff(diffData, originalData), _ListingNode$categori2 = _slicedToArray(_ListingNode$categori, 2), updatedIds = _ListingNode$categori2[0], removedIds = _ListingNode$categori2[1];
            _context.next = 7;
            return getSpec(scope, route.match);

          case 7:
            spec = _context.sent;
            voteCountsMatch = _Schema.Schema.ThingVoteCounts.route.match(updatedSoul);
            thingMatch = _Schema.Schema.Thing.route.match(updatedSoul);
            _ref6 = _Schema.Schema.ThingDataSigned.route.match(updatedSoul) || {}, thingId = _ref6.thingId;
            authorMatch = _Schema.Schema.SEAAuthor.route.match(updatedSoul);
            if (voteCountsMatch) updatedIds.push(voteCountsMatch.thingId);
            if (thingMatch) updatedIds.push(thingMatch.thingId);
            if (thingId && thingId !== spec.fromPageId) updatedIds.push(thingId);
            _context.next = 17;
            return _ListingOracle.ListingOracle.updateListing(orc, route, scope, spec, updatedIds, removedIds);

          case 17:
            for (key in scope.getAccesses()) {
              orc.listen(key, route.soul);
            }

            if (!(R.prop("size", original) || updatedIds.length || removedIds.length || authorMatch)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return");

          case 20:
            // base logic from gun-cleric-scope needs to be encapsualted better?
            console.log("---STANDARD SPACE UPDATE---", route.soul, updatedSoul);
            _context.next = 23;
            return orc.newScope().get(route.soul);

          case 23:
            node = _context.sent;
            existingKeys = _ListingNode.ListingNode.itemKeys(node);

            if (existingKeys.length) {
              route.write({
                size: 0,
                ...existingKeys.reduce(function (diff, key) {
                  diff["".concat(key)] = null;
                  return diff;
                }, {})
              });
            }

            orc.work({
              id: "update:".concat(route.soul),
              soul: route.soul,
              method: "doUpdate",
              priority: route.priority || 50
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function onPut(_x, _x2, _x3) {
    return _ref5.apply(this, arguments);
  };
}();

var SpaceListing = _Path.Path.withRoute({
  path: path,
  calculate: calculate,
  getSource: getSource,
  getSpec: getSpec,
  onPut: onPut
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

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/t/:topic/:sort";
var tabs = ["hot", "new", "discussed", "controversial", "top", "firehose"];
var getSource = (0, _gunScope.query)(function (scope, _ref) {
  var topic = _ref.topic,
      sort = _ref.sort;

  var topics = _Path.Path.splitTopics(topic);

  var submitTo = topics[0] === "all" ? "whatever" : topics[0];
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:topic", ["name ".concat(topic), "submit to ".concat(submitTo), "sort ".concat(sort), topic.indexOf(":") === -1 ? "kind submission" : ""].concat(_toConsumableArray(R.map(function (topic) {
    return "topic ".concat(topic);
  }, topics)), _toConsumableArray(R.map(function (tab) {
    return "tab ".concat(tab, " /t/").concat(topic, "/").concat(tab);
  }, tabs))).join("\n"));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource);
});

var TopicListing = _Path.Path.withRoute({
  path: path,
  getSource: getSource,
  getSpec: getSpec
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

var _TopicListing = __webpack_require__(/*! ./TopicListing */ "./src/Listing/ListingType/TopicListing.js");

var _DomainListing = __webpack_require__(/*! ./DomainListing */ "./src/Listing/ListingType/DomainListing.js");

var _CommentListing = __webpack_require__(/*! ./CommentListing */ "./src/Listing/ListingType/CommentListing.js");

var _SpaceListing = __webpack_require__(/*! ./SpaceListing */ "./src/Listing/ListingType/SpaceListing.js");

var _InboxListing = __webpack_require__(/*! ./InboxListing */ "./src/Listing/ListingType/InboxListing.js");

var _ProfileListing = __webpack_require__(/*! ./ProfileListing */ "./src/Listing/ListingType/ProfileListing.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var types = [_TopicListing.TopicListing, _DomainListing.DomainListing, _CommentListing.CommentListing, _SpaceListing.SpaceListing, _InboxListing.InboxListing, _ProfileListing.ProfileListing];

var fromPath = function fromPath(path) {
  var match;

  for (var i = 0; i < types.length; i++) {
    match = types[i].route.match(path);
    if (match) return R.assoc("match", match, types[i]);
  }

  return null;
};

var ListingType = { ...types,
  types: types,
  fromPath: fromPath
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

var splitDomains = R.compose(R.sortBy(R.identity), R.filter(R.identity), R.map(R.trim), R.split("+"), R.toLower, R.trim, R.defaultTo(""));
var splitTopics = R.compose(R.ifElse(R.prop("length"), R.identity, R.always(["all"])), splitDomains);

var withRoute = function withRoute(obj) {
  return R.assoc("route", new _routeParser.default(obj.path), obj);
};

var Path = {
  splitDomains: splitDomains,
  splitTopics: splitTopics,
  withRoute: withRoute
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

var _Thing = __webpack_require__(/*! ../Thing */ "./src/Thing/index.js");

var _ListingSpec = __webpack_require__(/*! ./ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var tabs = ["hot", "new", "discussed", "controversial", "top"];

var spaceConfigPageName = function spaceConfigPageName(name) {
  return "space:".concat(name);
};

var sourceWithDefaults = R.curry(function (ownerId, name, source) {
  var result = [source || ""];

  var tokenized = _Tokenizer.Tokenizer.tokenize(source);

  if (!tokenized.getValue("tab")) {
    tabs.map(function (tab) {
      return result.push("tab ".concat(tab, " /user/").concat(ownerId, "/spaces/").concat(name, "/").concat(tab));
    });
  }

  var indexer = tokenized.getValue("indexer");

  if (!indexer) {
    result.push("indexer ".concat(_Config.Config.indexer));
    indexer = _Config.Config.indexer;
  }

  var tabulator = tokenized.getValue("tabulator");
  if (!tabulator) result.push("tabulator ".concat(indexer));
  return result.join("\n");
});
var getConfig = (0, _gunScope.query)(function (scope, authorId, name) {
  return _ListingSpec.ListingSpec.getSource(scope, authorId, spaceConfigPageName(name));
});
var getSource = (0, _gunScope.query)(function (scope, authorId, name) {
  return getConfig.then(R.compose(sourceWithDefaults(authorId, name), _Thing.ThingDataNode.body));
});
var SpaceSpec = {
  tabs: tabs,
  getSource: getSource
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
  get: function get() {
    return _ListingQuery.ListingQuery;
  }
});
Object.defineProperty(exports, "ListingDataSource", {
  enumerable: true,
  get: function get() {
    return _ListingDataSource.ListingDataSource;
  }
});
Object.defineProperty(exports, "ListingDefinition", {
  enumerable: true,
  get: function get() {
    return _ListingDefinition.ListingDefinition;
  }
});
Object.defineProperty(exports, "ListingFilter", {
  enumerable: true,
  get: function get() {
    return _ListingFilter.ListingFilter;
  }
});
Object.defineProperty(exports, "ListingNode", {
  enumerable: true,
  get: function get() {
    return _ListingNode.ListingNode;
  }
});
Object.defineProperty(exports, "ListingOracle", {
  enumerable: true,
  get: function get() {
    return _ListingOracle.ListingOracle;
  }
});
Object.defineProperty(exports, "ListingSort", {
  enumerable: true,
  get: function get() {
    return _ListingSort.ListingSort;
  }
});
Object.defineProperty(exports, "ListingSpec", {
  enumerable: true,
  get: function get() {
    return _ListingSpec.ListingSpec;
  }
});
Object.defineProperty(exports, "ListingType", {
  enumerable: true,
  get: function get() {
    return _ListingType.ListingType;
  }
});
Object.defineProperty(exports, "SpaceSpec", {
  enumerable: true,
  get: function get() {
    return _SpaceSpec.SpaceSpec;
  }
});
exports.Listing = void 0;

var _ListingQuery = __webpack_require__(/*! ./ListingQuery */ "./src/Listing/ListingQuery.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

var _ListingDefinition = __webpack_require__(/*! ./ListingDefinition */ "./src/Listing/ListingDefinition.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

var _ListingOracle = __webpack_require__(/*! ./ListingOracle */ "./src/Listing/ListingOracle.js");

var _ListingSort = __webpack_require__(/*! ./ListingSort */ "./src/Listing/ListingSort.js");

var _ListingSpec = __webpack_require__(/*! ./ListingSpec */ "./src/Listing/ListingSpec.js");

var _ListingType = __webpack_require__(/*! ./ListingType */ "./src/Listing/ListingType/index.js");

var _SpaceSpec = __webpack_require__(/*! ./SpaceSpec */ "./src/Listing/SpaceSpec.js");

var Listing = {
  fromSpec: _ListingQuery.ListingQuery.fromSpec,
  fromPath: _ListingQuery.ListingQuery.fromPath
};
exports.Listing = Listing;

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function init(Gun) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = config || {},
      leech = _ref.leech,
      disableValidation = _ref.disableValidation,
      noGun = _ref.noGun,
      localStorage = _ref.localStorage,
      persist = _ref.persist,
      rest = _objectWithoutProperties(_ref, ["leech", "disableValidation", "noGun", "localStorage", "persist"]);

  var peer = {
    config: config
  };

  if (!noGun) {
    var cfg = {
      localStorage: !!localStorage,
      radisk: !!persist,
      ...rest
    };
    if (persist) cfg.localStorage = false;
    if (!disableValidation) Gun.on("opt", _Validation.Validation.gunWireInput(peer));
    if (cfg.storeFn) cfg.store = cfg.storeFn(cfg); // for indexeddb

    peer.gun = Gun(cfg);
    if (cfg.localStorage) peer.gun.on("localStorage:error", function (a) {
      return a.retry({});
    });

    if (leech) {
      var sendLeech = function sendLeech() {
        return peer.gun._.on("out", {
          leech: true
        });
      };

      sendLeech();
    }
  }

  peer.newScope = _Query.Query.createScope(peer);
  peer.onLogin = _Authentication.Authentication.onLogin(peer);
  peer.signup = _Authentication.Authentication.signup(peer);
  peer.login = _Authentication.Authentication.login(peer);

  peer.logout = function () {
    return _Authentication.Authentication.logout(peer);
  };

  peer.isLoggedIn = function () {
    return _Authentication.Authentication.isLoggedIn(peer);
  };

  peer.submit = _Thing.Thing.submit(peer);
  peer.comment = _Thing.Thing.comment(peer);
  peer.chat = _Thing.Thing.chat(peer);
  peer.writePage = _Thing.Thing.writePage(peer);
  peer.vote = _Thing.Thing.vote(peer);
  peer.queries = _Query.Query;
  return peer;
}

var Peer = {
  init: init
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

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

var _Schema = __webpack_require__(/*! ./Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ./Thing */ "./src/Thing/index.js");

var _ListingNode = __webpack_require__(/*! ./Listing/ListingNode */ "./src/Listing/ListingNode.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var emptyPromise = (0, _gunScope.resolve)(null);
var unionArrays = R.reduce(R.union, []);

var topicSouls = function topicSouls(params) {
  var _ref = params || {},
      _ref$topics = _ref.topics,
      topics = _ref$topics === void 0 ? ["all"] : _ref$topics;

  var days = R.propOr(365, "days", params) || 365;
  var dayStrings = [];
  var oneDay = 1000 * 60 * 60 * 24;
  var start = new Date().getTime() - oneDay * parseInt(days, 10);

  for (var i = 0; i <= days + 1; i++) {
    dayStrings.push(_Thing.ThingSet.dayStr(start + i * oneDay));
  }

  return Object.keys(topics.reduce(function (result, topicName) {
    return dayStrings.reduce(function (res, ds) {
      res["".concat(_Constants.Constants.PREFIX, "/topics/").concat(topicName, "/days/").concat(ds)] = true;
      return res;
    }, result);
  }, {}));
};

var singleTopic = (0, _gunScope.query)(function (scope, params) {
  var tSouls = topicSouls({ ...params,
    topics: [params.topic]
  });
  var souls = [];
  var itemMax = _Constants.Constants.LISTING_SIZE;

  if (params.sort === "new") {
    itemMax = _Constants.Constants.LISTING_SIZE;
  } else {
    if (params.sort === "top") itemMax = itemMax * 3;
    if (params.topic === "all") itemMax = itemMax * 3;
  }

  var fetchMore = function fetchMore() {
    var topicSoul = tSouls.pop();
    if (souls.length > itemMax || !topicSoul) return (0, _gunScope.resolve)(souls);
    return scope.get(topicSoul).souls().then(function (more) {
      souls = [].concat(_toConsumableArray(souls), _toConsumableArray(more));
      return fetchMore();
    });
  };

  return fetchMore();
});
var singleDomain = (0, _gunScope.query)(function (scope, _ref2) {
  var domain = _ref2.domain;
  return scope.get(_Schema.Schema.Domain.route.reverse({
    domainName: domain
  })).souls();
});
var singleAuthor = (0, _gunScope.query)(function (scope, params) {
  return (0, _gunScope.all)([params.type && params.type !== "submitted" && params.type !== "overview" ? (0, _gunScope.resolve)([]) : scope.get(params.authorId).get("submissions").souls(), params.type && params.type !== "comments" && params.type !== "overview" && params.type !== "commands" ? (0, _gunScope.resolve)([]) : scope.get(params.authorId).get("comments").souls()]).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        submissions = _ref4[0],
        comments = _ref4[1];

    return unionArrays([submissions, comments]);
  });
});
var listingIds = (0, _gunScope.query)(function (scope, soul) {
  return scope.get(soul).then(_ListingNode.ListingNode.sortedIds);
}, "listingIds");
var singleListing = (0, _gunScope.query)(function (scope, _ref5) {
  var listing = _ref5.listing,
      sort = _ref5.sort,
      indexer = _ref5.indexer;
  return listingIds(scope, "".concat(_Constants.Constants.PREFIX).concat(listing, "/").concat(sort, "@~").concat(indexer, ".")).then(R.compose(R.map(function (thingId) {
    return _Schema.Schema.Thing.route.reverse({
      thingId: thingId
    });
  }), R.filter(R.identity)));
});
var repliesToAuthor = (0, _gunScope.query)(function (scope, _ref6) {
  var repliesToAuthorId = _ref6.repliesToAuthorId,
      _ref6$type = _ref6.type,
      type = _ref6$type === void 0 ? "overview" : _ref6$type,
      params = _objectWithoutProperties(_ref6, ["repliesToAuthorId", "type"]);

  return singleListing(scope, {
    listing: "/user/".concat(repliesToAuthorId, "/").concat(type),
    sort: "new",
    ...params
  }).then(function (authoredSouls) {
    return (0, _gunScope.all)(authoredSouls.map(function (authoredSoul) {
      return scope.get("".concat(authoredSoul, "/comments")).souls();
    })).then(unionArrays);
  });
});
var singleSubmission = (0, _gunScope.query)(function (scope, params) {
  return scope.get(_Schema.Schema.ThingAllComments.route.reverse({
    thingId: params.submissionId
  })).souls(R.prepend(_Schema.Schema.Thing.route.reverse({
    thingId: params.submissionId
  })));
});
var thing = (0, _gunScope.query)(function (scope, thingSoul) {
  return scope.get(thingSoul).then(function (meta) {
    if (!meta || !meta.id) return null;
    var result = {
      id: meta.id,
      timestamp: parseFloat(meta.timestamp, 10)
    };
    var replyToSoul = R.path(["replyTo", "#"], meta);
    var opSoul = R.path(["op", "#"], meta);
    var opId = opSoul ? _Schema.Schema.Thing.route.match(opSoul).thingid : null;
    var replyToId = replyToSoul ? _Schema.Schema.Thing.route.match(replyToSoul).thingid : null;
    if (opId) result.opId = opId;
    if (replyToId) result.replyToId = replyToId;
    return result;
  });
});

var thingVoteCount = function thingVoteCount(voteType) {
  return (0, _gunScope.query)(function (scope, thingSoul) {
    return scope.get(thingSoul).get(voteType).count();
  });
};

var thingVotesUp = thingVoteCount("votesup");
var thingVotesDown = thingVoteCount("votesdown");
var thingAllCommentsCount = (0, _gunScope.query)(function (scope, thingSoul) {
  return scope.get("".concat(thingSoul, "/allcomments")).count();
});
var computeThingScores = (0, _gunScope.query)(function (scope, thingSoul) {
  return (0, _gunScope.all)([thingVotesUp(scope, thingSoul), thingVotesDown(scope, thingSoul), thingAllCommentsCount(scope, thingSoul)]).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 3),
        up = _ref8[0],
        down = _ref8[1],
        comment = _ref8[2];

    return {
      up: up,
      down: down,
      comment: comment,
      score: up - down
    };
  });
});
var thingMeta = (0, _gunScope.query)(function (scope, _ref9) {
  var thingSoul = _ref9.thingSoul,
      tabulator = _ref9.tabulator,
      _ref9$data = _ref9.data,
      data = _ref9$data === void 0 ? false : _ref9$data,
      _ref9$scores = _ref9.scores,
      scores = _ref9$scores === void 0 ? false : _ref9$scores;
  return (0, _gunScope.all)([thing(scope, thingSoul), scores ? tabulator ? scope.get("".concat(thingSoul, "/votecounts@~").concat(tabulator, ".")).then() // eslint-disable-line
  : computeThingScores(scope, thingSoul).then() : (0, _gunScope.resolve)(), data ? scope.get(thingSoul).get("data").then() : (0, _gunScope.resolve)()]).then(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 3),
        meta = _ref11[0],
        votes = _ref11[1],
        data = _ref11[2];

    if (!meta || !meta.id) return null;
    return { ...meta,
      votes: votes,
      data: data
    };
  });
});
var multiThingMeta = (0, _gunScope.query)(function (scope, params) {
  return (0, _gunScope.all)(R.reduce(function (promises, thingSoul) {
    if (!thingSoul) return promises;
    promises.push(thingMeta(scope, { ...params,
      thingSoul: thingSoul
    }));
    return promises;
  }, [], R.propOr([], "thingSouls", params)));
});

var multiQuery = function multiQuery(singleQuery, plural, single) {
  var collate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : unionArrays;
  return (0, _gunScope.query)(function (scope, params) {
    var items = R.prop(plural, params);
    if (R.isNil(items)) return emptyPromise;
    return (0, _gunScope.all)(R.map(function (val) {
      return singleQuery(scope, _defineProperty({ ...params
      }, single, val));
    }, R.propOr([], plural, params))).then(collate);
  });
};

var multiTopic = multiQuery(singleTopic, "topics", "topic");
var multiDomain = multiQuery(singleDomain, "domains", "domain");
var multiAuthor = multiQuery(singleAuthor, "authorIds", "authorId");
var multiSubmission = multiQuery(singleSubmission, "submissionIds", "submissionId");

var thingDataFromSouls = function thingDataFromSouls(scope) {
  return function (souls) {
    return (0, _gunScope.all)(souls.filter(function (x) {
      return !!x;
    }).map(function (soul) {
      return scope.get(soul).get("data").then(function (x) {
        return x;
      });
    }));
  };
};

var curated = (0, _gunScope.query)(function (scope, authorIds) {
  var submissionOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return (0, _gunScope.all)([multiAuthor(scope, {
    type: "comments",
    authorIds: authorIds
  }).then(thingDataFromSouls(scope)).then(R.compose(R.map(submissionOnly ? R.prop("opId") : R.prop("replyToId")), R.filter(R.prop("replyToId")))), multiAuthor(scope, {
    type: "submitted",
    authorIds: authorIds
  }).then(R.map(function (soul) {
    return _Schema.Schema.Thing.route.match(soul).thingId;
  }))]).then(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 2),
        ids1 = _ref13[0],
        ids2 = _ref13[1];

    return R.uniq([].concat(_toConsumableArray(ids1), _toConsumableArray(ids2)));
  });
});
var thingScores = (0, _gunScope.query)(function (scope, tabulator, thingId) {
  return tabulator && thingId ? scope.get(_Schema.Schema.ThingVoteCounts.route.reverse({
    thingId: thingId,
    tabulator: tabulator
  })).then() : (0, _gunScope.resolve)();
}, "thingScores");
var thingReplies = (0, _gunScope.query)(function (scope, thingId) {
  return scope.get(_Schema.Schema.ThingComments.route.reverse({
    thingId: thingId
  })).then();
});
var thingData = (0, _gunScope.query)(function (scope, thingId) {
  return thingId ? scope.get(_Schema.Schema.Thing.route.reverse({
    thingId: thingId
  })).get("data") : (0, _gunScope.resolve)(null);
}, "thingData");
var userPages = (0, _gunScope.query)(function (scope, authorId) {
  return scope.get(_Schema.Schema.AuthorPages.route.reverse({
    authorId: authorId
  }));
}, "userPages");
var wikiPageId = (0, _gunScope.query)(function (scope, authorId, name) {
  return scope.get(_Schema.Schema.AuthorPages.route.reverse({
    authorId: authorId
  })).get(name).get("id");
}, "wikiPageId");
var wikiPage = (0, _gunScope.query)(function (scope, authorId, name) {
  return wikiPageId(scope, authorId, name).then(function (id) {
    return id && thingData(scope, id);
  });
});
var userMeta = (0, _gunScope.query)(function (scope, id) {
  return scope.get(id).then(function (meta) {
    return {
      userAlias: R.prop("alias", meta),
      createdAt: R.path(["_", ">", "pub"], meta)
    };
  });
}, "userMeta");
var createScope = R.curry(function (nab, opts) {
  return (0, _gunScope.scope)(R.assoc("gun", nab.gun, opts || {}));
});
var Query = {
  singleTopic: singleTopic,
  singleDomain: singleDomain,
  singleAuthor: singleAuthor,
  singleListing: singleListing,
  repliesToAuthor: repliesToAuthor,
  singleSubmission: singleSubmission,
  computeThingScores: computeThingScores,
  thingMeta: thingMeta,
  multiThingMeta: multiThingMeta,
  multiTopic: multiTopic,
  multiDomain: multiDomain,
  multiAuthor: multiAuthor,
  multiSubmission: multiSubmission,
  thingScores: thingScores,
  thingReplies: thingReplies,
  thingData: thingData,
  topicSouls: topicSouls,
  userPages: userPages,
  wikiPageId: wikiPageId,
  wikiPage: wikiPage,
  userMeta: userMeta,
  createScope: createScope,
  curated: curated
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var definitions = { ...sea.AUTH_SCHEMA,
  topicName: {
    type: "string",
    minLength: 1,
    maxLength: _Constants.Constants.MAX_TOPIC_SIZE
  },
  TopicDay: {
    title: "Topic Day",
    description: "A single day of things in a topic",
    soul: {
      pattern: "".concat(_Constants.Constants.PREFIX, "/topics/:topicName/days/:year/:month/:day"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/topics/:topicName"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/domains/:domainName"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/urls/*url"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/allcomments"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/comments"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/votesup"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/votesdown"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/data"),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/data~:authorId."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/votecounts@~:tabulator."),
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
      // XXX: rest are deprecated in favor of source
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/t/:topic/:sort@~:indexer."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/domain/:domain/:sort@~:indexer."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things/:thingId/comments/:sort@~:indexer."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/user/:authorId/replies/:type/:sort@~:indexer."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/user/:authorId/:type/:sort@~:indexer."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/user/:authorId/spaces/:name/:sort@~:indexer."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/comments~:authorId."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/submissions~:authorId."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/things~:authorId."),
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
      pattern: "".concat(_Constants.Constants.PREFIX, "/pages~:authorId."),
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
var routes = R.keys(definitions).reduce(function (result, name) {
  var pattern = R.path([name, "soul", "pattern"], definitions);
  if (!pattern) return result;
  return R.assoc(name, new _routeParser.default(pattern), result);
});
var defsWithRoutes = R.compose(R.reduce(function (res, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      route = _ref2[1];

  return R.assoc(name, R.assoc("route", route, R.prop(name, definitions)), res);
}, {}), R.toPairs)(routes);
var Schema = { ...defsWithRoutes,
  definitions: definitions,
  routes: routes
};
exports.Schema = Schema;

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

var body = R.propOr("", "body");
var url = R.propOr("", "url");
var domain = R.compose(function (urlStr) {
  if (!urlStr) return "";
  var parsed = (0, _uriJs.parse)(urlStr);
  return (parsed.host || parsed.scheme || "").replace(/^www\./, "");
}, url);
var ThingDataNode = {
  body: body,
  domain: domain
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

var souls = _GunNode.GunNode.edges;
var ids = R.compose(R.filter(R.identity), R.map(R.compose(R.prop("thingId"), _Schema.Schema.Thing.route.match.bind(_Schema.Schema.Thing.route))), _GunNode.GunNode.edges);
var union = R.compose(R.dissoc("_"), R.reduce(R.mergeRight, {}));

function dayStr(timestamp) {
  var d = new Date(timestamp || new Date().getTime());
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth() + 1;
  var dayNum = d.getUTCDate();
  return "".concat(year, "/").concat(month, "/").concat(dayNum);
}

var ThingSet = {
  ids: ids,
  union: union,
  souls: souls,
  dayStr: dayStr
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
  get: function get() {
    return _ThingSet.ThingSet;
  }
});
Object.defineProperty(exports, "ThingDataNode", {
  enumerable: true,
  get: function get() {
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var put = R.curry(function (peer, data) {
  data.timestamp = data.timestamp || new Date().getTime(); // eslint-disable-line

  var originalHash = (0, _objectHash.default)(data);
  var timestamp = data.timestamp,
      kind = data.kind,
      topic = data.topic,
      authorId = data.authorId,
      opId = data.opId,
      replyToId = data.replyToId;
  var thingId = (0, _objectHash.default)({
    timestamp: timestamp,
    kind: kind,
    topic: topic,
    authorId: authorId,
    opId: opId,
    replyToId: replyToId,
    originalHash: originalHash
  });
  var node = peer.gun.get(_Schema.Schema.Thing.route.reverse({
    thingId: thingId
  }));
  var dataSoul = authorId ? _Schema.Schema.ThingDataSigned.route.reverse({
    thingId: thingId,
    authorId: authorId
  }) : _Schema.Schema.ThingData.route.reverse({
    thingId: originalHash
  });
  var metaData = {
    id: thingId,
    timestamp: timestamp,
    kind: kind,
    originalHash: originalHash,
    data: {
      "#": dataSoul
    },
    votesup: {
      "#": _Schema.Schema.ThingVotesUp.route.reverse({
        thingId: thingId
      })
    },
    votesdown: {
      "#": _Schema.Schema.ThingVotesDown.route.reverse({
        thingId: thingId
      })
    },
    allcomments: {
      "#": _Schema.Schema.ThingAllComments.route.reverse({
        thingId: thingId
      })
    },
    comments: {
      "#": _Schema.Schema.ThingComments.route.reverse({
        thingId: thingId
      })
    }
  };
  if (topic) metaData.topic = {
    "#": _Schema.Schema.Topic.route.reverse({
      topicName: topic
    })
  };
  if (authorId) metaData.author = {
    "#": "~".concat(authorId)
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
  peer.index(thingId, data);
  return node;
});
var submit = R.curry(function (peer, data) {
  var timestamp = data.timestamp || new Date().getTime();
  var user = peer.isLoggedIn();
  if (data.topic) data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line

  if (data.domain) data.domain = data.domain.toLowerCase().trim(); // eslint-disable-line

  if (user) {
    data.author = user.alias; // eslint-disable-line

    data.authorId = user.pub; // eslint-disable-line
  }

  var thing = put(peer, { ...data,
    timestamp: timestamp,
    kind: "submission"
  });

  if (user) {
    var thingsSoul = _Schema.Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });

    var submissionsSoul = _Schema.Schema.AuthorSubmissions.route.reverse({
      authorId: user.pub
    });

    var things = peer.gun.get(thingsSoul);
    var submissions = peer.gun.get(submissionsSoul);
    peer.gun.user().get("things").put(things);
    peer.gun.user().get("submissions").put(submissions);
    things.set(thing);
    submissions.set(thing);
  }

  return thing;
});
var comment = R.curry(function (peer, data) {
  var user = peer.isLoggedIn();
  if (data.topic) data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line

  if (user) {
    data.author = user.alias; // eslint-disable-line

    data.authorId = user.pub; // eslint-disable-line
  }

  var thing = put(peer, { ...data,
    kind: "comment"
  });

  if (user) {
    var thingsSoul = _Schema.Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });

    var commentsSoul = _Schema.Schema.AuthorComments.route.reverse({
      authorId: user.pub
    });

    var things = peer.gun.get(thingsSoul);
    var comments = peer.gun.get(commentsSoul);
    peer.gun.user().get("things").put(things);
    peer.gun.user().get("comments").put(comments);
    things.set(thing);
    comments.set(thing);
  } // peer.gun.user().get("comments").put(peer.gun.user().get("comments"));


  return thing;
});
var chat = R.curry(function (peer, data) {
  var user = peer.isLoggedIn();
  if (data.topic) data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line

  if (user) {
    data.author = user.alias; // eslint-disable-line

    data.authorId = user.pub; // eslint-disable-line
  }

  var thing = put(peer, { ...data,
    kind: "chatmsg"
  });

  if (user) {
    var thingsSoul = _Schema.Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });

    var things = peer.gun.get(thingsSoul);
    peer.gun.user().get("things").put(things);
    things.set(thing);
  }

  return thing;
});
var writePage = R.curry(function (peer, name, body) {
  var user = peer.isLoggedIn();
  if (!user) return _gunScope.Promise.reject("not logged in");
  var thing;

  var pagesSoul = _Schema.Schema.AuthorPages.route.reverse({
    authorId: user.pub
  });

  var chain = peer.gun.get(pagesSoul).get(name);
  return chain.then(function (res) {
    if (res && res.data) {
      console.log("res", res);
      chain.get("data").get("body").put(body);
    } else {
      var data = {
        body: body,
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
var vote = R.curry(function (peer, id, kind, nonce) {
  var votes = peer.gun.get(_Schema.Schema[kind === "up" ? "ThingVotesUp" : "ThingVotesDown"].route.reverse({
    thingId: id
  }));
  return votes.get(nonce).put("1");
});
var topicPrefixes = {
  chatmsg: "chat:",
  comment: "comments:"
};
var index = R.curry(function (peer, thingId, data) {
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

  var thing = peer.gun.get(_Schema.Schema.Thing.route.reverse({
    thingId: thingId
  }));

  var dayStr = _ThingSet.ThingSet.dayStr(data.timestamp);

  var _dayStr$split = dayStr.split("/"),
      _dayStr$split2 = _slicedToArray(_dayStr$split, 3),
      year = _dayStr$split2[0],
      month = _dayStr$split2[1],
      day = _dayStr$split2[2];

  var topicPrefix = topicPrefixes[data.kind] || "";
  var baseTopicName = data.topic.toLowerCase().trim();
  var topicName = topicPrefix + baseTopicName;
  var topic = peer.gun.get(_Schema.Schema.Topic.route.reverse({
    topicName: topicName
  }));
  var topicDay = peer.gun.get(_Schema.Schema.TopicDay.route.reverse({
    topicName: topicName,
    year: year,
    month: month,
    day: day
  }));

  if (!data.skipAll && data.topic !== "all") {
    var allname = "".concat(topicPrefix, "all");
    var allTopic = peer.gun.get(_Schema.Schema.Topic.route.reverse({
      topicName: allname
    }));
    var allTopicDay = peer.gun.get(_Schema.Schema.TopicDay.route.reverse({
      topicName: allname,
      year: year,
      month: month,
      day: day
    }));
    allTopic.set(thing);
    allTopicDay.set(thing);
  }

  if (data.kind === "submission") {
    var urlInfo = data.url ? (0, _uriJs.parse)(data.url) : {};
    var domainName = (data.url ? (urlInfo.host || urlInfo.scheme || "").replace(/^www\./, "") : "self.".concat(data.topic)).toLowerCase();
    var domain = peer.gun.get(_Schema.Schema.Domain.route.reverse({
      domainName: domainName
    }));
    domain.set(thing);

    if (data.url) {
      var urlNode = peer.gun.get(_Schema.Schema.URL.route.reverse({
        url: data.url
      })); // thing.get("url").put(urlNode);

      urlNode.set(thing);
    }
  }

  if (data.opId) {
    var allcomments = peer.gun.get(_Schema.Schema.ThingAllComments.route.reverse({
      thingId: data.opId
    }));
    allcomments.set(thing);
  }

  if (data.replyToId || data.opId) {
    var comments = peer.gun.get(_Schema.Schema.ThingComments.route.reverse({
      thingId: data.replyToId || data.opId
    }));
    comments.set(thing);
  }

  topic.set(thing);
  topicDay.set(thing);
});
var Thing = {
  put: put,
  submit: submit,
  comment: comment,
  chat: chat,
  writePage: writePage,
  vote: vote,
  index: index
};
exports.Thing = Thing;

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var tokenize = function tokenize(source) {
  var tokenMap = (source || "").split("\n").reduce(function (def, line) {
    var tokens = line.trim().split(" ").map(R.trim).filter(function (x) {
      return x;
    });
    if (!tokens.length) return def;
    return R.assocPath(tokens, {}, def);
  }, {});

  var isPresent = function isPresent(p) {
    var check = p;
    if (typeof p === "string") check = p.split(" ");
    return check && R.path(check, tokenMap);
  };

  var getValues = function getValues(p) {
    return R.keysIn(isPresent(p));
  };

  var getValue = function getValue(p) {
    return getValues(p)[0] || null;
  };

  var getLastValue = function getLastValue(p) {
    return getValues(p).pop() || null;
  };

  var getValueChain = function getValueChain(p) {
    var keys = typeof p === "string" ? p.split(" ") : p;
    var values = [];
    var next = p;

    while (next) {
      next = getValue([].concat(_toConsumableArray(keys), values));
      next && values.push(next);
    }

    return values;
  };

  var getPairs = function getPairs(p) {
    var keys = typeof p === "string" ? p.split(" ") : p;
    return getValues(keys).reduce(function (pairs, key) {
      var val = getValue([].concat(_toConsumableArray(keys), [key]));
      return [].concat(_toConsumableArray(pairs), [[key, val]]);
    }, []);
  };

  return {
    source: source,
    isPresent: isPresent,
    getValue: getValue,
    getValues: getValues,
    getLastValue: getLastValue,
    getValueChain: getValueChain,
    getPairs: getPairs
  };
};

var Tokenizer = {
  tokenize: tokenize
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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var isLegacyThing = function isLegacyThing(schema, data) {
  var dataSoul = R.path(["data", "#"], data);
  var newest = R.without(["comments", "allcomments", "votesup", "votesdown"], R.keys(R.path(["_", ">"], data))).map(function (key) {
    return R.path(["_", ">", key], data);
  }).sort().pop();

  var _ref = schema.ThingData.route.match(dataSoul) || {},
      thingId = _ref.thingId;

  var id = R.prop("id", data);
  return id && id === thingId && newest && newest < 1543102814945;
};

var thingHashMatchesSoul = function thingHashMatchesSoul(_schema, data) {
  var id = R.prop("id", data);
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

var signedThingDataMatches = function signedThingDataMatches(_schema, data) {
  var authorId = (R.path(["author", "#"], data) || "").substr(1) || undefined;
  var signedId = R.prop("authorId", _Schema.Schema.ThingDataSigned.route.match(R.path(["data", "#"], data)));
  return authorId && authorId === signedId;
};

var thingDataMatchesOriginalHash = function thingDataMatchesOriginalHash(_schema, data) {
  var originalHash = R.prop("originalHash", data);
  var id = R.prop("thingId", _Schema.Schema.ThingData.route.match(R.path(["data", "#"], data)));
  return id && id === originalHash;
};

var getIsThingRelatedEdge = function getIsThingRelatedEdge(ajv) {
  return function (nodeTypeName, data, _pSchema, _cPath, parentData) {
    var _ref2 = _Schema.Schema.Thing.route.match(R.path(["_", "#"], parentData) || "") || {},
        thingId = _ref2.thingId;

    var _Schema$nodeTypeName$ = _Schema.Schema[nodeTypeName].route.match(R.prop("#", data) || ""),
        propThingId = _Schema$nodeTypeName$.thingId;

    if (!thingId || thingId !== propThingId) return false;
    return ajv.compile({
      $ref: "schema.json#/definitions/".concat(nodeTypeName, "Edge")
    })(data);
  };
};

var thingDataHashMatches = function thingDataHashMatches(_schema, data) {
  var _ref3 = data || {},
      _ = _ref3._,
      record = _objectWithoutProperties(_ref3, ["_"]); // eslint-disable-line no-unused-vars


  record.timestamp = parseFloat(record.timestamp, 10);

  var _ref4 = _Schema.Schema.ThingData.route.match(R.path(["_", "#"], data) || "") || {},
      thingId = _ref4.thingId;

  return thingId && thingId === (0, _objectHash.default)(record);
};

var isVoteValid = function isVoteValid(argon2, schema, prefix, vote) {
  var _ref5 = schema || {},
      _ref5$algorithm = _ref5.algorithm,
      algorithm = _ref5$algorithm === void 0 ? "argon2d" : _ref5$algorithm,
      _ref5$config = _ref5.config,
      config = _ref5$config === void 0 ? {} : _ref5$config;

  var nonce = Buffer.hasOwnProperty("from") ? Buffer.from(vote, "hex") : new Buffer(vote, "hex");
  var salt = Buffer.hasOwnProperty("from") ? Buffer.from(nonce, "hex") : new Buffer(nonce, "hex");
  var hash = argon2.hash(prefix, {
    salt: salt,
    hashLength: config.hashLength,
    timeCost: config.timeCost,
    memoryCost: config.memoryCost,
    parallelism: config.parallelism,
    raw: true,
    type: argon2[algorithm]
  });
  var off = 0;
  var i;

  for (i = 0; i <= config.complexity - 8; i += 8, off++) {
    if (hash[off] !== 0) return false;
  }

  var mask = 0xff << 8 + i - config.complexity;
  return (hash[off] & mask) === 0;
};

var keysAreProofsOfWork = function keysAreProofsOfWork(schema, data) {
  var argon2 = __webpack_require__(/*! argon2 */ "argon2");

  if (!argon2) return true; // in browser don't bother for now

  var _ref6 = schema || {},
      _ref6$algorithm = _ref6.algorithm,
      algorithm = _ref6$algorithm === void 0 ? "argon2d" : _ref6$algorithm;

  var prefix = R.path(["_", "#"], data);

  if (algorithm !== "argon2d") {
    throw new Error("Only argon2 supported for vote hashes");
  }

  R.without(["_"], R.keys(data)).forEach(function (vote) {
    if (!isVoteValid(argon2, schema, prefix, vote)) {
      console.log("invalid vote", prefix, vote);
      delete data[vote];
    }
  });
  return true;
};

var initAjv = R.compose(function (ajv) {
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
var suppressor = (0, _gunSuppressor.createSuppressor)({
  definitions: _Schema.Schema.definitions,
  init: initAjv
});
exports.suppressor = suppressor;
var gunWireInput = R.curry(function (peer, context) {
  return context.on("in", function wireInput(msg) {
    var _this = this;

    var _ = msg["_"];
    delete msg["_"];
    if ("ping" in msg || "leech" in msg) return;
    if (msg.put && !R.keys(msg.put).length) return;
    var promise = peer.config.disableValidation ? Promise.resolve(msg) : suppressor.validate(msg);
    promise.then(function (validated) {
      if (!validated) return console.log("msg didn't validate", msg);
      msg["_"] = _;
      return _this.to.next(msg);
    }).catch(function (err) {
      return console.error("validate err", msg, err.stack || err);
    });
  });
});
var Validation = {
  isLegacyThing: isLegacyThing,
  thingHashMatchesSoul: thingHashMatchesSoul,
  signedThingDataMatches: signedThingDataMatches,
  thingDataMatchesOriginalHash: thingDataMatchesOriginalHash,
  getIsThingRelatedEdge: getIsThingRelatedEdge,
  thingDataHashMatches: thingDataHashMatches,
  isVoteValid: isVoteValid,
  keysAreProofsOfWork: keysAreProofsOfWork,
  initAjv: initAjv,
  suppressor: suppressor,
  gunWireInput: gunWireInput
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
  get: function get() {
    return _Peer.Peer;
  }
});
Object.defineProperty(exports, "Constants", {
  enumerable: true,
  get: function get() {
    return _Constants.Constants;
  }
});
Object.defineProperty(exports, "Listing", {
  enumerable: true,
  get: function get() {
    return _Listing.Listing;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function get() {
    return _Query.Query;
  }
});
Object.defineProperty(exports, "Schema", {
  enumerable: true,
  get: function get() {
    return _Schema.Schema;
  }
});
Object.defineProperty(exports, "Thing", {
  enumerable: true,
  get: function get() {
    return _Thing.Thing;
  }
});
Object.defineProperty(exports, "ThingSet", {
  enumerable: true,
  get: function get() {
    return _Thing.ThingSet;
  }
});
Object.defineProperty(exports, "ThingDataNode", {
  enumerable: true,
  get: function get() {
    return _Thing.ThingDataNode;
  }
});
Object.defineProperty(exports, "Validation", {
  enumerable: true,
  get: function get() {
    return _Validation.Validation;
  }
});
exports.default = void 0;

var _Peer = __webpack_require__(/*! ./Peer */ "./src/Peer.js");

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

var _Listing = __webpack_require__(/*! ./Listing */ "./src/Listing/index.js");

var _Query = __webpack_require__(/*! ./Query */ "./src/Query.js");

var _Schema = __webpack_require__(/*! ./Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ./Thing */ "./src/Thing/index.js");

var _Validation = __webpack_require__(/*! ./Validation */ "./src/Validation.js");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9HdW5Ob2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdEYXRhU291cmNlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdEZWZpbml0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ05vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ09yYWNsZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nUXVlcnkuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1NvcnQuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1NwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvQ29tbWVudExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9JbmJveExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvUHJvZmlsZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvU3BhY2VMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1RvcGljTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9QYXRoLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL1NwYWNlU3BlYy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvUGVlci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvUXVlcnkuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1NjaGVtYS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdEYXRhTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdTZXQuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Ub2tlbml6ZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImFyZ29uMlwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zY29wZVwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcIm9iamVjdC1oYXNoXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicmFtZGFcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJyb3V0ZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJ1cmktanNcIiJdLCJuYW1lcyI6WyJzaWdudXAiLCJSIiwiY3VycnkiLCJwZWVyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm9wdHMiLCJvayIsImZhaWwiLCJndW4iLCJ1c2VyIiwicmVzb2x2ZSIsImNyZWF0ZSIsImFjayIsImVyciIsImxlYXZlIiwibG9naW4iLCJ0aGVuIiwiYXV0aCIsImlzIiwicmVzdWx0IiwiX29uTG9naW4iLCJsb2dvdXQiLCJpc0xvZ2dlZEluIiwib25Mb2dpbiIsImZuIiwiQXV0aGVudGljYXRpb24iLCJDb25maWciLCJ0YWJ1bGF0b3IiLCJERVZfSU5ERVhFUiIsImluZGV4ZXIiLCJvd25lciIsInVwZGF0ZSIsImNvbXBvc2UiLCJtYXAiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiQ09NTUFORF9SRSIsIlBSRUZJWCIsIlNPVUxfREVMSU1FVEVSIiwiTElTVElOR19TSVpFIiwiTUFYX0hBU0hfU0laRSIsIk1BWF9QT1dfTk9OQ0VfU0laRSIsIk1BWF9UT1BJQ19TSVpFIiwiTUFYX0FVVEhPUl9BTElBU19TSVpFIiwiTUFYX0FVVEhPUl9JRF9TSVpFIiwiTUFYX1VSTF9TSVpFIiwiTUFYX0RPTUFJTl9TSVpFIiwiTUFYX1RISU5HX0tJTkRfU0laRSIsIk1BWF9USElOR19USVRMRV9TSVpFIiwiTUFYX1RISU5HX0JPRFlfU0laRSIsIk1BWF9MSVNUSU5HX0lEU19TSVpFIiwiTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUiLCJNQVhfTElTVElOR19UQUJTX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUiLCJERUZBVUxUX0lOREVYRVIiLCJDb25zdGFudHMiLCJzb3VsIiwicGF0aE9yIiwic3RhdGUiLCJsYXRlc3QiLCJsYXN0Iiwic29ydEJ5IiwiaWRlbnRpdHkiLCJ2YWx1ZXMiLCJlZGdlcyIsInByb3AiLCJkZWNvZGVTRUEiLCJyYXdEYXRhIiwiZGF0YSIsInBhdGgiLCJHdW4iLCJTRUEiLCJpbmRleE9mIiwid2l0aG91dCIsImtleXMiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJyZWR1Y2UiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsInQiLCJxdWVyeSIsIm11bHRpVG9waWMiLCJkb21haW5Tb3VyY2UiLCJkb21haW5zIiwibGVuZ3RoIiwiZCIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsImlkIiwibXVsdGlBdXRob3IiLCJjdXJhdG9yU291cmNlIiwiY3VyYXRvcnMiLCJjdXJhdGUiLCJpZHMiLCJ0aGluZ0lkIiwiVGhpbmciLCJyb3V0ZSIsInJldmVyc2UiLCJvcFNvdXJjZSIsInN1Ym1pc3Npb25JZHMiLCJtdWx0aVN1Ym1pc3Npb24iLCJyZXBsaWVzU291cmNlIiwicmVwbGllc1RvQXV0aG9yIiwicmVwbGllc1RvQXV0aG9ySWQiLCJzb3VyY2VzIiwibGlzdGluZyIsInJlcGxpZXMiLCJvcCIsImN1cmF0b3IiLCJhdXRob3IiLCJkb21haW4iLCJ0b3BpYyIsInNvdXJjZU5hbWVzIiwic291cmNlTmFtZSIsImRlZiIsImZyb21EZWZpbml0aW9uIiwibWVyZ2VMZWZ0IiwibmFtZSIsIkxpc3RpbmdEYXRhU291cmNlIiwiZnJvbVNvdXJjZSIsInNvdXJjZSIsIm93bmVySWQiLCJzcGFjZU5hbWUiLCJ0b2tlbml6ZWQiLCJ0b2tlbml6ZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiaXRlbVNvdXJjZSIsImZpbHRlckZ1bmN0aW9ucyIsInZvdGVGaWx0ZXJGdW5jdGlvbnMiLCJhZGRGaWx0ZXIiLCJwdXNoIiwiYWRkVm90ZUZpbHRlciIsImlkZW50aWNhbCIsInNwbGl0Iiwia2luZCIsInRlc3QiLCJhbGlhcyIsImF1dGhvcklkIiwibHRlIiwiZ3RlIiwidGhpbmciLCJjbWRzIiwidGFnTmFtZSIsImNvbnRlbnRGaWx0ZXIiLCJ2b3RlRmlsdGVyIiwidGhpbmdGaWx0ZXIiLCJnZXRGaWx0ZXJlZElkcyIsInNvcnRlZFJvd3MiLCJsaW1pdCIsImNvdW50IiwiYWZ0ZXIiLCJmaWx0ZXJGbiIsInJvd3MiLCJzbGljZSIsImZpbHRlcmVkIiwiZmV0Y2hCYXRjaCIsInNpemUiLCJQcm9taXNlIiwicm93IiwiaW5MaXN0aW5nIiwiUE9TX0lEIiwic3BsaWNlIiwiUE9TX1ZBTCIsInNwZWMiLCJ0aGluZ01ldGEiLCJ0aGluZ1NvdWwiLCJzY29yZXMiLCJMaXN0aW5nRmlsdGVyIiwiUE9TX0lEWCIsInJvd3NUb0lkcyIsInJvd3NUb0l0ZW1zIiwicHJvcE9yIiwic291bEZyb21QYXRoIiwiZ2V0Um93Iiwibm9kZSIsImlkeCIsImlmRWxzZSIsImluc2VydCIsImFsd2F5cyIsInBhcnNlRmxvYXQiLCJ0cmltIiwiaXRlbUtleXMiLCJmaWx0ZXIiLCJzb3J0Um93cyIsInNvcnRXaXRoIiwiYXNjZW5kIiwiY29uZCIsImlzTmlsIiwiSW5maW5pdHkiLCJUIiwic29ydGVkSWRzIiwiZGlmZiIsInVwZGF0ZWRJdGVtcyIsInJlbW92ZUlkcyIsIm1heFNpemUiLCJyZW1vdmVkIiwiaW5kZXhCeSIsImJ5SWQiLCJjaGFuZ2VzIiwidXBkYXRlZCIsInRvUmVwbGFjZSIsIm1heElkeCIsInBhcnNlZCIsInJhd1ZhbHVlIiwiaSIsInZhbHVlIiwiZXhpc3RpbmciLCJhbGxTb3J0ZWQiLCJzb3J0ZWQiLCJtaXNzaW5nIiwiYWRkZWQiLCJjb25jYXQiLCJqb2luIiwiaW5zZXJ0ZWQiLCJwb3AiLCJyZXBsYWNlZCIsImNvbnNvbGUiLCJsb2ciLCJjYXRlZ29yaXplRGlmZiIsIm9yaWdpbmFsIiwiYWxsS2V5cyIsIl9kaWZmSWR4IiwiZGlmZklkIiwiX29yaWdJZHgiLCJvcmlnSWQiLCJ1bmlvblJvd3MiLCJ1bmlxQnkiLCJyb3dzRnJvbVNvdWxzIiwicmVhZCIsIkxpc3RpbmdOb2RlIiwidXBkYXRlTGlzdGluZyIsIm9yYyIsIm5ld1Njb3BlIiwidG9JdGVtcyIsIndyaXRlIiwib25QdXQiLCJ1cGRhdGVkU291bCIsInVwZGF0ZWRJZHMiLCJUaGluZ1ZvdGVDb3VudHMiLCJtYXRjaCIsImlzU3RpY2t5IiwiZXF1YWxzIiwiZ2V0QWNjZXNzZXMiLCJsaXN0ZW4iLCJMaXN0aW5nT3JhY2xlIiwiZnJvbVNwZWMiLCJwYXRocyIsImdldFJvd3NGcm9tU291bHMiLCJmcm9tUGF0aCIsImdldFNwZWMiLCJoYXNJbmRleGVyIiwiY2FsY3VsYXRlIiwiTGlzdGluZ1F1ZXJ5IiwidG9JZHMiLCJ2b3RlU29ydCIsImNvbnRhaW5zIiwidGltZVNvcnQiLCJzb3J0cyIsIm5ldyIsIm11bHRpcGx5IiwiRGF0ZSIsImdldFRpbWUiLCJvbGQiLCJhY3RpdmUiLCJ0aW1lc3RhbXAiLCJsYXN0QWN0aXZlIiwidG9wIiwieCIsImNvbW1lbnRzIiwiZGlzY3Vzc2VkIiwic2NvcmUiLCJzZWNvbmRzIiwib3JkZXIiLCJNYXRoIiwibG9nMTAiLCJtYXgiLCJhYnMiLCJob3QiLCJzaWduIiwiYmVzdCIsInVwcyIsImRvd25zIiwibiIsInoiLCJsZWZ0IiwicmlnaHQiLCJzcXJ0IiwidW5kZXIiLCJjb250cm92ZXJzaWFsIiwibWFnbml0dWRlIiwiYmFsYW5jZSIsInRvSXRlbSIsImZyb21UaGluZ1NldHMiLCJwaXBlIiwidW5pb24iLCJMaXN0aW5nU29ydCIsImFwcGx5IiwiYXAiLCJvZiIsImFzc29jIiwiZ2V0U291cmNlIiwiZXh0cmEiLCJnZXRXaWtpUGFnZSIsImJvZHkiLCJMaXN0aW5nU3BlYyIsIkNvbW1lbnRMaXN0aW5nIiwid2l0aFJvdXRlIiwic3BsaXRUb3BpY3MiLCJ0YWIiLCJEb21haW5MaXN0aW5nIiwiZGlmZkRhdGEiLCJ1cGRhdGVkQXV0aG9yZWQiLCJvcElkIiwiVGhpbmdDb21tZW50cyIsInJlcGx5SWRzIiwiSW5ib3hMaXN0aW5nIiwiUHJvZmlsZUxpc3RpbmciLCJyb3V0ZVByb3BzIiwiU3BhY2VMaXN0aW5nIiwib3JpZ2luYWxEYXRhIiwicmVtb3ZlZElkcyIsInZvdGVDb3VudHNNYXRjaCIsInRoaW5nTWF0Y2giLCJUaGluZ0RhdGFTaWduZWQiLCJhdXRob3JNYXRjaCIsIlNFQUF1dGhvciIsImZyb21QYWdlSWQiLCJleGlzdGluZ0tleXMiLCJ3b3JrIiwibWV0aG9kIiwicHJpb3JpdHkiLCJzdWJtaXRUbyIsIlRvcGljTGlzdGluZyIsInR5cGVzIiwiTGlzdGluZ1R5cGUiLCJzcGxpdERvbWFpbnMiLCJ0b0xvd2VyIiwiZGVmYXVsdFRvIiwiUGF0aCIsInNwYWNlQ29uZmlnUGFnZU5hbWUiLCJzb3VyY2VXaXRoRGVmYXVsdHMiLCJnZXRDb25maWciLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwiaW5pdCIsImNvbmZpZyIsImxlZWNoIiwiZGlzYWJsZVZhbGlkYXRpb24iLCJub0d1biIsImxvY2FsU3RvcmFnZSIsInBlcnNpc3QiLCJyZXN0IiwiY2ZnIiwicmFkaXNrIiwib24iLCJndW5XaXJlSW5wdXQiLCJzdG9yZUZuIiwic3RvcmUiLCJhIiwicmV0cnkiLCJzZW5kTGVlY2giLCJfIiwiY3JlYXRlU2NvcGUiLCJzdWJtaXQiLCJjb21tZW50IiwiY2hhdCIsIndyaXRlUGFnZSIsInZvdGUiLCJxdWVyaWVzIiwiUGVlciIsImVtcHR5UHJvbWlzZSIsInVuaW9uQXJyYXlzIiwidG9waWNTb3VscyIsInBhcmFtcyIsImRheXMiLCJkYXlTdHJpbmdzIiwib25lRGF5Iiwic3RhcnQiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJtZXRhIiwicmVwbHlUb1NvdWwiLCJvcFNvdWwiLCJ0aGluZ2lkIiwicmVwbHlUb0lkIiwidGhpbmdWb3RlQ291bnQiLCJ2b3RlVHlwZSIsInRoaW5nVm90ZXNVcCIsInRoaW5nVm90ZXNEb3duIiwidGhpbmdBbGxDb21tZW50c0NvdW50IiwiY29tcHV0ZVRoaW5nU2NvcmVzIiwidXAiLCJkb3duIiwidm90ZXMiLCJtdWx0aVRoaW5nTWV0YSIsInByb21pc2VzIiwibXVsdGlRdWVyeSIsInNpbmdsZVF1ZXJ5IiwicGx1cmFsIiwic2luZ2xlIiwiY29sbGF0ZSIsIml0ZW1zIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwiY3VyYXRlZCIsInN1Ym1pc3Npb25Pbmx5IiwiaWRzMSIsImlkczIiLCJ0aGluZ1Njb3JlcyIsInRoaW5nUmVwbGllcyIsInRoaW5nRGF0YSIsInVzZXJQYWdlcyIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsIndpa2lQYWdlIiwidXNlck1ldGEiLCJ1c2VyQWxpYXMiLCJjcmVhdGVkQXQiLCJuYWIiLCJRdWVyeSIsImRlZmluaXRpb25zIiwic2VhIiwiQVVUSF9TQ0hFTUEiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJUb3BpY0RheSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwYXR0ZXJuIiwicHJvcGVydGllcyIsIiRyZWYiLCJ5ZWFyIiwibWluaW11bSIsIm1heGltdW0iLCJtb250aCIsImRheSIsInJlcXVpcmVkIiwicHJvcHNGcm9tU291bCIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZWRnZU1hdGNoZXNLZXkiLCJhbnlPZiIsIlRvcGljIiwidXJsIiwiVVJMIiwiYWxsT2YiLCJ0aGluZ0tpbmQiLCJvcmlnaW5hbEhhc2giLCJvbmVPZiIsInRoaW5nUmVsYXRlZEVkZ2UiLCJhbGxjb21tZW50cyIsInZvdGVzdXAiLCJ2b3Rlc2Rvd24iLCJyZXBseVRvIiwidGhpbmdIYXNoTWF0Y2hlc1NvdWwiLCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmciLCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoIiwiaXNMZWdhY3lUaGluZyIsIlByb29mT2ZXb3JrVm90ZXMiLCIkYXN5bmMiLCJrZXlzQXJlUHJvb2ZzT2ZXb3JrIiwiYWxnb3JpdGhtIiwiY29tcGxleGl0eSIsImhhc2hMZW5ndGgiLCJ0aW1lQ29zdCIsIm1lbW9yeUNvc3QiLCJwYXJhbGxlbGlzbSIsIlRoaW5nVm90ZXNVcCIsIlRoaW5nVm90ZXNEb3duIiwiVGhpbmdEYXRhIiwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsIiwiY29tbWFuZHMiLCJMaXN0aW5nRGF0YSIsInVzZXJJZCIsImlzQ2hhdCIsInBhdHRlcm5Qcm9wZXJ0aWVzIiwic29ydE5hbWUiLCJlbnVtIiwiVGhpbmdDb21tZW50c0xpc3RpbmciLCJ1c2VyTGlzdGluZ1R5cGUiLCJBdXRob3JSZXBsaWVzTGlzdGluZyIsIkF1dGhvclByb2ZpbGVMaXN0aW5nIiwiQXV0aG9yQ29tbWVudHMiLCJBdXRob3JTdWJtaXNzaW9ucyIsIkF1dGhvclRoaW5ncyIsInJvdXRlcyIsImRlZnNXaXRoUm91dGVzIiwiU2NoZW1hIiwidXJsU3RyIiwiaG9zdCIsInNjaGVtZSIsInJlcGxhY2UiLCJUaGluZ0RhdGFOb2RlIiwiYmluZCIsImRpc3NvYyIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJkYXlOdW0iLCJnZXRVVENEYXRlIiwiVGhpbmdTZXQiLCJwdXQiLCJkYXRhU291bCIsIm1ldGFEYXRhIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsInB1YiIsInRoaW5nc1NvdWwiLCJzdWJtaXNzaW9uc1NvdWwiLCJ0aGluZ3MiLCJzZXQiLCJjb21tZW50c1NvdWwiLCJyZWplY3QiLCJwYWdlc1NvdWwiLCJjaGFpbiIsIm5vbmNlIiwidG9waWNQcmVmaXhlcyIsImNoYXRtc2ciLCJyZWN2IiwidGQiLCJvZmYiLCJ0b3BpY1ByZWZpeCIsImJhc2VUb3BpY05hbWUiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInVybEluZm8iLCJ1cmxOb2RlIiwidG9rZW5NYXAiLCJsaW5lIiwidG9rZW5zIiwiYXNzb2NQYXRoIiwiY2hlY2siLCJrZXlzSW4iLCJnZXRMYXN0VmFsdWUiLCJuZXh0IiwicGFpcnMiLCJUb2tlbml6ZXIiLCJzY2hlbWEiLCJuZXdlc3QiLCJfc2NoZW1hIiwic3Vic3RyIiwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyIsInNpZ25lZElkIiwiZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlIiwiYWp2Iiwibm9kZVR5cGVOYW1lIiwiX3BTY2hlbWEiLCJfY1BhdGgiLCJwYXJlbnREYXRhIiwicHJvcFRoaW5nSWQiLCJjb21waWxlIiwidGhpbmdEYXRhSGFzaE1hdGNoZXMiLCJyZWNvcmQiLCJpc1ZvdGVWYWxpZCIsImFyZ29uMiIsInByZWZpeCIsIkJ1ZmZlciIsImhhc093blByb3BlcnR5IiwiZnJvbSIsInNhbHQiLCJoYXNoIiwicmF3IiwibWFzayIsInJlcXVpcmUiLCJFcnJvciIsImluaXRBanYiLCJhZGRLZXl3b3JkIiwidmFsaWRhdGUiLCJtb2RpZnlpbmciLCJzdXBwcmVzc29yIiwiY29udGV4dCIsIndpcmVJbnB1dCIsIm1zZyIsInByb21pc2UiLCJ2YWxpZGF0ZWQiLCJ0byIsImNhdGNoIiwiZXJyb3IiLCJzdGFjayIsIlZhbGlkYXRpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFDQTs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0MsQ0FBQyxDQUFDQyxLQUFGLENBQ2IsVUFBQ0MsSUFBRCxFQUFPQyxRQUFQLEVBQWlCQyxRQUFqQjtBQUFBLE1BQTJCQyxJQUEzQix1RUFBa0MsRUFBbEM7QUFBQSxTQUNFLHNCQUFZLFVBQUNDLEVBQUQsRUFBS0MsSUFBTCxFQUFjO0FBQ3hCLFFBQUlMLElBQUksSUFBSUEsSUFBSSxDQUFDTSxHQUFiLElBQW9CTixJQUFJLENBQUNNLEdBQUwsQ0FBU0MsSUFBakMsRUFBdUM7QUFDckMsVUFBTUEsSUFBSSxHQUFHUCxJQUFJLENBQUNPLElBQUwsRUFBYjs7QUFFQSx3QkFBUUMsT0FBUixDQUNFRCxJQUFJLENBQUNFLE1BQUwsQ0FDRVIsUUFERixFQUVFQyxRQUZGLEVBR0UsVUFBQVEsR0FBRyxFQUFJO0FBQ0wsWUFBSUEsR0FBRyxDQUFDQyxHQUFSLEVBQWE7QUFDWE4sY0FBSSxDQUFDSyxHQUFHLENBQUNDLEdBQUwsQ0FBSjtBQUNBSixjQUFJLENBQUNLLEtBQUw7QUFDQVosY0FBSSxDQUFDTSxHQUFMLENBQVNDLElBQVQsR0FBZ0JLLEtBQWhCO0FBQ0QsU0FKRCxNQUlPO0FBQ0xaLGNBQUksQ0FBQ2EsS0FBTCxDQUFXWixRQUFYLEVBQXFCQyxRQUFyQixFQUErQlksSUFBL0IsQ0FBb0NWLEVBQXBDO0FBQ0Q7QUFDRixPQVhILEVBWUVELElBWkYsQ0FERjtBQWdCRCxLQW5CRCxNQW1CTztBQUNMRSxVQUFJLENBQUMsbUJBQUQsQ0FBSjtBQUNEO0FBQ0YsR0F2QkQsQ0FERjtBQUFBLENBRGEsQ0FBZjtBQTRCQSxJQUFNUSxLQUFLLEdBQUdmLENBQUMsQ0FBQ0MsS0FBRixDQUFRLFVBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFpQkMsUUFBakI7QUFBQSxTQUNwQixzQkFBWSxVQUFDRSxFQUFELEVBQUtDLElBQUwsRUFBYztBQUN4QixRQUFJTCxJQUFJLElBQUlBLElBQUksQ0FBQ00sR0FBYixJQUFvQk4sSUFBSSxDQUFDTSxHQUFMLENBQVNDLElBQWpDLEVBQXVDO0FBQ3JDLFVBQU1BLElBQUksR0FBR1AsSUFBSSxDQUFDTyxJQUFMLEVBQWI7QUFFQUEsVUFBSSxDQUFDUSxJQUFMLENBQVVkLFFBQVYsRUFBb0JDLFFBQXBCLEVBQThCLFVBQUFRLEdBQUc7QUFBQSxlQUMvQkEsR0FBRyxDQUFDQyxHQUFKLEdBQVVOLElBQUksQ0FBQ0ssR0FBRyxDQUFDQyxHQUFMLENBQWQsR0FBMEJQLEVBQUUsQ0FBQ0osSUFBSSxDQUFDTyxJQUFMLEdBQVlTLEVBQWIsQ0FERztBQUFBLE9BQWpDO0FBR0QsS0FORCxNQU1PO0FBQ0xYLFVBQUksQ0FBQyxtQkFBRCxDQUFKO0FBQ0Q7QUFDRixHQVZELEVBVUdTLElBVkgsQ0FVUSxVQUFBRyxNQUFNLEVBQUk7QUFDaEJqQixRQUFJLENBQUNrQixRQUFMLElBQWlCbEIsSUFBSSxDQUFDa0IsUUFBTCxDQUFjRCxNQUFkLENBQWpCLENBRGdCLENBQ3dCOztBQUN4QyxXQUFPQSxNQUFQO0FBQ0QsR0FiRCxDQURvQjtBQUFBLENBQVIsQ0FBZDs7QUFpQkEsSUFBTUUsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQW5CLElBQUk7QUFBQSxTQUFJQSxJQUFJLENBQUNNLEdBQUwsQ0FBU0MsSUFBVCxHQUFnQkssS0FBaEIsRUFBSjtBQUFBLENBQW5COztBQUNBLElBQU1RLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUFwQixJQUFJO0FBQUEsU0FBSUEsSUFBSSxDQUFDTSxHQUFMLElBQVlOLElBQUksQ0FBQ00sR0FBTCxDQUFTQyxJQUFyQixJQUE2QlAsSUFBSSxDQUFDTyxJQUFMLEdBQVlTLEVBQTdDO0FBQUEsQ0FBdkI7O0FBQ0EsSUFBTUssT0FBTyxHQUFHdkIsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQ0MsSUFBRCxFQUFPc0IsRUFBUDtBQUFBLFNBQWV0QixJQUFJLENBQUNrQixRQUFMLEdBQWdCSSxFQUEvQjtBQUFBLENBQVIsQ0FBaEIsQyxDQUE2RDs7QUFFdEQsSUFBTUMsY0FBYyxHQUFHO0FBQzVCMUIsUUFBTSxFQUFOQSxNQUQ0QjtBQUU1QmdCLE9BQUssRUFBTEEsS0FGNEI7QUFHNUJNLFFBQU0sRUFBTkEsTUFINEI7QUFJNUJDLFlBQVUsRUFBVkEsVUFKNEI7QUFLNUJDLFNBQU8sRUFBUEE7QUFMNEIsQ0FBdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERQOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFTyxJQUFNRyxNQUFNLEdBQUc7QUFDcEJDLFdBQVMsRUFBRSxxQkFBVUMsV0FERDtBQUVwQkMsU0FBTyxFQUFFLHFCQUFVRCxXQUZDO0FBR3BCRSxPQUFLLEVBQUUscUJBQVVGLFdBSEc7QUFJcEJHLFFBQU0sRUFBRS9CLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDTmhDLENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTTtBQUFBO0FBQUEsUUFBRUMsR0FBRjtBQUFBLFFBQU9DLEdBQVA7O0FBQUEsV0FBaUJULE1BQU0sQ0FBQ1EsR0FBRCxDQUFOLEdBQWNDLEdBQS9CO0FBQUEsR0FBTixDQURNLEVBRU5uQyxDQUFDLENBQUNvQyxPQUZJO0FBSlksQ0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hQLElBQU1DLFVBQVUsR0FBRyxRQUFuQjtBQUNBLElBQU1DLE1BQU0sR0FBRyxLQUFmO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLE1BQXZCO0FBRUEsSUFBTUMsWUFBWSxHQUFHLElBQXJCO0FBRUEsSUFBTUMsYUFBYSxHQUFHLEVBQXRCO0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsRUFBM0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsRUFBdkI7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxHQUE5QjtBQUNBLElBQU1DLGtCQUFrQixHQUFHLEdBQTNCLEMsQ0FBZ0M7O0FBQ2hDLElBQU1DLFlBQVksR0FBRyxJQUFyQjtBQUNBLElBQU1DLGVBQWUsR0FBRyxHQUF4QjtBQUNBLElBQU1DLG1CQUFtQixHQUFHLEVBQTVCO0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsR0FBN0I7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxLQUE1QjtBQUVBLElBQU1DLG9CQUFvQixHQUFHLEtBQTdCO0FBQ0EsSUFBTUMsdUJBQXVCLEdBQUcsS0FBaEM7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxJQUE5QjtBQUVBLElBQU1DLDRCQUE0QixHQUFHWCxjQUFyQztBQUNBLElBQU1ZLGdDQUFnQyxHQUFHVixrQkFBekM7QUFDQSxJQUFNVywwQkFBMEIsR0FBRyxFQUFuQztBQUNBLElBQU1DLDBCQUEwQixHQUFHZCxjQUFuQztBQUNBLElBQU1lLDBCQUEwQixHQUFHLEVBQW5DO0FBRUEsSUFBTUMsZUFBZSxHQUFHLHlGQUF4QjtBQUNBLElBQU0vQixXQUFXLEdBQUcseUZBQXBCO0FBRU8sSUFBTWdDLFNBQVMsR0FBRztBQUN2QnZCLFlBQVUsRUFBVkEsVUFEdUI7QUFFdkJDLFFBQU0sRUFBTkEsTUFGdUI7QUFHdkJDLGdCQUFjLEVBQWRBLGNBSHVCO0FBSXZCQyxjQUFZLEVBQVpBLFlBSnVCO0FBS3ZCQyxlQUFhLEVBQWJBLGFBTHVCO0FBTXZCQyxvQkFBa0IsRUFBbEJBLGtCQU51QjtBQU92QkMsZ0JBQWMsRUFBZEEsY0FQdUI7QUFRdkJDLHVCQUFxQixFQUFyQkEscUJBUnVCO0FBU3ZCQyxvQkFBa0IsRUFBbEJBLGtCQVR1QjtBQVV2QkMsY0FBWSxFQUFaQSxZQVZ1QjtBQVd2QkMsaUJBQWUsRUFBZkEsZUFYdUI7QUFZdkJDLHFCQUFtQixFQUFuQkEsbUJBWnVCO0FBYXZCQyxzQkFBb0IsRUFBcEJBLG9CQWJ1QjtBQWN2QkMscUJBQW1CLEVBQW5CQSxtQkFkdUI7QUFldkJDLHNCQUFvQixFQUFwQkEsb0JBZnVCO0FBZ0J2QkMseUJBQXVCLEVBQXZCQSx1QkFoQnVCO0FBaUJ2QkMsdUJBQXFCLEVBQXJCQSxxQkFqQnVCO0FBa0J2QkMsOEJBQTRCLEVBQTVCQSw0QkFsQnVCO0FBbUJ2QkMsa0NBQWdDLEVBQWhDQSxnQ0FuQnVCO0FBb0J2QkMsNEJBQTBCLEVBQTFCQSwwQkFwQnVCO0FBcUJ2QkMsNEJBQTBCLEVBQTFCQSwwQkFyQnVCO0FBc0J2QkMsNEJBQTBCLEVBQTFCQSwwQkF0QnVCO0FBdUJ2QkMsaUJBQWUsRUFBZkEsZUF2QnVCO0FBd0J2Qi9CLGFBQVcsRUFBWEE7QUF4QnVCLENBQWxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCUDs7OztBQURBO0FBR0EsSUFBTWlDLElBQUksR0FBRzdELENBQUMsQ0FBQzhELE1BQUYsQ0FBUyxFQUFULEVBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiLENBQWI7QUFDQSxJQUFNQyxLQUFLLEdBQUcvRCxDQUFDLENBQUM4RCxNQUFGLENBQVMsRUFBVCxFQUFhLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBYixDQUFkO0FBRUEsSUFBTUUsTUFBTSxHQUFHaEUsQ0FBQyxDQUFDZ0MsT0FBRixDQUNiaEMsQ0FBQyxDQUFDaUUsSUFEVyxFQUViakUsQ0FBQyxDQUFDa0UsTUFBRixDQUFTbEUsQ0FBQyxDQUFDbUUsUUFBWCxDQUZhLEVBR2JuRSxDQUFDLENBQUNvRSxNQUhXLEVBSWJMLEtBSmEsQ0FBZjtBQU9BLElBQU1NLEtBQUssR0FBR3JFLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDWmhDLENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTWpDLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxHQUFQLENBQU4sQ0FEWSxFQUVadEUsQ0FBQyxDQUFDb0UsTUFGVSxDQUFkOztBQUtBLFNBQVNHLFNBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCO0FBQzFCLE1BQU1DLElBQUksR0FBR0QsT0FBTyxHQUFHLEVBQUUsR0FBR0E7QUFBTCxHQUFILEdBQW9CQSxPQUF4QztBQUNBLE1BQU1YLElBQUksR0FBRzdELENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQVAsRUFBbUJELElBQW5CLENBQWI7QUFFQSxNQUFJLENBQUNaLElBQUQsSUFBUyxDQUFDYyxHQUFHLENBQUNDLEdBQWQsSUFBcUJmLElBQUksQ0FBQ2dCLE9BQUwsQ0FBYSxHQUFiLE1BQXNCLENBQUMsQ0FBaEQsRUFBbUQsT0FBT0wsT0FBUDtBQUNuRHhFLEdBQUMsQ0FBQzhFLE9BQUYsQ0FBVSxDQUFDLEdBQUQsQ0FBVixFQUFpQjlFLENBQUMsQ0FBQytFLElBQUYsQ0FBT04sSUFBUCxDQUFqQixFQUErQk8sT0FBL0IsQ0FBdUMsVUFBQTlDLEdBQUcsRUFBSTtBQUM1Q3lDLE9BQUcsQ0FBQ0MsR0FBSixDQUFRSyxNQUFSLENBQ0VOLEdBQUcsQ0FBQ0MsR0FBSixDQUFRTSxHQUFSLENBQVlDLElBQVosQ0FBaUJYLE9BQU8sQ0FBQ3RDLEdBQUQsQ0FBeEIsRUFBK0JBLEdBQS9CLEVBQW9Dc0MsT0FBcEMsRUFBNkNYLElBQTdDLENBREYsRUFFRSxLQUZGLEVBR0UsVUFBQXVCLEdBQUc7QUFBQSxhQUFLWCxJQUFJLENBQUN2QyxHQUFELENBQUosR0FBWXlDLEdBQUcsQ0FBQ0MsR0FBSixDQUFRTSxHQUFSLENBQVlHLE1BQVosQ0FBbUJELEdBQW5CLEVBQXdCbEQsR0FBeEIsRUFBNkJzQyxPQUE3QixDQUFqQjtBQUFBLEtBSEw7QUFLRCxHQU5EO0FBT0EsU0FBT0MsSUFBUDtBQUNEOztBQUFBO0FBRU0sSUFBTWEsT0FBTyxHQUFHO0FBQUV6QixNQUFJLEVBQUpBLElBQUY7QUFBUUUsT0FBSyxFQUFMQSxLQUFSO0FBQWVDLFFBQU0sRUFBTkEsTUFBZjtBQUF1QkssT0FBSyxFQUFMQSxLQUF2QjtBQUE4QkUsV0FBUyxFQUFUQTtBQUE5QixDQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ1A7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNZ0IsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQUMsVUFBVTtBQUFBLFNBQzVCLENBQUMsQ0FBQ3hGLENBQUMsQ0FBQ3lGLElBQUYsQ0FBT0QsVUFBVSxDQUFDRSxTQUFsQixFQUE2QixDQUM3QixVQUQ2QixFQUU3QixVQUY2QixFQUc3QixXQUg2QixFQUk3QixvQkFKNkIsRUFLN0IsS0FMNkIsRUFNN0IsT0FONkIsRUFPN0IsT0FQNkIsRUFRN0IsWUFSNkIsQ0FBN0IsQ0FEMEI7QUFBQSxDQUE5Qjs7QUFZQSxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFBSCxVQUFVO0FBQUEsU0FDMUIsQ0FBQyxDQUFDeEYsQ0FBQyxDQUFDeUYsSUFBRixDQUFPRCxVQUFVLENBQUNFLFNBQWxCLEVBQTZCLENBQzdCLE9BRDZCLEVBRTdCLFFBRjZCLEVBRzdCLFFBSDZCLEVBSTdCLG1CQUo2QixFQUs3QixNQUw2QixFQU03QixNQU42QixFQU83QixnQkFQNkIsRUFRN0IsY0FSNkIsRUFTN0IsT0FUNkIsRUFVN0IsWUFWNkIsRUFXN0IsV0FYNkIsRUFZN0IsWUFaNkIsRUFhN0IsV0FiNkIsQ0FBN0IsQ0FEd0I7QUFBQSxDQUE1Qjs7QUFpQkEsSUFBTUUsbUJBQW1CLEdBQUcscUJBQU0sVUFBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWY7QUFBQSxTQUNoQyxrQkFBUU8sR0FBUixDQUNFL0YsQ0FBQyxDQUFDaUMsR0FBRixDQUFNLFVBQUE0QixJQUFJO0FBQUEsV0FBSSx5QkFBWW1DLFlBQVosQ0FBeUJILEtBQXpCLEVBQWdDaEMsSUFBaEMsRUFBc0MyQixVQUF0QyxDQUFKO0FBQUEsR0FBVixFQUFpRU0sS0FBakUsQ0FERixFQUVFOUUsSUFGRixDQUVPLHlCQUFZaUYsU0FGbkIsQ0FEZ0M7QUFBQSxDQUFOLENBQTVCO0FBTUEsSUFBTUMsa0JBQWtCLEdBQUcscUJBQU0sVUFBQ0wsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWY7QUFBQSxTQUMvQixrQkFBUU8sR0FBUixDQUFZL0YsQ0FBQyxDQUFDaUMsR0FBRixDQUFNNEQsS0FBSyxDQUFDTSxHQUFaLEVBQWlCTCxLQUFqQixDQUFaLEVBQ0c5RSxJQURILENBQ1FoQixDQUFDLENBQUNvRyxNQUFGLENBQVNwRyxDQUFDLENBQUNxRyxVQUFYLEVBQXVCLEVBQXZCLENBRFIsRUFFR3JGLElBRkgsQ0FFUSxnQkFBUzhFLEtBRmpCLEVBR0c5RSxJQUhILENBR1EsVUFBQThFLEtBQUs7QUFBQSxXQUFJRixtQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWYsQ0FBdkI7QUFBQSxHQUhiLENBRCtCO0FBQUEsQ0FBTixDQUEzQjs7QUFPQSxJQUFNYyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUFkLFVBQVUsRUFBSTtBQUNsQyxNQUFNZSxRQUFRLEdBQUd2RyxDQUFDLENBQUM4RCxNQUFGLENBQVMsRUFBVCxFQUFhLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBcUIsVUFBckIsQ0FBYixFQUErQzBCLFVBQS9DLENBQWpCO0FBRGtDLE1BRTFCZ0IsSUFGMEIsR0FFakJoQixVQUZpQixDQUUxQmdCLElBRjBCO0FBR2xDLE1BQU1DLFlBQVksR0FBR3pHLENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTSxVQUFBeUUsQ0FBQztBQUFBLHFCQUFPQSxDQUFQLGNBQVlGLElBQVo7QUFBQSxHQUFQLEVBQTJCRCxRQUEzQixDQUFyQjtBQUVBLFNBQU87QUFBRUUsZ0JBQVksRUFBWkE7QUFBRixHQUFQO0FBQ0QsQ0FORDs7QUFRQSxJQUFNRSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBbkIsVUFBVSxFQUFJO0FBQUEsTUFDeEJnQixJQUR3QixHQUNmaEIsVUFEZSxDQUN4QmdCLElBRHdCO0FBRWhDLE1BQU1JLE1BQU0sR0FBRzVHLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXFCLFFBQXJCLENBQVAsRUFBdUNjLFVBQXZDLEtBQXNELEVBQXJFO0FBQ0EsTUFBTWlCLFlBQVksR0FBR3pHLENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTSxVQUFBNEUsQ0FBQztBQUFBLHdCQUFVQSxDQUFWLGNBQWVMLElBQWY7QUFBQSxHQUFQLEVBQThCSSxNQUE5QixDQUFyQjs7QUFDQSxNQUFNRSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBakIsS0FBSztBQUFBLFdBQ2pCLGFBQU1rQixVQUFOLENBQWlCbEIsS0FBakIsRUFBd0I7QUFBRWUsWUFBTSxFQUFOQSxNQUFGO0FBQVVKLFVBQUksRUFBSkE7QUFBVixLQUF4QixFQUEwQ3hGLElBQTFDLENBQStDLFVBQUE4RSxLQUFLO0FBQUEsYUFDbERGLG1CQUFtQixDQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZU4sVUFBZixDQUQrQjtBQUFBLEtBQXBELENBRGlCO0FBQUEsR0FBbkI7O0FBS0EsU0FBTztBQUFFaUIsZ0JBQVksRUFBWkEsWUFBRjtBQUFnQkssU0FBSyxFQUFMQTtBQUFoQixHQUFQO0FBQ0QsQ0FWRDs7QUFZQSxJQUFNRSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFBeEIsVUFBVSxFQUFJO0FBQUEsTUFDekJnQixJQUR5QixHQUNoQmhCLFVBRGdCLENBQ3pCZ0IsSUFEeUI7QUFFakMsTUFBTVMsT0FBTyxHQUFHakgsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBcUIsU0FBckIsQ0FBUCxFQUF3Q2MsVUFBeEMsS0FBdUQsRUFBdkU7QUFFQSxNQUFJLENBQUN5QixPQUFPLENBQUNDLE1BQWIsRUFBcUIsT0FBT1AsV0FBVyxDQUFDbkIsVUFBRCxDQUFsQjtBQUNyQixNQUFNaUIsWUFBWSxHQUFHekcsQ0FBQyxDQUFDaUMsR0FBRixDQUFNLFVBQUFrRixDQUFDO0FBQUEsNkJBQWVBLENBQWYsY0FBb0JYLElBQXBCO0FBQUEsR0FBUCxFQUFtQ1MsT0FBbkMsQ0FBckI7O0FBQ0EsTUFBTUgsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQWpCLEtBQUs7QUFBQSxXQUNqQixhQUFNdUIsV0FBTixDQUFrQnZCLEtBQWxCLEVBQXlCO0FBQUVvQixhQUFPLEVBQVBBLE9BQUY7QUFBV1QsVUFBSSxFQUFKQTtBQUFYLEtBQXpCLEVBQTRDeEYsSUFBNUMsQ0FBaUQsVUFBQThFLEtBQUs7QUFBQSxhQUNwREYsbUJBQW1CLENBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFlTixVQUFmLENBRGlDO0FBQUEsS0FBdEQsQ0FEaUI7QUFBQSxHQUFuQjs7QUFLQSxTQUFPO0FBQUVpQixnQkFBWSxFQUFaQSxZQUFGO0FBQWdCSyxTQUFLLEVBQUxBO0FBQWhCLEdBQVA7QUFDRCxDQVpEOztBQWNBLElBQU1PLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUE3QixVQUFVLEVBQUk7QUFBQSxNQUN6QmdCLElBRHlCLEdBQ2hCaEIsVUFEZ0IsQ0FDekJnQixJQUR5QjtBQUVqQyxNQUFNYyxTQUFTLEdBQUd0SCxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxTQUFELEVBQVksT0FBWixFQUFxQixTQUFyQixDQUFQLEVBQXdDYyxVQUF4QyxDQUFsQjtBQUNBLE1BQU0rQixJQUFJLEdBQUd2SCxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxTQUFELEVBQVksT0FBWixFQUFxQixNQUFyQixDQUFQLEVBQXFDYyxVQUFyQyxDQUFiO0FBRUEsTUFBSSxDQUFDOEIsU0FBUyxDQUFDSixNQUFmLEVBQXVCLE9BQU9QLFdBQVcsQ0FBQ25CLFVBQUQsQ0FBbEI7QUFDdkIsTUFBTWlCLFlBQVksR0FBR3pHLENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTSxVQUFBdUYsRUFBRTtBQUFBLDJCQUFhQSxFQUFiLGNBQW1CRCxJQUFuQixjQUEyQmYsSUFBM0I7QUFBQSxHQUFSLEVBQTJDYyxTQUEzQyxDQUFyQjs7QUFDQSxNQUFNUixLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBakIsS0FBSztBQUFBLFdBQ2pCLGFBQU00QixXQUFOLENBQWtCNUIsS0FBbEIsRUFBeUI7QUFBRTBCLFVBQUksRUFBSkEsSUFBRjtBQUFRRCxlQUFTLEVBQVRBO0FBQVIsS0FBekIsRUFBOEN0RyxJQUE5QyxDQUFtRCxVQUFBOEUsS0FBSztBQUFBLGFBQ3RERixtQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWYsQ0FEbUM7QUFBQSxLQUF4RCxDQURpQjtBQUFBLEdBQW5COztBQUtBLFNBQU87QUFBRWlCLGdCQUFZLEVBQVpBLFlBQUY7QUFBZ0JLLFNBQUssRUFBTEE7QUFBaEIsR0FBUDtBQUNELENBYkQ7O0FBZUEsSUFBTVksYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFBbEMsVUFBVSxFQUFJO0FBQUEsTUFDMUJnQixJQUQwQixHQUNqQmhCLFVBRGlCLENBQzFCZ0IsSUFEMEI7QUFFbEMsTUFBTW1CLFFBQVEsR0FBRzNILENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxVQUFQLEVBQW1Ca0IsVUFBbkIsS0FBa0MsRUFBbkQ7QUFFQSxNQUFJLENBQUNtQyxRQUFRLENBQUNULE1BQWQsRUFBc0IsT0FBT1AsV0FBVyxDQUFDbkIsVUFBRCxDQUFsQjtBQUN0QixNQUFNaUIsWUFBWSxHQUFHekcsQ0FBQyxDQUFDaUMsR0FBRixDQUFNLFVBQUF1RixFQUFFO0FBQUEsMkJBQWFBLEVBQWIsd0JBQTZCaEIsSUFBN0I7QUFBQSxHQUFSLEVBQTZDbUIsUUFBN0MsQ0FBckI7O0FBQ0EsTUFBTWIsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQWpCLEtBQUs7QUFBQSxXQUNqQixhQUFNK0IsTUFBTixDQUFhL0IsS0FBYixFQUFvQjhCLFFBQXBCLEVBQThCLElBQTlCLEVBQ0czRyxJQURILENBQ1EsVUFBQTZHLEdBQUc7QUFBQSxhQUFJQSxHQUFHLENBQUM1RixHQUFKLENBQVEsVUFBQTZGLE9BQU87QUFBQSxlQUFJLGVBQU9DLEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRUgsaUJBQU8sRUFBUEE7QUFBRixTQUEzQixDQUFKO0FBQUEsT0FBZixDQUFKO0FBQUEsS0FEWCxFQUVHOUcsSUFGSCxDQUVRLFVBQUE4RSxLQUFLO0FBQUEsYUFBSUYsbUJBQW1CLENBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFlTixVQUFmLENBQXZCO0FBQUEsS0FGYixDQURpQjtBQUFBLEdBQW5COztBQUtBLFNBQU87QUFBRWlCLGdCQUFZLEVBQVpBLFlBQUY7QUFBZ0JLLFNBQUssRUFBTEE7QUFBaEIsR0FBUDtBQUNELENBWkQ7O0FBY0EsSUFBTW9CLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUExQyxVQUFVLEVBQUk7QUFBQSxNQUNyQmdCLElBRHFCLEdBQ1poQixVQURZLENBQ3JCZ0IsSUFEcUI7QUFFN0IsTUFBTTJCLGFBQWEsR0FBR25JLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXFCLEtBQXJCLENBQVAsRUFBb0NjLFVBQXBDLENBQXRCO0FBRUEsTUFBSSxDQUFDMkMsYUFBYSxDQUFDakIsTUFBbkIsRUFBMkJQLFdBQVcsQ0FBQ25CLFVBQUQsQ0FBWDtBQUMzQixNQUFNaUIsWUFBWSxHQUFHekcsQ0FBQyxDQUFDaUMsR0FBRixDQUNuQixVQUFBdUYsRUFBRTtBQUFBLDZCQUFlQSxFQUFmLHVCQUE4QmhCLElBQTlCO0FBQUEsR0FEaUIsRUFFbkIyQixhQUZtQixDQUFyQjs7QUFJQSxNQUFNckIsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQWpCLEtBQUs7QUFBQSxXQUNqQixhQUFNdUMsZUFBTixDQUFzQnZDLEtBQXRCLEVBQTZCO0FBQUVzQyxtQkFBYSxFQUFiQTtBQUFGLEtBQTdCLEVBQWdEbkgsSUFBaEQsQ0FBcUQsVUFBQThFLEtBQUs7QUFBQSxhQUN4REYsbUJBQW1CLENBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFlTixVQUFmLENBRHFDO0FBQUEsS0FBMUQsQ0FEaUI7QUFBQSxHQUFuQjs7QUFLQSxTQUFPO0FBQUVpQixnQkFBWSxFQUFaQSxZQUFGO0FBQWdCSyxTQUFLLEVBQUxBO0FBQWhCLEdBQVA7QUFDRCxDQWZEOztBQWlCQSxJQUFNdUIsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFBN0MsVUFBVSxFQUFJO0FBQUEsTUFDMUJnQixJQUQwQixHQUNqQmhCLFVBRGlCLENBQzFCZ0IsSUFEMEI7QUFFbEMsTUFBTWdCLEVBQUUsR0FBR3hILENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXFCLFdBQXJCLENBQVAsRUFBMENjLFVBQTFDLENBQVg7QUFDQSxNQUFNK0IsSUFBSSxHQUFHdkgsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBcUIsTUFBckIsQ0FBUCxFQUFxQ2MsVUFBckMsQ0FBYjtBQUVBLE1BQU1pQixZQUFZLEdBQUcsaUJBQVVlLEVBQVYsc0JBQXdCRCxJQUF4QixjQUFnQ2YsSUFBaEMsRUFBckI7O0FBQ0EsTUFBTU0sS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQWpCLEtBQUs7QUFBQSxXQUNqQixhQUFNeUMsZUFBTixDQUFzQnpDLEtBQXRCLEVBQTZCO0FBQzNCMEIsVUFBSSxFQUFKQSxJQUQyQjtBQUUzQmdCLHVCQUFpQixFQUFFZixFQUZRO0FBRzNCM0YsYUFBTyxFQUFFMkQsVUFBVSxDQUFDM0Q7QUFITyxLQUE3QixFQUlHYixJQUpILENBSVEsVUFBQThFLEtBQUs7QUFBQSxhQUFJRixtQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWVOLFVBQWYsQ0FBdkI7QUFBQSxLQUpiLENBRGlCO0FBQUEsR0FBbkI7O0FBT0EsU0FBTztBQUFFaUIsZ0JBQVksRUFBWkEsWUFBRjtBQUFnQkssU0FBSyxFQUFMQTtBQUFoQixHQUFQO0FBQ0QsQ0FkRDs7QUFnQkEsSUFBTTBCLE9BQU8sR0FBRztBQUNkQyxTQUFPLEVBQUVuQyxhQURLO0FBRWRvQyxTQUFPLEVBQUVMLGFBRks7QUFHZE0sSUFBRSxFQUFFVCxRQUhVO0FBSWRVLFNBQU8sRUFBRWxCLGFBSks7QUFLZG1CLFFBQU0sRUFBRXhCLFlBTE07QUFNZHlCLFFBQU0sRUFBRTlCLFlBTk07QUFPZCtCLE9BQUssRUFBRXBDO0FBUE8sQ0FBaEI7QUFVQSxJQUFNcUMsV0FBVyxHQUFHaEosQ0FBQyxDQUFDK0UsSUFBRixDQUFPeUQsT0FBUCxDQUFwQjs7QUFDQSxJQUFNUyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFBQyxHQUFHO0FBQUEsU0FBSWxKLENBQUMsQ0FBQ3lGLElBQUYsQ0FBT3lELEdBQUcsQ0FBQ3hELFNBQVgsRUFBc0JzRCxXQUF0QixLQUFzQyxPQUExQztBQUFBLENBQXRCOztBQUNBLElBQU1HLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQTNELFVBQVU7QUFBQSxTQUMvQnhGLENBQUMsQ0FBQ29KLFNBQUYsQ0FBWTtBQUFFQyxRQUFJLEVBQUVKLFVBQVUsQ0FBQ3pELFVBQUQ7QUFBbEIsR0FBWixFQUE4Q2dELE9BQU8sQ0FBQ2EsSUFBRCxDQUFQLENBQWM3RCxVQUFkLENBQTlDLENBRCtCO0FBQUEsQ0FBakM7O0FBR08sSUFBTThELGlCQUFpQixHQUFHO0FBQy9CSCxnQkFBYyxFQUFkQSxjQUQrQjtBQUUvQlgsU0FBTyxFQUFQQSxPQUYrQjtBQUcvQmpELGFBQVcsRUFBWEEsV0FIK0I7QUFJL0JJLFdBQVMsRUFBVEEsU0FKK0I7QUFLL0JPLG9CQUFrQixFQUFsQkEsa0JBTCtCO0FBTS9CTixxQkFBbUIsRUFBbkJBO0FBTitCLENBQTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hLUDs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTTJELFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLE1BQUQsRUFBOEM7QUFBQSxNQUFyQ0MsT0FBcUMsdUVBQTNCLElBQTJCO0FBQUEsTUFBckJDLFNBQXFCLHVFQUFULElBQVM7O0FBQy9ELE1BQU1DLFNBQVMsR0FBRyxxQkFBVUMsUUFBVixDQUFtQkosTUFBbkIsQ0FBbEI7O0FBQ0EsTUFBTUssR0FBRyxHQUFHLEVBQUUsR0FBR0Y7QUFBTCxHQUFaO0FBRitELE1BR3ZEakUsU0FIdUQsR0FHS2lFLFNBSEwsQ0FHdkRqRSxTQUh1RDtBQUFBLE1BRzVDb0UsUUFINEMsR0FHS0gsU0FITCxDQUc1Q0csUUFINEM7QUFBQSxNQUdsQ0MsU0FIa0MsR0FHS0osU0FITCxDQUdsQ0ksU0FIa0M7QUFBQSxNQUd2QkMsYUFIdUIsR0FHS0wsU0FITCxDQUd2QkssYUFIdUI7QUFBQSxNQUdSQyxRQUhRLEdBR0tOLFNBSEwsQ0FHUk0sUUFIUTs7QUFBQSx1QkFRM0RELGFBQWEsQ0FBQyxtQkFBRCxDQVI4Qzs7QUFBQTs7QUFBQTtBQU03REgsS0FBRyxDQUFDSyxjQU55RCxpQ0FNeENULE9BTndDO0FBQUE7QUFPN0RJLEtBQUcsQ0FBQ00sWUFQeUQsa0NBTzFDVCxTQUFTLG1CQUFZQSxTQUFaLElBQTBCVSxTQVBPO0FBUy9EUCxLQUFHLENBQUNRLFdBQUosR0FBa0JWLFNBQVMsQ0FBQ0csUUFBVixDQUFtQixNQUFuQixLQUE4QkosU0FBaEQ7QUFDQUcsS0FBRyxDQUFDaEksT0FBSixHQUFjaUksUUFBUSxDQUFDLFdBQUQsQ0FBUixJQUF5QixlQUFPakksT0FBOUM7QUFDQWdJLEtBQUcsQ0FBQ2xJLFNBQUosR0FBZ0JtSSxRQUFRLENBQUMsV0FBRCxDQUFSLElBQXlCRCxHQUFHLENBQUNoSSxPQUE3QztBQUNBZ0ksS0FBRyxDQUFDUyxJQUFKLEdBQVdMLFFBQVEsQ0FBQyxLQUFELENBQW5CO0FBQ0FKLEtBQUcsQ0FBQ3JELElBQUosR0FBV3NELFFBQVEsQ0FBQyxNQUFELENBQW5CO0FBQ0FELEtBQUcsQ0FBQ1UsZUFBSixHQUFzQixDQUFDLENBQUM3RSxTQUFTLENBQUMsbUJBQUQsQ0FBakM7QUFDQW1FLEtBQUcsQ0FBQ2xDLFFBQUosR0FBZW9DLFNBQVMsQ0FBQyxTQUFELENBQXhCO0FBQ0FGLEtBQUcsQ0FBQ1csVUFBSixHQUFpQlQsU0FBUyxDQUFDLEtBQUQsQ0FBMUI7QUFDQUYsS0FBRyxDQUFDWSxZQUFKLEdBQW1CLENBQUMsQ0FBQy9FLFNBQVMsQ0FBQyxZQUFELENBQTlCO0FBQ0FtRSxLQUFHLENBQUNhLFNBQUosR0FBZ0JYLFNBQVMsQ0FBQyxRQUFELENBQXpCOztBQUNBRixLQUFHLENBQUNjLFVBQUosR0FBaUIsVUFBQW5ELEVBQUU7QUFBQSxXQUFJLENBQUMsQ0FBQ21DLFNBQVMsQ0FBQ2pFLFNBQVYsQ0FBb0IsQ0FBQyxRQUFELEVBQVc4QixFQUFYLENBQXBCLENBQU47QUFBQSxHQUFuQjs7QUFDQXFDLEtBQUcsQ0FBQ2UsWUFBSixHQUFtQmIsU0FBUyxDQUFDLFdBQUQsQ0FBNUI7QUFDQUYsS0FBRyxDQUFDZ0IsV0FBSixHQUFrQmYsUUFBUSxDQUFDLFdBQUQsQ0FBMUI7QUFDQUQsS0FBRyxDQUFDaUIsU0FBSixHQUFnQmhCLFFBQVEsQ0FBQyxTQUFELENBQXhCOztBQUVBLE1BQUlMLE9BQU8sSUFBSUMsU0FBZixFQUEwQjtBQUN4QkcsT0FBRyxDQUFDSCxTQUFKLEdBQWdCQSxTQUFoQjtBQUNBRyxPQUFHLENBQUMvSCxLQUFKLEdBQVkySCxPQUFaO0FBQ0FJLE9BQUcsQ0FBQ2tCLGNBQUosR0FBcUIsQ0FBQ3BCLFNBQVMsQ0FBQ2pFLFNBQVYsQ0FBb0Isc0JBQXBCLENBQXRCO0FBQ0FtRSxPQUFHLENBQUNuRixJQUFKLG1CQUFvQitFLE9BQXBCLHFCQUFzQ0MsU0FBdEM7QUFDQUcsT0FBRyxDQUFDbUIsVUFBSixHQUFpQnJCLFNBQVMsQ0FBQ0csUUFBVixDQUFtQixLQUFuQixDQUFqQjtBQUNBRCxPQUFHLENBQUNvQixjQUFKLEdBQXFCcEIsR0FBRyxDQUFDbUIsVUFBSixHQUNqQnJCLFNBQVMsQ0FBQ0csUUFBVixDQUFtQixDQUFDLEtBQUQsRUFBUUQsR0FBRyxDQUFDbUIsVUFBWixDQUFuQixDQURpQixHQUVqQixJQUZKO0FBR0Q7O0FBRURuQixLQUFHLENBQUNxQixPQUFKLEdBQWM7QUFDWkMsYUFBUyxFQUFFLEVBREM7QUFFWkMsU0FBSyxFQUFFO0FBQ0xDLGVBQVMsRUFBRXZCLFFBQVEsQ0FBQyxtQkFBRCxDQURkO0FBRUx2QyxVQUFJLEVBQUV1QyxRQUFRLENBQUMsTUFBRCxDQUZUO0FBRW1CO0FBQ3hCd0IsU0FBRyxFQUFFdkIsU0FBUyxDQUFDLElBQUQsQ0FIVDtBQUlMd0IsYUFBTyxFQUFFeEIsU0FBUyxDQUFDLE9BQUQsQ0FKYjtBQUtMeUIsYUFBTyxFQUFFekIsU0FBUyxDQUFDLFFBQUQsQ0FMYjtBQU1MOUMsYUFBTyxFQUFFOEMsU0FBUyxDQUFDLFFBQUQsQ0FOYjtBQU9MbkQsWUFBTSxFQUFFbUQsU0FBUyxDQUFDLE9BQUQsQ0FQWjtBQVFMeEQsY0FBUSxFQUFFd0QsU0FBUyxDQUFDLFNBQUQsQ0FSZDtBQVNMMEIsV0FBSyxFQUFFMUIsU0FBUyxDQUFDLE1BQUQsQ0FUWDtBQVVMMkIsVUFBSSxFQUFFLENBQUNoRyxTQUFTLENBQUMsZ0JBQUQsQ0FWWDtBQVdMaUcsWUFBTSxFQUFFLENBQUNqRyxTQUFTLENBQUMsY0FBRDtBQVhiLEtBRks7QUFlWmtHLFFBQUksRUFBRTtBQUNKTCxhQUFPLEVBQUV4QixTQUFTLENBQUMsV0FBRCxDQURkO0FBRUp5QixhQUFPLEVBQUV6QixTQUFTLENBQUMsWUFBRCxDQUZkO0FBR0o5QyxhQUFPLEVBQUU4QyxTQUFTLENBQUMsWUFBRCxDQUhkO0FBSUpuRCxZQUFNLEVBQUVtRCxTQUFTLENBQUMsV0FBRCxDQUpiO0FBS0oyQixVQUFJLEVBQUUsQ0FBQyxDQUFDaEcsU0FBUyxDQUFDLGdCQUFELENBTGI7QUFNSmlHLFlBQU0sRUFBRSxDQUFDLENBQUNqRyxTQUFTLENBQUMsY0FBRCxDQU5mO0FBT0ptRyxVQUFJLEVBQUU1QixRQUFRLENBQUMsWUFBRDtBQVBWO0FBZk0sR0FBZDtBQTBCQUosS0FBRyxDQUFDaUMsV0FBSixHQUFrQjtBQUNoQlgsYUFBUyxFQUFFLEVBREs7QUFFaEJZLFVBQU0sRUFBRUMsUUFBUSxDQUFDbEMsUUFBUSxDQUFDLFdBQUQsQ0FBVCxFQUF3QixFQUF4QixDQUFSLElBQXVDLElBRi9CO0FBR2hCbUMsVUFBTSxFQUFFRCxRQUFRLENBQUNsQyxRQUFRLENBQUMsV0FBRCxDQUFULEVBQXdCLEVBQXhCLENBQVIsSUFBdUMsSUFIL0I7QUFJaEJvQyxZQUFRLEVBQUVGLFFBQVEsQ0FBQ2xDLFFBQVEsQ0FBQyxhQUFELENBQVQsRUFBMEIsRUFBMUIsQ0FBUixJQUF5QyxJQUpuQztBQUtoQnFDLFlBQVEsRUFBRUgsUUFBUSxDQUFDbEMsUUFBUSxDQUFDLGFBQUQsQ0FBVCxFQUEwQixFQUExQixDQUFSLElBQXlDLElBTG5DO0FBTWhCc0MsWUFBUSxFQUFFSixRQUFRLENBQUNsQyxRQUFRLENBQUMsYUFBRCxDQUFULEVBQTBCLEVBQTFCLENBQVIsSUFBeUMsSUFObkM7QUFPaEJ1QyxZQUFRLEVBQUVMLFFBQVEsQ0FBQ2xDLFFBQVEsQ0FBQyxhQUFELENBQVQsRUFBMEIsRUFBMUIsQ0FBUixJQUF5QztBQVBuQyxHQUFsQjtBQVVBRCxLQUFHLENBQUN5QyxPQUFKLEdBQWN0TSxDQUFDLENBQUN1TSxJQUFGLENBQU92TSxDQUFDLENBQUNpQyxHQUFGLENBQU1qQyxDQUFDLENBQUNzRSxJQUFGLENBQU8sQ0FBUCxDQUFOLEVBQWlCdUYsR0FBRyxDQUFDcUIsT0FBSixDQUFZVSxJQUFaLENBQWlCQyxJQUFsQyxDQUFQLENBQWQ7QUFDQSxTQUFPaEMsR0FBUDtBQUNELENBekVEOztBQTJFTyxJQUFNMkMsaUJBQWlCLEdBQUc7QUFBRWpELFlBQVUsRUFBVkE7QUFBRixDQUExQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRVA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNa0QsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQUMsQ0FBQztBQUFBLFNBQ2YxTSxDQUFDLENBQUNnQyxPQUFGLENBQ0VnSyxRQURGLEVBRUVoTSxDQUFDLENBQUMwRSxJQUFGLENBQU9nSSxDQUFQLENBRkYsQ0FEZTtBQUFBLENBQWpCOztBQU1BLElBQU12RCxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUEzRCxVQUFVLEVBQUk7QUFBQSxNQUMzQjBGLE9BRDJCLEdBQ3FCMUYsVUFEckIsQ0FDM0IwRixPQUQyQjtBQUFBLE1BQ2xCWSxXQURrQixHQUNxQnRHLFVBRHJCLENBQ2xCc0csV0FEa0I7QUFBQSxNQUNMcEcsU0FESyxHQUNxQkYsVUFEckIsQ0FDTEUsU0FESztBQUFBLE1BQ01pSCxVQUROLEdBQ3FCbkgsVUFEckIsQ0FDTW1ILFVBRE47QUFFbkMsTUFBTUMsZUFBZSxHQUFHLEVBQXhCO0FBQ0EsTUFBTUMsbUJBQW1CLEdBQUcsRUFBNUI7O0FBRUEsTUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVk7QUFBQSxXQUFZRixlQUFlLENBQUNHLElBQWhCLENBQXFCL00sQ0FBQyxDQUFDZ0MsT0FBRixPQUFBaEMsQ0FBQyxZQUF0QixDQUFaO0FBQUEsR0FBbEI7O0FBQ0EsTUFBTWdOLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0I7QUFBQSxXQUFZSCxtQkFBbUIsQ0FBQ0UsSUFBcEIsQ0FBeUIvTSxDQUFDLENBQUNnQyxPQUFGLE9BQUFoQyxDQUFDLFlBQTFCLENBQVo7QUFBQSxHQUF0Qjs7QUFFQSxNQUFJa0wsT0FBTyxDQUFDRSxLQUFSLENBQWNHLE9BQWQsQ0FBc0JyRSxNQUExQixFQUNFNEYsU0FBUyxDQUFDLFVBQUFqRyxDQUFDO0FBQUEsV0FBSSxDQUFDLENBQUNuQixTQUFTLENBQUMsQ0FBQyxPQUFELEVBQVVtQixDQUFWLENBQUQsQ0FBZjtBQUFBLEdBQUYsRUFBaUM3RyxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFQLENBQWpDLENBQVQ7QUFDRixNQUFJd0csT0FBTyxDQUFDRSxLQUFSLENBQWNJLE9BQWQsQ0FBc0J0RSxNQUExQixFQUNFNEYsU0FBUyxDQUFDLFVBQUFqRyxDQUFDO0FBQUEsV0FBSSxDQUFDLENBQUNuQixTQUFTLENBQUMsQ0FBQyxRQUFELEVBQVdtQixDQUFYLENBQUQsQ0FBZjtBQUFBLEdBQUYsRUFBa0M3RyxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxNQUFELEVBQVMsVUFBVCxDQUFQLENBQWxDLENBQVQ7QUFDRixNQUFJd0csT0FBTyxDQUFDRSxLQUFSLENBQWNuRSxPQUFkLENBQXNCQyxNQUExQixFQUNFNEYsU0FBUyxDQUFDLFVBQUFqRyxDQUFDO0FBQUEsV0FBSSxDQUFDLENBQUNuQixTQUFTLENBQUMsQ0FBQyxRQUFELEVBQVdtQixDQUFYLENBQUQsQ0FBZjtBQUFBLEdBQUYsRUFBa0MscUJBQWNpQyxNQUFoRCxDQUFUO0FBQ0YsTUFBSW9DLE9BQU8sQ0FBQ0UsS0FBUixDQUFjeEUsTUFBZCxDQUFxQk0sTUFBckIsSUFBK0J5RixVQUFVLEtBQUssT0FBbEQsRUFDRUcsU0FBUyxDQUFDLFVBQUFqRyxDQUFDO0FBQUEsV0FBSSxDQUFDLENBQUNuQixTQUFTLENBQUMsQ0FBQyxPQUFELEVBQVVtQixDQUFWLENBQUQsQ0FBZjtBQUFBLEdBQUYsRUFBaUM3RyxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxNQUFELEVBQVMsT0FBVCxDQUFQLENBQWpDLENBQVQ7QUFFRixNQUNFd0csT0FBTyxDQUFDRSxLQUFSLENBQWN4RSxNQUFkLENBQXFCTSxNQUFyQixJQUNBLENBQUNsSCxDQUFDLENBQUN5RixJQUFGLENBQ0N6RixDQUFDLENBQUNnQyxPQUFGLENBQ0VoQyxDQUFDLENBQUNpTixTQUFGLENBQVksS0FBWixDQURGLEVBRUVqTixDQUFDLENBQUNpRSxJQUZKLEVBR0VqRSxDQUFDLENBQUNrTixLQUFGLENBQVEsR0FBUixDQUhGLENBREQsRUFNQ2hDLE9BQU8sQ0FBQ0UsS0FBUixDQUFjeEUsTUFOZixDQUZILEVBV0VrRyxTQUFTLENBQUMsVUFBQWpHLENBQUM7QUFBQSxXQUFJLENBQUMsQ0FBQ25CLFNBQVMsQ0FBQyxDQUFDLE9BQUQsRUFBVW1CLENBQVYsQ0FBRCxDQUFmO0FBQUEsR0FBRixFQUFpQzdHLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxPQUFULENBQVAsQ0FBakMsQ0FBVDtBQUVGLE1BQUl3RyxPQUFPLENBQUNFLEtBQVIsQ0FBY0ssS0FBZCxDQUFvQnZFLE1BQXhCLEVBQ0U0RixTQUFTLENBQUMsVUFBQUssSUFBSTtBQUFBLFdBQUksQ0FBQyxDQUFDekgsU0FBUyxDQUFDLENBQUMsTUFBRCxFQUFTeUgsSUFBVCxDQUFELENBQWY7QUFBQSxHQUFMLEVBQXNDbk4sQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBUCxDQUF0QyxDQUFUO0FBQ0YsTUFBSXdHLE9BQU8sQ0FBQ0UsS0FBUixDQUFjN0QsSUFBZCxLQUF1QixVQUEzQixFQUNFdUYsU0FBUyxDQUNQOU0sQ0FBQyxDQUFDZ0MsT0FBRixDQUNFaEMsQ0FBQyxDQUFDb04sSUFBRixDQUFPLHFCQUFVL0ssVUFBakIsQ0FERixFQUVFckMsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBUCxDQUZGLENBRE8sQ0FBVDtBQU9GLE1BQUl3RyxPQUFPLENBQUNVLElBQVIsQ0FBYUwsT0FBYixDQUFxQnJFLE1BQXpCLEVBQ0U0RixTQUFTLENBQ1AsVUFBQU8sS0FBSztBQUFBLFdBQUksQ0FBQzNILFNBQVMsQ0FBQyxDQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCMkgsS0FBakIsQ0FBRCxDQUFkO0FBQUEsR0FERSxFQUVQck4sQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FBUCxDQUZPLENBQVQ7QUFJRixNQUFJd0csT0FBTyxDQUFDVSxJQUFSLENBQWFKLE9BQWIsQ0FBcUJ0RSxNQUF6QixFQUNFNEYsU0FBUyxDQUNQLFVBQUFRLFFBQVE7QUFBQSxXQUFJLENBQUM1SCxTQUFTLENBQUMsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQjRILFFBQWxCLENBQUQsQ0FBZDtBQUFBLEdBREQsRUFFUHROLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxVQUFULENBQVAsQ0FGTyxDQUFUO0FBSUYsTUFBSXdHLE9BQU8sQ0FBQ1UsSUFBUixDQUFhM0UsT0FBYixDQUFxQkMsTUFBekIsRUFDRTRGLFNBQVMsQ0FDUCxVQUFBaEUsTUFBTTtBQUFBLFdBQUksQ0FBQ0EsTUFBRCxJQUFXLENBQUNwRCxTQUFTLENBQUMsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQm9ELE1BQWxCLENBQUQsQ0FBekI7QUFBQSxHQURDLEVBRVAscUJBQWNBLE1BRlAsQ0FBVDtBQUlGLE1BQUlvQyxPQUFPLENBQUNVLElBQVIsQ0FBYWhGLE1BQWIsQ0FBb0JNLE1BQXhCLEVBQ0U0RixTQUFTLENBQ1AsVUFBQS9ELEtBQUs7QUFBQSxXQUFJLENBQUNyRCxTQUFTLENBQUMsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQnFELEtBQWpCLENBQUQsQ0FBZDtBQUFBLEdBREUsRUFFUC9JLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxPQUFULENBQVAsQ0FGTyxDQUFUO0FBSUYsTUFBSXdHLE9BQU8sQ0FBQ1UsSUFBUixDQUFhRixJQUFqQixFQUF1Qm9CLFNBQVMsQ0FBQzlNLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxVQUFULENBQVAsQ0FBRCxDQUFUO0FBQ3ZCLE1BQUl3RyxPQUFPLENBQUNVLElBQVIsQ0FBYUQsTUFBakIsRUFDRW1CLFNBQVMsQ0FDUDlNLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDRSxVQUFBc0wsUUFBUTtBQUFBLFdBQUksQ0FBQ0EsUUFBTDtBQUFBLEdBRFYsRUFFRXROLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxVQUFULENBQVAsQ0FGRixDQURPLENBQVQ7QUFPRixNQUFJb0gsV0FBVyxDQUFDQyxNQUFaLEtBQXVCLElBQTNCLEVBQ0VpQixhQUFhLENBQUNoTixDQUFDLENBQUN1TixHQUFGLENBQU16QixXQUFXLENBQUNDLE1BQWxCLENBQUQsRUFBNEJVLE9BQU8sQ0FBQyxDQUFDLE9BQUQsRUFBVSxJQUFWLENBQUQsQ0FBbkMsQ0FBYjtBQUNGLE1BQUlYLFdBQVcsQ0FBQ0csTUFBWixLQUF1QixJQUEzQixFQUNFZSxhQUFhLENBQUNoTixDQUFDLENBQUN3TixHQUFGLENBQU0xQixXQUFXLENBQUNHLE1BQWxCLENBQUQsRUFBNEJRLE9BQU8sQ0FBQyxDQUFDLE9BQUQsRUFBVSxJQUFWLENBQUQsQ0FBbkMsQ0FBYjtBQUNGLE1BQUlYLFdBQVcsQ0FBQ0ksUUFBWixLQUF5QixJQUE3QixFQUNFYyxhQUFhLENBQUNoTixDQUFDLENBQUN1TixHQUFGLENBQU16QixXQUFXLENBQUNJLFFBQWxCLENBQUQsRUFBOEJPLE9BQU8sQ0FBQyxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUQsQ0FBckMsQ0FBYjtBQUNGLE1BQUlYLFdBQVcsQ0FBQ0ssUUFBWixLQUF5QixJQUE3QixFQUNFYSxhQUFhLENBQUNoTixDQUFDLENBQUN3TixHQUFGLENBQU0xQixXQUFXLENBQUNLLFFBQWxCLENBQUQsRUFBOEJNLE9BQU8sQ0FBQyxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUQsQ0FBckMsQ0FBYjtBQUNGLE1BQUlYLFdBQVcsQ0FBQ00sUUFBWixLQUF5QixJQUE3QixFQUNFWSxhQUFhLENBQUNoTixDQUFDLENBQUN1TixHQUFGLENBQU16QixXQUFXLENBQUNNLFFBQWxCLENBQUQsRUFBOEJLLE9BQU8sQ0FBQyxDQUFDLE9BQUQsRUFBVSxPQUFWLENBQUQsQ0FBckMsQ0FBYjtBQUNGLE1BQUlYLFdBQVcsQ0FBQ08sUUFBWixLQUF5QixJQUE3QixFQUNFVyxhQUFhLENBQUNoTixDQUFDLENBQUN3TixHQUFGLENBQU0xQixXQUFXLENBQUNPLFFBQWxCLENBQUQsRUFBOEJJLE9BQU8sQ0FBQyxDQUFDLE9BQUQsRUFBVSxPQUFWLENBQUQsQ0FBckMsQ0FBYjtBQUVGLE1BQUl2QixPQUFPLENBQUNVLElBQVIsQ0FBYUMsSUFBYixDQUFrQjNFLE1BQXRCLEVBQ0U4RixhQUFhLENBQUMsVUFBQVMsS0FBSyxFQUFJO0FBQ3JCLFFBQU1DLElBQUksR0FBRzFOLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE9BQUQsRUFBVSxVQUFWLENBQVAsRUFBOEIrSSxLQUE5QixLQUF3QyxFQUFyRDtBQUVBLFdBQU8sQ0FBQ3ZDLE9BQU8sQ0FBQ1UsSUFBUixDQUFhQyxJQUFiLENBQWtCcEcsSUFBbEIsQ0FDTjtBQUFBO0FBQUEsVUFBRWtJLE9BQUY7QUFBQSxVQUFXTCxRQUFYOztBQUFBLGFBQXlCLENBQUMsQ0FBQ3ROLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDNEksUUFBRCxFQUFXLEtBQVgsRUFBa0JLLE9BQWxCLENBQVAsRUFBbUNELElBQW5DLENBQTNCO0FBQUEsS0FETSxDQUFSO0FBR0QsR0FOWSxDQUFiOztBQVFGLE1BQU1FLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQUgsS0FBSztBQUFBLFdBQUksQ0FBQ2IsZUFBZSxDQUFDbkgsSUFBaEIsQ0FBcUIsVUFBQWpFLEVBQUU7QUFBQSxhQUFJLENBQUNBLEVBQUUsQ0FBQ2lNLEtBQUQsQ0FBUDtBQUFBLEtBQXZCLENBQUw7QUFBQSxHQUEzQjs7QUFDQSxNQUFNSSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFBSixLQUFLO0FBQUEsV0FBSSxDQUFDWixtQkFBbUIsQ0FBQ3BILElBQXBCLENBQXlCLFVBQUFqRSxFQUFFO0FBQUEsYUFBSSxDQUFDQSxFQUFFLENBQUNpTSxLQUFELENBQVA7QUFBQSxLQUEzQixDQUFMO0FBQUEsR0FBeEI7O0FBQ0EsTUFBTUssV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQUwsS0FBSztBQUFBLFdBQUlHLGFBQWEsQ0FBQ0gsS0FBRCxDQUFiLElBQXdCSSxVQUFVLENBQUNKLEtBQUQsQ0FBdEM7QUFBQSxHQUF6Qjs7QUFFQSxTQUFPO0FBQUVLLGVBQVcsRUFBWEEsV0FBRjtBQUFlRixpQkFBYSxFQUFiQSxhQUFmO0FBQThCQyxjQUFVLEVBQVZBO0FBQTlCLEdBQVA7QUFDRCxDQWhHRDs7QUFrR0EsSUFBTUUsY0FBYztBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFDckJsSSxLQURxQixFQUVyQm1JLFVBRnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0VBRytCLEVBSC9CLHNCQUduQkMsS0FIbUIsRUFHbkJBLEtBSG1CLDRCQUdYLEVBSFcsb0NBR1BDLEtBSE8sRUFHUEEsS0FITyw0QkFHQyxDQUhELG9DQUdJQyxLQUhKLEVBR0lBLEtBSEosNEJBR1ksSUFIWixnQkFHa0JDLFFBSGxCLFNBR2tCQSxRQUhsQjtBQUtmQyxnQkFMZSxHQUtSTCxVQUFVLENBQUNNLEtBQVgsRUFMUTtBQU1mQyxvQkFOZSxHQU1KLEVBTkk7O0FBT2ZDLHNCQVBlLEdBT0YsU0FBYkEsVUFBYTtBQUFBLGtCQUFDQyxJQUFELHVFQUFRLEVBQVI7QUFBQSxxQkFDakJDLE9BQU8sQ0FBQzNJLEdBQVIsQ0FDRS9GLENBQUMsQ0FBQ2lDLEdBQUY7QUFBQTtBQUFBO0FBQUEsd0NBQU0saUJBQU0wTSxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBQyxtQ0FEQSxHQUNZLElBRFo7O0FBQUEsK0JBR0FSLFFBSEE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxpQ0FHNEJBLFFBQVEsQ0FBQ08sR0FBRyxDQUFDLHlCQUFZRSxNQUFiLENBQUosQ0FIcEM7O0FBQUE7QUFHVUQsbUNBSFY7O0FBQUE7QUFJSiw4QkFBSUEsU0FBSixFQUFlTCxRQUFRLENBQUN4QixJQUFULENBQWM0QixHQUFkOztBQUpYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFOOztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUtHTixJQUFJLENBQUNTLE1BQUwsQ0FBWVosS0FBWixFQUFtQkEsS0FBSyxHQUFHTyxJQUEzQixDQUxILENBREYsQ0FEaUI7QUFBQSxhQVBFOztBQUFBO0FBQUEsaUJBaUJkSixJQUFJLENBQUNuSCxNQWpCUztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQWtCYnNILFVBQVUsRUFsQkc7O0FBQUE7QUFBQSxrQkFtQmZQLEtBQUssSUFBSU0sUUFBUSxDQUFDckgsTUFBVCxJQUFtQitHLEtBbkJiO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDhDQXNCZGpPLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDTGhDLENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTWpDLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyx5QkFBWXVLLE1BQW5CLENBQU4sQ0FESyxFQUVMWixLQUFLLEdBQUdqTyxDQUFDLENBQUNzTyxLQUFGLENBQVEsQ0FBUixFQUFXTCxLQUFYLENBQUgsR0FBdUJqTyxDQUFDLENBQUNtRSxRQUZ6QixFQUdMbkUsQ0FBQyxDQUFDa0UsTUFBRixDQUFTbEUsQ0FBQyxDQUFDc0UsSUFBRixDQUFPLHlCQUFZeUssT0FBbkIsQ0FBVCxDQUhLLEVBSUxSLFFBSkssQ0F0QmM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBZFIsY0FBYztBQUFBO0FBQUE7QUFBQSxHQUFwQjs7QUE2QkEsSUFBTUQsV0FBVyxHQUFHOU4sQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQzRGLEtBQUQsRUFBUW1KLElBQVIsRUFBY2xILE9BQWQ7QUFBQSxTQUMxQixhQUFNbUgsU0FBTixDQUFnQnBKLEtBQWhCLEVBQXVCO0FBQ3JCbEUsYUFBUyxFQUFFcU4sSUFBSSxDQUFDck4sU0FESztBQUVyQnVOLGFBQVMsRUFBRSxlQUFPbkgsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxhQUFPLEVBQVBBO0FBQUYsS0FBM0IsQ0FGVTtBQUdyQnFILFVBQU0sRUFBRSxxQ0FBa0I1SixXQUFsQixDQUE4QnlKLElBQTlCLENBSGE7QUFJckJ2SyxRQUFJLEVBQUUscUNBQWtCa0IsU0FBbEIsQ0FBNEJxSixJQUE1QjtBQUplLEdBQXZCLEVBS0doTyxJQUxILENBS1FnTyxJQUFJLENBQUNsQixXQUxiLENBRDBCO0FBQUEsQ0FBUixDQUFwQjtBQVNPLElBQU1zQixhQUFhLEdBQUc7QUFBRWpHLGdCQUFjLEVBQWRBLGNBQUY7QUFBa0I0RSxnQkFBYyxFQUFkQSxjQUFsQjtBQUFrQ0QsYUFBVyxFQUFYQTtBQUFsQyxDQUF0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SlA7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7V0FFbUMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEM7SUFBNUJ1QixPO0lBQVNSLE07SUFBUUUsTyxZQUF5Qjs7QUFDakQsSUFBTU8sU0FBUyxHQUFHdFAsQ0FBQyxDQUFDaUMsR0FBRixDQUFNakMsQ0FBQyxDQUFDc0UsSUFBRixDQUFPdUssTUFBUCxDQUFOLENBQWxCO0FBQ0EsSUFBTVUsV0FBVyxHQUFHdlAsQ0FBQyxDQUFDaUMsR0FBRixDQUFNakMsQ0FBQyxDQUFDc08sS0FBRixDQUFRLENBQVIsRUFBVyxDQUFYLENBQU4sQ0FBcEI7QUFDQSxJQUFNOUUsTUFBTSxHQUFHeEosQ0FBQyxDQUFDd1AsTUFBRixDQUFTLEVBQVQsRUFBYSxRQUFiLENBQWY7QUFDQSxJQUFNQyxZQUFZLEdBQUd6UCxDQUFDLENBQUNDLEtBQUYsQ0FBUSxVQUFDNEIsT0FBRCxFQUFVNkMsSUFBVjtBQUFBLG1CQUFzQixxQkFBVXBDLE1BQWhDLFNBQXlDb0MsSUFBekMsZUFBa0Q3QyxPQUFsRDtBQUFBLENBQVIsQ0FBckI7QUFFQSxJQUFNNk4sTUFBTSxHQUFHMVAsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQzBQLElBQUQsRUFBT0MsR0FBUDtBQUFBLFNBQ3JCNVAsQ0FBQyxDQUFDZ0MsT0FBRixDQUNFaEMsQ0FBQyxDQUFDNlAsTUFBRixDQUFTN1AsQ0FBQyxDQUFDc0UsSUFBRixDQUFPLFFBQVAsQ0FBVCxFQUEyQnRFLENBQUMsQ0FBQzhQLE1BQUYsQ0FBUyxDQUFULEVBQVk5RCxRQUFRLENBQUM0RCxHQUFELEVBQU0sRUFBTixDQUFwQixDQUEzQixFQUEyRDVQLENBQUMsQ0FBQytQLE1BQUYsQ0FBUyxJQUFULENBQTNELENBREYsRUFFRSxVQUFBcEIsR0FBRyxFQUFJO0FBQ0xBLE9BQUcsQ0FBQyxDQUFELENBQUgsR0FBU3FCLFVBQVUsQ0FBQ3JCLEdBQUcsQ0FBQyxDQUFELENBQUosQ0FBbkI7QUFDQSxXQUFPQSxHQUFQO0FBQ0QsR0FMSCxFQU1FM08sQ0FBQyxDQUFDaUMsR0FBRixDQUFNakMsQ0FBQyxDQUFDaVEsSUFBUixDQU5GLEVBT0VqUSxDQUFDLENBQUNrTixLQUFGLENBQVEsR0FBUixDQVBGLEVBUUVsTixDQUFDLENBQUN3UCxNQUFGLENBQVMsRUFBVCxZQUFnQkksR0FBaEIsRUFSRixFQVNFRCxJQVRGLENBRHFCO0FBQUEsQ0FBUixDQUFmO0FBYUEsSUFBTU8sUUFBUSxHQUFHbFEsQ0FBQyxDQUFDZ0MsT0FBRixDQUNmaEMsQ0FBQyxDQUFDbVEsTUFBRixDQUNFblEsQ0FBQyxDQUFDZ0MsT0FBRixDQUNFLFVBQUFHLEdBQUc7QUFBQSxTQUFJLENBQUMsRUFBRUEsR0FBRyxLQUFLLENBQVIsSUFBYUEsR0FBZixDQUFMO0FBQUEsQ0FETCxFQUVFNkosUUFGRixDQURGLENBRGUsRUFPZmhNLENBQUMsQ0FBQytFLElBUGEsQ0FBakI7O0FBVUEsSUFBTXNKLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUFzQixJQUFJO0FBQUEsU0FDZjNQLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDRWhDLENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTXlOLE1BQU0sQ0FBQ0MsSUFBRCxDQUFaLENBREYsRUFFRU8sUUFGRixFQUdFUCxJQUhGLENBRGU7QUFBQSxDQUFqQjs7QUFNQSxJQUFNOUgsR0FBRyxHQUFHN0gsQ0FBQyxDQUFDZ0MsT0FBRixDQUFVc04sU0FBVixFQUFxQmpCLElBQXJCLENBQVo7QUFFQSxJQUFNK0IsUUFBUSxHQUFHcFEsQ0FBQyxDQUFDcVEsUUFBRixDQUFXLENBQzFCclEsQ0FBQyxDQUFDc1EsTUFBRixDQUNFdFEsQ0FBQyxDQUFDZ0MsT0FBRixDQUNFaEMsQ0FBQyxDQUFDdVEsSUFBRixDQUFPLENBQ0wsQ0FBQ3ZRLENBQUMsQ0FBQ3dRLEtBQUgsRUFBVXhRLENBQUMsQ0FBQytQLE1BQUYsQ0FBU1UsUUFBVCxDQUFWLENBREssRUFFTCxDQUFDelEsQ0FBQyxDQUFDMFEsQ0FBSCxFQUFNVixVQUFOLENBRkssQ0FBUCxDQURGLEVBS0VoUSxDQUFDLENBQUNzRSxJQUFGLENBQU95SyxPQUFQLENBTEYsQ0FERixDQUQwQixDQUFYLENBQWpCO0FBWUEsSUFBTTRCLFNBQVMsR0FBRzNRLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDaEJoQyxDQUFDLENBQUNpQyxHQUFGLENBQU1qQyxDQUFDLENBQUNzRSxJQUFGLENBQU91SyxNQUFQLENBQU4sQ0FEZ0IsRUFFaEJ1QixRQUZnQixFQUdoQnBRLENBQUMsQ0FBQ21RLE1BQUYsQ0FBU25RLENBQUMsQ0FBQ21FLFFBQVgsQ0FIZ0IsRUFJaEJrSyxJQUpnQixDQUFsQjs7QUFPQSxJQUFNdUMsSUFBSTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFDWGpCLElBRFc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFWGtCLHdCQUZXLDJEQUVJLEVBRko7QUFHWEMscUJBSFcsMkRBR0MsRUFIRDtBQUFBLDRFQUlVLEVBSlYsd0JBSVRDLE9BSlMsRUFJVEEsT0FKUyw4QkFJQyxJQUpEO0FBTUxDLG1CQU5LLEdBTUtoUixDQUFDLENBQUNpUixPQUFGLENBQVVqUixDQUFDLENBQUNtRSxRQUFaLEVBQXNCMk0sU0FBdEIsQ0FOTDtBQU9MSSxnQkFQSyxHQU9FLEVBUEY7QUFRTEMsbUJBUkssR0FRSyxFQVJMO0FBU0w5QyxnQkFUSyxHQVNFLEVBVEY7QUFVTCtDLG1CQVZLLEdBVUssRUFWTDtBQVdQQyxxQkFYTyxHQVdLLEVBWEw7QUFZUEMsa0JBWk8sR0FZRSxDQVpGO0FBQUEsa0RBZUMzQixJQUFJLElBQUksRUFmVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWVOek4sZUFmTTtBQWdCSHFQLGtCQWhCRyxHQWdCTXZGLFFBQVEsQ0FBQzlKLEdBQUQsRUFBTSxFQUFOLENBaEJkOztBQUFBLGdCQWtCSHFQLE1BQU0sSUFBSUEsTUFBTSxLQUFLLENBbEJsQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQW1CSDVDLGVBbkJHLEdBbUJHZSxNQUFNLENBQUNDLElBQUQsRUFBT3pOLEdBQVAsQ0FBTixJQUFxQixDQUFDcVAsTUFBRCxFQUFTLElBQVQsRUFBZSxJQUFmLENBbkJ4QjtBQUFBLGtDQW9CaUM1QyxHQXBCakMsTUFvQkZpQixHQXBCRSw2QkFvQkdwSSxFQXBCSCxzQkFvQlEsSUFwQlIsNEJBb0JjZ0ssUUFwQmQsdUJBb0J5QixJQXBCekIsV0FvQnNDOztBQUUvQzdDLGVBQUcsQ0FBQ0ksT0FBRCxDQUFILEdBQWV5QyxRQUFRLEtBQUssSUFBYixHQUFvQixJQUFwQixHQUEyQnhCLFVBQVUsQ0FBQ3dCLFFBQUQsQ0FBcEQ7QUFDQSxnQkFBSWhLLEVBQUUsSUFBSXdKLE9BQU8sQ0FBQ3hKLEVBQUQsQ0FBakIsRUFBdUJtSCxHQUFHLENBQUNFLE1BQUQsQ0FBSCxHQUFjRixHQUFHLENBQUNJLE9BQUQsQ0FBSCxHQUFlLElBQTdCO0FBQ3ZCLGdCQUFJdkgsRUFBSixFQUFRMEosSUFBSSxDQUFDMUosRUFBRCxDQUFKLEdBQVdtSCxHQUFYOztBQUNSLGdCQUFJQSxHQUFHLENBQUNFLE1BQUQsQ0FBUCxFQUFpQjtBQUNmUixrQkFBSSxDQUFDdEIsSUFBTCxDQUFVNEIsR0FBVjtBQUNELGFBRkQsTUFFTztBQUNMMEMsdUJBQVMsQ0FBQ3RFLElBQVYsQ0FBZTRCLEdBQWY7QUFDRDs7QUFDRCxnQkFBSWlCLEdBQUcsR0FBRzBCLE1BQVYsRUFBa0JBLE1BQU0sR0FBRzFCLEdBQVQ7QUE5QlQ7QUFBQTs7QUFBQTtBQWlDRjZCLGFBakNFLEdBaUNFLENBakNGOztBQUFBO0FBQUEsa0JBaUNLQSxDQUFDLEdBQUdaLFlBQVksQ0FBQzNKLE1BakN0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxvQkFrQ1cySixZQUFZLENBQUNZLENBQUQsQ0FBWixJQUFtQixDQUFDLElBQUQsRUFBTyxJQUFQLENBbEM5QixvQ0FrQ0ZqSyxHQWxDRSxhQWtDRWtLLEtBbENGOztBQUFBLGdCQW9DSmxLLEdBcENJO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBcUNIbUssb0JBckNHLEdBcUNRVCxJQUFJLENBQUMxSixHQUFELENBckNaOztBQXVDVCxnQkFBSW1LLFFBQUosRUFBYztBQUNaLGtCQUFJQSxRQUFRLENBQUM1QyxPQUFELENBQVIsS0FBc0IyQyxLQUExQixFQUFpQztBQUMvQkMsd0JBQVEsQ0FBQzVDLE9BQUQsQ0FBUixHQUFvQjJDLEtBQXBCO0FBQ0FOLHVCQUFPLENBQUM1SixHQUFELENBQVAsR0FBYyxJQUFkO0FBQ0Q7QUFDRixhQUxELE1BS087QUFDQ21ILG1CQURELEdBQ08sQ0FBQyxJQUFELEVBQU9uSCxHQUFQLEVBQVdrSyxLQUFYLENBRFA7QUFHTHJELGtCQUFJLENBQUN0QixJQUFMLENBQVU0QixLQUFWO0FBQ0Q7O0FBaERRO0FBaUM4QjhDLGFBQUMsRUFqQy9CO0FBQUE7QUFBQTs7QUFBQTtBQW1ETEcscUJBbkRLLEdBbURPeEIsUUFBUSxDQUFDL0IsSUFBRCxDQW5EZjtBQW9ETHdELGtCQXBESyxHQW9ESWQsT0FBTyxHQUFHYSxTQUFTLENBQUN0RCxLQUFWLENBQWdCLENBQWhCLEVBQW1CeUMsT0FBbkIsQ0FBSCxHQUFpQ2EsU0FwRDVDO0FBcURMRSxtQkFyREssR0FxREtmLE9BQU8sR0FBR2EsU0FBUyxDQUFDdEQsS0FBVixDQUFnQnlDLE9BQWhCLEVBQXlCYSxTQUFTLENBQUMxSyxNQUFuQyxDQUFILEdBQWdELEVBckQ1RDtBQXNETDZLLGlCQXRESyxHQXNERy9SLENBQUMsQ0FBQ21RLE1BQUYsQ0FBUyxVQUFBeEIsR0FBRztBQUFBLHFCQUFJQSxHQUFHLENBQUNVLE9BQUQsQ0FBSCxLQUFpQixJQUFyQjtBQUFBLGFBQVosRUFBdUN3QyxNQUF2QyxDQXRESDtBQXdEWFIscUJBQVMsR0FBR0EsU0FBUyxDQUNsQlcsTUFEUyxDQUNGaFMsQ0FBQyxDQUFDbVEsTUFBRixDQUFTLFVBQUF4QixHQUFHO0FBQUEscUJBQUlBLEdBQUcsQ0FBQ1UsT0FBRCxDQUFILEtBQWlCLElBQXJCO0FBQUEsYUFBWixFQUF1Q3lDLE9BQXZDLENBREUsRUFFVDdKLE9BRlMsRUFBWjs7QUFJQSxpQkFBU3dKLEdBQVQsR0FBYSxDQUFiLEVBQWdCQSxHQUFDLEdBQUdJLE1BQU0sQ0FBQzNLLE1BQTNCLEVBQW1DdUssR0FBQyxFQUFwQyxFQUF3QztBQUNoQ2pLLGtCQURnQyxHQUMzQnFLLE1BQU0sQ0FBQ0osR0FBRCxDQUFOLENBQVU1QyxNQUFWLENBRDJCO0FBRWhDZSxrQkFGZ0MsR0FFMUJpQyxNQUFNLENBQUNKLEdBQUQsQ0FBTixDQUFVcEMsT0FBVixDQUYwQjtBQUdoQ2xOLGlCQUhnQyxHQUcxQjBQLE1BQU0sQ0FBQ0osR0FBRCxDQUFOLENBQVUxQyxPQUFWLENBSDBCO0FBS3RDLGtCQUFJYSxJQUFHLEtBQUssSUFBUixJQUFnQndCLE9BQU8sQ0FBQzVKLElBQUQsQ0FBM0IsRUFBaUMySixPQUFPLFdBQUl2QixJQUFKLEVBQVAsR0FBb0IsQ0FBQ3BJLElBQUQsRUFBS3JGLEdBQUwsRUFBVThQLElBQVYsQ0FBZSxHQUFmLENBQXBCO0FBQ2xDOztBQUVLQyxvQkFwRUssR0FvRU0sRUFwRU47O0FBc0VYLG1CQUFPSCxLQUFLLENBQUM3SyxNQUFiLEVBQXFCO0FBQ2J5SCxtQkFEYSxHQUNQb0QsS0FBSyxDQUFDSSxHQUFOLEVBRE87QUFFYkMsc0JBRmEsR0FFRmYsU0FBUyxDQUFDYyxHQUFWLEVBRkU7QUFBQSxzQkFHUEMsUUFBUSxJQUFJLENBQUMsSUFBRCxDQUhMLG9DQUdkeEMsS0FIYzs7QUFLbkIsa0JBQUlBLEtBQUcsS0FBSyxJQUFaLEVBQWtCO0FBQ2hCQSxxQkFBRyxHQUFHNUQsUUFBUSxDQUFDc0YsTUFBRCxFQUFTLEVBQVQsQ0FBUixHQUF1QlksUUFBUSxDQUFDaEwsTUFBaEMsR0FBeUMsQ0FBL0M7QUFDQWdMLHdCQUFRLENBQUNuRixJQUFULENBQWM2QyxLQUFkO0FBQ0Q7O0FBRUR1QixxQkFBTyxXQUFJdkIsS0FBSixFQUFQLEdBQW9CLENBQUNqQixLQUFHLENBQUNFLE1BQUQsQ0FBSixFQUFjRixLQUFHLENBQUNJLE9BQUQsQ0FBakIsRUFBNEJrRCxJQUE1QixDQUFpQyxHQUFqQyxDQUFwQjtBQUNEOztBQUVELG1CQUFPWixTQUFTLENBQUNuSyxNQUFqQixFQUF5QjtBQUNqQnlILG1CQURpQixHQUNYMEMsU0FBUyxDQUFDYyxHQUFWLEVBRFc7O0FBR3ZCLGtCQUFJeEQsS0FBRyxJQUFJLENBQUNBLEtBQUcsQ0FBQ0UsTUFBRCxDQUFmLEVBQXlCO0FBQ2pCZSxxQkFEaUIsYUFDUmpCLEtBQUcsQ0FBQ1UsT0FBRCxDQURLOztBQUd2QixvQkFBSU0sSUFBSSxDQUFDQyxLQUFELENBQUosS0FBYyxJQUFsQixFQUF3QjtBQUN0QnVCLHlCQUFPLENBQUN2QixLQUFELENBQVAsR0FBZSxJQUFmO0FBQ0F5Qyx5QkFBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUF1QjFDLEtBQXZCLEVBQTRCRCxJQUFJLENBQUNDLEtBQUQsQ0FBaEM7QUFDRDtBQUNGO0FBQ0Y7O0FBOUZVLDZDQWdHSjVQLENBQUMsQ0FBQytFLElBQUYsQ0FBT29NLE9BQVAsRUFBZ0JqSyxNQUFoQixHQUF5QmlLLE9BQXpCLEdBQW1DLElBaEcvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFKUCxJQUFJO0FBQUE7QUFBQTtBQUFBLEdBQVY7O0FBbUdBLElBQU0yQixjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUMzQixJQUFELEVBQU80QixRQUFQLEVBQW9CO0FBQ3pDLE1BQU1DLE9BQU8sR0FBR3ZDLFFBQVEsQ0FBQ2xRLENBQUMsQ0FBQ29KLFNBQUYsQ0FBWXdILElBQVosRUFBa0I0QixRQUFsQixDQUFELENBQXhCO0FBQ0EsTUFBTVQsS0FBSyxHQUFHLEVBQWQ7QUFDQSxNQUFNZixPQUFPLEdBQUcsRUFBaEI7O0FBRUEsT0FBSyxJQUFJUyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHZ0IsT0FBTyxDQUFDdkwsTUFBNUIsRUFBb0N1SyxDQUFDLEVBQXJDLEVBQXlDO0FBQ3ZDLFFBQU12UCxHQUFHLEdBQUd1USxPQUFPLENBQUNoQixDQUFELENBQW5COztBQUR1QyxnQkFFWi9CLE1BQU0sQ0FBQ2tCLElBQUQsRUFBTzFPLEdBQVAsQ0FBTixJQUFxQixFQUZUO0FBQUE7QUFBQSxRQUVoQ3dRLFFBRmdDO0FBQUEsUUFFdEJDLE1BRnNCLGFBRWE7OztBQUZiLGtCQUdaakQsTUFBTSxDQUFDOEMsUUFBRCxFQUFXdFEsR0FBWCxDQUhNO0FBQUE7QUFBQSxRQUdoQzBRLFFBSGdDO0FBQUEsUUFHdEJDLE1BSHNCLGdCQUdXOzs7QUFFbEQsUUFBSUYsTUFBTSxLQUFLRSxNQUFmLEVBQXVCO0FBQ3JCLFVBQUlGLE1BQUosRUFBWVosS0FBSyxDQUFDaEYsSUFBTixDQUFXNEYsTUFBWDtBQUNaLFVBQUlFLE1BQUosRUFBWTdCLE9BQU8sQ0FBQ2pFLElBQVIsQ0FBYThGLE1BQWI7QUFDYjtBQUNGOztBQUVELFNBQU8sQ0FBQ2QsS0FBRCxFQUFRZixPQUFSLENBQVA7QUFDRCxDQWpCRDs7QUFtQkEsSUFBTThCLFNBQVMsR0FBRzlTLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDaEJoQyxDQUFDLENBQUMrUyxNQUFGLENBQVMvUyxDQUFDLENBQUNzRSxJQUFGLENBQU91SyxNQUFQLENBQVQsQ0FEZ0IsRUFFaEJ1QixRQUZnQixFQUdoQnBRLENBQUMsQ0FBQ29HLE1BQUYsQ0FBU3BHLENBQUMsQ0FBQ2dTLE1BQVgsRUFBbUIsRUFBbkIsQ0FIZ0IsRUFJaEJoUyxDQUFDLENBQUNpQyxHQUFGLENBQU1vTSxJQUFOLENBSmdCLENBQWxCO0FBT0EsSUFBTTJFLGFBQWEsR0FBRyxxQkFBTSxVQUFDbk4sS0FBRCxFQUFRQyxLQUFSO0FBQUEsU0FDMUI0SSxPQUFPLENBQUMzSSxHQUFSLENBQVkvRixDQUFDLENBQUNpQyxHQUFGLENBQU0sVUFBQTRCLElBQUk7QUFBQSxXQUFJZ0MsS0FBSyxDQUFDTSxHQUFOLENBQVV0QyxJQUFWLENBQUo7QUFBQSxHQUFWLENBQVosRUFBNEM3QyxJQUE1QyxDQUFpRDhSLFNBQWpELENBRDBCO0FBQUEsQ0FBTixDQUF0QjtBQUlBLElBQU1HLElBQUksR0FBRyxxQkFBTSxVQUFDcE4sS0FBRCxFQUFRbkIsSUFBUixFQUFjckUsSUFBZCxFQUF1QjtBQUFBLGVBQ0hBLElBQUksSUFBSSxFQURMO0FBQUEsOEJBQ2hDd0IsT0FEZ0M7QUFBQSxNQUNoQ0EsT0FEZ0MsK0JBQ3RCLGVBQU9BLE9BRGU7O0FBR3hDLFNBQU9tUixhQUFhLENBQUNuTixLQUFELEVBQVEsQ0FBQzRKLFlBQVksQ0FBQzVOLE9BQUQsRUFBVTZDLElBQVYsQ0FBYixDQUFSLENBQWIsQ0FBb0QxRCxJQUFwRCxDQUF5RHNPLFNBQXpELENBQVA7QUFDRCxDQUpZLEVBSVYsWUFKVSxDQUFiO0FBTU8sSUFBTTRELFdBQVcsR0FBRztBQUN6QjdELFNBQU8sRUFBUEEsT0FEeUI7QUFFekJSLFFBQU0sRUFBTkEsTUFGeUI7QUFHekJFLFNBQU8sRUFBUEEsT0FIeUI7QUFJekJ2RixRQUFNLEVBQU5BLE1BSnlCO0FBS3pCa0csUUFBTSxFQUFOQSxNQUx5QjtBQU16QlEsVUFBUSxFQUFSQSxRQU55QjtBQU96QjdCLE1BQUksRUFBSkEsSUFQeUI7QUFRekJ4RyxLQUFHLEVBQUhBLEdBUnlCO0FBU3pCeUgsV0FBUyxFQUFUQSxTQVR5QjtBQVV6QkMsYUFBVyxFQUFYQSxXQVZ5QjtBQVd6QmEsVUFBUSxFQUFSQSxRQVh5QjtBQVl6Qk8sV0FBUyxFQUFUQSxTQVp5QjtBQWF6QmxCLGNBQVksRUFBWkEsWUFieUI7QUFjekJ3RCxNQUFJLEVBQUpBLElBZHlCO0FBZXpCckMsTUFBSSxFQUFKQSxJQWZ5QjtBQWdCekIyQixnQkFBYyxFQUFkQSxjQWhCeUI7QUFpQnpCTyxXQUFTLEVBQVRBO0FBakJ5QixDQUFwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwTVA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUssYUFBYTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFDcEJDLEdBRG9CLEVBRXBCcEwsS0FGb0IsRUFHcEJuQyxLQUhvQixFQUlwQm1KLElBSm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLcEJuSCxlQUxvQiwyREFLZCxFQUxjO0FBTXBCaUoscUJBTm9CLDJEQU1SLEVBTlE7O0FBQUEsa0JBUWhCLENBQUNqSixHQUFHLENBQUNYLE1BQUwsSUFBZSxDQUFDNEosU0FBUyxDQUFDNUosTUFSVjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUJBU0drTSxHQUFHLENBQUNDLFFBQUosR0FBZWxOLEdBQWYsQ0FBbUI2QixLQUFLLENBQUNuRSxJQUF6QixDQVRIOztBQUFBO0FBU2Q4TixvQkFUYztBQUFBO0FBQUEsbUJBVU8seUJBQVkyQixPQUFaLENBQW9Cek4sS0FBcEIsRUFBMkJnQyxHQUEzQixFQUFnQ21ILElBQWhDLENBVlA7O0FBQUE7QUFVZDZCLHdCQVZjO0FBV2RNLG1CQVhjLEdBV0oseUJBQVlQLElBQVosQ0FBaUJlLFFBQWpCLEVBQTJCZCxZQUEzQixFQUF5Q0MsU0FBekMsQ0FYSTtBQWFwQixnQkFBSUssT0FBSixFQUFha0IsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUF1QnRLLEtBQUssQ0FBQ25FLElBQTdCLEVBQW1Dc04sT0FBbkM7QUFDYixnQkFBSUEsT0FBSixFQUFhbkosS0FBSyxDQUFDdUwsS0FBTixDQUFZcEMsT0FBWjs7QUFkTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFiZ0MsYUFBYTtBQUFBO0FBQUE7QUFBQSxHQUFuQjs7QUFpQkEsSUFBTUssS0FBSztBQUFBO0FBQUE7QUFBQSwwQkFBRyxrQkFBT0osR0FBUCxFQUFZcEwsS0FBWjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFCeEIsZ0JBQXJCLFNBQXFCQSxJQUFyQixFQUEyQmlOLFdBQTNCLFNBQTJCQSxXQUEzQixFQUF3QzdDLElBQXhDLFNBQXdDQSxJQUF4QztBQUNSOEMsc0JBRFEsR0FDSyxFQURMO0FBRU43TixpQkFGTSxHQUVFdU4sR0FBRyxDQUFDQyxRQUFKLEVBRkY7QUFBQSxvQkFHUSxlQUFPTSxlQUFQLENBQXVCM0wsS0FBdkIsQ0FBNkI0TCxLQUE3QixDQUFtQ0gsV0FBbkMsS0FBbUQsRUFIM0QsRUFHSjNMLE9BSEksU0FHSkEsT0FISTtBQUlOK0wsb0JBSk0sR0FJSzdULENBQUMsQ0FBQzhULE1BQUYsQ0FBUzlMLEtBQUssQ0FBQzRMLEtBQU4sQ0FBWTlMLE9BQVosSUFBdUIsSUFBaEMsQ0FKTDtBQU1aLGdCQUFJQSxPQUFKLEVBQWE0TCxVQUFVLENBQUMzRyxJQUFYLENBQWdCakYsT0FBaEI7QUFDYjRMLHNCQUFVLEdBQUcxVCxDQUFDLENBQUNnUyxNQUFGLENBQVMwQixVQUFULEVBQXFCLGdCQUFTN0wsR0FBVCxDQUFhLGlCQUFRdEQsU0FBUixDQUFrQnFNLElBQWxCLENBQWIsQ0FBckIsQ0FBYjtBQVBZO0FBQUEsbUJBUU51QyxhQUFhLENBQUNDLEdBQUQsRUFBTXBMLEtBQU4sRUFBYW5DLEtBQWIsRUFBb0JXLElBQXBCLEVBQTBCa04sVUFBMUIsRUFBc0MsRUFBdEMsRUFBMENHLFFBQTFDLENBUlA7O0FBQUE7QUFTWixpQkFBVzNSLEdBQVgsSUFBa0IyRCxLQUFLLENBQUNrTyxXQUFOLEVBQWxCO0FBQXVDWCxpQkFBRyxDQUFDWSxNQUFKLENBQVc5UixHQUFYLEVBQWdCOEYsS0FBSyxDQUFDbkUsSUFBdEI7QUFBdkM7O0FBVFk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBTDJQLEtBQUs7QUFBQTtBQUFBO0FBQUEsR0FBWDs7QUFZTyxJQUFNUyxhQUFhLEdBQUc7QUFDM0JkLGVBQWEsRUFBYkEsYUFEMkI7QUFFM0JLLE9BQUssRUFBTEE7QUFGMkIsQ0FBdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTVUsUUFBUSxHQUFHLHFCQUFNLFVBQUNyTyxLQUFELEVBQVFtSixJQUFSLEVBQWMzTyxJQUFkLEVBQXVCO0FBQzVDLE1BQU0rTixRQUFRLEdBQUcsNkJBQWNOLFdBQWQsQ0FBMEJqSSxLQUExQixFQUFpQ21KLElBQWpDLENBQWpCOztBQUNBLE1BQU1tRixLQUFLLEdBQUduVSxDQUFDLENBQUM4RCxNQUFGLENBQVMsRUFBVCxFQUFhLENBQUMsWUFBRCxFQUFlLGNBQWYsQ0FBYixFQUE2Q2tMLElBQTdDLENBQWQ7QUFDQSxNQUFNbEosS0FBSyxHQUFHOUYsQ0FBQyxDQUFDaUMsR0FBRixDQUNaLHlCQUFZd04sWUFBWixDQUF5QnBQLElBQUksQ0FBQ3dCLE9BQUwsSUFBZ0JtTixJQUFJLENBQUNuTixPQUE5QyxDQURZLEVBRVpzUyxLQUZZLENBQWQ7QUFLQSxTQUFPLHlCQUFZQyxnQkFBWixDQUE2QnZPLEtBQTdCLEVBQW9DQyxLQUFwQyxFQUEyQzlFLElBQTNDLENBQWdELFVBQUFxTixJQUFJO0FBQUEsV0FDekQsNkJBQWNOLGNBQWQsQ0FBNkJsSSxLQUE3QixFQUFvQ3dJLElBQXBDLEVBQTBDLEVBQUUsR0FBR2hPLElBQUw7QUFBVytOLGNBQVEsRUFBUkE7QUFBWCxLQUExQyxDQUR5RDtBQUFBLEdBQXBELENBQVA7QUFHRCxDQVhnQixDQUFqQjtBQWFBLElBQU1pRyxRQUFRLEdBQUcscUJBQU0sVUFBQ3hPLEtBQUQsRUFBUW5CLElBQVIsRUFBY3JFLElBQWQsRUFBdUI7QUFDNUMsTUFBTWtILElBQUksR0FBRyx5QkFBWThNLFFBQVosQ0FBcUIzUCxJQUFyQixDQUFiOztBQUVBLE1BQUksQ0FBQzZDLElBQUwsRUFBVyxPQUFPbUgsT0FBTyxDQUFDaE8sT0FBUixDQUFnQixFQUFoQixDQUFQO0FBQ1gsU0FBTzZHLElBQUksQ0FBQytNLE9BQUwsQ0FBYXpPLEtBQWIsRUFBb0JuQixJQUFwQixFQUEwQjFELElBQTFCLENBQStCLFVBQUFnTyxJQUFJLEVBQUk7QUFDNUMsUUFBSUEsSUFBSSxDQUFDdUYsVUFBTCxJQUFtQixDQUFDbFUsSUFBSSxDQUFDbVUsU0FBN0IsRUFBd0M7QUFDdEMsVUFBSSxDQUFDak4sSUFBRCxJQUFTLENBQUNBLElBQUksQ0FBQzBMLElBQW5CLEVBQXlCLE9BQU8seUJBQVlBLElBQVosQ0FBaUJwTixLQUFqQixFQUF3Qm5CLElBQXhCLEVBQThCckUsSUFBOUIsQ0FBUDtBQUN6QixhQUFPa0gsSUFBSSxDQUFDMEwsSUFBTCxDQUFVcE4sS0FBVixFQUFpQjBCLElBQUksQ0FBQ3FNLEtBQXRCLEVBQTZCdlQsSUFBN0IsQ0FBUDtBQUNEOztBQUNELFdBQU82VCxRQUFRLENBQUNyTyxLQUFELEVBQVFtSixJQUFSLEVBQWMzTyxJQUFkLENBQWY7QUFDRCxHQU5NLENBQVA7QUFPRCxDQVhnQixDQUFqQjtBQWFPLElBQU1vVSxZQUFZLEdBQUc7QUFBRVAsVUFBUSxFQUFSQSxRQUFGO0FBQVlHLFVBQVEsRUFBUkE7QUFBWixDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ1A7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7SUFFT3hGLE0sR0FBb0IsQztJQUFaRSxPLEdBQWUsQztBQUM5QixJQUFNMkYsS0FBSyxHQUFHMVUsQ0FBQyxDQUFDaUMsR0FBRixDQUFNakMsQ0FBQyxDQUFDc0UsSUFBRixDQUFPdUssTUFBUCxDQUFOLENBQWQ7QUFDQSxJQUFNNUksU0FBUyxHQUFHakcsQ0FBQyxDQUFDcVEsUUFBRixDQUFXclEsQ0FBQyxDQUFDc0UsSUFBRixDQUFPeUssT0FBUCxDQUFYLENBQWxCOztBQUVBLElBQU00RixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFBblQsRUFBRTtBQUFBLFNBQUkscUJBQU0sVUFBQ3FFLEtBQUQsRUFBUWlDLE9BQVIsRUFBaUJrSCxJQUFqQixFQUEwQjtBQUNyRCxRQUFJQSxJQUFJLENBQUNyRSxVQUFMLENBQWdCN0MsT0FBaEIsQ0FBSixFQUE4QixPQUFPLHVCQUFRLENBQUMySSxRQUFULENBQVA7QUFDOUIsUUFBSXpRLENBQUMsQ0FBQzRVLFFBQUYsQ0FBVzlNLE9BQVgsRUFBb0JrSCxJQUFJLENBQUM5RCxPQUFMLENBQWFFLEtBQWIsQ0FBbUJFLEdBQXZDLENBQUosRUFBaUQsT0FBTyx1QkFBUSxDQUFDbUYsUUFBVCxDQUFQO0FBRWpELFdBQU8sYUFBTXhCLFNBQU4sQ0FBZ0JwSixLQUFoQixFQUF1QjtBQUM1QmxFLGVBQVMsRUFBRXFOLElBQUksQ0FBQ3JOLFNBRFk7QUFFNUJ3TixZQUFNLEVBQUUsSUFGb0I7QUFHNUJELGVBQVMsRUFBRSxlQUFPbkgsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxlQUFPLEVBQVBBO0FBQUYsT0FBM0I7QUFIaUIsS0FBdkIsRUFJSjlHLElBSkksQ0FJQyxVQUFBb0UsR0FBRztBQUFBLGFBQUk1RCxFQUFFLENBQUM0RCxHQUFELEVBQU00SixJQUFOLENBQU47QUFBQSxLQUpKLENBQVA7QUFLRCxHQVRzQixDQUFKO0FBQUEsQ0FBbkI7O0FBV0EsSUFBTTZGLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUFyVCxFQUFFO0FBQUEsU0FBSSxxQkFBTSxVQUFDcUUsS0FBRCxFQUFRaUMsT0FBUixFQUFpQmtILElBQWpCO0FBQUEsV0FDM0IsYUFBTUMsU0FBTixDQUFnQnBKLEtBQWhCLEVBQXVCO0FBQ3JCbEUsZUFBUyxFQUFFcU4sSUFBSSxDQUFDck4sU0FESztBQUVyQnVOLGVBQVMsRUFBRSxlQUFPbkgsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxlQUFPLEVBQVBBO0FBQUYsT0FBM0I7QUFGVSxLQUF2QixFQUdHOUcsSUFISCxDQUdRUSxFQUhSLENBRDJCO0FBQUEsR0FBTixDQUFKO0FBQUEsQ0FBbkI7O0FBT0EsSUFBTXNULEtBQUssR0FBRztBQUNaQyxLQUFHLEVBQUVGLFFBQVEsQ0FDWDdVLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDRWhDLENBQUMsQ0FBQ2dWLFFBQUYsQ0FBVyxDQUFDLENBQVosQ0FERixFQUVFLFVBQUE3UyxHQUFHO0FBQUEsV0FBSUEsR0FBRyxJQUFJLElBQUk4UyxJQUFKLEdBQVdDLE9BQVgsRUFBWDtBQUFBLEdBRkwsRUFHRWxWLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxXQUFQLENBSEYsQ0FEVyxDQUREO0FBUVo2USxLQUFHLEVBQUVOLFFBQVEsQ0FBQzdVLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxXQUFQLENBQUQsQ0FSRDtBQVNaOFEsUUFBTSxFQUFFVCxRQUFRLENBQ2Q7QUFBQSxRQUFHVSxTQUFILFFBQUdBLFNBQUg7QUFBQSxRQUFjQyxVQUFkLFFBQWNBLFVBQWQ7QUFBQSxXQUErQixDQUFDLENBQUQsSUFBTUEsVUFBVSxJQUFJRCxTQUFwQixDQUEvQjtBQUFBLEdBRGMsQ0FUSjtBQVlaRSxLQUFHLEVBQUVaLFFBQVEsQ0FDWDNVLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDRSxVQUFBd1QsQ0FBQztBQUFBLFdBQUksQ0FBQyxDQUFELEdBQUt4SixRQUFRLENBQUN3SixDQUFELEVBQUksRUFBSixDQUFqQjtBQUFBLEdBREgsRUFFRXhWLENBQUMsQ0FBQzhELE1BQUYsQ0FBUyxDQUFULEVBQVksQ0FBQyxPQUFELEVBQVUsT0FBVixDQUFaLENBRkYsQ0FEVyxDQVpEO0FBa0JaMlIsVUFBUSxFQUFFZCxRQUFRLENBQ2hCM1UsQ0FBQyxDQUFDZ0MsT0FBRixDQUNFLFVBQUF3VCxDQUFDO0FBQUEsV0FBSSxDQUFDLENBQUQsR0FBS3hGLFVBQVUsQ0FBQ3dGLENBQUQsRUFBSSxFQUFKLENBQW5CO0FBQUEsR0FESCxFQUVFeFYsQ0FBQyxDQUFDOEQsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVosQ0FGRixDQURnQixDQWxCTjtBQXdCWjRSLFdBQVMsRUFBRWYsUUFBUSxDQUFDLFVBQUFsSCxLQUFLLEVBQUk7QUFDM0IsUUFBTTRILFNBQVMsR0FBR3JWLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxXQUFQLEVBQW9CbUosS0FBcEIsQ0FBbEI7QUFDQSxRQUFNa0ksS0FBSyxHQUFHM0osUUFBUSxDQUFDaE0sQ0FBQyxDQUFDOEQsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVosRUFBa0MySixLQUFsQyxDQUFELEVBQTJDLEVBQTNDLENBQXRCO0FBQ0EsUUFBTW1JLE9BQU8sR0FBR1AsU0FBUyxHQUFHLElBQVosR0FBbUIsVUFBbkM7QUFDQSxRQUFNUSxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLEdBQUwsQ0FBU0YsSUFBSSxDQUFDRyxHQUFMLENBQVNOLEtBQVQsQ0FBVCxFQUEwQixDQUExQixDQUFYLENBQWQ7QUFFQSxRQUFJLENBQUNBLEtBQUwsRUFBWSxPQUFPLGFBQWFDLE9BQXBCO0FBQ1osV0FBTyxDQUFDLENBQUQsSUFBTUMsS0FBSyxHQUFHRCxPQUFPLEdBQUcsS0FBeEIsQ0FBUDtBQUNELEdBUmtCLENBeEJQO0FBaUNaTSxLQUFHLEVBQUV2QixRQUFRLENBQUMsVUFBQWxILEtBQUssRUFBSTtBQUNyQixRQUFNNEgsU0FBUyxHQUFHclYsQ0FBQyxDQUFDc0UsSUFBRixDQUFPLFdBQVAsRUFBb0JtSixLQUFwQixDQUFsQjtBQUNBLFFBQU1rSSxLQUFLLEdBQUczSixRQUFRLENBQUNoTSxDQUFDLENBQUM4RCxNQUFGLENBQVMsQ0FBVCxFQUFZLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FBWixFQUFnQzJKLEtBQWhDLENBQUQsRUFBeUMsRUFBekMsQ0FBdEI7QUFDQSxRQUFNbUksT0FBTyxHQUFHUCxTQUFTLEdBQUcsSUFBWixHQUFtQixVQUFuQztBQUNBLFFBQU1RLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsR0FBTCxDQUFTRixJQUFJLENBQUNHLEdBQUwsQ0FBU04sS0FBVCxDQUFULEVBQTBCLENBQTFCLENBQVgsQ0FBZDtBQUNBLFFBQUlRLElBQUksR0FBRyxDQUFYOztBQUVBLFFBQUlSLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDYlEsVUFBSSxHQUFHLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSVIsS0FBSyxHQUFHLENBQVosRUFBZTtBQUNwQlEsVUFBSSxHQUFHLENBQUMsQ0FBUjtBQUNEOztBQUNELFdBQU8sQ0FBQyxDQUFELElBQU1BLElBQUksR0FBR04sS0FBUCxHQUFlRCxPQUFPLEdBQUcsS0FBL0IsQ0FBUDtBQUNELEdBYlksQ0FqQ0Q7QUErQ1pRLE1BQUksRUFBRXpCLFFBQVEsQ0FBQyxVQUFBbEgsS0FBSyxFQUFJO0FBQ3RCLFFBQU00SSxHQUFHLEdBQUdySyxRQUFRLENBQUNoTSxDQUFDLENBQUM4RCxNQUFGLENBQVMsQ0FBVCxFQUFZLENBQUMsT0FBRCxFQUFVLElBQVYsQ0FBWixFQUE2QjJKLEtBQTdCLENBQUQsRUFBc0MsRUFBdEMsQ0FBcEI7QUFDQSxRQUFNNkksS0FBSyxHQUFHdEssUUFBUSxDQUFDaE0sQ0FBQyxDQUFDOEQsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQVosRUFBK0IySixLQUEvQixDQUFELEVBQXdDLEVBQXhDLENBQXRCO0FBQ0EsUUFBTThJLENBQUMsR0FBR0YsR0FBRyxHQUFHQyxLQUFoQjtBQUVBLFFBQUlDLENBQUMsS0FBSyxDQUFWLEVBQWEsT0FBTyxDQUFQO0FBQ2IsUUFBTUMsQ0FBQyxHQUFHLGNBQVYsQ0FOc0IsQ0FNSTs7QUFDMUIsUUFBTTlKLENBQUMsR0FBRzJKLEdBQUcsR0FBR0UsQ0FBaEI7QUFDQSxRQUFNRSxJQUFJLEdBQUcvSixDQUFDLEdBQUksS0FBSyxJQUFJNkosQ0FBVCxDQUFELEdBQWdCQyxDQUFoQixHQUFvQkEsQ0FBckM7QUFDQSxRQUFNRSxLQUFLLEdBQUdGLENBQUMsR0FBR1YsSUFBSSxDQUFDYSxJQUFMLENBQVdqSyxDQUFDLElBQUksSUFBSUEsQ0FBUixDQUFGLEdBQWdCNkosQ0FBaEIsR0FBcUJDLENBQUMsR0FBR0EsQ0FBTCxJQUFXLElBQUlELENBQUosR0FBUUEsQ0FBbkIsQ0FBOUIsQ0FBbEI7QUFDQSxRQUFNSyxLQUFLLEdBQUcsSUFBSyxJQUFJTCxDQUFMLEdBQVVDLENBQVYsR0FBY0EsQ0FBaEM7QUFFQSxXQUFPLENBQUMsQ0FBRCxJQUFNLENBQUNDLElBQUksR0FBR0MsS0FBUixJQUFpQkUsS0FBdkIsQ0FBUDtBQUNELEdBYmEsQ0EvQ0Y7QUE2RFpDLGVBQWEsRUFBRWxDLFFBQVEsQ0FBQyxVQUFBbEgsS0FBSyxFQUFJO0FBQy9CLFFBQU00SSxHQUFHLEdBQUdySyxRQUFRLENBQUNoTSxDQUFDLENBQUM4RCxNQUFGLENBQVMsQ0FBVCxFQUFZLENBQUMsT0FBRCxFQUFVLElBQVYsQ0FBWixFQUE2QjJKLEtBQTdCLENBQUQsRUFBc0MsRUFBdEMsQ0FBcEI7QUFDQSxRQUFNNkksS0FBSyxHQUFHdEssUUFBUSxDQUFDaE0sQ0FBQyxDQUFDOEQsTUFBRixDQUFTLENBQVQsRUFBWSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQVosRUFBK0IySixLQUEvQixDQUFELEVBQXdDLEVBQXhDLENBQXRCO0FBRUEsUUFBSTRJLEdBQUcsSUFBSSxDQUFQLElBQVlDLEtBQUssSUFBSSxDQUF6QixFQUE0QixPQUFPLENBQVA7QUFDNUIsUUFBTVEsU0FBUyxHQUFHVCxHQUFHLEdBQUdDLEtBQXhCO0FBQ0EsUUFBTVMsT0FBTyxHQUFHVixHQUFHLEdBQUdDLEtBQU4sR0FBY0EsS0FBSyxHQUFHRCxHQUF0QixHQUE0QkEsR0FBRyxHQUFHQyxLQUFsRDtBQUVBLFdBQU8sQ0FBQyxDQUFELFlBQUtRLFNBQUwsRUFBa0JDLE9BQWxCLENBQVA7QUFDRCxHQVRzQjtBQTdEWCxDQUFkO0FBeUVBLElBQU1DLE1BQU0sR0FBRyxxQkFDYixVQUFDblIsS0FBRCxFQUFRMkIsRUFBUixFQUFZd0gsSUFBWjtBQUFBLFNBQ0UsQ0FBQzhGLEtBQUssQ0FBQzlGLElBQUksQ0FBQ3hJLElBQU4sQ0FBTCxJQUFvQnNPLEtBQUssQ0FBQ0MsR0FBM0IsRUFBZ0N2TixFQUFoQyxFQUFvQ3dILElBQXBDLEVBQTBDaE8sSUFBMUMsQ0FBK0MsVUFBQW1CLEdBQUc7QUFBQSxXQUFJLENBQUNxRixFQUFELEVBQUtyRixHQUFMLENBQUo7QUFBQSxHQUFsRCxDQURGO0FBQUEsQ0FEYSxDQUFmO0FBS0EsSUFBTW1SLE9BQU8sR0FBRyxxQkFDZCxVQUFDek4sS0FBRCxFQUFRZ0MsR0FBUixFQUFhbUgsSUFBYjtBQUFBLFNBQXNCLG1CQUFJaFAsQ0FBQyxDQUFDaUMsR0FBRixDQUN4QixVQUFBdUYsRUFBRTtBQUFBLFdBQUl3UCxNQUFNLENBQUNuUixLQUFELEVBQVEyQixFQUFSLEVBQVl3SCxJQUFaLENBQVY7QUFBQSxHQURzQixFQUV4Qm5ILEdBRndCLENBQUosQ0FBdEI7QUFBQSxDQURjLENBQWhCO0FBT0EsSUFBTW9QLGFBQWEsR0FBRyxxQkFDcEIsVUFBQ3BSLEtBQUQsRUFBUUMsS0FBUixFQUFla0osSUFBZjtBQUFBLFNBQ0UsbUJBQUloUCxDQUFDLENBQUNpQyxHQUFGLENBQU00RCxLQUFLLENBQUNNLEdBQVosRUFBaUJMLEtBQWpCLENBQUosRUFDRzlFLElBREgsQ0FDUWhCLENBQUMsQ0FBQ2tYLElBQUYsQ0FDSixnQkFBU0MsS0FETCxFQUVKLGdCQUFTdFAsR0FGTCxFQUdKLFVBQUFBLEdBQUc7QUFBQSxXQUFJeUwsT0FBTyxDQUFDek4sS0FBRCxFQUFRZ0MsR0FBUixFQUFhbUgsSUFBYixDQUFYO0FBQUEsR0FIQyxDQURSLEVBTUdoTyxJQU5ILENBTVFpRixTQU5SLENBREY7QUFBQSxDQURvQixDQUF0QjtBQVdPLElBQU1tUixXQUFXLEdBQUc7QUFDekJ2SSxRQUFNLEVBQU5BLE1BRHlCO0FBRXpCRSxTQUFPLEVBQVBBLE9BRnlCO0FBR3pCK0YsT0FBSyxFQUFMQSxLQUh5QjtBQUl6QmtDLFFBQU0sRUFBTkEsTUFKeUI7QUFLekIxRCxTQUFPLEVBQVBBLE9BTHlCO0FBTXpCb0IsT0FBSyxFQUFMQSxLQU55QjtBQU96QnpPLFdBQVMsRUFBVEEsU0FQeUI7QUFRekJnUixlQUFhLEVBQWJBO0FBUnlCLENBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVIUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU0xTixVQUFVLEdBQUd2SixDQUFDLENBQUNnQyxPQUFGLENBQ2pCaEMsQ0FBQyxDQUFDcVgsS0FBRixDQUFRclgsQ0FBQyxDQUFDb0osU0FBVixDQURpQixFQUVqQnBKLENBQUMsQ0FBQ3NYLEVBQUYsQ0FBSyxDQUFDLDZCQUFjbk8sY0FBZixFQUErQm5KLENBQUMsQ0FBQ21FLFFBQWpDLENBQUwsQ0FGaUIsRUFHakJuRSxDQUFDLENBQUN1WCxFQUhlLEVBSWpCdlgsQ0FBQyxDQUFDcVgsS0FBRixDQUFRclgsQ0FBQyxDQUFDd1gsS0FBRixDQUFRLFlBQVIsQ0FBUixDQUppQixFQUtqQnhYLENBQUMsQ0FBQ3NYLEVBQUYsQ0FBSyxDQUFDLHFDQUFrQm5PLGNBQW5CLEVBQW1DbkosQ0FBQyxDQUFDbUUsUUFBckMsQ0FBTCxDQUxpQixFQU1qQm5FLENBQUMsQ0FBQ3VYLEVBTmUsRUFPakIscUNBQWtCaE8sVUFQRCxDQUFuQjtBQVVBLElBQU1rTyxTQUFTLEdBQUcscUJBQU0sVUFBQzVSLEtBQUQsRUFBUXlILFFBQVIsRUFBa0JqRSxJQUFsQjtBQUFBLE1BQXdCcU8sS0FBeEIsdUVBQWdDLEVBQWhDO0FBQUEsU0FDdEIsYUFBTUMsV0FBTixDQUFrQjlSLEtBQWxCLEVBQXlCeUgsUUFBekIsRUFBbUNqRSxJQUFuQyxFQUNHckksSUFESCxDQUNRaEIsQ0FBQyxDQUFDZ0MsT0FBRixDQUNKLFVBQUE0VixJQUFJO0FBQUEscUJBQU9BLElBQVAsbUNBRVJGLEtBQUssSUFBSSxFQUZELGlDQUdVcEssUUFIVixjQUdzQmpFLElBSHRCO0FBQUEsR0FEQSxFQU1KLHlCQUFZdU8sSUFOUixDQURSLENBRHNCO0FBQUEsQ0FBTixDQUFsQjtBQVlPLElBQU1DLFdBQVcsR0FBRztBQUFFdE8sWUFBVSxFQUFWQSxVQUFGO0FBQWNrTyxXQUFTLEVBQVRBO0FBQWQsQ0FBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJQOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQU0vUyxJQUFJLEdBQUcsaUNBQWI7QUFFQSxJQUFNNFAsT0FBTyxHQUFHLHFCQUFNLFVBQUN6TyxLQUFEO0FBQUEsTUFBVWlDLE9BQVYsUUFBVUEsT0FBVjtBQUFBLE1BQW1CdEIsSUFBbkIsUUFBbUJBLElBQW5CO0FBQUEsU0FDcEIseUJBQVlpUixTQUFaLENBQ0U1UixLQURGLEVBRUUsZUFBT2hFLE9BRlQsRUFHRSxrQkFIRixFQUlFLGNBQU9pRyxPQUFQLGtCQUEwQnRCLElBQTFCLEdBQWtDeUwsSUFBbEMsQ0FBdUMsSUFBdkMsQ0FKRixDQURvQjtBQUFBLENBQU4sQ0FBaEI7O0FBU08sSUFBTTZGLGNBQWMsR0FBRyxXQUFLQyxTQUFMLENBQWU7QUFBRXJULE1BQUksRUFBSkEsSUFBRjtBQUFRNFAsU0FBTyxFQUFQQTtBQUFSLENBQWYsQ0FBdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTTVQLElBQUksR0FBRyx1QkFBYjtBQUNBLElBQU00RixJQUFJLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLFdBQWYsRUFBNEIsZUFBNUIsRUFBNkMsS0FBN0MsQ0FBYjtBQUVBLElBQU1tTixTQUFTLEdBQUcscUJBQU0sVUFBQzVSLEtBQUQsUUFBNkI7QUFBQSxNQUFuQmlELE1BQW1CLFFBQW5CQSxNQUFtQjtBQUFBLE1BQVh0QyxJQUFXLFFBQVhBLElBQVc7O0FBQ25ELE1BQU1TLE9BQU8sR0FBRyxXQUFLK1EsV0FBTCxDQUFpQmxQLE1BQWpCLENBQWhCOztBQUVBLFNBQU8seUJBQVkyTyxTQUFaLENBQ0w1UixLQURLLEVBRUwsZUFBT2hFLE9BRkYsRUFHTCxnQkFISyxFQUlMLGdCQUNVb0YsT0FBTyxDQUFDLENBQUQsQ0FEakIsR0FFRSxvQkFGRixpQkFHVVQsSUFIVixHQUlFLGlCQUpGLDRCQUtLeEcsQ0FBQyxDQUFDaUMsR0FBRixDQUFNLFVBQUE2RyxNQUFNO0FBQUEsNEJBQWNBLE1BQWQ7QUFBQSxHQUFaLEVBQW9DN0IsT0FBcEMsQ0FMTCxzQkFNS2pILENBQUMsQ0FBQ2lDLEdBQUYsQ0FBTSxVQUFBZ1csR0FBRztBQUFBLHlCQUFXQSxHQUFYLHNCQUEwQm5QLE1BQTFCLGNBQW9DbVAsR0FBcEM7QUFBQSxHQUFULEVBQW9EM04sSUFBcEQsQ0FOTCxHQU9FMkgsSUFQRixDQU9PLElBUFAsQ0FKSyxDQUFQO0FBYUQsQ0FoQmlCLENBQWxCO0FBa0JBLElBQU1xQyxPQUFPLEdBQUcscUJBQU0sVUFBQ3pPLEtBQUQsRUFBUStOLEtBQVI7QUFBQSxTQUNwQjZELFNBQVMsQ0FBQzVSLEtBQUQsRUFBUStOLEtBQVIsQ0FBVCxDQUF3QjVTLElBQXhCLENBQTZCLHlCQUFZdUksVUFBekMsQ0FEb0I7QUFBQSxDQUFOLENBQWhCOztBQUlPLElBQU0yTyxhQUFhLEdBQUcsV0FBS0gsU0FBTCxDQUFlO0FBQUVyVCxNQUFJLEVBQUpBLElBQUY7QUFBUTRGLE1BQUksRUFBSkEsSUFBUjtBQUFjbU4sV0FBUyxFQUFUQSxTQUFkO0FBQXlCbkQsU0FBTyxFQUFQQTtBQUF6QixDQUFmLENBQXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQlA7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTTVQLElBQUksR0FBRyxxQ0FBYjtBQUVBLElBQU0rUyxTQUFTLEdBQUcscUJBQU0sVUFBQzVSLEtBQUQ7QUFBQSxNQUFVeUgsUUFBVixRQUFVQSxRQUFWO0FBQUEsTUFBb0IvRixJQUFwQixRQUFvQkEsSUFBcEI7QUFBQSx1QkFBMEJmLElBQTFCO0FBQUEsTUFBMEJBLElBQTFCLDBCQUFpQyxLQUFqQztBQUFBLFNBQ3RCLHlCQUFZaVIsU0FBWixDQUNFNVIsS0FERixFQUVFLGVBQU9oRSxPQUZULEVBR0UsZUFIRixFQUlFLDZCQUFzQnlMLFFBQXRCLGtCQUEwQy9GLElBQTFDLGtCQUEwRGYsSUFBMUQsR0FBa0V5TCxJQUFsRSxDQUF1RSxJQUF2RSxDQUpGLENBRHNCO0FBQUEsQ0FBTixDQUFsQjtBQVNBLElBQU1xQyxPQUFPLEdBQUcscUJBQU0sVUFBQ3pPLEtBQUQsRUFBUStOLEtBQVI7QUFBQSxTQUNwQjZELFNBQVMsQ0FBQzVSLEtBQUQsRUFBUStOLEtBQVIsQ0FBVCxDQUF3QjVTLElBQXhCLENBQTZCLHlCQUFZdUksVUFBekMsQ0FEb0I7QUFBQSxDQUFOLENBQWhCOztBQUlBLElBQU1pSyxLQUFLO0FBQUE7QUFBQTtBQUFBLDBCQUFHLGlCQUNaSixHQURZLEVBRVpwTCxLQUZZO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHVnlMLHVCQUhVLFNBR1ZBLFdBSFUsRUFHRzdDLElBSEgsU0FHR0EsSUFISDtBQUtOL0ssaUJBTE0sR0FLRXVOLEdBQUcsQ0FBQ0MsUUFBSixFQUxGO0FBTU44RSxvQkFOTSxHQU1LLGlCQUFRNVQsU0FBUixDQUFrQnFNLElBQWxCLENBTkw7QUFBQSxvQ0FPYyx5QkFBWTJCLGNBQVosQ0FBMkI0RixRQUEzQixDQVBkLHFFQU9MQyxlQVBLO0FBQUE7QUFBQSxtQkFRTzlELE9BQU8sQ0FBQ3pPLEtBQUQsRUFBUW1DLEtBQUssQ0FBQzRMLEtBQWQsQ0FSZDs7QUFBQTtBQVFONUUsZ0JBUk07QUFTUjBFLHNCQVRRLEdBU0ssZ0JBQVM3TCxHQUFULENBQWFzUSxRQUFiLENBVEw7QUFXSDFHLGFBWEcsR0FXQyxDQVhEOztBQUFBO0FBQUEsa0JBV0lBLENBQUMsR0FBRzJHLGVBQWUsQ0FBQ2xSLE1BWHhCO0FBQUE7QUFBQTtBQUFBOztBQVlKbVIsZ0JBWkksR0FZR0QsZUFBZSxDQUFDM0csQ0FBRCxDQVpsQjtBQUFBO0FBQUE7QUFBQSxtQkFjRjVMLEtBQUssQ0FBQ00sR0FBTixDQUFVLGVBQU9tUyxhQUFQLENBQXFCdFEsS0FBckIsQ0FBMkJDLE9BQTNCLENBQW1DO0FBQUVILHFCQUFPLEVBQUV1UTtBQUFYLGFBQW5DLENBQVYsRUFBaUVyWCxJQUFqRSxFQWRFOztBQUFBO0FBQUE7QUFhSnVYLG9CQWJJLGVBYWdCMVEsR0FiaEI7QUFpQlY2TCxzQkFBVSxHQUFHQSxVQUFVLENBQUMxQixNQUFYLENBQWtCdUcsUUFBbEIsQ0FBYjs7QUFqQlU7QUFXZ0M5RyxhQUFDLEVBWGpDO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlCQW9CUmlDLFVBQVUsQ0FBQ3hNLE1BcEJIO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBcUJKLDZCQUFjaU0sYUFBZCxDQUE0QkMsR0FBNUIsRUFBaUNwTCxLQUFqQyxFQUF3Q25DLEtBQXhDLEVBQStDbUosSUFBL0MsRUFBcUQwRSxVQUFyRCxFQUFpRSxFQUFqRSxDQXJCSTs7QUFBQTtBQXNCWixpQkFBV3hSLEdBQVgsSUFBa0IyRCxLQUFLLENBQUNrTyxXQUFOLEVBQWxCO0FBQXVDWCxpQkFBRyxDQUFDWSxNQUFKLENBQVc5UixHQUFYLEVBQWdCOEYsS0FBSyxDQUFDbkUsSUFBdEI7QUFBdkM7O0FBdEJZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUwyUCxLQUFLO0FBQUE7QUFBQTtBQUFBLEdBQVg7O0FBeUJPLElBQU1nRixZQUFZLEdBQUcsV0FBS1QsU0FBTCxDQUFlO0FBQUVyVCxNQUFJLEVBQUpBLElBQUY7QUFBUStTLFdBQVMsRUFBVEEsU0FBUjtBQUFtQm5ELFNBQU8sRUFBUEEsT0FBbkI7QUFBNEJkLE9BQUssRUFBTEE7QUFBNUIsQ0FBZixDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbERQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNOU8sSUFBSSxHQUFHLDZCQUFiO0FBQ0EsSUFBTTRGLElBQUksR0FBRyxDQUFDLFVBQUQsRUFBYSxVQUFiLEVBQXlCLFdBQXpCLEVBQXNDLFVBQXRDLENBQWI7QUFFQSxJQUFNbU4sU0FBUyxHQUFHLHFCQUFNLFVBQUM1UixLQUFEO0FBQUEsTUFBVXlILFFBQVYsUUFBVUEsUUFBVjtBQUFBLE1BQW9CL0YsSUFBcEIsUUFBb0JBLElBQXBCO0FBQUEsTUFBMEJmLElBQTFCLFFBQTBCQSxJQUExQjtBQUFBLFNBQ3RCLHlCQUFZaVIsU0FBWixDQUNFNVIsS0FERixFQUVFLGVBQU9oRSxPQUZULEVBR0UsaUJBSEYsRUFJRSxrQkFDWXlMLFFBRFosa0JBRVUvRixJQUZWLEdBR0Usb0JBSEYsaUJBSVVmLElBSlYsNkJBS0t4RyxDQUFDLENBQUNpQyxHQUFGLENBQU0sVUFBQWdXLEdBQUc7QUFBQSx5QkFBV0EsR0FBWCxvQkFBd0IzSyxRQUF4QixjQUFvQzJLLEdBQXBDO0FBQUEsR0FBVCxFQUFvRDNOLElBQXBELENBTEwsR0FNRTJILElBTkYsQ0FNTyxJQU5QLENBSkYsQ0FEc0I7QUFBQSxDQUFOLENBQWxCO0FBZUEsSUFBTXFDLE9BQU8sR0FBRyxxQkFBTSxVQUFDek8sS0FBRCxFQUFRK04sS0FBUjtBQUFBLFNBQ3BCNkQsU0FBUyxDQUFDNVIsS0FBRCxFQUFRK04sS0FBUixDQUFULENBQXdCNVMsSUFBeEIsQ0FBNkIseUJBQVl1SSxVQUF6QyxDQURvQjtBQUFBLENBQU4sQ0FBaEI7O0FBSU8sSUFBTWtQLGNBQWMsR0FBRyxXQUFLVixTQUFMLENBQWU7QUFBRXJULE1BQUksRUFBSkEsSUFBRjtBQUFRNEYsTUFBSSxFQUFKQSxJQUFSO0FBQWNtTixXQUFTLEVBQVRBLFNBQWQ7QUFBeUJuRCxTQUFPLEVBQVBBO0FBQXpCLENBQWYsQ0FBdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU01UCxJQUFJLEdBQUcsb0NBQWI7QUFFQSxJQUFNK1MsU0FBUyxHQUFHLHFCQUFNLFVBQUM1UixLQUFEO0FBQUEsTUFBVXlILFFBQVYsUUFBVUEsUUFBVjtBQUFBLE1BQW9CakUsSUFBcEIsUUFBb0JBLElBQXBCO0FBQUEsTUFBMEI3QyxJQUExQixRQUEwQkEsSUFBMUI7QUFBQSxTQUN0QixxQkFBVWlSLFNBQVYsQ0FBb0I1UixLQUFwQixFQUEyQnlILFFBQTNCLEVBQXFDakUsSUFBckMsaUJBQW1EN0MsSUFBbkQsRUFEc0I7QUFBQSxDQUFOLENBQWxCO0FBSUEsSUFBTThOLE9BQU8sR0FBRyxxQkFBTSxVQUFDek8sS0FBRCxFQUFRK04sS0FBUjtBQUFBLFNBQ3BCNkQsU0FBUyxDQUFDNVIsS0FBRCxFQUFRK04sS0FBUixDQUFULENBQXdCNVMsSUFBeEIsQ0FBNkIsVUFBQXdJLE1BQU07QUFBQSxXQUNqQyx5QkFBWUQsVUFBWixDQUF1QkMsTUFBdkIsRUFBK0JvSyxLQUFLLENBQUN0RyxRQUFyQyxFQUErQ3NHLEtBQUssQ0FBQ3ZLLElBQXJELENBRGlDO0FBQUEsR0FBbkMsQ0FEb0I7QUFBQSxDQUFOLENBQWhCO0FBTUEsSUFBTW1MLFNBQVMsR0FBRyxxQkFBTSxVQUFDM08sS0FBRCxFQUFRK04sS0FBUixFQUFldlQsSUFBZixFQUF3QjtBQUFBLE1BQ3RDaU4sUUFEc0MsR0FDYnNHLEtBRGEsQ0FDdEN0RyxRQURzQztBQUFBLE1BQzVCakUsSUFENEIsR0FDYnVLLEtBRGEsQ0FDNUJ2SyxJQUQ0QjtBQUFBLE1BQ3RCN0MsSUFEc0IsR0FDYm9OLEtBRGEsQ0FDdEJwTixJQURzQjtBQUU5QyxNQUFNa1MsVUFBVSxHQUFHO0FBQUVwTCxZQUFRLEVBQVJBLFFBQUY7QUFBWWpFLFFBQUksRUFBSkEsSUFBWjtBQUFrQjdDLFFBQUksRUFBSkEsSUFBbEI7QUFBd0IzRSxXQUFPLEVBQUUsZUFBT0E7QUFBeEMsR0FBbkI7QUFDQSxNQUFNaUUsS0FBSyxHQUFHLENBQUMsZUFBTzZTLFlBQVAsQ0FBb0IzUSxLQUFwQixDQUEwQkMsT0FBMUIsQ0FBa0N5USxVQUFsQyxDQUFELENBQWQ7QUFFQSxTQUFPLG1CQUFJLENBQ1RwRSxPQUFPLENBQUN6TyxLQUFELEVBQVErTixLQUFSLENBREUsRUFFVCx5QkFBWVEsZ0JBQVosQ0FBNkJ2TyxLQUE3QixFQUFvQ0MsS0FBcEMsQ0FGUyxDQUFKLEVBR0o5RSxJQUhJLENBR0MsaUJBQWtCO0FBQUE7QUFBQSxRQUFoQmdPLElBQWdCO0FBQUEsUUFBVlgsSUFBVTs7QUFDeEIsUUFBTUQsUUFBUSxHQUFHLDZCQUFjTixXQUFkLENBQTBCakksS0FBMUIsRUFBaUNtSixJQUFqQyxDQUFqQjs7QUFFQSxXQUFPLDZCQUFjakIsY0FBZCxDQUE2QmxJLEtBQTdCLEVBQW9Dd0ksSUFBcEMsRUFBMEMsRUFBRSxHQUFHaE8sSUFBTDtBQUFXK04sY0FBUSxFQUFSQTtBQUFYLEtBQTFDLENBQVA7QUFDRCxHQVBNLENBQVA7QUFRRCxDQWJpQixDQUFsQjs7QUFlQSxJQUFNb0YsS0FBSztBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFDWkosR0FEWSxFQUVacEwsS0FGWTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR1Z5TCx1QkFIVSxTQUdWQSxXQUhVLEVBR0c3QyxJQUhILFNBR0dBLElBSEgsRUFHUzRCLFFBSFQsU0FHU0EsUUFIVCx1QkFHbUJ4TyxNQUhuQixFQUdtQkEsTUFIbkIsNkJBRzRCLENBSDVCO0FBS042QixpQkFMTSxHQUtFdU4sR0FBRyxDQUFDQyxRQUFKLEVBTEY7QUFPTnVGLHdCQVBNLEdBT1MsaUJBQVFyVSxTQUFSLENBQWtCaU8sUUFBbEIsQ0FQVDtBQVFOMkYsb0JBUk0sR0FRSyxpQkFBUTVULFNBQVIsQ0FBa0JxTSxJQUFsQixDQVJMO0FBQUEsb0NBU3FCLHlCQUFZMkIsY0FBWixDQUMvQjRGLFFBRCtCLEVBRS9CUyxZQUYrQixDQVRyQixxRUFTTGxGLFVBVEssOEJBU09tRixVQVRQO0FBQUE7QUFBQSxtQkFhT3ZFLE9BQU8sQ0FBQ3pPLEtBQUQsRUFBUW1DLEtBQUssQ0FBQzRMLEtBQWQsQ0FiZDs7QUFBQTtBQWFONUUsZ0JBYk07QUFjTjhKLDJCQWRNLEdBY1ksZUFBT25GLGVBQVAsQ0FBdUIzTCxLQUF2QixDQUE2QjRMLEtBQTdCLENBQW1DSCxXQUFuQyxDQWRaO0FBZU5zRixzQkFmTSxHQWVPLGVBQU9oUixLQUFQLENBQWFDLEtBQWIsQ0FBbUI0TCxLQUFuQixDQUF5QkgsV0FBekIsQ0FmUDtBQUFBLG9CQWdCUSxlQUFPdUYsZUFBUCxDQUF1QmhSLEtBQXZCLENBQTZCNEwsS0FBN0IsQ0FBbUNILFdBQW5DLEtBQW1ELEVBaEIzRCxFQWdCSjNMLE9BaEJJLFNBZ0JKQSxPQWhCSTtBQWlCTm1SLHVCQWpCTSxHQWlCUSxlQUFPQyxTQUFQLENBQWlCbFIsS0FBakIsQ0FBdUI0TCxLQUF2QixDQUE2QkgsV0FBN0IsQ0FqQlI7QUFtQlosZ0JBQUlxRixlQUFKLEVBQXFCcEYsVUFBVSxDQUFDM0csSUFBWCxDQUFnQitMLGVBQWUsQ0FBQ2hSLE9BQWhDO0FBQ3JCLGdCQUFJaVIsVUFBSixFQUFnQnJGLFVBQVUsQ0FBQzNHLElBQVgsQ0FBZ0JnTSxVQUFVLENBQUNqUixPQUEzQjtBQUNoQixnQkFBSUEsT0FBTyxJQUFJQSxPQUFPLEtBQUtrSCxJQUFJLENBQUNtSyxVQUFoQyxFQUE0Q3pGLFVBQVUsQ0FBQzNHLElBQVgsQ0FBZ0JqRixPQUFoQjtBQXJCaEM7QUFBQSxtQkFzQk4sNkJBQWNxTCxhQUFkLENBQ0pDLEdBREksRUFFSnBMLEtBRkksRUFHSm5DLEtBSEksRUFJSm1KLElBSkksRUFLSjBFLFVBTEksRUFNSm1GLFVBTkksQ0F0Qk07O0FBQUE7QUE4QlosaUJBQVczVyxHQUFYLElBQWtCMkQsS0FBSyxDQUFDa08sV0FBTixFQUFsQjtBQUF1Q1gsaUJBQUcsQ0FBQ1ksTUFBSixDQUFXOVIsR0FBWCxFQUFnQjhGLEtBQUssQ0FBQ25FLElBQXRCO0FBQXZDOztBQTlCWSxrQkFnQ1Y3RCxDQUFDLENBQUNzRSxJQUFGLENBQU8sTUFBUCxFQUFla08sUUFBZixLQUNBa0IsVUFBVSxDQUFDeE0sTUFEWCxJQUVBMlIsVUFBVSxDQUFDM1IsTUFGWCxJQUdBK1IsV0FuQ1U7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUF1Q1o7QUFDQTVHLG1CQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWixFQUEyQ3RLLEtBQUssQ0FBQ25FLElBQWpELEVBQXVENFAsV0FBdkQ7QUF4Q1k7QUFBQSxtQkF5Q09MLEdBQUcsQ0FBQ0MsUUFBSixHQUFlbE4sR0FBZixDQUFtQjZCLEtBQUssQ0FBQ25FLElBQXpCLENBekNQOztBQUFBO0FBeUNOOEwsZ0JBekNNO0FBMENOeUosd0JBMUNNLEdBMENTLHlCQUFZbEosUUFBWixDQUFxQlAsSUFBckIsQ0ExQ1Q7O0FBNENaLGdCQUFJeUosWUFBWSxDQUFDbFMsTUFBakIsRUFBeUI7QUFDdkJjLG1CQUFLLENBQUN1TCxLQUFOLENBQVk7QUFDVjlFLG9CQUFJLEVBQUUsQ0FESTtBQUVWLG1CQUFHMkssWUFBWSxDQUFDaFQsTUFBYixDQUFvQixVQUFDd0ssSUFBRCxFQUFPMU8sR0FBUCxFQUFlO0FBQ3BDME8sc0JBQUksV0FBSTFPLEdBQUosRUFBSixHQUFpQixJQUFqQjtBQUNBLHlCQUFPME8sSUFBUDtBQUNELGlCQUhFLEVBR0EsRUFIQTtBQUZPLGVBQVo7QUFPRDs7QUFFRHdDLGVBQUcsQ0FBQ2lHLElBQUosQ0FBUztBQUNQN1IsZ0JBQUUsbUJBQVlRLEtBQUssQ0FBQ25FLElBQWxCLENBREs7QUFFUEEsa0JBQUksRUFBRW1FLEtBQUssQ0FBQ25FLElBRkw7QUFHUHlWLG9CQUFNLEVBQUUsVUFIRDtBQUlQQyxzQkFBUSxFQUFFdlIsS0FBSyxDQUFDdVIsUUFBTixJQUFrQjtBQUpyQixhQUFUOztBQXREWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFML0YsS0FBSztBQUFBO0FBQUE7QUFBQSxHQUFYOztBQThETyxJQUFNbUYsWUFBWSxHQUFHLFdBQUtaLFNBQUwsQ0FBZTtBQUN6Q3JULE1BQUksRUFBSkEsSUFEeUM7QUFFekM4UCxXQUFTLEVBQVRBLFNBRnlDO0FBR3pDaUQsV0FBUyxFQUFUQSxTQUh5QztBQUl6Q25ELFNBQU8sRUFBUEEsT0FKeUM7QUFLekNkLE9BQUssRUFBTEE7QUFMeUMsQ0FBZixDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckdQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNOU8sSUFBSSxHQUFHLGlCQUFiO0FBQ0EsSUFBTTRGLElBQUksR0FBRyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsV0FBZixFQUE0QixlQUE1QixFQUE2QyxLQUE3QyxFQUFvRCxVQUFwRCxDQUFiO0FBRUEsSUFBTW1OLFNBQVMsR0FBRyxxQkFBTSxVQUFDNVIsS0FBRCxRQUE0QjtBQUFBLE1BQWxCa0QsS0FBa0IsUUFBbEJBLEtBQWtCO0FBQUEsTUFBWHZDLElBQVcsUUFBWEEsSUFBVzs7QUFDbEQsTUFBTUksTUFBTSxHQUFHLFdBQUtvUixXQUFMLENBQWlCalAsS0FBakIsQ0FBZjs7QUFDQSxNQUFNeVEsUUFBUSxHQUFHNVMsTUFBTSxDQUFDLENBQUQsQ0FBTixLQUFjLEtBQWQsR0FBc0IsVUFBdEIsR0FBbUNBLE1BQU0sQ0FBQyxDQUFELENBQTFEO0FBRUEsU0FBTyx5QkFBWTZRLFNBQVosQ0FDTDVSLEtBREssRUFFTCxlQUFPaEUsT0FGRixFQUdMLGVBSEssRUFJTCxnQkFDVWtILEtBRFYsdUJBRWV5USxRQUZmLGtCQUdVaFQsSUFIVixHQUlFdUMsS0FBSyxDQUFDbEUsT0FBTixDQUFjLEdBQWQsTUFBdUIsQ0FBQyxDQUF4QixHQUE0QixpQkFBNUIsR0FBZ0QsRUFKbEQsNEJBS0s3RSxDQUFDLENBQUNpQyxHQUFGLENBQU0sVUFBQThHLEtBQUs7QUFBQSwyQkFBYUEsS0FBYjtBQUFBLEdBQVgsRUFBaUNuQyxNQUFqQyxDQUxMLHNCQU1LNUcsQ0FBQyxDQUFDaUMsR0FBRixDQUFNLFVBQUFnVyxHQUFHO0FBQUEseUJBQVdBLEdBQVgsaUJBQXFCbFAsS0FBckIsY0FBOEJrUCxHQUE5QjtBQUFBLEdBQVQsRUFBOEMzTixJQUE5QyxDQU5MLEdBT0UySCxJQVBGLENBT08sSUFQUCxDQUpLLENBQVA7QUFhRCxDQWpCaUIsQ0FBbEI7QUFtQkEsSUFBTXFDLE9BQU8sR0FBRyxxQkFBTSxVQUFDek8sS0FBRCxFQUFRK04sS0FBUjtBQUFBLFNBQ3BCNkQsU0FBUyxDQUFDNVIsS0FBRCxFQUFRK04sS0FBUixDQUFULENBQXdCNVMsSUFBeEIsQ0FBNkIseUJBQVl1SSxVQUF6QyxDQURvQjtBQUFBLENBQU4sQ0FBaEI7O0FBSU8sSUFBTWtRLFlBQVksR0FBRyxXQUFLMUIsU0FBTCxDQUFlO0FBQUVyVCxNQUFJLEVBQUpBLElBQUY7QUFBUStTLFdBQVMsRUFBVEEsU0FBUjtBQUFtQm5ELFNBQU8sRUFBUEE7QUFBbkIsQ0FBZixDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTW9GLEtBQUssR0FBRyxrTEFBZDs7QUFTQSxJQUFNckYsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQTNQLElBQUksRUFBSTtBQUN2QixNQUFJa1AsS0FBSjs7QUFFQSxPQUFLLElBQUluQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUksS0FBSyxDQUFDeFMsTUFBMUIsRUFBa0N1SyxDQUFDLEVBQW5DLEVBQXVDO0FBQ3JDbUMsU0FBSyxHQUFHOEYsS0FBSyxDQUFDakksQ0FBRCxDQUFMLENBQVN6SixLQUFULENBQWU0TCxLQUFmLENBQXFCbFAsSUFBckIsQ0FBUjtBQUNBLFFBQUlrUCxLQUFKLEVBQVcsT0FBTzVULENBQUMsQ0FBQ3dYLEtBQUYsQ0FBUSxPQUFSLEVBQWlCNUQsS0FBakIsRUFBd0I4RixLQUFLLENBQUNqSSxDQUFELENBQTdCLENBQVA7QUFDWjs7QUFDRCxTQUFPLElBQVA7QUFDRCxDQVJEOztBQVVPLElBQU1rSSxXQUFXLEdBQUcsRUFBRSxHQUFHRCxLQUFMO0FBQVlBLE9BQUssRUFBTEEsS0FBWjtBQUFtQnJGLFVBQVEsRUFBUkE7QUFBbkIsQ0FBcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JQOztBQUNBOzs7Ozs7QUFFQSxJQUFNdUYsWUFBWSxHQUFHNVosQ0FBQyxDQUFDZ0MsT0FBRixDQUNuQmhDLENBQUMsQ0FBQ2tFLE1BQUYsQ0FBU2xFLENBQUMsQ0FBQ21FLFFBQVgsQ0FEbUIsRUFFbkJuRSxDQUFDLENBQUNtUSxNQUFGLENBQVNuUSxDQUFDLENBQUNtRSxRQUFYLENBRm1CLEVBR25CbkUsQ0FBQyxDQUFDaUMsR0FBRixDQUFNakMsQ0FBQyxDQUFDaVEsSUFBUixDQUhtQixFQUluQmpRLENBQUMsQ0FBQ2tOLEtBQUYsQ0FBUSxHQUFSLENBSm1CLEVBS25CbE4sQ0FBQyxDQUFDNlosT0FMaUIsRUFNbkI3WixDQUFDLENBQUNpUSxJQU5pQixFQU9uQmpRLENBQUMsQ0FBQzhaLFNBQUYsQ0FBWSxFQUFaLENBUG1CLENBQXJCO0FBVUEsSUFBTTlCLFdBQVcsR0FBR2hZLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDbEJoQyxDQUFDLENBQUM2UCxNQUFGLENBQVM3UCxDQUFDLENBQUNzRSxJQUFGLENBQU8sUUFBUCxDQUFULEVBQTJCdEUsQ0FBQyxDQUFDbUUsUUFBN0IsRUFBdUNuRSxDQUFDLENBQUMrUCxNQUFGLENBQVMsQ0FBQyxLQUFELENBQVQsQ0FBdkMsQ0FEa0IsRUFFbEI2SixZQUZrQixDQUFwQjs7QUFLQSxJQUFNN0IsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQWxPLEdBQUc7QUFBQSxTQUFJN0osQ0FBQyxDQUFDd1gsS0FBRixDQUFRLE9BQVIsRUFBaUIseUJBQVUzTixHQUFHLENBQUNuRixJQUFkLENBQWpCLEVBQXNDbUYsR0FBdEMsQ0FBSjtBQUFBLENBQXJCOztBQUVPLElBQU1rUSxJQUFJLEdBQUc7QUFBRUgsY0FBWSxFQUFaQSxZQUFGO0FBQWdCNUIsYUFBVyxFQUFYQSxXQUFoQjtBQUE2QkQsV0FBUyxFQUFUQTtBQUE3QixDQUFiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU16TixJQUFJLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLFdBQWYsRUFBNEIsZUFBNUIsRUFBNkMsS0FBN0MsQ0FBYjs7QUFDQSxJQUFNMFAsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBM1EsSUFBSTtBQUFBLHlCQUFhQSxJQUFiO0FBQUEsQ0FBaEM7O0FBRUEsSUFBTTRRLGtCQUFrQixHQUFHamEsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQ3dKLE9BQUQsRUFBVUosSUFBVixFQUFnQkcsTUFBaEIsRUFBMkI7QUFDNUQsTUFBSXJJLE1BQU0sR0FBRyxDQUFDcUksTUFBTSxJQUFJLEVBQVgsQ0FBYjs7QUFDQSxNQUFNRyxTQUFTLEdBQUcscUJBQVVDLFFBQVYsQ0FBbUJKLE1BQW5CLENBQWxCOztBQUVBLE1BQUksQ0FBQ0csU0FBUyxDQUFDRyxRQUFWLENBQW1CLEtBQW5CLENBQUwsRUFBZ0M7QUFDOUJRLFFBQUksQ0FBQ3JJLEdBQUwsQ0FBUyxVQUFBZ1csR0FBRztBQUFBLGFBQ1Y5VyxNQUFNLENBQUM0TCxJQUFQLGVBQW1Ca0wsR0FBbkIsb0JBQWdDeE8sT0FBaEMscUJBQWtESixJQUFsRCxjQUEwRDRPLEdBQTFELEVBRFU7QUFBQSxLQUFaO0FBR0Q7O0FBRUQsTUFBSXBXLE9BQU8sR0FBRzhILFNBQVMsQ0FBQ0csUUFBVixDQUFtQixTQUFuQixDQUFkOztBQUVBLE1BQUksQ0FBQ2pJLE9BQUwsRUFBYztBQUNaVixVQUFNLENBQUM0TCxJQUFQLG1CQUF1QixlQUFPbEwsT0FBOUI7QUFDQUEsV0FBTyxHQUFHLGVBQU9BLE9BQWpCO0FBQ0Q7O0FBRUQsTUFBSUYsU0FBUyxHQUFHZ0ksU0FBUyxDQUFDRyxRQUFWLENBQW1CLFdBQW5CLENBQWhCO0FBRUEsTUFBSSxDQUFDbkksU0FBTCxFQUFnQlIsTUFBTSxDQUFDNEwsSUFBUCxxQkFBeUJsTCxPQUF6QjtBQUVoQixTQUFPVixNQUFNLENBQUM4USxJQUFQLENBQVksSUFBWixDQUFQO0FBQ0QsQ0F0QjBCLENBQTNCO0FBd0JBLElBQU1pSSxTQUFTLEdBQUcscUJBQU0sVUFBQ3JVLEtBQUQsRUFBUXlILFFBQVIsRUFBa0JqRSxJQUFsQjtBQUFBLFNBQ3RCLHlCQUFZb08sU0FBWixDQUFzQjVSLEtBQXRCLEVBQTZCeUgsUUFBN0IsRUFBdUMwTSxtQkFBbUIsQ0FBQzNRLElBQUQsQ0FBMUQsQ0FEc0I7QUFBQSxDQUFOLENBQWxCO0FBSUEsSUFBTW9PLFNBQVMsR0FBRyxxQkFBTSxVQUFDNVIsS0FBRCxFQUFReUgsUUFBUixFQUFrQmpFLElBQWxCO0FBQUEsU0FDdEI2USxTQUFTLENBQUNsWixJQUFWLENBQ0VoQixDQUFDLENBQUNnQyxPQUFGLENBQ0VpWSxrQkFBa0IsQ0FBQzNNLFFBQUQsRUFBV2pFLElBQVgsQ0FEcEIsRUFFRSxxQkFBY3VPLElBRmhCLENBREYsQ0FEc0I7QUFBQSxDQUFOLENBQWxCO0FBU08sSUFBTXVDLFNBQVMsR0FBRztBQUFFN1AsTUFBSSxFQUFKQSxJQUFGO0FBQVFtTixXQUFTLEVBQVRBO0FBQVIsQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUVPLElBQU0yQyxPQUFPLEdBQUc7QUFDckJsRyxVQUFRLEVBQUUsMkJBQWFBLFFBREY7QUFFckJHLFVBQVEsRUFBRSwyQkFBYUE7QUFGRixDQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYUDs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU2dHLElBQVQsQ0FBYzFWLEdBQWQsRUFBZ0M7QUFBQSxNQUFiMlYsTUFBYSx1RUFBSixFQUFJOztBQUFBLGFBRTVCQSxNQUFNLElBQUksRUFGa0I7QUFBQSxNQUN0QkMsS0FEc0IsUUFDdEJBLEtBRHNCO0FBQUEsTUFDZkMsaUJBRGUsUUFDZkEsaUJBRGU7QUFBQSxNQUNJQyxLQURKLFFBQ0lBLEtBREo7QUFBQSxNQUNXQyxZQURYLFFBQ1dBLFlBRFg7QUFBQSxNQUN5QkMsT0FEekIsUUFDeUJBLE9BRHpCO0FBQUEsTUFDcUNDLElBRHJDOztBQUc5QixNQUFNMWEsSUFBSSxHQUFHO0FBQUVvYSxVQUFNLEVBQU5BO0FBQUYsR0FBYjs7QUFFQSxNQUFJLENBQUNHLEtBQUwsRUFBWTtBQUNWLFFBQU1JLEdBQUcsR0FBRztBQUFFSCxrQkFBWSxFQUFFLENBQUMsQ0FBQ0EsWUFBbEI7QUFBZ0NJLFlBQU0sRUFBRSxDQUFDLENBQUNILE9BQTFDO0FBQW1ELFNBQUdDO0FBQXRELEtBQVo7QUFFQSxRQUFJRCxPQUFKLEVBQWFFLEdBQUcsQ0FBQ0gsWUFBSixHQUFtQixLQUFuQjtBQUNiLFFBQUksQ0FBQ0YsaUJBQUwsRUFBd0I3VixHQUFHLENBQUNvVyxFQUFKLENBQU8sS0FBUCxFQUFjLHVCQUFXQyxZQUFYLENBQXdCOWEsSUFBeEIsQ0FBZDtBQUN4QixRQUFJMmEsR0FBRyxDQUFDSSxPQUFSLEVBQWlCSixHQUFHLENBQUNLLEtBQUosR0FBWUwsR0FBRyxDQUFDSSxPQUFKLENBQVlKLEdBQVosQ0FBWixDQUxQLENBS3FDOztBQUMvQzNhLFFBQUksQ0FBQ00sR0FBTCxHQUFXbUUsR0FBRyxDQUFDa1csR0FBRCxDQUFkO0FBQ0EsUUFBSUEsR0FBRyxDQUFDSCxZQUFSLEVBQXNCeGEsSUFBSSxDQUFDTSxHQUFMLENBQVN1YSxFQUFULENBQVksb0JBQVosRUFBa0MsVUFBQUksQ0FBQztBQUFBLGFBQUlBLENBQUMsQ0FBQ0MsS0FBRixDQUFRLEVBQVIsQ0FBSjtBQUFBLEtBQW5DOztBQUN0QixRQUFJYixLQUFKLEVBQVc7QUFDVCxVQUFNYyxTQUFTLEdBQUcsU0FBWkEsU0FBWTtBQUFBLGVBQU1uYixJQUFJLENBQUNNLEdBQUwsQ0FBUzhhLENBQVQsQ0FBV1AsRUFBWCxDQUFjLEtBQWQsRUFBcUI7QUFBRVIsZUFBSyxFQUFFO0FBQVQsU0FBckIsQ0FBTjtBQUFBLE9BQWxCOztBQUVBYyxlQUFTO0FBQ1Y7QUFDRjs7QUFFRG5iLE1BQUksQ0FBQ21ULFFBQUwsR0FBZ0IsYUFBTWtJLFdBQU4sQ0FBa0JyYixJQUFsQixDQUFoQjtBQUNBQSxNQUFJLENBQUNxQixPQUFMLEdBQWUsK0JBQWVBLE9BQWYsQ0FBdUJyQixJQUF2QixDQUFmO0FBQ0FBLE1BQUksQ0FBQ0gsTUFBTCxHQUFjLCtCQUFlQSxNQUFmLENBQXNCRyxJQUF0QixDQUFkO0FBQ0FBLE1BQUksQ0FBQ2EsS0FBTCxHQUFhLCtCQUFlQSxLQUFmLENBQXFCYixJQUFyQixDQUFiOztBQUNBQSxNQUFJLENBQUNtQixNQUFMLEdBQWM7QUFBQSxXQUFNLCtCQUFlQSxNQUFmLENBQXNCbkIsSUFBdEIsQ0FBTjtBQUFBLEdBQWQ7O0FBQ0FBLE1BQUksQ0FBQ29CLFVBQUwsR0FBa0I7QUFBQSxXQUFNLCtCQUFlQSxVQUFmLENBQTBCcEIsSUFBMUIsQ0FBTjtBQUFBLEdBQWxCOztBQUNBQSxNQUFJLENBQUNzYixNQUFMLEdBQWMsYUFBTUEsTUFBTixDQUFhdGIsSUFBYixDQUFkO0FBQ0FBLE1BQUksQ0FBQ3ViLE9BQUwsR0FBZSxhQUFNQSxPQUFOLENBQWN2YixJQUFkLENBQWY7QUFDQUEsTUFBSSxDQUFDd2IsSUFBTCxHQUFZLGFBQU1BLElBQU4sQ0FBV3hiLElBQVgsQ0FBWjtBQUNBQSxNQUFJLENBQUN5YixTQUFMLEdBQWlCLGFBQU1BLFNBQU4sQ0FBZ0J6YixJQUFoQixDQUFqQjtBQUNBQSxNQUFJLENBQUMwYixJQUFMLEdBQVksYUFBTUEsSUFBTixDQUFXMWIsSUFBWCxDQUFaO0FBQ0FBLE1BQUksQ0FBQzJiLE9BQUw7QUFDQSxTQUFPM2IsSUFBUDtBQUNEOztBQUVNLElBQU00YixJQUFJLEdBQUc7QUFDbEJ6QixNQUFJLEVBQUpBO0FBRGtCLENBQWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekNQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0wQixZQUFZLEdBQUcsdUJBQVEsSUFBUixDQUFyQjtBQUNBLElBQU1DLFdBQVcsR0FBR2hjLENBQUMsQ0FBQ29HLE1BQUYsQ0FBU3BHLENBQUMsQ0FBQ21YLEtBQVgsRUFBa0IsRUFBbEIsQ0FBcEI7O0FBRUEsSUFBTThFLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUFDLE1BQU0sRUFBSTtBQUFBLGFBQ0VBLE1BQU0sSUFBSSxFQURaO0FBQUEseUJBQ25CdFYsTUFEbUI7QUFBQSxNQUNuQkEsTUFEbUIsNEJBQ1YsQ0FBQyxLQUFELENBRFU7O0FBRTNCLE1BQU11VixJQUFJLEdBQUduYyxDQUFDLENBQUN3UCxNQUFGLENBQVMsR0FBVCxFQUFjLE1BQWQsRUFBc0IwTSxNQUF0QixLQUFpQyxHQUE5QztBQUNBLE1BQU1FLFVBQVUsR0FBRyxFQUFuQjtBQUNBLE1BQU1DLE1BQU0sR0FBRyxPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQWhDO0FBQ0EsTUFBTUMsS0FBSyxHQUFHLElBQUlySCxJQUFKLEdBQVdDLE9BQVgsS0FBdUJtSCxNQUFNLEdBQUdyUSxRQUFRLENBQUNtUSxJQUFELEVBQU8sRUFBUCxDQUF0RDs7QUFFQSxPQUFLLElBQUkxSyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJMEssSUFBSSxHQUFHLENBQTVCLEVBQStCMUssQ0FBQyxFQUFoQztBQUNFMkssY0FBVSxDQUFDclAsSUFBWCxDQUFnQixnQkFBU3dQLE1BQVQsQ0FBZ0JELEtBQUssR0FBRzdLLENBQUMsR0FBRzRLLE1BQTVCLENBQWhCO0FBREY7O0FBRUEsU0FBT0csTUFBTSxDQUFDelgsSUFBUCxDQUNMNkIsTUFBTSxDQUFDUixNQUFQLENBQ0UsVUFBQ2pGLE1BQUQsRUFBU3NiLFNBQVQ7QUFBQSxXQUNFTCxVQUFVLENBQUNoVyxNQUFYLENBQWtCLFVBQUNoQixHQUFELEVBQU1zWCxFQUFOLEVBQWE7QUFDN0J0WCxTQUFHLFdBQUkscUJBQVU5QyxNQUFkLHFCQUErQm1hLFNBQS9CLG1CQUFpREMsRUFBakQsRUFBSCxHQUE0RCxJQUE1RDtBQUNBLGFBQU90WCxHQUFQO0FBQ0QsS0FIRCxFQUdHakUsTUFISCxDQURGO0FBQUEsR0FERixFQU1FLEVBTkYsQ0FESyxDQUFQO0FBVUQsQ0FuQkQ7O0FBcUJBLElBQU13YixXQUFXLEdBQUcscUJBQU0sVUFBQzlXLEtBQUQsRUFBUXFXLE1BQVIsRUFBbUI7QUFDM0MsTUFBTVUsTUFBTSxHQUFHWCxVQUFVLENBQUMsRUFBRSxHQUFHQyxNQUFMO0FBQWF0VixVQUFNLEVBQUUsQ0FBQ3NWLE1BQU0sQ0FBQ25ULEtBQVI7QUFBckIsR0FBRCxDQUF6QjtBQUNBLE1BQUlqRCxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUkrVyxPQUFPLEdBQUcscUJBQVVyYSxZQUF4Qjs7QUFFQSxNQUFJMFosTUFBTSxDQUFDMVYsSUFBUCxLQUFnQixLQUFwQixFQUEyQjtBQUN6QnFXLFdBQU8sR0FBRyxxQkFBVXJhLFlBQXBCO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsUUFBSTBaLE1BQU0sQ0FBQzFWLElBQVAsS0FBZ0IsS0FBcEIsRUFBMkJxVyxPQUFPLEdBQUdBLE9BQU8sR0FBRyxDQUFwQjtBQUMzQixRQUFJWCxNQUFNLENBQUNuVCxLQUFQLEtBQWlCLEtBQXJCLEVBQTRCOFQsT0FBTyxHQUFHQSxPQUFPLEdBQUcsQ0FBcEI7QUFDN0I7O0FBRUQsTUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBTTtBQUN0QixRQUFNQyxTQUFTLEdBQUdILE1BQU0sQ0FBQ3pLLEdBQVAsRUFBbEI7QUFFQSxRQUFJck0sS0FBSyxDQUFDb0IsTUFBTixHQUFlMlYsT0FBZixJQUEwQixDQUFDRSxTQUEvQixFQUEwQyxPQUFPLHVCQUFRalgsS0FBUixDQUFQO0FBQzFDLFdBQU9ELEtBQUssQ0FDVE0sR0FESSxDQUNBNFcsU0FEQSxFQUVKalgsS0FGSSxHQUdKOUUsSUFISSxDQUdDLFVBQUFnYyxJQUFJLEVBQUk7QUFDWmxYLFdBQUssZ0NBQU9BLEtBQVAsc0JBQWlCa1gsSUFBakIsRUFBTDtBQUNBLGFBQU9GLFNBQVMsRUFBaEI7QUFDRCxLQU5JLENBQVA7QUFPRCxHQVhEOztBQWFBLFNBQU9BLFNBQVMsRUFBaEI7QUFDRCxDQTFCbUIsQ0FBcEI7QUE0QkEsSUFBTUcsWUFBWSxHQUFHLHFCQUFNLFVBQUNwWCxLQUFEO0FBQUEsTUFBVWlELE1BQVYsU0FBVUEsTUFBVjtBQUFBLFNBQ3pCakQsS0FBSyxDQUFDTSxHQUFOLENBQVUsZUFBTytXLE1BQVAsQ0FBY2xWLEtBQWQsQ0FBb0JDLE9BQXBCLENBQTRCO0FBQUVrVixjQUFVLEVBQUVyVTtBQUFkLEdBQTVCLENBQVYsRUFBK0RoRCxLQUEvRCxFQUR5QjtBQUFBLENBQU4sQ0FBckI7QUFJQSxJQUFNc1gsWUFBWSxHQUFHLHFCQUFNLFVBQUN2WCxLQUFELEVBQVFxVyxNQUFSO0FBQUEsU0FDekIsbUJBQUksQ0FDRkEsTUFBTSxDQUFDM1UsSUFBUCxJQUFlMlUsTUFBTSxDQUFDM1UsSUFBUCxLQUFnQixXQUEvQixJQUE4QzJVLE1BQU0sQ0FBQzNVLElBQVAsS0FBZ0IsVUFBOUQsR0FDSSx1QkFBUSxFQUFSLENBREosR0FFSTFCLEtBQUssQ0FDRk0sR0FESCxDQUNPK1YsTUFBTSxDQUFDNU8sUUFEZCxFQUVHbkgsR0FGSCxDQUVPLGFBRlAsRUFHR0wsS0FISCxFQUhGLEVBT0ZvVyxNQUFNLENBQUMzVSxJQUFQLElBQ0EyVSxNQUFNLENBQUMzVSxJQUFQLEtBQWdCLFVBRGhCLElBRUEyVSxNQUFNLENBQUMzVSxJQUFQLEtBQWdCLFVBRmhCLElBR0EyVSxNQUFNLENBQUMzVSxJQUFQLEtBQWdCLFVBSGhCLEdBSUksdUJBQVEsRUFBUixDQUpKLEdBS0kxQixLQUFLLENBQ0ZNLEdBREgsQ0FDTytWLE1BQU0sQ0FBQzVPLFFBRGQsRUFFR25ILEdBRkgsQ0FFTyxVQUZQLEVBR0dMLEtBSEgsRUFaRixDQUFKLEVBZ0JHOUUsSUFoQkgsQ0FnQlE7QUFBQTtBQUFBLFFBQUVxYyxXQUFGO0FBQUEsUUFBZTVILFFBQWY7O0FBQUEsV0FBNkJ1RyxXQUFXLENBQUMsQ0FBQ3FCLFdBQUQsRUFBYzVILFFBQWQsQ0FBRCxDQUF4QztBQUFBLEdBaEJSLENBRHlCO0FBQUEsQ0FBTixDQUFyQjtBQW9CQSxJQUFNNkgsVUFBVSxHQUFHLHFCQUNqQixVQUFDelgsS0FBRCxFQUFRaEMsSUFBUjtBQUFBLFNBQWlCZ0MsS0FBSyxDQUFDTSxHQUFOLENBQVV0QyxJQUFWLEVBQWdCN0MsSUFBaEIsQ0FBcUIseUJBQVkyUCxTQUFqQyxDQUFqQjtBQUFBLENBRGlCLEVBRWpCLFlBRmlCLENBQW5CO0FBS0EsSUFBTTRNLGFBQWEsR0FBRyxxQkFBTSxVQUFDMVgsS0FBRDtBQUFBLE1BQVU0QyxPQUFWLFNBQVVBLE9BQVY7QUFBQSxNQUFtQmpDLElBQW5CLFNBQW1CQSxJQUFuQjtBQUFBLE1BQXlCM0UsT0FBekIsU0FBeUJBLE9BQXpCO0FBQUEsU0FDMUJ5YixVQUFVLENBQUN6WCxLQUFELFlBQVcscUJBQVV2RCxNQUFyQixTQUE4Qm1HLE9BQTlCLGNBQXlDakMsSUFBekMsZUFBa0QzRSxPQUFsRCxPQUFWLENBQXdFYixJQUF4RSxDQUNFaEIsQ0FBQyxDQUFDZ0MsT0FBRixDQUNFaEMsQ0FBQyxDQUFDaUMsR0FBRixDQUFNLFVBQUE2RixPQUFPO0FBQUEsV0FBSSxlQUFPQyxLQUFQLENBQWFDLEtBQWIsQ0FBbUJDLE9BQW5CLENBQTJCO0FBQUVILGFBQU8sRUFBUEE7QUFBRixLQUEzQixDQUFKO0FBQUEsR0FBYixDQURGLEVBRUU5SCxDQUFDLENBQUNtUSxNQUFGLENBQVNuUSxDQUFDLENBQUNtRSxRQUFYLENBRkYsQ0FERixDQUQwQjtBQUFBLENBQU4sQ0FBdEI7QUFTQSxJQUFNbUUsZUFBZSxHQUFHLHFCQUN0QixVQUFDekMsS0FBRDtBQUFBLE1BQVUwQyxpQkFBVixTQUFVQSxpQkFBVjtBQUFBLHlCQUE2QmhCLElBQTdCO0FBQUEsTUFBNkJBLElBQTdCLDJCQUFvQyxVQUFwQztBQUFBLE1BQW1EMlUsTUFBbkQ7O0FBQUEsU0FDRXFCLGFBQWEsQ0FBQzFYLEtBQUQsRUFBUTtBQUNuQjRDLFdBQU8sa0JBQVdGLGlCQUFYLGNBQWdDaEIsSUFBaEMsQ0FEWTtBQUVuQmYsUUFBSSxFQUFFLEtBRmE7QUFHbkIsT0FBRzBWO0FBSGdCLEdBQVIsQ0FBYixDQUlHbGIsSUFKSCxDQUlRLFVBQUF3YyxhQUFhO0FBQUEsV0FDbkIsbUJBQ0VBLGFBQWEsQ0FBQ3ZiLEdBQWQsQ0FBa0IsVUFBQXdiLFlBQVk7QUFBQSxhQUM1QjVYLEtBQUssQ0FBQ00sR0FBTixXQUFhc1gsWUFBYixnQkFBc0MzWCxLQUF0QyxFQUQ0QjtBQUFBLEtBQTlCLENBREYsRUFJRTlFLElBSkYsQ0FJT2diLFdBSlAsQ0FEbUI7QUFBQSxHQUpyQixDQURGO0FBQUEsQ0FEc0IsQ0FBeEI7QUFlQSxJQUFNMEIsZ0JBQWdCLEdBQUcscUJBQU0sVUFBQzdYLEtBQUQsRUFBUXFXLE1BQVI7QUFBQSxTQUM3QnJXLEtBQUssQ0FDRk0sR0FESCxDQUVJLGVBQU93WCxnQkFBUCxDQUF3QjNWLEtBQXhCLENBQThCQyxPQUE5QixDQUFzQztBQUFFSCxXQUFPLEVBQUVvVSxNQUFNLENBQUMwQjtBQUFsQixHQUF0QyxDQUZKLEVBSUc5WCxLQUpILENBS0k5RixDQUFDLENBQUM2ZCxPQUFGLENBQVUsZUFBTzlWLEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRUgsV0FBTyxFQUFFb1UsTUFBTSxDQUFDMEI7QUFBbEIsR0FBM0IsQ0FBVixDQUxKLENBRDZCO0FBQUEsQ0FBTixDQUF6QjtBQVVBLElBQU1uUSxLQUFLLEdBQUcscUJBQU0sVUFBQzVILEtBQUQsRUFBUXFKLFNBQVI7QUFBQSxTQUNsQnJKLEtBQUssQ0FBQ00sR0FBTixDQUFVK0ksU0FBVixFQUFxQmxPLElBQXJCLENBQTBCLFVBQUE4YyxJQUFJLEVBQUk7QUFDaEMsUUFBSSxDQUFDQSxJQUFELElBQVMsQ0FBQ0EsSUFBSSxDQUFDdFcsRUFBbkIsRUFBdUIsT0FBTyxJQUFQO0FBQ3ZCLFFBQU1yRyxNQUFNLEdBQUc7QUFBRXFHLFFBQUUsRUFBRXNXLElBQUksQ0FBQ3RXLEVBQVg7QUFBZTZOLGVBQVMsRUFBRXJGLFVBQVUsQ0FBQzhOLElBQUksQ0FBQ3pJLFNBQU4sRUFBaUIsRUFBakI7QUFBcEMsS0FBZjtBQUNBLFFBQU0wSSxXQUFXLEdBQUcvZCxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxTQUFELEVBQVksR0FBWixDQUFQLEVBQXlCb1osSUFBekIsQ0FBcEI7QUFDQSxRQUFNRSxNQUFNLEdBQUdoZSxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUFQLEVBQW9Cb1osSUFBcEIsQ0FBZjtBQUNBLFFBQU16RixJQUFJLEdBQUcyRixNQUFNLEdBQUcsZUFBT2pXLEtBQVAsQ0FBYUMsS0FBYixDQUFtQjRMLEtBQW5CLENBQXlCb0ssTUFBekIsRUFBaUNDLE9BQXBDLEdBQThDLElBQWpFO0FBQ0EsUUFBTUMsU0FBUyxHQUFHSCxXQUFXLEdBQ3pCLGVBQU9oVyxLQUFQLENBQWFDLEtBQWIsQ0FBbUI0TCxLQUFuQixDQUF5Qm1LLFdBQXpCLEVBQXNDRSxPQURiLEdBRXpCLElBRko7QUFJQSxRQUFJNUYsSUFBSixFQUFVbFgsTUFBTSxDQUFDa1gsSUFBUCxHQUFjQSxJQUFkO0FBQ1YsUUFBSTZGLFNBQUosRUFBZS9jLE1BQU0sQ0FBQytjLFNBQVAsR0FBbUJBLFNBQW5CO0FBQ2YsV0FBTy9jLE1BQVA7QUFDRCxHQWJELENBRGtCO0FBQUEsQ0FBTixDQUFkOztBQWlCQSxJQUFNZ2QsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFBQyxRQUFRO0FBQUEsU0FDN0IscUJBQU0sVUFBQ3ZZLEtBQUQsRUFBUXFKLFNBQVI7QUFBQSxXQUNKckosS0FBSyxDQUNGTSxHQURILENBQ08rSSxTQURQLEVBRUcvSSxHQUZILENBRU9pWSxRQUZQLEVBR0dsUSxLQUhILEVBREk7QUFBQSxHQUFOLENBRDZCO0FBQUEsQ0FBL0I7O0FBUUEsSUFBTW1RLFlBQVksR0FBR0YsY0FBYyxDQUFDLFNBQUQsQ0FBbkM7QUFDQSxJQUFNRyxjQUFjLEdBQUdILGNBQWMsQ0FBQyxXQUFELENBQXJDO0FBQ0EsSUFBTUkscUJBQXFCLEdBQUcscUJBQU0sVUFBQzFZLEtBQUQsRUFBUXFKLFNBQVI7QUFBQSxTQUNsQ3JKLEtBQUssQ0FBQ00sR0FBTixXQUFhK0ksU0FBYixtQkFBc0NoQixLQUF0QyxFQURrQztBQUFBLENBQU4sQ0FBOUI7QUFJQSxJQUFNc1Esa0JBQWtCLEdBQUcscUJBQU0sVUFBQzNZLEtBQUQsRUFBUXFKLFNBQVI7QUFBQSxTQUMvQixtQkFBSSxDQUNGbVAsWUFBWSxDQUFDeFksS0FBRCxFQUFRcUosU0FBUixDQURWLEVBRUZvUCxjQUFjLENBQUN6WSxLQUFELEVBQVFxSixTQUFSLENBRlosRUFHRnFQLHFCQUFxQixDQUFDMVksS0FBRCxFQUFRcUosU0FBUixDQUhuQixDQUFKLEVBSUdsTyxJQUpILENBSVE7QUFBQTtBQUFBLFFBQUV5ZCxFQUFGO0FBQUEsUUFBTUMsSUFBTjtBQUFBLFFBQVlqRCxPQUFaOztBQUFBLFdBQTBCO0FBQUVnRCxRQUFFLEVBQUZBLEVBQUY7QUFBTUMsVUFBSSxFQUFKQSxJQUFOO0FBQVlqRCxhQUFPLEVBQVBBLE9BQVo7QUFBcUI5RixXQUFLLEVBQUU4SSxFQUFFLEdBQUdDO0FBQWpDLEtBQTFCO0FBQUEsR0FKUixDQUQrQjtBQUFBLENBQU4sQ0FBM0I7QUFRQSxJQUFNelAsU0FBUyxHQUFHLHFCQUNoQixVQUFDcEosS0FBRDtBQUFBLE1BQVVxSixTQUFWLFNBQVVBLFNBQVY7QUFBQSxNQUFxQnZOLFNBQXJCLFNBQXFCQSxTQUFyQjtBQUFBLHlCQUFnQzhDLElBQWhDO0FBQUEsTUFBZ0NBLElBQWhDLDJCQUF1QyxLQUF2QztBQUFBLDJCQUE4QzBLLE1BQTlDO0FBQUEsTUFBOENBLE1BQTlDLDZCQUF1RCxLQUF2RDtBQUFBLFNBQ0UsbUJBQUksQ0FDRjFCLEtBQUssQ0FBQzVILEtBQUQsRUFBUXFKLFNBQVIsQ0FESCxFQUVGQyxNQUFNLEdBQ0Z4TixTQUFTLEdBQ1BrRSxLQUFLLENBQUNNLEdBQU4sV0FBYStJLFNBQWIsMEJBQXNDdk4sU0FBdEMsUUFBb0RYLElBQXBELEVBRE8sQ0FDb0Q7QUFEcEQsSUFFUHdkLGtCQUFrQixDQUFDM1ksS0FBRCxFQUFRcUosU0FBUixDQUFsQixDQUFxQ2xPLElBQXJDLEVBSEEsR0FJRix3QkFORixFQU9GeUQsSUFBSSxHQUNBb0IsS0FBSyxDQUNGTSxHQURILENBQ08rSSxTQURQLEVBRUcvSSxHQUZILENBRU8sTUFGUCxFQUdHbkYsSUFISCxFQURBLEdBS0Esd0JBWkYsQ0FBSixFQWFHQSxJQWJILENBYVEsa0JBQXlCO0FBQUE7QUFBQSxRQUF2QjhjLElBQXVCO0FBQUEsUUFBakJhLEtBQWlCO0FBQUEsUUFBVmxhLElBQVU7O0FBQy9CLFFBQUksQ0FBQ3FaLElBQUQsSUFBUyxDQUFDQSxJQUFJLENBQUN0VyxFQUFuQixFQUF1QixPQUFPLElBQVA7QUFDdkIsV0FBTyxFQUFFLEdBQUdzVyxJQUFMO0FBQVdhLFdBQUssRUFBTEEsS0FBWDtBQUFrQmxhLFVBQUksRUFBSkE7QUFBbEIsS0FBUDtBQUNELEdBaEJELENBREY7QUFBQSxDQURnQixDQUFsQjtBQXFCQSxJQUFNbWEsY0FBYyxHQUFHLHFCQUFNLFVBQUMvWSxLQUFELEVBQVFxVyxNQUFSO0FBQUEsU0FDM0IsbUJBQ0VsYyxDQUFDLENBQUNvRyxNQUFGLENBQ0UsVUFBQ3lZLFFBQUQsRUFBVzNQLFNBQVgsRUFBeUI7QUFDdkIsUUFBSSxDQUFDQSxTQUFMLEVBQWdCLE9BQU8yUCxRQUFQO0FBQ2hCQSxZQUFRLENBQUM5UixJQUFULENBQWNrQyxTQUFTLENBQUNwSixLQUFELEVBQVEsRUFBRSxHQUFHcVcsTUFBTDtBQUFhaE4sZUFBUyxFQUFUQTtBQUFiLEtBQVIsQ0FBdkI7QUFDQSxXQUFPMlAsUUFBUDtBQUNELEdBTEgsRUFNRSxFQU5GLEVBT0U3ZSxDQUFDLENBQUN3UCxNQUFGLENBQVMsRUFBVCxFQUFhLFlBQWIsRUFBMkIwTSxNQUEzQixDQVBGLENBREYsQ0FEMkI7QUFBQSxDQUFOLENBQXZCOztBQWNBLElBQU00QyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxXQUFELEVBQWNDLE1BQWQsRUFBc0JDLE1BQXRCO0FBQUEsTUFBOEJDLE9BQTlCLHVFQUF3Q2xELFdBQXhDO0FBQUEsU0FDakIscUJBQU0sVUFBQ25XLEtBQUQsRUFBUXFXLE1BQVIsRUFBbUI7QUFDdkIsUUFBTWlELEtBQUssR0FBR25mLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTzBhLE1BQVAsRUFBZTlDLE1BQWYsQ0FBZDtBQUVBLFFBQUlsYyxDQUFDLENBQUN3USxLQUFGLENBQVEyTyxLQUFSLENBQUosRUFBb0IsT0FBT3BELFlBQVA7QUFDcEIsV0FBTyxtQkFDTC9iLENBQUMsQ0FBQ2lDLEdBQUYsQ0FDRSxVQUFBRSxHQUFHO0FBQUEsYUFBSTRjLFdBQVcsQ0FBQ2xaLEtBQUQsb0JBQVUsR0FBR3FXO0FBQWIsU0FBc0IrQyxNQUF0QixFQUErQjljLEdBQS9CLEVBQWY7QUFBQSxLQURMLEVBRUVuQyxDQUFDLENBQUN3UCxNQUFGLENBQVMsRUFBVCxFQUFhd1AsTUFBYixFQUFxQjlDLE1BQXJCLENBRkYsQ0FESyxFQUtMbGIsSUFMSyxDQUtBa2UsT0FMQSxDQUFQO0FBTUQsR0FWRCxDQURpQjtBQUFBLENBQW5COztBQWFBLElBQU1uWSxVQUFVLEdBQUcrWCxVQUFVLENBQUNuQyxXQUFELEVBQWMsUUFBZCxFQUF3QixPQUF4QixDQUE3QjtBQUNBLElBQU12VixXQUFXLEdBQUcwWCxVQUFVLENBQUM3QixZQUFELEVBQWUsU0FBZixFQUEwQixRQUExQixDQUE5QjtBQUNBLElBQU14VixXQUFXLEdBQUdxWCxVQUFVLENBQUMxQixZQUFELEVBQWUsV0FBZixFQUE0QixVQUE1QixDQUE5QjtBQUNBLElBQU1oVixlQUFlLEdBQUcwVyxVQUFVLENBQ2hDcEIsZ0JBRGdDLEVBRWhDLGVBRmdDLEVBR2hDLGNBSGdDLENBQWxDOztBQU1BLElBQU0wQixrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUF2WixLQUFLO0FBQUEsU0FBSSxVQUFBQyxLQUFLO0FBQUEsV0FDdkMsbUJBQ0VBLEtBQUssQ0FDRnFLLE1BREgsQ0FDVSxVQUFBcUYsQ0FBQztBQUFBLGFBQUksQ0FBQyxDQUFDQSxDQUFOO0FBQUEsS0FEWCxFQUVHdlQsR0FGSCxDQUVPLFVBQUE0QixJQUFJO0FBQUEsYUFDUGdDLEtBQUssQ0FDRk0sR0FESCxDQUNPdEMsSUFEUCxFQUVHc0MsR0FGSCxDQUVPLE1BRlAsRUFHR25GLElBSEgsQ0FHUSxVQUFBd1UsQ0FBQztBQUFBLGVBQUlBLENBQUo7QUFBQSxPQUhULENBRE87QUFBQSxLQUZYLENBREYsQ0FEdUM7QUFBQSxHQUFUO0FBQUEsQ0FBaEM7O0FBWUEsSUFBTTZKLE9BQU8sR0FBRyxxQkFBTSxVQUFDeFosS0FBRCxFQUFReUIsU0FBUjtBQUFBLE1BQW1CZ1ksY0FBbkIsdUVBQW9DLEtBQXBDO0FBQUEsU0FDcEIsbUJBQUksQ0FDRjdYLFdBQVcsQ0FBQzVCLEtBQUQsRUFBUTtBQUNqQjBCLFFBQUksRUFBRSxVQURXO0FBRWpCRCxhQUFTLEVBQVRBO0FBRmlCLEdBQVIsQ0FBWCxDQUlHdEcsSUFKSCxDQUlRb2Usa0JBQWtCLENBQUN2WixLQUFELENBSjFCLEVBS0c3RSxJQUxILENBTUloQixDQUFDLENBQUNnQyxPQUFGLENBQ0VoQyxDQUFDLENBQUNpQyxHQUFGLENBQU1xZCxjQUFjLEdBQUd0ZixDQUFDLENBQUNzRSxJQUFGLENBQU8sTUFBUCxDQUFILEdBQW9CdEUsQ0FBQyxDQUFDc0UsSUFBRixDQUFPLFdBQVAsQ0FBeEMsQ0FERixFQUVFdEUsQ0FBQyxDQUFDbVEsTUFBRixDQUFTblEsQ0FBQyxDQUFDc0UsSUFBRixDQUFPLFdBQVAsQ0FBVCxDQUZGLENBTkosQ0FERSxFQVlGbUQsV0FBVyxDQUFDNUIsS0FBRCxFQUFRO0FBQ2pCMEIsUUFBSSxFQUFFLFdBRFc7QUFFakJELGFBQVMsRUFBVEE7QUFGaUIsR0FBUixDQUFYLENBR0d0RyxJQUhILENBR1FoQixDQUFDLENBQUNpQyxHQUFGLENBQU0sVUFBQTRCLElBQUk7QUFBQSxXQUFJLGVBQU9rRSxLQUFQLENBQWFDLEtBQWIsQ0FBbUI0TCxLQUFuQixDQUF5Qi9QLElBQXpCLEVBQStCaUUsT0FBbkM7QUFBQSxHQUFWLENBSFIsQ0FaRSxDQUFKLEVBZ0JHOUcsSUFoQkgsQ0FnQlE7QUFBQTtBQUFBLFFBQUV1ZSxJQUFGO0FBQUEsUUFBUUMsSUFBUjs7QUFBQSxXQUFrQnhmLENBQUMsQ0FBQ3VNLElBQUYsOEJBQVdnVCxJQUFYLHNCQUFvQkMsSUFBcEIsR0FBbEI7QUFBQSxHQWhCUixDQURvQjtBQUFBLENBQU4sQ0FBaEI7QUFvQkEsSUFBTUMsV0FBVyxHQUFHLHFCQUNsQixVQUFDNVosS0FBRCxFQUFRbEUsU0FBUixFQUFtQm1HLE9BQW5CO0FBQUEsU0FDRW5HLFNBQVMsSUFBSW1HLE9BQWIsR0FDSWpDLEtBQUssQ0FDRk0sR0FESCxDQUNPLGVBQU93TixlQUFQLENBQXVCM0wsS0FBdkIsQ0FBNkJDLE9BQTdCLENBQXFDO0FBQUVILFdBQU8sRUFBUEEsT0FBRjtBQUFXbkcsYUFBUyxFQUFUQTtBQUFYLEdBQXJDLENBRFAsRUFFR1gsSUFGSCxFQURKLEdBSUksd0JBTE47QUFBQSxDQURrQixFQU9sQixhQVBrQixDQUFwQjtBQVVBLElBQU0wZSxZQUFZLEdBQUcscUJBQU0sVUFBQzdaLEtBQUQsRUFBUWlDLE9BQVI7QUFBQSxTQUN6QmpDLEtBQUssQ0FBQ00sR0FBTixDQUFVLGVBQU9tUyxhQUFQLENBQXFCdFEsS0FBckIsQ0FBMkJDLE9BQTNCLENBQW1DO0FBQUVILFdBQU8sRUFBUEE7QUFBRixHQUFuQyxDQUFWLEVBQTJEOUcsSUFBM0QsRUFEeUI7QUFBQSxDQUFOLENBQXJCO0FBSUEsSUFBTTJlLFNBQVMsR0FBRyxxQkFDaEIsVUFBQzlaLEtBQUQsRUFBUWlDLE9BQVI7QUFBQSxTQUNFQSxPQUFPLEdBQ0hqQyxLQUFLLENBQUNNLEdBQU4sQ0FBVSxlQUFPNEIsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxXQUFPLEVBQVBBO0FBQUYsR0FBM0IsQ0FBVixFQUFtRDNCLEdBQW5ELENBQXVELE1BQXZELENBREcsR0FFSCx1QkFBUSxJQUFSLENBSE47QUFBQSxDQURnQixFQUtoQixXQUxnQixDQUFsQjtBQVFBLElBQU15WixTQUFTLEdBQUcscUJBQ2hCLFVBQUMvWixLQUFELEVBQVF5SCxRQUFSO0FBQUEsU0FDRXpILEtBQUssQ0FBQ00sR0FBTixDQUFVLGVBQU8wWixXQUFQLENBQW1CN1gsS0FBbkIsQ0FBeUJDLE9BQXpCLENBQWlDO0FBQUVxRixZQUFRLEVBQVJBO0FBQUYsR0FBakMsQ0FBVixDQURGO0FBQUEsQ0FEZ0IsRUFHaEIsV0FIZ0IsQ0FBbEI7QUFNQSxJQUFNd1MsVUFBVSxHQUFHLHFCQUNqQixVQUFDamEsS0FBRCxFQUFReUgsUUFBUixFQUFrQmpFLElBQWxCO0FBQUEsU0FDRXhELEtBQUssQ0FDRk0sR0FESCxDQUNPLGVBQU8wWixXQUFQLENBQW1CN1gsS0FBbkIsQ0FBeUJDLE9BQXpCLENBQWlDO0FBQUVxRixZQUFRLEVBQVJBO0FBQUYsR0FBakMsQ0FEUCxFQUVHbkgsR0FGSCxDQUVPa0QsSUFGUCxFQUdHbEQsR0FISCxDQUdPLElBSFAsQ0FERjtBQUFBLENBRGlCLEVBTWpCLFlBTmlCLENBQW5CO0FBU0EsSUFBTTRaLFFBQVEsR0FBRyxxQkFBTSxVQUFDbGEsS0FBRCxFQUFReUgsUUFBUixFQUFrQmpFLElBQWxCO0FBQUEsU0FDckJ5VyxVQUFVLENBQUNqYSxLQUFELEVBQVF5SCxRQUFSLEVBQWtCakUsSUFBbEIsQ0FBVixDQUFrQ3JJLElBQWxDLENBQXVDLFVBQUF3RyxFQUFFO0FBQUEsV0FBSUEsRUFBRSxJQUFJbVksU0FBUyxDQUFDOVosS0FBRCxFQUFRMkIsRUFBUixDQUFuQjtBQUFBLEdBQXpDLENBRHFCO0FBQUEsQ0FBTixDQUFqQjtBQUlBLElBQU13WSxRQUFRLEdBQUcscUJBQ2YsVUFBQ25hLEtBQUQsRUFBUTJCLEVBQVI7QUFBQSxTQUNFM0IsS0FBSyxDQUFDTSxHQUFOLENBQVVxQixFQUFWLEVBQWN4RyxJQUFkLENBQW1CLFVBQUE4YyxJQUFJO0FBQUEsV0FBSztBQUMxQm1DLGVBQVMsRUFBRWpnQixDQUFDLENBQUNzRSxJQUFGLENBQU8sT0FBUCxFQUFnQndaLElBQWhCLENBRGU7QUFFMUJvQyxlQUFTLEVBQUVsZ0IsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxLQUFYLENBQVAsRUFBMEJvWixJQUExQjtBQUZlLEtBQUw7QUFBQSxHQUF2QixDQURGO0FBQUEsQ0FEZSxFQU1mLFVBTmUsQ0FBakI7QUFTQSxJQUFNdkMsV0FBVyxHQUFHdmIsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQ2tnQixHQUFELEVBQU05ZixJQUFOO0FBQUEsU0FDMUIscUJBQVVMLENBQUMsQ0FBQ3dYLEtBQUYsQ0FBUSxLQUFSLEVBQWUySSxHQUFHLENBQUMzZixHQUFuQixFQUF3QkgsSUFBSSxJQUFJLEVBQWhDLENBQVYsQ0FEMEI7QUFBQSxDQUFSLENBQXBCO0FBSU8sSUFBTStmLEtBQUssR0FBRztBQUNuQnpELGFBQVcsRUFBWEEsV0FEbUI7QUFFbkJNLGNBQVksRUFBWkEsWUFGbUI7QUFHbkJHLGNBQVksRUFBWkEsWUFIbUI7QUFJbkJHLGVBQWEsRUFBYkEsYUFKbUI7QUFLbkJqVixpQkFBZSxFQUFmQSxlQUxtQjtBQU1uQm9WLGtCQUFnQixFQUFoQkEsZ0JBTm1CO0FBT25CYyxvQkFBa0IsRUFBbEJBLGtCQVBtQjtBQVFuQnZQLFdBQVMsRUFBVEEsU0FSbUI7QUFTbkIyUCxnQkFBYyxFQUFkQSxjQVRtQjtBQVVuQjdYLFlBQVUsRUFBVkEsVUFWbUI7QUFXbkJLLGFBQVcsRUFBWEEsV0FYbUI7QUFZbkJLLGFBQVcsRUFBWEEsV0FabUI7QUFhbkJXLGlCQUFlLEVBQWZBLGVBYm1CO0FBY25CcVgsYUFBVyxFQUFYQSxXQWRtQjtBQWVuQkMsY0FBWSxFQUFaQSxZQWZtQjtBQWdCbkJDLFdBQVMsRUFBVEEsU0FoQm1CO0FBaUJuQjFELFlBQVUsRUFBVkEsVUFqQm1CO0FBa0JuQjJELFdBQVMsRUFBVEEsU0FsQm1CO0FBbUJuQkUsWUFBVSxFQUFWQSxVQW5CbUI7QUFvQm5CQyxVQUFRLEVBQVJBLFFBcEJtQjtBQXFCbkJDLFVBQVEsRUFBUkEsUUFyQm1CO0FBc0JuQnpFLGFBQVcsRUFBWEEsV0F0Qm1CO0FBdUJuQjhELFNBQU8sRUFBUEE7QUF2Qm1CLENBQWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFRQOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1nQixXQUFXLEdBQUcsRUFDbEIsR0FBR0MsR0FBRyxDQUFDQyxXQURXO0FBRWxCOUQsV0FBUyxFQUFFO0FBQ1RsVixRQUFJLEVBQUUsUUFERztBQUVUaVosYUFBUyxFQUFFLENBRkY7QUFHVEMsYUFBUyxFQUFFLHFCQUFVOWQ7QUFIWixHQUZPO0FBUWxCK2QsVUFBUSxFQUFFO0FBQ1JDLFNBQUssRUFBRSxXQURDO0FBRVJDLGVBQVcsRUFBRSxtQ0FGTDtBQUdSL2MsUUFBSSxFQUFFO0FBQ0pnZCxhQUFPLFlBQUsscUJBQVV2ZSxNQUFmLDhDQURIO0FBRUp3ZSxnQkFBVSxFQUFFO0FBQ1ZyRSxpQkFBUyxFQUFFO0FBQUVzRSxjQUFJLEVBQUU7QUFBUixTQUREO0FBRVZDLFlBQUksRUFBRTtBQUFFelosY0FBSSxFQUFFLFFBQVI7QUFBa0IwWixpQkFBTyxFQUFFLElBQTNCO0FBQWlDQyxpQkFBTyxFQUFFO0FBQTFDLFNBRkk7QUFHVkMsYUFBSyxFQUFFO0FBQUU1WixjQUFJLEVBQUUsUUFBUjtBQUFrQjBaLGlCQUFPLEVBQUUsQ0FBM0I7QUFBOEJDLGlCQUFPLEVBQUU7QUFBdkMsU0FIRztBQUlWRSxXQUFHLEVBQUU7QUFBRTdaLGNBQUksRUFBRSxRQUFSO0FBQWtCMFosaUJBQU8sRUFBRSxDQUEzQjtBQUE4QkMsaUJBQU8sRUFBRTtBQUF2QztBQUpLLE9BRlI7QUFRSkcsY0FBUSxFQUFFLENBQUMsV0FBRCxFQUFjLE1BQWQsRUFBc0IsT0FBdEIsRUFBK0IsS0FBL0I7QUFSTixLQUhFO0FBYVJDLGlCQUFhLEVBQUU7QUFBRWpZLFVBQUksRUFBRTtBQUFSLEtBYlA7QUFjUnlYLGNBQVUsRUFBRTtBQUNWelgsVUFBSSxFQUFFO0FBQ0p1WCxtQkFBVyxFQUFFLDJCQURUO0FBRUpyWixZQUFJLEVBQUU7QUFGRjtBQURJLEtBZEo7QUFvQlJnYSx3QkFBb0IsRUFBRTtBQUNwQkMsb0JBQWMsRUFBRSxJQURJO0FBRXBCQyxXQUFLLEVBQUUsQ0FDTDtBQUFFVixZQUFJLEVBQUU7QUFBUixPQURLLEVBRUw7QUFBRUEsWUFBSSxFQUFFO0FBQVIsT0FGSztBQUZhO0FBcEJkLEdBUlE7QUFxQ2xCVyxPQUFLLEVBQUU7QUFDTGYsU0FBSyxFQUFFLE9BREY7QUFFTEMsZUFBVyxFQUFFLHVCQUZSO0FBR0wvYyxRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYsdUJBREg7QUFFSndlLGdCQUFVLEVBQUU7QUFDVnJFLGlCQUFTLEVBQUU7QUFBRXNFLGNBQUksRUFBRTtBQUFSO0FBREQsT0FGUjtBQUtKTSxjQUFRLEVBQUUsQ0FBQyxXQUFEO0FBTE4sS0FIRDtBQVVMQyxpQkFBYSxFQUFFO0FBQUVqWSxVQUFJLEVBQUU7QUFBUixLQVZWO0FBV0x5WCxjQUFVLEVBQUU7QUFDVnpYLFVBQUksRUFBRTtBQUNKdVgsbUJBQVcsRUFBRSwyQkFEVDtBQUVKclosWUFBSSxFQUFFO0FBRkY7QUFESSxLQVhQO0FBaUJMZ2Esd0JBQW9CLEVBQUU7QUFDcEJDLG9CQUFjLEVBQUUsSUFESTtBQUVwQkMsV0FBSyxFQUFFLENBQ0w7QUFBRVYsWUFBSSxFQUFFO0FBQVIsT0FESyxFQUVMO0FBQUVBLFlBQUksRUFBRTtBQUFSLE9BRks7QUFGYTtBQWpCakIsR0FyQ1c7QUErRGxCNUQsWUFBVSxFQUFFO0FBQ1Y1VixRQUFJLEVBQUUsUUFESTtBQUVWaVosYUFBUyxFQUFFLENBRkQ7QUFHVkMsYUFBUyxFQUFFLHFCQUFVMWQ7QUFIWCxHQS9ETTtBQXFFbEJtYSxRQUFNLEVBQUU7QUFDTnlELFNBQUssRUFBRSxRQUREO0FBRU5DLGVBQVcsRUFBRSx3QkFGUDtBQUdOL2MsUUFBSSxFQUFFO0FBQ0pnZCxhQUFPLFlBQUsscUJBQVV2ZSxNQUFmLHlCQURIO0FBRUp3ZSxnQkFBVSxFQUFFO0FBQ1YzRCxrQkFBVSxFQUFFO0FBQUU0RCxjQUFJLEVBQUU7QUFBUjtBQURGLE9BRlI7QUFLSk0sY0FBUSxFQUFFLENBQUMsWUFBRDtBQUxOLEtBSEE7QUFVTkUsd0JBQW9CLEVBQUU7QUFDcEJDLG9CQUFjLEVBQUUsSUFESTtBQUVwQkMsV0FBSyxFQUFFLENBQUM7QUFBRVYsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZhO0FBVmhCLEdBckVVO0FBcUZsQlksS0FBRyxFQUFFO0FBQUVwYSxRQUFJLEVBQUUsQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFSO0FBQTRCa1osYUFBUyxFQUFFLHFCQUFVM2Q7QUFBakQsR0FyRmE7QUFzRmxCOGUsS0FBRyxFQUFFO0FBQ0hqQixTQUFLLEVBQUUsS0FESjtBQUVIQyxlQUFXLEVBQUUsNEJBRlY7QUFHSC9jLFFBQUksRUFBRTtBQUNKZ2QsYUFBTyxZQUFLLHFCQUFVdmUsTUFBZixlQURIO0FBQ3VDO0FBQzNDd2UsZ0JBQVUsRUFBRTtBQUNWYSxXQUFHLEVBQUU7QUFBRVosY0FBSSxFQUFFO0FBQVI7QUFESyxPQUZSO0FBS0pNLGNBQVEsRUFBRSxDQUFDLEtBQUQ7QUFMTixLQUhIO0FBVUhFLHdCQUFvQixFQUFFO0FBQ3BCQyxvQkFBYyxFQUFFLElBREk7QUFFcEJDLFdBQUssRUFBRSxDQUFDO0FBQUVWLFlBQUksRUFBRTtBQUFSLE9BQUQ7QUFGYTtBQVZuQixHQXRGYTtBQXNHbEJqWixTQUFPLEVBQUU7QUFDUFAsUUFBSSxFQUFFLFFBREM7QUFFUGtaLGFBQVMsRUFBRSxxQkFBVWhlO0FBRmQsR0F0R1M7QUEyR2xCeU0sV0FBUyxFQUFFO0FBQ1Q0UixjQUFVLEVBQUU7QUFDVmhaLGFBQU8sRUFBRTtBQUFFLGdCQUFRO0FBQVY7QUFEQztBQURILEdBM0dPO0FBaUhsQjZWLGtCQUFnQixFQUFFO0FBQ2hCZ0QsU0FBSyxFQUFFLG9CQURTO0FBRWhCQyxlQUFXLEVBQUUscUNBRkc7QUFHaEIvYyxRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYsaUNBREg7QUFFSnVmLFdBQUssRUFBRSxDQUFDO0FBQUVkLFlBQUksRUFBRTtBQUFSLE9BQUQ7QUFGSCxLQUhVO0FBT2hCUSx3QkFBb0IsRUFBRTtBQUNwQkMsb0JBQWMsRUFBRSxJQURJO0FBRXBCQyxXQUFLLEVBQUUsQ0FBQztBQUFFVixZQUFJLEVBQUU7QUFBUixPQUFEO0FBRmE7QUFQTixHQWpIQTtBQThIbEJ6SSxlQUFhLEVBQUU7QUFDYnFJLFNBQUssRUFBRSxnQkFETTtBQUViQyxlQUFXLEVBQUUsMkJBRkE7QUFHYi9jLFFBQUksRUFBRTtBQUNKZ2QsYUFBTyxZQUFLLHFCQUFVdmUsTUFBZiw4QkFESDtBQUVKdWYsV0FBSyxFQUFFLENBQUM7QUFBRWQsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZILEtBSE87QUFPYlEsd0JBQW9CLEVBQUU7QUFDcEJDLG9CQUFjLEVBQUUsSUFESTtBQUVwQkMsV0FBSyxFQUFFLENBQUM7QUFBRVYsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZhO0FBUFQsR0E5SEc7QUEySWxCMUwsV0FBUyxFQUFFO0FBQUU5TixRQUFJLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWDtBQUFSLEdBM0lPO0FBNElsQnVhLFdBQVMsRUFBRTtBQUNUdmEsUUFBSSxFQUFFLFFBREc7QUFFVGtaLGFBQVMsRUFBRSxxQkFBVXpkO0FBRlosR0E1SU87QUFpSmxCK0UsT0FBSyxFQUFFO0FBQ0w0WSxTQUFLLEVBQUUsaUJBREY7QUFFTEMsZUFBVyxFQUNULCtEQUhHO0FBSUwvYyxRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYscUJBREg7QUFFSnVmLFdBQUssRUFBRSxDQUFDO0FBQUVkLFlBQUksRUFBRTtBQUFSLE9BQUQ7QUFGSCxLQUpEO0FBUUxPLGlCQUFhLEVBQUU7QUFBRTlaLFFBQUUsRUFBRTtBQUFOLEtBUlY7QUFTTHNaLGNBQVUsRUFBRTtBQUNWdFosUUFBRSxFQUFFO0FBQUV1WixZQUFJLEVBQUU7QUFBUixPQURNO0FBRVY1VCxVQUFJLEVBQUU7QUFBRSxnQkFBUTtBQUFWLE9BRkk7QUFHVmtJLGVBQVMsRUFBRTtBQUFFMEwsWUFBSSxFQUFFO0FBQVIsT0FIRDtBQUlWZ0Isa0JBQVksRUFBRTtBQUFFaEIsWUFBSSxFQUFFO0FBQVIsT0FKSjtBQUtWdGMsVUFBSSxFQUFFO0FBQ0p1ZCxhQUFLLEVBQUUsQ0FDTDtBQUFFakIsY0FBSSxFQUFFO0FBQVIsU0FESyxFQUVMO0FBQUVBLGNBQUksRUFBRTtBQUFSLFNBRks7QUFESCxPQUxJO0FBV1ZoWSxXQUFLLEVBQUU7QUFDTDBZLGFBQUssRUFBRSxDQUNMO0FBQUVWLGNBQUksRUFBRTtBQUFSLFNBREssRUFFTDtBQUNFSCxxQkFBVyxFQUFFLHlDQURmO0FBRUVyWixjQUFJLEVBQUUsUUFGUjtBQUdFZ2EsOEJBQW9CLEVBQUUsS0FIeEI7QUFJRVQsb0JBQVUsRUFBRTtBQUNWLGlCQUFLO0FBQUV2WixrQkFBSSxFQUFFLFFBQVI7QUFBa0JrWix1QkFBUyxFQUFFO0FBQTdCO0FBREssV0FKZDtBQU9FWSxrQkFBUSxFQUFFLENBQUMsR0FBRDtBQVBaLFNBRks7QUFERixPQVhHO0FBeUJWdlksWUFBTSxFQUFFO0FBQUVpWSxZQUFJLEVBQUU7QUFBUixPQXpCRTtBQTBCVlksU0FBRyxFQUFFO0FBQUVaLFlBQUksRUFBRTtBQUFSLE9BMUJLO0FBMkJWdEwsY0FBUSxFQUFFO0FBQUV3TSx3QkFBZ0IsRUFBRTtBQUFwQixPQTNCQTtBQTRCVkMsaUJBQVcsRUFBRTtBQUFFRCx3QkFBZ0IsRUFBRTtBQUFwQixPQTVCSDtBQTZCVkUsYUFBTyxFQUFFO0FBQUVGLHdCQUFnQixFQUFFO0FBQXBCLE9BN0JDO0FBOEJWRyxlQUFTLEVBQUU7QUFBRUgsd0JBQWdCLEVBQUU7QUFBcEIsT0E5QkQ7QUErQlZ0WixRQUFFLEVBQUU7QUFBRW9ZLFlBQUksRUFBRTtBQUFSLE9BL0JNO0FBZ0NWc0IsYUFBTyxFQUFFO0FBQUV0QixZQUFJLEVBQUU7QUFBUixPQWhDQztBQWlDVmxZLFlBQU0sRUFBRTtBQUFFa1ksWUFBSSxFQUFFO0FBQVI7QUFqQ0UsS0FUUDtBQTZDTFUsU0FBSyxFQUFFLENBQ0w7QUFDRUksV0FBSyxFQUFFLENBQ0w7QUFDRVMsNEJBQW9CLEVBQUU7QUFEeEIsT0FESyxFQUlMO0FBQ0ViLGFBQUssRUFBRSxDQUNMO0FBQUVjLHFDQUEyQixFQUFFO0FBQS9CLFNBREssRUFFTDtBQUFFQyxzQ0FBNEIsRUFBRTtBQUFoQyxTQUZLO0FBRFQsT0FKSztBQURULEtBREssRUFjTDtBQUFFQyxtQkFBYSxFQUFFO0FBQWpCLEtBZEssRUFlTDtBQUNFbEIsMEJBQW9CLEVBQUUsS0FEeEI7QUFFRVgsaUJBQVcsRUFBRSw0Q0FGZjtBQUdFRSxnQkFBVSxFQUFFO0FBQ1Z0WixVQUFFLEVBQUU7QUFBRXVaLGNBQUksRUFBRTtBQUFSLFNBRE07QUFFVnRMLGdCQUFRLEVBQUU7QUFBRXdNLDBCQUFnQixFQUFFO0FBQXBCLFNBRkE7QUFHVkMsbUJBQVcsRUFBRTtBQUFFRCwwQkFBZ0IsRUFBRTtBQUFwQixTQUhIO0FBSVZFLGVBQU8sRUFBRTtBQUFFRiwwQkFBZ0IsRUFBRTtBQUFwQixTQUpDO0FBS1ZHLGlCQUFTLEVBQUU7QUFBRUgsMEJBQWdCLEVBQUU7QUFBcEI7QUFMRDtBQUhkLEtBZks7QUE3Q0YsR0FqSlc7QUEyTmxCUyxrQkFBZ0IsRUFBRTtBQUNoQkMsVUFBTSxFQUFFLElBRFE7QUFFaEJDLHVCQUFtQixFQUFFO0FBQ25CQyxlQUFTLEVBQUUsU0FEUTtBQUVuQnZJLFlBQU0sRUFBRTtBQUNOd0ksa0JBQVUsRUFBRSxDQUROO0FBRU5DLGtCQUFVLEVBQUUsRUFGTjtBQUdOQyxnQkFBUSxFQUFFLENBSEo7QUFJTkMsa0JBQVUsRUFBRSxLQUpOO0FBS05DLG1CQUFXLEVBQUU7QUFMUDtBQUZXO0FBRkwsR0EzTkE7QUF5T2xCQyxjQUFZLEVBQUU7QUFDWnRmLFFBQUksRUFBRTtBQUNKZ2QsYUFBTyxZQUFLLHFCQUFVdmUsTUFBZiw2QkFESDtBQUVKdWYsV0FBSyxFQUFFLENBQUM7QUFBRWQsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZILEtBRE07QUFLWmMsU0FBSyxFQUFFLENBQUM7QUFBRWQsVUFBSSxFQUFFO0FBQVIsS0FBRDtBQUxLLEdBek9JO0FBaVBsQnFDLGdCQUFjLEVBQUU7QUFDZHZmLFFBQUksRUFBRTtBQUNKZ2QsYUFBTyxZQUFLLHFCQUFVdmUsTUFBZiwrQkFESDtBQUVKdWYsV0FBSyxFQUFFLENBQUM7QUFBRWQsWUFBSSxFQUFFO0FBQVIsT0FBRDtBQUZILEtBRFE7QUFLZGMsU0FBSyxFQUFFLENBQUM7QUFBRWQsVUFBSSxFQUFFO0FBQVIsS0FBRDtBQUxPLEdBalBFO0FBeVBsQnNDLFdBQVMsRUFBRTtBQUNUMUMsU0FBSyxFQUFFLHFCQURFO0FBRVRDLGVBQVcsRUFBRSx1Q0FGSjtBQUdUL2MsUUFBSSxFQUFFO0FBQ0pnZCxhQUFPLFlBQUsscUJBQVV2ZSxNQUFmLDBCQURIO0FBRUp1ZixXQUFLLEVBQUUsQ0FBQztBQUFFZCxZQUFJLEVBQUU7QUFBUixPQUFELENBRkg7QUFHSk0sY0FBUSxFQUFFLENBQUMsU0FBRDtBQUhOLEtBSEc7QUFRVFAsY0FBVSxFQUFFO0FBQ1YzVCxVQUFJLEVBQUU7QUFBRTRULFlBQUksRUFBRTtBQUFSLE9BREk7QUFFVkosV0FBSyxFQUFFO0FBQ0xwWixZQUFJLEVBQUUsUUFERDtBQUVMaVosaUJBQVMsRUFBRSxDQUZOO0FBR0xDLGlCQUFTLEVBQUUscUJBQVV4ZDtBQUhoQixPQUZHO0FBT1Y4RixXQUFLLEVBQUU7QUFBRWdZLFlBQUksRUFBRTtBQUFSLE9BUEc7QUFRVm5KLFVBQUksRUFBRTtBQUNKclEsWUFBSSxFQUFFLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FERjtBQUVKa1osaUJBQVMsRUFBRSxxQkFBVXZkO0FBRmpCLE9BUkk7QUFZVjJGLFlBQU0sRUFBRTtBQUFFa1ksWUFBSSxFQUFFO0FBQVIsT0FaRTtBQWFWelQsY0FBUSxFQUFFO0FBQUV5VCxZQUFJLEVBQUU7QUFBUixPQWJBO0FBY1YxSSxVQUFJLEVBQUU7QUFBRTBJLFlBQUksRUFBRTtBQUFSLE9BZEk7QUFlVjdDLGVBQVMsRUFBRTtBQUFFNkMsWUFBSSxFQUFFO0FBQVIsT0FmRDtBQWdCVmpZLFlBQU0sRUFBRTtBQUFFaVksWUFBSSxFQUFFO0FBQVIsT0FoQkU7QUFpQlZZLFNBQUcsRUFBRTtBQUFFWixZQUFJLEVBQUU7QUFBUixPQWpCSztBQWtCVjFMLGVBQVMsRUFBRTtBQUFFMEwsWUFBSSxFQUFFO0FBQVI7QUFsQkQsS0FSSDtBQTRCVHVDLDRCQUF3QixFQUFFO0FBNUJqQixHQXpQTztBQXdSbEJ0SyxpQkFBZSxFQUFFO0FBQ2YySCxTQUFLLEVBQUUsbUJBRFE7QUFFZkMsZUFBVyxFQUNULGlFQUhhO0FBSWYvYyxRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYscUNBREg7QUFFSndlLGdCQUFVLEVBQUU7QUFDVmhaLGVBQU8sRUFBRTtBQUFFaVosY0FBSSxFQUFFO0FBQVIsU0FEQztBQUVWelQsZ0JBQVEsRUFBRTtBQUFFeVQsY0FBSSxFQUFFO0FBQVI7QUFGQSxPQUZSO0FBTUpNLGNBQVEsRUFBRSxDQUFDLFNBQUQsRUFBWSxVQUFaO0FBTk4sS0FKUztBQVlmUCxjQUFVLEVBQUU7QUFDVjNULFVBQUksRUFBRTtBQUFFbVQsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0FESTtBQUVWSixXQUFLLEVBQUU7QUFDTEwsV0FBRyxFQUFFO0FBQ0gvWSxjQUFJLEVBQUUsUUFESDtBQUVIaVosbUJBQVMsRUFBRSxDQUZSO0FBR0hDLG1CQUFTLEVBQUUscUJBQVV4ZDtBQUhsQjtBQURBLE9BRkc7QUFTVjhGLFdBQUssRUFBRTtBQUFFdVgsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0FURztBQVVWbkosVUFBSSxFQUFFO0FBQ0owSSxXQUFHLEVBQUU7QUFDSC9ZLGNBQUksRUFBRSxDQUFDLE1BQUQsRUFBUyxRQUFULENBREg7QUFFSGtaLG1CQUFTLEVBQUUscUJBQVV2ZDtBQUZsQjtBQURELE9BVkk7QUFnQlYyRixZQUFNLEVBQUU7QUFDTnlYLFdBQUcsRUFBRTtBQUFFUyxjQUFJLEVBQUU7QUFBUjtBQURDLE9BaEJFO0FBbUJWelQsY0FBUSxFQUFFO0FBQUVnVCxXQUFHLEVBQUU7QUFBRVMsY0FBSSxFQUFFO0FBQVI7QUFBUCxPQW5CQTtBQW9CVjFJLFVBQUksRUFBRTtBQUFFaUksV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVAsT0FwQkk7QUFxQlY3QyxlQUFTLEVBQUU7QUFBRW9DLFdBQUcsRUFBRTtBQUFFUyxjQUFJLEVBQUU7QUFBUjtBQUFQLE9BckJEO0FBc0JWalksWUFBTSxFQUFFO0FBQUV3WCxXQUFHLEVBQUU7QUFBRVMsY0FBSSxFQUFFO0FBQVI7QUFBUCxPQXRCRTtBQXVCVlksU0FBRyxFQUFFO0FBQUVyQixXQUFHLEVBQUU7QUFBRVMsY0FBSSxFQUFFO0FBQVI7QUFBUCxPQXZCSztBQXdCVjFMLGVBQVMsRUFBRTtBQUFFaUwsV0FBRyxFQUFFO0FBQUVTLGNBQUksRUFBRTtBQUFSO0FBQVA7QUF4QkQ7QUFaRyxHQXhSQztBQWdVbEJwTixpQkFBZSxFQUFFO0FBQ2ZnTixTQUFLLEVBQUUsbUJBRFE7QUFFZkMsZUFBVyxFQUFFLG9DQUZFO0FBR2YvYyxRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYsNkNBREg7QUFFSndlLGdCQUFVLEVBQUU7QUFDVmhaLGVBQU8sRUFBRTtBQUFFaVosY0FBSSxFQUFFO0FBQVIsU0FEQztBQUVWcGYsaUJBQVMsRUFBRTtBQUFFb2YsY0FBSSxFQUFFO0FBQVI7QUFGRDtBQUZSLEtBSFM7QUFVZkQsY0FBVSxFQUFFO0FBQ1ZyQyxRQUFFLEVBQUU7QUFBRTZCLFdBQUcsRUFBRTtBQUFFL1ksY0FBSSxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVg7QUFBUjtBQUFQLE9BRE07QUFFVm1YLFVBQUksRUFBRTtBQUFFNEIsV0FBRyxFQUFFO0FBQUUvWSxjQUFJLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWDtBQUFSO0FBQVAsT0FGSTtBQUdWa1UsYUFBTyxFQUFFO0FBQUU2RSxXQUFHLEVBQUU7QUFBRS9ZLGNBQUksRUFBRSxDQUFDLFFBQUQsRUFBVyxRQUFYO0FBQVI7QUFBUCxPQUhDO0FBSVZvTyxXQUFLLEVBQUU7QUFBRTJLLFdBQUcsRUFBRTtBQUFFL1ksY0FBSSxFQUFFLENBQUMsUUFBRCxFQUFXLFFBQVg7QUFBUjtBQUFQLE9BSkc7QUFLVmdjLGNBQVEsRUFBRTtBQUFFakQsV0FBRyxFQUFFO0FBQUUvWSxjQUFJLEVBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWDtBQUFSO0FBQVA7QUFMQTtBQVZHLEdBaFVDO0FBbVZsQmljLGFBQVcsRUFBRTtBQUNYYixVQUFNLEVBQUUsSUFERztBQUVYaEMsU0FBSyxFQUFFLG1CQUZJO0FBR1hDLGVBQVcsRUFBRSwwQ0FIRjtBQUlYclosUUFBSSxFQUFFLFFBSks7QUFLWHVaLGNBQVUsRUFBRTtBQUNWalosU0FBRyxFQUFFO0FBQ0h5WSxXQUFHLEVBQUU7QUFBRS9ZLGNBQUksRUFBRSxRQUFSO0FBQWtCa1osbUJBQVMsRUFBRSxxQkFBVXRkO0FBQXZDO0FBREYsT0FESztBQUlWcUcsWUFBTSxFQUFFO0FBQ044VyxXQUFHLEVBQUU7QUFBRS9ZLGNBQUksRUFBRSxRQUFSO0FBQWtCa1osbUJBQVMsRUFBRSxxQkFBVXJkO0FBQXZDO0FBREMsT0FKRTtBQVFWO0FBQ0FpRyxVQUFJLEVBQUU7QUFDSmlYLFdBQUcsRUFBRTtBQUFFL1ksY0FBSSxFQUFFLENBQUMsUUFBRCxFQUFXLE1BQVgsQ0FBUjtBQUE0QmtaLG1CQUFTLEVBQUUscUJBQVU5ZDtBQUFqRDtBQURELE9BVEk7QUFZVmtJLGlCQUFXLEVBQUU7QUFDWHlWLFdBQUcsRUFBRTtBQUFFL1ksY0FBSSxFQUFFLFFBQVI7QUFBa0JrWixtQkFBUyxFQUFFLHFCQUFVOWQ7QUFBdkM7QUFETSxPQVpIO0FBZVYySCxVQUFJLEVBQUU7QUFDSmdXLFdBQUcsRUFBRTtBQUFFL1ksY0FBSSxFQUFFLFFBQVI7QUFBa0JrWixtQkFBUyxFQUFFLHFCQUFVcGQ7QUFBdkM7QUFERCxPQWZJO0FBa0JWc0UsY0FBUSxFQUFFO0FBQ1IyWSxXQUFHLEVBQUU7QUFBRS9ZLGNBQUksRUFBRSxRQUFSO0FBQWtCa1osbUJBQVMsRUFBRSxxQkFBVXJkO0FBQXZDO0FBREcsT0FsQkE7QUFxQlZrSixhQUFPLEVBQUU7QUFDUGdVLFdBQUcsRUFBRTtBQUFFL1ksY0FBSSxFQUFFLFFBQVI7QUFBa0JrWixtQkFBUyxFQUFFLHFCQUFVcmQ7QUFBdkM7QUFERSxPQXJCQztBQXdCVnFnQixZQUFNLEVBQUU7QUFBRW5ELFdBQUcsRUFBRTtBQUFFUyxjQUFJLEVBQUU7QUFBUjtBQUFQLE9BeEJFO0FBeUJWMUksVUFBSSxFQUFFO0FBQUVpSSxXQUFHLEVBQUU7QUFBRVMsY0FBSSxFQUFFO0FBQVI7QUFBUCxPQXpCSTtBQTBCVjJDLFlBQU0sRUFBRTtBQUFFcEQsV0FBRyxFQUFFO0FBQUUvWSxjQUFJLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWjtBQUFSO0FBQVA7QUExQkUsS0FMRDtBQWlDWG9jLHFCQUFpQixFQUFFO0FBQ2pCLGNBQVE7QUFBRXJELFdBQUcsRUFBRTtBQUFFL1ksY0FBSSxFQUFFO0FBQVI7QUFBUDtBQURTO0FBakNSLEdBblZLO0FBeVhsQnFjLFVBQVEsRUFBRTtBQUNScmMsUUFBSSxFQUFFLFFBREU7QUFFUnNjLFFBQUksRUFBRSxDQUNKLEtBREksRUFFSixLQUZJLEVBR0osUUFISSxFQUlKLEtBSkksRUFLSixVQUxJLEVBTUosV0FOSSxFQU9KLEtBUEksRUFRSixNQVJJLEVBU0osZUFUSSxFQVVKLFFBVkksRUFXSixVQVhJLEVBWUosTUFaSTtBQUZFLEdBelhRO0FBMllsQnBLLGNBQVksRUFBRTtBQUNaNVYsUUFBSSxFQUFFO0FBQ0pnZCxhQUFPLFlBQUsscUJBQVV2ZSxNQUFmLCtCQURIO0FBRUp3ZSxnQkFBVSxFQUFFO0FBQ1YvWCxhQUFLLEVBQUU7QUFBRWdZLGNBQUksRUFBRTtBQUFSLFNBREc7QUFFVnZhLFlBQUksRUFBRTtBQUFFdWEsY0FBSSxFQUFFO0FBQVIsU0FGSTtBQUdWbGYsZUFBTyxFQUFFO0FBQUVrZixjQUFJLEVBQUU7QUFBUjtBQUhDO0FBRlIsS0FETTtBQVNaYyxTQUFLLEVBQUUsQ0FBQztBQUFFZCxVQUFJLEVBQUU7QUFBUixLQUFEO0FBVEssR0EzWUk7QUF1WmxCN0ksZUFBYSxFQUFFO0FBQ2JyVSxRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYscUNBREg7QUFFSndlLGdCQUFVLEVBQUU7QUFDVmhZLGNBQU0sRUFBRTtBQUFFaVksY0FBSSxFQUFFO0FBQVIsU0FERTtBQUVWdmEsWUFBSSxFQUFFO0FBQUV1YSxjQUFJLEVBQUU7QUFBUixTQUZJO0FBR1ZsZixlQUFPLEVBQUU7QUFBRWtmLGNBQUksRUFBRTtBQUFSO0FBSEM7QUFGUixLQURPO0FBU2JjLFNBQUssRUFBRSxDQUFDO0FBQUVkLFVBQUksRUFBRTtBQUFSLEtBQUQ7QUFUTSxHQXZaRztBQW1hbEIrQyxzQkFBb0IsRUFBRTtBQUNwQmpnQixRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYsK0NBREg7QUFFSndlLGdCQUFVLEVBQUU7QUFDVmhaLGVBQU8sRUFBRTtBQUFFaVosY0FBSSxFQUFFO0FBQVIsU0FEQztBQUVWdmEsWUFBSSxFQUFFO0FBQUV1YSxjQUFJLEVBQUU7QUFBUixTQUZJO0FBR1ZsZixlQUFPLEVBQUU7QUFBRWtmLGNBQUksRUFBRTtBQUFSO0FBSEM7QUFGUixLQURjO0FBU3BCYyxTQUFLLEVBQUUsQ0FBQztBQUFFZCxVQUFJLEVBQUU7QUFBUixLQUFEO0FBVGEsR0FuYUo7QUErYWxCZ0QsaUJBQWUsRUFBRTtBQUNmeGMsUUFBSSxFQUFFLFFBRFM7QUFFZnNjLFFBQUksRUFBRSxDQUFDLFVBQUQsRUFBYSxXQUFiLEVBQTBCLFVBQTFCLEVBQXNDLFVBQXRDLEVBQWtELFdBQWxEO0FBRlMsR0EvYUM7QUFvYmxCRyxzQkFBb0IsRUFBRTtBQUNwQm5nQixRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFDTCxxQkFBVXZlLE1BREwsbURBREg7QUFJSndlLGdCQUFVLEVBQUU7QUFDVnhULGdCQUFRLEVBQUU7QUFBRXlULGNBQUksRUFBRTtBQUFSLFNBREE7QUFFVnZhLFlBQUksRUFBRTtBQUFFdWEsY0FBSSxFQUFFO0FBQVIsU0FGSTtBQUdWbGYsZUFBTyxFQUFFO0FBQUVrZixjQUFJLEVBQUU7QUFBUixTQUhDO0FBSVZ4WixZQUFJLEVBQUU7QUFBRXdaLGNBQUksRUFBRTtBQUFSO0FBSkk7QUFKUixLQURjO0FBWXBCYyxTQUFLLEVBQUUsQ0FBQztBQUFFZCxVQUFJLEVBQUU7QUFBUixLQUFEO0FBWmEsR0FwYko7QUFtY2xCa0Qsc0JBQW9CLEVBQUU7QUFDcEJwZ0IsUUFBSSxFQUFFO0FBQ0pnZCxhQUFPLFlBQUsscUJBQVV2ZSxNQUFmLDJDQURIO0FBRUp3ZSxnQkFBVSxFQUFFO0FBQ1Z4VCxnQkFBUSxFQUFFO0FBQUV5VCxjQUFJLEVBQUU7QUFBUixTQURBO0FBRVZ2YSxZQUFJLEVBQUU7QUFBRXVhLGNBQUksRUFBRTtBQUFSLFNBRkk7QUFHVmxmLGVBQU8sRUFBRTtBQUFFa2YsY0FBSSxFQUFFO0FBQVIsU0FIQztBQUlWeFosWUFBSSxFQUFFO0FBQUV3WixjQUFJLEVBQUU7QUFBUjtBQUpJO0FBRlIsS0FEYztBQVVwQmMsU0FBSyxFQUFFLENBQUM7QUFBRWQsVUFBSSxFQUFFO0FBQVIsS0FBRDtBQVZhLEdBbmNKO0FBZ2RsQnBJLGNBQVksRUFBRTtBQUNaOVUsUUFBSSxFQUFFO0FBQ0pnZCxhQUFPLFlBQ0wscUJBQVV2ZSxNQURMLGtEQURIO0FBSUp3ZSxnQkFBVSxFQUFFO0FBQ1Z4VCxnQkFBUSxFQUFFO0FBQUV5VCxjQUFJLEVBQUU7QUFBUixTQURBO0FBRVZ2YSxZQUFJLEVBQUU7QUFBRXVhLGNBQUksRUFBRTtBQUFSLFNBRkk7QUFHVmxmLGVBQU8sRUFBRTtBQUFFa2YsY0FBSSxFQUFFO0FBQVIsU0FIQztBQUlWMVgsWUFBSSxFQUFFO0FBQUUwWCxjQUFJLEVBQUU7QUFBUjtBQUpJO0FBSlIsS0FETTtBQVlaYyxTQUFLLEVBQUUsQ0FBQztBQUFFZCxVQUFJLEVBQUU7QUFBUixLQUFEO0FBWkssR0FoZEk7QUErZGxCbUQsZ0JBQWMsRUFBRTtBQUNkdkQsU0FBSyxFQUFFLG1CQURPO0FBRWRDLGVBQVcsRUFBRSxrREFGQztBQUdkL2MsUUFBSSxFQUFFO0FBQ0pnZCxhQUFPLFlBQUsscUJBQVV2ZSxNQUFmLHlCQURIO0FBRUp3ZSxnQkFBVSxFQUFFO0FBQ1Z4VCxnQkFBUSxFQUFFO0FBQUV5VCxjQUFJLEVBQUU7QUFBUjtBQURBLE9BRlI7QUFLSk0sY0FBUSxFQUFFLENBQUMsVUFBRDtBQUxOLEtBSFE7QUFVZEUsd0JBQW9CLEVBQUU7QUFDcEJqQixTQUFHLEVBQUU7QUFDSGtCLHNCQUFjLEVBQUUsSUFEYjtBQUVIQyxhQUFLLEVBQUUsQ0FBQztBQUFFVixjQUFJLEVBQUU7QUFBUixTQUFEO0FBRko7QUFEZTtBQVZSLEdBL2RFO0FBaWZsQm9ELG1CQUFpQixFQUFFO0FBQ2pCeEQsU0FBSyxFQUFFLHNCQURVO0FBRWpCQyxlQUFXLEVBQUUsc0RBRkk7QUFHakIvYyxRQUFJLEVBQUU7QUFDSmdkLGFBQU8sWUFBSyxxQkFBVXZlLE1BQWYsNEJBREg7QUFFSndlLGdCQUFVLEVBQUU7QUFDVnhULGdCQUFRLEVBQUU7QUFBRXlULGNBQUksRUFBRTtBQUFSO0FBREEsT0FGUjtBQUtKTSxjQUFRLEVBQUUsQ0FBQyxVQUFEO0FBTE47QUFIVyxHQWpmRDtBQTZmbEIrQyxjQUFZLEVBQUU7QUFDWnpELFNBQUssRUFBRSxpQkFESztBQUVaQyxlQUFXLEVBQUUsaURBRkQ7QUFHWi9jLFFBQUksRUFBRTtBQUNKZ2QsYUFBTyxZQUFLLHFCQUFVdmUsTUFBZix1QkFESDtBQUVKd2UsZ0JBQVUsRUFBRTtBQUNWeFQsZ0JBQVEsRUFBRTtBQUFFeVQsY0FBSSxFQUFFO0FBQVI7QUFEQSxPQUZSO0FBS0pNLGNBQVEsRUFBRSxDQUFDLFVBQUQ7QUFMTixLQUhNO0FBVVpFLHdCQUFvQixFQUFFO0FBQ3BCakIsU0FBRyxFQUFFO0FBQ0hrQixzQkFBYyxFQUFFLElBRGI7QUFFSEMsYUFBSyxFQUFFLENBQUM7QUFBRVYsY0FBSSxFQUFFO0FBQVIsU0FBRDtBQUZKO0FBRGU7QUFWVixHQTdmSTtBQStnQmxCbEIsYUFBVyxFQUFFO0FBQ1hjLFNBQUssRUFBRSxpQkFESTtBQUVYQyxlQUFXLEVBQUUsaUNBRkY7QUFHWC9jLFFBQUksRUFBRTtBQUNKZ2QsYUFBTyxZQUFLLHFCQUFVdmUsTUFBZixzQkFESDtBQUVKd2UsZ0JBQVUsRUFBRTtBQUNWeFQsZ0JBQVEsRUFBRTtBQUFFeVQsY0FBSSxFQUFFO0FBQVI7QUFEQSxPQUZSO0FBS0pNLGNBQVEsRUFBRSxDQUFDLFVBQUQ7QUFMTixLQUhLO0FBVVhFLHdCQUFvQixFQUFFO0FBQ3BCakIsU0FBRyxFQUFFO0FBQ0hrQixzQkFBYyxFQUFFLElBRGI7QUFFSEMsYUFBSyxFQUFFLENBQUM7QUFBRVYsY0FBSSxFQUFFO0FBQVIsU0FBRDtBQUZKO0FBRGU7QUFWWDtBQS9nQkssQ0FBcEI7QUFraUJBLElBQU1zRCxNQUFNLEdBQUdya0IsQ0FBQyxDQUFDK0UsSUFBRixDQUFPc2IsV0FBUCxFQUFvQmphLE1BQXBCLENBQTJCLFVBQUNqRixNQUFELEVBQVNrSSxJQUFULEVBQWtCO0FBQzFELE1BQU13WCxPQUFPLEdBQUc3Z0IsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMyRSxJQUFELEVBQU8sTUFBUCxFQUFlLFNBQWYsQ0FBUCxFQUFrQ2dYLFdBQWxDLENBQWhCO0FBRUEsTUFBSSxDQUFDUSxPQUFMLEVBQWMsT0FBTzFmLE1BQVA7QUFDZCxTQUFPbkIsQ0FBQyxDQUFDd1gsS0FBRixDQUFRbk8sSUFBUixFQUFjLHlCQUFVd1gsT0FBVixDQUFkLEVBQWtDMWYsTUFBbEMsQ0FBUDtBQUNELENBTGMsQ0FBZjtBQU9BLElBQU1takIsY0FBYyxHQUFHdGtCLENBQUMsQ0FBQ2dDLE9BQUYsQ0FDckJoQyxDQUFDLENBQUNvRyxNQUFGLENBQ0UsVUFBQ2hCLEdBQUQ7QUFBQTtBQUFBLE1BQU9pRSxJQUFQO0FBQUEsTUFBYXJCLEtBQWI7O0FBQUEsU0FDRWhJLENBQUMsQ0FBQ3dYLEtBQUYsQ0FBUW5PLElBQVIsRUFBY3JKLENBQUMsQ0FBQ3dYLEtBQUYsQ0FBUSxPQUFSLEVBQWlCeFAsS0FBakIsRUFBd0JoSSxDQUFDLENBQUNzRSxJQUFGLENBQU8rRSxJQUFQLEVBQWFnWCxXQUFiLENBQXhCLENBQWQsRUFBa0VqYixHQUFsRSxDQURGO0FBQUEsQ0FERixFQUdFLEVBSEYsQ0FEcUIsRUFNckJwRixDQUFDLENBQUNvQyxPQU5tQixFQU9yQmlpQixNQVBxQixDQUF2QjtBQVNPLElBQU1FLE1BQU0sR0FBRyxFQUNwQixHQUFHRCxjQURpQjtBQUVwQmpFLGFBQVcsRUFBWEEsV0FGb0I7QUFHcEJnRSxRQUFNLEVBQU5BO0FBSG9CLENBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdmpCUDs7QUFDQTs7OztBQUVBLElBQU16TSxJQUFJLEdBQUc1WCxDQUFDLENBQUN3UCxNQUFGLENBQVMsRUFBVCxFQUFhLE1BQWIsQ0FBYjtBQUNBLElBQU1tUyxHQUFHLEdBQUczaEIsQ0FBQyxDQUFDd1AsTUFBRixDQUFTLEVBQVQsRUFBYSxLQUFiLENBQVo7QUFDQSxJQUFNMUcsTUFBTSxHQUFHOUksQ0FBQyxDQUFDZ0MsT0FBRixDQUNiLFVBQUF3aUIsTUFBTSxFQUFJO0FBQ1IsTUFBSSxDQUFDQSxNQUFMLEVBQWEsT0FBTyxFQUFQO0FBQ2IsTUFBTWpULE1BQU0sR0FBRyxrQkFBU2lULE1BQVQsQ0FBZjtBQUVBLFNBQU8sQ0FBQ2pULE1BQU0sQ0FBQ2tULElBQVAsSUFBZWxULE1BQU0sQ0FBQ21ULE1BQXRCLElBQWdDLEVBQWpDLEVBQXFDQyxPQUFyQyxDQUE2QyxRQUE3QyxFQUF1RCxFQUF2RCxDQUFQO0FBQ0QsQ0FOWSxFQU9iaEQsR0FQYSxDQUFmO0FBVU8sSUFBTWlELGFBQWEsR0FBRztBQUFFaE4sTUFBSSxFQUFKQSxJQUFGO0FBQVE5TyxRQUFNLEVBQU5BO0FBQVIsQ0FBdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZlA7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNaEQsS0FBSyxHQUFHLGlCQUFRekIsS0FBdEI7QUFDQSxJQUFNd0QsR0FBRyxHQUFHN0gsQ0FBQyxDQUFDZ0MsT0FBRixDQUNWaEMsQ0FBQyxDQUFDbVEsTUFBRixDQUFTblEsQ0FBQyxDQUFDbUUsUUFBWCxDQURVLEVBRVZuRSxDQUFDLENBQUNpQyxHQUFGLENBQ0VqQyxDQUFDLENBQUNnQyxPQUFGLENBQ0VoQyxDQUFDLENBQUNzRSxJQUFGLENBQU8sU0FBUCxDQURGLEVBRUUsZUFBT3lELEtBQVAsQ0FBYUMsS0FBYixDQUFtQjRMLEtBQW5CLENBQXlCaVIsSUFBekIsQ0FBOEIsZUFBTzljLEtBQVAsQ0FBYUMsS0FBM0MsQ0FGRixDQURGLENBRlUsRUFRVixpQkFBUTNELEtBUkUsQ0FBWjtBQVdBLElBQU04UyxLQUFLLEdBQUduWCxDQUFDLENBQUNnQyxPQUFGLENBQ1poQyxDQUFDLENBQUM4a0IsTUFBRixDQUFTLEdBQVQsQ0FEWSxFQUVaOWtCLENBQUMsQ0FBQ29HLE1BQUYsQ0FBU3BHLENBQUMsQ0FBQ3FHLFVBQVgsRUFBdUIsRUFBdkIsQ0FGWSxDQUFkOztBQUtBLFNBQVNrVyxNQUFULENBQWdCbEgsU0FBaEIsRUFBMkI7QUFDekIsTUFBTWxPLENBQUMsR0FBRyxJQUFJOE4sSUFBSixDQUFTSSxTQUFTLElBQUksSUFBSUosSUFBSixHQUFXQyxPQUFYLEVBQXRCLENBQVY7QUFDQSxNQUFNOEwsSUFBSSxHQUFHN1osQ0FBQyxDQUFDNGQsY0FBRixFQUFiO0FBQ0EsTUFBTTVELEtBQUssR0FBR2hhLENBQUMsQ0FBQzZkLFdBQUYsS0FBa0IsQ0FBaEM7QUFDQSxNQUFNQyxNQUFNLEdBQUc5ZCxDQUFDLENBQUMrZCxVQUFGLEVBQWY7QUFFQSxtQkFBVWxFLElBQVYsY0FBa0JHLEtBQWxCLGNBQTJCOEQsTUFBM0I7QUFDRDs7QUFFTSxJQUFNRSxRQUFRLEdBQUc7QUFBRXRkLEtBQUcsRUFBSEEsR0FBRjtBQUFPc1AsT0FBSyxFQUFMQSxLQUFQO0FBQWNyUixPQUFLLEVBQUxBLEtBQWQ7QUFBcUJ5VyxRQUFNLEVBQU5BO0FBQXJCLENBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCUDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNNkksR0FBRyxHQUFHcGxCLENBQUMsQ0FBQ0MsS0FBRixDQUFRLFVBQUNDLElBQUQsRUFBT3VFLElBQVAsRUFBZ0I7QUFDbENBLE1BQUksQ0FBQzRRLFNBQUwsR0FBaUI1USxJQUFJLENBQUM0USxTQUFMLElBQWtCLElBQUlKLElBQUosR0FBV0MsT0FBWCxFQUFuQyxDQURrQyxDQUN1Qjs7QUFDekQsTUFBTTZNLFlBQVksR0FBRyx5QkFBUXRkLElBQVIsQ0FBckI7QUFGa0MsTUFHMUI0USxTQUgwQixHQUc0QjVRLElBSDVCLENBRzFCNFEsU0FIMEI7QUFBQSxNQUdmbEksSUFIZSxHQUc0QjFJLElBSDVCLENBR2YwSSxJQUhlO0FBQUEsTUFHVHBFLEtBSFMsR0FHNEJ0RSxJQUg1QixDQUdUc0UsS0FIUztBQUFBLE1BR0Z1RSxRQUhFLEdBRzRCN0ksSUFINUIsQ0FHRjZJLFFBSEU7QUFBQSxNQUdRK0ssSUFIUixHQUc0QjVULElBSDVCLENBR1E0VCxJQUhSO0FBQUEsTUFHYzZGLFNBSGQsR0FHNEJ6WixJQUg1QixDQUdjeVosU0FIZDtBQUlsQyxNQUFNcFcsT0FBTyxHQUFHLHlCQUFRO0FBQ3RCdU4sYUFBUyxFQUFUQSxTQURzQjtBQUV0QmxJLFFBQUksRUFBSkEsSUFGc0I7QUFHdEJwRSxTQUFLLEVBQUxBLEtBSHNCO0FBSXRCdUUsWUFBUSxFQUFSQSxRQUpzQjtBQUt0QitLLFFBQUksRUFBSkEsSUFMc0I7QUFNdEI2RixhQUFTLEVBQVRBLFNBTnNCO0FBT3RCNkQsZ0JBQVksRUFBWkE7QUFQc0IsR0FBUixDQUFoQjtBQVVBLE1BQU1wUyxJQUFJLEdBQUd6UCxJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FBYSxlQUFPNEIsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxXQUFPLEVBQVBBO0FBQUYsR0FBM0IsQ0FBYixDQUFiO0FBQ0EsTUFBTXVkLFFBQVEsR0FBRy9YLFFBQVEsR0FDckIsZUFBTzBMLGVBQVAsQ0FBdUJoUixLQUF2QixDQUE2QkMsT0FBN0IsQ0FBcUM7QUFBRUgsV0FBTyxFQUFQQSxPQUFGO0FBQVd3RixZQUFRLEVBQVJBO0FBQVgsR0FBckMsQ0FEcUIsR0FFckIsZUFBTytWLFNBQVAsQ0FBaUJyYixLQUFqQixDQUF1QkMsT0FBdkIsQ0FBK0I7QUFBRUgsV0FBTyxFQUFFaWE7QUFBWCxHQUEvQixDQUZKO0FBSUEsTUFBTXVELFFBQVEsR0FBRztBQUNmOWQsTUFBRSxFQUFFTSxPQURXO0FBRWZ1TixhQUFTLEVBQVRBLFNBRmU7QUFHZmxJLFFBQUksRUFBSkEsSUFIZTtBQUlmNFUsZ0JBQVksRUFBWkEsWUFKZTtBQUtmdGQsUUFBSSxFQUFFO0FBQUUsV0FBSzRnQjtBQUFQLEtBTFM7QUFNZmxELFdBQU8sRUFBRTtBQUFFLFdBQUssZUFBT2dCLFlBQVAsQ0FBb0JuYixLQUFwQixDQUEwQkMsT0FBMUIsQ0FBa0M7QUFBRUgsZUFBTyxFQUFQQTtBQUFGLE9BQWxDO0FBQVAsS0FOTTtBQU9mc2EsYUFBUyxFQUFFO0FBQUUsV0FBSyxlQUFPZ0IsY0FBUCxDQUFzQnBiLEtBQXRCLENBQTRCQyxPQUE1QixDQUFvQztBQUFFSCxlQUFPLEVBQVBBO0FBQUYsT0FBcEM7QUFBUCxLQVBJO0FBUWZvYSxlQUFXLEVBQUU7QUFBRSxXQUFLLGVBQU92RSxnQkFBUCxDQUF3QjNWLEtBQXhCLENBQThCQyxPQUE5QixDQUFzQztBQUFFSCxlQUFPLEVBQVBBO0FBQUYsT0FBdEM7QUFBUCxLQVJFO0FBU2YyTixZQUFRLEVBQUU7QUFBRSxXQUFLLGVBQU82QyxhQUFQLENBQXFCdFEsS0FBckIsQ0FBMkJDLE9BQTNCLENBQW1DO0FBQUVILGVBQU8sRUFBUEE7QUFBRixPQUFuQztBQUFQO0FBVEssR0FBakI7QUFZQSxNQUFJaUIsS0FBSixFQUNFdWMsUUFBUSxDQUFDdmMsS0FBVCxHQUFpQjtBQUFFLFNBQUssZUFBTzJZLEtBQVAsQ0FBYTFaLEtBQWIsQ0FBbUJDLE9BQW5CLENBQTJCO0FBQUV3VSxlQUFTLEVBQUUxVDtBQUFiLEtBQTNCO0FBQVAsR0FBakI7QUFDRixNQUFJdUUsUUFBSixFQUFjZ1ksUUFBUSxDQUFDemMsTUFBVCxHQUFrQjtBQUFFLG9CQUFTeUUsUUFBVDtBQUFGLEdBQWxCO0FBQ2QsTUFBSStLLElBQUosRUFDRWlOLFFBQVEsQ0FBQzNjLEVBQVQsR0FBYztBQUFFLFNBQUssZUFBT1osS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxhQUFPLEVBQUV1UTtBQUFYLEtBQTNCO0FBQVAsR0FBZDtBQUNGLE1BQUk2RixTQUFKLEVBQ0VvSCxRQUFRLENBQUNqRCxPQUFULEdBQW1CO0FBQ2pCLFNBQUssZUFBT3RhLEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRUgsYUFBTyxFQUFFb1c7QUFBWCxLQUEzQjtBQURZLEdBQW5CO0FBSUZoZSxNQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FBYWtmLFFBQWIsRUFBdUJELEdBQXZCLENBQTJCM2dCLElBQTNCO0FBQ0FrTCxNQUFJLENBQUN5VixHQUFMLENBQVNFLFFBQVQ7QUFDQXBsQixNQUFJLENBQUNxbEIsS0FBTCxDQUFXemQsT0FBWCxFQUFvQnJELElBQXBCO0FBQ0EsU0FBT2tMLElBQVA7QUFDRCxDQTdDVyxDQUFaO0FBK0NBLElBQU02TCxNQUFNLEdBQUd4YixDQUFDLENBQUNDLEtBQUYsQ0FBUSxVQUFDQyxJQUFELEVBQU91RSxJQUFQLEVBQWdCO0FBQ3JDLE1BQU00USxTQUFTLEdBQUc1USxJQUFJLENBQUM0USxTQUFMLElBQWtCLElBQUlKLElBQUosR0FBV0MsT0FBWCxFQUFwQztBQUNBLE1BQU16VSxJQUFJLEdBQUdQLElBQUksQ0FBQ29CLFVBQUwsRUFBYjtBQUVBLE1BQUltRCxJQUFJLENBQUNzRSxLQUFULEVBQWdCdEUsSUFBSSxDQUFDc0UsS0FBTCxHQUFhdEUsSUFBSSxDQUFDc0UsS0FBTCxDQUFXeWMsV0FBWCxHQUF5QnZWLElBQXpCLEVBQWIsQ0FKcUIsQ0FJeUI7O0FBQzlELE1BQUl4TCxJQUFJLENBQUNxRSxNQUFULEVBQWlCckUsSUFBSSxDQUFDcUUsTUFBTCxHQUFjckUsSUFBSSxDQUFDcUUsTUFBTCxDQUFZMGMsV0FBWixHQUEwQnZWLElBQTFCLEVBQWQsQ0FMb0IsQ0FLNEI7O0FBQ2pFLE1BQUl4UCxJQUFKLEVBQVU7QUFDUmdFLFFBQUksQ0FBQ29FLE1BQUwsR0FBY3BJLElBQUksQ0FBQzRNLEtBQW5CLENBRFEsQ0FDa0I7O0FBQzFCNUksUUFBSSxDQUFDNkksUUFBTCxHQUFnQjdNLElBQUksQ0FBQ2dsQixHQUFyQixDQUZRLENBRWtCO0FBQzNCOztBQUVELE1BQU1oWSxLQUFLLEdBQUcyWCxHQUFHLENBQUNsbEIsSUFBRCxFQUFPLEVBQUUsR0FBR3VFLElBQUw7QUFBVzRRLGFBQVMsRUFBVEEsU0FBWDtBQUFzQmxJLFFBQUksRUFBRTtBQUE1QixHQUFQLENBQWpCOztBQUVBLE1BQUkxTSxJQUFKLEVBQVU7QUFDUixRQUFNaWxCLFVBQVUsR0FBRyxlQUFPdEIsWUFBUCxDQUFvQnBjLEtBQXBCLENBQTBCQyxPQUExQixDQUFrQztBQUNuRHFGLGNBQVEsRUFBRTdNLElBQUksQ0FBQ2dsQjtBQURvQyxLQUFsQyxDQUFuQjs7QUFHQSxRQUFNRSxlQUFlLEdBQUcsZUFBT3hCLGlCQUFQLENBQXlCbmMsS0FBekIsQ0FBK0JDLE9BQS9CLENBQXVDO0FBQzdEcUYsY0FBUSxFQUFFN00sSUFBSSxDQUFDZ2xCO0FBRDhDLEtBQXZDLENBQXhCOztBQUdBLFFBQU1HLE1BQU0sR0FBRzFsQixJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FBYXVmLFVBQWIsQ0FBZjtBQUNBLFFBQU1ySSxXQUFXLEdBQUduZCxJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FBYXdmLGVBQWIsQ0FBcEI7QUFFQXpsQixRQUFJLENBQUNNLEdBQUwsQ0FDR0MsSUFESCxHQUVHMEYsR0FGSCxDQUVPLFFBRlAsRUFHR2lmLEdBSEgsQ0FHT1EsTUFIUDtBQUlBMWxCLFFBQUksQ0FBQ00sR0FBTCxDQUNHQyxJQURILEdBRUcwRixHQUZILENBRU8sYUFGUCxFQUdHaWYsR0FISCxDQUdPL0gsV0FIUDtBQUlBdUksVUFBTSxDQUFDQyxHQUFQLENBQVdwWSxLQUFYO0FBQ0E0UCxlQUFXLENBQUN3SSxHQUFaLENBQWdCcFksS0FBaEI7QUFDRDs7QUFFRCxTQUFPQSxLQUFQO0FBQ0QsQ0FwQ2MsQ0FBZjtBQXNDQSxJQUFNZ08sT0FBTyxHQUFHemIsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQ0MsSUFBRCxFQUFPdUUsSUFBUCxFQUFnQjtBQUN0QyxNQUFNaEUsSUFBSSxHQUFHUCxJQUFJLENBQUNvQixVQUFMLEVBQWI7QUFFQSxNQUFJbUQsSUFBSSxDQUFDc0UsS0FBVCxFQUFnQnRFLElBQUksQ0FBQ3NFLEtBQUwsR0FBYXRFLElBQUksQ0FBQ3NFLEtBQUwsQ0FBV3ljLFdBQVgsR0FBeUJ2VixJQUF6QixFQUFiLENBSHNCLENBR3dCOztBQUM5RCxNQUFJeFAsSUFBSixFQUFVO0FBQ1JnRSxRQUFJLENBQUNvRSxNQUFMLEdBQWNwSSxJQUFJLENBQUM0TSxLQUFuQixDQURRLENBQ2tCOztBQUMxQjVJLFFBQUksQ0FBQzZJLFFBQUwsR0FBZ0I3TSxJQUFJLENBQUNnbEIsR0FBckIsQ0FGUSxDQUVrQjtBQUMzQjs7QUFFRCxNQUFNaFksS0FBSyxHQUFHMlgsR0FBRyxDQUFDbGxCLElBQUQsRUFBTyxFQUFFLEdBQUd1RSxJQUFMO0FBQVcwSSxRQUFJLEVBQUU7QUFBakIsR0FBUCxDQUFqQjs7QUFFQSxNQUFJMU0sSUFBSixFQUFVO0FBQ1IsUUFBTWlsQixVQUFVLEdBQUcsZUFBT3RCLFlBQVAsQ0FBb0JwYyxLQUFwQixDQUEwQkMsT0FBMUIsQ0FBa0M7QUFDbkRxRixjQUFRLEVBQUU3TSxJQUFJLENBQUNnbEI7QUFEb0MsS0FBbEMsQ0FBbkI7O0FBR0EsUUFBTUssWUFBWSxHQUFHLGVBQU81QixjQUFQLENBQXNCbGMsS0FBdEIsQ0FBNEJDLE9BQTVCLENBQW9DO0FBQ3ZEcUYsY0FBUSxFQUFFN00sSUFBSSxDQUFDZ2xCO0FBRHdDLEtBQXBDLENBQXJCOztBQUdBLFFBQU1HLE1BQU0sR0FBRzFsQixJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FBYXVmLFVBQWIsQ0FBZjtBQUNBLFFBQU1qUSxRQUFRLEdBQUd2VixJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FBYTJmLFlBQWIsQ0FBakI7QUFFQTVsQixRQUFJLENBQUNNLEdBQUwsQ0FDR0MsSUFESCxHQUVHMEYsR0FGSCxDQUVPLFFBRlAsRUFHR2lmLEdBSEgsQ0FHT1EsTUFIUDtBQUlBMWxCLFFBQUksQ0FBQ00sR0FBTCxDQUNHQyxJQURILEdBRUcwRixHQUZILENBRU8sVUFGUCxFQUdHaWYsR0FISCxDQUdPM1AsUUFIUDtBQUlBbVEsVUFBTSxDQUFDQyxHQUFQLENBQVdwWSxLQUFYO0FBQ0FnSSxZQUFRLENBQUNvUSxHQUFULENBQWFwWSxLQUFiO0FBQ0QsR0EvQnFDLENBaUN0Qzs7O0FBRUEsU0FBT0EsS0FBUDtBQUNELENBcENlLENBQWhCO0FBc0NBLElBQU1pTyxJQUFJLEdBQUcxYixDQUFDLENBQUNDLEtBQUYsQ0FBUSxVQUFDQyxJQUFELEVBQU91RSxJQUFQLEVBQWdCO0FBQ25DLE1BQU1oRSxJQUFJLEdBQUdQLElBQUksQ0FBQ29CLFVBQUwsRUFBYjtBQUVBLE1BQUltRCxJQUFJLENBQUNzRSxLQUFULEVBQWdCdEUsSUFBSSxDQUFDc0UsS0FBTCxHQUFhdEUsSUFBSSxDQUFDc0UsS0FBTCxDQUFXeWMsV0FBWCxHQUF5QnZWLElBQXpCLEVBQWIsQ0FIbUIsQ0FHMkI7O0FBQzlELE1BQUl4UCxJQUFKLEVBQVU7QUFDUmdFLFFBQUksQ0FBQ29FLE1BQUwsR0FBY3BJLElBQUksQ0FBQzRNLEtBQW5CLENBRFEsQ0FDa0I7O0FBQzFCNUksUUFBSSxDQUFDNkksUUFBTCxHQUFnQjdNLElBQUksQ0FBQ2dsQixHQUFyQixDQUZRLENBRWtCO0FBQzNCOztBQUVELE1BQU1oWSxLQUFLLEdBQUcyWCxHQUFHLENBQUNsbEIsSUFBRCxFQUFPLEVBQUUsR0FBR3VFLElBQUw7QUFBVzBJLFFBQUksRUFBRTtBQUFqQixHQUFQLENBQWpCOztBQUVBLE1BQUkxTSxJQUFKLEVBQVU7QUFDUixRQUFNaWxCLFVBQVUsR0FBRyxlQUFPdEIsWUFBUCxDQUFvQnBjLEtBQXBCLENBQTBCQyxPQUExQixDQUFrQztBQUNuRHFGLGNBQVEsRUFBRTdNLElBQUksQ0FBQ2dsQjtBQURvQyxLQUFsQyxDQUFuQjs7QUFHQSxRQUFNRyxNQUFNLEdBQUcxbEIsSUFBSSxDQUFDTSxHQUFMLENBQVMyRixHQUFULENBQWF1ZixVQUFiLENBQWY7QUFFQXhsQixRQUFJLENBQUNNLEdBQUwsQ0FDR0MsSUFESCxHQUVHMEYsR0FGSCxDQUVPLFFBRlAsRUFHR2lmLEdBSEgsQ0FHT1EsTUFIUDtBQUlBQSxVQUFNLENBQUNDLEdBQVAsQ0FBV3BZLEtBQVg7QUFDRDs7QUFFRCxTQUFPQSxLQUFQO0FBQ0QsQ0F6QlksQ0FBYjtBQTJCQSxJQUFNa08sU0FBUyxHQUFHM2IsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQ0MsSUFBRCxFQUFPbUosSUFBUCxFQUFhdU8sSUFBYixFQUFzQjtBQUM5QyxNQUFNblgsSUFBSSxHQUFHUCxJQUFJLENBQUNvQixVQUFMLEVBQWI7QUFFQSxNQUFJLENBQUNiLElBQUwsRUFBVyxPQUFPLGtCQUFRc2xCLE1BQVIsQ0FBZSxlQUFmLENBQVA7QUFDWCxNQUFJdFksS0FBSjs7QUFDQSxNQUFNdVksU0FBUyxHQUFHLGVBQU9uRyxXQUFQLENBQW1CN1gsS0FBbkIsQ0FBeUJDLE9BQXpCLENBQWlDO0FBQUVxRixZQUFRLEVBQUU3TSxJQUFJLENBQUNnbEI7QUFBakIsR0FBakMsQ0FBbEI7O0FBQ0EsTUFBTVEsS0FBSyxHQUFHL2xCLElBQUksQ0FBQ00sR0FBTCxDQUFTMkYsR0FBVCxDQUFhNmYsU0FBYixFQUF3QjdmLEdBQXhCLENBQTRCa0QsSUFBNUIsQ0FBZDtBQUVBLFNBQU80YyxLQUFLLENBQUNqbEIsSUFBTixDQUFXLFVBQUFvRSxHQUFHLEVBQUk7QUFDdkIsUUFBSUEsR0FBRyxJQUFJQSxHQUFHLENBQUNYLElBQWYsRUFBcUI7QUFDbkI0TixhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CbE4sR0FBbkI7QUFDQTZnQixXQUFLLENBQ0Y5ZixHQURILENBQ08sTUFEUCxFQUVHQSxHQUZILENBRU8sTUFGUCxFQUdHaWYsR0FISCxDQUdPeE4sSUFIUDtBQUlELEtBTkQsTUFNTztBQUNMLFVBQU1uVCxJQUFJLEdBQUc7QUFDWG1ULFlBQUksRUFBSkEsSUFEVztBQUVYK0ksYUFBSyxFQUFFdFgsSUFGSTtBQUdYOEQsWUFBSSxFQUFFLFVBSEs7QUFJWHRFLGNBQU0sRUFBRXBJLElBQUksQ0FBQzRNLEtBSkY7QUFLWEMsZ0JBQVEsRUFBRTdNLElBQUksQ0FBQ2dsQjtBQUxKLE9BQWI7QUFRQXBULGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVosRUFBeUI3TixJQUF6QjtBQUNBZ0osV0FBSyxHQUFHMlgsR0FBRyxDQUFDbGxCLElBQUQsRUFBT3VFLElBQVAsQ0FBWDtBQUNBd2hCLFdBQUssQ0FBQ2IsR0FBTixDQUFVM1gsS0FBVjtBQUNEO0FBQ0YsR0FwQk0sQ0FBUDtBQXFCRCxDQTdCaUIsQ0FBbEI7QUErQkEsSUFBTW1PLElBQUksR0FBRzViLENBQUMsQ0FBQ0MsS0FBRixDQUFRLFVBQUNDLElBQUQsRUFBT3NILEVBQVAsRUFBVzJGLElBQVgsRUFBaUIrWSxLQUFqQixFQUEyQjtBQUM5QyxNQUFNdkgsS0FBSyxHQUFHemUsSUFBSSxDQUFDTSxHQUFMLENBQVMyRixHQUFULENBQ1osZUFBT2dILElBQUksS0FBSyxJQUFULEdBQWdCLGNBQWhCLEdBQWlDLGdCQUF4QyxFQUEwRG5GLEtBQTFELENBQWdFQyxPQUFoRSxDQUF3RTtBQUN0RUgsV0FBTyxFQUFFTjtBQUQ2RCxHQUF4RSxDQURZLENBQWQ7QUFNQSxTQUFPbVgsS0FBSyxDQUFDeFksR0FBTixDQUFVK2YsS0FBVixFQUFpQmQsR0FBakIsQ0FBcUIsR0FBckIsQ0FBUDtBQUNELENBUlksQ0FBYjtBQVVBLElBQU1lLGFBQWEsR0FBRztBQUNwQkMsU0FBTyxFQUFFLE9BRFc7QUFFcEIzSyxTQUFPLEVBQUU7QUFGVyxDQUF0QjtBQUtBLElBQU04SixLQUFLLEdBQUd2bEIsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQ0MsSUFBRCxFQUFPNEgsT0FBUCxFQUFnQnJELElBQWhCLEVBQXlCO0FBQzdDLE1BQUksQ0FBQ0EsSUFBSSxDQUFDc0UsS0FBTixJQUFlLENBQUN0RSxJQUFJLENBQUM0VCxJQUF6QixFQUErQjs7QUFFL0IsTUFBSTVULElBQUksQ0FBQzRULElBQUwsSUFBYSxDQUFDNVQsSUFBSSxDQUFDc0UsS0FBdkIsRUFBOEI7QUFDNUI3SSxRQUFJLENBQUNNLEdBQUwsQ0FDRzJGLEdBREgsQ0FDTyxlQUFPNEIsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxhQUFPLEVBQUVyRCxJQUFJLENBQUM0VDtBQUFoQixLQUEzQixDQURQLEVBRUdsUyxHQUZILENBRU8sTUFGUCxFQUdHNFUsRUFISCxDQUdNLFNBQVNzTCxJQUFULENBQWNDLEVBQWQsRUFBa0I7QUFDcEIsVUFBSSxDQUFDQSxFQUFMLEVBQVM7QUFDVGYsV0FBSyxDQUFDcmxCLElBQUQsRUFBTzRILE9BQVAsRUFBZ0IsRUFBRSxHQUFHckQsSUFBTDtBQUFXc0UsYUFBSyxFQUFFdWQsRUFBRSxDQUFDdmQsS0FBSCxJQUFZO0FBQTlCLE9BQWhCLENBQUw7QUFDQSxXQUFLd2QsR0FBTDtBQUNELEtBUEg7QUFRQTtBQUNEOztBQUVELE1BQU05WSxLQUFLLEdBQUd2TixJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FBYSxlQUFPNEIsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFSCxXQUFPLEVBQVBBO0FBQUYsR0FBM0IsQ0FBYixDQUFkOztBQUNBLE1BQU15VSxNQUFNLEdBQUcsbUJBQVNBLE1BQVQsQ0FBZ0I5WCxJQUFJLENBQUM0USxTQUFyQixDQUFmOztBQWhCNkMsc0JBaUJsQmtILE1BQU0sQ0FBQ3JQLEtBQVAsQ0FBYSxHQUFiLENBakJrQjtBQUFBO0FBQUEsTUFpQnRDOFQsSUFqQnNDO0FBQUEsTUFpQmhDRyxLQWpCZ0M7QUFBQSxNQWlCekJDLEdBakJ5Qjs7QUFrQjdDLE1BQU1vRixXQUFXLEdBQUdMLGFBQWEsQ0FBQzFoQixJQUFJLENBQUMwSSxJQUFOLENBQWIsSUFBNEIsRUFBaEQ7QUFDQSxNQUFNc1osYUFBYSxHQUFHaGlCLElBQUksQ0FBQ3NFLEtBQUwsQ0FBV3ljLFdBQVgsR0FBeUJ2VixJQUF6QixFQUF0QjtBQUNBLE1BQU13TSxTQUFTLEdBQUcrSixXQUFXLEdBQUdDLGFBQWhDO0FBQ0EsTUFBTTFkLEtBQUssR0FBRzdJLElBQUksQ0FBQ00sR0FBTCxDQUFTMkYsR0FBVCxDQUFhLGVBQU91YixLQUFQLENBQWExWixLQUFiLENBQW1CQyxPQUFuQixDQUEyQjtBQUFFd1UsYUFBUyxFQUFUQTtBQUFGLEdBQTNCLENBQWIsQ0FBZDtBQUNBLE1BQU1pSyxRQUFRLEdBQUd4bUIsSUFBSSxDQUFDTSxHQUFMLENBQVMyRixHQUFULENBQ2YsZUFBT3VhLFFBQVAsQ0FBZ0IxWSxLQUFoQixDQUFzQkMsT0FBdEIsQ0FBOEI7QUFBRXdVLGFBQVMsRUFBVEEsU0FBRjtBQUFhdUUsUUFBSSxFQUFKQSxJQUFiO0FBQW1CRyxTQUFLLEVBQUxBLEtBQW5CO0FBQTBCQyxPQUFHLEVBQUhBO0FBQTFCLEdBQTlCLENBRGUsQ0FBakI7O0FBSUEsTUFBSSxDQUFDM2MsSUFBSSxDQUFDa2lCLE9BQU4sSUFBaUJsaUIsSUFBSSxDQUFDc0UsS0FBTCxLQUFlLEtBQXBDLEVBQTJDO0FBQ3pDLFFBQU02ZCxPQUFPLGFBQU1KLFdBQU4sUUFBYjtBQUNBLFFBQU1LLFFBQVEsR0FBRzNtQixJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FDZixlQUFPdWIsS0FBUCxDQUFhMVosS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkI7QUFBRXdVLGVBQVMsRUFBRW1LO0FBQWIsS0FBM0IsQ0FEZSxDQUFqQjtBQUdBLFFBQU1FLFdBQVcsR0FBRzVtQixJQUFJLENBQUNNLEdBQUwsQ0FBUzJGLEdBQVQsQ0FDbEIsZUFBT3VhLFFBQVAsQ0FBZ0IxWSxLQUFoQixDQUFzQkMsT0FBdEIsQ0FBOEI7QUFDNUJ3VSxlQUFTLEVBQUVtSyxPQURpQjtBQUU1QjVGLFVBQUksRUFBSkEsSUFGNEI7QUFHNUJHLFdBQUssRUFBTEEsS0FINEI7QUFJNUJDLFNBQUcsRUFBSEE7QUFKNEIsS0FBOUIsQ0FEa0IsQ0FBcEI7QUFTQXlGLFlBQVEsQ0FBQ2hCLEdBQVQsQ0FBYXBZLEtBQWI7QUFDQXFaLGVBQVcsQ0FBQ2pCLEdBQVosQ0FBZ0JwWSxLQUFoQjtBQUNEOztBQUVELE1BQUloSixJQUFJLENBQUMwSSxJQUFMLEtBQWMsWUFBbEIsRUFBZ0M7QUFDOUIsUUFBTTRaLE9BQU8sR0FBR3RpQixJQUFJLENBQUNrZCxHQUFMLEdBQVcsa0JBQVNsZCxJQUFJLENBQUNrZCxHQUFkLENBQVgsR0FBZ0MsRUFBaEQ7QUFDQSxRQUFNeEUsVUFBVSxHQUFHLENBQUMxWSxJQUFJLENBQUNrZCxHQUFMLEdBQ2hCLENBQUNvRixPQUFPLENBQUN0QyxJQUFSLElBQWdCc0MsT0FBTyxDQUFDckMsTUFBeEIsSUFBa0MsRUFBbkMsRUFBdUNDLE9BQXZDLENBQStDLFFBQS9DLEVBQXlELEVBQXpELENBRGdCLGtCQUVSbGdCLElBQUksQ0FBQ3NFLEtBRkcsQ0FBRCxFQUdqQnljLFdBSGlCLEVBQW5CO0FBSUEsUUFBTTFjLE1BQU0sR0FBRzVJLElBQUksQ0FBQ00sR0FBTCxDQUFTMkYsR0FBVCxDQUFhLGVBQU8rVyxNQUFQLENBQWNsVixLQUFkLENBQW9CQyxPQUFwQixDQUE0QjtBQUFFa1YsZ0JBQVUsRUFBVkE7QUFBRixLQUE1QixDQUFiLENBQWY7QUFFQXJVLFVBQU0sQ0FBQytjLEdBQVAsQ0FBV3BZLEtBQVg7O0FBRUEsUUFBSWhKLElBQUksQ0FBQ2tkLEdBQVQsRUFBYztBQUNaLFVBQU1xRixPQUFPLEdBQUc5bUIsSUFBSSxDQUFDTSxHQUFMLENBQVMyRixHQUFULENBQWEsZUFBT3liLEdBQVAsQ0FBVzVaLEtBQVgsQ0FBaUJDLE9BQWpCLENBQXlCO0FBQUUwWixXQUFHLEVBQUVsZCxJQUFJLENBQUNrZDtBQUFaLE9BQXpCLENBQWIsQ0FBaEIsQ0FEWSxDQUdaOztBQUNBcUYsYUFBTyxDQUFDbkIsR0FBUixDQUFZcFksS0FBWjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSWhKLElBQUksQ0FBQzRULElBQVQsRUFBZTtBQUNiLFFBQU02SixXQUFXLEdBQUdoaUIsSUFBSSxDQUFDTSxHQUFMLENBQVMyRixHQUFULENBQ2xCLGVBQU93WCxnQkFBUCxDQUF3QjNWLEtBQXhCLENBQThCQyxPQUE5QixDQUFzQztBQUFFSCxhQUFPLEVBQUVyRCxJQUFJLENBQUM0VDtBQUFoQixLQUF0QyxDQURrQixDQUFwQjtBQUlBNkosZUFBVyxDQUFDMkQsR0FBWixDQUFnQnBZLEtBQWhCO0FBQ0Q7O0FBRUQsTUFBSWhKLElBQUksQ0FBQ3laLFNBQUwsSUFBa0J6WixJQUFJLENBQUM0VCxJQUEzQixFQUFpQztBQUMvQixRQUFNNUMsUUFBUSxHQUFHdlYsSUFBSSxDQUFDTSxHQUFMLENBQVMyRixHQUFULENBQ2YsZUFBT21TLGFBQVAsQ0FBcUJ0USxLQUFyQixDQUEyQkMsT0FBM0IsQ0FBbUM7QUFDakNILGFBQU8sRUFBRXJELElBQUksQ0FBQ3laLFNBQUwsSUFBa0J6WixJQUFJLENBQUM0VDtBQURDLEtBQW5DLENBRGUsQ0FBakI7QUFNQTVDLFlBQVEsQ0FBQ29RLEdBQVQsQ0FBYXBZLEtBQWI7QUFDRDs7QUFFRDFFLE9BQUssQ0FBQzhjLEdBQU4sQ0FBVXBZLEtBQVY7QUFDQWlaLFVBQVEsQ0FBQ2IsR0FBVCxDQUFhcFksS0FBYjtBQUNELENBbEZhLENBQWQ7QUFvRk8sSUFBTTFGLEtBQUssR0FBRztBQUNuQnFkLEtBQUcsRUFBSEEsR0FEbUI7QUFFbkI1SixRQUFNLEVBQU5BLE1BRm1CO0FBR25CQyxTQUFPLEVBQVBBLE9BSG1CO0FBSW5CQyxNQUFJLEVBQUpBLElBSm1CO0FBS25CQyxXQUFTLEVBQVRBLFNBTG1CO0FBTW5CQyxNQUFJLEVBQUpBLElBTm1CO0FBT25CMkosT0FBSyxFQUFMQTtBQVBtQixDQUFkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xTUDs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTTNiLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUFKLE1BQU0sRUFBSTtBQUN6QixNQUFNeWQsUUFBUSxHQUFHLENBQUN6ZCxNQUFNLElBQUksRUFBWCxFQUFlMEQsS0FBZixDQUFxQixJQUFyQixFQUEyQjlHLE1BQTNCLENBQWtDLFVBQUM4QyxHQUFELEVBQU1nZSxJQUFOLEVBQWU7QUFDaEUsUUFBTUMsTUFBTSxHQUFHRCxJQUFJLENBQ2hCalgsSUFEWSxHQUVaL0MsS0FGWSxDQUVOLEdBRk0sRUFHWmpMLEdBSFksQ0FHUmpDLENBQUMsQ0FBQ2lRLElBSE0sRUFJWkUsTUFKWSxDQUlMLFVBQUFxRixDQUFDO0FBQUEsYUFBSUEsQ0FBSjtBQUFBLEtBSkksQ0FBZjtBQU1BLFFBQUksQ0FBQzJSLE1BQU0sQ0FBQ2pnQixNQUFaLEVBQW9CLE9BQU9nQyxHQUFQO0FBQ3BCLFdBQU9sSixDQUFDLENBQUNvbkIsU0FBRixDQUFZRCxNQUFaLEVBQW9CLEVBQXBCLEVBQXdCamUsR0FBeEIsQ0FBUDtBQUNELEdBVGdCLEVBU2QsRUFUYyxDQUFqQjs7QUFXQSxNQUFNeEQsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQWdILENBQUMsRUFBSTtBQUNyQixRQUFJMmEsS0FBSyxHQUFHM2EsQ0FBWjtBQUVBLFFBQUksT0FBT0EsQ0FBUCxLQUFhLFFBQWpCLEVBQTJCMmEsS0FBSyxHQUFHM2EsQ0FBQyxDQUFDUSxLQUFGLENBQVEsR0FBUixDQUFSO0FBQzNCLFdBQU9tYSxLQUFLLElBQUlybkIsQ0FBQyxDQUFDMEUsSUFBRixDQUFPMmlCLEtBQVAsRUFBY0osUUFBZCxDQUFoQjtBQUNELEdBTEQ7O0FBT0EsTUFBTWxkLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUEyQyxDQUFDO0FBQUEsV0FBSTFNLENBQUMsQ0FBQ3NuQixNQUFGLENBQVM1aEIsU0FBUyxDQUFDZ0gsQ0FBRCxDQUFsQixDQUFKO0FBQUEsR0FBbkI7O0FBQ0EsTUFBTTVDLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUE0QyxDQUFDO0FBQUEsV0FBSTNDLFNBQVMsQ0FBQzJDLENBQUQsQ0FBVCxDQUFhLENBQWIsS0FBbUIsSUFBdkI7QUFBQSxHQUFsQjs7QUFDQSxNQUFNNmEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQTdhLENBQUM7QUFBQSxXQUFJM0MsU0FBUyxDQUFDMkMsQ0FBRCxDQUFULENBQWF5RixHQUFiLE1BQXNCLElBQTFCO0FBQUEsR0FBdEI7O0FBRUEsTUFBTW5JLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQTBDLENBQUMsRUFBSTtBQUN6QixRQUFNM0gsSUFBSSxHQUFHLE9BQU8ySCxDQUFQLEtBQWEsUUFBYixHQUF3QkEsQ0FBQyxDQUFDUSxLQUFGLENBQVEsR0FBUixDQUF4QixHQUF1Q1IsQ0FBcEQ7QUFDQSxRQUFNdEksTUFBTSxHQUFHLEVBQWY7QUFDQSxRQUFJb2pCLElBQUksR0FBRzlhLENBQVg7O0FBRUEsV0FBTzhhLElBQVAsRUFBYTtBQUNYQSxVQUFJLEdBQUcxZCxRQUFRLDhCQUFLL0UsSUFBTCxHQUFjWCxNQUFkLEVBQWY7QUFDQW9qQixVQUFJLElBQUlwakIsTUFBTSxDQUFDMkksSUFBUCxDQUFZeWEsSUFBWixDQUFSO0FBQ0Q7O0FBRUQsV0FBT3BqQixNQUFQO0FBQ0QsR0FYRDs7QUFhQSxNQUFNNkYsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQXlDLENBQUMsRUFBSTtBQUNwQixRQUFNM0gsSUFBSSxHQUFHLE9BQU8ySCxDQUFQLEtBQWEsUUFBYixHQUF3QkEsQ0FBQyxDQUFDUSxLQUFGLENBQVEsR0FBUixDQUF4QixHQUF1Q1IsQ0FBcEQ7QUFFQSxXQUFPM0MsU0FBUyxDQUFDaEYsSUFBRCxDQUFULENBQWdCcUIsTUFBaEIsQ0FBdUIsVUFBQ3FoQixLQUFELEVBQVF2bEIsR0FBUixFQUFnQjtBQUM1QyxVQUFNQyxHQUFHLEdBQUcySCxRQUFRLDhCQUFLL0UsSUFBTCxJQUFXN0MsR0FBWCxHQUFwQjtBQUVBLDBDQUFXdWxCLEtBQVgsSUFBa0IsQ0FBQ3ZsQixHQUFELEVBQU1DLEdBQU4sQ0FBbEI7QUFDRCxLQUpNLEVBSUosRUFKSSxDQUFQO0FBS0QsR0FSRDs7QUFVQSxTQUFPO0FBQ0xxSCxVQUFNLEVBQU5BLE1BREs7QUFFTDlELGFBQVMsRUFBVEEsU0FGSztBQUdMb0UsWUFBUSxFQUFSQSxRQUhLO0FBSUxDLGFBQVMsRUFBVEEsU0FKSztBQUtMd2QsZ0JBQVksRUFBWkEsWUFMSztBQU1MdmQsaUJBQWEsRUFBYkEsYUFOSztBQU9MQyxZQUFRLEVBQVJBO0FBUEssR0FBUDtBQVNELENBdkREOztBQXlETyxJQUFNeWQsU0FBUyxHQUFHO0FBQUU5ZCxVQUFRLEVBQVJBO0FBQUYsQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RQOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTTZZLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ2tGLE1BQUQsRUFBU2xqQixJQUFULEVBQWtCO0FBQ3RDLE1BQU00Z0IsUUFBUSxHQUFHcmxCLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxHQUFULENBQVAsRUFBc0JELElBQXRCLENBQWpCO0FBQ0EsTUFBTW1qQixNQUFNLEdBQUc1bkIsQ0FBQyxDQUFDOEUsT0FBRixDQUNiLENBQUMsVUFBRCxFQUFhLGFBQWIsRUFBNEIsU0FBNUIsRUFBdUMsV0FBdkMsQ0FEYSxFQUViOUUsQ0FBQyxDQUFDK0UsSUFBRixDQUFPL0UsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBUCxFQUFtQkQsSUFBbkIsQ0FBUCxDQUZhLEVBSVp4QyxHQUpZLENBSVIsVUFBQUMsR0FBRztBQUFBLFdBQUlsQyxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXeEMsR0FBWCxDQUFQLEVBQXdCdUMsSUFBeEIsQ0FBSjtBQUFBLEdBSkssRUFLWitCLElBTFksR0FNWjJMLEdBTlksRUFBZjs7QUFGc0MsYUFTbEJ3VixNQUFNLENBQUN0RSxTQUFQLENBQWlCcmIsS0FBakIsQ0FBdUI0TCxLQUF2QixDQUE2QnlSLFFBQTdCLEtBQTBDLEVBVHhCO0FBQUEsTUFTOUJ2ZCxPQVQ4QixRQVM5QkEsT0FUOEI7O0FBVXRDLE1BQU1OLEVBQUUsR0FBR3hILENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxJQUFQLEVBQWFHLElBQWIsQ0FBWDtBQUVBLFNBQU8rQyxFQUFFLElBQUlBLEVBQUUsS0FBS00sT0FBYixJQUF3QjhmLE1BQXhCLElBQWtDQSxNQUFNLEdBQUcsYUFBbEQ7QUFDRCxDQWJEOztBQWVBLElBQU10RixvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUN1RixPQUFELEVBQVVwakIsSUFBVixFQUFtQjtBQUM5QyxNQUFNK0MsRUFBRSxHQUFHeEgsQ0FBQyxDQUFDc0UsSUFBRixDQUFPLElBQVAsRUFBYUcsSUFBYixDQUFYO0FBRUEsU0FDRStDLEVBQUUsSUFDRkEsRUFBRSxLQUNBLHlCQUFRO0FBQ044RixZQUFRLEVBQUUsQ0FBQ3ROLENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLFFBQUQsRUFBVyxHQUFYLENBQVAsRUFBd0JELElBQXhCLEtBQWlDLEVBQWxDLEVBQXNDcWpCLE1BQXRDLENBQTZDLENBQTdDLEtBQW1EMWQsU0FEdkQ7QUFFTmlMLGFBQVMsRUFBRXJKLFFBQVEsQ0FBQ2hNLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxXQUFQLEVBQW9CRyxJQUFwQixDQUFELEVBQTRCLEVBQTVCLENBRmI7QUFHTjBJLFFBQUksRUFBRW5OLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxNQUFQLEVBQWVHLElBQWYsQ0FIQTtBQUlOc0UsU0FBSyxFQUFFL0ksQ0FBQyxDQUFDc0UsSUFBRixDQUNMLFdBREssRUFFTCxlQUFPb2QsS0FBUCxDQUFhMVosS0FBYixDQUFtQjRMLEtBQW5CLENBQXlCNVQsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsT0FBRCxFQUFVLEdBQVYsQ0FBUCxFQUF1QkQsSUFBdkIsQ0FBekIsQ0FGSyxDQUpEO0FBUU40VCxRQUFJLEVBQUVyWSxDQUFDLENBQUNzRSxJQUFGLENBQ0osU0FESSxFQUVKLGVBQU95RCxLQUFQLENBQWFDLEtBQWIsQ0FBbUI0TCxLQUFuQixDQUF5QjVULENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLElBQUQsRUFBTyxHQUFQLENBQVAsRUFBb0JELElBQXBCLENBQXpCLENBRkksQ0FSQTtBQVlOeVosYUFBUyxFQUFFbGUsQ0FBQyxDQUFDc0UsSUFBRixDQUNULFNBRFMsRUFFVCxlQUFPeUQsS0FBUCxDQUFhQyxLQUFiLENBQW1CNEwsS0FBbkIsQ0FBeUI1VCxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxTQUFELEVBQVksR0FBWixDQUFQLEVBQXlCRCxJQUF6QixDQUF6QixDQUZTLENBWkw7QUFnQk5zZCxnQkFBWSxFQUFFL2hCLENBQUMsQ0FBQ3NFLElBQUYsQ0FBTyxjQUFQLEVBQXVCRyxJQUF2QjtBQWhCUixHQUFSLENBSEo7QUFzQkQsQ0F6QkQ7O0FBMkJBLElBQU1zakIsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixDQUFDRixPQUFELEVBQVVwakIsSUFBVixFQUFtQjtBQUNoRCxNQUFNNkksUUFBUSxHQUFHLENBQUN0TixDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxRQUFELEVBQVcsR0FBWCxDQUFQLEVBQXdCRCxJQUF4QixLQUFpQyxFQUFsQyxFQUFzQ3FqQixNQUF0QyxDQUE2QyxDQUE3QyxLQUFtRDFkLFNBQXBFO0FBQ0EsTUFBTTRkLFFBQVEsR0FBR2hvQixDQUFDLENBQUNzRSxJQUFGLENBQ2YsVUFEZSxFQUVmLGVBQU8wVSxlQUFQLENBQXVCaFIsS0FBdkIsQ0FBNkI0TCxLQUE3QixDQUFtQzVULENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxHQUFULENBQVAsRUFBc0JELElBQXRCLENBQW5DLENBRmUsQ0FBakI7QUFLQSxTQUFPNkksUUFBUSxJQUFJQSxRQUFRLEtBQUswYSxRQUFoQztBQUNELENBUkQ7O0FBVUEsSUFBTXhGLDRCQUE0QixHQUFHLFNBQS9CQSw0QkFBK0IsQ0FBQ3FGLE9BQUQsRUFBVXBqQixJQUFWLEVBQW1CO0FBQ3RELE1BQU1zZCxZQUFZLEdBQUcvaEIsQ0FBQyxDQUFDc0UsSUFBRixDQUFPLGNBQVAsRUFBdUJHLElBQXZCLENBQXJCO0FBQ0EsTUFBTStDLEVBQUUsR0FBR3hILENBQUMsQ0FBQ3NFLElBQUYsQ0FDVCxTQURTLEVBRVQsZUFBTytlLFNBQVAsQ0FBaUJyYixLQUFqQixDQUF1QjRMLEtBQXZCLENBQTZCNVQsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLEdBQVQsQ0FBUCxFQUFzQkQsSUFBdEIsQ0FBN0IsQ0FGUyxDQUFYO0FBS0EsU0FBTytDLEVBQUUsSUFBSUEsRUFBRSxLQUFLdWEsWUFBcEI7QUFDRCxDQVJEOztBQVVBLElBQU1rRyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUFDLEdBQUc7QUFBQSxTQUFJLFVBQ25DQyxZQURtQyxFQUVuQzFqQixJQUZtQyxFQUduQzJqQixRQUhtQyxFQUluQ0MsTUFKbUMsRUFLbkNDLFVBTG1DLEVBTWhDO0FBQUEsZ0JBRUQsZUFBT3ZnQixLQUFQLENBQWFDLEtBQWIsQ0FBbUI0TCxLQUFuQixDQUF5QjVULENBQUMsQ0FBQzBFLElBQUYsQ0FBTyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQVAsRUFBbUI0akIsVUFBbkIsS0FBa0MsRUFBM0QsS0FBa0UsRUFGakU7QUFBQSxRQUNLeGdCLE9BREwsU0FDS0EsT0FETDs7QUFBQSxnQ0FHOEIsZUFBT3FnQixZQUFQLEVBQXFCbmdCLEtBQXJCLENBQTJCNEwsS0FBM0IsQ0FDL0I1VCxDQUFDLENBQUNzRSxJQUFGLENBQU8sR0FBUCxFQUFZRyxJQUFaLEtBQXFCLEVBRFUsQ0FIOUI7QUFBQSxRQUdjOGpCLFdBSGQseUJBR0t6Z0IsT0FITDs7QUFPSCxRQUFJLENBQUNBLE9BQUQsSUFBWUEsT0FBTyxLQUFLeWdCLFdBQTVCLEVBQXlDLE9BQU8sS0FBUDtBQUN6QyxXQUFPTCxHQUFHLENBQUNNLE9BQUosQ0FBWTtBQUFFekgsVUFBSSxxQ0FBOEJvSCxZQUE5QjtBQUFOLEtBQVosRUFDTDFqQixJQURLLENBQVA7QUFHRCxHQWpCZ0M7QUFBQSxDQUFqQzs7QUFtQkEsSUFBTWdrQixvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUNaLE9BQUQsRUFBVXBqQixJQUFWLEVBQW1CO0FBQUEsY0FDckJBLElBQUksSUFBSSxFQURhO0FBQUEsTUFDdEM2VyxDQURzQyxTQUN0Q0EsQ0FEc0M7QUFBQSxNQUNoQ29OLE1BRGdDLDJDQUNUOzs7QUFFckNBLFFBQU0sQ0FBQ3JULFNBQVAsR0FBbUJyRixVQUFVLENBQUMwWSxNQUFNLENBQUNyVCxTQUFSLEVBQW1CLEVBQW5CLENBQTdCOztBQUg4QyxjQUs1QyxlQUFPZ08sU0FBUCxDQUFpQnJiLEtBQWpCLENBQXVCNEwsS0FBdkIsQ0FBNkI1VCxDQUFDLENBQUMwRSxJQUFGLENBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFQLEVBQW1CRCxJQUFuQixLQUE0QixFQUF6RCxLQUFnRSxFQUxwQjtBQUFBLE1BSXRDcUQsT0FKc0MsU0FJdENBLE9BSnNDOztBQU85QyxTQUFPQSxPQUFPLElBQUlBLE9BQU8sS0FBSyx5QkFBUTRnQixNQUFSLENBQTlCO0FBQ0QsQ0FSRDs7QUFVQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDQyxNQUFELEVBQVNqQixNQUFULEVBQWlCa0IsTUFBakIsRUFBeUJqTixJQUF6QixFQUFrQztBQUFBLGNBQ0wrTCxNQUFNLElBQUksRUFETDtBQUFBLDhCQUM1QzlFLFNBRDRDO0FBQUEsTUFDNUNBLFNBRDRDLGdDQUNoQyxTQURnQztBQUFBLDJCQUNyQnZJLE1BRHFCO0FBQUEsTUFDckJBLE1BRHFCLDZCQUNaLEVBRFk7O0FBR3BELE1BQU00TCxLQUFLLEdBQUc0QyxNQUFNLENBQUNDLGNBQVAsQ0FBc0IsTUFBdEIsSUFDVkQsTUFBTSxDQUFDRSxJQUFQLENBQVlwTixJQUFaLEVBQWtCLEtBQWxCLENBRFUsR0FFVixJQUFJa04sTUFBSixDQUFXbE4sSUFBWCxFQUFpQixLQUFqQixDQUZKO0FBR0EsTUFBTXFOLElBQUksR0FBR0gsTUFBTSxDQUFDQyxjQUFQLENBQXNCLE1BQXRCLElBQ1RELE1BQU0sQ0FBQ0UsSUFBUCxDQUFZOUMsS0FBWixFQUFtQixLQUFuQixDQURTLEdBRVQsSUFBSTRDLE1BQUosQ0FBVzVDLEtBQVgsRUFBa0IsS0FBbEIsQ0FGSjtBQUdBLE1BQU1nRCxJQUFJLEdBQUdOLE1BQU0sQ0FBQ00sSUFBUCxDQUFZTCxNQUFaLEVBQW9CO0FBQy9CSSxRQUFJLEVBQUpBLElBRCtCO0FBRS9CbEcsY0FBVSxFQUFFekksTUFBTSxDQUFDeUksVUFGWTtBQUcvQkMsWUFBUSxFQUFFMUksTUFBTSxDQUFDMEksUUFIYztBQUkvQkMsY0FBVSxFQUFFM0ksTUFBTSxDQUFDMkksVUFKWTtBQUsvQkMsZUFBVyxFQUFFNUksTUFBTSxDQUFDNEksV0FMVztBQU0vQmlHLE9BQUcsRUFBRSxJQU4wQjtBQU8vQjVoQixRQUFJLEVBQUVxaEIsTUFBTSxDQUFDL0YsU0FBRDtBQVBtQixHQUFwQixDQUFiO0FBU0EsTUFBSTBELEdBQUcsR0FBRyxDQUFWO0FBQ0EsTUFBSTlVLENBQUo7O0FBRUEsT0FBS0EsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxJQUFJNkksTUFBTSxDQUFDd0ksVUFBUCxHQUFvQixDQUFyQyxFQUF3Q3JSLENBQUMsSUFBSSxDQUFMLEVBQVE4VSxHQUFHLEVBQW5ELEVBQXVEO0FBQ3JELFFBQUkyQyxJQUFJLENBQUMzQyxHQUFELENBQUosS0FBYyxDQUFsQixFQUFxQixPQUFPLEtBQVA7QUFDdEI7O0FBQ0QsTUFBTTZDLElBQUksR0FBRyxRQUFTLElBQUkzWCxDQUFKLEdBQVE2SSxNQUFNLENBQUN3SSxVQUFyQztBQUVBLFNBQU8sQ0FBQ29HLElBQUksQ0FBQzNDLEdBQUQsQ0FBSixHQUFZNkMsSUFBYixNQUF1QixDQUE5QjtBQUNELENBM0JEOztBQTZCQSxJQUFNeEcsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDK0UsTUFBRCxFQUFTbGpCLElBQVQsRUFBa0I7QUFDNUMsTUFBTW1rQixNQUFNLEdBQUdTLG1CQUFPLENBQUMsc0JBQUQsQ0FBdEI7O0FBRUEsTUFBSSxDQUFDVCxNQUFMLEVBQWEsT0FBTyxJQUFQLENBSCtCLENBR2xCOztBQUhrQixjQUlWakIsTUFBTSxJQUFJLEVBSkE7QUFBQSw4QkFJcEM5RSxTQUpvQztBQUFBLE1BSXBDQSxTQUpvQyxnQ0FJeEIsU0FKd0I7O0FBSzVDLE1BQU1nRyxNQUFNLEdBQUc3b0IsQ0FBQyxDQUFDMEUsSUFBRixDQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBUCxFQUFtQkQsSUFBbkIsQ0FBZjs7QUFFQSxNQUFJb2UsU0FBUyxLQUFLLFNBQWxCLEVBQTZCO0FBQzNCLFVBQU0sSUFBSXlHLEtBQUosQ0FBVSx1Q0FBVixDQUFOO0FBQ0Q7O0FBRUR0cEIsR0FBQyxDQUFDOEUsT0FBRixDQUFVLENBQUMsR0FBRCxDQUFWLEVBQWlCOUUsQ0FBQyxDQUFDK0UsSUFBRixDQUFPTixJQUFQLENBQWpCLEVBQStCTyxPQUEvQixDQUF1QyxVQUFBNFcsSUFBSSxFQUFJO0FBQzdDLFFBQUksQ0FBQytNLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTakIsTUFBVCxFQUFpQmtCLE1BQWpCLEVBQXlCak4sSUFBekIsQ0FBaEIsRUFBZ0Q7QUFDOUN2SixhQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCdVcsTUFBNUIsRUFBb0NqTixJQUFwQztBQUNBLGFBQU9uWCxJQUFJLENBQUNtWCxJQUFELENBQVg7QUFDRDtBQUNGLEdBTEQ7QUFNQSxTQUFPLElBQVA7QUFDRCxDQWxCRDs7QUFvQkEsSUFBTTJOLE9BQU8sR0FBR3ZwQixDQUFDLENBQUNnQyxPQUFGLENBQ2QsVUFBQWttQixHQUFHLEVBQUk7QUFDTEEsS0FBRyxDQUFDc0IsVUFBSixDQUFlLGVBQWYsRUFBZ0M7QUFDOUJDLFlBQVEsRUFBRWhIO0FBRG9CLEdBQWhDO0FBR0F5RixLQUFHLENBQUNzQixVQUFKLENBQWUsc0JBQWYsRUFBdUM7QUFDckNDLFlBQVEsRUFBRW5IO0FBRDJCLEdBQXZDO0FBR0E0RixLQUFHLENBQUNzQixVQUFKLENBQWUsNkJBQWYsRUFBOEM7QUFDNUNDLFlBQVEsRUFBRTFCO0FBRGtDLEdBQTlDO0FBR0FHLEtBQUcsQ0FBQ3NCLFVBQUosQ0FBZSw4QkFBZixFQUErQztBQUM3Q0MsWUFBUSxFQUFFakg7QUFEbUMsR0FBL0M7QUFHQTBGLEtBQUcsQ0FBQ3NCLFVBQUosQ0FBZSxrQkFBZixFQUFtQztBQUNqQ0MsWUFBUSxFQUFFeEIscUJBQXFCLENBQUNDLEdBQUQ7QUFERSxHQUFuQztBQUdBQSxLQUFHLENBQUNzQixVQUFKLENBQWUsMEJBQWYsRUFBMkM7QUFDekNDLFlBQVEsRUFBRWhCO0FBRCtCLEdBQTNDO0FBR0FQLEtBQUcsQ0FBQ3NCLFVBQUosQ0FBZSxxQkFBZixFQUFzQztBQUNwQ0MsWUFBUSxFQUFFN0csbUJBRDBCO0FBRXBDOEcsYUFBUyxFQUFFO0FBRnlCLEdBQXRDO0FBSUEsU0FBT3hCLEdBQVA7QUFDRCxDQXpCYSxFQTBCZDVILEdBQUcsQ0FBQ2lKLE9BMUJVLENBQWhCO0FBNkJPLElBQU1JLFVBQVUsR0FBRyxxQ0FBaUI7QUFDekN0SixhQUFXLEVBQUUsZUFBT0EsV0FEcUI7QUFFekNoRyxNQUFJLEVBQUVrUDtBQUZtQyxDQUFqQixDQUFuQjs7QUFLUCxJQUFNdk8sWUFBWSxHQUFHaGIsQ0FBQyxDQUFDQyxLQUFGLENBQVEsVUFBQ0MsSUFBRCxFQUFPMHBCLE9BQVA7QUFBQSxTQUMzQkEsT0FBTyxDQUFDN08sRUFBUixDQUFXLElBQVgsRUFBaUIsU0FBUzhPLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCO0FBQUE7O0FBQ3ZDLFFBQU14TyxDQUFDLEdBQUd3TyxHQUFHLENBQUMsR0FBRCxDQUFiO0FBRUEsV0FBT0EsR0FBRyxDQUFDLEdBQUQsQ0FBVjtBQUNBLFFBQUksVUFBVUEsR0FBVixJQUFpQixXQUFXQSxHQUFoQyxFQUFxQztBQUNyQyxRQUFJQSxHQUFHLENBQUMxRSxHQUFKLElBQVcsQ0FBQ3BsQixDQUFDLENBQUMrRSxJQUFGLENBQU8ra0IsR0FBRyxDQUFDMUUsR0FBWCxFQUFnQmxlLE1BQWhDLEVBQXdDO0FBQ3hDLFFBQU02aUIsT0FBTyxHQUFHN3BCLElBQUksQ0FBQ29hLE1BQUwsQ0FBWUUsaUJBQVosR0FDWjlMLE9BQU8sQ0FBQ2hPLE9BQVIsQ0FBZ0JvcEIsR0FBaEIsQ0FEWSxHQUVaSCxVQUFVLENBQUNGLFFBQVgsQ0FBb0JLLEdBQXBCLENBRko7QUFJQUMsV0FBTyxDQUNKL29CLElBREgsQ0FDUSxVQUFBZ3BCLFNBQVMsRUFBSTtBQUNqQixVQUFJLENBQUNBLFNBQUwsRUFBZ0IsT0FBTzNYLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaLEVBQW1Dd1gsR0FBbkMsQ0FBUDtBQUNoQkEsU0FBRyxDQUFDLEdBQUQsQ0FBSCxHQUFXeE8sQ0FBWDtBQUNBLGFBQU8sS0FBSSxDQUFDMk8sRUFBTCxDQUFRekMsSUFBUixDQUFhc0MsR0FBYixDQUFQO0FBQ0QsS0FMSCxFQU1HSSxLQU5ILENBTVMsVUFBQXJwQixHQUFHO0FBQUEsYUFBSXdSLE9BQU8sQ0FBQzhYLEtBQVIsQ0FBYyxjQUFkLEVBQThCTCxHQUE5QixFQUFtQ2pwQixHQUFHLENBQUN1cEIsS0FBSixJQUFhdnBCLEdBQWhELENBQUo7QUFBQSxLQU5aO0FBT0QsR0FqQkQsQ0FEMkI7QUFBQSxDQUFSLENBQXJCO0FBcUJPLElBQU13cEIsVUFBVSxHQUFHO0FBQ3hCNUgsZUFBYSxFQUFiQSxhQUR3QjtBQUV4Qkgsc0JBQW9CLEVBQXBCQSxvQkFGd0I7QUFHeEJ5Rix3QkFBc0IsRUFBdEJBLHNCQUh3QjtBQUl4QnZGLDhCQUE0QixFQUE1QkEsNEJBSndCO0FBS3hCeUYsdUJBQXFCLEVBQXJCQSxxQkFMd0I7QUFNeEJRLHNCQUFvQixFQUFwQkEsb0JBTndCO0FBT3hCRSxhQUFXLEVBQVhBLFdBUHdCO0FBUXhCL0YscUJBQW1CLEVBQW5CQSxtQkFSd0I7QUFTeEIyRyxTQUFPLEVBQVBBLE9BVHdCO0FBVXhCSSxZQUFVLEVBQVZBLFVBVndCO0FBV3hCM08sY0FBWSxFQUFaQTtBQVh3QixDQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TVA7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBQ2UsV0FBS1gsSTs7Ozs7Ozs7Ozs7O0FDUnBCLG9EOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG9EIiwiZmlsZSI6Im5vdGFidWctcGVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJub3RhYnVnLXBlZXJcIiwgW1wiYXJnb24yXCIsIFwiZ3VuLXNjb3BlXCIsIFwiZ3VuLXN1cHByZXNzb3JcIiwgXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIsIFwib2JqZWN0LWhhc2hcIiwgXCJyYW1kYVwiLCBcInJvdXRlLXBhcnNlclwiLCBcInVyaS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcmdvbjJcIl0sIHJvb3RbXCJndW4tc2NvcGVcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3NvclwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yLXNlYXJcIl0sIHJvb3RbXCJvYmplY3QtaGFzaFwiXSwgcm9vdFtcInJhbWRhXCJdLCByb290W1wicm91dGUtcGFyc2VyXCJdLCByb290W1widXJpLWpzXCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5cbmNvbnN0IHNpZ251cCA9IFIuY3VycnkoXG4gIChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQsIG9wdHMgPSB7fSkgPT5cbiAgICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IHBlZXIudXNlcigpO1xuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICB1c2VyLmNyZWF0ZShcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBhY2sgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWNrLmVycikge1xuICAgICAgICAgICAgICAgIGZhaWwoYWNrLmVycik7XG4gICAgICAgICAgICAgICAgdXNlci5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgIHBlZXIuZ3VuLnVzZXIoKS5sZWF2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZXIubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKG9rKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdHNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICB9XG4gICAgfSlcbik7XG5cbmNvbnN0IGxvZ2luID0gUi5jdXJyeSgocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkKSA9PlxuICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICBjb25zdCB1c2VyID0gcGVlci51c2VyKCk7XG5cbiAgICAgIHVzZXIuYXV0aCh1c2VybmFtZSwgcGFzc3dvcmQsIGFjayA9PlxuICAgICAgICBhY2suZXJyID8gZmFpbChhY2suZXJyKSA6IG9rKHBlZXIudXNlcigpLmlzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgIH1cbiAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgIHBlZXIuX29uTG9naW4gJiYgcGVlci5fb25Mb2dpbihyZXN1bHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IGxvZ291dCA9IHBlZXIgPT4gcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG5jb25zdCBpc0xvZ2dlZEluID0gcGVlciA9PiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyICYmIHBlZXIudXNlcigpLmlzO1xuY29uc3Qgb25Mb2dpbiA9IFIuY3VycnkoKHBlZXIsIGZuKSA9PiAocGVlci5fb25Mb2dpbiA9IGZuKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZXhwb3J0IGNvbnN0IEF1dGhlbnRpY2F0aW9uID0ge1xuICBzaWdudXAsXG4gIGxvZ2luLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIG9uTG9naW5cbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBDb25maWcgPSB7XG4gIHRhYnVsYXRvcjogQ29uc3RhbnRzLkRFVl9JTkRFWEVSLFxuICBpbmRleGVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIG93bmVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIHVwZGF0ZTogUi5jb21wb3NlKFxuICAgIFIubWFwKChba2V5LCB2YWxdKSA9PiAoQ29uZmlnW2tleV0gPSB2YWwpKSxcbiAgICBSLnRvUGFpcnNcbiAgKVxufTtcbiIsImNvbnN0IENPTU1BTkRfUkUgPSAvXiB7NH1+LztcbmNvbnN0IFBSRUZJWCA9IFwibmFiXCI7XG5jb25zdCBTT1VMX0RFTElNRVRFUiA9IFwifH5+fFwiO1xuXG5jb25zdCBMSVNUSU5HX1NJWkUgPSAxMDAwO1xuXG5jb25zdCBNQVhfSEFTSF9TSVpFID0gNjQ7XG5jb25zdCBNQVhfUE9XX05PTkNFX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9UT1BJQ19TSVpFID0gNDI7XG5jb25zdCBNQVhfQVVUSE9SX0FMSUFTX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfQVVUSE9SX0lEX1NJWkUgPSAxMjg7IC8vID8/P1xuY29uc3QgTUFYX1VSTF9TSVpFID0gMjA0ODtcbmNvbnN0IE1BWF9ET01BSU5fU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9USElOR19LSU5EX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9USElOR19USVRMRV9TSVpFID0gMzAwO1xuY29uc3QgTUFYX1RISU5HX0JPRFlfU0laRSA9IDUwMDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19JRFNfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1RBQlNfU0laRSA9IDUwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFID0gTUFYX0FVVEhPUl9JRF9TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSA9IDE2O1xuXG5jb25zdCBERUZBVUxUX0lOREVYRVIgPSBcIkNFeUtyRGQxeHlQWHBXU1YwME1ndm5aWTJWSkxIWGd6Q3ZoTWVEd0tUWUEueWpTcTBEeVh6emhCX1pYcl9EemZKZ2lqM3RYVTAtM3QwUTViSkF0WnBqOFwiO1xuY29uc3QgREVWX0lOREVYRVIgPSBcImwyblNlZGxTbHZvbVRxQ1lobVBuQU5vUUxYZTRzajVyUjJPckM3WXFQcFUuemltYVd3ZGxmeVRyVklUZ3dXb0RWZGJKUUtSZU9UcVY1ek5qVFJjLXlRQVwiO1xuXG5leHBvcnQgY29uc3QgQ29uc3RhbnRzID0ge1xuICBDT01NQU5EX1JFLFxuICBQUkVGSVgsXG4gIFNPVUxfREVMSU1FVEVSLFxuICBMSVNUSU5HX1NJWkUsXG4gIE1BWF9IQVNIX1NJWkUsXG4gIE1BWF9QT1dfTk9OQ0VfU0laRSxcbiAgTUFYX1RPUElDX1NJWkUsXG4gIE1BWF9BVVRIT1JfQUxJQVNfU0laRSxcbiAgTUFYX0FVVEhPUl9JRF9TSVpFLFxuICBNQVhfVVJMX1NJWkUsXG4gIE1BWF9ET01BSU5fU0laRSxcbiAgTUFYX1RISU5HX0tJTkRfU0laRSxcbiAgTUFYX1RISU5HX1RJVExFX1NJWkUsXG4gIE1BWF9USElOR19CT0RZX1NJWkUsXG4gIE1BWF9MSVNUSU5HX0lEU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VSQ0VfU0laRSxcbiAgTUFYX0xJU1RJTkdfVEFCU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSxcbiAgREVGQVVMVF9JTkRFWEVSLFxuICBERVZfSU5ERVhFUlxufTtcbiIsIi8qIGdsb2JhbHMgR3VuICovXG5pbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCBzb3VsID0gUi5wYXRoT3IoXCJcIiwgW1wiX1wiLCBcIiNcIl0pO1xuY29uc3Qgc3RhdGUgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0pO1xuXG5jb25zdCBsYXRlc3QgPSBSLmNvbXBvc2UoXG4gIFIubGFzdCxcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIudmFsdWVzLFxuICBzdGF0ZVxuKTtcblxuY29uc3QgZWRnZXMgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIucHJvcChcIiNcIikpLFxuICBSLnZhbHVlc1xuKTtcblxuZnVuY3Rpb24gZGVjb2RlU0VBKHJhd0RhdGEpIHtcbiAgY29uc3QgZGF0YSA9IHJhd0RhdGEgPyB7IC4uLnJhd0RhdGEgfSA6IHJhd0RhdGE7XG4gIGNvbnN0IHNvdWwgPSBSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpO1xuXG4gIGlmICghc291bCB8fCAhR3VuLlNFQSB8fCBzb3VsLmluZGV4T2YoXCJ+XCIpID09PSAtMSkgcmV0dXJuIHJhd0RhdGE7XG4gIFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpLmZvckVhY2goa2V5ID0+IHtcbiAgICBHdW4uU0VBLnZlcmlmeShcbiAgICAgIEd1bi5TRUEub3B0LnBhY2socmF3RGF0YVtrZXldLCBrZXksIHJhd0RhdGEsIHNvdWwpLFxuICAgICAgZmFsc2UsXG4gICAgICByZXMgPT4gKGRhdGFba2V5XSA9IEd1bi5TRUEub3B0LnVucGFjayhyZXMsIGtleSwgcmF3RGF0YSkpXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IEd1bk5vZGUgPSB7IHNvdWwsIHN0YXRlLCBsYXRlc3QsIGVkZ2VzLCBkZWNvZGVTRUEgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlLCBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuXG5jb25zdCBuZWVkc1Njb3JlcyA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInNvcnQgaG90XCIsXG4gICAgXCJzb3J0IHRvcFwiLFxuICAgIFwic29ydCBiZXN0XCIsXG4gICAgXCJzb3J0IGNvbnRyb3ZlcnNpYWxcIixcbiAgICBcInVwc1wiLFxuICAgIFwiZG93bnNcIixcbiAgICBcInNjb3JlXCIsXG4gICAgXCJjYW4gcmVtb3ZlXCJcbiAgXSk7XG5cbmNvbnN0IG5lZWRzRGF0YSA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInRvcGljXCIsXG4gICAgXCJkb21haW5cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidW5pcXVlIGJ5IGNvbnRlbnRcIixcbiAgICBcImtpbmRcIixcbiAgICBcInR5cGVcIixcbiAgICBcInJlcXVpcmUgc2lnbmVkXCIsXG4gICAgXCJyZXF1aXJlIGFub25cIixcbiAgICBcImFsaWFzXCIsXG4gICAgXCJiYW4gZG9tYWluXCIsXG4gICAgXCJiYW4gdG9waWNcIixcbiAgICBcImJhbiBhdXRob3JcIixcbiAgICBcImJhbiBhbGlhc1wiXG4gIF0pO1xuXG5jb25zdCBpdGVtc0Zyb21UaGluZ1NvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoXG4gICAgUi5tYXAoc291bCA9PiBMaXN0aW5nU29ydC5pdGVtRnJvbVNvdWwoc2NvcGUsIHNvdWwsIGRlZmluaXRpb24pLCBzb3VscylcbiAgKS50aGVuKExpc3RpbmdTb3J0LnNvcnRJdGVtcylcbik7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KChzY29wZSwgc291bHMsIGRlZmluaXRpb24pID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgIC50aGVuKFIucmVkdWNlKFIubWVyZ2VSaWdodCwge30pKVxuICAgIC50aGVuKFRoaW5nU2V0LnNvdWxzKVxuICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbGlzdGluZ3MgPSBSLnBhdGhPcihbXSwgW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwibGlzdGluZ3NcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGwgPT4gYCR7bH0vJHtzb3J0fWAsIGxpc3RpbmdzKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMgfTtcbn07XG5cbmNvbnN0IHRvcGljU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgdG9waWNzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInRvcGljc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKHQgPT4gYC90LyR7dH0vJHtzb3J0fWAsIHRvcGljcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVRvcGljKHNjb3BlLCB7IHRvcGljcywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGRvbWFpblNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGRvbWFpbnMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiZG9tYWluc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFkb21haW5zLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChkID0+IGAvZG9tYWluLyR7ZH0vJHtzb3J0fWAsIGRvbWFpbnMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlEb21haW4oc2NvcGUsIHsgZG9tYWlucywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGF1dGhvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGF1dGhvcklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJhdXRob3JzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIWF1dGhvcklkcy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9LyR7dHlwZX0vJHtzb3J0fWAsIGF1dGhvcklkcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aUF1dGhvcihzY29wZSwgeyB0eXBlLCBhdXRob3JJZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBjdXJhdG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgY3VyYXRvcnMgPSBSLnByb3AoXCJjdXJhdG9yc1wiLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWN1cmF0b3JzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vY29tbWVudGVkLyR7c29ydH1gLCBjdXJhdG9ycyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5jdXJhdGUoc2NvcGUsIGN1cmF0b3JzLCB0cnVlKVxuICAgICAgLnRoZW4oaWRzID0+IGlkcy5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpKVxuICAgICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBvcFNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IHN1Ym1pc3Npb25JZHMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwib3BzXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIXN1Ym1pc3Npb25JZHMubGVuZ3RoKSB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoXG4gICAgaWQgPT4gYC90aGluZ3MvJHtpZH0vY29tbWVudHMvJHtzb3J0fWAsXG4gICAgc3VibWlzc2lvbklkc1xuICApO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlTdWJtaXNzaW9uKHNjb3BlLCB7IHN1Ym1pc3Npb25JZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCByZXBsaWVzU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgaWQgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwicmVwbGllc1RvXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC91c2VyLyR7aWR9L3JlcGxpZXMvJHt0eXBlfS8ke3NvcnR9YF07XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5yZXBsaWVzVG9BdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGUsXG4gICAgICByZXBsaWVzVG9BdXRob3JJZDogaWQsXG4gICAgICBpbmRleGVyOiBkZWZpbml0aW9uLmluZGV4ZXJcbiAgICB9KS50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgc291cmNlcyA9IHtcbiAgbGlzdGluZzogbGlzdGluZ1NvdXJjZSxcbiAgcmVwbGllczogcmVwbGllc1NvdXJjZSxcbiAgb3A6IG9wU291cmNlLFxuICBjdXJhdG9yOiBjdXJhdG9yU291cmNlLFxuICBhdXRob3I6IGF1dGhvclNvdXJjZSxcbiAgZG9tYWluOiBkb21haW5Tb3VyY2UsXG4gIHRvcGljOiB0b3BpY1NvdXJjZVxufTtcblxuY29uc3Qgc291cmNlTmFtZXMgPSBSLmtleXMoc291cmNlcyk7XG5jb25zdCBzb3VyY2VOYW1lID0gZGVmID0+IFIuZmluZChkZWYuaXNQcmVzZW50LCBzb3VyY2VOYW1lcykgfHwgXCJ0b3BpY1wiO1xuY29uc3QgZnJvbURlZmluaXRpb24gPSBkZWZpbml0aW9uID0+XG4gIFIubWVyZ2VMZWZ0KHsgbmFtZTogc291cmNlTmFtZShkZWZpbml0aW9uKSB9LCBzb3VyY2VzW25hbWVdKGRlZmluaXRpb24pKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEYXRhU291cmNlID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgc291cmNlcyxcbiAgbmVlZHNTY29yZXMsXG4gIG5lZWRzRGF0YSxcbiAgaXRlbXNGcm9tVGhpbmdTZXRzLFxuICBpdGVtc0Zyb21UaGluZ1NvdWxzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IChzb3VyY2UsIG93bmVySWQgPSBudWxsLCBzcGFjZU5hbWUgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuICBjb25zdCBvYmogPSB7IC4uLnRva2VuaXplZCB9O1xuICBjb25zdCB7IGlzUHJlc2VudCwgZ2V0VmFsdWUsIGdldFZhbHVlcywgZ2V0VmFsdWVDaGFpbiwgZ2V0UGFpcnMgfSA9IHRva2VuaXplZDtcblxuICBbXG4gICAgb2JqLmZyb21QYWdlQXV0aG9yID0gb3duZXJJZCxcbiAgICBvYmouZnJvbVBhZ2VOYW1lID0gc3BhY2VOYW1lID8gYHNwYWNlOiR7c3BhY2VOYW1lfWAgOiB1bmRlZmluZWRcbiAgXSA9IGdldFZhbHVlQ2hhaW4oXCJzb3VyY2VkIGZyb20gcGFnZVwiKTtcbiAgb2JqLmRpc3BsYXlOYW1lID0gdG9rZW5pemVkLmdldFZhbHVlKFwibmFtZVwiKSB8fCBzcGFjZU5hbWU7XG4gIG9iai5pbmRleGVyID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgQ29uZmlnLmluZGV4ZXI7XG4gIG9iai50YWJ1bGF0b3IgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBvYmouaW5kZXhlcjtcbiAgb2JqLnRhYnMgPSBnZXRQYWlycyhcInRhYlwiKTtcbiAgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInNvcnRcIik7XG4gIG9iai51bmlxdWVCeUNvbnRlbnQgPSAhIWlzUHJlc2VudChcInVuaXF1ZSBieSBjb250ZW50XCIpO1xuICBvYmouY3VyYXRvcnMgPSBnZXRWYWx1ZXMoXCJjdXJhdG9yXCIpO1xuICBvYmoubW9kZXJhdG9ycyA9IGdldFZhbHVlcyhcIm1vZFwiKTtcbiAgb2JqLmluY2x1ZGVSYW5rcyA9ICEhaXNQcmVzZW50KFwic2hvdyByYW5rc1wiKTtcbiAgb2JqLnN0aWNreUlkcyA9IGdldFZhbHVlcyhcInN0aWNreVwiKTtcbiAgb2JqLmlzSWRTdGlja3kgPSBpZCA9PiAhIXRva2VuaXplZC5pc1ByZXNlbnQoW1wic3RpY2t5XCIsIGlkXSk7XG4gIG9iai5zdWJtaXRUb3BpY3MgPSBnZXRWYWx1ZXMoXCJzdWJtaXQgdG9cIik7XG4gIG9iai5zdWJtaXRUb3BpYyA9IGdldFZhbHVlKFwic3VibWl0IHRvXCIpO1xuICBvYmouY2hhdFRvcGljID0gZ2V0VmFsdWUoXCJjaGF0IGluXCIpO1xuXG4gIGlmIChvd25lcklkICYmIHNwYWNlTmFtZSkge1xuICAgIG9iai5zcGFjZU5hbWUgPSBzcGFjZU5hbWU7XG4gICAgb2JqLm93bmVyID0gb3duZXJJZDtcbiAgICBvYmoudXNlRm9yQ29tbWVudHMgPSAhdG9rZW5pemVkLmlzUHJlc2VudChcImNvbW1lbnRzIGxlYXZlIHNwYWNlXCIpO1xuICAgIG9iai5wYXRoID0gYC91c2VyLyR7b3duZXJJZH0vc3BhY2VzLyR7c3BhY2VOYW1lfWA7XG4gICAgb2JqLmRlZmF1bHRUYWIgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJcIik7XG4gICAgb2JqLmRlZmF1bHRUYWJQYXRoID0gb2JqLmRlZmF1bHRUYWJcbiAgICAgID8gdG9rZW5pemVkLmdldFZhbHVlKFtcInRhYlwiLCBvYmouZGVmYXVsdFRhYl0pXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBvYmouZmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIGFsbG93OiB7XG4gICAgICByZXBsaWVzVG86IGdldFZhbHVlKFwicmVwbGllcyB0byBhdXRob3JcIiksXG4gICAgICB0eXBlOiBnZXRWYWx1ZShcInR5cGVcIiksIC8vIFRPRE86IHRoaXMgZmllbGQgc2VlbXMgcmVkdW5kYW50IHdpdGgga2luZCBhbmQgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbiAgICAgIG9wczogZ2V0VmFsdWVzKFwib3BcIiksXG4gICAgICBhbGlhc2VzOiBnZXRWYWx1ZXMoXCJhbGlhc1wiKSxcbiAgICAgIGF1dGhvcnM6IGdldFZhbHVlcyhcImF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImRvbWFpblwiKSxcbiAgICAgIHRvcGljczogZ2V0VmFsdWVzKFwidG9waWNcIiksXG4gICAgICBsaXN0aW5nczogZ2V0VmFsdWVzKFwibGlzdGluZ1wiKSxcbiAgICAgIGtpbmRzOiBnZXRWYWx1ZXMoXCJraW5kXCIpLFxuICAgICAgYW5vbjogIWlzUHJlc2VudChcInJlcXVpcmUgc2lnbmVkXCIpLFxuICAgICAgc2lnbmVkOiAhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpXG4gICAgfSxcbiAgICBkZW55OiB7XG4gICAgICBhbGlhc2VzOiBnZXRWYWx1ZXMoXCJiYW4gYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJiYW4gYXV0aG9yXCIpLFxuICAgICAgZG9tYWluczogZ2V0VmFsdWVzKFwiYmFuIGRvbWFpblwiKSxcbiAgICAgIHRvcGljczogZ2V0VmFsdWVzKFwiYmFuIHRvcGljXCIpLFxuICAgICAgYW5vbjogISFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogISFpc1ByZXNlbnQoXCJyZXF1aXJlIGFub25cIiksXG4gICAgICB0YWdzOiBnZXRQYWlycyhcImNhbiByZW1vdmVcIilcbiAgICB9XG4gIH07XG5cbiAgb2JqLnZvdGVGaWx0ZXJzID0ge1xuICAgIGZ1bmN0aW9uczogW10sXG4gICAgdXBzTWluOiBwYXJzZUludChnZXRWYWx1ZShcInVwcyBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgdXBzTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInVwcyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgZG93bnNNaW46IHBhcnNlSW50KGdldFZhbHVlKFwiZG93bnMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWF4OiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGJlbG93XCIpLCAxMCkgfHwgbnVsbCxcbiAgICBzY29yZU1pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJzY29yZSBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYmVsb3dcIiksIDEwKSB8fCBudWxsXG4gIH07XG5cbiAgb2JqLmNlbnNvcnMgPSBSLnVuaXEoUi5tYXAoUi5wcm9wKDEpLCBvYmouZmlsdGVycy5kZW55LnRhZ3MpKTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRGVmaW5pdGlvbiA9IHsgZnJvbVNvdXJjZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5cbmNvbnN0IGludFBhdGggPSBwID0+XG4gIFIuY29tcG9zZShcbiAgICBwYXJzZUludCxcbiAgICBSLnBhdGgocClcbiAgKTtcblxuY29uc3QgZnJvbURlZmluaXRpb24gPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBmaWx0ZXJzLCB2b3RlRmlsdGVycywgaXNQcmVzZW50LCBpdGVtU291cmNlIH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSBbXTtcbiAgY29uc3Qgdm90ZUZpbHRlckZ1bmN0aW9ucyA9IFtdO1xuXG4gIGNvbnN0IGFkZEZpbHRlciA9ICguLi5mbnMpID0+IGZpbHRlckZ1bmN0aW9ucy5wdXNoKFIuY29tcG9zZSguLi5mbnMpKTtcbiAgY29uc3QgYWRkVm90ZUZpbHRlciA9ICguLi5mbnMpID0+IHZvdGVGaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG5cbiAgaWYgKGZpbHRlcnMuYWxsb3cuYWxpYXNlcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYWxpYXNcIiwgdF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvclwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5hdXRob3JzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJhdXRob3JcIiwgdF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LmRvbWFpbnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImRvbWFpblwiLCB0XSksIFRoaW5nRGF0YU5vZGUuZG9tYWluKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cudG9waWNzLmxlbmd0aCAmJiBpdGVtU291cmNlICE9PSBcInRvcGljXCIpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1widG9waWNcIiwgdF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcInRvcGljXCJdKSk7XG5cbiAgaWYgKFxuICAgIGZpbHRlcnMuYWxsb3cudG9waWNzLmxlbmd0aCAmJlxuICAgICFSLmZpbmQoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIuaWRlbnRpY2FsKFwiYWxsXCIpLFxuICAgICAgICBSLmxhc3QsXG4gICAgICAgIFIuc3BsaXQoXCI6XCIpXG4gICAgICApLFxuICAgICAgZmlsdGVycy5hbGxvdy50b3BpY3NcbiAgICApXG4gIClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJ0b3BpY1wiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0pKTtcblxuICBpZiAoZmlsdGVycy5hbGxvdy5raW5kcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKGtpbmQgPT4gISFpc1ByZXNlbnQoW1wia2luZFwiLCBraW5kXSksIFIucGF0aChbXCJkYXRhXCIsIFwia2luZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy50eXBlID09PSBcImNvbW1hbmRzXCIpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLnRlc3QoQ29uc3RhbnRzLkNPTU1BTkRfUkUpLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImJvZHlcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAoZmlsdGVycy5kZW55LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGFsaWFzID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYWxpYXNcIiwgYWxpYXNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9yXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYXV0aG9ySWQgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhdXRob3JcIiwgYXV0aG9ySWRdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBkb21haW4gPT4gIWRvbWFpbiB8fCAhaXNQcmVzZW50KFtcImJhblwiLCBcImRvbWFpblwiLCBkb21haW5dKSxcbiAgICAgIFRoaW5nRGF0YU5vZGUuZG9tYWluXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS50b3BpY3MubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIHRvcGljID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwidG9waWNcIiwgdG9waWNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hbm9uKSBhZGRGaWx0ZXIoUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5kZW55LnNpZ25lZClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIGF1dGhvcklkID0+ICFhdXRob3JJZCxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmICh2b3RlRmlsdGVycy51cHNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy51cHNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnVwc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5kb3duc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLmRvd25zTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuc2NvcmVNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuc2NvcmVNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcblxuICBpZiAoZmlsdGVycy5kZW55LnRhZ3MubGVuZ3RoKVxuICAgIGFkZFZvdGVGaWx0ZXIodGhpbmcgPT4ge1xuICAgICAgY29uc3QgY21kcyA9IFIucGF0aChbXCJ2b3Rlc1wiLCBcImNvbW1hbmRzXCJdLCB0aGluZykgfHwge307XG5cbiAgICAgIHJldHVybiAhZmlsdGVycy5kZW55LnRhZ3MuZmluZChcbiAgICAgICAgKFt0YWdOYW1lLCBhdXRob3JJZF0pID0+ICEhUi5wYXRoKFthdXRob3JJZCwgXCJ0YWdcIiwgdGFnTmFtZV0sIGNtZHMpXG4gICAgICApO1xuICAgIH0pO1xuXG4gIGNvbnN0IGNvbnRlbnRGaWx0ZXIgPSB0aGluZyA9PiAhZmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHZvdGVGaWx0ZXIgPSB0aGluZyA9PiAhdm90ZUZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB0aGluZ0ZpbHRlciA9IHRoaW5nID0+IGNvbnRlbnRGaWx0ZXIodGhpbmcpICYmIHZvdGVGaWx0ZXIodGhpbmcpO1xuXG4gIHJldHVybiB7IHRoaW5nRmlsdGVyLCBjb250ZW50RmlsdGVyLCB2b3RlRmlsdGVyIH07XG59O1xuXG5jb25zdCBnZXRGaWx0ZXJlZElkcyA9IGFzeW5jIChcbiAgc2NvcGUsXG4gIHNvcnRlZFJvd3MsXG4gIHsgbGltaXQgPSAyNSwgY291bnQgPSAwLCBhZnRlciA9IG51bGwsIGZpbHRlckZuIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IHJvd3MgPSBzb3J0ZWRSb3dzLnNsaWNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gW107XG4gIGNvbnN0IGZldGNoQmF0Y2ggPSAoc2l6ZSA9IDI1KSA9PlxuICAgIFByb21pc2UuYWxsKFxuICAgICAgUi5tYXAoYXN5bmMgcm93ID0+IHtcbiAgICAgICAgbGV0IGluTGlzdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKGZpbHRlckZuKSBpbkxpc3RpbmcgPSBhd2FpdCBmaWx0ZXJGbihyb3dbTGlzdGluZ05vZGUuUE9TX0lEXSk7XG4gICAgICAgIGlmIChpbkxpc3RpbmcpIGZpbHRlcmVkLnB1c2gocm93KTtcbiAgICAgIH0sIHJvd3Muc3BsaWNlKGNvdW50LCBjb3VudCArIHNpemUpKVxuICAgICk7XG5cbiAgd2hpbGUgKHJvd3MubGVuZ3RoKSB7XG4gICAgYXdhaXQgZmV0Y2hCYXRjaCgpO1xuICAgIGlmIChsaW1pdCAmJiBmaWx0ZXJlZC5sZW5ndGggPj0gbGltaXQpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIFIuY29tcG9zZShcbiAgICBSLm1hcChSLnByb3AoTGlzdGluZ05vZGUuUE9TX0lEKSksXG4gICAgbGltaXQgPyBSLnNsaWNlKDAsIGxpbWl0KSA6IFIuaWRlbnRpdHksXG4gICAgUi5zb3J0QnkoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19WQUwpKVxuICApKGZpbHRlcmVkKTtcbn07XG5cbmNvbnN0IHRoaW5nRmlsdGVyID0gUi5jdXJyeSgoc2NvcGUsIHNwZWMsIHRoaW5nSWQpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSksXG4gICAgc2NvcmVzOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc1Njb3JlcyhzcGVjKSxcbiAgICBkYXRhOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc0RhdGEoc3BlYylcbiAgfSkudGhlbihzcGVjLnRoaW5nRmlsdGVyKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdGaWx0ZXIgPSB7IGZyb21EZWZpbml0aW9uLCBnZXRGaWx0ZXJlZElkcywgdGhpbmdGaWx0ZXIgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgW1BPU19JRFgsIFBPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMSwgMiwgM107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHJvd3NUb0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHJvd3NUb0l0ZW1zID0gUi5tYXAoUi5zbGljZSgxLCAzKSk7XG5jb25zdCBzb3VyY2UgPSBSLnByb3BPcihcIlwiLCBcInNvdXJjZVwiKTtcbmNvbnN0IHNvdWxGcm9tUGF0aCA9IFIuY3VycnkoKGluZGV4ZXIsIHBhdGgpID0+IGAke0NvbnN0YW50cy5QUkVGSVh9JHtwYXRofUB+JHtpbmRleGVyfS5gKTtcblxuY29uc3QgZ2V0Um93ID0gUi5jdXJyeSgobm9kZSwgaWR4KSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmluc2VydCgwLCBwYXJzZUludChpZHgsIDEwKSksIFIuYWx3YXlzKG51bGwpKSxcbiAgICByb3cgPT4ge1xuICAgICAgcm93WzFdID0gcGFyc2VGbG9hdChyb3dbMV0pO1xuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LFxuICAgIFIubWFwKFIudHJpbSksXG4gICAgUi5zcGxpdChcIixcIiksXG4gICAgUi5wcm9wT3IoXCJcIiwgYCR7aWR4fWApXG4gICkobm9kZSlcbik7XG5cbmNvbnN0IGl0ZW1LZXlzID0gUi5jb21wb3NlKFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICB2YWwgPT4gISEodmFsID09PSAwIHx8IHZhbCksXG4gICAgICBwYXJzZUludFxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCByb3dzID0gbm9kZSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5tYXAoZ2V0Um93KG5vZGUpKSxcbiAgICBpdGVtS2V5c1xuICApKG5vZGUpO1xuXG5jb25zdCBpZHMgPSBSLmNvbXBvc2Uocm93c1RvSWRzLCByb3dzKTtcblxuY29uc3Qgc29ydFJvd3MgPSBSLnNvcnRXaXRoKFtcbiAgUi5hc2NlbmQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5jb25kKFtcbiAgICAgICAgW1IuaXNOaWwsIFIuYWx3YXlzKEluZmluaXR5KV0sXG4gICAgICAgIFtSLlQsIHBhcnNlRmxvYXRdXG4gICAgICBdKSxcbiAgICAgIFIucHJvcChQT1NfVkFMKVxuICAgIClcbiAgKVxuXSk7XG5cbmNvbnN0IHNvcnRlZElkcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIHJvd3Ncbik7XG5cbmNvbnN0IGRpZmYgPSBhc3luYyAoXG4gIG5vZGUsXG4gIHVwZGF0ZWRJdGVtcyA9IFtdLFxuICByZW1vdmVJZHMgPSBbXSxcbiAgeyBtYXhTaXplID0gMTAwMCB9ID0ge31cbikgPT4ge1xuICBjb25zdCByZW1vdmVkID0gUi5pbmRleEJ5KFIuaWRlbnRpdHksIHJlbW92ZUlkcyk7XG4gIGNvbnN0IGJ5SWQgPSB7fTtcbiAgY29uc3QgY2hhbmdlcyA9IHt9O1xuICBjb25zdCByb3dzID0gW107XG4gIGNvbnN0IHVwZGF0ZWQgPSB7fTtcbiAgbGV0IHRvUmVwbGFjZSA9IFtdO1xuICBsZXQgbWF4SWR4ID0gMDtcbiAgbGV0IGtleTtcblxuICBmb3IgKGtleSBpbiBub2RlIHx8IHt9KSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoa2V5LCAxMCk7XG5cbiAgICBpZiAoIShwYXJzZWQgfHwgcGFyc2VkID09PSAwKSkgY29udGludWU7XG4gICAgY29uc3Qgcm93ID0gZ2V0Um93KG5vZGUsIGtleSkgfHwgW3BhcnNlZCwgbnVsbCwgbnVsbF07XG4gICAgY29uc3QgW2lkeCwgaWQgPSBudWxsLCByYXdWYWx1ZSA9IG51bGxdID0gcm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICByb3dbUE9TX1ZBTF0gPSByYXdWYWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBwYXJzZUZsb2F0KHJhd1ZhbHVlKTtcbiAgICBpZiAoaWQgJiYgcmVtb3ZlZFtpZF0pIHJvd1tQT1NfSURdID0gcm93W1BPU19WQUxdID0gbnVsbDtcbiAgICBpZiAoaWQpIGJ5SWRbaWRdID0gcm93O1xuICAgIGlmIChyb3dbUE9TX0lEXSkge1xuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvUmVwbGFjZS5wdXNoKHJvdyk7XG4gICAgfVxuICAgIGlmIChpZHggPiBtYXhJZHgpIG1heElkeCA9IGlkeDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW2lkLCB2YWx1ZV0gPSB1cGRhdGVkSXRlbXNbaV0gfHwgW251bGwsIG51bGxdO1xuXG4gICAgaWYgKCFpZCkgY29udGludWU7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBieUlkW2lkXTtcblxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgaWYgKGV4aXN0aW5nW1BPU19WQUxdICE9PSB2YWx1ZSkge1xuICAgICAgICBleGlzdGluZ1tQT1NfVkFMXSA9IHZhbHVlO1xuICAgICAgICB1cGRhdGVkW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtudWxsLCBpZCwgdmFsdWVdO1xuXG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhbGxTb3J0ZWQgPSBzb3J0Um93cyhyb3dzKTtcbiAgY29uc3Qgc29ydGVkID0gbWF4U2l6ZSA/IGFsbFNvcnRlZC5zbGljZSgwLCBtYXhTaXplKSA6IGFsbFNvcnRlZDtcbiAgY29uc3QgbWlzc2luZyA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UobWF4U2l6ZSwgYWxsU29ydGVkLmxlbmd0aCkgOiBbXTtcbiAgY29uc3QgYWRkZWQgPSBSLmZpbHRlcihyb3cgPT4gcm93W1BPU19JRFhdID09PSBudWxsLCBzb3J0ZWQpO1xuXG4gIHRvUmVwbGFjZSA9IHRvUmVwbGFjZVxuICAgIC5jb25jYXQoUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSAhPT0gbnVsbCwgbWlzc2luZykpXG4gICAgLnJldmVyc2UoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGlkID0gc29ydGVkW2ldW1BPU19JRF07XG4gICAgY29uc3QgaWR4ID0gc29ydGVkW2ldW1BPU19JRFhdO1xuICAgIGNvbnN0IHZhbCA9IHNvcnRlZFtpXVtQT1NfVkFMXTtcblxuICAgIGlmIChpZHggIT09IG51bGwgJiYgdXBkYXRlZFtpZF0pIGNoYW5nZXNbYCR7aWR4fWBdID0gW2lkLCB2YWxdLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgY29uc3QgaW5zZXJ0ZWQgPSBbXTtcblxuICB3aGlsZSAoYWRkZWQubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gYWRkZWQucG9wKCk7XG4gICAgY29uc3QgcmVwbGFjZWQgPSB0b1JlcGxhY2UucG9wKCk7XG4gICAgbGV0IFtpZHhdID0gcmVwbGFjZWQgfHwgW251bGxdO1xuXG4gICAgaWYgKGlkeCA9PT0gbnVsbCkge1xuICAgICAgaWR4ID0gcGFyc2VJbnQobWF4SWR4LCAxMCkgKyBpbnNlcnRlZC5sZW5ndGggKyAxO1xuICAgICAgaW5zZXJ0ZWQucHVzaChpZHgpO1xuICAgIH1cblxuICAgIGNoYW5nZXNbYCR7aWR4fWBdID0gW3Jvd1tQT1NfSURdLCByb3dbUE9TX1ZBTF1dLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgd2hpbGUgKHRvUmVwbGFjZS5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSB0b1JlcGxhY2UucG9wKCk7XG5cbiAgICBpZiAocm93ICYmICFyb3dbUE9TX0lEXSkge1xuICAgICAgY29uc3QgaWR4ID0gYCR7cm93W1BPU19JRFhdfWA7XG5cbiAgICAgIGlmIChub2RlW2lkeF0gIT09IG51bGwpIHtcbiAgICAgICAgY2hhbmdlc1tpZHhdID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJudWxsaW5nXCIsIGlkeCwgbm9kZVtpZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gUi5rZXlzKGNoYW5nZXMpLmxlbmd0aCA/IGNoYW5nZXMgOiBudWxsO1xufTtcblxuY29uc3QgY2F0ZWdvcml6ZURpZmYgPSAoZGlmZiwgb3JpZ2luYWwpID0+IHtcbiAgY29uc3QgYWxsS2V5cyA9IGl0ZW1LZXlzKFIubWVyZ2VMZWZ0KGRpZmYsIG9yaWdpbmFsKSk7XG4gIGNvbnN0IGFkZGVkID0gW107XG4gIGNvbnN0IHJlbW92ZWQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBhbGxLZXlzW2ldO1xuICAgIGNvbnN0IFtfZGlmZklkeCwgZGlmZklkXSA9IGdldFJvdyhkaWZmLCBrZXkpIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgY29uc3QgW19vcmlnSWR4LCBvcmlnSWRdID0gZ2V0Um93KG9yaWdpbmFsLCBrZXkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICBpZiAoZGlmZklkICE9PSBvcmlnSWQpIHtcbiAgICAgIGlmIChkaWZmSWQpIGFkZGVkLnB1c2goZGlmZklkKTtcbiAgICAgIGlmIChvcmlnSWQpIHJlbW92ZWQucHVzaChvcmlnSWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbYWRkZWQsIHJlbW92ZWRdO1xufTtcblxuY29uc3QgdW5pb25Sb3dzID0gUi5jb21wb3NlKFxuICBSLnVuaXFCeShSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLnJlZHVjZShSLmNvbmNhdCwgW10pLFxuICBSLm1hcChyb3dzKVxuKTtcblxuY29uc3Qgcm93c0Zyb21Tb3VscyA9IHF1ZXJ5KChzY29wZSwgc291bHMpID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNvdWwgPT4gc2NvcGUuZ2V0KHNvdWwpKSkudGhlbih1bmlvblJvd3MpXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyIH0gPSBvcHRzIHx8IHt9O1xuXG4gIHJldHVybiByb3dzRnJvbVNvdWxzKHNjb3BlLCBbc291bEZyb21QYXRoKGluZGV4ZXIsIHBhdGgpXSkudGhlbihyb3dzVG9JZHMpO1xufSwgXCJsaXN0aW5nSWRzXCIpO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ05vZGUgPSB7XG4gIFBPU19JRFgsXG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc291cmNlLFxuICBnZXRSb3csXG4gIGl0ZW1LZXlzLFxuICByb3dzLFxuICBpZHMsXG4gIHJvd3NUb0lkcyxcbiAgcm93c1RvSXRlbXMsXG4gIHNvcnRSb3dzLFxuICBzb3J0ZWRJZHMsXG4gIHNvdWxGcm9tUGF0aCxcbiAgcmVhZCxcbiAgZGlmZixcbiAgY2F0ZWdvcml6ZURpZmYsXG4gIHVuaW9uUm93c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IHVwZGF0ZUxpc3RpbmcgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHNjb3BlLFxuICBzcGVjLFxuICBpZHMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW11cbikgPT4ge1xuICBpZiAoIWlkcy5sZW5ndGggJiYgIXJlbW92ZUlkcy5sZW5ndGgpIHJldHVybjtcbiAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IGF3YWl0IExpc3RpbmdTb3J0LnRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYyk7XG4gIGNvbnN0IGNoYW5nZXMgPSBMaXN0aW5nTm9kZS5kaWZmKGV4aXN0aW5nLCB1cGRhdGVkSXRlbXMsIHJlbW92ZUlkcyk7XG5cbiAgaWYgKGNoYW5nZXMpIGNvbnNvbGUubG9nKFwiQ0hBTkdFU1wiLCByb3V0ZS5zb3VsLCBjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXMpIHJvdXRlLndyaXRlKGNoYW5nZXMpO1xufTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyBzb3J0LCB1cGRhdGVkU291bCwgZGlmZiB9KSA9PiB7XG4gIGxldCB1cGRhdGVkSWRzID0gW107XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGlzU3RpY2t5ID0gUi5lcXVhbHMocm91dGUubWF0Y2gudGhpbmdJZCB8fCBudWxsKTtcblxuICBpZiAodGhpbmdJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICB1cGRhdGVkSWRzID0gUi5jb25jYXQodXBkYXRlZElkcywgVGhpbmdTZXQuaWRzKEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpKSk7XG4gIGF3YWl0IHVwZGF0ZUxpc3Rpbmcob3JjLCByb3V0ZSwgc2NvcGUsIHNvcnQsIHVwZGF0ZWRJZHMsIFtdLCBpc1N0aWNreSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nT3JhY2xlID0ge1xuICB1cGRhdGVMaXN0aW5nLFxuICBvblB1dFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IGZyb21TcGVjID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzKSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHBhdGhzID0gUi5wYXRoT3IoW10sIFtcImRhdGFTb3VyY2VcIiwgXCJsaXN0aW5nUGF0aHNcIl0sIHNwZWMpO1xuICBjb25zdCBzb3VscyA9IFIubWFwKFxuICAgIExpc3RpbmdOb2RlLnNvdWxGcm9tUGF0aChvcHRzLmluZGV4ZXIgfHwgc3BlYy5pbmRleGVyKSxcbiAgICBwYXRoc1xuICApO1xuXG4gIHJldHVybiBMaXN0aW5nTm9kZS5nZXRSb3dzRnJvbVNvdWxzKHNjb3BlLCBzb3VscykudGhlbihyb3dzID0+XG4gICAgTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZElkcyhzY29wZSwgcm93cywgeyAuLi5vcHRzLCBmaWx0ZXJGbiB9KVxuICApO1xufSk7XG5cbmNvbnN0IGZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBMaXN0aW5nVHlwZS5mcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUpIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICByZXR1cm4gdHlwZS5nZXRTcGVjKHNjb3BlLCBwYXRoKS50aGVuKHNwZWMgPT4ge1xuICAgIGlmIChzcGVjLmhhc0luZGV4ZXIgJiYgIW9wdHMuY2FsY3VsYXRlKSB7XG4gICAgICBpZiAoIXR5cGUgfHwgIXR5cGUucmVhZCkgcmV0dXJuIExpc3RpbmdOb2RlLnJlYWQoc2NvcGUsIHBhdGgsIG9wdHMpO1xuICAgICAgcmV0dXJuIHR5cGUucmVhZChzY29wZSwgdHlwZS5tYXRjaCwgb3B0cyk7XG4gICAgfVxuICAgIHJldHVybiBmcm9tU3BlYyhzY29wZSwgc3BlYywgb3B0cyk7XG4gIH0pO1xufSk7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nUXVlcnkgPSB7IGZyb21TcGVjLCBmcm9tUGF0aCB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcblxuY29uc3QgW1BPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMV07XG5jb25zdCB0b0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHNvcnRJdGVtcyA9IFIuc29ydFdpdGgoUi5wcm9wKFBPU19WQUwpKTtcblxuY29uc3Qgdm90ZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+IHtcbiAgaWYgKHNwZWMuaXNJZFN0aWNreSh0aGluZ0lkKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcbiAgaWYgKFIuY29udGFpbnModGhpbmdJZCwgc3BlYy5maWx0ZXJzLmFsbG93Lm9wcykpIHJldHVybiByZXNvbHZlKC1JbmZpbml0eSk7XG5cbiAgcmV0dXJuIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgc2NvcmVzOiB0cnVlLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pXG4gIH0pLnRoZW4ocmVzID0+IGZuKHJlcywgc3BlYykpO1xufSk7XG5cbmNvbnN0IHRpbWVTb3J0ID0gZm4gPT4gcXVlcnkoKHNjb3BlLCB0aGluZ0lkLCBzcGVjKSA9PlxuICBRdWVyeS50aGluZ01ldGEoc2NvcGUsIHtcbiAgICB0YWJ1bGF0b3I6IHNwZWMudGFidWxhdG9yLFxuICAgIHRoaW5nU291bDogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pXG4gIH0pLnRoZW4oZm4pXG4pO1xuXG5jb25zdCBzb3J0cyA9IHtcbiAgbmV3OiB0aW1lU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm11bHRpcGx5KC0xKSxcbiAgICAgIHZhbCA9PiB2YWwgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICBSLnByb3AoXCJ0aW1lc3RhbXBcIilcbiAgICApXG4gICksXG4gIG9sZDogdGltZVNvcnQoUi5wcm9wKFwidGltZXN0YW1wXCIpKSxcbiAgYWN0aXZlOiB2b3RlU29ydChcbiAgICAoeyB0aW1lc3RhbXAsIGxhc3RBY3RpdmUgfSkgPT4gLTEgKiAobGFzdEFjdGl2ZSB8fCB0aW1lc3RhbXApXG4gICksXG4gIHRvcDogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlSW50KHgsIDEwKSxcbiAgICAgIFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0pXG4gICAgKVxuICApLFxuICBjb21tZW50czogdm90ZVNvcnQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgeCA9PiAtMSAqIHBhcnNlRmxvYXQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdKVxuICAgIClcbiAgKSxcbiAgZGlzY3Vzc2VkOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiY29tbWVudFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcblxuICAgIGlmICghc2NvcmUpIHJldHVybiAxMDAwMDAwMDAwIC0gc2Vjb25kcztcbiAgICByZXR1cm4gLTEgKiAob3JkZXIgKyBzZWNvbmRzIC8gNDUwMDApO1xuICB9KSxcbiAgaG90OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gUi5wcm9wKFwidGltZXN0YW1wXCIsIHRoaW5nKTtcbiAgICBjb25zdCBzY29yZSA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwic2NvcmVcIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0aW1lc3RhbXAgLyAxMDAwIC0gMTEzNDAyODAwMztcbiAgICBjb25zdCBvcmRlciA9IE1hdGgubG9nMTAoTWF0aC5tYXgoTWF0aC5hYnMoc2NvcmUpLCAxKSk7XG4gICAgbGV0IHNpZ24gPSAwO1xuXG4gICAgaWYgKHNjb3JlID4gMCkge1xuICAgICAgc2lnbiA9IDE7XG4gICAgfSBlbHNlIGlmIChzY29yZSA8IDApIHtcbiAgICAgIHNpZ24gPSAtMTtcbiAgICB9XG4gICAgcmV0dXJuIC0xICogKHNpZ24gKiBvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBiZXN0OiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuICAgIGNvbnN0IG4gPSB1cHMgKyBkb3ducztcblxuICAgIGlmIChuID09PSAwKSByZXR1cm4gMDtcbiAgICBjb25zdCB6ID0gMS4yODE1NTE1NjU1NDU7IC8vIDgwJSBjb25maWRlbmNlXG4gICAgY29uc3QgcCA9IHVwcyAvIG47XG4gICAgY29uc3QgbGVmdCA9IHAgKyAoMSAvICgyICogbikpICogeiAqIHo7XG4gICAgY29uc3QgcmlnaHQgPSB6ICogTWF0aC5zcXJ0KChwICogKDEgLSBwKSkgLyBuICsgKHogKiB6KSAvICg0ICogbiAqIG4pKTtcbiAgICBjb25zdCB1bmRlciA9IDEgKyAoMSAvIG4pICogeiAqIHo7XG5cbiAgICByZXR1cm4gLTEgKiAoKGxlZnQgLSByaWdodCkgLyB1bmRlcik7XG4gIH0pLFxuICBjb250cm92ZXJzaWFsOiB2b3RlU29ydCh0aGluZyA9PiB7XG4gICAgY29uc3QgdXBzID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJ1cFwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgZG93bnMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImRvd25cIl0sIHRoaW5nKSwgMTApO1xuXG4gICAgaWYgKHVwcyA8PSAwIHx8IGRvd25zIDw9IDApIHJldHVybiAwO1xuICAgIGNvbnN0IG1hZ25pdHVkZSA9IHVwcyArIGRvd25zO1xuICAgIGNvbnN0IGJhbGFuY2UgPSB1cHMgPiBkb3ducyA/IGRvd25zIC8gdXBzIDogdXBzIC8gZG93bnM7XG5cbiAgICByZXR1cm4gLTEgKiBtYWduaXR1ZGUgKiogYmFsYW5jZTtcbiAgfSlcbn07XG5cbmNvbnN0IHRvSXRlbSA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkLCBzcGVjKSA9PlxuICAgIChzb3J0c1tzcGVjLnNvcnRdIHx8IHNvcnRzLm5ldykoaWQsIHNwZWMpLnRoZW4odmFsID0+IFtpZCwgdmFsXSlcbik7XG5cbmNvbnN0IHRvSXRlbXMgPSBxdWVyeShcbiAgKHNjb3BlLCBpZHMsIHNwZWMpID0+IGFsbChSLm1hcChcbiAgICBpZCA9PiB0b0l0ZW0oc2NvcGUsIGlkLCBzcGVjKSxcbiAgICBpZHNcbiAgKSlcbik7XG5cbmNvbnN0IGZyb21UaGluZ1NldHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3Vscywgc3BlYykgPT5cbiAgICBhbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgICAudGhlbihSLnBpcGUoXG4gICAgICAgIFRoaW5nU2V0LnVuaW9uLFxuICAgICAgICBUaGluZ1NldC5pZHMsXG4gICAgICAgIGlkcyA9PiB0b0l0ZW1zKHNjb3BlLCBpZHMsIHNwZWMpXG4gICAgICApKVxuICAgICAgLnRoZW4oc29ydEl0ZW1zKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTb3J0ID0ge1xuICBQT1NfSUQsXG4gIFBPU19WQUwsXG4gIHNvcnRzLFxuICB0b0l0ZW0sXG4gIHRvSXRlbXMsXG4gIHRvSWRzLFxuICBzb3J0SXRlbXMsXG4gIGZyb21UaGluZ1NldHNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IFIuY29tcG9zZShcbiAgUi5hcHBseShSLm1lcmdlTGVmdCksXG4gIFIuYXAoW0xpc3RpbmdGaWx0ZXIuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgUi5hcHBseShSLmFzc29jKFwiZGF0YVNvdXJjZVwiKSksXG4gIFIuYXAoW0xpc3RpbmdEYXRhU291cmNlLmZyb21EZWZpbml0aW9uLCBSLmlkZW50aXR5XSksXG4gIFIub2YsXG4gIExpc3RpbmdEZWZpbml0aW9uLmZyb21Tb3VyY2Vcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhID0gXCJcIikgPT5cbiAgUXVlcnkuZ2V0V2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lKVxuICAgIC50aGVuKFIuY29tcG9zZShcbiAgICAgIGJvZHkgPT4gYCR7Ym9keX1cbiMgYWRkZWQgYnkgaW5kZXhlclxuJHtleHRyYSB8fCBcIlwifVxuc291cmNlZCBmcm9tIHBhZ2UgJHthdXRob3JJZH0gJHtuYW1lfVxuYCxcbiAgICAgIExpc3RpbmdOb2RlLmJvZHlcbiAgICApKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTcGVjID0geyBmcm9tU291cmNlLCBnZXRTb3VyY2UgfTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIHsgdGhpbmdJZCwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmNvbW1lbnRzXCIsXG4gICAgW2BvcCAke3RoaW5nSWR9YCwgYHNvcnQgJHtzb3J0fWBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTcGVjIH0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvZG9tYWluLzpkb21haW4vOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgZG9tYWluLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgZG9tYWlucyA9IFBhdGguc3BsaXRUb3BpY3MoZG9tYWluKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpkb21haW5cIixcbiAgICBbXG4gICAgICBgbmFtZSAke2RvbWFpbnNbMF19YCxcbiAgICAgIFwic3VibWl0IHRvIHdoYXRldmVyXCIsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIFwia2luZCBzdWJtaXNzaW9uXCIsXG4gICAgICAuLi5SLm1hcChkb21haW4gPT4gYGRvbWFpbiAke2RvbWFpbn1gLCBkb21haW5zKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvZG9tYWluLyR7ZG9tYWlufS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRG9tYWluTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgdGFicywgZ2V0U291cmNlLCBnZXRTcGVjIH0pO1xuIiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uLy4uL1RoaW5nXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9yZXBsaWVkLzp0eXBlLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgdHlwZSwgc29ydCA9IFwibmV3XCIgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzppbmJveFwiLFxuICAgIFtgcmVwbGllcyB0byBhdXRob3IgJHthdXRob3JJZH1gLCBgdHlwZSAke3R5cGV9YCwgYHNvcnQgJHtzb3J0fWBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmNvbnN0IG9uUHV0ID0gYXN5bmMgKFxuICBvcmMsXG4gIHJvdXRlLFxuICB7IHVwZGF0ZWRTb3VsLCBkaWZmIH1cbikgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZEF1dGhvcmVkXSA9IExpc3RpbmdOb2RlLmNhdGVnb3JpemVEaWZmKGRpZmZEYXRhKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgbGV0IHVwZGF0ZWRJZHMgPSBUaGluZ1NldC5pZHMoZGlmZkRhdGEpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZEF1dGhvcmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgb3BJZCA9IHVwZGF0ZWRBdXRob3JlZFtpXTtcbiAgICBjb25zdCByZXBseUlkcyA9IFRoaW5nU2V0LmlkcyhcbiAgICAgIGF3YWl0IHNjb3BlLmdldChTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3BJZCB9KSkudGhlbigpXG4gICAgKTtcblxuICAgIHVwZGF0ZWRJZHMgPSB1cGRhdGVkSWRzLmNvbmNhdChyZXBseUlkcyk7XG4gIH1cblxuICBpZiAodXBkYXRlZElkcy5sZW5ndGgpXG4gICAgYXdhaXQgTGlzdGluZ09yYWNsZS51cGRhdGVMaXN0aW5nKG9yYywgcm91dGUsIHNjb3BlLCBzcGVjLCB1cGRhdGVkSWRzLCBbXSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBJbmJveExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIGdldFNvdXJjZSwgZ2V0U3BlYywgb25QdXQgfSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC86dHlwZS86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcIm92ZXJ2aWV3XCIsIFwiY29tbWVudHNcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tYW5kc1wiXTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCB0eXBlLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6cHJvZmlsZVwiLFxuICAgIFtcbiAgICAgIGBhdXRob3IgJHthdXRob3JJZH1gLFxuICAgICAgYHR5cGUgJHt0eXBlfWAsXG4gICAgICBcInN1Ym1pdCB0byB3aGF0ZXZlclwiLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3VzZXIvJHthdXRob3JJZH0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBQcm9maWxlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgdGFicywgZ2V0U291cmNlLCBnZXRTcGVjIH0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IGFsbCwgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi4vTGlzdGluZ0ZpbHRlclwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuaW1wb3J0IHsgU3BhY2VTcGVjIH0gZnJvbSBcIi4uL1NwYWNlU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvc3BhY2VzLzpuYW1lLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBTcGFjZVNwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgYHNvcnQgJHtzb3J0fWApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihzb3VyY2UgPT5cbiAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlKHNvdXJjZSwgbWF0Y2guYXV0aG9ySWQsIG1hdGNoLm5hbWUpXG4gIClcbik7XG5cbmNvbnN0IGNhbGN1bGF0ZSA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gsIG9wdHMpID0+IHtcbiAgY29uc3QgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9ID0gbWF0Y2g7XG4gIGNvbnN0IHJvdXRlUHJvcHMgPSB7IGF1dGhvcklkLCBuYW1lLCBzb3J0LCBpbmRleGVyOiBDb25maWcuaW5kZXhlciB9O1xuICBjb25zdCBzb3VscyA9IFtTY2hlbWEuU3BhY2VMaXN0aW5nLnJvdXRlLnJldmVyc2Uocm91dGVQcm9wcyldO1xuXG4gIHJldHVybiBhbGwoW1xuICAgIGdldFNwZWMoc2NvcGUsIG1hdGNoKSxcbiAgICBMaXN0aW5nTm9kZS5nZXRSb3dzRnJvbVNvdWxzKHNjb3BlLCBzb3VscylcbiAgXSkudGhlbigoW3NwZWMsIHJvd3NdKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcblxuICAgIHJldHVybiBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCByb3dzLCB7IC4uLm9wdHMsIGZpbHRlckZuIH0pO1xuICB9KTtcbn0pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiwgb3JpZ2luYWwsIGxhdGVzdCA9IDAgfVxuKSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG5cbiAgY29uc3Qgb3JpZ2luYWxEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEob3JpZ2luYWwpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZElkcywgcmVtb3ZlZElkc10gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihcbiAgICBkaWZmRGF0YSxcbiAgICBvcmlnaW5hbERhdGFcbiAgKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgY29uc3Qgdm90ZUNvdW50c01hdGNoID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG4gIGNvbnN0IHRoaW5nTWF0Y2ggPSBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUubWF0Y2godXBkYXRlZFNvdWwpIHx8IHt9O1xuICBjb25zdCBhdXRob3JNYXRjaCA9IFNjaGVtYS5TRUFBdXRob3Iucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuXG4gIGlmICh2b3RlQ291bnRzTWF0Y2gpIHVwZGF0ZWRJZHMucHVzaCh2b3RlQ291bnRzTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ01hdGNoKSB1cGRhdGVkSWRzLnB1c2godGhpbmdNYXRjaC50aGluZ0lkKTtcbiAgaWYgKHRoaW5nSWQgJiYgdGhpbmdJZCAhPT0gc3BlYy5mcm9tUGFnZUlkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhcbiAgICBvcmMsXG4gICAgcm91dGUsXG4gICAgc2NvcGUsXG4gICAgc3BlYyxcbiAgICB1cGRhdGVkSWRzLFxuICAgIHJlbW92ZWRJZHMsXG4gICk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbiAgaWYgKFxuICAgIFIucHJvcChcInNpemVcIiwgb3JpZ2luYWwpIHx8XG4gICAgdXBkYXRlZElkcy5sZW5ndGggfHxcbiAgICByZW1vdmVkSWRzLmxlbmd0aCB8fFxuICAgIGF1dGhvck1hdGNoXG4gIClcbiAgICByZXR1cm47XG5cbiAgLy8gYmFzZSBsb2dpYyBmcm9tIGd1bi1jbGVyaWMtc2NvcGUgbmVlZHMgdG8gYmUgZW5jYXBzdWFsdGVkIGJldHRlcj9cbiAgY29uc29sZS5sb2coXCItLS1TVEFOREFSRCBTUEFDRSBVUERBVEUtLS1cIiwgcm91dGUuc291bCwgdXBkYXRlZFNvdWwpO1xuICBjb25zdCBub2RlID0gYXdhaXQgb3JjLm5ld1Njb3BlKCkuZ2V0KHJvdXRlLnNvdWwpO1xuICBjb25zdCBleGlzdGluZ0tleXMgPSBMaXN0aW5nTm9kZS5pdGVtS2V5cyhub2RlKTtcblxuICBpZiAoZXhpc3RpbmdLZXlzLmxlbmd0aCkge1xuICAgIHJvdXRlLndyaXRlKHtcbiAgICAgIHNpemU6IDAsXG4gICAgICAuLi5leGlzdGluZ0tleXMucmVkdWNlKChkaWZmLCBrZXkpID0+IHtcbiAgICAgICAgZGlmZltgJHtrZXl9YF0gPSBudWxsO1xuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgIH0sIHt9KVxuICAgIH0pO1xuICB9XG5cbiAgb3JjLndvcmsoe1xuICAgIGlkOiBgdXBkYXRlOiR7cm91dGUuc291bH1gLFxuICAgIHNvdWw6IHJvdXRlLnNvdWwsXG4gICAgbWV0aG9kOiBcImRvVXBkYXRlXCIsXG4gICAgcHJpb3JpdHk6IHJvdXRlLnByaW9yaXR5IHx8IDUwXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgY2FsY3VsYXRlLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiLCBcImZpcmVob3NlXCJdO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgdG9waWMsIHNvcnQgfSkgPT4ge1xuICBjb25zdCB0b3BpY3MgPSBQYXRoLnNwbGl0VG9waWNzKHRvcGljKTtcbiAgY29uc3Qgc3VibWl0VG8gPSB0b3BpY3NbMF0gPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiB0b3BpY3NbMF07XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6dG9waWNcIixcbiAgICBbXG4gICAgICBgbmFtZSAke3RvcGljfWAsXG4gICAgICBgc3VibWl0IHRvICR7c3VibWl0VG99YCxcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgdG9waWMuaW5kZXhPZihcIjpcIikgPT09IC0xID8gXCJraW5kIHN1Ym1pc3Npb25cIiA6IFwiXCIsXG4gICAgICAuLi5SLm1hcCh0b3BpYyA9PiBgdG9waWMgJHt0b3BpY31gLCB0b3BpY3MpLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC90LyR7dG9waWN9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gICk7XG59KTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oTGlzdGluZ1NwZWMuZnJvbVNvdXJjZSlcbik7XG5cbmV4cG9ydCBjb25zdCBUb3BpY0xpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcbmltcG9ydCB7IERvbWFpbkxpc3RpbmcgfSBmcm9tIFwiLi9Eb21haW5MaXN0aW5nXCI7XG5pbXBvcnQgeyBDb21tZW50TGlzdGluZyB9IGZyb20gXCIuL0NvbW1lbnRMaXN0aW5nXCI7XG5pbXBvcnQgeyBTcGFjZUxpc3RpbmcgfSBmcm9tIFwiLi9TcGFjZUxpc3RpbmdcIjtcbmltcG9ydCB7IEluYm94TGlzdGluZyB9IGZyb20gXCIuL0luYm94TGlzdGluZ1wiO1xuaW1wb3J0IHsgUHJvZmlsZUxpc3RpbmcgfSBmcm9tIFwiLi9Qcm9maWxlTGlzdGluZ1wiO1xuXG5jb25zdCB0eXBlcyA9IFtcbiAgVG9waWNMaXN0aW5nLFxuICBEb21haW5MaXN0aW5nLFxuICBDb21tZW50TGlzdGluZyxcbiAgU3BhY2VMaXN0aW5nLFxuICBJbmJveExpc3RpbmcsXG4gIFByb2ZpbGVMaXN0aW5nXG5dO1xuXG5jb25zdCBmcm9tUGF0aCA9IHBhdGggPT4ge1xuICBsZXQgbWF0Y2g7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgIG1hdGNoID0gdHlwZXNbaV0ucm91dGUubWF0Y2gocGF0aCk7XG4gICAgaWYgKG1hdGNoKSByZXR1cm4gUi5hc3NvYyhcIm1hdGNoXCIsIG1hdGNoLCB0eXBlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1R5cGUgPSB7IC4uLnR5cGVzLCB0eXBlcywgZnJvbVBhdGggfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuXG5jb25zdCBzcGxpdERvbWFpbnMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIitcIiksXG4gIFIudG9Mb3dlcixcbiAgUi50cmltLFxuICBSLmRlZmF1bHRUbyhcIlwiKVxuKTtcblxuY29uc3Qgc3BsaXRUb3BpY3MgPSBSLmNvbXBvc2UoXG4gIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoW1wiYWxsXCJdKSksXG4gIHNwbGl0RG9tYWluc1xuKTtcblxuY29uc3Qgd2l0aFJvdXRlID0gb2JqID0+IFIuYXNzb2MoXCJyb3V0ZVwiLCBuZXcgUm91dGUob2JqLnBhdGgpLCBvYmopO1xuXG5leHBvcnQgY29uc3QgUGF0aCA9IHsgc3BsaXREb21haW5zLCBzcGxpdFRvcGljcywgd2l0aFJvdXRlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuY29uc3Qgc3BhY2VDb25maWdQYWdlTmFtZSA9IG5hbWUgPT4gYHNwYWNlOiR7bmFtZX1gO1xuXG5jb25zdCBzb3VyY2VXaXRoRGVmYXVsdHMgPSBSLmN1cnJ5KChvd25lcklkLCBuYW1lLCBzb3VyY2UpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtzb3VyY2UgfHwgXCJcIl07XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuXG4gIGlmICghdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpKSB7XG4gICAgdGFicy5tYXAodGFiID0+XG4gICAgICByZXN1bHQucHVzaChgdGFiICR7dGFifSAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke25hbWV9LyR7dGFifWApXG4gICAgKTtcbiAgfVxuXG4gIGxldCBpbmRleGVyID0gdG9rZW5pemVkLmdldFZhbHVlKFwiaW5kZXhlclwiKTtcblxuICBpZiAoIWluZGV4ZXIpIHtcbiAgICByZXN1bHQucHVzaChgaW5kZXhlciAke0NvbmZpZy5pbmRleGVyfWApO1xuICAgIGluZGV4ZXIgPSBDb25maWcuaW5kZXhlcjtcbiAgfVxuXG4gIGxldCB0YWJ1bGF0b3IgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIik7XG5cbiAgaWYgKCF0YWJ1bGF0b3IpIHJlc3VsdC5wdXNoKGB0YWJ1bGF0b3IgJHtpbmRleGVyfWApO1xuXG4gIHJldHVybiByZXN1bHQuam9pbihcIlxcblwiKTtcbn0pO1xuXG5jb25zdCBnZXRDb25maWcgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBzcGFjZUNvbmZpZ1BhZ2VOYW1lKG5hbWUpKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgZ2V0Q29uZmlnLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgc291cmNlV2l0aERlZmF1bHRzKGF1dGhvcklkLCBuYW1lKSxcbiAgICAgIFRoaW5nRGF0YU5vZGUuYm9keVxuICAgIClcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlU3BlYyA9IHsgdGFicywgZ2V0U291cmNlIH07XG4iLCJpbXBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmV4cG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmV4cG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmV4cG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5leHBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5leHBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4vTGlzdGluZ09yYWNsZVwiO1xuZXhwb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5leHBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5leHBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5leHBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5leHBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi9TcGFjZVNwZWNcIjtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmcgPSB7XG4gIGZyb21TcGVjOiBMaXN0aW5nUXVlcnkuZnJvbVNwZWMsXG4gIGZyb21QYXRoOiBMaXN0aW5nUXVlcnkuZnJvbVBhdGhcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gXCIuL1ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSBcIi4vQXV0aGVudGljYXRpb25cIjtcblxuZnVuY3Rpb24gaW5pdChHdW4sIGNvbmZpZyA9IHt9KSB7XG4gIGNvbnN0IHsgbGVlY2gsIGRpc2FibGVWYWxpZGF0aW9uLCBub0d1biwgbG9jYWxTdG9yYWdlLCBwZXJzaXN0LCAuLi5yZXN0IH0gPVxuICAgIGNvbmZpZyB8fCB7fTtcbiAgY29uc3QgcGVlciA9IHsgY29uZmlnIH07XG5cbiAgaWYgKCFub0d1bikge1xuICAgIGNvbnN0IGNmZyA9IHsgbG9jYWxTdG9yYWdlOiAhIWxvY2FsU3RvcmFnZSwgcmFkaXNrOiAhIXBlcnNpc3QsIC4uLnJlc3QgfTtcblxuICAgIGlmIChwZXJzaXN0KSBjZmcubG9jYWxTdG9yYWdlID0gZmFsc2U7XG4gICAgaWYgKCFkaXNhYmxlVmFsaWRhdGlvbikgR3VuLm9uKFwib3B0XCIsIFZhbGlkYXRpb24uZ3VuV2lyZUlucHV0KHBlZXIpKTtcbiAgICBpZiAoY2ZnLnN0b3JlRm4pIGNmZy5zdG9yZSA9IGNmZy5zdG9yZUZuKGNmZyk7IC8vIGZvciBpbmRleGVkZGJcbiAgICBwZWVyLmd1biA9IEd1bihjZmcpO1xuICAgIGlmIChjZmcubG9jYWxTdG9yYWdlKSBwZWVyLmd1bi5vbihcImxvY2FsU3RvcmFnZTplcnJvclwiLCBhID0+IGEucmV0cnkoe30pKTtcbiAgICBpZiAobGVlY2gpIHtcbiAgICAgIGNvbnN0IHNlbmRMZWVjaCA9ICgpID0+IHBlZXIuZ3VuLl8ub24oXCJvdXRcIiwgeyBsZWVjaDogdHJ1ZSB9KTtcblxuICAgICAgc2VuZExlZWNoKCk7XG4gICAgfVxuICB9XG5cbiAgcGVlci5uZXdTY29wZSA9IFF1ZXJ5LmNyZWF0ZVNjb3BlKHBlZXIpO1xuICBwZWVyLm9uTG9naW4gPSBBdXRoZW50aWNhdGlvbi5vbkxvZ2luKHBlZXIpO1xuICBwZWVyLnNpZ251cCA9IEF1dGhlbnRpY2F0aW9uLnNpZ251cChwZWVyKTtcbiAgcGVlci5sb2dpbiA9IEF1dGhlbnRpY2F0aW9uLmxvZ2luKHBlZXIpO1xuICBwZWVyLmxvZ291dCA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmxvZ291dChwZWVyKTtcbiAgcGVlci5pc0xvZ2dlZEluID0gKCkgPT4gQXV0aGVudGljYXRpb24uaXNMb2dnZWRJbihwZWVyKTtcbiAgcGVlci5zdWJtaXQgPSBUaGluZy5zdWJtaXQocGVlcik7XG4gIHBlZXIuY29tbWVudCA9IFRoaW5nLmNvbW1lbnQocGVlcik7XG4gIHBlZXIuY2hhdCA9IFRoaW5nLmNoYXQocGVlcik7XG4gIHBlZXIud3JpdGVQYWdlID0gVGhpbmcud3JpdGVQYWdlKHBlZXIpO1xuICBwZWVyLnZvdGUgPSBUaGluZy52b3RlKHBlZXIpO1xuICBwZWVyLnF1ZXJpZXMgPSBRdWVyeTtcbiAgcmV0dXJuIHBlZXI7XG59XG5cbmV4cG9ydCBjb25zdCBQZWVyID0ge1xuICBpbml0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHNjb3BlIGFzIG1ha2VTY29wZSwgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmcvTGlzdGluZ05vZGVcIjtcblxuY29uc3QgZW1wdHlQcm9taXNlID0gcmVzb2x2ZShudWxsKTtcbmNvbnN0IHVuaW9uQXJyYXlzID0gUi5yZWR1Y2UoUi51bmlvbiwgW10pO1xuXG5jb25zdCB0b3BpY1NvdWxzID0gcGFyYW1zID0+IHtcbiAgY29uc3QgeyB0b3BpY3MgPSBbXCJhbGxcIl0gfSA9IHBhcmFtcyB8fCB7fTtcbiAgY29uc3QgZGF5cyA9IFIucHJvcE9yKDM2NSwgXCJkYXlzXCIsIHBhcmFtcykgfHwgMzY1O1xuICBjb25zdCBkYXlTdHJpbmdzID0gW107XG4gIGNvbnN0IG9uZURheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBvbmVEYXkgKiBwYXJzZUludChkYXlzLCAxMCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZGF5cyArIDE7IGkrKylcbiAgICBkYXlTdHJpbmdzLnB1c2goVGhpbmdTZXQuZGF5U3RyKHN0YXJ0ICsgaSAqIG9uZURheSkpO1xuICByZXR1cm4gT2JqZWN0LmtleXMoXG4gICAgdG9waWNzLnJlZHVjZShcbiAgICAgIChyZXN1bHQsIHRvcGljTmFtZSkgPT5cbiAgICAgICAgZGF5U3RyaW5ncy5yZWR1Y2UoKHJlcywgZHMpID0+IHtcbiAgICAgICAgICByZXNbYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLyR7dG9waWNOYW1lfS9kYXlzLyR7ZHN9YF0gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sIHJlc3VsdCksXG4gICAgICB7fVxuICAgIClcbiAgKTtcbn07XG5cbmNvbnN0IHNpbmdsZVRvcGljID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgdFNvdWxzID0gdG9waWNTb3Vscyh7IC4uLnBhcmFtcywgdG9waWNzOiBbcGFyYW1zLnRvcGljXSB9KTtcbiAgbGV0IHNvdWxzID0gW107XG4gIGxldCBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcblxuICBpZiAocGFyYW1zLnNvcnQgPT09IFwibmV3XCIpIHtcbiAgICBpdGVtTWF4ID0gQ29uc3RhbnRzLkxJU1RJTkdfU0laRTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1zLnNvcnQgPT09IFwidG9wXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgICBpZiAocGFyYW1zLnRvcGljID09PSBcImFsbFwiKSBpdGVtTWF4ID0gaXRlbU1heCAqIDM7XG4gIH1cblxuICBjb25zdCBmZXRjaE1vcmUgPSAoKSA9PiB7XG4gICAgY29uc3QgdG9waWNTb3VsID0gdFNvdWxzLnBvcCgpO1xuXG4gICAgaWYgKHNvdWxzLmxlbmd0aCA+IGl0ZW1NYXggfHwgIXRvcGljU291bCkgcmV0dXJuIHJlc29sdmUoc291bHMpO1xuICAgIHJldHVybiBzY29wZVxuICAgICAgLmdldCh0b3BpY1NvdWwpXG4gICAgICAuc291bHMoKVxuICAgICAgLnRoZW4obW9yZSA9PiB7XG4gICAgICAgIHNvdWxzID0gWy4uLnNvdWxzLCAuLi5tb3JlXTtcbiAgICAgICAgcmV0dXJuIGZldGNoTW9yZSgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZldGNoTW9yZSgpO1xufSk7XG5cbmNvbnN0IHNpbmdsZURvbWFpbiA9IHF1ZXJ5KChzY29wZSwgeyBkb21haW4gfSkgPT5cbiAgc2NvcGUuZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWU6IGRvbWFpbiB9KSkuc291bHMoKVxuKTtcblxuY29uc3Qgc2luZ2xlQXV0aG9yID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIGFsbChbXG4gICAgcGFyYW1zLnR5cGUgJiYgcGFyYW1zLnR5cGUgIT09IFwic3VibWl0dGVkXCIgJiYgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIlxuICAgICAgPyByZXNvbHZlKFtdKVxuICAgICAgOiBzY29wZVxuICAgICAgICAgIC5nZXQocGFyYW1zLmF1dGhvcklkKVxuICAgICAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgICAgIC5zb3VscygpLFxuICAgIHBhcmFtcy50eXBlICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwiY29tbWVudHNcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcIm92ZXJ2aWV3XCIgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tYW5kc1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChwYXJhbXMuYXV0aG9ySWQpXG4gICAgICAgICAgLmdldChcImNvbW1lbnRzXCIpXG4gICAgICAgICAgLnNvdWxzKClcbiAgXSkudGhlbigoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pID0+IHVuaW9uQXJyYXlzKFtzdWJtaXNzaW9ucywgY29tbWVudHNdKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdJZHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3VsKSA9PiBzY29wZS5nZXQoc291bCkudGhlbihMaXN0aW5nTm9kZS5zb3J0ZWRJZHMpLFxuICBcImxpc3RpbmdJZHNcIlxuKTtcblxuY29uc3Qgc2luZ2xlTGlzdGluZyA9IHF1ZXJ5KChzY29wZSwgeyBsaXN0aW5nLCBzb3J0LCBpbmRleGVyIH0pID0+XG4gIGxpc3RpbmdJZHMoc2NvcGUsIGAke0NvbnN0YW50cy5QUkVGSVh9JHtsaXN0aW5nfS8ke3NvcnR9QH4ke2luZGV4ZXJ9LmApLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLFxuICAgICAgUi5maWx0ZXIoUi5pZGVudGl0eSlcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IHJlcGxpZXNUb0F1dGhvciA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgcmVwbGllc1RvQXV0aG9ySWQsIHR5cGUgPSBcIm92ZXJ2aWV3XCIsIC4uLnBhcmFtcyB9KSA9PlxuICAgIHNpbmdsZUxpc3Rpbmcoc2NvcGUsIHtcbiAgICAgIGxpc3Rpbmc6IGAvdXNlci8ke3JlcGxpZXNUb0F1dGhvcklkfS8ke3R5cGV9YCxcbiAgICAgIHNvcnQ6IFwibmV3XCIsXG4gICAgICAuLi5wYXJhbXNcbiAgICB9KS50aGVuKGF1dGhvcmVkU291bHMgPT5cbiAgICAgIGFsbChcbiAgICAgICAgYXV0aG9yZWRTb3Vscy5tYXAoYXV0aG9yZWRTb3VsID0+XG4gICAgICAgICAgc2NvcGUuZ2V0KGAke2F1dGhvcmVkU291bH0vY29tbWVudHNgKS5zb3VscygpXG4gICAgICAgIClcbiAgICAgICkudGhlbih1bmlvbkFycmF5cylcbiAgICApXG4pO1xuXG5jb25zdCBzaW5nbGVTdWJtaXNzaW9uID0gcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+XG4gIHNjb3BlXG4gICAgLmdldChcbiAgICAgIFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBwYXJhbXMuc3VibWlzc2lvbklkIH0pXG4gICAgKVxuICAgIC5zb3VscyhcbiAgICAgIFIucHJlcGVuZChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSkpXG4gICAgKVxuKTtcblxuY29uc3QgdGhpbmcgPSBxdWVyeSgoc2NvcGUsIHRoaW5nU291bCkgPT5cbiAgc2NvcGUuZ2V0KHRoaW5nU291bCkudGhlbihtZXRhID0+IHtcbiAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgaWQ6IG1ldGEuaWQsIHRpbWVzdGFtcDogcGFyc2VGbG9hdChtZXRhLnRpbWVzdGFtcCwgMTApIH07XG4gICAgY29uc3QgcmVwbHlUb1NvdWwgPSBSLnBhdGgoW1wicmVwbHlUb1wiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wU291bCA9IFIucGF0aChbXCJvcFwiLCBcIiNcIl0sIG1ldGEpO1xuICAgIGNvbnN0IG9wSWQgPSBvcFNvdWwgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gob3BTb3VsKS50aGluZ2lkIDogbnVsbDtcbiAgICBjb25zdCByZXBseVRvSWQgPSByZXBseVRvU291bFxuICAgICAgPyBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2gocmVwbHlUb1NvdWwpLnRoaW5naWRcbiAgICAgIDogbnVsbDtcblxuICAgIGlmIChvcElkKSByZXN1bHQub3BJZCA9IG9wSWQ7XG4gICAgaWYgKHJlcGx5VG9JZCkgcmVzdWx0LnJlcGx5VG9JZCA9IHJlcGx5VG9JZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgdGhpbmdWb3RlQ291bnQgPSB2b3RlVHlwZSA9PlxuICBxdWVyeSgoc2NvcGUsIHRoaW5nU291bCkgPT5cbiAgICBzY29wZVxuICAgICAgLmdldCh0aGluZ1NvdWwpXG4gICAgICAuZ2V0KHZvdGVUeXBlKVxuICAgICAgLmNvdW50KClcbiAgKTtcblxuY29uc3QgdGhpbmdWb3Rlc1VwID0gdGhpbmdWb3RlQ291bnQoXCJ2b3Rlc3VwXCIpO1xuY29uc3QgdGhpbmdWb3Rlc0Rvd24gPSB0aGluZ1ZvdGVDb3VudChcInZvdGVzZG93blwiKTtcbmNvbnN0IHRoaW5nQWxsQ29tbWVudHNDb3VudCA9IHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS9hbGxjb21tZW50c2ApLmNvdW50KClcbik7XG5cbmNvbnN0IGNvbXB1dGVUaGluZ1Njb3JlcyA9IHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICBhbGwoW1xuICAgIHRoaW5nVm90ZXNVcChzY29wZSwgdGhpbmdTb3VsKSxcbiAgICB0aGluZ1ZvdGVzRG93bihzY29wZSwgdGhpbmdTb3VsKSxcbiAgICB0aGluZ0FsbENvbW1lbnRzQ291bnQoc2NvcGUsIHRoaW5nU291bClcbiAgXSkudGhlbigoW3VwLCBkb3duLCBjb21tZW50XSkgPT4gKHsgdXAsIGRvd24sIGNvbW1lbnQsIHNjb3JlOiB1cCAtIGRvd24gfSkpXG4pO1xuXG5jb25zdCB0aGluZ01ldGEgPSBxdWVyeShcbiAgKHNjb3BlLCB7IHRoaW5nU291bCwgdGFidWxhdG9yLCBkYXRhID0gZmFsc2UsIHNjb3JlcyA9IGZhbHNlIH0pID0+XG4gICAgYWxsKFtcbiAgICAgIHRoaW5nKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgICAgc2NvcmVzXG4gICAgICAgID8gdGFidWxhdG9yXG4gICAgICAgICAgPyBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3RlY291bnRzQH4ke3RhYnVsYXRvcn0uYCkudGhlbigpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICA6IGNvbXB1dGVUaGluZ1Njb3JlcyhzY29wZSwgdGhpbmdTb3VsKS50aGVuKClcbiAgICAgICAgOiByZXNvbHZlKCksXG4gICAgICBkYXRhXG4gICAgICAgID8gc2NvcGVcbiAgICAgICAgICAgIC5nZXQodGhpbmdTb3VsKVxuICAgICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAgIC50aGVuKClcbiAgICAgICAgOiByZXNvbHZlKClcbiAgICBdKS50aGVuKChbbWV0YSwgdm90ZXMsIGRhdGFdKSA9PiB7XG4gICAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHsgLi4ubWV0YSwgdm90ZXMsIGRhdGEgfTtcbiAgICB9KVxuKTtcblxuY29uc3QgbXVsdGlUaGluZ01ldGEgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFxuICAgIFIucmVkdWNlKFxuICAgICAgKHByb21pc2VzLCB0aGluZ1NvdWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiBwcm9taXNlcztcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGluZ01ldGEoc2NvcGUsIHsgLi4ucGFyYW1zLCB0aGluZ1NvdWwgfSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG4gICAgICB9LFxuICAgICAgW10sXG4gICAgICBSLnByb3BPcihbXSwgXCJ0aGluZ1NvdWxzXCIsIHBhcmFtcylcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IG11bHRpUXVlcnkgPSAoc2luZ2xlUXVlcnksIHBsdXJhbCwgc2luZ2xlLCBjb2xsYXRlID0gdW5pb25BcnJheXMpID0+XG4gIHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBSLnByb3AocGx1cmFsLCBwYXJhbXMpO1xuXG4gICAgaWYgKFIuaXNOaWwoaXRlbXMpKSByZXR1cm4gZW1wdHlQcm9taXNlO1xuICAgIHJldHVybiBhbGwoXG4gICAgICBSLm1hcChcbiAgICAgICAgdmFsID0+IHNpbmdsZVF1ZXJ5KHNjb3BlLCB7IC4uLnBhcmFtcywgW3NpbmdsZV06IHZhbCB9KSxcbiAgICAgICAgUi5wcm9wT3IoW10sIHBsdXJhbCwgcGFyYW1zKVxuICAgICAgKVxuICAgICkudGhlbihjb2xsYXRlKTtcbiAgfSk7XG5cbmNvbnN0IG11bHRpVG9waWMgPSBtdWx0aVF1ZXJ5KHNpbmdsZVRvcGljLCBcInRvcGljc1wiLCBcInRvcGljXCIpO1xuY29uc3QgbXVsdGlEb21haW4gPSBtdWx0aVF1ZXJ5KHNpbmdsZURvbWFpbiwgXCJkb21haW5zXCIsIFwiZG9tYWluXCIpO1xuY29uc3QgbXVsdGlBdXRob3IgPSBtdWx0aVF1ZXJ5KHNpbmdsZUF1dGhvciwgXCJhdXRob3JJZHNcIiwgXCJhdXRob3JJZFwiKTtcbmNvbnN0IG11bHRpU3VibWlzc2lvbiA9IG11bHRpUXVlcnkoXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIFwic3VibWlzc2lvbklkc1wiLFxuICBcInN1Ym1pc3Npb25JZFwiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGFGcm9tU291bHMgPSBzY29wZSA9PiBzb3VscyA9PlxuICBhbGwoXG4gICAgc291bHNcbiAgICAgIC5maWx0ZXIoeCA9PiAhIXgpXG4gICAgICAubWFwKHNvdWwgPT5cbiAgICAgICAgc2NvcGVcbiAgICAgICAgICAuZ2V0KHNvdWwpXG4gICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAudGhlbih4ID0+IHgpXG4gICAgICApXG4gICk7XG5cbmNvbnN0IGN1cmF0ZWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkcywgc3VibWlzc2lvbk9ubHkgPSBmYWxzZSkgPT5cbiAgYWxsKFtcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJjb21tZW50c1wiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSlcbiAgICAgIC50aGVuKHRoaW5nRGF0YUZyb21Tb3VscyhzY29wZSkpXG4gICAgICAudGhlbihcbiAgICAgICAgUi5jb21wb3NlKFxuICAgICAgICAgIFIubWFwKHN1Ym1pc3Npb25Pbmx5ID8gUi5wcm9wKFwib3BJZFwiKSA6IFIucHJvcChcInJlcGx5VG9JZFwiKSksXG4gICAgICAgICAgUi5maWx0ZXIoUi5wcm9wKFwicmVwbHlUb0lkXCIpKVxuICAgICAgICApXG4gICAgICApLFxuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcInN1Ym1pdHRlZFwiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSkudGhlbihSLm1hcChzb3VsID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChzb3VsKS50aGluZ0lkKSlcbiAgXSkudGhlbigoW2lkczEsIGlkczJdKSA9PiBSLnVuaXEoWy4uLmlkczEsIC4uLmlkczJdKSlcbik7XG5cbmNvbnN0IHRoaW5nU2NvcmVzID0gcXVlcnkoXG4gIChzY29wZSwgdGFidWxhdG9yLCB0aGluZ0lkKSA9PlxuICAgIHRhYnVsYXRvciAmJiB0aGluZ0lkXG4gICAgICA/IHNjb3BlXG4gICAgICAgICAgLmdldChTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCB0YWJ1bGF0b3IgfSkpXG4gICAgICAgICAgLnRoZW4oKVxuICAgICAgOiByZXNvbHZlKCksXG4gIFwidGhpbmdTY29yZXNcIlxuKTtcblxuY29uc3QgdGhpbmdSZXBsaWVzID0gcXVlcnkoKHNjb3BlLCB0aGluZ0lkKSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLnRoZW4oKVxuKTtcblxuY29uc3QgdGhpbmdEYXRhID0gcXVlcnkoXG4gIChzY29wZSwgdGhpbmdJZCkgPT5cbiAgICB0aGluZ0lkXG4gICAgICA/IHNjb3BlLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLmdldChcImRhdGFcIilcbiAgICAgIDogcmVzb2x2ZShudWxsKSxcbiAgXCJ0aGluZ0RhdGFcIlxuKTtcblxuY29uc3QgdXNlclBhZ2VzID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQpID0+XG4gICAgc2NvcGUuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpLFxuICBcInVzZXJQYWdlc1wiXG4pO1xuXG5jb25zdCB3aWtpUGFnZUlkID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQsIG5hbWUpID0+XG4gICAgc2NvcGVcbiAgICAgIC5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSlcbiAgICAgIC5nZXQobmFtZSlcbiAgICAgIC5nZXQoXCJpZFwiKSxcbiAgXCJ3aWtpUGFnZUlkXCJcbik7XG5cbmNvbnN0IHdpa2lQYWdlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgd2lraVBhZ2VJZChzY29wZSwgYXV0aG9ySWQsIG5hbWUpLnRoZW4oaWQgPT4gaWQgJiYgdGhpbmdEYXRhKHNjb3BlLCBpZCkpXG4pO1xuXG5jb25zdCB1c2VyTWV0YSA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkKSA9PlxuICAgIHNjb3BlLmdldChpZCkudGhlbihtZXRhID0+ICh7XG4gICAgICB1c2VyQWxpYXM6IFIucHJvcChcImFsaWFzXCIsIG1ldGEpLFxuICAgICAgY3JlYXRlZEF0OiBSLnBhdGgoW1wiX1wiLCBcIj5cIiwgXCJwdWJcIl0sIG1ldGEpXG4gICAgfSkpLFxuICBcInVzZXJNZXRhXCJcbik7XG5cbmNvbnN0IGNyZWF0ZVNjb3BlID0gUi5jdXJyeSgobmFiLCBvcHRzKSA9PlxuICBtYWtlU2NvcGUoUi5hc3NvYyhcImd1blwiLCBuYWIuZ3VuLCBvcHRzIHx8IHt9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBRdWVyeSA9IHtcbiAgc2luZ2xlVG9waWMsXG4gIHNpbmdsZURvbWFpbixcbiAgc2luZ2xlQXV0aG9yLFxuICBzaW5nbGVMaXN0aW5nLFxuICByZXBsaWVzVG9BdXRob3IsXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIGNvbXB1dGVUaGluZ1Njb3JlcyxcbiAgdGhpbmdNZXRhLFxuICBtdWx0aVRoaW5nTWV0YSxcbiAgbXVsdGlUb3BpYyxcbiAgbXVsdGlEb21haW4sXG4gIG11bHRpQXV0aG9yLFxuICBtdWx0aVN1Ym1pc3Npb24sXG4gIHRoaW5nU2NvcmVzLFxuICB0aGluZ1JlcGxpZXMsXG4gIHRoaW5nRGF0YSxcbiAgdG9waWNTb3VscyxcbiAgdXNlclBhZ2VzLFxuICB3aWtpUGFnZUlkLFxuICB3aWtpUGFnZSxcbiAgdXNlck1ldGEsXG4gIGNyZWF0ZVNjb3BlLFxuICBjdXJhdGVkXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgLi4uc2VhLkFVVEhfU0NIRU1BLFxuICB0b3BpY05hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRVxuICB9LFxuXG4gIFRvcGljRGF5OiB7XG4gICAgdGl0bGU6IFwiVG9waWMgRGF5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQSBzaW5nbGUgZGF5IG9mIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWUvZGF5cy86eWVhci86bW9udGgvOmRheWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICB5ZWFyOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDIwMTgsIG1heGltdW06IDIxMDAgfSxcbiAgICAgICAgbW9udGg6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMTIgfSxcbiAgICAgICAgZGF5OiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDMxIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCIsIFwieWVhclwiLCBcIm1vbnRoXCIsIFwiZGF5XCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBUb3BpYzoge1xuICAgIHRpdGxlOiBcIlRvcGljXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIGRvbWFpbk5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfRE9NQUlOX1NJWkVcbiAgfSxcblxuICBEb21haW46IHtcbiAgICB0aXRsZTogXCJEb21haW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgZG9tYWluXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWlucy86ZG9tYWluTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbk5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluTmFtZVwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB1cmw6IHsgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1VSTF9TSVpFIH0sXG4gIFVSTDoge1xuICAgIHRpdGxlOiBcIlVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgZm9yIGEgZ2l2ZW4gVVJMXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXJscy9cXCp1cmxgLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVybDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInVybFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aGluZ0lkOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfSEFTSF9TSVpFXG4gIH0sXG5cbiAgdGhpbmdTb3VsOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGhpbmdJZDogeyBcIiNyZWZcIjogXCIjZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdBbGxDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIEFsbCBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBjb21tZW50cyBmb3IgYSBnaXZlbiBzdWJtaXNzaW9uXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2FsbGNvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3QgcmVwbGllcyB0byBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aW1lc3RhbXA6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0sXG4gIHRoaW5nS2luZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0tJTkRfU0laRVxuICB9LFxuXG4gIFRoaW5nOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgUmVmZXJlbmNlXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoZXNlIGFyZSBzdWJtaXNzaW9ucywgY29tbWVudHMsIGNoYXQgbWVzc2FnZXMgYW5kIHdpa2kgcGFnZXNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWRgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IGlkOiBcInRoaW5nSWRcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGtpbmQ6IHsgXCIjcmVmXCI6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9LFxuICAgICAgb3JpZ2luYWxIYXNoOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb25lT2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFFZGdlXCIgfSxcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFTaWduZWRFZGdlXCIgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgdG9waWM6IHtcbiAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbWUgb2xkIHRoaW5ncyBoYWQgZ2VuZXJpYyB0b3BpYyBzb3Vsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgXCIjXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiA0MiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFtcIiNcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL0RvbWFpbkVkZ2VcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9VUkxFZGdlXCIgfSxcbiAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH0sXG4gICAgICBvcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIHJlcGx5VG86IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1NFQUF1dGhvckVkZ2VcIiB9XG4gICAgfSxcblxuICAgIGFueU9mOiBbXG4gICAgICB7XG4gICAgICAgIGFsbE9mOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpbmdIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgICAgIHsgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nOiB0cnVlIH0sXG4gICAgICAgICAgICAgIHsgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaDogdHJ1ZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyBpc0xlZ2FjeVRoaW5nOiB0cnVlIH0sXG4gICAgICB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU2VsZiB2ZXJpZnlpbmcgY2FuIGJlIHVwZGF0ZWQgaW4gaXNvbGF0aW9uXCIsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuXG4gIFByb29mT2ZXb3JrVm90ZXM6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAga2V5c0FyZVByb29mc09mV29yazoge1xuICAgICAgYWxnb3JpdGhtOiBcImFyZ29uMmRcIixcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjb21wbGV4aXR5OiA2LFxuICAgICAgICBoYXNoTGVuZ3RoOiAzMixcbiAgICAgICAgdGltZUNvc3Q6IDEsXG4gICAgICAgIG1lbW9yeUNvc3Q6IDEwMjQwLFxuICAgICAgICBwYXJhbGxlbGlzbTogMVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVzVXA6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXN1cGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdWb3Rlc0Rvd246IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXNkb3duYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ0RhdGE6IHtcbiAgICB0aXRsZTogXCJVbnNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH0sXG4gICAgICBhdXRob3JJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgb3BJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICByZXBseVRvSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdXJsXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfVxuICAgIH0sXG4gICAgdGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gIH0sXG5cbiAgVGhpbmdEYXRhU2lnbmVkOiB7XG4gICAgdGl0bGU6IFwiU2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZywgY3J5cHRvZ3JhcGhpY2FsbHkgc2lnbmVkXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGF+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCIsIFwiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0gfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSB9LFxuICAgICAgYm9keToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9XG4gICAgICB9LFxuICAgICAgYXV0aG9ySWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSB9LFxuICAgICAgb3BJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIHJlcGx5VG9JZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIGRvbWFpbjogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0gfSxcbiAgICAgIHVybDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfSB9LFxuICAgICAgdGltZXN0YW1wOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9IH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3RlQ291bnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgVm90ZSBDb3VudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBZ2dyZWdhdGVkIGNvdW50cyBmcm9tIGEgdGFidWxhdG9yXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVjb3VudHNAfjp0YWJ1bGF0b3IuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgdGFidWxhdG9yOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXA6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBkb3duOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWVudDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIHNjb3JlOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWFuZHM6IHsgc2VhOiB7IHR5cGU6IFtcIm9iamVjdFwiLCBcInN0cmluZ1wiXSB9IH1cbiAgICB9XG4gIH0sXG5cbiAgTGlzdGluZ0RhdGE6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAgdGl0bGU6IFwiTGlzdGluZyBOb2RlIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTaGFyZWQgZGVzY3JpcHRpb24gb2YgbGlzdGluZyBwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBpZHM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX0lEU19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIFhYWDogcmVzdCBhcmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzb3VyY2VcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFtcInN0cmluZ1wiLCBcIm51bGxcIl0sIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBzdWJtaXRUb3BpYzoge1xuICAgICAgICBzZWE6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RPUElDX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIHRhYnM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1RBQlNfU0laRSB9XG4gICAgICB9LFxuICAgICAgY3VyYXRvcnM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG4gICAgICBjZW5zb3JzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19TT1VSQ0VfU0laRSB9XG4gICAgICB9LFxuICAgICAgdXNlcklkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0gfSxcbiAgICAgIG9wSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICBpc0NoYXQ6IHsgc2VhOiB7IHR5cGU6IFtcImJvb2xlYW5cIiwgXCJzdHJpbmdcIl0gfSB9XG4gICAgfSxcbiAgICBwYXR0ZXJuUHJvcGVydGllczoge1xuICAgICAgXCJeZCskXCI6IHsgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIgfSB9XG4gICAgfVxuICB9LFxuXG4gIHNvcnROYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXG4gICAgICBcIm5ld1wiLFxuICAgICAgXCJvbGRcIixcbiAgICAgIFwiYWN0aXZlXCIsXG4gICAgICBcInRvcFwiLFxuICAgICAgXCJjb21tZW50c1wiLFxuICAgICAgXCJkaXNjdXNzZWRcIixcbiAgICAgIFwiaG90XCIsXG4gICAgICBcImJlc3RcIixcbiAgICAgIFwiY29udHJvdmVyc2lhbFwiLFxuICAgICAgXCJyYW5kb21cIixcbiAgICAgIFwiZmlyZWhvc2VcIixcbiAgICAgIFwiY2hhdFwiXG4gICAgXVxuICB9LFxuXG4gIFRvcGljTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3QvOnRvcGljLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpYzogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIERvbWFpbkxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9kb21haW4vOmRvbWFpbi86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZG9tYWluOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIHVzZXJMaXN0aW5nVHlwZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1wib3ZlcnZpZXdcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tZW50c1wiLCBcImNvbW1hbmRzXCIsIFwiY29tbWVudGVkXCJdXG4gIH0sXG5cbiAgQXV0aG9yUmVwbGllc0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JQcm9maWxlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBTcGFjZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBuYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvckNvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9ycyBjb21tZW50cyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9jb21tZW50c346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yU3VibWlzc2lvbnM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBTdWJtaXNzaW9uc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyBzdWJtaXNzaW9ucyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9zdWJtaXNzaW9uc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclRoaW5nczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFRoaW5nc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyB0aGluZ3Mgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JQYWdlczoge1xuICAgIHRpdGxlOiBcIkF1dGhvciBQYWdlIE1hcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1hcHBpbmcgb2YgcGFnZSBuYW1lcyB0byB0aGluZ3NcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9wYWdlc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlcyA9IFIua2V5cyhkZWZpbml0aW9ucykucmVkdWNlKChyZXN1bHQsIG5hbWUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IFIucGF0aChbbmFtZSwgXCJzb3VsXCIsIFwicGF0dGVyblwiXSwgZGVmaW5pdGlvbnMpO1xuXG4gIGlmICghcGF0dGVybikgcmV0dXJuIHJlc3VsdDtcbiAgcmV0dXJuIFIuYXNzb2MobmFtZSwgbmV3IFJvdXRlKHBhdHRlcm4pLCByZXN1bHQpO1xufSk7XG5cbmNvbnN0IGRlZnNXaXRoUm91dGVzID0gUi5jb21wb3NlKFxuICBSLnJlZHVjZShcbiAgICAocmVzLCBbbmFtZSwgcm91dGVdKSA9PlxuICAgICAgUi5hc3NvYyhuYW1lLCBSLmFzc29jKFwicm91dGVcIiwgcm91dGUsIFIucHJvcChuYW1lLCBkZWZpbml0aW9ucykpLCByZXMpLFxuICAgIHt9XG4gICksXG4gIFIudG9QYWlyc1xuKShyb3V0ZXMpO1xuXG5leHBvcnQgY29uc3QgU2NoZW1hID0ge1xuICAuLi5kZWZzV2l0aFJvdXRlcyxcbiAgZGVmaW5pdGlvbnMsXG4gIHJvdXRlc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcblxuY29uc3QgYm9keSA9IFIucHJvcE9yKFwiXCIsIFwiYm9keVwiKTtcbmNvbnN0IHVybCA9IFIucHJvcE9yKFwiXCIsIFwidXJsXCIpO1xuY29uc3QgZG9tYWluID0gUi5jb21wb3NlKFxuICB1cmxTdHIgPT4ge1xuICAgIGlmICghdXJsU3RyKSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZVVSSSh1cmxTdHIpO1xuXG4gICAgcmV0dXJuIChwYXJzZWQuaG9zdCB8fCBwYXJzZWQuc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKTtcbiAgfSxcbiAgdXJsXG4pO1xuXG5leHBvcnQgY29uc3QgVGhpbmdEYXRhTm9kZSA9IHsgYm9keSwgZG9tYWluIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5cbmNvbnN0IHNvdWxzID0gR3VuTm9kZS5lZGdlcztcbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcInRoaW5nSWRcIiksXG4gICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4gICAgKVxuICApLFxuICBHdW5Ob2RlLmVkZ2VzXG4pO1xuXG5jb25zdCB1bmlvbiA9IFIuY29tcG9zZShcbiAgUi5kaXNzb2MoXCJfXCIpLFxuICBSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KVxuKTtcblxuZnVuY3Rpb24gZGF5U3RyKHRpbWVzdGFtcCkge1xuICBjb25zdCBkID0gbmV3IERhdGUodGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgY29uc3QgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RhdGUoKTtcblxuICByZXR1cm4gYCR7eWVhcn0vJHttb250aH0vJHtkYXlOdW19YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRoaW5nU2V0ID0geyBpZHMsIHVuaW9uLCBzb3VscywgZGF5U3RyIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5cbmV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5cbmNvbnN0IHB1dCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgZGF0YS50aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBvYmpIYXNoKGRhdGEpO1xuICBjb25zdCB7IHRpbWVzdGFtcCwga2luZCwgdG9waWMsIGF1dGhvcklkLCBvcElkLCByZXBseVRvSWQgfSA9IGRhdGE7XG4gIGNvbnN0IHRoaW5nSWQgPSBvYmpIYXNoKHtcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICB0b3BpYyxcbiAgICBhdXRob3JJZCxcbiAgICBvcElkLFxuICAgIHJlcGx5VG9JZCxcbiAgICBvcmlnaW5hbEhhc2hcbiAgfSk7XG5cbiAgY29uc3Qgbm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXRhU291bCA9IGF1dGhvcklkXG4gICAgPyBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCBhdXRob3JJZCB9KVxuICAgIDogU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3JpZ2luYWxIYXNoIH0pO1xuXG4gIGNvbnN0IG1ldGFEYXRhID0ge1xuICAgIGlkOiB0aGluZ0lkLFxuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIG9yaWdpbmFsSGFzaCxcbiAgICBkYXRhOiB7IFwiI1wiOiBkYXRhU291bCB9LFxuICAgIHZvdGVzdXA6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzVXAucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICB2b3Rlc2Rvd246IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzRG93bi5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGFsbGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9XG4gIH07XG5cbiAgaWYgKHRvcGljKVxuICAgIG1ldGFEYXRhLnRvcGljID0geyBcIiNcIjogU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IHRvcGljIH0pIH07XG4gIGlmIChhdXRob3JJZCkgbWV0YURhdGEuYXV0aG9yID0geyBcIiNcIjogYH4ke2F1dGhvcklkfWAgfTtcbiAgaWYgKG9wSWQpXG4gICAgbWV0YURhdGEub3AgPSB7IFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkgfTtcbiAgaWYgKHJlcGx5VG9JZClcbiAgICBtZXRhRGF0YS5yZXBseVRvID0ge1xuICAgICAgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcmVwbHlUb0lkIH0pXG4gICAgfTtcblxuICBwZWVyLmd1bi5nZXQoZGF0YVNvdWwpLnB1dChkYXRhKTtcbiAgbm9kZS5wdXQobWV0YURhdGEpO1xuICBwZWVyLmluZGV4KHRoaW5nSWQsIGRhdGEpO1xuICByZXR1cm4gbm9kZTtcbn0pO1xuXG5jb25zdCBzdWJtaXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChkYXRhLmRvbWFpbikgZGF0YS5kb21haW4gPSBkYXRhLmRvbWFpbi50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCB0aW1lc3RhbXAsIGtpbmQ6IFwic3VibWlzc2lvblwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBzdWJtaXNzaW9uc1NvdWwgPSBTY2hlbWEuQXV0aG9yU3VibWlzc2lvbnMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnMgPSBwZWVyLmd1bi5nZXQoc3VibWlzc2lvbnNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgLnB1dChzdWJtaXNzaW9ucyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgc3VibWlzc2lvbnMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjb21tZW50ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY29tbWVudFwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBjb21tZW50c1NvdWwgPSBTY2hlbWEuQXV0aG9yQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoY29tbWVudHNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgLnB1dChjb21tZW50cyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIC8vIHBlZXIuZ3VuLnVzZXIoKS5nZXQoXCJjb21tZW50c1wiKS5wdXQocGVlci5ndW4udXNlcigpLmdldChcImNvbW1lbnRzXCIpKTtcblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY2hhdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNoYXRtc2dcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCB3cml0ZVBhZ2UgPSBSLmN1cnJ5KChwZWVyLCBuYW1lLCBib2R5KSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoIXVzZXIpIHJldHVybiBQcm9taXNlLnJlamVjdChcIm5vdCBsb2dnZWQgaW5cIik7XG4gIGxldCB0aGluZztcbiAgY29uc3QgcGFnZXNTb3VsID0gU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZDogdXNlci5wdWIgfSk7XG4gIGNvbnN0IGNoYWluID0gcGVlci5ndW4uZ2V0KHBhZ2VzU291bCkuZ2V0KG5hbWUpO1xuXG4gIHJldHVybiBjaGFpbi50aGVuKHJlcyA9PiB7XG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coXCJyZXNcIiwgcmVzKTtcbiAgICAgIGNoYWluXG4gICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgIC5nZXQoXCJib2R5XCIpXG4gICAgICAgIC5wdXQoYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGJvZHksXG4gICAgICAgIHRpdGxlOiBuYW1lLFxuICAgICAgICBraW5kOiBcIndpa2lwYWdlXCIsXG4gICAgICAgIGF1dGhvcjogdXNlci5hbGlhcyxcbiAgICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgICB9O1xuXG4gICAgICBjb25zb2xlLmxvZyhcInBhZ2UgZGF0YVwiLCBkYXRhKTtcbiAgICAgIHRoaW5nID0gcHV0KHBlZXIsIGRhdGEpO1xuICAgICAgY2hhaW4ucHV0KHRoaW5nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHZvdGUgPSBSLmN1cnJ5KChwZWVyLCBpZCwga2luZCwgbm9uY2UpID0+IHtcbiAgY29uc3Qgdm90ZXMgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hW2tpbmQgPT09IFwidXBcIiA/IFwiVGhpbmdWb3Rlc1VwXCIgOiBcIlRoaW5nVm90ZXNEb3duXCJdLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogaWRcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiB2b3Rlcy5nZXQobm9uY2UpLnB1dChcIjFcIik7XG59KTtcblxuY29uc3QgdG9waWNQcmVmaXhlcyA9IHtcbiAgY2hhdG1zZzogXCJjaGF0OlwiLFxuICBjb21tZW50OiBcImNvbW1lbnRzOlwiXG59O1xuXG5jb25zdCBpbmRleCA9IFIuY3VycnkoKHBlZXIsIHRoaW5nSWQsIGRhdGEpID0+IHtcbiAgaWYgKCFkYXRhLnRvcGljICYmICFkYXRhLm9wSWQpIHJldHVybjtcblxuICBpZiAoZGF0YS5vcElkICYmICFkYXRhLnRvcGljKSB7XG4gICAgcGVlci5ndW5cbiAgICAgIC5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSkpXG4gICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgLm9uKGZ1bmN0aW9uIHJlY3YodGQpIHtcbiAgICAgICAgaWYgKCF0ZCkgcmV0dXJuO1xuICAgICAgICBpbmRleChwZWVyLCB0aGluZ0lkLCB7IC4uLmRhdGEsIHRvcGljOiB0ZC50b3BpYyB8fCBcImFsbFwiIH0pO1xuICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF5U3RyID0gVGhpbmdTZXQuZGF5U3RyKGRhdGEudGltZXN0YW1wKTtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF5U3RyLnNwbGl0KFwiL1wiKTtcbiAgY29uc3QgdG9waWNQcmVmaXggPSB0b3BpY1ByZWZpeGVzW2RhdGEua2luZF0gfHwgXCJcIjtcbiAgY29uc3QgYmFzZVRvcGljTmFtZSA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IHRvcGljTmFtZSA9IHRvcGljUHJlZml4ICsgYmFzZVRvcGljTmFtZTtcbiAgY29uc3QgdG9waWMgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUgfSkpO1xuICBjb25zdCB0b3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSwgeWVhciwgbW9udGgsIGRheSB9KVxuICApO1xuXG4gIGlmICghZGF0YS5za2lwQWxsICYmIGRhdGEudG9waWMgIT09IFwiYWxsXCIpIHtcbiAgICBjb25zdCBhbGxuYW1lID0gYCR7dG9waWNQcmVmaXh9YWxsYDtcbiAgICBjb25zdCBhbGxUb3BpYyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiBhbGxuYW1lIH0pXG4gICAgKTtcbiAgICBjb25zdCBhbGxUb3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdG9waWNOYW1lOiBhbGxuYW1lLFxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgZGF5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBhbGxUb3BpYy5zZXQodGhpbmcpO1xuICAgIGFsbFRvcGljRGF5LnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5raW5kID09PSBcInN1Ym1pc3Npb25cIikge1xuICAgIGNvbnN0IHVybEluZm8gPSBkYXRhLnVybCA/IHBhcnNlVVJJKGRhdGEudXJsKSA6IHt9O1xuICAgIGNvbnN0IGRvbWFpbk5hbWUgPSAoZGF0YS51cmxcbiAgICAgID8gKHVybEluZm8uaG9zdCB8fCB1cmxJbmZvLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIilcbiAgICAgIDogYHNlbGYuJHtkYXRhLnRvcGljfWBcbiAgICApLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZG9tYWluID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWUgfSkpO1xuXG4gICAgZG9tYWluLnNldCh0aGluZyk7XG5cbiAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgIGNvbnN0IHVybE5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlVSTC5yb3V0ZS5yZXZlcnNlKHsgdXJsOiBkYXRhLnVybCB9KSk7XG5cbiAgICAgIC8vIHRoaW5nLmdldChcInVybFwiKS5wdXQodXJsTm9kZSk7XG4gICAgICB1cmxOb2RlLnNldCh0aGluZyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGFsbGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KVxuICAgICk7XG5cbiAgICBhbGxjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRoaW5nSWQ6IGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHRvcGljLnNldCh0aGluZyk7XG4gIHRvcGljRGF5LnNldCh0aGluZyk7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nID0ge1xuICBwdXQsXG4gIHN1Ym1pdCxcbiAgY29tbWVudCxcbiAgY2hhdCxcbiAgd3JpdGVQYWdlLFxuICB2b3RlLFxuICBpbmRleFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHRva2VuaXplID0gc291cmNlID0+IHtcbiAgY29uc3QgdG9rZW5NYXAgPSAoc291cmNlIHx8IFwiXCIpLnNwbGl0KFwiXFxuXCIpLnJlZHVjZSgoZGVmLCBsaW5lKSA9PiB7XG4gICAgY29uc3QgdG9rZW5zID0gbGluZVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLm1hcChSLnRyaW0pXG4gICAgICAuZmlsdGVyKHggPT4geCk7XG5cbiAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHJldHVybiBkZWY7XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2Vucywge30sIGRlZik7XG4gIH0sIHt9KTtcblxuICBjb25zdCBpc1ByZXNlbnQgPSBwID0+IHtcbiAgICBsZXQgY2hlY2sgPSBwO1xuXG4gICAgaWYgKHR5cGVvZiBwID09PSBcInN0cmluZ1wiKSBjaGVjayA9IHAuc3BsaXQoXCIgXCIpO1xuICAgIHJldHVybiBjaGVjayAmJiBSLnBhdGgoY2hlY2ssIHRva2VuTWFwKTtcbiAgfTtcblxuICBjb25zdCBnZXRWYWx1ZXMgPSBwID0+IFIua2V5c0luKGlzUHJlc2VudChwKSk7XG4gIGNvbnN0IGdldFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocClbMF0gfHwgbnVsbDtcbiAgY29uc3QgZ2V0TGFzdFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocCkucG9wKCkgfHwgbnVsbDtcblxuICBjb25zdCBnZXRWYWx1ZUNoYWluID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGxldCBuZXh0ID0gcDtcblxuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBuZXh0ID0gZ2V0VmFsdWUoWy4uLmtleXMsIC4uLnZhbHVlc10pO1xuICAgICAgbmV4dCAmJiB2YWx1ZXMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFBhaXJzID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuXG4gICAgcmV0dXJuIGdldFZhbHVlcyhrZXlzKS5yZWR1Y2UoKHBhaXJzLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldFZhbHVlKFsuLi5rZXlzLCBrZXldKTtcblxuICAgICAgcmV0dXJuIFsuLi5wYWlycywgW2tleSwgdmFsXV07XG4gICAgfSwgW10pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlLFxuICAgIGlzUHJlc2VudCxcbiAgICBnZXRWYWx1ZSxcbiAgICBnZXRWYWx1ZXMsXG4gICAgZ2V0TGFzdFZhbHVlLFxuICAgIGdldFZhbHVlQ2hhaW4sXG4gICAgZ2V0UGFpcnNcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2tlbml6ZXIgPSB7IHRva2VuaXplIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBjcmVhdGVTdXBwcmVzc29yIH0gZnJvbSBcImd1bi1zdXBwcmVzc29yXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuXG5jb25zdCBpc0xlZ2FjeVRoaW5nID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBkYXRhU291bCA9IFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSk7XG4gIGNvbnN0IG5ld2VzdCA9IFIud2l0aG91dChcbiAgICBbXCJjb21tZW50c1wiLCBcImFsbGNvbW1lbnRzXCIsIFwidm90ZXN1cFwiLCBcInZvdGVzZG93blwiXSxcbiAgICBSLmtleXMoUi5wYXRoKFtcIl9cIiwgXCI+XCJdLCBkYXRhKSlcbiAgKVxuICAgIC5tYXAoa2V5ID0+IFIucGF0aChbXCJfXCIsIFwiPlwiLCBrZXldLCBkYXRhKSlcbiAgICAuc29ydCgpXG4gICAgLnBvcCgpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IHNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goZGF0YVNvdWwpIHx8IHt9O1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gdGhpbmdJZCAmJiBuZXdlc3QgJiYgbmV3ZXN0IDwgMTU0MzEwMjgxNDk0NTtcbn07XG5cbmNvbnN0IHRoaW5nSGFzaE1hdGNoZXNTb3VsID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gKFxuICAgIGlkICYmXG4gICAgaWQgPT09XG4gICAgICBvYmpIYXNoKHtcbiAgICAgICAgYXV0aG9ySWQ6IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGltZXN0YW1wOiBwYXJzZUludChSLnByb3AoXCJ0aW1lc3RhbXBcIiwgZGF0YSksIDEwKSxcbiAgICAgICAga2luZDogUi5wcm9wKFwia2luZFwiLCBkYXRhKSxcbiAgICAgICAgdG9waWM6IFIucHJvcChcbiAgICAgICAgICBcInRvcGljTmFtZVwiLFxuICAgICAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5tYXRjaChSLnBhdGgoW1widG9waWNcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3BJZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgcmVwbHlUb0lkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9yaWdpbmFsSGFzaDogUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpXG4gICAgICB9KVxuICApO1xufTtcblxuY29uc3Qgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGF1dGhvcklkID0gKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkO1xuICBjb25zdCBzaWduZWRJZCA9IFIucHJvcChcbiAgICBcImF1dGhvcklkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBhdXRob3JJZCAmJiBhdXRob3JJZCA9PT0gc2lnbmVkSWQ7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpO1xuICBjb25zdCBpZCA9IFIucHJvcChcbiAgICBcInRoaW5nSWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSBvcmlnaW5hbEhhc2g7XG59O1xuXG5jb25zdCBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UgPSBhanYgPT4gKFxuICBub2RlVHlwZU5hbWUsXG4gIGRhdGEsXG4gIF9wU2NoZW1hLFxuICBfY1BhdGgsXG4gIHBhcmVudERhdGFcbikgPT4ge1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgcGFyZW50RGF0YSkgfHwgXCJcIikgfHwge307XG4gIGNvbnN0IHsgdGhpbmdJZDogcHJvcFRoaW5nSWQgfSA9IFNjaGVtYVtub2RlVHlwZU5hbWVdLnJvdXRlLm1hdGNoKFxuICAgIFIucHJvcChcIiNcIiwgZGF0YSkgfHwgXCJcIlxuICApO1xuXG4gIGlmICghdGhpbmdJZCB8fCB0aGluZ0lkICE9PSBwcm9wVGhpbmdJZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYWp2LmNvbXBpbGUoeyAkcmVmOiBgc2NoZW1hLmpzb24jL2RlZmluaXRpb25zLyR7bm9kZVR5cGVOYW1lfUVkZ2VgIH0pKFxuICAgIGRhdGFcbiAgKTtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YUhhc2hNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgeyBfLCAuLi5yZWNvcmQgfSA9IGRhdGEgfHwge307IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICByZWNvcmQudGltZXN0YW1wID0gcGFyc2VGbG9hdChyZWNvcmQudGltZXN0YW1wLCAxMCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikgfHwge307XG5cbiAgcmV0dXJuIHRoaW5nSWQgJiYgdGhpbmdJZCA9PT0gb2JqSGFzaChyZWNvcmQpO1xufTtcblxuY29uc3QgaXNWb3RlVmFsaWQgPSAoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkgPT4ge1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiLCBjb25maWcgPSB7fSB9ID0gc2NoZW1hIHx8IHt9O1xuXG4gIGNvbnN0IG5vbmNlID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20odm90ZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIodm90ZSwgXCJoZXhcIik7XG4gIGNvbnN0IHNhbHQgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbShub25jZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIobm9uY2UsIFwiaGV4XCIpO1xuICBjb25zdCBoYXNoID0gYXJnb24yLmhhc2gocHJlZml4LCB7XG4gICAgc2FsdCxcbiAgICBoYXNoTGVuZ3RoOiBjb25maWcuaGFzaExlbmd0aCxcbiAgICB0aW1lQ29zdDogY29uZmlnLnRpbWVDb3N0LFxuICAgIG1lbW9yeUNvc3Q6IGNvbmZpZy5tZW1vcnlDb3N0LFxuICAgIHBhcmFsbGVsaXNtOiBjb25maWcucGFyYWxsZWxpc20sXG4gICAgcmF3OiB0cnVlLFxuICAgIHR5cGU6IGFyZ29uMlthbGdvcml0aG1dXG4gIH0pO1xuICBsZXQgb2ZmID0gMDtcbiAgbGV0IGk7XG5cbiAgZm9yIChpID0gMDsgaSA8PSBjb25maWcuY29tcGxleGl0eSAtIDg7IGkgKz0gOCwgb2ZmKyspIHtcbiAgICBpZiAoaGFzaFtvZmZdICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWFzayA9IDB4ZmYgPDwgKDggKyBpIC0gY29uZmlnLmNvbXBsZXhpdHkpO1xuXG4gIHJldHVybiAoaGFzaFtvZmZdICYgbWFzaykgPT09IDA7XG59O1xuXG5jb25zdCBrZXlzQXJlUHJvb2ZzT2ZXb3JrID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhcmdvbjIgPSByZXF1aXJlKFwiYXJnb24yXCIpO1xuXG4gIGlmICghYXJnb24yKSByZXR1cm4gdHJ1ZTsgLy8gaW4gYnJvd3NlciBkb24ndCBib3RoZXIgZm9yIG5vd1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiIH0gPSBzY2hlbWEgfHwge307XG4gIGNvbnN0IHByZWZpeCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKGFsZ29yaXRobSAhPT0gXCJhcmdvbjJkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGFyZ29uMiBzdXBwb3J0ZWQgZm9yIHZvdGUgaGFzaGVzXCIpO1xuICB9XG5cbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaCh2b3RlID0+IHtcbiAgICBpZiAoIWlzVm90ZVZhbGlkKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgdm90ZVwiLCBwcmVmaXgsIHZvdGUpO1xuICAgICAgZGVsZXRlIGRhdGFbdm90ZV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBpbml0QWp2ID0gUi5jb21wb3NlKFxuICBhanYgPT4ge1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiaXNMZWdhY3lUaGluZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogaXNMZWdhY3lUaGluZ1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nSGFzaE1hdGNoZXNTb3VsXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nUmVsYXRlZEVkZ2VcIiwge1xuICAgICAgdmFsaWRhdGU6IGdldElzVGhpbmdSZWxhdGVkRWRnZShhanYpXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YUhhc2hNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJrZXlzQXJlUHJvb2ZzT2ZXb3JrXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGFqdjtcbiAgfSxcbiAgc2VhLmluaXRBanZcbik7XG5cbmV4cG9ydCBjb25zdCBzdXBwcmVzc29yID0gY3JlYXRlU3VwcHJlc3Nvcih7XG4gIGRlZmluaXRpb25zOiBTY2hlbWEuZGVmaW5pdGlvbnMsXG4gIGluaXQ6IGluaXRBanZcbn0pO1xuXG5jb25zdCBndW5XaXJlSW5wdXQgPSBSLmN1cnJ5KChwZWVyLCBjb250ZXh0KSA9PlxuICBjb250ZXh0Lm9uKFwiaW5cIiwgZnVuY3Rpb24gd2lyZUlucHV0KG1zZykge1xuICAgIGNvbnN0IF8gPSBtc2dbXCJfXCJdO1xuXG4gICAgZGVsZXRlIG1zZ1tcIl9cIl07XG4gICAgaWYgKFwicGluZ1wiIGluIG1zZyB8fCBcImxlZWNoXCIgaW4gbXNnKSByZXR1cm47XG4gICAgaWYgKG1zZy5wdXQgJiYgIVIua2V5cyhtc2cucHV0KS5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBwcm9taXNlID0gcGVlci5jb25maWcuZGlzYWJsZVZhbGlkYXRpb25cbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKG1zZylcbiAgICAgIDogc3VwcHJlc3Nvci52YWxpZGF0ZShtc2cpO1xuXG4gICAgcHJvbWlzZVxuICAgICAgLnRoZW4odmFsaWRhdGVkID0+IHtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHJldHVybiBjb25zb2xlLmxvZyhcIm1zZyBkaWRuJ3QgdmFsaWRhdGVcIiwgbXNnKTtcbiAgICAgICAgbXNnW1wiX1wiXSA9IF87XG4gICAgICAgIHJldHVybiB0aGlzLnRvLm5leHQobXNnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJ2YWxpZGF0ZSBlcnJcIiwgbXNnLCBlcnIuc3RhY2sgfHwgZXJyKSk7XG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgVmFsaWRhdGlvbiA9IHtcbiAgaXNMZWdhY3lUaGluZyxcbiAgdGhpbmdIYXNoTWF0Y2hlc1NvdWwsXG4gIHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMsXG4gIHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2gsXG4gIGdldElzVGhpbmdSZWxhdGVkRWRnZSxcbiAgdGhpbmdEYXRhSGFzaE1hdGNoZXMsXG4gIGlzVm90ZVZhbGlkLFxuICBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICBpbml0QWp2LFxuICBzdXBwcmVzc29yLFxuICBndW5XaXJlSW5wdXRcbn07XG4iLCJpbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5leHBvcnQgeyBMaXN0aW5nIH0gZnJvbSBcIi4vTGlzdGluZ1wiO1xuZXhwb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmV4cG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuZXhwb3J0IHsgVGhpbmcsIFRoaW5nU2V0LCBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmV4cG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tIFwiLi9WYWxpZGF0aW9uXCI7XG5leHBvcnQgZGVmYXVsdCBQZWVyLmluaXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JhbWRhX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JvdXRlX3BhcnNlcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXzsiXSwic291cmNlUm9vdCI6IiJ9