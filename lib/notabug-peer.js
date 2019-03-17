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
      var user = peer.gun.user();

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

  console.log("ListingNode.read", path);
  return rowsFromSouls(scope, [soulFromPath(indexer, path)]).then(rowsToIds);
}, "listingRows");
var get = (0, _gunScope.query)(function (scope, soul) {
  return soul ? scope.get(soul) : (0, _gunScope.resolve)(null);
}, "listing");
var ListingNode = {
  POS_IDX: POS_IDX,
  POS_ID: POS_ID,
  POS_VAL: POS_VAL,
  source: source,
  get: get,
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
var getSpec = (0, _gunScope.query)(function (scope, _ref2) {
  var authorId = _ref2.authorId,
      name = _ref2.name,
      sort = _ref2.sort;
  return _SpaceSpec.SpaceSpec.getSpec(scope, authorId, name, "sort ".concat(sort));
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
  return (0, _gunScope.all)([getSpec(scope, match), _ListingNode.ListingNode.getRowsFromSouls(scope, souls)]).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        spec = _ref4[0],
        rows = _ref4[1];

    var filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

    return _ListingFilter.ListingFilter.getFilteredIds(scope, rows, { ...opts,
      filterFn: filterFn
    });
  });
});

var onPut = function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(orc, route, _ref5) {
    var updatedSoul, diff, original, _ref5$latest, latest, scope, originalData, diffData, _ListingNode$categori, _ListingNode$categori2, updatedIds, removedIds, spec, voteCountsMatch, thingMatch, _ref7, thingId, authorMatch, key, node, existingKeys;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updatedSoul = _ref5.updatedSoul, diff = _ref5.diff, original = _ref5.original, _ref5$latest = _ref5.latest, latest = _ref5$latest === void 0 ? 0 : _ref5$latest;
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
            _ref7 = _Schema.Schema.ThingDataSigned.route.match(updatedSoul) || {}, thingId = _ref7.thingId;
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
    return _ref6.apply(this, arguments);
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

var _Query = __webpack_require__(/*! ../Query */ "./src/Query.js");

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
var getSource = (0, _gunScope.query)(function (scope, authorId, name, extra) {
  return _ListingSpec.ListingSpec.getSource(scope, authorId, spaceConfigPageName(name), extra).then(sourceWithDefaults(authorId, name));
});
var getSpec = (0, _gunScope.query)(function (scope, authorId, name, extra) {
  return getSource(scope, authorId, name, extra).then(function (source) {
    return _ListingSpec.ListingSpec.fromSource(source, authorId, name);
  });
});
var nodeToSpaceNames = R.compose(R.sortBy(R.identity), R.map(R.replace(/^space:/, "")), R.filter(R.compose(R.prop("length"), R.match(/^space:[^:]*$/))), R.keys);
var userSpaceNames = (0, _gunScope.query)(function (scope, authorId) {
  return _Query.Query.userPages(scope, authorId).then(nodeToSpaceNames);
});
var SpaceSpec = {
  nodeToSpaceNames: nodeToSpaceNames,
  userSpaceNames: userSpaceNames,
  tabs: tabs,
  getSource: getSource,
  getSpec: getSpec
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
Object.defineProperty(exports, "ListingNode", {
  enumerable: true,
  get: function get() {
    return _ListingNode.ListingNode;
  }
});
Object.defineProperty(exports, "ListingSpec", {
  enumerable: true,
  get: function get() {
    return _ListingSpec.ListingSpec;
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

var _ListingNode = __webpack_require__(/*! ./ListingNode */ "./src/Listing/ListingNode.js");

var _ListingSpec = __webpack_require__(/*! ./ListingSpec */ "./src/Listing/ListingSpec.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

var _ListingDefinition = __webpack_require__(/*! ./ListingDefinition */ "./src/Listing/ListingDefinition.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

var _ListingOracle = __webpack_require__(/*! ./ListingOracle */ "./src/Listing/ListingOracle.js");

var _ListingSort = __webpack_require__(/*! ./ListingSort */ "./src/Listing/ListingSort.js");

var _ListingType = __webpack_require__(/*! ./ListingType */ "./src/Listing/ListingType/index.js");

var _SpaceSpec = __webpack_require__(/*! ./SpaceSpec */ "./src/Listing/SpaceSpec.js");

var Listing = {
  ListingNode: _ListingNode.ListingNode,
  ListingSpec: _ListingSpec.ListingSpec,
  get: _ListingNode.ListingNode.get,
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
  if (!id) return (0, _gunScope.resolve)(null);
  return scope.get("~".concat(id)).then(function (meta) {
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
Object.defineProperty(exports, "Config", {
  enumerable: true,
  get: function get() {
    return _Config.Config;
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
Object.defineProperty(exports, "SpaceSpec", {
  enumerable: true,
  get: function get() {
    return _Listing.SpaceSpec;
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
Object.defineProperty(exports, "Promise", {
  enumerable: true,
  get: function get() {
    return _gunScope.Promise;
  }
});
exports.default = void 0;

var _Peer = __webpack_require__(/*! ./Peer */ "./src/Peer.js");

var _Config = __webpack_require__(/*! ./Config */ "./src/Config.js");

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

var _Listing = __webpack_require__(/*! ./Listing */ "./src/Listing/index.js");

var _Query = __webpack_require__(/*! ./Query */ "./src/Query.js");

var _Schema = __webpack_require__(/*! ./Schema */ "./src/Schema.js");

var _Thing = __webpack_require__(/*! ./Thing */ "./src/Thing/index.js");

var _Validation = __webpack_require__(/*! ./Validation */ "./src/Validation.js");

var _gunScope = __webpack_require__(/*! gun-scope */ "gun-scope");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9HdW5Ob2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdEYXRhU291cmNlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdEZWZpbml0aW9uLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ05vZGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ09yYWNsZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nUXVlcnkuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1NvcnQuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1NwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvQ29tbWVudExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9JbmJveExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvUHJvZmlsZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvU3BhY2VMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1RvcGljTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9QYXRoLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL1NwYWNlU3BlYy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvUGVlci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvUXVlcnkuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1NjaGVtYS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdEYXRhTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdTZXQuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Ub2tlbml6ZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImFyZ29uMlwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zY29wZVwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcIm9iamVjdC1oYXNoXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicmFtZGFcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJyb3V0ZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJ1cmktanNcIiJdLCJuYW1lcyI6WyJzaWdudXAiLCJSIiwiY3VycnkiLCJwZWVyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm9wdHMiLCJvayIsImZhaWwiLCJndW4iLCJ1c2VyIiwicmVzb2x2ZSIsImNyZWF0ZSIsImFjayIsImVyciIsImxlYXZlIiwibG9naW4iLCJ0aGVuIiwiYXV0aCIsImlzIiwicmVzdWx0IiwiX29uTG9naW4iLCJsb2dvdXQiLCJpc0xvZ2dlZEluIiwib25Mb2dpbiIsImZuIiwiQXV0aGVudGljYXRpb24iLCJDb25maWciLCJ0YWJ1bGF0b3IiLCJERVZfSU5ERVhFUiIsImluZGV4ZXIiLCJvd25lciIsInVwZGF0ZSIsImNvbXBvc2UiLCJtYXAiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiQ09NTUFORF9SRSIsIlBSRUZJWCIsIlNPVUxfREVMSU1FVEVSIiwiTElTVElOR19TSVpFIiwiTUFYX0hBU0hfU0laRSIsIk1BWF9QT1dfTk9OQ0VfU0laRSIsIk1BWF9UT1BJQ19TSVpFIiwiTUFYX0FVVEhPUl9BTElBU19TSVpFIiwiTUFYX0FVVEhPUl9JRF9TSVpFIiwiTUFYX1VSTF9TSVpFIiwiTUFYX0RPTUFJTl9TSVpFIiwiTUFYX1RISU5HX0tJTkRfU0laRSIsIk1BWF9USElOR19USVRMRV9TSVpFIiwiTUFYX1RISU5HX0JPRFlfU0laRSIsIk1BWF9MSVNUSU5HX0lEU19TSVpFIiwiTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUiLCJNQVhfTElTVElOR19UQUJTX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9LSU5EX1NJWkUiLCJERUZBVUxUX0lOREVYRVIiLCJDb25zdGFudHMiLCJzb3VsIiwicGF0aE9yIiwic3RhdGUiLCJsYXRlc3QiLCJsYXN0Iiwic29ydEJ5IiwiaWRlbnRpdHkiLCJ2YWx1ZXMiLCJlZGdlcyIsInByb3AiLCJkZWNvZGVTRUEiLCJyYXdEYXRhIiwiZGF0YSIsInBhdGgiLCJHdW4iLCJTRUEiLCJpbmRleE9mIiwid2l0aG91dCIsImtleXMiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJyZWR1Y2UiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsInQiLCJxdWVyeSIsIm11bHRpVG9waWMiLCJkb21haW5Tb3VyY2UiLCJkb21haW5zIiwibGVuZ3RoIiwiZCIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsImlkIiwibXVsdGlBdXRob3IiLCJjdXJhdG9yU291cmNlIiwiY3VyYXRvcnMiLCJjdXJhdGUiLCJpZHMiLCJ0aGluZ0lkIiwiVGhpbmciLCJyb3V0ZSIsInJldmVyc2UiLCJvcFNvdXJjZSIsInN1Ym1pc3Npb25JZHMiLCJtdWx0aVN1Ym1pc3Npb24iLCJyZXBsaWVzU291cmNlIiwicmVwbGllc1RvQXV0aG9yIiwicmVwbGllc1RvQXV0aG9ySWQiLCJzb3VyY2VzIiwibGlzdGluZyIsInJlcGxpZXMiLCJvcCIsImN1cmF0b3IiLCJhdXRob3IiLCJkb21haW4iLCJ0b3BpYyIsInNvdXJjZU5hbWVzIiwic291cmNlTmFtZSIsImRlZiIsImZyb21EZWZpbml0aW9uIiwibmFtZSIsIm1lcmdlTGVmdCIsIkxpc3RpbmdEYXRhU291cmNlIiwiZnJvbVNvdXJjZSIsInNvdXJjZSIsIm93bmVySWQiLCJzcGFjZU5hbWUiLCJ0b2tlbml6ZWQiLCJ0b2tlbml6ZSIsIm9iaiIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiZ2V0VmFsdWVDaGFpbiIsImdldFBhaXJzIiwiZnJvbVBhZ2VBdXRob3IiLCJmcm9tUGFnZU5hbWUiLCJ1bmRlZmluZWQiLCJkaXNwbGF5TmFtZSIsInRhYnMiLCJ1bmlxdWVCeUNvbnRlbnQiLCJtb2RlcmF0b3JzIiwiaW5jbHVkZVJhbmtzIiwic3RpY2t5SWRzIiwiaXNJZFN0aWNreSIsInN1Ym1pdFRvcGljcyIsInN1Ym1pdFRvcGljIiwiY2hhdFRvcGljIiwidXNlRm9yQ29tbWVudHMiLCJkZWZhdWx0VGFiIiwiZGVmYXVsdFRhYlBhdGgiLCJmaWx0ZXJzIiwiZnVuY3Rpb25zIiwiYWxsb3ciLCJyZXBsaWVzVG8iLCJvcHMiLCJhbGlhc2VzIiwiYXV0aG9ycyIsImtpbmRzIiwiYW5vbiIsInNpZ25lZCIsImRlbnkiLCJ0YWdzIiwidm90ZUZpbHRlcnMiLCJ1cHNNaW4iLCJwYXJzZUludCIsInVwc01heCIsImRvd25zTWluIiwiZG93bnNNYXgiLCJzY29yZU1pbiIsInNjb3JlTWF4IiwiY2Vuc29ycyIsInVuaXEiLCJMaXN0aW5nRGVmaW5pdGlvbiIsImludFBhdGgiLCJwIiwiZmlsdGVyRnVuY3Rpb25zIiwidm90ZUZpbHRlckZ1bmN0aW9ucyIsImFkZEZpbHRlciIsInB1c2giLCJhZGRWb3RlRmlsdGVyIiwiaWRlbnRpY2FsIiwic3BsaXQiLCJraW5kIiwidGVzdCIsImFsaWFzIiwiYXV0aG9ySWQiLCJsdGUiLCJndGUiLCJ0aGluZyIsImNtZHMiLCJ0YWdOYW1lIiwiY29udGVudEZpbHRlciIsInZvdGVGaWx0ZXIiLCJ0aGluZ0ZpbHRlciIsImdldEZpbHRlcmVkSWRzIiwic29ydGVkUm93cyIsImxpbWl0IiwiY291bnQiLCJhZnRlciIsImZpbHRlckZuIiwicm93cyIsInNsaWNlIiwiZmlsdGVyZWQiLCJmZXRjaEJhdGNoIiwic2l6ZSIsIlByb21pc2UiLCJyb3ciLCJpbkxpc3RpbmciLCJQT1NfSUQiLCJzcGxpY2UiLCJQT1NfVkFMIiwic3BlYyIsInRoaW5nTWV0YSIsInRoaW5nU291bCIsInNjb3JlcyIsIkxpc3RpbmdGaWx0ZXIiLCJQT1NfSURYIiwicm93c1RvSWRzIiwicm93c1RvSXRlbXMiLCJwcm9wT3IiLCJzb3VsRnJvbVBhdGgiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwicGFyc2VGbG9hdCIsInRyaW0iLCJpdGVtS2V5cyIsImZpbHRlciIsInNvcnRSb3dzIiwic29ydFdpdGgiLCJhc2NlbmQiLCJjb25kIiwiaXNOaWwiLCJJbmZpbml0eSIsIlQiLCJzb3J0ZWRJZHMiLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImpvaW4iLCJpbnNlcnRlZCIsInBvcCIsInJlcGxhY2VkIiwiY29uc29sZSIsImxvZyIsImNhdGVnb3JpemVEaWZmIiwib3JpZ2luYWwiLCJhbGxLZXlzIiwiX2RpZmZJZHgiLCJkaWZmSWQiLCJfb3JpZ0lkeCIsIm9yaWdJZCIsInVuaW9uUm93cyIsInVuaXFCeSIsInJvd3NGcm9tU291bHMiLCJyZWFkIiwiTGlzdGluZ05vZGUiLCJ1cGRhdGVMaXN0aW5nIiwib3JjIiwibmV3U2NvcGUiLCJ0b0l0ZW1zIiwid3JpdGUiLCJvblB1dCIsInVwZGF0ZWRTb3VsIiwidXBkYXRlZElkcyIsIlRoaW5nVm90ZUNvdW50cyIsIm1hdGNoIiwiaXNTdGlja3kiLCJlcXVhbHMiLCJnZXRBY2Nlc3NlcyIsImxpc3RlbiIsIkxpc3RpbmdPcmFjbGUiLCJmcm9tU3BlYyIsInBhdGhzIiwiZnJvbVBhdGgiLCJnZXRTcGVjIiwiaGFzSW5kZXhlciIsImNhbGN1bGF0ZSIsIkxpc3RpbmdRdWVyeSIsInRvSWRzIiwidm90ZVNvcnQiLCJjb250YWlucyIsInRpbWVTb3J0Iiwic29ydHMiLCJuZXciLCJtdWx0aXBseSIsIkRhdGUiLCJnZXRUaW1lIiwib2xkIiwiYWN0aXZlIiwidGltZXN0YW1wIiwibGFzdEFjdGl2ZSIsInRvcCIsIngiLCJjb21tZW50cyIsImRpc2N1c3NlZCIsInNjb3JlIiwic2Vjb25kcyIsIm9yZGVyIiwiTWF0aCIsImxvZzEwIiwibWF4IiwiYWJzIiwiaG90Iiwic2lnbiIsImJlc3QiLCJ1cHMiLCJkb3ducyIsIm4iLCJ6IiwibGVmdCIsInJpZ2h0Iiwic3FydCIsInVuZGVyIiwiY29udHJvdmVyc2lhbCIsIm1hZ25pdHVkZSIsImJhbGFuY2UiLCJ0b0l0ZW0iLCJmcm9tVGhpbmdTZXRzIiwicGlwZSIsInVuaW9uIiwiTGlzdGluZ1NvcnQiLCJhcHBseSIsImFwIiwib2YiLCJhc3NvYyIsImdldFNvdXJjZSIsImV4dHJhIiwid2lraVBhZ2UiLCJib2R5IiwiTGlzdGluZ1NwZWMiLCJDb21tZW50TGlzdGluZyIsIndpdGhSb3V0ZSIsInNwbGl0VG9waWNzIiwidGFiIiwiRG9tYWluTGlzdGluZyIsImRpZmZEYXRhIiwidXBkYXRlZEF1dGhvcmVkIiwib3BJZCIsIlRoaW5nQ29tbWVudHMiLCJyZXBseUlkcyIsIkluYm94TGlzdGluZyIsIlByb2ZpbGVMaXN0aW5nIiwicm91dGVQcm9wcyIsIlNwYWNlTGlzdGluZyIsImdldFJvd3NGcm9tU291bHMiLCJvcmlnaW5hbERhdGEiLCJyZW1vdmVkSWRzIiwidm90ZUNvdW50c01hdGNoIiwidGhpbmdNYXRjaCIsIlRoaW5nRGF0YVNpZ25lZCIsImF1dGhvck1hdGNoIiwiU0VBQXV0aG9yIiwiZnJvbVBhZ2VJZCIsImV4aXN0aW5nS2V5cyIsIndvcmsiLCJtZXRob2QiLCJwcmlvcml0eSIsInN1Ym1pdFRvIiwiVG9waWNMaXN0aW5nIiwidHlwZXMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJkZWZhdWx0VG8iLCJQYXRoIiwic3BhY2VDb25maWdQYWdlTmFtZSIsInNvdXJjZVdpdGhEZWZhdWx0cyIsIm5vZGVUb1NwYWNlTmFtZXMiLCJyZXBsYWNlIiwidXNlclNwYWNlTmFtZXMiLCJ1c2VyUGFnZXMiLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwiaW5pdCIsImNvbmZpZyIsImxlZWNoIiwiZGlzYWJsZVZhbGlkYXRpb24iLCJub0d1biIsImxvY2FsU3RvcmFnZSIsInBlcnNpc3QiLCJyZXN0IiwiY2ZnIiwicmFkaXNrIiwib24iLCJndW5XaXJlSW5wdXQiLCJzdG9yZUZuIiwic3RvcmUiLCJhIiwicmV0cnkiLCJzZW5kTGVlY2giLCJfIiwiY3JlYXRlU2NvcGUiLCJzdWJtaXQiLCJjb21tZW50IiwiY2hhdCIsIndyaXRlUGFnZSIsInZvdGUiLCJxdWVyaWVzIiwiUGVlciIsImVtcHR5UHJvbWlzZSIsInVuaW9uQXJyYXlzIiwidG9waWNTb3VscyIsInBhcmFtcyIsImRheXMiLCJkYXlTdHJpbmdzIiwib25lRGF5Iiwic3RhcnQiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJtZXRhIiwicmVwbHlUb1NvdWwiLCJvcFNvdWwiLCJ0aGluZ2lkIiwicmVwbHlUb0lkIiwidGhpbmdWb3RlQ291bnQiLCJ2b3RlVHlwZSIsInRoaW5nVm90ZXNVcCIsInRoaW5nVm90ZXNEb3duIiwidGhpbmdBbGxDb21tZW50c0NvdW50IiwiY29tcHV0ZVRoaW5nU2NvcmVzIiwidXAiLCJkb3duIiwidm90ZXMiLCJtdWx0aVRoaW5nTWV0YSIsInByb21pc2VzIiwibXVsdGlRdWVyeSIsInNpbmdsZVF1ZXJ5IiwicGx1cmFsIiwic2luZ2xlIiwiY29sbGF0ZSIsIml0ZW1zIiwidGhpbmdEYXRhRnJvbVNvdWxzIiwiY3VyYXRlZCIsInN1Ym1pc3Npb25Pbmx5IiwiaWRzMSIsImlkczIiLCJ0aGluZ1Njb3JlcyIsInRoaW5nUmVwbGllcyIsInRoaW5nRGF0YSIsIkF1dGhvclBhZ2VzIiwid2lraVBhZ2VJZCIsInVzZXJNZXRhIiwidXNlckFsaWFzIiwiY3JlYXRlZEF0IiwibmFiIiwiUXVlcnkiLCJkZWZpbml0aW9ucyIsInNlYSIsIkFVVEhfU0NIRU1BIiwibWluTGVuZ3RoIiwibWF4TGVuZ3RoIiwiVG9waWNEYXkiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicGF0dGVybiIsInByb3BlcnRpZXMiLCIkcmVmIiwieWVhciIsIm1pbmltdW0iLCJtYXhpbXVtIiwibW9udGgiLCJkYXkiLCJyZXF1aXJlZCIsInByb3BzRnJvbVNvdWwiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImVkZ2VNYXRjaGVzS2V5IiwiYW55T2YiLCJUb3BpYyIsInVybCIsIlVSTCIsImFsbE9mIiwidGhpbmdLaW5kIiwib3JpZ2luYWxIYXNoIiwib25lT2YiLCJ0aGluZ1JlbGF0ZWRFZGdlIiwiYWxsY29tbWVudHMiLCJ2b3Rlc3VwIiwidm90ZXNkb3duIiwicmVwbHlUbyIsInRoaW5nSGFzaE1hdGNoZXNTb3VsIiwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nIiwidGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaCIsImlzTGVnYWN5VGhpbmciLCJQcm9vZk9mV29ya1ZvdGVzIiwiJGFzeW5jIiwia2V5c0FyZVByb29mc09mV29yayIsImFsZ29yaXRobSIsImNvbXBsZXhpdHkiLCJoYXNoTGVuZ3RoIiwidGltZUNvc3QiLCJtZW1vcnlDb3N0IiwicGFyYWxsZWxpc20iLCJUaGluZ1ZvdGVzVXAiLCJUaGluZ1ZvdGVzRG93biIsIlRoaW5nRGF0YSIsInRoaW5nRGF0YUhhc2hNYXRjaGVzU291bCIsImNvbW1hbmRzIiwiTGlzdGluZ0RhdGEiLCJ1c2VySWQiLCJpc0NoYXQiLCJwYXR0ZXJuUHJvcGVydGllcyIsInNvcnROYW1lIiwiZW51bSIsIlRoaW5nQ29tbWVudHNMaXN0aW5nIiwidXNlckxpc3RpbmdUeXBlIiwiQXV0aG9yUmVwbGllc0xpc3RpbmciLCJBdXRob3JQcm9maWxlTGlzdGluZyIsIkF1dGhvckNvbW1lbnRzIiwiQXV0aG9yU3VibWlzc2lvbnMiLCJBdXRob3JUaGluZ3MiLCJyb3V0ZXMiLCJkZWZzV2l0aFJvdXRlcyIsIlNjaGVtYSIsInVybFN0ciIsImhvc3QiLCJzY2hlbWUiLCJUaGluZ0RhdGFOb2RlIiwiYmluZCIsImRpc3NvYyIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJkYXlOdW0iLCJnZXRVVENEYXRlIiwiVGhpbmdTZXQiLCJwdXQiLCJkYXRhU291bCIsIm1ldGFEYXRhIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsInB1YiIsInRoaW5nc1NvdWwiLCJzdWJtaXNzaW9uc1NvdWwiLCJ0aGluZ3MiLCJzZXQiLCJjb21tZW50c1NvdWwiLCJyZWplY3QiLCJwYWdlc1NvdWwiLCJjaGFpbiIsIm5vbmNlIiwidG9waWNQcmVmaXhlcyIsImNoYXRtc2ciLCJyZWN2IiwidGQiLCJvZmYiLCJ0b3BpY1ByZWZpeCIsImJhc2VUb3BpY05hbWUiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInVybEluZm8iLCJ1cmxOb2RlIiwidG9rZW5NYXAiLCJsaW5lIiwidG9rZW5zIiwiYXNzb2NQYXRoIiwiY2hlY2siLCJrZXlzSW4iLCJnZXRMYXN0VmFsdWUiLCJuZXh0IiwicGFpcnMiLCJUb2tlbml6ZXIiLCJzY2hlbWEiLCJuZXdlc3QiLCJfc2NoZW1hIiwic3Vic3RyIiwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyIsInNpZ25lZElkIiwiZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlIiwiYWp2Iiwibm9kZVR5cGVOYW1lIiwiX3BTY2hlbWEiLCJfY1BhdGgiLCJwYXJlbnREYXRhIiwicHJvcFRoaW5nSWQiLCJjb21waWxlIiwidGhpbmdEYXRhSGFzaE1hdGNoZXMiLCJyZWNvcmQiLCJpc1ZvdGVWYWxpZCIsImFyZ29uMiIsInByZWZpeCIsIkJ1ZmZlciIsImhhc093blByb3BlcnR5IiwiZnJvbSIsInNhbHQiLCJoYXNoIiwicmF3IiwibWFzayIsInJlcXVpcmUiLCJFcnJvciIsImluaXRBanYiLCJhZGRLZXl3b3JkIiwidmFsaWRhdGUiLCJtb2RpZnlpbmciLCJzdXBwcmVzc29yIiwiY29udGV4dCIsIndpcmVJbnB1dCIsIm1zZyIsInByb21pc2UiLCJ2YWxpZGF0ZWQiLCJ0byIsImNhdGNoIiwiZXJyb3IiLCJzdGFjayIsIlZhbGlkYXRpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FD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QUFYQSxXQVB3QjtBQVF4QjlGLHFCQUFtQixFQUFuQkEsbUJBUndCO0FBU3hCMEcsU0FBTyxFQUFQQSxPQVR3QjtBQVV4QkksWUFBVSxFQUFWQSxVQVZ3QjtBQVd4QnhPLGNBQVksRUFBWkE7QUFYd0IsQ0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDek1QOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztlQUNlLFdBQUtYLEk7Ozs7Ozs7Ozs7OztBQ1ZwQixvRDs7Ozs7Ozs7Ozs7QUNBQSx1RDs7Ozs7Ozs7Ozs7QUNBQSw0RDs7Ozs7Ozs7Ozs7QUNBQSxpRTs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxtRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSxvRCIsImZpbGUiOiJub3RhYnVnLXBlZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwibm90YWJ1Zy1wZWVyXCIsIFtcImFyZ29uMlwiLCBcImd1bi1zY29wZVwiLCBcImd1bi1zdXBwcmVzc29yXCIsIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiLCBcIm9iamVjdC1oYXNoXCIsIFwicmFtZGFcIiwgXCJyb3V0ZS1wYXJzZXJcIiwgXCJ1cmktanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibm90YWJ1Zy1wZWVyXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXJnb24yXCIpLCByZXF1aXJlKFwiZ3VuLXNjb3BlXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3JcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIpLCByZXF1aXJlKFwib2JqZWN0LWhhc2hcIiksIHJlcXVpcmUoXCJyYW1kYVwiKSwgcmVxdWlyZShcInJvdXRlLXBhcnNlclwiKSwgcmVxdWlyZShcInVyaS1qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibm90YWJ1Zy1wZWVyXCJdID0gZmFjdG9yeShyb290W1wiYXJnb24yXCJdLCByb290W1wiZ3VuLXNjb3BlXCJdLCByb290W1wiZ3VuLXN1cHByZXNzb3JcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3Nvci1zZWFyXCJdLCByb290W1wib2JqZWN0LWhhc2hcIl0sIHJvb3RbXCJyYW1kYVwiXSwgcm9vdFtcInJvdXRlLXBhcnNlclwiXSwgcm9vdFtcInVyaS1qc1wiXSk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9hcmdvbjJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc2NvcGVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc3VwcHJlc3Nvcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX3NlYXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9vYmplY3RfaGFzaF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JhbWRhX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcm91dGVfcGFyc2VyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuXG5jb25zdCBzaWdudXAgPSBSLmN1cnJ5KFxuICAocGVlciwgdXNlcm5hbWUsIHBhc3N3b3JkLCBvcHRzID0ge30pID0+XG4gICAgbmV3IFByb21pc2UoKG9rLCBmYWlsKSA9PiB7XG4gICAgICBpZiAocGVlciAmJiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBwZWVyLmd1bi51c2VyKCk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgIHVzZXIuY3JlYXRlKFxuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIGFjayA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY2suZXJyKSB7XG4gICAgICAgICAgICAgICAgZmFpbChhY2suZXJyKTtcbiAgICAgICAgICAgICAgICB1c2VyLmxlYXZlKCk7XG4gICAgICAgICAgICAgICAgcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVlci5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpLnRoZW4ob2spO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3B0c1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWwoXCJTRUEgaXMgbm90IGxvYWRlZFwiKTtcbiAgICAgIH1cbiAgICB9KVxuKTtcblxuY29uc3QgbG9naW4gPSBSLmN1cnJ5KChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQpID0+XG4gIG5ldyBQcm9taXNlKChvaywgZmFpbCkgPT4ge1xuICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBwZWVyLnVzZXIoKTtcblxuICAgICAgdXNlci5hdXRoKHVzZXJuYW1lLCBwYXNzd29yZCwgYWNrID0+XG4gICAgICAgIGFjay5lcnIgPyBmYWlsKGFjay5lcnIpIDogb2socGVlci51c2VyKCkuaXMpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWlsKFwiU0VBIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgfVxuICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgcGVlci5fb25Mb2dpbiAmJiBwZWVyLl9vbkxvZ2luKHJlc3VsdCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KVxuKTtcblxuY29uc3QgbG9nb3V0ID0gcGVlciA9PiBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbmNvbnN0IGlzTG9nZ2VkSW4gPSBwZWVyID0+IHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIgJiYgcGVlci51c2VyKCkuaXM7XG5jb25zdCBvbkxvZ2luID0gUi5jdXJyeSgocGVlciwgZm4pID0+IChwZWVyLl9vbkxvZ2luID0gZm4pKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgY29uc3QgQXV0aGVudGljYXRpb24gPSB7XG4gIHNpZ251cCxcbiAgbG9naW4sXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgb25Mb2dpblxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IENvbmZpZyA9IHtcbiAgdGFidWxhdG9yOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIGluZGV4ZXI6IENvbnN0YW50cy5ERVZfSU5ERVhFUixcbiAgb3duZXI6IENvbnN0YW50cy5ERVZfSU5ERVhFUixcbiAgdXBkYXRlOiBSLmNvbXBvc2UoXG4gICAgUi5tYXAoKFtrZXksIHZhbF0pID0+IChDb25maWdba2V5XSA9IHZhbCkpLFxuICAgIFIudG9QYWlyc1xuICApXG59O1xuIiwiY29uc3QgQ09NTUFORF9SRSA9IC9eIHs0fX4vO1xuY29uc3QgUFJFRklYID0gXCJuYWJcIjtcbmNvbnN0IFNPVUxfREVMSU1FVEVSID0gXCJ8fn58XCI7XG5cbmNvbnN0IExJU1RJTkdfU0laRSA9IDEwMDA7XG5cbmNvbnN0IE1BWF9IQVNIX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9QT1dfTk9OQ0VfU0laRSA9IDY0O1xuY29uc3QgTUFYX1RPUElDX1NJWkUgPSA0MjtcbmNvbnN0IE1BWF9BVVRIT1JfQUxJQVNfU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9BVVRIT1JfSURfU0laRSA9IDEyODsgLy8gPz8/XG5jb25zdCBNQVhfVVJMX1NJWkUgPSAyMDQ4O1xuY29uc3QgTUFYX0RPTUFJTl9TSVpFID0gMjU2O1xuY29uc3QgTUFYX1RISU5HX0tJTkRfU0laRSA9IDE2O1xuY29uc3QgTUFYX1RISU5HX1RJVExFX1NJWkUgPSAzMDA7XG5jb25zdCBNQVhfVEhJTkdfQk9EWV9TSVpFID0gNTAwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX0lEU19TSVpFID0gNTAwMDA7XG5jb25zdCBNQVhfTElTVElOR19TT1VSQ0VfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfVEFCU19TSVpFID0gNTAwMDtcblxuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9QUkVGSVhfU0laRSA9IE1BWF9UT1BJQ19TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9JREVOVElGSUVSX1NJWkUgPSBNQVhfQVVUSE9SX0lEX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSA9IDE2O1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfS0lORF9TSVpFID0gMTY7XG5cbmNvbnN0IERFRkFVTFRfSU5ERVhFUiA9IFwiQ0V5S3JEZDF4eVBYcFdTVjAwTWd2blpZMlZKTEhYZ3pDdmhNZUR3S1RZQS55alNxMER5WHp6aEJfWlhyX0R6ZkpnaWozdFhVMC0zdDBRNWJKQXRacGo4XCI7XG5jb25zdCBERVZfSU5ERVhFUiA9IFwibDJuU2VkbFNsdm9tVHFDWWhtUG5BTm9RTFhlNHNqNXJSMk9yQzdZcVBwVS56aW1hV3dkbGZ5VHJWSVRnd1dvRFZkYkpRS1JlT1RxVjV6TmpUUmMteVFBXCI7XG5cbmV4cG9ydCBjb25zdCBDb25zdGFudHMgPSB7XG4gIENPTU1BTkRfUkUsXG4gIFBSRUZJWCxcbiAgU09VTF9ERUxJTUVURVIsXG4gIExJU1RJTkdfU0laRSxcbiAgTUFYX0hBU0hfU0laRSxcbiAgTUFYX1BPV19OT05DRV9TSVpFLFxuICBNQVhfVE9QSUNfU0laRSxcbiAgTUFYX0FVVEhPUl9BTElBU19TSVpFLFxuICBNQVhfQVVUSE9SX0lEX1NJWkUsXG4gIE1BWF9VUkxfU0laRSxcbiAgTUFYX0RPTUFJTl9TSVpFLFxuICBNQVhfVEhJTkdfS0lORF9TSVpFLFxuICBNQVhfVEhJTkdfVElUTEVfU0laRSxcbiAgTUFYX1RISU5HX0JPRFlfU0laRSxcbiAgTUFYX0xJU1RJTkdfSURTX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFLFxuICBNQVhfTElTVElOR19UQUJTX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1NPUlRfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfS0lORF9TSVpFLFxuICBERUZBVUxUX0lOREVYRVIsXG4gIERFVl9JTkRFWEVSXG59O1xuIiwiLyogZ2xvYmFscyBHdW4gKi9cbmltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHNvdWwgPSBSLnBhdGhPcihcIlwiLCBbXCJfXCIsIFwiI1wiXSk7XG5jb25zdCBzdGF0ZSA9IFIucGF0aE9yKHt9LCBbXCJfXCIsIFwiPlwiXSk7XG5cbmNvbnN0IGxhdGVzdCA9IFIuY29tcG9zZShcbiAgUi5sYXN0LFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi52YWx1ZXMsXG4gIHN0YXRlXG4pO1xuXG5jb25zdCBlZGdlcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFwiI1wiKSksXG4gIFIudmFsdWVzXG4pO1xuXG5mdW5jdGlvbiBkZWNvZGVTRUEocmF3RGF0YSkge1xuICBjb25zdCBkYXRhID0gcmF3RGF0YSA/IHsgLi4ucmF3RGF0YSB9IDogcmF3RGF0YTtcbiAgY29uc3Qgc291bCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKCFzb3VsIHx8ICFHdW4uU0VBIHx8IHNvdWwuaW5kZXhPZihcIn5cIikgPT09IC0xKSByZXR1cm4gcmF3RGF0YTtcbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIEd1bi5TRUEudmVyaWZ5KFxuICAgICAgR3VuLlNFQS5vcHQucGFjayhyYXdEYXRhW2tleV0sIGtleSwgcmF3RGF0YSwgc291bCksXG4gICAgICBmYWxzZSxcbiAgICAgIHJlcyA9PiAoZGF0YVtrZXldID0gR3VuLlNFQS5vcHQudW5wYWNrKHJlcywga2V5LCByYXdEYXRhKSlcbiAgICApO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgR3VuTm9kZSA9IHsgc291bCwgc3RhdGUsIGxhdGVzdCwgZWRnZXMsIGRlY29kZVNFQSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UsIHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IG5lZWRzU2NvcmVzID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwic29ydCBob3RcIixcbiAgICBcInNvcnQgdG9wXCIsXG4gICAgXCJzb3J0IGJlc3RcIixcbiAgICBcInNvcnQgY29udHJvdmVyc2lhbFwiLFxuICAgIFwidXBzXCIsXG4gICAgXCJkb3duc1wiLFxuICAgIFwic2NvcmVcIixcbiAgICBcImNhbiByZW1vdmVcIlxuICBdKTtcblxuY29uc3QgbmVlZHNEYXRhID0gZGVmaW5pdGlvbiA9PlxuICAhIVIuZmluZChkZWZpbml0aW9uLmlzUHJlc2VudCwgW1xuICAgIFwidG9waWNcIixcbiAgICBcImRvbWFpblwiLFxuICAgIFwiYXV0aG9yXCIsXG4gICAgXCJ1bmlxdWUgYnkgY29udGVudFwiLFxuICAgIFwia2luZFwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwicmVxdWlyZSBzaWduZWRcIixcbiAgICBcInJlcXVpcmUgYW5vblwiLFxuICAgIFwiYWxpYXNcIixcbiAgICBcImJhbiBkb21haW5cIixcbiAgICBcImJhbiB0b3BpY1wiLFxuICAgIFwiYmFuIGF1dGhvclwiLFxuICAgIFwiYmFuIGFsaWFzXCJcbiAgXSk7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSA9PlxuICBQcm9taXNlLmFsbChcbiAgICBSLm1hcChzb3VsID0+IExpc3RpbmdTb3J0Lml0ZW1Gcm9tU291bChzY29wZSwgc291bCwgZGVmaW5pdGlvbiksIHNvdWxzKVxuICApLnRoZW4oTGlzdGluZ1NvcnQuc29ydEl0ZW1zKVxuKTtcblxuY29uc3QgaXRlbXNGcm9tVGhpbmdTZXRzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgLnRoZW4oUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSkpXG4gICAgLnRoZW4oVGhpbmdTZXQuc291bHMpXG4gICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKVxuKTtcblxuY29uc3QgbGlzdGluZ1NvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBsaXN0aW5ncyA9IFIucGF0aE9yKFtdLCBbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJsaXN0aW5nc1wiXSwgZGVmaW5pdGlvbik7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAobCA9PiBgJHtsfS8ke3NvcnR9YCwgbGlzdGluZ3MpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocyB9O1xufTtcblxuY29uc3QgdG9waWNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCB0b3BpY3MgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwidG9waWNzXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAodCA9PiBgL3QvJHt0fS8ke3NvcnR9YCwgdG9waWNzKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpVG9waWMoc2NvcGUsIHsgdG9waWNzLCBzb3J0IH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgZG9tYWluU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZG9tYWlucyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJkb21haW5zXCJdLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWRvbWFpbnMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGQgPT4gYC9kb21haW4vJHtkfS8ke3NvcnR9YCwgZG9tYWlucyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aURvbWFpbihzY29wZSwgeyBkb21haW5zLCBzb3J0IH0pLnRoZW4oc291bHMgPT5cbiAgICAgIGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKVxuICAgICk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3QgYXV0aG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgYXV0aG9ySWRzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcImF1dGhvcnNcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB0eXBlID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInR5cGVcIl0sIGRlZmluaXRpb24pO1xuXG4gIGlmICghYXV0aG9ySWRzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vJHt0eXBlfS8ke3NvcnR9YCwgYXV0aG9ySWRzKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5Lm11bHRpQXV0aG9yKHNjb3BlLCB7IHR5cGUsIGF1dGhvcklkcyB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGN1cmF0b3JTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBjdXJhdG9ycyA9IFIucHJvcChcImN1cmF0b3JzXCIsIGRlZmluaXRpb24pIHx8IFtdO1xuXG4gIGlmICghY3VyYXRvcnMubGVuZ3RoKSByZXR1cm4gdG9waWNTb3VyY2UoZGVmaW5pdGlvbik7XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGlkID0+IGAvdXNlci8ke2lkfS9jb21tZW50ZWQvJHtzb3J0fWAsIGN1cmF0b3JzKTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5LmN1cmF0ZShzY29wZSwgY3VyYXRvcnMsIHRydWUpXG4gICAgICAudGhlbihpZHMgPT4gaWRzLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkpXG4gICAgICAudGhlbihzb3VscyA9PiBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikpO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IG9wU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3Qgc3VibWlzc2lvbklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJvcHNcIl0sIGRlZmluaXRpb24pO1xuXG4gIGlmICghc3VibWlzc2lvbklkcy5sZW5ndGgpIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChcbiAgICBpZCA9PiBgL3RoaW5ncy8ke2lkfS9jb21tZW50cy8ke3NvcnR9YCxcbiAgICBzdWJtaXNzaW9uSWRzXG4gICk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVN1Ym1pc3Npb24oc2NvcGUsIHsgc3VibWlzc2lvbklkcyB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IHJlcGxpZXNTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBzb3J0IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBpZCA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJyZXBsaWVzVG9cIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB0eXBlID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInR5cGVcIl0sIGRlZmluaXRpb24pO1xuXG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFtgL3VzZXIvJHtpZH0vcmVwbGllcy8ke3R5cGV9LyR7c29ydH1gXTtcbiAgY29uc3QgcXVlcnkgPSBzY29wZSA9PlxuICAgIFF1ZXJ5LnJlcGxpZXNUb0F1dGhvcihzY29wZSwge1xuICAgICAgdHlwZSxcbiAgICAgIHJlcGxpZXNUb0F1dGhvcklkOiBpZCxcbiAgICAgIGluZGV4ZXI6IGRlZmluaXRpb24uaW5kZXhlclxuICAgIH0pLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBzb3VyY2VzID0ge1xuICBsaXN0aW5nOiBsaXN0aW5nU291cmNlLFxuICByZXBsaWVzOiByZXBsaWVzU291cmNlLFxuICBvcDogb3BTb3VyY2UsXG4gIGN1cmF0b3I6IGN1cmF0b3JTb3VyY2UsXG4gIGF1dGhvcjogYXV0aG9yU291cmNlLFxuICBkb21haW46IGRvbWFpblNvdXJjZSxcbiAgdG9waWM6IHRvcGljU291cmNlXG59O1xuXG5jb25zdCBzb3VyY2VOYW1lcyA9IFIua2V5cyhzb3VyY2VzKTtcbmNvbnN0IHNvdXJjZU5hbWUgPSBkZWYgPT4gUi5maW5kKGRlZi5pc1ByZXNlbnQsIHNvdXJjZU5hbWVzKSB8fCBcInRvcGljXCI7XG5jb25zdCBmcm9tRGVmaW5pdGlvbiA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCBuYW1lID0gc291cmNlTmFtZShkZWZpbml0aW9uKTtcblxuICByZXR1cm4gUi5tZXJnZUxlZnQoeyBuYW1lIH0sIHNvdXJjZXNbbmFtZV0oZGVmaW5pdGlvbikpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdEYXRhU291cmNlID0ge1xuICBmcm9tRGVmaW5pdGlvbixcbiAgc291cmNlcyxcbiAgbmVlZHNTY29yZXMsXG4gIG5lZWRzRGF0YSxcbiAgaXRlbXNGcm9tVGhpbmdTZXRzLFxuICBpdGVtc0Zyb21UaGluZ1NvdWxzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gXCIuLi9Ub2tlbml6ZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgZnJvbVNvdXJjZSA9IChzb3VyY2UsIG93bmVySWQgPSBudWxsLCBzcGFjZU5hbWUgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuICBjb25zdCBvYmogPSB7IC4uLnRva2VuaXplZCB9O1xuICBjb25zdCB7IGlzUHJlc2VudCwgZ2V0VmFsdWUsIGdldFZhbHVlcywgZ2V0VmFsdWVDaGFpbiwgZ2V0UGFpcnMgfSA9IHRva2VuaXplZDtcblxuICBbXG4gICAgb2JqLmZyb21QYWdlQXV0aG9yID0gb3duZXJJZCxcbiAgICBvYmouZnJvbVBhZ2VOYW1lID0gc3BhY2VOYW1lID8gYHNwYWNlOiR7c3BhY2VOYW1lfWAgOiB1bmRlZmluZWRcbiAgXSA9IGdldFZhbHVlQ2hhaW4oXCJzb3VyY2VkIGZyb20gcGFnZVwiKTtcbiAgb2JqLmRpc3BsYXlOYW1lID0gdG9rZW5pemVkLmdldFZhbHVlKFwibmFtZVwiKSB8fCBzcGFjZU5hbWU7XG4gIG9iai5pbmRleGVyID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgQ29uZmlnLmluZGV4ZXI7XG4gIG9iai50YWJ1bGF0b3IgPSBnZXRWYWx1ZShcInRhYnVsYXRvclwiKSB8fCBvYmouaW5kZXhlcjtcbiAgb2JqLnRhYnMgPSBnZXRQYWlycyhcInRhYlwiKTtcbiAgb2JqLnNvcnQgPSBnZXRWYWx1ZShcInNvcnRcIik7XG4gIG9iai51bmlxdWVCeUNvbnRlbnQgPSAhIWlzUHJlc2VudChcInVuaXF1ZSBieSBjb250ZW50XCIpO1xuICBvYmouY3VyYXRvcnMgPSBnZXRWYWx1ZXMoXCJjdXJhdG9yXCIpO1xuICBvYmoubW9kZXJhdG9ycyA9IGdldFZhbHVlcyhcIm1vZFwiKTtcbiAgb2JqLmluY2x1ZGVSYW5rcyA9ICEhaXNQcmVzZW50KFwic2hvdyByYW5rc1wiKTtcbiAgb2JqLnN0aWNreUlkcyA9IGdldFZhbHVlcyhcInN0aWNreVwiKTtcbiAgb2JqLmlzSWRTdGlja3kgPSBpZCA9PiAhIXRva2VuaXplZC5pc1ByZXNlbnQoW1wic3RpY2t5XCIsIGlkXSk7XG4gIG9iai5zdWJtaXRUb3BpY3MgPSBnZXRWYWx1ZXMoXCJzdWJtaXQgdG9cIik7XG4gIG9iai5zdWJtaXRUb3BpYyA9IGdldFZhbHVlKFwic3VibWl0IHRvXCIpO1xuICBvYmouY2hhdFRvcGljID0gZ2V0VmFsdWUoXCJjaGF0IGluXCIpO1xuXG4gIGlmIChvd25lcklkICYmIHNwYWNlTmFtZSkge1xuICAgIG9iai5zcGFjZU5hbWUgPSBzcGFjZU5hbWU7XG4gICAgb2JqLm93bmVyID0gb3duZXJJZDtcbiAgICBvYmoudXNlRm9yQ29tbWVudHMgPSAhdG9rZW5pemVkLmlzUHJlc2VudChcImNvbW1lbnRzIGxlYXZlIHNwYWNlXCIpO1xuICAgIG9iai5wYXRoID0gYC91c2VyLyR7b3duZXJJZH0vc3BhY2VzLyR7c3BhY2VOYW1lfWA7XG4gICAgb2JqLmRlZmF1bHRUYWIgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJcIik7XG4gICAgb2JqLmRlZmF1bHRUYWJQYXRoID0gb2JqLmRlZmF1bHRUYWJcbiAgICAgID8gdG9rZW5pemVkLmdldFZhbHVlKFtcInRhYlwiLCBvYmouZGVmYXVsdFRhYl0pXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBvYmouZmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIGFsbG93OiB7XG4gICAgICByZXBsaWVzVG86IGdldFZhbHVlKFwicmVwbGllcyB0byBhdXRob3JcIiksXG4gICAgICB0eXBlOiBnZXRWYWx1ZShcInR5cGVcIiksIC8vIFRPRE86IHRoaXMgZmllbGQgc2VlbXMgcmVkdW5kYW50IHdpdGgga2luZCBhbmQgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbiAgICAgIG9wczogZ2V0VmFsdWVzKFwib3BcIiksXG4gICAgICBhbGlhc2VzOiBnZXRWYWx1ZXMoXCJhbGlhc1wiKSxcbiAgICAgIGF1dGhvcnM6IGdldFZhbHVlcyhcImF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImRvbWFpblwiKSxcbiAgICAgIHRvcGljczogZ2V0VmFsdWVzKFwidG9waWNcIiksXG4gICAgICBsaXN0aW5nczogZ2V0VmFsdWVzKFwibGlzdGluZ1wiKSxcbiAgICAgIGtpbmRzOiBnZXRWYWx1ZXMoXCJraW5kXCIpLFxuICAgICAgYW5vbjogIWlzUHJlc2VudChcInJlcXVpcmUgc2lnbmVkXCIpLFxuICAgICAgc2lnbmVkOiAhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpXG4gICAgfSxcbiAgICBkZW55OiB7XG4gICAgICBhbGlhc2VzOiBnZXRWYWx1ZXMoXCJiYW4gYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJiYW4gYXV0aG9yXCIpLFxuICAgICAgZG9tYWluczogZ2V0VmFsdWVzKFwiYmFuIGRvbWFpblwiKSxcbiAgICAgIHRvcGljczogZ2V0VmFsdWVzKFwiYmFuIHRvcGljXCIpLFxuICAgICAgYW5vbjogISFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogISFpc1ByZXNlbnQoXCJyZXF1aXJlIGFub25cIiksXG4gICAgICB0YWdzOiBnZXRQYWlycyhcImNhbiByZW1vdmVcIilcbiAgICB9XG4gIH07XG5cbiAgb2JqLnZvdGVGaWx0ZXJzID0ge1xuICAgIGZ1bmN0aW9uczogW10sXG4gICAgdXBzTWluOiBwYXJzZUludChnZXRWYWx1ZShcInVwcyBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgdXBzTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInVwcyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgZG93bnNNaW46IHBhcnNlSW50KGdldFZhbHVlKFwiZG93bnMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWF4OiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGJlbG93XCIpLCAxMCkgfHwgbnVsbCxcbiAgICBzY29yZU1pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJzY29yZSBhYm92ZVwiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNYXg6IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYmVsb3dcIiksIDEwKSB8fCBudWxsXG4gIH07XG5cbiAgb2JqLmNlbnNvcnMgPSBSLnVuaXEoUi5tYXAoUi5wcm9wKDEpLCBvYmouZmlsdGVycy5kZW55LnRhZ3MpKTtcbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRGVmaW5pdGlvbiA9IHsgZnJvbVNvdXJjZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5cbmNvbnN0IGludFBhdGggPSBwID0+XG4gIFIuY29tcG9zZShcbiAgICBwYXJzZUludCxcbiAgICBSLnBhdGgocClcbiAgKTtcblxuY29uc3QgZnJvbURlZmluaXRpb24gPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgeyBmaWx0ZXJzLCB2b3RlRmlsdGVycywgaXNQcmVzZW50IH0gPSBkZWZpbml0aW9uO1xuICBjb25zdCBmaWx0ZXJGdW5jdGlvbnMgPSBbXTtcbiAgY29uc3Qgdm90ZUZpbHRlckZ1bmN0aW9ucyA9IFtdO1xuXG4gIGNvbnN0IGFkZEZpbHRlciA9ICguLi5mbnMpID0+IGZpbHRlckZ1bmN0aW9ucy5wdXNoKFIuY29tcG9zZSguLi5mbnMpKTtcbiAgY29uc3QgYWRkVm90ZUZpbHRlciA9ICguLi5mbnMpID0+IHZvdGVGaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG5cbiAgaWYgKGZpbHRlcnMuYWxsb3cuYWxpYXNlcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYWxpYXNcIiwgdF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvclwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5hdXRob3JzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJhdXRob3JcIiwgdF0pLCBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LmRvbWFpbnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImRvbWFpblwiLCB0XSksIFRoaW5nRGF0YU5vZGUuZG9tYWluKTtcblxuICBpZiAoXG4gICAgZmlsdGVycy5hbGxvdy50b3BpY3MubGVuZ3RoICYmXG4gICAgIVIuZmluZChcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgUi5pZGVudGljYWwoXCJhbGxcIiksXG4gICAgICAgIFIubGFzdCxcbiAgICAgICAgUi5zcGxpdChcIjpcIilcbiAgICAgICksXG4gICAgICBmaWx0ZXJzLmFsbG93LnRvcGljc1xuICAgIClcbiAgKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcInRvcGljXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSkpO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmtpbmRzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoa2luZCA9PiAhIWlzUHJlc2VudChbXCJraW5kXCIsIGtpbmRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJraW5kXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmFsbG93LnR5cGUgPT09IFwiY29tbWFuZHNcIilcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSksXG4gICAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYm9keVwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkuYWxpYXNlcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYWxpYXMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhbGlhc1wiLCBhbGlhc10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hdXRob3JzLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBhdXRob3JJZCA9PiAhaXNQcmVzZW50KFtcImJhblwiLCBcImF1dGhvclwiLCBhdXRob3JJZF0pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmRvbWFpbnMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGRvbWFpbiA9PiAhZG9tYWluIHx8ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiZG9tYWluXCIsIGRvbWFpbl0pLFxuICAgICAgVGhpbmdEYXRhTm9kZS5kb21haW5cbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LnRvcGljcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgdG9waWMgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJ0b3BpY1wiLCB0b3BpY10pLFxuICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJ0b3BpY1wiXSlcbiAgICApO1xuICBpZiAoZmlsdGVycy5kZW55LmFub24pIGFkZEZpbHRlcihSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKSk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuc2lnbmVkKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIFIuY29tcG9zZShcbiAgICAgICAgYXV0aG9ySWQgPT4gIWF1dGhvcklkLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImF1dGhvcklkXCJdKVxuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLnVwc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMudXBzTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMudXBzTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcInVwXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01pbiAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIubHRlKHZvdGVGaWx0ZXJzLmRvd25zTWluKSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLmRvd25zTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuZG93bnNNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwiZG93blwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5zY29yZU1pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuc2NvcmVNYXggIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmd0ZSh2b3RlRmlsdGVycy5zY29yZU1heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJzY29yZVwiXSkpO1xuXG4gIGlmIChmaWx0ZXJzLmRlbnkudGFncy5sZW5ndGgpXG4gICAgYWRkVm90ZUZpbHRlcih0aGluZyA9PiB7XG4gICAgICBjb25zdCBjbWRzID0gUi5wYXRoKFtcInZvdGVzXCIsIFwiY29tbWFuZHNcIl0sIHRoaW5nKSB8fCB7fTtcblxuICAgICAgcmV0dXJuICFmaWx0ZXJzLmRlbnkudGFncy5maW5kKFxuICAgICAgICAoW3RhZ05hbWUsIGF1dGhvcklkXSkgPT4gISFSLnBhdGgoW2F1dGhvcklkLCBcInRhZ1wiLCB0YWdOYW1lXSwgY21kcylcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgY29uc3QgY29udGVudEZpbHRlciA9IHRoaW5nID0+ICFmaWx0ZXJGdW5jdGlvbnMuZmluZChmbiA9PiAhZm4odGhpbmcpKTtcbiAgY29uc3Qgdm90ZUZpbHRlciA9IHRoaW5nID0+ICF2b3RlRmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHRoaW5nRmlsdGVyID0gdGhpbmcgPT4gKGNvbnRlbnRGaWx0ZXIodGhpbmcpICYmIHZvdGVGaWx0ZXIodGhpbmcpKTtcblxuICByZXR1cm4geyB0aGluZ0ZpbHRlciwgY29udGVudEZpbHRlciwgdm90ZUZpbHRlciB9O1xufTtcblxuY29uc3QgZ2V0RmlsdGVyZWRJZHMgPSBhc3luYyAoXG4gIHNjb3BlLFxuICBzb3J0ZWRSb3dzLFxuICB7IGxpbWl0ID0gMjUsIGNvdW50ID0gMCwgYWZ0ZXIgPSBudWxsLCBmaWx0ZXJGbiB9ID0ge31cbikgPT4ge1xuICBjb25zdCByb3dzID0gc29ydGVkUm93cy5zbGljZSgpO1xuICBjb25zdCBmaWx0ZXJlZCA9IFtdO1xuICBjb25zdCBmZXRjaEJhdGNoID0gKHNpemUgPSAzMCkgPT5cbiAgICBQcm9taXNlLmFsbChcbiAgICAgIFIubWFwKGFzeW5jIHJvdyA9PiB7XG4gICAgICAgIGxldCBpbkxpc3RpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmIChmaWx0ZXJGbikgaW5MaXN0aW5nID0gYXdhaXQgZmlsdGVyRm4ocm93W0xpc3RpbmdOb2RlLlBPU19JRF0pO1xuICAgICAgICBpZiAoaW5MaXN0aW5nKSBmaWx0ZXJlZC5wdXNoKHJvdyk7XG4gICAgICB9LCByb3dzLnNwbGljZShjb3VudCwgc2l6ZSkpXG4gICAgKTtcblxuICB3aGlsZSAocm93cy5sZW5ndGgpIHtcbiAgICBhd2FpdCBmZXRjaEJhdGNoKCk7XG4gICAgaWYgKGxpbWl0ICYmIGZpbHRlcmVkLmxlbmd0aCA+PSBsaW1pdCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gUi5jb21wb3NlKFxuICAgIFIubWFwKFIucHJvcChMaXN0aW5nTm9kZS5QT1NfSUQpKSxcbiAgICBsaW1pdCA/IFIuc2xpY2UoMCwgbGltaXQpIDogUi5pZGVudGl0eSxcbiAgICBSLnNvcnRCeShSLnByb3AoTGlzdGluZ05vZGUuUE9TX1ZBTCkpXG4gICkoZmlsdGVyZWQpO1xufTtcblxuY29uc3QgdGhpbmdGaWx0ZXIgPSBSLmN1cnJ5KChzY29wZSwgc3BlYywgdGhpbmdJZCkgPT5cbiAgUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICB0aGluZ1NvdWw6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSxcbiAgICBzY29yZXM6IExpc3RpbmdEYXRhU291cmNlLm5lZWRzU2NvcmVzKHNwZWMpLFxuICAgIGRhdGE6IExpc3RpbmdEYXRhU291cmNlLm5lZWRzRGF0YShzcGVjKVxuICB9KS50aGVuKHNwZWMudGhpbmdGaWx0ZXIpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0ZpbHRlciA9IHsgZnJvbURlZmluaXRpb24sIGdldEZpbHRlcmVkSWRzLCB0aGluZ0ZpbHRlciB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuXG5jb25zdCBbUE9TX0lEWCwgUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxLCAyLCAzXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuY29uc3Qgcm93c1RvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgcm93c1RvSXRlbXMgPSBSLm1hcChSLnNsaWNlKDEsIDMpKTtcbmNvbnN0IHNvdXJjZSA9IFIucHJvcE9yKFwiXCIsIFwic291cmNlXCIpO1xuY29uc3Qgc291bEZyb21QYXRoID0gUi5jdXJyeShcbiAgKGluZGV4ZXIsIHBhdGgpID0+IGAke0NvbnN0YW50cy5QUkVGSVh9JHtwYXRofUB+JHtpbmRleGVyfS5gXG4pO1xuXG5jb25zdCBnZXRSb3cgPSBSLmN1cnJ5KChub2RlLCBpZHgpID0+XG4gIFIuY29tcG9zZShcbiAgICBSLmlmRWxzZShSLnByb3AoXCJsZW5ndGhcIiksIFIuaW5zZXJ0KDAsIHBhcnNlSW50KGlkeCwgMTApKSwgUi5hbHdheXMobnVsbCkpLFxuICAgIHJvdyA9PiB7XG4gICAgICByb3dbMV0gPSBwYXJzZUZsb2F0KHJvd1sxXSk7XG4gICAgICByZXR1cm4gcm93O1xuICAgIH0sXG4gICAgUi5tYXAoUi50cmltKSxcbiAgICBSLnNwbGl0KFwiLFwiKSxcbiAgICBSLnByb3BPcihcIlwiLCBgJHtpZHh9YClcbiAgKShub2RlKVxuKTtcblxuY29uc3QgaXRlbUtleXMgPSBSLmNvbXBvc2UoXG4gIFIuZmlsdGVyKFxuICAgIFIuY29tcG9zZShcbiAgICAgIHZhbCA9PiAhISh2YWwgPT09IDAgfHwgdmFsKSxcbiAgICAgIHBhcnNlSW50XG4gICAgKVxuICApLFxuICBSLmtleXNcbik7XG5cbmNvbnN0IHJvd3MgPSBub2RlID0+XG4gIFIuY29tcG9zZShcbiAgICBSLm1hcChnZXRSb3cobm9kZSkpLFxuICAgIGl0ZW1LZXlzXG4gICkobm9kZSk7XG5cbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgcm93c1RvSWRzLFxuICByb3dzXG4pO1xuXG5jb25zdCBzb3J0Um93cyA9IFIuc29ydFdpdGgoW1xuICBSLmFzY2VuZChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLmNvbmQoW1tSLmlzTmlsLCBSLmFsd2F5cyhJbmZpbml0eSldLCBbUi5ULCBwYXJzZUZsb2F0XV0pLFxuICAgICAgUi5wcm9wKFBPU19WQUwpXG4gICAgKVxuICApXG5dKTtcblxuY29uc3Qgc29ydGVkSWRzID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnByb3AoUE9TX0lEKSksXG4gIHNvcnRSb3dzLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgcm93c1xuKTtcblxuY29uc3QgZGlmZiA9IGFzeW5jIChcbiAgbm9kZSxcbiAgdXBkYXRlZEl0ZW1zID0gW10sXG4gIHJlbW92ZUlkcyA9IFtdLFxuICB7IG1heFNpemUgPSAxMDAwIH0gPSB7fVxuKSA9PiB7XG4gIGNvbnN0IHJlbW92ZWQgPSBSLmluZGV4QnkoUi5pZGVudGl0eSwgcmVtb3ZlSWRzKTtcbiAgY29uc3QgYnlJZCA9IHt9O1xuICBjb25zdCBjaGFuZ2VzID0ge307XG4gIGNvbnN0IHJvd3MgPSBbXTtcbiAgY29uc3QgdXBkYXRlZCA9IHt9O1xuICBsZXQgdG9SZXBsYWNlID0gW107XG4gIGxldCBtYXhJZHggPSAwO1xuICBsZXQga2V5O1xuXG4gIGZvciAoa2V5IGluIG5vZGUgfHwge30pIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChrZXksIDEwKTtcblxuICAgIGlmICghKHBhcnNlZCB8fCBwYXJzZWQgPT09IDApKSBjb250aW51ZTtcbiAgICBjb25zdCByb3cgPSBnZXRSb3cobm9kZSwga2V5KSB8fCBbcGFyc2VkLCBudWxsLCBudWxsXTtcbiAgICBjb25zdCBbaWR4LCBpZCA9IG51bGwsIHJhd1ZhbHVlID0gbnVsbF0gPSByb3c7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIHJvd1tQT1NfVkFMXSA9IHJhd1ZhbHVlID09PSBudWxsID8gbnVsbCA6IHBhcnNlRmxvYXQocmF3VmFsdWUpO1xuICAgIGlmIChpZCAmJiByZW1vdmVkW2lkXSkgcm93W1BPU19JRF0gPSByb3dbUE9TX1ZBTF0gPSBudWxsO1xuICAgIGlmIChpZCkgYnlJZFtpZF0gPSByb3c7XG4gICAgaWYgKHJvd1tQT1NfSURdKSB7XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9SZXBsYWNlLnB1c2gocm93KTtcbiAgICB9XG4gICAgaWYgKGlkeCA+IG1heElkeCkgbWF4SWR4ID0gaWR4O1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBbaWQsIHZhbHVlXSA9IHVwZGF0ZWRJdGVtc1tpXSB8fCBbbnVsbCwgbnVsbF07XG5cbiAgICBpZiAoIWlkKSBjb250aW51ZTtcbiAgICBjb25zdCBleGlzdGluZyA9IGJ5SWRbaWRdO1xuXG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICBpZiAoZXhpc3RpbmdbUE9TX1ZBTF0gIT09IHZhbHVlKSB7XG4gICAgICAgIGV4aXN0aW5nW1BPU19WQUxdID0gdmFsdWU7XG4gICAgICAgIHVwZGF0ZWRbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgcm93ID0gW251bGwsIGlkLCB2YWx1ZV07XG5cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFsbFNvcnRlZCA9IHNvcnRSb3dzKHJvd3MpO1xuICBjb25zdCBzb3J0ZWQgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKDAsIG1heFNpemUpIDogYWxsU29ydGVkO1xuICBjb25zdCBtaXNzaW5nID0gbWF4U2l6ZSA/IGFsbFNvcnRlZC5zbGljZShtYXhTaXplLCBhbGxTb3J0ZWQubGVuZ3RoKSA6IFtdO1xuICBjb25zdCBhZGRlZCA9IFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gPT09IG51bGwsIHNvcnRlZCk7XG5cbiAgdG9SZXBsYWNlID0gdG9SZXBsYWNlXG4gICAgLmNvbmNhdChSLmZpbHRlcihyb3cgPT4gcm93W1BPU19JRFhdICE9PSBudWxsLCBtaXNzaW5nKSlcbiAgICAucmV2ZXJzZSgpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaWQgPSBzb3J0ZWRbaV1bUE9TX0lEXTtcbiAgICBjb25zdCBpZHggPSBzb3J0ZWRbaV1bUE9TX0lEWF07XG4gICAgY29uc3QgdmFsID0gc29ydGVkW2ldW1BPU19WQUxdO1xuXG4gICAgaWYgKGlkeCAhPT0gbnVsbCAmJiB1cGRhdGVkW2lkXSkgY2hhbmdlc1tgJHtpZHh9YF0gPSBbaWQsIHZhbF0uam9pbihcIixcIik7XG4gIH1cblxuICBjb25zdCBpbnNlcnRlZCA9IFtdO1xuXG4gIHdoaWxlIChhZGRlZC5sZW5ndGgpIHtcbiAgICBjb25zdCByb3cgPSBhZGRlZC5wb3AoKTtcbiAgICBjb25zdCByZXBsYWNlZCA9IHRvUmVwbGFjZS5wb3AoKTtcbiAgICBsZXQgW2lkeF0gPSByZXBsYWNlZCB8fCBbbnVsbF07XG5cbiAgICBpZiAoaWR4ID09PSBudWxsKSB7XG4gICAgICBpZHggPSBwYXJzZUludChtYXhJZHgsIDEwKSArIGluc2VydGVkLmxlbmd0aCArIDE7XG4gICAgICBpbnNlcnRlZC5wdXNoKGlkeCk7XG4gICAgfVxuXG4gICAgY2hhbmdlc1tgJHtpZHh9YF0gPSBbcm93W1BPU19JRF0sIHJvd1tQT1NfVkFMXV0uam9pbihcIixcIik7XG4gIH1cblxuICB3aGlsZSAodG9SZXBsYWNlLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IHRvUmVwbGFjZS5wb3AoKTtcblxuICAgIGlmIChyb3cgJiYgIXJvd1tQT1NfSURdKSB7XG4gICAgICBjb25zdCBpZHggPSBgJHtyb3dbUE9TX0lEWF19YDtcblxuICAgICAgaWYgKG5vZGVbaWR4XSAhPT0gbnVsbCkge1xuICAgICAgICBjaGFuZ2VzW2lkeF0gPSBudWxsO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm51bGxpbmdcIiwgaWR4LCBub2RlW2lkeF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBSLmtleXMoY2hhbmdlcykubGVuZ3RoID8gY2hhbmdlcyA6IG51bGw7XG59O1xuXG5jb25zdCBjYXRlZ29yaXplRGlmZiA9IChkaWZmLCBvcmlnaW5hbCkgPT4ge1xuICBjb25zdCBhbGxLZXlzID0gaXRlbUtleXMoUi5tZXJnZUxlZnQoZGlmZiwgb3JpZ2luYWwpKTtcbiAgY29uc3QgYWRkZWQgPSBbXTtcbiAgY29uc3QgcmVtb3ZlZCA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGFsbEtleXNbaV07XG4gICAgY29uc3QgW19kaWZmSWR4LCBkaWZmSWRdID0gZ2V0Um93KGRpZmYsIGtleSkgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBjb25zdCBbX29yaWdJZHgsIG9yaWdJZF0gPSBnZXRSb3cob3JpZ2luYWwsIGtleSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIGlmIChkaWZmSWQgIT09IG9yaWdJZCkge1xuICAgICAgaWYgKGRpZmZJZCkgYWRkZWQucHVzaChkaWZmSWQpO1xuICAgICAgaWYgKG9yaWdJZCkgcmVtb3ZlZC5wdXNoKG9yaWdJZCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFthZGRlZCwgcmVtb3ZlZF07XG59O1xuXG5jb25zdCB1bmlvblJvd3MgPSBSLmNvbXBvc2UoXG4gIFIudW5pcUJ5KFIucHJvcChQT1NfSUQpKSxcbiAgc29ydFJvd3MsXG4gIFIucmVkdWNlKFIuY29uY2F0LCBbXSksXG4gIFIubWFwKHJvd3MpXG4pO1xuXG5jb25zdCByb3dzRnJvbVNvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscykgPT5cbiAgUHJvbWlzZS5hbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpLnRoZW4odW5pb25Sb3dzKVxuKTtcblxuY29uc3QgcmVhZCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT4ge1xuICBjb25zdCB7IGluZGV4ZXIgPSBDb25maWcuaW5kZXhlciB9ID0gb3B0cyB8fCB7fTtcblxuICBjb25zb2xlLmxvZyhcIkxpc3RpbmdOb2RlLnJlYWRcIiwgcGF0aCk7XG5cbiAgcmV0dXJuIHJvd3NGcm9tU291bHMoc2NvcGUsIFtzb3VsRnJvbVBhdGgoaW5kZXhlciwgcGF0aCldKS50aGVuKHJvd3NUb0lkcyk7XG59LCBcImxpc3RpbmdSb3dzXCIpO1xuXG5jb25zdCBnZXQgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3VsKSA9PiAoc291bCA/IHNjb3BlLmdldChzb3VsKSA6IHJlc29sdmUobnVsbCkpLFxuICBcImxpc3RpbmdcIlxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdOb2RlID0ge1xuICBQT1NfSURYLFxuICBQT1NfSUQsXG4gIFBPU19WQUwsXG4gIHNvdXJjZSxcbiAgZ2V0LFxuICBnZXRSb3csXG4gIGl0ZW1LZXlzLFxuICByb3dzLFxuICBpZHMsXG4gIHJvd3NUb0lkcyxcbiAgcm93c1RvSXRlbXMsXG4gIHNvcnRSb3dzLFxuICBzb3J0ZWRJZHMsXG4gIHNvdWxGcm9tUGF0aCxcbiAgcm93c0Zyb21Tb3VscyxcbiAgcmVhZCxcbiAgZGlmZixcbiAgY2F0ZWdvcml6ZURpZmYsXG4gIHVuaW9uUm93c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IHVwZGF0ZUxpc3RpbmcgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHNjb3BlLFxuICBzcGVjLFxuICBpZHMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW11cbikgPT4ge1xuICBpZiAoIWlkcy5sZW5ndGggJiYgIXJlbW92ZUlkcy5sZW5ndGgpIHJldHVybjtcbiAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IGF3YWl0IExpc3RpbmdTb3J0LnRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYyk7XG4gIGNvbnN0IGNoYW5nZXMgPSBMaXN0aW5nTm9kZS5kaWZmKGV4aXN0aW5nLCB1cGRhdGVkSXRlbXMsIHJlbW92ZUlkcyk7XG5cbiAgaWYgKGNoYW5nZXMpIGNvbnNvbGUubG9nKFwiQ0hBTkdFU1wiLCByb3V0ZS5zb3VsLCBjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXMpIHJvdXRlLndyaXRlKGNoYW5nZXMpO1xufTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyBzb3J0LCB1cGRhdGVkU291bCwgZGlmZiB9KSA9PiB7XG4gIGxldCB1cGRhdGVkSWRzID0gW107XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCkgfHwge307XG4gIGNvbnN0IGlzU3RpY2t5ID0gUi5lcXVhbHMocm91dGUubWF0Y2gudGhpbmdJZCB8fCBudWxsKTtcblxuICBpZiAodGhpbmdJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICB1cGRhdGVkSWRzID0gUi5jb25jYXQodXBkYXRlZElkcywgVGhpbmdTZXQuaWRzKEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpKSk7XG4gIGF3YWl0IHVwZGF0ZUxpc3Rpbmcob3JjLCByb3V0ZSwgc2NvcGUsIHNvcnQsIHVwZGF0ZWRJZHMsIFtdLCBpc1N0aWNreSk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nT3JhY2xlID0ge1xuICB1cGRhdGVMaXN0aW5nLFxuICBvblB1dFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5pbXBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5cbmNvbnN0IGZyb21TcGVjID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+IHtcbiAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcbiAgY29uc3QgcGF0aHMgPSBSLnBhdGhPcihbXSwgW1wiZGF0YVNvdXJjZVwiLCBcImxpc3RpbmdQYXRoc1wiXSwgc3BlYyk7XG4gIGNvbnN0IHNvdWxzID0gUi5tYXAoXG4gICAgTGlzdGluZ05vZGUuc291bEZyb21QYXRoKG9wdHMuaW5kZXhlciB8fCBzcGVjLmluZGV4ZXIpLFxuICAgIHBhdGhzXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdOb2RlLnJvd3NGcm9tU291bHMoc2NvcGUsIHNvdWxzKS50aGVuKHJvd3MgPT5cbiAgICBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCByb3dzLCB7IC4uLm9wdHMsIGZpbHRlckZuIH0pXG4gICk7XG59KTtcblxuY29uc3QgZnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgdHlwZSA9IExpc3RpbmdUeXBlLmZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oc3BlYyA9PiB7XG4gICAgaWYgKHNwZWMuaGFzSW5kZXhlciAmJiAhb3B0cy5jYWxjdWxhdGUpIHtcbiAgICAgIGlmICghdHlwZSB8fCAhdHlwZS5yZWFkKSByZXR1cm4gTGlzdGluZ05vZGUucmVhZChzY29wZSwgcGF0aCwgb3B0cyk7XG4gICAgICByZXR1cm4gdHlwZS5yZWFkKHNjb3BlLCB0eXBlLm1hdGNoLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyb21TcGVjKHNjb3BlLCBzcGVjLCBvcHRzKTtcbiAgfSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdRdWVyeSA9IHsgZnJvbVNwZWMsIGZyb21QYXRoIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuXG5jb25zdCBbUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxXTtcbmNvbnN0IHRvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgc29ydEl0ZW1zID0gUi5zb3J0V2l0aChSLnByb3AoUE9TX1ZBTCkpO1xuXG5jb25zdCB2b3RlU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT4ge1xuICBpZiAoc3BlYy5pc0lkU3RpY2t5KHRoaW5nSWQpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuICBpZiAoUi5jb250YWlucyh0aGluZ0lkLCBzcGVjLmZpbHRlcnMuYWxsb3cub3BzKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcblxuICByZXR1cm4gUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICBzY29yZXM6IHRydWUsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihyZXMgPT4gZm4ocmVzLCBzcGVjKSk7XG59KTtcblxuY29uc3QgdGltZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihmbilcbik7XG5cbmNvbnN0IHNvcnRzID0ge1xuICBuZXc6IHRpbWVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubXVsdGlwbHkoLTEpLFxuICAgICAgdmFsID0+IHZhbCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIFIucHJvcChcInRpbWVzdGFtcFwiKVxuICAgIClcbiAgKSxcbiAgb2xkOiB0aW1lU29ydChSLnByb3AoXCJ0aW1lc3RhbXBcIikpLFxuICBhY3RpdmU6IHZvdGVTb3J0KFxuICAgICh7IHRpbWVzdGFtcCwgbGFzdEFjdGl2ZSB9KSA9PiAtMSAqIChsYXN0QWN0aXZlIHx8IHRpbWVzdGFtcClcbiAgKSxcbiAgdG9wOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VJbnQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSlcbiAgICApXG4gICksXG4gIGNvbW1lbnRzOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VGbG9hdCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0pXG4gICAgKVxuICApLFxuICBkaXNjdXNzZWQ6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuXG4gICAgaWYgKCFzY29yZSkgcmV0dXJuIDEwMDAwMDAwMDAgLSBzZWNvbmRzO1xuICAgIHJldHVybiAtMSAqIChvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBob3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcbiAgICBsZXQgc2lnbiA9IDA7XG5cbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICBzaWduID0gMTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlIDwgMCkge1xuICAgICAgc2lnbiA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gLTEgKiAoc2lnbiAqIG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGJlc3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgbiA9IHVwcyArIGRvd25zO1xuXG4gICAgaWYgKG4gPT09IDApIHJldHVybiAwO1xuICAgIGNvbnN0IHogPSAxLjI4MTU1MTU2NTU0NTsgLy8gODAlIGNvbmZpZGVuY2VcbiAgICBjb25zdCBwID0gdXBzIC8gbjtcbiAgICBjb25zdCBsZWZ0ID0gcCArICgxIC8gKDIgKiBuKSkgKiB6ICogejtcbiAgICBjb25zdCByaWdodCA9IHogKiBNYXRoLnNxcnQoKHAgKiAoMSAtIHApKSAvIG4gKyAoeiAqIHopIC8gKDQgKiBuICogbikpO1xuICAgIGNvbnN0IHVuZGVyID0gMSArICgxIC8gbikgKiB6ICogejtcblxuICAgIHJldHVybiAtMSAqICgobGVmdCAtIHJpZ2h0KSAvIHVuZGVyKTtcbiAgfSksXG4gIGNvbnRyb3ZlcnNpYWw6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG5cbiAgICBpZiAodXBzIDw9IDAgfHwgZG93bnMgPD0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbWFnbml0dWRlID0gdXBzICsgZG93bnM7XG4gICAgY29uc3QgYmFsYW5jZSA9IHVwcyA+IGRvd25zID8gZG93bnMgLyB1cHMgOiB1cHMgLyBkb3ducztcblxuICAgIHJldHVybiAtMSAqIG1hZ25pdHVkZSAqKiBiYWxhbmNlO1xuICB9KVxufTtcblxuY29uc3QgdG9JdGVtID0gcXVlcnkoXG4gIChzY29wZSwgaWQsIHNwZWMpID0+XG4gICAgKHNvcnRzW3NwZWMuc29ydF0gfHwgc29ydHMubmV3KShpZCwgc3BlYykudGhlbih2YWwgPT4gW2lkLCB2YWxdKVxuKTtcblxuY29uc3QgdG9JdGVtcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkcywgc3BlYykgPT4gYWxsKFIubWFwKFxuICAgIGlkID0+IHRvSXRlbShzY29wZSwgaWQsIHNwZWMpLFxuICAgIGlkc1xuICApKVxuKTtcblxuY29uc3QgZnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWxzLCBzcGVjKSA9PlxuICAgIGFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSlcbiAgICAgIC50aGVuKFIucGlwZShcbiAgICAgICAgVGhpbmdTZXQudW5pb24sXG4gICAgICAgIFRoaW5nU2V0LmlkcyxcbiAgICAgICAgaWRzID0+IHRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYylcbiAgICAgICkpXG4gICAgICAudGhlbihzb3J0SXRlbXMpXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1NvcnQgPSB7XG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc29ydHMsXG4gIHRvSXRlbSxcbiAgdG9JdGVtcyxcbiAgdG9JZHMsXG4gIHNvcnRJdGVtcyxcbiAgZnJvbVRoaW5nU2V0c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGVmaW5pdGlvbiB9IGZyb20gXCIuL0xpc3RpbmdEZWZpbml0aW9uXCI7XG5pbXBvcnQgeyBMaXN0aW5nRGF0YVNvdXJjZSB9IGZyb20gXCIuL0xpc3RpbmdEYXRhU291cmNlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4vTGlzdGluZ0ZpbHRlclwiO1xuXG5jb25zdCBmcm9tU291cmNlID0gUi5jb21wb3NlKFxuICBSLmFwcGx5KFIubWVyZ2VMZWZ0KSxcbiAgUi5hcChbTGlzdGluZ0ZpbHRlci5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBSLmFwcGx5KFIuYXNzb2MoXCJkYXRhU291cmNlXCIpKSxcbiAgUi5hcChbTGlzdGluZ0RhdGFTb3VyY2UuZnJvbURlZmluaXRpb24sIFIuaWRlbnRpdHldKSxcbiAgUi5vZixcbiAgTGlzdGluZ0RlZmluaXRpb24uZnJvbVNvdXJjZVxuKTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEgPSBcIlwiKSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgYXV0aG9ySWQsIG5hbWUpXG4gICAgLnRoZW4oUi5jb21wb3NlKFxuICAgICAgYm9keSA9PiBgJHtib2R5fVxuIyBhZGRlZCBieSBpbmRleGVyXG4ke2V4dHJhIHx8IFwiXCJ9XG5zb3VyY2VkIGZyb20gcGFnZSAke2F1dGhvcklkfSAke25hbWV9XG5gLFxuICAgICAgVGhpbmdEYXRhTm9kZS5ib2R5XG4gICAgKSlcbik7XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nU3BlYyA9IHsgZnJvbVNvdXJjZSwgZ2V0U291cmNlIH07XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydFwiO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCB7IHRoaW5nSWQsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjb21tZW50c1wiLFxuICAgIFtgb3AgJHt0aGluZ0lkfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50TGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgZ2V0U3BlYyB9KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL2RvbWFpbi86ZG9tYWluLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiwgc29ydCB9KSA9PiB7XG4gIGNvbnN0IGRvbWFpbnMgPSBQYXRoLnNwbGl0VG9waWNzKGRvbWFpbik7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6ZG9tYWluXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHtkb21haW5zWzBdfWAsXG4gICAgICBcInN1Ym1pdCB0byB3aGF0ZXZlclwiLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICBcImtpbmQgc3VibWlzc2lvblwiLFxuICAgICAgLi4uUi5tYXAoZG9tYWluID0+IGBkb21haW4gJHtkb21haW59YCwgZG9tYWlucyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL2RvbWFpbi8ke2RvbWFpbn0vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IERvbWFpbkxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIHRhYnMsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuLi8uLi9UaGluZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvcmVwbGllZC86dHlwZS86c29ydFwiO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgPSBcIm5ld1wiIH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6aW5ib3hcIixcbiAgICBbYHJlcGxpZXMgdG8gYXV0aG9yICR7YXV0aG9ySWR9YCwgYHR5cGUgJHt0eXBlfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiB9XG4pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRBdXRob3JlZF0gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihkaWZmRGF0YSk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGxldCB1cGRhdGVkSWRzID0gVGhpbmdTZXQuaWRzKGRpZmZEYXRhKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRBdXRob3JlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wSWQgPSB1cGRhdGVkQXV0aG9yZWRbaV07XG4gICAgY29uc3QgcmVwbHlJZHMgPSBUaGluZ1NldC5pZHMoXG4gICAgICBhd2FpdCBzY29wZS5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkpLnRoZW4oKVxuICAgICk7XG5cbiAgICB1cGRhdGVkSWRzID0gdXBkYXRlZElkcy5jb25jYXQocmVwbHlJZHMpO1xuICB9XG5cbiAgaWYgKHVwZGF0ZWRJZHMubGVuZ3RoKVxuICAgIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10pO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTb3VyY2UsIGdldFNwZWMsIG9uUHV0IH0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gXCIuLi9QYXRoXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvOnR5cGUvOnNvcnRcIjtcbmNvbnN0IHRhYnMgPSBbXCJvdmVydmlld1wiLCBcImNvbW1lbnRzXCIsIFwic3VibWl0dGVkXCIsIFwiY29tbWFuZHNcIl07XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgdHlwZSwgc29ydCB9KSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnByb2ZpbGVcIixcbiAgICBbXG4gICAgICBgYXV0aG9yICR7YXV0aG9ySWR9YCxcbiAgICAgIGB0eXBlICR7dHlwZX1gLFxuICAgICAgXCJzdWJtaXQgdG8gd2hhdGV2ZXJcIixcbiAgICAgIGBzb3J0ICR7c29ydH1gLFxuICAgICAgLi4uUi5tYXAodGFiID0+IGB0YWIgJHt0YWJ9IC91c2VyLyR7YXV0aG9ySWR9LyR7dGFifWAsIHRhYnMpXG4gICAgXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgUHJvZmlsZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIHRhYnMsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBhbGwsIHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uLy4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi8uLi9HdW5Ob2RlXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4uL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nRmlsdGVyIH0gZnJvbSBcIi4uL0xpc3RpbmdGaWx0ZXJcIjtcbmltcG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi4vTGlzdGluZ09yYWNsZVwiO1xuaW1wb3J0IHsgU3BhY2VTcGVjIH0gZnJvbSBcIi4uL1NwYWNlU3BlY1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdXNlci86YXV0aG9ySWQvc3BhY2VzLzpuYW1lLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9KSA9PlxuICBTcGFjZVNwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgYHNvcnQgJHtzb3J0fWApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFNwYWNlU3BlYy5nZXRTcGVjKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgYHNvcnQgJHtzb3J0fWApXG4pO1xuXG5jb25zdCBjYWxjdWxhdGUgPSBxdWVyeSgoc2NvcGUsIG1hdGNoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSA9IG1hdGNoO1xuICBjb25zdCByb3V0ZVByb3BzID0geyBhdXRob3JJZCwgbmFtZSwgc29ydCwgaW5kZXhlcjogQ29uZmlnLmluZGV4ZXIgfTtcbiAgY29uc3Qgc291bHMgPSBbU2NoZW1hLlNwYWNlTGlzdGluZy5yb3V0ZS5yZXZlcnNlKHJvdXRlUHJvcHMpXTtcblxuICByZXR1cm4gYWxsKFtcbiAgICBnZXRTcGVjKHNjb3BlLCBtYXRjaCksXG4gICAgTGlzdGluZ05vZGUuZ2V0Um93c0Zyb21Tb3VscyhzY29wZSwgc291bHMpXG4gIF0pLnRoZW4oKFtzcGVjLCByb3dzXSkgPT4ge1xuICAgIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG5cbiAgICByZXR1cm4gTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZElkcyhzY29wZSwgcm93cywgeyAuLi5vcHRzLCBmaWx0ZXJGbiB9KTtcbiAgfSk7XG59KTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHsgdXBkYXRlZFNvdWwsIGRpZmYsIG9yaWdpbmFsLCBsYXRlc3QgPSAwIH1cbikgPT4ge1xuICBjb25zdCBzY29wZSA9IG9yYy5uZXdTY29wZSgpO1xuXG4gIGNvbnN0IG9yaWdpbmFsRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKG9yaWdpbmFsKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRJZHMsIHJlbW92ZWRJZHNdID0gTGlzdGluZ05vZGUuY2F0ZWdvcml6ZURpZmYoXG4gICAgZGlmZkRhdGEsXG4gICAgb3JpZ2luYWxEYXRhXG4gICk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGNvbnN0IHZvdGVDb3VudHNNYXRjaCA9IFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB0aGluZ01hdGNoID0gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgYXV0aG9yTWF0Y2ggPSBTY2hlbWEuU0VBQXV0aG9yLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKTtcblxuICBpZiAodm90ZUNvdW50c01hdGNoKSB1cGRhdGVkSWRzLnB1c2godm90ZUNvdW50c01hdGNoLnRoaW5nSWQpO1xuICBpZiAodGhpbmdNYXRjaCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ0lkICYmIHRoaW5nSWQgIT09IHNwZWMuZnJvbVBhZ2VJZCkgdXBkYXRlZElkcy5wdXNoKHRoaW5nSWQpO1xuICBhd2FpdCBMaXN0aW5nT3JhY2xlLnVwZGF0ZUxpc3RpbmcoXG4gICAgb3JjLFxuICAgIHJvdXRlLFxuICAgIHNjb3BlLFxuICAgIHNwZWMsXG4gICAgdXBkYXRlZElkcyxcbiAgICByZW1vdmVkSWRzLFxuICApO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG4gIGlmIChcbiAgICBSLnByb3AoXCJzaXplXCIsIG9yaWdpbmFsKSB8fFxuICAgIHVwZGF0ZWRJZHMubGVuZ3RoIHx8XG4gICAgcmVtb3ZlZElkcy5sZW5ndGggfHxcbiAgICBhdXRob3JNYXRjaFxuICApXG4gICAgcmV0dXJuO1xuXG4gIC8vIGJhc2UgbG9naWMgZnJvbSBndW4tY2xlcmljLXNjb3BlIG5lZWRzIHRvIGJlIGVuY2Fwc3VhbHRlZCBiZXR0ZXI/XG4gIGNvbnNvbGUubG9nKFwiLS0tU1RBTkRBUkQgU1BBQ0UgVVBEQVRFLS0tXCIsIHJvdXRlLnNvdWwsIHVwZGF0ZWRTb3VsKTtcbiAgY29uc3Qgbm9kZSA9IGF3YWl0IG9yYy5uZXdTY29wZSgpLmdldChyb3V0ZS5zb3VsKTtcbiAgY29uc3QgZXhpc3RpbmdLZXlzID0gTGlzdGluZ05vZGUuaXRlbUtleXMobm9kZSk7XG5cbiAgaWYgKGV4aXN0aW5nS2V5cy5sZW5ndGgpIHtcbiAgICByb3V0ZS53cml0ZSh7XG4gICAgICBzaXplOiAwLFxuICAgICAgLi4uZXhpc3RpbmdLZXlzLnJlZHVjZSgoZGlmZiwga2V5KSA9PiB7XG4gICAgICAgIGRpZmZbYCR7a2V5fWBdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGRpZmY7XG4gICAgICB9LCB7fSlcbiAgICB9KTtcbiAgfVxuXG4gIG9yYy53b3JrKHtcbiAgICBpZDogYHVwZGF0ZToke3JvdXRlLnNvdWx9YCxcbiAgICBzb3VsOiByb3V0ZS5zb3VsLFxuICAgIG1ldGhvZDogXCJkb1VwZGF0ZVwiLFxuICAgIHByaW9yaXR5OiByb3V0ZS5wcmlvcml0eSB8fCA1MFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBTcGFjZUxpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7XG4gIHBhdGgsXG4gIGNhbGN1bGF0ZSxcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjLFxuICBvblB1dFxufSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIiwgXCJmaXJlaG9zZVwiXTtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IHRvcGljLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgdG9waWNzID0gUGF0aC5zcGxpdFRvcGljcyh0b3BpYyk7XG4gIGNvbnN0IHN1Ym1pdFRvID0gdG9waWNzWzBdID09PSBcImFsbFwiID8gXCJ3aGF0ZXZlclwiIDogdG9waWNzWzBdO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOnRvcGljXCIsXG4gICAgW1xuICAgICAgYG5hbWUgJHt0b3BpY31gLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIHRvcGljLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IFwia2luZCBzdWJtaXNzaW9uXCIgOiBcIlwiLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgVG9waWNMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgVG9waWNMaXN0aW5nIH0gZnJvbSBcIi4vVG9waWNMaXN0aW5nXCI7XG5pbXBvcnQgeyBEb21haW5MaXN0aW5nIH0gZnJvbSBcIi4vRG9tYWluTGlzdGluZ1wiO1xuaW1wb3J0IHsgQ29tbWVudExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50TGlzdGluZ1wiO1xuaW1wb3J0IHsgU3BhY2VMaXN0aW5nIH0gZnJvbSBcIi4vU3BhY2VMaXN0aW5nXCI7XG5pbXBvcnQgeyBJbmJveExpc3RpbmcgfSBmcm9tIFwiLi9JbmJveExpc3RpbmdcIjtcbmltcG9ydCB7IFByb2ZpbGVMaXN0aW5nIH0gZnJvbSBcIi4vUHJvZmlsZUxpc3RpbmdcIjtcblxuY29uc3QgdHlwZXMgPSBbXG4gIFRvcGljTGlzdGluZyxcbiAgRG9tYWluTGlzdGluZyxcbiAgQ29tbWVudExpc3RpbmcsXG4gIFNwYWNlTGlzdGluZyxcbiAgSW5ib3hMaXN0aW5nLFxuICBQcm9maWxlTGlzdGluZ1xuXTtcblxuY29uc3QgZnJvbVBhdGggPSBwYXRoID0+IHtcbiAgbGV0IG1hdGNoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICBtYXRjaCA9IHR5cGVzW2ldLnJvdXRlLm1hdGNoKHBhdGgpO1xuICAgIGlmIChtYXRjaCkgcmV0dXJuIFIuYXNzb2MoXCJtYXRjaFwiLCBtYXRjaCwgdHlwZXNbaV0pO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdUeXBlID0geyAuLi50eXBlcywgdHlwZXMsIGZyb21QYXRoIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IFJvdXRlIGZyb20gXCJyb3V0ZS1wYXJzZXJcIjtcblxuY29uc3Qgc3BsaXREb21haW5zID0gUi5jb21wb3NlKFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFIudHJpbSksXG4gIFIuc3BsaXQoXCIrXCIpLFxuICBSLnRvTG93ZXIsXG4gIFIudHJpbSxcbiAgUi5kZWZhdWx0VG8oXCJcIilcbik7XG5cbmNvbnN0IHNwbGl0VG9waWNzID0gUi5jb21wb3NlKFxuICBSLmlmRWxzZShSLnByb3AoXCJsZW5ndGhcIiksIFIuaWRlbnRpdHksIFIuYWx3YXlzKFtcImFsbFwiXSkpLFxuICBzcGxpdERvbWFpbnNcbik7XG5cbmNvbnN0IHdpdGhSb3V0ZSA9IG9iaiA9PiBSLmFzc29jKFwicm91dGVcIiwgbmV3IFJvdXRlKG9iai5wYXRoKSwgb2JqKTtcblxuZXhwb3J0IGNvbnN0IFBhdGggPSB7IHNwbGl0RG9tYWlucywgc3BsaXRUb3BpY3MsIHdpdGhSb3V0ZSB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgVG9rZW5pemVyIH0gZnJvbSBcIi4uL1Rva2VuaXplclwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIl07XG5jb25zdCBzcGFjZUNvbmZpZ1BhZ2VOYW1lID0gbmFtZSA9PiBgc3BhY2U6JHtuYW1lfWA7XG5cbmNvbnN0IHNvdXJjZVdpdGhEZWZhdWx0cyA9IFIuY3VycnkoKG93bmVySWQsIG5hbWUsIHNvdXJjZSkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW3NvdXJjZSB8fCBcIlwiXTtcbiAgY29uc3QgdG9rZW5pemVkID0gVG9rZW5pemVyLnRva2VuaXplKHNvdXJjZSk7XG5cbiAgaWYgKCF0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJcIikpIHtcbiAgICB0YWJzLm1hcCh0YWIgPT5cbiAgICAgIHJlc3VsdC5wdXNoKGB0YWIgJHt0YWJ9IC91c2VyLyR7b3duZXJJZH0vc3BhY2VzLyR7bmFtZX0vJHt0YWJ9YClcbiAgICApO1xuICB9XG5cbiAgbGV0IGluZGV4ZXIgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJpbmRleGVyXCIpO1xuXG4gIGlmICghaW5kZXhlcikge1xuICAgIHJlc3VsdC5wdXNoKGBpbmRleGVyICR7Q29uZmlnLmluZGV4ZXJ9YCk7XG4gICAgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyO1xuICB9XG5cbiAgbGV0IHRhYnVsYXRvciA9IHRva2VuaXplZC5nZXRWYWx1ZShcInRhYnVsYXRvclwiKTtcblxuICBpZiAoIXRhYnVsYXRvcikgcmVzdWx0LnB1c2goYHRhYnVsYXRvciAke2luZGV4ZXJ9YCk7XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKFwiXFxuXCIpO1xufSk7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBMaXN0aW5nU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBzcGFjZUNvbmZpZ1BhZ2VOYW1lKG5hbWUpLCBleHRyYSkudGhlbihcbiAgICBzb3VyY2VXaXRoRGVmYXVsdHMoYXV0aG9ySWQsIG5hbWUpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSwgZXh0cmEpLnRoZW4oc291cmNlID0+XG4gICAgTGlzdGluZ1NwZWMuZnJvbVNvdXJjZShzb3VyY2UsIGF1dGhvcklkLCBuYW1lKVxuICApXG4pO1xuXG5jb25zdCBub2RlVG9TcGFjZU5hbWVzID0gUi5jb21wb3NlKFxuICBSLnNvcnRCeShSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi5yZXBsYWNlKC9ec3BhY2U6LywgXCJcIikpLFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLnByb3AoXCJsZW5ndGhcIiksXG4gICAgICBSLm1hdGNoKC9ec3BhY2U6W146XSokLylcbiAgICApXG4gICksXG4gIFIua2V5c1xuKTtcblxuY29uc3QgdXNlclNwYWNlTmFtZXMgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkKSA9PlxuICBRdWVyeS51c2VyUGFnZXMoc2NvcGUsIGF1dGhvcklkKS50aGVuKG5vZGVUb1NwYWNlTmFtZXMpKTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlU3BlYyA9IHsgbm9kZVRvU3BhY2VOYW1lcywgdXNlclNwYWNlTmFtZXMsIHRhYnMsIGdldFNvdXJjZSwgZ2V0U3BlYyB9O1xuIiwiaW1wb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5cbmV4cG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmV4cG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmV4cG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5leHBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5leHBvcnQgeyBMaXN0aW5nT3JhY2xlIH0gZnJvbSBcIi4vTGlzdGluZ09yYWNsZVwiO1xuZXhwb3J0IHsgTGlzdGluZ1F1ZXJ5IH0gZnJvbSBcIi4vTGlzdGluZ1F1ZXJ5XCI7XG5leHBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5leHBvcnQgeyBMaXN0aW5nU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdTcGVjXCI7XG5leHBvcnQgeyBMaXN0aW5nVHlwZSB9IGZyb20gXCIuL0xpc3RpbmdUeXBlXCI7XG5leHBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi9TcGFjZVNwZWNcIjtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmcgPSB7XG4gIExpc3RpbmdOb2RlLFxuICBMaXN0aW5nU3BlYyxcbiAgZ2V0OiBMaXN0aW5nTm9kZS5nZXQsXG4gIGZyb21TcGVjOiBMaXN0aW5nUXVlcnkuZnJvbVNwZWMsXG4gIGZyb21QYXRoOiBMaXN0aW5nUXVlcnkuZnJvbVBhdGhcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgVmFsaWRhdGlvbiB9IGZyb20gXCIuL1ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nIH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSBcIi4vQXV0aGVudGljYXRpb25cIjtcblxuZnVuY3Rpb24gaW5pdChHdW4sIGNvbmZpZyA9IHt9KSB7XG4gIGNvbnN0IHsgbGVlY2gsIGRpc2FibGVWYWxpZGF0aW9uLCBub0d1biwgbG9jYWxTdG9yYWdlLCBwZXJzaXN0LCAuLi5yZXN0IH0gPVxuICAgIGNvbmZpZyB8fCB7fTtcbiAgY29uc3QgcGVlciA9IHsgY29uZmlnIH07XG5cbiAgaWYgKCFub0d1bikge1xuICAgIGNvbnN0IGNmZyA9IHsgbG9jYWxTdG9yYWdlOiAhIWxvY2FsU3RvcmFnZSwgcmFkaXNrOiAhIXBlcnNpc3QsIC4uLnJlc3QgfTtcblxuICAgIGlmIChwZXJzaXN0KSBjZmcubG9jYWxTdG9yYWdlID0gZmFsc2U7XG4gICAgaWYgKCFkaXNhYmxlVmFsaWRhdGlvbikgR3VuLm9uKFwib3B0XCIsIFZhbGlkYXRpb24uZ3VuV2lyZUlucHV0KHBlZXIpKTtcbiAgICBpZiAoY2ZnLnN0b3JlRm4pIGNmZy5zdG9yZSA9IGNmZy5zdG9yZUZuKGNmZyk7IC8vIGZvciBpbmRleGVkZGJcbiAgICBwZWVyLmd1biA9IEd1bihjZmcpO1xuICAgIGlmIChjZmcubG9jYWxTdG9yYWdlKSBwZWVyLmd1bi5vbihcImxvY2FsU3RvcmFnZTplcnJvclwiLCBhID0+IGEucmV0cnkoe30pKTtcbiAgICBpZiAobGVlY2gpIHtcbiAgICAgIGNvbnN0IHNlbmRMZWVjaCA9ICgpID0+IHBlZXIuZ3VuLl8ub24oXCJvdXRcIiwgeyBsZWVjaDogdHJ1ZSB9KTtcblxuICAgICAgc2VuZExlZWNoKCk7XG4gICAgfVxuICB9XG5cbiAgcGVlci5uZXdTY29wZSA9IG9wdHMgPT4gUXVlcnkuY3JlYXRlU2NvcGUocGVlciwgb3B0cyk7XG4gIHBlZXIub25Mb2dpbiA9IEF1dGhlbnRpY2F0aW9uLm9uTG9naW4ocGVlcik7XG4gIHBlZXIuc2lnbnVwID0gQXV0aGVudGljYXRpb24uc2lnbnVwKHBlZXIpO1xuICBwZWVyLmxvZ2luID0gQXV0aGVudGljYXRpb24ubG9naW4ocGVlcik7XG4gIHBlZXIubG9nb3V0ID0gKCkgPT4gQXV0aGVudGljYXRpb24ubG9nb3V0KHBlZXIpO1xuICBwZWVyLmlzTG9nZ2VkSW4gPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluKHBlZXIpO1xuICBwZWVyLnN1Ym1pdCA9IFRoaW5nLnN1Ym1pdChwZWVyKTtcbiAgcGVlci5jb21tZW50ID0gVGhpbmcuY29tbWVudChwZWVyKTtcbiAgcGVlci5jaGF0ID0gVGhpbmcuY2hhdChwZWVyKTtcbiAgcGVlci53cml0ZVBhZ2UgPSBUaGluZy53cml0ZVBhZ2UocGVlcik7XG4gIHBlZXIudm90ZSA9IFRoaW5nLnZvdGUocGVlcik7XG4gIHBlZXIucXVlcmllcyA9IFF1ZXJ5O1xuICByZXR1cm4gcGVlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFBlZXIgPSB7XG4gIGluaXRcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgc2NvcGUgYXMgbWFrZVNjb3BlLCBxdWVyeSwgYWxsLCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZy9MaXN0aW5nTm9kZVwiO1xuXG5jb25zdCBlbXB0eVByb21pc2UgPSByZXNvbHZlKG51bGwpO1xuY29uc3QgdW5pb25BcnJheXMgPSBSLnJlZHVjZShSLnVuaW9uLCBbXSk7XG5cbmNvbnN0IHRvcGljU291bHMgPSBwYXJhbXMgPT4ge1xuICBjb25zdCB7IHRvcGljcyA9IFtcImFsbFwiXSB9ID0gcGFyYW1zIHx8IHt9O1xuICBjb25zdCBkYXlzID0gUi5wcm9wT3IoMzY1LCBcImRheXNcIiwgcGFyYW1zKSB8fCAzNjU7XG4gIGNvbnN0IGRheVN0cmluZ3MgPSBbXTtcbiAgY29uc3Qgb25lRGF5ID0gMTAwMCAqIDYwICogNjAgKiAyNDtcbiAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG9uZURheSAqIHBhcnNlSW50KGRheXMsIDEwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBkYXlzICsgMTsgaSsrKVxuICAgIGRheVN0cmluZ3MucHVzaChUaGluZ1NldC5kYXlTdHIoc3RhcnQgKyBpICogb25lRGF5KSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhcbiAgICB0b3BpY3MucmVkdWNlKFxuICAgICAgKHJlc3VsdCwgdG9waWNOYW1lKSA9PlxuICAgICAgICBkYXlTdHJpbmdzLnJlZHVjZSgocmVzLCBkcykgPT4ge1xuICAgICAgICAgIHJlc1tgJHtDb25zdGFudHMuUFJFRklYfS90b3BpY3MvJHt0b3BpY05hbWV9L2RheXMvJHtkc31gXSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSwgcmVzdWx0KSxcbiAgICAgIHt9XG4gICAgKVxuICApO1xufTtcblxuY29uc3Qgc2luZ2xlVG9waWMgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT4ge1xuICBjb25zdCB0U291bHMgPSB0b3BpY1NvdWxzKHsgLi4ucGFyYW1zLCB0b3BpY3M6IFtwYXJhbXMudG9waWNdIH0pO1xuICBsZXQgc291bHMgPSBbXTtcbiAgbGV0IGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuXG4gIGlmIChwYXJhbXMuc29ydCA9PT0gXCJuZXdcIikge1xuICAgIGl0ZW1NYXggPSBDb25zdGFudHMuTElTVElOR19TSVpFO1xuICB9IGVsc2Uge1xuICAgIGlmIChwYXJhbXMuc29ydCA9PT0gXCJ0b3BcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICAgIGlmIChwYXJhbXMudG9waWMgPT09IFwiYWxsXCIpIGl0ZW1NYXggPSBpdGVtTWF4ICogMztcbiAgfVxuXG4gIGNvbnN0IGZldGNoTW9yZSA9ICgpID0+IHtcbiAgICBjb25zdCB0b3BpY1NvdWwgPSB0U291bHMucG9wKCk7XG5cbiAgICBpZiAoc291bHMubGVuZ3RoID4gaXRlbU1heCB8fCAhdG9waWNTb3VsKSByZXR1cm4gcmVzb2x2ZShzb3Vscyk7XG4gICAgcmV0dXJuIHNjb3BlXG4gICAgICAuZ2V0KHRvcGljU291bClcbiAgICAgIC5zb3VscygpXG4gICAgICAudGhlbihtb3JlID0+IHtcbiAgICAgICAgc291bHMgPSBbLi4uc291bHMsIC4uLm1vcmVdO1xuICAgICAgICByZXR1cm4gZmV0Y2hNb3JlKCk7XG4gICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZmV0Y2hNb3JlKCk7XG59KTtcblxuY29uc3Qgc2luZ2xlRG9tYWluID0gcXVlcnkoKHNjb3BlLCB7IGRvbWFpbiB9KSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZTogZG9tYWluIH0pKS5zb3VscygpXG4pO1xuXG5jb25zdCBzaW5nbGVBdXRob3IgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFtcbiAgICBwYXJhbXMudHlwZSAmJiBwYXJhbXMudHlwZSAhPT0gXCJzdWJtaXR0ZWRcIiAmJiBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiXG4gICAgICA/IHJlc29sdmUoW10pXG4gICAgICA6IHNjb3BlXG4gICAgICAgICAgLmdldChwYXJhbXMuYXV0aG9ySWQpXG4gICAgICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAgICAgLnNvdWxzKCksXG4gICAgcGFyYW1zLnR5cGUgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJjb21tZW50c1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwib3ZlcnZpZXdcIiAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1hbmRzXCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KHBhcmFtcy5hdXRob3JJZClcbiAgICAgICAgICAuZ2V0KFwiY29tbWVudHNcIilcbiAgICAgICAgICAuc291bHMoKVxuICBdKS50aGVuKChbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkgPT4gdW5pb25BcnJheXMoW3N1Ym1pc3Npb25zLCBjb21tZW50c10pKVxuKTtcblxuY29uc3QgbGlzdGluZ0lkcyA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IHNjb3BlLmdldChzb3VsKS50aGVuKExpc3RpbmdOb2RlLnNvcnRlZElkcyksXG4gIFwibGlzdGluZ0lkc1wiXG4pO1xuXG5jb25zdCBzaW5nbGVMaXN0aW5nID0gcXVlcnkoKHNjb3BlLCB7IGxpc3RpbmcsIHNvcnQsIGluZGV4ZXIgfSkgPT5cbiAgbGlzdGluZ0lkcyhzY29wZSwgYCR7Q29uc3RhbnRzLlBSRUZJWH0ke2xpc3Rpbmd9LyR7c29ydH1AfiR7aW5kZXhlcn0uYCkudGhlbihcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLm1hcCh0aGluZ0lkID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSksXG4gICAgICBSLmZpbHRlcihSLmlkZW50aXR5KVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVwbGllc1RvQXV0aG9yID0gcXVlcnkoXG4gIChzY29wZSwgeyByZXBsaWVzVG9BdXRob3JJZCwgdHlwZSA9IFwib3ZlcnZpZXdcIiwgLi4ucGFyYW1zIH0pID0+XG4gICAgc2luZ2xlTGlzdGluZyhzY29wZSwge1xuICAgICAgbGlzdGluZzogYC91c2VyLyR7cmVwbGllc1RvQXV0aG9ySWR9LyR7dHlwZX1gLFxuICAgICAgc29ydDogXCJuZXdcIixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH0pLnRoZW4oYXV0aG9yZWRTb3VscyA9PlxuICAgICAgYWxsKFxuICAgICAgICBhdXRob3JlZFNvdWxzLm1hcChhdXRob3JlZFNvdWwgPT5cbiAgICAgICAgICBzY29wZS5nZXQoYCR7YXV0aG9yZWRTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgICAgICAgKVxuICAgICAgKS50aGVuKHVuaW9uQXJyYXlzKVxuICAgIClcbik7XG5cbmNvbnN0IHNpbmdsZVN1Ym1pc3Npb24gPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgc2NvcGVcbiAgICAuZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IHBhcmFtcy5zdWJtaXNzaW9uSWQgfSlcbiAgICApXG4gICAgLnNvdWxzKFxuICAgICAgUi5wcmVwZW5kKFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KSlcbiAgICApXG4pO1xuXG5jb25zdCB0aGluZyA9IHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICBzY29wZS5nZXQodGhpbmdTb3VsKS50aGVuKG1ldGEgPT4ge1xuICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgcmVzdWx0ID0geyBpZDogbWV0YS5pZCwgdGltZXN0YW1wOiBwYXJzZUZsb2F0KG1ldGEudGltZXN0YW1wLCAxMCkgfTtcbiAgICBjb25zdCByZXBseVRvU291bCA9IFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BTb3VsID0gUi5wYXRoKFtcIm9wXCIsIFwiI1wiXSwgbWV0YSk7XG4gICAgY29uc3Qgb3BJZCA9IG9wU291bCA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChvcFNvdWwpLnRoaW5naWQgOiBudWxsO1xuICAgIGNvbnN0IHJlcGx5VG9JZCA9IHJlcGx5VG9Tb3VsXG4gICAgICA/IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChyZXBseVRvU291bCkudGhpbmdpZFxuICAgICAgOiBudWxsO1xuXG4gICAgaWYgKG9wSWQpIHJlc3VsdC5vcElkID0gb3BJZDtcbiAgICBpZiAocmVwbHlUb0lkKSByZXN1bHQucmVwbHlUb0lkID0gcmVwbHlUb0lkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pXG4pO1xuXG5jb25zdCB0aGluZ1ZvdGVDb3VudCA9IHZvdGVUeXBlID0+XG4gIHF1ZXJ5KChzY29wZSwgdGhpbmdTb3VsKSA9PlxuICAgIHNjb3BlXG4gICAgICAuZ2V0KHRoaW5nU291bClcbiAgICAgIC5nZXQodm90ZVR5cGUpXG4gICAgICAuY291bnQoKVxuICApO1xuXG5jb25zdCB0aGluZ1ZvdGVzVXAgPSB0aGluZ1ZvdGVDb3VudChcInZvdGVzdXBcIik7XG5jb25zdCB0aGluZ1ZvdGVzRG93biA9IHRoaW5nVm90ZUNvdW50KFwidm90ZXNkb3duXCIpO1xuY29uc3QgdGhpbmdBbGxDb21tZW50c0NvdW50ID0gcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2FsbGNvbW1lbnRzYCkuY291bnQoKVxuKTtcblxuY29uc3QgY29tcHV0ZVRoaW5nU2NvcmVzID0gcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gIGFsbChbXG4gICAgdGhpbmdWb3Rlc1VwKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgIHRoaW5nVm90ZXNEb3duKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgIHRoaW5nQWxsQ29tbWVudHNDb3VudChzY29wZSwgdGhpbmdTb3VsKVxuICBdKS50aGVuKChbdXAsIGRvd24sIGNvbW1lbnRdKSA9PiAoeyB1cCwgZG93biwgY29tbWVudCwgc2NvcmU6IHVwIC0gZG93biB9KSlcbik7XG5cbmNvbnN0IHRoaW5nTWV0YSA9IHF1ZXJ5KFxuICAoc2NvcGUsIHsgdGhpbmdTb3VsLCB0YWJ1bGF0b3IsIGRhdGEgPSBmYWxzZSwgc2NvcmVzID0gZmFsc2UgfSkgPT4ge1xuICAgIGlmICghdGhpbmdTb3VsKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICByZXR1cm4gYWxsKFtcbiAgICAgIHRoaW5nKHNjb3BlLCB0aGluZ1NvdWwpLFxuICAgICAgc2NvcmVzXG4gICAgICAgID8gdGFidWxhdG9yXG4gICAgICAgICAgPyBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3RlY291bnRzQH4ke3RhYnVsYXRvcn0uYCkudGhlbigpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICA6IGNvbXB1dGVUaGluZ1Njb3JlcyhzY29wZSwgdGhpbmdTb3VsKS50aGVuKClcbiAgICAgICAgOiByZXNvbHZlKCksXG4gICAgICBkYXRhXG4gICAgICAgID8gc2NvcGVcbiAgICAgICAgICAgIC5nZXQodGhpbmdTb3VsKVxuICAgICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAgIC50aGVuKClcbiAgICAgICAgOiByZXNvbHZlKClcbiAgICBdKS50aGVuKChbbWV0YSwgdm90ZXMsIGRhdGFdKSA9PiB7XG4gICAgICBpZiAoIW1ldGEgfHwgIW1ldGEuaWQpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHsgLi4ubWV0YSwgdm90ZXMsIGRhdGEgfTtcbiAgICB9KTtcbiAgfVxuKTtcblxuY29uc3QgbXVsdGlUaGluZ01ldGEgPSBxdWVyeSgoc2NvcGUsIHBhcmFtcykgPT5cbiAgYWxsKFxuICAgIFIucmVkdWNlKFxuICAgICAgKHByb21pc2VzLCB0aGluZ1NvdWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiBwcm9taXNlcztcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGluZ01ldGEoc2NvcGUsIHsgLi4ucGFyYW1zLCB0aGluZ1NvdWwgfSkpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG4gICAgICB9LFxuICAgICAgW10sXG4gICAgICBSLnByb3BPcihbXSwgXCJ0aGluZ1NvdWxzXCIsIHBhcmFtcylcbiAgICApXG4gIClcbik7XG5cbmNvbnN0IG11bHRpUXVlcnkgPSAoc2luZ2xlUXVlcnksIHBsdXJhbCwgc2luZ2xlLCBjb2xsYXRlID0gdW5pb25BcnJheXMpID0+XG4gIHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBSLnByb3AocGx1cmFsLCBwYXJhbXMpO1xuXG4gICAgaWYgKFIuaXNOaWwoaXRlbXMpKSByZXR1cm4gZW1wdHlQcm9taXNlO1xuICAgIHJldHVybiBhbGwoXG4gICAgICBSLm1hcChcbiAgICAgICAgdmFsID0+IHNpbmdsZVF1ZXJ5KHNjb3BlLCB7IC4uLnBhcmFtcywgW3NpbmdsZV06IHZhbCB9KSxcbiAgICAgICAgUi5wcm9wT3IoW10sIHBsdXJhbCwgcGFyYW1zKVxuICAgICAgKVxuICAgICkudGhlbihjb2xsYXRlKTtcbiAgfSk7XG5cbmNvbnN0IG11bHRpVG9waWMgPSBtdWx0aVF1ZXJ5KHNpbmdsZVRvcGljLCBcInRvcGljc1wiLCBcInRvcGljXCIpO1xuY29uc3QgbXVsdGlEb21haW4gPSBtdWx0aVF1ZXJ5KHNpbmdsZURvbWFpbiwgXCJkb21haW5zXCIsIFwiZG9tYWluXCIpO1xuY29uc3QgbXVsdGlBdXRob3IgPSBtdWx0aVF1ZXJ5KHNpbmdsZUF1dGhvciwgXCJhdXRob3JJZHNcIiwgXCJhdXRob3JJZFwiKTtcbmNvbnN0IG11bHRpU3VibWlzc2lvbiA9IG11bHRpUXVlcnkoXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIFwic3VibWlzc2lvbklkc1wiLFxuICBcInN1Ym1pc3Npb25JZFwiXG4pO1xuXG5jb25zdCB0aGluZ0RhdGFGcm9tU291bHMgPSBzY29wZSA9PiBzb3VscyA9PlxuICBhbGwoXG4gICAgc291bHNcbiAgICAgIC5maWx0ZXIoeCA9PiAhIXgpXG4gICAgICAubWFwKHNvdWwgPT5cbiAgICAgICAgc2NvcGVcbiAgICAgICAgICAuZ2V0KHNvdWwpXG4gICAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgICAudGhlbih4ID0+IHgpXG4gICAgICApXG4gICk7XG5cbmNvbnN0IGN1cmF0ZWQgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkcywgc3VibWlzc2lvbk9ubHkgPSBmYWxzZSkgPT5cbiAgYWxsKFtcbiAgICBtdWx0aUF1dGhvcihzY29wZSwge1xuICAgICAgdHlwZTogXCJjb21tZW50c1wiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSlcbiAgICAgIC50aGVuKHRoaW5nRGF0YUZyb21Tb3VscyhzY29wZSkpXG4gICAgICAudGhlbihcbiAgICAgICAgUi5jb21wb3NlKFxuICAgICAgICAgIFIubWFwKHN1Ym1pc3Npb25Pbmx5ID8gUi5wcm9wKFwib3BJZFwiKSA6IFIucHJvcChcInJlcGx5VG9JZFwiKSksXG4gICAgICAgICAgUi5maWx0ZXIoUi5wcm9wKFwicmVwbHlUb0lkXCIpKVxuICAgICAgICApXG4gICAgICApLFxuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcInN1Ym1pdHRlZFwiLFxuICAgICAgYXV0aG9ySWRzXG4gICAgfSkudGhlbihSLm1hcChzb3VsID0+IFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChzb3VsKS50aGluZ0lkKSlcbiAgXSkudGhlbigoW2lkczEsIGlkczJdKSA9PiBSLnVuaXEoWy4uLmlkczEsIC4uLmlkczJdKSlcbik7XG5cbmNvbnN0IHRoaW5nU2NvcmVzID0gcXVlcnkoXG4gIChzY29wZSwgdGFidWxhdG9yLCB0aGluZ0lkKSA9PlxuICAgIHRhYnVsYXRvciAmJiB0aGluZ0lkXG4gICAgICA/IHNjb3BlXG4gICAgICAgICAgLmdldChTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCB0YWJ1bGF0b3IgfSkpXG4gICAgICAgICAgLnRoZW4oKVxuICAgICAgOiByZXNvbHZlKCksXG4gIFwidGhpbmdTY29yZXNcIlxuKTtcblxuY29uc3QgdGhpbmdSZXBsaWVzID0gcXVlcnkoKHNjb3BlLCB0aGluZ0lkKSA9PlxuICBzY29wZS5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLnRoZW4oKVxuKTtcblxuY29uc3QgdGhpbmdEYXRhID0gcXVlcnkoXG4gIChzY29wZSwgdGhpbmdJZCkgPT5cbiAgICB0aGluZ0lkXG4gICAgICA/IHNjb3BlLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpLmdldChcImRhdGFcIilcbiAgICAgIDogcmVzb2x2ZShudWxsKSxcbiAgXCJ0aGluZ0RhdGFcIlxuKTtcblxuY29uc3QgdXNlclBhZ2VzID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQpID0+XG4gICAgc2NvcGUuZ2V0KFNjaGVtYS5BdXRob3JQYWdlcy5yb3V0ZS5yZXZlcnNlKHsgYXV0aG9ySWQgfSkpLFxuICBcInVzZXJQYWdlc1wiXG4pO1xuXG5jb25zdCB3aWtpUGFnZUlkID0gcXVlcnkoXG4gIChzY29wZSwgYXV0aG9ySWQsIG5hbWUpID0+XG4gICAgc2NvcGVcbiAgICAgIC5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSlcbiAgICAgIC5nZXQobmFtZSlcbiAgICAgIC5nZXQoXCJpZFwiKSxcbiAgXCJ3aWtpUGFnZUlkXCJcbik7XG5cbmNvbnN0IHdpa2lQYWdlID0gcXVlcnkoKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgd2lraVBhZ2VJZChzY29wZSwgYXV0aG9ySWQsIG5hbWUpLnRoZW4oaWQgPT4gaWQgJiYgdGhpbmdEYXRhKHNjb3BlLCBpZCkpXG4pO1xuXG5jb25zdCB1c2VyTWV0YSA9IHF1ZXJ5KChzY29wZSwgaWQpID0+IHtcbiAgaWYgKCFpZCkgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gIHJldHVybiBzY29wZS5nZXQoYH4ke2lkfWApLnRoZW4obWV0YSA9PiAoe1xuICAgIHVzZXJBbGlhczogUi5wcm9wKFwiYWxpYXNcIiwgbWV0YSksXG4gICAgY3JlYXRlZEF0OiBSLnBhdGgoW1wiX1wiLCBcIj5cIiwgXCJwdWJcIl0sIG1ldGEpXG4gIH0pKTtcbn0sIFwidXNlck1ldGFcIik7XG5cbmNvbnN0IGNyZWF0ZVNjb3BlID0gUi5jdXJyeSgobmFiLCBvcHRzKSA9PlxuICBtYWtlU2NvcGUoUi5hc3NvYyhcImd1blwiLCBuYWIuZ3VuLCBvcHRzIHx8IHt9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBRdWVyeSA9IHtcbiAgc2luZ2xlVG9waWMsXG4gIHNpbmdsZURvbWFpbixcbiAgc2luZ2xlQXV0aG9yLFxuICBzaW5nbGVMaXN0aW5nLFxuICByZXBsaWVzVG9BdXRob3IsXG4gIHNpbmdsZVN1Ym1pc3Npb24sXG4gIGNvbXB1dGVUaGluZ1Njb3JlcyxcbiAgdGhpbmdNZXRhLFxuICBtdWx0aVRoaW5nTWV0YSxcbiAgbXVsdGlUb3BpYyxcbiAgbXVsdGlEb21haW4sXG4gIG11bHRpQXV0aG9yLFxuICBtdWx0aVN1Ym1pc3Npb24sXG4gIHRoaW5nU2NvcmVzLFxuICB0aGluZ1JlcGxpZXMsXG4gIHRoaW5nRGF0YSxcbiAgdG9waWNTb3VscyxcbiAgdXNlclBhZ2VzLFxuICB3aWtpUGFnZUlkLFxuICB3aWtpUGFnZSxcbiAgdXNlck1ldGEsXG4gIGNyZWF0ZVNjb3BlLFxuICBjdXJhdGVkXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwicm91dGUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgLi4uc2VhLkFVVEhfU0NIRU1BLFxuICB0b3BpY05hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRVxuICB9LFxuXG4gIFRvcGljRGF5OiB7XG4gICAgdGl0bGU6IFwiVG9waWMgRGF5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQSBzaW5nbGUgZGF5IG9mIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWUvZGF5cy86eWVhci86bW9udGgvOmRheWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRvcGljTmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICB5ZWFyOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDIwMTgsIG1heGltdW06IDIxMDAgfSxcbiAgICAgICAgbW9udGg6IHsgdHlwZTogXCJudW1iZXJcIiwgbWluaW11bTogMSwgbWF4aW11bTogMTIgfSxcbiAgICAgICAgZGF5OiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDMxIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCIsIFwieWVhclwiLCBcIm1vbnRoXCIsIFwiZGF5XCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBUb3BpYzoge1xuICAgIHRpdGxlOiBcIlRvcGljXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIHRvcGljXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdG9waWNzLzp0b3BpY05hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0b3BpY05hbWVcIl1cbiAgICB9LFxuICAgIHByb3BzRnJvbVNvdWw6IHsgbmFtZTogXCJ0b3BpY05hbWVcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwcmVjYXRlZCBhcyB1bm5lY2Vzc2FyeVwiLFxuICAgICAgICB0eXBlOiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICBhbnlPZjogW1xuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIGRvbWFpbk5hbWU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1pbkxlbmd0aDogMSxcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfRE9NQUlOX1NJWkVcbiAgfSxcblxuICBEb21haW46IHtcbiAgICB0aXRsZTogXCJEb21haW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGluIGEgZG9tYWluXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWlucy86ZG9tYWluTmFtZWAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbk5hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZG9tYWluTmFtZVwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB1cmw6IHsgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1VSTF9TSVpFIH0sXG4gIFVSTDoge1xuICAgIHRpdGxlOiBcIlVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgZm9yIGEgZ2l2ZW4gVVJMXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdXJscy9cXCp1cmxgLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVybDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91cmxcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInVybFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aGluZ0lkOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfSEFTSF9TSVpFXG4gIH0sXG5cbiAgdGhpbmdTb3VsOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGhpbmdJZDogeyBcIiNyZWZcIjogXCIjZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdBbGxDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIEFsbCBDb21tZW50c1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBjb21tZW50cyBmb3IgYSBnaXZlbiBzdWJtaXNzaW9uXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2FsbGNvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3QgcmVwbGllcyB0byBhIHRoaW5nXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgIH1cbiAgfSxcblxuICB0aW1lc3RhbXA6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0sXG4gIHRoaW5nS2luZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0tJTkRfU0laRVxuICB9LFxuXG4gIFRoaW5nOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgUmVmZXJlbmNlXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoZXNlIGFyZSBzdWJtaXNzaW9ucywgY29tbWVudHMsIGNoYXQgbWVzc2FnZXMgYW5kIHdpa2kgcGFnZXNcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWRgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IGlkOiBcInRoaW5nSWRcIiB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGlkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGtpbmQ6IHsgXCIjcmVmXCI6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGltZXN0YW1wOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9LFxuICAgICAgb3JpZ2luYWxIYXNoOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb25lT2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFFZGdlXCIgfSxcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0RhdGFTaWduZWRFZGdlXCIgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgdG9waWM6IHtcbiAgICAgICAgYW55T2Y6IFtcbiAgICAgICAgICB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Ub3BpY0VkZ2VcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvbWUgb2xkIHRoaW5ncyBoYWQgZ2VuZXJpYyB0b3BpYyBzb3Vsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgXCIjXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiA0MiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFtcIiNcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkb21haW46IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL0RvbWFpbkVkZ2VcIiB9LFxuICAgICAgdXJsOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9VUkxFZGdlXCIgfSxcbiAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgdm90ZXN1cDogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNVcFwiIH0sXG4gICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH0sXG4gICAgICBvcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgIHJlcGx5VG86IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICBhdXRob3I6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1NFQUF1dGhvckVkZ2VcIiB9XG4gICAgfSxcblxuICAgIGFueU9mOiBbXG4gICAgICB7XG4gICAgICAgIGFsbE9mOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpbmdIYXNoTWF0Y2hlc1NvdWw6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgICAgIHsgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlc1RoaW5nOiB0cnVlIH0sXG4gICAgICAgICAgICAgIHsgdGhpbmdEYXRhTWF0Y2hlc09yaWdpbmFsSGFzaDogdHJ1ZSB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgeyBpc0xlZ2FjeVRoaW5nOiB0cnVlIH0sXG4gICAgICB7XG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU2VsZiB2ZXJpZnlpbmcgY2FuIGJlIHVwZGF0ZWQgaW4gaXNvbGF0aW9uXCIsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgICAgY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0NvbW1lbnRzXCIgfSxcbiAgICAgICAgICBhbGxjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQWxsQ29tbWVudHNcIiB9LFxuICAgICAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgICAgIHZvdGVzZG93bjogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nVm90ZXNEb3duXCIgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuXG4gIFByb29mT2ZXb3JrVm90ZXM6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAga2V5c0FyZVByb29mc09mV29yazoge1xuICAgICAgYWxnb3JpdGhtOiBcImFyZ29uMmRcIixcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjb21wbGV4aXR5OiA2LFxuICAgICAgICBoYXNoTGVuZ3RoOiAzMixcbiAgICAgICAgdGltZUNvc3Q6IDEsXG4gICAgICAgIG1lbW9yeUNvc3Q6IDEwMjQwLFxuICAgICAgICBwYXJhbGxlbGlzbTogMVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBUaGluZ1ZvdGVzVXA6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXN1cGAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdWb3Rlc0Rvd246IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvdm90ZXNkb3duYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Qcm9vZk9mV29ya1ZvdGVzXCIgfV1cbiAgfSxcblxuICBUaGluZ0RhdGE6IHtcbiAgICB0aXRsZTogXCJVbnNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgYm9keToge1xuICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9zZWFBbGlhc1wiIH0sXG4gICAgICBhdXRob3JJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgb3BJZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICByZXBseVRvSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdXJsXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfVxuICAgIH0sXG4gICAgdGhpbmdEYXRhSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gIH0sXG5cbiAgVGhpbmdEYXRhU2lnbmVkOiB7XG4gICAgdGl0bGU6IFwiU2lnbmVkIFRoaW5nIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhpcyBpcyB0aGUgYWN0dWFsIGNvbnRlbnQgb2YgYSB0aGluZywgY3J5cHRvZ3JhcGhpY2FsbHkgc2lnbmVkXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2RhdGF+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0aGluZ0lkXCIsIFwiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGtpbmQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nS2luZFwiIH0gfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHNlYToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19USVRMRV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSB9LFxuICAgICAgYm9keToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBbXCJudWxsXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19CT0RZX1NJWkVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9XG4gICAgICB9LFxuICAgICAgYXV0aG9ySWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSB9LFxuICAgICAgb3BJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIHJlcGx5VG9JZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0gfSxcbiAgICAgIGRvbWFpbjogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0gfSxcbiAgICAgIHVybDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfSB9LFxuICAgICAgdGltZXN0YW1wOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aW1lc3RhbXBcIiB9IH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3RlQ291bnRzOiB7XG4gICAgdGl0bGU6IFwiVGhpbmcgVm90ZSBDb3VudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBZ2dyZWdhdGVkIGNvdW50cyBmcm9tIGEgdGFidWxhdG9yXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVjb3VudHNAfjp0YWJ1bGF0b3IuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgdGFidWxhdG9yOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdXA6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBkb3duOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWVudDogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIHNjb3JlOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgY29tbWFuZHM6IHsgc2VhOiB7IHR5cGU6IFtcIm9iamVjdFwiLCBcInN0cmluZ1wiXSB9IH1cbiAgICB9XG4gIH0sXG5cbiAgTGlzdGluZ0RhdGE6IHtcbiAgICAkYXN5bmM6IHRydWUsXG4gICAgdGl0bGU6IFwiTGlzdGluZyBOb2RlIERhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTaGFyZWQgZGVzY3JpcHRpb24gb2YgbGlzdGluZyBwcm9wZXJ0aWVzXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBpZHM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX0lEU19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBzb3VyY2U6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIFhYWDogcmVzdCBhcmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzb3VyY2VcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFtcInN0cmluZ1wiLCBcIm51bGxcIl0sIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFIH1cbiAgICAgIH0sXG4gICAgICBzdWJtaXRUb3BpYzoge1xuICAgICAgICBzZWE6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RPUElDX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIHRhYnM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1RBQlNfU0laRSB9XG4gICAgICB9LFxuICAgICAgY3VyYXRvcnM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9MSVNUSU5HX1NPVVJDRV9TSVpFIH1cbiAgICAgIH0sXG4gICAgICBjZW5zb3JzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19TT1VSQ0VfU0laRSB9XG4gICAgICB9LFxuICAgICAgdXNlcklkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0gfSxcbiAgICAgIG9wSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICBpc0NoYXQ6IHsgc2VhOiB7IHR5cGU6IFtcImJvb2xlYW5cIiwgXCJzdHJpbmdcIl0gfSB9XG4gICAgfSxcbiAgICBwYXR0ZXJuUHJvcGVydGllczoge1xuICAgICAgXCJeZCskXCI6IHsgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIgfSB9XG4gICAgfVxuICB9LFxuXG4gIHNvcnROYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBlbnVtOiBbXG4gICAgICBcIm5ld1wiLFxuICAgICAgXCJvbGRcIixcbiAgICAgIFwiYWN0aXZlXCIsXG4gICAgICBcInRvcFwiLFxuICAgICAgXCJjb21tZW50c1wiLFxuICAgICAgXCJkaXNjdXNzZWRcIixcbiAgICAgIFwiaG90XCIsXG4gICAgICBcImJlc3RcIixcbiAgICAgIFwiY29udHJvdmVyc2lhbFwiLFxuICAgICAgXCJyYW5kb21cIixcbiAgICAgIFwiZmlyZWhvc2VcIixcbiAgICAgIFwiY2hhdFwiXG4gICAgXVxuICB9LFxuXG4gIFRvcGljTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3QvOnRvcGljLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpYzogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIERvbWFpbkxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9kb21haW4vOmRvbWFpbi86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZG9tYWluOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIFRoaW5nQ29tbWVudHNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL2NvbW1lbnRzLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIHVzZXJMaXN0aW5nVHlwZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1wib3ZlcnZpZXdcIiwgXCJzdWJtaXR0ZWRcIiwgXCJjb21tZW50c1wiLCBcImNvbW1hbmRzXCIsIFwiY29tbWVudGVkXCJdXG4gIH0sXG5cbiAgQXV0aG9yUmVwbGllc0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9yZXBsaWVzLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JQcm9maWxlTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgdHlwZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy91c2VyTGlzdGluZ1R5cGVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBTcGFjZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtcbiAgICAgICAgQ29uc3RhbnRzLlBSRUZJWFxuICAgICAgfS91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBuYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvTGlzdGluZ0RhdGFcIiB9XVxuICB9LFxuXG4gIEF1dGhvckNvbW1lbnRzOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9ycyBjb21tZW50cyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9jb21tZW50c346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yU3VibWlzc2lvbnM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBTdWJtaXNzaW9uc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyBzdWJtaXNzaW9ucyBzaG91bGQgYmUgbGlua2VkIGhlcmVcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9zdWJtaXNzaW9uc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclRoaW5nczoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIFRoaW5nc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCBvZiBhbiBhdXRob3IncyB0aGluZ3Mgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiYXV0aG9ySWRcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBzZWE6IHtcbiAgICAgICAgZWRnZU1hdGNoZXNLZXk6IHRydWUsXG4gICAgICAgIGFueU9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9XVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JQYWdlczoge1xuICAgIHRpdGxlOiBcIkF1dGhvciBQYWdlIE1hcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1hcHBpbmcgb2YgcGFnZSBuYW1lcyB0byB0aGluZ3NcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS9wYWdlc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlcyA9IFIua2V5cyhkZWZpbml0aW9ucykucmVkdWNlKChyZXN1bHQsIG5hbWUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IFIucGF0aChbbmFtZSwgXCJzb3VsXCIsIFwicGF0dGVyblwiXSwgZGVmaW5pdGlvbnMpO1xuXG4gIGlmICghcGF0dGVybikgcmV0dXJuIHJlc3VsdDtcbiAgcmV0dXJuIFIuYXNzb2MobmFtZSwgbmV3IFJvdXRlKHBhdHRlcm4pLCByZXN1bHQpO1xufSk7XG5cbmNvbnN0IGRlZnNXaXRoUm91dGVzID0gUi5jb21wb3NlKFxuICBSLnJlZHVjZShcbiAgICAocmVzLCBbbmFtZSwgcm91dGVdKSA9PlxuICAgICAgUi5hc3NvYyhuYW1lLCBSLmFzc29jKFwicm91dGVcIiwgcm91dGUsIFIucHJvcChuYW1lLCBkZWZpbml0aW9ucykpLCByZXMpLFxuICAgIHt9XG4gICksXG4gIFIudG9QYWlyc1xuKShyb3V0ZXMpO1xuXG5leHBvcnQgY29uc3QgU2NoZW1hID0ge1xuICAuLi5kZWZzV2l0aFJvdXRlcyxcbiAgZGVmaW5pdGlvbnMsXG4gIHJvdXRlc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVSSSB9IGZyb20gXCJ1cmktanNcIjtcblxuY29uc3QgYm9keSA9IFIucHJvcE9yKFwiXCIsIFwiYm9keVwiKTtcbmNvbnN0IHVybCA9IFIucHJvcE9yKFwiXCIsIFwidXJsXCIpO1xuY29uc3QgZG9tYWluID0gUi5jb21wb3NlKFxuICB1cmxTdHIgPT4ge1xuICAgIGlmICghdXJsU3RyKSByZXR1cm4gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZVVSSSh1cmxTdHIpO1xuXG4gICAgcmV0dXJuIChwYXJzZWQuaG9zdCB8fCBwYXJzZWQuc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKTtcbiAgfSxcbiAgdXJsXG4pO1xuXG5leHBvcnQgY29uc3QgVGhpbmdEYXRhTm9kZSA9IHsgYm9keSwgZG9tYWluIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgR3VuTm9kZSB9IGZyb20gXCIuLi9HdW5Ob2RlXCI7XG5cbmNvbnN0IHNvdWxzID0gR3VuTm9kZS5lZGdlcztcbmNvbnN0IGlkcyA9IFIuY29tcG9zZShcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIFIubWFwKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcInRoaW5nSWRcIiksXG4gICAgICBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2guYmluZChTY2hlbWEuVGhpbmcucm91dGUpXG4gICAgKVxuICApLFxuICBHdW5Ob2RlLmVkZ2VzXG4pO1xuXG5jb25zdCB1bmlvbiA9IFIuY29tcG9zZShcbiAgUi5kaXNzb2MoXCJfXCIpLFxuICBSLnJlZHVjZShSLm1lcmdlUmlnaHQsIHt9KVxuKTtcblxuZnVuY3Rpb24gZGF5U3RyKHRpbWVzdGFtcCkge1xuICBjb25zdCBkID0gbmV3IERhdGUodGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgY29uc3QgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLmdldFVUQ01vbnRoKCkgKyAxO1xuICBjb25zdCBkYXlOdW0gPSBkLmdldFVUQ0RhdGUoKTtcblxuICByZXR1cm4gYCR7eWVhcn0vJHttb250aH0vJHtkYXlOdW19YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRoaW5nU2V0ID0geyBpZHMsIHVuaW9uLCBzb3VscywgZGF5U3RyIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCBvYmpIYXNoIGZyb20gXCJvYmplY3QtaGFzaFwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5cbmV4cG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4vVGhpbmdTZXRcIjtcbmV4cG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi9UaGluZ0RhdGFOb2RlXCI7XG5cbmNvbnN0IHB1dCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgZGF0YS50aW1lc3RhbXAgPSBkYXRhLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBvcmlnaW5hbEhhc2ggPSBvYmpIYXNoKGRhdGEpO1xuICBjb25zdCB7IHRpbWVzdGFtcCwga2luZCwgdG9waWMsIGF1dGhvcklkLCBvcElkLCByZXBseVRvSWQgfSA9IGRhdGE7XG4gIGNvbnN0IHRoaW5nSWQgPSBvYmpIYXNoKHtcbiAgICB0aW1lc3RhbXAsXG4gICAga2luZCxcbiAgICB0b3BpYyxcbiAgICBhdXRob3JJZCxcbiAgICBvcElkLFxuICAgIHJlcGx5VG9JZCxcbiAgICBvcmlnaW5hbEhhc2hcbiAgfSk7XG5cbiAgY29uc3Qgbm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXRhU291bCA9IGF1dGhvcklkXG4gICAgPyBTY2hlbWEuVGhpbmdEYXRhU2lnbmVkLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkLCBhdXRob3JJZCB9KVxuICAgIDogU2NoZW1hLlRoaW5nRGF0YS5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3JpZ2luYWxIYXNoIH0pO1xuXG4gIGNvbnN0IG1ldGFEYXRhID0ge1xuICAgIGlkOiB0aGluZ0lkLFxuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIG9yaWdpbmFsSGFzaCxcbiAgICBkYXRhOiB7IFwiI1wiOiBkYXRhU291bCB9LFxuICAgIHZvdGVzdXA6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzVXAucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkgfSxcbiAgICB2b3Rlc2Rvd246IHsgXCIjXCI6IFNjaGVtYS5UaGluZ1ZvdGVzRG93bi5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGFsbGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIGNvbW1lbnRzOiB7IFwiI1wiOiBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9XG4gIH07XG5cbiAgaWYgKHRvcGljKVxuICAgIG1ldGFEYXRhLnRvcGljID0geyBcIiNcIjogU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IHRvcGljIH0pIH07XG4gIGlmIChhdXRob3JJZCkgbWV0YURhdGEuYXV0aG9yID0geyBcIiNcIjogYH4ke2F1dGhvcklkfWAgfTtcbiAgaWYgKG9wSWQpXG4gICAgbWV0YURhdGEub3AgPSB7IFwiI1wiOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkgfTtcbiAgaWYgKHJlcGx5VG9JZClcbiAgICBtZXRhRGF0YS5yZXBseVRvID0ge1xuICAgICAgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcmVwbHlUb0lkIH0pXG4gICAgfTtcblxuICBwZWVyLmd1bi5nZXQoZGF0YVNvdWwpLnB1dChkYXRhKTtcbiAgbm9kZS5wdXQobWV0YURhdGEpO1xuICBwZWVyLmluZGV4KHRoaW5nSWQsIGRhdGEpO1xuICByZXR1cm4gbm9kZTtcbn0pO1xuXG5jb25zdCBzdWJtaXQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmIChkYXRhLmRvbWFpbikgZGF0YS5kb21haW4gPSBkYXRhLmRvbWFpbi50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCB0aW1lc3RhbXAsIGtpbmQ6IFwic3VibWlzc2lvblwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBzdWJtaXNzaW9uc1NvdWwgPSBTY2hlbWEuQXV0aG9yU3VibWlzc2lvbnMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3Qgc3VibWlzc2lvbnMgPSBwZWVyLmd1bi5nZXQoc3VibWlzc2lvbnNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJzdWJtaXNzaW9uc1wiKVxuICAgICAgLnB1dChzdWJtaXNzaW9ucyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgc3VibWlzc2lvbnMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjb21tZW50ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY29tbWVudFwiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCBjb21tZW50c1NvdWwgPSBTY2hlbWEuQXV0aG9yQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoY29tbWVudHNTb3VsKTtcblxuICAgIHBlZXIuZ3VuXG4gICAgICAudXNlcigpXG4gICAgICAuZ2V0KFwidGhpbmdzXCIpXG4gICAgICAucHV0KHRoaW5ncyk7XG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgLnB1dChjb21tZW50cyk7XG4gICAgdGhpbmdzLnNldCh0aGluZyk7XG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIC8vIHBlZXIuZ3VuLnVzZXIoKS5nZXQoXCJjb21tZW50c1wiKS5wdXQocGVlci5ndW4udXNlcigpLmdldChcImNvbW1lbnRzXCIpKTtcblxuICByZXR1cm4gdGhpbmc7XG59KTtcblxuY29uc3QgY2hhdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmIChkYXRhLnRvcGljKSBkYXRhLnRvcGljID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodXNlcikge1xuICAgIGRhdGEuYXV0aG9yID0gdXNlci5hbGlhczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGRhdGEuYXV0aG9ySWQgPSB1c2VyLnB1YjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwdXQocGVlciwgeyAuLi5kYXRhLCBraW5kOiBcImNoYXRtc2dcIiB9KTtcblxuICBpZiAodXNlcikge1xuICAgIGNvbnN0IHRoaW5nc1NvdWwgPSBTY2hlbWEuQXV0aG9yVGhpbmdzLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgfSk7XG4gICAgY29uc3QgdGhpbmdzID0gcGVlci5ndW4uZ2V0KHRoaW5nc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCB3cml0ZVBhZ2UgPSBSLmN1cnJ5KChwZWVyLCBuYW1lLCBib2R5KSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoIXVzZXIpIHJldHVybiBQcm9taXNlLnJlamVjdChcIm5vdCBsb2dnZWQgaW5cIik7XG4gIGxldCB0aGluZztcbiAgY29uc3QgcGFnZXNTb3VsID0gU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZDogdXNlci5wdWIgfSk7XG4gIGNvbnN0IGNoYWluID0gcGVlci5ndW4uZ2V0KHBhZ2VzU291bCkuZ2V0KG5hbWUpO1xuXG4gIHJldHVybiBjaGFpbi50aGVuKHJlcyA9PiB7XG4gICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coXCJyZXNcIiwgcmVzKTtcbiAgICAgIGNoYWluXG4gICAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAgIC5nZXQoXCJib2R5XCIpXG4gICAgICAgIC5wdXQoYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGJvZHksXG4gICAgICAgIHRpdGxlOiBuYW1lLFxuICAgICAgICBraW5kOiBcIndpa2lwYWdlXCIsXG4gICAgICAgIGF1dGhvcjogdXNlci5hbGlhcyxcbiAgICAgICAgYXV0aG9ySWQ6IHVzZXIucHViXG4gICAgICB9O1xuXG4gICAgICBjb25zb2xlLmxvZyhcInBhZ2UgZGF0YVwiLCBkYXRhKTtcbiAgICAgIHRoaW5nID0gcHV0KHBlZXIsIGRhdGEpO1xuICAgICAgY2hhaW4ucHV0KHRoaW5nKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmNvbnN0IHZvdGUgPSBSLmN1cnJ5KChwZWVyLCBpZCwga2luZCwgbm9uY2UpID0+IHtcbiAgY29uc3Qgdm90ZXMgPSBwZWVyLmd1bi5nZXQoXG4gICAgU2NoZW1hW2tpbmQgPT09IFwidXBcIiA/IFwiVGhpbmdWb3Rlc1VwXCIgOiBcIlRoaW5nVm90ZXNEb3duXCJdLnJvdXRlLnJldmVyc2Uoe1xuICAgICAgdGhpbmdJZDogaWRcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiB2b3Rlcy5nZXQobm9uY2UpLnB1dChcIjFcIik7XG59KTtcblxuY29uc3QgdG9waWNQcmVmaXhlcyA9IHtcbiAgY2hhdG1zZzogXCJjaGF0OlwiLFxuICBjb21tZW50OiBcImNvbW1lbnRzOlwiXG59O1xuXG5jb25zdCBpbmRleCA9IFIuY3VycnkoKHBlZXIsIHRoaW5nSWQsIGRhdGEpID0+IHtcbiAgaWYgKCFkYXRhLnRvcGljICYmICFkYXRhLm9wSWQpIHJldHVybjtcblxuICBpZiAoZGF0YS5vcElkICYmICFkYXRhLnRvcGljKSB7XG4gICAgcGVlci5ndW5cbiAgICAgIC5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBkYXRhLm9wSWQgfSkpXG4gICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgLm9uKGZ1bmN0aW9uIHJlY3YodGQpIHtcbiAgICAgICAgaWYgKCF0ZCkgcmV0dXJuO1xuICAgICAgICBpbmRleChwZWVyLCB0aGluZ0lkLCB7IC4uLmRhdGEsIHRvcGljOiB0ZC50b3BpYyB8fCBcImFsbFwiIH0pO1xuICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGhpbmcgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKTtcbiAgY29uc3QgZGF5U3RyID0gVGhpbmdTZXQuZGF5U3RyKGRhdGEudGltZXN0YW1wKTtcbiAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF5U3RyLnNwbGl0KFwiL1wiKTtcbiAgY29uc3QgdG9waWNQcmVmaXggPSB0b3BpY1ByZWZpeGVzW2RhdGEua2luZF0gfHwgXCJcIjtcbiAgY29uc3QgYmFzZVRvcGljTmFtZSA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IHRvcGljTmFtZSA9IHRvcGljUHJlZml4ICsgYmFzZVRvcGljTmFtZTtcbiAgY29uc3QgdG9waWMgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWUgfSkpO1xuICBjb25zdCB0b3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWEuVG9waWNEYXkucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSwgeWVhciwgbW9udGgsIGRheSB9KVxuICApO1xuXG4gIGlmICghZGF0YS5za2lwQWxsICYmIGRhdGEudG9waWMgIT09IFwiYWxsXCIpIHtcbiAgICBjb25zdCBhbGxuYW1lID0gYCR7dG9waWNQcmVmaXh9YWxsYDtcbiAgICBjb25zdCBhbGxUb3BpYyA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lOiBhbGxuYW1lIH0pXG4gICAgKTtcbiAgICBjb25zdCBhbGxUb3BpY0RheSA9IHBlZXIuZ3VuLmdldChcbiAgICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdG9waWNOYW1lOiBhbGxuYW1lLFxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgZGF5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBhbGxUb3BpYy5zZXQodGhpbmcpO1xuICAgIGFsbFRvcGljRGF5LnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5raW5kID09PSBcInN1Ym1pc3Npb25cIikge1xuICAgIGNvbnN0IHVybEluZm8gPSBkYXRhLnVybCA/IHBhcnNlVVJJKGRhdGEudXJsKSA6IHt9O1xuICAgIGNvbnN0IGRvbWFpbk5hbWUgPSAoZGF0YS51cmxcbiAgICAgID8gKHVybEluZm8uaG9zdCB8fCB1cmxJbmZvLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIilcbiAgICAgIDogYHNlbGYuJHtkYXRhLnRvcGljfWBcbiAgICApLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZG9tYWluID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5Eb21haW4ucm91dGUucmV2ZXJzZSh7IGRvbWFpbk5hbWUgfSkpO1xuXG4gICAgZG9tYWluLnNldCh0aGluZyk7XG5cbiAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgIGNvbnN0IHVybE5vZGUgPSBwZWVyLmd1bi5nZXQoU2NoZW1hLlVSTC5yb3V0ZS5yZXZlcnNlKHsgdXJsOiBkYXRhLnVybCB9KSk7XG5cbiAgICAgIC8vIHRoaW5nLmdldChcInVybFwiKS5wdXQodXJsTm9kZSk7XG4gICAgICB1cmxOb2RlLnNldCh0aGluZyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGFsbGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQWxsQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KVxuICAgICk7XG5cbiAgICBhbGxjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgaWYgKGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZCkge1xuICAgIGNvbnN0IGNvbW1lbnRzID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7XG4gICAgICAgIHRoaW5nSWQ6IGRhdGEucmVwbHlUb0lkIHx8IGRhdGEub3BJZFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29tbWVudHMuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIHRvcGljLnNldCh0aGluZyk7XG4gIHRvcGljRGF5LnNldCh0aGluZyk7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nID0ge1xuICBwdXQsXG4gIHN1Ym1pdCxcbiAgY29tbWVudCxcbiAgY2hhdCxcbiAgd3JpdGVQYWdlLFxuICB2b3RlLFxuICBpbmRleFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHRva2VuaXplID0gc291cmNlID0+IHtcbiAgY29uc3QgdG9rZW5NYXAgPSAoc291cmNlIHx8IFwiXCIpLnNwbGl0KFwiXFxuXCIpLnJlZHVjZSgoZGVmLCBsaW5lKSA9PiB7XG4gICAgY29uc3QgdG9rZW5zID0gbGluZVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLm1hcChSLnRyaW0pXG4gICAgICAuZmlsdGVyKHggPT4geCk7XG5cbiAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHJldHVybiBkZWY7XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2Vucywge30sIGRlZik7XG4gIH0sIHt9KTtcblxuICBjb25zdCBpc1ByZXNlbnQgPSBwID0+IHtcbiAgICBsZXQgY2hlY2sgPSBwO1xuXG4gICAgaWYgKHR5cGVvZiBwID09PSBcInN0cmluZ1wiKSBjaGVjayA9IHAuc3BsaXQoXCIgXCIpO1xuICAgIHJldHVybiBjaGVjayAmJiBSLnBhdGgoY2hlY2ssIHRva2VuTWFwKTtcbiAgfTtcblxuICBjb25zdCBnZXRWYWx1ZXMgPSBwID0+IFIua2V5c0luKGlzUHJlc2VudChwKSk7XG4gIGNvbnN0IGdldFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocClbMF0gfHwgbnVsbDtcbiAgY29uc3QgZ2V0TGFzdFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocCkucG9wKCkgfHwgbnVsbDtcblxuICBjb25zdCBnZXRWYWx1ZUNoYWluID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGxldCBuZXh0ID0gcDtcblxuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBuZXh0ID0gZ2V0VmFsdWUoWy4uLmtleXMsIC4uLnZhbHVlc10pO1xuICAgICAgbmV4dCAmJiB2YWx1ZXMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFBhaXJzID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuXG4gICAgcmV0dXJuIGdldFZhbHVlcyhrZXlzKS5yZWR1Y2UoKHBhaXJzLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldFZhbHVlKFsuLi5rZXlzLCBrZXldKTtcblxuICAgICAgcmV0dXJuIFsuLi5wYWlycywgW2tleSwgdmFsXV07XG4gICAgfSwgW10pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlLFxuICAgIGlzUHJlc2VudCxcbiAgICBnZXRWYWx1ZSxcbiAgICBnZXRWYWx1ZXMsXG4gICAgZ2V0TGFzdFZhbHVlLFxuICAgIGdldFZhbHVlQ2hhaW4sXG4gICAgZ2V0UGFpcnNcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2tlbml6ZXIgPSB7IHRva2VuaXplIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBjcmVhdGVTdXBwcmVzc29yIH0gZnJvbSBcImd1bi1zdXBwcmVzc29yXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuXG5jb25zdCBpc0xlZ2FjeVRoaW5nID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBkYXRhU291bCA9IFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSk7XG4gIGNvbnN0IG5ld2VzdCA9IFIud2l0aG91dChcbiAgICBbXCJjb21tZW50c1wiLCBcImFsbGNvbW1lbnRzXCIsIFwidm90ZXN1cFwiLCBcInZvdGVzZG93blwiXSxcbiAgICBSLmtleXMoUi5wYXRoKFtcIl9cIiwgXCI+XCJdLCBkYXRhKSlcbiAgKVxuICAgIC5tYXAoa2V5ID0+IFIucGF0aChbXCJfXCIsIFwiPlwiLCBrZXldLCBkYXRhKSlcbiAgICAuc29ydCgpXG4gICAgLnBvcCgpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IHNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goZGF0YVNvdWwpIHx8IHt9O1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gdGhpbmdJZCAmJiBuZXdlc3QgJiYgbmV3ZXN0IDwgMTU0MzEwMjgxNDk0NTtcbn07XG5cbmNvbnN0IHRoaW5nSGFzaE1hdGNoZXNTb3VsID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gKFxuICAgIGlkICYmXG4gICAgaWQgPT09XG4gICAgICBvYmpIYXNoKHtcbiAgICAgICAgYXV0aG9ySWQ6IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGltZXN0YW1wOiBwYXJzZUludChSLnByb3AoXCJ0aW1lc3RhbXBcIiwgZGF0YSksIDEwKSxcbiAgICAgICAga2luZDogUi5wcm9wKFwia2luZFwiLCBkYXRhKSxcbiAgICAgICAgdG9waWM6IFIucHJvcChcbiAgICAgICAgICBcInRvcGljTmFtZVwiLFxuICAgICAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5tYXRjaChSLnBhdGgoW1widG9waWNcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3BJZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgcmVwbHlUb0lkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9yaWdpbmFsSGFzaDogUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpXG4gICAgICB9KVxuICApO1xufTtcblxuY29uc3Qgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGF1dGhvcklkID0gKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkO1xuICBjb25zdCBzaWduZWRJZCA9IFIucHJvcChcbiAgICBcImF1dGhvcklkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBhdXRob3JJZCAmJiBhdXRob3JJZCA9PT0gc2lnbmVkSWQ7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpO1xuICBjb25zdCBpZCA9IFIucHJvcChcbiAgICBcInRoaW5nSWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSBvcmlnaW5hbEhhc2g7XG59O1xuXG5jb25zdCBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UgPSBhanYgPT4gKFxuICBub2RlVHlwZU5hbWUsXG4gIGRhdGEsXG4gIF9wU2NoZW1hLFxuICBfY1BhdGgsXG4gIHBhcmVudERhdGFcbikgPT4ge1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgcGFyZW50RGF0YSkgfHwgXCJcIikgfHwge307XG4gIGNvbnN0IHsgdGhpbmdJZDogcHJvcFRoaW5nSWQgfSA9IFNjaGVtYVtub2RlVHlwZU5hbWVdLnJvdXRlLm1hdGNoKFxuICAgIFIucHJvcChcIiNcIiwgZGF0YSkgfHwgXCJcIlxuICApO1xuXG4gIGlmICghdGhpbmdJZCB8fCB0aGluZ0lkICE9PSBwcm9wVGhpbmdJZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYWp2LmNvbXBpbGUoeyAkcmVmOiBgc2NoZW1hLmpzb24jL2RlZmluaXRpb25zLyR7bm9kZVR5cGVOYW1lfUVkZ2VgIH0pKFxuICAgIGRhdGFcbiAgKTtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YUhhc2hNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgeyBfLCAuLi5yZWNvcmQgfSA9IGRhdGEgfHwge307IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICByZWNvcmQudGltZXN0YW1wID0gcGFyc2VGbG9hdChyZWNvcmQudGltZXN0YW1wLCAxMCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikgfHwge307XG5cbiAgcmV0dXJuIHRoaW5nSWQgJiYgdGhpbmdJZCA9PT0gb2JqSGFzaChyZWNvcmQpO1xufTtcblxuY29uc3QgaXNWb3RlVmFsaWQgPSAoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkgPT4ge1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiLCBjb25maWcgPSB7fSB9ID0gc2NoZW1hIHx8IHt9O1xuXG4gIGNvbnN0IG5vbmNlID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20odm90ZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIodm90ZSwgXCJoZXhcIik7XG4gIGNvbnN0IHNhbHQgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbShub25jZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIobm9uY2UsIFwiaGV4XCIpO1xuICBjb25zdCBoYXNoID0gYXJnb24yLmhhc2gocHJlZml4LCB7XG4gICAgc2FsdCxcbiAgICBoYXNoTGVuZ3RoOiBjb25maWcuaGFzaExlbmd0aCxcbiAgICB0aW1lQ29zdDogY29uZmlnLnRpbWVDb3N0LFxuICAgIG1lbW9yeUNvc3Q6IGNvbmZpZy5tZW1vcnlDb3N0LFxuICAgIHBhcmFsbGVsaXNtOiBjb25maWcucGFyYWxsZWxpc20sXG4gICAgcmF3OiB0cnVlLFxuICAgIHR5cGU6IGFyZ29uMlthbGdvcml0aG1dXG4gIH0pO1xuICBsZXQgb2ZmID0gMDtcbiAgbGV0IGk7XG5cbiAgZm9yIChpID0gMDsgaSA8PSBjb25maWcuY29tcGxleGl0eSAtIDg7IGkgKz0gOCwgb2ZmKyspIHtcbiAgICBpZiAoaGFzaFtvZmZdICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWFzayA9IDB4ZmYgPDwgKDggKyBpIC0gY29uZmlnLmNvbXBsZXhpdHkpO1xuXG4gIHJldHVybiAoaGFzaFtvZmZdICYgbWFzaykgPT09IDA7XG59O1xuXG5jb25zdCBrZXlzQXJlUHJvb2ZzT2ZXb3JrID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhcmdvbjIgPSByZXF1aXJlKFwiYXJnb24yXCIpO1xuXG4gIGlmICghYXJnb24yKSByZXR1cm4gdHJ1ZTsgLy8gaW4gYnJvd3NlciBkb24ndCBib3RoZXIgZm9yIG5vd1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiIH0gPSBzY2hlbWEgfHwge307XG4gIGNvbnN0IHByZWZpeCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKGFsZ29yaXRobSAhPT0gXCJhcmdvbjJkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGFyZ29uMiBzdXBwb3J0ZWQgZm9yIHZvdGUgaGFzaGVzXCIpO1xuICB9XG5cbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaCh2b3RlID0+IHtcbiAgICBpZiAoIWlzVm90ZVZhbGlkKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgdm90ZVwiLCBwcmVmaXgsIHZvdGUpO1xuICAgICAgZGVsZXRlIGRhdGFbdm90ZV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBpbml0QWp2ID0gUi5jb21wb3NlKFxuICBhanYgPT4ge1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiaXNMZWdhY3lUaGluZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogaXNMZWdhY3lUaGluZ1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nSGFzaE1hdGNoZXNTb3VsXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nUmVsYXRlZEVkZ2VcIiwge1xuICAgICAgdmFsaWRhdGU6IGdldElzVGhpbmdSZWxhdGVkRWRnZShhanYpXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YUhhc2hNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJrZXlzQXJlUHJvb2ZzT2ZXb3JrXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGFqdjtcbiAgfSxcbiAgc2VhLmluaXRBanZcbik7XG5cbmV4cG9ydCBjb25zdCBzdXBwcmVzc29yID0gY3JlYXRlU3VwcHJlc3Nvcih7XG4gIGRlZmluaXRpb25zOiBTY2hlbWEuZGVmaW5pdGlvbnMsXG4gIGluaXQ6IGluaXRBanZcbn0pO1xuXG5jb25zdCBndW5XaXJlSW5wdXQgPSBSLmN1cnJ5KChwZWVyLCBjb250ZXh0KSA9PlxuICBjb250ZXh0Lm9uKFwiaW5cIiwgZnVuY3Rpb24gd2lyZUlucHV0KG1zZykge1xuICAgIGNvbnN0IF8gPSBtc2dbXCJfXCJdO1xuXG4gICAgZGVsZXRlIG1zZ1tcIl9cIl07XG4gICAgaWYgKFwicGluZ1wiIGluIG1zZyB8fCBcImxlZWNoXCIgaW4gbXNnKSByZXR1cm47XG4gICAgaWYgKG1zZy5wdXQgJiYgIVIua2V5cyhtc2cucHV0KS5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBwcm9taXNlID0gcGVlci5jb25maWcuZGlzYWJsZVZhbGlkYXRpb25cbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKG1zZylcbiAgICAgIDogc3VwcHJlc3Nvci52YWxpZGF0ZShtc2cpO1xuXG4gICAgcHJvbWlzZVxuICAgICAgLnRoZW4odmFsaWRhdGVkID0+IHtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHJldHVybiBjb25zb2xlLmxvZyhcIm1zZyBkaWRuJ3QgdmFsaWRhdGVcIiwgbXNnKTtcbiAgICAgICAgbXNnW1wiX1wiXSA9IF87XG4gICAgICAgIHJldHVybiB0aGlzLnRvLm5leHQobXNnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJ2YWxpZGF0ZSBlcnJcIiwgbXNnLCBlcnIuc3RhY2sgfHwgZXJyKSk7XG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgVmFsaWRhdGlvbiA9IHtcbiAgaXNMZWdhY3lUaGluZyxcbiAgdGhpbmdIYXNoTWF0Y2hlc1NvdWwsXG4gIHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMsXG4gIHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2gsXG4gIGdldElzVGhpbmdSZWxhdGVkRWRnZSxcbiAgdGhpbmdEYXRhSGFzaE1hdGNoZXMsXG4gIGlzVm90ZVZhbGlkLFxuICBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICBpbml0QWp2LFxuICBzdXBwcmVzc29yLFxuICBndW5XaXJlSW5wdXRcbn07XG4iLCJpbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5leHBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmV4cG9ydCB7IExpc3RpbmcsIFNwYWNlU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdcIjtcbmV4cG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5leHBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmV4cG9ydCB7IFRoaW5nLCBUaGluZ1NldCwgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nXCI7XG5leHBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuZXhwb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmV4cG9ydCBkZWZhdWx0IFBlZXIuaW5pdDtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9hcmdvbjJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3Njb3BlX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX3NlYXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfb2JqZWN0X2hhc2hfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcm91dGVfcGFyc2VyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3VyaV9qc19fOyJdLCJzb3VyY2VSb290IjoiIn0=