const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/DashBoardLayout-zGJ9CnxR.js",
      "assets/DashBoardLayout-DBXyTgq-.css",
    ]),
) => i.map((i) => d[i]);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
/**
 * @vue/shared v3.5.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Hr(e) {
  const t = Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ne = {},
  Ct = [],
  Ve = () => {},
  wo = () => !1,
  Bn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  kr = (e) => e.startsWith("onUpdate:"),
  de = Object.assign,
  qr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  gl = Object.prototype.hasOwnProperty,
  G = (e, t) => gl.call(e, t),
  $ = Array.isArray,
  Pt = (e) => $n(e) === "[object Map]",
  So = (e) => $n(e) === "[object Set]",
  q = (e) => typeof e == "function",
  oe = (e) => typeof e == "string",
  ht = (e) => typeof e == "symbol",
  re = (e) => e !== null && typeof e == "object",
  Ro = (e) => (re(e) || q(e)) && q(e.then) && q(e.catch),
  vo = Object.prototype.toString,
  $n = (e) => vo.call(e),
  yl = (e) => $n(e).slice(8, -1),
  xo = (e) => $n(e) === "[object Object]",
  Vr = (e) =>
    oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  zt = Hr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  Hn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  bl = /-\w/g,
  Ae = Hn((e) => e.replace(bl, (t) => t.slice(1).toUpperCase())),
  _l = /\B([A-Z])/g,
  St = Hn((e) => e.replace(_l, "-$1").toLowerCase()),
  kn = Hn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  rr = Hn((e) => (e ? `on${kn(e)}` : "")),
  ut = (e, t) => !Object.is(e, t),
  sr = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  Oo = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: r,
      value: n,
    });
  },
  El = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let ps;
const qn = () =>
  ps ||
  (ps =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function Kr(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = oe(r) ? vl(r) : Kr(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else if (oe(e) || re(e)) return e;
}
const wl = /;(?![^(]*\))/g,
  Sl = /:([^]+)/,
  Rl = /\/\*[^]*?\*\//g;
function vl(e) {
  const t = {};
  return (
    e
      .replace(Rl, "")
      .split(wl)
      .forEach((n) => {
        if (n) {
          const r = n.split(Sl);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Wr(e) {
  let t = "";
  if (oe(e)) t = e;
  else if ($(e))
    for (let n = 0; n < e.length; n++) {
      const r = Wr(e[n]);
      r && (t += r + " ");
    }
  else if (re(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const xl =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ol = Hr(xl);
function Ao(e) {
  return !!e || e === "";
}
const To = (e) => !!(e && e.__v_isRef === !0),
  Al = (e) =>
    oe(e)
      ? e
      : e == null
        ? ""
        : $(e) || (re(e) && (e.toString === vo || !q(e.toString)))
          ? To(e)
            ? Al(e.value)
            : JSON.stringify(e, Co, 2)
          : String(e),
  Co = (e, t) =>
    To(t)
      ? Co(e, t.value)
      : Pt(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, s], o) => ((n[or(r, o) + " =>"] = s), n),
              {},
            ),
          }
        : So(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => or(n)) }
          : ht(t)
            ? or(t)
            : re(t) && !$(t) && !xo(t)
              ? String(t)
              : t,
  or = (e, t = "") => {
    var n;
    return ht(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.5.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let _e;
class Tl {
  constructor(t = !1) {
    ((this.detached = t),
      (this._active = !0),
      (this._on = 0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = _e),
      !t &&
        _e &&
        (this.index = (_e.scopes || (_e.scopes = [])).push(this) - 1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = _e;
      try {
        return ((_e = this), t());
      } finally {
        _e = n;
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = _e), (_e = this));
  }
  off() {
    this._on > 0 &&
      --this._on === 0 &&
      ((_e = this.prevScope), (this.prevScope = void 0));
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function Cl() {
  return _e;
}
let te;
const ir = new WeakSet();
class Po {
  constructor(t) {
    ((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      _e && _e.active && _e.effects.push(this));
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), ir.has(this) && (ir.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Fo(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    ((this.flags |= 2), ms(this), Lo(this));
    const t = te,
      n = Ne;
    ((te = this), (Ne = !0));
    try {
      return this.fn();
    } finally {
      (Mo(this), (te = t), (Ne = n), (this.flags &= -3));
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Gr(t);
      ((this.deps = this.depsTail = void 0),
        ms(this),
        this.onStop && this.onStop(),
        (this.flags &= -2));
    }
  }
  trigger() {
    this.flags & 64
      ? ir.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    Sr(this) && this.run();
  }
  get dirty() {
    return Sr(this);
  }
}
let No = 0,
  Jt,
  Gt;
function Fo(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ((e.next = Gt), (Gt = e));
    return;
  }
  ((e.next = Jt), (Jt = e));
}
function zr() {
  No++;
}
function Jr() {
  if (--No > 0) return;
  if (Gt) {
    let t = Gt;
    for (Gt = void 0; t; ) {
      const n = t.next;
      ((t.next = void 0), (t.flags &= -9), (t = n));
    }
  }
  let e;
  for (; Jt; ) {
    let t = Jt;
    for (Jt = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Lo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t));
}
function Mo(e) {
  let t,
    n = e.depsTail,
    r = n;
  for (; r; ) {
    const s = r.prevDep;
    (r.version === -1 ? (r === n && (n = s), Gr(r), Pl(r)) : (t = r),
      (r.dep.activeLink = r.prevActiveLink),
      (r.prevActiveLink = void 0),
      (r = s));
  }
  ((e.deps = t), (e.depsTail = n));
}
function Sr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Io(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function Io(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === nn) ||
    ((e.globalVersion = nn),
    !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Sr(e)))
  )
    return;
  e.flags |= 2;
  const t = e.dep,
    n = te,
    r = Ne;
  ((te = e), (Ne = !0));
  try {
    Lo(e);
    const s = e.fn(e._value);
    (t.version === 0 || ut(s, e._value)) &&
      ((e.flags |= 128), (e._value = s), t.version++);
  } catch (s) {
    throw (t.version++, s);
  } finally {
    ((te = n), (Ne = r), Mo(e), (e.flags &= -3));
  }
}
function Gr(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: s } = e;
  if (
    (r && ((r.nextSub = s), (e.prevSub = void 0)),
    s && ((s.prevSub = r), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = r), !r && n.computed))
  ) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) Gr(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Pl(e) {
  const { prevDep: t, nextDep: n } = e;
  (t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let Ne = !0;
const Do = [];
function et() {
  (Do.push(Ne), (Ne = !1));
}
function tt() {
  const e = Do.pop();
  Ne = e === void 0 ? !0 : e;
}
function ms(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = te;
    te = void 0;
    try {
      t();
    } finally {
      te = n;
    }
  }
}
let nn = 0;
class Nl {
  constructor(t, n) {
    ((this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0));
  }
}
class Xr {
  constructor(t) {
    ((this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0),
      (this.__v_skip = !0));
  }
  track(t) {
    if (!te || !Ne || te === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== te)
      ((n = this.activeLink = new Nl(te, this)),
        te.deps
          ? ((n.prevDep = te.depsTail),
            (te.depsTail.nextDep = n),
            (te.depsTail = n))
          : (te.deps = te.depsTail = n),
        jo(n));
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const r = n.nextDep;
      ((r.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = r),
        (n.prevDep = te.depsTail),
        (n.nextDep = void 0),
        (te.depsTail.nextDep = n),
        (te.depsTail = n),
        te.deps === n && (te.deps = r));
    }
    return n;
  }
  trigger(t) {
    (this.version++, nn++, this.notify(t));
  }
  notify(t) {
    zr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Jr();
    }
  }
}
function jo(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) jo(r);
    }
    const n = e.dep.subs;
    (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
  }
}
const Rr = new WeakMap(),
  _t = Symbol(""),
  vr = Symbol(""),
  rn = Symbol("");
function ce(e, t, n) {
  if (Ne && te) {
    let r = Rr.get(e);
    r || Rr.set(e, (r = new Map()));
    let s = r.get(n);
    (s || (r.set(n, (s = new Xr())), (s.map = r), (s.key = n)), s.track());
  }
}
function Ye(e, t, n, r, s, o) {
  const i = Rr.get(e);
  if (!i) {
    nn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ((zr(), t === "clear")) i.forEach(l);
  else {
    const c = $(e),
      u = c && Vr(n);
    if (c && n === "length") {
      const a = Number(r);
      i.forEach((f, p) => {
        (p === "length" || p === rn || (!ht(p) && p >= a)) && l(f);
      });
    } else
      switch (
        ((n !== void 0 || i.has(void 0)) && l(i.get(n)), u && l(i.get(rn)), t)
      ) {
        case "add":
          c ? u && l(i.get("length")) : (l(i.get(_t)), Pt(e) && l(i.get(vr)));
          break;
        case "delete":
          c || (l(i.get(_t)), Pt(e) && l(i.get(vr)));
          break;
        case "set":
          Pt(e) && l(i.get(_t));
          break;
      }
  }
  Jr();
}
function Ot(e) {
  const t = J(e);
  return t === e ? t : (ce(t, "iterate", rn), Oe(e) ? t : t.map(le));
}
function Vn(e) {
  return (ce((e = J(e)), "iterate", rn), e);
}
const Fl = {
  __proto__: null,
  [Symbol.iterator]() {
    return lr(this, Symbol.iterator, le);
  },
  concat(...e) {
    return Ot(this).concat(...e.map((t) => ($(t) ? Ot(t) : t)));
  },
  entries() {
    return lr(this, "entries", (e) => ((e[1] = le(e[1])), e));
  },
  every(e, t) {
    return Je(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Je(this, "filter", e, t, (n) => n.map(le), arguments);
  },
  find(e, t) {
    return Je(this, "find", e, t, le, arguments);
  },
  findIndex(e, t) {
    return Je(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Je(this, "findLast", e, t, le, arguments);
  },
  findLastIndex(e, t) {
    return Je(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Je(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return cr(this, "includes", e);
  },
  indexOf(...e) {
    return cr(this, "indexOf", e);
  },
  join(e) {
    return Ot(this).join(e);
  },
  lastIndexOf(...e) {
    return cr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return kt(this, "pop");
  },
  push(...e) {
    return kt(this, "push", e);
  },
  reduce(e, ...t) {
    return gs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return gs(this, "reduceRight", e, t);
  },
  shift() {
    return kt(this, "shift");
  },
  some(e, t) {
    return Je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return kt(this, "splice", e);
  },
  toReversed() {
    return Ot(this).toReversed();
  },
  toSorted(e) {
    return Ot(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ot(this).toSpliced(...e);
  },
  unshift(...e) {
    return kt(this, "unshift", e);
  },
  values() {
    return lr(this, "values", le);
  },
};
function lr(e, t, n) {
  const r = Vn(e),
    s = r[t]();
  return (
    r !== e &&
      !Oe(e) &&
      ((s._next = s.next),
      (s.next = () => {
        const o = s._next();
        return (o.value && (o.value = n(o.value)), o);
      })),
    s
  );
}
const Ll = Array.prototype;
function Je(e, t, n, r, s, o) {
  const i = Vn(e),
    l = i !== e && !Oe(e),
    c = i[t];
  if (c !== Ll[t]) {
    const f = c.apply(e, o);
    return l ? le(f) : f;
  }
  let u = n;
  i !== e &&
    (l
      ? (u = function (f, p) {
          return n.call(this, le(f), p, e);
        })
      : n.length > 2 &&
        (u = function (f, p) {
          return n.call(this, f, p, e);
        }));
  const a = c.call(i, u, r);
  return l && s ? s(a) : a;
}
function gs(e, t, n, r) {
  const s = Vn(e);
  let o = n;
  return (
    s !== e &&
      (Oe(e)
        ? n.length > 3 &&
          (o = function (i, l, c) {
            return n.call(this, i, l, c, e);
          })
        : (o = function (i, l, c) {
            return n.call(this, i, le(l), c, e);
          })),
    s[t](o, ...r)
  );
}
function cr(e, t, n) {
  const r = J(e);
  ce(r, "iterate", rn);
  const s = r[t](...n);
  return (s === -1 || s === !1) && Zr(n[0])
    ? ((n[0] = J(n[0])), r[t](...n))
    : s;
}
function kt(e, t, n = []) {
  (et(), zr());
  const r = J(e)[t].apply(e, n);
  return (Jr(), tt(), r);
}
const Ml = Hr("__proto__,__v_isRef,__isVue"),
  Uo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(ht),
  );
function Il(e) {
  ht(e) || (e = String(e));
  const t = J(this);
  return (ce(t, "has", e), t.hasOwnProperty(e));
}
class Bo {
  constructor(t = !1, n = !1) {
    ((this._isReadonly = t), (this._isShallow = n));
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly,
      o = this._isShallow;
    if (n === "__v_isReactive") return !s;
    if (n === "__v_isReadonly") return s;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw")
      return r === (s ? (o ? Kl : qo) : o ? ko : Ho).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0;
    const i = $(t);
    if (!s) {
      let c;
      if (i && (c = Fl[n])) return c;
      if (n === "hasOwnProperty") return Il;
    }
    const l = Reflect.get(t, n, fe(t) ? t : r);
    return (ht(n) ? Uo.has(n) : Ml(n)) || (s || ce(t, "get", n), o)
      ? l
      : fe(l)
        ? i && Vr(n)
          ? l
          : l.value
        : re(l)
          ? s
            ? Ko(l)
            : Kn(l)
          : l;
  }
}
class $o extends Bo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const c = ft(o);
      if (
        (!Oe(r) && !ft(r) && ((o = J(o)), (r = J(r))), !$(t) && fe(o) && !fe(r))
      )
        return (c || (o.value = r), !0);
    }
    const i = $(t) && Vr(n) ? Number(n) < t.length : G(t, n),
      l = Reflect.set(t, n, r, fe(t) ? t : s);
    return (
      t === J(s) && (i ? ut(r, o) && Ye(t, "set", n, r) : Ye(t, "add", n, r)),
      l
    );
  }
  deleteProperty(t, n) {
    const r = G(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return (s && r && Ye(t, "delete", n, void 0), s);
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return ((!ht(n) || !Uo.has(n)) && ce(t, "has", n), r);
  }
  ownKeys(t) {
    return (ce(t, "iterate", $(t) ? "length" : _t), Reflect.ownKeys(t));
  }
}
class Dl extends Bo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const jl = new $o(),
  Ul = new Dl(),
  Bl = new $o(!0);
const xr = (e) => e,
  bn = (e) => Reflect.getPrototypeOf(e);
function $l(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = J(s),
      i = Pt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      u = s[e](...r),
      a = n ? xr : t ? Tn : le;
    return (
      !t && ce(o, "iterate", c ? vr : _t),
      {
        next() {
          const { value: f, done: p } = u.next();
          return p
            ? { value: f, done: p }
            : { value: l ? [a(f[0]), a(f[1])] : a(f), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function _n(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Hl(e, t) {
  const n = {
    get(s) {
      const o = this.__v_raw,
        i = J(o),
        l = J(s);
      e || (ut(s, l) && ce(i, "get", s), ce(i, "get", l));
      const { has: c } = bn(i),
        u = t ? xr : e ? Tn : le;
      if (c.call(i, s)) return u(o.get(s));
      if (c.call(i, l)) return u(o.get(l));
      o !== i && o.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return (!e && ce(J(s), "iterate", _t), s.size);
    },
    has(s) {
      const o = this.__v_raw,
        i = J(o),
        l = J(s);
      return (
        e || (ut(s, l) && ce(i, "has", s), ce(i, "has", l)),
        s === l ? o.has(s) : o.has(s) || o.has(l)
      );
    },
    forEach(s, o) {
      const i = this,
        l = i.__v_raw,
        c = J(l),
        u = t ? xr : e ? Tn : le;
      return (
        !e && ce(c, "iterate", _t),
        l.forEach((a, f) => s.call(o, u(a), u(f), i))
      );
    },
  };
  return (
    de(
      n,
      e
        ? {
            add: _n("add"),
            set: _n("set"),
            delete: _n("delete"),
            clear: _n("clear"),
          }
        : {
            add(s) {
              !t && !Oe(s) && !ft(s) && (s = J(s));
              const o = J(this);
              return (
                bn(o).has.call(o, s) || (o.add(s), Ye(o, "add", s, s)),
                this
              );
            },
            set(s, o) {
              !t && !Oe(o) && !ft(o) && (o = J(o));
              const i = J(this),
                { has: l, get: c } = bn(i);
              let u = l.call(i, s);
              u || ((s = J(s)), (u = l.call(i, s)));
              const a = c.call(i, s);
              return (
                i.set(s, o),
                u ? ut(o, a) && Ye(i, "set", s, o) : Ye(i, "add", s, o),
                this
              );
            },
            delete(s) {
              const o = J(this),
                { has: i, get: l } = bn(o);
              let c = i.call(o, s);
              (c || ((s = J(s)), (c = i.call(o, s))), l && l.call(o, s));
              const u = o.delete(s);
              return (c && Ye(o, "delete", s, void 0), u);
            },
            clear() {
              const s = J(this),
                o = s.size !== 0,
                i = s.clear();
              return (o && Ye(s, "clear", void 0, void 0), i);
            },
          },
    ),
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      n[s] = $l(s, e, t);
    }),
    n
  );
}
function Qr(e, t) {
  const n = Hl(e, t);
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
        ? e
        : s === "__v_raw"
          ? r
          : Reflect.get(G(n, s) && s in r ? n : r, s, o);
}
const kl = { get: Qr(!1, !1) },
  ql = { get: Qr(!1, !0) },
  Vl = { get: Qr(!0, !1) };
const Ho = new WeakMap(),
  ko = new WeakMap(),
  qo = new WeakMap(),
  Kl = new WeakMap();
function Wl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function zl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Wl(yl(e));
}
function Kn(e) {
  return ft(e) ? e : Yr(e, !1, jl, kl, Ho);
}
function Vo(e) {
  return Yr(e, !1, Bl, ql, ko);
}
function Ko(e) {
  return Yr(e, !0, Ul, Vl, qo);
}
function Yr(e, t, n, r, s) {
  if (!re(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = zl(e);
  if (o === 0) return e;
  const i = s.get(e);
  if (i) return i;
  const l = new Proxy(e, o === 2 ? r : n);
  return (s.set(e, l), l);
}
function Nt(e) {
  return ft(e) ? Nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
function Oe(e) {
  return !!(e && e.__v_isShallow);
}
function Zr(e) {
  return e ? !!e.__v_raw : !1;
}
function J(e) {
  const t = e && e.__v_raw;
  return t ? J(t) : e;
}
function Jl(e) {
  return (
    !G(e, "__v_skip") && Object.isExtensible(e) && Oo(e, "__v_skip", !0),
    e
  );
}
const le = (e) => (re(e) ? Kn(e) : e),
  Tn = (e) => (re(e) ? Ko(e) : e);
function fe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Gl(e) {
  return Wo(e, !1);
}
function Xl(e) {
  return Wo(e, !0);
}
function Wo(e, t) {
  return fe(e) ? e : new Ql(e, t);
}
class Ql {
  constructor(t, n) {
    ((this.dep = new Xr()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : J(t)),
      (this._value = n ? t : le(t)),
      (this.__v_isShallow = n));
  }
  get value() {
    return (this.dep.track(), this._value);
  }
  set value(t) {
    const n = this._rawValue,
      r = this.__v_isShallow || Oe(t) || ft(t);
    ((t = r ? t : J(t)),
      ut(t, n) &&
        ((this._rawValue = t),
        (this._value = r ? t : le(t)),
        this.dep.trigger()));
  }
}
function Ft(e) {
  return fe(e) ? e.value : e;
}
const Yl = {
  get: (e, t, n) => (t === "__v_raw" ? e : Ft(Reflect.get(e, t, n))),
  set: (e, t, n, r) => {
    const s = e[t];
    return fe(s) && !fe(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function zo(e) {
  return Nt(e) ? e : new Proxy(e, Yl);
}
class Zl {
  constructor(t, n, r) {
    ((this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new Xr(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = nn - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = r));
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && te !== this))
      return (Fo(this, !0), !0);
  }
  get value() {
    const t = this.dep.track();
    return (Io(this), t && (t.version = this.dep.version), this._value);
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function ec(e, t, n = !1) {
  let r, s;
  return (q(e) ? (r = e) : ((r = e.get), (s = e.set)), new Zl(r, s, n));
}
const En = {},
  Cn = new WeakMap();
let yt;
function tc(e, t = !1, n = yt) {
  if (n) {
    let r = Cn.get(n);
    (r || Cn.set(n, (r = [])), r.push(e));
  }
}
function nc(e, t, n = ne) {
  const {
      immediate: r,
      deep: s,
      once: o,
      scheduler: i,
      augmentJob: l,
      call: c,
    } = n,
    u = (M) => (s ? M : Oe(M) || s === !1 || s === 0 ? at(M, 1) : at(M));
  let a,
    f,
    p,
    g,
    b = !1,
    R = !1;
  if (
    (fe(e)
      ? ((f = () => e.value), (b = Oe(e)))
      : Nt(e)
        ? ((f = () => u(e)), (b = !0))
        : $(e)
          ? ((R = !0),
            (b = e.some((M) => Nt(M) || Oe(M))),
            (f = () =>
              e.map((M) => {
                if (fe(M)) return M.value;
                if (Nt(M)) return u(M);
                if (q(M)) return c ? c(M, 2) : M();
              })))
          : q(e)
            ? t
              ? (f = c ? () => c(e, 2) : e)
              : (f = () => {
                  if (p) {
                    et();
                    try {
                      p();
                    } finally {
                      tt();
                    }
                  }
                  const M = yt;
                  yt = a;
                  try {
                    return c ? c(e, 3, [g]) : e(g);
                  } finally {
                    yt = M;
                  }
                })
            : (f = Ve),
    t && s)
  ) {
    const M = f,
      H = s === !0 ? 1 / 0 : s;
    f = () => at(M(), H);
  }
  const v = Cl(),
    C = () => {
      (a.stop(), v && v.active && qr(v.effects, a));
    };
  if (o && t) {
    const M = t;
    t = (...H) => {
      (M(...H), C());
    };
  }
  let A = R ? new Array(e.length).fill(En) : En;
  const F = (M) => {
    if (!(!(a.flags & 1) || (!a.dirty && !M)))
      if (t) {
        const H = a.run();
        if (s || b || (R ? H.some((Z, K) => ut(Z, A[K])) : ut(H, A))) {
          p && p();
          const Z = yt;
          yt = a;
          try {
            const K = [H, A === En ? void 0 : R && A[0] === En ? [] : A, g];
            ((A = H), c ? c(t, 3, K) : t(...K));
          } finally {
            yt = Z;
          }
        }
      } else a.run();
  };
  return (
    l && l(F),
    (a = new Po(f)),
    (a.scheduler = i ? () => i(F, !1) : F),
    (g = (M) => tc(M, !1, a)),
    (p = a.onStop =
      () => {
        const M = Cn.get(a);
        if (M) {
          if (c) c(M, 4);
          else for (const H of M) H();
          Cn.delete(a);
        }
      }),
    t ? (r ? F(!0) : (A = a.run())) : i ? i(F.bind(null, !0), !0) : a.run(),
    (C.pause = a.pause.bind(a)),
    (C.resume = a.resume.bind(a)),
    (C.stop = C),
    C
  );
}
function at(e, t = 1 / 0, n) {
  if (
    t <= 0 ||
    !re(e) ||
    e.__v_skip ||
    ((n = n || new Map()), (n.get(e) || 0) >= t)
  )
    return e;
  if ((n.set(e, t), t--, fe(e))) at(e.value, t, n);
  else if ($(e)) for (let r = 0; r < e.length; r++) at(e[r], t, n);
  else if (So(e) || Pt(e))
    e.forEach((r) => {
      at(r, t, n);
    });
  else if (xo(e)) {
    for (const r in e) at(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && at(e[r], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function fn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    Wn(s, t, n);
  }
}
function We(e, t, n, r) {
  if (q(e)) {
    const s = fn(e, t, n, r);
    return (
      s &&
        Ro(s) &&
        s.catch((o) => {
          Wn(o, t, n);
        }),
      s
    );
  }
  if ($(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(We(e[o], t, n, r));
    return s;
  }
}
function Wn(e, t, n, r = !0) {
  const s = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      (t && t.appContext.config) || ne;
  if (t) {
    let l = t.parent;
    const c = t.proxy,
      u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let f = 0; f < a.length; f++) if (a[f](e, c, u) === !1) return;
      }
      l = l.parent;
    }
    if (o) {
      (et(), fn(o, null, 10, [e, c, u]), tt());
      return;
    }
  }
  rc(e, n, s, r, i);
}
function rc(e, t, n, r = !0, s = !1) {
  if (s) throw e;
  console.error(e);
}
const me = [];
let ke = -1;
const Lt = [];
let it = null,
  At = 0;
const Jo = Promise.resolve();
let Pn = null;
function Go(e) {
  const t = Pn || Jo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function sc(e) {
  let t = ke + 1,
    n = me.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = me[r],
      o = sn(s);
    o < e || (o === e && s.flags & 2) ? (t = r + 1) : (n = r);
  }
  return t;
}
function es(e) {
  if (!(e.flags & 1)) {
    const t = sn(e),
      n = me[me.length - 1];
    (!n || (!(e.flags & 2) && t >= sn(n)) ? me.push(e) : me.splice(sc(t), 0, e),
      (e.flags |= 1),
      Xo());
  }
}
function Xo() {
  Pn || (Pn = Jo.then(Yo));
}
function oc(e) {
  ($(e)
    ? Lt.push(...e)
    : it && e.id === -1
      ? it.splice(At + 1, 0, e)
      : e.flags & 1 || (Lt.push(e), (e.flags |= 1)),
    Xo());
}
function ys(e, t, n = ke + 1) {
  for (; n < me.length; n++) {
    const r = me[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      (me.splice(n, 1),
        n--,
        r.flags & 4 && (r.flags &= -2),
        r(),
        r.flags & 4 || (r.flags &= -2));
    }
  }
}
function Qo(e) {
  if (Lt.length) {
    const t = [...new Set(Lt)].sort((n, r) => sn(n) - sn(r));
    if (((Lt.length = 0), it)) {
      it.push(...t);
      return;
    }
    for (it = t, At = 0; At < it.length; At++) {
      const n = it[At];
      (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
    }
    ((it = null), (At = 0));
  }
}
const sn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Yo(e) {
  try {
    for (ke = 0; ke < me.length; ke++) {
      const t = me[ke];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        fn(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ke < me.length; ke++) {
      const t = me[ke];
      t && (t.flags &= -2);
    }
    ((ke = -1),
      (me.length = 0),
      Qo(),
      (Pn = null),
      (me.length || Lt.length) && Yo());
  }
}
let Pe = null,
  Zo = null;
function Nn(e) {
  const t = Pe;
  return ((Pe = e), (Zo = (e && e.type.__scopeId) || null), t);
}
function ic(e, t = Pe, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && Mn(-1);
    const o = Nn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      (Nn(o), r._d && Mn(1));
    }
    return i;
  };
  return ((r._n = !0), (r._c = !0), (r._d = !0), r);
}
function mt(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[r];
    c && (et(), We(c, n, 8, [e.el, l, e, t]), tt());
  }
}
const lc = Symbol("_vte"),
  cc = (e) => e.__isTeleport,
  ac = Symbol("_leaveCb");
function ts(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), ts(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function ei(e, t) {
  return q(e) ? de({ name: e.name }, t, { setup: e }) : e;
}
function ti(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Fn = new WeakMap();
function Xt(e, t, n, r, s = !1) {
  if ($(e)) {
    e.forEach((b, R) => Xt(b, t && ($(t) ? t[R] : t), n, r, s));
    return;
  }
  if (Qt(r) && !s) {
    r.shapeFlag & 512 &&
      r.type.__asyncResolved &&
      r.component.subTree.component &&
      Xt(e, t, n, r.component.subTree);
    return;
  }
  const o = r.shapeFlag & 4 ? os(r.component) : r.el,
    i = s ? null : o,
    { i: l, r: c } = e,
    u = t && t.r,
    a = l.refs === ne ? (l.refs = {}) : l.refs,
    f = l.setupState,
    p = J(f),
    g = f === ne ? wo : (b) => G(p, b);
  if (u != null && u !== c) {
    if ((bs(t), oe(u))) ((a[u] = null), g(u) && (f[u] = null));
    else if (fe(u)) {
      u.value = null;
      const b = t;
      b.k && (a[b.k] = null);
    }
  }
  if (q(c)) fn(c, l, 12, [i, a]);
  else {
    const b = oe(c),
      R = fe(c);
    if (b || R) {
      const v = () => {
        if (e.f) {
          const C = b ? (g(c) ? f[c] : a[c]) : c.value;
          if (s) $(C) && qr(C, o);
          else if ($(C)) C.includes(o) || C.push(o);
          else if (b) ((a[c] = [o]), g(c) && (f[c] = a[c]));
          else {
            const A = [o];
            ((c.value = A), e.k && (a[e.k] = A));
          }
        } else
          b
            ? ((a[c] = i), g(c) && (f[c] = i))
            : R && ((c.value = i), e.k && (a[e.k] = i));
      };
      if (i) {
        const C = () => {
          (v(), Fn.delete(e));
        };
        ((C.id = -1), Fn.set(e, C), Re(C, n));
      } else (bs(e), v());
    }
  }
}
function bs(e) {
  const t = Fn.get(e);
  t && ((t.flags |= 8), Fn.delete(e));
}
qn().requestIdleCallback;
qn().cancelIdleCallback;
const Qt = (e) => !!e.type.__asyncLoader,
  ni = (e) => e.type.__isKeepAlive;
function uc(e, t) {
  ri(e, "a", t);
}
function fc(e, t) {
  ri(e, "da", t);
}
function ri(e, t, n = ae) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((zn(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      (ni(s.parent.vnode) && dc(r, t, n, s), (s = s.parent));
  }
}
function dc(e, t, n, r) {
  const s = zn(t, e, r, !0);
  si(() => {
    qr(r[t], s);
  }, n);
}
function zn(e, t, n = ae, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          et();
          const l = dn(n),
            c = We(t, n, e, i);
          return (l(), tt(), c);
        });
    return (r ? s.unshift(o) : s.push(o), o);
  }
}
const nt =
    (e) =>
    (t, n = ae) => {
      (!ln || e === "sp") && zn(e, (...r) => t(...r), n);
    },
  hc = nt("bm"),
  pc = nt("m"),
  mc = nt("bu"),
  gc = nt("u"),
  yc = nt("bum"),
  si = nt("um"),
  bc = nt("sp"),
  _c = nt("rtg"),
  Ec = nt("rtc");
function wc(e, t = ae) {
  zn("ec", e, t);
}
const Sc = "components";
function Rc(e, t) {
  return xc(Sc, e, !0, t) || e;
}
const vc = Symbol.for("v-ndc");
function xc(e, t, n = !0, r = !1) {
  const s = Pe || ae;
  if (s) {
    const o = s.type;
    {
      const l = pa(o, !1);
      if (l && (l === t || l === Ae(t) || l === kn(Ae(t)))) return o;
    }
    const i = _s(s[e] || o[e], t) || _s(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function _s(e, t) {
  return e && (e[t] || e[Ae(t)] || e[kn(Ae(t))]);
}
function Id(e, t, n, r) {
  let s;
  const o = n,
    i = $(e);
  if (i || oe(e)) {
    const l = i && Nt(e);
    let c = !1,
      u = !1;
    (l && ((c = !Oe(e)), (u = ft(e)), (e = Vn(e))), (s = new Array(e.length)));
    for (let a = 0, f = e.length; a < f; a++)
      s[a] = t(c ? (u ? Tn(le(e[a])) : le(e[a])) : e[a], a, void 0, o);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let l = 0; l < e; l++) s[l] = t(l + 1, l, void 0, o);
  } else if (re(e))
    if (e[Symbol.iterator]) s = Array.from(e, (l, c) => t(l, c, void 0, o));
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let c = 0, u = l.length; c < u; c++) {
        const a = l[c];
        s[c] = t(e[a], a, c, o);
      }
    }
  else s = [];
  return s;
}
const Or = (e) => (e ? (Ai(e) ? os(e) : Or(e.parent)) : null),
  Yt = de(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Or(e.parent),
    $root: (e) => Or(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ii(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        es(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Go.bind(e.proxy)),
    $watch: (e) => Wc.bind(e),
  }),
  ar = (e, t) => e !== ne && !e.__isScriptSetup && G(e, t),
  Oc = {
    get({ _: e }, t) {
      if (t === "__v_skip") return !0;
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let u;
      if (t[0] !== "$") {
        const g = i[t];
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (ar(r, t)) return ((i[t] = 1), r[t]);
          if (s !== ne && G(s, t)) return ((i[t] = 2), s[t]);
          if ((u = e.propsOptions[0]) && G(u, t)) return ((i[t] = 3), o[t]);
          if (n !== ne && G(n, t)) return ((i[t] = 4), n[t]);
          Ar && (i[t] = 0);
        }
      }
      const a = Yt[t];
      let f, p;
      if (a) return (t === "$attrs" && ce(e.attrs, "get", ""), a(e));
      if ((f = l.__cssModules) && (f = f[t])) return f;
      if (n !== ne && G(n, t)) return ((i[t] = 4), n[t]);
      if (((p = c.config.globalProperties), G(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return ar(s, t)
        ? ((s[t] = n), !0)
        : r !== ne && G(r, t)
          ? ((r[t] = n), !0)
          : G(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
          type: i,
        },
      },
      l,
    ) {
      let c, u;
      return !!(
        n[l] ||
        (e !== ne && l[0] !== "$" && G(e, l)) ||
        ar(t, l) ||
        ((c = o[0]) && G(c, l)) ||
        G(r, l) ||
        G(Yt, l) ||
        G(s.config.globalProperties, l) ||
        ((u = i.__cssModules) && u[l])
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : G(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Es(e) {
  return $(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Ar = !0;
function Ac(e) {
  const t = ii(e),
    n = e.proxy,
    r = e.ctx;
  ((Ar = !1), t.beforeCreate && ws(t.beforeCreate, e, "bc"));
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: u,
    created: a,
    beforeMount: f,
    mounted: p,
    beforeUpdate: g,
    updated: b,
    activated: R,
    deactivated: v,
    beforeDestroy: C,
    beforeUnmount: A,
    destroyed: F,
    unmounted: M,
    render: H,
    renderTracked: Z,
    renderTriggered: K,
    errorCaptured: he,
    serverPrefetch: Te,
    expose: Me,
    inheritAttrs: rt,
    components: pt,
    directives: Ie,
    filters: $t,
  } = t;
  if ((u && Tc(u, r, null), i))
    for (const Q in i) {
      const W = i[Q];
      q(W) && (r[Q] = W.bind(n));
    }
  if (s) {
    const Q = s.call(n, n);
    re(Q) && (e.data = Kn(Q));
  }
  if (((Ar = !0), o))
    for (const Q in o) {
      const W = o[Q],
        ze = q(W) ? W.bind(n, n) : q(W.get) ? W.get.bind(n, n) : Ve,
        st = !q(W) && q(W.set) ? W.set.bind(n) : Ve,
        De = Ce({ get: ze, set: st });
      Object.defineProperty(r, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => De.value,
        set: (ge) => (De.value = ge),
      });
    }
  if (l) for (const Q in l) oi(l[Q], r, n, Q);
  if (c) {
    const Q = q(c) ? c.call(n) : c;
    Reflect.ownKeys(Q).forEach((W) => {
      wn(W, Q[W]);
    });
  }
  a && ws(a, e, "c");
  function ie(Q, W) {
    $(W) ? W.forEach((ze) => Q(ze.bind(n))) : W && Q(W.bind(n));
  }
  if (
    (ie(hc, f),
    ie(pc, p),
    ie(mc, g),
    ie(gc, b),
    ie(uc, R),
    ie(fc, v),
    ie(wc, he),
    ie(Ec, Z),
    ie(_c, K),
    ie(yc, A),
    ie(si, M),
    ie(bc, Te),
    $(Me))
  )
    if (Me.length) {
      const Q = e.exposed || (e.exposed = {});
      Me.forEach((W) => {
        Object.defineProperty(Q, W, {
          get: () => n[W],
          set: (ze) => (n[W] = ze),
          enumerable: !0,
        });
      });
    } else e.exposed || (e.exposed = {});
  (H && e.render === Ve && (e.render = H),
    rt != null && (e.inheritAttrs = rt),
    pt && (e.components = pt),
    Ie && (e.directives = Ie),
    Te && ti(e));
}
function Tc(e, t, n = Ve) {
  $(e) && (e = Tr(e));
  for (const r in e) {
    const s = e[r];
    let o;
    (re(s)
      ? "default" in s
        ? (o = Ze(s.from || r, s.default, !0))
        : (o = Ze(s.from || r))
      : (o = Ze(s)),
      fe(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[r] = o));
  }
}
function ws(e, t, n) {
  We($(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function oi(e, t, n, r) {
  let s = r.includes(".") ? _i(n, r) : () => n[r];
  if (oe(e)) {
    const o = t[e];
    q(o) && Sn(s, o);
  } else if (q(e)) Sn(s, e.bind(n));
  else if (re(e))
    if ($(e)) e.forEach((o) => oi(o, t, n, r));
    else {
      const o = q(e.handler) ? e.handler.bind(n) : t[e.handler];
      q(o) && Sn(s, o, e);
    }
}
function ii(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
        ? (c = t)
        : ((c = {}),
          s.length && s.forEach((u) => Ln(c, u, i, !0)),
          Ln(c, t, i)),
    re(t) && o.set(t, c),
    c
  );
}
function Ln(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  (o && Ln(e, o, n, !0), s && s.forEach((i) => Ln(e, i, n, !0)));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Cc[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Cc = {
  data: Ss,
  props: Rs,
  emits: Rs,
  methods: Wt,
  computed: Wt,
  beforeCreate: pe,
  created: pe,
  beforeMount: pe,
  mounted: pe,
  beforeUpdate: pe,
  updated: pe,
  beforeDestroy: pe,
  beforeUnmount: pe,
  destroyed: pe,
  unmounted: pe,
  activated: pe,
  deactivated: pe,
  errorCaptured: pe,
  serverPrefetch: pe,
  components: Wt,
  directives: Wt,
  watch: Nc,
  provide: Ss,
  inject: Pc,
};
function Ss(e, t) {
  return t
    ? e
      ? function () {
          return de(
            q(e) ? e.call(this, this) : e,
            q(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function Pc(e, t) {
  return Wt(Tr(e), Tr(t));
}
function Tr(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Wt(e, t) {
  return e ? de(Object.create(null), e, t) : t;
}
function Rs(e, t) {
  return e
    ? $(e) && $(t)
      ? [...new Set([...e, ...t])]
      : de(Object.create(null), Es(e), Es(t ?? {}))
    : t;
}
function Nc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = de(Object.create(null), e);
  for (const r in t) n[r] = pe(e[r], t[r]);
  return n;
}
function li() {
  return {
    app: null,
    config: {
      isNativeTag: wo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Fc = 0;
function Lc(e, t) {
  return function (r, s = null) {
    (q(r) || (r = de({}, r)), s != null && !re(s) && (s = null));
    const o = li(),
      i = new WeakSet(),
      l = [];
    let c = !1;
    const u = (o.app = {
      _uid: Fc++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: ga,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...f) {
        return (
          i.has(a) ||
            (a && q(a.install)
              ? (i.add(a), a.install(u, ...f))
              : q(a) && (i.add(a), a(u, ...f))),
          u
        );
      },
      mixin(a) {
        return (o.mixins.includes(a) || o.mixins.push(a), u);
      },
      component(a, f) {
        return f ? ((o.components[a] = f), u) : o.components[a];
      },
      directive(a, f) {
        return f ? ((o.directives[a] = f), u) : o.directives[a];
      },
      mount(a, f, p) {
        if (!c) {
          const g = u._ceVNode || Ke(r, s);
          return (
            (g.appContext = o),
            p === !0 ? (p = "svg") : p === !1 && (p = void 0),
            e(g, a, p),
            (c = !0),
            (u._container = a),
            (a.__vue_app__ = u),
            os(g.component)
          );
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c &&
          (We(l, u._instance, 16),
          e(null, u._container),
          delete u._container.__vue_app__);
      },
      provide(a, f) {
        return ((o.provides[a] = f), u);
      },
      runWithContext(a) {
        const f = Mt;
        Mt = u;
        try {
          return a();
        } finally {
          Mt = f;
        }
      },
    });
    return u;
  };
}
let Mt = null;
function wn(e, t) {
  if (ae) {
    let n = ae.provides;
    const r = ae.parent && ae.parent.provides;
    (r === n && (n = ae.provides = Object.create(r)), (n[e] = t));
  }
}
function Ze(e, t, n = !1) {
  const r = aa();
  if (r || Mt) {
    let s = Mt
      ? Mt._context.provides
      : r
        ? r.parent == null || r.ce
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides
        : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && q(t) ? t.call(r && r.proxy) : t;
  }
}
const ci = {},
  ai = () => Object.create(ci),
  ui = (e) => Object.getPrototypeOf(e) === ci;
function Mc(e, t, n, r = !1) {
  const s = {},
    o = ai();
  ((e.propsDefaults = Object.create(null)), fi(e, t, s, o));
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  (n ? (e.props = r ? s : Vo(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o));
}
function Ic(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = J(s),
    [c] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        let p = a[f];
        if (Jn(e.emitsOptions, p)) continue;
        const g = t[p];
        if (c)
          if (G(o, p)) g !== o[p] && ((o[p] = g), (u = !0));
          else {
            const b = Ae(p);
            s[b] = Cr(c, l, b, g, e, !1);
          }
        else g !== o[p] && ((o[p] = g), (u = !0));
      }
    }
  } else {
    fi(e, t, s, o) && (u = !0);
    let a;
    for (const f in l)
      (!t || (!G(t, f) && ((a = St(f)) === f || !G(t, a)))) &&
        (c
          ? n &&
            (n[f] !== void 0 || n[a] !== void 0) &&
            (s[f] = Cr(c, l, f, void 0, e, !0))
          : delete s[f]);
    if (o !== l) for (const f in o) (!t || !G(t, f)) && (delete o[f], (u = !0));
  }
  u && Ye(e.attrs, "set", "");
}
function fi(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (zt(c)) continue;
      const u = t[c];
      let a;
      s && G(s, (a = Ae(c)))
        ? !o || !o.includes(a)
          ? (n[a] = u)
          : ((l || (l = {}))[a] = u)
        : Jn(e.emitsOptions, c) ||
          ((!(c in r) || u !== r[c]) && ((r[c] = u), (i = !0)));
    }
  if (o) {
    const c = J(n),
      u = l || ne;
    for (let a = 0; a < o.length; a++) {
      const f = o[a];
      n[f] = Cr(s, c, f, u[f], e, !G(u, f));
    }
  }
  return i;
}
function Cr(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const l = G(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && q(c)) {
        const { propsDefaults: u } = s;
        if (n in u) r = u[n];
        else {
          const a = dn(s);
          ((r = u[n] = c.call(null, t)), a());
        }
      } else r = c;
      s.ce && s.ce._setProp(n, r);
    }
    i[0] &&
      (o && !l ? (r = !1) : i[1] && (r === "" || r === St(n)) && (r = !0));
  }
  return r;
}
const Dc = new WeakMap();
function di(e, t, n = !1) {
  const r = n ? Dc : t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!q(e)) {
    const a = (f) => {
      c = !0;
      const [p, g] = di(f, t, !0);
      (de(i, p), g && l.push(...g));
    };
    (!n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a));
  }
  if (!o && !c) return (re(e) && r.set(e, Ct), Ct);
  if ($(o))
    for (let a = 0; a < o.length; a++) {
      const f = Ae(o[a]);
      vs(f) && (i[f] = ne);
    }
  else if (o)
    for (const a in o) {
      const f = Ae(a);
      if (vs(f)) {
        const p = o[a],
          g = (i[f] = $(p) || q(p) ? { type: p } : de({}, p)),
          b = g.type;
        let R = !1,
          v = !0;
        if ($(b))
          for (let C = 0; C < b.length; ++C) {
            const A = b[C],
              F = q(A) && A.name;
            if (F === "Boolean") {
              R = !0;
              break;
            } else F === "String" && (v = !1);
          }
        else R = q(b) && b.name === "Boolean";
        ((g[0] = R), (g[1] = v), (R || G(g, "default")) && l.push(f));
      }
    }
  const u = [i, l];
  return (re(e) && r.set(e, u), u);
}
function vs(e) {
  return e[0] !== "$" && !zt(e);
}
const ns = (e) => e === "_" || e === "_ctx" || e === "$stable",
  rs = (e) => ($(e) ? e.map(qe) : [qe(e)]),
  jc = (e, t, n) => {
    if (t._n) return t;
    const r = ic((...s) => rs(t(...s)), n);
    return ((r._c = !1), r);
  },
  hi = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (ns(s)) continue;
      const o = e[s];
      if (q(o)) t[s] = jc(s, o, r);
      else if (o != null) {
        const i = rs(o);
        t[s] = () => i;
      }
    }
  },
  pi = (e, t) => {
    const n = rs(t);
    e.slots.default = () => n;
  },
  mi = (e, t, n) => {
    for (const r in t) (n || !ns(r)) && (e[r] = t[r]);
  },
  Uc = (e, t, n) => {
    const r = (e.slots = ai());
    if (e.vnode.shapeFlag & 32) {
      const s = t._;
      s ? (mi(r, t, n), n && Oo(r, "_", s, !0)) : hi(t, r);
    } else t && pi(e, t);
  },
  Bc = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = ne;
    if (r.shapeFlag & 32) {
      const l = t._;
      (l
        ? n && l === 1
          ? (o = !1)
          : mi(s, t, n)
        : ((o = !t.$stable), hi(t, s)),
        (i = t));
    } else t && (pi(e, t), (i = { default: 1 }));
    if (o) for (const l in s) !ns(l) && i[l] == null && delete s[l];
  },
  Re = ea;
function $c(e) {
  return Hc(e);
}
function Hc(e, t) {
  const n = qn();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: a,
      parentNode: f,
      nextSibling: p,
      setScopeId: g = Ve,
      insertStaticContent: b,
    } = e,
    R = (
      d,
      h,
      m,
      E = null,
      S = null,
      _ = null,
      P = void 0,
      T = null,
      O = !!h.dynamicChildren,
    ) => {
      if (d === h) return;
      (d && !qt(d, h) && ((E = w(d)), ge(d, S, _, !0), (d = null)),
        h.patchFlag === -2 && ((O = !1), (h.dynamicChildren = null)));
      const { type: x, ref: U, shapeFlag: L } = h;
      switch (x) {
        case Gn:
          v(d, h, m, E);
          break;
        case dt:
          C(d, h, m, E);
          break;
        case fr:
          d == null && A(h, m, E, P);
          break;
        case Qe:
          pt(d, h, m, E, S, _, P, T, O);
          break;
        default:
          L & 1
            ? H(d, h, m, E, S, _, P, T, O)
            : L & 6
              ? Ie(d, h, m, E, S, _, P, T, O)
              : (L & 64 || L & 128) && x.process(d, h, m, E, S, _, P, T, O, D);
      }
      U != null && S
        ? Xt(U, d && d.ref, _, h || d, !h)
        : U == null && d && d.ref != null && Xt(d.ref, null, _, d, !0);
    },
    v = (d, h, m, E) => {
      if (d == null) r((h.el = l(h.children)), m, E);
      else {
        const S = (h.el = d.el);
        h.children !== d.children && u(S, h.children);
      }
    },
    C = (d, h, m, E) => {
      d == null ? r((h.el = c(h.children || "")), m, E) : (h.el = d.el);
    },
    A = (d, h, m, E) => {
      [d.el, d.anchor] = b(d.children, h, m, E, d.el, d.anchor);
    },
    F = ({ el: d, anchor: h }, m, E) => {
      let S;
      for (; d && d !== h; ) ((S = p(d)), r(d, m, E), (d = S));
      r(h, m, E);
    },
    M = ({ el: d, anchor: h }) => {
      let m;
      for (; d && d !== h; ) ((m = p(d)), s(d), (d = m));
      s(h);
    },
    H = (d, h, m, E, S, _, P, T, O) => {
      (h.type === "svg" ? (P = "svg") : h.type === "math" && (P = "mathml"),
        d == null ? Z(h, m, E, S, _, P, T, O) : Te(d, h, S, _, P, T, O));
    },
    Z = (d, h, m, E, S, _, P, T) => {
      let O, x;
      const { props: U, shapeFlag: L, transition: j, dirs: B } = d;
      if (
        ((O = d.el = i(d.type, _, U && U.is, U)),
        L & 8
          ? a(O, d.children)
          : L & 16 && he(d.children, O, null, E, S, ur(d, _), P, T),
        B && mt(d, null, E, "created"),
        K(O, d, d.scopeId, P, E),
        U)
      ) {
        for (const ee in U)
          ee !== "value" && !zt(ee) && o(O, ee, null, U[ee], _, E);
        ("value" in U && o(O, "value", null, U.value, _),
          (x = U.onVnodeBeforeMount) && $e(x, E, d));
      }
      B && mt(d, null, E, "beforeMount");
      const V = kc(S, j);
      (V && j.beforeEnter(O),
        r(O, h, m),
        ((x = U && U.onVnodeMounted) || V || B) &&
          Re(() => {
            (x && $e(x, E, d), V && j.enter(O), B && mt(d, null, E, "mounted"));
          }, S));
    },
    K = (d, h, m, E, S) => {
      if ((m && g(d, m), E)) for (let _ = 0; _ < E.length; _++) g(d, E[_]);
      if (S) {
        let _ = S.subTree;
        if (
          h === _ ||
          (wi(_.type) && (_.ssContent === h || _.ssFallback === h))
        ) {
          const P = S.vnode;
          K(d, P, P.scopeId, P.slotScopeIds, S.parent);
        }
      }
    },
    he = (d, h, m, E, S, _, P, T, O = 0) => {
      for (let x = O; x < d.length; x++) {
        const U = (d[x] = T ? lt(d[x]) : qe(d[x]));
        R(null, U, h, m, E, S, _, P, T);
      }
    },
    Te = (d, h, m, E, S, _, P) => {
      const T = (h.el = d.el);
      let { patchFlag: O, dynamicChildren: x, dirs: U } = h;
      O |= d.patchFlag & 16;
      const L = d.props || ne,
        j = h.props || ne;
      let B;
      if (
        (m && gt(m, !1),
        (B = j.onVnodeBeforeUpdate) && $e(B, m, h, d),
        U && mt(h, d, m, "beforeUpdate"),
        m && gt(m, !0),
        ((L.innerHTML && j.innerHTML == null) ||
          (L.textContent && j.textContent == null)) &&
          a(T, ""),
        x
          ? Me(d.dynamicChildren, x, T, m, E, ur(h, S), _)
          : P || W(d, h, T, null, m, E, ur(h, S), _, !1),
        O > 0)
      ) {
        if (O & 16) rt(T, L, j, m, S);
        else if (
          (O & 2 && L.class !== j.class && o(T, "class", null, j.class, S),
          O & 4 && o(T, "style", L.style, j.style, S),
          O & 8)
        ) {
          const V = h.dynamicProps;
          for (let ee = 0; ee < V.length; ee++) {
            const X = V[ee],
              ye = L[X],
              be = j[X];
            (be !== ye || X === "value") && o(T, X, ye, be, S, m);
          }
        }
        O & 1 && d.children !== h.children && a(T, h.children);
      } else !P && x == null && rt(T, L, j, m, S);
      ((B = j.onVnodeUpdated) || U) &&
        Re(() => {
          (B && $e(B, m, h, d), U && mt(h, d, m, "updated"));
        }, E);
    },
    Me = (d, h, m, E, S, _, P) => {
      for (let T = 0; T < h.length; T++) {
        const O = d[T],
          x = h[T],
          U =
            O.el && (O.type === Qe || !qt(O, x) || O.shapeFlag & 198)
              ? f(O.el)
              : m;
        R(O, x, U, null, E, S, _, P, !0);
      }
    },
    rt = (d, h, m, E, S) => {
      if (h !== m) {
        if (h !== ne)
          for (const _ in h) !zt(_) && !(_ in m) && o(d, _, h[_], null, S, E);
        for (const _ in m) {
          if (zt(_)) continue;
          const P = m[_],
            T = h[_];
          P !== T && _ !== "value" && o(d, _, T, P, S, E);
        }
        "value" in m && o(d, "value", h.value, m.value, S);
      }
    },
    pt = (d, h, m, E, S, _, P, T, O) => {
      const x = (h.el = d ? d.el : l("")),
        U = (h.anchor = d ? d.anchor : l(""));
      let { patchFlag: L, dynamicChildren: j, slotScopeIds: B } = h;
      (B && (T = T ? T.concat(B) : B),
        d == null
          ? (r(x, m, E), r(U, m, E), he(h.children || [], m, U, S, _, P, T, O))
          : L > 0 && L & 64 && j && d.dynamicChildren
            ? (Me(d.dynamicChildren, j, m, S, _, P, T),
              (h.key != null || (S && h === S.subTree)) && gi(d, h, !0))
            : W(d, h, m, U, S, _, P, T, O));
    },
    Ie = (d, h, m, E, S, _, P, T, O) => {
      ((h.slotScopeIds = T),
        d == null
          ? h.shapeFlag & 512
            ? S.ctx.activate(h, m, E, P, O)
            : $t(h, m, E, S, _, P, O)
          : Rt(d, h, O));
    },
    $t = (d, h, m, E, S, _, P) => {
      const T = (d.component = ca(d, E, S));
      if ((ni(d) && (T.ctx.renderer = D), ua(T, !1, P), T.asyncDep)) {
        if ((S && S.registerDep(T, ie, P), !d.el)) {
          const O = (T.subTree = Ke(dt));
          (C(null, O, h, m), (d.placeholder = O.el));
        }
      } else ie(T, d, h, m, S, _, P);
    },
    Rt = (d, h, m) => {
      const E = (h.component = d.component);
      if (Yc(d, h, m))
        if (E.asyncDep && !E.asyncResolved) {
          Q(E, h, m);
          return;
        } else ((E.next = h), E.update());
      else ((h.el = d.el), (E.vnode = h));
    },
    ie = (d, h, m, E, S, _, P) => {
      const T = () => {
        if (d.isMounted) {
          let { next: L, bu: j, u: B, parent: V, vnode: ee } = d;
          {
            const Ue = yi(d);
            if (Ue) {
              (L && ((L.el = ee.el), Q(d, L, P)),
                Ue.asyncDep.then(() => {
                  d.isUnmounted || T();
                }));
              return;
            }
          }
          let X = L,
            ye;
          (gt(d, !1),
            L ? ((L.el = ee.el), Q(d, L, P)) : (L = ee),
            j && sr(j),
            (ye = L.props && L.props.onVnodeBeforeUpdate) && $e(ye, V, L, ee),
            gt(d, !0));
          const be = Os(d),
            je = d.subTree;
          ((d.subTree = be),
            R(je, be, f(je.el), w(je), d, S, _),
            (L.el = be.el),
            X === null && Zc(d, be.el),
            B && Re(B, S),
            (ye = L.props && L.props.onVnodeUpdated) &&
              Re(() => $e(ye, V, L, ee), S));
        } else {
          let L;
          const { el: j, props: B } = h,
            { bm: V, m: ee, parent: X, root: ye, type: be } = d,
            je = Qt(h);
          (gt(d, !1),
            V && sr(V),
            !je && (L = B && B.onVnodeBeforeMount) && $e(L, X, h),
            gt(d, !0));
          {
            ye.ce &&
              ye.ce._def.shadowRoot !== !1 &&
              ye.ce._injectChildStyle(be);
            const Ue = (d.subTree = Os(d));
            (R(null, Ue, m, E, d, S, _), (h.el = Ue.el));
          }
          if ((ee && Re(ee, S), !je && (L = B && B.onVnodeMounted))) {
            const Ue = h;
            Re(() => $e(L, X, Ue), S);
          }
          ((h.shapeFlag & 256 ||
            (X && Qt(X.vnode) && X.vnode.shapeFlag & 256)) &&
            d.a &&
            Re(d.a, S),
            (d.isMounted = !0),
            (h = m = E = null));
        }
      };
      d.scope.on();
      const O = (d.effect = new Po(T));
      d.scope.off();
      const x = (d.update = O.run.bind(O)),
        U = (d.job = O.runIfDirty.bind(O));
      ((U.i = d), (U.id = d.uid), (O.scheduler = () => es(U)), gt(d, !0), x());
    },
    Q = (d, h, m) => {
      h.component = d;
      const E = d.vnode.props;
      ((d.vnode = h),
        (d.next = null),
        Ic(d, h.props, E, m),
        Bc(d, h.children, m),
        et(),
        ys(d),
        tt());
    },
    W = (d, h, m, E, S, _, P, T, O = !1) => {
      const x = d && d.children,
        U = d ? d.shapeFlag : 0,
        L = h.children,
        { patchFlag: j, shapeFlag: B } = h;
      if (j > 0) {
        if (j & 128) {
          st(x, L, m, E, S, _, P, T, O);
          return;
        } else if (j & 256) {
          ze(x, L, m, E, S, _, P, T, O);
          return;
        }
      }
      B & 8
        ? (U & 16 && xe(x, S, _), L !== x && a(m, L))
        : U & 16
          ? B & 16
            ? st(x, L, m, E, S, _, P, T, O)
            : xe(x, S, _, !0)
          : (U & 8 && a(m, ""), B & 16 && he(L, m, E, S, _, P, T, O));
    },
    ze = (d, h, m, E, S, _, P, T, O) => {
      ((d = d || Ct), (h = h || Ct));
      const x = d.length,
        U = h.length,
        L = Math.min(x, U);
      let j;
      for (j = 0; j < L; j++) {
        const B = (h[j] = O ? lt(h[j]) : qe(h[j]));
        R(d[j], B, m, null, S, _, P, T, O);
      }
      x > U ? xe(d, S, _, !0, !1, L) : he(h, m, E, S, _, P, T, O, L);
    },
    st = (d, h, m, E, S, _, P, T, O) => {
      let x = 0;
      const U = h.length;
      let L = d.length - 1,
        j = U - 1;
      for (; x <= L && x <= j; ) {
        const B = d[x],
          V = (h[x] = O ? lt(h[x]) : qe(h[x]));
        if (qt(B, V)) R(B, V, m, null, S, _, P, T, O);
        else break;
        x++;
      }
      for (; x <= L && x <= j; ) {
        const B = d[L],
          V = (h[j] = O ? lt(h[j]) : qe(h[j]));
        if (qt(B, V)) R(B, V, m, null, S, _, P, T, O);
        else break;
        (L--, j--);
      }
      if (x > L) {
        if (x <= j) {
          const B = j + 1,
            V = B < U ? h[B].el : E;
          for (; x <= j; )
            (R(null, (h[x] = O ? lt(h[x]) : qe(h[x])), m, V, S, _, P, T, O),
              x++);
        }
      } else if (x > j) for (; x <= L; ) (ge(d[x], S, _, !0), x++);
      else {
        const B = x,
          V = x,
          ee = new Map();
        for (x = V; x <= j; x++) {
          const Se = (h[x] = O ? lt(h[x]) : qe(h[x]));
          Se.key != null && ee.set(Se.key, x);
        }
        let X,
          ye = 0;
        const be = j - V + 1;
        let je = !1,
          Ue = 0;
        const Ht = new Array(be);
        for (x = 0; x < be; x++) Ht[x] = 0;
        for (x = B; x <= L; x++) {
          const Se = d[x];
          if (ye >= be) {
            ge(Se, S, _, !0);
            continue;
          }
          let Be;
          if (Se.key != null) Be = ee.get(Se.key);
          else
            for (X = V; X <= j; X++)
              if (Ht[X - V] === 0 && qt(Se, h[X])) {
                Be = X;
                break;
              }
          Be === void 0
            ? ge(Se, S, _, !0)
            : ((Ht[Be - V] = x + 1),
              Be >= Ue ? (Ue = Be) : (je = !0),
              R(Se, h[Be], m, null, S, _, P, T, O),
              ye++);
        }
        const fs = je ? qc(Ht) : Ct;
        for (X = fs.length - 1, x = be - 1; x >= 0; x--) {
          const Se = V + x,
            Be = h[Se],
            ds = h[Se + 1],
            hs = Se + 1 < U ? ds.el || ds.placeholder : E;
          Ht[x] === 0
            ? R(null, Be, m, hs, S, _, P, T, O)
            : je && (X < 0 || x !== fs[X] ? De(Be, m, hs, 2) : X--);
        }
      }
    },
    De = (d, h, m, E, S = null) => {
      const { el: _, type: P, transition: T, children: O, shapeFlag: x } = d;
      if (x & 6) {
        De(d.component.subTree, h, m, E);
        return;
      }
      if (x & 128) {
        d.suspense.move(h, m, E);
        return;
      }
      if (x & 64) {
        P.move(d, h, m, D);
        return;
      }
      if (P === Qe) {
        r(_, h, m);
        for (let L = 0; L < O.length; L++) De(O[L], h, m, E);
        r(d.anchor, h, m);
        return;
      }
      if (P === fr) {
        F(d, h, m);
        return;
      }
      if (E !== 2 && x & 1 && T)
        if (E === 0) (T.beforeEnter(_), r(_, h, m), Re(() => T.enter(_), S));
        else {
          const { leave: L, delayLeave: j, afterLeave: B } = T,
            V = () => {
              d.ctx.isUnmounted ? s(_) : r(_, h, m);
            },
            ee = () => {
              (_._isLeaving && _[ac](!0),
                L(_, () => {
                  (V(), B && B());
                }));
            };
          j ? j(_, V, ee) : ee();
        }
      else r(_, h, m);
    },
    ge = (d, h, m, E = !1, S = !1) => {
      const {
        type: _,
        props: P,
        ref: T,
        children: O,
        dynamicChildren: x,
        shapeFlag: U,
        patchFlag: L,
        dirs: j,
        cacheIndex: B,
      } = d;
      if (
        (L === -2 && (S = !1),
        T != null && (et(), Xt(T, null, m, d, !0), tt()),
        B != null && (h.renderCache[B] = void 0),
        U & 256)
      ) {
        h.ctx.deactivate(d);
        return;
      }
      const V = U & 1 && j,
        ee = !Qt(d);
      let X;
      if ((ee && (X = P && P.onVnodeBeforeUnmount) && $e(X, h, d), U & 6))
        yn(d.component, m, E);
      else {
        if (U & 128) {
          d.suspense.unmount(m, E);
          return;
        }
        (V && mt(d, null, h, "beforeUnmount"),
          U & 64
            ? d.type.remove(d, h, m, D, E)
            : x && !x.hasOnce && (_ !== Qe || (L > 0 && L & 64))
              ? xe(x, h, m, !1, !0)
              : ((_ === Qe && L & 384) || (!S && U & 16)) && xe(O, h, m),
          E && vt(d));
      }
      ((ee && (X = P && P.onVnodeUnmounted)) || V) &&
        Re(() => {
          (X && $e(X, h, d), V && mt(d, null, h, "unmounted"));
        }, m);
    },
    vt = (d) => {
      const { type: h, el: m, anchor: E, transition: S } = d;
      if (h === Qe) {
        xt(m, E);
        return;
      }
      if (h === fr) {
        M(d);
        return;
      }
      const _ = () => {
        (s(m), S && !S.persisted && S.afterLeave && S.afterLeave());
      };
      if (d.shapeFlag & 1 && S && !S.persisted) {
        const { leave: P, delayLeave: T } = S,
          O = () => P(m, _);
        T ? T(d.el, _, O) : O();
      } else _();
    },
    xt = (d, h) => {
      let m;
      for (; d !== h; ) ((m = p(d)), s(d), (d = m));
      s(h);
    },
    yn = (d, h, m) => {
      const { bum: E, scope: S, job: _, subTree: P, um: T, m: O, a: x } = d;
      (xs(O),
        xs(x),
        E && sr(E),
        S.stop(),
        _ && ((_.flags |= 8), ge(P, d, h, m)),
        T && Re(T, h),
        Re(() => {
          d.isUnmounted = !0;
        }, h));
    },
    xe = (d, h, m, E = !1, S = !1, _ = 0) => {
      for (let P = _; P < d.length; P++) ge(d[P], h, m, E, S);
    },
    w = (d) => {
      if (d.shapeFlag & 6) return w(d.component.subTree);
      if (d.shapeFlag & 128) return d.suspense.next();
      const h = p(d.anchor || d.el),
        m = h && h[lc];
      return m ? p(m) : h;
    };
  let I = !1;
  const N = (d, h, m) => {
      (d == null
        ? h._vnode && ge(h._vnode, null, null, !0)
        : R(h._vnode || null, d, h, null, null, null, m),
        (h._vnode = d),
        I || ((I = !0), ys(), Qo(), (I = !1)));
    },
    D = {
      p: R,
      um: ge,
      m: De,
      r: vt,
      mt: $t,
      mc: he,
      pc: W,
      pbc: Me,
      n: w,
      o: e,
    };
  return { render: N, hydrate: void 0, createApp: Lc(N) };
}
function ur({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function gt({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function kc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function gi(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if ($(r) && $(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let l = s[o];
      (l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = lt(s[o])), (l.el = i.el)),
        !n && l.patchFlag !== -2 && gi(i, l)),
        l.type === Gn && l.patchFlag !== -1 && (l.el = i.el),
        l.type === dt && !l.el && (l.el = i.el));
    }
}
function qc(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        ((t[r] = s), n.push(r));
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        ((l = (o + i) >> 1), e[n[l]] < u ? (o = l + 1) : (i = l));
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) ((n[o] = i), (i = t[i]));
  return n;
}
function yi(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : yi(t);
}
function xs(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const Vc = Symbol.for("v-scx"),
  Kc = () => Ze(Vc);
function Sn(e, t, n) {
  return bi(e, t, n);
}
function bi(e, t, n = ne) {
  const { immediate: r, deep: s, flush: o, once: i } = n,
    l = de({}, n),
    c = (t && r) || (!t && o !== "post");
  let u;
  if (ln) {
    if (o === "sync") {
      const g = Kc();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!c) {
      const g = () => {};
      return ((g.stop = Ve), (g.resume = Ve), (g.pause = Ve), g);
    }
  }
  const a = ae;
  l.call = (g, b, R) => We(g, a, b, R);
  let f = !1;
  (o === "post"
    ? (l.scheduler = (g) => {
        Re(g, a && a.suspense);
      })
    : o !== "sync" &&
      ((f = !0),
      (l.scheduler = (g, b) => {
        b ? g() : es(g);
      })),
    (l.augmentJob = (g) => {
      (t && (g.flags |= 4),
        f && ((g.flags |= 2), a && ((g.id = a.uid), (g.i = a))));
    }));
  const p = nc(e, t, l);
  return (ln && (u ? u.push(p) : c && p()), p);
}
function Wc(e, t, n) {
  const r = this.proxy,
    s = oe(e) ? (e.includes(".") ? _i(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  q(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = dn(this),
    l = bi(s, o.bind(r), n);
  return (i(), l);
}
function _i(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
const zc = (e, t) =>
  t === "modelValue" || t === "model-value"
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Ae(t)}Modifiers`] || e[`${St(t)}Modifiers`];
function Jc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ne;
  let s = n;
  const o = t.startsWith("update:"),
    i = o && zc(r, t.slice(7));
  i &&
    (i.trim && (s = n.map((a) => (oe(a) ? a.trim() : a))),
    i.number && (s = n.map(El)));
  let l,
    c = r[(l = rr(t))] || r[(l = rr(Ae(t)))];
  (!c && o && (c = r[(l = rr(St(t)))]), c && We(c, e, 6, s));
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    ((e.emitted[l] = !0), We(u, e, 6, s));
  }
}
const Gc = new WeakMap();
function Ei(e, t, n = !1) {
  const r = n ? Gc : t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!q(e)) {
    const c = (u) => {
      const a = Ei(u, t, !0);
      a && ((l = !0), de(i, a));
    };
    (!n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c));
  }
  return !o && !l
    ? (re(e) && r.set(e, null), null)
    : ($(o) ? o.forEach((c) => (i[c] = null)) : de(i, o),
      re(e) && r.set(e, i),
      i);
}
function Jn(e, t) {
  return !e || !Bn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      G(e, t[0].toLowerCase() + t.slice(1)) || G(e, St(t)) || G(e, t));
}
function Os(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: s,
      propsOptions: [o],
      slots: i,
      attrs: l,
      emit: c,
      render: u,
      renderCache: a,
      props: f,
      data: p,
      setupState: g,
      ctx: b,
      inheritAttrs: R,
    } = e,
    v = Nn(e);
  let C, A;
  try {
    if (n.shapeFlag & 4) {
      const M = s || r,
        H = M;
      ((C = qe(u.call(H, M, a, f, g, p, b))), (A = l));
    } else {
      const M = t;
      ((C = qe(
        M.length > 1 ? M(f, { attrs: l, slots: i, emit: c }) : M(f, null),
      )),
        (A = t.props ? l : Xc(l)));
    }
  } catch (M) {
    ((Zt.length = 0), Wn(M, e, 1), (C = Ke(dt)));
  }
  let F = C;
  if (A && R !== !1) {
    const M = Object.keys(A),
      { shapeFlag: H } = F;
    M.length &&
      H & 7 &&
      (o && M.some(kr) && (A = Qc(A, o)), (F = It(F, A, !1, !0)));
  }
  return (
    n.dirs &&
      ((F = It(F, null, !1, !0)),
      (F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs)),
    n.transition && ts(F, n.transition),
    (C = F),
    Nn(v),
    C
  );
}
const Xc = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Bn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Qc = (e, t) => {
    const n = {};
    for (const r in e) (!kr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Yc(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? As(r, i, u) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let f = 0; f < a.length; f++) {
        const p = a[f];
        if (i[p] !== r[p] && !Jn(u, p)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
        ? !1
        : r
          ? i
            ? As(r, i, u)
            : !0
          : !!i;
  return !1;
}
function As(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !Jn(n, o)) return !0;
  }
  return !1;
}
function Zc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
      (((e = t.vnode).el = n), (t = t.parent));
    else break;
  }
}
const wi = (e) => e.__isSuspense;
function ea(e, t) {
  t && t.pendingBranch
    ? $(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : oc(e);
}
const Qe = Symbol.for("v-fgt"),
  Gn = Symbol.for("v-txt"),
  dt = Symbol.for("v-cmt"),
  fr = Symbol.for("v-stc"),
  Zt = [];
let ve = null;
function Si(e = !1) {
  Zt.push((ve = e ? null : []));
}
function ta() {
  (Zt.pop(), (ve = Zt[Zt.length - 1] || null));
}
let on = 1;
function Mn(e, t = !1) {
  ((on += e), e < 0 && ve && t && (ve.hasOnce = !0));
}
function Ri(e) {
  return (
    (e.dynamicChildren = on > 0 ? ve || Ct : null),
    ta(),
    on > 0 && ve && ve.push(e),
    e
  );
}
function Dd(e, t, n, r, s, o) {
  return Ri(Oi(e, t, n, r, s, o, !0));
}
function vi(e, t, n, r, s) {
  return Ri(Ke(e, t, n, r, s, !0));
}
function In(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function qt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const xi = ({ key: e }) => e ?? null,
  Rn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? oe(e) || fe(e) || q(e)
        ? { i: Pe, r: e, k: t, f: !!n }
        : e
      : null
  );
function Oi(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Qe ? 0 : 1,
  i = !1,
  l = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xi(t),
    ref: t && Rn(t),
    scopeId: Zo,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe,
  };
  return (
    l
      ? (ss(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= oe(n) ? 8 : 16),
    on > 0 &&
      !i &&
      ve &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      ve.push(c),
    c
  );
}
const Ke = na;
function na(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === vc) && (e = dt), In(e))) {
    const l = It(e, t, !0);
    return (
      n && ss(l, n),
      on > 0 &&
        !o &&
        ve &&
        (l.shapeFlag & 6 ? (ve[ve.indexOf(e)] = l) : ve.push(l)),
      (l.patchFlag = -2),
      l
    );
  }
  if ((ma(e) && (e = e.__vccOpts), t)) {
    t = ra(t);
    let { class: l, style: c } = t;
    (l && !oe(l) && (t.class = Wr(l)),
      re(c) && (Zr(c) && !$(c) && (c = de({}, c)), (t.style = Kr(c))));
  }
  const i = oe(e) ? 1 : wi(e) ? 128 : cc(e) ? 64 : re(e) ? 4 : q(e) ? 2 : 0;
  return Oi(e, t, n, r, s, i, o, !0);
}
function ra(e) {
  return e ? (Zr(e) || ui(e) ? de({}, e) : e) : null;
}
function It(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: l, transition: c } = e,
    u = t ? oa(s || {}, t) : s,
    a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: u,
      key: u && xi(u),
      ref:
        t && t.ref
          ? n && o
            ? $(o)
              ? o.concat(Rn(t))
              : [o, Rn(t)]
            : Rn(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Qe ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && It(e.ssContent),
      ssFallback: e.ssFallback && It(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return (c && r && ts(a, c.clone(a)), a);
}
function sa(e = " ", t = 0) {
  return Ke(Gn, null, e, t);
}
function jd(e = "", t = !1) {
  return t ? (Si(), vi(dt, null, e)) : Ke(dt, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean"
    ? Ke(dt)
    : $(e)
      ? Ke(Qe, null, e.slice())
      : In(e)
        ? lt(e)
        : Ke(Gn, null, String(e));
}
function lt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : It(e);
}
function ss(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if ($(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), ss(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !ui(t)
        ? (t._ctx = Pe)
        : s === 3 &&
          Pe &&
          (Pe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    q(t)
      ? ((t = { default: t, _ctx: Pe }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [sa(t)])) : (n = 8));
  ((e.children = t), (e.shapeFlag |= n));
}
function oa(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = Wr([t.class, r.class]));
      else if (s === "style") t.style = Kr([t.style, r.style]);
      else if (Bn(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !($(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function $e(e, t, n, r = null) {
  We(e, t, 7, [n, r]);
}
const ia = li();
let la = 0;
function ca(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || ia,
    o = {
      uid: la++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Tl(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: di(r, s),
      emitsOptions: Ei(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ne,
      inheritAttrs: r.inheritAttrs,
      ctx: ne,
      data: ne,
      props: ne,
      attrs: ne,
      slots: ne,
      refs: ne,
      setupState: ne,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Jc.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ae = null;
const aa = () => ae || Pe;
let Dn, Pr;
{
  const e = qn(),
    t = (n, r) => {
      let s;
      return (
        (s = e[n]) || (s = e[n] = []),
        s.push(r),
        (o) => {
          s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
        }
      );
    };
  ((Dn = t("__VUE_INSTANCE_SETTERS__", (n) => (ae = n))),
    (Pr = t("__VUE_SSR_SETTERS__", (n) => (ln = n))));
}
const dn = (e) => {
    const t = ae;
    return (
      Dn(e),
      e.scope.on(),
      () => {
        (e.scope.off(), Dn(t));
      }
    );
  },
  Ts = () => {
    (ae && ae.scope.off(), Dn(null));
  };
function Ai(e) {
  return e.vnode.shapeFlag & 4;
}
let ln = !1;
function ua(e, t = !1, n = !1) {
  t && Pr(t);
  const { props: r, children: s } = e.vnode,
    o = Ai(e);
  (Mc(e, r, o, t), Uc(e, s, n || t));
  const i = o ? fa(e, t) : void 0;
  return (t && Pr(!1), i);
}
function fa(e, t) {
  const n = e.type;
  ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Oc)));
  const { setup: r } = n;
  if (r) {
    et();
    const s = (e.setupContext = r.length > 1 ? ha(e) : null),
      o = dn(e),
      i = fn(r, e, 0, [e.props, s]),
      l = Ro(i);
    if ((tt(), o(), (l || e.sp) && !Qt(e) && ti(e), l)) {
      if ((i.then(Ts, Ts), t))
        return i
          .then((c) => {
            Cs(e, c);
          })
          .catch((c) => {
            Wn(c, e, 0);
          });
      e.asyncDep = i;
    } else Cs(e, i);
  } else Ti(e);
}
function Cs(e, t, n) {
  (q(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : re(t) && (e.setupState = zo(t)),
    Ti(e));
}
function Ti(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Ve);
  {
    const s = dn(e);
    et();
    try {
      Ac(e);
    } finally {
      (tt(), s());
    }
  }
}
const da = {
  get(e, t) {
    return (ce(e, "get", ""), e[t]);
  },
};
function ha(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, da),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function os(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(zo(Jl(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in Yt) return Yt[n](e);
          },
          has(t, n) {
            return n in t || n in Yt;
          },
        }))
    : e.proxy;
}
function pa(e, t = !0) {
  return q(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function ma(e) {
  return q(e) && "__vccOpts" in e;
}
const Ce = (e, t) => ec(e, t, ln);
function Ci(e, t, n) {
  const r = (o, i, l) => {
      Mn(-1);
      try {
        return Ke(o, i, l);
      } finally {
        Mn(1);
      }
    },
    s = arguments.length;
  return s === 2
    ? re(t) && !$(t)
      ? In(t)
        ? r(e, null, [t])
        : r(e, t)
      : r(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && In(n) && (n = [n]),
      r(e, t, n));
}
const ga = "3.5.21";
/**
 * @vue/runtime-dom v3.5.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Nr;
const Ps = typeof window < "u" && window.trustedTypes;
if (Ps)
  try {
    Nr = Ps.createPolicy("vue", { createHTML: (e) => e });
  } catch {}
const Pi = Nr ? (e) => Nr.createHTML(e) : (e) => e,
  ya = "http://www.w3.org/2000/svg",
  ba = "http://www.w3.org/1998/Math/MathML",
  Xe = typeof document < "u" ? document : null,
  Ns = Xe && Xe.createElement("template"),
  _a = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s =
        t === "svg"
          ? Xe.createElementNS(ya, e)
          : t === "mathml"
            ? Xe.createElementNS(ba, e)
            : n
              ? Xe.createElement(e, { is: n })
              : Xe.createElement(e);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => Xe.createTextNode(e),
    createComment: (e) => Xe.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Xe.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        Ns.innerHTML = Pi(
          r === "svg"
            ? `<svg>${e}</svg>`
            : r === "mathml"
              ? `<math>${e}</math>`
              : e,
        );
        const l = Ns.content;
        if (r === "svg" || r === "mathml") {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Ea = Symbol("_vtc");
function wa(e, t, n) {
  const r = e[Ea];
  (r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t));
}
const Fs = Symbol("_vod"),
  Sa = Symbol("_vsh"),
  Ra = Symbol(""),
  va = /(?:^|;)\s*display\s*:/;
function xa(e, t, n) {
  const r = e.style,
    s = oe(n);
  let o = !1;
  if (n && !s) {
    if (t)
      if (oe(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && vn(r, l, "");
        }
      else for (const i in t) n[i] == null && vn(r, i, "");
    for (const i in n) (i === "display" && (o = !0), vn(r, i, n[i]));
  } else if (s) {
    if (t !== n) {
      const i = r[Ra];
      (i && (n += ";" + i), (r.cssText = n), (o = va.test(n)));
    }
  } else t && e.removeAttribute("style");
  Fs in e && ((e[Fs] = o ? r.display : ""), e[Sa] && (r.display = "none"));
}
const Ls = /\s*!important$/;
function vn(e, t, n) {
  if ($(n)) n.forEach((r) => vn(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Oa(e, t);
    Ls.test(n)
      ? e.setProperty(St(r), n.replace(Ls, ""), "important")
      : (e[r] = n);
  }
}
const Ms = ["Webkit", "Moz", "ms"],
  dr = {};
function Oa(e, t) {
  const n = dr[t];
  if (n) return n;
  let r = Ae(t);
  if (r !== "filter" && r in e) return (dr[t] = r);
  r = kn(r);
  for (let s = 0; s < Ms.length; s++) {
    const o = Ms[s] + r;
    if (o in e) return (dr[t] = o);
  }
  return t;
}
const Is = "http://www.w3.org/1999/xlink";
function Ds(e, t, n, r, s, o = Ol(t)) {
  r && t.startsWith("xlink:")
    ? n == null
      ? e.removeAttributeNS(Is, t.slice(6, t.length))
      : e.setAttributeNS(Is, t, n)
    : n == null || (o && !Ao(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : ht(n) ? String(n) : n);
}
function js(e, t, n, r, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Pi(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value,
      c = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
    ((l !== c || !("_value" in e)) && (e.value = c),
      n == null && e.removeAttribute(t),
      (e._value = n));
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean"
      ? (n = Ao(n))
      : n == null && l === "string"
        ? ((n = ""), (i = !0))
        : l === "number" && ((n = 0), (i = !0));
  }
  try {
    e[t] = n;
  } catch {}
  i && e.removeAttribute(s || t);
}
function Aa(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Ta(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Us = Symbol("_vei");
function Ca(e, t, n, r, s = null) {
  const o = e[Us] || (e[Us] = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = Pa(t);
    if (r) {
      const u = (o[t] = La(r, s));
      Aa(e, l, u, c);
    } else i && (Ta(e, l, i, c), (o[t] = void 0));
  }
}
const Bs = /(?:Once|Passive|Capture)$/;
function Pa(e) {
  let t;
  if (Bs.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Bs)); )
      ((e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0));
  }
  return [e[2] === ":" ? e.slice(3) : St(e.slice(2)), t];
}
let hr = 0;
const Na = Promise.resolve(),
  Fa = () => hr || (Na.then(() => (hr = 0)), (hr = Date.now()));
function La(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    We(Ma(r, n.value), t, 5, [r]);
  };
  return ((n.value = e), (n.attached = Fa()), n);
}
function Ma(e, t) {
  if ($(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        (n.call(e), (e._stopped = !0));
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const $s = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Ia = (e, t, n, r, s, o) => {
    const i = s === "svg";
    t === "class"
      ? wa(e, r, i)
      : t === "style"
        ? xa(e, n, r)
        : Bn(t)
          ? kr(t) || Ca(e, t, n, r, o)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : Da(e, t, r, i)
              )
            ? (js(e, t, r),
              !e.tagName.includes("-") &&
                (t === "value" || t === "checked" || t === "selected") &&
                Ds(e, t, r, i, o, t !== "value"))
            : e._isVueCE && (/[A-Z]/.test(t) || !oe(r))
              ? js(e, Ae(t), r, o, t)
              : (t === "true-value"
                  ? (e._trueValue = r)
                  : t === "false-value" && (e._falseValue = r),
                Ds(e, t, r, i));
  };
function Da(e, t, n, r) {
  if (r)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && $s(t) && q(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "autocorrect" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return $s(t) && oe(n) ? !1 : t in e;
}
const ja = de({ patchProp: Ia }, _a);
let Hs;
function Ua() {
  return Hs || (Hs = $c(ja));
}
const Ba = (...e) => {
  const t = Ua().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = Ha(r);
      if (!s) return;
      const o = t._component;
      (!q(o) && !o.render && !o.template && (o.template = s.innerHTML),
        s.nodeType === 1 && (s.textContent = ""));
      const i = n(s, !1, $a(s));
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function $a(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ha(e) {
  return oe(e) ? document.querySelector(e) : e;
}
const ka = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  qa = {};
function Va(e, t) {
  const n = Rc("router-view");
  return (Si(), vi(n));
}
const Ka = ka(qa, [["render", Va]]);
/*!
 * vue-router v4.5.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ const Tt = typeof document < "u";
function Ni(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Wa(e) {
  return (
    e.__esModule ||
    e[Symbol.toStringTag] === "Module" ||
    (e.default && Ni(e.default))
  );
}
const z = Object.assign;
function pr(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Fe(s) ? s.map(e) : e(s);
  }
  return n;
}
const en = () => {},
  Fe = Array.isArray,
  Fi = /#/g,
  za = /&/g,
  Ja = /\//g,
  Ga = /=/g,
  Xa = /\?/g,
  Li = /\+/g,
  Qa = /%5B/g,
  Ya = /%5D/g,
  Mi = /%5E/g,
  Za = /%60/g,
  Ii = /%7B/g,
  eu = /%7C/g,
  Di = /%7D/g,
  tu = /%20/g;
function is(e) {
  return encodeURI("" + e)
    .replace(eu, "|")
    .replace(Qa, "[")
    .replace(Ya, "]");
}
function nu(e) {
  return is(e).replace(Ii, "{").replace(Di, "}").replace(Mi, "^");
}
function Fr(e) {
  return is(e)
    .replace(Li, "%2B")
    .replace(tu, "+")
    .replace(Fi, "%23")
    .replace(za, "%26")
    .replace(Za, "`")
    .replace(Ii, "{")
    .replace(Di, "}")
    .replace(Mi, "^");
}
function ru(e) {
  return Fr(e).replace(Ga, "%3D");
}
function su(e) {
  return is(e).replace(Fi, "%23").replace(Xa, "%3F");
}
function ou(e) {
  return e == null ? "" : su(e).replace(Ja, "%2F");
}
function cn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
const iu = /\/$/,
  lu = (e) => e.replace(iu, "");
function mr(e, t, n = "/") {
  let r,
    s = {},
    o = "",
    i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    l < c && l >= 0 && (c = -1),
    c > -1 &&
      ((r = t.slice(0, c)),
      (o = t.slice(c + 1, l > -1 ? l : t.length)),
      (s = e(o))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = fu(r ?? t, n)),
    { fullPath: r + (o && "?") + o + i, path: r, query: s, hash: cn(i) }
  );
}
function cu(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ks(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function au(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    Dt(t.matched[r], n.matched[s]) &&
    ji(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Dt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ji(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!uu(e[n], t[n])) return !1;
  return !0;
}
function uu(e, t) {
  return Fe(e) ? qs(e, t) : Fe(t) ? qs(t, e) : e === t;
}
function qs(e, t) {
  return Fe(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function fu(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    s = r[r.length - 1];
  (s === ".." || s === ".") && r.push("");
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== "."))
      if (l === "..") o > 1 && o--;
      else break;
  return n.slice(0, o).join("/") + "/" + r.slice(i).join("/");
}
const ot = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0,
};
var an;
(function (e) {
  ((e.pop = "pop"), (e.push = "push"));
})(an || (an = {}));
var tn;
(function (e) {
  ((e.back = "back"), (e.forward = "forward"), (e.unknown = ""));
})(tn || (tn = {}));
function du(e) {
  if (!e)
    if (Tt) {
      const t = document.querySelector("base");
      ((e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, "")));
    } else e = "/";
  return (e[0] !== "/" && e[0] !== "#" && (e = "/" + e), lu(e));
}
const hu = /^[^#]+#/;
function pu(e, t) {
  return e.replace(hu, "#") + t;
}
function mu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Xn = () => ({ left: window.scrollX, top: window.scrollY });
function gu(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = mu(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY,
      );
}
function Vs(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Lr = new Map();
function yu(e, t) {
  Lr.set(e, t);
}
function bu(e) {
  const t = Lr.get(e);
  return (Lr.delete(e), t);
}
let _u = () => location.protocol + "//" + location.host;
function Ui(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = s.slice(l);
    return (c[0] !== "/" && (c = "/" + c), ks(c, ""));
  }
  return ks(n, e) + r + s;
}
function Eu(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const l = ({ state: p }) => {
    const g = Ui(e, location),
      b = n.value,
      R = t.value;
    let v = 0;
    if (p) {
      if (((n.value = g), (t.value = p), i && i === b)) {
        i = null;
        return;
      }
      v = R ? p.position - R.position : 0;
    } else r(g);
    s.forEach((C) => {
      C(n.value, b, {
        delta: v,
        type: an.pop,
        direction: v ? (v > 0 ? tn.forward : tn.back) : tn.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(p) {
    s.push(p);
    const g = () => {
      const b = s.indexOf(p);
      b > -1 && s.splice(b, 1);
    };
    return (o.push(g), g);
  }
  function a() {
    const { history: p } = window;
    p.state && p.replaceState(z({}, p.state, { scroll: Xn() }), "");
  }
  function f() {
    for (const p of o) p();
    ((o = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", a));
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", a, { passive: !0 }),
    { pauseListeners: c, listen: u, destroy: f }
  );
}
function Ks(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Xn() : null,
  };
}
function wu(e) {
  const { history: t, location: n } = window,
    r = { value: Ui(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function o(c, u, a) {
    const f = e.indexOf("#"),
      p =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + c
          : _u() + e + c;
    try {
      (t[a ? "replaceState" : "pushState"](u, "", p), (s.value = u));
    } catch (g) {
      (console.error(g), n[a ? "replace" : "assign"](p));
    }
  }
  function i(c, u) {
    const a = z({}, t.state, Ks(s.value.back, c, s.value.forward, !0), u, {
      position: s.value.position,
    });
    (o(c, a, !0), (r.value = c));
  }
  function l(c, u) {
    const a = z({}, s.value, t.state, { forward: c, scroll: Xn() });
    o(a.current, a, !0);
    const f = z({}, Ks(r.value, c, null), { position: a.position + 1 }, u);
    (o(c, f, !1), (r.value = c));
  }
  return { location: r, state: s, push: l, replace: i };
}
function Su(e) {
  e = du(e);
  const t = wu(e),
    n = Eu(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    (i || n.pauseListeners(), history.go(o));
  }
  const s = z(
    { location: "", base: e, go: r, createHref: pu.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Ru(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Bi(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const $i = Symbol("");
var Ws;
(function (e) {
  ((e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated"));
})(Ws || (Ws = {}));
function jt(e, t) {
  return z(new Error(), { type: e, [$i]: !0 }, t);
}
function Ge(e, t) {
  return e instanceof Error && $i in e && (t == null || !!(e.type & t));
}
const zs = "[^/]+?",
  vu = { sensitive: !1, strict: !1, start: !0, end: !0 },
  xu = /[.+*?^${}()[\]/\\]/g;
function Ou(e, t) {
  const n = z({}, vu, t),
    r = [];
  let s = n.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const a = u.length ? [] : [90];
    n.strict && !u.length && (s += "/");
    for (let f = 0; f < u.length; f++) {
      const p = u[f];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        (f || (s += "/"), (s += p.value.replace(xu, "\\$&")), (g += 40));
      else if (p.type === 1) {
        const { value: b, repeatable: R, optional: v, regexp: C } = p;
        o.push({ name: b, repeatable: R, optional: v });
        const A = C || zs;
        if (A !== zs) {
          g += 10;
          try {
            new RegExp(`(${A})`);
          } catch (M) {
            throw new Error(
              `Invalid custom RegExp for param "${b}" (${A}): ` + M.message,
            );
          }
        }
        let F = R ? `((?:${A})(?:/(?:${A}))*)` : `(${A})`;
        (f || (F = v && u.length < 2 ? `(?:/${F})` : "/" + F),
          v && (F += "?"),
          (s += F),
          (g += 20),
          v && (g += -8),
          R && (g += -20),
          A === ".*" && (g += -50));
      }
      a.push(g);
    }
    r.push(a);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  (n.strict || (s += "/?"),
    n.end ? (s += "$") : n.strict && !s.endsWith("/") && (s += "(?:/|$)"));
  const i = new RegExp(s, n.sensitive ? "" : "i");
  function l(u) {
    const a = u.match(i),
      f = {};
    if (!a) return null;
    for (let p = 1; p < a.length; p++) {
      const g = a[p] || "",
        b = o[p - 1];
      f[b.name] = g && b.repeatable ? g.split("/") : g;
    }
    return f;
  }
  function c(u) {
    let a = "",
      f = !1;
    for (const p of e) {
      ((!f || !a.endsWith("/")) && (a += "/"), (f = !1));
      for (const g of p)
        if (g.type === 0) a += g.value;
        else if (g.type === 1) {
          const { value: b, repeatable: R, optional: v } = g,
            C = b in u ? u[b] : "";
          if (Fe(C) && !R)
            throw new Error(
              `Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const A = Fe(C) ? C.join("/") : C;
          if (!A)
            if (v)
              p.length < 2 &&
                (a.endsWith("/") ? (a = a.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${b}"`);
          a += A;
        }
    }
    return a || "/";
  }
  return { re: i, score: r, keys: o, parse: l, stringify: c };
}
function Au(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0;
}
function Hi(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = Au(r[n], s[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Js(r)) return 1;
    if (Js(s)) return -1;
  }
  return s.length - r.length;
}
function Js(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Tu = { type: 0, value: "" },
  Cu = /[a-zA-Z0-9_]/;
function Pu(e) {
  if (!e) return [[]];
  if (e === "/") return [[Tu]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${u}": ${g}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    (o && s.push(o), (o = []));
  }
  let l = 0,
    c,
    u = "",
    a = "";
  function f() {
    u &&
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
          ? (o.length > 1 &&
              (c === "*" || c === "+") &&
              t(
                `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`,
              ),
            o.push({
              type: 1,
              value: u,
              regexp: a,
              repeatable: c === "*" || c === "+",
              optional: c === "*" || c === "?",
            }))
          : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function p() {
    u += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      ((r = n), (n = 4));
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (u && f(), i()) : c === ":" ? (f(), (n = 1)) : p();
        break;
      case 4:
        (p(), (n = r));
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Cu.test(c)
            ? p()
            : (f(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")"
          ? a[a.length - 1] == "\\"
            ? (a = a.slice(0, -1) + c)
            : (n = 3)
          : (a += c);
        break;
      case 3:
        (f(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (a = ""));
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return (
    n === 2 && t(`Unfinished custom RegExp for param "${u}"`),
    f(),
    i(),
    s
  );
}
function Nu(e, t, n) {
  const r = Ou(Pu(e.path), n),
    s = z(r, { record: e, parent: t, children: [], alias: [] });
  return (t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s);
}
function Fu(e, t) {
  const n = [],
    r = new Map();
  t = Ys({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(f) {
    return r.get(f);
  }
  function o(f, p, g) {
    const b = !g,
      R = Xs(f);
    R.aliasOf = g && g.record;
    const v = Ys(t, f),
      C = [R];
    if ("alias" in f) {
      const M = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const H of M)
        C.push(
          Xs(
            z({}, R, {
              components: g ? g.record.components : R.components,
              path: H,
              aliasOf: g ? g.record : R,
            }),
          ),
        );
    }
    let A, F;
    for (const M of C) {
      const { path: H } = M;
      if (p && H[0] !== "/") {
        const Z = p.record.path,
          K = Z[Z.length - 1] === "/" ? "" : "/";
        M.path = p.record.path + (H && K + H);
      }
      if (
        ((A = Nu(M, p, v)),
        g
          ? g.alias.push(A)
          : ((F = F || A),
            F !== A && F.alias.push(A),
            b && f.name && !Qs(A) && i(f.name)),
        ki(A) && c(A),
        R.children)
      ) {
        const Z = R.children;
        for (let K = 0; K < Z.length; K++) o(Z[K], A, g && g.children[K]);
      }
      g = g || A;
    }
    return F
      ? () => {
          i(F);
        }
      : en;
  }
  function i(f) {
    if (Bi(f)) {
      const p = r.get(f);
      p &&
        (r.delete(f),
        n.splice(n.indexOf(p), 1),
        p.children.forEach(i),
        p.alias.forEach(i));
    } else {
      const p = n.indexOf(f);
      p > -1 &&
        (n.splice(p, 1),
        f.record.name && r.delete(f.record.name),
        f.children.forEach(i),
        f.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(f) {
    const p = Iu(f, n);
    (n.splice(p, 0, f), f.record.name && !Qs(f) && r.set(f.record.name, f));
  }
  function u(f, p) {
    let g,
      b = {},
      R,
      v;
    if ("name" in f && f.name) {
      if (((g = r.get(f.name)), !g)) throw jt(1, { location: f });
      ((v = g.record.name),
        (b = z(
          Gs(
            p.params,
            g.keys
              .filter((F) => !F.optional)
              .concat(g.parent ? g.parent.keys.filter((F) => F.optional) : [])
              .map((F) => F.name),
          ),
          f.params &&
            Gs(
              f.params,
              g.keys.map((F) => F.name),
            ),
        )),
        (R = g.stringify(b)));
    } else if (f.path != null)
      ((R = f.path),
        (g = n.find((F) => F.re.test(R))),
        g && ((b = g.parse(R)), (v = g.record.name)));
    else {
      if (((g = p.name ? r.get(p.name) : n.find((F) => F.re.test(p.path))), !g))
        throw jt(1, { location: f, currentLocation: p });
      ((v = g.record.name),
        (b = z({}, p.params, f.params)),
        (R = g.stringify(b)));
    }
    const C = [];
    let A = g;
    for (; A; ) (C.unshift(A.record), (A = A.parent));
    return { name: v, path: R, params: b, matched: C, meta: Mu(C) };
  }
  e.forEach((f) => o(f));
  function a() {
    ((n.length = 0), r.clear());
  }
  return {
    addRoute: o,
    resolve: u,
    removeRoute: i,
    clearRoutes: a,
    getRoutes: l,
    getRecordMatcher: s,
  };
}
function Gs(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Xs(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Lu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
  return (Object.defineProperty(t, "mods", { value: {} }), t);
}
function Lu(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function Qs(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Mu(e) {
  return e.reduce((t, n) => z(t, n.meta), {});
}
function Ys(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Iu(e, t) {
  let n = 0,
    r = t.length;
  for (; n !== r; ) {
    const o = (n + r) >> 1;
    Hi(e, t[o]) < 0 ? (r = o) : (n = o + 1);
  }
  const s = Du(e);
  return (s && (r = t.lastIndexOf(s, r - 1)), r);
}
function Du(e) {
  let t = e;
  for (; (t = t.parent); ) if (ki(t) && Hi(e, t) === 0) return t;
}
function ki({ record: e }) {
  return !!(
    e.name ||
    (e.components && Object.keys(e.components).length) ||
    e.redirect
  );
}
function ju(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(Li, " "),
      i = o.indexOf("="),
      l = cn(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : cn(o.slice(i + 1));
    if (l in t) {
      let u = t[l];
      (Fe(u) || (u = t[l] = [u]), u.push(c));
    } else t[l] = c;
  }
  return t;
}
function Zs(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = ru(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Fe(r) ? r.map((o) => o && Fr(o)) : [r && Fr(r)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function Uu(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Fe(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
          ? r
          : "" + r);
  }
  return t;
}
const Bu = Symbol(""),
  eo = Symbol(""),
  ls = Symbol(""),
  qi = Symbol(""),
  Mr = Symbol("");
function Vt() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function ct(e, t, n, r, s, o = (i) => i()) {
  const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((l, c) => {
      const u = (p) => {
          p === !1
            ? c(jt(4, { from: n, to: t }))
            : p instanceof Error
              ? c(p)
              : Ru(p)
                ? c(jt(2, { from: t, to: p }))
                : (i &&
                    r.enterCallbacks[s] === i &&
                    typeof p == "function" &&
                    i.push(p),
                  l());
        },
        a = o(() => e.call(r && r.instances[s], t, n, u));
      let f = Promise.resolve(a);
      (e.length < 3 && (f = f.then(u)), f.catch((p) => c(p)));
    });
}
function gr(e, t, n, r, s = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let c = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (Ni(c)) {
          const a = (c.__vccOpts || c)[t];
          a && o.push(ct(a, n, r, i, l, s));
        } else {
          let u = c();
          o.push(() =>
            u.then((a) => {
              if (!a)
                throw new Error(
                  `Couldn't resolve component "${l}" at "${i.path}"`,
                );
              const f = Wa(a) ? a.default : a;
              ((i.mods[l] = a), (i.components[l] = f));
              const g = (f.__vccOpts || f)[t];
              return g && ct(g, n, r, i, l, s)();
            }),
          );
        }
    }
  return o;
}
function to(e) {
  const t = Ze(ls),
    n = Ze(qi),
    r = Ce(() => {
      const c = Ft(e.to);
      return t.resolve(c);
    }),
    s = Ce(() => {
      const { matched: c } = r.value,
        { length: u } = c,
        a = c[u - 1],
        f = n.matched;
      if (!a || !f.length) return -1;
      const p = f.findIndex(Dt.bind(null, a));
      if (p > -1) return p;
      const g = no(c[u - 2]);
      return u > 1 && no(a) === g && f[f.length - 1].path !== g
        ? f.findIndex(Dt.bind(null, c[u - 2]))
        : p;
    }),
    o = Ce(() => s.value > -1 && Vu(n.params, r.value.params)),
    i = Ce(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        ji(n.params, r.value.params),
    );
  function l(c = {}) {
    if (qu(c)) {
      const u = t[Ft(e.replace) ? "replace" : "push"](Ft(e.to)).catch(en);
      return (
        e.viewTransition &&
          typeof document < "u" &&
          "startViewTransition" in document &&
          document.startViewTransition(() => u),
        u
      );
    }
    return Promise.resolve();
  }
  return {
    route: r,
    href: Ce(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
function $u(e) {
  return e.length === 1 ? e[0] : e;
}
const Hu = ei({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
      viewTransition: Boolean,
    },
    useLink: to,
    setup(e, { slots: t }) {
      const n = Kn(to(e)),
        { options: r } = Ze(ls),
        s = Ce(() => ({
          [ro(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [ro(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && $u(t.default(n));
        return e.custom
          ? o
          : Ci(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              o,
            );
      };
    },
  }),
  ku = Hu;
function qu(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return (e.preventDefault && e.preventDefault(), !0);
  }
}
function Vu(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1;
    } else if (!Fe(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function no(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const ro = (e, t, n) => e ?? t ?? n,
  Ku = ei({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Ze(Mr),
        s = Ce(() => e.route || r.value),
        o = Ze(eo, 0),
        i = Ce(() => {
          let u = Ft(o);
          const { matched: a } = s.value;
          let f;
          for (; (f = a[u]) && !f.components; ) u++;
          return u;
        }),
        l = Ce(() => s.value.matched[i.value]);
      (wn(
        eo,
        Ce(() => i.value + 1),
      ),
        wn(Bu, l),
        wn(Mr, s));
      const c = Gl();
      return (
        Sn(
          () => [c.value, l.value, e.name],
          ([u, a, f], [p, g, b]) => {
            (a &&
              ((a.instances[f] = u),
              g &&
                g !== a &&
                u &&
                u === p &&
                (a.leaveGuards.size || (a.leaveGuards = g.leaveGuards),
                a.updateGuards.size || (a.updateGuards = g.updateGuards))),
              u &&
                a &&
                (!g || !Dt(a, g) || !p) &&
                (a.enterCallbacks[f] || []).forEach((R) => R(u)));
          },
          { flush: "post" },
        ),
        () => {
          const u = s.value,
            a = e.name,
            f = l.value,
            p = f && f.components[a];
          if (!p) return so(n.default, { Component: p, route: u });
          const g = f.props[a],
            b = g
              ? g === !0
                ? u.params
                : typeof g == "function"
                  ? g(u)
                  : g
              : null,
            v = Ci(
              p,
              z({}, b, t, {
                onVnodeUnmounted: (C) => {
                  C.component.isUnmounted && (f.instances[a] = null);
                },
                ref: c,
              }),
            );
          return so(n.default, { Component: v, route: u }) || v;
        }
      );
    },
  });
function so(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Wu = Ku;
function zu(e) {
  const t = Fu(e.routes, e),
    n = e.parseQuery || ju,
    r = e.stringifyQuery || Zs,
    s = e.history,
    o = Vt(),
    i = Vt(),
    l = Vt(),
    c = Xl(ot);
  let u = ot;
  Tt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const a = pr.bind(null, (w) => "" + w),
    f = pr.bind(null, ou),
    p = pr.bind(null, cn);
  function g(w, I) {
    let N, D;
    return (
      Bi(w) ? ((N = t.getRecordMatcher(w)), (D = I)) : (D = w),
      t.addRoute(D, N)
    );
  }
  function b(w) {
    const I = t.getRecordMatcher(w);
    I && t.removeRoute(I);
  }
  function R() {
    return t.getRoutes().map((w) => w.record);
  }
  function v(w) {
    return !!t.getRecordMatcher(w);
  }
  function C(w, I) {
    if (((I = z({}, I || c.value)), typeof w == "string")) {
      const m = mr(n, w, I.path),
        E = t.resolve({ path: m.path }, I),
        S = s.createHref(m.fullPath);
      return z(m, E, {
        params: p(E.params),
        hash: cn(m.hash),
        redirectedFrom: void 0,
        href: S,
      });
    }
    let N;
    if (w.path != null) N = z({}, w, { path: mr(n, w.path, I.path).path });
    else {
      const m = z({}, w.params);
      for (const E in m) m[E] == null && delete m[E];
      ((N = z({}, w, { params: f(m) })), (I.params = f(I.params)));
    }
    const D = t.resolve(N, I),
      Y = w.hash || "";
    D.params = a(p(D.params));
    const d = cu(r, z({}, w, { hash: nu(Y), path: D.path })),
      h = s.createHref(d);
    return z(
      { fullPath: d, hash: Y, query: r === Zs ? Uu(w.query) : w.query || {} },
      D,
      { redirectedFrom: void 0, href: h },
    );
  }
  function A(w) {
    return typeof w == "string" ? mr(n, w, c.value.path) : z({}, w);
  }
  function F(w, I) {
    if (u !== w) return jt(8, { from: I, to: w });
  }
  function M(w) {
    return K(w);
  }
  function H(w) {
    return M(z(A(w), { replace: !0 }));
  }
  function Z(w) {
    const I = w.matched[w.matched.length - 1];
    if (I && I.redirect) {
      const { redirect: N } = I;
      let D = typeof N == "function" ? N(w) : N;
      return (
        typeof D == "string" &&
          ((D = D.includes("?") || D.includes("#") ? (D = A(D)) : { path: D }),
          (D.params = {})),
        z(
          {
            query: w.query,
            hash: w.hash,
            params: D.path != null ? {} : w.params,
          },
          D,
        )
      );
    }
  }
  function K(w, I) {
    const N = (u = C(w)),
      D = c.value,
      Y = w.state,
      d = w.force,
      h = w.replace === !0,
      m = Z(N);
    if (m)
      return K(
        z(A(m), {
          state: typeof m == "object" ? z({}, Y, m.state) : Y,
          force: d,
          replace: h,
        }),
        I || N,
      );
    const E = N;
    E.redirectedFrom = I;
    let S;
    return (
      !d && au(r, D, N) && ((S = jt(16, { to: E, from: D })), De(D, D, !0, !1)),
      (S ? Promise.resolve(S) : Me(E, D))
        .catch((_) => (Ge(_) ? (Ge(_, 2) ? _ : st(_)) : W(_, E, D)))
        .then((_) => {
          if (_) {
            if (Ge(_, 2))
              return K(
                z({ replace: h }, A(_.to), {
                  state: typeof _.to == "object" ? z({}, Y, _.to.state) : Y,
                  force: d,
                }),
                I || E,
              );
          } else _ = pt(E, D, !0, h, Y);
          return (rt(E, D, _), _);
        })
    );
  }
  function he(w, I) {
    const N = F(w, I);
    return N ? Promise.reject(N) : Promise.resolve();
  }
  function Te(w) {
    const I = xt.values().next().value;
    return I && typeof I.runWithContext == "function"
      ? I.runWithContext(w)
      : w();
  }
  function Me(w, I) {
    let N;
    const [D, Y, d] = Ju(w, I);
    N = gr(D.reverse(), "beforeRouteLeave", w, I);
    for (const m of D)
      m.leaveGuards.forEach((E) => {
        N.push(ct(E, w, I));
      });
    const h = he.bind(null, w, I);
    return (
      N.push(h),
      xe(N)
        .then(() => {
          N = [];
          for (const m of o.list()) N.push(ct(m, w, I));
          return (N.push(h), xe(N));
        })
        .then(() => {
          N = gr(Y, "beforeRouteUpdate", w, I);
          for (const m of Y)
            m.updateGuards.forEach((E) => {
              N.push(ct(E, w, I));
            });
          return (N.push(h), xe(N));
        })
        .then(() => {
          N = [];
          for (const m of d)
            if (m.beforeEnter)
              if (Fe(m.beforeEnter))
                for (const E of m.beforeEnter) N.push(ct(E, w, I));
              else N.push(ct(m.beforeEnter, w, I));
          return (N.push(h), xe(N));
        })
        .then(
          () => (
            w.matched.forEach((m) => (m.enterCallbacks = {})),
            (N = gr(d, "beforeRouteEnter", w, I, Te)),
            N.push(h),
            xe(N)
          ),
        )
        .then(() => {
          N = [];
          for (const m of i.list()) N.push(ct(m, w, I));
          return (N.push(h), xe(N));
        })
        .catch((m) => (Ge(m, 8) ? m : Promise.reject(m)))
    );
  }
  function rt(w, I, N) {
    l.list().forEach((D) => Te(() => D(w, I, N)));
  }
  function pt(w, I, N, D, Y) {
    const d = F(w, I);
    if (d) return d;
    const h = I === ot,
      m = Tt ? history.state : {};
    (N &&
      (D || h
        ? s.replace(w.fullPath, z({ scroll: h && m && m.scroll }, Y))
        : s.push(w.fullPath, Y)),
      (c.value = w),
      De(w, I, N, h),
      st());
  }
  let Ie;
  function $t() {
    Ie ||
      (Ie = s.listen((w, I, N) => {
        if (!yn.listening) return;
        const D = C(w),
          Y = Z(D);
        if (Y) {
          K(z(Y, { replace: !0, force: !0 }), D).catch(en);
          return;
        }
        u = D;
        const d = c.value;
        (Tt && yu(Vs(d.fullPath, N.delta), Xn()),
          Me(D, d)
            .catch((h) =>
              Ge(h, 12)
                ? h
                : Ge(h, 2)
                  ? (K(z(A(h.to), { force: !0 }), D)
                      .then((m) => {
                        Ge(m, 20) &&
                          !N.delta &&
                          N.type === an.pop &&
                          s.go(-1, !1);
                      })
                      .catch(en),
                    Promise.reject())
                  : (N.delta && s.go(-N.delta, !1), W(h, D, d)),
            )
            .then((h) => {
              ((h = h || pt(D, d, !1)),
                h &&
                  (N.delta && !Ge(h, 8)
                    ? s.go(-N.delta, !1)
                    : N.type === an.pop && Ge(h, 20) && s.go(-1, !1)),
                rt(D, d, h));
            })
            .catch(en));
      }));
  }
  let Rt = Vt(),
    ie = Vt(),
    Q;
  function W(w, I, N) {
    st(w);
    const D = ie.list();
    return (
      D.length ? D.forEach((Y) => Y(w, I, N)) : console.error(w),
      Promise.reject(w)
    );
  }
  function ze() {
    return Q && c.value !== ot
      ? Promise.resolve()
      : new Promise((w, I) => {
          Rt.add([w, I]);
        });
  }
  function st(w) {
    return (
      Q ||
        ((Q = !w),
        $t(),
        Rt.list().forEach(([I, N]) => (w ? N(w) : I())),
        Rt.reset()),
      w
    );
  }
  function De(w, I, N, D) {
    const { scrollBehavior: Y } = e;
    if (!Tt || !Y) return Promise.resolve();
    const d =
      (!N && bu(Vs(w.fullPath, 0))) ||
      ((D || !N) && history.state && history.state.scroll) ||
      null;
    return Go()
      .then(() => Y(w, I, d))
      .then((h) => h && gu(h))
      .catch((h) => W(h, w, I));
  }
  const ge = (w) => s.go(w);
  let vt;
  const xt = new Set(),
    yn = {
      currentRoute: c,
      listening: !0,
      addRoute: g,
      removeRoute: b,
      clearRoutes: t.clearRoutes,
      hasRoute: v,
      getRoutes: R,
      resolve: C,
      options: e,
      push: M,
      replace: H,
      go: ge,
      back: () => ge(-1),
      forward: () => ge(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: ie.add,
      isReady: ze,
      install(w) {
        const I = this;
        (w.component("RouterLink", ku),
          w.component("RouterView", Wu),
          (w.config.globalProperties.$router = I),
          Object.defineProperty(w.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Ft(c),
          }),
          Tt &&
            !vt &&
            c.value === ot &&
            ((vt = !0), M(s.location).catch((Y) => {})));
        const N = {};
        for (const Y in ot)
          Object.defineProperty(N, Y, {
            get: () => c.value[Y],
            enumerable: !0,
          });
        (w.provide(ls, I), w.provide(qi, Vo(N)), w.provide(Mr, c));
        const D = w.unmount;
        (xt.add(w),
          (w.unmount = function () {
            (xt.delete(w),
              xt.size < 1 &&
                ((u = ot),
                Ie && Ie(),
                (Ie = null),
                (c.value = ot),
                (vt = !1),
                (Q = !1)),
              D());
          }));
      },
    };
  function xe(w) {
    return w.reduce((I, N) => I.then(() => Te(N)), Promise.resolve());
  }
  return yn;
}
function Ju(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => Dt(u, l)) ? r.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((u) => Dt(u, c)) || s.push(c));
  }
  return [n, r, s];
}
const Gu = "modulepreload",
  Xu = function (e) {
    return "/ui/" + e;
  },
  oo = {},
  yr = function (t, n, r) {
    let s = Promise.resolve();
    if (n && n.length > 0) {
      let c = function (u) {
        return Promise.all(
          u.map((a) =>
            Promise.resolve(a).then(
              (f) => ({ status: "fulfilled", value: f }),
              (f) => ({ status: "rejected", reason: f }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const i = document.querySelector("meta[property=csp-nonce]"),
        l = i?.nonce || i?.getAttribute("nonce");
      s = c(
        n.map((u) => {
          if (((u = Xu(u)), u in oo)) return;
          oo[u] = !0;
          const a = u.endsWith(".css"),
            f = a ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${u}"]${f}`)) return;
          const p = document.createElement("link");
          if (
            ((p.rel = a ? "stylesheet" : Gu),
            a || (p.as = "script"),
            (p.crossOrigin = ""),
            (p.href = u),
            l && p.setAttribute("nonce", l),
            document.head.appendChild(p),
            a)
          )
            return new Promise((g, b) => {
              (p.addEventListener("load", g),
                p.addEventListener("error", () =>
                  b(new Error(`Unable to preload CSS for ${u}`)),
                ));
            });
        }),
      );
    }
    function o(i) {
      const l = new Event("vite:preloadError", { cancelable: !0 });
      if (((l.payload = i), window.dispatchEvent(l), !l.defaultPrevented))
        throw i;
    }
    return s.then((i) => {
      for (const l of i || []) l.status === "rejected" && o(l.reason);
      return t().catch(o);
    });
  },
  Qu = [
    {
      path: "/",
      name: "index",
      redirect: { name: "dashboard" },
      component: () =>
        yr(
          () => import("./DashBoardLayout-zGJ9CnxR.js"),
          __vite__mapDeps([0, 1]),
        ),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => yr(() => import("./DashBoardIndex-BK8Ga3CB.js"), []),
          meta: { title: "首页", icon: { lib: "", name: "" } },
        },
        {
          path: "/settings",
          name: "settings",
          component: () =>
            yr(() => import("./DashBoardSettings-A4nSoClY.js"), []),
          meta: { title: "设置", icon: { lib: "", name: "" } },
        },
      ],
    },
  ],
  Vi = zu({ history: Su("/ui/"), routes: Qu });
Vi.beforeEach((e, t, n) => {
  const r = e.meta.title,
    s = "管理面板";
  ((document.title = r ? `${s}-${r}` : s), n());
});
function Ki(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Yu } = Object.prototype,
  { getPrototypeOf: cs } = Object,
  { iterator: Qn, toStringTag: Wi } = Symbol,
  Yn = ((e) => (t) => {
    const n = Yu.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Le = (e) => ((e = e.toLowerCase()), (t) => Yn(t) === e),
  Zn = (e) => (t) => typeof t === e,
  { isArray: Ut } = Array,
  un = Zn("undefined");
function hn(e) {
  return (
    e !== null &&
    !un(e) &&
    e.constructor !== null &&
    !un(e.constructor) &&
    Ee(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const zi = Le("ArrayBuffer");
function Zu(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && zi(e.buffer)),
    t
  );
}
const ef = Zn("string"),
  Ee = Zn("function"),
  Ji = Zn("number"),
  pn = (e) => e !== null && typeof e == "object",
  tf = (e) => e === !0 || e === !1,
  xn = (e) => {
    if (Yn(e) !== "object") return !1;
    const t = cs(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Wi in e) &&
      !(Qn in e)
    );
  },
  nf = (e) => {
    if (!pn(e) || hn(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  rf = Le("Date"),
  sf = Le("File"),
  of = Le("Blob"),
  lf = Le("FileList"),
  cf = (e) => pn(e) && Ee(e.pipe),
  af = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (Ee(e.append) &&
          ((t = Yn(e)) === "formdata" ||
            (t === "object" &&
              Ee(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  uf = Le("URLSearchParams"),
  [ff, df, hf, pf] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Le,
  ),
  mf = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function mn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, s;
  if ((typeof e != "object" && (e = [e]), Ut(e)))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
  else {
    if (hn(e)) return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let l;
    for (r = 0; r < i; r++) ((l = o[r]), t.call(null, e[l], l, e));
  }
}
function Gi(e, t) {
  if (hn(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    s;
  for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
  return null;
}
const bt =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Xi = (e) => !un(e) && e !== bt;
function Ir() {
  const { caseless: e } = (Xi(this) && this) || {},
    t = {},
    n = (r, s) => {
      const o = (e && Gi(t, s)) || s;
      xn(t[o]) && xn(r)
        ? (t[o] = Ir(t[o], r))
        : xn(r)
          ? (t[o] = Ir({}, r))
          : Ut(r)
            ? (t[o] = r.slice())
            : (t[o] = r);
    };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && mn(arguments[r], n);
  return t;
}
const gf = (e, t, n, { allOwnKeys: r } = {}) => (
    mn(
      t,
      (s, o) => {
        n && Ee(s) ? (e[o] = Ki(s, n)) : (e[o] = s);
      },
      { allOwnKeys: r },
    ),
    e
  ),
  yf = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  bf = (e, t, n, r) => {
    ((e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n));
  },
  _f = (e, t, n, r) => {
    let s, o, i;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
        ((i = s[o]),
          (!r || r(i, e, t)) && !l[i] && ((t[i] = e[i]), (l[i] = !0)));
      e = n !== !1 && cs(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  Ef = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  wf = (e) => {
    if (!e) return null;
    if (Ut(e)) return e;
    let t = e.length;
    if (!Ji(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Sf = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && cs(Uint8Array)),
  Rf = (e, t) => {
    const r = (e && e[Qn]).call(e);
    let s;
    for (; (s = r.next()) && !s.done; ) {
      const o = s.value;
      t.call(e, o[0], o[1]);
    }
  },
  vf = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  xf = Le("HTMLFormElement"),
  Of = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s;
    }),
  io = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Af = Le("RegExp"),
  Qi = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    (mn(n, (s, o) => {
      let i;
      (i = t(s, o, e)) !== !1 && (r[o] = i || s);
    }),
      Object.defineProperties(e, r));
  },
  Tf = (e) => {
    Qi(e, (t, n) => {
      if (Ee(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (Ee(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  Cf = (e, t) => {
    const n = {},
      r = (s) => {
        s.forEach((o) => {
          n[o] = !0;
        });
      };
    return (Ut(e) ? r(e) : r(String(e).split(t)), n);
  },
  Pf = () => {},
  Nf = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Ff(e) {
  return !!(e && Ee(e.append) && e[Wi] === "FormData" && e[Qn]);
}
const Lf = (e) => {
    const t = new Array(10),
      n = (r, s) => {
        if (pn(r)) {
          if (t.indexOf(r) >= 0) return;
          if (hn(r)) return r;
          if (!("toJSON" in r)) {
            t[s] = r;
            const o = Ut(r) ? [] : {};
            return (
              mn(r, (i, l) => {
                const c = n(i, s + 1);
                !un(c) && (o[l] = c);
              }),
              (t[s] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  Mf = Le("AsyncFunction"),
  If = (e) => e && (pn(e) || Ee(e)) && Ee(e.then) && Ee(e.catch),
  Yi = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, r) => (
            bt.addEventListener(
              "message",
              ({ source: s, data: o }) => {
                s === bt && o === n && r.length && r.shift()();
              },
              !1,
            ),
            (s) => {
              (r.push(s), bt.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    Ee(bt.postMessage),
  ),
  Df =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(bt)
      : (typeof process < "u" && process.nextTick) || Yi,
  jf = (e) => e != null && Ee(e[Qn]),
  y = {
    isArray: Ut,
    isArrayBuffer: zi,
    isBuffer: hn,
    isFormData: af,
    isArrayBufferView: Zu,
    isString: ef,
    isNumber: Ji,
    isBoolean: tf,
    isObject: pn,
    isPlainObject: xn,
    isEmptyObject: nf,
    isReadableStream: ff,
    isRequest: df,
    isResponse: hf,
    isHeaders: pf,
    isUndefined: un,
    isDate: rf,
    isFile: sf,
    isBlob: of,
    isRegExp: Af,
    isFunction: Ee,
    isStream: cf,
    isURLSearchParams: uf,
    isTypedArray: Sf,
    isFileList: lf,
    forEach: mn,
    merge: Ir,
    extend: gf,
    trim: mf,
    stripBOM: yf,
    inherits: bf,
    toFlatObject: _f,
    kindOf: Yn,
    kindOfTest: Le,
    endsWith: Ef,
    toArray: wf,
    forEachEntry: Rf,
    matchAll: vf,
    isHTMLForm: xf,
    hasOwnProperty: io,
    hasOwnProp: io,
    reduceDescriptors: Qi,
    freezeMethods: Tf,
    toObjectSet: Cf,
    toCamelCase: Of,
    noop: Pf,
    toFiniteNumber: Nf,
    findKey: Gi,
    global: bt,
    isContextDefined: Xi,
    isSpecCompliantForm: Ff,
    toJSONObject: Lf,
    isAsyncFn: Mf,
    isThenable: If,
    setImmediate: Yi,
    asap: Df,
    isIterable: jf,
  };
function k(e, t, n, r, s) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    s && ((this.response = s), (this.status = s.status ? s.status : null)));
}
y.inherits(k, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Zi = k.prototype,
  el = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  el[e] = { value: e };
});
Object.defineProperties(k, el);
Object.defineProperty(Zi, "isAxiosError", { value: !0 });
k.from = (e, t, n, r, s, o) => {
  const i = Object.create(Zi);
  return (
    y.toFlatObject(
      e,
      i,
      function (c) {
        return c !== Error.prototype;
      },
      (l) => l !== "isAxiosError",
    ),
    k.call(i, e.message, t, n, r, s),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const Uf = null;
function Dr(e) {
  return y.isPlainObject(e) || y.isArray(e);
}
function tl(e) {
  return y.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function lo(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (s, o) {
          return ((s = tl(s)), !n && o ? "[" + s + "]" : s);
        })
        .join(n ? "." : "")
    : t;
}
function Bf(e) {
  return y.isArray(e) && !e.some(Dr);
}
const $f = y.toFlatObject(y, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function er(e, t, n) {
  if (!y.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (n = y.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (R, v) {
        return !y.isUndefined(v[R]);
      },
    )));
  const r = n.metaTokens,
    s = n.visitor || a,
    o = n.dots,
    i = n.indexes,
    c = (n.Blob || (typeof Blob < "u" && Blob)) && y.isSpecCompliantForm(t);
  if (!y.isFunction(s)) throw new TypeError("visitor must be a function");
  function u(b) {
    if (b === null) return "";
    if (y.isDate(b)) return b.toISOString();
    if (y.isBoolean(b)) return b.toString();
    if (!c && y.isBlob(b))
      throw new k("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(b) || y.isTypedArray(b)
      ? c && typeof Blob == "function"
        ? new Blob([b])
        : Buffer.from(b)
      : b;
  }
  function a(b, R, v) {
    let C = b;
    if (b && !v && typeof b == "object") {
      if (y.endsWith(R, "{}"))
        ((R = r ? R : R.slice(0, -2)), (b = JSON.stringify(b)));
      else if (
        (y.isArray(b) && Bf(b)) ||
        ((y.isFileList(b) || y.endsWith(R, "[]")) && (C = y.toArray(b)))
      )
        return (
          (R = tl(R)),
          C.forEach(function (F, M) {
            !(y.isUndefined(F) || F === null) &&
              t.append(
                i === !0 ? lo([R], M, o) : i === null ? R : R + "[]",
                u(F),
              );
          }),
          !1
        );
    }
    return Dr(b) ? !0 : (t.append(lo(v, R, o), u(b)), !1);
  }
  const f = [],
    p = Object.assign($f, {
      defaultVisitor: a,
      convertValue: u,
      isVisitable: Dr,
    });
  function g(b, R) {
    if (!y.isUndefined(b)) {
      if (f.indexOf(b) !== -1)
        throw Error("Circular reference detected in " + R.join("."));
      (f.push(b),
        y.forEach(b, function (C, A) {
          (!(y.isUndefined(C) || C === null) &&
            s.call(t, C, y.isString(A) ? A.trim() : A, R, p)) === !0 &&
            g(C, R ? R.concat(A) : [A]);
        }),
        f.pop());
    }
  }
  if (!y.isObject(e)) throw new TypeError("data must be an object");
  return (g(e), t);
}
function co(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function as(e, t) {
  ((this._pairs = []), e && er(e, this, t));
}
const nl = as.prototype;
nl.append = function (t, n) {
  this._pairs.push([t, n]);
};
nl.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, co);
      }
    : co;
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1]);
    }, "")
    .join("&");
};
function Hf(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function rl(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || Hf;
  y.isFunction(n) && (n = { serialize: n });
  const s = n && n.serialize;
  let o;
  if (
    (s
      ? (o = s(t, n))
      : (o = y.isURLSearchParams(t) ? t.toString() : new as(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#");
    (i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o));
  }
  return e;
}
class ao {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    y.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const sl = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  kf = typeof URLSearchParams < "u" ? URLSearchParams : as,
  qf = typeof FormData < "u" ? FormData : null,
  Vf = typeof Blob < "u" ? Blob : null,
  Kf = {
    isBrowser: !0,
    classes: { URLSearchParams: kf, FormData: qf, Blob: Vf },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  us = typeof window < "u" && typeof document < "u",
  jr = (typeof navigator == "object" && navigator) || void 0,
  Wf =
    us &&
    (!jr || ["ReactNative", "NativeScript", "NS"].indexOf(jr.product) < 0),
  zf =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Jf = (us && window.location.href) || "http://localhost",
  Gf = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: us,
        hasStandardBrowserEnv: Wf,
        hasStandardBrowserWebWorkerEnv: zf,
        navigator: jr,
        origin: Jf,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  ue = { ...Gf, ...Kf };
function Xf(e, t) {
  return er(e, new ue.classes.URLSearchParams(), {
    visitor: function (n, r, s, o) {
      return ue.isNode && y.isBuffer(n)
        ? (this.append(r, n.toString("base64")), !1)
        : o.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function Qf(e) {
  return y
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Yf(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++) ((o = n[r]), (t[o] = e[o]));
  return t;
}
function ol(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i),
      c = o >= n.length;
    return (
      (i = !i && y.isArray(s) ? s.length : i),
      c
        ? (y.hasOwnProp(s, i) ? (s[i] = [s[i], r]) : (s[i] = r), !l)
        : ((!s[i] || !y.isObject(s[i])) && (s[i] = []),
          t(n, r, s[i], o) && y.isArray(s[i]) && (s[i] = Yf(s[i])),
          !l)
    );
  }
  if (y.isFormData(e) && y.isFunction(e.entries)) {
    const n = {};
    return (
      y.forEachEntry(e, (r, s) => {
        t(Qf(r), s, n, 0);
      }),
      n
    );
  }
  return null;
}
function Zf(e, t, n) {
  if (y.isString(e))
    try {
      return ((t || JSON.parse)(e), y.trim(e));
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const gn = {
  transitional: sl,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        o = y.isObject(t);
      if ((o && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t)))
        return s ? JSON.stringify(ol(t)) : t;
      if (
        y.isArrayBuffer(t) ||
        y.isBuffer(t) ||
        y.isStream(t) ||
        y.isFile(t) ||
        y.isBlob(t) ||
        y.isReadableStream(t)
      )
        return t;
      if (y.isArrayBufferView(t)) return t.buffer;
      if (y.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let l;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return Xf(t, this.formSerializer).toString();
        if ((l = y.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const c = this.env && this.env.FormData;
          return er(
            l ? { "files[]": t } : t,
            c && new c(),
            this.formSerializer,
          );
        }
      }
      return o || s ? (n.setContentType("application/json", !1), Zf(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || gn.transitional,
        r = n && n.forcedJSONParsing,
        s = this.responseType === "json";
      if (y.isResponse(t) || y.isReadableStream(t)) return t;
      if (t && y.isString(t) && ((r && !this.responseType) || s)) {
        const i = !(n && n.silentJSONParsing) && s;
        try {
          return JSON.parse(t);
        } catch (l) {
          if (i)
            throw l.name === "SyntaxError"
              ? k.from(l, k.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: ue.classes.FormData, Blob: ue.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
y.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  gn.headers[e] = {};
});
const ed = y.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  td = (e) => {
    const t = {};
    let n, r, s;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (i) {
            ((s = i.indexOf(":")),
              (n = i.substring(0, s).trim().toLowerCase()),
              (r = i.substring(s + 1).trim()),
              !(!n || (t[n] && ed[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r)));
          }),
      t
    );
  },
  uo = Symbol("internals");
function Kt(e) {
  return e && String(e).trim().toLowerCase();
}
function On(e) {
  return e === !1 || e == null ? e : y.isArray(e) ? e.map(On) : String(e);
}
function nd(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const rd = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function br(e, t, n, r, s) {
  if (y.isFunction(r)) return r.call(this, t, n);
  if ((s && (t = n), !!y.isString(t))) {
    if (y.isString(r)) return t.indexOf(r) !== -1;
    if (y.isRegExp(r)) return r.test(t);
  }
}
function sd(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function od(e, t) {
  const n = y.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0,
    });
  });
}
let we = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(l, c, u) {
      const a = Kt(c);
      if (!a) throw new Error("header name must be a non-empty string");
      const f = y.findKey(s, a);
      (!f || s[f] === void 0 || u === !0 || (u === void 0 && s[f] !== !1)) &&
        (s[f || c] = On(l));
    }
    const i = (l, c) => y.forEach(l, (u, a) => o(u, a, c));
    if (y.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (y.isString(t) && (t = t.trim()) && !rd(t)) i(td(t), n);
    else if (y.isObject(t) && y.isIterable(t)) {
      let l = {},
        c,
        u;
      for (const a of t) {
        if (!y.isArray(a))
          throw TypeError("Object iterator must return a key-value pair");
        l[(u = a[0])] = (c = l[u])
          ? y.isArray(c)
            ? [...c, a[1]]
            : [c, a[1]]
          : a[1];
      }
      i(l, n);
    } else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = Kt(t)), t)) {
      const r = y.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return nd(s);
        if (y.isFunction(n)) return n.call(this, s, r);
        if (y.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Kt(t)), t)) {
      const r = y.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || br(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (((i = Kt(i)), i)) {
        const l = y.findKey(r, i);
        l && (!n || br(r, r[l], l, n)) && (delete r[l], (s = !0));
      }
    }
    return (y.isArray(t) ? t.forEach(o) : o(t), s);
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || br(this, this[o], o, t, !0)) && (delete this[o], (s = !0));
    }
    return s;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      y.forEach(this, (s, o) => {
        const i = y.findKey(r, o);
        if (i) {
          ((n[i] = On(s)), delete n[o]);
          return;
        }
        const l = t ? sd(o) : String(o).trim();
        (l !== o && delete n[o], (n[l] = On(s)), (r[l] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      y.forEach(this, (r, s) => {
        r != null && r !== !1 && (n[s] = t && y.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return (n.forEach((s) => r.set(s)), r);
  }
  static accessor(t) {
    const r = (this[uo] = this[uo] = { accessors: {} }).accessors,
      s = this.prototype;
    function o(i) {
      const l = Kt(i);
      r[l] || (od(s, i), (r[l] = !0));
    }
    return (y.isArray(t) ? t.forEach(o) : o(t), this);
  }
};
we.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
y.reduceDescriptors(we.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
y.freezeMethods(we);
function _r(e, t) {
  const n = this || gn,
    r = t || n,
    s = we.from(r.headers);
  let o = r.data;
  return (
    y.forEach(e, function (l) {
      o = l.call(n, o, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    o
  );
}
function il(e) {
  return !!(e && e.__CANCEL__);
}
function Bt(e, t, n) {
  (k.call(this, e ?? "canceled", k.ERR_CANCELED, t, n),
    (this.name = "CanceledError"));
}
y.inherits(Bt, k, { __CANCEL__: !0 });
function ll(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new k(
          "Request failed with status code " + n.status,
          [k.ERR_BAD_REQUEST, k.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
function id(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function ld(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let s = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (c) {
      const u = Date.now(),
        a = r[o];
      (i || (i = u), (n[s] = c), (r[s] = u));
      let f = o,
        p = 0;
      for (; f !== s; ) ((p += n[f++]), (f = f % e));
      if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), u - i < t)) return;
      const g = a && u - a;
      return g ? Math.round((p * 1e3) / g) : void 0;
    }
  );
}
function cd(e, t) {
  let n = 0,
    r = 1e3 / t,
    s,
    o;
  const i = (u, a = Date.now()) => {
    ((n = a), (s = null), o && (clearTimeout(o), (o = null)), e(...u));
  };
  return [
    (...u) => {
      const a = Date.now(),
        f = a - n;
      f >= r
        ? i(u, a)
        : ((s = u),
          o ||
            (o = setTimeout(() => {
              ((o = null), i(s));
            }, r - f)));
    },
    () => s && i(s),
  ];
}
const jn = (e, t, n = 3) => {
    let r = 0;
    const s = ld(50, 250);
    return cd((o) => {
      const i = o.loaded,
        l = o.lengthComputable ? o.total : void 0,
        c = i - r,
        u = s(c),
        a = i <= l;
      r = i;
      const f = {
        loaded: i,
        total: l,
        progress: l ? i / l : void 0,
        bytes: c,
        rate: u || void 0,
        estimated: u && l && a ? (l - i) / u : void 0,
        event: o,
        lengthComputable: l != null,
        [t ? "download" : "upload"]: !0,
      };
      e(f);
    }, n);
  },
  fo = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  ho =
    (e) =>
    (...t) =>
      y.asap(() => e(...t)),
  ad = ue.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, ue.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(ue.origin),
        ue.navigator && /(msie|trident)/i.test(ue.navigator.userAgent),
      )
    : () => !0,
  ud = ue.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, s, o) {
          const i = [e + "=" + encodeURIComponent(t)];
          (y.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
            y.isString(r) && i.push("path=" + r),
            y.isString(s) && i.push("domain=" + s),
            o === !0 && i.push("secure"),
            (document.cookie = i.join("; ")));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"),
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function fd(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function dd(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function cl(e, t, n) {
  let r = !fd(t);
  return e && (r || n == !1) ? dd(e, t) : t;
}
const po = (e) => (e instanceof we ? { ...e } : e);
function wt(e, t) {
  t = t || {};
  const n = {};
  function r(u, a, f, p) {
    return y.isPlainObject(u) && y.isPlainObject(a)
      ? y.merge.call({ caseless: p }, u, a)
      : y.isPlainObject(a)
        ? y.merge({}, a)
        : y.isArray(a)
          ? a.slice()
          : a;
  }
  function s(u, a, f, p) {
    if (y.isUndefined(a)) {
      if (!y.isUndefined(u)) return r(void 0, u, f, p);
    } else return r(u, a, f, p);
  }
  function o(u, a) {
    if (!y.isUndefined(a)) return r(void 0, a);
  }
  function i(u, a) {
    if (y.isUndefined(a)) {
      if (!y.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, a);
  }
  function l(u, a, f) {
    if (f in t) return r(u, a);
    if (f in e) return r(void 0, u);
  }
  const c = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (u, a, f) => s(po(u), po(a), f, !0),
  };
  return (
    y.forEach(Object.keys({ ...e, ...t }), function (a) {
      const f = c[a] || s,
        p = f(e[a], t[a], a);
      (y.isUndefined(p) && f !== l) || (n[a] = p);
    }),
    n
  );
}
const al = (e) => {
    const t = wt({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: s,
      xsrfCookieName: o,
      headers: i,
      auth: l,
    } = t;
    ((t.headers = i = we.from(i)),
      (t.url = rl(
        cl(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer,
      )),
      l &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (l.username || "") +
                ":" +
                (l.password ? unescape(encodeURIComponent(l.password)) : ""),
            ),
        ));
    let c;
    if (y.isFormData(n)) {
      if (ue.hasStandardBrowserEnv || ue.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if ((c = i.getContentType()) !== !1) {
        const [u, ...a] = c
          ? c
              .split(";")
              .map((f) => f.trim())
              .filter(Boolean)
          : [];
        i.setContentType([u || "multipart/form-data", ...a].join("; "));
      }
    }
    if (
      ue.hasStandardBrowserEnv &&
      (r && y.isFunction(r) && (r = r(t)), r || (r !== !1 && ad(t.url)))
    ) {
      const u = s && o && ud.read(o);
      u && i.set(s, u);
    }
    return t;
  },
  hd = typeof XMLHttpRequest < "u",
  pd =
    hd &&
    function (e) {
      return new Promise(function (n, r) {
        const s = al(e);
        let o = s.data;
        const i = we.from(s.headers).normalize();
        let { responseType: l, onUploadProgress: c, onDownloadProgress: u } = s,
          a,
          f,
          p,
          g,
          b;
        function R() {
          (g && g(),
            b && b(),
            s.cancelToken && s.cancelToken.unsubscribe(a),
            s.signal && s.signal.removeEventListener("abort", a));
        }
        let v = new XMLHttpRequest();
        (v.open(s.method.toUpperCase(), s.url, !0), (v.timeout = s.timeout));
        function C() {
          if (!v) return;
          const F = we.from(
              "getAllResponseHeaders" in v && v.getAllResponseHeaders(),
            ),
            H = {
              data:
                !l || l === "text" || l === "json"
                  ? v.responseText
                  : v.response,
              status: v.status,
              statusText: v.statusText,
              headers: F,
              config: e,
              request: v,
            };
          (ll(
            function (K) {
              (n(K), R());
            },
            function (K) {
              (r(K), R());
            },
            H,
          ),
            (v = null));
        }
        ("onloadend" in v
          ? (v.onloadend = C)
          : (v.onreadystatechange = function () {
              !v ||
                v.readyState !== 4 ||
                (v.status === 0 &&
                  !(v.responseURL && v.responseURL.indexOf("file:") === 0)) ||
                setTimeout(C);
            }),
          (v.onabort = function () {
            v &&
              (r(new k("Request aborted", k.ECONNABORTED, e, v)), (v = null));
          }),
          (v.onerror = function () {
            (r(new k("Network Error", k.ERR_NETWORK, e, v)), (v = null));
          }),
          (v.ontimeout = function () {
            let M = s.timeout
              ? "timeout of " + s.timeout + "ms exceeded"
              : "timeout exceeded";
            const H = s.transitional || sl;
            (s.timeoutErrorMessage && (M = s.timeoutErrorMessage),
              r(
                new k(
                  M,
                  H.clarifyTimeoutError ? k.ETIMEDOUT : k.ECONNABORTED,
                  e,
                  v,
                ),
              ),
              (v = null));
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in v &&
            y.forEach(i.toJSON(), function (M, H) {
              v.setRequestHeader(H, M);
            }),
          y.isUndefined(s.withCredentials) ||
            (v.withCredentials = !!s.withCredentials),
          l && l !== "json" && (v.responseType = s.responseType),
          u && (([p, b] = jn(u, !0)), v.addEventListener("progress", p)),
          c &&
            v.upload &&
            (([f, g] = jn(c)),
            v.upload.addEventListener("progress", f),
            v.upload.addEventListener("loadend", g)),
          (s.cancelToken || s.signal) &&
            ((a = (F) => {
              v &&
                (r(!F || F.type ? new Bt(null, e, v) : F),
                v.abort(),
                (v = null));
            }),
            s.cancelToken && s.cancelToken.subscribe(a),
            s.signal &&
              (s.signal.aborted
                ? a()
                : s.signal.addEventListener("abort", a))));
        const A = id(s.url);
        if (A && ue.protocols.indexOf(A) === -1) {
          r(new k("Unsupported protocol " + A + ":", k.ERR_BAD_REQUEST, e));
          return;
        }
        v.send(o || null);
      });
    },
  md = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        s;
      const o = function (u) {
        if (!s) {
          ((s = !0), l());
          const a = u instanceof Error ? u : this.reason;
          r.abort(
            a instanceof k ? a : new Bt(a instanceof Error ? a.message : a),
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          ((i = null), o(new k(`timeout ${t} of ms exceeded`, k.ETIMEDOUT)));
        }, t);
      const l = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((u) => {
            u.unsubscribe
              ? u.unsubscribe(o)
              : u.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((u) => u.addEventListener("abort", o));
      const { signal: c } = r;
      return ((c.unsubscribe = () => y.asap(l)), c);
    }
  },
  gd = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let r = 0,
      s;
    for (; r < n; ) ((s = r + t), yield e.slice(r, s), (r = s));
  },
  yd = async function* (e, t) {
    for await (const n of bd(e)) yield* gd(n, t);
  },
  bd = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  mo = (e, t, n, r) => {
    const s = yd(e, t);
    let o = 0,
      i,
      l = (c) => {
        i || ((i = !0), r && r(c));
      };
    return new ReadableStream(
      {
        async pull(c) {
          try {
            const { done: u, value: a } = await s.next();
            if (u) {
              (l(), c.close());
              return;
            }
            let f = a.byteLength;
            if (n) {
              let p = (o += f);
              n(p);
            }
            c.enqueue(new Uint8Array(a));
          } catch (u) {
            throw (l(u), u);
          }
        },
        cancel(c) {
          return (l(c), s.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  tr =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  ul = tr && typeof ReadableStream == "function",
  _d =
    tr &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  fl = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Ed =
    ul &&
    fl(() => {
      let e = !1;
      const t = new Request(ue.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return ((e = !0), "half");
        },
      }).headers.has("Content-Type");
      return e && !t;
    }),
  go = 64 * 1024,
  Ur = ul && fl(() => y.isReadableStream(new Response("").body)),
  Un = { stream: Ur && ((e) => e.body) };
tr &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !Un[t] &&
        (Un[t] = y.isFunction(e[t])
          ? (n) => n[t]()
          : (n, r) => {
              throw new k(
                `Response type '${t}' is not supported`,
                k.ERR_NOT_SUPPORT,
                r,
              );
            });
    });
  })(new Response());
const wd = async (e) => {
    if (e == null) return 0;
    if (y.isBlob(e)) return e.size;
    if (y.isSpecCompliantForm(e))
      return (
        await new Request(ue.origin, { method: "POST", body: e }).arrayBuffer()
      ).byteLength;
    if (y.isArrayBufferView(e) || y.isArrayBuffer(e)) return e.byteLength;
    if ((y.isURLSearchParams(e) && (e = e + ""), y.isString(e)))
      return (await _d(e)).byteLength;
  },
  Sd = async (e, t) => {
    const n = y.toFiniteNumber(e.getContentLength());
    return n ?? wd(t);
  },
  Rd =
    tr &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: r,
        signal: s,
        cancelToken: o,
        timeout: i,
        onDownloadProgress: l,
        onUploadProgress: c,
        responseType: u,
        headers: a,
        withCredentials: f = "same-origin",
        fetchOptions: p,
      } = al(e);
      u = u ? (u + "").toLowerCase() : "text";
      let g = md([s, o && o.toAbortSignal()], i),
        b;
      const R =
        g &&
        g.unsubscribe &&
        (() => {
          g.unsubscribe();
        });
      let v;
      try {
        if (
          c &&
          Ed &&
          n !== "get" &&
          n !== "head" &&
          (v = await Sd(a, r)) !== 0
        ) {
          let H = new Request(t, { method: "POST", body: r, duplex: "half" }),
            Z;
          if (
            (y.isFormData(r) &&
              (Z = H.headers.get("content-type")) &&
              a.setContentType(Z),
            H.body)
          ) {
            const [K, he] = fo(v, jn(ho(c)));
            r = mo(H.body, go, K, he);
          }
        }
        y.isString(f) || (f = f ? "include" : "omit");
        const C = "credentials" in Request.prototype;
        b = new Request(t, {
          ...p,
          signal: g,
          method: n.toUpperCase(),
          headers: a.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: C ? f : void 0,
        });
        let A = await fetch(b, p);
        const F = Ur && (u === "stream" || u === "response");
        if (Ur && (l || (F && R))) {
          const H = {};
          ["status", "statusText", "headers"].forEach((Te) => {
            H[Te] = A[Te];
          });
          const Z = y.toFiniteNumber(A.headers.get("content-length")),
            [K, he] = (l && fo(Z, jn(ho(l), !0))) || [];
          A = new Response(
            mo(A.body, go, K, () => {
              (he && he(), R && R());
            }),
            H,
          );
        }
        u = u || "text";
        let M = await Un[y.findKey(Un, u) || "text"](A, e);
        return (
          !F && R && R(),
          await new Promise((H, Z) => {
            ll(H, Z, {
              data: M,
              headers: we.from(A.headers),
              status: A.status,
              statusText: A.statusText,
              config: e,
              request: b,
            });
          })
        );
      } catch (C) {
        throw (
          R && R(),
          C && C.name === "TypeError" && /Load failed|fetch/i.test(C.message)
            ? Object.assign(new k("Network Error", k.ERR_NETWORK, e, b), {
                cause: C.cause || C,
              })
            : k.from(C, C && C.code, e, b)
        );
      }
    }),
  Br = { http: Uf, xhr: pd, fetch: Rd };
y.forEach(Br, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const yo = (e) => `- ${e}`,
  vd = (e) => y.isFunction(e) || e === null || e === !1,
  dl = {
    getAdapter: (e) => {
      e = y.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const s = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((r = n),
          !vd(n) && ((r = Br[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new k(`Unknown adapter '${i}'`);
        if (r) break;
        s[i || "#" + o] = r;
      }
      if (!r) {
        const o = Object.entries(s).map(
          ([l, c]) =>
            `adapter ${l} ` +
            (c === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(yo).join(`
`)
            : " " + yo(o[0])
          : "as no adapter specified";
        throw new k(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT",
        );
      }
      return r;
    },
    adapters: Br,
  };
function Er(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Bt(null, e);
}
function bo(e) {
  return (
    Er(e),
    (e.headers = we.from(e.headers)),
    (e.data = _r.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    dl
      .getAdapter(e.adapter || gn.adapter)(e)
      .then(
        function (r) {
          return (
            Er(e),
            (r.data = _r.call(e, e.transformResponse, r)),
            (r.headers = we.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            il(r) ||
              (Er(e),
              r &&
                r.response &&
                ((r.response.data = _r.call(
                  e,
                  e.transformResponse,
                  r.response,
                )),
                (r.response.headers = we.from(r.response.headers)))),
            Promise.reject(r)
          );
        },
      )
  );
}
const hl = "1.11.0",
  nr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    nr[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const _o = {};
nr.transitional = function (t, n, r) {
  function s(o, i) {
    return (
      "[Axios v" +
      hl +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (o, i, l) => {
    if (t === !1)
      throw new k(
        s(i, " has been removed" + (n ? " in " + n : "")),
        k.ERR_DEPRECATED,
      );
    return (
      n &&
        !_o[i] &&
        ((_o[i] = !0),
        console.warn(
          s(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      t ? t(o, i, l) : !0
    );
  };
};
nr.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function xd(e, t, n) {
  if (typeof e != "object")
    throw new k("options must be an object", k.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s],
      i = t[o];
    if (i) {
      const l = e[o],
        c = l === void 0 || i(l, o, e);
      if (c !== !0)
        throw new k("option " + o + " must be " + c, k.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new k("Unknown option " + o, k.ERR_BAD_OPTION);
  }
}
const An = { assertOptions: xd, validators: nr },
  He = An.validators;
let Et = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new ao(), response: new ao() }));
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let s = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(s)
          : (s = new Error());
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? o &&
              !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + o)
            : (r.stack = o);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    (typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = wt(this.defaults, n)));
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    (r !== void 0 &&
      An.assertOptions(
        r,
        {
          silentJSONParsing: He.transitional(He.boolean),
          forcedJSONParsing: He.transitional(He.boolean),
          clarifyTimeoutError: He.transitional(He.boolean),
        },
        !1,
      ),
      s != null &&
        (y.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : An.assertOptions(
              s,
              { encode: He.function, serialize: He.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      An.assertOptions(
        n,
        {
          baseUrl: He.spelling("baseURL"),
          withXsrfToken: He.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let i = o && y.merge(o.common, o[n.method]);
    (o &&
      y.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (b) => {
          delete o[b];
        },
      ),
      (n.headers = we.concat(i, o)));
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function (R) {
      (typeof R.runWhen == "function" && R.runWhen(n) === !1) ||
        ((c = c && R.synchronous), l.unshift(R.fulfilled, R.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (R) {
      u.push(R.fulfilled, R.rejected);
    });
    let a,
      f = 0,
      p;
    if (!c) {
      const b = [bo.bind(this), void 0];
      for (
        b.unshift(...l), b.push(...u), p = b.length, a = Promise.resolve(n);
        f < p;

      )
        a = a.then(b[f++], b[f++]);
      return a;
    }
    p = l.length;
    let g = n;
    for (f = 0; f < p; ) {
      const b = l[f++],
        R = l[f++];
      try {
        g = b(g);
      } catch (v) {
        R.call(this, v);
        break;
      }
    }
    try {
      a = bo.call(this, g);
    } catch (b) {
      return Promise.reject(b);
    }
    for (f = 0, p = u.length; f < p; ) a = a.then(u[f++], u[f++]);
    return a;
  }
  getUri(t) {
    t = wt(this.defaults, t);
    const n = cl(t.baseURL, t.url, t.allowAbsoluteUrls);
    return rl(n, t.params, t.paramsSerializer);
  }
};
y.forEach(["delete", "get", "head", "options"], function (t) {
  Et.prototype[t] = function (n, r) {
    return this.request(
      wt(r || {}, { method: t, url: n, data: (r || {}).data }),
    );
  };
});
y.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, l) {
      return this.request(
        wt(l || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        }),
      );
    };
  }
  ((Et.prototype[t] = n()), (Et.prototype[t + "Form"] = n(!0)));
});
let Od = class pl {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    (this.promise.then((s) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](s);
      r._listeners = null;
    }),
      (this.promise.then = (s) => {
        let o;
        const i = new Promise((l) => {
          (r.subscribe(l), (o = l));
        }).then(s);
        return (
          (i.cancel = function () {
            r.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, l) {
        r.reason || ((r.reason = new Bt(o, i, l)), n(r.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new pl(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
};
function Ad(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Td(e) {
  return y.isObject(e) && e.isAxiosError === !0;
}
const $r = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries($r).forEach(([e, t]) => {
  $r[t] = e;
});
function ml(e) {
  const t = new Et(e),
    n = Ki(Et.prototype.request, t);
  return (
    y.extend(n, Et.prototype, t, { allOwnKeys: !0 }),
    y.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return ml(wt(e, s));
    }),
    n
  );
}
const se = ml(gn);
se.Axios = Et;
se.CanceledError = Bt;
se.CancelToken = Od;
se.isCancel = il;
se.VERSION = hl;
se.toFormData = er;
se.AxiosError = k;
se.Cancel = se.CanceledError;
se.all = function (t) {
  return Promise.all(t);
};
se.spread = Ad;
se.isAxiosError = Td;
se.mergeConfig = wt;
se.AxiosHeaders = we;
se.formToJSON = (e) => ol(y.isHTMLForm(e) ? new FormData(e) : e);
se.getAdapter = dl.getAdapter;
se.HttpStatusCode = $r;
se.default = se;
const {
    Axios: $d,
    AxiosError: Hd,
    CanceledError: kd,
    isCancel: qd,
    CancelToken: Vd,
    VERSION: Kd,
    all: Wd,
    Cancel: zd,
    isAxiosError: Jd,
    spread: Gd,
    toFormData: Xd,
    AxiosHeaders: Qd,
    HttpStatusCode: Yd,
    formToJSON: Zd,
    getAdapter: eh,
    mergeConfig: th,
  } = se,
  Cd = {
    BASE: "",
    VERSION: "1.0",
    WITH_CREDENTIALS: !1,
    CREDENTIALS: "include",
    TOKEN: void 0,
    USERNAME: void 0,
    PASSWORD: void 0,
    HEADERS: void 0,
    ENCODE_PATH: void 0,
  };
function Pd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var wr, Eo;
function Nd() {
  return (
    Eo ||
      ((Eo = 1),
      (wr = typeof self == "object" ? self.FormData : window.FormData)),
    wr
  );
}
var Fd = Nd();
const nh = Pd(Fd);
function Ld(e) {
  Cd.BASE = e;
}
function Md() {
  se.interceptors.response.use(
    (e) => {
      const t = e.data;
      return t && t.code === 200
        ? e
        : Promise.reject(new Error(t.message || "Error"));
    },
    (e) => {
      if (e.response) {
        const { status: t, data: n } = e.response;
        console.error(t, n?.message);
      }
      return Promise.reject(e);
    },
  );
}
Ld(window.__APP_CONFIG__?.API_BASE_URL || "http://localhost:8088");
Md();
Ba(Ka).use(Vi).mount("#app");
export {
  nh as F,
  Cd as O,
  ka as _,
  Ke as a,
  se as b,
  Dd as c,
  ei as d,
  Oi as e,
  Gl as f,
  pc as g,
  yc as h,
  si as i,
  Qe as j,
  Id as k,
  jd as l,
  hc as m,
  Wr as n,
  Si as o,
  vi as p,
  Rc as r,
  Al as t,
  Sn as w,
};
