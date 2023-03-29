import { curry2, curry3 } from "./curry"
import { type } from "./common"
import { AnyObject, Reducer, AnyFunc } from "./types"
import { isFunc, isArray, isObj } from "./utils"
import { isNil } from "./safe"
// TODO: qoverProp, qover array ?

export const qappend = curry2((s: any, xs: any[]) => {xs.push(s); return xs})
export const qassoc = curry3(
  (prop: string, v: any, obj: AnyObject) => {
    obj[prop] = v
    return obj
  }
)
export const qreduce = curry3(
  <T>(fn: Reducer, accum: any, arr: T[]) => arr.reduce(fn, accum)
)
// strategy is for arrays: 1->clean, 2->merge, 3->push.
const mergeDeep = curry3((strategy: 1|2|3, o1: AnyObject, o2: AnyObject): AnyObject => {
  for(let k in o2) {
    switch(type(o2[k])) {
      case 'Array':
        if(strategy>1 && type(o1[k])==='Array')
          switch(strategy) {
            case 2:
              const o1k = o1[k], o2k = o2[k]
              for(const i in o2k)
                if(o1k[i]) mergeDeep(strategy, o1k[i], o2k[i])
                else o1k[i] = o2k[i]
              break
            case 3: o1[k].push(...o2[k])
            default: break
          }
        else o1[k] = o2[k]
        break
      case 'Object':
        if(type(o1[k])==='Object') {
          mergeDeep(strategy, o1[k], o2[k])
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
export const qmergeShallow = curry2((o1: AnyObject, o2: AnyObject) => Object.assign(o1, o2))
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const qmapKeys = curry2(
  (
    keyMap: {[oldKey: string]: string | AnyFunc},
    o: AnyObject
  ) => {
    let k: string, mapped: string | AnyFunc, newKey: string, newValue: any
    for(k in keyMap) if(k in o) {
      mapped = keyMap[k]
      ;[newKey, newValue] = isFunc(mapped)
        ? (mapped as AnyFunc)(o[k], k, o)
        : [mapped, o[k]]
      o[isNil(newKey) ? k : newKey] = newValue
      if(k !== newKey) delete o[k]
    }
    return o
  }
)
export const qmap = curry2(
  (pipe: (s: any, i?: number, list?: any[]) => any, arr: any[]) => {
    for(let i in arr) arr[i] = pipe(arr[i], +i, arr)
    return arr
  }
)
export const qfilter = curry2(
  <T extends any[] | AnyObject>(
    cond: (v: any, k: string | number) => boolean,
    data: T
  ): T => {
    const isArr = isArray(data)
    let indicies_offset: number, indicies2rm: number[]
    if(isArr) {
      indicies_offset = 0
      indicies2rm = []
    }
    for(let k in data)
      if(!cond(data[k], k)) // @ts-ignore
        if(isArr) indicies2rm.push(+k)
        else delete data[k]
    if(isArr)// @ts-ignore
      for(const i of indicies2rm) // @ts-ignore
        data.splice(i - indicies_offset++, 1)
    return data
  }
)
export const qempty = (o: AnyObject|any[]) => {
  if(isArray(o)) o.splice(0) 
  else for(const i in o) delete o[i]
  return o
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
export const qassocPath = curry3((_path: string[], v: any, o: AnyObject) => {
  const first = _path[0]
  return qassoc(first, _path.length<2
    ? v
    : qassocPath(_path.slice(1), v, isObj(o[first]) ? o[first] : {}),
    o
  )
})