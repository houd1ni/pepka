import { AnyFunc, AnyObject } from './types/base.js';
export declare const isNull: <T extends any>(s: T) => T extends null ? true : false;
/** Checks if a value is undefined.
 * @param s - any value
 */
export declare const isUndef: <T extends any>(s: T) => T extends undefined ? true : false;
/** Checks if a value is a number.
 * @param s - any value
 */
export declare const isNum: <T extends any>(s: T) => T extends number ? true : false;
/** Checks if a value is an array.
 * @param s - any value
 */
export declare const isArray: <T extends any>(s: T) => T extends any[] ? true : false;
/** Checks if a value is a function.
 * @param value - any value
 */
export declare function isFunc<T extends AnyFunc>(value: T): true;
export declare function isFunc(value: any): false;
/** Checks if a value is a string.
 * @param s - any value
 */
export declare const isStr: <T extends any>(s: T) => T extends string ? true : false;
/** Checks if a value is a non-null object.
 * @param s - any value
 */
export declare const isObj: <T extends any>(s: T) => T extends AnyObject ? true : false;
/** Checks if a value is null or undefined.
 * @param s - any value
 */
export declare const isNil: <T extends any>(s: T) => T extends (null | undefined) ? true : false;
/** Checks if a property name is safe (not __proto__, constructor, or prototype).
 * @param prop - the property name to check
 */ 
