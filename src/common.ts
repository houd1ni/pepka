import { curry2 } from "./curry"
import { is_typed_arr } from "./internal"
import { AnyArray, StrLen } from "./internal_types"
import { to, isNull, isStr, isUndef } from "./utils"

// It's faster that toUpperCase() !
const caseMap = { u: 'U', b: 'B', n: 'N', s: 'S', f: 'F' }

export const symbol = Symbol()
export const toLower = (s: string) => s.toLowerCase()
export const toUpper = (s: string) => s.toUpperCase()
export const type = (s: any): string => {
  const t = to(s)
  return t==='object'
    ? isNull(s) ? 'Null' : s.constructor.name
    : caseMap[t[0]] + t.slice(1)
}
export const typeIs = curry2((t: string, s: any) => type(s)===t)

export const length = <T extends AnyArray | string>(s: T): T extends string ? StrLen<T> : T["length"] => s.length as any
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
/** @param start string | any[] @param s string | any[] */
export const qstartsWithWith = (comparator: (x: any, y: any)=>boolean) => curry2(
  (start: any[] | string, s: any[] | string) => {
    const len_start = length(start)
    const len_s = length(s)
    if(len_start>len_s) return false
    for(let i=0; i<len_start; i++) if(!comparator(s[i], start[i])) return false
    return true
  }
)