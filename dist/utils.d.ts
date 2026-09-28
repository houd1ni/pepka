import { AnyFunc, AnyObject } from './types/base.js';
export declare const isNull: (s: unknown) => s is null;
/** Checks if a value is undefined.
 * @param s - any value
 */
export declare const isUndef: (s: unknown) => s is undefined;
/** Checks if a value is a number.
 * @param s - any value
 */
export declare const isNum: (s: unknown) => s is number;
/** Checks if a value is an array.
 * @param s - any value
 */
export declare const isArray: (s: unknown) => s is any[];
/** Checks if a value is a function.
 * @param value - any value
 */
export declare function isFunc<T extends AnyFunc>(value: T): true;
export declare function isFunc(value: any): false;
/** Checks if a value is a string.
 * @param s - any value
 */
export declare const isStr: (s: unknown) => s is string;
/** Checks if a value is a non-null object.
 * @param s - any value
 */
export declare const isObj: (s: unknown) => s is AnyObject;
/** Checks if a value is null or undefined.
 * @param s - any value
 */
export declare const isNil: (s: unknown) => s is null | undefined;
