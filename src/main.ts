
type Cond = (s: any) => boolean

const to = (s: any) => typeof s
const isNull = (s: any) => s===null
const isUndef = (s: any) => s===void(0)
// unsafe wd be faster.
const _equals = (a: any, b: any) => {
  if(to(a)==='object' && to(b)==='object') {
    if(isNull(a) || isNull(b)) {
      return a===b
    }
    for(let v of [a, b]) {
      for(let k in v) {
        if(!_equals(a[k], b[k])) {
          return false
        }
      }
    }
  }
}
const _curry = (fn: Function, _args: any[], args: any[]) => {
  _args.push(...args)
  return _args.length<fn.length
    ? (...args: any[]) => _curry(fn, _args, args)
    : fn(..._args, ...args)
}
export const curry = (fn: Function) =>
  (...args: any[]) => _curry(fn, [], args)
export const when = curry(
  (
    cond: (s: any) => boolean,
    pipe: (s: any) => any,
    s: any
  ) => cond(s) ? pipe(s) : s
)
export const compose = (...fns: Function[]) =>
  (s: any) => {
    for(let i = length(fns)-1; i>-1; i--) {
      s = fns[i](s)
    }
    return s
  }

export const equals = curry(_equals)
export const isArray = (s: any) => Array.isArray(s)
export const isNil = (s: any) => isNull(s) || isUndef(s)
export const length = (s: any[] | string) => s.length
export const always = (s: any) => () => s
export const identity = () => (s: any) => s
export const trim = (s: string) => s.trim()
export const join = curry(
  (delimeter: string, arr: string[]) => arr.join(delimeter)
)
export const complement = (fn: Cond) => (s: any) => !fn(s)
export const map = curry(
  (pipe: (s: any) => any, arr: any[]) => arr.map(pipe)
)
export const filter = curry(
  (cond: Cond, arr: any[]) => arr.filter(cond)
)
export const forEach = curry(
  (pipe: (s: any) => any, arr: any[]) => arr.forEach(pipe)
)
export const both = curry(
  (cond1: Cond, cond2: Cond, s: any) => cond2(s) && cond1(s)
)
export const type = (s: any) => {
  const t = to(s)
  return t=='object'
    ? isArray(s) ? 'Array' : (isNull(s) ? 'Null' : 'Object')
    : t[0].toUpperCase() + t.slice(1)
}
export const isEmpty = (s: any) => {
  switch(type(s)) {
    case 'String': return s==''
    case 'Array': return length(s)==0
    case 'Null': return false
    case 'Object': return length(Object.keys(s)) == 0
    default: return false
  }
}
export const replace = curry(
  (
    a: string | RegExp,
    b: string,
    where: string
  ) => where.replace(a, b)
)