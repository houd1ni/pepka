import type { T_eq, T_equals, T_includes, T_typeIs } from '../types/common'
import { curry2 } from './curry'
import { is_typed_arr, length, to } from './internal'
import { isNull, isStr } from './utils'
const {isNaN} = Number

// It's faster that toUpperCase() !
const caseMap: {[key: string]: string} = { u: 'U', b: 'B', n: 'N', s: 'S', f: 'F', o: 'O' }

/** Unique symbol used as a sentinel for pathOr defaults. */
export const symbol = Symbol()
/** Convert a string to lowercase.
 * @param s - the string to convert
 */
export const toLower = (s: string) => s.toLowerCase()
/** Convert a string to uppercase.
 * @param s - the string to convert
 */
export const toUpper = (s: string) => s.toUpperCase()
const cap_type = (t: string) => caseMap[t[0]] + t.slice(1)
/** Returns the type name of a value (e.g. 'String', 'Array', 'Null', 'NaN').
 * @param s - the value to inspect
 */
export const type = (s: any): string => {
  const t = to(s)
  return t==='object'
    ? isNull(s) ? 'Null' : (s.constructor?.name||cap_type(t))
    : t==='number'&&isNaN(s) ? 'NaN'
    : cap_type(t)
}
/** Checks if a value's type name equals the given string.
 * @param t - the type name to check against (e.g. 'String', 'Array', 'SomeClass' etc.)
 * @param s - the value to test
 */
export const typeIs = curry2((t: string, s: any) => type(s)===t) as any as T_typeIs
/** Strict reference equality (===).
 * @param a - first value
 * @param b - second value
 */
export const eq = curry2((a: any, b: any) => a===b) as any as T_eq
/** Deep equality comparison.
 * @param a - first value
 * @param b - second value
 */
export const equals = curry2((a: any, b: any) => {
  if(a===b) return true
  const typea = type(a)
  const ta = is_typed_arr(a)
  if(eq(typea, type(b)) && (eq(typea, 'Object') || eq(typea, 'Array') || ta)) {
    if(ta) {
      if(typea==='Buffer') return (a as Buffer).equals(b)
      const len = length(a as any)
      if(len!==length(b)) return false
      for(let i=0; i<len; i++) if((a as any)[i]!==(b as any)[i]) return false
      return true
    }
    if(isNull(a) || isNull(b)) return eq(a, b)
    for(const v of [a, b]) for(const k in v)
      if(
        !(v===b && (k in a)) &&
        !(v===a && (k in b) && equals(a[k], b[k]))
      ) return false
    return true
  }
  return false
}) as any as T_equals
/** Checks if a collection contains a value (deep equality). Works on strings and arrays.
 * @param s - the value to look for
 * @param ss - the string or array to search in
 */
export const includes = curry2(
  (s: any, ss: any) => {
    if(isStr(ss)) return ss.includes(s)
    else {
      for(const a of ss) if(equals(a, s)) return true
      return false
    }
  }
) as any as T_includes
/** Returns a function that always returns the given value.
 * @param s - the value to return
 */
export const always = <T extends any>(s: T) => () => s
/** Returns its argument unchanged.
 * @param s - any value
 */
export const identity = <T extends any>(s: T) => s
/** Removes whitespace from both ends of a string.
 * @param s - the string to trim
 */
export const trim = (s: string) => s.trim()

export { length } from './internal'; // to avoid cirular dependecies.
