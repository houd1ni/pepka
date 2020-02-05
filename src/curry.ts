// TODO: make curry2, curry3 and curry4 for faster stuff.
// Probably make build a class to hold placeholder positions etc.

type Args = Map<number, any>

export const __ = (
  function Placeholder() {}
)

const countArgs = (s: any[]) => {
  let i = 0
  for (const v of s) v!==__ && i++
  return i
}

// TODO: try to make it mutable.
// { 0: __, 1: 10 }, [ 11 ]
const addArgs = (args: Args, _args: any[]) => {
  const len = args.size
  const new_args = new Map(args)
  const _args_len = _args.length
  let _args_left = _args_len
  let i=0
  for (; _args_left && i<len; i++) {
    if(new_args.get(i) === __) {
      new_args.set(i, _args[_args_len-_args_left])
      _args_left--
    }
  }
  for(i=len+1; _args_left; i++, _args_left--) {
    new_args.set(i, _args[_args_len-_args_left])
  }
  return new_args
}

const _curry = (fn: Function, args: Args, new_args: any[]) => {
  const args2add = fn.length - args.size - countArgs(new_args)
  if(args2add < 1) {
    return fn(...addArgs(args, new_args).values())
  } else {
    const curried = (...__args: any[]) => _curry(
      fn,
      addArgs(args, new_args),
      __args
    )
    ;(curried as any).$args_left = args2add
    return curried
  }
}

export const curry = (
  (fn: Function) =>
    (...args: any[]) => fn.length>countArgs(args)
      ? _curry(fn, new Map(), args)
      : fn(...args)
)