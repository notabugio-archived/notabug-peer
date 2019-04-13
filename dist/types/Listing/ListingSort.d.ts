export declare const ListingSort: {
    POS_ID: number;
    POS_VAL: number;
    sorts: {
        new: (scope: any, ...args: any[]) => import("../../types/gun-scope").GunScopePromise<number>;
        top: (scope: any, ...args: any[]) => import("../../types/gun-scope").GunScopePromise<number>;
        comments: (scope: any, ...args: any[]) => import("../../types/gun-scope").GunScopePromise<number>;
        discussed: (scope: any, ...args: any[]) => import("../../types/gun-scope").GunScopePromise<number>;
        hot: (scope: any, ...args: any[]) => import("../../types/gun-scope").GunScopePromise<number>;
        best: (scope: any, ...args: any[]) => import("../../types/gun-scope").GunScopePromise<number>;
        controversial: (scope: any, ...args: any[]) => import("../../types/gun-scope").GunScopePromise<number>;
    };
    isValidSort: (sort: string) => boolean;
    toIds: <T>(list: readonly (readonly T[])[]) => (T | undefined)[];
    sortItems: <T>(list: readonly T[]) => T[];
};
