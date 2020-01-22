import { curry } from './curry';
import { to, isNum, nul, isUndef, undef, isNull } from './utils';
import { qmergeDeep, qreduce, qappend } from './quick';
import { type } from './common';
export const equals = curry((a, b) => {
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
    for (const a of ss) {
        if (equals(a, s)) {
            return true;
        }
    }
    return false;
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
export const complement = (fn) => (s) => not(fn(s));
export const keys = (o) => Object.keys(o);
export const values = (o) => Object.values(o);
export const toPairs = (o) => Object.entries(o);
export const tap = curry((fn, s) => { fn(s); return s; });
export const append = curry((s, xs) => [...xs, s]);
export const split = curry((s, xs) => xs.split(s));
export const T = always(true);
export const F = always(false);
export const uniq = (xs) => qreduce((accum, x) => includes(x, accum) ? accum : qappend(x, accum), [], xs);
export const gt = curry((a, b) => a > b);
export const lt = curry((a, b) => a < b);
export const gte = curry((a, b) => b >= a);
export const lte = curry((a, b) => b <= a);
export const findIndex = curry((fn, s) => s.findIndex(fn));
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
export const prop = curry((key, o) => o[key]);
export const pathOr = curry((_default, path, o) => ifElse(length, compose(ifElse(isNil, always(_default), (o) => pathOr(_default, slice(1, nul, path), o)), flip(prop)(o), head), always(o))(path));
export const path = pathOr(undef);
export const clone = (s) => {
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
export const reduce = curry((fn, accum, arr) => qreduce(fn, clone(accum), arr));
export const pickBy = curry((cond, o) => filter(cond, o));
export const pick = curry((props, o) => filter((_, k) => includes(k, props), o));
export const omit = curry((props, o) => filter((_, k) => !includes(k, props), o));
export const fromPairs = (pairs) => reduce((o, pair) => assoc(...pair, o), {}, pairs);
export const join = curry((delimeter, arr) => arr.join(delimeter));
export const map = curry((pipe, arr) => arr.map(pipe));
export const forEach = curry((pipe, arr) => arr.forEach(pipe));
export const both = curry((cond1, cond2, s) => cond2(s) && cond1(s));
export const isEmpty = (s) => {
    switch (type(s)) {
        case 'String': return s == '';
        case 'Array': return length(s) == 0;
        case 'Null': return false;
        case 'Object': return length(Object.keys(s)) == 0;
        default: return false;
    }
};
export const replace = curry((a, b, where) => where.replace(a, b));
export const filter = curry((cond, data) => ifElse(compose(equals('Array'), type), (arr) => arr.filter(cond), compose(fromPairs, filter(([k, v]) => cond(v, k)), toPairs))(data));
export const memoize = (fn) => {
    let cache;
    let cached = false;
    return () => cached ? cache : (cached = true, cache = fn());
};
export const mergeShallow = curry((o1, o2) => Object.assign({}, o1, o2));
export const mergeDeep = curry((a, b) => qmergeDeep(clone(a), clone(b)));
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
export const mapKeys = curry((keyMap, o) => compose(fromPairs, filter(complement(isNil)), map((([k, v]) => isNull(keyMap[k]) ? nul : [keyMap[k] || k, v])), toPairs)(o));
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
