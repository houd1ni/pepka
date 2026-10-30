// Function-level overload types for list/array operations.

import type { FirstChar, Tail, LastChar } from './string'

export type HeadOverload = {
  <T extends string>(s: T): FirstChar<T>
  <T extends readonly any[]>(s: T): T extends readonly [] ? undefined
    : T extends readonly [infer U, ...any[]] ? U
      : T extends (infer Y)[] ? Y | undefined : any
}

export type TailOverload = {
  <T extends string>(s: T): Tail<T>
  <T extends readonly any[]>(s: T): T extends readonly [] ? []
    : T extends readonly [any, ...infer U] ? U : T
}

export type LastOverload = {
  <T extends string>(s: T): LastChar<T>
  <T extends readonly any[]>(s: T): T extends readonly [] ? undefined
    : T extends readonly [...any[], infer U] ? U
      : T extends (infer Y)[] ? Y | undefined : any
}

export type Concat = ((a: string, b: string) => string) | ((a: any[], b: any[]) => any[])