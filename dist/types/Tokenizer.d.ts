export declare const Tokenizer: {
    tokenize: (source: string) => {
        source: string;
        isPresent: (p: string | string[]) => {} | "" | undefined;
        getValue: (p: string | string[]) => string | null;
        getValues: (p: string | string[]) => string[];
        getLastValue: (p: string | string[]) => string | null;
        getValueChain: (p: string | string[]) => string[];
        getPairs: (p: string | string[]) => any[];
    };
};
