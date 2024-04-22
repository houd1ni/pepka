// Generated by dts-bundle-generator v9.5.1

export type Cond = (x1?: any, x2?: any, x3?: any) => boolean;
export interface AnyObject {
	[k: string]: any;
}
export type AnyArgs = any[];
export type Reducer<T = any> = (accum: T, cur: any, index: number) => T;
export type AnyFunc<ReturnT = any, Args extends AnyArgs = AnyArgs> = (...args: Args) => ReturnT;
export type TupleFn<ARG1 = any, ARG2 = any, Out = any> = (a: ARG1, b: ARG2) => Out;
export type Curried<Args extends AnyArgs = AnyArgs, ReturnT = any> = (arg: Args[number]) => Curried<Args> | ReturnT;
export type BasicType = "String" | "Object" | "Number" | "Symbol" | "Array" | "Null" | "Undefined";
type Placeholder = symbol;
export declare const __: Placeholder;
export declare const curry: (fn: AnyFunc) => (...args: AnyArgs) => any;
type Func2 = (a: any, b: any) => any;
export declare function curry2<Func extends Func2>(fn: Func): {
	(a: Placeholder, b: Parameters<Func>[1]): (a: Parameters<Func>[0]) => ReturnType<Func>;
	(a: Parameters<Func>[0], b: Placeholder): (b: Parameters<Func>[1]) => ReturnType<Func>;
	(a: Parameters<Func>[0]): (b: Parameters<Func>[1]) => ReturnType<Func>;
	(a: Parameters<Func>[0], b: Parameters<Func>[1]): ReturnType<Func>;
};
type Func3 = (a: any, b: any, c: any) => any;
export declare function curry3<Func extends Func3>(fn: Func): (...args: AnyArgs) => any;
export declare const uncurry: <Args extends any[] = any[], ReturnT = any>(fn: Curried<Args>) => AnyFunc;
export declare const symbol: unique symbol;
export declare const toLower: (s: string) => string;
export declare const toUpper: (s: string) => string;
export declare const type: (s: any) => string;
export declare const typeIs: {
	(a: symbol, b: any): (a: string) => boolean;
	(a: string, b: symbol): (b: any) => boolean;
	(a: string): (b: any) => boolean;
	(a: string, b: any): boolean;
};
declare const length$1: (s: any[] | string) => number;
export declare const isNil: (s: any) => boolean;
export declare const eq: {
	(a: symbol, b: any): (a: any) => boolean;
	(a: any, b: symbol): (b: any) => boolean;
	(a: any): (b: any) => boolean;
	(a: any, b: any): boolean;
};
export declare const equals: {
	(a: symbol, b: any): (a: any) => boolean;
	(a: any, b: symbol): (b: any) => boolean;
	(a: any): (b: any) => boolean;
	(a: any, b: any): boolean;
};
export declare const includes: {
	(a: symbol, b: unknown[]): (a: unknown) => boolean;
	(a: unknown, b: symbol): (b: unknown[]) => boolean;
	(a: unknown): (b: unknown[]) => boolean;
	(a: unknown, b: unknown[]): boolean;
};
/** @param start string | any[] @param s string | any[] */
export declare const qstartsWithWith: (comparator: (x: any, y: any) => boolean) => {
	(a: symbol, b: string | any[]): (a: string | any[]) => boolean;
	(a: string | any[], b: symbol): (b: string | any[]) => boolean;
	(a: string | any[]): (b: string | any[]) => boolean;
	(a: string | any[], b: string | any[]): boolean;
};
export declare const take: (argN: number) => (...args: any[]) => any;
export declare const weakEq: {
	(a: symbol, b: any): (a: any) => boolean;
	(a: any, b: symbol): (b: any) => boolean;
	(a: any): (b: any) => boolean;
	(a: any, b: any): boolean;
};
export declare const ifElse: (...args: AnyArgs) => any;
export declare const when: (...args: AnyArgs) => any;
type Composed<TIn extends any[], TOut> = (...xs: TIn) => TOut;
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
export declare const slice: (...args: AnyArgs) => any;
export declare const flip: <T extends AnyFunc>(fn: T) => {
	(a: symbol, b: Parameters<T>[0]): (a: Parameters<T>[1]) => any;
	(a: Parameters<T>[1], b: symbol): (b: Parameters<T>[0]) => any;
	(a: Parameters<T>[1]): (b: Parameters<T>[0]) => any;
	(a: Parameters<T>[1], b: Parameters<T>[0]): any;
};
/** @returns first element of an array. */
export declare const head: <T = any>(xs: T[] | string) => T;
/** @returns last element of an array. */
export declare const tail: any;
/** @param a @param b @returns a+b  */
export declare const add: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
/** @param a @param b @returns b-a  */
export declare const subtract: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
/**@param a @param b @returns a*b  */
export declare const multiply: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
/** @param a @param b @returns a<b  */
export declare const gt: {
	(a: symbol, b: number): (a: number) => boolean;
	(a: number, b: symbol): (b: number) => boolean;
	(a: number): (b: number) => boolean;
	(a: number, b: number): boolean;
};
/** @param a @param b @returns a>b  */
export declare const lt: {
	(a: symbol, b: number): (a: number) => boolean;
	(a: number, b: symbol): (b: number) => boolean;
	(a: number): (b: number) => boolean;
	(a: number, b: number): boolean;
};
/** @param a @param b @returns a<=b  */
export declare const gte: {
	(a: symbol, b: number): (a: number) => boolean;
	(a: number, b: symbol): (b: number) => boolean;
	(a: number): (b: number) => boolean;
	(a: number, b: number): boolean;
};
/** @param a @param b @returns a>=b  */
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
export declare const divide: {
	(a: symbol, b: number): (a: number) => number;
	(a: number, b: symbol): (b: number) => number;
	(a: number): (b: number) => number;
	(a: number, b: number): number;
};
export declare const always: <T = any>(s: T) => () => T;
export declare const identity: (s: any) => any;
export declare const trim: (s: string) => string;
export declare const last: (s: any[] | string) => any;
/** @param start string | any[] @param s string | any[] */
export declare const startsWith: {
	(a: symbol, b: string | any[]): (a: string | any[]) => boolean;
	(a: string | any[], b: symbol): (b: string | any[]) => boolean;
	(a: string | any[]): (b: string | any[]) => boolean;
	(a: string | any[], b: string | any[]): boolean;
};
type NotOverload = {
	(x: true): false;
	(x: false): true;
	(x: any): boolean;
};
export declare const not: NotOverload;
type IndexesOfArray<A> = Exclude<keyof A, keyof [
]>;
type KeysOverload = {
	<T extends any[]>(o: T): string[];
	<T extends readonly any[]>(o: T): IndexesOfArray<T>[];
	<T extends AnyObject>(o: T): (keyof T)[];
};
export declare const keys: KeysOverload;
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
export declare const prepend: {
	(a: symbol, b: any[]): (a: any) => any[];
	(a: any, b: symbol): (b: any[]) => any[];
	(a: any): (b: any[]) => any[];
	(a: any, b: any[]): any[];
};
export declare const flat: (xs: any[]) => any[];
export declare const flatShallow: (xs: any[]) => any[];
export declare const flatTo: {
	(a: symbol, b: any[]): (a: number) => any[];
	(a: number, b: symbol): (b: any[]) => any[];
	(a: number): (b: any[]) => any[];
	(a: number, b: any[]): any[];
};
export declare const split: {
	(a: symbol, b: string): (a: string | RegExp) => string[];
	(a: string | RegExp, b: symbol): (b: string) => string[];
	(a: string | RegExp): (b: string) => string[];
	(a: string | RegExp, b: string): string[];
};
export declare const T: (...args: any[]) => true;
export declare const F: (...args: any[]) => false;
export declare const callWith: {
	(a: symbol, b: AnyFunc): (a: any[]) => any;
	(a: any[], b: symbol): (b: AnyFunc) => any;
	(a: any[]): (b: AnyFunc) => any;
	(a: any[], b: AnyFunc): any;
};
export declare const noop: (...args: any[]) => any;
/** Calls a func from object.
 * @param {any[]} [args] - arguments for the function.
 * @param {string} [fnName] - property name of the function.
 * @param {AnyObject} [o] - the object with the function. */
export declare const callFrom: (...args: AnyArgs) => any;
export declare const complement: (fn: AnyFunc) => (...args: any) => boolean | any;
export declare const sizeof: (s: any[] | string | AnyObject) => number;
export declare const range: {
	(a: symbol, b: number): (a: number) => any[];
	(a: number, b: symbol): (b: number) => any[];
	(a: number): (b: number) => any[];
	(a: number, b: number): any[];
};
/** @param xs any[] @returns xs without duplicates.  */
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
export declare const once: <Func extends AnyFunc>(fn: Func) => (...args: Parameters<Func>) => any;
export declare const reverse: (xs: any[]) => any;
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
/** Assigns a prop to an object.
 * @param prop string
 * @param value any
 * @param object AnyObject
 */
export declare const assoc: (...args: AnyArgs) => any;
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
/** @param key string @param o AnyObject @returns o[key] */
export declare const prop: {
	(a: symbol, b: AnyObject): (a: string) => any;
	(a: string, b: symbol): (b: AnyObject) => any;
	(a: string): (b: AnyObject) => any;
	(a: string, b: AnyObject): any;
};
/** @param key string @param value any @param o AnyObject @returns o[key] equals value */
export declare const propEq: (...args: AnyArgs) => any;
/** @param key string @param o1 AnyObject @param o2 AnyObject @returns o₁[key] equals o₂[key] */
export declare const propsEq: (...args: AnyArgs) => any;
export declare const pathOr: any;
export declare const path: any;
export declare const pathEq: (...args: AnyArgs) => any;
export declare const pathsEq: (...args: AnyArgs) => any;
export declare const pathExists: Composed<any[], any>;
export declare const clone: (s: any, shallow?: boolean) => any;
export declare const cloneShallow: (s: any) => any;
export declare const freeze: <T extends AnyObject>(o: T) => Readonly<T>;
export declare const freezeShallow: <T extends AnyObject>(o: T) => Readonly<T>;
/** types T1, T2
 *  @param reducer (accum: T1, current: T2, index: number) => newAccum: T1
 *  @param accum T1
 *  @param array T2[]
*/
export declare const reduce: (...args: AnyArgs) => any;
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
][]) => {
	[k: string]: any;
};
export declare const concat: {
	(a: symbol, b: string | any[]): (a: string | any[]) => string | any[];
	(a: string | any[], b: symbol): (b: string | any[]) => string | any[];
	(a: string | any[]): (b: string | any[]) => string | any[];
	(a: string | any[], b: string | any[]): string | any[];
};
export declare const map: {
	(a: symbol, b: any[]): (a: (s: any, i?: number, list?: any[]) => any) => any[];
	(a: (s: any, i?: number, list?: any[]) => any, b: symbol): (b: any[]) => any[];
	(a: (s: any, i?: number, list?: any[]) => any): (b: any[]) => any[];
	(a: (s: any, i?: number, list?: any[]) => any, b: any[]): any[];
};
export declare const mapObj: {
	(a: symbol, b: AnyObject): (a: (s: any, i?: string, list?: any[]) => any) => (b: AnyObject) => (a: (s: any, i?: number | undefined, list?: any[] | undefined) => any) => any[];
	(a: (s: any, i?: string, list?: any[]) => any, b: symbol): (b: AnyObject) => (b: AnyObject) => (a: (s: any, i?: number | undefined, list?: any[] | undefined) => any) => any[];
	(a: (s: any, i?: string, list?: any[]) => any): (b: AnyObject) => (b: AnyObject) => (a: (s: any, i?: number | undefined, list?: any[] | undefined) => any) => any[];
	(a: (s: any, i?: string, list?: any[]) => any, b: AnyObject): (b: AnyObject) => (a: (s: any, i?: number | undefined, list?: any[] | undefined) => any) => any[];
};
export declare const join: {
	(a: symbol, b: string[]): (a: string) => string;
	(a: string, b: symbol): (b: string[]) => string;
	(a: string): (b: string[]) => string;
	(a: string, b: string[]): string;
};
export declare const forEach: {
	(a: symbol, b: any[]): (a: (s: any) => any) => void;
	(a: (s: any) => any, b: symbol): (b: any[]) => void;
	(a: (s: any) => any): (b: any[]) => void;
	(a: (s: any) => any, b: any[]): void;
};
export declare const both: (...args: AnyArgs) => any;
export declare const isEmpty: (s: any) => boolean | null;
export declare const empty: (s: any) => {} | undefined;
export declare const replace: (...args: AnyArgs) => any;
export declare const filter: {
	(a: symbol, b: any[] | AnyObject): (a: (v: any, k: string | number) => boolean) => any;
	(a: (v: any, k: string | number) => boolean, b: symbol): (b: any[] | AnyObject) => any;
	(a: (v: any, k: string | number) => boolean): (b: any[] | AnyObject) => any;
	(a: (v: any, k: string | number) => boolean, b: any[] | AnyObject): any;
};
export declare const memoize: (fn: Function) => () => any;
export declare const mergeShallow: {
	(a: symbol, b: AnyObject): (a: AnyObject) => AnyObject;
	(a: AnyObject, b: symbol): (b: AnyObject) => AnyObject;
	(a: AnyObject): (b: AnyObject) => AnyObject;
	(a: AnyObject, b: AnyObject): AnyObject;
};
export declare const mergeDeep: {
	(a: symbol, b: AnyObject): (a: AnyObject) => AnyObject;
	(a: AnyObject, b: symbol): (b: AnyObject) => AnyObject;
	(a: AnyObject): (b: AnyObject) => AnyObject;
	(a: AnyObject, b: AnyObject): AnyObject;
};
export declare const mergeDeepX: {
	(a: symbol, b: AnyObject): (a: AnyObject) => AnyObject;
	(a: AnyObject, b: symbol): (b: AnyObject) => AnyObject;
	(a: AnyObject): (b: AnyObject) => AnyObject;
	(a: AnyObject, b: AnyObject): AnyObject;
};
export declare const mergeDeepAdd: {
	(a: symbol, b: AnyObject): (a: AnyObject) => AnyObject;
	(a: AnyObject, b: symbol): (b: AnyObject) => AnyObject;
	(a: AnyObject): (b: AnyObject) => AnyObject;
	(a: AnyObject, b: AnyObject): AnyObject;
};
export declare const overProp: (...args: AnyArgs) => any;
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export declare const mapKeys: {
	(a: symbol, b: AnyObject): (a: {
		[oldKey: string]: string | AnyFunc;
	}) => AnyObject;
	(a: {
		[oldKey: string]: string | AnyFunc;
	}, b: symbol): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string | AnyFunc;
	}): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string | AnyFunc;
	}, b: AnyObject): AnyObject;
};
export declare const zip: {
	(a: symbol, b: unknown[]): (a: unknown[]) => any[];
	(a: unknown[], b: symbol): (b: unknown[]) => any[];
	(a: unknown[]): (b: unknown[]) => any[];
	(a: unknown[], b: unknown[]): any[];
};
export declare const zipObj: {
	(a: symbol, b: unknown[]): (a: unknown[]) => any;
	(a: unknown[], b: symbol): (b: unknown[]) => any;
	(a: unknown[]): (b: unknown[]) => any;
	(a: unknown[], b: unknown[]): any;
};
/** zips through a pipe. Types T1, T2, T3.
 * @returns T3[]
 * @param pipe (T1, T2) => T3
 * @param a T1[]
 * @param b T2[]
 */
export declare const zipWith: (...args: AnyArgs) => any;
export declare const mirror: (s: any) => any;
export declare const reflect: (s: any) => any;
export declare const echo: (s: any) => any;
export declare const notf: (fn: AnyFunc) => (...args: any) => boolean | any;
export declare const push: {
	(a: symbol, b: any[]): (a: any) => any[];
	(a: any, b: symbol): (b: any[]) => any[];
	(a: any): (b: any[]) => any[];
	(a: any, b: any[]): any[];
};
export declare const some: {
	(a: symbol, b: any[]): (a: Cond) => boolean;
	(a: Cond, b: symbol): (b: any[]) => boolean;
	(a: Cond): (b: any[]) => boolean;
	(a: Cond, b: any[]): boolean;
};
export declare const qappend: {
	(a: symbol, b: any[]): (a: any) => any[];
	(a: any, b: symbol): (b: any[]) => any[];
	(a: any): (b: any[]) => any[];
	(a: any, b: any[]): any[];
};
export declare const qassoc: (...args: AnyArgs) => any;
export declare const qreduce: (...args: AnyArgs) => any;
export declare const qmergeDeep: any;
export declare const qmergeDeepX: any;
export declare const qmergeDeepAdd: any;
export declare const qmergeShallow: {
	(a: symbol, b: AnyObject): (a: AnyObject) => AnyObject;
	(a: AnyObject, b: symbol): (b: AnyObject) => AnyObject;
	(a: AnyObject): (b: AnyObject) => AnyObject;
	(a: AnyObject, b: AnyObject): AnyObject;
};
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export declare const qmapKeys: {
	(a: symbol, b: AnyObject): (a: {
		[oldKey: string]: string | AnyFunc;
	}) => AnyObject;
	(a: {
		[oldKey: string]: string | AnyFunc;
	}, b: symbol): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string | AnyFunc;
	}): (b: AnyObject) => AnyObject;
	(a: {
		[oldKey: string]: string | AnyFunc;
	}, b: AnyObject): AnyObject;
};
export declare const qmap: {
	(a: symbol, b: any[]): (a: (s: any, i?: number, list?: any[]) => any) => any[];
	(a: (s: any, i?: number, list?: any[]) => any, b: symbol): (b: any[]) => any[];
	(a: (s: any, i?: number, list?: any[]) => any): (b: any[]) => any[];
	(a: (s: any, i?: number, list?: any[]) => any, b: any[]): any[];
};
export declare const qmapObj: {
	(a: symbol, b: AnyObject): (a: (s: any, k?: string, list?: any[]) => any) => (a: (s: any, i?: number, list?: any[]) => any) => any[];
	(a: (s: any, k?: string, list?: any[]) => any, b: symbol): (b: AnyObject) => (a: (s: any, i?: number, list?: any[]) => any) => any[];
	(a: (s: any, k?: string, list?: any[]) => any): (b: AnyObject) => (a: (s: any, i?: number, list?: any[]) => any) => any[];
	(a: (s: any, k?: string, list?: any[]) => any, b: AnyObject): (a: (s: any, i?: number, list?: any[]) => any) => any[];
};
export declare const qfilter: {
	(a: symbol, b: any[] | AnyObject): (a: (v: any, k: string | number) => boolean) => any[] | AnyObject;
	(a: (v: any, k: string | number) => boolean, b: symbol): (b: any[] | AnyObject) => any[] | AnyObject;
	(a: (v: any, k: string | number) => boolean): (b: any[] | AnyObject) => any[] | AnyObject;
	(a: (v: any, k: string | number) => boolean, b: any[] | AnyObject): any[] | AnyObject;
};
export declare const qempty: (o: AnyObject | any[]) => any[] | AnyObject;
export declare const qfreeze: <T extends AnyObject>(o: T) => Readonly<T>;
export declare const qfreezeShallow: <T extends AnyObject>(o: T) => Readonly<T>;
export declare const qprepend: {
	(a: symbol, b: any[]): (a: any) => number;
	(a: any, b: symbol): (b: any[]) => number;
	(a: any): (b: any[]) => number;
	(a: any, b: any[]): number;
};
export declare const qassocPath: any;
export declare const qreverse: (arr: any[]) => any[];
export declare const qomit: {
	(a: symbol, b: AnyObject): (a: string[]) => any[] | AnyObject;
	(a: string[], b: symbol): (b: AnyObject) => any[] | AnyObject;
	(a: string[]): (b: AnyObject) => any[] | AnyObject;
	(a: string[], b: AnyObject): any[] | AnyObject;
};
/** @param start string | any[] @param s string | any[] */
export declare const qstartsWith: {
	(a: symbol, b: string | any[]): (a: string | any[]) => boolean;
	(a: string | any[], b: symbol): (b: string | any[]) => boolean;
	(a: string | any[]): (b: string | any[]) => boolean;
	(a: string | any[], b: string | any[]): boolean;
};
type StrTmpl = ((data: AnyObject) => string);
/** Supports ecrans: '\\{"json": {yes} \\}'
  @returns get_tmpl(one{meme}two)({meme: 42}) -> one42two */
export declare const getTmpl: (tmpl: string) => StrTmpl;
/** One promise waits for another. */
export declare const forEachSerial: {
	(a: symbol, b: any[]): (a: AnyFunc) => Promise<void>;
	(a: AnyFunc, b: symbol): (b: any[]) => Promise<void>;
	(a: AnyFunc): (b: any[]) => Promise<void>;
	(a: AnyFunc, b: any[]): Promise<void>;
};
/** Promise.all wrapper for functional pipelining. */
export declare const waitAll: (promises: Promise<any>[]) => Promise<any[]>;
/** Waits for a Promise that been generated by the first arg, then returns an untoched value. Types T.
 * @param {AnyFunc<Promise>} fn - function to wait.
 * @param {T} s - any value to tap and return back
 * @returns {T}
 */
export declare const waitTap: {
	(a: symbol, b: any): (a: AnyFunc) => Promise<any>;
	(a: AnyFunc, b: symbol): (b: any) => Promise<any>;
	(a: AnyFunc): (b: any) => Promise<any>;
	(a: AnyFunc, b: any): Promise<any>;
};
/** Waits for all promises mapped by the fn. */
export declare const forEachAsync: {
	(a: symbol, b: any[]): (a: (item: any) => Promise<any>) => Promise<any[]>;
	(a: (item: any) => Promise<any>, b: symbol): (b: any[]) => Promise<any[]>;
	(a: (item: any) => Promise<any>): (b: any[]) => Promise<any[]>;
	(a: (item: any) => Promise<any>, b: any[]): Promise<any[]>;
};
/** The same as compose, but waits for promises in chains and returns a Promise.  */
export declare const composeAsync: <T = any>(...fns: AnyFunc[]) => (...input: any[]) => Promise<T>;

export {
	length$1 as length,
};

export {};
