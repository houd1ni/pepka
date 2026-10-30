// Curried overload types for src/common.ts functions.
// Overload order: curried forms first, full-arity LAST.
import type { AnyObject } from './base'

export type T_includes = {
  (s: string): (ss: string) => boolean
  <T>(s: T): (ss: readonly T[]) => boolean
  (s: string, ss: string): boolean
  <T>(s: T, ss: readonly T[]): boolean
}

export type TypeMap = {
  String: string
  Number: number
  Boolean: boolean
  Function: (...args: any[]) => any
  Array: any[]
  Object: AnyObject
  Date: Date
  RegExp: RegExp
  Null: null
  Undefined: undefined
}

export type T_typeIs = {
  <K extends keyof TypeMap>(t: K): (s: any) => s is TypeMap[K]
  (t: string): (s: any) => boolean
  <K extends keyof TypeMap>(t: K, s: any): s is TypeMap[K]
  (t: string, s: any): boolean
}

export type T_eq = {
  (a: any): (b: any) => boolean
  (a: any, b: any): boolean
}

export type T_equals = {
  (a: any): (b: any) => boolean
  (a: any, b: any): boolean
}