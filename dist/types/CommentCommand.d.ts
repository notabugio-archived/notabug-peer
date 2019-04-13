import { ThingDataMap, CommandMap } from './types';
export declare const CommentCommand: {
    tokenize: (x: string) => string[];
    map: (thingData: ThingDataMap) => CommandMap;
};
