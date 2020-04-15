import { curry } from './curry';
import { isNum, nul, isUndef, undef, isNull, isArray, isFunc, isStr } from './utils';
import { qmergeDeep, qreduce, qappend, qmapKeys, qmergeDeepX, qmergeDeepAdd } from './quick';
import { type } from './common';
// over, lensProp
export const equals = curry((a, b) => {
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
export const ifElse = curry((cond, pipeYes, pipeNo, s) => cond(s) ? pipeYes(s) : pipeNo(s));
export const when = curry((cond, pipe, s) => ifElse(cond, pipe, identity, s));
export const compose = ((...fns) => (s) => {
    for (let i = length(fns) - 1; i > -1; i--) {
        s = fns[i](s);
    }
    return s;
}); // as F.Compose
export const bind = curry((fn, context) => fn.bind(context));
export const nth = curry((i, data) => data[i]);
export const includes = curry((s, ss) => {
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
export const slice = curry((from, to, o) => o.slice(from, (isNum(to) ? to : Infinity)));
export const head = nth(0);
export const tail = slice(1, nul);
export const add = curry((n, m) => n + m);
export const subtract = curry((n, m) => m - n);
export const flip = (fn) => curry((b, a) => fn(a, b));
export const isNil = (s) => isNull(s) || isUndef(s);
export const length = (s) => s.length;
export const always = (s) => () => s;
export const identity = (s) => s;
export const trim = (s) => s.trim();
export const last = (s) => s[length(s) - 1];
export const not = (o) => !o;
export const complement = (fn) => (...args) => {
    const out = fn(...args);
    return (isFunc(out) && out.$args_left) ? complement(out) : not(out);
};
export const keys = (o) => Object.keys(o);
export const values = (o) => Object.values(o);
export const toPairs = (o) => Object.entries(o);
export const reverse = (xs) => xs.reverse();
export const test = curry((re, s) => re.test(s));
export const tap = curry((fn, s) => { fn(s); return s; });
export const append = curry((s, xs) => [...xs, s]);
export const split = curry((s, xs) => xs.split(s));
export const T = always(true);
export const F = always(false);
export const sizeof = (s) => {
    if (type(s) === 'Object') {
        let len = 0;
        for (let _k in s)
            len++;
        return len;
    }
    else
        return length(s);
};
export const range = curry((from, to) => genBy(add(from), to - from));
export const uniq = (xs) => qreduce((accum, x) => includes(x, accum) ? accum : qappend(x, accum), [], xs);
export const intersection = curry((xs1, xs2) => xs1.filter(flip(includes)(xs2)));
export const genBy = curry((generator, length) => [...Array(length)].map((_, i) => generator(i)));
export const once = (fn) => {
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
export const gt = curry((a, b) => a > b);
export const lt = curry((a, b) => a < b);
export const gte = curry((a, b) => b >= a);
export const lte = curry((a, b) => b <= a);
// : <U=any>(sortFn: (v: U)=>-1|1, xs: U[]) => U[] 
export const sort = curry((sortFn, xs) => xs.sort(sortFn));
export const find = curry((fn, s) => s.find(fn));
export const findIndex = curry((fn, s) => s.findIndex(fn));
export const indexOf = curry((x, xs) => findIndex(equals(x), xs));
export const explore = (caption, level = 'log') => tap((v) => console[level](caption, v));
export const cond = curry((pairs, s) => {
    for (const [cond, fn] of pairs) {
        if (cond(s)) {
            return fn(s);
        }
    }
});
export const assoc = curry((prop, v, obj) => ({
    ...obj,
    [prop]: v
}));
export const all = curry((pred, xs) => xs.every(pred));
export const any = curry((pred, xs) => xs.some(pred));
export const allPass = curry((preds, x) => preds.every((pred) => pred(x)));
export const anyPass = curry((preds, x) => preds.some((pred) => pred(x)));
export const prop = curry((key, o) => o[key]);
export const propEq = curry((key, value, o) => o[key] === value);
export const propsEq = curry((key, o1, o2) => o1[key] === o2[key]);
export const pathOr = curry((_default, path, o) => ifElse(length, () => isNil(o)
    ? _default
    : compose(ifElse(isNil, always(_default), (o) => pathOr(_default, slice(1, nul, path), o)), flip(prop)(o), head)(path), always(o), path));
export const path = pathOr(undef);
const typed_arr_re = /^(.*?)(8|16|32|64)(Clamped)?Array$/;
export const clone = (s) => {
    const t = type(s);
    switch (t) {
        case 'Null': return s;
        case 'Array': return map(clone, s);
        case 'Object':
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
            return typed_arr_re.test(t) ? map(clone, s) : s;
    }
};
export const reduce = curry((fn, accum, arr) => qreduce(fn, clone(accum), arr));
export const pickBy = curry((cond, o) => filter(cond, o));
export const pick = curry((props, o) => {
    const out = {};
    for (const p of props) {
        if (p in o) {
            out[p] = o[p];
        }
    }
    return out;
});
export const omit = curry((props, o) => filter((_, k) => !includes(k, props), o));
export const fromPairs = (pairs) => reduce((o, pair) => assoc(...pair, o), {}, pairs);
export const concat = curry(((a, b) => a.concat(b)));
export const join = curry((delimeter, arr) => arr.join(delimeter));
export const map = curry((pipe, arr) => arr.map(pipe));
export const forEach = curry((pipe, arr) => arr.forEach(pipe));
export const both = curry((cond1, cond2, s) => cond2(s) && cond1(s));
export const isEmpty = (s) => {
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
export const empty = (s) => {
    switch (type(s)) {
        case 'String': return '';
        case 'Object': return {};
        case 'Array': return [];
        default: return undef;
    }
};
export const replace = curry((a, b, where) => where.replace(a, b));
export const filter = curry((cond, data) => isArray(data)
    ? data.filter(cond)
    : compose(fromPairs, filter(([k, v]) => cond(v, k)), toPairs)(data));
export const memoize = (fn) => {
    let cache;
    let cached = false;
    return () => cached ? cache : (cached = true, cache = fn());
};
export const mergeShallow = curry((o1, o2) => Object.assign({}, o1, o2));
export const mergeDeep = curry((a, b) => qmergeDeep(clone(a), clone(b)));
export const mergeDeepX = curry((a, b) => qmergeDeepX(clone(a), clone(b)));
export const mergeDeepAdd = curry((a, b) => qmergeDeepAdd(clone(a), clone(b)));
export const overProp = curry((prop, pipe, data) => assoc(prop, pipe(data[prop]), data));
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const mapKeys = curry((keyMap, o) => qmapKeys(keyMap, Object.assign({}, o)));
// ASYNCS
/** One promise waits for another. */
export const forEachSerial = (() => {
    const pipe = async (fn, items, i) => {
        if (i < items.length) {
            await fn(items[i]);
            await pipe(fn, items, ++i);
        }
    };
    return curry((fn, items) => pipe(fn, items, 0));
})();
/** Promise.all wrapper for functional pipelining. */
export const waitAll = (promises) => Promise.all(promises);
/** Waits for all promises mapped by the fn. */
export const forEachAsync = curry((fn, items) => Promise.all(items.map(fn)));
/** The same as compose, but waits for promises in chains and returns a Promise.  */
export const composeAsync = (() => {
    const pipe = async (fns, data, i) => ~i ? await pipe(fns, await fns[i](data), --i) : data;
    return (...fns) => (data) => pipe(fns, data, fns.length - 1);
})();
// ALIASES
export const mirror = identity;
export const reflect = identity;
export const echo = identity;
