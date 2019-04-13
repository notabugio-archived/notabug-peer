import { GunNodeType } from './types';
declare function decodeSEA(rawData: GunNodeType): any;
export declare const GunNode: {
    soul: (node: any) => string;
    state: (node: any) => {
        [key: string]: number;
    };
    diff: (existing: any, updated: any) => Pick<any, string>;
    latest: (x: any) => number;
    edges: <U, V>(x0: {}) => V[];
    decodeSEA: typeof decodeSEA;
};
export {};
