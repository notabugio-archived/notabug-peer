declare type UpdateFunction = (updates: any) => void;
interface ConfigType {
    [idx: string]: string | number | UpdateFunction;
    tabulator: string;
    indexer: string;
    owner: string;
    oracleMaxStaleness: number;
    update: UpdateFunction;
}
export declare const Config: ConfigType;
export {};
