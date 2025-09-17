import {
  b as Ag,
  F as Lg,
  O as hh,
  d as Je,
  c as Yt,
  o as Rt,
  e as Z,
  t as xt,
  f as Jt,
  g as _i,
  h as Y_,
  w as Bs,
  i as Ns,
  j as ch,
  k as vh,
  n as Ig,
  l as Pg,
  m as $_,
  p as kc,
  a as qr,
} from "./index-CGvoTjOH.js";
class Rc extends Error {
  url;
  status;
  statusText;
  body;
  request;
  constructor(t, r, n) {
    (super(n),
      (this.name = "ApiError"),
      (this.url = r.url),
      (this.status = r.status),
      (this.statusText = r.statusText),
      (this.body = r.body),
      (this.request = t));
  }
}
class X_ extends Error {
  constructor(t) {
    (super(t), (this.name = "CancelError"));
  }
  get isCancelled() {
    return !0;
  }
}
class q_ {
  #e;
  #r;
  #t;
  #n;
  #a;
  #o;
  #i;
  constructor(t) {
    ((this.#e = !1),
      (this.#r = !1),
      (this.#t = !1),
      (this.#n = []),
      (this.#a = new Promise((r, n) => {
        ((this.#o = r), (this.#i = n));
        const i = (s) => {
            this.#e ||
              this.#r ||
              this.#t ||
              ((this.#e = !0), this.#o && this.#o(s));
          },
          a = (s) => {
            this.#e ||
              this.#r ||
              this.#t ||
              ((this.#r = !0), this.#i && this.#i(s));
          },
          o = (s) => {
            this.#e || this.#r || this.#t || this.#n.push(s);
          };
        return (
          Object.defineProperty(o, "isResolved", { get: () => this.#e }),
          Object.defineProperty(o, "isRejected", { get: () => this.#r }),
          Object.defineProperty(o, "isCancelled", { get: () => this.#t }),
          t(i, a, o)
        );
      })));
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, r) {
    return this.#a.then(t, r);
  }
  catch(t) {
    return this.#a.catch(t);
  }
  finally(t) {
    return this.#a.finally(t);
  }
  cancel() {
    if (!(this.#e || this.#r || this.#t)) {
      if (((this.#t = !0), this.#n.length))
        try {
          for (const t of this.#n) t();
        } catch (t) {
          console.warn("Cancellation threw an error", t);
          return;
        }
      ((this.#n.length = 0), this.#i && this.#i(new X_("Request aborted")));
    }
  }
  get isCancelled() {
    return this.#t;
  }
}
const dh = (e) => e != null,
  Fs = (e) => typeof e == "string",
  ml = (e) => Fs(e) && e !== "",
  kg = (e) =>
    typeof e == "object" &&
    typeof e.type == "string" &&
    typeof e.stream == "function" &&
    typeof e.arrayBuffer == "function" &&
    typeof e.constructor == "function" &&
    typeof e.constructor.name == "string" &&
    /^(Blob|File)$/.test(e.constructor.name) &&
    /^(Blob|File)$/.test(e[Symbol.toStringTag]),
  Z_ = (e) => e instanceof Lg,
  K_ = (e) => e >= 200 && e < 300,
  j_ = (e) => {
    try {
      return btoa(e);
    } catch {
      return Buffer.from(e).toString("base64");
    }
  },
  Q_ = (e) => {
    const t = [],
      r = (i, a) => {
        t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(a))}`);
      },
      n = (i, a) => {
        dh(a) &&
          (Array.isArray(a)
            ? a.forEach((o) => {
                n(i, o);
              })
            : typeof a == "object"
              ? Object.entries(a).forEach(([o, s]) => {
                  n(`${i}[${o}]`, s);
                })
              : r(i, a));
      };
    return (
      Object.entries(e).forEach(([i, a]) => {
        n(i, a);
      }),
      t.length > 0 ? `?${t.join("&")}` : ""
    );
  },
  J_ = (e, t) => {
    const r = encodeURI,
      n = t.url
        .replace("{api-version}", e.VERSION)
        .replace(/{(.*?)}/g, (a, o) =>
          t.path?.hasOwnProperty(o) ? r(String(t.path[o])) : a,
        ),
      i = `${e.BASE}${n}`;
    return t.query ? `${i}${Q_(t.query)}` : i;
  },
  t1 = (e) => {
    if (e.formData) {
      const t = new Lg(),
        r = (n, i) => {
          Fs(i) || kg(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
        };
      return (
        Object.entries(e.formData)
          .filter(([n, i]) => dh(i))
          .forEach(([n, i]) => {
            Array.isArray(i) ? i.forEach((a) => r(n, a)) : r(n, i);
          }),
        t
      );
    }
  },
  Va = async (e, t) => t,
  e1 = async (e, t, r) => {
    const [n, i, a, o] = await Promise.all([
        Va(t, e.TOKEN),
        Va(t, e.USERNAME),
        Va(t, e.PASSWORD),
        Va(t, e.HEADERS),
      ]),
      s = (typeof r?.getHeaders == "function" && r?.getHeaders()) || {},
      l = Object.entries({
        Accept: "application/json",
        ...o,
        ...t.headers,
        ...s,
      })
        .filter(([u, f]) => dh(f))
        .reduce((u, [f, h]) => ({ ...u, [f]: String(h) }), {});
    if ((ml(n) && (l.Authorization = `Bearer ${n}`), ml(i) && ml(a))) {
      const u = j_(`${i}:${a}`);
      l.Authorization = `Basic ${u}`;
    }
    return (
      t.body !== void 0 &&
        (t.mediaType
          ? (l["Content-Type"] = t.mediaType)
          : kg(t.body)
            ? (l["Content-Type"] = t.body.type || "application/octet-stream")
            : Fs(t.body)
              ? (l["Content-Type"] = "text/plain")
              : Z_(t.body) || (l["Content-Type"] = "application/json")),
      l
    );
  },
  r1 = (e) => {
    if (e.body) return e.body;
  },
  n1 = async (e, t, r, n, i, a, o, s) => {
    const l = Ag.CancelToken.source(),
      u = {
        url: r,
        headers: a,
        data: n ?? i,
        method: t.method,
        withCredentials: e.WITH_CREDENTIALS,
        withXSRFToken: e.WITH_CREDENTIALS,
        cancelToken: l.token,
      };
    o(() => l.cancel("The user aborted a request."));
    try {
      return await s.request(u);
    } catch (f) {
      const h = f;
      if (h.response) return h.response;
      throw f;
    }
  },
  i1 = (e, t) => {
    if (t) {
      const r = e.headers[t];
      if (Fs(r)) return r;
    }
  },
  a1 = (e) => {
    if (e.status !== 204) return e.data;
  },
  o1 = (e, t) => {
    const n = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      500: "Internal Server Error",
      502: "Bad Gateway",
      503: "Service Unavailable",
      ...e.errors,
    }[t.status];
    if (n) throw new Rc(e, t, n);
    if (!t.ok) {
      const i = t.status ?? "unknown",
        a = t.statusText ?? "unknown",
        o = (() => {
          try {
            return JSON.stringify(t.body, null, 2);
          } catch {
            return;
          }
        })();
      throw new Rc(
        e,
        t,
        `Generic Error: status: ${i}; status text: ${a}; body: ${o}`,
      );
    }
  },
  ph = (e, t, r = Ag) =>
    new q_(async (n, i, a) => {
      try {
        const o = J_(e, t),
          s = t1(t),
          l = r1(t),
          u = await e1(e, t, s);
        if (!a.isCancelled) {
          const f = await n1(e, t, o, l, s, u, a, r),
            h = a1(f),
            v = i1(f, t.responseHeader),
            c = {
              url: o,
              ok: K_(f.status),
              status: f.status,
              statusText: f.statusText,
              body: v ?? h,
            };
          (o1(t, c), n(c.body));
        }
      } catch (o) {
        i(o);
      }
    });
class s1 {
  static getApiMetrics() {
    return ph(hh, {
      method: "GET",
      url: "/api/metrics",
      errors: { 500: "获取指标失败" },
    });
  }
}
class l1 {
  static getApiRules() {
    return ph(hh, {
      method: "GET",
      url: "/api/rules",
      errors: { 500: "获取规则信息失败" },
    });
  }
}
class u1 {
  static getApiUpstreams() {
    return ph(hh, {
      method: "GET",
      url: "/api/upstreams",
      errors: { 500: "获取上游池信息失败" },
    });
  }
}
const f1 = { class: "metrics-card" },
  h1 = { class: "title" },
  c1 = { class: "value" },
  v1 = { class: "sub" },
  d1 = Je({
    __name: "MetricsCard",
    props: { info: {} },
    setup(e) {
      return (t, r) => (
        Rt(),
        Yt("div", f1, [
          Z("div", h1, xt(t.info.title), 1),
          Z("div", c1, xt(t.info.value), 1),
          Z("div", v1, xt(t.info.sub), 1),
        ])
      );
    },
  }),
  p1 = { delay: ["<0.1", "0.1-0.2", "0.2-0.5", "0.5-1", "1-5", ">5"] },
  g1 = { delay: [0.1, 0.2, 0.5, 1, 5] },
  Ec = ["黑名单", "TLD", "关键词"],
  m1 = { BLOCKED: "403" },
  Rg = {
    light: {
      barFrom: "#3b82f6",
      barTo: "#06b6d4",
      label: "#334155",
      axis: "#cbd5e1",
      tick: !1,
      grid: "#e2e8f0",
      tooltipBg: "rgba(15,23,42,0.9)",
      tooltipText: "#e5e7eb",
      shadow: "rgba(0,0,0,0.12)",
      shadowEmph: "rgba(0,0,0,0.22)",
    },
    dark: {
      barFrom: "#f59e0b",
      barTo: "#10b981",
      label: "#e5e7eb",
      axis: "#64748b",
      tick: !1,
      grid: "rgba(148,163,184,0.25)",
      tooltipBg: "rgba(30,41,59,0.95)",
      tooltipText: "#f8fafc",
      shadow: "rgba(0,0,0,0.35)",
      shadowEmph: "rgba(0,0,0,0.5)",
    },
  };
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Vu =
  function (e, t) {
    return (
      (Vu =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (r, n) {
            r.__proto__ = n;
          }) ||
        function (r, n) {
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
        }),
      Vu(e, t)
    );
  };
function G(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Class extends value " + String(t) + " is not a constructor or null",
    );
  Vu(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((r.prototype = t.prototype), new r());
}
var gh = 12,
  y1 = "sans-serif",
  Nr = gh + "px " + y1,
  _1 = 20,
  b1 = 100,
  S1 =
    "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function w1(e) {
  var t = {};
  if (typeof JSON > "u") return t;
  for (var r = 0; r < e.length; r++) {
    var n = String.fromCharCode(r + 32),
      i = (e.charCodeAt(r) - _1) / b1;
    t[n] = i;
  }
  return t;
}
var x1 = w1(S1),
  vr = {
    createCanvas: function () {
      return typeof document < "u" && document.createElement("canvas");
    },
    measureText: (function () {
      var e, t;
      return function (r, n) {
        if (!e) {
          var i = vr.createCanvas();
          e = i && i.getContext("2d");
        }
        if (e) return (t !== n && (t = e.font = n || Nr), e.measureText(r));
        ((r = r || ""), (n = n || Nr));
        var a = /((?:\d+)?\.?\d*)px/.exec(n),
          o = (a && +a[1]) || gh,
          s = 0;
        if (n.indexOf("mono") >= 0) s = o * r.length;
        else
          for (var l = 0; l < r.length; l++) {
            var u = x1[r[l]];
            s += u == null ? o : u * o;
          }
        return { width: s };
      };
    })(),
    loadImage: function (e, t, r) {
      var n = new Image();
      return ((n.onload = t), (n.onerror = r), (n.src = e), n);
    },
  },
  Eg = Fr(
    [
      "Function",
      "RegExp",
      "Date",
      "Error",
      "CanvasGradient",
      "CanvasPattern",
      "Image",
      "Canvas",
    ],
    function (e, t) {
      return ((e["[object " + t + "]"] = !0), e);
    },
    {},
  ),
  Og = Fr(
    [
      "Int8",
      "Uint8",
      "Uint8Clamped",
      "Int16",
      "Uint16",
      "Int32",
      "Uint32",
      "Float32",
      "Float64",
    ],
    function (e, t) {
      return ((e["[object " + t + "Array]"] = !0), e);
    },
    {},
  ),
  Pa = Object.prototype.toString,
  zs = Array.prototype,
  T1 = zs.forEach,
  C1 = zs.filter,
  mh = zs.slice,
  D1 = zs.map,
  Oc = function () {}.constructor,
  Wa = Oc ? Oc.prototype : null,
  yh = "__proto__",
  M1 = 2311;
function Bg() {
  return M1++;
}
function _h() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, e);
}
function at(e) {
  if (e == null || typeof e != "object") return e;
  var t = e,
    r = Pa.call(e);
  if (r === "[object Array]") {
    if (!Ji(e)) {
      t = [];
      for (var n = 0, i = e.length; n < i; n++) t[n] = at(e[n]);
    }
  } else if (Og[r]) {
    if (!Ji(e)) {
      var a = e.constructor;
      if (a.from) t = a.from(e);
      else {
        t = new a(e.length);
        for (var n = 0, i = e.length; n < i; n++) t[n] = e[n];
      }
    }
  } else if (!Eg[r] && !Ji(e) && !va(e)) {
    t = {};
    for (var o in e) e.hasOwnProperty(o) && o !== yh && (t[o] = at(e[o]));
  }
  return t;
}
function ut(e, t, r) {
  if (!X(t) || !X(e)) return r ? at(t) : e;
  for (var n in t)
    if (t.hasOwnProperty(n) && n !== yh) {
      var i = e[n],
        a = t[n];
      X(a) &&
      X(i) &&
      !W(a) &&
      !W(i) &&
      !va(a) &&
      !va(i) &&
      !Bc(a) &&
      !Bc(i) &&
      !Ji(a) &&
      !Ji(i)
        ? ut(i, a, r)
        : (r || !(n in e)) && (e[n] = at(t[n]));
    }
  return e;
}
function B(e, t) {
  if (Object.assign) Object.assign(e, t);
  else for (var r in t) t.hasOwnProperty(r) && r !== yh && (e[r] = t[r]);
  return e;
}
function dt(e, t, r) {
  for (var n = yt(t), i = 0, a = n.length; i < a; i++) {
    var o = n[i];
    e[o] == null && (e[o] = t[o]);
  }
  return e;
}
function st(e, t) {
  if (e) {
    if (e.indexOf) return e.indexOf(t);
    for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
  }
  return -1;
}
function A1(e, t) {
  var r = e.prototype;
  function n() {}
  ((n.prototype = t.prototype), (e.prototype = new n()));
  for (var i in r) r.hasOwnProperty(i) && (e.prototype[i] = r[i]);
  ((e.prototype.constructor = e), (e.superClass = t));
}
function tr(e, t, r) {
  if (
    ((e = "prototype" in e ? e.prototype : e),
    (t = "prototype" in t ? t.prototype : t),
    Object.getOwnPropertyNames)
  )
    for (var n = Object.getOwnPropertyNames(t), i = 0; i < n.length; i++) {
      var a = n[i];
      a !== "constructor" && e[a] == null && (e[a] = t[a]);
    }
  else dt(e, t);
}
function ae(e) {
  return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function M(e, t, r) {
  if (e && t)
    if (e.forEach && e.forEach === T1) e.forEach(t, r);
    else if (e.length === +e.length)
      for (var n = 0, i = e.length; n < i; n++) t.call(r, e[n], n, e);
    else for (var a in e) e.hasOwnProperty(a) && t.call(r, e[a], a, e);
}
function q(e, t, r) {
  if (!e) return [];
  if (!t) return bh(e);
  if (e.map && e.map === D1) return e.map(t, r);
  for (var n = [], i = 0, a = e.length; i < a; i++)
    n.push(t.call(r, e[i], i, e));
  return n;
}
function Fr(e, t, r, n) {
  if (e && t) {
    for (var i = 0, a = e.length; i < a; i++) r = t.call(n, r, e[i], i, e);
    return r;
  }
}
function kt(e, t, r) {
  if (!e) return [];
  if (!t) return bh(e);
  if (e.filter && e.filter === C1) return e.filter(t, r);
  for (var n = [], i = 0, a = e.length; i < a; i++)
    t.call(r, e[i], i, e) && n.push(e[i]);
  return n;
}
function L1(e, t, r) {
  if (e && t) {
    for (var n = 0, i = e.length; n < i; n++)
      if (t.call(r, e[n], n, e)) return e[n];
  }
}
function yt(e) {
  if (!e) return [];
  if (Object.keys) return Object.keys(e);
  var t = [];
  for (var r in e) e.hasOwnProperty(r) && t.push(r);
  return t;
}
function I1(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
  return function () {
    return e.apply(t, r.concat(mh.call(arguments)));
  };
}
var ct = Wa && Q(Wa.bind) ? Wa.call.bind(Wa.bind) : I1;
function Mt(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  return function () {
    return e.apply(this, t.concat(mh.call(arguments)));
  };
}
function W(e) {
  return Array.isArray ? Array.isArray(e) : Pa.call(e) === "[object Array]";
}
function Q(e) {
  return typeof e == "function";
}
function U(e) {
  return typeof e == "string";
}
function Wu(e) {
  return Pa.call(e) === "[object String]";
}
function vt(e) {
  return typeof e == "number";
}
function X(e) {
  var t = typeof e;
  return t === "function" || (!!e && t === "object");
}
function Bc(e) {
  return !!Eg[Pa.call(e)];
}
function oe(e) {
  return !!Og[Pa.call(e)];
}
function va(e) {
  return (
    typeof e == "object" &&
    typeof e.nodeType == "number" &&
    typeof e.ownerDocument == "object"
  );
}
function Gs(e) {
  return e.colorStops != null;
}
function P1(e) {
  return e.image != null;
}
function da(e) {
  return e !== e;
}
function jo() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  for (var r = 0, n = e.length; r < n; r++) if (e[r] != null) return e[r];
}
function K(e, t) {
  return e ?? t;
}
function Cn(e, t, r) {
  return e ?? t ?? r;
}
function bh(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  return mh.apply(e, t);
}
function Sh(e) {
  if (typeof e == "number") return [e, e, e, e];
  var t = e.length;
  return t === 2
    ? [e[0], e[1], e[0], e[1]]
    : t === 3
      ? [e[0], e[1], e[2], e[1]]
      : e;
}
function dr(e, t) {
  if (!e) throw new Error(t);
}
function Ye(e) {
  return e == null
    ? null
    : typeof e.trim == "function"
      ? e.trim()
      : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Ng = "__ec_primitive__";
function Uu(e) {
  e[Ng] = !0;
}
function Ji(e) {
  return e[Ng];
}
var k1 = (function () {
    function e() {
      this.data = {};
    }
    return (
      (e.prototype.delete = function (t) {
        var r = this.has(t);
        return (r && delete this.data[t], r);
      }),
      (e.prototype.has = function (t) {
        return this.data.hasOwnProperty(t);
      }),
      (e.prototype.get = function (t) {
        return this.data[t];
      }),
      (e.prototype.set = function (t, r) {
        return ((this.data[t] = r), this);
      }),
      (e.prototype.keys = function () {
        return yt(this.data);
      }),
      (e.prototype.forEach = function (t) {
        var r = this.data;
        for (var n in r) r.hasOwnProperty(n) && t(r[n], n);
      }),
      e
    );
  })(),
  Fg = typeof Map == "function";
function R1() {
  return Fg ? new Map() : new k1();
}
var E1 = (function () {
  function e(t) {
    var r = W(t);
    this.data = R1();
    var n = this;
    t instanceof e ? t.each(i) : t && M(t, i);
    function i(a, o) {
      r ? n.set(a, o) : n.set(o, a);
    }
  }
  return (
    (e.prototype.hasKey = function (t) {
      return this.data.has(t);
    }),
    (e.prototype.get = function (t) {
      return this.data.get(t);
    }),
    (e.prototype.set = function (t, r) {
      return (this.data.set(t, r), r);
    }),
    (e.prototype.each = function (t, r) {
      this.data.forEach(function (n, i) {
        t.call(r, n, i);
      });
    }),
    (e.prototype.keys = function () {
      var t = this.data.keys();
      return Fg ? Array.from(t) : t;
    }),
    (e.prototype.removeKey = function (t) {
      this.data.delete(t);
    }),
    e
  );
})();
function rt(e) {
  return new E1(e);
}
function O1(e, t) {
  for (var r = new e.constructor(e.length + t.length), n = 0; n < e.length; n++)
    r[n] = e[n];
  for (var i = e.length, n = 0; n < t.length; n++) r[n + i] = t[n];
  return r;
}
function Hs(e, t) {
  var r;
  if (Object.create) r = Object.create(e);
  else {
    var n = function () {};
    ((n.prototype = e), (r = new n()));
  }
  return (t && B(r, t), r);
}
function zg(e) {
  var t = e.style;
  ((t.webkitUserSelect = "none"),
    (t.userSelect = "none"),
    (t.webkitTapHighlightColor = "rgba(0,0,0,0)"),
    (t["-webkit-touch-callout"] = "none"));
}
function Ie(e, t) {
  return e.hasOwnProperty(t);
}
function ie() {}
var B1 = 180 / Math.PI,
  N1 = (function () {
    function e() {
      ((this.firefox = !1),
        (this.ie = !1),
        (this.edge = !1),
        (this.newEdge = !1),
        (this.weChat = !1));
    }
    return e;
  })(),
  F1 = (function () {
    function e() {
      ((this.browser = new N1()),
        (this.node = !1),
        (this.wxa = !1),
        (this.worker = !1),
        (this.svgSupported = !1),
        (this.touchEventsSupported = !1),
        (this.pointerEventsSupported = !1),
        (this.domSupported = !1),
        (this.transformSupported = !1),
        (this.transform3dSupported = !1),
        (this.hasGlobalWindow = typeof window < "u"));
    }
    return e;
  })(),
  tt = new F1();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function"
  ? ((tt.wxa = !0), (tt.touchEventsSupported = !0))
  : typeof document > "u" && typeof self < "u"
    ? (tt.worker = !0)
    : !tt.hasGlobalWindow ||
        "Deno" in window ||
        (typeof navigator < "u" &&
          typeof navigator.userAgent == "string" &&
          navigator.userAgent.indexOf("Node.js") > -1)
      ? ((tt.node = !0), (tt.svgSupported = !0))
      : z1(navigator.userAgent, tt);
function z1(e, t) {
  var r = t.browser,
    n = e.match(/Firefox\/([\d.]+)/),
    i = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/),
    a = e.match(/Edge?\/([\d.]+)/),
    o = /micromessenger/i.test(e);
  (n && ((r.firefox = !0), (r.version = n[1])),
    i && ((r.ie = !0), (r.version = i[1])),
    a &&
      ((r.edge = !0),
      (r.version = a[1]),
      (r.newEdge = +a[1].split(".")[0] > 18)),
    o && (r.weChat = !0),
    (t.svgSupported = typeof SVGRect < "u"),
    (t.touchEventsSupported = "ontouchstart" in window && !r.ie && !r.edge),
    (t.pointerEventsSupported =
      "onpointerdown" in window && (r.edge || (r.ie && +r.version >= 11))));
  var s = (t.domSupported = typeof document < "u");
  if (s) {
    var l = document.documentElement.style;
    ((t.transform3dSupported =
      ((r.ie && "transition" in l) ||
        r.edge ||
        ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix()) ||
        "MozPerspective" in l) &&
      !("OTransition" in l)),
      (t.transformSupported =
        t.transform3dSupported || (r.ie && +r.version >= 9)));
  }
}
var G1 = ".",
  Zr = "___EC__COMPONENT__CONTAINER___",
  Gg = "___EC__EXTENDED_CLASS___";
function $e(e) {
  var t = { main: "", sub: "" };
  if (e) {
    var r = e.split(G1);
    ((t.main = r[0] || ""), (t.sub = r[1] || ""));
  }
  return t;
}
function H1(e) {
  dr(
    /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e),
    'componentType "' + e + '" illegal',
  );
}
function V1(e) {
  return !!(e && e[Gg]);
}
function wh(e, t) {
  ((e.$constructor = e),
    (e.extend = function (r) {
      var n = this,
        i;
      return (
        W1(n)
          ? (i = (function (a) {
              G(o, a);
              function o() {
                return a.apply(this, arguments) || this;
              }
              return o;
            })(n))
          : ((i = function () {
              (r.$constructor || n).apply(this, arguments);
            }),
            A1(i, this)),
        B(i.prototype, r),
        (i[Gg] = !0),
        (i.extend = this.extend),
        (i.superCall = $1),
        (i.superApply = X1),
        (i.superClass = n),
        i
      );
    }));
}
function W1(e) {
  return Q(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function Hg(e, t) {
  e.extend = t.extend;
}
var U1 = Math.round(Math.random() * 10);
function Y1(e) {
  var t = ["__\0is_clz", U1++].join("_");
  ((e.prototype[t] = !0),
    (e.isInstance = function (r) {
      return !!(r && r[t]);
    }));
}
function $1(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
  return this.superClass.prototype[t].apply(e, r);
}
function X1(e, t, r) {
  return this.superClass.prototype[t].apply(e, r);
}
function Vs(e) {
  var t = {};
  ((e.registerClass = function (n) {
    var i = n.type || n.prototype.type;
    if (i) {
      (H1(i), (n.prototype.type = i));
      var a = $e(i);
      if (!a.sub) t[a.main] = n;
      else if (a.sub !== Zr) {
        var o = r(a);
        o[a.sub] = n;
      }
    }
    return n;
  }),
    (e.getClass = function (n, i, a) {
      var o = t[n];
      if ((o && o[Zr] && (o = i ? o[i] : null), a && !o))
        throw new Error(
          i
            ? "Component " + n + "." + (i || "") + " is used but not imported."
            : n + ".type should be specified.",
        );
      return o;
    }),
    (e.getClassesByMainType = function (n) {
      var i = $e(n),
        a = [],
        o = t[i.main];
      return (
        o && o[Zr]
          ? M(o, function (s, l) {
              l !== Zr && a.push(s);
            })
          : a.push(o),
        a
      );
    }),
    (e.hasClass = function (n) {
      var i = $e(n);
      return !!t[i.main];
    }),
    (e.getAllClassMainTypes = function () {
      var n = [];
      return (
        M(t, function (i, a) {
          n.push(a);
        }),
        n
      );
    }),
    (e.hasSubTypes = function (n) {
      var i = $e(n),
        a = t[i.main];
      return a && a[Zr];
    }));
  function r(n) {
    var i = t[n.main];
    return ((!i || !i[Zr]) && ((i = t[n.main] = {}), (i[Zr] = !0)), i);
  }
}
function pa(e, t) {
  for (var r = 0; r < e.length; r++) e[r][1] || (e[r][1] = e[r][0]);
  return (
    (t = t || !1),
    function (n, i, a) {
      for (var o = {}, s = 0; s < e.length; s++) {
        var l = e[s][1];
        if (!((i && st(i, l) >= 0) || (a && st(a, l) < 0))) {
          var u = n.getShallow(l, t);
          u != null && (o[e[s][0]] = u);
        }
      }
      return o;
    }
  );
}
var q1 = [
    ["fill", "color"],
    ["shadowBlur"],
    ["shadowOffsetX"],
    ["shadowOffsetY"],
    ["opacity"],
    ["shadowColor"],
  ],
  Z1 = pa(q1),
  K1 = (function () {
    function e() {}
    return (
      (e.prototype.getAreaStyle = function (t, r) {
        return Z1(this, t, r);
      }),
      e
    );
  })(),
  Vg = (function () {
    function e(t) {
      this.value = t;
    }
    return e;
  })(),
  j1 = (function () {
    function e() {
      this._len = 0;
    }
    return (
      (e.prototype.insert = function (t) {
        var r = new Vg(t);
        return (this.insertEntry(r), r);
      }),
      (e.prototype.insertEntry = function (t) {
        (this.head
          ? ((this.tail.next = t),
            (t.prev = this.tail),
            (t.next = null),
            (this.tail = t))
          : (this.head = this.tail = t),
          this._len++);
      }),
      (e.prototype.remove = function (t) {
        var r = t.prev,
          n = t.next;
        (r ? (r.next = n) : (this.head = n),
          n ? (n.prev = r) : (this.tail = r),
          (t.next = t.prev = null),
          this._len--);
      }),
      (e.prototype.len = function () {
        return this._len;
      }),
      (e.prototype.clear = function () {
        ((this.head = this.tail = null), (this._len = 0));
      }),
      e
    );
  })(),
  hi = (function () {
    function e(t) {
      ((this._list = new j1()),
        (this._maxSize = 10),
        (this._map = {}),
        (this._maxSize = t));
    }
    return (
      (e.prototype.put = function (t, r) {
        var n = this._list,
          i = this._map,
          a = null;
        if (i[t] == null) {
          var o = n.len(),
            s = this._lastRemovedEntry;
          if (o >= this._maxSize && o > 0) {
            var l = n.head;
            (n.remove(l),
              delete i[l.key],
              (a = l.value),
              (this._lastRemovedEntry = l));
          }
          (s ? (s.value = r) : (s = new Vg(r)),
            (s.key = t),
            n.insertEntry(s),
            (i[t] = s));
        }
        return a;
      }),
      (e.prototype.get = function (t) {
        var r = this._map[t],
          n = this._list;
        if (r != null)
          return (r !== n.tail && (n.remove(r), n.insertEntry(r)), r.value);
      }),
      (e.prototype.clear = function () {
        (this._list.clear(), (this._map = {}));
      }),
      (e.prototype.len = function () {
        return this._list.len();
      }),
      e
    );
  })(),
  Yu = new hi(50);
function Q1(e) {
  if (typeof e == "string") {
    var t = Yu.get(e);
    return t && t.image;
  } else return e;
}
function Wg(e, t, r, n, i) {
  if (e)
    if (typeof e == "string") {
      if ((t && t.__zrImageSrc === e) || !r) return t;
      var a = Yu.get(e),
        o = { hostEl: r, cb: n, cbPayload: i };
      return (
        a
          ? ((t = a.image), !Ws(t) && a.pending.push(o))
          : ((t = vr.loadImage(e, Nc, Nc)),
            (t.__zrImageSrc = e),
            Yu.put(e, (t.__cachedImgObj = { image: t, pending: [o] }))),
        t
      );
    } else return e;
  else return t;
}
function Nc() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var r = e.pending[t],
      n = r.cb;
    (n && n(this, r.cbPayload), r.hostEl.dirty());
  }
  e.pending.length = 0;
}
function Ws(e) {
  return e && e.width && e.height;
}
function cr() {
  return [1, 0, 0, 1, 0, 0];
}
function xh(e) {
  return (
    (e[0] = 1),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 1),
    (e[4] = 0),
    (e[5] = 0),
    e
  );
}
function Ug(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[3]),
    (e[4] = t[4]),
    (e[5] = t[5]),
    e
  );
}
function ta(e, t, r) {
  var n = t[0] * r[0] + t[2] * r[1],
    i = t[1] * r[0] + t[3] * r[1],
    a = t[0] * r[2] + t[2] * r[3],
    o = t[1] * r[2] + t[3] * r[3],
    s = t[0] * r[4] + t[2] * r[5] + t[4],
    l = t[1] * r[4] + t[3] * r[5] + t[5];
  return (
    (e[0] = n),
    (e[1] = i),
    (e[2] = a),
    (e[3] = o),
    (e[4] = s),
    (e[5] = l),
    e
  );
}
function $u(e, t, r) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[3]),
    (e[4] = t[4] + r[0]),
    (e[5] = t[5] + r[1]),
    e
  );
}
function Th(e, t, r, n) {
  n === void 0 && (n = [0, 0]);
  var i = t[0],
    a = t[2],
    o = t[4],
    s = t[1],
    l = t[3],
    u = t[5],
    f = Math.sin(r),
    h = Math.cos(r);
  return (
    (e[0] = i * h + s * f),
    (e[1] = -i * f + s * h),
    (e[2] = a * h + l * f),
    (e[3] = -a * f + h * l),
    (e[4] = h * (o - n[0]) + f * (u - n[1]) + n[0]),
    (e[5] = h * (u - n[1]) - f * (o - n[0]) + n[1]),
    e
  );
}
function J1(e, t, r) {
  var n = r[0],
    i = r[1];
  return (
    (e[0] = t[0] * n),
    (e[1] = t[1] * i),
    (e[2] = t[2] * n),
    (e[3] = t[3] * i),
    (e[4] = t[4] * n),
    (e[5] = t[5] * i),
    e
  );
}
function ka(e, t) {
  var r = t[0],
    n = t[2],
    i = t[4],
    a = t[1],
    o = t[3],
    s = t[5],
    l = r * o - a * n;
  return l
    ? ((l = 1 / l),
      (e[0] = o * l),
      (e[1] = -a * l),
      (e[2] = -n * l),
      (e[3] = r * l),
      (e[4] = (n * s - o * i) * l),
      (e[5] = (a * i - r * s) * l),
      e)
    : null;
}
var J = (function () {
    function e(t, r) {
      ((this.x = t || 0), (this.y = r || 0));
    }
    return (
      (e.prototype.copy = function (t) {
        return ((this.x = t.x), (this.y = t.y), this);
      }),
      (e.prototype.clone = function () {
        return new e(this.x, this.y);
      }),
      (e.prototype.set = function (t, r) {
        return ((this.x = t), (this.y = r), this);
      }),
      (e.prototype.equal = function (t) {
        return t.x === this.x && t.y === this.y;
      }),
      (e.prototype.add = function (t) {
        return ((this.x += t.x), (this.y += t.y), this);
      }),
      (e.prototype.scale = function (t) {
        ((this.x *= t), (this.y *= t));
      }),
      (e.prototype.scaleAndAdd = function (t, r) {
        ((this.x += t.x * r), (this.y += t.y * r));
      }),
      (e.prototype.sub = function (t) {
        return ((this.x -= t.x), (this.y -= t.y), this);
      }),
      (e.prototype.dot = function (t) {
        return this.x * t.x + this.y * t.y;
      }),
      (e.prototype.len = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }),
      (e.prototype.lenSquare = function () {
        return this.x * this.x + this.y * this.y;
      }),
      (e.prototype.normalize = function () {
        var t = this.len();
        return ((this.x /= t), (this.y /= t), this);
      }),
      (e.prototype.distance = function (t) {
        var r = this.x - t.x,
          n = this.y - t.y;
        return Math.sqrt(r * r + n * n);
      }),
      (e.prototype.distanceSquare = function (t) {
        var r = this.x - t.x,
          n = this.y - t.y;
        return r * r + n * n;
      }),
      (e.prototype.negate = function () {
        return ((this.x = -this.x), (this.y = -this.y), this);
      }),
      (e.prototype.transform = function (t) {
        if (t) {
          var r = this.x,
            n = this.y;
          return (
            (this.x = t[0] * r + t[2] * n + t[4]),
            (this.y = t[1] * r + t[3] * n + t[5]),
            this
          );
        }
      }),
      (e.prototype.toArray = function (t) {
        return ((t[0] = this.x), (t[1] = this.y), t);
      }),
      (e.prototype.fromArray = function (t) {
        ((this.x = t[0]), (this.y = t[1]));
      }),
      (e.set = function (t, r, n) {
        ((t.x = r), (t.y = n));
      }),
      (e.copy = function (t, r) {
        ((t.x = r.x), (t.y = r.y));
      }),
      (e.len = function (t) {
        return Math.sqrt(t.x * t.x + t.y * t.y);
      }),
      (e.lenSquare = function (t) {
        return t.x * t.x + t.y * t.y;
      }),
      (e.dot = function (t, r) {
        return t.x * r.x + t.y * r.y;
      }),
      (e.add = function (t, r, n) {
        ((t.x = r.x + n.x), (t.y = r.y + n.y));
      }),
      (e.sub = function (t, r, n) {
        ((t.x = r.x - n.x), (t.y = r.y - n.y));
      }),
      (e.scale = function (t, r, n) {
        ((t.x = r.x * n), (t.y = r.y * n));
      }),
      (e.scaleAndAdd = function (t, r, n, i) {
        ((t.x = r.x + n.x * i), (t.y = r.y + n.y * i));
      }),
      (e.lerp = function (t, r, n, i) {
        var a = 1 - i;
        ((t.x = a * r.x + i * n.x), (t.y = a * r.y + i * n.y));
      }),
      e
    );
  })(),
  Sn = Math.min,
  ri = Math.max,
  Xu = Math.abs,
  Fc = ["x", "y"],
  tb = ["width", "height"],
  Kr = new J(),
  jr = new J(),
  Qr = new J(),
  Jr = new J(),
  se = Yg(),
  Ui = se.minTv,
  qu = se.maxTv,
  ea = [0, 0],
  et = (function () {
    function e(t, r, n, i) {
      e.set(this, t, r, n, i);
    }
    return (
      (e.set = function (t, r, n, i, a) {
        return (
          i < 0 && ((r = r + i), (i = -i)),
          a < 0 && ((n = n + a), (a = -a)),
          (t.x = r),
          (t.y = n),
          (t.width = i),
          (t.height = a),
          t
        );
      }),
      (e.prototype.union = function (t) {
        var r = Sn(t.x, this.x),
          n = Sn(t.y, this.y);
        (isFinite(this.x) && isFinite(this.width)
          ? (this.width = ri(t.x + t.width, this.x + this.width) - r)
          : (this.width = t.width),
          isFinite(this.y) && isFinite(this.height)
            ? (this.height = ri(t.y + t.height, this.y + this.height) - n)
            : (this.height = t.height),
          (this.x = r),
          (this.y = n));
      }),
      (e.prototype.applyTransform = function (t) {
        e.applyTransform(this, this, t);
      }),
      (e.prototype.calculateTransform = function (t) {
        var r = this,
          n = t.width / r.width,
          i = t.height / r.height,
          a = cr();
        return (
          $u(a, a, [-r.x, -r.y]),
          J1(a, a, [n, i]),
          $u(a, a, [t.x, t.y]),
          a
        );
      }),
      (e.prototype.intersect = function (t, r, n) {
        return e.intersect(this, t, r, n);
      }),
      (e.intersect = function (t, r, n, i) {
        n && J.set(n, 0, 0);
        var a = (i && i.outIntersectRect) || null,
          o = i && i.clamp;
        if ((a && (a.x = a.y = a.width = a.height = NaN), !t || !r)) return !1;
        (t instanceof e || (t = e.set(eb, t.x, t.y, t.width, t.height)),
          r instanceof e || (r = e.set(rb, r.x, r.y, r.width, r.height)));
        var s = !!n;
        se.reset(i, s);
        var l = se.touchThreshold,
          u = t.x + l,
          f = t.x + t.width - l,
          h = t.y + l,
          v = t.y + t.height - l,
          c = r.x + l,
          d = r.x + r.width - l,
          p = r.y + l,
          m = r.y + r.height - l;
        if (u > f || h > v || c > d || p > m) return !1;
        var g = !(f < c || d < u || v < p || m < h);
        return (
          (s || a) &&
            ((ea[0] = 1 / 0),
            (ea[1] = 0),
            zc(u, f, c, d, 0, s, a, o),
            zc(h, v, p, m, 1, s, a, o),
            s && J.copy(n, g ? (se.useDir ? se.dirMinTv : Ui) : qu)),
          g
        );
      }),
      (e.contain = function (t, r, n) {
        return (
          r >= t.x && r <= t.x + t.width && n >= t.y && n <= t.y + t.height
        );
      }),
      (e.prototype.contain = function (t, r) {
        return e.contain(this, t, r);
      }),
      (e.prototype.clone = function () {
        return new e(this.x, this.y, this.width, this.height);
      }),
      (e.prototype.copy = function (t) {
        e.copy(this, t);
      }),
      (e.prototype.plain = function () {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
      }),
      (e.prototype.isFinite = function () {
        return (
          isFinite(this.x) &&
          isFinite(this.y) &&
          isFinite(this.width) &&
          isFinite(this.height)
        );
      }),
      (e.prototype.isZero = function () {
        return this.width === 0 || this.height === 0;
      }),
      (e.create = function (t) {
        return new e(t.x, t.y, t.width, t.height);
      }),
      (e.copy = function (t, r) {
        return (
          (t.x = r.x),
          (t.y = r.y),
          (t.width = r.width),
          (t.height = r.height),
          t
        );
      }),
      (e.applyTransform = function (t, r, n) {
        if (!n) {
          t !== r && e.copy(t, r);
          return;
        }
        if (n[1] < 1e-5 && n[1] > -1e-5 && n[2] < 1e-5 && n[2] > -1e-5) {
          var i = n[0],
            a = n[3],
            o = n[4],
            s = n[5];
          ((t.x = r.x * i + o),
            (t.y = r.y * a + s),
            (t.width = r.width * i),
            (t.height = r.height * a),
            t.width < 0 && ((t.x += t.width), (t.width = -t.width)),
            t.height < 0 && ((t.y += t.height), (t.height = -t.height)));
          return;
        }
        ((Kr.x = Qr.x = r.x),
          (Kr.y = Jr.y = r.y),
          (jr.x = Jr.x = r.x + r.width),
          (jr.y = Qr.y = r.y + r.height),
          Kr.transform(n),
          Jr.transform(n),
          jr.transform(n),
          Qr.transform(n),
          (t.x = Sn(Kr.x, jr.x, Qr.x, Jr.x)),
          (t.y = Sn(Kr.y, jr.y, Qr.y, Jr.y)));
        var l = ri(Kr.x, jr.x, Qr.x, Jr.x),
          u = ri(Kr.y, jr.y, Qr.y, Jr.y);
        ((t.width = l - t.x), (t.height = u - t.y));
      }),
      e
    );
  })(),
  eb = new et(0, 0, 0, 0),
  rb = new et(0, 0, 0, 0);
function zc(e, t, r, n, i, a, o, s) {
  var l = Xu(t - r),
    u = Xu(n - e),
    f = Sn(l, u),
    h = Fc[i],
    v = Fc[1 - i],
    c = tb[i];
  t < r || n < e
    ? l < u
      ? (a && (qu[h] = -l), s && ((o[h] = t), (o[c] = 0)))
      : (a && (qu[h] = u), s && ((o[h] = e), (o[c] = 0)))
    : (o && ((o[h] = ri(e, r)), (o[c] = Sn(t, n) - o[h])),
      a &&
        (f < ea[0] || se.useDir) &&
        ((ea[0] = Sn(f, ea[0])),
        (l < u || !se.bidirectional) &&
          ((Ui[h] = l), (Ui[v] = 0), se.useDir && se.calcDirMTV()),
        (l >= u || !se.bidirectional) &&
          ((Ui[h] = -u), (Ui[v] = 0), se.useDir && se.calcDirMTV())));
}
function Yg() {
  var e = 0,
    t = new J(),
    r = new J(),
    n = {
      minTv: new J(),
      maxTv: new J(),
      useDir: !1,
      dirMinTv: new J(),
      touchThreshold: 0,
      bidirectional: !0,
      negativeSize: !1,
      reset: function (a, o) {
        ((n.touchThreshold = 0),
          a &&
            a.touchThreshold != null &&
            (n.touchThreshold = ri(0, a.touchThreshold)),
          (n.negativeSize = !1),
          o &&
            (n.minTv.set(1 / 0, 1 / 0),
            n.maxTv.set(0, 0),
            (n.useDir = !1),
            a &&
              a.direction != null &&
              ((n.useDir = !0),
              n.dirMinTv.copy(n.minTv),
              r.copy(n.minTv),
              (e = a.direction),
              (n.bidirectional = a.bidirectional == null || !!a.bidirectional),
              n.bidirectional || t.set(Math.cos(e), Math.sin(e)))));
      },
      calcDirMTV: function () {
        var a = n.minTv,
          o = n.dirMinTv,
          s = a.y * a.y + a.x * a.x,
          l = Math.sin(e),
          u = Math.cos(e),
          f = l * a.y + u * a.x;
        if (i(f)) {
          i(a.x) && i(a.y) && o.set(0, 0);
          return;
        }
        if (((r.x = (s * u) / f), (r.y = (s * l) / f), i(r.x) && i(r.y))) {
          o.set(0, 0);
          return;
        }
        (n.bidirectional || t.dot(r) > 0) && r.len() < o.len() && o.copy(r);
      },
    };
  function i(a) {
    return Xu(a) < 1e-10;
  }
  return n;
}
function qe(e) {
  (Ua || (Ua = new hi(100)), (e = e || Nr));
  var t = Ua.get(e);
  return (
    t ||
      ((t = {
        font: e,
        strWidthCache: new hi(500),
        asciiWidthMap: null,
        asciiWidthMapTried: !1,
        stWideCharWidth: vr.measureText("国", e).width,
        asciiCharWidth: vr.measureText("a", e).width,
      }),
      Ua.put(e, t)),
    t
  );
}
var Ua;
function nb(e) {
  if (!(yl >= Gc)) {
    e = e || Nr;
    for (var t = [], r = +new Date(), n = 0; n <= 127; n++)
      t[n] = vr.measureText(String.fromCharCode(n), e).width;
    var i = +new Date() - r;
    return (i > 16 ? (yl = Gc) : i > 2 && yl++, t);
  }
}
var yl = 0,
  Gc = 5;
function $g(e, t) {
  return (
    e.asciiWidthMapTried ||
      ((e.asciiWidthMap = nb(e.font)), (e.asciiWidthMapTried = !0)),
    0 <= t && t <= 127
      ? e.asciiWidthMap != null
        ? e.asciiWidthMap[t]
        : e.asciiCharWidth
      : e.stWideCharWidth
  );
}
function Ze(e, t) {
  var r = e.strWidthCache,
    n = r.get(t);
  return (n == null && ((n = vr.measureText(t, e.font).width), r.put(t, n)), n);
}
function Hc(e, t, r, n) {
  var i = Ze(qe(t), e),
    a = Us(t),
    o = ci(0, i, r),
    s = Dn(0, a, n),
    l = new et(o, s, i, a);
  return l;
}
function Xg(e, t, r, n) {
  var i = ((e || "") + "").split(`
`),
    a = i.length;
  if (a === 1) return Hc(i[0], t, r, n);
  for (var o = new et(0, 0, 0, 0), s = 0; s < i.length; s++) {
    var l = Hc(i[s], t, r, n);
    s === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function ci(e, t, r, n) {
  return (
    r === "right"
      ? n
        ? (e += t)
        : (e -= t)
      : r === "center" && (n ? (e += t / 2) : (e -= t / 2)),
    e
  );
}
function Dn(e, t, r, n) {
  return (
    r === "middle"
      ? n
        ? (e += t / 2)
        : (e -= t / 2)
      : r === "bottom" && (n ? (e += t) : (e -= t)),
    e
  );
}
function Us(e) {
  return qe(e).stWideCharWidth;
}
function zr(e, t) {
  return typeof e == "string"
    ? e.lastIndexOf("%") >= 0
      ? (parseFloat(e) / 100) * t
      : parseFloat(e)
    : e;
}
function Qo(e, t, r) {
  var n = t.position || "inside",
    i = t.distance != null ? t.distance : 5,
    a = r.height,
    o = r.width,
    s = a / 2,
    l = r.x,
    u = r.y,
    f = "left",
    h = "top";
  if (n instanceof Array)
    ((l += zr(n[0], r.width)),
      (u += zr(n[1], r.height)),
      (f = null),
      (h = null));
  else
    switch (n) {
      case "left":
        ((l -= i), (u += s), (f = "right"), (h = "middle"));
        break;
      case "right":
        ((l += i + o), (u += s), (h = "middle"));
        break;
      case "top":
        ((l += o / 2), (u -= i), (f = "center"), (h = "bottom"));
        break;
      case "bottom":
        ((l += o / 2), (u += a + i), (f = "center"));
        break;
      case "inside":
        ((l += o / 2), (u += s), (f = "center"), (h = "middle"));
        break;
      case "insideLeft":
        ((l += i), (u += s), (h = "middle"));
        break;
      case "insideRight":
        ((l += o - i), (u += s), (f = "right"), (h = "middle"));
        break;
      case "insideTop":
        ((l += o / 2), (u += i), (f = "center"));
        break;
      case "insideBottom":
        ((l += o / 2), (u += a - i), (f = "center"), (h = "bottom"));
        break;
      case "insideTopLeft":
        ((l += i), (u += i));
        break;
      case "insideTopRight":
        ((l += o - i), (u += i), (f = "right"));
        break;
      case "insideBottomLeft":
        ((l += i), (u += a - i), (h = "bottom"));
        break;
      case "insideBottomRight":
        ((l += o - i), (u += a - i), (f = "right"), (h = "bottom"));
        break;
    }
  return (
    (e = e || {}),
    (e.x = l),
    (e.y = u),
    (e.align = f),
    (e.verticalAlign = h),
    e
  );
}
var _l = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function ib(e, t, r, n, i, a) {
  if (!r) {
    ((e.text = ""), (e.isTruncated = !1));
    return;
  }
  var o = (t + "").split(`
`);
  a = qg(r, n, i, a);
  for (var s = !1, l = {}, u = 0, f = o.length; u < f; u++)
    (Zg(l, o[u], a), (o[u] = l.textLine), (s = s || l.isTruncated));
  ((e.text = o.join(`
`)),
    (e.isTruncated = s));
}
function qg(e, t, r, n) {
  n = n || {};
  var i = B({}, n);
  ((r = K(r, "...")), (i.maxIterations = K(n.maxIterations, 2)));
  var a = (i.minChar = K(n.minChar, 0)),
    o = (i.fontMeasureInfo = qe(t)),
    s = o.asciiCharWidth;
  i.placeholder = K(n.placeholder, "");
  for (var l = (e = Math.max(0, e - 1)), u = 0; u < a && l >= s; u++) l -= s;
  var f = Ze(o, r);
  return (
    f > l && ((r = ""), (f = 0)),
    (l = e - f),
    (i.ellipsis = r),
    (i.ellipsisWidth = f),
    (i.contentWidth = l),
    (i.containerWidth = e),
    i
  );
}
function Zg(e, t, r) {
  var n = r.containerWidth,
    i = r.contentWidth,
    a = r.fontMeasureInfo;
  if (!n) {
    ((e.textLine = ""), (e.isTruncated = !1));
    return;
  }
  var o = Ze(a, t);
  if (o <= n) {
    ((e.textLine = t), (e.isTruncated = !1));
    return;
  }
  for (var s = 0; ; s++) {
    if (o <= i || s >= r.maxIterations) {
      t += r.ellipsis;
      break;
    }
    var l = s === 0 ? ab(t, i, a) : o > 0 ? Math.floor((t.length * i) / o) : 0;
    ((t = t.substr(0, l)), (o = Ze(a, t)));
  }
  (t === "" && (t = r.placeholder), (e.textLine = t), (e.isTruncated = !0));
}
function ab(e, t, r) {
  for (var n = 0, i = 0, a = e.length; i < a && n < t; i++)
    n += $g(r, e.charCodeAt(i));
  return i;
}
function ob(e, t, r, n) {
  var i = Ch(e),
    a = t.overflow,
    o = t.padding,
    s = o ? o[1] + o[3] : 0,
    l = o ? o[0] + o[2] : 0,
    u = t.font,
    f = a === "truncate",
    h = Us(u),
    v = K(t.lineHeight, h),
    c = t.lineOverflow === "truncate",
    d = !1,
    p = t.width;
  p == null && r != null && (p = r - s);
  var m = t.height;
  m == null && n != null && (m = n - l);
  var g;
  p != null && (a === "break" || a === "breakAll")
    ? (g = i ? Kg(i, t.font, p, a === "breakAll", 0).lines : [])
    : (g = i
        ? i.split(`
`)
        : []);
  var y = g.length * v;
  if ((m == null && (m = y), y > m && c)) {
    var _ = Math.floor(m / v);
    ((d = d || g.length > _), (g = g.slice(0, _)), (y = g.length * v));
  }
  if (i && f && p != null)
    for (
      var b = qg(p, u, t.ellipsis, {
          minChar: t.truncateMinChar,
          placeholder: t.placeholder,
        }),
        w = {},
        S = 0;
      S < g.length;
      S++
    )
      (Zg(w, g[S], b), (g[S] = w.textLine), (d = d || w.isTruncated));
  for (var x = m, T = 0, D = qe(u), S = 0; S < g.length; S++)
    T = Math.max(Ze(D, g[S]), T);
  p == null && (p = T);
  var A = p;
  return (
    (x += l),
    (A += s),
    {
      lines: g,
      height: m,
      outerWidth: A,
      outerHeight: x,
      lineHeight: v,
      calculatedLineHeight: h,
      contentWidth: T,
      contentHeight: y,
      width: p,
      isTruncated: d,
    }
  );
}
var sb = (function () {
    function e() {}
    return e;
  })(),
  Vc = (function () {
    function e(t) {
      ((this.tokens = []), t && (this.tokens = t));
    }
    return e;
  })(),
  lb = (function () {
    function e() {
      ((this.width = 0),
        (this.height = 0),
        (this.contentWidth = 0),
        (this.contentHeight = 0),
        (this.outerWidth = 0),
        (this.outerHeight = 0),
        (this.lines = []),
        (this.isTruncated = !1));
    }
    return e;
  })();
function ub(e, t, r, n, i) {
  var a = new lb(),
    o = Ch(e);
  if (!o) return a;
  var s = t.padding,
    l = s ? s[1] + s[3] : 0,
    u = s ? s[0] + s[2] : 0,
    f = t.width;
  f == null && r != null && (f = r - l);
  var h = t.height;
  h == null && n != null && (h = n - u);
  for (
    var v = t.overflow,
      c =
        (v === "break" || v === "breakAll") && f != null
          ? { width: f, accumWidth: 0, breakAll: v === "breakAll" }
          : null,
      d = (_l.lastIndex = 0),
      p;
    (p = _l.exec(o)) != null;

  ) {
    var m = p.index;
    (m > d && bl(a, o.substring(d, m), t, c),
      bl(a, p[2], t, c, p[1]),
      (d = _l.lastIndex));
  }
  d < o.length && bl(a, o.substring(d, o.length), t, c);
  var g = [],
    y = 0,
    _ = 0,
    b = v === "truncate",
    w = t.lineOverflow === "truncate",
    S = {};
  function x(Ot, Xt, Vt) {
    ((Ot.width = Xt), (Ot.lineHeight = Vt), (y += Vt), (_ = Math.max(_, Xt)));
  }
  t: for (var T = 0; T < a.lines.length; T++) {
    for (var D = a.lines[T], A = 0, C = 0, I = 0; I < D.tokens.length; I++) {
      var L = D.tokens[I],
        P = (L.styleName && t.rich[L.styleName]) || {},
        k = (L.textPadding = P.padding),
        E = k ? k[1] + k[3] : 0,
        V = (L.font = P.font || t.font);
      L.contentHeight = Us(V);
      var R = K(P.height, L.contentHeight);
      if (
        ((L.innerHeight = R),
        k && (R += k[0] + k[2]),
        (L.height = R),
        (L.lineHeight = Cn(P.lineHeight, t.lineHeight, R)),
        (L.align = (P && P.align) || i),
        (L.verticalAlign = (P && P.verticalAlign) || "middle"),
        w && h != null && y + L.lineHeight > h)
      ) {
        var O = a.lines.length;
        (I > 0
          ? ((D.tokens = D.tokens.slice(0, I)),
            x(D, C, A),
            (a.lines = a.lines.slice(0, T + 1)))
          : (a.lines = a.lines.slice(0, T)),
          (a.isTruncated = a.isTruncated || a.lines.length < O));
        break t;
      }
      var z = P.width,
        F = z == null || z === "auto";
      if (typeof z == "string" && z.charAt(z.length - 1) === "%")
        ((L.percentWidth = z), g.push(L), (L.contentWidth = Ze(qe(V), L.text)));
      else {
        if (F) {
          var N = P.backgroundColor,
            $ = N && N.image;
          $ &&
            (($ = Q1($)),
            Ws($) && (L.width = Math.max(L.width, ($.width * R) / $.height)));
        }
        var nt = b && f != null ? f - C : null;
        nt != null && nt < L.width
          ? !F || nt < E
            ? ((L.text = ""), (L.width = L.contentWidth = 0))
            : (ib(S, L.text, nt - E, V, t.ellipsis, {
                minChar: t.truncateMinChar,
              }),
              (L.text = S.text),
              (a.isTruncated = a.isTruncated || S.isTruncated),
              (L.width = L.contentWidth = Ze(qe(V), L.text)))
          : (L.contentWidth = Ze(qe(V), L.text));
      }
      ((L.width += E), (C += L.width), P && (A = Math.max(A, L.lineHeight)));
    }
    x(D, C, A);
  }
  ((a.outerWidth = a.width = K(f, _)),
    (a.outerHeight = a.height = K(h, y)),
    (a.contentHeight = y),
    (a.contentWidth = _),
    (a.outerWidth += l),
    (a.outerHeight += u));
  for (var T = 0; T < g.length; T++) {
    var L = g[T],
      ft = L.percentWidth;
    L.width = (parseInt(ft, 10) / 100) * a.width;
  }
  return a;
}
function bl(e, t, r, n, i) {
  var a = t === "",
    o = (i && r.rich[i]) || {},
    s = e.lines,
    l = o.font || r.font,
    u = !1,
    f,
    h;
  if (n) {
    var v = o.padding,
      c = v ? v[1] + v[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var d = zr(o.width, n.width) + c;
      (s.length > 0 &&
        d + n.accumWidth > n.width &&
        ((f = t.split(`
`)),
        (u = !0)),
        (n.accumWidth = d));
    } else {
      var p = Kg(t, l, n.width, n.breakAll, n.accumWidth);
      ((n.accumWidth = p.accumWidth + c), (h = p.linesWidths), (f = p.lines));
    }
  }
  f ||
    (f = t.split(`
`));
  for (var m = qe(l), g = 0; g < f.length; g++) {
    var y = f[g],
      _ = new sb();
    if (
      ((_.styleName = i),
      (_.text = y),
      (_.isLineHolder = !y && !a),
      typeof o.width == "number"
        ? (_.width = o.width)
        : (_.width = h ? h[g] : Ze(m, y)),
      !g && !u)
    ) {
      var b = (s[s.length - 1] || (s[0] = new Vc())).tokens,
        w = b.length;
      w === 1 && b[0].isLineHolder ? (b[0] = _) : (y || !w || a) && b.push(_);
    } else s.push(new Vc([_]));
  }
}
function fb(e) {
  var t = e.charCodeAt(0);
  return (
    (t >= 32 && t <= 591) ||
    (t >= 880 && t <= 4351) ||
    (t >= 4608 && t <= 5119) ||
    (t >= 7680 && t <= 8303)
  );
}
var hb = Fr(
  ",&?/;] ".split(""),
  function (e, t) {
    return ((e[t] = !0), e);
  },
  {},
);
function cb(e) {
  return fb(e) ? !!hb[e] : !0;
}
function Kg(e, t, r, n, i) {
  for (
    var a = [], o = [], s = "", l = "", u = 0, f = 0, h = qe(t), v = 0;
    v < e.length;
    v++
  ) {
    var c = e.charAt(v);
    if (
      c ===
      `
`
    ) {
      (l && ((s += l), (f += u)),
        a.push(s),
        o.push(f),
        (s = ""),
        (l = ""),
        (u = 0),
        (f = 0));
      continue;
    }
    var d = $g(h, c.charCodeAt(0)),
      p = n ? !1 : !cb(c);
    if (a.length ? f + d > r : i + f + d > r) {
      f
        ? (s || l) &&
          (p
            ? (s || ((s = l), (l = ""), (u = 0), (f = u)),
              a.push(s),
              o.push(f - u),
              (l += c),
              (u += d),
              (s = ""),
              (f = u))
            : (l && ((s += l), (l = ""), (u = 0)),
              a.push(s),
              o.push(f),
              (s = c),
              (f = d)))
        : p
          ? (a.push(l), o.push(u), (l = c), (u = d))
          : (a.push(c), o.push(d));
      continue;
    }
    ((f += d),
      p
        ? ((l += c), (u += d))
        : (l && ((s += l), (l = ""), (u = 0)), (s += c)));
  }
  return (
    l && (s += l),
    s && (a.push(s), o.push(f)),
    a.length === 1 && (f += i),
    { accumWidth: f, lines: a, linesWidths: o }
  );
}
function Wc(e, t, r, n, i, a) {
  if (
    ((e.baseX = r), (e.baseY = n), (e.outerWidth = e.outerHeight = null), !!t)
  ) {
    var o = t.width * 2,
      s = t.height * 2;
    (et.set(Uc, ci(r, o, i), Dn(n, s, a), o, s), et.intersect(t, Uc, null, Yc));
    var l = Yc.outIntersectRect;
    ((e.outerWidth = l.width),
      (e.outerHeight = l.height),
      (e.baseX = ci(l.x, l.width, i, !0)),
      (e.baseY = Dn(l.y, l.height, a, !0)));
  }
}
var Uc = new et(0, 0, 0, 0),
  Yc = { outIntersectRect: {}, clamp: !0 };
function Ch(e) {
  return e != null ? (e += "") : (e = "");
}
function vb(e) {
  var t = Ch(e.text),
    r = e.font,
    n = Ze(qe(r), t),
    i = Us(r);
  return Zu(e, n, i, null);
}
function Zu(e, t, r, n) {
  var i = new et(
      ci(e.x || 0, t, e.textAlign),
      Dn(e.y || 0, r, e.textBaseline),
      t,
      r,
    ),
    a = n ?? (jg(e) ? e.lineWidth : 0);
  return (
    a > 0 && ((i.x -= a / 2), (i.y -= a / 2), (i.width += a), (i.height += a)),
    i
  );
}
function jg(e) {
  var t = e.stroke;
  return t != null && t !== "none" && e.lineWidth > 0;
}
function bi(e, t) {
  return (e == null && (e = 0), t == null && (t = 0), [e, t]);
}
function db(e) {
  return [e[0], e[1]];
}
function $c(e, t, r) {
  return ((e[0] = t[0] + r[0]), (e[1] = t[1] + r[1]), e);
}
function pb(e, t, r) {
  return ((e[0] = t[0] - r[0]), (e[1] = t[1] - r[1]), e);
}
function gb(e) {
  return Math.sqrt(mb(e));
}
function mb(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function Sl(e, t, r) {
  return ((e[0] = t[0] * r), (e[1] = t[1] * r), e);
}
function yb(e, t) {
  var r = gb(t);
  return (
    r === 0 ? ((e[0] = 0), (e[1] = 0)) : ((e[0] = t[0] / r), (e[1] = t[1] / r)),
    e
  );
}
function Ku(e, t) {
  return Math.sqrt(
    (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]),
  );
}
var ju = Ku;
function _b(e, t) {
  return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var li = _b;
function wl(e, t, r, n) {
  return (
    (e[0] = t[0] + n * (r[0] - t[0])),
    (e[1] = t[1] + n * (r[1] - t[1])),
    e
  );
}
function Se(e, t, r) {
  var n = t[0],
    i = t[1];
  return (
    (e[0] = r[0] * n + r[2] * i + r[4]),
    (e[1] = r[1] * n + r[3] * i + r[5]),
    e
  );
}
function ni(e, t, r) {
  return ((e[0] = Math.min(t[0], r[0])), (e[1] = Math.min(t[1], r[1])), e);
}
function ii(e, t, r) {
  return ((e[0] = Math.max(t[0], r[0])), (e[1] = Math.max(t[1], r[1])), e);
}
var Xc = xh,
  qc = 5e-5;
function tn(e) {
  return e > qc || e < -qc;
}
var en = [],
  Fn = [],
  xl = cr(),
  Tl = Math.abs,
  Dh = (function () {
    function e() {}
    return (
      (e.prototype.getLocalTransform = function (t) {
        return e.getLocalTransform(this, t);
      }),
      (e.prototype.setPosition = function (t) {
        ((this.x = t[0]), (this.y = t[1]));
      }),
      (e.prototype.setScale = function (t) {
        ((this.scaleX = t[0]), (this.scaleY = t[1]));
      }),
      (e.prototype.setSkew = function (t) {
        ((this.skewX = t[0]), (this.skewY = t[1]));
      }),
      (e.prototype.setOrigin = function (t) {
        ((this.originX = t[0]), (this.originY = t[1]));
      }),
      (e.prototype.needLocalTransform = function () {
        return (
          tn(this.rotation) ||
          tn(this.x) ||
          tn(this.y) ||
          tn(this.scaleX - 1) ||
          tn(this.scaleY - 1) ||
          tn(this.skewX) ||
          tn(this.skewY)
        );
      }),
      (e.prototype.updateTransform = function () {
        var t = this.parent && this.parent.transform,
          r = this.needLocalTransform(),
          n = this.transform;
        if (!(r || t)) {
          n && (Xc(n), (this.invTransform = null));
          return;
        }
        ((n = n || cr()),
          r ? this.getLocalTransform(n) : Xc(n),
          t && (r ? ta(n, t, n) : Ug(n, t)),
          (this.transform = n),
          this._resolveGlobalScaleRatio(n));
      }),
      (e.prototype._resolveGlobalScaleRatio = function (t) {
        var r = this.globalScaleRatio;
        if (r != null && r !== 1) {
          this.getGlobalScale(en);
          var n = en[0] < 0 ? -1 : 1,
            i = en[1] < 0 ? -1 : 1,
            a = ((en[0] - n) * r + n) / en[0] || 0,
            o = ((en[1] - i) * r + i) / en[1] || 0;
          ((t[0] *= a), (t[1] *= a), (t[2] *= o), (t[3] *= o));
        }
        ((this.invTransform = this.invTransform || cr()),
          ka(this.invTransform, t));
      }),
      (e.prototype.getComputedTransform = function () {
        for (var t = this, r = []; t; ) (r.push(t), (t = t.parent));
        for (; (t = r.pop()); ) t.updateTransform();
        return this.transform;
      }),
      (e.prototype.setLocalTransform = function (t) {
        if (t) {
          var r = t[0] * t[0] + t[1] * t[1],
            n = t[2] * t[2] + t[3] * t[3],
            i = Math.atan2(t[1], t[0]),
            a = Math.PI / 2 + i - Math.atan2(t[3], t[2]);
          ((n = Math.sqrt(n) * Math.cos(a)),
            (r = Math.sqrt(r)),
            (this.skewX = a),
            (this.skewY = 0),
            (this.rotation = -i),
            (this.x = +t[4]),
            (this.y = +t[5]),
            (this.scaleX = r),
            (this.scaleY = n),
            (this.originX = 0),
            (this.originY = 0));
        }
      }),
      (e.prototype.decomposeTransform = function () {
        if (this.transform) {
          var t = this.parent,
            r = this.transform;
          t &&
            t.transform &&
            ((t.invTransform = t.invTransform || cr()),
            ta(Fn, t.invTransform, r),
            (r = Fn));
          var n = this.originX,
            i = this.originY;
          ((n || i) &&
            ((xl[4] = n),
            (xl[5] = i),
            ta(Fn, r, xl),
            (Fn[4] -= n),
            (Fn[5] -= i),
            (r = Fn)),
            this.setLocalTransform(r));
        }
      }),
      (e.prototype.getGlobalScale = function (t) {
        var r = this.transform;
        return (
          (t = t || []),
          r
            ? ((t[0] = Math.sqrt(r[0] * r[0] + r[1] * r[1])),
              (t[1] = Math.sqrt(r[2] * r[2] + r[3] * r[3])),
              r[0] < 0 && (t[0] = -t[0]),
              r[3] < 0 && (t[1] = -t[1]),
              t)
            : ((t[0] = 1), (t[1] = 1), t)
        );
      }),
      (e.prototype.transformCoordToLocal = function (t, r) {
        var n = [t, r],
          i = this.invTransform;
        return (i && Se(n, n, i), n);
      }),
      (e.prototype.transformCoordToGlobal = function (t, r) {
        var n = [t, r],
          i = this.transform;
        return (i && Se(n, n, i), n);
      }),
      (e.prototype.getLineScale = function () {
        var t = this.transform;
        return t && Tl(t[0] - 1) > 1e-10 && Tl(t[3] - 1) > 1e-10
          ? Math.sqrt(Tl(t[0] * t[3] - t[2] * t[1]))
          : 1;
      }),
      (e.prototype.copyTransform = function (t) {
        Qu(this, t);
      }),
      (e.getLocalTransform = function (t, r) {
        r = r || [];
        var n = t.originX || 0,
          i = t.originY || 0,
          a = t.scaleX,
          o = t.scaleY,
          s = t.anchorX,
          l = t.anchorY,
          u = t.rotation || 0,
          f = t.x,
          h = t.y,
          v = t.skewX ? Math.tan(t.skewX) : 0,
          c = t.skewY ? Math.tan(-t.skewY) : 0;
        if (n || i || s || l) {
          var d = n + s,
            p = i + l;
          ((r[4] = -d * a - v * p * o), (r[5] = -p * o - c * d * a));
        } else r[4] = r[5] = 0;
        return (
          (r[0] = a),
          (r[3] = o),
          (r[1] = c * a),
          (r[2] = v * o),
          u && Th(r, r, u),
          (r[4] += n + f),
          (r[5] += i + h),
          r
        );
      }),
      (e.initDefaultProps = (function () {
        var t = e.prototype;
        ((t.scaleX = t.scaleY = t.globalScaleRatio = 1),
          (t.x =
            t.y =
            t.originX =
            t.originY =
            t.skewX =
            t.skewY =
            t.rotation =
            t.anchorX =
            t.anchorY =
              0));
      })()),
      e
    );
  })(),
  ga = [
    "x",
    "y",
    "originX",
    "originY",
    "anchorX",
    "anchorY",
    "rotation",
    "scaleX",
    "scaleY",
    "skewX",
    "skewY",
  ];
function Qu(e, t) {
  for (var r = 0; r < ga.length; r++) {
    var n = ga[r];
    e[n] = t[n];
  }
}
var ra = {
    linear: function (e) {
      return e;
    },
    quadraticIn: function (e) {
      return e * e;
    },
    quadraticOut: function (e) {
      return e * (2 - e);
    },
    quadraticInOut: function (e) {
      return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
    },
    cubicIn: function (e) {
      return e * e * e;
    },
    cubicOut: function (e) {
      return --e * e * e + 1;
    },
    cubicInOut: function (e) {
      return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
    },
    quarticIn: function (e) {
      return e * e * e * e;
    },
    quarticOut: function (e) {
      return 1 - --e * e * e * e;
    },
    quarticInOut: function (e) {
      return (e *= 2) < 1
        ? 0.5 * e * e * e * e
        : -0.5 * ((e -= 2) * e * e * e - 2);
    },
    quinticIn: function (e) {
      return e * e * e * e * e;
    },
    quinticOut: function (e) {
      return --e * e * e * e * e + 1;
    },
    quinticInOut: function (e) {
      return (e *= 2) < 1
        ? 0.5 * e * e * e * e * e
        : 0.5 * ((e -= 2) * e * e * e * e + 2);
    },
    sinusoidalIn: function (e) {
      return 1 - Math.cos((e * Math.PI) / 2);
    },
    sinusoidalOut: function (e) {
      return Math.sin((e * Math.PI) / 2);
    },
    sinusoidalInOut: function (e) {
      return 0.5 * (1 - Math.cos(Math.PI * e));
    },
    exponentialIn: function (e) {
      return e === 0 ? 0 : Math.pow(1024, e - 1);
    },
    exponentialOut: function (e) {
      return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
    },
    exponentialInOut: function (e) {
      return e === 0
        ? 0
        : e === 1
          ? 1
          : (e *= 2) < 1
            ? 0.5 * Math.pow(1024, e - 1)
            : 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
    },
    circularIn: function (e) {
      return 1 - Math.sqrt(1 - e * e);
    },
    circularOut: function (e) {
      return Math.sqrt(1 - --e * e);
    },
    circularInOut: function (e) {
      return (e *= 2) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    },
    elasticIn: function (e) {
      var t,
        r = 0.1,
        n = 0.4;
      return e === 0
        ? 0
        : e === 1
          ? 1
          : (!r || r < 1
              ? ((r = 1), (t = n / 4))
              : (t = (n * Math.asin(1 / r)) / (2 * Math.PI)),
            -(
              r *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n)
            ));
    },
    elasticOut: function (e) {
      var t,
        r = 0.1,
        n = 0.4;
      return e === 0
        ? 0
        : e === 1
          ? 1
          : (!r || r < 1
              ? ((r = 1), (t = n / 4))
              : (t = (n * Math.asin(1 / r)) / (2 * Math.PI)),
            r * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / n) +
              1);
    },
    elasticInOut: function (e) {
      var t,
        r = 0.1,
        n = 0.4;
      return e === 0
        ? 0
        : e === 1
          ? 1
          : (!r || r < 1
              ? ((r = 1), (t = n / 4))
              : (t = (n * Math.asin(1 / r)) / (2 * Math.PI)),
            (e *= 2) < 1
              ? -0.5 *
                (r *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin(((e - t) * (2 * Math.PI)) / n))
              : r *
                  Math.pow(2, -10 * (e -= 1)) *
                  Math.sin(((e - t) * (2 * Math.PI)) / n) *
                  0.5 +
                1);
    },
    backIn: function (e) {
      var t = 1.70158;
      return e * e * ((t + 1) * e - t);
    },
    backOut: function (e) {
      var t = 1.70158;
      return --e * e * ((t + 1) * e + t) + 1;
    },
    backInOut: function (e) {
      var t = 2.5949095;
      return (e *= 2) < 1
        ? 0.5 * (e * e * ((t + 1) * e - t))
        : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
    },
    bounceIn: function (e) {
      return 1 - ra.bounceOut(1 - e);
    },
    bounceOut: function (e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
          ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
          : e < 2.5 / 2.75
            ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
            : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    },
    bounceInOut: function (e) {
      return e < 0.5
        ? ra.bounceIn(e * 2) * 0.5
        : ra.bounceOut(e * 2 - 1) * 0.5 + 0.5;
    },
  },
  Ya = Math.pow,
  Rr = Math.sqrt,
  Jo = 1e-8,
  Qg = 1e-4,
  Zc = Rr(3),
  $a = 1 / 3,
  We = bi(),
  ge = bi(),
  ui = bi();
function Lr(e) {
  return e > -Jo && e < Jo;
}
function Jg(e) {
  return e > Jo || e < -Jo;
}
function zt(e, t, r, n, i) {
  var a = 1 - i;
  return a * a * (a * e + 3 * i * t) + i * i * (i * n + 3 * a * r);
}
function Kc(e, t, r, n, i) {
  var a = 1 - i;
  return 3 * (((t - e) * a + 2 * (r - t) * i) * a + (n - r) * i * i);
}
function ts(e, t, r, n, i, a) {
  var o = n + 3 * (t - r) - e,
    s = 3 * (r - t * 2 + e),
    l = 3 * (t - e),
    u = e - i,
    f = s * s - 3 * o * l,
    h = s * l - 9 * o * u,
    v = l * l - 3 * s * u,
    c = 0;
  if (Lr(f) && Lr(h))
    if (Lr(s)) a[0] = 0;
    else {
      var d = -l / s;
      d >= 0 && d <= 1 && (a[c++] = d);
    }
  else {
    var p = h * h - 4 * f * v;
    if (Lr(p)) {
      var m = h / f,
        d = -s / o + m,
        g = -m / 2;
      (d >= 0 && d <= 1 && (a[c++] = d), g >= 0 && g <= 1 && (a[c++] = g));
    } else if (p > 0) {
      var y = Rr(p),
        _ = f * s + 1.5 * o * (-h + y),
        b = f * s + 1.5 * o * (-h - y);
      (_ < 0 ? (_ = -Ya(-_, $a)) : (_ = Ya(_, $a)),
        b < 0 ? (b = -Ya(-b, $a)) : (b = Ya(b, $a)));
      var d = (-s - (_ + b)) / (3 * o);
      d >= 0 && d <= 1 && (a[c++] = d);
    } else {
      var w = (2 * f * s - 3 * o * h) / (2 * Rr(f * f * f)),
        S = Math.acos(w) / 3,
        x = Rr(f),
        T = Math.cos(S),
        d = (-s - 2 * x * T) / (3 * o),
        g = (-s + x * (T + Zc * Math.sin(S))) / (3 * o),
        D = (-s + x * (T - Zc * Math.sin(S))) / (3 * o);
      (d >= 0 && d <= 1 && (a[c++] = d),
        g >= 0 && g <= 1 && (a[c++] = g),
        D >= 0 && D <= 1 && (a[c++] = D));
    }
  }
  return c;
}
function tm(e, t, r, n, i) {
  var a = 6 * r - 12 * t + 6 * e,
    o = 9 * t + 3 * n - 3 * e - 9 * r,
    s = 3 * t - 3 * e,
    l = 0;
  if (Lr(o)) {
    if (Jg(a)) {
      var u = -s / a;
      u >= 0 && u <= 1 && (i[l++] = u);
    }
  } else {
    var f = a * a - 4 * o * s;
    if (Lr(f)) i[0] = -a / (2 * o);
    else if (f > 0) {
      var h = Rr(f),
        u = (-a + h) / (2 * o),
        v = (-a - h) / (2 * o);
      (u >= 0 && u <= 1 && (i[l++] = u), v >= 0 && v <= 1 && (i[l++] = v));
    }
  }
  return l;
}
function es(e, t, r, n, i, a) {
  var o = (t - e) * i + e,
    s = (r - t) * i + t,
    l = (n - r) * i + r,
    u = (s - o) * i + o,
    f = (l - s) * i + s,
    h = (f - u) * i + u;
  ((a[0] = e),
    (a[1] = o),
    (a[2] = u),
    (a[3] = h),
    (a[4] = h),
    (a[5] = f),
    (a[6] = l),
    (a[7] = n));
}
function bb(e, t, r, n, i, a, o, s, l, u, f) {
  var h,
    v = 0.005,
    c = 1 / 0,
    d,
    p,
    m,
    g;
  ((We[0] = l), (We[1] = u));
  for (var y = 0; y < 1; y += 0.05)
    ((ge[0] = zt(e, r, i, o, y)),
      (ge[1] = zt(t, n, a, s, y)),
      (m = li(We, ge)),
      m < c && ((h = y), (c = m)));
  c = 1 / 0;
  for (var _ = 0; _ < 32 && !(v < Qg); _++)
    ((d = h - v),
      (p = h + v),
      (ge[0] = zt(e, r, i, o, d)),
      (ge[1] = zt(t, n, a, s, d)),
      (m = li(ge, We)),
      d >= 0 && m < c
        ? ((h = d), (c = m))
        : ((ui[0] = zt(e, r, i, o, p)),
          (ui[1] = zt(t, n, a, s, p)),
          (g = li(ui, We)),
          p <= 1 && g < c ? ((h = p), (c = g)) : (v *= 0.5)));
  return Rr(c);
}
function Sb(e, t, r, n, i, a, o, s, l) {
  for (var u = e, f = t, h = 0, v = 1 / l, c = 1; c <= l; c++) {
    var d = c * v,
      p = zt(e, r, i, o, d),
      m = zt(t, n, a, s, d),
      g = p - u,
      y = m - f;
    ((h += Math.sqrt(g * g + y * y)), (u = p), (f = m));
  }
  return h;
}
function te(e, t, r, n) {
  var i = 1 - n;
  return i * (i * e + 2 * n * t) + n * n * r;
}
function jc(e, t, r, n) {
  return 2 * ((1 - n) * (t - e) + n * (r - t));
}
function wb(e, t, r, n, i) {
  var a = e - 2 * t + r,
    o = 2 * (t - e),
    s = e - n,
    l = 0;
  if (Lr(a)) {
    if (Jg(o)) {
      var u = -s / o;
      u >= 0 && u <= 1 && (i[l++] = u);
    }
  } else {
    var f = o * o - 4 * a * s;
    if (Lr(f)) {
      var u = -o / (2 * a);
      u >= 0 && u <= 1 && (i[l++] = u);
    } else if (f > 0) {
      var h = Rr(f),
        u = (-o + h) / (2 * a),
        v = (-o - h) / (2 * a);
      (u >= 0 && u <= 1 && (i[l++] = u), v >= 0 && v <= 1 && (i[l++] = v));
    }
  }
  return l;
}
function em(e, t, r) {
  var n = e + r - 2 * t;
  return n === 0 ? 0.5 : (e - t) / n;
}
function rs(e, t, r, n, i) {
  var a = (t - e) * n + e,
    o = (r - t) * n + t,
    s = (o - a) * n + a;
  ((i[0] = e), (i[1] = a), (i[2] = s), (i[3] = s), (i[4] = o), (i[5] = r));
}
function xb(e, t, r, n, i, a, o, s, l) {
  var u,
    f = 0.005,
    h = 1 / 0;
  ((We[0] = o), (We[1] = s));
  for (var v = 0; v < 1; v += 0.05) {
    ((ge[0] = te(e, r, i, v)), (ge[1] = te(t, n, a, v)));
    var c = li(We, ge);
    c < h && ((u = v), (h = c));
  }
  h = 1 / 0;
  for (var d = 0; d < 32 && !(f < Qg); d++) {
    var p = u - f,
      m = u + f;
    ((ge[0] = te(e, r, i, p)), (ge[1] = te(t, n, a, p)));
    var c = li(ge, We);
    if (p >= 0 && c < h) ((u = p), (h = c));
    else {
      ((ui[0] = te(e, r, i, m)), (ui[1] = te(t, n, a, m)));
      var g = li(ui, We);
      m <= 1 && g < h ? ((u = m), (h = g)) : (f *= 0.5);
    }
  }
  return Rr(h);
}
function Tb(e, t, r, n, i, a, o) {
  for (var s = e, l = t, u = 0, f = 1 / o, h = 1; h <= o; h++) {
    var v = h * f,
      c = te(e, r, i, v),
      d = te(t, n, a, v),
      p = c - s,
      m = d - l;
    ((u += Math.sqrt(p * p + m * m)), (s = c), (l = d));
  }
  return u;
}
var Cb = /cubic-bezier\(([0-9,\.e ]+)\)/;
function rm(e) {
  var t = e && Cb.exec(e);
  if (t) {
    var r = t[1].split(","),
      n = +Ye(r[0]),
      i = +Ye(r[1]),
      a = +Ye(r[2]),
      o = +Ye(r[3]);
    if (isNaN(n + i + a + o)) return;
    var s = [];
    return function (l) {
      return l <= 0
        ? 0
        : l >= 1
          ? 1
          : ts(0, n, a, 1, l, s) && zt(0, i, o, 1, s[0]);
    };
  }
}
var Db = (function () {
    function e(t) {
      ((this._inited = !1),
        (this._startTime = 0),
        (this._pausedTime = 0),
        (this._paused = !1),
        (this._life = t.life || 1e3),
        (this._delay = t.delay || 0),
        (this.loop = t.loop || !1),
        (this.onframe = t.onframe || ie),
        (this.ondestroy = t.ondestroy || ie),
        (this.onrestart = t.onrestart || ie),
        t.easing && this.setEasing(t.easing));
    }
    return (
      (e.prototype.step = function (t, r) {
        if (
          (this._inited ||
            ((this._startTime = t + this._delay), (this._inited = !0)),
          this._paused)
        ) {
          this._pausedTime += r;
          return;
        }
        var n = this._life,
          i = t - this._startTime - this._pausedTime,
          a = i / n;
        (a < 0 && (a = 0), (a = Math.min(a, 1)));
        var o = this.easingFunc,
          s = o ? o(a) : a;
        if ((this.onframe(s), a === 1))
          if (this.loop) {
            var l = i % n;
            ((this._startTime = t - l),
              (this._pausedTime = 0),
              this.onrestart());
          } else return !0;
        return !1;
      }),
      (e.prototype.pause = function () {
        this._paused = !0;
      }),
      (e.prototype.resume = function () {
        this._paused = !1;
      }),
      (e.prototype.setEasing = function (t) {
        ((this.easing = t), (this.easingFunc = Q(t) ? t : ra[t] || rm(t)));
      }),
      e
    );
  })(),
  Qc = {
    transparent: [0, 0, 0, 0],
    aliceblue: [240, 248, 255, 1],
    antiquewhite: [250, 235, 215, 1],
    aqua: [0, 255, 255, 1],
    aquamarine: [127, 255, 212, 1],
    azure: [240, 255, 255, 1],
    beige: [245, 245, 220, 1],
    bisque: [255, 228, 196, 1],
    black: [0, 0, 0, 1],
    blanchedalmond: [255, 235, 205, 1],
    blue: [0, 0, 255, 1],
    blueviolet: [138, 43, 226, 1],
    brown: [165, 42, 42, 1],
    burlywood: [222, 184, 135, 1],
    cadetblue: [95, 158, 160, 1],
    chartreuse: [127, 255, 0, 1],
    chocolate: [210, 105, 30, 1],
    coral: [255, 127, 80, 1],
    cornflowerblue: [100, 149, 237, 1],
    cornsilk: [255, 248, 220, 1],
    crimson: [220, 20, 60, 1],
    cyan: [0, 255, 255, 1],
    darkblue: [0, 0, 139, 1],
    darkcyan: [0, 139, 139, 1],
    darkgoldenrod: [184, 134, 11, 1],
    darkgray: [169, 169, 169, 1],
    darkgreen: [0, 100, 0, 1],
    darkgrey: [169, 169, 169, 1],
    darkkhaki: [189, 183, 107, 1],
    darkmagenta: [139, 0, 139, 1],
    darkolivegreen: [85, 107, 47, 1],
    darkorange: [255, 140, 0, 1],
    darkorchid: [153, 50, 204, 1],
    darkred: [139, 0, 0, 1],
    darksalmon: [233, 150, 122, 1],
    darkseagreen: [143, 188, 143, 1],
    darkslateblue: [72, 61, 139, 1],
    darkslategray: [47, 79, 79, 1],
    darkslategrey: [47, 79, 79, 1],
    darkturquoise: [0, 206, 209, 1],
    darkviolet: [148, 0, 211, 1],
    deeppink: [255, 20, 147, 1],
    deepskyblue: [0, 191, 255, 1],
    dimgray: [105, 105, 105, 1],
    dimgrey: [105, 105, 105, 1],
    dodgerblue: [30, 144, 255, 1],
    firebrick: [178, 34, 34, 1],
    floralwhite: [255, 250, 240, 1],
    forestgreen: [34, 139, 34, 1],
    fuchsia: [255, 0, 255, 1],
    gainsboro: [220, 220, 220, 1],
    ghostwhite: [248, 248, 255, 1],
    gold: [255, 215, 0, 1],
    goldenrod: [218, 165, 32, 1],
    gray: [128, 128, 128, 1],
    green: [0, 128, 0, 1],
    greenyellow: [173, 255, 47, 1],
    grey: [128, 128, 128, 1],
    honeydew: [240, 255, 240, 1],
    hotpink: [255, 105, 180, 1],
    indianred: [205, 92, 92, 1],
    indigo: [75, 0, 130, 1],
    ivory: [255, 255, 240, 1],
    khaki: [240, 230, 140, 1],
    lavender: [230, 230, 250, 1],
    lavenderblush: [255, 240, 245, 1],
    lawngreen: [124, 252, 0, 1],
    lemonchiffon: [255, 250, 205, 1],
    lightblue: [173, 216, 230, 1],
    lightcoral: [240, 128, 128, 1],
    lightcyan: [224, 255, 255, 1],
    lightgoldenrodyellow: [250, 250, 210, 1],
    lightgray: [211, 211, 211, 1],
    lightgreen: [144, 238, 144, 1],
    lightgrey: [211, 211, 211, 1],
    lightpink: [255, 182, 193, 1],
    lightsalmon: [255, 160, 122, 1],
    lightseagreen: [32, 178, 170, 1],
    lightskyblue: [135, 206, 250, 1],
    lightslategray: [119, 136, 153, 1],
    lightslategrey: [119, 136, 153, 1],
    lightsteelblue: [176, 196, 222, 1],
    lightyellow: [255, 255, 224, 1],
    lime: [0, 255, 0, 1],
    limegreen: [50, 205, 50, 1],
    linen: [250, 240, 230, 1],
    magenta: [255, 0, 255, 1],
    maroon: [128, 0, 0, 1],
    mediumaquamarine: [102, 205, 170, 1],
    mediumblue: [0, 0, 205, 1],
    mediumorchid: [186, 85, 211, 1],
    mediumpurple: [147, 112, 219, 1],
    mediumseagreen: [60, 179, 113, 1],
    mediumslateblue: [123, 104, 238, 1],
    mediumspringgreen: [0, 250, 154, 1],
    mediumturquoise: [72, 209, 204, 1],
    mediumvioletred: [199, 21, 133, 1],
    midnightblue: [25, 25, 112, 1],
    mintcream: [245, 255, 250, 1],
    mistyrose: [255, 228, 225, 1],
    moccasin: [255, 228, 181, 1],
    navajowhite: [255, 222, 173, 1],
    navy: [0, 0, 128, 1],
    oldlace: [253, 245, 230, 1],
    olive: [128, 128, 0, 1],
    olivedrab: [107, 142, 35, 1],
    orange: [255, 165, 0, 1],
    orangered: [255, 69, 0, 1],
    orchid: [218, 112, 214, 1],
    palegoldenrod: [238, 232, 170, 1],
    palegreen: [152, 251, 152, 1],
    paleturquoise: [175, 238, 238, 1],
    palevioletred: [219, 112, 147, 1],
    papayawhip: [255, 239, 213, 1],
    peachpuff: [255, 218, 185, 1],
    peru: [205, 133, 63, 1],
    pink: [255, 192, 203, 1],
    plum: [221, 160, 221, 1],
    powderblue: [176, 224, 230, 1],
    purple: [128, 0, 128, 1],
    red: [255, 0, 0, 1],
    rosybrown: [188, 143, 143, 1],
    royalblue: [65, 105, 225, 1],
    saddlebrown: [139, 69, 19, 1],
    salmon: [250, 128, 114, 1],
    sandybrown: [244, 164, 96, 1],
    seagreen: [46, 139, 87, 1],
    seashell: [255, 245, 238, 1],
    sienna: [160, 82, 45, 1],
    silver: [192, 192, 192, 1],
    skyblue: [135, 206, 235, 1],
    slateblue: [106, 90, 205, 1],
    slategray: [112, 128, 144, 1],
    slategrey: [112, 128, 144, 1],
    snow: [255, 250, 250, 1],
    springgreen: [0, 255, 127, 1],
    steelblue: [70, 130, 180, 1],
    tan: [210, 180, 140, 1],
    teal: [0, 128, 128, 1],
    thistle: [216, 191, 216, 1],
    tomato: [255, 99, 71, 1],
    turquoise: [64, 224, 208, 1],
    violet: [238, 130, 238, 1],
    wheat: [245, 222, 179, 1],
    white: [255, 255, 255, 1],
    whitesmoke: [245, 245, 245, 1],
    yellow: [255, 255, 0, 1],
    yellowgreen: [154, 205, 50, 1],
  };
function Er(e) {
  return ((e = Math.round(e)), e < 0 ? 0 : e > 255 ? 255 : e);
}
function Ju(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
function Cl(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%"
    ? Er((parseFloat(t) / 100) * 255)
    : Er(parseInt(t, 10));
}
function Mn(e) {
  var t = e;
  return t.length && t.charAt(t.length - 1) === "%"
    ? Ju(parseFloat(t) / 100)
    : Ju(parseFloat(t));
}
function Dl(e, t, r) {
  return (
    r < 0 ? (r += 1) : r > 1 && (r -= 1),
    r * 6 < 1
      ? e + (t - e) * r * 6
      : r * 2 < 1
        ? t
        : r * 3 < 2
          ? e + (t - e) * (2 / 3 - r) * 6
          : e
  );
}
function Xa(e, t, r) {
  return e + (t - e) * r;
}
function ce(e, t, r, n, i) {
  return ((e[0] = t), (e[1] = r), (e[2] = n), (e[3] = i), e);
}
function tf(e, t) {
  return ((e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e);
}
var nm = new hi(20),
  qa = null;
function zn(e, t) {
  (qa && tf(qa, t), (qa = nm.put(e, qa || t.slice())));
}
function Ke(e, t) {
  if (e) {
    t = t || [];
    var r = nm.get(e);
    if (r) return tf(t, r);
    e = e + "";
    var n = e.replace(/ /g, "").toLowerCase();
    if (n in Qc) return (tf(t, Qc[n]), zn(e, t), t);
    var i = n.length;
    if (n.charAt(0) === "#") {
      if (i === 4 || i === 5) {
        var a = parseInt(n.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          ce(t, 0, 0, 0, 1);
          return;
        }
        return (
          ce(
            t,
            ((a & 3840) >> 4) | ((a & 3840) >> 8),
            (a & 240) | ((a & 240) >> 4),
            (a & 15) | ((a & 15) << 4),
            i === 5 ? parseInt(n.slice(4), 16) / 15 : 1,
          ),
          zn(e, t),
          t
        );
      } else if (i === 7 || i === 9) {
        var a = parseInt(n.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          ce(t, 0, 0, 0, 1);
          return;
        }
        return (
          ce(
            t,
            (a & 16711680) >> 16,
            (a & 65280) >> 8,
            a & 255,
            i === 9 ? parseInt(n.slice(7), 16) / 255 : 1,
          ),
          zn(e, t),
          t
        );
      }
      return;
    }
    var o = n.indexOf("("),
      s = n.indexOf(")");
    if (o !== -1 && s + 1 === i) {
      var l = n.substr(0, o),
        u = n.substr(o + 1, s - (o + 1)).split(","),
        f = 1;
      switch (l) {
        case "rgba":
          if (u.length !== 4)
            return u.length === 3
              ? ce(t, +u[0], +u[1], +u[2], 1)
              : ce(t, 0, 0, 0, 1);
          f = Mn(u.pop());
        case "rgb":
          if (u.length >= 3)
            return (
              ce(
                t,
                Cl(u[0]),
                Cl(u[1]),
                Cl(u[2]),
                u.length === 3 ? f : Mn(u[3]),
              ),
              zn(e, t),
              t
            );
          ce(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (u.length !== 4) {
            ce(t, 0, 0, 0, 1);
            return;
          }
          return ((u[3] = Mn(u[3])), ef(u, t), zn(e, t), t);
        case "hsl":
          if (u.length !== 3) {
            ce(t, 0, 0, 0, 1);
            return;
          }
          return (ef(u, t), zn(e, t), t);
        default:
          return;
      }
    }
    ce(t, 0, 0, 0, 1);
  }
}
function ef(e, t) {
  var r = (((parseFloat(e[0]) % 360) + 360) % 360) / 360,
    n = Mn(e[1]),
    i = Mn(e[2]),
    a = i <= 0.5 ? i * (n + 1) : i + n - i * n,
    o = i * 2 - a;
  return (
    (t = t || []),
    ce(
      t,
      Er(Dl(o, a, r + 1 / 3) * 255),
      Er(Dl(o, a, r) * 255),
      Er(Dl(o, a, r - 1 / 3) * 255),
      1,
    ),
    e.length === 4 && (t[3] = e[3]),
    t
  );
}
function Mb(e) {
  if (e) {
    var t = e[0] / 255,
      r = e[1] / 255,
      n = e[2] / 255,
      i = Math.min(t, r, n),
      a = Math.max(t, r, n),
      o = a - i,
      s = (a + i) / 2,
      l,
      u;
    if (o === 0) ((l = 0), (u = 0));
    else {
      s < 0.5 ? (u = o / (a + i)) : (u = o / (2 - a - i));
      var f = ((a - t) / 6 + o / 2) / o,
        h = ((a - r) / 6 + o / 2) / o,
        v = ((a - n) / 6 + o / 2) / o;
      (t === a
        ? (l = v - h)
        : r === a
          ? (l = 1 / 3 + f - v)
          : n === a && (l = 2 / 3 + h - f),
        l < 0 && (l += 1),
        l > 1 && (l -= 1));
    }
    var c = [l * 360, u, s];
    return (e[3] != null && c.push(e[3]), c);
  }
}
function Jc(e, t) {
  var r = Ke(e);
  if (r) {
    for (var n = 0; n < 3; n++)
      ((r[n] = (r[n] * (1 - t)) | 0),
        r[n] > 255 ? (r[n] = 255) : r[n] < 0 && (r[n] = 0));
    return Ra(r, r.length === 4 ? "rgba" : "rgb");
  }
}
function Ab(e, t, r) {
  if (!(!(t && t.length) || !(e >= 0 && e <= 1))) {
    var n = e * (t.length - 1),
      i = Math.floor(n),
      a = Math.ceil(n),
      o = Ke(t[i]),
      s = Ke(t[a]),
      l = n - i,
      u = Ra(
        [
          Er(Xa(o[0], s[0], l)),
          Er(Xa(o[1], s[1], l)),
          Er(Xa(o[2], s[2], l)),
          Ju(Xa(o[3], s[3], l)),
        ],
        "rgba",
      );
    return r ? { color: u, leftIndex: i, rightIndex: a, value: n } : u;
  }
}
function rf(e, t, r, n) {
  var i = Ke(e);
  if (e)
    return (
      (i = Mb(i)),
      r != null && (i[1] = Mn(Q(r) ? r(i[1]) : r)),
      n != null && (i[2] = Mn(Q(n) ? n(i[2]) : n)),
      Ra(ef(i), "rgba")
    );
}
function Ra(e, t) {
  if (!(!e || !e.length)) {
    var r = e[0] + "," + e[1] + "," + e[2];
    return (
      (t === "rgba" || t === "hsva" || t === "hsla") && (r += "," + e[3]),
      t + "(" + r + ")"
    );
  }
}
function ns(e, t) {
  var r = Ke(e);
  return r
    ? ((0.299 * r[0] + 0.587 * r[1] + 0.114 * r[2]) * r[3]) / 255 +
        (1 - r[3]) * t
    : 0;
}
var tv = new hi(100);
function ev(e) {
  if (U(e)) {
    var t = tv.get(e);
    return (t || ((t = Jc(e, -0.1)), tv.put(e, t)), t);
  } else if (Gs(e)) {
    var r = B({}, e);
    return (
      (r.colorStops = q(e.colorStops, function (n) {
        return { offset: n.offset, color: Jc(n.color, -0.1) };
      })),
      r
    );
  }
  return e;
}
function Lb(e) {
  return e.type === "linear";
}
function Ib(e) {
  return e.type === "radial";
}
(function () {
  return tt.hasGlobalWindow && Q(window.btoa)
    ? function (e) {
        return window.btoa(unescape(encodeURIComponent(e)));
      }
    : typeof Buffer < "u"
      ? function (e) {
          return Buffer.from(e).toString("base64");
        }
      : function (e) {
          return null;
        };
})();
var nf = Array.prototype.slice;
function sr(e, t, r) {
  return (t - e) * r + e;
}
function Ml(e, t, r, n) {
  for (var i = t.length, a = 0; a < i; a++) e[a] = sr(t[a], r[a], n);
  return e;
}
function Pb(e, t, r, n) {
  for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++) e[o][s] = sr(t[o][s], r[o][s], n);
  }
  return e;
}
function Za(e, t, r, n) {
  for (var i = t.length, a = 0; a < i; a++) e[a] = t[a] + r[a] * n;
  return e;
}
function rv(e, t, r, n) {
  for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
    e[o] || (e[o] = []);
    for (var s = 0; s < a; s++) e[o][s] = t[o][s] + r[o][s] * n;
  }
  return e;
}
function kb(e, t) {
  for (
    var r = e.length,
      n = t.length,
      i = r > n ? t : e,
      a = Math.min(r, n),
      o = i[a - 1] || { color: [0, 0, 0, 0], offset: 0 },
      s = a;
    s < Math.max(r, n);
    s++
  )
    i.push({ offset: o.offset, color: o.color.slice() });
}
function Rb(e, t, r) {
  var n = e,
    i = t;
  if (!(!n.push || !i.push)) {
    var a = n.length,
      o = i.length;
    if (a !== o) {
      var s = a > o;
      if (s) n.length = o;
      else for (var l = a; l < o; l++) n.push(r === 1 ? i[l] : nf.call(i[l]));
    }
    for (var u = n[0] && n[0].length, l = 0; l < n.length; l++)
      if (r === 1) isNaN(n[l]) && (n[l] = i[l]);
      else for (var f = 0; f < u; f++) isNaN(n[l][f]) && (n[l][f] = i[l][f]);
  }
}
function No(e) {
  if (ae(e)) {
    var t = e.length;
    if (ae(e[0])) {
      for (var r = [], n = 0; n < t; n++) r.push(nf.call(e[n]));
      return r;
    }
    return nf.call(e);
  }
  return e;
}
function Fo(e) {
  return (
    (e[0] = Math.floor(e[0]) || 0),
    (e[1] = Math.floor(e[1]) || 0),
    (e[2] = Math.floor(e[2]) || 0),
    (e[3] = e[3] == null ? 1 : e[3]),
    "rgba(" + e.join(",") + ")"
  );
}
function Eb(e) {
  return ae(e && e[0]) ? 2 : 1;
}
var Ka = 0,
  zo = 1,
  im = 2,
  Yi = 3,
  af = 4,
  of = 5,
  nv = 6;
function iv(e) {
  return e === af || e === of;
}
function ja(e) {
  return e === zo || e === im;
}
var Ti = [0, 0, 0, 0],
  Ob = (function () {
    function e(t) {
      ((this.keyframes = []),
        (this.discrete = !1),
        (this._invalid = !1),
        (this._needsSort = !1),
        (this._lastFr = 0),
        (this._lastFrP = 0),
        (this.propName = t));
    }
    return (
      (e.prototype.isFinished = function () {
        return this._finished;
      }),
      (e.prototype.setFinished = function () {
        ((this._finished = !0),
          this._additiveTrack && this._additiveTrack.setFinished());
      }),
      (e.prototype.needsAnimate = function () {
        return this.keyframes.length >= 1;
      }),
      (e.prototype.getAdditiveTrack = function () {
        return this._additiveTrack;
      }),
      (e.prototype.addKeyframe = function (t, r, n) {
        this._needsSort = !0;
        var i = this.keyframes,
          a = i.length,
          o = !1,
          s = nv,
          l = r;
        if (ae(r)) {
          var u = Eb(r);
          ((s = u),
            ((u === 1 && !vt(r[0])) || (u === 2 && !vt(r[0][0]))) && (o = !0));
        } else if (vt(r) && !da(r)) s = Ka;
        else if (U(r))
          if (!isNaN(+r)) s = Ka;
          else {
            var f = Ke(r);
            f && ((l = f), (s = Yi));
          }
        else if (Gs(r)) {
          var h = B({}, l);
          ((h.colorStops = q(r.colorStops, function (c) {
            return { offset: c.offset, color: Ke(c.color) };
          })),
            Lb(r) ? (s = af) : Ib(r) && (s = of),
            (l = h));
        }
        (a === 0
          ? (this.valType = s)
          : (s !== this.valType || s === nv) && (o = !0),
          (this.discrete = this.discrete || o));
        var v = { time: t, value: l, rawValue: r, percent: 0 };
        return (
          n && ((v.easing = n), (v.easingFunc = Q(n) ? n : ra[n] || rm(n))),
          i.push(v),
          v
        );
      }),
      (e.prototype.prepare = function (t, r) {
        var n = this.keyframes;
        this._needsSort &&
          n.sort(function (p, m) {
            return p.time - m.time;
          });
        for (
          var i = this.valType,
            a = n.length,
            o = n[a - 1],
            s = this.discrete,
            l = ja(i),
            u = iv(i),
            f = 0;
          f < a;
          f++
        ) {
          var h = n[f],
            v = h.value,
            c = o.value;
          ((h.percent = h.time / t),
            s ||
              (l && f !== a - 1
                ? Rb(v, c, i)
                : u && kb(v.colorStops, c.colorStops)));
        }
        if (
          !s &&
          i !== of &&
          r &&
          this.needsAnimate() &&
          r.needsAnimate() &&
          i === r.valType &&
          !r._finished
        ) {
          this._additiveTrack = r;
          for (var d = n[0].value, f = 0; f < a; f++)
            i === Ka
              ? (n[f].additiveValue = n[f].value - d)
              : i === Yi
                ? (n[f].additiveValue = Za([], n[f].value, d, -1))
                : ja(i) &&
                  (n[f].additiveValue =
                    i === zo
                      ? Za([], n[f].value, d, -1)
                      : rv([], n[f].value, d, -1));
        }
      }),
      (e.prototype.step = function (t, r) {
        if (!this._finished) {
          this._additiveTrack &&
            this._additiveTrack._finished &&
            (this._additiveTrack = null);
          var n = this._additiveTrack != null,
            i = n ? "additiveValue" : "value",
            a = this.valType,
            o = this.keyframes,
            s = o.length,
            l = this.propName,
            u = a === Yi,
            f,
            h = this._lastFr,
            v = Math.min,
            c,
            d;
          if (s === 1) c = d = o[0];
          else {
            if (r < 0) f = 0;
            else if (r < this._lastFrP) {
              var p = v(h + 1, s - 1);
              for (f = p; f >= 0 && !(o[f].percent <= r); f--);
              f = v(f, s - 2);
            } else {
              for (f = h; f < s && !(o[f].percent > r); f++);
              f = v(f - 1, s - 2);
            }
            ((d = o[f + 1]), (c = o[f]));
          }
          if (c && d) {
            ((this._lastFr = f), (this._lastFrP = r));
            var m = d.percent - c.percent,
              g = m === 0 ? 1 : v((r - c.percent) / m, 1);
            d.easingFunc && (g = d.easingFunc(g));
            var y = n ? this._additiveValue : u ? Ti : t[l];
            if (
              ((ja(a) || u) && !y && (y = this._additiveValue = []),
              this.discrete)
            )
              t[l] = g < 1 ? c.rawValue : d.rawValue;
            else if (ja(a))
              a === zo ? Ml(y, c[i], d[i], g) : Pb(y, c[i], d[i], g);
            else if (iv(a)) {
              var _ = c[i],
                b = d[i],
                w = a === af;
              ((t[l] = {
                type: w ? "linear" : "radial",
                x: sr(_.x, b.x, g),
                y: sr(_.y, b.y, g),
                colorStops: q(_.colorStops, function (x, T) {
                  var D = b.colorStops[T];
                  return {
                    offset: sr(x.offset, D.offset, g),
                    color: Fo(Ml([], x.color, D.color, g)),
                  };
                }),
                global: b.global,
              }),
                w
                  ? ((t[l].x2 = sr(_.x2, b.x2, g)),
                    (t[l].y2 = sr(_.y2, b.y2, g)))
                  : (t[l].r = sr(_.r, b.r, g)));
            } else if (u) (Ml(y, c[i], d[i], g), n || (t[l] = Fo(y)));
            else {
              var S = sr(c[i], d[i], g);
              n ? (this._additiveValue = S) : (t[l] = S);
            }
            n && this._addToTarget(t);
          }
        }
      }),
      (e.prototype._addToTarget = function (t) {
        var r = this.valType,
          n = this.propName,
          i = this._additiveValue;
        r === Ka
          ? (t[n] = t[n] + i)
          : r === Yi
            ? (Ke(t[n], Ti), Za(Ti, Ti, i, 1), (t[n] = Fo(Ti)))
            : r === zo
              ? Za(t[n], t[n], i, 1)
              : r === im && rv(t[n], t[n], i, 1);
      }),
      e
    );
  })(),
  Mh = (function () {
    function e(t, r, n, i) {
      if (
        ((this._tracks = {}),
        (this._trackKeys = []),
        (this._maxTime = 0),
        (this._started = 0),
        (this._clip = null),
        (this._target = t),
        (this._loop = r),
        r && i)
      ) {
        _h("Can' use additive animation on looped animation.");
        return;
      }
      ((this._additiveAnimators = i), (this._allowDiscrete = n));
    }
    return (
      (e.prototype.getMaxTime = function () {
        return this._maxTime;
      }),
      (e.prototype.getDelay = function () {
        return this._delay;
      }),
      (e.prototype.getLoop = function () {
        return this._loop;
      }),
      (e.prototype.getTarget = function () {
        return this._target;
      }),
      (e.prototype.changeTarget = function (t) {
        this._target = t;
      }),
      (e.prototype.when = function (t, r, n) {
        return this.whenWithKeys(t, r, yt(r), n);
      }),
      (e.prototype.whenWithKeys = function (t, r, n, i) {
        for (var a = this._tracks, o = 0; o < n.length; o++) {
          var s = n[o],
            l = a[s];
          if (!l) {
            l = a[s] = new Ob(s);
            var u = void 0,
              f = this._getAdditiveTrack(s);
            if (f) {
              var h = f.keyframes,
                v = h[h.length - 1];
              ((u = v && v.value), f.valType === Yi && u && (u = Fo(u)));
            } else u = this._target[s];
            if (u == null) continue;
            (t > 0 && l.addKeyframe(0, No(u), i), this._trackKeys.push(s));
          }
          l.addKeyframe(t, No(r[s]), i);
        }
        return ((this._maxTime = Math.max(this._maxTime, t)), this);
      }),
      (e.prototype.pause = function () {
        (this._clip.pause(), (this._paused = !0));
      }),
      (e.prototype.resume = function () {
        (this._clip.resume(), (this._paused = !1));
      }),
      (e.prototype.isPaused = function () {
        return !!this._paused;
      }),
      (e.prototype.duration = function (t) {
        return ((this._maxTime = t), (this._force = !0), this);
      }),
      (e.prototype._doneCallback = function () {
        (this._setTracksFinished(), (this._clip = null));
        var t = this._doneCbs;
        if (t) for (var r = t.length, n = 0; n < r; n++) t[n].call(this);
      }),
      (e.prototype._abortedCallback = function () {
        this._setTracksFinished();
        var t = this.animation,
          r = this._abortedCbs;
        if ((t && t.removeClip(this._clip), (this._clip = null), r))
          for (var n = 0; n < r.length; n++) r[n].call(this);
      }),
      (e.prototype._setTracksFinished = function () {
        for (
          var t = this._tracks, r = this._trackKeys, n = 0;
          n < r.length;
          n++
        )
          t[r[n]].setFinished();
      }),
      (e.prototype._getAdditiveTrack = function (t) {
        var r,
          n = this._additiveAnimators;
        if (n)
          for (var i = 0; i < n.length; i++) {
            var a = n[i].getTrack(t);
            a && (r = a);
          }
        return r;
      }),
      (e.prototype.start = function (t) {
        if (!(this._started > 0)) {
          this._started = 1;
          for (
            var r = this, n = [], i = this._maxTime || 0, a = 0;
            a < this._trackKeys.length;
            a++
          ) {
            var o = this._trackKeys[a],
              s = this._tracks[o],
              l = this._getAdditiveTrack(o),
              u = s.keyframes,
              f = u.length;
            if ((s.prepare(i, l), s.needsAnimate()))
              if (!this._allowDiscrete && s.discrete) {
                var h = u[f - 1];
                (h && (r._target[s.propName] = h.rawValue), s.setFinished());
              } else n.push(s);
          }
          if (n.length || this._force) {
            var v = new Db({
              life: i,
              loop: this._loop,
              delay: this._delay || 0,
              onframe: function (c) {
                r._started = 2;
                var d = r._additiveAnimators;
                if (d) {
                  for (var p = !1, m = 0; m < d.length; m++)
                    if (d[m]._clip) {
                      p = !0;
                      break;
                    }
                  p || (r._additiveAnimators = null);
                }
                for (var m = 0; m < n.length; m++) n[m].step(r._target, c);
                var g = r._onframeCbs;
                if (g) for (var m = 0; m < g.length; m++) g[m](r._target, c);
              },
              ondestroy: function () {
                r._doneCallback();
              },
            });
            ((this._clip = v),
              this.animation && this.animation.addClip(v),
              t && v.setEasing(t));
          } else this._doneCallback();
          return this;
        }
      }),
      (e.prototype.stop = function (t) {
        if (this._clip) {
          var r = this._clip;
          (t && r.onframe(1), this._abortedCallback());
        }
      }),
      (e.prototype.delay = function (t) {
        return ((this._delay = t), this);
      }),
      (e.prototype.during = function (t) {
        return (
          t &&
            (this._onframeCbs || (this._onframeCbs = []),
            this._onframeCbs.push(t)),
          this
        );
      }),
      (e.prototype.done = function (t) {
        return (
          t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)),
          this
        );
      }),
      (e.prototype.aborted = function (t) {
        return (
          t &&
            (this._abortedCbs || (this._abortedCbs = []),
            this._abortedCbs.push(t)),
          this
        );
      }),
      (e.prototype.getClip = function () {
        return this._clip;
      }),
      (e.prototype.getTrack = function (t) {
        return this._tracks[t];
      }),
      (e.prototype.getTracks = function () {
        var t = this;
        return q(this._trackKeys, function (r) {
          return t._tracks[r];
        });
      }),
      (e.prototype.stopTracks = function (t, r) {
        if (!t.length || !this._clip) return !0;
        for (
          var n = this._tracks, i = this._trackKeys, a = 0;
          a < t.length;
          a++
        ) {
          var o = n[t[a]];
          o &&
            !o.isFinished() &&
            (r
              ? o.step(this._target, 1)
              : this._started === 1 && o.step(this._target, 0),
            o.setFinished());
        }
        for (var s = !0, a = 0; a < i.length; a++)
          if (!n[i[a]].isFinished()) {
            s = !1;
            break;
          }
        return (s && this._abortedCallback(), s);
      }),
      (e.prototype.saveTo = function (t, r, n) {
        if (t) {
          r = r || this._trackKeys;
          for (var i = 0; i < r.length; i++) {
            var a = r[i],
              o = this._tracks[a];
            if (!(!o || o.isFinished())) {
              var s = o.keyframes,
                l = s[n ? 0 : s.length - 1];
              l && (t[a] = No(l.rawValue));
            }
          }
        }
      }),
      (e.prototype.__changeFinalValue = function (t, r) {
        r = r || yt(t);
        for (var n = 0; n < r.length; n++) {
          var i = r[n],
            a = this._tracks[i];
          if (a) {
            var o = a.keyframes;
            if (o.length > 1) {
              var s = o.pop();
              (a.addKeyframe(s.time, t[i]),
                a.prepare(this._maxTime, a.getAdditiveTrack()));
            }
          }
        }
      }),
      e
    );
  })(),
  er = (function () {
    function e(t) {
      t && (this._$eventProcessor = t);
    }
    return (
      (e.prototype.on = function (t, r, n, i) {
        this._$handlers || (this._$handlers = {});
        var a = this._$handlers;
        if (
          (typeof r == "function" && ((i = n), (n = r), (r = null)), !n || !t)
        )
          return this;
        var o = this._$eventProcessor;
        (r != null && o && o.normalizeQuery && (r = o.normalizeQuery(r)),
          a[t] || (a[t] = []));
        for (var s = 0; s < a[t].length; s++) if (a[t][s].h === n) return this;
        var l = {
            h: n,
            query: r,
            ctx: i || this,
            callAtLast: n.zrEventfulCallAtLast,
          },
          u = a[t].length - 1,
          f = a[t][u];
        return (f && f.callAtLast ? a[t].splice(u, 0, l) : a[t].push(l), this);
      }),
      (e.prototype.isSilent = function (t) {
        var r = this._$handlers;
        return !r || !r[t] || !r[t].length;
      }),
      (e.prototype.off = function (t, r) {
        var n = this._$handlers;
        if (!n) return this;
        if (!t) return ((this._$handlers = {}), this);
        if (r) {
          if (n[t]) {
            for (var i = [], a = 0, o = n[t].length; a < o; a++)
              n[t][a].h !== r && i.push(n[t][a]);
            n[t] = i;
          }
          n[t] && n[t].length === 0 && delete n[t];
        } else delete n[t];
        return this;
      }),
      (e.prototype.trigger = function (t) {
        for (var r = [], n = 1; n < arguments.length; n++)
          r[n - 1] = arguments[n];
        if (!this._$handlers) return this;
        var i = this._$handlers[t],
          a = this._$eventProcessor;
        if (i)
          for (var o = r.length, s = i.length, l = 0; l < s; l++) {
            var u = i[l];
            if (!(a && a.filter && u.query != null && !a.filter(t, u.query)))
              switch (o) {
                case 0:
                  u.h.call(u.ctx);
                  break;
                case 1:
                  u.h.call(u.ctx, r[0]);
                  break;
                case 2:
                  u.h.call(u.ctx, r[0], r[1]);
                  break;
                default:
                  u.h.apply(u.ctx, r);
                  break;
              }
          }
        return (a && a.afterTrigger && a.afterTrigger(t), this);
      }),
      (e.prototype.triggerWithContext = function (t) {
        for (var r = [], n = 1; n < arguments.length; n++)
          r[n - 1] = arguments[n];
        if (!this._$handlers) return this;
        var i = this._$handlers[t],
          a = this._$eventProcessor;
        if (i)
          for (
            var o = r.length, s = r[o - 1], l = i.length, u = 0;
            u < l;
            u++
          ) {
            var f = i[u];
            if (!(a && a.filter && f.query != null && !a.filter(t, f.query)))
              switch (o) {
                case 0:
                  f.h.call(s);
                  break;
                case 1:
                  f.h.call(s, r[0]);
                  break;
                case 2:
                  f.h.call(s, r[0], r[1]);
                  break;
                default:
                  f.h.apply(s, r.slice(1, o - 1));
                  break;
              }
          }
        return (a && a.afterTrigger && a.afterTrigger(t), this);
      }),
      e
    );
  })(),
  am = 1;
tt.hasGlobalWindow &&
  (am = Math.max(
    window.devicePixelRatio ||
      (window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI) ||
      1,
    1,
  ));
var is = am,
  sf = 0.4,
  lf = "#333",
  uf = "#ccc",
  Bb = "#eee",
  le = 1,
  $i = 2,
  ei = 4,
  Al = "__zr_normal__",
  Ll = ga.concat(["ignore"]),
  Nb = Fr(
    ga,
    function (e, t) {
      return ((e[t] = !0), e);
    },
    { ignore: !1 },
  ),
  Gn = {},
  Fb = new et(0, 0, 0, 0),
  Qa = [],
  Ys = (function () {
    function e(t) {
      ((this.id = Bg()),
        (this.animators = []),
        (this.currentStates = []),
        (this.states = {}),
        this._init(t));
    }
    return (
      (e.prototype._init = function (t) {
        this.attr(t);
      }),
      (e.prototype.drift = function (t, r, n) {
        switch (this.draggable) {
          case "horizontal":
            r = 0;
            break;
          case "vertical":
            t = 0;
            break;
        }
        var i = this.transform;
        (i || (i = this.transform = [1, 0, 0, 1, 0, 0]),
          (i[4] += t),
          (i[5] += r),
          this.decomposeTransform(),
          this.markRedraw());
      }),
      (e.prototype.beforeUpdate = function () {}),
      (e.prototype.afterUpdate = function () {}),
      (e.prototype.update = function () {
        (this.updateTransform(), this.__dirty && this.updateInnerText());
      }),
      (e.prototype.updateInnerText = function (t) {
        var r = this._textContent;
        if (r && (!r.ignore || t)) {
          this.textConfig || (this.textConfig = {});
          var n = this.textConfig,
            i = n.local,
            a = r.innerTransformable,
            o = void 0,
            s = void 0,
            l = !1;
          a.parent = i ? this : null;
          var u = !1;
          a.copyTransform(r);
          var f = n.position != null,
            h = n.autoOverflowArea,
            v = void 0;
          if (
            ((h || f) &&
              ((v = Fb),
              n.layoutRect
                ? v.copy(n.layoutRect)
                : v.copy(this.getBoundingRect()),
              i || v.applyTransform(this.transform)),
            f)
          ) {
            (this.calculateTextPosition
              ? this.calculateTextPosition(Gn, n, v)
              : Qo(Gn, n, v),
              (a.x = Gn.x),
              (a.y = Gn.y),
              (o = Gn.align),
              (s = Gn.verticalAlign));
            var c = n.origin;
            if (c && n.rotation != null) {
              var d = void 0,
                p = void 0;
              (c === "center"
                ? ((d = v.width * 0.5), (p = v.height * 0.5))
                : ((d = zr(c[0], v.width)), (p = zr(c[1], v.height))),
                (u = !0),
                (a.originX = -a.x + d + (i ? 0 : v.x)),
                (a.originY = -a.y + p + (i ? 0 : v.y)));
            }
          }
          n.rotation != null && (a.rotation = n.rotation);
          var m = n.offset;
          m &&
            ((a.x += m[0]),
            (a.y += m[1]),
            u || ((a.originX = -m[0]), (a.originY = -m[1])));
          var g =
            this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
          if (h) {
            var y = (g.overflowRect = g.overflowRect || new et(0, 0, 0, 0));
            (a.getLocalTransform(Qa),
              ka(Qa, Qa),
              et.copy(y, v),
              y.applyTransform(Qa));
          } else g.overflowRect = null;
          var _ =
              n.inside == null
                ? typeof n.position == "string" &&
                  n.position.indexOf("inside") >= 0
                : n.inside,
            b = void 0,
            w = void 0,
            S = void 0;
          (_ && this.canBeInsideText()
            ? ((b = n.insideFill),
              (w = n.insideStroke),
              (b == null || b === "auto") && (b = this.getInsideTextFill()),
              (w == null || w === "auto") &&
                ((w = this.getInsideTextStroke(b)), (S = !0)))
            : ((b = n.outsideFill),
              (w = n.outsideStroke),
              (b == null || b === "auto") && (b = this.getOutsideFill()),
              (w == null || w === "auto") &&
                ((w = this.getOutsideStroke(b)), (S = !0))),
            (b = b || "#000"),
            (b !== g.fill ||
              w !== g.stroke ||
              S !== g.autoStroke ||
              o !== g.align ||
              s !== g.verticalAlign) &&
              ((l = !0),
              (g.fill = b),
              (g.stroke = w),
              (g.autoStroke = S),
              (g.align = o),
              (g.verticalAlign = s),
              r.setDefaultTextStyle(g)),
            (r.__dirty |= le),
            l && r.dirtyStyle(!0));
        }
      }),
      (e.prototype.canBeInsideText = function () {
        return !0;
      }),
      (e.prototype.getInsideTextFill = function () {
        return "#fff";
      }),
      (e.prototype.getInsideTextStroke = function (t) {
        return "#000";
      }),
      (e.prototype.getOutsideFill = function () {
        return this.__zr && this.__zr.isDarkMode() ? uf : lf;
      }),
      (e.prototype.getOutsideStroke = function (t) {
        var r = this.__zr && this.__zr.getBackgroundColor(),
          n = typeof r == "string" && Ke(r);
        n || (n = [255, 255, 255, 1]);
        for (var i = n[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
          n[o] = n[o] * i + (a ? 0 : 255) * (1 - i);
        return ((n[3] = 1), Ra(n, "rgba"));
      }),
      (e.prototype.traverse = function (t, r) {}),
      (e.prototype.attrKV = function (t, r) {
        t === "textConfig"
          ? this.setTextConfig(r)
          : t === "textContent"
            ? this.setTextContent(r)
            : t === "clipPath"
              ? this.setClipPath(r)
              : t === "extra"
                ? ((this.extra = this.extra || {}), B(this.extra, r))
                : (this[t] = r);
      }),
      (e.prototype.hide = function () {
        ((this.ignore = !0), this.markRedraw());
      }),
      (e.prototype.show = function () {
        ((this.ignore = !1), this.markRedraw());
      }),
      (e.prototype.attr = function (t, r) {
        if (typeof t == "string") this.attrKV(t, r);
        else if (X(t))
          for (var n = t, i = yt(n), a = 0; a < i.length; a++) {
            var o = i[a];
            this.attrKV(o, t[o]);
          }
        return (this.markRedraw(), this);
      }),
      (e.prototype.saveCurrentToNormalState = function (t) {
        this._innerSaveToNormal(t);
        for (var r = this._normalState, n = 0; n < this.animators.length; n++) {
          var i = this.animators[n],
            a = i.__fromStateTransition;
          if (!(i.getLoop() || (a && a !== Al))) {
            var o = i.targetName,
              s = o ? r[o] : r;
            i.saveTo(s);
          }
        }
      }),
      (e.prototype._innerSaveToNormal = function (t) {
        var r = this._normalState;
        (r || (r = this._normalState = {}),
          t.textConfig && !r.textConfig && (r.textConfig = this.textConfig),
          this._savePrimaryToNormal(t, r, Ll));
      }),
      (e.prototype._savePrimaryToNormal = function (t, r, n) {
        for (var i = 0; i < n.length; i++) {
          var a = n[i];
          t[a] != null && !(a in r) && (r[a] = this[a]);
        }
      }),
      (e.prototype.hasState = function () {
        return this.currentStates.length > 0;
      }),
      (e.prototype.getState = function (t) {
        return this.states[t];
      }),
      (e.prototype.ensureState = function (t) {
        var r = this.states;
        return (r[t] || (r[t] = {}), r[t]);
      }),
      (e.prototype.clearStates = function (t) {
        this.useState(Al, !1, t);
      }),
      (e.prototype.useState = function (t, r, n, i) {
        var a = t === Al,
          o = this.hasState();
        if (!(!o && a)) {
          var s = this.currentStates,
            l = this.stateTransition;
          if (!(st(s, t) >= 0 && (r || s.length === 1))) {
            var u;
            if (
              (this.stateProxy && !a && (u = this.stateProxy(t)),
              u || (u = this.states && this.states[t]),
              !u && !a)
            ) {
              _h("State " + t + " not exists.");
              return;
            }
            a || this.saveCurrentToNormalState(u);
            var f = !!((u && u.hoverLayer) || i);
            (f && this._toggleHoverLayerFlag(!0),
              this._applyStateObj(
                t,
                u,
                this._normalState,
                r,
                !n && !this.__inHover && l && l.duration > 0,
                l,
              ));
            var h = this._textContent,
              v = this._textGuide;
            return (
              h && h.useState(t, r, n, f),
              v && v.useState(t, r, n, f),
              a
                ? ((this.currentStates = []), (this._normalState = {}))
                : r
                  ? this.currentStates.push(t)
                  : (this.currentStates = [t]),
              this._updateAnimationTargets(),
              this.markRedraw(),
              !f &&
                this.__inHover &&
                (this._toggleHoverLayerFlag(!1), (this.__dirty &= ~le)),
              u
            );
          }
        }
      }),
      (e.prototype.useStates = function (t, r, n) {
        if (!t.length) this.clearStates();
        else {
          var i = [],
            a = this.currentStates,
            o = t.length,
            s = o === a.length;
          if (s) {
            for (var l = 0; l < o; l++)
              if (t[l] !== a[l]) {
                s = !1;
                break;
              }
          }
          if (s) return;
          for (var l = 0; l < o; l++) {
            var u = t[l],
              f = void 0;
            (this.stateProxy && (f = this.stateProxy(u, t)),
              f || (f = this.states[u]),
              f && i.push(f));
          }
          var h = i[o - 1],
            v = !!((h && h.hoverLayer) || n);
          v && this._toggleHoverLayerFlag(!0);
          var c = this._mergeStates(i),
            d = this.stateTransition;
          (this.saveCurrentToNormalState(c),
            this._applyStateObj(
              t.join(","),
              c,
              this._normalState,
              !1,
              !r && !this.__inHover && d && d.duration > 0,
              d,
            ));
          var p = this._textContent,
            m = this._textGuide;
          (p && p.useStates(t, r, v),
            m && m.useStates(t, r, v),
            this._updateAnimationTargets(),
            (this.currentStates = t.slice()),
            this.markRedraw(),
            !v &&
              this.__inHover &&
              (this._toggleHoverLayerFlag(!1), (this.__dirty &= ~le)));
        }
      }),
      (e.prototype.isSilent = function () {
        for (var t = this; t; ) {
          if (t.silent) return !0;
          var r = t.__hostTarget;
          t = r ? (t.ignoreHostSilent ? null : r) : t.parent;
        }
        return !1;
      }),
      (e.prototype._updateAnimationTargets = function () {
        for (var t = 0; t < this.animators.length; t++) {
          var r = this.animators[t];
          r.targetName && r.changeTarget(this[r.targetName]);
        }
      }),
      (e.prototype.removeState = function (t) {
        var r = st(this.currentStates, t);
        if (r >= 0) {
          var n = this.currentStates.slice();
          (n.splice(r, 1), this.useStates(n));
        }
      }),
      (e.prototype.replaceState = function (t, r, n) {
        var i = this.currentStates.slice(),
          a = st(i, t),
          o = st(i, r) >= 0;
        (a >= 0 ? (o ? i.splice(a, 1) : (i[a] = r)) : n && !o && i.push(r),
          this.useStates(i));
      }),
      (e.prototype.toggleState = function (t, r) {
        r ? this.useState(t, !0) : this.removeState(t);
      }),
      (e.prototype._mergeStates = function (t) {
        for (var r = {}, n, i = 0; i < t.length; i++) {
          var a = t[i];
          (B(r, a), a.textConfig && ((n = n || {}), B(n, a.textConfig)));
        }
        return (n && (r.textConfig = n), r);
      }),
      (e.prototype._applyStateObj = function (t, r, n, i, a, o) {
        var s = !(r && i);
        r && r.textConfig
          ? ((this.textConfig = B({}, i ? this.textConfig : n.textConfig)),
            B(this.textConfig, r.textConfig))
          : s && n.textConfig && (this.textConfig = n.textConfig);
        for (var l = {}, u = !1, f = 0; f < Ll.length; f++) {
          var h = Ll[f],
            v = a && Nb[h];
          r && r[h] != null
            ? v
              ? ((u = !0), (l[h] = r[h]))
              : (this[h] = r[h])
            : s &&
              n[h] != null &&
              (v ? ((u = !0), (l[h] = n[h])) : (this[h] = n[h]));
        }
        if (!a)
          for (var f = 0; f < this.animators.length; f++) {
            var c = this.animators[f],
              d = c.targetName;
            c.getLoop() || c.__changeFinalValue(d ? (r || n)[d] : r || n);
          }
        u && this._transitionState(t, l, o);
      }),
      (e.prototype._attachComponent = function (t) {
        if (!(t.__zr && !t.__hostTarget) && t !== this) {
          var r = this.__zr;
          (r && t.addSelfToZr(r), (t.__zr = r), (t.__hostTarget = this));
        }
      }),
      (e.prototype._detachComponent = function (t) {
        (t.__zr && t.removeSelfFromZr(t.__zr),
          (t.__zr = null),
          (t.__hostTarget = null));
      }),
      (e.prototype.getClipPath = function () {
        return this._clipPath;
      }),
      (e.prototype.setClipPath = function (t) {
        (this._clipPath && this._clipPath !== t && this.removeClipPath(),
          this._attachComponent(t),
          (this._clipPath = t),
          this.markRedraw());
      }),
      (e.prototype.removeClipPath = function () {
        var t = this._clipPath;
        t &&
          (this._detachComponent(t),
          (this._clipPath = null),
          this.markRedraw());
      }),
      (e.prototype.getTextContent = function () {
        return this._textContent;
      }),
      (e.prototype.setTextContent = function (t) {
        var r = this._textContent;
        r !== t &&
          (r && r !== t && this.removeTextContent(),
          (t.innerTransformable = new Dh()),
          this._attachComponent(t),
          (this._textContent = t),
          this.markRedraw());
      }),
      (e.prototype.setTextConfig = function (t) {
        (this.textConfig || (this.textConfig = {}),
          B(this.textConfig, t),
          this.markRedraw());
      }),
      (e.prototype.removeTextConfig = function () {
        ((this.textConfig = null), this.markRedraw());
      }),
      (e.prototype.removeTextContent = function () {
        var t = this._textContent;
        t &&
          ((t.innerTransformable = null),
          this._detachComponent(t),
          (this._textContent = null),
          (this._innerTextDefaultStyle = null),
          this.markRedraw());
      }),
      (e.prototype.getTextGuideLine = function () {
        return this._textGuide;
      }),
      (e.prototype.setTextGuideLine = function (t) {
        (this._textGuide && this._textGuide !== t && this.removeTextGuideLine(),
          this._attachComponent(t),
          (this._textGuide = t),
          this.markRedraw());
      }),
      (e.prototype.removeTextGuideLine = function () {
        var t = this._textGuide;
        t &&
          (this._detachComponent(t),
          (this._textGuide = null),
          this.markRedraw());
      }),
      (e.prototype.markRedraw = function () {
        this.__dirty |= le;
        var t = this.__zr;
        (t && (this.__inHover ? t.refreshHover() : t.refresh()),
          this.__hostTarget && this.__hostTarget.markRedraw());
      }),
      (e.prototype.dirty = function () {
        this.markRedraw();
      }),
      (e.prototype._toggleHoverLayerFlag = function (t) {
        this.__inHover = t;
        var r = this._textContent,
          n = this._textGuide;
        (r && (r.__inHover = t), n && (n.__inHover = t));
      }),
      (e.prototype.addSelfToZr = function (t) {
        if (this.__zr !== t) {
          this.__zr = t;
          var r = this.animators;
          if (r)
            for (var n = 0; n < r.length; n++) t.animation.addAnimator(r[n]);
          (this._clipPath && this._clipPath.addSelfToZr(t),
            this._textContent && this._textContent.addSelfToZr(t),
            this._textGuide && this._textGuide.addSelfToZr(t));
        }
      }),
      (e.prototype.removeSelfFromZr = function (t) {
        if (this.__zr) {
          this.__zr = null;
          var r = this.animators;
          if (r)
            for (var n = 0; n < r.length; n++) t.animation.removeAnimator(r[n]);
          (this._clipPath && this._clipPath.removeSelfFromZr(t),
            this._textContent && this._textContent.removeSelfFromZr(t),
            this._textGuide && this._textGuide.removeSelfFromZr(t));
        }
      }),
      (e.prototype.animate = function (t, r, n) {
        var i = t ? this[t] : this,
          a = new Mh(i, r, n);
        return (t && (a.targetName = t), this.addAnimator(a, t), a);
      }),
      (e.prototype.addAnimator = function (t, r) {
        var n = this.__zr,
          i = this;
        (t
          .during(function () {
            i.updateDuringAnimation(r);
          })
          .done(function () {
            var a = i.animators,
              o = st(a, t);
            o >= 0 && a.splice(o, 1);
          }),
          this.animators.push(t),
          n && n.animation.addAnimator(t),
          n && n.wakeUp());
      }),
      (e.prototype.updateDuringAnimation = function (t) {
        this.markRedraw();
      }),
      (e.prototype.stopAnimation = function (t, r) {
        for (var n = this.animators, i = n.length, a = [], o = 0; o < i; o++) {
          var s = n[o];
          !t || t === s.scope ? s.stop(r) : a.push(s);
        }
        return ((this.animators = a), this);
      }),
      (e.prototype.animateTo = function (t, r, n) {
        Il(this, t, r, n);
      }),
      (e.prototype.animateFrom = function (t, r, n) {
        Il(this, t, r, n, !0);
      }),
      (e.prototype._transitionState = function (t, r, n, i) {
        for (var a = Il(this, r, n, i), o = 0; o < a.length; o++)
          a[o].__fromStateTransition = t;
      }),
      (e.prototype.getBoundingRect = function () {
        return null;
      }),
      (e.prototype.getPaintRect = function () {
        return null;
      }),
      (e.initDefaultProps = (function () {
        var t = e.prototype;
        ((t.type = "element"),
          (t.name = ""),
          (t.ignore =
            t.silent =
            t.ignoreHostSilent =
            t.isGroup =
            t.draggable =
            t.dragging =
            t.ignoreClip =
            t.__inHover =
              !1),
          (t.__dirty = le));
        function r(n, i, a, o) {
          Object.defineProperty(t, n, {
            get: function () {
              if (!this[i]) {
                var l = (this[i] = []);
                s(this, l);
              }
              return this[i];
            },
            set: function (l) {
              ((this[a] = l[0]), (this[o] = l[1]), (this[i] = l), s(this, l));
            },
          });
          function s(l, u) {
            (Object.defineProperty(u, 0, {
              get: function () {
                return l[a];
              },
              set: function (f) {
                l[a] = f;
              },
            }),
              Object.defineProperty(u, 1, {
                get: function () {
                  return l[o];
                },
                set: function (f) {
                  l[o] = f;
                },
              }));
          }
        }
        Object.defineProperty &&
          (r("position", "_legacyPos", "x", "y"),
          r("scale", "_legacyScale", "scaleX", "scaleY"),
          r("origin", "_legacyOrigin", "originX", "originY"));
      })()),
      e
    );
  })();
tr(Ys, er);
tr(Ys, Dh);
function Il(e, t, r, n, i) {
  r = r || {};
  var a = [];
  om(e, "", e, t, r, n, a, i);
  var o = a.length,
    s = !1,
    l = r.done,
    u = r.aborted,
    f = function () {
      ((s = !0), o--, o <= 0 && (s ? l && l() : u && u()));
    },
    h = function () {
      (o--, o <= 0 && (s ? l && l() : u && u()));
    };
  (o || (l && l()),
    a.length > 0 &&
      r.during &&
      a[0].during(function (d, p) {
        r.during(p);
      }));
  for (var v = 0; v < a.length; v++) {
    var c = a[v];
    (f && c.done(f),
      h && c.aborted(h),
      r.force && c.duration(r.duration),
      c.start(r.easing));
  }
  return a;
}
function Pl(e, t, r) {
  for (var n = 0; n < r; n++) e[n] = t[n];
}
function zb(e) {
  return ae(e[0]);
}
function Gb(e, t, r) {
  if (ae(t[r]))
    if ((ae(e[r]) || (e[r] = []), oe(t[r]))) {
      var n = t[r].length;
      e[r].length !== n &&
        ((e[r] = new t[r].constructor(n)), Pl(e[r], t[r], n));
    } else {
      var i = t[r],
        a = e[r],
        o = i.length;
      if (zb(i))
        for (var s = i[0].length, l = 0; l < o; l++)
          a[l] ? Pl(a[l], i[l], s) : (a[l] = Array.prototype.slice.call(i[l]));
      else Pl(a, i, o);
      a.length = i.length;
    }
  else e[r] = t[r];
}
function Hb(e, t) {
  return e === t || (ae(e) && ae(t) && Vb(e, t));
}
function Vb(e, t) {
  var r = e.length;
  if (r !== t.length) return !1;
  for (var n = 0; n < r; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function om(e, t, r, n, i, a, o, s) {
  for (
    var l = yt(n),
      u = i.duration,
      f = i.delay,
      h = i.additive,
      v = i.setToFinal,
      c = !X(a),
      d = e.animators,
      p = [],
      m = 0;
    m < l.length;
    m++
  ) {
    var g = l[m],
      y = n[g];
    if (y != null && r[g] != null && (c || a[g]))
      if (X(y) && !ae(y) && !Gs(y)) {
        if (t) {
          s || ((r[g] = y), e.updateDuringAnimation(t));
          continue;
        }
        om(e, g, r[g], y, i, a && a[g], o, s);
      } else p.push(g);
    else s || ((r[g] = y), e.updateDuringAnimation(t), p.push(g));
  }
  var _ = p.length;
  if (!h && _)
    for (var b = 0; b < d.length; b++) {
      var w = d[b];
      if (w.targetName === t) {
        var S = w.stopTracks(p);
        if (S) {
          var x = st(d, w);
          d.splice(x, 1);
        }
      }
    }
  if (
    (i.force ||
      ((p = kt(p, function (C) {
        return !Hb(n[C], r[C]);
      })),
      (_ = p.length)),
    _ > 0 || (i.force && !o.length))
  ) {
    var T = void 0,
      D = void 0,
      A = void 0;
    if (s) {
      ((D = {}), v && (T = {}));
      for (var b = 0; b < _; b++) {
        var g = p[b];
        ((D[g] = r[g]), v ? (T[g] = n[g]) : (r[g] = n[g]));
      }
    } else if (v) {
      A = {};
      for (var b = 0; b < _; b++) {
        var g = p[b];
        ((A[g] = No(r[g])), Gb(r, n, g));
      }
    }
    var w = new Mh(
      r,
      !1,
      !1,
      h
        ? kt(d, function (I) {
            return I.targetName === t;
          })
        : null,
    );
    ((w.targetName = t),
      i.scope && (w.scope = i.scope),
      v && T && w.whenWithKeys(0, T, p),
      A && w.whenWithKeys(0, A, p),
      w.whenWithKeys(u ?? 500, s ? D : n, p).delay(f || 0),
      e.addAnimator(w, t),
      o.push(w));
  }
}
var ff = "__zr_style_" + Math.round(Math.random() * 10),
  An = {
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "#000",
    opacity: 1,
    blend: "source-over",
  },
  $s = {
    style: {
      shadowBlur: !0,
      shadowOffsetX: !0,
      shadowOffsetY: !0,
      shadowColor: !0,
      opacity: !0,
    },
  };
An[ff] = !0;
var av = ["z", "z2", "invisible"],
  Wb = ["invisible"],
  Ea = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype._init = function (r) {
        for (var n = yt(r), i = 0; i < n.length; i++) {
          var a = n[i];
          a === "style"
            ? this.useStyle(r[a])
            : e.prototype.attrKV.call(this, a, r[a]);
        }
        this.style || this.useStyle({});
      }),
      (t.prototype.beforeBrush = function () {}),
      (t.prototype.afterBrush = function () {}),
      (t.prototype.innerBeforeBrush = function () {}),
      (t.prototype.innerAfterBrush = function () {}),
      (t.prototype.shouldBePainted = function (r, n, i, a) {
        var o = this.transform;
        if (
          this.ignore ||
          this.invisible ||
          this.style.opacity === 0 ||
          (this.culling && Ub(this, r, n)) ||
          (o && !o[0] && !o[3])
        )
          return !1;
        if (i && this.__clipPaths && this.__clipPaths.length) {
          for (var s = 0; s < this.__clipPaths.length; ++s)
            if (this.__clipPaths[s].isZeroArea()) return !1;
        }
        if (a && this.parent)
          for (var l = this.parent; l; ) {
            if (l.ignore) return !1;
            l = l.parent;
          }
        return !0;
      }),
      (t.prototype.contain = function (r, n) {
        return this.rectContain(r, n);
      }),
      (t.prototype.traverse = function (r, n) {
        r.call(n, this);
      }),
      (t.prototype.rectContain = function (r, n) {
        var i = this.transformCoordToLocal(r, n),
          a = this.getBoundingRect();
        return a.contain(i[0], i[1]);
      }),
      (t.prototype.getPaintRect = function () {
        var r = this._paintRect;
        if (!this._paintRect || this.__dirty) {
          var n = this.transform,
            i = this.getBoundingRect(),
            a = this.style,
            o = a.shadowBlur || 0,
            s = a.shadowOffsetX || 0,
            l = a.shadowOffsetY || 0;
          ((r = this._paintRect || (this._paintRect = new et(0, 0, 0, 0))),
            n ? et.applyTransform(r, i, n) : r.copy(i),
            (o || s || l) &&
              ((r.width += o * 2 + Math.abs(s)),
              (r.height += o * 2 + Math.abs(l)),
              (r.x = Math.min(r.x, r.x + s - o)),
              (r.y = Math.min(r.y, r.y + l - o))));
          var u = this.dirtyRectTolerance;
          r.isZero() ||
            ((r.x = Math.floor(r.x - u)),
            (r.y = Math.floor(r.y - u)),
            (r.width = Math.ceil(r.width + 1 + u * 2)),
            (r.height = Math.ceil(r.height + 1 + u * 2)));
        }
        return r;
      }),
      (t.prototype.setPrevPaintRect = function (r) {
        r
          ? ((this._prevPaintRect = this._prevPaintRect || new et(0, 0, 0, 0)),
            this._prevPaintRect.copy(r))
          : (this._prevPaintRect = null);
      }),
      (t.prototype.getPrevPaintRect = function () {
        return this._prevPaintRect;
      }),
      (t.prototype.animateStyle = function (r) {
        return this.animate("style", r);
      }),
      (t.prototype.updateDuringAnimation = function (r) {
        r === "style" ? this.dirtyStyle() : this.markRedraw();
      }),
      (t.prototype.attrKV = function (r, n) {
        r !== "style"
          ? e.prototype.attrKV.call(this, r, n)
          : this.style
            ? this.setStyle(n)
            : this.useStyle(n);
      }),
      (t.prototype.setStyle = function (r, n) {
        return (
          typeof r == "string" ? (this.style[r] = n) : B(this.style, r),
          this.dirtyStyle(),
          this
        );
      }),
      (t.prototype.dirtyStyle = function (r) {
        (r || this.markRedraw(),
          (this.__dirty |= $i),
          this._rect && (this._rect = null));
      }),
      (t.prototype.dirty = function () {
        this.dirtyStyle();
      }),
      (t.prototype.styleChanged = function () {
        return !!(this.__dirty & $i);
      }),
      (t.prototype.styleUpdated = function () {
        this.__dirty &= ~$i;
      }),
      (t.prototype.createStyle = function (r) {
        return Hs(An, r);
      }),
      (t.prototype.useStyle = function (r) {
        (r[ff] || (r = this.createStyle(r)),
          this.__inHover ? (this.__hoverStyle = r) : (this.style = r),
          this.dirtyStyle());
      }),
      (t.prototype.isStyleObject = function (r) {
        return r[ff];
      }),
      (t.prototype._innerSaveToNormal = function (r) {
        e.prototype._innerSaveToNormal.call(this, r);
        var n = this._normalState;
        (r.style &&
          !n.style &&
          (n.style = this._mergeStyle(this.createStyle(), this.style)),
          this._savePrimaryToNormal(r, n, av));
      }),
      (t.prototype._applyStateObj = function (r, n, i, a, o, s) {
        e.prototype._applyStateObj.call(this, r, n, i, a, o, s);
        var l = !(n && a),
          u;
        if (
          (n && n.style
            ? o
              ? a
                ? (u = n.style)
                : ((u = this._mergeStyle(this.createStyle(), i.style)),
                  this._mergeStyle(u, n.style))
              : ((u = this._mergeStyle(
                  this.createStyle(),
                  a ? this.style : i.style,
                )),
                this._mergeStyle(u, n.style))
            : l && (u = i.style),
          u)
        )
          if (o) {
            var f = this.style;
            if (((this.style = this.createStyle(l ? {} : f)), l))
              for (var h = yt(f), v = 0; v < h.length; v++) {
                var c = h[v];
                c in u && ((u[c] = u[c]), (this.style[c] = f[c]));
              }
            for (var d = yt(u), v = 0; v < d.length; v++) {
              var c = d[v];
              this.style[c] = this.style[c];
            }
            this._transitionState(
              r,
              { style: u },
              s,
              this.getAnimationStyleProps(),
            );
          } else this.useStyle(u);
        for (var p = this.__inHover ? Wb : av, v = 0; v < p.length; v++) {
          var c = p[v];
          n && n[c] != null
            ? (this[c] = n[c])
            : l && i[c] != null && (this[c] = i[c]);
        }
      }),
      (t.prototype._mergeStates = function (r) {
        for (
          var n = e.prototype._mergeStates.call(this, r), i, a = 0;
          a < r.length;
          a++
        ) {
          var o = r[a];
          o.style && ((i = i || {}), this._mergeStyle(i, o.style));
        }
        return (i && (n.style = i), n);
      }),
      (t.prototype._mergeStyle = function (r, n) {
        return (B(r, n), r);
      }),
      (t.prototype.getAnimationStyleProps = function () {
        return $s;
      }),
      (t.initDefaultProps = (function () {
        var r = t.prototype;
        ((r.type = "displayable"),
          (r.invisible = !1),
          (r.z = 0),
          (r.z2 = 0),
          (r.zlevel = 0),
          (r.culling = !1),
          (r.cursor = "pointer"),
          (r.rectHover = !1),
          (r.incremental = !1),
          (r._rect = null),
          (r.dirtyRectTolerance = 0),
          (r.__dirty = le | $i));
      })()),
      t
    );
  })(Ys),
  kl = new et(0, 0, 0, 0),
  Rl = new et(0, 0, 0, 0);
function Ub(e, t, r) {
  return (
    kl.copy(e.getBoundingRect()),
    e.transform && kl.applyTransform(e.transform),
    (Rl.width = t),
    (Rl.height = r),
    !kl.intersect(Rl)
  );
}
var me = Math.min,
  ye = Math.max,
  El = Math.sin,
  Ol = Math.cos,
  rn = Math.PI * 2,
  Ja = bi(),
  to = bi(),
  eo = bi();
function ov(e, t, r, n, i, a) {
  ((i[0] = me(e, r)), (i[1] = me(t, n)), (a[0] = ye(e, r)), (a[1] = ye(t, n)));
}
var sv = [],
  lv = [];
function Yb(e, t, r, n, i, a, o, s, l, u) {
  var f = tm,
    h = zt,
    v = f(e, r, i, o, sv);
  ((l[0] = 1 / 0), (l[1] = 1 / 0), (u[0] = -1 / 0), (u[1] = -1 / 0));
  for (var c = 0; c < v; c++) {
    var d = h(e, r, i, o, sv[c]);
    ((l[0] = me(d, l[0])), (u[0] = ye(d, u[0])));
  }
  v = f(t, n, a, s, lv);
  for (var c = 0; c < v; c++) {
    var p = h(t, n, a, s, lv[c]);
    ((l[1] = me(p, l[1])), (u[1] = ye(p, u[1])));
  }
  ((l[0] = me(e, l[0])),
    (u[0] = ye(e, u[0])),
    (l[0] = me(o, l[0])),
    (u[0] = ye(o, u[0])),
    (l[1] = me(t, l[1])),
    (u[1] = ye(t, u[1])),
    (l[1] = me(s, l[1])),
    (u[1] = ye(s, u[1])));
}
function $b(e, t, r, n, i, a, o, s) {
  var l = em,
    u = te,
    f = ye(me(l(e, r, i), 1), 0),
    h = ye(me(l(t, n, a), 1), 0),
    v = u(e, r, i, f),
    c = u(t, n, a, h);
  ((o[0] = me(e, i, v)),
    (o[1] = me(t, a, c)),
    (s[0] = ye(e, i, v)),
    (s[1] = ye(t, a, c)));
}
function Xb(e, t, r, n, i, a, o, s, l) {
  var u = ni,
    f = ii,
    h = Math.abs(i - a);
  if (h % rn < 1e-4 && h > 1e-4) {
    ((s[0] = e - r), (s[1] = t - n), (l[0] = e + r), (l[1] = t + n));
    return;
  }
  if (
    ((Ja[0] = Ol(i) * r + e),
    (Ja[1] = El(i) * n + t),
    (to[0] = Ol(a) * r + e),
    (to[1] = El(a) * n + t),
    u(s, Ja, to),
    f(l, Ja, to),
    (i = i % rn),
    i < 0 && (i = i + rn),
    (a = a % rn),
    a < 0 && (a = a + rn),
    i > a && !o ? (a += rn) : i < a && o && (i += rn),
    o)
  ) {
    var v = a;
    ((a = i), (i = v));
  }
  for (var c = 0; c < a; c += Math.PI / 2)
    c > i &&
      ((eo[0] = Ol(c) * r + e),
      (eo[1] = El(c) * n + t),
      u(s, eo, s),
      f(l, eo, l));
}
var lt = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },
  nn = [],
  an = [],
  Fe = [],
  mr = [],
  ze = [],
  Ge = [],
  Bl = Math.min,
  Nl = Math.max,
  on = Math.cos,
  sn = Math.sin,
  nr = Math.abs,
  hf = Math.PI,
  Dr = hf * 2,
  Fl = typeof Float32Array < "u",
  Ci = [];
function zl(e) {
  var t = Math.round((e / hf) * 1e8) / 1e8;
  return (t % 2) * hf;
}
function sm(e, t) {
  var r = zl(e[0]);
  r < 0 && (r += Dr);
  var n = r - e[0],
    i = e[1];
  ((i += n),
    !t && i - r >= Dr
      ? (i = r + Dr)
      : t && r - i >= Dr
        ? (i = r - Dr)
        : !t && r > i
          ? (i = r + (Dr - zl(r - i)))
          : t && r < i && (i = r - (Dr - zl(i - r))),
    (e[0] = r),
    (e[1] = i));
}
var kn = (function () {
  function e(t) {
    ((this.dpr = 1),
      (this._xi = 0),
      (this._yi = 0),
      (this._x0 = 0),
      (this._y0 = 0),
      (this._len = 0),
      t && (this._saveData = !1),
      this._saveData && (this.data = []));
  }
  return (
    (e.prototype.increaseVersion = function () {
      this._version++;
    }),
    (e.prototype.getVersion = function () {
      return this._version;
    }),
    (e.prototype.setScale = function (t, r, n) {
      ((n = n || 0),
        n > 0 &&
          ((this._ux = nr(n / is / t) || 0), (this._uy = nr(n / is / r) || 0)));
    }),
    (e.prototype.setDPR = function (t) {
      this.dpr = t;
    }),
    (e.prototype.setContext = function (t) {
      this._ctx = t;
    }),
    (e.prototype.getContext = function () {
      return this._ctx;
    }),
    (e.prototype.beginPath = function () {
      return (this._ctx && this._ctx.beginPath(), this.reset(), this);
    }),
    (e.prototype.reset = function () {
      (this._saveData && (this._len = 0),
        this._pathSegLen && ((this._pathSegLen = null), (this._pathLen = 0)),
        this._version++);
    }),
    (e.prototype.moveTo = function (t, r) {
      return (
        this._drawPendingPt(),
        this.addData(lt.M, t, r),
        this._ctx && this._ctx.moveTo(t, r),
        (this._x0 = t),
        (this._y0 = r),
        (this._xi = t),
        (this._yi = r),
        this
      );
    }),
    (e.prototype.lineTo = function (t, r) {
      var n = nr(t - this._xi),
        i = nr(r - this._yi),
        a = n > this._ux || i > this._uy;
      if (
        (this.addData(lt.L, t, r), this._ctx && a && this._ctx.lineTo(t, r), a)
      )
        ((this._xi = t), (this._yi = r), (this._pendingPtDist = 0));
      else {
        var o = n * n + i * i;
        o > this._pendingPtDist &&
          ((this._pendingPtX = t),
          (this._pendingPtY = r),
          (this._pendingPtDist = o));
      }
      return this;
    }),
    (e.prototype.bezierCurveTo = function (t, r, n, i, a, o) {
      return (
        this._drawPendingPt(),
        this.addData(lt.C, t, r, n, i, a, o),
        this._ctx && this._ctx.bezierCurveTo(t, r, n, i, a, o),
        (this._xi = a),
        (this._yi = o),
        this
      );
    }),
    (e.prototype.quadraticCurveTo = function (t, r, n, i) {
      return (
        this._drawPendingPt(),
        this.addData(lt.Q, t, r, n, i),
        this._ctx && this._ctx.quadraticCurveTo(t, r, n, i),
        (this._xi = n),
        (this._yi = i),
        this
      );
    }),
    (e.prototype.arc = function (t, r, n, i, a, o) {
      (this._drawPendingPt(),
        (Ci[0] = i),
        (Ci[1] = a),
        sm(Ci, o),
        (i = Ci[0]),
        (a = Ci[1]));
      var s = a - i;
      return (
        this.addData(lt.A, t, r, n, n, i, s, 0, o ? 0 : 1),
        this._ctx && this._ctx.arc(t, r, n, i, a, o),
        (this._xi = on(a) * n + t),
        (this._yi = sn(a) * n + r),
        this
      );
    }),
    (e.prototype.arcTo = function (t, r, n, i, a) {
      return (
        this._drawPendingPt(),
        this._ctx && this._ctx.arcTo(t, r, n, i, a),
        this
      );
    }),
    (e.prototype.rect = function (t, r, n, i) {
      return (
        this._drawPendingPt(),
        this._ctx && this._ctx.rect(t, r, n, i),
        this.addData(lt.R, t, r, n, i),
        this
      );
    }),
    (e.prototype.closePath = function () {
      (this._drawPendingPt(), this.addData(lt.Z));
      var t = this._ctx,
        r = this._x0,
        n = this._y0;
      return (t && t.closePath(), (this._xi = r), (this._yi = n), this);
    }),
    (e.prototype.fill = function (t) {
      (t && t.fill(), this.toStatic());
    }),
    (e.prototype.stroke = function (t) {
      (t && t.stroke(), this.toStatic());
    }),
    (e.prototype.len = function () {
      return this._len;
    }),
    (e.prototype.setData = function (t) {
      if (this._saveData) {
        var r = t.length;
        !(this.data && this.data.length === r) &&
          Fl &&
          (this.data = new Float32Array(r));
        for (var n = 0; n < r; n++) this.data[n] = t[n];
        this._len = r;
      }
    }),
    (e.prototype.appendPath = function (t) {
      if (this._saveData) {
        t instanceof Array || (t = [t]);
        for (var r = t.length, n = 0, i = this._len, a = 0; a < r; a++)
          n += t[a].len();
        var o = this.data;
        if (
          Fl &&
          (o instanceof Float32Array || !o) &&
          ((this.data = new Float32Array(i + n)), i > 0 && o)
        )
          for (var s = 0; s < i; s++) this.data[s] = o[s];
        for (var a = 0; a < r; a++)
          for (var l = t[a].data, s = 0; s < l.length; s++)
            this.data[i++] = l[s];
        this._len = i;
      }
    }),
    (e.prototype.addData = function (t, r, n, i, a, o, s, l, u) {
      if (this._saveData) {
        var f = this.data;
        this._len + arguments.length > f.length &&
          (this._expandData(), (f = this.data));
        for (var h = 0; h < arguments.length; h++)
          f[this._len++] = arguments[h];
      }
    }),
    (e.prototype._drawPendingPt = function () {
      this._pendingPtDist > 0 &&
        (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY),
        (this._pendingPtDist = 0));
    }),
    (e.prototype._expandData = function () {
      if (!(this.data instanceof Array)) {
        for (var t = [], r = 0; r < this._len; r++) t[r] = this.data[r];
        this.data = t;
      }
    }),
    (e.prototype.toStatic = function () {
      if (this._saveData) {
        this._drawPendingPt();
        var t = this.data;
        t instanceof Array &&
          ((t.length = this._len),
          Fl && this._len > 11 && (this.data = new Float32Array(t)));
      }
    }),
    (e.prototype.getBoundingRect = function () {
      ((Fe[0] = Fe[1] = ze[0] = ze[1] = Number.MAX_VALUE),
        (mr[0] = mr[1] = Ge[0] = Ge[1] = -Number.MAX_VALUE));
      var t = this.data,
        r = 0,
        n = 0,
        i = 0,
        a = 0,
        o;
      for (o = 0; o < this._len; ) {
        var s = t[o++],
          l = o === 1;
        switch ((l && ((r = t[o]), (n = t[o + 1]), (i = r), (a = n)), s)) {
          case lt.M:
            ((r = i = t[o++]),
              (n = a = t[o++]),
              (ze[0] = i),
              (ze[1] = a),
              (Ge[0] = i),
              (Ge[1] = a));
            break;
          case lt.L:
            (ov(r, n, t[o], t[o + 1], ze, Ge), (r = t[o++]), (n = t[o++]));
            break;
          case lt.C:
            (Yb(r, n, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], ze, Ge),
              (r = t[o++]),
              (n = t[o++]));
            break;
          case lt.Q:
            ($b(r, n, t[o++], t[o++], t[o], t[o + 1], ze, Ge),
              (r = t[o++]),
              (n = t[o++]));
            break;
          case lt.A:
            var u = t[o++],
              f = t[o++],
              h = t[o++],
              v = t[o++],
              c = t[o++],
              d = t[o++] + c;
            o += 1;
            var p = !t[o++];
            (l && ((i = on(c) * h + u), (a = sn(c) * v + f)),
              Xb(u, f, h, v, c, d, p, ze, Ge),
              (r = on(d) * h + u),
              (n = sn(d) * v + f));
            break;
          case lt.R:
            ((i = r = t[o++]), (a = n = t[o++]));
            var m = t[o++],
              g = t[o++];
            ov(i, a, i + m, a + g, ze, Ge);
            break;
          case lt.Z:
            ((r = i), (n = a));
            break;
        }
        (ni(Fe, Fe, ze), ii(mr, mr, Ge));
      }
      return (
        o === 0 && (Fe[0] = Fe[1] = mr[0] = mr[1] = 0),
        new et(Fe[0], Fe[1], mr[0] - Fe[0], mr[1] - Fe[1])
      );
    }),
    (e.prototype._calculateLength = function () {
      var t = this.data,
        r = this._len,
        n = this._ux,
        i = this._uy,
        a = 0,
        o = 0,
        s = 0,
        l = 0;
      this._pathSegLen || (this._pathSegLen = []);
      for (var u = this._pathSegLen, f = 0, h = 0, v = 0; v < r; ) {
        var c = t[v++],
          d = v === 1;
        d && ((a = t[v]), (o = t[v + 1]), (s = a), (l = o));
        var p = -1;
        switch (c) {
          case lt.M:
            ((a = s = t[v++]), (o = l = t[v++]));
            break;
          case lt.L: {
            var m = t[v++],
              g = t[v++],
              y = m - a,
              _ = g - o;
            (nr(y) > n || nr(_) > i || v === r - 1) &&
              ((p = Math.sqrt(y * y + _ * _)), (a = m), (o = g));
            break;
          }
          case lt.C: {
            var b = t[v++],
              w = t[v++],
              m = t[v++],
              g = t[v++],
              S = t[v++],
              x = t[v++];
            ((p = Sb(a, o, b, w, m, g, S, x, 10)), (a = S), (o = x));
            break;
          }
          case lt.Q: {
            var b = t[v++],
              w = t[v++],
              m = t[v++],
              g = t[v++];
            ((p = Tb(a, o, b, w, m, g, 10)), (a = m), (o = g));
            break;
          }
          case lt.A:
            var T = t[v++],
              D = t[v++],
              A = t[v++],
              C = t[v++],
              I = t[v++],
              L = t[v++],
              P = L + I;
            ((v += 1),
              d && ((s = on(I) * A + T), (l = sn(I) * C + D)),
              (p = Nl(A, C) * Bl(Dr, Math.abs(L))),
              (a = on(P) * A + T),
              (o = sn(P) * C + D));
            break;
          case lt.R: {
            ((s = a = t[v++]), (l = o = t[v++]));
            var k = t[v++],
              E = t[v++];
            p = k * 2 + E * 2;
            break;
          }
          case lt.Z: {
            var y = s - a,
              _ = l - o;
            ((p = Math.sqrt(y * y + _ * _)), (a = s), (o = l));
            break;
          }
        }
        p >= 0 && ((u[h++] = p), (f += p));
      }
      return ((this._pathLen = f), f);
    }),
    (e.prototype.rebuildPath = function (t, r) {
      var n = this.data,
        i = this._ux,
        a = this._uy,
        o = this._len,
        s,
        l,
        u,
        f,
        h,
        v,
        c = r < 1,
        d,
        p,
        m = 0,
        g = 0,
        y,
        _ = 0,
        b,
        w;
      if (
        !(
          c &&
          (this._pathSegLen || this._calculateLength(),
          (d = this._pathSegLen),
          (p = this._pathLen),
          (y = r * p),
          !y)
        )
      )
        t: for (var S = 0; S < o; ) {
          var x = n[S++],
            T = S === 1;
          switch (
            (T && ((u = n[S]), (f = n[S + 1]), (s = u), (l = f)),
            x !== lt.L && _ > 0 && (t.lineTo(b, w), (_ = 0)),
            x)
          ) {
            case lt.M:
              ((s = u = n[S++]), (l = f = n[S++]), t.moveTo(u, f));
              break;
            case lt.L: {
              ((h = n[S++]), (v = n[S++]));
              var D = nr(h - u),
                A = nr(v - f);
              if (D > i || A > a) {
                if (c) {
                  var C = d[g++];
                  if (m + C > y) {
                    var I = (y - m) / C;
                    t.lineTo(u * (1 - I) + h * I, f * (1 - I) + v * I);
                    break t;
                  }
                  m += C;
                }
                (t.lineTo(h, v), (u = h), (f = v), (_ = 0));
              } else {
                var L = D * D + A * A;
                L > _ && ((b = h), (w = v), (_ = L));
              }
              break;
            }
            case lt.C: {
              var P = n[S++],
                k = n[S++],
                E = n[S++],
                V = n[S++],
                R = n[S++],
                O = n[S++];
              if (c) {
                var C = d[g++];
                if (m + C > y) {
                  var I = (y - m) / C;
                  (es(u, P, E, R, I, nn),
                    es(f, k, V, O, I, an),
                    t.bezierCurveTo(nn[1], an[1], nn[2], an[2], nn[3], an[3]));
                  break t;
                }
                m += C;
              }
              (t.bezierCurveTo(P, k, E, V, R, O), (u = R), (f = O));
              break;
            }
            case lt.Q: {
              var P = n[S++],
                k = n[S++],
                E = n[S++],
                V = n[S++];
              if (c) {
                var C = d[g++];
                if (m + C > y) {
                  var I = (y - m) / C;
                  (rs(u, P, E, I, nn),
                    rs(f, k, V, I, an),
                    t.quadraticCurveTo(nn[1], an[1], nn[2], an[2]));
                  break t;
                }
                m += C;
              }
              (t.quadraticCurveTo(P, k, E, V), (u = E), (f = V));
              break;
            }
            case lt.A:
              var z = n[S++],
                F = n[S++],
                N = n[S++],
                $ = n[S++],
                nt = n[S++],
                ft = n[S++],
                Ot = n[S++],
                Xt = !n[S++],
                Vt = N > $ ? N : $,
                Bt = nr(N - $) > 0.001,
                Ct = nt + ft,
                j = !1;
              if (c) {
                var C = d[g++];
                (m + C > y && ((Ct = nt + (ft * (y - m)) / C), (j = !0)),
                  (m += C));
              }
              if (
                (Bt && t.ellipse
                  ? t.ellipse(z, F, N, $, Ot, nt, Ct, Xt)
                  : t.arc(z, F, Vt, nt, Ct, Xt),
                j)
              )
                break t;
              (T && ((s = on(nt) * N + z), (l = sn(nt) * $ + F)),
                (u = on(Ct) * N + z),
                (f = sn(Ct) * $ + F));
              break;
            case lt.R:
              ((s = u = n[S]), (l = f = n[S + 1]), (h = n[S++]), (v = n[S++]));
              var it = n[S++],
                Ne = n[S++];
              if (c) {
                var C = d[g++];
                if (m + C > y) {
                  var Lt = y - m;
                  (t.moveTo(h, v),
                    t.lineTo(h + Bl(Lt, it), v),
                    (Lt -= it),
                    Lt > 0 && t.lineTo(h + it, v + Bl(Lt, Ne)),
                    (Lt -= Ne),
                    Lt > 0 && t.lineTo(h + Nl(it - Lt, 0), v + Ne),
                    (Lt -= it),
                    Lt > 0 && t.lineTo(h, v + Nl(Ne - Lt, 0)));
                  break t;
                }
                m += C;
              }
              t.rect(h, v, it, Ne);
              break;
            case lt.Z:
              if (c) {
                var C = d[g++];
                if (m + C > y) {
                  var I = (y - m) / C;
                  t.lineTo(u * (1 - I) + s * I, f * (1 - I) + l * I);
                  break t;
                }
                m += C;
              }
              (t.closePath(), (u = s), (f = l));
          }
        }
    }),
    (e.prototype.clone = function () {
      var t = new e(),
        r = this.data;
      return (
        (t.data = r.slice ? r.slice() : Array.prototype.slice.call(r)),
        (t._len = this._len),
        t
      );
    }),
    (e.prototype.canSave = function () {
      return !!this._saveData;
    }),
    (e.CMD = lt),
    (e.initDefaultProps = (function () {
      var t = e.prototype;
      ((t._saveData = !0),
        (t._ux = 0),
        (t._uy = 0),
        (t._pendingPtDist = 0),
        (t._version = 0));
    })()),
    e
  );
})();
function Hn(e, t, r, n, i, a, o) {
  if (i === 0) return !1;
  var s = i,
    l = 0,
    u = e;
  if (
    (o > t + s && o > n + s) ||
    (o < t - s && o < n - s) ||
    (a > e + s && a > r + s) ||
    (a < e - s && a < r - s)
  )
    return !1;
  if (e !== r) ((l = (t - n) / (e - r)), (u = (e * n - r * t) / (e - r)));
  else return Math.abs(a - e) <= s / 2;
  var f = l * a - o + u,
    h = (f * f) / (l * l + 1);
  return h <= ((s / 2) * s) / 2;
}
function qb(e, t, r, n, i, a, o, s, l, u, f) {
  if (l === 0) return !1;
  var h = l;
  if (
    (f > t + h && f > n + h && f > a + h && f > s + h) ||
    (f < t - h && f < n - h && f < a - h && f < s - h) ||
    (u > e + h && u > r + h && u > i + h && u > o + h) ||
    (u < e - h && u < r - h && u < i - h && u < o - h)
  )
    return !1;
  var v = bb(e, t, r, n, i, a, o, s, u, f);
  return v <= h / 2;
}
function Zb(e, t, r, n, i, a, o, s, l) {
  if (o === 0) return !1;
  var u = o;
  if (
    (l > t + u && l > n + u && l > a + u) ||
    (l < t - u && l < n - u && l < a - u) ||
    (s > e + u && s > r + u && s > i + u) ||
    (s < e - u && s < r - u && s < i - u)
  )
    return !1;
  var f = xb(e, t, r, n, i, a, s, l);
  return f <= u / 2;
}
var uv = Math.PI * 2;
function ro(e) {
  return ((e %= uv), e < 0 && (e += uv), e);
}
var Di = Math.PI * 2;
function Kb(e, t, r, n, i, a, o, s, l) {
  if (o === 0) return !1;
  var u = o;
  ((s -= e), (l -= t));
  var f = Math.sqrt(s * s + l * l);
  if (f - u > r || f + u < r) return !1;
  if (Math.abs(n - i) % Di < 1e-4) return !0;
  if (a) {
    var h = n;
    ((n = ro(i)), (i = ro(h)));
  } else ((n = ro(n)), (i = ro(i)));
  n > i && (i += Di);
  var v = Math.atan2(l, s);
  return (
    v < 0 && (v += Di),
    (v >= n && v <= i) || (v + Di >= n && v + Di <= i)
  );
}
function ln(e, t, r, n, i, a) {
  if ((a > t && a > n) || (a < t && a < n) || n === t) return 0;
  var o = (a - t) / (n - t),
    s = n < t ? 1 : -1;
  (o === 1 || o === 0) && (s = n < t ? 0.5 : -0.5);
  var l = o * (r - e) + e;
  return l === i ? 1 / 0 : l > i ? s : 0;
}
var yr = kn.CMD,
  un = Math.PI * 2,
  jb = 1e-4;
function Qb(e, t) {
  return Math.abs(e - t) < jb;
}
var qt = [-1, -1, -1],
  pe = [-1, -1];
function Jb() {
  var e = pe[0];
  ((pe[0] = pe[1]), (pe[1] = e));
}
function tS(e, t, r, n, i, a, o, s, l, u) {
  if ((u > t && u > n && u > a && u > s) || (u < t && u < n && u < a && u < s))
    return 0;
  var f = ts(t, n, a, s, u, qt);
  if (f === 0) return 0;
  for (var h = 0, v = -1, c = void 0, d = void 0, p = 0; p < f; p++) {
    var m = qt[p],
      g = m === 0 || m === 1 ? 0.5 : 1,
      y = zt(e, r, i, o, m);
    y < l ||
      (v < 0 &&
        ((v = tm(t, n, a, s, pe)),
        pe[1] < pe[0] && v > 1 && Jb(),
        (c = zt(t, n, a, s, pe[0])),
        v > 1 && (d = zt(t, n, a, s, pe[1]))),
      v === 2
        ? m < pe[0]
          ? (h += c < t ? g : -g)
          : m < pe[1]
            ? (h += d < c ? g : -g)
            : (h += s < d ? g : -g)
        : m < pe[0]
          ? (h += c < t ? g : -g)
          : (h += s < c ? g : -g));
  }
  return h;
}
function eS(e, t, r, n, i, a, o, s) {
  if ((s > t && s > n && s > a) || (s < t && s < n && s < a)) return 0;
  var l = wb(t, n, a, s, qt);
  if (l === 0) return 0;
  var u = em(t, n, a);
  if (u >= 0 && u <= 1) {
    for (var f = 0, h = te(t, n, a, u), v = 0; v < l; v++) {
      var c = qt[v] === 0 || qt[v] === 1 ? 0.5 : 1,
        d = te(e, r, i, qt[v]);
      d < o || (qt[v] < u ? (f += h < t ? c : -c) : (f += a < h ? c : -c));
    }
    return f;
  } else {
    var c = qt[0] === 0 || qt[0] === 1 ? 0.5 : 1,
      d = te(e, r, i, qt[0]);
    return d < o ? 0 : a < t ? c : -c;
  }
}
function rS(e, t, r, n, i, a, o, s) {
  if (((s -= t), s > r || s < -r)) return 0;
  var l = Math.sqrt(r * r - s * s);
  ((qt[0] = -l), (qt[1] = l));
  var u = Math.abs(n - i);
  if (u < 1e-4) return 0;
  if (u >= un - 1e-4) {
    ((n = 0), (i = un));
    var f = a ? 1 : -1;
    return o >= qt[0] + e && o <= qt[1] + e ? f : 0;
  }
  if (n > i) {
    var h = n;
    ((n = i), (i = h));
  }
  n < 0 && ((n += un), (i += un));
  for (var v = 0, c = 0; c < 2; c++) {
    var d = qt[c];
    if (d + e > o) {
      var p = Math.atan2(s, d),
        f = a ? 1 : -1;
      (p < 0 && (p = un + p),
        ((p >= n && p <= i) || (p + un >= n && p + un <= i)) &&
          (p > Math.PI / 2 && p < Math.PI * 1.5 && (f = -f), (v += f)));
    }
  }
  return v;
}
function lm(e, t, r, n, i) {
  for (
    var a = e.data, o = e.len(), s = 0, l = 0, u = 0, f = 0, h = 0, v, c, d = 0;
    d < o;

  ) {
    var p = a[d++],
      m = d === 1;
    switch (
      (p === yr.M && d > 1 && (r || (s += ln(l, u, f, h, n, i))),
      m && ((l = a[d]), (u = a[d + 1]), (f = l), (h = u)),
      p)
    ) {
      case yr.M:
        ((f = a[d++]), (h = a[d++]), (l = f), (u = h));
        break;
      case yr.L:
        if (r) {
          if (Hn(l, u, a[d], a[d + 1], t, n, i)) return !0;
        } else s += ln(l, u, a[d], a[d + 1], n, i) || 0;
        ((l = a[d++]), (u = a[d++]));
        break;
      case yr.C:
        if (r) {
          if (qb(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], t, n, i))
            return !0;
        } else
          s +=
            tS(l, u, a[d++], a[d++], a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        ((l = a[d++]), (u = a[d++]));
        break;
      case yr.Q:
        if (r) {
          if (Zb(l, u, a[d++], a[d++], a[d], a[d + 1], t, n, i)) return !0;
        } else s += eS(l, u, a[d++], a[d++], a[d], a[d + 1], n, i) || 0;
        ((l = a[d++]), (u = a[d++]));
        break;
      case yr.A:
        var g = a[d++],
          y = a[d++],
          _ = a[d++],
          b = a[d++],
          w = a[d++],
          S = a[d++];
        d += 1;
        var x = !!(1 - a[d++]);
        ((v = Math.cos(w) * _ + g),
          (c = Math.sin(w) * b + y),
          m ? ((f = v), (h = c)) : (s += ln(l, u, v, c, n, i)));
        var T = ((n - g) * b) / _ + g;
        if (r) {
          if (Kb(g, y, b, w, w + S, x, t, T, i)) return !0;
        } else s += rS(g, y, b, w, w + S, x, T, i);
        ((l = Math.cos(w + S) * _ + g), (u = Math.sin(w + S) * b + y));
        break;
      case yr.R:
        ((f = l = a[d++]), (h = u = a[d++]));
        var D = a[d++],
          A = a[d++];
        if (((v = f + D), (c = h + A), r)) {
          if (
            Hn(f, h, v, h, t, n, i) ||
            Hn(v, h, v, c, t, n, i) ||
            Hn(v, c, f, c, t, n, i) ||
            Hn(f, c, f, h, t, n, i)
          )
            return !0;
        } else ((s += ln(v, h, v, c, n, i)), (s += ln(f, c, f, h, n, i)));
        break;
      case yr.Z:
        if (r) {
          if (Hn(l, u, f, h, t, n, i)) return !0;
        } else s += ln(l, u, f, h, n, i);
        ((l = f), (u = h));
        break;
    }
  }
  return (!r && !Qb(u, h) && (s += ln(l, u, f, h, n, i) || 0), s !== 0);
}
function nS(e, t, r) {
  return lm(e, 0, !1, t, r);
}
function iS(e, t, r, n) {
  return lm(e, t, !0, r, n);
}
var um = dt(
    {
      fill: "#000",
      stroke: null,
      strokePercent: 1,
      fillOpacity: 1,
      strokeOpacity: 1,
      lineDashOffset: 0,
      lineWidth: 1,
      lineCap: "butt",
      miterLimit: 10,
      strokeNoScale: !1,
      strokeFirst: !1,
    },
    An,
  ),
  aS = {
    style: dt(
      {
        fill: !0,
        stroke: !0,
        strokePercent: !0,
        fillOpacity: !0,
        strokeOpacity: !0,
        lineDashOffset: !0,
        lineWidth: !0,
        miterLimit: !0,
      },
      $s.style,
    ),
  },
  Gl = ga.concat(["invisible", "culling", "z", "z2", "zlevel", "parent"]),
  pt = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.update = function () {
        var r = this;
        e.prototype.update.call(this);
        var n = this.style;
        if (n.decal) {
          var i = (this._decalEl = this._decalEl || new t());
          (i.buildPath === t.prototype.buildPath &&
            (i.buildPath = function (l) {
              r.buildPath(l, r.shape);
            }),
            (i.silent = !0));
          var a = i.style;
          for (var o in n) a[o] !== n[o] && (a[o] = n[o]);
          ((a.fill = n.fill ? n.decal : null),
            (a.decal = null),
            (a.shadowColor = null),
            n.strokeFirst && (a.stroke = null));
          for (var s = 0; s < Gl.length; ++s) i[Gl[s]] = this[Gl[s]];
          i.__dirty |= le;
        } else this._decalEl && (this._decalEl = null);
      }),
      (t.prototype.getDecalElement = function () {
        return this._decalEl;
      }),
      (t.prototype._init = function (r) {
        var n = yt(r);
        this.shape = this.getDefaultShape();
        var i = this.getDefaultStyle();
        i && this.useStyle(i);
        for (var a = 0; a < n.length; a++) {
          var o = n[a],
            s = r[o];
          o === "style"
            ? this.style
              ? B(this.style, s)
              : this.useStyle(s)
            : o === "shape"
              ? B(this.shape, s)
              : e.prototype.attrKV.call(this, o, s);
        }
        this.style || this.useStyle({});
      }),
      (t.prototype.getDefaultStyle = function () {
        return null;
      }),
      (t.prototype.getDefaultShape = function () {
        return {};
      }),
      (t.prototype.canBeInsideText = function () {
        return this.hasFill();
      }),
      (t.prototype.getInsideTextFill = function () {
        var r = this.style.fill;
        if (r !== "none") {
          if (U(r)) {
            var n = ns(r, 0);
            return n > 0.5 ? lf : n > 0.2 ? Bb : uf;
          } else if (r) return uf;
        }
        return lf;
      }),
      (t.prototype.getInsideTextStroke = function (r) {
        var n = this.style.fill;
        if (U(n)) {
          var i = this.__zr,
            a = !!(i && i.isDarkMode()),
            o = ns(r, 0) < sf;
          if (a === o) return n;
        }
      }),
      (t.prototype.buildPath = function (r, n, i) {}),
      (t.prototype.pathUpdated = function () {
        this.__dirty &= ~ei;
      }),
      (t.prototype.getUpdatedPathProxy = function (r) {
        return (
          !this.path && this.createPathProxy(),
          this.path.beginPath(),
          this.buildPath(this.path, this.shape, r),
          this.path
        );
      }),
      (t.prototype.createPathProxy = function () {
        this.path = new kn(!1);
      }),
      (t.prototype.hasStroke = function () {
        var r = this.style,
          n = r.stroke;
        return !(n == null || n === "none" || !(r.lineWidth > 0));
      }),
      (t.prototype.hasFill = function () {
        var r = this.style,
          n = r.fill;
        return n != null && n !== "none";
      }),
      (t.prototype.getBoundingRect = function () {
        var r = this._rect,
          n = this.style,
          i = !r;
        if (i) {
          var a = !1;
          this.path || ((a = !0), this.createPathProxy());
          var o = this.path;
          ((a || this.__dirty & ei) &&
            (o.beginPath(),
            this.buildPath(o, this.shape, !1),
            this.pathUpdated()),
            (r = o.getBoundingRect()));
        }
        if (
          ((this._rect = r),
          this.hasStroke() && this.path && this.path.len() > 0)
        ) {
          var s = this._rectStroke || (this._rectStroke = r.clone());
          if (this.__dirty || i) {
            s.copy(r);
            var l = n.strokeNoScale ? this.getLineScale() : 1,
              u = n.lineWidth;
            if (!this.hasFill()) {
              var f = this.strokeContainThreshold;
              u = Math.max(u, f ?? 4);
            }
            l > 1e-10 &&
              ((s.width += u / l),
              (s.height += u / l),
              (s.x -= u / l / 2),
              (s.y -= u / l / 2));
          }
          return s;
        }
        return r;
      }),
      (t.prototype.contain = function (r, n) {
        var i = this.transformCoordToLocal(r, n),
          a = this.getBoundingRect(),
          o = this.style;
        if (((r = i[0]), (n = i[1]), a.contain(r, n))) {
          var s = this.path;
          if (this.hasStroke()) {
            var l = o.lineWidth,
              u = o.strokeNoScale ? this.getLineScale() : 1;
            if (
              u > 1e-10 &&
              (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)),
              iS(s, l / u, r, n))
            )
              return !0;
          }
          if (this.hasFill()) return nS(s, r, n);
        }
        return !1;
      }),
      (t.prototype.dirtyShape = function () {
        ((this.__dirty |= ei),
          this._rect && (this._rect = null),
          this._decalEl && this._decalEl.dirtyShape(),
          this.markRedraw());
      }),
      (t.prototype.dirty = function () {
        (this.dirtyStyle(), this.dirtyShape());
      }),
      (t.prototype.animateShape = function (r) {
        return this.animate("shape", r);
      }),
      (t.prototype.updateDuringAnimation = function (r) {
        r === "style"
          ? this.dirtyStyle()
          : r === "shape"
            ? this.dirtyShape()
            : this.markRedraw();
      }),
      (t.prototype.attrKV = function (r, n) {
        r === "shape" ? this.setShape(n) : e.prototype.attrKV.call(this, r, n);
      }),
      (t.prototype.setShape = function (r, n) {
        var i = this.shape;
        return (
          i || (i = this.shape = {}),
          typeof r == "string" ? (i[r] = n) : B(i, r),
          this.dirtyShape(),
          this
        );
      }),
      (t.prototype.shapeChanged = function () {
        return !!(this.__dirty & ei);
      }),
      (t.prototype.createStyle = function (r) {
        return Hs(um, r);
      }),
      (t.prototype._innerSaveToNormal = function (r) {
        e.prototype._innerSaveToNormal.call(this, r);
        var n = this._normalState;
        r.shape && !n.shape && (n.shape = B({}, this.shape));
      }),
      (t.prototype._applyStateObj = function (r, n, i, a, o, s) {
        e.prototype._applyStateObj.call(this, r, n, i, a, o, s);
        var l = !(n && a),
          u;
        if (
          (n && n.shape
            ? o
              ? a
                ? (u = n.shape)
                : ((u = B({}, i.shape)), B(u, n.shape))
              : ((u = B({}, a ? this.shape : i.shape)), B(u, n.shape))
            : l && (u = i.shape),
          u)
        )
          if (o) {
            this.shape = B({}, this.shape);
            for (var f = {}, h = yt(u), v = 0; v < h.length; v++) {
              var c = h[v];
              typeof u[c] == "object" ? (this.shape[c] = u[c]) : (f[c] = u[c]);
            }
            this._transitionState(r, { shape: f }, s);
          } else ((this.shape = u), this.dirtyShape());
      }),
      (t.prototype._mergeStates = function (r) {
        for (
          var n = e.prototype._mergeStates.call(this, r), i, a = 0;
          a < r.length;
          a++
        ) {
          var o = r[a];
          o.shape && ((i = i || {}), this._mergeStyle(i, o.shape));
        }
        return (i && (n.shape = i), n);
      }),
      (t.prototype.getAnimationStyleProps = function () {
        return aS;
      }),
      (t.prototype.isZeroArea = function () {
        return !1;
      }),
      (t.extend = function (r) {
        var n = (function (a) {
          G(o, a);
          function o(s) {
            var l = a.call(this, s) || this;
            return (r.init && r.init.call(l, s), l);
          }
          return (
            (o.prototype.getDefaultStyle = function () {
              return at(r.style);
            }),
            (o.prototype.getDefaultShape = function () {
              return at(r.shape);
            }),
            o
          );
        })(t);
        for (var i in r) typeof r[i] == "function" && (n.prototype[i] = r[i]);
        return n;
      }),
      (t.initDefaultProps = (function () {
        var r = t.prototype;
        ((r.type = "path"),
          (r.strokeContainThreshold = 5),
          (r.segmentIgnoreThreshold = 0),
          (r.subPixelOptimize = !1),
          (r.autoBatch = !1),
          (r.__dirty = le | $i | ei));
      })()),
      t
    );
  })(Ea),
  oS = dt(
    {
      strokeFirst: !0,
      font: Nr,
      x: 0,
      y: 0,
      textAlign: "left",
      textBaseline: "top",
      miterLimit: 2,
    },
    um,
  ),
  as = (function (e) {
    G(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.hasStroke = function () {
        return jg(this.style);
      }),
      (t.prototype.hasFill = function () {
        var r = this.style,
          n = r.fill;
        return n != null && n !== "none";
      }),
      (t.prototype.createStyle = function (r) {
        return Hs(oS, r);
      }),
      (t.prototype.setBoundingRect = function (r) {
        this._rect = r;
      }),
      (t.prototype.getBoundingRect = function () {
        return (this._rect || (this._rect = vb(this.style)), this._rect);
      }),
      (t.initDefaultProps = (function () {
        var r = t.prototype;
        r.dirtyRectTolerance = 10;
      })()),
      t
    );
  })(Ea);
as.prototype.type = "tspan";
var sS = dt({ x: 0, y: 0 }, An),
  lS = {
    style: dt(
      {
        x: !0,
        y: !0,
        width: !0,
        height: !0,
        sx: !0,
        sy: !0,
        sWidth: !0,
        sHeight: !0,
      },
      $s.style,
    ),
  };
function uS(e) {
  return !!(e && typeof e != "string" && e.width && e.height);
}
var Yr = (function (e) {
  G(t, e);
  function t() {
    return (e !== null && e.apply(this, arguments)) || this;
  }
  return (
    (t.prototype.createStyle = function (r) {
      return Hs(sS, r);
    }),
    (t.prototype._getSize = function (r) {
      var n = this.style,
        i = n[r];
      if (i != null) return i;
      var a = uS(n.image) ? n.image : this.__image;
      if (!a) return 0;
      var o = r === "width" ? "height" : "width",
        s = n[o];
      return s == null ? a[r] : (a[r] / a[o]) * s;
    }),
    (t.prototype.getWidth = function () {
      return this._getSize("width");
    }),
    (t.prototype.getHeight = function () {
      return this._getSize("height");
    }),
    (t.prototype.getAnimationStyleProps = function () {
      return lS;
    }),
    (t.prototype.getBoundingRect = function () {
      var r = this.style;
      return (
        this._rect ||
          (this._rect = new et(
            r.x || 0,
            r.y || 0,
            this.getWidth(),
            this.getHeight(),
          )),
        this._rect
      );
    }),
    t
  );
})(Ea);
Yr.prototype.type = "image";
function fS(e, t) {
  var r = t.x,
    n = t.y,
    i = t.width,
    a = t.height,
    o = t.r,
    s,
    l,
    u,
    f;
  (i < 0 && ((r = r + i), (i = -i)),
    a < 0 && ((n = n + a), (a = -a)),
    typeof o == "number"
      ? (s = l = u = f = o)
      : o instanceof Array
        ? o.length === 1
          ? (s = l = u = f = o[0])
          : o.length === 2
            ? ((s = u = o[0]), (l = f = o[1]))
            : o.length === 3
              ? ((s = o[0]), (l = f = o[1]), (u = o[2]))
              : ((s = o[0]), (l = o[1]), (u = o[2]), (f = o[3]))
        : (s = l = u = f = 0));
  var h;
  (s + l > i && ((h = s + l), (s *= i / h), (l *= i / h)),
    u + f > i && ((h = u + f), (u *= i / h), (f *= i / h)),
    l + u > a && ((h = l + u), (l *= a / h), (u *= a / h)),
    s + f > a && ((h = s + f), (s *= a / h), (f *= a / h)),
    e.moveTo(r + s, n),
    e.lineTo(r + i - l, n),
    l !== 0 && e.arc(r + i - l, n + l, l, -Math.PI / 2, 0),
    e.lineTo(r + i, n + a - u),
    u !== 0 && e.arc(r + i - u, n + a - u, u, 0, Math.PI / 2),
    e.lineTo(r + f, n + a),
    f !== 0 && e.arc(r + f, n + a - f, f, Math.PI / 2, Math.PI),
    e.lineTo(r, n + s),
    s !== 0 && e.arc(r + s, n + s, s, Math.PI, Math.PI * 1.5));
}
var ai = Math.round;
function fm(e, t, r) {
  if (t) {
    var n = t.x1,
      i = t.x2,
      a = t.y1,
      o = t.y2;
    ((e.x1 = n), (e.x2 = i), (e.y1 = a), (e.y2 = o));
    var s = r && r.lineWidth;
    return (
      s &&
        (ai(n * 2) === ai(i * 2) && (e.x1 = e.x2 = wn(n, s, !0)),
        ai(a * 2) === ai(o * 2) && (e.y1 = e.y2 = wn(a, s, !0))),
      e
    );
  }
}
function hm(e, t, r) {
  if (t) {
    var n = t.x,
      i = t.y,
      a = t.width,
      o = t.height;
    ((e.x = n), (e.y = i), (e.width = a), (e.height = o));
    var s = r && r.lineWidth;
    return (
      s &&
        ((e.x = wn(n, s, !0)),
        (e.y = wn(i, s, !0)),
        (e.width = Math.max(wn(n + a, s, !1) - e.x, a === 0 ? 0 : 1)),
        (e.height = Math.max(wn(i + o, s, !1) - e.y, o === 0 ? 0 : 1))),
      e
    );
  }
}
function wn(e, t, r) {
  if (!t) return e;
  var n = ai(e * 2);
  return (n + ai(t)) % 2 === 0 ? n / 2 : (n + (r ? 1 : -1)) / 2;
}
var hS = (function () {
    function e() {
      ((this.x = 0), (this.y = 0), (this.width = 0), (this.height = 0));
    }
    return e;
  })(),
  cS = {},
  Tt = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new hS();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i, a, o, s;
        if (this.subPixelOptimize) {
          var l = hm(cS, n, this.style);
          ((i = l.x),
            (a = l.y),
            (o = l.width),
            (s = l.height),
            (l.r = n.r),
            (n = l));
        } else ((i = n.x), (a = n.y), (o = n.width), (s = n.height));
        n.r ? fS(r, n) : r.rect(i, a, o, s);
      }),
      (t.prototype.isZeroArea = function () {
        return !this.shape.width || !this.shape.height;
      }),
      t
    );
  })(pt);
Tt.prototype.type = "rect";
var fv = { fill: "#000" },
  hv = 2,
  He = {},
  vS = {
    style: dt(
      {
        fill: !0,
        stroke: !0,
        fillOpacity: !0,
        strokeOpacity: !0,
        lineWidth: !0,
        fontSize: !0,
        lineHeight: !0,
        width: !0,
        height: !0,
        textShadowColor: !0,
        textShadowBlur: !0,
        textShadowOffsetX: !0,
        textShadowOffsetY: !0,
        backgroundColor: !0,
        padding: !0,
        borderColor: !0,
        borderWidth: !0,
        borderRadius: !0,
      },
      $s.style,
    ),
  },
  Ht = (function (e) {
    G(t, e);
    function t(r) {
      var n = e.call(this) || this;
      return (
        (n.type = "text"),
        (n._children = []),
        (n._defaultStyle = fv),
        n.attr(r),
        n
      );
    }
    return (
      (t.prototype.childrenRef = function () {
        return this._children;
      }),
      (t.prototype.update = function () {
        (e.prototype.update.call(this),
          this.styleChanged() && this._updateSubTexts());
        for (var r = 0; r < this._children.length; r++) {
          var n = this._children[r];
          ((n.zlevel = this.zlevel),
            (n.z = this.z),
            (n.z2 = this.z2),
            (n.culling = this.culling),
            (n.cursor = this.cursor),
            (n.invisible = this.invisible));
        }
      }),
      (t.prototype.updateTransform = function () {
        var r = this.innerTransformable;
        r
          ? (r.updateTransform(), r.transform && (this.transform = r.transform))
          : e.prototype.updateTransform.call(this);
      }),
      (t.prototype.getLocalTransform = function (r) {
        var n = this.innerTransformable;
        return n
          ? n.getLocalTransform(r)
          : e.prototype.getLocalTransform.call(this, r);
      }),
      (t.prototype.getComputedTransform = function () {
        return (
          this.__hostTarget &&
            (this.__hostTarget.getComputedTransform(),
            this.__hostTarget.updateInnerText(!0)),
          e.prototype.getComputedTransform.call(this)
        );
      }),
      (t.prototype._updateSubTexts = function () {
        ((this._childCursor = 0),
          yS(this.style),
          this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(),
          (this._children.length = this._childCursor),
          this.styleUpdated());
      }),
      (t.prototype.addSelfToZr = function (r) {
        e.prototype.addSelfToZr.call(this, r);
        for (var n = 0; n < this._children.length; n++)
          this._children[n].__zr = r;
      }),
      (t.prototype.removeSelfFromZr = function (r) {
        e.prototype.removeSelfFromZr.call(this, r);
        for (var n = 0; n < this._children.length; n++)
          this._children[n].__zr = null;
      }),
      (t.prototype.getBoundingRect = function () {
        if ((this.styleChanged() && this._updateSubTexts(), !this._rect)) {
          for (
            var r = new et(0, 0, 0, 0),
              n = this._children,
              i = [],
              a = null,
              o = 0;
            o < n.length;
            o++
          ) {
            var s = n[o],
              l = s.getBoundingRect(),
              u = s.getLocalTransform(i);
            u
              ? (r.copy(l),
                r.applyTransform(u),
                (a = a || r.clone()),
                a.union(r))
              : ((a = a || l.clone()), a.union(l));
          }
          this._rect = a || r;
        }
        return this._rect;
      }),
      (t.prototype.setDefaultTextStyle = function (r) {
        this._defaultStyle = r || fv;
      }),
      (t.prototype.setTextContent = function (r) {}),
      (t.prototype._mergeStyle = function (r, n) {
        if (!n) return r;
        var i = n.rich,
          a = r.rich || (i && {});
        return (
          B(r, n),
          i && a ? (this._mergeRich(a, i), (r.rich = a)) : a && (r.rich = a),
          r
        );
      }),
      (t.prototype._mergeRich = function (r, n) {
        for (var i = yt(n), a = 0; a < i.length; a++) {
          var o = i[a];
          ((r[o] = r[o] || {}), B(r[o], n[o]));
        }
      }),
      (t.prototype.getAnimationStyleProps = function () {
        return vS;
      }),
      (t.prototype._getOrCreateChild = function (r) {
        var n = this._children[this._childCursor];
        return (
          (!n || !(n instanceof r)) && (n = new r()),
          (this._children[this._childCursor++] = n),
          (n.__zr = this.__zr),
          (n.parent = this),
          n
        );
      }),
      (t.prototype._updatePlainTexts = function () {
        var r = this.style,
          n = r.font || Nr,
          i = r.padding,
          a = this._defaultStyle,
          o = r.x || 0,
          s = r.y || 0,
          l = r.align || a.align || "left",
          u = r.verticalAlign || a.verticalAlign || "top";
        (Wc(He, a.overflowRect, o, s, l, u), (o = He.baseX), (s = He.baseY));
        var f = yv(r),
          h = ob(f, r, He.outerWidth, He.outerHeight),
          v = Hl(r),
          c = !!r.backgroundColor,
          d = h.outerHeight,
          p = h.outerWidth,
          m = h.lines,
          g = h.lineHeight;
        this.isTruncated = !!h.isTruncated;
        var y = o,
          _ = Dn(s, h.contentHeight, u);
        if (v || i) {
          var b = ci(o, p, l),
            w = Dn(s, d, u);
          v && this._renderBackground(r, r, b, w, p, d);
        }
        ((_ += g / 2),
          i &&
            ((y = mv(o, l, i)),
            u === "top" ? (_ += i[0]) : u === "bottom" && (_ -= i[2])));
        for (
          var S = 0,
            x = !1,
            T = !1,
            D = gv(("fill" in r) ? r.fill : ((T = !0), a.fill)),
            A = pv(
              ("stroke" in r)
                ? r.stroke
                : !c && (!a.autoStroke || T)
                  ? ((S = hv), (x = !0), a.stroke)
                  : null,
            ),
            C = r.textShadowBlur > 0,
            I = 0;
          I < m.length;
          I++
        ) {
          var L = this._getOrCreateChild(as),
            P = L.createStyle();
          (L.useStyle(P),
            (P.text = m[I]),
            (P.x = y),
            (P.y = _),
            (P.textAlign = l),
            (P.textBaseline = "middle"),
            (P.opacity = r.opacity),
            (P.strokeFirst = !0),
            C &&
              ((P.shadowBlur = r.textShadowBlur || 0),
              (P.shadowColor = r.textShadowColor || "transparent"),
              (P.shadowOffsetX = r.textShadowOffsetX || 0),
              (P.shadowOffsetY = r.textShadowOffsetY || 0)),
            (P.stroke = A),
            (P.fill = D),
            A &&
              ((P.lineWidth = r.lineWidth || S),
              (P.lineDash = r.lineDash),
              (P.lineDashOffset = r.lineDashOffset || 0)),
            (P.font = n),
            vv(P, r),
            (_ += g),
            L.setBoundingRect(
              Zu(P, h.contentWidth, h.calculatedLineHeight, x ? 0 : null),
            ));
        }
      }),
      (t.prototype._updateRichTexts = function () {
        var r = this.style,
          n = this._defaultStyle,
          i = r.align || n.align,
          a = r.verticalAlign || n.verticalAlign,
          o = r.x || 0,
          s = r.y || 0;
        (Wc(He, n.overflowRect, o, s, i, a), (o = He.baseX), (s = He.baseY));
        var l = yv(r),
          u = ub(l, r, He.outerWidth, He.outerHeight, i),
          f = u.width,
          h = u.outerWidth,
          v = u.outerHeight,
          c = r.padding;
        this.isTruncated = !!u.isTruncated;
        var d = ci(o, h, i),
          p = Dn(s, v, a),
          m = d,
          g = p;
        c && ((m += c[3]), (g += c[0]));
        var y = m + f;
        Hl(r) && this._renderBackground(r, r, d, p, h, v);
        for (var _ = !!r.backgroundColor, b = 0; b < u.lines.length; b++) {
          for (
            var w = u.lines[b],
              S = w.tokens,
              x = S.length,
              T = w.lineHeight,
              D = w.width,
              A = 0,
              C = m,
              I = y,
              L = x - 1,
              P = void 0;
            A < x && ((P = S[A]), !P.align || P.align === "left");

          )
            (this._placeToken(P, r, T, g, C, "left", _),
              (D -= P.width),
              (C += P.width),
              A++);
          for (; L >= 0 && ((P = S[L]), P.align === "right"); )
            (this._placeToken(P, r, T, g, I, "right", _),
              (D -= P.width),
              (I -= P.width),
              L--);
          for (C += (f - (C - m) - (y - I) - D) / 2; A <= L; )
            ((P = S[A]),
              this._placeToken(P, r, T, g, C + P.width / 2, "center", _),
              (C += P.width),
              A++);
          g += T;
        }
      }),
      (t.prototype._placeToken = function (r, n, i, a, o, s, l) {
        var u = n.rich[r.styleName] || {};
        u.text = r.text;
        var f = r.verticalAlign,
          h = a + i / 2;
        f === "top"
          ? (h = a + r.height / 2)
          : f === "bottom" && (h = a + i - r.height / 2);
        var v = !r.isLineHolder && Hl(u);
        v &&
          this._renderBackground(
            u,
            n,
            s === "right" ? o - r.width : s === "center" ? o - r.width / 2 : o,
            h - r.height / 2,
            r.width,
            r.height,
          );
        var c = !!u.backgroundColor,
          d = r.textPadding;
        d &&
          ((o = mv(o, s, d)), (h -= r.height / 2 - d[0] - r.innerHeight / 2));
        var p = this._getOrCreateChild(as),
          m = p.createStyle();
        p.useStyle(m);
        var g = this._defaultStyle,
          y = !1,
          _ = 0,
          b = !1,
          w = gv(
            "fill" in u ? u.fill : "fill" in n ? n.fill : ((y = !0), g.fill),
          ),
          S = pv(
            "stroke" in u
              ? u.stroke
              : "stroke" in n
                ? n.stroke
                : !c && !l && (!g.autoStroke || y)
                  ? ((_ = hv), (b = !0), g.stroke)
                  : null,
          ),
          x = u.textShadowBlur > 0 || n.textShadowBlur > 0;
        ((m.text = r.text),
          (m.x = o),
          (m.y = h),
          x &&
            ((m.shadowBlur = u.textShadowBlur || n.textShadowBlur || 0),
            (m.shadowColor =
              u.textShadowColor || n.textShadowColor || "transparent"),
            (m.shadowOffsetX = u.textShadowOffsetX || n.textShadowOffsetX || 0),
            (m.shadowOffsetY =
              u.textShadowOffsetY || n.textShadowOffsetY || 0)),
          (m.textAlign = s),
          (m.textBaseline = "middle"),
          (m.font = r.font || Nr),
          (m.opacity = Cn(u.opacity, n.opacity, 1)),
          vv(m, u),
          S &&
            ((m.lineWidth = Cn(u.lineWidth, n.lineWidth, _)),
            (m.lineDash = K(u.lineDash, n.lineDash)),
            (m.lineDashOffset = n.lineDashOffset || 0),
            (m.stroke = S)),
          w && (m.fill = w),
          p.setBoundingRect(
            Zu(m, r.contentWidth, r.contentHeight, b ? 0 : null),
          ));
      }),
      (t.prototype._renderBackground = function (r, n, i, a, o, s) {
        var l = r.backgroundColor,
          u = r.borderWidth,
          f = r.borderColor,
          h = l && l.image,
          v = l && !h,
          c = r.borderRadius,
          d = this,
          p,
          m;
        if (v || r.lineHeight || (u && f)) {
          ((p = this._getOrCreateChild(Tt)),
            p.useStyle(p.createStyle()),
            (p.style.fill = null));
          var g = p.shape;
          ((g.x = i),
            (g.y = a),
            (g.width = o),
            (g.height = s),
            (g.r = c),
            p.dirtyShape());
        }
        if (v) {
          var y = p.style;
          ((y.fill = l || null), (y.fillOpacity = K(r.fillOpacity, 1)));
        } else if (h) {
          ((m = this._getOrCreateChild(Yr)),
            (m.onload = function () {
              d.dirtyStyle();
            }));
          var _ = m.style;
          ((_.image = l.image),
            (_.x = i),
            (_.y = a),
            (_.width = o),
            (_.height = s));
        }
        if (u && f) {
          var y = p.style;
          ((y.lineWidth = u),
            (y.stroke = f),
            (y.strokeOpacity = K(r.strokeOpacity, 1)),
            (y.lineDash = r.borderDash),
            (y.lineDashOffset = r.borderDashOffset || 0),
            (p.strokeContainThreshold = 0),
            p.hasFill() &&
              p.hasStroke() &&
              ((y.strokeFirst = !0), (y.lineWidth *= 2)));
        }
        var b = (p || m).style;
        ((b.shadowBlur = r.shadowBlur || 0),
          (b.shadowColor = r.shadowColor || "transparent"),
          (b.shadowOffsetX = r.shadowOffsetX || 0),
          (b.shadowOffsetY = r.shadowOffsetY || 0),
          (b.opacity = Cn(r.opacity, n.opacity, 1)));
      }),
      (t.makeFont = function (r) {
        var n = "";
        return (
          mS(r) &&
            (n = [
              r.fontStyle,
              r.fontWeight,
              gS(r.fontSize),
              r.fontFamily || "sans-serif",
            ].join(" ")),
          (n && Ye(n)) || r.textFont || r.font
        );
      }),
      t
    );
  })(Ea),
  dS = { left: !0, right: 1, center: 1 },
  pS = { top: 1, bottom: 1, middle: 1 },
  cv = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function gS(e) {
  return typeof e == "string" &&
    (e.indexOf("px") !== -1 ||
      e.indexOf("rem") !== -1 ||
      e.indexOf("em") !== -1)
    ? e
    : isNaN(+e)
      ? gh + "px"
      : e + "px";
}
function vv(e, t) {
  for (var r = 0; r < cv.length; r++) {
    var n = cv[r],
      i = t[n];
    i != null && (e[n] = i);
  }
}
function mS(e) {
  return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function yS(e) {
  return (dv(e), M(e.rich, dv), e);
}
function dv(e) {
  if (e) {
    e.font = Ht.makeFont(e);
    var t = e.align;
    (t === "middle" && (t = "center"),
      (e.align = t == null || dS[t] ? t : "left"));
    var r = e.verticalAlign;
    (r === "center" && (r = "middle"),
      (e.verticalAlign = r == null || pS[r] ? r : "top"));
    var n = e.padding;
    n && (e.padding = Sh(e.padding));
  }
}
function pv(e, t) {
  return e == null || t <= 0 || e === "transparent" || e === "none"
    ? null
    : e.image || e.colorStops
      ? "#000"
      : e;
}
function gv(e) {
  return e == null || e === "none"
    ? null
    : e.image || e.colorStops
      ? "#000"
      : e;
}
function mv(e, t, r) {
  return t === "right"
    ? e - r[1]
    : t === "center"
      ? e + r[3] / 2 - r[1] / 2
      : e + r[3];
}
function yv(e) {
  var t = e.text;
  return (t != null && (t += ""), t);
}
function Hl(e) {
  return !!(
    e.backgroundColor ||
    e.lineHeight ||
    (e.borderWidth && e.borderColor)
  );
}
var _v = 1e-4,
  cm = 20;
function _S(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
var ma = Math.min,
  ue = Math.max,
  Xe = Math.abs;
function cf(e, t, r, n) {
  var i = t[0],
    a = t[1],
    o = r[0],
    s = r[1],
    l = a - i,
    u = s - o;
  if (l === 0) return u === 0 ? o : (o + s) / 2;
  if (n)
    if (l > 0) {
      if (e <= i) return o;
      if (e >= a) return s;
    } else {
      if (e >= i) return o;
      if (e <= a) return s;
    }
  else {
    if (e === i) return o;
    if (e === a) return s;
  }
  return ((e - i) / l) * u + o;
}
var mt = bS;
function bS(e, t, r) {
  switch (e) {
    case "center":
    case "middle":
      e = "50%";
      break;
    case "left":
    case "top":
      e = "0%";
      break;
    case "right":
    case "bottom":
      e = "100%";
      break;
  }
  return vf(e, t, r);
}
function vf(e, t, r) {
  return U(e)
    ? _S(e).match(/%$/)
      ? (parseFloat(e) / 100) * t + (r || 0)
      : parseFloat(e)
    : e == null
      ? NaN
      : +e;
}
function Gt(e, t, r) {
  return (
    t == null && (t = 10),
    (t = Math.min(Math.max(0, t), cm)),
    (e = (+e).toFixed(t)),
    r ? e : +e
  );
}
function ur(e) {
  if (((e = +e), isNaN(e))) return 0;
  if (e > 1e-14) {
    for (var t = 1, r = 0; r < 15; r++, t *= 10)
      if (Math.round(e * t) / t === e) return r;
  }
  return SS(e);
}
function SS(e) {
  var t = e.toString().toLowerCase(),
    r = t.indexOf("e"),
    n = r > 0 ? +t.slice(r + 1) : 0,
    i = r > 0 ? r : t.length,
    a = t.indexOf("."),
    o = a < 0 ? 0 : i - 1 - a;
  return Math.max(0, o - n);
}
function wS(e, t) {
  var r = Math.log,
    n = Math.LN10,
    i = Math.floor(r(e[1] - e[0]) / n),
    a = Math.round(r(Xe(t[1] - t[0])) / n),
    o = Math.min(Math.max(-i + a, 0), 20);
  return isFinite(o) ? o : 20;
}
function xS(e, t) {
  var r = Fr(
    e,
    function (c, d) {
      return c + (isNaN(d) ? 0 : d);
    },
    0,
  );
  if (r === 0) return [];
  for (
    var n = Math.pow(10, t),
      i = q(e, function (c) {
        return ((isNaN(c) ? 0 : c) / r) * n * 100;
      }),
      a = n * 100,
      o = q(i, function (c) {
        return Math.floor(c);
      }),
      s = Fr(
        o,
        function (c, d) {
          return c + d;
        },
        0,
      ),
      l = q(i, function (c, d) {
        return c - o[d];
      });
    s < a;

  ) {
    for (
      var u = Number.NEGATIVE_INFINITY, f = null, h = 0, v = l.length;
      h < v;
      ++h
    )
      l[h] > u && ((u = l[h]), (f = h));
    (++o[f], (l[f] = 0), ++s);
  }
  return q(o, function (c) {
    return c / n;
  });
}
function TS(e, t) {
  var r = Math.max(ur(e), ur(t)),
    n = e + t;
  return r > cm ? n : Gt(n, r);
}
function vm(e) {
  var t = Math.PI * 2;
  return ((e % t) + t) % t;
}
function os(e) {
  return e > -_v && e < _v;
}
var CS =
  /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Si(e) {
  if (e instanceof Date) return e;
  if (U(e)) {
    var t = CS.exec(e);
    if (!t) return new Date(NaN);
    if (t[8]) {
      var r = +t[4] || 0;
      return (
        t[8].toUpperCase() !== "Z" && (r -= +t[8].slice(0, 3)),
        new Date(
          Date.UTC(
            +t[1],
            +(t[2] || 1) - 1,
            +t[3] || 1,
            r,
            +(t[5] || 0),
            +t[6] || 0,
            t[7] ? +t[7].substring(0, 3) : 0,
          ),
        )
      );
    } else
      return new Date(
        +t[1],
        +(t[2] || 1) - 1,
        +t[3] || 1,
        +t[4] || 0,
        +(t[5] || 0),
        +t[6] || 0,
        t[7] ? +t[7].substring(0, 3) : 0,
      );
  } else if (e == null) return new Date(NaN);
  return new Date(Math.round(e));
}
function DS(e) {
  return Math.pow(10, Ah(e));
}
function Ah(e) {
  if (e === 0) return 0;
  var t = Math.floor(Math.log(e) / Math.LN10);
  return (e / Math.pow(10, t) >= 10 && t++, t);
}
function dm(e, t) {
  var r = Ah(e),
    n = Math.pow(10, r),
    i = e / n,
    a;
  return (
    i < 1.5
      ? (a = 1)
      : i < 2.5
        ? (a = 2)
        : i < 4
          ? (a = 3)
          : i < 7
            ? (a = 5)
            : (a = 10),
    (e = a * n),
    r >= -20 ? +e.toFixed(r < 0 ? -r : 0) : e
  );
}
function ss(e) {
  var t = parseFloat(e);
  return t == e && (t !== 0 || !U(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function MS(e) {
  return !isNaN(ss(e));
}
function pm() {
  return Math.round(Math.random() * 9);
}
function gm(e, t) {
  return t === 0 ? e : gm(t, e % t);
}
function bv(e, t) {
  return e == null ? t : t == null ? e : (e * t) / gm(e, t);
}
var AS = "[ECharts] ",
  LS = typeof console < "u" && console.warn && console.log;
function IS(e, t, r) {
  LS && console[e](AS + t);
}
function mm(e, t) {
  IS("error", e);
}
function ee(e) {
  throw new Error(e);
}
function Sv(e, t, r) {
  return (t - e) * r + e;
}
var ym = "series\0",
  PS = "\0_ec_\0";
function Kt(e) {
  return e instanceof Array ? e : e == null ? [] : [e];
}
function df(e, t, r) {
  if (e) {
    ((e[t] = e[t] || {}),
      (e.emphasis = e.emphasis || {}),
      (e.emphasis[t] = e.emphasis[t] || {}));
    for (var n = 0, i = r.length; n < i; n++) {
      var a = r[n];
      !e.emphasis[t].hasOwnProperty(a) &&
        e[t].hasOwnProperty(a) &&
        (e.emphasis[t][a] = e[t][a]);
    }
  }
}
var wv = [
  "fontStyle",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "rich",
  "tag",
  "color",
  "textBorderColor",
  "textBorderWidth",
  "width",
  "height",
  "lineHeight",
  "align",
  "verticalAlign",
  "baseline",
  "shadowColor",
  "shadowBlur",
  "shadowOffsetX",
  "shadowOffsetY",
  "textShadowColor",
  "textShadowBlur",
  "textShadowOffsetX",
  "textShadowOffsetY",
  "backgroundColor",
  "borderColor",
  "borderWidth",
  "borderRadius",
  "padding",
];
function Oa(e) {
  return X(e) && !W(e) && !(e instanceof Date) ? e.value : e;
}
function kS(e) {
  return X(e) && !(e instanceof Array);
}
function RS(e, t, r) {
  var n = r === "normalMerge",
    i = r === "replaceMerge",
    a = r === "replaceAll";
  ((e = e || []), (t = (t || []).slice()));
  var o = rt();
  M(t, function (l, u) {
    if (!X(l)) {
      t[u] = null;
      return;
    }
  });
  var s = ES(e, o, r);
  return (
    (n || i) && OS(s, e, o, t),
    n && BS(s, t),
    n || i ? NS(s, t, i) : a && FS(s, t),
    zS(s),
    s
  );
}
function ES(e, t, r) {
  var n = [];
  if (r === "replaceAll") return n;
  for (var i = 0; i < e.length; i++) {
    var a = e[i];
    (a && a.id != null && t.set(a.id, i),
      n.push({
        existing: r === "replaceMerge" || ya(a) ? null : a,
        newOption: null,
        keyInfo: null,
        brandNew: null,
      }));
  }
  return n;
}
function OS(e, t, r, n) {
  M(n, function (i, a) {
    if (!(!i || i.id == null)) {
      var o = na(i.id),
        s = r.get(o);
      if (s != null) {
        var l = e[s];
        (dr(!l.newOption, 'Duplicated option on id "' + o + '".'),
          (l.newOption = i),
          (l.existing = t[s]),
          (n[a] = null));
      }
    }
  });
}
function BS(e, t) {
  M(t, function (r, n) {
    if (!(!r || r.name == null))
      for (var i = 0; i < e.length; i++) {
        var a = e[i].existing;
        if (
          !e[i].newOption &&
          a &&
          (a.id == null || r.id == null) &&
          !ya(r) &&
          !ya(a) &&
          _m("name", a, r)
        ) {
          ((e[i].newOption = r), (t[n] = null));
          return;
        }
      }
  });
}
function NS(e, t, r) {
  M(t, function (n) {
    if (n) {
      for (
        var i, a = 0;
        (i = e[a]) &&
        (i.newOption ||
          ya(i.existing) ||
          (i.existing && n.id != null && !_m("id", n, i.existing)));

      )
        a++;
      (i
        ? ((i.newOption = n), (i.brandNew = r))
        : e.push({ newOption: n, brandNew: r, existing: null, keyInfo: null }),
        a++);
    }
  });
}
function FS(e, t) {
  M(t, function (r) {
    e.push({ newOption: r, brandNew: !0, existing: null, keyInfo: null });
  });
}
function zS(e) {
  var t = rt();
  (M(e, function (r) {
    var n = r.existing;
    n && t.set(n.id, r);
  }),
    M(e, function (r) {
      var n = r.newOption;
      (dr(
        !n || n.id == null || !t.get(n.id) || t.get(n.id) === r,
        "id duplicates: " + (n && n.id),
      ),
        n && n.id != null && t.set(n.id, r),
        !r.keyInfo && (r.keyInfo = {}));
    }),
    M(e, function (r, n) {
      var i = r.existing,
        a = r.newOption,
        o = r.keyInfo;
      if (X(a)) {
        if (((o.name = a.name != null ? na(a.name) : i ? i.name : ym + n), i))
          o.id = na(i.id);
        else if (a.id != null) o.id = na(a.id);
        else {
          var s = 0;
          do o.id = "\0" + o.name + "\0" + s++;
          while (t.get(o.id));
        }
        t.set(o.id, r);
      }
    }));
}
function _m(e, t, r) {
  var n = je(t[e], null),
    i = je(r[e], null);
  return n != null && i != null && n === i;
}
function na(e) {
  return je(e, "");
}
function je(e, t) {
  return e == null ? t : U(e) ? e : vt(e) || Wu(e) ? e + "" : t;
}
function Lh(e) {
  var t = e.name;
  return !!(t && t.indexOf(ym));
}
function ya(e) {
  return e && e.id != null && na(e.id).indexOf(PS) === 0;
}
function GS(e, t, r) {
  M(e, function (n) {
    var i = n.newOption;
    X(i) &&
      ((n.keyInfo.mainType = t), (n.keyInfo.subType = HS(t, i, n.existing, r)));
  });
}
function HS(e, t, r, n) {
  var i = t.type ? t.type : r ? r.subType : n.determineSubType(e, t);
  return i;
}
function Rn(e, t) {
  if (t.dataIndexInside != null) return t.dataIndexInside;
  if (t.dataIndex != null)
    return W(t.dataIndex)
      ? q(t.dataIndex, function (r) {
          return e.indexOfRawIndex(r);
        })
      : e.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return W(t.name)
      ? q(t.name, function (r) {
          return e.indexOfName(r);
        })
      : e.indexOfName(t.name);
}
function _t() {
  var e = "__ec_inner_" + VS++;
  return function (t) {
    return t[e] || (t[e] = {});
  };
}
var VS = pm();
function Vl(e, t, r) {
  var n = Ih(t, r),
    i = n.mainTypeSpecified,
    a = n.queryOptionMap,
    o = n.others,
    s = o,
    l = r ? r.defaultMainType : null;
  return (
    !i && l && a.set(l, {}),
    a.each(function (u, f) {
      var h = Ba(e, f, u, {
        useDefault: l === f,
        enableAll: r && r.enableAll != null ? r.enableAll : !0,
        enableNone: r && r.enableNone != null ? r.enableNone : !0,
      });
      ((s[f + "Models"] = h.models), (s[f + "Model"] = h.models[0]));
    }),
    s
  );
}
function Ih(e, t) {
  var r;
  if (U(e)) {
    var n = {};
    ((n[e + "Index"] = 0), (r = n));
  } else r = e;
  var i = rt(),
    a = {},
    o = !1;
  return (
    M(r, function (s, l) {
      if (l === "dataIndex" || l === "dataIndexInside") {
        a[l] = s;
        return;
      }
      var u = l.match(/^(\w+)(Index|Id|Name)$/) || [],
        f = u[1],
        h = (u[2] || "").toLowerCase();
      if (
        !(
          !f ||
          !h ||
          (t && t.includeMainTypes && st(t.includeMainTypes, f) < 0)
        )
      ) {
        o = o || !!f;
        var v = i.get(f) || i.set(f, {});
        v[h] = s;
      }
    }),
    { mainTypeSpecified: o, queryOptionMap: i, others: a }
  );
}
var _e = { useDefault: !0, enableAll: !1, enableNone: !1 };
function Ba(e, t, r, n) {
  n = n || _e;
  var i = r.index,
    a = r.id,
    o = r.name,
    s = { models: null, specified: i != null || a != null || o != null };
  if (!s.specified) {
    var l = void 0;
    return ((s.models = n.useDefault && (l = e.getComponent(t)) ? [l] : []), s);
  }
  if (i === "none" || i === !1) {
    if (n.enableNone) return ((s.models = []), s);
    i = -1;
  }
  return (
    i === "all" && (n.enableAll ? (i = a = o = null) : (i = -1)),
    (s.models = e.queryComponents({ mainType: t, index: i, id: a, name: o })),
    s
  );
}
function bm(e, t, r) {
  e.setAttribute ? e.setAttribute(t, r) : (e[t] = r);
}
function WS(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function US(e) {
  return e === "auto" ? (tt.domSupported ? "html" : "richText") : e || "html";
}
function YS(e, t, r, n, i) {
  var a = t == null || t === "auto";
  if (n == null) return n;
  if (vt(n)) {
    var o = Sv(r || 0, n, i);
    return Gt(o, a ? Math.max(ur(r || 0), ur(n)) : t);
  } else {
    if (U(n)) return i < 1 ? r : n;
    for (
      var s = [], l = r, u = n, f = Math.max(l ? l.length : 0, u.length), h = 0;
      h < f;
      ++h
    ) {
      var v = e.getDimensionInfo(h);
      if (v && v.type === "ordinal") s[h] = (i < 1 && l ? l : u)[h];
      else {
        var c = l && l[h] ? l[h] : 0,
          d = u[h],
          o = Sv(c, d, i);
        s[h] = Gt(o, a ? Math.max(ur(c), ur(d)) : t);
      }
    }
    return s;
  }
}
var ot = _t(),
  $S = function (e, t, r, n) {
    if (n) {
      var i = ot(n);
      ((i.dataIndex = r),
        (i.dataType = t),
        (i.seriesIndex = e),
        (i.ssrType = "chart"),
        n.type === "group" &&
          n.traverse(function (a) {
            var o = ot(a);
            ((o.seriesIndex = e),
              (o.dataIndex = r),
              (o.dataType = t),
              (o.ssrType = "chart"));
          }));
    }
  },
  xv = 1,
  Tv = {},
  Sm = _t(),
  Ph = _t(),
  kh = 0,
  Xs = 1,
  qs = 2,
  Te = ["emphasis", "blur", "select"],
  ls = ["normal", "emphasis", "blur", "select"],
  XS = 10,
  qS = 9,
  Ln = "highlight",
  Go = "downplay",
  us = "select",
  pf = "unselect",
  fs = "toggleSelect",
  Rh = "selectchanged";
function Vn(e) {
  return e != null && e !== "none";
}
function Zs(e, t, r) {
  (e.onHoverStateChange && (e.hoverState || 0) !== r && e.onHoverStateChange(t),
    (e.hoverState = r));
}
function wm(e) {
  Zs(e, "emphasis", qs);
}
function xm(e) {
  e.hoverState === qs && Zs(e, "normal", kh);
}
function Eh(e) {
  Zs(e, "blur", Xs);
}
function Tm(e) {
  e.hoverState === Xs && Zs(e, "normal", kh);
}
function ZS(e) {
  e.selected = !0;
}
function KS(e) {
  e.selected = !1;
}
function Cv(e, t, r) {
  t(e, r);
}
function pr(e, t, r) {
  (Cv(e, t, r),
    e.isGroup &&
      e.traverse(function (n) {
        Cv(n, t, r);
      }));
}
function Dv(e, t) {
  switch (t) {
    case "emphasis":
      e.hoverState = qs;
      break;
    case "normal":
      e.hoverState = kh;
      break;
    case "blur":
      e.hoverState = Xs;
      break;
    case "select":
      e.selected = !0;
  }
}
function jS(e, t, r, n) {
  for (var i = e.style, a = {}, o = 0; o < t.length; o++) {
    var s = t[o],
      l = i[s];
    a[s] = l ?? (n && n[s]);
  }
  for (var o = 0; o < e.animators.length; o++) {
    var u = e.animators[o];
    u.__fromStateTransition &&
      u.__fromStateTransition.indexOf(r) < 0 &&
      u.targetName === "style" &&
      u.saveTo(a, t);
  }
  return a;
}
function QS(e, t, r, n) {
  var i = r && st(r, "select") >= 0,
    a = !1;
  if (e instanceof pt) {
    var o = Sm(e),
      s = (i && o.selectFill) || o.normalFill,
      l = (i && o.selectStroke) || o.normalStroke;
    if (Vn(s) || Vn(l)) {
      n = n || {};
      var u = n.style || {};
      (u.fill === "inherit"
        ? ((a = !0), (n = B({}, n)), (u = B({}, u)), (u.fill = s))
        : !Vn(u.fill) && Vn(s)
          ? ((a = !0), (n = B({}, n)), (u = B({}, u)), (u.fill = ev(s)))
          : !Vn(u.stroke) &&
            Vn(l) &&
            (a || ((n = B({}, n)), (u = B({}, u))), (u.stroke = ev(l))),
        (n.style = u));
    }
  }
  if (n && n.z2 == null) {
    a || (n = B({}, n));
    var f = e.z2EmphasisLift;
    n.z2 = e.z2 + (f ?? XS);
  }
  return n;
}
function JS(e, t, r) {
  if (r && r.z2 == null) {
    r = B({}, r);
    var n = e.z2SelectLift;
    r.z2 = e.z2 + (n ?? qS);
  }
  return r;
}
function tw(e, t, r) {
  var n = st(e.currentStates, t) >= 0,
    i = e.style.opacity,
    a = n ? null : jS(e, ["opacity"], t, { opacity: 1 });
  r = r || {};
  var o = r.style || {};
  return (
    o.opacity == null &&
      ((r = B({}, r)),
      (o = B({ opacity: n ? i : a.opacity * 0.1 }, o)),
      (r.style = o)),
    r
  );
}
function Wl(e, t) {
  var r = this.states[e];
  if (this.style) {
    if (e === "emphasis") return QS(this, e, t, r);
    if (e === "blur") return tw(this, e, r);
    if (e === "select") return JS(this, e, r);
  }
  return r;
}
function ew(e) {
  e.stateProxy = Wl;
  var t = e.getTextContent(),
    r = e.getTextGuideLine();
  (t && (t.stateProxy = Wl), r && (r.stateProxy = Wl));
}
function Mv(e, t) {
  !Am(e, t) && !e.__highByOuter && pr(e, wm);
}
function Av(e, t) {
  !Am(e, t) && !e.__highByOuter && pr(e, xm);
}
function hs(e, t) {
  ((e.__highByOuter |= 1 << (t || 0)), pr(e, wm));
}
function cs(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && pr(e, xm);
}
function rw(e) {
  pr(e, Eh);
}
function Cm(e) {
  pr(e, Tm);
}
function Dm(e) {
  pr(e, ZS);
}
function Mm(e) {
  pr(e, KS);
}
function Am(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function Lm(e) {
  var t = e.getModel(),
    r = [],
    n = [];
  (t.eachComponent(function (i, a) {
    var o = Ph(a),
      s = i === "series",
      l = s ? e.getViewOfSeriesModel(a) : e.getViewOfComponentModel(a);
    (!s && n.push(l),
      o.isBlured &&
        (l.group.traverse(function (u) {
          Tm(u);
        }),
        s && r.push(a)),
      (o.isBlured = !1));
  }),
    M(n, function (i) {
      i && i.toggleBlurSeries && i.toggleBlurSeries(r, !1, t);
    }));
}
function gf(e, t, r, n) {
  var i = n.getModel();
  r = r || "coordinateSystem";
  function a(u, f) {
    for (var h = 0; h < f.length; h++) {
      var v = u.getItemGraphicEl(f[h]);
      v && Cm(v);
    }
  }
  if (e != null && !(!t || t === "none")) {
    var o = i.getSeriesByIndex(e),
      s = o.coordinateSystem;
    s && s.master && (s = s.master);
    var l = [];
    (i.eachSeries(function (u) {
      var f = o === u,
        h = u.coordinateSystem;
      h && h.master && (h = h.master);
      var v = h && s ? h === s : f;
      if (
        !(
          (r === "series" && !f) ||
          (r === "coordinateSystem" && !v) ||
          (t === "series" && f)
        )
      ) {
        var c = n.getViewOfSeriesModel(u);
        if (
          (c.group.traverse(function (m) {
            (m.__highByOuter && f && t === "self") || Eh(m);
          }),
          ae(t))
        )
          a(u.getData(), t);
        else if (X(t))
          for (var d = yt(t), p = 0; p < d.length; p++)
            a(u.getData(d[p]), t[d[p]]);
        (l.push(u), (Ph(u).isBlured = !0));
      }
    }),
      i.eachComponent(function (u, f) {
        if (u !== "series") {
          var h = n.getViewOfComponentModel(f);
          h && h.toggleBlurSeries && h.toggleBlurSeries(l, !0, i);
        }
      }));
  }
}
function mf(e, t, r) {
  if (!(e == null || t == null)) {
    var n = r.getModel().getComponent(e, t);
    if (n) {
      Ph(n).isBlured = !0;
      var i = r.getViewOfComponentModel(n);
      !i ||
        !i.focusBlurEnabled ||
        i.group.traverse(function (a) {
          Eh(a);
        });
    }
  }
}
function nw(e, t, r) {
  var n = e.seriesIndex,
    i = e.getData(t.dataType);
  if (i) {
    var a = Rn(i, t);
    a = (W(a) ? a[0] : a) || 0;
    var o = i.getItemGraphicEl(a);
    if (!o)
      for (var s = i.count(), l = 0; !o && l < s; ) o = i.getItemGraphicEl(l++);
    if (o) {
      var u = ot(o);
      gf(n, u.focus, u.blurScope, r);
    } else {
      var f = e.get(["emphasis", "focus"]),
        h = e.get(["emphasis", "blurScope"]);
      f != null && gf(n, f, h, r);
    }
  }
}
function Oh(e, t, r, n) {
  var i = { focusSelf: !1, dispatchers: null };
  if (e == null || e === "series" || t == null || r == null) return i;
  var a = n.getModel().getComponent(e, t);
  if (!a) return i;
  var o = n.getViewOfComponentModel(a);
  if (!o || !o.findHighDownDispatchers) return i;
  for (var s = o.findHighDownDispatchers(r), l, u = 0; u < s.length; u++)
    if (ot(s[u]).focus === "self") {
      l = !0;
      break;
    }
  return { focusSelf: l, dispatchers: s };
}
function iw(e, t, r) {
  var n = ot(e),
    i = Oh(n.componentMainType, n.componentIndex, n.componentHighDownName, r),
    a = i.dispatchers,
    o = i.focusSelf;
  a
    ? (o && mf(n.componentMainType, n.componentIndex, r),
      M(a, function (s) {
        return Mv(s, t);
      }))
    : (gf(n.seriesIndex, n.focus, n.blurScope, r),
      n.focus === "self" && mf(n.componentMainType, n.componentIndex, r),
      Mv(e, t));
}
function aw(e, t, r) {
  Lm(r);
  var n = ot(e),
    i = Oh(
      n.componentMainType,
      n.componentIndex,
      n.componentHighDownName,
      r,
    ).dispatchers;
  i
    ? M(i, function (a) {
        return Av(a, t);
      })
    : Av(e, t);
}
function ow(e, t, r) {
  if (bf(t)) {
    var n = t.dataType,
      i = e.getData(n),
      a = Rn(i, t);
    (W(a) || (a = [a]),
      e[t.type === fs ? "toggleSelect" : t.type === us ? "select" : "unselect"](
        a,
        n,
      ));
  }
}
function Lv(e) {
  var t = e.getAllData();
  M(t, function (r) {
    var n = r.data,
      i = r.type;
    n.eachItemGraphicEl(function (a, o) {
      e.isSelected(o, i) ? Dm(a) : Mm(a);
    });
  });
}
function sw(e) {
  var t = [];
  return (
    e.eachSeries(function (r) {
      var n = r.getAllData();
      M(n, function (i) {
        i.data;
        var a = i.type,
          o = r.getSelectedDataIndices();
        if (o.length > 0) {
          var s = { dataIndex: o, seriesIndex: r.seriesIndex };
          (a != null && (s.dataType = a), t.push(s));
        }
      });
    }),
    t
  );
}
function yf(e, t, r) {
  (Im(e, !0), pr(e, ew), uw(e, t, r));
}
function lw(e) {
  Im(e, !1);
}
function _a(e, t, r, n) {
  n ? lw(e) : yf(e, t, r);
}
function uw(e, t, r) {
  var n = ot(e);
  t != null ? ((n.focus = t), (n.blurScope = r)) : n.focus && (n.focus = null);
}
var Iv = ["emphasis", "blur", "select"],
  fw = {
    itemStyle: "getItemStyle",
    lineStyle: "getLineStyle",
    areaStyle: "getAreaStyle",
  };
function vs(e, t, r, n) {
  r = r || "itemStyle";
  for (var i = 0; i < Iv.length; i++) {
    var a = Iv[i],
      o = t.getModel([a, r]),
      s = e.ensureState(a);
    s.style = o[fw[r]]();
  }
}
function Im(e, t) {
  var r = t === !1,
    n = e;
  (e.highDownSilentOnTouch &&
    (n.__highDownSilentOnTouch = e.highDownSilentOnTouch),
    (!r || n.__highDownDispatcher) &&
      ((n.__highByOuter = n.__highByOuter || 0),
      (n.__highDownDispatcher = !r)));
}
function _f(e) {
  return !!(e && e.__highDownDispatcher);
}
function hw(e) {
  var t = Tv[e];
  return (t == null && xv <= 32 && (t = Tv[e] = xv++), t);
}
function bf(e) {
  var t = e.type;
  return t === us || t === pf || t === fs;
}
function Pv(e) {
  var t = e.type;
  return t === Ln || t === Go;
}
function cw(e) {
  var t = Sm(e);
  ((t.normalFill = e.style.fill), (t.normalStroke = e.style.stroke));
  var r = e.states.select || {};
  ((t.selectFill = (r.style && r.style.fill) || null),
    (t.selectStroke = (r.style && r.style.stroke) || null));
}
var Wn = kn.CMD,
  vw = [[], [], []],
  kv = Math.sqrt,
  dw = Math.atan2;
function pw(e, t) {
  if (t) {
    var r = e.data,
      n = e.len(),
      i,
      a,
      o,
      s,
      l,
      u,
      f = Wn.M,
      h = Wn.C,
      v = Wn.L,
      c = Wn.R,
      d = Wn.A,
      p = Wn.Q;
    for (o = 0, s = 0; o < n; ) {
      switch (((i = r[o++]), (s = o), (a = 0), i)) {
        case f:
          a = 1;
          break;
        case v:
          a = 1;
          break;
        case h:
          a = 3;
          break;
        case p:
          a = 2;
          break;
        case d:
          var m = t[4],
            g = t[5],
            y = kv(t[0] * t[0] + t[1] * t[1]),
            _ = kv(t[2] * t[2] + t[3] * t[3]),
            b = dw(-t[1] / _, t[0] / y);
          ((r[o] *= y),
            (r[o++] += m),
            (r[o] *= _),
            (r[o++] += g),
            (r[o++] *= y),
            (r[o++] *= _),
            (r[o++] += b),
            (r[o++] += b),
            (o += 2),
            (s = o));
          break;
        case c:
          ((u[0] = r[o++]),
            (u[1] = r[o++]),
            Se(u, u, t),
            (r[s++] = u[0]),
            (r[s++] = u[1]),
            (u[0] += r[o++]),
            (u[1] += r[o++]),
            Se(u, u, t),
            (r[s++] = u[0]),
            (r[s++] = u[1]));
      }
      for (l = 0; l < a; l++) {
        var w = vw[l];
        ((w[0] = r[o++]),
          (w[1] = r[o++]),
          Se(w, w, t),
          (r[s++] = w[0]),
          (r[s++] = w[1]));
      }
    }
    e.increaseVersion();
  }
}
var Ul = Math.sqrt,
  no = Math.sin,
  io = Math.cos,
  Mi = Math.PI;
function Rv(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Sf(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (Rv(e) * Rv(t));
}
function Ev(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(Sf(e, t));
}
function Ov(e, t, r, n, i, a, o, s, l, u, f) {
  var h = l * (Mi / 180),
    v = (io(h) * (e - r)) / 2 + (no(h) * (t - n)) / 2,
    c = (-1 * no(h) * (e - r)) / 2 + (io(h) * (t - n)) / 2,
    d = (v * v) / (o * o) + (c * c) / (s * s);
  d > 1 && ((o *= Ul(d)), (s *= Ul(d)));
  var p =
      (i === a ? -1 : 1) *
        Ul(
          (o * o * (s * s) - o * o * (c * c) - s * s * (v * v)) /
            (o * o * (c * c) + s * s * (v * v)),
        ) || 0,
    m = (p * o * c) / s,
    g = (p * -s * v) / o,
    y = (e + r) / 2 + io(h) * m - no(h) * g,
    _ = (t + n) / 2 + no(h) * m + io(h) * g,
    b = Ev([1, 0], [(v - m) / o, (c - g) / s]),
    w = [(v - m) / o, (c - g) / s],
    S = [(-1 * v - m) / o, (-1 * c - g) / s],
    x = Ev(w, S);
  if ((Sf(w, S) <= -1 && (x = Mi), Sf(w, S) >= 1 && (x = 0), x < 0)) {
    var T = Math.round((x / Mi) * 1e6) / 1e6;
    x = Mi * 2 + (T % 2) * Mi;
  }
  f.addData(u, y, _, o, s, b, x, h, a);
}
var gw = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
  mw = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function yw(e) {
  var t = new kn();
  if (!e) return t;
  var r = 0,
    n = 0,
    i = r,
    a = n,
    o,
    s = kn.CMD,
    l = e.match(gw);
  if (!l) return t;
  for (var u = 0; u < l.length; u++) {
    for (
      var f = l[u],
        h = f.charAt(0),
        v = void 0,
        c = f.match(mw) || [],
        d = c.length,
        p = 0;
      p < d;
      p++
    )
      c[p] = parseFloat(c[p]);
    for (var m = 0; m < d; ) {
      var g = void 0,
        y = void 0,
        _ = void 0,
        b = void 0,
        w = void 0,
        S = void 0,
        x = void 0,
        T = r,
        D = n,
        A = void 0,
        C = void 0;
      switch (h) {
        case "l":
          ((r += c[m++]), (n += c[m++]), (v = s.L), t.addData(v, r, n));
          break;
        case "L":
          ((r = c[m++]), (n = c[m++]), (v = s.L), t.addData(v, r, n));
          break;
        case "m":
          ((r += c[m++]),
            (n += c[m++]),
            (v = s.M),
            t.addData(v, r, n),
            (i = r),
            (a = n),
            (h = "l"));
          break;
        case "M":
          ((r = c[m++]),
            (n = c[m++]),
            (v = s.M),
            t.addData(v, r, n),
            (i = r),
            (a = n),
            (h = "L"));
          break;
        case "h":
          ((r += c[m++]), (v = s.L), t.addData(v, r, n));
          break;
        case "H":
          ((r = c[m++]), (v = s.L), t.addData(v, r, n));
          break;
        case "v":
          ((n += c[m++]), (v = s.L), t.addData(v, r, n));
          break;
        case "V":
          ((n = c[m++]), (v = s.L), t.addData(v, r, n));
          break;
        case "C":
          ((v = s.C),
            t.addData(v, c[m++], c[m++], c[m++], c[m++], c[m++], c[m++]),
            (r = c[m - 2]),
            (n = c[m - 1]));
          break;
        case "c":
          ((v = s.C),
            t.addData(
              v,
              c[m++] + r,
              c[m++] + n,
              c[m++] + r,
              c[m++] + n,
              c[m++] + r,
              c[m++] + n,
            ),
            (r += c[m - 2]),
            (n += c[m - 1]));
          break;
        case "S":
          ((g = r),
            (y = n),
            (A = t.len()),
            (C = t.data),
            o === s.C && ((g += r - C[A - 4]), (y += n - C[A - 3])),
            (v = s.C),
            (T = c[m++]),
            (D = c[m++]),
            (r = c[m++]),
            (n = c[m++]),
            t.addData(v, g, y, T, D, r, n));
          break;
        case "s":
          ((g = r),
            (y = n),
            (A = t.len()),
            (C = t.data),
            o === s.C && ((g += r - C[A - 4]), (y += n - C[A - 3])),
            (v = s.C),
            (T = r + c[m++]),
            (D = n + c[m++]),
            (r += c[m++]),
            (n += c[m++]),
            t.addData(v, g, y, T, D, r, n));
          break;
        case "Q":
          ((T = c[m++]),
            (D = c[m++]),
            (r = c[m++]),
            (n = c[m++]),
            (v = s.Q),
            t.addData(v, T, D, r, n));
          break;
        case "q":
          ((T = c[m++] + r),
            (D = c[m++] + n),
            (r += c[m++]),
            (n += c[m++]),
            (v = s.Q),
            t.addData(v, T, D, r, n));
          break;
        case "T":
          ((g = r),
            (y = n),
            (A = t.len()),
            (C = t.data),
            o === s.Q && ((g += r - C[A - 4]), (y += n - C[A - 3])),
            (r = c[m++]),
            (n = c[m++]),
            (v = s.Q),
            t.addData(v, g, y, r, n));
          break;
        case "t":
          ((g = r),
            (y = n),
            (A = t.len()),
            (C = t.data),
            o === s.Q && ((g += r - C[A - 4]), (y += n - C[A - 3])),
            (r += c[m++]),
            (n += c[m++]),
            (v = s.Q),
            t.addData(v, g, y, r, n));
          break;
        case "A":
          ((_ = c[m++]),
            (b = c[m++]),
            (w = c[m++]),
            (S = c[m++]),
            (x = c[m++]),
            (T = r),
            (D = n),
            (r = c[m++]),
            (n = c[m++]),
            (v = s.A),
            Ov(T, D, r, n, S, x, _, b, w, v, t));
          break;
        case "a":
          ((_ = c[m++]),
            (b = c[m++]),
            (w = c[m++]),
            (S = c[m++]),
            (x = c[m++]),
            (T = r),
            (D = n),
            (r += c[m++]),
            (n += c[m++]),
            (v = s.A),
            Ov(T, D, r, n, S, x, _, b, w, v, t));
          break;
      }
    }
    ((h === "z" || h === "Z") && ((v = s.Z), t.addData(v), (r = i), (n = a)),
      (o = v));
  }
  return (t.toStatic(), t);
}
var Pm = (function (e) {
  G(t, e);
  function t() {
    return (e !== null && e.apply(this, arguments)) || this;
  }
  return ((t.prototype.applyTransform = function (r) {}), t);
})(pt);
function km(e) {
  return e.setData != null;
}
function Rm(e, t) {
  var r = yw(e),
    n = B({}, t);
  return (
    (n.buildPath = function (i) {
      var a = km(i);
      if (a && i.canSave()) {
        i.appendPath(r);
        var o = i.getContext();
        o && i.rebuildPath(o, 1);
      } else {
        var o = a ? i.getContext() : i;
        o && r.rebuildPath(o, 1);
      }
    }),
    (n.applyTransform = function (i) {
      (pw(r, i), this.dirtyShape());
    }),
    n
  );
}
function _w(e, t) {
  return new Pm(Rm(e, t));
}
function bw(e, t) {
  var r = Rm(e, t),
    n = (function (i) {
      G(a, i);
      function a(o) {
        var s = i.call(this, o) || this;
        return (
          (s.applyTransform = r.applyTransform),
          (s.buildPath = r.buildPath),
          s
        );
      }
      return a;
    })(Pm);
  return n;
}
function Sw(e, t) {
  for (var r = [], n = e.length, i = 0; i < n; i++) {
    var a = e[i];
    r.push(a.getUpdatedPathProxy(!0));
  }
  var o = new pt(t);
  return (
    o.createPathProxy(),
    (o.buildPath = function (s) {
      if (km(s)) {
        s.appendPath(r);
        var l = s.getContext();
        l && s.rebuildPath(l, 1);
      }
    }),
    o
  );
}
var Et = (function (e) {
  G(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return ((n.isGroup = !0), (n._children = []), n.attr(r), n);
  }
  return (
    (t.prototype.childrenRef = function () {
      return this._children;
    }),
    (t.prototype.children = function () {
      return this._children.slice();
    }),
    (t.prototype.childAt = function (r) {
      return this._children[r];
    }),
    (t.prototype.childOfName = function (r) {
      for (var n = this._children, i = 0; i < n.length; i++)
        if (n[i].name === r) return n[i];
    }),
    (t.prototype.childCount = function () {
      return this._children.length;
    }),
    (t.prototype.add = function (r) {
      return (
        r &&
          r !== this &&
          r.parent !== this &&
          (this._children.push(r), this._doAdd(r)),
        this
      );
    }),
    (t.prototype.addBefore = function (r, n) {
      if (r && r !== this && r.parent !== this && n && n.parent === this) {
        var i = this._children,
          a = i.indexOf(n);
        a >= 0 && (i.splice(a, 0, r), this._doAdd(r));
      }
      return this;
    }),
    (t.prototype.replace = function (r, n) {
      var i = st(this._children, r);
      return (i >= 0 && this.replaceAt(n, i), this);
    }),
    (t.prototype.replaceAt = function (r, n) {
      var i = this._children,
        a = i[n];
      if (r && r !== this && r.parent !== this && r !== a) {
        ((i[n] = r), (a.parent = null));
        var o = this.__zr;
        (o && a.removeSelfFromZr(o), this._doAdd(r));
      }
      return this;
    }),
    (t.prototype._doAdd = function (r) {
      (r.parent && r.parent.remove(r), (r.parent = this));
      var n = this.__zr;
      (n && n !== r.__zr && r.addSelfToZr(n), n && n.refresh());
    }),
    (t.prototype.remove = function (r) {
      var n = this.__zr,
        i = this._children,
        a = st(i, r);
      return a < 0
        ? this
        : (i.splice(a, 1),
          (r.parent = null),
          n && r.removeSelfFromZr(n),
          n && n.refresh(),
          this);
    }),
    (t.prototype.removeAll = function () {
      for (var r = this._children, n = this.__zr, i = 0; i < r.length; i++) {
        var a = r[i];
        (n && a.removeSelfFromZr(n), (a.parent = null));
      }
      return ((r.length = 0), this);
    }),
    (t.prototype.eachChild = function (r, n) {
      for (var i = this._children, a = 0; a < i.length; a++) {
        var o = i[a];
        r.call(n, o, a);
      }
      return this;
    }),
    (t.prototype.traverse = function (r, n) {
      for (var i = 0; i < this._children.length; i++) {
        var a = this._children[i],
          o = r.call(n, a);
        a.isGroup && !o && a.traverse(r, n);
      }
      return this;
    }),
    (t.prototype.addSelfToZr = function (r) {
      e.prototype.addSelfToZr.call(this, r);
      for (var n = 0; n < this._children.length; n++) {
        var i = this._children[n];
        i.addSelfToZr(r);
      }
    }),
    (t.prototype.removeSelfFromZr = function (r) {
      e.prototype.removeSelfFromZr.call(this, r);
      for (var n = 0; n < this._children.length; n++) {
        var i = this._children[n];
        i.removeSelfFromZr(r);
      }
    }),
    (t.prototype.getBoundingRect = function (r) {
      for (
        var n = new et(0, 0, 0, 0),
          i = r || this._children,
          a = [],
          o = null,
          s = 0;
        s < i.length;
        s++
      ) {
        var l = i[s];
        if (!(l.ignore || l.invisible)) {
          var u = l.getBoundingRect(),
            f = l.getLocalTransform(a);
          f
            ? (et.applyTransform(n, u, f), (o = o || n.clone()), o.union(n))
            : ((o = o || u.clone()), o.union(u));
        }
      }
      return o || n;
    }),
    t
  );
})(Ys);
Et.prototype.type = "group";
var ww = (function () {
    function e() {
      ((this.cx = 0), (this.cy = 0), (this.r = 0));
    }
    return e;
  })(),
  Ks = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new ww();
      }),
      (t.prototype.buildPath = function (r, n) {
        (r.moveTo(n.cx + n.r, n.cy), r.arc(n.cx, n.cy, n.r, 0, Math.PI * 2));
      }),
      t
    );
  })(pt);
Ks.prototype.type = "circle";
var xw = (function () {
    function e() {
      ((this.cx = 0), (this.cy = 0), (this.rx = 0), (this.ry = 0));
    }
    return e;
  })(),
  Bh = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new xw();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i = 0.5522848,
          a = n.cx,
          o = n.cy,
          s = n.rx,
          l = n.ry,
          u = s * i,
          f = l * i;
        (r.moveTo(a - s, o),
          r.bezierCurveTo(a - s, o - f, a - u, o - l, a, o - l),
          r.bezierCurveTo(a + u, o - l, a + s, o - f, a + s, o),
          r.bezierCurveTo(a + s, o + f, a + u, o + l, a, o + l),
          r.bezierCurveTo(a - u, o + l, a - s, o + f, a - s, o),
          r.closePath());
      }),
      t
    );
  })(pt);
Bh.prototype.type = "ellipse";
var Em = Math.PI,
  Yl = Em * 2,
  fn = Math.sin,
  Un = Math.cos,
  Tw = Math.acos,
  Wt = Math.atan2,
  Bv = Math.abs,
  ia = Math.sqrt,
  Xi = Math.max,
  Ve = Math.min,
  Me = 1e-4;
function Cw(e, t, r, n, i, a, o, s) {
  var l = r - e,
    u = n - t,
    f = o - i,
    h = s - a,
    v = h * l - f * u;
  if (!(v * v < Me))
    return ((v = (f * (t - a) - h * (e - i)) / v), [e + v * l, t + v * u]);
}
function ao(e, t, r, n, i, a, o) {
  var s = e - r,
    l = t - n,
    u = (o ? a : -a) / ia(s * s + l * l),
    f = u * l,
    h = -u * s,
    v = e + f,
    c = t + h,
    d = r + f,
    p = n + h,
    m = (v + d) / 2,
    g = (c + p) / 2,
    y = d - v,
    _ = p - c,
    b = y * y + _ * _,
    w = i - a,
    S = v * p - d * c,
    x = (_ < 0 ? -1 : 1) * ia(Xi(0, w * w * b - S * S)),
    T = (S * _ - y * x) / b,
    D = (-S * y - _ * x) / b,
    A = (S * _ + y * x) / b,
    C = (-S * y + _ * x) / b,
    I = T - m,
    L = D - g,
    P = A - m,
    k = C - g;
  return (
    I * I + L * L > P * P + k * k && ((T = A), (D = C)),
    { cx: T, cy: D, x0: -f, y0: -h, x1: T * (i / w - 1), y1: D * (i / w - 1) }
  );
}
function Dw(e) {
  var t;
  if (W(e)) {
    var r = e.length;
    if (!r) return e;
    r === 1
      ? (t = [e[0], e[0], 0, 0])
      : r === 2
        ? (t = [e[0], e[0], e[1], e[1]])
        : r === 3
          ? (t = e.concat(e[2]))
          : (t = e);
  } else t = [e, e, e, e];
  return t;
}
function Mw(e, t) {
  var r,
    n = Xi(t.r, 0),
    i = Xi(t.r0 || 0, 0),
    a = n > 0,
    o = i > 0;
  if (!(!a && !o)) {
    if ((a || ((n = i), (i = 0)), i > n)) {
      var s = n;
      ((n = i), (i = s));
    }
    var l = t.startAngle,
      u = t.endAngle;
    if (!(isNaN(l) || isNaN(u))) {
      var f = t.cx,
        h = t.cy,
        v = !!t.clockwise,
        c = Bv(u - l),
        d = c > Yl && c % Yl;
      if ((d > Me && (c = d), !(n > Me))) e.moveTo(f, h);
      else if (c > Yl - Me)
        (e.moveTo(f + n * Un(l), h + n * fn(l)),
          e.arc(f, h, n, l, u, !v),
          i > Me &&
            (e.moveTo(f + i * Un(u), h + i * fn(u)), e.arc(f, h, i, u, l, v)));
      else {
        var p = void 0,
          m = void 0,
          g = void 0,
          y = void 0,
          _ = void 0,
          b = void 0,
          w = void 0,
          S = void 0,
          x = void 0,
          T = void 0,
          D = void 0,
          A = void 0,
          C = void 0,
          I = void 0,
          L = void 0,
          P = void 0,
          k = n * Un(l),
          E = n * fn(l),
          V = i * Un(u),
          R = i * fn(u),
          O = c > Me;
        if (O) {
          var z = t.cornerRadius;
          z && ((r = Dw(z)), (p = r[0]), (m = r[1]), (g = r[2]), (y = r[3]));
          var F = Bv(n - i) / 2;
          if (
            ((_ = Ve(F, g)),
            (b = Ve(F, y)),
            (w = Ve(F, p)),
            (S = Ve(F, m)),
            (D = x = Xi(_, b)),
            (A = T = Xi(w, S)),
            (x > Me || T > Me) &&
              ((C = n * Un(u)),
              (I = n * fn(u)),
              (L = i * Un(l)),
              (P = i * fn(l)),
              c < Em))
          ) {
            var N = Cw(k, E, L, P, C, I, V, R);
            if (N) {
              var $ = k - N[0],
                nt = E - N[1],
                ft = C - N[0],
                Ot = I - N[1],
                Xt =
                  1 /
                  fn(
                    Tw(
                      ($ * ft + nt * Ot) /
                        (ia($ * $ + nt * nt) * ia(ft * ft + Ot * Ot)),
                    ) / 2,
                  ),
                Vt = ia(N[0] * N[0] + N[1] * N[1]);
              ((D = Ve(x, (n - Vt) / (Xt + 1))),
                (A = Ve(T, (i - Vt) / (Xt - 1))));
            }
          }
        }
        if (!O) e.moveTo(f + k, h + E);
        else if (D > Me) {
          var Bt = Ve(g, D),
            Ct = Ve(y, D),
            j = ao(L, P, k, E, n, Bt, v),
            it = ao(C, I, V, R, n, Ct, v);
          (e.moveTo(f + j.cx + j.x0, h + j.cy + j.y0),
            D < x && Bt === Ct
              ? e.arc(
                  f + j.cx,
                  h + j.cy,
                  D,
                  Wt(j.y0, j.x0),
                  Wt(it.y0, it.x0),
                  !v,
                )
              : (Bt > 0 &&
                  e.arc(
                    f + j.cx,
                    h + j.cy,
                    Bt,
                    Wt(j.y0, j.x0),
                    Wt(j.y1, j.x1),
                    !v,
                  ),
                e.arc(
                  f,
                  h,
                  n,
                  Wt(j.cy + j.y1, j.cx + j.x1),
                  Wt(it.cy + it.y1, it.cx + it.x1),
                  !v,
                ),
                Ct > 0 &&
                  e.arc(
                    f + it.cx,
                    h + it.cy,
                    Ct,
                    Wt(it.y1, it.x1),
                    Wt(it.y0, it.x0),
                    !v,
                  )));
        } else (e.moveTo(f + k, h + E), e.arc(f, h, n, l, u, !v));
        if (!(i > Me) || !O) e.lineTo(f + V, h + R);
        else if (A > Me) {
          var Bt = Ve(p, A),
            Ct = Ve(m, A),
            j = ao(V, R, C, I, i, -Ct, v),
            it = ao(k, E, L, P, i, -Bt, v);
          (e.lineTo(f + j.cx + j.x0, h + j.cy + j.y0),
            A < T && Bt === Ct
              ? e.arc(
                  f + j.cx,
                  h + j.cy,
                  A,
                  Wt(j.y0, j.x0),
                  Wt(it.y0, it.x0),
                  !v,
                )
              : (Ct > 0 &&
                  e.arc(
                    f + j.cx,
                    h + j.cy,
                    Ct,
                    Wt(j.y0, j.x0),
                    Wt(j.y1, j.x1),
                    !v,
                  ),
                e.arc(
                  f,
                  h,
                  i,
                  Wt(j.cy + j.y1, j.cx + j.x1),
                  Wt(it.cy + it.y1, it.cx + it.x1),
                  v,
                ),
                Bt > 0 &&
                  e.arc(
                    f + it.cx,
                    h + it.cy,
                    Bt,
                    Wt(it.y1, it.x1),
                    Wt(it.y0, it.x0),
                    !v,
                  )));
        } else (e.lineTo(f + V, h + R), e.arc(f, h, i, u, l, v));
      }
      e.closePath();
    }
  }
}
var Aw = (function () {
    function e() {
      ((this.cx = 0),
        (this.cy = 0),
        (this.r0 = 0),
        (this.r = 0),
        (this.startAngle = 0),
        (this.endAngle = Math.PI * 2),
        (this.clockwise = !0),
        (this.cornerRadius = 0));
    }
    return e;
  })(),
  $r = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new Aw();
      }),
      (t.prototype.buildPath = function (r, n) {
        Mw(r, n);
      }),
      (t.prototype.isZeroArea = function () {
        return (
          this.shape.startAngle === this.shape.endAngle ||
          this.shape.r === this.shape.r0
        );
      }),
      t
    );
  })(pt);
$r.prototype.type = "sector";
var Lw = (function () {
    function e() {
      ((this.cx = 0), (this.cy = 0), (this.r = 0), (this.r0 = 0));
    }
    return e;
  })(),
  Nh = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new Lw();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i = n.cx,
          a = n.cy,
          o = Math.PI * 2;
        (r.moveTo(i + n.r, a),
          r.arc(i, a, n.r, 0, o, !1),
          r.moveTo(i + n.r0, a),
          r.arc(i, a, n.r0, 0, o, !0));
      }),
      t
    );
  })(pt);
Nh.prototype.type = "ring";
function Iw(e, t, r, n) {
  var i = [],
    a = [],
    o = [],
    s = [],
    l,
    u,
    f,
    h;
  if (n) {
    ((f = [1 / 0, 1 / 0]), (h = [-1 / 0, -1 / 0]));
    for (var v = 0, c = e.length; v < c; v++) (ni(f, f, e[v]), ii(h, h, e[v]));
    (ni(f, f, n[0]), ii(h, h, n[1]));
  }
  for (var v = 0, c = e.length; v < c; v++) {
    var d = e[v];
    if (r) ((l = e[v ? v - 1 : c - 1]), (u = e[(v + 1) % c]));
    else if (v === 0 || v === c - 1) {
      i.push(db(e[v]));
      continue;
    } else ((l = e[v - 1]), (u = e[v + 1]));
    (pb(a, u, l), Sl(a, a, t));
    var p = Ku(d, l),
      m = Ku(d, u),
      g = p + m;
    (g !== 0 && ((p /= g), (m /= g)), Sl(o, a, -p), Sl(s, a, m));
    var y = $c([], d, o),
      _ = $c([], d, s);
    (n && (ii(y, y, f), ni(y, y, h), ii(_, _, f), ni(_, _, h)),
      i.push(y),
      i.push(_));
  }
  return (r && i.push(i.shift()), i);
}
function Om(e, t, r) {
  var n = t.smooth,
    i = t.points;
  if (i && i.length >= 2) {
    if (n) {
      var a = Iw(i, n, r, t.smoothConstraint);
      e.moveTo(i[0][0], i[0][1]);
      for (var o = i.length, s = 0; s < (r ? o : o - 1); s++) {
        var l = a[s * 2],
          u = a[s * 2 + 1],
          f = i[(s + 1) % o];
        e.bezierCurveTo(l[0], l[1], u[0], u[1], f[0], f[1]);
      }
    } else {
      e.moveTo(i[0][0], i[0][1]);
      for (var s = 1, h = i.length; s < h; s++) e.lineTo(i[s][0], i[s][1]);
    }
    r && e.closePath();
  }
}
var Pw = (function () {
    function e() {
      ((this.points = null), (this.smooth = 0), (this.smoothConstraint = null));
    }
    return e;
  })(),
  Fh = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new Pw();
      }),
      (t.prototype.buildPath = function (r, n) {
        Om(r, n, !0);
      }),
      t
    );
  })(pt);
Fh.prototype.type = "polygon";
var kw = (function () {
    function e() {
      ((this.points = null),
        (this.percent = 1),
        (this.smooth = 0),
        (this.smoothConstraint = null));
    }
    return e;
  })(),
  Na = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultStyle = function () {
        return { stroke: "#000", fill: null };
      }),
      (t.prototype.getDefaultShape = function () {
        return new kw();
      }),
      (t.prototype.buildPath = function (r, n) {
        Om(r, n, !1);
      }),
      t
    );
  })(pt);
Na.prototype.type = "polyline";
var Rw = {},
  Ew = (function () {
    function e() {
      ((this.x1 = 0),
        (this.y1 = 0),
        (this.x2 = 0),
        (this.y2 = 0),
        (this.percent = 1));
    }
    return e;
  })(),
  Gr = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultStyle = function () {
        return { stroke: "#000", fill: null };
      }),
      (t.prototype.getDefaultShape = function () {
        return new Ew();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i, a, o, s;
        if (this.subPixelOptimize) {
          var l = fm(Rw, n, this.style);
          ((i = l.x1), (a = l.y1), (o = l.x2), (s = l.y2));
        } else ((i = n.x1), (a = n.y1), (o = n.x2), (s = n.y2));
        var u = n.percent;
        u !== 0 &&
          (r.moveTo(i, a),
          u < 1 && ((o = i * (1 - u) + o * u), (s = a * (1 - u) + s * u)),
          r.lineTo(o, s));
      }),
      (t.prototype.pointAt = function (r) {
        var n = this.shape;
        return [n.x1 * (1 - r) + n.x2 * r, n.y1 * (1 - r) + n.y2 * r];
      }),
      t
    );
  })(pt);
Gr.prototype.type = "line";
var Qt = [],
  Ow = (function () {
    function e() {
      ((this.x1 = 0),
        (this.y1 = 0),
        (this.x2 = 0),
        (this.y2 = 0),
        (this.cpx1 = 0),
        (this.cpy1 = 0),
        (this.percent = 1));
    }
    return e;
  })();
function Nv(e, t, r) {
  var n = e.cpx2,
    i = e.cpy2;
  return n != null || i != null
    ? [
        (r ? Kc : zt)(e.x1, e.cpx1, e.cpx2, e.x2, t),
        (r ? Kc : zt)(e.y1, e.cpy1, e.cpy2, e.y2, t),
      ]
    : [
        (r ? jc : te)(e.x1, e.cpx1, e.x2, t),
        (r ? jc : te)(e.y1, e.cpy1, e.y2, t),
      ];
}
var zh = (function (e) {
  G(t, e);
  function t(r) {
    return e.call(this, r) || this;
  }
  return (
    (t.prototype.getDefaultStyle = function () {
      return { stroke: "#000", fill: null };
    }),
    (t.prototype.getDefaultShape = function () {
      return new Ow();
    }),
    (t.prototype.buildPath = function (r, n) {
      var i = n.x1,
        a = n.y1,
        o = n.x2,
        s = n.y2,
        l = n.cpx1,
        u = n.cpy1,
        f = n.cpx2,
        h = n.cpy2,
        v = n.percent;
      v !== 0 &&
        (r.moveTo(i, a),
        f == null || h == null
          ? (v < 1 &&
              (rs(i, l, o, v, Qt),
              (l = Qt[1]),
              (o = Qt[2]),
              rs(a, u, s, v, Qt),
              (u = Qt[1]),
              (s = Qt[2])),
            r.quadraticCurveTo(l, u, o, s))
          : (v < 1 &&
              (es(i, l, f, o, v, Qt),
              (l = Qt[1]),
              (f = Qt[2]),
              (o = Qt[3]),
              es(a, u, h, s, v, Qt),
              (u = Qt[1]),
              (h = Qt[2]),
              (s = Qt[3])),
            r.bezierCurveTo(l, u, f, h, o, s)));
    }),
    (t.prototype.pointAt = function (r) {
      return Nv(this.shape, r, !1);
    }),
    (t.prototype.tangentAt = function (r) {
      var n = Nv(this.shape, r, !0);
      return yb(n, n);
    }),
    t
  );
})(pt);
zh.prototype.type = "bezier-curve";
var Bw = (function () {
    function e() {
      ((this.cx = 0),
        (this.cy = 0),
        (this.r = 0),
        (this.startAngle = 0),
        (this.endAngle = Math.PI * 2),
        (this.clockwise = !0));
    }
    return e;
  })(),
  js = (function (e) {
    G(t, e);
    function t(r) {
      return e.call(this, r) || this;
    }
    return (
      (t.prototype.getDefaultStyle = function () {
        return { stroke: "#000", fill: null };
      }),
      (t.prototype.getDefaultShape = function () {
        return new Bw();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i = n.cx,
          a = n.cy,
          o = Math.max(n.r, 0),
          s = n.startAngle,
          l = n.endAngle,
          u = n.clockwise,
          f = Math.cos(s),
          h = Math.sin(s);
        (r.moveTo(f * o + i, h * o + a), r.arc(i, a, o, s, l, !u));
      }),
      t
    );
  })(pt);
js.prototype.type = "arc";
var Nw = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = "compound"), r);
    }
    return (
      (t.prototype._updatePathDirty = function () {
        for (
          var r = this.shape.paths, n = this.shapeChanged(), i = 0;
          i < r.length;
          i++
        )
          n = n || r[i].shapeChanged();
        n && this.dirtyShape();
      }),
      (t.prototype.beforeBrush = function () {
        this._updatePathDirty();
        for (
          var r = this.shape.paths || [], n = this.getGlobalScale(), i = 0;
          i < r.length;
          i++
        )
          (r[i].path || r[i].createPathProxy(),
            r[i].path.setScale(n[0], n[1], r[i].segmentIgnoreThreshold));
      }),
      (t.prototype.buildPath = function (r, n) {
        for (var i = n.paths || [], a = 0; a < i.length; a++)
          i[a].buildPath(r, i[a].shape, !0);
      }),
      (t.prototype.afterBrush = function () {
        for (var r = this.shape.paths || [], n = 0; n < r.length; n++)
          r[n].pathUpdated();
      }),
      (t.prototype.getBoundingRect = function () {
        return (
          this._updatePathDirty.call(this),
          pt.prototype.getBoundingRect.call(this)
        );
      }),
      t
    );
  })(pt),
  Bm = (function () {
    function e(t) {
      this.colorStops = t || [];
    }
    return (
      (e.prototype.addColorStop = function (t, r) {
        this.colorStops.push({ offset: t, color: r });
      }),
      e
    );
  })(),
  Nm = (function (e) {
    G(t, e);
    function t(r, n, i, a, o, s) {
      var l = e.call(this, o) || this;
      return (
        (l.x = r ?? 0),
        (l.y = n ?? 0),
        (l.x2 = i ?? 1),
        (l.y2 = a ?? 0),
        (l.type = "linear"),
        (l.global = s || !1),
        l
      );
    }
    return t;
  })(Bm),
  Fw = (function (e) {
    G(t, e);
    function t(r, n, i, a, o) {
      var s = e.call(this, a) || this;
      return (
        (s.x = r ?? 0.5),
        (s.y = n ?? 0.5),
        (s.r = i ?? 0.5),
        (s.type = "radial"),
        (s.global = o || !1),
        s
      );
    }
    return t;
  })(Bm),
  $l = Math.min,
  zw = Math.max,
  oo = Math.abs,
  hn = [0, 0],
  cn = [0, 0],
  Pt = Yg(),
  so = Pt.minTv,
  lo = Pt.maxTv,
  Fm = (function () {
    function e(t, r) {
      ((this._corners = []), (this._axes = []), (this._origin = [0, 0]));
      for (var n = 0; n < 4; n++) this._corners[n] = new J();
      for (var n = 0; n < 2; n++) this._axes[n] = new J();
      t && this.fromBoundingRect(t, r);
    }
    return (
      (e.prototype.fromBoundingRect = function (t, r) {
        var n = this._corners,
          i = this._axes,
          a = t.x,
          o = t.y,
          s = a + t.width,
          l = o + t.height;
        if ((n[0].set(a, o), n[1].set(s, o), n[2].set(s, l), n[3].set(a, l), r))
          for (var u = 0; u < 4; u++) n[u].transform(r);
        (J.sub(i[0], n[1], n[0]),
          J.sub(i[1], n[3], n[0]),
          i[0].normalize(),
          i[1].normalize());
        for (var u = 0; u < 2; u++) this._origin[u] = i[u].dot(n[0]);
      }),
      (e.prototype.intersect = function (t, r, n) {
        var i = !0,
          a = !r;
        return (
          r && J.set(r, 0, 0),
          Pt.reset(n, !a),
          (!this._intersectCheckOneSide(this, t, a, 1) && ((i = !1), a)) ||
            (!this._intersectCheckOneSide(t, this, a, -1) && ((i = !1), a)) ||
            (!a &&
              !Pt.negativeSize &&
              J.copy(r, i ? (Pt.useDir ? Pt.dirMinTv : so) : lo)),
          i
        );
      }),
      (e.prototype._intersectCheckOneSide = function (t, r, n, i) {
        for (var a = !0, o = 0; o < 2; o++) {
          var s = t._axes[o];
          if (
            (t._getProjMinMaxOnAxis(o, t._corners, hn),
            t._getProjMinMaxOnAxis(o, r._corners, cn),
            Pt.negativeSize || hn[1] < cn[0] || hn[0] > cn[1])
          ) {
            if (((a = !1), Pt.negativeSize || n)) return a;
            var l = oo(cn[0] - hn[1]),
              u = oo(hn[0] - cn[1]);
            $l(l, u) > lo.len() &&
              (l < u ? J.scale(lo, s, -l * i) : J.scale(lo, s, u * i));
          } else if (!n) {
            var l = oo(cn[0] - hn[1]),
              u = oo(hn[0] - cn[1]);
            (Pt.useDir || $l(l, u) < so.len()) &&
              ((l < u || !Pt.bidirectional) &&
                (J.scale(so, s, l * i), Pt.useDir && Pt.calcDirMTV()),
              (l >= u || !Pt.bidirectional) &&
                (J.scale(so, s, -u * i), Pt.useDir && Pt.calcDirMTV()));
          }
        }
        return a;
      }),
      (e.prototype._getProjMinMaxOnAxis = function (t, r, n) {
        for (
          var i = this._axes[t],
            a = this._origin,
            o = r[0].dot(i) + a[t],
            s = o,
            l = o,
            u = 1;
          u < r.length;
          u++
        ) {
          var f = r[u].dot(i) + a[t];
          ((s = $l(f, s)), (l = zw(f, l)));
        }
        ((n[0] = s + Pt.touchThreshold),
          (n[1] = l - Pt.touchThreshold),
          (Pt.negativeSize = n[1] < n[0]));
      }),
      e
    );
  })(),
  Gw = [],
  Hw = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return (
        (r.notClear = !0),
        (r.incremental = !0),
        (r._displayables = []),
        (r._temporaryDisplayables = []),
        (r._cursor = 0),
        r
      );
    }
    return (
      (t.prototype.traverse = function (r, n) {
        r.call(n, this);
      }),
      (t.prototype.useStyle = function () {
        this.style = {};
      }),
      (t.prototype.getCursor = function () {
        return this._cursor;
      }),
      (t.prototype.innerAfterBrush = function () {
        this._cursor = this._displayables.length;
      }),
      (t.prototype.clearDisplaybles = function () {
        ((this._displayables = []),
          (this._temporaryDisplayables = []),
          (this._cursor = 0),
          this.markRedraw(),
          (this.notClear = !1));
      }),
      (t.prototype.clearTemporalDisplayables = function () {
        this._temporaryDisplayables = [];
      }),
      (t.prototype.addDisplayable = function (r, n) {
        (n ? this._temporaryDisplayables.push(r) : this._displayables.push(r),
          this.markRedraw());
      }),
      (t.prototype.addDisplayables = function (r, n) {
        n = n || !1;
        for (var i = 0; i < r.length; i++) this.addDisplayable(r[i], n);
      }),
      (t.prototype.getDisplayables = function () {
        return this._displayables;
      }),
      (t.prototype.getTemporalDisplayables = function () {
        return this._temporaryDisplayables;
      }),
      (t.prototype.eachPendingDisplayable = function (r) {
        for (var n = this._cursor; n < this._displayables.length; n++)
          r && r(this._displayables[n]);
        for (var n = 0; n < this._temporaryDisplayables.length; n++)
          r && r(this._temporaryDisplayables[n]);
      }),
      (t.prototype.update = function () {
        this.updateTransform();
        for (var r = this._cursor; r < this._displayables.length; r++) {
          var n = this._displayables[r];
          ((n.parent = this), n.update(), (n.parent = null));
        }
        for (var r = 0; r < this._temporaryDisplayables.length; r++) {
          var n = this._temporaryDisplayables[r];
          ((n.parent = this), n.update(), (n.parent = null));
        }
      }),
      (t.prototype.getBoundingRect = function () {
        if (!this._rect) {
          for (
            var r = new et(1 / 0, 1 / 0, -1 / 0, -1 / 0), n = 0;
            n < this._displayables.length;
            n++
          ) {
            var i = this._displayables[n],
              a = i.getBoundingRect().clone();
            (i.needLocalTransform() &&
              a.applyTransform(i.getLocalTransform(Gw)),
              r.union(a));
          }
          this._rect = r;
        }
        return this._rect;
      }),
      (t.prototype.contain = function (r, n) {
        var i = this.transformCoordToLocal(r, n),
          a = this.getBoundingRect();
        if (a.contain(i[0], i[1]))
          for (var o = 0; o < this._displayables.length; o++) {
            var s = this._displayables[o];
            if (s.contain(r, n)) return !0;
          }
        return !1;
      }),
      t
    );
  })(Ea),
  Vw = _t();
function Ww(e, t, r, n, i) {
  var a;
  if (t && t.ecModel) {
    var o = t.ecModel.getUpdatePayload();
    a = o && o.animation;
  }
  var s = t && t.isAnimationEnabled(),
    l = e === "update";
  if (s) {
    var u = void 0,
      f = void 0,
      h = void 0;
    (n
      ? ((u = K(n.duration, 200)), (f = K(n.easing, "cubicOut")), (h = 0))
      : ((u = t.getShallow(
          l ? "animationDurationUpdate" : "animationDuration",
        )),
        (f = t.getShallow(l ? "animationEasingUpdate" : "animationEasing")),
        (h = t.getShallow(l ? "animationDelayUpdate" : "animationDelay"))),
      a &&
        (a.duration != null && (u = a.duration),
        a.easing != null && (f = a.easing),
        a.delay != null && (h = a.delay)),
      Q(h) && (h = h(r, i)),
      Q(u) && (u = u(r)));
    var v = { duration: u || 0, delay: h, easing: f };
    return v;
  } else return null;
}
function Gh(e, t, r, n, i, a, o) {
  var s = !1,
    l;
  Q(i)
    ? ((o = a), (a = i), (i = null))
    : X(i) &&
      ((a = i.cb),
      (o = i.during),
      (s = i.isFrom),
      (l = i.removeOpt),
      (i = i.dataIndex));
  var u = e === "leave";
  u || t.stopAnimation("leave");
  var f = Ww(
    e,
    n,
    i,
    u ? l || {} : null,
    n && n.getAnimationDelayParams ? n.getAnimationDelayParams(t, i) : null,
  );
  if (f && f.duration > 0) {
    var h = f.duration,
      v = f.delay,
      c = f.easing,
      d = {
        duration: h,
        delay: v || 0,
        easing: c,
        done: a,
        force: !!a || !!o,
        setToFinal: !u,
        scope: e,
        during: o,
      };
    s ? t.animateFrom(r, d) : t.animateTo(r, d);
  } else (t.stopAnimation(), !s && t.attr(r), o && o(1), a && a());
}
function jt(e, t, r, n, i, a) {
  Gh("update", e, t, r, n, i, a);
}
function we(e, t, r, n, i, a) {
  Gh("enter", e, t, r, n, i, a);
}
function aa(e) {
  if (!e.__zr) return !0;
  for (var t = 0; t < e.animators.length; t++) {
    var r = e.animators[t];
    if (r.scope === "leave") return !0;
  }
  return !1;
}
function ds(e, t, r, n, i, a) {
  aa(e) || Gh("leave", e, t, r, n, i, a);
}
function Fv(e, t, r, n) {
  (e.removeTextContent(),
    e.removeTextGuideLine(),
    ds(e, { style: { opacity: 0 } }, t, r, n));
}
function oa(e, t, r) {
  function n() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup
    ? e.traverse(function (i) {
        i.isGroup || Fv(i, t, r, n);
      })
    : Fv(e, t, r, n);
}
function Hh(e) {
  Vw(e).oldStyle = e.style;
}
var wf = {},
  Ar = ["x", "y"],
  vi = ["width", "height"];
function Uw(e) {
  return pt.extend(e);
}
var Yw = bw;
function $w(e, t) {
  return Yw(e, t);
}
function Oe(e, t) {
  wf[e] = t;
}
function Xw(e) {
  if (wf.hasOwnProperty(e)) return wf[e];
}
function Vh(e, t, r, n) {
  var i = _w(e, t);
  return (
    r && (n === "center" && (r = Gm(r, i.getBoundingRect())), Hm(i, r)),
    i
  );
}
function zm(e, t, r) {
  var n = new Yr({
    style: { image: e, x: t.x, y: t.y, width: t.width, height: t.height },
    onload: function (i) {
      if (r === "center") {
        var a = { width: i.width, height: i.height };
        n.setStyle(Gm(t, a));
      }
    },
  });
  return n;
}
function Gm(e, t) {
  var r = t.width / t.height,
    n = e.height * r,
    i;
  n <= e.width ? (i = e.height) : ((n = e.width), (i = n / r));
  var a = e.x + e.width / 2,
    o = e.y + e.height / 2;
  return { x: a - n / 2, y: o - i / 2, width: n, height: i };
}
var qw = Sw;
function Hm(e, t) {
  if (e.applyTransform) {
    var r = e.getBoundingRect(),
      n = r.calculateTransform(t);
    e.applyTransform(n);
  }
}
function ba(e, t) {
  return (fm(e, e, { lineWidth: t }), e);
}
function Zw(e, t) {
  return (hm(e, e, t), e);
}
var Kw = wn;
function jw(e, t) {
  for (var r = xh([]); e && e !== t; )
    (ta(r, e.getLocalTransform(), r), (e = e.parent));
  return r;
}
function Wh(e, t, r) {
  return (
    t && !ae(t) && (t = Dh.getLocalTransform(t)),
    r && (t = ka([], t)),
    Se([], e, t)
  );
}
function Qw(e, t, r) {
  var n = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Xe((2 * t[4]) / t[0]),
    i = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Xe((2 * t[4]) / t[2]),
    a = [
      e === "left" ? -n : e === "right" ? n : 0,
      e === "top" ? -i : e === "bottom" ? i : 0,
    ];
  return (
    (a = Wh(a, t, r)),
    Xe(a[0]) > Xe(a[1])
      ? a[0] > 0
        ? "right"
        : "left"
      : a[1] > 0
        ? "bottom"
        : "top"
  );
}
function zv(e) {
  return !e.isGroup;
}
function Jw(e) {
  return e.shape != null;
}
function Vm(e, t, r) {
  if (!e || !t) return;
  function n(o) {
    var s = {};
    return (
      o.traverse(function (l) {
        zv(l) && l.anid && (s[l.anid] = l);
      }),
      s
    );
  }
  function i(o) {
    var s = { x: o.x, y: o.y, rotation: o.rotation };
    return (Jw(o) && (s.shape = at(o.shape)), s);
  }
  var a = n(e);
  t.traverse(function (o) {
    if (zv(o) && o.anid) {
      var s = a[o.anid];
      if (s) {
        var l = i(o);
        (o.attr(i(s)), jt(o, l, r, ot(o).dataIndex));
      }
    }
  });
}
function tx(e, t) {
  return q(e, function (r) {
    var n = r[0];
    ((n = ue(n, t.x)), (n = ma(n, t.x + t.width)));
    var i = r[1];
    return ((i = ue(i, t.y)), (i = ma(i, t.y + t.height)), [n, i]);
  });
}
function ex(e, t) {
  var r = ue(e.x, t.x),
    n = ma(e.x + e.width, t.x + t.width),
    i = ue(e.y, t.y),
    a = ma(e.y + e.height, t.y + t.height);
  if (n >= r && a >= i) return { x: r, y: i, width: n - r, height: a - i };
}
function Uh(e, t, r) {
  var n = B({ rectHover: !0 }, t),
    i = (n.style = { strokeNoScale: !0 });
  if (((r = r || { x: -1, y: -1, width: 2, height: 2 }), e))
    return e.indexOf("image://") === 0
      ? ((i.image = e.slice(8)), dt(i, r), new Yr(n))
      : Vh(e.replace("path://", ""), n, r, "center");
}
function rx(e, t, r, n, i) {
  for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
    var s = i[a];
    if (Wm(e, t, r, n, s[0], s[1], o[0], o[1])) return !0;
    o = s;
  }
}
function Wm(e, t, r, n, i, a, o, s) {
  var l = r - e,
    u = n - t,
    f = o - i,
    h = s - a,
    v = Xl(f, h, l, u);
  if (nx(v)) return !1;
  var c = e - i,
    d = t - a,
    p = Xl(c, d, l, u) / v;
  if (p < 0 || p > 1) return !1;
  var m = Xl(c, d, f, h) / v;
  return !(m < 0 || m > 1);
}
function Xl(e, t, r, n) {
  return e * n - r * t;
}
function nx(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function ps(e, t, r, n, i) {
  return (
    t == null ||
      (vt(t)
        ? (gt[0] = gt[1] = gt[2] = gt[3] = t)
        : ((gt[0] = t[0]), (gt[1] = t[1]), (gt[2] = t[2]), (gt[3] = t[3])),
      n &&
        ((gt[0] = ue(0, gt[0])),
        (gt[1] = ue(0, gt[1])),
        (gt[2] = ue(0, gt[2])),
        (gt[3] = ue(0, gt[3]))),
      r &&
        ((gt[0] = -gt[0]),
        (gt[1] = -gt[1]),
        (gt[2] = -gt[2]),
        (gt[3] = -gt[3])),
      Gv(e, gt, "x", "width", 3, 1, (i && i[0]) || 0),
      Gv(e, gt, "y", "height", 0, 2, (i && i[1]) || 0)),
    e
  );
}
var gt = [0, 0, 0, 0];
function Gv(e, t, r, n, i, a, o) {
  var s = t[a] + t[i],
    l = e[n];
  ((e[n] += s),
    (o = ue(0, ma(o, l))),
    e[n] < o
      ? ((e[n] = o),
        (e[r] +=
          t[i] >= 0
            ? -t[i]
            : t[a] >= 0
              ? l + t[a]
              : Xe(s) > 1e-8
                ? ((l - o) * t[i]) / s
                : 0))
      : (e[r] -= t[i]));
}
function Qs(e) {
  var t = e.itemTooltipOption,
    r = e.componentModel,
    n = e.itemName,
    i = U(t) ? { formatter: t } : t,
    a = r.mainType,
    o = r.componentIndex,
    s = { componentType: a, name: n, $vars: ["name"] };
  s[a + "Index"] = o;
  var l = e.formatterParamsExtra;
  l &&
    M(yt(l), function (f) {
      Ie(s, f) || ((s[f] = l[f]), s.$vars.push(f));
    });
  var u = ot(e.el);
  ((u.componentMainType = a),
    (u.componentIndex = o),
    (u.tooltipConfig = {
      name: n,
      option: dt({ content: n, encodeHTMLContent: !0, formatterParams: s }, i),
    }));
}
function xf(e, t) {
  var r;
  (e.isGroup && (r = t(e)), r || e.traverse(t));
}
function Js(e, t) {
  if (e)
    if (W(e)) for (var r = 0; r < e.length; r++) xf(e[r], t);
    else xf(e, t);
}
function Yh(e) {
  return (
    !e || (Xe(e[1]) < uo && Xe(e[2]) < uo) || (Xe(e[0]) < uo && Xe(e[3]) < uo)
  );
}
var uo = 1e-5;
function Sa(e, t) {
  return e ? et.copy(e, t) : t.clone();
}
function $h(e, t) {
  return t ? Ug(e || cr(), t) : void 0;
}
function Um(e) {
  return { z: e.get("z") || 0, zlevel: e.get("zlevel") || 0 };
}
function ix(e) {
  var t = -1 / 0,
    r = 1 / 0;
  xf(e, function (a) {
    (n(a), n(a.getTextContent()), n(a.getTextGuideLine()));
  });
  function n(a) {
    if (!(!a || a.isGroup)) {
      var o = a.currentStates;
      if (o.length) for (var s = 0; s < o.length; s++) i(a.states[o[s]]);
      i(a);
    }
  }
  function i(a) {
    if (a) {
      var o = a.z2;
      (o > t && (t = o), o < r && (r = o));
    }
  }
  return (r > t && (r = t = 0), { min: r, max: t });
}
function Ym(e, t, r) {
  $m(e, t, r, -1 / 0);
}
function $m(e, t, r, n) {
  if (e.ignoreModelZ) return n;
  var i = e.getTextContent(),
    a = e.getTextGuideLine(),
    o = e.isGroup;
  if (o)
    for (var s = e.childrenRef(), l = 0; l < s.length; l++)
      n = ue($m(s[l], t, r, n), n);
  else ((e.z = t), (e.zlevel = r), (n = ue(e.z2 || 0, n)));
  if ((i && ((i.z = t), (i.zlevel = r), isFinite(n) && (i.z2 = n + 2)), a)) {
    var u = e.textGuideLineConfig;
    ((a.z = t),
      (a.zlevel = r),
      isFinite(n) && (a.z2 = n + (u && u.showAbove ? 1 : -1)));
  }
  return n;
}
Oe("circle", Ks);
Oe("ellipse", Bh);
Oe("sector", $r);
Oe("ring", Nh);
Oe("polygon", Fh);
Oe("polyline", Na);
Oe("rect", Tt);
Oe("line", Gr);
Oe("bezierCurve", zh);
Oe("arc", js);
const ax = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Arc: js,
      BezierCurve: zh,
      BoundingRect: et,
      Circle: Ks,
      CompoundPath: Nw,
      Ellipse: Bh,
      Group: Et,
      Image: Yr,
      IncrementalDisplayable: Hw,
      Line: Gr,
      LinearGradient: Nm,
      OrientedBoundingRect: Fm,
      Path: pt,
      Point: J,
      Polygon: Fh,
      Polyline: Na,
      RadialGradient: Fw,
      Rect: Tt,
      Ring: Nh,
      Sector: $r,
      Text: Ht,
      WH: vi,
      XY: Ar,
      applyTransform: Wh,
      calcZ2Range: ix,
      clipPointsByRect: tx,
      clipRectByRect: ex,
      createIcon: Uh,
      ensureCopyRect: Sa,
      ensureCopyTransform: $h,
      expandOrShrinkRect: ps,
      extendPath: $w,
      extendShape: Uw,
      getShapeClass: Xw,
      getTransform: jw,
      groupTransition: Vm,
      initProps: we,
      isBoundingRectAxisAligned: Yh,
      isElementRemoved: aa,
      lineLineIntersect: Wm,
      linePolygonIntersect: rx,
      makeImage: zm,
      makePath: Vh,
      mergePath: qw,
      registerShape: Oe,
      removeElement: ds,
      removeElementWithFadeOut: oa,
      resizePath: Hm,
      retrieveZInfo: Um,
      setTooltipConfig: Qs,
      subPixelOptimize: Kw,
      subPixelOptimizeLine: ba,
      subPixelOptimizeRect: Zw,
      transformDirection: Qw,
      traverseElements: Js,
      traverseUpdateZ: Ym,
      updateProps: jt,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var tl = {};
function ox(e, t) {
  for (var r = 0; r < Te.length; r++) {
    var n = Te[r],
      i = t[n],
      a = e.ensureState(n);
    ((a.style = a.style || {}), (a.style.text = i));
  }
  var o = e.currentStates.slice();
  (e.clearStates(!0), e.setStyle({ text: t.normal }), e.useStates(o, !0));
}
function Hv(e, t, r) {
  var n = e.labelFetcher,
    i = e.labelDataIndex,
    a = e.labelDimIndex,
    o = t.normal,
    s;
  (n &&
    (s = n.getFormattedLabel(
      i,
      "normal",
      null,
      a,
      o && o.get("formatter"),
      r != null ? { interpolatedValue: r } : null,
    )),
    s == null &&
      (s = Q(e.defaultText) ? e.defaultText(i, e, r) : e.defaultText));
  for (var l = { normal: s }, u = 0; u < Te.length; u++) {
    var f = Te[u],
      h = t[f];
    l[f] = K(
      n ? n.getFormattedLabel(i, f, null, a, h && h.get("formatter")) : null,
      s,
    );
  }
  return l;
}
function Fa(e, t, r, n) {
  r = r || tl;
  for (var i = e instanceof Ht, a = !1, o = 0; o < ls.length; o++) {
    var s = t[ls[o]];
    if (s && s.getShallow("show")) {
      a = !0;
      break;
    }
  }
  var l = i ? e : e.getTextContent();
  if (a) {
    i ||
      (l || ((l = new Ht()), e.setTextContent(l)),
      e.stateProxy && (l.stateProxy = e.stateProxy));
    var u = Hv(r, t),
      f = t.normal,
      h = !!f.getShallow("show"),
      v = Hr(f, n && n.normal, r, !1, !i);
    ((v.text = u.normal), i || e.setTextConfig(Vv(f, r, !1)));
    for (var o = 0; o < Te.length; o++) {
      var c = Te[o],
        s = t[c];
      if (s) {
        var d = l.ensureState(c),
          p = !!K(s.getShallow("show"), h);
        if (
          (p !== h && (d.ignore = !p),
          (d.style = Hr(s, n && n[c], r, !0, !i)),
          (d.style.text = u[c]),
          !i)
        ) {
          var m = e.ensureState(c);
          m.textConfig = Vv(s, r, !0);
        }
      }
    }
    ((l.silent = !!f.getShallow("silent")),
      l.style.x != null && (v.x = l.style.x),
      l.style.y != null && (v.y = l.style.y),
      (l.ignore = !h),
      l.useStyle(v),
      l.dirty(),
      r.enableTextSetter &&
        (el(l).setLabelText = function (g) {
          var y = Hv(r, t, g);
          ox(l, y);
        }));
  } else l && (l.ignore = !0);
  e.dirty();
}
function za(e, t) {
  t = t || "label";
  for (var r = { normal: e.getModel(t) }, n = 0; n < Te.length; n++) {
    var i = Te[n];
    r[i] = e.getModel([i, t]);
  }
  return r;
}
function Hr(e, t, r, n, i) {
  var a = {};
  return (sx(a, e, r, n, i), t && B(a, t), a);
}
function Vv(e, t, r) {
  t = t || {};
  var n = {},
    i,
    a = e.getShallow("rotate"),
    o = K(e.getShallow("distance"), r ? null : 5),
    s = e.getShallow("offset");
  return (
    (i = e.getShallow("position") || (r ? null : "inside")),
    i === "outside" && (i = t.defaultOutsidePosition || "top"),
    i != null && (n.position = i),
    s != null && (n.offset = s),
    a != null && ((a *= Math.PI / 180), (n.rotation = a)),
    o != null && (n.distance = o),
    (n.outsideFill =
      e.get("color") === "inherit" ? t.inheritColor || null : "auto"),
    t.autoOverflowArea != null && (n.autoOverflowArea = t.autoOverflowArea),
    t.layoutRect != null && (n.layoutRect = t.layoutRect),
    n
  );
}
function sx(e, t, r, n, i) {
  r = r || tl;
  var a = t.ecModel,
    o = a && a.option.textStyle,
    s = lx(t),
    l;
  if (s) {
    l = {};
    var u = "richInheritPlainLabel",
      f = K(t.get(u), a ? a.get(u) : void 0);
    for (var h in s)
      if (s.hasOwnProperty(h)) {
        var v = t.getModel(["rich", h]);
        $v((l[h] = {}), v, o, t, f, r, n, i, !1, !0);
      }
  }
  l && (e.rich = l);
  var c = t.get("overflow");
  c && (e.overflow = c);
  var d = t.get("lineOverflow");
  d && (e.lineOverflow = d);
  var p = e,
    m = t.get("minMargin");
  if (m != null)
    ((m = vt(m) ? m / 2 : 0),
      (p.margin = [m, m, m, m]),
      (p.__marginType = oi.minMargin));
  else {
    var g = t.get("textMargin");
    g != null && ((p.margin = Sh(g)), (p.__marginType = oi.textMargin));
  }
  $v(e, t, o, null, null, r, n, i, !0, !1);
}
function lx(e) {
  for (var t; e && e !== e.ecModel; ) {
    var r = (e.option || tl).rich;
    if (r) {
      t = t || {};
      for (var n = yt(r), i = 0; i < n.length; i++) {
        var a = n[i];
        t[a] = 1;
      }
    }
    e = e.parentModel;
  }
  return t;
}
var Wv = [
    "fontStyle",
    "fontWeight",
    "fontSize",
    "fontFamily",
    "textShadowColor",
    "textShadowBlur",
    "textShadowOffsetX",
    "textShadowOffsetY",
  ],
  Uv = [
    "align",
    "lineHeight",
    "width",
    "height",
    "tag",
    "verticalAlign",
    "ellipsis",
  ],
  Yv = [
    "padding",
    "borderWidth",
    "borderRadius",
    "borderDashOffset",
    "backgroundColor",
    "borderColor",
    "shadowColor",
    "shadowBlur",
    "shadowOffsetX",
    "shadowOffsetY",
  ];
function $v(e, t, r, n, i, a, o, s, l, u) {
  r = (!o && r) || tl;
  var f = a && a.inheritColor,
    h = t.getShallow("color"),
    v = t.getShallow("textBorderColor"),
    c = K(t.getShallow("opacity"), r.opacity);
  ((h === "inherit" || h === "auto") && (f ? (h = f) : (h = null)),
    (v === "inherit" || v === "auto") && (f ? (v = f) : (v = null)),
    s || ((h = h || r.color), (v = v || r.textBorderColor)),
    h != null && (e.fill = h),
    v != null && (e.stroke = v));
  var d = K(t.getShallow("textBorderWidth"), r.textBorderWidth);
  d != null && (e.lineWidth = d);
  var p = K(t.getShallow("textBorderType"), r.textBorderType);
  p != null && (e.lineDash = p);
  var m = K(t.getShallow("textBorderDashOffset"), r.textBorderDashOffset);
  (m != null && (e.lineDashOffset = m),
    !o && c == null && !u && (c = a && a.defaultOpacity),
    c != null && (e.opacity = c),
    !o && !s && e.fill == null && a.inheritColor && (e.fill = a.inheritColor));
  for (var g = 0; g < Wv.length; g++) {
    var y = Wv[g],
      _ =
        i !== !1 && n
          ? Cn(t.getShallow(y), n.getShallow(y), r[y])
          : K(t.getShallow(y), r[y]);
    _ != null && (e[y] = _);
  }
  for (var g = 0; g < Uv.length; g++) {
    var y = Uv[g],
      _ = t.getShallow(y);
    _ != null && (e[y] = _);
  }
  if (e.verticalAlign == null) {
    var b = t.getShallow("baseline");
    b != null && (e.verticalAlign = b);
  }
  if (!l || !a.disableBox) {
    for (var g = 0; g < Yv.length; g++) {
      var y = Yv[g],
        _ = t.getShallow(y);
      _ != null && (e[y] = _);
    }
    var w = t.getShallow("borderType");
    (w != null && (e.borderDash = w),
      (e.backgroundColor === "auto" || e.backgroundColor === "inherit") &&
        f &&
        (e.backgroundColor = f),
      (e.borderColor === "auto" || e.borderColor === "inherit") &&
        f &&
        (e.borderColor = f));
  }
}
function ux(e, t) {
  var r = t && t.getModel("textStyle");
  return Ye(
    [
      e.fontStyle || (r && r.getShallow("fontStyle")) || "",
      e.fontWeight || (r && r.getShallow("fontWeight")) || "",
      (e.fontSize || (r && r.getShallow("fontSize")) || 12) + "px",
      e.fontFamily || (r && r.getShallow("fontFamily")) || "sans-serif",
    ].join(" "),
  );
}
var el = _t();
function fx(e, t, r, n) {
  if (e) {
    var i = el(e);
    ((i.prevValue = i.value), (i.value = r));
    var a = t.normal;
    ((i.valueAnimation = a.get("valueAnimation")),
      i.valueAnimation &&
        ((i.precision = a.get("precision")),
        (i.defaultInterpolatedText = n),
        (i.statesModels = t)));
  }
}
var oi = { minMargin: 1, textMargin: 2 },
  hx = ["textStyle", "color"],
  ql = [
    "fontStyle",
    "fontWeight",
    "fontSize",
    "fontFamily",
    "padding",
    "lineHeight",
    "rich",
    "width",
    "height",
    "overflow",
  ],
  Zl = new Ht(),
  cx = (function () {
    function e() {}
    return (
      (e.prototype.getTextColor = function (t) {
        var r = this.ecModel;
        return this.getShallow("color") || (!t && r ? r.get(hx) : null);
      }),
      (e.prototype.getFont = function () {
        return ux(
          {
            fontStyle: this.getShallow("fontStyle"),
            fontWeight: this.getShallow("fontWeight"),
            fontSize: this.getShallow("fontSize"),
            fontFamily: this.getShallow("fontFamily"),
          },
          this.ecModel,
        );
      }),
      (e.prototype.getTextRect = function (t) {
        for (
          var r = {
              text: t,
              verticalAlign:
                this.getShallow("verticalAlign") || this.getShallow("baseline"),
            },
            n = 0;
          n < ql.length;
          n++
        )
          r[ql[n]] = this.getShallow(ql[n]);
        return (Zl.useStyle(r), Zl.update(), Zl.getBoundingRect());
      }),
      e
    );
  })(),
  Xm = [
    ["lineWidth", "width"],
    ["stroke", "color"],
    ["opacity"],
    ["shadowBlur"],
    ["shadowOffsetX"],
    ["shadowOffsetY"],
    ["shadowColor"],
    ["lineDash", "type"],
    ["lineDashOffset", "dashOffset"],
    ["lineCap", "cap"],
    ["lineJoin", "join"],
    ["miterLimit"],
  ],
  vx = pa(Xm),
  dx = (function () {
    function e() {}
    return (
      (e.prototype.getLineStyle = function (t) {
        return vx(this, t);
      }),
      e
    );
  })(),
  qm = [
    ["fill", "color"],
    ["stroke", "borderColor"],
    ["lineWidth", "borderWidth"],
    ["opacity"],
    ["shadowBlur"],
    ["shadowOffsetX"],
    ["shadowOffsetY"],
    ["shadowColor"],
    ["lineDash", "borderType"],
    ["lineDashOffset", "borderDashOffset"],
    ["lineCap", "borderCap"],
    ["lineJoin", "borderJoin"],
    ["miterLimit", "borderMiterLimit"],
  ],
  px = pa(qm),
  gx = (function () {
    function e() {}
    return (
      (e.prototype.getItemStyle = function (t, r) {
        return px(this, t, r);
      }),
      e
    );
  })(),
  bt = (function () {
    function e(t, r, n) {
      ((this.parentModel = r), (this.ecModel = n), (this.option = t));
    }
    return (
      (e.prototype.init = function (t, r, n) {}),
      (e.prototype.mergeOption = function (t, r) {
        ut(this.option, t, !0);
      }),
      (e.prototype.get = function (t, r) {
        return t == null
          ? this.option
          : this._doGet(this.parsePath(t), !r && this.parentModel);
      }),
      (e.prototype.getShallow = function (t, r) {
        var n = this.option,
          i = n == null ? n : n[t];
        if (i == null && !r) {
          var a = this.parentModel;
          a && (i = a.getShallow(t));
        }
        return i;
      }),
      (e.prototype.getModel = function (t, r) {
        var n = t != null,
          i = n ? this.parsePath(t) : null,
          a = n ? this._doGet(i) : this.option;
        return (
          (r =
            r ||
            (this.parentModel &&
              this.parentModel.getModel(this.resolveParentPath(i)))),
          new e(a, r, this.ecModel)
        );
      }),
      (e.prototype.isEmpty = function () {
        return this.option == null;
      }),
      (e.prototype.restoreData = function () {}),
      (e.prototype.clone = function () {
        var t = this.constructor;
        return new t(at(this.option));
      }),
      (e.prototype.parsePath = function (t) {
        return typeof t == "string" ? t.split(".") : t;
      }),
      (e.prototype.resolveParentPath = function (t) {
        return t;
      }),
      (e.prototype.isAnimationEnabled = function () {
        if (!tt.node && this.option) {
          if (this.option.animation != null) return !!this.option.animation;
          if (this.parentModel) return this.parentModel.isAnimationEnabled();
        }
      }),
      (e.prototype._doGet = function (t, r) {
        var n = this.option;
        if (!t) return n;
        for (
          var i = 0;
          i < t.length &&
          !(
            t[i] &&
            ((n = n && typeof n == "object" ? n[t[i]] : null), n == null)
          );
          i++
        );
        return (
          n == null &&
            r &&
            (n = r._doGet(this.resolveParentPath(t), r.parentModel)),
          n
        );
      }),
      e
    );
  })();
wh(bt);
Y1(bt);
tr(bt, dx);
tr(bt, gx);
tr(bt, K1);
tr(bt, cx);
function Ai(e) {
  return e == null ? 0 : e.length || 1;
}
function Xv(e) {
  return e;
}
var mx = (function () {
    function e(t, r, n, i, a, o) {
      ((this._old = t),
        (this._new = r),
        (this._oldKeyGetter = n || Xv),
        (this._newKeyGetter = i || Xv),
        (this.context = a),
        (this._diffModeMultiple = o === "multiple"));
    }
    return (
      (e.prototype.add = function (t) {
        return ((this._add = t), this);
      }),
      (e.prototype.update = function (t) {
        return ((this._update = t), this);
      }),
      (e.prototype.updateManyToOne = function (t) {
        return ((this._updateManyToOne = t), this);
      }),
      (e.prototype.updateOneToMany = function (t) {
        return ((this._updateOneToMany = t), this);
      }),
      (e.prototype.updateManyToMany = function (t) {
        return ((this._updateManyToMany = t), this);
      }),
      (e.prototype.remove = function (t) {
        return ((this._remove = t), this);
      }),
      (e.prototype.execute = function () {
        this[
          this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"
        ]();
      }),
      (e.prototype._executeOneToOne = function () {
        var t = this._old,
          r = this._new,
          n = {},
          i = new Array(t.length),
          a = new Array(r.length);
        (this._initIndexMap(t, null, i, "_oldKeyGetter"),
          this._initIndexMap(r, n, a, "_newKeyGetter"));
        for (var o = 0; o < t.length; o++) {
          var s = i[o],
            l = n[s],
            u = Ai(l);
          if (u > 1) {
            var f = l.shift();
            (l.length === 1 && (n[s] = l[0]),
              this._update && this._update(f, o));
          } else
            u === 1
              ? ((n[s] = null), this._update && this._update(l, o))
              : this._remove && this._remove(o);
        }
        this._performRestAdd(a, n);
      }),
      (e.prototype._executeMultiple = function () {
        var t = this._old,
          r = this._new,
          n = {},
          i = {},
          a = [],
          o = [];
        (this._initIndexMap(t, n, a, "_oldKeyGetter"),
          this._initIndexMap(r, i, o, "_newKeyGetter"));
        for (var s = 0; s < a.length; s++) {
          var l = a[s],
            u = n[l],
            f = i[l],
            h = Ai(u),
            v = Ai(f);
          if (h > 1 && v === 1)
            (this._updateManyToOne && this._updateManyToOne(f, u),
              (i[l] = null));
          else if (h === 1 && v > 1)
            (this._updateOneToMany && this._updateOneToMany(f, u),
              (i[l] = null));
          else if (h === 1 && v === 1)
            (this._update && this._update(f, u), (i[l] = null));
          else if (h > 1 && v > 1)
            (this._updateManyToMany && this._updateManyToMany(f, u),
              (i[l] = null));
          else if (h > 1)
            for (var c = 0; c < h; c++) this._remove && this._remove(u[c]);
          else this._remove && this._remove(u);
        }
        this._performRestAdd(o, i);
      }),
      (e.prototype._performRestAdd = function (t, r) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n],
            a = r[i],
            o = Ai(a);
          if (o > 1) for (var s = 0; s < o; s++) this._add && this._add(a[s]);
          else o === 1 && this._add && this._add(a);
          r[i] = null;
        }
      }),
      (e.prototype._initIndexMap = function (t, r, n, i) {
        for (var a = this._diffModeMultiple, o = 0; o < t.length; o++) {
          var s = "_ec_" + this[i](t[o], o);
          if ((a || (n[o] = s), !!r)) {
            var l = r[s],
              u = Ai(l);
            u === 0
              ? ((r[s] = o), a && n.push(s))
              : u === 1
                ? (r[s] = [l, o])
                : l.push(o);
          }
        }
      }),
      e
    );
  })(),
  Zm = rt([
    "tooltip",
    "label",
    "itemName",
    "itemId",
    "itemGroupId",
    "itemChildGroupId",
    "seriesName",
  ]),
  fe = "original",
  $t = "arrayRows",
  Ce = "objectRows",
  Be = "keyedColumns",
  Or = "typedArray",
  Km = "unknown",
  Qe = "column",
  On = "row",
  Nt = { Must: 1, Might: 2, Not: 3 },
  jm = _t();
function yx(e) {
  jm(e).datasetMap = rt();
}
function _x(e, t, r) {
  var n = {},
    i = Xh(t);
  if (!i || !e) return n;
  var a = [],
    o = [],
    s = t.ecModel,
    l = jm(s).datasetMap,
    u = i.uid + "_" + r.seriesLayoutBy,
    f,
    h;
  ((e = e.slice()),
    M(e, function (p, m) {
      var g = X(p) ? p : (e[m] = { name: p });
      (g.type === "ordinal" && f == null && ((f = m), (h = d(g))),
        (n[g.name] = []));
    }));
  var v = l.get(u) || l.set(u, { categoryWayDim: h, valueWayDim: 0 });
  M(e, function (p, m) {
    var g = p.name,
      y = d(p);
    if (f == null) {
      var _ = v.valueWayDim;
      (c(n[g], _, y), c(o, _, y), (v.valueWayDim += y));
    } else if (f === m) (c(n[g], 0, y), c(a, 0, y));
    else {
      var _ = v.categoryWayDim;
      (c(n[g], _, y), c(o, _, y), (v.categoryWayDim += y));
    }
  });
  function c(p, m, g) {
    for (var y = 0; y < g; y++) p.push(m + y);
  }
  function d(p) {
    var m = p.dimsDef;
    return m ? m.length : 1;
  }
  return (a.length && (n.itemName = a), o.length && (n.seriesName = o), n);
}
function bx(e, t, r) {
  var n = {},
    i = Xh(e);
  if (!i) return n;
  var a = t.sourceFormat,
    o = t.dimensionsDefine,
    s;
  (a === Ce || a === Be) &&
    M(o, function (f, h) {
      (X(f) ? f.name : f) === "name" && (s = h);
    });
  var l = (function () {
    for (var f = {}, h = {}, v = [], c = 0, d = Math.min(5, r); c < d; c++) {
      var p = Jm(t.data, a, t.seriesLayoutBy, o, t.startIndex, c);
      v.push(p);
      var m = p === Nt.Not;
      if (
        (m && f.v == null && c !== s && (f.v = c),
        (f.n == null || f.n === f.v || (!m && v[f.n] === Nt.Not)) && (f.n = c),
        g(f) && v[f.n] !== Nt.Not)
      )
        return f;
      m ||
        (p === Nt.Might && h.v == null && c !== s && (h.v = c),
        (h.n == null || h.n === h.v) && (h.n = c));
    }
    function g(y) {
      return y.v != null && y.n != null;
    }
    return g(f) ? f : g(h) ? h : null;
  })();
  if (l) {
    n.value = [l.v];
    var u = s ?? l.n;
    ((n.itemName = [u]), (n.seriesName = [u]));
  }
  return n;
}
function Xh(e) {
  var t = e.get("data", !0);
  if (!t)
    return Ba(
      e.ecModel,
      "dataset",
      { index: e.get("datasetIndex", !0), id: e.get("datasetId", !0) },
      _e,
    ).models[0];
}
function Sx(e) {
  return !e.get("transform", !0) && !e.get("fromTransformResult", !0)
    ? []
    : Ba(
        e.ecModel,
        "dataset",
        {
          index: e.get("fromDatasetIndex", !0),
          id: e.get("fromDatasetId", !0),
        },
        _e,
      ).models;
}
function Qm(e, t) {
  return Jm(
    e.data,
    e.sourceFormat,
    e.seriesLayoutBy,
    e.dimensionsDefine,
    e.startIndex,
    t,
  );
}
function Jm(e, t, r, n, i, a) {
  var o,
    s = 5;
  if (oe(e)) return Nt.Not;
  var l, u;
  if (n) {
    var f = n[a];
    X(f) ? ((l = f.name), (u = f.type)) : U(f) && (l = f);
  }
  if (u != null) return u === "ordinal" ? Nt.Must : Nt.Not;
  if (t === $t) {
    var h = e;
    if (r === On) {
      for (var v = h[a], c = 0; c < (v || []).length && c < s; c++)
        if ((o = b(v[i + c])) != null) return o;
    } else
      for (var c = 0; c < h.length && c < s; c++) {
        var d = h[i + c];
        if (d && (o = b(d[a])) != null) return o;
      }
  } else if (t === Ce) {
    var p = e;
    if (!l) return Nt.Not;
    for (var c = 0; c < p.length && c < s; c++) {
      var m = p[c];
      if (m && (o = b(m[l])) != null) return o;
    }
  } else if (t === Be) {
    var g = e;
    if (!l) return Nt.Not;
    var v = g[l];
    if (!v || oe(v)) return Nt.Not;
    for (var c = 0; c < v.length && c < s; c++)
      if ((o = b(v[c])) != null) return o;
  } else if (t === fe)
    for (var y = e, c = 0; c < y.length && c < s; c++) {
      var m = y[c],
        _ = Oa(m);
      if (!W(_)) return Nt.Not;
      if ((o = b(_[a])) != null) return o;
    }
  function b(w) {
    var S = U(w);
    if (w != null && Number.isFinite(Number(w)) && w !== "")
      return S ? Nt.Might : Nt.Not;
    if (S && w !== "-") return Nt.Must;
  }
  return Nt.Not;
}
var rl = (function () {
  function e(t) {
    ((this.data = t.data || (t.sourceFormat === Be ? {} : [])),
      (this.sourceFormat = t.sourceFormat || Km),
      (this.seriesLayoutBy = t.seriesLayoutBy || Qe),
      (this.startIndex = t.startIndex || 0),
      (this.dimensionsDetectedCount = t.dimensionsDetectedCount),
      (this.metaRawOption = t.metaRawOption));
    var r = (this.dimensionsDefine = t.dimensionsDefine);
    if (r)
      for (var n = 0; n < r.length; n++) {
        var i = r[n];
        i.type == null && Qm(this, n) === Nt.Must && (i.type = "ordinal");
      }
  }
  return e;
})();
function qh(e) {
  return e instanceof rl;
}
function Tf(e, t, r) {
  r = r || ey(e);
  var n = t.seriesLayoutBy,
    i = Tx(e, r, n, t.sourceHeader, t.dimensions),
    a = new rl({
      data: e,
      sourceFormat: r,
      seriesLayoutBy: n,
      dimensionsDefine: i.dimensionsDefine,
      startIndex: i.startIndex,
      dimensionsDetectedCount: i.dimensionsDetectedCount,
      metaRawOption: at(t),
    });
  return a;
}
function ty(e) {
  return new rl({ data: e, sourceFormat: oe(e) ? Or : fe });
}
function xx(e) {
  return new rl({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: at(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount,
  });
}
function ey(e) {
  var t = Km;
  if (oe(e)) t = Or;
  else if (W(e)) {
    e.length === 0 && (t = $t);
    for (var r = 0, n = e.length; r < n; r++) {
      var i = e[r];
      if (i != null) {
        if (W(i) || oe(i)) {
          t = $t;
          break;
        } else if (X(i)) {
          t = Ce;
          break;
        }
      }
    }
  } else if (X(e)) {
    for (var a in e)
      if (Ie(e, a) && ae(e[a])) {
        t = Be;
        break;
      }
  }
  return t;
}
function Tx(e, t, r, n, i) {
  var a, o;
  if (!e)
    return {
      dimensionsDefine: qv(i),
      startIndex: o,
      dimensionsDetectedCount: a,
    };
  if (t === $t) {
    var s = e;
    (n === "auto" || n == null
      ? Zv(
          function (u) {
            u != null && u !== "-" && (U(u) ? o == null && (o = 1) : (o = 0));
          },
          r,
          s,
          10,
        )
      : (o = vt(n) ? n : n ? 1 : 0),
      !i &&
        o === 1 &&
        ((i = []),
        Zv(
          function (u, f) {
            i[f] = u != null ? u + "" : "";
          },
          r,
          s,
          1 / 0,
        )),
      (a = i ? i.length : r === On ? s.length : s[0] ? s[0].length : null));
  } else if (t === Ce) i || (i = Cx(e));
  else if (t === Be)
    i ||
      ((i = []),
      M(e, function (u, f) {
        i.push(f);
      }));
  else if (t === fe) {
    var l = Oa(e[0]);
    a = (W(l) && l.length) || 1;
  }
  return { startIndex: o, dimensionsDefine: qv(i), dimensionsDetectedCount: a };
}
function Cx(e) {
  for (var t = 0, r; t < e.length && !(r = e[t++]); );
  if (r) return yt(r);
}
function qv(e) {
  if (e) {
    var t = rt();
    return q(e, function (r, n) {
      r = X(r) ? r : { name: r };
      var i = { name: r.name, displayName: r.displayName, type: r.type };
      if (i.name == null) return i;
      ((i.name += ""), i.displayName == null && (i.displayName = i.name));
      var a = t.get(i.name);
      return (a ? (i.name += "-" + a.count++) : t.set(i.name, { count: 1 }), i);
    });
  }
}
function Zv(e, t, r, n) {
  if (t === On)
    for (var i = 0; i < r.length && i < n; i++) e(r[i] ? r[i][0] : null, i);
  else for (var a = r[0] || [], i = 0; i < a.length && i < n; i++) e(a[i], i);
}
function ry(e) {
  var t = e.sourceFormat;
  return t === Ce || t === Be;
}
var vn,
  dn,
  pn,
  gn,
  Kv,
  jv,
  ny = (function () {
    function e(t, r) {
      var n = qh(t) ? t : ty(t);
      this._source = n;
      var i = (this._data = n.data),
        a = n.sourceFormat;
      (n.seriesLayoutBy,
        a === Or && ((this._offset = 0), (this._dimSize = r), (this._data = i)),
        jv(this, i, n));
    }
    return (
      (e.prototype.getSource = function () {
        return this._source;
      }),
      (e.prototype.count = function () {
        return 0;
      }),
      (e.prototype.getItem = function (t, r) {}),
      (e.prototype.appendData = function (t) {}),
      (e.prototype.clean = function () {}),
      (e.protoInitialize = (function () {
        var t = e.prototype;
        ((t.pure = !1), (t.persistent = !0));
      })()),
      (e.internalField = (function () {
        var t;
        jv = function (o, s, l) {
          var u = l.sourceFormat,
            f = l.seriesLayoutBy,
            h = l.startIndex,
            v = l.dimensionsDefine,
            c = Kv[Zh(u, f)];
          if ((B(o, c), u === Or))
            ((o.getItem = r), (o.count = i), (o.fillStorage = n));
          else {
            var d = iy(u, f);
            o.getItem = ct(d, null, s, h, v);
            var p = ay(u, f);
            o.count = ct(p, null, s, h, v);
          }
        };
        var r = function (o, s) {
            ((o = o - this._offset), (s = s || []));
            for (
              var l = this._data, u = this._dimSize, f = u * o, h = 0;
              h < u;
              h++
            )
              s[h] = l[f + h];
            return s;
          },
          n = function (o, s, l, u) {
            for (var f = this._data, h = this._dimSize, v = 0; v < h; v++) {
              for (
                var c = u[v],
                  d = c[0] == null ? 1 / 0 : c[0],
                  p = c[1] == null ? -1 / 0 : c[1],
                  m = s - o,
                  g = l[v],
                  y = 0;
                y < m;
                y++
              ) {
                var _ = f[y * h + v];
                ((g[o + y] = _), _ < d && (d = _), _ > p && (p = _));
              }
              ((c[0] = d), (c[1] = p));
            }
          },
          i = function () {
            return this._data ? this._data.length / this._dimSize : 0;
          };
        Kv =
          ((t = {}),
          (t[$t + "_" + Qe] = { pure: !0, appendData: a }),
          (t[$t + "_" + On] = {
            pure: !0,
            appendData: function () {
              throw new Error(
                'Do not support appendData when set seriesLayoutBy: "row".',
              );
            },
          }),
          (t[Ce] = { pure: !0, appendData: a }),
          (t[Be] = {
            pure: !0,
            appendData: function (o) {
              var s = this._data;
              M(o, function (l, u) {
                for (
                  var f = s[u] || (s[u] = []), h = 0;
                  h < (l || []).length;
                  h++
                )
                  f.push(l[h]);
              });
            },
          }),
          (t[fe] = { appendData: a }),
          (t[Or] = {
            persistent: !1,
            pure: !0,
            appendData: function (o) {
              this._data = o;
            },
            clean: function () {
              ((this._offset += this.count()), (this._data = null));
            },
          }),
          t);
        function a(o) {
          for (var s = 0; s < o.length; s++) this._data.push(o[s]);
        }
      })()),
      e
    );
  })(),
  fo = function (e) {
    W(e) || mm("series.data or dataset.source must be an array.");
  };
((vn = {}),
  (vn[$t + "_" + Qe] = fo),
  (vn[$t + "_" + On] = fo),
  (vn[Ce] = fo),
  (vn[Be] = function (e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r].name;
      n == null && mm("dimension name must not be null/undefined.");
    }
  }),
  (vn[fe] = fo));
var Qv = function (e, t, r, n) {
    return e[n];
  },
  Dx =
    ((dn = {}),
    (dn[$t + "_" + Qe] = function (e, t, r, n) {
      return e[n + t];
    }),
    (dn[$t + "_" + On] = function (e, t, r, n, i) {
      n += t;
      for (var a = i || [], o = e, s = 0; s < o.length; s++) {
        var l = o[s];
        a[s] = l ? l[n] : null;
      }
      return a;
    }),
    (dn[Ce] = Qv),
    (dn[Be] = function (e, t, r, n, i) {
      for (var a = i || [], o = 0; o < r.length; o++) {
        var s = r[o].name,
          l = s != null ? e[s] : null;
        a[o] = l ? l[n] : null;
      }
      return a;
    }),
    (dn[fe] = Qv),
    dn);
function iy(e, t) {
  var r = Dx[Zh(e, t)];
  return r;
}
var Jv = function (e, t, r) {
    return e.length;
  },
  Mx =
    ((pn = {}),
    (pn[$t + "_" + Qe] = function (e, t, r) {
      return Math.max(0, e.length - t);
    }),
    (pn[$t + "_" + On] = function (e, t, r) {
      var n = e[0];
      return n ? Math.max(0, n.length - t) : 0;
    }),
    (pn[Ce] = Jv),
    (pn[Be] = function (e, t, r) {
      var n = r[0].name,
        i = n != null ? e[n] : null;
      return i ? i.length : 0;
    }),
    (pn[fe] = Jv),
    pn);
function ay(e, t) {
  var r = Mx[Zh(e, t)];
  return r;
}
var Kl = function (e, t, r) {
    return e[t];
  },
  Ax =
    ((gn = {}),
    (gn[$t] = Kl),
    (gn[Ce] = function (e, t, r) {
      return e[r];
    }),
    (gn[Be] = Kl),
    (gn[fe] = function (e, t, r) {
      var n = Oa(e);
      return n instanceof Array ? n[t] : n;
    }),
    (gn[Or] = Kl),
    gn);
function oy(e) {
  var t = Ax[e];
  return t;
}
function Zh(e, t) {
  return e === $t ? e + "_" + t : e;
}
function di(e, t, r) {
  if (e) {
    var n = e.getRawDataItem(t);
    if (n != null) {
      var i = e.getStore(),
        a = i.getSource().sourceFormat;
      if (r != null) {
        var o = e.getDimensionIndex(r),
          s = i.getDimensionProperty(o);
        return oy(a)(n, o, s);
      } else {
        var l = n;
        return (a === fe && (l = Oa(n)), l);
      }
    }
  }
}
var Lx = (function () {
  function e(t, r) {
    ((this._encode = t), (this._schema = r));
  }
  return (
    (e.prototype.get = function () {
      return {
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode,
      };
    }),
    (e.prototype._getFullDimensionNames = function () {
      return (
        this._cachedDimNames ||
          (this._cachedDimNames = this._schema
            ? this._schema.makeOutputDimensionNames()
            : []),
        this._cachedDimNames
      );
    }),
    e
  );
})();
function Ix(e, t) {
  var r = {},
    n = (r.encode = {}),
    i = rt(),
    a = [],
    o = [],
    s = {};
  M(e.dimensions, function (v) {
    var c = e.getDimensionInfo(v),
      d = c.coordDim;
    if (d) {
      var p = c.coordDimIndex;
      ((jl(n, d)[p] = v),
        c.isExtraCoord ||
          (i.set(d, 1),
          kx(c.type) && (a[0] = v),
          (jl(s, d)[p] = e.getDimensionIndex(c.name))),
        c.defaultTooltip && o.push(v));
    }
    Zm.each(function (m, g) {
      var y = jl(n, g),
        _ = c.otherDims[g];
      _ != null && _ !== !1 && (y[_] = c.name);
    });
  });
  var l = [],
    u = {};
  (i.each(function (v, c) {
    var d = n[c];
    ((u[c] = d[0]), (l = l.concat(d)));
  }),
    (r.dataDimsOnCoord = l),
    (r.dataDimIndicesOnCoord = q(l, function (v) {
      return e.getDimensionInfo(v).storeDimIndex;
    })),
    (r.encodeFirstDimNotExtra = u));
  var f = n.label;
  f && f.length && (a = f.slice());
  var h = n.tooltip;
  return (
    h && h.length ? (o = h.slice()) : o.length || (o = a.slice()),
    (n.defaultedLabel = a),
    (n.defaultedTooltip = o),
    (r.userOutput = new Lx(s, t)),
    r
  );
}
function jl(e, t) {
  return (e.hasOwnProperty(t) || (e[t] = []), e[t]);
}
function Px(e) {
  return e === "category" ? "ordinal" : e === "time" ? "time" : "float";
}
function kx(e) {
  return !(e === "ordinal" || e === "time");
}
var Ho = (function () {
  function e(t) {
    ((this.otherDims = {}), t != null && B(this, t));
  }
  return e;
})();
function Vo(e, t) {
  var r = t && t.type;
  return r === "ordinal"
    ? e
    : (r === "time" && !vt(e) && e != null && e !== "-" && (e = +Si(e)),
      e == null || e === "" ? NaN : Number(e));
}
rt({
  number: function (e) {
    return parseFloat(e);
  },
  time: function (e) {
    return +Si(e);
  },
  trim: function (e) {
    return U(e) ? Ye(e) : e;
  },
});
var Rx = (function () {
    function e(t, r) {
      var n = t === "desc";
      ((this._resultLT = n ? 1 : -1),
        r == null && (r = n ? "min" : "max"),
        (this._incomparable = r === "min" ? -1 / 0 : 1 / 0));
    }
    return (
      (e.prototype.evaluate = function (t, r) {
        var n = vt(t) ? t : ss(t),
          i = vt(r) ? r : ss(r),
          a = isNaN(n),
          o = isNaN(i);
        if (
          (a && (n = this._incomparable), o && (i = this._incomparable), a && o)
        ) {
          var s = U(t),
            l = U(r);
          (s && (n = l ? t : 0), l && (i = s ? r : 0));
        }
        return n < i ? this._resultLT : n > i ? -this._resultLT : 0;
      }),
      e
    );
  })(),
  nl = "undefined",
  Ex = typeof Uint32Array === nl ? Array : Uint32Array,
  Ox = typeof Uint16Array === nl ? Array : Uint16Array,
  sy = typeof Int32Array === nl ? Array : Int32Array,
  td = typeof Float64Array === nl ? Array : Float64Array,
  ly = { float: td, int: sy, ordinal: Array, number: Array, time: td },
  Ql;
function Yn(e) {
  return e > 65535 ? Ex : Ox;
}
function $n() {
  return [1 / 0, -1 / 0];
}
function Bx(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function ed(e, t, r, n, i) {
  var a = ly[r || "float"];
  if (i) {
    var o = e[t],
      s = o && o.length;
    if (s !== n) {
      for (var l = new a(n), u = 0; u < s; u++) l[u] = o[u];
      e[t] = l;
    }
  } else e[t] = new a(n);
}
var Cf = (function () {
    function e() {
      ((this._chunks = []),
        (this._rawExtent = []),
        (this._extent = []),
        (this._count = 0),
        (this._rawCount = 0),
        (this._calcDimNameToIdx = rt()));
    }
    return (
      (e.prototype.initData = function (t, r, n) {
        ((this._provider = t),
          (this._chunks = []),
          (this._indices = null),
          (this.getRawIndex = this._getRawIdxIdentity));
        var i = t.getSource(),
          a = (this.defaultDimValueGetter = Ql[i.sourceFormat]);
        ((this._dimValueGetter = n || a),
          (this._rawExtent = []),
          ry(i),
          (this._dimensions = q(r, function (o) {
            return { type: o.type, property: o.property };
          })),
          this._initDataFromProvider(0, t.count()));
      }),
      (e.prototype.getProvider = function () {
        return this._provider;
      }),
      (e.prototype.getSource = function () {
        return this._provider.getSource();
      }),
      (e.prototype.ensureCalculationDimension = function (t, r) {
        var n = this._calcDimNameToIdx,
          i = this._dimensions,
          a = n.get(t);
        if (a != null) {
          if (i[a].type === r) return a;
        } else a = i.length;
        return (
          (i[a] = { type: r }),
          n.set(t, a),
          (this._chunks[a] = new ly[r || "float"](this._rawCount)),
          (this._rawExtent[a] = $n()),
          a
        );
      }),
      (e.prototype.collectOrdinalMeta = function (t, r) {
        var n = this._chunks[t],
          i = this._dimensions[t],
          a = this._rawExtent,
          o = i.ordinalOffset || 0,
          s = n.length;
        o === 0 && (a[t] = $n());
        for (var l = a[t], u = o; u < s; u++) {
          var f = (n[u] = r.parseAndCollect(n[u]));
          isNaN(f) || ((l[0] = Math.min(f, l[0])), (l[1] = Math.max(f, l[1])));
        }
        ((i.ordinalMeta = r), (i.ordinalOffset = s), (i.type = "ordinal"));
      }),
      (e.prototype.getOrdinalMeta = function (t) {
        var r = this._dimensions[t],
          n = r.ordinalMeta;
        return n;
      }),
      (e.prototype.getDimensionProperty = function (t) {
        var r = this._dimensions[t];
        return r && r.property;
      }),
      (e.prototype.appendData = function (t) {
        var r = this._provider,
          n = this.count();
        r.appendData(t);
        var i = r.count();
        return (
          r.persistent || (i += n),
          n < i && this._initDataFromProvider(n, i, !0),
          [n, i]
        );
      }),
      (e.prototype.appendValues = function (t, r) {
        for (
          var n = this._chunks,
            i = this._dimensions,
            a = i.length,
            o = this._rawExtent,
            s = this.count(),
            l = s + Math.max(t.length, r || 0),
            u = 0;
          u < a;
          u++
        ) {
          var f = i[u];
          ed(n, u, f.type, l, !0);
        }
        for (var h = [], v = s; v < l; v++)
          for (var c = v - s, d = 0; d < a; d++) {
            var f = i[d],
              p = Ql.arrayRows.call(this, t[c] || h, f.property, c, d);
            n[d][v] = p;
            var m = o[d];
            (p < m[0] && (m[0] = p), p > m[1] && (m[1] = p));
          }
        return ((this._rawCount = this._count = l), { start: s, end: l });
      }),
      (e.prototype._initDataFromProvider = function (t, r, n) {
        for (
          var i = this._provider,
            a = this._chunks,
            o = this._dimensions,
            s = o.length,
            l = this._rawExtent,
            u = q(o, function (y) {
              return y.property;
            }),
            f = 0;
          f < s;
          f++
        ) {
          var h = o[f];
          (l[f] || (l[f] = $n()), ed(a, f, h.type, r, n));
        }
        if (i.fillStorage) i.fillStorage(t, r, a, l);
        else
          for (var v = [], c = t; c < r; c++) {
            v = i.getItem(c, v);
            for (var d = 0; d < s; d++) {
              var p = a[d],
                m = this._dimValueGetter(v, u[d], c, d);
              p[c] = m;
              var g = l[d];
              (m < g[0] && (g[0] = m), m > g[1] && (g[1] = m));
            }
          }
        (!i.persistent && i.clean && i.clean(),
          (this._rawCount = this._count = r),
          (this._extent = []));
      }),
      (e.prototype.count = function () {
        return this._count;
      }),
      (e.prototype.get = function (t, r) {
        if (!(r >= 0 && r < this._count)) return NaN;
        var n = this._chunks[t];
        return n ? n[this.getRawIndex(r)] : NaN;
      }),
      (e.prototype.getValues = function (t, r) {
        var n = [],
          i = [];
        if (r == null) {
          ((r = t), (t = []));
          for (var a = 0; a < this._dimensions.length; a++) i.push(a);
        } else i = t;
        for (var a = 0, o = i.length; a < o; a++) n.push(this.get(i[a], r));
        return n;
      }),
      (e.prototype.getByRawIndex = function (t, r) {
        if (!(r >= 0 && r < this._rawCount)) return NaN;
        var n = this._chunks[t];
        return n ? n[r] : NaN;
      }),
      (e.prototype.getSum = function (t) {
        var r = this._chunks[t],
          n = 0;
        if (r)
          for (var i = 0, a = this.count(); i < a; i++) {
            var o = this.get(t, i);
            isNaN(o) || (n += o);
          }
        return n;
      }),
      (e.prototype.getMedian = function (t) {
        var r = [];
        this.each([t], function (a) {
          isNaN(a) || r.push(a);
        });
        var n = r.sort(function (a, o) {
            return a - o;
          }),
          i = this.count();
        return i === 0
          ? 0
          : i % 2 === 1
            ? n[(i - 1) / 2]
            : (n[i / 2] + n[i / 2 - 1]) / 2;
      }),
      (e.prototype.indexOfRawIndex = function (t) {
        if (t >= this._rawCount || t < 0) return -1;
        if (!this._indices) return t;
        var r = this._indices,
          n = r[t];
        if (n != null && n < this._count && n === t) return t;
        for (var i = 0, a = this._count - 1; i <= a; ) {
          var o = ((i + a) / 2) | 0;
          if (r[o] < t) i = o + 1;
          else if (r[o] > t) a = o - 1;
          else return o;
        }
        return -1;
      }),
      (e.prototype.getIndices = function () {
        var t,
          r = this._indices;
        if (r) {
          var n = r.constructor,
            i = this._count;
          if (n === Array) {
            t = new n(i);
            for (var a = 0; a < i; a++) t[a] = r[a];
          } else t = new n(r.buffer, 0, i);
        } else {
          var n = Yn(this._rawCount);
          t = new n(this.count());
          for (var a = 0; a < t.length; a++) t[a] = a;
        }
        return t;
      }),
      (e.prototype.filter = function (t, r) {
        if (!this._count) return this;
        for (
          var n = this.clone(),
            i = n.count(),
            a = Yn(n._rawCount),
            o = new a(i),
            s = [],
            l = t.length,
            u = 0,
            f = t[0],
            h = n._chunks,
            v = 0;
          v < i;
          v++
        ) {
          var c = void 0,
            d = n.getRawIndex(v);
          if (l === 0) c = r(v);
          else if (l === 1) {
            var p = h[f][d];
            c = r(p, v);
          } else {
            for (var m = 0; m < l; m++) s[m] = h[t[m]][d];
            ((s[m] = v), (c = r.apply(null, s)));
          }
          c && (o[u++] = d);
        }
        return (
          u < i && (n._indices = o),
          (n._count = u),
          (n._extent = []),
          n._updateGetRawIdx(),
          n
        );
      }),
      (e.prototype.selectRange = function (t) {
        var r = this.clone(),
          n = r._count;
        if (!n) return this;
        var i = yt(t),
          a = i.length;
        if (!a) return this;
        var o = r.count(),
          s = Yn(r._rawCount),
          l = new s(o),
          u = 0,
          f = i[0],
          h = t[f][0],
          v = t[f][1],
          c = r._chunks,
          d = !1;
        if (!r._indices) {
          var p = 0;
          if (a === 1) {
            for (var m = c[i[0]], g = 0; g < n; g++) {
              var y = m[g];
              (((y >= h && y <= v) || isNaN(y)) && (l[u++] = p), p++);
            }
            d = !0;
          } else if (a === 2) {
            for (
              var m = c[i[0]],
                _ = c[i[1]],
                b = t[i[1]][0],
                w = t[i[1]][1],
                g = 0;
              g < n;
              g++
            ) {
              var y = m[g],
                S = _[g];
              (((y >= h && y <= v) || isNaN(y)) &&
                ((S >= b && S <= w) || isNaN(S)) &&
                (l[u++] = p),
                p++);
            }
            d = !0;
          }
        }
        if (!d)
          if (a === 1)
            for (var g = 0; g < o; g++) {
              var x = r.getRawIndex(g),
                y = c[i[0]][x];
              ((y >= h && y <= v) || isNaN(y)) && (l[u++] = x);
            }
          else
            for (var g = 0; g < o; g++) {
              for (var T = !0, x = r.getRawIndex(g), D = 0; D < a; D++) {
                var A = i[D],
                  y = c[A][x];
                (y < t[A][0] || y > t[A][1]) && (T = !1);
              }
              T && (l[u++] = r.getRawIndex(g));
            }
        return (
          u < o && (r._indices = l),
          (r._count = u),
          (r._extent = []),
          r._updateGetRawIdx(),
          r
        );
      }),
      (e.prototype.map = function (t, r) {
        var n = this.clone(t);
        return (this._updateDims(n, t, r), n);
      }),
      (e.prototype.modify = function (t, r) {
        this._updateDims(this, t, r);
      }),
      (e.prototype._updateDims = function (t, r, n) {
        for (
          var i = t._chunks,
            a = [],
            o = r.length,
            s = t.count(),
            l = [],
            u = t._rawExtent,
            f = 0;
          f < r.length;
          f++
        )
          u[r[f]] = $n();
        for (var h = 0; h < s; h++) {
          for (var v = t.getRawIndex(h), c = 0; c < o; c++) l[c] = i[r[c]][v];
          l[o] = h;
          var d = n && n.apply(null, l);
          if (d != null) {
            typeof d != "object" && ((a[0] = d), (d = a));
            for (var f = 0; f < d.length; f++) {
              var p = r[f],
                m = d[f],
                g = u[p],
                y = i[p];
              (y && (y[v] = m), m < g[0] && (g[0] = m), m > g[1] && (g[1] = m));
            }
          }
        }
      }),
      (e.prototype.lttbDownSample = function (t, r) {
        var n = this.clone([t], !0),
          i = n._chunks,
          a = i[t],
          o = this.count(),
          s = 0,
          l = Math.floor(1 / r),
          u = this.getRawIndex(0),
          f,
          h,
          v,
          c = new (Yn(this._rawCount))(Math.min((Math.ceil(o / l) + 2) * 2, o));
        c[s++] = u;
        for (var d = 1; d < o - 1; d += l) {
          for (
            var p = Math.min(d + l, o - 1),
              m = Math.min(d + l * 2, o),
              g = (m + p) / 2,
              y = 0,
              _ = p;
            _ < m;
            _++
          ) {
            var b = this.getRawIndex(_),
              w = a[b];
            isNaN(w) || (y += w);
          }
          y /= m - p;
          var S = d,
            x = Math.min(d + l, o),
            T = d - 1,
            D = a[u];
          ((f = -1), (v = S));
          for (var A = -1, C = 0, _ = S; _ < x; _++) {
            var b = this.getRawIndex(_),
              w = a[b];
            if (isNaN(w)) {
              (C++, A < 0 && (A = b));
              continue;
            }
            ((h = Math.abs((T - g) * (w - D) - (T - _) * (y - D))),
              h > f && ((f = h), (v = b)));
          }
          (C > 0 &&
            C < x - S &&
            ((c[s++] = Math.min(A, v)), (v = Math.max(A, v))),
            (c[s++] = v),
            (u = v));
        }
        return (
          (c[s++] = this.getRawIndex(o - 1)),
          (n._count = s),
          (n._indices = c),
          (n.getRawIndex = this._getRawIdx),
          n
        );
      }),
      (e.prototype.minmaxDownSample = function (t, r) {
        for (
          var n = this.clone([t], !0),
            i = n._chunks,
            a = Math.floor(1 / r),
            o = i[t],
            s = this.count(),
            l = new (Yn(this._rawCount))(Math.ceil(s / a) * 2),
            u = 0,
            f = 0;
          f < s;
          f += a
        ) {
          var h = f,
            v = o[this.getRawIndex(h)],
            c = f,
            d = o[this.getRawIndex(c)],
            p = a;
          f + a > s && (p = s - f);
          for (var m = 0; m < p; m++) {
            var g = this.getRawIndex(f + m),
              y = o[g];
            (y < v && ((v = y), (h = f + m)), y > d && ((d = y), (c = f + m)));
          }
          var _ = this.getRawIndex(h),
            b = this.getRawIndex(c);
          h < c ? ((l[u++] = _), (l[u++] = b)) : ((l[u++] = b), (l[u++] = _));
        }
        return ((n._count = u), (n._indices = l), n._updateGetRawIdx(), n);
      }),
      (e.prototype.downSample = function (t, r, n, i) {
        for (
          var a = this.clone([t], !0),
            o = a._chunks,
            s = [],
            l = Math.floor(1 / r),
            u = o[t],
            f = this.count(),
            h = (a._rawExtent[t] = $n()),
            v = new (Yn(this._rawCount))(Math.ceil(f / l)),
            c = 0,
            d = 0;
          d < f;
          d += l
        ) {
          l > f - d && ((l = f - d), (s.length = l));
          for (var p = 0; p < l; p++) {
            var m = this.getRawIndex(d + p);
            s[p] = u[m];
          }
          var g = n(s),
            y = this.getRawIndex(Math.min(d + i(s, g) || 0, f - 1));
          ((u[y] = g),
            g < h[0] && (h[0] = g),
            g > h[1] && (h[1] = g),
            (v[c++] = y));
        }
        return ((a._count = c), (a._indices = v), a._updateGetRawIdx(), a);
      }),
      (e.prototype.each = function (t, r) {
        if (this._count)
          for (
            var n = t.length, i = this._chunks, a = 0, o = this.count();
            a < o;
            a++
          ) {
            var s = this.getRawIndex(a);
            switch (n) {
              case 0:
                r(a);
                break;
              case 1:
                r(i[t[0]][s], a);
                break;
              case 2:
                r(i[t[0]][s], i[t[1]][s], a);
                break;
              default:
                for (var l = 0, u = []; l < n; l++) u[l] = i[t[l]][s];
                ((u[l] = a), r.apply(null, u));
            }
          }
      }),
      (e.prototype.getDataExtent = function (t) {
        var r = this._chunks[t],
          n = $n();
        if (!r) return n;
        var i = this.count(),
          a = !this._indices,
          o;
        if (a) return this._rawExtent[t].slice();
        if (((o = this._extent[t]), o)) return o.slice();
        o = n;
        for (var s = o[0], l = o[1], u = 0; u < i; u++) {
          var f = this.getRawIndex(u),
            h = r[f];
          (h < s && (s = h), h > l && (l = h));
        }
        return ((o = [s, l]), (this._extent[t] = o), o);
      }),
      (e.prototype.getRawDataItem = function (t) {
        var r = this.getRawIndex(t);
        if (this._provider.persistent) return this._provider.getItem(r);
        for (var n = [], i = this._chunks, a = 0; a < i.length; a++)
          n.push(i[a][r]);
        return n;
      }),
      (e.prototype.clone = function (t, r) {
        var n = new e(),
          i = this._chunks,
          a =
            t &&
            Fr(
              t,
              function (s, l) {
                return ((s[l] = !0), s);
              },
              {},
            );
        if (a)
          for (var o = 0; o < i.length; o++)
            n._chunks[o] = a[o] ? Bx(i[o]) : i[o];
        else n._chunks = i;
        return (
          this._copyCommonProps(n),
          r || (n._indices = this._cloneIndices()),
          n._updateGetRawIdx(),
          n
        );
      }),
      (e.prototype._copyCommonProps = function (t) {
        ((t._count = this._count),
          (t._rawCount = this._rawCount),
          (t._provider = this._provider),
          (t._dimensions = this._dimensions),
          (t._extent = at(this._extent)),
          (t._rawExtent = at(this._rawExtent)));
      }),
      (e.prototype._cloneIndices = function () {
        if (this._indices) {
          var t = this._indices.constructor,
            r = void 0;
          if (t === Array) {
            var n = this._indices.length;
            r = new t(n);
            for (var i = 0; i < n; i++) r[i] = this._indices[i];
          } else r = new t(this._indices);
          return r;
        }
        return null;
      }),
      (e.prototype._getRawIdxIdentity = function (t) {
        return t;
      }),
      (e.prototype._getRawIdx = function (t) {
        return t < this._count && t >= 0 ? this._indices[t] : -1;
      }),
      (e.prototype._updateGetRawIdx = function () {
        this.getRawIndex = this._indices
          ? this._getRawIdx
          : this._getRawIdxIdentity;
      }),
      (e.internalField = (function () {
        function t(r, n, i, a) {
          return Vo(r[a], this._dimensions[a]);
        }
        Ql = {
          arrayRows: t,
          objectRows: function (r, n, i, a) {
            return Vo(r[n], this._dimensions[a]);
          },
          keyedColumns: t,
          original: function (r, n, i, a) {
            var o = r && (r.value == null ? r : r.value);
            return Vo(o instanceof Array ? o[a] : o, this._dimensions[a]);
          },
          typedArray: function (r, n, i, a) {
            return r[a];
          },
        };
      })()),
      e
    );
  })(),
  Nx = _t(),
  Fx = { float: "f", int: "i", ordinal: "o", number: "n", time: "t" },
  uy = (function () {
    function e(t) {
      ((this.dimensions = t.dimensions),
        (this._dimOmitted = t.dimensionOmitted),
        (this.source = t.source),
        (this._fullDimCount = t.fullDimensionCount),
        this._updateDimOmitted(t.dimensionOmitted));
    }
    return (
      (e.prototype.isDimensionOmitted = function () {
        return this._dimOmitted;
      }),
      (e.prototype._updateDimOmitted = function (t) {
        ((this._dimOmitted = t),
          t && (this._dimNameMap || (this._dimNameMap = cy(this.source))));
      }),
      (e.prototype.getSourceDimensionIndex = function (t) {
        return K(this._dimNameMap.get(t), -1);
      }),
      (e.prototype.getSourceDimension = function (t) {
        var r = this.source.dimensionsDefine;
        if (r) return r[t];
      }),
      (e.prototype.makeStoreSchema = function () {
        for (
          var t = this._fullDimCount,
            r = ry(this.source),
            n = !vy(t),
            i = "",
            a = [],
            o = 0,
            s = 0;
          o < t;
          o++
        ) {
          var l = void 0,
            u = void 0,
            f = void 0,
            h = this.dimensions[s];
          if (h && h.storeDimIndex === o)
            ((l = r ? h.name : null), (u = h.type), (f = h.ordinalMeta), s++);
          else {
            var v = this.getSourceDimension(o);
            v && ((l = r ? v.name : null), (u = v.type));
          }
          (a.push({ property: l, type: u, ordinalMeta: f }),
            r &&
              l != null &&
              (!h || !h.isCalculationCoord) &&
              (i += n ? l.replace(/\`/g, "`1").replace(/\$/g, "`2") : l),
            (i += "$"),
            (i += Fx[u] || "f"),
            f && (i += f.uid),
            (i += "$"));
        }
        var c = this.source,
          d = [c.seriesLayoutBy, c.startIndex, i].join("$$");
        return { dimensions: a, hash: d };
      }),
      (e.prototype.makeOutputDimensionNames = function () {
        for (var t = [], r = 0, n = 0; r < this._fullDimCount; r++) {
          var i = void 0,
            a = this.dimensions[n];
          if (a && a.storeDimIndex === r)
            (a.isCalculationCoord || (i = a.name), n++);
          else {
            var o = this.getSourceDimension(r);
            o && (i = o.name);
          }
          t.push(i);
        }
        return t;
      }),
      (e.prototype.appendCalculationDimension = function (t) {
        (this.dimensions.push(t),
          (t.isCalculationCoord = !0),
          this._fullDimCount++,
          this._updateDimOmitted(!0));
      }),
      e
    );
  })();
function fy(e) {
  return e instanceof uy;
}
function hy(e) {
  for (var t = rt(), r = 0; r < (e || []).length; r++) {
    var n = e[r],
      i = X(n) ? n.name : n;
    i != null && t.get(i) == null && t.set(i, r);
  }
  return t;
}
function cy(e) {
  var t = Nx(e);
  return t.dimNameMap || (t.dimNameMap = hy(e.dimensionsDefine));
}
function vy(e) {
  return e > 30;
}
var Li = X,
  _r = q,
  zx = typeof Int32Array > "u" ? Array : Int32Array,
  Gx = "e\0\0",
  rd = -1,
  Hx = [
    "hasItemOption",
    "_nameList",
    "_idList",
    "_invertedIndicesMap",
    "_dimSummary",
    "userOutput",
    "_rawData",
    "_dimValueGetter",
    "_nameDimIdx",
    "_idDimIdx",
    "_nameRepeatCount",
  ],
  Vx = ["_approximateExtent"],
  nd,
  ho,
  Ii,
  Pi,
  Jl,
  ki,
  tu,
  dy = (function () {
    function e(t, r) {
      ((this.type = "list"),
        (this._dimOmitted = !1),
        (this._nameList = []),
        (this._idList = []),
        (this._visual = {}),
        (this._layout = {}),
        (this._itemVisuals = []),
        (this._itemLayouts = []),
        (this._graphicEls = []),
        (this._approximateExtent = {}),
        (this._calculationInfo = {}),
        (this.hasItemOption = !1),
        (this.TRANSFERABLE_METHODS = [
          "cloneShallow",
          "downSample",
          "minmaxDownSample",
          "lttbDownSample",
          "map",
        ]),
        (this.CHANGABLE_METHODS = ["filterSelf", "selectRange"]),
        (this.DOWNSAMPLE_METHODS = [
          "downSample",
          "minmaxDownSample",
          "lttbDownSample",
        ]));
      var n,
        i = !1;
      (fy(t)
        ? ((n = t.dimensions),
          (this._dimOmitted = t.isDimensionOmitted()),
          (this._schema = t))
        : ((i = !0), (n = t)),
        (n = n || ["x", "y"]));
      for (
        var a = {}, o = [], s = {}, l = !1, u = {}, f = 0;
        f < n.length;
        f++
      ) {
        var h = n[f],
          v = U(h) ? new Ho({ name: h }) : h instanceof Ho ? h : new Ho(h),
          c = v.name;
        ((v.type = v.type || "float"),
          v.coordDim || ((v.coordDim = c), (v.coordDimIndex = 0)));
        var d = (v.otherDims = v.otherDims || {});
        (o.push(c),
          (a[c] = v),
          u[c] != null && (l = !0),
          v.createInvertedIndices && (s[c] = []));
        var p = f;
        (vt(v.storeDimIndex) && (p = v.storeDimIndex),
          d.itemName === 0 && (this._nameDimIdx = p),
          d.itemId === 0 && (this._idDimIdx = p),
          i && (v.storeDimIndex = f));
      }
      if (
        ((this.dimensions = o),
        (this._dimInfos = a),
        this._initGetDimensionInfo(l),
        (this.hostModel = r),
        (this._invertedIndicesMap = s),
        this._dimOmitted)
      ) {
        var m = (this._dimIdxToName = rt());
        M(o, function (g) {
          m.set(a[g].storeDimIndex, g);
        });
      }
    }
    return (
      (e.prototype.getDimension = function (t) {
        var r = this._recognizeDimIndex(t);
        if (r == null) return t;
        if (((r = t), !this._dimOmitted)) return this.dimensions[r];
        var n = this._dimIdxToName.get(r);
        if (n != null) return n;
        var i = this._schema.getSourceDimension(r);
        if (i) return i.name;
      }),
      (e.prototype.getDimensionIndex = function (t) {
        var r = this._recognizeDimIndex(t);
        if (r != null) return r;
        if (t == null) return -1;
        var n = this._getDimInfo(t);
        return n
          ? n.storeDimIndex
          : this._dimOmitted
            ? this._schema.getSourceDimensionIndex(t)
            : -1;
      }),
      (e.prototype._recognizeDimIndex = function (t) {
        if (
          vt(t) ||
          (t != null &&
            !isNaN(t) &&
            !this._getDimInfo(t) &&
            (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
        )
          return +t;
      }),
      (e.prototype._getStoreDimIndex = function (t) {
        var r = this.getDimensionIndex(t);
        return r;
      }),
      (e.prototype.getDimensionInfo = function (t) {
        return this._getDimInfo(this.getDimension(t));
      }),
      (e.prototype._initGetDimensionInfo = function (t) {
        var r = this._dimInfos;
        this._getDimInfo = t
          ? function (n) {
              return r.hasOwnProperty(n) ? r[n] : void 0;
            }
          : function (n) {
              return r[n];
            };
      }),
      (e.prototype.getDimensionsOnCoord = function () {
        return this._dimSummary.dataDimsOnCoord.slice();
      }),
      (e.prototype.mapDimension = function (t, r) {
        var n = this._dimSummary;
        if (r == null) return n.encodeFirstDimNotExtra[t];
        var i = n.encode[t];
        return i ? i[r] : null;
      }),
      (e.prototype.mapDimensionsAll = function (t) {
        var r = this._dimSummary,
          n = r.encode[t];
        return (n || []).slice();
      }),
      (e.prototype.getStore = function () {
        return this._store;
      }),
      (e.prototype.initData = function (t, r, n) {
        var i = this,
          a;
        if ((t instanceof Cf && (a = t), !a)) {
          var o = this.dimensions,
            s = qh(t) || ae(t) ? new ny(t, o.length) : t;
          a = new Cf();
          var l = _r(o, function (u) {
            return { type: i._dimInfos[u].type, property: u };
          });
          a.initData(s, l, n);
        }
        ((this._store = a),
          (this._nameList = (r || []).slice()),
          (this._idList = []),
          (this._nameRepeatCount = {}),
          this._doInit(0, a.count()),
          (this._dimSummary = Ix(this, this._schema)),
          (this.userOutput = this._dimSummary.userOutput));
      }),
      (e.prototype.appendData = function (t) {
        var r = this._store.appendData(t);
        this._doInit(r[0], r[1]);
      }),
      (e.prototype.appendValues = function (t, r) {
        var n = this._store.appendValues(t, r && r.length),
          i = n.start,
          a = n.end,
          o = this._shouldMakeIdFromName();
        if ((this._updateOrdinalMeta(), r))
          for (var s = i; s < a; s++) {
            var l = s - i;
            ((this._nameList[s] = r[l]), o && tu(this, s));
          }
      }),
      (e.prototype._updateOrdinalMeta = function () {
        for (
          var t = this._store, r = this.dimensions, n = 0;
          n < r.length;
          n++
        ) {
          var i = this._dimInfos[r[n]];
          i.ordinalMeta && t.collectOrdinalMeta(i.storeDimIndex, i.ordinalMeta);
        }
      }),
      (e.prototype._shouldMakeIdFromName = function () {
        var t = this._store.getProvider();
        return (
          this._idDimIdx == null &&
          t.getSource().sourceFormat !== Or &&
          !t.fillStorage
        );
      }),
      (e.prototype._doInit = function (t, r) {
        if (!(t >= r)) {
          var n = this._store,
            i = n.getProvider();
          this._updateOrdinalMeta();
          var a = this._nameList,
            o = this._idList,
            s = i.getSource().sourceFormat,
            l = s === fe;
          if (l && !i.pure)
            for (var u = [], f = t; f < r; f++) {
              var h = i.getItem(f, u);
              if (
                (!this.hasItemOption && kS(h) && (this.hasItemOption = !0), h)
              ) {
                var v = h.name;
                a[f] == null && v != null && (a[f] = je(v, null));
                var c = h.id;
                o[f] == null && c != null && (o[f] = je(c, null));
              }
            }
          if (this._shouldMakeIdFromName())
            for (var f = t; f < r; f++) tu(this, f);
          nd(this);
        }
      }),
      (e.prototype.getApproximateExtent = function (t) {
        return (
          this._approximateExtent[t] ||
          this._store.getDataExtent(this._getStoreDimIndex(t))
        );
      }),
      (e.prototype.setApproximateExtent = function (t, r) {
        ((r = this.getDimension(r)), (this._approximateExtent[r] = t.slice()));
      }),
      (e.prototype.getCalculationInfo = function (t) {
        return this._calculationInfo[t];
      }),
      (e.prototype.setCalculationInfo = function (t, r) {
        Li(t) ? B(this._calculationInfo, t) : (this._calculationInfo[t] = r);
      }),
      (e.prototype.getName = function (t) {
        var r = this.getRawIndex(t),
          n = this._nameList[r];
        return (
          n == null &&
            this._nameDimIdx != null &&
            (n = Ii(this, this._nameDimIdx, r)),
          n == null && (n = ""),
          n
        );
      }),
      (e.prototype._getCategory = function (t, r) {
        var n = this._store.get(t, r),
          i = this._store.getOrdinalMeta(t);
        return i ? i.categories[n] : n;
      }),
      (e.prototype.getId = function (t) {
        return ho(this, this.getRawIndex(t));
      }),
      (e.prototype.count = function () {
        return this._store.count();
      }),
      (e.prototype.get = function (t, r) {
        var n = this._store,
          i = this._dimInfos[t];
        if (i) return n.get(i.storeDimIndex, r);
      }),
      (e.prototype.getByRawIndex = function (t, r) {
        var n = this._store,
          i = this._dimInfos[t];
        if (i) return n.getByRawIndex(i.storeDimIndex, r);
      }),
      (e.prototype.getIndices = function () {
        return this._store.getIndices();
      }),
      (e.prototype.getDataExtent = function (t) {
        return this._store.getDataExtent(this._getStoreDimIndex(t));
      }),
      (e.prototype.getSum = function (t) {
        return this._store.getSum(this._getStoreDimIndex(t));
      }),
      (e.prototype.getMedian = function (t) {
        return this._store.getMedian(this._getStoreDimIndex(t));
      }),
      (e.prototype.getValues = function (t, r) {
        var n = this,
          i = this._store;
        return W(t)
          ? i.getValues(
              _r(t, function (a) {
                return n._getStoreDimIndex(a);
              }),
              r,
            )
          : i.getValues(t);
      }),
      (e.prototype.hasValue = function (t) {
        for (
          var r = this._dimSummary.dataDimIndicesOnCoord, n = 0, i = r.length;
          n < i;
          n++
        )
          if (isNaN(this._store.get(r[n], t))) return !1;
        return !0;
      }),
      (e.prototype.indexOfName = function (t) {
        for (var r = 0, n = this._store.count(); r < n; r++)
          if (this.getName(r) === t) return r;
        return -1;
      }),
      (e.prototype.getRawIndex = function (t) {
        return this._store.getRawIndex(t);
      }),
      (e.prototype.indexOfRawIndex = function (t) {
        return this._store.indexOfRawIndex(t);
      }),
      (e.prototype.rawIndexOf = function (t, r) {
        var n = t && this._invertedIndicesMap[t],
          i = n && n[r];
        return i == null || isNaN(i) ? rd : i;
      }),
      (e.prototype.each = function (t, r, n) {
        Q(t) && ((n = r), (r = t), (t = []));
        var i = n || this,
          a = _r(Pi(t), this._getStoreDimIndex, this);
        this._store.each(a, i ? ct(r, i) : r);
      }),
      (e.prototype.filterSelf = function (t, r, n) {
        Q(t) && ((n = r), (r = t), (t = []));
        var i = n || this,
          a = _r(Pi(t), this._getStoreDimIndex, this);
        return ((this._store = this._store.filter(a, i ? ct(r, i) : r)), this);
      }),
      (e.prototype.selectRange = function (t) {
        var r = this,
          n = {},
          i = yt(t);
        return (
          M(i, function (a) {
            var o = r._getStoreDimIndex(a);
            n[o] = t[a];
          }),
          (this._store = this._store.selectRange(n)),
          this
        );
      }),
      (e.prototype.mapArray = function (t, r, n) {
        (Q(t) && ((n = r), (r = t), (t = [])), (n = n || this));
        var i = [];
        return (
          this.each(
            t,
            function () {
              i.push(r && r.apply(this, arguments));
            },
            n,
          ),
          i
        );
      }),
      (e.prototype.map = function (t, r, n, i) {
        var a = n || i || this,
          o = _r(Pi(t), this._getStoreDimIndex, this),
          s = ki(this);
        return ((s._store = this._store.map(o, a ? ct(r, a) : r)), s);
      }),
      (e.prototype.modify = function (t, r, n, i) {
        var a = n || i || this,
          o = _r(Pi(t), this._getStoreDimIndex, this);
        this._store.modify(o, a ? ct(r, a) : r);
      }),
      (e.prototype.downSample = function (t, r, n, i) {
        var a = ki(this);
        return (
          (a._store = this._store.downSample(
            this._getStoreDimIndex(t),
            r,
            n,
            i,
          )),
          a
        );
      }),
      (e.prototype.minmaxDownSample = function (t, r) {
        var n = ki(this);
        return (
          (n._store = this._store.minmaxDownSample(
            this._getStoreDimIndex(t),
            r,
          )),
          n
        );
      }),
      (e.prototype.lttbDownSample = function (t, r) {
        var n = ki(this);
        return (
          (n._store = this._store.lttbDownSample(this._getStoreDimIndex(t), r)),
          n
        );
      }),
      (e.prototype.getRawDataItem = function (t) {
        return this._store.getRawDataItem(t);
      }),
      (e.prototype.getItemModel = function (t) {
        var r = this.hostModel,
          n = this.getRawDataItem(t);
        return new bt(n, r, r && r.ecModel);
      }),
      (e.prototype.diff = function (t) {
        var r = this;
        return new mx(
          t ? t.getStore().getIndices() : [],
          this.getStore().getIndices(),
          function (n) {
            return ho(t, n);
          },
          function (n) {
            return ho(r, n);
          },
        );
      }),
      (e.prototype.getVisual = function (t) {
        var r = this._visual;
        return r && r[t];
      }),
      (e.prototype.setVisual = function (t, r) {
        ((this._visual = this._visual || {}),
          Li(t) ? B(this._visual, t) : (this._visual[t] = r));
      }),
      (e.prototype.getItemVisual = function (t, r) {
        var n = this._itemVisuals[t],
          i = n && n[r];
        return i ?? this.getVisual(r);
      }),
      (e.prototype.hasItemVisual = function () {
        return this._itemVisuals.length > 0;
      }),
      (e.prototype.ensureUniqueItemVisual = function (t, r) {
        var n = this._itemVisuals,
          i = n[t];
        i || (i = n[t] = {});
        var a = i[r];
        return (
          a == null &&
            ((a = this.getVisual(r)),
            W(a) ? (a = a.slice()) : Li(a) && (a = B({}, a)),
            (i[r] = a)),
          a
        );
      }),
      (e.prototype.setItemVisual = function (t, r, n) {
        var i = this._itemVisuals[t] || {};
        ((this._itemVisuals[t] = i), Li(r) ? B(i, r) : (i[r] = n));
      }),
      (e.prototype.clearAllVisual = function () {
        ((this._visual = {}), (this._itemVisuals = []));
      }),
      (e.prototype.setLayout = function (t, r) {
        Li(t) ? B(this._layout, t) : (this._layout[t] = r);
      }),
      (e.prototype.getLayout = function (t) {
        return this._layout[t];
      }),
      (e.prototype.getItemLayout = function (t) {
        return this._itemLayouts[t];
      }),
      (e.prototype.setItemLayout = function (t, r, n) {
        this._itemLayouts[t] = n ? B(this._itemLayouts[t] || {}, r) : r;
      }),
      (e.prototype.clearItemLayouts = function () {
        this._itemLayouts.length = 0;
      }),
      (e.prototype.setItemGraphicEl = function (t, r) {
        var n = this.hostModel && this.hostModel.seriesIndex;
        ($S(n, this.dataType, t, r), (this._graphicEls[t] = r));
      }),
      (e.prototype.getItemGraphicEl = function (t) {
        return this._graphicEls[t];
      }),
      (e.prototype.eachItemGraphicEl = function (t, r) {
        M(this._graphicEls, function (n, i) {
          n && t && t.call(r, n, i);
        });
      }),
      (e.prototype.cloneShallow = function (t) {
        return (
          t ||
            (t = new e(
              this._schema
                ? this._schema
                : _r(this.dimensions, this._getDimInfo, this),
              this.hostModel,
            )),
          Jl(t, this),
          (t._store = this._store),
          t
        );
      }),
      (e.prototype.wrapMethod = function (t, r) {
        var n = this[t];
        Q(n) &&
          ((this.__wrappedMethods = this.__wrappedMethods || []),
          this.__wrappedMethods.push(t),
          (this[t] = function () {
            var i = n.apply(this, arguments);
            return r.apply(this, [i].concat(bh(arguments)));
          }));
      }),
      (e.internalField = (function () {
        ((nd = function (t) {
          var r = t._invertedIndicesMap;
          M(r, function (n, i) {
            var a = t._dimInfos[i],
              o = a.ordinalMeta,
              s = t._store;
            if (o) {
              n = r[i] = new zx(o.categories.length);
              for (var l = 0; l < n.length; l++) n[l] = rd;
              for (var l = 0; l < s.count(); l++)
                n[s.get(a.storeDimIndex, l)] = l;
            }
          });
        }),
          (Ii = function (t, r, n) {
            return je(t._getCategory(r, n), null);
          }),
          (ho = function (t, r) {
            var n = t._idList[r];
            return (
              n == null && t._idDimIdx != null && (n = Ii(t, t._idDimIdx, r)),
              n == null && (n = Gx + r),
              n
            );
          }),
          (Pi = function (t) {
            return (W(t) || (t = t != null ? [t] : []), t);
          }),
          (ki = function (t) {
            var r = new e(
              t._schema ? t._schema : _r(t.dimensions, t._getDimInfo, t),
              t.hostModel,
            );
            return (Jl(r, t), r);
          }),
          (Jl = function (t, r) {
            (M(Hx.concat(r.__wrappedMethods || []), function (n) {
              r.hasOwnProperty(n) && (t[n] = r[n]);
            }),
              (t.__wrappedMethods = r.__wrappedMethods),
              M(Vx, function (n) {
                t[n] = at(r[n]);
              }),
              (t._calculationInfo = B({}, r._calculationInfo)));
          }),
          (tu = function (t, r) {
            var n = t._nameList,
              i = t._idList,
              a = t._nameDimIdx,
              o = t._idDimIdx,
              s = n[r],
              l = i[r];
            if (
              (s == null && a != null && (n[r] = s = Ii(t, a, r)),
              l == null && o != null && (i[r] = l = Ii(t, o, r)),
              l == null && s != null)
            ) {
              var u = t._nameRepeatCount,
                f = (u[s] = (u[s] || 0) + 1);
              ((l = s), f > 1 && (l += "__ec__" + f), (i[r] = l));
            }
          }));
      })()),
      e
    );
  })();
function py(e, t) {
  (qh(e) || (e = ty(e)), (t = t || {}));
  var r = t.coordDimensions || [],
    n = t.dimensionsDefine || e.dimensionsDefine || [],
    i = rt(),
    a = [],
    o = Ux(e, r, n, t.dimensionsCount),
    s = t.canOmitUnusedDimensions && vy(o),
    l = n === e.dimensionsDefine,
    u = l ? cy(e) : hy(n),
    f = t.encodeDefine;
  !f && t.encodeDefaulter && (f = t.encodeDefaulter(e, o));
  for (var h = rt(f), v = new sy(o), c = 0; c < v.length; c++) v[c] = -1;
  function d(D) {
    var A = v[D];
    if (A < 0) {
      var C = n[D],
        I = X(C) ? C : { name: C },
        L = new Ho(),
        P = I.name;
      (P != null && u.get(P) != null && (L.name = L.displayName = P),
        I.type != null && (L.type = I.type),
        I.displayName != null && (L.displayName = I.displayName));
      var k = a.length;
      return ((v[D] = k), (L.storeDimIndex = D), a.push(L), L);
    }
    return a[A];
  }
  if (!s) for (var c = 0; c < o; c++) d(c);
  h.each(function (D, A) {
    var C = Kt(D).slice();
    if (C.length === 1 && !U(C[0]) && C[0] < 0) {
      h.set(A, !1);
      return;
    }
    var I = h.set(A, []);
    M(C, function (L, P) {
      var k = U(L) ? u.get(L) : L;
      k != null && k < o && ((I[P] = k), m(d(k), A, P));
    });
  });
  var p = 0;
  M(r, function (D) {
    var A, C, I, L;
    if (U(D)) ((A = D), (L = {}));
    else {
      ((L = D), (A = L.name));
      var P = L.ordinalMeta;
      ((L.ordinalMeta = null),
        (L = B({}, L)),
        (L.ordinalMeta = P),
        (C = L.dimsDef),
        (I = L.otherDims),
        (L.name =
          L.coordDim =
          L.coordDimIndex =
          L.dimsDef =
          L.otherDims =
            null));
    }
    var k = h.get(A);
    if (k !== !1) {
      if (((k = Kt(k)), !k.length))
        for (var E = 0; E < ((C && C.length) || 1); E++) {
          for (; p < o && d(p).coordDim != null; ) p++;
          p < o && k.push(p++);
        }
      M(k, function (V, R) {
        var O = d(V);
        if (
          (l && L.type != null && (O.type = L.type),
          m(dt(O, L), A, R),
          O.name == null && C)
        ) {
          var z = C[R];
          (!X(z) && (z = { name: z }),
            (O.name = O.displayName = z.name),
            (O.defaultTooltip = z.defaultTooltip));
        }
        I && dt(O.otherDims, I);
      });
    }
  });
  function m(D, A, C) {
    Zm.get(A) != null
      ? (D.otherDims[A] = C)
      : ((D.coordDim = A), (D.coordDimIndex = C), i.set(A, !0));
  }
  var g = t.generateCoord,
    y = t.generateCoordCount,
    _ = y != null;
  y = g ? y || 1 : 0;
  var b = g || "value";
  function w(D) {
    D.name == null && (D.name = D.coordDim);
  }
  if (s)
    (M(a, function (D) {
      w(D);
    }),
      a.sort(function (D, A) {
        return D.storeDimIndex - A.storeDimIndex;
      }));
  else
    for (var S = 0; S < o; S++) {
      var x = d(S),
        T = x.coordDim;
      (T == null &&
        ((x.coordDim = Yx(b, i, _)),
        (x.coordDimIndex = 0),
        (!g || y <= 0) && (x.isExtraCoord = !0),
        y--),
        w(x),
        x.type == null &&
          (Qm(e, S) === Nt.Must ||
            (x.isExtraCoord &&
              (x.otherDims.itemName != null ||
                x.otherDims.seriesName != null))) &&
          (x.type = "ordinal"));
    }
  return (
    Wx(a),
    new uy({
      source: e,
      dimensions: a,
      fullDimensionCount: o,
      dimensionOmitted: s,
    })
  );
}
function Wx(e) {
  for (var t = rt(), r = 0; r < e.length; r++) {
    var n = e[r],
      i = n.name,
      a = t.get(i) || 0;
    (a > 0 && (n.name = i + (a - 1)), a++, t.set(i, a));
  }
}
function Ux(e, t, r, n) {
  var i = Math.max(e.dimensionsDetectedCount || 1, t.length, r.length, n || 0);
  return (
    M(t, function (a) {
      var o;
      X(a) && (o = a.dimsDef) && (i = Math.max(i, o.length));
    }),
    i
  );
}
function Yx(e, t, r) {
  if (r || t.hasKey(e)) {
    for (var n = 0; t.hasKey(e + n); ) n++;
    e += n;
  }
  return (t.set(e, !0), e);
}
var Wo = {},
  eu = {},
  Kh = (function () {
    function e() {
      ((this._normalMasterList = []), (this._nonSeriesBoxMasterList = []));
    }
    return (
      (e.prototype.create = function (t, r) {
        ((this._nonSeriesBoxMasterList = n(Wo)),
          (this._normalMasterList = n(eu)));
        function n(i, a) {
          var o = [];
          return (
            M(i, function (s, l) {
              var u = s.create(t, r);
              o = o.concat(u || []);
            }),
            o
          );
        }
      }),
      (e.prototype.update = function (t, r) {
        M(this._normalMasterList, function (n) {
          n.update && n.update(t, r);
        });
      }),
      (e.prototype.getCoordinateSystems = function () {
        return this._normalMasterList.concat(this._nonSeriesBoxMasterList);
      }),
      (e.register = function (t, r) {
        if (t === "matrix" || t === "calendar") {
          Wo[t] = r;
          return;
        }
        eu[t] = r;
      }),
      (e.get = function (t) {
        return eu[t] || Wo[t];
      }),
      e
    );
  })();
function $x(e) {
  return !!Wo[e];
}
var Df = { coord: 1, coord2: 2 };
function Xx(e) {
  gy.set(e.fullType, { getCoord2: void 0 }).getCoord2 = e.getCoord2;
}
var gy = rt();
function qx(e) {
  var t = e.getShallow("coord", !0),
    r = Df.coord;
  if (t == null) {
    var n = gy.get(e.type);
    n && n.getCoord2 && ((r = Df.coord2), (t = n.getCoord2(e)));
  }
  return { coord: t, from: r };
}
var lr = { none: 0, dataCoordSys: 1, boxCoordSys: 2 };
function Zx(e, t) {
  var r = e.getShallow("coordinateSystem"),
    n = e.getShallow("coordinateSystemUsage", !0),
    i = lr.none;
  if (r) {
    var a = e.mainType === "series";
    (n == null && (n = a ? "data" : "box"),
      n === "data"
        ? ((i = lr.dataCoordSys), a || (i = lr.none))
        : n === "box" && ((i = lr.boxCoordSys), !a && !$x(r) && (i = lr.none)));
  }
  return { coordSysType: r, kind: i };
}
function Kx(e) {
  var t = e.targetModel,
    r = e.coordSysType,
    n = e.coordSysProvider,
    i = e.isDefaultDataCoordSys,
    a = Zx(t),
    o = a.kind,
    s = a.coordSysType;
  if (
    (i && o !== lr.dataCoordSys && ((o = lr.dataCoordSys), (s = r)),
    o === lr.none || s !== r)
  )
    return !1;
  var l = n(r, t);
  return l
    ? (o === lr.dataCoordSys
        ? (t.coordinateSystem = l)
        : (t.boxCoordinateSystem = l),
      !0)
    : !1;
}
var jx = (function () {
  function e(t) {
    ((this.coordSysDims = []),
      (this.axisMap = rt()),
      (this.categoryAxisMap = rt()),
      (this.coordSysName = t));
  }
  return e;
})();
function Qx(e) {
  var t = e.get("coordinateSystem"),
    r = new jx(t),
    n = Jx[t];
  if (n) return (n(e, r, r.axisMap, r.categoryAxisMap), r);
}
var Jx = {
  cartesian2d: function (e, t, r, n) {
    var i = e.getReferringComponents("xAxis", _e).models[0],
      a = e.getReferringComponents("yAxis", _e).models[0];
    ((t.coordSysDims = ["x", "y"]),
      r.set("x", i),
      r.set("y", a),
      Xn(i) && (n.set("x", i), (t.firstCategoryDimIndex = 0)),
      Xn(a) &&
        (n.set("y", a),
        t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1)));
  },
  singleAxis: function (e, t, r, n) {
    var i = e.getReferringComponents("singleAxis", _e).models[0];
    ((t.coordSysDims = ["single"]),
      r.set("single", i),
      Xn(i) && (n.set("single", i), (t.firstCategoryDimIndex = 0)));
  },
  polar: function (e, t, r, n) {
    var i = e.getReferringComponents("polar", _e).models[0],
      a = i.findAxisModel("radiusAxis"),
      o = i.findAxisModel("angleAxis");
    ((t.coordSysDims = ["radius", "angle"]),
      r.set("radius", a),
      r.set("angle", o),
      Xn(a) && (n.set("radius", a), (t.firstCategoryDimIndex = 0)),
      Xn(o) &&
        (n.set("angle", o),
        t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1)));
  },
  geo: function (e, t, r, n) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function (e, t, r, n) {
    var i = e.ecModel,
      a = i.getComponent("parallel", e.get("parallelIndex")),
      o = (t.coordSysDims = a.dimensions.slice());
    M(a.parallelAxisIndex, function (s, l) {
      var u = i.getComponent("parallelAxis", s),
        f = o[l];
      (r.set(f, u),
        Xn(u) &&
          (n.set(f, u),
          t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = l)));
    });
  },
  matrix: function (e, t, r, n) {
    var i = e.getReferringComponents("matrix", _e).models[0];
    t.coordSysDims = ["x", "y"];
    var a = i.getDimensionModel("x"),
      o = i.getDimensionModel("y");
    (r.set("x", a), r.set("y", o), n.set("x", a), n.set("y", o));
  },
};
function Xn(e) {
  return e.get("type") === "category";
}
function tT(e, t, r) {
  r = r || {};
  var n = r.byIndex,
    i = r.stackedCoordDimension,
    a,
    o,
    s;
  eT(t) ? (a = t) : ((o = t.schema), (a = o.dimensions), (s = t.store));
  var l = !!(e && e.get("stack")),
    u,
    f,
    h,
    v;
  if (
    (M(a, function (y, _) {
      (U(y) && (a[_] = y = { name: y }),
        l &&
          !y.isExtraCoord &&
          (!n && !u && y.ordinalMeta && (u = y),
          !f &&
            y.type !== "ordinal" &&
            y.type !== "time" &&
            (!i || i === y.coordDim) &&
            (f = y)));
    }),
    f && !n && !u && (n = !0),
    f)
  ) {
    ((h = "__\0ecstackresult_" + e.id),
      (v = "__\0ecstackedover_" + e.id),
      u && (u.createInvertedIndices = !0));
    var c = f.coordDim,
      d = f.type,
      p = 0;
    M(a, function (y) {
      y.coordDim === c && p++;
    });
    var m = {
        name: h,
        coordDim: c,
        coordDimIndex: p,
        type: d,
        isExtraCoord: !0,
        isCalculationCoord: !0,
        storeDimIndex: a.length,
      },
      g = {
        name: v,
        coordDim: v,
        coordDimIndex: p + 1,
        type: d,
        isExtraCoord: !0,
        isCalculationCoord: !0,
        storeDimIndex: a.length + 1,
      };
    o
      ? (s &&
          ((m.storeDimIndex = s.ensureCalculationDimension(v, d)),
          (g.storeDimIndex = s.ensureCalculationDimension(h, d))),
        o.appendCalculationDimension(m),
        o.appendCalculationDimension(g))
      : (a.push(m), a.push(g));
  }
  return {
    stackedDimension: f && f.name,
    stackedByDimension: u && u.name,
    isStackedByIndex: n,
    stackedOverDimension: v,
    stackResultDimension: h,
  };
}
function eT(e) {
  return !fy(e.schema);
}
function pi(e, t) {
  return !!t && t === e.getCalculationInfo("stackedDimension");
}
function rT(e, t) {
  return pi(e, t) ? e.getCalculationInfo("stackResultDimension") : t;
}
function nT(e, t) {
  var r = e.get("coordinateSystem"),
    n = Kh.get(r),
    i;
  return (
    t &&
      t.coordSysDims &&
      (i = q(t.coordSysDims, function (a) {
        var o = { name: a },
          s = t.axisMap.get(a);
        if (s) {
          var l = s.get("type");
          o.type = Px(l);
        }
        return o;
      })),
    i ||
      (i = (n &&
        (n.getDimensionsInfo
          ? n.getDimensionsInfo()
          : n.dimensions.slice())) || ["x", "y"]),
    i
  );
}
function iT(e, t, r) {
  var n, i;
  return (
    r &&
      M(e, function (a, o) {
        var s = a.coordDim,
          l = r.categoryAxisMap.get(s);
        (l &&
          (n == null && (n = o),
          (a.ordinalMeta = l.getOrdinalMeta()),
          t && (a.createInvertedIndices = !0)),
          a.otherDims.itemName != null && (i = !0));
      }),
    !i && n != null && (e[n].otherDims.itemName = 0),
    n
  );
}
function jh(e, t, r) {
  r = r || {};
  var n = t.getSourceManager(),
    i,
    a = !1;
  ((i = n.getSource()), (a = i.sourceFormat === fe));
  var o = Qx(t),
    s = nT(t, o),
    l = r.useEncodeDefaulter,
    u = Q(l) ? l : l ? Mt(_x, s, t) : null,
    f = {
      coordDimensions: s,
      generateCoord: r.generateCoord,
      encodeDefine: t.getEncode(),
      encodeDefaulter: u,
      canOmitUnusedDimensions: !a,
    },
    h = py(i, f),
    v = iT(h.dimensions, r.createInvertedIndices, o),
    c = a ? null : n.getSharedDataStore(h),
    d = tT(t, { schema: h, store: c }),
    p = new dy(h, t);
  p.setCalculationInfo(d);
  var m =
    v != null && aT(i)
      ? function (g, y, _, b) {
          return b === v ? _ : this.defaultDimValueGetter(g, y, _, b);
        }
      : null;
  return ((p.hasItemOption = !1), p.initData(a ? i : c, null, m), p);
}
function aT(e) {
  if (e.sourceFormat === fe) {
    var t = oT(e.data || []);
    return !W(Oa(t));
  }
}
function oT(e) {
  for (var t = 0; t < e.length && e[t] == null; ) t++;
  return e[t];
}
var sT = Math.round(Math.random() * 10);
function il(e) {
  return [e || "", sT++].join("_");
}
function lT(e) {
  var t = {};
  ((e.registerSubTypeDefaulter = function (r, n) {
    var i = $e(r);
    t[i.main] = n;
  }),
    (e.determineSubType = function (r, n) {
      var i = n.type;
      if (!i) {
        var a = $e(r).main;
        e.hasSubTypes(r) && t[a] && (i = t[a](n));
      }
      return i;
    }));
}
function uT(e, t) {
  e.topologicalTravel = function (a, o, s, l) {
    if (!a.length) return;
    var u = r(o),
      f = u.graph,
      h = u.noEntryList,
      v = {};
    for (
      M(a, function (y) {
        v[y] = !0;
      });
      h.length;

    ) {
      var c = h.pop(),
        d = f[c],
        p = !!v[c];
      (p && (s.call(l, c, d.originalDeps.slice()), delete v[c]),
        M(d.successor, p ? g : m));
    }
    M(v, function () {
      var y = "";
      throw new Error(y);
    });
    function m(y) {
      (f[y].entryCount--, f[y].entryCount === 0 && h.push(y));
    }
    function g(y) {
      ((v[y] = !0), m(y));
    }
  };
  function r(a) {
    var o = {},
      s = [];
    return (
      M(a, function (l) {
        var u = n(o, l),
          f = (u.originalDeps = t(l)),
          h = i(f, a);
        ((u.entryCount = h.length),
          u.entryCount === 0 && s.push(l),
          M(h, function (v) {
            st(u.predecessor, v) < 0 && u.predecessor.push(v);
            var c = n(o, v);
            st(c.successor, v) < 0 && c.successor.push(l);
          }));
      }),
      { graph: o, noEntryList: s }
    );
  }
  function n(a, o) {
    return (a[o] || (a[o] = { predecessor: [], successor: [] }), a[o]);
  }
  function i(a, o) {
    var s = [];
    return (
      M(a, function (l) {
        st(o, l) >= 0 && s.push(l);
      }),
      s
    );
  }
}
function my(e, t) {
  return ut(ut({}, e, !0), t, !0);
}
var fT = Math.log(2);
function Mf(e, t, r, n, i, a) {
  var o = n + "-" + i,
    s = e.length;
  if (a.hasOwnProperty(o)) return a[o];
  if (t === 1) {
    var l = Math.round(Math.log(((1 << s) - 1) & ~i) / fT);
    return e[r][l];
  }
  for (var u = n | (1 << r), f = r + 1; n & (1 << f); ) f++;
  for (var h = 0, v = 0, c = 0; v < s; v++) {
    var d = 1 << v;
    d & i ||
      ((h += (c % 2 ? -1 : 1) * e[r][v] * Mf(e, t - 1, f, u, i | d, a)), c++);
  }
  return ((a[o] = h), h);
}
function id(e, t) {
  var r = [
      [e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]],
      [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]],
      [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]],
      [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]],
      [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]],
      [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]],
      [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]],
      [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]],
    ],
    n = {},
    i = Mf(r, 8, 0, 0, 0, n);
  if (i !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        (a[s] == null && (a[s] = 0),
          (a[s] +=
            ((((o + s) % 2 ? -1 : 1) *
              Mf(r, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, n)) /
              i) *
            t[o]));
    return function (l, u, f) {
      var h = u * a[6] + f * a[7] + 1;
      ((l[0] = (u * a[0] + f * a[1] + a[2]) / h),
        (l[1] = (u * a[3] + f * a[4] + a[5]) / h));
    };
  }
}
var gs = "___zrEVENTSAVED",
  ru = [];
function hT(e, t, r, n, i) {
  return Af(ru, t, n, i, !0) && Af(e, r, ru[0], ru[1]);
}
function cT(e, t) {
  (e && r(e), t && r(t));
  function r(n) {
    var i = n[gs];
    i && (i.clearMarkers && i.clearMarkers(), delete n[gs]);
  }
}
function Af(e, t, r, n, i) {
  if (t.getBoundingClientRect && tt.domSupported && !yy(t)) {
    var a = t[gs] || (t[gs] = {}),
      o = vT(t, a),
      s = dT(o, a, i);
    if (s) return (s(e, r, n), !0);
  }
  return !1;
}
function vT(e, t) {
  var r = t.markers;
  if (r) return r;
  r = t.markers = [];
  for (var n = ["left", "right"], i = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"),
      s = o.style,
      l = a % 2,
      u = (a >> 1) % 2;
    ((s.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      n[l] + ":0",
      i[u] + ":0",
      n[1 - l] + ":auto",
      i[1 - u] + ":auto",
      "",
    ].join("!important;")),
      e.appendChild(o),
      r.push(o));
  }
  return (
    (t.clearMarkers = function () {
      M(r, function (f) {
        f.parentNode && f.parentNode.removeChild(f);
      });
    }),
    r
  );
}
function dT(e, t, r) {
  for (
    var n = r ? "invTrans" : "trans",
      i = t[n],
      a = t.srcCoords,
      o = [],
      s = [],
      l = !0,
      u = 0;
    u < 4;
    u++
  ) {
    var f = e[u].getBoundingClientRect(),
      h = 2 * u,
      v = f.left,
      c = f.top;
    (o.push(v, c),
      (l = l && a && v === a[h] && c === a[h + 1]),
      s.push(e[u].offsetLeft, e[u].offsetTop));
  }
  return l && i ? i : ((t.srcCoords = o), (t[n] = r ? id(s, o) : id(o, s)));
}
function yy(e) {
  return e.nodeName.toUpperCase() === "CANVAS";
}
var pT = /([&<>"'])/g,
  gT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function re(e) {
  return e == null
    ? ""
    : (e + "").replace(pT, function (t, r) {
        return gT[r];
      });
}
const mT = {
    time: {
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthAbbr: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    legend: { selector: { all: "All", inverse: "Inv" } },
    toolbox: {
      brush: {
        title: {
          rect: "Box Select",
          polygon: "Lasso Select",
          lineX: "Horizontally Select",
          lineY: "Vertically Select",
          keep: "Keep Selections",
          clear: "Clear Selections",
        },
      },
      dataView: { title: "Data View", lang: ["Data View", "Close", "Refresh"] },
      dataZoom: { title: { zoom: "Zoom", back: "Zoom Reset" } },
      magicType: {
        title: {
          line: "Switch to Line Chart",
          bar: "Switch to Bar Chart",
          stack: "Stack",
          tiled: "Tile",
        },
      },
      restore: { title: "Restore" },
      saveAsImage: {
        title: "Save as Image",
        lang: ["Right Click to Save Image"],
      },
    },
    series: {
      typeNames: {
        pie: "Pie chart",
        bar: "Bar chart",
        line: "Line chart",
        scatter: "Scatter plot",
        effectScatter: "Ripple scatter plot",
        radar: "Radar chart",
        tree: "Tree",
        treemap: "Treemap",
        boxplot: "Boxplot",
        candlestick: "Candlestick",
        k: "K line chart",
        heatmap: "Heat map",
        map: "Map",
        parallel: "Parallel coordinate map",
        lines: "Line graph",
        graph: "Relationship graph",
        sankey: "Sankey diagram",
        funnel: "Funnel chart",
        gauge: "Gauge",
        pictorialBar: "Pictorial bar",
        themeRiver: "Theme River Map",
        sunburst: "Sunburst",
        custom: "Custom chart",
        chart: "Chart",
      },
    },
    aria: {
      general: {
        withTitle: 'This is a chart about "{title}"',
        withoutTitle: "This is a chart",
      },
      series: {
        single: {
          prefix: "",
          withName: " with type {seriesType} named {seriesName}.",
          withoutName: " with type {seriesType}.",
        },
        multiple: {
          prefix: ". It consists of {seriesCount} series count.",
          withName:
            " The {seriesId} series is a {seriesType} representing {seriesName}.",
          withoutName: " The {seriesId} series is a {seriesType}.",
          separator: { middle: "", end: "" },
        },
      },
      data: {
        allData: "The data is as follows: ",
        partialData: "The first {displayCnt} items are: ",
        withName: "the data for {name} is {value}",
        withoutName: "{value}",
        separator: { middle: ", ", end: ". " },
      },
    },
  },
  yT = {
    time: {
      month: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      monthAbbr: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      dayOfWeek: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      dayOfWeekAbbr: ["日", "一", "二", "三", "四", "五", "六"],
    },
    legend: { selector: { all: "全选", inverse: "反选" } },
    toolbox: {
      brush: {
        title: {
          rect: "矩形选择",
          polygon: "圈选",
          lineX: "横向选择",
          lineY: "纵向选择",
          keep: "保持选择",
          clear: "清除选择",
        },
      },
      dataView: { title: "数据视图", lang: ["数据视图", "关闭", "刷新"] },
      dataZoom: { title: { zoom: "区域缩放", back: "区域缩放还原" } },
      magicType: {
        title: {
          line: "切换为折线图",
          bar: "切换为柱状图",
          stack: "切换为堆叠",
          tiled: "切换为平铺",
        },
      },
      restore: { title: "还原" },
      saveAsImage: { title: "保存为图片", lang: ["右键另存为图片"] },
    },
    series: {
      typeNames: {
        pie: "饼图",
        bar: "柱状图",
        line: "折线图",
        scatter: "散点图",
        effectScatter: "涟漪散点图",
        radar: "雷达图",
        tree: "树图",
        treemap: "矩形树图",
        boxplot: "箱型图",
        candlestick: "K线图",
        k: "K线图",
        heatmap: "热力图",
        map: "地图",
        parallel: "平行坐标图",
        lines: "线图",
        graph: "关系图",
        sankey: "桑基图",
        funnel: "漏斗图",
        gauge: "仪表盘图",
        pictorialBar: "象形柱图",
        themeRiver: "主题河流图",
        sunburst: "旭日图",
        custom: "自定义图表",
        chart: "图表",
      },
    },
    aria: {
      general: {
        withTitle: "这是一个关于“{title}”的图表。",
        withoutTitle: "这是一个图表，",
      },
      series: {
        single: {
          prefix: "",
          withName: "图表类型是{seriesType}，表示{seriesName}。",
          withoutName: "图表类型是{seriesType}。",
        },
        multiple: {
          prefix: "它由{seriesCount}个图表系列组成。",
          withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
          withoutName: "第{seriesId}个系列是一个{seriesType}，",
          separator: { middle: "；", end: "。" },
        },
      },
      data: {
        allData: "其数据是——",
        partialData: "其中，前{displayCnt}项是——",
        withName: "{name}的数据是{value}",
        withoutName: "{value}",
        separator: { middle: "，", end: "" },
      },
    },
  };
var ms = "ZH",
  Qh = "EN",
  fi = Qh,
  Uo = {},
  Jh = {},
  _y = tt.domSupported
    ? (function () {
        var e = (
          document.documentElement.lang ||
          navigator.language ||
          navigator.browserLanguage ||
          fi
        ).toUpperCase();
        return e.indexOf(ms) > -1 ? ms : fi;
      })()
    : fi;
function by(e, t) {
  ((e = e.toUpperCase()), (Jh[e] = new bt(t)), (Uo[e] = t));
}
function _T(e) {
  if (U(e)) {
    var t = Uo[e.toUpperCase()] || {};
    return e === ms || e === Qh ? at(t) : ut(at(t), at(Uo[fi]), !1);
  } else return ut(at(e), at(Uo[fi]), !1);
}
function bT(e) {
  return Jh[e];
}
function ST() {
  return Jh[fi];
}
by(Qh, mT);
by(ms, yT);
var wT = null;
function ys() {
  return wT;
}
var tc = 1e3,
  ec = tc * 60,
  sa = ec * 60,
  be = sa * 24,
  ad = be * 365,
  xT = {
    year: /({yyyy}|{yy})/,
    month: /({MMMM}|{MMM}|{MM}|{M})/,
    day: /({dd}|{d})/,
    hour: /({HH}|{H}|{hh}|{h})/,
    minute: /({mm}|{m})/,
    second: /({ss}|{s})/,
    millisecond: /({SSS}|{S})/,
  },
  Yo = {
    year: "{yyyy}",
    month: "{MMM}",
    day: "{d}",
    hour: "{HH}:{mm}",
    minute: "{HH}:{mm}",
    second: "{HH}:{mm}:{ss}",
    millisecond: "{HH}:{mm}:{ss} {SSS}",
  },
  TT = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}",
  co = "{yyyy}-{MM}-{dd}",
  od = {
    year: "{yyyy}",
    month: "{yyyy}-{MM}",
    day: co,
    hour: co + " " + Yo.hour,
    minute: co + " " + Yo.minute,
    second: co + " " + Yo.second,
    millisecond: TT,
  },
  In = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  CT = [
    "year",
    "half-year",
    "quarter",
    "month",
    "week",
    "half-week",
    "day",
    "half-day",
    "quarter-day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
function DT(e) {
  return !U(e) && !Q(e) ? MT(e) : e;
}
function MT(e) {
  e = e || {};
  var t = {},
    r = !0;
  return (
    M(In, function (n) {
      r && (r = e[n] == null);
    }),
    M(In, function (n, i) {
      var a = e[n];
      t[n] = {};
      for (var o = null, s = i; s >= 0; s--) {
        var l = In[s],
          u = X(a) && !W(a) ? a[l] : a,
          f = void 0;
        (W(u)
          ? ((f = u.slice()), (o = f[0] || ""))
          : U(u)
            ? ((o = u), (f = [o]))
            : (o == null
                ? (o = Yo[n])
                : xT[l].test(o) || (o = t[l][l][0] + " " + o),
              (f = [o]),
              r && (f[1] = "{primary|" + o + "}")),
          (t[n][l] = f));
      }
    }),
    t
  );
}
function br(e, t) {
  return ((e += ""), "0000".substr(0, t - e.length) + e);
}
function la(e) {
  switch (e) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return e;
  }
}
function AT(e) {
  return e === la(e);
}
function LT(e) {
  switch (e) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function al(e, t, r, n) {
  var i = Si(e),
    a = i[Sy(r)](),
    o = i[rc(r)]() + 1,
    s = Math.floor((o - 1) / 3) + 1,
    l = i[nc(r)](),
    u = i["get" + (r ? "UTC" : "") + "Day"](),
    f = i[ic(r)](),
    h = ((f - 1) % 12) + 1,
    v = i[ac(r)](),
    c = i[oc(r)](),
    d = i[sc(r)](),
    p = f >= 12 ? "pm" : "am",
    m = p.toUpperCase(),
    g = n instanceof bt ? n : bT(n || _y) || ST(),
    y = g.getModel("time"),
    _ = y.get("month"),
    b = y.get("monthAbbr"),
    w = y.get("dayOfWeek"),
    S = y.get("dayOfWeekAbbr");
  return (t || "")
    .replace(/{a}/g, p + "")
    .replace(/{A}/g, m + "")
    .replace(/{yyyy}/g, a + "")
    .replace(/{yy}/g, br((a % 100) + "", 2))
    .replace(/{Q}/g, s + "")
    .replace(/{MMMM}/g, _[o - 1])
    .replace(/{MMM}/g, b[o - 1])
    .replace(/{MM}/g, br(o, 2))
    .replace(/{M}/g, o + "")
    .replace(/{dd}/g, br(l, 2))
    .replace(/{d}/g, l + "")
    .replace(/{eeee}/g, w[u])
    .replace(/{ee}/g, S[u])
    .replace(/{e}/g, u + "")
    .replace(/{HH}/g, br(f, 2))
    .replace(/{H}/g, f + "")
    .replace(/{hh}/g, br(h + "", 2))
    .replace(/{h}/g, h + "")
    .replace(/{mm}/g, br(v, 2))
    .replace(/{m}/g, v + "")
    .replace(/{ss}/g, br(c, 2))
    .replace(/{s}/g, c + "")
    .replace(/{SSS}/g, br(d, 3))
    .replace(/{S}/g, d + "");
}
function IT(e, t, r, n, i) {
  var a = null;
  if (U(r)) a = r;
  else if (Q(r)) {
    var o = { time: e.time, level: e.time.level },
      s = ys();
    (s && s.makeAxisLabelFormatterParamBreak(o, e.break),
      (a = r(e.value, t, o)));
  } else {
    var l = e.time;
    if (l) {
      var u = r[l.lowerTimeUnit][l.upperTimeUnit];
      a = u[Math.min(l.level, u.length - 1)] || "";
    } else {
      var f = _s(e.value, i);
      a = r[f][f][0];
    }
  }
  return al(new Date(e.value), a, i, n);
}
function _s(e, t) {
  var r = Si(e),
    n = r[rc(t)]() + 1,
    i = r[nc(t)](),
    a = r[ic(t)](),
    o = r[ac(t)](),
    s = r[oc(t)](),
    l = r[sc(t)](),
    u = l === 0,
    f = u && s === 0,
    h = f && o === 0,
    v = h && a === 0,
    c = v && i === 1,
    d = c && n === 1;
  return d
    ? "year"
    : c
      ? "month"
      : v
        ? "day"
        : h
          ? "hour"
          : f
            ? "minute"
            : u
              ? "second"
              : "millisecond";
}
function Lf(e, t, r) {
  switch (t) {
    case "year":
      e[wy(r)](0);
    case "month":
      e[xy(r)](1);
    case "day":
      e[Ty(r)](0);
    case "hour":
      e[Cy(r)](0);
    case "minute":
      e[Dy(r)](0);
    case "second":
      e[My(r)](0);
  }
  return e;
}
function Sy(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function rc(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function nc(e) {
  return e ? "getUTCDate" : "getDate";
}
function ic(e) {
  return e ? "getUTCHours" : "getHours";
}
function ac(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function oc(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function sc(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function PT(e) {
  return e ? "setUTCFullYear" : "setFullYear";
}
function wy(e) {
  return e ? "setUTCMonth" : "setMonth";
}
function xy(e) {
  return e ? "setUTCDate" : "setDate";
}
function Ty(e) {
  return e ? "setUTCHours" : "setHours";
}
function Cy(e) {
  return e ? "setUTCMinutes" : "setMinutes";
}
function Dy(e) {
  return e ? "setUTCSeconds" : "setSeconds";
}
function My(e) {
  return e ? "setUTCMilliseconds" : "setMilliseconds";
}
function Ay(e) {
  if (!MS(e)) return U(e) ? e : "-";
  var t = (e + "").split(".");
  return (
    t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") +
    (t.length > 1 ? "." + t[1] : "")
  );
}
function Ly(e, t) {
  return (
    (e = (e || "").toLowerCase().replace(/-(.)/g, function (r, n) {
      return n.toUpperCase();
    })),
    t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)),
    e
  );
}
var ol = Sh;
function If(e, t, r) {
  var n = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function i(f) {
    return f && Ye(f) ? f : "-";
  }
  function a(f) {
    return !!(f != null && !isNaN(f) && isFinite(f));
  }
  var o = t === "time",
    s = e instanceof Date;
  if (o || s) {
    var l = o ? Si(e) : e;
    if (isNaN(+l)) {
      if (s) return "-";
    } else return al(l, n, r);
  }
  if (t === "ordinal") return Wu(e) ? i(e) : vt(e) && a(e) ? e + "" : "-";
  var u = ss(e);
  return a(u) ? Ay(u) : Wu(e) ? i(e) : typeof e == "boolean" ? e + "" : "-";
}
var sd = ["a", "b", "c", "d", "e", "f", "g"],
  nu = function (e, t) {
    return "{" + e + (t ?? "") + "}";
  };
function Iy(e, t, r) {
  W(t) || (t = [t]);
  var n = t.length;
  if (!n) return "";
  for (var i = t[0].$vars || [], a = 0; a < i.length; a++) {
    var o = sd[a];
    e = e.replace(nu(o), nu(o, 0));
  }
  for (var s = 0; s < n; s++)
    for (var l = 0; l < i.length; l++) {
      var u = t[s][i[l]];
      e = e.replace(nu(sd[l], s), r ? re(u) : u);
    }
  return e;
}
function kT(e, t) {
  var r = U(e) ? { color: e, extraCssText: t } : e || {},
    n = r.color,
    i = r.type;
  t = r.extraCssText;
  var a = r.renderMode || "html";
  if (!n) return "";
  if (a === "html")
    return i === "subItem"
      ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' +
          re(n) +
          ";" +
          (t || "") +
          '"></span>'
      : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' +
          re(n) +
          ";" +
          (t || "") +
          '"></span>';
  var o = r.markerId || "markerX";
  return {
    renderMode: a,
    content: "{" + o + "|}  ",
    style:
      i === "subItem"
        ? { width: 4, height: 4, borderRadius: 2, backgroundColor: n }
        : { width: 10, height: 10, borderRadius: 5, backgroundColor: n },
  };
}
function En(e, t) {
  return (
    (t = t || "transparent"),
    U(e) ? e : (X(e) && e.colorStops && (e.colorStops[0] || {}).color) || t
  );
}
function ld(e, t) {
  if (t === "_blank" || t === "blank") {
    var r = window.open();
    ((r.opener = null), (r.location.href = e));
  } else window.open(e, t);
}
var $o = M,
  RT = ["left", "right", "top", "bottom", "width", "height"],
  vo = [
    ["width", "left", "right"],
    ["height", "top", "bottom"],
  ];
function lc(e, t, r, n, i) {
  var a = 0,
    o = 0;
  (n == null && (n = 1 / 0), i == null && (i = 1 / 0));
  var s = 0;
  t.eachChild(function (l, u) {
    var f = l.getBoundingRect(),
      h = t.childAt(u + 1),
      v = h && h.getBoundingRect(),
      c,
      d;
    if (e === "horizontal") {
      var p = f.width + (v ? -v.x + f.x : 0);
      ((c = a + p),
        c > n || l.newline
          ? ((a = 0), (c = p), (o += s + r), (s = f.height))
          : (s = Math.max(s, f.height)));
    } else {
      var m = f.height + (v ? -v.y + f.y : 0);
      ((d = o + m),
        d > i || l.newline
          ? ((a += s + r), (o = 0), (d = m), (s = f.width))
          : (s = Math.max(s, f.width)));
    }
    l.newline ||
      ((l.x = a),
      (l.y = o),
      l.markRedraw(),
      e === "horizontal" ? (a = c + r) : (o = d + r));
  });
}
var ua = lc;
Mt(lc, "vertical");
Mt(lc, "horizontal");
function ET(e, t) {
  return {
    left: e.getShallow("left", t),
    top: e.getShallow("top", t),
    right: e.getShallow("right", t),
    bottom: e.getShallow("bottom", t),
    width: e.getShallow("width", t),
    height: e.getShallow("height", t),
  };
}
function OT(e, t) {
  var r = sl(e, t, { enableLayoutOnlyByCenter: !0 }),
    n = e.getBoxLayoutParams(),
    i,
    a;
  if (r.type === qi.point)
    ((a = r.refPoint),
      (i = Vr(n, { width: t.getWidth(), height: t.getHeight() })));
  else {
    var o = e.get("center"),
      s = W(o) ? o : [o, o];
    ((i = Vr(n, r.refContainer)),
      (a =
        r.boxCoordFrom === Df.coord2
          ? r.refPoint
          : [mt(s[0], i.width) + i.x, mt(s[1], i.height) + i.y]));
  }
  return { viewRect: i, center: a };
}
function BT(e, t) {
  var r = OT(e, t),
    n = r.viewRect,
    i = r.center,
    a = e.get("radius");
  W(a) || (a = [0, a]);
  var o = mt(n.width, t.getWidth()),
    s = mt(n.height, t.getHeight()),
    l = Math.min(o, s),
    u = mt(a[0], l / 2),
    f = mt(a[1], l / 2);
  return { cx: i[0], cy: i[1], r0: u, r: f, viewRect: n };
}
function Vr(e, t, r) {
  r = ol(r || 0);
  var n = t.width,
    i = t.height,
    a = mt(e.left, n),
    o = mt(e.top, i),
    s = mt(e.right, n),
    l = mt(e.bottom, i),
    u = mt(e.width, n),
    f = mt(e.height, i),
    h = r[2] + r[0],
    v = r[1] + r[3],
    c = e.aspect;
  switch (
    (isNaN(u) && (u = n - s - v - a),
    isNaN(f) && (f = i - l - h - o),
    c != null &&
      (isNaN(u) && isNaN(f) && (c > n / i ? (u = n * 0.8) : (f = i * 0.8)),
      isNaN(u) && (u = c * f),
      isNaN(f) && (f = u / c)),
    isNaN(a) && (a = n - s - u - v),
    isNaN(o) && (o = i - l - f - h),
    e.left || e.right)
  ) {
    case "center":
      a = n / 2 - u / 2 - r[3];
      break;
    case "right":
      a = n - u - v;
      break;
  }
  switch (e.top || e.bottom) {
    case "middle":
    case "center":
      o = i / 2 - f / 2 - r[0];
      break;
    case "bottom":
      o = i - f - h;
      break;
  }
  ((a = a || 0),
    (o = o || 0),
    isNaN(u) && (u = n - v - a - (s || 0)),
    isNaN(f) && (f = i - h - o - (l || 0)));
  var d = new et((t.x || 0) + a + r[3], (t.y || 0) + o + r[0], u, f);
  return ((d.margin = r), d);
}
var qi = { rect: 1, point: 2 };
function sl(e, t, r) {
  var n,
    i,
    a,
    o = e.boxCoordinateSystem,
    s;
  if (o) {
    var l = qx(e),
      u = l.coord,
      f = l.from;
    if (o.dataToLayout) {
      ((a = qi.rect), (s = f));
      var h = o.dataToLayout(u);
      n = h.contentRect || h.rect;
    } else
      r &&
        r.enableLayoutOnlyByCenter &&
        o.dataToPoint &&
        ((a = qi.point), (s = f), (i = o.dataToPoint(u)));
  }
  return (
    a == null && (a = qi.rect),
    a === qi.rect &&
      (n || (n = { x: 0, y: 0, width: t.getWidth(), height: t.getHeight() }),
      (i = [n.x + n.width / 2, n.y + n.height / 2])),
    { type: a, refContainer: n, refPoint: i, boxCoordFrom: s }
  );
}
function wa(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return X(t) ? t : t ? { type: t } : null;
}
function Wr(e, t, r) {
  var n = r && r.ignoreSize;
  !W(n) && (n = [n, n]);
  var i = o(vo[0], 0),
    a = o(vo[1], 1);
  (l(vo[0], e, i), l(vo[1], e, a));
  function o(u, f) {
    var h = {},
      v = 0,
      c = {},
      d = 0,
      p = 2;
    if (
      ($o(u, function (y) {
        c[y] = e[y];
      }),
      $o(u, function (y) {
        (Ie(t, y) && (h[y] = c[y] = t[y]), s(h, y) && v++, s(c, y) && d++);
      }),
      n[f])
    )
      return (
        s(t, u[1]) ? (c[u[2]] = null) : s(t, u[2]) && (c[u[1]] = null),
        c
      );
    if (d === p || !v) return c;
    if (v >= p) return h;
    for (var m = 0; m < u.length; m++) {
      var g = u[m];
      if (!Ie(h, g) && Ie(e, g)) {
        h[g] = e[g];
        break;
      }
    }
    return h;
  }
  function s(u, f) {
    return u[f] != null && u[f] !== "auto";
  }
  function l(u, f, h) {
    $o(u, function (v) {
      f[v] = h[v];
    });
  }
}
function Ga(e) {
  return NT({}, e);
}
function NT(e, t) {
  return (
    t &&
      e &&
      $o(RT, function (r) {
        Ie(t, r) && (e[r] = t[r]);
      }),
    e
  );
}
var FT = _t(),
  ht = (function (e) {
    G(t, e);
    function t(r, n, i) {
      var a = e.call(this, r, n, i) || this;
      return ((a.uid = il("ec_cpt_model")), a);
    }
    return (
      (t.prototype.init = function (r, n, i) {
        this.mergeDefaultAndTheme(r, i);
      }),
      (t.prototype.mergeDefaultAndTheme = function (r, n) {
        var i = wa(this),
          a = i ? Ga(r) : {},
          o = n.getTheme();
        (ut(r, o.get(this.mainType)),
          ut(r, this.getDefaultOption()),
          i && Wr(r, a, i));
      }),
      (t.prototype.mergeOption = function (r, n) {
        ut(this.option, r, !0);
        var i = wa(this);
        i && Wr(this.option, r, i);
      }),
      (t.prototype.optionUpdated = function (r, n) {}),
      (t.prototype.getDefaultOption = function () {
        var r = this.constructor;
        if (!V1(r)) return r.defaultOption;
        var n = FT(this);
        if (!n.defaultOption) {
          for (var i = [], a = r; a; ) {
            var o = a.prototype.defaultOption;
            (o && i.push(o), (a = a.superClass));
          }
          for (var s = {}, l = i.length - 1; l >= 0; l--) s = ut(s, i[l], !0);
          n.defaultOption = s;
        }
        return n.defaultOption;
      }),
      (t.prototype.getReferringComponents = function (r, n) {
        var i = r + "Index",
          a = r + "Id";
        return Ba(
          this.ecModel,
          r,
          { index: this.get(i, !0), id: this.get(a, !0) },
          n,
        );
      }),
      (t.prototype.getBoxLayoutParams = function () {
        return ET(this, !1);
      }),
      (t.prototype.getZLevelKey = function () {
        return "";
      }),
      (t.prototype.setZLevel = function (r) {
        this.option.zlevel = r;
      }),
      (t.protoInitialize = (function () {
        var r = t.prototype;
        ((r.type = "component"),
          (r.id = ""),
          (r.name = ""),
          (r.mainType = ""),
          (r.subType = ""),
          (r.componentIndex = 0));
      })()),
      t
    );
  })(bt);
Hg(ht, bt);
Vs(ht);
lT(ht);
uT(ht, zT);
function zT(e) {
  var t = [];
  return (
    M(ht.getClassesByMainType(e), function (r) {
      t = t.concat(r.dependencies || r.prototype.dependencies || []);
    }),
    (t = q(t, function (r) {
      return $e(r).main;
    })),
    e !== "dataset" && st(t, "dataset") <= 0 && t.unshift("dataset"),
    t
  );
}
var ud = _t();
_t();
var uc = (function () {
  function e() {}
  return (
    (e.prototype.getColorFromPalette = function (t, r, n) {
      var i = Kt(this.get("color", !0)),
        a = this.get("colorLayer", !0);
      return HT(this, ud, i, a, t, r, n);
    }),
    (e.prototype.clearColorPalette = function () {
      VT(this, ud);
    }),
    e
  );
})();
function GT(e, t) {
  for (var r = e.length, n = 0; n < r; n++) if (e[n].length > t) return e[n];
  return e[r - 1];
}
function HT(e, t, r, n, i, a, o) {
  a = a || e;
  var s = t(a),
    l = s.paletteIdx || 0,
    u = (s.paletteNameMap = s.paletteNameMap || {});
  if (u.hasOwnProperty(i)) return u[i];
  var f = o == null || !n ? r : GT(n, o);
  if (((f = f || r), !(!f || !f.length))) {
    var h = f[l];
    return (i && (u[i] = h), (s.paletteIdx = (l + 1) % f.length), h);
  }
}
function VT(e, t) {
  ((t(e).paletteIdx = 0), (t(e).paletteNameMap = {}));
}
var WT = /\{@(.+?)\}/g,
  UT = (function () {
    function e() {}
    return (
      (e.prototype.getDataParams = function (t, r) {
        var n = this.getData(r),
          i = this.getRawValue(t, r),
          a = n.getRawIndex(t),
          o = n.getName(t),
          s = n.getRawDataItem(t),
          l = n.getItemVisual(t, "style"),
          u = l && l[n.getItemVisual(t, "drawType") || "fill"],
          f = l && l.stroke,
          h = this.mainType,
          v = h === "series",
          c = n.userOutput && n.userOutput.get();
        return {
          componentType: h,
          componentSubType: this.subType,
          componentIndex: this.componentIndex,
          seriesType: v ? this.subType : null,
          seriesIndex: this.seriesIndex,
          seriesId: v ? this.id : null,
          seriesName: v ? this.name : null,
          name: o,
          dataIndex: a,
          data: s,
          dataType: r,
          value: i,
          color: u,
          borderColor: f,
          dimensionNames: c ? c.fullDimensions : null,
          encode: c ? c.encode : null,
          $vars: ["seriesName", "name", "value"],
        };
      }),
      (e.prototype.getFormattedLabel = function (t, r, n, i, a, o) {
        r = r || "normal";
        var s = this.getData(n),
          l = this.getDataParams(t, n);
        if (
          (o && (l.value = o.interpolatedValue),
          i != null && W(l.value) && (l.value = l.value[i]),
          !a)
        ) {
          var u = s.getItemModel(t);
          a = u.get(
            r === "normal" ? ["label", "formatter"] : [r, "label", "formatter"],
          );
        }
        if (Q(a)) return ((l.status = r), (l.dimensionIndex = i), a(l));
        if (U(a)) {
          var f = Iy(a, l);
          return f.replace(WT, function (h, v) {
            var c = v.length,
              d = v;
            d.charAt(0) === "[" &&
              d.charAt(c - 1) === "]" &&
              (d = +d.slice(1, c - 1));
            var p = di(s, t, d);
            if (o && W(o.interpolatedValue)) {
              var m = s.getDimensionIndex(d);
              m >= 0 && (p = o.interpolatedValue[m]);
            }
            return p != null ? p + "" : "";
          });
        }
      }),
      (e.prototype.getRawValue = function (t, r) {
        return di(this.getData(r), t);
      }),
      (e.prototype.formatTooltip = function (t, r, n) {}),
      e
    );
  })();
function fd(e) {
  var t, r;
  return (X(e) ? e.type && (r = e) : (t = e), { text: t, frag: r });
}
function fa(e) {
  return new YT(e);
}
var YT = (function () {
    function e(t) {
      ((t = t || {}),
        (this._reset = t.reset),
        (this._plan = t.plan),
        (this._count = t.count),
        (this._onDirty = t.onDirty),
        (this._dirty = !0));
    }
    return (
      (e.prototype.perform = function (t) {
        var r = this._upstream,
          n = t && t.skip;
        if (this._dirty && r) {
          var i = this.context;
          i.data = i.outputData = r.context.outputData;
        }
        this.__pipeline && (this.__pipeline.currentTask = this);
        var a;
        this._plan && !n && (a = this._plan(this.context));
        var o = f(this._modBy),
          s = this._modDataCount || 0,
          l = f(t && t.modBy),
          u = (t && t.modDataCount) || 0;
        (o !== l || s !== u) && (a = "reset");
        function f(y) {
          return (!(y >= 1) && (y = 1), y);
        }
        var h;
        ((this._dirty || a === "reset") &&
          ((this._dirty = !1), (h = this._doReset(n))),
          (this._modBy = l),
          (this._modDataCount = u));
        var v = t && t.step;
        if (
          (r
            ? (this._dueEnd = r._outputDueEnd)
            : (this._dueEnd = this._count ? this._count(this.context) : 1 / 0),
          this._progress)
        ) {
          var c = this._dueIndex,
            d = Math.min(v != null ? this._dueIndex + v : 1 / 0, this._dueEnd);
          if (!n && (h || c < d)) {
            var p = this._progress;
            if (W(p))
              for (var m = 0; m < p.length; m++)
                this._doProgress(p[m], c, d, l, u);
            else this._doProgress(p, c, d, l, u);
          }
          this._dueIndex = d;
          var g = this._settedOutputEnd != null ? this._settedOutputEnd : d;
          this._outputDueEnd = g;
        } else
          this._dueIndex = this._outputDueEnd =
            this._settedOutputEnd != null
              ? this._settedOutputEnd
              : this._dueEnd;
        return this.unfinished();
      }),
      (e.prototype.dirty = function () {
        ((this._dirty = !0), this._onDirty && this._onDirty(this.context));
      }),
      (e.prototype._doProgress = function (t, r, n, i, a) {
        (hd.reset(r, n, i, a),
          (this._callingProgress = t),
          this._callingProgress(
            { start: r, end: n, count: n - r, next: hd.next },
            this.context,
          ));
      }),
      (e.prototype._doReset = function (t) {
        ((this._dueIndex = this._outputDueEnd = this._dueEnd = 0),
          (this._settedOutputEnd = null));
        var r, n;
        (!t &&
          this._reset &&
          ((r = this._reset(this.context)),
          r && r.progress && ((n = r.forceFirstProgress), (r = r.progress)),
          W(r) && !r.length && (r = null)),
          (this._progress = r),
          (this._modBy = this._modDataCount = null));
        var i = this._downstream;
        return (i && i.dirty(), n);
      }),
      (e.prototype.unfinished = function () {
        return this._progress && this._dueIndex < this._dueEnd;
      }),
      (e.prototype.pipe = function (t) {
        (this._downstream !== t || this._dirty) &&
          ((this._downstream = t), (t._upstream = this), t.dirty());
      }),
      (e.prototype.dispose = function () {
        this._disposed ||
          (this._upstream && (this._upstream._downstream = null),
          this._downstream && (this._downstream._upstream = null),
          (this._dirty = !1),
          (this._disposed = !0));
      }),
      (e.prototype.getUpstream = function () {
        return this._upstream;
      }),
      (e.prototype.getDownstream = function () {
        return this._downstream;
      }),
      (e.prototype.setOutputEnd = function (t) {
        this._outputDueEnd = this._settedOutputEnd = t;
      }),
      e
    );
  })(),
  hd = (function () {
    var e,
      t,
      r,
      n,
      i,
      a = {
        reset: function (l, u, f, h) {
          ((t = l),
            (e = u),
            (r = f),
            (n = h),
            (i = Math.ceil(n / r)),
            (a.next = r > 1 && n > 0 ? s : o));
        },
      };
    return a;
    function o() {
      return t < e ? t++ : null;
    }
    function s() {
      var l = (t % i) * r + Math.ceil(t / i),
        u = t >= e ? null : l < n ? l : t;
      return (t++, u);
    }
  })(),
  $T = (function () {
    function e() {}
    return (
      (e.prototype.getRawData = function () {
        throw new Error("not supported");
      }),
      (e.prototype.getRawDataItem = function (t) {
        throw new Error("not supported");
      }),
      (e.prototype.cloneRawData = function () {}),
      (e.prototype.getDimensionInfo = function (t) {}),
      (e.prototype.cloneAllDimensionInfo = function () {}),
      (e.prototype.count = function () {}),
      (e.prototype.retrieveValue = function (t, r) {}),
      (e.prototype.retrieveValueFromItem = function (t, r) {}),
      (e.prototype.convertValue = function (t, r) {
        return Vo(t, r);
      }),
      e
    );
  })();
function XT(e, t) {
  var r = new $T(),
    n = e.data,
    i = (r.sourceFormat = e.sourceFormat),
    a = e.startIndex,
    o = "";
  e.seriesLayoutBy !== Qe && ee(o);
  var s = [],
    l = {},
    u = e.dimensionsDefine;
  if (u)
    M(u, function (p, m) {
      var g = p.name,
        y = { index: m, name: g, displayName: p.displayName };
      if ((s.push(y), g != null)) {
        var _ = "";
        (Ie(l, g) && ee(_), (l[g] = y));
      }
    });
  else for (var f = 0; f < e.dimensionsDetectedCount; f++) s.push({ index: f });
  var h = iy(i, Qe);
  (t.__isBuiltIn &&
    ((r.getRawDataItem = function (p) {
      return h(n, a, s, p);
    }),
    (r.getRawData = ct(qT, null, e))),
    (r.cloneRawData = ct(ZT, null, e)));
  var v = ay(i, Qe);
  r.count = ct(v, null, n, a, s);
  var c = oy(i);
  r.retrieveValue = function (p, m) {
    var g = h(n, a, s, p);
    return d(g, m);
  };
  var d = (r.retrieveValueFromItem = function (p, m) {
    if (p != null) {
      var g = s[m];
      if (g) return c(p, m, g.name);
    }
  });
  return (
    (r.getDimensionInfo = ct(KT, null, s, l)),
    (r.cloneAllDimensionInfo = ct(jT, null, s)),
    r
  );
}
function qT(e) {
  var t = e.sourceFormat;
  if (!fc(t)) {
    var r = "";
    ee(r);
  }
  return e.data;
}
function ZT(e) {
  var t = e.sourceFormat,
    r = e.data;
  if (!fc(t)) {
    var n = "";
    ee(n);
  }
  if (t === $t) {
    for (var i = [], a = 0, o = r.length; a < o; a++) i.push(r[a].slice());
    return i;
  } else if (t === Ce) {
    for (var i = [], a = 0, o = r.length; a < o; a++) i.push(B({}, r[a]));
    return i;
  }
}
function KT(e, t, r) {
  if (r != null) {
    if (vt(r) || (!isNaN(r) && !Ie(t, r))) return e[r];
    if (Ie(t, r)) return t[r];
  }
}
function jT(e) {
  return at(e);
}
var Py = rt();
function QT(e) {
  e = at(e);
  var t = e.type,
    r = "";
  t || ee(r);
  var n = t.split(":");
  n.length !== 2 && ee(r);
  var i = !1;
  (n[0] === "echarts" && ((t = n[1]), (i = !0)),
    (e.__isBuiltIn = i),
    Py.set(t, e));
}
function JT(e, t, r) {
  var n = Kt(e),
    i = n.length,
    a = "";
  i || ee(a);
  for (var o = 0, s = i; o < s; o++) {
    var l = n[o];
    ((t = tC(l, t)), o !== s - 1 && (t.length = Math.max(t.length, 1)));
  }
  return t;
}
function tC(e, t, r, n) {
  var i = "";
  (t.length || ee(i), X(e) || ee(i));
  var a = e.type,
    o = Py.get(a);
  o || ee(i);
  var s = q(t, function (u) {
      return XT(u, o);
    }),
    l = Kt(
      o.transform({ upstream: s[0], upstreamList: s, config: at(e.config) }),
    );
  return q(l, function (u, f) {
    var h = "";
    (X(u) || ee(h), u.data || ee(h));
    var v = ey(u.data);
    fc(v) || ee(h);
    var c,
      d = t[0];
    if (d && f === 0 && !u.dimensions) {
      var p = d.startIndex;
      (p && (u.data = d.data.slice(0, p).concat(u.data)),
        (c = {
          seriesLayoutBy: Qe,
          sourceHeader: p,
          dimensions: d.metaRawOption.dimensions,
        }));
    } else
      c = { seriesLayoutBy: Qe, sourceHeader: 0, dimensions: u.dimensions };
    return Tf(u.data, c, null);
  });
}
function fc(e) {
  return e === $t || e === Ce;
}
var eC = (function () {
  function e(t) {
    ((this._sourceList = []),
      (this._storeList = []),
      (this._upstreamSignList = []),
      (this._versionSignBase = 0),
      (this._dirty = !0),
      (this._sourceHost = t));
  }
  return (
    (e.prototype.dirty = function () {
      (this._setLocalSource([], []),
        (this._storeList = []),
        (this._dirty = !0));
    }),
    (e.prototype._setLocalSource = function (t, r) {
      ((this._sourceList = t),
        (this._upstreamSignList = r),
        this._versionSignBase++,
        this._versionSignBase > 9e10 && (this._versionSignBase = 0));
    }),
    (e.prototype._getVersionSign = function () {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }),
    (e.prototype.prepareSource = function () {
      this._isDirty() && (this._createSource(), (this._dirty = !1));
    }),
    (e.prototype._createSource = function () {
      this._setLocalSource([], []);
      var t = this._sourceHost,
        r = this._getUpstreamSourceManagers(),
        n = !!r.length,
        i,
        a;
      if (po(t)) {
        var o = t,
          s = void 0,
          l = void 0,
          u = void 0;
        if (n) {
          var f = r[0];
          (f.prepareSource(),
            (u = f.getSource()),
            (s = u.data),
            (l = u.sourceFormat),
            (a = [f._getVersionSign()]));
        } else ((s = o.get("data", !0)), (l = oe(s) ? Or : fe), (a = []));
        var h = this._getSourceMetaRawOption() || {},
          v = (u && u.metaRawOption) || {},
          c = K(h.seriesLayoutBy, v.seriesLayoutBy) || null,
          d = K(h.sourceHeader, v.sourceHeader),
          p = K(h.dimensions, v.dimensions),
          m = c !== v.seriesLayoutBy || !!d != !!v.sourceHeader || p;
        i = m
          ? [Tf(s, { seriesLayoutBy: c, sourceHeader: d, dimensions: p }, l)]
          : [];
      } else {
        var g = t;
        if (n) {
          var y = this._applyTransform(r);
          ((i = y.sourceList), (a = y.upstreamSignList));
        } else {
          var _ = g.get("source", !0);
          ((i = [Tf(_, this._getSourceMetaRawOption(), null)]), (a = []));
        }
      }
      this._setLocalSource(i, a);
    }),
    (e.prototype._applyTransform = function (t) {
      var r = this._sourceHost,
        n = r.get("transform", !0),
        i = r.get("fromTransformResult", !0);
      if (i != null) {
        var a = "";
        t.length !== 1 && cd(a);
      }
      var o,
        s = [],
        l = [];
      return (
        M(t, function (u) {
          u.prepareSource();
          var f = u.getSource(i || 0),
            h = "";
          (i != null && !f && cd(h), s.push(f), l.push(u._getVersionSign()));
        }),
        n
          ? (o = JT(n, s, { datasetIndex: r.componentIndex }))
          : i != null && (o = [xx(s[0])]),
        { sourceList: o, upstreamSignList: l }
      );
    }),
    (e.prototype._isDirty = function () {
      if (this._dirty) return !0;
      for (
        var t = this._getUpstreamSourceManagers(), r = 0;
        r < t.length;
        r++
      ) {
        var n = t[r];
        if (n._isDirty() || this._upstreamSignList[r] !== n._getVersionSign())
          return !0;
      }
    }),
    (e.prototype.getSource = function (t) {
      t = t || 0;
      var r = this._sourceList[t];
      if (!r) {
        var n = this._getUpstreamSourceManagers();
        return n[0] && n[0].getSource(t);
      }
      return r;
    }),
    (e.prototype.getSharedDataStore = function (t) {
      var r = t.makeStoreSchema();
      return this._innerGetDataStore(r.dimensions, t.source, r.hash);
    }),
    (e.prototype._innerGetDataStore = function (t, r, n) {
      var i = 0,
        a = this._storeList,
        o = a[i];
      o || (o = a[i] = {});
      var s = o[n];
      if (!s) {
        var l = this._getUpstreamSourceManagers()[0];
        (po(this._sourceHost) && l
          ? (s = l._innerGetDataStore(t, r, n))
          : ((s = new Cf()), s.initData(new ny(r, t.length), t)),
          (o[n] = s));
      }
      return s;
    }),
    (e.prototype._getUpstreamSourceManagers = function () {
      var t = this._sourceHost;
      if (po(t)) {
        var r = Xh(t);
        return r ? [r.getSourceManager()] : [];
      } else
        return q(Sx(t), function (n) {
          return n.getSourceManager();
        });
    }),
    (e.prototype._getSourceMetaRawOption = function () {
      var t = this._sourceHost,
        r,
        n,
        i;
      if (po(t))
        ((r = t.get("seriesLayoutBy", !0)),
          (n = t.get("sourceHeader", !0)),
          (i = t.get("dimensions", !0)));
      else if (!this._getUpstreamSourceManagers().length) {
        var a = t;
        ((r = a.get("seriesLayoutBy", !0)),
          (n = a.get("sourceHeader", !0)),
          (i = a.get("dimensions", !0)));
      }
      return { seriesLayoutBy: r, sourceHeader: n, dimensions: i };
    }),
    e
  );
})();
function po(e) {
  return e.mainType === "series";
}
function cd(e) {
  throw new Error(e);
}
var Y = { color: {}, darkColor: {}, size: {} },
  St = (Y.color = {
    theme: [
      "#5070dd",
      "#b6d634",
      "#505372",
      "#ff994d",
      "#0ca8df",
      "#ffd10a",
      "#fb628b",
      "#785db0",
      "#3fbe95",
    ],
    neutral00: "#fff",
    neutral05: "#f4f7fd",
    neutral10: "#e8ebf0",
    neutral15: "#dbdee4",
    neutral20: "#cfd2d7",
    neutral25: "#c3c5cb",
    neutral30: "#b7b9be",
    neutral35: "#aaacb2",
    neutral40: "#9ea0a5",
    neutral45: "#929399",
    neutral50: "#86878c",
    neutral55: "#797b7f",
    neutral60: "#6d6e73",
    neutral65: "#616266",
    neutral70: "#54555a",
    neutral75: "#48494d",
    neutral80: "#3c3c41",
    neutral85: "#303034",
    neutral90: "#232328",
    neutral95: "#17171b",
    neutral99: "#000",
    accent05: "#eff1f9",
    accent10: "#e0e4f2",
    accent15: "#d0d6ec",
    accent20: "#c0c9e6",
    accent25: "#b1bbdf",
    accent30: "#a1aed9",
    accent35: "#91a0d3",
    accent40: "#8292cc",
    accent45: "#7285c6",
    accent50: "#6578ba",
    accent55: "#5c6da9",
    accent60: "#536298",
    accent65: "#4a5787",
    accent70: "#404c76",
    accent75: "#374165",
    accent80: "#2e3654",
    accent85: "#252b43",
    accent90: "#1b2032",
    accent95: "#121521",
    transparent: "rgba(0,0,0,0)",
    highlight: "rgba(255,231,130,0.8)",
  });
B(St, {
  primary: St.neutral80,
  secondary: St.neutral70,
  tertiary: St.neutral60,
  quaternary: St.neutral50,
  disabled: St.neutral20,
  border: St.neutral30,
  borderTint: St.neutral20,
  borderShade: St.neutral40,
  background: St.neutral05,
  backgroundTint: "rgba(234,237,245,0.5)",
  backgroundTransparent: "rgba(255,255,255,0)",
  backgroundShade: St.neutral10,
  shadow: "rgba(0,0,0,0.2)",
  shadowTint: "rgba(129,130,136,0.2)",
  axisLine: St.neutral70,
  axisLineTint: St.neutral40,
  axisTick: St.neutral70,
  axisTickMinor: St.neutral60,
  axisLabel: St.neutral70,
  axisSplitLine: St.neutral15,
  axisMinorSplitLine: St.neutral05,
});
for (var mn in St)
  if (St.hasOwnProperty(mn)) {
    var vd = St[mn];
    mn === "theme"
      ? (Y.darkColor.theme = St.theme.slice())
      : mn === "highlight"
        ? (Y.darkColor.highlight = "rgba(255,231,130,0.4)")
        : mn.indexOf("accent") === 0
          ? (Y.darkColor[mn] = rf(
              vd,
              null,
              function (e) {
                return e * 0.5;
              },
              function (e) {
                return Math.min(1, 1.3 - e);
              },
            ))
          : (Y.darkColor[mn] = rf(
              vd,
              null,
              function (e) {
                return e * 0.9;
              },
              function (e) {
                return 1 - Math.pow(e, 1.5);
              },
            ));
  }
Y.size = { xxs: 2, xs: 5, s: 10, m: 15, l: 20, xl: 30, xxl: 40, xxxl: 50 };
var rC = "line-height:1";
function ky(e) {
  var t = e.lineHeight;
  return t == null ? rC : "line-height:" + re(t + "") + "px";
}
function Ry(e, t) {
  var r = e.color || Y.color.tertiary,
    n = e.fontSize || 12,
    i = e.fontWeight || "400",
    a = e.color || Y.color.secondary,
    o = e.fontSize || 14,
    s = e.fontWeight || "900";
  return t === "html"
    ? {
        nameStyle:
          "font-size:" +
          re(n + "") +
          "px;color:" +
          re(r) +
          ";font-weight:" +
          re(i + ""),
        valueStyle:
          "font-size:" +
          re(o + "") +
          "px;color:" +
          re(a) +
          ";font-weight:" +
          re(s + ""),
      }
    : {
        nameStyle: { fontSize: n, fill: r, fontWeight: i },
        valueStyle: { fontSize: o, fill: a, fontWeight: s },
      };
}
var nC = [0, 10, 20, 30],
  iC = [
    "",
    `
`,
    `

`,
    `


`,
  ];
function xa(e, t) {
  return ((t.type = e), t);
}
function Pf(e) {
  return e.type === "section";
}
function Ey(e) {
  return Pf(e) ? aC : oC;
}
function Oy(e) {
  if (Pf(e)) {
    var t = 0,
      r = e.blocks.length,
      n = r > 1 || (r > 0 && !e.noHeader);
    return (
      M(e.blocks, function (i) {
        var a = Oy(i);
        a >= t && (t = a + +(n && (!a || (Pf(i) && !i.noHeader))));
      }),
      t
    );
  }
  return 0;
}
function aC(e, t, r, n) {
  var i = t.noHeader,
    a = sC(Oy(t)),
    o = [],
    s = t.blocks || [];
  (dr(!s || W(s)), (s = s || []));
  var l = e.orderMode;
  if (t.sortBlocks && l) {
    s = s.slice();
    var u = { valueAsc: "asc", valueDesc: "desc" };
    if (Ie(u, l)) {
      var f = new Rx(u[l], null);
      s.sort(function (p, m) {
        return f.evaluate(p.sortParam, m.sortParam);
      });
    } else l === "seriesDesc" && s.reverse();
  }
  M(s, function (p, m) {
    var g = t.valueFormatter,
      y = Ey(p)(
        g ? B(B({}, e), { valueFormatter: g }) : e,
        p,
        m > 0 ? a.html : 0,
        n,
      );
    y != null && o.push(y);
  });
  var h =
    e.renderMode === "richText"
      ? o.join(a.richText)
      : kf(n, o.join(""), i ? r : a.html);
  if (i) return h;
  var v = If(t.header, "ordinal", e.useUTC),
    c = Ry(n, e.renderMode).nameStyle,
    d = ky(n);
  return e.renderMode === "richText"
    ? By(e, v, c) + a.richText + h
    : kf(n, '<div style="' + c + ";" + d + ';">' + re(v) + "</div>" + h, r);
}
function oC(e, t, r, n) {
  var i = e.renderMode,
    a = t.noName,
    o = t.noValue,
    s = !t.markerType,
    l = t.name,
    u = e.useUTC,
    f =
      t.valueFormatter ||
      e.valueFormatter ||
      function (b) {
        return (
          (b = W(b) ? b : [b]),
          q(b, function (w, S) {
            return If(w, W(c) ? c[S] : c, u);
          })
        );
      };
  if (!(a && o)) {
    var h = s
        ? ""
        : e.markupStyleCreator.makeTooltipMarker(
            t.markerType,
            t.markerColor || Y.color.secondary,
            i,
          ),
      v = a ? "" : If(l, "ordinal", u),
      c = t.valueType,
      d = o ? [] : f(t.value, t.dataIndex),
      p = !s || !a,
      m = !s && a,
      g = Ry(n, i),
      y = g.nameStyle,
      _ = g.valueStyle;
    return i === "richText"
      ? (s ? "" : h) + (a ? "" : By(e, v, y)) + (o ? "" : fC(e, d, p, m, _))
      : kf(
          n,
          (s ? "" : h) + (a ? "" : lC(v, !s, y)) + (o ? "" : uC(d, p, m, _)),
          r,
        );
  }
}
function dd(e, t, r, n, i, a) {
  if (e) {
    var o = Ey(e),
      s = {
        useUTC: i,
        renderMode: r,
        orderMode: n,
        markupStyleCreator: t,
        valueFormatter: e.valueFormatter,
      };
    return o(s, e, 0, a);
  }
}
function sC(e) {
  return { html: nC[e], richText: iC[e] };
}
function kf(e, t, r) {
  var n = '<div style="clear:both"></div>',
    i = "margin: " + r + "px 0 0",
    a = ky(e);
  return '<div style="' + i + ";" + a + ';">' + t + n + "</div>";
}
function lC(e, t, r) {
  var n = t ? "margin-left:2px" : "";
  return '<span style="' + r + ";" + n + '">' + re(e) + "</span>";
}
function uC(e, t, r, n) {
  var i = r ? "10px" : "20px",
    a = t ? "float:right;margin-left:" + i : "";
  return (
    (e = W(e) ? e : [e]),
    '<span style="' +
      a +
      ";" +
      n +
      '">' +
      q(e, function (o) {
        return re(o);
      }).join("&nbsp;&nbsp;") +
      "</span>"
  );
}
function By(e, t, r) {
  return e.markupStyleCreator.wrapRichTextStyle(t, r);
}
function fC(e, t, r, n, i) {
  var a = [i],
    o = n ? 10 : 20;
  return (
    r && a.push({ padding: [0, 0, 0, o], align: "right" }),
    e.markupStyleCreator.wrapRichTextStyle(W(t) ? t.join("  ") : t, a)
  );
}
function hC(e, t) {
  var r = e.getData().getItemVisual(t, "style"),
    n = r[e.visualDrawType];
  return En(n);
}
function Ny(e, t) {
  var r = e.get("padding");
  return r ?? (t === "richText" ? [8, 10] : 10);
}
var iu = (function () {
  function e() {
    ((this.richTextStyles = {}), (this._nextStyleNameId = pm()));
  }
  return (
    (e.prototype._generateStyleName = function () {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    }),
    (e.prototype.makeTooltipMarker = function (t, r, n) {
      var i = n === "richText" ? this._generateStyleName() : null,
        a = kT({ color: r, type: t, renderMode: n, markerId: i });
      return U(a) ? a : ((this.richTextStyles[i] = a.style), a.content);
    }),
    (e.prototype.wrapRichTextStyle = function (t, r) {
      var n = {};
      W(r)
        ? M(r, function (a) {
            return B(n, a);
          })
        : B(n, r);
      var i = this._generateStyleName();
      return ((this.richTextStyles[i] = n), "{" + i + "|" + t + "}");
    }),
    e
  );
})();
function cC(e) {
  var t = e.series,
    r = e.dataIndex,
    n = e.multipleSeries,
    i = t.getData(),
    a = i.mapDimensionsAll("defaultedTooltip"),
    o = a.length,
    s = t.getRawValue(r),
    l = W(s),
    u = hC(t, r),
    f,
    h,
    v,
    c;
  if (o > 1 || (l && !o)) {
    var d = vC(s, t, r, a, u);
    ((f = d.inlineValues),
      (h = d.inlineValueTypes),
      (v = d.blocks),
      (c = d.inlineValues[0]));
  } else if (o) {
    var p = i.getDimensionInfo(a[0]);
    ((c = f = di(i, r, a[0])), (h = p.type));
  } else c = f = l ? s[0] : s;
  var m = Lh(t),
    g = (m && t.name) || "",
    y = i.getName(r),
    _ = n ? g : y;
  return xa("section", {
    header: g,
    noHeader: n || !m,
    sortParam: c,
    blocks: [
      xa("nameValue", {
        markerType: "item",
        markerColor: u,
        name: _,
        noName: !Ye(_),
        value: f,
        valueType: h,
        dataIndex: r,
      }),
    ].concat(v || []),
  });
}
function vC(e, t, r, n, i) {
  var a = t.getData(),
    o = Fr(
      e,
      function (h, v, c) {
        var d = a.getDimensionInfo(c);
        return (h = h || (d && d.tooltip !== !1 && d.displayName != null));
      },
      !1,
    ),
    s = [],
    l = [],
    u = [];
  n.length
    ? M(n, function (h) {
        f(di(a, r, h), h);
      })
    : M(e, f);
  function f(h, v) {
    var c = a.getDimensionInfo(v);
    !c ||
      c.otherDims.tooltip === !1 ||
      (o
        ? u.push(
            xa("nameValue", {
              markerType: "subItem",
              markerColor: i,
              name: c.displayName,
              value: h,
              valueType: c.type,
            }),
          )
        : (s.push(h), l.push(c.type)));
  }
  return { inlineValues: s, inlineValueTypes: l, blocks: u };
}
var Sr = _t();
function go(e, t) {
  return e.getName(t) || e.getId(t);
}
var dC = "__universalTransitionEnabled",
  Pe = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r._selectedDataIndicesMap = {}), r);
    }
    return (
      (t.prototype.init = function (r, n, i) {
        ((this.seriesIndex = this.componentIndex),
          (this.dataTask = fa({ count: gC, reset: mC })),
          (this.dataTask.context = { model: this }),
          this.mergeDefaultAndTheme(r, i));
        var a = (Sr(this).sourceManager = new eC(this));
        a.prepareSource();
        var o = this.getInitialData(r, i);
        (gd(o, this),
          (this.dataTask.context.data = o),
          (Sr(this).dataBeforeProcessed = o),
          pd(this),
          this._initSelectedMapFromData(o));
      }),
      (t.prototype.mergeDefaultAndTheme = function (r, n) {
        var i = wa(this),
          a = i ? Ga(r) : {},
          o = this.subType;
        (ht.hasClass(o) && (o += "Series"),
          ut(r, n.getTheme().get(this.subType)),
          ut(r, this.getDefaultOption()),
          df(r, "label", ["show"]),
          this.fillDataTextStyle(r.data),
          i && Wr(r, a, i));
      }),
      (t.prototype.mergeOption = function (r, n) {
        ((r = ut(this.option, r, !0)), this.fillDataTextStyle(r.data));
        var i = wa(this);
        i && Wr(this.option, r, i);
        var a = Sr(this).sourceManager;
        (a.dirty(), a.prepareSource());
        var o = this.getInitialData(r, n);
        (gd(o, this),
          this.dataTask.dirty(),
          (this.dataTask.context.data = o),
          (Sr(this).dataBeforeProcessed = o),
          pd(this),
          this._initSelectedMapFromData(o));
      }),
      (t.prototype.fillDataTextStyle = function (r) {
        if (r && !oe(r))
          for (var n = ["show"], i = 0; i < r.length; i++)
            r[i] && r[i].label && df(r[i], "label", n);
      }),
      (t.prototype.getInitialData = function (r, n) {}),
      (t.prototype.appendData = function (r) {
        var n = this.getRawData();
        n.appendData(r.data);
      }),
      (t.prototype.getData = function (r) {
        var n = Rf(this);
        if (n) {
          var i = n.context.data;
          return r == null || !i.getLinkedData ? i : i.getLinkedData(r);
        } else return Sr(this).data;
      }),
      (t.prototype.getAllData = function () {
        var r = this.getData();
        return r && r.getLinkedDataAll ? r.getLinkedDataAll() : [{ data: r }];
      }),
      (t.prototype.setData = function (r) {
        var n = Rf(this);
        if (n) {
          var i = n.context;
          ((i.outputData = r), n !== this.dataTask && (i.data = r));
        }
        Sr(this).data = r;
      }),
      (t.prototype.getEncode = function () {
        var r = this.get("encode", !0);
        if (r) return rt(r);
      }),
      (t.prototype.getSourceManager = function () {
        return Sr(this).sourceManager;
      }),
      (t.prototype.getSource = function () {
        return this.getSourceManager().getSource();
      }),
      (t.prototype.getRawData = function () {
        return Sr(this).dataBeforeProcessed;
      }),
      (t.prototype.getColorBy = function () {
        var r = this.get("colorBy");
        return r || "series";
      }),
      (t.prototype.isColorBySeries = function () {
        return this.getColorBy() === "series";
      }),
      (t.prototype.getBaseAxis = function () {
        var r = this.coordinateSystem;
        return r && r.getBaseAxis && r.getBaseAxis();
      }),
      (t.prototype.indicesOfNearest = function (r, n, i, a) {
        var o = this.getData(),
          s = this.coordinateSystem,
          l = s && s.getAxis(r);
        if (!s || !l) return [];
        var u = l.dataToCoord(i);
        a == null && (a = 1 / 0);
        var f = [],
          h = 1 / 0,
          v = -1,
          c = 0;
        return (
          o.each(n, function (d, p) {
            var m = l.dataToCoord(d),
              g = u - m,
              y = Math.abs(g);
            y <= a &&
              ((y < h || (y === h && g >= 0 && v < 0)) &&
                ((h = y), (v = g), (c = 0)),
              g === v && (f[c++] = p));
          }),
          (f.length = c),
          f
        );
      }),
      (t.prototype.formatTooltip = function (r, n, i) {
        return cC({ series: this, dataIndex: r, multipleSeries: n });
      }),
      (t.prototype.isAnimationEnabled = function () {
        var r = this.ecModel;
        if (tt.node && !(r && r.ssr)) return !1;
        var n = this.getShallow("animation");
        return (
          n &&
            this.getData().count() > this.getShallow("animationThreshold") &&
            (n = !1),
          !!n
        );
      }),
      (t.prototype.restoreData = function () {
        this.dataTask.dirty();
      }),
      (t.prototype.getColorFromPalette = function (r, n, i) {
        var a = this.ecModel,
          o = uc.prototype.getColorFromPalette.call(this, r, n, i);
        return (o || (o = a.getColorFromPalette(r, n, i)), o);
      }),
      (t.prototype.coordDimToDataDim = function (r) {
        return this.getRawData().mapDimensionsAll(r);
      }),
      (t.prototype.getProgressive = function () {
        return this.get("progressive");
      }),
      (t.prototype.getProgressiveThreshold = function () {
        return this.get("progressiveThreshold");
      }),
      (t.prototype.select = function (r, n) {
        this._innerSelect(this.getData(n), r);
      }),
      (t.prototype.unselect = function (r, n) {
        var i = this.option.selectedMap;
        if (i) {
          var a = this.option.selectedMode,
            o = this.getData(n);
          if (a === "series" || i === "all") {
            ((this.option.selectedMap = {}),
              (this._selectedDataIndicesMap = {}));
            return;
          }
          for (var s = 0; s < r.length; s++) {
            var l = r[s],
              u = go(o, l);
            ((i[u] = !1), (this._selectedDataIndicesMap[u] = -1));
          }
        }
      }),
      (t.prototype.toggleSelect = function (r, n) {
        for (var i = [], a = 0; a < r.length; a++)
          ((i[0] = r[a]),
            this.isSelected(r[a], n) ? this.unselect(i, n) : this.select(i, n));
      }),
      (t.prototype.getSelectedDataIndices = function () {
        if (this.option.selectedMap === "all")
          return [].slice.call(this.getData().getIndices());
        for (
          var r = this._selectedDataIndicesMap, n = yt(r), i = [], a = 0;
          a < n.length;
          a++
        ) {
          var o = r[n[a]];
          o >= 0 && i.push(o);
        }
        return i;
      }),
      (t.prototype.isSelected = function (r, n) {
        var i = this.option.selectedMap;
        if (!i) return !1;
        var a = this.getData(n);
        return (
          (i === "all" || i[go(a, r)]) &&
          !a.getItemModel(r).get(["select", "disabled"])
        );
      }),
      (t.prototype.isUniversalTransitionEnabled = function () {
        if (this[dC]) return !0;
        var r = this.option.universalTransition;
        return r ? (r === !0 ? !0 : r && r.enabled) : !1;
      }),
      (t.prototype._innerSelect = function (r, n) {
        var i,
          a,
          o = this.option,
          s = o.selectedMode,
          l = n.length;
        if (!(!s || !l)) {
          if (s === "series") o.selectedMap = "all";
          else if (s === "multiple") {
            X(o.selectedMap) || (o.selectedMap = {});
            for (var u = o.selectedMap, f = 0; f < l; f++) {
              var h = n[f],
                v = go(r, h);
              ((u[v] = !0),
                (this._selectedDataIndicesMap[v] = r.getRawIndex(h)));
            }
          } else if (s === "single" || s === !0) {
            var c = n[l - 1],
              v = go(r, c);
            ((o.selectedMap = ((i = {}), (i[v] = !0), i)),
              (this._selectedDataIndicesMap =
                ((a = {}), (a[v] = r.getRawIndex(c)), a)));
          }
        }
      }),
      (t.prototype._initSelectedMapFromData = function (r) {
        if (!this.option.selectedMap) {
          var n = [];
          (r.hasItemOption &&
            r.each(function (i) {
              var a = r.getRawDataItem(i);
              a && a.selected && n.push(i);
            }),
            n.length > 0 && this._innerSelect(r, n));
        }
      }),
      (t.registerClass = function (r) {
        return ht.registerClass(r);
      }),
      (t.protoInitialize = (function () {
        var r = t.prototype;
        ((r.type = "series.__base__"),
          (r.seriesIndex = 0),
          (r.ignoreStyleOnData = !1),
          (r.hasSymbolVisual = !1),
          (r.defaultSymbol = "circle"),
          (r.visualStyleAccessPath = "itemStyle"),
          (r.visualDrawType = "fill"));
      })()),
      t
    );
  })(ht);
tr(Pe, UT);
tr(Pe, uc);
Hg(Pe, ht);
function pd(e) {
  var t = e.name;
  Lh(e) || (e.name = pC(e) || t);
}
function pC(e) {
  var t = e.getRawData(),
    r = t.mapDimensionsAll("seriesName"),
    n = [];
  return (
    M(r, function (i) {
      var a = t.getDimensionInfo(i);
      a.displayName && n.push(a.displayName);
    }),
    n.join(" ")
  );
}
function gC(e) {
  return e.model.getRawData().count();
}
function mC(e) {
  var t = e.model;
  return (t.setData(t.getRawData().cloneShallow()), yC);
}
function yC(e, t) {
  t.outputData &&
    e.end > t.outputData.count() &&
    t.model.getRawData().cloneShallow(t.outputData);
}
function gd(e, t) {
  M(O1(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function (r) {
    e.wrapMethod(r, Mt(_C, t));
  });
}
function _C(e, t) {
  var r = Rf(e);
  return (r && r.setOutputEnd((t || this).count()), t);
}
function Rf(e) {
  var t = (e.ecModel || {}).scheduler,
    r = t && t.getPipeline(e.uid);
  if (r) {
    var n = r.currentTask;
    if (n) {
      var i = n.agentStubMap;
      i && (n = i.get(e.uid));
    }
    return n;
  }
}
var bC = pt.extend({
    type: "triangle",
    shape: { cx: 0, cy: 0, width: 0, height: 0 },
    buildPath: function (e, t) {
      var r = t.cx,
        n = t.cy,
        i = t.width / 2,
        a = t.height / 2;
      (e.moveTo(r, n - a),
        e.lineTo(r + i, n + a),
        e.lineTo(r - i, n + a),
        e.closePath());
    },
  }),
  SC = pt.extend({
    type: "diamond",
    shape: { cx: 0, cy: 0, width: 0, height: 0 },
    buildPath: function (e, t) {
      var r = t.cx,
        n = t.cy,
        i = t.width / 2,
        a = t.height / 2;
      (e.moveTo(r, n - a),
        e.lineTo(r + i, n),
        e.lineTo(r, n + a),
        e.lineTo(r - i, n),
        e.closePath());
    },
  }),
  wC = pt.extend({
    type: "pin",
    shape: { x: 0, y: 0, width: 0, height: 0 },
    buildPath: function (e, t) {
      var r = t.x,
        n = t.y,
        i = (t.width / 5) * 3,
        a = Math.max(i, t.height),
        o = i / 2,
        s = (o * o) / (a - o),
        l = n - a + o + s,
        u = Math.asin(s / o),
        f = Math.cos(u) * o,
        h = Math.sin(u),
        v = Math.cos(u),
        c = o * 0.6,
        d = o * 0.7;
      (e.moveTo(r - f, l + s),
        e.arc(r, l, o, Math.PI - u, Math.PI * 2 + u),
        e.bezierCurveTo(r + f - h * c, l + s + v * c, r, n - d, r, n),
        e.bezierCurveTo(r, n - d, r - f + h * c, l + s + v * c, r - f, l + s),
        e.closePath());
    },
  }),
  xC = pt.extend({
    type: "arrow",
    shape: { x: 0, y: 0, width: 0, height: 0 },
    buildPath: function (e, t) {
      var r = t.height,
        n = t.width,
        i = t.x,
        a = t.y,
        o = (n / 3) * 2;
      (e.moveTo(i, a),
        e.lineTo(i + o, a + r),
        e.lineTo(i, a + (r / 4) * 3),
        e.lineTo(i - o, a + r),
        e.lineTo(i, a),
        e.closePath());
    },
  }),
  TC = {
    line: Gr,
    rect: Tt,
    roundRect: Tt,
    square: Tt,
    circle: Ks,
    diamond: SC,
    pin: wC,
    arrow: xC,
    triangle: bC,
  },
  CC = {
    line: function (e, t, r, n, i) {
      ((i.x1 = e), (i.y1 = t + n / 2), (i.x2 = e + r), (i.y2 = t + n / 2));
    },
    rect: function (e, t, r, n, i) {
      ((i.x = e), (i.y = t), (i.width = r), (i.height = n));
    },
    roundRect: function (e, t, r, n, i) {
      ((i.x = e),
        (i.y = t),
        (i.width = r),
        (i.height = n),
        (i.r = Math.min(r, n) / 4));
    },
    square: function (e, t, r, n, i) {
      var a = Math.min(r, n);
      ((i.x = e), (i.y = t), (i.width = a), (i.height = a));
    },
    circle: function (e, t, r, n, i) {
      ((i.cx = e + r / 2), (i.cy = t + n / 2), (i.r = Math.min(r, n) / 2));
    },
    diamond: function (e, t, r, n, i) {
      ((i.cx = e + r / 2), (i.cy = t + n / 2), (i.width = r), (i.height = n));
    },
    pin: function (e, t, r, n, i) {
      ((i.x = e + r / 2), (i.y = t + n / 2), (i.width = r), (i.height = n));
    },
    arrow: function (e, t, r, n, i) {
      ((i.x = e + r / 2), (i.y = t + n / 2), (i.width = r), (i.height = n));
    },
    triangle: function (e, t, r, n, i) {
      ((i.cx = e + r / 2), (i.cy = t + n / 2), (i.width = r), (i.height = n));
    },
  },
  Ef = {};
M(TC, function (e, t) {
  Ef[t] = new e();
});
var DC = pt.extend({
  type: "symbol",
  shape: { symbolType: "", x: 0, y: 0, width: 0, height: 0 },
  calculateTextPosition: function (e, t, r) {
    var n = Qo(e, t, r),
      i = this.shape;
    return (
      i &&
        i.symbolType === "pin" &&
        t.position === "inside" &&
        (n.y = r.y + r.height * 0.4),
      n
    );
  },
  buildPath: function (e, t, r) {
    var n = t.symbolType;
    if (n !== "none") {
      var i = Ef[n];
      (i || ((n = "rect"), (i = Ef[n])),
        CC[n](t.x, t.y, t.width, t.height, i.shape),
        i.buildPath(e, i.shape, r));
    }
  },
});
function MC(e, t) {
  if (this.type !== "image") {
    var r = this.style;
    (this.__isEmptyBrush
      ? ((r.stroke = e), (r.fill = t || Y.color.neutral00), (r.lineWidth = 2))
      : this.shape.symbolType === "line"
        ? (r.stroke = e)
        : (r.fill = e),
      this.markRedraw());
  }
}
function gi(e, t, r, n, i, a, o) {
  var s = e.indexOf("empty") === 0;
  s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
  var l;
  return (
    e.indexOf("image://") === 0
      ? (l = zm(e.slice(8), new et(t, r, n, i), o ? "center" : "cover"))
      : e.indexOf("path://") === 0
        ? (l = Vh(e.slice(7), {}, new et(t, r, n, i), o ? "center" : "cover"))
        : (l = new DC({
            shape: { symbolType: e, x: t, y: r, width: n, height: i },
          })),
    (l.__isEmptyBrush = s),
    (l.setColor = MC),
    a && l.setColor(a),
    l
  );
}
function AC(e) {
  return (W(e) || (e = [+e, +e]), [e[0] || 0, e[1] || 0]);
}
function Fy(e, t) {
  if (e != null)
    return (
      W(e) || (e = [e, e]),
      [mt(e[0], t[0]) || 0, mt(K(e[1], e[0]), t[1]) || 0]
    );
}
var LC = (function (e) {
  G(t, e);
  function t() {
    var r = (e !== null && e.apply(this, arguments)) || this;
    return ((r.type = t.type), (r.hasSymbolVisual = !0), r);
  }
  return (
    (t.prototype.getInitialData = function (r) {
      return jh(null, this, { useEncodeDefaulter: !0 });
    }),
    (t.prototype.getLegendIcon = function (r) {
      var n = new Et(),
        i = gi(
          "line",
          0,
          r.itemHeight / 2,
          r.itemWidth,
          0,
          r.lineStyle.stroke,
          !1,
        );
      (n.add(i), i.setStyle(r.lineStyle));
      var a = this.getData().getVisual("symbol"),
        o = this.getData().getVisual("symbolRotate"),
        s = a === "none" ? "circle" : a,
        l = r.itemHeight * 0.8,
        u = gi(
          s,
          (r.itemWidth - l) / 2,
          (r.itemHeight - l) / 2,
          l,
          l,
          r.itemStyle.fill,
        );
      (n.add(u), u.setStyle(r.itemStyle));
      var f = r.iconRotate === "inherit" ? o : r.iconRotate || 0;
      return (
        (u.rotation = (f * Math.PI) / 180),
        u.setOrigin([r.itemWidth / 2, r.itemHeight / 2]),
        s.indexOf("empty") > -1 &&
          ((u.style.stroke = u.style.fill),
          (u.style.fill = Y.color.neutral00),
          (u.style.lineWidth = 2)),
        n
      );
    }),
    (t.type = "series.line"),
    (t.dependencies = ["grid", "polar"]),
    (t.defaultOption = {
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      clip: !0,
      label: { position: "top" },
      endLabel: { show: !1, valueAnimation: !0, distance: 8 },
      lineStyle: { width: 2, type: "solid" },
      emphasis: { scale: !0 },
      step: !1,
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 6,
      symbolRotate: null,
      showSymbol: !0,
      showAllSymbol: "auto",
      connectNulls: !1,
      sampling: "none",
      animationEasing: "linear",
      progressive: 0,
      hoverLayerThreshold: 1 / 0,
      universalTransition: { divideShape: "clone" },
      triggerLineEvent: !1,
    }),
    t
  );
})(Pe);
function hc(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel"),
    n = r.length;
  if (n === 1) {
    var i = di(e, t, r[0]);
    return i != null ? i + "" : null;
  } else if (n) {
    for (var a = [], o = 0; o < r.length; o++) a.push(di(e, t, r[o]));
    return a.join(" ");
  }
}
function zy(e, t) {
  var r = e.mapDimensionsAll("defaultedLabel");
  if (!W(t)) return t + "";
  for (var n = [], i = 0; i < r.length; i++) {
    var a = e.getDimensionIndex(r[i]);
    a >= 0 && n.push(t[a]);
  }
  return n.join(" ");
}
var cc = (function (e) {
  G(t, e);
  function t(r, n, i, a) {
    var o = e.call(this) || this;
    return (o.updateData(r, n, i, a), o);
  }
  return (
    (t.prototype._createSymbol = function (r, n, i, a, o, s) {
      this.removeAll();
      var l = gi(r, -1, -1, 2, 2, null, s);
      (l.attr({
        z2: K(o, 100),
        culling: !0,
        scaleX: a[0] / 2,
        scaleY: a[1] / 2,
      }),
        (l.drift = IC),
        (this._symbolType = r),
        this.add(l));
    }),
    (t.prototype.stopSymbolAnimation = function (r) {
      this.childAt(0).stopAnimation(null, r);
    }),
    (t.prototype.getSymbolType = function () {
      return this._symbolType;
    }),
    (t.prototype.getSymbolPath = function () {
      return this.childAt(0);
    }),
    (t.prototype.highlight = function () {
      hs(this.childAt(0));
    }),
    (t.prototype.downplay = function () {
      cs(this.childAt(0));
    }),
    (t.prototype.setZ = function (r, n) {
      var i = this.childAt(0);
      ((i.zlevel = r), (i.z = n));
    }),
    (t.prototype.setDraggable = function (r, n) {
      var i = this.childAt(0);
      ((i.draggable = r), (i.cursor = !n && r ? "move" : i.cursor));
    }),
    (t.prototype.updateData = function (r, n, i, a) {
      this.silent = !1;
      var o = r.getItemVisual(n, "symbol") || "circle",
        s = r.hostModel,
        l = t.getSymbolSize(r, n),
        u = t.getSymbolZ2(r, n),
        f = o !== this._symbolType,
        h = a && a.disableAnimation;
      if (f) {
        var v = r.getItemVisual(n, "symbolKeepAspect");
        this._createSymbol(o, r, n, l, u, v);
      } else {
        var c = this.childAt(0);
        c.silent = !1;
        var d = { scaleX: l[0] / 2, scaleY: l[1] / 2 };
        (h ? c.attr(d) : jt(c, d, s, n), Hh(c));
      }
      if ((this._updateCommon(r, n, l, i, a), f)) {
        var c = this.childAt(0);
        if (!h) {
          var d = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: { opacity: c.style.opacity },
          };
          ((c.scaleX = c.scaleY = 0), (c.style.opacity = 0), we(c, d, s, n));
        }
      }
      h && this.childAt(0).stopAnimation("leave");
    }),
    (t.prototype._updateCommon = function (r, n, i, a, o) {
      var s = this.childAt(0),
        l = r.hostModel,
        u,
        f,
        h,
        v,
        c,
        d,
        p,
        m,
        g;
      if (
        (a &&
          ((u = a.emphasisItemStyle),
          (f = a.blurItemStyle),
          (h = a.selectItemStyle),
          (v = a.focus),
          (c = a.blurScope),
          (p = a.labelStatesModels),
          (m = a.hoverScale),
          (g = a.cursorStyle),
          (d = a.emphasisDisabled)),
        !a || r.hasItemOption)
      ) {
        var y = a && a.itemModel ? a.itemModel : r.getItemModel(n),
          _ = y.getModel("emphasis");
        ((u = _.getModel("itemStyle").getItemStyle()),
          (h = y.getModel(["select", "itemStyle"]).getItemStyle()),
          (f = y.getModel(["blur", "itemStyle"]).getItemStyle()),
          (v = _.get("focus")),
          (c = _.get("blurScope")),
          (d = _.get("disabled")),
          (p = za(y)),
          (m = _.getShallow("scale")),
          (g = y.getShallow("cursor")));
      }
      var b = r.getItemVisual(n, "symbolRotate");
      s.attr("rotation", ((b || 0) * Math.PI) / 180 || 0);
      var w = Fy(r.getItemVisual(n, "symbolOffset"), i);
      (w && ((s.x = w[0]), (s.y = w[1])), g && s.attr("cursor", g));
      var S = r.getItemVisual(n, "style"),
        x = S.fill;
      if (s instanceof Yr) {
        var T = s.style;
        s.useStyle(
          B(
            {
              image: T.image,
              x: T.x,
              y: T.y,
              width: T.width,
              height: T.height,
            },
            S,
          ),
        );
      } else
        (s.__isEmptyBrush ? s.useStyle(B({}, S)) : s.useStyle(S),
          (s.style.decal = null),
          s.setColor(x, o && o.symbolInnerColor),
          (s.style.strokeNoScale = !0));
      var D = r.getItemVisual(n, "liftZ"),
        A = this._z2;
      D != null
        ? A == null && ((this._z2 = s.z2), (s.z2 += D))
        : A != null && ((s.z2 = A), (this._z2 = null));
      var C = o && o.useNameLabel;
      Fa(s, p, {
        labelFetcher: l,
        labelDataIndex: n,
        defaultText: I,
        inheritColor: x,
        defaultOpacity: S.opacity,
      });
      function I(k) {
        return C ? r.getName(k) : hc(r, k);
      }
      ((this._sizeX = i[0] / 2), (this._sizeY = i[1] / 2));
      var L = s.ensureState("emphasis");
      ((L.style = u),
        (s.ensureState("select").style = h),
        (s.ensureState("blur").style = f));
      var P =
        m == null || m === !0
          ? Math.max(1.1, 3 / this._sizeY)
          : isFinite(m) && m > 0
            ? +m
            : 1;
      ((L.scaleX = this._sizeX * P),
        (L.scaleY = this._sizeY * P),
        this.setSymbolScale(1),
        _a(this, v, c, d));
    }),
    (t.prototype.setSymbolScale = function (r) {
      this.scaleX = this.scaleY = r;
    }),
    (t.prototype.fadeOut = function (r, n, i) {
      var a = this.childAt(0),
        o = ot(this).dataIndex,
        s = i && i.animation;
      if (((this.silent = a.silent = !0), i && i.fadeLabel)) {
        var l = a.getTextContent();
        l &&
          ds(l, { style: { opacity: 0 } }, n, {
            dataIndex: o,
            removeOpt: s,
            cb: function () {
              a.removeTextContent();
            },
          });
      } else a.removeTextContent();
      ds(a, { style: { opacity: 0 }, scaleX: 0, scaleY: 0 }, n, {
        dataIndex: o,
        cb: r,
        removeOpt: s,
      });
    }),
    (t.getSymbolSize = function (r, n) {
      return AC(r.getItemVisual(n, "symbolSize"));
    }),
    (t.getSymbolZ2 = function (r, n) {
      return r.getItemVisual(n, "z2");
    }),
    t
  );
})(Et);
function IC(e, t) {
  this.parent.drift(e, t);
}
function au(e, t, r, n) {
  return (
    t &&
    !isNaN(t[0]) &&
    !isNaN(t[1]) &&
    !(n.isIgnore && n.isIgnore(r)) &&
    !(n.clipShape && !n.clipShape.contain(t[0], t[1])) &&
    e.getItemVisual(r, "symbol") !== "none"
  );
}
function md(e) {
  return (e != null && !X(e) && (e = { isIgnore: e }), e || {});
}
function yd(e) {
  var t = e.hostModel,
    r = t.getModel("emphasis");
  return {
    emphasisItemStyle: r.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: r.get("focus"),
    blurScope: r.get("blurScope"),
    emphasisDisabled: r.get("disabled"),
    hoverScale: r.get("scale"),
    labelStatesModels: za(t),
    cursorStyle: t.get("cursor"),
  };
}
var PC = (function () {
  function e(t) {
    ((this.group = new Et()), (this._SymbolCtor = t || cc));
  }
  return (
    (e.prototype.updateData = function (t, r) {
      ((this._progressiveEls = null), (r = md(r)));
      var n = this.group,
        i = t.hostModel,
        a = this._data,
        o = this._SymbolCtor,
        s = r.disableAnimation,
        l = yd(t),
        u = { disableAnimation: s },
        f =
          r.getSymbolPoint ||
          function (h) {
            return t.getItemLayout(h);
          };
      (a || n.removeAll(),
        t
          .diff(a)
          .add(function (h) {
            var v = f(h);
            if (au(t, v, h, r)) {
              var c = new o(t, h, l, u);
              (c.setPosition(v), t.setItemGraphicEl(h, c), n.add(c));
            }
          })
          .update(function (h, v) {
            var c = a.getItemGraphicEl(v),
              d = f(h);
            if (!au(t, d, h, r)) {
              n.remove(c);
              return;
            }
            var p = t.getItemVisual(h, "symbol") || "circle",
              m = c && c.getSymbolType && c.getSymbolType();
            if (!c || (m && m !== p))
              (n.remove(c), (c = new o(t, h, l, u)), c.setPosition(d));
            else {
              c.updateData(t, h, l, u);
              var g = { x: d[0], y: d[1] };
              s ? c.attr(g) : jt(c, g, i);
            }
            (n.add(c), t.setItemGraphicEl(h, c));
          })
          .remove(function (h) {
            var v = a.getItemGraphicEl(h);
            v &&
              v.fadeOut(function () {
                n.remove(v);
              }, i);
          })
          .execute(),
        (this._getSymbolPoint = f),
        (this._data = t));
    }),
    (e.prototype.updateLayout = function () {
      var t = this,
        r = this._data;
      r &&
        r.eachItemGraphicEl(function (n, i) {
          var a = t._getSymbolPoint(i);
          (n.setPosition(a), n.markRedraw());
        });
    }),
    (e.prototype.incrementalPrepareUpdate = function (t) {
      ((this._seriesScope = yd(t)),
        (this._data = null),
        this.group.removeAll());
    }),
    (e.prototype.incrementalUpdate = function (t, r, n) {
      ((this._progressiveEls = []), (n = md(n)));
      function i(l) {
        l.isGroup ||
          ((l.incremental = !0), (l.ensureState("emphasis").hoverLayer = !0));
      }
      for (var a = t.start; a < t.end; a++) {
        var o = r.getItemLayout(a);
        if (au(r, o, a, n)) {
          var s = new this._SymbolCtor(r, a, this._seriesScope);
          (s.traverse(i),
            s.setPosition(o),
            this.group.add(s),
            r.setItemGraphicEl(a, s),
            this._progressiveEls.push(s));
        }
      }
    }),
    (e.prototype.eachRendered = function (t) {
      Js(this._progressiveEls || this.group, t);
    }),
    (e.prototype.remove = function (t) {
      var r = this.group,
        n = this._data;
      n && t
        ? n.eachItemGraphicEl(function (i) {
            i.fadeOut(function () {
              r.remove(i);
            }, n.hostModel);
          })
        : r.removeAll();
    }),
    e
  );
})();
function Gy(e, t, r) {
  var n = e.getBaseAxis(),
    i = e.getOtherAxis(n),
    a = kC(i, r),
    o = n.dim,
    s = i.dim,
    l = t.mapDimension(s),
    u = t.mapDimension(o),
    f = s === "x" || s === "radius" ? 1 : 0,
    h = q(e.dimensions, function (d) {
      return t.mapDimension(d);
    }),
    v = !1,
    c = t.getCalculationInfo("stackResultDimension");
  return (
    pi(t, h[0]) && ((v = !0), (h[0] = c)),
    pi(t, h[1]) && ((v = !0), (h[1] = c)),
    {
      dataDimsForPoint: h,
      valueStart: a,
      valueAxisDim: s,
      baseAxisDim: o,
      stacked: !!v,
      valueDim: l,
      baseDim: u,
      baseDataOffset: f,
      stackedOverDimension: t.getCalculationInfo("stackedOverDimension"),
    }
  );
}
function kC(e, t) {
  var r = 0,
    n = e.scale.getExtent();
  return (
    t === "start"
      ? (r = n[0])
      : t === "end"
        ? (r = n[1])
        : vt(t) && !isNaN(t)
          ? (r = t)
          : n[0] > 0
            ? (r = n[0])
            : n[1] < 0 && (r = n[1]),
    r
  );
}
function Hy(e, t, r, n) {
  var i = NaN;
  (e.stacked && (i = r.get(r.getCalculationInfo("stackedOverDimension"), n)),
    isNaN(i) && (i = e.valueStart));
  var a = e.baseDataOffset,
    o = [];
  return ((o[a] = r.get(e.baseDim, n)), (o[1 - a] = i), t.dataToPoint(o));
}
var Vy = typeof Float32Array < "u",
  RC = Vy ? Float32Array : Array;
function fr(e) {
  return W(e) ? (Vy ? new Float32Array(e) : e) : new RC(e);
}
function EC(e, t) {
  var r = [];
  return (
    t
      .diff(e)
      .add(function (n) {
        r.push({ cmd: "+", idx: n });
      })
      .update(function (n, i) {
        r.push({ cmd: "=", idx: i, idx1: n });
      })
      .remove(function (n) {
        r.push({ cmd: "-", idx: n });
      })
      .execute(),
    r
  );
}
function OC(e, t, r, n, i, a, o, s) {
  for (
    var l = EC(e, t),
      u = [],
      f = [],
      h = [],
      v = [],
      c = [],
      d = [],
      p = [],
      m = Gy(i, t, o),
      g = e.getLayout("points") || [],
      y = t.getLayout("points") || [],
      _ = 0;
    _ < l.length;
    _++
  ) {
    var b = l[_],
      w = !0,
      S = void 0,
      x = void 0;
    switch (b.cmd) {
      case "=":
        ((S = b.idx * 2), (x = b.idx1 * 2));
        var T = g[S],
          D = g[S + 1],
          A = y[x],
          C = y[x + 1];
        ((isNaN(T) || isNaN(D)) && ((T = A), (D = C)),
          u.push(T, D),
          f.push(A, C),
          h.push(r[S], r[S + 1]),
          v.push(n[x], n[x + 1]),
          p.push(t.getRawIndex(b.idx1)));
        break;
      case "+":
        var I = b.idx,
          L = m.dataDimsForPoint,
          P = i.dataToPoint([t.get(L[0], I), t.get(L[1], I)]);
        ((x = I * 2), u.push(P[0], P[1]), f.push(y[x], y[x + 1]));
        var k = Hy(m, i, t, I);
        (h.push(k[0], k[1]), v.push(n[x], n[x + 1]), p.push(t.getRawIndex(I)));
        break;
      case "-":
        w = !1;
    }
    w && (c.push(b), d.push(d.length));
  }
  d.sort(function (ft, Ot) {
    return p[ft] - p[Ot];
  });
  for (
    var E = u.length, V = fr(E), R = fr(E), O = fr(E), z = fr(E), F = [], _ = 0;
    _ < d.length;
    _++
  ) {
    var N = d[_],
      $ = _ * 2,
      nt = N * 2;
    ((V[$] = u[nt]),
      (V[$ + 1] = u[nt + 1]),
      (R[$] = f[nt]),
      (R[$ + 1] = f[nt + 1]),
      (O[$] = h[nt]),
      (O[$ + 1] = h[nt + 1]),
      (z[$] = v[nt]),
      (z[$ + 1] = v[nt + 1]),
      (F[_] = c[N]));
  }
  return {
    current: V,
    next: R,
    stackedOnCurrent: O,
    stackedOnNext: z,
    status: F,
  };
}
var wr = Math.min,
  xr = Math.max;
function Pn(e, t) {
  return isNaN(e) || isNaN(t);
}
function Of(e, t, r, n, i, a, o, s, l) {
  for (var u, f, h, v, c, d, p = r, m = 0; m < n; m++) {
    var g = t[p * 2],
      y = t[p * 2 + 1];
    if (p >= i || p < 0) break;
    if (Pn(g, y)) {
      if (l) {
        p += a;
        continue;
      }
      break;
    }
    if (p === r) (e[a > 0 ? "moveTo" : "lineTo"](g, y), (h = g), (v = y));
    else {
      var _ = g - u,
        b = y - f;
      if (_ * _ + b * b < 0.5) {
        p += a;
        continue;
      }
      if (o > 0) {
        for (
          var w = p + a, S = t[w * 2], x = t[w * 2 + 1];
          S === g && x === y && m < n;

        )
          (m++,
            (w += a),
            (p += a),
            (S = t[w * 2]),
            (x = t[w * 2 + 1]),
            (g = t[p * 2]),
            (y = t[p * 2 + 1]),
            (_ = g - u),
            (b = y - f));
        var T = m + 1;
        if (l)
          for (; Pn(S, x) && T < n; )
            (T++, (w += a), (S = t[w * 2]), (x = t[w * 2 + 1]));
        var D = 0.5,
          A = 0,
          C = 0,
          I = void 0,
          L = void 0;
        if (T >= n || Pn(S, x)) ((c = g), (d = y));
        else {
          ((A = S - u), (C = x - f));
          var P = g - u,
            k = S - g,
            E = y - f,
            V = x - y,
            R = void 0,
            O = void 0;
          if (s === "x") {
            ((R = Math.abs(P)), (O = Math.abs(k)));
            var z = A > 0 ? 1 : -1;
            ((c = g - z * R * o), (d = y), (I = g + z * O * o), (L = y));
          } else if (s === "y") {
            ((R = Math.abs(E)), (O = Math.abs(V)));
            var F = C > 0 ? 1 : -1;
            ((c = g), (d = y - F * R * o), (I = g), (L = y + F * O * o));
          } else
            ((R = Math.sqrt(P * P + E * E)),
              (O = Math.sqrt(k * k + V * V)),
              (D = O / (O + R)),
              (c = g - A * o * (1 - D)),
              (d = y - C * o * (1 - D)),
              (I = g + A * o * D),
              (L = y + C * o * D),
              (I = wr(I, xr(S, g))),
              (L = wr(L, xr(x, y))),
              (I = xr(I, wr(S, g))),
              (L = xr(L, wr(x, y))),
              (A = I - g),
              (C = L - y),
              (c = g - (A * R) / O),
              (d = y - (C * R) / O),
              (c = wr(c, xr(u, g))),
              (d = wr(d, xr(f, y))),
              (c = xr(c, wr(u, g))),
              (d = xr(d, wr(f, y))),
              (A = g - c),
              (C = y - d),
              (I = g + (A * O) / R),
              (L = y + (C * O) / R));
        }
        (e.bezierCurveTo(h, v, c, d, g, y), (h = I), (v = L));
      } else e.lineTo(g, y);
    }
    ((u = g), (f = y), (p += a));
  }
  return m;
}
var Wy = (function () {
    function e() {
      ((this.smooth = 0), (this.smoothConstraint = !0));
    }
    return e;
  })(),
  BC = (function (e) {
    G(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return ((n.type = "ec-polyline"), n);
    }
    return (
      (t.prototype.getDefaultStyle = function () {
        return { stroke: Y.color.neutral99, fill: null };
      }),
      (t.prototype.getDefaultShape = function () {
        return new Wy();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i = n.points,
          a = 0,
          o = i.length / 2;
        if (n.connectNulls) {
          for (; o > 0 && Pn(i[o * 2 - 2], i[o * 2 - 1]); o--);
          for (; a < o && Pn(i[a * 2], i[a * 2 + 1]); a++);
        }
        for (; a < o; )
          a +=
            Of(r, i, a, o, o, 1, n.smooth, n.smoothMonotone, n.connectNulls) +
            1;
      }),
      (t.prototype.getPointOn = function (r, n) {
        this.path ||
          (this.createPathProxy(), this.buildPath(this.path, this.shape));
        for (
          var i = this.path,
            a = i.data,
            o = kn.CMD,
            s,
            l,
            u = n === "x",
            f = [],
            h = 0;
          h < a.length;

        ) {
          var v = a[h++],
            c = void 0,
            d = void 0,
            p = void 0,
            m = void 0,
            g = void 0,
            y = void 0,
            _ = void 0;
          switch (v) {
            case o.M:
              ((s = a[h++]), (l = a[h++]));
              break;
            case o.L:
              if (
                ((c = a[h++]),
                (d = a[h++]),
                (_ = u ? (r - s) / (c - s) : (r - l) / (d - l)),
                _ <= 1 && _ >= 0)
              ) {
                var b = u ? (d - l) * _ + l : (c - s) * _ + s;
                return u ? [r, b] : [b, r];
              }
              ((s = c), (l = d));
              break;
            case o.C:
              ((c = a[h++]),
                (d = a[h++]),
                (p = a[h++]),
                (m = a[h++]),
                (g = a[h++]),
                (y = a[h++]));
              var w = u ? ts(s, c, p, g, r, f) : ts(l, d, m, y, r, f);
              if (w > 0)
                for (var S = 0; S < w; S++) {
                  var x = f[S];
                  if (x <= 1 && x >= 0) {
                    var b = u ? zt(l, d, m, y, x) : zt(s, c, p, g, x);
                    return u ? [r, b] : [b, r];
                  }
                }
              ((s = g), (l = y));
              break;
          }
        }
      }),
      t
    );
  })(pt),
  NC = (function (e) {
    G(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return t;
  })(Wy),
  FC = (function (e) {
    G(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return ((n.type = "ec-polygon"), n);
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new NC();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i = n.points,
          a = n.stackedOnPoints,
          o = 0,
          s = i.length / 2,
          l = n.smoothMonotone;
        if (n.connectNulls) {
          for (; s > 0 && Pn(i[s * 2 - 2], i[s * 2 - 1]); s--);
          for (; o < s && Pn(i[o * 2], i[o * 2 + 1]); o++);
        }
        for (; o < s; ) {
          var u = Of(r, i, o, s, s, 1, n.smooth, l, n.connectNulls);
          (Of(r, a, o + u - 1, u, s, -1, n.stackedOnSmooth, l, n.connectNulls),
            (o += u + 1),
            r.closePath());
        }
      }),
      t
    );
  })(pt);
function vc() {
  var e = _t();
  return function (t) {
    var r = e(t),
      n = t.pipelineContext,
      i = !!r.large,
      a = !!r.progressiveRender,
      o = (r.large = !!(n && n.large)),
      s = (r.progressiveRender = !!(n && n.progressiveRender));
    return (i !== o || a !== s) && "reset";
  };
}
var Uy = _t(),
  zC = vc(),
  xe = (function () {
    function e() {
      ((this.group = new Et()),
        (this.uid = il("viewChart")),
        (this.renderTask = fa({ plan: GC, reset: HC })),
        (this.renderTask.context = { view: this }));
    }
    return (
      (e.prototype.init = function (t, r) {}),
      (e.prototype.render = function (t, r, n, i) {}),
      (e.prototype.highlight = function (t, r, n, i) {
        var a = t.getData(i && i.dataType);
        a && bd(a, i, "emphasis");
      }),
      (e.prototype.downplay = function (t, r, n, i) {
        var a = t.getData(i && i.dataType);
        a && bd(a, i, "normal");
      }),
      (e.prototype.remove = function (t, r) {
        this.group.removeAll();
      }),
      (e.prototype.dispose = function (t, r) {}),
      (e.prototype.updateView = function (t, r, n, i) {
        this.render(t, r, n, i);
      }),
      (e.prototype.updateLayout = function (t, r, n, i) {
        this.render(t, r, n, i);
      }),
      (e.prototype.updateVisual = function (t, r, n, i) {
        this.render(t, r, n, i);
      }),
      (e.prototype.eachRendered = function (t) {
        Js(this.group, t);
      }),
      (e.markUpdateMethod = function (t, r) {
        Uy(t).updateMethod = r;
      }),
      (e.protoInitialize = (function () {
        var t = e.prototype;
        t.type = "chart";
      })()),
      e
    );
  })();
function _d(e, t, r) {
  e && _f(e) && (t === "emphasis" ? hs : cs)(e, r);
}
function bd(e, t, r) {
  var n = Rn(e, t),
    i = t && t.highlightKey != null ? hw(t.highlightKey) : null;
  n != null
    ? M(Kt(n), function (a) {
        _d(e.getItemGraphicEl(a), r, i);
      })
    : e.eachItemGraphicEl(function (a) {
        _d(a, r, i);
      });
}
wh(xe);
Vs(xe);
function GC(e) {
  return zC(e.model);
}
function HC(e) {
  var t = e.model,
    r = e.ecModel,
    n = e.api,
    i = e.payload,
    a = t.pipelineContext.progressiveRender,
    o = e.view,
    s = i && Uy(i).updateMethod,
    l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
  return (l !== "render" && o[l](t, r, n, i), VC[l]);
}
var VC = {
  incrementalPrepareRender: {
    progress: function (e, t) {
      t.view.incrementalRender(e, t.model, t.ecModel, t.api, t.payload);
    },
  },
  render: {
    forceFirstProgress: !0,
    progress: function (e, t) {
      t.view.render(t.model, t.ecModel, t.api, t.payload);
    },
  },
};
function Yy(e, t, r, n, i) {
  var a = e.getArea(),
    o = a.x,
    s = a.y,
    l = a.width,
    u = a.height,
    f = r.get(["lineStyle", "width"]) || 0;
  ((o -= f / 2),
    (s -= f / 2),
    (l += f),
    (u += f),
    (l = Math.ceil(l)),
    o !== Math.floor(o) && ((o = Math.floor(o)), l++));
  var h = new Tt({ shape: { x: o, y: s, width: l, height: u } });
  if (t) {
    var v = e.getBaseAxis(),
      c = v.isHorizontal(),
      d = v.inverse;
    c
      ? (d && (h.shape.x += l), (h.shape.width = 0))
      : (d || (h.shape.y += u), (h.shape.height = 0));
    var p = Q(i)
      ? function (m) {
          i(m, h);
        }
      : null;
    we(h, { shape: { width: l, height: u, x: o, y: s } }, r, null, n, p);
  }
  return h;
}
function $y(e, t, r) {
  var n = e.getArea(),
    i = Gt(n.r0, 1),
    a = Gt(n.r, 1),
    o = new $r({
      shape: {
        cx: Gt(e.cx, 1),
        cy: Gt(e.cy, 1),
        r0: i,
        r: a,
        startAngle: n.startAngle,
        endAngle: n.endAngle,
        clockwise: n.clockwise,
      },
    });
  if (t) {
    var s = e.getBaseAxis().dim === "angle";
    (s ? (o.shape.endAngle = n.startAngle) : (o.shape.r = i),
      we(o, { shape: { endAngle: n.endAngle, r: a } }, r));
  }
  return o;
}
function WC(e, t, r, n, i) {
  if (e) {
    if (e.type === "polar") return $y(e, t, r);
    if (e.type === "cartesian2d") return Yy(e, t, r, n, i);
  } else return null;
  return null;
}
function dc(e, t) {
  return e.type === t;
}
function Sd(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++) if (e[r] !== t[r]) return;
    return !0;
  }
}
function wd(e) {
  for (
    var t = 1 / 0, r = 1 / 0, n = -1 / 0, i = -1 / 0, a = 0;
    a < e.length;

  ) {
    var o = e[a++],
      s = e[a++];
    (isNaN(o) || ((t = Math.min(o, t)), (n = Math.max(o, n))),
      isNaN(s) || ((r = Math.min(s, r)), (i = Math.max(s, i))));
  }
  return [
    [t, r],
    [n, i],
  ];
}
function xd(e, t) {
  var r = wd(e),
    n = r[0],
    i = r[1],
    a = wd(t),
    o = a[0],
    s = a[1];
  return Math.max(
    Math.abs(n[0] - o[0]),
    Math.abs(n[1] - o[1]),
    Math.abs(i[0] - s[0]),
    Math.abs(i[1] - s[1]),
  );
}
function Td(e) {
  return vt(e) ? e : e ? 0.5 : 0;
}
function UC(e, t, r) {
  if (!r.valueDim) return [];
  for (var n = t.count(), i = fr(n * 2), a = 0; a < n; a++) {
    var o = Hy(r, e, t, a);
    ((i[a * 2] = o[0]), (i[a * 2 + 1] = o[1]));
  }
  return i;
}
function Tr(e, t, r, n, i) {
  var a = r.getBaseAxis(),
    o = a.dim === "x" || a.dim === "radius" ? 0 : 1,
    s = [],
    l = 0,
    u = [],
    f = [],
    h = [],
    v = [];
  if (i) {
    for (l = 0; l < e.length; l += 2) {
      var c = t || e;
      !isNaN(c[l]) && !isNaN(c[l + 1]) && v.push(e[l], e[l + 1]);
    }
    e = v;
  }
  for (l = 0; l < e.length - 2; l += 2)
    switch (
      ((h[0] = e[l + 2]),
      (h[1] = e[l + 3]),
      (f[0] = e[l]),
      (f[1] = e[l + 1]),
      s.push(f[0], f[1]),
      n)
    ) {
      case "end":
        ((u[o] = h[o]), (u[1 - o] = f[1 - o]), s.push(u[0], u[1]));
        break;
      case "middle":
        var d = (f[o] + h[o]) / 2,
          p = [];
        ((u[o] = p[o] = d),
          (u[1 - o] = f[1 - o]),
          (p[1 - o] = h[1 - o]),
          s.push(u[0], u[1]),
          s.push(p[0], p[1]));
        break;
      default:
        ((u[o] = f[o]), (u[1 - o] = h[1 - o]), s.push(u[0], u[1]));
    }
  return (s.push(e[l++], e[l++]), s);
}
function YC(e, t) {
  var r = [],
    n = e.length,
    i,
    a;
  function o(f, h, v) {
    var c = f.coord,
      d = (v - c) / (h.coord - c),
      p = Ab(d, [f.color, h.color]);
    return { coord: v, color: p };
  }
  for (var s = 0; s < n; s++) {
    var l = e[s],
      u = l.coord;
    if (u < 0) i = l;
    else if (u > t) {
      a ? r.push(o(a, l, t)) : i && r.push(o(i, l, 0), o(i, l, t));
      break;
    } else (i && (r.push(o(i, l, 0)), (i = null)), r.push(l), (a = l));
  }
  return r;
}
function $C(e, t, r) {
  var n = e.getVisual("visualMeta");
  if (!(!n || !n.length || !e.count()) && t.type === "cartesian2d") {
    for (var i, a, o = n.length - 1; o >= 0; o--) {
      var s = e.getDimensionInfo(n[o].dimension);
      if (((i = s && s.coordDim), i === "x" || i === "y")) {
        a = n[o];
        break;
      }
    }
    if (a) {
      var l = t.getAxis(i),
        u = q(a.stops, function (_) {
          return {
            coord: l.toGlobalCoord(l.dataToCoord(_.value)),
            color: _.color,
          };
        }),
        f = u.length,
        h = a.outerColors.slice();
      f && u[0].coord > u[f - 1].coord && (u.reverse(), h.reverse());
      var v = YC(u, i === "x" ? r.getWidth() : r.getHeight()),
        c = v.length;
      if (!c && f)
        return u[0].coord < 0
          ? h[1]
            ? h[1]
            : u[f - 1].color
          : h[0]
            ? h[0]
            : u[0].color;
      var d = 10,
        p = v[0].coord - d,
        m = v[c - 1].coord + d,
        g = m - p;
      if (g < 0.001) return "transparent";
      (M(v, function (_) {
        _.offset = (_.coord - p) / g;
      }),
        v.push({
          offset: c ? v[c - 1].offset : 0.5,
          color: h[1] || "transparent",
        }),
        v.unshift({
          offset: c ? v[0].offset : 0.5,
          color: h[0] || "transparent",
        }));
      var y = new Nm(0, 0, 0, 0, v, !0);
      return ((y[i] = p), (y[i + "2"] = m), y);
    }
  }
}
function XC(e, t, r) {
  var n = e.get("showAllSymbol"),
    i = n === "auto";
  if (!(n && !i)) {
    var a = r.getAxesByScale("ordinal")[0];
    if (a && !(i && qC(a, t))) {
      var o = t.mapDimension(a.dim),
        s = {};
      return (
        M(a.getViewLabels(), function (l) {
          var u = a.scale.getRawOrdinalNumber(l.tickValue);
          s[u] = 1;
        }),
        function (l) {
          return !s.hasOwnProperty(t.get(o, l));
        }
      );
    }
  }
}
function qC(e, t) {
  var r = e.getExtent(),
    n = Math.abs(r[1] - r[0]) / e.scale.count();
  isNaN(n) && (n = 0);
  for (
    var i = t.count(), a = Math.max(1, Math.round(i / 5)), o = 0;
    o < i;
    o += a
  )
    if (cc.getSymbolSize(t, o)[e.isHorizontal() ? 1 : 0] * 1.5 > n) return !1;
  return !0;
}
function ZC(e, t) {
  return isNaN(e) || isNaN(t);
}
function KC(e) {
  for (var t = e.length / 2; t > 0 && ZC(e[t * 2 - 2], e[t * 2 - 1]); t--);
  return t - 1;
}
function Cd(e, t) {
  return [e[t * 2], e[t * 2 + 1]];
}
function jC(e, t, r) {
  for (
    var n = e.length / 2, i = r === "x" ? 0 : 1, a, o, s = 0, l = -1, u = 0;
    u < n;
    u++
  )
    if (((o = e[u * 2 + i]), !(isNaN(o) || isNaN(e[u * 2 + 1 - i])))) {
      if (u === 0) {
        a = o;
        continue;
      }
      if ((a <= t && o >= t) || (a >= t && o <= t)) {
        l = u;
        break;
      }
      ((s = u), (a = o));
    }
  return { range: [s, l], t: (t - a) / (o - a) };
}
function Xy(e) {
  if (e.get(["endLabel", "show"])) return !0;
  for (var t = 0; t < Te.length; t++)
    if (e.get([Te[t], "endLabel", "show"])) return !0;
  return !1;
}
function ou(e, t, r, n) {
  if (dc(t, "cartesian2d")) {
    var i = n.getModel("endLabel"),
      a = i.get("valueAnimation"),
      o = n.getData(),
      s = { lastFrameIndex: 0 },
      l = Xy(n)
        ? function (c, d) {
            e._endLabelOnDuring(c, d, o, s, a, i, t);
          }
        : null,
      u = t.getBaseAxis().isHorizontal(),
      f = Yy(
        t,
        r,
        n,
        function () {
          var c = e._endLabel;
          c &&
            r &&
            s.originalX != null &&
            c.attr({ x: s.originalX, y: s.originalY });
        },
        l,
      );
    if (!n.get("clip", !0)) {
      var h = f.shape,
        v = Math.max(h.width, h.height);
      u ? ((h.y -= v), (h.height += v * 2)) : ((h.x -= v), (h.width += v * 2));
    }
    return (l && l(1, f), f);
  } else return $y(t, r, n);
}
function QC(e, t) {
  var r = t.getBaseAxis(),
    n = r.isHorizontal(),
    i = r.inverse,
    a = n ? (i ? "right" : "left") : "center",
    o = n ? "middle" : i ? "top" : "bottom";
  return {
    normal: {
      align: e.get("align") || a,
      verticalAlign: e.get("verticalAlign") || o,
    },
  };
}
var JC = (function (e) {
  G(t, e);
  function t() {
    return (e !== null && e.apply(this, arguments)) || this;
  }
  return (
    (t.prototype.init = function () {
      var r = new Et(),
        n = new PC();
      (this.group.add(n.group),
        (this._symbolDraw = n),
        (this._lineGroup = r),
        (this._changePolyState = ct(this._changePolyState, this)));
    }),
    (t.prototype.render = function (r, n, i) {
      var a = r.coordinateSystem,
        o = this.group,
        s = r.getData(),
        l = r.getModel("lineStyle"),
        u = r.getModel("areaStyle"),
        f = s.getLayout("points") || [],
        h = a.type === "polar",
        v = this._coordSys,
        c = this._symbolDraw,
        d = this._polyline,
        p = this._polygon,
        m = this._lineGroup,
        g = !n.ssr && r.get("animation"),
        y = !u.isEmpty(),
        _ = u.get("origin"),
        b = Gy(a, s, _),
        w = y && UC(a, s, b),
        S = r.get("showSymbol"),
        x = r.get("connectNulls"),
        T = S && !h && XC(r, s, a),
        D = this._data;
      (D &&
        D.eachItemGraphicEl(function (ft, Ot) {
          ft.__temp && (o.remove(ft), D.setItemGraphicEl(Ot, null));
        }),
        S || c.remove(),
        o.add(m));
      var A = h ? !1 : r.get("step"),
        C;
      (a &&
        a.getArea &&
        r.get("clip", !0) &&
        ((C = a.getArea()),
        C.width != null
          ? ((C.x -= 0.1), (C.y -= 0.1), (C.width += 0.2), (C.height += 0.2))
          : C.r0 && ((C.r0 -= 0.5), (C.r += 0.5))),
        (this._clipShapeForSymbol = C));
      var I = $C(s, a, i) || s.getVisual("style")[s.getVisual("drawType")];
      if (!(d && v.type === a.type && A === this._step))
        (S &&
          c.updateData(s, {
            isIgnore: T,
            clipShape: C,
            disableAnimation: !0,
            getSymbolPoint: function (ft) {
              return [f[ft * 2], f[ft * 2 + 1]];
            },
          }),
          g && this._initSymbolLabelAnimation(s, a, C),
          A && (w && (w = Tr(w, f, a, A, x)), (f = Tr(f, null, a, A, x))),
          (d = this._newPolyline(f)),
          y
            ? (p = this._newPolygon(f, w))
            : p && (m.remove(p), (p = this._polygon = null)),
          h || this._initOrUpdateEndLabel(r, a, En(I)),
          m.setClipPath(ou(this, a, !0, r)));
      else {
        (y && !p
          ? (p = this._newPolygon(f, w))
          : p && !y && (m.remove(p), (p = this._polygon = null)),
          h || this._initOrUpdateEndLabel(r, a, En(I)));
        var L = m.getClipPath();
        if (L) {
          var P = ou(this, a, !1, r);
          we(L, { shape: P.shape }, r);
        } else m.setClipPath(ou(this, a, !0, r));
        (S &&
          c.updateData(s, {
            isIgnore: T,
            clipShape: C,
            disableAnimation: !0,
            getSymbolPoint: function (ft) {
              return [f[ft * 2], f[ft * 2 + 1]];
            },
          }),
          (!Sd(this._stackedOnPoints, w) || !Sd(this._points, f)) &&
            (g
              ? this._doUpdateAnimation(s, w, a, i, A, _, x)
              : (A &&
                  (w && (w = Tr(w, f, a, A, x)), (f = Tr(f, null, a, A, x))),
                d.setShape({ points: f }),
                p && p.setShape({ points: f, stackedOnPoints: w }))));
      }
      var k = r.getModel("emphasis"),
        E = k.get("focus"),
        V = k.get("blurScope"),
        R = k.get("disabled");
      if (
        (d.useStyle(
          dt(l.getLineStyle(), { fill: "none", stroke: I, lineJoin: "bevel" }),
        ),
        vs(d, r, "lineStyle"),
        d.style.lineWidth > 0 &&
          r.get(["emphasis", "lineStyle", "width"]) === "bolder")
      ) {
        var O = d.getState("emphasis").style;
        O.lineWidth = +d.style.lineWidth + 1;
      }
      ((ot(d).seriesIndex = r.seriesIndex), _a(d, E, V, R));
      var z = Td(r.get("smooth")),
        F = r.get("smoothMonotone");
      if ((d.setShape({ smooth: z, smoothMonotone: F, connectNulls: x }), p)) {
        var N = s.getCalculationInfo("stackedOnSeries"),
          $ = 0;
        (p.useStyle(
          dt(u.getAreaStyle(), {
            fill: I,
            opacity: 0.7,
            lineJoin: "bevel",
            decal: s.getVisual("style").decal,
          }),
        ),
          N && ($ = Td(N.get("smooth"))),
          p.setShape({
            smooth: z,
            stackedOnSmooth: $,
            smoothMonotone: F,
            connectNulls: x,
          }),
          vs(p, r, "areaStyle"),
          (ot(p).seriesIndex = r.seriesIndex),
          _a(p, E, V, R));
      }
      var nt = this._changePolyState;
      (s.eachItemGraphicEl(function (ft) {
        ft && (ft.onHoverStateChange = nt);
      }),
        (this._polyline.onHoverStateChange = nt),
        (this._data = s),
        (this._coordSys = a),
        (this._stackedOnPoints = w),
        (this._points = f),
        (this._step = A),
        (this._valueOrigin = _),
        r.get("triggerLineEvent") &&
          (this.packEventData(r, d), p && this.packEventData(r, p)));
    }),
    (t.prototype.packEventData = function (r, n) {
      ot(n).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: r.componentIndex,
        seriesIndex: r.seriesIndex,
        seriesName: r.name,
        seriesType: "line",
      };
    }),
    (t.prototype.highlight = function (r, n, i, a) {
      var o = r.getData(),
        s = Rn(o, a);
      if (
        (this._changePolyState("emphasis"),
        !(s instanceof Array) && s != null && s >= 0)
      ) {
        var l = o.getLayout("points"),
          u = o.getItemGraphicEl(s);
        if (!u) {
          var f = l[s * 2],
            h = l[s * 2 + 1];
          if (
            isNaN(f) ||
            isNaN(h) ||
            (this._clipShapeForSymbol &&
              !this._clipShapeForSymbol.contain(f, h))
          )
            return;
          var v = r.get("zlevel") || 0,
            c = r.get("z") || 0;
          ((u = new cc(o, s)), (u.x = f), (u.y = h), u.setZ(v, c));
          var d = u.getSymbolPath().getTextContent();
          (d && ((d.zlevel = v), (d.z = c), (d.z2 = this._polyline.z2 + 1)),
            (u.__temp = !0),
            o.setItemGraphicEl(s, u),
            u.stopSymbolAnimation(!0),
            this.group.add(u));
        }
        u.highlight();
      } else xe.prototype.highlight.call(this, r, n, i, a);
    }),
    (t.prototype.downplay = function (r, n, i, a) {
      var o = r.getData(),
        s = Rn(o, a);
      if ((this._changePolyState("normal"), s != null && s >= 0)) {
        var l = o.getItemGraphicEl(s);
        l &&
          (l.__temp
            ? (o.setItemGraphicEl(s, null), this.group.remove(l))
            : l.downplay());
      } else xe.prototype.downplay.call(this, r, n, i, a);
    }),
    (t.prototype._changePolyState = function (r) {
      var n = this._polygon;
      (Dv(this._polyline, r), n && Dv(n, r));
    }),
    (t.prototype._newPolyline = function (r) {
      var n = this._polyline;
      return (
        n && this._lineGroup.remove(n),
        (n = new BC({
          shape: { points: r },
          segmentIgnoreThreshold: 2,
          z2: 10,
        })),
        this._lineGroup.add(n),
        (this._polyline = n),
        n
      );
    }),
    (t.prototype._newPolygon = function (r, n) {
      var i = this._polygon;
      return (
        i && this._lineGroup.remove(i),
        (i = new FC({
          shape: { points: r, stackedOnPoints: n },
          segmentIgnoreThreshold: 2,
        })),
        this._lineGroup.add(i),
        (this._polygon = i),
        i
      );
    }),
    (t.prototype._initSymbolLabelAnimation = function (r, n, i) {
      var a,
        o,
        s = n.getBaseAxis(),
        l = s.inverse;
      n.type === "cartesian2d"
        ? ((a = s.isHorizontal()), (o = !1))
        : n.type === "polar" && ((a = s.dim === "angle"), (o = !0));
      var u = r.hostModel,
        f = u.get("animationDuration");
      Q(f) && (f = f(null));
      var h = u.get("animationDelay") || 0,
        v = Q(h) ? h(null) : h;
      r.eachItemGraphicEl(function (c, d) {
        var p = c;
        if (p) {
          var m = [c.x, c.y],
            g = void 0,
            y = void 0,
            _ = void 0;
          if (i)
            if (o) {
              var b = i,
                w = n.pointToCoord(m);
              a
                ? ((g = b.startAngle),
                  (y = b.endAngle),
                  (_ = (-w[1] / 180) * Math.PI))
                : ((g = b.r0), (y = b.r), (_ = w[0]));
            } else {
              var S = i;
              a
                ? ((g = S.x), (y = S.x + S.width), (_ = c.x))
                : ((g = S.y + S.height), (y = S.y), (_ = c.y));
            }
          var x = y === g ? 0 : (_ - g) / (y - g);
          l && (x = 1 - x);
          var T = Q(h) ? h(d) : f * x + v,
            D = p.getSymbolPath(),
            A = D.getTextContent();
          (p.attr({ scaleX: 0, scaleY: 0 }),
            p.animateTo(
              { scaleX: 1, scaleY: 1 },
              { duration: 200, setToFinal: !0, delay: T },
            ),
            A &&
              A.animateFrom(
                { style: { opacity: 0 } },
                { duration: 300, delay: T },
              ),
            (D.disableLabelAnimation = !0));
        }
      });
    }),
    (t.prototype._initOrUpdateEndLabel = function (r, n, i) {
      var a = r.getModel("endLabel");
      if (Xy(r)) {
        var o = r.getData(),
          s = this._polyline,
          l = o.getLayout("points");
        if (!l) {
          (s.removeTextContent(), (this._endLabel = null));
          return;
        }
        var u = this._endLabel;
        u ||
          ((u = this._endLabel = new Ht({ z2: 200 })),
          (u.ignoreClip = !0),
          s.setTextContent(this._endLabel),
          (s.disableLabelAnimation = !0));
        var f = KC(l);
        f >= 0 &&
          (Fa(
            s,
            za(r, "endLabel"),
            {
              inheritColor: i,
              labelFetcher: r,
              labelDataIndex: f,
              defaultText: function (h, v, c) {
                return c != null ? zy(o, c) : hc(o, h);
              },
              enableTextSetter: !0,
            },
            QC(a, n),
          ),
          (s.textConfig.position = null));
      } else
        this._endLabel &&
          (this._polyline.removeTextContent(), (this._endLabel = null));
    }),
    (t.prototype._endLabelOnDuring = function (r, n, i, a, o, s, l) {
      var u = this._endLabel,
        f = this._polyline;
      if (u) {
        r < 1 &&
          a.originalX == null &&
          ((a.originalX = u.x), (a.originalY = u.y));
        var h = i.getLayout("points"),
          v = i.hostModel,
          c = v.get("connectNulls"),
          d = s.get("precision"),
          p = s.get("distance") || 0,
          m = l.getBaseAxis(),
          g = m.isHorizontal(),
          y = m.inverse,
          _ = n.shape,
          b = y ? (g ? _.x : _.y + _.height) : g ? _.x + _.width : _.y,
          w = (g ? p : 0) * (y ? -1 : 1),
          S = (g ? 0 : -p) * (y ? -1 : 1),
          x = g ? "x" : "y",
          T = jC(h, b, x),
          D = T.range,
          A = D[1] - D[0],
          C = void 0;
        if (A >= 1) {
          if (A > 1 && !c) {
            var I = Cd(h, D[0]);
            (u.attr({ x: I[0] + w, y: I[1] + S }),
              o && (C = v.getRawValue(D[0])));
          } else {
            var I = f.getPointOn(b, x);
            I && u.attr({ x: I[0] + w, y: I[1] + S });
            var L = v.getRawValue(D[0]),
              P = v.getRawValue(D[1]);
            o && (C = YS(i, d, L, P, T.t));
          }
          a.lastFrameIndex = D[0];
        } else {
          var k = r === 1 || a.lastFrameIndex > 0 ? D[0] : 0,
            I = Cd(h, k);
          (o && (C = v.getRawValue(k)), u.attr({ x: I[0] + w, y: I[1] + S }));
        }
        if (o) {
          var E = el(u);
          typeof E.setLabelText == "function" && E.setLabelText(C);
        }
      }
    }),
    (t.prototype._doUpdateAnimation = function (r, n, i, a, o, s, l) {
      var u = this._polyline,
        f = this._polygon,
        h = r.hostModel,
        v = OC(
          this._data,
          r,
          this._stackedOnPoints,
          n,
          this._coordSys,
          i,
          this._valueOrigin,
        ),
        c = v.current,
        d = v.stackedOnCurrent,
        p = v.next,
        m = v.stackedOnNext;
      if (
        (o &&
          ((d = Tr(v.stackedOnCurrent, v.current, i, o, l)),
          (c = Tr(v.current, null, i, o, l)),
          (m = Tr(v.stackedOnNext, v.next, i, o, l)),
          (p = Tr(v.next, null, i, o, l))),
        xd(c, p) > 3e3 || (f && xd(d, m) > 3e3))
      ) {
        (u.stopAnimation(),
          u.setShape({ points: p }),
          f &&
            (f.stopAnimation(), f.setShape({ points: p, stackedOnPoints: m })));
        return;
      }
      ((u.shape.__points = v.current), (u.shape.points = c));
      var g = { shape: { points: p } };
      (v.current !== c && (g.shape.__points = v.next),
        u.stopAnimation(),
        jt(u, g, h),
        f &&
          (f.setShape({ points: c, stackedOnPoints: d }),
          f.stopAnimation(),
          jt(f, { shape: { stackedOnPoints: m } }, h),
          u.shape.points !== f.shape.points &&
            (f.shape.points = u.shape.points)));
      for (var y = [], _ = v.status, b = 0; b < _.length; b++) {
        var w = _[b].cmd;
        if (w === "=") {
          var S = r.getItemGraphicEl(_[b].idx1);
          S && y.push({ el: S, ptIdx: b });
        }
      }
      u.animators &&
        u.animators.length &&
        u.animators[0].during(function () {
          f && f.dirtyShape();
          for (var x = u.shape.__points, T = 0; T < y.length; T++) {
            var D = y[T].el,
              A = y[T].ptIdx * 2;
            ((D.x = x[A]), (D.y = x[A + 1]), D.markRedraw());
          }
        });
    }),
    (t.prototype.remove = function (r) {
      var n = this.group,
        i = this._data;
      (this._lineGroup.removeAll(),
        this._symbolDraw.remove(!0),
        i &&
          i.eachItemGraphicEl(function (a, o) {
            a.__temp && (n.remove(a), i.setItemGraphicEl(o, null));
          }),
        (this._polyline =
          this._polygon =
          this._coordSys =
          this._points =
          this._stackedOnPoints =
          this._endLabel =
          this._data =
            null));
    }),
    (t.type = "line"),
    t
  );
})(xe);
function tD(e, t) {
  return {
    seriesType: e,
    plan: vc(),
    reset: function (r) {
      var n = r.getData(),
        i = r.coordinateSystem;
      if ((r.pipelineContext, !!i)) {
        var a = q(i.dimensions, function (h) {
            return n.mapDimension(h);
          }).slice(0, 2),
          o = a.length,
          s = n.getCalculationInfo("stackResultDimension");
        (pi(n, a[0]) && (a[0] = s), pi(n, a[1]) && (a[1] = s));
        var l = n.getStore(),
          u = n.getDimensionIndex(a[0]),
          f = n.getDimensionIndex(a[1]);
        return (
          o && {
            progress: function (h, v) {
              for (
                var c = h.end - h.start,
                  d = fr(c * o),
                  p = [],
                  m = [],
                  g = h.start,
                  y = 0;
                g < h.end;
                g++
              ) {
                var _ = void 0;
                if (o === 1) {
                  var b = l.get(u, g);
                  _ = i.dataToPoint(b, null, m);
                } else
                  ((p[0] = l.get(u, g)),
                    (p[1] = l.get(f, g)),
                    (_ = i.dataToPoint(p, null, m)));
                ((d[y++] = _[0]), (d[y++] = _[1]));
              }
              v.setLayout("points", d);
            },
          }
        );
      }
    },
  };
}
var eD = {
    average: function (e) {
      for (var t = 0, r = 0, n = 0; n < e.length; n++)
        isNaN(e[n]) || ((t += e[n]), r++);
      return r === 0 ? NaN : t / r;
    },
    sum: function (e) {
      for (var t = 0, r = 0; r < e.length; r++) t += e[r] || 0;
      return t;
    },
    max: function (e) {
      for (var t = -1 / 0, r = 0; r < e.length; r++) e[r] > t && (t = e[r]);
      return isFinite(t) ? t : NaN;
    },
    min: function (e) {
      for (var t = 1 / 0, r = 0; r < e.length; r++) e[r] < t && (t = e[r]);
      return isFinite(t) ? t : NaN;
    },
    nearest: function (e) {
      return e[0];
    },
  },
  rD = function (e) {
    return Math.round(e.length / 2);
  };
function qy(e) {
  return {
    seriesType: e,
    reset: function (t, r, n) {
      var i = t.getData(),
        a = t.get("sampling"),
        o = t.coordinateSystem,
        s = i.count();
      if (s > 10 && o.type === "cartesian2d" && a) {
        var l = o.getBaseAxis(),
          u = o.getOtherAxis(l),
          f = l.getExtent(),
          h = n.getDevicePixelRatio(),
          v = Math.abs(f[1] - f[0]) * (h || 1),
          c = Math.round(s / v);
        if (isFinite(c) && c > 1) {
          a === "lttb"
            ? t.setData(i.lttbDownSample(i.mapDimension(u.dim), 1 / c))
            : a === "minmax" &&
              t.setData(i.minmaxDownSample(i.mapDimension(u.dim), 1 / c));
          var d = void 0;
          (U(a) ? (d = eD[a]) : Q(a) && (d = a),
            d && t.setData(i.downSample(i.mapDimension(u.dim), 1 / c, d, rD)));
        }
      }
    },
  };
}
function nD(e) {
  (e.registerChartView(JC),
    e.registerSeriesModel(LC),
    e.registerLayout(tD("line")),
    e.registerVisual({
      seriesType: "line",
      reset: function (t) {
        var r = t.getData(),
          n = t.getModel("lineStyle").getLineStyle();
        (n && !n.stroke && (n.stroke = r.getVisual("style").fill),
          r.setVisual("legendLineStyle", n));
      },
    }),
    e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, qy("line")));
}
var iD = "__ec_stack_";
function Zy(e) {
  return e.get("stack") || iD + e.seriesIndex;
}
function pc(e) {
  return e.dim + e.index;
}
function Ky(e, t) {
  var r = [];
  return (
    t.eachSeriesByType(e, function (n) {
      Qy(n) && r.push(n);
    }),
    r
  );
}
function aD(e) {
  var t = {};
  M(e, function (l) {
    var u = l.coordinateSystem,
      f = u.getBaseAxis();
    if (!(f.type !== "time" && f.type !== "value"))
      for (
        var h = l.getData(),
          v = f.dim + "_" + f.index,
          c = h.getDimensionIndex(h.mapDimension(f.dim)),
          d = h.getStore(),
          p = 0,
          m = d.count();
        p < m;
        ++p
      ) {
        var g = d.get(c, p);
        t[v] ? t[v].push(g) : (t[v] = [g]);
      }
  });
  var r = {};
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var i = t[n];
      if (i) {
        i.sort(function (l, u) {
          return l - u;
        });
        for (var a = null, o = 1; o < i.length; ++o) {
          var s = i[o] - i[o - 1];
          s > 0 && (a = a === null ? s : Math.min(a, s));
        }
        r[n] = a;
      }
    }
  return r;
}
function jy(e) {
  var t = aD(e),
    r = [];
  return (
    M(e, function (n) {
      var i = n.coordinateSystem,
        a = i.getBaseAxis(),
        o = a.getExtent(),
        s;
      if (a.type === "category") s = a.getBandWidth();
      else if (a.type === "value" || a.type === "time") {
        var l = a.dim + "_" + a.index,
          u = t[l],
          f = Math.abs(o[1] - o[0]),
          h = a.scale.getExtent(),
          v = Math.abs(h[1] - h[0]);
        s = u ? (f / v) * u : f;
      } else {
        var c = n.getData();
        s = Math.abs(o[1] - o[0]) / c.count();
      }
      var d = mt(n.get("barWidth"), s),
        p = mt(n.get("barMaxWidth"), s),
        m = mt(n.get("barMinWidth") || (Jy(n) ? 0.5 : 1), s),
        g = n.get("barGap"),
        y = n.get("barCategoryGap"),
        _ = n.get("defaultBarGap");
      r.push({
        bandWidth: s,
        barWidth: d,
        barMaxWidth: p,
        barMinWidth: m,
        barGap: g,
        barCategoryGap: y,
        defaultBarGap: _,
        axisKey: pc(a),
        stackId: Zy(n),
      });
    }),
    oD(r)
  );
}
function oD(e) {
  var t = {};
  M(e, function (n, i) {
    var a = n.axisKey,
      o = n.bandWidth,
      s = t[a] || {
        bandWidth: o,
        remainedWidth: o,
        autoWidthCount: 0,
        categoryGap: null,
        gap: n.defaultBarGap || 0,
        stacks: {},
      },
      l = s.stacks;
    t[a] = s;
    var u = n.stackId;
    (l[u] || s.autoWidthCount++, (l[u] = l[u] || { width: 0, maxWidth: 0 }));
    var f = n.barWidth;
    f &&
      !l[u].width &&
      ((l[u].width = f),
      (f = Math.min(s.remainedWidth, f)),
      (s.remainedWidth -= f));
    var h = n.barMaxWidth;
    h && (l[u].maxWidth = h);
    var v = n.barMinWidth;
    v && (l[u].minWidth = v);
    var c = n.barGap;
    c != null && (s.gap = c);
    var d = n.barCategoryGap;
    d != null && (s.categoryGap = d);
  });
  var r = {};
  return (
    M(t, function (n, i) {
      r[i] = {};
      var a = n.stacks,
        o = n.bandWidth,
        s = n.categoryGap;
      if (s == null) {
        var l = yt(a).length;
        s = Math.max(35 - l * 4, 15) + "%";
      }
      var u = mt(s, o),
        f = mt(n.gap, 1),
        h = n.remainedWidth,
        v = n.autoWidthCount,
        c = (h - u) / (v + (v - 1) * f);
      ((c = Math.max(c, 0)),
        M(a, function (g) {
          var y = g.maxWidth,
            _ = g.minWidth;
          if (g.width) {
            var b = g.width;
            (y && (b = Math.min(b, y)),
              _ && (b = Math.max(b, _)),
              (g.width = b),
              (h -= b + f * b),
              v--);
          } else {
            var b = c;
            (y && y < b && (b = Math.min(y, h)),
              _ && _ > b && (b = _),
              b !== c && ((g.width = b), (h -= b + f * b), v--));
          }
        }),
        (c = (h - u) / (v + (v - 1) * f)),
        (c = Math.max(c, 0)));
      var d = 0,
        p;
      (M(a, function (g, y) {
        (g.width || (g.width = c), (p = g), (d += g.width * (1 + f)));
      }),
        p && (d -= p.width * f));
      var m = -d / 2;
      M(a, function (g, y) {
        ((r[i][y] = r[i][y] || { bandWidth: o, offset: m, width: g.width }),
          (m += g.width * (1 + f)));
      });
    }),
    r
  );
}
function sD(e, t, r) {
  if (e && t) {
    var n = e[pc(t)];
    return n;
  }
}
function lD(e, t) {
  var r = Ky(e, t),
    n = jy(r);
  M(r, function (i) {
    var a = i.getData(),
      o = i.coordinateSystem,
      s = o.getBaseAxis(),
      l = Zy(i),
      u = n[pc(s)][l],
      f = u.offset,
      h = u.width;
    a.setLayout({ bandWidth: u.bandWidth, offset: f, size: h });
  });
}
function uD(e) {
  return {
    seriesType: e,
    plan: vc(),
    reset: function (t) {
      if (Qy(t)) {
        var r = t.getData(),
          n = t.coordinateSystem,
          i = n.getBaseAxis(),
          a = n.getOtherAxis(i),
          o = r.getDimensionIndex(r.mapDimension(a.dim)),
          s = r.getDimensionIndex(r.mapDimension(i.dim)),
          l = t.get("showBackground", !0),
          u = r.mapDimension(a.dim),
          f = r.getCalculationInfo("stackResultDimension"),
          h = pi(r, u) && !!r.getCalculationInfo("stackedOnSeries"),
          v = a.isHorizontal(),
          c = fD(i, a),
          d = Jy(t),
          p = t.get("barMinHeight") || 0,
          m = f && r.getDimensionIndex(f),
          g = r.getLayout("size"),
          y = r.getLayout("offset");
        return {
          progress: function (_, b) {
            for (
              var w = _.count,
                S = d && fr(w * 3),
                x = d && l && fr(w * 3),
                T = d && fr(w),
                D = n.master.getRect(),
                A = v ? D.width : D.height,
                C,
                I = b.getStore(),
                L = 0;
              (C = _.next()) != null;

            ) {
              var P = I.get(h ? m : o, C),
                k = I.get(s, C),
                E = c,
                V = void 0;
              h && (V = +P - I.get(o, C));
              var R = void 0,
                O = void 0,
                z = void 0,
                F = void 0;
              if (v) {
                var N = n.dataToPoint([P, k]);
                if (h) {
                  var $ = n.dataToPoint([V, k]);
                  E = $[0];
                }
                ((R = E),
                  (O = N[1] + y),
                  (z = N[0] - E),
                  (F = g),
                  Math.abs(z) < p && (z = (z < 0 ? -1 : 1) * p));
              } else {
                var N = n.dataToPoint([k, P]);
                if (h) {
                  var $ = n.dataToPoint([k, V]);
                  E = $[1];
                }
                ((R = N[0] + y),
                  (O = E),
                  (z = g),
                  (F = N[1] - E),
                  Math.abs(F) < p && (F = (F <= 0 ? -1 : 1) * p));
              }
              (d
                ? ((S[L] = R),
                  (S[L + 1] = O),
                  (S[L + 2] = v ? z : F),
                  x &&
                    ((x[L] = v ? D.x : R),
                    (x[L + 1] = v ? O : D.y),
                    (x[L + 2] = A)),
                  (T[C] = C))
                : b.setItemLayout(C, { x: R, y: O, width: z, height: F }),
                (L += 3));
            }
            d &&
              b.setLayout({
                largePoints: S,
                largeDataIndices: T,
                largeBackgroundPoints: x,
                valueAxisHorizontal: v,
              });
          },
        };
      }
    },
  };
}
function Qy(e) {
  return e.coordinateSystem && e.coordinateSystem.type === "cartesian2d";
}
function Jy(e) {
  return e.pipelineContext && e.pipelineContext.large;
}
function fD(e, t) {
  var r = t.model.get("startValue");
  return (
    r || (r = 0),
    t.toGlobalCoord(t.dataToCoord(t.type === "log" ? (r > 0 ? r : 1) : r))
  );
}
var Bf = (function (e) {
  G(t, e);
  function t() {
    var r = (e !== null && e.apply(this, arguments)) || this;
    return ((r.type = t.type), r);
  }
  return (
    (t.prototype.getInitialData = function (r, n) {
      return jh(null, this, { useEncodeDefaulter: !0 });
    }),
    (t.prototype.getMarkerPosition = function (r, n, i) {
      var a = this.coordinateSystem;
      if (a && a.clampData) {
        var o = a.clampData(r),
          s = a.dataToPoint(o);
        if (i)
          M(a.getAxes(), function (v, c) {
            if (v.type === "category" && n != null) {
              var d = v.getTicksCoords(),
                p = v.getTickModel().get("alignWithLabel"),
                m = o[c],
                g = n[c] === "x1" || n[c] === "y1";
              if ((g && !p && (m += 1), d.length < 2)) return;
              if (d.length === 2) {
                s[c] = v.toGlobalCoord(v.getExtent()[g ? 1 : 0]);
                return;
              }
              for (
                var y = void 0, _ = void 0, b = 1, w = 0;
                w < d.length;
                w++
              ) {
                var S = d[w].coord,
                  x =
                    w === d.length - 1
                      ? d[w - 1].tickValue + b
                      : d[w].tickValue;
                if (x === m) {
                  _ = S;
                  break;
                } else if (x < m) y = S;
                else if (y != null && x > m) {
                  _ = (S + y) / 2;
                  break;
                }
                w === 1 && (b = x - d[0].tickValue);
              }
              (_ == null &&
                (y ? y && (_ = d[d.length - 1].coord) : (_ = d[0].coord)),
                (s[c] = v.toGlobalCoord(_)));
            }
          });
        else {
          var l = this.getData(),
            u = l.getLayout("offset"),
            f = l.getLayout("size"),
            h = a.getBaseAxis().isHorizontal() ? 0 : 1;
          s[h] += u + f / 2;
        }
        return s;
      }
      return [NaN, NaN];
    }),
    (t.type = "series.__base_bar__"),
    (t.defaultOption = {
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      barMinHeight: 0,
      barMinAngle: 0,
      large: !1,
      largeThreshold: 400,
      progressive: 3e3,
      progressiveChunkMode: "mod",
      defaultBarGap: "10%",
    }),
    t
  );
})(Pe);
Pe.registerClass(Bf);
var hD = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = t.type), r);
    }
    return (
      (t.prototype.getInitialData = function () {
        return jh(null, this, {
          useEncodeDefaulter: !0,
          createInvertedIndices: !!this.get("realtimeSort", !0) || null,
        });
      }),
      (t.prototype.getProgressive = function () {
        return this.get("large") ? this.get("progressive") : !1;
      }),
      (t.prototype.getProgressiveThreshold = function () {
        var r = this.get("progressiveThreshold"),
          n = this.get("largeThreshold");
        return (n > r && (r = n), r);
      }),
      (t.prototype.brushSelector = function (r, n, i) {
        return i.rect(n.getItemLayout(r));
      }),
      (t.type = "series.bar"),
      (t.dependencies = ["grid", "polar"]),
      (t.defaultOption = my(Bf.defaultOption, {
        clip: !0,
        roundCap: !1,
        showBackground: !1,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
          borderColor: null,
          borderWidth: 0,
          borderType: "solid",
          borderRadius: 0,
          shadowBlur: 0,
          shadowColor: null,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 1,
        },
        select: { itemStyle: { borderColor: Y.color.primary, borderWidth: 2 } },
        realtimeSort: !1,
      })),
      t
    );
  })(Bf),
  bs = "\0__throttleOriginMethod",
  Dd = "\0__throttleRate",
  Md = "\0__throttleType";
function gc(e, t, r) {
  var n,
    i = 0,
    a = 0,
    o = null,
    s,
    l,
    u,
    f;
  t = t || 0;
  function h() {
    ((a = new Date().getTime()), (o = null), e.apply(l, u || []));
  }
  var v = function () {
    for (var c = [], d = 0; d < arguments.length; d++) c[d] = arguments[d];
    ((n = new Date().getTime()), (l = this), (u = c));
    var p = f || t,
      m = f || r;
    ((f = null),
      (s = n - (m ? i : a) - p),
      clearTimeout(o),
      m ? (o = setTimeout(h, p)) : s >= 0 ? h() : (o = setTimeout(h, -s)),
      (i = n));
  };
  return (
    (v.clear = function () {
      o && (clearTimeout(o), (o = null));
    }),
    (v.debounceNextCall = function (c) {
      f = c;
    }),
    v
  );
}
function t0(e, t, r, n) {
  var i = e[t];
  if (i) {
    var a = i[bs] || i,
      o = i[Md],
      s = i[Dd];
    if (s !== r || o !== n) {
      if (r == null || !n) return (e[t] = a);
      ((i = e[t] = gc(a, r, n === "debounce")),
        (i[bs] = a),
        (i[Md] = n),
        (i[Dd] = r));
    }
    return i;
  }
}
function Nf(e, t) {
  var r = e[t];
  r && r[bs] && (r.clear && r.clear(), (e[t] = r[bs]));
}
var cD = (function () {
    function e() {
      ((this.cx = 0),
        (this.cy = 0),
        (this.r0 = 0),
        (this.r = 0),
        (this.startAngle = 0),
        (this.endAngle = Math.PI * 2),
        (this.clockwise = !0));
    }
    return e;
  })(),
  Ad = (function (e) {
    G(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return ((n.type = "sausage"), n);
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new cD();
      }),
      (t.prototype.buildPath = function (r, n) {
        var i = n.cx,
          a = n.cy,
          o = Math.max(n.r0 || 0, 0),
          s = Math.max(n.r, 0),
          l = (s - o) * 0.5,
          u = o + l,
          f = n.startAngle,
          h = n.endAngle,
          v = n.clockwise,
          c = Math.PI * 2,
          d = v ? h - f < c : f - h < c;
        d || (f = h - (v ? c : -c));
        var p = Math.cos(f),
          m = Math.sin(f),
          g = Math.cos(h),
          y = Math.sin(h);
        (d
          ? (r.moveTo(p * o + i, m * o + a),
            r.arc(p * u + i, m * u + a, l, -Math.PI + f, f, !v))
          : r.moveTo(p * s + i, m * s + a),
          r.arc(i, a, s, f, h, !v),
          r.arc(g * u + i, y * u + a, l, h - Math.PI * 2, h - Math.PI, !v),
          o !== 0 && r.arc(i, a, o, h, f, v));
      }),
      t
    );
  })(pt);
function vD(e, t) {
  t = t || {};
  var r = t.isRoundCap;
  return function (n, i, a) {
    var o = i.position;
    if (!o || o instanceof Array) return Qo(n, i, a);
    var s = e(o),
      l = i.distance != null ? i.distance : 5,
      u = this.shape,
      f = u.cx,
      h = u.cy,
      v = u.r,
      c = u.r0,
      d = (v + c) / 2,
      p = u.startAngle,
      m = u.endAngle,
      g = (p + m) / 2,
      y = r ? Math.abs(v - c) / 2 : 0,
      _ = Math.cos,
      b = Math.sin,
      w = f + v * _(p),
      S = h + v * b(p),
      x = "left",
      T = "top";
    switch (s) {
      case "startArc":
        ((w = f + (c - l) * _(g)),
          (S = h + (c - l) * b(g)),
          (x = "center"),
          (T = "top"));
        break;
      case "insideStartArc":
        ((w = f + (c + l) * _(g)),
          (S = h + (c + l) * b(g)),
          (x = "center"),
          (T = "bottom"));
        break;
      case "startAngle":
        ((w = f + d * _(p) + mo(p, l + y, !1)),
          (S = h + d * b(p) + yo(p, l + y, !1)),
          (x = "right"),
          (T = "middle"));
        break;
      case "insideStartAngle":
        ((w = f + d * _(p) + mo(p, -l + y, !1)),
          (S = h + d * b(p) + yo(p, -l + y, !1)),
          (x = "left"),
          (T = "middle"));
        break;
      case "middle":
        ((w = f + d * _(g)),
          (S = h + d * b(g)),
          (x = "center"),
          (T = "middle"));
        break;
      case "endArc":
        ((w = f + (v + l) * _(g)),
          (S = h + (v + l) * b(g)),
          (x = "center"),
          (T = "bottom"));
        break;
      case "insideEndArc":
        ((w = f + (v - l) * _(g)),
          (S = h + (v - l) * b(g)),
          (x = "center"),
          (T = "top"));
        break;
      case "endAngle":
        ((w = f + d * _(m) + mo(m, l + y, !0)),
          (S = h + d * b(m) + yo(m, l + y, !0)),
          (x = "left"),
          (T = "middle"));
        break;
      case "insideEndAngle":
        ((w = f + d * _(m) + mo(m, -l + y, !0)),
          (S = h + d * b(m) + yo(m, -l + y, !0)),
          (x = "right"),
          (T = "middle"));
        break;
      default:
        return Qo(n, i, a);
    }
    return (
      (n = n || {}),
      (n.x = w),
      (n.y = S),
      (n.align = x),
      (n.verticalAlign = T),
      n
    );
  };
}
function dD(e, t, r, n) {
  if (vt(n)) {
    e.setTextConfig({ rotation: n });
    return;
  } else if (W(t)) {
    e.setTextConfig({ rotation: 0 });
    return;
  }
  var i = e.shape,
    a = i.clockwise ? i.startAngle : i.endAngle,
    o = i.clockwise ? i.endAngle : i.startAngle,
    s = (a + o) / 2,
    l,
    u = r(t);
  switch (u) {
    case "startArc":
    case "insideStartArc":
    case "middle":
    case "insideEndArc":
    case "endArc":
      l = s;
      break;
    case "startAngle":
    case "insideStartAngle":
      l = a;
      break;
    case "endAngle":
    case "insideEndAngle":
      l = o;
      break;
    default:
      e.setTextConfig({ rotation: 0 });
      return;
  }
  var f = Math.PI * 1.5 - l;
  (u === "middle" && f > Math.PI / 2 && f < Math.PI * 1.5 && (f -= Math.PI),
    e.setTextConfig({ rotation: f }));
}
function mo(e, t, r) {
  return t * Math.sin(e) * (r ? -1 : 1);
}
function yo(e, t, r) {
  return t * Math.cos(e) * (r ? 1 : -1);
}
function Zi(e, t, r) {
  var n = e.get("borderRadius");
  if (n == null) return r ? { cornerRadius: 0 } : null;
  W(n) || (n = [n, n, n, n]);
  var i = Math.abs(t.r || 0 - t.r0 || 0);
  return {
    cornerRadius: q(n, function (a) {
      return zr(a, i);
    }),
  };
}
var su = Math.max,
  lu = Math.min;
function pD(e, t) {
  var r = e.getArea && e.getArea();
  if (dc(e, "cartesian2d")) {
    var n = e.getBaseAxis();
    if (n.type !== "category" || !n.onBand) {
      var i = t.getLayout("bandWidth");
      n.isHorizontal()
        ? ((r.x -= i), (r.width += i * 2))
        : ((r.y -= i), (r.height += i * 2));
    }
  }
  return r;
}
var gD = (function (e) {
    G(t, e);
    function t() {
      var r = e.call(this) || this;
      return ((r.type = t.type), (r._isFirstFrame = !0), r);
    }
    return (
      (t.prototype.render = function (r, n, i, a) {
        ((this._model = r),
          this._removeOnRenderedListener(i),
          this._updateDrawMode(r));
        var o = r.get("coordinateSystem");
        (o === "cartesian2d" || o === "polar") &&
          ((this._progressiveEls = null),
          this._isLargeDraw
            ? this._renderLarge(r, n, i)
            : this._renderNormal(r, n, i, a));
      }),
      (t.prototype.incrementalPrepareRender = function (r) {
        (this._clear(), this._updateDrawMode(r), this._updateLargeClip(r));
      }),
      (t.prototype.incrementalRender = function (r, n) {
        ((this._progressiveEls = []), this._incrementalRenderLarge(r, n));
      }),
      (t.prototype.eachRendered = function (r) {
        Js(this._progressiveEls || this.group, r);
      }),
      (t.prototype._updateDrawMode = function (r) {
        var n = r.pipelineContext.large;
        (this._isLargeDraw == null || n !== this._isLargeDraw) &&
          ((this._isLargeDraw = n), this._clear());
      }),
      (t.prototype._renderNormal = function (r, n, i, a) {
        var o = this.group,
          s = r.getData(),
          l = this._data,
          u = r.coordinateSystem,
          f = u.getBaseAxis(),
          h;
        u.type === "cartesian2d"
          ? (h = f.isHorizontal())
          : u.type === "polar" && (h = f.dim === "angle");
        var v = r.isAnimationEnabled() ? r : null,
          c = mD(r, u);
        c && this._enableRealtimeSort(c, s, i);
        var d = r.get("clip", !0) || c,
          p = pD(u, s);
        o.removeClipPath();
        var m = r.get("roundCap", !0),
          g = r.get("showBackground", !0),
          y = r.getModel("backgroundStyle"),
          _ = y.get("borderRadius") || 0,
          b = [],
          w = this._backgroundEls,
          S = a && a.isInitSort,
          x = a && a.type === "changeAxisOrder";
        function T(C) {
          var I = _o[u.type](s, C);
          if (!I) return null;
          var L = TD(u, h, I);
          return (
            L.useStyle(y.getItemStyle()),
            u.type === "cartesian2d"
              ? L.setShape("r", _)
              : L.setShape("cornerRadius", _),
            (b[C] = L),
            L
          );
        }
        s.diff(l)
          .add(function (C) {
            var I = s.getItemModel(C),
              L = _o[u.type](s, C, I);
            if (L && (g && T(C), !(!s.hasValue(C) || !Rd[u.type](L)))) {
              var P = !1;
              d && (P = Ld[u.type](p, L));
              var k = Id[u.type](r, s, C, L, h, v, f.model, !1, m);
              (c && (k.forceLabelAnimation = !0),
                Ed(k, s, C, I, L, r, h, u.type === "polar"),
                S
                  ? k.attr({ shape: L })
                  : c
                    ? Pd(c, v, k, L, C, h, !1, !1)
                    : we(k, { shape: L }, r, C),
                s.setItemGraphicEl(C, k),
                o.add(k),
                (k.ignore = P));
            }
          })
          .update(function (C, I) {
            var L = s.getItemModel(C),
              P = _o[u.type](s, C, L);
            if (P) {
              if (g) {
                var k = void 0;
                w.length === 0
                  ? (k = T(I))
                  : ((k = w[I]),
                    k.useStyle(y.getItemStyle()),
                    u.type === "cartesian2d"
                      ? k.setShape("r", _)
                      : k.setShape("cornerRadius", _),
                    (b[C] = k));
                var E = _o[u.type](s, C),
                  V = r0(h, E, u);
                jt(k, { shape: V }, v, C);
              }
              var R = l.getItemGraphicEl(I);
              if (!s.hasValue(C) || !Rd[u.type](P)) {
                o.remove(R);
                return;
              }
              var O = !1;
              d && ((O = Ld[u.type](p, P)), O && o.remove(R));
              var z =
                R &&
                ((R.type === "sector" && m) || (R.type === "sausage" && !m));
              if (
                (z && (R && oa(R, r, I), (R = null)),
                R ? Hh(R) : (R = Id[u.type](r, s, C, P, h, v, f.model, !0, m)),
                c && (R.forceLabelAnimation = !0),
                x)
              ) {
                var F = R.getTextContent();
                if (F) {
                  var N = el(F);
                  N.prevValue != null && (N.prevValue = N.value);
                }
              } else Ed(R, s, C, L, P, r, h, u.type === "polar");
              (S
                ? R.attr({ shape: P })
                : c
                  ? Pd(c, v, R, P, C, h, !0, x)
                  : jt(R, { shape: P }, r, C, null),
                s.setItemGraphicEl(C, R),
                (R.ignore = O),
                o.add(R));
            }
          })
          .remove(function (C) {
            var I = l.getItemGraphicEl(C);
            I && oa(I, r, C);
          })
          .execute();
        var D = this._backgroundGroup || (this._backgroundGroup = new Et());
        D.removeAll();
        for (var A = 0; A < b.length; ++A) D.add(b[A]);
        (o.add(D), (this._backgroundEls = b), (this._data = s));
      }),
      (t.prototype._renderLarge = function (r, n, i) {
        (this._clear(), Bd(r, this.group), this._updateLargeClip(r));
      }),
      (t.prototype._incrementalRenderLarge = function (r, n) {
        (this._removeBackground(), Bd(n, this.group, this._progressiveEls, !0));
      }),
      (t.prototype._updateLargeClip = function (r) {
        var n = r.get("clip", !0) && WC(r.coordinateSystem, !1, r),
          i = this.group;
        n ? i.setClipPath(n) : i.removeClipPath();
      }),
      (t.prototype._enableRealtimeSort = function (r, n, i) {
        var a = this;
        if (n.count()) {
          var o = r.baseAxis;
          if (this._isFirstFrame)
            (this._dispatchInitSort(n, r, i), (this._isFirstFrame = !1));
          else {
            var s = function (l) {
              var u = n.getItemGraphicEl(l),
                f = u && u.shape;
              return (
                (f && Math.abs(o.isHorizontal() ? f.height : f.width)) || 0
              );
            };
            ((this._onRendered = function () {
              a._updateSortWithinSameData(n, s, o, i);
            }),
              i.getZr().on("rendered", this._onRendered));
          }
        }
      }),
      (t.prototype._dataSort = function (r, n, i) {
        var a = [];
        return (
          r.each(r.mapDimension(n.dim), function (o, s) {
            var l = i(s);
            ((l = l ?? NaN),
              a.push({ dataIndex: s, mappedValue: l, ordinalNumber: o }));
          }),
          a.sort(function (o, s) {
            return s.mappedValue - o.mappedValue;
          }),
          {
            ordinalNumbers: q(a, function (o) {
              return o.ordinalNumber;
            }),
          }
        );
      }),
      (t.prototype._isOrderChangedWithinSameData = function (r, n, i) {
        for (
          var a = i.scale,
            o = r.mapDimension(i.dim),
            s = Number.MAX_VALUE,
            l = 0,
            u = a.getOrdinalMeta().categories.length;
          l < u;
          ++l
        ) {
          var f = r.rawIndexOf(o, a.getRawOrdinalNumber(l)),
            h = f < 0 ? Number.MIN_VALUE : n(r.indexOfRawIndex(f));
          if (h > s) return !0;
          s = h;
        }
        return !1;
      }),
      (t.prototype._isOrderDifferentInView = function (r, n) {
        for (
          var i = n.scale,
            a = i.getExtent(),
            o = Math.max(0, a[0]),
            s = Math.min(a[1], i.getOrdinalMeta().categories.length - 1);
          o <= s;
          ++o
        )
          if (r.ordinalNumbers[o] !== i.getRawOrdinalNumber(o)) return !0;
      }),
      (t.prototype._updateSortWithinSameData = function (r, n, i, a) {
        if (this._isOrderChangedWithinSameData(r, n, i)) {
          var o = this._dataSort(r, i, n);
          this._isOrderDifferentInView(o, i) &&
            (this._removeOnRenderedListener(a),
            a.dispatchAction({
              type: "changeAxisOrder",
              componentType: i.dim + "Axis",
              axisId: i.index,
              sortInfo: o,
            }));
        }
      }),
      (t.prototype._dispatchInitSort = function (r, n, i) {
        var a = n.baseAxis,
          o = this._dataSort(r, a, function (s) {
            return r.get(r.mapDimension(n.otherAxis.dim), s);
          });
        i.dispatchAction({
          type: "changeAxisOrder",
          componentType: a.dim + "Axis",
          isInitSort: !0,
          axisId: a.index,
          sortInfo: o,
        });
      }),
      (t.prototype.remove = function (r, n) {
        (this._clear(this._model), this._removeOnRenderedListener(n));
      }),
      (t.prototype.dispose = function (r, n) {
        this._removeOnRenderedListener(n);
      }),
      (t.prototype._removeOnRenderedListener = function (r) {
        this._onRendered &&
          (r.getZr().off("rendered", this._onRendered),
          (this._onRendered = null));
      }),
      (t.prototype._clear = function (r) {
        var n = this.group,
          i = this._data;
        (r && r.isAnimationEnabled() && i && !this._isLargeDraw
          ? (this._removeBackground(),
            (this._backgroundEls = []),
            i.eachItemGraphicEl(function (a) {
              oa(a, r, ot(a).dataIndex);
            }))
          : n.removeAll(),
          (this._data = null),
          (this._isFirstFrame = !0));
      }),
      (t.prototype._removeBackground = function () {
        (this.group.remove(this._backgroundGroup),
          (this._backgroundGroup = null));
      }),
      (t.type = "bar"),
      t
    );
  })(xe),
  Ld = {
    cartesian2d: function (e, t) {
      var r = t.width < 0 ? -1 : 1,
        n = t.height < 0 ? -1 : 1;
      (r < 0 && ((t.x += t.width), (t.width = -t.width)),
        n < 0 && ((t.y += t.height), (t.height = -t.height)));
      var i = e.x + e.width,
        a = e.y + e.height,
        o = su(t.x, e.x),
        s = lu(t.x + t.width, i),
        l = su(t.y, e.y),
        u = lu(t.y + t.height, a),
        f = s < o,
        h = u < l;
      return (
        (t.x = f && o > i ? s : o),
        (t.y = h && l > a ? u : l),
        (t.width = f ? 0 : s - o),
        (t.height = h ? 0 : u - l),
        r < 0 && ((t.x += t.width), (t.width = -t.width)),
        n < 0 && ((t.y += t.height), (t.height = -t.height)),
        f || h
      );
    },
    polar: function (e, t) {
      var r = t.r0 <= t.r ? 1 : -1;
      if (r < 0) {
        var n = t.r;
        ((t.r = t.r0), (t.r0 = n));
      }
      var i = lu(t.r, e.r),
        a = su(t.r0, e.r0);
      ((t.r = i), (t.r0 = a));
      var o = i - a < 0;
      if (r < 0) {
        var n = t.r;
        ((t.r = t.r0), (t.r0 = n));
      }
      return o;
    },
  },
  Id = {
    cartesian2d: function (e, t, r, n, i, a, o, s, l) {
      var u = new Tt({ shape: B({}, n), z2: 1 });
      if (((u.__dataIndex = r), (u.name = "item"), a)) {
        var f = u.shape,
          h = i ? "height" : "width";
        f[h] = 0;
      }
      return u;
    },
    polar: function (e, t, r, n, i, a, o, s, l) {
      var u = !i && l ? Ad : $r,
        f = new u({ shape: n, z2: 1 });
      f.name = "item";
      var h = e0(i);
      if (((f.calculateTextPosition = vD(h, { isRoundCap: u === Ad })), a)) {
        var v = f.shape,
          c = i ? "r" : "endAngle",
          d = {};
        ((v[c] = i ? n.r0 : n.startAngle),
          (d[c] = n[c]),
          (s ? jt : we)(f, { shape: d }, a));
      }
      return f;
    },
  };
function mD(e, t) {
  var r = e.get("realtimeSort", !0),
    n = t.getBaseAxis();
  if (r && n.type === "category" && t.type === "cartesian2d")
    return { baseAxis: n, otherAxis: t.getOtherAxis(n) };
}
function Pd(e, t, r, n, i, a, o, s) {
  var l, u;
  (a
    ? ((u = { x: n.x, width: n.width }), (l = { y: n.y, height: n.height }))
    : ((u = { y: n.y, height: n.height }), (l = { x: n.x, width: n.width })),
    s || (o ? jt : we)(r, { shape: l }, t, i, null));
  var f = t ? e.baseAxis.model : null;
  (o ? jt : we)(r, { shape: u }, f, i);
}
function kd(e, t) {
  for (var r = 0; r < t.length; r++) if (!isFinite(e[t[r]])) return !0;
  return !1;
}
var yD = ["x", "y", "width", "height"],
  _D = ["cx", "cy", "r", "startAngle", "endAngle"],
  Rd = {
    cartesian2d: function (e) {
      return !kd(e, yD);
    },
    polar: function (e) {
      return !kd(e, _D);
    },
  },
  _o = {
    cartesian2d: function (e, t, r) {
      var n = e.getItemLayout(t);
      if (!n) return null;
      var i = r ? SD(r, n) : 0,
        a = n.width > 0 ? 1 : -1,
        o = n.height > 0 ? 1 : -1;
      return {
        x: n.x + (a * i) / 2,
        y: n.y + (o * i) / 2,
        width: n.width - a * i,
        height: n.height - o * i,
      };
    },
    polar: function (e, t, r) {
      var n = e.getItemLayout(t);
      return {
        cx: n.cx,
        cy: n.cy,
        r0: n.r0,
        r: n.r,
        startAngle: n.startAngle,
        endAngle: n.endAngle,
        clockwise: n.clockwise,
      };
    },
  };
function bD(e) {
  return (
    e.startAngle != null && e.endAngle != null && e.startAngle === e.endAngle
  );
}
function e0(e) {
  return (function (t) {
    var r = t ? "Arc" : "Angle";
    return function (n) {
      switch (n) {
        case "start":
        case "insideStart":
        case "end":
        case "insideEnd":
          return n + r;
        default:
          return n;
      }
    };
  })(e);
}
function Ed(e, t, r, n, i, a, o, s) {
  var l = t.getItemVisual(r, "style");
  if (s) {
    if (!a.get("roundCap")) {
      var f = e.shape,
        h = Zi(n.getModel("itemStyle"), f, !0);
      (B(f, h), e.setShape(f));
    }
  } else {
    var u = n.get(["itemStyle", "borderRadius"]) || 0;
    e.setShape("r", u);
  }
  e.useStyle(l);
  var v = n.getShallow("cursor");
  v && e.attr("cursor", v);
  var c = s
      ? o
        ? i.r >= i.r0
          ? "endArc"
          : "startArc"
        : i.endAngle >= i.startAngle
          ? "endAngle"
          : "startAngle"
      : o
        ? i.height >= 0
          ? "bottom"
          : "top"
        : i.width >= 0
          ? "right"
          : "left",
    d = za(n);
  Fa(e, d, {
    labelFetcher: a,
    labelDataIndex: r,
    defaultText: hc(a.getData(), r),
    inheritColor: l.fill,
    defaultOpacity: l.opacity,
    defaultOutsidePosition: c,
  });
  var p = e.getTextContent();
  if (s && p) {
    var m = n.get(["label", "position"]);
    ((e.textConfig.inside = m === "middle" ? !0 : null),
      dD(e, m === "outside" ? c : m, e0(o), n.get(["label", "rotate"])));
  }
  fx(p, d, a.getRawValue(r), function (y) {
    return zy(t, y);
  });
  var g = n.getModel(["emphasis"]);
  (_a(e, g.get("focus"), g.get("blurScope"), g.get("disabled")),
    vs(e, n),
    bD(i) &&
      ((e.style.fill = "none"),
      (e.style.stroke = "none"),
      M(e.states, function (y) {
        y.style && (y.style.fill = y.style.stroke = "none");
      })));
}
function SD(e, t) {
  var r = e.get(["itemStyle", "borderColor"]);
  if (!r || r === "none") return 0;
  var n = e.get(["itemStyle", "borderWidth"]) || 0,
    i = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width),
    a = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(n, i, a);
}
var wD = (function () {
    function e() {}
    return e;
  })(),
  Od = (function (e) {
    G(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return ((n.type = "largeBar"), n);
    }
    return (
      (t.prototype.getDefaultShape = function () {
        return new wD();
      }),
      (t.prototype.buildPath = function (r, n) {
        for (
          var i = n.points,
            a = this.baseDimIdx,
            o = 1 - this.baseDimIdx,
            s = [],
            l = [],
            u = this.barWidth,
            f = 0;
          f < i.length;
          f += 3
        )
          ((l[a] = u),
            (l[o] = i[f + 2]),
            (s[a] = i[f + a]),
            (s[o] = i[f + o]),
            r.rect(s[0], s[1], l[0], l[1]));
      }),
      t
    );
  })(pt);
function Bd(e, t, r, n) {
  var i = e.getData(),
    a = i.getLayout("valueAxisHorizontal") ? 1 : 0,
    o = i.getLayout("largeDataIndices"),
    s = i.getLayout("size"),
    l = e.getModel("backgroundStyle"),
    u = i.getLayout("largeBackgroundPoints");
  if (u) {
    var f = new Od({
      shape: { points: u },
      incremental: !!n,
      silent: !0,
      z2: 0,
    });
    ((f.baseDimIdx = a),
      (f.largeDataIndices = o),
      (f.barWidth = s),
      f.useStyle(l.getItemStyle()),
      t.add(f),
      r && r.push(f));
  }
  var h = new Od({
    shape: { points: i.getLayout("largePoints") },
    incremental: !!n,
    ignoreCoarsePointer: !0,
    z2: 1,
  });
  ((h.baseDimIdx = a),
    (h.largeDataIndices = o),
    (h.barWidth = s),
    t.add(h),
    h.useStyle(i.getVisual("style")),
    (h.style.stroke = null),
    (ot(h).seriesIndex = e.seriesIndex),
    e.get("silent") || (h.on("mousedown", Nd), h.on("mousemove", Nd)),
    r && r.push(h));
}
var Nd = gc(
  function (e) {
    var t = this,
      r = xD(t, e.offsetX, e.offsetY);
    ot(t).dataIndex = r >= 0 ? r : null;
  },
  30,
  !1,
);
function xD(e, t, r) {
  for (
    var n = e.baseDimIdx,
      i = 1 - n,
      a = e.shape.points,
      o = e.largeDataIndices,
      s = [],
      l = [],
      u = e.barWidth,
      f = 0,
      h = a.length / 3;
    f < h;
    f++
  ) {
    var v = f * 3;
    if (
      ((l[n] = u),
      (l[i] = a[v + 2]),
      (s[n] = a[v + n]),
      (s[i] = a[v + i]),
      l[i] < 0 && ((s[i] += l[i]), (l[i] = -l[i])),
      t >= s[0] && t <= s[0] + l[0] && r >= s[1] && r <= s[1] + l[1])
    )
      return o[f];
  }
  return -1;
}
function r0(e, t, r) {
  if (dc(r, "cartesian2d")) {
    var n = t,
      i = r.getArea();
    return {
      x: e ? n.x : i.x,
      y: e ? i.y : n.y,
      width: e ? n.width : i.width,
      height: e ? i.height : n.height,
    };
  } else {
    var i = r.getArea(),
      a = t;
    return {
      cx: i.cx,
      cy: i.cy,
      r0: e ? i.r0 : a.r0,
      r: e ? i.r : a.r,
      startAngle: e ? a.startAngle : 0,
      endAngle: e ? a.endAngle : Math.PI * 2,
    };
  }
}
function TD(e, t, r) {
  var n = e.type === "polar" ? $r : Tt;
  return new n({ shape: r0(t, r, e), silent: !0, z2: 0 });
}
function n0(e) {
  (e.registerChartView(gD),
    e.registerSeriesModel(hD),
    e.registerLayout(e.PRIORITY.VISUAL.LAYOUT, Mt(lD, "bar")),
    e.registerLayout(e.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, uD("bar")),
    e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, qy("bar")),
    e.registerAction(
      { type: "changeAxisOrder", event: "changeAxisOrder", update: "update" },
      function (t, r) {
        var n = t.componentType || "series";
        r.eachComponent({ mainType: n, query: t }, function (i) {
          t.sortInfo && i.axis.setCategorySortInfo(t.sortInfo);
        });
      },
    ));
}
function CD(e, t) {
  function r(n, i) {
    var a = [];
    return (
      n.eachComponent(
        { mainType: "series", subType: e, query: i },
        function (o) {
          a.push(o.seriesIndex);
        },
      ),
      a
    );
  }
  M(
    [
      [e + "ToggleSelect", "toggleSelect"],
      [e + "Select", "select"],
      [e + "UnSelect", "unselect"],
    ],
    function (n) {
      t(n[0], function (i, a, o) {
        ((i = B({}, i)),
          o.dispatchAction(B(i, { type: n[1], seriesIndex: r(a, i) })));
      });
    },
  );
}
function qn(e, t, r, n, i) {
  var a = e + t;
  r.isSilent(a) ||
    n.eachComponent({ mainType: "series", subType: "pie" }, function (o) {
      for (
        var s = o.seriesIndex, l = o.option.selectedMap, u = i.selected, f = 0;
        f < u.length;
        f++
      )
        if (u[f].seriesIndex === s) {
          var h = o.getData(),
            v = Rn(h, i.fromActionPayload);
          r.trigger(a, {
            type: a,
            seriesId: o.id,
            name: W(v) ? h.getName(v[0]) : h.getName(v),
            selected: U(l) ? l : B({}, l),
          });
        }
    });
}
function DD(e, t, r) {
  e.on("selectchanged", function (n) {
    var i = r.getModel();
    n.isFromClick
      ? (qn("map", "selectchanged", t, i, n),
        qn("pie", "selectchanged", t, i, n))
      : n.fromAction === "select"
        ? (qn("map", "selected", t, i, n), qn("pie", "selected", t, i, n))
        : n.fromAction === "unselect" &&
          (qn("map", "unselected", t, i, n), qn("pie", "unselected", t, i, n));
  });
}
var Fd = Math.PI * 2,
  bo = Math.PI / 180;
function MD(e, t, r) {
  t.eachSeriesByType(e, function (n) {
    var i = n.getData(),
      a = i.mapDimension("value"),
      o = BT(n, r),
      s = o.cx,
      l = o.cy,
      u = o.r,
      f = o.r0,
      h = o.viewRect,
      v = -n.get("startAngle") * bo,
      c = n.get("endAngle"),
      d = n.get("padAngle") * bo;
    c = c === "auto" ? v - Fd : -c * bo;
    var p = n.get("minAngle") * bo,
      m = p + d,
      g = 0;
    i.each(a, function (V) {
      !isNaN(V) && g++;
    });
    var y = i.getSum(a),
      _ = (Math.PI / (y || g)) * 2,
      b = n.get("clockwise"),
      w = n.get("roseType"),
      S = n.get("stillShowZeroSum"),
      x = i.getDataExtent(a);
    x[0] = 0;
    var T = b ? 1 : -1,
      D = [v, c],
      A = (T * d) / 2;
    (sm(D, !b), (v = D[0]), (c = D[1]));
    var C = i0(n);
    ((C.startAngle = v),
      (C.endAngle = c),
      (C.clockwise = b),
      (C.cx = s),
      (C.cy = l),
      (C.r = u),
      (C.r0 = f));
    var I = Math.abs(c - v),
      L = I,
      P = 0,
      k = v;
    if (
      (i.setLayout({ viewRect: h, r: u }),
      i.each(a, function (V, R) {
        var O;
        if (isNaN(V)) {
          i.setItemLayout(R, {
            angle: NaN,
            startAngle: NaN,
            endAngle: NaN,
            clockwise: b,
            cx: s,
            cy: l,
            r0: f,
            r: w ? NaN : u,
          });
          return;
        }
        (w !== "area" ? (O = y === 0 && S ? _ : V * _) : (O = I / g),
          O < m ? ((O = m), (L -= m)) : (P += V));
        var z = k + T * O,
          F = 0,
          N = 0;
        (d > O ? ((F = k + (T * O) / 2), (N = F)) : ((F = k + A), (N = z - A)),
          i.setItemLayout(R, {
            angle: O,
            startAngle: F,
            endAngle: N,
            clockwise: b,
            cx: s,
            cy: l,
            r0: f,
            r: w ? cf(V, x, [f, u]) : u,
          }),
          (k = z));
      }),
      L < Fd && g)
    )
      if (L <= 0.001) {
        var E = I / g;
        i.each(a, function (V, R) {
          if (!isNaN(V)) {
            var O = i.getItemLayout(R);
            O.angle = E;
            var z = 0,
              F = 0;
            (E < d
              ? ((z = v + T * (R + 1 / 2) * E), (F = z))
              : ((z = v + T * R * E + A), (F = v + T * (R + 1) * E - A)),
              (O.startAngle = z),
              (O.endAngle = F));
          }
        });
      } else
        ((_ = L / P),
          (k = v),
          i.each(a, function (V, R) {
            if (!isNaN(V)) {
              var O = i.getItemLayout(R),
                z = O.angle === m ? m : V * _,
                F = 0,
                N = 0;
              (z < d
                ? ((F = k + (T * z) / 2), (N = F))
                : ((F = k + A), (N = k + T * z - A)),
                (O.startAngle = F),
                (O.endAngle = N),
                (k += T * z));
            }
          }));
  });
}
var i0 = _t();
function AD(e) {
  return {
    seriesType: e,
    reset: function (t, r) {
      var n = r.findComponents({ mainType: "legend" });
      if (!(!n || !n.length)) {
        var i = t.getData();
        i.filterSelf(function (a) {
          for (var o = i.getName(a), s = 0; s < n.length; s++)
            if (!n[s].isSelected(o)) return !1;
          return !0;
        });
      }
    },
  };
}
function a0(e, t, r, n, i, a, o, s) {
  var l = i - e,
    u = a - t,
    f = r - e,
    h = n - t,
    v = Math.sqrt(f * f + h * h);
  ((f /= v), (h /= v));
  var c = l * f + u * h,
    d = c / v;
  d *= v;
  var p = (o[0] = e + d * f),
    m = (o[1] = t + d * h);
  return Math.sqrt((p - i) * (p - i) + (m - a) * (m - a));
}
var Ir = new J(),
  wt = new J(),
  Ft = new J(),
  Pr = new J(),
  Ue = new J(),
  Ss = [],
  Zt = new J();
function LD(e, t) {
  if (t <= 180 && t > 0) {
    ((t = (t / 180) * Math.PI),
      Ir.fromArray(e[0]),
      wt.fromArray(e[1]),
      Ft.fromArray(e[2]),
      J.sub(Pr, Ir, wt),
      J.sub(Ue, Ft, wt));
    var r = Pr.len(),
      n = Ue.len();
    if (!(r < 0.001 || n < 0.001)) {
      (Pr.scale(1 / r), Ue.scale(1 / n));
      var i = Pr.dot(Ue),
        a = Math.cos(t);
      if (a < i) {
        var o = a0(wt.x, wt.y, Ft.x, Ft.y, Ir.x, Ir.y, Ss);
        (Zt.fromArray(Ss), Zt.scaleAndAdd(Ue, o / Math.tan(Math.PI - t)));
        var s =
          Ft.x !== wt.x
            ? (Zt.x - wt.x) / (Ft.x - wt.x)
            : (Zt.y - wt.y) / (Ft.y - wt.y);
        if (isNaN(s)) return;
        (s < 0 ? J.copy(Zt, wt) : s > 1 && J.copy(Zt, Ft), Zt.toArray(e[1]));
      }
    }
  }
}
function ID(e, t, r) {
  if (r <= 180 && r > 0) {
    ((r = (r / 180) * Math.PI),
      Ir.fromArray(e[0]),
      wt.fromArray(e[1]),
      Ft.fromArray(e[2]),
      J.sub(Pr, wt, Ir),
      J.sub(Ue, Ft, wt));
    var n = Pr.len(),
      i = Ue.len();
    if (!(n < 0.001 || i < 0.001)) {
      (Pr.scale(1 / n), Ue.scale(1 / i));
      var a = Pr.dot(t),
        o = Math.cos(r);
      if (a < o) {
        var s = a0(wt.x, wt.y, Ft.x, Ft.y, Ir.x, Ir.y, Ss);
        Zt.fromArray(Ss);
        var l = Math.PI / 2,
          u = Math.acos(Ue.dot(t)),
          f = l + u - r;
        if (f >= l) J.copy(Zt, Ft);
        else {
          Zt.scaleAndAdd(Ue, s / Math.tan(Math.PI / 2 - f));
          var h =
            Ft.x !== wt.x
              ? (Zt.x - wt.x) / (Ft.x - wt.x)
              : (Zt.y - wt.y) / (Ft.y - wt.y);
          if (isNaN(h)) return;
          h < 0 ? J.copy(Zt, wt) : h > 1 && J.copy(Zt, Ft);
        }
        Zt.toArray(e[1]);
      }
    }
  }
}
function uu(e, t, r, n) {
  var i = r === "normal",
    a = i ? e : e.ensureState(r);
  a.ignore = t;
  var o = n.get("smooth");
  (o && o === !0 && (o = 0.3),
    (a.shape = a.shape || {}),
    o > 0 && (a.shape.smooth = o));
  var s = n.getModel("lineStyle").getLineStyle();
  i ? e.useStyle(s) : (a.style = s);
}
function PD(e, t) {
  var r = t.smooth,
    n = t.points;
  if (n)
    if ((e.moveTo(n[0][0], n[0][1]), r > 0 && n.length >= 3)) {
      var i = ju(n[0], n[1]),
        a = ju(n[1], n[2]);
      if (!i || !a) {
        (e.lineTo(n[1][0], n[1][1]), e.lineTo(n[2][0], n[2][1]));
        return;
      }
      var o = Math.min(i, a) * r,
        s = wl([], n[1], n[0], o / i),
        l = wl([], n[1], n[2], o / a),
        u = wl([], s, l, 0.5);
      (e.bezierCurveTo(s[0], s[1], s[0], s[1], u[0], u[1]),
        e.bezierCurveTo(l[0], l[1], l[0], l[1], n[2][0], n[2][1]));
    } else for (var f = 1; f < n.length; f++) e.lineTo(n[f][0], n[f][1]);
}
function kD(e, t, r) {
  var n = e.getTextGuideLine(),
    i = e.getTextContent();
  if (!i) {
    n && e.removeTextGuideLine();
    return;
  }
  for (
    var a = t.normal, o = a.get("show"), s = i.ignore, l = 0;
    l < ls.length;
    l++
  ) {
    var u = ls[l],
      f = t[u],
      h = u === "normal";
    if (f) {
      var v = f.get("show"),
        c = h ? s : K(i.states[u] && i.states[u].ignore, s);
      if (c || !K(v, o)) {
        var d = h ? n : n && n.states[u];
        (d && (d.ignore = !0), n && uu(n, !0, u, f));
        continue;
      }
      (n ||
        ((n = new Na()),
        e.setTextGuideLine(n),
        !h && (s || !o) && uu(n, !0, "normal", t.normal),
        e.stateProxy && (n.stateProxy = e.stateProxy)),
        uu(n, !1, u, f));
    }
  }
  if (n) {
    (dt(n.style, r), (n.style.fill = null));
    var p = a.get("showAbove"),
      m = (e.textGuideLineConfig = e.textGuideLineConfig || {});
    ((m.showAbove = p || !1), (n.buildPath = PD));
  }
}
function RD(e, t) {
  t = t || "labelLine";
  for (var r = { normal: e.getModel(t) }, n = 0; n < Te.length; n++) {
    var i = Te[n];
    r[i] = e.getModel([i, t]);
  }
  return r;
}
var zd = [
    "label",
    "labelLine",
    "layoutOption",
    "priority",
    "defaultAttr",
    "marginForce",
    "minMarginForce",
    "marginDefault",
    "suggestIgnore",
  ],
  ED = 1,
  ws = 2,
  o0 = ED | ws;
function xs(e, t, r) {
  ((r = r || o0), t ? (e.dirty |= r) : (e.dirty &= ~r));
}
function s0(e, t) {
  return ((t = t || o0), e.dirty == null || !!(e.dirty & t));
}
function Ur(e) {
  if (e) return (s0(e) && l0(e, e.label, e), e);
}
function l0(e, t, r) {
  var n = t.getComputedTransform();
  e.transform = $h(e.transform, n);
  var i = (e.localRect = Sa(e.localRect, t.getBoundingRect())),
    a = t.style,
    o = a.margin,
    s = r && r.marginForce,
    l = r && r.minMarginForce,
    u = r && r.marginDefault,
    f = a.__marginType;
  f == null && u && ((o = u), (f = oi.textMargin));
  for (var h = 0; h < 4; h++)
    fu[h] =
      f === oi.minMargin && l && l[h] != null
        ? l[h]
        : s && s[h] != null
          ? s[h]
          : o
            ? o[h]
            : 0;
  f === oi.textMargin && ps(i, fu, !1, !1);
  var v = (e.rect = Sa(e.rect, i));
  return (
    n && v.applyTransform(n),
    f === oi.minMargin && ps(v, fu, !1, !1),
    (e.axisAligned = Yh(n)),
    ((e.label = e.label || {}).ignore = t.ignore),
    xs(e, !1),
    xs(e, !0, ws),
    e
  );
}
var fu = [0, 0, 0, 0];
function OD(e, t, r) {
  return (
    (e.transform = $h(e.transform, r)),
    (e.localRect = Sa(e.localRect, t)),
    (e.rect = Sa(e.rect, t)),
    r && e.rect.applyTransform(r),
    (e.axisAligned = Yh(r)),
    (e.obb = void 0),
    ((e.label = e.label || {}).ignore = !1),
    e
  );
}
function BD(e, t) {
  if (e) {
    ((e.label.x += t.x), (e.label.y += t.y), e.label.markRedraw());
    var r = e.transform;
    r && ((r[4] += t.x), (r[5] += t.y));
    var n = e.rect;
    n && ((n.x += t.x), (n.y += t.y));
    var i = e.obb;
    i && i.fromBoundingRect(e.localRect, r);
  }
}
function Gd(e, t) {
  for (var r = 0; r < zd.length; r++) {
    var n = zd[r];
    e[n] == null && (e[n] = t[n]);
  }
  return Ur(e);
}
function Hd(e) {
  var t = e.obb;
  return (
    (!t || s0(e, ws)) &&
      ((e.obb = t = t || new Fm()),
      t.fromBoundingRect(e.localRect, e.transform),
      xs(e, !1, ws)),
    t
  );
}
function ND(e, t, r, n, i) {
  var a = e.length,
    o = Ar[t],
    s = vi[t];
  if (a < 2) return !1;
  e.sort(function (x, T) {
    return x.rect[o] - T.rect[o];
  });
  for (var l = 0, u, f = !1, h = 0; h < a; h++) {
    var v = e[h],
      c = v.rect;
    ((u = c[o] - l),
      u < 0 && ((c[o] -= u), (v.label[o] -= u), (f = !0)),
      (l = c[o] + c[s]));
  }
  var d = e[0],
    p = e[a - 1],
    m,
    g;
  (y(),
    m < 0 && w(-m, 0.8),
    g < 0 && w(g, 0.8),
    y(),
    _(m, g, 1),
    _(g, m, -1),
    y(),
    m < 0 && S(-m),
    g < 0 && S(g));
  function y() {
    ((m = d.rect[o] - r), (g = n - p.rect[o] - p.rect[s]));
  }
  function _(x, T, D) {
    if (x < 0) {
      var A = Math.min(T, -x);
      if (A > 0) {
        b(A * D, 0, a);
        var C = A + x;
        C < 0 && w(-C * D, 1);
      } else w(-x * D, 1);
    }
  }
  function b(x, T, D) {
    x !== 0 && (f = !0);
    for (var A = T; A < D; A++) {
      var C = e[A],
        I = C.rect;
      ((I[o] += x), (C.label[o] += x));
    }
  }
  function w(x, T) {
    for (var D = [], A = 0, C = 1; C < a; C++) {
      var I = e[C - 1].rect,
        L = Math.max(e[C].rect[o] - I[o] - I[s], 0);
      (D.push(L), (A += L));
    }
    if (A) {
      var P = Math.min(Math.abs(x) / A, T);
      if (x > 0)
        for (var C = 0; C < a - 1; C++) {
          var k = D[C] * P;
          b(k, 0, C + 1);
        }
      else
        for (var C = a - 1; C > 0; C--) {
          var k = D[C - 1] * P;
          b(-k, C, a);
        }
    }
  }
  function S(x) {
    var T = x < 0 ? -1 : 1;
    x = Math.abs(x);
    for (var D = Math.ceil(x / (a - 1)), A = 0; A < a - 1; A++)
      if ((T > 0 ? b(D, 0, A + 1) : b(-D, a - A - 1, a), (x -= D), x <= 0))
        return;
  }
  return f;
}
function FD(e) {
  var t = [];
  e.sort(function (u, f) {
    return (
      (f.suggestIgnore ? 1 : 0) - (u.suggestIgnore ? 1 : 0) ||
      f.priority - u.priority
    );
  });
  function r(u) {
    if (!u.ignore) {
      var f = u.ensureState("emphasis");
      f.ignore == null && (f.ignore = !1);
    }
    u.ignore = !0;
  }
  for (var n = 0; n < e.length; n++) {
    var i = Ur(e[n]);
    if (!i.label.ignore) {
      for (var a = i.label, o = i.labelLine, s = !1, l = 0; l < t.length; l++)
        if (mc(i, t[l], null, { touchThreshold: 0.05 })) {
          s = !0;
          break;
        }
      s ? (r(a), o && r(o)) : t.push(i);
    }
  }
}
function mc(e, t, r, n) {
  return !e ||
    !t ||
    (e.label && e.label.ignore) ||
    (t.label && t.label.ignore) ||
    !e.rect.intersect(t.rect, r, n)
    ? !1
    : e.axisAligned && t.axisAligned
      ? !0
      : Hd(e).intersect(Hd(t), r, n);
}
var zD = Math.PI / 180;
function Vd(e, t, r, n, i, a, o, s, l, u) {
  if (e.length < 2) return;
  function f(p) {
    for (var m = p.rB, g = m * m, y = 0; y < p.list.length; y++) {
      var _ = p.list[y],
        b = Math.abs(_.label.y - r),
        w = n + _.len,
        S = w * w,
        x = Math.sqrt(Math.abs((1 - (b * b) / g) * S)),
        T = t + (x + _.len2) * i,
        D = T - _.label.x,
        A = _.targetTextWidth - D * i;
      (u0(_, A, !0), (_.label.x = T));
    }
  }
  function h(p) {
    for (
      var m = { list: [], maxY: 0 }, g = { list: [], maxY: 0 }, y = 0;
      y < p.length;
      y++
    )
      if (p[y].labelAlignTo === "none") {
        var _ = p[y],
          b = _.label.y > r ? g : m,
          w = Math.abs(_.label.y - r);
        if (w >= b.maxY) {
          var S = _.label.x - t - _.len2 * i,
            x = n + _.len,
            T =
              Math.abs(S) < x ? Math.sqrt((w * w) / (1 - (S * S) / x / x)) : x;
          ((b.rB = T), (b.maxY = w));
        }
        b.list.push(_);
      }
    (f(m), f(g));
  }
  for (var v = e.length, c = 0; c < v; c++)
    if (e[c].position === "outer" && e[c].labelAlignTo === "labelLine") {
      var d = e[c].label.x - u;
      ((e[c].linePoints[1][0] += d), (e[c].label.x = u));
    }
  ND(e, 1, l, l + o) && h(e);
}
function GD(e, t, r, n, i, a, o, s) {
  for (
    var l = [], u = [], f = Number.MAX_VALUE, h = -Number.MAX_VALUE, v = 0;
    v < e.length;
    v++
  ) {
    var c = e[v].label;
    hu(e[v]) ||
      (c.x < t
        ? ((f = Math.min(f, c.x)), l.push(e[v]))
        : ((h = Math.max(h, c.x)), u.push(e[v])));
  }
  for (var v = 0; v < e.length; v++) {
    var d = e[v];
    if (!hu(d) && d.linePoints) {
      if (d.labelStyleWidth != null) continue;
      var c = d.label,
        p = d.linePoints,
        m = void 0;
      (d.labelAlignTo === "edge"
        ? c.x < t
          ? (m = p[2][0] - d.labelDistance - o - d.edgeDistance)
          : (m = o + i - d.edgeDistance - p[2][0] - d.labelDistance)
        : d.labelAlignTo === "labelLine"
          ? c.x < t
            ? (m = f - o - d.bleedMargin)
            : (m = o + i - h - d.bleedMargin)
          : c.x < t
            ? (m = c.x - o - d.bleedMargin)
            : (m = o + i - c.x - d.bleedMargin),
        (d.targetTextWidth = m),
        u0(d, m, !1));
    }
  }
  (Vd(u, t, r, n, 1, i, a, o, s, h), Vd(l, t, r, n, -1, i, a, o, s, f));
  for (var v = 0; v < e.length; v++) {
    var d = e[v];
    if (!hu(d) && d.linePoints) {
      var c = d.label,
        p = d.linePoints,
        g = d.labelAlignTo === "edge",
        y = c.style.padding,
        _ = y ? y[1] + y[3] : 0,
        b = c.style.backgroundColor ? 0 : _,
        w = d.rect.width + b,
        S = p[1][0] - p[2][0];
      (g
        ? c.x < t
          ? (p[2][0] = o + d.edgeDistance + w + d.labelDistance)
          : (p[2][0] = o + i - d.edgeDistance - w - d.labelDistance)
        : (c.x < t
            ? (p[2][0] = c.x + d.labelDistance)
            : (p[2][0] = c.x - d.labelDistance),
          (p[1][0] = p[2][0] + S)),
        (p[1][1] = p[2][1] = c.y));
    }
  }
}
function u0(e, t, r) {
  if (e.labelStyleWidth == null) {
    var n = e.label,
      i = n.style,
      a = e.rect,
      o = i.backgroundColor,
      s = i.padding,
      l = s ? s[1] + s[3] : 0,
      u = i.overflow,
      f = a.width + (o ? 0 : l);
    if (t < f || r) {
      if (u && u.match("break")) {
        (n.setStyle("backgroundColor", null), n.setStyle("width", t - l));
        var h = n.getBoundingRect();
        (n.setStyle("width", Math.ceil(h.width)),
          n.setStyle("backgroundColor", o));
      } else {
        var v = t - l,
          c = t < f ? v : r ? (v > e.unconstrainedWidth ? null : v) : null;
        n.setStyle("width", c);
      }
      f0(a, n);
    }
  }
}
function f0(e, t) {
  ((Wd.rect = e), l0(Wd, t, HD));
}
var HD = { minMarginForce: [null, 0, null, 0], marginDefault: [1, 0, 1, 0] },
  Wd = {};
function hu(e) {
  return e.position === "center";
}
function VD(e) {
  var t = e.getData(),
    r = [],
    n,
    i,
    a = !1,
    o = (e.get("minShowLabelAngle") || 0) * zD,
    s = t.getLayout("viewRect"),
    l = t.getLayout("r"),
    u = s.width,
    f = s.x,
    h = s.y,
    v = s.height;
  function c(S) {
    S.ignore = !0;
  }
  function d(S) {
    if (!S.ignore) return !0;
    for (var x in S.states) if (S.states[x].ignore === !1) return !0;
    return !1;
  }
  (t.each(function (S) {
    var x = t.getItemGraphicEl(S),
      T = x.shape,
      D = x.getTextContent(),
      A = x.getTextGuideLine(),
      C = t.getItemModel(S),
      I = C.getModel("label"),
      L = I.get("position") || C.get(["emphasis", "label", "position"]),
      P = I.get("distanceToLabelLine"),
      k = I.get("alignTo"),
      E = mt(I.get("edgeDistance"), u),
      V = I.get("bleedMargin");
    V == null && (V = Math.min(u, v) > 200 ? 10 : 2);
    var R = C.getModel("labelLine"),
      O = R.get("length");
    O = mt(O, u);
    var z = R.get("length2");
    if (((z = mt(z, u)), Math.abs(T.endAngle - T.startAngle) < o)) {
      (M(D.states, c), (D.ignore = !0), A && (M(A.states, c), (A.ignore = !0)));
      return;
    }
    if (d(D)) {
      var F = (T.startAngle + T.endAngle) / 2,
        N = Math.cos(F),
        $ = Math.sin(F),
        nt,
        ft,
        Ot,
        Xt;
      ((n = T.cx), (i = T.cy));
      var Vt = L === "inside" || L === "inner";
      if (L === "center") ((nt = T.cx), (ft = T.cy), (Xt = "center"));
      else {
        var Bt = (Vt ? ((T.r + T.r0) / 2) * N : T.r * N) + n,
          Ct = (Vt ? ((T.r + T.r0) / 2) * $ : T.r * $) + i;
        if (((nt = Bt + N * 3), (ft = Ct + $ * 3), !Vt)) {
          var j = Bt + N * (O + l - T.r),
            it = Ct + $ * (O + l - T.r),
            Ne = j + (N < 0 ? -1 : 1) * z,
            Lt = it;
          (k === "edge"
            ? (nt = N < 0 ? f + E : f + u - E)
            : (nt = Ne + (N < 0 ? -P : P)),
            (ft = Lt),
            (Ot = [
              [Bt, Ct],
              [j, it],
              [Ne, Lt],
            ]));
        }
        Xt = Vt
          ? "center"
          : k === "edge"
            ? N > 0
              ? "right"
              : "left"
            : N > 0
              ? "left"
              : "right";
      }
      var gr = Math.PI,
        rr = 0,
        xi = I.get("rotate");
      if (vt(xi)) rr = xi * (gr / 180);
      else if (L === "center") rr = 0;
      else if (xi === "radial" || xi === !0) {
        var W_ = N < 0 ? -F + gr : -F;
        rr = W_;
      } else if (xi === "tangential" && L !== "outside" && L !== "outer") {
        var Nn = Math.atan2(N, $);
        Nn < 0 && (Nn = gr * 2 + Nn);
        var U_ = $ > 0;
        (U_ && (Nn = gr + Nn), (rr = Nn - gr));
      }
      if (
        ((a = !!rr),
        (D.x = nt),
        (D.y = ft),
        (D.rotation = rr),
        D.setStyle({ verticalAlign: "middle" }),
        Vt)
      ) {
        D.setStyle({ align: Xt });
        var gl = D.states.select;
        gl && ((gl.x += D.x), (gl.y += D.y));
      } else {
        var pl = new et(0, 0, 0, 0);
        (f0(pl, D),
          r.push({
            label: D,
            labelLine: A,
            position: L,
            len: O,
            len2: z,
            minTurnAngle: R.get("minTurnAngle"),
            maxSurfaceAngle: R.get("maxSurfaceAngle"),
            surfaceNormal: new J(N, $),
            linePoints: Ot,
            textAlign: Xt,
            labelDistance: P,
            labelAlignTo: k,
            edgeDistance: E,
            bleedMargin: V,
            rect: pl,
            unconstrainedWidth: pl.width,
            labelStyleWidth: D.style.width,
          }));
      }
      x.setTextConfig({ inside: Vt });
    }
  }),
    !a && e.get("avoidLabelOverlap") && GD(r, n, i, l, u, v, f, h));
  for (var p = 0; p < r.length; p++) {
    var m = r[p],
      g = m.label,
      y = m.labelLine,
      _ = isNaN(g.x) || isNaN(g.y);
    if (g) {
      (g.setStyle({ align: m.textAlign }),
        _ && (M(g.states, c), (g.ignore = !0)));
      var b = g.states.select;
      b && ((b.x += g.x), (b.y += g.y));
    }
    if (y) {
      var w = m.linePoints;
      _ || !w
        ? (M(y.states, c), (y.ignore = !0))
        : (LD(w, m.minTurnAngle),
          ID(w, m.surfaceNormal, m.maxSurfaceAngle),
          y.setShape({ points: w }),
          (g.__hostTarget.textGuideLineConfig = {
            anchor: new J(w[0][0], w[0][1]),
          }));
    }
  }
}
var WD = (function (e) {
    G(t, e);
    function t(r, n, i) {
      var a = e.call(this) || this;
      a.z2 = 2;
      var o = new Ht();
      return (a.setTextContent(o), a.updateData(r, n, i, !0), a);
    }
    return (
      (t.prototype.updateData = function (r, n, i, a) {
        var o = this,
          s = r.hostModel,
          l = r.getItemModel(n),
          u = l.getModel("emphasis"),
          f = r.getItemLayout(n),
          h = B(Zi(l.getModel("itemStyle"), f, !0), f);
        if (isNaN(h.startAngle)) {
          o.setShape(h);
          return;
        }
        if (a) {
          o.setShape(h);
          var v = s.getShallow("animationType");
          s.ecModel.ssr
            ? (we(o, { scaleX: 0, scaleY: 0 }, s, { dataIndex: n, isFrom: !0 }),
              (o.originX = h.cx),
              (o.originY = h.cy))
            : v === "scale"
              ? ((o.shape.r = f.r0), we(o, { shape: { r: f.r } }, s, n))
              : i != null
                ? (o.setShape({ startAngle: i, endAngle: i }),
                  we(
                    o,
                    {
                      shape: { startAngle: f.startAngle, endAngle: f.endAngle },
                    },
                    s,
                    n,
                  ))
                : ((o.shape.endAngle = f.startAngle),
                  jt(o, { shape: { endAngle: f.endAngle } }, s, n));
        } else (Hh(o), jt(o, { shape: h }, s, n));
        (o.useStyle(r.getItemVisual(n, "style")), vs(o, l));
        var c = (f.startAngle + f.endAngle) / 2,
          d = s.get("selectedOffset"),
          p = Math.cos(c) * d,
          m = Math.sin(c) * d,
          g = l.getShallow("cursor");
        (g && o.attr("cursor", g),
          this._updateLabel(s, r, n),
          (o.ensureState("emphasis").shape = B(
            { r: f.r + ((u.get("scale") && u.get("scaleSize")) || 0) },
            Zi(u.getModel("itemStyle"), f),
          )),
          B(o.ensureState("select"), {
            x: p,
            y: m,
            shape: Zi(l.getModel(["select", "itemStyle"]), f),
          }),
          B(o.ensureState("blur"), {
            shape: Zi(l.getModel(["blur", "itemStyle"]), f),
          }));
        var y = o.getTextGuideLine(),
          _ = o.getTextContent();
        (y && B(y.ensureState("select"), { x: p, y: m }),
          B(_.ensureState("select"), { x: p, y: m }),
          _a(this, u.get("focus"), u.get("blurScope"), u.get("disabled")));
      }),
      (t.prototype._updateLabel = function (r, n, i) {
        var a = this,
          o = n.getItemModel(i),
          s = o.getModel("labelLine"),
          l = n.getItemVisual(i, "style"),
          u = l && l.fill,
          f = l && l.opacity;
        Fa(a, za(o), {
          labelFetcher: n.hostModel,
          labelDataIndex: i,
          inheritColor: u,
          defaultOpacity: f,
          defaultText: r.getFormattedLabel(i, "normal") || n.getName(i),
        });
        var h = a.getTextContent();
        (a.setTextConfig({ position: null, rotation: null }),
          h.attr({ z2: 10 }));
        var v = o.get(["label", "position"]);
        if (v !== "outside" && v !== "outer") a.removeTextGuideLine();
        else {
          var c = this.getTextGuideLine();
          (c || ((c = new Na()), this.setTextGuideLine(c)),
            kD(this, RD(o), {
              stroke: u,
              opacity: Cn(s.get(["lineStyle", "opacity"]), f, 1),
            }));
        }
      }),
      t
    );
  })($r),
  UD = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.ignoreLabelLineUpdate = !0), r);
    }
    return (
      (t.prototype.render = function (r, n, i, a) {
        var o = r.getData(),
          s = this._data,
          l = this.group,
          u;
        if (!s && o.count() > 0) {
          for (
            var f = o.getItemLayout(0), h = 1;
            isNaN(f && f.startAngle) && h < o.count();
            ++h
          )
            f = o.getItemLayout(h);
          f && (u = f.startAngle);
        }
        if (
          (this._emptyCircleSector && l.remove(this._emptyCircleSector),
          o.count() === 0 && r.get("showEmptyCircle"))
        ) {
          var v = i0(r),
            c = new $r({ shape: at(v) });
          (c.useStyle(r.getModel("emptyCircleStyle").getItemStyle()),
            (this._emptyCircleSector = c),
            l.add(c));
        }
        (o
          .diff(s)
          .add(function (d) {
            var p = new WD(o, d, u);
            (o.setItemGraphicEl(d, p), l.add(p));
          })
          .update(function (d, p) {
            var m = s.getItemGraphicEl(p);
            (m.updateData(o, d, u),
              m.off("click"),
              l.add(m),
              o.setItemGraphicEl(d, m));
          })
          .remove(function (d) {
            var p = s.getItemGraphicEl(d);
            oa(p, r, d);
          })
          .execute(),
          VD(r),
          r.get("animationTypeUpdate") !== "expansion" && (this._data = o));
      }),
      (t.prototype.dispose = function () {}),
      (t.prototype.containPoint = function (r, n) {
        var i = n.getData(),
          a = i.getItemLayout(0);
        if (a) {
          var o = r[0] - a.cx,
            s = r[1] - a.cy,
            l = Math.sqrt(o * o + s * s);
          return l <= a.r && l >= a.r0;
        }
      }),
      (t.type = "pie"),
      t
    );
  })(xe);
function YD(e, t, r) {
  t = (W(t) && { coordDimensions: t }) || B({ encodeDefine: e.getEncode() }, t);
  var n = e.getSource(),
    i = py(n, t).dimensions,
    a = new dy(i, e);
  return (a.initData(n, r), a);
}
var $D = (function () {
    function e(t, r) {
      ((this._getDataWithEncodedVisual = t), (this._getRawData = r));
    }
    return (
      (e.prototype.getAllNames = function () {
        var t = this._getRawData();
        return t.mapArray(t.getName);
      }),
      (e.prototype.containName = function (t) {
        var r = this._getRawData();
        return r.indexOfName(t) >= 0;
      }),
      (e.prototype.indexOfName = function (t) {
        var r = this._getDataWithEncodedVisual();
        return r.indexOfName(t);
      }),
      (e.prototype.getItemVisual = function (t, r) {
        var n = this._getDataWithEncodedVisual();
        return n.getItemVisual(t, r);
      }),
      e
    );
  })(),
  XD = _t(),
  h0 = (function (e) {
    G(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.init = function (r) {
        (e.prototype.init.apply(this, arguments),
          (this.legendVisualProvider = new $D(
            ct(this.getData, this),
            ct(this.getRawData, this),
          )),
          this._defaultLabelLine(r));
      }),
      (t.prototype.mergeOption = function () {
        e.prototype.mergeOption.apply(this, arguments);
      }),
      (t.prototype.getInitialData = function () {
        return YD(this, {
          coordDimensions: ["value"],
          encodeDefaulter: Mt(bx, this),
        });
      }),
      (t.prototype.getDataParams = function (r) {
        var n = this.getData(),
          i = XD(n),
          a = i.seats;
        if (!a) {
          var o = [];
          (n.each(n.mapDimension("value"), function (l) {
            o.push(l);
          }),
            (a = i.seats = xS(o, n.hostModel.get("percentPrecision"))));
        }
        var s = e.prototype.getDataParams.call(this, r);
        return ((s.percent = a[r] || 0), s.$vars.push("percent"), s);
      }),
      (t.prototype._defaultLabelLine = function (r) {
        df(r, "labelLine", ["show"]);
        var n = r.labelLine,
          i = r.emphasis.labelLine;
        ((n.show = n.show && r.label.show),
          (i.show = i.show && r.emphasis.label.show));
      }),
      (t.type = "series.pie"),
      (t.defaultOption = {
        z: 2,
        legendHoverLink: !0,
        colorBy: "data",
        center: ["50%", "50%"],
        radius: [0, "50%"],
        clockwise: !0,
        startAngle: 90,
        endAngle: "auto",
        padAngle: 0,
        minAngle: 0,
        minShowLabelAngle: 0,
        selectedOffset: 10,
        percentPrecision: 2,
        stillShowZeroSum: !0,
        coordinateSystemUsage: "box",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: null,
        height: null,
        label: {
          rotate: 0,
          show: !0,
          overflow: "truncate",
          position: "outer",
          alignTo: "none",
          edgeDistance: "25%",
          distanceToLabelLine: 5,
        },
        labelLine: {
          show: !0,
          length: 15,
          length2: 30,
          smooth: !1,
          minTurnAngle: 90,
          maxSurfaceAngle: 90,
          lineStyle: { width: 1, type: "solid" },
        },
        itemStyle: { borderWidth: 1, borderJoin: "round" },
        showEmptyCircle: !0,
        emptyCircleStyle: { color: "lightgray", opacity: 1 },
        labelLayout: { hideOverlap: !0 },
        emphasis: { scale: !0, scaleSize: 5 },
        avoidLabelOverlap: !0,
        animationType: "expansion",
        animationDuration: 1e3,
        animationTypeUpdate: "transition",
        animationEasingUpdate: "cubicInOut",
        animationDurationUpdate: 500,
        animationEasing: "cubicInOut",
      }),
      t
    );
  })(Pe);
Xx({
  fullType: h0.type,
  getCoord2: function (e) {
    return e.getShallow("center");
  },
});
function qD(e) {
  return {
    seriesType: e,
    reset: function (t, r) {
      var n = t.getData();
      n.filterSelf(function (i) {
        var a = n.mapDimension("value"),
          o = n.get(a, i);
        return !(vt(o) && !isNaN(o) && o < 0);
      });
    },
  };
}
function ZD(e) {
  (e.registerChartView(UD),
    e.registerSeriesModel(h0),
    CD("pie", e.registerAction),
    e.registerLayout(Mt(MD, "pie")),
    e.registerProcessor(AD("pie")),
    e.registerProcessor(qD("pie")));
}
var Zn = (function () {
    function e(t, r) {
      ((this.target = t), (this.topTarget = r && r.topTarget));
    }
    return e;
  })(),
  KD = (function () {
    function e(t) {
      ((this.handler = t),
        t.on("mousedown", this._dragStart, this),
        t.on("mousemove", this._drag, this),
        t.on("mouseup", this._dragEnd, this));
    }
    return (
      (e.prototype._dragStart = function (t) {
        for (var r = t.target; r && !r.draggable; )
          r = r.parent || r.__hostTarget;
        r &&
          ((this._draggingTarget = r),
          (r.dragging = !0),
          (this._x = t.offsetX),
          (this._y = t.offsetY),
          this.handler.dispatchToElement(new Zn(r, t), "dragstart", t.event));
      }),
      (e.prototype._drag = function (t) {
        var r = this._draggingTarget;
        if (r) {
          var n = t.offsetX,
            i = t.offsetY,
            a = n - this._x,
            o = i - this._y;
          ((this._x = n),
            (this._y = i),
            r.drift(a, o, t),
            this.handler.dispatchToElement(new Zn(r, t), "drag", t.event));
          var s = this.handler.findHover(n, i, r).target,
            l = this._dropTarget;
          ((this._dropTarget = s),
            r !== s &&
              (l &&
                s !== l &&
                this.handler.dispatchToElement(
                  new Zn(l, t),
                  "dragleave",
                  t.event,
                ),
              s &&
                s !== l &&
                this.handler.dispatchToElement(
                  new Zn(s, t),
                  "dragenter",
                  t.event,
                )));
        }
      }),
      (e.prototype._dragEnd = function (t) {
        var r = this._draggingTarget;
        (r && (r.dragging = !1),
          this.handler.dispatchToElement(new Zn(r, t), "dragend", t.event),
          this._dropTarget &&
            this.handler.dispatchToElement(
              new Zn(this._dropTarget, t),
              "drop",
              t.event,
            ),
          (this._draggingTarget = null),
          (this._dropTarget = null));
      }),
      e
    );
  })(),
  jD = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
  cu = [],
  QD = tt.browser.firefox && +tt.browser.version.split(".")[0] < 39;
function Ff(e, t, r, n) {
  return (
    (r = r || {}),
    n
      ? Ud(e, t, r)
      : QD && t.layerX != null && t.layerX !== t.offsetX
        ? ((r.zrX = t.layerX), (r.zrY = t.layerY))
        : t.offsetX != null
          ? ((r.zrX = t.offsetX), (r.zrY = t.offsetY))
          : Ud(e, t, r),
    r
  );
}
function Ud(e, t, r) {
  if (tt.domSupported && e.getBoundingClientRect) {
    var n = t.clientX,
      i = t.clientY;
    if (yy(e)) {
      var a = e.getBoundingClientRect();
      ((r.zrX = n - a.left), (r.zrY = i - a.top));
      return;
    } else if (Af(cu, e, n, i)) {
      ((r.zrX = cu[0]), (r.zrY = cu[1]));
      return;
    }
  }
  r.zrX = r.zrY = 0;
}
function yc(e) {
  return e || window.event;
}
function ve(e, t, r) {
  if (((t = yc(t)), t.zrX != null)) return t;
  var n = t.type,
    i = n && n.indexOf("touch") >= 0;
  if (i) {
    var o = n !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && Ff(e, o, t, r);
  } else {
    Ff(e, t, t, r);
    var a = JD(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return (
    t.which == null &&
      s !== void 0 &&
      jD.test(t.type) &&
      (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0),
    t
  );
}
function JD(e) {
  var t = e.wheelDelta;
  if (t) return t;
  var r = e.deltaX,
    n = e.deltaY;
  if (r == null || n == null) return t;
  var i = Math.abs(n !== 0 ? n : r),
    a = n > 0 ? -1 : n < 0 ? 1 : r > 0 ? -1 : 1;
  return 3 * i * a;
}
function tM(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function eM(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
var c0 = function (e) {
    (e.preventDefault(), e.stopPropagation(), (e.cancelBubble = !0));
  },
  rM = (function () {
    function e() {
      this._track = [];
    }
    return (
      (e.prototype.recognize = function (t, r, n) {
        return (this._doTrack(t, r, n), this._recognize(t));
      }),
      (e.prototype.clear = function () {
        return ((this._track.length = 0), this);
      }),
      (e.prototype._doTrack = function (t, r, n) {
        var i = t.touches;
        if (i) {
          for (
            var a = { points: [], touches: [], target: r, event: t },
              o = 0,
              s = i.length;
            o < s;
            o++
          ) {
            var l = i[o],
              u = Ff(n, l, {});
            (a.points.push([u.zrX, u.zrY]), a.touches.push(l));
          }
          this._track.push(a);
        }
      }),
      (e.prototype._recognize = function (t) {
        for (var r in vu)
          if (vu.hasOwnProperty(r)) {
            var n = vu[r](this._track, t);
            if (n) return n;
          }
      }),
      e
    );
  })();
function Yd(e) {
  var t = e[1][0] - e[0][0],
    r = e[1][1] - e[0][1];
  return Math.sqrt(t * t + r * r);
}
function nM(e) {
  return [(e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2];
}
var vu = {
    pinch: function (e, t) {
      var r = e.length;
      if (r) {
        var n = (e[r - 1] || {}).points,
          i = (e[r - 2] || {}).points || n;
        if (i && i.length > 1 && n && n.length > 1) {
          var a = Yd(n) / Yd(i);
          (!isFinite(a) && (a = 1), (t.pinchScale = a));
          var o = nM(n);
          return (
            (t.pinchX = o[0]),
            (t.pinchY = o[1]),
            { type: "pinch", target: e[0].target, event: t }
          );
        }
      }
    },
  },
  v0 = "silent";
function iM(e, t, r) {
  return {
    type: e,
    event: r,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: r.zrX,
    offsetY: r.zrY,
    gestureEvent: r.gestureEvent,
    pinchX: r.pinchX,
    pinchY: r.pinchY,
    pinchScale: r.pinchScale,
    wheelDelta: r.zrDelta,
    zrByTouch: r.zrByTouch,
    which: r.which,
    stop: aM,
  };
}
function aM() {
  c0(this.event);
}
var oM = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.handler = null), r);
    }
    return (
      (t.prototype.dispose = function () {}),
      (t.prototype.setCursor = function () {}),
      t
    );
  })(er),
  Ri = (function () {
    function e(t, r) {
      ((this.x = t), (this.y = r));
    }
    return e;
  })(),
  sM = [
    "click",
    "dblclick",
    "mousewheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu",
  ],
  du = new et(0, 0, 0, 0),
  d0 = (function (e) {
    G(t, e);
    function t(r, n, i, a, o) {
      var s = e.call(this) || this;
      return (
        (s._hovered = new Ri(0, 0)),
        (s.storage = r),
        (s.painter = n),
        (s.painterRoot = a),
        (s._pointerSize = o),
        (i = i || new oM()),
        (s.proxy = null),
        s.setHandlerProxy(i),
        (s._draggingMgr = new KD(s)),
        s
      );
    }
    return (
      (t.prototype.setHandlerProxy = function (r) {
        (this.proxy && this.proxy.dispose(),
          r &&
            (M(
              sM,
              function (n) {
                r.on && r.on(n, this[n], this);
              },
              this,
            ),
            (r.handler = this)),
          (this.proxy = r));
      }),
      (t.prototype.mousemove = function (r) {
        var n = r.zrX,
          i = r.zrY,
          a = p0(this, n, i),
          o = this._hovered,
          s = o.target;
        s && !s.__zr && ((o = this.findHover(o.x, o.y)), (s = o.target));
        var l = (this._hovered = a ? new Ri(n, i) : this.findHover(n, i)),
          u = l.target,
          f = this.proxy;
        (f.setCursor && f.setCursor(u ? u.cursor : "default"),
          s && u !== s && this.dispatchToElement(o, "mouseout", r),
          this.dispatchToElement(l, "mousemove", r),
          u && u !== s && this.dispatchToElement(l, "mouseover", r));
      }),
      (t.prototype.mouseout = function (r) {
        var n = r.zrEventControl;
        (n !== "only_globalout" &&
          this.dispatchToElement(this._hovered, "mouseout", r),
          n !== "no_globalout" &&
            this.trigger("globalout", { type: "globalout", event: r }));
      }),
      (t.prototype.resize = function () {
        this._hovered = new Ri(0, 0);
      }),
      (t.prototype.dispatch = function (r, n) {
        var i = this[r];
        i && i.call(this, n);
      }),
      (t.prototype.dispose = function () {
        (this.proxy.dispose(),
          (this.storage = null),
          (this.proxy = null),
          (this.painter = null));
      }),
      (t.prototype.setCursorStyle = function (r) {
        var n = this.proxy;
        n.setCursor && n.setCursor(r);
      }),
      (t.prototype.dispatchToElement = function (r, n, i) {
        r = r || {};
        var a = r.target;
        if (!(a && a.silent)) {
          for (
            var o = "on" + n, s = iM(n, r, i);
            a &&
            (a[o] && (s.cancelBubble = !!a[o].call(a, s)),
            a.trigger(n, s),
            (a = a.__hostTarget ? a.__hostTarget : a.parent),
            !s.cancelBubble);

          );
          s.cancelBubble ||
            (this.trigger(n, s),
            this.painter &&
              this.painter.eachOtherLayer &&
              this.painter.eachOtherLayer(function (l) {
                (typeof l[o] == "function" && l[o].call(l, s),
                  l.trigger && l.trigger(n, s));
              }));
        }
      }),
      (t.prototype.findHover = function (r, n, i) {
        var a = this.storage.getDisplayList(),
          o = new Ri(r, n);
        if (($d(a, o, r, n, i), this._pointerSize && !o.target)) {
          for (
            var s = [],
              l = this._pointerSize,
              u = l / 2,
              f = new et(r - u, n - u, l, l),
              h = a.length - 1;
            h >= 0;
            h--
          ) {
            var v = a[h];
            v !== i &&
              !v.ignore &&
              !v.ignoreCoarsePointer &&
              (!v.parent || !v.parent.ignoreCoarsePointer) &&
              (du.copy(v.getBoundingRect()),
              v.transform && du.applyTransform(v.transform),
              du.intersect(f) && s.push(v));
          }
          if (s.length)
            for (
              var c = 4, d = Math.PI / 12, p = Math.PI * 2, m = 0;
              m < u;
              m += c
            )
              for (var g = 0; g < p; g += d) {
                var y = r + m * Math.cos(g),
                  _ = n + m * Math.sin(g);
                if (($d(s, o, y, _, i), o.target)) return o;
              }
        }
        return o;
      }),
      (t.prototype.processGesture = function (r, n) {
        this._gestureMgr || (this._gestureMgr = new rM());
        var i = this._gestureMgr;
        n === "start" && i.clear();
        var a = i.recognize(
          r,
          this.findHover(r.zrX, r.zrY, null).target,
          this.proxy.dom,
        );
        if ((n === "end" && i.clear(), a)) {
          var o = a.type;
          r.gestureEvent = o;
          var s = new Ri();
          ((s.target = a.target), this.dispatchToElement(s, o, a.event));
        }
      }),
      t
    );
  })(er);
M(
  ["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"],
  function (e) {
    d0.prototype[e] = function (t) {
      var r = t.zrX,
        n = t.zrY,
        i = p0(this, r, n),
        a,
        o;
      if (
        ((e !== "mouseup" || !i) &&
          ((a = this.findHover(r, n)), (o = a.target)),
        e === "mousedown")
      )
        ((this._downEl = o),
          (this._downPoint = [t.zrX, t.zrY]),
          (this._upEl = o));
      else if (e === "mouseup") this._upEl = o;
      else if (e === "click") {
        if (
          this._downEl !== this._upEl ||
          !this._downPoint ||
          ju(this._downPoint, [t.zrX, t.zrY]) > 4
        )
          return;
        this._downPoint = null;
      }
      this.dispatchToElement(a, e, t);
    };
  },
);
function lM(e, t, r) {
  if (e[e.rectHover ? "rectContain" : "contain"](t, r)) {
    for (var n = e, i = void 0, a = !1; n; ) {
      if ((n.ignoreClip && (a = !0), !a)) {
        var o = n.getClipPath();
        if (o && !o.contain(t, r)) return !1;
      }
      n.silent && (i = !0);
      var s = n.__hostTarget;
      n = s ? (n.ignoreHostSilent ? null : s) : n.parent;
    }
    return i ? v0 : !0;
  }
  return !1;
}
function $d(e, t, r, n, i) {
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a],
      s = void 0;
    if (
      o !== i &&
      !o.ignore &&
      (s = lM(o, r, n)) &&
      (!t.topTarget && (t.topTarget = o), s !== v0)
    ) {
      t.target = o;
      break;
    }
  }
}
function p0(e, t, r) {
  var n = e.painter;
  return t < 0 || t > n.getWidth() || r < 0 || r > n.getHeight();
}
var g0 = 32,
  Ei = 7;
function uM(e) {
  for (var t = 0; e >= g0; ) ((t |= e & 1), (e >>= 1));
  return e + t;
}
function Xd(e, t, r, n) {
  var i = t + 1;
  if (i === r) return 1;
  if (n(e[i++], e[t]) < 0) {
    for (; i < r && n(e[i], e[i - 1]) < 0; ) i++;
    fM(e, t, i);
  } else for (; i < r && n(e[i], e[i - 1]) >= 0; ) i++;
  return i - t;
}
function fM(e, t, r) {
  for (r--; t < r; ) {
    var n = e[t];
    ((e[t++] = e[r]), (e[r--] = n));
  }
}
function qd(e, t, r, n, i) {
  for (n === t && n++; n < r; n++) {
    for (var a = e[n], o = t, s = n, l; o < s; )
      ((l = (o + s) >>> 1), i(a, e[l]) < 0 ? (s = l) : (o = l + 1));
    var u = n - o;
    switch (u) {
      case 3:
        e[o + 3] = e[o + 2];
      case 2:
        e[o + 2] = e[o + 1];
      case 1:
        e[o + 1] = e[o];
        break;
      default:
        for (; u > 0; ) ((e[o + u] = e[o + u - 1]), u--);
    }
    e[o] = a;
  }
}
function pu(e, t, r, n, i, a) {
  var o = 0,
    s = 0,
    l = 1;
  if (a(e, t[r + i]) > 0) {
    for (s = n - i; l < s && a(e, t[r + i + l]) > 0; )
      ((o = l), (l = (l << 1) + 1), l <= 0 && (l = s));
    (l > s && (l = s), (o += i), (l += i));
  } else {
    for (s = i + 1; l < s && a(e, t[r + i - l]) <= 0; )
      ((o = l), (l = (l << 1) + 1), l <= 0 && (l = s));
    l > s && (l = s);
    var u = o;
    ((o = i - l), (l = i - u));
  }
  for (o++; o < l; ) {
    var f = o + ((l - o) >>> 1);
    a(e, t[r + f]) > 0 ? (o = f + 1) : (l = f);
  }
  return l;
}
function gu(e, t, r, n, i, a) {
  var o = 0,
    s = 0,
    l = 1;
  if (a(e, t[r + i]) < 0) {
    for (s = i + 1; l < s && a(e, t[r + i - l]) < 0; )
      ((o = l), (l = (l << 1) + 1), l <= 0 && (l = s));
    l > s && (l = s);
    var u = o;
    ((o = i - l), (l = i - u));
  } else {
    for (s = n - i; l < s && a(e, t[r + i + l]) >= 0; )
      ((o = l), (l = (l << 1) + 1), l <= 0 && (l = s));
    (l > s && (l = s), (o += i), (l += i));
  }
  for (o++; o < l; ) {
    var f = o + ((l - o) >>> 1);
    a(e, t[r + f]) < 0 ? (l = f) : (o = f + 1);
  }
  return l;
}
function hM(e, t) {
  var r = Ei,
    n,
    i,
    a = 0,
    o = [];
  ((n = []), (i = []));
  function s(c, d) {
    ((n[a] = c), (i[a] = d), (a += 1));
  }
  function l() {
    for (; a > 1; ) {
      var c = a - 2;
      if (
        (c >= 1 && i[c - 1] <= i[c] + i[c + 1]) ||
        (c >= 2 && i[c - 2] <= i[c] + i[c - 1])
      )
        i[c - 1] < i[c + 1] && c--;
      else if (i[c] > i[c + 1]) break;
      f(c);
    }
  }
  function u() {
    for (; a > 1; ) {
      var c = a - 2;
      (c > 0 && i[c - 1] < i[c + 1] && c--, f(c));
    }
  }
  function f(c) {
    var d = n[c],
      p = i[c],
      m = n[c + 1],
      g = i[c + 1];
    ((i[c] = p + g),
      c === a - 3 && ((n[c + 1] = n[c + 2]), (i[c + 1] = i[c + 2])),
      a--);
    var y = gu(e[m], e, d, p, 0, t);
    ((d += y),
      (p -= y),
      p !== 0 &&
        ((g = pu(e[d + p - 1], e, m, g, g - 1, t)),
        g !== 0 && (p <= g ? h(d, p, m, g) : v(d, p, m, g))));
  }
  function h(c, d, p, m) {
    var g = 0;
    for (g = 0; g < d; g++) o[g] = e[c + g];
    var y = 0,
      _ = p,
      b = c;
    if (((e[b++] = e[_++]), --m === 0)) {
      for (g = 0; g < d; g++) e[b + g] = o[y + g];
      return;
    }
    if (d === 1) {
      for (g = 0; g < m; g++) e[b + g] = e[_ + g];
      e[b + m] = o[y];
      return;
    }
    for (var w = r, S, x, T; ; ) {
      ((S = 0), (x = 0), (T = !1));
      do
        if (t(e[_], o[y]) < 0) {
          if (((e[b++] = e[_++]), x++, (S = 0), --m === 0)) {
            T = !0;
            break;
          }
        } else if (((e[b++] = o[y++]), S++, (x = 0), --d === 1)) {
          T = !0;
          break;
        }
      while ((S | x) < w);
      if (T) break;
      do {
        if (((S = gu(e[_], o, y, d, 0, t)), S !== 0)) {
          for (g = 0; g < S; g++) e[b + g] = o[y + g];
          if (((b += S), (y += S), (d -= S), d <= 1)) {
            T = !0;
            break;
          }
        }
        if (((e[b++] = e[_++]), --m === 0)) {
          T = !0;
          break;
        }
        if (((x = pu(o[y], e, _, m, 0, t)), x !== 0)) {
          for (g = 0; g < x; g++) e[b + g] = e[_ + g];
          if (((b += x), (_ += x), (m -= x), m === 0)) {
            T = !0;
            break;
          }
        }
        if (((e[b++] = o[y++]), --d === 1)) {
          T = !0;
          break;
        }
        w--;
      } while (S >= Ei || x >= Ei);
      if (T) break;
      (w < 0 && (w = 0), (w += 2));
    }
    if (((r = w), r < 1 && (r = 1), d === 1)) {
      for (g = 0; g < m; g++) e[b + g] = e[_ + g];
      e[b + m] = o[y];
    } else {
      if (d === 0) throw new Error();
      for (g = 0; g < d; g++) e[b + g] = o[y + g];
    }
  }
  function v(c, d, p, m) {
    var g = 0;
    for (g = 0; g < m; g++) o[g] = e[p + g];
    var y = c + d - 1,
      _ = m - 1,
      b = p + m - 1,
      w = 0,
      S = 0;
    if (((e[b--] = e[y--]), --d === 0)) {
      for (w = b - (m - 1), g = 0; g < m; g++) e[w + g] = o[g];
      return;
    }
    if (m === 1) {
      for (b -= d, y -= d, S = b + 1, w = y + 1, g = d - 1; g >= 0; g--)
        e[S + g] = e[w + g];
      e[b] = o[_];
      return;
    }
    for (var x = r; ; ) {
      var T = 0,
        D = 0,
        A = !1;
      do
        if (t(o[_], e[y]) < 0) {
          if (((e[b--] = e[y--]), T++, (D = 0), --d === 0)) {
            A = !0;
            break;
          }
        } else if (((e[b--] = o[_--]), D++, (T = 0), --m === 1)) {
          A = !0;
          break;
        }
      while ((T | D) < x);
      if (A) break;
      do {
        if (((T = d - gu(o[_], e, c, d, d - 1, t)), T !== 0)) {
          for (
            b -= T, y -= T, d -= T, S = b + 1, w = y + 1, g = T - 1;
            g >= 0;
            g--
          )
            e[S + g] = e[w + g];
          if (d === 0) {
            A = !0;
            break;
          }
        }
        if (((e[b--] = o[_--]), --m === 1)) {
          A = !0;
          break;
        }
        if (((D = m - pu(e[y], o, 0, m, m - 1, t)), D !== 0)) {
          for (b -= D, _ -= D, m -= D, S = b + 1, w = _ + 1, g = 0; g < D; g++)
            e[S + g] = o[w + g];
          if (m <= 1) {
            A = !0;
            break;
          }
        }
        if (((e[b--] = e[y--]), --d === 0)) {
          A = !0;
          break;
        }
        x--;
      } while (T >= Ei || D >= Ei);
      if (A) break;
      (x < 0 && (x = 0), (x += 2));
    }
    if (((r = x), r < 1 && (r = 1), m === 1)) {
      for (b -= d, y -= d, S = b + 1, w = y + 1, g = d - 1; g >= 0; g--)
        e[S + g] = e[w + g];
      e[b] = o[_];
    } else {
      if (m === 0) throw new Error();
      for (w = b - (m - 1), g = 0; g < m; g++) e[w + g] = o[g];
    }
  }
  return { mergeRuns: l, forceMergeRuns: u, pushRun: s };
}
function Xo(e, t, r, n) {
  (r || (r = 0), n || (n = e.length));
  var i = n - r;
  if (!(i < 2)) {
    var a = 0;
    if (i < g0) {
      ((a = Xd(e, r, n, t)), qd(e, r, n, r + a, t));
      return;
    }
    var o = hM(e, t),
      s = uM(i);
    do {
      if (((a = Xd(e, r, n, t)), a < s)) {
        var l = i;
        (l > s && (l = s), qd(e, r, r + l, r + a, t), (a = l));
      }
      (o.pushRun(r, a), o.mergeRuns(), (i -= a), (r += a));
    } while (i !== 0);
    o.forceMergeRuns();
  }
}
var Zd = !1;
function mu() {
  Zd ||
    ((Zd = !0),
    console.warn(
      "z / z2 / zlevel of displayable is invalid, which may cause unexpected errors",
    ));
}
function Kd(e, t) {
  return e.zlevel === t.zlevel
    ? e.z === t.z
      ? e.z2 - t.z2
      : e.z - t.z
    : e.zlevel - t.zlevel;
}
var cM = (function () {
    function e() {
      ((this._roots = []),
        (this._displayList = []),
        (this._displayListLen = 0),
        (this.displayableSortFunc = Kd));
    }
    return (
      (e.prototype.traverse = function (t, r) {
        for (var n = 0; n < this._roots.length; n++)
          this._roots[n].traverse(t, r);
      }),
      (e.prototype.getDisplayList = function (t, r) {
        r = r || !1;
        var n = this._displayList;
        return ((t || !n.length) && this.updateDisplayList(r), n);
      }),
      (e.prototype.updateDisplayList = function (t) {
        this._displayListLen = 0;
        for (
          var r = this._roots, n = this._displayList, i = 0, a = r.length;
          i < a;
          i++
        )
          this._updateAndAddDisplayable(r[i], null, t);
        ((n.length = this._displayListLen), Xo(n, Kd));
      }),
      (e.prototype._updateAndAddDisplayable = function (t, r, n) {
        if (!(t.ignore && !n)) {
          (t.beforeUpdate(), t.update(), t.afterUpdate());
          var i = t.getClipPath(),
            a = r && r.length,
            o = 0,
            s = t.__clipPaths;
          if (!t.ignoreClip && (a || i)) {
            if ((s || (s = t.__clipPaths = []), a))
              for (var l = 0; l < r.length; l++) s[o++] = r[l];
            for (var u = i, f = t; u; )
              ((u.parent = f),
                u.updateTransform(),
                (s[o++] = u),
                (f = u),
                (u = u.getClipPath()));
          }
          if ((s && (s.length = o), t.childrenRef)) {
            for (var h = t.childrenRef(), v = 0; v < h.length; v++) {
              var c = h[v];
              (t.__dirty && (c.__dirty |= le),
                this._updateAndAddDisplayable(c, s, n));
            }
            t.__dirty = 0;
          } else {
            var d = t;
            (isNaN(d.z) && (mu(), (d.z = 0)),
              isNaN(d.z2) && (mu(), (d.z2 = 0)),
              isNaN(d.zlevel) && (mu(), (d.zlevel = 0)),
              (this._displayList[this._displayListLen++] = d));
          }
          var p = t.getDecalElement && t.getDecalElement();
          p && this._updateAndAddDisplayable(p, s, n);
          var m = t.getTextGuideLine();
          m && this._updateAndAddDisplayable(m, s, n);
          var g = t.getTextContent();
          g && this._updateAndAddDisplayable(g, s, n);
        }
      }),
      (e.prototype.addRoot = function (t) {
        (t.__zr && t.__zr.storage === this) || this._roots.push(t);
      }),
      (e.prototype.delRoot = function (t) {
        if (t instanceof Array) {
          for (var r = 0, n = t.length; r < n; r++) this.delRoot(t[r]);
          return;
        }
        var i = st(this._roots, t);
        i >= 0 && this._roots.splice(i, 1);
      }),
      (e.prototype.delAllRoots = function () {
        ((this._roots = []),
          (this._displayList = []),
          (this._displayListLen = 0));
      }),
      (e.prototype.getRoots = function () {
        return this._roots;
      }),
      (e.prototype.dispose = function () {
        ((this._displayList = null), (this._roots = null));
      }),
      e
    );
  })(),
  Ts;
Ts =
  (tt.hasGlobalWindow &&
    ((window.requestAnimationFrame &&
      window.requestAnimationFrame.bind(window)) ||
      (window.msRequestAnimationFrame &&
        window.msRequestAnimationFrame.bind(window)) ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame)) ||
  function (e) {
    return setTimeout(e, 16);
  };
function si() {
  return new Date().getTime();
}
var vM = (function (e) {
    G(t, e);
    function t(r) {
      var n = e.call(this) || this;
      return (
        (n._running = !1),
        (n._time = 0),
        (n._pausedTime = 0),
        (n._pauseStart = 0),
        (n._paused = !1),
        (r = r || {}),
        (n.stage = r.stage || {}),
        n
      );
    }
    return (
      (t.prototype.addClip = function (r) {
        (r.animation && this.removeClip(r),
          this._head
            ? ((this._tail.next = r),
              (r.prev = this._tail),
              (r.next = null),
              (this._tail = r))
            : (this._head = this._tail = r),
          (r.animation = this));
      }),
      (t.prototype.addAnimator = function (r) {
        r.animation = this;
        var n = r.getClip();
        n && this.addClip(n);
      }),
      (t.prototype.removeClip = function (r) {
        if (r.animation) {
          var n = r.prev,
            i = r.next;
          (n ? (n.next = i) : (this._head = i),
            i ? (i.prev = n) : (this._tail = n),
            (r.next = r.prev = r.animation = null));
        }
      }),
      (t.prototype.removeAnimator = function (r) {
        var n = r.getClip();
        (n && this.removeClip(n), (r.animation = null));
      }),
      (t.prototype.update = function (r) {
        for (
          var n = si() - this._pausedTime, i = n - this._time, a = this._head;
          a;

        ) {
          var o = a.next,
            s = a.step(n, i);
          (s && (a.ondestroy(), this.removeClip(a)), (a = o));
        }
        ((this._time = n),
          r ||
            (this.trigger("frame", i),
            this.stage.update && this.stage.update()));
      }),
      (t.prototype._startLoop = function () {
        var r = this;
        this._running = !0;
        function n() {
          r._running && (Ts(n), !r._paused && r.update());
        }
        Ts(n);
      }),
      (t.prototype.start = function () {
        this._running ||
          ((this._time = si()), (this._pausedTime = 0), this._startLoop());
      }),
      (t.prototype.stop = function () {
        this._running = !1;
      }),
      (t.prototype.pause = function () {
        this._paused || ((this._pauseStart = si()), (this._paused = !0));
      }),
      (t.prototype.resume = function () {
        this._paused &&
          ((this._pausedTime += si() - this._pauseStart), (this._paused = !1));
      }),
      (t.prototype.clear = function () {
        for (var r = this._head; r; ) {
          var n = r.next;
          ((r.prev = r.next = r.animation = null), (r = n));
        }
        this._head = this._tail = null;
      }),
      (t.prototype.isFinished = function () {
        return this._head == null;
      }),
      (t.prototype.animate = function (r, n) {
        ((n = n || {}), this.start());
        var i = new Mh(r, n.loop);
        return (this.addAnimator(i), i);
      }),
      t
    );
  })(er),
  dM = 300,
  yu = tt.domSupported,
  _u = (function () {
    var e = [
        "click",
        "dblclick",
        "mousewheel",
        "wheel",
        "mouseout",
        "mouseup",
        "mousedown",
        "mousemove",
        "contextmenu",
      ],
      t = ["touchstart", "touchend", "touchmove"],
      r = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 },
      n = q(e, function (i) {
        var a = i.replace("mouse", "pointer");
        return r.hasOwnProperty(a) ? a : i;
      });
    return { mouse: e, touch: t, pointer: n };
  })(),
  jd = {
    mouse: ["mousemove", "mouseup"],
    pointer: ["pointermove", "pointerup"],
  },
  Qd = !1;
function zf(e) {
  var t = e.pointerType;
  return t === "pen" || t === "touch";
}
function pM(e) {
  ((e.touching = !0),
    e.touchTimer != null && (clearTimeout(e.touchTimer), (e.touchTimer = null)),
    (e.touchTimer = setTimeout(function () {
      ((e.touching = !1), (e.touchTimer = null));
    }, 700)));
}
function bu(e) {
  e && (e.zrByTouch = !0);
}
function gM(e, t) {
  return ve(e.dom, new mM(e, t), !0);
}
function m0(e, t) {
  for (
    var r = t, n = !1;
    r &&
    r.nodeType !== 9 &&
    !(n = r.domBelongToZr || (r !== t && r === e.painterRoot));

  )
    r = r.parentNode;
  return n;
}
var mM = (function () {
    function e(t, r) {
      ((this.stopPropagation = ie),
        (this.stopImmediatePropagation = ie),
        (this.preventDefault = ie),
        (this.type = r.type),
        (this.target = this.currentTarget = t.dom),
        (this.pointerType = r.pointerType),
        (this.clientX = r.clientX),
        (this.clientY = r.clientY));
    }
    return e;
  })(),
  Ae = {
    mousedown: function (e) {
      ((e = ve(this.dom, e)),
        (this.__mayPointerCapture = [e.zrX, e.zrY]),
        this.trigger("mousedown", e));
    },
    mousemove: function (e) {
      e = ve(this.dom, e);
      var t = this.__mayPointerCapture;
      (t &&
        (e.zrX !== t[0] || e.zrY !== t[1]) &&
        this.__togglePointerCapture(!0),
        this.trigger("mousemove", e));
    },
    mouseup: function (e) {
      ((e = ve(this.dom, e)),
        this.__togglePointerCapture(!1),
        this.trigger("mouseup", e));
    },
    mouseout: function (e) {
      e = ve(this.dom, e);
      var t = e.toElement || e.relatedTarget;
      m0(this, t) ||
        (this.__pointerCapturing && (e.zrEventControl = "no_globalout"),
        this.trigger("mouseout", e));
    },
    wheel: function (e) {
      ((Qd = !0), (e = ve(this.dom, e)), this.trigger("mousewheel", e));
    },
    mousewheel: function (e) {
      Qd || ((e = ve(this.dom, e)), this.trigger("mousewheel", e));
    },
    touchstart: function (e) {
      ((e = ve(this.dom, e)),
        bu(e),
        (this.__lastTouchMoment = new Date()),
        this.handler.processGesture(e, "start"),
        Ae.mousemove.call(this, e),
        Ae.mousedown.call(this, e));
    },
    touchmove: function (e) {
      ((e = ve(this.dom, e)),
        bu(e),
        this.handler.processGesture(e, "change"),
        Ae.mousemove.call(this, e));
    },
    touchend: function (e) {
      ((e = ve(this.dom, e)),
        bu(e),
        this.handler.processGesture(e, "end"),
        Ae.mouseup.call(this, e),
        +new Date() - +this.__lastTouchMoment < dM && Ae.click.call(this, e));
    },
    pointerdown: function (e) {
      Ae.mousedown.call(this, e);
    },
    pointermove: function (e) {
      zf(e) || Ae.mousemove.call(this, e);
    },
    pointerup: function (e) {
      Ae.mouseup.call(this, e);
    },
    pointerout: function (e) {
      zf(e) || Ae.mouseout.call(this, e);
    },
  };
M(["click", "dblclick", "contextmenu"], function (e) {
  Ae[e] = function (t) {
    ((t = ve(this.dom, t)), this.trigger(e, t));
  };
});
var Gf = {
  pointermove: function (e) {
    zf(e) || Gf.mousemove.call(this, e);
  },
  pointerup: function (e) {
    Gf.mouseup.call(this, e);
  },
  mousemove: function (e) {
    this.trigger("mousemove", e);
  },
  mouseup: function (e) {
    var t = this.__pointerCapturing;
    (this.__togglePointerCapture(!1),
      this.trigger("mouseup", e),
      t &&
        ((e.zrEventControl = "only_globalout"), this.trigger("mouseout", e)));
  },
};
function yM(e, t) {
  var r = t.domHandlers;
  tt.pointerEventsSupported
    ? M(_u.pointer, function (n) {
        qo(t, n, function (i) {
          r[n].call(e, i);
        });
      })
    : (tt.touchEventsSupported &&
        M(_u.touch, function (n) {
          qo(t, n, function (i) {
            (r[n].call(e, i), pM(t));
          });
        }),
      M(_u.mouse, function (n) {
        qo(t, n, function (i) {
          ((i = yc(i)), t.touching || r[n].call(e, i));
        });
      }));
}
function _M(e, t) {
  tt.pointerEventsSupported
    ? M(jd.pointer, r)
    : tt.touchEventsSupported || M(jd.mouse, r);
  function r(n) {
    function i(a) {
      ((a = yc(a)),
        m0(e, a.target) || ((a = gM(e, a)), t.domHandlers[n].call(e, a)));
    }
    qo(t, n, i, { capture: !0 });
  }
}
function qo(e, t, r, n) {
  ((e.mounted[t] = r), (e.listenerOpts[t] = n), tM(e.domTarget, t, r, n));
}
function Su(e) {
  var t = e.mounted;
  for (var r in t)
    t.hasOwnProperty(r) && eM(e.domTarget, r, t[r], e.listenerOpts[r]);
  e.mounted = {};
}
var Jd = (function () {
    function e(t, r) {
      ((this.mounted = {}),
        (this.listenerOpts = {}),
        (this.touching = !1),
        (this.domTarget = t),
        (this.domHandlers = r));
    }
    return e;
  })(),
  bM = (function (e) {
    G(t, e);
    function t(r, n) {
      var i = e.call(this) || this;
      return (
        (i.__pointerCapturing = !1),
        (i.dom = r),
        (i.painterRoot = n),
        (i._localHandlerScope = new Jd(r, Ae)),
        yu && (i._globalHandlerScope = new Jd(document, Gf)),
        yM(i, i._localHandlerScope),
        i
      );
    }
    return (
      (t.prototype.dispose = function () {
        (Su(this._localHandlerScope), yu && Su(this._globalHandlerScope));
      }),
      (t.prototype.setCursor = function (r) {
        this.dom.style && (this.dom.style.cursor = r || "default");
      }),
      (t.prototype.__togglePointerCapture = function (r) {
        if (
          ((this.__mayPointerCapture = null),
          yu && +this.__pointerCapturing ^ +r)
        ) {
          this.__pointerCapturing = r;
          var n = this._globalHandlerScope;
          r ? _M(this, n) : Su(n);
        }
      }),
      t
    );
  })(er);
/*!
 * ZRender, a high performance 2d drawing library.
 *
 * Copyright (c) 2013, Baidu Inc.
 * All rights reserved.
 *
 * LICENSE
 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
 */ var Zo = {},
  y0 = {};
function SM(e) {
  delete y0[e];
}
function wM(e) {
  if (!e) return !1;
  if (typeof e == "string") return ns(e, 1) < sf;
  if (e.colorStops) {
    for (var t = e.colorStops, r = 0, n = t.length, i = 0; i < n; i++)
      r += ns(t[i].color, 1);
    return ((r /= n), r < sf);
  }
  return !1;
}
var xM = (function () {
  function e(t, r, n) {
    var i = this;
    ((this._sleepAfterStill = 10),
      (this._stillFrameAccum = 0),
      (this._needsRefresh = !0),
      (this._needsRefreshHover = !0),
      (this._darkMode = !1),
      (n = n || {}),
      (this.dom = r),
      (this.id = t));
    var a = new cM(),
      o = n.renderer || "canvas";
    (Zo[o] || (o = yt(Zo)[0]),
      (n.useDirtyRect = n.useDirtyRect == null ? !1 : n.useDirtyRect));
    var s = new Zo[o](r, a, n, t),
      l = n.ssr || s.ssrOnly;
    ((this.storage = a), (this.painter = s));
    var u =
        !tt.node && !tt.worker && !l
          ? new bM(s.getViewportRoot(), s.root)
          : null,
      f = n.useCoarsePointer,
      h = f == null || f === "auto" ? tt.touchEventsSupported : !!f,
      v = 44,
      c;
    (h && (c = K(n.pointerSize, v)),
      (this.handler = new d0(a, s, u, s.root, c)),
      (this.animation = new vM({
        stage: {
          update: l
            ? null
            : function () {
                return i._flush(!0);
              },
        },
      })),
      l || this.animation.start());
  }
  return (
    (e.prototype.add = function (t) {
      this._disposed ||
        !t ||
        (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
    }),
    (e.prototype.remove = function (t) {
      this._disposed ||
        !t ||
        (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
    }),
    (e.prototype.configLayer = function (t, r) {
      this._disposed ||
        (this.painter.configLayer && this.painter.configLayer(t, r),
        this.refresh());
    }),
    (e.prototype.setBackgroundColor = function (t) {
      this._disposed ||
        (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t),
        this.refresh(),
        (this._backgroundColor = t),
        (this._darkMode = wM(t)));
    }),
    (e.prototype.getBackgroundColor = function () {
      return this._backgroundColor;
    }),
    (e.prototype.setDarkMode = function (t) {
      this._darkMode = t;
    }),
    (e.prototype.isDarkMode = function () {
      return this._darkMode;
    }),
    (e.prototype.refreshImmediately = function (t) {
      this._disposed ||
        (t || this.animation.update(!0),
        (this._needsRefresh = !1),
        this.painter.refresh(),
        (this._needsRefresh = !1));
    }),
    (e.prototype.refresh = function () {
      this._disposed || ((this._needsRefresh = !0), this.animation.start());
    }),
    (e.prototype.flush = function () {
      this._disposed || this._flush(!1);
    }),
    (e.prototype._flush = function (t) {
      var r,
        n = si();
      (this._needsRefresh && ((r = !0), this.refreshImmediately(t)),
        this._needsRefreshHover && ((r = !0), this.refreshHoverImmediately()));
      var i = si();
      r
        ? ((this._stillFrameAccum = 0),
          this.trigger("rendered", { elapsedTime: i - n }))
        : this._sleepAfterStill > 0 &&
          (this._stillFrameAccum++,
          this._stillFrameAccum > this._sleepAfterStill &&
            this.animation.stop());
    }),
    (e.prototype.setSleepAfterStill = function (t) {
      this._sleepAfterStill = t;
    }),
    (e.prototype.wakeUp = function () {
      this._disposed || (this.animation.start(), (this._stillFrameAccum = 0));
    }),
    (e.prototype.refreshHover = function () {
      this._needsRefreshHover = !0;
    }),
    (e.prototype.refreshHoverImmediately = function () {
      this._disposed ||
        ((this._needsRefreshHover = !1),
        this.painter.refreshHover &&
          this.painter.getType() === "canvas" &&
          this.painter.refreshHover());
    }),
    (e.prototype.resize = function (t) {
      this._disposed ||
        ((t = t || {}),
        this.painter.resize(t.width, t.height),
        this.handler.resize());
    }),
    (e.prototype.clearAnimation = function () {
      this._disposed || this.animation.clear();
    }),
    (e.prototype.getWidth = function () {
      if (!this._disposed) return this.painter.getWidth();
    }),
    (e.prototype.getHeight = function () {
      if (!this._disposed) return this.painter.getHeight();
    }),
    (e.prototype.setCursorStyle = function (t) {
      this._disposed || this.handler.setCursorStyle(t);
    }),
    (e.prototype.findHover = function (t, r) {
      if (!this._disposed) return this.handler.findHover(t, r);
    }),
    (e.prototype.on = function (t, r, n) {
      return (this._disposed || this.handler.on(t, r, n), this);
    }),
    (e.prototype.off = function (t, r) {
      this._disposed || this.handler.off(t, r);
    }),
    (e.prototype.trigger = function (t, r) {
      this._disposed || this.handler.trigger(t, r);
    }),
    (e.prototype.clear = function () {
      if (!this._disposed) {
        for (var t = this.storage.getRoots(), r = 0; r < t.length; r++)
          t[r] instanceof Et && t[r].removeSelfFromZr(this);
        (this.storage.delAllRoots(), this.painter.clear());
      }
    }),
    (e.prototype.dispose = function () {
      this._disposed ||
        (this.animation.stop(),
        this.clear(),
        this.storage.dispose(),
        this.painter.dispose(),
        this.handler.dispose(),
        (this.animation = this.storage = this.painter = this.handler = null),
        (this._disposed = !0),
        SM(this.id));
    }),
    e
  );
})();
function tp(e, t) {
  var r = new xM(Bg(), e, t);
  return ((y0[r.id] = r), r);
}
function TM(e, t) {
  Zo[e] = t;
}
var _0 = "";
typeof navigator < "u" && (_0 = navigator.platform || "");
var Kn = "rgba(0, 0, 0, 0.2)",
  b0 = Y.color.theme[0],
  CM = rf(b0, null, null, 0.9);
const DM = {
  darkMode: "auto",
  colorBy: "series",
  color: Y.color.theme,
  gradientColor: [CM, b0],
  aria: {
    decal: {
      decals: [
        {
          color: Kn,
          dashArrayX: [1, 0],
          dashArrayY: [2, 5],
          symbolSize: 1,
          rotation: Math.PI / 6,
        },
        {
          color: Kn,
          symbol: "circle",
          dashArrayX: [
            [8, 8],
            [0, 8, 8, 0],
          ],
          dashArrayY: [6, 0],
          symbolSize: 0.8,
        },
        {
          color: Kn,
          dashArrayX: [1, 0],
          dashArrayY: [4, 3],
          rotation: -Math.PI / 4,
        },
        {
          color: Kn,
          dashArrayX: [
            [6, 6],
            [0, 6, 6, 0],
          ],
          dashArrayY: [6, 0],
        },
        {
          color: Kn,
          dashArrayX: [
            [1, 0],
            [1, 6],
          ],
          dashArrayY: [1, 0, 6, 0],
          rotation: Math.PI / 4,
        },
        {
          color: Kn,
          symbol: "triangle",
          dashArrayX: [
            [9, 9],
            [0, 9, 9, 0],
          ],
          dashArrayY: [7, 2],
          symbolSize: 0.75,
        },
      ],
    },
  },
  textStyle: {
    fontFamily: _0.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
  },
  blendMode: null,
  stateAnimation: { duration: 300, easing: "cubicOut" },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3,
  progressiveThreshold: 3e3,
  progressive: 400,
  hoverLayerThreshold: 3e3,
  useUTC: !1,
};
var MM = rt();
function AM(e, t, r) {
  var n = MM.get(t);
  if (!n) return r;
  var i = n(e);
  return i ? r.concat(i) : r;
}
var So,
  Oi,
  ep,
  rp = "\0_ec_inner",
  LM = 1,
  _c = (function (e) {
    G(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.init = function (r, n, i, a, o, s) {
        ((a = a || {}),
          (this.option = null),
          (this._theme = new bt(a)),
          (this._locale = new bt(o)),
          (this._optionManager = s));
      }),
      (t.prototype.setOption = function (r, n, i) {
        var a = ap(n);
        (this._optionManager.setOption(r, i, a), this._resetOption(null, a));
      }),
      (t.prototype.resetOption = function (r, n) {
        return this._resetOption(r, ap(n));
      }),
      (t.prototype._resetOption = function (r, n) {
        var i = !1,
          a = this._optionManager;
        if (!r || r === "recreate") {
          var o = a.mountOption(r === "recreate");
          (!this.option || r === "recreate"
            ? ep(this, o)
            : (this.restoreData(), this._mergeOption(o, n)),
            (i = !0));
        }
        if (
          ((r === "timeline" || r === "media") && this.restoreData(),
          !r || r === "recreate" || r === "timeline")
        ) {
          var s = a.getTimelineOption(this);
          s && ((i = !0), this._mergeOption(s, n));
        }
        if (!r || r === "recreate" || r === "media") {
          var l = a.getMediaOption(this);
          l.length &&
            M(
              l,
              function (u) {
                ((i = !0), this._mergeOption(u, n));
              },
              this,
            );
        }
        return i;
      }),
      (t.prototype.mergeOption = function (r) {
        this._mergeOption(r, null);
      }),
      (t.prototype._mergeOption = function (r, n) {
        var i = this.option,
          a = this._componentsMap,
          o = this._componentsCount,
          s = [],
          l = rt(),
          u = n && n.replaceMergeMainTypeMap;
        (yx(this),
          M(r, function (h, v) {
            h != null &&
              (ht.hasClass(v)
                ? v && (s.push(v), l.set(v, !0))
                : (i[v] = i[v] == null ? at(h) : ut(i[v], h, !0)));
          }),
          u &&
            u.each(function (h, v) {
              ht.hasClass(v) && !l.get(v) && (s.push(v), l.set(v, !0));
            }),
          ht.topologicalTravel(s, ht.getAllClassMainTypes(), f, this));
        function f(h) {
          var v = AM(this, h, Kt(r[h])),
            c = a.get(h),
            d = c
              ? u && u.get(h)
                ? "replaceMerge"
                : "normalMerge"
              : "replaceAll",
            p = RS(c, v, d);
          (GS(p, h, ht), (i[h] = null), a.set(h, null), o.set(h, 0));
          var m = [],
            g = [],
            y = 0,
            _;
          (M(
            p,
            function (b, w) {
              var S = b.existing,
                x = b.newOption;
              if (!x) S && (S.mergeOption({}, this), S.optionUpdated({}, !1));
              else {
                var T = h === "series",
                  D = ht.getClass(h, b.keyInfo.subType, !T);
                if (!D) return;
                if (h === "tooltip") {
                  if (_) return;
                  _ = !0;
                }
                if (S && S.constructor === D)
                  ((S.name = b.keyInfo.name),
                    S.mergeOption(x, this),
                    S.optionUpdated(x, !1));
                else {
                  var A = B({ componentIndex: w }, b.keyInfo);
                  ((S = new D(x, this, this, A)),
                    B(S, A),
                    b.brandNew && (S.__requireNewView = !0),
                    S.init(x, this, this),
                    S.optionUpdated(null, !0));
                }
              }
              S
                ? (m.push(S.option), g.push(S), y++)
                : (m.push(void 0), g.push(void 0));
            },
            this,
          ),
            (i[h] = m),
            a.set(h, g),
            o.set(h, y),
            h === "series" && So(this));
        }
        this._seriesIndices || So(this);
      }),
      (t.prototype.getOption = function () {
        var r = at(this.option);
        return (
          M(r, function (n, i) {
            if (ht.hasClass(i)) {
              for (var a = Kt(n), o = a.length, s = !1, l = o - 1; l >= 0; l--)
                a[l] && !ya(a[l]) ? (s = !0) : ((a[l] = null), !s && o--);
              ((a.length = o), (r[i] = a));
            }
          }),
          delete r[rp],
          r
        );
      }),
      (t.prototype.setTheme = function (r) {
        ((this._theme = new bt(r)), this._resetOption("recreate", null));
      }),
      (t.prototype.getTheme = function () {
        return this._theme;
      }),
      (t.prototype.getLocaleModel = function () {
        return this._locale;
      }),
      (t.prototype.setUpdatePayload = function (r) {
        this._payload = r;
      }),
      (t.prototype.getUpdatePayload = function () {
        return this._payload;
      }),
      (t.prototype.getComponent = function (r, n) {
        var i = this._componentsMap.get(r);
        if (i) {
          var a = i[n || 0];
          if (a) return a;
          if (n == null) {
            for (var o = 0; o < i.length; o++) if (i[o]) return i[o];
          }
        }
      }),
      (t.prototype.queryComponents = function (r) {
        var n = r.mainType;
        if (!n) return [];
        var i = r.index,
          a = r.id,
          o = r.name,
          s = this._componentsMap.get(n);
        if (!s || !s.length) return [];
        var l;
        return (
          i != null
            ? ((l = []),
              M(Kt(i), function (u) {
                s[u] && l.push(s[u]);
              }))
            : a != null
              ? (l = np("id", a, s))
              : o != null
                ? (l = np("name", o, s))
                : (l = kt(s, function (u) {
                    return !!u;
                  })),
          ip(l, r)
        );
      }),
      (t.prototype.findComponents = function (r) {
        var n = r.query,
          i = r.mainType,
          a = s(n),
          o = a
            ? this.queryComponents(a)
            : kt(this._componentsMap.get(i), function (u) {
                return !!u;
              });
        return l(ip(o, r));
        function s(u) {
          var f = i + "Index",
            h = i + "Id",
            v = i + "Name";
          return u && (u[f] != null || u[h] != null || u[v] != null)
            ? { mainType: i, index: u[f], id: u[h], name: u[v] }
            : null;
        }
        function l(u) {
          return r.filter ? kt(u, r.filter) : u;
        }
      }),
      (t.prototype.eachComponent = function (r, n, i) {
        var a = this._componentsMap;
        if (Q(r)) {
          var o = n,
            s = r;
          a.each(function (h, v) {
            for (var c = 0; h && c < h.length; c++) {
              var d = h[c];
              d && s.call(o, v, d, d.componentIndex);
            }
          });
        } else
          for (
            var l = U(r) ? a.get(r) : X(r) ? this.findComponents(r) : null,
              u = 0;
            l && u < l.length;
            u++
          ) {
            var f = l[u];
            f && n.call(i, f, f.componentIndex);
          }
      }),
      (t.prototype.getSeriesByName = function (r) {
        var n = je(r, null);
        return kt(this._componentsMap.get("series"), function (i) {
          return !!i && n != null && i.name === n;
        });
      }),
      (t.prototype.getSeriesByIndex = function (r) {
        return this._componentsMap.get("series")[r];
      }),
      (t.prototype.getSeriesByType = function (r) {
        return kt(this._componentsMap.get("series"), function (n) {
          return !!n && n.subType === r;
        });
      }),
      (t.prototype.getSeries = function () {
        return kt(this._componentsMap.get("series"), function (r) {
          return !!r;
        });
      }),
      (t.prototype.getSeriesCount = function () {
        return this._componentsCount.get("series");
      }),
      (t.prototype.eachSeries = function (r, n) {
        (Oi(this),
          M(
            this._seriesIndices,
            function (i) {
              var a = this._componentsMap.get("series")[i];
              r.call(n, a, i);
            },
            this,
          ));
      }),
      (t.prototype.eachRawSeries = function (r, n) {
        M(this._componentsMap.get("series"), function (i) {
          i && r.call(n, i, i.componentIndex);
        });
      }),
      (t.prototype.eachSeriesByType = function (r, n, i) {
        (Oi(this),
          M(
            this._seriesIndices,
            function (a) {
              var o = this._componentsMap.get("series")[a];
              o.subType === r && n.call(i, o, a);
            },
            this,
          ));
      }),
      (t.prototype.eachRawSeriesByType = function (r, n, i) {
        return M(this.getSeriesByType(r), n, i);
      }),
      (t.prototype.isSeriesFiltered = function (r) {
        return (Oi(this), this._seriesIndicesMap.get(r.componentIndex) == null);
      }),
      (t.prototype.getCurrentSeriesIndices = function () {
        return (this._seriesIndices || []).slice();
      }),
      (t.prototype.filterSeries = function (r, n) {
        Oi(this);
        var i = [];
        (M(
          this._seriesIndices,
          function (a) {
            var o = this._componentsMap.get("series")[a];
            r.call(n, o, a) && i.push(a);
          },
          this,
        ),
          (this._seriesIndices = i),
          (this._seriesIndicesMap = rt(i)));
      }),
      (t.prototype.restoreData = function (r) {
        So(this);
        var n = this._componentsMap,
          i = [];
        (n.each(function (a, o) {
          ht.hasClass(o) && i.push(o);
        }),
          ht.topologicalTravel(i, ht.getAllClassMainTypes(), function (a) {
            M(n.get(a), function (o) {
              o && (a !== "series" || !IM(o, r)) && o.restoreData();
            });
          }));
      }),
      (t.internalField = (function () {
        ((So = function (r) {
          var n = (r._seriesIndices = []);
          (M(r._componentsMap.get("series"), function (i) {
            i && n.push(i.componentIndex);
          }),
            (r._seriesIndicesMap = rt(n)));
        }),
          (Oi = function (r) {}),
          (ep = function (r, n) {
            ((r.option = {}),
              (r.option[rp] = LM),
              (r._componentsMap = rt({ series: [] })),
              (r._componentsCount = rt()));
            var i = n.aria;
            (X(i) && i.enabled == null && (i.enabled = !0),
              PM(n, r._theme.option),
              ut(n, DM, !1),
              r._mergeOption(n, null));
          }));
      })()),
      t
    );
  })(bt);
function IM(e, t) {
  if (t) {
    var r = t.seriesIndex,
      n = t.seriesId,
      i = t.seriesName;
    return (
      (r != null && e.componentIndex !== r) ||
      (n != null && e.id !== n) ||
      (i != null && e.name !== i)
    );
  }
}
function PM(e, t) {
  var r = e.color && !e.colorLayer;
  M(t, function (n, i) {
    (i === "colorLayer" && r) ||
      (i === "color" && e.color) ||
      ht.hasClass(i) ||
      (typeof n == "object"
        ? (e[i] = e[i] ? ut(e[i], n, !1) : at(n))
        : e[i] == null && (e[i] = n));
  });
}
function np(e, t, r) {
  if (W(t)) {
    var n = rt();
    return (
      M(t, function (a) {
        if (a != null) {
          var o = je(a, null);
          o != null && n.set(a, !0);
        }
      }),
      kt(r, function (a) {
        return a && n.get(a[e]);
      })
    );
  } else {
    var i = je(t, null);
    return kt(r, function (a) {
      return a && i != null && a[e] === i;
    });
  }
}
function ip(e, t) {
  return t.hasOwnProperty("subType")
    ? kt(e, function (r) {
        return r && r.subType === t.subType;
      })
    : e;
}
function ap(e) {
  var t = rt();
  return (
    e &&
      M(Kt(e.replaceMerge), function (r) {
        t.set(r, !0);
      }),
    { replaceMergeMainTypeMap: t }
  );
}
tr(_c, uc);
var kM = [
    "getDom",
    "getZr",
    "getWidth",
    "getHeight",
    "getDevicePixelRatio",
    "dispatchAction",
    "isSSR",
    "isDisposed",
    "on",
    "off",
    "getDataURL",
    "getConnectedDataURL",
    "getOption",
    "getId",
    "updateLabelLayout",
  ],
  S0 = (function () {
    function e(t) {
      M(
        kM,
        function (r) {
          this[r] = ct(t[r], t);
        },
        this,
      );
    }
    return e;
  })(),
  RM = /^(min|max)?(.+)$/,
  EM = (function () {
    function e(t) {
      ((this._timelineOptions = []),
        (this._mediaList = []),
        (this._currentMediaIndices = []),
        (this._api = t));
    }
    return (
      (e.prototype.setOption = function (t, r, n) {
        (t &&
          (M(Kt(t.series), function (o) {
            o && o.data && oe(o.data) && Uu(o.data);
          }),
          M(Kt(t.dataset), function (o) {
            o && o.source && oe(o.source) && Uu(o.source);
          })),
          (t = at(t)));
        var i = this._optionBackup,
          a = OM(t, r, !i);
        ((this._newBaseOption = a.baseOption),
          i
            ? (a.timelineOptions.length &&
                (i.timelineOptions = a.timelineOptions),
              a.mediaList.length && (i.mediaList = a.mediaList),
              a.mediaDefault && (i.mediaDefault = a.mediaDefault))
            : (this._optionBackup = a));
      }),
      (e.prototype.mountOption = function (t) {
        var r = this._optionBackup;
        return (
          (this._timelineOptions = r.timelineOptions),
          (this._mediaList = r.mediaList),
          (this._mediaDefault = r.mediaDefault),
          (this._currentMediaIndices = []),
          at(t ? r.baseOption : this._newBaseOption)
        );
      }),
      (e.prototype.getTimelineOption = function (t) {
        var r,
          n = this._timelineOptions;
        if (n.length) {
          var i = t.getComponent("timeline");
          i && (r = at(n[i.getCurrentIndex()]));
        }
        return r;
      }),
      (e.prototype.getMediaOption = function (t) {
        var r = this._api.getWidth(),
          n = this._api.getHeight(),
          i = this._mediaList,
          a = this._mediaDefault,
          o = [],
          s = [];
        if (!i.length && !a) return s;
        for (var l = 0, u = i.length; l < u; l++)
          BM(i[l].query, r, n) && o.push(l);
        return (
          !o.length && a && (o = [-1]),
          o.length &&
            !FM(o, this._currentMediaIndices) &&
            (s = q(o, function (f) {
              return at(f === -1 ? a.option : i[f].option);
            })),
          (this._currentMediaIndices = o),
          s
        );
      }),
      e
    );
  })();
function OM(e, t, r) {
  var n = [],
    i,
    a,
    o = e.baseOption,
    s = e.timeline,
    l = e.options,
    u = e.media,
    f = !!e.media,
    h = !!(l || s || (o && o.timeline));
  (o
    ? ((a = o), a.timeline || (a.timeline = s))
    : ((h || f) && (e.options = e.media = null), (a = e)),
    f &&
      W(u) &&
      M(u, function (c) {
        c && c.option && (c.query ? n.push(c) : i || (i = c));
      }),
    v(a),
    M(l, function (c) {
      return v(c);
    }),
    M(n, function (c) {
      return v(c.option);
    }));
  function v(c) {
    M(t, function (d) {
      d(c, r);
    });
  }
  return {
    baseOption: a,
    timelineOptions: l || [],
    mediaDefault: i,
    mediaList: n,
  };
}
function BM(e, t, r) {
  var n = { width: t, height: r, aspectratio: t / r },
    i = !0;
  return (
    M(e, function (a, o) {
      var s = o.match(RM);
      if (!(!s || !s[1] || !s[2])) {
        var l = s[1],
          u = s[2].toLowerCase();
        NM(n[u], a, l) || (i = !1);
      }
    }),
    i
  );
}
function NM(e, t, r) {
  return r === "min" ? e >= t : r === "max" ? e <= t : e === t;
}
function FM(e, t) {
  return e.join(",") === t.join(",");
}
var De = M,
  Ta = X,
  op = [
    "areaStyle",
    "lineStyle",
    "nodeStyle",
    "linkStyle",
    "chordStyle",
    "label",
    "labelLine",
  ];
function wu(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0, n = op.length; r < n; r++) {
      var i = op[r],
        a = t.normal,
        o = t.emphasis;
      (a &&
        a[i] &&
        ((e[i] = e[i] || {}),
        e[i].normal ? ut(e[i].normal, a[i]) : (e[i].normal = a[i]),
        (a[i] = null)),
        o &&
          o[i] &&
          ((e[i] = e[i] || {}),
          e[i].emphasis ? ut(e[i].emphasis, o[i]) : (e[i].emphasis = o[i]),
          (o[i] = null)));
    }
}
function Ut(e, t, r) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var n = e[t].normal,
      i = e[t].emphasis;
    (n &&
      (r ? ((e[t].normal = e[t].emphasis = null), dt(e[t], n)) : (e[t] = n)),
      i &&
        ((e.emphasis = e.emphasis || {}),
        (e.emphasis[t] = i),
        i.focus && (e.emphasis.focus = i.focus),
        i.blurScope && (e.emphasis.blurScope = i.blurScope)));
  }
}
function Ki(e) {
  (Ut(e, "itemStyle"),
    Ut(e, "lineStyle"),
    Ut(e, "areaStyle"),
    Ut(e, "label"),
    Ut(e, "labelLine"),
    Ut(e, "upperLabel"),
    Ut(e, "edgeLabel"));
}
function Dt(e, t) {
  var r = Ta(e) && e[t],
    n = Ta(r) && r.textStyle;
  if (n)
    for (var i = 0, a = wv.length; i < a; i++) {
      var o = wv[i];
      n.hasOwnProperty(o) && (r[o] = n[o]);
    }
}
function de(e) {
  e && (Ki(e), Dt(e, "label"), e.emphasis && Dt(e.emphasis, "label"));
}
function zM(e) {
  if (Ta(e)) {
    (wu(e),
      Ki(e),
      Dt(e, "label"),
      Dt(e, "upperLabel"),
      Dt(e, "edgeLabel"),
      e.emphasis &&
        (Dt(e.emphasis, "label"),
        Dt(e.emphasis, "upperLabel"),
        Dt(e.emphasis, "edgeLabel")));
    var t = e.markPoint;
    t && (wu(t), de(t));
    var r = e.markLine;
    r && (wu(r), de(r));
    var n = e.markArea;
    n && de(n);
    var i = e.data;
    if (e.type === "graph") {
      i = i || e.nodes;
      var a = e.links || e.edges;
      if (a && !oe(a)) for (var o = 0; o < a.length; o++) de(a[o]);
      M(e.categories, function (u) {
        Ki(u);
      });
    }
    if (i && !oe(i)) for (var o = 0; o < i.length; o++) de(i[o]);
    if (((t = e.markPoint), t && t.data))
      for (var s = t.data, o = 0; o < s.length; o++) de(s[o]);
    if (((r = e.markLine), r && r.data))
      for (var l = r.data, o = 0; o < l.length; o++)
        W(l[o]) ? (de(l[o][0]), de(l[o][1])) : de(l[o]);
    e.type === "gauge"
      ? (Dt(e, "axisLabel"), Dt(e, "title"), Dt(e, "detail"))
      : e.type === "treemap"
        ? (Ut(e.breadcrumb, "itemStyle"),
          M(e.levels, function (u) {
            Ki(u);
          }))
        : e.type === "tree" && Ki(e.leaves);
  }
}
function ir(e) {
  return W(e) ? e : e ? [e] : [];
}
function sp(e) {
  return (W(e) ? e[0] : e) || {};
}
function GM(e, t) {
  De(ir(e.series), function (n) {
    Ta(n) && zM(n);
  });
  var r = [
    "xAxis",
    "yAxis",
    "radiusAxis",
    "angleAxis",
    "singleAxis",
    "parallelAxis",
    "radar",
  ];
  (t && r.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"),
    De(r, function (n) {
      De(ir(e[n]), function (i) {
        i && (Dt(i, "axisLabel"), Dt(i.axisPointer, "label"));
      });
    }),
    De(ir(e.parallel), function (n) {
      var i = n && n.parallelAxisDefault;
      (Dt(i, "axisLabel"), Dt(i && i.axisPointer, "label"));
    }),
    De(ir(e.calendar), function (n) {
      (Ut(n, "itemStyle"),
        Dt(n, "dayLabel"),
        Dt(n, "monthLabel"),
        Dt(n, "yearLabel"));
    }),
    De(ir(e.radar), function (n) {
      (Dt(n, "name"),
        n.name && n.axisName == null && ((n.axisName = n.name), delete n.name),
        n.nameGap != null &&
          n.axisNameGap == null &&
          ((n.axisNameGap = n.nameGap), delete n.nameGap));
    }),
    De(ir(e.geo), function (n) {
      Ta(n) &&
        (de(n),
        De(ir(n.regions), function (i) {
          de(i);
        }));
    }),
    De(ir(e.timeline), function (n) {
      (de(n), Ut(n, "label"), Ut(n, "itemStyle"), Ut(n, "controlStyle", !0));
      var i = n.data;
      W(i) &&
        M(i, function (a) {
          X(a) && (Ut(a, "label"), Ut(a, "itemStyle"));
        });
    }),
    De(ir(e.toolbox), function (n) {
      (Ut(n, "iconStyle"),
        De(n.feature, function (i) {
          Ut(i, "iconStyle");
        }));
    }),
    Dt(sp(e.axisPointer), "label"),
    Dt(sp(e.tooltip).axisPointer, "label"));
}
function HM(e, t) {
  for (
    var r = t.split(","), n = e, i = 0;
    i < r.length && ((n = n && n[r[i]]), n != null);
    i++
  );
  return n;
}
function VM(e, t, r, n) {
  for (var i = t.split(","), a = e, o, s = 0; s < i.length - 1; s++)
    ((o = i[s]), a[o] == null && (a[o] = {}), (a = a[o]));
  a[i[s]] == null && (a[i[s]] = r);
}
function lp(e) {
  e &&
    M(WM, function (t) {
      t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
    });
}
var WM = [
    ["x", "left"],
    ["y", "top"],
    ["x2", "right"],
    ["y2", "bottom"],
  ],
  UM = [
    "grid",
    "geo",
    "parallel",
    "legend",
    "toolbox",
    "title",
    "visualMap",
    "dataZoom",
    "timeline",
  ],
  xu = [
    ["borderRadius", "barBorderRadius"],
    ["borderColor", "barBorderColor"],
    ["borderWidth", "barBorderWidth"],
  ];
function Bi(e) {
  var t = e && e.itemStyle;
  if (t)
    for (var r = 0; r < xu.length; r++) {
      var n = xu[r][1],
        i = xu[r][0];
      t[n] != null && (t[i] = t[n]);
    }
}
function up(e) {
  e &&
    e.alignTo === "edge" &&
    e.margin != null &&
    e.edgeDistance == null &&
    (e.edgeDistance = e.margin);
}
function fp(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function YM(e) {
  e &&
    e.focusNodeAdjacency != null &&
    ((e.emphasis = e.emphasis || {}),
    e.emphasis.focus == null && (e.emphasis.focus = "adjacency"));
}
function w0(e, t) {
  if (e)
    for (var r = 0; r < e.length; r++) (t(e[r]), e[r] && w0(e[r].children, t));
}
function x0(e, t) {
  (GM(e, t),
    (e.series = Kt(e.series)),
    M(e.series, function (r) {
      if (X(r)) {
        var n = r.type;
        if (n === "line") r.clipOverflow != null && (r.clip = r.clipOverflow);
        else if (n === "pie" || n === "gauge") {
          (r.clockWise != null && (r.clockwise = r.clockWise), up(r.label));
          var i = r.data;
          if (i && !oe(i)) for (var a = 0; a < i.length; a++) up(i[a]);
          r.hoverOffset != null &&
            ((r.emphasis = r.emphasis || {}),
            (r.emphasis.scaleSize = null) &&
              (r.emphasis.scaleSize = r.hoverOffset));
        } else if (n === "gauge") {
          var o = HM(r, "pointer.color");
          o != null && VM(r, "itemStyle.color", o);
        } else if (n === "bar") {
          (Bi(r), Bi(r.backgroundStyle), Bi(r.emphasis));
          var i = r.data;
          if (i && !oe(i))
            for (var a = 0; a < i.length; a++)
              typeof i[a] == "object" && (Bi(i[a]), Bi(i[a] && i[a].emphasis));
        } else if (n === "sunburst") {
          var s = r.highlightPolicy;
          (s &&
            ((r.emphasis = r.emphasis || {}),
            r.emphasis.focus || (r.emphasis.focus = s)),
            fp(r),
            w0(r.data, fp));
        } else
          n === "graph" || n === "sankey"
            ? YM(r)
            : n === "map" &&
              (r.mapType && !r.map && (r.map = r.mapType),
              r.mapLocation && dt(r, r.mapLocation));
        (r.hoverAnimation != null &&
          ((r.emphasis = r.emphasis || {}),
          r.emphasis &&
            r.emphasis.scale == null &&
            (r.emphasis.scale = r.hoverAnimation)),
          lp(r));
      }
    }),
    e.dataRange && (e.visualMap = e.dataRange),
    M(UM, function (r) {
      var n = e[r];
      n &&
        (W(n) || (n = [n]),
        M(n, function (i) {
          lp(i);
        }));
    }));
}
function $M(e) {
  var t = rt();
  (e.eachSeries(function (r) {
    var n = r.get("stack");
    if (n) {
      var i = t.get(n) || t.set(n, []),
        a = r.getData(),
        o = {
          stackResultDimension: a.getCalculationInfo("stackResultDimension"),
          stackedOverDimension: a.getCalculationInfo("stackedOverDimension"),
          stackedDimension: a.getCalculationInfo("stackedDimension"),
          stackedByDimension: a.getCalculationInfo("stackedByDimension"),
          isStackedByIndex: a.getCalculationInfo("isStackedByIndex"),
          data: a,
          seriesModel: r,
        };
      if (!o.stackedDimension || !(o.isStackedByIndex || o.stackedByDimension))
        return;
      i.push(o);
    }
  }),
    t.each(function (r) {
      if (r.length !== 0) {
        var n = r[0].seriesModel,
          i = n.get("stackOrder") || "seriesAsc";
        (i === "seriesDesc" && r.reverse(),
          M(r, function (a, o) {
            a.data.setCalculationInfo(
              "stackedOnSeries",
              o > 0 ? r[o - 1].seriesModel : null,
            );
          }),
          XM(r));
      }
    }));
}
function XM(e) {
  M(e, function (t, r) {
    var n = [],
      i = [NaN, NaN],
      a = [t.stackResultDimension, t.stackedOverDimension],
      o = t.data,
      s = t.isStackedByIndex,
      l = t.seriesModel.get("stackStrategy") || "samesign";
    o.modify(a, function (u, f, h) {
      var v = o.get(t.stackedDimension, h);
      if (isNaN(v)) return i;
      var c, d;
      s ? (d = o.getRawIndex(h)) : (c = o.get(t.stackedByDimension, h));
      for (var p = NaN, m = r - 1; m >= 0; m--) {
        var g = e[m];
        if ((s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0)) {
          var y = g.data.getByRawIndex(g.stackResultDimension, d);
          if (
            l === "all" ||
            (l === "positive" && y > 0) ||
            (l === "negative" && y < 0) ||
            (l === "samesign" && v >= 0 && y > 0) ||
            (l === "samesign" && v <= 0 && y < 0)
          ) {
            ((v = TS(v, y)), (p = y));
            break;
          }
        }
      }
      return ((n[0] = v), (n[1] = p), n);
    });
  });
}
var ke = (function () {
  function e() {
    ((this.group = new Et()), (this.uid = il("viewComponent")));
  }
  return (
    (e.prototype.init = function (t, r) {}),
    (e.prototype.render = function (t, r, n, i) {}),
    (e.prototype.dispose = function (t, r) {}),
    (e.prototype.updateView = function (t, r, n, i) {}),
    (e.prototype.updateLayout = function (t, r, n, i) {}),
    (e.prototype.updateVisual = function (t, r, n, i) {}),
    (e.prototype.toggleBlurSeries = function (t, r, n) {}),
    (e.prototype.eachRendered = function (t) {
      var r = this.group;
      r && r.traverse(t);
    }),
    e
  );
})();
wh(ke);
Vs(ke);
var hp = _t(),
  cp = { itemStyle: pa(qm, !0), lineStyle: pa(Xm, !0) },
  qM = { lineStyle: "stroke", itemStyle: "fill" };
function T0(e, t) {
  var r = e.visualStyleMapper || cp[t];
  return r || (console.warn("Unknown style type '" + t + "'."), cp.itemStyle);
}
function C0(e, t) {
  var r = e.visualDrawType || qM[t];
  return r || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var ZM = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      var r = e.getData(),
        n = e.visualStyleAccessPath || "itemStyle",
        i = e.getModel(n),
        a = T0(e, n),
        o = a(i),
        s = i.getShallow("decal");
      s && (r.setVisual("decal", s), (s.dirty = !0));
      var l = C0(e, n),
        u = o[l],
        f = Q(u) ? u : null,
        h = o.fill === "auto" || o.stroke === "auto";
      if (!o[l] || f || h) {
        var v = e.getColorFromPalette(e.name, null, t.getSeriesCount());
        (o[l] || ((o[l] = v), r.setVisual("colorFromPalette", !0)),
          (o.fill = o.fill === "auto" || Q(o.fill) ? v : o.fill),
          (o.stroke = o.stroke === "auto" || Q(o.stroke) ? v : o.stroke));
      }
      if (
        (r.setVisual("style", o),
        r.setVisual("drawType", l),
        !t.isSeriesFiltered(e) && f)
      )
        return (
          r.setVisual("colorFromPalette", !1),
          {
            dataEach: function (c, d) {
              var p = e.getDataParams(d),
                m = B({}, o);
              ((m[l] = f(p)), c.setItemVisual(d, "style", m));
            },
          }
        );
    },
  },
  Ni = new bt(),
  KM = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      if (!(e.ignoreStyleOnData || t.isSeriesFiltered(e))) {
        var r = e.getData(),
          n = e.visualStyleAccessPath || "itemStyle",
          i = T0(e, n),
          a = r.getVisual("drawType");
        return {
          dataEach: r.hasItemOption
            ? function (o, s) {
                var l = o.getRawDataItem(s);
                if (l && l[n]) {
                  Ni.option = l[n];
                  var u = i(Ni),
                    f = o.ensureUniqueItemVisual(s, "style");
                  (B(f, u),
                    Ni.option.decal &&
                      (o.setItemVisual(s, "decal", Ni.option.decal),
                      (Ni.option.decal.dirty = !0)),
                    a in u && o.setItemVisual(s, "colorFromPalette", !1));
                }
              }
            : null,
        };
      }
    },
  },
  jM = {
    performRawSeries: !0,
    overallReset: function (e) {
      var t = rt();
      (e.eachSeries(function (r) {
        var n = r.getColorBy();
        if (!r.isColorBySeries()) {
          var i = r.type + "-" + n,
            a = t.get(i);
          (a || ((a = {}), t.set(i, a)), (hp(r).scope = a));
        }
      }),
        e.eachSeries(function (r) {
          if (!(r.isColorBySeries() || e.isSeriesFiltered(r))) {
            var n = r.getRawData(),
              i = {},
              a = r.getData(),
              o = hp(r).scope,
              s = r.visualStyleAccessPath || "itemStyle",
              l = C0(r, s);
            (a.each(function (u) {
              var f = a.getRawIndex(u);
              i[f] = u;
            }),
              n.each(function (u) {
                var f = i[u],
                  h = a.getItemVisual(f, "colorFromPalette");
                if (h) {
                  var v = a.ensureUniqueItemVisual(f, "style"),
                    c = n.getName(u) || u + "",
                    d = n.count();
                  v[l] = r.getColorFromPalette(c, o, d);
                }
              }));
          }
        }));
    },
  },
  wo = Math.PI;
function QM(e, t) {
  ((t = t || {}),
    dt(t, {
      text: "loading",
      textColor: Y.color.primary,
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
      fontFamily: "sans-serif",
      maskColor: "rgba(255,255,255,0.8)",
      showSpinner: !0,
      color: Y.color.theme[0],
      spinnerRadius: 10,
      lineWidth: 5,
      zlevel: 0,
    }));
  var r = new Et(),
    n = new Tt({ style: { fill: t.maskColor }, zlevel: t.zlevel, z: 1e4 });
  r.add(n);
  var i = new Ht({
      style: {
        text: t.text,
        fill: t.textColor,
        fontSize: t.fontSize,
        fontWeight: t.fontWeight,
        fontStyle: t.fontStyle,
        fontFamily: t.fontFamily,
      },
      zlevel: t.zlevel,
      z: 10001,
    }),
    a = new Tt({
      style: { fill: "none" },
      textContent: i,
      textConfig: { position: "right", distance: 10 },
      zlevel: t.zlevel,
      z: 10001,
    });
  r.add(a);
  var o;
  return (
    t.showSpinner &&
      ((o = new js({
        shape: {
          startAngle: -wo / 2,
          endAngle: -wo / 2 + 0.1,
          r: t.spinnerRadius,
        },
        style: { stroke: t.color, lineCap: "round", lineWidth: t.lineWidth },
        zlevel: t.zlevel,
        z: 10001,
      })),
      o
        .animateShape(!0)
        .when(1e3, { endAngle: (wo * 3) / 2 })
        .start("circularInOut"),
      o
        .animateShape(!0)
        .when(1e3, { startAngle: (wo * 3) / 2 })
        .delay(300)
        .start("circularInOut"),
      r.add(o)),
    (r.resize = function () {
      var s = i.getBoundingRect().width,
        l = t.showSpinner ? t.spinnerRadius : 0,
        u =
          (e.getWidth() - l * 2 - (t.showSpinner && s ? 10 : 0) - s) / 2 -
          (t.showSpinner && s ? 0 : 5 + s / 2) +
          (t.showSpinner ? 0 : s / 2) +
          (s ? 0 : l),
        f = e.getHeight() / 2;
      (t.showSpinner && o.setShape({ cx: u, cy: f }),
        a.setShape({ x: u - l, y: f - l, width: l * 2, height: l * 2 }),
        n.setShape({ x: 0, y: 0, width: e.getWidth(), height: e.getHeight() }));
    }),
    r.resize(),
    r
  );
}
var D0 = (function () {
  function e(t, r, n, i) {
    ((this._stageTaskMap = rt()),
      (this.ecInstance = t),
      (this.api = r),
      (n = this._dataProcessorHandlers = n.slice()),
      (i = this._visualHandlers = i.slice()),
      (this._allHandlers = n.concat(i)));
  }
  return (
    (e.prototype.restoreData = function (t, r) {
      (t.restoreData(r),
        this._stageTaskMap.each(function (n) {
          var i = n.overallTask;
          i && i.dirty();
        }));
    }),
    (e.prototype.getPerformArgs = function (t, r) {
      if (t.__pipeline) {
        var n = this._pipelineMap.get(t.__pipeline.id),
          i = n.context,
          a =
            !r &&
            n.progressiveEnabled &&
            (!i || i.progressiveRender) &&
            t.__idxInPipeline > n.blockIndex,
          o = a ? n.step : null,
          s = i && i.modDataCount,
          l = s != null ? Math.ceil(s / o) : null;
        return { step: o, modBy: l, modDataCount: s };
      }
    }),
    (e.prototype.getPipeline = function (t) {
      return this._pipelineMap.get(t);
    }),
    (e.prototype.updateStreamModes = function (t, r) {
      var n = this._pipelineMap.get(t.uid),
        i = t.getData(),
        a = i.count(),
        o =
          n.progressiveEnabled &&
          r.incrementalPrepareRender &&
          a >= n.threshold,
        s = t.get("large") && a >= t.get("largeThreshold"),
        l = t.get("progressiveChunkMode") === "mod" ? a : null;
      t.pipelineContext = n.context = {
        progressiveRender: o,
        modDataCount: l,
        large: s,
      };
    }),
    (e.prototype.restorePipelines = function (t) {
      var r = this,
        n = (r._pipelineMap = rt());
      t.eachSeries(function (i) {
        var a = i.getProgressive(),
          o = i.uid;
        (n.set(o, {
          id: o,
          head: null,
          tail: null,
          threshold: i.getProgressiveThreshold(),
          progressiveEnabled:
            a && !(i.preventIncremental && i.preventIncremental()),
          blockIndex: -1,
          step: Math.round(a || 700),
          count: 0,
        }),
          r._pipe(i, i.dataTask));
      });
    }),
    (e.prototype.prepareStageTasks = function () {
      var t = this._stageTaskMap,
        r = this.api.getModel(),
        n = this.api;
      M(
        this._allHandlers,
        function (i) {
          var a = t.get(i.uid) || t.set(i.uid, {}),
            o = "";
          (dr(!(i.reset && i.overallReset), o),
            i.reset && this._createSeriesStageTask(i, a, r, n),
            i.overallReset && this._createOverallStageTask(i, a, r, n));
        },
        this,
      );
    }),
    (e.prototype.prepareView = function (t, r, n, i) {
      var a = t.renderTask,
        o = a.context;
      ((o.model = r),
        (o.ecModel = n),
        (o.api = i),
        (a.__block = !t.incrementalPrepareRender),
        this._pipe(r, a));
    }),
    (e.prototype.performDataProcessorTasks = function (t, r) {
      this._performStageTasks(this._dataProcessorHandlers, t, r, { block: !0 });
    }),
    (e.prototype.performVisualTasks = function (t, r, n) {
      this._performStageTasks(this._visualHandlers, t, r, n);
    }),
    (e.prototype._performStageTasks = function (t, r, n, i) {
      i = i || {};
      var a = !1,
        o = this;
      M(t, function (l, u) {
        if (!(i.visualType && i.visualType !== l.visualType)) {
          var f = o._stageTaskMap.get(l.uid),
            h = f.seriesTaskMap,
            v = f.overallTask;
          if (v) {
            var c,
              d = v.agentStubMap;
            (d.each(function (m) {
              s(i, m) && (m.dirty(), (c = !0));
            }),
              c && v.dirty(),
              o.updatePayload(v, n));
            var p = o.getPerformArgs(v, i.block);
            (d.each(function (m) {
              m.perform(p);
            }),
              v.perform(p) && (a = !0));
          } else
            h &&
              h.each(function (m, g) {
                s(i, m) && m.dirty();
                var y = o.getPerformArgs(m, i.block);
                ((y.skip =
                  !l.performRawSeries && r.isSeriesFiltered(m.context.model)),
                  o.updatePayload(m, n),
                  m.perform(y) && (a = !0));
              });
        }
      });
      function s(l, u) {
        return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(u.__pipeline.id));
      }
      this.unfinished = a || this.unfinished;
    }),
    (e.prototype.performSeriesTasks = function (t) {
      var r;
      (t.eachSeries(function (n) {
        r = n.dataTask.perform() || r;
      }),
        (this.unfinished = r || this.unfinished));
    }),
    (e.prototype.plan = function () {
      this._pipelineMap.each(function (t) {
        var r = t.tail;
        do {
          if (r.__block) {
            t.blockIndex = r.__idxInPipeline;
            break;
          }
          r = r.getUpstream();
        } while (r);
      });
    }),
    (e.prototype.updatePayload = function (t, r) {
      r !== "remain" && (t.context.payload = r);
    }),
    (e.prototype._createSeriesStageTask = function (t, r, n, i) {
      var a = this,
        o = r.seriesTaskMap,
        s = (r.seriesTaskMap = rt()),
        l = t.seriesType,
        u = t.getTargetSeries;
      t.createOnAllSeries
        ? n.eachRawSeries(f)
        : l
          ? n.eachRawSeriesByType(l, f)
          : u && u(n, i).each(f);
      function f(h) {
        var v = h.uid,
          c = s.set(
            v,
            (o && o.get(v)) || fa({ plan: nA, reset: iA, count: oA }),
          );
        ((c.context = {
          model: h,
          ecModel: n,
          api: i,
          useClearVisual: t.isVisual && !t.isLayout,
          plan: t.plan,
          reset: t.reset,
          scheduler: a,
        }),
          a._pipe(h, c));
      }
    }),
    (e.prototype._createOverallStageTask = function (t, r, n, i) {
      var a = this,
        o = (r.overallTask = r.overallTask || fa({ reset: JM }));
      o.context = {
        ecModel: n,
        api: i,
        overallReset: t.overallReset,
        scheduler: a,
      };
      var s = o.agentStubMap,
        l = (o.agentStubMap = rt()),
        u = t.seriesType,
        f = t.getTargetSeries,
        h = !0,
        v = !1,
        c = "";
      (dr(!t.createOnAllSeries, c),
        u
          ? n.eachRawSeriesByType(u, d)
          : f
            ? f(n, i).each(d)
            : ((h = !1), M(n.getSeries(), d)));
      function d(p) {
        var m = p.uid,
          g = l.set(
            m,
            (s && s.get(m)) || ((v = !0), fa({ reset: tA, onDirty: rA })),
          );
        ((g.context = { model: p, overallProgress: h }),
          (g.agent = o),
          (g.__block = h),
          a._pipe(p, g));
      }
      v && o.dirty();
    }),
    (e.prototype._pipe = function (t, r) {
      var n = t.uid,
        i = this._pipelineMap.get(n);
      (!i.head && (i.head = r),
        i.tail && i.tail.pipe(r),
        (i.tail = r),
        (r.__idxInPipeline = i.count++),
        (r.__pipeline = i));
    }),
    (e.wrapStageHandler = function (t, r) {
      return (
        Q(t) && (t = { overallReset: t, seriesType: sA(t) }),
        (t.uid = il("stageHandler")),
        r && (t.visualType = r),
        t
      );
    }),
    e
  );
})();
function JM(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function tA(e) {
  return e.overallProgress && eA;
}
function eA() {
  (this.agent.dirty(), this.getDownstream().dirty());
}
function rA() {
  this.agent && this.agent.dirty();
}
function nA(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function iA(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = (e.resetDefines = Kt(e.reset(e.model, e.ecModel, e.api, e.payload)));
  return t.length > 1
    ? q(t, function (r, n) {
        return M0(n);
      })
    : aA;
}
var aA = M0(0);
function M0(e) {
  return function (t, r) {
    var n = r.data,
      i = r.resetDefines[e];
    if (i && i.dataEach) for (var a = t.start; a < t.end; a++) i.dataEach(n, a);
    else i && i.progress && i.progress(t, n);
  };
}
function oA(e) {
  return e.data.count();
}
function sA(e) {
  Cs = null;
  try {
    e(Ca, A0);
  } catch {}
  return Cs;
}
var Ca = {},
  A0 = {},
  Cs;
L0(Ca, _c);
L0(A0, S0);
Ca.eachSeriesByType = Ca.eachRawSeriesByType = function (e) {
  Cs = e;
};
Ca.eachComponent = function (e) {
  e.mainType === "series" && e.subType && (Cs = e.subType);
};
function L0(e, t) {
  for (var r in t.prototype) e[r] = ie;
}
var H = Y.darkColor,
  lA = H.background,
  Fi = function () {
    return {
      axisLine: { lineStyle: { color: H.axisLine } },
      splitLine: { lineStyle: { color: H.axisSplitLine } },
      splitArea: {
        areaStyle: { color: [H.backgroundTint, H.backgroundTransparent] },
      },
      minorSplitLine: { lineStyle: { color: H.axisMinorSplitLine } },
      axisLabel: { color: H.axisLabel },
      axisName: {},
    };
  },
  vp = {
    label: { color: H.secondary },
    itemStyle: { borderColor: H.borderTint },
    dividerLineStyle: { color: H.border },
  },
  I0 = {
    darkMode: !0,
    color: H.theme,
    backgroundColor: lA,
    axisPointer: {
      lineStyle: { color: H.border },
      crossStyle: { color: H.borderShade },
      label: { color: H.tertiary },
    },
    legend: {
      textStyle: { color: H.secondary },
      pageTextStyle: { color: H.tertiary },
    },
    textStyle: { color: H.secondary },
    title: {
      textStyle: { color: H.primary },
      subtextStyle: { color: H.quaternary },
    },
    toolbox: { iconStyle: { borderColor: H.accent50 } },
    tooltip: {
      backgroundColor: H.neutral20,
      defaultBorderColor: H.border,
      textStyle: { color: H.tertiary },
    },
    dataZoom: {
      borderColor: H.accent10,
      textStyle: { color: H.tertiary },
      brushStyle: { color: H.backgroundTint },
      handleStyle: { color: H.neutral00, borderColor: H.accent20 },
      moveHandleStyle: { color: H.accent40 },
      emphasis: { handleStyle: { borderColor: H.accent50 } },
      dataBackground: {
        lineStyle: { color: H.accent30 },
        areaStyle: { color: H.accent20 },
      },
      selectedDataBackground: {
        lineStyle: { color: H.accent50 },
        areaStyle: { color: H.accent30 },
      },
    },
    visualMap: {
      textStyle: { color: H.secondary },
      handleStyle: { borderColor: H.neutral30 },
    },
    timeline: {
      lineStyle: { color: H.accent10 },
      label: { color: H.tertiary },
      controlStyle: { color: H.accent30, borderColor: H.accent30 },
    },
    calendar: {
      itemStyle: { color: H.neutral00, borderColor: H.neutral20 },
      dayLabel: { color: H.tertiary },
      monthLabel: { color: H.secondary },
      yearLabel: { color: H.secondary },
    },
    matrix: {
      x: vp,
      y: vp,
      backgroundColor: { borderColor: H.axisLine },
      body: { itemStyle: { borderColor: H.borderTint } },
    },
    timeAxis: Fi(),
    logAxis: Fi(),
    valueAxis: Fi(),
    categoryAxis: Fi(),
    line: { symbol: "circle" },
    graph: { color: H.theme },
    gauge: {
      title: { color: H.secondary },
      axisLine: { lineStyle: { color: [[1, H.neutral05]] } },
      axisLabel: { color: H.axisLabel },
      detail: { color: H.primary },
    },
    candlestick: {
      itemStyle: {
        color: "#f64e56",
        color0: "#54ea92",
        borderColor: "#f64e56",
        borderColor0: "#54ea92",
      },
    },
    funnel: { itemStyle: { borderColor: H.background } },
    radar: (function () {
      var e = Fi();
      return (
        (e.axisName = { color: H.axisLabel }),
        (e.axisLine.lineStyle.color = H.neutral20),
        e
      );
    })(),
    treemap: {
      breadcrumb: {
        itemStyle: { color: H.neutral20, textStyle: { color: H.secondary } },
        emphasis: { itemStyle: { color: H.neutral30 } },
      },
    },
    sunburst: { itemStyle: { borderColor: H.background } },
    map: {
      itemStyle: { borderColor: H.border, areaColor: H.neutral10 },
      label: { color: H.tertiary },
      emphasis: {
        label: { color: H.primary },
        itemStyle: { areaColor: H.highlight },
      },
      select: {
        label: { color: H.primary },
        itemStyle: { areaColor: H.highlight },
      },
    },
    geo: {
      itemStyle: { borderColor: H.border, areaColor: H.neutral10 },
      emphasis: {
        label: { color: H.primary },
        itemStyle: { areaColor: H.highlight },
      },
      select: {
        label: { color: H.primary },
        itemStyle: { color: H.highlight },
      },
    },
  };
I0.categoryAxis.splitLine.show = !1;
var uA = (function () {
    function e() {}
    return (
      (e.prototype.normalizeQuery = function (t) {
        var r = {},
          n = {},
          i = {};
        if (U(t)) {
          var a = $e(t);
          ((r.mainType = a.main || null), (r.subType = a.sub || null));
        } else {
          var o = ["Index", "Name", "Id"],
            s = { name: 1, dataIndex: 1, dataType: 1 };
          M(t, function (l, u) {
            for (var f = !1, h = 0; h < o.length; h++) {
              var v = o[h],
                c = u.lastIndexOf(v);
              if (c > 0 && c === u.length - v.length) {
                var d = u.slice(0, c);
                d !== "data" &&
                  ((r.mainType = d), (r[v.toLowerCase()] = l), (f = !0));
              }
            }
            (s.hasOwnProperty(u) && ((n[u] = l), (f = !0)), f || (i[u] = l));
          });
        }
        return { cptQuery: r, dataQuery: n, otherQuery: i };
      }),
      (e.prototype.filter = function (t, r) {
        var n = this.eventInfo;
        if (!n) return !0;
        var i = n.targetEl,
          a = n.packedEvent,
          o = n.model,
          s = n.view;
        if (!o || !s) return !0;
        var l = r.cptQuery,
          u = r.dataQuery;
        return (
          f(l, o, "mainType") &&
          f(l, o, "subType") &&
          f(l, o, "index", "componentIndex") &&
          f(l, o, "name") &&
          f(l, o, "id") &&
          f(u, a, "name") &&
          f(u, a, "dataIndex") &&
          f(u, a, "dataType") &&
          (!s.filterForExposedEvent ||
            s.filterForExposedEvent(t, r.otherQuery, i, a))
        );
        function f(h, v, c, d) {
          return h[c] == null || v[d || c] === h[c];
        }
      }),
      (e.prototype.afterTrigger = function () {
        this.eventInfo = null;
      }),
      e
    );
  })(),
  Hf = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"],
  dp = Hf.concat(["symbolKeepAspect"]),
  fA = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      var r = e.getData();
      if (
        (e.legendIcon && r.setVisual("legendIcon", e.legendIcon),
        !e.hasSymbolVisual)
      )
        return;
      for (var n = {}, i = {}, a = !1, o = 0; o < Hf.length; o++) {
        var s = Hf[o],
          l = e.get(s);
        Q(l) ? ((a = !0), (i[s] = l)) : (n[s] = l);
      }
      if (
        ((n.symbol = n.symbol || e.defaultSymbol),
        r.setVisual(
          B(
            {
              legendIcon: e.legendIcon || n.symbol,
              symbolKeepAspect: e.get("symbolKeepAspect"),
            },
            n,
          ),
        ),
        t.isSeriesFiltered(e))
      )
        return;
      var u = yt(i);
      function f(h, v) {
        for (
          var c = e.getRawValue(v), d = e.getDataParams(v), p = 0;
          p < u.length;
          p++
        ) {
          var m = u[p];
          h.setItemVisual(v, m, i[m](c, d));
        }
      }
      return { dataEach: a ? f : null };
    },
  },
  hA = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      if (!e.hasSymbolVisual || t.isSeriesFiltered(e)) return;
      var r = e.getData();
      function n(i, a) {
        for (var o = i.getItemModel(a), s = 0; s < dp.length; s++) {
          var l = dp[s],
            u = o.getShallow(l, !0);
          u != null && i.setItemVisual(a, l, u);
        }
      }
      return { dataEach: r.hasItemOption ? n : null };
    },
  };
function cA(e, t, r) {
  switch (r) {
    case "color":
      var n = e.getItemVisual(t, "style");
      return n[e.getVisual("drawType")];
    case "opacity":
      return e.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getItemVisual(t, r);
  }
}
function vA(e, t) {
  switch (t) {
    case "color":
      var r = e.getVisual("style");
      return r[e.getVisual("drawType")];
    case "opacity":
      return e.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getVisual(t);
  }
}
function ji(e, t, r) {
  for (var n; e && !(t(e) && ((n = e), r)); ) e = e.__hostTarget || e.parent;
  return n;
}
var dA = Math.round(Math.random() * 9),
  pA = typeof Object.defineProperty == "function",
  gA = (function () {
    function e() {
      this._id = "__ec_inner_" + dA++;
    }
    return (
      (e.prototype.get = function (t) {
        return this._guard(t)[this._id];
      }),
      (e.prototype.set = function (t, r) {
        var n = this._guard(t);
        return (
          pA
            ? Object.defineProperty(n, this._id, {
                value: r,
                enumerable: !1,
                configurable: !0,
              })
            : (n[this._id] = r),
          this
        );
      }),
      (e.prototype.delete = function (t) {
        return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
      }),
      (e.prototype.has = function (t) {
        return !!this._guard(t)[this._id];
      }),
      (e.prototype._guard = function (t) {
        if (t !== Object(t))
          throw TypeError("Value of WeakMap is not a non-null object.");
        return t;
      }),
      e
    );
  })();
function xn(e) {
  return isFinite(e);
}
function mA(e, t, r) {
  var n = t.x == null ? 0 : t.x,
    i = t.x2 == null ? 1 : t.x2,
    a = t.y == null ? 0 : t.y,
    o = t.y2 == null ? 0 : t.y2;
  (t.global ||
    ((n = n * r.width + r.x),
    (i = i * r.width + r.x),
    (a = a * r.height + r.y),
    (o = o * r.height + r.y)),
    (n = xn(n) ? n : 0),
    (i = xn(i) ? i : 1),
    (a = xn(a) ? a : 0),
    (o = xn(o) ? o : 0));
  var s = e.createLinearGradient(n, a, i, o);
  return s;
}
function yA(e, t, r) {
  var n = r.width,
    i = r.height,
    a = Math.min(n, i),
    o = t.x == null ? 0.5 : t.x,
    s = t.y == null ? 0.5 : t.y,
    l = t.r == null ? 0.5 : t.r;
  (t.global || ((o = o * n + r.x), (s = s * i + r.y), (l = l * a)),
    (o = xn(o) ? o : 0.5),
    (s = xn(s) ? s : 0.5),
    (l = l >= 0 && xn(l) ? l : 0.5));
  var u = e.createRadialGradient(o, s, 0, o, s, l);
  return u;
}
function Vf(e, t, r) {
  for (
    var n = t.type === "radial" ? yA(e, t, r) : mA(e, t, r),
      i = t.colorStops,
      a = 0;
    a < i.length;
    a++
  )
    n.addColorStop(i[a].offset, i[a].color);
  return n;
}
function _A(e, t) {
  if (e === t || (!e && !t)) return !1;
  if (!e || !t || e.length !== t.length) return !0;
  for (var r = 0; r < e.length; r++) if (e[r] !== t[r]) return !0;
  return !1;
}
function xo(e) {
  return parseInt(e, 10);
}
function To(e, t, r) {
  var n = ["width", "height"][t],
    i = ["clientWidth", "clientHeight"][t],
    a = ["paddingLeft", "paddingTop"][t],
    o = ["paddingRight", "paddingBottom"][t];
  if (r[n] != null && r[n] !== "auto") return parseFloat(r[n]);
  var s = document.defaultView.getComputedStyle(e);
  return (
    ((e[i] || xo(s[n]) || xo(e.style[n])) - (xo(s[a]) || 0) - (xo(s[o]) || 0)) |
    0
  );
}
function bA(e, t) {
  return !e || e === "solid" || !(t > 0)
    ? null
    : e === "dashed"
      ? [4 * t, 2 * t]
      : e === "dotted"
        ? [t]
        : vt(e)
          ? [e]
          : W(e)
            ? e
            : null;
}
function P0(e) {
  var t = e.style,
    r = t.lineDash && t.lineWidth > 0 && bA(t.lineDash, t.lineWidth),
    n = t.lineDashOffset;
  if (r) {
    var i = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
    i &&
      i !== 1 &&
      ((r = q(r, function (a) {
        return a / i;
      })),
      (n /= i));
  }
  return [r, n];
}
var SA = new kn(!0);
function Ds(e) {
  var t = e.stroke;
  return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function pp(e) {
  return typeof e == "string" && e !== "none";
}
function Ms(e) {
  var t = e.fill;
  return t != null && t !== "none";
}
function gp(e, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var r = e.globalAlpha;
    ((e.globalAlpha = t.fillOpacity * t.opacity),
      e.fill(),
      (e.globalAlpha = r));
  } else e.fill();
}
function mp(e, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var r = e.globalAlpha;
    ((e.globalAlpha = t.strokeOpacity * t.opacity),
      e.stroke(),
      (e.globalAlpha = r));
  } else e.stroke();
}
function Wf(e, t, r) {
  var n = Wg(t.image, t.__image, r);
  if (Ws(n)) {
    var i = e.createPattern(n, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && i && i.setTransform) {
      var a = new DOMMatrix();
      (a.translateSelf(t.x || 0, t.y || 0),
        a.rotateSelf(0, 0, (t.rotation || 0) * B1),
        a.scaleSelf(t.scaleX || 1, t.scaleY || 1),
        i.setTransform(a));
    }
    return i;
  }
}
function wA(e, t, r, n) {
  var i,
    a = Ds(r),
    o = Ms(r),
    s = r.strokePercent,
    l = s < 1,
    u = !t.path;
  (!t.silent || l) && u && t.createPathProxy();
  var f = t.path || SA,
    h = t.__dirty;
  if (!n) {
    var v = r.fill,
      c = r.stroke,
      d = o && !!v.colorStops,
      p = a && !!c.colorStops,
      m = o && !!v.image,
      g = a && !!c.image,
      y = void 0,
      _ = void 0,
      b = void 0,
      w = void 0,
      S = void 0;
    ((d || p) && (S = t.getBoundingRect()),
      d &&
        ((y = h ? Vf(e, v, S) : t.__canvasFillGradient),
        (t.__canvasFillGradient = y)),
      p &&
        ((_ = h ? Vf(e, c, S) : t.__canvasStrokeGradient),
        (t.__canvasStrokeGradient = _)),
      m &&
        ((b =
          h || !t.__canvasFillPattern ? Wf(e, v, t) : t.__canvasFillPattern),
        (t.__canvasFillPattern = b)),
      g &&
        ((w =
          h || !t.__canvasStrokePattern
            ? Wf(e, c, t)
            : t.__canvasStrokePattern),
        (t.__canvasStrokePattern = w)),
      d ? (e.fillStyle = y) : m && (b ? (e.fillStyle = b) : (o = !1)),
      p ? (e.strokeStyle = _) : g && (w ? (e.strokeStyle = w) : (a = !1)));
  }
  var x = t.getGlobalScale();
  f.setScale(x[0], x[1], t.segmentIgnoreThreshold);
  var T, D;
  e.setLineDash && r.lineDash && ((i = P0(t)), (T = i[0]), (D = i[1]));
  var A = !0;
  ((u || h & ei) &&
    (f.setDPR(e.dpr),
    l ? f.setContext(null) : (f.setContext(e), (A = !1)),
    f.reset(),
    t.buildPath(f, t.shape, n),
    f.toStatic(),
    t.pathUpdated()),
    A && f.rebuildPath(e, l ? s : 1),
    T && (e.setLineDash(T), (e.lineDashOffset = D)),
    n ||
      (r.strokeFirst
        ? (a && mp(e, r), o && gp(e, r))
        : (o && gp(e, r), a && mp(e, r))),
    T && e.setLineDash([]));
}
function xA(e, t, r) {
  var n = (t.__image = Wg(r.image, t.__image, t, t.onload));
  if (!(!n || !Ws(n))) {
    var i = r.x || 0,
      a = r.y || 0,
      o = t.getWidth(),
      s = t.getHeight(),
      l = n.width / n.height;
    if (
      (o == null && s != null
        ? (o = s * l)
        : s == null && o != null
          ? (s = o / l)
          : o == null && s == null && ((o = n.width), (s = n.height)),
      r.sWidth && r.sHeight)
    ) {
      var u = r.sx || 0,
        f = r.sy || 0;
      e.drawImage(n, u, f, r.sWidth, r.sHeight, i, a, o, s);
    } else if (r.sx && r.sy) {
      var u = r.sx,
        f = r.sy,
        h = o - u,
        v = s - f;
      e.drawImage(n, u, f, h, v, i, a, o, s);
    } else e.drawImage(n, i, a, o, s);
  }
}
function TA(e, t, r) {
  var n,
    i = r.text;
  if ((i != null && (i += ""), i)) {
    ((e.font = r.font || Nr),
      (e.textAlign = r.textAlign),
      (e.textBaseline = r.textBaseline));
    var a = void 0,
      o = void 0;
    (e.setLineDash && r.lineDash && ((n = P0(t)), (a = n[0]), (o = n[1])),
      a && (e.setLineDash(a), (e.lineDashOffset = o)),
      r.strokeFirst
        ? (Ds(r) && e.strokeText(i, r.x, r.y), Ms(r) && e.fillText(i, r.x, r.y))
        : (Ms(r) && e.fillText(i, r.x, r.y),
          Ds(r) && e.strokeText(i, r.x, r.y)),
      a && e.setLineDash([]));
  }
}
var yp = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"],
  _p = [
    ["lineCap", "butt"],
    ["lineJoin", "miter"],
    ["miterLimit", 10],
  ];
function k0(e, t, r, n, i) {
  var a = !1;
  if (!n && ((r = r || {}), t === r)) return !1;
  if (n || t.opacity !== r.opacity) {
    (ne(e, i), (a = !0));
    var o = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(o) ? An.opacity : o;
  }
  (n || t.blend !== r.blend) &&
    (a || (ne(e, i), (a = !0)),
    (e.globalCompositeOperation = t.blend || An.blend));
  for (var s = 0; s < yp.length; s++) {
    var l = yp[s];
    (n || t[l] !== r[l]) &&
      (a || (ne(e, i), (a = !0)), (e[l] = e.dpr * (t[l] || 0)));
  }
  return (
    (n || t.shadowColor !== r.shadowColor) &&
      (a || (ne(e, i), (a = !0)),
      (e.shadowColor = t.shadowColor || An.shadowColor)),
    a
  );
}
function bp(e, t, r, n, i) {
  var a = Da(t, i.inHover),
    o = n ? null : (r && Da(r, i.inHover)) || {};
  if (a === o) return !1;
  var s = k0(e, a, o, n, i);
  if (
    ((n || a.fill !== o.fill) &&
      (s || (ne(e, i), (s = !0)), pp(a.fill) && (e.fillStyle = a.fill)),
    (n || a.stroke !== o.stroke) &&
      (s || (ne(e, i), (s = !0)), pp(a.stroke) && (e.strokeStyle = a.stroke)),
    (n || a.opacity !== o.opacity) &&
      (s || (ne(e, i), (s = !0)),
      (e.globalAlpha = a.opacity == null ? 1 : a.opacity)),
    t.hasStroke())
  ) {
    var l = a.lineWidth,
      u = l / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== u && (s || (ne(e, i), (s = !0)), (e.lineWidth = u));
  }
  for (var f = 0; f < _p.length; f++) {
    var h = _p[f],
      v = h[0];
    (n || a[v] !== o[v]) && (s || (ne(e, i), (s = !0)), (e[v] = a[v] || h[1]));
  }
  return s;
}
function CA(e, t, r, n, i) {
  return k0(e, Da(t, i.inHover), r && Da(r, i.inHover), n, i);
}
function R0(e, t) {
  var r = t.transform,
    n = e.dpr || 1;
  r
    ? e.setTransform(n * r[0], n * r[1], n * r[2], n * r[3], n * r[4], n * r[5])
    : e.setTransform(n, 0, 0, n, 0, 0);
}
function DA(e, t, r) {
  for (var n = !1, i = 0; i < e.length; i++) {
    var a = e[i];
    ((n = n || a.isZeroArea()),
      R0(t, a),
      t.beginPath(),
      a.buildPath(t, a.shape),
      t.clip());
  }
  r.allClipped = n;
}
function MA(e, t) {
  return e && t
    ? e[0] !== t[0] ||
        e[1] !== t[1] ||
        e[2] !== t[2] ||
        e[3] !== t[3] ||
        e[4] !== t[4] ||
        e[5] !== t[5]
    : !(!e && !t);
}
var Sp = 1,
  wp = 2,
  xp = 3,
  Tp = 4;
function AA(e) {
  var t = Ms(e),
    r = Ds(e);
  return !(
    e.lineDash ||
    !(+t ^ +r) ||
    (t && typeof e.fill != "string") ||
    (r && typeof e.stroke != "string") ||
    e.strokePercent < 1 ||
    e.strokeOpacity < 1 ||
    e.fillOpacity < 1
  );
}
function ne(e, t) {
  (t.batchFill && e.fill(),
    t.batchStroke && e.stroke(),
    (t.batchFill = ""),
    (t.batchStroke = ""));
}
function Da(e, t) {
  return (t && e.__hoverStyle) || e.style;
}
function E0(e, t) {
  Tn(e, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Tn(e, t, r, n) {
  var i = t.transform;
  if (!t.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1)) {
    ((t.__dirty &= ~le), (t.__isRendered = !1));
    return;
  }
  var a = t.__clipPaths,
    o = r.prevElClipPaths,
    s = !1,
    l = !1;
  if (
    ((!o || _A(a, o)) &&
      (o &&
        o.length &&
        (ne(e, r),
        e.restore(),
        (l = s = !0),
        (r.prevElClipPaths = null),
        (r.allClipped = !1),
        (r.prevEl = null)),
      a && a.length && (ne(e, r), e.save(), DA(a, e, r), (s = !0)),
      (r.prevElClipPaths = a)),
    r.allClipped)
  ) {
    t.__isRendered = !1;
    return;
  }
  (t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush());
  var u = r.prevEl;
  u || (l = s = !0);
  var f = t instanceof pt && t.autoBatch && AA(t.style);
  s || MA(i, u.transform) ? (ne(e, r), R0(e, t)) : f || ne(e, r);
  var h = Da(t, r.inHover);
  (t instanceof pt
    ? (r.lastDrawType !== Sp && ((l = !0), (r.lastDrawType = Sp)),
      bp(e, t, u, l, r),
      (!f || (!r.batchFill && !r.batchStroke)) && e.beginPath(),
      wA(e, t, h, f),
      f && ((r.batchFill = h.fill || ""), (r.batchStroke = h.stroke || "")))
    : t instanceof as
      ? (r.lastDrawType !== xp && ((l = !0), (r.lastDrawType = xp)),
        bp(e, t, u, l, r),
        TA(e, t, h))
      : t instanceof Yr
        ? (r.lastDrawType !== wp && ((l = !0), (r.lastDrawType = wp)),
          CA(e, t, u, l, r),
          xA(e, t, h))
        : t.getTemporalDisplayables &&
          (r.lastDrawType !== Tp && ((l = !0), (r.lastDrawType = Tp)),
          LA(e, t, r)),
    f && n && ne(e, r),
    t.innerAfterBrush(),
    t.afterBrush && t.afterBrush(),
    (r.prevEl = t),
    (t.__dirty = 0),
    (t.__isRendered = !0));
}
function LA(e, t, r) {
  var n = t.getDisplayables(),
    i = t.getTemporalDisplayables();
  e.save();
  var a = {
      prevElClipPaths: null,
      prevEl: null,
      allClipped: !1,
      viewWidth: r.viewWidth,
      viewHeight: r.viewHeight,
      inHover: r.inHover,
    },
    o,
    s;
  for (o = t.getCursor(), s = n.length; o < s; o++) {
    var l = n[o];
    (l.beforeBrush && l.beforeBrush(),
      l.innerBeforeBrush(),
      Tn(e, l, a, o === s - 1),
      l.innerAfterBrush(),
      l.afterBrush && l.afterBrush(),
      (a.prevEl = l));
  }
  for (var u = 0, f = i.length; u < f; u++) {
    var l = i[u];
    (l.beforeBrush && l.beforeBrush(),
      l.innerBeforeBrush(),
      Tn(e, l, a, u === f - 1),
      l.innerAfterBrush(),
      l.afterBrush && l.afterBrush(),
      (a.prevEl = l));
  }
  (t.clearTemporalDisplayables(), (t.notClear = !0), e.restore());
}
var Tu = new gA(),
  Cp = new hi(100),
  Dp = [
    "symbol",
    "symbolSize",
    "symbolKeepAspect",
    "color",
    "backgroundColor",
    "dashArrayX",
    "dashArrayY",
    "maxTileWidth",
    "maxTileHeight",
  ];
function Uf(e, t) {
  if (e === "none") return null;
  var r = t.getDevicePixelRatio(),
    n = t.getZr(),
    i = n.painter.type === "svg";
  e.dirty && Tu.delete(e);
  var a = Tu.get(e);
  if (a) return a;
  var o = dt(e, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512,
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  var s = { repeat: "repeat" };
  return (
    l(s),
    (s.rotation = o.rotation),
    (s.scaleX = s.scaleY = i ? 1 : 1 / r),
    Tu.set(e, s),
    (e.dirty = !1),
    s
  );
  function l(u) {
    for (var f = [r], h = !0, v = 0; v < Dp.length; ++v) {
      var c = o[Dp[v]];
      if (c != null && !W(c) && !U(c) && !vt(c) && typeof c != "boolean") {
        h = !1;
        break;
      }
      f.push(c);
    }
    var d;
    if (h) {
      d = f.join(",") + (i ? "-svg" : "");
      var p = Cp.get(d);
      p && (i ? (u.svgElement = p) : (u.image = p));
    }
    var m = B0(o.dashArrayX),
      g = IA(o.dashArrayY),
      y = O0(o.symbol),
      _ = PA(m),
      b = N0(g),
      w = !i && vr.createCanvas(),
      S = i && { tag: "g", attrs: {}, key: "dcl", children: [] },
      x = D(),
      T;
    (w &&
      ((w.width = x.width * r),
      (w.height = x.height * r),
      (T = w.getContext("2d"))),
      A(),
      h && Cp.put(d, w || S),
      (u.image = w),
      (u.svgElement = S),
      (u.svgWidth = x.width),
      (u.svgHeight = x.height));
    function D() {
      for (var C = 1, I = 0, L = _.length; I < L; ++I) C = bv(C, _[I]);
      for (var P = 1, I = 0, L = y.length; I < L; ++I) P = bv(P, y[I].length);
      C *= P;
      var k = b * _.length * y.length;
      return {
        width: Math.max(1, Math.min(C, o.maxTileWidth)),
        height: Math.max(1, Math.min(k, o.maxTileHeight)),
      };
    }
    function A() {
      T &&
        (T.clearRect(0, 0, w.width, w.height),
        o.backgroundColor &&
          ((T.fillStyle = o.backgroundColor),
          T.fillRect(0, 0, w.width, w.height)));
      for (var C = 0, I = 0; I < g.length; ++I) C += g[I];
      if (C <= 0) return;
      for (var L = -b, P = 0, k = 0, E = 0; L < x.height; ) {
        if (P % 2 === 0) {
          for (
            var V = (k / 2) % y.length, R = 0, O = 0, z = 0;
            R < x.width * 2;

          ) {
            for (var F = 0, I = 0; I < m[E].length; ++I) F += m[E][I];
            if (F <= 0) break;
            if (O % 2 === 0) {
              var N = (1 - o.symbolSize) * 0.5,
                $ = R + m[E][O] * N,
                nt = L + g[P] * N,
                ft = m[E][O] * o.symbolSize,
                Ot = g[P] * o.symbolSize,
                Xt = (z / 2) % y[V].length;
              Vt($, nt, ft, Ot, y[V][Xt]);
            }
            ((R += m[E][O]), ++z, ++O, O === m[E].length && (O = 0));
          }
          (++E, E === m.length && (E = 0));
        }
        ((L += g[P]), ++k, ++P, P === g.length && (P = 0));
      }
      function Vt(Bt, Ct, j, it, Ne) {
        var Lt = i ? 1 : r,
          gr = gi(
            Ne,
            Bt * Lt,
            Ct * Lt,
            j * Lt,
            it * Lt,
            o.color,
            o.symbolKeepAspect,
          );
        if (i) {
          var rr = n.painter.renderOneToVNode(gr);
          rr && S.children.push(rr);
        } else E0(T, gr);
      }
    }
  }
}
function O0(e) {
  if (!e || e.length === 0) return [["rect"]];
  if (U(e)) return [[e]];
  for (var t = !0, r = 0; r < e.length; ++r)
    if (!U(e[r])) {
      t = !1;
      break;
    }
  if (t) return O0([e]);
  for (var n = [], r = 0; r < e.length; ++r)
    U(e[r]) ? n.push([e[r]]) : n.push(e[r]);
  return n;
}
function B0(e) {
  if (!e || e.length === 0) return [[0, 0]];
  if (vt(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var r = !0, n = 0; n < e.length; ++n)
    if (!vt(e[n])) {
      r = !1;
      break;
    }
  if (r) return B0([e]);
  for (var i = [], n = 0; n < e.length; ++n)
    if (vt(e[n])) {
      var t = Math.ceil(e[n]);
      i.push([t, t]);
    } else {
      var t = q(e[n], function (s) {
        return Math.ceil(s);
      });
      t.length % 2 === 1 ? i.push(t.concat(t)) : i.push(t);
    }
  return i;
}
function IA(e) {
  if (!e || (typeof e == "object" && e.length === 0)) return [0, 0];
  if (vt(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var r = q(e, function (n) {
    return Math.ceil(n);
  });
  return e.length % 2 ? r.concat(r) : r;
}
function PA(e) {
  return q(e, function (t) {
    return N0(t);
  });
}
function N0(e) {
  for (var t = 0, r = 0; r < e.length; ++r) t += e[r];
  return e.length % 2 === 1 ? t * 2 : t;
}
function kA(e, t) {
  e.eachRawSeries(function (r) {
    if (!e.isSeriesFiltered(r)) {
      var n = r.getData();
      n.hasItemVisual() &&
        n.each(function (o) {
          var s = n.getItemVisual(o, "decal");
          if (s) {
            var l = n.ensureUniqueItemVisual(o, "style");
            l.decal = Uf(s, t);
          }
        });
      var i = n.getVisual("decal");
      if (i) {
        var a = n.getVisual("style");
        a.decal = Uf(i, t);
      }
    }
  });
}
var Le = new er(),
  F0 = {};
function RA(e, t) {
  F0[e] = t;
}
function EA(e) {
  return F0[e];
}
var OA = 1,
  BA = 800,
  NA = 900,
  FA = 1e3,
  zA = 2e3,
  GA = 5e3,
  z0 = 1e3,
  HA = 1100,
  bc = 2e3,
  G0 = 3e3,
  VA = 4e3,
  ll = 4500,
  WA = 4600,
  UA = 5e3,
  YA = 6e3,
  H0 = 7e3,
  $A = {
    PROCESSOR: { FILTER: FA, SERIES_FILTER: BA, STATISTIC: GA },
    VISUAL: {
      LAYOUT: z0,
      PROGRESSIVE_LAYOUT: HA,
      GLOBAL: bc,
      CHART: G0,
      POST_CHART_LAYOUT: WA,
      COMPONENT: VA,
      BRUSH: UA,
      CHART_ITEM: ll,
      ARIA: YA,
      DECAL: H0,
    },
  },
  At = "__flagInMainProcess",
  Co = "__mainProcessVersion",
  It = "__pendingUpdate",
  Cu = "__needsUpdateStatus",
  Mp = /^[a-zA-Z0-9_]+$/,
  Du = "__connectUpdateStatus",
  Ap = 0,
  XA = 1,
  qA = 2;
function V0(e) {
  return function () {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    if (this.isDisposed()) {
      this.id;
      return;
    }
    return U0(this, e, t);
  };
}
function W0(e) {
  return function () {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    return U0(this, e, t);
  };
}
function U0(e, t, r) {
  return ((r[0] = r[0] && r[0].toLowerCase()), er.prototype[t].apply(e, r));
}
var Y0 = (function (e) {
    G(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return t;
  })(er),
  $0 = Y0.prototype;
$0.on = W0("on");
$0.off = W0("off");
var yn,
  Mu,
  Do,
  ar,
  Mo,
  Au,
  Lu,
  jn,
  Qn,
  Lp,
  Ip,
  Iu,
  Pp,
  Ao,
  kp,
  X0,
  he,
  Rp,
  Jn,
  q0 = (function (e) {
    G(t, e);
    function t(r, n, i) {
      var a = e.call(this, new uA()) || this;
      ((a._chartsViews = []),
        (a._chartsMap = {}),
        (a._componentsViews = []),
        (a._componentsMap = {}),
        (a._pendingActions = []),
        (i = i || {}),
        (a._dom = r));
      var o = "canvas",
        s = "auto",
        l = !1;
      ((a[Co] = 1), i.ssr);
      var u = (a._zr = tp(r, {
        renderer: i.renderer || o,
        devicePixelRatio: i.devicePixelRatio,
        width: i.width,
        height: i.height,
        ssr: i.ssr,
        useDirtyRect: K(i.useDirtyRect, l),
        useCoarsePointer: K(i.useCoarsePointer, s),
        pointerSize: i.pointerSize,
      }));
      ((a._ssr = i.ssr),
        (a._throttledZrFlush = gc(ct(u.flush, u), 17)),
        a._updateTheme(n),
        (a._locale = _T(i.locale || _y)),
        (a._coordSysMgr = new Kh()));
      var f = (a._api = kp(a));
      function h(v, c) {
        return v.__prio - c.__prio;
      }
      return (
        Xo(Ls, h),
        Xo(Xf, h),
        (a._scheduler = new D0(a, f, Xf, Ls)),
        (a._messageCenter = new Y0()),
        a._initEvents(),
        (a.resize = ct(a.resize, a)),
        u.animation.on("frame", a._onframe, a),
        Lp(u, a),
        Ip(u, a),
        Uu(a),
        a
      );
    }
    return (
      (t.prototype._onframe = function () {
        if (!this._disposed) {
          Rp(this);
          var r = this._scheduler;
          if (this[It]) {
            var n = this[It].silent;
            ((this[At] = !0), Jn(this));
            try {
              (yn(this), ar.update.call(this, null, this[It].updateParams));
            } catch (l) {
              throw ((this[At] = !1), (this[It] = null), l);
            }
            (this._zr.flush(),
              (this[At] = !1),
              (this[It] = null),
              jn.call(this, n),
              Qn.call(this, n));
          } else if (r.unfinished) {
            var i = OA,
              a = this._model,
              o = this._api;
            r.unfinished = !1;
            do {
              var s = +new Date();
              (r.performSeriesTasks(a),
                r.performDataProcessorTasks(a),
                Au(this, a),
                r.performVisualTasks(a),
                Ao(this, this._model, o, "remain", {}),
                (i -= +new Date() - s));
            } while (i > 0 && r.unfinished);
            r.unfinished || this._zr.flush();
          }
        }
      }),
      (t.prototype.getDom = function () {
        return this._dom;
      }),
      (t.prototype.getId = function () {
        return this.id;
      }),
      (t.prototype.getZr = function () {
        return this._zr;
      }),
      (t.prototype.isSSR = function () {
        return this._ssr;
      }),
      (t.prototype.setOption = function (r, n, i) {
        if (!this[At]) {
          if (this._disposed) {
            this.id;
            return;
          }
          var a, o, s;
          if (
            (X(n) &&
              ((i = n.lazyUpdate),
              (a = n.silent),
              (o = n.replaceMerge),
              (s = n.transition),
              (n = n.notMerge)),
            (this[At] = !0),
            Jn(this),
            !this._model || n)
          ) {
            var l = new EM(this._api),
              u = this._theme,
              f = (this._model = new _c());
            ((f.scheduler = this._scheduler),
              (f.ssr = this._ssr),
              f.init(null, null, null, u, this._locale, l));
          }
          this._model.setOption(r, { replaceMerge: o }, qf);
          var h = { seriesTransition: s, optionChanged: !0 };
          if (i)
            ((this[It] = { silent: a, updateParams: h }),
              (this[At] = !1),
              this.getZr().wakeUp());
          else {
            try {
              (yn(this), ar.update.call(this, null, h));
            } catch (v) {
              throw ((this[It] = null), (this[At] = !1), v);
            }
            (this._ssr || this._zr.flush(),
              (this[It] = null),
              (this[At] = !1),
              jn.call(this, a),
              Qn.call(this, a));
          }
        }
      }),
      (t.prototype.setTheme = function (r, n) {
        if (!this[At]) {
          if (this._disposed) {
            this.id;
            return;
          }
          var i = this._model;
          if (i) {
            var a = n && n.silent,
              o = null;
            (this[It] &&
              (a == null && (a = this[It].silent),
              (o = this[It].updateParams),
              (this[It] = null)),
              (this[At] = !0),
              Jn(this));
            try {
              (this._updateTheme(r),
                i.setTheme(this._theme),
                yn(this),
                ar.update.call(this, { type: "setTheme" }, o));
            } catch (s) {
              throw ((this[At] = !1), s);
            }
            ((this[At] = !1), jn.call(this, a), Qn.call(this, a));
          }
        }
      }),
      (t.prototype._updateTheme = function (r) {
        (U(r) && (r = Z0[r]),
          r && ((r = at(r)), r && x0(r, !0), (this._theme = r)));
      }),
      (t.prototype.getModel = function () {
        return this._model;
      }),
      (t.prototype.getOption = function () {
        return this._model && this._model.getOption();
      }),
      (t.prototype.getWidth = function () {
        return this._zr.getWidth();
      }),
      (t.prototype.getHeight = function () {
        return this._zr.getHeight();
      }),
      (t.prototype.getDevicePixelRatio = function () {
        return (
          this._zr.painter.dpr ||
          (tt.hasGlobalWindow && window.devicePixelRatio) ||
          1
        );
      }),
      (t.prototype.getRenderedCanvas = function (r) {
        return this.renderToCanvas(r);
      }),
      (t.prototype.renderToCanvas = function (r) {
        r = r || {};
        var n = this._zr.painter;
        return n.getRenderedCanvas({
          backgroundColor:
            r.backgroundColor || this._model.get("backgroundColor"),
          pixelRatio: r.pixelRatio || this.getDevicePixelRatio(),
        });
      }),
      (t.prototype.renderToSVGString = function (r) {
        r = r || {};
        var n = this._zr.painter;
        return n.renderToString({ useViewBox: r.useViewBox });
      }),
      (t.prototype.getSvgDataURL = function () {
        var r = this._zr,
          n = r.storage.getDisplayList();
        return (
          M(n, function (i) {
            i.stopAnimation(null, !0);
          }),
          r.painter.toDataURL()
        );
      }),
      (t.prototype.getDataURL = function (r) {
        if (this._disposed) {
          this.id;
          return;
        }
        r = r || {};
        var n = r.excludeComponents,
          i = this._model,
          a = [],
          o = this;
        M(n, function (l) {
          i.eachComponent({ mainType: l }, function (u) {
            var f = o._componentsMap[u.__viewId];
            f.group.ignore || (a.push(f), (f.group.ignore = !0));
          });
        });
        var s =
          this._zr.painter.getType() === "svg"
            ? this.getSvgDataURL()
            : this.renderToCanvas(r).toDataURL(
                "image/" + ((r && r.type) || "png"),
              );
        return (
          M(a, function (l) {
            l.group.ignore = !1;
          }),
          s
        );
      }),
      (t.prototype.getConnectedDataURL = function (r) {
        if (this._disposed) {
          this.id;
          return;
        }
        var n = r.type === "svg",
          i = this.group,
          a = Math.min,
          o = Math.max,
          s = 1 / 0;
        if (Ep[i]) {
          var l = s,
            u = s,
            f = -s,
            h = -s,
            v = [],
            c = (r && r.pixelRatio) || this.getDevicePixelRatio();
          (M(ha, function (_, b) {
            if (_.group === i) {
              var w = n
                  ? _.getZr().painter.getSvgDom().innerHTML
                  : _.renderToCanvas(at(r)),
                S = _.getDom().getBoundingClientRect();
              ((l = a(S.left, l)),
                (u = a(S.top, u)),
                (f = o(S.right, f)),
                (h = o(S.bottom, h)),
                v.push({ dom: w, left: S.left, top: S.top }));
            }
          }),
            (l *= c),
            (u *= c),
            (f *= c),
            (h *= c));
          var d = f - l,
            p = h - u,
            m = vr.createCanvas(),
            g = tp(m, { renderer: n ? "svg" : "canvas" });
          if ((g.resize({ width: d, height: p }), n)) {
            var y = "";
            return (
              M(v, function (_) {
                var b = _.left - l,
                  w = _.top - u;
                y +=
                  '<g transform="translate(' +
                  b +
                  "," +
                  w +
                  ')">' +
                  _.dom +
                  "</g>";
              }),
              (g.painter.getSvgRoot().innerHTML = y),
              r.connectedBackgroundColor &&
                g.painter.setBackgroundColor(r.connectedBackgroundColor),
              g.refreshImmediately(),
              g.painter.toDataURL()
            );
          } else
            return (
              r.connectedBackgroundColor &&
                g.add(
                  new Tt({
                    shape: { x: 0, y: 0, width: d, height: p },
                    style: { fill: r.connectedBackgroundColor },
                  }),
                ),
              M(v, function (_) {
                var b = new Yr({
                  style: { x: _.left * c - l, y: _.top * c - u, image: _.dom },
                });
                g.add(b);
              }),
              g.refreshImmediately(),
              m.toDataURL("image/" + ((r && r.type) || "png"))
            );
        } else return this.getDataURL(r);
      }),
      (t.prototype.convertToPixel = function (r, n, i) {
        return Mo(this, "convertToPixel", r, n, i);
      }),
      (t.prototype.convertToLayout = function (r, n, i) {
        return Mo(this, "convertToLayout", r, n, i);
      }),
      (t.prototype.convertFromPixel = function (r, n, i) {
        return Mo(this, "convertFromPixel", r, n, i);
      }),
      (t.prototype.containPixel = function (r, n) {
        if (this._disposed) {
          this.id;
          return;
        }
        var i = this._model,
          a,
          o = Vl(i, r);
        return (
          M(
            o,
            function (s, l) {
              l.indexOf("Models") >= 0 &&
                M(
                  s,
                  function (u) {
                    var f = u.coordinateSystem;
                    if (f && f.containPoint) a = a || !!f.containPoint(n);
                    else if (l === "seriesModels") {
                      var h = this._chartsMap[u.__viewId];
                      h && h.containPoint && (a = a || h.containPoint(n, u));
                    }
                  },
                  this,
                );
            },
            this,
          ),
          !!a
        );
      }),
      (t.prototype.getVisual = function (r, n) {
        var i = this._model,
          a = Vl(i, r, { defaultMainType: "series" }),
          o = a.seriesModel,
          s = o.getData(),
          l = a.hasOwnProperty("dataIndexInside")
            ? a.dataIndexInside
            : a.hasOwnProperty("dataIndex")
              ? s.indexOfRawIndex(a.dataIndex)
              : null;
        return l != null ? cA(s, l, n) : vA(s, n);
      }),
      (t.prototype.getViewOfComponentModel = function (r) {
        return this._componentsMap[r.__viewId];
      }),
      (t.prototype.getViewOfSeriesModel = function (r) {
        return this._chartsMap[r.__viewId];
      }),
      (t.prototype._initEvents = function () {
        var r = this;
        M(ZA, function (i) {
          var a = function (o) {
            var s = r.getModel(),
              l = o.target,
              u,
              f = i === "globalout";
            if (
              (f
                ? (u = {})
                : l &&
                  ji(
                    l,
                    function (p) {
                      var m = ot(p);
                      if (m && m.dataIndex != null) {
                        var g =
                          m.dataModel || s.getSeriesByIndex(m.seriesIndex);
                        return (
                          (u =
                            (g &&
                              g.getDataParams(m.dataIndex, m.dataType, l)) ||
                            {}),
                          !0
                        );
                      } else if (m.eventData)
                        return ((u = B({}, m.eventData)), !0);
                    },
                    !0,
                  ),
              u)
            ) {
              var h = u.componentType,
                v = u.componentIndex;
              (h === "markLine" || h === "markPoint" || h === "markArea") &&
                ((h = "series"), (v = u.seriesIndex));
              var c = h && v != null && s.getComponent(h, v),
                d =
                  c &&
                  r[c.mainType === "series" ? "_chartsMap" : "_componentsMap"][
                    c.__viewId
                  ];
              ((u.event = o),
                (u.type = i),
                (r._$eventProcessor.eventInfo = {
                  targetEl: l,
                  packedEvent: u,
                  model: c,
                  view: d,
                }),
                r.trigger(i, u));
            }
          };
          ((a.zrEventfulCallAtLast = !0), r._zr.on(i, a, r));
        });
        var n = this._messageCenter;
        (M($f, function (i, a) {
          n.on(a, function (o) {
            r.trigger(a, o);
          });
        }),
          DD(n, this, this._api));
      }),
      (t.prototype.isDisposed = function () {
        return this._disposed;
      }),
      (t.prototype.clear = function () {
        if (this._disposed) {
          this.id;
          return;
        }
        this.setOption({ series: [] }, !0);
      }),
      (t.prototype.dispose = function () {
        if (this._disposed) {
          this.id;
          return;
        }
        this._disposed = !0;
        var r = this.getDom();
        r && bm(this.getDom(), wc, "");
        var n = this,
          i = n._api,
          a = n._model;
        (M(n._componentsViews, function (o) {
          o.dispose(a, i);
        }),
          M(n._chartsViews, function (o) {
            o.dispose(a, i);
          }),
          n._zr.dispose(),
          (n._dom =
            n._model =
            n._chartsMap =
            n._componentsMap =
            n._chartsViews =
            n._componentsViews =
            n._scheduler =
            n._api =
            n._zr =
            n._throttledZrFlush =
            n._theme =
            n._coordSysMgr =
            n._messageCenter =
              null),
          delete ha[n.id]);
      }),
      (t.prototype.resize = function (r) {
        if (!this[At]) {
          if (this._disposed) {
            this.id;
            return;
          }
          this._zr.resize(r);
          var n = this._model;
          if ((this._loadingFX && this._loadingFX.resize(), !!n)) {
            var i = n.resetOption("media"),
              a = r && r.silent;
            (this[It] &&
              (a == null && (a = this[It].silent), (i = !0), (this[It] = null)),
              (this[At] = !0),
              Jn(this));
            try {
              (i && yn(this),
                ar.update.call(this, {
                  type: "resize",
                  animation: B({ duration: 0 }, r && r.animation),
                }));
            } catch (o) {
              throw ((this[At] = !1), o);
            }
            ((this[At] = !1), jn.call(this, a), Qn.call(this, a));
          }
        }
      }),
      (t.prototype.showLoading = function (r, n) {
        if (this._disposed) {
          this.id;
          return;
        }
        if (
          (X(r) && ((n = r), (r = "")),
          (r = r || "default"),
          this.hideLoading(),
          !!Zf[r])
        ) {
          var i = Zf[r](this._api, n),
            a = this._zr;
          ((this._loadingFX = i), a.add(i));
        }
      }),
      (t.prototype.hideLoading = function () {
        if (this._disposed) {
          this.id;
          return;
        }
        (this._loadingFX && this._zr.remove(this._loadingFX),
          (this._loadingFX = null));
      }),
      (t.prototype.makeActionFromEvent = function (r) {
        var n = B({}, r);
        return ((n.type = Yf[r.type]), n);
      }),
      (t.prototype.dispatchAction = function (r, n) {
        if (this._disposed) {
          this.id;
          return;
        }
        if ((X(n) || (n = { silent: !!n }), !!As[r.type] && this._model)) {
          if (this[At]) {
            this._pendingActions.push(r);
            return;
          }
          var i = n.silent;
          Lu.call(this, r, i);
          var a = n.flush;
          (a
            ? this._zr.flush()
            : a !== !1 && tt.browser.weChat && this._throttledZrFlush(),
            jn.call(this, i),
            Qn.call(this, i));
        }
      }),
      (t.prototype.updateLabelLayout = function () {
        Le.trigger("series:layoutlabels", this._model, this._api, {
          updatedSeries: [],
        });
      }),
      (t.prototype.appendData = function (r) {
        if (this._disposed) {
          this.id;
          return;
        }
        var n = r.seriesIndex,
          i = this.getModel(),
          a = i.getSeriesByIndex(n);
        (a.appendData(r),
          (this._scheduler.unfinished = !0),
          this.getZr().wakeUp());
      }),
      (t.internalField = (function () {
        ((yn = function (h) {
          var v = h._scheduler;
          (v.restorePipelines(h._model),
            v.prepareStageTasks(),
            Mu(h, !0),
            Mu(h, !1),
            v.plan());
        }),
          (Mu = function (h, v) {
            for (
              var c = h._model,
                d = h._scheduler,
                p = v ? h._componentsViews : h._chartsViews,
                m = v ? h._componentsMap : h._chartsMap,
                g = h._zr,
                y = h._api,
                _ = 0;
              _ < p.length;
              _++
            )
              p[_].__alive = !1;
            v
              ? c.eachComponent(function (S, x) {
                  S !== "series" && b(x);
                })
              : c.eachSeries(b);
            function b(S) {
              var x = S.__requireNewView;
              S.__requireNewView = !1;
              var T = "_ec_" + S.id + "_" + S.type,
                D = !x && m[T];
              if (!D) {
                var A = $e(S.type),
                  C = v ? ke.getClass(A.main, A.sub) : xe.getClass(A.sub);
                ((D = new C()),
                  D.init(c, y),
                  (m[T] = D),
                  p.push(D),
                  g.add(D.group));
              }
              ((S.__viewId = D.__id = T),
                (D.__alive = !0),
                (D.__model = S),
                (D.group.__ecComponentInfo = {
                  mainType: S.mainType,
                  index: S.componentIndex,
                }),
                !v && d.prepareView(D, S, c, y));
            }
            for (var _ = 0; _ < p.length; ) {
              var w = p[_];
              w.__alive
                ? _++
                : (!v && w.renderTask.dispose(),
                  g.remove(w.group),
                  w.dispose(c, y),
                  p.splice(_, 1),
                  m[w.__id] === w && delete m[w.__id],
                  (w.__id = w.group.__ecComponentInfo = null));
            }
          }),
          (Do = function (h, v, c, d, p) {
            var m = h._model;
            if ((m.setUpdatePayload(c), !d)) {
              M([].concat(h._componentsViews).concat(h._chartsViews), w);
              return;
            }
            var g = {};
            ((g[d + "Id"] = c[d + "Id"]),
              (g[d + "Index"] = c[d + "Index"]),
              (g[d + "Name"] = c[d + "Name"]));
            var y = { mainType: d, query: g };
            p && (y.subType = p);
            var _ = c.excludeSeriesId,
              b;
            (_ != null &&
              ((b = rt()),
              M(Kt(_), function (S) {
                var x = je(S, null);
                x != null && b.set(x, !0);
              })),
              m &&
                m.eachComponent(
                  y,
                  function (S) {
                    var x = b && b.get(S.id) != null;
                    if (!x)
                      if (Pv(c))
                        if (S instanceof Pe)
                          c.type === Ln &&
                            !c.notBlur &&
                            !S.get(["emphasis", "disabled"]) &&
                            nw(S, c, h._api);
                        else {
                          var T = Oh(
                              S.mainType,
                              S.componentIndex,
                              c.name,
                              h._api,
                            ),
                            D = T.focusSelf,
                            A = T.dispatchers;
                          (c.type === Ln &&
                            D &&
                            !c.notBlur &&
                            mf(S.mainType, S.componentIndex, h._api),
                            A &&
                              M(A, function (C) {
                                c.type === Ln ? hs(C) : cs(C);
                              }));
                        }
                      else
                        bf(c) &&
                          S instanceof Pe &&
                          (ow(S, c, h._api), Lv(S), he(h));
                  },
                  h,
                ),
              m &&
                m.eachComponent(
                  y,
                  function (S) {
                    var x = b && b.get(S.id) != null;
                    x ||
                      w(
                        h[d === "series" ? "_chartsMap" : "_componentsMap"][
                          S.__viewId
                        ],
                      );
                  },
                  h,
                ));
            function w(S) {
              S && S.__alive && S[v] && S[v](S.__model, m, h._api, c);
            }
          }),
          (ar = {
            prepareAndUpdate: function (h) {
              (yn(this),
                ar.update.call(
                  this,
                  h,
                  h && { optionChanged: h.newOption != null },
                ));
            },
            update: function (h, v) {
              var c = this._model,
                d = this._api,
                p = this._zr,
                m = this._coordSysMgr,
                g = this._scheduler;
              if (c) {
                (c.setUpdatePayload(h),
                  g.restoreData(c, h),
                  g.performSeriesTasks(c),
                  m.create(c, d),
                  g.performDataProcessorTasks(c, h),
                  Au(this, c),
                  m.update(c, d),
                  n(c),
                  g.performVisualTasks(c, h));
                var y = c.get("backgroundColor") || "transparent";
                p.setBackgroundColor(y);
                var _ = c.get("darkMode");
                (_ != null && _ !== "auto" && p.setDarkMode(_),
                  Iu(this, c, d, h, v),
                  Le.trigger("afterupdate", c, d));
              }
            },
            updateTransform: function (h) {
              var v = this,
                c = this._model,
                d = this._api;
              if (c) {
                c.setUpdatePayload(h);
                var p = [];
                c.eachComponent(function (g, y) {
                  if (g !== "series") {
                    var _ = v.getViewOfComponentModel(y);
                    if (_ && _.__alive)
                      if (_.updateTransform) {
                        var b = _.updateTransform(y, c, d, h);
                        b && b.update && p.push(_);
                      } else p.push(_);
                  }
                });
                var m = rt();
                (c.eachSeries(function (g) {
                  var y = v._chartsMap[g.__viewId];
                  if (y.updateTransform) {
                    var _ = y.updateTransform(g, c, d, h);
                    _ && _.update && m.set(g.uid, 1);
                  } else m.set(g.uid, 1);
                }),
                  n(c),
                  this._scheduler.performVisualTasks(c, h, {
                    setDirty: !0,
                    dirtyMap: m,
                  }),
                  Ao(this, c, d, h, {}, m),
                  Le.trigger("afterupdate", c, d));
              }
            },
            updateView: function (h) {
              var v = this._model;
              v &&
                (v.setUpdatePayload(h),
                xe.markUpdateMethod(h, "updateView"),
                n(v),
                this._scheduler.performVisualTasks(v, h, { setDirty: !0 }),
                Iu(this, v, this._api, h, {}),
                Le.trigger("afterupdate", v, this._api));
            },
            updateVisual: function (h) {
              var v = this,
                c = this._model;
              c &&
                (c.setUpdatePayload(h),
                c.eachSeries(function (d) {
                  d.getData().clearAllVisual();
                }),
                xe.markUpdateMethod(h, "updateVisual"),
                n(c),
                this._scheduler.performVisualTasks(c, h, {
                  visualType: "visual",
                  setDirty: !0,
                }),
                c.eachComponent(function (d, p) {
                  if (d !== "series") {
                    var m = v.getViewOfComponentModel(p);
                    m && m.__alive && m.updateVisual(p, c, v._api, h);
                  }
                }),
                c.eachSeries(function (d) {
                  var p = v._chartsMap[d.__viewId];
                  p.updateVisual(d, c, v._api, h);
                }),
                Le.trigger("afterupdate", c, this._api));
            },
            updateLayout: function (h) {
              ar.update.call(this, h);
            },
          }));
        function r(h, v, c, d, p) {
          if (h._disposed) {
            h.id;
            return;
          }
          for (
            var m = h._model,
              g = h._coordSysMgr.getCoordinateSystems(),
              y,
              _ = Vl(m, c),
              b = 0;
            b < g.length;
            b++
          ) {
            var w = g[b];
            if (w[v] && (y = w[v](m, _, d, p)) != null) return y;
          }
        }
        ((Mo = r),
          (Au = function (h, v) {
            var c = h._chartsMap,
              d = h._scheduler;
            v.eachSeries(function (p) {
              d.updateStreamModes(p, c[p.__viewId]);
            });
          }),
          (Lu = function (h, v) {
            var c = this,
              d = this.getModel(),
              p = h.type,
              m = h.escapeConnect,
              g = As[p],
              y = (g.update || "update").split(":"),
              _ = y.pop(),
              b = y[0] != null && $e(y[0]);
            ((this[At] = !0), Jn(this));
            var w = [h],
              S = !1;
            h.batch &&
              ((S = !0),
              (w = q(h.batch, function (E) {
                return ((E = dt(B({}, E), h)), (E.batch = null), E);
              })));
            var x = [],
              T,
              D = [],
              A = g.nonRefinedEventType,
              C = bf(h),
              I = Pv(h);
            if (
              (I && Lm(this._api),
              M(w, function (E) {
                var V = g.action(E, d, c._api);
                if (
                  (g.refineEvent ? D.push(V) : (T = V),
                  (T = T || B({}, E)),
                  (T.type = A),
                  x.push(T),
                  I)
                ) {
                  var R = Ih(h),
                    O = R.queryOptionMap,
                    z = R.mainTypeSpecified,
                    F = z ? O.keys()[0] : "series";
                  (Do(c, _, E, F), he(c));
                } else
                  C
                    ? (Do(c, _, E, "series"), he(c))
                    : b && Do(c, _, E, b.main, b.sub);
              }),
              _ !== "none" && !I && !C && !b)
            )
              try {
                this[It]
                  ? (yn(this), ar.update.call(this, h), (this[It] = null))
                  : ar[_].call(this, h);
              } catch (E) {
                throw ((this[At] = !1), E);
              }
            if (
              (S ? (T = { type: A, escapeConnect: m, batch: x }) : (T = x[0]),
              (this[At] = !1),
              !v)
            ) {
              var L = void 0;
              if (g.refineEvent) {
                var P = g.refineEvent(D, h, d, this._api).eventContent;
                (dr(X(P)),
                  (L = dt({ type: g.refinedEventType }, P)),
                  (L.fromAction = h.type),
                  (L.fromActionPayload = h),
                  (L.escapeConnect = !0));
              }
              var k = this._messageCenter;
              (k.trigger(T.type, T), L && k.trigger(L.type, L));
            }
          }),
          (jn = function (h) {
            for (var v = this._pendingActions; v.length; ) {
              var c = v.shift();
              Lu.call(this, c, h);
            }
          }),
          (Qn = function (h) {
            !h && this.trigger("updated");
          }),
          (Lp = function (h, v) {
            h.on("rendered", function (c) {
              (v.trigger("rendered", c),
                h.animation.isFinished() &&
                  !v[It] &&
                  !v._scheduler.unfinished &&
                  !v._pendingActions.length &&
                  v.trigger("finished"));
            });
          }),
          (Ip = function (h, v) {
            h.on("mouseover", function (c) {
              var d = c.target,
                p = ji(d, _f);
              p && (iw(p, c, v._api), he(v));
            })
              .on("mouseout", function (c) {
                var d = c.target,
                  p = ji(d, _f);
                p && (aw(p, c, v._api), he(v));
              })
              .on("click", function (c) {
                var d = c.target,
                  p = ji(
                    d,
                    function (y) {
                      return ot(y).dataIndex != null;
                    },
                    !0,
                  );
                if (p) {
                  var m = p.selected ? "unselect" : "select",
                    g = ot(p);
                  v._api.dispatchAction({
                    type: m,
                    dataType: g.dataType,
                    dataIndexInside: g.dataIndex,
                    seriesIndex: g.seriesIndex,
                    isFromClick: !0,
                  });
                }
              });
          }));
        function n(h) {
          (h.clearColorPalette(),
            h.eachSeries(function (v) {
              v.clearColorPalette();
            }));
        }
        function i(h) {
          var v = [],
            c = [],
            d = !1;
          if (
            (h.eachComponent(function (y, _) {
              var b = _.get("zlevel") || 0,
                w = _.get("z") || 0,
                S = _.getZLevelKey();
              ((d = d || !!S),
                (y === "series" ? c : v).push({
                  zlevel: b,
                  z: w,
                  idx: _.componentIndex,
                  type: y,
                  key: S,
                }));
            }),
            d)
          ) {
            var p = v.concat(c),
              m,
              g;
            (Xo(p, function (y, _) {
              return y.zlevel === _.zlevel ? y.z - _.z : y.zlevel - _.zlevel;
            }),
              M(p, function (y) {
                var _ = h.getComponent(y.type, y.idx),
                  b = y.zlevel,
                  w = y.key;
                (m != null && (b = Math.max(m, b)),
                  w
                    ? (b === m && w !== g && b++, (g = w))
                    : g && (b === m && b++, (g = "")),
                  (m = b),
                  _.setZLevel(b));
              }));
          }
        }
        ((Iu = function (h, v, c, d, p) {
          (i(v),
            Pp(h, v, c, d, p),
            M(h._chartsViews, function (m) {
              m.__alive = !1;
            }),
            Ao(h, v, c, d, p),
            M(h._chartsViews, function (m) {
              m.__alive || m.remove(v, c);
            }));
        }),
          (Pp = function (h, v, c, d, p, m) {
            M(m || h._componentsViews, function (g) {
              var y = g.__model;
              (u(y, g), g.render(y, v, c, d), l(y, g), f(y, g));
            });
          }),
          (Ao = function (h, v, c, d, p, m) {
            var g = h._scheduler;
            ((p = B(p || {}, { updatedSeries: v.getSeries() })),
              Le.trigger("series:beforeupdate", v, c, p));
            var y = !1;
            (v.eachSeries(function (_) {
              var b = h._chartsMap[_.__viewId];
              b.__alive = !0;
              var w = b.renderTask;
              (g.updatePayload(w, d),
                u(_, b),
                m && m.get(_.uid) && w.dirty(),
                w.perform(g.getPerformArgs(w)) && (y = !0),
                (b.group.silent = !!_.get("silent")),
                s(_, b),
                Lv(_));
            }),
              (g.unfinished = y || g.unfinished),
              Le.trigger("series:layoutlabels", v, c, p),
              Le.trigger("series:transition", v, c, p),
              v.eachSeries(function (_) {
                var b = h._chartsMap[_.__viewId];
                (l(_, b), f(_, b));
              }),
              o(h, v),
              Le.trigger("series:afterupdate", v, c, p));
          }),
          (he = function (h) {
            ((h[Cu] = !0), h.getZr().wakeUp());
          }),
          (Jn = function (h) {
            h[Co] = (h[Co] + 1) % 1e3;
          }),
          (Rp = function (h) {
            h[Cu] &&
              (h.getZr().storage.traverse(function (v) {
                aa(v) || a(v);
              }),
              (h[Cu] = !1));
          }));
        function a(h) {
          for (var v = [], c = h.currentStates, d = 0; d < c.length; d++) {
            var p = c[d];
            p === "emphasis" || p === "blur" || p === "select" || v.push(p);
          }
          (h.selected && h.states.select && v.push("select"),
            h.hoverState === qs && h.states.emphasis
              ? v.push("emphasis")
              : h.hoverState === Xs && h.states.blur && v.push("blur"),
            h.useStates(v));
        }
        function o(h, v) {
          var c = h._zr,
            d = c.storage,
            p = 0;
          (d.traverse(function (m) {
            m.isGroup || p++;
          }),
            p > v.get("hoverLayerThreshold") &&
              !tt.node &&
              !tt.worker &&
              v.eachSeries(function (m) {
                if (!m.preventUsingHoverLayer) {
                  var g = h._chartsMap[m.__viewId];
                  g.__alive &&
                    g.eachRendered(function (y) {
                      y.states.emphasis && (y.states.emphasis.hoverLayer = !0);
                    });
                }
              }));
        }
        function s(h, v) {
          var c = h.get("blendMode") || null;
          v.eachRendered(function (d) {
            d.isGroup || (d.style.blend = c);
          });
        }
        function l(h, v) {
          if (!h.preventAutoZ) {
            var c = Um(h);
            v.eachRendered(function (d) {
              return (Ym(d, c.z, c.zlevel), !0);
            });
          }
        }
        function u(h, v) {
          v.eachRendered(function (c) {
            if (!aa(c)) {
              var d = c.getTextContent(),
                p = c.getTextGuideLine();
              (c.stateTransition && (c.stateTransition = null),
                d && d.stateTransition && (d.stateTransition = null),
                p && p.stateTransition && (p.stateTransition = null),
                c.hasState()
                  ? ((c.prevStates = c.currentStates), c.clearStates())
                  : c.prevStates && (c.prevStates = null));
            }
          });
        }
        function f(h, v) {
          var c = h.getModel("stateAnimation"),
            d = h.isAnimationEnabled(),
            p = c.get("duration"),
            m =
              p > 0
                ? {
                    duration: p,
                    delay: c.get("delay"),
                    easing: c.get("easing"),
                  }
                : null;
          v.eachRendered(function (g) {
            if (g.states && g.states.emphasis) {
              if (aa(g)) return;
              if ((g instanceof pt && cw(g), g.__dirty)) {
                var y = g.prevStates;
                y && g.useStates(y);
              }
              if (d) {
                g.stateTransition = m;
                var _ = g.getTextContent(),
                  b = g.getTextGuideLine();
                (_ && (_.stateTransition = m), b && (b.stateTransition = m));
              }
              g.__dirty && a(g);
            }
          });
        }
        ((kp = function (h) {
          return new ((function (v) {
            G(c, v);
            function c() {
              return (v !== null && v.apply(this, arguments)) || this;
            }
            return (
              (c.prototype.getCoordinateSystems = function () {
                return h._coordSysMgr.getCoordinateSystems();
              }),
              (c.prototype.getComponentByElement = function (d) {
                for (; d; ) {
                  var p = d.__ecComponentInfo;
                  if (p != null)
                    return h._model.getComponent(p.mainType, p.index);
                  d = d.parent;
                }
              }),
              (c.prototype.enterEmphasis = function (d, p) {
                (hs(d, p), he(h));
              }),
              (c.prototype.leaveEmphasis = function (d, p) {
                (cs(d, p), he(h));
              }),
              (c.prototype.enterBlur = function (d) {
                (rw(d), he(h));
              }),
              (c.prototype.leaveBlur = function (d) {
                (Cm(d), he(h));
              }),
              (c.prototype.enterSelect = function (d) {
                (Dm(d), he(h));
              }),
              (c.prototype.leaveSelect = function (d) {
                (Mm(d), he(h));
              }),
              (c.prototype.getModel = function () {
                return h.getModel();
              }),
              (c.prototype.getViewOfComponentModel = function (d) {
                return h.getViewOfComponentModel(d);
              }),
              (c.prototype.getViewOfSeriesModel = function (d) {
                return h.getViewOfSeriesModel(d);
              }),
              (c.prototype.getMainProcessVersion = function () {
                return h[Co];
              }),
              c
            );
          })(S0))(h);
        }),
          (X0 = function (h) {
            function v(c, d) {
              for (var p = 0; p < c.length; p++) {
                var m = c[p];
                m[Du] = d;
              }
            }
            M(Yf, function (c, d) {
              h._messageCenter.on(d, function (p) {
                if (Ep[h.group] && h[Du] !== Ap) {
                  if (p && p.escapeConnect) return;
                  var m = h.makeActionFromEvent(p),
                    g = [];
                  (M(ha, function (y) {
                    y !== h && y.group === h.group && g.push(y);
                  }),
                    v(g, Ap),
                    M(g, function (y) {
                      y[Du] !== XA && y.dispatchAction(m);
                    }),
                    v(g, qA));
                }
              });
            });
          }));
      })()),
      t
    );
  })(er),
  Sc = q0.prototype;
Sc.on = V0("on");
Sc.off = V0("off");
Sc.one = function (e, t, r) {
  var n = this;
  function i() {
    for (var a = [], o = 0; o < arguments.length; o++) a[o] = arguments[o];
    (t && t.apply && t.apply(this, a), n.off(e, i));
  }
  this.on.call(this, e, i, r);
};
var ZA = [
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "mousemove",
  "mousedown",
  "mouseup",
  "globalout",
  "contextmenu",
];
var As = {},
  Yf = {},
  $f = {},
  Xf = [],
  qf = [],
  Ls = [],
  Z0 = {},
  Zf = {},
  ha = {},
  Ep = {},
  KA = +new Date() - 0,
  wc = "_echarts_instance_";
function ul(e, t, r) {
  {
    var n = jA(e);
    if (n) return n;
  }
  var i = new q0(e, t, r);
  return (
    (i.id = "ec_" + KA++),
    (ha[i.id] = i),
    bm(e, wc, i.id),
    X0(i),
    Le.trigger("afterinit", i),
    i
  );
}
function jA(e) {
  return ha[WS(e, wc)];
}
function K0(e, t) {
  Z0[e] = t;
}
function j0(e) {
  st(qf, e) < 0 && qf.push(e);
}
function Q0(e, t) {
  Tc(Xf, e, t, zA);
}
function QA(e) {
  xc("afterinit", e);
}
function JA(e) {
  xc("afterupdate", e);
}
function xc(e, t) {
  Le.on(e, t);
}
function wi(e, t, r) {
  var n, i, a, o, s;
  (Q(t) && ((r = t), (t = "")),
    X(e)
      ? ((n = e.type),
        (i = e.event),
        (o = e.update),
        (s = e.publishNonRefinedEvent),
        r || (r = e.action),
        (a = e.refineEvent))
      : ((n = e), (i = t)));
  function l(f) {
    return f.toLowerCase();
  }
  i = l(i || n);
  var u = a ? l(n) : i;
  As[n] ||
    (dr(Mp.test(n) && Mp.test(i)),
    a && dr(i !== n),
    (As[n] = {
      actionType: n,
      refinedEventType: i,
      nonRefinedEventType: u,
      update: o,
      action: r,
      refineEvent: a,
    }),
    ($f[i] = 1),
    a && s && ($f[u] = 1),
    (Yf[u] = n));
}
function tL(e, t) {
  Kh.register(e, t);
}
function eL(e, t) {
  Tc(Ls, e, t, z0, "layout");
}
function Bn(e, t) {
  Tc(Ls, e, t, G0, "visual");
}
var Op = [];
function Tc(e, t, r, n, i) {
  if (((Q(t) || X(t)) && ((r = t), (t = n)), !(st(Op, r) >= 0))) {
    Op.push(r);
    var a = D0.wrapStageHandler(r, i);
    ((a.__prio = t), (a.__raw = r), e.push(a));
  }
}
function J0(e, t) {
  Zf[e] = t;
}
function rL(e, t, r) {
  var n = EA("registerMap");
  n && n(e, t, r);
}
var nL = QT;
Bn(bc, ZM);
Bn(ll, KM);
Bn(ll, jM);
Bn(bc, fA);
Bn(ll, hA);
Bn(H0, kA);
j0(x0);
Q0(NA, $M);
J0("default", QM);
wi({ type: Ln, event: Ln, update: Ln }, ie);
wi({ type: Go, event: Go, update: Go }, ie);
wi({
  type: us,
  event: Rh,
  update: us,
  action: ie,
  refineEvent: Cc,
  publishNonRefinedEvent: !0,
});
wi({
  type: pf,
  event: Rh,
  update: pf,
  action: ie,
  refineEvent: Cc,
  publishNonRefinedEvent: !0,
});
wi({
  type: fs,
  event: Rh,
  update: fs,
  action: ie,
  refineEvent: Cc,
  publishNonRefinedEvent: !0,
});
function Cc(e, t, r, n) {
  return {
    eventContent: { selected: sw(r), isFromClick: t.isFromClick || !1 },
  };
}
K0("default", {});
K0("dark", I0);
var Bp = [],
  iL = {
    registerPreprocessor: j0,
    registerProcessor: Q0,
    registerPostInit: QA,
    registerPostUpdate: JA,
    registerUpdateLifecycle: xc,
    registerAction: wi,
    registerCoordinateSystem: tL,
    registerLayout: eL,
    registerVisual: Bn,
    registerTransform: nL,
    registerLoading: J0,
    registerMap: rL,
    registerImpl: RA,
    PRIORITY: $A,
    ComponentModel: ht,
    ComponentView: ke,
    SeriesModel: Pe,
    ChartView: xe,
    registerComponentModel: function (e) {
      ht.registerClass(e);
    },
    registerComponentView: function (e) {
      ke.registerClass(e);
    },
    registerSeriesModel: function (e) {
      Pe.registerClass(e);
    },
    registerChartView: function (e) {
      xe.registerClass(e);
    },
    registerCustomSeries: function (e, t) {},
    registerSubTypeDefaulter: function (e, t) {
      ht.registerSubTypeDefaulter(e, t);
    },
    registerPainter: function (e, t) {
      TM(e, t);
    },
  };
function Re(e) {
  if (W(e)) {
    M(e, function (t) {
      Re(t);
    });
    return;
  }
  st(Bp, e) >= 0 || (Bp.push(e), Q(e) && (e = { install: e }), e.install(iL));
}
var t_ = { left: 0, right: 0, top: 0, bottom: 0 },
  Is = ["25%", "25%"],
  aL = (function (e) {
    G(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.mergeDefaultAndTheme = function (r, n) {
        var i = Ga(r.outerBounds);
        (e.prototype.mergeDefaultAndTheme.apply(this, arguments),
          i && r.outerBounds && Wr(r.outerBounds, i));
      }),
      (t.prototype.mergeOption = function (r, n) {
        (e.prototype.mergeOption.apply(this, arguments),
          this.option.outerBounds &&
            r.outerBounds &&
            Wr(this.option.outerBounds, r.outerBounds));
      }),
      (t.type = "grid"),
      (t.dependencies = ["xAxis", "yAxis"]),
      (t.layoutMode = "box"),
      (t.defaultOption = {
        show: !1,
        z: 0,
        left: "15%",
        top: 65,
        right: "10%",
        bottom: 80,
        containLabel: !1,
        outerBoundsMode: "auto",
        outerBounds: t_,
        outerBoundsContain: "all",
        outerBoundsClampWidth: Is[0],
        outerBoundsClampHeight: Is[1],
        backgroundColor: Y.color.transparent,
        borderWidth: 1,
        borderColor: Y.color.neutral30,
      }),
      t
    );
  })(ht),
  oL = (function () {
    function e() {}
    return (
      (e.prototype.getNeedCrossZero = function () {
        var t = this.option;
        return !t.scale;
      }),
      (e.prototype.getCoordSysModel = function () {}),
      e
    );
  })(),
  Kf = (function (e) {
    G(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.getCoordSysModel = function () {
        return this.getReferringComponents("grid", _e).models[0];
      }),
      (t.type = "cartesian2dAxis"),
      t
    );
  })(ht);
tr(Kf, oL);
var e_ = {
    show: !0,
    z: 0,
    inverse: !1,
    name: "",
    nameLocation: "end",
    nameRotate: null,
    nameTruncate: { maxWidth: null, ellipsis: "...", placeholder: "." },
    nameTextStyle: {},
    nameGap: 15,
    silent: !1,
    triggerEvent: !1,
    tooltip: { show: !1 },
    axisPointer: {},
    axisLine: {
      show: !0,
      onZero: !0,
      onZeroAxisIndex: null,
      lineStyle: { color: Y.color.axisLine, width: 1, type: "solid" },
      symbol: ["none", "none"],
      symbolSize: [10, 15],
      breakLine: !0,
    },
    axisTick: { show: !0, inside: !1, length: 5, lineStyle: { width: 1 } },
    axisLabel: {
      show: !0,
      inside: !1,
      rotate: 0,
      showMinLabel: null,
      showMaxLabel: null,
      margin: 8,
      fontSize: 12,
      color: Y.color.axisLabel,
      textMargin: [0, 3],
    },
    splitLine: {
      show: !0,
      showMinLine: !0,
      showMaxLine: !0,
      lineStyle: { color: Y.color.axisSplitLine, width: 1, type: "solid" },
    },
    splitArea: {
      show: !1,
      areaStyle: {
        color: [Y.color.backgroundTint, Y.color.backgroundTransparent],
      },
    },
    breakArea: {
      show: !0,
      itemStyle: {
        color: Y.color.neutral00,
        borderColor: Y.color.border,
        borderWidth: 1,
        borderType: [3, 3],
        opacity: 0.6,
      },
      zigzagAmplitude: 4,
      zigzagMinSpan: 4,
      zigzagMaxSpan: 20,
      zigzagZ: 100,
      expandOnClick: !0,
    },
    breakLabelLayout: { moveOverlap: "auto" },
  },
  sL = ut(
    {
      boundaryGap: !0,
      deduplication: null,
      jitter: 0,
      jitterOverlap: !0,
      jitterMargin: 2,
      splitLine: { show: !1 },
      axisTick: { alignWithLabel: !1, interval: "auto", show: "auto" },
      axisLabel: { interval: "auto" },
    },
    e_,
  ),
  Dc = ut(
    {
      boundaryGap: [0, 0],
      axisLine: { show: "auto" },
      axisTick: { show: "auto" },
      splitNumber: 5,
      minorTick: { show: !1, splitNumber: 5, length: 3, lineStyle: {} },
      minorSplitLine: {
        show: !1,
        lineStyle: { color: Y.color.axisMinorSplitLine, width: 1 },
      },
    },
    e_,
  ),
  lL = ut(
    {
      splitNumber: 6,
      axisLabel: {
        showMinLabel: !1,
        showMaxLabel: !1,
        rich: { primary: { fontWeight: "bold" } },
      },
      splitLine: { show: !1 },
    },
    Dc,
  ),
  uL = dt({ logBase: 10 }, Dc);
const fL = { category: sL, value: Dc, time: lL, log: uL };
var hL = 0,
  jf = (function () {
    function e(t) {
      ((this.categories = t.categories || []),
        (this._needCollect = t.needCollect),
        (this._deduplication = t.deduplication),
        (this.uid = ++hL),
        (this._onCollect = t.onCollect));
    }
    return (
      (e.createByAxisModel = function (t) {
        var r = t.option,
          n = r.data,
          i = n && q(n, cL);
        return new e({
          categories: i,
          needCollect: !i,
          deduplication: r.dedplication !== !1,
        });
      }),
      (e.prototype.getOrdinal = function (t) {
        return this._getOrCreateMap().get(t);
      }),
      (e.prototype.parseAndCollect = function (t) {
        var r,
          n = this._needCollect;
        if (!U(t) && !n) return t;
        if (n && !this._deduplication)
          return (
            (r = this.categories.length),
            (this.categories[r] = t),
            this._onCollect && this._onCollect(t, r),
            r
          );
        var i = this._getOrCreateMap();
        return (
          (r = i.get(t)),
          r == null &&
            (n
              ? ((r = this.categories.length),
                (this.categories[r] = t),
                i.set(t, r),
                this._onCollect && this._onCollect(t, r))
              : (r = NaN)),
          r
        );
      }),
      (e.prototype._getOrCreateMap = function () {
        return this._map || (this._map = rt(this.categories));
      }),
      e
    );
  })();
function cL(e) {
  return X(e) && e.value != null ? e.value : e + "";
}
var vL = { value: 1, category: 1, time: 1, log: 1 },
  dL = null;
function pL() {
  return dL;
}
function Np(e, t, r, n) {
  (M(vL, function (i, a) {
    var o = ut(ut({}, fL[a], !0), n, !0),
      s = (function (l) {
        G(u, l);
        function u() {
          var f = (l !== null && l.apply(this, arguments)) || this;
          return ((f.type = t + "Axis." + a), f);
        }
        return (
          (u.prototype.mergeDefaultAndTheme = function (f, h) {
            var v = wa(this),
              c = v ? Ga(f) : {},
              d = h.getTheme();
            (ut(f, d.get(a + "Axis")),
              ut(f, this.getDefaultOption()),
              (f.type = Fp(f)),
              v && Wr(f, c, v));
          }),
          (u.prototype.optionUpdated = function () {
            var f = this.option;
            f.type === "category" &&
              (this.__ordinalMeta = jf.createByAxisModel(this));
          }),
          (u.prototype.getCategories = function (f) {
            var h = this.option;
            if (h.type === "category")
              return f ? h.data : this.__ordinalMeta.categories;
          }),
          (u.prototype.getOrdinalMeta = function () {
            return this.__ordinalMeta;
          }),
          (u.prototype.updateAxisBreaks = function (f) {
            return { breaks: [] };
          }),
          (u.type = t + "Axis." + a),
          (u.defaultOption = o),
          u
        );
      })(r);
    e.registerComponentModel(s);
  }),
    e.registerSubTypeDefaulter(t + "Axis", Fp));
}
function Fp(e) {
  return e.type || (e.data ? "category" : "value");
}
function Qf(e) {
  return e.type === "interval" || e.type === "log";
}
function gL(e, t, r, n, i) {
  var a = {},
    o = (a.interval = dm(t / r));
  (n != null && o < n && (o = a.interval = n),
    i != null && o > i && (o = a.interval = i));
  var s = (a.intervalPrecision = Ma(o)),
    l = (a.niceTickExtent = [
      Gt(Math.ceil(e[0] / o) * o, s),
      Gt(Math.floor(e[1] / o) * o, s),
    ]);
  return (mL(l, e), a);
}
function Pu(e) {
  var t = Math.pow(10, Ah(e)),
    r = e / t;
  return (
    r ? (r === 2 ? (r = 3) : r === 3 ? (r = 5) : (r *= 2)) : (r = 1),
    Gt(r * t)
  );
}
function Ma(e) {
  return ur(e) + 2;
}
function zp(e, t, r) {
  e[t] = Math.max(Math.min(e[t], r[1]), r[0]);
}
function mL(e, t) {
  (!isFinite(e[0]) && (e[0] = t[0]),
    !isFinite(e[1]) && (e[1] = t[1]),
    zp(e, 0, t),
    zp(e, 1, t),
    e[0] > e[1] && (e[0] = e[1]));
}
function Mc(e, t) {
  return e >= t[0] && e <= t[1];
}
var yL = (function () {
  function e() {
    ((this.normalize = Gp), (this.scale = Hp));
  }
  return (
    (e.prototype.updateMethods = function (t) {
      t.hasBreaks()
        ? ((this.normalize = ct(t.normalize, t)), (this.scale = ct(t.scale, t)))
        : ((this.normalize = Gp), (this.scale = Hp));
    }),
    e
  );
})();
function Gp(e, t) {
  return t[1] === t[0] ? 0.5 : (e - t[0]) / (t[1] - t[0]);
}
function Hp(e, t) {
  return e * (t[1] - t[0]) + t[0];
}
function Jf(e, t, r) {
  var n = Math.log(e);
  return [
    Math.log(r ? t[0] : Math.max(0, t[0])) / n,
    Math.log(r ? t[1] : Math.max(0, t[1])) / n,
  ];
}
var Xr = (function () {
  function e(t) {
    ((this._calculator = new yL()),
      (this._setting = t || {}),
      (this._extent = [1 / 0, -1 / 0]));
  }
  return (
    (e.prototype.getSetting = function (t) {
      return this._setting[t];
    }),
    (e.prototype._innerUnionExtent = function (t) {
      var r = this._extent;
      this._innerSetExtent(
        t[0] < r[0] ? t[0] : r[0],
        t[1] > r[1] ? t[1] : r[1],
      );
    }),
    (e.prototype.unionExtentFromData = function (t, r) {
      this._innerUnionExtent(t.getApproximateExtent(r));
    }),
    (e.prototype.getExtent = function () {
      return this._extent.slice();
    }),
    (e.prototype.setExtent = function (t, r) {
      this._innerSetExtent(t, r);
    }),
    (e.prototype._innerSetExtent = function (t, r) {
      var n = this._extent;
      (isNaN(t) || (n[0] = t),
        isNaN(r) || (n[1] = r),
        this._brkCtx && this._brkCtx.update(n));
    }),
    (e.prototype.setBreaksFromOption = function (t) {}),
    (e.prototype._innerSetBreak = function (t) {
      this._brkCtx &&
        (this._brkCtx.setBreaks(t),
        this._calculator.updateMethods(this._brkCtx),
        this._brkCtx.update(this._extent));
    }),
    (e.prototype._innerGetBreaks = function () {
      return this._brkCtx ? this._brkCtx.breaks : [];
    }),
    (e.prototype.hasBreaks = function () {
      return this._brkCtx ? this._brkCtx.hasBreaks() : !1;
    }),
    (e.prototype._getExtentSpanWithBreaks = function () {
      return this._brkCtx && this._brkCtx.hasBreaks()
        ? this._brkCtx.getExtentSpan()
        : this._extent[1] - this._extent[0];
    }),
    (e.prototype.isInExtentRange = function (t) {
      return this._extent[0] <= t && this._extent[1] >= t;
    }),
    (e.prototype.isBlank = function () {
      return this._isBlank;
    }),
    (e.prototype.setBlank = function (t) {
      this._isBlank = t;
    }),
    e
  );
})();
Vs(Xr);
var r_ = (function (e) {
  G(t, e);
  function t(r) {
    var n = e.call(this, r) || this;
    n.type = "ordinal";
    var i = n.getSetting("ordinalMeta");
    return (
      i || (i = new jf({})),
      W(i) &&
        (i = new jf({
          categories: q(i, function (a) {
            return X(a) ? a.value : a;
          }),
        })),
      (n._ordinalMeta = i),
      (n._extent = n.getSetting("extent") || [0, i.categories.length - 1]),
      n
    );
  }
  return (
    (t.prototype.parse = function (r) {
      return r == null
        ? NaN
        : U(r)
          ? this._ordinalMeta.getOrdinal(r)
          : Math.round(r);
    }),
    (t.prototype.contain = function (r) {
      return (
        Mc(r, this._extent) && r >= 0 && r < this._ordinalMeta.categories.length
      );
    }),
    (t.prototype.normalize = function (r) {
      return (
        (r = this._getTickNumber(r)),
        this._calculator.normalize(r, this._extent)
      );
    }),
    (t.prototype.scale = function (r) {
      return (
        (r = Math.round(this._calculator.scale(r, this._extent))),
        this.getRawOrdinalNumber(r)
      );
    }),
    (t.prototype.getTicks = function () {
      for (var r = [], n = this._extent, i = n[0]; i <= n[1]; )
        (r.push({ value: i }), i++);
      return r;
    }),
    (t.prototype.getMinorTicks = function (r) {}),
    (t.prototype.setSortInfo = function (r) {
      if (r == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      for (
        var n = r.ordinalNumbers,
          i = (this._ordinalNumbersByTick = []),
          a = (this._ticksByOrdinalNumber = []),
          o = 0,
          s = this._ordinalMeta.categories.length,
          l = Math.min(s, n.length);
        o < l;
        ++o
      ) {
        var u = n[o];
        ((i[o] = u), (a[u] = o));
      }
      for (var f = 0; o < s; ++o) {
        for (; a[f] != null; ) f++;
        (i.push(f), (a[f] = o));
      }
    }),
    (t.prototype._getTickNumber = function (r) {
      var n = this._ticksByOrdinalNumber;
      return n && r >= 0 && r < n.length ? n[r] : r;
    }),
    (t.prototype.getRawOrdinalNumber = function (r) {
      var n = this._ordinalNumbersByTick;
      return n && r >= 0 && r < n.length ? n[r] : r;
    }),
    (t.prototype.getLabel = function (r) {
      if (!this.isBlank()) {
        var n = this.getRawOrdinalNumber(r.value),
          i = this._ordinalMeta.categories[n];
        return i == null ? "" : i + "";
      }
    }),
    (t.prototype.count = function () {
      return this._extent[1] - this._extent[0] + 1;
    }),
    (t.prototype.isInExtentRange = function (r) {
      return (
        (r = this._getTickNumber(r)),
        this._extent[0] <= r && this._extent[1] >= r
      );
    }),
    (t.prototype.getOrdinalMeta = function () {
      return this._ordinalMeta;
    }),
    (t.prototype.calcNiceTicks = function () {}),
    (t.prototype.calcNiceExtent = function () {}),
    (t.type = "ordinal"),
    t
  );
})(Xr);
Xr.registerClass(r_);
var Cr = Gt,
  mi = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return (
        (r.type = "interval"),
        (r._interval = 0),
        (r._intervalPrecision = 2),
        r
      );
    }
    return (
      (t.prototype.parse = function (r) {
        return r == null || r === "" ? NaN : Number(r);
      }),
      (t.prototype.contain = function (r) {
        return Mc(r, this._extent);
      }),
      (t.prototype.normalize = function (r) {
        return this._calculator.normalize(r, this._extent);
      }),
      (t.prototype.scale = function (r) {
        return this._calculator.scale(r, this._extent);
      }),
      (t.prototype.getInterval = function () {
        return this._interval;
      }),
      (t.prototype.setInterval = function (r) {
        ((this._interval = r),
          (this._niceExtent = this._extent.slice()),
          (this._intervalPrecision = Ma(r)));
      }),
      (t.prototype.getTicks = function (r) {
        r = r || {};
        var n = this._interval,
          i = this._extent,
          a = this._niceExtent,
          o = this._intervalPrecision,
          s = ys(),
          l = [];
        if (!n) return l;
        r.breakTicks;
        var u = 1e4;
        i[0] < a[0] &&
          (r.expandToNicedExtent
            ? l.push({ value: Cr(a[0] - n, o) })
            : l.push({ value: i[0] }));
        for (
          var f = function (d, p) {
              return Math.round((p - d) / n);
            },
            h = a[0];
          h <= a[1];

        ) {
          if ((l.push({ value: h }), (h = Cr(h + n, o)), this._brkCtx)) {
            var v = this._brkCtx.calcNiceTickMultiple(h, f);
            v >= 0 && (h = Cr(h + v * n, o));
          }
          if (l.length > 0 && h === l[l.length - 1].value) break;
          if (l.length > u) return [];
        }
        var c = l.length ? l[l.length - 1].value : a[1];
        return (
          i[1] > c &&
            (r.expandToNicedExtent
              ? l.push({ value: Cr(c + n, o) })
              : l.push({ value: i[1] })),
          r.breakTicks,
          l
        );
      }),
      (t.prototype.getMinorTicks = function (r) {
        for (
          var n = this.getTicks({ expandToNicedExtent: !0 }),
            i = [],
            a = this.getExtent(),
            o = 1;
          o < n.length;
          o++
        ) {
          var s = n[o],
            l = n[o - 1];
          if (!(l.break || s.break)) {
            for (
              var u = 0, f = [], h = s.value - l.value, v = h / r, c = Ma(v);
              u < r - 1;

            ) {
              var d = Cr(l.value + (u + 1) * v, c);
              (d > a[0] && d < a[1] && f.push(d), u++);
            }
            var p = ys();
            (p &&
              p.pruneTicksByBreak(
                "auto",
                f,
                this._getNonTransBreaks(),
                function (m) {
                  return m;
                },
                this._interval,
                a,
              ),
              i.push(f));
          }
        }
        return i;
      }),
      (t.prototype._getNonTransBreaks = function () {
        return this._brkCtx ? this._brkCtx.breaks : [];
      }),
      (t.prototype.getLabel = function (r, n) {
        if (r == null) return "";
        var i = n && n.precision;
        i == null
          ? (i = ur(r.value) || 0)
          : i === "auto" && (i = this._intervalPrecision);
        var a = Cr(r.value, i, !0);
        return Ay(a);
      }),
      (t.prototype.calcNiceTicks = function (r, n, i) {
        r = r || 5;
        var a = this._extent.slice(),
          o = this._getExtentSpanWithBreaks();
        if (isFinite(o)) {
          o < 0 &&
            ((o = -o),
            a.reverse(),
            this._innerSetExtent(a[0], a[1]),
            (a = this._extent.slice()));
          var s = gL(a, o, r, n, i);
          ((this._intervalPrecision = s.intervalPrecision),
            (this._interval = s.interval),
            (this._niceExtent = s.niceTickExtent));
        }
      }),
      (t.prototype.calcNiceExtent = function (r) {
        var n = this._extent.slice();
        if (n[0] === n[1])
          if (n[0] !== 0) {
            var i = Math.abs(n[0]);
            (r.fixMax || (n[1] += i / 2), (n[0] -= i / 2));
          } else n[1] = 1;
        var a = n[1] - n[0];
        (isFinite(a) || ((n[0] = 0), (n[1] = 1)),
          this._innerSetExtent(n[0], n[1]),
          (n = this._extent.slice()),
          this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval));
        var o = this._interval,
          s = this._intervalPrecision;
        (r.fixMin || (n[0] = Cr(Math.floor(n[0] / o) * o, s)),
          r.fixMax || (n[1] = Cr(Math.ceil(n[1] / o) * o, s)),
          this._innerSetExtent(n[0], n[1]));
      }),
      (t.prototype.setNiceExtent = function (r, n) {
        this._niceExtent = [r, n];
      }),
      (t.type = "interval"),
      t
    );
  })(Xr);
Xr.registerClass(mi);
var _L = function (e, t, r, n) {
    for (; r < n; ) {
      var i = (r + n) >>> 1;
      e[i][1] < t ? (r = i + 1) : (n = i);
    }
    return r;
  },
  n_ = (function (e) {
    G(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      return ((n.type = "time"), n);
    }
    return (
      (t.prototype.getLabel = function (r) {
        var n = this.getSetting("useUTC");
        return al(
          r.value,
          od[LT(la(this._minLevelUnit))] || od.second,
          n,
          this.getSetting("locale"),
        );
      }),
      (t.prototype.getFormattedLabel = function (r, n, i) {
        var a = this.getSetting("useUTC"),
          o = this.getSetting("locale");
        return IT(r, n, i, o, a);
      }),
      (t.prototype.getTicks = function (r) {
        var n = this._interval,
          i = this._extent,
          a = [];
        if (!n) return a;
        var o = this.getSetting("useUTC"),
          s = _s(i[1], o);
        a.push({
          value: i[0],
          time: { level: 0, upperTimeUnit: s, lowerTimeUnit: s },
        });
        var l = ML(
          this._minLevelUnit,
          this._approxInterval,
          o,
          i,
          this._getExtentSpanWithBreaks(),
          this._brkCtx,
        );
        a = a.concat(l);
        var u = _s(i[1], o);
        (a.push({
          value: i[1],
          time: { level: 0, upperTimeUnit: u, lowerTimeUnit: u },
        }),
          this.getSetting("useUTC"));
        var f = In.length - 1,
          h = 0;
        return (
          M(a, function (v) {
            ((f = Math.min(f, st(In, v.time.upperTimeUnit))),
              (h = Math.max(h, v.time.level)));
          }),
          a
        );
      }),
      (t.prototype.calcNiceExtent = function (r) {
        var n = this.getExtent();
        if (
          (n[0] === n[1] && ((n[0] -= be), (n[1] += be)),
          n[1] === -1 / 0 && n[0] === 1 / 0)
        ) {
          var i = new Date();
          ((n[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate())),
            (n[0] = n[1] - be));
        }
        (this._innerSetExtent(n[0], n[1]),
          this.calcNiceTicks(r.splitNumber, r.minInterval, r.maxInterval));
      }),
      (t.prototype.calcNiceTicks = function (r, n, i) {
        r = r || 10;
        var a = this._getExtentSpanWithBreaks();
        ((this._approxInterval = a / r),
          n != null && this._approxInterval < n && (this._approxInterval = n),
          i != null && this._approxInterval > i && (this._approxInterval = i));
        var o = Lo.length,
          s = Math.min(_L(Lo, this._approxInterval, 0, o), o - 1);
        ((this._interval = Lo[s][1]),
          (this._intervalPrecision = Ma(this._interval)),
          (this._minLevelUnit = Lo[Math.max(s - 1, 0)][0]));
      }),
      (t.prototype.parse = function (r) {
        return vt(r) ? r : +Si(r);
      }),
      (t.prototype.contain = function (r) {
        return Mc(r, this._extent);
      }),
      (t.prototype.normalize = function (r) {
        return this._calculator.normalize(r, this._extent);
      }),
      (t.prototype.scale = function (r) {
        return this._calculator.scale(r, this._extent);
      }),
      (t.type = "time"),
      t
    );
  })(mi),
  Lo = [
    ["second", tc],
    ["minute", ec],
    ["hour", sa],
    ["quarter-day", sa * 6],
    ["half-day", sa * 12],
    ["day", be * 1.2],
    ["half-week", be * 3.5],
    ["week", be * 7],
    ["month", be * 31],
    ["quarter", be * 95],
    ["half-year", ad / 2],
    ["year", ad],
  ];
function bL(e, t, r, n) {
  return Lf(new Date(t), e, n).getTime() === Lf(new Date(r), e, n).getTime();
}
function SL(e, t) {
  return ((e /= be), e > 16 ? 16 : e > 7.5 ? 7 : e > 3.5 ? 4 : e > 1.5 ? 2 : 1);
}
function wL(e) {
  var t = 30 * be;
  return ((e /= t), e > 6 ? 6 : e > 3 ? 3 : e > 2 ? 2 : 1);
}
function xL(e) {
  return ((e /= sa), e > 12 ? 12 : e > 6 ? 6 : e > 3.5 ? 4 : e > 2 ? 2 : 1);
}
function Vp(e, t) {
  return (
    (e /= t ? ec : tc),
    e > 30
      ? 30
      : e > 20
        ? 20
        : e > 15
          ? 15
          : e > 10
            ? 10
            : e > 5
              ? 5
              : e > 2
                ? 2
                : 1
  );
}
function TL(e) {
  return dm(e);
}
function CL(e, t, r) {
  var n = Math.max(0, st(In, t) - 1);
  return Lf(new Date(e), In[n], r).getTime();
}
function DL(e, t) {
  var r = new Date(0);
  r[e](1);
  var n = r.getTime();
  r[e](1 + t);
  var i = r.getTime() - n;
  return function (a, o) {
    return Math.max(0, Math.round((o - a) / i));
  };
}
function ML(e, t, r, n, i, a) {
  var o = 1e4,
    s = CT,
    l = 0;
  function u(L, P, k, E, V, R, O) {
    for (
      var z = DL(V, L), F = P, N = new Date(F);
      F < k && F <= n[1] && (O.push({ value: F }), !(l++ > o));

    )
      if ((N[V](N[E]() + L), (F = N.getTime()), a)) {
        var $ = a.calcNiceTickMultiple(F, z);
        $ > 0 && (N[V](N[E]() + $ * L), (F = N.getTime()));
      }
    O.push({ value: F, notAdd: !0 });
  }
  function f(L, P, k) {
    var E = [],
      V = !P.length;
    if (!bL(la(L), n[0], n[1], r)) {
      V && (P = [{ value: CL(n[0], L, r) }, { value: n[1] }]);
      for (var R = 0; R < P.length - 1; R++) {
        var O = P[R].value,
          z = P[R + 1].value;
        if (O !== z) {
          var F = void 0,
            N = void 0,
            $ = void 0,
            nt = !1;
          switch (L) {
            case "year":
              ((F = Math.max(1, Math.round(t / be / 365))),
                (N = Sy(r)),
                ($ = PT(r)));
              break;
            case "half-year":
            case "quarter":
            case "month":
              ((F = wL(t)), (N = rc(r)), ($ = wy(r)));
              break;
            case "week":
            case "half-week":
            case "day":
              ((F = SL(t)), (N = nc(r)), ($ = xy(r)), (nt = !0));
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              ((F = xL(t)), (N = ic(r)), ($ = Ty(r)));
              break;
            case "minute":
              ((F = Vp(t, !0)), (N = ac(r)), ($ = Cy(r)));
              break;
            case "second":
              ((F = Vp(t, !1)), (N = oc(r)), ($ = Dy(r)));
              break;
            case "millisecond":
              ((F = TL(t)), (N = sc(r)), ($ = My(r)));
              break;
          }
          (z >= n[0] && O <= n[1] && u(F, O, z, N, $, nt, E),
            L === "year" &&
              k.length > 1 &&
              R === 0 &&
              k.unshift({ value: k[0].value - F }));
        }
      }
      for (var R = 0; R < E.length; R++) k.push(E[R]);
    }
  }
  for (var h = [], v = [], c = 0, d = 0, p = 0; p < s.length; ++p) {
    var m = la(s[p]);
    if (AT(s[p])) {
      f(s[p], h[h.length - 1] || [], v);
      var g = s[p + 1] ? la(s[p + 1]) : null;
      if (m !== g) {
        if (v.length) {
          ((d = c),
            v.sort(function (L, P) {
              return L.value - P.value;
            }));
          for (var y = [], _ = 0; _ < v.length; ++_) {
            var b = v[_].value;
            (_ === 0 || v[_ - 1].value !== b) &&
              (y.push(v[_]), b >= n[0] && b <= n[1] && c++);
          }
          var w = i / t;
          if ((c > w * 1.5 && d > w / 1.5) || (h.push(y), c > w || e === s[p]))
            break;
        }
        v = [];
      }
    }
  }
  for (
    var S = kt(
        q(h, function (L) {
          return kt(L, function (P) {
            return P.value >= n[0] && P.value <= n[1] && !P.notAdd;
          });
        }),
        function (L) {
          return L.length > 0;
        },
      ),
      x = [],
      T = S.length - 1,
      p = 0;
    p < S.length;
    ++p
  )
    for (var D = S[p], A = 0; A < D.length; ++A) {
      var C = _s(D[A].value, r);
      x.push({
        value: D[A].value,
        time: { level: T - p, upperTimeUnit: C, lowerTimeUnit: C },
      });
    }
  x.sort(function (L, P) {
    return L.value - P.value;
  });
  for (var I = [], p = 0; p < x.length; ++p)
    (p === 0 || x[p].value !== x[p - 1].value) && I.push(x[p]);
  return I;
}
Xr.registerClass(n_);
var th = Gt,
  AL = Math.floor,
  LL = Math.ceil,
  Io = Math.pow,
  Po = Math.log,
  i_ = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return (
        (r.type = "log"),
        (r.base = 10),
        (r._originalScale = new mi()),
        r
      );
    }
    return (
      (t.prototype.getTicks = function (r) {
        r = r || {};
        var n = this._extent.slice(),
          i = this._originalScale.getExtent(),
          a = e.prototype.getTicks.call(this, r),
          o = this.base;
        return (
          this._originalScale._innerGetBreaks(),
          q(
            a,
            function (s) {
              var l = s.value,
                u = null,
                f = Io(o, l);
              l === n[0] && this._fixMin
                ? (u = i[0])
                : l === n[1] && this._fixMax && (u = i[1]);
              var h;
              return (u != null && (f = ku(f, u)), { value: f, break: h });
            },
            this,
          )
        );
      }),
      (t.prototype._getNonTransBreaks = function () {
        return this._originalScale._innerGetBreaks();
      }),
      (t.prototype.setExtent = function (r, n) {
        this._originalScale.setExtent(r, n);
        var i = Jf(this.base, [r, n]);
        e.prototype.setExtent.call(this, i[0], i[1]);
      }),
      (t.prototype.getExtent = function () {
        var r = this.base,
          n = e.prototype.getExtent.call(this);
        ((n[0] = Io(r, n[0])), (n[1] = Io(r, n[1])));
        var i = this._originalScale.getExtent();
        return (
          this._fixMin && (n[0] = ku(n[0], i[0])),
          this._fixMax && (n[1] = ku(n[1], i[1])),
          n
        );
      }),
      (t.prototype.unionExtentFromData = function (r, n) {
        this._originalScale.unionExtentFromData(r, n);
        var i = Jf(this.base, r.getApproximateExtent(n), !0);
        this._innerUnionExtent(i);
      }),
      (t.prototype.calcNiceTicks = function (r) {
        r = r || 10;
        var n = this._extent.slice(),
          i = this._getExtentSpanWithBreaks();
        if (!(!isFinite(i) || i <= 0)) {
          var a = DS(i),
            o = (r / i) * a;
          for (
            o <= 0.5 && (a *= 10);
            !isNaN(a) && Math.abs(a) < 1 && Math.abs(a) > 0;

          )
            a *= 10;
          var s = [th(LL(n[0] / a) * a), th(AL(n[1] / a) * a)];
          ((this._interval = a),
            (this._intervalPrecision = Ma(a)),
            (this._niceExtent = s));
        }
      }),
      (t.prototype.calcNiceExtent = function (r) {
        (e.prototype.calcNiceExtent.call(this, r),
          (this._fixMin = r.fixMin),
          (this._fixMax = r.fixMax));
      }),
      (t.prototype.contain = function (r) {
        return ((r = Po(r) / Po(this.base)), e.prototype.contain.call(this, r));
      }),
      (t.prototype.normalize = function (r) {
        return (
          (r = Po(r) / Po(this.base)),
          e.prototype.normalize.call(this, r)
        );
      }),
      (t.prototype.scale = function (r) {
        return ((r = e.prototype.scale.call(this, r)), Io(this.base, r));
      }),
      (t.prototype.setBreaksFromOption = function (r) {}),
      (t.type = "log"),
      t
    );
  })(mi);
function ku(e, t) {
  return th(e, ur(t));
}
Xr.registerClass(i_);
var IL = (function () {
    function e(t, r, n) {
      this._prepareParams(t, r, n);
    }
    return (
      (e.prototype._prepareParams = function (t, r, n) {
        (n[1] < n[0] && (n = [NaN, NaN]),
          (this._dataMin = n[0]),
          (this._dataMax = n[1]));
        var i = (this._isOrdinal = t.type === "ordinal");
        this._needCrossZero =
          t.type === "interval" && r.getNeedCrossZero && r.getNeedCrossZero();
        var a = r.get("min", !0);
        a == null && (a = r.get("startValue", !0));
        var o = (this._modelMinRaw = a);
        Q(o)
          ? (this._modelMinNum = ko(t, o({ min: n[0], max: n[1] })))
          : o !== "dataMin" && (this._modelMinNum = ko(t, o));
        var s = (this._modelMaxRaw = r.get("max", !0));
        if (
          (Q(s)
            ? (this._modelMaxNum = ko(t, s({ min: n[0], max: n[1] })))
            : s !== "dataMax" && (this._modelMaxNum = ko(t, s)),
          i)
        )
          this._axisDataLen = r.getCategories().length;
        else {
          var l = r.get("boundaryGap"),
            u = W(l) ? l : [l || 0, l || 0];
          typeof u[0] == "boolean" || typeof u[1] == "boolean"
            ? (this._boundaryGapInner = [0, 0])
            : (this._boundaryGapInner = [zr(u[0], 1), zr(u[1], 1)]);
        }
      }),
      (e.prototype.calculate = function () {
        var t = this._isOrdinal,
          r = this._dataMin,
          n = this._dataMax,
          i = this._axisDataLen,
          a = this._boundaryGapInner,
          o = t ? null : n - r || Math.abs(r),
          s = this._modelMinRaw === "dataMin" ? r : this._modelMinNum,
          l = this._modelMaxRaw === "dataMax" ? n : this._modelMaxNum,
          u = s != null,
          f = l != null;
        (s == null && (s = t ? (i ? 0 : NaN) : r - a[0] * o),
          l == null && (l = t ? (i ? i - 1 : NaN) : n + a[1] * o),
          (s == null || !isFinite(s)) && (s = NaN),
          (l == null || !isFinite(l)) && (l = NaN));
        var h = da(s) || da(l) || (t && !i);
        this._needCrossZero &&
          (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !f && (l = 0));
        var v = this._determinedMin,
          c = this._determinedMax;
        return (
          v != null && ((s = v), (u = !0)),
          c != null && ((l = c), (f = !0)),
          { min: s, max: l, minFixed: u, maxFixed: f, isBlank: h }
        );
      }),
      (e.prototype.modifyDataMinMax = function (t, r) {
        this[kL[t]] = r;
      }),
      (e.prototype.setDeterminedMinMax = function (t, r) {
        var n = PL[t];
        this[n] = r;
      }),
      (e.prototype.freeze = function () {
        this.frozen = !0;
      }),
      e
    );
  })(),
  PL = { min: "_determinedMin", max: "_determinedMax" },
  kL = { min: "_dataMin", max: "_dataMax" };
function RL(e, t, r) {
  var n = e.rawExtentInfo;
  return n || ((n = new IL(e, t, r)), (e.rawExtentInfo = n), n);
}
function ko(e, t) {
  return t == null ? null : da(t) ? NaN : e.parse(t);
}
function a_(e, t) {
  var r = e.type,
    n = RL(e, t, e.getExtent()).calculate();
  e.setBlank(n.isBlank);
  var i = n.min,
    a = n.max,
    o = t.ecModel;
  if (o && r === "time") {
    var s = Ky("bar", o),
      l = !1;
    if (
      (M(s, function (h) {
        l = l || h.getBaseAxis() === t.axis;
      }),
      l)
    ) {
      var u = jy(s),
        f = EL(i, a, t, u);
      ((i = f.min), (a = f.max));
    }
  }
  return { extent: [i, a], fixMin: n.minFixed, fixMax: n.maxFixed };
}
function EL(e, t, r, n) {
  var i = r.axis.getExtent(),
    a = Math.abs(i[1] - i[0]),
    o = sD(n, r.axis);
  if (o === void 0) return { min: e, max: t };
  var s = 1 / 0;
  M(o, function (c) {
    s = Math.min(c.offset, s);
  });
  var l = -1 / 0;
  (M(o, function (c) {
    l = Math.max(c.offset + c.width, l);
  }),
    (s = Math.abs(s)),
    (l = Math.abs(l)));
  var u = s + l,
    f = t - e,
    h = 1 - (s + l) / a,
    v = f / h - f;
  return ((t += v * (l / u)), (e -= v * (s / u)), { min: e, max: t });
}
function Wp(e, t) {
  var r = t,
    n = a_(e, r),
    i = n.extent,
    a = r.get("splitNumber");
  e instanceof i_ && (e.base = r.get("logBase"));
  var o = e.type,
    s = r.get("interval"),
    l = o === "interval" || o === "time";
  (e.setBreaksFromOption(s_(r)),
    e.setExtent(i[0], i[1]),
    e.calcNiceExtent({
      splitNumber: a,
      fixMin: n.fixMin,
      fixMax: n.fixMax,
      minInterval: l ? r.get("minInterval") : null,
      maxInterval: l ? r.get("maxInterval") : null,
    }),
    s != null && e.setInterval && e.setInterval(s));
}
function OL(e, t) {
  if (((t = t || e.get("type")), t))
    switch (t) {
      case "category":
        return new r_({
          ordinalMeta: e.getOrdinalMeta
            ? e.getOrdinalMeta()
            : e.getCategories(),
          extent: [1 / 0, -1 / 0],
        });
      case "time":
        return new n_({
          locale: e.ecModel.getLocaleModel(),
          useUTC: e.ecModel.get("useUTC"),
        });
      default:
        return new (Xr.getClass(t) || mi)();
    }
}
function BL(e) {
  var t = e.scale.getExtent(),
    r = t[0],
    n = t[1];
  return !((r > 0 && n > 0) || (r < 0 && n < 0));
}
function Ha(e) {
  var t = e.getLabelModel().get("formatter");
  if (e.type === "time") {
    var r = DT(t);
    return function (i, a) {
      return e.scale.getFormattedLabel(i, a, r);
    };
  } else {
    if (U(t))
      return function (i) {
        var a = e.scale.getLabel(i),
          o = t.replace("{value}", a ?? "");
        return o;
      };
    if (Q(t)) {
      if (e.type === "category")
        return function (i, a) {
          return t(Ps(e, i), i.value - e.scale.getExtent()[0], null);
        };
      var n = ys();
      return function (i, a) {
        var o = null;
        return (
          n && (o = n.makeAxisLabelFormatterParamBreak(o, i.break)),
          t(Ps(e, i), a, o)
        );
      };
    } else
      return function (i) {
        return e.scale.getLabel(i);
      };
  }
}
function Ps(e, t) {
  return e.type === "category" ? e.scale.getLabel(t) : t.value;
}
function Ac(e) {
  var t = e.get("interval");
  return t ?? "auto";
}
function o_(e) {
  return e.type === "category" && Ac(e.getLabelModel()) === 0;
}
function NL(e, t) {
  var r = {};
  return (
    M(e.mapDimensionsAll(t), function (n) {
      r[rT(e, n)] = !0;
    }),
    yt(r)
  );
}
function yi(e) {
  return e === "middle" || e === "center";
}
function Aa(e) {
  return e.getShallow("show");
}
function s_(e) {
  var t = e.get("breaks", !0);
  t == null;
}
var FL = (function () {
    function e(t) {
      ((this.type = "cartesian"),
        (this._dimList = []),
        (this._axes = {}),
        (this.name = t || ""));
    }
    return (
      (e.prototype.getAxis = function (t) {
        return this._axes[t];
      }),
      (e.prototype.getAxes = function () {
        return q(
          this._dimList,
          function (t) {
            return this._axes[t];
          },
          this,
        );
      }),
      (e.prototype.getAxesByScale = function (t) {
        return (
          (t = t.toLowerCase()),
          kt(this.getAxes(), function (r) {
            return r.scale.type === t;
          })
        );
      }),
      (e.prototype.addAxis = function (t) {
        var r = t.dim;
        ((this._axes[r] = t), this._dimList.push(r));
      }),
      e
    );
  })(),
  eh = ["x", "y"];
function Up(e) {
  return (e.type === "interval" || e.type === "time") && !e.hasBreaks();
}
var zL = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = "cartesian2d"), (r.dimensions = eh), r);
    }
    return (
      (t.prototype.calcAffineTransform = function () {
        this._transform = this._invTransform = null;
        var r = this.getAxis("x").scale,
          n = this.getAxis("y").scale;
        if (!(!Up(r) || !Up(n))) {
          var i = r.getExtent(),
            a = n.getExtent(),
            o = this.dataToPoint([i[0], a[0]]),
            s = this.dataToPoint([i[1], a[1]]),
            l = i[1] - i[0],
            u = a[1] - a[0];
          if (!(!l || !u)) {
            var f = (s[0] - o[0]) / l,
              h = (s[1] - o[1]) / u,
              v = o[0] - i[0] * f,
              c = o[1] - a[0] * h,
              d = (this._transform = [f, 0, 0, h, v, c]);
            this._invTransform = ka([], d);
          }
        }
      }),
      (t.prototype.getBaseAxis = function () {
        return (
          this.getAxesByScale("ordinal")[0] ||
          this.getAxesByScale("time")[0] ||
          this.getAxis("x")
        );
      }),
      (t.prototype.containPoint = function (r) {
        var n = this.getAxis("x"),
          i = this.getAxis("y");
        return (
          n.contain(n.toLocalCoord(r[0])) && i.contain(i.toLocalCoord(r[1]))
        );
      }),
      (t.prototype.containData = function (r) {
        return (
          this.getAxis("x").containData(r[0]) &&
          this.getAxis("y").containData(r[1])
        );
      }),
      (t.prototype.containZone = function (r, n) {
        var i = this.dataToPoint(r),
          a = this.dataToPoint(n),
          o = this.getArea(),
          s = new et(i[0], i[1], a[0] - i[0], a[1] - i[1]);
        return o.intersect(s);
      }),
      (t.prototype.dataToPoint = function (r, n, i) {
        i = i || [];
        var a = r[0],
          o = r[1];
        if (
          this._transform &&
          a != null &&
          isFinite(a) &&
          o != null &&
          isFinite(o)
        )
          return Se(i, r, this._transform);
        var s = this.getAxis("x"),
          l = this.getAxis("y");
        return (
          (i[0] = s.toGlobalCoord(s.dataToCoord(a, n))),
          (i[1] = l.toGlobalCoord(l.dataToCoord(o, n))),
          i
        );
      }),
      (t.prototype.clampData = function (r, n) {
        var i = this.getAxis("x").scale,
          a = this.getAxis("y").scale,
          o = i.getExtent(),
          s = a.getExtent(),
          l = i.parse(r[0]),
          u = a.parse(r[1]);
        return (
          (n = n || []),
          (n[0] = Math.min(
            Math.max(Math.min(o[0], o[1]), l),
            Math.max(o[0], o[1]),
          )),
          (n[1] = Math.min(
            Math.max(Math.min(s[0], s[1]), u),
            Math.max(s[0], s[1]),
          )),
          n
        );
      }),
      (t.prototype.pointToData = function (r, n, i) {
        if (((i = i || []), this._invTransform))
          return Se(i, r, this._invTransform);
        var a = this.getAxis("x"),
          o = this.getAxis("y");
        return (
          (i[0] = a.coordToData(a.toLocalCoord(r[0]), n)),
          (i[1] = o.coordToData(o.toLocalCoord(r[1]), n)),
          i
        );
      }),
      (t.prototype.getOtherAxis = function (r) {
        return this.getAxis(r.dim === "x" ? "y" : "x");
      }),
      (t.prototype.getArea = function (r) {
        r = r || 0;
        var n = this.getAxis("x").getGlobalExtent(),
          i = this.getAxis("y").getGlobalExtent(),
          a = Math.min(n[0], n[1]) - r,
          o = Math.min(i[0], i[1]) - r,
          s = Math.max(n[0], n[1]) - a + r,
          l = Math.max(i[0], i[1]) - o + r;
        return new et(a, o, s, l);
      }),
      t
    );
  })(FL),
  GL = _t(),
  ca = _t(),
  Ee = { estimate: 1, determine: 2 };
function ks(e) {
  return { out: { noPxChangeTryDetermine: [] }, kind: e };
}
function l_(e, t) {
  var r = q(t, function (n) {
    return e.scale.parse(n);
  });
  return (
    e.type === "time" &&
      r.length > 0 &&
      (r.sort(), r.unshift(r[0]), r.push(r[r.length - 1])),
    r
  );
}
function HL(e, t) {
  var r = e.getLabelModel().get("customValues");
  if (r) {
    var n = Ha(e),
      i = e.scale.getExtent(),
      a = l_(e, r),
      o = kt(a, function (s) {
        return s >= i[0] && s <= i[1];
      });
    return {
      labels: q(o, function (s) {
        var l = { value: s };
        return {
          formattedLabel: n(l),
          rawLabel: e.scale.getLabel(l),
          tickValue: s,
          time: void 0,
          break: void 0,
        };
      }),
    };
  }
  return e.type === "category" ? WL(e, t) : YL(e);
}
function VL(e, t, r) {
  var n = e.getTickModel().get("customValues");
  if (n) {
    var i = e.scale.getExtent(),
      a = l_(e, n);
    return {
      ticks: kt(a, function (o) {
        return o >= i[0] && o <= i[1];
      }),
    };
  }
  return e.type === "category"
    ? UL(e, t)
    : {
        ticks: q(e.scale.getTicks(r), function (o) {
          return o.value;
        }),
      };
}
function WL(e, t) {
  var r = e.getLabelModel(),
    n = u_(e, r, t);
  return !r.get("show") || e.scale.isBlank() ? { labels: [] } : n;
}
function u_(e, t, r) {
  var n = XL(e),
    i = Ac(t),
    a = r.kind === Ee.estimate;
  if (!a) {
    var o = h_(n, i);
    if (o) return o;
  }
  var s, l;
  Q(i) ? (s = d_(e, i)) : ((l = i === "auto" ? qL(e, r) : i), (s = v_(e, l)));
  var u = { labels: s, labelCategoryInterval: l };
  return (
    a
      ? r.out.noPxChangeTryDetermine.push(function () {
          return (rh(n, i, u), !0);
        })
      : rh(n, i, u),
    u
  );
}
function UL(e, t) {
  var r = $L(e),
    n = Ac(t),
    i = h_(r, n);
  if (i) return i;
  var a, o;
  if (((!t.get("show") || e.scale.isBlank()) && (a = []), Q(n)))
    a = d_(e, n, !0);
  else if (n === "auto") {
    var s = u_(e, e.getLabelModel(), ks(Ee.determine));
    ((o = s.labelCategoryInterval),
      (a = q(s.labels, function (l) {
        return l.tickValue;
      })));
  } else ((o = n), (a = v_(e, o, !0)));
  return rh(r, n, { ticks: a, tickCategoryInterval: o });
}
function YL(e) {
  var t = e.scale.getTicks(),
    r = Ha(e);
  return {
    labels: q(t, function (n, i) {
      return {
        formattedLabel: r(n, i),
        rawLabel: e.scale.getLabel(n),
        tickValue: n.value,
        time: n.time,
        break: n.break,
      };
    }),
  };
}
var $L = f_("axisTick"),
  XL = f_("axisLabel");
function f_(e) {
  return function (r) {
    return ca(r)[e] || (ca(r)[e] = { list: [] });
  };
}
function h_(e, t) {
  for (var r = 0; r < e.list.length; r++)
    if (e.list[r].key === t) return e.list[r].value;
}
function rh(e, t, r) {
  return (e.list.push({ key: t, value: r }), r);
}
function qL(e, t) {
  if (t.kind === Ee.estimate) {
    var r = e.calculateCategoryInterval(t);
    return (
      t.out.noPxChangeTryDetermine.push(function () {
        return ((ca(e).autoInterval = r), !0);
      }),
      r
    );
  }
  var n = ca(e).autoInterval;
  return n ?? (ca(e).autoInterval = e.calculateCategoryInterval(t));
}
function ZL(e, t) {
  var r = t.kind,
    n = jL(e),
    i = Ha(e),
    a = ((n.axisRotate - n.labelRotate) / 180) * Math.PI,
    o = e.scale,
    s = o.getExtent(),
    l = o.count();
  if (s[1] - s[0] < 1) return 0;
  var u = 1,
    f = 40;
  l > f && (u = Math.max(1, Math.floor(l / f)));
  for (
    var h = s[0],
      v = e.dataToCoord(h + 1) - e.dataToCoord(h),
      c = Math.abs(v * Math.cos(a)),
      d = Math.abs(v * Math.sin(a)),
      p = 0,
      m = 0;
    h <= s[1];
    h += u
  ) {
    var g = 0,
      y = 0,
      _ = Xg(i({ value: h }), n.font, "center", "top");
    ((g = _.width * 1.3),
      (y = _.height * 1.3),
      (p = Math.max(p, g, 7)),
      (m = Math.max(m, y, 7)));
  }
  var b = p / c,
    w = m / d;
  (isNaN(b) && (b = 1 / 0), isNaN(w) && (w = 1 / 0));
  var S = Math.max(0, Math.floor(Math.min(b, w)));
  if (r === Ee.estimate)
    return (t.out.noPxChangeTryDetermine.push(ct(KL, null, e, S, l)), S);
  var x = c_(e, S, l);
  return x ?? S;
}
function KL(e, t, r) {
  return c_(e, t, r) == null;
}
function c_(e, t, r) {
  var n = GL(e.model),
    i = e.getExtent(),
    a = n.lastAutoInterval,
    o = n.lastTickCount;
  if (
    a != null &&
    o != null &&
    Math.abs(a - t) <= 1 &&
    Math.abs(o - r) <= 1 &&
    a > t &&
    n.axisExtent0 === i[0] &&
    n.axisExtent1 === i[1]
  )
    return a;
  ((n.lastTickCount = r),
    (n.lastAutoInterval = t),
    (n.axisExtent0 = i[0]),
    (n.axisExtent1 = i[1]));
}
function jL(e) {
  var t = e.getLabelModel();
  return {
    axisRotate: e.getRotate
      ? e.getRotate()
      : e.isHorizontal && !e.isHorizontal()
        ? 90
        : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont(),
  };
}
function v_(e, t, r) {
  var n = Ha(e),
    i = e.scale,
    a = i.getExtent(),
    o = e.getLabelModel(),
    s = [],
    l = Math.max((t || 0) + 1, 1),
    u = a[0],
    f = i.count();
  u !== 0 && l > 1 && f / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var h = o_(e),
    v = o.get("showMinLabel") || h,
    c = o.get("showMaxLabel") || h;
  v && u !== a[0] && p(a[0]);
  for (var d = u; d <= a[1]; d += l) p(d);
  c && d - l !== a[1] && p(a[1]);
  function p(m) {
    var g = { value: m };
    s.push(
      r
        ? m
        : {
            formattedLabel: n(g),
            rawLabel: i.getLabel(g),
            tickValue: m,
            time: void 0,
            break: void 0,
          },
    );
  }
  return s;
}
function d_(e, t, r) {
  var n = e.scale,
    i = Ha(e),
    a = [];
  return (
    M(n.getTicks(), function (o) {
      var s = n.getLabel(o),
        l = o.value;
      t(o.value, s) &&
        a.push(
          r
            ? l
            : {
                formattedLabel: i(o),
                rawLabel: s,
                tickValue: l,
                time: void 0,
                break: void 0,
              },
        );
    }),
    a
  );
}
var Yp = [0, 1],
  QL = (function () {
    function e(t, r, n) {
      ((this.onBand = !1),
        (this.inverse = !1),
        (this.dim = t),
        (this.scale = r),
        (this._extent = n || [0, 0]));
    }
    return (
      (e.prototype.contain = function (t) {
        var r = this._extent,
          n = Math.min(r[0], r[1]),
          i = Math.max(r[0], r[1]);
        return t >= n && t <= i;
      }),
      (e.prototype.containData = function (t) {
        return this.scale.contain(this.scale.parse(t));
      }),
      (e.prototype.getExtent = function () {
        return this._extent.slice();
      }),
      (e.prototype.getPixelPrecision = function (t) {
        return wS(t || this.scale.getExtent(), this._extent);
      }),
      (e.prototype.setExtent = function (t, r) {
        var n = this._extent;
        ((n[0] = t), (n[1] = r));
      }),
      (e.prototype.dataToCoord = function (t, r) {
        var n = this._extent,
          i = this.scale;
        return (
          (t = i.normalize(i.parse(t))),
          this.onBand &&
            i.type === "ordinal" &&
            ((n = n.slice()), $p(n, i.count())),
          cf(t, Yp, n, r)
        );
      }),
      (e.prototype.coordToData = function (t, r) {
        var n = this._extent,
          i = this.scale;
        this.onBand &&
          i.type === "ordinal" &&
          ((n = n.slice()), $p(n, i.count()));
        var a = cf(t, n, Yp, r);
        return this.scale.scale(a);
      }),
      (e.prototype.pointToData = function (t, r) {}),
      (e.prototype.getTicksCoords = function (t) {
        t = t || {};
        var r = t.tickModel || this.getTickModel(),
          n = VL(this, r, {
            breakTicks: t.breakTicks,
            pruneByBreak: t.pruneByBreak,
          }),
          i = n.ticks,
          a = q(
            i,
            function (s) {
              return {
                coord: this.dataToCoord(
                  this.scale.type === "ordinal"
                    ? this.scale.getRawOrdinalNumber(s)
                    : s,
                ),
                tickValue: s,
              };
            },
            this,
          ),
          o = r.get("alignWithLabel");
        return (JL(this, a, o, t.clamp), a);
      }),
      (e.prototype.getMinorTicksCoords = function () {
        if (this.scale.type === "ordinal") return [];
        var t = this.model.getModel("minorTick"),
          r = t.get("splitNumber");
        (r > 0 && r < 100) || (r = 5);
        var n = this.scale.getMinorTicks(r),
          i = q(
            n,
            function (a) {
              return q(
                a,
                function (o) {
                  return { coord: this.dataToCoord(o), tickValue: o };
                },
                this,
              );
            },
            this,
          );
        return i;
      }),
      (e.prototype.getViewLabels = function (t) {
        return ((t = t || ks(Ee.determine)), HL(this, t).labels);
      }),
      (e.prototype.getLabelModel = function () {
        return this.model.getModel("axisLabel");
      }),
      (e.prototype.getTickModel = function () {
        return this.model.getModel("axisTick");
      }),
      (e.prototype.getBandWidth = function () {
        var t = this._extent,
          r = this.scale.getExtent(),
          n = r[1] - r[0] + (this.onBand ? 1 : 0);
        n === 0 && (n = 1);
        var i = Math.abs(t[1] - t[0]);
        return Math.abs(i) / n;
      }),
      (e.prototype.calculateCategoryInterval = function (t) {
        return ((t = t || ks(Ee.determine)), ZL(this, t));
      }),
      e
    );
  })();
function $p(e, t) {
  var r = e[1] - e[0],
    n = t,
    i = r / n / 2;
  ((e[0] += i), (e[1] -= i));
}
function JL(e, t, r, n) {
  var i = t.length;
  if (!e.onBand || r || !i) return;
  var a = e.getExtent(),
    o,
    s;
  if (i === 1)
    ((t[0].coord = a[0]),
      (t[0].onBand = !0),
      (o = t[1] = { coord: a[1], tickValue: t[0].tickValue, onBand: !0 }));
  else {
    var l = t[i - 1].tickValue - t[0].tickValue,
      u = (t[i - 1].coord - t[0].coord) / l;
    M(t, function (c) {
      ((c.coord -= u / 2), (c.onBand = !0));
    });
    var f = e.scale.getExtent();
    ((s = 1 + f[1] - t[i - 1].tickValue),
      (o = { coord: t[i - 1].coord + u * s, tickValue: f[1] + 1, onBand: !0 }),
      t.push(o));
  }
  var h = a[0] > a[1];
  (v(t[0].coord, a[0]) && (n ? (t[0].coord = a[0]) : t.shift()),
    n && v(a[0], t[0].coord) && t.unshift({ coord: a[0], onBand: !0 }),
    v(a[1], o.coord) && (n ? (o.coord = a[1]) : t.pop()),
    n && v(o.coord, a[1]) && t.push({ coord: a[1], onBand: !0 }));
  function v(c, d) {
    return ((c = Gt(c)), (d = Gt(d)), h ? c > d : c < d);
  }
}
var t2 = (function (e) {
    G(t, e);
    function t(r, n, i, a, o) {
      var s = e.call(this, r, n, i) || this;
      return (
        (s.index = 0),
        (s.type = a || "value"),
        (s.position = o || "bottom"),
        s
      );
    }
    return (
      (t.prototype.isHorizontal = function () {
        var r = this.position;
        return r === "top" || r === "bottom";
      }),
      (t.prototype.getGlobalExtent = function (r) {
        var n = this.getExtent();
        return (
          (n[0] = this.toGlobalCoord(n[0])),
          (n[1] = this.toGlobalCoord(n[1])),
          r && n[0] > n[1] && n.reverse(),
          n
        );
      }),
      (t.prototype.pointToData = function (r, n) {
        return this.coordToData(
          this.toLocalCoord(r[this.dim === "x" ? 0 : 1]),
          n,
        );
      }),
      (t.prototype.setCategorySortInfo = function (r) {
        if (this.type !== "category") return !1;
        ((this.model.option.categorySortInfo = r), this.scale.setSortInfo(r));
      }),
      t
    );
  })(QL),
  e2 = "expandAxisBreak",
  kr = Math.PI,
  r2 = [
    [1, 2, 1, 2],
    [5, 3, 5, 3],
    [8, 3, 8, 3],
  ],
  n2 = [
    [0, 1, 0, 1],
    [0, 3, 0, 3],
    [0, 3, 0, 3],
  ],
  La = _t(),
  p_ = _t(),
  g_ = (function () {
    function e(t) {
      ((this.recordMap = {}), (this.resolveAxisNameOverlap = t));
    }
    return (
      (e.prototype.ensureRecord = function (t) {
        var r = t.axis.dim,
          n = t.componentIndex,
          i = this.recordMap,
          a = i[r] || (i[r] = []);
        return a[n] || (a[n] = { ready: {} });
      }),
      e
    );
  })();
function i2(e, t, r, n) {
  var i = r.axis,
    a = t.ensureRecord(r),
    o = [],
    s,
    l = Lc(e.axisName) && yi(e.nameLocation);
  M(n, function (d) {
    var p = Ur(d);
    if (!(!p || p.label.ignore)) {
      o.push(p);
      var m = a.transGroup;
      l &&
        (m.transform ? ka(zi, m.transform) : xh(zi),
        p.transform && ta(zi, zi, p.transform),
        et.copy(Ro, p.localRect),
        Ro.applyTransform(zi),
        s ? s.union(Ro) : et.copy((s = new et(0, 0, 0, 0)), Ro));
    }
  });
  var u = Math.abs(a.dirVec.x) > 0.1 ? "x" : "y",
    f = a.transGroup[u];
  if (
    (o.sort(function (d, p) {
      return Math.abs(d.label[u] - f) - Math.abs(p.label[u] - f);
    }),
    l && s)
  ) {
    var h = i.getExtent(),
      v = Math.min(h[0], h[1]),
      c = Math.max(h[0], h[1]) - v;
    s.union(new et(v, 0, c, 1));
  }
  ((a.stOccupiedRect = s), (a.labelInfoList = o));
}
var zi = cr(),
  Ro = new et(0, 0, 0, 0),
  m_ = function (e, t, r, n, i, a) {
    if (yi(e.nameLocation)) {
      var o = a.stOccupiedRect;
      o && y_(OD({}, o, a.transGroup.transform), n, i);
    } else __(a.labelInfoList, a.dirVec, n, i);
  };
function y_(e, t, r) {
  var n = new J();
  mc(e, t, n, {
    direction: Math.atan2(r.y, r.x),
    bidirectional: !1,
    touchThreshold: 0.05,
  }) && BD(t, n);
}
function __(e, t, r, n) {
  for (var i = J.dot(n, t) >= 0, a = 0, o = e.length; a < o; a++) {
    var s = e[i ? a : o - 1 - a];
    s.label.ignore || y_(s, r, n);
  }
}
var Br = (function () {
    function e(t, r, n, i) {
      ((this.group = new Et()),
        (this._axisModel = t),
        (this._api = r),
        (this._local = {}),
        (this._shared = i || new g_(m_)),
        this._resetCfgDetermined(n));
    }
    return (
      (e.prototype.updateCfg = function (t) {
        var r = this._cfg.raw;
        ((r.position = t.position),
          (r.labelOffset = t.labelOffset),
          this._resetCfgDetermined(r));
      }),
      (e.prototype.__getRawCfg = function () {
        return this._cfg.raw;
      }),
      (e.prototype._resetCfgDetermined = function (t) {
        var r = this._axisModel,
          n = r.getDefaultOption ? r.getDefaultOption() : {},
          i = K(t.axisName, r.get("name")),
          a = r.get("nameMoveOverlap");
        (a == null || a === "auto") && (a = K(t.defaultNameMoveOverlap, !0));
        var o = {
          raw: t,
          position: t.position,
          rotation: t.rotation,
          nameDirection: K(t.nameDirection, 1),
          tickDirection: K(t.tickDirection, 1),
          labelDirection: K(t.labelDirection, 1),
          labelOffset: K(t.labelOffset, 0),
          silent: K(t.silent, !0),
          axisName: i,
          nameLocation: Cn(r.get("nameLocation"), n.nameLocation, "end"),
          shouldNameMoveOverlap: Lc(i) && a,
          optionHideOverlap: r.get(["axisLabel", "hideOverlap"]),
          showMinorTicks: r.get(["minorTick", "show"]),
        };
        this._cfg = o;
        var s = new Et({
          x: o.position[0],
          y: o.position[1],
          rotation: o.rotation,
        });
        (s.updateTransform(), (this._transformGroup = s));
        var l = this._shared.ensureRecord(r);
        ((l.transGroup = this._transformGroup),
          (l.dirVec = new J(Math.cos(-o.rotation), Math.sin(-o.rotation))));
      }),
      (e.prototype.build = function (t, r) {
        var n = this;
        return (
          t ||
            (t = {
              axisLine: !0,
              axisTickLabelEstimate: !1,
              axisTickLabelDetermine: !0,
              axisName: !0,
            }),
          M(a2, function (i) {
            t[i] &&
              o2[i](
                n._cfg,
                n._local,
                n._shared,
                n._axisModel,
                n.group,
                n._transformGroup,
                n._api,
                r || {},
              );
          }),
          this
        );
      }),
      (e.innerTextLayout = function (t, r, n) {
        var i = vm(r - t),
          a,
          o;
        return (
          os(i)
            ? ((o = n > 0 ? "top" : "bottom"), (a = "center"))
            : os(i - kr)
              ? ((o = n > 0 ? "bottom" : "top"), (a = "center"))
              : ((o = "middle"),
                i > 0 && i < kr
                  ? (a = n > 0 ? "right" : "left")
                  : (a = n > 0 ? "left" : "right")),
          { rotation: i, textAlign: a, textVerticalAlign: o }
        );
      }),
      (e.makeAxisEventDataBase = function (t) {
        var r = { componentType: t.mainType, componentIndex: t.componentIndex };
        return ((r[t.mainType + "Index"] = t.componentIndex), r);
      }),
      (e.isLabelSilent = function (t) {
        var r = t.get("tooltip");
        return t.get("silent") || !(t.get("triggerEvent") || (r && r.show));
      }),
      e
    );
  })(),
  a2 = [
    "axisLine",
    "axisTickLabelEstimate",
    "axisTickLabelDetermine",
    "axisName",
  ],
  o2 = {
    axisLine: function (e, t, r, n, i, a, o) {
      var s = n.get(["axisLine", "show"]);
      if (
        (s === "auto" &&
          ((s = !0),
          e.raw.axisLineAutoShow != null && (s = !!e.raw.axisLineAutoShow)),
        !!s)
      ) {
        var l = n.axis.getExtent(),
          u = a.transform,
          f = [l[0], 0],
          h = [l[1], 0],
          v = f[0] > h[0];
        u && (Se(f, f, u), Se(h, h, u));
        var c = B(
            { lineCap: "round" },
            n.getModel(["axisLine", "lineStyle"]).getLineStyle(),
          ),
          d = {
            strokeContainThreshold: e.raw.strokeContainThreshold || 5,
            silent: !0,
            z2: 1,
            style: c,
          };
        if (n.get(["axisLine", "breakLine"]) && n.axis.scale.hasBreaks())
          pL().buildAxisBreakLine(n, i, a, d);
        else {
          var p = new Gr(
            B({ shape: { x1: f[0], y1: f[1], x2: h[0], y2: h[1] } }, d),
          );
          (ba(p.shape, p.style.lineWidth), (p.anid = "line"), i.add(p));
        }
        var m = n.get(["axisLine", "symbol"]);
        if (m != null) {
          var g = n.get(["axisLine", "symbolSize"]);
          (U(m) && (m = [m, m]), (U(g) || vt(g)) && (g = [g, g]));
          var y = Fy(n.get(["axisLine", "symbolOffset"]) || 0, g),
            _ = g[0],
            b = g[1];
          M(
            [
              { rotate: e.rotation + Math.PI / 2, offset: y[0], r: 0 },
              {
                rotate: e.rotation - Math.PI / 2,
                offset: y[1],
                r: Math.sqrt(
                  (f[0] - h[0]) * (f[0] - h[0]) + (f[1] - h[1]) * (f[1] - h[1]),
                ),
              },
            ],
            function (w, S) {
              if (m[S] !== "none" && m[S] != null) {
                var x = gi(m[S], -_ / 2, -b / 2, _, b, c.stroke, !0),
                  T = w.r + w.offset,
                  D = v ? h : f;
                (x.attr({
                  rotation: w.rotate,
                  x: D[0] + T * Math.cos(e.rotation),
                  y: D[1] - T * Math.sin(e.rotation),
                  silent: !0,
                  z2: 11,
                }),
                  i.add(x));
              }
            },
          );
        }
      }
    },
    axisTickLabelEstimate: function (e, t, r, n, i, a, o, s) {
      var l = qp(t, i, s);
      l && Xp(e, t, r, n, i, a, o, Ee.estimate);
    },
    axisTickLabelDetermine: function (e, t, r, n, i, a, o, s) {
      var l = qp(t, i, s);
      l && Xp(e, t, r, n, i, a, o, Ee.determine);
      var u = f2(e, i, a, n);
      (u2(e, t.labelLayoutList, u), h2(e, i, a, n, e.tickDirection));
    },
    axisName: function (e, t, r, n, i, a, o, s) {
      var l = r.ensureRecord(n);
      t.nameEl &&
        (i.remove(t.nameEl), (t.nameEl = l.nameLayout = l.nameLocation = null));
      var u = e.axisName;
      if (Lc(u)) {
        var f = e.nameLocation,
          h = e.nameDirection,
          v = n.getModel("nameTextStyle"),
          c = n.get("nameGap") || 0,
          d = n.axis.getExtent(),
          p = n.axis.inverse ? -1 : 1,
          m = new J(0, 0),
          g = new J(0, 0);
        f === "start"
          ? ((m.x = d[0] - p * c), (g.x = -p))
          : f === "end"
            ? ((m.x = d[1] + p * c), (g.x = p))
            : ((m.x = (d[0] + d[1]) / 2),
              (m.y = e.labelOffset + h * c),
              (g.y = h));
        var y = cr();
        g.transform(Th(y, y, e.rotation));
        var _ = n.get("nameRotate");
        _ != null && (_ = (_ * kr) / 180);
        var b, w;
        yi(f)
          ? (b = Br.innerTextLayout(e.rotation, _ ?? e.rotation, h))
          : ((b = s2(e.rotation, f, _ || 0, d)),
            (w = e.raw.axisNameAvailableWidth),
            w != null &&
              ((w = Math.abs(w / Math.sin(b.rotation))),
              !isFinite(w) && (w = null)));
        var S = v.getFont(),
          x = n.get("nameTruncate", !0) || {},
          T = x.ellipsis,
          D = jo(e.raw.nameTruncateMaxWidth, x.maxWidth, w),
          A = s.nameMarginLevel || 0,
          C = new Ht({
            x: m.x,
            y: m.y,
            rotation: b.rotation,
            silent: Br.isLabelSilent(n),
            style: Hr(v, {
              text: u,
              font: S,
              overflow: "truncate",
              width: D,
              ellipsis: T,
              fill:
                v.getTextColor() || n.get(["axisLine", "lineStyle", "color"]),
              align: v.get("align") || b.textAlign,
              verticalAlign: v.get("verticalAlign") || b.textVerticalAlign,
            }),
            z2: 1,
          });
        if (
          (Qs({ el: C, componentModel: n, itemName: u }),
          (C.__fullText = u),
          (C.anid = "name"),
          n.get("triggerEvent"))
        ) {
          var I = Br.makeAxisEventDataBase(n);
          ((I.targetType = "axisName"), (I.name = u), (ot(C).eventData = I));
        }
        (a.add(C), C.updateTransform(), (t.nameEl = C));
        var L = (l.nameLayout = Ur({
          label: C,
          priority: C.z2,
          defaultAttr: { ignore: C.ignore },
          marginDefault: yi(f) ? r2[A] : n2[A],
        }));
        if (
          ((l.nameLocation = f),
          i.add(C),
          C.decomposeTransform(),
          e.shouldNameMoveOverlap && L)
        ) {
          var P = r.ensureRecord(n);
          r.resolveAxisNameOverlap(e, r, n, L, g, P);
        }
      }
    },
  };
function Xp(e, t, r, n, i, a, o, s) {
  S_(t) || c2(e, t, i, s, n, o);
  var l = t.labelLayoutList;
  (v2(e, n, l, a), e.rotation);
  var u = e.optionHideOverlap;
  (l2(n, l, u),
    u &&
      FD(
        kt(l, function (f) {
          return f && !f.label.ignore;
        }),
      ),
    i2(e, r, n, l));
}
function s2(e, t, r, n) {
  var i = vm(r - e),
    a,
    o,
    s = n[0] > n[1],
    l = (t === "start" && !s) || (t !== "start" && s);
  return (
    os(i - kr / 2)
      ? ((o = l ? "bottom" : "top"), (a = "center"))
      : os(i - kr * 1.5)
        ? ((o = l ? "top" : "bottom"), (a = "center"))
        : ((o = "middle"),
          i < kr * 1.5 && i > kr / 2
            ? (a = l ? "left" : "right")
            : (a = l ? "right" : "left")),
    { rotation: i, textAlign: a, textVerticalAlign: o }
  );
}
function l2(e, t, r) {
  if (o_(e.axis)) return;
  function n(s, l, u) {
    var f = Ur(t[l]),
      h = Ur(t[u]);
    if (!(!f || !h)) {
      if (s === !1 || f.suggestIgnore) {
        Qi(f.label);
        return;
      }
      if (h.suggestIgnore) {
        Qi(h.label);
        return;
      }
      var v = 0.1;
      if (!r) {
        var c = [0, 0, 0, 0];
        ((f = Gd({ marginForce: c }, f)), (h = Gd({ marginForce: c }, h)));
      }
      mc(f, h, null, { touchThreshold: v }) && Qi(s ? h.label : f.label);
    }
  }
  var i = e.get(["axisLabel", "showMinLabel"]),
    a = e.get(["axisLabel", "showMaxLabel"]),
    o = t.length;
  (n(i, 0, 1), n(a, o - 1, o - 2));
}
function u2(e, t, r) {
  e.showMinorTicks ||
    M(t, function (n) {
      if (n && n.label.ignore)
        for (var i = 0; i < r.length; i++) {
          var a = r[i],
            o = p_(a),
            s = La(n.label);
          if (o.tickValue != null && !o.onBand && o.tickValue === s.tickValue) {
            Qi(a);
            return;
          }
        }
    });
}
function Qi(e) {
  e && (e.ignore = !0);
}
function b_(e, t, r, n, i) {
  for (var a = [], o = [], s = [], l = 0; l < e.length; l++) {
    var u = e[l].coord;
    ((o[0] = u),
      (o[1] = 0),
      (s[0] = u),
      (s[1] = r),
      t && (Se(o, o, t), Se(s, s, t)));
    var f = new Gr({
      shape: { x1: o[0], y1: o[1], x2: s[0], y2: s[1] },
      style: n,
      z2: 2,
      autoBatch: !0,
      silent: !0,
    });
    (ba(f.shape, f.style.lineWidth),
      (f.anid = i + "_" + e[l].tickValue),
      a.push(f));
    var h = p_(f);
    ((h.onBand = !!e[l].onBand), (h.tickValue = e[l].tickValue));
  }
  return a;
}
function f2(e, t, r, n) {
  var i = n.axis,
    a = n.getModel("axisTick"),
    o = a.get("show");
  if (
    (o === "auto" &&
      ((o = !0),
      e.raw.axisTickAutoShow != null && (o = !!e.raw.axisTickAutoShow)),
    !o || i.scale.isBlank())
  )
    return [];
  for (
    var s = a.getModel("lineStyle"),
      l = e.tickDirection * a.get("length"),
      u = i.getTicksCoords(),
      f = b_(
        u,
        r.transform,
        l,
        dt(s.getLineStyle(), {
          stroke: n.get(["axisLine", "lineStyle", "color"]),
        }),
        "ticks",
      ),
      h = 0;
    h < f.length;
    h++
  )
    t.add(f[h]);
  return f;
}
function h2(e, t, r, n, i) {
  var a = n.axis,
    o = n.getModel("minorTick");
  if (!(!e.showMinorTicks || a.scale.isBlank())) {
    var s = a.getMinorTicksCoords();
    if (s.length)
      for (
        var l = o.getModel("lineStyle"),
          u = i * o.get("length"),
          f = dt(
            l.getLineStyle(),
            dt(n.getModel("axisTick").getLineStyle(), {
              stroke: n.get(["axisLine", "lineStyle", "color"]),
            }),
          ),
          h = 0;
        h < s.length;
        h++
      )
        for (
          var v = b_(s[h], r.transform, u, f, "minorticks_" + h), c = 0;
          c < v.length;
          c++
        )
          t.add(v[c]);
  }
}
function qp(e, t, r) {
  if (S_(e)) {
    var n = e.axisLabelsCreationContext,
      i = n.out.noPxChangeTryDetermine;
    if (r.noPxChange) {
      for (var a = !0, o = 0; o < i.length; o++) a = a && i[o]();
      if (a) return !1;
    }
    i.length && (t.remove(e.labelGroup), nh(e, null, null, null));
  }
  return !0;
}
function c2(e, t, r, n, i, a) {
  var o = i.axis,
    s = jo(e.raw.axisLabelShow, i.get(["axisLabel", "show"])),
    l = new Et();
  r.add(l);
  var u = ks(n);
  if (!s || o.scale.isBlank()) {
    nh(t, [], l, u);
    return;
  }
  var f = i.getModel("axisLabel"),
    h = o.getViewLabels(u),
    v = ((jo(e.raw.labelRotate, f.get("rotate")) || 0) * kr) / 180,
    c = Br.innerTextLayout(e.rotation, v, e.labelDirection),
    d = i.getCategories && i.getCategories(!0),
    p = [],
    m = i.get("triggerEvent"),
    g = 1 / 0,
    y = -1 / 0;
  M(h, function (b, w) {
    var S,
      x =
        o.scale.type === "ordinal"
          ? o.scale.getRawOrdinalNumber(b.tickValue)
          : b.tickValue,
      T = b.formattedLabel,
      D = b.rawLabel,
      A = f;
    if (d && d[x]) {
      var C = d[x];
      X(C) && C.textStyle && (A = new bt(C.textStyle, f, i.ecModel));
    }
    var I = A.getTextColor() || i.get(["axisLine", "lineStyle", "color"]),
      L = A.getShallow("align", !0) || c.textAlign,
      P = K(A.getShallow("alignMinLabel", !0), L),
      k = K(A.getShallow("alignMaxLabel", !0), L),
      E =
        A.getShallow("verticalAlign", !0) ||
        A.getShallow("baseline", !0) ||
        c.textVerticalAlign,
      V = K(A.getShallow("verticalAlignMinLabel", !0), E),
      R = K(A.getShallow("verticalAlignMaxLabel", !0), E),
      O =
        10 + (((S = b.time) === null || S === void 0 ? void 0 : S.level) || 0);
    ((g = Math.min(g, O)), (y = Math.max(y, O)));
    var z = new Ht({
      x: 0,
      y: 0,
      rotation: 0,
      silent: Br.isLabelSilent(i),
      z2: O,
      style: Hr(A, {
        text: T,
        align: w === 0 ? P : w === h.length - 1 ? k : L,
        verticalAlign: w === 0 ? V : w === h.length - 1 ? R : E,
        fill: Q(I)
          ? I(o.type === "category" ? D : o.type === "value" ? x + "" : x, w)
          : I,
      }),
    });
    z.anid = "label_" + x;
    var F = La(z);
    if (
      ((F.break = b.break),
      (F.tickValue = x),
      (F.layoutRotation = c.rotation),
      Qs({
        el: z,
        componentModel: i,
        itemName: T,
        formatterParamsExtra: {
          isTruncated: function () {
            return z.isTruncated;
          },
          value: D,
          tickIndex: w,
        },
      }),
      m)
    ) {
      var N = Br.makeAxisEventDataBase(i);
      ((N.targetType = "axisLabel"),
        (N.value = D),
        (N.tickIndex = w),
        b.break &&
          (N.break = {
            start: b.break.parsedBreak.vmin,
            end: b.break.parsedBreak.vmax,
          }),
        o.type === "category" && (N.dataIndex = x),
        (ot(z).eventData = N),
        b.break && p2(i, a, z, b.break));
    }
    (p.push(z), l.add(z));
  });
  var _ = q(p, function (b) {
    return {
      label: b,
      priority: La(b).break ? b.z2 + (y - g + 1) : b.z2,
      defaultAttr: { ignore: b.ignore },
    };
  });
  nh(t, _, l, u);
}
function S_(e) {
  return !!e.labelLayoutList;
}
function nh(e, t, r, n) {
  ((e.labelLayoutList = t),
    (e.labelGroup = r),
    (e.axisLabelsCreationContext = n));
}
function v2(e, t, r, n) {
  var i = t.get(["axisLabel", "margin"]);
  M(r, function (a, o) {
    var s = Ur(a);
    if (s) {
      var l = s.label,
        u = La(l);
      ((s.suggestIgnore = l.ignore),
        (l.ignore = !1),
        Qu(or, d2),
        (or.x = t.axis.dataToCoord(u.tickValue)),
        (or.y = e.labelOffset + e.labelDirection * i),
        (or.rotation = u.layoutRotation),
        n.add(or),
        or.updateTransform(),
        n.remove(or),
        or.decomposeTransform(),
        Qu(l, or),
        l.markRedraw(),
        xs(s, !0),
        Ur(s));
    }
  });
}
var or = new Tt(),
  d2 = new Tt();
function Lc(e) {
  return !!e;
}
function p2(e, t, r, n) {
  r.on("click", function (i) {
    var a = {
      type: e2,
      breaks: [
        {
          start: n.parsedBreak.breakOption.start,
          end: n.parsedBreak.breakOption.end,
        },
      ],
    };
    ((a[e.axis.dim + "AxisIndex"] = e.componentIndex), t.dispatchAction(a));
  });
}
function Rs(e, t, r) {
  r = r || {};
  var n = t.axis,
    i = {},
    a = n.getAxesOnZeroOf()[0],
    o = n.position,
    s = a ? "onZero" : o,
    l = n.dim,
    u = [e.x, e.x + e.width, e.y, e.y + e.height],
    f = { left: 0, right: 1, top: 0, bottom: 1, onZero: 2 },
    h = t.get("offset") || 0,
    v = l === "x" ? [u[2] - h, u[3] + h] : [u[0] - h, u[1] + h];
  if (a) {
    var c = a.toGlobalCoord(a.dataToCoord(0));
    v[f.onZero] = Math.max(Math.min(c, v[1]), v[0]);
  }
  ((i.position = [l === "y" ? v[f[s]] : u[0], l === "x" ? v[f[s]] : u[3]]),
    (i.rotation = (Math.PI / 2) * (l === "x" ? 0 : 1)));
  var d = { top: -1, bottom: 1, left: -1, right: 1 };
  ((i.labelDirection = i.tickDirection = i.nameDirection = d[o]),
    (i.labelOffset = a ? v[f[o]] - v[f.onZero] : 0),
    t.get(["axisTick", "inside"]) && (i.tickDirection = -i.tickDirection),
    jo(r.labelInside, t.get(["axisLabel", "inside"])) &&
      (i.labelDirection = -i.labelDirection));
  var p = t.get(["axisLabel", "rotate"]);
  return ((i.labelRotate = s === "top" ? -p : p), (i.z2 = 1), i);
}
function g2(e) {
  return e.coordinateSystem && e.coordinateSystem.type === "cartesian2d";
}
function Zp(e) {
  var t = { xAxisModel: null, yAxisModel: null };
  return (
    M(t, function (r, n) {
      var i = n.replace(/Model$/, ""),
        a = e.getReferringComponents(i, _e).models[0];
      t[n] = a;
    }),
    t
  );
}
function m2(e, t, r, n, i, a) {
  for (var o = Rs(e, r), s = !1, l = !1, u = 0; u < t.length; u++)
    Qf(t[u].getOtherAxis(r.axis).scale) &&
      ((s = l = !0), r.axis.type === "category" && r.axis.onBand && (l = !1));
  return (
    (o.axisLineAutoShow = s),
    (o.axisTickAutoShow = l),
    (o.defaultNameMoveOverlap = a),
    new Br(r, n, o, i)
  );
}
function y2(e, t, r) {
  var n = Rs(t, r);
  e.updateCfg(n);
}
function _2(e, t, r) {
  var n = mi.prototype,
    i = n.getTicks.call(r),
    a = n.getTicks.call(r, { expandToNicedExtent: !0 }),
    o = i.length - 1,
    s = n.getInterval.call(r),
    l = a_(e, t),
    u = l.extent,
    f = l.fixMin,
    h = l.fixMax;
  (e.type === "log" && (u = Jf(e.base, u, !0)),
    e.setBreaksFromOption(s_(t)),
    e.setExtent(u[0], u[1]),
    e.calcNiceExtent({ splitNumber: o, fixMin: f, fixMax: h }));
  var v = n.getExtent.call(e);
  (f && (u[0] = v[0]), h && (u[1] = v[1]));
  var c = n.getInterval.call(e),
    d = u[0],
    p = u[1];
  if (f && h) c = (p - d) / o;
  else if (f)
    for (p = u[0] + c * o; p < u[1] && isFinite(p) && isFinite(u[1]); )
      ((c = Pu(c)), (p = u[0] + c * o));
  else if (h)
    for (d = u[1] - c * o; d > u[0] && isFinite(d) && isFinite(u[0]); )
      ((c = Pu(c)), (d = u[1] - c * o));
  else {
    var m = e.getTicks().length - 1;
    m > o && (c = Pu(c));
    var g = c * o;
    ((p = Math.ceil(u[1] / c) * c),
      (d = Gt(p - g)),
      d < 0 && u[0] >= 0
        ? ((d = 0), (p = Gt(g)))
        : p > 0 && u[1] <= 0 && ((p = 0), (d = -Gt(g))));
  }
  var y = (i[0].value - a[0].value) / s,
    _ = (i[o].value - a[o].value) / s;
  (n.setExtent.call(e, d + c * y, p + c * _),
    n.setInterval.call(e, c),
    (y || _) && n.setNiceExtent.call(e, d + c, p - c));
}
var Kp = [
    [3, 1],
    [0, 2],
  ],
  b2 = (function () {
    function e(t, r, n) {
      ((this.type = "grid"),
        (this._coordsMap = {}),
        (this._coordsList = []),
        (this._axesMap = {}),
        (this._axesList = []),
        (this.axisPointerEnabled = !0),
        (this.dimensions = eh),
        this._initCartesian(t, r, n),
        (this.model = t));
    }
    return (
      (e.prototype.getRect = function () {
        return this._rect;
      }),
      (e.prototype.update = function (t, r) {
        var n = this._axesMap;
        this._updateScale(t, this.model);
        function i(o) {
          var s,
            l = yt(o),
            u = l.length;
          if (u) {
            for (var f = [], h = u - 1; h >= 0; h--) {
              var v = +l[h],
                c = o[v],
                d = c.model,
                p = c.scale;
              Qf(p) && d.get("alignTicks") && d.get("interval") == null
                ? f.push(c)
                : (Wp(p, d), Qf(p) && (s = c));
            }
            f.length &&
              (s || ((s = f.pop()), Wp(s.scale, s.model)),
              M(f, function (m) {
                _2(m.scale, m.model, s.scale);
              }));
          }
        }
        (i(n.x), i(n.y));
        var a = {};
        (M(n.x, function (o) {
          jp(n, "y", o, a);
        }),
          M(n.y, function (o) {
            jp(n, "x", o, a);
          }),
          this.resize(this.model, r));
      }),
      (e.prototype.resize = function (t, r, n) {
        var i = sl(t, r),
          a = (this._rect = Vr(t.getBoxLayoutParams(), i.refContainer)),
          o = this._axesMap,
          s = this._coordsList,
          l = t.get("containLabel");
        if ((w_(o, a), !n)) {
          var u = w2(a, s, o, l, r),
            f = void 0;
          if (l) f = tg(a.clone(), "axisLabel", null, a, o, u, i);
          else {
            var h = x2(t, a, i),
              v = h.outerBoundsRect,
              c = h.parsedOuterBoundsContain,
              d = h.outerBoundsClamp;
            v && (f = tg(v, c, d, a, o, u, i));
          }
          x_(a, o, Ee.determine, null, f, i);
        }
        M(this._coordsList, function (p) {
          p.calcAffineTransform();
        });
      }),
      (e.prototype.getAxis = function (t, r) {
        var n = this._axesMap[t];
        if (n != null) return n[r || 0];
      }),
      (e.prototype.getAxes = function () {
        return this._axesList.slice();
      }),
      (e.prototype.getCartesian = function (t, r) {
        if (t != null && r != null) {
          var n = "x" + t + "y" + r;
          return this._coordsMap[n];
        }
        X(t) && ((r = t.yAxisIndex), (t = t.xAxisIndex));
        for (var i = 0, a = this._coordsList; i < a.length; i++)
          if (a[i].getAxis("x").index === t || a[i].getAxis("y").index === r)
            return a[i];
      }),
      (e.prototype.getCartesians = function () {
        return this._coordsList.slice();
      }),
      (e.prototype.convertToPixel = function (t, r, n) {
        var i = this._findConvertTarget(r);
        return i.cartesian
          ? i.cartesian.dataToPoint(n)
          : i.axis
            ? i.axis.toGlobalCoord(i.axis.dataToCoord(n))
            : null;
      }),
      (e.prototype.convertFromPixel = function (t, r, n) {
        var i = this._findConvertTarget(r);
        return i.cartesian
          ? i.cartesian.pointToData(n)
          : i.axis
            ? i.axis.coordToData(i.axis.toLocalCoord(n))
            : null;
      }),
      (e.prototype._findConvertTarget = function (t) {
        var r = t.seriesModel,
          n =
            t.xAxisModel ||
            (r && r.getReferringComponents("xAxis", _e).models[0]),
          i =
            t.yAxisModel ||
            (r && r.getReferringComponents("yAxis", _e).models[0]),
          a = t.gridModel,
          o = this._coordsList,
          s,
          l;
        if (r) ((s = r.coordinateSystem), st(o, s) < 0 && (s = null));
        else if (n && i)
          s = this.getCartesian(n.componentIndex, i.componentIndex);
        else if (n) l = this.getAxis("x", n.componentIndex);
        else if (i) l = this.getAxis("y", i.componentIndex);
        else if (a) {
          var u = a.coordinateSystem;
          u === this && (s = this._coordsList[0]);
        }
        return { cartesian: s, axis: l };
      }),
      (e.prototype.containPoint = function (t) {
        var r = this._coordsList[0];
        if (r) return r.containPoint(t);
      }),
      (e.prototype._initCartesian = function (t, r, n) {
        var i = this,
          a = this,
          o = { left: !1, right: !1, top: !1, bottom: !1 },
          s = { x: {}, y: {} },
          l = { x: 0, y: 0 };
        if (
          (r.eachComponent("xAxis", u("x"), this),
          r.eachComponent("yAxis", u("y"), this),
          !l.x || !l.y)
        ) {
          ((this._axesMap = {}), (this._axesList = []));
          return;
        }
        ((this._axesMap = s),
          M(s.x, function (f, h) {
            M(s.y, function (v, c) {
              var d = "x" + h + "y" + c,
                p = new zL(d);
              ((p.master = i),
                (p.model = t),
                (i._coordsMap[d] = p),
                i._coordsList.push(p),
                p.addAxis(f),
                p.addAxis(v));
            });
          }));
        function u(f) {
          return function (h, v) {
            if (Ru(h, t)) {
              var c = h.get("position");
              (f === "x"
                ? c !== "top" &&
                  c !== "bottom" &&
                  (c = o.bottom ? "top" : "bottom")
                : c !== "left" &&
                  c !== "right" &&
                  (c = o.left ? "right" : "left"),
                (o[c] = !0));
              var d = new t2(f, OL(h), [0, 0], h.get("type"), c),
                p = d.type === "category";
              ((d.onBand = p && h.get("boundaryGap")),
                (d.inverse = h.get("inverse")),
                (h.axis = d),
                (d.model = h),
                (d.grid = a),
                (d.index = v),
                a._axesList.push(d),
                (s[f][v] = d),
                l[f]++);
            }
          };
        }
      }),
      (e.prototype._updateScale = function (t, r) {
        (M(this._axesList, function (i) {
          if ((i.scale.setExtent(1 / 0, -1 / 0), i.type === "category")) {
            var a = i.model.get("categorySortInfo");
            i.scale.setSortInfo(a);
          }
        }),
          t.eachSeries(function (i) {
            if (g2(i)) {
              var a = Zp(i),
                o = a.xAxisModel,
                s = a.yAxisModel;
              if (!Ru(o, r) || !Ru(s, r)) return;
              var l = this.getCartesian(o.componentIndex, s.componentIndex),
                u = i.getData(),
                f = l.getAxis("x"),
                h = l.getAxis("y");
              (n(u, f), n(u, h));
            }
          }, this));
        function n(i, a) {
          M(NL(i, a.dim), function (o) {
            a.scale.unionExtentFromData(i, o);
          });
        }
      }),
      (e.prototype.getTooltipAxes = function (t) {
        var r = [],
          n = [];
        return (
          M(this.getCartesians(), function (i) {
            var a = t != null && t !== "auto" ? i.getAxis(t) : i.getBaseAxis(),
              o = i.getOtherAxis(a);
            (st(r, a) < 0 && r.push(a), st(n, o) < 0 && n.push(o));
          }),
          { baseAxes: r, otherAxes: n }
        );
      }),
      (e.create = function (t, r) {
        var n = [];
        return (
          t.eachComponent("grid", function (i, a) {
            var o = new e(i, t, r);
            ((o.name = "grid_" + a),
              o.resize(i, r, !0),
              (i.coordinateSystem = o),
              n.push(o));
          }),
          t.eachSeries(function (i) {
            Kx({
              targetModel: i,
              coordSysType: "cartesian2d",
              coordSysProvider: a,
            });
            function a() {
              var o = Zp(i),
                s = o.xAxisModel,
                l = o.yAxisModel,
                u = s.getCoordSysModel(),
                f = u.coordinateSystem;
              return f.getCartesian(s.componentIndex, l.componentIndex);
            }
          }),
          n
        );
      }),
      (e.dimensions = eh),
      e
    );
  })();
function Ru(e, t) {
  return e.getCoordSysModel() === t;
}
function jp(e, t, r, n) {
  r.getAxesOnZeroOf = function () {
    return a ? [a] : [];
  };
  var i = e[t],
    a,
    o = r.model,
    s = o.get(["axisLine", "onZero"]),
    l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!s) return;
  if (l != null) Qp(i[l]) && (a = i[l]);
  else
    for (var u in i)
      if (i.hasOwnProperty(u) && Qp(i[u]) && !n[f(i[u])]) {
        a = i[u];
        break;
      }
  a && (n[f(a)] = !0);
  function f(h) {
    return h.dim + "_" + h.index;
  }
}
function Qp(e) {
  return e && e.type !== "category" && e.type !== "time" && BL(e);
}
function S2(e, t) {
  var r = e.getExtent(),
    n = r[0] + r[1];
  ((e.toGlobalCoord =
    e.dim === "x"
      ? function (i) {
          return i + t;
        }
      : function (i) {
          return n - i + t;
        }),
    (e.toLocalCoord =
      e.dim === "x"
        ? function (i) {
            return i - t;
          }
        : function (i) {
            return n - i + t;
          }));
}
function w_(e, t) {
  (M(e.x, function (r) {
    return Jp(r, t.x, t.width);
  }),
    M(e.y, function (r) {
      return Jp(r, t.y, t.height);
    }));
}
function Jp(e, t, r) {
  var n = [0, r],
    i = e.inverse ? 1 : 0;
  (e.setExtent(n[i], n[1 - i]), S2(e, t));
}
function tg(e, t, r, n, i, a, o) {
  x_(n, i, Ee.estimate, t, !1, o);
  var s = [0, 0, 0, 0];
  (u(0), u(1), f(n, 0, NaN), f(n, 1, NaN));
  var l =
    L1(s, function (v) {
      return v > 0;
    }) == null;
  return (ps(n, s, !0, !0, r), w_(i, n), l);
  function u(v) {
    M(i[Ar[v]], function (c) {
      if (Aa(c.model)) {
        var d = a.ensureRecord(c.model),
          p = d.labelInfoList;
        if (p)
          for (var m = 0; m < p.length; m++) {
            var g = p[m],
              y = c.scale.normalize(La(g.label).tickValue);
            ((y = v === 1 ? 1 - y : y), f(g.rect, v, y), f(g.rect, 1 - v, NaN));
          }
        var _ = d.nameLayout;
        if (_) {
          var y = yi(d.nameLocation) ? 0.5 : NaN;
          (f(_.rect, v, y), f(_.rect, 1 - v, NaN));
        }
      }
    });
  }
  function f(v, c, d) {
    var p = e[Ar[c]] - v[Ar[c]],
      m = v[vi[c]] + v[Ar[c]] - (e[vi[c]] + e[Ar[c]]);
    ((p = h(p, 1 - d)), (m = h(m, d)));
    var g = Kp[c][0],
      y = Kp[c][1];
    ((s[g] = ue(s[g], p)), (s[y] = ue(s[y], m)));
  }
  function h(v, c) {
    return (v > 0 && !da(c) && c > 1e-4 && (v /= c), v);
  }
}
function w2(e, t, r, n, i) {
  var a = new g_(T2);
  return (
    M(r, function (o) {
      return M(o, function (s) {
        if (Aa(s.model)) {
          var l = !n;
          s.axisBuilder = m2(e, t, s.model, i, a, l);
        }
      });
    }),
    a
  );
}
function x_(e, t, r, n, i, a) {
  var o = r === Ee.determine;
  M(t, function (u) {
    return M(u, function (f) {
      Aa(f.model) &&
        (y2(f.axisBuilder, e, f.model),
        f.axisBuilder.build(
          o ? { axisTickLabelDetermine: !0 } : { axisTickLabelEstimate: !0 },
          { noPxChange: i },
        ));
    });
  });
  var s = { x: 0, y: 0 };
  (l(0), l(1));
  function l(u) {
    s[Ar[1 - u]] =
      e[vi[u]] <= a.refContainer[vi[u]] * 0.5 ? 0 : 1 - u === 1 ? 2 : 1;
  }
  M(t, function (u, f) {
    return M(u, function (h) {
      Aa(h.model) &&
        ((n === "all" || o) &&
          h.axisBuilder.build({ axisName: !0 }, { nameMarginLevel: s[f] }),
        o && h.axisBuilder.build({ axisLine: !0 }));
    });
  });
}
function x2(e, t, r) {
  var n,
    i = e.get("outerBoundsMode", !0);
  i === "same"
    ? (n = t.clone())
    : (i == null || i === "auto") &&
      (n = Vr(e.get("outerBounds", !0) || t_, r.refContainer));
  var a = e.get("outerBoundsContain", !0),
    o;
  a == null || a === "auto" || st(["all", "axisLabel"], a) < 0
    ? (o = "all")
    : (o = a);
  var s = [
    vf(K(e.get("outerBoundsClampWidth", !0), Is[0]), t.width),
    vf(K(e.get("outerBoundsClampHeight", !0), Is[1]), t.height),
  ];
  return {
    outerBoundsRect: n,
    parsedOuterBoundsContain: o,
    outerBoundsClamp: s,
  };
}
var T2 = function (e, t, r, n, i, a) {
  var o = r.axis.dim === "x" ? "y" : "x";
  (m_(e, t, r, n, i, a),
    yi(e.nameLocation) ||
      M(t.recordMap[o], function (s) {
        s && s.labelInfoList && s.dirVec && __(s.labelInfoList, s.dirVec, n, i);
      }));
};
function C2(e, t) {
  var r = {
    axesInfo: {},
    seriesInvolved: !1,
    coordSysAxesInfo: {},
    coordSysMap: {},
  };
  return (D2(r, e, t), r.seriesInvolved && A2(r, e), r);
}
function D2(e, t, r) {
  var n = t.getComponent("tooltip"),
    i = t.getComponent("axisPointer"),
    a = i.get("link", !0) || [],
    o = [];
  M(r.getCoordinateSystems(), function (s) {
    if (!s.axisPointerEnabled) return;
    var l = Ia(s.model),
      u = (e.coordSysAxesInfo[l] = {});
    e.coordSysMap[l] = s;
    var f = s.model,
      h = f.getModel("tooltip", n);
    if (
      (M(s.getAxes(), Mt(p, !1, null)), s.getTooltipAxes && n && h.get("show"))
    ) {
      var v = h.get("trigger") === "axis",
        c = h.get(["axisPointer", "type"]) === "cross",
        d = s.getTooltipAxes(h.get(["axisPointer", "axis"]));
      ((v || c) && M(d.baseAxes, Mt(p, c ? "cross" : !0, v)),
        c && M(d.otherAxes, Mt(p, "cross", !1)));
    }
    function p(m, g, y) {
      var _ = y.model.getModel("axisPointer", i),
        b = _.get("show");
      if (!(!b || (b === "auto" && !m && !ih(_)))) {
        (g == null && (g = _.get("triggerTooltip")),
          (_ = m ? M2(y, h, i, t, m, g) : _));
        var w = _.get("snap"),
          S = _.get("triggerEmphasis"),
          x = Ia(y.model),
          T = g || w || y.type === "category",
          D = (e.axesInfo[x] = {
            key: x,
            axis: y,
            coordSys: s,
            axisPointerModel: _,
            triggerTooltip: g,
            triggerEmphasis: S,
            involveSeries: T,
            snap: w,
            useHandle: ih(_),
            seriesModels: [],
            linkGroup: null,
          });
        ((u[x] = D), (e.seriesInvolved = e.seriesInvolved || T));
        var A = L2(a, y);
        if (A != null) {
          var C = o[A] || (o[A] = { axesInfo: {} });
          ((C.axesInfo[x] = D), (C.mapper = a[A].mapper), (D.linkGroup = C));
        }
      }
    }
  });
}
function M2(e, t, r, n, i, a) {
  var o = t.getModel("axisPointer"),
    s = [
      "type",
      "snap",
      "lineStyle",
      "shadowStyle",
      "label",
      "animation",
      "animationDurationUpdate",
      "animationEasingUpdate",
      "z",
    ],
    l = {};
  (M(s, function (v) {
    l[v] = at(o.get(v));
  }),
    (l.snap = e.type !== "category" && !!a),
    o.get("type") === "cross" && (l.type = "line"));
  var u = l.label || (l.label = {});
  if ((u.show == null && (u.show = !1), i === "cross")) {
    var f = o.get(["label", "show"]);
    if (((u.show = f ?? !0), !a)) {
      var h = (l.lineStyle = o.get("crossStyle"));
      h && dt(u, h.textStyle);
    }
  }
  return e.model.getModel("axisPointer", new bt(l, r, n));
}
function A2(e, t) {
  t.eachSeries(function (r) {
    var n = r.coordinateSystem,
      i = r.get(["tooltip", "trigger"], !0),
      a = r.get(["tooltip", "show"], !0);
    !n ||
      !n.model ||
      i === "none" ||
      i === !1 ||
      i === "item" ||
      a === !1 ||
      r.get(["axisPointer", "show"], !0) === !1 ||
      M(e.coordSysAxesInfo[Ia(n.model)], function (o) {
        var s = o.axis;
        n.getAxis(s.dim) === s &&
          (o.seriesModels.push(r),
          o.seriesDataCount == null && (o.seriesDataCount = 0),
          (o.seriesDataCount += r.getData().count()));
      });
  });
}
function L2(e, t) {
  for (var r = t.model, n = t.dim, i = 0; i < e.length; i++) {
    var a = e[i] || {};
    if (
      Eu(a[n + "AxisId"], r.id) ||
      Eu(a[n + "AxisIndex"], r.componentIndex) ||
      Eu(a[n + "AxisName"], r.name)
    )
      return i;
  }
}
function Eu(e, t) {
  return e === "all" || (W(e) && st(e, t) >= 0) || e === t;
}
function I2(e) {
  var t = Ic(e);
  if (t) {
    var r = t.axisPointerModel,
      n = t.axis.scale,
      i = r.option,
      a = r.get("status"),
      o = r.get("value");
    o != null && (o = n.parse(o));
    var s = ih(r);
    a == null && (i.status = s ? "show" : "hide");
    var l = n.getExtent().slice();
    (l[0] > l[1] && l.reverse(),
      (o == null || o > l[1]) && (o = l[1]),
      o < l[0] && (o = l[0]),
      (i.value = o),
      s && (i.status = t.axis.scale.isBlank() ? "hide" : "show"));
  }
}
function Ic(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[Ia(e)];
}
function P2(e) {
  var t = Ic(e);
  return t && t.axisPointerModel;
}
function ih(e) {
  return !!e.get(["handle", "show"]);
}
function Ia(e) {
  return e.type + "||" + e.id;
}
var eg = {},
  T_ = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = t.type), r);
    }
    return (
      (t.prototype.render = function (r, n, i, a) {
        (this.axisPointerClass && I2(r),
          e.prototype.render.apply(this, arguments),
          this._doUpdateAxisPointerClass(r, i, !0));
      }),
      (t.prototype.updateAxisPointer = function (r, n, i, a) {
        this._doUpdateAxisPointerClass(r, i, !1);
      }),
      (t.prototype.remove = function (r, n) {
        var i = this._axisPointer;
        i && i.remove(n);
      }),
      (t.prototype.dispose = function (r, n) {
        (this._disposeAxisPointer(n),
          e.prototype.dispose.apply(this, arguments));
      }),
      (t.prototype._doUpdateAxisPointerClass = function (r, n, i) {
        var a = t.getAxisPointerClass(this.axisPointerClass);
        if (a) {
          var o = P2(r);
          o
            ? (this._axisPointer || (this._axisPointer = new a())).render(
                r,
                o,
                n,
                i,
              )
            : this._disposeAxisPointer(n);
        }
      }),
      (t.prototype._disposeAxisPointer = function (r) {
        (this._axisPointer && this._axisPointer.dispose(r),
          (this._axisPointer = null));
      }),
      (t.registerAxisPointerClass = function (r, n) {
        eg[r] = n;
      }),
      (t.getAxisPointerClass = function (r) {
        return r && eg[r];
      }),
      (t.type = "axis"),
      t
    );
  })(ke),
  ah = _t();
function k2(e, t, r, n) {
  var i = r.axis;
  if (!i.scale.isBlank()) {
    var a = r.getModel("splitArea"),
      o = a.getModel("areaStyle"),
      s = o.get("color"),
      l = n.coordinateSystem.getRect(),
      u = i.getTicksCoords({
        tickModel: a,
        clamp: !0,
        breakTicks: "none",
        pruneByBreak: "preserve_extent_bound",
      });
    if (u.length) {
      var f = s.length,
        h = ah(e).splitAreaColors,
        v = rt(),
        c = 0;
      if (h)
        for (var d = 0; d < u.length; d++) {
          var p = h.get(u[d].tickValue);
          if (p != null) {
            c = (p + (f - 1) * d) % f;
            break;
          }
        }
      var m = i.toGlobalCoord(u[0].coord),
        g = o.getAreaStyle();
      s = W(s) ? s : [s];
      for (var d = 1; d < u.length; d++) {
        var y = i.toGlobalCoord(u[d].coord),
          _ = void 0,
          b = void 0,
          w = void 0,
          S = void 0;
        i.isHorizontal()
          ? ((_ = m), (b = l.y), (w = y - _), (S = l.height), (m = _ + w))
          : ((_ = l.x), (b = m), (w = l.width), (S = y - b), (m = b + S));
        var x = u[d - 1].tickValue;
        (x != null && v.set(x, c),
          t.add(
            new Tt({
              anid: x != null ? "area_" + x : null,
              shape: { x: _, y: b, width: w, height: S },
              style: dt({ fill: s[c] }, g),
              autoBatch: !0,
              silent: !0,
            }),
          ),
          (c = (c + 1) % f));
      }
      ah(e).splitAreaColors = v;
    }
  }
}
function R2(e) {
  ah(e).splitAreaColors = null;
}
var E2 = ["splitArea", "splitLine", "minorSplitLine", "breakArea"],
  C_ = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return (
        (r.type = t.type),
        (r.axisPointerClass = "CartesianAxisPointer"),
        r
      );
    }
    return (
      (t.prototype.render = function (r, n, i, a) {
        this.group.removeAll();
        var o = this._axisGroup;
        if (
          ((this._axisGroup = new Et()),
          this.group.add(this._axisGroup),
          !!Aa(r))
        ) {
          (this._axisGroup.add(r.axis.axisBuilder.group),
            M(
              E2,
              function (l) {
                r.get([l, "show"]) &&
                  O2[l](this, this._axisGroup, r, r.getCoordSysModel(), i);
              },
              this,
            ));
          var s = a && a.type === "changeAxisOrder" && a.isInitSort;
          (s || Vm(o, this._axisGroup, r),
            e.prototype.render.call(this, r, n, i, a));
        }
      }),
      (t.prototype.remove = function () {
        R2(this);
      }),
      (t.type = "cartesianAxis"),
      t
    );
  })(T_),
  O2 = {
    splitLine: function (e, t, r, n, i) {
      var a = r.axis;
      if (!a.scale.isBlank()) {
        var o = r.getModel("splitLine"),
          s = o.getModel("lineStyle"),
          l = s.get("color"),
          u = o.get("showMinLine") !== !1,
          f = o.get("showMaxLine") !== !1;
        l = W(l) ? l : [l];
        for (
          var h = n.coordinateSystem.getRect(),
            v = a.isHorizontal(),
            c = 0,
            d = a.getTicksCoords({
              tickModel: o,
              breakTicks: "none",
              pruneByBreak: "preserve_extent_bound",
            }),
            p = [],
            m = [],
            g = s.getLineStyle(),
            y = 0;
          y < d.length;
          y++
        ) {
          var _ = a.toGlobalCoord(d[y].coord);
          if (!((y === 0 && !u) || (y === d.length - 1 && !f))) {
            var b = d[y].tickValue;
            v
              ? ((p[0] = _), (p[1] = h.y), (m[0] = _), (m[1] = h.y + h.height))
              : ((p[0] = h.x), (p[1] = _), (m[0] = h.x + h.width), (m[1] = _));
            var w = c++ % l.length,
              S = new Gr({
                anid: b != null ? "line_" + b : null,
                autoBatch: !0,
                shape: { x1: p[0], y1: p[1], x2: m[0], y2: m[1] },
                style: dt({ stroke: l[w] }, g),
                silent: !0,
              });
            (ba(S.shape, g.lineWidth), t.add(S));
          }
        }
      }
    },
    minorSplitLine: function (e, t, r, n, i) {
      var a = r.axis,
        o = r.getModel("minorSplitLine"),
        s = o.getModel("lineStyle"),
        l = n.coordinateSystem.getRect(),
        u = a.isHorizontal(),
        f = a.getMinorTicksCoords();
      if (f.length)
        for (var h = [], v = [], c = s.getLineStyle(), d = 0; d < f.length; d++)
          for (var p = 0; p < f[d].length; p++) {
            var m = a.toGlobalCoord(f[d][p].coord);
            u
              ? ((h[0] = m), (h[1] = l.y), (v[0] = m), (v[1] = l.y + l.height))
              : ((h[0] = l.x), (h[1] = m), (v[0] = l.x + l.width), (v[1] = m));
            var g = new Gr({
              anid: "minor_line_" + f[d][p].tickValue,
              autoBatch: !0,
              shape: { x1: h[0], y1: h[1], x2: v[0], y2: v[1] },
              style: c,
              silent: !0,
            });
            (ba(g.shape, c.lineWidth), t.add(g));
          }
    },
    splitArea: function (e, t, r, n, i) {
      k2(e, t, r, n);
    },
    breakArea: function (e, t, r, n, i) {
      r.axis.scale;
    },
  },
  D_ = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = t.type), r);
    }
    return ((t.type = "xAxis"), t);
  })(C_),
  B2 = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = D_.type), r);
    }
    return ((t.type = "yAxis"), t);
  })(C_),
  N2 = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = "grid"), r);
    }
    return (
      (t.prototype.render = function (r, n) {
        (this.group.removeAll(),
          r.get("show") &&
            this.group.add(
              new Tt({
                shape: r.coordinateSystem.getRect(),
                style: dt({ fill: r.get("backgroundColor") }, r.getItemStyle()),
                silent: !0,
                z2: -1,
              }),
            ));
      }),
      (t.type = "grid"),
      t
    );
  })(ke),
  rg = { offset: 0 };
function F2(e) {
  (e.registerComponentView(N2),
    e.registerComponentModel(aL),
    e.registerCoordinateSystem("cartesian2d", b2),
    Np(e, "x", Kf, rg),
    Np(e, "y", Kf, rg),
    e.registerComponentView(D_),
    e.registerComponentView(B2),
    e.registerPreprocessor(function (t) {
      t.xAxis && t.yAxis && !t.grid && (t.grid = {});
    }));
}
var bn = _t(),
  ng = at,
  Ou = ct,
  z2 = (function () {
    function e() {
      ((this._dragging = !1), (this.animationThreshold = 15));
    }
    return (
      (e.prototype.render = function (t, r, n, i) {
        var a = r.get("value"),
          o = r.get("status");
        if (
          ((this._axisModel = t),
          (this._axisPointerModel = r),
          (this._api = n),
          !(!i && this._lastValue === a && this._lastStatus === o))
        ) {
          ((this._lastValue = a), (this._lastStatus = o));
          var s = this._group,
            l = this._handle;
          if (!o || o === "hide") {
            (s && s.hide(), l && l.hide());
            return;
          }
          (s && s.show(), l && l.show());
          var u = {};
          this.makeElOption(u, a, t, r, n);
          var f = u.graphicKey;
          (f !== this._lastGraphicKey && this.clear(n),
            (this._lastGraphicKey = f));
          var h = (this._moveAnimation = this.determineAnimation(t, r));
          if (!s)
            ((s = this._group = new Et()),
              this.createPointerEl(s, u, t, r),
              this.createLabelEl(s, u, t, r),
              n.getZr().add(s));
          else {
            var v = Mt(ig, r, h);
            (this.updatePointerEl(s, u, v), this.updateLabelEl(s, u, v, r));
          }
          (og(s, r, !0), this._renderHandle(a));
        }
      }),
      (e.prototype.remove = function (t) {
        this.clear(t);
      }),
      (e.prototype.dispose = function (t) {
        this.clear(t);
      }),
      (e.prototype.determineAnimation = function (t, r) {
        var n = r.get("animation"),
          i = t.axis,
          a = i.type === "category",
          o = r.get("snap");
        if (!o && !a) return !1;
        if (n === "auto" || n == null) {
          var s = this.animationThreshold;
          if (a && i.getBandWidth() > s) return !0;
          if (o) {
            var l = Ic(t).seriesDataCount,
              u = i.getExtent();
            return Math.abs(u[0] - u[1]) / l > s;
          }
          return !1;
        }
        return n === !0;
      }),
      (e.prototype.makeElOption = function (t, r, n, i, a) {}),
      (e.prototype.createPointerEl = function (t, r, n, i) {
        var a = r.pointer;
        if (a) {
          var o = (bn(t).pointerEl = new ax[a.type](ng(r.pointer)));
          t.add(o);
        }
      }),
      (e.prototype.createLabelEl = function (t, r, n, i) {
        if (r.label) {
          var a = (bn(t).labelEl = new Ht(ng(r.label)));
          (t.add(a), ag(a, i));
        }
      }),
      (e.prototype.updatePointerEl = function (t, r, n) {
        var i = bn(t).pointerEl;
        i &&
          r.pointer &&
          (i.setStyle(r.pointer.style), n(i, { shape: r.pointer.shape }));
      }),
      (e.prototype.updateLabelEl = function (t, r, n, i) {
        var a = bn(t).labelEl;
        a &&
          (a.setStyle(r.label.style),
          n(a, { x: r.label.x, y: r.label.y }),
          ag(a, i));
      }),
      (e.prototype._renderHandle = function (t) {
        if (!(this._dragging || !this.updateHandleTransform)) {
          var r = this._axisPointerModel,
            n = this._api.getZr(),
            i = this._handle,
            a = r.getModel("handle"),
            o = r.get("status");
          if (!a.get("show") || !o || o === "hide") {
            (i && n.remove(i), (this._handle = null));
            return;
          }
          var s;
          (this._handle ||
            ((s = !0),
            (i = this._handle =
              Uh(a.get("icon"), {
                cursor: "move",
                draggable: !0,
                onmousemove: function (u) {
                  c0(u.event);
                },
                onmousedown: Ou(this._onHandleDragMove, this, 0, 0),
                drift: Ou(this._onHandleDragMove, this),
                ondragend: Ou(this._onHandleDragEnd, this),
              })),
            n.add(i)),
            og(i, r, !1),
            i.setStyle(
              a.getItemStyle(null, [
                "color",
                "borderColor",
                "borderWidth",
                "opacity",
                "shadowColor",
                "shadowBlur",
                "shadowOffsetX",
                "shadowOffsetY",
              ]),
            ));
          var l = a.get("size");
          (W(l) || (l = [l, l]),
            (i.scaleX = l[0] / 2),
            (i.scaleY = l[1] / 2),
            t0(
              this,
              "_doDispatchAxisPointer",
              a.get("throttle") || 0,
              "fixRate",
            ),
            this._moveHandleToValue(t, s));
        }
      }),
      (e.prototype._moveHandleToValue = function (t, r) {
        ig(
          this._axisPointerModel,
          !r && this._moveAnimation,
          this._handle,
          Bu(
            this.getHandleTransform(t, this._axisModel, this._axisPointerModel),
          ),
        );
      }),
      (e.prototype._onHandleDragMove = function (t, r) {
        var n = this._handle;
        if (n) {
          this._dragging = !0;
          var i = this.updateHandleTransform(
            Bu(n),
            [t, r],
            this._axisModel,
            this._axisPointerModel,
          );
          ((this._payloadInfo = i),
            n.stopAnimation(),
            n.attr(Bu(i)),
            (bn(n).lastProp = null),
            this._doDispatchAxisPointer());
        }
      }),
      (e.prototype._doDispatchAxisPointer = function () {
        var t = this._handle;
        if (t) {
          var r = this._payloadInfo,
            n = this._axisModel;
          this._api.dispatchAction({
            type: "updateAxisPointer",
            x: r.cursorPoint[0],
            y: r.cursorPoint[1],
            tooltipOption: r.tooltipOption,
            axesInfo: [{ axisDim: n.axis.dim, axisIndex: n.componentIndex }],
          });
        }
      }),
      (e.prototype._onHandleDragEnd = function () {
        this._dragging = !1;
        var t = this._handle;
        if (t) {
          var r = this._axisPointerModel.get("value");
          (this._moveHandleToValue(r),
            this._api.dispatchAction({ type: "hideTip" }));
        }
      }),
      (e.prototype.clear = function (t) {
        ((this._lastValue = null), (this._lastStatus = null));
        var r = t.getZr(),
          n = this._group,
          i = this._handle;
        (r &&
          n &&
          ((this._lastGraphicKey = null),
          n && r.remove(n),
          i && r.remove(i),
          (this._group = null),
          (this._handle = null),
          (this._payloadInfo = null)),
          Nf(this, "_doDispatchAxisPointer"));
      }),
      (e.prototype.doClear = function () {}),
      (e.prototype.buildLabel = function (t, r, n) {
        return (
          (n = n || 0),
          { x: t[n], y: t[1 - n], width: r[n], height: r[1 - n] }
        );
      }),
      e
    );
  })();
function ig(e, t, r, n) {
  M_(bn(r).lastProp, n) ||
    ((bn(r).lastProp = n), t ? jt(r, n, e) : (r.stopAnimation(), r.attr(n)));
}
function M_(e, t) {
  if (X(e) && X(t)) {
    var r = !0;
    return (
      M(t, function (n, i) {
        r = r && M_(e[i], n);
      }),
      !!r
    );
  } else return e === t;
}
function ag(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Bu(e) {
  return { x: e.x || 0, y: e.y || 0, rotation: e.rotation || 0 };
}
function og(e, t, r) {
  var n = t.get("z"),
    i = t.get("zlevel");
  e &&
    e.traverse(function (a) {
      a.type !== "group" &&
        (n != null && (a.z = n), i != null && (a.zlevel = i), (a.silent = r));
    });
}
function G2(e) {
  var t = e.get("type"),
    r = e.getModel(t + "Style"),
    n;
  return (
    t === "line"
      ? ((n = r.getLineStyle()), (n.fill = null))
      : t === "shadow" && ((n = r.getAreaStyle()), (n.stroke = null)),
    n
  );
}
function H2(e, t, r, n, i) {
  var a = r.get("value"),
    o = A_(a, t.axis, t.ecModel, r.get("seriesDataIndices"), {
      precision: r.get(["label", "precision"]),
      formatter: r.get(["label", "formatter"]),
    }),
    s = r.getModel("label"),
    l = ol(s.get("padding") || 0),
    u = s.getFont(),
    f = Xg(o, u),
    h = i.position,
    v = f.width + l[1] + l[3],
    c = f.height + l[0] + l[2],
    d = i.align;
  (d === "right" && (h[0] -= v), d === "center" && (h[0] -= v / 2));
  var p = i.verticalAlign;
  (p === "bottom" && (h[1] -= c),
    p === "middle" && (h[1] -= c / 2),
    V2(h, v, c, n));
  var m = s.get("backgroundColor");
  ((!m || m === "auto") && (m = t.get(["axisLine", "lineStyle", "color"])),
    (e.label = {
      x: h[0],
      y: h[1],
      style: Hr(s, {
        text: o,
        font: u,
        fill: s.getTextColor(),
        padding: l,
        backgroundColor: m,
      }),
      z2: 10,
    }));
}
function V2(e, t, r, n) {
  var i = n.getWidth(),
    a = n.getHeight();
  ((e[0] = Math.min(e[0] + t, i) - t),
    (e[1] = Math.min(e[1] + r, a) - r),
    (e[0] = Math.max(e[0], 0)),
    (e[1] = Math.max(e[1], 0)));
}
function A_(e, t, r, n, i) {
  e = t.scale.parse(e);
  var a = t.scale.getLabel({ value: e }, { precision: i.precision }),
    o = i.formatter;
  if (o) {
    var s = {
      value: Ps(t, { value: e }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: [],
    };
    (M(n, function (l) {
      var u = r.getSeriesByIndex(l.seriesIndex),
        f = l.dataIndexInside,
        h = u && u.getDataParams(f);
      h && s.seriesData.push(h);
    }),
      U(o) ? (a = o.replace("{value}", a)) : Q(o) && (a = o(s)));
  }
  return a;
}
function L_(e, t, r) {
  var n = cr();
  return (
    Th(n, n, r.rotation),
    $u(n, n, r.position),
    Wh(
      [
        e.dataToCoord(t),
        (r.labelOffset || 0) + (r.labelDirection || 1) * (r.labelMargin || 0),
      ],
      n,
    )
  );
}
function W2(e, t, r, n, i, a) {
  var o = Br.innerTextLayout(r.rotation, 0, r.labelDirection);
  ((r.labelMargin = i.get(["label", "margin"])),
    H2(t, n, i, a, {
      position: L_(n.axis, e, r),
      align: o.textAlign,
      verticalAlign: o.textVerticalAlign,
    }));
}
function U2(e, t, r) {
  return ((r = r || 0), { x1: e[r], y1: e[1 - r], x2: t[r], y2: t[1 - r] });
}
function Y2(e, t, r) {
  return (
    (r = r || 0),
    { x: e[r], y: e[1 - r], width: t[r], height: t[1 - r] }
  );
}
var $2 = (function (e) {
  G(t, e);
  function t() {
    return (e !== null && e.apply(this, arguments)) || this;
  }
  return (
    (t.prototype.makeElOption = function (r, n, i, a, o) {
      var s = i.axis,
        l = s.grid,
        u = a.get("type"),
        f = sg(l, s).getOtherAxis(s).getGlobalExtent(),
        h = s.toGlobalCoord(s.dataToCoord(n, !0));
      if (u && u !== "none") {
        var v = G2(a),
          c = X2[u](s, h, f);
        ((c.style = v), (r.graphicKey = c.type), (r.pointer = c));
      }
      var d = Rs(l.getRect(), i);
      W2(n, r, d, i, a, o);
    }),
    (t.prototype.getHandleTransform = function (r, n, i) {
      var a = Rs(n.axis.grid.getRect(), n, { labelInside: !1 });
      a.labelMargin = i.get(["handle", "margin"]);
      var o = L_(n.axis, r, a);
      return {
        x: o[0],
        y: o[1],
        rotation: a.rotation + (a.labelDirection < 0 ? Math.PI : 0),
      };
    }),
    (t.prototype.updateHandleTransform = function (r, n, i, a) {
      var o = i.axis,
        s = o.grid,
        l = o.getGlobalExtent(!0),
        u = sg(s, o).getOtherAxis(o).getGlobalExtent(),
        f = o.dim === "x" ? 0 : 1,
        h = [r.x, r.y];
      ((h[f] += n[f]),
        (h[f] = Math.min(l[1], h[f])),
        (h[f] = Math.max(l[0], h[f])));
      var v = (u[1] + u[0]) / 2,
        c = [v, v];
      c[f] = h[f];
      var d = [{ verticalAlign: "middle" }, { align: "center" }];
      return {
        x: h[0],
        y: h[1],
        rotation: r.rotation,
        cursorPoint: c,
        tooltipOption: d[f],
      };
    }),
    t
  );
})(z2);
function sg(e, t) {
  var r = {};
  return ((r[t.dim + "AxisIndex"] = t.index), e.getCartesian(r));
}
var X2 = {
  line: function (e, t, r) {
    var n = U2([t, r[0]], [t, r[1]], lg(e));
    return { type: "Line", subPixelOptimize: !0, shape: n };
  },
  shadow: function (e, t, r) {
    var n = Math.max(1, e.getBandWidth()),
      i = r[1] - r[0];
    return { type: "Rect", shape: Y2([t - n / 2, r[0]], [n, i], lg(e)) };
  },
};
function lg(e) {
  return e.dim === "x" ? 0 : 1;
}
var q2 = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = t.type), r);
    }
    return (
      (t.type = "axisPointer"),
      (t.defaultOption = {
        show: "auto",
        z: 50,
        type: "line",
        snap: !1,
        triggerTooltip: !0,
        triggerEmphasis: !0,
        value: null,
        status: null,
        link: [],
        animation: null,
        animationDurationUpdate: 200,
        lineStyle: { color: Y.color.border, width: 1, type: "dashed" },
        shadowStyle: { color: Y.color.shadowTint },
        label: {
          show: !0,
          formatter: null,
          precision: "auto",
          margin: 3,
          color: Y.color.neutral00,
          padding: [5, 7, 5, 7],
          backgroundColor: Y.color.accent60,
          borderColor: null,
          borderWidth: 0,
          borderRadius: 3,
        },
        handle: {
          show: !1,
          icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
          size: 45,
          margin: 50,
          color: Y.color.accent40,
          throttle: 40,
        },
      }),
      t
    );
  })(ht),
  hr = _t(),
  Z2 = M;
function I_(e, t, r) {
  if (!tt.node) {
    var n = t.getZr();
    (hr(n).records || (hr(n).records = {}), K2(n, t));
    var i = hr(n).records[e] || (hr(n).records[e] = {});
    i.handler = r;
  }
}
function K2(e, t) {
  if (hr(e).initialized) return;
  ((hr(e).initialized = !0),
    r("click", Mt(ug, "click")),
    r("mousemove", Mt(ug, "mousemove")),
    r("globalout", Q2));
  function r(n, i) {
    e.on(n, function (a) {
      var o = J2(t);
      (Z2(hr(e).records, function (s) {
        s && i(s, a, o.dispatchAction);
      }),
        j2(o.pendings, t));
    });
  }
}
function j2(e, t) {
  var r = e.showTip.length,
    n = e.hideTip.length,
    i;
  (r ? (i = e.showTip[r - 1]) : n && (i = e.hideTip[n - 1]),
    i && ((i.dispatchAction = null), t.dispatchAction(i)));
}
function Q2(e, t, r) {
  e.handler("leave", null, r);
}
function ug(e, t, r, n) {
  t.handler(e, r, n);
}
function J2(e) {
  var t = { showTip: [], hideTip: [] },
    r = function (n) {
      var i = t[n.type];
      i ? i.push(n) : ((n.dispatchAction = r), e.dispatchAction(n));
    };
  return { dispatchAction: r, pendings: t };
}
function oh(e, t) {
  if (!tt.node) {
    var r = t.getZr(),
      n = (hr(r).records || {})[e];
    n && (hr(r).records[e] = null);
  }
}
var tI = (function (e) {
  G(t, e);
  function t() {
    var r = (e !== null && e.apply(this, arguments)) || this;
    return ((r.type = t.type), r);
  }
  return (
    (t.prototype.render = function (r, n, i) {
      var a = n.getComponent("tooltip"),
        o =
          r.get("triggerOn") || (a && a.get("triggerOn")) || "mousemove|click";
      I_("axisPointer", i, function (s, l, u) {
        o !== "none" &&
          (s === "leave" || o.indexOf(s) >= 0) &&
          u({
            type: "updateAxisPointer",
            currTrigger: s,
            x: l && l.offsetX,
            y: l && l.offsetY,
          });
      });
    }),
    (t.prototype.remove = function (r, n) {
      oh("axisPointer", n);
    }),
    (t.prototype.dispose = function (r, n) {
      oh("axisPointer", n);
    }),
    (t.type = "axisPointer"),
    t
  );
})(ke);
function P_(e, t) {
  var r = [],
    n = e.seriesIndex,
    i;
  if (n == null || !(i = t.getSeriesByIndex(n))) return { point: [] };
  var a = i.getData(),
    o = Rn(a, e);
  if (o == null || o < 0 || W(o)) return { point: [] };
  var s = a.getItemGraphicEl(o),
    l = i.coordinateSystem;
  if (i.getTooltipPosition) r = i.getTooltipPosition(o) || [];
  else if (l && l.dataToPoint)
    if (e.isStacked) {
      var u = l.getBaseAxis(),
        f = l.getOtherAxis(u),
        h = f.dim,
        v = u.dim,
        c = h === "x" || h === "radius" ? 1 : 0,
        d = a.mapDimension(v),
        p = [];
      ((p[c] = a.get(d, o)),
        (p[1 - c] = a.get(a.getCalculationInfo("stackResultDimension"), o)),
        (r = l.dataToPoint(p) || []));
    } else
      r =
        l.dataToPoint(
          a.getValues(
            q(l.dimensions, function (g) {
              return a.mapDimension(g);
            }),
            o,
          ),
        ) || [];
  else if (s) {
    var m = s.getBoundingRect().clone();
    (m.applyTransform(s.transform),
      (r = [m.x + m.width / 2, m.y + m.height / 2]));
  }
  return { point: r, el: s };
}
var fg = _t();
function eI(e, t, r) {
  var n = e.currTrigger,
    i = [e.x, e.y],
    a = e,
    o = e.dispatchAction || ct(r.dispatchAction, r),
    s = t.getComponent("axisPointer").coordSysAxesInfo;
  if (s) {
    Ko(i) &&
      (i = P_({ seriesIndex: a.seriesIndex, dataIndex: a.dataIndex }, t).point);
    var l = Ko(i),
      u = a.axesInfo,
      f = s.axesInfo,
      h = n === "leave" || Ko(i),
      v = {},
      c = {},
      d = { list: [], map: {} },
      p = { showPointer: Mt(nI, c), showTooltip: Mt(iI, d) };
    M(s.coordSysMap, function (g, y) {
      var _ = l || g.containPoint(i);
      M(s.coordSysAxesInfo[y], function (b, w) {
        var S = b.axis,
          x = lI(u, b);
        if (!h && _ && (!u || x)) {
          var T = x && x.value;
          (T == null && !l && (T = S.pointToData(i)),
            T != null && hg(b, T, p, !1, v));
        }
      });
    });
    var m = {};
    return (
      M(f, function (g, y) {
        var _ = g.linkGroup;
        _ &&
          !c[y] &&
          M(_.axesInfo, function (b, w) {
            var S = c[w];
            if (b !== g && S) {
              var x = S.value;
              (_.mapper && (x = g.axis.scale.parse(_.mapper(x, cg(b), cg(g)))),
                (m[g.key] = x));
            }
          });
      }),
      M(m, function (g, y) {
        hg(f[y], g, p, !0, v);
      }),
      aI(c, f, v),
      oI(d, i, e, o),
      sI(f, o, r),
      v
    );
  }
}
function hg(e, t, r, n, i) {
  var a = e.axis;
  if (!(a.scale.isBlank() || !a.containData(t))) {
    if (!e.involveSeries) {
      r.showPointer(e, t);
      return;
    }
    var o = rI(t, e),
      s = o.payloadBatch,
      l = o.snapToValue;
    (s[0] && i.seriesIndex == null && B(i, s[0]),
      !n && e.snap && a.containData(l) && l != null && (t = l),
      r.showPointer(e, t, s),
      r.showTooltip(e, o, l));
  }
}
function rI(e, t) {
  var r = t.axis,
    n = r.dim,
    i = e,
    a = [],
    o = Number.MAX_VALUE,
    s = -1;
  return (
    M(t.seriesModels, function (l, u) {
      var f = l.getData().mapDimensionsAll(n),
        h,
        v;
      if (l.getAxisTooltipData) {
        var c = l.getAxisTooltipData(f, e, r);
        ((v = c.dataIndices), (h = c.nestestValue));
      } else {
        if (
          ((v = l.indicesOfNearest(
            n,
            f[0],
            e,
            r.type === "category" ? 0.5 : null,
          )),
          !v.length)
        )
          return;
        h = l.getData().get(f[0], v[0]);
      }
      if (!(h == null || !isFinite(h))) {
        var d = e - h,
          p = Math.abs(d);
        p <= o &&
          ((p < o || (d >= 0 && s < 0)) &&
            ((o = p), (s = d), (i = h), (a.length = 0)),
          M(v, function (m) {
            a.push({
              seriesIndex: l.seriesIndex,
              dataIndexInside: m,
              dataIndex: l.getData().getRawIndex(m),
            });
          }));
      }
    }),
    { payloadBatch: a, snapToValue: i }
  );
}
function nI(e, t, r, n) {
  e[t.key] = { value: r, payloadBatch: n };
}
function iI(e, t, r, n) {
  var i = r.payloadBatch,
    a = t.axis,
    o = a.model,
    s = t.axisPointerModel;
  if (!(!t.triggerTooltip || !i.length)) {
    var l = t.coordSys.model,
      u = Ia(l),
      f = e.map[u];
    (f ||
      ((f = e.map[u] =
        {
          coordSysId: l.id,
          coordSysIndex: l.componentIndex,
          coordSysType: l.type,
          coordSysMainType: l.mainType,
          dataByAxis: [],
        }),
      e.list.push(f)),
      f.dataByAxis.push({
        axisDim: a.dim,
        axisIndex: o.componentIndex,
        axisType: o.type,
        axisId: o.id,
        value: n,
        valueLabelOpt: {
          precision: s.get(["label", "precision"]),
          formatter: s.get(["label", "formatter"]),
        },
        seriesDataIndices: i.slice(),
      }));
  }
}
function aI(e, t, r) {
  var n = (r.axesInfo = []);
  M(t, function (i, a) {
    var o = i.axisPointerModel.option,
      s = e[a];
    (s
      ? (!i.useHandle && (o.status = "show"),
        (o.value = s.value),
        (o.seriesDataIndices = (s.payloadBatch || []).slice()))
      : !i.useHandle && (o.status = "hide"),
      o.status === "show" &&
        n.push({
          axisDim: i.axis.dim,
          axisIndex: i.axis.model.componentIndex,
          value: o.value,
        }));
  });
}
function oI(e, t, r, n) {
  if (Ko(t) || !e.list.length) {
    n({ type: "hideTip" });
    return;
  }
  var i = ((e.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  n({
    type: "showTip",
    escapeConnect: !0,
    x: t[0],
    y: t[1],
    tooltipOption: r.tooltipOption,
    position: r.position,
    dataIndexInside: i.dataIndexInside,
    dataIndex: i.dataIndex,
    seriesIndex: i.seriesIndex,
    dataByCoordSys: e.list,
  });
}
function sI(e, t, r) {
  var n = r.getZr(),
    i = "axisPointerLastHighlights",
    a = fg(n)[i] || {},
    o = (fg(n)[i] = {});
  M(e, function (u, f) {
    var h = u.axisPointerModel.option;
    h.status === "show" &&
      u.triggerEmphasis &&
      M(h.seriesDataIndices, function (v) {
        var c = v.seriesIndex + " | " + v.dataIndex;
        o[c] = v;
      });
  });
  var s = [],
    l = [];
  (M(a, function (u, f) {
    !o[f] && l.push(u);
  }),
    M(o, function (u, f) {
      !a[f] && s.push(u);
    }),
    l.length &&
      r.dispatchAction({
        type: "downplay",
        escapeConnect: !0,
        notBlur: !0,
        batch: l,
      }),
    s.length &&
      r.dispatchAction({
        type: "highlight",
        escapeConnect: !0,
        notBlur: !0,
        batch: s,
      }));
}
function lI(e, t) {
  for (var r = 0; r < (e || []).length; r++) {
    var n = e[r];
    if (t.axis.dim === n.axisDim && t.axis.model.componentIndex === n.axisIndex)
      return n;
  }
}
function cg(e) {
  var t = e.axis.model,
    r = {},
    n = (r.axisDim = e.axis.dim);
  return (
    (r.axisIndex = r[n + "AxisIndex"] = t.componentIndex),
    (r.axisName = r[n + "AxisName"] = t.name),
    (r.axisId = r[n + "AxisId"] = t.id),
    r
  );
}
function Ko(e) {
  return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
function k_(e) {
  (T_.registerAxisPointerClass("CartesianAxisPointer", $2),
    e.registerComponentModel(q2),
    e.registerComponentView(tI),
    e.registerPreprocessor(function (t) {
      if (t) {
        (!t.axisPointer || t.axisPointer.length === 0) && (t.axisPointer = {});
        var r = t.axisPointer.link;
        r && !W(r) && (t.axisPointer.link = [r]);
      }
    }),
    e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, function (t, r) {
      t.getComponent("axisPointer").coordSysAxesInfo = C2(t, r);
    }),
    e.registerAction(
      {
        type: "updateAxisPointer",
        event: "updateAxisPointer",
        update: ":updateAxisPointer",
      },
      eI,
    ));
}
function fl(e) {
  (Re(F2), Re(k_));
}
function uI(e, t) {
  var r = ol(t.get("padding")),
    n = t.getItemStyle(["color", "opacity"]);
  n.fill = t.get("backgroundColor");
  var i = new Tt({
    shape: {
      x: e.x - r[3],
      y: e.y - r[0],
      width: e.width + r[1] + r[3],
      height: e.height + r[0] + r[2],
      r: t.get("borderRadius"),
    },
    style: n,
    silent: !0,
    z2: -1,
  });
  return i;
}
var fI = (function (e) {
  G(t, e);
  function t() {
    var r = (e !== null && e.apply(this, arguments)) || this;
    return ((r.type = t.type), r);
  }
  return (
    (t.type = "tooltip"),
    (t.dependencies = ["axisPointer"]),
    (t.defaultOption = {
      z: 60,
      show: !0,
      showContent: !0,
      trigger: "item",
      triggerOn: "mousemove|click",
      alwaysShowContent: !1,
      renderMode: "auto",
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      transitionDuration: 0.4,
      displayTransition: !0,
      enterable: !1,
      backgroundColor: Y.color.neutral00,
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      borderRadius: 4,
      borderWidth: 1,
      defaultBorderColor: Y.color.border,
      padding: null,
      extraCssText: "",
      axisPointer: {
        type: "line",
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: Y.color.borderShade,
          width: 1,
          type: "dashed",
          textStyle: {},
        },
      },
      textStyle: { color: Y.color.tertiary, fontSize: 14 },
    }),
    t
  );
})(ht);
function R_(e) {
  var t = e.get("confine");
  return t != null ? !!t : e.get("renderMode") === "richText";
}
function E_(e) {
  if (tt.domSupported) {
    for (
      var t = document.documentElement.style, r = 0, n = e.length;
      r < n;
      r++
    )
      if (e[r] in t) return e[r];
  }
}
var O_ = E_([
    "transform",
    "webkitTransform",
    "OTransform",
    "MozTransform",
    "msTransform",
  ]),
  hI = E_([
    "webkitTransition",
    "transition",
    "OTransition",
    "MozTransition",
    "msTransition",
  ]);
function B_(e, t) {
  if (!e) return t;
  t = Ly(t, !0);
  var r = e.indexOf(t);
  return ((e = r === -1 ? t : "-" + e.slice(0, r) + "-" + t), e.toLowerCase());
}
function cI(e, t) {
  var r =
    e.currentStyle ||
    (document.defaultView && document.defaultView.getComputedStyle(e));
  return r ? r[t] : null;
}
var vI = B_(hI, "transition"),
  Pc = B_(O_, "transform"),
  dI =
    "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" +
    (tt.transform3dSupported ? "will-change:transform;" : "");
function pI(e) {
  return (
    (e =
      e === "left"
        ? "right"
        : e === "right"
          ? "left"
          : e === "top"
            ? "bottom"
            : "top"),
    e
  );
}
function gI(e, t, r) {
  if (!U(r) || r === "inside") return "";
  var n = e.get("backgroundColor"),
    i = e.get("borderWidth");
  t = En(t);
  var a = pI(r),
    o = Math.max(Math.round(i) * 1.5, 6),
    s = "",
    l = Pc + ":",
    u;
  st(["left", "right"], a) > -1
    ? ((s += "top:50%"),
      (l +=
        "translateY(-50%) rotate(" + (u = a === "left" ? -225 : -45) + "deg)"))
    : ((s += "left:50%"),
      (l +=
        "translateX(-50%) rotate(" + (u = a === "top" ? 225 : 45) + "deg)"));
  var f = (u * Math.PI) / 180,
    h = o + i,
    v = h * Math.abs(Math.cos(f)) + h * Math.abs(Math.sin(f)),
    c =
      Math.round(
        ((v - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (v - h) / 2) * 100,
      ) / 100;
  s += ";" + a + ":-" + c + "px";
  var d = t + " solid " + i + "px;",
    p = [
      "position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;",
      s + ";" + l + ";",
      "border-bottom:" + d,
      "border-right:" + d,
      "background-color:" + n + ";",
    ];
  return '<div style="' + p.join("") + '"></div>';
}
function mI(e, t, r) {
  var n = "cubic-bezier(0.23,1,0.32,1)",
    i = "",
    a = "";
  return (
    r &&
      ((i = " " + e / 2 + "s " + n), (a = "opacity" + i + ",visibility" + i)),
    t ||
      ((i = " " + e + "s " + n),
      (a +=
        (a.length ? "," : "") +
        (tt.transformSupported ? "" + Pc + i : ",left" + i + ",top" + i))),
    vI + ":" + a
  );
}
function vg(e, t, r) {
  var n = e.toFixed(0) + "px",
    i = t.toFixed(0) + "px";
  if (!tt.transformSupported)
    return r
      ? "top:" + i + ";left:" + n + ";"
      : [
          ["top", i],
          ["left", n],
        ];
  var a = tt.transform3dSupported,
    o =
      "translate" + (a ? "3d" : "") + "(" + n + "," + i + (a ? ",0" : "") + ")";
  return r
    ? "top:0;left:0;" + Pc + ":" + o + ";"
    : [
        ["top", 0],
        ["left", 0],
        [O_, o],
      ];
}
function yI(e) {
  var t = [],
    r = e.get("fontSize"),
    n = e.getTextColor();
  (n && t.push("color:" + n), t.push("font:" + e.getFont()));
  var i = K(e.get("lineHeight"), Math.round((r * 3) / 2));
  r && t.push("line-height:" + i + "px");
  var a = e.get("textShadowColor"),
    o = e.get("textShadowBlur") || 0,
    s = e.get("textShadowOffsetX") || 0,
    l = e.get("textShadowOffsetY") || 0;
  return (
    a && o && t.push("text-shadow:" + s + "px " + l + "px " + o + "px " + a),
    M(["decoration", "align"], function (u) {
      var f = e.get(u);
      f && t.push("text-" + u + ":" + f);
    }),
    t.join(";")
  );
}
function _I(e, t, r, n) {
  var i = [],
    a = e.get("transitionDuration"),
    o = e.get("backgroundColor"),
    s = e.get("shadowBlur"),
    l = e.get("shadowColor"),
    u = e.get("shadowOffsetX"),
    f = e.get("shadowOffsetY"),
    h = e.getModel("textStyle"),
    v = Ny(e, "html"),
    c = u + "px " + f + "px " + s + "px " + l;
  return (
    i.push("box-shadow:" + c),
    t && a > 0 && i.push(mI(a, r, n)),
    o && i.push("background-color:" + o),
    M(["width", "color", "radius"], function (d) {
      var p = "border-" + d,
        m = Ly(p),
        g = e.get(m);
      g != null && i.push(p + ":" + g + (d === "color" ? "" : "px"));
    }),
    i.push(yI(h)),
    v != null && i.push("padding:" + ol(v).join("px ") + "px"),
    i.join(";") + ";"
  );
}
function dg(e, t, r, n, i) {
  var a = t && t.painter;
  if (r) {
    var o = a && a.getViewportRoot();
    o && hT(e, o, r, n, i);
  } else {
    ((e[0] = n), (e[1] = i));
    var s = a && a.getViewportRootOffset();
    s && ((e[0] += s.offsetLeft), (e[1] += s.offsetTop));
  }
  ((e[2] = e[0] / t.getWidth()), (e[3] = e[1] / t.getHeight()));
}
var bI = (function () {
    function e(t, r) {
      if (
        ((this._show = !1),
        (this._styleCoord = [0, 0, 0, 0]),
        (this._enterable = !0),
        (this._alwaysShowContent = !1),
        (this._firstShow = !0),
        (this._longHide = !0),
        tt.wxa)
      )
        return null;
      var n = document.createElement("div");
      ((n.domBelongToZr = !0), (this.el = n));
      var i = (this._zr = t.getZr()),
        a = r.appendTo,
        o =
          a &&
          (U(a)
            ? document.querySelector(a)
            : va(a)
              ? a
              : Q(a) && a(t.getDom()));
      (dg(this._styleCoord, i, o, t.getWidth() / 2, t.getHeight() / 2),
        (o || t.getDom()).appendChild(n),
        (this._api = t),
        (this._container = o));
      var s = this;
      ((n.onmouseenter = function () {
        (s._enterable && (clearTimeout(s._hideTimeout), (s._show = !0)),
          (s._inContent = !0));
      }),
        (n.onmousemove = function (l) {
          if (((l = l || window.event), !s._enterable)) {
            var u = i.handler,
              f = i.painter.getViewportRoot();
            (ve(f, l, !0), u.dispatch("mousemove", l));
          }
        }),
        (n.onmouseleave = function () {
          ((s._inContent = !1),
            s._enterable && s._show && s.hideLater(s._hideDelay));
        }));
    }
    return (
      (e.prototype.update = function (t) {
        if (!this._container) {
          var r = this._api.getDom(),
            n = cI(r, "position"),
            i = r.style;
          i.position !== "absolute" &&
            n !== "absolute" &&
            (i.position = "relative");
        }
        var a = t.get("alwaysShowContent");
        (a && this._moveIfResized(),
          (this._alwaysShowContent = a),
          (this._enableDisplayTransition =
            t.get("displayTransition") && t.get("transitionDuration") > 0),
          (this.el.className = t.get("className") || ""));
      }),
      (e.prototype.show = function (t, r) {
        (clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout));
        var n = this.el,
          i = n.style,
          a = this._styleCoord;
        (n.innerHTML
          ? (i.cssText =
              dI +
              _I(
                t,
                !this._firstShow,
                this._longHide,
                this._enableDisplayTransition,
              ) +
              vg(a[0], a[1], !0) +
              ("border-color:" + En(r) + ";") +
              (t.get("extraCssText") || "") +
              (";pointer-events:" + (this._enterable ? "auto" : "none")))
          : (i.display = "none"),
          (this._show = !0),
          (this._firstShow = !1),
          (this._longHide = !1));
      }),
      (e.prototype.setContent = function (t, r, n, i, a) {
        var o = this.el;
        if (t == null) {
          o.innerHTML = "";
          return;
        }
        var s = "";
        if (
          (U(a) && n.get("trigger") === "item" && !R_(n) && (s = gI(n, i, a)),
          U(t))
        )
          o.innerHTML = t + s;
        else if (t) {
          ((o.innerHTML = ""), W(t) || (t = [t]));
          for (var l = 0; l < t.length; l++)
            va(t[l]) && t[l].parentNode !== o && o.appendChild(t[l]);
          if (s && o.childNodes.length) {
            var u = document.createElement("div");
            ((u.innerHTML = s), o.appendChild(u));
          }
        }
      }),
      (e.prototype.setEnterable = function (t) {
        this._enterable = t;
      }),
      (e.prototype.getSize = function () {
        var t = this.el;
        return t ? [t.offsetWidth, t.offsetHeight] : [0, 0];
      }),
      (e.prototype.moveTo = function (t, r) {
        if (this.el) {
          var n = this._styleCoord;
          if (
            (dg(n, this._zr, this._container, t, r),
            n[0] != null && n[1] != null)
          ) {
            var i = this.el.style,
              a = vg(n[0], n[1]);
            M(a, function (o) {
              i[o[0]] = o[1];
            });
          }
        }
      }),
      (e.prototype._moveIfResized = function () {
        var t = this._styleCoord[2],
          r = this._styleCoord[3];
        this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
      }),
      (e.prototype.hide = function () {
        var t = this,
          r = this.el.style;
        (this._enableDisplayTransition
          ? ((r.visibility = "hidden"), (r.opacity = "0"))
          : (r.display = "none"),
          tt.transform3dSupported && (r.willChange = ""),
          (this._show = !1),
          (this._longHideTimeout = setTimeout(function () {
            return (t._longHide = !0);
          }, 500)));
      }),
      (e.prototype.hideLater = function (t) {
        this._show &&
          !(this._inContent && this._enterable) &&
          !this._alwaysShowContent &&
          (t
            ? ((this._hideDelay = t),
              (this._show = !1),
              (this._hideTimeout = setTimeout(ct(this.hide, this), t)))
            : this.hide());
      }),
      (e.prototype.isShow = function () {
        return this._show;
      }),
      (e.prototype.dispose = function () {
        (clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout));
        var t = this._zr;
        cT(t && t.painter && t.painter.getViewportRoot(), this._container);
        var r = this.el;
        if (r) {
          r.onmouseenter = r.onmousemove = r.onmouseleave = null;
          var n = r.parentNode;
          n && n.removeChild(r);
        }
        this.el = this._container = null;
      }),
      e
    );
  })(),
  SI = (function () {
    function e(t) {
      ((this._show = !1),
        (this._styleCoord = [0, 0, 0, 0]),
        (this._alwaysShowContent = !1),
        (this._enterable = !0),
        (this._zr = t.getZr()),
        gg(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2));
    }
    return (
      (e.prototype.update = function (t) {
        var r = t.get("alwaysShowContent");
        (r && this._moveIfResized(), (this._alwaysShowContent = r));
      }),
      (e.prototype.show = function () {
        (this._hideTimeout && clearTimeout(this._hideTimeout),
          this.el.show(),
          (this._show = !0));
      }),
      (e.prototype.setContent = function (t, r, n, i, a) {
        var o = this;
        (X(t) && ee(""), this.el && this._zr.remove(this.el));
        var s = n.getModel("textStyle");
        ((this.el = new Ht({
          style: {
            rich: r.richTextStyles,
            text: t,
            lineHeight: 22,
            borderWidth: 1,
            borderColor: i,
            textShadowColor: s.get("textShadowColor"),
            fill: n.get(["textStyle", "color"]),
            padding: Ny(n, "richText"),
            verticalAlign: "top",
            align: "left",
          },
          z: n.get("z"),
        })),
          M(
            [
              "backgroundColor",
              "borderRadius",
              "shadowColor",
              "shadowBlur",
              "shadowOffsetX",
              "shadowOffsetY",
            ],
            function (u) {
              o.el.style[u] = n.get(u);
            },
          ),
          M(
            ["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"],
            function (u) {
              o.el.style[u] = s.get(u) || 0;
            },
          ),
          this._zr.add(this.el));
        var l = this;
        (this.el.on("mouseover", function () {
          (l._enterable && (clearTimeout(l._hideTimeout), (l._show = !0)),
            (l._inContent = !0));
        }),
          this.el.on("mouseout", function () {
            (l._enterable && l._show && l.hideLater(l._hideDelay),
              (l._inContent = !1));
          }));
      }),
      (e.prototype.setEnterable = function (t) {
        this._enterable = t;
      }),
      (e.prototype.getSize = function () {
        var t = this.el,
          r = this.el.getBoundingRect(),
          n = pg(t.style);
        return [r.width + n.left + n.right, r.height + n.top + n.bottom];
      }),
      (e.prototype.moveTo = function (t, r) {
        var n = this.el;
        if (n) {
          var i = this._styleCoord;
          (gg(i, this._zr, t, r), (t = i[0]), (r = i[1]));
          var a = n.style,
            o = Mr(a.borderWidth || 0),
            s = pg(a);
          ((n.x = t + o + s.left), (n.y = r + o + s.top), n.markRedraw());
        }
      }),
      (e.prototype._moveIfResized = function () {
        var t = this._styleCoord[2],
          r = this._styleCoord[3];
        this.moveTo(t * this._zr.getWidth(), r * this._zr.getHeight());
      }),
      (e.prototype.hide = function () {
        (this.el && this.el.hide(), (this._show = !1));
      }),
      (e.prototype.hideLater = function (t) {
        this._show &&
          !(this._inContent && this._enterable) &&
          !this._alwaysShowContent &&
          (t
            ? ((this._hideDelay = t),
              (this._show = !1),
              (this._hideTimeout = setTimeout(ct(this.hide, this), t)))
            : this.hide());
      }),
      (e.prototype.isShow = function () {
        return this._show;
      }),
      (e.prototype.dispose = function () {
        this._zr.remove(this.el);
      }),
      e
    );
  })();
function Mr(e) {
  return Math.max(0, e);
}
function pg(e) {
  var t = Mr(e.shadowBlur || 0),
    r = Mr(e.shadowOffsetX || 0),
    n = Mr(e.shadowOffsetY || 0);
  return {
    left: Mr(t - r),
    right: Mr(t + r),
    top: Mr(t - n),
    bottom: Mr(t + n),
  };
}
function gg(e, t, r, n) {
  ((e[0] = r),
    (e[1] = n),
    (e[2] = e[0] / t.getWidth()),
    (e[3] = e[1] / t.getHeight()));
}
var wI = new Tt({ shape: { x: -1, y: -1, width: 2, height: 2 } }),
  xI = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = t.type), r);
    }
    return (
      (t.prototype.init = function (r, n) {
        if (!(tt.node || !n.getDom())) {
          var i = r.getComponent("tooltip"),
            a = (this._renderMode = US(i.get("renderMode")));
          this._tooltipContent =
            a === "richText"
              ? new SI(n)
              : new bI(n, {
                  appendTo: i.get("appendToBody", !0)
                    ? "body"
                    : i.get("appendTo", !0),
                });
        }
      }),
      (t.prototype.render = function (r, n, i) {
        if (!(tt.node || !i.getDom())) {
          (this.group.removeAll(),
            (this._tooltipModel = r),
            (this._ecModel = n),
            (this._api = i));
          var a = this._tooltipContent;
          (a.update(r),
            a.setEnterable(r.get("enterable")),
            this._initGlobalListener(),
            this._keepShow(),
            this._renderMode !== "richText" && r.get("transitionDuration")
              ? t0(this, "_updatePosition", 50, "fixRate")
              : Nf(this, "_updatePosition"));
        }
      }),
      (t.prototype._initGlobalListener = function () {
        var r = this._tooltipModel,
          n = r.get("triggerOn");
        I_(
          "itemTooltip",
          this._api,
          ct(function (i, a, o) {
            n !== "none" &&
              (n.indexOf(i) >= 0
                ? this._tryShow(a, o)
                : i === "leave" && this._hide(o));
          }, this),
        );
      }),
      (t.prototype._keepShow = function () {
        var r = this._tooltipModel,
          n = this._ecModel,
          i = this._api,
          a = r.get("triggerOn");
        if (
          this._lastX != null &&
          this._lastY != null &&
          a !== "none" &&
          a !== "click"
        ) {
          var o = this;
          (clearTimeout(this._refreshUpdateTimeout),
            (this._refreshUpdateTimeout = setTimeout(function () {
              !i.isDisposed() &&
                o.manuallyShowTip(r, n, i, {
                  x: o._lastX,
                  y: o._lastY,
                  dataByCoordSys: o._lastDataByCoordSys,
                });
            })));
        }
      }),
      (t.prototype.manuallyShowTip = function (r, n, i, a) {
        if (!(a.from === this.uid || tt.node || !i.getDom())) {
          var o = mg(a, i);
          this._ticket = "";
          var s = a.dataByCoordSys,
            l = MI(a, n, i);
          if (l) {
            var u = l.el.getBoundingRect().clone();
            (u.applyTransform(l.el.transform),
              this._tryShow(
                {
                  offsetX: u.x + u.width / 2,
                  offsetY: u.y + u.height / 2,
                  target: l.el,
                  position: a.position,
                  positionDefault: "bottom",
                },
                o,
              ));
          } else if (a.tooltip && a.x != null && a.y != null) {
            var f = wI;
            ((f.x = a.x),
              (f.y = a.y),
              f.update(),
              (ot(f).tooltipConfig = { name: null, option: a.tooltip }),
              this._tryShow({ offsetX: a.x, offsetY: a.y, target: f }, o));
          } else if (s)
            this._tryShow(
              {
                offsetX: a.x,
                offsetY: a.y,
                position: a.position,
                dataByCoordSys: s,
                tooltipOption: a.tooltipOption,
              },
              o,
            );
          else if (a.seriesIndex != null) {
            if (this._manuallyAxisShowTip(r, n, i, a)) return;
            var h = P_(a, n),
              v = h.point[0],
              c = h.point[1];
            v != null &&
              c != null &&
              this._tryShow(
                {
                  offsetX: v,
                  offsetY: c,
                  target: h.el,
                  position: a.position,
                  positionDefault: "bottom",
                },
                o,
              );
          } else
            a.x != null &&
              a.y != null &&
              (i.dispatchAction({ type: "updateAxisPointer", x: a.x, y: a.y }),
              this._tryShow(
                {
                  offsetX: a.x,
                  offsetY: a.y,
                  position: a.position,
                  target: i.getZr().findHover(a.x, a.y).target,
                },
                o,
              ));
        }
      }),
      (t.prototype.manuallyHideTip = function (r, n, i, a) {
        var o = this._tooltipContent;
        (this._tooltipModel && o.hideLater(this._tooltipModel.get("hideDelay")),
          (this._lastX = this._lastY = this._lastDataByCoordSys = null),
          a.from !== this.uid && this._hide(mg(a, i)));
      }),
      (t.prototype._manuallyAxisShowTip = function (r, n, i, a) {
        var o = a.seriesIndex,
          s = a.dataIndex,
          l = n.getComponent("axisPointer").coordSysAxesInfo;
        if (!(o == null || s == null || l == null)) {
          var u = n.getSeriesByIndex(o);
          if (u) {
            var f = u.getData(),
              h = Gi(
                [f.getItemModel(s), u, (u.coordinateSystem || {}).model],
                this._tooltipModel,
              );
            if (h.get("trigger") === "axis")
              return (
                i.dispatchAction({
                  type: "updateAxisPointer",
                  seriesIndex: o,
                  dataIndex: s,
                  position: a.position,
                }),
                !0
              );
          }
        }
      }),
      (t.prototype._tryShow = function (r, n) {
        var i = r.target,
          a = this._tooltipModel;
        if (a) {
          ((this._lastX = r.offsetX), (this._lastY = r.offsetY));
          var o = r.dataByCoordSys;
          if (o && o.length) this._showAxisTooltip(o, r);
          else if (i) {
            var s = ot(i);
            if (s.ssrType === "legend") return;
            this._lastDataByCoordSys = null;
            var l, u;
            (ji(
              i,
              function (f) {
                if (f.tooltipDisabled) return ((l = u = null), !0);
                l ||
                  u ||
                  (ot(f).dataIndex != null
                    ? (l = f)
                    : ot(f).tooltipConfig != null && (u = f));
              },
              !0,
            ),
              l
                ? this._showSeriesItemTooltip(r, l, n)
                : u
                  ? this._showComponentItemTooltip(r, u, n)
                  : this._hide(n));
          } else ((this._lastDataByCoordSys = null), this._hide(n));
        }
      }),
      (t.prototype._showOrMove = function (r, n) {
        var i = r.get("showDelay");
        ((n = ct(n, this)),
          clearTimeout(this._showTimout),
          i > 0 ? (this._showTimout = setTimeout(n, i)) : n());
      }),
      (t.prototype._showAxisTooltip = function (r, n) {
        var i = this._ecModel,
          a = this._tooltipModel,
          o = [n.offsetX, n.offsetY],
          s = Gi([n.tooltipOption], a),
          l = this._renderMode,
          u = [],
          f = xa("section", { blocks: [], noHeader: !0 }),
          h = [],
          v = new iu();
        (M(r, function (y) {
          M(y.dataByAxis, function (_) {
            var b = i.getComponent(_.axisDim + "Axis", _.axisIndex),
              w = _.value;
            if (!(!b || w == null)) {
              var S = A_(w, b.axis, i, _.seriesDataIndices, _.valueLabelOpt),
                x = xa("section", {
                  header: S,
                  noHeader: !Ye(S),
                  sortBlocks: !0,
                  blocks: [],
                });
              (f.blocks.push(x),
                M(_.seriesDataIndices, function (T) {
                  var D = i.getSeriesByIndex(T.seriesIndex),
                    A = T.dataIndexInside,
                    C = D.getDataParams(A);
                  if (!(C.dataIndex < 0)) {
                    ((C.axisDim = _.axisDim),
                      (C.axisIndex = _.axisIndex),
                      (C.axisType = _.axisType),
                      (C.axisId = _.axisId),
                      (C.axisValue = Ps(b.axis, { value: w })),
                      (C.axisValueLabel = S),
                      (C.marker = v.makeTooltipMarker("item", En(C.color), l)));
                    var I = fd(D.formatTooltip(A, !0, null)),
                      L = I.frag;
                    if (L) {
                      var P = Gi([D], a).get("valueFormatter");
                      x.blocks.push(P ? B({ valueFormatter: P }, L) : L);
                    }
                    (I.text && h.push(I.text), u.push(C));
                  }
                }));
            }
          });
        }),
          f.blocks.reverse(),
          h.reverse());
        var c = n.position,
          d = s.get("order"),
          p = dd(f, v, l, d, i.get("useUTC"), s.get("textStyle"));
        p && h.unshift(p);
        var m =
            l === "richText"
              ? `

`
              : "<br/>",
          g = h.join(m);
        this._showOrMove(s, function () {
          this._updateContentNotChangedOnAxis(r, u)
            ? this._updatePosition(s, c, o[0], o[1], this._tooltipContent, u)
            : this._showTooltipContent(
                s,
                g,
                u,
                Math.random() + "",
                o[0],
                o[1],
                c,
                null,
                v,
              );
        });
      }),
      (t.prototype._showSeriesItemTooltip = function (r, n, i) {
        var a = this._ecModel,
          o = ot(n),
          s = o.seriesIndex,
          l = a.getSeriesByIndex(s),
          u = o.dataModel || l,
          f = o.dataIndex,
          h = o.dataType,
          v = u.getData(h),
          c = this._renderMode,
          d = r.positionDefault,
          p = Gi(
            [v.getItemModel(f), u, l && (l.coordinateSystem || {}).model],
            this._tooltipModel,
            d ? { position: d } : null,
          ),
          m = p.get("trigger");
        if (!(m != null && m !== "item")) {
          var g = u.getDataParams(f, h),
            y = new iu();
          g.marker = y.makeTooltipMarker("item", En(g.color), c);
          var _ = fd(u.formatTooltip(f, !1, h)),
            b = p.get("order"),
            w = p.get("valueFormatter"),
            S = _.frag,
            x = S
              ? dd(
                  w ? B({ valueFormatter: w }, S) : S,
                  y,
                  c,
                  b,
                  a.get("useUTC"),
                  p.get("textStyle"),
                )
              : _.text,
            T = "item_" + u.name + "_" + f;
          (this._showOrMove(p, function () {
            this._showTooltipContent(
              p,
              x,
              g,
              T,
              r.offsetX,
              r.offsetY,
              r.position,
              r.target,
              y,
            );
          }),
            i({
              type: "showTip",
              dataIndexInside: f,
              dataIndex: v.getRawIndex(f),
              seriesIndex: s,
              from: this.uid,
            }));
        }
      }),
      (t.prototype._showComponentItemTooltip = function (r, n, i) {
        var a = this._renderMode === "html",
          o = ot(n),
          s = o.tooltipConfig,
          l = s.option || {},
          u = l.encodeHTMLContent;
        if (U(l)) {
          var f = l;
          ((l = { content: f, formatter: f }), (u = !0));
        }
        u && a && l.content && ((l = at(l)), (l.content = re(l.content)));
        var h = [l],
          v = this._ecModel.getComponent(o.componentMainType, o.componentIndex);
        (v && h.push(v), h.push({ formatter: l.content }));
        var c = r.positionDefault,
          d = Gi(h, this._tooltipModel, c ? { position: c } : null),
          p = d.get("content"),
          m = Math.random() + "",
          g = new iu();
        (this._showOrMove(d, function () {
          var y = at(d.get("formatterParams") || {});
          this._showTooltipContent(
            d,
            p,
            y,
            m,
            r.offsetX,
            r.offsetY,
            r.position,
            n,
            g,
          );
        }),
          i({ type: "showTip", from: this.uid }));
      }),
      (t.prototype._showTooltipContent = function (r, n, i, a, o, s, l, u, f) {
        if (((this._ticket = ""), !(!r.get("showContent") || !r.get("show")))) {
          var h = this._tooltipContent;
          h.setEnterable(r.get("enterable"));
          var v = r.get("formatter");
          l = l || r.get("position");
          var c = n,
            d = this._getNearestPoint(
              [o, s],
              i,
              r.get("trigger"),
              r.get("borderColor"),
              r.get("defaultBorderColor", !0),
            ),
            p = d.color;
          if (v)
            if (U(v)) {
              var m = r.ecModel.get("useUTC"),
                g = W(i) ? i[0] : i,
                y = g && g.axisType && g.axisType.indexOf("time") >= 0;
              ((c = v), y && (c = al(g.axisValue, c, m)), (c = Iy(c, i, !0)));
            } else if (Q(v)) {
              var _ = ct(function (b, w) {
                b === this._ticket &&
                  (h.setContent(w, f, r, p, l),
                  this._updatePosition(r, l, o, s, h, i, u));
              }, this);
              ((this._ticket = a), (c = v(i, a, _)));
            } else c = v;
          (h.setContent(c, f, r, p, l),
            h.show(r, p),
            this._updatePosition(r, l, o, s, h, i, u));
        }
      }),
      (t.prototype._getNearestPoint = function (r, n, i, a, o) {
        if (i === "axis" || W(n)) return { color: a || o };
        if (!W(n)) return { color: a || n.color || n.borderColor };
      }),
      (t.prototype._updatePosition = function (r, n, i, a, o, s, l) {
        var u = this._api.getWidth(),
          f = this._api.getHeight();
        n = n || r.get("position");
        var h = o.getSize(),
          v = r.get("align"),
          c = r.get("verticalAlign"),
          d = l && l.getBoundingRect().clone();
        if (
          (l && d.applyTransform(l.transform),
          Q(n) &&
            (n = n([i, a], s, o.el, d, {
              viewSize: [u, f],
              contentSize: h.slice(),
            })),
          W(n))
        )
          ((i = mt(n[0], u)), (a = mt(n[1], f)));
        else if (X(n)) {
          var p = n;
          ((p.width = h[0]), (p.height = h[1]));
          var m = Vr(p, { width: u, height: f });
          ((i = m.x), (a = m.y), (v = null), (c = null));
        } else if (U(n) && l) {
          var g = DI(n, d, h, r.get("borderWidth"));
          ((i = g[0]), (a = g[1]));
        } else {
          var g = TI(i, a, o, u, f, v ? null : 20, c ? null : 20);
          ((i = g[0]), (a = g[1]));
        }
        if (
          (v && (i -= yg(v) ? h[0] / 2 : v === "right" ? h[0] : 0),
          c && (a -= yg(c) ? h[1] / 2 : c === "bottom" ? h[1] : 0),
          R_(r))
        ) {
          var g = CI(i, a, o, u, f);
          ((i = g[0]), (a = g[1]));
        }
        o.moveTo(i, a);
      }),
      (t.prototype._updateContentNotChangedOnAxis = function (r, n) {
        var i = this._lastDataByCoordSys,
          a = this._cbParamsList,
          o = !!i && i.length === r.length;
        return (
          o &&
            M(i, function (s, l) {
              var u = s.dataByAxis || [],
                f = r[l] || {},
                h = f.dataByAxis || [];
              ((o = o && u.length === h.length),
                o &&
                  M(u, function (v, c) {
                    var d = h[c] || {},
                      p = v.seriesDataIndices || [],
                      m = d.seriesDataIndices || [];
                    ((o =
                      o &&
                      v.value === d.value &&
                      v.axisType === d.axisType &&
                      v.axisId === d.axisId &&
                      p.length === m.length),
                      o &&
                        M(p, function (g, y) {
                          var _ = m[y];
                          o =
                            o &&
                            g.seriesIndex === _.seriesIndex &&
                            g.dataIndex === _.dataIndex;
                        }),
                      a &&
                        M(v.seriesDataIndices, function (g) {
                          var y = g.seriesIndex,
                            _ = n[y],
                            b = a[y];
                          _ && b && b.data !== _.data && (o = !1);
                        }));
                  }));
            }),
          (this._lastDataByCoordSys = r),
          (this._cbParamsList = n),
          !!o
        );
      }),
      (t.prototype._hide = function (r) {
        ((this._lastDataByCoordSys = null),
          r({ type: "hideTip", from: this.uid }));
      }),
      (t.prototype.dispose = function (r, n) {
        tt.node ||
          !n.getDom() ||
          (Nf(this, "_updatePosition"),
          this._tooltipContent.dispose(),
          oh("itemTooltip", n));
      }),
      (t.type = "tooltip"),
      t
    );
  })(ke);
function Gi(e, t, r) {
  var n = t.ecModel,
    i;
  r ? ((i = new bt(r, n, n)), (i = new bt(t.option, i, n))) : (i = t);
  for (var a = e.length - 1; a >= 0; a--) {
    var o = e[a];
    o &&
      (o instanceof bt && (o = o.get("tooltip", !0)),
      U(o) && (o = { formatter: o }),
      o && (i = new bt(o, i, n)));
  }
  return i;
}
function mg(e, t) {
  return e.dispatchAction || ct(t.dispatchAction, t);
}
function TI(e, t, r, n, i, a, o) {
  var s = r.getSize(),
    l = s[0],
    u = s[1];
  return (
    a != null && (e + l + a + 2 > n ? (e -= l + a) : (e += a)),
    o != null && (t + u + o > i ? (t -= u + o) : (t += o)),
    [e, t]
  );
}
function CI(e, t, r, n, i) {
  var a = r.getSize(),
    o = a[0],
    s = a[1];
  return (
    (e = Math.min(e + o, n) - o),
    (t = Math.min(t + s, i) - s),
    (e = Math.max(e, 0)),
    (t = Math.max(t, 0)),
    [e, t]
  );
}
function DI(e, t, r, n) {
  var i = r[0],
    a = r[1],
    o = Math.ceil(Math.SQRT2 * n) + 8,
    s = 0,
    l = 0,
    u = t.width,
    f = t.height;
  switch (e) {
    case "inside":
      ((s = t.x + u / 2 - i / 2), (l = t.y + f / 2 - a / 2));
      break;
    case "top":
      ((s = t.x + u / 2 - i / 2), (l = t.y - a - o));
      break;
    case "bottom":
      ((s = t.x + u / 2 - i / 2), (l = t.y + f + o));
      break;
    case "left":
      ((s = t.x - i - o), (l = t.y + f / 2 - a / 2));
      break;
    case "right":
      ((s = t.x + u + o), (l = t.y + f / 2 - a / 2));
  }
  return [s, l];
}
function yg(e) {
  return e === "center" || e === "middle";
}
function MI(e, t, r) {
  var n = Ih(e).queryOptionMap,
    i = n.keys()[0];
  if (!(!i || i === "series")) {
    var a = Ba(t, i, n.get(i), {
        useDefault: !1,
        enableAll: !1,
        enableNone: !1,
      }),
      o = a.models[0];
    if (o) {
      var s = r.getViewOfComponentModel(o),
        l;
      if (
        (s.group.traverse(function (u) {
          var f = ot(u).tooltipConfig;
          if (f && f.name === e.name) return ((l = u), !0);
        }),
        l)
      )
        return {
          componentMainType: i,
          componentIndex: o.componentIndex,
          el: l,
        };
    }
  }
}
function hl(e) {
  (Re(k_),
    e.registerComponentModel(fI),
    e.registerComponentView(xI),
    e.registerAction(
      { type: "showTip", event: "showTip", update: "tooltip:manuallyShowTip" },
      ie,
    ),
    e.registerAction(
      { type: "hideTip", event: "hideTip", update: "tooltip:manuallyHideTip" },
      ie,
    ));
}
var AI = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return (
        (r.type = t.type),
        (r.layoutMode = { type: "box", ignoreSize: !0 }),
        r
      );
    }
    return (
      (t.type = "title"),
      (t.defaultOption = {
        z: 6,
        show: !0,
        text: "",
        target: "blank",
        subtext: "",
        subtarget: "blank",
        left: "center",
        top: Y.size.m,
        backgroundColor: Y.color.transparent,
        borderColor: Y.color.primary,
        borderWidth: 0,
        padding: 5,
        itemGap: 10,
        textStyle: { fontSize: 18, fontWeight: "bold", color: Y.color.primary },
        subtextStyle: { fontSize: 12, color: Y.color.quaternary },
      }),
      t
    );
  })(ht),
  LI = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = t.type), r);
    }
    return (
      (t.prototype.render = function (r, n, i) {
        if ((this.group.removeAll(), !!r.get("show"))) {
          var a = this.group,
            o = r.getModel("textStyle"),
            s = r.getModel("subtextStyle"),
            l = r.get("textAlign"),
            u = K(r.get("textBaseline"), r.get("textVerticalAlign")),
            f = new Ht({
              style: Hr(
                o,
                { text: r.get("text"), fill: o.getTextColor() },
                { disableBox: !0 },
              ),
              z2: 10,
            }),
            h = f.getBoundingRect(),
            v = r.get("subtext"),
            c = new Ht({
              style: Hr(
                s,
                {
                  text: v,
                  fill: s.getTextColor(),
                  y: h.height + r.get("itemGap"),
                  verticalAlign: "top",
                },
                { disableBox: !0 },
              ),
              z2: 10,
            }),
            d = r.get("link"),
            p = r.get("sublink"),
            m = r.get("triggerEvent", !0);
          ((f.silent = !d && !m),
            (c.silent = !p && !m),
            d &&
              f.on("click", function () {
                ld(d, "_" + r.get("target"));
              }),
            p &&
              c.on("click", function () {
                ld(p, "_" + r.get("subtarget"));
              }),
            (ot(f).eventData = ot(c).eventData =
              m
                ? { componentType: "title", componentIndex: r.componentIndex }
                : null),
            a.add(f),
            v && a.add(c));
          var g = a.getBoundingRect(),
            y = r.getBoxLayoutParams();
          ((y.width = g.width), (y.height = g.height));
          var _ = sl(r, i),
            b = Vr(y, _.refContainer, r.get("padding"));
          (l ||
            ((l = r.get("left") || r.get("right")),
            l === "middle" && (l = "center"),
            l === "right"
              ? (b.x += b.width)
              : l === "center" && (b.x += b.width / 2)),
            u ||
              ((u = r.get("top") || r.get("bottom")),
              u === "center" && (u = "middle"),
              u === "bottom"
                ? (b.y += b.height)
                : u === "middle" && (b.y += b.height / 2),
              (u = u || "top")),
            (a.x = b.x),
            (a.y = b.y),
            a.markRedraw());
          var w = { align: l, verticalAlign: u };
          (f.setStyle(w), c.setStyle(w), (g = a.getBoundingRect()));
          var S = b.margin,
            x = r.getItemStyle(["color", "opacity"]);
          x.fill = r.get("backgroundColor");
          var T = new Tt({
            shape: {
              x: g.x - S[3],
              y: g.y - S[0],
              width: g.width + S[1] + S[3],
              height: g.height + S[0] + S[2],
              r: r.get("borderRadius"),
            },
            style: x,
            subPixelOptimize: !0,
            silent: !0,
          });
          a.add(T);
        }
      }),
      (t.type = "title"),
      t
    );
  })(ke);
function cl(e) {
  (e.registerComponentModel(AI), e.registerComponentView(LI));
}
var II = function (e, t) {
    if (t === "all")
      return {
        type: "all",
        title: e.getLocaleModel().get(["legend", "selector", "all"]),
      };
    if (t === "inverse")
      return {
        type: "inverse",
        title: e.getLocaleModel().get(["legend", "selector", "inverse"]),
      };
  },
  sh = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return (
        (r.type = t.type),
        (r.layoutMode = { type: "box", ignoreSize: !0 }),
        r
      );
    }
    return (
      (t.prototype.init = function (r, n, i) {
        (this.mergeDefaultAndTheme(r, i),
          (r.selected = r.selected || {}),
          this._updateSelector(r));
      }),
      (t.prototype.mergeOption = function (r, n) {
        (e.prototype.mergeOption.call(this, r, n), this._updateSelector(r));
      }),
      (t.prototype._updateSelector = function (r) {
        var n = r.selector,
          i = this.ecModel;
        (n === !0 && (n = r.selector = ["all", "inverse"]),
          W(n) &&
            M(n, function (a, o) {
              (U(a) && (a = { type: a }), (n[o] = ut(a, II(i, a.type))));
            }));
      }),
      (t.prototype.optionUpdated = function () {
        this._updateData(this.ecModel);
        var r = this._data;
        if (r[0] && this.get("selectedMode") === "single") {
          for (var n = !1, i = 0; i < r.length; i++) {
            var a = r[i].get("name");
            if (this.isSelected(a)) {
              (this.select(a), (n = !0));
              break;
            }
          }
          !n && this.select(r[0].get("name"));
        }
      }),
      (t.prototype._updateData = function (r) {
        var n = [],
          i = [];
        (r.eachRawSeries(function (l) {
          var u = l.name;
          i.push(u);
          var f;
          if (l.legendVisualProvider) {
            var h = l.legendVisualProvider,
              v = h.getAllNames();
            (r.isSeriesFiltered(l) || (i = i.concat(v)),
              v.length ? (n = n.concat(v)) : (f = !0));
          } else f = !0;
          f && Lh(l) && n.push(l.name);
        }),
          (this._availableNames = i));
        var a = this.get("data") || n,
          o = rt(),
          s = q(
            a,
            function (l) {
              return (
                (U(l) || vt(l)) && (l = { name: l }),
                o.get(l.name)
                  ? null
                  : (o.set(l.name, !0), new bt(l, this, this.ecModel))
              );
            },
            this,
          );
        this._data = kt(s, function (l) {
          return !!l;
        });
      }),
      (t.prototype.getData = function () {
        return this._data;
      }),
      (t.prototype.select = function (r) {
        var n = this.option.selected,
          i = this.get("selectedMode");
        if (i === "single") {
          var a = this._data;
          M(a, function (o) {
            n[o.get("name")] = !1;
          });
        }
        n[r] = !0;
      }),
      (t.prototype.unSelect = function (r) {
        this.get("selectedMode") !== "single" && (this.option.selected[r] = !1);
      }),
      (t.prototype.toggleSelected = function (r) {
        var n = this.option.selected;
        (n.hasOwnProperty(r) || (n[r] = !0),
          this[n[r] ? "unSelect" : "select"](r));
      }),
      (t.prototype.allSelect = function () {
        var r = this._data,
          n = this.option.selected;
        M(r, function (i) {
          n[i.get("name", !0)] = !0;
        });
      }),
      (t.prototype.inverseSelect = function () {
        var r = this._data,
          n = this.option.selected;
        M(r, function (i) {
          var a = i.get("name", !0);
          (n.hasOwnProperty(a) || (n[a] = !0), (n[a] = !n[a]));
        });
      }),
      (t.prototype.isSelected = function (r) {
        var n = this.option.selected;
        return (
          !(n.hasOwnProperty(r) && !n[r]) && st(this._availableNames, r) >= 0
        );
      }),
      (t.prototype.getOrient = function () {
        return this.get("orient") === "vertical"
          ? { index: 1, name: "vertical" }
          : { index: 0, name: "horizontal" };
      }),
      (t.type = "legend.plain"),
      (t.dependencies = ["series"]),
      (t.defaultOption = {
        z: 4,
        show: !0,
        orient: "horizontal",
        left: "center",
        bottom: Y.size.m,
        align: "auto",
        backgroundColor: Y.color.transparent,
        borderColor: Y.color.border,
        borderRadius: 0,
        borderWidth: 0,
        padding: 5,
        itemGap: 8,
        itemWidth: 25,
        itemHeight: 14,
        symbolRotate: "inherit",
        symbolKeepAspect: !0,
        inactiveColor: Y.color.disabled,
        inactiveBorderColor: Y.color.disabled,
        inactiveBorderWidth: "auto",
        itemStyle: {
          color: "inherit",
          opacity: "inherit",
          borderColor: "inherit",
          borderWidth: "auto",
          borderCap: "inherit",
          borderJoin: "inherit",
          borderDashOffset: "inherit",
          borderMiterLimit: "inherit",
        },
        lineStyle: {
          width: "auto",
          color: "inherit",
          inactiveColor: Y.color.disabled,
          inactiveWidth: 2,
          opacity: "inherit",
          type: "inherit",
          cap: "inherit",
          join: "inherit",
          dashOffset: "inherit",
          miterLimit: "inherit",
        },
        textStyle: { color: Y.color.secondary },
        selectedMode: !0,
        selector: !1,
        selectorLabel: {
          show: !0,
          borderRadius: 10,
          padding: [3, 5, 3, 5],
          fontSize: 12,
          fontFamily: "sans-serif",
          color: Y.color.tertiary,
          borderWidth: 1,
          borderColor: Y.color.border,
        },
        emphasis: { selectorLabel: { show: !0, color: Y.color.quaternary } },
        selectorPosition: "auto",
        selectorItemGap: 7,
        selectorButtonGap: 10,
        tooltip: { show: !1 },
        triggerEvent: !1,
      }),
      t
    );
  })(ht),
  ti = Mt,
  lh = M,
  Eo = Et,
  N_ = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return ((r.type = t.type), (r.newlineDisabled = !1), r);
    }
    return (
      (t.prototype.init = function () {
        (this.group.add((this._contentGroup = new Eo())),
          this.group.add((this._selectorGroup = new Eo())),
          (this._isFirstRender = !0));
      }),
      (t.prototype.getContentGroup = function () {
        return this._contentGroup;
      }),
      (t.prototype.getSelectorGroup = function () {
        return this._selectorGroup;
      }),
      (t.prototype.render = function (r, n, i) {
        var a = this._isFirstRender;
        if (
          ((this._isFirstRender = !1), this.resetInner(), !!r.get("show", !0))
        ) {
          var o = r.get("align"),
            s = r.get("orient");
          (!o || o === "auto") &&
            (o =
              r.get("left") === "right" && s === "vertical" ? "right" : "left");
          var l = r.get("selector", !0),
            u = r.get("selectorPosition", !0);
          (l &&
            (!u || u === "auto") &&
            (u = s === "horizontal" ? "end" : "start"),
            this.renderInner(o, r, n, i, l, s, u));
          var f = sl(r, i).refContainer,
            h = r.getBoxLayoutParams(),
            v = r.get("padding"),
            c = Vr(h, f, v),
            d = this.layoutInner(r, o, c, a, l, u),
            p = Vr(dt({ width: d.width, height: d.height }, h), f, v);
          ((this.group.x = p.x - d.x),
            (this.group.y = p.y - d.y),
            this.group.markRedraw(),
            this.group.add((this._backgroundEl = uI(d, r))));
        }
      }),
      (t.prototype.resetInner = function () {
        (this.getContentGroup().removeAll(),
          this._backgroundEl && this.group.remove(this._backgroundEl),
          this.getSelectorGroup().removeAll());
      }),
      (t.prototype.renderInner = function (r, n, i, a, o, s, l) {
        var u = this.getContentGroup(),
          f = rt(),
          h = n.get("selectedMode"),
          v = n.get("triggerEvent"),
          c = [];
        (i.eachRawSeries(function (d) {
          !d.get("legendHoverLink") && c.push(d.id);
        }),
          lh(
            n.getData(),
            function (d, p) {
              var m = this,
                g = d.get("name");
              if (
                !this.newlineDisabled &&
                (g === "" ||
                  g ===
                    `
`)
              ) {
                var y = new Eo();
                ((y.newline = !0), u.add(y));
                return;
              }
              var _ = i.getSeriesByName(g)[0];
              if (!f.get(g))
                if (_) {
                  var b = _.getData(),
                    w = b.getVisual("legendLineStyle") || {},
                    S = b.getVisual("legendIcon"),
                    x = b.getVisual("style"),
                    T = this._createItem(_, g, p, d, n, r, w, x, S, h, a);
                  (T.on("click", ti(_g, g, null, a, c))
                    .on("mouseover", ti(uh, _.name, null, a, c))
                    .on("mouseout", ti(fh, _.name, null, a, c)),
                    i.ssr &&
                      T.eachChild(function (D) {
                        var A = ot(D);
                        ((A.seriesIndex = _.seriesIndex),
                          (A.dataIndex = p),
                          (A.ssrType = "legend"));
                      }),
                    v &&
                      T.eachChild(function (D) {
                        m.packEventData(D, n, _, p, g);
                      }),
                    f.set(g, !0));
                } else
                  i.eachRawSeries(function (D) {
                    var A = this;
                    if (!f.get(g) && D.legendVisualProvider) {
                      var C = D.legendVisualProvider;
                      if (!C.containName(g)) return;
                      var I = C.indexOfName(g),
                        L = C.getItemVisual(I, "style"),
                        P = C.getItemVisual(I, "legendIcon"),
                        k = Ke(L.fill);
                      k &&
                        k[3] === 0 &&
                        ((k[3] = 0.2),
                        (L = B(B({}, L), { fill: Ra(k, "rgba") })));
                      var E = this._createItem(
                        D,
                        g,
                        p,
                        d,
                        n,
                        r,
                        {},
                        L,
                        P,
                        h,
                        a,
                      );
                      (E.on("click", ti(_g, null, g, a, c))
                        .on("mouseover", ti(uh, null, g, a, c))
                        .on("mouseout", ti(fh, null, g, a, c)),
                        i.ssr &&
                          E.eachChild(function (V) {
                            var R = ot(V);
                            ((R.seriesIndex = D.seriesIndex),
                              (R.dataIndex = p),
                              (R.ssrType = "legend"));
                          }),
                        v &&
                          E.eachChild(function (V) {
                            A.packEventData(V, n, D, p, g);
                          }),
                        f.set(g, !0));
                    }
                  }, this);
            },
            this,
          ),
          o && this._createSelector(o, n, a, s, l));
      }),
      (t.prototype.packEventData = function (r, n, i, a, o) {
        var s = {
          componentType: "legend",
          componentIndex: n.componentIndex,
          dataIndex: a,
          value: o,
          seriesIndex: i.seriesIndex,
        };
        ot(r).eventData = s;
      }),
      (t.prototype._createSelector = function (r, n, i, a, o) {
        var s = this.getSelectorGroup();
        lh(r, function (u) {
          var f = u.type,
            h = new Ht({
              style: { x: 0, y: 0, align: "center", verticalAlign: "middle" },
              onclick: function () {
                i.dispatchAction({
                  type: f === "all" ? "legendAllSelect" : "legendInverseSelect",
                  legendId: n.id,
                });
              },
            });
          s.add(h);
          var v = n.getModel("selectorLabel"),
            c = n.getModel(["emphasis", "selectorLabel"]);
          (Fa(h, { normal: v, emphasis: c }, { defaultText: u.title }), yf(h));
        });
      }),
      (t.prototype._createItem = function (r, n, i, a, o, s, l, u, f, h, v) {
        var c = r.visualDrawType,
          d = o.get("itemWidth"),
          p = o.get("itemHeight"),
          m = o.isSelected(n),
          g = a.get("symbolRotate"),
          y = a.get("symbolKeepAspect"),
          _ = a.get("icon");
        f = _ || f || "roundRect";
        var b = PI(f, a, l, u, c, m, v),
          w = new Eo(),
          S = a.getModel("textStyle");
        if (Q(r.getLegendIcon) && (!_ || _ === "inherit"))
          w.add(
            r.getLegendIcon({
              itemWidth: d,
              itemHeight: p,
              icon: f,
              iconRotate: g,
              itemStyle: b.itemStyle,
              lineStyle: b.lineStyle,
              symbolKeepAspect: y,
            }),
          );
        else {
          var x =
            _ === "inherit" && r.getData().getVisual("symbol")
              ? g === "inherit"
                ? r.getData().getVisual("symbolRotate")
                : g
              : 0;
          w.add(
            kI({
              itemWidth: d,
              itemHeight: p,
              icon: f,
              iconRotate: x,
              itemStyle: b.itemStyle,
              symbolKeepAspect: y,
            }),
          );
        }
        var T = s === "left" ? d + 5 : -5,
          D = s,
          A = o.get("formatter"),
          C = n;
        U(A) && A ? (C = A.replace("{name}", n ?? "")) : Q(A) && (C = A(n));
        var I = m ? S.getTextColor() : a.get("inactiveColor");
        w.add(
          new Ht({
            style: Hr(
              S,
              {
                text: C,
                x: T,
                y: p / 2,
                fill: I,
                align: D,
                verticalAlign: "middle",
              },
              { inheritColor: I },
            ),
          }),
        );
        var L = new Tt({
            shape: w.getBoundingRect(),
            style: { fill: "transparent" },
          }),
          P = a.getModel("tooltip");
        return (
          P.get("show") &&
            Qs({
              el: L,
              componentModel: o,
              itemName: n,
              itemTooltipOption: P.option,
            }),
          w.add(L),
          w.eachChild(function (k) {
            k.silent = !0;
          }),
          (L.silent = !h),
          this.getContentGroup().add(w),
          yf(w),
          (w.__legendDataIndex = i),
          w
        );
      }),
      (t.prototype.layoutInner = function (r, n, i, a, o, s) {
        var l = this.getContentGroup(),
          u = this.getSelectorGroup();
        ua(r.get("orient"), l, r.get("itemGap"), i.width, i.height);
        var f = l.getBoundingRect(),
          h = [-f.x, -f.y];
        if ((u.markRedraw(), l.markRedraw(), o)) {
          ua("horizontal", u, r.get("selectorItemGap", !0));
          var v = u.getBoundingRect(),
            c = [-v.x, -v.y],
            d = r.get("selectorButtonGap", !0),
            p = r.getOrient().index,
            m = p === 0 ? "width" : "height",
            g = p === 0 ? "height" : "width",
            y = p === 0 ? "y" : "x";
          (s === "end" ? (c[p] += f[m] + d) : (h[p] += v[m] + d),
            (c[1 - p] += f[g] / 2 - v[g] / 2),
            (u.x = c[0]),
            (u.y = c[1]),
            (l.x = h[0]),
            (l.y = h[1]));
          var _ = { x: 0, y: 0 };
          return (
            (_[m] = f[m] + d + v[m]),
            (_[g] = Math.max(f[g], v[g])),
            (_[y] = Math.min(0, v[y] + c[1 - p])),
            _
          );
        } else
          return ((l.x = h[0]), (l.y = h[1]), this.group.getBoundingRect());
      }),
      (t.prototype.remove = function () {
        (this.getContentGroup().removeAll(), (this._isFirstRender = !0));
      }),
      (t.type = "legend.plain"),
      t
    );
  })(ke);
function PI(e, t, r, n, i, a, o) {
  function s(m, g) {
    (m.lineWidth === "auto" && (m.lineWidth = g.lineWidth > 0 ? 2 : 0),
      lh(m, function (y, _) {
        m[_] === "inherit" && (m[_] = g[_]);
      }));
  }
  var l = t.getModel("itemStyle"),
    u = l.getItemStyle(),
    f = e.lastIndexOf("empty", 0) === 0 ? "fill" : "stroke",
    h = l.getShallow("decal");
  ((u.decal = !h || h === "inherit" ? n.decal : Uf(h, o)),
    u.fill === "inherit" && (u.fill = n[i]),
    u.stroke === "inherit" && (u.stroke = n[f]),
    u.opacity === "inherit" && (u.opacity = (i === "fill" ? n : r).opacity),
    s(u, n));
  var v = t.getModel("lineStyle"),
    c = v.getLineStyle();
  if (
    (s(c, r),
    u.fill === "auto" && (u.fill = n.fill),
    u.stroke === "auto" && (u.stroke = n.fill),
    c.stroke === "auto" && (c.stroke = n.fill),
    !a)
  ) {
    var d = t.get("inactiveBorderWidth"),
      p = u[f];
    ((u.lineWidth =
      d === "auto" ? (n.lineWidth > 0 && p ? 2 : 0) : u.lineWidth),
      (u.fill = t.get("inactiveColor")),
      (u.stroke = t.get("inactiveBorderColor")),
      (c.stroke = v.get("inactiveColor")),
      (c.lineWidth = v.get("inactiveWidth")));
  }
  return { itemStyle: u, lineStyle: c };
}
function kI(e) {
  var t = e.icon || "roundRect",
    r = gi(
      t,
      0,
      0,
      e.itemWidth,
      e.itemHeight,
      e.itemStyle.fill,
      e.symbolKeepAspect,
    );
  return (
    r.setStyle(e.itemStyle),
    (r.rotation = ((e.iconRotate || 0) * Math.PI) / 180),
    r.setOrigin([e.itemWidth / 2, e.itemHeight / 2]),
    t.indexOf("empty") > -1 &&
      ((r.style.stroke = r.style.fill),
      (r.style.fill = Y.color.neutral00),
      (r.style.lineWidth = 2)),
    r
  );
}
function _g(e, t, r, n) {
  (fh(e, t, r, n),
    r.dispatchAction({ type: "legendToggleSelect", name: e ?? t }),
    uh(e, t, r, n));
}
function F_(e) {
  for (
    var t = e.getZr().storage.getDisplayList(), r, n = 0, i = t.length;
    n < i && !(r = t[n].states.emphasis);

  )
    n++;
  return r && r.hoverLayer;
}
function uh(e, t, r, n) {
  F_(r) ||
    r.dispatchAction({
      type: "highlight",
      seriesName: e,
      name: t,
      excludeSeriesId: n,
    });
}
function fh(e, t, r, n) {
  F_(r) ||
    r.dispatchAction({
      type: "downplay",
      seriesName: e,
      name: t,
      excludeSeriesId: n,
    });
}
function RI(e) {
  var t = e.findComponents({ mainType: "legend" });
  t &&
    t.length &&
    e.filterSeries(function (r) {
      for (var n = 0; n < t.length; n++)
        if (!t[n].isSelected(r.name)) return !1;
      return !0;
    });
}
function Hi(e, t, r) {
  var n = e === "allSelect" || e === "inverseSelect",
    i = {},
    a = [];
  r.eachComponent({ mainType: "legend", query: t }, function (s) {
    (n ? s[e]() : s[e](t.name), bg(s, i), a.push(s.componentIndex));
  });
  var o = {};
  return (
    r.eachComponent("legend", function (s) {
      (M(i, function (l, u) {
        s[l ? "select" : "unSelect"](u);
      }),
        bg(s, o));
    }),
    n ? { selected: o, legendIndex: a } : { name: t.name, selected: o }
  );
}
function bg(e, t) {
  var r = t || {};
  return (
    M(e.getData(), function (n) {
      var i = n.get("name");
      if (
        !(
          i ===
            `
` || i === ""
        )
      ) {
        var a = e.isSelected(i);
        Ie(r, i) ? (r[i] = r[i] && a) : (r[i] = a);
      }
    }),
    r
  );
}
function EI(e) {
  (e.registerAction(
    "legendToggleSelect",
    "legendselectchanged",
    Mt(Hi, "toggleSelected"),
  ),
    e.registerAction("legendAllSelect", "legendselectall", Mt(Hi, "allSelect")),
    e.registerAction(
      "legendInverseSelect",
      "legendinverseselect",
      Mt(Hi, "inverseSelect"),
    ),
    e.registerAction("legendSelect", "legendselected", Mt(Hi, "select")),
    e.registerAction("legendUnSelect", "legendunselected", Mt(Hi, "unSelect")));
}
function z_(e) {
  (e.registerComponentModel(sh),
    e.registerComponentView(N_),
    e.registerProcessor(e.PRIORITY.PROCESSOR.SERIES_FILTER, RI),
    e.registerSubTypeDefaulter("legend", function () {
      return "plain";
    }),
    EI(e));
}
var OI = (function (e) {
  G(t, e);
  function t() {
    var r = (e !== null && e.apply(this, arguments)) || this;
    return ((r.type = t.type), r);
  }
  return (
    (t.prototype.setScrollDataIndex = function (r) {
      this.option.scrollDataIndex = r;
    }),
    (t.prototype.init = function (r, n, i) {
      var a = Ga(r);
      (e.prototype.init.call(this, r, n, i), Sg(this, r, a));
    }),
    (t.prototype.mergeOption = function (r, n) {
      (e.prototype.mergeOption.call(this, r, n), Sg(this, this.option, r));
    }),
    (t.type = "legend.scroll"),
    (t.defaultOption = my(sh.defaultOption, {
      scrollDataIndex: 0,
      pageButtonItemGap: 5,
      pageButtonGap: null,
      pageButtonPosition: "end",
      pageFormatter: "{current}/{total}",
      pageIcons: {
        horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
        vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"],
      },
      pageIconColor: Y.color.accent50,
      pageIconInactiveColor: Y.color.accent10,
      pageIconSize: 15,
      pageTextStyle: { color: Y.color.tertiary },
      animationDurationUpdate: 800,
    })),
    t
  );
})(sh);
function Sg(e, t, r) {
  var n = e.getOrient(),
    i = [1, 1];
  ((i[n.index] = 0), Wr(t, r, { type: "box", ignoreSize: !!i }));
}
var wg = Et,
  Nu = ["width", "height"],
  Fu = ["x", "y"],
  BI = (function (e) {
    G(t, e);
    function t() {
      var r = (e !== null && e.apply(this, arguments)) || this;
      return (
        (r.type = t.type),
        (r.newlineDisabled = !0),
        (r._currentIndex = 0),
        r
      );
    }
    return (
      (t.prototype.init = function () {
        (e.prototype.init.call(this),
          this.group.add((this._containerGroup = new wg())),
          this._containerGroup.add(this.getContentGroup()),
          this.group.add((this._controllerGroup = new wg())));
      }),
      (t.prototype.resetInner = function () {
        (e.prototype.resetInner.call(this),
          this._controllerGroup.removeAll(),
          this._containerGroup.removeClipPath(),
          (this._containerGroup.__rectSize = null));
      }),
      (t.prototype.renderInner = function (r, n, i, a, o, s, l) {
        var u = this;
        e.prototype.renderInner.call(this, r, n, i, a, o, s, l);
        var f = this._controllerGroup,
          h = n.get("pageIconSize", !0),
          v = W(h) ? h : [h, h];
        d("pagePrev", 0);
        var c = n.getModel("pageTextStyle");
        (f.add(
          new Ht({
            name: "pageText",
            style: {
              text: "xx/xx",
              fill: c.getTextColor(),
              font: c.getFont(),
              verticalAlign: "middle",
              align: "center",
            },
            silent: !0,
          }),
        ),
          d("pageNext", 1));
        function d(p, m) {
          var g = p + "DataIndex",
            y = Uh(
              n.get("pageIcons", !0)[n.getOrient().name][m],
              { onclick: ct(u._pageGo, u, g, n, a) },
              { x: -v[0] / 2, y: -v[1] / 2, width: v[0], height: v[1] },
            );
          ((y.name = p), f.add(y));
        }
      }),
      (t.prototype.layoutInner = function (r, n, i, a, o, s) {
        var l = this.getSelectorGroup(),
          u = r.getOrient().index,
          f = Nu[u],
          h = Fu[u],
          v = Nu[1 - u],
          c = Fu[1 - u];
        o && ua("horizontal", l, r.get("selectorItemGap", !0));
        var d = r.get("selectorButtonGap", !0),
          p = l.getBoundingRect(),
          m = [-p.x, -p.y],
          g = at(i);
        o && (g[f] = i[f] - p[f] - d);
        var y = this._layoutContentAndController(r, a, g, u, f, v, c, h);
        if (o) {
          if (s === "end") m[u] += y[f] + d;
          else {
            var _ = p[f] + d;
            ((m[u] -= _), (y[h] -= _));
          }
          ((y[f] += p[f] + d),
            (m[1 - u] += y[c] + y[v] / 2 - p[v] / 2),
            (y[v] = Math.max(y[v], p[v])),
            (y[c] = Math.min(y[c], p[c] + m[1 - u])),
            (l.x = m[0]),
            (l.y = m[1]),
            l.markRedraw());
        }
        return y;
      }),
      (t.prototype._layoutContentAndController = function (
        r,
        n,
        i,
        a,
        o,
        s,
        l,
        u,
      ) {
        var f = this.getContentGroup(),
          h = this._containerGroup,
          v = this._controllerGroup;
        (ua(
          r.get("orient"),
          f,
          r.get("itemGap"),
          a ? i.width : null,
          a ? null : i.height,
        ),
          ua("horizontal", v, r.get("pageButtonItemGap", !0)));
        var c = f.getBoundingRect(),
          d = v.getBoundingRect(),
          p = (this._showController = c[o] > i[o]),
          m = [-c.x, -c.y];
        n || (m[a] = f[u]);
        var g = [0, 0],
          y = [-d.x, -d.y],
          _ = K(r.get("pageButtonGap", !0), r.get("itemGap", !0));
        if (p) {
          var b = r.get("pageButtonPosition", !0);
          b === "end" ? (y[a] += i[o] - d[o]) : (g[a] += d[o] + _);
        }
        ((y[1 - a] += c[s] / 2 - d[s] / 2),
          f.setPosition(m),
          h.setPosition(g),
          v.setPosition(y));
        var w = { x: 0, y: 0 };
        if (
          ((w[o] = p ? i[o] : c[o]),
          (w[s] = Math.max(c[s], d[s])),
          (w[l] = Math.min(0, d[l] + y[1 - a])),
          (h.__rectSize = i[o]),
          p)
        ) {
          var S = { x: 0, y: 0 };
          ((S[o] = Math.max(i[o] - d[o] - _, 0)),
            (S[s] = w[s]),
            h.setClipPath(new Tt({ shape: S })),
            (h.__rectSize = S[o]));
        } else
          v.eachChild(function (T) {
            T.attr({ invisible: !0, silent: !0 });
          });
        var x = this._getPageInfo(r);
        return (
          x.pageIndex != null &&
            jt(
              f,
              { x: x.contentPosition[0], y: x.contentPosition[1] },
              p ? r : null,
            ),
          this._updatePageInfoView(r, x),
          w
        );
      }),
      (t.prototype._pageGo = function (r, n, i) {
        var a = this._getPageInfo(n)[r];
        a != null &&
          i.dispatchAction({
            type: "legendScroll",
            scrollDataIndex: a,
            legendId: n.id,
          });
      }),
      (t.prototype._updatePageInfoView = function (r, n) {
        var i = this._controllerGroup;
        M(["pagePrev", "pageNext"], function (f) {
          var h = f + "DataIndex",
            v = n[h] != null,
            c = i.childOfName(f);
          c &&
            (c.setStyle(
              "fill",
              v
                ? r.get("pageIconColor", !0)
                : r.get("pageIconInactiveColor", !0),
            ),
            (c.cursor = v ? "pointer" : "default"));
        });
        var a = i.childOfName("pageText"),
          o = r.get("pageFormatter"),
          s = n.pageIndex,
          l = s != null ? s + 1 : 0,
          u = n.pageCount;
        a &&
          o &&
          a.setStyle(
            "text",
            U(o)
              ? o
                  .replace("{current}", l == null ? "" : l + "")
                  .replace("{total}", u == null ? "" : u + "")
              : o({ current: l, total: u }),
          );
      }),
      (t.prototype._getPageInfo = function (r) {
        var n = r.get("scrollDataIndex", !0),
          i = this.getContentGroup(),
          a = this._containerGroup.__rectSize,
          o = r.getOrient().index,
          s = Nu[o],
          l = Fu[o],
          u = this._findTargetItemIndex(n),
          f = i.children(),
          h = f[u],
          v = f.length,
          c = v ? 1 : 0,
          d = {
            contentPosition: [i.x, i.y],
            pageCount: c,
            pageIndex: c - 1,
            pagePrevDataIndex: null,
            pageNextDataIndex: null,
          };
        if (!h) return d;
        var p = b(h);
        d.contentPosition[o] = -p.s;
        for (var m = u + 1, g = p, y = p, _ = null; m <= v; ++m)
          ((_ = b(f[m])),
            ((!_ && y.e > g.s + a) || (_ && !w(_, g.s))) &&
              (y.i > g.i ? (g = y) : (g = _),
              g &&
                (d.pageNextDataIndex == null && (d.pageNextDataIndex = g.i),
                ++d.pageCount)),
            (y = _));
        for (var m = u - 1, g = p, y = p, _ = null; m >= -1; --m)
          ((_ = b(f[m])),
            (!_ || !w(y, _.s)) &&
              g.i < y.i &&
              ((y = g),
              d.pagePrevDataIndex == null && (d.pagePrevDataIndex = g.i),
              ++d.pageCount,
              ++d.pageIndex),
            (g = _));
        return d;
        function b(S) {
          if (S) {
            var x = S.getBoundingRect(),
              T = x[l] + S[l];
            return { s: T, e: T + x[s], i: S.__legendDataIndex };
          }
        }
        function w(S, x) {
          return S.e >= x && S.s <= x + a;
        }
      }),
      (t.prototype._findTargetItemIndex = function (r) {
        if (!this._showController) return 0;
        var n,
          i = this.getContentGroup(),
          a;
        return (
          i.eachChild(function (o, s) {
            var l = o.__legendDataIndex;
            (a == null && l != null && (a = s), l === r && (n = s));
          }),
          n ?? a
        );
      }),
      (t.type = "legend.scroll"),
      t
    );
  })(N_);
function NI(e) {
  e.registerAction("legendScroll", "legendscroll", function (t, r) {
    var n = t.scrollDataIndex;
    n != null &&
      r.eachComponent(
        { mainType: "legend", subType: "scroll", query: t },
        function (i) {
          i.setScrollDataIndex(n);
        },
      );
  });
}
function FI(e) {
  (Re(z_), e.registerComponentModel(OI), e.registerComponentView(BI), NI(e));
}
function vl(e) {
  (Re(z_), Re(FI));
}
function xg(e, t, r) {
  var n = vr.createCanvas(),
    i = t.getWidth(),
    a = t.getHeight(),
    o = n.style;
  return (
    o &&
      ((o.position = "absolute"),
      (o.left = "0"),
      (o.top = "0"),
      (o.width = i + "px"),
      (o.height = a + "px"),
      n.setAttribute("data-zr-dom-id", e)),
    (n.width = i * r),
    (n.height = a * r),
    n
  );
}
var zu = (function (e) {
    G(t, e);
    function t(r, n, i) {
      var a = e.call(this) || this;
      ((a.motionBlur = !1),
        (a.lastFrameAlpha = 0.7),
        (a.dpr = 1),
        (a.virtual = !1),
        (a.config = {}),
        (a.incremental = !1),
        (a.zlevel = 0),
        (a.maxRepaintRectCount = 5),
        (a.__dirty = !0),
        (a.__firstTimePaint = !0),
        (a.__used = !1),
        (a.__drawIndex = 0),
        (a.__startIndex = 0),
        (a.__endIndex = 0),
        (a.__prevStartIndex = null),
        (a.__prevEndIndex = null));
      var o;
      ((i = i || is),
        typeof r == "string"
          ? (o = xg(r, n, i))
          : X(r) && ((o = r), (r = o.id)),
        (a.id = r),
        (a.dom = o));
      var s = o.style;
      return (
        s &&
          (zg(o),
          (o.onselectstart = function () {
            return !1;
          }),
          (s.padding = "0"),
          (s.margin = "0"),
          (s.borderWidth = "0")),
        (a.painter = n),
        (a.dpr = i),
        a
      );
    }
    return (
      (t.prototype.getElementCount = function () {
        return this.__endIndex - this.__startIndex;
      }),
      (t.prototype.afterBrush = function () {
        ((this.__prevStartIndex = this.__startIndex),
          (this.__prevEndIndex = this.__endIndex));
      }),
      (t.prototype.initContext = function () {
        ((this.ctx = this.dom.getContext("2d")), (this.ctx.dpr = this.dpr));
      }),
      (t.prototype.setUnpainted = function () {
        this.__firstTimePaint = !0;
      }),
      (t.prototype.createBackBuffer = function () {
        var r = this.dpr;
        ((this.domBack = xg("back-" + this.id, this.painter, r)),
          (this.ctxBack = this.domBack.getContext("2d")),
          r !== 1 && this.ctxBack.scale(r, r));
      }),
      (t.prototype.createRepaintRects = function (r, n, i, a) {
        if (this.__firstTimePaint) return ((this.__firstTimePaint = !1), null);
        var o = [],
          s = this.maxRepaintRectCount,
          l = !1,
          u = new et(0, 0, 0, 0);
        function f(y) {
          if (!(!y.isFinite() || y.isZero()))
            if (o.length === 0) {
              var _ = new et(0, 0, 0, 0);
              (_.copy(y), o.push(_));
            } else {
              for (var b = !1, w = 1 / 0, S = 0, x = 0; x < o.length; ++x) {
                var T = o[x];
                if (T.intersect(y)) {
                  var D = new et(0, 0, 0, 0);
                  (D.copy(T), D.union(y), (o[x] = D), (b = !0));
                  break;
                } else if (l) {
                  (u.copy(y), u.union(T));
                  var A = y.width * y.height,
                    C = T.width * T.height,
                    I = u.width * u.height,
                    L = I - A - C;
                  L < w && ((w = L), (S = x));
                }
              }
              if ((l && (o[S].union(y), (b = !0)), !b)) {
                var _ = new et(0, 0, 0, 0);
                (_.copy(y), o.push(_));
              }
              l || (l = o.length >= s);
            }
        }
        for (var h = this.__startIndex; h < this.__endIndex; ++h) {
          var v = r[h];
          if (v) {
            var c = v.shouldBePainted(i, a, !0, !0),
              d =
                v.__isRendered && (v.__dirty & le || !c)
                  ? v.getPrevPaintRect()
                  : null;
            d && f(d);
            var p =
              c && (v.__dirty & le || !v.__isRendered)
                ? v.getPaintRect()
                : null;
            p && f(p);
          }
        }
        for (var h = this.__prevStartIndex; h < this.__prevEndIndex; ++h) {
          var v = n[h],
            c = v && v.shouldBePainted(i, a, !0, !0);
          if (v && (!c || !v.__zr) && v.__isRendered) {
            var d = v.getPrevPaintRect();
            d && f(d);
          }
        }
        var m;
        do {
          m = !1;
          for (var h = 0; h < o.length; ) {
            if (o[h].isZero()) {
              o.splice(h, 1);
              continue;
            }
            for (var g = h + 1; g < o.length; )
              o[h].intersect(o[g])
                ? ((m = !0), o[h].union(o[g]), o.splice(g, 1))
                : g++;
            h++;
          }
        } while (m);
        return ((this._paintRects = o), o);
      }),
      (t.prototype.debugGetPaintRects = function () {
        return (this._paintRects || []).slice();
      }),
      (t.prototype.resize = function (r, n) {
        var i = this.dpr,
          a = this.dom,
          o = a.style,
          s = this.domBack;
        (o && ((o.width = r + "px"), (o.height = n + "px")),
          (a.width = r * i),
          (a.height = n * i),
          s &&
            ((s.width = r * i),
            (s.height = n * i),
            i !== 1 && this.ctxBack.scale(i, i)));
      }),
      (t.prototype.clear = function (r, n, i) {
        var a = this.dom,
          o = this.ctx,
          s = a.width,
          l = a.height;
        n = n || this.clearColor;
        var u = this.motionBlur && !r,
          f = this.lastFrameAlpha,
          h = this.dpr,
          v = this;
        u &&
          (this.domBack || this.createBackBuffer(),
          (this.ctxBack.globalCompositeOperation = "copy"),
          this.ctxBack.drawImage(a, 0, 0, s / h, l / h));
        var c = this.domBack;
        function d(p, m, g, y) {
          if ((o.clearRect(p, m, g, y), n && n !== "transparent")) {
            var _ = void 0;
            if (Gs(n)) {
              var b = n.global || (n.__width === g && n.__height === y);
              ((_ =
                (b && n.__canvasGradient) ||
                Vf(o, n, { x: 0, y: 0, width: g, height: y })),
                (n.__canvasGradient = _),
                (n.__width = g),
                (n.__height = y));
            } else
              P1(n) &&
                ((n.scaleX = n.scaleX || h),
                (n.scaleY = n.scaleY || h),
                (_ = Wf(o, n, {
                  dirty: function () {
                    (v.setUnpainted(), v.painter.refresh());
                  },
                })));
            (o.save(),
              (o.fillStyle = _ || n),
              o.fillRect(p, m, g, y),
              o.restore());
          }
          u &&
            (o.save(),
            (o.globalAlpha = f),
            o.drawImage(c, p, m, g, y),
            o.restore());
        }
        !i || u
          ? d(0, 0, s, l)
          : i.length &&
            M(i, function (p) {
              d(p.x * h, p.y * h, p.width * h, p.height * h);
            });
      }),
      t
    );
  })(er),
  Tg = 1e5,
  _n = 314159,
  Oo = 0.01,
  zI = 0.001;
function GI(e) {
  return e
    ? e.__builtin__
      ? !0
      : !(typeof e.resize != "function" || typeof e.refresh != "function")
    : !1;
}
function HI(e, t) {
  var r = document.createElement("div");
  return (
    (r.style.cssText =
      [
        "position:relative",
        "width:" + e + "px",
        "height:" + t + "px",
        "padding:0",
        "margin:0",
        "border-width:0",
      ].join(";") + ";"),
    r
  );
}
var VI = (function () {
  function e(t, r, n, i) {
    ((this.type = "canvas"),
      (this._zlevelList = []),
      (this._prevDisplayList = []),
      (this._layers = {}),
      (this._layerConfig = {}),
      (this._needsManuallyCompositing = !1),
      (this.type = "canvas"));
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    ((this._opts = n = B({}, n || {})),
      (this.dpr = n.devicePixelRatio || is),
      (this._singleCanvas = a),
      (this.root = t));
    var o = t.style;
    (o && (zg(t), (t.innerHTML = "")), (this.storage = r));
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (a) {
      var f = t,
        h = f.width,
        v = f.height;
      (n.width != null && (h = n.width),
        n.height != null && (v = n.height),
        (this.dpr = n.devicePixelRatio || 1),
        (f.width = h * this.dpr),
        (f.height = v * this.dpr),
        (this._width = h),
        (this._height = v));
      var c = new zu(f, this, this.dpr);
      ((c.__builtin__ = !0),
        c.initContext(),
        (l[_n] = c),
        (c.zlevel = _n),
        s.push(_n),
        (this._domRoot = t));
    } else {
      ((this._width = To(t, 0, n)), (this._height = To(t, 1, n)));
      var u = (this._domRoot = HI(this._width, this._height));
      t.appendChild(u);
    }
  }
  return (
    (e.prototype.getType = function () {
      return "canvas";
    }),
    (e.prototype.isSingleCanvas = function () {
      return this._singleCanvas;
    }),
    (e.prototype.getViewportRoot = function () {
      return this._domRoot;
    }),
    (e.prototype.getViewportRootOffset = function () {
      var t = this.getViewportRoot();
      if (t)
        return { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 };
    }),
    (e.prototype.refresh = function (t) {
      var r = this.storage.getDisplayList(!0),
        n = this._prevDisplayList,
        i = this._zlevelList;
      ((this._redrawId = Math.random()),
        this._paintList(r, n, t, this._redrawId));
      for (var a = 0; a < i.length; a++) {
        var o = i[a],
          s = this._layers[o];
        if (!s.__builtin__ && s.refresh) {
          var l = a === 0 ? this._backgroundColor : null;
          s.refresh(l);
        }
      }
      return (
        this._opts.useDirtyRect && (this._prevDisplayList = r.slice()),
        this
      );
    }),
    (e.prototype.refreshHover = function () {
      this._paintHoverList(this.storage.getDisplayList(!1));
    }),
    (e.prototype._paintHoverList = function (t) {
      var r = t.length,
        n = this._hoverlayer;
      if ((n && n.clear(), !!r)) {
        for (
          var i = {
              inHover: !0,
              viewWidth: this._width,
              viewHeight: this._height,
            },
            a,
            o = 0;
          o < r;
          o++
        ) {
          var s = t[o];
          s.__inHover &&
            (n || (n = this._hoverlayer = this.getLayer(Tg)),
            a || ((a = n.ctx), a.save()),
            Tn(a, s, i, o === r - 1));
        }
        a && a.restore();
      }
    }),
    (e.prototype.getHoverLayer = function () {
      return this.getLayer(Tg);
    }),
    (e.prototype.paintOne = function (t, r) {
      E0(t, r);
    }),
    (e.prototype._paintList = function (t, r, n, i) {
      if (this._redrawId === i) {
        ((n = n || !1), this._updateLayerStatus(t));
        var a = this._doPaintList(t, r, n),
          o = a.finished,
          s = a.needsRefreshHover;
        if (
          (this._needsManuallyCompositing && this._compositeManually(),
          s && this._paintHoverList(t),
          o)
        )
          this.eachLayer(function (u) {
            u.afterBrush && u.afterBrush();
          });
        else {
          var l = this;
          Ts(function () {
            l._paintList(t, r, n, i);
          });
        }
      }
    }),
    (e.prototype._compositeManually = function () {
      var t = this.getLayer(_n).ctx,
        r = this._domRoot.width,
        n = this._domRoot.height;
      (t.clearRect(0, 0, r, n),
        this.eachBuiltinLayer(function (i) {
          i.virtual && t.drawImage(i.dom, 0, 0, r, n);
        }));
    }),
    (e.prototype._doPaintList = function (t, r, n) {
      for (
        var i = this, a = [], o = this._opts.useDirtyRect, s = 0;
        s < this._zlevelList.length;
        s++
      ) {
        var l = this._zlevelList[s],
          u = this._layers[l];
        u.__builtin__ &&
          u !== this._hoverlayer &&
          (u.__dirty || n) &&
          a.push(u);
      }
      for (
        var f = !0,
          h = !1,
          v = function (p) {
            var m = a[p],
              g = m.ctx,
              y = o && m.createRepaintRects(t, r, c._width, c._height),
              _ = n ? m.__startIndex : m.__drawIndex,
              b = !n && m.incremental && Date.now,
              w = b && Date.now(),
              S = m.zlevel === c._zlevelList[0] ? c._backgroundColor : null;
            if (m.__startIndex === m.__endIndex) m.clear(!1, S, y);
            else if (_ === m.__startIndex) {
              var x = t[_];
              (!x.incremental || !x.notClear || n) && m.clear(!1, S, y);
            }
            _ === -1 &&
              (console.error("For some unknown reason. drawIndex is -1"),
              (_ = m.__startIndex));
            var T,
              D = function (L) {
                var P = {
                  inHover: !1,
                  allClipped: !1,
                  prevEl: null,
                  viewWidth: i._width,
                  viewHeight: i._height,
                };
                for (T = _; T < m.__endIndex; T++) {
                  var k = t[T];
                  if (
                    (k.__inHover && (h = !0),
                    i._doPaintEl(k, m, o, L, P, T === m.__endIndex - 1),
                    b)
                  ) {
                    var E = Date.now() - w;
                    if (E > 15) break;
                  }
                }
                P.prevElClipPaths && g.restore();
              };
            if (y)
              if (y.length === 0) T = m.__endIndex;
              else
                for (var A = c.dpr, C = 0; C < y.length; ++C) {
                  var I = y[C];
                  (g.save(),
                    g.beginPath(),
                    g.rect(I.x * A, I.y * A, I.width * A, I.height * A),
                    g.clip(),
                    D(I),
                    g.restore());
                }
            else (g.save(), D(), g.restore());
            ((m.__drawIndex = T), m.__drawIndex < m.__endIndex && (f = !1));
          },
          c = this,
          d = 0;
        d < a.length;
        d++
      )
        v(d);
      return (
        tt.wxa &&
          M(this._layers, function (p) {
            p && p.ctx && p.ctx.draw && p.ctx.draw();
          }),
        { finished: f, needsRefreshHover: h }
      );
    }),
    (e.prototype._doPaintEl = function (t, r, n, i, a, o) {
      var s = r.ctx;
      if (n) {
        var l = t.getPaintRect();
        (!i || (l && l.intersect(i))) &&
          (Tn(s, t, a, o), t.setPrevPaintRect(l));
      } else Tn(s, t, a, o);
    }),
    (e.prototype.getLayer = function (t, r) {
      this._singleCanvas && !this._needsManuallyCompositing && (t = _n);
      var n = this._layers[t];
      return (
        n ||
          ((n = new zu("zr_" + t, this, this.dpr)),
          (n.zlevel = t),
          (n.__builtin__ = !0),
          this._layerConfig[t]
            ? ut(n, this._layerConfig[t], !0)
            : this._layerConfig[t - Oo] && ut(n, this._layerConfig[t - Oo], !0),
          r && (n.virtual = r),
          this.insertLayer(t, n),
          n.initContext()),
        n
      );
    }),
    (e.prototype.insertLayer = function (t, r) {
      var n = this._layers,
        i = this._zlevelList,
        a = i.length,
        o = this._domRoot,
        s = null,
        l = -1;
      if (!n[t] && GI(r)) {
        if (a > 0 && t > i[0]) {
          for (l = 0; l < a - 1 && !(i[l] < t && i[l + 1] > t); l++);
          s = n[i[l]];
        }
        if ((i.splice(l + 1, 0, t), (n[t] = r), !r.virtual))
          if (s) {
            var u = s.dom;
            u.nextSibling
              ? o.insertBefore(r.dom, u.nextSibling)
              : o.appendChild(r.dom);
          } else
            o.firstChild
              ? o.insertBefore(r.dom, o.firstChild)
              : o.appendChild(r.dom);
        r.painter || (r.painter = this);
      }
    }),
    (e.prototype.eachLayer = function (t, r) {
      for (var n = this._zlevelList, i = 0; i < n.length; i++) {
        var a = n[i];
        t.call(r, this._layers[a], a);
      }
    }),
    (e.prototype.eachBuiltinLayer = function (t, r) {
      for (var n = this._zlevelList, i = 0; i < n.length; i++) {
        var a = n[i],
          o = this._layers[a];
        o.__builtin__ && t.call(r, o, a);
      }
    }),
    (e.prototype.eachOtherLayer = function (t, r) {
      for (var n = this._zlevelList, i = 0; i < n.length; i++) {
        var a = n[i],
          o = this._layers[a];
        o.__builtin__ || t.call(r, o, a);
      }
    }),
    (e.prototype.getLayers = function () {
      return this._layers;
    }),
    (e.prototype._updateLayerStatus = function (t) {
      this.eachBuiltinLayer(function (h, v) {
        h.__dirty = h.__used = !1;
      });
      function r(h) {
        a && (a.__endIndex !== h && (a.__dirty = !0), (a.__endIndex = h));
      }
      if (this._singleCanvas)
        for (var n = 1; n < t.length; n++) {
          var i = t[n];
          if (i.zlevel !== t[n - 1].zlevel || i.incremental) {
            this._needsManuallyCompositing = !0;
            break;
          }
        }
      var a = null,
        o = 0,
        s,
        l;
      for (l = 0; l < t.length; l++) {
        var i = t[l],
          u = i.zlevel,
          f = void 0;
        (s !== u && ((s = u), (o = 0)),
          i.incremental
            ? ((f = this.getLayer(u + zI, this._needsManuallyCompositing)),
              (f.incremental = !0),
              (o = 1))
            : (f = this.getLayer(
                u + (o > 0 ? Oo : 0),
                this._needsManuallyCompositing,
              )),
          f.__builtin__ ||
            _h("ZLevel " + u + " has been used by unkown layer " + f.id),
          f !== a &&
            ((f.__used = !0),
            f.__startIndex !== l && (f.__dirty = !0),
            (f.__startIndex = l),
            f.incremental ? (f.__drawIndex = -1) : (f.__drawIndex = l),
            r(l),
            (a = f)),
          i.__dirty & le &&
            !i.__inHover &&
            ((f.__dirty = !0),
            f.incremental && f.__drawIndex < 0 && (f.__drawIndex = l)));
      }
      (r(l),
        this.eachBuiltinLayer(function (h, v) {
          (!h.__used &&
            h.getElementCount() > 0 &&
            ((h.__dirty = !0),
            (h.__startIndex = h.__endIndex = h.__drawIndex = 0)),
            h.__dirty && h.__drawIndex < 0 && (h.__drawIndex = h.__startIndex));
        }));
    }),
    (e.prototype.clear = function () {
      return (this.eachBuiltinLayer(this._clearLayer), this);
    }),
    (e.prototype._clearLayer = function (t) {
      t.clear();
    }),
    (e.prototype.setBackgroundColor = function (t) {
      ((this._backgroundColor = t),
        M(this._layers, function (r) {
          r.setUnpainted();
        }));
    }),
    (e.prototype.configLayer = function (t, r) {
      if (r) {
        var n = this._layerConfig;
        n[t] ? ut(n[t], r, !0) : (n[t] = r);
        for (var i = 0; i < this._zlevelList.length; i++) {
          var a = this._zlevelList[i];
          if (a === t || a === t + Oo) {
            var o = this._layers[a];
            ut(o, n[t], !0);
          }
        }
      }
    }),
    (e.prototype.delLayer = function (t) {
      var r = this._layers,
        n = this._zlevelList,
        i = r[t];
      i &&
        (i.dom.parentNode.removeChild(i.dom),
        delete r[t],
        n.splice(st(n, t), 1));
    }),
    (e.prototype.resize = function (t, r) {
      if (this._domRoot.style) {
        var n = this._domRoot;
        n.style.display = "none";
        var i = this._opts,
          a = this.root;
        if (
          (t != null && (i.width = t),
          r != null && (i.height = r),
          (t = To(a, 0, i)),
          (r = To(a, 1, i)),
          (n.style.display = ""),
          this._width !== t || r !== this._height)
        ) {
          ((n.style.width = t + "px"), (n.style.height = r + "px"));
          for (var o in this._layers)
            this._layers.hasOwnProperty(o) && this._layers[o].resize(t, r);
          this.refresh(!0);
        }
        ((this._width = t), (this._height = r));
      } else {
        if (t == null || r == null) return;
        ((this._width = t), (this._height = r), this.getLayer(_n).resize(t, r));
      }
      return this;
    }),
    (e.prototype.clearLayer = function (t) {
      var r = this._layers[t];
      r && r.clear();
    }),
    (e.prototype.dispose = function () {
      ((this.root.innerHTML = ""),
        (this.root = this.storage = this._domRoot = this._layers = null));
    }),
    (e.prototype.getRenderedCanvas = function (t) {
      if (((t = t || {}), this._singleCanvas && !this._compositeManually))
        return this._layers[_n].dom;
      var r = new zu("image", this, t.pixelRatio || this.dpr);
      (r.initContext(),
        r.clear(!1, t.backgroundColor || this._backgroundColor));
      var n = r.ctx;
      if (t.pixelRatio <= this.dpr) {
        this.refresh();
        var i = r.dom.width,
          a = r.dom.height;
        this.eachLayer(function (h) {
          h.__builtin__
            ? n.drawImage(h.dom, 0, 0, i, a)
            : h.renderToCanvas && (n.save(), h.renderToCanvas(n), n.restore());
        });
      } else
        for (
          var o = {
              inHover: !1,
              viewWidth: this._width,
              viewHeight: this._height,
            },
            s = this.storage.getDisplayList(!0),
            l = 0,
            u = s.length;
          l < u;
          l++
        ) {
          var f = s[l];
          Tn(n, f, o, l === u - 1);
        }
      return r.dom;
    }),
    (e.prototype.getWidth = function () {
      return this._width;
    }),
    (e.prototype.getHeight = function () {
      return this._height;
    }),
    e
  );
})();
function dl(e) {
  e.registerPainter("canvas", VI);
}
function G_() {
  const e = Jt("light"),
    t = (r) => {
      const n = r
        ? r.matches
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      e.value = n ? "dark" : "light";
    };
  return (
    _i(() => {
      (t(),
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", t));
    }),
    Y_(() => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", t);
    }),
    { theme: e }
  );
}
function WI(e) {
  const t = Object.keys(e)
    .map((n) => [Number(n), e[n]])
    .filter(([n]) => !Number.isNaN(n))
    .sort((n, i) => n[0] - i[0]);
  for (const n in e) e[n] = 0;
  let r = 0;
  for (const [n, i] of t) {
    const a = i ?? 0,
      o = Math.max(0, a - r);
    ((r = a), (e[n.toString()] += o));
  }
}
function UI(e, t, r) {
  if (!Number.isFinite(t) || t <= 0) return "0";
  const n = Math.min(1, Math.max(0, e)),
    i = Math.max(1, Math.ceil(n * t));
  let a = 0;
  const o = Object.keys(r)
    .map((s) => Number(s))
    .filter((s) => !Number.isNaN(s))
    .sort((s, l) => s - l);
  for (const s of o) {
    const l = String(s);
    if (((a += r[l] ?? 0), a >= i)) return l;
  }
  return o.length ? String(o[o.length - 1]) : "0";
}
function YI(e, t) {
  let r = 0,
    n = t.length - 1,
    i = t.length;
  for (; r <= n; ) {
    const a = (r + n) >> 1;
    e <= t[a] ? ((i = a), (n = a - 1)) : (r = a + 1);
  }
  return i;
}
function $I(e, t) {
  const r = g1[e] ?? [],
    n = r.length + 1,
    i = new Array(n).fill(0),
    a = Object.keys(t)
      .map((s) => [Number(s), t[s]])
      .filter(([s]) => !Number.isNaN(s))
      .sort((s, l) => s[0] - l[0]);
  for (const [s, l] of a) {
    const u = YI(s, r);
    i[u] += l;
  }
  const o = i.reduce((s, l) => s + l, 0);
  return i.map((s) => Number(((s / o) * 100).toFixed(2)));
}
function XI(e, t) {
  let r = Math.floor(e);
  if (!Number.isFinite(r) || r <= 0)
    return { sortedKeys: [], sortedValues: [] };
  const n = Object.entries(t);
  if (n.length === 0) return { sortedKeys: [], sortedValues: [] };
  (n.sort((f, h) => h[1] - f[1] || (f[0] < h[0] ? -1 : f[0] > h[0] ? 1 : 0)),
    r > n.length && (r = n.length));
  const i = n.slice(0, r),
    a = i.map(([f]) => f),
    o = i.map(([, f]) => f),
    s = n.reduce((f, [, h]) => f + h, 0),
    l = o.reduce((f, h) => f + h, 0);
  return (
    s - l && (a.push("其他"), o.push(s - l)),
    { sortedKeys: a, sortedValues: o }
  );
}
const qI = { class: "echart-card" },
  ZI = { class: "title" },
  KI = Je({
    __name: "EchartBarCardProp",
    props: { title: {}, time: {}, type: {}, buckets: {} },
    setup(e) {
      const t = e,
        { theme: r } = G_(),
        n = Jt(null);
      let i = null;
      const a = new ResizeObserver(() => {
        i?.resize();
      });
      Re([n0, fl, hl, vl, cl, dl]);
      const o = p1[t.type];
      function s() {
        const l = Rg[r.value];
        return {
          tooltip: {
            trigger: "axis",
            valueFormatter: (u) => u + "%",
            axisPointer: { type: "shadow" },
            backgroundColor: l.tooltipBg,
            textStyle: { color: l.tooltipText },
          },
          grid: { left: 40, right: 16, top: 24, bottom: 40 },
          xAxis: {
            type: "category",
            data: o,
            axisLine: { lineStyle: { color: l.axis } },
            axisTick: { show: l.tick },
            axisLabel: { color: l.label },
          },
          yAxis: {
            name: "占比（%）",
            type: "value",
            axisLabel: { formatter: "{value}%", color: l.label },
            nameTextStyle: {
              fontSize: 12,
              padding: [0, 0, 0, -40],
              color: l.label,
            },
            splitLine: { lineStyle: { type: "dashed", color: l.grid } },
            axisLine: { lineStyle: { color: l.axis } },
            axisTick: { show: l.tick },
          },
          series: [
            {
              name: "占比",
              type: "bar",
              barWidth: 24,
              data: $I(t.type, t.buckets),
              label: {
                show: !0,
                position: "top",
                formatter: "{c}%",
                fontSize: 12,
                color: l.label,
              },
              itemStyle: {
                borderRadius: [6, 6, 0, 0],
                shadowBlur: 8,
                shadowColor: l.shadow,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: l.barFrom },
                    { offset: 1, color: l.barTo },
                  ],
                },
              },
              emphasis: {
                itemStyle: { shadowBlur: 14, shadowColor: l.shadowEmph },
              },
              animationEasing: "cubicOut",
              animationDuration: 600,
            },
          ],
        };
      }
      return (
        Bs(
          () => t.time,
          () => {
            i !== null && i.setOption(s());
          },
        ),
        _i(() => {
          n.value && ((i = ul(n.value)), i.setOption(s()), a.observe(n.value));
        }),
        Ns(() => {
          i?.dispose();
        }),
        (l, u) => (
          Rt(),
          Yt("div", qI, [
            Z("div", ZI, xt(l.title), 1),
            Z("div", { ref_key: "cardDiv", ref: n, class: "chart" }, null, 512),
          ])
        )
      );
    },
  }),
  jI = { class: "echart-card" },
  QI = { class: "title" },
  JI = Je({
    __name: "EchartBarCardCount",
    props: { title: {}, time: {}, buckets: {} },
    setup(e) {
      const t = e,
        { theme: r } = G_(),
        n = Jt(null);
      let i = null;
      const a = new ResizeObserver(() => {
        i?.resize();
      });
      Re([n0, fl, hl, vl, cl, dl]);
      function o() {
        const s = XI(6, t.buckets),
          l = Rg[r.value];
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            formatter: (u) => {
              const f = Array.isArray(u) ? u[0] : u;
              return `${f.axisValue}<br/>${f.marker}${f.seriesName}：${f.data} 次`;
            },
          },
          grid: { left: 40, right: 16, top: 24, bottom: 40 },
          xAxis: {
            type: "category",
            data: s.sortedKeys,
            axisLine: { lineStyle: { color: l.axis } },
            axisTick: { show: l.tick },
            axisLabel: { color: l.label },
          },
          yAxis: {
            name: "次数（次）",
            type: "value",
            nameTextStyle: { fontSize: 12, padding: [0, 0, 0, -40] },
            splitLine: { lineStyle: { type: "dashed", color: l.grid } },
            axisLine: { lineStyle: { color: l.axis } },
            axisTick: { show: l.tick },
          },
          series: [
            {
              name: "次数",
              type: "bar",
              barWidth: 24,
              data: s.sortedValues,
              label: {
                show: !0,
                position: "top",
                formatter: "{c}",
                fontSize: 12,
                color: l.label,
              },
              itemStyle: {
                borderRadius: [6, 6, 0, 0],
                shadowBlur: 8,
                shadowColor: l.shadow,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: l.barFrom },
                    { offset: 1, color: l.barTo },
                  ],
                },
              },
              emphasis: {
                itemStyle: { shadowBlur: 14, shadowColor: l.shadowEmph },
              },
              animationEasing: "cubicOut",
              animationDuration: 600,
            },
          ],
        };
      }
      return (
        Bs(
          () => t.time,
          () => {
            i !== null && i.setOption(o());
          },
        ),
        _i(() => {
          n.value && ((i = ul(n.value)), i.setOption(o()), a.observe(n.value));
        }),
        Ns(() => {
          i?.dispose();
        }),
        (s, l) => (
          Rt(),
          Yt("div", jI, [
            Z("div", QI, xt(s.title), 1),
            Z("div", { ref_key: "cardDiv", ref: n, class: "chart" }, null, 512),
          ])
        )
      );
    },
  }),
  tP = { class: "echart-card" },
  eP = { class: "title" },
  rP = 60,
  nP = Je({
    __name: "EchartLineCard",
    props: {
      title: {},
      time: {},
      firstName: {},
      firstData: {},
      secondName: {},
      secondData: {},
    },
    setup(e) {
      const t = e,
        r = Jt(null);
      let n = null;
      const i = new ResizeObserver(() => {
        n?.resize();
      });
      Re([nD, fl, hl, vl, cl, dl]);
      const a = [],
        o = [],
        s = [];
      function l() {
        return {
          tooltip: { trigger: "axis" },
          grid: { left: 40, right: 16, top: 24, bottom: 40 },
          legend: { data: [t.firstName, t.secondName], bottom: 0 },
          xAxis: { type: "category", data: a },
          yAxis: [
            { type: "value", name: t.firstName },
            { type: "value", name: t.secondName },
          ],
          series: [
            {
              name: t.firstName,
              type: "line",
              smooth: !0,
              symbol: "none",
              data: o,
            },
            {
              name: t.secondName,
              type: "line",
              yAxisIndex: 1,
              smooth: !0,
              symbol: "none",
              data: s,
            },
          ],
        };
      }
      return (
        Bs(
          () => t.time,
          () => {
            n !== null &&
              (a.push(t.time),
              o.push(t.firstData),
              s.push(t.secondData),
              a.length > rP && (a.shift(), o.shift(), s.shift()),
              n.setOption(l()));
          },
        ),
        _i(() => {
          r.value && ((n = ul(r.value)), n.setOption(l()), i.observe(r.value));
        }),
        Ns(() => {
          n?.dispose();
        }),
        (u, f) => (
          Rt(),
          Yt("div", tP, [
            Z("div", eP, xt(u.title), 1),
            Z("div", { ref_key: "cardDiv", ref: r, class: "chart" }, null, 512),
          ])
        )
      );
    },
  }),
  iP = { class: "echart-card" },
  aP = { class: "title" },
  oP = Je({
    __name: "EchartPieCard",
    props: { title: {}, time: {}, data: {} },
    setup(e) {
      const t = e,
        r = Jt(null);
      let n = null;
      const i = new ResizeObserver(() => {
        n?.resize();
      });
      Re([ZD, fl, hl, vl, cl, dl]);
      function a() {
        return {
          tooltip: { trigger: "item" },
          legend: { top: "bottom" },
          series: [
            {
              type: "pie",
              radius: ["35%", "65%"],
              center: ["50%", "40%"],
              avoidLabelOverlap: !0,
              itemStyle: { borderRadius: 3, borderWidth: 1 },
              data: t.data,
            },
          ],
        };
      }
      return (
        Bs(
          () => t.time,
          () => {
            n !== null && n.setOption(a());
          },
        ),
        _i(() => {
          r.value && ((n = ul(r.value)), n.setOption(a()), i.observe(r.value));
        }),
        Ns(() => {
          n?.dispose();
        }),
        (o, s) => (
          Rt(),
          Yt("div", iP, [
            Z("div", aP, xt(o.title), 1),
            Z("div", { ref_key: "cardDiv", ref: r, class: "chart" }, null, 512),
          ])
        )
      );
    },
  }),
  sP = { class: "upstream-card" },
  lP = { class: "list" },
  uP = { class: "mono" },
  fP = Je({
    __name: "UpStreamCard",
    props: { info: {} },
    setup(e) {
      return (t, r) => (
        Rt(),
        Yt("div", sP, [
          r[0] || (r[0] = Z("div", { class: "title" }, "上游健康检查", -1)),
          Z("ul", lP, [
            (Rt(!0),
            Yt(
              ch,
              null,
              vh(
                t.info,
                (n) => (
                  Rt(),
                  Yt("li", { key: n.url }, [
                    Z(
                      "span",
                      { class: Ig(["dot", n.alive ? "ok" : "bad"]) },
                      null,
                      2,
                    ),
                    Z("span", uP, xt(n.url), 1),
                  ])
                ),
              ),
              128,
            )),
          ]),
        ])
      );
    },
  }),
  hP = { class: "rules-card" },
  cP = { class: "kv" },
  vP = Je({
    __name: "RulesCard",
    props: { info: {} },
    setup(e) {
      return (t, r) => (
        Rt(),
        Yt("div", hP, [
          r[4] || (r[4] = Z("div", { class: "title" }, "当前规则概览", -1)),
          Z("div", cP, [
            Z("div", null, [
              r[0] || (r[0] = Z("span", null, "关键词", -1)),
              Z("b", null, xt(t.info.keys), 1),
            ]),
            Z("div", null, [
              r[1] || (r[1] = Z("span", null, "TLD 屏蔽", -1)),
              Z("b", null, xt(t.info.tld), 1),
            ]),
            Z("div", null, [
              r[2] || (r[2] = Z("span", null, "黑名单规则", -1)),
              Z("b", null, xt(t.info.blackList), 1),
            ]),
            Z("div", null, [
              r[3] || (r[3] = Z("span", null, "白名单规则", -1)),
              Z("b", null, xt(t.info.whiteList), 1),
            ]),
          ]),
        ])
      );
    },
  }),
  dP = { class: "statistics-card" },
  pP = { class: "kv" },
  gP = Je({
    __name: "StatisticsCard",
    props: { info: {} },
    setup(e) {
      return (t, r) => (
        Rt(),
        Yt("div", dP, [
          r[3] || (r[3] = Z("div", { class: "title" }, "当前统计", -1)),
          Z("div", pP, [
            Z("div", null, [
              r[0] || (r[0] = Z("span", null, "总请求", -1)),
              Z("b", null, xt(t.info.total), 1),
            ]),
            Z("div", null, [
              r[1] || (r[1] = Z("span", null, "被拦截", -1)),
              Z("b", null, xt(t.info.blocked), 1),
            ]),
            Z("div", null, [
              r[2] || (r[2] = Z("span", null, "放行率", -1)),
              Z("b", null, xt(t.info.allowRate), 1),
            ]),
          ]),
        ])
      );
    },
  }),
  mP = { class: "log-card" },
  yP = { class: "logs" },
  _P = { class: "muted" },
  bP = { class: "mono" },
  SP = { class: "mono" },
  wP = { class: "muted" },
  xP = { key: 0, class: "tag" },
  TP = Je({
    __name: "LogCard",
    props: { info: {} },
    setup(e) {
      return (t, r) => (
        Rt(),
        Yt("div", mP, [
          r[0] || (r[0] = Z("div", { class: "title" }, "实时日志", -1)),
          Z("div", yP, [
            (Rt(!0),
            Yt(
              ch,
              null,
              vh(
                t.info,
                (n, i) => (
                  Rt(),
                  Yt("div", { key: i, class: "logline" }, [
                    Z("span", _P, xt(n.time), 1),
                    Z("span", bP, xt(n.proxy), 1),
                    Z("span", SP, xt(n.method), 1),
                    Z("span", null, xt(`${n.client} -> ${n.target}`), 1),
                    Z("span", wP, xt(`${n.sum}次`), 1),
                    Z(
                      "span",
                      { class: Ig(["badge", n.status >= 400 ? "bad" : "ok"]) },
                      xt(n.status),
                      3,
                    ),
                    n.blockReason
                      ? (Rt(), Yt("span", xP, xt(`拦截: ${n.blockReason}`), 1))
                      : Pg("", !0),
                  ])
                ),
              ),
              128,
            )),
          ]),
        ])
      );
    },
  });
function Vi(e) {
  return Math.floor(e).toLocaleString();
}
function CP(e) {
  const { counters: t, gauges: r, histograms: n } = e,
    i = t?.proxy_requests_total ?? [],
    a = r?.proxy_active_connections ?? [],
    o = n?.proxy_request_duration_seconds ?? [],
    s = [];
  (r?.proxy_qps && r?.proxy_qps.length
    ? s.push({
        key: "qps",
        title: "当前 QPS",
        value: Vi(r?.proxy_qps[0].value ?? 0),
        sub: `峰值 ${Vi(r?.proxy_qps_peak[0].value ?? 0)}`,
      })
    : s.push({ key: "qps", title: "当前 QPS", value: "0", sub: "峰值 0" }),
    s.push({
      key: "conns",
      title: "并发连接",
      value: Vi(a.reduce((b, w) => b + (w.value ?? 0), 0)),
      sub: `峰值 ${Vi(r?.proxy_active_connections_peak[0].value ?? 0)}`,
    }));
  let l = {};
  if (o && o.length) {
    const b = o.reduce((x, T) => x + (T.sum ?? 0), 0),
      w = o.reduce((x, T) => x + (T.count ?? 0), 0),
      S = {};
    for (const x in o[0].buckets) S[x] = 0;
    ((l = o.reduce((x, T) => {
      for (const D in T.buckets) x[D] += T.buckets[D];
      return x;
    }, S)),
      WI(l),
      s.push({
        key: "lat95",
        title: "p95 延迟",
        value: `${UI(0.95, w, l)} ms`,
        sub: `平均 ${(b / w).toFixed(2)} ms`,
      }));
  } else
    s.push({
      key: "lat95",
      title: "p95 延迟",
      value: "0 ms",
      sub: "平均 0 ms",
    });
  const u = i.filter((b) => b.labels && b.labels.status === m1.BLOCKED),
    f = i.reduce((b, w) => b + (w.value ?? 0), 0),
    h = u.reduce((b, w) => b + (w.value ?? 0), 0),
    v = h / f,
    c = {
      total: f,
      blocked: h,
      allowRate: `${(Number.isNaN(v) ? 100 : (1 - v) * 100).toFixed(2)}%`,
    };
  s.push({
    key: "blocked",
    title: "拦截数据",
    value: Vi(h),
    sub: `占比 ${Number.isNaN(v) ? 0 : (v * 100).toFixed(2)}%`,
  });
  const d = "其他",
    p = {};
  u.forEach((b) => {
    const w = Ec.find((S) => S === b.labels.blocked_reason) ?? d;
    p[w] = (p[w] || 0) + (b.value ?? 0);
  });
  const m = [];
  (Ec.forEach((b) => {
    p[b] && m.push({ name: b, value: p[b] });
  }),
    p[d] && m.push({ name: d, value: p[d] }));
  const g = i.filter((b) => b.labels && b.labels.target !== ""),
    y = g.reduce((b, w) => {
      const S = w.labels.target.split(":")[0];
      return ((b[S] = (b[S] || 0) + (w.value ?? 0)), b);
    }, {}),
    _ = g.map((b) => {
      const w = b.labels,
        S = Number(w.status);
      return {
        time: w.time,
        proxy: w.proxy,
        method: w.method,
        client: w.client,
        target: w.target,
        sum: b.value,
        status: Number.isNaN(S) ? 0 : S,
        blockReason: w.blocked_reason,
      };
    });
  return {
    metricsCardInfos: s,
    totalDelayBuckets: l,
    totalDominBuckets: y,
    blockedReasonData: m,
    statisticsCardInfo: c,
    logCardInfos: _,
  };
}
function DP(e) {
  return {
    rulesCardInfo: {
      blackList: e.blacklist?.length ?? 0,
      whiteList: e.whitelist?.length ?? 0,
      tld: e.tld?.length ?? 0,
      keys: e.keywords?.length ?? 0,
    },
  };
}
function MP(e) {
  return {
    upstreamCardInfos: e.map((t) => ({
      url: t.url,
      alive: t.alive,
      conns: t.conns,
    })),
  };
}
async function AP() {
  const e = await s1.getApiMetrics();
  return CP(e.data);
}
async function LP() {
  const e = await l1.getApiRules();
  return DP(e.data);
}
async function IP() {
  const e = await u1.getApiUpstreams();
  return MP(e.data);
}
const Bo = { getMetricsData: AP, getRulesInfo: LP, getUpstreamInfo: IP };
var PP =
    typeof global == "object" && global && global.Object === Object && global,
  kP = typeof self == "object" && self && self.Object === Object && self,
  H_ = PP || kP || Function("return this")(),
  Es = H_.Symbol,
  V_ = Object.prototype,
  RP = V_.hasOwnProperty,
  EP = V_.toString,
  Wi = Es ? Es.toStringTag : void 0;
function OP(e) {
  var t = RP.call(e, Wi),
    r = e[Wi];
  try {
    e[Wi] = void 0;
    var n = !0;
  } catch {}
  var i = EP.call(e);
  return (n && (t ? (e[Wi] = r) : delete e[Wi]), i);
}
var BP = Object.prototype,
  NP = BP.toString;
function FP(e) {
  return NP.call(e);
}
var zP = "[object Null]",
  GP = "[object Undefined]",
  Cg = Es ? Es.toStringTag : void 0;
function HP(e) {
  return e == null
    ? e === void 0
      ? GP
      : zP
    : Cg && Cg in Object(e)
      ? OP(e)
      : FP(e);
}
function VP(e) {
  return e != null && typeof e == "object";
}
var WP = "[object Symbol]";
function UP(e) {
  return typeof e == "symbol" || (VP(e) && HP(e) == WP);
}
var YP = /\s/;
function $P(e) {
  for (var t = e.length; t-- && YP.test(e.charAt(t)); );
  return t;
}
var XP = /^\s+/;
function qP(e) {
  return e && e.slice(0, $P(e) + 1).replace(XP, "");
}
function Os(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Dg = NaN,
  ZP = /^[-+]0x[0-9a-f]+$/i,
  KP = /^0b[01]+$/i,
  jP = /^0o[0-7]+$/i,
  QP = parseInt;
function Mg(e) {
  if (typeof e == "number") return e;
  if (UP(e)) return Dg;
  if (Os(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Os(t) ? t + "" : t;
  }
  if (typeof e != "string") return e === 0 ? e : +e;
  e = qP(e);
  var r = KP.test(e);
  return r || jP.test(e) ? QP(e.slice(2), r ? 2 : 8) : ZP.test(e) ? Dg : +e;
}
var Gu = function () {
    return H_.Date.now();
  },
  JP = "Expected a function",
  tk = Math.max,
  ek = Math.min;
function rk(e, t, r) {
  var n,
    i,
    a,
    o,
    s,
    l,
    u = 0,
    f = !1,
    h = !1,
    v = !0;
  if (typeof e != "function") throw new TypeError(JP);
  ((t = Mg(t) || 0),
    Os(r) &&
      ((f = !!r.leading),
      (h = "maxWait" in r),
      (a = h ? tk(Mg(r.maxWait) || 0, t) : a),
      (v = "trailing" in r ? !!r.trailing : v)));
  function c(S) {
    var x = n,
      T = i;
    return ((n = i = void 0), (u = S), (o = e.apply(T, x)), o);
  }
  function d(S) {
    return ((u = S), (s = setTimeout(g, t)), f ? c(S) : o);
  }
  function p(S) {
    var x = S - l,
      T = S - u,
      D = t - x;
    return h ? ek(D, a - T) : D;
  }
  function m(S) {
    var x = S - l,
      T = S - u;
    return l === void 0 || x >= t || x < 0 || (h && T >= a);
  }
  function g() {
    var S = Gu();
    if (m(S)) return y(S);
    s = setTimeout(g, p(S));
  }
  function y(S) {
    return ((s = void 0), v && n ? c(S) : ((n = i = void 0), o));
  }
  function _() {
    (s !== void 0 && clearTimeout(s), (u = 0), (n = l = i = s = void 0));
  }
  function b() {
    return s === void 0 ? o : y(Gu());
  }
  function w() {
    var S = Gu(),
      x = m(S);
    if (((n = arguments), (i = this), (l = S), x)) {
      if (s === void 0) return d(l);
      if (h) return (clearTimeout(s), (s = setTimeout(g, t)), c(l));
    }
    return (s === void 0 && (s = setTimeout(g, t)), o);
  }
  return ((w.cancel = _), (w.flush = b), w);
}
var nk = "Expected a function";
function Hu(e, t, r) {
  var n = !0,
    i = !0;
  if (typeof e != "function") throw new TypeError(nk);
  return (
    Os(r) &&
      ((n = "leading" in r ? !!r.leading : n),
      (i = "trailing" in r ? !!r.trailing : i)),
    rk(e, t, { leading: n, maxWait: t, trailing: i })
  );
}
const ik = { class: "dashboard" },
  ak = { class: "second-session" },
  sk = Je({
    __name: "DashBoardIndex",
    setup(e) {
      const t = Jt([]),
        r = Jt(""),
        n = Jt(),
        i = Jt(),
        a = Jt([]),
        o = Jt([]),
        s = Jt({ blackList: 0, whiteList: 0, tld: 0, keys: 0 }),
        l = Jt({ total: 0, blocked: 0, allowRate: "0%" }),
        u = Jt([]),
        f = Hu(() => {
          r.value = new Date(Date.now()).toLocaleTimeString();
        }, 2e3),
        h = Hu(async () => {
          const d = await Bo.getRulesInfo();
          s.value = d.rulesCardInfo;
        }, 5e3),
        v = Hu(async () => {
          const d = await Bo.getUpstreamInfo();
          o.value = d.upstreamCardInfos;
        }, 2e3);
      let c;
      return (
        _i(async () => {
          const d = await Bo.getMetricsData();
          ((t.value = d.metricsCardInfos),
            (n.value = d.totalDelayBuckets),
            (i.value = d.totalDominBuckets),
            (a.value = d.blockedReasonData),
            (l.value = d.statisticsCardInfo),
            (u.value = d.logCardInfos),
            f(),
            h(),
            v(),
            (c = setInterval(async () => {
              const p = await Bo.getMetricsData();
              ((t.value = p.metricsCardInfos),
                (n.value = p.totalDelayBuckets),
                (i.value = p.totalDominBuckets),
                (a.value = p.blockedReasonData),
                (l.value = p.statisticsCardInfo),
                (u.value = p.logCardInfos),
                f(),
                h(),
                v());
            }, 1500)));
        }),
        $_(() => {
          clearInterval(c);
        }),
        (d, p) => (
          Rt(),
          Yt("div", ik, [
            Z("section", null, [
              (Rt(!0),
              Yt(
                ch,
                null,
                vh(
                  t.value,
                  (m) => (
                    Rt(),
                    kc(d1, { key: m.key, info: m }, null, 8, ["info"])
                  ),
                ),
                128,
              )),
            ]),
            Z("section", ak, [
              t.value.length
                ? (Rt(),
                  kc(
                    nP,
                    {
                      key: 0,
                      title: `请求趋势（${t.value[0].title} / ${t.value[1].title}）`,
                      time: r.value,
                      "first-name": t.value[0].title,
                      "first-data": Number(t.value[0].value),
                      "second-name": t.value[1].title,
                      "second-data": Number(t.value[1].value),
                    },
                    null,
                    8,
                    [
                      "title",
                      "time",
                      "first-name",
                      "first-data",
                      "second-name",
                      "second-data",
                    ],
                  ))
                : Pg("", !0),
              qr(
                KI,
                {
                  title: "延迟分布(ms)",
                  time: r.value,
                  type: "delay",
                  buckets: n.value ?? {},
                },
                null,
                8,
                ["time", "buckets"],
              ),
              qr(fP, { info: o.value }, null, 8, ["info"]),
              qr(
                JI,
                {
                  title: "Top 访问域名",
                  time: r.value,
                  buckets: i.value ?? {},
                },
                null,
                8,
                ["time", "buckets"],
              ),
              qr(
                oP,
                { title: "拦截原因占比", time: r.value, data: a.value },
                null,
                8,
                ["time", "data"],
              ),
              qr(vP, { info: s.value }, null, 8, ["info"]),
            ]),
            Z("section", null, [
              qr(TP, { info: u.value }, null, 8, ["info"]),
              qr(gP, { info: l.value }, null, 8, ["info"]),
            ]),
          ])
        )
      );
    },
  });
export { sk as default };
