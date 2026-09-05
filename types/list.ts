// Function-level overload types for list/array operations.

import type { FirstChar, Tail, LastChar } from './string'

export type HeadOverload = {
  <T extends string>(s: T): FirstChar<T>
  <T extends readonly any[]>(s: T): T extends Array<0> ? undefined
    : T extends readonly [infer U, ...any[]] ? U
      : T extends (infer Y)[] ? Y : any
  <T extends any>(s: T[]): null
}

export type TailOverload = {
  <T extends string>(s: T): Tail<T>
  <T extends readonly any[]>(s: T): T extends Array<0> ? []
    : T extends readonly [any, ...infer U] ? U : T
  <T extends any>(s: T[]): null
}

export type LastOverload = {
  <T extends string>(s: T): LastChar<T>
  <T extends readonly any[]>(s: T): T extends Array<0>
    ? undefined
    : T extends readonly [...any[], infer U] ? U
      : T extends (infer Y)[] ? Y : any
  <T extends any>(s: T[]): null
}

export type Concat = ((a: string, b: string) => string) | ((a: any[], b: any[]) => any[])