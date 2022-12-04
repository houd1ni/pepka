export type Cond = (...xs: any[]) => boolean
export interface AnyObject {
  [k: string]: any
}
export type AnyArgs = any[]
export type Curried<
  Args extends AnyArgs = AnyArgs,
  ReturnT = any
> = (arg: Args[number]) => Curried<Args> | ReturnT
export type Reducer = <T>(accum: T, cur: any, index: number) => T
export type AnyFunc<
  ReturnT = any,
  Args extends AnyArgs = AnyArgs
> = (...args: Args) => ReturnT