/// <reference types="ramda" />
import { ListingNodeRow, ListingNodeType, SortDataRow } from '../types';
declare function getRow(node: ListingNodeType, idx: string | number): [number | null, string | null, number | null];
declare function rows(node: ListingNodeType): ListingNodeRow[];
declare function diff(node: ListingNodeType, updatedItems?: SortDataRow[], removeIds?: string[], { maxSize }?: {
    maxSize?: number | undefined;
}): Promise<any>;
export declare const ListingNode: {
    POS_IDX: number;
    POS_ID: number;
    POS_VAL: number;
    source: <U, V>(obj: U) => V;
    get: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<any>;
    getRow: typeof getRow;
    itemKeys: (x0: any) => string[];
    rows: typeof rows;
    ids: (x0: any) => string[];
    idToSoul: (thingId: string) => string;
    idsToSouls: (ids: string[]) => string[];
    soulToId: (soul: string) => {};
    soulsToIds: (list: readonly string[]) => {}[];
    rowsToIds: (rows: [number | null, string | null, number | null][]) => string[];
    rowsToItems: (list: readonly [number | null, string | null, number | null][]) => [string, number][];
    itemsToRows: (data: [string, number][]) => [number | null, string | null, number | null][];
    sortRows: (rows: [number | null, string | null, number | null][]) => [number | null, string | null, number | null][];
    sortedIds: (x: any) => (string | undefined)[];
    soulFromPath: Curry.Curry<(indexer: any, path: any) => string>;
    pathFromSoul: (x0: string) => string;
    rowsFromSouls: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<[number | null, string | null, number | null][]>;
    read: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<{} | string[]>;
    diff: typeof diff;
    unionRows: (x: readonly any[]) => [number | null, string | null, number | null][];
};
export {};
