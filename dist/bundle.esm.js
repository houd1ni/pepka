const to = (s) => typeof s;
const isNull = (s) => s === null;
const isUndef = (s) => s === void (0);
const _curry = (fn, _args, args) => _args.length + args.length < fn.length
    ? (...args) => _curry(fn, [..._args, ...args], args)
    : fn(..._args, ...args);
const curry = (fn) => (...args) => _curry(fn, args, []);
// unsafe wd be faster.
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
const compose = (...fns) => (s) => {
    for (let i = length(fns) - 1; i > -1; i--) {
        s = fns[i](s);
    }
    return s;
};
const isArray = (s) => Array.isArray(s);
const isNil = (s) => isNull(s) || isUndef(s);
const length = (s) => s.length;
const always = (s) => () => s;
const identity = (s) => s;
const trim = (s) => s.trim();
const last = (s) => s[s.length - 1];
const complement = (fn) => (s) => !fn(s);
const keys = (o) => Object.keys(o);
const values = (o) => Object.values(o);
const toPairs = (o) => Object.entries(o);
const assoc = curry((prop, v, obj) => ({
    ...obj,
    [prop]: v
}));
const clone = (s) => {
    switch (to(s)) {
        case 'object':
            switch (type(s)) {
                case 'Null': return s;
                case 'Array': return s.map(clone);
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
const reduce = curry((fn, accum, arr) => arr.reduce(fn, clone(accum)));
const fromPairs = (pairs) => reduce((o, pair) => assoc(...pair, o), {}, pairs);
const join = curry((delimeter, arr) => arr.join(delimeter));
const map = curry((pipe, arr) => arr.map(pipe));
// export const filter = curry(
//   (cond: Cond, arr: any[]) => arr.filter(cond)
// )
const forEach = curry((pipe, arr) => arr.forEach(pipe));
const both = curry((cond1, cond2, s) => cond2(s) && cond1(s));
const type = (s) => {
    const t = to(s);
    return t == 'object'
        ? isArray(s) ? 'Array' : (isNull(s) ? 'Null' : 'Object')
        : t[0].toUpperCase() + t.slice(1);
};
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

var pepka = /*#__PURE__*/Object.freeze({
  __proto__: null,
  curry: curry,
  equals: equals,
  ifElse: ifElse,
  when: when,
  compose: compose,
  isArray: isArray,
  isNil: isNil,
  length: length,
  always: always,
  identity: identity,
  trim: trim,
  last: last,
  complement: complement,
  keys: keys,
  values: values,
  toPairs: toPairs,
  assoc: assoc,
  clone: clone,
  reduce: reduce,
  fromPairs: fromPairs,
  join: join,
  map: map,
  forEach: forEach,
  both: both,
  type: type,
  isEmpty: isEmpty,
  replace: replace,
  filter: filter
});

window.pepka = pepka;
Object.assign(window, pepka);
