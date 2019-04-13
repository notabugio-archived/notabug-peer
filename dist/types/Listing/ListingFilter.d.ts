/// <reference types="ramda" />
import { GunScope, ListingSpecType, CombinedThingType } from '../types';
declare type FilterFnType = (id: string) => Promise<boolean>;
interface GetRowsParams {
    limit?: string;
    count?: string;
    after?: string;
    filterFn: FilterFnType;
}
export declare const ListingFilter: {
    fromDefinition: (definition: any) => {
        thingFilter: (thing: CombinedThingType) => any;
        contentFilter: (thing: CombinedThingType) => boolean;
        voteFilter: (thing: CombinedThingType) => boolean;
    };
    getFilteredRows: (scope: GunScope, spec: ListingSpecType, sortedRows: [number | null, string | null, number | null][], params?: GetRowsParams | undefined) => Promise<[number | null, string | null, number | null][]>;
    getFilteredIds: (scope: GunScope, spec: ListingSpecType, sortedRows: [number | null, string | null, number | null][], params?: GetRowsParams | undefined) => Promise<string[]>;
    thingFilter: Curry.Curry<(scope: any, spec: any, thingId: any) => Promise<CombinedThingType | null>>;
};
export {};
