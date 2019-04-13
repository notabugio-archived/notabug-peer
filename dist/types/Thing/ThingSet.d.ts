declare function dayStr(timestamp: number | null | undefined): string;
export declare const ThingSet: {
    ids: (x: {}) => string[];
    union: (nodes: any[]) => any;
    souls: <U, V>(x0: {}) => V[];
    dayStr: typeof dayStr;
};
export {};
