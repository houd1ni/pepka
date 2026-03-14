import { AnyArgs } from "./internal_types"

type Falsey = false | 0 | '' | null | undefined | 0n

export type Cond = (x1?: any, x2?: any, x3?: any) => boolean
export interface AnyObject extends Record<any, any> {}
export type Reducer<T=any> = (accum: T, cur: any, index: number) => T
export type AnyFunc<ReturnT = any, Args extends AnyArgs = AnyArgs> = (...args: Args) => ReturnT
export type Curried<Args extends AnyArgs = AnyArgs, ReturnT = any> = (arg: Args[number]) => Curried<Args> | ReturnT
export type Composed<TIn extends any[], TOut> = (...xs: TIn) => TOut
export type Inverse<T> = T extends Falsey ? true : false
export type PathValue<O, Keys extends readonly PropertyKey[], Default> =
  Keys extends [infer K, ...infer Rest]
    ? K extends keyof O
      ? Rest extends PropertyKey[]
        ? PathValue<O[K], Rest, Default>
        : Default
      : Default
    : O