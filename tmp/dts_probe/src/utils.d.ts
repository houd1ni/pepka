import { AnyFunc, AnyObject } from './types';
/** Shorthand for undefined. */
export declare const undef: undefined;
/** Shorthand for null. */
export declare const nul: null;
/** Shorthand for Infinity. */
export declare const inf: number;
/** Unique sentinel symbol for internal "not assigned" checks. */
export declare const not_assigned: unique symbol;
/** Returns the JS type string of a value (typeof).
 * @param s - any value
 */
export declare const to: (s: any) => "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";
/** Checks if a value is null.
 * @param s - any value
 */
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
export declare const isSafe: (prop: string) => boolean;
export declare class QPromise<T> extends Promise<T> {
    private oncancel;
    private ff;
    private rj;
    private _cancel_data;
    cancel(resolve?: boolean): void;
    constructor(fn: AnyFunc<any, [AnyFunc, AnyFunc, AnyFunc?]>, oncancel?: (...args: any[]) => any);
}
