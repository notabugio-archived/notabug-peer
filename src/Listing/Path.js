import * as R from "ramda";
import Route from "route-parser";

const splitDomains = R.compose(
  R.sortBy(R.identity),
  R.filter(R.identity),
  R.map(R.trim),
  R.split("+"),
  R.toLower,
  R.trim,
  R.defaultTo("")
);

const splitTopics = R.compose(
  R.ifElse(R.prop("length"), R.identity, R.always(["all"])),
  splitDomains
);

const withRoute = obj => R.assoc("route", new Route(obj.path), obj);

export const Path = { splitDomains, splitTopics, withRoute };
