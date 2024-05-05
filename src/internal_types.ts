export type AnyArgs = any[]
export type BasicType = 'String'|'Object'|'Number'|'Symbol'|'Array'|'Null'|'Undefined'
export type TupleFn<ARG1=any, ARG2=any, Out=any> = (a: ARG1, b: ARG2) => Out
export type IDArray = Uint8Array|Uint16Array|Uint32Array
export type AnyArray<T=any> = T[] | readonly T[]
export type Split<S extends string> = S extends `${infer U}${infer V}` ? [U, ...Split<V>] : []
export type IndexesOfArray<A> = Exclude<keyof A, keyof []>
export type StrLen<S extends string, Acc extends 0[] = []> =
  S extends `${string}${infer Rest}`
    ? StrLen<Rest, [...Acc, 0]>
    : Acc["length"]