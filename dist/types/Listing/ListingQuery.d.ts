import { ListingSpecType, ListingNodeRow, GunScope, ListingNodeType } from '../types';
export declare class ListingQuery {
    path: string;
    type: any;
    spec: ListingSpecType;
    rowsFromNode: (node: ListingNodeType) => ListingNodeRow[];
    combineSourceRows: (rowsSets: ListingNodeRow[][]) => ListingNodeRow[];
    viewCache: {
        [soul: string]: ListingQuery;
    };
    listings: ListingQuery[];
    sourced: {
        [id: string]: ListingNodeRow;
    };
    constructor(path: string, parent?: ListingQuery);
    unfilteredRows(scope: GunScope): Promise<ListingNodeRow[]>;
    checkId(scope: GunScope, id: string): Promise<boolean>;
    ids(scope: GunScope, opts?: {}): Promise<string[]>;
}
