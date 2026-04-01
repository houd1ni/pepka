import { noop } from "./safe"
import { AnyFunc, AnyObject } from "./types"

export const undef = undefined
export const nul = null
export const inf = Infinity
export const not_assigned = Symbol()
export const to = (s: any) => typeof s
export const isNull = <T extends any>(s: T) => (s===nul) as T extends null ? true : false
export const isUndef = <T extends any>(s: T) => (s===undef) as T extends undefined ? true : false
export const isNum = <T extends any>(s: T) => (to(s)=='number') as T extends number ? true : false
export const isArray = <T extends any>(s: T) => (Array.isArray(s)) as T extends any[] ? true : false
export function isFunc<T extends AnyFunc>(value: T): true
export function isFunc(value: any): false
export function isFunc(s: any) { return to(s)==='function' }
export const isStr = <T extends any>(s: T) => (to(s)==='string') as T extends string ? true : false
export const isObj = <T extends any>(s: T) => (!isNull(s) && to(s)==='object') as T extends AnyObject ? true : false
export const isNil = <T extends any>(s: T) => (isNull(s) || isUndef(s)) as T extends (null|undefined) ? true : false

// TODO: add .then(), .finally() and .catch() to return QPromise.
export class QPromise<T> extends Promise<T> {
  private ff: AnyFunc
  private _cancel_data: any
  public cancel(resolve = false) {
    if(resolve) this.ff()
    this.oncancel(this._cancel_data)
  }
  constructor(fn: AnyFunc<any, [AnyFunc, AnyFunc, AnyFunc?]>, private oncancel = noop) {
    let _cancel_data: any = not_assigned
    super((ff, rj) => _cancel_data = fn(ff, rj))
    const set_cb = () => this._cancel_data=_cancel_data
    // @ts-ignore-next
    if(_cancel_data!==not_assigned) set_cb()
    else setTimeout(set_cb)
  }
}