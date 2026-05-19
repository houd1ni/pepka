import { curry2 } from "./curry"
import { AnyArray, StrLen } from "./internal_types"

export const length = <T extends AnyArray | string>(s: T): T extends string ? StrLen<T> : T['length'] => s.length as any
export const is_typed_arr = (x: any) => ArrayBuffer.isView(x)
/** @param start string | any[] @param s string | any[] */
export const startsWithWith = (comparator: (x: any, y: any)=>boolean) => curry2(
  (start: any[] | string, s: any[] | string) => {
    const len_start = length(start)
    const len_s = length(s)
    if(len_start>len_s) return false
    for(let i=0; i<len_start; i++) if(!comparator(s[i], start[i])) return false
    return true
  }
)