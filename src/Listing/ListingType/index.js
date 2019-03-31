import * as R from "ramda";
import { query, resolve } from "gun-scope";
import { ChatListing } from "./ChatListing";
import { FirehoseListing } from "./FirehoseListing";
import { CommentedListing } from "./CommentedListing";
import { TopicListing } from "./TopicListing";
import { DomainListing } from "./DomainListing";
import { CommentListing } from "./CommentListing";
import { SpaceListing } from "./SpaceListing";
import { InboxListing } from "./InboxListing";
import { ProfileListing } from "./ProfileListing";

const types = {
  ChatListing,
  FirehoseListing,
  TopicListing,
  DomainListing,
  CommentListing,
  SpaceListing,
  InboxListing,
  CommentedListing,
  ProfileListing
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

const sidebarFromPath = query((scope, path) => {
  const type = fromPath(path);

  if (!type || !type.getSidebar) return resolve("");
  return type.getSidebar(scope, type.match);
});

const specFromPath = query((scope, path) => {
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

export const ListingType = {
  ...types,
  types,
  fromPath,
  sidebarFromPath,
  specFromPath
};
