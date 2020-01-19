
export type Cond = (...ss: any[]) => boolean
export interface AnyObject {
  [k: string]: any
}
export type Reducer = <T>(accum: T, cur: any, index: number) => T
export type AnyFunc = (...args: any[]) => any