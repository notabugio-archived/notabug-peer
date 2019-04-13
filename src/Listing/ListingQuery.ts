import * as R from 'ramda';
import { query } from 'gun-scope';
import { ListingNode } from './ListingNode';
import { ListingFilter } from './ListingFilter';
import { ListingType } from './ListingType';
import { ListingSpecType, ListingNodeRow } from '../types';

const read = query((scope, spec, opts = {}) => {
  const filterFn = ListingFilter.thingFilter(scope, spec);
  const paths: string[] = R.pathOr([], ['dataSource', 'listingPaths'], spec);
  const stickyRows: ListingNodeRow[] = R.map(id => [-1, id, -Infinity], spec.stickyIds);
  const souls = R.map(ListingNode.soulFromPath(opts.indexer || spec.indexer), paths);

  return ListingNode.rowsFromSouls(scope, souls).then(rows =>
    ListingFilter.getFilteredIds(scope, spec, [...stickyRows, ...rows], {
      ...opts,
      filterFn
    })
  );
});

const fromSpec = query((scope, spec, opts = {}) => read(scope, spec, opts));

const fromPath = query((scope, path, opts) => {
  const type = ListingType.fromPath(path);

  if (!type) return Promise.resolve([]);
  return type.getSpec(scope, type.match).then((spec: ListingSpecType) => {
    if (spec.hasIndexer && !opts.calculate) {
      if (!type || !type.read) return ListingNode.read(scope, path, opts);
      return type.read(scope, type.match, opts);
    }
    return fromSpec(scope, spec, opts);
  });
});

export const ListingQuery = {
  fromSpec,
  fromPath
};
