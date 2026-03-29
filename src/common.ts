import { curry2 } from "./curry"
import { is_typed_arr } from "./internal"
import { isNull, isStr, to } from "./utils"

// It's faster that toUpperCase() !
const caseMap = { u: 'U', b: 'B', n: 'N', s: 'S', f: 'F', o: 'O' }

export const symbol = Symbol()
export const toLower = (s: string) => s.toLowerCase()
export const toUpper = (s: string) => s.toUpperCase()
const cap_type = (t: string) => caseMap[t[0]] + t.slice(1)
export const type = (s: any): string => {
  const t = to(s)
  return t==='object'
    ? isNull(s) ? 'Null' : (s.constructor?.name||cap_type(t))
    : cap_type(t)
}
export const typeIs = curry2((t: string, s: any) => type(s)===t)

export const eq = curry2((a: any, b: any) => a===b)
export const equals = curry2((a: any, b: any) => {
  const typea = type(a)
  if(eq(typea, type(b)) && (eq(typea, 'Object') || eq(typea, 'Array') || is_typed_arr(typea))) {
    if(isNull(a) || isNull(b)) return eq(a, b)
    if(eq(a, b)) return true
    for(const v of [a, b])
      for(const k in v)
        if(
          !((eq(v, b)) && (k in a)) &&
          !((eq(v, a)) && (k in b) && equals(a[k], b[k]))
        ) return false
    return true
  }
  return eq(a, b)
})
export const includes = curry2(
  <T>(s: T, ss: T[]) => {
    if(isStr(ss)) return ss.includes(s)
    else {
      for(const a of ss) if(equals(a, s)) return true
      return false
    }
  }
)
export { length } from './internal'

