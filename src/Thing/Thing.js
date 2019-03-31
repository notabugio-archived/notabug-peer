import * as R from "ramda";
import { Promise } from "gun-scope";
import objHash from "object-hash";
import { parse as parseURI } from "uri-js";
import { Schema } from "../Schema";
import { ThingSet } from "./ThingSet";

export { ThingSet } from "./ThingSet";
export { ThingDataNode } from "./ThingDataNode";

const topicPrefixes = {
  chatmsg: "chat:",
  comment: "comments:"
};

const soulToId = R.compose(
  R.prop("thingId"),
  Schema.Thing.route.match.bind(Schema.Thing.route)
);

const soulsToIds = R.map(soulToId);

const index = R.curry((peer, thingId, data) => {
  if (!data.topic && !data.opId) return;

  if (data.opId && !data.topic) {
    peer.gun
      .get(Schema.Thing.route.reverse({ thingId: data.opId }))
      .get("data")
      .on(function recv(td) {
        if (!td) return;
        index(peer, thingId, { ...data, topic: td.topic || "all" });
        this.off();
      });
    return;
  }

  const thing = peer.gun.get(Schema.Thing.route.reverse({ thingId }));
  const dayStr = ThingSet.dayStr(data.timestamp);
  const [year, month, day] = dayStr.split("/");
  const topicPrefix = topicPrefixes[data.kind] || "";
  const baseTopicName = data.topic.toLowerCase().trim();
  const topicName = topicPrefix + baseTopicName;
  const topic = peer.gun.get(Schema.Topic.route.reverse({ topicName }));
  const topicDay = peer.gun.get(
    Schema.TopicDay.route.reverse({ topicName, year, month, day })
  );

  if (!data.skipAll && data.topic !== "all") {
    const allname = `${topicPrefix}all`;
    const allTopic = peer.gun.get(
      Schema.Topic.route.reverse({ topicName: allname })
    );
    const allTopicDay = peer.gun.get(
      Schema.TopicDay.route.reverse({
        topicName: allname,
        year,
        month,
        day
      })
    );

    allTopic.set(thing);
    allTopicDay.set(thing);
  }

  if (data.kind === "submission") {
    const urlInfo = data.url ? parseURI(data.url) : {};
    const domainName = (data.url
      ? (urlInfo.host || urlInfo.scheme || "").replace(/^www\./, "")
      : `self.${data.topic}`
    ).toLowerCase();
    const domain = peer.gun.get(Schema.Domain.route.reverse({ domainName }));

    domain.set(thing);

    if (data.url) {
      const urlNode = peer.gun.get(Schema.URL.route.reverse({ url: data.url }));

      // thing.get("url").put(urlNode);
      urlNode.set(thing);
    }
  }

  if (data.opId) {
    const allcomments = peer.gun.get(
      Schema.ThingAllComments.route.reverse({ thingId: data.opId })
    );

    allcomments.set(thing);
  }

  if (data.replyToId || data.opId) {
    const comments = peer.gun.get(
      Schema.ThingComments.route.reverse({
        thingId: data.replyToId || data.opId
      })
    );

    comments.set(thing);
  }

  topic.set(thing);
  topicDay.set(thing);
});

const put = R.curry((peer, data) => {
  data.timestamp = data.timestamp || new Date().getTime(); // eslint-disable-line
  const originalHash = objHash(data);
  const { timestamp, kind, topic, authorId, opId, replyToId } = data;
  const thingId = objHash({
    timestamp,
    kind,
    topic,
    authorId,
    opId,
    replyToId,
    originalHash
  });

  const node = peer.gun.get(Schema.Thing.route.reverse({ thingId }));
  const dataSoul = authorId
    ? Schema.ThingDataSigned.route.reverse({ thingId, authorId })
    : Schema.ThingData.route.reverse({ thingId: originalHash });

  const metaData = {
    id: thingId,
    timestamp,
    kind,
    originalHash,
    data: { "#": dataSoul },
    votesup: { "#": Schema.ThingVotesUp.route.reverse({ thingId }) },
    votesdown: { "#": Schema.ThingVotesDown.route.reverse({ thingId }) },
    allcomments: { "#": Schema.ThingAllComments.route.reverse({ thingId }) },
    comments: { "#": Schema.ThingComments.route.reverse({ thingId }) }
  };

  if (topic)
    metaData.topic = { "#": Schema.Topic.route.reverse({ topicName: topic }) };
  if (authorId) metaData.author = { "#": `~${authorId}` };
  if (opId)
    metaData.op = { "#": Schema.Thing.route.reverse({ thingId: opId }) };
  if (replyToId)
    metaData.replyTo = {
      "#": Schema.Thing.route.reverse({ thingId: replyToId })
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

  const thing = put(peer, { ...data, timestamp, kind: "submission" });

  if (user) {
    const thingsSoul = Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });
    const submissionsSoul = Schema.AuthorSubmissions.route.reverse({
      authorId: user.pub
    });
    const things = peer.gun.get(thingsSoul);
    const submissions = peer.gun.get(submissionsSoul);

    peer.gun
      .user()
      .get("things")
      .put(things);
    peer.gun
      .user()
      .get("submissions")
      .put(submissions);
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

  const thing = put(peer, { ...data, kind: "comment" });

  if (user) {
    const thingsSoul = Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });
    const commentsSoul = Schema.AuthorComments.route.reverse({
      authorId: user.pub
    });
    const things = peer.gun.get(thingsSoul);
    const comments = peer.gun.get(commentsSoul);

    peer.gun
      .user()
      .get("things")
      .put(things);
    peer.gun
      .user()
      .get("comments")
      .put(comments);
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

  const thing = put(peer, { ...data, kind: "chatmsg" });

  if (user) {
    const thingsSoul = Schema.AuthorThings.route.reverse({
      authorId: user.pub
    });
    const things = peer.gun.get(thingsSoul);

    peer.gun
      .user()
      .get("things")
      .put(things);
    things.set(thing);
  }

  return thing;
});

const writePage = R.curry((peer, name, body) => {
  const user = peer.isLoggedIn();

  if (!user) return Promise.reject("not logged in");
  let thing;
  const pagesSoul = Schema.AuthorPages.route.reverse({ authorId: user.pub });
  const chain = peer.gun.get(pagesSoul).get(name);

  return chain.then(res => {
    if (res && res.data) {
      console.log("res", res);
      chain
        .get("data")
        .get("body")
        .put(body);
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
  const votes = peer.gun.get(
    Schema[kind === "up" ? "ThingVotesUp" : "ThingVotesDown"].route.reverse({
      thingId: id
    })
  );

  return votes.get(nonce).put("1");
});

export const Thing = {
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
