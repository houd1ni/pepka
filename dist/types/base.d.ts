export type AnyArgs = any[];
export type BasicType = 'String' | 'Object' | 'Number' | 'Symbol' | 'Array' | 'Null' | 'Undefined';
export type Falsey = false | 0 | '' | null | undefined | 0n;
export type AnyFunc<ReturnT = any, Args extends AnyArgs = AnyArgs> = (...args: Args) => ReturnT;
export interface AnyObject extends Record<any, any> {
}
export type Cond = (x1?: any, x2?: any, x3?: any) => boolean;
export type Reducer<T = any> = (accum: T, cur: any, index: number) => T;
export type Composed<TIn extends any[], TOut> = (...xs: TIn) => TOut;
export type Inverse<T> = T extends Falsey ? true : false;
export type TupleFn<ARG1 = any, ARG2 = any, Out = any> = (a: ARG1, b: ARG2) => Out;
export type IDArray = Uint8Array | Uint16Array | Uint32Array;
export type AnyArray<T = any> = T[] | readonly T[] | (ArrayBufferView & {
    length: number;
});
export type IndexesOfArray<A> = Exclude<keyof A, keyof []>;
export type PathValue<O, Keys extends readonly PropertyKey[], Default> = Keys extends [infer K, ...infer Rest] ? K extends keyof O ? Rest extends PropertyKey[] ? PathValue<O[K], Rest, Default> : Default : Default : O;
