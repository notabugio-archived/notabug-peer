import { ListingSpecType } from '../types';
export declare const ListingSpec: {
    fromSource: (source: string, ownerId?: string | undefined, spaceName?: string | undefined) => ListingSpecType;
    getSource: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<string>;
};
