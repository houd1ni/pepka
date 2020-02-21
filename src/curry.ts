
type Args = any[]

export const __ = (function Placeholder() {})

const countArgs = (s: Args) => {
  let i = 0
  for (const v of s) v!==__ && i++
  return i
}

// TODO: try to make it mutable.
// { 0: __, 1: 10 }, [ 11 ]
const addArgs = (args: Args, _args: Args) => {
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

const _curry = (fn: Function, args: Args, new_args: Args) => {
  const args2add = fn.length - args.length - countArgs(new_args)
  if(args2add < 1) {
    return fn(...addArgs(args, new_args))
  } else {
    const curried = (...__args: Args) => _curry(
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
    (...args: Args) => fn.length>countArgs(args)
      ? _curry(fn, [], args)
      : fn(...args)
)