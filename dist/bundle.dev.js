// import { F, A } from "ts-toolbelt"
const __ = (function Placeholder() { }); // as unknown as A.x & {'@@functional/placeholder': true}
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
        return fn(...extractArgs(addArgs(args, new_args)) //,
        // ...new_args.slice(-args2add)
        );
    }
    else {
        return (...__args) => _curry(fn, addArgs(args, new_args), __args);
    }
};
const curry = ((fn) => (...args) => fn.length > countArgs(args)
    ? _curry(fn, {}, args)
    : fn(...args)); // as Currier

const undef = undefined;
const nul = null;
const to = (s) => typeof s;
const isNull = (s) => s === nul;
const isUndef = (s) => s === undef;
const isNum = (s) => to(s) == 'number';
const isArray = (s) => Array.isArray(s);
const isRegExp = (s) => s instanceof RegExp;
const isObjArr = (s) => to(s) == 'object' && !isNull(s);

const toLower = (s) => s.toLowerCase();
const toUpper = (s) => s.toUpperCase();
const type = (s) => {
    const t = to(s);
    switch (true) {
        case t !== 'object': return toUpper(t[0]) + t.slice(1);
        case isArray(s): return 'Array';
        case isNull(s): return 'Array';
        case isRegExp(s): return 'RegExp';
        default: return 'Object';
    }
};

const qappend = curry((s, xs) => { xs.push(s); return xs; });
const qassoc = curry((prop, v, obj) => {
    obj[prop] = v;
    return obj;
});
const qreduce = curry((fn, accum, arr) => arr.reduce(fn, accum));
const qmergeDeep = curry((o1, o2) => {
    for (let k in o2) {
        switch (type(o2[k])) {
            case 'Array':
            case 'Object':
                if (isObjArr(o1[k])) {
                    qmergeDeep(o1[k], o2[k]);
                    break;
                }
            default:
                o1[k] = o2[k];
                break;
        }
    }
    return o1;
});

const equals = curry((a, b) => {
    if (to(a) == 'object' && to(b) == 'object') {
        if (isNull(a) || isNull(b)) {
            return a === b;
        }
        for (let v of [a, b]) {
            for (let k in v) {
                if (!equals(a[k], b[k])) {
                    return false;
                }
            }
        }
    }
    return a === b;
});
const ifElse = curry((cond, pipeYes, pipeNo, s) => cond(s) ? pipeYes(s) : pipeNo(s));
const when = curry((cond, pipe, s) => ifElse(cond, pipe, identity, s));
const compose = ((...fns) => (s) => {
    for (let i = length(fns) - 1; i > -1; i--) {
        s = fns[i](s);
    }
    return s;
}); // as F.Compose
const bind = curry((fn, context) => fn.bind(context));
const nth = curry((i, data) => data[i]);
const includes = curry((s, ss) => ss.includes(s));
const slice = curry((from, to, o) => o.slice(from, (isNum(to) ? to : Infinity)));
const head = nth(0);
const tail = slice(1, nul);
const add = curry((n, m) => n + m);
const subtract = curry((n, m) => m - n);
const flip = (fn) => curry((b, a) => fn(a, b));
const isNil = (s) => isNull(s) || isUndef(s);
const length = (s) => s.length;
const always = (s) => () => s;
const identity = (s) => s;
const trim = (s) => s.trim();
const last = (s) => s[length(s) - 1];
const not = (o) => !o;
const complement = (fn) => (s) => not(fn(s));
const keys = (o) => Object.keys(o);
const values = (o) => Object.values(o);
const toPairs = (o) => Object.entries(o);
const tap = curry((fn, s) => { fn(s); return s; });
const append = curry((s, xs) => [...xs, s]);
const split = curry((s, xs) => xs.split(s));
const T = always(true);
const F = always(false);
const gt = curry((a, b) => a > b);
const lt = curry((a, b) => a < b);
const gte = curry((a, b) => b >= a);
const lte = curry((a, b) => b <= a);
const findIndex = curry((fn, s) => s.findIndex(fn));
const explore = (caption, level = 'log') => tap((v) => console[level](caption, v));
const cond = curry((pairs, s) => {
    for (const [cond, fn] of pairs) {
        if (cond(s)) {
            return fn(s);
        }
    }
});
const assoc = curry((prop, v, obj) => ({
    ...obj,
    [prop]: v
}));
const prop = curry((key, o) => o[key]);
const pathOr = curry((_default, path, o) => ifElse(length, compose(ifElse(isNil, always(_default), (o) => pathOr(_default, slice(1, nul, path), o)), flip(prop)(o), head), always(o))(path));
const path = pathOr(undef);
const clone = (s) => {
    switch (to(s)) {
        case 'object':
            switch (type(s)) {
                case 'Null': return s;
                case 'Array': return map(clone, s);
                case 'Object':
                    const out = {};
                    for (let k in s) {
                        out[k] = clone(s[k]);
                    }
                    return out;
            }
        default: return s;
    }
};
const reduce = curry((fn, accum, arr) => qreduce(fn, clone(accum), arr));
const pickBy = curry((cond, o) => filter(cond, o));
const pick = curry((props, o) => filter((_, k) => includes(k, props), o));
const omit = curry((props, o) => filter((_, k) => !includes(k, props), o));
const fromPairs = (pairs) => reduce((o, pair) => assoc(...pair, o), {}, pairs);
const join = curry((delimeter, arr) => arr.join(delimeter));
const map = curry((pipe, arr) => arr.map(pipe));
const forEach = curry((pipe, arr) => arr.forEach(pipe));
const both = curry((cond1, cond2, s) => cond2(s) && cond1(s));
const isEmpty = (s) => {
    switch (type(s)) {
        case 'String': return s == '';
        case 'Array': return length(s) == 0;
        case 'Null': return false;
        case 'Object': return length(Object.keys(s)) == 0;
        default: return false;
    }
};
const replace = curry((a, b, where) => where.replace(a, b));
const filter = curry((cond, data) => ifElse(compose(equals('Array'), type), (arr) => arr.filter(cond), compose(fromPairs, filter(([k, v]) => cond(v, k)), toPairs))(data));
const memoize = (fn) => {
    let cache;
    let cached = false;
    return () => cached ? cache : (cached = true, cache = fn());
};
const mergeShallow = curry((o1, o2) => Object.assign({}, o1, o2));
const mergeDeep = curry((a, b) => qmergeDeep(clone(a), b));
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
const mapKeys = curry((keyMap, o) => compose(fromPairs, filter(complement(isNil)), map((([k, v]) => isNull(keyMap[k]) ? nul : [keyMap[k] || k, v])), toPairs)(o));
// ASYNCS
/** One promise waits for another. */
const forEachSerial = (() => {
    const pipe = async (fn, items, i) => {
        if (i < items.length) {
            await fn(items[i]);
            await pipe(fn, items, ++i);
        }
    };
    return curry((fn, items) => pipe(fn, items, 0));
})();
/** Promise.all wrapper for functional pipelining. */
const waitAll = (promises) => Promise.all(promises);
/** Waits for all promises mapped by the fn. */
const forEachAsync = curry((fn, items) => Promise.all(items.map(fn)));
/** The same as compose, but waits for promises in chains and returns a Promise.  */
const composeAsync = (() => {
    const pipe = async (fns, data, i) => ~i ? await pipe(fns, await fns[i](data), --i) : data;
    return (...fns) => (data) => pipe(fns, data, fns.length - 1);
})();
// ALIASES
const mirror = identity;
const reflect = identity;
const echo = identity;



var pepka = /*#__PURE__*/Object.freeze({
  __proto__: null,
  __: __,
  curry: curry,
  toLower: toLower,
  toUpper: toUpper,
  type: type,
  equals: equals,
  ifElse: ifElse,
  when: when,
  compose: compose,
  bind: bind,
  nth: nth,
  includes: includes,
  slice: slice,
  head: head,
  tail: tail,
  add: add,
  subtract: subtract,
  flip: flip,
  isNil: isNil,
  length: length,
  always: always,
  identity: identity,
  trim: trim,
  last: last,
  not: not,
  complement: complement,
  keys: keys,
  values: values,
  toPairs: toPairs,
  tap: tap,
  append: append,
  split: split,
  T: T,
  F: F,
  gt: gt,
  lt: lt,
  gte: gte,
  lte: lte,
  findIndex: findIndex,
  explore: explore,
  cond: cond,
  assoc: assoc,
  prop: prop,
  pathOr: pathOr,
  path: path,
  clone: clone,
  reduce: reduce,
  pickBy: pickBy,
  pick: pick,
  omit: omit,
  fromPairs: fromPairs,
  join: join,
  map: map,
  forEach: forEach,
  both: both,
  isEmpty: isEmpty,
  replace: replace,
  filter: filter,
  memoize: memoize,
  mergeShallow: mergeShallow,
  mergeDeep: mergeDeep,
  mapKeys: mapKeys,
  forEachSerial: forEachSerial,
  waitAll: waitAll,
  forEachAsync: forEachAsync,
  composeAsync: composeAsync,
  mirror: mirror,
  reflect: reflect,
  echo: echo,
  qappend: qappend,
  qassoc: qassoc,
  qreduce: qreduce,
  qmergeDeep: qmergeDeep
});

window.pepka = pepka;
Object.assign(window, pepka);
