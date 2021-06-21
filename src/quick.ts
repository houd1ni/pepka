import { curry } from "./curry"
import { type } from "./common"
import { AnyObject, Reducer, AnyFunc } from "./types"
import { isFunc, isArray } from "./utils"

export const qappend = curry((s: any, xs: any[]) => {xs.push(s); return xs})
export const qassoc = curry(
  (prop: string, v: any, obj: AnyObject) => {
    obj[prop] = v
    return obj
  }
)
export const qreduce = curry(
  (fn: Reducer, accum: any, arr: any[]) =>
    arr.reduce(fn, accum)
)
// strategy is for arrays: 1->clean, 2->merge, 3->push.
const mergeDeep = curry((strategy: 1|2|3, o1: AnyObject, o2: AnyObject): AnyObject => {
  for(let k in o2) {
    switch(type(o2[k])) {
      case 'Array':
        if(strategy>1 && type(o1[k])==='Array') {
          switch(strategy) {
            case 2:
              const o1k = o1[k], o2k = o2[k]
              for(const i in o2k) {
                if(o1k[i]) {
                  mergeDeep(strategy, o1k[i], o2k[i])
                } else {
                  o1k[i] = o2k[i]
                }
              }
              break
            case 3: o1[k].push(...o2[k])
            default: break
          }
        } else {
          o1[k] = o2[k]
        }
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
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const qmapKeys = curry(
  (
    keyMap: {[oldKey: string]: string},
    o: AnyObject
  ) => {
    let k: string, mapped: string | AnyFunc, newKey: string, newValue: any
    for(k in keyMap) {
      mapped = keyMap[k]
      ;[newKey, newValue] = isFunc(mapped)
        ? (mapped as unknown as AnyFunc)(o)
        : [mapped, o[k]]
      o[newKey] = newValue
      if(k !== newKey) {
        delete o[k]
      }
    }
    return o
  }
)

export const qfilter = curry(
  (
    cond: (v: any, k: string | number) => boolean,
    data: any[] | AnyObject
  ) => {
    const isArr = isArray(data)
    for(let k in data) {
      if(!cond(data[k], k)) {
        if(isArr) {
          data.splice(k, 1)
        } else {
          // TODO: handle Maps and Sets ?
          delete data[k]
        }
      }
    }
    return data
  }
)
/** @deprecated */
export const qindexOf = curry(
  (x: any, xs: any[]) => xs.indexOf(x)
)