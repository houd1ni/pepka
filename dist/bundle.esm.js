const e = e => typeof e,
  r = e => null === e,
  t = (n, l) => {
    if ("object" === e(n) && "object" === e(l)) {
      if (r(n) || r(l)) return n === l;
      for (let e of [n, l])
        for (let r in e)
          if (!t(n[r], l[r])) return !1
    }
  },
  n = (e, r, t) => (r.push(...t), t.length + r.length <= e.length ? (...t) => n(e, r, t) : e(...r, ...t)),
  l = e => (...r) => n(e, [], r),
  c = e => {
    const t = typeof e;
    return "object" == t ? f(e) ? "Array" : r(e) ? "Null" : "Object" : t[0].toUpperCase() + t.slice(1)
  },
  o = l((e, r) => t => e(t) ? r(t) : t),
  u = (...e) => r => {
    for (let t = s(e) - 1; t > -1; t--) r = e[t](r);
    return r
  },
  a = l(t),
  f = e => Array.isArray(e),
  i = e => r(e) || (e => void 0 === e)(e),
  s = e => e.length,
  p = e => () => e,
  h = () => e => e,
  j = e => e.trim(),
  y = l((e, r) => r.join(e)),
  b = e => r => !e(r),
  g = l((e, r) => r.map(e)),
  A = l((e, r) => r.filter(e)),
  O = l((e, r) => r.forEach(e)),
  d = l((e, r, t) => r(t) && e(t)),
  m = e => {
    switch (c(e)) {
      case "String":
        return "" == e;
      case "Array":
        return 0 == s(e);
      case "Null":
        return !1;
      case "Object":
        return 0 == s(Object.keys(e));
      default:
        return !1
    }
  },
  N = l((e, r, t) => t.replace(e, r));
export {
  p as always, d as both, b as complement, u as compose, l as curry, a as equals, A as filter, O as forEach, h as identity, f as isArray, m as isEmpty, i as isNil, y as join, s as length, g as map, N as replace, j as trim, c as type, o as when
};