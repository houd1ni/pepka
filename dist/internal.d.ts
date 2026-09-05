import { AnyArray } from './types/base.js';
import { StrLen } from './types/string.js';
export declare const is_typed_arr: (x: any) => x is ArrayBufferView<ArrayBufferLike>;
/** @param start string | any[] @param s string | any[] */
export declare const startsWithWith: (comparator: (x: any, y: any) => boolean) => {
    (a: import("./curry.js").Placeholder, b: string | any[]): (a: string | any[]) => boolean;
    (a: string | any[], b: import("./curry.js").Placeholder): (b: string | any[]) => boolean;
    (a: string | any[]): (b: string | any[]) => boolean;
    (a: string | any[], b: string | any[]): boolean;
};
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
export declare const to: (s: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
/** Checks if a value is null.
 * @param s - any value
 */
export declare const isSafe: (prop: string) => boolean;
export declare const length: <T extends AnyArray | string>(s: T) => T extends string ? StrLen<T> : T["length"];
