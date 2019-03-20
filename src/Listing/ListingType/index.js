import * as R from "ramda";
import { ChatListing } from "./ChatListing";
import { FirehoseListing } from "./FirehoseListing";
import { CommentedListing } from "./CommentedListing";
import { TopicListing } from "./TopicListing";
import { DomainListing } from "./DomainListing";
import { CommentListing } from "./CommentListing";
import { SpaceListing } from "./SpaceListing";
import { InboxListing } from "./InboxListing";
import { ProfileListing } from "./ProfileListing";

const types = [
  ChatListing,
  FirehoseListing,
  TopicListing,
  DomainListing,
  CommentListing,
  SpaceListing,
  InboxListing,
  CommentedListing,
  ProfileListing
];

const fromPath = path => {
  let match;

  for (let i = 0; i < types.length; i++) {
    match = types[i].route.match(path);
    if (match) return R.assoc("match", match, types[i]);
  }
  return null;
};

export const ListingType = { ...types, types, fromPath };
