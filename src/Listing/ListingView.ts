import * as R from 'ramda';
import memoize from 'fast-memoize';
import { ListingSpecType, ListingNodeRow, GunScope, ListingNodeType } from '../types';
import { ListingNode } from './ListingNode';
import { ListingFilter } from './ListingFilter';
import { ListingType } from './ListingType';
import { ListingSpec } from './ListingSpec';

export class ListingView {
  path: string;
  type: any;
  spec: ListingSpecType;
  rowsFromNode: (node: ListingNodeType) => ListingNodeRow[];
  combineSourceRows: (rowsSets: ListingNodeRow[][]) => ListingNodeRow[];
  childViews: { [soul: string]: ListingView };
  listings: ListingView[];
  sourced: { [id: string]: ListingNodeRow };

  constructor(path: string, parent?: ListingView) {
    this.listings = [];
    this.childViews = {};
    this.sourced = {};
    this.path = path;
    this.type = ListingType.fromPath(path);
    this.spec = ListingSpec.fromSource('');
    this.rowsFromNode = parent ? parent.rowsFromNode : memoize(ListingNode.rows);
    this.combineSourceRows = parent
      ? parent.combineSourceRows
      : memoize(
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

  unfilteredRows(scope: GunScope, opts = {}): Promise<ListingNodeRow[]> {
    if (!this.type) return Promise.resolve([]);
    return this.type
      .getSpec(scope, this.type.match)
      .then((spec: ListingSpecType) => {
        this.spec = spec;
        const paths = R.pathOr([], ['dataSource', 'listingPaths'], spec);
        const listingPaths = R.without([this.path], paths);
        this.listings = listingPaths.map(
          path => this.childViews[path] || (this.childViews[path] = new ListingView(path, this))
        );
        if (!this.listings.length) {
          return scope
            .get(ListingNode.soulFromPath(spec.indexer, this.path))
            .then(this.rowsFromNode);
        }
        return Promise.all<ListingNodeRow[]>(this.listings.map(l => l.unfilteredRows(scope))).then(
          this.combineSourceRows
        );
      })
      .then((rows: ListingNodeRow[]) => {
        this.sourced = R.indexBy(R.nth(ListingNode.POS_ID) as (row: any) => string, rows);
        return rows;
      });
  }

  async checkId(scope: GunScope, id: string): Promise<boolean> {
    if (!(id in this.sourced)) return false;
    const filterFn = ListingFilter.thingFilter(scope, this.spec);
    if (!(await filterFn(id))) return false;
    return Promise.all(this.listings.map(l => l.checkId(scope, id))).then(
      r => !!r.find(R.identity)
    );
  }

  ids(scope: GunScope, opts = {}) {
    return this.unfilteredRows(scope, opts).then(rows => {
      const stickyRows: ListingNodeRow[] = R.map(id => [-1, id, -Infinity], this.spec.stickyIds);
      const filterFn = (id: string) => this.checkId(scope, id);

      return ListingFilter.getFilteredIds(scope, this.spec, [...stickyRows, ...rows], {
        ...opts,
        filterFn
      });
    });
  }
}
