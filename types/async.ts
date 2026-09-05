// Type-level definitions for async & timer functions.

import type { AnyFunc, AnyObject, Composed } from './base'

export type T_composeAsync = <TIn extends any[] = any[], TOut = any>(...fns: AnyFunc[]) => Composed<TIn, Promise<TOut>>

export type T_debounce = <T extends AnyFunc>(time: number, fn: T) =>
  (...args: Parameters<T>) => Promise<ReturnType<T>>

export type T_throttle = <T extends AnyFunc>(time: number, fn: T) =>
  (...args: Parameters<T>) => ReturnType<T>

export type T_qfilterAsync = {
  <T extends any[] | AnyObject>(
    cond: (v: any, k: string | number) => Promise<boolean> | boolean,
    data: T
  ): Promise<T>
  (
    cond: (v: any, k: string | number) => Promise<boolean> | boolean
  ): <T extends any[] | AnyObject>(data: T) => Promise<T>
}

export type T_waitTap = {
  (fn: AnyFunc<Promise<any>>, s: any): Promise<any>
  (fn: AnyFunc<Promise<any>>): (s: any) => Promise<any>
}

export type T_forEachParallel = {
  (fn: AnyFunc<Promise<any>>, s: any[]): Promise<any[]>
  (fn: AnyFunc<Promise<any>>): (s: any[]) => Promise<any[]>
}