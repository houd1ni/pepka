import { AnyArgs } from "./internal_types"

export type Cond = (x1?: any, x2?: any, x3?: any) => boolean
export interface AnyObject extends Record<any, any> {}
export type Reducer<T=any> = (accum: T, cur: any, index: number) => T
export type AnyFunc<ReturnT = any, Args extends AnyArgs = AnyArgs> = (...args: Args) => ReturnT
export type Curried<Args extends AnyArgs = AnyArgs, ReturnT = any> = (arg: Args[number]) => Curried<Args> | ReturnT