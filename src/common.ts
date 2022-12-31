import { curry2 } from "./curry"
import { to, isNull } from "./utils"

// It's faster that toUpperCase() !
const caseMap = {
  u: 'U', b: 'B', n: 'N', s: 'S', f: 'F'
}

export const toLower = (s: string) => s.toLowerCase()
export const toUpper = (s: string) => s.toUpperCase()
export const type = (s: any) => {
  const t = to(s)
  return t==='object'
    ? isNull(s) ? 'Null' : s.constructor.name
    : caseMap[t[0]] + t.slice(1)
}
export const typeIs = curry2((t: string, s: any) => type(s)===t)