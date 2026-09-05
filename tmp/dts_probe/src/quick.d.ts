import type { T_qappend, T_qassoc, T_qassocPath, T_qfilter, T_qmap, T_qmapKeys, T_qmapObj, T_qmergeShallow, T_qomit, T_qoverProp, T_qpick, T_qprepend, T_qreduce, T_qslice, T_qsort, T_quniqWith } from '../types/quick';
import { AnyObject } from './types';
/** Mutates xs by pushing s to the end. Returns xs (curried).
 * @param s Element to append.
 * @param xs Target array (mutated in-place).
 */
export declare const qappend: T_qappend;
/** Mutates obj by setting prop to v. Returns obj (curried).
 * @param prop Property name.
 * @param v Value to set.
 * @param obj Target object (mutated in-place).
 */
export declare const qassoc: T_qassoc;
/** Reduces arr with fn and accum (curried).
 * @param fn Reducer: (accum, value, index?) => new_accum.
 * @param accum Initial accumulator.
 * @param arr Source array.
 */
export declare const qreduce: T_qreduce;
/** Deep-merge o2 into o1 with array replace strategy (mutates o1) (curried).
 * @param o1 Target object (mutated in-place).
 * @param o2 Source object to merge from.
 */
export declare const qmergeDeep: {
    (a: import("./curry").Placeholder, b: AnyObject): (a: AnyObject) => AnyObject;
    (a: AnyObject, b: import("./curry").Placeholder): (b: AnyObject) => AnyObject;
    (a: AnyObject): (b: AnyObject) => AnyObject;
    (a: AnyObject, b: AnyObject): AnyObject;
};
/** Deep-merge o2 into o1 with array merge strategy (mutates o1) (curried).
 * @param o1 Target object (mutated in-place).
 * @param o2 Source object to merge from.
 */
export declare const qmergeDeepX: {
    (a: import("./curry").Placeholder, b: AnyObject): (a: AnyObject) => AnyObject;
    (a: AnyObject, b: import("./curry").Placeholder): (b: AnyObject) => AnyObject;
    (a: AnyObject): (b: AnyObject) => AnyObject;
    (a: AnyObject, b: AnyObject): AnyObject;
};
/** Deep-merge o2 into o1 with array push strategy (mutates o1) (curried).
 * @param o1 Target object (mutated in-place).
 * @param o2 Source object to merge from.
 */
export declare const qmergeDeepAdd: {
    (a: import("./curry").Placeholder, b: AnyObject): (a: AnyObject) => AnyObject;
    (a: AnyObject, b: import("./curry").Placeholder): (b: AnyObject) => AnyObject;
    (a: AnyObject): (b: AnyObject) => AnyObject;
    (a: AnyObject, b: AnyObject): AnyObject;
};
/** @param o1 <- o2 */
export declare const qmergeShallow: T_qmergeShallow;
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } removes a key when null. */
export declare const qmapKeys: T_qmapKeys;
/**
 * @param pipe (v, i, list: T[]) -> T.
 * @param data T[].
 * @returns T[].
*/
export declare const qmap: T_qmap;
/**
 * @param cond (v, k) -> boolean.
 * @param data T extends AnyObject.
 * @returns T
*/
export declare const qmapObj: T_qmapObj;
/**
 * @param cond (v, k) -> boolean.
 * @param data T extends any[] | AnyObject.
 * @returns T
*/
export declare const qfilter: T_qfilter;
/** Mutates o to be empty: arrays are spliced, objects have all keys deleted.
 * @param o Target array or object (mutated in-place).
 */
export declare const qempty: <T extends AnyObject | any[]>(o: T) => T extends any[] ? [] : {};
/** Recursively deep-freezes o, returning the frozen result.
 * @param o Target object.
 */
export declare const qfreeze: <T extends AnyObject>(o: T) => Readonly<T>;
/** Shallow-freezes o, returning the frozen result.
 * @param o Target object.
 */
export declare const qfreezeShallow: <T extends AnyObject>(o: T) => Readonly<T>;
/** Mutates xs by prepending x to the start. Returns the new length (curried).
 * @param x Element to prepend.
 * @param xs Target array (mutated in-place).
 */
export declare const qprepend: T_qprepend;
/** Mutates xs by sorting with sortFn. Returns xs (curried).
 * @param sortFn Comparator: (a, b) => number.
 * @param xs Array to sort in-place.
 */
export declare const qsort: T_qsort;
/** Mutates o by setting the value at a nested path. Returns o (curried).
 * @param _path Array of keys forming the path.
 * @param v Value to set.
 * @param o Target object (mutated in-place).
 */
export declare const qassocPath: T_qassocPath;
/** Reverses arr in-place.
 * @param arr Array to reverse (mutated in-place).
 */
export declare const qreverse: (arr: any[]) => any[];
/** Removes specified props from o (mutates in-place) (curried).
 * @param props Property names to remove.
 * @param o Target object.
 */
export declare const qomit: T_qomit;
/**
 * @param prop string @param pipe (data[prop]): prop_value @param data any
 * @returns data with prop over pipe. */
export declare const qoverProp: T_qoverProp;
/** pick() is slower than pick()
 *  @param props (string|number)[]
 *  @param o AnyObject
 *  @returns AnyObject
*/
export declare const qpick: T_qpick;
/** Mutates xs by slicing from-to. Arrays are mutated in-place; strings return a new string (curried).
 * @param from Start index.
 * @param to End index (exclusive).
 * @param xs Source array or string.
 */
export declare const qslice: T_qslice;
export declare const quniqWith: T_quniqWith;
/** Removes duplicates from xs using identity comparison (mutates in-place).
 * @param xs Source array.
 */
export declare const quniq: <T extends unknown>(xs: T[]) => T[];
/** Alias of qappend. Mutates xs by pushing x to the end (curried).
 * @param x Element to push.
 * @param xs Target array (mutated in-place).
 */
export declare const qpush: T_qappend;
/** Alias of quniqWith. Removes duplicates using a getter (curried).
 * @param getter Function returning the comparison key.
 * @param xs Source array.
 */
export declare const quniqBy: T_quniqWith;
