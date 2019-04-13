declare type UpdateFunction = (updates: any) => void;
interface ConfigType {
    [idx: string]: string | UpdateFunction;
    tabulator: string;
    indexer: string;
    owner: string;
    update: UpdateFunction;
}
export declare const Config: ConfigType;
export {};
