import { ListingSpecType, ListingNodeRow, GunScope, ListingNodeType } from '../types';
export declare class ListingView {
    path: string;
    type: any;
    spec: ListingSpecType;
    rowsFromNode: (node: ListingNodeType) => ListingNodeRow[];
    combineSourceRows: (rowsSets: ListingNodeRow[][]) => ListingNodeRow[];
    childViews: {
        [soul: string]: ListingView;
    };
    listings: ListingView[];
    sourced: {
        [id: string]: ListingNodeRow;
    };
    constructor(path: string, parent?: ListingView);
    unfilteredRows(scope: GunScope): Promise<ListingNodeRow[]>;
    checkId(scope: GunScope, id: string): Promise<boolean>;
    ids(scope: GunScope, opts?: {}): Promise<string[]>;
}
