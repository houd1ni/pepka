export const __ = Symbol('Placeholder');
const countArgs = (s) => {
    let i = 0;
    for (const v of s)
        v !== __ && i++;
    return i;
};
// TODO: try to make it mutable.
// { 0: __, 1: 10 }, [ 11 ]
const addArgs = (args, _args) => {
    const len = args.length;
    const new_args = args.slice();
    const _args_len = _args.length;
    let _args_left = _args_len;
    let i = 0;
    for (; _args_left && i < len; i++) {
        if (new_args[i] === __) {
            new_args[i] = _args[_args_len - _args_left];
            _args_left--;
        }
    }
    for (i = len; _args_left; i++, _args_left--) {
        new_args[i] = _args[_args_len - _args_left];
    }
    return new_args;
};
const _curry = (fn, args, new_args) => {
    const args2add = fn.length - args.length - countArgs(new_args);
    if (args2add < 1) {
        return fn(...addArgs(args, new_args));
    }
    else {
        const curried = (...__args) => _curry(fn, addArgs(args, new_args), __args);
        curried.$args_left = args2add;
        return curried;
    }
};
export const curry = ((fn) => ((...args) => fn.length > countArgs(args)
    ? _curry(fn, [], args)
    : fn(...args)));
// type EndlessPh<Func extends FT.Function, ArgT> =
//   (a: ArgT) => ReturnType<Func>
//   | ((a: A.x) => EndlessPh<Func, ArgT>)
const endlessph = (fn) => {
    function _endlessph(a) {
        return a === __ ? fn : fn(a);
    }
    return _endlessph;
};
export function curry2(fn) {
    function curried2(a, b) {
        const withPlaceholder1 = a === __;
        const aln = arguments.length;
        if (aln === 1 && withPlaceholder1)
            throw new Error('Senseless placeholder usage.');
        return arguments.length > 1
            ? withPlaceholder1
                ? endlessph((a) => fn(a, b))
                : fn(a, b)
            : (b) => fn(a, b);
    }
    return curried2;
}
export function curry3(fn) {
    // type p0 = Parameters<Func>[0]
    // type p1 = Parameters<Func>[1]
    // type p2 = Parameters<Func>[2]
    // type ReturnT = ReturnType<Func>
    // TODO: optimize.
    return curry(fn);
}
