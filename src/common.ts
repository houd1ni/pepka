import { isArray, to, isNull, isRegExp } from "./utils"

export const toLower = (s: string) => s.toLowerCase()
export const toUpper = (s: string) => s.toUpperCase()
export const type = (s: any) => {
  const t = to(s)
  switch(true) {
    case t!=='object': return toUpper(t[0]) + t.slice(1)
    case isArray(s): return 'Array'
    case isNull(s): return 'Null'
    case isRegExp(s): return 'RegExp'
    default: return 'Object'
  }
}