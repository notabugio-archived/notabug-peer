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
      var user = peer.gun.user();
      user.auth(username, password, function (ack) {
        return ack.err ? fail(ack.err) : ok(peer.gun.user().is);
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var tokenize = R.compose(R.map(R.trim), R.split(" "), R.replace(_Constants.Constants.COMMAND_RE, ""), R.propOr("", 0), R.split("\n"));

var map = function map(thingData) {
  return R.reduce(function (cmdMap, id) {
    var body = R.path([id, "body"], thingData);
    var authorId = R.path([id, "authorId"], thingData) || "anon";
    var timestamp = parseFloat(R.path([id, "timestamp"], thingData));
    if (!R.test(_Constants.Constants.COMMAND_RE, body)) return cmdMap;
    var tokenized = [authorId].concat(_toConsumableArray(tokenize(body)), [id]);
    return R.assocPath(tokenized, timestamp || 0, cmdMap);
  }, {}, R.keys(thingData));
};

var CommentCommand = {
  tokenize: tokenize,
  map: map
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var itemsToRows = R.addIndex(R.map)(function (item, idx) {
  return [idx].concat(_toConsumableArray(item));
});

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
  itemsToRows: itemsToRows,
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
    var updatedSoul, diff, updatedIds, sort, scope, _ref4, thingId, isSticky, key;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            updatedSoul = _ref2.updatedSoul, diff = _ref2.diff;
            updatedIds = [];
            sort = R.pathOr("new", ["match", "sort"], route);
            scope = orc.newScope();
            _ref4 = _Schema.Schema.ThingVoteCounts.route.match(updatedSoul) || {}, thingId = _ref4.thingId;
            isSticky = R.equals(route.match.thingId || null);
            if (thingId) updatedIds.push(thingId);
            updatedIds = R.concat(updatedIds, _Thing.ThingSet.ids(_GunNode.GunNode.decodeSEA(diff)));
            _context2.next = 10;
            return updateListing(orc, route, scope, sort, updatedIds, [], isSticky);

          case 10:
            for (key in scope.getAccesses()) {
              orc.listen(key, route.soul);
            }

          case 11:
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

var calculateRows = (0, _gunScope.query)(function (scope, spec) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

  if (!spec.dataSource.query) return (0, _gunScope.resolve)([]);
  return spec.dataSource.query(scope).then(function (items) {
    var rows = _ListingNode.ListingNode.itemsToRows(items);

    return _ListingFilter.ListingFilter.getFilteredIds(scope, rows, { ...opts,
      filterFn: filterFn
    });
  });
});
var calculate = (0, _gunScope.query)(function (scope, spec) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
});
var toNode = (0, _gunScope.query)(function (scope, spec, opts) {
  return calculateRows(scope, spec, opts).then(_ListingNode.ListingNode.serialize(spec));
});
var read = (0, _gunScope.query)(function (scope, spec) {
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
var fromSpec = (0, _gunScope.query)(function (scope, spec) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (opts.calculate ? calculate : read)(scope, spec, opts);
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
var sidebarFromPath = (0, _gunScope.query)(function (scope, path, opts) {
  var type = _ListingType.ListingType.fromPath(path);

  if (!type || !type.getSidebar) return (0, _gunScope.resolve)("");
  return type.getSidebar(scope, type.match);
});
var nodeFromPath = (0, _gunScope.query)(function (scope, path, opts) {
  var type = _ListingType.ListingType.fromPath(path);

  if (!type) return (0, _gunScope.resolve)([]);
  return type.getSpec(scope, type.match).then(function (spec) {
    return toNode(scope, spec, opts);
  });
});
var ListingQuery = {
  fromSpec: fromSpec,
  fromPath: fromPath,
  sidebarFromPath: sidebarFromPath,
  calculateRows: calculateRows,
  toNode: toNode,
  nodeFromPath: nodeFromPath
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

var isValidSort = function isValidSort(sort) {
  return !!sorts[sort];
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
  isValidSort: isValidSort,
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/t/:topic/chat";
var tabs = _TopicListing.TopicListing.tabs;
var getSidebar = (0, _gunScope.query)(function (scope, _ref) {
  var topic = _ref.topic,
      sort = _ref.sort;
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:chat:sidebar");
});
var getSource = (0, _gunScope.query)(function (scope, _ref2) {
  var topic = _ref2.topic,
      sort = _ref2.sort;

  var normalTopics = _Path.Path.splitTopics(topic);

  var submitTo = topic === "all" ? "whatever" : normalTopics[0] || "whatever";
  var topics = normalTopics.reduce(function (res, topic) {
    return [].concat(_toConsumableArray(res), ["chat:".concat(topic)]);
  }, []);
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:chat", ["sort new", "submit to ".concat(submitTo), "sort ".concat(sort), topic.indexOf(":") === -1 ? "kind submission" : ""].concat(_toConsumableArray(R.map(function (topic) {
    return "topic ".concat(topic);
  }, topics)), _toConsumableArray(R.map(function (tab) {
    return "tab ".concat(tab, " /t/").concat(topic, "/").concat(tab);
  }, tabs))).join("\n"));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource);
});

var ChatListing = _Path.Path.withRoute({
  path: path,
  getSidebar: getSidebar,
  getSource: getSource,
  getSpec: getSpec
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

var path = "/things/:thingId/comments/:sort";
var getSidebar = (0, _gunScope.query)(function (scope) {
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:comments:sidebar");
});
var getSpec = (0, _gunScope.query)(function (scope, _ref) {
  var thingId = _ref.thingId,
      sort = _ref.sort;
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:comments", ["op ".concat(thingId), "sort ".concat(sort)].join("\n"));
});

var CommentListing = _Path.Path.withRoute({
  path: path,
  getSidebar: getSidebar,
  getSpec: getSpec
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

var path = "/user/:authorId/commented/:sort";
var getSidebar = (0, _gunScope.query)(function (scope) {
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:commented:sidebar");
});
var getSource = (0, _gunScope.query)(function (scope, _ref) {
  var authorId = _ref.authorId,
      sort = _ref.sort;
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:commented", ["curator ".concat(authorId), "sort ".concat(sort)].join("\n"));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource);
});

var CommentedListing = _Path.Path.withRoute({
  path: path,
  getSidebar: getSidebar,
  getSource: getSource,
  getSpec: getSpec
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/domain/:domain/:sort";
var tabs = ["hot", "new", "discussed", "controversial", "top"];
var getSidebar = (0, _gunScope.query)(function (scope) {
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:domain:sidebar");
});
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
  getSidebar: getSidebar,
  getSource: getSource,
  getSpec: getSpec
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/t/:topic/firehose";
var tabs = _TopicListing.TopicListing.tabs;
var getSidebar = (0, _gunScope.query)(function (scope) {
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:firehose:sidebar");
});
var getSource = (0, _gunScope.query)(function (scope, _ref) {
  var topic = _ref.topic,
      sort = _ref.sort;

  var normalTopics = _Path.Path.splitTopics(topic);

  var submitTo = topic === "all" ? "whatever" : normalTopics[0] || "whatever";
  var topics = normalTopics.reduce(function (res, topic) {
    return [].concat(_toConsumableArray(res), [topic, "chat:".concat(topic), "comments:".concat(topic)]);
  }, []);
  return _ListingSpec.ListingSpec.getSource(scope, _Config.Config.indexer, "listing:firehose", ["sort new", "submit to ".concat(submitTo), "sort ".concat(sort), topic.indexOf(":") === -1 ? "kind submission" : ""].concat(_toConsumableArray(R.map(function (topic) {
    return "topic ".concat(topic);
  }, topics)), _toConsumableArray(R.map(function (tab) {
    return "tab ".concat(tab, " /t/").concat(topic, "/").concat(tab);
  }, tabs))).join("\n"));
});
var getSpec = (0, _gunScope.query)(function (scope, match) {
  return getSource(scope, match).then(_ListingSpec.ListingSpec.fromSource);
});

var FirehoseListing = _Path.Path.withRoute({
  tabs: tabs,
  path: path,
  getSidebar: getSidebar,
  getSource: getSource,
  getSpec: getSpec
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = "/user/:authorId/replied/:type/:sort";
var getSidebar = (0, _gunScope.query)(function (scope) {
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:topic:sidebar");
});
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
  getSidebar: getSidebar,
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

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/user/:authorId/:type/:sort";
var tabs = ["overview", "comments", "submitted", "commands"];
var getSidebar = (0, _gunScope.query)(function (scope) {
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:profile:sidebar");
});
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
  getSidebar: getSidebar,
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

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

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
var getSidebar = (0, _gunScope.query)(function (scope, _ref3) {
  var authorId = _ref3.authorId,
      name = _ref3.name,
      sort = _ref3.sort;
  return _Query.Query.wikiPage(scope, authorId, _SpaceSpec.SpaceSpec.sidebarPageName(name));
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
  return (0, _gunScope.all)([getSpec(scope, match), _ListingNode.ListingNode.getRowsFromSouls(scope, souls)]).then(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        spec = _ref5[0],
        rows = _ref5[1];

    var filterFn = _ListingFilter.ListingFilter.thingFilter(scope, spec);

    return _ListingFilter.ListingFilter.getFilteredIds(scope, rows, { ...opts,
      filterFn: filterFn
    });
  });
});

var onPut = function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(orc, route, _ref6) {
    var updatedSoul, diff, original, _ref6$latest, latest, scope, originalData, diffData, _ListingNode$categori, _ListingNode$categori2, updatedIds, removedIds, spec, voteCountsMatch, thingMatch, _ref8, thingId, authorMatch, key, node, existingKeys;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updatedSoul = _ref6.updatedSoul, diff = _ref6.diff, original = _ref6.original, _ref6$latest = _ref6.latest, latest = _ref6$latest === void 0 ? 0 : _ref6$latest;
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
            _ref8 = _Schema.Schema.ThingDataSigned.route.match(updatedSoul) || {}, thingId = _ref8.thingId;
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
    return _ref7.apply(this, arguments);
  };
}();

var SpaceListing = _Path.Path.withRoute({
  path: path,
  calculate: calculate,
  getSource: getSource,
  getSidebar: getSidebar,
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

var _Query = __webpack_require__(/*! ../../Query */ "./src/Query.js");

var _Path = __webpack_require__(/*! ../Path */ "./src/Listing/Path.js");

var _ListingSpec = __webpack_require__(/*! ../ListingSpec */ "./src/Listing/ListingSpec.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = "/t/:topic/:sort";
var tabs = ["hot", "new", "discussed", "controversial", "top", "firehose"];
var getSidebar = (0, _gunScope.query)(function (scope) {
  return _Query.Query.wikiPage(scope, _Config.Config.indexer, "listing:topic:sidebar");
});
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
  getSidebar: getSidebar,
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

var types = [_ChatListing.ChatListing, _FirehoseListing.FirehoseListing, _TopicListing.TopicListing, _DomainListing.DomainListing, _CommentListing.CommentListing, _SpaceListing.SpaceListing, _InboxListing.InboxListing, _CommentedListing.CommentedListing, _ProfileListing.ProfileListing];

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

var configPageName = function configPageName(name) {
  return "space:".concat(name);
};

var sidebarPageName = function sidebarPageName(name) {
  return "space:".concat(name, ":sidebar");
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
  return _ListingSpec.ListingSpec.getSource(scope, authorId, configPageName(name), extra).then(sourceWithDefaults(authorId, name));
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
  configPageName: configPageName,
  sidebarPageName: sidebarPageName,
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

var _ListingSort = __webpack_require__(/*! ./ListingSort */ "./src/Listing/ListingSort.js");

var _ListingType = __webpack_require__(/*! ./ListingType */ "./src/Listing/ListingType/index.js");

var _ListingDataSource = __webpack_require__(/*! ./ListingDataSource */ "./src/Listing/ListingDataSource.js");

var _ListingDefinition = __webpack_require__(/*! ./ListingDefinition */ "./src/Listing/ListingDefinition.js");

var _ListingFilter = __webpack_require__(/*! ./ListingFilter */ "./src/Listing/ListingFilter.js");

var _ListingOracle = __webpack_require__(/*! ./ListingOracle */ "./src/Listing/ListingOracle.js");

var _SpaceSpec = __webpack_require__(/*! ./SpaceSpec */ "./src/Listing/SpaceSpec.js");

var Listing = {
  ListingNode: _ListingNode.ListingNode,
  ListingSpec: _ListingSpec.ListingSpec,
  isValidSort: _ListingSort.ListingSort.isValidSort,
  get: _ListingNode.ListingNode.get,
  fromSpec: _ListingQuery.ListingQuery.fromSpec,
  fromPath: _ListingQuery.ListingQuery.fromPath,
  typeFromPath: _ListingType.ListingType.fromPath,
  sidebarFromPath: _ListingQuery.ListingQuery.sidebarFromPath,
  nodeFromPath: _ListingQuery.ListingQuery.nodeFromPath
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
  thingDataFromSouls: thingDataFromSouls,
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tabulatorQuery = (0, _gunScope.query)(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(scope, route) {
    var thingSoul, _ref2, _ref3, up, down, comment, replySouls, thingData, commandMap, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            thingSoul = _Schema.Schema.Thing.route.reverse(route.match);
            _context.next = 3;
            return (0, _gunScope.all)([scope.get("".concat(thingSoul, "/votesup")).count(), scope.get("".concat(thingSoul, "/votesdown")).count(), scope.get("".concat(thingSoul, "/allcomments")).count(), scope.get("".concat(thingSoul, "/comments")).souls()]);

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 4);
            up = _ref3[0];
            down = _ref3[1];
            comment = _ref3[2];
            replySouls = _ref3[3];
            _context.next = 11;
            return _Query.Query.thingDataFromSouls(replySouls);

          case 11:
            thingData = _context.sent;
            commandMap = _CommentCommand.CommentCommand.map(thingData);
            result = {
              up: up,
              down: down,
              comment: comment,
              replies: replySouls.length,
              score: up - down
            };
            if (R.keys(commandMap).length) result.commands = JSON.stringify(commandMap);
            return _context.abrupt("return", result);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var Tabulator = {
  query: tabulatorQuery
};
exports.Tabulator = Tabulator;

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

var soulToId = R.compose(R.prop("thingId"), _Schema.Schema.Thing.route.match.bind(_Schema.Schema.Thing.route));
var soulsToIds = R.map(soulToId);
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
  soulToId: soulToId,
  soulsToIds: soulsToIds,
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
Object.defineProperty(exports, "CommentCommand", {
  enumerable: true,
  get: function get() {
    return _CommentCommand.CommentCommand;
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
Object.defineProperty(exports, "Tabulator", {
  enumerable: true,
  get: function get() {
    return _Tabulator.Tabulator;
  }
});
exports.default = void 0;

var _Peer = __webpack_require__(/*! ./Peer */ "./src/Peer.js");

var _Config = __webpack_require__(/*! ./Config */ "./src/Config.js");

var _Constants = __webpack_require__(/*! ./Constants */ "./src/Constants.js");

var _CommentCommand = __webpack_require__(/*! ./CommentCommand */ "./src/CommentCommand.js");

var _Listing = __webpack_require__(/*! ./Listing */ "./src/Listing/index.js");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25vdGFidWctcGVlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvQXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbW1lbnRDb21tYW5kLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvR3VuTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGF0YVNvdXJjZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nRmlsdGVyLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdOb2RlLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdPcmFjbGUuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTb3J0LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdTcGVjLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NoYXRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL0NvbW1lbnRlZExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvRG9tYWluTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9GaXJlaG9zZUxpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvSW5ib3hMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1Byb2ZpbGVMaXN0aW5nLmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9MaXN0aW5nL0xpc3RpbmdUeXBlL1NwYWNlTGlzdGluZy5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9MaXN0aW5nVHlwZS9Ub3BpY0xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvTGlzdGluZ1R5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvUGF0aC5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvTGlzdGluZy9TcGFjZVNwZWMuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL0xpc3RpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1BlZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1F1ZXJ5LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9TY2hlbWEuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RhYnVsYXRvci5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdEYXRhTm9kZS5qcyIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvLi9zcmMvVGhpbmcvVGhpbmdTZXQuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1RoaW5nL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci8uL3NyYy9Ub2tlbml6ZXIuanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL1ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImFyZ29uMlwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zY29wZVwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcImd1bi1zdXBwcmVzc29yXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiIiwid2VicGFjazovL25vdGFidWctcGVlci9leHRlcm5hbCBcIm9iamVjdC1oYXNoXCIiLCJ3ZWJwYWNrOi8vbm90YWJ1Zy1wZWVyL2V4dGVybmFsIFwicmFtZGFcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJyb3V0ZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9ub3RhYnVnLXBlZXIvZXh0ZXJuYWwgXCJ1cmktanNcIiJdLCJuYW1lcyI6WyJzaWdudXAiLCJSIiwiY3VycnkiLCJwZWVyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm9wdHMiLCJvayIsImZhaWwiLCJndW4iLCJ1c2VyIiwicmVzb2x2ZSIsImNyZWF0ZSIsImFjayIsImVyciIsImxlYXZlIiwibG9naW4iLCJ0aGVuIiwiYXV0aCIsImlzIiwicmVzdWx0IiwiX29uTG9naW4iLCJsb2dvdXQiLCJpc0xvZ2dlZEluIiwib25Mb2dpbiIsImZuIiwiQXV0aGVudGljYXRpb24iLCJ0b2tlbml6ZSIsImNvbXBvc2UiLCJtYXAiLCJ0cmltIiwic3BsaXQiLCJyZXBsYWNlIiwiQ09NTUFORF9SRSIsInByb3BPciIsInRoaW5nRGF0YSIsInJlZHVjZSIsImNtZE1hcCIsImlkIiwiYm9keSIsInBhdGgiLCJhdXRob3JJZCIsInRpbWVzdGFtcCIsInBhcnNlRmxvYXQiLCJ0ZXN0IiwidG9rZW5pemVkIiwiYXNzb2NQYXRoIiwia2V5cyIsIkNvbW1lbnRDb21tYW5kIiwiQ29uZmlnIiwidGFidWxhdG9yIiwiREVWX0lOREVYRVIiLCJpbmRleGVyIiwib3duZXIiLCJ1cGRhdGUiLCJrZXkiLCJ2YWwiLCJ0b1BhaXJzIiwiUFJFRklYIiwiU09VTF9ERUxJTUVURVIiLCJMSVNUSU5HX1NJWkUiLCJNQVhfSEFTSF9TSVpFIiwiTUFYX1BPV19OT05DRV9TSVpFIiwiTUFYX1RPUElDX1NJWkUiLCJNQVhfQVVUSE9SX0FMSUFTX1NJWkUiLCJNQVhfQVVUSE9SX0lEX1NJWkUiLCJNQVhfVVJMX1NJWkUiLCJNQVhfRE9NQUlOX1NJWkUiLCJNQVhfVEhJTkdfS0lORF9TSVpFIiwiTUFYX1RISU5HX1RJVExFX1NJWkUiLCJNQVhfVEhJTkdfQk9EWV9TSVpFIiwiTUFYX0xJU1RJTkdfSURTX1NJWkUiLCJNQVhfTElTVElOR19TT1VSQ0VfU0laRSIsIk1BWF9MSVNUSU5HX1RBQlNfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSIsIk1BWF9MSVNUSU5HX1NPVUxfU09SVF9TSVpFIiwiTUFYX0xJU1RJTkdfU09VTF9UWVBFX1NJWkUiLCJNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSIsIkRFRkFVTFRfSU5ERVhFUiIsIkNvbnN0YW50cyIsInNvdWwiLCJwYXRoT3IiLCJzdGF0ZSIsImxhdGVzdCIsImxhc3QiLCJzb3J0QnkiLCJpZGVudGl0eSIsInZhbHVlcyIsImVkZ2VzIiwicHJvcCIsImRlY29kZVNFQSIsInJhd0RhdGEiLCJkYXRhIiwiR3VuIiwiU0VBIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJmb3JFYWNoIiwidmVyaWZ5Iiwib3B0IiwicGFjayIsInJlcyIsInVucGFjayIsIkd1bk5vZGUiLCJuZWVkc1Njb3JlcyIsImRlZmluaXRpb24iLCJmaW5kIiwiaXNQcmVzZW50IiwibmVlZHNEYXRhIiwiaXRlbXNGcm9tVGhpbmdTb3VscyIsInNjb3BlIiwic291bHMiLCJhbGwiLCJpdGVtRnJvbVNvdWwiLCJzb3J0SXRlbXMiLCJpdGVtc0Zyb21UaGluZ1NldHMiLCJnZXQiLCJtZXJnZVJpZ2h0IiwibGlzdGluZ1NvdXJjZSIsImxpc3RpbmdzIiwic29ydCIsImxpc3RpbmdQYXRocyIsImwiLCJ0b3BpY1NvdXJjZSIsInRvcGljcyIsInQiLCJxdWVyeSIsIm11bHRpVG9waWMiLCJkb21haW5Tb3VyY2UiLCJkb21haW5zIiwibGVuZ3RoIiwiZCIsIm11bHRpRG9tYWluIiwiYXV0aG9yU291cmNlIiwiYXV0aG9ySWRzIiwidHlwZSIsIm11bHRpQXV0aG9yIiwiY3VyYXRvclNvdXJjZSIsImN1cmF0b3JzIiwiY3VyYXRlIiwiaWRzIiwidGhpbmdJZCIsIlRoaW5nIiwicm91dGUiLCJyZXZlcnNlIiwib3BTb3VyY2UiLCJzdWJtaXNzaW9uSWRzIiwibXVsdGlTdWJtaXNzaW9uIiwicmVwbGllc1NvdXJjZSIsInJlcGxpZXNUb0F1dGhvciIsInJlcGxpZXNUb0F1dGhvcklkIiwic291cmNlcyIsImxpc3RpbmciLCJyZXBsaWVzIiwib3AiLCJjdXJhdG9yIiwiYXV0aG9yIiwiZG9tYWluIiwidG9waWMiLCJzb3VyY2VOYW1lcyIsInNvdXJjZU5hbWUiLCJkZWYiLCJmcm9tRGVmaW5pdGlvbiIsIm5hbWUiLCJtZXJnZUxlZnQiLCJMaXN0aW5nRGF0YVNvdXJjZSIsImZyb21Tb3VyY2UiLCJzb3VyY2UiLCJvd25lcklkIiwic3BhY2VOYW1lIiwib2JqIiwiZ2V0VmFsdWUiLCJnZXRWYWx1ZXMiLCJnZXRWYWx1ZUNoYWluIiwiZ2V0UGFpcnMiLCJmcm9tUGFnZUF1dGhvciIsImZyb21QYWdlTmFtZSIsInVuZGVmaW5lZCIsImRpc3BsYXlOYW1lIiwidGFicyIsInVuaXF1ZUJ5Q29udGVudCIsIm1vZGVyYXRvcnMiLCJpbmNsdWRlUmFua3MiLCJzdGlja3lJZHMiLCJpc0lkU3RpY2t5Iiwic3VibWl0VG9waWNzIiwic3VibWl0VG9waWMiLCJjaGF0VG9waWMiLCJ1c2VGb3JDb21tZW50cyIsImRlZmF1bHRUYWIiLCJkZWZhdWx0VGFiUGF0aCIsImZpbHRlcnMiLCJmdW5jdGlvbnMiLCJhbGxvdyIsInJlcGxpZXNUbyIsIm9wcyIsImFsaWFzZXMiLCJhdXRob3JzIiwia2luZHMiLCJhbm9uIiwic2lnbmVkIiwiZGVueSIsInRhZ3MiLCJ2b3RlRmlsdGVycyIsInVwc01pbiIsInBhcnNlSW50IiwidXBzTWF4IiwiZG93bnNNaW4iLCJkb3duc01heCIsInNjb3JlTWluIiwic2NvcmVNYXgiLCJjZW5zb3JzIiwidW5pcSIsIkxpc3RpbmdEZWZpbml0aW9uIiwiaW50UGF0aCIsInAiLCJmaWx0ZXJGdW5jdGlvbnMiLCJ2b3RlRmlsdGVyRnVuY3Rpb25zIiwiYWRkRmlsdGVyIiwicHVzaCIsImFkZFZvdGVGaWx0ZXIiLCJpZGVudGljYWwiLCJraW5kIiwiYWxpYXMiLCJsdGUiLCJndGUiLCJ0aGluZyIsImNtZHMiLCJ0YWdOYW1lIiwiY29udGVudEZpbHRlciIsInZvdGVGaWx0ZXIiLCJ0aGluZ0ZpbHRlciIsImdldEZpbHRlcmVkSWRzIiwic29ydGVkUm93cyIsImxpbWl0IiwiY291bnQiLCJhZnRlciIsImZpbHRlckZuIiwicm93cyIsInNsaWNlIiwiZmlsdGVyZWQiLCJmZXRjaEJhdGNoIiwic2l6ZSIsIlByb21pc2UiLCJyb3ciLCJpbkxpc3RpbmciLCJQT1NfSUQiLCJzcGxpY2UiLCJQT1NfVkFMIiwic3BlYyIsInRoaW5nTWV0YSIsInRoaW5nU291bCIsInNjb3JlcyIsIkxpc3RpbmdGaWx0ZXIiLCJQT1NfSURYIiwicm93c1RvSWRzIiwicm93c1RvSXRlbXMiLCJzb3VsRnJvbVBhdGgiLCJnZXRSb3ciLCJub2RlIiwiaWR4IiwiaWZFbHNlIiwiaW5zZXJ0IiwiYWx3YXlzIiwiaXRlbUtleXMiLCJmaWx0ZXIiLCJzb3J0Um93cyIsInNvcnRXaXRoIiwiYXNjZW5kIiwiY29uZCIsImlzTmlsIiwiSW5maW5pdHkiLCJUIiwic29ydGVkSWRzIiwiaXRlbXNUb1Jvd3MiLCJhZGRJbmRleCIsIml0ZW0iLCJkaWZmIiwidXBkYXRlZEl0ZW1zIiwicmVtb3ZlSWRzIiwibWF4U2l6ZSIsInJlbW92ZWQiLCJpbmRleEJ5IiwiYnlJZCIsImNoYW5nZXMiLCJ1cGRhdGVkIiwidG9SZXBsYWNlIiwibWF4SWR4IiwicGFyc2VkIiwicmF3VmFsdWUiLCJpIiwidmFsdWUiLCJleGlzdGluZyIsImFsbFNvcnRlZCIsInNvcnRlZCIsIm1pc3NpbmciLCJhZGRlZCIsImNvbmNhdCIsImpvaW4iLCJpbnNlcnRlZCIsInBvcCIsInJlcGxhY2VkIiwiY29uc29sZSIsImxvZyIsImNhdGVnb3JpemVEaWZmIiwib3JpZ2luYWwiLCJhbGxLZXlzIiwiX2RpZmZJZHgiLCJkaWZmSWQiLCJfb3JpZ0lkeCIsIm9yaWdJZCIsInVuaW9uUm93cyIsInVuaXFCeSIsInJvd3NGcm9tU291bHMiLCJyZWFkIiwiTGlzdGluZ05vZGUiLCJ1cGRhdGVMaXN0aW5nIiwib3JjIiwibmV3U2NvcGUiLCJ0b0l0ZW1zIiwid3JpdGUiLCJvblB1dCIsInVwZGF0ZWRTb3VsIiwidXBkYXRlZElkcyIsIlRoaW5nVm90ZUNvdW50cyIsIm1hdGNoIiwiaXNTdGlja3kiLCJlcXVhbHMiLCJnZXRBY2Nlc3NlcyIsImxpc3RlbiIsIkxpc3RpbmdPcmFjbGUiLCJjYWxjdWxhdGVSb3dzIiwiZGF0YVNvdXJjZSIsIml0ZW1zIiwiY2FsY3VsYXRlIiwidG9Ob2RlIiwic2VyaWFsaXplIiwicGF0aHMiLCJmcm9tU3BlYyIsImZyb21QYXRoIiwiZ2V0U3BlYyIsImhhc0luZGV4ZXIiLCJzaWRlYmFyRnJvbVBhdGgiLCJnZXRTaWRlYmFyIiwibm9kZUZyb21QYXRoIiwiTGlzdGluZ1F1ZXJ5IiwidG9JZHMiLCJ2b3RlU29ydCIsImNvbnRhaW5zIiwidGltZVNvcnQiLCJzb3J0cyIsIm5ldyIsIm11bHRpcGx5IiwiRGF0ZSIsImdldFRpbWUiLCJvbGQiLCJhY3RpdmUiLCJsYXN0QWN0aXZlIiwidG9wIiwieCIsImNvbW1lbnRzIiwiZGlzY3Vzc2VkIiwic2NvcmUiLCJzZWNvbmRzIiwib3JkZXIiLCJNYXRoIiwibG9nMTAiLCJtYXgiLCJhYnMiLCJob3QiLCJzaWduIiwiYmVzdCIsInVwcyIsImRvd25zIiwibiIsInoiLCJsZWZ0IiwicmlnaHQiLCJzcXJ0IiwidW5kZXIiLCJjb250cm92ZXJzaWFsIiwibWFnbml0dWRlIiwiYmFsYW5jZSIsImlzVmFsaWRTb3J0IiwidG9JdGVtIiwiZnJvbVRoaW5nU2V0cyIsInBpcGUiLCJ1bmlvbiIsIkxpc3RpbmdTb3J0IiwiYXBwbHkiLCJhcCIsIm9mIiwiYXNzb2MiLCJnZXRTb3VyY2UiLCJleHRyYSIsIndpa2lQYWdlIiwiTGlzdGluZ1NwZWMiLCJub3JtYWxUb3BpY3MiLCJzcGxpdFRvcGljcyIsInN1Ym1pdFRvIiwidGFiIiwiQ2hhdExpc3RpbmciLCJ3aXRoUm91dGUiLCJDb21tZW50TGlzdGluZyIsIkNvbW1lbnRlZExpc3RpbmciLCJEb21haW5MaXN0aW5nIiwiRmlyZWhvc2VMaXN0aW5nIiwiZGlmZkRhdGEiLCJ1cGRhdGVkQXV0aG9yZWQiLCJvcElkIiwiVGhpbmdDb21tZW50cyIsInJlcGx5SWRzIiwiSW5ib3hMaXN0aW5nIiwiUHJvZmlsZUxpc3RpbmciLCJzaWRlYmFyUGFnZU5hbWUiLCJyb3V0ZVByb3BzIiwiU3BhY2VMaXN0aW5nIiwiZ2V0Um93c0Zyb21Tb3VscyIsIm9yaWdpbmFsRGF0YSIsInJlbW92ZWRJZHMiLCJ2b3RlQ291bnRzTWF0Y2giLCJ0aGluZ01hdGNoIiwiVGhpbmdEYXRhU2lnbmVkIiwiYXV0aG9yTWF0Y2giLCJTRUFBdXRob3IiLCJmcm9tUGFnZUlkIiwiZXhpc3RpbmdLZXlzIiwid29yayIsIm1ldGhvZCIsInByaW9yaXR5IiwiVG9waWNMaXN0aW5nIiwidHlwZXMiLCJMaXN0aW5nVHlwZSIsInNwbGl0RG9tYWlucyIsInRvTG93ZXIiLCJkZWZhdWx0VG8iLCJQYXRoIiwiY29uZmlnUGFnZU5hbWUiLCJzb3VyY2VXaXRoRGVmYXVsdHMiLCJub2RlVG9TcGFjZU5hbWVzIiwidXNlclNwYWNlTmFtZXMiLCJ1c2VyUGFnZXMiLCJTcGFjZVNwZWMiLCJMaXN0aW5nIiwidHlwZUZyb21QYXRoIiwiaW5pdCIsImNvbmZpZyIsImxlZWNoIiwiZGlzYWJsZVZhbGlkYXRpb24iLCJub0d1biIsImxvY2FsU3RvcmFnZSIsInBlcnNpc3QiLCJyZXN0IiwiY2ZnIiwicmFkaXNrIiwib24iLCJndW5XaXJlSW5wdXQiLCJzdG9yZUZuIiwic3RvcmUiLCJhIiwicmV0cnkiLCJzZW5kTGVlY2giLCJfIiwiY3JlYXRlU2NvcGUiLCJzdWJtaXQiLCJjb21tZW50IiwiY2hhdCIsIndyaXRlUGFnZSIsInZvdGUiLCJxdWVyaWVzIiwiUGVlciIsImVtcHR5UHJvbWlzZSIsInVuaW9uQXJyYXlzIiwidG9waWNTb3VscyIsInBhcmFtcyIsImRheXMiLCJkYXlTdHJpbmdzIiwib25lRGF5Iiwic3RhcnQiLCJkYXlTdHIiLCJPYmplY3QiLCJ0b3BpY05hbWUiLCJkcyIsInNpbmdsZVRvcGljIiwidFNvdWxzIiwiaXRlbU1heCIsImZldGNoTW9yZSIsInRvcGljU291bCIsIm1vcmUiLCJzaW5nbGVEb21haW4iLCJEb21haW4iLCJkb21haW5OYW1lIiwic2luZ2xlQXV0aG9yIiwic3VibWlzc2lvbnMiLCJsaXN0aW5nSWRzIiwic2luZ2xlTGlzdGluZyIsImF1dGhvcmVkU291bHMiLCJhdXRob3JlZFNvdWwiLCJzaW5nbGVTdWJtaXNzaW9uIiwiVGhpbmdBbGxDb21tZW50cyIsInN1Ym1pc3Npb25JZCIsInByZXBlbmQiLCJtZXRhIiwicmVwbHlUb1NvdWwiLCJvcFNvdWwiLCJ0aGluZ2lkIiwicmVwbHlUb0lkIiwidGhpbmdWb3RlQ291bnQiLCJ2b3RlVHlwZSIsInRoaW5nVm90ZXNVcCIsInRoaW5nVm90ZXNEb3duIiwidGhpbmdBbGxDb21tZW50c0NvdW50IiwiY29tcHV0ZVRoaW5nU2NvcmVzIiwidXAiLCJkb3duIiwidm90ZXMiLCJtdWx0aVRoaW5nTWV0YSIsInByb21pc2VzIiwibXVsdGlRdWVyeSIsInNpbmdsZVF1ZXJ5IiwicGx1cmFsIiwic2luZ2xlIiwiY29sbGF0ZSIsInRoaW5nRGF0YUZyb21Tb3VscyIsImN1cmF0ZWQiLCJzdWJtaXNzaW9uT25seSIsImlkczEiLCJpZHMyIiwidGhpbmdTY29yZXMiLCJ0aGluZ1JlcGxpZXMiLCJBdXRob3JQYWdlcyIsIndpa2lQYWdlSWQiLCJ1c2VyTWV0YSIsInVzZXJBbGlhcyIsImNyZWF0ZWRBdCIsIm5hYiIsIlF1ZXJ5IiwiZGVmaW5pdGlvbnMiLCJzZWEiLCJBVVRIX1NDSEVNQSIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIlRvcGljRGF5IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiJHJlZiIsInllYXIiLCJtaW5pbXVtIiwibWF4aW11bSIsIm1vbnRoIiwiZGF5IiwicmVxdWlyZWQiLCJwcm9wc0Zyb21Tb3VsIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJlZGdlTWF0Y2hlc0tleSIsImFueU9mIiwiVG9waWMiLCJ1cmwiLCJVUkwiLCJhbGxPZiIsInRoaW5nS2luZCIsIm9yaWdpbmFsSGFzaCIsIm9uZU9mIiwidGhpbmdSZWxhdGVkRWRnZSIsImFsbGNvbW1lbnRzIiwidm90ZXN1cCIsInZvdGVzZG93biIsInJlcGx5VG8iLCJ0aGluZ0hhc2hNYXRjaGVzU291bCIsInNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZyIsInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2giLCJpc0xlZ2FjeVRoaW5nIiwiUHJvb2ZPZldvcmtWb3RlcyIsIiRhc3luYyIsImtleXNBcmVQcm9vZnNPZldvcmsiLCJhbGdvcml0aG0iLCJjb21wbGV4aXR5IiwiaGFzaExlbmd0aCIsInRpbWVDb3N0IiwibWVtb3J5Q29zdCIsInBhcmFsbGVsaXNtIiwiVGhpbmdWb3Rlc1VwIiwiVGhpbmdWb3Rlc0Rvd24iLCJUaGluZ0RhdGEiLCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWwiLCJjb21tYW5kcyIsIkxpc3RpbmdEYXRhIiwidXNlcklkIiwiaXNDaGF0IiwicGF0dGVyblByb3BlcnRpZXMiLCJzb3J0TmFtZSIsImVudW0iLCJUaGluZ0NvbW1lbnRzTGlzdGluZyIsInVzZXJMaXN0aW5nVHlwZSIsIkF1dGhvclJlcGxpZXNMaXN0aW5nIiwiQXV0aG9yUHJvZmlsZUxpc3RpbmciLCJBdXRob3JDb21tZW50cyIsIkF1dGhvclN1Ym1pc3Npb25zIiwiQXV0aG9yVGhpbmdzIiwicm91dGVzIiwiZGVmc1dpdGhSb3V0ZXMiLCJTY2hlbWEiLCJ0YWJ1bGF0b3JRdWVyeSIsInJlcGx5U291bHMiLCJjb21tYW5kTWFwIiwiSlNPTiIsInN0cmluZ2lmeSIsIlRhYnVsYXRvciIsInVybFN0ciIsImhvc3QiLCJzY2hlbWUiLCJUaGluZ0RhdGFOb2RlIiwiYmluZCIsImRpc3NvYyIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJkYXlOdW0iLCJnZXRVVENEYXRlIiwiVGhpbmdTZXQiLCJzb3VsVG9JZCIsInNvdWxzVG9JZHMiLCJwdXQiLCJkYXRhU291bCIsIm1ldGFEYXRhIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsInB1YiIsInRoaW5nc1NvdWwiLCJzdWJtaXNzaW9uc1NvdWwiLCJ0aGluZ3MiLCJzZXQiLCJjb21tZW50c1NvdWwiLCJyZWplY3QiLCJwYWdlc1NvdWwiLCJjaGFpbiIsIm5vbmNlIiwidG9waWNQcmVmaXhlcyIsImNoYXRtc2ciLCJyZWN2IiwidGQiLCJvZmYiLCJ0b3BpY1ByZWZpeCIsImJhc2VUb3BpY05hbWUiLCJ0b3BpY0RheSIsInNraXBBbGwiLCJhbGxuYW1lIiwiYWxsVG9waWMiLCJhbGxUb3BpY0RheSIsInVybEluZm8iLCJ1cmxOb2RlIiwidG9rZW5NYXAiLCJsaW5lIiwidG9rZW5zIiwiY2hlY2siLCJrZXlzSW4iLCJnZXRMYXN0VmFsdWUiLCJuZXh0IiwicGFpcnMiLCJUb2tlbml6ZXIiLCJzY2hlbWEiLCJuZXdlc3QiLCJfc2NoZW1hIiwic3Vic3RyIiwic2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyIsInNpZ25lZElkIiwiZ2V0SXNUaGluZ1JlbGF0ZWRFZGdlIiwiYWp2Iiwibm9kZVR5cGVOYW1lIiwiX3BTY2hlbWEiLCJfY1BhdGgiLCJwYXJlbnREYXRhIiwicHJvcFRoaW5nSWQiLCJjb21waWxlIiwidGhpbmdEYXRhSGFzaE1hdGNoZXMiLCJyZWNvcmQiLCJpc1ZvdGVWYWxpZCIsImFyZ29uMiIsInByZWZpeCIsIkJ1ZmZlciIsImhhc093blByb3BlcnR5IiwiZnJvbSIsInNhbHQiLCJoYXNoIiwicmF3IiwibWFzayIsInJlcXVpcmUiLCJFcnJvciIsImluaXRBanYiLCJhZGRLZXl3b3JkIiwidmFsaWRhdGUiLCJtb2RpZnlpbmciLCJzdXBwcmVzc29yIiwiY29udGV4dCIsIndpcmVJbnB1dCIsIm1zZyIsInByb21pc2UiLCJ2YWxpZGF0ZWQiLCJ0byIsImNhdGNoIiwiZXJyb3IiLCJzdGFjayIsIlZhbGlkYXRpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9E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WnBCLG9EOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLHlEOzs7Ozs7Ozs7OztBQ0FBLG1EOzs7Ozs7Ozs7OztBQ0FBLDBEOzs7Ozs7Ozs7OztBQ0FBLG9EIiwiZmlsZSI6Im5vdGFidWctcGVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFyZ29uMlwiKSwgcmVxdWlyZShcImd1bi1zY29wZVwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yXCIpLCByZXF1aXJlKFwiZ3VuLXN1cHByZXNzb3Itc2VhclwiKSwgcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpLCByZXF1aXJlKFwicmFtZGFcIiksIHJlcXVpcmUoXCJyb3V0ZS1wYXJzZXJcIiksIHJlcXVpcmUoXCJ1cmktanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJub3RhYnVnLXBlZXJcIiwgW1wiYXJnb24yXCIsIFwiZ3VuLXNjb3BlXCIsIFwiZ3VuLXN1cHByZXNzb3JcIiwgXCJndW4tc3VwcHJlc3Nvci1zZWFyXCIsIFwib2JqZWN0LWhhc2hcIiwgXCJyYW1kYVwiLCBcInJvdXRlLXBhcnNlclwiLCBcInVyaS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhcmdvbjJcIiksIHJlcXVpcmUoXCJndW4tc2NvcGVcIiksIHJlcXVpcmUoXCJndW4tc3VwcHJlc3NvclwiKSwgcmVxdWlyZShcImd1bi1zdXBwcmVzc29yLXNlYXJcIiksIHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKSwgcmVxdWlyZShcInJhbWRhXCIpLCByZXF1aXJlKFwicm91dGUtcGFyc2VyXCIpLCByZXF1aXJlKFwidXJpLWpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJub3RhYnVnLXBlZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcmdvbjJcIl0sIHJvb3RbXCJndW4tc2NvcGVcIl0sIHJvb3RbXCJndW4tc3VwcHJlc3NvclwiXSwgcm9vdFtcImd1bi1zdXBwcmVzc29yLXNlYXJcIl0sIHJvb3RbXCJvYmplY3QtaGFzaFwiXSwgcm9vdFtcInJhbWRhXCJdLCByb290W1wicm91dGUtcGFyc2VyXCJdLCByb290W1widXJpLWpzXCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zY29wZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2d1bl9zdXBwcmVzc29yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX29iamVjdF9oYXNoX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcmFtZGFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91cmlfanNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5cbmNvbnN0IHNpZ251cCA9IFIuY3VycnkoXG4gIChwZWVyLCB1c2VybmFtZSwgcGFzc3dvcmQsIG9wdHMgPSB7fSkgPT5cbiAgICBuZXcgUHJvbWlzZSgob2ssIGZhaWwpID0+IHtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIuZ3VuICYmIHBlZXIuZ3VuLnVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgdXNlci5jcmVhdGUoXG4gICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgYWNrID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjay5lcnIpIHtcbiAgICAgICAgICAgICAgICBmYWlsKGFjay5lcnIpO1xuICAgICAgICAgICAgICAgIHVzZXIubGVhdmUoKTtcbiAgICAgICAgICAgICAgICBwZWVyLmd1bi51c2VyKCkubGVhdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWVyLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkudGhlbihvayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgICAgfVxuICAgIH0pXG4pO1xuXG5jb25zdCBsb2dpbiA9IFIuY3VycnkoKHBlZXIsIHVzZXJuYW1lLCBwYXNzd29yZCkgPT5cbiAgbmV3IFByb21pc2UoKG9rLCBmYWlsKSA9PiB7XG4gICAgaWYgKHBlZXIgJiYgcGVlci5ndW4gJiYgcGVlci5ndW4udXNlcikge1xuICAgICAgY29uc3QgdXNlciA9IHBlZXIuZ3VuLnVzZXIoKTtcblxuICAgICAgdXNlci5hdXRoKHVzZXJuYW1lLCBwYXNzd29yZCwgYWNrID0+XG4gICAgICAgIGFjay5lcnIgPyBmYWlsKGFjay5lcnIpIDogb2socGVlci5ndW4udXNlcigpLmlzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFpbChcIlNFQSBpcyBub3QgbG9hZGVkXCIpO1xuICAgIH1cbiAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgIHBlZXIuX29uTG9naW4gJiYgcGVlci5fb25Mb2dpbihyZXN1bHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IGxvZ291dCA9IHBlZXIgPT4gcGVlci5ndW4udXNlcigpLmxlYXZlKCk7XG5jb25zdCBpc0xvZ2dlZEluID0gcGVlciA9PiBwZWVyLmd1biAmJiBwZWVyLmd1bi51c2VyICYmIHBlZXIudXNlcigpLmlzO1xuY29uc3Qgb25Mb2dpbiA9IFIuY3VycnkoKHBlZXIsIGZuKSA9PiAocGVlci5fb25Mb2dpbiA9IGZuKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZXhwb3J0IGNvbnN0IEF1dGhlbnRpY2F0aW9uID0ge1xuICBzaWdudXAsXG4gIGxvZ2luLFxuICBsb2dvdXQsXG4gIGlzTG9nZ2VkSW4sXG4gIG9uTG9naW5cbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmNvbnN0IHRva2VuaXplID0gUi5jb21wb3NlKFxuICBSLm1hcChSLnRyaW0pLFxuICBSLnNwbGl0KFwiIFwiKSxcbiAgUi5yZXBsYWNlKENvbnN0YW50cy5DT01NQU5EX1JFLCBcIlwiKSxcbiAgUi5wcm9wT3IoXCJcIiwgMCksXG4gIFIuc3BsaXQoXCJcXG5cIilcbik7XG5cbmNvbnN0IG1hcCA9IHRoaW5nRGF0YSA9PlxuICBSLnJlZHVjZShcbiAgICAoY21kTWFwLCBpZCkgPT4ge1xuICAgICAgY29uc3QgYm9keSA9IFIucGF0aChbaWQsIFwiYm9keVwiXSwgdGhpbmdEYXRhKTtcbiAgICAgIGNvbnN0IGF1dGhvcklkID0gUi5wYXRoKFtpZCwgXCJhdXRob3JJZFwiXSwgdGhpbmdEYXRhKSB8fCBcImFub25cIjtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBhcnNlRmxvYXQoUi5wYXRoKFtpZCwgXCJ0aW1lc3RhbXBcIl0sIHRoaW5nRGF0YSkpO1xuXG4gICAgICBpZiAoIVIudGVzdChDb25zdGFudHMuQ09NTUFORF9SRSwgYm9keSkpIHJldHVybiBjbWRNYXA7XG4gICAgICBjb25zdCB0b2tlbml6ZWQgPSBbYXV0aG9ySWQsIC4uLnRva2VuaXplKGJvZHkpLCBpZF07XG5cbiAgICAgIHJldHVybiBSLmFzc29jUGF0aCh0b2tlbml6ZWQsIHRpbWVzdGFtcCB8fCAwLCBjbWRNYXApO1xuICAgIH0sXG4gICAge30sXG4gICAgUi5rZXlzKHRoaW5nRGF0YSlcbiAgKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRDb21tYW5kID0geyB0b2tlbml6ZSwgbWFwIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBDb25maWcgPSB7XG4gIHRhYnVsYXRvcjogQ29uc3RhbnRzLkRFVl9JTkRFWEVSLFxuICBpbmRleGVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIG93bmVyOiBDb25zdGFudHMuREVWX0lOREVYRVIsXG4gIHVwZGF0ZTogUi5jb21wb3NlKFxuICAgIFIubWFwKChba2V5LCB2YWxdKSA9PiAoQ29uZmlnW2tleV0gPSB2YWwpKSxcbiAgICBSLnRvUGFpcnNcbiAgKVxufTtcbiIsImNvbnN0IENPTU1BTkRfUkUgPSAvXiB7NH1+LztcbmNvbnN0IFBSRUZJWCA9IFwibmFiXCI7XG5jb25zdCBTT1VMX0RFTElNRVRFUiA9IFwifH5+fFwiO1xuXG5jb25zdCBMSVNUSU5HX1NJWkUgPSAxMDAwO1xuXG5jb25zdCBNQVhfSEFTSF9TSVpFID0gNjQ7XG5jb25zdCBNQVhfUE9XX05PTkNFX1NJWkUgPSA2NDtcbmNvbnN0IE1BWF9UT1BJQ19TSVpFID0gNDI7XG5jb25zdCBNQVhfQVVUSE9SX0FMSUFTX1NJWkUgPSAyNTY7XG5jb25zdCBNQVhfQVVUSE9SX0lEX1NJWkUgPSAxMjg7IC8vID8/P1xuY29uc3QgTUFYX1VSTF9TSVpFID0gMjA0ODtcbmNvbnN0IE1BWF9ET01BSU5fU0laRSA9IDI1NjtcbmNvbnN0IE1BWF9USElOR19LSU5EX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9USElOR19USVRMRV9TSVpFID0gMzAwO1xuY29uc3QgTUFYX1RISU5HX0JPRFlfU0laRSA9IDUwMDAwO1xuXG5jb25zdCBNQVhfTElTVElOR19JRFNfU0laRSA9IDUwMDAwO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgPSA1MDAwMDtcbmNvbnN0IE1BWF9MSVNUSU5HX1RBQlNfU0laRSA9IDUwMDA7XG5cbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfUFJFRklYX1NJWkUgPSBNQVhfVE9QSUNfU0laRTtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfSURFTlRJRklFUl9TSVpFID0gTUFYX0FVVEhPUl9JRF9TSVpFO1xuY29uc3QgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUgPSAxNjtcbmNvbnN0IE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFID0gTUFYX1RPUElDX1NJWkU7XG5jb25zdCBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSA9IDE2O1xuXG5jb25zdCBERUZBVUxUX0lOREVYRVIgPSBcIkNFeUtyRGQxeHlQWHBXU1YwME1ndm5aWTJWSkxIWGd6Q3ZoTWVEd0tUWUEueWpTcTBEeVh6emhCX1pYcl9EemZKZ2lqM3RYVTAtM3QwUTViSkF0WnBqOFwiO1xuY29uc3QgREVWX0lOREVYRVIgPSBcImwyblNlZGxTbHZvbVRxQ1lobVBuQU5vUUxYZTRzajVyUjJPckM3WXFQcFUuemltYVd3ZGxmeVRyVklUZ3dXb0RWZGJKUUtSZU9UcVY1ek5qVFJjLXlRQVwiO1xuXG5leHBvcnQgY29uc3QgQ29uc3RhbnRzID0ge1xuICBDT01NQU5EX1JFLFxuICBQUkVGSVgsXG4gIFNPVUxfREVMSU1FVEVSLFxuICBMSVNUSU5HX1NJWkUsXG4gIE1BWF9IQVNIX1NJWkUsXG4gIE1BWF9QT1dfTk9OQ0VfU0laRSxcbiAgTUFYX1RPUElDX1NJWkUsXG4gIE1BWF9BVVRIT1JfQUxJQVNfU0laRSxcbiAgTUFYX0FVVEhPUl9JRF9TSVpFLFxuICBNQVhfVVJMX1NJWkUsXG4gIE1BWF9ET01BSU5fU0laRSxcbiAgTUFYX1RISU5HX0tJTkRfU0laRSxcbiAgTUFYX1RISU5HX1RJVExFX1NJWkUsXG4gIE1BWF9USElOR19CT0RZX1NJWkUsXG4gIE1BWF9MSVNUSU5HX0lEU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VSQ0VfU0laRSxcbiAgTUFYX0xJU1RJTkdfVEFCU19TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX1BSRUZJWF9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0lERU5USUZJRVJfU0laRSxcbiAgTUFYX0xJU1RJTkdfU09VTF9TT1JUX1NJWkUsXG4gIE1BWF9MSVNUSU5HX1NPVUxfVFlQRV9TSVpFLFxuICBNQVhfTElTVElOR19TT1VMX0tJTkRfU0laRSxcbiAgREVGQVVMVF9JTkRFWEVSLFxuICBERVZfSU5ERVhFUlxufTtcbiIsIi8qIGdsb2JhbHMgR3VuICovXG5pbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuXG5jb25zdCBzb3VsID0gUi5wYXRoT3IoXCJcIiwgW1wiX1wiLCBcIiNcIl0pO1xuY29uc3Qgc3RhdGUgPSBSLnBhdGhPcih7fSwgW1wiX1wiLCBcIj5cIl0pO1xuXG5jb25zdCBsYXRlc3QgPSBSLmNvbXBvc2UoXG4gIFIubGFzdCxcbiAgUi5zb3J0QnkoUi5pZGVudGl0eSksXG4gIFIudmFsdWVzLFxuICBzdGF0ZVxuKTtcblxuY29uc3QgZWRnZXMgPSBSLmNvbXBvc2UoXG4gIFIubWFwKFIucHJvcChcIiNcIikpLFxuICBSLnZhbHVlc1xuKTtcblxuZnVuY3Rpb24gZGVjb2RlU0VBKHJhd0RhdGEpIHtcbiAgY29uc3QgZGF0YSA9IHJhd0RhdGEgPyB7IC4uLnJhd0RhdGEgfSA6IHJhd0RhdGE7XG4gIGNvbnN0IHNvdWwgPSBSLnBhdGgoW1wiX1wiLCBcIiNcIl0sIGRhdGEpO1xuXG4gIGlmICghc291bCB8fCAhR3VuLlNFQSB8fCBzb3VsLmluZGV4T2YoXCJ+XCIpID09PSAtMSkgcmV0dXJuIHJhd0RhdGE7XG4gIFIud2l0aG91dChbXCJfXCJdLCBSLmtleXMoZGF0YSkpLmZvckVhY2goa2V5ID0+IHtcbiAgICBHdW4uU0VBLnZlcmlmeShcbiAgICAgIEd1bi5TRUEub3B0LnBhY2socmF3RGF0YVtrZXldLCBrZXksIHJhd0RhdGEsIHNvdWwpLFxuICAgICAgZmFsc2UsXG4gICAgICByZXMgPT4gKGRhdGFba2V5XSA9IEd1bi5TRUEub3B0LnVucGFjayhyZXMsIGtleSwgcmF3RGF0YSkpXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IEd1bk5vZGUgPSB7IHNvdWwsIHN0YXRlLCBsYXRlc3QsIGVkZ2VzLCBkZWNvZGVTRUEgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBQcm9taXNlLCBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NvcnQgfSBmcm9tIFwiLi9MaXN0aW5nU29ydFwiO1xuXG5jb25zdCBuZWVkc1Njb3JlcyA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInNvcnQgaG90XCIsXG4gICAgXCJzb3J0IHRvcFwiLFxuICAgIFwic29ydCBiZXN0XCIsXG4gICAgXCJzb3J0IGNvbnRyb3ZlcnNpYWxcIixcbiAgICBcInVwc1wiLFxuICAgIFwiZG93bnNcIixcbiAgICBcInNjb3JlXCIsXG4gICAgXCJjYW4gcmVtb3ZlXCJcbiAgXSk7XG5cbmNvbnN0IG5lZWRzRGF0YSA9IGRlZmluaXRpb24gPT5cbiAgISFSLmZpbmQoZGVmaW5pdGlvbi5pc1ByZXNlbnQsIFtcbiAgICBcInRvcGljXCIsXG4gICAgXCJkb21haW5cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidW5pcXVlIGJ5IGNvbnRlbnRcIixcbiAgICBcImtpbmRcIixcbiAgICBcInR5cGVcIixcbiAgICBcInJlcXVpcmUgc2lnbmVkXCIsXG4gICAgXCJyZXF1aXJlIGFub25cIixcbiAgICBcImFsaWFzXCIsXG4gICAgXCJiYW4gZG9tYWluXCIsXG4gICAgXCJiYW4gdG9waWNcIixcbiAgICBcImJhbiBhdXRob3JcIixcbiAgICBcImJhbiBhbGlhc1wiXG4gIF0pO1xuXG5jb25zdCBpdGVtc0Zyb21UaGluZ1NvdWxzID0gcXVlcnkoKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbikgPT5cbiAgUHJvbWlzZS5hbGwoXG4gICAgUi5tYXAoc291bCA9PiBMaXN0aW5nU29ydC5pdGVtRnJvbVNvdWwoc2NvcGUsIHNvdWwsIGRlZmluaXRpb24pLCBzb3VscylcbiAgKS50aGVuKExpc3RpbmdTb3J0LnNvcnRJdGVtcylcbik7XG5cbmNvbnN0IGl0ZW1zRnJvbVRoaW5nU2V0cyA9IHF1ZXJ5KChzY29wZSwgc291bHMsIGRlZmluaXRpb24pID0+XG4gIFByb21pc2UuYWxsKFIubWFwKHNjb3BlLmdldCwgc291bHMpKVxuICAgIC50aGVuKFIucmVkdWNlKFIubWVyZ2VSaWdodCwge30pKVxuICAgIC50aGVuKFRoaW5nU2V0LnNvdWxzKVxuICAgIC50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSlcbik7XG5cbmNvbnN0IGxpc3RpbmdTb3VyY2UgPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbGlzdGluZ3MgPSBSLnBhdGhPcihbXSwgW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwibGlzdGluZ3NcIl0sIGRlZmluaXRpb24pO1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKGwgPT4gYCR7bH0vJHtzb3J0fWAsIGxpc3RpbmdzKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMgfTtcbn07XG5cbmNvbnN0IHRvcGljU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgdG9waWNzID0gUi5wYXRoKFtcImZpbHRlcnNcIiwgXCJhbGxvd1wiLCBcInRvcGljc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG4gIGNvbnN0IGxpc3RpbmdQYXRocyA9IFIubWFwKHQgPT4gYC90LyR7dH0vJHtzb3J0fWAsIHRvcGljcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aVRvcGljKHNjb3BlLCB7IHRvcGljcywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGRvbWFpblNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGRvbWFpbnMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwiZG9tYWluc1wiXSwgZGVmaW5pdGlvbikgfHwgW107XG5cbiAgaWYgKCFkb21haW5zLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChkID0+IGAvZG9tYWluLyR7ZH0vJHtzb3J0fWAsIGRvbWFpbnMpO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlEb21haW4oc2NvcGUsIHsgZG9tYWlucywgc29ydCB9KS50aGVuKHNvdWxzID0+XG4gICAgICBpdGVtc0Zyb21UaGluZ1NvdWxzKHNjb3BlLCBzb3VscywgZGVmaW5pdGlvbilcbiAgICApO1xuXG4gIHJldHVybiB7IGxpc3RpbmdQYXRocywgcXVlcnkgfTtcbn07XG5cbmNvbnN0IGF1dGhvclNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGF1dGhvcklkcyA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJhdXRob3JzXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIWF1dGhvcklkcy5sZW5ndGgpIHJldHVybiB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoaWQgPT4gYC91c2VyLyR7aWR9LyR7dHlwZX0vJHtzb3J0fWAsIGF1dGhvcklkcyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5tdWx0aUF1dGhvcihzY29wZSwgeyB0eXBlLCBhdXRob3JJZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBjdXJhdG9yU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgY3VyYXRvcnMgPSBSLnByb3AoXCJjdXJhdG9yc1wiLCBkZWZpbml0aW9uKSB8fCBbXTtcblxuICBpZiAoIWN1cmF0b3JzLmxlbmd0aCkgcmV0dXJuIHRvcGljU291cmNlKGRlZmluaXRpb24pO1xuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBSLm1hcChpZCA9PiBgL3VzZXIvJHtpZH0vY29tbWVudGVkLyR7c29ydH1gLCBjdXJhdG9ycyk7XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5jdXJhdGUoc2NvcGUsIGN1cmF0b3JzLCB0cnVlKVxuICAgICAgLnRoZW4oaWRzID0+IGlkcy5tYXAodGhpbmdJZCA9PiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpKVxuICAgICAgLnRoZW4oc291bHMgPT4gaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCBvcFNvdXJjZSA9IGRlZmluaXRpb24gPT4ge1xuICBjb25zdCB7IHNvcnQgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IHN1Ym1pc3Npb25JZHMgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwib3BzXCJdLCBkZWZpbml0aW9uKTtcblxuICBpZiAoIXN1Ym1pc3Npb25JZHMubGVuZ3RoKSB0b3BpY1NvdXJjZShkZWZpbml0aW9uKTtcbiAgY29uc3QgbGlzdGluZ1BhdGhzID0gUi5tYXAoXG4gICAgaWQgPT4gYC90aGluZ3MvJHtpZH0vY29tbWVudHMvJHtzb3J0fWAsXG4gICAgc3VibWlzc2lvbklkc1xuICApO1xuICBjb25zdCBxdWVyeSA9IHNjb3BlID0+XG4gICAgUXVlcnkubXVsdGlTdWJtaXNzaW9uKHNjb3BlLCB7IHN1Ym1pc3Npb25JZHMgfSkudGhlbihzb3VscyA9PlxuICAgICAgaXRlbXNGcm9tVGhpbmdTb3VscyhzY29wZSwgc291bHMsIGRlZmluaXRpb24pXG4gICAgKTtcblxuICByZXR1cm4geyBsaXN0aW5nUGF0aHMsIHF1ZXJ5IH07XG59O1xuXG5jb25zdCByZXBsaWVzU291cmNlID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgc29ydCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgaWQgPSBSLnBhdGgoW1wiZmlsdGVyc1wiLCBcImFsbG93XCIsIFwicmVwbGllc1RvXCJdLCBkZWZpbml0aW9uKTtcbiAgY29uc3QgdHlwZSA9IFIucGF0aChbXCJmaWx0ZXJzXCIsIFwiYWxsb3dcIiwgXCJ0eXBlXCJdLCBkZWZpbml0aW9uKTtcblxuICBjb25zdCBsaXN0aW5nUGF0aHMgPSBbYC91c2VyLyR7aWR9L3JlcGxpZXMvJHt0eXBlfS8ke3NvcnR9YF07XG4gIGNvbnN0IHF1ZXJ5ID0gc2NvcGUgPT5cbiAgICBRdWVyeS5yZXBsaWVzVG9BdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGUsXG4gICAgICByZXBsaWVzVG9BdXRob3JJZDogaWQsXG4gICAgICBpbmRleGVyOiBkZWZpbml0aW9uLmluZGV4ZXJcbiAgICB9KS50aGVuKHNvdWxzID0+IGl0ZW1zRnJvbVRoaW5nU291bHMoc2NvcGUsIHNvdWxzLCBkZWZpbml0aW9uKSk7XG5cbiAgcmV0dXJuIHsgbGlzdGluZ1BhdGhzLCBxdWVyeSB9O1xufTtcblxuY29uc3Qgc291cmNlcyA9IHtcbiAgbGlzdGluZzogbGlzdGluZ1NvdXJjZSxcbiAgcmVwbGllczogcmVwbGllc1NvdXJjZSxcbiAgb3A6IG9wU291cmNlLFxuICBjdXJhdG9yOiBjdXJhdG9yU291cmNlLFxuICBhdXRob3I6IGF1dGhvclNvdXJjZSxcbiAgZG9tYWluOiBkb21haW5Tb3VyY2UsXG4gIHRvcGljOiB0b3BpY1NvdXJjZVxufTtcblxuY29uc3Qgc291cmNlTmFtZXMgPSBSLmtleXMoc291cmNlcyk7XG5jb25zdCBzb3VyY2VOYW1lID0gZGVmID0+IFIuZmluZChkZWYuaXNQcmVzZW50LCBzb3VyY2VOYW1lcykgfHwgXCJ0b3BpY1wiO1xuY29uc3QgZnJvbURlZmluaXRpb24gPSBkZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbmFtZSA9IHNvdXJjZU5hbWUoZGVmaW5pdGlvbik7XG5cbiAgcmV0dXJuIFIubWVyZ2VMZWZ0KHsgbmFtZSB9LCBzb3VyY2VzW25hbWVdKGRlZmluaXRpb24pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0aW5nRGF0YVNvdXJjZSA9IHtcbiAgZnJvbURlZmluaXRpb24sXG4gIHNvdXJjZXMsXG4gIG5lZWRzU2NvcmVzLFxuICBuZWVkc0RhdGEsXG4gIGl0ZW1zRnJvbVRoaW5nU2V0cyxcbiAgaXRlbXNGcm9tVGhpbmdTb3Vsc1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSAoc291cmNlLCBvd25lcklkID0gbnVsbCwgc3BhY2VOYW1lID0gbnVsbCkgPT4ge1xuICBjb25zdCB0b2tlbml6ZWQgPSBUb2tlbml6ZXIudG9rZW5pemUoc291cmNlKTtcbiAgY29uc3Qgb2JqID0geyAuLi50b2tlbml6ZWQgfTtcbiAgY29uc3QgeyBpc1ByZXNlbnQsIGdldFZhbHVlLCBnZXRWYWx1ZXMsIGdldFZhbHVlQ2hhaW4sIGdldFBhaXJzIH0gPSB0b2tlbml6ZWQ7XG5cbiAgW1xuICAgIG9iai5mcm9tUGFnZUF1dGhvciA9IG93bmVySWQsXG4gICAgb2JqLmZyb21QYWdlTmFtZSA9IHNwYWNlTmFtZSA/IGBzcGFjZToke3NwYWNlTmFtZX1gIDogdW5kZWZpbmVkXG4gIF0gPSBnZXRWYWx1ZUNoYWluKFwic291cmNlZCBmcm9tIHBhZ2VcIik7XG4gIG9iai5kaXNwbGF5TmFtZSA9IHRva2VuaXplZC5nZXRWYWx1ZShcIm5hbWVcIikgfHwgc3BhY2VOYW1lO1xuICBvYmouaW5kZXhlciA9IGdldFZhbHVlKFwidGFidWxhdG9yXCIpIHx8IENvbmZpZy5pbmRleGVyO1xuICBvYmoudGFidWxhdG9yID0gZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIikgfHwgb2JqLmluZGV4ZXI7XG4gIG9iai50YWJzID0gZ2V0UGFpcnMoXCJ0YWJcIik7XG4gIG9iai5zb3J0ID0gZ2V0VmFsdWUoXCJzb3J0XCIpO1xuICBvYmoudW5pcXVlQnlDb250ZW50ID0gISFpc1ByZXNlbnQoXCJ1bmlxdWUgYnkgY29udGVudFwiKTtcbiAgb2JqLmN1cmF0b3JzID0gZ2V0VmFsdWVzKFwiY3VyYXRvclwiKTtcbiAgb2JqLm1vZGVyYXRvcnMgPSBnZXRWYWx1ZXMoXCJtb2RcIik7XG4gIG9iai5pbmNsdWRlUmFua3MgPSAhIWlzUHJlc2VudChcInNob3cgcmFua3NcIik7XG4gIG9iai5zdGlja3lJZHMgPSBnZXRWYWx1ZXMoXCJzdGlja3lcIik7XG4gIG9iai5pc0lkU3RpY2t5ID0gaWQgPT4gISF0b2tlbml6ZWQuaXNQcmVzZW50KFtcInN0aWNreVwiLCBpZF0pO1xuICBvYmouc3VibWl0VG9waWNzID0gZ2V0VmFsdWVzKFwic3VibWl0IHRvXCIpO1xuICBvYmouc3VibWl0VG9waWMgPSBnZXRWYWx1ZShcInN1Ym1pdCB0b1wiKTtcbiAgb2JqLmNoYXRUb3BpYyA9IGdldFZhbHVlKFwiY2hhdCBpblwiKTtcblxuICBpZiAob3duZXJJZCAmJiBzcGFjZU5hbWUpIHtcbiAgICBvYmouc3BhY2VOYW1lID0gc3BhY2VOYW1lO1xuICAgIG9iai5vd25lciA9IG93bmVySWQ7XG4gICAgb2JqLnVzZUZvckNvbW1lbnRzID0gIXRva2VuaXplZC5pc1ByZXNlbnQoXCJjb21tZW50cyBsZWF2ZSBzcGFjZVwiKTtcbiAgICBvYmoucGF0aCA9IGAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke3NwYWNlTmFtZX1gO1xuICAgIG9iai5kZWZhdWx0VGFiID0gdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpO1xuICAgIG9iai5kZWZhdWx0VGFiUGF0aCA9IG9iai5kZWZhdWx0VGFiXG4gICAgICA/IHRva2VuaXplZC5nZXRWYWx1ZShbXCJ0YWJcIiwgb2JqLmRlZmF1bHRUYWJdKVxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgb2JqLmZpbHRlcnMgPSB7XG4gICAgZnVuY3Rpb25zOiBbXSxcbiAgICBhbGxvdzoge1xuICAgICAgcmVwbGllc1RvOiBnZXRWYWx1ZShcInJlcGxpZXMgdG8gYXV0aG9yXCIpLFxuICAgICAgdHlwZTogZ2V0VmFsdWUoXCJ0eXBlXCIpLCAvLyBUT0RPOiB0aGlzIGZpZWxkIHNlZW1zIHJlZHVuZGFudCB3aXRoIGtpbmQgYW5kIHNob3VsZCBiZSBkZXByZWNhdGVkXG4gICAgICBvcHM6IGdldFZhbHVlcyhcIm9wXCIpLFxuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYWxpYXNcIiksXG4gICAgICBhdXRob3JzOiBnZXRWYWx1ZXMoXCJhdXRob3JcIiksXG4gICAgICBkb21haW5zOiBnZXRWYWx1ZXMoXCJkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcInRvcGljXCIpLFxuICAgICAgbGlzdGluZ3M6IGdldFZhbHVlcyhcImxpc3RpbmdcIiksXG4gICAgICBraW5kczogZ2V0VmFsdWVzKFwia2luZFwiKSxcbiAgICAgIGFub246ICFpc1ByZXNlbnQoXCJyZXF1aXJlIHNpZ25lZFwiKSxcbiAgICAgIHNpZ25lZDogIWlzUHJlc2VudChcInJlcXVpcmUgYW5vblwiKVxuICAgIH0sXG4gICAgZGVueToge1xuICAgICAgYWxpYXNlczogZ2V0VmFsdWVzKFwiYmFuIGFsaWFzXCIpLFxuICAgICAgYXV0aG9yczogZ2V0VmFsdWVzKFwiYmFuIGF1dGhvclwiKSxcbiAgICAgIGRvbWFpbnM6IGdldFZhbHVlcyhcImJhbiBkb21haW5cIiksXG4gICAgICB0b3BpY3M6IGdldFZhbHVlcyhcImJhbiB0b3BpY1wiKSxcbiAgICAgIGFub246ICEhaXNQcmVzZW50KFwicmVxdWlyZSBzaWduZWRcIiksXG4gICAgICBzaWduZWQ6ICEhaXNQcmVzZW50KFwicmVxdWlyZSBhbm9uXCIpLFxuICAgICAgdGFnczogZ2V0UGFpcnMoXCJjYW4gcmVtb3ZlXCIpXG4gICAgfVxuICB9O1xuXG4gIG9iai52b3RlRmlsdGVycyA9IHtcbiAgICBmdW5jdGlvbnM6IFtdLFxuICAgIHVwc01pbjogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHVwc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJ1cHMgYmVsb3dcIiksIDEwKSB8fCBudWxsLFxuICAgIGRvd25zTWluOiBwYXJzZUludChnZXRWYWx1ZShcImRvd25zIGFib3ZlXCIpLCAxMCkgfHwgbnVsbCxcbiAgICBkb3duc01heDogcGFyc2VJbnQoZ2V0VmFsdWUoXCJkb3ducyBiZWxvd1wiKSwgMTApIHx8IG51bGwsXG4gICAgc2NvcmVNaW46IHBhcnNlSW50KGdldFZhbHVlKFwic2NvcmUgYWJvdmVcIiksIDEwKSB8fCBudWxsLFxuICAgIHNjb3JlTWF4OiBwYXJzZUludChnZXRWYWx1ZShcInNjb3JlIGJlbG93XCIpLCAxMCkgfHwgbnVsbFxuICB9O1xuXG4gIG9iai5jZW5zb3JzID0gUi51bmlxKFIubWFwKFIucHJvcCgxKSwgb2JqLmZpbHRlcnMuZGVueS50YWdzKSk7XG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ0RlZmluaXRpb24gPSB7IGZyb21Tb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi4vU2NoZW1hXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuXG5jb25zdCBpbnRQYXRoID0gcCA9PlxuICBSLmNvbXBvc2UoXG4gICAgcGFyc2VJbnQsXG4gICAgUi5wYXRoKHApXG4gICk7XG5cbmNvbnN0IGZyb21EZWZpbml0aW9uID0gZGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IHsgZmlsdGVycywgdm90ZUZpbHRlcnMsIGlzUHJlc2VudCB9ID0gZGVmaW5pdGlvbjtcbiAgY29uc3QgZmlsdGVyRnVuY3Rpb25zID0gW107XG4gIGNvbnN0IHZvdGVGaWx0ZXJGdW5jdGlvbnMgPSBbXTtcblxuICBjb25zdCBhZGRGaWx0ZXIgPSAoLi4uZm5zKSA9PiBmaWx0ZXJGdW5jdGlvbnMucHVzaChSLmNvbXBvc2UoLi4uZm5zKSk7XG4gIGNvbnN0IGFkZFZvdGVGaWx0ZXIgPSAoLi4uZm5zKSA9PiB2b3RlRmlsdGVyRnVuY3Rpb25zLnB1c2goUi5jb21wb3NlKC4uLmZucykpO1xuXG4gIGlmIChmaWx0ZXJzLmFsbG93LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcih0ID0+ICEhaXNQcmVzZW50KFtcImFsaWFzXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JcIl0pKTtcbiAgaWYgKGZpbHRlcnMuYWxsb3cuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKHQgPT4gISFpc1ByZXNlbnQoW1wiYXV0aG9yXCIsIHRdKSwgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJkb21haW5cIiwgdF0pLCBUaGluZ0RhdGFOb2RlLmRvbWFpbik7XG5cbiAgaWYgKFxuICAgIGZpbHRlcnMuYWxsb3cudG9waWNzLmxlbmd0aCAmJlxuICAgICFSLmZpbmQoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIFIuaWRlbnRpY2FsKFwiYWxsXCIpLFxuICAgICAgICBSLmxhc3QsXG4gICAgICAgIFIuc3BsaXQoXCI6XCIpXG4gICAgICApLFxuICAgICAgZmlsdGVycy5hbGxvdy50b3BpY3NcbiAgICApXG4gIClcbiAgICBhZGRGaWx0ZXIodCA9PiAhIWlzUHJlc2VudChbXCJ0b3BpY1wiLCB0XSksIFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0pKTtcblxuICBpZiAoZmlsdGVycy5hbGxvdy5raW5kcy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKGtpbmQgPT4gISFpc1ByZXNlbnQoW1wia2luZFwiLCBraW5kXSksIFIucGF0aChbXCJkYXRhXCIsIFwia2luZFwiXSkpO1xuICBpZiAoZmlsdGVycy5hbGxvdy50eXBlID09PSBcImNvbW1hbmRzXCIpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgUi5jb21wb3NlKFxuICAgICAgICBSLnRlc3QoQ29uc3RhbnRzLkNPTU1BTkRfUkUpLFxuICAgICAgICBSLnBhdGgoW1wiZGF0YVwiLCBcImJvZHlcIl0pXG4gICAgICApXG4gICAgKTtcblxuICBpZiAoZmlsdGVycy5kZW55LmFsaWFzZXMubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIGFsaWFzID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwiYWxpYXNcIiwgYWxpYXNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9yXCJdKVxuICAgICk7XG4gIGlmIChmaWx0ZXJzLmRlbnkuYXV0aG9ycy5sZW5ndGgpXG4gICAgYWRkRmlsdGVyKFxuICAgICAgYXV0aG9ySWQgPT4gIWlzUHJlc2VudChbXCJiYW5cIiwgXCJhdXRob3JcIiwgYXV0aG9ySWRdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwiYXV0aG9ySWRcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5kb21haW5zLmxlbmd0aClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBkb21haW4gPT4gIWRvbWFpbiB8fCAhaXNQcmVzZW50KFtcImJhblwiLCBcImRvbWFpblwiLCBkb21haW5dKSxcbiAgICAgIFRoaW5nRGF0YU5vZGUuZG9tYWluXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS50b3BpY3MubGVuZ3RoKVxuICAgIGFkZEZpbHRlcihcbiAgICAgIHRvcGljID0+ICFpc1ByZXNlbnQoW1wiYmFuXCIsIFwidG9waWNcIiwgdG9waWNdKSxcbiAgICAgIFIucGF0aChbXCJkYXRhXCIsIFwidG9waWNcIl0pXG4gICAgKTtcbiAgaWYgKGZpbHRlcnMuZGVueS5hbm9uKSBhZGRGaWx0ZXIoUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSkpO1xuICBpZiAoZmlsdGVycy5kZW55LnNpZ25lZClcbiAgICBhZGRGaWx0ZXIoXG4gICAgICBSLmNvbXBvc2UoXG4gICAgICAgIGF1dGhvcklkID0+ICFhdXRob3JJZCxcbiAgICAgICAgUi5wYXRoKFtcImRhdGFcIiwgXCJhdXRob3JJZFwiXSlcbiAgICAgIClcbiAgICApO1xuXG4gIGlmICh2b3RlRmlsdGVycy51cHNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy51cHNNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwidXBcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnVwc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLnVwc01heCksIGludFBhdGgoW1widm90ZXNcIiwgXCJ1cFwiXSkpO1xuICBpZiAodm90ZUZpbHRlcnMuZG93bnNNaW4gIT09IG51bGwpXG4gICAgYWRkVm90ZUZpbHRlcihSLmx0ZSh2b3RlRmlsdGVycy5kb3duc01pbiksIGludFBhdGgoW1widm90ZXNcIiwgXCJkb3duXCJdKSk7XG4gIGlmICh2b3RlRmlsdGVycy5kb3duc01heCAhPT0gbnVsbClcbiAgICBhZGRWb3RlRmlsdGVyKFIuZ3RlKHZvdGVGaWx0ZXJzLmRvd25zTWF4KSwgaW50UGF0aChbXCJ2b3Rlc1wiLCBcImRvd25cIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWluICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5sdGUodm90ZUZpbHRlcnMuc2NvcmVNaW4pLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcbiAgaWYgKHZvdGVGaWx0ZXJzLnNjb3JlTWF4ICE9PSBudWxsKVxuICAgIGFkZFZvdGVGaWx0ZXIoUi5ndGUodm90ZUZpbHRlcnMuc2NvcmVNYXgpLCBpbnRQYXRoKFtcInZvdGVzXCIsIFwic2NvcmVcIl0pKTtcblxuICBpZiAoZmlsdGVycy5kZW55LnRhZ3MubGVuZ3RoKVxuICAgIGFkZFZvdGVGaWx0ZXIodGhpbmcgPT4ge1xuICAgICAgY29uc3QgY21kcyA9IFIucGF0aChbXCJ2b3Rlc1wiLCBcImNvbW1hbmRzXCJdLCB0aGluZykgfHwge307XG5cbiAgICAgIHJldHVybiAhZmlsdGVycy5kZW55LnRhZ3MuZmluZChcbiAgICAgICAgKFt0YWdOYW1lLCBhdXRob3JJZF0pID0+ICEhUi5wYXRoKFthdXRob3JJZCwgXCJ0YWdcIiwgdGFnTmFtZV0sIGNtZHMpXG4gICAgICApO1xuICAgIH0pO1xuXG4gIGNvbnN0IGNvbnRlbnRGaWx0ZXIgPSB0aGluZyA9PiAhZmlsdGVyRnVuY3Rpb25zLmZpbmQoZm4gPT4gIWZuKHRoaW5nKSk7XG4gIGNvbnN0IHZvdGVGaWx0ZXIgPSB0aGluZyA9PiAhdm90ZUZpbHRlckZ1bmN0aW9ucy5maW5kKGZuID0+ICFmbih0aGluZykpO1xuICBjb25zdCB0aGluZ0ZpbHRlciA9IHRoaW5nID0+IChjb250ZW50RmlsdGVyKHRoaW5nKSAmJiB2b3RlRmlsdGVyKHRoaW5nKSk7XG5cbiAgcmV0dXJuIHsgdGhpbmdGaWx0ZXIsIGNvbnRlbnRGaWx0ZXIsIHZvdGVGaWx0ZXIgfTtcbn07XG5cbmNvbnN0IGdldEZpbHRlcmVkSWRzID0gYXN5bmMgKFxuICBzY29wZSxcbiAgc29ydGVkUm93cyxcbiAgeyBsaW1pdCA9IDI1LCBjb3VudCA9IDAsIGFmdGVyID0gbnVsbCwgZmlsdGVyRm4gfSA9IHt9XG4pID0+IHtcbiAgY29uc3Qgcm93cyA9IHNvcnRlZFJvd3Muc2xpY2UoKTtcbiAgY29uc3QgZmlsdGVyZWQgPSBbXTtcbiAgY29uc3QgZmV0Y2hCYXRjaCA9IChzaXplID0gMzApID0+XG4gICAgUHJvbWlzZS5hbGwoXG4gICAgICBSLm1hcChhc3luYyByb3cgPT4ge1xuICAgICAgICBsZXQgaW5MaXN0aW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAoZmlsdGVyRm4pIGluTGlzdGluZyA9IGF3YWl0IGZpbHRlckZuKHJvd1tMaXN0aW5nTm9kZS5QT1NfSURdKTtcbiAgICAgICAgaWYgKGluTGlzdGluZykgZmlsdGVyZWQucHVzaChyb3cpO1xuICAgICAgfSwgcm93cy5zcGxpY2UoY291bnQsIHNpemUpKVxuICAgICk7XG5cbiAgd2hpbGUgKHJvd3MubGVuZ3RoKSB7XG4gICAgYXdhaXQgZmV0Y2hCYXRjaCgpO1xuICAgIGlmIChsaW1pdCAmJiBmaWx0ZXJlZC5sZW5ndGggPj0gbGltaXQpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIFIuY29tcG9zZShcbiAgICBSLm1hcChSLnByb3AoTGlzdGluZ05vZGUuUE9TX0lEKSksXG4gICAgbGltaXQgPyBSLnNsaWNlKDAsIGxpbWl0KSA6IFIuaWRlbnRpdHksXG4gICAgUi5zb3J0QnkoUi5wcm9wKExpc3RpbmdOb2RlLlBPU19WQUwpKVxuICApKGZpbHRlcmVkKTtcbn07XG5cbmNvbnN0IHRoaW5nRmlsdGVyID0gUi5jdXJyeSgoc2NvcGUsIHNwZWMsIHRoaW5nSWQpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSksXG4gICAgc2NvcmVzOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc1Njb3JlcyhzcGVjKSxcbiAgICBkYXRhOiBMaXN0aW5nRGF0YVNvdXJjZS5uZWVkc0RhdGEoc3BlYylcbiAgfSkudGhlbihzcGVjLnRoaW5nRmlsdGVyKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdGaWx0ZXIgPSB7IGZyb21EZWZpbml0aW9uLCBnZXRGaWx0ZXJlZElkcywgdGhpbmdGaWx0ZXIgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9Db25maWdcIjtcblxuY29uc3QgW1BPU19JRFgsIFBPU19JRCwgUE9TX1ZBTF0gPSBbMCwgMSwgMiwgM107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHJvd3NUb0lkcyA9IFIubWFwKFIucHJvcChQT1NfSUQpKTtcbmNvbnN0IHJvd3NUb0l0ZW1zID0gUi5tYXAoUi5zbGljZSgxLCAzKSk7XG5jb25zdCBzb3VyY2UgPSBSLnByb3BPcihcIlwiLCBcInNvdXJjZVwiKTtcbmNvbnN0IHNvdWxGcm9tUGF0aCA9IFIuY3VycnkoXG4gIChpbmRleGVyLCBwYXRoKSA9PiBgJHtDb25zdGFudHMuUFJFRklYfSR7cGF0aH1AfiR7aW5kZXhlcn0uYFxuKTtcblxuY29uc3QgZ2V0Um93ID0gUi5jdXJyeSgobm9kZSwgaWR4KSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5pZkVsc2UoUi5wcm9wKFwibGVuZ3RoXCIpLCBSLmluc2VydCgwLCBwYXJzZUludChpZHgsIDEwKSksIFIuYWx3YXlzKG51bGwpKSxcbiAgICByb3cgPT4ge1xuICAgICAgcm93WzFdID0gcGFyc2VGbG9hdChyb3dbMV0pO1xuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LFxuICAgIFIubWFwKFIudHJpbSksXG4gICAgUi5zcGxpdChcIixcIiksXG4gICAgUi5wcm9wT3IoXCJcIiwgYCR7aWR4fWApXG4gICkobm9kZSlcbik7XG5cbmNvbnN0IGl0ZW1LZXlzID0gUi5jb21wb3NlKFxuICBSLmZpbHRlcihcbiAgICBSLmNvbXBvc2UoXG4gICAgICB2YWwgPT4gISEodmFsID09PSAwIHx8IHZhbCksXG4gICAgICBwYXJzZUludFxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCByb3dzID0gbm9kZSA9PlxuICBSLmNvbXBvc2UoXG4gICAgUi5tYXAoZ2V0Um93KG5vZGUpKSxcbiAgICBpdGVtS2V5c1xuICApKG5vZGUpO1xuXG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIHJvd3NUb0lkcyxcbiAgcm93c1xuKTtcblxuY29uc3Qgc29ydFJvd3MgPSBSLnNvcnRXaXRoKFtcbiAgUi5hc2NlbmQoXG4gICAgUi5jb21wb3NlKFxuICAgICAgUi5jb25kKFtbUi5pc05pbCwgUi5hbHdheXMoSW5maW5pdHkpXSwgW1IuVCwgcGFyc2VGbG9hdF1dKSxcbiAgICAgIFIucHJvcChQT1NfVkFMKVxuICAgIClcbiAgKVxuXSk7XG5cbmNvbnN0IHNvcnRlZElkcyA9IFIuY29tcG9zZShcbiAgUi5tYXAoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5maWx0ZXIoUi5pZGVudGl0eSksXG4gIHJvd3Ncbik7XG5cbmNvbnN0IGl0ZW1zVG9Sb3dzID0gUi5hZGRJbmRleChSLm1hcCkoXG4gIChpdGVtLCBpZHgpID0+IFtpZHgsIC4uLml0ZW1dXG4pO1xuXG5jb25zdCBkaWZmID0gYXN5bmMgKFxuICBub2RlLFxuICB1cGRhdGVkSXRlbXMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW10sXG4gIHsgbWF4U2l6ZSA9IDEwMDAgfSA9IHt9XG4pID0+IHtcbiAgY29uc3QgcmVtb3ZlZCA9IFIuaW5kZXhCeShSLmlkZW50aXR5LCByZW1vdmVJZHMpO1xuICBjb25zdCBieUlkID0ge307XG4gIGNvbnN0IGNoYW5nZXMgPSB7fTtcbiAgY29uc3Qgcm93cyA9IFtdO1xuICBjb25zdCB1cGRhdGVkID0ge307XG4gIGxldCB0b1JlcGxhY2UgPSBbXTtcbiAgbGV0IG1heElkeCA9IDA7XG4gIGxldCBrZXk7XG5cbiAgZm9yIChrZXkgaW4gbm9kZSB8fCB7fSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KGtleSwgMTApO1xuXG4gICAgaWYgKCEocGFyc2VkIHx8IHBhcnNlZCA9PT0gMCkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHJvdyA9IGdldFJvdyhub2RlLCBrZXkpIHx8IFtwYXJzZWQsIG51bGwsIG51bGxdO1xuICAgIGNvbnN0IFtpZHgsIGlkID0gbnVsbCwgcmF3VmFsdWUgPSBudWxsXSA9IHJvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgcm93W1BPU19WQUxdID0gcmF3VmFsdWUgPT09IG51bGwgPyBudWxsIDogcGFyc2VGbG9hdChyYXdWYWx1ZSk7XG4gICAgaWYgKGlkICYmIHJlbW92ZWRbaWRdKSByb3dbUE9TX0lEXSA9IHJvd1tQT1NfVkFMXSA9IG51bGw7XG4gICAgaWYgKGlkKSBieUlkW2lkXSA9IHJvdztcbiAgICBpZiAocm93W1BPU19JRF0pIHtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b1JlcGxhY2UucHVzaChyb3cpO1xuICAgIH1cbiAgICBpZiAoaWR4ID4gbWF4SWR4KSBtYXhJZHggPSBpZHg7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFtpZCwgdmFsdWVdID0gdXBkYXRlZEl0ZW1zW2ldIHx8IFtudWxsLCBudWxsXTtcblxuICAgIGlmICghaWQpIGNvbnRpbnVlO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gYnlJZFtpZF07XG5cbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGlmIChleGlzdGluZ1tQT1NfVkFMXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgZXhpc3RpbmdbUE9TX1ZBTF0gPSB2YWx1ZTtcbiAgICAgICAgdXBkYXRlZFtpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByb3cgPSBbbnVsbCwgaWQsIHZhbHVlXTtcblxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWxsU29ydGVkID0gc29ydFJvd3Mocm93cyk7XG4gIGNvbnN0IHNvcnRlZCA9IG1heFNpemUgPyBhbGxTb3J0ZWQuc2xpY2UoMCwgbWF4U2l6ZSkgOiBhbGxTb3J0ZWQ7XG4gIGNvbnN0IG1pc3NpbmcgPSBtYXhTaXplID8gYWxsU29ydGVkLnNsaWNlKG1heFNpemUsIGFsbFNvcnRlZC5sZW5ndGgpIDogW107XG4gIGNvbnN0IGFkZGVkID0gUi5maWx0ZXIocm93ID0+IHJvd1tQT1NfSURYXSA9PT0gbnVsbCwgc29ydGVkKTtcblxuICB0b1JlcGxhY2UgPSB0b1JlcGxhY2VcbiAgICAuY29uY2F0KFIuZmlsdGVyKHJvdyA9PiByb3dbUE9TX0lEWF0gIT09IG51bGwsIG1pc3NpbmcpKVxuICAgIC5yZXZlcnNlKCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpZCA9IHNvcnRlZFtpXVtQT1NfSURdO1xuICAgIGNvbnN0IGlkeCA9IHNvcnRlZFtpXVtQT1NfSURYXTtcbiAgICBjb25zdCB2YWwgPSBzb3J0ZWRbaV1bUE9TX1ZBTF07XG5cbiAgICBpZiAoaWR4ICE9PSBudWxsICYmIHVwZGF0ZWRbaWRdKSBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtpZCwgdmFsXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIGNvbnN0IGluc2VydGVkID0gW107XG5cbiAgd2hpbGUgKGFkZGVkLmxlbmd0aCkge1xuICAgIGNvbnN0IHJvdyA9IGFkZGVkLnBvcCgpO1xuICAgIGNvbnN0IHJlcGxhY2VkID0gdG9SZXBsYWNlLnBvcCgpO1xuICAgIGxldCBbaWR4XSA9IHJlcGxhY2VkIHx8IFtudWxsXTtcblxuICAgIGlmIChpZHggPT09IG51bGwpIHtcbiAgICAgIGlkeCA9IHBhcnNlSW50KG1heElkeCwgMTApICsgaW5zZXJ0ZWQubGVuZ3RoICsgMTtcbiAgICAgIGluc2VydGVkLnB1c2goaWR4KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VzW2Ake2lkeH1gXSA9IFtyb3dbUE9TX0lEXSwgcm93W1BPU19WQUxdXS5qb2luKFwiLFwiKTtcbiAgfVxuXG4gIHdoaWxlICh0b1JlcGxhY2UubGVuZ3RoKSB7XG4gICAgY29uc3Qgcm93ID0gdG9SZXBsYWNlLnBvcCgpO1xuXG4gICAgaWYgKHJvdyAmJiAhcm93W1BPU19JRF0pIHtcbiAgICAgIGNvbnN0IGlkeCA9IGAke3Jvd1tQT1NfSURYXX1gO1xuXG4gICAgICBpZiAobm9kZVtpZHhdICE9PSBudWxsKSB7XG4gICAgICAgIGNoYW5nZXNbaWR4XSA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibnVsbGluZ1wiLCBpZHgsIG5vZGVbaWR4XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFIua2V5cyhjaGFuZ2VzKS5sZW5ndGggPyBjaGFuZ2VzIDogbnVsbDtcbn07XG5cbmNvbnN0IGNhdGVnb3JpemVEaWZmID0gKGRpZmYsIG9yaWdpbmFsKSA9PiB7XG4gIGNvbnN0IGFsbEtleXMgPSBpdGVtS2V5cyhSLm1lcmdlTGVmdChkaWZmLCBvcmlnaW5hbCkpO1xuICBjb25zdCBhZGRlZCA9IFtdO1xuICBjb25zdCByZW1vdmVkID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gYWxsS2V5c1tpXTtcbiAgICBjb25zdCBbX2RpZmZJZHgsIGRpZmZJZF0gPSBnZXRSb3coZGlmZiwga2V5KSB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGNvbnN0IFtfb3JpZ0lkeCwgb3JpZ0lkXSA9IGdldFJvdyhvcmlnaW5hbCwga2V5KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgaWYgKGRpZmZJZCAhPT0gb3JpZ0lkKSB7XG4gICAgICBpZiAoZGlmZklkKSBhZGRlZC5wdXNoKGRpZmZJZCk7XG4gICAgICBpZiAob3JpZ0lkKSByZW1vdmVkLnB1c2gob3JpZ0lkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2FkZGVkLCByZW1vdmVkXTtcbn07XG5cbmNvbnN0IHVuaW9uUm93cyA9IFIuY29tcG9zZShcbiAgUi51bmlxQnkoUi5wcm9wKFBPU19JRCkpLFxuICBzb3J0Um93cyxcbiAgUi5yZWR1Y2UoUi5jb25jYXQsIFtdKSxcbiAgUi5tYXAocm93cylcbik7XG5cbmNvbnN0IHJvd3NGcm9tU291bHMgPSBxdWVyeSgoc2NvcGUsIHNvdWxzKSA9PlxuICBQcm9taXNlLmFsbChSLm1hcChzY29wZS5nZXQsIHNvdWxzKSkudGhlbih1bmlvblJvd3MpXG4pO1xuXG5jb25zdCByZWFkID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHsgaW5kZXhlciA9IENvbmZpZy5pbmRleGVyIH0gPSBvcHRzIHx8IHt9O1xuXG4gIGNvbnNvbGUubG9nKFwiTGlzdGluZ05vZGUucmVhZFwiLCBwYXRoKTtcblxuICByZXR1cm4gcm93c0Zyb21Tb3VscyhzY29wZSwgW3NvdWxGcm9tUGF0aChpbmRleGVyLCBwYXRoKV0pLnRoZW4ocm93c1RvSWRzKTtcbn0sIFwibGlzdGluZ1Jvd3NcIik7XG5cbmNvbnN0IGdldCA9IHF1ZXJ5KFxuICAoc2NvcGUsIHNvdWwpID0+IChzb3VsID8gc2NvcGUuZ2V0KHNvdWwpIDogcmVzb2x2ZShudWxsKSksXG4gIFwibGlzdGluZ1wiXG4pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ05vZGUgPSB7XG4gIFBPU19JRFgsXG4gIFBPU19JRCxcbiAgUE9TX1ZBTCxcbiAgc291cmNlLFxuICBnZXQsXG4gIGdldFJvdyxcbiAgaXRlbUtleXMsXG4gIHJvd3MsXG4gIGlkcyxcbiAgcm93c1RvSWRzLFxuICByb3dzVG9JdGVtcyxcbiAgaXRlbXNUb1Jvd3MsXG4gIHNvcnRSb3dzLFxuICBzb3J0ZWRJZHMsXG4gIHNvdWxGcm9tUGF0aCxcbiAgcm93c0Zyb21Tb3VscyxcbiAgcmVhZCxcbiAgZGlmZixcbiAgY2F0ZWdvcml6ZURpZmYsXG4gIHVuaW9uUm93c1xufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuL0xpc3RpbmdOb2RlXCI7XG5pbXBvcnQgeyBMaXN0aW5nU29ydCB9IGZyb20gXCIuL0xpc3RpbmdTb3J0XCI7XG5cbmNvbnN0IHVwZGF0ZUxpc3RpbmcgPSBhc3luYyAoXG4gIG9yYyxcbiAgcm91dGUsXG4gIHNjb3BlLFxuICBzcGVjLFxuICBpZHMgPSBbXSxcbiAgcmVtb3ZlSWRzID0gW11cbikgPT4ge1xuICBpZiAoIWlkcy5sZW5ndGggJiYgIXJlbW92ZUlkcy5sZW5ndGgpIHJldHVybjtcbiAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBvcmMubmV3U2NvcGUoKS5nZXQocm91dGUuc291bCk7XG4gIGNvbnN0IHVwZGF0ZWRJdGVtcyA9IGF3YWl0IExpc3RpbmdTb3J0LnRvSXRlbXMoc2NvcGUsIGlkcywgc3BlYyk7XG4gIGNvbnN0IGNoYW5nZXMgPSBMaXN0aW5nTm9kZS5kaWZmKGV4aXN0aW5nLCB1cGRhdGVkSXRlbXMsIHJlbW92ZUlkcyk7XG5cbiAgaWYgKGNoYW5nZXMpIGNvbnNvbGUubG9nKFwiQ0hBTkdFU1wiLCByb3V0ZS5zb3VsLCBjaGFuZ2VzKTtcbiAgaWYgKGNoYW5nZXMpIHJvdXRlLndyaXRlKGNoYW5nZXMpO1xufTtcblxuY29uc3Qgb25QdXQgPSBhc3luYyAob3JjLCByb3V0ZSwgeyB1cGRhdGVkU291bCwgZGlmZiB9KSA9PiB7XG4gIGxldCB1cGRhdGVkSWRzID0gW107XG4gIGNvbnN0IHNvcnQgPSBSLnBhdGhPcihcIm5ld1wiLCBbXCJtYXRjaFwiLCBcInNvcnRcIl0sIHJvdXRlKTtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3QgeyB0aGluZ0lkIH0gPSBTY2hlbWEuVGhpbmdWb3RlQ291bnRzLnJvdXRlLm1hdGNoKHVwZGF0ZWRTb3VsKSB8fCB7fTtcbiAgY29uc3QgaXNTdGlja3kgPSBSLmVxdWFscyhyb3V0ZS5tYXRjaC50aGluZ0lkIHx8IG51bGwpO1xuXG4gIGlmICh0aGluZ0lkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIHVwZGF0ZWRJZHMgPSBSLmNvbmNhdCh1cGRhdGVkSWRzLCBUaGluZ1NldC5pZHMoR3VuTm9kZS5kZWNvZGVTRUEoZGlmZikpKTtcbiAgYXdhaXQgdXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc29ydCwgdXBkYXRlZElkcywgW10sIGlzU3RpY2t5KTtcbiAgZm9yIChjb25zdCBrZXkgaW4gc2NvcGUuZ2V0QWNjZXNzZXMoKSkgb3JjLmxpc3RlbihrZXksIHJvdXRlLnNvdWwpO1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdPcmFjbGUgPSB7XG4gIHVwZGF0ZUxpc3RpbmcsXG4gIG9uUHV0XG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5LCByZXNvbHZlIH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuY29uc3QgY2FsY3VsYXRlUm93cyA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG5cbiAgaWYgKCFzcGVjLmRhdGFTb3VyY2UucXVlcnkpIHJldHVybiByZXNvbHZlKFtdKTtcbiAgcmV0dXJuIHNwZWMuZGF0YVNvdXJjZS5xdWVyeShzY29wZSkudGhlbihpdGVtcyA9PiB7XG4gICAgY29uc3Qgcm93cyA9IExpc3RpbmdOb2RlLml0ZW1zVG9Sb3dzKGl0ZW1zKTtcblxuICAgIHJldHVybiBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCByb3dzLCB7IC4uLm9wdHMsIGZpbHRlckZuIH0pO1xuICB9KTtcbn0pO1xuXG5jb25zdCBjYWxjdWxhdGUgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMgPSB7fSkgPT4ge30pO1xuXG5jb25zdCB0b05vZGUgPSBxdWVyeSgoc2NvcGUsIHNwZWMsIG9wdHMpID0+XG4gIGNhbGN1bGF0ZVJvd3Moc2NvcGUsIHNwZWMsIG9wdHMpLnRoZW4oTGlzdGluZ05vZGUuc2VyaWFsaXplKHNwZWMpKVxuKTtcblxuY29uc3QgcmVhZCA9IHF1ZXJ5KChzY29wZSwgc3BlYywgb3B0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbHRlckZuID0gTGlzdGluZ0ZpbHRlci50aGluZ0ZpbHRlcihzY29wZSwgc3BlYyk7XG4gIGNvbnN0IHBhdGhzID0gUi5wYXRoT3IoW10sIFtcImRhdGFTb3VyY2VcIiwgXCJsaXN0aW5nUGF0aHNcIl0sIHNwZWMpO1xuICBjb25zdCBzb3VscyA9IFIubWFwKFxuICAgIExpc3RpbmdOb2RlLnNvdWxGcm9tUGF0aChvcHRzLmluZGV4ZXIgfHwgc3BlYy5pbmRleGVyKSxcbiAgICBwYXRoc1xuICApO1xuXG4gIHJldHVybiBMaXN0aW5nTm9kZS5yb3dzRnJvbVNvdWxzKHNjb3BlLCBzb3VscykudGhlbihyb3dzID0+XG4gICAgTGlzdGluZ0ZpbHRlci5nZXRGaWx0ZXJlZElkcyhzY29wZSwgcm93cywgeyAuLi5vcHRzLCBmaWx0ZXJGbiB9KVxuICApO1xufSk7XG5cbmNvbnN0IGZyb21TcGVjID0gcXVlcnkoKHNjb3BlLCBzcGVjLCBvcHRzID0ge30pID0+XG4gIChvcHRzLmNhbGN1bGF0ZSA/IGNhbGN1bGF0ZSA6IHJlYWQpKHNjb3BlLCBzcGVjLCBvcHRzKVxuKTtcblxuY29uc3QgZnJvbVBhdGggPSBxdWVyeSgoc2NvcGUsIHBhdGgsIG9wdHMpID0+IHtcbiAgY29uc3QgdHlwZSA9IExpc3RpbmdUeXBlLmZyb21QYXRoKHBhdGgpO1xuXG4gIGlmICghdHlwZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gIHJldHVybiB0eXBlLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpLnRoZW4oc3BlYyA9PiB7XG4gICAgaWYgKHNwZWMuaGFzSW5kZXhlciAmJiAhb3B0cy5jYWxjdWxhdGUpIHtcbiAgICAgIGlmICghdHlwZSB8fCAhdHlwZS5yZWFkKSByZXR1cm4gTGlzdGluZ05vZGUucmVhZChzY29wZSwgcGF0aCwgb3B0cyk7XG4gICAgICByZXR1cm4gdHlwZS5yZWFkKHNjb3BlLCB0eXBlLm1hdGNoLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyb21TcGVjKHNjb3BlLCBzcGVjLCBvcHRzKTtcbiAgfSk7XG59KTtcblxuY29uc3Qgc2lkZWJhckZyb21QYXRoID0gcXVlcnkoKHNjb3BlLCBwYXRoLCBvcHRzKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBMaXN0aW5nVHlwZS5mcm9tUGF0aChwYXRoKTtcblxuICBpZiAoIXR5cGUgfHwgIXR5cGUuZ2V0U2lkZWJhcikgcmV0dXJuIHJlc29sdmUoXCJcIik7XG4gIHJldHVybiB0eXBlLmdldFNpZGViYXIoc2NvcGUsIHR5cGUubWF0Y2gpO1xufSk7XG5cbmNvbnN0IG5vZGVGcm9tUGF0aCA9IHF1ZXJ5KChzY29wZSwgcGF0aCwgb3B0cykgPT4ge1xuICBjb25zdCB0eXBlID0gTGlzdGluZ1R5cGUuZnJvbVBhdGgocGF0aCk7XG5cbiAgaWYgKCF0eXBlKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gIHJldHVybiB0eXBlXG4gICAgLmdldFNwZWMoc2NvcGUsIHR5cGUubWF0Y2gpXG4gICAgLnRoZW4oc3BlYyA9PiB0b05vZGUoc2NvcGUsIHNwZWMsIG9wdHMpKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1F1ZXJ5ID0ge1xuICBmcm9tU3BlYyxcbiAgZnJvbVBhdGgsXG4gIHNpZGViYXJGcm9tUGF0aCxcbiAgY2FsY3VsYXRlUm93cyxcbiAgdG9Ob2RlLFxuICBub2RlRnJvbVBhdGhcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCwgcmVzb2x2ZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uL1RoaW5nXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuXG5jb25zdCBbUE9TX0lELCBQT1NfVkFMXSA9IFswLCAxXTtcbmNvbnN0IHRvSWRzID0gUi5tYXAoUi5wcm9wKFBPU19JRCkpO1xuY29uc3Qgc29ydEl0ZW1zID0gUi5zb3J0V2l0aChSLnByb3AoUE9TX1ZBTCkpO1xuXG5jb25zdCB2b3RlU29ydCA9IGZuID0+IHF1ZXJ5KChzY29wZSwgdGhpbmdJZCwgc3BlYykgPT4ge1xuICBpZiAoc3BlYy5pc0lkU3RpY2t5KHRoaW5nSWQpKSByZXR1cm4gcmVzb2x2ZSgtSW5maW5pdHkpO1xuICBpZiAoUi5jb250YWlucyh0aGluZ0lkLCBzcGVjLmZpbHRlcnMuYWxsb3cub3BzKSkgcmV0dXJuIHJlc29sdmUoLUluZmluaXR5KTtcblxuICByZXR1cm4gUXVlcnkudGhpbmdNZXRhKHNjb3BlLCB7XG4gICAgdGFidWxhdG9yOiBzcGVjLnRhYnVsYXRvcixcbiAgICBzY29yZXM6IHRydWUsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihyZXMgPT4gZm4ocmVzLCBzcGVjKSk7XG59KTtcblxuY29uc3QgdGltZVNvcnQgPSBmbiA9PiBxdWVyeSgoc2NvcGUsIHRoaW5nSWQsIHNwZWMpID0+XG4gIFF1ZXJ5LnRoaW5nTWV0YShzY29wZSwge1xuICAgIHRhYnVsYXRvcjogc3BlYy50YWJ1bGF0b3IsXG4gICAgdGhpbmdTb3VsOiBTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSlcbiAgfSkudGhlbihmbilcbik7XG5cbmNvbnN0IHNvcnRzID0ge1xuICBuZXc6IHRpbWVTb3J0KFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubXVsdGlwbHkoLTEpLFxuICAgICAgdmFsID0+IHZhbCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIFIucHJvcChcInRpbWVzdGFtcFwiKVxuICAgIClcbiAgKSxcbiAgb2xkOiB0aW1lU29ydChSLnByb3AoXCJ0aW1lc3RhbXBcIikpLFxuICBhY3RpdmU6IHZvdGVTb3J0KFxuICAgICh7IHRpbWVzdGFtcCwgbGFzdEFjdGl2ZSB9KSA9PiAtMSAqIChsYXN0QWN0aXZlIHx8IHRpbWVzdGFtcClcbiAgKSxcbiAgdG9wOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VJbnQoeCwgMTApLFxuICAgICAgUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSlcbiAgICApXG4gICksXG4gIGNvbW1lbnRzOiB2b3RlU29ydChcbiAgICBSLmNvbXBvc2UoXG4gICAgICB4ID0+IC0xICogcGFyc2VGbG9hdCh4LCAxMCksXG4gICAgICBSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcImNvbW1lbnRcIl0pXG4gICAgKVxuICApLFxuICBkaXNjdXNzZWQ6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJjb21tZW50XCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGltZXN0YW1wIC8gMTAwMCAtIDExMzQwMjgwMDM7XG4gICAgY29uc3Qgb3JkZXIgPSBNYXRoLmxvZzEwKE1hdGgubWF4KE1hdGguYWJzKHNjb3JlKSwgMSkpO1xuXG4gICAgaWYgKCFzY29yZSkgcmV0dXJuIDEwMDAwMDAwMDAgLSBzZWNvbmRzO1xuICAgIHJldHVybiAtMSAqIChvcmRlciArIHNlY29uZHMgLyA0NTAwMCk7XG4gIH0pLFxuICBob3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBSLnByb3AoXCJ0aW1lc3RhbXBcIiwgdGhpbmcpO1xuICAgIGNvbnN0IHNjb3JlID0gcGFyc2VJbnQoUi5wYXRoT3IoMCwgW1widm90ZXNcIiwgXCJzY29yZVwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVzdGFtcCAvIDEwMDAgLSAxMTM0MDI4MDAzO1xuICAgIGNvbnN0IG9yZGVyID0gTWF0aC5sb2cxMChNYXRoLm1heChNYXRoLmFicyhzY29yZSksIDEpKTtcbiAgICBsZXQgc2lnbiA9IDA7XG5cbiAgICBpZiAoc2NvcmUgPiAwKSB7XG4gICAgICBzaWduID0gMTtcbiAgICB9IGVsc2UgaWYgKHNjb3JlIDwgMCkge1xuICAgICAgc2lnbiA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gLTEgKiAoc2lnbiAqIG9yZGVyICsgc2Vjb25kcyAvIDQ1MDAwKTtcbiAgfSksXG4gIGJlc3Q6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG4gICAgY29uc3QgbiA9IHVwcyArIGRvd25zO1xuXG4gICAgaWYgKG4gPT09IDApIHJldHVybiAwO1xuICAgIGNvbnN0IHogPSAxLjI4MTU1MTU2NTU0NTsgLy8gODAlIGNvbmZpZGVuY2VcbiAgICBjb25zdCBwID0gdXBzIC8gbjtcbiAgICBjb25zdCBsZWZ0ID0gcCArICgxIC8gKDIgKiBuKSkgKiB6ICogejtcbiAgICBjb25zdCByaWdodCA9IHogKiBNYXRoLnNxcnQoKHAgKiAoMSAtIHApKSAvIG4gKyAoeiAqIHopIC8gKDQgKiBuICogbikpO1xuICAgIGNvbnN0IHVuZGVyID0gMSArICgxIC8gbikgKiB6ICogejtcblxuICAgIHJldHVybiAtMSAqICgobGVmdCAtIHJpZ2h0KSAvIHVuZGVyKTtcbiAgfSksXG4gIGNvbnRyb3ZlcnNpYWw6IHZvdGVTb3J0KHRoaW5nID0+IHtcbiAgICBjb25zdCB1cHMgPSBwYXJzZUludChSLnBhdGhPcigwLCBbXCJ2b3Rlc1wiLCBcInVwXCJdLCB0aGluZyksIDEwKTtcbiAgICBjb25zdCBkb3ducyA9IHBhcnNlSW50KFIucGF0aE9yKDAsIFtcInZvdGVzXCIsIFwiZG93blwiXSwgdGhpbmcpLCAxMCk7XG5cbiAgICBpZiAodXBzIDw9IDAgfHwgZG93bnMgPD0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbWFnbml0dWRlID0gdXBzICsgZG93bnM7XG4gICAgY29uc3QgYmFsYW5jZSA9IHVwcyA+IGRvd25zID8gZG93bnMgLyB1cHMgOiB1cHMgLyBkb3ducztcblxuICAgIHJldHVybiAtMSAqIG1hZ25pdHVkZSAqKiBiYWxhbmNlO1xuICB9KVxufTtcblxuY29uc3QgaXNWYWxpZFNvcnQgPSBzb3J0ID0+ICEhc29ydHNbc29ydF07XG5cbmNvbnN0IHRvSXRlbSA9IHF1ZXJ5KFxuICAoc2NvcGUsIGlkLCBzcGVjKSA9PlxuICAgIChzb3J0c1tzcGVjLnNvcnRdIHx8IHNvcnRzLm5ldykoaWQsIHNwZWMpLnRoZW4odmFsID0+IFtpZCwgdmFsXSlcbik7XG5cbmNvbnN0IHRvSXRlbXMgPSBxdWVyeShcbiAgKHNjb3BlLCBpZHMsIHNwZWMpID0+IGFsbChSLm1hcChcbiAgICBpZCA9PiB0b0l0ZW0oc2NvcGUsIGlkLCBzcGVjKSxcbiAgICBpZHNcbiAgKSlcbik7XG5cbmNvbnN0IGZyb21UaGluZ1NldHMgPSBxdWVyeShcbiAgKHNjb3BlLCBzb3Vscywgc3BlYykgPT5cbiAgICBhbGwoUi5tYXAoc2NvcGUuZ2V0LCBzb3VscykpXG4gICAgICAudGhlbihSLnBpcGUoXG4gICAgICAgIFRoaW5nU2V0LnVuaW9uLFxuICAgICAgICBUaGluZ1NldC5pZHMsXG4gICAgICAgIGlkcyA9PiB0b0l0ZW1zKHNjb3BlLCBpZHMsIHNwZWMpXG4gICAgICApKVxuICAgICAgLnRoZW4oc29ydEl0ZW1zKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTb3J0ID0ge1xuICBQT1NfSUQsXG4gIFBPU19WQUwsXG4gIHNvcnRzLFxuICBpc1ZhbGlkU29ydCxcbiAgdG9JdGVtLFxuICB0b0l0ZW1zLFxuICB0b0lkcyxcbiAgc29ydEl0ZW1zLFxuICBmcm9tVGhpbmdTZXRzXG59O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vUXVlcnlcIjtcbmltcG9ydCB7IFRoaW5nRGF0YU5vZGUgfSBmcm9tIFwiLi4vVGhpbmdcIjtcbmltcG9ydCB7IExpc3RpbmdEZWZpbml0aW9uIH0gZnJvbSBcIi4vTGlzdGluZ0RlZmluaXRpb25cIjtcbmltcG9ydCB7IExpc3RpbmdEYXRhU291cmNlIH0gZnJvbSBcIi4vTGlzdGluZ0RhdGFTb3VyY2VcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi9MaXN0aW5nRmlsdGVyXCI7XG5cbmNvbnN0IGZyb21Tb3VyY2UgPSBSLmNvbXBvc2UoXG4gIFIuYXBwbHkoUi5tZXJnZUxlZnQpLFxuICBSLmFwKFtMaXN0aW5nRmlsdGVyLmZyb21EZWZpbml0aW9uLCBSLmlkZW50aXR5XSksXG4gIFIub2YsXG4gIFIuYXBwbHkoUi5hc3NvYyhcImRhdGFTb3VyY2VcIikpLFxuICBSLmFwKFtMaXN0aW5nRGF0YVNvdXJjZS5mcm9tRGVmaW5pdGlvbiwgUi5pZGVudGl0eV0pLFxuICBSLm9mLFxuICBMaXN0aW5nRGVmaW5pdGlvbi5mcm9tU291cmNlXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSA9IFwiXCIpID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBhdXRob3JJZCwgbmFtZSlcbiAgICAudGhlbihSLmNvbXBvc2UoXG4gICAgICBib2R5ID0+IGAke2JvZHl9XG4jIGFkZGVkIGJ5IGluZGV4ZXJcbiR7ZXh0cmEgfHwgXCJcIn1cbnNvdXJjZWQgZnJvbSBwYWdlICR7YXV0aG9ySWR9ICR7bmFtZX1cbmAsXG4gICAgICBUaGluZ0RhdGFOb2RlLmJvZHlcbiAgICApKVxuKTtcblxuZXhwb3J0IGNvbnN0IExpc3RpbmdTcGVjID0geyBmcm9tU291cmNlLCBnZXRTb3VyY2UgfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcblxuY29uc3QgcGF0aCA9IFwiL3QvOnRvcGljL2NoYXRcIjtcbmNvbnN0IHRhYnMgPSBUb3BpY0xpc3RpbmcudGFicztcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzpjaGF0OnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9XG4gICAgdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCBgY2hhdDoke3RvcGljfWBdLFxuICAgIFtdXG4gICk7XG5cbiAgcmV0dXJuIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y2hhdFwiLFxuICAgIFtcbiAgICAgIFwic29ydCBuZXdcIixcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICB0b3BpYy5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBcImtpbmQgc3VibWlzc2lvblwiIDogXCJcIixcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENoYXRMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTaWRlYmFyLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG5cbiIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydFwiO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6Y29tbWVudHM6c2lkZWJhclwiKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgeyB0aGluZ0lkLCBzb3J0IH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6Y29tbWVudHNcIixcbiAgICBbYG9wICR7dGhpbmdJZH1gLCBgc29ydCAke3NvcnR9YF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIGdldFNpZGViYXIsIGdldFNwZWMgfSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9jb21tZW50ZWQvOnNvcnRcIjtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmNvbW1lbnRlZDpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpjb21tZW50ZWRcIixcbiAgICBbXG4gICAgICBgY3VyYXRvciAke2F1dGhvcklkfWAsXG4gICAgICBgc29ydCAke3NvcnR9YFxuICAgIF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnRlZExpc3RpbmcgPSBQYXRoLndpdGhSb3V0ZSh7IHBhdGgsIGdldFNpZGViYXIsIGdldFNvdXJjZSwgZ2V0U3BlYyB9KTtcblxuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL2RvbWFpbi86ZG9tYWluLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmRvbWFpbjpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgZG9tYWluLCBzb3J0IH0pID0+IHtcbiAgY29uc3QgZG9tYWlucyA9IFBhdGguc3BsaXRUb3BpY3MoZG9tYWluKTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpkb21haW5cIixcbiAgICBbXG4gICAgICBgbmFtZSAke2RvbWFpbnNbMF19YCxcbiAgICAgIFwic3VibWl0IHRvIHdoYXRldmVyXCIsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIFwia2luZCBzdWJtaXNzaW9uXCIsXG4gICAgICAuLi5SLm1hcChkb21haW4gPT4gYGRvbWFpbiAke2RvbWFpbn1gLCBkb21haW5zKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvZG9tYWluLyR7ZG9tYWlufS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRG9tYWluTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHsgcGF0aCwgdGFicywgZ2V0U2lkZWJhciwgZ2V0U291cmNlLCBnZXRTcGVjIH0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IFRvcGljTGlzdGluZyB9IGZyb20gXCIuL1RvcGljTGlzdGluZ1wiO1xuXG5jb25zdCBwYXRoID0gXCIvdC86dG9waWMvZmlyZWhvc2VcIjtcbmNvbnN0IHRhYnMgPSBUb3BpY0xpc3RpbmcudGFicztcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOmZpcmVob3NlOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IG5vcm1hbFRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9XG4gICAgdG9waWMgPT09IFwiYWxsXCIgPyBcIndoYXRldmVyXCIgOiBub3JtYWxUb3BpY3NbMF0gfHwgXCJ3aGF0ZXZlclwiO1xuICBjb25zdCB0b3BpY3MgPSBub3JtYWxUb3BpY3MucmVkdWNlKFxuICAgIChyZXMsIHRvcGljKSA9PiBbLi4ucmVzLCB0b3BpYywgYGNoYXQ6JHt0b3BpY31gLCBgY29tbWVudHM6JHt0b3BpY31gXSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBMaXN0aW5nU3BlYy5nZXRTb3VyY2UoXG4gICAgc2NvcGUsXG4gICAgQ29uZmlnLmluZGV4ZXIsXG4gICAgXCJsaXN0aW5nOmZpcmVob3NlXCIsXG4gICAgW1xuICAgICAgXCJzb3J0IG5ld1wiLFxuICAgICAgYHN1Ym1pdCB0byAke3N1Ym1pdFRvfWAsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIHRvcGljLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IFwia2luZCBzdWJtaXNzaW9uXCIgOiBcIlwiLFxuICAgICAgLi4uUi5tYXAodG9waWMgPT4gYHRvcGljICR7dG9waWN9YCwgdG9waWNzKSxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdC8ke3RvcGljfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApO1xufSk7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5leHBvcnQgY29uc3QgRmlyZWhvc2VMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyB0YWJzLCBwYXRoLCBnZXRTaWRlYmFyLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG4iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBHdW5Ob2RlIH0gZnJvbSBcIi4uLy4uL0d1bk5vZGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IFRoaW5nU2V0IH0gZnJvbSBcIi4uLy4uL1RoaW5nXCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5pbXBvcnQgeyBMaXN0aW5nTm9kZSB9IGZyb20gXCIuLi9MaXN0aW5nTm9kZVwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9yZXBsaWVkLzp0eXBlLzpzb3J0XCI7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeShzY29wZSA9PlxuICBRdWVyeS53aWtpUGFnZShzY29wZSwgQ29uZmlnLmluZGV4ZXIsIFwibGlzdGluZzp0b3BpYzpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgPSBcIm5ld1wiIH0pID0+XG4gIExpc3RpbmdTcGVjLmdldFNvdXJjZShcbiAgICBzY29wZSxcbiAgICBDb25maWcuaW5kZXhlcixcbiAgICBcImxpc3Rpbmc6aW5ib3hcIixcbiAgICBbYHJlcGxpZXMgdG8gYXV0aG9yICR7YXV0aG9ySWR9YCwgYHR5cGUgJHt0eXBlfWAsIGBzb3J0ICR7c29ydH1gXS5qb2luKFwiXFxuXCIpXG4gIClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIG1hdGNoKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIG1hdGNoKS50aGVuKExpc3RpbmdTcGVjLmZyb21Tb3VyY2UpXG4pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiB9XG4pID0+IHtcbiAgY29uc3Qgc2NvcGUgPSBvcmMubmV3U2NvcGUoKTtcbiAgY29uc3QgZGlmZkRhdGEgPSBHdW5Ob2RlLmRlY29kZVNFQShkaWZmKTtcbiAgY29uc3QgW3VwZGF0ZWRBdXRob3JlZF0gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihkaWZmRGF0YSk7XG4gIGNvbnN0IHNwZWMgPSBhd2FpdCBnZXRTcGVjKHNjb3BlLCByb3V0ZS5tYXRjaCk7XG4gIGxldCB1cGRhdGVkSWRzID0gVGhpbmdTZXQuaWRzKGRpZmZEYXRhKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRBdXRob3JlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wSWQgPSB1cGRhdGVkQXV0aG9yZWRbaV07XG4gICAgY29uc3QgcmVwbHlJZHMgPSBUaGluZ1NldC5pZHMoXG4gICAgICBhd2FpdCBzY29wZS5nZXQoU2NoZW1hLlRoaW5nQ29tbWVudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IG9wSWQgfSkpLnRoZW4oKVxuICAgICk7XG5cbiAgICB1cGRhdGVkSWRzID0gdXBkYXRlZElkcy5jb25jYXQocmVwbHlJZHMpO1xuICB9XG5cbiAgaWYgKHVwZGF0ZWRJZHMubGVuZ3RoKVxuICAgIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhvcmMsIHJvdXRlLCBzY29wZSwgc3BlYywgdXBkYXRlZElkcywgW10pO1xuICBmb3IgKGNvbnN0IGtleSBpbiBzY29wZS5nZXRBY2Nlc3NlcygpKSBvcmMubGlzdGVuKGtleSwgcm91dGUuc291bCk7XG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCBnZXRTaWRlYmFyLCBnZXRTb3VyY2UsIGdldFNwZWMsIG9uUHV0IH0pO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcImd1bi1zY29wZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi4vTGlzdGluZ1NwZWNcIjtcblxuY29uc3QgcGF0aCA9IFwiL3VzZXIvOmF1dGhvcklkLzp0eXBlLzpzb3J0XCI7XG5jb25zdCB0YWJzID0gW1wib3ZlcnZpZXdcIiwgXCJjb21tZW50c1wiLCBcInN1Ym1pdHRlZFwiLCBcImNvbW1hbmRzXCJdO1xuXG5jb25zdCBnZXRTaWRlYmFyID0gcXVlcnkoc2NvcGUgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIENvbmZpZy5pbmRleGVyLCBcImxpc3Rpbmc6cHJvZmlsZTpzaWRlYmFyXCIpXG4pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIHR5cGUsIHNvcnQgfSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzpwcm9maWxlXCIsXG4gICAgW1xuICAgICAgYGF1dGhvciAke2F1dGhvcklkfWAsXG4gICAgICBgdHlwZSAke3R5cGV9YCxcbiAgICAgIFwic3VibWl0IHRvIHdoYXRldmVyXCIsXG4gICAgICBgc29ydCAke3NvcnR9YCxcbiAgICAgIC4uLlIubWFwKHRhYiA9PiBgdGFiICR7dGFifSAvdXNlci8ke2F1dGhvcklkfS8ke3RhYn1gLCB0YWJzKVxuICAgIF0uam9pbihcIlxcblwiKVxuICApXG4pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IFByb2ZpbGVMaXN0aW5nID0gUGF0aC53aXRoUm91dGUoeyBwYXRoLCB0YWJzLCBnZXRTaWRlYmFyLCBnZXRTb3VyY2UsIGdldFNwZWMgfSk7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgYWxsLCBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vLi4vR3VuTm9kZVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi4vLi4vUXVlcnlcIjtcbmltcG9ydCB7IFBhdGggfSBmcm9tIFwiLi4vUGF0aFwiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdGaWx0ZXIgfSBmcm9tIFwiLi4vTGlzdGluZ0ZpbHRlclwiO1xuaW1wb3J0IHsgTGlzdGluZ09yYWNsZSB9IGZyb20gXCIuLi9MaXN0aW5nT3JhY2xlXCI7XG5pbXBvcnQgeyBTcGFjZVNwZWMgfSBmcm9tIFwiLi4vU3BhY2VTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi91c2VyLzphdXRob3JJZC9zcGFjZXMvOm5hbWUvOnNvcnRcIjtcblxuY29uc3QgZ2V0U291cmNlID0gcXVlcnkoKHNjb3BlLCB7IGF1dGhvcklkLCBuYW1lLCBzb3J0IH0pID0+XG4gIFNwYWNlU3BlYy5nZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNwZWMgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgU3BhY2VTcGVjLmdldFNwZWMoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBgc29ydCAke3NvcnR9YClcbik7XG5cbmNvbnN0IGdldFNpZGViYXIgPSBxdWVyeSgoc2NvcGUsIHsgYXV0aG9ySWQsIG5hbWUsIHNvcnQgfSkgPT5cbiAgUXVlcnkud2lraVBhZ2Uoc2NvcGUsIGF1dGhvcklkLCBTcGFjZVNwZWMuc2lkZWJhclBhZ2VOYW1lKG5hbWUpKSk7XG5cbmNvbnN0IGNhbGN1bGF0ZSA9IHF1ZXJ5KChzY29wZSwgbWF0Y2gsIG9wdHMpID0+IHtcbiAgY29uc3QgeyBhdXRob3JJZCwgbmFtZSwgc29ydCB9ID0gbWF0Y2g7XG4gIGNvbnN0IHJvdXRlUHJvcHMgPSB7IGF1dGhvcklkLCBuYW1lLCBzb3J0LCBpbmRleGVyOiBDb25maWcuaW5kZXhlciB9O1xuICBjb25zdCBzb3VscyA9IFtTY2hlbWEuU3BhY2VMaXN0aW5nLnJvdXRlLnJldmVyc2Uocm91dGVQcm9wcyldO1xuXG4gIHJldHVybiBhbGwoW1xuICAgIGdldFNwZWMoc2NvcGUsIG1hdGNoKSxcbiAgICBMaXN0aW5nTm9kZS5nZXRSb3dzRnJvbVNvdWxzKHNjb3BlLCBzb3VscylcbiAgXSkudGhlbigoW3NwZWMsIHJvd3NdKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyRm4gPSBMaXN0aW5nRmlsdGVyLnRoaW5nRmlsdGVyKHNjb3BlLCBzcGVjKTtcblxuICAgIHJldHVybiBMaXN0aW5nRmlsdGVyLmdldEZpbHRlcmVkSWRzKHNjb3BlLCByb3dzLCB7IC4uLm9wdHMsIGZpbHRlckZuIH0pO1xuICB9KTtcbn0pO1xuXG5jb25zdCBvblB1dCA9IGFzeW5jIChcbiAgb3JjLFxuICByb3V0ZSxcbiAgeyB1cGRhdGVkU291bCwgZGlmZiwgb3JpZ2luYWwsIGxhdGVzdCA9IDAgfVxuKSA9PiB7XG4gIGNvbnN0IHNjb3BlID0gb3JjLm5ld1Njb3BlKCk7XG5cbiAgY29uc3Qgb3JpZ2luYWxEYXRhID0gR3VuTm9kZS5kZWNvZGVTRUEob3JpZ2luYWwpO1xuICBjb25zdCBkaWZmRGF0YSA9IEd1bk5vZGUuZGVjb2RlU0VBKGRpZmYpO1xuICBjb25zdCBbdXBkYXRlZElkcywgcmVtb3ZlZElkc10gPSBMaXN0aW5nTm9kZS5jYXRlZ29yaXplRGlmZihcbiAgICBkaWZmRGF0YSxcbiAgICBvcmlnaW5hbERhdGFcbiAgKTtcbiAgY29uc3Qgc3BlYyA9IGF3YWl0IGdldFNwZWMoc2NvcGUsIHJvdXRlLm1hdGNoKTtcbiAgY29uc3Qgdm90ZUNvdW50c01hdGNoID0gU2NoZW1hLlRoaW5nVm90ZUNvdW50cy5yb3V0ZS5tYXRjaCh1cGRhdGVkU291bCk7XG4gIGNvbnN0IHRoaW5nTWF0Y2ggPSBTY2hlbWEuVGhpbmcucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUubWF0Y2godXBkYXRlZFNvdWwpIHx8IHt9O1xuICBjb25zdCBhdXRob3JNYXRjaCA9IFNjaGVtYS5TRUFBdXRob3Iucm91dGUubWF0Y2godXBkYXRlZFNvdWwpO1xuXG4gIGlmICh2b3RlQ291bnRzTWF0Y2gpIHVwZGF0ZWRJZHMucHVzaCh2b3RlQ291bnRzTWF0Y2gudGhpbmdJZCk7XG4gIGlmICh0aGluZ01hdGNoKSB1cGRhdGVkSWRzLnB1c2godGhpbmdNYXRjaC50aGluZ0lkKTtcbiAgaWYgKHRoaW5nSWQgJiYgdGhpbmdJZCAhPT0gc3BlYy5mcm9tUGFnZUlkKSB1cGRhdGVkSWRzLnB1c2godGhpbmdJZCk7XG4gIGF3YWl0IExpc3RpbmdPcmFjbGUudXBkYXRlTGlzdGluZyhcbiAgICBvcmMsXG4gICAgcm91dGUsXG4gICAgc2NvcGUsXG4gICAgc3BlYyxcbiAgICB1cGRhdGVkSWRzLFxuICAgIHJlbW92ZWRJZHMsXG4gICk7XG4gIGZvciAoY29uc3Qga2V5IGluIHNjb3BlLmdldEFjY2Vzc2VzKCkpIG9yYy5saXN0ZW4oa2V5LCByb3V0ZS5zb3VsKTtcbiAgaWYgKFxuICAgIFIucHJvcChcInNpemVcIiwgb3JpZ2luYWwpIHx8XG4gICAgdXBkYXRlZElkcy5sZW5ndGggfHxcbiAgICByZW1vdmVkSWRzLmxlbmd0aCB8fFxuICAgIGF1dGhvck1hdGNoXG4gIClcbiAgICByZXR1cm47XG5cbiAgLy8gYmFzZSBsb2dpYyBmcm9tIGd1bi1jbGVyaWMtc2NvcGUgbmVlZHMgdG8gYmUgZW5jYXBzdWFsdGVkIGJldHRlcj9cbiAgY29uc29sZS5sb2coXCItLS1TVEFOREFSRCBTUEFDRSBVUERBVEUtLS1cIiwgcm91dGUuc291bCwgdXBkYXRlZFNvdWwpO1xuICBjb25zdCBub2RlID0gYXdhaXQgb3JjLm5ld1Njb3BlKCkuZ2V0KHJvdXRlLnNvdWwpO1xuICBjb25zdCBleGlzdGluZ0tleXMgPSBMaXN0aW5nTm9kZS5pdGVtS2V5cyhub2RlKTtcblxuICBpZiAoZXhpc3RpbmdLZXlzLmxlbmd0aCkge1xuICAgIHJvdXRlLndyaXRlKHtcbiAgICAgIHNpemU6IDAsXG4gICAgICAuLi5leGlzdGluZ0tleXMucmVkdWNlKChkaWZmLCBrZXkpID0+IHtcbiAgICAgICAgZGlmZltgJHtrZXl9YF0gPSBudWxsO1xuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgIH0sIHt9KVxuICAgIH0pO1xuICB9XG5cbiAgb3JjLndvcmsoe1xuICAgIGlkOiBgdXBkYXRlOiR7cm91dGUuc291bH1gLFxuICAgIHNvdWw6IHJvdXRlLnNvdWwsXG4gICAgbWV0aG9kOiBcImRvVXBkYXRlXCIsXG4gICAgcHJpb3JpdHk6IHJvdXRlLnByaW9yaXR5IHx8IDUwXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IFNwYWNlTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgY2FsY3VsYXRlLFxuICBnZXRTb3VyY2UsXG4gIGdldFNpZGViYXIsXG4gIGdldFNwZWMsXG4gIG9uUHV0XG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIi4uLy4uL1F1ZXJ5XCI7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL1BhdGhcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4uL0xpc3RpbmdTcGVjXCI7XG5cbmNvbnN0IHBhdGggPSBcIi90Lzp0b3BpYy86c29ydFwiO1xuY29uc3QgdGFicyA9IFtcImhvdFwiLCBcIm5ld1wiLCBcImRpc2N1c3NlZFwiLCBcImNvbnRyb3ZlcnNpYWxcIiwgXCJ0b3BcIiwgXCJmaXJlaG9zZVwiXTtcblxuY29uc3QgZ2V0U2lkZWJhciA9IHF1ZXJ5KHNjb3BlID0+XG4gIFF1ZXJ5Lndpa2lQYWdlKHNjb3BlLCBDb25maWcuaW5kZXhlciwgXCJsaXN0aW5nOnRvcGljOnNpZGViYXJcIilcbik7XG5cbmNvbnN0IGdldFNvdXJjZSA9IHF1ZXJ5KChzY29wZSwgeyB0b3BpYywgc29ydCB9KSA9PiB7XG4gIGNvbnN0IHRvcGljcyA9IFBhdGguc3BsaXRUb3BpY3ModG9waWMpO1xuICBjb25zdCBzdWJtaXRUbyA9IHRvcGljc1swXSA9PT0gXCJhbGxcIiA/IFwid2hhdGV2ZXJcIiA6IHRvcGljc1swXTtcblxuICByZXR1cm4gTGlzdGluZ1NwZWMuZ2V0U291cmNlKFxuICAgIHNjb3BlLFxuICAgIENvbmZpZy5pbmRleGVyLFxuICAgIFwibGlzdGluZzp0b3BpY1wiLFxuICAgIFtcbiAgICAgIGBuYW1lICR7dG9waWN9YCxcbiAgICAgIGBzdWJtaXQgdG8gJHtzdWJtaXRUb31gLFxuICAgICAgYHNvcnQgJHtzb3J0fWAsXG4gICAgICB0b3BpYy5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBcImtpbmQgc3VibWlzc2lvblwiIDogXCJcIixcbiAgICAgIC4uLlIubWFwKHRvcGljID0+IGB0b3BpYyAke3RvcGljfWAsIHRvcGljcyksXG4gICAgICAuLi5SLm1hcCh0YWIgPT4gYHRhYiAke3RhYn0gL3QvJHt0b3BpY30vJHt0YWJ9YCwgdGFicylcbiAgICBdLmpvaW4oXCJcXG5cIilcbiAgKTtcbn0pO1xuXG5jb25zdCBnZXRTcGVjID0gcXVlcnkoKHNjb3BlLCBtYXRjaCkgPT5cbiAgZ2V0U291cmNlKHNjb3BlLCBtYXRjaCkudGhlbihMaXN0aW5nU3BlYy5mcm9tU291cmNlKVxuKTtcblxuZXhwb3J0IGNvbnN0IFRvcGljTGlzdGluZyA9IFBhdGgud2l0aFJvdXRlKHtcbiAgcGF0aCxcbiAgZ2V0U2lkZWJhcixcbiAgZ2V0U291cmNlLFxuICBnZXRTcGVjXG59KTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBDaGF0TGlzdGluZyB9IGZyb20gXCIuL0NoYXRMaXN0aW5nXCI7XG5pbXBvcnQgeyBGaXJlaG9zZUxpc3RpbmcgfSBmcm9tIFwiLi9GaXJlaG9zZUxpc3RpbmdcIjtcbmltcG9ydCB7IENvbW1lbnRlZExpc3RpbmcgfSBmcm9tIFwiLi9Db21tZW50ZWRMaXN0aW5nXCI7XG5pbXBvcnQgeyBUb3BpY0xpc3RpbmcgfSBmcm9tIFwiLi9Ub3BpY0xpc3RpbmdcIjtcbmltcG9ydCB7IERvbWFpbkxpc3RpbmcgfSBmcm9tIFwiLi9Eb21haW5MaXN0aW5nXCI7XG5pbXBvcnQgeyBDb21tZW50TGlzdGluZyB9IGZyb20gXCIuL0NvbW1lbnRMaXN0aW5nXCI7XG5pbXBvcnQgeyBTcGFjZUxpc3RpbmcgfSBmcm9tIFwiLi9TcGFjZUxpc3RpbmdcIjtcbmltcG9ydCB7IEluYm94TGlzdGluZyB9IGZyb20gXCIuL0luYm94TGlzdGluZ1wiO1xuaW1wb3J0IHsgUHJvZmlsZUxpc3RpbmcgfSBmcm9tIFwiLi9Qcm9maWxlTGlzdGluZ1wiO1xuXG5jb25zdCB0eXBlcyA9IFtcbiAgQ2hhdExpc3RpbmcsXG4gIEZpcmVob3NlTGlzdGluZyxcbiAgVG9waWNMaXN0aW5nLFxuICBEb21haW5MaXN0aW5nLFxuICBDb21tZW50TGlzdGluZyxcbiAgU3BhY2VMaXN0aW5nLFxuICBJbmJveExpc3RpbmcsXG4gIENvbW1lbnRlZExpc3RpbmcsXG4gIFByb2ZpbGVMaXN0aW5nXG5dO1xuXG5jb25zdCBmcm9tUGF0aCA9IHBhdGggPT4ge1xuICBsZXQgbWF0Y2g7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgIG1hdGNoID0gdHlwZXNbaV0ucm91dGUubWF0Y2gocGF0aCk7XG4gICAgaWYgKG1hdGNoKSByZXR1cm4gUi5hc3NvYyhcIm1hdGNoXCIsIG1hdGNoLCB0eXBlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgTGlzdGluZ1R5cGUgPSB7IC4uLnR5cGVzLCB0eXBlcywgZnJvbVBhdGggfTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuXG5jb25zdCBzcGxpdERvbWFpbnMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLmZpbHRlcihSLmlkZW50aXR5KSxcbiAgUi5tYXAoUi50cmltKSxcbiAgUi5zcGxpdChcIitcIiksXG4gIFIudG9Mb3dlcixcbiAgUi50cmltLFxuICBSLmRlZmF1bHRUbyhcIlwiKVxuKTtcblxuY29uc3Qgc3BsaXRUb3BpY3MgPSBSLmNvbXBvc2UoXG4gIFIuaWZFbHNlKFIucHJvcChcImxlbmd0aFwiKSwgUi5pZGVudGl0eSwgUi5hbHdheXMoW1wiYWxsXCJdKSksXG4gIHNwbGl0RG9tYWluc1xuKTtcblxuY29uc3Qgd2l0aFJvdXRlID0gb2JqID0+IFIuYXNzb2MoXCJyb3V0ZVwiLCBuZXcgUm91dGUob2JqLnBhdGgpLCBvYmopO1xuXG5leHBvcnQgY29uc3QgUGF0aCA9IHsgc3BsaXREb21haW5zLCBzcGxpdFRvcGljcywgd2l0aFJvdXRlIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnXCI7XG5pbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tIFwiLi4vVG9rZW5pemVyXCI7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gXCIuLi9RdWVyeVwiO1xuaW1wb3J0IHsgTGlzdGluZ1NwZWMgfSBmcm9tIFwiLi9MaXN0aW5nU3BlY1wiO1xuXG5jb25zdCB0YWJzID0gW1wiaG90XCIsIFwibmV3XCIsIFwiZGlzY3Vzc2VkXCIsIFwiY29udHJvdmVyc2lhbFwiLCBcInRvcFwiXTtcbmNvbnN0IGNvbmZpZ1BhZ2VOYW1lID0gbmFtZSA9PiBgc3BhY2U6JHtuYW1lfWA7XG5jb25zdCBzaWRlYmFyUGFnZU5hbWUgPSBuYW1lID0+IGBzcGFjZToke25hbWV9OnNpZGViYXJgO1xuXG5jb25zdCBzb3VyY2VXaXRoRGVmYXVsdHMgPSBSLmN1cnJ5KChvd25lcklkLCBuYW1lLCBzb3VyY2UpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtzb3VyY2UgfHwgXCJcIl07XG4gIGNvbnN0IHRva2VuaXplZCA9IFRva2VuaXplci50b2tlbml6ZShzb3VyY2UpO1xuXG4gIGlmICghdG9rZW5pemVkLmdldFZhbHVlKFwidGFiXCIpKSB7XG4gICAgdGFicy5tYXAodGFiID0+XG4gICAgICByZXN1bHQucHVzaChgdGFiICR7dGFifSAvdXNlci8ke293bmVySWR9L3NwYWNlcy8ke25hbWV9LyR7dGFifWApXG4gICAgKTtcbiAgfVxuXG4gIGxldCBpbmRleGVyID0gdG9rZW5pemVkLmdldFZhbHVlKFwiaW5kZXhlclwiKTtcblxuICBpZiAoIWluZGV4ZXIpIHtcbiAgICByZXN1bHQucHVzaChgaW5kZXhlciAke0NvbmZpZy5pbmRleGVyfWApO1xuICAgIGluZGV4ZXIgPSBDb25maWcuaW5kZXhlcjtcbiAgfVxuXG4gIGxldCB0YWJ1bGF0b3IgPSB0b2tlbml6ZWQuZ2V0VmFsdWUoXCJ0YWJ1bGF0b3JcIik7XG5cbiAgaWYgKCF0YWJ1bGF0b3IpIHJlc3VsdC5wdXNoKGB0YWJ1bGF0b3IgJHtpbmRleGVyfWApO1xuXG4gIHJldHVybiByZXN1bHQuam9pbihcIlxcblwiKTtcbn0pO1xuXG5jb25zdCBnZXRTb3VyY2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkgPT5cbiAgTGlzdGluZ1NwZWMuZ2V0U291cmNlKHNjb3BlLCBhdXRob3JJZCwgY29uZmlnUGFnZU5hbWUobmFtZSksIGV4dHJhKS50aGVuKFxuICAgIHNvdXJjZVdpdGhEZWZhdWx0cyhhdXRob3JJZCwgbmFtZSlcbiAgKVxuKTtcblxuY29uc3QgZ2V0U3BlYyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQsIG5hbWUsIGV4dHJhKSA9PlxuICBnZXRTb3VyY2Uoc2NvcGUsIGF1dGhvcklkLCBuYW1lLCBleHRyYSkudGhlbihzb3VyY2UgPT5cbiAgICBMaXN0aW5nU3BlYy5mcm9tU291cmNlKHNvdXJjZSwgYXV0aG9ySWQsIG5hbWUpXG4gIClcbik7XG5cbmNvbnN0IG5vZGVUb1NwYWNlTmFtZXMgPSBSLmNvbXBvc2UoXG4gIFIuc29ydEJ5KFIuaWRlbnRpdHkpLFxuICBSLm1hcChSLnJlcGxhY2UoL15zcGFjZTovLCBcIlwiKSksXG4gIFIuZmlsdGVyKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIucHJvcChcImxlbmd0aFwiKSxcbiAgICAgIFIubWF0Y2goL15zcGFjZTpbXjpdKiQvKVxuICAgIClcbiAgKSxcbiAgUi5rZXlzXG4pO1xuXG5jb25zdCB1c2VyU3BhY2VOYW1lcyA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWQpID0+XG4gIFF1ZXJ5LnVzZXJQYWdlcyhzY29wZSwgYXV0aG9ySWQpLnRoZW4obm9kZVRvU3BhY2VOYW1lcylcbik7XG5cbmV4cG9ydCBjb25zdCBTcGFjZVNwZWMgPSB7XG4gIGNvbmZpZ1BhZ2VOYW1lLFxuICBzaWRlYmFyUGFnZU5hbWUsXG4gIG5vZGVUb1NwYWNlTmFtZXMsXG4gIHVzZXJTcGFjZU5hbWVzLFxuICB0YWJzLFxuICBnZXRTb3VyY2UsXG4gIGdldFNwZWNcbn07XG4iLCJpbXBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmltcG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmltcG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmltcG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmltcG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcblxuZXhwb3J0IHsgTGlzdGluZ0RhdGFTb3VyY2UgfSBmcm9tIFwiLi9MaXN0aW5nRGF0YVNvdXJjZVwiO1xuZXhwb3J0IHsgTGlzdGluZ0RlZmluaXRpb24gfSBmcm9tIFwiLi9MaXN0aW5nRGVmaW5pdGlvblwiO1xuZXhwb3J0IHsgTGlzdGluZ0ZpbHRlciB9IGZyb20gXCIuL0xpc3RpbmdGaWx0ZXJcIjtcbmV4cG9ydCB7IExpc3RpbmdOb2RlIH0gZnJvbSBcIi4vTGlzdGluZ05vZGVcIjtcbmV4cG9ydCB7IExpc3RpbmdPcmFjbGUgfSBmcm9tIFwiLi9MaXN0aW5nT3JhY2xlXCI7XG5leHBvcnQgeyBMaXN0aW5nUXVlcnkgfSBmcm9tIFwiLi9MaXN0aW5nUXVlcnlcIjtcbmV4cG9ydCB7IExpc3RpbmdTb3J0IH0gZnJvbSBcIi4vTGlzdGluZ1NvcnRcIjtcbmV4cG9ydCB7IExpc3RpbmdTcGVjIH0gZnJvbSBcIi4vTGlzdGluZ1NwZWNcIjtcbmV4cG9ydCB7IExpc3RpbmdUeXBlIH0gZnJvbSBcIi4vTGlzdGluZ1R5cGVcIjtcbmV4cG9ydCB7IFNwYWNlU3BlYyB9IGZyb20gXCIuL1NwYWNlU3BlY1wiO1xuXG5leHBvcnQgY29uc3QgTGlzdGluZyA9IHtcbiAgTGlzdGluZ05vZGUsXG4gIExpc3RpbmdTcGVjLFxuICBpc1ZhbGlkU29ydDogTGlzdGluZ1NvcnQuaXNWYWxpZFNvcnQsXG4gIGdldDogTGlzdGluZ05vZGUuZ2V0LFxuICBmcm9tU3BlYzogTGlzdGluZ1F1ZXJ5LmZyb21TcGVjLFxuICBmcm9tUGF0aDogTGlzdGluZ1F1ZXJ5LmZyb21QYXRoLFxuICB0eXBlRnJvbVBhdGg6IExpc3RpbmdUeXBlLmZyb21QYXRoLFxuICBzaWRlYmFyRnJvbVBhdGg6IExpc3RpbmdRdWVyeS5zaWRlYmFyRnJvbVBhdGgsXG4gIG5vZGVGcm9tUGF0aDogTGlzdGluZ1F1ZXJ5Lm5vZGVGcm9tUGF0aFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgVGhpbmcgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi9BdXRoZW50aWNhdGlvblwiO1xuXG5mdW5jdGlvbiBpbml0KEd1biwgY29uZmlnID0ge30pIHtcbiAgY29uc3QgeyBsZWVjaCwgZGlzYWJsZVZhbGlkYXRpb24sIG5vR3VuLCBsb2NhbFN0b3JhZ2UsIHBlcnNpc3QsIC4uLnJlc3QgfSA9XG4gICAgY29uZmlnIHx8IHt9O1xuICBjb25zdCBwZWVyID0geyBjb25maWcgfTtcblxuICBpZiAoIW5vR3VuKSB7XG4gICAgY29uc3QgY2ZnID0geyBsb2NhbFN0b3JhZ2U6ICEhbG9jYWxTdG9yYWdlLCByYWRpc2s6ICEhcGVyc2lzdCwgLi4ucmVzdCB9O1xuXG4gICAgaWYgKHBlcnNpc3QpIGNmZy5sb2NhbFN0b3JhZ2UgPSBmYWxzZTtcbiAgICBpZiAoIWRpc2FibGVWYWxpZGF0aW9uKSBHdW4ub24oXCJvcHRcIiwgVmFsaWRhdGlvbi5ndW5XaXJlSW5wdXQocGVlcikpO1xuICAgIGlmIChjZmcuc3RvcmVGbikgY2ZnLnN0b3JlID0gY2ZnLnN0b3JlRm4oY2ZnKTsgLy8gZm9yIGluZGV4ZWRkYlxuICAgIHBlZXIuZ3VuID0gR3VuKGNmZyk7XG4gICAgaWYgKGNmZy5sb2NhbFN0b3JhZ2UpIHBlZXIuZ3VuLm9uKFwibG9jYWxTdG9yYWdlOmVycm9yXCIsIGEgPT4gYS5yZXRyeSh7fSkpO1xuICAgIGlmIChsZWVjaCkge1xuICAgICAgY29uc3Qgc2VuZExlZWNoID0gKCkgPT4gcGVlci5ndW4uXy5vbihcIm91dFwiLCB7IGxlZWNoOiB0cnVlIH0pO1xuXG4gICAgICBzZW5kTGVlY2goKTtcbiAgICB9XG4gIH1cblxuICBwZWVyLm5ld1Njb3BlID0gb3B0cyA9PiBRdWVyeS5jcmVhdGVTY29wZShwZWVyLCBvcHRzKTtcbiAgcGVlci5vbkxvZ2luID0gQXV0aGVudGljYXRpb24ub25Mb2dpbihwZWVyKTtcbiAgcGVlci5zaWdudXAgPSBBdXRoZW50aWNhdGlvbi5zaWdudXAocGVlcik7XG4gIHBlZXIubG9naW4gPSBBdXRoZW50aWNhdGlvbi5sb2dpbihwZWVyKTtcbiAgcGVlci5sb2dvdXQgPSAoKSA9PiBBdXRoZW50aWNhdGlvbi5sb2dvdXQocGVlcik7XG4gIHBlZXIuaXNMb2dnZWRJbiA9ICgpID0+IEF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4ocGVlcik7XG4gIHBlZXIuc3VibWl0ID0gVGhpbmcuc3VibWl0KHBlZXIpO1xuICBwZWVyLmNvbW1lbnQgPSBUaGluZy5jb21tZW50KHBlZXIpO1xuICBwZWVyLmNoYXQgPSBUaGluZy5jaGF0KHBlZXIpO1xuICBwZWVyLndyaXRlUGFnZSA9IFRoaW5nLndyaXRlUGFnZShwZWVyKTtcbiAgcGVlci52b3RlID0gVGhpbmcudm90ZShwZWVyKTtcbiAgcGVlci5xdWVyaWVzID0gUXVlcnk7XG4gIHJldHVybiBwZWVyO1xufVxuXG5leHBvcnQgY29uc3QgUGVlciA9IHtcbiAgaW5pdFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgeyBzY29wZSBhcyBtYWtlU2NvcGUsIHF1ZXJ5LCBhbGwsIHJlc29sdmUgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1wiO1xuaW1wb3J0IHsgTGlzdGluZ05vZGUgfSBmcm9tIFwiLi9MaXN0aW5nL0xpc3RpbmdOb2RlXCI7XG5cbmNvbnN0IGVtcHR5UHJvbWlzZSA9IHJlc29sdmUobnVsbCk7XG5jb25zdCB1bmlvbkFycmF5cyA9IFIucmVkdWNlKFIudW5pb24sIFtdKTtcblxuY29uc3QgdG9waWNTb3VscyA9IHBhcmFtcyA9PiB7XG4gIGNvbnN0IHsgdG9waWNzID0gW1wiYWxsXCJdIH0gPSBwYXJhbXMgfHwge307XG4gIGNvbnN0IGRheXMgPSBSLnByb3BPcigzNjUsIFwiZGF5c1wiLCBwYXJhbXMpIHx8IDM2NTtcbiAgY29uc3QgZGF5U3RyaW5ncyA9IFtdO1xuICBjb25zdCBvbmVEYXkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gb25lRGF5ICogcGFyc2VJbnQoZGF5cywgMTApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IGRheXMgKyAxOyBpKyspXG4gICAgZGF5U3RyaW5ncy5wdXNoKFRoaW5nU2V0LmRheVN0cihzdGFydCArIGkgKiBvbmVEYXkpKTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKFxuICAgIHRvcGljcy5yZWR1Y2UoXG4gICAgICAocmVzdWx0LCB0b3BpY05hbWUpID0+XG4gICAgICAgIGRheVN0cmluZ3MucmVkdWNlKChyZXMsIGRzKSA9PiB7XG4gICAgICAgICAgcmVzW2Ake0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy8ke3RvcGljTmFtZX0vZGF5cy8ke2RzfWBdID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LCByZXN1bHQpLFxuICAgICAge31cbiAgICApXG4gICk7XG59O1xuXG5jb25zdCBzaW5nbGVUb3BpYyA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHRTb3VscyA9IHRvcGljU291bHMoeyAuLi5wYXJhbXMsIHRvcGljczogW3BhcmFtcy50b3BpY10gfSk7XG4gIGxldCBzb3VscyA9IFtdO1xuICBsZXQgaXRlbU1heCA9IENvbnN0YW50cy5MSVNUSU5HX1NJWkU7XG5cbiAgaWYgKHBhcmFtcy5zb3J0ID09PSBcIm5ld1wiKSB7XG4gICAgaXRlbU1heCA9IENvbnN0YW50cy5MSVNUSU5HX1NJWkU7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBhcmFtcy5zb3J0ID09PSBcInRvcFwiKSBpdGVtTWF4ID0gaXRlbU1heCAqIDM7XG4gICAgaWYgKHBhcmFtcy50b3BpYyA9PT0gXCJhbGxcIikgaXRlbU1heCA9IGl0ZW1NYXggKiAzO1xuICB9XG5cbiAgY29uc3QgZmV0Y2hNb3JlID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvcGljU291bCA9IHRTb3Vscy5wb3AoKTtcblxuICAgIGlmIChzb3Vscy5sZW5ndGggPiBpdGVtTWF4IHx8ICF0b3BpY1NvdWwpIHJldHVybiByZXNvbHZlKHNvdWxzKTtcbiAgICByZXR1cm4gc2NvcGVcbiAgICAgIC5nZXQodG9waWNTb3VsKVxuICAgICAgLnNvdWxzKClcbiAgICAgIC50aGVuKG1vcmUgPT4ge1xuICAgICAgICBzb3VscyA9IFsuLi5zb3VscywgLi4ubW9yZV07XG4gICAgICAgIHJldHVybiBmZXRjaE1vcmUoKTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBmZXRjaE1vcmUoKTtcbn0pO1xuXG5jb25zdCBzaW5nbGVEb21haW4gPSBxdWVyeSgoc2NvcGUsIHsgZG9tYWluIH0pID0+XG4gIHNjb3BlLmdldChTY2hlbWEuRG9tYWluLnJvdXRlLnJldmVyc2UoeyBkb21haW5OYW1lOiBkb21haW4gfSkpLnNvdWxzKClcbik7XG5cbmNvbnN0IHNpbmdsZUF1dGhvciA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBhbGwoW1xuICAgIHBhcmFtcy50eXBlICYmIHBhcmFtcy50eXBlICE9PSBcInN1Ym1pdHRlZFwiICYmIHBhcmFtcy50eXBlICE9PSBcIm92ZXJ2aWV3XCJcbiAgICAgID8gcmVzb2x2ZShbXSlcbiAgICAgIDogc2NvcGVcbiAgICAgICAgICAuZ2V0KHBhcmFtcy5hdXRob3JJZClcbiAgICAgICAgICAuZ2V0KFwic3VibWlzc2lvbnNcIilcbiAgICAgICAgICAuc291bHMoKSxcbiAgICBwYXJhbXMudHlwZSAmJlxuICAgIHBhcmFtcy50eXBlICE9PSBcImNvbW1lbnRzXCIgJiZcbiAgICBwYXJhbXMudHlwZSAhPT0gXCJvdmVydmlld1wiICYmXG4gICAgcGFyYW1zLnR5cGUgIT09IFwiY29tbWFuZHNcIlxuICAgICAgPyByZXNvbHZlKFtdKVxuICAgICAgOiBzY29wZVxuICAgICAgICAgIC5nZXQocGFyYW1zLmF1dGhvcklkKVxuICAgICAgICAgIC5nZXQoXCJjb21tZW50c1wiKVxuICAgICAgICAgIC5zb3VscygpXG4gIF0pLnRoZW4oKFtzdWJtaXNzaW9ucywgY29tbWVudHNdKSA9PiB1bmlvbkFycmF5cyhbc3VibWlzc2lvbnMsIGNvbW1lbnRzXSkpXG4pO1xuXG5jb25zdCBsaXN0aW5nSWRzID0gcXVlcnkoXG4gIChzY29wZSwgc291bCkgPT4gc2NvcGUuZ2V0KHNvdWwpLnRoZW4oTGlzdGluZ05vZGUuc29ydGVkSWRzKSxcbiAgXCJsaXN0aW5nSWRzXCJcbik7XG5cbmNvbnN0IHNpbmdsZUxpc3RpbmcgPSBxdWVyeSgoc2NvcGUsIHsgbGlzdGluZywgc29ydCwgaW5kZXhlciB9KSA9PlxuICBsaXN0aW5nSWRzKHNjb3BlLCBgJHtDb25zdGFudHMuUFJFRklYfSR7bGlzdGluZ30vJHtzb3J0fUB+JHtpbmRleGVyfS5gKS50aGVuKFxuICAgIFIuY29tcG9zZShcbiAgICAgIFIubWFwKHRoaW5nSWQgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pKSxcbiAgICAgIFIuZmlsdGVyKFIuaWRlbnRpdHkpXG4gICAgKVxuICApXG4pO1xuXG5jb25zdCByZXBsaWVzVG9BdXRob3IgPSBxdWVyeShcbiAgKHNjb3BlLCB7IHJlcGxpZXNUb0F1dGhvcklkLCB0eXBlID0gXCJvdmVydmlld1wiLCAuLi5wYXJhbXMgfSkgPT5cbiAgICBzaW5nbGVMaXN0aW5nKHNjb3BlLCB7XG4gICAgICBsaXN0aW5nOiBgL3VzZXIvJHtyZXBsaWVzVG9BdXRob3JJZH0vJHt0eXBlfWAsXG4gICAgICBzb3J0OiBcIm5ld1wiLFxuICAgICAgLi4ucGFyYW1zXG4gICAgfSkudGhlbihhdXRob3JlZFNvdWxzID0+XG4gICAgICBhbGwoXG4gICAgICAgIGF1dGhvcmVkU291bHMubWFwKGF1dGhvcmVkU291bCA9PlxuICAgICAgICAgIHNjb3BlLmdldChgJHthdXRob3JlZFNvdWx9L2NvbW1lbnRzYCkuc291bHMoKVxuICAgICAgICApXG4gICAgICApLnRoZW4odW5pb25BcnJheXMpXG4gICAgKVxuKTtcblxuY29uc3Qgc2luZ2xlU3VibWlzc2lvbiA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBzY29wZVxuICAgIC5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogcGFyYW1zLnN1Ym1pc3Npb25JZCB9KVxuICAgIClcbiAgICAuc291bHMoXG4gICAgICBSLnByZXBlbmQoU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBwYXJhbXMuc3VibWlzc2lvbklkIH0pKVxuICAgIClcbik7XG5cbmNvbnN0IHRoaW5nID0gcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gIHNjb3BlLmdldCh0aGluZ1NvdWwpLnRoZW4obWV0YSA9PiB7XG4gICAgaWYgKCFtZXRhIHx8ICFtZXRhLmlkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCByZXN1bHQgPSB7IGlkOiBtZXRhLmlkLCB0aW1lc3RhbXA6IHBhcnNlRmxvYXQobWV0YS50aW1lc3RhbXAsIDEwKSB9O1xuICAgIGNvbnN0IHJlcGx5VG9Tb3VsID0gUi5wYXRoKFtcInJlcGx5VG9cIiwgXCIjXCJdLCBtZXRhKTtcbiAgICBjb25zdCBvcFNvdWwgPSBSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBtZXRhKTtcbiAgICBjb25zdCBvcElkID0gb3BTb3VsID8gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKG9wU291bCkudGhpbmdpZCA6IG51bGw7XG4gICAgY29uc3QgcmVwbHlUb0lkID0gcmVwbHlUb1NvdWxcbiAgICAgID8gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHJlcGx5VG9Tb3VsKS50aGluZ2lkXG4gICAgICA6IG51bGw7XG5cbiAgICBpZiAob3BJZCkgcmVzdWx0Lm9wSWQgPSBvcElkO1xuICAgIGlmIChyZXBseVRvSWQpIHJlc3VsdC5yZXBseVRvSWQgPSByZXBseVRvSWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSlcbik7XG5cbmNvbnN0IHRoaW5nVm90ZUNvdW50ID0gdm90ZVR5cGUgPT5cbiAgcXVlcnkoKHNjb3BlLCB0aGluZ1NvdWwpID0+XG4gICAgc2NvcGVcbiAgICAgIC5nZXQodGhpbmdTb3VsKVxuICAgICAgLmdldCh2b3RlVHlwZSlcbiAgICAgIC5jb3VudCgpXG4gICk7XG5cbmNvbnN0IHRoaW5nVm90ZXNVcCA9IHRoaW5nVm90ZUNvdW50KFwidm90ZXN1cFwiKTtcbmNvbnN0IHRoaW5nVm90ZXNEb3duID0gdGhpbmdWb3RlQ291bnQoXCJ2b3Rlc2Rvd25cIik7XG5jb25zdCB0aGluZ0FsbENvbW1lbnRzQ291bnQgPSBxdWVyeSgoc2NvcGUsIHRoaW5nU291bCkgPT5cbiAgc2NvcGUuZ2V0KGAke3RoaW5nU291bH0vYWxsY29tbWVudHNgKS5jb3VudCgpXG4pO1xuXG5jb25zdCBjb21wdXRlVGhpbmdTY29yZXMgPSBxdWVyeSgoc2NvcGUsIHRoaW5nU291bCkgPT5cbiAgYWxsKFtcbiAgICB0aGluZ1ZvdGVzVXAoc2NvcGUsIHRoaW5nU291bCksXG4gICAgdGhpbmdWb3Rlc0Rvd24oc2NvcGUsIHRoaW5nU291bCksXG4gICAgdGhpbmdBbGxDb21tZW50c0NvdW50KHNjb3BlLCB0aGluZ1NvdWwpXG4gIF0pLnRoZW4oKFt1cCwgZG93biwgY29tbWVudF0pID0+ICh7IHVwLCBkb3duLCBjb21tZW50LCBzY29yZTogdXAgLSBkb3duIH0pKVxuKTtcblxuY29uc3QgdGhpbmdNZXRhID0gcXVlcnkoXG4gIChzY29wZSwgeyB0aGluZ1NvdWwsIHRhYnVsYXRvciwgZGF0YSA9IGZhbHNlLCBzY29yZXMgPSBmYWxzZSB9KSA9PiB7XG4gICAgaWYgKCF0aGluZ1NvdWwpIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgIHJldHVybiBhbGwoW1xuICAgICAgdGhpbmcoc2NvcGUsIHRoaW5nU291bCksXG4gICAgICBzY29yZXNcbiAgICAgICAgPyB0YWJ1bGF0b3JcbiAgICAgICAgICA/IHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L3ZvdGVjb3VudHNAfiR7dGFidWxhdG9yfS5gKS50aGVuKCkgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgIDogY29tcHV0ZVRoaW5nU2NvcmVzKHNjb3BlLCB0aGluZ1NvdWwpLnRoZW4oKVxuICAgICAgICA6IHJlc29sdmUoKSxcbiAgICAgIGRhdGFcbiAgICAgICAgPyBzY29wZVxuICAgICAgICAgICAgLmdldCh0aGluZ1NvdWwpXG4gICAgICAgICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgICAgICAgLnRoZW4oKVxuICAgICAgICA6IHJlc29sdmUoKVxuICAgIF0pLnRoZW4oKFttZXRhLCB2b3RlcywgZGF0YV0pID0+IHtcbiAgICAgIGlmICghbWV0YSB8fCAhbWV0YS5pZCkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4geyAuLi5tZXRhLCB2b3RlcywgZGF0YSB9O1xuICAgIH0pO1xuICB9XG4pO1xuXG5jb25zdCBtdWx0aVRoaW5nTWV0YSA9IHF1ZXJ5KChzY29wZSwgcGFyYW1zKSA9PlxuICBhbGwoXG4gICAgUi5yZWR1Y2UoXG4gICAgICAocHJvbWlzZXMsIHRoaW5nU291bCkgPT4ge1xuICAgICAgICBpZiAoIXRoaW5nU291bCkgcmV0dXJuIHByb21pc2VzO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaW5nTWV0YShzY29wZSwgeyAuLi5wYXJhbXMsIHRoaW5nU291bCB9KSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlcztcbiAgICAgIH0sXG4gICAgICBbXSxcbiAgICAgIFIucHJvcE9yKFtdLCBcInRoaW5nU291bHNcIiwgcGFyYW1zKVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgbXVsdGlRdWVyeSA9IChzaW5nbGVRdWVyeSwgcGx1cmFsLCBzaW5nbGUsIGNvbGxhdGUgPSB1bmlvbkFycmF5cykgPT5cbiAgcXVlcnkoKHNjb3BlLCBwYXJhbXMpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IFIucHJvcChwbHVyYWwsIHBhcmFtcyk7XG5cbiAgICBpZiAoUi5pc05pbChpdGVtcykpIHJldHVybiBlbXB0eVByb21pc2U7XG4gICAgcmV0dXJuIGFsbChcbiAgICAgIFIubWFwKFxuICAgICAgICB2YWwgPT4gc2luZ2xlUXVlcnkoc2NvcGUsIHsgLi4ucGFyYW1zLCBbc2luZ2xlXTogdmFsIH0pLFxuICAgICAgICBSLnByb3BPcihbXSwgcGx1cmFsLCBwYXJhbXMpXG4gICAgICApXG4gICAgKS50aGVuKGNvbGxhdGUpO1xuICB9KTtcblxuY29uc3QgbXVsdGlUb3BpYyA9IG11bHRpUXVlcnkoc2luZ2xlVG9waWMsIFwidG9waWNzXCIsIFwidG9waWNcIik7XG5jb25zdCBtdWx0aURvbWFpbiA9IG11bHRpUXVlcnkoc2luZ2xlRG9tYWluLCBcImRvbWFpbnNcIiwgXCJkb21haW5cIik7XG5jb25zdCBtdWx0aUF1dGhvciA9IG11bHRpUXVlcnkoc2luZ2xlQXV0aG9yLCBcImF1dGhvcklkc1wiLCBcImF1dGhvcklkXCIpO1xuY29uc3QgbXVsdGlTdWJtaXNzaW9uID0gbXVsdGlRdWVyeShcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgXCJzdWJtaXNzaW9uSWRzXCIsXG4gIFwic3VibWlzc2lvbklkXCJcbik7XG5cbmNvbnN0IHRoaW5nRGF0YUZyb21Tb3VscyA9IHNjb3BlID0+IHNvdWxzID0+XG4gIGFsbChcbiAgICBzb3Vsc1xuICAgICAgLmZpbHRlcih4ID0+ICEheClcbiAgICAgIC5tYXAoc291bCA9PlxuICAgICAgICBzY29wZVxuICAgICAgICAgIC5nZXQoc291bClcbiAgICAgICAgICAuZ2V0KFwiZGF0YVwiKVxuICAgICAgICAgIC50aGVuKHggPT4geClcbiAgICAgIClcbiAgKTtcblxuY29uc3QgY3VyYXRlZCA9IHF1ZXJ5KChzY29wZSwgYXV0aG9ySWRzLCBzdWJtaXNzaW9uT25seSA9IGZhbHNlKSA9PlxuICBhbGwoW1xuICAgIG11bHRpQXV0aG9yKHNjb3BlLCB7XG4gICAgICB0eXBlOiBcImNvbW1lbnRzXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KVxuICAgICAgLnRoZW4odGhpbmdEYXRhRnJvbVNvdWxzKHNjb3BlKSlcbiAgICAgIC50aGVuKFxuICAgICAgICBSLmNvbXBvc2UoXG4gICAgICAgICAgUi5tYXAoc3VibWlzc2lvbk9ubHkgPyBSLnByb3AoXCJvcElkXCIpIDogUi5wcm9wKFwicmVwbHlUb0lkXCIpKSxcbiAgICAgICAgICBSLmZpbHRlcihSLnByb3AoXCJyZXBseVRvSWRcIikpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgbXVsdGlBdXRob3Ioc2NvcGUsIHtcbiAgICAgIHR5cGU6IFwic3VibWl0dGVkXCIsXG4gICAgICBhdXRob3JJZHNcbiAgICB9KS50aGVuKFIubWFwKHNvdWwgPT4gU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKHNvdWwpLnRoaW5nSWQpKVxuICBdKS50aGVuKChbaWRzMSwgaWRzMl0pID0+IFIudW5pcShbLi4uaWRzMSwgLi4uaWRzMl0pKVxuKTtcblxuY29uc3QgdGhpbmdTY29yZXMgPSBxdWVyeShcbiAgKHNjb3BlLCB0YWJ1bGF0b3IsIHRoaW5nSWQpID0+XG4gICAgdGFidWxhdG9yICYmIHRoaW5nSWRcbiAgICAgID8gc2NvcGVcbiAgICAgICAgICAuZ2V0KFNjaGVtYS5UaGluZ1ZvdGVDb3VudHMucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQsIHRhYnVsYXRvciB9KSlcbiAgICAgICAgICAudGhlbigpXG4gICAgICA6IHJlc29sdmUoKSxcbiAgXCJ0aGluZ1Njb3Jlc1wiXG4pO1xuXG5jb25zdCB0aGluZ1JlcGxpZXMgPSBxdWVyeSgoc2NvcGUsIHRoaW5nSWQpID0+XG4gIHNjb3BlLmdldChTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkudGhlbigpXG4pO1xuXG5jb25zdCB0aGluZ0RhdGEgPSBxdWVyeShcbiAgKHNjb3BlLCB0aGluZ0lkKSA9PlxuICAgIHRoaW5nSWRcbiAgICAgID8gc2NvcGUuZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSkuZ2V0KFwiZGF0YVwiKVxuICAgICAgOiByZXNvbHZlKG51bGwpLFxuICBcInRoaW5nRGF0YVwiXG4pO1xuXG5jb25zdCB1c2VyUGFnZXMgPSBxdWVyeShcbiAgKHNjb3BlLCBhdXRob3JJZCkgPT5cbiAgICBzY29wZS5nZXQoU2NoZW1hLkF1dGhvclBhZ2VzLnJvdXRlLnJldmVyc2UoeyBhdXRob3JJZCB9KSksXG4gIFwidXNlclBhZ2VzXCJcbik7XG5cbmNvbnN0IHdpa2lQYWdlSWQgPSBxdWVyeShcbiAgKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkgPT5cbiAgICBzY29wZVxuICAgICAgLmdldChTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkIH0pKVxuICAgICAgLmdldChuYW1lKVxuICAgICAgLmdldChcImlkXCIpLFxuICBcIndpa2lQYWdlSWRcIlxuKTtcblxuY29uc3Qgd2lraVBhZ2UgPSBxdWVyeSgoc2NvcGUsIGF1dGhvcklkLCBuYW1lKSA9PlxuICB3aWtpUGFnZUlkKHNjb3BlLCBhdXRob3JJZCwgbmFtZSkudGhlbihpZCA9PiBpZCAmJiB0aGluZ0RhdGEoc2NvcGUsIGlkKSlcbik7XG5cbmNvbnN0IHVzZXJNZXRhID0gcXVlcnkoKHNjb3BlLCBpZCkgPT4ge1xuICBpZiAoIWlkKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgcmV0dXJuIHNjb3BlLmdldChgfiR7aWR9YCkudGhlbihtZXRhID0+ICh7XG4gICAgdXNlckFsaWFzOiBSLnByb3AoXCJhbGlhc1wiLCBtZXRhKSxcbiAgICBjcmVhdGVkQXQ6IFIucGF0aChbXCJfXCIsIFwiPlwiLCBcInB1YlwiXSwgbWV0YSlcbiAgfSkpO1xufSwgXCJ1c2VyTWV0YVwiKTtcblxuY29uc3QgY3JlYXRlU2NvcGUgPSBSLmN1cnJ5KChuYWIsIG9wdHMpID0+XG4gIG1ha2VTY29wZShSLmFzc29jKFwiZ3VuXCIsIG5hYi5ndW4sIG9wdHMgfHwge30pKVxuKTtcblxuZXhwb3J0IGNvbnN0IFF1ZXJ5ID0ge1xuICBzaW5nbGVUb3BpYyxcbiAgc2luZ2xlRG9tYWluLFxuICBzaW5nbGVBdXRob3IsXG4gIHNpbmdsZUxpc3RpbmcsXG4gIHJlcGxpZXNUb0F1dGhvcixcbiAgc2luZ2xlU3VibWlzc2lvbixcbiAgY29tcHV0ZVRoaW5nU2NvcmVzLFxuICB0aGluZ01ldGEsXG4gIG11bHRpVGhpbmdNZXRhLFxuICBtdWx0aVRvcGljLFxuICBtdWx0aURvbWFpbixcbiAgbXVsdGlBdXRob3IsXG4gIG11bHRpU3VibWlzc2lvbixcbiAgdGhpbmdTY29yZXMsXG4gIHRoaW5nUmVwbGllcyxcbiAgdGhpbmdEYXRhLFxuICB0aGluZ0RhdGFGcm9tU291bHMsXG4gIHRvcGljU291bHMsXG4gIHVzZXJQYWdlcyxcbiAgd2lraVBhZ2VJZCxcbiAgd2lraVBhZ2UsXG4gIHVzZXJNZXRhLFxuICBjcmVhdGVTY29wZSxcbiAgY3VyYXRlZFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcInJvdXRlLXBhcnNlclwiO1xuaW1wb3J0ICogYXMgc2VhIGZyb20gXCJndW4tc3VwcHJlc3Nvci1zZWFyXCI7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIC4uLnNlYS5BVVRIX1NDSEVNQSxcbiAgdG9waWNOYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtaW5MZW5ndGg6IDEsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RPUElDX1NJWkVcbiAgfSxcblxuICBUb3BpY0RheToge1xuICAgIHRpdGxlOiBcIlRvcGljIERheVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkEgc2luZ2xlIGRheSBvZiB0aGluZ3MgaW4gYSB0b3BpY1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy86dG9waWNOYW1lL2RheXMvOnllYXIvOm1vbnRoLzpkYXlgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3BpY05hbWU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgICAgeWVhcjogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAyMDE4LCBtYXhpbXVtOiAyMTAwIH0sXG4gICAgICAgIG1vbnRoOiB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbmltdW06IDEsIG1heGltdW06IDEyIH0sXG4gICAgICAgIGRheTogeyB0eXBlOiBcIm51bWJlclwiLCBtaW5pbXVtOiAxLCBtYXhpbXVtOiAzMSB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcInRvcGljTmFtZVwiLCBcInllYXJcIiwgXCJtb250aFwiLCBcImRheVwiXVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBuYW1lOiBcInRvcGljTmFtZVwiIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbmFtZToge1xuICAgICAgICBkZXNjcmlwdGlvbjogXCJEZXByZWNhdGVkIGFzIHVubmVjZXNzYXJ5XCIsXG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICAgIHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RvcGljRWRnZVwiIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG5cbiAgVG9waWM6IHtcbiAgICB0aXRsZTogXCJUb3BpY1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0aGluZ3MgaW4gYSB0b3BpY1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RvcGljcy86dG9waWNOYW1lYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWNOYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widG9waWNOYW1lXCJdXG4gICAgfSxcbiAgICBwcm9wc0Zyb21Tb3VsOiB7IG5hbWU6IFwidG9waWNOYW1lXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcHJlY2F0ZWQgYXMgdW5uZWNlc3NhcnlcIixcbiAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgYW55T2Y6IFtcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfSxcbiAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICBkb21haW5OYW1lOiB7XG4gICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICBtaW5MZW5ndGg6IDEsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0RPTUFJTl9TSVpFXG4gIH0sXG5cbiAgRG9tYWluOiB7XG4gICAgdGl0bGU6IFwiRG9tYWluXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRoaW5ncyBpbiBhIGRvbWFpblwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L2RvbWFpbnMvOmRvbWFpbk5hbWVgLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkb21haW5OYW1lOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImRvbWFpbk5hbWVcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdXJsOiB7IHR5cGU6IFtcIm51bGxcIiwgXCJzdHJpbmdcIl0sIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9VUkxfU0laRSB9LFxuICBVUkw6IHtcbiAgICB0aXRsZTogXCJVUkxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGhpbmdzIGZvciBhIGdpdmVuIFVSTFwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3VybHMvXFwqdXJsYCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB1cmw6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXJsXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ1cmxcIl1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdGhpbmdJZDoge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0hBU0hfU0laRVxuICB9LFxuXG4gIHRoaW5nU291bDoge1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHRoaW5nSWQ6IHsgXCIjcmVmXCI6IFwiI2RlZmluaXRpb25zL3RoaW5nSWRcIiB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nQWxsQ29tbWVudHM6IHtcbiAgICB0aXRsZTogXCJUaGluZyBBbGwgQ29tbWVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgY29tbWVudHMgZm9yIGEgZ2l2ZW4gc3VibWlzc2lvblwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9hbGxjb21tZW50c2AsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdDb21tZW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRGlyZWN0IHJlcGxpZXMgdG8gYSB0aGluZ1wiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9jb21tZW50c2AsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7XG4gICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgIGFueU9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICB9XG4gIH0sXG5cbiAgdGltZXN0YW1wOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9LFxuICB0aGluZ0tpbmQ6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9USElOR19LSU5EX1NJWkVcbiAgfSxcblxuICBUaGluZzoge1xuICAgIHRpdGxlOiBcIlRoaW5nIFJlZmVyZW5jZVwiLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJUaGVzZSBhcmUgc3VibWlzc2lvbnMsIGNvbW1lbnRzLCBjaGF0IG1lc3NhZ2VzIGFuZCB3aWtpIHBhZ2VzXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkYCxcbiAgICAgIGFsbE9mOiBbeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ1NvdWxcIiB9XVxuICAgIH0sXG4gICAgcHJvcHNGcm9tU291bDogeyBpZDogXCJ0aGluZ0lkXCIgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBpZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBraW5kOiB7IFwiI3JlZlwiOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSxcbiAgICAgIHRpbWVzdGFtcDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfSxcbiAgICAgIG9yaWdpbmFsSGFzaDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG9uZU9mOiBbXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdEYXRhRWRnZVwiIH0sXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVGhpbmdEYXRhU2lnbmVkRWRnZVwiIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHRvcGljOiB7XG4gICAgICAgIGFueU9mOiBbXG4gICAgICAgICAgeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVG9waWNFZGdlXCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb21lIG9sZCB0aGluZ3MgaGFkIGdlbmVyaWMgdG9waWMgc291bHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIFwiI1wiOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogNDIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBbXCIjXCJdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgZG9tYWluOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9Eb21haW5FZGdlXCIgfSxcbiAgICAgIHVybDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvVVJMRWRnZVwiIH0sXG4gICAgICBjb21tZW50czogeyB0aGluZ1JlbGF0ZWRFZGdlOiBcIlRoaW5nQ29tbWVudHNcIiB9LFxuICAgICAgYWxsY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0FsbENvbW1lbnRzXCIgfSxcbiAgICAgIHZvdGVzdXA6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzVXBcIiB9LFxuICAgICAgdm90ZXNkb3duOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc0Rvd25cIiB9LFxuICAgICAgb3A6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH0sXG4gICAgICByZXBseVRvOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9UaGluZ0VkZ2VcIiB9LFxuICAgICAgYXV0aG9yOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9TRUFBdXRob3JFZGdlXCIgfVxuICAgIH0sXG5cbiAgICBhbnlPZjogW1xuICAgICAge1xuICAgICAgICBhbGxPZjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaW5nSGFzaE1hdGNoZXNTb3VsOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhbnlPZjogW1xuICAgICAgICAgICAgICB7IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNUaGluZzogdHJ1ZSB9LFxuICAgICAgICAgICAgICB7IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2g6IHRydWUgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHsgaXNMZWdhY3lUaGluZzogdHJ1ZSB9LFxuICAgICAge1xuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNlbGYgdmVyaWZ5aW5nIGNhbiBiZSB1cGRhdGVkIGluIGlzb2xhdGlvblwiLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgaWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICAgIGNvbW1lbnRzOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdDb21tZW50c1wiIH0sXG4gICAgICAgICAgYWxsY29tbWVudHM6IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ0FsbENvbW1lbnRzXCIgfSxcbiAgICAgICAgICB2b3Rlc3VwOiB7IHRoaW5nUmVsYXRlZEVkZ2U6IFwiVGhpbmdWb3Rlc1VwXCIgfSxcbiAgICAgICAgICB2b3Rlc2Rvd246IHsgdGhpbmdSZWxhdGVkRWRnZTogXCJUaGluZ1ZvdGVzRG93blwiIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSxcblxuICBQcm9vZk9mV29ya1ZvdGVzOiB7XG4gICAgJGFzeW5jOiB0cnVlLFxuICAgIGtleXNBcmVQcm9vZnNPZldvcms6IHtcbiAgICAgIGFsZ29yaXRobTogXCJhcmdvbjJkXCIsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgY29tcGxleGl0eTogNixcbiAgICAgICAgaGFzaExlbmd0aDogMzIsXG4gICAgICAgIHRpbWVDb3N0OiAxLFxuICAgICAgICBtZW1vcnlDb3N0OiAxMDI0MCxcbiAgICAgICAgcGFyYWxsZWxpc206IDFcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgVGhpbmdWb3Rlc1VwOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVzdXBgLFxuICAgICAgYWxsT2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nU291bFwiIH1dXG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL1Byb29mT2ZXb3JrVm90ZXNcIiB9XVxuICB9LFxuXG4gIFRoaW5nVm90ZXNEb3duOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vdGhpbmdzLzp0aGluZ0lkL3ZvdGVzZG93bmAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV1cbiAgICB9LFxuICAgIGFsbE9mOiBbeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvUHJvb2ZPZldvcmtWb3Rlc1wiIH1dXG4gIH0sXG5cbiAgVGhpbmdEYXRhOiB7XG4gICAgdGl0bGU6IFwiVW5zaWduZWQgVGhpbmcgRGF0YVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgaXMgdGhlIGFjdHVhbCBjb250ZW50IG9mIGEgdGhpbmdcIixcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90aGluZ3MvOnRoaW5nSWQvZGF0YWAsXG4gICAgICBhbGxPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdTb3VsXCIgfV0sXG4gICAgICByZXF1aXJlZDogW1widGhpbmdJZFwiXVxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAga2luZDogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdGhpbmdLaW5kXCIgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX1RJVExFX1NJWkVcbiAgICAgIH0sXG4gICAgICB0b3BpYzogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX1RISU5HX0JPRFlfU0laRVxuICAgICAgfSxcbiAgICAgIGF1dGhvcjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvc2VhQWxpYXNcIiB9LFxuICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgIG9wSWQ6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgcmVwbHlUb0lkOiB7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgIGRvbWFpbjogeyAkcmVmOiBcIiMvZGVmaW5pdGlvbnMvZG9tYWluTmFtZVwiIH0sXG4gICAgICB1cmw6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3VybFwiIH0sXG4gICAgICB0aW1lc3RhbXA6IHsgJHJlZjogXCIjL2RlZmluaXRpb25zL3RpbWVzdGFtcFwiIH1cbiAgICB9LFxuICAgIHRoaW5nRGF0YUhhc2hNYXRjaGVzU291bDogdHJ1ZVxuICB9LFxuXG4gIFRoaW5nRGF0YVNpZ25lZDoge1xuICAgIHRpdGxlOiBcIlNpZ25lZCBUaGluZyBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoaXMgaXMgdGhlIGFjdHVhbCBjb250ZW50IG9mIGEgdGhpbmcsIGNyeXB0b2dyYXBoaWNhbGx5IHNpZ25lZFwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9kYXRhfjphdXRob3JJZC5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0aGluZ0lkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9LFxuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widGhpbmdJZFwiLCBcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBraW5kOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0tpbmRcIiB9IH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICBzZWE6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfVElUTEVfU0laRVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9waWM6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RvcGljTmFtZVwiIH0gfSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgc2VhOiB7XG4gICAgICAgICAgdHlwZTogW1wibnVsbFwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgICBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVEhJTkdfQk9EWV9TSVpFXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUFsaWFzXCIgfVxuICAgICAgfSxcbiAgICAgIGF1dGhvcklkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0gfSxcbiAgICAgIG9wSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICByZXBseVRvSWQ6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3RoaW5nSWRcIiB9IH0sXG4gICAgICBkb21haW46IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL2RvbWFpbk5hbWVcIiB9IH0sXG4gICAgICB1cmw6IHsgc2VhOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3VybFwiIH0gfSxcbiAgICAgIHRpbWVzdGFtcDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGltZXN0YW1wXCIgfSB9XG4gICAgfVxuICB9LFxuXG4gIFRoaW5nVm90ZUNvdW50czoge1xuICAgIHRpdGxlOiBcIlRoaW5nIFZvdGUgQ291bnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWdncmVnYXRlZCBjb3VudHMgZnJvbSBhIHRhYnVsYXRvclwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC92b3RlY291bnRzQH46dGFidWxhdG9yLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRoaW5nSWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdGhpbmdJZFwiIH0sXG4gICAgICAgIHRhYnVsYXRvcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHVwOiB7IHNlYTogeyB0eXBlOiBbXCJudW1iZXJcIiwgXCJzdHJpbmdcIl0gfSB9LFxuICAgICAgZG93bjogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGNvbW1lbnQ6IHsgc2VhOiB7IHR5cGU6IFtcIm51bWJlclwiLCBcInN0cmluZ1wiXSB9IH0sXG4gICAgICBzY29yZTogeyBzZWE6IHsgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdIH0gfSxcbiAgICAgIGNvbW1hbmRzOiB7IHNlYTogeyB0eXBlOiBbXCJvYmplY3RcIiwgXCJzdHJpbmdcIl0gfSB9XG4gICAgfVxuICB9LFxuXG4gIExpc3RpbmdEYXRhOiB7XG4gICAgJGFzeW5jOiB0cnVlLFxuICAgIHRpdGxlOiBcIkxpc3RpbmcgTm9kZSBEYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU2hhcmVkIGRlc2NyaXB0aW9uIG9mIGxpc3RpbmcgcHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgaWRzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19JRFNfU0laRSB9XG4gICAgICB9LFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19TT1VSQ0VfU0laRSB9XG4gICAgICB9LFxuXG4gICAgICAvLyBYWFg6IHJlc3QgYXJlIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2Ygc291cmNlXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBbXCJzdHJpbmdcIiwgXCJudWxsXCJdLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfVE9QSUNfU0laRSB9XG4gICAgICB9LFxuICAgICAgc3VibWl0VG9waWM6IHtcbiAgICAgICAgc2VhOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1heExlbmd0aDogQ29uc3RhbnRzLk1BWF9UT1BJQ19TSVpFIH1cbiAgICAgIH0sXG4gICAgICB0YWJzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19UQUJTX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIGN1cmF0b3JzOiB7XG4gICAgICAgIHNlYTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXhMZW5ndGg6IENvbnN0YW50cy5NQVhfTElTVElOR19TT1VSQ0VfU0laRSB9XG4gICAgICB9LFxuICAgICAgY2Vuc29yczoge1xuICAgICAgICBzZWE6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWF4TGVuZ3RoOiBDb25zdGFudHMuTUFYX0xJU1RJTkdfU09VUkNFX1NJWkUgfVxuICAgICAgfSxcbiAgICAgIHVzZXJJZDogeyBzZWE6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9IH0sXG4gICAgICBvcElkOiB7IHNlYTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSB9LFxuICAgICAgaXNDaGF0OiB7IHNlYTogeyB0eXBlOiBbXCJib29sZWFuXCIsIFwic3RyaW5nXCJdIH0gfVxuICAgIH0sXG4gICAgcGF0dGVyblByb3BlcnRpZXM6IHtcbiAgICAgIFwiXmQrJFwiOiB7IHNlYTogeyB0eXBlOiBcInN0cmluZ1wiIH0gfVxuICAgIH1cbiAgfSxcblxuICBzb3J0TmFtZToge1xuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgZW51bTogW1xuICAgICAgXCJuZXdcIixcbiAgICAgIFwib2xkXCIsXG4gICAgICBcImFjdGl2ZVwiLFxuICAgICAgXCJ0b3BcIixcbiAgICAgIFwiY29tbWVudHNcIixcbiAgICAgIFwiZGlzY3Vzc2VkXCIsXG4gICAgICBcImhvdFwiLFxuICAgICAgXCJiZXN0XCIsXG4gICAgICBcImNvbnRyb3ZlcnNpYWxcIixcbiAgICAgIFwicmFuZG9tXCIsXG4gICAgICBcImZpcmVob3NlXCIsXG4gICAgICBcImNoYXRcIlxuICAgIF1cbiAgfSxcblxuICBUb3BpY0xpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS90Lzp0b3BpYy86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG9waWM6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdG9waWNOYW1lXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBEb21haW5MaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vZG9tYWluLzpkb21haW4vOnNvcnRAfjppbmRleGVyLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRvbWFpbjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9kb21haW5OYW1lXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBUaGluZ0NvbW1lbnRzTGlzdGluZzoge1xuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5ncy86dGhpbmdJZC9jb21tZW50cy86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGhpbmdJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90aGluZ0lkXCIgfSxcbiAgICAgICAgc29ydDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zb3J0TmFtZVwiIH0sXG4gICAgICAgIGluZGV4ZXI6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICB1c2VyTGlzdGluZ1R5cGU6IHtcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIGVudW06IFtcIm92ZXJ2aWV3XCIsIFwic3VibWl0dGVkXCIsIFwiY29tbWVudHNcIiwgXCJjb21tYW5kc1wiLCBcImNvbW1lbnRlZFwiXVxuICB9LFxuXG4gIEF1dGhvclJlcGxpZXNMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7XG4gICAgICAgIENvbnN0YW50cy5QUkVGSVhcbiAgICAgIH0vdXNlci86YXV0aG9ySWQvcmVwbGllcy86dHlwZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHR5cGU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXNlckxpc3RpbmdUeXBlXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgQXV0aG9yUHJvZmlsZUxpc3Rpbmc6IHtcbiAgICBzb3VsOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtDb25zdGFudHMuUFJFRklYfS91c2VyLzphdXRob3JJZC86dHlwZS86c29ydEB+OmluZGV4ZXIuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9LFxuICAgICAgICBzb3J0OiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NvcnROYW1lXCIgfSxcbiAgICAgICAgaW5kZXhlcjogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHR5cGU6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvdXNlckxpc3RpbmdUeXBlXCIgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWxsT2Y6IFt7ICRyZWY6IFwiIy9kZWZpbml0aW9ucy9MaXN0aW5nRGF0YVwiIH1dXG4gIH0sXG5cbiAgU3BhY2VMaXN0aW5nOiB7XG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7XG4gICAgICAgIENvbnN0YW50cy5QUkVGSVhcbiAgICAgIH0vdXNlci86YXV0aG9ySWQvc3BhY2VzLzpuYW1lLzpzb3J0QH46aW5kZXhlci5gLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBhdXRob3JJZDogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy9zZWFBdXRob3JJZFwiIH0sXG4gICAgICAgIHNvcnQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc29ydE5hbWVcIiB9LFxuICAgICAgICBpbmRleGVyOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfSxcbiAgICAgICAgbmFtZTogeyAkcmVmOiBcInNjaGVtYS5qc29uIy9kZWZpbml0aW9ucy90b3BpY05hbWVcIiB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGxPZjogW3sgJHJlZjogXCIjL2RlZmluaXRpb25zL0xpc3RpbmdEYXRhXCIgfV1cbiAgfSxcblxuICBBdXRob3JDb21tZW50czoge1xuICAgIHRpdGxlOiBcIkF1dGhvcidzIENvbW1lbnRzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIG9mIGFuIGF1dGhvcnMgY29tbWVudHMgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vY29tbWVudHN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIEF1dGhvclN1Ym1pc3Npb25zOiB7XG4gICAgdGl0bGU6IFwiQXV0aG9yJ3MgU3VibWlzc2lvbnNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9yJ3Mgc3VibWlzc2lvbnMgc2hvdWxkIGJlIGxpbmtlZCBoZXJlXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vc3VibWlzc2lvbnN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH1cbiAgfSxcblxuICBBdXRob3JUaGluZ3M6IHtcbiAgICB0aXRsZTogXCJBdXRob3IncyBUaGluZ3NcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgb2YgYW4gYXV0aG9yJ3MgdGhpbmdzIHNob3VsZCBiZSBsaW5rZWQgaGVyZVwiLFxuICAgIHNvdWw6IHtcbiAgICAgIHBhdHRlcm46IGAke0NvbnN0YW50cy5QUkVGSVh9L3RoaW5nc346YXV0aG9ySWQuYCxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXV0aG9ySWQ6IHsgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvc2VhQXV0aG9ySWRcIiB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImF1dGhvcklkXCJdXG4gICAgfSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgc2VhOiB7XG4gICAgICAgIGVkZ2VNYXRjaGVzS2V5OiB0cnVlLFxuICAgICAgICBhbnlPZjogW3sgJHJlZjogXCJzY2hlbWEuanNvbiMvZGVmaW5pdGlvbnMvVGhpbmdFZGdlXCIgfV1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgQXV0aG9yUGFnZXM6IHtcbiAgICB0aXRsZTogXCJBdXRob3IgUGFnZSBNYXBcIixcbiAgICBkZXNjcmlwdGlvbjogXCJNYXBwaW5nIG9mIHBhZ2UgbmFtZXMgdG8gdGhpbmdzXCIsXG4gICAgc291bDoge1xuICAgICAgcGF0dGVybjogYCR7Q29uc3RhbnRzLlBSRUZJWH0vcGFnZXN+OmF1dGhvcklkLmAsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1dGhvcklkOiB7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL3NlYUF1dGhvcklkXCIgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJhdXRob3JJZFwiXVxuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICAgIHNlYToge1xuICAgICAgICBlZGdlTWF0Y2hlc0tleTogdHJ1ZSxcbiAgICAgICAgYW55T2Y6IFt7ICRyZWY6IFwic2NoZW1hLmpzb24jL2RlZmluaXRpb25zL1RoaW5nRWRnZVwiIH1dXG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCByb3V0ZXMgPSBSLmtleXMoZGVmaW5pdGlvbnMpLnJlZHVjZSgocmVzdWx0LCBuYW1lKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBSLnBhdGgoW25hbWUsIFwic291bFwiLCBcInBhdHRlcm5cIl0sIGRlZmluaXRpb25zKTtcblxuICBpZiAoIXBhdHRlcm4pIHJldHVybiByZXN1bHQ7XG4gIHJldHVybiBSLmFzc29jKG5hbWUsIG5ldyBSb3V0ZShwYXR0ZXJuKSwgcmVzdWx0KTtcbn0pO1xuXG5jb25zdCBkZWZzV2l0aFJvdXRlcyA9IFIuY29tcG9zZShcbiAgUi5yZWR1Y2UoXG4gICAgKHJlcywgW25hbWUsIHJvdXRlXSkgPT5cbiAgICAgIFIuYXNzb2MobmFtZSwgUi5hc3NvYyhcInJvdXRlXCIsIHJvdXRlLCBSLnByb3AobmFtZSwgZGVmaW5pdGlvbnMpKSwgcmVzKSxcbiAgICB7fVxuICApLFxuICBSLnRvUGFpcnNcbikocm91dGVzKTtcblxuZXhwb3J0IGNvbnN0IFNjaGVtYSA9IHtcbiAgLi4uZGVmc1dpdGhSb3V0ZXMsXG4gIGRlZmluaXRpb25zLFxuICByb3V0ZXNcbn07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcXVlcnksIGFsbCB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tIFwiLi9RdWVyeVwiO1xuaW1wb3J0IHsgQ29tbWVudENvbW1hbmQgfSBmcm9tIFwiLi9Db21tZW50Q29tbWFuZFwiO1xuXG5jb25zdCB0YWJ1bGF0b3JRdWVyeSA9IHF1ZXJ5KGFzeW5jIChzY29wZSwgcm91dGUpID0+IHtcbiAgY29uc3QgdGhpbmdTb3VsID0gU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2Uocm91dGUubWF0Y2gpO1xuICBjb25zdCBbdXAsIGRvd24sIGNvbW1lbnQsIHJlcGx5U291bHNdID0gYXdhaXQgYWxsKFtcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3Rlc3VwYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS92b3Rlc2Rvd25gKS5jb3VudCgpLFxuICAgIHNjb3BlLmdldChgJHt0aGluZ1NvdWx9L2FsbGNvbW1lbnRzYCkuY291bnQoKSxcbiAgICBzY29wZS5nZXQoYCR7dGhpbmdTb3VsfS9jb21tZW50c2ApLnNvdWxzKClcbiAgXSk7XG4gIGNvbnN0IHRoaW5nRGF0YSA9IGF3YWl0IFF1ZXJ5LnRoaW5nRGF0YUZyb21Tb3VscyhyZXBseVNvdWxzKTtcbiAgY29uc3QgY29tbWFuZE1hcCA9IENvbW1lbnRDb21tYW5kLm1hcCh0aGluZ0RhdGEpO1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdXAsXG4gICAgZG93bixcbiAgICBjb21tZW50LFxuICAgIHJlcGxpZXM6IHJlcGx5U291bHMubGVuZ3RoLFxuICAgIHNjb3JlOiB1cCAtIGRvd25cbiAgfTtcblxuICBpZiAoUi5rZXlzKGNvbW1hbmRNYXApLmxlbmd0aCkgcmVzdWx0LmNvbW1hbmRzID0gSlNPTi5zdHJpbmdpZnkoY29tbWFuZE1hcCk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuZXhwb3J0IGNvbnN0IFRhYnVsYXRvciA9IHsgcXVlcnk6IHRhYnVsYXRvclF1ZXJ5IH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVUkkgfSBmcm9tIFwidXJpLWpzXCI7XG5cbmNvbnN0IGJvZHkgPSBSLnByb3BPcihcIlwiLCBcImJvZHlcIik7XG5jb25zdCB1cmwgPSBSLnByb3BPcihcIlwiLCBcInVybFwiKTtcbmNvbnN0IGRvbWFpbiA9IFIuY29tcG9zZShcbiAgdXJsU3RyID0+IHtcbiAgICBpZiAoIXVybFN0cikgcmV0dXJuIFwiXCI7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VVUkkodXJsU3RyKTtcblxuICAgIHJldHVybiAocGFyc2VkLmhvc3QgfHwgcGFyc2VkLnNjaGVtZSB8fCBcIlwiKS5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIik7XG4gIH0sXG4gIHVybFxuKTtcblxuZXhwb3J0IGNvbnN0IFRoaW5nRGF0YU5vZGUgPSB7IGJvZHksIGRvbWFpbiB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuLi9TY2hlbWFcIjtcbmltcG9ydCB7IEd1bk5vZGUgfSBmcm9tIFwiLi4vR3VuTm9kZVwiO1xuXG5jb25zdCBzb3VscyA9IEd1bk5vZGUuZWRnZXM7XG5jb25zdCBpZHMgPSBSLmNvbXBvc2UoXG4gIFIuZmlsdGVyKFIuaWRlbnRpdHkpLFxuICBSLm1hcChcbiAgICBSLmNvbXBvc2UoXG4gICAgICBSLnByb3AoXCJ0aGluZ0lkXCIpLFxuICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoLmJpbmQoU2NoZW1hLlRoaW5nLnJvdXRlKVxuICAgIClcbiAgKSxcbiAgR3VuTm9kZS5lZGdlc1xuKTtcblxuY29uc3QgdW5pb24gPSBSLmNvbXBvc2UoXG4gIFIuZGlzc29jKFwiX1wiKSxcbiAgUi5yZWR1Y2UoUi5tZXJnZVJpZ2h0LCB7fSlcbik7XG5cbmZ1bmN0aW9uIGRheVN0cih0aW1lc3RhbXApIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGNvbnN0IHllYXIgPSBkLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gZC5nZXRVVENNb250aCgpICsgMTtcbiAgY29uc3QgZGF5TnVtID0gZC5nZXRVVENEYXRlKCk7XG5cbiAgcmV0dXJuIGAke3llYXJ9LyR7bW9udGh9LyR7ZGF5TnVtfWA7XG59XG5cbmV4cG9ydCBjb25zdCBUaGluZ1NldCA9IHsgaWRzLCB1bmlvbiwgc291bHMsIGRheVN0ciB9O1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZ3VuLXNjb3BlXCI7XG5pbXBvcnQgb2JqSGFzaCBmcm9tIFwib2JqZWN0LWhhc2hcIjtcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVVJJIH0gZnJvbSBcInVyaS1qc1wiO1xuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIi4uL1NjaGVtYVwiO1xuaW1wb3J0IHsgVGhpbmdTZXQgfSBmcm9tIFwiLi9UaGluZ1NldFwiO1xuXG5leHBvcnQgeyBUaGluZ1NldCB9IGZyb20gXCIuL1RoaW5nU2V0XCI7XG5leHBvcnQgeyBUaGluZ0RhdGFOb2RlIH0gZnJvbSBcIi4vVGhpbmdEYXRhTm9kZVwiO1xuXG5jb25zdCBzb3VsVG9JZCA9IFIuY29tcG9zZShcbiAgUi5wcm9wKFwidGhpbmdJZFwiKSxcbiAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoLmJpbmQoU2NoZW1hLlRoaW5nLnJvdXRlKVxuKTtcblxuY29uc3Qgc291bHNUb0lkcyA9IFIubWFwKHNvdWxUb0lkKTtcblxuY29uc3QgcHV0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBkYXRhLnRpbWVzdGFtcCA9IGRhdGEudGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IG9yaWdpbmFsSGFzaCA9IG9iakhhc2goZGF0YSk7XG4gIGNvbnN0IHsgdGltZXN0YW1wLCBraW5kLCB0b3BpYywgYXV0aG9ySWQsIG9wSWQsIHJlcGx5VG9JZCB9ID0gZGF0YTtcbiAgY29uc3QgdGhpbmdJZCA9IG9iakhhc2goe1xuICAgIHRpbWVzdGFtcCxcbiAgICBraW5kLFxuICAgIHRvcGljLFxuICAgIGF1dGhvcklkLFxuICAgIG9wSWQsXG4gICAgcmVwbHlUb0lkLFxuICAgIG9yaWdpbmFsSGFzaFxuICB9KTtcblxuICBjb25zdCBub2RlID0gcGVlci5ndW4uZ2V0KFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSk7XG4gIGNvbnN0IGRhdGFTb3VsID0gYXV0aG9ySWRcbiAgICA/IFNjaGVtYS5UaGluZ0RhdGFTaWduZWQucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQsIGF1dGhvcklkIH0pXG4gICAgOiBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiBvcmlnaW5hbEhhc2ggfSk7XG5cbiAgY29uc3QgbWV0YURhdGEgPSB7XG4gICAgaWQ6IHRoaW5nSWQsXG4gICAgdGltZXN0YW1wLFxuICAgIGtpbmQsXG4gICAgb3JpZ2luYWxIYXNoLFxuICAgIGRhdGE6IHsgXCIjXCI6IGRhdGFTb3VsIH0sXG4gICAgdm90ZXN1cDogeyBcIiNcIjogU2NoZW1hLlRoaW5nVm90ZXNVcC5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZCB9KSB9LFxuICAgIHZvdGVzZG93bjogeyBcIiNcIjogU2NoZW1hLlRoaW5nVm90ZXNEb3duLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgYWxsY29tbWVudHM6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ0FsbENvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH0sXG4gICAgY29tbWVudHM6IHsgXCIjXCI6IFNjaGVtYS5UaGluZ0NvbW1lbnRzLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkIH0pIH1cbiAgfTtcblxuICBpZiAodG9waWMpXG4gICAgbWV0YURhdGEudG9waWMgPSB7IFwiI1wiOiBTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZTogdG9waWMgfSkgfTtcbiAgaWYgKGF1dGhvcklkKSBtZXRhRGF0YS5hdXRob3IgPSB7IFwiI1wiOiBgfiR7YXV0aG9ySWR9YCB9O1xuICBpZiAob3BJZClcbiAgICBtZXRhRGF0YS5vcCA9IHsgXCIjXCI6IFNjaGVtYS5UaGluZy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogb3BJZCB9KSB9O1xuICBpZiAocmVwbHlUb0lkKVxuICAgIG1ldGFEYXRhLnJlcGx5VG8gPSB7XG4gICAgICBcIiNcIjogU2NoZW1hLlRoaW5nLnJvdXRlLnJldmVyc2UoeyB0aGluZ0lkOiByZXBseVRvSWQgfSlcbiAgICB9O1xuXG4gIHBlZXIuZ3VuLmdldChkYXRhU291bCkucHV0KGRhdGEpO1xuICBub2RlLnB1dChtZXRhRGF0YSk7XG4gIHBlZXIuaW5kZXgodGhpbmdJZCwgZGF0YSk7XG4gIHJldHVybiBub2RlO1xufSk7XG5cbmNvbnN0IHN1Ym1pdCA9IFIuY3VycnkoKHBlZXIsIGRhdGEpID0+IHtcbiAgY29uc3QgdGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKGRhdGEuZG9tYWluKSBkYXRhLmRvbWFpbiA9IGRhdGEuZG9tYWluLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIHRpbWVzdGFtcCwga2luZDogXCJzdWJtaXNzaW9uXCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHN1Ym1pc3Npb25zU291bCA9IFNjaGVtYS5BdXRob3JTdWJtaXNzaW9ucy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcbiAgICBjb25zdCBzdWJtaXNzaW9ucyA9IHBlZXIuZ3VuLmdldChzdWJtaXNzaW9uc1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInN1Ym1pc3Npb25zXCIpXG4gICAgICAucHV0KHN1Ym1pc3Npb25zKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgICBzdWJtaXNzaW9ucy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IGNvbW1lbnQgPSBSLmN1cnJ5KChwZWVyLCBkYXRhKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBwZWVyLmlzTG9nZ2VkSW4oKTtcblxuICBpZiAoZGF0YS50b3BpYykgZGF0YS50b3BpYyA9IGRhdGEudG9waWMudG9Mb3dlckNhc2UoKS50cmltKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgaWYgKHVzZXIpIHtcbiAgICBkYXRhLmF1dGhvciA9IHVzZXIuYWxpYXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBkYXRhLmF1dGhvcklkID0gdXNlci5wdWI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGNvbnN0IHRoaW5nID0gcHV0KHBlZXIsIHsgLi4uZGF0YSwga2luZDogXCJjb21tZW50XCIgfSk7XG5cbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCB0aGluZ3NTb3VsID0gU2NoZW1hLkF1dGhvclRoaW5ncy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IGNvbW1lbnRzU291bCA9IFNjaGVtYS5BdXRob3JDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgIGF1dGhvcklkOiB1c2VyLnB1YlxuICAgIH0pO1xuICAgIGNvbnN0IHRoaW5ncyA9IHBlZXIuZ3VuLmdldCh0aGluZ3NTb3VsKTtcbiAgICBjb25zdCBjb21tZW50cyA9IHBlZXIuZ3VuLmdldChjb21tZW50c1NvdWwpO1xuXG4gICAgcGVlci5ndW5cbiAgICAgIC51c2VyKClcbiAgICAgIC5nZXQoXCJ0aGluZ3NcIilcbiAgICAgIC5wdXQodGhpbmdzKTtcbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcImNvbW1lbnRzXCIpXG4gICAgICAucHV0KGNvbW1lbnRzKTtcbiAgICB0aGluZ3Muc2V0KHRoaW5nKTtcbiAgICBjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgLy8gcGVlci5ndW4udXNlcigpLmdldChcImNvbW1lbnRzXCIpLnB1dChwZWVyLmd1bi51c2VyKCkuZ2V0KFwiY29tbWVudHNcIikpO1xuXG4gIHJldHVybiB0aGluZztcbn0pO1xuXG5jb25zdCBjaGF0ID0gUi5jdXJyeSgocGVlciwgZGF0YSkgPT4ge1xuICBjb25zdCB1c2VyID0gcGVlci5pc0xvZ2dlZEluKCk7XG5cbiAgaWYgKGRhdGEudG9waWMpIGRhdGEudG9waWMgPSBkYXRhLnRvcGljLnRvTG93ZXJDYXNlKCkudHJpbSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGlmICh1c2VyKSB7XG4gICAgZGF0YS5hdXRob3IgPSB1c2VyLmFsaWFzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZGF0YS5hdXRob3JJZCA9IHVzZXIucHViOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBjb25zdCB0aGluZyA9IHB1dChwZWVyLCB7IC4uLmRhdGEsIGtpbmQ6IFwiY2hhdG1zZ1wiIH0pO1xuXG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgdGhpbmdzU291bCA9IFNjaGVtYS5BdXRob3JUaGluZ3Mucm91dGUucmV2ZXJzZSh7XG4gICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICB9KTtcbiAgICBjb25zdCB0aGluZ3MgPSBwZWVyLmd1bi5nZXQodGhpbmdzU291bCk7XG5cbiAgICBwZWVyLmd1blxuICAgICAgLnVzZXIoKVxuICAgICAgLmdldChcInRoaW5nc1wiKVxuICAgICAgLnB1dCh0aGluZ3MpO1xuICAgIHRoaW5ncy5zZXQodGhpbmcpO1xuICB9XG5cbiAgcmV0dXJuIHRoaW5nO1xufSk7XG5cbmNvbnN0IHdyaXRlUGFnZSA9IFIuY3VycnkoKHBlZXIsIG5hbWUsIGJvZHkpID0+IHtcbiAgY29uc3QgdXNlciA9IHBlZXIuaXNMb2dnZWRJbigpO1xuXG4gIGlmICghdXNlcikgcmV0dXJuIFByb21pc2UucmVqZWN0KFwibm90IGxvZ2dlZCBpblwiKTtcbiAgbGV0IHRoaW5nO1xuICBjb25zdCBwYWdlc1NvdWwgPSBTY2hlbWEuQXV0aG9yUGFnZXMucm91dGUucmV2ZXJzZSh7IGF1dGhvcklkOiB1c2VyLnB1YiB9KTtcbiAgY29uc3QgY2hhaW4gPSBwZWVyLmd1bi5nZXQocGFnZXNTb3VsKS5nZXQobmFtZSk7XG5cbiAgcmV0dXJuIGNoYWluLnRoZW4ocmVzID0+IHtcbiAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc1wiLCByZXMpO1xuICAgICAgY2hhaW5cbiAgICAgICAgLmdldChcImRhdGFcIilcbiAgICAgICAgLmdldChcImJvZHlcIilcbiAgICAgICAgLnB1dChib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgYm9keSxcbiAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgIGtpbmQ6IFwid2lraXBhZ2VcIixcbiAgICAgICAgYXV0aG9yOiB1c2VyLmFsaWFzLFxuICAgICAgICBhdXRob3JJZDogdXNlci5wdWJcbiAgICAgIH07XG5cbiAgICAgIGNvbnNvbGUubG9nKFwicGFnZSBkYXRhXCIsIGRhdGEpO1xuICAgICAgdGhpbmcgPSBwdXQocGVlciwgZGF0YSk7XG4gICAgICBjaGFpbi5wdXQodGhpbmcpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuY29uc3Qgdm90ZSA9IFIuY3VycnkoKHBlZXIsIGlkLCBraW5kLCBub25jZSkgPT4ge1xuICBjb25zdCB2b3RlcyA9IHBlZXIuZ3VuLmdldChcbiAgICBTY2hlbWFba2luZCA9PT0gXCJ1cFwiID8gXCJUaGluZ1ZvdGVzVXBcIiA6IFwiVGhpbmdWb3Rlc0Rvd25cIl0ucm91dGUucmV2ZXJzZSh7XG4gICAgICB0aGluZ0lkOiBpZFxuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIHZvdGVzLmdldChub25jZSkucHV0KFwiMVwiKTtcbn0pO1xuXG5jb25zdCB0b3BpY1ByZWZpeGVzID0ge1xuICBjaGF0bXNnOiBcImNoYXQ6XCIsXG4gIGNvbW1lbnQ6IFwiY29tbWVudHM6XCJcbn07XG5cbmNvbnN0IGluZGV4ID0gUi5jdXJyeSgocGVlciwgdGhpbmdJZCwgZGF0YSkgPT4ge1xuICBpZiAoIWRhdGEudG9waWMgJiYgIWRhdGEub3BJZCkgcmV0dXJuO1xuXG4gIGlmIChkYXRhLm9wSWQgJiYgIWRhdGEudG9waWMpIHtcbiAgICBwZWVyLmd1blxuICAgICAgLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQ6IGRhdGEub3BJZCB9KSlcbiAgICAgIC5nZXQoXCJkYXRhXCIpXG4gICAgICAub24oZnVuY3Rpb24gcmVjdih0ZCkge1xuICAgICAgICBpZiAoIXRkKSByZXR1cm47XG4gICAgICAgIGluZGV4KHBlZXIsIHRoaW5nSWQsIHsgLi4uZGF0YSwgdG9waWM6IHRkLnRvcGljIHx8IFwiYWxsXCIgfSk7XG4gICAgICAgIHRoaXMub2ZmKCk7XG4gICAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0aGluZyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVGhpbmcucm91dGUucmV2ZXJzZSh7IHRoaW5nSWQgfSkpO1xuICBjb25zdCBkYXlTdHIgPSBUaGluZ1NldC5kYXlTdHIoZGF0YS50aW1lc3RhbXApO1xuICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXlTdHIuc3BsaXQoXCIvXCIpO1xuICBjb25zdCB0b3BpY1ByZWZpeCA9IHRvcGljUHJlZml4ZXNbZGF0YS5raW5kXSB8fCBcIlwiO1xuICBjb25zdCBiYXNlVG9waWNOYW1lID0gZGF0YS50b3BpYy50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3QgdG9waWNOYW1lID0gdG9waWNQcmVmaXggKyBiYXNlVG9waWNOYW1lO1xuICBjb25zdCB0b3BpYyA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVG9waWMucm91dGUucmV2ZXJzZSh7IHRvcGljTmFtZSB9KSk7XG4gIGNvbnN0IHRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgIFNjaGVtYS5Ub3BpY0RheS5yb3V0ZS5yZXZlcnNlKHsgdG9waWNOYW1lLCB5ZWFyLCBtb250aCwgZGF5IH0pXG4gICk7XG5cbiAgaWYgKCFkYXRhLnNraXBBbGwgJiYgZGF0YS50b3BpYyAhPT0gXCJhbGxcIikge1xuICAgIGNvbnN0IGFsbG5hbWUgPSBgJHt0b3BpY1ByZWZpeH1hbGxgO1xuICAgIGNvbnN0IGFsbFRvcGljID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljLnJvdXRlLnJldmVyc2UoeyB0b3BpY05hbWU6IGFsbG5hbWUgfSlcbiAgICApO1xuICAgIGNvbnN0IGFsbFRvcGljRGF5ID0gcGVlci5ndW4uZ2V0KFxuICAgICAgU2NoZW1hLlRvcGljRGF5LnJvdXRlLnJldmVyc2Uoe1xuICAgICAgICB0b3BpY05hbWU6IGFsbG5hbWUsXG4gICAgICAgIHllYXIsXG4gICAgICAgIG1vbnRoLFxuICAgICAgICBkYXlcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGFsbFRvcGljLnNldCh0aGluZyk7XG4gICAgYWxsVG9waWNEYXkuc2V0KHRoaW5nKTtcbiAgfVxuXG4gIGlmIChkYXRhLmtpbmQgPT09IFwic3VibWlzc2lvblwiKSB7XG4gICAgY29uc3QgdXJsSW5mbyA9IGRhdGEudXJsID8gcGFyc2VVUkkoZGF0YS51cmwpIDoge307XG4gICAgY29uc3QgZG9tYWluTmFtZSA9IChkYXRhLnVybFxuICAgICAgPyAodXJsSW5mby5ob3N0IHx8IHVybEluZm8uc2NoZW1lIHx8IFwiXCIpLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKVxuICAgICAgOiBgc2VsZi4ke2RhdGEudG9waWN9YFxuICAgICkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBkb21haW4gPSBwZWVyLmd1bi5nZXQoU2NoZW1hLkRvbWFpbi5yb3V0ZS5yZXZlcnNlKHsgZG9tYWluTmFtZSB9KSk7XG5cbiAgICBkb21haW4uc2V0KHRoaW5nKTtcblxuICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgY29uc3QgdXJsTm9kZSA9IHBlZXIuZ3VuLmdldChTY2hlbWEuVVJMLnJvdXRlLnJldmVyc2UoeyB1cmw6IGRhdGEudXJsIH0pKTtcblxuICAgICAgLy8gdGhpbmcuZ2V0KFwidXJsXCIpLnB1dCh1cmxOb2RlKTtcbiAgICAgIHVybE5vZGUuc2V0KHRoaW5nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZGF0YS5vcElkKSB7XG4gICAgY29uc3QgYWxsY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdBbGxDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHsgdGhpbmdJZDogZGF0YS5vcElkIH0pXG4gICAgKTtcblxuICAgIGFsbGNvbW1lbnRzLnNldCh0aGluZyk7XG4gIH1cblxuICBpZiAoZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkKSB7XG4gICAgY29uc3QgY29tbWVudHMgPSBwZWVyLmd1bi5nZXQoXG4gICAgICBTY2hlbWEuVGhpbmdDb21tZW50cy5yb3V0ZS5yZXZlcnNlKHtcbiAgICAgICAgdGhpbmdJZDogZGF0YS5yZXBseVRvSWQgfHwgZGF0YS5vcElkXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb21tZW50cy5zZXQodGhpbmcpO1xuICB9XG5cbiAgdG9waWMuc2V0KHRoaW5nKTtcbiAgdG9waWNEYXkuc2V0KHRoaW5nKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgVGhpbmcgPSB7XG4gIHNvdWxUb0lkLFxuICBzb3Vsc1RvSWRzLFxuICBwdXQsXG4gIHN1Ym1pdCxcbiAgY29tbWVudCxcbiAgY2hhdCxcbiAgd3JpdGVQYWdlLFxuICB2b3RlLFxuICBpbmRleFxufTtcbiIsImltcG9ydCAqIGFzIFIgZnJvbSBcInJhbWRhXCI7XG5cbmNvbnN0IHRva2VuaXplID0gc291cmNlID0+IHtcbiAgY29uc3QgdG9rZW5NYXAgPSAoc291cmNlIHx8IFwiXCIpLnNwbGl0KFwiXFxuXCIpLnJlZHVjZSgoZGVmLCBsaW5lKSA9PiB7XG4gICAgY29uc3QgdG9rZW5zID0gbGluZVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLm1hcChSLnRyaW0pXG4gICAgICAuZmlsdGVyKHggPT4geCk7XG5cbiAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHJldHVybiBkZWY7XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKHRva2Vucywge30sIGRlZik7XG4gIH0sIHt9KTtcblxuICBjb25zdCBpc1ByZXNlbnQgPSBwID0+IHtcbiAgICBsZXQgY2hlY2sgPSBwO1xuXG4gICAgaWYgKHR5cGVvZiBwID09PSBcInN0cmluZ1wiKSBjaGVjayA9IHAuc3BsaXQoXCIgXCIpO1xuICAgIHJldHVybiBjaGVjayAmJiBSLnBhdGgoY2hlY2ssIHRva2VuTWFwKTtcbiAgfTtcblxuICBjb25zdCBnZXRWYWx1ZXMgPSBwID0+IFIua2V5c0luKGlzUHJlc2VudChwKSk7XG4gIGNvbnN0IGdldFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocClbMF0gfHwgbnVsbDtcbiAgY29uc3QgZ2V0TGFzdFZhbHVlID0gcCA9PiBnZXRWYWx1ZXMocCkucG9wKCkgfHwgbnVsbDtcblxuICBjb25zdCBnZXRWYWx1ZUNoYWluID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgIGxldCBuZXh0ID0gcDtcblxuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBuZXh0ID0gZ2V0VmFsdWUoWy4uLmtleXMsIC4uLnZhbHVlc10pO1xuICAgICAgbmV4dCAmJiB2YWx1ZXMucHVzaChuZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFBhaXJzID0gcCA9PiB7XG4gICAgY29uc3Qga2V5cyA9IHR5cGVvZiBwID09PSBcInN0cmluZ1wiID8gcC5zcGxpdChcIiBcIikgOiBwO1xuXG4gICAgcmV0dXJuIGdldFZhbHVlcyhrZXlzKS5yZWR1Y2UoKHBhaXJzLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGdldFZhbHVlKFsuLi5rZXlzLCBrZXldKTtcblxuICAgICAgcmV0dXJuIFsuLi5wYWlycywgW2tleSwgdmFsXV07XG4gICAgfSwgW10pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlLFxuICAgIGlzUHJlc2VudCxcbiAgICBnZXRWYWx1ZSxcbiAgICBnZXRWYWx1ZXMsXG4gICAgZ2V0TGFzdFZhbHVlLFxuICAgIGdldFZhbHVlQ2hhaW4sXG4gICAgZ2V0UGFpcnNcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2tlbml6ZXIgPSB7IHRva2VuaXplIH07XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IG9iakhhc2ggZnJvbSBcIm9iamVjdC1oYXNoXCI7XG5pbXBvcnQgeyBjcmVhdGVTdXBwcmVzc29yIH0gZnJvbSBcImd1bi1zdXBwcmVzc29yXCI7XG5pbXBvcnQgKiBhcyBzZWEgZnJvbSBcImd1bi1zdXBwcmVzc29yLXNlYXJcIjtcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCIuL1NjaGVtYVwiO1xuXG5jb25zdCBpc0xlZ2FjeVRoaW5nID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBkYXRhU291bCA9IFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSk7XG4gIGNvbnN0IG5ld2VzdCA9IFIud2l0aG91dChcbiAgICBbXCJjb21tZW50c1wiLCBcImFsbGNvbW1lbnRzXCIsIFwidm90ZXN1cFwiLCBcInZvdGVzZG93blwiXSxcbiAgICBSLmtleXMoUi5wYXRoKFtcIl9cIiwgXCI+XCJdLCBkYXRhKSlcbiAgKVxuICAgIC5tYXAoa2V5ID0+IFIucGF0aChbXCJfXCIsIFwiPlwiLCBrZXldLCBkYXRhKSlcbiAgICAuc29ydCgpXG4gICAgLnBvcCgpO1xuICBjb25zdCB7IHRoaW5nSWQgfSA9IHNjaGVtYS5UaGluZ0RhdGEucm91dGUubWF0Y2goZGF0YVNvdWwpIHx8IHt9O1xuICBjb25zdCBpZCA9IFIucHJvcChcImlkXCIsIGRhdGEpO1xuXG4gIHJldHVybiBpZCAmJiBpZCA9PT0gdGhpbmdJZCAmJiBuZXdlc3QgJiYgbmV3ZXN0IDwgMTU0MzEwMjgxNDk0NTtcbn07XG5cbmNvbnN0IHRoaW5nSGFzaE1hdGNoZXNTb3VsID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgaWQgPSBSLnByb3AoXCJpZFwiLCBkYXRhKTtcblxuICByZXR1cm4gKFxuICAgIGlkICYmXG4gICAgaWQgPT09XG4gICAgICBvYmpIYXNoKHtcbiAgICAgICAgYXV0aG9ySWQ6IChSLnBhdGgoW1wiYXV0aG9yXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikuc3Vic3RyKDEpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGltZXN0YW1wOiBwYXJzZUludChSLnByb3AoXCJ0aW1lc3RhbXBcIiwgZGF0YSksIDEwKSxcbiAgICAgICAga2luZDogUi5wcm9wKFwia2luZFwiLCBkYXRhKSxcbiAgICAgICAgdG9waWM6IFIucHJvcChcbiAgICAgICAgICBcInRvcGljTmFtZVwiLFxuICAgICAgICAgIFNjaGVtYS5Ub3BpYy5yb3V0ZS5tYXRjaChSLnBhdGgoW1widG9waWNcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgb3BJZDogUi5wcm9wKFxuICAgICAgICAgIFwidGhpbmdJZFwiLFxuICAgICAgICAgIFNjaGVtYS5UaGluZy5yb3V0ZS5tYXRjaChSLnBhdGgoW1wib3BcIiwgXCIjXCJdLCBkYXRhKSlcbiAgICAgICAgKSxcbiAgICAgICAgcmVwbHlUb0lkOiBSLnByb3AoXG4gICAgICAgICAgXCJ0aGluZ0lkXCIsXG4gICAgICAgICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJyZXBseVRvXCIsIFwiI1wiXSwgZGF0YSkpXG4gICAgICAgICksXG4gICAgICAgIG9yaWdpbmFsSGFzaDogUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpXG4gICAgICB9KVxuICApO1xufTtcblxuY29uc3Qgc2lnbmVkVGhpbmdEYXRhTWF0Y2hlcyA9IChfc2NoZW1hLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGF1dGhvcklkID0gKFIucGF0aChbXCJhdXRob3JcIiwgXCIjXCJdLCBkYXRhKSB8fCBcIlwiKS5zdWJzdHIoMSkgfHwgdW5kZWZpbmVkO1xuICBjb25zdCBzaWduZWRJZCA9IFIucHJvcChcbiAgICBcImF1dGhvcklkXCIsXG4gICAgU2NoZW1hLlRoaW5nRGF0YVNpZ25lZC5yb3V0ZS5tYXRjaChSLnBhdGgoW1wiZGF0YVwiLCBcIiNcIl0sIGRhdGEpKVxuICApO1xuXG4gIHJldHVybiBhdXRob3JJZCAmJiBhdXRob3JJZCA9PT0gc2lnbmVkSWQ7XG59O1xuXG5jb25zdCB0aGluZ0RhdGFNYXRjaGVzT3JpZ2luYWxIYXNoID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3Qgb3JpZ2luYWxIYXNoID0gUi5wcm9wKFwib3JpZ2luYWxIYXNoXCIsIGRhdGEpO1xuICBjb25zdCBpZCA9IFIucHJvcChcbiAgICBcInRoaW5nSWRcIixcbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJkYXRhXCIsIFwiI1wiXSwgZGF0YSkpXG4gICk7XG5cbiAgcmV0dXJuIGlkICYmIGlkID09PSBvcmlnaW5hbEhhc2g7XG59O1xuXG5jb25zdCBnZXRJc1RoaW5nUmVsYXRlZEVkZ2UgPSBhanYgPT4gKFxuICBub2RlVHlwZU5hbWUsXG4gIGRhdGEsXG4gIF9wU2NoZW1hLFxuICBfY1BhdGgsXG4gIHBhcmVudERhdGFcbikgPT4ge1xuICBjb25zdCB7IHRoaW5nSWQgfSA9XG4gICAgU2NoZW1hLlRoaW5nLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgcGFyZW50RGF0YSkgfHwgXCJcIikgfHwge307XG4gIGNvbnN0IHsgdGhpbmdJZDogcHJvcFRoaW5nSWQgfSA9IFNjaGVtYVtub2RlVHlwZU5hbWVdLnJvdXRlLm1hdGNoKFxuICAgIFIucHJvcChcIiNcIiwgZGF0YSkgfHwgXCJcIlxuICApO1xuXG4gIGlmICghdGhpbmdJZCB8fCB0aGluZ0lkICE9PSBwcm9wVGhpbmdJZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gYWp2LmNvbXBpbGUoeyAkcmVmOiBgc2NoZW1hLmpzb24jL2RlZmluaXRpb25zLyR7bm9kZVR5cGVOYW1lfUVkZ2VgIH0pKFxuICAgIGRhdGFcbiAgKTtcbn07XG5cbmNvbnN0IHRoaW5nRGF0YUhhc2hNYXRjaGVzID0gKF9zY2hlbWEsIGRhdGEpID0+IHtcbiAgY29uc3QgeyBfLCAuLi5yZWNvcmQgfSA9IGRhdGEgfHwge307IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICByZWNvcmQudGltZXN0YW1wID0gcGFyc2VGbG9hdChyZWNvcmQudGltZXN0YW1wLCAxMCk7XG4gIGNvbnN0IHsgdGhpbmdJZCB9ID1cbiAgICBTY2hlbWEuVGhpbmdEYXRhLnJvdXRlLm1hdGNoKFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSkgfHwgXCJcIikgfHwge307XG5cbiAgcmV0dXJuIHRoaW5nSWQgJiYgdGhpbmdJZCA9PT0gb2JqSGFzaChyZWNvcmQpO1xufTtcblxuY29uc3QgaXNWb3RlVmFsaWQgPSAoYXJnb24yLCBzY2hlbWEsIHByZWZpeCwgdm90ZSkgPT4ge1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiLCBjb25maWcgPSB7fSB9ID0gc2NoZW1hIHx8IHt9O1xuXG4gIGNvbnN0IG5vbmNlID0gQnVmZmVyLmhhc093blByb3BlcnR5KFwiZnJvbVwiKVxuICAgID8gQnVmZmVyLmZyb20odm90ZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIodm90ZSwgXCJoZXhcIik7XG4gIGNvbnN0IHNhbHQgPSBCdWZmZXIuaGFzT3duUHJvcGVydHkoXCJmcm9tXCIpXG4gICAgPyBCdWZmZXIuZnJvbShub25jZSwgXCJoZXhcIilcbiAgICA6IG5ldyBCdWZmZXIobm9uY2UsIFwiaGV4XCIpO1xuICBjb25zdCBoYXNoID0gYXJnb24yLmhhc2gocHJlZml4LCB7XG4gICAgc2FsdCxcbiAgICBoYXNoTGVuZ3RoOiBjb25maWcuaGFzaExlbmd0aCxcbiAgICB0aW1lQ29zdDogY29uZmlnLnRpbWVDb3N0LFxuICAgIG1lbW9yeUNvc3Q6IGNvbmZpZy5tZW1vcnlDb3N0LFxuICAgIHBhcmFsbGVsaXNtOiBjb25maWcucGFyYWxsZWxpc20sXG4gICAgcmF3OiB0cnVlLFxuICAgIHR5cGU6IGFyZ29uMlthbGdvcml0aG1dXG4gIH0pO1xuICBsZXQgb2ZmID0gMDtcbiAgbGV0IGk7XG5cbiAgZm9yIChpID0gMDsgaSA8PSBjb25maWcuY29tcGxleGl0eSAtIDg7IGkgKz0gOCwgb2ZmKyspIHtcbiAgICBpZiAoaGFzaFtvZmZdICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWFzayA9IDB4ZmYgPDwgKDggKyBpIC0gY29uZmlnLmNvbXBsZXhpdHkpO1xuXG4gIHJldHVybiAoaGFzaFtvZmZdICYgbWFzaykgPT09IDA7XG59O1xuXG5jb25zdCBrZXlzQXJlUHJvb2ZzT2ZXb3JrID0gKHNjaGVtYSwgZGF0YSkgPT4ge1xuICBjb25zdCBhcmdvbjIgPSByZXF1aXJlKFwiYXJnb24yXCIpO1xuXG4gIGlmICghYXJnb24yKSByZXR1cm4gdHJ1ZTsgLy8gaW4gYnJvd3NlciBkb24ndCBib3RoZXIgZm9yIG5vd1xuICBjb25zdCB7IGFsZ29yaXRobSA9IFwiYXJnb24yZFwiIH0gPSBzY2hlbWEgfHwge307XG4gIGNvbnN0IHByZWZpeCA9IFIucGF0aChbXCJfXCIsIFwiI1wiXSwgZGF0YSk7XG5cbiAgaWYgKGFsZ29yaXRobSAhPT0gXCJhcmdvbjJkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGFyZ29uMiBzdXBwb3J0ZWQgZm9yIHZvdGUgaGFzaGVzXCIpO1xuICB9XG5cbiAgUi53aXRob3V0KFtcIl9cIl0sIFIua2V5cyhkYXRhKSkuZm9yRWFjaCh2b3RlID0+IHtcbiAgICBpZiAoIWlzVm90ZVZhbGlkKGFyZ29uMiwgc2NoZW1hLCBwcmVmaXgsIHZvdGUpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgdm90ZVwiLCBwcmVmaXgsIHZvdGUpO1xuICAgICAgZGVsZXRlIGRhdGFbdm90ZV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBpbml0QWp2ID0gUi5jb21wb3NlKFxuICBhanYgPT4ge1xuICAgIGFqdi5hZGRLZXl3b3JkKFwiaXNMZWdhY3lUaGluZ1wiLCB7XG4gICAgICB2YWxpZGF0ZTogaXNMZWdhY3lUaGluZ1xuICAgIH0pO1xuICAgIGFqdi5hZGRLZXl3b3JkKFwidGhpbmdIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nSGFzaE1hdGNoZXNTb3VsXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJzaWduZWRUaGluZ0RhdGFNYXRjaGVzVGhpbmdcIiwge1xuICAgICAgdmFsaWRhdGU6IHNpZ25lZFRoaW5nRGF0YU1hdGNoZXNcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2hcbiAgICB9KTtcbiAgICBhanYuYWRkS2V5d29yZChcInRoaW5nUmVsYXRlZEVkZ2VcIiwge1xuICAgICAgdmFsaWRhdGU6IGdldElzVGhpbmdSZWxhdGVkRWRnZShhanYpXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJ0aGluZ0RhdGFIYXNoTWF0Y2hlc1NvdWxcIiwge1xuICAgICAgdmFsaWRhdGU6IHRoaW5nRGF0YUhhc2hNYXRjaGVzXG4gICAgfSk7XG4gICAgYWp2LmFkZEtleXdvcmQoXCJrZXlzQXJlUHJvb2ZzT2ZXb3JrXCIsIHtcbiAgICAgIHZhbGlkYXRlOiBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICAgICAgbW9kaWZ5aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGFqdjtcbiAgfSxcbiAgc2VhLmluaXRBanZcbik7XG5cbmV4cG9ydCBjb25zdCBzdXBwcmVzc29yID0gY3JlYXRlU3VwcHJlc3Nvcih7XG4gIGRlZmluaXRpb25zOiBTY2hlbWEuZGVmaW5pdGlvbnMsXG4gIGluaXQ6IGluaXRBanZcbn0pO1xuXG5jb25zdCBndW5XaXJlSW5wdXQgPSBSLmN1cnJ5KChwZWVyLCBjb250ZXh0KSA9PlxuICBjb250ZXh0Lm9uKFwiaW5cIiwgZnVuY3Rpb24gd2lyZUlucHV0KG1zZykge1xuICAgIGNvbnN0IF8gPSBtc2dbXCJfXCJdO1xuXG4gICAgZGVsZXRlIG1zZ1tcIl9cIl07XG4gICAgaWYgKFwicGluZ1wiIGluIG1zZyB8fCBcImxlZWNoXCIgaW4gbXNnKSByZXR1cm47XG4gICAgaWYgKG1zZy5wdXQgJiYgIVIua2V5cyhtc2cucHV0KS5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBwcm9taXNlID0gcGVlci5jb25maWcuZGlzYWJsZVZhbGlkYXRpb25cbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKG1zZylcbiAgICAgIDogc3VwcHJlc3Nvci52YWxpZGF0ZShtc2cpO1xuXG4gICAgcHJvbWlzZVxuICAgICAgLnRoZW4odmFsaWRhdGVkID0+IHtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHJldHVybiBjb25zb2xlLmxvZyhcIm1zZyBkaWRuJ3QgdmFsaWRhdGVcIiwgbXNnKTtcbiAgICAgICAgbXNnW1wiX1wiXSA9IF87XG4gICAgICAgIHJldHVybiB0aGlzLnRvLm5leHQobXNnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJ2YWxpZGF0ZSBlcnJcIiwgbXNnLCBlcnIuc3RhY2sgfHwgZXJyKSk7XG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgVmFsaWRhdGlvbiA9IHtcbiAgaXNMZWdhY3lUaGluZyxcbiAgdGhpbmdIYXNoTWF0Y2hlc1NvdWwsXG4gIHNpZ25lZFRoaW5nRGF0YU1hdGNoZXMsXG4gIHRoaW5nRGF0YU1hdGNoZXNPcmlnaW5hbEhhc2gsXG4gIGdldElzVGhpbmdSZWxhdGVkRWRnZSxcbiAgdGhpbmdEYXRhSGFzaE1hdGNoZXMsXG4gIGlzVm90ZVZhbGlkLFxuICBrZXlzQXJlUHJvb2ZzT2ZXb3JrLFxuICBpbml0QWp2LFxuICBzdXBwcmVzc29yLFxuICBndW5XaXJlSW5wdXRcbn07XG4iLCJpbXBvcnQgeyBQZWVyIH0gZnJvbSBcIi4vUGVlclwiO1xuZXhwb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vQ29uZmlnXCI7XG5leHBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmV4cG9ydCB7IENvbW1lbnRDb21tYW5kIH0gZnJvbSBcIi4vQ29tbWVudENvbW1hbmRcIjtcbmV4cG9ydCB7IExpc3RpbmcsIFNwYWNlU3BlYyB9IGZyb20gXCIuL0xpc3RpbmdcIjtcbmV4cG9ydCB7IFBlZXIgfSBmcm9tIFwiLi9QZWVyXCI7XG5leHBvcnQgeyBRdWVyeSB9IGZyb20gXCIuL1F1ZXJ5XCI7XG5leHBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiLi9TY2hlbWFcIjtcbmV4cG9ydCB7IFRoaW5nLCBUaGluZ1NldCwgVGhpbmdEYXRhTm9kZSB9IGZyb20gXCIuL1RoaW5nXCI7XG5leHBvcnQgeyBWYWxpZGF0aW9uIH0gZnJvbSBcIi4vVmFsaWRhdGlvblwiO1xuZXhwb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJndW4tc2NvcGVcIjtcbmV4cG9ydCB7IFRhYnVsYXRvciB9IGZyb20gXCIuL1RhYnVsYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgUGVlci5pbml0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2FyZ29uMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ndW5fc2NvcGVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3JfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3VuX3N1cHByZXNzb3Jfc2Vhcl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9vYmplY3RfaGFzaF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yYW1kYV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yb3V0ZV9wYXJzZXJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdXJpX2pzX187Il0sInNvdXJjZVJvb3QiOiIifQ==