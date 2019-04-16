import * as R from 'ramda';
import memoize from 'fast-memoize';
import { ListingSpecType, ListingNodeRow, GunScope, ListingNodeType } from '../types';
import { ListingNode } from './ListingNode';
import { ListingFilter } from './ListingFilter';
import { ListingType } from './ListingType';

export class ListingView {
  path: string;
  type: any;
  rowsFromNode: (node: ListingNodeType) => ListingNodeRow[];
  combineSourceRows: (rowsSets: ListingNodeRow[][]) => ListingNodeRow[];

  constructor(path: string) {
    this.path = path;
    this.type = ListingType.fromPath(path);
    this.rowsFromNode = memoize(ListingNode.rows);
    this.combineSourceRows = memoize(
      R.pipe(
        R.reduce(
          R.concat as (a: ListingNodeRow[], b: ListingNodeRow[]) => ListingNodeRow[],
          [] as ListingNodeRow[]
        ),
        ListingNode.sortRows,
        R.uniqBy(R.nth(ListingNode.POS_ID))
      )
    );
  }

  getSortedSourceRows(scope: GunScope, sourceSouls: string[]) {
    return Promise.all(sourceSouls.map(soul => scope.get(soul).then(this.rowsFromNode))).then(
      this.combineSourceRows
    );
  }

  query(scope: GunScope, opts = {}) {
    if (!this.type) return Promise.resolve([]);
    return this.type.getSpec(scope, this.type.match).then((spec: ListingSpecType) => {
      const stickyRows: ListingNodeRow[] = R.map(id => [-1, id, -Infinity], spec.stickyIds);
      const paths = R.pathOr([], ['dataSource', 'listingPaths'], spec);
      const sourceSouls = R.map(ListingNode.soulFromPath(spec.indexer), paths);
      const filterFn = ListingFilter.thingFilter(scope, spec);

      return this.getSortedSourceRows(scope, sourceSouls).then(rows =>
        ListingFilter.getFilteredIds(scope, spec, [...stickyRows, ...rows], {
          ...opts,
          filterFn
        })
      );
    });
  }
}
