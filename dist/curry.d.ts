import { AnyArgs, AnyFunc } from './types/base.js';
export type Placeholder = symbol;
/** Placeholder token for curried function partial application. Use `__` to skip an argument.
 */
export declare const __: Placeholder;
/** Curries a function of arbitrary arity. Placeholders (__) allow partial application of any argument.
 * @param fn - the function to curry
 */
export declare const curry: (fn: AnyFunc) => (...args: AnyArgs) => any;
export type Curried2<p0, p1, ReturnT> = {
    (a: Placeholder, b: p1): (a: p0) => ReturnT;
    (a: p0, b: Placeholder): (b: p1) => ReturnT;
    (a: p0): (b: p1) => ReturnT;
    (a: p0, b: p1): ReturnT;
};
type Func2 = (a: any, b: any) => any;
/** Curries a binary (2-arg) function with placeholder support.
 * @param fn - the binary function to curry
 */
export declare function curry2<Func extends Func2>(fn: Func): {
    (a: Placeholder, b: Parameters<Func>[1]): (a: Parameters<Func>[0]) => ReturnType<Func>;
    (a: Parameters<Func>[0], b: Placeholder): (b: Parameters<Func>[1]) => ReturnType<Func>;
    (a: Parameters<Func>[0]): (b: Parameters<Func>[1]) => ReturnType<Func>;
    (a: Parameters<Func>[0], b: Parameters<Func>[1]): ReturnType<Func>;
};
type Func3 = (a: any, b: any, c: any) => any;
/** Curries a ternary (3-arg) function. Delegates to curry.
 * @param fn - the ternary function to curry
 */
export declare function curry3<Func extends Func3>(fn: Func): (...args: AnyArgs) => any;
export {};
