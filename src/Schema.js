import * as R from "ramda";
import Route from "route-parser";
import * as sea from "gun-suppressor-sear";
import { Constants } from "./Constants";

const definitions = {
  ...sea.AUTH_SCHEMA,
  topicName: {
    type: "string",
    minLength: 1,
    maxLength: Constants.MAX_TOPIC_SIZE
  },

  TopicDay: {
    title: "Topic Day",
    description: "A single day of things in a topic",
    soul: {
      pattern: `${Constants.PREFIX}/topics/:topicName/days/:year/:month/:day`,
      properties: {
        topicName: { $ref: "schema.json#/definitions/topicName" },
        year: { type: "number", minimum: 2018, maximum: 2100 },
        month: { type: "number", minimum: 1, maximum: 12 },
        day: { type: "number", minimum: 1, maximum: 31 }
      },
      required: ["topicName", "year", "month", "day"]
    },
    propsFromSoul: { name: "topicName" },
    properties: {
      name: {
        description: "Deprecated as unnecessary",
        type: "string"
      }
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [
        { $ref: "#/definitions/ThingEdge" },
        { $ref: "#/definitions/TopicEdge" }
      ]
    }
  },

  Topic: {
    title: "Topic",
    description: "All things in a topic",
    soul: {
      pattern: `${Constants.PREFIX}/topics/:topicName`,
      properties: {
        topicName: { $ref: "schema.json#/definitions/topicName" }
      },
      required: ["topicName"]
    },
    propsFromSoul: { name: "topicName" },
    properties: {
      name: {
        description: "Deprecated as unnecessary",
        type: "string"
      }
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [
        { $ref: "#/definitions/ThingEdge" },
        { $ref: "#/definitions/TopicEdge" }
      ]
    }
  },

  domainName: {
    type: "string",
    minLength: 1,
    maxLength: Constants.MAX_DOMAIN_SIZE
  },

  Domain: {
    title: "Domain",
    description: "All things in a domain",
    soul: {
      pattern: `${Constants.PREFIX}/domains/:domainName`,
      properties: {
        domainName: { $ref: "schema.json#/definitions/domainName" }
      },
      required: ["domainName"]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{ $ref: "#/definitions/ThingEdge" }]
    }
  },

  url: { type: ["null", "string"], maxLength: Constants.MAX_URL_SIZE },
  URL: {
    title: "URL",
    description: "All things for a given URL",
    soul: {
      pattern: `${Constants.PREFIX}/urls/\*url`, // eslint-disable-line no-useless-escape
      properties: {
        url: { $ref: "schema.json#/definitions/url" }
      },
      required: ["url"]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{ $ref: "#/definitions/ThingEdge" }]
    }
  },

  thingId: {
    type: "string",
    maxLength: Constants.MAX_HASH_SIZE
  },

  thingSoul: {
    properties: {
      thingId: { "#ref": "#definitions/thingId" }
    }
  },

  ThingAllComments: {
    title: "Thing All Comments",
    description: "All comments for a given submission",
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId/allcomments`,
      allOf: [{ $ref: "schema.json#/definitions/thingSoul" }]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{ $ref: "#/definitions/ThingEdge" }]
    }
  },

  ThingComments: {
    title: "Thing Comments",
    description: "Direct replies to a thing",
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId/comments`,
      allOf: [{ $ref: "schema.json#/definitions/thingSoul" }]
    },
    additionalProperties: {
      edgeMatchesKey: true,
      anyOf: [{ $ref: "#/definitions/ThingEdge" }]
    }
  },

  timestamp: { type: ["number", "string"] },
  thingKind: {
    type: "string",
    maxLength: Constants.MAX_THING_KIND_SIZE
  },

  Thing: {
    title: "Thing Reference",
    description:
      "These are submissions, comments, chat messages and wiki pages",
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId`,
      allOf: [{ $ref: "schema.json#/definitions/thingSoul" }]
    },
    propsFromSoul: { id: "thingId" },
    properties: {
      id: { $ref: "#/definitions/thingId" },
      kind: { "#ref": "#/definitions/thingKind" },
      timestamp: { $ref: "#/definitions/timestamp" },
      originalHash: { $ref: "#/definitions/thingId" },
      data: {
        oneOf: [
          { $ref: "#/definitions/ThingDataEdge" },
          { $ref: "#/definitions/ThingDataSignedEdge" }
        ]
      },
      topic: {
        anyOf: [
          { $ref: "#/definitions/TopicEdge" },
          {
            description: "Some old things had generic topic souls",
            type: "object",
            additionalProperties: false,
            properties: {
              "#": { type: "string", maxLength: 42 }
            },
            required: ["#"]
          }
        ]
      },
      domain: { $ref: "#/definitions/DomainEdge" },
      url: { $ref: "#/definitions/URLEdge" },
      comments: { thingRelatedEdge: "ThingComments" },
      allcomments: { thingRelatedEdge: "ThingAllComments" },
      votesup: { thingRelatedEdge: "ThingVotesUp" },
      votesdown: { thingRelatedEdge: "ThingVotesDown" },
      op: { $ref: "#/definitions/ThingEdge" },
      replyTo: { $ref: "#/definitions/ThingEdge" },
      author: { $ref: "#/definitions/SEAAuthorEdge" }
    },

    anyOf: [
      {
        allOf: [
          {
            thingHashMatchesSoul: true
          },
          {
            anyOf: [
              { signedThingDataMatchesThing: true },
              { thingDataMatchesOriginalHash: true }
            ]
          }
        ]
      },
      { isLegacyThing: true },
      {
        additionalProperties: false,
        description: "Self verifying can be updated in isolation",
        properties: {
          id: { $ref: "#/definitions/thingId" },
          comments: { thingRelatedEdge: "ThingComments" },
          allcomments: { thingRelatedEdge: "ThingAllComments" },
          votesup: { thingRelatedEdge: "ThingVotesUp" },
          votesdown: { thingRelatedEdge: "ThingVotesDown" }
        }
      }
    ]
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
      pattern: `${Constants.PREFIX}/things/:thingId/votesup`,
      allOf: [{ $ref: "schema.json#/definitions/thingSoul" }]
    },
    allOf: [{ $ref: "#/definitions/ProofOfWorkVotes" }]
  },

  ThingVotesDown: {
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId/votesdown`,
      allOf: [{ $ref: "schema.json#/definitions/thingSoul" }]
    },
    allOf: [{ $ref: "#/definitions/ProofOfWorkVotes" }]
  },

  ThingData: {
    title: "Unsigned Thing Data",
    description: "This is the actual content of a thing",
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId/data`,
      allOf: [{ $ref: "schema.json#/definitions/thingSoul" }],
      required: ["thingId"]
    },
    properties: {
      kind: { $ref: "#/definitions/thingKind" },
      title: {
        type: "string",
        minLength: 1,
        maxLength: Constants.MAX_THING_TITLE_SIZE
      },
      topic: { $ref: "#/definitions/topicName" },
      body: {
        type: ["null", "string"],
        maxLength: Constants.MAX_THING_BODY_SIZE
      },
      author: { $ref: "#/definitions/seaAlias" },
      authorId: { $ref: "#/definitions/seaAuthorId" },
      opId: { $ref: "#/definitions/thingId" },
      replyToId: { $ref: "#/definitions/thingId" },
      domain: { $ref: "#/definitions/domainName" },
      url: { $ref: "#/definitions/url" },
      timestamp: { $ref: "#/definitions/timestamp" }
    },
    thingDataHashMatchesSoul: true
  },

  ThingDataSigned: {
    title: "Signed Thing Data",
    description:
      "This is the actual content of a thing, cryptographically signed",
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId/data~:authorId.`,
      properties: {
        thingId: { $ref: "schema.json#/definitions/thingId" },
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" }
      },
      required: ["thingId", "authorId"]
    },
    properties: {
      kind: { sea: { $ref: "schema.json#/definitions/thingKind" } },
      title: {
        sea: {
          type: "string",
          minLength: 1,
          maxLength: Constants.MAX_THING_TITLE_SIZE
        }
      },
      topic: { sea: { $ref: "schema.json#/definitions/topicName" } },
      body: {
        sea: {
          type: ["null", "string"],
          maxLength: Constants.MAX_THING_BODY_SIZE
        }
      },
      author: {
        sea: { $ref: "schema.json#/definitions/seaAlias" }
      },
      authorId: { sea: { $ref: "schema.json#/definitions/seaAuthorId" } },
      opId: { sea: { $ref: "schema.json#/definitions/thingId" } },
      replyToId: { sea: { $ref: "schema.json#/definitions/thingId" } },
      domain: { sea: { $ref: "schema.json#/definitions/domainName" } },
      url: { sea: { $ref: "schema.json#/definitions/url" } },
      timestamp: { sea: { $ref: "schema.json#/definitions/timestamp" } }
    }
  },

  ThingVoteCounts: {
    title: "Thing Vote Counts",
    description: "Aggregated counts from a tabulator",
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId/votecounts@~:tabulator.`,
      properties: {
        thingId: { $ref: "schema.json#/definitions/thingId" },
        tabulator: { $ref: "schema.json#/definitions/seaAuthorId" }
      }
    },
    properties: {
      up: { sea: { type: ["number", "string"] } },
      down: { sea: { type: ["number", "string"] } },
      comment: { sea: { type: ["number", "string"] } },
      score: { sea: { type: ["number", "string"] } },
      commands: { sea: { type: ["object", "string"] } }
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
      "^d+$": { sea: { type: ["string", "null", "undefined"] } }
    },

    deleteMetaForMissing: true
  },

  sortName: {
    type: "string",
    enum: [
      "new",
      "old",
      "active",
      "top",
      "comments",
      "discussed",
      "hot",
      "best",
      "controversial",
      "random",
      "firehose",
      "chat"
    ]
  },

  TopicListing: {
    soul: {
      pattern: `${Constants.PREFIX}/t/:topic/:sort@~:indexer.`,
      required: ["topic", "sort", "indexer"],
      properties: {
        topic: { type: "string" },
        sort: { $ref: "schema.json#/definitions/sortName" },
        indexer: { $ref: "schema.json#/definitions/seaAuthorId" }
      }
    },
    allOf: [
      { $ref: "#/definitions/ListingData" }
    ]
  },

  DomainListing: {
    soul: {
      pattern: `${Constants.PREFIX}/domain/:domain/:sort@~:indexer.`,
      required: ["domain", "sort", "indexer"],
      properties: {
        domain: { type: "string" },
        sort: { $ref: "schema.json#/definitions/sortName" },
        indexer: { $ref: "schema.json#/definitions/seaAuthorId" }
      }
    },
    allOf: [{ $ref: "#/definitions/ListingData" }]
  },

  ThingCommentsListing: {
    soul: {
      pattern: `${Constants.PREFIX}/things/:thingId/comments/:sort@~:indexer.`,
      properties: {
        thingId: { $ref: "schema.json#/definitions/thingId" },
        sort: { $ref: "schema.json#/definitions/sortName" },
        indexer: { $ref: "schema.json#/definitions/seaAuthorId" }
      }
    },
    allOf: [{ $ref: "#/definitions/ListingData" }]
  },

  userListingType: {
    type: "string",
    enum: ["overview", "submitted", "comments", "commands", "commented"]
  },

  AuthorRepliesListing: {
    soul: {
      pattern: `${
        Constants.PREFIX
      }/user/:authorId/replies/:type/:sort@~:indexer.`,
      properties: {
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" },
        sort: { $ref: "schema.json#/definitions/sortName" },
        indexer: { $ref: "schema.json#/definitions/seaAuthorId" },
        type: { $ref: "schema.json#/definitions/userListingType" }
      }
    },
    allOf: [{ $ref: "#/definitions/ListingData" }]
  },

  AuthorProfileListing: {
    soul: {
      pattern: `${Constants.PREFIX}/user/:authorId/:type/:sort@~:indexer.`,
      properties: {
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" },
        sort: { $ref: "schema.json#/definitions/sortName" },
        indexer: { $ref: "schema.json#/definitions/seaAuthorId" },
        type: { $ref: "schema.json#/definitions/userListingType" }
      }
    },
    allOf: [{ $ref: "#/definitions/ListingData" }]
  },

  SpaceListing: {
    soul: {
      pattern: `${
        Constants.PREFIX
      }/user/:authorId/spaces/:name/:sort@~:indexer.`,
      properties: {
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" },
        sort: { $ref: "schema.json#/definitions/sortName" },
        indexer: { $ref: "schema.json#/definitions/seaAuthorId" },
        name: { $ref: "schema.json#/definitions/topicName" }
      }
    },
    allOf: [{ $ref: "#/definitions/ListingData" }]
  },

  AuthorComments: {
    title: "Author's Comments",
    description: "All of an authors comments should be linked here",
    soul: {
      pattern: `${Constants.PREFIX}/comments~:authorId.`,
      properties: {
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" }
      },
      required: ["authorId"]
    },
    additionalProperties: {
      sea: {
        edgeMatchesKey: true,
        anyOf: [{ $ref: "schema.json#/definitions/ThingEdge" }]
      }
    }
  },

  AuthorSubmissions: {
    title: "Author's Submissions",
    description: "All of an author's submissions should be linked here",
    soul: {
      pattern: `${Constants.PREFIX}/submissions~:authorId.`,
      properties: {
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" }
      },
      required: ["authorId"]
    }
  },

  AuthorThings: {
    title: "Author's Things",
    description: "All of an author's things should be linked here",
    soul: {
      pattern: `${Constants.PREFIX}/things~:authorId.`,
      properties: {
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" }
      },
      required: ["authorId"]
    },
    additionalProperties: {
      sea: {
        edgeMatchesKey: true,
        anyOf: [{ $ref: "schema.json#/definitions/ThingEdge" }]
      }
    }
  },

  AuthorPages: {
    title: "Author Page Map",
    description: "Mapping of page names to things",
    soul: {
      pattern: `${Constants.PREFIX}/pages~:authorId.`,
      properties: {
        authorId: { $ref: "schema.json#/definitions/seaAuthorId" }
      },
      required: ["authorId"]
    },
    additionalProperties: {
      sea: {
        edgeMatchesKey: true,
        anyOf: [{ $ref: "schema.json#/definitions/ThingEdge" }]
      }
    }
  }
};

const routes = R.keys(definitions).reduce((result, name) => {
  const pattern = R.path([name, "soul", "pattern"], definitions);

  if (!pattern) return result;
  return R.assoc(name, new Route(pattern), result);
});

const defsWithRoutes = R.compose(
  R.reduce(
    (res, [name, route]) =>
      R.assoc(name, R.assoc("route", route, R.prop(name, definitions)), res),
    {}
  ),
  R.toPairs
)(routes);

export const Schema = {
  ...defsWithRoutes,
  definitions,
  routes
};
