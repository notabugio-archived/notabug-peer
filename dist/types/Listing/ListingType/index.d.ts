import { ListingSpecType, ThingDataNodeType } from '../../types';
export declare const ListingType: {
    types: {
        ChatListing: any;
        FirehoseListing: any;
        TopicListing: any;
        DomainListing: any;
        CommentListing: any;
        SpaceListing: any;
        InboxListing: any;
        CommentedListing: any;
        ProfileListing: any;
    };
    fromPath: (path: string) => any;
    sidebarFromPath: (scope: any, ...args: any[]) => import("../../../types/gun-scope").GunScopePromise<ThingDataNodeType | null>;
    specFromPath: (scope: any, ...args: any[]) => import("../../../types/gun-scope").GunScopePromise<ListingSpecType>;
    ChatListing: any;
    FirehoseListing: any;
    TopicListing: any;
    DomainListing: any;
    CommentListing: any;
    SpaceListing: any;
    InboxListing: any;
    CommentedListing: any;
    ProfileListing: any;
};
