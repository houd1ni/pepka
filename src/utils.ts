
import { AnyFunc, AnyObject } from '../types/base'
import { nul, to, undef } from './internal'

export const isNull = (s: unknown): s is null => s === nul
/** Checks if a value is undefined.
 * @param s - any value
 */
export const isUndef = (s: unknown): s is undefined => s === undef
/** Checks if a value is a number.
 * @param s - any value
 */
export const isNum = (s: unknown): s is number => to(s)=='number'
/** Checks if a value is an array.
 * @param s - any value
 */
export const isArray = (s: unknown): s is any[] => Array.isArray(s)
/** Checks if a value is a function.
 * @param value - any value
 */

export function isFunc<T extends AnyFunc>(value: T): true
export function isFunc(value: any): false
export function isFunc(s: any) { return to(s)==='function' }
/** Checks if a value is a string.
 * @param s - any value
 */
export const isStr = (s: unknown): s is string => to(s)=='string'
/** Checks if a value is a non-null object.
 * @param s - any value
 */
export const isObj = (s: unknown): s is AnyObject => !isNull(s) && to(s)=='object'
/** Checks if a value is null or undefined.
 * @param s - any value
 */
export const isNil = (s: unknown): s is null | undefined => s === nul || s === undef