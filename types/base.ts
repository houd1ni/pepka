// Foundational type aliases used across all pepka modules.

export type AnyArgs = any[]
export type BasicType = 'String' | 'Object' | 'Number' | 'Symbol' | 'Array' | 'Null' | 'Undefined'
export type Falsey = false | 0 | '' | null | undefined | 0n

export type AnyFunc<ReturnT = any, Args extends AnyArgs = AnyArgs> = (...args: Args) => ReturnT
export interface AnyObject extends Record<any, any> {}
export type Cond = (x1?: any, x2?: any, x3?: any) => boolean
export type Reducer<T = any> = (accum: T, cur: any, index: number) => T
export type Composed<TIn extends any[], TOut> = (...xs: TIn) => TOut
/** What a step may answer: `composeAsync` awaits it before handing it on. */
export type Unwrap<T> = T extends Promise<infer U> ? U : T
export type LastOf<Fns extends readonly any[]> = Fns extends readonly [...any[], infer Last] ? Last : never
/** What a chain takes and answers, for any number of steps: the rightmost step's parameters in, the leftmost step's
 *  return out. */
export type ComposedOf<Fns extends readonly AnyFunc[]> = Fns extends readonly [infer Head extends AnyFunc, ...AnyFunc[]]
  ? (...xs: Parameters<Extract<LastOf<Fns>, AnyFunc>>) => ReturnType<Head>
  : never
/** Step by step: each one answers what the step above it takes, either way round — an overloaded step (`head`,
 *  `tail`) names one parameter at a time, so `any`-shaped matches count. A link nothing fits is `never`. */
export type Links<Fns extends readonly AnyFunc[]> =
  Fns extends readonly [infer A extends AnyFunc, infer B extends AnyFunc, ...infer Rest extends readonly AnyFunc[]]
    ? [ReturnType<B>] extends [Parameters<A>[0]]
      ? [A, ...Links<[B, ...Rest]>]
      : [Parameters<A>[0]] extends [ReturnType<B>] ? [A, ...Links<[B, ...Rest]>] : never
    : Fns
/** A chain answers what its leftmost step answers, and takes what its rightmost step takes.
 *  Every count from one to seventeen names its own type for each link, so a step that is generic (`waitAll`) is
 *  inferred at its place in the chain instead of widening to `unknown`. */
export type T_compose = {
  <A extends AnyArgs, R>(f: (a1: A[0]) => R): (...xs: A) => R
  <A extends AnyArgs, B1, R>(
    f1: (b: B1) => R, f2: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, R>(
    f1: (b: B2) => R, f2: (b: B1) => B2, f3: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, R>(
    f1: (b: B3) => R, f2: (b: B2) => B3, f3: (b: B1) => B2,
    f4: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, R>(
    f1: (b: B4) => R, f2: (b: B3) => B4, f3: (b: B2) => B3,
    f4: (b: B1) => B2, f5: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, R>(
    f1: (b: B5) => R, f2: (b: B4) => B5, f3: (b: B3) => B4,
    f4: (b: B2) => B3, f5: (b: B1) => B2, f6: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, R>(
    f1: (b: B6) => R, f2: (b: B5) => B6, f3: (b: B4) => B5,
    f4: (b: B3) => B4, f5: (b: B2) => B3, f6: (b: B1) => B2,
    f7: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, R>(
    f1: (b: B7) => R, f2: (b: B6) => B7, f3: (b: B5) => B6,
    f4: (b: B4) => B5, f5: (b: B3) => B4, f6: (b: B2) => B3,
    f7: (b: B1) => B2, f8: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, R>(
    f1: (b: B8) => R, f2: (b: B7) => B8, f3: (b: B6) => B7,
    f4: (b: B5) => B6, f5: (b: B4) => B5, f6: (b: B3) => B4,
    f7: (b: B2) => B3, f8: (b: B1) => B2, f9: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, R>(
    f1: (b: B9) => R, f2: (b: B8) => B9, f3: (b: B7) => B8,
    f4: (b: B6) => B7, f5: (b: B5) => B6, f6: (b: B4) => B5,
    f7: (b: B3) => B4, f8: (b: B2) => B3, f9: (b: B1) => B2,
    f10: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, R>(
    f1: (b: B10) => R, f2: (b: B9) => B10, f3: (b: B8) => B9,
    f4: (b: B7) => B8, f5: (b: B6) => B7, f6: (b: B5) => B6,
    f7: (b: B4) => B5, f8: (b: B3) => B4, f9: (b: B2) => B3,
    f10: (b: B1) => B2, f11: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, R>(
    f1: (b: B11) => R, f2: (b: B10) => B11, f3: (b: B9) => B10,
    f4: (b: B8) => B9, f5: (b: B7) => B8, f6: (b: B6) => B7,
    f7: (b: B5) => B6, f8: (b: B4) => B5, f9: (b: B3) => B4,
    f10: (b: B2) => B3, f11: (b: B1) => B2, f12: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, R>(
    f1: (b: B12) => R, f2: (b: B11) => B12, f3: (b: B10) => B11,
    f4: (b: B9) => B10, f5: (b: B8) => B9, f6: (b: B7) => B8,
    f7: (b: B6) => B7, f8: (b: B5) => B6, f9: (b: B4) => B5,
    f10: (b: B3) => B4, f11: (b: B2) => B3, f12: (b: B1) => B2,
    f13: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, R>(
    f1: (b: B13) => R, f2: (b: B12) => B13, f3: (b: B11) => B12,
    f4: (b: B10) => B11, f5: (b: B9) => B10, f6: (b: B8) => B9,
    f7: (b: B7) => B8, f8: (b: B6) => B7, f9: (b: B5) => B6,
    f10: (b: B4) => B5, f11: (b: B3) => B4, f12: (b: B2) => B3,
    f13: (b: B1) => B2, f14: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, R>(
    f1: (b: B14) => R, f2: (b: B13) => B14, f3: (b: B12) => B13,
    f4: (b: B11) => B12, f5: (b: B10) => B11, f6: (b: B9) => B10,
    f7: (b: B8) => B9, f8: (b: B7) => B8, f9: (b: B6) => B7,
    f10: (b: B5) => B6, f11: (b: B4) => B5, f12: (b: B3) => B4,
    f13: (b: B2) => B3, f14: (b: B1) => B2, f15: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, R>(
    f1: (b: B15) => R, f2: (b: B14) => B15, f3: (b: B13) => B14,
    f4: (b: B12) => B13, f5: (b: B11) => B12, f6: (b: B10) => B11,
    f7: (b: B9) => B10, f8: (b: B8) => B9, f9: (b: B7) => B8,
    f10: (b: B6) => B7, f11: (b: B5) => B6, f12: (b: B4) => B5,
    f13: (b: B3) => B4, f14: (b: B2) => B3, f15: (b: B1) => B2,
    f16: (...xs: A) => B1
  ): (...xs: A) => R
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, R>(
    f1: (b: B16) => R, f2: (b: B15) => B16, f3: (b: B14) => B15,
    f4: (b: B13) => B14, f5: (b: B12) => B13, f6: (b: B11) => B12,
    f7: (b: B10) => B11, f8: (b: B9) => B10, f9: (b: B8) => B9,
    f10: (b: B7) => B8, f11: (b: B6) => B7, f12: (b: B5) => B6,
    f13: (b: B4) => B5, f14: (b: B3) => B4, f15: (b: B2) => B3,
    f16: (b: B1) => B2, f17: (...xs: A) => B1
  ): (...xs: A) => R
  /** eighteen steps and up: the same links, judged one pair at a time, so a long chain is not `any` */
  <Fns extends LongChain>(...fns: Fns & Links<Fns>): ComposedOf<Fns>
}
/** The same, but every step may answer a promise and so does the chain. */
export type T_composeAsync = {
  <A extends AnyArgs, R>(f: (a1: A[0]) => R): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, R>(
    f1: (b: Unwrap<B1>) => R, f2: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, R>(
    f1: (b: Unwrap<B2>) => R, f2: (b: Unwrap<B1>) => B2, f3: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, R>(
    f1: (b: Unwrap<B3>) => R, f2: (b: Unwrap<B2>) => B3, f3: (b: Unwrap<B1>) => B2,
    f4: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, R>(
    f1: (b: Unwrap<B4>) => R, f2: (b: Unwrap<B3>) => B4, f3: (b: Unwrap<B2>) => B3,
    f4: (b: Unwrap<B1>) => B2, f5: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, R>(
    f1: (b: Unwrap<B5>) => R, f2: (b: Unwrap<B4>) => B5, f3: (b: Unwrap<B3>) => B4,
    f4: (b: Unwrap<B2>) => B3, f5: (b: Unwrap<B1>) => B2, f6: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, R>(
    f1: (b: Unwrap<B6>) => R, f2: (b: Unwrap<B5>) => B6, f3: (b: Unwrap<B4>) => B5,
    f4: (b: Unwrap<B3>) => B4, f5: (b: Unwrap<B2>) => B3, f6: (b: Unwrap<B1>) => B2,
    f7: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, R>(
    f1: (b: Unwrap<B7>) => R, f2: (b: Unwrap<B6>) => B7, f3: (b: Unwrap<B5>) => B6,
    f4: (b: Unwrap<B4>) => B5, f5: (b: Unwrap<B3>) => B4, f6: (b: Unwrap<B2>) => B3,
    f7: (b: Unwrap<B1>) => B2, f8: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, R>(
    f1: (b: Unwrap<B8>) => R, f2: (b: Unwrap<B7>) => B8, f3: (b: Unwrap<B6>) => B7,
    f4: (b: Unwrap<B5>) => B6, f5: (b: Unwrap<B4>) => B5, f6: (b: Unwrap<B3>) => B4,
    f7: (b: Unwrap<B2>) => B3, f8: (b: Unwrap<B1>) => B2, f9: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, R>(
    f1: (b: Unwrap<B9>) => R, f2: (b: Unwrap<B8>) => B9, f3: (b: Unwrap<B7>) => B8,
    f4: (b: Unwrap<B6>) => B7, f5: (b: Unwrap<B5>) => B6, f6: (b: Unwrap<B4>) => B5,
    f7: (b: Unwrap<B3>) => B4, f8: (b: Unwrap<B2>) => B3, f9: (b: Unwrap<B1>) => B2,
    f10: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, R>(
    f1: (b: Unwrap<B10>) => R, f2: (b: Unwrap<B9>) => B10, f3: (b: Unwrap<B8>) => B9,
    f4: (b: Unwrap<B7>) => B8, f5: (b: Unwrap<B6>) => B7, f6: (b: Unwrap<B5>) => B6,
    f7: (b: Unwrap<B4>) => B5, f8: (b: Unwrap<B3>) => B4, f9: (b: Unwrap<B2>) => B3,
    f10: (b: Unwrap<B1>) => B2, f11: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, R>(
    f1: (b: Unwrap<B11>) => R, f2: (b: Unwrap<B10>) => B11, f3: (b: Unwrap<B9>) => B10,
    f4: (b: Unwrap<B8>) => B9, f5: (b: Unwrap<B7>) => B8, f6: (b: Unwrap<B6>) => B7,
    f7: (b: Unwrap<B5>) => B6, f8: (b: Unwrap<B4>) => B5, f9: (b: Unwrap<B3>) => B4,
    f10: (b: Unwrap<B2>) => B3, f11: (b: Unwrap<B1>) => B2, f12: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, R>(
    f1: (b: Unwrap<B12>) => R, f2: (b: Unwrap<B11>) => B12, f3: (b: Unwrap<B10>) => B11,
    f4: (b: Unwrap<B9>) => B10, f5: (b: Unwrap<B8>) => B9, f6: (b: Unwrap<B7>) => B8,
    f7: (b: Unwrap<B6>) => B7, f8: (b: Unwrap<B5>) => B6, f9: (b: Unwrap<B4>) => B5,
    f10: (b: Unwrap<B3>) => B4, f11: (b: Unwrap<B2>) => B3, f12: (b: Unwrap<B1>) => B2,
    f13: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, R>(
    f1: (b: Unwrap<B13>) => R, f2: (b: Unwrap<B12>) => B13, f3: (b: Unwrap<B11>) => B12,
    f4: (b: Unwrap<B10>) => B11, f5: (b: Unwrap<B9>) => B10, f6: (b: Unwrap<B8>) => B9,
    f7: (b: Unwrap<B7>) => B8, f8: (b: Unwrap<B6>) => B7, f9: (b: Unwrap<B5>) => B6,
    f10: (b: Unwrap<B4>) => B5, f11: (b: Unwrap<B3>) => B4, f12: (b: Unwrap<B2>) => B3,
    f13: (b: Unwrap<B1>) => B2, f14: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, R>(
    f1: (b: Unwrap<B14>) => R, f2: (b: Unwrap<B13>) => B14, f3: (b: Unwrap<B12>) => B13,
    f4: (b: Unwrap<B11>) => B12, f5: (b: Unwrap<B10>) => B11, f6: (b: Unwrap<B9>) => B10,
    f7: (b: Unwrap<B8>) => B9, f8: (b: Unwrap<B7>) => B8, f9: (b: Unwrap<B6>) => B7,
    f10: (b: Unwrap<B5>) => B6, f11: (b: Unwrap<B4>) => B5, f12: (b: Unwrap<B3>) => B4,
    f13: (b: Unwrap<B2>) => B3, f14: (b: Unwrap<B1>) => B2, f15: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, R>(
    f1: (b: Unwrap<B15>) => R, f2: (b: Unwrap<B14>) => B15, f3: (b: Unwrap<B13>) => B14,
    f4: (b: Unwrap<B12>) => B13, f5: (b: Unwrap<B11>) => B12, f6: (b: Unwrap<B10>) => B11,
    f7: (b: Unwrap<B9>) => B10, f8: (b: Unwrap<B8>) => B9, f9: (b: Unwrap<B7>) => B8,
    f10: (b: Unwrap<B6>) => B7, f11: (b: Unwrap<B5>) => B6, f12: (b: Unwrap<B4>) => B5,
    f13: (b: Unwrap<B3>) => B4, f14: (b: Unwrap<B2>) => B3, f15: (b: Unwrap<B1>) => B2,
    f16: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  <A extends AnyArgs, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, R>(
    f1: (b: Unwrap<B16>) => R, f2: (b: Unwrap<B15>) => B16, f3: (b: Unwrap<B14>) => B15,
    f4: (b: Unwrap<B13>) => B14, f5: (b: Unwrap<B12>) => B13, f6: (b: Unwrap<B11>) => B12,
    f7: (b: Unwrap<B10>) => B11, f8: (b: Unwrap<B9>) => B10, f9: (b: Unwrap<B8>) => B9,
    f10: (b: Unwrap<B7>) => B8, f11: (b: Unwrap<B6>) => B7, f12: (b: Unwrap<B5>) => B6,
    f13: (b: Unwrap<B4>) => B5, f14: (b: Unwrap<B3>) => B4, f15: (b: Unwrap<B2>) => B3,
    f16: (b: Unwrap<B1>) => B2, f17: (...xs: A) => B1
  ): (...xs: A) => Promise<Unwrap<R>>
  /** the same for a long chain */
  <Fns extends LongChain>(...fns: Fns & Links<Fns>):
    ComposedOf<Fns> extends (...xs: infer A) => infer R ? (...xs: A) => Promise<Unwrap<R>> : never
}
/** what a chain of eighteen or more steps is matched against */
export type LongChain = readonly [
  AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc,
  AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, AnyFunc, ...AnyFunc[]
]
export type Inverse<T> = T extends Falsey ? true : false
export type TupleFn<ARG1 = any, ARG2 = any, Out = any> = (a: ARG1, b: ARG2) => Out
export type IDArray = Uint8Array | Uint16Array | Uint32Array
export type AnyArray<T = any> = T[] | readonly T[] | (ArrayBufferView & { length: number })
export type IndexesOfArray<A> = Exclude<keyof A, keyof []>

export type PathValue<O, Keys extends readonly PropertyKey[], Default> =
  Keys extends [infer K, ...infer Rest]
    ? K extends keyof O
      ? Rest extends PropertyKey[]
        ? PathValue<O[K], Rest, Default>
        : Default
      : Default
    : O
