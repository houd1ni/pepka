import { AnyFunc, AnyObject, Reducer } from '../types/base'
import type {
  T_qappend, T_qassoc, T_qassocPath, T_qfilter, T_qmap, T_qmapKeys, T_qmapObj,
  T_qmergeShallow, T_qomit, T_qoverProp, T_qpick, T_qprepend, T_qreduce,
  T_qslice, T_qsort, T_quniqWith
} from '../types/quick'
import { identity, includes, length, type } from './common'
import { curry2, curry3 } from './curry'
import { inf, isSafe } from './internal'
import { isArray, isFunc, isNil, isNum, isObj } from './utils'
const {min} = Math
const z = 0
/* qflat, qflatShallow, qreduceAsync */

/** Mutates xs by pushing s to the end. Returns xs (curried).
 * @param s Element to append.
 * @param xs Target array (mutated in-place).
 */
export const qappend = curry2((s: any, xs: any[]) => {xs.push(s); return xs}) as any as T_qappend
/** Mutates obj by setting prop to v. Returns obj (curried).
 * @param prop Property name.
 * @param v Value to set.
 * @param obj Target object (mutated in-place).
 */
export const qassoc = curry3((prop: string, v: any, obj: AnyObject) => { obj[prop] = v; return obj }) as any as T_qassoc
/** Reduces arr with fn and accum (curried).
 * @param fn Reducer: (accum, value, index?) => new_accum.
 * @param accum Initial accumulator.
 * @param arr Source array.
 */
export const qreduce = curry3((fn: Reducer, accum: any, arr: any[]) => arr.reduce(fn, accum)) as any as T_qreduce
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
/** Deep-merge o2 into o1 with array replace strategy (mutates o1) (curried).
 * @param o1 Target object (mutated in-place).
 * @param o2 Source object to merge from.
 */
export const qmergeDeep = mergeDeep(1)
/** Deep-merge o2 into o1 with array merge strategy (mutates o1) (curried).
 * @param o1 Target object (mutated in-place).
 * @param o2 Source object to merge from.
 */
export const qmergeDeepX = mergeDeep(2)
/** Deep-merge o2 into o1 with array push strategy (mutates o1) (curried).
 * @param o1 Target object (mutated in-place).
 * @param o2 Source object to merge from.
 */
export const qmergeDeepAdd = mergeDeep(3)
/** @param o1 <- o2 */
export const qmergeShallow = curry2((o1: AnyObject, o2: AnyObject) => Object.assign(o1, o2)) as any as T_qmergeShallow
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } removes a key when null. */
export const qmapKeys = curry2(
  (
    keyMap: ((v: any, k: string, o: AnyObject) => string) | {[oldKey: string]: string | AnyFunc},
    o: AnyObject
  ) => {
    let k: string, mapped: string | AnyFunc, newKey: string, newValue: any, swap: AnyObject = {}, inswap: boolean
    const km: any = keyMap
    for(k in km) if(k in o) {
      mapped = km[k]
      ;[newKey, newValue] = isFunc(mapped)
        ? (mapped as AnyFunc)(o[k], k, o)
        : [mapped, o[k]]
      if(newKey in km) swap[newKey] = o[newKey]
      inswap = k in swap
      if(!isNil(newKey)) o[newKey] = inswap ? swap[k] : newValue
      if(!inswap && k !== newKey) delete o[k]
    }
    return o
  }
) as any as T_qmapKeys
/**
 * @param pipe (v, i, list: T[]) -> T.
 * @param data T[].
 * @returns T[].
*/
export const qmap = curry2(
  (pipe: (s: any, i?: number, list?: any) => any, arr: any) => {
    for(const i in arr) arr[i] = pipe(arr[i], +i, arr)
    return arr
  }
) as any as T_qmap
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
) as any as T_qmapObj
/**
 * @param cond (v, k) -> boolean.
 * @param data T extends any[] | AnyObject.
 * @returns T
*/
export const qfilter = curry2(
  (cond: (v: any, k: string | number) => boolean, data: any): any => {
  if(isArray(data)) {
  let indicies_offset = 0
  const indicies2rm: number[] = []
  const len = length(data as any[])
  for(let i = 0; i<len; i++)
    if(!cond((data as any[])[i], i))
      indicies2rm.push(i)
  for(const i of indicies2rm)
    data.splice(i - indicies_offset++, 1)
} else for(const k in data)
  if(!cond(data[k], k)) delete data[k]
return data
}) as any as T_qfilter
/** Mutates o to be empty: arrays are spliced, objects have all keys deleted.
 * @param o Target array or object (mutated in-place).
 */
export const qempty = <T extends AnyObject|any[]>(o: T): T extends any[] ? [] : {} => {
  if(isArray(o)) o.splice(0)
  else for(const i in o) delete o[i]
  return o as any
}
/** Recursively deep-freezes o, returning the frozen result.
 * @param o Target object.
 */
export const qfreeze = <T extends AnyObject>(o: T): Readonly<T> => {
  let v: any
  for(const k in o) {
    v = o[k]
    if(isObj(v)) qfreeze(v)
  }
  return Object.freeze(o)
}
/** Shallow-freezes o, returning the frozen result.
 * @param o Target object.
 */
export const qfreezeShallow = <T extends AnyObject>(o: T): Readonly<T> => Object.freeze(o)
/** Mutates xs by prepending x to the start. Returns the new length (curried).
 * @param x Element to prepend.
 * @param xs Target array (mutated in-place).
 */
export const qprepend = curry2((x: any, xs: any[]) => xs.unshift(x)) as any as T_qprepend
/** Mutates xs by sorting with sortFn. Returns xs (curried).
 * @param sortFn Comparator: (a, b) => number.
 * @param xs Array to sort in-place.
 */
export const qsort = curry2((sortFn: (a: any, b: any) => number , xs: any[]) => xs.sort(sortFn)) as any as T_qsort
/** Mutates o by setting the value at a nested path. Returns o (curried).
 * @param _path Array of keys forming the path.
 * @param v Value to set.
 * @param o Target object (mutated in-place).
 */
export const qassocPath = curry3((_path: string[], v: any, o: AnyObject) => {
  const first = _path[0]
  return qassoc(first, _path.length<2
    ? v
    : qassocPath(_path.slice(1), v, isObj(o[first]) ? o[first] : {}),
    o
  )
}) as any as T_qassocPath
/** Reverses arr in-place.
 * @param arr Array to reverse (mutated in-place).
 */
export const qreverse = (arr: any[]) => arr.reverse()
/** Removes specified props from o (mutates in-place) (curried).
 * @param props Property names to remove.
 * @param o Target object.
 */
export const qomit = curry2(
  (props: string[], o: AnyObject) => qfilter(
    (_: any, k: string | number) => !includes(k as string, props),
    o
  )
) as any as T_qomit
/**
 * @param prop string @param pipe (data[prop]): prop_value @param data any
 * @returns data with prop over pipe. */
export const qoverProp = curry3(
  (prop: string, pipe: AnyFunc, data: any) => qassoc(prop, pipe(data[prop]), data)
) as any as T_qoverProp
/** pick() is slower than pick()
 *  @param props (string|number)[]
 *  @param o AnyObject
 *  @returns AnyObject
*/
export const qpick = curry2((props: string[], o: AnyObject) => {
  for(const p in o) if(!props.includes(p)) delete o[p]
  return o
}) as any as T_qpick
/** Mutates xs by slicing from-to. Arrays are mutated in-place; strings return a new string (curried).
 * @param from Start index.
 * @param to End index (exclusive).
 * @param xs Source array or string.
 */
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
) as any as T_qslice
/** Should be faster than .splice() 'cause does not make a new array. */
const rmel = (index: number, xs: any[]) => {
  const len = length(xs)
  for(let i=index; i<len; i++) xs[i]=xs[i+1]
  xs.length = len-1
  return xs
}
const seen = new Set()
export const quniqWith = curry2((getter: AnyFunc, xs: any[]) => {
  let size = length(xs), cur: any
  for(let i=z; i<size; i++) {
    const x = xs[i]
    cur = getter(x)
    if(seen.has(cur)) {rmel(i, xs); size--; i--}
    else seen.add(cur)
  }
  seen.clear()
  return xs
}) as any as T_quniqWith
/** Removes duplicates from xs using identity comparison (mutates in-place).
 * @param xs Source array.
 */
export const quniq = quniqWith(identity)

// Aliases.
/** Alias of qappend. Mutates xs by pushing x to the end (curried).
 * @param x Element to push.
 * @param xs Target array (mutated in-place).
 */
export const qpush = qappend
/** Alias of quniqWith. Removes duplicates using a getter (curried).
 * @param getter Function returning the comparison key.
 * @param xs Source array.
 */
export const quniqBy = quniqWith