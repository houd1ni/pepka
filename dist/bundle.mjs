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
const curry = (fn) => ((...args) => fn.length > countArgs(args)
    ? _curry(fn, [], args)
    : fn(...args));
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
        return aln > 1
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
    // Cannot use ts-toolbelt due to this error:
    // Excessive stack depth comparing types 'GapsOf<?, L2>' and 'GapsOf<?, L2>'
    return curry(fn);
}

const typed_arr_re = /^(.*?)(8|16|32|64)(Clamped)?Array$/;
const is_typed_arr = (t) => typed_arr_re.test(t);

const undef = undefined;
const nul = null;
const inf = Infinity;
const to = (s) => typeof s;
const isNull = (s) => (s === nul);
const isUndef = (s) => (s === undef);
const isNum = (s) => (to(s) == 'number');
const isArray = (s) => (Array.isArray(s));
function isFunc(s) { return to(s) === 'function'; }
const isStr = (s) => (to(s) === 'string');
const isObj = (s) => (!isNull(s) && to(s) === 'object');
const isNil = (s) => (isNull(s) || isUndef(s));

// It's faster that toUpperCase() !
const caseMap = { u: 'U', b: 'B', n: 'N', s: 'S', f: 'F' };
const symbol = Symbol();
const toLower = (s) => s.toLowerCase();
const toUpper = (s) => s.toUpperCase();
const type = (s) => {
    const t = to(s);
    return t === 'object'
        ? isNull(s) ? 'Null' : s.constructor.name
        : caseMap[t[0]] + t.slice(1);
};
const typeIs = curry2((t, s) => type(s) === t);
const length = (s) => s.length;
const eq = curry2((a, b) => a === b);
const equals = curry2((a, b) => {
    const typea = type(a);
    if (eq(typea, type(b)) && (eq(typea, 'Object') || eq(typea, 'Array') || is_typed_arr(typea))) {
        if (isNull(a) || isNull(b))
            return eq(a, b);
        if (eq(a, b))
            return true;
        for (const v of [a, b])
            for (const k in v)
                if (!((eq(v, b)) && (k in a)) &&
                    !((eq(v, a)) && (k in b) && equals(a[k], b[k])))
                    return false;
        return true;
    }
    return eq(a, b);
});
const includes = curry2((s, ss) => {
    if (isStr(ss))
        return ss.includes(s);
    else {
        for (const a of ss)
            if (equals(a, s))
                return true;
        return false;
    }
});
/** @param start string | any[] @param s string | any[] */
const qstartsWithWith = (comparator) => curry2((start, s) => {
    const len_start = length(start);
    const len_s = length(s);
    if (len_start > len_s)
        return false;
    for (let i = 0; i < len_start; i++)
        if (!comparator(s[i], start[i]))
            return false;
    return true;
});

/* Then next fns seem to be excess due to their safe ver performance should be the same or better:
* qflat, qpick, qslice, quniq
*/
const qappend = curry2((s, xs) => { xs.push(s); return xs; });
const qassoc = curry3((prop, v, obj) => { obj[prop] = v; return obj; });
const qreduce = curry3((fn, accum, arr) => arr.reduce(fn, accum));
// strategy is for arrays: 1->clean, 2->merge, 3->push.
const mergeDeep$1 = (strategy) => curry2((o1, o2) => {
    for (let k in o2) {
        switch (type(o2[k])) {
            case 'Array':
                if (strategy > 1 && type(o1[k]) === 'Array')
                    switch (strategy) {
                        case 2:
                            const o1k = o1[k], o2k = o2[k];
                            for (const i in o2k)
                                if (o1k[i])
                                    mergeDeep$1(strategy)(o1k[i], o2k[i]);
                                else
                                    o1k[i] = o2k[i];
                            break;
                        case 3: o1[k].push(...o2[k]);
                    }
                else
                    o1[k] = o2[k];
                break;
            case 'Object':
                if (type(o1[k]) === 'Object') {
                    mergeDeep$1(strategy)(o1[k], o2[k]);
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
const qmergeShallow = curry2((o1, o2) => Object.assign(o1, o2));
/** qmapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
const qmapKeys = curry2((keyMap, o) => {
    let k, mapped, newKey, newValue;
    for (k in keyMap)
        if (k in o) {
            mapped = keyMap[k];
            [newKey, newValue] = isFunc(mapped)
                ? mapped(o[k], k, o)
                : [mapped, o[k]];
            o[isNil(newKey) ? k : newKey] = newValue;
            if (k !== newKey)
                delete o[k];
        }
    return o;
});
// FIXME: qmap(any, tags) -> some function!!!
const qmap = curry2((pipe, arr) => {
    for (const i in arr)
        arr[i] = pipe(arr[i], +i, arr);
    return arr;
});
const qmapObj = curry2((pipe, o) => {
    for (const k in o)
        o[k] = pipe(o[k], k, o);
    return o;
});
const qfilter = curry2((cond, data) => {
    const isArr = isArray(data);
    let indicies_offset, indicies2rm;
    if (isArr) {
        indicies_offset = 0;
        indicies2rm = [];
    }
    for (let k in data)
        if (!cond(data[k], k)) // @ts-ignore
            if (isArr)
                indicies2rm.push(+k);
            else
                delete data[k];
    if (isArr) // @ts-ignore
        for (const i of indicies2rm) // @ts-ignore
            data.splice(i - indicies_offset++, 1);
    return data;
});
const qempty = (o) => {
    if (isArray(o))
        o.splice(0);
    else
        for (const i in o)
            delete o[i];
    return o;
};
const qfreeze = (o) => {
    let v;
    for (const k in o) {
        v = o[k];
        if (isObj(v))
            qfreeze(v);
    }
    return Object.freeze(o);
};
const qfreezeShallow = (o) => Object.freeze(o);
const qprepend = curry2((x, xs) => xs.unshift(x));
const qsort = curry2((sortFn, xs) => xs.sort(sortFn));
const qassocPath = curry3((_path, v, o) => {
    const first = _path[0];
    return qassoc(first, _path.length < 2
        ? v
        : qassocPath(_path.slice(1), v, isObj(o[first]) ? o[first] : {}), o);
});
const qreverse = (arr) => arr.reverse();
const qomit = curry2((props, o) => qfilter((_, k) => !includes(k, props), o));
/** @param start string | any[] @param s string | any[] */
const qstartsWith = qstartsWithWith(eq);
/** @param prop string @param pipe (data[prop]): prop_value @param data any
 * @returns data with prop over pipe. */
const qoverProp = curry3((prop, pipe, data) => qassoc(prop, pipe(data[prop]), data));
// Aliases.
const qpush = qappend;

// TODO: possibly introduce a second argument limiting unfolding.
const uncurry = (fn) => (...args) => qreduce(((fn, arg) => fn ? fn(arg) : fn), fn, args);

// TODO: over, lensProp. propsEq is up to 20x slow due to deep equals.
const take = (argN) => (...args) => args[argN];
const ifElse = curry((cond, pipeYes, pipeNo, s) => cond(s) ? pipeYes(s) : pipeNo(s));
const when = curry3((cond, pipe, s) => ifElse(cond, pipe, identity, s));
const compose = ((...fns) => (...args) => {
    let first = true;
    let s;
    for (let i = length(fns) - 1; i > -1; i--) {
        if (first) {
            first = false;
            s = fns[i](...args);
        }
        else
            s = s === __ ? fns[i]() : fns[i](s);
    }
    return s;
});
const bind = curry2((fn, context) => fn.bind(context));
const nth = curry2((i, data) => data[i]);
// FIXME: these types. Somewhere in curry2.
// const x = nth(0)([1,2,3])
// const y = nth(0)('123')
// const z = nth(0)(new Uint8Array([0,2,3]))
const slice = curry3((from, to, o) => o.slice(from, (isNum(to) ? to : inf)));
const flip = (fn) => curry2((b, a) => fn(a, b));
/** @returns first element of an array or a string. */
const head = nth(0);
/** @returns all elements of an array or a string after first one. */
const tail = slice(1, inf);
/** Returns last element of an array, readonly array or a string.
 * @param s Array to extract that element.
 * @returns undefined if s is empty or last element. */
const last = (s) => s[length(s) - 1];
/** @param a @param b @returns a+b  */
const add = curry2((a, b) => a + b);
/** @param a @param b @returns b-a  */
const subtract = curry2((a, b) => b - a);
/**@param a @param b @returns a×b  */
const multiply = curry2((a, b) => a * b);
/** @param a @param b @returns a<b  */
const gt = curry2((a, b) => a < b);
/** @param a @param b @returns a>b  */
const lt = curry2((a, b) => a > b);
/** @param a @param b @returns a≤b  */
const gte = curry2((a, b) => a <= b);
/** @param a @param b @returns a≥b  */
const lte = curry2((a, b) => a >= b);
const sort = curry2((sortFn, xs) => [...xs].sort(sortFn));
const find = curry2((fn, s) => s.find(fn));
const findIndex = curry2((fn, s) => s.findIndex(fn));
const indexOf = curry2((x, xs) => findIndex(equals(x), xs));
const divide = curry2((a, b) => b / a);
const always = (s) => () => s;
const identity = (s) => s;
const trim = (s) => s.trim();
/** @param start string | any[] @param s string | any[] */
const startsWith = qstartsWithWith((x, y) => equals(x, y));
const not = (x) => !x;
const keys = (o) => Object.keys(o);
const values = (o) => Object.values(o);
const toPairs = (o) => Object.entries(o);
const test = curry2((re, s) => re.test(s));
const tap = curry2((fn, x) => { fn(x); return x; });
const append = curry2((x, xs) => [...xs, x]);
const prepend = curry2((x, xs) => [...xs, x]);
const flat = (xs) => xs.flat(inf);
const flatShallow = (xs) => xs.flat();
const flatTo = curry2((depth, xs) => xs.flat(depth));
const split = curry2((s, xs) => xs.split(s));
const T = always(true);
const F = always(false);
const callWith = curry2((args, fn) => fn(...args));
const noop = (() => { });
/** Calls a func from object.
 * @param {any[]} args - arguments for the function.
 * @param {string} fnName - property name of the function.
 * @param {AnyObject} o - the object with the function. */
const callFrom = curry((args, fn, o) => o[fn](...args));
const complement = (fn) => (...args) => {
    const out = fn(...args);
    const f = isFunc(out);
    return !f || f && out.$args_left <= 0 ? not(out) : complement(out);
};
const sizeof = (s) => {
    if (isObj(s)) {
        let len = 0;
        for (let _k in s)
            len++;
        return len;
    }
    else
        return length(s);
};
const range = curry2((from, to) => genBy(add(from), to - from));
/** @param cond (x, y): bool @param xs any[] @returns xs without duplicates, using cond as a comparator.  */
const uniqWith = curry2((cond, xs) => qreduce((accum, x) => find((y) => cond(x, y), accum) ? accum : qappend(x, accum), [], xs));
/** @param xs any[] @returns xs without duplicates.  */
const uniq = uniqWith(equals);
const intersection = curry2((xs1, xs2) => xs1.filter(flip(includes)(xs2)));
const diff = curry2((_xs1, _xs2) => {
    let len1 = length(_xs1);
    let len2 = length(_xs2);
    const xs1 = len1 > len2 ? _xs1 : _xs2;
    const xs2 = len1 > len2 ? _xs2 : _xs1;
    if (len1 < len2)
        [len1, len2] = [len2, len1];
    const xset2 = new Set(xs2);
    const common = new Set();
    const out = [];
    let i;
    for (i = 0; i < len1; i++) {
        const el = xs1[i];
        if (xset2.has(el))
            common.add(el);
        else
            out.push(el);
    }
    for (i = 0; i < len2; i++) {
        const el = xs2[i];
        if (!common.has(el))
            out.push(el);
    }
    return out;
});
const genBy = curry2((generator, length) => [...Array(length)].map((_, i) => generator(i)));
const once = (fn) => {
    let done = false, cache;
    return function (...args) {
        if (done)
            return cache;
        done = true;
        return cache = fn(...args);
    };
};
const reverse = (xs) => {
    const ln = length(xs) - 1;
    return map((_, i) => xs[ln - i], xs);
};
const explore = (caption, level = 'log') => tap((v) => console[level](caption, v));
const cond = curry2((pairs, s) => {
    for (const [cond, fn] of pairs)
        if (cond(s))
            return fn(s);
});
/** Assigns a prop to an object.
 * @param prop string
 * @param value any
 * @param object AnyObject
 */
const assoc = curry3((prop, v, obj) => ({ ...obj, [prop]: v }));
const assocPath = curry3((_path, v, o) => compose((first) => assoc(first, length(_path) < 2
    ? v
    : assocPath(slice(1, inf, _path), v, isObj(o[first]) ? o[first] : {}), o), head)(_path));
const all = curry2((pred, xs) => xs.every(pred));
const any = curry2((pred, xs) => xs.some(pred));
const allPass = curry2((preds, x) => preds.every((pred) => pred(x)));
const anyPass = curry2((preds, x) => preds.some((pred) => pred(x)));
/** @param key string @param o AnyObject @returns o[key] */
const prop = curry2((key, o) => o[key]);
/** @param key string @param value any @param o AnyObject @returns boolean o[key] equals value */
const propEq = curry3((key, value, o) => equals(o[key], value));
/** @param key string @param o1 AnyObject @param o2 AnyObject @returns o₁[key] equals o₂[key] */
const propsEq = curry3((key, o1, o2) => equals(o1[key], o2[key]));
const pathOr = curry3((_default, path, o) => length(path)
    ? isNil(o)
        ? _default
        : compose((k) => k in o ? pathOr(_default, slice(1, inf, path), o[k]) : _default, head)(path)
    : o);
const path = pathOr(undef);
const pathEq = curry3((_path, value, o) => equals(path(_path, o), value));
const pathsEq = curry3((_path, o1, o2) => equals(path(_path, o1), path(_path, o2)));
const pathExists = compose(ifElse(equals(symbol), F, T), pathOr(symbol));
const clone = (s, shallow = false) => {
    const t = type(s);
    switch (t) {
        case 'Null': return s;
        case 'Array': return (shallow ? [...s] : map(compose(clone, take(0)), s));
        case 'Object':
            if (shallow)
                return { ...s };
            const out = {};
            for (let k in s)
                out[k] = clone(s[k]);
            return out;
        case 'String':
        case 'Number':
        case 'Boolean':
        case 'Symbol':
            return s;
        default:
            return is_typed_arr(t) ? s.constructor.from(s) : s;
    }
};
const cloneShallow = (s) => clone(s, true);
const freeze = (o) => qfreeze(clone(o));
const freezeShallow = (o) => qfreezeShallow(clone(o));
/** types T1, T2
 *  @param reducer (accum: T1, current: T2, index: number) => newAccum: T1
 *  @param accum T1
 *  @param array T2[]
*/
const reduce = curry3((reducer, accum, arr) => qreduce(reducer, clone(accum), arr));
const pick = curry2((props, o) => {
    const out = {};
    for (const p of props)
        if (p in o)
            out[p] = o[p];
    return out;
});
const pickBy = curry2((cond, o) => compose(flip(pick)(o), qfilter(cond), keys)(o));
const omit = curry2((props, o) => filter((_, k) => !includes(k, props), o));
const fromPairs = (pairs) => Object.fromEntries(pairs);
const concat = curry2(((a, b) => b.concat(a)));
const map = curry2((pipe, arr) => arr.map(pipe));
const mapObj = curry2((pipe, o) => qmapObj(pipe, { ...o }));
const join = curry2((delimeter, arr) => arr.join(delimeter));
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
// @ts-ignore Some bug with overload.
) => where.replace(a, b));
// FIXME: it thinks cond is a symbol in usage !!!
const filter = curry2((cond, data) => isArray(data)
    ? data.filter(cond)
    : qfilter(cond, { ...data }));
/** Saves result of a function with given key and avoids calling it again.
 * @param {(...args: Args) string} keyGen that takes the same args and returns a key for the cache.
 * @param {(...args: Args) any} fn to be cached.
*/
const memoize = curry2((keyGen, fn) => {
    const cache = {};
    return (...args) => {
        const key = keyGen(...args);
        if (key in cache)
            return cache[key];
        const res = fn(...args);
        cache[key] = res;
        return res;
    };
});
const mergeShallow = curry2((o1, o2) => Object.assign({}, o1, o2));
const mergeDeep = curry2((a, b) => qmergeDeep(clone(a), b));
const mergeDeepX = curry2((a, b) => qmergeDeepX(clone(a), b));
const mergeDeepAdd = curry2((a, b) => qmergeDeepAdd(clone(a), b));
/** @param prop string @param pipe(data[prop]) @param data any @returns data with prop over pipe. */
const overProp = curry3((prop, pipe, data) => assoc(prop, pipe(data[prop]), data));
/** mapKeys({ a: 'b' }, { a: 44 }) -> { b: 44 } */
const mapKeys = curry2((keyMap, o) => qmapKeys(keyMap, Object.assign({}, o)));
const zip = curry2((a, b) => map((s, i) => [s, b[i]], a));
const zipObj = curry2((a, b) => reduce((ac, s, i) => assoc(s, b[i], ac), {}, a));
// TODO: Tuple curried functions to replace these `AnyFuncs`.
/** zips through a pipe. Types T1, T2, T3.
 * @returns T3[]
 * @param pipe (T1, T2) => T3
 * @param a T1[]
 * @param b T2[]
 */
const zipWith = curry3((pipe, a, b) => map((s, i) => pipe(s, b[i]), a));
// ALIASES
const mirror = identity;
const reflect = identity;
const echo = identity;
const notf = complement;
const push = append;
const some = any;
const weakEq = eq;

const ecran = '\\';
// TODO: make it splicy, not accumulatie by symbols.
/** Supports ecrans: '\\{"json": {yes} \\}'
  @returns getTmpl('one{meme}two')({meme: 42}) -> one42two */
const getTmpl = (tmpl) => {
    const parts = [];
    const keymap = [];
    const len = tmpl.length;
    let i = 0, s, ln, start = 0, open = false, hasEcran = false, hasEcranNext = false, nextChar;
    for (i = 0; i < len; i++) {
        s = tmpl[i];
        switch (s) {
            case '{':
                if (!hasEcran) {
                    open = true;
                    start = i;
                    break;
                }
            case '}':
                if (!hasEcran) {
                    open = false;
                    parts.push('');
                    keymap.push(tmpl.slice(start + 1, i));
                    break;
                }
            default:
                nextChar = tmpl[i + 1];
                hasEcranNext = s === ecran;
                if (!open && (!hasEcranNext || nextChar !== '{' && nextChar !== '}')) {
                    ln = parts.length - 1;
                    if (ln < 0) {
                        parts.push('');
                        ln++;
                    }
                    parts[ln] += s;
                }
                hasEcran = hasEcranNext;
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

const debounce = (time, fn) => {
    let queue = [];
    let to;
    return ((...args) => new Promise((ff) => {
        clearTimeout(to);
        to = setTimeout(async () => {
            const res = await fn(...args);
            for (ff of queue)
                ff(res);
            queue.splice(0);
        }, time);
        queue.push(ff);
    }));
};
// export const debouncePrepared = 
const throttle = (time, fn) => {
    let on = true;
    return (...args) => {
        if (on) {
            on = false;
            setTimeout(() => on = true, time);
            return fn(...args);
        }
    };
};
const wait = (time) => new Promise((ff) => setTimeout(ff, time));

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
/** Waits for a Promise that been generated by the first arg, then returns an untoched value. Types T.
 * @param {AnyFunc<Promise>} fn - function to wait.
 * @param {T} s - any value to tap and return back
 * @returns {T}
 */
const waitTap = curry2(async (fn, s) => { await fn(s); return s; });
/** Waits for all promises mapped by the fn. */
const forEachAsync = curry2((fn, items) => Promise.all(items.map(fn)));
/** The same as compose, but waits for promises in chains and returns a Promise.  */
const composeAsync = (() => {
    const pipe = async (fns, input, i) => ~i ? await pipe(fns, [await fns[i](...input)], --i) : head(input);
    return (...fns) => (...input) => pipe(fns, input, fns.length - 1);
})();

export { F, T, __, add, all, allPass, always, any, anyPass, append, assoc, assocPath, bind, both, callFrom, callWith, clone, cloneShallow, complement, compose, composeAsync, concat, cond, curry, curry2, curry3, debounce, diff, divide, echo, empty, eq, equals, explore, filter, find, findIndex, flat, flatShallow, flatTo, flip, forEach, forEachAsync, forEachSerial, freeze, freezeShallow, fromPairs, genBy, getTmpl, gt, gte, head, identity, ifElse, includes, indexOf, intersection, isEmpty, isNil, join, keys, last, length, lt, lte, map, mapKeys, mapObj, memoize, mergeDeep, mergeDeepAdd, mergeDeepX, mergeShallow, mirror, multiply, noop, not, notf, nth, omit, once, overProp, path, pathEq, pathExists, pathOr, pathsEq, pick, pickBy, prepend, prop, propEq, propsEq, push, qappend, qassoc, qassocPath, qempty, qfilter, qfreeze, qfreezeShallow, qmap, qmapKeys, qmapObj, qmergeDeep, qmergeDeepAdd, qmergeDeepX, qmergeShallow, qomit, qoverProp, qprepend, qpush, qreduce, qreverse, qsort, qstartsWith, qstartsWithWith, range, reduce, reflect, replace, reverse, sizeof, slice, some, sort, split, startsWith, subtract, symbol, tail, take, tap, test, throttle, toLower, toPairs, toUpper, trim, type, typeIs, uncurry, uniq, uniqWith, values, wait, waitAll, waitTap, weakEq, when, zip, zipObj, zipWith };
