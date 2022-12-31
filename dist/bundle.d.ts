import {F as FT} from 'ts-toolbelt'
export { __ }

// Generated by dts-bundle-generator v7.1.0

export type Cond = (...xs: any[]) => boolean;
export interface AnyObject {
	[k: string]: any;
}
export type AnyArgs = any[];
export type Curried<Args extends AnyArgs = AnyArgs, ReturnT = any> = (arg: Args[number]) => Curried<Args> | ReturnT;
export type Reducer = <T = any>(accum: T, cur: any, index: number) => T;
export type AnyFunc<ReturnT = any, Args extends AnyArgs = AnyArgs> = (...args: Args) => ReturnT;
export type Placeholder = symbol;
declare const __: Placeholder;
export declare const curry: <Func extends AnyFunc<any, AnyArgs>>(fn: AnyFunc) => FT.Curry<Func>;
export type Func2 = (a: any, b: any) => any;
export declare function curry2<Func extends Func2>(fn: Func): {
	(a: Placeholder, b: Parameters<Func>[1]): (a: Parameters<Func>[0]) => ReturnType<Func>;
	(a: Parameters<Func>[0], b: Placeholder): (b: Parameters<Func>[1]) => ReturnType<Func>;
	(a: Parameters<Func>[0]): (b: Parameters<Func>[1]) => ReturnType<Func>;
	(a: Parameters<Func>[0], b: Parameters<Func>[1]): ReturnType<Func>;
};
export type Func3 = (a: any, b: any, c: any) => any;
export declare function curry3<Func extends Func3>(fn: Func): FT.Curry<Func>;
export declare const uncurry: <Args extends any[] = any[], ReturnT = any>(fn: Curried<Args, any>) => AnyFunc;
export declare const toLower: (s: string) => string;
export declare const toUpper: (s: string) => string;
export declare const type: (s: any) => any;
export declare const typeIs: {
	(a: symbol, b: any): (a: string) => boolean;
	(a: string, b: symbol): (b: any) => boolean;
	(a: string): (b: any) => boolean;
	(a: string, b: any): boolean;
};
export declare const take: (argN: number) => (...args: any[]) => any;
export declare const equals: {
	(a: symbol, b: any): (a: any) => boolean;
	(a: any, b: symbol): (b: any) => boolean;
	(a: any): (b: any) => boolean;
	(a: any, b: any): boolean;
};
export declare const ifElse: FT.Curry<AnyFunc<any, AnyArgs>>;
export declare const when: FT.Curry<(cond: (s: any) => boolean, pipe: (s: any) => any, s: any) => any>;
export type Composed<TIn extends any[], TOut> = (...xs: TIn) => TOut;
export declare const compose: <TIn extends any[] = any[], TOut = any>(...fns: AnyFunc[]) => Composed<TIn, TOut>;
export declare const bind: {
	(a: symbol, b: any): (a: any) => any;
	(a: any, b: symbol): (b: any) => any;
	(a: any): (b: any) => any;
	(a: any, b: any): any;
};
export declare const nth: {
	(a: symbol, b: string | unknown[]): (a: number) => unknown;
	(a: number, b: symbol): (b: string | unknown[]) => unknown;
	(a: number): (b: string | unknown[]) => unknown;
	(a: number, b: string | unknown[]): unknown;
};
export declare const includes: {
	(a: symbol, b: unknown[]): (a: unknown) => boolean;
	(a: unknown, b: symbol): (b: unknown[]) => boolean;
	(a: unknown): (b: unknown[]) => boolean;
	(a: unknown, b: unknown[]): boolean;
};
export declare const slice: FT.Curry<(from: number, to: number, o: any[] | string) => string | any[]>;
export type TupleFn<ARG1 = any, ARG2 = any, Out = any> = (a: ARG1, b: ARG2) => Out;
export declare const flip: <ARG1 = any, ARG2 = any, Out = any>(fn: FT.Curry<TupleFn<ARG1, ARG2, Out>>) => FT.Curry<TupleFn<ARG2, ARG1, Out>>;
export declare const head: (b: string | unknown[]) => unknown;
export declare const tail: FT.Curry<(o: string | any[]) => string | any[]>;
export declare const add: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
export declare const subtract: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
export declare const multiply: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
export declare const divide: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
export declare const isNil: (s: any) => boolean;
export declare const length: (s: any[] | string) => number;
export declare const always: <T = any>(s: T) => () => T;
export declare const identity: (s: any) => any;
export declare const trim: (s: string) => string;
export declare const last: (s: any[] | string) => any;
export declare const not: (o: boolean) => boolean;
export declare const complement: (fn: AnyFunc) => (...args: any) => boolean | any;
export declare const keys: (o: AnyObject | any[]) => string[];
export declare const values: (o: AnyObject | any[]) => any[];
export declare const toPairs: (o: AnyObject | any[]) => [
	string,
	any
][];
export declare const test: {
	(a: symbol, b: string): (a: RegExp) => boolean;
	(a: RegExp, b: symbol): (b: string) => boolean;
	(a: RegExp): (b: string) => boolean;
	(a: RegExp, b: string): boolean;
};
export declare const tap: {
	(a: symbol, b: any): (a: Function) => any;
	(a: Function, b: symbol): (b: any) => any;
	(a: Function): (b: any) => any;
	(a: Function, b: any): any;
};
export declare const append: {
	(a: symbol, b: any[]): (a: any) => any[];
	(a: any, b: symbol): (b: any[]) => any[];
	(a: any): (b: any[]) => any[];
	(a: any, b: any[]): any[];
};
export declare const split: {
	(a: symbol, b: string): (a: string | RegExp) => string[];
	(a: string | RegExp, b: symbol): (b: string) => string[];
	(a: string | RegExp): (b: string) => string[];
	(a: string | RegExp, b: string): string[];
};
export declare const T: (...args: any[]) => true;
export declare const F: (...args: any[]) => false;
export declare const sizeof: (s: any[] | string | AnyObject) => number;
export declare const range: {
	(a: symbol, b: number): (a: number) => any[];
	(a: number, b: symbol): (b: number) => any[];
	(a: number): (b: number) => any[];
	(a: number, b: number): any[];
};
export declare const uniq: (xs: any[]) => any;
export declare const intersection: {
	(a: symbol, b: any[]): (a: any[]) => any[];
	(a: any[], b: symbol): (b: any[]) => any[];
	(a: any[]): (b: any[]) => any[];
	(a: any[], b: any[]): any[];
};
export declare const genBy: {
	(a: symbol, b: number): (a: (i: number) => any) => any[];
	(a: (i: number) => any, b: symbol): (b: number) => any[];
	(a: (i: number) => any): (b: number) => any[];
	(a: (i: number) => any, b: number): any[];
};
export declare const once: <Func extends AnyFunc<any, AnyArgs>>(fn: Func) => (...args: Parameters<Func>) => any;
export declare const reverse: (xs: any[]) => any;
export declare const gt: {
	(a: symbol, b: number): (a: number) => boolean;
	(a: number, b: symbol): (b: number) => boolean;
	(a: number): (b: number) => boolean;
	(a: number, b: number): boolean;
};
export declare const lt: {
	(a: symbol, b: number): (a: number) => boolean;
	(a: number, b: symbol): (b: number) => boolean;
	(a: number): (b: number) => boolean;
	(a: number, b: number): boolean;
};
export declare const gte: {
	(a: symbol, b: number): (a: number) => boolean;
	(a: number, b: symbol): (b: number) => boolean;
	(a: number): (b: number) => boolean;
	(a: number, b: number): boolean;
};
export declare const lte: {
	(a: symbol, b: number): (a: number) => boolean;
	(a: number, b: symbol): (b: number) => boolean;
	(a: number): (b: number) => boolean;
	(a: number, b: number): boolean;
};
export declare const sort: {
	(a: symbol, b: any[]): (a: any) => any[];
	(a: any, b: symbol): (b: any[]) => any[];
	(a: any): (b: any[]) => any[];
	(a: any, b: any[]): any[];
};
export declare const find: {
	(a: symbol, b: any[]): (a: Cond) => any;
	(a: Cond, b: symbol): (b: any[]) => any;
	(a: Cond): (b: any[]) => any;
	(a: Cond, b: any[]): any;
};
export declare const findIndex: {
	(a: symbol, b: any[]): (a: Cond) => number;
	(a: Cond, b: symbol): (b: any[]) => number;
	(a: Cond): (b: any[]) => number;
	(a: Cond, b: any[]): number;
};
export declare const indexOf: {
	(a: symbol, b: any[]): (a: any) => number;
	(a: any, b: symbol): (b: any[]) => number;
	(a: any): (b: any[]) => number;
	(a: any, b: any[]): number;
};
export declare const explore: (caption: string, level?: string) => (b: any) => any;
export declare const cond: {
	(a: symbol, b: any): (a: [
		Cond,
		Function
	][]) => any;
	(a: [
		Cond,
		Function
	][], b: symbol): (b: any) => any;
	(a: [
		Cond,
		Function
	][]): (b: any) => any;
	(a: [
		Cond,
		Function
	][], b: any): any;
};
export declare const assoc: FT.Curry<(prop: string, v: any, obj: AnyObject) => {
	[x: string]: any;
}>;
export declare const assocPath: any;
export declare const all: {
	(a: symbol, b: any[]): (a: Cond) => boolean;
	(a: Cond, b: symbol): (b: any[]) => boolean;
	(a: Cond): (b: any[]) => boolean;
	(a: Cond, b: any[]): boolean;
};
export declare const any: {
	(a: symbol, b: any[]): (a: Cond) => boolean;
	(a: Cond, b: symbol): (b: any[]) => boolean;
	(a: Cond): (b: any[]) => boolean;
	(a: Cond, b: any[]): boolean;
};
export declare const allPass: {
	(a: symbol, b: any): (a: Cond[]) => boolean;
	(a: Cond[], b: symbol): (b: any) => boolean;
	(a: Cond[]): (b: any) => boolean;
	(a: Cond[], b: any): boolean;
};
export declare const anyPass: {
	(a: symbol, b: any): (a: Cond[]) => boolean;
	(a: Cond[], b: symbol): (b: any) => boolean;
	(a: Cond[]): (b: any) => boolean;
	(a: Cond[], b: any): boolean;
};
export declare const prop: {
	(a: symbol, b: AnyObject): (a: string) => any;
	(a: string, b: symbol): (b: AnyObject) => any;
	(a: string): (b: AnyObject) => any;
	(a: string, b: AnyObject): any;
};
export declare const propEq: FT.Curry<(key: string, value: any, o: AnyObject) => boolean>;
export declare const propsEq: FT.Curry<(key: string, o1: any, o2: AnyObject) => boolean>;
export declare const pathOr: FT.Curry<(_default: any, path: string[], o: any) => any>;
export declare const path: FT.Curry<(path: string[], o: any) => any>;
export declare const pathEq: FT.Curry<(_path: string[], value: any, o: AnyObject) => (a: any) => boolean>;
export declare const pathsEq: FT.Curry<(_path: string[], o1: AnyObject, o2: AnyObject) => (a: any) => boolean>;
export declare const clone: (s: any, shallow?: boolean) => any;
export declare const cloneShallow: (s: any) => any;
export declare const reduce: FT.Curry<(fn: Reducer, accum: any, arr: any[]) => FT.Curry<(...p: [
] | [
	accum: any
]) => any>>;
export declare const pickBy: {
	(a: symbol, b: AnyObject): (a: Cond) => any;
	(a: Cond, b: symbol): (b: AnyObject) => any;
	(a: Cond): (b: AnyObject) => any;
	(a: Cond, b: AnyObject): any;
};
export declare const pick: {
	(a: symbol, b: AnyObject): (a: string[]) => {};
	(a: string[], b: symbol): (b: AnyObject) => {};
	(a: string[]): (b: AnyObject) => {};
	(a: string[], b: AnyObject): {};
};
export declare const omit: {
	(a: symbol, b: AnyObject): (a: string[]) => any;
	(a: string[], b: symbol): (b: AnyObject) => any;
	(a: string[]): (b: AnyObject) => any;
	(a: string[], b: AnyObject): any;
};
export declare const fromPairs: (pairs: [
	string,
	any
][]) => FT.Curry<(fn: Reducer, accum: any, arr: any[]) => FT.Curry<(...p: [
] | [
	accum: any
]) => any>>;
export declare const concat: {
	(a: symbol, b: string | any[]): (a: string | any[]) => string | any[];
	(a: string | any[], b: symbol): (b: string | any[]) => string | any[];
	(a: string | any[]): (b: string | any[]) => string | any[];
	(a: string | any[], b: string | any[]): string | any[];
};
export declare const join: {
	(a: symbol, b: string[]): (a: string) => string;
	(a: string, b: symbol): (b: string[]) => string;
	(a: string): (b: string[]) => string;
	(a: string, b: string[]): string;
};
export declare const map: {
	(a: symbol, b: any[]): (a: (s: any) => any) => any[];
	(a: (s: any) => any, b: symbol): (b: any[]) => any[];
	(a: (s: any) => any): (b: any[]) => any[];
	(a: (s: any) => any, b: any[]): any[];
};
export declare const forEach: {
	(a: symbol, b: any[]): (a: (s: any) => any) => void;
	(a: (s: any) => any, b: symbol): (b: any[]) => void;
	(a: (s: any) => any): (b: any[]) => void;
	(a: (s: any) => any, b: any[]): void;
};
export declare const both: FT.Curry<(cond1: Cond, cond2: Cond, s: any) => boolean>;
export declare const isEmpty: (s: any) => boolean | null;
export declare const empty: (s: any) => {} | undefined;
export declare const replace: FT.Curry<(a: string | RegExp, b: string | ((substring: string, ...ps: any[]) => string), where: string) => string>;
export declare const filter: any;
export declare const memoize: (fn: Function) => () => any;
export declare const mergeShallow: {
	(a: symbol, b: AnyObject): (a: AnyObject) => AnyObject;
	(a: AnyObject, b: symbol): (b: AnyObject) => AnyObject;
	(a: AnyObject): (b: AnyObject) => AnyObject;
	(a: AnyObject, b: AnyObject): AnyObject;
};
export declare const mergeDeep: {
	(a: symbol, b: AnyObject): (a: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject, b: symbol): (b: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject): (b: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject, b: AnyObject): FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
};
export declare const mergeDeepX: {
	(a: symbol, b: AnyObject): (a: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject, b: symbol): (b: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject): (b: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject, b: AnyObject): FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
};
export declare const mergeDeepAdd: {
	(a: symbol, b: AnyObject): (a: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject, b: symbol): (b: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject): (b: AnyObject) => FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
	(a: AnyObject, b: AnyObject): FT.Curry<(...p: [
	] | [
		o1: AnyObject,
		o2: AnyObject
	] | [
		o2: AnyObject
	] | [
		o1: AnyObject
	]) => any>;
};
export declare const overProp: FT.Curry<(prop: string, pipe: AnyFunc, data: any) => FT.Curry<(...p: [
] | [
	v: any,
	obj: AnyObject
] | [
	obj: AnyObject
] | [
	v: any
]) => any>>;
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export declare const mapKeys: {
	(a: symbol, b: AnyObject): (a: {
		[oldKey: string]: string;
	}) => AnyObject;
	(a: {
		[oldKey: string]: string;
	}, b: symbol): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string;
	}): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string;
	}, b: AnyObject): AnyObject;
};
/** One promise waits for another. */
export declare const forEachSerial: {
	(a: symbol, b: any[]): (a: AnyFunc<any, AnyArgs>) => Promise<void>;
	(a: AnyFunc<any, AnyArgs>, b: symbol): (b: any[]) => Promise<void>;
	(a: AnyFunc<any, AnyArgs>): (b: any[]) => Promise<void>;
	(a: AnyFunc<any, AnyArgs>, b: any[]): Promise<void>;
};
/** Promise.all wrapper for functional pipelining. */
export declare const waitAll: (promises: Promise<any>[]) => Promise<any[]>;
export declare const waitTap: {
	(a: symbol, b: any): (a: Function) => Promise<any>;
	(a: Function, b: symbol): (b: any) => Promise<any>;
	(a: Function): (b: any) => Promise<any>;
	(a: Function, b: any): Promise<any>;
};
/** Waits for all promises mapped by the fn. */
export declare const forEachAsync: {
	(a: symbol, b: any[]): (a: (item: any) => Promise<any>) => Promise<any[]>;
	(a: (item: any) => Promise<any>, b: symbol): (b: any[]) => Promise<any[]>;
	(a: (item: any) => Promise<any>): (b: any[]) => Promise<any[]>;
	(a: (item: any) => Promise<any>, b: any[]): Promise<any[]>;
};
/** The same as compose, but waits for promises in chains and returns a Promise.  */
export declare const composeAsync: <T = any>(...fns: AnyFunc[]) => (data?: any) => Promise<T>;
export declare const mirror: (s: any) => any;
export declare const reflect: (s: any) => any;
export declare const echo: (s: any) => any;
export declare const qappend: {
	(a: symbol, b: any[]): (a: any) => any[];
	(a: any, b: symbol): (b: any[]) => any[];
	(a: any): (b: any[]) => any[];
	(a: any, b: any[]): any[];
};
export declare const qassoc: import("ts-toolbelt/out/Function/Curry").Curry<(prop: string, v: any, obj: AnyObject) => AnyObject>;
export declare const qreduce: import("ts-toolbelt/out/Function/Curry").Curry<(<T>(fn: Reducer, accum: any, arr: T[]) => any)>;
export declare const qmergeDeep: import("ts-toolbelt/out/Function/Curry").Curry<(o1: AnyObject, o2: AnyObject) => AnyObject>;
export declare const qmergeDeepX: import("ts-toolbelt/out/Function/Curry").Curry<(o1: AnyObject, o2: AnyObject) => AnyObject>;
export declare const qmergeDeepAdd: import("ts-toolbelt/out/Function/Curry").Curry<(o1: AnyObject, o2: AnyObject) => AnyObject>;
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export declare const qmapKeys: {
	(a: symbol, b: AnyObject): (a: {
		[oldKey: string]: string;
	}) => AnyObject;
	(a: {
		[oldKey: string]: string;
	}, b: symbol): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string;
	}): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string;
	}, b: AnyObject): AnyObject;
};
export declare const qfilter: {
	(a: symbol, b: any[] | AnyObject): (a: (v: any, k: string | number) => boolean) => any[] | AnyObject;
	(a: (v: any, k: string | number) => boolean, b: symbol): (b: any[] | AnyObject) => any[] | AnyObject;
	(a: (v: any, k: string | number) => boolean): (b: any[] | AnyObject) => any[] | AnyObject;
	(a: (v: any, k: string | number) => boolean, b: any[] | AnyObject): any[] | AnyObject;
};
/** @deprecated */
export declare const qindexOf: {
	(a: symbol, b: any[]): (a: any) => number;
	(a: any, b: symbol): (b: any[]) => number;
	(a: any): (b: any[]) => number;
	(a: any, b: any[]): number;
};
export type StrTmpl = ((data: AnyObject) => string);
export declare const getTmpl: (tmpl: string) => StrTmpl;

export {};
