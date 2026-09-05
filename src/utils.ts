
import { AnyFunc, AnyObject } from '../types/base'
import { nul, to, undef } from './internal'

export const isNull = <T extends any>(s: T) => (s===nul) as T extends null ? true : false
/** Checks if a value is undefined.
 * @param s - any value
 */
export const isUndef = <T extends any>(s: T) => (s===undef) as T extends undefined ? true : false
/** Checks if a value is a number.
 * @param s - any value
 */
export const isNum = <T extends any>(s: T) => (to(s)=='number') as T extends number ? true : false
/** Checks if a value is an array.
 * @param s - any value
 */
export const isArray = <T extends any>(s: T) => (Array.isArray(s)) as T extends any[] ? true : false
/** Checks if a value is a function.
 * @param value - any value
 */

export function isFunc<T extends AnyFunc>(value: T): true
export function isFunc(value: any): false
export function isFunc(s: any) { return to(s)==='function' }
/** Checks if a value is a string.
 * @param s - any value
 */
export const isStr = <T extends any>(s: T) => (to(s)==='string') as T extends string ? true : false
/** Checks if a value is a non-null object.
 * @param s - any value
 */
export const isObj = <T extends any>(s: T) => (!isNull(s) && to(s)==='object') as T extends AnyObject ? true : false
/** Checks if a value is null or undefined.
 * @param s - any value
 */
export const isNil = <T extends any>(s: T) => (isNull(s) || isUndef(s)) as T extends (null|undefined) ? true : false
/** Checks if a property name is safe (not __proto__, constructor, or prototype).
 * @param prop - the property name to check
 */