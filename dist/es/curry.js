// import { F, A } from "ts-toolbelt"
export const __ = (function Placeholder() { }); // as unknown as A.x & {'@@functional/placeholder': true}
const isPl = (s) => s === __;
const countArgs = (s, all = false) => {
    let i = 0;
    for (let k in s)
        (all || !isPl(s[k])) && i++;
    return i;
};
const extractArgs = (args) => {
    const len = countArgs(args);
    const arr = Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = args[i];
    }
    return arr;
};
// TODO: try to make it mutable.
// { 0: __, 1: 10 }, [ 11 ]
const addArgs = (args, _args) => {
    const len = countArgs(args, true);
    const new_len = _args.length;
    const new_args = {};
    let i = 0, j = 0;
    for (; i < len; i++) {
        new_args[i] = isPl(args[i]) && (j < new_len) ? _args[j++] : args[i];
    }
    for (; j < new_len; j++) {
        new_args[len + j] = _args[j];
    }
    return new_args;
};
const _curry = (fn, args, new_args) => {
    const args2add = fn.length - countArgs(args) - countArgs(new_args);
    if (args2add < 1) {
        return fn(...extractArgs(addArgs(args, new_args)));
    }
    else {
        const curried = (...__args) => _curry(fn, addArgs(args, new_args), __args);
        curried.$args_left = args2add;
        return curried;
    }
};
export const curry = ((fn) => (...args) => fn.length > countArgs(args)
    ? _curry(fn, {}, args)
    : fn(...args)); // as Currier
