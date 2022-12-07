const __ = Symbol('Placeholder');
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
const curry = ((fn) => ((...args) => fn.length > countArgs(args)
    ? _curry(fn, [], args)
    : fn(...args)));
const endlessph = (fn) => {
    function _endlessph(a) {
        return a === __ ? fn : fn(a);
    }
    return _endlessph;
};
function curry2(fn) {
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
function curry3(fn) {
    // type p0 = Parameters<Func>[0]
    // type p1 = Parameters<Func>[1]
    // type p2 = Parameters<Func>[2]
    // type ReturnT = ReturnType<Func>
    // TODO: optimize.
    return curry(fn);
}

const undef = undefined;
const nul = null;
const inf = Infinity;
const to = (s) => typeof s;
const isNull = (s) => s === nul;
const isUndef = (s) => s === undef;
const isNum = (s) => to(s) == 'number';
const isArray = (s) => Array.isArray(s);
const isFunc = (s) => to(s) === 'function';
const isStr = (s) => to(s) === 'string';
const isObj = (s) => !isNull(s) && to(s) === 'object';

// It's faster that toUpperCase() !
const caseMap = {
    u: 'U', b: 'B', n: 'N', s: 'S', f: 'F'
};
const toLower = (s) => s.toLowerCase();
const toUpper = (s) => s.toUpperCase();
const type = (s) => {
    const t = to(s);
    return t === 'object'
        ? isNull(s) ? 'Null' : s.constructor.name
        : caseMap[t[0]] + t.slice(1);
};

const qappend = curry2((s, xs) => { xs.push(s); return xs; });
const qassoc = curry3((prop, v, obj) => {
    obj[prop] = v;
    return obj;
});
const qreduce = curry3((fn, accum, arr) => arr.reduce(fn, accum));
// strategy is for arrays: 1->clean, 2->merge, 3->push.
const mergeDeep$1 = curry3((strategy, o1, o2) => {
    for (let k in o2) {
        switch (type(o2[k])) {
            case 'Array':
                if (strategy > 1 && type(o1[k]) === 'Array') {
                    switch (strategy) {
                        case 2:
                            const o1k = o1[k], o2k = o2[k];
                            for (const i in o2k) {
                                if (o1k[i]) {
                                    mergeDeep$1(strategy, o1k[i], o2k[i]);
                                }
                                else {
                                    o1k[i] = o2k[i];
                                }
                            }
                            break;
                        case 3: o1[k].push(...o2[k]);
                    }
                }
                else {
                    o1[k] = o2[k];
                }
                break;
            case 'Object':
                if (type(o1[k]) === 'Object') {
                    mergeDeep$1(strategy, o1[k], o2[k]);
                    break;
                }
            default:
                o1[k] = o2[k];
                break;
        }
    }
    return o1;
});
const qmergeDeep = mergeDeep$1(1);
const qmergeDeepX = mergeDeep$1(2);
const qmergeDeepAdd = mergeDeep$1(3);
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
const qmapKeys = curry2((keyMap, o) => {
    let k, mapped, newKey, newValue;
    for (k in keyMap) {
        mapped = keyMap[k];
        [newKey, newValue] = isFunc(mapped)
            ? mapped(o)
            : [mapped, o[k]];
        o[newKey] = newValue;
        if (k !== newKey) {
            delete o[k];
        }
    }
    return o;
});
const qfilter = curry2((cond, data) => {
    const isArr = isArray(data);
    for (let k in data) {
        if (!cond(data[k], k)) {
            if (isArr) {
                data.splice(k, 1);
            }
            else {
                // TODO: handle Maps and Sets ?
                delete data[k];
            }
        }
    }
    return data;
});
/** @deprecated */
const qindexOf = curry2((x, xs) => xs.indexOf(x));

// TODO: possibly introduce a second argument limiting unfolding.
const uncurry = (fn) => (...args) => qreduce(((fn, arg) => fn ? fn(arg) : fn), fn, args);

// over, lensProp
const equals = curry2((a, b) => {
    const typea = type(a);
    if (typea === type(b) && (typea === 'Object' || typea == 'Array')) {
        if (isNull(a) || isNull(b)) {
            return a === b;
        }
        if (a === b) {
            return true;
        }
        for (const v of [a, b]) {
            for (const k in v) {
                if (!((v === b) && (k in a)) &&
                    !((v === a) && (k in b) && equals(a[k], b[k]))) {
                    return false;
                }
            }
        }
        return true;
    }
    return a === b;
});
const ifElse = curry((cond, pipeYes, pipeNo, s) => cond(s) ? pipeYes(s) : pipeNo(s));
const when = curry3((cond, pipe, s) => ifElse(cond, pipe, identity, s));
const compose = ((...fns) => (s = Symbol()) => {
    for (let i = length(fns) - 1; i > -1; i--) {
        s = s === __ ? fns[i]() : fns[i](s);
    }
    return s;
});
const bind = curry2((fn, context) => fn.bind(context));
const _nth = (i, data) => data[i];
const nth = curry2(_nth);
const includes = curry2((s, ss) => {
    if (isStr(ss)) {
        return ss.includes(s);
    }
    else {
        for (const a of ss) {
            if (equals(a, s)) {
                return true;
            }
        }
        return false;
    }
});
const slice = curry3((from, to, o) => o.slice(from, (isNum(to) ? to : inf)));
const head = nth(0);
const tail = slice(1, inf); // typeshit.
const add = curry2((n, m) => n + m);
const subtract = curry2((n, m) => m - n);
const flip = (fn) => curry((b, a) => fn(a, b));
const isNil = (s) => isNull(s) || isUndef(s);
const length = (s) => s.length;
const always = (s) => () => s;
const identity = (s) => s;
const trim = (s) => s.trim();
const last = (s) => s[length(s) - 1];
const not = (o) => !o;
const complement = (fn) => (...args) => {
    const out = fn(...args);
    return (isFunc(out) && out.$args_left) ? complement(out) : not(out);
};
const keys = (o) => Object.keys(o);
const values = (o) => Object.values(o);
const toPairs = (o) => Object.entries(o);
const test = curry2((re, s) => re.test(s));
const tap = curry2((fn, s) => { fn(s); return s; });
const append = curry2((s, xs) => [...xs, s]);
const split = curry2((s, xs) => xs.split(s));
const T = always(true);
const F = always(false);
const sizeof = (s) => {
    if (type(s) === 'Object') {
        let len = 0;
        for (let _k in s)
            len++;
        return len;
    }
    else
        return length(s);
};
const range = curry2((from, to) => genBy(add(from), to - from));
const uniq = (xs) => qreduce((accum, x) => includes(x, accum) ? accum : qappend(x, accum), [], xs);
const intersection = curry2((xs1, xs2) => xs1.filter(flip(includes)(xs2)));
const genBy = curry2((generator, length) => [...Array(length)].map((_, i) => generator(i)));
const once = (fn) => {
    let done = false, cache;
    return (...args) => {
        if (done) {
            return cache;
        }
        else {
            done = true;
            return cache = fn(...args);
        }
    };
};
const reverse = (xs) => compose((ln) => reduce((nxs, _, i) => qappend(xs[ln - i], nxs), [], xs), add(-1), length)(xs);
const gt = curry2((a, b) => a > b);
const lt = curry2((a, b) => a < b);
const gte = curry2((a, b) => b >= a);
const lte = curry2((a, b) => b <= a);
const sort = curry2((sortFn, xs) => xs.sort(sortFn));
const find = curry2((fn, s) => s.find(fn));
const findIndex = curry2((fn, s) => s.findIndex(fn));
const indexOf = curry2((x, xs) => findIndex(equals(x), xs));
const explore = (caption, level = 'log') => tap((v) => console[level](caption, v));
const cond = curry2((pairs, s) => {
    for (const [cond, fn] of pairs) {
        if (cond(s)) {
            return fn(s);
        }
    }
});
const assoc = curry3((prop, v, obj) => ({
    ...obj,
    [prop]: v
}));
const assocPath = curry3((_path, v, o) => compose((first) => assoc(first, length(_path) < 2
    ? v
    : assocPath(slice(1, inf, _path), v, isObj(o[first]) ? o[first] : {}), o), head)(_path));
const all = curry2((pred, xs) => xs.every(pred));
const any = curry2((pred, xs) => xs.some(pred));
const allPass = curry2((preds, x) => preds.every((pred) => pred(x)));
const anyPass = curry2((preds, x) => preds.some((pred) => pred(x)));
const prop = curry2((key, o) => o[key]);
const propEq = curry3((key, value, o) => equals(o[key], value));
const propsEq = curry3((key, o1, o2) => equals(o1[key], o2[key]));
const pathOr = curry3((_default, path, o) => ifElse(length, () => isNil(o)
    ? _default
    : compose(ifElse(isNil, always(_default), (o) => pathOr(_default, slice(1, inf, path), o)), flip(prop)(o), head)(path), always(o), path));
const path = pathOr(undef);
const pathEq = curry3((_path, value, o) => equals(path(_path, o), value));
const pathsEq = curry3((_path, o1, o2) => equals(path(_path, o1), path(_path, o2)));
const typed_arr_re = /^(.*?)(8|16|32|64)(Clamped)?Array$/;
const clone = (s, shallow = false) => {
    const t = type(s);
    switch (t) {
        case 'Null': return s;
        case 'Array': return shallow ? [...s] : map(clone, s);
        case 'Object':
            if (shallow)
                return { ...s };
            const out = {};
            for (let k in s) {
                out[k] = clone(s[k]);
            }
            return out;
        case 'String':
        case 'Number':
        case 'Boolean':
        case 'Symbol':
            return s;
        default:
            return typed_arr_re.test(t) ? s.constructor.from(s) : s;
    }
};
const cloneShallow = (s) => clone(s, true);
const reduce = curry3((fn, accum, arr) => qreduce(fn, clone(accum), arr));
const pickBy = curry2((cond, o) => filter(cond, o));
const pick = curry2((props, o) => {
    const out = {};
    for (const p of props) {
        if (p in o) {
            out[p] = o[p];
        }
    }
    return out;
});
const omit = curry2((props, o) => filter((_, k) => !includes(k, props), o));
const fromPairs = (pairs) => reduce((o, pair) => assoc(...pair, o), {}, pairs);
const concat = curry2(((a, b) => a.concat(b)));
const join = curry2((delimeter, arr) => arr.join(delimeter));
const map = curry2((pipe, arr) => arr.map(pipe));
const forEach = curry2((pipe, arr) => arr.forEach(pipe));
const both = curry3((cond1, cond2, s) => cond2(s) && cond1(s));
const isEmpty = (s) => {
    switch (type(s)) {
        case 'String':
        case 'Array': return length(s) == 0;
        case 'Object':
            for (const _k in s)
                return false;
            return true;
        default: return null;
    }
};
const empty = (s) => {
    switch (type(s)) {
        case 'String': return '';
        case 'Object': return {};
        case 'Array': return [];
        default: return undef;
    }
};
const replace = curry3((a, b, where
// @ts-ignore-next Some bug with overload.
) => where.replace(a, b));
const filter = curry2((cond, data) => isArray(data)
    ? data.filter(cond)
    : compose(fromPairs, filter(([k, v]) => cond(v, k)), toPairs)(data));
const memoize = (fn) => {
    let cache;
    let cached = false;
    return () => cached ? cache : (cached = true, cache = fn());
};
const mergeShallow = curry2((o1, o2) => Object.assign({}, o1, o2));
const mergeDeep = curry2((a, b) => qmergeDeep(clone(a), clone(b)));
const mergeDeepX = curry2((a, b) => qmergeDeepX(clone(a), clone(b)));
const mergeDeepAdd = curry2((a, b) => qmergeDeepAdd(clone(a), clone(b)));
const overProp = curry3((prop, pipe, data) => assoc(prop, pipe(data[prop]), data));
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
const mapKeys = curry2((keyMap, o) => qmapKeys(keyMap, Object.assign({}, o)));
// ASYNCS
/** One promise waits for another. */
const forEachSerial = (() => {
    const pipe = async (fn, items, i) => {
        if (i < items.length) {
            await fn(items[i]);
            await pipe(fn, items, ++i);
        }
    };
    return curry2((fn, items) => pipe(fn, items, 0));
})();
/** Promise.all wrapper for functional pipelining. */
const waitAll = (promises) => Promise.all(promises);
const waitTap = curry2(async (fn, s) => { await fn(s); return s; });
/** Waits for all promises mapped by the fn. */
const forEachAsync = curry2((fn, items) => Promise.all(items.map(fn)));
/** The same as compose, but waits for promises in chains and returns a Promise.  */
const composeAsync = (() => {
    const pipe = async (fns, data, i) => ~i ? await pipe(fns, await fns[i](data), --i) : data;
    return (...fns) => (data) => pipe(fns, data, fns.length - 1);
})(); // as FT.Compose<'async'>
// ALIASES
const mirror = identity;
const reflect = identity;
const echo = identity;

const getTmpl = (tmpl) => {
    const parts = [];
    const keymap = [];
    const len = tmpl.length;
    let i = 0, s, ln, start = 0, open = false;
    for (i = 0; i < len; i++) {
        s = tmpl[i];
        switch (s) {
            case '{':
                open = true;
                start = i;
                break;
            case '}':
                open = false;
                parts.push('');
                keymap.push(tmpl.slice(start + 1, i));
                break;
            default:
                if (!open) {
                    ln = parts.length - 1;
                    if (ln < 0) {
                        parts.push('');
                        ln++;
                    }
                    parts[ln] += s;
                }
                break;
        }
    }
    return (data) => {
        const out = [];
        const ln = parts.length - 1;
        for (const j in parts) {
            i = +j;
            out.push(parts[i]);
            if (i !== ln)
                out.push(path(keymap[i].split('.'), data));
        }
        return out.join('');
    };
};

var pepka = /*#__PURE__*/Object.freeze({
  __proto__: null,
  __: __,
  curry: curry,
  curry2: curry2,
  curry3: curry3,
  uncurry: uncurry,
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
  test: test,
  tap: tap,
  append: append,
  split: split,
  T: T,
  F: F,
  sizeof: sizeof,
  range: range,
  uniq: uniq,
  intersection: intersection,
  genBy: genBy,
  once: once,
  reverse: reverse,
  gt: gt,
  lt: lt,
  gte: gte,
  lte: lte,
  sort: sort,
  find: find,
  findIndex: findIndex,
  indexOf: indexOf,
  explore: explore,
  cond: cond,
  assoc: assoc,
  assocPath: assocPath,
  all: all,
  any: any,
  allPass: allPass,
  anyPass: anyPass,
  prop: prop,
  propEq: propEq,
  propsEq: propsEq,
  pathOr: pathOr,
  path: path,
  pathEq: pathEq,
  pathsEq: pathsEq,
  clone: clone,
  cloneShallow: cloneShallow,
  reduce: reduce,
  pickBy: pickBy,
  pick: pick,
  omit: omit,
  fromPairs: fromPairs,
  concat: concat,
  join: join,
  map: map,
  forEach: forEach,
  both: both,
  isEmpty: isEmpty,
  empty: empty,
  replace: replace,
  filter: filter,
  memoize: memoize,
  mergeShallow: mergeShallow,
  mergeDeep: mergeDeep,
  mergeDeepX: mergeDeepX,
  mergeDeepAdd: mergeDeepAdd,
  overProp: overProp,
  mapKeys: mapKeys,
  forEachSerial: forEachSerial,
  waitAll: waitAll,
  waitTap: waitTap,
  forEachAsync: forEachAsync,
  composeAsync: composeAsync,
  mirror: mirror,
  reflect: reflect,
  echo: echo,
  qappend: qappend,
  qassoc: qassoc,
  qreduce: qreduce,
  qmergeDeep: qmergeDeep,
  qmergeDeepX: qmergeDeepX,
  qmergeDeepAdd: qmergeDeepAdd,
  qmapKeys: qmapKeys,
  qfilter: qfilter,
  qindexOf: qindexOf,
  getTmpl: getTmpl
});

window.pepka = pepka;
Object.assign(window, pepka);
