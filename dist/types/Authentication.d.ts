/// <reference types="ramda" />
export declare const Authentication: {
    signup: Curry.Curry<(peer: any, username: any, password: any, opts?: any) => Promise<{}>>;
    login: Curry.Curry<(peer: any, username: any, password: any) => Promise<{}>>;
    logout: (peer: any) => any;
    isLoggedIn: (peer: any) => any;
    onLogin: Curry.Curry<(peer: any, fn: any) => any>;
};
