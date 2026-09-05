import { AnyArray, AnyFunc, AnyObject, Composed, Cond, IndexesOfArray, Reducer } from '../types/base'
import type {
  T_all, T_allPass, T_any, T_anyPass, T_append, T_assoc, T_assocPath,
  T_bind, T_both, T_callWith, T_concat, T_cond, T_diff, T_filter, T_find,
  T_findIndex, T_flatTo, T_forEach, T_genBy, T_indexOf, T_intersection,
  T_join, T_map, T_mapKeys, T_mapObj, T_memoize, T_mergeDeep, T_mergeDeepAdd,
  T_mergeDeepX, T_mergeShallow, T_nth, T_omit, T_overProp, T_pathEq, T_pathOr,
  T_pathsEq, T_pick, T_pickBy, T_prepend, T_prop, T_propEq, T_propsEq,
  T_range, T_reduce, T_replace, T_slice, T_sort, T_split, T_tap, T_test,
  T_uniqWith, T_zip, T_zipObj, T_zipWith
} from '../types/safe'
import { Split } from '../types/string'
import { always, eq, equals, identity, includes, length, symbol, type } from './common'
import { __, curry, curry2, curry3 } from './curry'
import { inf, is_typed_arr, startsWithWith, undef } from './internal'
import {
  qappend, qfilter, qfreeze, qfreezeShallow, qmapKeys, qmapObj,
  qmergeDeep, qmergeDeepAdd, qmergeDeepX, qreduce
} from './quick'
import { isArray, isFunc, isNil, isNum, isObj } from './utils'
const {assign} = Object
// TODO: over, reduceAsync, propsEq is up to 20x slow due to deep equals.

/** Returns a function that takes N arguments and returns the argN-th one (0-indexed).
 * @param argN Index of the argument to return.
 * @returns A function that returns its argN-th argument. */
export const take = (argN: number) => (...args: any[]) => args[argN]
/** Conditional branching. If cond(s) is true, calls pipeYes(s), otherwise pipeNo(s).
 * @param cond Predicate function.
 * @param pipeYes Function to call when cond is true.
 * @param pipeNo Function to call when cond is false.
 * @param s Value to test and pass to the chosen branch. */
export const ifElse = curry(
  (
    cond: (s: any) => boolean,
    pipeYes: (s: any) => any,
    pipeNo: (s: any) => any,
    s: any
  ) => cond(s) ? pipeYes(s) : pipeNo(s)
)
/** Like ifElse but always passes through identity for the false branch.
 * @param cond Predicate function.
 * @param pipe Function to call when cond is true.
 * @param s Value to test and potentially transform. */
export const when = curry3(
  (
    cond: (s: any) => boolean,
    pipe: (s: any) => any,
    s: any
  ) => ifElse(cond, pipe, identity, s)
)
/** Right-to-left function composition. Last function receives all args, each subsequent
 * function receives the return value of the previous. Use __ placeholder to call a function with no args.
 * @param fns Functions to compose, right-to-left.
 * @returns A composed function. */
export const compose = (
  <TIn extends any[] = any[], TOut = any>(...fns: AnyFunc[]): Composed<TIn, TOut> =>
    (...args: TIn) => {
      let first = true
      let s: any
      for(let i = length(fns)-1; i>-1; i--) {
        if(first) {
          first = false
          s = fns[i](...args)
        } else
          s = s===__ ? fns[i]() : fns[i](s)
      }
      return s as any as TOut
    }
)
/** @param fn AnyFunc @param context any */
export const bind = curry2<AnyFunc>((fn: AnyFunc, context: any) => fn.bind(context)) as any as T_bind
/** Returns the element at index i of an array or the char at index i of a string.
 * @param i Index to access.
 * @param data Array or string to index into. */
export const nth = curry2((i: number, data: any) => data[i]) as any as T_nth
// FIXME: these types. Somewhere in curry2.
// const x = nth(0)([1,2,3])
// const y = nth(0)('123')
// const z = nth(0)(new Uint8Array([0,2,3]))
/** Returns a shallow copy of a portion of an array or string.
 * @param from Start index (inclusive).
 * @param to End index (exclusive). If not a number, slices to the end.
 * @param o Array or string to slice. */
export const slice = curry3(
  (from: number, to: number, o: any[] | string) =>
    o.slice(from, (isNum(to)?to:inf) as number)
) as any as T_slice
/** Reverses the argument order of a binary function. Not curried.
 * @param fn Binary function to flip.
 * @returns A curried function that calls fn(a, b) when given (b, a). */
export const flip = <T extends AnyFunc>(fn: T) => curry2(
  (b: Parameters<T>[1], a: Parameters<T>[0]) => fn(a, b)
)
type FirstChar<T extends string> = T extends `${infer First}${string}`
  ? Split<T>['length'] extends 1 ? T : FirstChar<First>
  : T
type HeadOverload = {
  <T extends string>(s: T): FirstChar<T>
  <T extends readonly any[]>(s: T): T extends Array<0> ? undefined
    : T extends readonly [infer U, ...any[]] ? U
      : T extends (infer Y)[] ? Y : any
  <T extends any>(s: T[]): null
}
/** @returns first element of an array or a string. */
export const head = nth(0) as HeadOverload
type Tail<T extends string> = T extends `${string}${infer Tail}`
  ? Tail : T extends '' ? '' : string
type TailOverload = {
  <T extends string>(s: T): Tail<T>
  <T extends readonly any[]>(s: T): T extends Array<0> ? []
    : T extends readonly [any, ...infer U] ? U : T
  <T extends any>(s: T[]): null
}
/** @returns all elements of an array or a string after first one. */
export const tail = slice(1, inf) as TailOverload
type LastChar<T extends string> = T extends `${string}${infer Rest}`
  ? (Split<T>['length'] extends 1 ? T : LastChar<Rest>) : T
type LastOverload = {
  <T extends string>(s: T): LastChar<T>
  <T extends readonly any[]>(s: T): T extends Array<0>
    ? undefined
    : T extends readonly [...any[], infer U] ? U
      : T extends (infer Y)[] ? Y : any
  <T extends any>(s: T[]): null
}
/** Returns last element of an array, readonly array or a string.
 * @param s Array to extract that element.
 * @returns undefined if s is empty or last element. */
export const last: LastOverload = (s: string | AnyArray) => (s as any)[length(s)-1]
/** @param a @param b @returns a+b  */
export const add = curry2((a: number, b: number) => a+b)
/** @param a @param b @returns b-a  */
export const subtract = curry2((a: number, b: number) => b-a)
/**@param a @param b @returns a×b  */
export const multiply = curry2((a: number, b: number) => a*b)
/** @param a @param b @returns a<b  */
export const gt = curry2( (a: number, b: number) => a<b )
/** @param a @param b @returns a>b  */
export const lt = curry2( (a: number, b: number) => a>b )
/** @param a @param b @returns a≤b  */
export const gte = curry2( (a: number, b: number) => a<=b )
/** @param a @param b @returns a≥b  */
export const lte = curry2( (a: number, b: number) => a>=b )
/** Returns a new sorted array (does not mutate the original).
 * @param sortFn Comparator function (a, b) => number.
 * @param xs Array to sort. */
export const sort = curry2((sortFn: (a: any, b: any) => number, xs: any[]) => [...xs].sort(sortFn)) as any as T_sort
/** Returns the first element that satisfies the predicate, or undefined.
 * @param fn Predicate function (value, index) => boolean.
 * @param s Array to search. */
export const find = curry2((fn: Cond, s: any[]) => s.find(fn)) as any as T_find
/** Returns the index of the first element that satisfies the predicate, or -1.
 * @param fn Predicate function (value, index) => boolean.
 * @param s Array to search. */
export const findIndex = curry2((fn: Cond, s: any[]) => s.findIndex(fn)) as any as T_findIndex
/** Returns the index of the first element deeply equal to x, or -1.
 * @param x Value to find.
 * @param xs Array to search. */
export const indexOf = curry2((x: any, xs: any[]) => findIndex(equals(x), xs)) as any as T_indexOf
/** Division with reversed params: returns b / a (curried).
 * @param a Divisor.
 * @param b Dividend. */
export const divide = curry2((a: number, b: number) => b/a)

type T_not = {
  (x: true): false
  (x: false): true
  (x: any): boolean
}
/** Logical negation.
 * @param x Value to negate. */
export const not: T_not = (x: any) => !x as any
type T_keys = {
  <T extends readonly any[]>(o: T): IndexesOfArray<T>[]
  <T extends any[]>(o: T): string[]
  <T extends AnyObject>(o: T): (keyof T)[]
}
/** Returns the keys of an object or array.
 * @param o Object or array to get keys from. */
export const keys: T_keys = (o: any) => Object.keys(o)
/** Returns the values of an object or array.
 * @param o Object or array to get values from. */
export const values = (o: AnyObject | any[]) => Object.values(o)
/** Returns the entries of an object or array as [key, value] pairs.
 * @param o Object or array to get entries from. */
export const toPairs = (o: AnyObject | any[]) => Object.entries(o)
/** Tests if a string matches a regex.
 * @param re RegExp to test with.
 * @param s String to test. */
export const test = curry2((re: RegExp, s: string) => re.test(s)) as any as T_test
/** Calls fn(x) for its side effect, then returns x unchanged.
 * @param fn Side-effect function.
 * @param x Value to pass to fn and return. */
export const tap = curry2(<T>(fn: AnyFunc, x: T): T => { fn(x); return x }) as any as T_tap
/** Returns a new array with x appended to the end.
 * @param x Element to append.
 * @param xs Source array. */
export const append = curry2((x: any, xs: any[]) => [...xs, x]) as any as T_append
/** Returns a new array with x prepended to the start.
 * @param x Element to prepend.
 * @param xs Source array. */
export const prepend = curry2((x: any, xs: any[]) => [x, ...xs]) as any as T_prepend
/** Flattens an array recursively (all levels).
 * @param xs Array to flatten. */
export const flat = (xs: any[]) => xs.flat(inf)
/** Flattens an array one level deep.
 * @param xs Array to flatten. */
export const flatShallow = (xs: any[]) => xs.flat()
/** Flattens an array to the specified depth.
 * @param depth Maximum depth to flatten.
 * @param xs Array to flatten. */
export const flatTo = curry2((depth: number, xs: any[]) => xs.flat(depth)) as any as T_flatTo
/** Splits a string by a separator or regex.
 * @param s Separator or RegExp.
 * @param xs String to split. */
export const split = curry2((s: string|RegExp, xs: string) => xs.split(s)) as any as T_split
/** Always returns true, ignoring all arguments. */
export const T = always<true>(true) as (...args: any[]) => true
/** Always returns false, ignoring all arguments. */
export const F = always<false>(false) as (...args: any[]) => false
/** Calls fn with the given arguments array spread as individual args.
 * @param args Arguments to pass to fn.
 * @param fn Function to call. */
export const callWith = curry2((args: any[], fn: AnyFunc) => fn(...args)) as any as T_callWith
/** A no-op function that accepts any arguments and returns undefined. */
export const noop = (()=>{}) as (...args: any[]) => any
/** Calls a func from object.
 * @param {any[]} args - arguments for the function.
 * @param {string} fnName - property name of the function.
 * @param {AnyObject} o - the object with the function. */
export const callFrom = curry((args: any[], fn: string, o: AnyObject) => o[fn](...args))
type T_complement<F extends AnyFunc> = {
  (...args: Parameters<F>): ReturnType<F> extends AnyFunc ? T_complement<ReturnType<F>> : boolean
}
// FIXME: complement(flip(includes)) -> one arg fn!
/** Returns a function that logically negates the result of fn. If fn is curried
 * and still has args left, returns a complemented curried function.
 * @param fn Function to complement.
 * @returns A function that returns the negation of fn's result. */
export const complement = <F extends AnyFunc>(fn: F): T_complement<F> => (...args: any[]): any => {
  const out = fn(...args)
  const f = isFunc(out)
  return (!f || !out.$args_left) ? not(out) : complement(out)
}
/** Returns the size of an array, string, or object (number of keys).
 * @param s Array, string, or object to measure. */
export const sizeof = (s: any[] | string | AnyObject) => {
  if(isObj(s)) {
    let len = 0
    for(let _k in s as AnyObject) len++
    return len
  } else return length(s as any[])
}
/** Generates an array of integers from `from` to `to` (exclusive).
 * @param from Start value (inclusive).
 * @param to End value (exclusive). */
export const range = curry2((from: number, to: number) => genBy(add(from), to-from)) as any as T_range
/** @param cond (x, y): bool @param xs any[] @returns xs without duplicates, using cond as a comparator.  */
export const uniqWith = curry2((cond: (x: any, y: any) => boolean, xs: any[]) => qreduce(
  <T>(accum: any, x: T) =>
    find((y) => cond(x as any, y), accum) ? accum : qappend(x, accum),
[], xs)) as any as T_uniqWith
/** @param xs any[] @returns xs without duplicates.  */
export const uniq = uniqWith(equals)
/** Returns elements of xs1 that also exist in xs2.
 * @param xs1 Source array.
 * @param xs2 Array to filter against. */
export const intersection = curry2(
  (xs1: any[], xs2: any[]) => xs1.filter((x: any) => includes(x, xs2))
) as any as T_intersection
/** Returns the symmetric difference of two arrays (elements in one but not both).
 * @param _xs1 First array.
 * @param _xs2 Second array. */
export const diff = curry2((_xs1: any[], _xs2: any[]) => {
  let len1 = length(_xs1)
  let len2 = length(_xs2)
  const xs1 = len1>len2 ? _xs1 : _xs2
  const xs2 = len1>len2 ? _xs2 : _xs1
  if(len1<len2) [len1, len2] = [len2, len1]
  const xset2 = new Set(xs2)
  const common = new Set()
  const out: any[] = []
  let i: number
  for(i=0; i<len1; i++) {
    const el = xs1[i]
    if(xset2.has(el)) common.add(el)
    else out.push(el)
  }
  for(i=0; i<len2; i++) {
    const el = xs2[i]
    if(!common.has(el)) out.push(el)
  }
  return out
}) as any as T_diff
/** Generates an array by calling generator(i) for each index 0..length-1.
 * @param generator Function that produces the value at each index.
 * @param length Number of elements to generate. */
export const genBy = curry2(
  (
    generator: (i: number) => any,
    length: number
  ) => {
    const a = new Array(length)
    for(let i=0; i<length; i++) a[i] = generator(i)
    return a
  }
) as any as T_genBy
/** Wraps fn so it only runs once; subsequent calls return the cached result.
 * @param fn Function to wrap. */
export const once = <Func extends AnyFunc>(fn: Func) => {
  let done = false, cache: ReturnType<Func>
  return function(...args: Parameters<Func>) {
    if(done) return cache
    done = true
    return cache = fn(...args) as ReturnType<Func>
  }
}
/** Returns a new array with elements in reverse order (does not mutate).
 * @param xs Array to reverse. */
export const reverse = <T extends any>(xs: T[]): T[] => xs.toReversed()
/** Logs a value with a caption, then returns it. Useful for debugging in compose chains.
 * @param caption Label for the console output.
 * @param level Console method to use (default 'log'). */
export const explore = (caption: string, level = 'log') => tap(
  (v: any) => (console as any)[level](caption, v)
)
/** Evaluates pairs of [predicate, fn] in order and returns the result of the first matching fn.
 * @param pairs Array of [predicate, fn] pairs.
 * @param s Value to test against predicates. */
export const cond = curry2(
  (pairs: [Cond, Function][], s: any) => {
    for(const [cond, fn] of pairs) if(cond(s)) return fn(s)
  }
) as any as T_cond
/** Assigns a prop to an object.
 * @param prop string
 * @param value any
 * @param object AnyObject
 */
export const assoc = curry3(
  (prop: string, v: any, obj: AnyObject) => ({...obj, [prop]: v})
) as any as T_assoc
/** Like assoc but for a nested path. Returns a new object with the path set to v.
 * @param _path Array of keys forming the path.
 * @param v Value to set.
 * @param o Source object. */
export const assocPath = curry3(
  (_path: string[], v: any, o: AnyObject) => compose(
    (first: string) => assoc(
      first,
      length(_path)<2
        ? v
        : assocPath(slice(1, inf, _path), v, isObj(o[first]) ? o[first] : {}),
      o
    ),
    head
  )(_path)
) as any as T_assocPath
/** Returns true if all elements satisfy the predicate.
 * @param pred Predicate function.
 * @param xs Array to test. */
export const all = curry2((pred: Cond, xs: any[]) => xs.every(pred)) as any as T_all
/** Returns true if any element satisfies the predicate.
 * @param pred Predicate function.
 * @param xs Array to test. */
export const any = curry2((pred: Cond, xs: any[]) => xs.some(pred)) as any as T_any
/** Returns true if x satisfies all predicates.
 * @param preds Array of predicate functions.
 * @param x Value to test. */
export const allPass = curry2((preds: Cond[], x: any) => preds.every((pred) => pred(x))) as any as T_allPass
/** Returns true if x satisfies any predicate.
 * @param preds Array of predicate functions.
 * @param x Value to test. */
export const anyPass = curry2((preds: Cond[], x: any) => preds.some((pred) => pred(x))) as any as T_anyPass
/** @param start string | any[] @param s string | any[] @description detects if `s` starts with `start` */
export const startsWith = startsWithWith(equals)
/** @param start string | any[] @param s string | any[] @description detects if `s` starts with `start` */
export const startsWithShallow = startsWithWith(eq)
// type PropGetter = <O extends AnyObject, k extends keyof O>(key: k, o: O) => O[k]
// type T_prop = <O extends AnyObject, k extends keyof O>{
//   (key: k, o: O): O[k]
//   (fn: AnyFunc): {
//     <T>(x: T): T
//     (): undefined
//   }
// }
//type PropGetterCurried = Curried<PropGetter>
/** @param key string @param o AnyObject @returns o[key] */
export const prop = curry2(((key: string, o: AnyObject) => o[key])) as any as T_prop
// const x = prop('q')
// const y = x({q: 9})
/** @param key string @param value any @param o AnyObject @returns boolean o[key] equals value */
export const propEq = curry3(
  (key: string, value: any, o: AnyObject) => equals(o[key], value)
) as any as T_propEq
/** @param key string @param o1 AnyObject @param o2 AnyObject @returns o₁[key] equals o₂[key] */
export const propsEq = curry3(
  (key: string, o1: any, o2: AnyObject) => equals(o1[key], o2[key])
) as any as T_propsEq
const _pathOr = (_default: any, path: (string | number)[], o: AnyObject) => length(path)
  ? isNil(o)
    ? _default
    : compose(
        (k) => k in o ? _pathOr(_default, slice(1, inf, path) as typeof path, o[k] as typeof o) : _default,
        head
      )(path)
  : o
/** Gets a value at a nested path, returning a default if any key is missing.
 * @param _default Default value if path doesn't exist.
 * @param _path Array of keys forming the path.
 * @param o Source object. */
export const pathOr = curry3(_pathOr) as any as T_pathOr
/** Gets a value at a nested path, or undefined if any key is missing.
 * @param _path Array of keys forming the path.
 * @param o Source object. */
export const path = pathOr(undef)
/** Returns true if the value at path equals value.
 * @param _path Array of keys forming the path.
 * @param value Value to compare against.
 * @param o Source object. */
export const pathEq = curry3(
  (_path: string[], value: any, o: AnyObject) => equals(path(_path, o), value)
) as any as T_pathEq
/** Returns true if the values at the same path in two objects are equal.
 * @param _path Array of keys forming the path.
 * @param o1 First object.
 * @param o2 Second object. */
export const pathsEq = curry3(
  (_path: string[], o1: AnyObject, o2: AnyObject) =>
    equals(path(_path, o1), path(_path, o2))
) as any as T_pathsEq
/** Returns true if the path exists in the object (is not the sentinel symbol).
 * @param _path Array of keys forming the path.
 * @param o Source object. */
export const pathExists = compose(ifElse(equals(symbol), F, T), pathOr(symbol)) as any as {
  (p: (string | number)[]): (o: AnyObject) => boolean
  (p: (string | number)[], o: AnyObject): boolean
}
/** Deep-clones a value (arrays, objects, typed arrays). Primitives are returned as-is.
 * @param s Value to clone.
 * @param shallow If true, only clones one level deep (default false). */
export const clone = <T extends any>(s: T, shallow = false): T => {
  const t = type(s)
  switch(t) {
    case 'Null': return s
    case 'Array': return (shallow ? [...(s as any[])] : map(compose(clone, take(0)), s as any[])) as T
    case 'Object':
      if(shallow) return {...s as AnyObject} as T
      const out: AnyObject = {}
      for(let k in s) out[k] = clone(s[k])
      return out as T
    case 'String': case 'Number':
    case 'Boolean': case 'Symbol':
      return s
    default:
      return is_typed_arr(s) ? (s as any).constructor.from(s) : s
  }
}
/** Shallow-clone alias for clone(s, true).
 * @param s Value to shallow-clone. */
export const cloneShallow = (s: any) => clone(s, true)
/** Deep-clones and then deep-freezes an object.
 * @param o Object to clone and freeze. */
export const freeze = <T extends AnyObject>(o: T): Readonly<T> => qfreeze(clone(o))
/** Shallow-clones and then shallow-freezes an object.
 * @param o Object to clone and freeze. */
export const freezeShallow = <T extends AnyObject>(o: T): Readonly<T> => qfreezeShallow(clone(o))

/** types T1, T2
 *  @param reducer (accum: T1, current: T2, index: number) => newAccum: T1
 *  @param accum T1
 *  @param array T2[]
*/
export const reduce = curry3(
  <T = any>(reducer: Reducer<T>, accum: T, arr: any[]) =>
    qreduce(reducer, clone(accum), arr)
) as any as T_reduce
/**
 *  @param props (string|number)[]
 *  @param o AnyObject
 *  @returns AnyObject
*/
export const pick = curry2(
  (props: (string|number)[], o: AnyObject) => {
    const out = {}
    for(const p of props) if(p in o) (out as any)[p] = o[p]
    return out
  }
) as any as T_pick
/** Picks properties from an object where cond(key) is true.
 * @param cond Predicate function (key) => boolean.
 * @param o Source object. */
export const pickBy = curry2(
  (cond: Cond, o: AnyObject) => compose((flip(pick) as any)(o), qfilter(cond), keys)(o)
) as any as T_pickBy
/** Returns a new object with the listed properties removed.
 * @param props Property names to omit.
 * @param o Source object. */
export const omit = curry2(
  (props: string[], o: AnyObject) => filter(
    (_: any, k: string | number) => !includes(k as string, props),
    o
  )
) as any as T_omit
/** Builds an object from an array of [key, value] pairs.
 * @param pairs Array of [key, value] entries. */
export const fromPairs = (pairs: [string, any][]) => Object.fromEntries(pairs)
type Concat = ((a: string, b: string) => string)
            | ((a: any[], b: any[]) => any[])
/** Concatenates two strings or arrays (reversed order: b.concat(a)).
 * @param a Value to append.
 * @param b String or array to append to. */
export const concat = curry2(
  ((a: any, b: string | any[]) => b.concat(a)) as Concat
) as any as T_concat
/** Maps a function over an array, returning a new array.
 * @param pipe Function (value, index, array) => new_value.
 * @param arr Array to map over. */
export const map = curry2(
  (pipe: (s: any, i?: number, list?: any[]) => any, arr: any[]) => arr.map(pipe)
) as any as T_map
/** Maps a function over an object's values, returning a new object with the same keys.
 * @param pipe Function (value, key, object) => new_value.
 * @param o Source object. */
export const mapObj = curry2(
  (pipe: (s: any, i?: string, list?: AnyObject) => any, o: AnyObject) => qmapObj(pipe, {...o})
) as any as T_mapObj
/** Joins array elements into a string with a delimiter.
 * @param delimeter Separator string.
 * @param arr Array-like with a join method. */
export const join = curry2(
  (delimeter: string, arr: ArrayLike<any>&{join: AnyFunc<string, [delim: string]>}) => arr.join(delimeter)
) as any as T_join
/** Iterates arr with pipe via Array.forEach (curried).
 * @param pipe Callback: (value, index, array) => void.
 * @param arr Source array.
 */
export const forEach = curry2(
  (pipe: (s: any, i: number, arr: any[]) => any, arr: any[]) => arr.forEach(pipe)
) as any as T_forEach
/** Returns true if both predicates return true for s (short-circuit AND).
 * @param cond1 First predicate.
 * @param cond2 Second predicate.
 * @param s Value to test. */
export const both = curry3((cond1: Cond, cond2: Cond, s: any) => cond2(s) && cond1(s)) as any as T_both
/** Returns true if the value is empty (empty string, array, or object).
 * @param s Value to check. */
export const isEmpty = (s: any) => {
  switch(type(s)) {
    case 'String': case 'Array': return length(s)==0
    case 'Object':
      for(const _k in s) return false
      return true
    default: return null
  }
}
/** Returns an empty value of the same type as s (string → '', array → [], object → {}).
 * @param s Value whose type determines the empty result. */
export const empty = (s: any) => {
  switch(type(s)) {
    case 'String': return ''
    case 'Object': return {}
    case 'Array': return []
    default: return undef
  }
}
/** Replaces matches of a pattern in a string.
 * @param a Pattern to match (string or RegExp).
 * @param b Replacement string or function.
 * @param where Source string. */
export const replace = curry3(
  (
    a: string | RegExp,
    b: string | ((substring: string, ...ps: any[]) => string),
    where: string
    // @ts-ignore Some bug with overload.
  ) => where.replace(a, b)
) as any as T_replace
// FIXME: it thinks cond is a symbol in usage !!!
/** Filters an array or object, keeping elements/entries where cond is true.
 * @param cond Predicate function (value, key) => boolean.
 * @param data Array or object to filter. */
export const filter = curry2(
  (
    cond: (v: any, k: string | number) => boolean,
    data: any[] | AnyObject
  ) => isArray(data)
    ? data.filter(cond)
    : qfilter(cond, {...data})
) as any as T_filter
/** Saves result of a function with given key and avoids calling it again.
 * @param {(...args: Args) string} keyGen that takes the same args and returns a key for the cache.
 * @param {(...args: Args) any} fn to be cached.
*/
export const memoize = curry2((
  keyGen: (...args: any[]) => string,
  fn: AnyFunc
) => {
  const cache: {[key in string]: any} = {}
  return (...args: any[]): any => {
    const key = keyGen(...args)
    if(key in cache) return cache[key]
    const res = fn(...args)
    cache[key] = res
    return res
  }
}) as any as T_memoize
/** Shallow-merges two objects into a new object.
 * @param o1 First object.
 * @param o2 Second object (overrides o1). */
export const mergeShallow = curry2(
  (o1: AnyObject, o2: AnyObject): AnyObject =>
    assign({}, o1, o2)
) as any as T_mergeShallow
/** Deep-merges two objects (non-destructive, clones o1 first).
 * @param a First object (cloned).
 * @param b Second object (merged into a, overrides). */
export const mergeDeep = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeep(clone(a), b) as AnyObject
) as any as T_mergeDeep
/** Deep-merges two objects with extra depth level (non-destructive).
 * @param a First object (cloned).
 * @param b Second object. */
export const mergeDeepX = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeepX(clone(a), b) as AnyObject
) as any as T_mergeDeepX
/** Deep-merges two objects with additive depth (non-destructive).
 * @param a First object (cloned).
 * @param b Second object. */
export const mergeDeepAdd = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeepAdd(clone(a), b) as AnyObject
) as any as T_mergeDeepAdd
/**
 * @param prop string
 * @param pipe(data[prop])
 * @param data any
 * @returns data with prop over pipe.
*/
export const overProp = curry3(
  (prop: string, pipe: AnyFunc, data: any) =>
    prop in data ? assoc(prop, pipe(data[prop]), data) : data
) as any as T_overProp
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const mapKeys = curry2(
  (
    keyMap: ((v: any, k: string, o: AnyObject) => string) | {[oldKey: string]: string | AnyFunc},
    o: AnyObject
  ) => qmapKeys(keyMap, assign({}, o))
) as any as T_mapKeys
/** Zips two arrays into pairs: [[a[0], b[0]], [a[1], b[1]], ...].
 * @param a First array.
 * @param b Second array. */
export const zip = curry2(
  <T1 = any, T2 = any>(a: T1[], b: T2[]) => map((s: T1, i?: number) => [s, b[i as number]], a)
) as any as T_zip
/** Zips two arrays into an object: {a[0]: b[0], a[1]: b[1], ...}.
 * @param a Array of keys.
 * @param b Array of values. */
export const zipObj = curry2(
  <T1 = any, T2 = any>(a: T1[], b: T2[]) =>
    reduce((ac: AnyObject, s: T1, i?: number) => assoc(s as string, b[i as number], ac), {}, a)
) as any as T_zipObj
// TODO: Tuple curried functions to replace these `AnyFuncs`.
/** zips through a pipe. Types T1, T2, T3.
 * @returns T3[]
 * @param pipe (T1, T2) => T3
 * @param a T1[]
 * @param b T2[]
 */
export const zipWith = curry3(
  <T1 = any, T2 = any>(pipe: AnyFunc, a: T1[], b: T2[]) =>
    map((s: T1, i?: number) => pipe(s, b[i as number]), a)
) as any as T_zipWith

// ALIASES
/** Alias of identity. Returns the argument unchanged. */
export const mirror = identity
/** Alias of identity. Returns the argument unchanged. */
export const reflect = identity
/** Alias of identity. Returns the argument unchanged. */
export const echo = identity
/** Alias of complement. Returns a negated version of the predicate.
 * @param fn Predicate function to negate.
 */
export const notf = complement
/** Alias of append. Appends an element to the end of an array (curried).
 * @param x Element to append.
 * @param xs Target array.
 */
export const push = append
/** Alias of any. Returns true if any element satisfies the predicate (curried).
 * @param pred Predicate function.
 * @param xs Array to check.
 */
export const some = any
/** Alias of eq. Reference equality check (curried).
 * @param a First value.
 * @param b Second value.
 */
export const weakEq = eq
/** Alias of uniqWith. Removes duplicates using a comparator (curried).
 * @param cond Comparator: (x, y) => boolean.
 * @param xs Source array.
 */
export const uniqBy = uniqWith
/** Alias of overProp. Maps a function over a property and returns a new object (curried).
 * @param key Property name.
 * @param fn Transform function.
 * @param o Source object.
 */
export const propLens = overProp