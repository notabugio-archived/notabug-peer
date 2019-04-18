import * as R from 'ramda';
import { GunScope, ListingSpecType } from './types';
export declare const Page: {
    withListingMatch: (path: string, params?: any) => {
        preload: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<{}>;
        sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string>;
        space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
        ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<never[]>;
    } | {
        preload: (scope: GunScope) => Promise<any>;
        sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<import("./types").ThingDataNodeType | null>;
        space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
        ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string[]>;
    };
    preloadListing: (scope: GunScope, path: string, params?: any) => Promise<any>;
    wikiPage: <T2>(b: T2) => R.Merge<{
        withMatch: ({ params: { authorId, name } }: {
            params: {
                authorId: string;
                name: string;
            };
        }) => {
            preload: (scope: GunScope) => import("../types/gun-scope").GunScopePromise<import("./types").ThingDataNodeType | null>;
        };
    }, T2>;
    thingComments: ({ prefix: defaultPrefix, identifier: defaultIdentifier, sort: defaultSort, ...rest }?: {
        prefix?: string | undefined;
        identifier?: string | undefined;
        sort?: string | undefined;
    }) => {
        withMatch: ({ params: { opId }, query: queryParams }: {
            params: {
                opId?: string | undefined;
            };
            query?: {} | undefined;
        }) => {
            preload: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<{}>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<never[]>;
        } | {
            preload: (scope: GunScope) => Promise<any>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<import("./types").ThingDataNodeType | null>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string[]>;
        };
    };
    listing: ({ prefix: defaultPrefix, identifier: defaultIdentifier, sort: defaultSort, ...rest }?: {
        prefix?: string | undefined;
        identifier?: string | undefined;
        sort?: string | undefined;
    }) => {
        withMatch: ({ params: { prefix, identifier, sort }, query: queryParams }: {
            params: {
                prefix?: string | undefined;
                identifier?: string | undefined;
                sort?: string | undefined;
            };
            query?: {} | undefined;
        }) => {
            preload: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<{}>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<never[]>;
        } | {
            preload: (scope: GunScope) => Promise<any>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<import("./types").ThingDataNodeType | null>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string[]>;
        };
    };
    spaceListing: ({ name: defaultName, authorId: defaultAuthorId, sort: defaultSort, ...rest }?: {
        name?: string | undefined;
        authorId?: string | undefined;
        sort?: string | undefined;
    }) => {
        withMatch: ({ params: { authorId, name, sort }, query: queryParams }: {
            params: {
                authorId?: string | undefined;
                name?: string | undefined;
                sort?: string | undefined;
            };
            query?: {} | undefined;
        }) => {
            preload: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<{}>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<never[]>;
        } | {
            preload: (scope: GunScope) => Promise<any>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<import("./types").ThingDataNodeType | null>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string[]>;
        };
    };
    spaceThingComments: ({ name: defaultName, authorId: defaultAuthorId, sort: defaultSort, ...rest }: {
        [x: string]: any;
        name?: string | undefined;
        authorId?: string | undefined;
        sort?: string | undefined;
    }) => {
        withMatch: ({ params: { opId, authorId, name, sort }, query: queryParams }: {
            params: {
                opId?: string | undefined;
                authorId?: string | undefined;
                name?: string | undefined;
                sort?: string | undefined;
            };
            query?: {} | undefined;
        }) => {
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string[]>;
            preload: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<any>;
        };
    };
    profile: ({ sort: defaultSort, type: defaultType, ...rest }?: {
        sort?: string | undefined;
        type?: string | undefined;
    }) => {
        withMatch: ({ params: { authorId, type, sort }, query }: {
            params: {
                authorId?: string | undefined;
                type?: string | undefined;
                sort?: string | undefined;
            };
            query?: {} | undefined;
        }) => {
            preload: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<{}>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<never[]>;
        } | {
            preload: (scope: GunScope) => Promise<any>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<import("./types").ThingDataNodeType | null>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string[]>;
        };
    };
    inbox: ({ sort: defaultSort, type: defaultType, ...rest }?: {
        sort?: string | undefined;
        type?: string | undefined;
    }) => {
        withMatch: ({ authorId, params: { type, sort }, query }: {
            authorId?: string | undefined;
            params: {
                type?: string | undefined;
                sort?: string | undefined;
            };
            query?: {} | undefined;
        }) => {
            preload: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<{}>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<never[]>;
        } | {
            preload: (scope: GunScope) => Promise<any>;
            sidebar: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<import("./types").ThingDataNodeType | null>;
            space: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<ListingSpecType>;
            ids: (scope: any, ...args: any[]) => import("../types/gun-scope").GunScopePromise<string[]>;
        };
    };
};
