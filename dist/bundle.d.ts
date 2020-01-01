export declare const __: () => void;
export declare const curry: (fn: Function) => (...args: any[]) => any;
export declare type Cond = (s: any) => boolean;
export interface AnyObject {
	[k: string]: any;
}
export declare type AnyFunc = (...args: any[]) => any;
export declare const equals: (...args: any[]) => any;
export declare const ifElse: (...args: any[]) => any;
export declare const when: (...args: any[]) => any;
export declare const compose: (...fns: Function[]) => (s: any) => any;
export declare const flip: (fn: Function) => (...args: any[]) => any;
export declare const isNil: (s: any) => boolean;
export declare const length: (s: string | any[]) => number;
export declare const always: (s: any) => () => any;
export declare const identity: (s: any) => any;
export declare const trim: (s: string) => string;
export declare const head: (s: string | any[]) => any;
export declare const tail: (s: string | any[]) => string | any[];
export declare const last: (s: string | any[]) => any;
export declare const complement: (fn: Cond) => (s: any) => boolean;
export declare const keys: (o: AnyObject) => string[];
export declare const values: (o: AnyObject) => any[];
export declare const toPairs: (o: AnyObject) => [string, any][];
export declare const tap: (fn: Function) => (s: any) => any;
export declare const explore: (caption: string, level?: string) => (s: any) => any;
export declare const slice: (...args: any[]) => any;
export declare const assoc: (...args: any[]) => any;
export declare const prop: (...args: any[]) => any;
export declare const pathOr: (...args: any[]) => any;
export declare const path: any;
export declare const clone: (s: any) => any;
export declare const pick: (...args: any[]) => any;
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
export declare const memoize: (fn: Function) => () => any;
export declare const mergeShallow: (...args: any[]) => any;
export declare const mergeDeep: (...args: any[]) => any;
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export declare const mapKeys: (...args: any[]) => any;
/** One promise waits for another. */
export declare const forEachSerial: (...args: any[]) => any;
/** Promise.all wrapper for functional pipelining. */
export declare const waitAll: (promises: Promise<any>[]) => Promise<any[]>;
/** Waits for all promises mapped by the fn. */
export declare const forEachAsync: (...args: any[]) => any;
/** The same as compose, but waits for promises in chains and returns a Promise.  */
export declare const composeAsync: <T = any>(...fns: AnyFunc[]) => (data?: any) => Promise<T>;

export {};
