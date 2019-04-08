import * as R from "ramda";
import { query, resolve } from "gun-scope";
import { Constants } from "../Constants";
import { ListingNode } from "./ListingNode";
import { ListingFilter } from "./ListingFilter";
import { ListingType } from "./ListingType";

const calculateRows = query((scope, spec, opts = {}) => {
  const filterFn = ListingFilter.thingFilter(scope, spec);
  const stickyItems = R.map(id => [id, -Infinity], spec.stickyIds);

  if (!spec.dataSource.query) return resolve([]);
  return spec.dataSource.query(scope).then(items => {
    const rows = ListingNode.itemsToRows([...stickyItems, ...items]);

    return ListingFilter.getFilteredRows(scope, spec, rows, {
      ...opts,
      filterFn
    });
  });
});

const calculate = query((scope, spec, opts = {}) => {});

const toNode = query((scope, spec, opts) =>
  calculateRows(scope, spec, opts).then(
    R.compose(
      ListingNode.serialize(spec),
      ListingNode.rowsToItems
    )
  )
);

const read = query((scope, spec, opts = {}) => {
  const filterFn = ListingFilter.thingFilter(scope, spec);
  const paths = R.pathOr([], ["dataSource", "listingPaths"], spec);
  const stickyRows = R.map(id => [-1, id, -Infinity], spec.stickyIds);
  const souls = R.map(
    ListingNode.soulFromPath(opts.indexer || spec.indexer),
    paths
  );

  return ListingNode.rowsFromSouls(scope, souls).then(rows =>
    ListingFilter.getFilteredIds(scope, spec, [...stickyRows, ...rows], {
      ...opts,
      filterFn
    })
  );
});

const fromSpec = query((scope, spec, opts = {}) =>
  (opts.calculate ? calculate : read)(scope, spec, opts)
);

const fromPath = query((scope, path, opts) => {
  const type = ListingType.fromPath(path);

  if (!type) return Promise.resolve([]);
  return type.getSpec(scope, type.match).then(spec => {
    if (spec.hasIndexer && !opts.calculate) {
      if (!type || !type.read) return ListingNode.read(scope, path, opts);
      return type.read(scope, type.match, opts);
    }
    return fromSpec(scope, spec, opts);
  });
});

const nodeFromPath = query((scope, path, opts) =>
  ListingType.specFromPath(scope, path).then(spec =>
    toNode(scope, spec, R.mergeLeft(opts, { limit: Constants.LISTING_SIZE }))
  )
);

export const ListingQuery = {
  fromSpec,
  fromPath,
  calculateRows,
  toNode,
  nodeFromPath
};
