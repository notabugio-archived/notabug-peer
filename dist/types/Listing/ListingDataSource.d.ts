import * as R from 'ramda';
export declare const ListingDataSource: {
    fromDefinition: (definition: any) => R.Merge<{
        name: "listing" | "replies" | "op" | "curator" | "author" | "domain" | "topic";
    }, {
        listingPaths: string[];
    }>;
    sources: {
        listing: (definition: any) => {
            listingPaths: string[];
        };
        replies: (definition: any) => {
            listingPaths: string[];
        };
        op: (definition: any) => {
            listingPaths: string[];
        };
        curator: (definition: any) => {
            listingPaths: string[];
        };
        author: (definition: any) => {
            listingPaths: string[];
        };
        domain: (definition: any) => {
            listingPaths: string[];
        };
        topic: (definition: any) => {
            listingPaths: string[];
        };
    };
    needsScores: (definition: any) => boolean;
    needsData: (definition: any) => boolean;
};