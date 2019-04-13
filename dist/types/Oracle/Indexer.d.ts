import { GunScope } from '../types';
import { ThingQueue } from './ThingQueue';
declare function describeThingId(scope: GunScope, thingId: string): Promise<{
    id: string;
    includes: string[];
    sorts: (string | number)[][];
} | undefined>;
declare class IndexerQueue extends ThingQueue {
    processNext(): Promise<void>;
    onPut(msg: any): void;
}
export declare const Indexer: {
    Queue: typeof IndexerQueue;
    describeThingId: typeof describeThingId;
};
export {};
