import type { T_eq, T_equals, T_includes, T_typeIs } from '../types/common';
/** Unique symbol used as a sentinel for pathOr defaults. */
export declare const symbol: unique symbol;
/** Convert a string to lowercase.
 * @param s - the string to convert
 */
export declare const toLower: (s: string) => string;
/** Convert a string to uppercase.
 * @param s - the string to convert
 */
export declare const toUpper: (s: string) => string;
/** Returns the type name of a value (e.g. 'String', 'Array', 'Null', 'NaN').
 * @param s - the value to inspect
 */
export declare const type: (s: any) => string;
/** Checks if a value's type name equals the given string.
 * @param t - the type name to check against (e.g. 'String', 'Array', 'SomeClass' etc.)
 * @param s - the value to test
 */
export declare const typeIs: T_typeIs;
/** Strict reference equality (===).
 * @param a - first value
 * @param b - second value
 */
export declare const eq: T_eq;
/** Deep equality comparison.
 * @param a - first value
 * @param b - second value
 */
export declare const equals: T_equals;
/** Checks if a collection contains a value (deep equality). Works on strings and arrays.
 * @param s - the value to look for
 * @param ss - the string or array to search in
 */
export declare const includes: T_includes;
/** Returns a function that always returns the given value.
 * @param s - the value to return
 */
export declare const always: <T extends any>(s: T) => () => T;
/** Returns its argument unchanged.
 * @param s - any value
 */
export declare const identity: <T extends any>(s: T) => T;
/** Removes whitespace from both ends of a string.
 * @param s - the string to trim
 */
export declare const trim: (s: string) => string;
export { length } from './internal';
