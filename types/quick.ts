// Curried overload types for src/quick.ts functions.
// Overload order: curried forms first, full-arity LAST.
// This ensures Parameters<T>[N] resolves correctly for flip().

import type { AnyObject, AnyFunc, Reducer } from './base'

export type T_qappend = {
  <T>(s: T): (xs: T[]) => T[]
  <T>(s: T, xs: T[]): T[]
}

export type T_qassoc = {
  (prop: string): {
    (v: any, o: AnyObject): AnyObject
    (v: any): (o: AnyObject) => AnyObject
  }
  (prop: string, v: any): (o: AnyObject) => AnyObject
  (prop: string, v: any, o: AnyObject): AnyObject
}

export type T_qassocPath = {
  (_path: string[]): {
    (v: any, o: AnyObject): AnyObject
    (v: any): (o: AnyObject) => AnyObject
  }
  (_path: string[], v: any): (o: AnyObject) => AnyObject
  (_path: string[], v: any, o: AnyObject): AnyObject
}

export type T_qfilter = {
  (cond: (v: any, k: string | number) => boolean): <T extends any[] | AnyObject>(data: T) => T
  <T extends any[] | AnyObject>(cond: (v: any, k: string | number) => boolean, data: T): T
}

export type T_qmap = {
  <T, U>(pipe: (s: T, i?: number, list?: any) => U): (arr: T[]) => U[]
  <T, U>(pipe: (s: T, i?: number, list?: any) => U, arr: T[]): U[]
}

export type T_qmapKeys = {
  (
    keyMap: ((v: any, k: string, o: AnyObject) => string) | {[oldKey: string]: string | AnyFunc}
  ): (o: AnyObject) => AnyObject
  (
    keyMap: ((v: any, k: string, o: AnyObject) => string) | {[oldKey: string]: string | AnyFunc},
    o: AnyObject
  ): AnyObject
}

export type T_qmapObj = {
  (pipe: (s: any, k?: string, o?: AnyObject) => any): (o: AnyObject) => AnyObject
  (pipe: (s: any, k?: string, o?: AnyObject) => any, o: AnyObject): AnyObject
}

export type T_qmergeShallow = {
  (o1: AnyObject): (o2: AnyObject) => AnyObject
  (o1: AnyObject, o2: AnyObject): AnyObject
}

export type T_qomit = {
  (props: string[]): (o: AnyObject) => AnyObject
  (props: string[], o: AnyObject): AnyObject
}

export type T_qoverProp = {
  (prop: string): {
    (pipe: AnyFunc, data: any): any
    (pipe: AnyFunc): (data: any) => any
  }
  (prop: string, pipe: AnyFunc): (data: any) => any
  (prop: string, pipe: AnyFunc, data: any): any
}

export type T_qpick = {
  (props: string[]): (o: AnyObject) => AnyObject
  (props: string[], o: AnyObject): AnyObject
}

export type T_qprepend = {
  <T>(x: T): (xs: T[]) => number
  <T>(x: T, xs: T[]): number
}

export type T_qreduce = {
  <T>(fn: Reducer<T>): {
    (accum: T, arr: any[]): T
    (accum: T): (arr: any[]) => T
  }
  <T>(fn: Reducer<T>, accum: T): (arr: any[]) => T
  <T>(fn: Reducer<T>, accum: T, arr: any[]): T
}

export type T_qslice = {
  (from: number): {
    (to: number, xs: any[]): any[]
    (to: number, xs: string): string
    (to: number): (xs: any[] | string) => any[] | string
  }
  (from: number, to: number): (xs: any[] | string) => any[] | string
  (from: number, to: number, xs: any[]): any[]
  (from: number, to: number, xs: string): string
}

export type T_qsort = {
  <T>(sortFn: (a: T, b: T) => number): (xs: T[]) => T[]
  <T>(sortFn: (a: T, b: T) => number, xs: T[]): T[]
}

export type T_quniqWith = {
  <T>(getter: (x: T) => any): (xs: T[]) => T[]
  <T>(getter: (x: T) => any, xs: T[]): T[]
}