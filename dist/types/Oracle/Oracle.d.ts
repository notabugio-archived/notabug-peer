interface OracleFeature {
    onPut: (msg: any) => void;
}
export declare class Oracle {
    peer: any;
    features: OracleFeature[];
    constructor(peer: any);
    use(feature: OracleFeature): void;
    onPut(msg: any): void;
}
export {};
