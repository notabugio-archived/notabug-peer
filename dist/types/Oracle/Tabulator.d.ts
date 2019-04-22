import { ThingQueue } from './ThingQueue';
import { ThingVoteCountsType } from '../types';
declare class TabulatorQueue extends ThingQueue {
    processNext(): Promise<void>;
    onPut(msg: any): void;
}
export declare const Tabulator: {
    Queue: typeof TabulatorQueue;
    query: (scope: any, ...args: any[]) => import("../../types/@notabug/gun-scope").GunScopePromise<ThingVoteCountsType | null>;
};
export {};
