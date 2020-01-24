import { curry } from "./curry"
import { type } from "./common"
import { AnyObject, Reducer } from "./types"

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
export const qmergeDeep = curry(
  (o1: AnyObject, o2: AnyObject): AnyObject => {
    for(let k in o2) {
      switch(type(o2[k])) {
        case 'Array':
        case 'Object':
          if(type(o1[k])==='Object') {
            qmergeDeep(o1[k], o2[k])
            break
          }
        default:
          o1[k] = o2[k]
          break
      }
    }
    return o1
  }
)
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const qmapKeys = curry(
  (
    keyMap: {[oldKey: string]: string},
    o: AnyObject
  ) => {
    for(let k in keyMap) {
      if(k !== keyMap[k]) {
        o[keyMap[k]] = o[k]
        delete o[k]
      }
    }
    return o
  }
)