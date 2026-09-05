import { AnyFunc } from './types';
import { QPromise } from './utils';
/** Debounces a function: returns a new function that waits `time` ms
 * of inactivity before calling `fn`, coalescing all pending calls.
 * @param time - debounce delay in ms
 * @param fn - the function to debounce
 */
export declare const debounce: <T extends AnyFunc>(time: number, fn: T) => (...args: Parameters<T>) => Promise<ReturnType<T>>;
/** Throttles a function: returns a new function that calls `fn`
 * immediately, then ignores subsequent calls for `time` ms.
 * @param time - throttle interval in ms
 * @param fn - the function to throttle
 */
export declare const throttle: <T extends AnyFunc>(time: number, fn: T) => (...args: Parameters<T>) => any;
/** Returns a cancellable QPromise that resolves after `time` ms.
 * @param time - delay in ms
 */
export declare const wait: (time: number) => QPromise<any>;
