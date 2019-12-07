export declare type Cond = (s: any) => boolean;
export interface AnyObject {
	[k: string]: any;
}
export declare const curry: (fn: Function) => (...args: any[]) => any;
export declare const equals: (...args: any[]) => any;
export declare const ifElse: (...args: any[]) => any;
export declare const when: (...args: any[]) => any;
export declare const compose: (...fns: Function[]) => (s: any) => any;
export declare const isArray: (s: any) => boolean;
export declare const isNil: (s: any) => boolean;
export declare const length: (s: string | any[]) => number;
export declare const always: (s: any) => () => any;
export declare const identity: (s: any) => any;
export declare const trim: (s: string) => string;
export declare const last: (s: string | any[]) => any;
export declare const complement: (fn: Cond) => (s: any) => boolean;
export declare const keys: (o: AnyObject) => string[];
export declare const values: (o: AnyObject) => any[];
export declare const toPairs: (o: AnyObject) => [string, any][];
export declare const assoc: (...args: any[]) => any;
export declare const clone: (s: any) => any;
export declare const reduce: (...args: any[]) => any;
export declare const fromPairs: (pairs: [string, any][]) => any;
export declare const join: (...args: any[]) => any;
export declare const map: (...args: any[]) => any;
export declare const forEach: (...args: any[]) => any;
export declare const both: (...args: any[]) => any;
export declare const type: (s: any) => string;
export declare const isEmpty: (s: any) => boolean;
export declare const replace: (...args: any[]) => any;
export declare const filter: (...args: any[]) => any;

export {};
