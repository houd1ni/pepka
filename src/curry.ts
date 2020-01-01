interface Args {
  [i: number]: any
}

export const __ = function Placeholder() {}

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
  // console.log({
  //   _a: _args.length,
  //   count: countArgs(args),
  //   fn: fn.length,
  //   old_args: args,
  //   new_args: _args,
  //   new_args2: addArgs(args, _args)
  // })
  const args2add = fn.length - countArgs(args) - new_args.length

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

export const curry = (fn: Function) =>
  (...args: any[]) => fn.length>args.length
    ? _curry(fn, {}, args)
    : fn(...args)