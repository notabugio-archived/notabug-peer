import * as R from "ramda";
import { query } from "gun-scope";
import { ListingNode } from "./ListingNode";
import { ListingFilter } from "./ListingFilter";
import { ListingType } from "./ListingType";

const fromSpec = query((scope, spec, opts) => {
  const filterFn = ListingFilter.thingFilter(scope, spec);
  const paths = R.pathOr([], ["dataSource", "listingPaths"], spec);
  const souls = R.map(
    ListingNode.soulFromPath(opts.indexer || spec.indexer),
    paths
  );

  return ListingNode.getRowsFromSouls(scope, souls).then(rows =>
    ListingFilter.getFilteredIds(scope, rows, { ...opts, filterFn })
  );
});

const fromPath = query((scope, path, opts) => {
  const type = ListingType.fromPath(path);

  if (!type) return Promise.resolve([]);
  return type.getSpec(scope, path).then(spec => {
    if (spec.hasIndexer && !opts.calculate) {
      if (!type || !type.read) return ListingNode.read(scope, path, opts);
      return type.read(scope, type.match, opts);
    }
    return fromSpec(scope, spec, opts);
  });
});

export const ListingQuery = { fromSpec, fromPath };
