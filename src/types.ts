export type Cond = (x1?: any, x2?: any, x3?: any) => boolean
export interface AnyObject { [k: string]: any }
export type AnyArgs = any[]
export type Reducer<T=any> = (accum: T, cur: any, index: number) => T
export type AnyFunc<ReturnT = any, Args extends AnyArgs = AnyArgs> = (...args: Args) => ReturnT
export type TupleFn<ARG1=any, ARG2=any, Out=any> = (a: ARG1, b: ARG2) => Out
export type Curried<
  Args extends AnyArgs = AnyArgs,
  ReturnT = any
> = (arg: Args[number]) => Curried<Args> | ReturnT
export type BasicType = 'String'|'Object'|'Number'|'Symbol'|'Array'|'Null'|'Undefined'