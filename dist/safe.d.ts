import { AnyFunc, AnyObject, Composed, IndexesOfArray } from './types/base.js';
import type { T_all, T_allPass, T_any, T_anyPass, T_append, T_assoc, T_assocPath, T_bind, T_both, T_callWith, T_concat, T_cond, T_diff, T_filter, T_find, T_findIndex, T_flatTo, T_forEach, T_genBy, T_indexOf, T_intersection, T_join, T_map, T_mapKeys, T_mapObj, T_memoize, T_mergeDeep, T_mergeDeepAdd, T_mergeDeepX, T_mergeShallow, T_nth, T_omit, T_overProp, T_pathEq, T_pathOr, T_pathsEq, T_pick, T_pickBy, T_prepend, T_prop, T_propEq, T_propsEq, T_range, T_reduce, T_replace, T_slice, T_sort, T_split, T_tap, T_test, T_uniqWith, T_zip, T_zipObj, T_zipWith } from './types/safe.js';
import { Split } from './types/string.js';
/** Returns a function that takes N arguments and returns the argN-th one (0-indexed).
 * @param argN Index of the argument to return.
 * @returns A function that returns its argN-th argument. */
export declare const take: (argN: number) => (...args: any[]) => any;
/** Conditional branching. If cond(s) is true, calls pipeYes(s), otherwise pipeNo(s).
 * @param cond Predicate function.
 * @param pipeYes Function to call when cond is true.
 * @param pipeNo Function to call when cond is false.
 * @param s Value to test and pass to the chosen branch. */
export declare const ifElse: (...args: import("../types.js").AnyArgs) => any;
/** Like ifElse but always passes through identity for the false branch.
 * @param cond Predicate function.
 * @param pipe Function to call when cond is true.
 * @param s Value to test and potentially transform. */
export declare const when: (...args: import("../types.js").AnyArgs) => any;
/** Right-to-left function composition. Last function receives all args, each subsequent
 * function receives the return value of the previous. Use __ placeholder to call a function with no args.
 * @param fns Functions to compose, right-to-left.
 * @returns A composed function. */
export declare const compose: <TIn extends any[] = any[], TOut = any>(...fns: AnyFunc[]) => Composed<TIn, TOut>;
/** @param fn AnyFunc @param context any */
export declare const bind: T_bind;
/** Returns the element at index i of an array or the char at index i of a string.
 * @param i Index to access.
 * @param data Array or string to index into. */
export declare const nth: T_nth;
/** Returns a shallow copy of a portion of an array or string.
 * @param from Start index (inclusive).
 * @param to End index (exclusive). If not a number, slices to the end.
 * @param o Array or string to slice. */
export declare const slice: T_slice;
/** Reverses the argument order of a binary function. Not curried.
 * @param fn Binary function to flip.
 * @returns A curried function that calls fn(a, b) when given (b, a). */
export declare const flip: <T extends AnyFunc>(fn: T) => {
    (a: import("./curry.js").Placeholder, b: Parameters<T>[0]): (a: Parameters<T>[1]) => any;
    (a: Parameters<T>[1], b: import("./curry.js").Placeholder): (b: Parameters<T>[0]) => any;
    (a: Parameters<T>[1]): (b: Parameters<T>[0]) => any;
    (a: Parameters<T>[1], b: Parameters<T>[0]): any;
};
type FirstChar<T extends string> = T extends `${infer First}${string}` ? Split<T>['length'] extends 1 ? T : FirstChar<First> : T;
type HeadOverload = {
    <T extends string>(s: T): FirstChar<T>;
    <T extends readonly any[]>(s: T): T extends Array<0> ? undefined : T extends readonly [infer U, ...any[]] ? U : T extends (infer Y)[] ? Y : any;
    <T extends any>(s: T[]): null;
};
/** @returns first element of an array or a string. */
export declare const head: HeadOverload;
type Tail<T extends string> = T extends `${string}${infer Tail}` ? Tail : T extends '' ? '' : string;
type TailOverload = {
    <T extends string>(s: T): Tail<T>;
    <T extends readonly any[]>(s: T): T extends Array<0> ? [] : T extends readonly [any, ...infer U] ? U : T;
    <T extends any>(s: T[]): null;
};
/** @returns all elements of an array or a string after first one. */
export declare const tail: TailOverload;
type LastChar<T extends string> = T extends `${string}${infer Rest}` ? (Split<T>['length'] extends 1 ? T : LastChar<Rest>) : T;
type LastOverload = {
    <T extends string>(s: T): LastChar<T>;
    <T extends readonly any[]>(s: T): T extends Array<0> ? undefined : T extends readonly [...any[], infer U] ? U : T extends (infer Y)[] ? Y : any;
    <T extends any>(s: T[]): null;
};
/** Returns last element of an array, readonly array or a string.
 * @param s Array to extract that element.
 * @returns undefined if s is empty or last element. */
export declare const last: LastOverload;
/** @param a @param b @returns a+b  */
export declare const add: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => number;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => number;
    (a: number): (b: number) => number;
    (a: number, b: number): number;
};
/** @param a @param b @returns b-a  */
export declare const subtract: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => number;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => number;
    (a: number): (b: number) => number;
    (a: number, b: number): number;
};
/**@param a @param b @returns a×b  */
export declare const multiply: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => number;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => number;
    (a: number): (b: number) => number;
    (a: number, b: number): number;
};
/** @param a @param b @returns a<b  */
export declare const gt: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => boolean;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => boolean;
    (a: number): (b: number) => boolean;
    (a: number, b: number): boolean;
};
/** @param a @param b @returns a>b  */
export declare const lt: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => boolean;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => boolean;
    (a: number): (b: number) => boolean;
    (a: number, b: number): boolean;
};
/** @param a @param b @returns a≤b  */
export declare const gte: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => boolean;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => boolean;
    (a: number): (b: number) => boolean;
    (a: number, b: number): boolean;
};
/** @param a @param b @returns a≥b  */
export declare const lte: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => boolean;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => boolean;
    (a: number): (b: number) => boolean;
    (a: number, b: number): boolean;
};
/** Returns a new sorted array (does not mutate the original).
 * @param sortFn Comparator function (a, b) => number.
 * @param xs Array to sort. */
export declare const sort: T_sort;
/** Returns the first element that satisfies the predicate, or undefined.
 * @param fn Predicate function (value, index) => boolean.
 * @param s Array to search. */
export declare const find: T_find;
/** Returns the index of the first element that satisfies the predicate, or -1.
 * @param fn Predicate function (value, index) => boolean.
 * @param s Array to search. */
export declare const findIndex: T_findIndex;
/** Returns the index of the first element deeply equal to x, or -1.
 * @param x Value to find.
 * @param xs Array to search. */
export declare const indexOf: T_indexOf;
/** Division with reversed params: returns b / a (curried).
 * @param a Divisor.
 * @param b Dividend. */
export declare const divide: {
    (a: import("./curry.js").Placeholder, b: number): (a: number) => number;
    (a: number, b: import("./curry.js").Placeholder): (b: number) => number;
    (a: number): (b: number) => number;
    (a: number, b: number): number;
};
type T_not = {
    (x: true): false;
    (x: false): true;
    (x: any): boolean;
};
/** Logical negation.
 * @param x Value to negate. */
export declare const not: T_not;
type T_keys = {
    <T extends readonly any[]>(o: T): IndexesOfArray<T>[];
    <T extends any[]>(o: T): string[];
    <T extends AnyObject>(o: T): (keyof T)[];
};
/** Returns the keys of an object or array.
 * @param o Object or array to get keys from. */
export declare const keys: T_keys;
/** Returns the values of an object or array.
 * @param o Object or array to get values from. */
export declare const values: (o: AnyObject | any[]) => any[];
/** Returns the entries of an object or array as [key, value] pairs.
 * @param o Object or array to get entries from. */
export declare const toPairs: (o: AnyObject | any[]) => [string, any][];
/** Tests if a string matches a regex.
 * @param re RegExp to test with.
 * @param s String to test. */
export declare const test: T_test;
/** Calls fn(x) for its side effect, then returns x unchanged.
 * @param fn Side-effect function.
 * @param x Value to pass to fn and return. */
export declare const tap: T_tap;
/** Returns a new array with x appended to the end.
 * @param x Element to append.
 * @param xs Source array. */
export declare const append: T_append;
/** Returns a new array with x prepended to the start.
 * @param x Element to prepend.
 * @param xs Source array. */
export declare const prepend: T_prepend;
/** Flattens an array recursively (all levels).
 * @param xs Array to flatten. */
export declare const flat: (xs: any[]) => any[];
/** Flattens an array one level deep.
 * @param xs Array to flatten. */
export declare const flatShallow: (xs: any[]) => any[];
/** Flattens an array to the specified depth.
 * @param depth Maximum depth to flatten.
 * @param xs Array to flatten. */
export declare const flatTo: T_flatTo;
/** Splits a string by a separator or regex.
 * @param s Separator or RegExp.
 * @param xs String to split. */
export declare const split: T_split;
/** Always returns true, ignoring all arguments. */
export declare const T: (...args: any[]) => true;
/** Always returns false, ignoring all arguments. */
export declare const F: (...args: any[]) => false;
/** Calls fn with the given arguments array spread as individual args.
 * @param args Arguments to pass to fn.
 * @param fn Function to call. */
export declare const callWith: T_callWith;
/** A no-op function that accepts any arguments and returns undefined. */
export declare const noop: (...args: any[]) => any;
/** Calls a func from object.
 * @param {any[]} args - arguments for the function.
 * @param {string} fnName - property name of the function.
 * @param {AnyObject} o - the object with the function. */
export declare const callFrom: (...args: import("../types.js").AnyArgs) => any;
type T_complement<F extends AnyFunc> = {
    (...args: Parameters<F>): ReturnType<F> extends AnyFunc ? T_complement<ReturnType<F>> : boolean;
};
/** Returns a function that logically negates the result of fn. If fn is curried
 * and still has args left, returns a complemented curried function.
 * @param fn Function to complement.
 * @returns A function that returns the negation of fn's result. */
export declare const complement: <F extends AnyFunc>(fn: F) => T_complement<F>;
/** Returns the size of an array, string, or object (number of keys).
 * @param s Array, string, or object to measure. */
export declare const sizeof: (s: any[] | string | AnyObject) => number;
/** Generates an array of integers from `from` to `to` (exclusive).
 * @param from Start value (inclusive).
 * @param to End value (exclusive). */
export declare const range: T_range;
/** @param cond (x, y): bool @param xs any[] @returns xs without duplicates, using cond as a comparator.  */
export declare const uniqWith: T_uniqWith;
/** @param xs any[] @returns xs without duplicates.  */
export declare const uniq: (xs: any[]) => any[];
/** Returns elements of xs1 that also exist in xs2.
 * @param xs1 Source array.
 * @param xs2 Array to filter against. */
export declare const intersection: T_intersection;
/** Returns the symmetric difference of two arrays (elements in one but not both).
 * @param _xs1 First array.
 * @param _xs2 Second array. */
export declare const diff: T_diff;
/** Generates an array by calling generator(i) for each index 0..length-1.
 * @param generator Function that produces the value at each index.
 * @param length Number of elements to generate. */
export declare const genBy: T_genBy;
/** Wraps fn so it only runs once; subsequent calls return the cached result.
 * @param fn Function to wrap. */
export declare const once: <Func extends AnyFunc>(fn: Func) => (...args: Parameters<Func>) => ReturnType<Func>;
/** Returns a new array with elements in reverse order (does not mutate).
 * @param xs Array to reverse. */
export declare const reverse: <T extends any>(xs: T[]) => T[];
/** Logs a value with a caption, then returns it. Useful for debugging in compose chains.
 * @param caption Label for the console output.
 * @param level Console method to use (default 'log'). */
export declare const explore: (caption: string, level?: string) => {
    <T>(x: T): T;
    (): undefined;
};
/** Evaluates pairs of [predicate, fn] in order and returns the result of the first matching fn.
 * @param pairs Array of [predicate, fn] pairs.
 * @param s Value to test against predicates. */
export declare const cond: T_cond;
/** Assigns a prop to an object.
 * @param prop string
 * @param value any
 * @param object AnyObject
 */
export declare const assoc: T_assoc;
/** Like assoc but for a nested path. Returns a new object with the path set to v.
 * @param _path Array of keys forming the path.
 * @param v Value to set.
 * @param o Source object. */
export declare const assocPath: T_assocPath;
/** Returns true if all elements satisfy the predicate.
 * @param pred Predicate function.
 * @param xs Array to test. */
export declare const all: T_all;
/** Returns true if any element satisfies the predicate.
 * @param pred Predicate function.
 * @param xs Array to test. */
export declare const any: T_any;
/** Returns true if x satisfies all predicates.
 * @param preds Array of predicate functions.
 * @param x Value to test. */
export declare const allPass: T_allPass;
/** Returns true if x satisfies any predicate.
 * @param preds Array of predicate functions.
 * @param x Value to test. */
export declare const anyPass: T_anyPass;
/** @param start string | any[] @param s string | any[] @description detects if `s` starts with `start` */
export declare const startsWith: {
    (a: import("./curry.js").Placeholder, b: string | any[]): (a: string | any[]) => boolean;
    (a: string | any[], b: import("./curry.js").Placeholder): (b: string | any[]) => boolean;
    (a: string | any[]): (b: string | any[]) => boolean;
    (a: string | any[], b: string | any[]): boolean;
};
/** @param start string | any[] @param s string | any[] @description detects if `s` starts with `start` */
export declare const startsWithShallow: {
    (a: import("./curry.js").Placeholder, b: string | any[]): (a: string | any[]) => boolean;
    (a: string | any[], b: import("./curry.js").Placeholder): (b: string | any[]) => boolean;
    (a: string | any[]): (b: string | any[]) => boolean;
    (a: string | any[], b: string | any[]): boolean;
};
/** @param key string @param o AnyObject @returns o[key] */
export declare const prop: T_prop;
/** @param key string @param value any @param o AnyObject @returns boolean o[key] equals value */
export declare const propEq: T_propEq;
/** @param key string @param o1 AnyObject @param o2 AnyObject @returns o₁[key] equals o₂[key] */
export declare const propsEq: T_propsEq;
/** Gets a value at a nested path, returning a default if any key is missing.
 * @param _default Default value if path doesn't exist.
 * @param _path Array of keys forming the path.
 * @param o Source object. */
export declare const pathOr: T_pathOr;
/** Gets a value at a nested path, or undefined if any key is missing.
 * @param _path Array of keys forming the path.
 * @param o Source object. */
export declare const path: {
    (_path: (string | number)[]): (o: AnyObject) => any;
    (_path: (string | number)[], o: AnyObject): any;
};
/** Returns true if the value at path equals value.
 * @param _path Array of keys forming the path.
 * @param value Value to compare against.
 * @param o Source object. */
export declare const pathEq: T_pathEq;
/** Returns true if the values at the same path in two objects are equal.
 * @param _path Array of keys forming the path.
 * @param o1 First object.
 * @param o2 Second object. */
export declare const pathsEq: T_pathsEq;
/** Returns true if the path exists in the object (is not the sentinel symbol).
 * @param _path Array of keys forming the path.
 * @param o Source object. */
export declare const pathExists: {
    (p: (string | number)[]): (o: AnyObject) => boolean;
    (p: (string | number)[], o: AnyObject): boolean;
};
/** Deep-clones a value (arrays, objects, typed arrays). Primitives are returned as-is.
 * @param s Value to clone.
 * @param shallow If true, only clones one level deep (default false). */
export declare const clone: <T extends any>(s: T, shallow?: boolean) => T;
/** Shallow-clone alias for clone(s, true).
 * @param s Value to shallow-clone. */
export declare const cloneShallow: (s: any) => any;
/** Deep-clones and then deep-freezes an object.
 * @param o Object to clone and freeze. */
export declare const freeze: <T extends AnyObject>(o: T) => Readonly<T>;
/** Shallow-clones and then shallow-freezes an object.
 * @param o Object to clone and freeze. */
export declare const freezeShallow: <T extends AnyObject>(o: T) => Readonly<T>;
/** types T1, T2
 *  @param reducer (accum: T1, current: T2, index: number) => newAccum: T1
 *  @param accum T1
 *  @param array T2[]
*/
export declare const reduce: T_reduce;
/**
 *  @param props (string|number)[]
 *  @param o AnyObject
 *  @returns AnyObject
*/
export declare const pick: T_pick;
/** Picks properties from an object where cond(key) is true.
 * @param cond Predicate function (key) => boolean.
 * @param o Source object. */
export declare const pickBy: T_pickBy;
/** Returns a new object with the listed properties removed.
 * @param props Property names to omit.
 * @param o Source object. */
export declare const omit: T_omit;
/** Builds an object from an array of [key, value] pairs.
 * @param pairs Array of [key, value] entries. */
export declare const fromPairs: (pairs: [string, any][]) => {
    [k: string]: any;
};
/** Concatenates two strings or arrays (reversed order: b.concat(a)).
 * @param a Value to append.
 * @param b String or array to append to. */
export declare const concat: T_concat;
/** Maps a function over an array, returning a new array.
 * @param pipe Function (value, index, array) => new_value.
 * @param arr Array to map over. */
export declare const map: T_map;
/** Maps a function over an object's values, returning a new object with the same keys.
 * @param pipe Function (value, key, object) => new_value.
 * @param o Source object. */
export declare const mapObj: T_mapObj;
/** Joins array elements into a string with a delimiter.
 * @param delimeter Separator string.
 * @param arr Array-like with a join method. */
export declare const join: T_join;
/** Iterates arr with pipe via Array.forEach (curried).
 * @param pipe Callback: (value, index, array) => void.
 * @param arr Source array.
 */
export declare const forEach: T_forEach;
/** Returns true if both predicates return true for s (short-circuit AND).
 * @param cond1 First predicate.
 * @param cond2 Second predicate.
 * @param s Value to test. */
export declare const both: T_both;
/** Returns true if the value is empty (empty string, array, or object).
 * @param s Value to check. */
export declare const isEmpty: (s: any) => boolean | null;
/** Returns an empty value of the same type as s (string → '', array → [], object → {}).
 * @param s Value whose type determines the empty result. */
export declare const empty: (s: any) => {} | undefined;
/** Replaces matches of a pattern in a string.
 * @param a Pattern to match (string or RegExp).
 * @param b Replacement string or function.
 * @param where Source string. */
export declare const replace: T_replace;
/** Filters an array or object, keeping elements/entries where cond is true.
 * @param cond Predicate function (value, key) => boolean.
 * @param data Array or object to filter. */
export declare const filter: T_filter;
/** Saves result of a function with given key and avoids calling it again.
 * @param {(...args: Args) string} keyGen that takes the same args and returns a key for the cache.
 * @param {(...args: Args) any} fn to be cached.
*/
export declare const memoize: T_memoize;
/** Shallow-merges two objects into a new object.
 * @param o1 First object.
 * @param o2 Second object (overrides o1). */
export declare const mergeShallow: T_mergeShallow;
/** Deep-merges two objects (non-destructive, clones o1 first).
 * @param a First object (cloned).
 * @param b Second object (merged into a, overrides). */
export declare const mergeDeep: T_mergeDeep;
/** Deep-merges two objects with extra depth level (non-destructive).
 * @param a First object (cloned).
 * @param b Second object. */
export declare const mergeDeepX: T_mergeDeepX;
/** Deep-merges two objects with additive depth (non-destructive).
 * @param a First object (cloned).
 * @param b Second object. */
export declare const mergeDeepAdd: T_mergeDeepAdd;
/**
 * @param prop string
 * @param pipe(data[prop])
 * @param data any
 * @returns data with prop over pipe.
*/
export declare const overProp: T_overProp;
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export declare const mapKeys: T_mapKeys;
/** Zips two arrays into pairs: [[a[0], b[0]], [a[1], b[1]], ...].
 * @param a First array.
 * @param b Second array. */
export declare const zip: T_zip;
/** Zips two arrays into an object: {a[0]: b[0], a[1]: b[1], ...}.
 * @param a Array of keys.
 * @param b Array of values. */
export declare const zipObj: T_zipObj;
/** zips through a pipe. Types T1, T2, T3.
 * @returns T3[]
 * @param pipe (T1, T2) => T3
 * @param a T1[]
 * @param b T2[]
 */
export declare const zipWith: T_zipWith;
/** Alias of identity. Returns the argument unchanged. */
export declare const mirror: <T extends unknown>(s: T) => T;
/** Alias of identity. Returns the argument unchanged. */
export declare const reflect: <T extends unknown>(s: T) => T;
/** Alias of identity. Returns the argument unchanged. */
export declare const echo: <T extends unknown>(s: T) => T;
/** Alias of complement. Returns a negated version of the predicate.
 * @param fn Predicate function to negate.
 */
export declare const notf: <F extends AnyFunc>(fn: F) => T_complement<F>;
/** Alias of append. Appends an element to the end of an array (curried).
 * @param x Element to append.
 * @param xs Target array.
 */
export declare const push: T_append;
/** Alias of any. Returns true if any element satisfies the predicate (curried).
 * @param pred Predicate function.
 * @param xs Array to check.
 */
export declare const some: T_any;
/** Alias of eq. Reference equality check (curried).
 * @param a First value.
 * @param b Second value.
 */
export declare const weakEq: import("../types.js").T_eq;
/** Alias of uniqWith. Removes duplicates using a comparator (curried).
 * @param cond Comparator: (x, y) => boolean.
 * @param xs Source array.
 */
export declare const uniqBy: T_uniqWith;
/** Alias of overProp. Maps a function over a property and returns a new object (curried).
 * @param key Property name.
 * @param fn Transform function.
 * @param o Source object.
 */
export declare const propLens: T_overProp;
export {};
