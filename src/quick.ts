import { curry } from "./curry"
import { type } from "./safe"
import { isObjArr } from "./utils"
import { AnyObject, Reducer } from "./types"

export const qappend = (s: any, xs: any[]) => {xs.push(s); return xs}
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
          if(isObjArr(o1[k])) {
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