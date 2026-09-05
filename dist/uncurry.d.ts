import { AnyFunc } from './types/base.js';
import { Curried } from './types/curry.js';
/** Uncurries a curried function into a single-call function that accepts all arguments at once.
 * @param fn - the curried function to uncurry
 */
export declare const uncurry: <Args extends any[] = any[], ReturnT = any>(fn: Curried<Args>) => AnyFunc;
