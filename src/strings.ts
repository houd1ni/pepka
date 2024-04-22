import { AnyObject } from "./types"
import { head, path } from "./safe"

type StrTmpl = ((data: AnyObject) => string)
const ecran = '\\'

// TODO: make it splicy, not accumulatie by symbols.
/** Supports ecrans: '\\{"json": {yes} \\}'
  @returns get_tmpl(one{meme}two)({meme: 42}) -> one42two */
export const getTmpl = (tmpl: string): StrTmpl => {
  const parts: string[] = []
  const keymap: string[] = []
  const len = tmpl.length
  let i = 0, s: string, ln: number, start = 0, open = false,
      hasEcran = head(tmpl), hasEcranNext = false, nextChar: string
  for(i=0; i<len; i++) {
    s = tmpl[i]
    switch(s) {
      case '{':
        if(!hasEcran) {
          open = true; start = i;
          break
        }
      case '}':
        if(!hasEcran) {
          open = false; parts.push('')
          keymap.push(tmpl.slice(start+1, i))
          break
        }
      default:
        nextChar = tmpl[i+1]
        hasEcranNext = s === ecran
        if(!open && (!hasEcranNext || nextChar!=='{' && nextChar!=='}')) {
          ln = parts.length-1
          if(ln<0) { parts.push(''); ln++ }
          parts[ln] += s
        }
        hasEcran = hasEcranNext
        break
    }
  }
  return (data) => {
    const out: string[] = []
    const ln = parts.length-1
    for(const j in parts) {
      i = +j; out.push(parts[i])
      if(i!==ln) out.push(path(keymap[i].split('.'), data))
    }
    return out.join('')
  }
}
