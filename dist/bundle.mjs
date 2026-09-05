// src/curry.ts
var __ = /* @__PURE__ */ Symbol("Placeholder");
var countArgs = (s) => {
  let i = 0;
  for (const v of s) v !== __ && i++;
  return i;
};
var addArgs = (args, _args) => {
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
var _curry = (fn, args, new_args) => {
  const args2add = fn.length - args.length - countArgs(new_args);
  if (args2add < 1) {
    return fn(...addArgs(args, new_args));
  } else {
    const curried = (...__args) => _curry(
      fn,
      addArgs(args, new_args),
      __args
    );
    curried.$args_left = args2add;
    return curried;
  }
};
var curry = (fn) => ((...args) => fn.length > countArgs(args) ? _curry(fn, [], args) : fn(...args));
var endlessph = (fn) => {
  function _endlessph(a) {
    return a === __ ? fn : fn(a);
  }
  return _endlessph;
};
var zero = 0;
function curry2(fn) {
  function curried2(a, ...args) {
    return args.length > zero ? a === __ ? endlessph((a2) => fn(a2, args[zero])) : fn(a, args[zero]) : (b) => fn(a, b);
  }
  return curried2;
}
function curry3(fn) {
  return curry(fn);
}

// src/internal.ts
var is_typed_arr = (x) => ArrayBuffer.isView(x);
var startsWithWith = (comparator) => curry2(
  (start, s) => {
    const len_start = length(start);
    const len_s = length(s);
    if (len_start > len_s) return false;
    for (let i = 0; i < len_start; i++) if (!comparator(s[i], start[i])) return false;
    return true;
  }
);
var unsafe_props = { "__proto__": true, "constructor": true, "prototype": true };
var undef = void 0;
var nul = null;
var inf = Infinity;
var not_assigned = /* @__PURE__ */ Symbol();
var to = (s) => typeof s;
var isSafe = (prop2) => !(prop2 in unsafe_props);
var length = (s) => s.length;

// src/utils.ts
var isNull = (s) => s === nul;
var isUndef = (s) => s === undef;
var isNum = (s) => to(s) == "number";
var isArray = (s) => Array.isArray(s);
function isFunc(s) {
  return to(s) === "function";
}
var isStr = (s) => to(s) === "string";
var isObj = (s) => !isNull(s) && to(s) === "object";
var isNil = (s) => isNull(s) || isUndef(s);

// src/common.ts
var { isNaN } = Number;
var caseMap = { u: "U", b: "B", n: "N", s: "S", f: "F", o: "O" };
var symbol = /* @__PURE__ */ Symbol();
var toLower = (s) => s.toLowerCase();
var toUpper = (s) => s.toUpperCase();
var cap_type = (t) => caseMap[t[0]] + t.slice(1);
var type = (s) => {
  const t = to(s);
  return t === "object" ? isNull(s) ? "Null" : s.constructor?.name || cap_type(t) : t === "number" && isNaN(s) ? "NaN" : cap_type(t);
};
var typeIs = curry2((t, s) => type(s) === t);
var eq = curry2((a, b) => a === b);
var equals = curry2((a, b) => {
  if (a === b) return true;
  const typea = type(a);
  const ta = is_typed_arr(a);
  if (eq(typea, type(b)) && (eq(typea, "Object") || eq(typea, "Array") || ta)) {
    if (ta) {
      if (typea === "Buffer") return a.equals(b);
      const len = length(a);
      if (len !== length(b)) return false;
      for (let i = 0; i < len; i++) if (a[i] !== b[i]) return false;
      return true;
    }
    if (isNull(a) || isNull(b)) return eq(a, b);
    for (const v of [a, b]) for (const k in v)
      if (!(v === b && k in a) && !(v === a && k in b && equals(a[k], b[k]))) return false;
    return true;
  }
  return false;
});
var includes = curry2(
  (s, ss) => {
    if (isStr(ss)) return ss.includes(s);
    else {
      for (const a of ss) if (equals(a, s)) return true;
      return false;
    }
  }
);
var always = (s) => () => s;
var identity = (s) => s;
var trim = (s) => s.trim();

// src/quick.ts
var { min } = Math;
var z = 0;
var qappend = curry2((s, xs) => {
  xs.push(s);
  return xs;
});
var qassoc = curry3((prop2, v, obj) => {
  obj[prop2] = v;
  return obj;
});
var qreduce = curry3((fn, accum, arr) => arr.reduce(fn, accum));
var mergeDeep = (strategy) => curry2((o1, o2) => {
  for (let k in o2) {
    if (isSafe(k)) switch (type(o2[k])) {
      case "Array":
        if (strategy > 1 && type(o1[k]) === "Array")
          switch (strategy) {
            case 2:
              const o1k = o1[k], o2k = o2[k];
              for (const i in o2k)
                if (o1k[i]) mergeDeep(strategy)(o1k[i], o2k[i]);
                else o1k[i] = o2k[i];
              break;
            case 3:
              o1[k].push(...o2[k]);
            default:
              break;
          }
        else o1[k] = o2[k];
        break;
      case "Object":
        if (type(o1[k]) === "Object") {
          mergeDeep(strategy)(o1[k], o2[k]);
          break;
        }
      default:
        o1[k] = o2[k];
        break;
    }
  }
  return o1;
});
var qmergeDeep = mergeDeep(1);
var qmergeDeepX = mergeDeep(2);
var qmergeDeepAdd = mergeDeep(3);
var qmergeShallow = curry2((o1, o2) => Object.assign(o1, o2));
var qmapKeys = curry2(
  (keyMap, o) => {
    let k, mapped, newKey, newValue, swap = {}, inswap;
    const km = keyMap;
    for (k in km) if (k in o) {
      mapped = km[k];
      [newKey, newValue] = isFunc(mapped) ? mapped(o[k], k, o) : [mapped, o[k]];
      if (newKey in km) swap[newKey] = o[newKey];
      inswap = k in swap;
      if (!isNil(newKey)) o[newKey] = inswap ? swap[k] : newValue;
      if (!inswap && k !== newKey) delete o[k];
    }
    return o;
  }
);
var qmap = curry2(
  (pipe, arr) => {
    for (const i in arr) arr[i] = pipe(arr[i], +i, arr);
    return arr;
  }
);
var qmapObj = curry2(
  (pipe, o) => {
    for (const k in o) o[k] = pipe(o[k], k, o);
    return o;
  }
);
var qfilter = curry2(
  (cond2, data) => {
    if (isArray(data)) {
      let indicies_offset = 0;
      const indicies2rm = [];
      const len = length(data);
      for (let i = 0; i < len; i++)
        if (!cond2(data[i], i))
          indicies2rm.push(i);
      for (const i of indicies2rm)
        data.splice(i - indicies_offset++, 1);
    } else for (const k in data)
      if (!cond2(data[k], k)) delete data[k];
    return data;
  }
);
var qempty = (o) => {
  if (isArray(o)) o.splice(0);
  else for (const i in o) delete o[i];
  return o;
};
var qfreeze = (o) => {
  let v;
  for (const k in o) {
    v = o[k];
    if (isObj(v)) qfreeze(v);
  }
  return Object.freeze(o);
};
var qfreezeShallow = (o) => Object.freeze(o);
var qprepend = curry2((x, xs) => xs.unshift(x));
var qsort = curry2((sortFn, xs) => xs.sort(sortFn));
var qassocPath = curry3((_path, v, o) => {
  const first = _path[0];
  return qassoc(
    first,
    _path.length < 2 ? v : qassocPath(_path.slice(1), v, isObj(o[first]) ? o[first] : {}),
    o
  );
});
var qreverse = (arr) => arr.reverse();
var qomit = curry2(
  (props, o) => qfilter(
    (_, k) => !includes(k, props),
    o
  )
);
var qoverProp = curry3(
  (prop2, pipe, data) => qassoc(prop2, pipe(data[prop2]), data)
);
var qpick = curry2((props, o) => {
  for (const p in o) if (!props.includes(p)) delete o[p];
  return o;
});
var qslice = curry3(
  (from, to2, xs) => {
    const right = isNum(to2) ? to2 : inf;
    const window_width = min(right, length(xs)) - from;
    if (isArray(xs)) {
      xs = xs;
      if (from > z) for (let i = z; i < window_width; i++) xs[i] = xs[from + i];
      xs.length = window_width;
      return xs;
    } else return xs.slice(from, right);
  }
);
var rmel = (index, xs) => {
  const len = length(xs);
  for (let i = index; i < len; i++) xs[i] = xs[i + 1];
  xs.length = len - 1;
  return xs;
};
var seen = /* @__PURE__ */ new Set();
var quniqWith = curry2((getter, xs) => {
  let size = length(xs), cur;
  for (let i = z; i < size; i++) {
    const x = xs[i];
    cur = getter(x);
    if (seen.has(cur)) {
      rmel(i, xs);
      size--;
      i--;
    } else seen.add(cur);
  }
  seen.clear();
  return xs;
});
var quniq = quniqWith(identity);
var qpush = qappend;
var quniqBy = quniqWith;

// src/safe.ts
var { assign } = Object;
var take = (argN) => (...args) => args[argN];
var ifElse = curry(
  (cond2, pipeYes, pipeNo, s) => cond2(s) ? pipeYes(s) : pipeNo(s)
);
var when = curry3(
  (cond2, pipe, s) => ifElse(cond2, pipe, identity, s)
);
var compose = ((...fns) => (...args) => {
  let first = true;
  let s;
  for (let i = length(fns) - 1; i > -1; i--) {
    if (first) {
      first = false;
      s = fns[i](...args);
    } else
      s = s === __ ? fns[i]() : fns[i](s);
  }
  return s;
});
var bind = curry2((fn, context) => fn.bind(context));
var nth = curry2((i, data) => data[i]);
var slice = curry3(
  (from, to2, o) => o.slice(from, isNum(to2) ? to2 : inf)
);
var flip = (fn) => curry2(
  (b, a) => fn(a, b)
);
var head = nth(0);
var tail = slice(1, inf);
var last = (s) => s[length(s) - 1];
var add = curry2((a, b) => a + b);
var subtract = curry2((a, b) => b - a);
var multiply = curry2((a, b) => a * b);
var gt = curry2((a, b) => a < b);
var lt = curry2((a, b) => a > b);
var gte = curry2((a, b) => a <= b);
var lte = curry2((a, b) => a >= b);
var sort = curry2((sortFn, xs) => [...xs].sort(sortFn));
var find = curry2((fn, s) => s.find(fn));
var findIndex = curry2((fn, s) => s.findIndex(fn));
var indexOf = curry2((x, xs) => findIndex(equals(x), xs));
var divide = curry2((a, b) => b / a);
var not = (x) => !x;
var keys = (o) => Object.keys(o);
var values = (o) => Object.values(o);
var toPairs = (o) => Object.entries(o);
var test = curry2((re, s) => re.test(s));
var tap = curry2((fn, x) => {
  fn(x);
  return x;
});
var append = curry2((x, xs) => [...xs, x]);
var prepend = curry2((x, xs) => [x, ...xs]);
var flat = (xs) => xs.flat(inf);
var flatShallow = (xs) => xs.flat();
var flatTo = curry2((depth, xs) => xs.flat(depth));
var split = curry2((s, xs) => xs.split(s));
var T = always(true);
var F = always(false);
var callWith = curry2((args, fn) => fn(...args));
var noop = (() => {
});
var callFrom = curry((args, fn, o) => o[fn](...args));
var complement = (fn) => (...args) => {
  const out = fn(...args);
  const f = isFunc(out);
  return !f || !out.$args_left ? not(out) : complement(out);
};
var sizeof = (s) => {
  if (isObj(s)) {
    let len = 0;
    for (let _k in s) len++;
    return len;
  } else return length(s);
};
var range = curry2((from, to2) => genBy(add(from), to2 - from));
var uniqWith = curry2((cond2, xs) => qreduce(
  (accum, x) => find((y) => cond2(x, y), accum) ? accum : qappend(x, accum),
  [],
  xs
));
var uniq = uniqWith(equals);
var intersection = curry2(
  (xs1, xs2) => xs1.filter((x) => includes(x, xs2))
);
var diff = curry2((_xs1, _xs2) => {
  let len1 = length(_xs1);
  let len2 = length(_xs2);
  const xs1 = len1 > len2 ? _xs1 : _xs2;
  const xs2 = len1 > len2 ? _xs2 : _xs1;
  if (len1 < len2) [len1, len2] = [len2, len1];
  const xset2 = new Set(xs2);
  const common = /* @__PURE__ */ new Set();
  const out = [];
  let i;
  for (i = 0; i < len1; i++) {
    const el = xs1[i];
    if (xset2.has(el)) common.add(el);
    else out.push(el);
  }
  for (i = 0; i < len2; i++) {
    const el = xs2[i];
    if (!common.has(el)) out.push(el);
  }
  return out;
});
var genBy = curry2(
  (generator, length2) => {
    const a = new Array(length2);
    for (let i = 0; i < length2; i++) a[i] = generator(i);
    return a;
  }
);
var once = (fn) => {
  let done = false, cache;
  return function(...args) {
    if (done) return cache;
    done = true;
    return cache = fn(...args);
  };
};
var reverse = (xs) => xs.toReversed();
var explore = (caption, level = "log") => tap(
  (v) => console[level](caption, v)
);
var cond = curry2(
  (pairs, s) => {
    for (const [cond2, fn] of pairs) if (cond2(s)) return fn(s);
  }
);
var assoc = curry3(
  (prop2, v, obj) => ({ ...obj, [prop2]: v })
);
var assocPath = curry3(
  (_path, v, o) => compose(
    (first) => assoc(
      first,
      length(_path) < 2 ? v : assocPath(slice(1, inf, _path), v, isObj(o[first]) ? o[first] : {}),
      o
    ),
    head
  )(_path)
);
var all = curry2((pred, xs) => xs.every(pred));
var any = curry2((pred, xs) => xs.some(pred));
var allPass = curry2((preds, x) => preds.every((pred) => pred(x)));
var anyPass = curry2((preds, x) => preds.some((pred) => pred(x)));
var startsWith = startsWithWith(equals);
var startsWithShallow = startsWithWith(eq);
var prop = curry2(((key, o) => o[key]));
var propEq = curry3(
  (key, value, o) => equals(o[key], value)
);
var propsEq = curry3(
  (key, o1, o2) => equals(o1[key], o2[key])
);
var _pathOr = (_default, path2, o) => length(path2) ? isNil(o) ? _default : compose(
  (k) => k in o ? _pathOr(_default, slice(1, inf, path2), o[k]) : _default,
  head
)(path2) : o;
var pathOr = curry3(_pathOr);
var path = pathOr(undef);
var pathEq = curry3(
  (_path, value, o) => equals(path(_path, o), value)
);
var pathsEq = curry3(
  (_path, o1, o2) => equals(path(_path, o1), path(_path, o2))
);
var pathExists = compose(ifElse(equals(symbol), F, T), pathOr(symbol));
var clone = (s, shallow = false) => {
  const t = type(s);
  switch (t) {
    case "Null":
      return s;
    case "Array":
      return shallow ? [...s] : map(compose(clone, take(0)), s);
    case "Object":
      if (shallow) return { ...s };
      const out = {};
      for (let k in s) out[k] = clone(s[k]);
      return out;
    case "String":
    case "Number":
    case "Boolean":
    case "Symbol":
      return s;
    default:
      return is_typed_arr(s) ? s.constructor.from(s) : s;
  }
};
var cloneShallow = (s) => clone(s, true);
var freeze = (o) => qfreeze(clone(o));
var freezeShallow = (o) => qfreezeShallow(clone(o));
var reduce = curry3(
  (reducer, accum, arr) => qreduce(reducer, clone(accum), arr)
);
var pick = curry2(
  (props, o) => {
    const out = {};
    for (const p of props) if (p in o) out[p] = o[p];
    return out;
  }
);
var pickBy = curry2(
  (cond2, o) => compose(flip(pick)(o), qfilter(cond2), keys)(o)
);
var omit = curry2(
  (props, o) => filter(
    (_, k) => !includes(k, props),
    o
  )
);
var fromPairs = (pairs) => Object.fromEntries(pairs);
var concat = curry2(
  ((a, b) => b.concat(a))
);
var map = curry2(
  (pipe, arr) => arr.map(pipe)
);
var mapObj = curry2(
  (pipe, o) => qmapObj(pipe, { ...o })
);
var join = curry2(
  (delimeter, arr) => arr.join(delimeter)
);
var forEach = curry2(
  (pipe, arr) => arr.forEach(pipe)
);
var both = curry3((cond1, cond2, s) => cond2(s) && cond1(s));
var isEmpty = (s) => {
  switch (type(s)) {
    case "String":
    case "Array":
      return length(s) == 0;
    case "Object":
      for (const _k in s) return false;
      return true;
    default:
      return null;
  }
};
var empty = (s) => {
  switch (type(s)) {
    case "String":
      return "";
    case "Object":
      return {};
    case "Array":
      return [];
    default:
      return undef;
  }
};
var replace = curry3(
  (a, b, where) => where.replace(a, b)
);
var filter = curry2(
  (cond2, data) => isArray(data) ? data.filter(cond2) : qfilter(cond2, { ...data })
);
var memoize = curry2((keyGen, fn) => {
  const cache = {};
  return (...args) => {
    const key = keyGen(...args);
    if (key in cache) return cache[key];
    const res = fn(...args);
    cache[key] = res;
    return res;
  };
});
var mergeShallow = curry2(
  (o1, o2) => assign({}, o1, o2)
);
var mergeDeep2 = curry2(
  (a, b) => qmergeDeep(clone(a), b)
);
var mergeDeepX = curry2(
  (a, b) => qmergeDeepX(clone(a), b)
);
var mergeDeepAdd = curry2(
  (a, b) => qmergeDeepAdd(clone(a), b)
);
var overProp = curry3(
  (prop2, pipe, data) => prop2 in data ? assoc(prop2, pipe(data[prop2]), data) : data
);
var mapKeys = curry2(
  (keyMap, o) => qmapKeys(keyMap, assign({}, o))
);
var zip = curry2(
  (a, b) => map((s, i) => [s, b[i]], a)
);
var zipObj = curry2(
  (a, b) => reduce((ac, s, i) => assoc(s, b[i], ac), {}, a)
);
var zipWith = curry3(
  (pipe, a, b) => map((s, i) => pipe(s, b[i]), a)
);
var mirror = identity;
var reflect = identity;
var echo = identity;
var notf = complement;
var push = append;
var some = any;
var weakEq = eq;
var uniqBy = uniqWith;
var propLens = overProp;

// src/async.ts
var forEachSerial = (() => {
  const pipe = async (fn, items, i) => {
    if (i < items.length) {
      await fn(items[i]);
      await pipe(fn, items, ++i);
    }
  };
  return curry2(
    (fn, items) => pipe(fn, items, 0)
  );
})();
var waitAll = (promises) => Promise.all(promises);
var qwaitAll = async (xs) => new Promise((ff, rj) => {
  const len = length(xs);
  let j = len;
  for (let i = 0; i < len; i++) xs[i].then((x) => {
    xs[i] = x;
    if (--j) ff(xs);
  }).catch(rj);
});
var waitTap = curry2(
  async (fn, s) => {
    await fn(s);
    return s;
  }
);
var forEachParallel = curry2(
  (fn, items) => Promise.all(items.map(fn))
);
var composeAsync = /* @__PURE__ */ (() => {
  const pipe = async (fns, input, i) => ~i ? await pipe(fns, [await fns[i](...input)], --i) : head(input);
  return (...fns) => (...input) => pipe(fns, input, fns.length - 1);
})();
var qfilterAsync = curry2(async (cond2, data) => {
  if (isArray(data)) {
    let indicies_offset = 0;
    const indicies2rm = [];
    const len = length(data);
    for (let i = 0; i < len; i++)
      if (!await cond2(data[i], i))
        indicies2rm.push(i);
    for (const i of indicies2rm)
      data.splice(i - indicies_offset++, 1);
  } else for (const k in data)
    if (!await cond2(data[k], k)) delete data[k];
  return data;
});
var QPromise = class extends Promise {
  constructor(fn, oncancel = noop) {
    let _cancel_data = not_assigned;
    super((ff, rj) => {
      _cancel_data = fn(ff, rj);
      setTimeout(() => {
        this.ff = ff;
        this.rj = rj;
      });
    });
    this.oncancel = oncancel;
    const set_cb = () => this._cancel_data = _cancel_data;
    if (_cancel_data !== not_assigned) set_cb();
    else setTimeout(set_cb);
  }
  oncancel;
  ff;
  rj;
  _cancel_data;
  cancel(resolve = false) {
    if (resolve) this.ff?.();
    else this.rj?.();
    this.oncancel(this._cancel_data);
  }
};

// src/strings.ts
var ecran = "\\";
var getTmpl = (tmpl) => {
  const parts = [];
  const keymap = [];
  const len = tmpl.length;
  let i = 0, s, ln, start = 0, open = false, hasEcran = false, hasEcranNext = false, nextChar;
  for (i = 0; i < len; i++) {
    s = tmpl[i];
    switch (s) {
      case "{":
        if (!hasEcran) {
          open = true;
          start = i;
          break;
        }
      case "}":
        if (!hasEcran) {
          open = false;
          parts.push("");
          keymap.push(tmpl.slice(start + 1, i));
          break;
        }
      default:
        nextChar = tmpl[i + 1];
        hasEcranNext = s === ecran;
        if (!open && (!hasEcranNext || nextChar !== "{" && nextChar !== "}")) {
          ln = parts.length - 1;
          if (ln < 0) {
            parts.push("");
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
    const ln2 = parts.length - 1;
    for (const j in parts) {
      i = +j;
      out.push(parts[i]);
      if (i !== ln2) out.push(path(keymap[i].split("."), data));
    }
    return out.join("");
  };
};

// src/timers.ts
var debounce = (time, fn) => {
  let queue = [];
  let to2;
  return ((...args) => new Promise((ff) => {
    clearTimeout(to2);
    to2 = setTimeout(async () => {
      const res = await fn(...args);
      for (ff of queue) ff(res);
      queue.splice(0);
    }, time);
    queue.push(ff);
  }));
};
var throttle = (time, fn) => {
  let on = true;
  let res;
  return (...args) => {
    if (on) {
      on = false;
      setTimeout(() => on = true, time);
      res = fn(...args);
    }
    return res;
  };
};
var wait = (time) => new QPromise(
  (ff) => setTimeout(ff, time),
  (timeout) => clearTimeout(timeout)
);

// src/uncurry.ts
var uncurry = (fn) => (...args) => qreduce(
  ((fn2, arg) => fn2 ? fn2(arg) : fn2),
  fn,
  args
);
export {
  F,
  QPromise,
  T,
  __,
  add,
  all,
  allPass,
  always,
  any,
  anyPass,
  append,
  assoc,
  assocPath,
  bind,
  both,
  callFrom,
  callWith,
  clone,
  cloneShallow,
  complement,
  compose,
  composeAsync,
  concat,
  cond,
  curry,
  curry2,
  curry3,
  debounce,
  diff,
  divide,
  echo,
  empty,
  eq,
  equals,
  explore,
  filter,
  find,
  findIndex,
  flat,
  flatShallow,
  flatTo,
  flip,
  forEach,
  forEachParallel,
  forEachSerial,
  freeze,
  freezeShallow,
  fromPairs,
  genBy,
  getTmpl,
  gt,
  gte,
  head,
  identity,
  ifElse,
  includes,
  indexOf,
  intersection,
  isArray,
  isEmpty,
  isFunc,
  isNil,
  isNull,
  isNum,
  isObj,
  isStr,
  isUndef,
  join,
  keys,
  last,
  length,
  lt,
  lte,
  map,
  mapKeys,
  mapObj,
  memoize,
  mergeDeep2 as mergeDeep,
  mergeDeepAdd,
  mergeDeepX,
  mergeShallow,
  mirror,
  multiply,
  noop,
  not,
  notf,
  nth,
  omit,
  once,
  overProp,
  path,
  pathEq,
  pathExists,
  pathOr,
  pathsEq,
  pick,
  pickBy,
  prepend,
  prop,
  propEq,
  propLens,
  propsEq,
  push,
  qappend,
  qassoc,
  qassocPath,
  qempty,
  qfilter,
  qfilterAsync,
  qfreeze,
  qfreezeShallow,
  qmap,
  qmapKeys,
  qmapObj,
  qmergeDeep,
  qmergeDeepAdd,
  qmergeDeepX,
  qmergeShallow,
  qomit,
  qoverProp,
  qpick,
  qprepend,
  qpush,
  qreduce,
  qreverse,
  qslice,
  qsort,
  quniq,
  quniqBy,
  quniqWith,
  qwaitAll,
  range,
  reduce,
  reflect,
  replace,
  reverse,
  sizeof,
  slice,
  some,
  sort,
  split,
  startsWith,
  startsWithShallow,
  subtract,
  symbol,
  tail,
  take,
  tap,
  test,
  throttle,
  toLower,
  toPairs,
  toUpper,
  trim,
  type,
  typeIs,
  uncurry,
  uniq,
  uniqBy,
  uniqWith,
  values,
  wait,
  waitAll,
  waitTap,
  weakEq,
  when,
  zip,
  zipObj,
  zipWith
};
