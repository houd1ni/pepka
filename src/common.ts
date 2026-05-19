import { curry2 } from "./curry"
import { is_typed_arr, length } from "./internal"
import { isNull, isStr, to } from "./utils"
const {isNaN} = Number

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
    : t==='number'&&isNaN(s) ? 'NaN'
    : cap_type(t)
}
export const typeIs = curry2((t: string, s: any) => type(s)===t)

export const eq = curry2((a: any, b: any) => a===b)
export const equals = curry2((a: any, b: any) => {
  if(a===b) return true
  const typea = type(a)
  const ta = is_typed_arr(a)
  if(eq(typea, type(b)) && (eq(typea, 'Object') || eq(typea, 'Array') || ta)) {
    if(ta) {
      if(typea==='Buffer') return (a as Buffer).equals(b)
      const len = length(a as any)
      if(len!==length(b)) return false
      for(let i=0; i<len; i++) if(a[i]!==b[i]) return false
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
export const always = <T extends any>(s: T) => () => s
export const identity = <T extends any>(s: T) => s
export const trim = (s: string) => s.trim()

export { length } from './internal'

