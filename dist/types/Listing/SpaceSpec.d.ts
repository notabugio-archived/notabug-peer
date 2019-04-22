export declare const SpaceSpec: {
    configPageName: (name: string) => string;
    sidebarPageName: (name: string) => string;
    nodeToSpaceNames: (x: {}) => string[];
    userSpaceNames: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<string[]>;
    tabs: string[];
    getSource: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<string>;
    getSpec: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<import("../types").ListingSpecType>;
};
