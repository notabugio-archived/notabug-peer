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
    checked: {
        [id: string]: boolean;
    };
    constructor(path: string, parent?: ListingQuery);
    space(scope: GunScope): any;
    sidebar(scope: GunScope): any;
    unfilteredRows(scope: GunScope): Promise<ListingNodeRow[]>;
    _setChecked(id: string, checked: boolean): boolean;
    checkId(scope: GunScope, id: string): Promise<boolean>;
    ids(scope: GunScope, opts?: {}): Promise<string[]>;
}
