import { createSuppressor } from '@notabug/gun-suppressor';
import { AUTH_SCHEMA, initAjv } from '@notabug/gun-suppressor-sear';
import objHash from 'object-hash';
import { parse } from 'uri-js';
import Route from 'route-parser';
import memoize from 'fast-memoize';
import * as R from 'ramda';
import { compose, map, toPairs, trim, split, replace, defaultTo, nth, reduce, pathOr, test, assocPath, keys, without, keysIn, propOr, tap, uniqBy, values, mergeLeft, always, uniq, assoc, curry, prop, path, dissoc, difference, omit, slice, filter, sortWith, ascend, cond, isNil, T, identity, addIndex, indexBy, concat, apply, juxt, sortBy, includes, multiply, pipe, equals, of, find, pathEq, identical, last, lte, gte, match, mergeRight, pick, toLower, ifElse } from 'ramda';
import { query, resolve, scope, all } from '@notabug/gun-scope';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var COMMAND_RE = /^ {4}~/;
var PREFIX = 'nab';
var SOUL_DELIMETER = '|~~|';
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
var CHAT_PRELOAD_ITEMS = 10;
var INDEXER = 'CEyKrDd1xyPXpWSV00MgvnZY2VJLHXgzCvhMeDwKTYA.yjSq0DyXzzhB_ZXr_DzfJgij3tXU0-3t0Q5bJAtZpj8';
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
    CHAT_PRELOAD_ITEMS: CHAT_PRELOAD_ITEMS,
    INDEXER: INDEXER
};

var definitions = __assign({}, AUTH_SCHEMA, { topicName: {
        type: 'string',
        minLength: 1,
        maxLength: Constants.MAX_TOPIC_SIZE
    }, TopicDay: {
        title: 'Topic Day',
        description: 'A single day of things in a topic',
        soul: {
            pattern: Constants.PREFIX + "/topics/:topicName/days/:year/:month/:day",
            properties: {
                topicName: { $ref: 'schema.json#/definitions/topicName' },
                year: { type: 'number', minimum: 2018, maximum: 2100 },
                month: { type: 'number', minimum: 1, maximum: 12 },
                day: { type: 'number', minimum: 1, maximum: 31 }
            },
            required: ['topicName', 'year', 'month', 'day']
        },
        propsFromSoul: { name: 'topicName' },
        properties: {
            name: {
                description: 'Deprecated as unnecessary',
                type: 'string'
            }
        },
        additionalProperties: {
            edgeMatchesKey: true,
            anyOf: [{ $ref: '#/definitions/ThingEdge' }, { $ref: '#/definitions/TopicEdge' }]
        }
    }, Topic: {
        title: 'Topic',
        description: 'All things in a topic',
        soul: {
            pattern: Constants.PREFIX + "/topics/:topicName",
            properties: {
                topicName: { $ref: 'schema.json#/definitions/topicName' }
            },
            required: ['topicName']
        },
        propsFromSoul: { name: 'topicName' },
        properties: {
            name: {
                description: 'Deprecated as unnecessary',
                type: 'string'
            }
        },
        additionalProperties: {
            edgeMatchesKey: true,
            anyOf: [{ $ref: '#/definitions/ThingEdge' }, { $ref: '#/definitions/TopicEdge' }]
        }
    }, domainName: {
        type: 'string',
        minLength: 1,
        maxLength: Constants.MAX_DOMAIN_SIZE
    }, Domain: {
        title: 'Domain',
        description: 'All things in a domain',
        soul: {
            pattern: Constants.PREFIX + "/domains/:domainName",
            properties: {
                domainName: { $ref: 'schema.json#/definitions/domainName' }
            },
            required: ['domainName']
        },
        additionalProperties: {
            edgeMatchesKey: true,
            anyOf: [{ $ref: '#/definitions/ThingEdge' }]
        }
    }, url: { type: ['null', 'string'], maxLength: Constants.MAX_URL_SIZE }, URL: {
        title: 'URL',
        description: 'All things for a given URL',
        soul: {
            pattern: Constants.PREFIX + "/urls/*url",
            properties: {
                url: { $ref: 'schema.json#/definitions/url' }
            },
            required: ['url']
        },
        additionalProperties: {
            edgeMatchesKey: true,
            anyOf: [{ $ref: '#/definitions/ThingEdge' }]
        }
    }, thingId: {
        type: 'string',
        maxLength: Constants.MAX_HASH_SIZE
    }, thingSoul: {
        properties: {
            thingId: { '#ref': '#definitions/thingId' }
        }
    }, ThingAllComments: {
        title: 'Thing All Comments',
        description: 'All comments for a given submission',
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/allcomments",
            allOf: [{ $ref: 'schema.json#/definitions/thingSoul' }]
        },
        additionalProperties: {
            edgeMatchesKey: true,
            anyOf: [{ $ref: '#/definitions/ThingEdge' }]
        }
    }, ThingComments: {
        title: 'Thing Comments',
        description: 'Direct replies to a thing',
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/comments",
            allOf: [{ $ref: 'schema.json#/definitions/thingSoul' }]
        },
        additionalProperties: {
            edgeMatchesKey: true,
            anyOf: [{ $ref: '#/definitions/ThingEdge' }]
        }
    }, timestamp: { type: ['number', 'string'] }, thingKind: {
        type: 'string',
        maxLength: Constants.MAX_THING_KIND_SIZE
    }, Thing: {
        title: 'Thing Reference',
        description: 'These are submissions, comments, chat messages and wiki pages',
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId",
            allOf: [{ $ref: 'schema.json#/definitions/thingSoul' }]
        },
        propsFromSoul: { id: 'thingId' },
        properties: {
            id: { $ref: '#/definitions/thingId' },
            kind: { '#ref': '#/definitions/thingKind' },
            timestamp: { $ref: '#/definitions/timestamp' },
            originalHash: { $ref: '#/definitions/thingId' },
            data: {
                oneOf: [
                    { $ref: '#/definitions/ThingDataEdge' },
                    { $ref: '#/definitions/ThingDataSignedEdge' }
                ]
            },
            topic: {
                anyOf: [
                    { $ref: '#/definitions/TopicEdge' },
                    {
                        description: 'Some old things had generic topic souls',
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            '#': { type: 'string', maxLength: 42 }
                        },
                        required: ['#']
                    }
                ]
            },
            domain: { $ref: '#/definitions/DomainEdge' },
            url: { $ref: '#/definitions/URLEdge' },
            comments: { thingRelatedEdge: 'ThingComments' },
            allcomments: { thingRelatedEdge: 'ThingAllComments' },
            votesup: { thingRelatedEdge: 'ThingVotesUp' },
            votesdown: { thingRelatedEdge: 'ThingVotesDown' },
            op: { $ref: '#/definitions/ThingEdge' },
            replyTo: { $ref: '#/definitions/ThingEdge' },
            author: { $ref: '#/definitions/SEAAuthorEdge' }
        },
        anyOf: [
            {
                allOf: [
                    {
                        thingHashMatchesSoul: true
                    },
                    {
                        anyOf: [{ signedThingDataMatchesThing: true }, { thingDataMatchesOriginalHash: true }]
                    }
                ]
            },
            { isLegacyThing: true },
            {
                additionalProperties: false,
                description: 'Self verifying can be updated in isolation',
                properties: {
                    id: { $ref: '#/definitions/thingId' },
                    comments: { thingRelatedEdge: 'ThingComments' },
                    allcomments: { thingRelatedEdge: 'ThingAllComments' },
                    votesup: { thingRelatedEdge: 'ThingVotesUp' },
                    votesdown: { thingRelatedEdge: 'ThingVotesDown' }
                }
            }
        ]
    }, ProofOfWorkVotes: {
        $async: true,
        keysAreProofsOfWork: {
            algorithm: 'argon2d',
            config: {
                complexity: 6,
                hashLength: 32,
                timeCost: 1,
                memoryCost: 10240,
                parallelism: 1
            }
        }
    }, ThingVotesUp: {
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/votesup",
            allOf: [{ $ref: 'schema.json#/definitions/thingSoul' }]
        },
        allOf: [{ $ref: '#/definitions/ProofOfWorkVotes' }]
    }, ThingVotesDown: {
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/votesdown",
            allOf: [{ $ref: 'schema.json#/definitions/thingSoul' }]
        },
        allOf: [{ $ref: '#/definitions/ProofOfWorkVotes' }]
    }, ThingData: {
        title: 'Unsigned Thing Data',
        description: 'This is the actual content of a thing',
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/data",
            allOf: [{ $ref: 'schema.json#/definitions/thingSoul' }],
            required: ['thingId']
        },
        properties: {
            kind: { $ref: '#/definitions/thingKind' },
            title: {
                type: 'string',
                minLength: 1,
                maxLength: Constants.MAX_THING_TITLE_SIZE
            },
            topic: { $ref: '#/definitions/topicName' },
            body: {
                type: ['null', 'string'],
                maxLength: Constants.MAX_THING_BODY_SIZE
            },
            author: { $ref: '#/definitions/seaAlias' },
            authorId: { $ref: '#/definitions/seaAuthorId' },
            opId: { $ref: '#/definitions/thingId' },
            replyToId: { $ref: '#/definitions/thingId' },
            domain: { $ref: '#/definitions/domainName' },
            url: { $ref: '#/definitions/url' },
            timestamp: { $ref: '#/definitions/timestamp' }
        },
        thingDataHashMatchesSoul: true
    }, ThingDataSigned: {
        title: 'Signed Thing Data',
        description: 'This is the actual content of a thing, cryptographically signed',
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/data~:authorId.",
            properties: {
                thingId: { $ref: 'schema.json#/definitions/thingId' },
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' }
            },
            required: ['thingId', 'authorId']
        },
        properties: {
            kind: { sea: { $ref: 'schema.json#/definitions/thingKind' } },
            title: {
                sea: {
                    type: 'string',
                    minLength: 1,
                    maxLength: Constants.MAX_THING_TITLE_SIZE
                }
            },
            topic: { sea: { $ref: 'schema.json#/definitions/topicName' } },
            body: {
                sea: {
                    type: ['null', 'string'],
                    maxLength: Constants.MAX_THING_BODY_SIZE
                }
            },
            author: {
                sea: { $ref: 'schema.json#/definitions/seaAlias' }
            },
            authorId: { sea: { $ref: 'schema.json#/definitions/seaAuthorId' } },
            opId: { sea: { $ref: 'schema.json#/definitions/thingId' } },
            replyToId: { sea: { $ref: 'schema.json#/definitions/thingId' } },
            domain: { sea: { $ref: 'schema.json#/definitions/domainName' } },
            url: { sea: { $ref: 'schema.json#/definitions/url' } },
            timestamp: { sea: { $ref: 'schema.json#/definitions/timestamp' } }
        }
    }, ThingVoteCounts: {
        title: 'Thing Vote Counts',
        description: 'Aggregated counts from a tabulator',
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/votecounts@~:tabulator.",
            properties: {
                thingId: { $ref: 'schema.json#/definitions/thingId' },
                tabulator: { $ref: 'schema.json#/definitions/seaAuthorId' }
            }
        },
        properties: {
            up: { sea: { type: ['number', 'string'] } },
            down: { sea: { type: ['number', 'string'] } },
            comment: { sea: { type: ['number', 'string'] } },
            score: { sea: { type: ['number', 'string'] } },
            commands: { sea: { type: ['object', 'string'] } }
        }
    }, ListingData: {
        $async: true,
        title: 'Listing Node Data',
        description: 'Shared description of listing properties',
        type: 'object',
        properties: {
            _: {
                additionalProperties: true
            }
        },
        patternProperties: {
            '^d+$': { sea: { type: ['string', 'null', 'undefined'] } }
        },
        deleteNonNumericKeys: true,
        deleteMetaForMissing: true
    }, sortName: {
        type: 'string',
        enum: [
            'new',
            'old',
            'active',
            'top',
            'comments',
            'discussed',
            'hot',
            'best',
            'controversial',
            'random',
            'firehose',
            'chat'
        ]
    }, TopicListing: {
        soul: {
            pattern: Constants.PREFIX + "/t/:topic/:sort@~:indexer.",
            required: ['topic', 'sort', 'indexer'],
            properties: {
                topic: { type: 'string' },
                sort: { $ref: 'schema.json#/definitions/sortName' },
                indexer: { $ref: 'schema.json#/definitions/seaAuthorId' }
            }
        },
        allOf: [{ $ref: '#/definitions/ListingData' }]
    }, DomainListing: {
        soul: {
            pattern: Constants.PREFIX + "/domain/:domain/:sort@~:indexer.",
            required: ['domain', 'sort', 'indexer'],
            properties: {
                domain: { type: 'string' },
                sort: { $ref: 'schema.json#/definitions/sortName' },
                indexer: { $ref: 'schema.json#/definitions/seaAuthorId' }
            }
        },
        allOf: [{ $ref: '#/definitions/ListingData' }]
    }, ThingCommentsListing: {
        soul: {
            pattern: Constants.PREFIX + "/things/:thingId/comments/:sort@~:indexer.",
            properties: {
                thingId: { $ref: 'schema.json#/definitions/thingId' },
                sort: { $ref: 'schema.json#/definitions/sortName' },
                indexer: { $ref: 'schema.json#/definitions/seaAuthorId' }
            }
        },
        allOf: [{ $ref: '#/definitions/ListingData' }]
    }, userListingType: {
        type: 'string',
        enum: ['overview', 'submitted', 'comments', 'commands', 'commented']
    }, AuthorRepliesListing: {
        soul: {
            pattern: Constants.PREFIX + "/user/:authorId/replies/:type/:sort@~:indexer.",
            properties: {
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' },
                sort: { $ref: 'schema.json#/definitions/sortName' },
                indexer: { $ref: 'schema.json#/definitions/seaAuthorId' },
                type: { $ref: 'schema.json#/definitions/userListingType' }
            }
        },
        allOf: [{ $ref: '#/definitions/ListingData' }]
    }, AuthorProfileListing: {
        soul: {
            pattern: Constants.PREFIX + "/user/:authorId/:type/:sort@~:indexer.",
            properties: {
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' },
                sort: { $ref: 'schema.json#/definitions/sortName' },
                indexer: { $ref: 'schema.json#/definitions/seaAuthorId' },
                type: { $ref: 'schema.json#/definitions/userListingType' }
            }
        },
        allOf: [{ $ref: '#/definitions/ListingData' }]
    }, SpaceListing: {
        soul: {
            pattern: Constants.PREFIX + "/user/:authorId/spaces/:name/:sort@~:indexer.",
            properties: {
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' },
                sort: { $ref: 'schema.json#/definitions/sortName' },
                indexer: { $ref: 'schema.json#/definitions/seaAuthorId' },
                name: { $ref: 'schema.json#/definitions/topicName' }
            }
        },
        allOf: [{ $ref: '#/definitions/ListingData' }]
    }, AuthorComments: {
        title: "Author's Comments",
        description: 'All of an authors comments should be linked here',
        soul: {
            pattern: Constants.PREFIX + "/comments~:authorId.",
            properties: {
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' }
            },
            required: ['authorId']
        },
        additionalProperties: {
            sea: {
                edgeMatchesKey: true,
                anyOf: [{ $ref: 'schema.json#/definitions/ThingEdge' }]
            }
        }
    }, AuthorSubmissions: {
        title: "Author's Submissions",
        description: "All of an author's submissions should be linked here",
        soul: {
            pattern: Constants.PREFIX + "/submissions~:authorId.",
            properties: {
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' }
            },
            required: ['authorId']
        }
    }, AuthorThings: {
        title: "Author's Things",
        description: "All of an author's things should be linked here",
        soul: {
            pattern: Constants.PREFIX + "/things~:authorId.",
            properties: {
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' }
            },
            required: ['authorId']
        },
        additionalProperties: {
            sea: {
                edgeMatchesKey: true,
                anyOf: [{ $ref: 'schema.json#/definitions/ThingEdge' }]
            }
        }
    }, AuthorPages: {
        title: 'Author Page Map',
        description: 'Mapping of page names to things',
        soul: {
            pattern: Constants.PREFIX + "/pages~:authorId.",
            properties: {
                authorId: { $ref: 'schema.json#/definitions/seaAuthorId' }
            },
            required: ['authorId']
        },
        additionalProperties: {
            sea: {
                anyOf: [{ $ref: 'schema.json#/definitions/ThingEdge' }]
            }
        }
    } });
var routes = keysIn(definitions).reduce(function (result, name) {
    var pattern = pathOr('', [name, 'soul', 'pattern'], definitions);
    if (!pattern)
        return result;
    return assoc(name, new Route(pattern), result);
}, definitions);
var defsWithRoutes = compose(reduce(function (res, _a) {
    var name = _a[0], route = _a[1];
    return assoc(name, assoc('route', route, prop(name, definitions)), res);
}, {}), toPairs)(routes);
var Schema = {
    SEAAuthor: defsWithRoutes.SEAAuthor,
    TopicDay: defsWithRoutes.TopicDay,
    Topic: defsWithRoutes.Topic,
    Domain: defsWithRoutes.Domain,
    URL: defsWithRoutes.URL,
    ThingAllComments: defsWithRoutes.ThingAllComments,
    ThingComments: defsWithRoutes.ThingComments,
    Thing: defsWithRoutes.Thing,
    ThingVotesUp: defsWithRoutes.ThingVotesUp,
    ThingVotesDown: defsWithRoutes.ThingVotesDown,
    ThingData: defsWithRoutes.ThingData,
    ThingDataSigned: defsWithRoutes.ThingDataSigned,
    ThingVoteCounts: defsWithRoutes.ThingVoteCounts,
    TopicListing: defsWithRoutes.TopicListing,
    DomainListing: defsWithRoutes.DomainListing,
    ThingCommentsListing: defsWithRoutes.ThingCommentsListing,
    AuthorRepliesListing: defsWithRoutes.AuthorRepliesListing,
    AuthorProfileListing: defsWithRoutes.AuthorProfileListing,
    SpaceListing: defsWithRoutes.SpaceListing,
    AuthorComments: defsWithRoutes.AuthorComments,
    AuthorSubmissions: defsWithRoutes.AuthorSubmissions,
    AuthorThings: defsWithRoutes.AuthorThings,
    AuthorPages: defsWithRoutes.AuthorPages,
    definitions: definitions,
    routes: routes
};

var isLegacyThing = function (_schema, data) {
    var dataSoul = pathOr('', ['data', '#'], data);
    var newest = without(['comments', 'allcomments', 'votesup', 'votesdown'], keys(path(['_', '>'], data)))
        .map(function (key) { return path(['_', '>', key], data); })
        .sort()
        .pop();
    var thingId = propOr('', 'thingId', Schema.ThingData.route.match(dataSoul));
    var id = prop('id', data);
    return id && id === thingId && newest && newest < 1543102814945;
};
var thingHashMatchesSoul = function (_schema, data) {
    var id = prop('id', data);
    return (id &&
        id ===
            objHash({
                authorId: (pathOr('', ['author', '#'], data) || '').substr(1) || undefined,
                timestamp: parseInt(prop('timestamp', data), 10),
                kind: prop('kind', data),
                topic: propOr(undefined, 'topicName', Schema.Topic.route.match(pathOr('', ['topic', '#'], data))),
                opId: propOr(undefined, 'thingId', Schema.Thing.route.match(pathOr('', ['op', '#'], data))),
                replyToId: propOr(undefined, 'thingId', Schema.Thing.route.match(pathOr('', ['replyTo', '#'], data))),
                originalHash: prop('originalHash', data)
            }));
};
var signedThingDataMatches = function (_schema, data) {
    var authorId = (pathOr('', ['author', '#'], data) || '').substr(1) || undefined;
    var signedId = propOr('', 'authorId', Schema.ThingDataSigned.route.match(pathOr('', ['data', '#'], data)));
    return authorId && authorId === signedId;
};
var thingDataMatchesOriginalHash = function (_schema, data) {
    var originalHash = prop('originalHash', data);
    var id = propOr('', 'thingId', Schema.ThingData.route.match(pathOr('', ['data', '#'], data)));
    return id && id === originalHash;
};
var getIsThingRelatedEdge = function (ajv) { return function (nodeTypeName, data, _pSchema, _cPath, parentData) {
    var thingId = propOr('', 'thingId', Schema.Thing.route.match(path(['_', '#'], parentData) || ''));
    var NodeType = propOr(null, nodeTypeName, Schema);
    var propThingId = propOr('', 'thingId', NodeType.route.match(propOr('', '#', data)));
    if (!thingId || thingId !== propThingId)
        return false;
    return ajv.compile({ $ref: "schema.json#/definitions/" + nodeTypeName + "Edge" })(data);
}; };
var thingDataHashMatches = function (_schema, data) {
    var record = dissoc('_', data);
    record.timestamp = parseFloat(record.timestamp);
    var thingId = propOr('', 'thingId', Schema.ThingData.route.match(path(['_', '#'], data) || ''));
    return thingId && thingId === objHash(record);
};
var isVoteValid = function (argon2, schema, prefix, vote) {
    var _a = schema || {}, _b = _a.algorithm, algorithm = _b === void 0 ? 'argon2d' : _b, _c = _a.config, config = _c === void 0 ? {} : _c;
    // const nonce = Buffer.hasOwnProperty('from') ? Buffer.from(vote, 'hex') : new Buffer(vote, 'hex');
    var nonce = Buffer.from(vote, 'hex');
    // const salt = Buffer.hasOwnProperty('from') ? Buffer.from(nonce, 'hex') : new Buffer(nonce, 'hex');
    var salt = nonce;
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
        if (hash[off] !== 0)
            return false;
    }
    var mask = 0xff << (8 + i - config.complexity);
    return (hash[off] & mask) === 0;
};
var keysAreProofsOfWork = function (schema, data) {
    var argon2 = require('argon2');
    if (!argon2)
        return true; // in browser don't bother for now
    var _a = (schema || {}).algorithm, algorithm = _a === void 0 ? 'argon2d' : _a;
    var prefix = pathOr('', ['_', '#'], data);
    if (algorithm !== 'argon2d') {
        throw new Error('Only argon2 supported for vote hashes');
    }
    without(['_'], keysIn(data)).forEach(function (vote) {
        if (!isVoteValid(argon2, schema, prefix, vote)) {
            console.log('invalid vote', prefix, vote);
            delete data[vote];
        }
    });
    return true;
};
var deleteNonNumericKeys = function (schema, data) {
    var keys$$1 = without(['_'], keysIn(data));
    var meta = pathOr({}, ['_', '>'], data);
    keys$$1.forEach(function (key) {
        var val = parseInt(key, 10);
        if (!val && val !== 0) {
            delete meta[key];
            delete data[key];
        }
    });
    return true;
};
var deleteMetaForMissing = function (schema, data) {
    var keys$$1 = without(['_'], keysIn(data));
    var meta = pathOr({}, ['_', '>'], data);
    var metaKeys = keysIn(meta);
    var missing = difference(metaKeys, keys$$1);
    if (missing.length)
        data['_']['>'] = omit(missing, meta);
    return true;
};
var initAjv$1 = function (Gun) {
    return compose(function (ajv) {
        ajv.addKeyword('isLegacyThing', {
            validate: isLegacyThing
        });
        ajv.addKeyword('thingHashMatchesSoul', {
            validate: thingHashMatchesSoul
        });
        ajv.addKeyword('signedThingDataMatchesThing', {
            validate: signedThingDataMatches
        });
        ajv.addKeyword('thingDataMatchesOriginalHash', {
            validate: thingDataMatchesOriginalHash
        });
        ajv.addKeyword('thingRelatedEdge', {
            validate: getIsThingRelatedEdge(ajv)
        });
        ajv.addKeyword('thingDataHashMatchesSoul', {
            validate: thingDataHashMatches
        });
        ajv.addKeyword('keysAreProofsOfWork', {
            validate: keysAreProofsOfWork,
            modifying: true
        });
        ajv.addKeyword('deleteNonNumericKeys', {
            validate: deleteNonNumericKeys,
            modifying: true
        });
        ajv.addKeyword('deleteMetaForMissing', {
            validate: deleteMetaForMissing,
            modifying: true
        });
        return ajv;
    }, function (conf) { return initAjv(conf, Gun); });
};
var create = function (Gun) {
    return createSuppressor({
        definitions: Schema.definitions,
        init: initAjv$1(Gun)
    });
};
var gunWireInput = curry(function (peer, context) {
    var suppressor = create(peer.Gun);
    context.on('in', function wireInput(msg) {
        var _this = this;
        var _ = msg['_'];
        delete msg['_'];
        if ('ping' in msg || 'leech' in msg)
            return;
        if (msg.put && !keys(msg.put).length)
            return;
        var promise = peer.config.disableValidation ? Promise.resolve(msg) : suppressor.validate(msg);
        promise
            .then(function (validated) {
            if (!validated)
                return console.log("msg didn't validate", msg);
            msg['_'] = _;
            return _this.to.next(msg);
        })
            .catch(function (err) { return console.error('validate err', msg, err.stack || err); });
    });
});
var Validation = {
    createSuppressor: create,
    isLegacyThing: isLegacyThing,
    thingHashMatchesSoul: thingHashMatchesSoul,
    signedThingDataMatches: signedThingDataMatches,
    thingDataMatchesOriginalHash: thingDataMatchesOriginalHash,
    getIsThingRelatedEdge: getIsThingRelatedEdge,
    thingDataHashMatches: thingDataHashMatches,
    isVoteValid: isVoteValid,
    keysAreProofsOfWork: keysAreProofsOfWork,
    initAjv: initAjv$1,
    gunWireInput: gunWireInput
};

var Config = {
    tabulator: Constants.INDEXER,
    indexer: Constants.INDEXER,
    owner: Constants.INDEXER,
    oracleMaxStaleness: 1000 * 60 * 60,
    update: compose(map(function (_a) {
        var key = _a[0], val = _a[1];
        return (Config[key] = val);
    }), toPairs)
};

var _a = [0, 1, 2, 3], POS_IDX = _a[0], POS_ID = _a[1], POS_VAL = _a[2];
var rowsToIds = function (rows) {
    return rows.map(function (row) { return ((row && row[POS_ID]) || ''); }).filter(function (id) { return !!id; });
};
var rowsToItems = map(slice(1, 3));
var source = propOr('', 'source');
var soulFromPath = curry(function (indexer, path$$1) { return "" + Constants.PREFIX + path$$1 + "@~" + indexer + "."; });
var pathFromSoul = compose(replace(new RegExp("^" + Constants.PREFIX), ''), replace(/@~.*\./, ''));
var idToSoul = function (thingId) { return Schema.Thing.route.reverse({ thingId: thingId }) || ''; };
var idsToSouls = function (ids) { return ids.map(idToSoul).filter(function (id) { return !!id; }); };
var soulToId = function (soul) { return propOr('', 'thingId', Schema.Thing.route.match(soul)); };
var soulsToIds = map(soulToId);
function getRow(node, idx) {
    var row = split(',', propOr('', "" + idx, node));
    row[0] = (row[0] || '').trim();
    row[1] = parseFloat(row[1]);
    row.splice(0, 0, parseInt(idx, 10));
    return row;
}
var itemKeys = compose(filter(compose(function (val) { return !!(val === 0 || val); }, function (val) { return parseInt(val, 10); })), keysIn);
function rows(node) {
    var keys$$1 = keysIn(node);
    var result = [];
    for (var i = 0; i < keys$$1.length; i++) {
        var key = keys$$1[i];
        var keyVal = parseInt(key, 10);
        if (!keyVal && keyVal !== 0)
            continue;
        result.push(getRow(node, key));
    }
    return result;
}
var ids = compose(rowsToIds, rows);
var sortRows = sortWith([
    ascend(compose(cond([[isNil, always(Infinity)], [T, parseFloat]]), nth(POS_VAL)))
]);
var sortedIds = compose(map(nth(POS_ID)), sortRows, filter(identity), rows);
var mapSortData = addIndex(map);
var itemsToRows = mapSortData(function (item, idx) { return [idx, item[0], item[1]]; });
function diffSingle(node, updatedItem, _a) {
    var _b = (_a === void 0 ? {} : _a).maxSize, maxSize = _b === void 0 ? 1000 : _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, _d, _e, highestKey, highestValueKey, highestValue, key, updateId, updateValue, parsed, row, idx, _f, id, value;
        return __generator(this, function (_g) {
            highestKey = -1;
            highestValueKey = null;
            highestValue = null;
            updateId = updatedItem[0], updateValue = updatedItem[1];
            for (key in node || {}) {
                parsed = parseInt(key, 10);
                if (!(parsed || parsed === 0))
                    continue;
                row = getRow(node, key);
                idx = row[0], _f = row[1], id = _f === void 0 ? null : _f, value = row[2];
                if (id === updateId) {
                    if (updateValue === value)
                        return [2 /*return*/, null];
                    return [2 /*return*/, (_c = {}, _c["" + idx] = updatedItem.join(','), _c)];
                }
                if (highestValue === null || (value !== null && value > highestValue)) {
                    highestValue = value;
                    highestValueKey = idx;
                }
                if (idx !== null && idx > highestKey)
                    highestKey = idx;
            }
            if (!maxSize || highestKey + 1 < maxSize) {
                return [2 /*return*/, (_d = {}, _d["" + (highestKey + 1)] = updatedItem.join(','), _d)];
            }
            if (highestValue === null || updateValue < highestValue) {
                return [2 /*return*/, (_e = {}, _e["" + highestValueKey] = updatedItem.join(','), _e)];
            }
            return [2 /*return*/, null];
        });
    });
}
function diff(node, updatedItems, removeIds, _a) {
    if (updatedItems === void 0) { updatedItems = []; }
    if (removeIds === void 0) { removeIds = []; }
    var _b = (_a === void 0 ? {} : _a).maxSize, maxSize = _b === void 0 ? 1000 : _b;
    return __awaiter(this, void 0, void 0, function () {
        var removed, byId, changes, rows, updated, toReplace, maxIdx, key, parsed, row, idx, _c, id, _d, rawValue, i, _e, id, value, existing, row, allSorted, sorted, missing, added, i, id, idx, val, inserted, row, replaced, idx, row, idx;
        return __generator(this, function (_f) {
            if (updatedItems.length === 1 && !removeIds.length) {
                return [2 /*return*/, diffSingle(node, updatedItems[0], { maxSize: maxSize })];
            }
            removed = indexBy(identity, removeIds);
            byId = {};
            changes = {};
            rows = [];
            updated = {};
            toReplace = [];
            maxIdx = 0;
            for (key in node || {}) {
                parsed = parseInt(key, 10);
                if (!(parsed || parsed === 0))
                    continue;
                row = getRow(node, key);
                idx = row[0], _c = row[1], id = _c === void 0 ? null : _c, _d = row[2], rawValue = _d === void 0 ? null : _d;
                row[POS_VAL] = rawValue === null ? null : rawValue;
                if (id && removed[id])
                    row[POS_ID] = row[POS_VAL] = null;
                if (id)
                    byId[id] = row;
                if (row[POS_ID]) {
                    rows.push(row);
                }
                else {
                    toReplace.push(row);
                }
                if (idx && idx > maxIdx)
                    maxIdx = idx;
            }
            for (i = 0; i < updatedItems.length; i++) {
                _e = updatedItems[i] || [null, null], id = _e[0], value = _e[1];
                if (!id)
                    continue;
                existing = byId[id];
                if (existing) {
                    if (existing[POS_VAL] !== value) {
                        existing[POS_VAL] = value;
                        updated[id] = true;
                    }
                }
                else {
                    row = [null, id, value];
                    rows.push(row);
                }
            }
            allSorted = sortRows(rows);
            sorted = maxSize ? allSorted.slice(0, maxSize) : allSorted;
            missing = maxSize ? allSorted.slice(maxSize, allSorted.length) : [];
            added = filter(function (row) { return row[POS_IDX] === null; }, sorted);
            toReplace = toReplace.concat(filter(function (row) { return row[POS_IDX] !== null; }, missing)).reverse();
            for (i = 0; i < sorted.length; i++) {
                id = sorted[i][POS_ID];
                idx = sorted[i][POS_IDX];
                val = sorted[i][POS_VAL];
                if (idx !== null && updated[id || ''])
                    changes["" + idx] = [id, val].join(',');
            }
            inserted = [];
            while (added.length) {
                row = added.pop();
                replaced = toReplace.pop();
                idx = (replaced || [null])[0];
                if (idx === null) {
                    idx = maxIdx + inserted.length + 1;
                    inserted.push(idx);
                }
                if (row)
                    changes["" + idx] = [row[POS_ID], row[POS_VAL]].join(',');
            }
            while (toReplace.length) {
                row = toReplace.pop();
                if (row && !row[POS_ID]) {
                    idx = "" + row[POS_IDX];
                    if (node[idx] !== null) {
                        changes[idx] = null;
                        console.log('nulling', idx, node[idx]);
                    }
                }
            }
            return [2 /*return*/, keys(changes).length ? changes : null];
        });
    });
}
var unionRows = compose(uniqBy(nth(POS_ID)), sortRows, reduce(concat, []), map(rows));
var rowsFromSouls = query(function (scope$$1, souls) {
    return Promise.all(map(scope$$1.get, souls)).then(unionRows);
});
var read = query(function (scope$$1, path$$1, opts) {
    var _a = (opts || {}).indexer, indexer = _a === void 0 ? Config.indexer : _a;
    return rowsFromSouls(scope$$1, [soulFromPath(indexer, path$$1)]).then(rowsToIds);
}, 'listingRows');
var get = query(function (scope$$1, soul) { return (soul ? scope$$1.get(soul).then() : resolve(null)); }, 'listing');
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
    idToSoul: idToSoul,
    idsToSouls: idsToSouls,
    soulToId: soulToId,
    soulsToIds: soulsToIds,
    rowsToIds: rowsToIds,
    rowsToItems: rowsToItems,
    itemsToRows: itemsToRows,
    sortRows: sortRows,
    sortedIds: sortedIds,
    soulFromPath: soulFromPath,
    pathFromSoul: pathFromSoul,
    rowsFromSouls: rowsFromSouls,
    read: read,
    diff: diff,
    unionRows: unionRows
};

var thing = query(function (scope$$1, thingSoul) {
    return scope$$1.get(thingSoul).then(function (meta) {
        if (!meta || !meta.id)
            return null;
        var result = {
            id: meta.id,
            timestamp: parseFloat(meta.timestamp)
        };
        var replyToSoul = pathOr('', ['replyTo', '#'], meta);
        var opSoul = pathOr('', ['op', '#'], meta);
        var opId = propOr('', 'thingId', opSoul && Schema.Thing.route.match(opSoul));
        var replyToId = propOr('', 'thingId', replyToSoul && Schema.Thing.route.match(replyToSoul));
        if (opId)
            result.opId = opId;
        if (replyToId)
            result.replyToId = replyToId;
        return result;
    });
});
var thingDataFromSouls = curry(function (scope$$1, souls) {
    var ids = ListingNode.soulsToIds(souls || []);
    return all(map(function (id) { return thingData(scope$$1, id).then(function (data) { return [id, data]; }); }, ids)).then(function (pairs) {
        return pairs.reduce(function (res, _a) {
            var id = _a[0], data = _a[1];
            return assoc(id, data, res);
        }, {});
    });
});
var thingScores = query(function (scope$$1, thingId, tabulator) {
    if (tabulator === void 0) { tabulator = ''; }
    if (!thingId)
        return resolve(null);
    return scope$$1
        .get(Schema.ThingVoteCounts.route.reverse({
        thingId: thingId,
        tabulator: tabulator || Config.tabulator
    }))
        .then();
}, 'thingScores');
var thingData = query(function (scope$$1, thingId) {
    return thingId ? scope$$1.get(Schema.Thing.route.reverse({ thingId: thingId })).get('data') : resolve(null);
}, 'thingData');
var thingMeta = query(function (scope$$1, _a) {
    var thingSoul = _a.thingSoul, tabulator = _a.tabulator, _b = _a.data, data = _b === void 0 ? false : _b, _c = _a.scores, scores = _c === void 0 ? false : _c;
    if (!thingSoul)
        return resolve(null);
    var id = ListingNode.soulToId(thingSoul);
    return all([
        thing(scope$$1, thingSoul),
        scores ? thingScores(scope$$1, id, tabulator) : resolve(null),
        data ? thingData(scope$$1, id) : resolve(null)
    ]).then(function (_a) {
        var meta = _a[0], votes = _a[1], data = _a[2];
        if (!meta || !meta.id)
            return null;
        return __assign({}, meta, { votes: votes, data: data });
    });
});
var multiThingMeta = query(function (scope$$1, params) {
    return all(reduce(function (promises, thingSoul) {
        if (!thingSoul)
            return promises;
        promises.push(thingMeta(scope$$1, __assign({}, params, { thingSoul: thingSoul })));
        return promises;
    }, [], propOr([], 'thingSouls', params)));
});
var userPages = query(function (scope$$1, authorId) { return scope$$1.get(Schema.AuthorPages.route.reverse({ authorId: authorId })); }, 'userPages');
var wikiPageId = query(function (scope$$1, authorId, name) {
    if (!authorId || !name)
        return resolve(null);
    return scope$$1
        .get(Schema.AuthorPages.route.reverse({ authorId: authorId }))
        .get(name)
        .get('id');
}, 'wikiPageId');
var wikiPage = query(function (scope$$1, authorId, name) {
    return wikiPageId(scope$$1, authorId, name).then(function (id) { return id && thingData(scope$$1, id); });
});
var userMeta = query(function (scope$$1, id) {
    if (!id)
        return resolve(null);
    return scope$$1.get("~" + id).then(function (meta) { return ({
        alias: prop('alias', meta),
        createdAt: path(['_', '>', 'pub'], meta)
    }); });
}, 'userMeta');
var createScope = curry(function (nab, opts) { return scope(assoc('gun', nab.gun, opts || {})); });
var Query = {
    thingMeta: thingMeta,
    multiThingMeta: multiThingMeta,
    thingScores: thingScores,
    thingData: thingData,
    thingDataFromSouls: thingDataFromSouls,
    userPages: userPages,
    wikiPageId: wikiPageId,
    wikiPage: wikiPage,
    userMeta: userMeta,
    createScope: createScope
};

var soul = pathOr('', ['_', '#']);
var state = pathOr({}, ['_', '>']);
var latest = compose(last, sortBy(identity), values, state);
var edges = compose(map(propOr('', '#')), values);
var diff$1 = function (existing, updated) {
    var changedKeys = without(['_'], keysIn(updated)).filter(function (k) {
        var newVal = updated[k];
        var oldVal = prop(k, existing);
        return !equals(newVal, oldVal) && "" + newVal !== "" + oldVal;
    });
    return pick(changedKeys, updated);
};
function decodeSEA(rawData) {
    var data = rawData ? __assign({}, rawData) : rawData;
    var soul = pathOr('', ['_', '#'], data);
    if (!soul || !Gun.SEA || soul.indexOf('~') === -1)
        return rawData;
    without(['_'], keys(data)).forEach(function (key) {
        Gun.SEA.verify(Gun.SEA.opt.pack(rawData[key], key, rawData, soul), false, function (res) { return (data[key] = Gun.SEA.opt.unpack(res, key, rawData)); });
    });
    return data;
}
var GunNode = { soul: soul, state: state, diff: diff$1, latest: latest, edges: edges, decodeSEA: decodeSEA };

var souls = GunNode.edges;
var ids$1 = compose(filter(identity), map(compose(prop('thingId'), Schema.Thing.route.match.bind(Schema.Thing.route))), GunNode.edges);
var union = compose(dissoc('_'), reduce(mergeRight, {}));
function dayStr(timestamp) {
    var d = new Date(timestamp || new Date().getTime());
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth() + 1;
    var dayNum = d.getUTCDate();
    return year + "/" + month + "/" + dayNum;
}
var ThingSet = { ids: ids$1, union: union, souls: souls, dayStr: dayStr };

var kind = propOr('submission', 'kind');
var body = propOr('', 'body');
var isCommand = compose(test(Constants.COMMAND_RE), body);
var url = propOr('', 'url');
var topic = propOr('', 'topic');
var domain = compose(function (urlStr) {
    if (!urlStr)
        return '';
    var parsed = parse(urlStr);
    return (parsed.host || parsed.scheme || '').replace(/^www\./, '');
}, url);
var authorId = propOr('', 'authorId');
var opId = propOr('', 'opId');
var replyToId = propOr('', 'replyToId');
var ThingDataNode = {
    kind: kind,
    body: body,
    isCommand: isCommand,
    url: url,
    topic: topic,
    domain: domain,
    authorId: authorId,
    opId: opId,
    replyToId: replyToId
};

var topicPrefixes = {
    chatmsg: 'chat:',
    comment: 'comments:'
};
var soulToId$1 = compose(propOr('', 'thingId'), Schema.Thing.route.match.bind(Schema.Thing.route));
var soulsToIds$1 = map(soulToId$1);
var index = curry(function (peer, thingId, data) {
    if (!data.topic && !data.opId)
        return;
    if (data.opId && !data.topic) {
        peer.gun
            .get(Schema.Thing.route.reverse({ thingId: data.opId }))
            .get('data')
            .on(function recv(td) {
            if (!td)
                return;
            index(peer, thingId, __assign({}, data, { topic: td.topic || 'all' }));
            this.off();
        });
        return;
    }
    var thing = peer.gun.get(Schema.Thing.route.reverse({ thingId: thingId }));
    var dayStr = ThingSet.dayStr(data.timestamp);
    var _a = dayStr.split('/'), year = _a[0], month = _a[1], day = _a[2];
    var topicPrefix = propOr('', data.kind || '', topicPrefixes);
    var baseTopicName = data.topic.toLowerCase().trim();
    var topicName = topicPrefix + baseTopicName;
    var topic = peer.gun.get(Schema.Topic.route.reverse({ topicName: topicName }));
    var topicDay = peer.gun.get(Schema.TopicDay.route.reverse({ topicName: topicName, year: year, month: month, day: day }));
    if (!data.skipAll && data.topic !== 'all') {
        var allname = topicPrefix + "all";
        var allTopic = peer.gun.get(Schema.Topic.route.reverse({ topicName: allname }));
        var allTopicDay = peer.gun.get(Schema.TopicDay.route.reverse({
            topicName: allname,
            year: year,
            month: month,
            day: day
        }));
        allTopic.set(thing);
        allTopicDay.set(thing);
    }
    if (data.kind === 'submission') {
        var urlInfo = data.url ? parse(data.url) : {};
        var domainName = (data.url
            ? (urlInfo.host || urlInfo.scheme || '').replace(/^www\./, '')
            : "self." + data.topic).toLowerCase();
        var domain = peer.gun.get(Schema.Domain.route.reverse({ domainName: domainName }));
        domain.set(thing);
        if (data.url) {
            var urlNode = peer.gun.get(Schema.URL.route.reverse({ url: data.url }));
            // thing.get("url").put(urlNode);
            urlNode.set(thing);
        }
    }
    if (data.opId) {
        var allcomments = peer.gun.get(Schema.ThingAllComments.route.reverse({ thingId: data.opId }));
        allcomments.set(thing);
    }
    if (data.replyToId || data.opId) {
        var comments = peer.gun.get(Schema.ThingComments.route.reverse({
            thingId: data.replyToId || data.opId
        }));
        comments.set(thing);
    }
    topic.set(thing);
    topicDay.set(thing);
});
var put = curry(function (peer, data) {
    data.timestamp = data.timestamp || new Date().getTime(); // eslint-disable-line
    var originalHash = objHash(data);
    var timestamp = data.timestamp, kind = data.kind, topic = data.topic, authorId = data.authorId, opId = data.opId, replyToId = data.replyToId;
    var thingId = objHash({
        timestamp: timestamp,
        kind: kind,
        topic: topic,
        authorId: authorId,
        opId: opId,
        replyToId: replyToId,
        originalHash: originalHash
    });
    var node = peer.gun.get(Schema.Thing.route.reverse({ thingId: thingId }));
    var dataSoul = authorId
        ? Schema.ThingDataSigned.route.reverse({ thingId: thingId, authorId: authorId })
        : Schema.ThingData.route.reverse({ thingId: originalHash });
    var metaData = {
        id: thingId,
        timestamp: timestamp,
        kind: kind,
        originalHash: originalHash,
        data: { '#': dataSoul },
        votesup: { '#': Schema.ThingVotesUp.route.reverse({ thingId: thingId }) },
        votesdown: { '#': Schema.ThingVotesDown.route.reverse({ thingId: thingId }) },
        allcomments: { '#': Schema.ThingAllComments.route.reverse({ thingId: thingId }) },
        comments: { '#': Schema.ThingComments.route.reverse({ thingId: thingId }) }
    };
    if (topic)
        metaData.topic = { '#': Schema.Topic.route.reverse({ topicName: topic }) };
    if (authorId)
        metaData.author = { '#': "~" + authorId };
    if (opId)
        metaData.op = { '#': Schema.Thing.route.reverse({ thingId: opId }) };
    if (replyToId) {
        metaData.replyTo = {
            '#': Schema.Thing.route.reverse({ thingId: replyToId })
        };
    }
    peer.gun.get(dataSoul).put(data);
    node.put(metaData);
    index(peer, thingId, data);
    return node;
});
var submit = curry(function (peer, data) {
    var timestamp = data.timestamp || new Date().getTime();
    var user = peer.isLoggedIn();
    if (data.topic)
        data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line
    if (data.domain)
        data.domain = data.domain.toLowerCase().trim(); // eslint-disable-line
    if (user) {
        data.author = user.alias; // eslint-disable-line
        data.authorId = user.pub; // eslint-disable-line
    }
    var thing = put(peer, __assign({}, data, { timestamp: timestamp, kind: 'submission' }));
    if (user) {
        var thingsSoul = Schema.AuthorThings.route.reverse({
            authorId: user.pub
        });
        var submissionsSoul = Schema.AuthorSubmissions.route.reverse({
            authorId: user.pub
        });
        var things = peer.gun.get(thingsSoul);
        var submissions = peer.gun.get(submissionsSoul);
        peer.gun
            .user()
            .get('things')
            .put(things);
        peer.gun
            .user()
            .get('submissions')
            .put(submissions);
        things.set(thing);
        submissions.set(thing);
    }
    return thing;
});
var comment = curry(function (peer, data) {
    var user = peer.isLoggedIn();
    if (data.topic)
        data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line
    if (user) {
        data.author = user.alias; // eslint-disable-line
        data.authorId = user.pub; // eslint-disable-line
    }
    var thing = put(peer, __assign({}, data, { kind: 'comment' }));
    if (user) {
        var thingsSoul = Schema.AuthorThings.route.reverse({
            authorId: user.pub
        });
        var commentsSoul = Schema.AuthorComments.route.reverse({
            authorId: user.pub
        });
        var things = peer.gun.get(thingsSoul);
        var comments = peer.gun.get(commentsSoul);
        peer.gun
            .user()
            .get('things')()
            .put(things);
        peer.gun
            .user()
            .get('comments')
            .put(comments);
        things.set(thing);
        comments.set(thing);
    }
    return thing;
});
var chat = curry(function (peer, data) {
    var user = peer.isLoggedIn();
    if (data.topic)
        data.topic = data.topic.toLowerCase().trim(); // eslint-disable-line
    if (user) {
        data.author = user.alias; // eslint-disable-line
        data.authorId = user.pub; // eslint-disable-line
    }
    var thing = put(peer, __assign({}, data, { kind: 'chatmsg' }));
    if (user) {
        var thingsSoul = Schema.AuthorThings.route.reverse({
            authorId: user.pub
        });
        var things = peer.gun.get(thingsSoul);
        peer.gun
            .user()
            .get('things')
            .put(things);
        things.set(thing);
    }
    return thing;
});
var writePage = curry(function (peer, name, body) {
    var user = peer.isLoggedIn();
    if (!user)
        return Promise.reject('not logged in');
    var thing;
    var pagesSoul = Schema.AuthorPages.route.reverse({ authorId: user.pub });
    var chain = peer.gun.get(pagesSoul).get(name);
    return chain.then(function (res) {
        if (res && res.data) {
            chain
                .get('data')
                .get('body')
                .put(body);
        }
        else {
            var data = {
                body: body,
                title: name,
                kind: 'wikipage',
                author: user.alias,
                authorId: user.pub
            };
            thing = put(peer, data);
            chain.put(thing);
        }
    });
});
var vote = curry(function (peer, id, kind, nonce) {
    var votes = peer.gun.get(Schema[kind === 'up' ? 'ThingVotesUp' : 'ThingVotesDown'].route.reverse({
        thingId: id
    }));
    return votes.get(nonce).put('1');
});
var Thing = {
    soulToId: soulToId$1,
    soulsToIds: soulsToIds$1,
    put: put,
    submit: submit,
    comment: comment,
    chat: chat,
    writePage: writePage,
    vote: vote,
    index: index
};

var signup = curry(function (peer, username, password, opts) {
    if (opts === void 0) { opts = {}; }
    return new Promise(function (ok, fail) {
        if (peer && peer.gun && peer.gun.user) {
            var user_1 = peer.gun.user();
            user_1.create(username, password, function (ack) {
                if (ack.err) {
                    fail(ack.err);
                    user_1.leave();
                    peer.gun.user().leave();
                }
                else {
                    peer.login(username, password).then(ok);
                }
            }, opts);
        }
        else {
            fail('SEA is not loaded');
        }
    });
});
var login = curry(function (peer, username, password) {
    return new Promise(function (ok, fail) {
        if (peer && peer.gun && peer.gun.user) {
            var user = peer.gun.user();
            user.auth(username, password, function (ack) {
                return ack.err ? fail(ack.err) : ok(peer.gun.user().is);
            });
        }
        else {
            fail('SEA is not loaded');
        }
    }).then(function (result) {
        peer._onLogin && peer._onLogin(result); // eslint-disable-line
        return result;
    });
});
var logout = function (peer) { return peer.gun.user().leave(); };
var isLoggedIn = function (peer) { return peer.gun && peer.gun.user && peer.gun.user().is; };
var onLogin = curry(function (peer, fn) { return (peer._onLogin = fn); }); // eslint-disable-line
var Authentication = {
    signup: signup,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    onLogin: onLogin
};

var tokenize = function (source) {
    var tokenMap = (source || '').split('\n').reduce(function (def, line) {
        var tokens = line
            .trim()
            .split(' ')
            .map(trim)
            .filter(function (x) { return x; });
        if (!tokens.length)
            return def;
        return assocPath(tokens.slice(0, 6), {}, def);
    }, {});
    var isPresent = function (p) {
        var check = p;
        if (typeof p === 'string')
            check = p.split(' ');
        return check && path(check, tokenMap);
    };
    var getValues = function (p) { return keysIn(isPresent(p)); };
    var getValue = function (p) { return getValues(p)[0] || null; };
    var getLastValue = function (p) { return getValues(p).pop() || null; };
    var getValueChain = function (p) {
        var keys$$1 = typeof p === 'string' ? p.split(' ') : p;
        var values$$1 = [];
        var next = 'start';
        while (next) {
            next = getValue(keys$$1.concat(values$$1)) || '';
            next && values$$1.push(next);
        }
        return values$$1;
    };
    var getPairs = function (p) {
        var keys$$1 = typeof p === 'string' ? p.split(' ') : p;
        return getValues(keys$$1).reduce(function (pairs, key) {
            var val = getValue(keys$$1.concat([key]));
            return pairs.concat([[key, val]]);
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
var Tokenizer = { tokenize: tokenize };

var fromSource = function (source, ownerId, spaceName) {
    var _a, _b, _c;
    if (ownerId === void 0) { ownerId = ''; }
    if (spaceName === void 0) { spaceName = ''; }
    var tokenized = Tokenizer.tokenize(source);
    var obj = __assign({}, tokenized);
    var isPresent = tokenized.isPresent, getValue = tokenized.getValue, getValues = tokenized.getValues, getValueChain = tokenized.getValueChain, getPairs = tokenized.getPairs;
    _a = getValueChain('sourced from page'), _b = _a[0], obj.fromPageAuthor = _b === void 0 ? ownerId : _b, _c = _a[1], obj.fromPageName = _c === void 0 ? spaceName ? "space:" + spaceName : undefined : _c;
    obj.displayName = tokenized.getValue('name') || spaceName;
    obj.indexer = getValue('tabulator') || Config.indexer;
    obj.tabulator = getValue('tabulator') || obj.indexer;
    obj.tabs = getPairs('tab');
    obj.sort = getValue('sort');
    // TODO: breaks with custom names
    if (obj.sort === 'default')
        obj.sort = getValue('tab');
    obj.uniqueByContent = !!isPresent('unique by content');
    obj.curators = getValues('curator');
    obj.moderators = getValues('mod');
    obj.includeRanks = !!isPresent('show ranks');
    obj.stickyIds = getValues('sticky');
    obj.isIdSticky = function (id) { return !!tokenized.isPresent(['sticky', id]); };
    obj.isChat = !!isPresent('display as chat');
    obj.submitTopics = getValues('submit to');
    obj.submitTopic = getValue('submit to');
    obj.chatTopic = getValue('chat in');
    if (ownerId && spaceName) {
        obj.spaceName = spaceName;
        obj.owner = ownerId;
        obj.useForComments = !tokenized.isPresent('comments leave space');
        obj.basePath = "/user/" + ownerId + "/spaces/" + spaceName;
        if (obj.submitTopic)
            obj.submitPath = obj.basePath + "/submit";
        obj.defaultTab = tokenized.getValue('tab');
        obj.defaultTabPath = obj.defaultTab ? tokenized.getValue(['tab', obj.defaultTab]) : null;
    }
    obj.filters = {
        functions: [],
        allow: {
            repliesTo: getValue('replies to author'),
            type: getValue('type'),
            ops: getValues('op'),
            aliases: getValues('alias'),
            authors: getValues('author'),
            domains: getValues('domain'),
            topics: getValues('topic'),
            listings: getValues('listing'),
            kinds: getValues('kind'),
            anon: !isPresent('require signed'),
            signed: !isPresent('require anon')
        },
        deny: {
            aliases: getValues('ban alias'),
            authors: getValues('ban author'),
            domains: getValues('ban domain'),
            topics: getValues('ban topic'),
            anon: !!isPresent('require signed'),
            signed: !!isPresent('require anon'),
            tags: getPairs('can remove')
        }
    };
    obj.voteFilters = {
        functions: [],
        upsMin: parseInt(getValue('ups above') || '', 10) || null,
        upsMax: parseInt(getValue('ups below') || '', 10) || null,
        downsMin: parseInt(getValue('downs above') || '', 10) || null,
        downsMax: parseInt(getValue('downs below') || '', 10) || null,
        scoreMin: parseInt(getValue('score above') || '', 10) || null,
        scoreMax: parseInt(getValue('score below') || '', 10) || null
    };
    obj.censors = uniq(map(nth(1), obj.filters.deny.tags));
    return obj;
};
var ListingDefinition = { fromSource: fromSource };

var needsScores = function (definition) {
    return !!find(definition.isPresent, [
        'sort hot',
        'sort top',
        'sort best',
        'sort controversial',
        'ups',
        'downs',
        'score',
        'can remove'
    ]);
};
var needsData = function (definition) {
    return !!find(definition.isPresent, [
        'topic',
        'domain',
        'author',
        'unique by content',
        'kind',
        'type',
        'require signed',
        'require anon',
        'alias',
        'ban domain',
        'ban topic',
        'ban author',
        'ban alias'
    ]);
};
var listingSource = function (definition) {
    var listings = pathOr([], ['filters', 'allow', 'listings'], definition);
    var sort = definition.sort;
    var listingPaths = map(function (l) { return l + "/" + sort; }, listings);
    return { listingPaths: listingPaths };
};
var topicSource = function (definition) {
    var sort = definition.sort;
    var topics = pathOr([], ['filters', 'allow', 'topics'], definition);
    if (!topics.length)
        topics.push('all');
    var listingPaths = map(function (t) { return "/t/" + t + "/" + sort; }, topics);
    return { listingPaths: listingPaths };
};
var domainSource = function (definition) {
    var sort = definition.sort;
    var domains = pathOr([], ['filters', 'allow', 'domains'], definition);
    if (!domains.length)
        return topicSource(definition);
    var listingPaths = map(function (d) { return "/domain/" + d + "/" + sort; }, domains);
    return { listingPaths: listingPaths };
};
var authorSource = function (definition) {
    var sort = definition.sort;
    var authorIds = pathOr([], ['filters', 'allow', 'authors'], definition);
    var type = path(['filters', 'allow', 'type'], definition) || 'overview';
    if (!authorIds.length)
        return topicSource(definition);
    var listingPaths = map(function (id) { return "/user/" + id + "/" + type + "/" + sort; }, authorIds);
    return { listingPaths: listingPaths };
};
var curatorSource = function (definition) {
    var sort = definition.sort;
    var curators = prop('curators', definition) || [];
    if (!curators.length)
        return topicSource(definition);
    var listingPaths = map(function (id) { return "/user/" + id + "/commented/" + sort; }, curators);
    return { listingPaths: listingPaths };
};
var opSource = function (definition) {
    var sort = definition.sort;
    var submissionIds = pathOr([], ['filters', 'allow', 'ops'], definition);
    if (!submissionIds.length)
        topicSource(definition);
    var listingPaths = map(function (id) { return "/things/" + id + "/comments/" + sort; }, submissionIds);
    return { listingPaths: listingPaths };
};
var repliesSource = function (definition) {
    var sort = definition.sort;
    var id = path(['filters', 'allow', 'repliesTo'], definition);
    var type = path(['filters', 'allow', 'type'], definition);
    var listingPaths = ["/user/" + id + "/replies/" + type + "/" + sort];
    return { listingPaths: listingPaths };
};
var sources = {
    op: opSource,
    listing: listingSource,
    replies: repliesSource,
    curator: curatorSource,
    author: authorSource,
    domain: domainSource,
    topic: topicSource
};
var sourceNames = keys(sources);
var sourceName = function (def) { return find(def.isPresent, sourceNames) || 'topic'; };
var fromDefinition = function (definition) {
    var name = sourceName(definition);
    return mergeLeft({ name: name }, sources[name](definition));
};
var ListingDataSource = {
    fromDefinition: fromDefinition,
    sources: sources,
    needsScores: needsScores,
    needsData: needsData
};

var _this = undefined;
var intPath = function (p) {
    return compose(parseInt, pathOr('', p));
};
var fromDefinition$1 = function (definition) {
    var filters = definition.filters, voteFilters = definition.voteFilters, isPresent = definition.isPresent;
    var filterFunctions = [];
    var voteFilterFunctions = [];
    var addFilter = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return filterFunctions.push(compose.apply(R, fns));
    };
    var addSubmissionFilter = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return addFilter(cond([
            [pathEq(['data', 'kind'], 'submission'), compose.apply(R, fns)],
            [T, T]
        ]));
    };
    var addVoteFilter = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return voteFilterFunctions.push(compose.apply(R, fns));
    };
    if (filters.allow.aliases.length) {
        addFilter(function (t) { return !!isPresent(['alias', t]); }, path(['data', 'author']));
    }
    if (filters.allow.authors.length) {
        addFilter(function (t) { return !!isPresent(['author', t]); }, path(['data', 'authorId']));
    }
    if (filters.allow.domains.length) {
        addSubmissionFilter(function (t) { return !!isPresent(['domain', t]); }, ThingDataNode.domain, prop('data'));
    }
    if (filters.allow.topics.length &&
        !find(compose(identical('all'), last, split(':')), filters.allow.topics)) {
        addFilter(function (item) {
            var topic = path(['data', 'topic'], item);
            var kind = path(['data', 'kind'], item);
            return !!isPresent(['topic', topic]);
        });
    }
    if (filters.allow.kinds.length) {
        addFilter(function (kind) { return !!isPresent(['kind', kind]); }, path(['data', 'kind']));
    }
    if (filters.allow.type === 'commands') {
        addFilter(compose(test(Constants.COMMAND_RE), pathOr('', ['data', 'body'])));
    }
    if (filters.deny.aliases.length) {
        addFilter(function (alias) { return !isPresent(['ban', 'alias', alias]); }, path(['data', 'author']));
    }
    if (filters.deny.authors.length) {
        addFilter(function (authorId) { return !isPresent(['ban', 'author', authorId]); }, path(['data', 'authorId']));
    }
    if (filters.deny.domains.length) {
        addSubmissionFilter(function (domain) { return !domain || !isPresent(['ban', 'domain', domain]); }, ThingDataNode.domain, prop('data'));
    }
    if (filters.deny.topics.length) {
        addFilter(function (topic) { return !isPresent(['ban', 'topic', topic]); }, path(['data', 'topic']));
    }
    if (filters.deny.anon)
        addFilter(path(['data', 'authorId']));
    if (filters.deny.signed) {
        addFilter(compose(function (authorId) { return !authorId; }, pathOr('', ['data', 'authorId'])));
    }
    if (voteFilters.upsMin !== null) {
        addVoteFilter(lte(voteFilters.upsMin), intPath(['votes', 'up']));
    }
    if (voteFilters.upsMax !== null) {
        addVoteFilter(gte(voteFilters.upsMax), intPath(['votes', 'up']));
    }
    if (voteFilters.downsMin !== null) {
        addVoteFilter(lte(voteFilters.downsMin), intPath(['votes', 'down']));
    }
    if (voteFilters.downsMax !== null) {
        addVoteFilter(gte(voteFilters.downsMax), intPath(['votes', 'down']));
    }
    if (voteFilters.scoreMin !== null) {
        addVoteFilter(lte(voteFilters.scoreMin), intPath(['votes', 'score']));
    }
    if (voteFilters.scoreMax !== null) {
        addVoteFilter(gte(voteFilters.scoreMax), intPath(['votes', 'score']));
    }
    if (filters.deny.tags.length) {
        addVoteFilter(function (thing) {
            var cmds = path(['votes', 'commands'], thing) || {};
            return !filters.deny.tags.find(function (_a) {
                var tagName = _a[0], authorId = _a[1];
                return !!path([authorId, 'tag', tagName], cmds);
            });
        });
    }
    var contentFilter = function (thing) { return !filterFunctions.find(function (fn) { return !fn(thing); }); };
    var voteFilter = function (thing) { return !voteFilterFunctions.find(function (fn) { return !fn(thing); }); };
    var thingFilter = function (thing) {
        return definition.isIdSticky(propOr('', 'id', thing)) || (contentFilter(thing) && voteFilter(thing));
    };
    return { thingFilter: thingFilter, contentFilter: contentFilter, voteFilter: voteFilter };
};
var getFilteredRows = function (scope$$1, spec, sortedRows, params) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, limitProp, _c, countProp, _d, _e, filterFn, limit, count, rows, filtered, data, fetchBatch, res;
    var _this = this;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = params || {}, _b = _a.limit, limitProp = _b === void 0 ? '25' : _b, _c = _a.count, countProp = _c === void 0 ? '0' : _c, _d = _a.after, _e = _a.filterFn, filterFn = _e === void 0 ? always(resolve(true)) : _e;
                limit = parseInt(limitProp, 10);
                count = parseInt(countProp, 10) || 0;
                rows = sortedRows.slice();
                filtered = [];
                data = [];
                fetchBatch = function (size) {
                    if (size === void 0) { size = 30; }
                    return all(map(function (row) { return __awaiter(_this, void 0, void 0, function () {
                        var inListing, itemData, url;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    inListing = true;
                                    if (!row[ListingNode.POS_ID]) {
                                        console.log('blankRow', row);
                                        return [2 /*return*/];
                                    }
                                    if (!filterFn) return [3 /*break*/, 2];
                                    return [4 /*yield*/, filterFn(row[ListingNode.POS_ID] || '')];
                                case 1:
                                    inListing = _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (!inListing) return [3 /*break*/, 5];
                                    if (!spec.uniqueByContent) return [3 /*break*/, 4];
                                    return [4 /*yield*/, Query.thingData(scope$$1, row[ListingNode.POS_ID])];
                                case 3:
                                    itemData = _a.sent();
                                    url = ThingDataNode.url(itemData);
                                    if (url &&
                                        find(compose(equals(url), ThingDataNode.url), data)) {
                                        return [2 /*return*/];
                                    }
                                    data.push(itemData);
                                    _a.label = 4;
                                case 4:
                                    filtered.push(row);
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); }, rows.splice(count, size)));
                };
                _f.label = 1;
            case 1:
                if (!(rows.length > count)) return [3 /*break*/, 3];
                return [4 /*yield*/, fetchBatch()];
            case 2:
                res = _f.sent();
                if (limit && filtered.length >= limit)
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, compose(limit
                    ? slice(0, limit)
                    : identity, sortBy(nth(ListingNode.POS_VAL)), always(filtered))()];
        }
    });
}); };
var getFilteredIds = compose(function (x) { return x.then(map(nth(ListingNode.POS_ID))); }, getFilteredRows);
var thingFilter = curry(function (scope$$1, spec, thingId) {
    if (spec.isIdSticky(thingId))
        return resolve(true);
    return Query.thingMeta(scope$$1, {
        tabulator: spec.tabulator,
        thingSoul: Schema.Thing.route.reverse({ thingId: thingId }),
        scores: ListingDataSource.needsScores(spec),
        data: ListingDataSource.needsData(spec)
    }).then(spec.thingFilter);
});
var ListingFilter = {
    fromDefinition: fromDefinition$1,
    getFilteredRows: getFilteredRows,
    getFilteredIds: getFilteredIds,
    thingFilter: thingFilter
};

var fromSource$1 = compose(apply(mergeLeft), juxt([ListingFilter.fromDefinition, identity]), apply(assoc('dataSource')), juxt([ListingDataSource.fromDefinition, identity]), ListingDefinition.fromSource);
var getSource = query(function (scope$$1, authorId, name, extra) {
    if (extra === void 0) { extra = ''; }
    return Query.wikiPage(scope$$1, authorId, name).then(compose(function (body) { return body + "\n# added by indexer\n" + (extra || '') + "\nsourced from page " + authorId + " " + name + "\n"; }, ThingDataNode.body));
});
var ListingSpec = { fromSource: fromSource$1, getSource: getSource };

var _a$1 = [0, 1], POS_ID$1 = _a$1[0], POS_VAL$1 = _a$1[1];
var toIds = map(nth(POS_ID$1));
var sortItems = sortBy(nth(POS_VAL$1));
var voteSort = function (fn) {
    return query(function (scope$$1, thingId, spec) {
        if (spec.isIdSticky(thingId))
            return resolve(-Infinity);
        if (includes(thingId, spec.filters.allow.ops))
            return resolve(-Infinity);
        return Query.thingMeta(scope$$1, {
            tabulator: spec.tabulator,
            scores: true,
            thingSoul: Schema.Thing.route.reverse({ thingId: thingId })
        }).then(fn);
    });
};
var timeSort = function (fn) {
    return query(function (scope$$1, thingId, spec) {
        return Query.thingMeta(scope$$1, {
            tabulator: spec.tabulator,
            thingSoul: Schema.Thing.route.reverse({ thingId: thingId })
        }).then(fn);
    });
};
var sorts = {
    new: timeSort(compose(multiply(-1), parseInt, propOr(0, 'timestamp'))),
    top: voteSort(compose(function (x) { return -1 * parseInt(x, 10); }, pathOr('0', ['votes', 'score']))),
    comments: voteSort(compose(function (x) { return -1 * parseFloat(x); }, pathOr('0', ['votes', 'comment']))),
    discussed: voteSort(function (thing) {
        var timestamp = parseInt(propOr('', 'timestamp', thing), 10);
        var score = parseInt(pathOr(0, ['votes', 'comment'], thing), 10);
        var seconds = timestamp / 1000 - 1134028003;
        var order = Math.log10(Math.max(Math.abs(score), 1));
        if (!score)
            return 1000000000 - seconds;
        return -1 * (order + seconds / 45000);
    }),
    hot: voteSort(function (thing) {
        var timestamp = parseInt(propOr('', 'timestamp', thing), 10);
        var score = parseInt(pathOr(0, ['votes', 'score'], thing), 10);
        var seconds = timestamp / 1000 - 1134028003;
        var order = Math.log10(Math.max(Math.abs(score), 1));
        var sign = 0;
        if (score > 0) {
            sign = 1;
        }
        else if (score < 0) {
            sign = -1;
        }
        return -1 * (sign * order + seconds / 45000);
    }),
    best: voteSort(function (thing) {
        var ups = parseInt(pathOr(0, ['votes', 'up'], thing), 10);
        var downs = parseInt(pathOr(0, ['votes', 'down'], thing), 10);
        var n = ups + downs;
        if (n === 0)
            return 0;
        var z = 1.281551565545; // 80% confidence
        var p = ups / n;
        var left = p + (1 / (2 * n)) * z * z;
        var right = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
        var under = 1 + (1 / n) * z * z;
        return -1 * ((left - right) / under);
    }),
    controversial: voteSort(function (thing) {
        var ups = parseInt(pathOr(0, ['votes', 'up'], thing), 10);
        var downs = parseInt(pathOr(0, ['votes', 'down'], thing), 10);
        if (ups <= 0 || downs <= 0)
            return 0;
        var magnitude = ups + downs;
        var balance = ups > downs ? downs / ups : ups / downs;
        return -1 * Math.pow(magnitude, balance);
    })
};
var isValidSort = function (sort) { return !!(sort in sorts); };
var ListingSort = {
    POS_ID: POS_ID$1,
    POS_VAL: POS_VAL$1,
    sorts: sorts,
    isValidSort: isValidSort,
    toIds: toIds,
    sortItems: sortItems
};

var splitDomains = compose(sortBy(identity), filter(identity), map(trim), split('+'), toLower, defaultTo(''));
var splitTopics = compose(ifElse(prop('length'), identity, always(['all'])), splitDomains);
var withRoute = function (obj) { return assoc('route', new Route(obj.path), obj); };
var Path = { splitDomains: splitDomains, splitTopics: splitTopics, withRoute: withRoute };

var path$1 = '/t/:topic/:sort';
var tabs = ['hot', 'new', 'discussed', 'controversial', 'top', 'firehose'];
var getSource$1 = query(function (scope$$1, _a) {
    var topic = _a.topic, sort = _a.sort;
    var topics = Path.splitTopics(topic);
    var submitTo = topics[0] === 'all' ? 'whatever' : topics[0];
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:topic', [
        "name " + topic,
        "submit to " + submitTo,
        "sort " + sort,
        topic.indexOf(':') === -1 ? 'kind submission' : ''
    ].concat(map(function (topic) { return "topic " + topic; }, topics), map(function (tab) { return "tab " + tab + " /t/" + topic + "/" + tab; }, tabs)).join('\n'));
});
var getSpec = query(function (scope$$1, match$$1) {
    return getSource$1(scope$$1, match$$1).then(pipe(ListingSpec.fromSource, assoc('basePath', "/t/" + match$$1.topic)));
});
var TopicListing = Path.withRoute({
    tabs: tabs,
    path: path$1,
    getSource: getSource$1,
    getSpec: getSpec
});

var path$2 = '/t/:topic/chat';
var tabs$1 = TopicListing.tabs.concat(['chat']);
var getSource$2 = query(function (scope$$1, _a) {
    var topic = _a.topic, sort = _a.sort;
    var normalTopics = Path.splitTopics(topic);
    var submitTo = topic === 'all' ? 'whatever' : normalTopics[0] || 'whatever';
    var topics = reduce(function (res, topic) { return res.concat(["chat:" + topic]); }, [], normalTopics);
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:chat', [
        'sort new',
        'display as chat',
        "submit to " + submitTo,
        "sort " + sort
    ].concat(map(function (topic) { return "topic " + topic; }, topics), map(function (tab) { return "tab " + tab + " /t/" + topic + "/" + tab; }, tabs$1)).join('\n'));
});
var getSpec$1 = query(function (scope$$1, match$$1) {
    return getSource$2(scope$$1, match$$1).then(function (source) { return ListingSpec.fromSource(source); });
});
var ChatListing = Path.withRoute({
    path: path$2,
    getSource: getSource$2,
    getSpec: getSpec$1
});

var path$3 = '/t/:topic/firehose';
var tabs$2 = TopicListing.tabs;
var getSource$3 = query(function (scope$$1, _a) {
    var topic = _a.topic, sort = _a.sort;
    var normalTopics = Path.splitTopics(topic);
    var submitTo = topic === 'all' ? 'whatever' : normalTopics[0] || 'whatever';
    var topics = normalTopics.reduce(function (res, topic) { return res.concat([topic, "chat:" + topic, "comments:" + topic]); }, []);
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:firehose', [
        'sort new',
        'display as chat',
        "submit to " + submitTo,
        "sort " + sort
    ].concat(map(function (topic) { return "topic " + topic; }, topics), map(function (tab) { return "tab " + tab + " /t/" + topic + "/" + tab; }, tabs$2)).join('\n'));
});
var getSpec$2 = query(function (scope$$1, match$$1) { return getSource$3(scope$$1, match$$1).then(ListingSpec.fromSource); });
var FirehoseListing = Path.withRoute({
    tabs: tabs$2,
    path: path$3,
    getSource: getSource$3,
    getSpec: getSpec$2
});

var path$4 = '/user/:authorId/commented/:sort';
var getSource$4 = query(function (scope$$1, _a) {
    var authorId = _a.authorId, sort = _a.sort;
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:commented', ["curator " + authorId, "sort " + sort].join('\n'));
});
var getSpec$3 = query(function (scope$$1, match$$1) { return getSource$4(scope$$1, match$$1).then(ListingSpec.fromSource); });
var CommentedListing = Path.withRoute({ path: path$4, getSource: getSource$4, getSpec: getSpec$3 });

var path$5 = '/domain/:domain/:sort';
var tabs$3 = ['hot', 'new', 'discussed', 'controversial', 'top'];
var getSource$5 = query(function (scope$$1, _a) {
    var domain = _a.domain, sort = _a.sort;
    var domains = Path.splitTopics(domain);
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:domain', [
        "name " + domains[0],
        'submit to whatever',
        "sort " + sort,
        'kind submission'
    ].concat(map(function (domain) { return "domain " + domain; }, domains), map(function (tab) { return "tab " + tab + " /domain/" + domain + "/" + tab; }, tabs$3)).join('\n'));
});
var getSpec$4 = query(function (scope$$1, match$$1) { return getSource$5(scope$$1, match$$1).then(ListingSpec.fromSource); });
var DomainListing = Path.withRoute({
    path: path$5,
    tabs: tabs$3,
    getSource: getSource$5,
    getSpec: getSpec$4
});

var path$6 = '/things/:thingId/comments/:sort';
var getSource$6 = query(function (scope$$1, _a) {
    var thingId = _a.thingId, sort = _a.sort;
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:comments', ["op " + thingId, "sort " + sort].join('\n'));
});
var getSpec$5 = query(function (scope$$1, match$$1) { return getSource$6(scope$$1, match$$1).then(ListingSpec.fromSource); });
var CommentListing = Path.withRoute({
    path: path$6,
    getSource: getSource$6,
    getSpec: getSpec$5
});

var tabs$4 = ['hot', 'new', 'discussed', 'controversial', 'top'];
var configPageName = function (name) { return "space:" + name; };
var sidebarPageName = function (name) { return "space:" + name + ":sidebar"; };
var sourceWithDefaults = curry(function (ownerId, name, source) {
    var result = [source || ''];
    var tokenized = Tokenizer.tokenize(source);
    if (!tokenized.getValue('tab')) {
        tabs$4.map(function (tab) { return result.push("tab " + tab + " /user/" + ownerId + "/spaces/" + name + "/" + tab); });
    }
    var indexer = tokenized.getValue('indexer');
    if (!indexer) {
        result.push("indexer " + Config.indexer);
        indexer = Config.indexer;
    }
    var tabulator = tokenized.getValue('tabulator');
    if (!tabulator)
        result.push("tabulator " + indexer);
    return result.join('\n');
});
var getSource$7 = query(function (scope$$1, authorId, name, extra) {
    return ListingSpec.getSource(scope$$1, authorId, configPageName(name), extra).then(sourceWithDefaults(authorId, name));
});
var getSpec$6 = query(function (scope$$1, authorId, name, extra) {
    return getSource$7(scope$$1, authorId, name, extra).then(function (source) {
        return ListingSpec.fromSource(source, authorId, name);
    });
});
var nodeToSpaceNames = compose(sortBy(identity), map(replace(/^space:/, '')), filter(compose(propOr(false, 'length'), match(/^space:[^:]*$/))), keysIn);
var userSpaceNames = query(function (scope$$1, authorId) {
    return Query.userPages(scope$$1, authorId).then(nodeToSpaceNames);
});
var SpaceSpec = {
    configPageName: configPageName,
    sidebarPageName: sidebarPageName,
    nodeToSpaceNames: nodeToSpaceNames,
    userSpaceNames: userSpaceNames,
    tabs: tabs$4,
    getSource: getSource$7,
    getSpec: getSpec$6
};

var path$7 = '/user/:authorId/spaces/:name/:sort';
var getSource$8 = query(function (scope$$1, _a) {
    var authorId = _a.authorId, name = _a.name, sort = _a.sort;
    return SpaceSpec.getSource(scope$$1, authorId, name, "sort " + sort);
});
var getSpec$7 = query(function (scope$$1, _a) {
    var authorId = _a.authorId, name = _a.name, sort = _a.sort;
    return SpaceSpec.getSpec(scope$$1, authorId, name, "sort " + sort);
});
var SpaceListing = Path.withRoute({
    path: path$7,
    getSource: getSource$8,
    getSpec: getSpec$7
});

var path$8 = '/user/:authorId/spaces/:name/comments/:thingId/:sort';
var getSource$9 = query(function (scope$$1, _a) {
    var thingId = _a.thingId, authorId = _a.authorId, name = _a.name, sort = _a.sort;
    return SpaceSpec.getSource(scope$$1, authorId, name, ["op " + thingId, "sort " + sort].join('\n'));
});
var getSpec$8 = query(function (scope$$1, _a) {
    var thingId = _a.thingId, authorId = _a.authorId, name = _a.name, sort = _a.sort;
    return SpaceSpec.getSpec(scope$$1, authorId, name, ["op " + thingId, "sort " + sort].join('\n'));
});
var SpaceCommentListing = Path.withRoute({
    path: path$8,
    getSource: getSource$9,
    getSpec: getSpec$8
});

var path$9 = '/user/:authorId/replies/:type/:sort';
var getSource$a = query(function (scope$$1, _a) {
    var authorId = _a.authorId, type = _a.type, _b = _a.sort, sort = _b === void 0 ? 'new' : _b;
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:inbox', ["replies to author " + authorId, 'kind comment', "type " + type, "sort " + sort].join('\n'));
});
var getSpec$9 = query(function (scope$$1, match$$1) { return getSource$a(scope$$1, match$$1).then(ListingSpec.fromSource); });
var InboxListing = Path.withRoute({
    path: path$9,
    getSource: getSource$a,
    getSpec: getSpec$9
});

var path$a = '/user/:authorId/:type/:sort';
var tabs$5 = ['overview', 'comments', 'submitted', 'commands'];
var getSource$b = query(function (scope$$1, _a) {
    var authorId = _a.authorId, type = _a.type, sort = _a.sort;
    return ListingSpec.getSource(scope$$1, Config.indexer, 'listing:profile', [
        "author " + authorId,
        "type " + type,
        "sort " + sort
    ].concat(map(function (tab) { return "tab " + tab + " /user/" + authorId + "/" + tab; }, tabs$5)).join('\n'));
});
var getSpec$a = query(function (scope$$1, match$$1) {
    return Query.userMeta(scope$$1, match$$1.authorId).then(function (meta) {
        return getSource$b(scope$$1, match$$1).then(pipe(ListingSpec.fromSource, mergeLeft({
            profileId: match$$1.authorId,
            displayName: propOr('', 'alias', meta)
        })));
    });
});
var ProfileListing = Path.withRoute({
    path: path$a,
    tabs: tabs$5,
    getSource: getSource$b,
    getSpec: getSpec$a
});

var types = {
    ChatListing: ChatListing,
    FirehoseListing: FirehoseListing,
    TopicListing: TopicListing,
    DomainListing: DomainListing,
    CommentListing: CommentListing,
    SpaceCommentListing: SpaceCommentListing,
    SpaceListing: SpaceListing,
    InboxListing: InboxListing,
    CommentedListing: CommentedListing,
    ProfileListing: ProfileListing
};
var typesArray = values(types);
var fromPath = function (path$$1) {
    var match$$1;
    for (var i = 0; i < typesArray.length; i++) {
        match$$1 = typesArray[i].route.match(path$$1);
        if (match$$1)
            return assoc('match', match$$1, typesArray[i]);
    }
    return null;
};
var ListingType = __assign({}, types, { types: types,
    fromPath: fromPath });

var ListingQuery = /** @class */ (function () {
    function ListingQuery(path$$1, parent) {
        this.listings = [];
        this.viewCache = parent ? parent.viewCache : {};
        this.sourced = {};
        this.checked = {};
        this.path = path$$1;
        this.type = ListingType.fromPath(path$$1);
        if (!this.type)
            throw new Error("Can't find type for path: " + path$$1);
        this.spec = ListingSpec.fromSource('');
        this.rowsFromNode = parent ? parent.rowsFromNode : memoize(ListingNode.rows);
        this.combineSourceRows = parent
            ? parent.combineSourceRows
            : memoize(pipe(reduce(concat, []), ListingNode.sortRows, uniqBy(nth(ListingNode.POS_ID))));
    }
    ListingQuery.prototype.space = function (scope$$1) {
        var _this = this;
        return this.type.getSpec(scope$$1, this.type.match).then(function (baseSpec) {
            var spec = baseSpec;
            if (_this.type.match.sort === 'default') {
                spec = assoc('path', _this.type.route.reverse(assoc('sort', spec.sort, _this.type.match)), spec);
            }
            else {
                spec = assoc('path', _this.path, baseSpec);
            }
            if (spec.submitTopic && !spec.submitPath) {
                spec = assoc('submitPath', "/t/" + spec.submitTopic + "/submit", spec);
            }
            if (!equals(_this.spec, spec)) {
                _this.spec = spec;
                _this.checked = {};
            }
            return _this.spec;
        });
    };
    ListingQuery.prototype.sidebar = function (scope$$1) {
        return this.space(scope$$1).then(function (spec) {
            var _a = spec || {}, _b = _a.fromPageAuthor, fromPageAuthor = _b === void 0 ? '' : _b, _c = _a.fromPageName, fromPageName = _c === void 0 ? '' : _c;
            if (!fromPageAuthor || !fromPageName)
                return null;
            return Query.wikiPage(scope$$1, fromPageAuthor, fromPageName + ":sidebar");
        });
    };
    ListingQuery.prototype.unfilteredRows = function (scope$$1) {
        var _this = this;
        if (!this.type)
            return Promise.resolve([]);
        return this.space(scope$$1)
            .then(function (spec) {
            var paths = pathOr([], ['dataSource', 'listingPaths'], spec);
            var listingPaths = without([_this.path], paths);
            _this.listings = listingPaths.map(function (path$$1) { return _this.viewCache[path$$1] || (_this.viewCache[path$$1] = new ListingQuery(path$$1, _this)); });
            if (!_this.listings.length) {
                return scope$$1.get(ListingNode.soulFromPath(spec.indexer, _this.path)).then(pipe(_this.rowsFromNode, of, _this.combineSourceRows));
            }
            return Promise.all(_this.listings.map(function (l) { return l.unfilteredRows(scope$$1); })).then(_this.combineSourceRows);
        })
            .then(function (rows) {
            _this.sourced = indexBy(nth(ListingNode.POS_ID), rows);
            return rows;
        });
    };
    ListingQuery.prototype._setChecked = function (id, checked) {
        this.checked[id] = checked;
        return checked;
    };
    ListingQuery.prototype.checkId = function (scope$$1, id) {
        return __awaiter(this, void 0, void 0, function () {
            var filterFn, listings, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.checked[id])
                            return [2 /*return*/, true];
                        if (this.spec.isIdSticky(id))
                            return [2 /*return*/, this._setChecked(id, true)];
                        if (!(id in this.sourced))
                            return [2 /*return*/, this._setChecked(id, false)];
                        filterFn = ListingFilter.thingFilter(scope$$1, this.spec);
                        return [4 /*yield*/, filterFn(id)];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/, this._setChecked(id, false)];
                        listings = this.listings.slice();
                        if (!listings.length)
                            return [2 /*return*/, this._setChecked(id, true)];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < listings.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, listings[i].checkId(scope$$1, id)];
                    case 3:
                        if (_a.sent()) {
                            return [2 /*return*/, this._setChecked(id, true)];
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, this._setChecked(id, false)];
                }
            });
        });
    };
    ListingQuery.prototype.ids = function (scope$$1, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        return this.unfilteredRows(scope$$1).then(function (rows) {
            var stickyRows = map(function (id) { return [-1, id, -Infinity]; }, _this.spec.stickyIds);
            var filterFn = function (id) { return _this.checkId(scope$$1, id); };
            return ListingFilter.getFilteredIds(scope$$1, _this.spec, stickyRows.concat(rows), __assign({}, opts, { filterFn: filterFn }));
        });
    };
    return ListingQuery;
}());

var Listing = __assign({}, ListingType.types, { ListingNode: ListingNode,
    ListingSpec: ListingSpec,
    ListingQuery: ListingQuery, isValidSort: ListingSort.isValidSort, idsToSouls: ListingNode.idsToSouls, get: ListingNode.get, typeFromPath: ListingType.fromPath });

var ThingQueue = /** @class */ (function () {
    function ThingQueue(peer, config, scopeOpts) {
        if (config === void 0) { config = ''; }
        if (scopeOpts === void 0) { scopeOpts = {}; }
        this.spec = ListingSpec.fromSource(config);
        this.peer = peer;
        this.newIds = [];
        this.updatedIds = [];
        this.processingId = '';
        this.scopeOpts = scopeOpts;
    }
    ThingQueue.prototype.length = function () {
        return this.newIds.length + this.updatedIds.length + (this.processingId ? 1 : 0);
    };
    ThingQueue.prototype.contains = function (id) {
        return this.newIds.indexOf(id) !== -1 || this.updatedIds.indexOf(id) !== -1;
    };
    ThingQueue.prototype.enqueue = function (id, isNew) {
        if (isNew === void 0) { isNew = false; }
        if (this.contains(id))
            return;
        (isNew ? this.newIds : this.updatedIds).splice(0, 0, id);
        // tslint:disable-next-line: no-floating-promises
        this.processNext();
    };
    ThingQueue.prototype.dequeue = function () {
        return this.newIds.pop() || this.updatedIds.pop() || '';
    };
    // tslint:disable-next-line: no-empty
    ThingQueue.prototype.processNext = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    // tslint:disable-next-line: no-empty
    ThingQueue.prototype.onPut = function (msg) { };
    return ThingQueue;
}());

function getListings(scope$$1, thingId) {
    return __awaiter(this, void 0, void 0, function () {
        var listings, _a, data, scores, kind, authorId, topic, domain, taggedBy, opId, replyToId, isCommand, replyToThingData, replyToAuthorId, replyToKind;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!thingId)
                        return [2 /*return*/, []];
                    listings = [];
                    return [4 /*yield*/, Promise.all([
                            Query.thingData(scope$$1, thingId),
                            Query.thingScores(scope$$1, thingId)
                        ])];
                case 1:
                    _a = _b.sent(), data = _a[0], scores = _a[1];
                    if (!data)
                        return [2 /*return*/, []];
                    kind = ThingDataNode.kind(data);
                    authorId = ThingDataNode.authorId(data);
                    topic = ThingDataNode.topic(data)
                        .trim()
                        .toLowerCase();
                    if (!(kind === 'submission')) return [3 /*break*/, 2];
                    domain = ThingDataNode.domain(data);
                    taggedBy = compose(without(['anon']), keysIn, function (x) { return (typeof x === 'string' ? {} : x); }, propOr({}, 'commands'))(scores);
                    if (topic)
                        listings.push("/t/" + topic);
                    if (topic !== 'all')
                        listings.push('/t/all');
                    if (domain)
                        listings.push("/domain/" + domain);
                    if (authorId) {
                        listings.push("/user/" + authorId + "/submitted");
                        listings.push("/user/" + authorId + "/overview");
                    }
                    taggedBy.forEach(function (tagAuthorId) { return listings.push("/user/" + tagAuthorId + "/commented"); });
                    return [3 /*break*/, 6];
                case 2:
                    if (!(kind === 'comment')) return [3 /*break*/, 5];
                    opId = ThingDataNode.opId(data);
                    replyToId = ThingDataNode.replyToId(data);
                    isCommand = ThingDataNode.isCommand(data);
                    if (opId)
                        listings.push("/things/" + opId + "/comments");
                    if (topic)
                        listings.push("/t/comments:" + topic);
                    if (topic !== 'all')
                        listings.push('/t/comments:all');
                    if (!replyToId) return [3 /*break*/, 4];
                    return [4 /*yield*/, Query.thingData(scope$$1, replyToId)];
                case 3:
                    replyToThingData = _b.sent();
                    replyToAuthorId = ThingDataNode.authorId(replyToThingData);
                    if (replyToAuthorId) {
                        replyToKind = ThingDataNode.kind(replyToThingData);
                        listings.push("/user/" + replyToAuthorId + "/replies/overview");
                        if (replyToKind === 'submission') {
                            listings.push("/user/" + replyToAuthorId + "/replies/submitted");
                        }
                        else if (replyToKind === 'comment') {
                            listings.push("/user/" + replyToAuthorId + "/replies/comments");
                        }
                    }
                    _b.label = 4;
                case 4:
                    if (authorId) {
                        listings.push("/user/" + authorId + "/comments");
                        listings.push("/user/" + authorId + "/overview");
                        if (isCommand)
                            listings.push("/user/" + authorId + "/commands");
                        // TODO: update commented
                    }
                    return [3 /*break*/, 6];
                case 5:
                    if (kind === 'chatmsg') {
                        if (topic)
                            listings.push("/t/chat:" + topic);
                        if (topic !== 'all')
                            listings.push('/t/chat:all');
                    }
                    _b.label = 6;
                case 6: return [2 /*return*/, listings];
            }
        });
    });
}
function describeThingId(scope$$1, thingId) {
    return __awaiter(this, void 0, void 0, function () {
        var spec, includes$$1, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!thingId)
                        return [2 /*return*/];
                    spec = ListingSpec.fromSource('');
                    return [4 /*yield*/, getListings(scope$$1, thingId)];
                case 1:
                    includes$$1 = _b.sent();
                    if (!includes$$1.length)
                        return [2 /*return*/];
                    _a = {
                        id: thingId,
                        includes: includes$$1
                    };
                    return [4 /*yield*/, Promise.all(toPairs(ListingSort.sorts).map(function (_a) {
                            var name = _a[0], sortFn = _a[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = [name];
                                            return [4 /*yield*/, sortFn(scope$$1, thingId, spec)];
                                        case 1: return [2 /*return*/, _b.concat([
                                                _c.sent()
                                            ])];
                                    }
                                });
                            });
                        }))];
                case 2: return [2 /*return*/, (_a.sorts = _b.sent(),
                        _a)];
            }
        });
    });
}
var descriptionToListingMap = function (declarativeUpdate) {
    var id = propOr('', 'id', declarativeUpdate);
    var includes$$1 = propOr([], 'includes', declarativeUpdate);
    var sorts = propOr([], 'sorts', declarativeUpdate);
    var results = [];
    for (var i = 0; i < includes$$1.length; i++) {
        var listing = includes$$1[i];
        for (var j = 0; j < sorts.length; j++) {
            var _a = sorts[j], sortName = _a[0], value = _a[1];
            results.push([listing + "/" + sortName, [[id, value]]]);
        }
    }
    return results;
};
var IndexerQueue = /** @class */ (function (_super) {
    __extends(IndexerQueue, _super);
    function IndexerQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexerQueue.prototype.processNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, startedAt, scope_1, description, listingMap, e_1, endedAt;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.processingId)
                            return [2 /*return*/];
                        id = (this.processingId = this.dequeue());
                        if (!id)
                            return [2 /*return*/];
                        startedAt = new Date().getTime();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        scope_1 = this.peer.newScope(this.scopeOpts);
                        return [4 /*yield*/, describeThingId(scope_1, id)];
                    case 2:
                        description = _a.sent();
                        listingMap = descriptionToListingMap(description);
                        // tslint:disable-next-line: await-promise
                        return [4 /*yield*/, Promise.all(listingMap.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var listingPath, updatedItems, soul, existing, diff;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            listingPath = item[0], updatedItems = item[1];
                                            soul = ListingNode.soulFromPath(Config.indexer, listingPath);
                                            return [4 /*yield*/, scope_1.get(soul).then()];
                                        case 1:
                                            existing = _a.sent();
                                            return [4 /*yield*/, ListingNode.diff(existing, updatedItems, [])];
                                        case 2:
                                            diff = _a.sent();
                                            if (!diff)
                                                return [2 /*return*/];
                                            console.log('writing', soul, diff);
                                            this.peer.gun.get(soul).put(diff);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        // tslint:disable-next-line: await-promise
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('Indexer error', e_1.stack || e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        endedAt = new Date().getTime();
                        console.log('indexed', (endedAt - startedAt) / 1000, this.length(), id);
                        this.processingId = '';
                        // tslint:disable-next-line: no-floating-promises
                        this.processNext();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexerQueue.prototype.onPut = function (msg) {
        var _this = this;
        compose(map(tap(function (_a) {
            var id = _a[0], isNew = _a[1];
            return id && _this.enqueue(id, isNew);
        })), uniqBy(nth(0)), map(function (soul) {
            var meta = pathOr({}, ['put', soul, '_', '>'], msg);
            var latest = values(meta)
                .sort()
                .pop();
            var now = new Date().getTime();
            var age = now - latest;
            if (age > Config.oracleMaxStaleness)
                return [];
            var thingMatch = Schema.Thing.route.match(soul);
            var thingDataMatch = Schema.ThingDataSigned.route.match(soul);
            var countsMatch = Schema.ThingVoteCounts.route.match(soul);
            var thingId = propOr('', 'thingId', thingMatch || thingDataMatch || countsMatch);
            return [thingId, !countsMatch];
        }), keysIn, propOr({}, 'put'))(msg);
    };
    return IndexerQueue;
}(ThingQueue));
var Indexer = {
    Queue: IndexerQueue,
    describeThingId: describeThingId
};

var tokenize$1 = compose(map(trim), split(' '), replace(Constants.COMMAND_RE, ''), defaultTo(''), nth(0), split('\n'));
var map$1 = function (thingData) {
    return reduce(function (cmdMap, id) {
        var body = pathOr('', [id, 'body'], thingData);
        var authorId = pathOr('anon', [id, 'authorId'], thingData);
        var timestamp = parseFloat(pathOr('', [id, 'timestamp'], thingData));
        if (!test(Constants.COMMAND_RE, body))
            return cmdMap;
        var tokenized = [authorId].concat(tokenize$1(body), [id]);
        return assocPath(tokenized.slice(0, 6), timestamp || 0, cmdMap);
    }, {}, keys(thingData));
};
var CommentCommand = { tokenize: tokenize$1, map: map$1 };

var _this$1 = undefined;
var tabulate = query(function (scope$$1, thingId) { return __awaiter(_this$1, void 0, void 0, function () {
    var _a, up, down, comment, replySouls, thingData, result, commandMap;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!thingId)
                    return [2 /*return*/, null];
                return [4 /*yield*/, all([
                        scope$$1.get(Schema.ThingVotesUp.route.reverse({ thingId: thingId })).count(),
                        scope$$1.get(Schema.ThingVotesDown.route.reverse({ thingId: thingId })).count(),
                        scope$$1.get(Schema.ThingAllComments.route.reverse({ thingId: thingId })).count(),
                        scope$$1.get(Schema.ThingComments.route.reverse({ thingId: thingId })).souls()
                    ])];
            case 1:
                _a = _b.sent(), up = _a[0], down = _a[1], comment = _a[2], replySouls = _a[3];
                return [4 /*yield*/, Query.thingDataFromSouls(scope$$1, replySouls)];
            case 2:
                thingData = _b.sent();
                result = {
                    up: up,
                    down: down,
                    comment: comment,
                    replies: replySouls.length,
                    score: up - down
                };
                if (thingData) {
                    commandMap = CommentCommand.map(thingData);
                    if (keys(commandMap).length)
                        result.commands = JSON.stringify(commandMap);
                }
                return [2 /*return*/, result];
        }
    });
}); });
var TabulatorQueue = /** @class */ (function (_super) {
    __extends(TabulatorQueue, _super);
    function TabulatorQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabulatorQueue.prototype.processNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var thingId, tabulator, countsSoul, scope$$1, existingCounts, updatedCounts, diff, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.processingId)
                            return [2 /*return*/];
                        thingId = (this.processingId = this.dequeue());
                        tabulator = this.spec.tabulator;
                        if (!thingId)
                            return [2 /*return*/];
                        countsSoul = Schema.ThingVoteCounts.route.reverse({ thingId: thingId, tabulator: tabulator });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        scope$$1 = this.peer.newScope(this.scopeOpts);
                        return [4 /*yield*/, scope$$1.get(countsSoul).then()];
                    case 2:
                        existingCounts = _a.sent();
                        return [4 /*yield*/, tabulate(scope$$1, thingId)];
                    case 3:
                        updatedCounts = _a.sent();
                        diff = GunNode.diff(existingCounts, updatedCounts);
                        if (keysIn(diff).length)
                            this.peer.gun.get(countsSoul).put(diff);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('Tabulator error', thingId, e_1.stack || e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        this.processingId = '';
                        // tslint:disable-next-line: no-floating-promises
                        this.processNext();
                        return [2 /*return*/];
                }
            });
        });
    };
    TabulatorQueue.prototype.onPut = function (msg) {
        var _this = this;
        compose(map(tap(function (_a) {
            var id = _a[0], isNew = _a[1];
            return id && _this.enqueue(id, isNew);
        })), uniqBy(nth(0)), map(function (soul) {
            var meta = pathOr({}, ['put', soul, '_', '>'], msg);
            var latest = values(meta)
                .sort()
                .pop();
            var now = new Date().getTime();
            var age = now - latest;
            if (age > Config.oracleMaxStaleness)
                return [];
            var thingMatch = Schema.Thing.route.match(soul);
            var votesUpMatch = Schema.ThingVotesUp.route.match(soul);
            var votesDownMatch = Schema.ThingVotesDown.route.match(soul);
            var allCommentsMatch = Schema.ThingAllComments.route.match(soul);
            var commentsMatch = Schema.ThingComments.route.match(soul);
            var thingId = propOr('', 'thingId', thingMatch || votesUpMatch || votesDownMatch || allCommentsMatch || commentsMatch);
            return [thingId, !(votesUpMatch || votesDownMatch || allCommentsMatch || commentsMatch)];
        }), keysIn, propOr({}, 'put'))(msg);
    };
    return TabulatorQueue;
}(ThingQueue));
var Tabulator = { Queue: TabulatorQueue, query: tabulate };

var Oracle = /** @class */ (function () {
    function Oracle(peer) {
        this.features = [];
        this.peer = peer;
        this.peer.gun.on('put', this.onPut.bind(this));
    }
    Oracle.prototype.use = function (feature) {
        this.features.push(feature);
    };
    Oracle.prototype.onPut = function (msg) {
        for (var i = 0; i < this.features.length; i++)
            this.features[i].onPut(msg);
    };
    return Oracle;
}());

function init(Gun, config) {
    if (config === void 0) { config = {}; }
    var _a = config || {}, _b = _a.leech, leech = _b === void 0 ? false : _b, _c = _a.disableValidation, disableValidation = _c === void 0 ? false : _c, _d = _a.noGun, noGun = _d === void 0 ? false : _d, _e = _a.localStorage, localStorage = _e === void 0 ? false : _e, _f = _a.persist, persist = _f === void 0 ? false : _f, rest = __rest(_a, ["leech", "disableValidation", "noGun", "localStorage", "persist"]);
    var peer = { config: config };
    if (!noGun) {
        var cfg = __assign({ localStorage: !!localStorage, radisk: !!persist }, rest);
        if (persist)
            cfg.localStorage = false;
        if (!disableValidation)
            Gun.on('opt', Validation.gunWireInput(peer));
        if (cfg.storeFn)
            cfg.store = cfg.storeFn(cfg); // for indexeddb
        peer.Gun = Gun;
        peer.gun = Gun(cfg);
        if (cfg.localStorage)
            peer.gun.on('localStorage:error', function (a) { return a.retry({}); });
        if (leech) {
            var sendLeech = function () { return peer.gun._.on('out', { leech: true }); };
            sendLeech();
        }
    }
    var oracle;
    peer.oracle = function () { return (oracle = oracle || new Oracle(peer)); };
    peer.newScope = function (opts) { return Query.createScope(peer, opts); };
    peer.onLogin = Authentication.onLogin(peer);
    peer.signup = Authentication.signup(peer);
    peer.login = Authentication.login(peer);
    peer.logout = function () { return Authentication.logout(peer); };
    peer.isLoggedIn = function () { return Authentication.isLoggedIn(peer); };
    peer.submit = Thing.submit(peer);
    peer.comment = Thing.comment(peer);
    peer.chat = Thing.chat(peer);
    peer.writePage = Thing.writePage(peer);
    peer.vote = Thing.vote(peer);
    peer.queries = Query;
    peer.index = function (scopeOpts) {
        if (scopeOpts === void 0) { scopeOpts = { timeout: 5000 }; }
        return peer.oracle().use(new Indexer.Queue(peer, '', scopeOpts));
    };
    peer.tabulate = function (scopeOpts) {
        if (scopeOpts === void 0) { scopeOpts = { timeout: 5000 }; }
        return peer.oracle().use(new Tabulator.Queue(peer, '', scopeOpts));
    };
    return peer;
}
var Peer = {
    init: init
};

var _this$2 = undefined;
var wikiPage$1 = mergeLeft({
    withMatch: function (_a) {
        var _b = _a.params, _c = _b.authorId, authorId = _c === void 0 ? Config.owner : _c, name = _b.name;
        return ({
            preload: function (scope$$1) { return Query.wikiPage(scope$$1, authorId, name); }
        });
    }
});
var withListingMatch = function (path$$1, params) {
    if (!path$$1) {
        return {
            preload: query(always(resolve({}))),
            sidebar: query(always(resolve(''))),
            space: query(always(resolve(ListingSpec.fromSource('')))),
            ids: query(always(resolve([])))
        };
    }
    var view = new ListingQuery(path$$1);
    var realQuery = query(view.ids.bind(view), "ids:" + path$$1);
    return {
        preload: function (scope$$1) { return preloadListing(scope$$1, path$$1, params); },
        sidebar: query(view.sidebar.bind(view)),
        space: query(view.space.bind(view)),
        ids: query(function (scope$$1, opts) {
            if (opts === void 0) { opts = {}; }
            return realQuery(scope$$1, mergeLeft(opts, params));
        })
    };
};
var preloadListing = function (scope$$1, path$$1, params) { return __awaiter(_this$2, void 0, void 0, function () {
    var match$$1, promise, _a, spec, ids, thingSouls, things, opIds, opSouls, chatPath;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                match$$1 = withListingMatch(path$$1, params);
                promise = Promise.all([
                    match$$1.space(scope$$1),
                    match$$1.ids(scope$$1, {}),
                    match$$1.sidebar(scope$$1)
                ]);
                return [4 /*yield*/, promise];
            case 1:
                _a = (_b.sent()), spec = _a[0], ids = _a[1];
                if (!spec)
                    spec = ListingSpec.fromSource('');
                thingSouls = Listing.idsToSouls(ids);
                return [4 /*yield*/, Promise.all([
                        Query.multiThingMeta(scope$$1, {
                            thingSouls: thingSouls,
                            tabulator: spec.tabulator || Config.tabulator,
                            scores: true,
                            data: true
                        })
                    ].concat(map(function (id) { return Query.userMeta(scope$$1, id); }, uniq([spec && spec.indexer, spec && spec.owner, spec && spec.tabulator]))))];
            case 2:
                things = (_b.sent())[0];
                opIds = compose(without(ids), function (ids) { return ids.filter(function (x) { return !!x; }); }, uniq, map(pathOr(null, ['data', 'opId'])))(things);
                if (!opIds.length) return [3 /*break*/, 4];
                opSouls = Listing.idsToSouls(opIds);
                return [4 /*yield*/, Query.multiThingMeta(scope$$1, {
                        thingSouls: opSouls,
                        tabulator: spec.tabulator || Config.tabulator,
                        data: true
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!spec.chatTopic) return [3 /*break*/, 6];
                chatPath = "/t/" + spec.chatTopic + "/chat";
                if (!(chatPath !== path$$1)) return [3 /*break*/, 6];
                return [4 /*yield*/, preloadListing(scope$$1, "/t/" + spec.chatTopic + "/chat", {})];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [2 /*return*/, scope$$1.getCache()];
        }
    });
}); };
var listing = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.prefix, defaultPrefix = _b === void 0 ? 't' : _b, _c = _a.identifier, defaultIdentifier = _c === void 0 ? 'all' : _c, _d = _a.sort, defaultSort = _d === void 0 ? 'hot' : _d, rest = __rest(_a, ["prefix", "identifier", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.prefix, prefix = _c === void 0 ? defaultPrefix : _c, _d = _b.identifier, identifier = _d === void 0 ? defaultIdentifier : _d, _e = _b.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, queryParams = _f === void 0 ? {} : _f;
            return withListingMatch("/" + prefix + "/" + identifier + "/" + sort, queryParams);
        } }));
};
var thingComments = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.prefix, _c = _a.identifier, _d = _a.sort, defaultSort = _d === void 0 ? 'best' : _d, rest = __rest(_a, ["prefix", "identifier", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params.opId, opId = _b === void 0 ? '' : _b, _c = _a.query, queryParams = _c === void 0 ? {} : _c;
            return withListingMatch(ListingType.CommentListing.route.reverse({
                thingId: opId,
                sort: propOr(defaultSort, 'sort', queryParams)
            }), assoc('limit', 1000, queryParams));
        } }));
};
var spaceListing = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.name, defaultName = _b === void 0 ? 'default' : _b, _c = _a.authorId, defaultAuthorId = _c === void 0 ? '' : _c, _d = _a.sort, defaultSort = _d === void 0 ? 'default' : _d, rest = __rest(_a, ["name", "authorId", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.authorId, authorId = _c === void 0 ? defaultAuthorId : _c, _d = _b.name, name = _d === void 0 ? defaultName : _d, _e = _b.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, queryParams = _f === void 0 ? {} : _f;
            return withListingMatch(ListingType.SpaceListing.route.reverse({
                authorId: authorId || Config.owner,
                name: name,
                sort: sort
            }), queryParams);
        } }));
};
var spaceThingComments = function (_a) {
    var _b = _a.name, defaultName = _b === void 0 ? 'default' : _b, _c = _a.authorId, defaultAuthorId = _c === void 0 ? '' : _c, _d = _a.sort, defaultSort = _d === void 0 ? 'hot' : _d, rest = __rest(_a, ["name", "authorId", "sort"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.opId, opId = _c === void 0 ? '' : _c, _d = _b.authorId, authorId = _d === void 0 ? defaultAuthorId : _d, _e = _b.name, name = _e === void 0 ? defaultName : _e, _f = _b.sort, sort = _f === void 0 ? defaultSort : _f, _g = _a.query, queryParams = _g === void 0 ? {} : _g;
            return withListingMatch(ListingType.SpaceCommentListing.route.reverse({
                authorId: authorId || Config.owner,
                name: name,
                sort: sort,
                thingId: opId
            }), assoc('limit', 1000, queryParams));
        } }));
};
var profile = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.sort, defaultSort = _b === void 0 ? 'new' : _b, _c = _a.type, defaultType = _c === void 0 ? 'overview' : _c, rest = __rest(_a, ["sort", "type"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.params, _c = _b.authorId, authorId = _c === void 0 ? '' : _c, _d = _b.type, type = _d === void 0 ? defaultType : _d, _e = _b.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, query$$1 = _f === void 0 ? {} : _f;
            return withListingMatch(ListingType.ProfileListing.route.reverse({ authorId: authorId, type: type, sort: sort }), query$$1);
        } }));
};
var inbox = function (_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.sort, defaultSort = _b === void 0 ? 'new' : _b, _c = _a.type, defaultType = _c === void 0 ? 'overview' : _c, rest = __rest(_a, ["sort", "type"]);
    return (__assign({}, rest, { withMatch: function (_a) {
            var _b = _a.authorId, authorId = _b === void 0 ? '' : _b, _c = _a.params, _d = _c.type, type = _d === void 0 ? defaultType : _d, _e = _c.sort, sort = _e === void 0 ? defaultSort : _e, _f = _a.query, query$$1 = _f === void 0 ? {} : _f;
            return withListingMatch(ListingType.InboxListing.route.reverse({ authorId: authorId, type: type, sort: sort }), query$$1);
        } }));
};
var Page = {
    withListingMatch: withListingMatch,
    preloadListing: preloadListing,
    wikiPage: wikiPage$1,
    thingComments: thingComments,
    listing: listing,
    spaceListing: spaceListing,
    spaceThingComments: spaceThingComments,
    profile: profile,
    inbox: inbox
};

var peer = Peer.init;

export default peer;
export { Config, Constants, CommentCommand, Indexer, Listing, SpaceSpec, Page, Peer, Query, Schema, Thing, ThingSet, ThingDataNode, Validation, Tabulator };
//# sourceMappingURL=peer.es5.js.map
