/// <reference types="ramda" />
import { CombinedThingType, GunScope, ThingDataNodeType, ThingDataMap } from './types';
export declare const Query: {
    thingMeta: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<CombinedThingType | null>;
    multiThingMeta: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<{}>;
    thingScores: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<any>;
    thingData: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<ThingDataNodeType | null>;
    thingDataFromSouls: Curry.Curry<(scope: GunScope, souls: string[] | null) => Promise<ThingDataMap>>;
    userPages: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<any>;
    wikiPageId: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<any>;
    wikiPage: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<ThingDataNodeType | null>;
    userMeta: (scope: any, ...args: any[]) => import("../types/@notabug/gun-scope").GunScopePromise<any>;
    createScope: Curry.Curry<(nab: any, opts: any) => any>;
};
