import { __, curry, curry2, curry3 } from './curry'
import { isNum, undef, isNull, isArray, isFunc, isObj, inf } from './utils'
import { qmergeDeep, qreduce, qappend, qmapKeys, qmergeDeepX, qmergeDeepAdd, qfilter, qfreeze, qfreezeShallow, qmapObj } from './quick'
import { AnyFunc, Cond, AnyObject, Reducer } from './types'
import { symbol, type, length, equals, includes, isNil, qstartsWithWith } from './common'
// over, lensProp

export const take = (argN: number) => (...args: any[]) => args[argN]
export const weakEq = curry2((a: any, b: any) => a==b)
export const ifElse = curry(
  (
    cond: (s: any) => boolean,
    pipeYes: (s: any) => any,
    pipeNo: (s: any) => any,
    s: any
  ) => cond(s) ? pipeYes(s) : pipeNo(s)
)
export const when = curry3(
  (
    cond: (s: any) => boolean,
    pipe: (s: any) => any,
    s: any
  ) => ifElse(cond, pipe, identity, s)
)
type Composed<TIn extends any[], TOut> = (...xs: TIn) => TOut
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
export const bind = curry2<AnyFunc>(
  (fn: AnyFunc, context: any) => fn.bind(context)
)
export const nth = curry2(<T=any>(i: number, data: T[] | string) => data[i])
export const slice = curry3(
  (from: number, to: number, o: any[] | string) =>
    o.slice(from, (isNum(to)?to:inf) as number)
)
export const flip = <T extends AnyFunc>(fn: T) => curry2(
  (b: Parameters<T>[1], a: Parameters<T>[0]) => fn(a, b)
)
/** @returns first element of an array. */
export const head = nth(0) as <T = any>(xs: T[] | string) => T
/** @returns last element of an array. */
export const tail = slice(1, inf)
/** @param a @param b @returns a+b  */
export const add = curry2((a: number, b: number) => a+b)
/** @param a @param b @returns b-a  */
export const subtract = curry2((a: number, b: number) => b-a)
/**@param a @param b @returns a*b  */
export const multiply = curry2((a: number, b: number) => a*b)
/** @param a @param b @returns a<b  */
export const gt = curry2( (a: number, b: number) => a<b )
/** @param a @param b @returns a>b  */
export const lt = curry2( (a: number, b: number) => a>b )
/** @param a @param b @returns a<=b  */
export const gte = curry2( (a: number, b: number) => a<=b )
/** @param a @param b @returns a>=b  */
export const lte = curry2( (a: number, b: number) => a>=b )
export const sort = curry2((sortFn: any, xs: any[]) => xs.sort(sortFn))
export const find = curry2((fn: Cond, s: any[]) => s.find(fn))
export const findIndex = curry2((fn: Cond, s: any[]) => s.findIndex(fn))
export const indexOf = curry2((x: any, xs: any[]) => findIndex(equals(x), xs))
export const divide = curry2((n: number, m: number) => n/m)
export const always = <T=any>(s: T) => () => s
export const identity = (s: any) => s
export const trim = (s: string) => s.trim()
export const last = (s: any[] | string) => s[length(s)-1]
/** @param start string | any[] @param s string | any[] */
export const startsWith = qstartsWithWith((x: any, y: any) => equals(x, y))
type NotOverload = {
  (x: true): false
  (x: false): true
  (x: any): boolean
}
export const not: NotOverload = (x: any) => !x as any
type IndexesOfArray<A> = Exclude<keyof A, keyof []>
type KeysOverload = {
  <T extends any[]>(o: T): string[]
  <T extends readonly any[]>(o: T): IndexesOfArray<T>[]
  <T extends AnyObject>(o: T): (keyof T)[]
}
export const keys: KeysOverload = (o: number[]) => Object.keys(o)

export const values = (o: AnyObject | any[]) => Object.values(o)
export const toPairs = (o: AnyObject | any[]) => Object.entries(o)
export const test = curry2((re: RegExp, s: string) => re.test(s))
export const tap = curry2((fn: Function, x: any) => { fn(x); return x })
export const append = curry2((x: any, xs: any[]) => [...xs, x])
export const prepend = curry2((x: any, xs: any[]) => [...xs, x])
export const flat = (xs: any[]) => xs.flat(inf)
export const flatShallow = (xs: any[]) => xs.flat()
export const flatTo = curry2((depth: number, xs: any[]) => xs.flat(depth))
export const split = curry2((s: string|RegExp, xs: string) => xs.split(s))
export const T = always<true>(true) as (...args: any[]) => true
export const F = always<false>(false) as (...args: any[]) => false
export const callWith = curry2((args: any[], fn: AnyFunc) => fn(...args))
export const noop = (()=>{}) as (...args: any[]) => any
/** Calls a func from object.
 * @param {any[]} [args] - arguments for the function.
 * @param {string} [fnName] - property name of the function.
 * @param {AnyObject} [o] - the object with the function. */
export const callFrom = curry((args: any[], fn: string, o: AnyObject) => o[fn](...args))
export const complement = (fn: AnyFunc) => (...args: any) => {
  const out = fn(...args)
  const f = isFunc(out)
  return !f || f&&out.$args_left<=0 ? not(out) : complement(out)
}
export const sizeof = (s: any[] | string | AnyObject) => {
  if(type(s) === 'Object') {
    let len = 0
    for(let _k in s as AnyObject) len++
    return len
  } else return length(s as any[])
}
export const range = curry2((from: number, to: number) => genBy(add(from), to-from))
/** @param xs any[] @returns xs without duplicates.  */
export const uniq = (xs: any[]) => qreduce(
  <T>(accum: any, x: T) =>
    find(equals(x), accum) ? accum : qappend(x, accum),
[], xs)
export const intersection = curry2(
  (xs1: any[], xs2: any[]) => xs1.filter(flip(includes)(xs2))
)
export const genBy = curry2(
  (
    generator: (i: number) => any,
    length: number
  ) => [...Array(length)].map((_, i) => generator(i))
)
export const once = <Func extends AnyFunc>(fn: Func) => {
  let done = false, cache: any
  return (...args: Parameters<Func>) => {
    if(done) return cache
    done = true
    return cache = fn(...args)
  }
}
export const reverse = (xs: any[]) => compose(
  <T>(ln: number) => reduce(
    (nxs: T[], _: any, i: number) => qappend(xs[ln-i], nxs),
    [], xs
  ),
  add(-1),
  length
)(xs)
export const explore = (caption: string, level = 'log') => tap(
  (v: any) => console[level](caption, v)
)
export const cond = curry2(
  (pairs: [Cond, Function][], s: any) => {
    for(const [cond, fn] of pairs) if(cond(s)) return fn(s)
  }
)
/** Assigns a prop to an object.
 * @param prop string
 * @param value any
 * @param object AnyObject
 */
export const assoc = curry3(
  (prop: string, v: any, obj: AnyObject) => ({...obj, [prop]: v})
)
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
)
export const all = curry2((pred: Cond, xs: any[]) => xs.every(pred))
export const any = curry2((pred: Cond, xs: any[]) => xs.some(pred))
export const allPass = curry2((preds: Cond[], x: any) => preds.every((pred) => pred(x)))
export const anyPass = curry2((preds: Cond[], x: any) => preds.some((pred) => pred(x)))
/** @param key string @param o AnyObject @returns o[key] */
export const prop = curry2((key: string, o: AnyObject) => o[key])
/** @param key string @param value any @param o AnyObject @returns o[key] equals value */
export const propEq = curry3(
  (key: string, value: any, o: AnyObject) => equals(o[key], value)
)
/** @param key string @param o1 AnyObject @param o2 AnyObject @returns o₁[key] equals o₂[key] */
export const propsEq = curry3(
  (key: string, o1: any, o2: AnyObject) => equals(o1[key], o2[key])
)
export const pathOr = curry3(
  (_default: any, path: (string | number)[], o: any) => length(path)
    ? isNil(o)
      ? _default
      : compose(
          (k) => k in o ? pathOr(_default, slice(1, inf, path), o[k]) : _default,
          head
        )(path)
    : o
)
export const path = pathOr(undef)
export const pathEq = curry3(
  (_path: string[], value: any, o: AnyObject) => equals(path(_path, o), value)
)
export const pathsEq = curry3(
  (_path: string[], o1: AnyObject, o2: AnyObject) =>
    equals(path(_path, o1), path(_path, o2))
)
export const pathExists = compose(ifElse(equals(symbol), F, T), pathOr(symbol))
const typed_arr_re = /^(.*?)(8|16|32|64)(Clamped)?Array$/
export const clone = (s: any, shallow = false) => {
  const t = type(s)
  switch(t) {
    case 'Null': return s
    case 'Array': return shallow ? [...s] : map(compose(clone, take(0)), s)
    case 'Object':
      if(shallow) return {...s}
      const out = {}
      for(let k in s) out[k] = clone(s[k])
      return out
    case 'String': case 'Number':
    case 'Boolean': case 'Symbol':
      return s
    default:
      return typed_arr_re.test(t) ? s.constructor.from(s) : s
  }
}
export const cloneShallow = (s: any) => clone(s, true)
export const freeze = <T extends AnyObject>(o: T): Readonly<T> => qfreeze(clone(o))
export const freezeShallow = <T extends AnyObject>(o: T): Readonly<T> => qfreezeShallow(clone(o))

/** types T1, T2
 *  @param reducer (accum: T1, current: T2, index: number) => newAccum: T1
 *  @param accum T1
 *  @param array T2[]
*/
export const reduce = curry3(
  <T = any>(reducer: Reducer<T>, accum: T, arr: any[]) =>
    qreduce(reducer, clone(accum), arr)
)
export const pickBy = curry2(
  (cond: Cond, o: AnyObject) => filter(cond, o)
)
export const pick = curry2(
  (props: string[], o: AnyObject) => {
    const out = {}
    for(const p of props)
      if(p in o) out[p] = o[p]
    return out
  }
)
export const omit = curry2(
  (props: string[], o: AnyObject) => filter(
    (_: any, k: string) => !includes(k, props),
    o
  )
)
export const fromPairs = (pairs: [string, any][]) => Object.fromEntries(pairs)
type Concat = ((a: string, b: string) => string)
            | ((a: any[], b: any[]) => any[])
export const concat = curry2(
  ((a: any, b: string | any[]) => b.concat(a)) as Concat
)
export const map = curry2(
  (pipe: (s: any, i?: number, list?: any[]) => any, arr: any[]) => arr.map(pipe)
)
export const mapObj = curry2(
  (pipe: (s: any, i?: string, list?: any[]) => any, o: AnyObject) => qmapObj(pipe, cloneShallow(o))
)
export const join = curry2((delimeter: string, arr: string[]) => arr.join(delimeter))
export const forEach = curry2((pipe: (s: any) => any, arr: any[]) => arr.forEach(pipe))
export const both = curry3((cond1: Cond, cond2: Cond, s: any) => cond2(s) && cond1(s))
export const isEmpty = (s: any) => {
  switch(type(s)) {
    case 'String': case 'Array': return length(s)==0
    case 'Object':
      for(const _k in s) return false
      return true
    default: return null
  }
}
export const empty = (s: any) => {
  switch(type(s)) {
    case 'String': return ''
    case 'Object': return {}
    case 'Array': return []
    default: return undef
  }
}
export const replace = curry3(
  (
    a: string | RegExp,
    b: string | ((substring: string, ...ps: any[]) => string),
    where: string
    // @ts-ignore Some bug with overload.
  ) => where.replace(a, b)
)
// FIXME: it thinks cond is a symbol in usage !!!
export const filter = curry2(
  (
    cond: (v: any, k: string | number) => boolean,
    data: any[] | AnyObject
  ) => isArray(data)
    ? data.filter(cond)
    : qfilter(cond, {...data})
)
export const memoize = (fn: Function) => {
  let cache: any
  let cached = false
  return () => cached ? cache : (cached = true, cache = fn())
}
export const mergeShallow = curry2(
  (o1: AnyObject, o2: AnyObject): AnyObject =>
    Object.assign({}, o1, o2)
)
export const mergeDeep = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeep(clone(a), clone(b)) as AnyObject
)
export const mergeDeepX = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeepX(clone(a), clone(b)) as AnyObject
)
export const mergeDeepAdd = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeepAdd(clone(a), clone(b)) as AnyObject
)
export const overProp = curry3(
  (prop: string, pipe: AnyFunc, data: any) =>
    assoc(prop, pipe(data[prop]), data)
)
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const mapKeys = curry2(
  (
    keyMap: {[oldKey: string]: string | AnyFunc},
    o: AnyObject
  ) => qmapKeys(keyMap, Object.assign({}, o))
)
export const zip = curry2(
  <T1 = any, T2 = any>(a: T1[], b: T2[]) => map((s: T1, i: number) => [s, b[i]], a)
)
export const zipObj = curry2(
  <T1 = any, T2 = any>(a: T1[], b: T2[]) =>
    reduce((ac: AnyObject, s: T1, i: number) => assoc(s, b[i], ac), {}, a)
)
// TODO: Tuple curried functions to replace these `AnyFuncs`.
/** zips through a pipe. Types T1, T2, T3.
 * @returns T3[]
 * @param pipe (T1, T2) => T3
 * @param a T1[]
 * @param b T2[]
 */
export const zipWith = curry3(
  <T1 = any, T2 = any>(pipe: AnyFunc, a: T1[], b: T2[]) =>
    map((s: T1, i: number) => pipe(s, b[i]), a)
)

// Reexport safe stuff that is ready to use externally. 
export { toLower, toUpper, type, typeIs, length, isNil, eq, equals, includes } from './common'

// ALIASES
export const mirror = identity
export const reflect = identity
export const echo = identity
export const notf = complement
export const push = append
export const some = any