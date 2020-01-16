// import { F, A } from "ts-toolbelt"

// type Currier = <F extends (...args: any) => any>(f: F) => F.Curry<F>

// import { Currier } from './types'
// import * as _ from 'ts-toolbelt'
// const x: F

interface Args {
  [i: number]: any
}

export const __ = (
  function Placeholder() {}
)// as unknown as A.x & {'@@functional/placeholder': true}

const isPl = (s: any) => s === __
const countArgs = (s: Args) => {
  let i = 0
  for (let k in s) !isPl(s[k]) && i++
  return i
}
const extractArgs = (args: Args) => {
  const len = countArgs(args)
  const arr = Array(len)
  for (let i=0; i<len; i++) {
    arr[i] = args[i]
  }
  return arr
}

// TODO: try to make it mutable.
// { 0: __, 1: 10 }, [ 11 ]
const addArgs = (args: Args, _args: any[]) => {
  const len = countArgs(args)
  const new_len = _args.length
  const new_args = {}
  let i = 0, j = 0
  for (; i<len; i++) {
    new_args[i] = isPl(args[i]) && (j < new_len) ? _args[j++] : args[i]
  }
  for (; j < new_len; j++) {
    new_args[len+j] = _args[j]
  }
  return new_args
}

const _curry = (fn: Function, args: Args, new_args: any[]) => {
  const args2add = fn.length - countArgs(args) - countArgs(new_args)
  if(args2add < 1) {
    return fn(
      ...extractArgs(addArgs(args, new_args)),
      ...new_args.slice(-args2add)
    )
  } else {
    return (...__args: any[]) => _curry(
      fn,
      addArgs(args, new_args),
      __args
    )
  }
}

export const curry = (
  (fn: Function) =>
    (...args: any[]) => fn.length>countArgs(args)
      ? _curry(fn, {}, args)
      : fn(...args)
)// as Currier