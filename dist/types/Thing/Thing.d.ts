/// <reference types="ramda" />
export { ThingSet } from './ThingSet';
export { ThingDataNode } from './ThingDataNode';
export declare const Thing: {
    soulToId: (x0: string) => {};
    soulsToIds: (list: readonly string[]) => {}[];
    put: Curry.Curry<(peer: any, data: any) => any>;
    submit: Curry.Curry<(peer: any, data: any) => any>;
    comment: Curry.Curry<(peer: any, data: any) => any>;
    chat: Curry.Curry<(peer: any, data: any) => any>;
    writePage: Curry.Curry<(peer: any, name: any, body: any) => any>;
    vote: Curry.Curry<(peer: any, id: any, kind: any, nonce: any) => any>;
    index: Curry.Curry<(peer: any, thingId: any, data: any) => void>;
};
