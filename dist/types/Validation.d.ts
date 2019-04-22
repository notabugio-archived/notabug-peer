/// <reference types="ramda" />
export declare const Validation: {
    createSuppressor: (Gun: any) => any;
    isLegacyThing: (_schema: any, data: any) => boolean | undefined;
    thingHashMatchesSoul: (_schema: any, data: any) => boolean;
    signedThingDataMatches: (_schema: any, data: any) => boolean;
    thingDataMatchesOriginalHash: (_schema: any, data: any) => boolean;
    getIsThingRelatedEdge: (ajv: any) => (nodeTypeName: string, data: any, _pSchema: any, _cPath: any, parentData: any) => any;
    thingDataHashMatches: (_schema: any, data: any) => boolean;
    isVoteValid: (argon2: any, schema: any, prefix: string, vote: string) => boolean;
    keysAreProofsOfWork: (schema: any, data: any) => boolean;
    initAjv: (Gun: any) => (x0: any) => any;
    gunWireInput: Curry.Curry<(peer: any, context: any) => void>;
};
