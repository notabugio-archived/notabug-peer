import { ListingSpecType } from '../types';
export declare class ThingQueue {
    newIds: string[];
    updatedIds: string[];
    peer: any;
    spec: ListingSpecType;
    scopeOpts: any;
    processingId: string;
    constructor(peer: any, config?: string, scopeOpts?: {});
    length(): number;
    contains(id: string): boolean;
    enqueue(id: string, isNew?: boolean): void;
    dequeue(): string;
    processNext(): Promise<void>;
    onPut(msg: any): void;
}
