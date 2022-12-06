import { F as FT } from 'ts-toolbelt'
import { AnyFunc, AnyArgs } from "./types"

type Placeholder = symbol
export const __: Placeholder = Symbol('Placeholder')

const countArgs = (s: AnyArgs) => {
  let i = 0
  for (const v of s) v!==__ && i++
  return i
}

// TODO: try to make it mutable.
// { 0: __, 1: 10 }, [ 11 ]
const addArgs = (args: AnyArgs, _args: AnyArgs) => {
  const len = args.length
  const new_args = args.slice()
  const _args_len = _args.length
  let _args_left = _args_len
  let i=0
  for (; _args_left && i<len; i++) {
    if(new_args[i] === __) {
      new_args[i] = _args[_args_len-_args_left]
      _args_left--
    }
  }
  for(i=len; _args_left; i++, _args_left--) {
    new_args[i] = _args[_args_len-_args_left]
  }
  return new_args
}

const _curry = (fn: Function, args: AnyArgs, new_args: AnyArgs) => {
  const args2add = fn.length - args.length - countArgs(new_args)
  if(args2add < 1) {
    return fn(...addArgs(args, new_args))
  } else {
    const curried = (...__args: AnyArgs) => _curry(
      fn,
      addArgs(args, new_args),
      __args
    )
    ;(curried as any).$args_left = args2add
    return curried
  }
}

export const curry = (
  <Func extends AnyFunc>(fn: AnyFunc) => (
    (...args: AnyArgs) => fn.length>countArgs(args)
      ? _curry(fn, [], args)
      : fn(...args)
  ) as FT.Curry<Func>
)
const endlessph = <Func extends FT.Function>(fn: Func) => {
  type ReturnT = ReturnType<Func>
  type p0 = Parameters<Func>[0]
  function _endlessph(a: p0): ReturnT
  function _endlessph(a: Placeholder): Func
  function _endlessph(a: p0 | Placeholder) {
    return a===__ ? fn : fn(a)
  }
  return _endlessph
}

type Func2 = (a: any, b: any) => any
export function curry2<Func extends Func2>(fn: Func) {
  type p0 = Parameters<Func>[0]
  type p1 = Parameters<Func>[1]
  type ReturnT = ReturnType<Func>
  function curried2( a: p0 ): (b: p1) => ReturnT
  function curried2( a: p0, b: p1 ): ReturnT
  function curried2( a: Placeholder, b: p1 ): (a: p0) => ReturnT
  function curried2( a: p0, b: Placeholder ): (b: p1) => ReturnT
  function curried2( a: p0 | Placeholder, b?: p1 ) {
    const withPlaceholder1 = a===__
    const aln = arguments.length
    if(aln === 1 && withPlaceholder1)
      throw new Error('Senseless placeholder usage.')
    return arguments.length>1
    ? withPlaceholder1
      ? endlessph((a: p0) => fn(a, b))
      : fn(a, b) as ReturnType<Func>
    : (b: p1) => fn(a, b)
  }
  return curried2
}

type Func3 = (a: any, b: any, c: any) => any
export function curry3<Func extends Func3>(fn: Func) {
  // type p0 = Parameters<Func>[0]
  // type p1 = Parameters<Func>[1]
  // type p2 = Parameters<Func>[2]
  // type ReturnT = ReturnType<Func>
  // TODO: optimize.
  return curry(fn) as FT.Curry<Func>
}