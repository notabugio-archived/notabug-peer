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
  var name = sourceName(definition);
  return R.mergeLeft({
    name: name
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
      isPresent = definition.isPresent;
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
              var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
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
              }(), rows.splice(count, size)));
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
  return Promise.all(R.map(scope.get, souls)).then(unionRows);
});
var read = (0, _gunScope.query)(function (scope, path, opts) {
  var _ref10 = opts || {},
      _ref10$indexer = _ref10.indexer,
      indexer = _ref10$indexer === void 0 ? _Config.Config.indexer : _ref10$indexer;

  return rowsFromSouls(scope, [soulFromPath(indexer, path)]).then(rowsToIds);
}, "listingRows");
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
  rowsFromSouls: rowsFromSouls,
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

var fromSpec = (0, _gunScope.query)(function (scope, spec) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

  var paths = R.pathOr([], ["dataSource", "listingPaths"], spec);
  var souls = R.map(_ListingNode.ListingNode.soulFromPath(opts.indexer || spec.indexer), paths);
  return _ListingNode.ListingNode.rowsFromSouls(scope, souls).then(function (rows) {
    return _ListingFilter.ListingFilter.getFilteredIds(scope, rows, { ...opts,
      filterFn: filterFn
    });
  });
});
var fromPath = (0, _gunScope.query)(function (scope, path, opts) {
  var type = _ListingType.ListingType.fromPath(path);

  if (!type) return Promise.resolve([]);
  return type.getSpec(scope, type.match).then(function (spec) {
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

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

var _Thing = __webpack_require__(/*! ../Thing */ "./src/Thing/index.js");

var _ListingDefinition = __webpack_require__(/*! ./ListingDefinition */ "./src/Listing/ListingDefinition.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var fromSource = R.compose(R.apply(R.mergeLeft), R.ap([_ListingFilter.ListingFilter.fromDefinition, R.identity]), R.of, R.apply(R.assoc("dataSource")), R.ap([_ListingDataSource.ListingDataSource.fromDefinition, R.identity]), R.of, _ListingDefinition.ListingDefinition.fromSource);
var getSource = (0, _gunScope.query)(function (scope, authorId, name) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  return _Query.Query.wikiPage(scope, authorId, name).then(R.compose(function (body) {
    return "".concat(body, "\n# added by indexer\n").concat(extra || "", "\nsourced from page ").concat(authorId, " ").concat(name, "\n");
  }, _Thing.ThingDataNode.body));
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
    console.log("wtf", path, match);

    if (match) {
      console.log("match", match);
    } else {
      console.log("no match", types[i].route);
    }

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

  peer.newScope = function (opts) {
    return _Query.Query.createScope(peer, opts);
  };

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
  if (!thingSoul) return (0, _gunScope.resolve)(null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9HdW5Ob2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdEYXRhU291cmNlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdEZWZpbml0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ05vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ09yYWNsZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nUXVlcnkuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1NvcnQuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1NwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvQ29tbWVudExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9JbmJveExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvUHJvZmlsZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvU3BhY2VMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1RvcGljTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9QYXRoLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL1NwYWNlU3BlYy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvUGVlci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvUXVlcnkuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1NjaGVtYS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdEYXRhTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdTZXQuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Ub2tlbml6ZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImFyZ29uMlwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zY29wZVwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcIm9iamVjdC1oYXNoXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicmFtZGFcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJyb3V0ZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJ1cmktanNcIiJdLCJuYW1lcyI6WyJzaWdudXAiLCJSIiwiY3VycnkiLCJwZWVyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm9wdHMiLCJvayIsImZhaWwiLCJndW4iLCJ1c2VyIiwicmVzb2x2ZSIsImNyZWF0ZSIsImFjayIsImVyciIsImxlYXZlIiwibG9naW4iLCJ0aGVuIiwiYXV0aCIsImlzIiwicmVzdWx0IiwiX29uTG9naW4iLCJsb2dvdXQiLCJpc0xvZ2dlZEluIiwib25Mb2dpbiIsImZuIiwiQXV0aGVudGljYXRpb24iLCJDb25maWciLCJ0YWJ1bGF0b3IiLCJERVZfSU5ERVhFUiIsImluZGV4ZXIiLCJvd25lciIsInVwZGF0ZSIsImNvbXBvc2UiLCJtYXAiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiQ09NTUFORF9SRSIsIlBSRUZJWCIsIlNPVUxfREVMSU1FVEVSIiwiTElTVElOR19TSVpFIiwiTUFYX0hBU0hfU0laRSIsIk1BWF9QT1dfTk9OQ0VfU0laRSIsIk1BWF9UT1BJQ19TSVpFIiwiTUFYX0FVVEhPUl9BTElBU19TSVpFIiwiTUFYX0FVVEhPUl9JRF9TSVpFIiwiTUFYX1VSTF9TSVpFIiwiTUFYX0RPTUFJTl9TSVpFIiwiTUFYX1RISU5HX0tJTkRfU0laRSIsIk1BWF9USElOR19USVRMRV9TSVpFIiwiTUFYX1RISU5HX0JPRFlfU0laRSIsIk1BWF9MSVNUSU5HX0lEU19TSVpFIiwiTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUiLCJNQVhfTElTVElOR19UQUJTX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUiLCJERUZBVUxUX0lOREVYRVIiLCJDb25zdGFudHMiLCJzb3VsIiwicGF0aE9yIiwic3RhdGUiLCJsYXRlc3QiLCJsYXN0Iiwic29ydEJ5IiwiaWRlbnRpdHkiLCJ2YWx1ZXMiLCJlZGdlcyIsInByb3AiLCJkZWNvZGVTRUEiLCJyYXdEYXRhIiwiZGF0YSIsInBhdGgiLCJHdW4iLCJTRUEiLCJpbmRleE9mIiwid2l0aG91dCIsImtleXMiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJyZWR1Y2UiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsInQiLCJxdWVyeSIsIm11bHRpVG9waWMiLCJkb21haW5Tb3VyY2UiLCJkb21haW5zIiwibGVuZ3RoIiwiZCIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsImlkIiwibXVsdGlBdXRob3IiLCJjdXJhdG9yU291cmNlIiwiY3VyYXRvcnMiLCJjdXJhdGUiLCJpZHMiLCJ0aGluZ0lkIiwiVGhpbmciLCJyb3V0ZSIsInJldmVyc2UiLCJvcFNvdXJjZSIsInN1Ym1pc3Npb25JZHMiLCJtdWx0aVN1Ym1pc3Npb24iLCJyZXBsaWVzU291cmNlIiwicmVwbGllc1RvQXV0aG9yIiwicmVwbGllc1RvQXV0aG9ySWQiLCJzb3VyY2VzIiwibGlzdGluZyIsInJlcGxpZXMiLCJvcCIsImN1cmF0b3IiLCJhdXRob3IiLCJkb21haW4iLCJ0b3BpYyIsInNvdXJjZU5hbWVzIiwic291cmNlTmFtZSIsImRlZiIsImZyb21EZWZpbml0aW9uIiwibmFtZSIsIm1lcmdlTGVmdCIsIkxpc3RpbmdEYXRhU291cmNlIiwiZnJvbVNvdXJjZSIsInNvdXJjZSIsIm93bmVySWQiLCJzcGFjZU5hbWUiLCJ0b2tlbml6ZWQiLCJ0b2tlbml6ZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsInB1c2giLCJhZGRWb3RlRmlsdGVyIiwiaWRlbnRpY2FsIiwic3BsaXQiLCJraW5kIiwidGVzdCIsImFsaWFzIiwiYXV0aG9ySWQiLCJsdGUiLCJndGUiLCJ0aGluZyIsImNtZHMiLCJ0YWdOYW1lIiwiY29udGVudEZpbHRlciIsInZvdGVGaWx0ZXIiLCJ0aGluZ0ZpbHRlciIsImdldEZpbHRlcmVkSWRzIiwic29ydGVkUm93cyIsImxpbWl0IiwiY291bnQiLCJhZnRlciIsImZpbHRlckZuIiwicm93cyIsInNsaWNlIiwiZmlsdGVyZWQiLCJmZXRjaEJhdGNoIiwic2l6ZSIsIlByb21pc2UiLCJyb3ciLCJpbkxpc3RpbmciLCJQT1NfSUQiLCJzcGxpY2UiLCJQT1NfVkFMIiwic3BlYyIsInRoaW5nTWV0YSIsInRoaW5nU291bCIsInNjb3JlcyIsIkxpc3RpbmdGaWx0ZXIiLCJQT1NfSURYIiwicm93c1RvSWRzIiwicm93c1RvSXRlbXMiLCJwcm9wT3IiLCJzb3VsRnJvbVBhdGgiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwicGFyc2VGbG9hdCIsInRyaW0iLCJpdGVtS2V5cyIsImZpbHRlciIsInNvcnRSb3dzIiwic29ydFdpdGgiLCJhc2NlbmQiLCJjb25kIiwiaXNOaWwiLCJJbmZpbml0eSIsIlQiLCJzb3J0ZWRJZHMiLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImpvaW4iLCJpbnNlcnRlZCIsInBvcCIsInJlcGxhY2VkIiwiY29uc29sZSIsImxvZyIsImNhdGVnb3JpemVEaWZmIiwib3JpZ2luYWwiLCJhbGxLZXlzIiwiX2RpZmZJZHgiLCJkaWZmSWQiLCJfb3JpZ0lkeCIsIm9yaWdJZCIsInVuaW9uUm93cyIsInVuaXFCeSIsInJvd3NGcm9tU291bHMiLCJyZWFkIiwiTGlzdGluZ05vZGUiLCJ1cGRhdGVMaXN0aW5nIiwib3JjIiwibmV3U2NvcGUiLCJ0b0l0ZW1zIiwid3JpdGUiLCJvblB1dCIsInVwZGF0ZWRTb3VsIiwidXBkYXRlZElkcyIsIlRoaW5nVm90ZUNvdW50cyIsIm1hdGNoIiwiaXNTdGlja3kiLCJlcXVhbHMiLCJnZXRBY2Nlc3NlcyIsImxpc3RlbiIsIkxpc3RpbmdPcmFjbGUiLCJmcm9tU3BlYyIsInBhdGhzIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsImNhbGN1bGF0ZSIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIkRhdGUiLCJnZXRUaW1lIiwib2xkIiwiYWN0aXZlIiwidGltZXN0YW1wIiwibGFzdEFjdGl2ZSIsInRvcCIsIngiLCJjb21tZW50cyIsImRpc2N1c3NlZCIsInNjb3JlIiwic2Vjb25kcyIsIm9yZGVyIiwiTWF0aCIsImxvZzEwIiwibWF4IiwiYWJzIiwiaG90Iiwic2lnbiIsImJlc3QiLCJ1cHMiLCJkb3ducyIsIm4iLCJ6IiwibGVmdCIsInJpZ2h0Iiwic3FydCIsInVuZGVyIiwiY29udHJvdmVyc2lhbCIsIm1hZ25pdHVkZSIsImJhbGFuY2UiLCJ0b0l0ZW0iLCJmcm9tVGhpbmdTZXRzIiwicGlwZSIsInVuaW9uIiwiTGlzdGluZ1NvcnQiLCJhcHBseSIsImFwIiwib2YiLCJhc3NvYyIsImdldFNvdXJjZSIsImV4dHJhIiwid2lraVBhZ2UiLCJib2R5IiwiTGlzdGluZ1NwZWMiLCJDb21tZW50TGlzdGluZyIsIndpdGhSb3V0ZSIsInNwbGl0VG9waWNzIiwidGFiIiwiRG9tYWluTGlzdGluZyIsImRpZmZEYXRhIiwidXBkYXRlZEF1dGhvcmVkIiwib3BJZCIsIlRoaW5nQ29tbWVudHMiLCJyZXBseUlkcyIsIkluYm94TGlzdGluZyIsIlByb2ZpbGVMaXN0aW5nIiwicm91dGVQcm9wcyIsIlNwYWNlTGlzdGluZyIsImdldFJvd3NGcm9tU291bHMiLCJvcmlnaW5hbERhdGEiLCJyZW1vdmVkSWRzIiwidm90ZUNvdW50c01hdGNoIiwidGhpbmdNYXRjaCIsIlRoaW5nRGF0YVNpZ25lZCIsImF1dGhvck1hdGNoIiwiU0VBQXV0aG9yIiwiZnJvbVBhZ2VJZCIsImV4aXN0aW5nS2V5cyIsIndvcmsiLCJtZXRob2QiLCJwcmlvcml0eSIsInN1Ym1pdFRvIiwiVG9waWNMaXN0aW5nIiwidHlwZXMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJkZWZhdWx0VG8iLCJQYXRoIiwic3BhY2VDb25maWdQYWdlTmFtZSIsInNvdXJjZVdpdGhEZWZhdWx0cyIsImdldENvbmZpZyIsIlNwYWNlU3BlYyIsIkxpc3RpbmciLCJpbml0IiwiY29uZmlnIiwibGVlY2giLCJkaXNhYmxlVmFsaWRhdGlvbiIsIm5vR3VuIiwibG9jYWxTdG9yYWdlIiwicGVyc2lzdCIsInJlc3QiLCJjZmciLCJyYWRpc2siLCJvbiIsImd1bldpcmVJbnB1dCIsInN0b3JlRm4iLCJzdG9yZSIsImEiLCJyZXRyeSIsInNlbmRMZWVjaCIsIl8iLCJjcmVhdGVTY29wZSIsInN1Ym1pdCIsImNvbW1lbnQiLCJjaGF0Iiwid3JpdGVQYWdlIiwidm90ZSIsInF1ZXJpZXMiLCJQZWVyIiwiZW1wdHlQcm9taXNlIiwidW5pb25BcnJheXMiLCJ0b3BpY1NvdWxzIiwicGFyYW1zIiwiZGF5cyIsImRheVN0cmluZ3MiLCJvbmVEYXkiLCJzdGFydCIsImRheVN0ciIsIk9iamVjdCIsInRvcGljTmFtZSIsImRzIiwic2luZ2xlVG9waWMiLCJ0U291bHMiLCJpdGVtTWF4IiwiZmV0Y2hNb3JlIiwidG9waWNTb3VsIiwibW9yZSIsInNpbmdsZURvbWFpbiIsIkRvbWFpbiIsImRvbWFpbk5hbWUiLCJzaW5nbGVBdXRob3IiLCJzdWJtaXNzaW9ucyIsImxpc3RpbmdJZHMiLCJzaW5nbGVMaXN0aW5nIiwiYXV0aG9yZWRTb3VscyIsImF1dGhvcmVkU291bCIsInNpbmdsZVN1Ym1pc3Npb24iLCJUaGluZ0FsbENvbW1lbnRzIiwic3VibWlzc2lvbklkIiwicHJlcGVuZCIsIm1ldGEiLCJyZXBseVRvU291bCIsIm9wU291bCIsInRoaW5naWQiLCJyZXBseVRvSWQiLCJ0aGluZ1ZvdGVDb3VudCIsInZvdGVUeXBlIiwidGhpbmdWb3Rlc1VwIiwidGhpbmdWb3Rlc0Rvd24iLCJ0aGluZ0FsbENvbW1lbnRzQ291bnQiLCJjb21wdXRlVGhpbmdTY29yZXMiLCJ1cCIsImRvd24iLCJ2b3RlcyIsIm11bHRpVGhpbmdNZXRhIiwicHJvbWlzZXMiLCJtdWx0aVF1ZXJ5Iiwic2luZ2xlUXVlcnkiLCJwbHVyYWwiLCJzaW5nbGUiLCJjb2xsYXRlIiwiaXRlbXMiLCJ0aGluZ0RhdGFGcm9tU291bHMiLCJjdXJhdGVkIiwic3VibWlzc2lvbk9ubHkiLCJpZHMxIiwiaWRzMiIsInRoaW5nU2NvcmVzIiwidGhpbmdSZXBsaWVzIiwidGhpbmdEYXRhIiwidXNlclBhZ2VzIiwiQXV0aG9yUGFnZXMiLCJ3aWtpUGFnZUlkIiwidXNlck1ldGEiLCJ1c2VyQWxpYXMiLCJjcmVhdGVkQXQiLCJuYWIiLCJRdWVyeSIsImRlZmluaXRpb25zIiwic2VhIiwiQVVUSF9TQ0hFTUEiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJUb3BpY0RheSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwYXR0ZXJuIiwicHJvcGVydGllcyIsIiRyZWYiLCJ5ZWFyIiwibWluaW11bSIsIm1heGltdW0iLCJtb250aCIsImRheSIsInJlcXVpcmVkIiwicHJvcHNGcm9tU291bCIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZWRnZU1hdGNoZXNLZXkiLCJhbnlPZiIsIlRvcGljIiwidXJsIiwiVVJMIiwiYWxsT2YiLCJ0aGluZ0tpbmQiLCJvcmlnaW5hbEhhc2giLCJvbmVPZiIsInRoaW5nUmVsYXRlZEVkZ2UiLCJhbGxjb21tZW50cyIsInZvdGVzdXAiLCJ2b3Rlc2Rvd24iLCJyZXBseVRvIiwidGhpbmdIYXNoTWF0Y2hlc1NvdWwiLCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmciLCJ0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoIiwiaXNMZWdhY3lUaGluZyIsIlByb29mT2ZXb3JrVm90ZXMiLCIkYXN5bmMiLCJrZXlzQXJlUHJvb2ZzT2ZXb3JrIiwiYWxnb3JpdGhtIiwiY29tcGxleGl0eSIsImhhc2hMZW5ndGgiLCJ0aW1lQ29zdCIsIm1lbW9yeUNvc3QiLCJwYXJhbGxlbGlzbSIsIlRoaW5nVm90ZXNVcCIsIlRoaW5nVm90ZXNEb3duIiwiVGhpbmdEYXRhIiwidGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsIiwiY29tbWFuZHMiLCJMaXN0aW5nRGF0YSIsInVzZXJJZCIsImlzQ2hhdCIsInBhdHRlcm5Qcm9wZXJ0aWVzIiwic29ydE5hbWUiLCJlbnVtIiwiVGhpbmdDb21tZW50c0xpc3RpbmciLCJ1c2VyTGlzdGluZ1R5cGUiLCJBdXRob3JSZXBsaWVzTGlzdGluZyIsIkF1dGhvclByb2ZpbGVMaXN0aW5nIiwiQXV0aG9yQ29tbWVudHMiLCJBdXRob3JTdWJtaXNzaW9ucyIsIkF1dGhvclRoaW5ncyIsInJvdXRlcyIsImRlZnNXaXRoUm91dGVzIiwiU2NoZW1hIiwidXJsU3RyIiwiaG9zdCIsInNjaGVtZSIsInJlcGxhY2UiLCJUaGluZ0RhdGFOb2RlIiwiYmluZCIsImRpc3NvYyIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJkYXlOdW0iLCJnZXRVVENEYXRlIiwiVGhpbmdTZXQiLCJwdXQiLCJkYXRhU291bCIsIm1ldGFEYXRhIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsInB1YiIsInRoaW5nc1NvdWwiLCJzdWJtaXNzaW9uc1NvdWwiLCJ0aGluZ3MiLCJzZXQiLCJjb21tZW50c1NvdWwiLCJyZWplY3QiLCJwYWdlc1NvdWwiLCJjaGFpbiIsIm5vbmNlIiwidG9waWNQcmVmaXhlcyIsImNoYXRtc2ciLCJyZWN2IiwidGQiLCJvZmYiLCJ0b3BpY1ByZWZpeCIsImJhc2VUb3BpY05hbWUiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInVybEluZm8iLCJ1cmxOb2RlIiwidG9rZW5NYXAiLCJsaW5lIiwidG9rZW5zIiwiYXNzb2NQYXRoIiwiY2hlY2siLCJrZXlzSW4iLCJnZXRMYXN0VmFsdWUiLCJuZXh0IiwicGFpcnMiLCJUb2tlbml6ZXIiLCJzY2hlbWEiLCJuZXdlc3QiLCJfc2NoZW1hIiwic3Vic3RyIiwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyIsInNpZ25lZElkIiwiZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlIiwiYWp2Iiwibm9kZVR5cGVOYW1lIiwiX3BTY2hlbWEiLCJfY1BhdGgiLCJwYXJlbnREYXRhIiwicHJvcFRoaW5nSWQiLCJjb21waWxlIiwidGhpbmdEYXRhSGFzaE1hdGNoZXMiLCJyZWNvcmQiLCJpc1ZvdGVWYWxpZCIsImFyZ29uMiIsInByZWZpeCIsIkJ1ZmZlciIsImhhc093blByb3BlcnR5IiwiZnJvbSIsInNhbHQiLCJoYXNoIiwicmF3IiwibWFzayIsInJlcXVpcmUiLCJFcnJvciIsImluaXRBanYiLCJhZGRLZXl3b3JkIiwidmFsaWRhdGUiLCJtb2RpZnlpbmciLCJzdXBwcmVzc29yIiwiY29udGV4dCIsIndpcmVJbnB1dCIsIm1zZyIsInByb21pc2UiLCJ2YWxpZGF0ZWQiLCJ0byIsImNhdGNoIiwiZXJyb3IiLCJzdGFjayIsIlZhbGlkYXRpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVB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T3hCRSxhQUFXLEVBQVhBLFdBUHdCO0FBUXhCL0YscUJBQW1CLEVBQW5CQSxtQkFSd0I7QUFTeEIyRyxTQUFPLEVBQVBBLE9BVHdCO0FBVXhCSSxZQUFVLEVBQVZBLFVBVndCO0FBV3hCMU8sY0FBWSxFQUFaQTtBQVh3QixDQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TVA7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2VBQ2UsV0FBS1gsSTs7Ozs7Ozs7Ozs7O0FDUnBCLG9EOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG9EIiwiZmlsZSI6Im5vdGFidWctcGVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJub3RhYnVnLXBlZXJcIiwgW1wiYXJnb24yXCIsIFwiZ3VuLXNjb3BlXCIsIFwiZ3VuLXN1cHByZXNzb3JcIiwgXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIsIFwib2JqZWN0LWhhc2hcIiwgXCJyYW1kYVwiLCBcInJvdXRlLXBhcnNlclwiLCBcInVyaS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcmdvbjJcIl0sIHJvb3RbXCJndW4tc2NvcGVcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3NvclwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yLXNlYXJcIl0sIHJvb3RbXCJvYmplY3QtaGFzaFwiXSwgcm9vdFtcInJhbWRhXCJdLCByb290W1wicm91dGUtcGFyc2VyXCJdLCByb290W1widXJpLWpzXCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5cbmNvbnN0IHNpZ251cCA9IFIuY3VycnkoXG4gIChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQsIG9wdHMgPSB7fSkgPT5cbiAgICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IHBlZXIudXNlcigpO1xuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICB1c2VyLmNyZWF0ZShcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBhY2sgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWNrLmVycikge1xuICAgICAgICAgICAgICAgIGZhaWwoYWNrLmVycik7XG4gICAgICAgICAgICAgICAgdXNlci5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgIHBlZXIuZ3VuLnVzZXIoKS5sZWF2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZXIubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKS50aGVuKG9rKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdHNcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICB9XG4gICAgfSlcbik7XG5cbmNvbnN0IGxvZ2luID0gUi5jdXJyeSgocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkKSA9PlxuICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICBjb25zdCB1c2VyID0gcGVlci51c2VyKCk7XG5cbiAgICAgIHVzZXIuYXV0aCh1c2VybmFtZSwgcGFzc3dvcmQsIGFjayA9PlxuICAgICAgICBhY2suZXJyID8gZmFpbChhY2suZXJyKSA6IG9rKHBlZXIudXNlcigpLmlzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgIH1cbiAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgIHBlZXIuX29uTG9naW4gJiYgcGVlci5fb25Mb2dpbihyZXN1bHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IGxvZ291dCA9IHBlZXIgPT4gcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG5jb25zdCBpc0xvZ2dlZEluID0gcGVlciA9PiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyICYmIHBlZXIudXNlcigpLmlzO1xuY29uc3Qgb25Mb2dpbiA9IFIuY3VycnkoKHBlZXIsIGZuKSA9PiAocGVlci5fb25Mb2dpbiA9IGZuKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZXhwb3J0IGNvbnN0IEF1dGhlbnRpY2F0aW9uID0ge1xuICBzaWdudXAsXG4gIGxvZ2luLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIG9uTG9naW5cbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBDb25maWcgPSB7XG4gIHRhYnVsYXRvcjogQ29uc3RhbnRzLkRFVl9JTkRFWEVSLFxuICBpbmRleGVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIG93bmVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIHVwZGF0ZTogUi5jb21wb3NlKFxuICAgIFIubWFwKChba2V5LCB2YWxdKSA9PiAoQ29uZmlnW2tleV0gPSB2YWwpKSxcbiAgICBSLnRvUGFpcnNcbiAgKVxufTtcbiIsImNvbnN0IENPTU1BTkRfUkUgPSAvXiB7NH1+LztcbmNvbnN0IFBSRUZJWCA9IFwibmFiXCI7XG5jb25zdCBTT1VMX0RFTElNRVRFUiA9IFwifH5+fFwiO1xuXG5jb25zdCBMSVNUSU5HX1NJWkUgPSAxMDAwO1xuXG5jb25zdCBNQVhfSEFTSF9TSVpFID0gNjQ7XG5jb25zdCBNQVhfUE9XX05PTkNFX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9UT1BJQ19TSVpFID0gNDI7XG5jb25zdCBNQVhfQVVUSE9SX0FMSUFTX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfQVVUSE9SX0lEX1NJWkUgPSAxMjg7IC8vID8/P1xuY29uc3QgTUFYX1VSTF9TSVpFID0gMjA0ODtcbmNvbnN0IE1BWF9ET01BSU5fU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9USElOR19LSU5EX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9USElOR19USVRMRV9TSVpFID0gMzAwO1xuY29uc3QgTUFYX1RISU5HX0JPRFlfU0laRSA9IDUwMDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19JRFNfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1RBQlNfU0laRSA9IDUwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFID0gTUFYX0FVVEhPUl9JRF9TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSA9IDE2O1xuXG5jb25zdCBERUZBVUxUX0lOREVYRVIgPSBcIkNFeUtyRGQxeHlQWHBXU1YwME1ndm5aWTJWSkxIWGd6Q3ZoTWVEd0tUWUEueWpTcTBEeVh6emhCX1pYcl9EemZKZ2lqM3RYVTAtM3QwUTViSkF0WnBqOFwiO1xuY29uc3QgREVWX0lOREVYRVIgPSBcImwyblNlZGxTbHZvbVRxQ1lobVBuQU5vUUxYZTRzajVyUjJPckM3WXFQcFUuemltYVd3ZGxmeVRyVklUZ3dXb0RWZGJKUUtSZU9UcVY1ek5qVFJjLXlRQVwiO1xuXG5leHBvcnQgY29uc3QgQ29uc3RhbnRzID0ge1xuICBDT01NQU5EX1JFLFxuICBQUkVGSVgsXG4gIFNPVUxfREVMSU1FVEVSLFxuICBMSVNUSU5HX1NJWkUsXG4gIE1BWF9IQVNIX1NJWkUsXG4gIE1BWF9QT1dfTk9OQ0VfU0laRSxcbiAgTUFYX1RPUElDX1NJWkUsXG4gIE1BWF9BVVRIT1JfQUxJQVNfU0laRSxcbiAgTUFYX0FVVEhPUl9JRF9TSVpFLFxuICBNQVhfVVJMX1NJWkUsXG4gIE1BWF9ET01BSU5fU0laRSxcbiAgTUFYX1RISU5HX0tJTkRfU0laRSxcbiAgTUFYX1RISU5HX1RJVExFX1NJWkUsXG4gIE1BWF9USElOR19CT0RZX1NJWkUsXG4gIE1BWF9MSVNUSU5HX0lEU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VSQ0VfU0laRSxcbiAgTUFYX0xJU1RJTkdfVEFCU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSxcbiAgREVGQVVMVF9JTkRFWEVSLFxuICBERVZfSU5ERVhFUlxufTtcbiIsIi8qIGdsb2JhbHMgR3VuICovXG5pbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCBzb3VsID0gUi5wYXRoT3IoXCJcIiwgW1wiX1wiLCBcIiNcIl0pO1xuY29uc3Qgc3RhdGUgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0pO1xuXG5jb25zdCBsYXRlc3QgPSBSLmNvbXBvc2UoXG4gIFIubGFzdCxcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIudmFsdWVzLFxuICBzdGF0ZVxuKTtcblxuY29uc3QgZWRnZXMgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIucHJvcChcIiNcIikpLFxuICBSLnZhbHVlc1xuKTtcblxuZnVuY3Rpb24gZGVjb2RlU0VBKHJhd0RhdGEpIHtcbiAgY29uc3QgZGF0YSA9IHJhd0RhdGEgPyB7IC4uLnJhd0RhdGEgfSA6IHJhd0RhdGE7XG4gIGNvbnN0IHNvdWwgPSBSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpO1xuXG4gIGlmICghc291bCB8fCAhR3VuLlNFQSB8fCBzb3VsLmluZGV4T2YoXCJ+XCIpID09PSAtMSkgcmV0dXJuIHJhd0RhdGE7XG4gIFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpLmZvckVhY2goa2V5ID0+IHtcbiAgICBHdW4uU0VBLnZlcmlmeShcbiAgICAgIEd1bi5TRUEub3B0LnBhY2socmF3RGF0YVtrZXldLCBrZXksIHJhd0RhdGEsIHNvdWwpLFxuICAgICAgZmFsc2UsXG4gICAgICByZXMgPT4gKGRhdGFba2V5XSA9IEd1bi5TRUEub3B0LnVucGFjayhyZXMsIGtleSwgcmF3RGF0YSkpXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IEd1bk5vZGUgPSB7IHNvdWwsIHN0YXRlLCBsYXRlc3QsIGVkZ2VzLCBkZWNvZGVTRUEgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlLCBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuXG5jb25zdCBuZWVkc1Njb3JlcyA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInNvcnQgaG90XCIsXG4gICAgXCJzb3J0IHRvcFwiLFxuICAgIFwic29ydCBiZXN0XCIsXG4gICAgXCJzb3J0IGNvbnRyb3ZlcnNpYWxcIixcbiAgICBcInVwc1wiLFxuICAgIFwiZG93bnNcIixcbiAgICBcInNjb3JlXCIsXG4gICAgXCJjYW4gcmVtb3ZlXCJcbiAgXSk7XG5cbmNvbnN0IG5lZWRzRGF0YSA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInRvcGljXCIsXG4gICAgXCJkb21haW5cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidW5pcXVlIGJ5IGNvbnRlbnRcIixcbiAgICBcImtpbmRcIixcbiAgICBcInR5cGVcIixcbiAgICBcInJlcXVpcmUgc2lnbmVkXCIsXG4gICAgXCJyZXF1aXJlIGFub25cIixcbiAgICBcImFsaWFzXCIsXG4gICAgXCJiYW4gZG9tYWluXCIsXG4gICAgXCJiYW4gdG9waWNcIixcbiAgICBcImJhbiBhdXRob3JcIixcbiAgICBcImJhbiBhbGlhc1wiXG4gIF0pO1xuXG5jb25zdCBpdGVtc0Zyb21UaGluZ1NvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoXG4gICAgUi5tYXAoc291bCA9PiBMaXN0aW5nU29ydC5pdGVtRnJvbVNvdWwoc2NvcGUsIHNvdWwsIGRlZmluaXRpb24pLCBzb3VscylcbiAgKS50aGVuKExpc3RpbmdTb3J0LnNvcnRJdGVtcylcbik7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KChzY29wZSwgc291bHMsIGRlZmluaXRpb24pID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgIC50aGVuKFIucmVkdWNlKFIubWVyZ2VSaWdodCwge30pKVxuICAgIC50aGVuKFRoaW5nU2V0LnNvdWxzKVxuICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbGlzdGluZ3MgPSBSLnBhdGhPcihbXSwgW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwibGlzdGluZ3NcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGwgPT4gYCR7bH0vJHtzb3J0fWAsIGxpc3RpbmdzKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMgfTtcbn07XG5cbmNvbnN0IHRvcGljU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgdG9waWNzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInRvcGljc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKHQgPT4gYC90LyR7dH0vJHtzb3J0fWAsIHRvcGljcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVRvcGljKHNjb3BlLCB7IHRvcGljcywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGRvbWFpblNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGRvbWFpbnMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiZG9tYWluc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFkb21haW5zLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChkID0+IGAvZG9tYWluLyR7ZH0vJHtzb3J0fWAsIGRvbWFpbnMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlEb21haW4oc2NvcGUsIHsgZG9tYWlucywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGF1dGhvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGF1dGhvcklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJhdXRob3JzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIWF1dGhvcklkcy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9LyR7dHlwZX0vJHtzb3J0fWAsIGF1dGhvcklkcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aUF1dGhvcihzY29wZSwgeyB0eXBlLCBhdXRob3JJZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBjdXJhdG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgY3VyYXRvcnMgPSBSLnByb3AoXCJjdXJhdG9yc1wiLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWN1cmF0b3JzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vY29tbWVudGVkLyR7c29ydH1gLCBjdXJhdG9ycyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5jdXJhdGUoc2NvcGUsIGN1cmF0b3JzLCB0cnVlKVxuICAgICAgLnRoZW4oaWRzID0+IGlkcy5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpKVxuICAgICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBvcFNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IHN1Ym1pc3Npb25JZHMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwib3BzXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIXN1Ym1pc3Npb25JZHMubGVuZ3RoKSB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoXG4gICAgaWQgPT4gYC90aGluZ3MvJHtpZH0vY29tbWVudHMvJHtzb3J0fWAsXG4gICAgc3VibWlzc2lvbklkc1xuICApO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlTdWJtaXNzaW9uKHNjb3BlLCB7IHN1Ym1pc3Npb25JZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCByZXBsaWVzU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgaWQgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwicmVwbGllc1RvXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC91c2VyLyR7aWR9L3JlcGxpZXMvJHt0eXBlfS8ke3NvcnR9YF07XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5yZXBsaWVzVG9BdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGUsXG4gICAgICByZXBsaWVzVG9BdXRob3JJZDogaWQsXG4gICAgICBpbmRleGVyOiBkZWZpbml0aW9uLmluZGV4ZXJcbiAgICB9KS50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgc291cmNlcyA9IHtcbiAgbGlzdGluZzogbGlzdGluZ1NvdXJjZSxcbiAgcmVwbGllczogcmVwbGllc1NvdXJjZSxcbiAgb3A6IG9wU291cmNlLFxuICBjdXJhdG9yOiBjdXJhdG9yU291cmNlLFxuICBhdXRob3I6IGF1dGhvclNvdXJjZSxcbiAgZG9tYWluOiBkb21haW5Tb3VyY2UsXG4gIHRvcGljOiB0b3BpY1NvdXJjZVxufTtcblxuY29uc3Qgc291cmNlTmFtZXMgPSBSLmtleXMoc291cmNlcyk7XG5jb25zdCBzb3VyY2VOYW1lID0gZGVmID0+IFIuZmluZChkZWYuaXNQcmVzZW50LCBzb3VyY2VOYW1lcykgfHwgXCJ0b3BpY1wiO1xuY29uc3QgZnJvbURlZmluaXRpb24gPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbmFtZSA9IHNvdXJjZU5hbWUoZGVmaW5pdGlvbik7XG5cbiAgcmV0dXJuIFIubWVyZ2VMZWZ0KHsgbmFtZSB9LCBzb3VyY2VzW25hbWVdKGRlZmluaXRpb24pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRGF0YVNvdXJjZSA9IHtcbiAgZnJvbURlZmluaXRpb24sXG4gIHNvdXJjZXMsXG4gIG5lZWRzU2NvcmVzLFxuICBuZWVkc0RhdGEsXG4gIGl0ZW1zRnJvbVRoaW5nU2V0cyxcbiAgaXRlbXNGcm9tVGhpbmdTb3Vsc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSAoc291cmNlLCBvd25lcklkID0gbnVsbCwgc3BhY2VOYW1lID0gbnVsbCkgPT4ge1xuICBjb25zdCB0b2tlbml6ZWQgPSBUb2tlbml6ZXIudG9rZW5pemUoc291cmNlKTtcbiAgY29uc3Qgb2JqID0geyAuLi50b2tlbml6ZWQgfTtcbiAgY29uc3QgeyBpc1ByZXNlbnQsIGdldFZhbHVlLCBnZXRWYWx1ZXMsIGdldFZhbHVlQ2hhaW4sIGdldFBhaXJzIH0gPSB0b2tlbml6ZWQ7XG5cbiAgW1xuICAgIG9iai5mcm9tUGFnZUF1dGhvciA9IG93bmVySWQsXG4gICAgb2JqLmZyb21QYWdlTmFtZSA9IHNwYWNlTmFtZSA/IGBzcGFjZToke3NwYWNlTmFtZX1gIDogdW5kZWZpbmVkXG4gIF0gPSBnZXRWYWx1ZUNoYWluKFwic291cmNlZCBmcm9tIHBhZ2VcIik7XG4gIG9iai5kaXNwbGF5TmFtZSA9IHRva2VuaXplZC5nZXRWYWx1ZShcIm5hbWVcIikgfHwgc3BhY2VOYW1lO1xuICBvYmouaW5kZXhlciA9IGdldFZhbHVlKFwidGFidWxhdG9yXCIpIHx8IENvbmZpZy5pbmRleGVyO1xuICBvYmoudGFidWxhdG9yID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgb2JqLmluZGV4ZXI7XG4gIG9iai50YWJzID0gZ2V0UGFpcnMoXCJ0YWJcIik7XG4gIG9iai5zb3J0ID0gZ2V0VmFsdWUoXCJzb3J0XCIpO1xuICBvYmoudW5pcXVlQnlDb250ZW50ID0gISFpc1ByZXNlbnQoXCJ1bmlxdWUgYnkgY29udGVudFwiKTtcbiAgb2JqLmN1cmF0b3JzID0gZ2V0VmFsdWVzKFwiY3VyYXRvclwiKTtcbiAgb2JqLm1vZGVyYXRvcnMgPSBnZXRWYWx1ZXMoXCJtb2RcIik7XG4gIG9iai5pbmNsdWRlUmFua3MgPSAhIWlzUHJlc2VudChcInNob3cgcmFua3NcIik7XG4gIG9iai5zdGlja3lJZHMgPSBnZXRWYWx1ZXMoXCJzdGlja3lcIik7XG4gIG9iai5pc0lkU3RpY2t5ID0gaWQgPT4gISF0b2tlbml6ZWQuaXNQcmVzZW50KFtcInN0aWNreVwiLCBpZF0pO1xuICBvYmouc3VibWl0VG9waWNzID0gZ2V0VmFsdWVzKFwic3VibWl0IHRvXCIpO1xuICBvYmouc3VibWl0VG9waWMgPSBnZXRWYWx1ZShcInN1Ym1pdCB0b1wiKTtcbiAgb2JqLmNoYXRUb3BpYyA9IGdldFZhbHVlKFwiY2hhdCBpblwiKTtcblxuICBpZiAob3duZXJJZCAmJiBzcGFjZU5hbWUpIHtcbiAgICBvYmouc3BhY2VOYW1lID0gc3BhY2VOYW1lO1xuICAgIG9iai5vd25lciA9IG93bmVySWQ7XG4gICAgb2JqLnVzZUZvckNvbW1lbnRzID0gIXRva2VuaXplZC5pc1ByZXNlbnQoXCJjb21tZW50cyBsZWF2ZSBzcGFjZVwiKTtcbiAgICBvYmoucGF0aCA9IGAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke3NwYWNlTmFtZX1gO1xuICAgIG9iai5kZWZhdWx0VGFiID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpO1xuICAgIG9iai5kZWZhdWx0VGFiUGF0aCA9IG9iai5kZWZhdWx0VGFiXG4gICAgICA/IHRva2VuaXplZC5nZXRWYWx1ZShbXCJ0YWJcIiwgb2JqLmRlZmF1bHRUYWJdKVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgb2JqLmZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICBhbGxvdzoge1xuICAgICAgcmVwbGllc1RvOiBnZXRWYWx1ZShcInJlcGxpZXMgdG8gYXV0aG9yXCIpLFxuICAgICAgdHlwZTogZ2V0VmFsdWUoXCJ0eXBlXCIpLCAvLyBUT0RPOiB0aGlzIGZpZWxkIHNlZW1zIHJlZHVuZGFudCB3aXRoIGtpbmQgYW5kIHNob3VsZCBiZSBkZXByZWNhdGVkXG4gICAgICBvcHM6IGdldFZhbHVlcyhcIm9wXCIpLFxuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcInRvcGljXCIpLFxuICAgICAgbGlzdGluZ3M6IGdldFZhbHVlcyhcImxpc3RpbmdcIiksXG4gICAgICBraW5kczogZ2V0VmFsdWVzKFwia2luZFwiKSxcbiAgICAgIGFub246ICFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKVxuICAgIH0sXG4gICAgZGVueToge1xuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYmFuIGFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYmFuIGF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImJhbiBkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcImJhbiB0b3BpY1wiKSxcbiAgICAgIGFub246ICEhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICEhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpLFxuICAgICAgdGFnczogZ2V0UGFpcnMoXCJjYW4gcmVtb3ZlXCIpXG4gICAgfVxuICB9O1xuXG4gIG9iai52b3RlRmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIHVwc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHVwc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWluOiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNaW46IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGJlbG93XCIpLCAxMCkgfHwgbnVsbFxuICB9O1xuXG4gIG9iai5jZW5zb3JzID0gUi51bmlxKFIubWFwKFIucHJvcCgxKSwgb2JqLmZpbHRlcnMuZGVueS50YWdzKSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RlZmluaXRpb24gPSB7IGZyb21Tb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuXG5jb25zdCBpbnRQYXRoID0gcCA9PlxuICBSLmNvbXBvc2UoXG4gICAgcGFyc2VJbnQsXG4gICAgUi5wYXRoKHApXG4gICk7XG5cbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgZmlsdGVycywgdm90ZUZpbHRlcnMsIGlzUHJlc2VudCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0gW107XG4gIGNvbnN0IHZvdGVGaWx0ZXJGdW5jdGlvbnMgPSBbXTtcblxuICBjb25zdCBhZGRGaWx0ZXIgPSAoLi4uZm5zKSA9PiBmaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG4gIGNvbnN0IGFkZFZvdGVGaWx0ZXIgPSAoLi4uZm5zKSA9PiB2b3RlRmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImFsaWFzXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYXV0aG9yXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJkb21haW5cIiwgdF0pLCBUaGluZ0RhdGFOb2RlLmRvbWFpbik7XG5cbiAgaWYgKFxuICAgIGZpbHRlcnMuYWxsb3cudG9waWNzLmxlbmd0aCAmJlxuICAgICFSLmZpbmQoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIuaWRlbnRpY2FsKFwiYWxsXCIpLFxuICAgICAgICBSLmxhc3QsXG4gICAgICAgIFIuc3BsaXQoXCI6XCIpXG4gICAgICApLFxuICAgICAgZmlsdGVycy5hbGxvdy50b3BpY3NcbiAgICApXG4gIClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJ0b3BpY1wiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0pKTtcblxuICBpZiAoZmlsdGVycy5hbGxvdy5raW5kcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKGtpbmQgPT4gISFpc1ByZXNlbnQoW1wia2luZFwiLCBraW5kXSksIFIucGF0aChbXCJkYXRhXCIsIFwia2luZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy50eXBlID09PSBcImNvbW1hbmRzXCIpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLnRlc3QoQ29uc3RhbnRzLkNPTU1BTkRfUkUpLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImJvZHlcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAoZmlsdGVycy5kZW55LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGFsaWFzID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYWxpYXNcIiwgYWxpYXNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9yXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYXV0aG9ySWQgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhdXRob3JcIiwgYXV0aG9ySWRdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBkb21haW4gPT4gIWRvbWFpbiB8fCAhaXNQcmVzZW50KFtcImJhblwiLCBcImRvbWFpblwiLCBkb21haW5dKSxcbiAgICAgIFRoaW5nRGF0YU5vZGUuZG9tYWluXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS50b3BpY3MubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIHRvcGljID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwidG9waWNcIiwgdG9waWNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hbm9uKSBhZGRGaWx0ZXIoUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5kZW55LnNpZ25lZClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIGF1dGhvcklkID0+ICFhdXRob3JJZCxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmICh2b3RlRmlsdGVycy51cHNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy51cHNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnVwc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5kb3duc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLmRvd25zTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuc2NvcmVNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuc2NvcmVNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcblxuICBpZiAoZmlsdGVycy5kZW55LnRhZ3MubGVuZ3RoKVxuICAgIGFkZFZvdGVGaWx0ZXIodGhpbmcgPT4ge1xuICAgICAgY29uc3QgY21kcyA9IFIucGF0aChbXCJ2b3Rlc1wiLCBcImNvbW1hbmRzXCJdLCB0aGluZykgfHwge307XG5cbiAgICAgIHJldHVybiAhZmlsdGVycy5kZW55LnRhZ3MuZmluZChcbiAgICAgICAgKFt0YWdOYW1lLCBhdXRob3JJZF0pID0+ICEhUi5wYXRoKFthdXRob3JJZCwgXCJ0YWdcIiwgdGFnTmFtZV0sIGNtZHMpXG4gICAgICApO1xuICAgIH0pO1xuXG4gIGNvbnN0IGNvbnRlbnRGaWx0ZXIgPSB0aGluZyA9PiAhZmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHZvdGVGaWx0ZXIgPSB0aGluZyA9PiAhdm90ZUZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB0aGluZ0ZpbHRlciA9IHRoaW5nID0+IChjb250ZW50RmlsdGVyKHRoaW5nKSAmJiB2b3RlRmlsdGVyKHRoaW5nKSk7XG5cbiAgcmV0dXJuIHsgdGhpbmdGaWx0ZXIsIGNvbnRlbnRGaWx0ZXIsIHZvdGVGaWx0ZXIgfTtcbn07XG5cbmNvbnN0IGdldEZpbHRlcmVkSWRzID0gYXN5bmMgKFxuICBzY29wZSxcbiAgc29ydGVkUm93cyxcbiAgeyBsaW1pdCA9IDI1LCBjb3VudCA9IDAsIGFmdGVyID0gbnVsbCwgZmlsdGVyRm4gfSA9IHt9XG4pID0+IHtcbiAgY29uc3Qgcm93cyA9IHNvcnRlZFJvd3Muc2xpY2UoKTtcbiAgY29uc3QgZmlsdGVyZWQgPSBbXTtcbiAgY29uc3QgZmV0Y2hCYXRjaCA9IChzaXplID0gMzApID0+XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICBSLm1hcChhc3luYyByb3cgPT4ge1xuICAgICAgICBsZXQgaW5MaXN0aW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAoZmlsdGVyRm4pIGluTGlzdGluZyA9IGF3YWl0IGZpbHRlckZuKHJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKTtcbiAgICAgICAgaWYgKGluTGlzdGluZykgZmlsdGVyZWQucHVzaChyb3cpO1xuICAgICAgfSwgcm93cy5zcGxpY2UoY291bnQsIHNpemUpKVxuICAgICk7XG5cbiAgd2hpbGUgKHJvd3MubGVuZ3RoKSB7XG4gICAgYXdhaXQgZmV0Y2hCYXRjaCgpO1xuICAgIGlmIChsaW1pdCAmJiBmaWx0ZXJlZC5sZW5ndGggPj0gbGltaXQpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIFIuY29tcG9zZShcbiAgICBSLm1hcChSLnByb3AoTGlzdGluZ05vZGUuUE9TX0lEKSksXG4gICAgbGltaXQgPyBSLnNsaWNlKDAsIGxpbWl0KSA6IFIuaWRlbnRpdHksXG4gICAgUi5zb3J0QnkoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19WQUwpKVxuICApKGZpbHRlcmVkKTtcbn07XG5cbmNvbnN0IHRoaW5nRmlsdGVyID0gUi5jdXJyeSgoc2NvcGUsIHNwZWMsIHRoaW5nSWQpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSksXG4gICAgc2NvcmVzOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc1Njb3JlcyhzcGVjKSxcbiAgICBkYXRhOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc0RhdGEoc3BlYylcbiAgfSkudGhlbihzcGVjLnRoaW5nRmlsdGVyKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdGaWx0ZXIgPSB7IGZyb21EZWZpbml0aW9uLCBnZXRGaWx0ZXJlZElkcywgdGhpbmdGaWx0ZXIgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgW1BPU19JRFgsIFBPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMSwgMiwgM107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHJvd3NUb0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHJvd3NUb0l0ZW1zID0gUi5tYXAoUi5zbGljZSgxLCAzKSk7XG5jb25zdCBzb3VyY2UgPSBSLnByb3BPcihcIlwiLCBcInNvdXJjZVwiKTtcbmNvbnN0IHNvdWxGcm9tUGF0aCA9IFIuY3VycnkoKGluZGV4ZXIsIHBhdGgpID0+IGAke0NvbnN0YW50cy5QUkVGSVh9JHtwYXRofUB+JHtpbmRleGVyfS5gKTtcblxuY29uc3QgZ2V0Um93ID0gUi5jdXJyeSgobm9kZSwgaWR4KSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmluc2VydCgwLCBwYXJzZUludChpZHgsIDEwKSksIFIuYWx3YXlzKG51bGwpKSxcbiAgICByb3cgPT4ge1xuICAgICAgcm93WzFdID0gcGFyc2VGbG9hdChyb3dbMV0pO1xuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LFxuICAgIFIubWFwKFIudHJpbSksXG4gICAgUi5zcGxpdChcIixcIiksXG4gICAgUi5wcm9wT3IoXCJcIiwgYCR7aWR4fWApXG4gICkobm9kZSlcbik7XG5cbmNvbnN0IGl0ZW1LZXlzID0gUi5jb21wb3NlKFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICB2YWwgPT4gISEodmFsID09PSAwIHx8IHZhbCksXG4gICAgICBwYXJzZUludFxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCByb3dzID0gbm9kZSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5tYXAoZ2V0Um93KG5vZGUpKSxcbiAgICBpdGVtS2V5c1xuICApKG5vZGUpO1xuXG5jb25zdCBpZHMgPSBSLmNvbXBvc2Uocm93c1RvSWRzLCByb3dzKTtcblxuY29uc3Qgc29ydFJvd3MgPSBSLnNvcnRXaXRoKFtcbiAgUi5hc2NlbmQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5jb25kKFtcbiAgICAgICAgW1IuaXNOaWwsIFIuYWx3YXlzKEluZmluaXR5KV0sXG4gICAgICAgIFtSLlQsIHBhcnNlRmxvYXRdXG4gICAgICBdKSxcbiAgICAgIFIucHJvcChQT1NfVkFMKVxuICAgIClcbiAgKVxuXSk7XG5cbmNvbnN0IHNvcnRlZElkcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIHJvd3Ncbik7XG5cbmNvbnN0IGRpZmYgPSBhc3luYyAoXG4gIG5vZGUsXG4gIHVwZGF0ZWRJdGVtcyA9IFtdLFxuICByZW1vdmVJZHMgPSBbXSxcbiAgeyBtYXhTaXplID0gMTAwMCB9ID0ge31cbikgPT4ge1xuICBjb25zdCByZW1vdmVkID0gUi5pbmRleEJ5KFIuaWRlbnRpdHksIHJlbW92ZUlkcyk7XG4gIGNvbnN0IGJ5SWQgPSB7fTtcbiAgY29uc3QgY2hhbmdlcyA9IHt9O1xuICBjb25zdCByb3dzID0gW107XG4gIGNvbnN0IHVwZGF0ZWQgPSB7fTtcbiAgbGV0IHRvUmVwbGFjZSA9IFtdO1xuICBsZXQgbWF4SWR4ID0gMDtcbiAgbGV0IGtleTtcblxuICBmb3IgKGtleSBpbiBub2RlIHx8IHt9KSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoa2V5LCAxMCk7XG5cbiAgICBpZiAoIShwYXJzZWQgfHwgcGFyc2VkID09PSAwKSkgY29udGludWU7XG4gICAgY29uc3Qgcm93ID0gZ2V0Um93KG5vZGUsIGtleSkgfHwgW3BhcnNlZCwgbnVsbCwgbnVsbF07XG4gICAgY29uc3QgW2lkeCwgaWQgPSBudWxsLCByYXdWYWx1ZSA9IG51bGxdID0gcm93OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICByb3dbUE9TX1ZBTF0gPSByYXdWYWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBwYXJzZUZsb2F0KHJhd1ZhbHVlKTtcbiAgICBpZiAoaWQgJiYgcmVtb3ZlZFtpZF0pIHJvd1tQT1NfSURdID0gcm93W1BPU19WQUxdID0gbnVsbDtcbiAgICBpZiAoaWQpIGJ5SWRbaWRdID0gcm93O1xuICAgIGlmIChyb3dbUE9TX0lEXSkge1xuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvUmVwbGFjZS5wdXNoKHJvdyk7XG4gICAgfVxuICAgIGlmIChpZHggPiBtYXhJZHgpIG1heElkeCA9IGlkeDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW2lkLCB2YWx1ZV0gPSB1cGRhdGVkSXRlbXNbaV0gfHwgW251bGwsIG51bGxdO1xuXG4gICAgaWYgKCFpZCkgY29udGludWU7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBieUlkW2lkXTtcblxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgaWYgKGV4aXN0aW5nW1BPU19WQUxdICE9PSB2YWx1ZSkge1xuICAgICAgICBleGlzdGluZ1tQT1NfVkFMXSA9IHZhbHVlO1xuICAgICAgICB1cGRhdGVkW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtudWxsLCBpZCwgdmFsdWVdO1xuXG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhbGxTb3J0ZWQgPSBzb3J0Um93cyhyb3dzKTtcbiAgY29uc3Qgc29ydGVkID0gbWF4U2l6ZSA/IGFsbFNvcnRlZC5zbGljZSgwLCBtYXhTaXplKSA6IGFsbFNvcnRlZDtcbiAgY29uc3QgbWlzc2luZyA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UobWF4U2l6ZSwgYWxsU29ydGVkLmxlbmd0aCkgOiBbXTtcbiAgY29uc3QgYWRkZWQgPSBSLmZpbHRlcihyb3cgPT4gcm93W1BPU19JRFhdID09PSBudWxsLCBzb3J0ZWQpO1xuXG4gIHRvUmVwbGFjZSA9IHRvUmVwbGFjZVxuICAgIC5jb25jYXQoUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSAhPT0gbnVsbCwgbWlzc2luZykpXG4gICAgLnJldmVyc2UoKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGlkID0gc29ydGVkW2ldW1BPU19JRF07XG4gICAgY29uc3QgaWR4ID0gc29ydGVkW2ldW1BPU19JRFhdO1xuICAgIGNvbnN0IHZhbCA9IHNvcnRlZFtpXVtQT1NfVkFMXTtcblxuICAgIGlmIChpZHggIT09IG51bGwgJiYgdXBkYXRlZFtpZF0pIGNoYW5nZXNbYCR7aWR4fWBdID0gW2lkLCB2YWxdLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgY29uc3QgaW5zZXJ0ZWQgPSBbXTtcblxuICB3aGlsZSAoYWRkZWQubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gYWRkZWQucG9wKCk7XG4gICAgY29uc3QgcmVwbGFjZWQgPSB0b1JlcGxhY2UucG9wKCk7XG4gICAgbGV0IFtpZHhdID0gcmVwbGFjZWQgfHwgW251bGxdO1xuXG4gICAgaWYgKGlkeCA9PT0gbnVsbCkge1xuICAgICAgaWR4ID0gcGFyc2VJbnQobWF4SWR4LCAxMCkgKyBpbnNlcnRlZC5sZW5ndGggKyAxO1xuICAgICAgaW5zZXJ0ZWQucHVzaChpZHgpO1xuICAgIH1cblxuICAgIGNoYW5nZXNbYCR7aWR4fWBdID0gW3Jvd1tQT1NfSURdLCByb3dbUE9TX1ZBTF1dLmpvaW4oXCIsXCIpO1xuICB9XG5cbiAgd2hpbGUgKHRvUmVwbGFjZS5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSB0b1JlcGxhY2UucG9wKCk7XG5cbiAgICBpZiAocm93ICYmICFyb3dbUE9TX0lEXSkge1xuICAgICAgY29uc3QgaWR4ID0gYCR7cm93W1BPU19JRFhdfWA7XG5cbiAgICAgIGlmIChub2RlW2lkeF0gIT09IG51bGwpIHtcbiAgICAgICAgY2hhbmdlc1tpZHhdID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coXCJudWxsaW5nXCIsIGlkeCwgbm9kZVtpZHhdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gUi5rZXlzKGNoYW5nZXMpLmxlbmd0aCA/IGNoYW5nZXMgOiBudWxsO1xufTtcblxuY29uc3QgY2F0ZWdvcml6ZURpZmYgPSAoZGlmZiwgb3JpZ2luYWwpID0+IHtcbiAgY29uc3QgYWxsS2V5cyA9IGl0ZW1LZXlzKFIubWVyZ2VMZWZ0KGRpZmYsIG9yaWdpbmFsKSk7XG4gIGNvbnN0IGFkZGVkID0gW107XG4gIGNvbnN0IHJlbW92ZWQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBhbGxLZXlzW2ldO1xuICAgIGNvbnN0IFtfZGlmZklkeCwgZGlmZklkXSA9IGdldFJvdyhkaWZmLCBrZXkpIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgY29uc3QgW19vcmlnSWR4LCBvcmlnSWRdID0gZ2V0Um93KG9yaWdpbmFsLCBrZXkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICBpZiAoZGlmZklkICE9PSBvcmlnSWQpIHtcbiAgICAgIGlmIChkaWZmSWQpIGFkZGVkLnB1c2goZGlmZklkKTtcbiAgICAgIGlmIChvcmlnSWQpIHJlbW92ZWQucHVzaChvcmlnSWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbYWRkZWQsIHJlbW92ZWRdO1xufTtcblxuY29uc3QgdW5pb25Sb3dzID0gUi5jb21wb3NlKFxuICBSLnVuaXFCeShSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLnJlZHVjZShSLmNvbmNhdCwgW10pLFxuICBSLm1hcChyb3dzKVxuKTtcblxuY29uc3Qgcm93c0Zyb21Tb3VscyA9IHF1ZXJ5KChzY29wZSwgc291bHMpID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKS50aGVuKHVuaW9uUm93cylcbik7XG5cbmNvbnN0IHJlYWQgPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgeyBpbmRleGVyID0gQ29uZmlnLmluZGV4ZXIgfSA9IG9wdHMgfHwge307XG5cbiAgcmV0dXJuIHJvd3NGcm9tU291bHMoc2NvcGUsIFtzb3VsRnJvbVBhdGgoaW5kZXhlciwgcGF0aCldKS50aGVuKHJvd3NUb0lkcyk7XG59LCBcImxpc3RpbmdSb3dzXCIpO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ05vZGUgPSB7XG4gIFBPU19JRFgsXG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc291cmNlLFxuICBnZXRSb3csXG4gIGl0ZW1LZXlzLFxuICByb3dzLFxuICBpZHMsXG4gIHJvd3NUb0lkcyxcbiAgcm93c1RvSXRlbXMsXG4gIHNvcnRSb3dzLFxuICBzb3J0ZWRJZHMsXG4gIHNvdWxGcm9tUGF0aCxcbiAgcm93c0Zyb21Tb3VscyxcbiAgcmVhZCxcbiAgZGlmZixcbiAgY2F0ZWdvcml6ZURpZmYsXG4gIHVuaW9uUm93c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IHVwZGF0ZUxpc3RpbmcgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHNjb3BlLFxuICBzcGVjLFxuICBpZHMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW11cbikgPT4ge1xuICBpZiAoIWlkcy5sZW5ndGggJiYgIXJlbW92ZUlkcy5sZW5ndGgpIHJldHVybjtcbiAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IGF3YWl0IExpc3RpbmdTb3J0LnRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYyk7XG4gIGNvbnN0IGNoYW5nZXMgPSBMaXN0aW5nTm9kZS5kaWZmKGV4aXN0aW5nLCB1cGRhdGVkSXRlbXMsIHJlbW92ZUlkcyk7XG5cbiAgaWYgKGNoYW5nZXMpIGNvbnNvbGUubG9nKFwiQ0hBTkdFU1wiLCByb3V0ZS5zb3VsLCBjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXMpIHJvdXRlLndyaXRlKGNoYW5nZXMpO1xufTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyBzb3J0LCB1cGRhdGVkU291bCwgZGlmZiB9KSA9PiB7XG4gIGxldCB1cGRhdGVkSWRzID0gW107XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGlzU3RpY2t5ID0gUi5lcXVhbHMocm91dGUubWF0Y2gudGhpbmdJZCB8fCBudWxsKTtcblxuICBpZiAodGhpbmdJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICB1cGRhdGVkSWRzID0gUi5jb25jYXQodXBkYXRlZElkcywgVGhpbmdTZXQuaWRzKEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpKSk7XG4gIGF3YWl0IHVwZGF0ZUxpc3Rpbmcob3JjLCByb3V0ZSwgc2NvcGUsIHNvcnQsIHVwZGF0ZWRJZHMsIFtdLCBpc1N0aWNreSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nT3JhY2xlID0ge1xuICB1cGRhdGVMaXN0aW5nLFxuICBvblB1dFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IGZyb21TcGVjID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3QgcGF0aHMgPSBSLnBhdGhPcihbXSwgW1wiZGF0YVNvdXJjZVwiLCBcImxpc3RpbmdQYXRoc1wiXSwgc3BlYyk7XG4gIGNvbnN0IHNvdWxzID0gUi5tYXAoXG4gICAgTGlzdGluZ05vZGUuc291bEZyb21QYXRoKG9wdHMuaW5kZXhlciB8fCBzcGVjLmluZGV4ZXIpLFxuICAgIHBhdGhzXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdOb2RlLnJvd3NGcm9tU291bHMoc2NvcGUsIHNvdWxzKS50aGVuKHJvd3MgPT5cbiAgICBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCByb3dzLCB7IC4uLm9wdHMsIGZpbHRlckZuIH0pXG4gICk7XG59KTtcblxuY29uc3QgZnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgdHlwZSA9IExpc3RpbmdUeXBlLmZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oc3BlYyA9PiB7XG4gICAgaWYgKHNwZWMuaGFzSW5kZXhlciAmJiAhb3B0cy5jYWxjdWxhdGUpIHtcbiAgICAgIGlmICghdHlwZSB8fCAhdHlwZS5yZWFkKSByZXR1cm4gTGlzdGluZ05vZGUucmVhZChzY29wZSwgcGF0aCwgb3B0cyk7XG4gICAgICByZXR1cm4gdHlwZS5yZWFkKHNjb3BlLCB0eXBlLm1hdGNoLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyb21TcGVjKHNjb3BlLCBzcGVjLCBvcHRzKTtcbiAgfSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdRdWVyeSA9IHsgZnJvbVNwZWMsIGZyb21QYXRoIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuXG5jb25zdCBbUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxXTtcbmNvbnN0IHRvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgc29ydEl0ZW1zID0gUi5zb3J0V2l0aChSLnByb3AoUE9TX1ZBTCkpO1xuXG5jb25zdCB2b3RlU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT4ge1xuICBpZiAoc3BlYy5pc0lkU3RpY2t5KHRoaW5nSWQpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuICBpZiAoUi5jb250YWlucyh0aGluZ0lkLCBzcGVjLmZpbHRlcnMuYWxsb3cub3BzKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcblxuICByZXR1cm4gUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICBzY29yZXM6IHRydWUsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihyZXMgPT4gZm4ocmVzLCBzcGVjKSk7XG59KTtcblxuY29uc3QgdGltZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihmbilcbik7XG5cbmNvbnN0IHNvcnRzID0ge1xuICBuZXc6IHRpbWVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubXVsdGlwbHkoLTEpLFxuICAgICAgdmFsID0+IHZhbCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIFIucHJvcChcInRpbWVzdGFtcFwiKVxuICAgIClcbiAgKSxcbiAgb2xkOiB0aW1lU29ydChSLnByb3AoXCJ0aW1lc3RhbXBcIikpLFxuICBhY3RpdmU6IHZvdGVTb3J0KFxuICAgICh7IHRpbWVzdGFtcCwgbGFzdEFjdGl2ZSB9KSA9PiAtMSAqIChsYXN0QWN0aXZlIHx8IHRpbWVzdGFtcClcbiAgKSxcbiAgdG9wOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VJbnQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSlcbiAgICApXG4gICksXG4gIGNvbW1lbnRzOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VGbG9hdCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0pXG4gICAgKVxuICApLFxuICBkaXNjdXNzZWQ6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuXG4gICAgaWYgKCFzY29yZSkgcmV0dXJuIDEwMDAwMDAwMDAgLSBzZWNvbmRzO1xuICAgIHJldHVybiAtMSAqIChvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBob3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcbiAgICBsZXQgc2lnbiA9IDA7XG5cbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICBzaWduID0gMTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlIDwgMCkge1xuICAgICAgc2lnbiA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gLTEgKiAoc2lnbiAqIG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGJlc3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgbiA9IHVwcyArIGRvd25zO1xuXG4gICAgaWYgKG4gPT09IDApIHJldHVybiAwO1xuICAgIGNvbnN0IHogPSAxLjI4MTU1MTU2NTU0NTsgLy8gODAlIGNvbmZpZGVuY2VcbiAgICBjb25zdCBwID0gdXBzIC8gbjtcbiAgICBjb25zdCBsZWZ0ID0gcCArICgxIC8gKDIgKiBuKSkgKiB6ICogejtcbiAgICBjb25zdCByaWdodCA9IHogKiBNYXRoLnNxcnQoKHAgKiAoMSAtIHApKSAvIG4gKyAoeiAqIHopIC8gKDQgKiBuICogbikpO1xuICAgIGNvbnN0IHVuZGVyID0gMSArICgxIC8gbikgKiB6ICogejtcblxuICAgIHJldHVybiAtMSAqICgobGVmdCAtIHJpZ2h0KSAvIHVuZGVyKTtcbiAgfSksXG4gIGNvbnRyb3ZlcnNpYWw6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG5cbiAgICBpZiAodXBzIDw9IDAgfHwgZG93bnMgPD0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbWFnbml0dWRlID0gdXBzICsgZG93bnM7XG4gICAgY29uc3QgYmFsYW5jZSA9IHVwcyA+IGRvd25zID8gZG93bnMgLyB1cHMgOiB1cHMgLyBkb3ducztcblxuICAgIHJldHVybiAtMSAqIG1hZ25pdHVkZSAqKiBiYWxhbmNlO1xuICB9KVxufTtcblxuY29uc3QgdG9JdGVtID0gcXVlcnkoXG4gIChzY29wZSwgaWQsIHNwZWMpID0+XG4gICAgKHNvcnRzW3NwZWMuc29ydF0gfHwgc29ydHMubmV3KShpZCwgc3BlYykudGhlbih2YWwgPT4gW2lkLCB2YWxdKVxuKTtcblxuY29uc3QgdG9JdGVtcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkcywgc3BlYykgPT4gYWxsKFIubWFwKFxuICAgIGlkID0+IHRvSXRlbShzY29wZSwgaWQsIHNwZWMpLFxuICAgIGlkc1xuICApKVxuKTtcblxuY29uc3QgZnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWxzLCBzcGVjKSA9PlxuICAgIGFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSlcbiAgICAgIC50aGVuKFIucGlwZShcbiAgICAgICAgVGhpbmdTZXQudW5pb24sXG4gICAgICAgIFRoaW5nU2V0LmlkcyxcbiAgICAgICAgaWRzID0+IHRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYylcbiAgICAgICkpXG4gICAgICAudGhlbihzb3J0SXRlbXMpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1NvcnQgPSB7XG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc29ydHMsXG4gIHRvSXRlbSxcbiAgdG9JdGVtcyxcbiAgdG9JZHMsXG4gIHNvcnRJdGVtcyxcbiAgZnJvbVRoaW5nU2V0c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuXG5jb25zdCBmcm9tU291cmNlID0gUi5jb21wb3NlKFxuICBSLmFwcGx5KFIubWVyZ2VMZWZ0KSxcbiAgUi5hcChbTGlzdGluZ0ZpbHRlci5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBSLmFwcGx5KFIuYXNzb2MoXCJkYXRhU291cmNlXCIpKSxcbiAgUi5hcChbTGlzdGluZ0RhdGFTb3VyY2UuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgTGlzdGluZ0RlZmluaXRpb24uZnJvbVNvdXJjZVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEgPSBcIlwiKSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIG5hbWUpXG4gICAgLnRoZW4oUi5jb21wb3NlKFxuICAgICAgYm9keSA9PiBgJHtib2R5fVxuIyBhZGRlZCBieSBpbmRleGVyXG4ke2V4dHJhIHx8IFwiXCJ9XG5zb3VyY2VkIGZyb20gcGFnZSAke2F1dGhvcklkfSAke25hbWV9XG5gLFxuICAgICAgVGhpbmdEYXRhTm9kZS5ib2R5XG4gICAgKSlcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU3BlYyA9IHsgZnJvbVNvdXJjZSwgZ2V0U291cmNlIH07XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydFwiO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCB7IHRoaW5nSWQsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjb21tZW50c1wiLFxuICAgIFtgb3AgJHt0aGluZ0lkfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgZ2V0U3BlYyB9KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL2RvbWFpbi86ZG9tYWluLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiwgc29ydCB9KSA9PiB7XG4gIGNvbnN0IGRvbWFpbnMgPSBQYXRoLnNwbGl0VG9waWNzKGRvbWFpbik7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6ZG9tYWluXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHtkb21haW5zWzBdfWAsXG4gICAgICBcInN1Ym1pdCB0byB3aGF0ZXZlclwiLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICBcImtpbmQgc3VibWlzc2lvblwiLFxuICAgICAgLi4uUi5tYXAoZG9tYWluID0+IGBkb21haW4gJHtkb21haW59YCwgZG9tYWlucyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL2RvbWFpbi8ke2RvbWFpbn0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IERvbWFpbkxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIHRhYnMsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi8uLi9UaGluZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvcmVwbGllZC86dHlwZS86c29ydFwiO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgPSBcIm5ld1wiIH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6aW5ib3hcIixcbiAgICBbYHJlcGxpZXMgdG8gYXV0aG9yICR7YXV0aG9ySWR9YCwgYHR5cGUgJHt0eXBlfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiB9XG4pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRBdXRob3JlZF0gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihkaWZmRGF0YSk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGxldCB1cGRhdGVkSWRzID0gVGhpbmdTZXQuaWRzKGRpZmZEYXRhKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRBdXRob3JlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wSWQgPSB1cGRhdGVkQXV0aG9yZWRbaV07XG4gICAgY29uc3QgcmVwbHlJZHMgPSBUaGluZ1NldC5pZHMoXG4gICAgICBhd2FpdCBzY29wZS5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkpLnRoZW4oKVxuICAgICk7XG5cbiAgICB1cGRhdGVkSWRzID0gdXBkYXRlZElkcy5jb25jYXQocmVwbHlJZHMpO1xuICB9XG5cbiAgaWYgKHVwZGF0ZWRJZHMubGVuZ3RoKVxuICAgIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10pO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTb3VyY2UsIGdldFNwZWMsIG9uUHV0IH0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvOnR5cGUvOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJvdmVydmlld1wiLCBcImNvbW1lbnRzXCIsIFwic3VibWl0dGVkXCIsIFwiY29tbWFuZHNcIl07XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnByb2ZpbGVcIixcbiAgICBbXG4gICAgICBgYXV0aG9yICR7YXV0aG9ySWR9YCxcbiAgICAgIGB0eXBlICR7dHlwZX1gLFxuICAgICAgXCJzdWJtaXQgdG8gd2hhdGV2ZXJcIixcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC91c2VyLyR7YXV0aG9ySWR9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgUHJvZmlsZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIHRhYnMsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBhbGwsIHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uLy4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4uL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4uL0xpc3RpbmdGaWx0ZXJcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4uL0xpc3RpbmdPcmFjbGVcIjtcbmltcG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuLi9TcGFjZVNwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkL3NwYWNlcy86bmFtZS86c29ydFwiO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNvdXJjZShzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGBzb3J0ICR7c29ydH1gKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gpID0+XG4gIGdldFNvdXJjZShzY29wZSwgbWF0Y2gpLnRoZW4oc291cmNlID0+XG4gICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShzb3VyY2UsIG1hdGNoLmF1dGhvcklkLCBtYXRjaC5uYW1lKVxuICApXG4pO1xuXG5jb25zdCBjYWxjdWxhdGUgPSBxdWVyeSgoc2NvcGUsIG1hdGNoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSA9IG1hdGNoO1xuICBjb25zdCByb3V0ZVByb3BzID0geyBhdXRob3JJZCwgbmFtZSwgc29ydCwgaW5kZXhlcjogQ29uZmlnLmluZGV4ZXIgfTtcbiAgY29uc3Qgc291bHMgPSBbU2NoZW1hLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHJvdXRlUHJvcHMpXTtcblxuICByZXR1cm4gYWxsKFtcbiAgICBnZXRTcGVjKHNjb3BlLCBtYXRjaCksXG4gICAgTGlzdGluZ05vZGUuZ2V0Um93c0Zyb21Tb3VscyhzY29wZSwgc291bHMpXG4gIF0pLnRoZW4oKFtzcGVjLCByb3dzXSkgPT4ge1xuICAgIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG5cbiAgICByZXR1cm4gTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZElkcyhzY29wZSwgcm93cywgeyAuLi5vcHRzLCBmaWx0ZXJGbiB9KTtcbiAgfSk7XG59KTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHsgdXBkYXRlZFNvdWwsIGRpZmYsIG9yaWdpbmFsLCBsYXRlc3QgPSAwIH1cbikgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuXG4gIGNvbnN0IG9yaWdpbmFsRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKG9yaWdpbmFsKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRJZHMsIHJlbW92ZWRJZHNdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoXG4gICAgZGlmZkRhdGEsXG4gICAgb3JpZ2luYWxEYXRhXG4gICk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IHZvdGVDb3VudHNNYXRjaCA9IFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB0aGluZ01hdGNoID0gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgYXV0aG9yTWF0Y2ggPSBTY2hlbWEuU0VBQXV0aG9yLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcblxuICBpZiAodm90ZUNvdW50c01hdGNoKSB1cGRhdGVkSWRzLnB1c2godm90ZUNvdW50c01hdGNoLnRoaW5nSWQpO1xuICBpZiAodGhpbmdNYXRjaCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ0lkICYmIHRoaW5nSWQgIT09IHNwZWMuZnJvbVBhZ2VJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICBhd2FpdCBMaXN0aW5nT3JhY2xlLnVwZGF0ZUxpc3RpbmcoXG4gICAgb3JjLFxuICAgIHJvdXRlLFxuICAgIHNjb3BlLFxuICAgIHNwZWMsXG4gICAgdXBkYXRlZElkcyxcbiAgICByZW1vdmVkSWRzLFxuICApO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG4gIGlmIChcbiAgICBSLnByb3AoXCJzaXplXCIsIG9yaWdpbmFsKSB8fFxuICAgIHVwZGF0ZWRJZHMubGVuZ3RoIHx8XG4gICAgcmVtb3ZlZElkcy5sZW5ndGggfHxcbiAgICBhdXRob3JNYXRjaFxuICApXG4gICAgcmV0dXJuO1xuXG4gIC8vIGJhc2UgbG9naWMgZnJvbSBndW4tY2xlcmljLXNjb3BlIG5lZWRzIHRvIGJlIGVuY2Fwc3VhbHRlZCBiZXR0ZXI/XG4gIGNvbnNvbGUubG9nKFwiLS0tU1RBTkRBUkQgU1BBQ0UgVVBEQVRFLS0tXCIsIHJvdXRlLnNvdWwsIHVwZGF0ZWRTb3VsKTtcbiAgY29uc3Qgbm9kZSA9IGF3YWl0IG9yYy5uZXdTY29wZSgpLmdldChyb3V0ZS5zb3VsKTtcbiAgY29uc3QgZXhpc3RpbmdLZXlzID0gTGlzdGluZ05vZGUuaXRlbUtleXMobm9kZSk7XG5cbiAgaWYgKGV4aXN0aW5nS2V5cy5sZW5ndGgpIHtcbiAgICByb3V0ZS53cml0ZSh7XG4gICAgICBzaXplOiAwLFxuICAgICAgLi4uZXhpc3RpbmdLZXlzLnJlZHVjZSgoZGlmZiwga2V5KSA9PiB7XG4gICAgICAgIGRpZmZbYCR7a2V5fWBdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgICB9LCB7fSlcbiAgICB9KTtcbiAgfVxuXG4gIG9yYy53b3JrKHtcbiAgICBpZDogYHVwZGF0ZToke3JvdXRlLnNvdWx9YCxcbiAgICBzb3VsOiByb3V0ZS5zb3VsLFxuICAgIG1ldGhvZDogXCJkb1VwZGF0ZVwiLFxuICAgIHByaW9yaXR5OiByb3V0ZS5wcmlvcml0eSB8fCA1MFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTcGFjZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGNhbGN1bGF0ZSxcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjLFxuICBvblB1dFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIiwgXCJmaXJlaG9zZVwiXTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgdG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWNzWzBdID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogdG9waWNzWzBdO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnRvcGljXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHt0b3BpY31gLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIHRvcGljLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IFwia2luZCBzdWJtaXNzaW9uXCIgOiBcIlwiLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgVG9waWNMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5pbXBvcnQgeyBEb21haW5MaXN0aW5nIH0gZnJvbSBcIi4vRG9tYWluTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50TGlzdGluZ1wiO1xuaW1wb3J0IHsgU3BhY2VMaXN0aW5nIH0gZnJvbSBcIi4vU3BhY2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBJbmJveExpc3RpbmcgfSBmcm9tIFwiLi9JbmJveExpc3RpbmdcIjtcbmltcG9ydCB7IFByb2ZpbGVMaXN0aW5nIH0gZnJvbSBcIi4vUHJvZmlsZUxpc3RpbmdcIjtcblxuY29uc3QgdHlwZXMgPSBbXG4gIFRvcGljTGlzdGluZyxcbiAgRG9tYWluTGlzdGluZyxcbiAgQ29tbWVudExpc3RpbmcsXG4gIFNwYWNlTGlzdGluZyxcbiAgSW5ib3hMaXN0aW5nLFxuICBQcm9maWxlTGlzdGluZ1xuXTtcblxuY29uc3QgZnJvbVBhdGggPSBwYXRoID0+IHtcbiAgbGV0IG1hdGNoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICBtYXRjaCA9IHR5cGVzW2ldLnJvdXRlLm1hdGNoKHBhdGgpO1xuICAgIGNvbnNvbGUubG9nKFwid3RmXCIsIHBhdGgsIG1hdGNoKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibWF0Y2hcIiwgbWF0Y2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm5vIG1hdGNoXCIsIHR5cGVzW2ldLnJvdXRlKTtcbiAgICB9XG4gICAgaWYgKG1hdGNoKSByZXR1cm4gUi5hc3NvYyhcIm1hdGNoXCIsIG1hdGNoLCB0eXBlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1R5cGUgPSB7IC4uLnR5cGVzLCB0eXBlcywgZnJvbVBhdGggfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuXG5jb25zdCBzcGxpdERvbWFpbnMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIitcIiksXG4gIFIudG9Mb3dlcixcbiAgUi50cmltLFxuICBSLmRlZmF1bHRUbyhcIlwiKVxuKTtcblxuY29uc3Qgc3BsaXRUb3BpY3MgPSBSLmNvbXBvc2UoXG4gIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoW1wiYWxsXCJdKSksXG4gIHNwbGl0RG9tYWluc1xuKTtcblxuY29uc3Qgd2l0aFJvdXRlID0gb2JqID0+IFIuYXNzb2MoXCJyb3V0ZVwiLCBuZXcgUm91dGUob2JqLnBhdGgpLCBvYmopO1xuXG5leHBvcnQgY29uc3QgUGF0aCA9IHsgc3BsaXREb21haW5zLCBzcGxpdFRvcGljcywgd2l0aFJvdXRlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHRhYnMgPSBbXCJob3RcIiwgXCJuZXdcIiwgXCJkaXNjdXNzZWRcIiwgXCJjb250cm92ZXJzaWFsXCIsIFwidG9wXCJdO1xuY29uc3Qgc3BhY2VDb25maWdQYWdlTmFtZSA9IG5hbWUgPT4gYHNwYWNlOiR7bmFtZX1gO1xuXG5jb25zdCBzb3VyY2VXaXRoRGVmYXVsdHMgPSBSLmN1cnJ5KChvd25lcklkLCBuYW1lLCBzb3VyY2UpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtzb3VyY2UgfHwgXCJcIl07XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuXG4gIGlmICghdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpKSB7XG4gICAgdGFicy5tYXAodGFiID0+XG4gICAgICByZXN1bHQucHVzaChgdGFiICR7dGFifSAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke25hbWV9LyR7dGFifWApXG4gICAgKTtcbiAgfVxuXG4gIGxldCBpbmRleGVyID0gdG9rZW5pemVkLmdldFZhbHVlKFwiaW5kZXhlclwiKTtcblxuICBpZiAoIWluZGV4ZXIpIHtcbiAgICByZXN1bHQucHVzaChgaW5kZXhlciAke0NvbmZpZy5pbmRleGVyfWApO1xuICAgIGluZGV4ZXIgPSBDb25maWcuaW5kZXhlcjtcbiAgfVxuXG4gIGxldCB0YWJ1bGF0b3IgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIik7XG5cbiAgaWYgKCF0YWJ1bGF0b3IpIHJlc3VsdC5wdXNoKGB0YWJ1bGF0b3IgJHtpbmRleGVyfWApO1xuXG4gIHJldHVybiByZXN1bHQuam9pbihcIlxcblwiKTtcbn0pO1xuXG5jb25zdCBnZXRDb25maWcgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBzcGFjZUNvbmZpZ1BhZ2VOYW1lKG5hbWUpKVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgZ2V0Q29uZmlnLnRoZW4oXG4gICAgUi5jb21wb3NlKFxuICAgICAgc291cmNlV2l0aERlZmF1bHRzKGF1dGhvcklkLCBuYW1lKSxcbiAgICAgIFRoaW5nRGF0YU5vZGUuYm9keVxuICAgIClcbiAgKVxuKTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlU3BlYyA9IHsgdGFicywgZ2V0U291cmNlIH07XG4iLCJpbXBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmV4cG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmV4cG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmV4cG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5leHBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5leHBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4vTGlzdGluZ09yYWNsZVwiO1xuZXhwb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5leHBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5leHBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5leHBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5leHBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi9TcGFjZVNwZWNcIjtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmcgPSB7XG4gIGZyb21TcGVjOiBMaXN0aW5nUXVlcnkuZnJvbVNwZWMsXG4gIGZyb21QYXRoOiBMaXN0aW5nUXVlcnkuZnJvbVBhdGhcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gXCIuL1ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSBcIi4vQXV0aGVudGljYXRpb25cIjtcblxuZnVuY3Rpb24gaW5pdChHdW4sIGNvbmZpZyA9IHt9KSB7XG4gIGNvbnN0IHsgbGVlY2gsIGRpc2FibGVWYWxpZGF0aW9uLCBub0d1biwgbG9jYWxTdG9yYWdlLCBwZXJzaXN0LCAuLi5yZXN0IH0gPVxuICAgIGNvbmZpZyB8fCB7fTtcbiAgY29uc3QgcGVlciA9IHsgY29uZmlnIH07XG5cbiAgaWYgKCFub0d1bikge1xuICAgIGNvbnN0IGNmZyA9IHsgbG9jYWxTdG9yYWdlOiAhIWxvY2FsU3RvcmFnZSwgcmFkaXNrOiAhIXBlcnNpc3QsIC4uLnJlc3QgfTtcblxuICAgIGlmIChwZXJzaXN0KSBjZmcubG9jYWxTdG9yYWdlID0gZmFsc2U7XG4gICAgaWYgKCFkaXNhYmxlVmFsaWRhdGlvbikgR3VuLm9uKFwib3B0XCIsIFZhbGlkYXRpb24uZ3VuV2lyZUlucHV0KHBlZXIpKTtcbiAgICBpZiAoY2ZnLnN0b3JlRm4pIGNmZy5zdG9yZSA9IGNmZy5zdG9yZUZuKGNmZyk7IC8vIGZvciBpbmRleGVkZGJcbiAgICBwZWVyLmd1biA9IEd1bihjZmcpO1xuICAgIGlmIChjZmcubG9jYWxTdG9yYWdlKSBwZWVyLmd1bi5vbihcImxvY2FsU3RvcmFnZTplcnJvclwiLCBhID0+IGEucmV0cnkoe30pKTtcbiAgICBpZiAobGVlY2gpIHtcbiAgICAgIGNvbnN0IHNlbmRMZWVjaCA9ICgpID0+IHBlZXIuZ3VuLl8ub24oXCJvdXRcIiwgeyBsZWVjaDogdHJ1ZSB9KTtcblxuICAgICAgc2VuZExlZWNoKCk7XG4gICAgfVxuICB9XG5cbiAgcGVlci5uZXdTY29wZSA9IG9wdHMgPT4gUXVlcnkuY3JlYXRlU2NvcGUocGVlciwgb3B0cyk7XG4gIHBlZXIub25Mb2dpbiA9IEF1dGhlbnRpY2F0aW9uLm9uTG9naW4ocGVlcik7XG4gIHBlZXIuc2lnbnVwID0gQXV0aGVudGljYXRpb24uc2lnbnVwKHBlZXIpO1xuICBwZWVyLmxvZ2luID0gQXV0aGVudGljYXRpb24ubG9naW4ocGVlcik7XG4gIHBlZXIubG9nb3V0ID0gKCkgPT4gQXV0aGVudGljYXRpb24ubG9nb3V0KHBlZXIpO1xuICBwZWVyLmlzTG9nZ2VkSW4gPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluKHBlZXIpO1xuICBwZWVyLnN1Ym1pdCA9IFRoaW5nLnN1Ym1pdChwZWVyKTtcbiAgcGVlci5jb21tZW50ID0gVGhpbmcuY29tbWVudChwZWVyKTtcbiAgcGVlci5jaGF0ID0gVGhpbmcuY2hhdChwZWVyKTtcbiAgcGVlci53cml0ZVBhZ2UgPSBUaGluZy53cml0ZVBhZ2UocGVlcik7XG4gIHBlZXIudm90ZSA9IFRoaW5nLnZvdGUocGVlcik7XG4gIHBlZXIucXVlcmllcyA9IFF1ZXJ5O1xuICByZXR1cm4gcGVlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFBlZXIgPSB7XG4gIGluaXRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgc2NvcGUgYXMgbWFrZVNjb3BlLCBxdWVyeSwgYWxsLCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZy9MaXN0aW5nTm9kZVwiO1xuXG5jb25zdCBlbXB0eVByb21pc2UgPSByZXNvbHZlKG51bGwpO1xuY29uc3QgdW5pb25BcnJheXMgPSBSLnJlZHVjZShSLnVuaW9uLCBbXSk7XG5cbmNvbnN0IHRvcGljU291bHMgPSBwYXJhbXMgPT4ge1xuICBjb25zdCB7IHRvcGljcyA9IFtcImFsbFwiXSB9ID0gcGFyYW1zIHx8IHt9O1xuICBjb25zdCBkYXlzID0gUi5wcm9wT3IoMzY1LCBcImRheXNcIiwgcGFyYW1zKSB8fCAzNjU7XG4gIGNvbnN0IGRheVN0cmluZ3MgPSBbXTtcbiAgY29uc3Qgb25lRGF5ID0gMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG9uZURheSAqIHBhcnNlSW50KGRheXMsIDEwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBkYXlzICsgMTsgaSsrKVxuICAgIGRheVN0cmluZ3MucHVzaChUaGluZ1NldC5kYXlTdHIoc3RhcnQgKyBpICogb25lRGF5KSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhcbiAgICB0b3BpY3MucmVkdWNlKFxuICAgICAgKHJlc3VsdCwgdG9waWNOYW1lKSA9PlxuICAgICAgICBkYXlTdHJpbmdzLnJlZHVjZSgocmVzLCBkcykgPT4ge1xuICAgICAgICAgIHJlc1tgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvJHt0b3BpY05hbWV9L2RheXMvJHtkc31gXSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSwgcmVzdWx0KSxcbiAgICAgIHt9XG4gICAgKVxuICApO1xufTtcblxuY29uc3Qgc2luZ2xlVG9waWMgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICBjb25zdCB0U291bHMgPSB0b3BpY1NvdWxzKHsgLi4ucGFyYW1zLCB0b3BpY3M6IFtwYXJhbXMudG9waWNdIH0pO1xuICBsZXQgc291bHMgPSBbXTtcbiAgbGV0IGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuXG4gIGlmIChwYXJhbXMuc29ydCA9PT0gXCJuZXdcIikge1xuICAgIGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuICB9IGVsc2Uge1xuICAgIGlmIChwYXJhbXMuc29ydCA9PT0gXCJ0b3BcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICAgIGlmIChwYXJhbXMudG9waWMgPT09IFwiYWxsXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgfVxuXG4gIGNvbnN0IGZldGNoTW9yZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b3BpY1NvdWwgPSB0U291bHMucG9wKCk7XG5cbiAgICBpZiAoc291bHMubGVuZ3RoID4gaXRlbU1heCB8fCAhdG9waWNTb3VsKSByZXR1cm4gcmVzb2x2ZShzb3Vscyk7XG4gICAgcmV0dXJuIHNjb3BlXG4gICAgICAuZ2V0KHRvcGljU291bClcbiAgICAgIC5zb3VscygpXG4gICAgICAudGhlbihtb3JlID0+IHtcbiAgICAgICAgc291bHMgPSBbLi4uc291bHMsIC4uLm1vcmVdO1xuICAgICAgICByZXR1cm4gZmV0Y2hNb3JlKCk7XG4gICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZmV0Y2hNb3JlKCk7XG59KTtcblxuY29uc3Qgc2luZ2xlRG9tYWluID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiB9KSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZTogZG9tYWluIH0pKS5zb3VscygpXG4pO1xuXG5jb25zdCBzaW5nbGVBdXRob3IgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFtcbiAgICBwYXJhbXMudHlwZSAmJiBwYXJhbXMudHlwZSAhPT0gXCJzdWJtaXR0ZWRcIiAmJiBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChwYXJhbXMuYXV0aG9ySWQpXG4gICAgICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAgICAgLnNvdWxzKCksXG4gICAgcGFyYW1zLnR5cGUgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tZW50c1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1hbmRzXCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KHBhcmFtcy5hdXRob3JJZClcbiAgICAgICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgICAgICAuc291bHMoKVxuICBdKS50aGVuKChbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkgPT4gdW5pb25BcnJheXMoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pKVxuKTtcblxuY29uc3QgbGlzdGluZ0lkcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IHNjb3BlLmdldChzb3VsKS50aGVuKExpc3RpbmdOb2RlLnNvcnRlZElkcyksXG4gIFwibGlzdGluZ0lkc1wiXG4pO1xuXG5jb25zdCBzaW5nbGVMaXN0aW5nID0gcXVlcnkoKHNjb3BlLCB7IGxpc3RpbmcsIHNvcnQsIGluZGV4ZXIgfSkgPT5cbiAgbGlzdGluZ0lkcyhzY29wZSwgYCR7Q29uc3RhbnRzLlBSRUZJWH0ke2xpc3Rpbmd9LyR7c29ydH1AfiR7aW5kZXhlcn0uYCkudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSksXG4gICAgICBSLmZpbHRlcihSLmlkZW50aXR5KVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVwbGllc1RvQXV0aG9yID0gcXVlcnkoXG4gIChzY29wZSwgeyByZXBsaWVzVG9BdXRob3JJZCwgdHlwZSA9IFwib3ZlcnZpZXdcIiwgLi4ucGFyYW1zIH0pID0+XG4gICAgc2luZ2xlTGlzdGluZyhzY29wZSwge1xuICAgICAgbGlzdGluZzogYC91c2VyLyR7cmVwbGllc1RvQXV0aG9ySWR9LyR7dHlwZX1gLFxuICAgICAgc29ydDogXCJuZXdcIixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH0pLnRoZW4oYXV0aG9yZWRTb3VscyA9PlxuICAgICAgYWxsKFxuICAgICAgICBhdXRob3JlZFNvdWxzLm1hcChhdXRob3JlZFNvdWwgPT5cbiAgICAgICAgICBzY29wZS5nZXQoYCR7YXV0aG9yZWRTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgICAgICAgKVxuICAgICAgKS50aGVuKHVuaW9uQXJyYXlzKVxuICAgIClcbik7XG5cbmNvbnN0IHNpbmdsZVN1Ym1pc3Npb24gPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgc2NvcGVcbiAgICAuZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSlcbiAgICApXG4gICAgLnNvdWxzKFxuICAgICAgUi5wcmVwZW5kKFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KSlcbiAgICApXG4pO1xuXG5jb25zdCB0aGluZyA9IHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICBzY29wZS5nZXQodGhpbmdTb3VsKS50aGVuKG1ldGEgPT4ge1xuICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcmVzdWx0ID0geyBpZDogbWV0YS5pZCwgdGltZXN0YW1wOiBwYXJzZUZsb2F0KG1ldGEudGltZXN0YW1wLCAxMCkgfTtcbiAgICBjb25zdCByZXBseVRvU291bCA9IFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BTb3VsID0gUi5wYXRoKFtcIm9wXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BJZCA9IG9wU291bCA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChvcFNvdWwpLnRoaW5naWQgOiBudWxsO1xuICAgIGNvbnN0IHJlcGx5VG9JZCA9IHJlcGx5VG9Tb3VsXG4gICAgICA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChyZXBseVRvU291bCkudGhpbmdpZFxuICAgICAgOiBudWxsO1xuXG4gICAgaWYgKG9wSWQpIHJlc3VsdC5vcElkID0gb3BJZDtcbiAgICBpZiAocmVwbHlUb0lkKSByZXN1bHQucmVwbHlUb0lkID0gcmVwbHlUb0lkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pXG4pO1xuXG5jb25zdCB0aGluZ1ZvdGVDb3VudCA9IHZvdGVUeXBlID0+XG4gIHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICAgIHNjb3BlXG4gICAgICAuZ2V0KHRoaW5nU291bClcbiAgICAgIC5nZXQodm90ZVR5cGUpXG4gICAgICAuY291bnQoKVxuICApO1xuXG5jb25zdCB0aGluZ1ZvdGVzVXAgPSB0aGluZ1ZvdGVDb3VudChcInZvdGVzdXBcIik7XG5jb25zdCB0aGluZ1ZvdGVzRG93biA9IHRoaW5nVm90ZUNvdW50KFwidm90ZXNkb3duXCIpO1xuY29uc3QgdGhpbmdBbGxDb21tZW50c0NvdW50ID0gcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2FsbGNvbW1lbnRzYCkuY291bnQoKVxuKTtcblxuY29uc3QgY29tcHV0ZVRoaW5nU2NvcmVzID0gcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gIGFsbChbXG4gICAgdGhpbmdWb3Rlc1VwKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgIHRoaW5nVm90ZXNEb3duKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgIHRoaW5nQWxsQ29tbWVudHNDb3VudChzY29wZSwgdGhpbmdTb3VsKVxuICBdKS50aGVuKChbdXAsIGRvd24sIGNvbW1lbnRdKSA9PiAoeyB1cCwgZG93biwgY29tbWVudCwgc2NvcmU6IHVwIC0gZG93biB9KSlcbik7XG5cbmNvbnN0IHRoaW5nTWV0YSA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgdGhpbmdTb3VsLCB0YWJ1bGF0b3IsIGRhdGEgPSBmYWxzZSwgc2NvcmVzID0gZmFsc2UgfSkgPT4ge1xuICAgIGlmICghdGhpbmdTb3VsKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICByZXR1cm4gYWxsKFtcbiAgICAgIHRoaW5nKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgICAgc2NvcmVzXG4gICAgICAgID8gdGFidWxhdG9yXG4gICAgICAgICAgPyBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3RlY291bnRzQH4ke3RhYnVsYXRvcn0uYCkudGhlbigpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICA6IGNvbXB1dGVUaGluZ1Njb3JlcyhzY29wZSwgdGhpbmdTb3VsKS50aGVuKClcbiAgICAgICAgOiByZXNvbHZlKCksXG4gICAgICBkYXRhXG4gICAgICAgID8gc2NvcGVcbiAgICAgICAgICAgIC5nZXQodGhpbmdTb3VsKVxuICAgICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAgIC50aGVuKClcbiAgICAgICAgOiByZXNvbHZlKClcbiAgICBdKS50aGVuKChbbWV0YSwgdm90ZXMsIGRhdGFdKSA9PiB7XG4gICAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHsgLi4ubWV0YSwgdm90ZXMsIGRhdGEgfTtcbiAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgbXVsdGlUaGluZ01ldGEgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFxuICAgIFIucmVkdWNlKFxuICAgICAgKHByb21pc2VzLCB0aGluZ1NvdWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiBwcm9taXNlcztcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGluZ01ldGEoc2NvcGUsIHsgLi4ucGFyYW1zLCB0aGluZ1NvdWwgfSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG4gICAgICB9LFxuICAgICAgW10sXG4gICAgICBSLnByb3BPcihbXSwgXCJ0aGluZ1NvdWxzXCIsIHBhcmFtcylcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IG11bHRpUXVlcnkgPSAoc2luZ2xlUXVlcnksIHBsdXJhbCwgc2luZ2xlLCBjb2xsYXRlID0gdW5pb25BcnJheXMpID0+XG4gIHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBSLnByb3AocGx1cmFsLCBwYXJhbXMpO1xuXG4gICAgaWYgKFIuaXNOaWwoaXRlbXMpKSByZXR1cm4gZW1wdHlQcm9taXNlO1xuICAgIHJldHVybiBhbGwoXG4gICAgICBSLm1hcChcbiAgICAgICAgdmFsID0+IHNpbmdsZVF1ZXJ5KHNjb3BlLCB7IC4uLnBhcmFtcywgW3NpbmdsZV06IHZhbCB9KSxcbiAgICAgICAgUi5wcm9wT3IoW10sIHBsdXJhbCwgcGFyYW1zKVxuICAgICAgKVxuICAgICkudGhlbihjb2xsYXRlKTtcbiAgfSk7XG5cbmNvbnN0IG11bHRpVG9waWMgPSBtdWx0aVF1ZXJ5KHNpbmdsZVRvcGljLCBcInRvcGljc1wiLCBcInRvcGljXCIpO1xuY29uc3QgbXVsdGlEb21haW4gPSBtdWx0aVF1ZXJ5KHNpbmdsZURvbWFpbiwgXCJkb21haW5zXCIsIFwiZG9tYWluXCIpO1xuY29uc3QgbXVsdGlBdXRob3IgPSBtdWx0aVF1ZXJ5KHNpbmdsZUF1dGhvciwgXCJhdXRob3JJZHNcIiwgXCJhdXRob3JJZFwiKTtcbmNvbnN0IG11bHRpU3VibWlzc2lvbiA9IG11bHRpUXVlcnkoXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIFwic3VibWlzc2lvbklkc1wiLFxuICBcInN1Ym1pc3Npb25JZFwiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGFGcm9tU291bHMgPSBzY29wZSA9PiBzb3VscyA9PlxuICBhbGwoXG4gICAgc291bHNcbiAgICAgIC5maWx0ZXIoeCA9PiAhIXgpXG4gICAgICAubWFwKHNvdWwgPT5cbiAgICAgICAgc2NvcGVcbiAgICAgICAgICAuZ2V0KHNvdWwpXG4gICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAudGhlbih4ID0+IHgpXG4gICAgICApXG4gICk7XG5cbmNvbnN0IGN1cmF0ZWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkcywgc3VibWlzc2lvbk9ubHkgPSBmYWxzZSkgPT5cbiAgYWxsKFtcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJjb21tZW50c1wiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSlcbiAgICAgIC50aGVuKHRoaW5nRGF0YUZyb21Tb3VscyhzY29wZSkpXG4gICAgICAudGhlbihcbiAgICAgICAgUi5jb21wb3NlKFxuICAgICAgICAgIFIubWFwKHN1Ym1pc3Npb25Pbmx5ID8gUi5wcm9wKFwib3BJZFwiKSA6IFIucHJvcChcInJlcGx5VG9JZFwiKSksXG4gICAgICAgICAgUi5maWx0ZXIoUi5wcm9wKFwicmVwbHlUb0lkXCIpKVxuICAgICAgICApXG4gICAgICApLFxuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcInN1Ym1pdHRlZFwiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSkudGhlbihSLm1hcChzb3VsID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChzb3VsKS50aGluZ0lkKSlcbiAgXSkudGhlbigoW2lkczEsIGlkczJdKSA9PiBSLnVuaXEoWy4uLmlkczEsIC4uLmlkczJdKSlcbik7XG5cbmNvbnN0IHRoaW5nU2NvcmVzID0gcXVlcnkoXG4gIChzY29wZSwgdGFidWxhdG9yLCB0aGluZ0lkKSA9PlxuICAgIHRhYnVsYXRvciAmJiB0aGluZ0lkXG4gICAgICA/IHNjb3BlXG4gICAgICAgICAgLmdldChTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCB0YWJ1bGF0b3IgfSkpXG4gICAgICAgICAgLnRoZW4oKVxuICAgICAgOiByZXNvbHZlKCksXG4gIFwidGhpbmdTY29yZXNcIlxuKTtcblxuY29uc3QgdGhpbmdSZXBsaWVzID0gcXVlcnkoKHNjb3BlLCB0aGluZ0lkKSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLnRoZW4oKVxuKTtcblxuY29uc3QgdGhpbmdEYXRhID0gcXVlcnkoXG4gIChzY29wZSwgdGhpbmdJZCkgPT5cbiAgICB0aGluZ0lkXG4gICAgICA/IHNjb3BlLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLmdldChcImRhdGFcIilcbiAgICAgIDogcmVzb2x2ZShudWxsKSxcbiAgXCJ0aGluZ0RhdGFcIlxuKTtcblxuY29uc3QgdXNlclBhZ2VzID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQpID0+XG4gICAgc2NvcGUuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpLFxuICBcInVzZXJQYWdlc1wiXG4pO1xuXG5jb25zdCB3aWtpUGFnZUlkID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQsIG5hbWUpID0+XG4gICAgc2NvcGVcbiAgICAgIC5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSlcbiAgICAgIC5nZXQobmFtZSlcbiAgICAgIC5nZXQoXCJpZFwiKSxcbiAgXCJ3aWtpUGFnZUlkXCJcbik7XG5cbmNvbnN0IHdpa2lQYWdlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgd2lraVBhZ2VJZChzY29wZSwgYXV0aG9ySWQsIG5hbWUpLnRoZW4oaWQgPT4gaWQgJiYgdGhpbmdEYXRhKHNjb3BlLCBpZCkpXG4pO1xuXG5jb25zdCB1c2VyTWV0YSA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkKSA9PlxuICAgIHNjb3BlLmdldChpZCkudGhlbihtZXRhID0+ICh7XG4gICAgICB1c2VyQWxpYXM6IFIucHJvcChcImFsaWFzXCIsIG1ldGEpLFxuICAgICAgY3JlYXRlZEF0OiBSLnBhdGgoW1wiX1wiLCBcIj5cIiwgXCJwdWJcIl0sIG1ldGEpXG4gICAgfSkpLFxuICBcInVzZXJNZXRhXCJcbik7XG5cbmNvbnN0IGNyZWF0ZVNjb3BlID0gUi5jdXJyeSgobmFiLCBvcHRzKSA9PlxuICBtYWtlU2NvcGUoUi5hc3NvYyhcImd1blwiLCBuYWIuZ3VuLCBvcHRzIHx8IHt9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBRdWVyeSA9IHtcbiAgc2luZ2xlVG9waWMsXG4gIHNpbmdsZURvbWFpbixcbiAgc2luZ2xlQXV0aG9yLFxuICBzaW5nbGVMaXN0aW5nLFxuICByZXBsaWVzVG9BdXRob3IsXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIGNvbXB1dGVUaGluZ1Njb3JlcyxcbiAgdGhpbmdNZXRhLFxuICBtdWx0aVRoaW5nTWV0YSxcbiAgbXVsdGlUb3BpYyxcbiAgbXVsdGlEb21haW4sXG4gIG11bHRpQXV0aG9yLFxuICBtdWx0aVN1Ym1pc3Npb24sXG4gIHRoaW5nU2NvcmVzLFxuICB0aGluZ1JlcGxpZXMsXG4gIHRoaW5nRGF0YSxcbiAgdG9waWNTb3VscyxcbiAgdXNlclBhZ2VzLFxuICB3aWtpUGFnZUlkLFxuICB3aWtpUGFnZSxcbiAgdXNlck1ldGEsXG4gIGNyZWF0ZVNjb3BlLFxuICBjdXJhdGVkXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgLi4uc2VhLkFVVEhfU0NIRU1BLFxuICB0b3BpY05hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRVxuICB9LFxuXG4gIFRvcGljRGF5OiB7XG4gICAgdGl0bGU6IFwiVG9waWMgRGF5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQSBzaW5nbGUgZGF5IG9mIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWUvZGF5cy86eWVhci86bW9udGgvOmRheWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICB5ZWFyOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDIwMTgsIG1heGltdW06IDIxMDAgfSxcbiAgICAgICAgbW9udGg6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMTIgfSxcbiAgICAgICAgZGF5OiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDMxIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCIsIFwieWVhclwiLCBcIm1vbnRoXCIsIFwiZGF5XCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBUb3BpYzoge1xuICAgIHRpdGxlOiBcIlRvcGljXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIGRvbWFpbk5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfRE9NQUlOX1NJWkVcbiAgfSxcblxuICBEb21haW46IHtcbiAgICB0aXRsZTogXCJEb21haW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgZG9tYWluXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWlucy86ZG9tYWluTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbk5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluTmFtZVwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB1cmw6IHsgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1VSTF9TSVpFIH0sXG4gIFVSTDoge1xuICAgIHRpdGxlOiBcIlVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgZm9yIGEgZ2l2ZW4gVVJMXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXJscy9cXCp1cmxgLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVybDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInVybFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aGluZ0lkOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfSEFTSF9TSVpFXG4gIH0sXG5cbiAgdGhpbmdTb3VsOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGhpbmdJZDogeyBcIiNyZWZcIjogXCIjZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdBbGxDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIEFsbCBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBjb21tZW50cyBmb3IgYSBnaXZlbiBzdWJtaXNzaW9uXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2FsbGNvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3QgcmVwbGllcyB0byBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aW1lc3RhbXA6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0sXG4gIHRoaW5nS2luZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0tJTkRfU0laRVxuICB9LFxuXG4gIFRoaW5nOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgUmVmZXJlbmNlXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoZXNlIGFyZSBzdWJtaXNzaW9ucywgY29tbWVudHMsIGNoYXQgbWVzc2FnZXMgYW5kIHdpa2kgcGFnZXNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWRgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IGlkOiBcInRoaW5nSWRcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGtpbmQ6IHsgXCIjcmVmXCI6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9LFxuICAgICAgb3JpZ2luYWxIYXNoOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb25lT2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFFZGdlXCIgfSxcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFTaWduZWRFZGdlXCIgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgdG9waWM6IHtcbiAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbWUgb2xkIHRoaW5ncyBoYWQgZ2VuZXJpYyB0b3BpYyBzb3Vsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgXCIjXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiA0MiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFtcIiNcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL0RvbWFpbkVkZ2VcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9VUkxFZGdlXCIgfSxcbiAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH0sXG4gICAgICBvcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIHJlcGx5VG86IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1NFQUF1dGhvckVkZ2VcIiB9XG4gICAgfSxcblxuICAgIGFueU9mOiBbXG4gICAgICB7XG4gICAgICAgIGFsbE9mOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpbmdIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgICAgIHsgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nOiB0cnVlIH0sXG4gICAgICAgICAgICAgIHsgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaDogdHJ1ZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyBpc0xlZ2FjeVRoaW5nOiB0cnVlIH0sXG4gICAgICB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU2VsZiB2ZXJpZnlpbmcgY2FuIGJlIHVwZGF0ZWQgaW4gaXNvbGF0aW9uXCIsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuXG4gIFByb29mT2ZXb3JrVm90ZXM6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAga2V5c0FyZVByb29mc09mV29yazoge1xuICAgICAgYWxnb3JpdGhtOiBcImFyZ29uMmRcIixcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjb21wbGV4aXR5OiA2LFxuICAgICAgICBoYXNoTGVuZ3RoOiAzMixcbiAgICAgICAgdGltZUNvc3Q6IDEsXG4gICAgICAgIG1lbW9yeUNvc3Q6IDEwMjQwLFxuICAgICAgICBwYXJhbGxlbGlzbTogMVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVzVXA6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXN1cGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdWb3Rlc0Rvd246IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXNkb3duYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ0RhdGE6IHtcbiAgICB0aXRsZTogXCJVbnNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH0sXG4gICAgICBhdXRob3JJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgb3BJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICByZXBseVRvSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdXJsXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfVxuICAgIH0sXG4gICAgdGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gIH0sXG5cbiAgVGhpbmdEYXRhU2lnbmVkOiB7XG4gICAgdGl0bGU6IFwiU2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZywgY3J5cHRvZ3JhcGhpY2FsbHkgc2lnbmVkXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGF+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCIsIFwiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0gfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSB9LFxuICAgICAgYm9keToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9XG4gICAgICB9LFxuICAgICAgYXV0aG9ySWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSB9LFxuICAgICAgb3BJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIHJlcGx5VG9JZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIGRvbWFpbjogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0gfSxcbiAgICAgIHVybDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfSB9LFxuICAgICAgdGltZXN0YW1wOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9IH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3RlQ291bnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgVm90ZSBDb3VudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBZ2dyZWdhdGVkIGNvdW50cyBmcm9tIGEgdGFidWxhdG9yXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVjb3VudHNAfjp0YWJ1bGF0b3IuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgdGFidWxhdG9yOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXA6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBkb3duOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWVudDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIHNjb3JlOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWFuZHM6IHsgc2VhOiB7IHR5cGU6IFtcIm9iamVjdFwiLCBcInN0cmluZ1wiXSB9IH1cbiAgICB9XG4gIH0sXG5cbiAgTGlzdGluZ0RhdGE6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAgdGl0bGU6IFwiTGlzdGluZyBOb2RlIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTaGFyZWQgZGVzY3JpcHRpb24gb2YgbGlzdGluZyBwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBpZHM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX0lEU19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIFhYWDogcmVzdCBhcmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzb3VyY2VcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFtcInN0cmluZ1wiLCBcIm51bGxcIl0sIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBzdWJtaXRUb3BpYzoge1xuICAgICAgICBzZWE6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RPUElDX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIHRhYnM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1RBQlNfU0laRSB9XG4gICAgICB9LFxuICAgICAgY3VyYXRvcnM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG4gICAgICBjZW5zb3JzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19TT1VSQ0VfU0laRSB9XG4gICAgICB9LFxuICAgICAgdXNlcklkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0gfSxcbiAgICAgIG9wSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICBpc0NoYXQ6IHsgc2VhOiB7IHR5cGU6IFtcImJvb2xlYW5cIiwgXCJzdHJpbmdcIl0gfSB9XG4gICAgfSxcbiAgICBwYXR0ZXJuUHJvcGVydGllczoge1xuICAgICAgXCJeZCskXCI6IHsgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIgfSB9XG4gICAgfVxuICB9LFxuXG4gIHNvcnROYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXG4gICAgICBcIm5ld1wiLFxuICAgICAgXCJvbGRcIixcbiAgICAgIFwiYWN0aXZlXCIsXG4gICAgICBcInRvcFwiLFxuICAgICAgXCJjb21tZW50c1wiLFxuICAgICAgXCJkaXNjdXNzZWRcIixcbiAgICAgIFwiaG90XCIsXG4gICAgICBcImJlc3RcIixcbiAgICAgIFwiY29udHJvdmVyc2lhbFwiLFxuICAgICAgXCJyYW5kb21cIixcbiAgICAgIFwiZmlyZWhvc2VcIixcbiAgICAgIFwiY2hhdFwiXG4gICAgXVxuICB9LFxuXG4gIFRvcGljTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3QvOnRvcGljLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpYzogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIERvbWFpbkxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9kb21haW4vOmRvbWFpbi86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZG9tYWluOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIHVzZXJMaXN0aW5nVHlwZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1wib3ZlcnZpZXdcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tZW50c1wiLCBcImNvbW1hbmRzXCIsIFwiY29tbWVudGVkXCJdXG4gIH0sXG5cbiAgQXV0aG9yUmVwbGllc0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JQcm9maWxlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBTcGFjZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBuYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvckNvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9ycyBjb21tZW50cyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9jb21tZW50c346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yU3VibWlzc2lvbnM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBTdWJtaXNzaW9uc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyBzdWJtaXNzaW9ucyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9zdWJtaXNzaW9uc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclRoaW5nczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFRoaW5nc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyB0aGluZ3Mgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JQYWdlczoge1xuICAgIHRpdGxlOiBcIkF1dGhvciBQYWdlIE1hcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1hcHBpbmcgb2YgcGFnZSBuYW1lcyB0byB0aGluZ3NcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9wYWdlc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlcyA9IFIua2V5cyhkZWZpbml0aW9ucykucmVkdWNlKChyZXN1bHQsIG5hbWUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IFIucGF0aChbbmFtZSwgXCJzb3VsXCIsIFwicGF0dGVyblwiXSwgZGVmaW5pdGlvbnMpO1xuXG4gIGlmICghcGF0dGVybikgcmV0dXJuIHJlc3VsdDtcbiAgcmV0dXJuIFIuYXNzb2MobmFtZSwgbmV3IFJvdXRlKHBhdHRlcm4pLCByZXN1bHQpO1xufSk7XG5cbmNvbnN0IGRlZnNXaXRoUm91dGVzID0gUi5jb21wb3NlKFxuICBSLnJlZHVjZShcbiAgICAocmVzLCBbbmFtZSwgcm91dGVdKSA9PlxuICAgICAgUi5hc3NvYyhuYW1lLCBSLmFzc29jKFwicm91dGVcIiwgcm91dGUsIFIucHJvcChuYW1lLCBkZWZpbml0aW9ucykpLCByZXMpLFxuICAgIHt9XG4gICksXG4gIFIudG9QYWlyc1xuKShyb3V0ZXMpO1xuXG5leHBvcnQgY29uc3QgU2NoZW1hID0ge1xuICAuLi5kZWZzV2l0aFJvdXRlcyxcbiAgZGVmaW5pdGlvbnMsXG4gIHJvdXRlc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcblxuY29uc3QgYm9keSA9IFIucHJvcE9yKFwiXCIsIFwiYm9keVwiKTtcbmNvbnN0IHVybCA9IFIucHJvcE9yKFwiXCIsIFwidXJsXCIpO1xuY29uc3QgZG9tYWluID0gUi5jb21wb3NlKFxuICB1cmxTdHIgPT4ge1xuICAgIGlmICghdXJsU3RyKSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZVVSSSh1cmxTdHIpO1xuXG4gICAgcmV0dXJuIChwYXJzZWQuaG9zdCB8fCBwYXJzZWQuc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKTtcbiAgfSxcbiAgdXJsXG4pO1xuXG5leHBvcnQgY29uc3QgVGhpbmdEYXRhTm9kZSA9IHsgYm9keSwgZG9tYWluIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5cbmNvbnN0IHNvdWxzID0gR3VuTm9kZS5lZGdlcztcbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcInRoaW5nSWRcIiksXG4gICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4gICAgKVxuICApLFxuICBHdW5Ob2RlLmVkZ2VzXG4pO1xuXG5jb25zdCB1bmlvbiA9IFIuY29tcG9zZShcbiAgUi5kaXNzb2MoXCJfXCIpLFxuICBSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KVxuKTtcblxuZnVuY3Rpb24gZGF5U3RyKHRpbWVzdGFtcCkge1xuICBjb25zdCBkID0gbmV3IERhdGUodGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgY29uc3QgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RhdGUoKTtcblxuICByZXR1cm4gYCR7eWVhcn0vJHttb250aH0vJHtkYXlOdW19YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRoaW5nU2V0ID0geyBpZHMsIHVuaW9uLCBzb3VscywgZGF5U3RyIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5cbmV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5cbmNvbnN0IHB1dCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgZGF0YS50aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBvYmpIYXNoKGRhdGEpO1xuICBjb25zdCB7IHRpbWVzdGFtcCwga2luZCwgdG9waWMsIGF1dGhvcklkLCBvcElkLCByZXBseVRvSWQgfSA9IGRhdGE7XG4gIGNvbnN0IHRoaW5nSWQgPSBvYmpIYXNoKHtcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICB0b3BpYyxcbiAgICBhdXRob3JJZCxcbiAgICBvcElkLFxuICAgIHJlcGx5VG9JZCxcbiAgICBvcmlnaW5hbEhhc2hcbiAgfSk7XG5cbiAgY29uc3Qgbm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXRhU291bCA9IGF1dGhvcklkXG4gICAgPyBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCBhdXRob3JJZCB9KVxuICAgIDogU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3JpZ2luYWxIYXNoIH0pO1xuXG4gIGNvbnN0IG1ldGFEYXRhID0ge1xuICAgIGlkOiB0aGluZ0lkLFxuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIG9yaWdpbmFsSGFzaCxcbiAgICBkYXRhOiB7IFwiI1wiOiBkYXRhU291bCB9LFxuICAgIHZvdGVzdXA6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzVXAucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICB2b3Rlc2Rvd246IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzRG93bi5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGFsbGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9XG4gIH07XG5cbiAgaWYgKHRvcGljKVxuICAgIG1ldGFEYXRhLnRvcGljID0geyBcIiNcIjogU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IHRvcGljIH0pIH07XG4gIGlmIChhdXRob3JJZCkgbWV0YURhdGEuYXV0aG9yID0geyBcIiNcIjogYH4ke2F1dGhvcklkfWAgfTtcbiAgaWYgKG9wSWQpXG4gICAgbWV0YURhdGEub3AgPSB7IFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkgfTtcbiAgaWYgKHJlcGx5VG9JZClcbiAgICBtZXRhRGF0YS5yZXBseVRvID0ge1xuICAgICAgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcmVwbHlUb0lkIH0pXG4gICAgfTtcblxuICBwZWVyLmd1bi5nZXQoZGF0YVNvdWwpLnB1dChkYXRhKTtcbiAgbm9kZS5wdXQobWV0YURhdGEpO1xuICBwZWVyLmluZGV4KHRoaW5nSWQsIGRhdGEpO1xuICByZXR1cm4gbm9kZTtcbn0pO1xuXG5jb25zdCBzdWJtaXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChkYXRhLmRvbWFpbikgZGF0YS5kb21haW4gPSBkYXRhLmRvbWFpbi50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCB0aW1lc3RhbXAsIGtpbmQ6IFwic3VibWlzc2lvblwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBzdWJtaXNzaW9uc1NvdWwgPSBTY2hlbWEuQXV0aG9yU3VibWlzc2lvbnMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnMgPSBwZWVyLmd1bi5nZXQoc3VibWlzc2lvbnNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgLnB1dChzdWJtaXNzaW9ucyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgc3VibWlzc2lvbnMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjb21tZW50ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY29tbWVudFwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBjb21tZW50c1NvdWwgPSBTY2hlbWEuQXV0aG9yQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoY29tbWVudHNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgLnB1dChjb21tZW50cyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIC8vIHBlZXIuZ3VuLnVzZXIoKS5nZXQoXCJjb21tZW50c1wiKS5wdXQocGVlci5ndW4udXNlcigpLmdldChcImNvbW1lbnRzXCIpKTtcblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY2hhdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNoYXRtc2dcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCB3cml0ZVBhZ2UgPSBSLmN1cnJ5KChwZWVyLCBuYW1lLCBib2R5KSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoIXVzZXIpIHJldHVybiBQcm9taXNlLnJlamVjdChcIm5vdCBsb2dnZWQgaW5cIik7XG4gIGxldCB0aGluZztcbiAgY29uc3QgcGFnZXNTb3VsID0gU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZDogdXNlci5wdWIgfSk7XG4gIGNvbnN0IGNoYWluID0gcGVlci5ndW4uZ2V0KHBhZ2VzU291bCkuZ2V0KG5hbWUpO1xuXG4gIHJldHVybiBjaGFpbi50aGVuKHJlcyA9PiB7XG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coXCJyZXNcIiwgcmVzKTtcbiAgICAgIGNoYWluXG4gICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgIC5nZXQoXCJib2R5XCIpXG4gICAgICAgIC5wdXQoYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGJvZHksXG4gICAgICAgIHRpdGxlOiBuYW1lLFxuICAgICAgICBraW5kOiBcIndpa2lwYWdlXCIsXG4gICAgICAgIGF1dGhvcjogdXNlci5hbGlhcyxcbiAgICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgICB9O1xuXG4gICAgICBjb25zb2xlLmxvZyhcInBhZ2UgZGF0YVwiLCBkYXRhKTtcbiAgICAgIHRoaW5nID0gcHV0KHBlZXIsIGRhdGEpO1xuICAgICAgY2hhaW4ucHV0KHRoaW5nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHZvdGUgPSBSLmN1cnJ5KChwZWVyLCBpZCwga2luZCwgbm9uY2UpID0+IHtcbiAgY29uc3Qgdm90ZXMgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hW2tpbmQgPT09IFwidXBcIiA/IFwiVGhpbmdWb3Rlc1VwXCIgOiBcIlRoaW5nVm90ZXNEb3duXCJdLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogaWRcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiB2b3Rlcy5nZXQobm9uY2UpLnB1dChcIjFcIik7XG59KTtcblxuY29uc3QgdG9waWNQcmVmaXhlcyA9IHtcbiAgY2hhdG1zZzogXCJjaGF0OlwiLFxuICBjb21tZW50OiBcImNvbW1lbnRzOlwiXG59O1xuXG5jb25zdCBpbmRleCA9IFIuY3VycnkoKHBlZXIsIHRoaW5nSWQsIGRhdGEpID0+IHtcbiAgaWYgKCFkYXRhLnRvcGljICYmICFkYXRhLm9wSWQpIHJldHVybjtcblxuICBpZiAoZGF0YS5vcElkICYmICFkYXRhLnRvcGljKSB7XG4gICAgcGVlci5ndW5cbiAgICAgIC5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSkpXG4gICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgLm9uKGZ1bmN0aW9uIHJlY3YodGQpIHtcbiAgICAgICAgaWYgKCF0ZCkgcmV0dXJuO1xuICAgICAgICBpbmRleChwZWVyLCB0aGluZ0lkLCB7IC4uLmRhdGEsIHRvcGljOiB0ZC50b3BpYyB8fCBcImFsbFwiIH0pO1xuICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF5U3RyID0gVGhpbmdTZXQuZGF5U3RyKGRhdGEudGltZXN0YW1wKTtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF5U3RyLnNwbGl0KFwiL1wiKTtcbiAgY29uc3QgdG9waWNQcmVmaXggPSB0b3BpY1ByZWZpeGVzW2RhdGEua2luZF0gfHwgXCJcIjtcbiAgY29uc3QgYmFzZVRvcGljTmFtZSA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IHRvcGljTmFtZSA9IHRvcGljUHJlZml4ICsgYmFzZVRvcGljTmFtZTtcbiAgY29uc3QgdG9waWMgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUgfSkpO1xuICBjb25zdCB0b3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSwgeWVhciwgbW9udGgsIGRheSB9KVxuICApO1xuXG4gIGlmICghZGF0YS5za2lwQWxsICYmIGRhdGEudG9waWMgIT09IFwiYWxsXCIpIHtcbiAgICBjb25zdCBhbGxuYW1lID0gYCR7dG9waWNQcmVmaXh9YWxsYDtcbiAgICBjb25zdCBhbGxUb3BpYyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiBhbGxuYW1lIH0pXG4gICAgKTtcbiAgICBjb25zdCBhbGxUb3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdG9waWNOYW1lOiBhbGxuYW1lLFxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgZGF5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBhbGxUb3BpYy5zZXQodGhpbmcpO1xuICAgIGFsbFRvcGljRGF5LnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5raW5kID09PSBcInN1Ym1pc3Npb25cIikge1xuICAgIGNvbnN0IHVybEluZm8gPSBkYXRhLnVybCA/IHBhcnNlVVJJKGRhdGEudXJsKSA6IHt9O1xuICAgIGNvbnN0IGRvbWFpbk5hbWUgPSAoZGF0YS51cmxcbiAgICAgID8gKHVybEluZm8uaG9zdCB8fCB1cmxJbmZvLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIilcbiAgICAgIDogYHNlbGYuJHtkYXRhLnRvcGljfWBcbiAgICApLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZG9tYWluID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWUgfSkpO1xuXG4gICAgZG9tYWluLnNldCh0aGluZyk7XG5cbiAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgIGNvbnN0IHVybE5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlVSTC5yb3V0ZS5yZXZlcnNlKHsgdXJsOiBkYXRhLnVybCB9KSk7XG5cbiAgICAgIC8vIHRoaW5nLmdldChcInVybFwiKS5wdXQodXJsTm9kZSk7XG4gICAgICB1cmxOb2RlLnNldCh0aGluZyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGFsbGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KVxuICAgICk7XG5cbiAgICBhbGxjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRoaW5nSWQ6IGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHRvcGljLnNldCh0aGluZyk7XG4gIHRvcGljRGF5LnNldCh0aGluZyk7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nID0ge1xuICBwdXQsXG4gIHN1Ym1pdCxcbiAgY29tbWVudCxcbiAgY2hhdCxcbiAgd3JpdGVQYWdlLFxuICB2b3RlLFxuICBpbmRleFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHRva2VuaXplID0gc291cmNlID0+IHtcbiAgY29uc3QgdG9rZW5NYXAgPSAoc291cmNlIHx8IFwiXCIpLnNwbGl0KFwiXFxuXCIpLnJlZHVjZSgoZGVmLCBsaW5lKSA9PiB7XG4gICAgY29uc3QgdG9rZW5zID0gbGluZVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLm1hcChSLnRyaW0pXG4gICAgICAuZmlsdGVyKHggPT4geCk7XG5cbiAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHJldHVybiBkZWY7XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2Vucywge30sIGRlZik7XG4gIH0sIHt9KTtcblxuICBjb25zdCBpc1ByZXNlbnQgPSBwID0+IHtcbiAgICBsZXQgY2hlY2sgPSBwO1xuXG4gICAgaWYgKHR5cGVvZiBwID09PSBcInN0cmluZ1wiKSBjaGVjayA9IHAuc3BsaXQoXCIgXCIpO1xuICAgIHJldHVybiBjaGVjayAmJiBSLnBhdGgoY2hlY2ssIHRva2VuTWFwKTtcbiAgfTtcblxuICBjb25zdCBnZXRWYWx1ZXMgPSBwID0+IFIua2V5c0luKGlzUHJlc2VudChwKSk7XG4gIGNvbnN0IGdldFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocClbMF0gfHwgbnVsbDtcbiAgY29uc3QgZ2V0TGFzdFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocCkucG9wKCkgfHwgbnVsbDtcblxuICBjb25zdCBnZXRWYWx1ZUNoYWluID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGxldCBuZXh0ID0gcDtcblxuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBuZXh0ID0gZ2V0VmFsdWUoWy4uLmtleXMsIC4uLnZhbHVlc10pO1xuICAgICAgbmV4dCAmJiB2YWx1ZXMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFBhaXJzID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuXG4gICAgcmV0dXJuIGdldFZhbHVlcyhrZXlzKS5yZWR1Y2UoKHBhaXJzLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldFZhbHVlKFsuLi5rZXlzLCBrZXldKTtcblxuICAgICAgcmV0dXJuIFsuLi5wYWlycywgW2tleSwgdmFsXV07XG4gICAgfSwgW10pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlLFxuICAgIGlzUHJlc2VudCxcbiAgICBnZXRWYWx1ZSxcbiAgICBnZXRWYWx1ZXMsXG4gICAgZ2V0TGFzdFZhbHVlLFxuICAgIGdldFZhbHVlQ2hhaW4sXG4gICAgZ2V0UGFpcnNcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2tlbml6ZXIgPSB7IHRva2VuaXplIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBjcmVhdGVTdXBwcmVzc29yIH0gZnJvbSBcImd1bi1zdXBwcmVzc29yXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuXG5jb25zdCBpc0xlZ2FjeVRoaW5nID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBkYXRhU291bCA9IFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSk7XG4gIGNvbnN0IG5ld2VzdCA9IFIud2l0aG91dChcbiAgICBbXCJjb21tZW50c1wiLCBcImFsbGNvbW1lbnRzXCIsIFwidm90ZXN1cFwiLCBcInZvdGVzZG93blwiXSxcbiAgICBSLmtleXMoUi5wYXRoKFtcIl9cIiwgXCI+XCJdLCBkYXRhKSlcbiAgKVxuICAgIC5tYXAoa2V5ID0+IFIucGF0aChbXCJfXCIsIFwiPlwiLCBrZXldLCBkYXRhKSlcbiAgICAuc29ydCgpXG4gICAgLnBvcCgpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IHNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goZGF0YVNvdWwpIHx8IHt9O1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gdGhpbmdJZCAmJiBuZXdlc3QgJiYgbmV3ZXN0IDwgMTU0MzEwMjgxNDk0NTtcbn07XG5cbmNvbnN0IHRoaW5nSGFzaE1hdGNoZXNTb3VsID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gKFxuICAgIGlkICYmXG4gICAgaWQgPT09XG4gICAgICBvYmpIYXNoKHtcbiAgICAgICAgYXV0aG9ySWQ6IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGltZXN0YW1wOiBwYXJzZUludChSLnByb3AoXCJ0aW1lc3RhbXBcIiwgZGF0YSksIDEwKSxcbiAgICAgICAga2luZDogUi5wcm9wKFwia2luZFwiLCBkYXRhKSxcbiAgICAgICAgdG9waWM6IFIucHJvcChcbiAgICAgICAgICBcInRvcGljTmFtZVwiLFxuICAgICAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5tYXRjaChSLnBhdGgoW1widG9waWNcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3BJZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgcmVwbHlUb0lkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9yaWdpbmFsSGFzaDogUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpXG4gICAgICB9KVxuICApO1xufTtcblxuY29uc3Qgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGF1dGhvcklkID0gKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkO1xuICBjb25zdCBzaWduZWRJZCA9IFIucHJvcChcbiAgICBcImF1dGhvcklkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBhdXRob3JJZCAmJiBhdXRob3JJZCA9PT0gc2lnbmVkSWQ7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpO1xuICBjb25zdCBpZCA9IFIucHJvcChcbiAgICBcInRoaW5nSWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSBvcmlnaW5hbEhhc2g7XG59O1xuXG5jb25zdCBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UgPSBhanYgPT4gKFxuICBub2RlVHlwZU5hbWUsXG4gIGRhdGEsXG4gIF9wU2NoZW1hLFxuICBfY1BhdGgsXG4gIHBhcmVudERhdGFcbikgPT4ge1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgcGFyZW50RGF0YSkgfHwgXCJcIikgfHwge307XG4gIGNvbnN0IHsgdGhpbmdJZDogcHJvcFRoaW5nSWQgfSA9IFNjaGVtYVtub2RlVHlwZU5hbWVdLnJvdXRlLm1hdGNoKFxuICAgIFIucHJvcChcIiNcIiwgZGF0YSkgfHwgXCJcIlxuICApO1xuXG4gIGlmICghdGhpbmdJZCB8fCB0aGluZ0lkICE9PSBwcm9wVGhpbmdJZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYWp2LmNvbXBpbGUoeyAkcmVmOiBgc2NoZW1hLmpzb24jL2RlZmluaXRpb25zLyR7bm9kZVR5cGVOYW1lfUVkZ2VgIH0pKFxuICAgIGRhdGFcbiAgKTtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YUhhc2hNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgeyBfLCAuLi5yZWNvcmQgfSA9IGRhdGEgfHwge307IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICByZWNvcmQudGltZXN0YW1wID0gcGFyc2VGbG9hdChyZWNvcmQudGltZXN0YW1wLCAxMCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikgfHwge307XG5cbiAgcmV0dXJuIHRoaW5nSWQgJiYgdGhpbmdJZCA9PT0gb2JqSGFzaChyZWNvcmQpO1xufTtcblxuY29uc3QgaXNWb3RlVmFsaWQgPSAoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkgPT4ge1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiLCBjb25maWcgPSB7fSB9ID0gc2NoZW1hIHx8IHt9O1xuXG4gIGNvbnN0IG5vbmNlID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20odm90ZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIodm90ZSwgXCJoZXhcIik7XG4gIGNvbnN0IHNhbHQgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbShub25jZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIobm9uY2UsIFwiaGV4XCIpO1xuICBjb25zdCBoYXNoID0gYXJnb24yLmhhc2gocHJlZml4LCB7XG4gICAgc2FsdCxcbiAgICBoYXNoTGVuZ3RoOiBjb25maWcuaGFzaExlbmd0aCxcbiAgICB0aW1lQ29zdDogY29uZmlnLnRpbWVDb3N0LFxuICAgIG1lbW9yeUNvc3Q6IGNvbmZpZy5tZW1vcnlDb3N0LFxuICAgIHBhcmFsbGVsaXNtOiBjb25maWcucGFyYWxsZWxpc20sXG4gICAgcmF3OiB0cnVlLFxuICAgIHR5cGU6IGFyZ29uMlthbGdvcml0aG1dXG4gIH0pO1xuICBsZXQgb2ZmID0gMDtcbiAgbGV0IGk7XG5cbiAgZm9yIChpID0gMDsgaSA8PSBjb25maWcuY29tcGxleGl0eSAtIDg7IGkgKz0gOCwgb2ZmKyspIHtcbiAgICBpZiAoaGFzaFtvZmZdICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWFzayA9IDB4ZmYgPDwgKDggKyBpIC0gY29uZmlnLmNvbXBsZXhpdHkpO1xuXG4gIHJldHVybiAoaGFzaFtvZmZdICYgbWFzaykgPT09IDA7XG59O1xuXG5jb25zdCBrZXlzQXJlUHJvb2ZzT2ZXb3JrID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhcmdvbjIgPSByZXF1aXJlKFwiYXJnb24yXCIpO1xuXG4gIGlmICghYXJnb24yKSByZXR1cm4gdHJ1ZTsgLy8gaW4gYnJvd3NlciBkb24ndCBib3RoZXIgZm9yIG5vd1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiIH0gPSBzY2hlbWEgfHwge307XG4gIGNvbnN0IHByZWZpeCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKGFsZ29yaXRobSAhPT0gXCJhcmdvbjJkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGFyZ29uMiBzdXBwb3J0ZWQgZm9yIHZvdGUgaGFzaGVzXCIpO1xuICB9XG5cbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaCh2b3RlID0+IHtcbiAgICBpZiAoIWlzVm90ZVZhbGlkKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgdm90ZVwiLCBwcmVmaXgsIHZvdGUpO1xuICAgICAgZGVsZXRlIGRhdGFbdm90ZV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBpbml0QWp2ID0gUi5jb21wb3NlKFxuICBhanYgPT4ge1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiaXNMZWdhY3lUaGluZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogaXNMZWdhY3lUaGluZ1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nSGFzaE1hdGNoZXNTb3VsXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nUmVsYXRlZEVkZ2VcIiwge1xuICAgICAgdmFsaWRhdGU6IGdldElzVGhpbmdSZWxhdGVkRWRnZShhanYpXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YUhhc2hNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJrZXlzQXJlUHJvb2ZzT2ZXb3JrXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGFqdjtcbiAgfSxcbiAgc2VhLmluaXRBanZcbik7XG5cbmV4cG9ydCBjb25zdCBzdXBwcmVzc29yID0gY3JlYXRlU3VwcHJlc3Nvcih7XG4gIGRlZmluaXRpb25zOiBTY2hlbWEuZGVmaW5pdGlvbnMsXG4gIGluaXQ6IGluaXRBanZcbn0pO1xuXG5jb25zdCBndW5XaXJlSW5wdXQgPSBSLmN1cnJ5KChwZWVyLCBjb250ZXh0KSA9PlxuICBjb250ZXh0Lm9uKFwiaW5cIiwgZnVuY3Rpb24gd2lyZUlucHV0KG1zZykge1xuICAgIGNvbnN0IF8gPSBtc2dbXCJfXCJdO1xuXG4gICAgZGVsZXRlIG1zZ1tcIl9cIl07XG4gICAgaWYgKFwicGluZ1wiIGluIG1zZyB8fCBcImxlZWNoXCIgaW4gbXNnKSByZXR1cm47XG4gICAgaWYgKG1zZy5wdXQgJiYgIVIua2V5cyhtc2cucHV0KS5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBwcm9taXNlID0gcGVlci5jb25maWcuZGlzYWJsZVZhbGlkYXRpb25cbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKG1zZylcbiAgICAgIDogc3VwcHJlc3Nvci52YWxpZGF0ZShtc2cpO1xuXG4gICAgcHJvbWlzZVxuICAgICAgLnRoZW4odmFsaWRhdGVkID0+IHtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHJldHVybiBjb25zb2xlLmxvZyhcIm1zZyBkaWRuJ3QgdmFsaWRhdGVcIiwgbXNnKTtcbiAgICAgICAgbXNnW1wiX1wiXSA9IF87XG4gICAgICAgIHJldHVybiB0aGlzLnRvLm5leHQobXNnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJ2YWxpZGF0ZSBlcnJcIiwgbXNnLCBlcnIuc3RhY2sgfHwgZXJyKSk7XG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgVmFsaWRhdGlvbiA9IHtcbiAgaXNMZWdhY3lUaGluZyxcbiAgdGhpbmdIYXNoTWF0Y2hlc1NvdWwsXG4gIHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMsXG4gIHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2gsXG4gIGdldElzVGhpbmdSZWxhdGVkRWRnZSxcbiAgdGhpbmdEYXRhSGFzaE1hdGNoZXMsXG4gIGlzVm90ZVZhbGlkLFxuICBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICBpbml0QWp2LFxuICBzdXBwcmVzc29yLFxuICBndW5XaXJlSW5wdXRcbn07XG4iLCJpbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5leHBvcnQgeyBMaXN0aW5nIH0gZnJvbSBcIi4vTGlzdGluZ1wiO1xuZXhwb3J0IHsgUGVlciB9IGZyb20gXCIuL1BlZXJcIjtcbmV4cG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmV4cG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuZXhwb3J0IHsgVGhpbmcsIFRoaW5nU2V0LCBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmV4cG9ydCB7IFZhbGlkYXRpb24gfSBmcm9tIFwiLi9WYWxpZGF0aW9uXCI7XG5leHBvcnQgZGVmYXVsdCBQZWVyLmluaXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYXJnb24yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9zZWFyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JhbWRhX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JvdXRlX3BhcnNlcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXzsiXSwic291cmNlUm9vdCI6IiJ9