import { __, curry, curry2, curry3 } from './curry'
import { isNum, isUndef, undef, isNull, isArray, isFunc, isStr, isObj, inf } from './utils'
import { qmergeDeep, qreduce, qappend, qmapKeys, qmergeDeepX, qmergeDeepAdd } from './quick'
import { AnyFunc, Cond, AnyObject, Reducer } from './types'
import { type } from './common'
import { F as FT, U } from 'ts-toolbelt'
// over, lensProp

export const equals = curry2((a: any, b: any) => {
  const typea = type(a)
  if(typea===type(b) && (typea==='Object' || typea=='Array')) {
    if(isNull(a) || isNull(b)) {
      return a===b
    }
    if(a===b) {
      return true
    }
    for(const v of [a, b]) {
      for(const k in v) {
        if(
          !((v===b) && (k in a)) &&
          !((v===a) && (k in b) && equals(a[k], b[k]))
        ) {
          return false
        }
      }
    }
    return true
  }
  return a===b
})
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
export const compose: FT.Compose = (
  (...fns: AnyFunc[]) =>
    (s: any = __) => {
      for(let i = length(fns)-1; i>-1; i--) {
        s = s===__ ? fns[i]() : fns[i](s)
      }
      return s
    }
)

export const bind = curry2<AnyFunc>(
  (fn: AnyFunc, context: any) => fn.bind(context)
)

const _nth = <T=any>(i: number, data: T[] | string) => data[i]
export const nth = curry2(_nth)

export const includes = curry2(
  <T>(s: T, ss: T[]) => {
    if(isStr(ss)) {
      return ss.includes(s)
    } else {
      for(const a of ss) {
        if(equals(a, s)) {
          return true
        }
      }
      return false
    }
  }
)
export const slice = curry3(
  (from: number, to: number, o: any[] | string) =>
    o.slice(from, (isNum(to)?to:inf) as number)
)
export const head = nth(0)
export const tail = slice(1, inf) // typeshit.
export const add = curry2((n: number, m: number) => n+m)
export const subtract = curry2((n: number, m: number) => m-n)
export const flip = (fn: Function) => curry((b: any, a: any) => fn(a, b))
export const isNil = (s: any) => isNull(s) || isUndef(s)
export const length = (s: any[] | string) => s.length
export const always = <T=any>(s: T) => () => s
export const identity = (s: any) => s
export const trim = (s: string) => s.trim()
export const last = (s: any[] | string) => s[length(s)-1]
export const not = (o: boolean) => !o
export const complement = (fn: AnyFunc) => (...args: any) => {
  const out = fn(...args)
  return (isFunc(out) && (out as any).$args_left) ? complement(out) : not(out)
}
export const keys = (o: AnyObject | any[]) => Object.keys(o)
export const values = (o: AnyObject | any[]) => Object.values(o)
export const toPairs = (o: AnyObject | any[]) => Object.entries(o)
export const test = curry2((re: RegExp, s: string) => re.test(s))
export const tap = curry2((fn: Function, s: any) => { fn(s); return s })
export const append = curry2((s: any, xs: any[]) => [...xs, s])
export const split = curry2((s: string, xs: string) => xs.split(s))
export const T = always<true>(true) as (...args: any[]) => true
export const F = always<false>(false) as (...args: any[]) => false
export const sizeof = (s: any[] | string | AnyObject) => {
  if(type(s) === 'Object') {
    let len = 0
    for(let _k in s as AnyObject) len++
    return len
  } else return length(s as any[])
}
export const range = curry2((from: number, to: number) =>
  genBy(add(from), to-from)
)
export const uniq = (xs: any[]) => qreduce(
  <T>(accum: any, x: T) =>
    includes(x, accum) ? accum : qappend(x, accum),
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
    if(done) {
      return cache
    } else {
      done = true
      return cache = fn(...args)
    }
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
export const gt = curry2( (a: number, b: number) => a>b )
export const lt = curry2( (a: number, b: number) => a<b )
export const gte = curry2( (a: number, b: number) => b>=a )
export const lte = curry2( (a: number, b: number) => b<=a )
export const sort = curry2((sortFn: any, xs: any[]) => xs.sort(sortFn))
export const find = curry2((fn: Cond, s: any[]) => s.find(fn))
export const findIndex = curry2((fn: Cond, s: any[]) => s.findIndex(fn))
export const indexOf = curry2((x: any, xs: any[]) => findIndex(equals(x), xs))
export const explore = (caption: string, level = 'log') => tap(
  (v: any) => console[level](caption, v)
)
export const cond = curry2(
  (pairs: [Cond, Function][], s: any) => {
    for(const [cond, fn] of pairs) {
      if(cond(s)) {
        return fn(s)
      }
    }
  }
)
export const assoc = curry3(
  (prop: string, v: any, obj: AnyObject) => ({
    ...obj,
    [prop]: v
  })
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
export const allPass = curry2(
  (preds: Cond[], x: any) => preds.every((pred) => pred(x))
)
export const anyPass = curry2(
  (preds: Cond[], x: any) => preds.some((pred) => pred(x))
)
export const prop = curry2( (key: string, o: AnyObject) => o[key] )
export const propEq = curry3(
  (key: string, value: any, o: AnyObject) => equals(o[key], value)
)
export const propsEq = curry3(
  (key: string, o1: any, o2: AnyObject) => equals(o1[key], o2[key])
)
export const pathOr = curry3(
  (_default: any, path: string[], o: any) =>
    ifElse(length,
      () => isNil(o)
        ? _default
        : compose(
            ifElse(isNil,
              always(_default),
              (o: any) => pathOr(_default, slice(1, inf, path), o)
            ),
            flip(prop)(o),
            head
          )(path),
      always(o),
    path)
)
export const path = pathOr(undef)
export const pathEq = curry3(
  (_path: string[], value: any, o: AnyObject) => equals(path(_path, o), value)
)
export const pathsEq = curry3(
  (_path: string[], o1: AnyObject, o2: AnyObject) =>
    equals(path(_path, o1), path(_path, o2))
)
const typed_arr_re = /^(.*?)(8|16|32|64)(Clamped)?Array$/
export const clone = (s: any, shallow = false) => {
  const t = type(s)
  switch(t) {
    case 'Null': return s
    case 'Array': return shallow ? [...s] : map(clone, s)
    case 'Object':
      if(shallow) return {...s}
      const out = {}
      for(let k in s) {
        out[k] = clone(s[k])
      }
      return out
    case 'String': case 'Number':
    case 'Boolean': case 'Symbol':
      return s
    default:
      return typed_arr_re.test(t) ? s.constructor.from(s) : s
  }
}
export const cloneShallow = (s: any) => clone(s, true)

export const reduce = curry3(
  (fn: Reducer, accum: any, arr: any[]) =>
    qreduce(fn, clone(accum), arr)
)
export const pickBy = curry2(
  (cond: Cond, o: AnyObject) => filter(cond, o)
)
export const pick = curry2(
  (props: string[], o: AnyObject) => {
    const out = {}
    for(const p of props) {
      if(p in o) {
        out[p] = o[p]
      }
    }
    return out
  }
)
export const omit = curry2(
  (props: string[], o: AnyObject) => filter(
    (_: any, k: string) => !includes(k, props),
    o
  )
)
export const fromPairs = (pairs: [string, any][]) => reduce(
  (o: AnyObject, pair: [string, any]) => assoc(...pair, o),
  {}, pairs
)
type Concat = ((a: string, b: string) => string)
            | ((a: any[], b: any[]) => any[])
export const concat = curry2(
  ((a, b) => a.concat(b)) as Concat
)
export const join = curry2(
  (delimeter: string, arr: string[]) => arr.join(delimeter)
)
export const map = curry2(
  (pipe: (s: any) => any, arr: any[]) => arr.map(pipe)
)
export const forEach = curry2(
  (pipe: (s: any) => any, arr: any[]) => arr.forEach(pipe)
)
export const both = curry3(
  (cond1: Cond, cond2: Cond, s: any) => cond2(s) && cond1(s)
)
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
    b: string,
    where: string
  ) => where.replace(a, b)
)
export const filter = curry2(
  (
    cond: (v: any, k: string | number) => boolean,
    data: any[] | AnyObject
  ) => isArray(data)
    ? data.filter(cond)
    : compose(
      fromPairs,
      filter(([k, v]) => cond(v, k)),
      toPairs
    )(data)
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
  (a: AnyObject, b: AnyObject) => qmergeDeep(clone(a), clone(b))
)
export const mergeDeepX = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeepX(clone(a), clone(b))
)
export const mergeDeepAdd = curry2(
  (a: AnyObject, b: AnyObject) => qmergeDeepAdd(clone(a), clone(b))
)
export const overProp = curry3(
  (prop: string, pipe: AnyFunc, data: any) =>
    assoc(prop, pipe(data[prop]), data)
)
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const mapKeys = curry2(
  (
    keyMap: {[oldKey: string]: string},
    o: AnyObject
  ) => qmapKeys(keyMap, Object.assign({}, o))
)

// ASYNCS

/** One promise waits for another. */
export const forEachSerial = (() => {
  const pipe = async (fn: AnyFunc, items: any[], i: number) => {
    if(i<items.length) {
      await fn(items[i])
      await pipe(fn, items, ++i)
    }
  }
  return curry2(
    (fn: AnyFunc, items: any[]) => pipe(fn, items, 0)
  )
})()
/** Promise.all wrapper for functional pipelining. */
export const waitAll = (promises: Promise<any>[]) => Promise.all(promises)
export const waitTap = curry2(async (fn: Function, s: any) => { await fn(s); return s })
/** Waits for all promises mapped by the fn. */
export const forEachAsync = curry2(
  (fn: (item: any) => Promise<any>, items: any[]) =>
    Promise.all(items.map(fn))
)
/** The same as compose, but waits for promises in chains and returns a Promise.  */
export const composeAsync = (() => {
  const pipe = async (fns: AnyFunc[], data: any, i: number): Promise<any> =>
    ~i ? await pipe(fns, await fns[i](data), --i) : data
  return <T = any>(...fns: AnyFunc[]) =>
    (data?: any) => pipe(fns, data, fns.length-1) as Promise<T>
})() as FT.Compose<'async'>

// ALIASES
export const mirror = identity
export const reflect = identity
export const echo = identity