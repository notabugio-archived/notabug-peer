import { ListingNodeRow, GunScope, ListingNodeType } from '../types';
export declare class ListingView {
    path: string;
    type: any;
    rowsFromNode: (node: ListingNodeType) => ListingNodeRow[];
    combineSourceRows: (rowsSets: ListingNodeRow[][]) => ListingNodeRow[];
    constructor(path: string);
    getSortedSourceRows(scope: GunScope, sourceSouls: string[]): Promise<[number | null, string | null, number | null][]>;
    query(scope: GunScope, opts?: {}): any;
}
