import { includes, length, type } from "./common"
import { curry2, curry3 } from "./curry"
import { AnyFunc, AnyObject, Reducer } from "./types"
import { inf, isArray, isFunc, isNil, isNum, isObj, isSafe } from "./utils"
const {min} = Math
const z = 0
/* qflat, qflatShallow, qreduceAsync */

export const qappend = curry2((s: any, xs: any[]) => {xs.push(s); return xs})
export const qassoc = curry3((prop: string, v: any, obj: AnyObject) => { obj[prop] = v; return obj })
export const qreduce = curry3(<T>(fn: Reducer, accum: any, arr: T[]) => arr.reduce(fn, accum))
// strategy is for arrays: 1->replace, 2->merge, 3->push.
const mergeDeep = (strategy: 1|2|3) => curry2((o1: AnyObject, o2: AnyObject): AnyObject => {
  for(let k in o2) {
    if(isSafe(k)) switch(type(o2[k])) {
      case 'Array':
        if(strategy>1 && type(o1[k])==='Array')
          switch(strategy) {
            case 2:
              const o1k = o1[k], o2k = o2[k]
              for(const i in o2k)
                if(o1k[i]) mergeDeep(strategy)(o1k[i], o2k[i])
                else o1k[i] = o2k[i]
              break
            case 3: o1[k].push(...o2[k])
            default: break
          }
        else o1[k] = o2[k]
        break
      case 'Object':
        if(type(o1[k])==='Object') {
          mergeDeep(strategy)(o1[k], o2[k])
          break
        }
      default:
        o1[k] = o2[k]
        break
    }
  }
  return o1
})
export const qmergeDeep = mergeDeep(1)
export const qmergeDeepX = mergeDeep(2)
export const qmergeDeepAdd = mergeDeep(3)
/** @param o1 <- o2 */
export const qmergeShallow = curry2((o1: AnyObject, o2: AnyObject) => Object.assign(o1, o2))
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const qmapKeys = curry2(
  (
    keyMap: {[oldKey: string]: string | AnyFunc},
    o: AnyObject
  ) => {
    let k: string, mapped: string | AnyFunc, newKey: string, newValue: any, swap: AnyObject = {}, inswap: boolean
    for(k in keyMap) if(k in o) {
      mapped = keyMap[k]
      ;[newKey, newValue] = isFunc(mapped)
        ? (mapped as AnyFunc)(o[k], k, o)
        : [mapped, o[k]]
      if(newKey in keyMap) swap[newKey] = o[newKey]
      inswap = k in swap
      if(!isNil(newKey)) o[newKey] = inswap ? swap[k] : newValue
      if(!inswap && k !== newKey) delete o[k]
    }
    return o
  }
)
// FIXME: qmap(any, tags) -> some function!!!
/**
 * @param pipe (v, i, list: T[]) -> T.
 * @param data T[].
 * @returns T[].
*/
export const qmap = curry2(
  <T extends any[]|AnyObject>(pipe: (s: any, i?: number, list?: T) => T[Extract<keyof T, string>], arr: T) => {
    for(const i in arr) arr[i] = pipe(arr[i], +i, arr)
    return arr
  }
)
/**
 * @param cond (v, k) -> boolean.
 * @param data T extends AnyObject.
 * @returns T
*/
export const qmapObj = curry2(
  (pipe: (s: any, k?: string, o?: AnyObject) => any, o: AnyObject) => {
    for(const k in o) o[k] = pipe(o[k], k, o)
    return o
  }
)
/**
 * @param cond (v, k) -> boolean.
 * @param data T extends any[] | AnyObject.
 * @returns T
*/
export const qfilter = curry2(
<T extends any[] | AnyObject>(
  cond: (v: any, k: string | number) => boolean,
  data: T
): T => {
  if(isArray(data)) {
  let indicies_offset = 0
  const indicies2rm: number[] = []
  const len = length(data as any[])
  for(let i = 0; i<len; i++)
    if(!cond(data[i], i))
      indicies2rm.push(i)
  for(const i of indicies2rm)
    data.splice(i - indicies_offset++, 1)
} else for(const k in data)
  if(!cond(data[k], k)) delete data[k]
return data
})
export const qempty = <T extends AnyObject|any[]>(o: T): T extends any[] ? [] : {} => {
  if(isArray(o)) o.splice(0)
  else for(const i in o) delete o[i]
  return o as any
}
export const qfreeze = <T extends AnyObject>(o: T): Readonly<T> => {
  let v: any
  for(const k in o) {
    v = o[k]
    if(isObj(v)) qfreeze(v)
  }
  return Object.freeze(o)
}
export const qfreezeShallow = <T extends AnyObject>(o: T): Readonly<T> => Object.freeze(o)
export const qprepend = curry2((x: any, xs: any[]) => xs.unshift(x))
export const qsort = curry2((sortFn: (a: any, b: any) => number , xs: any[]) => xs.sort(sortFn))
export const qassocPath = curry3((_path: string[], v: any, o: AnyObject) => {
  const first = _path[0]
  return qassoc(first, _path.length<2
    ? v
    : qassocPath(_path.slice(1), v, isObj(o[first]) ? o[first] : {}),
    o
  )
})
export const qreverse = (arr: any[]) => arr.reverse()
export const qomit = curry2(
  (props: string[], o: AnyObject) => qfilter(
    (_: any, k: string) => !includes(k, props),
    o
  )
)
/** @param prop string @param pipe (data[prop]): prop_value @param data any
 * @returns data with prop over pipe. */
export const qoverProp = curry3(
  (prop: string, pipe: AnyFunc, data: any) => qassoc(prop, pipe(data[prop]), data)
)
/** Slower than pick() (dictionary mode) ! it's okay when the object is already in the dic mode !
 *  @param props (string|number)[]
 *  @param o AnyObject
 *  @returns AnyObject
*/
export const qpick = curry2((props: string[], o: AnyObject) => {
  for(const p in o) if(!props.includes(p)) delete o[p]
  return o
})
export const qslice = curry3(
  (from: number, to: number, xs: any[] | string) => {
    const right = (isNum(to)?to:inf) as number
    const window_width = min(right, length(xs))-from
    if(isArray(xs)) {
      xs = xs as any[]
      if(from>z) for(let i=z; i<window_width; i++) xs[i] = xs[from+i]
      xs.length = window_width
      return xs
    } else return xs.slice(from, right) // strings are immutable.
  }
)
/** Should be faster than .splice() 'cause does not make a new array. */
const rmel = (index: number, xs: any[]) => {
  const len = length(xs)
  for(let i=index; i<len; i++) xs[i]=xs[i+1]
  xs.length = len-1
  return xs
}
const seen = new Set()
export const quniq = (xs: any[]) => {
  seen.clear()
  let size = length(xs)
  for(let i=z; i<size; i++) {
    const x = xs[i]
    if(seen.has(x)) {rmel(i, xs); size--; i--}
    else seen.add(x)
  }
  return xs
}

// Aliases.
export const qpush = qappend