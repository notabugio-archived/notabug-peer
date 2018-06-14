import curry from "ramda/src/curry";
import objHash from "object-hash";
import urllite from "urllite";

export const putThing = curry((peer, data) => {
  const id = objHash(data, { unorderedSets: true });
  const node = peer.souls.thing.get({ thingid: id });
  const dataNode = peer.souls.thingData.get({ thingid: id });
  dataNode.put(data);
  node.get("data").put(dataNode);
  node.put({ id, timestamp: data.timestamp });
  peer.souls.things.get().set(node);
  return node;
});

export const submit = curry((peer, data) => {
  const timestamp = (new Date()).getTime();
  const dayStr = peer.getDayStr(timestamp);
  const user = peer.isLoggedIn();
  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }
  const [year, month, day] = dayStr.split("/");
  const urlInfo = data.url ? urllite(data.url) : {};
  const domainName = data.url ? (urlInfo.host || "").replace(/^www\./, "") : `self.${data.topic}`;
  const topicDays = peer.souls.topicDays.get({ topicname: data.topic });
  const allDay = peer.souls.topicDay.get({ topicname: "all", year, month, day });
  const all = peer.souls.topic.get({ topicname: "all" });
  const topicDay = peer.souls.topicDay.get({ topicname: data.topic, year, month, day });
  const topic = peer.souls.topic.get({ topicname: data.topic });
  const domain = peer.souls.domain.get({ domain: domainName });
  const thing = peer.putThing({ ...data, timestamp, kind: "submission" });

  topicDays.set(topicDay);
  thing.get("topic").put(topic);
  thing.get("domain").put(domain);
  topic.set(thing);
  topicDay.set(thing);
  all.set(thing);
  allDay.set(thing);
  domain.set(thing);

  if (data.url) {
    const urlNode = peer.souls.url.get({ url: data.url });
    thing.get("url").put(urlNode);
    urlNode.set(thing);
  }

  if (user) {
    peer.gun.user().get("things").set(thing);
    peer.gun.user().get("submissions").set(thing);
  }

  thing.once(peer.watchThing);

  return thing;
});

export const comment = curry((peer, data) => {
  const timestamp = (new Date()).getTime();
  const user = peer.isLoggedIn();
  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }
  const thing = peer.putThing({ ...data, timestamp, kind: "comment" });
  const replyTo = peer.souls.thing.get({ thingid: data.replyToId });
  const op = peer.souls.thing.get({ thingid: data.opId });
  const comments = peer.souls.thingComments.get({ thingid: data.replyToId });
  const allcomments = peer.souls.thingAllComments.get({ thingid: data.opId });
  thing.get("replyTo").put(replyTo);
  thing.get("op").put(op);
  replyTo.get("comments").put(comments);
  op.get("allcomments").put(allcomments);
  comments.set(thing);
  allcomments.set(thing);
  if (user) {
    peer.gun.user().get("things").set(thing);
    peer.gun.user().get("comments").set(thing);
  }
  thing.once(peer.watchThing);

  return thing;
});

export const chat = curry((peer, data) => {
  const timestamp = (new Date()).getTime();
  const dayStr = peer.getDayStr(timestamp);
  const [year, month, day] = dayStr.split("/");
  const chatDay = peer.souls.topicDay.get({ topicname: `chat:${data.topic}`, year, month, day });
  const user = peer.isLoggedIn();
  if (user) {
    data.author = user.alias; // eslint-disable-line
    data.authorId = user.pub; // eslint-disable-line
  }
  const thing = peer.putThing({ ...data, timestamp, kind: "chatmsg" });
  chatDay.set(thing);
  if (user) {
    peer.gun.user().get("things").set(thing);
  }
  thing.once(peer.watchThing);
  return thing;
});

export const vote = curry((peer, id, kind, nonce) => {
  const thing = peer.souls.thing.get({ thingid: id });
  const votes = peer.souls.thingVotes.get({ thingid: id, votekind: kind });
  thing.get(`votes${kind}`).put(votes);
  return votes.set(nonce);
});
