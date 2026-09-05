import { AnyArray } from '../types/base'
import { StrLen } from '../types/string'
import { curry2 } from './curry'

export const is_typed_arr = (x: any) => ArrayBuffer.isView(x)
/** @param start string | any[] @param s string | any[] */
export const startsWithWith = (comparator: (x: any, y: any)=>boolean) => curry2(
  (start: any[] | string, s: any[] | string) => {
    const len_start = length(start)
    const len_s = length(s)
    if(len_start>len_s) return false
    for(let i=0; i<len_start; i++) if(!comparator(s[i], start[i])) return false
    return true
  }
)

const unsafe_props = {'__proto__': true, 'constructor': true, 'prototype': true}
/** Shorthand for undefined. */
export const undef = undefined
/** Shorthand for null. */
export const nul = null
/** Shorthand for Infinity. */
export const inf = Infinity
/** Unique sentinel symbol for internal "not assigned" checks. */
export const not_assigned = Symbol()
/** Returns the JS type string of a value (typeof).
 * @param s - any value
 */
export const to = (s: any) => typeof s
/** Checks if a value is null.
 * @param s - any value
 */
export const isSafe = (prop: string) => !(prop in unsafe_props)
export const length = <T extends AnyArray | string> // it's here to avoid circular deps.
  (s: T): T extends string ? StrLen<T> : T['length'] => s.length as any