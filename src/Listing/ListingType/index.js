import * as R from "ramda";
import { TopicListing } from "./TopicListing";
import { DomainListing } from "./DomainListing";
import { CommentListing } from "./CommentListing";
import { SpaceListing } from "./SpaceListing";
import { InboxListing } from "./InboxListing";
import { ProfileListing } from "./ProfileListing";

const types = [
  TopicListing,
  DomainListing,
  CommentListing,
  SpaceListing,
  InboxListing,
  ProfileListing
];

const fromPath = path => {
  let match;

  for (let i = 0; i < types.length; i++) {
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

export const ListingType = { ...types, types, fromPath };
