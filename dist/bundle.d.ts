export declare const __: () => void;
export declare const curry: (fn: Function) => (...args: any[]) => any;
export declare const toLower: (s: string) => string;
export declare const toUpper: (s: string) => string;
export declare const type: (s: any) => string;
export declare type Cond = (...ss: any[]) => boolean;
export interface AnyObject {
	[k: string]: any;
}
export declare type AnyFunc = (...args: any[]) => any;
export declare const equals: (...args: any[]) => any;
export declare const ifElse: (...args: any[]) => any;
export declare const when: (...args: any[]) => any;
export declare const compose: (...fns: Function[]) => (s: any) => any;
export declare const bind: (...args: any[]) => any;
export declare const nth: (...args: any[]) => any;
export declare const includes: (...args: any[]) => any;
export declare const slice: (...args: any[]) => any;
export declare const head: any;
export declare const tail: any;
export declare const add: (...args: any[]) => any;
export declare const subtract: (...args: any[]) => any;
export declare const flip: (fn: Function) => (...args: any[]) => any;
export declare const isNil: (s: any) => boolean;
export declare const length: (s: string | any[]) => number;
export declare const always: <T = any>(s: T) => () => T;
export declare const identity: (s: any) => any;
export declare const trim: (s: string) => string;
export declare const last: (s: string | any[]) => any;
export declare const not: (o: boolean) => boolean;
export declare const complement: (fn: Cond) => (...args: any) => boolean;
export declare const keys: (o: AnyObject) => string[];
export declare const values: (o: AnyObject) => any[];
export declare const toPairs: (o: AnyObject) => [string, any][];
export declare const tap: (...args: any[]) => any;
export declare const append: (...args: any[]) => any;
export declare const split: (...args: any[]) => any;
export declare const T: () => true;
export declare const F: () => false;
export declare const uniq: (xs: any[]) => any;
export declare const gt: (...args: any[]) => any;
export declare const lt: (...args: any[]) => any;
export declare const gte: (...args: any[]) => any;
export declare const lte: (...args: any[]) => any;
export declare const findIndex: (...args: any[]) => any;
export declare const explore: (caption: string, level?: string) => any;
export declare const cond: (...args: any[]) => any;
export declare const assoc: (...args: any[]) => any;
export declare const prop: (...args: any[]) => any;
export declare const pathOr: (...args: any[]) => any;
export declare const path: any;
export declare const clone: (s: any) => any;
export declare const reduce: (...args: any[]) => any;
export declare const pickBy: (...args: any[]) => any;
export declare const pick: (...args: any[]) => any;
export declare const omit: (...args: any[]) => any;
export declare const fromPairs: (pairs: [string, any][]) => any;
export declare const join: (...args: any[]) => any;
export declare const map: (...args: any[]) => any;
export declare const forEach: (...args: any[]) => any;
export declare const both: (...args: any[]) => any;
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
export declare const mirror: (s: any) => any;
export declare const reflect: (s: any) => any;
export declare const echo: (s: any) => any;
export declare const qappend: (...args: any[]) => any;
export declare const qassoc: (...args: any[]) => any;
export declare const qreduce: (...args: any[]) => any;
export declare const qmergeDeep: (...args: any[]) => any;

export {};
