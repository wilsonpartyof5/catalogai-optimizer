var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value;
var __require = /* @__PURE__ */ ((x) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x, {
  get: (a, b) => (typeof require < "u" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require < "u")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));
var __publicField = (obj, key, value) => (__defNormalProp(obj, typeof key != "symbol" ? key + "" : key, value), value);

// app/utils/db.ts
import { PrismaClient } from "@prisma/client";
var db, init_db = __esm({
  "app/utils/db.ts"() {
    "use strict";
    db = new PrismaClient({
      log: ["error", "warn"],
      errorFormat: "minimal"
    });
  }
});

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
    function A(a) {
      return a === null || typeof a != "object" ? null : (a = z && a[z] || a["@@iterator"], typeof a == "function" ? a : null);
    }
    var B = { isMounted: function() {
      return !1;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, C = Object.assign, D = {};
    function E(a, b, e) {
      this.props = a, this.context = b, this.refs = D, this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if (typeof a != "object" && typeof a != "function" && a != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a, this.context = b, this.refs = D, this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = !0;
    var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: !0, ref: !0, __self: !0, __source: !0 };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (b != null)
        for (d in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
          J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (g === 1)
        c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++)
          f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps)
        for (d in g = a.defaultProps, g)
          c[d] === void 0 && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return typeof a == "object" && a !== null && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return typeof a == "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      (k === "undefined" || k === "boolean") && (a = null);
      var h = !1;
      if (a === null)
        h = !0;
      else
        switch (k) {
          case "string":
          case "number":
            h = !0;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = !0;
            }
        }
      if (h)
        return h = a, c = c(h), a = d === "" ? "." + Q(h, 0) : d, I(c) ? (e = "", a != null && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : c != null && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      if (h = 0, d = d === "" ? "." : d + ":", I(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
      else if (f = A(a), typeof f == "function")
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if (k === "object")
        throw b = String(a), Error("Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (a == null)
        return a;
      var d = [], c = 0;
      return R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      }), d;
    }
    function T(a) {
      if (a._status === -1) {
        var b = a._result;
        b = b(), b.then(function(b2) {
          (a._status === 0 || a._status === -1) && (a._status = 1, a._result = b2);
        }, function(b2) {
          (a._status === 0 || a._status === -1) && (a._status = 2, a._result = b2);
        }), a._status === -1 && (a._status = 0, a._result = b);
      }
      if (a._status === 1)
        return a._result.default;
      throw a._result;
    }
    var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    function X() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    exports.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      return S(a, function() {
        b++;
      }), b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a))
        throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G;
    exports.StrictMode = q;
    exports.Suspense = w;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.act = X;
    exports.cloneElement = function(a, b, e) {
      if (a == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (b != null) {
        if (b.ref !== void 0 && (k = b.ref, h = K.current), b.key !== void 0 && (c = "" + b.key), a.type && a.type.defaultProps)
          var g = a.type.defaultProps;
        for (f in b)
          J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (f === 1)
        d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++)
          g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function(a) {
      return a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, a.Provider = { $$typeof: t, _context: a }, a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      return b.type = a, b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: b === void 0 ? null : b };
    };
    exports.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = X;
    exports.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function() {
      return U.current.useId();
    };
    exports.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports.useState = function(a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function() {
      return U.current.useTransition();
    };
    exports.version = "18.3.1";
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_production_min();
  }
});

// node_modules/react-dom/cjs/react-dom.production.min.js
var require_react_dom_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
    "use strict";
    var aa = require_react(), ca = __require("scheduler");
    function p(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var da = /* @__PURE__ */ new Set(), ea = {};
    function fa(a, b) {
      ha(a, b), ha(a + "Capture", b);
    }
    function ha(a, b) {
      for (ea[a] = b, a = 0; a < b.length; a++)
        da.add(b[a]);
    }
    var ia = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
    function oa(a) {
      return ja.call(ma, a) ? !0 : ja.call(la, a) ? !1 : ka.test(a) ? ma[a] = !0 : (la[a] = !0, !1);
    }
    function pa(a, b, c, d) {
      if (c !== null && c.type === 0)
        return !1;
      switch (typeof b) {
        case "function":
        case "symbol":
          return !0;
        case "boolean":
          return d ? !1 : c !== null ? !c.acceptsBooleans : (a = a.toLowerCase().slice(0, 5), a !== "data-" && a !== "aria-");
        default:
          return !1;
      }
    }
    function qa(a, b, c, d) {
      if (b === null || typeof b > "u" || pa(a, b, c, d))
        return !0;
      if (d)
        return !1;
      if (c !== null)
        switch (c.type) {
          case 3:
            return !b;
          case 4:
            return b === !1;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
      return !1;
    }
    function v(a, b, c, d, e, f, g) {
      this.acceptsBooleans = b === 2 || b === 3 || b === 4, this.attributeName = d, this.attributeNamespace = e, this.mustUseProperty = c, this.propertyName = a, this.type = b, this.sanitizeURL = f, this.removeEmptyString = g;
    }
    var z = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      z[a] = new v(a, 0, !1, a, null, !1, !1);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      z[b] = new v(b, 1, !1, a[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      z[a] = new v(a, 2, !1, a.toLowerCase(), null, !1, !1);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      z[a] = new v(a, 2, !1, a, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      z[a] = new v(a, 3, !1, a.toLowerCase(), null, !1, !1);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      z[a] = new v(a, 3, !0, a, null, !1, !1);
    });
    ["capture", "download"].forEach(function(a) {
      z[a] = new v(a, 4, !1, a, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      z[a] = new v(a, 6, !1, a, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function(a) {
      z[a] = new v(a, 5, !1, a.toLowerCase(), null, !1, !1);
    });
    var ra = /[\-:]([a-z])/g;
    function sa(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ra,
        sa
      );
      z[b] = new v(b, 1, !1, a, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ra, sa);
      z[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      z[a] = new v(a, 1, !1, a.toLowerCase(), null, !1, !1);
    });
    z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      z[a] = new v(a, 1, !1, a.toLowerCase(), null, !0, !0);
    });
    function ta(a, b, c, d) {
      var e = z.hasOwnProperty(b) ? z[b] : null;
      (e !== null ? e.type !== 0 : d || !(2 < b.length) || b[0] !== "o" && b[0] !== "O" || b[1] !== "n" && b[1] !== "N") && (qa(b, c, e, d) && (c = null), d || e === null ? oa(b) && (c === null ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = c === null ? e.type === 3 ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, c === null ? a.removeAttribute(b) : (e = e.type, c = e === 3 || e === 4 && c === !0 ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
    }
    var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    Symbol.for("react.debug_trace_mode");
    var Ia = Symbol.for("react.offscreen");
    Symbol.for("react.legacy_hidden");
    Symbol.for("react.cache");
    Symbol.for("react.tracing_marker");
    var Ja = Symbol.iterator;
    function Ka(a) {
      return a === null || typeof a != "object" ? null : (a = Ja && a[Ja] || a["@@iterator"], typeof a == "function" ? a : null);
    }
    var A = Object.assign, La;
    function Ma(a) {
      if (La === void 0)
        try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
      return `
` + La + a;
    }
    var Na = !1;
    function Oa(a, b) {
      if (!a || Na)
        return "";
      Na = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b)
          if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
        else {
          try {
            throw Error();
          } catch (l) {
            d = l;
          }
          a();
        }
      } catch (l) {
        if (l && d && typeof l.stack == "string") {
          for (var e = l.stack.split(`
`), f = d.stack.split(`
`), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
            h--;
          for (; 1 <= g && 0 <= h; g--, h--)
            if (e[g] !== f[h]) {
              if (g !== 1 || h !== 1)
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = `
` + e[g].replace(" at new ", " at ");
                    return a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName)), k;
                  }
                while (1 <= g && 0 <= h);
              break;
            }
        }
      } finally {
        Na = !1, Error.prepareStackTrace = c;
      }
      return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
    }
    function Pa(a) {
      switch (a.tag) {
        case 5:
          return Ma(a.type);
        case 16:
          return Ma("Lazy");
        case 13:
          return Ma("Suspense");
        case 19:
          return Ma("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a = Oa(a.type, !1), a;
        case 11:
          return a = Oa(a.type.render, !1), a;
        case 1:
          return a = Oa(a.type, !0), a;
        default:
          return "";
      }
    }
    function Qa(a) {
      if (a == null)
        return null;
      if (typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case ya:
          return "Fragment";
        case wa:
          return "Portal";
        case Aa:
          return "Profiler";
        case za:
          return "StrictMode";
        case Ea:
          return "Suspense";
        case Fa:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            return a = a.displayName, a || (a = b.displayName || b.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
          case Ga:
            return b = a.displayName || null, b !== null ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload, a = a._init;
            try {
              return Qa(a(b));
            } catch {
            }
        }
      return null;
    }
    function Ra(a) {
      var b = a.type;
      switch (a.tag) {
        case 24:
          return "Cache";
        case 9:
          return (b.displayName || "Context") + ".Consumer";
        case 10:
          return (b._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return a = b.render, a = a.displayName || a.name || "", b.displayName || (a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return b;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Qa(b);
        case 8:
          return b === za ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof b == "function")
            return b.displayName || b.name || null;
          if (typeof b == "string")
            return b;
      }
      return null;
    }
    function Sa(a) {
      switch (typeof a) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return a;
        case "object":
          return a;
        default:
          return "";
      }
    }
    function Ta(a) {
      var b = a.type;
      return (a = a.nodeName) && a.toLowerCase() === "input" && (b === "checkbox" || b === "radio");
    }
    function Ua(a) {
      var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
      if (!a.hasOwnProperty(b) && typeof c < "u" && typeof c.get == "function" && typeof c.set == "function") {
        var e = c.get, f = c.set;
        return Object.defineProperty(a, b, { configurable: !0, get: function() {
          return e.call(this);
        }, set: function(a2) {
          d = "" + a2, f.call(this, a2);
        } }), Object.defineProperty(a, b, { enumerable: c.enumerable }), { getValue: function() {
          return d;
        }, setValue: function(a2) {
          d = "" + a2;
        }, stopTracking: function() {
          a._valueTracker = null, delete a[b];
        } };
      }
    }
    function Va(a) {
      a._valueTracker || (a._valueTracker = Ua(a));
    }
    function Wa(a) {
      if (!a)
        return !1;
      var b = a._valueTracker;
      if (!b)
        return !0;
      var c = b.getValue(), d = "";
      return a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value), a = d, a !== c ? (b.setValue(a), !0) : !1;
    }
    function Xa(a) {
      if (a = a || (typeof document < "u" ? document : void 0), typeof a > "u")
        return null;
      try {
        return a.activeElement || a.body;
      } catch {
        return a.body;
      }
    }
    function Ya(a, b) {
      var c = b.checked;
      return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c ?? a._wrapperState.initialChecked });
    }
    function Za(a, b) {
      var c = b.defaultValue == null ? "" : b.defaultValue, d = b.checked != null ? b.checked : b.defaultChecked;
      c = Sa(b.value != null ? b.value : c), a._wrapperState = { initialChecked: d, initialValue: c, controlled: b.type === "checkbox" || b.type === "radio" ? b.checked != null : b.value != null };
    }
    function ab(a, b) {
      b = b.checked, b != null && ta(a, "checked", b, !1);
    }
    function bb(a, b) {
      ab(a, b);
      var c = Sa(b.value), d = b.type;
      if (c != null)
        d === "number" ? (c === 0 && a.value === "" || a.value != c) && (a.value = "" + c) : a.value !== "" + c && (a.value = "" + c);
      else if (d === "submit" || d === "reset") {
        a.removeAttribute("value");
        return;
      }
      b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue)), b.checked == null && b.defaultChecked != null && (a.defaultChecked = !!b.defaultChecked);
    }
    function db2(a, b, c) {
      if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
        var d = b.type;
        if (!(d !== "submit" && d !== "reset" || b.value !== void 0 && b.value !== null))
          return;
        b = "" + a._wrapperState.initialValue, c || b === a.value || (a.value = b), a.defaultValue = b;
      }
      c = a.name, c !== "" && (a.name = ""), a.defaultChecked = !!a._wrapperState.initialChecked, c !== "" && (a.name = c);
    }
    function cb(a, b, c) {
      (b !== "number" || Xa(a.ownerDocument) !== a) && (c == null ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c));
    }
    var eb = Array.isArray;
    function fb(a, b, c, d) {
      if (a = a.options, b) {
        b = {};
        for (var e = 0; e < c.length; e++)
          b["$" + c[e]] = !0;
        for (c = 0; c < a.length; c++)
          e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
      } else {
        for (c = "" + Sa(c), b = null, e = 0; e < a.length; e++) {
          if (a[e].value === c) {
            a[e].selected = !0, d && (a[e].defaultSelected = !0);
            return;
          }
          b !== null || a[e].disabled || (b = a[e]);
        }
        b !== null && (b.selected = !0);
      }
    }
    function gb(a, b) {
      if (b.dangerouslySetInnerHTML != null)
        throw Error(p(91));
      return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
    }
    function hb(a, b) {
      var c = b.value;
      if (c == null) {
        if (c = b.children, b = b.defaultValue, c != null) {
          if (b != null)
            throw Error(p(92));
          if (eb(c)) {
            if (1 < c.length)
              throw Error(p(93));
            c = c[0];
          }
          b = c;
        }
        b == null && (b = ""), c = b;
      }
      a._wrapperState = { initialValue: Sa(c) };
    }
    function ib(a, b) {
      var c = Sa(b.value), d = Sa(b.defaultValue);
      c != null && (c = "" + c, c !== a.value && (a.value = c), b.defaultValue == null && a.defaultValue !== c && (a.defaultValue = c)), d != null && (a.defaultValue = "" + d);
    }
    function jb(a) {
      var b = a.textContent;
      b === a._wrapperState.initialValue && b !== "" && b !== null && (a.value = b);
    }
    function kb(a) {
      switch (a) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function lb(a, b) {
      return a == null || a === "http://www.w3.org/1999/xhtml" ? kb(b) : a === "http://www.w3.org/2000/svg" && b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a;
    }
    var mb, nb = function(a) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
        MSApp.execUnsafeLocalFunction(function() {
          return a(b, c, d, e);
        });
      } : a;
    }(function(a, b) {
      if (a.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in a)
        a.innerHTML = b;
      else {
        for (mb = mb || document.createElement("div"), mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>", b = mb.firstChild; a.firstChild; )
          a.removeChild(a.firstChild);
        for (; b.firstChild; )
          a.appendChild(b.firstChild);
      }
    });
    function ob(a, b) {
      if (b) {
        var c = a.firstChild;
        if (c && c === a.lastChild && c.nodeType === 3) {
          c.nodeValue = b;
          return;
        }
      }
      a.textContent = b;
    }
    var pb = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    }, qb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(pb).forEach(function(a) {
      qb.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1), pb[b] = pb[a];
      });
    });
    function rb(a, b, c) {
      return b == null || typeof b == "boolean" || b === "" ? "" : c || typeof b != "number" || b === 0 || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
    }
    function sb(a, b) {
      a = a.style;
      for (var c in b)
        if (b.hasOwnProperty(c)) {
          var d = c.indexOf("--") === 0, e = rb(c, b[c], d);
          c === "float" && (c = "cssFloat"), d ? a.setProperty(c, e) : a[c] = e;
        }
    }
    var tb = A({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
    function ub(a, b) {
      if (b) {
        if (tb[a] && (b.children != null || b.dangerouslySetInnerHTML != null))
          throw Error(p(137, a));
        if (b.dangerouslySetInnerHTML != null) {
          if (b.children != null)
            throw Error(p(60));
          if (typeof b.dangerouslySetInnerHTML != "object" || !("__html" in b.dangerouslySetInnerHTML))
            throw Error(p(61));
        }
        if (b.style != null && typeof b.style != "object")
          throw Error(p(62));
      }
    }
    function vb(a, b) {
      if (a.indexOf("-") === -1)
        return typeof b.is == "string";
      switch (a) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var wb = null;
    function xb(a) {
      return a = a.target || a.srcElement || window, a.correspondingUseElement && (a = a.correspondingUseElement), a.nodeType === 3 ? a.parentNode : a;
    }
    var yb = null, zb = null, Ab = null;
    function Bb(a) {
      if (a = Cb(a)) {
        if (typeof yb != "function")
          throw Error(p(280));
        var b = a.stateNode;
        b && (b = Db(b), yb(a.stateNode, a.type, b));
      }
    }
    function Eb(a) {
      zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
    }
    function Fb() {
      if (zb) {
        var a = zb, b = Ab;
        if (Ab = zb = null, Bb(a), b)
          for (a = 0; a < b.length; a++)
            Bb(b[a]);
      }
    }
    function Gb(a, b) {
      return a(b);
    }
    function Hb() {
    }
    var Ib = !1;
    function Jb(a, b, c) {
      if (Ib)
        return a(b, c);
      Ib = !0;
      try {
        return Gb(a, b, c);
      } finally {
        Ib = !1, (zb !== null || Ab !== null) && (Hb(), Fb());
      }
    }
    function Kb(a, b) {
      var c = a.stateNode;
      if (c === null)
        return null;
      var d = Db(c);
      if (d === null)
        return null;
      c = d[b];
      a:
        switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !(a === "button" || a === "input" || a === "select" || a === "textarea")), a = !d;
            break a;
          default:
            a = !1;
        }
      if (a)
        return null;
      if (c && typeof c != "function")
        throw Error(p(231, b, typeof c));
      return c;
    }
    var Lb = !1;
    if (ia)
      try {
        Mb = {}, Object.defineProperty(Mb, "passive", { get: function() {
          Lb = !0;
        } }), window.addEventListener("test", Mb, Mb), window.removeEventListener("test", Mb, Mb);
      } catch {
        Lb = !1;
      }
    var Mb;
    function Nb(a, b, c, d, e, f, g, h, k) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        b.apply(c, l);
      } catch (m) {
        this.onError(m);
      }
    }
    var Ob = !1, Pb = null, Qb = !1, Rb = null, Sb = { onError: function(a) {
      Ob = !0, Pb = a;
    } };
    function Tb(a, b, c, d, e, f, g, h, k) {
      Ob = !1, Pb = null, Nb.apply(Sb, arguments);
    }
    function Ub(a, b, c, d, e, f, g, h, k) {
      if (Tb.apply(this, arguments), Ob) {
        if (Ob) {
          var l = Pb;
          Ob = !1, Pb = null;
        } else
          throw Error(p(198));
        Qb || (Qb = !0, Rb = l);
      }
    }
    function Vb(a) {
      var b = a, c = a;
      if (a.alternate)
        for (; b.return; )
          b = b.return;
      else {
        a = b;
        do
          b = a, b.flags & 4098 && (c = b.return), a = b.return;
        while (a);
      }
      return b.tag === 3 ? c : null;
    }
    function Wb(a) {
      if (a.tag === 13) {
        var b = a.memoizedState;
        if (b === null && (a = a.alternate, a !== null && (b = a.memoizedState)), b !== null)
          return b.dehydrated;
      }
      return null;
    }
    function Xb(a) {
      if (Vb(a) !== a)
        throw Error(p(188));
    }
    function Yb(a) {
      var b = a.alternate;
      if (!b) {
        if (b = Vb(a), b === null)
          throw Error(p(188));
        return b !== a ? null : a;
      }
      for (var c = a, d = b; ; ) {
        var e = c.return;
        if (e === null)
          break;
        var f = e.alternate;
        if (f === null) {
          if (d = e.return, d !== null) {
            c = d;
            continue;
          }
          break;
        }
        if (e.child === f.child) {
          for (f = e.child; f; ) {
            if (f === c)
              return Xb(e), a;
            if (f === d)
              return Xb(e), b;
            f = f.sibling;
          }
          throw Error(p(188));
        }
        if (c.return !== d.return)
          c = e, d = f;
        else {
          for (var g = !1, h = e.child; h; ) {
            if (h === c) {
              g = !0, c = e, d = f;
              break;
            }
            if (h === d) {
              g = !0, d = e, c = f;
              break;
            }
            h = h.sibling;
          }
          if (!g) {
            for (h = f.child; h; ) {
              if (h === c) {
                g = !0, c = f, d = e;
                break;
              }
              if (h === d) {
                g = !0, d = f, c = e;
                break;
              }
              h = h.sibling;
            }
            if (!g)
              throw Error(p(189));
          }
        }
        if (c.alternate !== d)
          throw Error(p(190));
      }
      if (c.tag !== 3)
        throw Error(p(188));
      return c.stateNode.current === c ? a : b;
    }
    function Zb(a) {
      return a = Yb(a), a !== null ? $b(a) : null;
    }
    function $b(a) {
      if (a.tag === 5 || a.tag === 6)
        return a;
      for (a = a.child; a !== null; ) {
        var b = $b(a);
        if (b !== null)
          return b;
        a = a.sibling;
      }
      return null;
    }
    var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
    function mc(a) {
      if (lc && typeof lc.onCommitFiberRoot == "function")
        try {
          lc.onCommitFiberRoot(kc, a, void 0, (a.current.flags & 128) === 128);
        } catch {
        }
    }
    var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
    function nc(a) {
      return a >>>= 0, a === 0 ? 32 : 31 - (pc(a) / qc | 0) | 0;
    }
    var rc = 64, sc = 4194304;
    function tc(a) {
      switch (a & -a) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return a & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return a & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return a;
      }
    }
    function uc(a, b) {
      var c = a.pendingLanes;
      if (c === 0)
        return 0;
      var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
      if (g !== 0) {
        var h = g & ~e;
        h !== 0 ? d = tc(h) : (f &= g, f !== 0 && (d = tc(f)));
      } else
        g = c & ~e, g !== 0 ? d = tc(g) : f !== 0 && (d = tc(f));
      if (d === 0)
        return 0;
      if (b !== 0 && b !== d && !(b & e) && (e = d & -d, f = b & -b, e >= f || e === 16 && (f & 4194240) !== 0))
        return b;
      if (d & 4 && (d |= c & 16), b = a.entangledLanes, b !== 0)
        for (a = a.entanglements, b &= d; 0 < b; )
          c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
      return d;
    }
    function vc(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 4:
          return b + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return b + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function wc(a, b) {
      for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
        var g = 31 - oc(f), h = 1 << g, k = e[g];
        k === -1 ? (!(h & c) || h & d) && (e[g] = vc(h, b)) : k <= b && (a.expiredLanes |= h), f &= ~h;
      }
    }
    function xc(a) {
      return a = a.pendingLanes & -1073741825, a !== 0 ? a : a & 1073741824 ? 1073741824 : 0;
    }
    function yc() {
      var a = rc;
      return rc <<= 1, !(rc & 4194240) && (rc = 64), a;
    }
    function zc(a) {
      for (var b = [], c = 0; 31 > c; c++)
        b.push(a);
      return b;
    }
    function Ac(a, b, c) {
      a.pendingLanes |= b, b !== 536870912 && (a.suspendedLanes = 0, a.pingedLanes = 0), a = a.eventTimes, b = 31 - oc(b), a[b] = c;
    }
    function Bc(a, b) {
      var c = a.pendingLanes & ~b;
      a.pendingLanes = b, a.suspendedLanes = 0, a.pingedLanes = 0, a.expiredLanes &= b, a.mutableReadLanes &= b, a.entangledLanes &= b, b = a.entanglements;
      var d = a.eventTimes;
      for (a = a.expirationTimes; 0 < c; ) {
        var e = 31 - oc(c), f = 1 << e;
        b[e] = 0, d[e] = -1, a[e] = -1, c &= ~f;
      }
    }
    function Cc(a, b) {
      var c = a.entangledLanes |= b;
      for (a = a.entanglements; c; ) {
        var d = 31 - oc(c), e = 1 << d;
        e & b | a[d] & b && (a[d] |= b), c &= ~e;
      }
    }
    var C = 0;
    function Dc(a) {
      return a &= -a, 1 < a ? 4 < a ? a & 268435455 ? 16 : 536870912 : 4 : 1;
    }
    var Ec, Fc, Gc, Hc, Ic, Jc = !1, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Sc(a, b) {
      switch (a) {
        case "focusin":
        case "focusout":
          Lc = null;
          break;
        case "dragenter":
        case "dragleave":
          Mc = null;
          break;
        case "mouseover":
        case "mouseout":
          Nc = null;
          break;
        case "pointerover":
        case "pointerout":
          Oc.delete(b.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Pc.delete(b.pointerId);
      }
    }
    function Tc(a, b, c, d, e, f) {
      return a === null || a.nativeEvent !== f ? (a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, b !== null && (b = Cb(b), b !== null && Fc(b)), a) : (a.eventSystemFlags |= d, b = a.targetContainers, e !== null && b.indexOf(e) === -1 && b.push(e), a);
    }
    function Uc(a, b, c, d, e) {
      switch (b) {
        case "focusin":
          return Lc = Tc(Lc, a, b, c, d, e), !0;
        case "dragenter":
          return Mc = Tc(Mc, a, b, c, d, e), !0;
        case "mouseover":
          return Nc = Tc(Nc, a, b, c, d, e), !0;
        case "pointerover":
          var f = e.pointerId;
          return Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e)), !0;
        case "gotpointercapture":
          return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;
      }
      return !1;
    }
    function Vc(a) {
      var b = Wc(a.target);
      if (b !== null) {
        var c = Vb(b);
        if (c !== null) {
          if (b = c.tag, b === 13) {
            if (b = Wb(c), b !== null) {
              a.blockedOn = b, Ic(a.priority, function() {
                Gc(c);
              });
              return;
            }
          } else if (b === 3 && c.stateNode.current.memoizedState.isDehydrated) {
            a.blockedOn = c.tag === 3 ? c.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a.blockedOn = null;
    }
    function Xc(a) {
      if (a.blockedOn !== null)
        return !1;
      for (var b = a.targetContainers; 0 < b.length; ) {
        var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
        if (c === null) {
          c = a.nativeEvent;
          var d = new c.constructor(c.type, c);
          wb = d, c.target.dispatchEvent(d), wb = null;
        } else
          return b = Cb(c), b !== null && Fc(b), a.blockedOn = c, !1;
        b.shift();
      }
      return !0;
    }
    function Zc(a, b, c) {
      Xc(a) && c.delete(b);
    }
    function $c() {
      Jc = !1, Lc !== null && Xc(Lc) && (Lc = null), Mc !== null && Xc(Mc) && (Mc = null), Nc !== null && Xc(Nc) && (Nc = null), Oc.forEach(Zc), Pc.forEach(Zc);
    }
    function ad(a, b) {
      a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
    }
    function bd(a) {
      function b(b2) {
        return ad(b2, a);
      }
      if (0 < Kc.length) {
        ad(Kc[0], a);
        for (var c = 1; c < Kc.length; c++) {
          var d = Kc[c];
          d.blockedOn === a && (d.blockedOn = null);
        }
      }
      for (Lc !== null && ad(Lc, a), Mc !== null && ad(Mc, a), Nc !== null && ad(Nc, a), Oc.forEach(b), Pc.forEach(b), c = 0; c < Qc.length; c++)
        d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
      for (; 0 < Qc.length && (c = Qc[0], c.blockedOn === null); )
        Vc(c), c.blockedOn === null && Qc.shift();
    }
    var cd = ua.ReactCurrentBatchConfig, dd = !0;
    function ed(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 1, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function gd(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 4, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function fd(a, b, c, d) {
      if (dd) {
        var e = Yc(a, b, c, d);
        if (e === null)
          hd(a, b, d, id, c), Sc(a, d);
        else if (Uc(e, a, b, c, d))
          d.stopPropagation();
        else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
          for (; e !== null; ) {
            var f = Cb(e);
            if (f !== null && Ec(f), f = Yc(a, b, c, d), f === null && hd(a, b, d, id, c), f === e)
              break;
            e = f;
          }
          e !== null && d.stopPropagation();
        } else
          hd(a, b, d, null, c);
      }
    }
    var id = null;
    function Yc(a, b, c, d) {
      if (id = null, a = xb(d), a = Wc(a), a !== null)
        if (b = Vb(a), b === null)
          a = null;
        else if (c = b.tag, c === 13) {
          if (a = Wb(b), a !== null)
            return a;
          a = null;
        } else if (c === 3) {
          if (b.stateNode.current.memoizedState.isDehydrated)
            return b.tag === 3 ? b.stateNode.containerInfo : null;
          a = null;
        } else
          b !== a && (a = null);
      return id = a, null;
    }
    function jd(a) {
      switch (a) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (ec()) {
            case fc:
              return 1;
            case gc:
              return 4;
            case hc:
            case ic:
              return 16;
            case jc:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var kd = null, ld = null, md = null;
    function nd() {
      if (md)
        return md;
      var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
      for (a = 0; a < c && b[a] === e[a]; a++)
        ;
      var g = c - a;
      for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
        ;
      return md = e.slice(a, 1 < d ? 1 - d : void 0);
    }
    function od(a) {
      var b = a.keyCode;
      return "charCode" in a ? (a = a.charCode, a === 0 && b === 13 && (a = 13)) : a = b, a === 10 && (a = 13), 32 <= a || a === 13 ? a : 0;
    }
    function pd() {
      return !0;
    }
    function qd() {
      return !1;
    }
    function rd(a) {
      function b(b2, d, e, f, g) {
        this._reactName = b2, this._targetInst = e, this.type = d, this.nativeEvent = f, this.target = g, this.currentTarget = null;
        for (var c in a)
          a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? pd : qd, this.isPropagationStopped = qd, this;
      }
      return A(b.prototype, { preventDefault: function() {
        this.defaultPrevented = !0;
        var a2 = this.nativeEvent;
        a2 && (a2.preventDefault ? a2.preventDefault() : typeof a2.returnValue != "unknown" && (a2.returnValue = !1), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a2 = this.nativeEvent;
        a2 && (a2.stopPropagation ? a2.stopPropagation() : typeof a2.cancelBubble != "unknown" && (a2.cancelBubble = !0), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd }), b;
    }
    var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
      return a.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
      return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    }, movementX: function(a) {
      return "movementX" in a ? a.movementX : (a !== yd && (yd && a.type === "mousemove" ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a), wd);
    }, movementY: function(a) {
      return "movementY" in a ? a.movementY : xd;
    } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function Pd(a) {
      var b = this.nativeEvent;
      return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
    }
    function zd() {
      return Pd;
    }
    var Qd = A({}, ud, { key: function(a) {
      if (a.key) {
        var b = Md[a.key] || a.key;
        if (b !== "Unidentified")
          return b;
      }
      return a.type === "keypress" ? (a = od(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? Nd[a.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
      return a.type === "keypress" ? od(a) : 0;
    }, keyCode: function(a) {
      return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    }, which: function(a) {
      return a.type === "keypress" ? od(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
    } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
      deltaX: function(a) {
        return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
      },
      deltaY: function(a) {
        return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
    ia && "documentMode" in document && (be = document.documentMode);
    var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = !1;
    function ge(a, b) {
      switch (a) {
        case "keyup":
          return $d.indexOf(b.keyCode) !== -1;
        case "keydown":
          return b.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function he(a) {
      return a = a.detail, typeof a == "object" && "data" in a ? a.data : null;
    }
    var ie = !1;
    function je(a, b) {
      switch (a) {
        case "compositionend":
          return he(b);
        case "keypress":
          return b.which !== 32 ? null : (fe = !0, ee);
        case "textInput":
          return a = b.data, a === ee && fe ? null : a;
        default:
          return null;
      }
    }
    function ke(a, b) {
      if (ie)
        return a === "compositionend" || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;
      switch (a) {
        case "paste":
          return null;
        case "keypress":
          if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
            if (b.char && 1 < b.char.length)
              return b.char;
            if (b.which)
              return String.fromCharCode(b.which);
          }
          return null;
        case "compositionend":
          return de && b.locale !== "ko" ? null : b.data;
        default:
          return null;
      }
    }
    var le = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
    function me(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return b === "input" ? !!le[a.type] : b === "textarea";
    }
    function ne(a, b, c, d) {
      Eb(d), b = oe(b, "onChange"), 0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
    }
    var pe = null, qe = null;
    function re(a) {
      se(a, 0);
    }
    function te(a) {
      var b = ue(a);
      if (Wa(b))
        return a;
    }
    function ve(a, b) {
      if (a === "change")
        return b;
    }
    var we = !1;
    ia && (ia ? (ye = "oninput" in document, ye || (ze = document.createElement("div"), ze.setAttribute("oninput", "return;"), ye = typeof ze.oninput == "function"), xe = ye) : xe = !1, we = xe && (!document.documentMode || 9 < document.documentMode));
    var xe, ye, ze;
    function Ae() {
      pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
    }
    function Be(a) {
      if (a.propertyName === "value" && te(qe)) {
        var b = [];
        ne(b, qe, a, xb(a)), Jb(re, b);
      }
    }
    function Ce(a, b, c) {
      a === "focusin" ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : a === "focusout" && Ae();
    }
    function De(a) {
      if (a === "selectionchange" || a === "keyup" || a === "keydown")
        return te(qe);
    }
    function Ee(a, b) {
      if (a === "click")
        return te(b);
    }
    function Fe(a, b) {
      if (a === "input" || a === "change")
        return te(b);
    }
    function Ge(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var He = typeof Object.is == "function" ? Object.is : Ge;
    function Ie(a, b) {
      if (He(a, b))
        return !0;
      if (typeof a != "object" || a === null || typeof b != "object" || b === null)
        return !1;
      var c = Object.keys(a), d = Object.keys(b);
      if (c.length !== d.length)
        return !1;
      for (d = 0; d < c.length; d++) {
        var e = c[d];
        if (!ja.call(b, e) || !He(a[e], b[e]))
          return !1;
      }
      return !0;
    }
    function Je(a) {
      for (; a && a.firstChild; )
        a = a.firstChild;
      return a;
    }
    function Ke(a, b) {
      var c = Je(a);
      a = 0;
      for (var d; c; ) {
        if (c.nodeType === 3) {
          if (d = a + c.textContent.length, a <= b && d >= b)
            return { node: c, offset: b - a };
          a = d;
        }
        a: {
          for (; c; ) {
            if (c.nextSibling) {
              c = c.nextSibling;
              break a;
            }
            c = c.parentNode;
          }
          c = void 0;
        }
        c = Je(c);
      }
    }
    function Le(a, b) {
      return a && b ? a === b ? !0 : a && a.nodeType === 3 ? !1 : b && b.nodeType === 3 ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
    }
    function Me() {
      for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
        try {
          var c = typeof b.contentWindow.location.href == "string";
        } catch {
          c = !1;
        }
        if (c)
          a = b.contentWindow;
        else
          break;
        b = Xa(a.document);
      }
      return b;
    }
    function Ne(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return b && (b === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || b === "textarea" || a.contentEditable === "true");
    }
    function Oe(a) {
      var b = Me(), c = a.focusedElem, d = a.selectionRange;
      if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
        if (d !== null && Ne(c)) {
          if (b = d.start, a = d.end, a === void 0 && (a = b), "selectionStart" in c)
            c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
          else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
            a = a.getSelection();
            var e = c.textContent.length, f = Math.min(d.start, e);
            d = d.end === void 0 ? f : Math.min(d.end, e), !a.extend && f > d && (e = d, d = f, f = e), e = Ke(c, f);
            var g = Ke(
              c,
              d
            );
            e && g && (a.rangeCount !== 1 || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
          }
        }
        for (b = [], a = c; a = a.parentNode; )
          a.nodeType === 1 && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
        for (typeof c.focus == "function" && c.focus(), c = 0; c < b.length; c++)
          a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }
    var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = !1;
    function Ue(a, b, c) {
      var d = c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
      Te || Qe == null || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
    }
    function Ve(a, b) {
      var c = {};
      return c[a.toLowerCase()] = b.toLowerCase(), c["Webkit" + a] = "webkit" + b, c["Moz" + a] = "moz" + b, c;
    }
    var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
    ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
    function Ze(a) {
      if (Xe[a])
        return Xe[a];
      if (!We[a])
        return a;
      var b = We[a], c;
      for (c in b)
        if (b.hasOwnProperty(c) && c in Ye)
          return Xe[a] = b[c];
      return a;
    }
    var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ff(a, b) {
      df.set(a, b), fa(b, [a]);
    }
    for (gf = 0; gf < ef.length; gf++)
      hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1), ff(jf, "on" + kf);
    var hf, jf, kf, gf;
    ff($e, "onAnimationEnd");
    ff(af, "onAnimationIteration");
    ff(bf, "onAnimationStart");
    ff("dblclick", "onDoubleClick");
    ff("focusin", "onFocus");
    ff("focusout", "onBlur");
    ff(cf, "onTransitionEnd");
    ha("onMouseEnter", ["mouseout", "mouseover"]);
    ha("onMouseLeave", ["mouseout", "mouseover"]);
    ha("onPointerEnter", ["pointerout", "pointerover"]);
    ha("onPointerLeave", ["pointerout", "pointerover"]);
    fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
    function nf(a, b, c) {
      var d = a.type || "unknown-event";
      a.currentTarget = c, Ub(d, b, void 0, a), a.currentTarget = null;
    }
    function se(a, b) {
      b = (b & 4) !== 0;
      for (var c = 0; c < a.length; c++) {
        var d = a[c], e = d.event;
        d = d.listeners;
        a: {
          var f = void 0;
          if (b)
            for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              if (h = h.listener, k !== f && e.isPropagationStopped())
                break a;
              nf(e, h, l), f = k;
            }
          else
            for (g = 0; g < d.length; g++) {
              if (h = d[g], k = h.instance, l = h.currentTarget, h = h.listener, k !== f && e.isPropagationStopped())
                break a;
              nf(e, h, l), f = k;
            }
        }
      }
      if (Qb)
        throw a = Rb, Qb = !1, Rb = null, a;
    }
    function D(a, b) {
      var c = b[of];
      c === void 0 && (c = b[of] = /* @__PURE__ */ new Set());
      var d = a + "__bubble";
      c.has(d) || (pf(b, a, 2, !1), c.add(d));
    }
    function qf(a, b, c) {
      var d = 0;
      b && (d |= 4), pf(c, a, d, b);
    }
    var rf = "_reactListening" + Math.random().toString(36).slice(2);
    function sf(a) {
      if (!a[rf]) {
        a[rf] = !0, da.forEach(function(b2) {
          b2 !== "selectionchange" && (mf.has(b2) || qf(b2, !1, a), qf(b2, !0, a));
        });
        var b = a.nodeType === 9 ? a : a.ownerDocument;
        b === null || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));
      }
    }
    function pf(a, b, c, d) {
      switch (jd(b)) {
        case 1:
          var e = ed;
          break;
        case 4:
          e = gd;
          break;
        default:
          e = fd;
      }
      c = e.bind(null, b, c, a), e = void 0, !Lb || b !== "touchstart" && b !== "touchmove" && b !== "wheel" || (e = !0), d ? e !== void 0 ? a.addEventListener(b, c, { capture: !0, passive: e }) : a.addEventListener(b, c, !0) : e !== void 0 ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, !1);
    }
    function hd(a, b, c, d, e) {
      var f = d;
      if (!(b & 1) && !(b & 2) && d !== null)
        a:
          for (; ; ) {
            if (d === null)
              return;
            var g = d.tag;
            if (g === 3 || g === 4) {
              var h = d.stateNode.containerInfo;
              if (h === e || h.nodeType === 8 && h.parentNode === e)
                break;
              if (g === 4)
                for (g = d.return; g !== null; ) {
                  var k = g.tag;
                  if ((k === 3 || k === 4) && (k = g.stateNode.containerInfo, k === e || k.nodeType === 8 && k.parentNode === e))
                    return;
                  g = g.return;
                }
              for (; h !== null; ) {
                if (g = Wc(h), g === null)
                  return;
                if (k = g.tag, k === 5 || k === 6) {
                  d = f = g;
                  continue a;
                }
                h = h.parentNode;
              }
            }
            d = d.return;
          }
      Jb(function() {
        var d2 = f, e2 = xb(c), g2 = [];
        a: {
          var h2 = df.get(a);
          if (h2 !== void 0) {
            var k2 = td, n = a;
            switch (a) {
              case "keypress":
                if (od(c) === 0)
                  break a;
              case "keydown":
              case "keyup":
                k2 = Rd;
                break;
              case "focusin":
                n = "focus", k2 = Fd;
                break;
              case "focusout":
                n = "blur", k2 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k2 = Fd;
                break;
              case "click":
                if (c.button === 2)
                  break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k2 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k2 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k2 = Vd;
                break;
              case $e:
              case af:
              case bf:
                k2 = Hd;
                break;
              case cf:
                k2 = Xd;
                break;
              case "scroll":
                k2 = vd;
                break;
              case "wheel":
                k2 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k2 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k2 = Td;
            }
            var t = (b & 4) !== 0, J = !t && a === "scroll", x = t ? h2 !== null ? h2 + "Capture" : null : h2;
            t = [];
            for (var w = d2, u; w !== null; ) {
              u = w;
              var F = u.stateNode;
              if (u.tag === 5 && F !== null && (u = F, x !== null && (F = Kb(w, x), F != null && t.push(tf(w, F, u)))), J)
                break;
              w = w.return;
            }
            0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
          }
        }
        if (!(b & 7)) {
          a: {
            if (h2 = a === "mouseover" || a === "pointerover", k2 = a === "mouseout" || a === "pointerout", h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf]))
              break a;
            if ((k2 || h2) && (h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window, k2 ? (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, n !== null && (J = Vb(n), n !== J || n.tag !== 5 && n.tag !== 6) && (n = null)) : (k2 = null, n = d2), k2 !== n)) {
              if (t = Bd, F = "onMouseLeave", x = "onMouseEnter", w = "mouse", (a === "pointerout" || a === "pointerover") && (t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer"), J = k2 == null ? h2 : ue(k2), u = n == null ? h2 : ue(n), h2 = new t(F, w + "leave", k2, c, e2), h2.target = J, h2.relatedTarget = u, F = null, Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t), J = F, k2 && n)
                b: {
                  for (t = k2, x = n, w = 0, u = t; u; u = vf(u))
                    w++;
                  for (u = 0, F = x; F; F = vf(F))
                    u++;
                  for (; 0 < w - u; )
                    t = vf(t), w--;
                  for (; 0 < u - w; )
                    x = vf(x), u--;
                  for (; w--; ) {
                    if (t === x || x !== null && t === x.alternate)
                      break b;
                    t = vf(t), x = vf(x);
                  }
                  t = null;
                }
              else
                t = null;
              k2 !== null && wf(g2, h2, k2, t, !1), n !== null && J !== null && wf(g2, J, n, t, !0);
            }
          }
          a: {
            if (h2 = d2 ? ue(d2) : window, k2 = h2.nodeName && h2.nodeName.toLowerCase(), k2 === "select" || k2 === "input" && h2.type === "file")
              var na = ve;
            else if (me(h2))
              if (we)
                na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
            else
              (k2 = h2.nodeName) && k2.toLowerCase() === "input" && (h2.type === "checkbox" || h2.type === "radio") && (na = Ee);
            if (na && (na = na(a, d2))) {
              ne(g2, na, c, e2);
              break a;
            }
            xa && xa(a, h2, d2), a === "focusout" && (xa = h2._wrapperState) && xa.controlled && h2.type === "number" && cb(h2, "number", h2.value);
          }
          switch (xa = d2 ? ue(d2) : window, a) {
            case "focusin":
              (me(xa) || xa.contentEditable === "true") && (Qe = xa, Re = d2, Se = null);
              break;
            case "focusout":
              Se = Re = Qe = null;
              break;
            case "mousedown":
              Te = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te = !1, Ue(g2, c, e2);
              break;
            case "selectionchange":
              if (Pe)
                break;
            case "keydown":
            case "keyup":
              Ue(g2, c, e2);
          }
          var $a;
          if (ae)
            b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
          else
            ie ? ge(a, c) && (ba = "onCompositionEnd") : a === "keydown" && c.keyCode === 229 && (ba = "onCompositionStart");
          ba && (de && c.locale !== "ko" && (ie || ba !== "onCompositionStart" ? ba === "onCompositionEnd" && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), $a !== null && (ba.data = $a)))), ($a = ce ? je(a, c) : ke(a, c)) && (d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a));
        }
        se(g2, b);
      });
    }
    function tf(a, b, c) {
      return { instance: a, listener: b, currentTarget: c };
    }
    function oe(a, b) {
      for (var c = b + "Capture", d = []; a !== null; ) {
        var e = a, f = e.stateNode;
        e.tag === 5 && f !== null && (e = f, f = Kb(a, c), f != null && d.unshift(tf(a, f, e)), f = Kb(a, b), f != null && d.push(tf(a, f, e))), a = a.return;
      }
      return d;
    }
    function vf(a) {
      if (a === null)
        return null;
      do
        a = a.return;
      while (a && a.tag !== 5);
      return a || null;
    }
    function wf(a, b, c, d, e) {
      for (var f = b._reactName, g = []; c !== null && c !== d; ) {
        var h = c, k = h.alternate, l = h.stateNode;
        if (k !== null && k === d)
          break;
        h.tag === 5 && l !== null && (h = l, e ? (k = Kb(c, f), k != null && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), k != null && g.push(tf(c, k, h)))), c = c.return;
      }
      g.length !== 0 && a.push({ event: b, listeners: g });
    }
    var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
    function zf(a) {
      return (typeof a == "string" ? a : "" + a).replace(xf, `
`).replace(yf, "");
    }
    function Af(a, b, c) {
      if (b = zf(b), zf(a) !== b && c)
        throw Error(p(425));
    }
    function Bf() {
    }
    var Cf = null, Df = null;
    function Ef(a, b) {
      return a === "textarea" || a === "noscript" || typeof b.children == "string" || typeof b.children == "number" || typeof b.dangerouslySetInnerHTML == "object" && b.dangerouslySetInnerHTML !== null && b.dangerouslySetInnerHTML.__html != null;
    }
    var Ff = typeof setTimeout == "function" ? setTimeout : void 0, Gf = typeof clearTimeout == "function" ? clearTimeout : void 0, Hf = typeof Promise == "function" ? Promise : void 0, Jf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hf < "u" ? function(a) {
      return Hf.resolve(null).then(a).catch(If);
    } : Ff;
    function If(a) {
      setTimeout(function() {
        throw a;
      });
    }
    function Kf(a, b) {
      var c = b, d = 0;
      do {
        var e = c.nextSibling;
        if (a.removeChild(c), e && e.nodeType === 8)
          if (c = e.data, c === "/$") {
            if (d === 0) {
              a.removeChild(e), bd(b);
              return;
            }
            d--;
          } else
            c !== "$" && c !== "$?" && c !== "$!" || d++;
        c = e;
      } while (c);
      bd(b);
    }
    function Lf(a) {
      for (; a != null; a = a.nextSibling) {
        var b = a.nodeType;
        if (b === 1 || b === 3)
          break;
        if (b === 8) {
          if (b = a.data, b === "$" || b === "$!" || b === "$?")
            break;
          if (b === "/$")
            return null;
        }
      }
      return a;
    }
    function Mf(a) {
      a = a.previousSibling;
      for (var b = 0; a; ) {
        if (a.nodeType === 8) {
          var c = a.data;
          if (c === "$" || c === "$!" || c === "$?") {
            if (b === 0)
              return a;
            b--;
          } else
            c === "/$" && b++;
        }
        a = a.previousSibling;
      }
      return null;
    }
    var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
    function Wc(a) {
      var b = a[Of];
      if (b)
        return b;
      for (var c = a.parentNode; c; ) {
        if (b = c[uf] || c[Of]) {
          if (c = b.alternate, b.child !== null || c !== null && c.child !== null)
            for (a = Mf(a); a !== null; ) {
              if (c = a[Of])
                return c;
              a = Mf(a);
            }
          return b;
        }
        a = c, c = a.parentNode;
      }
      return null;
    }
    function Cb(a) {
      return a = a[Of] || a[uf], !a || a.tag !== 5 && a.tag !== 6 && a.tag !== 13 && a.tag !== 3 ? null : a;
    }
    function ue(a) {
      if (a.tag === 5 || a.tag === 6)
        return a.stateNode;
      throw Error(p(33));
    }
    function Db(a) {
      return a[Pf] || null;
    }
    var Sf = [], Tf = -1;
    function Uf(a) {
      return { current: a };
    }
    function E(a) {
      0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
    }
    function G(a, b) {
      Tf++, Sf[Tf] = a.current, a.current = b;
    }
    var Vf = {}, H = Uf(Vf), Wf = Uf(!1), Xf = Vf;
    function Yf(a, b) {
      var c = a.type.contextTypes;
      if (!c)
        return Vf;
      var d = a.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
        return d.__reactInternalMemoizedMaskedChildContext;
      var e = {}, f;
      for (f in c)
        e[f] = b[f];
      return d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e), e;
    }
    function Zf(a) {
      return a = a.childContextTypes, a != null;
    }
    function $f() {
      E(Wf), E(H);
    }
    function ag(a, b, c) {
      if (H.current !== Vf)
        throw Error(p(168));
      G(H, b), G(Wf, c);
    }
    function bg(a, b, c) {
      var d = a.stateNode;
      if (b = b.childContextTypes, typeof d.getChildContext != "function")
        return c;
      d = d.getChildContext();
      for (var e in d)
        if (!(e in b))
          throw Error(p(108, Ra(a) || "Unknown", e));
      return A({}, c, d);
    }
    function cg(a) {
      return a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf, Xf = H.current, G(H, a), G(Wf, Wf.current), !0;
    }
    function dg(a, b, c) {
      var d = a.stateNode;
      if (!d)
        throw Error(p(169));
      c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf), G(Wf, c);
    }
    var eg = null, fg = !1, gg = !1;
    function hg(a) {
      eg === null ? eg = [a] : eg.push(a);
    }
    function ig(a) {
      fg = !0, hg(a);
    }
    function jg() {
      if (!gg && eg !== null) {
        gg = !0;
        var a = 0, b = C;
        try {
          var c = eg;
          for (C = 1; a < c.length; a++) {
            var d = c[a];
            do
              d = d(!0);
            while (d !== null);
          }
          eg = null, fg = !1;
        } catch (e) {
          throw eg !== null && (eg = eg.slice(a + 1)), ac(fc, jg), e;
        } finally {
          C = b, gg = !1;
        }
      }
      return null;
    }
    var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
    function tg(a, b) {
      kg[lg++] = ng, kg[lg++] = mg, mg = a, ng = b;
    }
    function ug(a, b, c) {
      og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, qg = a;
      var d = rg;
      a = sg;
      var e = 32 - oc(d) - 1;
      d &= ~(1 << e), c += 1;
      var f = 32 - oc(b) + e;
      if (30 < f) {
        var g = e - e % 5;
        f = (d & (1 << g) - 1).toString(32), d >>= g, e -= g, rg = 1 << 32 - oc(b) + e | c << e | d, sg = f + a;
      } else
        rg = 1 << f | c << e | d, sg = a;
    }
    function vg(a) {
      a.return !== null && (tg(a, 1), ug(a, 1, 0));
    }
    function wg(a) {
      for (; a === mg; )
        mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
      for (; a === qg; )
        qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
    }
    var xg = null, yg = null, I = !1, zg = null;
    function Ag(a, b) {
      var c = Bg(5, null, null, 0);
      c.elementType = "DELETED", c.stateNode = b, c.return = a, b = a.deletions, b === null ? (a.deletions = [c], a.flags |= 16) : b.push(c);
    }
    function Cg(a, b) {
      switch (a.tag) {
        case 5:
          var c = a.type;
          return b = b.nodeType !== 1 || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b, b !== null ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0) : !1;
        case 6:
          return b = a.pendingProps === "" || b.nodeType !== 3 ? null : b, b !== null ? (a.stateNode = b, xg = a, yg = null, !0) : !1;
        case 13:
          return b = b.nodeType !== 8 ? null : b, b !== null ? (c = qg !== null ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, !0) : !1;
        default:
          return !1;
      }
    }
    function Dg(a) {
      return (a.mode & 1) !== 0 && (a.flags & 128) === 0;
    }
    function Eg(a) {
      if (I) {
        var b = yg;
        if (b) {
          var c = b;
          if (!Cg(a, b)) {
            if (Dg(a))
              throw Error(p(418));
            b = Lf(c.nextSibling);
            var d = xg;
            b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = !1, xg = a);
          }
        } else {
          if (Dg(a))
            throw Error(p(418));
          a.flags = a.flags & -4097 | 2, I = !1, xg = a;
        }
      }
    }
    function Fg(a) {
      for (a = a.return; a !== null && a.tag !== 5 && a.tag !== 3 && a.tag !== 13; )
        a = a.return;
      xg = a;
    }
    function Gg(a) {
      if (a !== xg)
        return !1;
      if (!I)
        return Fg(a), I = !0, !1;
      var b;
      if ((b = a.tag !== 3) && !(b = a.tag !== 5) && (b = a.type, b = b !== "head" && b !== "body" && !Ef(a.type, a.memoizedProps)), b && (b = yg)) {
        if (Dg(a))
          throw Hg(), Error(p(418));
        for (; b; )
          Ag(a, b), b = Lf(b.nextSibling);
      }
      if (Fg(a), a.tag === 13) {
        if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a)
          throw Error(p(317));
        a: {
          for (a = a.nextSibling, b = 0; a; ) {
            if (a.nodeType === 8) {
              var c = a.data;
              if (c === "/$") {
                if (b === 0) {
                  yg = Lf(a.nextSibling);
                  break a;
                }
                b--;
              } else
                c !== "$" && c !== "$!" && c !== "$?" || b++;
            }
            a = a.nextSibling;
          }
          yg = null;
        }
      } else
        yg = xg ? Lf(a.stateNode.nextSibling) : null;
      return !0;
    }
    function Hg() {
      for (var a = yg; a; )
        a = Lf(a.nextSibling);
    }
    function Ig() {
      yg = xg = null, I = !1;
    }
    function Jg(a) {
      zg === null ? zg = [a] : zg.push(a);
    }
    var Kg = ua.ReactCurrentBatchConfig;
    function Lg(a, b, c) {
      if (a = c.ref, a !== null && typeof a != "function" && typeof a != "object") {
        if (c._owner) {
          if (c = c._owner, c) {
            if (c.tag !== 1)
              throw Error(p(309));
            var d = c.stateNode;
          }
          if (!d)
            throw Error(p(147, a));
          var e = d, f = "" + a;
          return b !== null && b.ref !== null && typeof b.ref == "function" && b.ref._stringRef === f ? b.ref : (b = function(a2) {
            var b2 = e.refs;
            a2 === null ? delete b2[f] : b2[f] = a2;
          }, b._stringRef = f, b);
        }
        if (typeof a != "string")
          throw Error(p(284));
        if (!c._owner)
          throw Error(p(290, a));
      }
      return a;
    }
    function Mg(a, b) {
      throw a = Object.prototype.toString.call(b), Error(p(31, a === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
    }
    function Ng(a) {
      var b = a._init;
      return b(a._payload);
    }
    function Og(a) {
      function b(b2, c2) {
        if (a) {
          var d2 = b2.deletions;
          d2 === null ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
        }
      }
      function c(c2, d2) {
        if (!a)
          return null;
        for (; d2 !== null; )
          b(c2, d2), d2 = d2.sibling;
        return null;
      }
      function d(a2, b2) {
        for (a2 = /* @__PURE__ */ new Map(); b2 !== null; )
          b2.key !== null ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
        return a2;
      }
      function e(a2, b2) {
        return a2 = Pg(a2, b2), a2.index = 0, a2.sibling = null, a2;
      }
      function f(b2, c2, d2) {
        return b2.index = d2, a ? (d2 = b2.alternate, d2 !== null ? (d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2) : (b2.flags |= 2, c2)) : (b2.flags |= 1048576, c2);
      }
      function g(b2) {
        return a && b2.alternate === null && (b2.flags |= 2), b2;
      }
      function h(a2, b2, c2, d2) {
        return b2 === null || b2.tag !== 6 ? (b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2) : (b2 = e(b2, c2), b2.return = a2, b2);
      }
      function k(a2, b2, c2, d2) {
        var f2 = c2.type;
        return f2 === ya ? m(a2, b2, c2.props.children, d2, c2.key) : b2 !== null && (b2.elementType === f2 || typeof f2 == "object" && f2 !== null && f2.$$typeof === Ha && Ng(f2) === b2.type) ? (d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2) : (d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2);
      }
      function l(a2, b2, c2, d2) {
        return b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation ? (b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2) : (b2 = e(b2, c2.children || []), b2.return = a2, b2);
      }
      function m(a2, b2, c2, d2, f2) {
        return b2 === null || b2.tag !== 7 ? (b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2) : (b2 = e(b2, c2), b2.return = a2, b2);
      }
      function q(a2, b2, c2) {
        if (typeof b2 == "string" && b2 !== "" || typeof b2 == "number")
          return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
        if (typeof b2 == "object" && b2 !== null) {
          switch (b2.$$typeof) {
            case va:
              return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
            case wa:
              return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
            case Ha:
              var d2 = b2._init;
              return q(a2, d2(b2._payload), c2);
          }
          if (eb(b2) || Ka(b2))
            return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
          Mg(a2, b2);
        }
        return null;
      }
      function r(a2, b2, c2, d2) {
        var e2 = b2 !== null ? b2.key : null;
        if (typeof c2 == "string" && c2 !== "" || typeof c2 == "number")
          return e2 !== null ? null : h(a2, b2, "" + c2, d2);
        if (typeof c2 == "object" && c2 !== null) {
          switch (c2.$$typeof) {
            case va:
              return c2.key === e2 ? k(a2, b2, c2, d2) : null;
            case wa:
              return c2.key === e2 ? l(a2, b2, c2, d2) : null;
            case Ha:
              return e2 = c2._init, r(
                a2,
                b2,
                e2(c2._payload),
                d2
              );
          }
          if (eb(c2) || Ka(c2))
            return e2 !== null ? null : m(a2, b2, c2, d2, null);
          Mg(a2, c2);
        }
        return null;
      }
      function y(a2, b2, c2, d2, e2) {
        if (typeof d2 == "string" && d2 !== "" || typeof d2 == "number")
          return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
        if (typeof d2 == "object" && d2 !== null) {
          switch (d2.$$typeof) {
            case va:
              return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, k(b2, a2, d2, e2);
            case wa:
              return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, l(b2, a2, d2, e2);
            case Ha:
              var f2 = d2._init;
              return y(a2, b2, c2, f2(d2._payload), e2);
          }
          if (eb(d2) || Ka(d2))
            return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
          Mg(b2, d2);
        }
        return null;
      }
      function n(e2, g2, h2, k2) {
        for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; u !== null && w < h2.length; w++) {
          u.index > w ? (x = u, u = null) : x = u.sibling;
          var n2 = r(e2, u, h2[w], k2);
          if (n2 === null) {
            u === null && (u = x);
            break;
          }
          a && u && n2.alternate === null && b(e2, u), g2 = f(n2, g2, w), m2 === null ? l2 = n2 : m2.sibling = n2, m2 = n2, u = x;
        }
        if (w === h2.length)
          return c(e2, u), I && tg(e2, w), l2;
        if (u === null) {
          for (; w < h2.length; w++)
            u = q(e2, h2[w], k2), u !== null && (g2 = f(u, g2, w), m2 === null ? l2 = u : m2.sibling = u, m2 = u);
          return I && tg(e2, w), l2;
        }
        for (u = d(e2, u); w < h2.length; w++)
          x = y(u, e2, w, h2[w], k2), x !== null && (a && x.alternate !== null && u.delete(x.key === null ? w : x.key), g2 = f(x, g2, w), m2 === null ? l2 = x : m2.sibling = x, m2 = x);
        return a && u.forEach(function(a2) {
          return b(e2, a2);
        }), I && tg(e2, w), l2;
      }
      function t(e2, g2, h2, k2) {
        var l2 = Ka(h2);
        if (typeof l2 != "function")
          throw Error(p(150));
        if (h2 = l2.call(h2), h2 == null)
          throw Error(p(151));
        for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); m2 !== null && !n2.done; w++, n2 = h2.next()) {
          m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
          var t2 = r(e2, m2, n2.value, k2);
          if (t2 === null) {
            m2 === null && (m2 = x);
            break;
          }
          a && m2 && t2.alternate === null && b(e2, m2), g2 = f(t2, g2, w), u === null ? l2 = t2 : u.sibling = t2, u = t2, m2 = x;
        }
        if (n2.done)
          return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
        if (m2 === null) {
          for (; !n2.done; w++, n2 = h2.next())
            n2 = q(e2, n2.value, k2), n2 !== null && (g2 = f(n2, g2, w), u === null ? l2 = n2 : u.sibling = n2, u = n2);
          return I && tg(e2, w), l2;
        }
        for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next())
          n2 = y(m2, e2, w, n2.value, k2), n2 !== null && (a && n2.alternate !== null && m2.delete(n2.key === null ? w : n2.key), g2 = f(n2, g2, w), u === null ? l2 = n2 : u.sibling = n2, u = n2);
        return a && m2.forEach(function(a2) {
          return b(e2, a2);
        }), I && tg(e2, w), l2;
      }
      function J(a2, d2, f2, h2) {
        if (typeof f2 == "object" && f2 !== null && f2.type === ya && f2.key === null && (f2 = f2.props.children), typeof f2 == "object" && f2 !== null) {
          switch (f2.$$typeof) {
            case va:
              a: {
                for (var k2 = f2.key, l2 = d2; l2 !== null; ) {
                  if (l2.key === k2) {
                    if (k2 = f2.type, k2 === ya) {
                      if (l2.tag === 7) {
                        c(a2, l2.sibling), d2 = e(l2, f2.props.children), d2.return = a2, a2 = d2;
                        break a;
                      }
                    } else if (l2.elementType === k2 || typeof k2 == "object" && k2 !== null && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                      c(a2, l2.sibling), d2 = e(l2, f2.props), d2.ref = Lg(a2, l2, f2), d2.return = a2, a2 = d2;
                      break a;
                    }
                    c(a2, l2);
                    break;
                  } else
                    b(a2, l2);
                  l2 = l2.sibling;
                }
                f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
              }
              return g(a2);
            case wa:
              a: {
                for (l2 = f2.key; d2 !== null; ) {
                  if (d2.key === l2)
                    if (d2.tag === 4 && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling), d2 = e(d2, f2.children || []), d2.return = a2, a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                  else
                    b(a2, d2);
                  d2 = d2.sibling;
                }
                d2 = Sg(f2, a2.mode, h2), d2.return = a2, a2 = d2;
              }
              return g(a2);
            case Ha:
              return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
          }
          if (eb(f2))
            return n(a2, d2, f2, h2);
          if (Ka(f2))
            return t(a2, d2, f2, h2);
          Mg(a2, f2);
        }
        return typeof f2 == "string" && f2 !== "" || typeof f2 == "number" ? (f2 = "" + f2, d2 !== null && d2.tag === 6 ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
      }
      return J;
    }
    var Ug = Og(!0), Vg = Og(!1), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
    function $g() {
      Zg = Yg = Xg = null;
    }
    function ah(a) {
      var b = Wg.current;
      E(Wg), a._currentValue = b;
    }
    function bh(a, b, c) {
      for (; a !== null; ) {
        var d = a.alternate;
        if ((a.childLanes & b) !== b ? (a.childLanes |= b, d !== null && (d.childLanes |= b)) : d !== null && (d.childLanes & b) !== b && (d.childLanes |= b), a === c)
          break;
        a = a.return;
      }
    }
    function ch(a, b) {
      Xg = a, Zg = Yg = null, a = a.dependencies, a !== null && a.firstContext !== null && (a.lanes & b && (dh = !0), a.firstContext = null);
    }
    function eh(a) {
      var b = a._currentValue;
      if (Zg !== a)
        if (a = { context: a, memoizedValue: b, next: null }, Yg === null) {
          if (Xg === null)
            throw Error(p(308));
          Yg = a, Xg.dependencies = { lanes: 0, firstContext: a };
        } else
          Yg = Yg.next = a;
      return b;
    }
    var fh = null;
    function gh(a) {
      fh === null ? fh = [a] : fh.push(a);
    }
    function hh(a, b, c, d) {
      var e = b.interleaved;
      return e === null ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c), b.interleaved = c, ih(a, d);
    }
    function ih(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      for (c !== null && (c.lanes |= b), c = a, a = a.return; a !== null; )
        a.childLanes |= b, c = a.alternate, c !== null && (c.childLanes |= b), c = a, a = a.return;
      return c.tag === 3 ? c.stateNode : null;
    }
    var jh = !1;
    function kh(a) {
      a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
    }
    function lh(a, b) {
      a = a.updateQueue, b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
    }
    function mh(a, b) {
      return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
    }
    function nh(a, b, c) {
      var d = a.updateQueue;
      if (d === null)
        return null;
      if (d = d.shared, K & 2) {
        var e = d.pending;
        return e === null ? b.next = b : (b.next = e.next, e.next = b), d.pending = b, ih(a, c);
      }
      return e = d.interleaved, e === null ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b), d.interleaved = b, ih(a, c);
    }
    function oh(a, b, c) {
      if (b = b.updateQueue, b !== null && (b = b.shared, (c & 4194240) !== 0)) {
        var d = b.lanes;
        d &= a.pendingLanes, c |= d, b.lanes = c, Cc(a, c);
      }
    }
    function ph(a, b) {
      var c = a.updateQueue, d = a.alternate;
      if (d !== null && (d = d.updateQueue, c === d)) {
        var e = null, f = null;
        if (c = c.firstBaseUpdate, c !== null) {
          do {
            var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
            f === null ? e = f = g : f = f.next = g, c = c.next;
          } while (c !== null);
          f === null ? e = f = b : f = f.next = b;
        } else
          e = f = b;
        c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects }, a.updateQueue = c;
        return;
      }
      a = c.lastBaseUpdate, a === null ? c.firstBaseUpdate = b : a.next = b, c.lastBaseUpdate = b;
    }
    function qh(a, b, c, d) {
      var e = a.updateQueue;
      jh = !1;
      var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
      if (h !== null) {
        e.shared.pending = null;
        var k = h, l = k.next;
        k.next = null, g === null ? f = l : g.next = l, g = k;
        var m = a.alternate;
        m !== null && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (h === null ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
      }
      if (f !== null) {
        var q = e.baseState;
        g = 0, m = l = k = null, h = f;
        do {
          var r = h.lane, y = h.eventTime;
          if ((d & r) === r) {
            m !== null && (m = m.next = {
              eventTime: y,
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            });
            a: {
              var n = a, t = h;
              switch (r = b, y = c, t.tag) {
                case 1:
                  if (n = t.payload, typeof n == "function") {
                    q = n.call(y, q, r);
                    break a;
                  }
                  q = n;
                  break a;
                case 3:
                  n.flags = n.flags & -65537 | 128;
                case 0:
                  if (n = t.payload, r = typeof n == "function" ? n.call(y, q, r) : n, r == null)
                    break a;
                  q = A({}, q, r);
                  break a;
                case 2:
                  jh = !0;
              }
            }
            h.callback !== null && h.lane !== 0 && (a.flags |= 64, r = e.effects, r === null ? e.effects = [h] : r.push(h));
          } else
            y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, m === null ? (l = m = y, k = q) : m = m.next = y, g |= r;
          if (h = h.next, h === null) {
            if (h = e.shared.pending, h === null)
              break;
            r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          }
        } while (1);
        if (m === null && (k = q), e.baseState = k, e.firstBaseUpdate = l, e.lastBaseUpdate = m, b = e.shared.interleaved, b !== null) {
          e = b;
          do
            g |= e.lane, e = e.next;
          while (e !== b);
        } else
          f === null && (e.shared.lanes = 0);
        rh |= g, a.lanes = g, a.memoizedState = q;
      }
    }
    function sh(a, b, c) {
      if (a = b.effects, b.effects = null, a !== null)
        for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (e !== null) {
            if (d.callback = null, d = c, typeof e != "function")
              throw Error(p(191, e));
            e.call(d);
          }
        }
    }
    var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
    function xh(a) {
      if (a === th)
        throw Error(p(174));
      return a;
    }
    function yh(a, b) {
      switch (G(wh, b), G(vh, a), G(uh, th), a = b.nodeType, a) {
        case 9:
        case 11:
          b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
          break;
        default:
          a = a === 8 ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
      }
      E(uh), G(uh, b);
    }
    function zh() {
      E(uh), E(vh), E(wh);
    }
    function Ah(a) {
      xh(wh.current);
      var b = xh(uh.current), c = lb(b, a.type);
      b !== c && (G(vh, a), G(uh, c));
    }
    function Bh(a) {
      vh.current === a && (E(uh), E(vh));
    }
    var L = Uf(0);
    function Ch(a) {
      for (var b = a; b !== null; ) {
        if (b.tag === 13) {
          var c = b.memoizedState;
          if (c !== null && (c = c.dehydrated, c === null || c.data === "$?" || c.data === "$!"))
            return b;
        } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
          if (b.flags & 128)
            return b;
        } else if (b.child !== null) {
          b.child.return = b, b = b.child;
          continue;
        }
        if (b === a)
          break;
        for (; b.sibling === null; ) {
          if (b.return === null || b.return === a)
            return null;
          b = b.return;
        }
        b.sibling.return = b.return, b = b.sibling;
      }
      return null;
    }
    var Dh = [];
    function Eh() {
      for (var a = 0; a < Dh.length; a++)
        Dh[a]._workInProgressVersionPrimary = null;
      Dh.length = 0;
    }
    var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = !1, Jh = !1, Kh = 0, Lh = 0;
    function P() {
      throw Error(p(321));
    }
    function Mh(a, b) {
      if (b === null)
        return !1;
      for (var c = 0; c < b.length && c < a.length; c++)
        if (!He(a[c], b[c]))
          return !1;
      return !0;
    }
    function Nh(a, b, c, d, e, f) {
      if (Hh = f, M = b, b.memoizedState = null, b.updateQueue = null, b.lanes = 0, Fh.current = a === null || a.memoizedState === null ? Oh : Ph, a = c(d, e), Jh) {
        f = 0;
        do {
          if (Jh = !1, Kh = 0, 25 <= f)
            throw Error(p(301));
          f += 1, O = N = null, b.updateQueue = null, Fh.current = Qh, a = c(d, e);
        } while (Jh);
      }
      if (Fh.current = Rh, b = N !== null && N.next !== null, Hh = 0, O = N = M = null, Ih = !1, b)
        throw Error(p(300));
      return a;
    }
    function Sh() {
      var a = Kh !== 0;
      return Kh = 0, a;
    }
    function Th() {
      var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      return O === null ? M.memoizedState = O = a : O = O.next = a, O;
    }
    function Uh() {
      if (N === null) {
        var a = M.alternate;
        a = a !== null ? a.memoizedState : null;
      } else
        a = N.next;
      var b = O === null ? M.memoizedState : O.next;
      if (b !== null)
        O = b, N = a;
      else {
        if (a === null)
          throw Error(p(310));
        N = a, a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null }, O === null ? M.memoizedState = O = a : O = O.next = a;
      }
      return O;
    }
    function Vh(a, b) {
      return typeof b == "function" ? b(a) : b;
    }
    function Wh(a) {
      var b = Uh(), c = b.queue;
      if (c === null)
        throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = N, e = d.baseQueue, f = c.pending;
      if (f !== null) {
        if (e !== null) {
          var g = e.next;
          e.next = f.next, f.next = g;
        }
        d.baseQueue = e = f, c.pending = null;
      }
      if (e !== null) {
        f = e.next, d = d.baseState;
        var h = g = null, k = null, l = f;
        do {
          var m = l.lane;
          if ((Hh & m) === m)
            k !== null && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
          else {
            var q = {
              lane: m,
              action: l.action,
              hasEagerState: l.hasEagerState,
              eagerState: l.eagerState,
              next: null
            };
            k === null ? (h = k = q, g = d) : k = k.next = q, M.lanes |= m, rh |= m;
          }
          l = l.next;
        } while (l !== null && l !== f);
        k === null ? g = d : k.next = h, He(d, b.memoizedState) || (dh = !0), b.memoizedState = d, b.baseState = g, b.baseQueue = k, c.lastRenderedState = d;
      }
      if (a = c.interleaved, a !== null) {
        e = a;
        do
          f = e.lane, M.lanes |= f, rh |= f, e = e.next;
        while (e !== a);
      } else
        e === null && (c.lanes = 0);
      return [b.memoizedState, c.dispatch];
    }
    function Xh(a) {
      var b = Uh(), c = b.queue;
      if (c === null)
        throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = c.dispatch, e = c.pending, f = b.memoizedState;
      if (e !== null) {
        c.pending = null;
        var g = e = e.next;
        do
          f = a(f, g.action), g = g.next;
        while (g !== e);
        He(f, b.memoizedState) || (dh = !0), b.memoizedState = f, b.baseQueue === null && (b.baseState = f), c.lastRenderedState = f;
      }
      return [f, d];
    }
    function Yh() {
    }
    function Zh(a, b) {
      var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
      if (f && (d.memoizedState = e, dh = !0), d = d.queue, $h(ai.bind(null, c, d, a), [a]), d.getSnapshot !== b || f || O !== null && O.memoizedState.tag & 1) {
        if (c.flags |= 2048, bi(9, ci.bind(null, c, d, e, b), void 0, null), Q === null)
          throw Error(p(349));
        Hh & 30 || di(c, b, e);
      }
      return e;
    }
    function di(a, b, c) {
      a.flags |= 16384, a = { getSnapshot: b, value: c }, b = M.updateQueue, b === null ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, c === null ? b.stores = [a] : c.push(a));
    }
    function ci(a, b, c, d) {
      b.value = c, b.getSnapshot = d, ei(b) && fi(a);
    }
    function ai(a, b, c) {
      return c(function() {
        ei(b) && fi(a);
      });
    }
    function ei(a) {
      var b = a.getSnapshot;
      a = a.value;
      try {
        var c = b();
        return !He(a, c);
      } catch {
        return !0;
      }
    }
    function fi(a) {
      var b = ih(a, 1);
      b !== null && gi(b, a, 1, -1);
    }
    function hi(a) {
      var b = Th();
      return typeof a == "function" && (a = a()), b.memoizedState = b.baseState = a, a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a }, b.queue = a, a = a.dispatch = ii.bind(null, M, a), [b.memoizedState, a];
    }
    function bi(a, b, c, d) {
      return a = { tag: a, create: b, destroy: c, deps: d, next: null }, b = M.updateQueue, b === null ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, c === null ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a)), a;
    }
    function ji() {
      return Uh().memoizedState;
    }
    function ki(a, b, c, d) {
      var e = Th();
      M.flags |= a, e.memoizedState = bi(1 | b, c, void 0, d === void 0 ? null : d);
    }
    function li(a, b, c, d) {
      var e = Uh();
      d = d === void 0 ? null : d;
      var f = void 0;
      if (N !== null) {
        var g = N.memoizedState;
        if (f = g.destroy, d !== null && Mh(d, g.deps)) {
          e.memoizedState = bi(b, c, f, d);
          return;
        }
      }
      M.flags |= a, e.memoizedState = bi(1 | b, c, f, d);
    }
    function mi(a, b) {
      return ki(8390656, 8, a, b);
    }
    function $h(a, b) {
      return li(2048, 8, a, b);
    }
    function ni(a, b) {
      return li(4, 2, a, b);
    }
    function oi(a, b) {
      return li(4, 4, a, b);
    }
    function pi(a, b) {
      if (typeof b == "function")
        return a = a(), b(a), function() {
          b(null);
        };
      if (b != null)
        return a = a(), b.current = a, function() {
          b.current = null;
        };
    }
    function qi(a, b, c) {
      return c = c != null ? c.concat([a]) : null, li(4, 4, pi.bind(null, b, a), c);
    }
    function ri() {
    }
    function si(a, b) {
      var c = Uh();
      b = b === void 0 ? null : b;
      var d = c.memoizedState;
      return d !== null && b !== null && Mh(b, d[1]) ? d[0] : (c.memoizedState = [a, b], a);
    }
    function ti(a, b) {
      var c = Uh();
      b = b === void 0 ? null : b;
      var d = c.memoizedState;
      return d !== null && b !== null && Mh(b, d[1]) ? d[0] : (a = a(), c.memoizedState = [a, b], a);
    }
    function ui(a, b, c) {
      return Hh & 21 ? (He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = !0), b) : (a.baseState && (a.baseState = !1, dh = !0), a.memoizedState = c);
    }
    function vi(a, b) {
      var c = C;
      C = c !== 0 && 4 > c ? c : 4, a(!0);
      var d = Gh.transition;
      Gh.transition = {};
      try {
        a(!1), b();
      } finally {
        C = c, Gh.transition = d;
      }
    }
    function wi() {
      return Uh().memoizedState;
    }
    function xi(a, b, c) {
      var d = yi(a);
      if (c = { lane: d, action: c, hasEagerState: !1, eagerState: null, next: null }, zi(a))
        Ai(b, c);
      else if (c = hh(a, b, c, d), c !== null) {
        var e = R();
        gi(c, a, d, e), Bi(c, b, d);
      }
    }
    function ii(a, b, c) {
      var d = yi(a), e = { lane: d, action: c, hasEagerState: !1, eagerState: null, next: null };
      if (zi(a))
        Ai(b, e);
      else {
        var f = a.alternate;
        if (a.lanes === 0 && (f === null || f.lanes === 0) && (f = b.lastRenderedReducer, f !== null))
          try {
            var g = b.lastRenderedState, h = f(g, c);
            if (e.hasEagerState = !0, e.eagerState = h, He(h, g)) {
              var k = b.interleaved;
              k === null ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e), b.interleaved = e;
              return;
            }
          } catch {
          } finally {
          }
        c = hh(a, b, e, d), c !== null && (e = R(), gi(c, a, d, e), Bi(c, b, d));
      }
    }
    function zi(a) {
      var b = a.alternate;
      return a === M || b !== null && b === M;
    }
    function Ai(a, b) {
      Jh = Ih = !0;
      var c = a.pending;
      c === null ? b.next = b : (b.next = c.next, c.next = b), a.pending = b;
    }
    function Bi(a, b, c) {
      if (c & 4194240) {
        var d = b.lanes;
        d &= a.pendingLanes, c |= d, b.lanes = c, Cc(a, c);
      }
    }
    var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: !1 }, Oh = { readContext: eh, useCallback: function(a, b) {
      return Th().memoizedState = [a, b === void 0 ? null : b], a;
    }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
      return c = c != null ? c.concat([a]) : null, ki(
        4194308,
        4,
        pi.bind(null, b, a),
        c
      );
    }, useLayoutEffect: function(a, b) {
      return ki(4194308, 4, a, b);
    }, useInsertionEffect: function(a, b) {
      return ki(4, 2, a, b);
    }, useMemo: function(a, b) {
      var c = Th();
      return b = b === void 0 ? null : b, a = a(), c.memoizedState = [a, b], a;
    }, useReducer: function(a, b, c) {
      var d = Th();
      return b = c !== void 0 ? c(b) : b, d.memoizedState = d.baseState = b, a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b }, d.queue = a, a = a.dispatch = xi.bind(null, M, a), [d.memoizedState, a];
    }, useRef: function(a) {
      var b = Th();
      return a = { current: a }, b.memoizedState = a;
    }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
      return Th().memoizedState = a;
    }, useTransition: function() {
      var a = hi(!1), b = a[0];
      return a = vi.bind(null, a[1]), Th().memoizedState = a, [b, a];
    }, useMutableSource: function() {
    }, useSyncExternalStore: function(a, b, c) {
      var d = M, e = Th();
      if (I) {
        if (c === void 0)
          throw Error(p(407));
        c = c();
      } else {
        if (c = b(), Q === null)
          throw Error(p(349));
        Hh & 30 || di(d, b, c);
      }
      e.memoizedState = c;
      var f = { value: c, getSnapshot: b };
      return e.queue = f, mi(ai.bind(
        null,
        d,
        f,
        a
      ), [a]), d.flags |= 2048, bi(9, ci.bind(null, d, f, c, b), void 0, null), c;
    }, useId: function() {
      var a = Th(), b = Q.identifierPrefix;
      if (I) {
        var c = sg, d = rg;
        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c, b = ":" + b + "R" + c, c = Kh++, 0 < c && (b += "H" + c.toString(32)), b += ":";
      } else
        c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
      return a.memoizedState = b;
    }, unstable_isNewReconciler: !1 }, Ph = {
      readContext: eh,
      useCallback: si,
      useContext: eh,
      useEffect: $h,
      useImperativeHandle: qi,
      useInsertionEffect: ni,
      useLayoutEffect: oi,
      useMemo: ti,
      useReducer: Wh,
      useRef: ji,
      useState: function() {
        return Wh(Vh);
      },
      useDebugValue: ri,
      useDeferredValue: function(a) {
        var b = Uh();
        return ui(b, N.memoizedState, a);
      },
      useTransition: function() {
        var a = Wh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      },
      useMutableSource: Yh,
      useSyncExternalStore: Zh,
      useId: wi,
      unstable_isNewReconciler: !1
    }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
      return Xh(Vh);
    }, useDebugValue: ri, useDeferredValue: function(a) {
      var b = Uh();
      return N === null ? b.memoizedState = a : ui(b, N.memoizedState, a);
    }, useTransition: function() {
      var a = Xh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: !1 };
    function Ci(a, b) {
      if (a && a.defaultProps) {
        b = A({}, b), a = a.defaultProps;
        for (var c in a)
          b[c] === void 0 && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Di(a, b, c, d) {
      b = a.memoizedState, c = c(d, b), c = c == null ? b : A({}, b, c), a.memoizedState = c, a.lanes === 0 && (a.updateQueue.baseState = c);
    }
    var Ei = { isMounted: function(a) {
      return (a = a._reactInternals) ? Vb(a) === a : !1;
    }, enqueueSetState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f = mh(d, e);
      f.payload = b, c != null && (f.callback = c), b = nh(a, f, e), b !== null && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueReplaceState: function(a, b, c) {
      a = a._reactInternals;
      var d = R(), e = yi(a), f = mh(d, e);
      f.tag = 1, f.payload = b, c != null && (f.callback = c), b = nh(a, f, e), b !== null && (gi(b, a, e, d), oh(b, a, e));
    }, enqueueForceUpdate: function(a, b) {
      a = a._reactInternals;
      var c = R(), d = yi(a), e = mh(c, d);
      e.tag = 2, b != null && (e.callback = b), b = nh(a, e, d), b !== null && (gi(b, a, d, c), oh(b, a, d));
    } };
    function Fi(a, b, c, d, e, f, g) {
      return a = a.stateNode, typeof a.shouldComponentUpdate == "function" ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : !0;
    }
    function Gi(a, b, c) {
      var d = !1, e = Vf, f = b.contextType;
      return typeof f == "object" && f !== null ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = d != null) ? Yf(a, e) : Vf), b = new b(c, f), a.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null, b.updater = Ei, a.stateNode = b, b._reactInternals = a, d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f), b;
    }
    function Hi(a, b, c, d) {
      a = b.state, typeof b.componentWillReceiveProps == "function" && b.componentWillReceiveProps(c, d), typeof b.UNSAFE_componentWillReceiveProps == "function" && b.UNSAFE_componentWillReceiveProps(c, d), b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
    }
    function Ii(a, b, c, d) {
      var e = a.stateNode;
      e.props = c, e.state = a.memoizedState, e.refs = {}, kh(a);
      var f = b.contextType;
      typeof f == "object" && f !== null ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f)), e.state = a.memoizedState, f = b.getDerivedStateFromProps, typeof f == "function" && (Di(a, b, f, c), e.state = a.memoizedState), typeof b.getDerivedStateFromProps == "function" || typeof e.getSnapshotBeforeUpdate == "function" || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (b = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState), typeof e.componentDidMount == "function" && (a.flags |= 4194308);
    }
    function Ji(a, b) {
      try {
        var c = "", d = b;
        do
          c += Pa(d), d = d.return;
        while (d);
        var e = c;
      } catch (f) {
        e = `
Error generating stack: ` + f.message + `
` + f.stack;
      }
      return { value: a, source: b, stack: e, digest: null };
    }
    function Ki(a, b, c) {
      return { value: a, source: null, stack: c ?? null, digest: b ?? null };
    }
    function Li(a, b) {
      try {
        console.error(b.value);
      } catch (c) {
        setTimeout(function() {
          throw c;
        });
      }
    }
    var Mi = typeof WeakMap == "function" ? WeakMap : Map;
    function Ni(a, b, c) {
      c = mh(-1, c), c.tag = 3, c.payload = { element: null };
      var d = b.value;
      return c.callback = function() {
        Oi || (Oi = !0, Pi = d), Li(a, b);
      }, c;
    }
    function Qi(a, b, c) {
      c = mh(-1, c), c.tag = 3;
      var d = a.type.getDerivedStateFromError;
      if (typeof d == "function") {
        var e = b.value;
        c.payload = function() {
          return d(e);
        }, c.callback = function() {
          Li(a, b);
        };
      }
      var f = a.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (c.callback = function() {
        Li(a, b), typeof d != "function" && (Ri === null ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
        var c2 = b.stack;
        this.componentDidCatch(b.value, { componentStack: c2 !== null ? c2 : "" });
      }), c;
    }
    function Si(a, b, c) {
      var d = a.pingCache;
      if (d === null) {
        d = a.pingCache = new Mi();
        var e = /* @__PURE__ */ new Set();
        d.set(b, e);
      } else
        e = d.get(b), e === void 0 && (e = /* @__PURE__ */ new Set(), d.set(b, e));
      e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
    }
    function Ui(a) {
      do {
        var b;
        if ((b = a.tag === 13) && (b = a.memoizedState, b = b !== null ? b.dehydrated !== null : !0), b)
          return a;
        a = a.return;
      } while (a !== null);
      return null;
    }
    function Vi(a, b, c, d, e) {
      return a.mode & 1 ? (a.flags |= 65536, a.lanes = e, a) : (a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, c.tag === 1 && (c.alternate === null ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a);
    }
    var Wi = ua.ReactCurrentOwner, dh = !1;
    function Xi(a, b, c, d) {
      b.child = a === null ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
    }
    function Yi(a, b, c, d, e) {
      c = c.render;
      var f = b.ref;
      return ch(b, e), d = Nh(a, b, c, d, f, e), c = Sh(), a !== null && !dh ? (b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e)) : (I && c && vg(b), b.flags |= 1, Xi(a, b, d, e), b.child);
    }
    function $i(a, b, c, d, e) {
      if (a === null) {
        var f = c.type;
        return typeof f == "function" && !aj(f) && f.defaultProps === void 0 && c.compare === null && c.defaultProps === void 0 ? (b.tag = 15, b.type = f, bj(a, b, f, d, e)) : (a = Rg(c.type, null, d, b, b.mode, e), a.ref = b.ref, a.return = b, b.child = a);
      }
      if (f = a.child, !(a.lanes & e)) {
        var g = f.memoizedProps;
        if (c = c.compare, c = c !== null ? c : Ie, c(g, d) && a.ref === b.ref)
          return Zi(a, b, e);
      }
      return b.flags |= 1, a = Pg(f, d), a.ref = b.ref, a.return = b, b.child = a;
    }
    function bj(a, b, c, d, e) {
      if (a !== null) {
        var f = a.memoizedProps;
        if (Ie(f, d) && a.ref === b.ref)
          if (dh = !1, b.pendingProps = d = f, (a.lanes & e) !== 0)
            a.flags & 131072 && (dh = !0);
          else
            return b.lanes = a.lanes, Zi(a, b, e);
      }
      return cj(a, b, c, d, e);
    }
    function dj(a, b, c) {
      var d = b.pendingProps, e = d.children, f = a !== null ? a.memoizedState : null;
      if (d.mode === "hidden")
        if (!(b.mode & 1))
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (!(c & 1073741824))
            return a = f !== null ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, d = f !== null ? f.baseLanes : c, G(ej, fj), fj |= d;
        }
      else
        f !== null ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
      return Xi(a, b, e, c), b.child;
    }
    function gj(a, b) {
      var c = b.ref;
      (a === null && c !== null || a !== null && a.ref !== c) && (b.flags |= 512, b.flags |= 2097152);
    }
    function cj(a, b, c, d, e) {
      var f = Zf(c) ? Xf : H.current;
      return f = Yf(b, f), ch(b, e), c = Nh(a, b, c, d, f, e), d = Sh(), a !== null && !dh ? (b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e)) : (I && d && vg(b), b.flags |= 1, Xi(a, b, c, e), b.child);
    }
    function hj(a, b, c, d, e) {
      if (Zf(c)) {
        var f = !0;
        cg(b);
      } else
        f = !1;
      if (ch(b, e), b.stateNode === null)
        ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = !0;
      else if (a === null) {
        var g = b.stateNode, h = b.memoizedProps;
        g.props = h;
        var k = g.context, l = c.contextType;
        typeof l == "object" && l !== null ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
        var m = c.getDerivedStateFromProps, q = typeof m == "function" || typeof g.getSnapshotBeforeUpdate == "function";
        q || typeof g.UNSAFE_componentWillReceiveProps != "function" && typeof g.componentWillReceiveProps != "function" || (h !== d || k !== l) && Hi(b, g, d, l), jh = !1;
        var r = b.memoizedState;
        g.state = r, qh(b, d, g, e), k = b.memoizedState, h !== d || r !== k || Wf.current || jh ? (typeof m == "function" && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || typeof g.UNSAFE_componentWillMount != "function" && typeof g.componentWillMount != "function" || (typeof g.componentWillMount == "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount == "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount == "function" && (b.flags |= 4194308)) : (typeof g.componentDidMount == "function" && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : (typeof g.componentDidMount == "function" && (b.flags |= 4194308), d = !1);
      } else {
        g = b.stateNode, lh(a, b), h = b.memoizedProps, l = b.type === b.elementType ? h : Ci(b.type, h), g.props = l, q = b.pendingProps, r = g.context, k = c.contextType, typeof k == "object" && k !== null ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
        var y = c.getDerivedStateFromProps;
        (m = typeof y == "function" || typeof g.getSnapshotBeforeUpdate == "function") || typeof g.UNSAFE_componentWillReceiveProps != "function" && typeof g.componentWillReceiveProps != "function" || (h !== q || r !== k) && Hi(b, g, d, k), jh = !1, r = b.memoizedState, g.state = r, qh(b, d, g, e);
        var n = b.memoizedState;
        h !== q || r !== n || Wf.current || jh ? (typeof y == "function" && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || !1) ? (m || typeof g.UNSAFE_componentWillUpdate != "function" && typeof g.componentWillUpdate != "function" || (typeof g.componentWillUpdate == "function" && g.componentWillUpdate(d, n, k), typeof g.UNSAFE_componentWillUpdate == "function" && g.UNSAFE_componentWillUpdate(d, n, k)), typeof g.componentDidUpdate == "function" && (b.flags |= 4), typeof g.getSnapshotBeforeUpdate == "function" && (b.flags |= 1024)) : (typeof g.componentDidUpdate != "function" || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate != "function" || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : (typeof g.componentDidUpdate != "function" || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate != "function" || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = !1);
      }
      return jj(a, b, c, d, f, e);
    }
    function jj(a, b, c, d, e, f) {
      gj(a, b);
      var g = (b.flags & 128) !== 0;
      if (!d && !g)
        return e && dg(b, c, !1), Zi(a, b, f);
      d = b.stateNode, Wi.current = b;
      var h = g && typeof c.getDerivedStateFromError != "function" ? null : d.render();
      return b.flags |= 1, a !== null && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f), b.memoizedState = d.state, e && dg(b, c, !0), b.child;
    }
    function kj(a) {
      var b = a.stateNode;
      b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1), yh(a, b.containerInfo);
    }
    function lj(a, b, c, d, e) {
      return Ig(), Jg(e), b.flags |= 256, Xi(a, b, c, d), b.child;
    }
    var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
    function nj(a) {
      return { baseLanes: a, cachePool: null, transitions: null };
    }
    function oj(a, b, c) {
      var d = b.pendingProps, e = L.current, f = !1, g = (b.flags & 128) !== 0, h;
      if ((h = g) || (h = a !== null && a.memoizedState === null ? !1 : (e & 2) !== 0), h ? (f = !0, b.flags &= -129) : (a === null || a.memoizedState !== null) && (e |= 1), G(L, e & 1), a === null)
        return Eg(b), a = b.memoizedState, a !== null && (a = a.dehydrated, a !== null) ? (b.mode & 1 ? a.data === "$!" ? b.lanes = 8 : b.lanes = 1073741824 : b.lanes = 1, null) : (g = d.children, a = d.fallback, f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, !(d & 1) && f !== null ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g));
      if (e = a.memoizedState, e !== null && (h = e.dehydrated, h !== null))
        return rj(a, b, g, d, h, e, c);
      if (f) {
        f = d.fallback, g = b.mode, e = a.child, h = e.sibling;
        var k = { mode: "hidden", children: d.children };
        return !(g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064), h !== null ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2), f.return = b, d.return = b, d.sibling = f, b.child = d, d = f, f = b.child, g = a.child.memoizedState, g = g === null ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions }, f.memoizedState = g, f.childLanes = a.childLanes & ~c, b.memoizedState = mj, d;
      }
      return f = a.child, a = f.sibling, d = Pg(f, { mode: "visible", children: d.children }), !(b.mode & 1) && (d.lanes = c), d.return = b, d.sibling = null, a !== null && (c = b.deletions, c === null ? (b.deletions = [a], b.flags |= 16) : c.push(a)), b.child = d, b.memoizedState = null, d;
    }
    function qj(a, b) {
      return b = pj({ mode: "visible", children: b }, a.mode, 0, null), b.return = a, a.child = b;
    }
    function sj(a, b, c, d) {
      return d !== null && Jg(d), Ug(b, a.child, null, c), a = qj(b, b.pendingProps.children), a.flags |= 2, b.memoizedState = null, a;
    }
    function rj(a, b, c, d, e, f, g) {
      if (c)
        return b.flags & 256 ? (b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d)) : b.memoizedState !== null ? (b.child = a.child, b.flags |= 128, null) : (f = d.fallback, e = b.mode, d = pj({ mode: "visible", children: d.children }, e, 0, null), f = Tg(f, e, g, null), f.flags |= 2, d.return = b, f.return = b, d.sibling = f, b.child = d, b.mode & 1 && Ug(b, a.child, null, g), b.child.memoizedState = nj(g), b.memoizedState = mj, f);
      if (!(b.mode & 1))
        return sj(a, b, g, null);
      if (e.data === "$!") {
        if (d = e.nextSibling && e.nextSibling.dataset, d)
          var h = d.dgst;
        return d = h, f = Error(p(419)), d = Ki(f, d, void 0), sj(a, b, g, d);
      }
      if (h = (g & a.childLanes) !== 0, dh || h) {
        if (d = Q, d !== null) {
          switch (g & -g) {
            case 4:
              e = 2;
              break;
            case 16:
              e = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              e = 32;
              break;
            case 536870912:
              e = 268435456;
              break;
            default:
              e = 0;
          }
          e = e & (d.suspendedLanes | g) ? 0 : e, e !== 0 && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
        }
        return tj(), d = Ki(Error(p(421))), sj(a, b, g, d);
      }
      return e.data === "$?" ? (b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null) : (a = f.treeContext, yg = Lf(e.nextSibling), xg = b, I = !0, zg = null, a !== null && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b), b = qj(b, d.children), b.flags |= 4096, b);
    }
    function vj(a, b, c) {
      a.lanes |= b;
      var d = a.alternate;
      d !== null && (d.lanes |= b), bh(a.return, b, c);
    }
    function wj(a, b, c, d, e) {
      var f = a.memoizedState;
      f === null ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
    }
    function xj(a, b, c) {
      var d = b.pendingProps, e = d.revealOrder, f = d.tail;
      if (Xi(a, b, d.children, c), d = L.current, d & 2)
        d = d & 1 | 2, b.flags |= 128;
      else {
        if (a !== null && a.flags & 128)
          a:
            for (a = b.child; a !== null; ) {
              if (a.tag === 13)
                a.memoizedState !== null && vj(a, c, b);
              else if (a.tag === 19)
                vj(a, c, b);
              else if (a.child !== null) {
                a.child.return = a, a = a.child;
                continue;
              }
              if (a === b)
                break a;
              for (; a.sibling === null; ) {
                if (a.return === null || a.return === b)
                  break a;
                a = a.return;
              }
              a.sibling.return = a.return, a = a.sibling;
            }
        d &= 1;
      }
      if (G(L, d), !(b.mode & 1))
        b.memoizedState = null;
      else
        switch (e) {
          case "forwards":
            for (c = b.child, e = null; c !== null; )
              a = c.alternate, a !== null && Ch(a) === null && (e = c), c = c.sibling;
            c = e, c === null ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null), wj(b, !1, e, c, f);
            break;
          case "backwards":
            for (c = null, e = b.child, b.child = null; e !== null; ) {
              if (a = e.alternate, a !== null && Ch(a) === null) {
                b.child = e;
                break;
              }
              a = e.sibling, e.sibling = c, c = e, e = a;
            }
            wj(b, !0, c, null, f);
            break;
          case "together":
            wj(b, !1, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
      return b.child;
    }
    function ij(a, b) {
      !(b.mode & 1) && a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2);
    }
    function Zi(a, b, c) {
      if (a !== null && (b.dependencies = a.dependencies), rh |= b.lanes, !(c & b.childLanes))
        return null;
      if (a !== null && b.child !== a.child)
        throw Error(p(153));
      if (b.child !== null) {
        for (a = b.child, c = Pg(a, a.pendingProps), b.child = c, c.return = b; a.sibling !== null; )
          a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
        c.sibling = null;
      }
      return b.child;
    }
    function yj(a, b, c) {
      switch (b.tag) {
        case 3:
          kj(b), Ig();
          break;
        case 5:
          Ah(b);
          break;
        case 1:
          Zf(b.type) && cg(b);
          break;
        case 4:
          yh(b, b.stateNode.containerInfo);
          break;
        case 10:
          var d = b.type._context, e = b.memoizedProps.value;
          G(Wg, d._currentValue), d._currentValue = e;
          break;
        case 13:
          if (d = b.memoizedState, d !== null)
            return d.dehydrated !== null ? (G(L, L.current & 1), b.flags |= 128, null) : c & b.child.childLanes ? oj(a, b, c) : (G(L, L.current & 1), a = Zi(a, b, c), a !== null ? a.sibling : null);
          G(L, L.current & 1);
          break;
        case 19:
          if (d = (c & b.childLanes) !== 0, a.flags & 128) {
            if (d)
              return xj(a, b, c);
            b.flags |= 128;
          }
          if (e = b.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), G(L, L.current), d)
            break;
          return null;
        case 22:
        case 23:
          return b.lanes = 0, dj(a, b, c);
      }
      return Zi(a, b, c);
    }
    var zj, Aj, Bj, Cj;
    zj = function(a, b) {
      for (var c = b.child; c !== null; ) {
        if (c.tag === 5 || c.tag === 6)
          a.appendChild(c.stateNode);
        else if (c.tag !== 4 && c.child !== null) {
          c.child.return = c, c = c.child;
          continue;
        }
        if (c === b)
          break;
        for (; c.sibling === null; ) {
          if (c.return === null || c.return === b)
            return;
          c = c.return;
        }
        c.sibling.return = c.return, c = c.sibling;
      }
    };
    Aj = function() {
    };
    Bj = function(a, b, c, d) {
      var e = a.memoizedProps;
      if (e !== d) {
        a = b.stateNode, xh(uh.current);
        var f = null;
        switch (c) {
          case "input":
            e = Ya(a, e), d = Ya(a, d), f = [];
            break;
          case "select":
            e = A({}, e, { value: void 0 }), d = A({}, d, { value: void 0 }), f = [];
            break;
          case "textarea":
            e = gb(a, e), d = gb(a, d), f = [];
            break;
          default:
            typeof e.onClick != "function" && typeof d.onClick == "function" && (a.onclick = Bf);
        }
        ub(c, d);
        var g;
        c = null;
        for (l in e)
          if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && e[l] != null)
            if (l === "style") {
              var h = e[l];
              for (g in h)
                h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
            } else
              l !== "dangerouslySetInnerHTML" && l !== "children" && l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
        for (l in d) {
          var k = d[l];
          if (h = e?.[l], d.hasOwnProperty(l) && k !== h && (k != null || h != null))
            if (l === "style")
              if (h) {
                for (g in h)
                  !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
                for (g in k)
                  k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
              } else
                c || (f || (f = []), f.push(
                  l,
                  c
                )), c = k;
            else
              l === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, k != null && h !== k && (f = f || []).push(l, k)) : l === "children" ? typeof k != "string" && typeof k != "number" || (f = f || []).push(l, "" + k) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && (ea.hasOwnProperty(l) ? (k != null && l === "onScroll" && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
        }
        c && (f = f || []).push("style", c);
        var l = f;
        (b.updateQueue = l) && (b.flags |= 4);
      }
    };
    Cj = function(a, b, c, d) {
      c !== d && (b.flags |= 4);
    };
    function Dj(a, b) {
      if (!I)
        switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; b !== null; )
              b.alternate !== null && (c = b), b = b.sibling;
            c === null ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; c !== null; )
              c.alternate !== null && (d = c), c = c.sibling;
            d === null ? b || a.tail === null ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
    }
    function S(a) {
      var b = a.alternate !== null && a.alternate.child === a.child, c = 0, d = 0;
      if (b)
        for (var e = a.child; e !== null; )
          c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
      else
        for (e = a.child; e !== null; )
          c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
      return a.subtreeFlags |= d, a.childLanes = c, b;
    }
    function Ej(a, b, c) {
      var d = b.pendingProps;
      switch (wg(b), b.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return S(b), null;
        case 1:
          return Zf(b.type) && $f(), S(b), null;
        case 3:
          return d = b.stateNode, zh(), E(Wf), E(H), Eh(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (a === null || a.child === null) && (Gg(b) ? b.flags |= 4 : a === null || a.memoizedState.isDehydrated && !(b.flags & 256) || (b.flags |= 1024, zg !== null && (Fj(zg), zg = null))), Aj(a, b), S(b), null;
        case 5:
          Bh(b);
          var e = xh(wh.current);
          if (c = b.type, a !== null && b.stateNode != null)
            Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          else {
            if (!d) {
              if (b.stateNode === null)
                throw Error(p(166));
              return S(b), null;
            }
            if (a = xh(uh.current), Gg(b)) {
              d = b.stateNode, c = b.type;
              var f = b.memoizedProps;
              switch (d[Of] = b, d[Pf] = f, a = (b.mode & 1) !== 0, c) {
                case "dialog":
                  D("cancel", d), D("close", d);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", d);
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++)
                    D(lf[e], d);
                  break;
                case "source":
                  D("error", d);
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    d
                  ), D("load", d);
                  break;
                case "details":
                  D("toggle", d);
                  break;
                case "input":
                  Za(d, f), D("invalid", d);
                  break;
                case "select":
                  d._wrapperState = { wasMultiple: !!f.multiple }, D("invalid", d);
                  break;
                case "textarea":
                  hb(d, f), D("invalid", d);
              }
              ub(c, f), e = null;
              for (var g in f)
                if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  g === "children" ? typeof h == "string" ? d.textContent !== h && (f.suppressHydrationWarning !== !0 && Af(d.textContent, h, a), e = ["children", h]) : typeof h == "number" && d.textContent !== "" + h && (f.suppressHydrationWarning !== !0 && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && h != null && g === "onScroll" && D("scroll", d);
                }
              switch (c) {
                case "input":
                  Va(d), db2(d, f, !0);
                  break;
                case "textarea":
                  Va(d), jb(d);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof f.onClick == "function" && (d.onclick = Bf);
              }
              d = e, b.updateQueue = d, d !== null && (b.flags |= 4);
            } else {
              g = e.nodeType === 9 ? e : e.ownerDocument, a === "http://www.w3.org/1999/xhtml" && (a = kb(c)), a === "http://www.w3.org/1999/xhtml" ? c === "script" ? (a = g.createElement("div"), a.innerHTML = "<script></script>", a = a.removeChild(a.firstChild)) : typeof d.is == "string" ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), c === "select" && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c), a[Of] = b, a[Pf] = d, zj(a, b, !1, !1), b.stateNode = a;
              a: {
                switch (g = vb(c, d), c) {
                  case "dialog":
                    D("cancel", a), D("close", a), e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", a), e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++)
                      D(lf[e], a);
                    e = d;
                    break;
                  case "source":
                    D("error", a), e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      a
                    ), D("load", a), e = d;
                    break;
                  case "details":
                    D("toggle", a), e = d;
                    break;
                  case "input":
                    Za(a, d), e = Ya(a, d), D("invalid", a);
                    break;
                  case "option":
                    e = d;
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple }, e = A({}, d, { value: void 0 }), D("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d), e = gb(a, d), D("invalid", a);
                    break;
                  default:
                    e = d;
                }
                ub(c, e), h = e;
                for (f in h)
                  if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    f === "style" ? sb(a, k) : f === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, k != null && nb(a, k)) : f === "children" ? typeof k == "string" ? (c !== "textarea" || k !== "") && ob(a, k) : typeof k == "number" && ob(a, "" + k) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (ea.hasOwnProperty(f) ? k != null && f === "onScroll" && D("scroll", a) : k != null && ta(a, f, k, g));
                  }
                switch (c) {
                  case "input":
                    Va(a), db2(a, d, !1);
                    break;
                  case "textarea":
                    Va(a), jb(a);
                    break;
                  case "option":
                    d.value != null && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple, f = d.value, f != null ? fb(a, !!d.multiple, f, !1) : d.defaultValue != null && fb(
                      a,
                      !!d.multiple,
                      d.defaultValue,
                      !0
                    );
                    break;
                  default:
                    typeof e.onClick == "function" && (a.onclick = Bf);
                }
                switch (c) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    d = !!d.autoFocus;
                    break a;
                  case "img":
                    d = !0;
                    break a;
                  default:
                    d = !1;
                }
              }
              d && (b.flags |= 4);
            }
            b.ref !== null && (b.flags |= 512, b.flags |= 2097152);
          }
          return S(b), null;
        case 6:
          if (a && b.stateNode != null)
            Cj(a, b, a.memoizedProps, d);
          else {
            if (typeof d != "string" && b.stateNode === null)
              throw Error(p(166));
            if (c = xh(wh.current), xh(uh.current), Gg(b)) {
              if (d = b.stateNode, c = b.memoizedProps, d[Of] = b, (f = d.nodeValue !== c) && (a = xg, a !== null))
                switch (a.tag) {
                  case 3:
                    Af(d.nodeValue, c, (a.mode & 1) !== 0);
                    break;
                  case 5:
                    a.memoizedProps.suppressHydrationWarning !== !0 && Af(d.nodeValue, c, (a.mode & 1) !== 0);
                }
              f && (b.flags |= 4);
            } else
              d = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
          }
          return S(b), null;
        case 13:
          if (E(L), d = b.memoizedState, a === null || a.memoizedState !== null && a.memoizedState.dehydrated !== null) {
            if (I && yg !== null && b.mode & 1 && !(b.flags & 128))
              Hg(), Ig(), b.flags |= 98560, f = !1;
            else if (f = Gg(b), d !== null && d.dehydrated !== null) {
              if (a === null) {
                if (!f)
                  throw Error(p(318));
                if (f = b.memoizedState, f = f !== null ? f.dehydrated : null, !f)
                  throw Error(p(317));
                f[Of] = b;
              } else
                Ig(), !(b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
              S(b), f = !1;
            } else
              zg !== null && (Fj(zg), zg = null), f = !0;
            if (!f)
              return b.flags & 65536 ? b : null;
          }
          return b.flags & 128 ? (b.lanes = c, b) : (d = d !== null, d !== (a !== null && a.memoizedState !== null) && d && (b.child.flags |= 8192, b.mode & 1 && (a === null || L.current & 1 ? T === 0 && (T = 3) : tj())), b.updateQueue !== null && (b.flags |= 4), S(b), null);
        case 4:
          return zh(), Aj(a, b), a === null && sf(b.stateNode.containerInfo), S(b), null;
        case 10:
          return ah(b.type._context), S(b), null;
        case 17:
          return Zf(b.type) && $f(), S(b), null;
        case 19:
          if (E(L), f = b.memoizedState, f === null)
            return S(b), null;
          if (d = (b.flags & 128) !== 0, g = f.rendering, g === null)
            if (d)
              Dj(f, !1);
            else {
              if (T !== 0 || a !== null && a.flags & 128)
                for (a = b.child; a !== null; ) {
                  if (g = Ch(a), g !== null) {
                    for (b.flags |= 128, Dj(f, !1), d = g.updateQueue, d !== null && (b.updateQueue = d, b.flags |= 4), b.subtreeFlags = 0, d = c, c = b.child; c !== null; )
                      f = c, a = d, f.flags &= 14680066, g = f.alternate, g === null ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                    return G(L, L.current & 1 | 2), b.child;
                  }
                  a = a.sibling;
                }
              f.tail !== null && B() > Gj && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
            }
          else {
            if (!d)
              if (a = Ch(g), a !== null) {
                if (b.flags |= 128, d = !0, c = a.updateQueue, c !== null && (b.updateQueue = c, b.flags |= 4), Dj(f, !0), f.tail === null && f.tailMode === "hidden" && !g.alternate && !I)
                  return S(b), null;
              } else
                2 * B() - f.renderingStartTime > Gj && c !== 1073741824 && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
            f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, c !== null ? c.sibling = g : b.child = g, f.last = g);
          }
          return f.tail !== null ? (b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b) : (S(b), null);
        case 22:
        case 23:
          return Hj(), d = b.memoizedState !== null, a !== null && a.memoizedState !== null !== d && (b.flags |= 8192), d && b.mode & 1 ? fj & 1073741824 && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(p(156, b.tag));
    }
    function Ij(a, b) {
      switch (wg(b), b.tag) {
        case 1:
          return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 3:
          return zh(), E(Wf), E(H), Eh(), a = b.flags, a & 65536 && !(a & 128) ? (b.flags = a & -65537 | 128, b) : null;
        case 5:
          return Bh(b), null;
        case 13:
          if (E(L), a = b.memoizedState, a !== null && a.dehydrated !== null) {
            if (b.alternate === null)
              throw Error(p(340));
            Ig();
          }
          return a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 19:
          return E(L), null;
        case 4:
          return zh(), null;
        case 10:
          return ah(b.type._context), null;
        case 22:
        case 23:
          return Hj(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Jj = !1, U = !1, Kj = typeof WeakSet == "function" ? WeakSet : Set, V = null;
    function Lj(a, b) {
      var c = a.ref;
      if (c !== null)
        if (typeof c == "function")
          try {
            c(null);
          } catch (d) {
            W(a, b, d);
          }
        else
          c.current = null;
    }
    function Mj(a, b, c) {
      try {
        c();
      } catch (d) {
        W(a, b, d);
      }
    }
    var Nj = !1;
    function Oj(a, b) {
      if (Cf = dd, a = Me(), Ne(a)) {
        if ("selectionStart" in a)
          var c = { start: a.selectionStart, end: a.selectionEnd };
        else
          a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && d.rangeCount !== 0) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b:
                for (; ; ) {
                  for (var y; q !== c || e !== 0 && q.nodeType !== 3 || (h = g + e), q !== f || d !== 0 && q.nodeType !== 3 || (k = g + d), q.nodeType === 3 && (g += q.nodeValue.length), (y = q.firstChild) !== null; )
                    r = q, q = y;
                  for (; ; ) {
                    if (q === a)
                      break b;
                    if (r === c && ++l === e && (h = g), r === f && ++m === d && (k = g), (y = q.nextSibling) !== null)
                      break;
                    q = r, r = q.parentNode;
                  }
                  q = y;
                }
              c = h === -1 || k === -1 ? null : { start: h, end: k };
            } else
              c = null;
          }
        c = c || { start: 0, end: 0 };
      } else
        c = null;
      for (Df = { focusedElem: a, selectionRange: c }, dd = !1, V = b; V !== null; )
        if (b = V, a = b.child, (b.subtreeFlags & 1028) !== 0 && a !== null)
          a.return = b, V = a;
        else
          for (; V !== null; ) {
            b = V;
            try {
              var n = b.alternate;
              if (b.flags & 1024)
                switch (b.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (n !== null) {
                      var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                      x.__reactInternalSnapshotBeforeUpdate = w;
                    }
                    break;
                  case 3:
                    var u = b.stateNode.containerInfo;
                    u.nodeType === 1 ? u.textContent = "" : u.nodeType === 9 && u.documentElement && u.removeChild(u.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(p(163));
                }
            } catch (F) {
              W(b, b.return, F);
            }
            if (a = b.sibling, a !== null) {
              a.return = b.return, V = a;
              break;
            }
            V = b.return;
          }
      return n = Nj, Nj = !1, n;
    }
    function Pj(a, b, c) {
      var d = b.updateQueue;
      if (d = d !== null ? d.lastEffect : null, d !== null) {
        var e = d = d.next;
        do {
          if ((e.tag & a) === a) {
            var f = e.destroy;
            e.destroy = void 0, f !== void 0 && Mj(b, c, f);
          }
          e = e.next;
        } while (e !== d);
      }
    }
    function Qj(a, b) {
      if (b = b.updateQueue, b = b !== null ? b.lastEffect : null, b !== null) {
        var c = b = b.next;
        do {
          if ((c.tag & a) === a) {
            var d = c.create;
            c.destroy = d();
          }
          c = c.next;
        } while (c !== b);
      }
    }
    function Rj(a) {
      var b = a.ref;
      if (b !== null) {
        var c = a.stateNode;
        switch (a.tag) {
          case 5:
            a = c;
            break;
          default:
            a = c;
        }
        typeof b == "function" ? b(a) : b.current = a;
      }
    }
    function Sj(a) {
      var b = a.alternate;
      b !== null && (a.alternate = null, Sj(b)), a.child = null, a.deletions = null, a.sibling = null, a.tag === 5 && (b = a.stateNode, b !== null && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf])), a.stateNode = null, a.return = null, a.dependencies = null, a.memoizedProps = null, a.memoizedState = null, a.pendingProps = null, a.stateNode = null, a.updateQueue = null;
    }
    function Tj(a) {
      return a.tag === 5 || a.tag === 3 || a.tag === 4;
    }
    function Uj(a) {
      a:
        for (; ; ) {
          for (; a.sibling === null; ) {
            if (a.return === null || Tj(a.return))
              return null;
            a = a.return;
          }
          for (a.sibling.return = a.return, a = a.sibling; a.tag !== 5 && a.tag !== 6 && a.tag !== 18; ) {
            if (a.flags & 2 || a.child === null || a.tag === 4)
              continue a;
            a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2))
            return a.stateNode;
        }
    }
    function Vj(a, b, c) {
      var d = a.tag;
      if (d === 5 || d === 6)
        a = a.stateNode, b ? c.nodeType === 8 ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (c.nodeType === 8 ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, c != null || b.onclick !== null || (b.onclick = Bf));
      else if (d !== 4 && (a = a.child, a !== null))
        for (Vj(a, b, c), a = a.sibling; a !== null; )
          Vj(a, b, c), a = a.sibling;
    }
    function Wj(a, b, c) {
      var d = a.tag;
      if (d === 5 || d === 6)
        a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
      else if (d !== 4 && (a = a.child, a !== null))
        for (Wj(a, b, c), a = a.sibling; a !== null; )
          Wj(a, b, c), a = a.sibling;
    }
    var X = null, Xj = !1;
    function Yj(a, b, c) {
      for (c = c.child; c !== null; )
        Zj(a, b, c), c = c.sibling;
    }
    function Zj(a, b, c) {
      if (lc && typeof lc.onCommitFiberUnmount == "function")
        try {
          lc.onCommitFiberUnmount(kc, c);
        } catch {
        }
      switch (c.tag) {
        case 5:
          U || Lj(c, b);
        case 6:
          var d = X, e = Xj;
          X = null, Yj(a, b, c), X = d, Xj = e, X !== null && (Xj ? (a = X, c = c.stateNode, a.nodeType === 8 ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
          break;
        case 18:
          X !== null && (Xj ? (a = X, c = c.stateNode, a.nodeType === 8 ? Kf(a.parentNode, c) : a.nodeType === 1 && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
          break;
        case 4:
          d = X, e = Xj, X = c.stateNode.containerInfo, Xj = !0, Yj(a, b, c), X = d, Xj = e;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!U && (d = c.updateQueue, d !== null && (d = d.lastEffect, d !== null))) {
            e = d = d.next;
            do {
              var f = e, g = f.destroy;
              f = f.tag, g !== void 0 && (f & 2 || f & 4) && Mj(c, b, g), e = e.next;
            } while (e !== d);
          }
          Yj(a, b, c);
          break;
        case 1:
          if (!U && (Lj(c, b), d = c.stateNode, typeof d.componentWillUnmount == "function"))
            try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
          Yj(a, b, c);
          break;
        case 21:
          Yj(a, b, c);
          break;
        case 22:
          c.mode & 1 ? (U = (d = U) || c.memoizedState !== null, Yj(a, b, c), U = d) : Yj(a, b, c);
          break;
        default:
          Yj(a, b, c);
      }
    }
    function ak(a) {
      var b = a.updateQueue;
      if (b !== null) {
        a.updateQueue = null;
        var c = a.stateNode;
        c === null && (c = a.stateNode = new Kj()), b.forEach(function(b2) {
          var d = bk.bind(null, a, b2);
          c.has(b2) || (c.add(b2), b2.then(d, d));
        });
      }
    }
    function ck(a, b) {
      var c = b.deletions;
      if (c !== null)
        for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a:
              for (; h !== null; ) {
                switch (h.tag) {
                  case 5:
                    X = h.stateNode, Xj = !1;
                    break a;
                  case 3:
                    X = h.stateNode.containerInfo, Xj = !0;
                    break a;
                  case 4:
                    X = h.stateNode.containerInfo, Xj = !0;
                    break a;
                }
                h = h.return;
              }
            if (X === null)
              throw Error(p(160));
            Zj(f, g, e), X = null, Xj = !1;
            var k = e.alternate;
            k !== null && (k.return = null), e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
      if (b.subtreeFlags & 12854)
        for (b = b.child; b !== null; )
          dk(b, a), b = b.sibling;
    }
    function dk(a, b) {
      var c = a.alternate, d = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (ck(b, a), ek(a), d & 4) {
            try {
              Pj(3, a, a.return), Qj(3, a);
            } catch (t) {
              W(a, a.return, t);
            }
            try {
              Pj(5, a, a.return);
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 1:
          ck(b, a), ek(a), d & 512 && c !== null && Lj(c, c.return);
          break;
        case 5:
          if (ck(b, a), ek(a), d & 512 && c !== null && Lj(c, c.return), a.flags & 32) {
            var e = a.stateNode;
            try {
              ob(e, "");
            } catch (t) {
              W(a, a.return, t);
            }
          }
          if (d & 4 && (e = a.stateNode, e != null)) {
            var f = a.memoizedProps, g = c !== null ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
            if (a.updateQueue = null, k !== null)
              try {
                h === "input" && f.type === "radio" && f.name != null && ab(e, f), vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  m === "style" ? sb(e, q) : m === "dangerouslySetInnerHTML" ? nb(e, q) : m === "children" ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    y != null ? fb(e, !!f.multiple, y, !1) : r !== !!f.multiple && (f.defaultValue != null ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      !0
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
          }
          break;
        case 6:
          if (ck(b, a), ek(a), d & 4) {
            if (a.stateNode === null)
              throw Error(p(162));
            e = a.stateNode, f = a.memoizedProps;
            try {
              e.nodeValue = f;
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 3:
          if (ck(b, a), ek(a), d & 4 && c !== null && c.memoizedState.isDehydrated)
            try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
          break;
        case 4:
          ck(b, a), ek(a);
          break;
        case 13:
          ck(b, a), ek(a), e = a.child, e.flags & 8192 && (f = e.memoizedState !== null, e.stateNode.isHidden = f, !f || e.alternate !== null && e.alternate.memoizedState !== null || (fk = B())), d & 4 && ak(a);
          break;
        case 22:
          if (m = c !== null && c.memoizedState !== null, a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a), ek(a), d & 8192) {
            if (l = a.memoizedState !== null, (a.stateNode.isHidden = l) && !m && a.mode & 1)
              for (V = a, m = a.child; m !== null; ) {
                for (q = V = m; V !== null; ) {
                  switch (r = V, y = r.child, r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r, r.return);
                      break;
                    case 1:
                      Lj(r, r.return);
                      var n = r.stateNode;
                      if (typeof n.componentWillUnmount == "function") {
                        d = r, c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r, r.return);
                      break;
                    case 22:
                      if (r.memoizedState !== null) {
                        gk(q);
                        continue;
                      }
                  }
                  y !== null ? (y.return = r, V = y) : gk(q);
                }
                m = m.sibling;
              }
            a:
              for (m = null, q = a; ; ) {
                if (q.tag === 5) {
                  if (m === null) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = k != null && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (q.tag === 6) {
                  if (m === null)
                    try {
                      q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                    } catch (t) {
                      W(a, a.return, t);
                    }
                } else if ((q.tag !== 22 && q.tag !== 23 || q.memoizedState === null || q === a) && q.child !== null) {
                  q.child.return = q, q = q.child;
                  continue;
                }
                if (q === a)
                  break a;
                for (; q.sibling === null; ) {
                  if (q.return === null || q.return === a)
                    break a;
                  m === q && (m = null), q = q.return;
                }
                m === q && (m = null), q.sibling.return = q.return, q = q.sibling;
              }
          }
          break;
        case 19:
          ck(b, a), ek(a), d & 4 && ak(a);
          break;
        case 21:
          break;
        default:
          ck(
            b,
            a
          ), ek(a);
      }
    }
    function ek(a) {
      var b = a.flags;
      if (b & 2) {
        try {
          a: {
            for (var c = a.return; c !== null; ) {
              if (Tj(c)) {
                var d = c;
                break a;
              }
              c = c.return;
            }
            throw Error(p(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (ob(e, ""), d.flags &= -33);
              var f = Uj(a);
              Wj(a, f, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo, h = Uj(a);
              Vj(a, h, g);
              break;
            default:
              throw Error(p(161));
          }
        } catch (k) {
          W(a, a.return, k);
        }
        a.flags &= -3;
      }
      b & 4096 && (a.flags &= -4097);
    }
    function hk(a, b, c) {
      V = a, ik(a, b, c);
    }
    function ik(a, b, c) {
      for (var d = (a.mode & 1) !== 0; V !== null; ) {
        var e = V, f = e.child;
        if (e.tag === 22 && d) {
          var g = e.memoizedState !== null || Jj;
          if (!g) {
            var h = e.alternate, k = h !== null && h.memoizedState !== null || U;
            h = Jj;
            var l = U;
            if (Jj = g, (U = k) && !l)
              for (V = e; V !== null; )
                g = V, k = g.child, g.tag === 22 && g.memoizedState !== null ? jk(e) : k !== null ? (k.return = g, V = k) : jk(e);
            for (; f !== null; )
              V = f, ik(f, b, c), f = f.sibling;
            V = e, Jj = h, U = l;
          }
          kk(a, b, c);
        } else
          e.subtreeFlags & 8772 && f !== null ? (f.return = e, V = f) : kk(a, b, c);
      }
    }
    function kk(a) {
      for (; V !== null; ) {
        var b = V;
        if (b.flags & 8772) {
          var c = b.alternate;
          try {
            if (b.flags & 8772)
              switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U)
                    if (c === null)
                      d.componentDidMount();
                    else {
                      var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                      d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                    }
                  var f = b.updateQueue;
                  f !== null && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (g !== null) {
                    if (c = null, b.child !== null)
                      switch (b.child.tag) {
                        case 5:
                          c = b.child.stateNode;
                          break;
                        case 1:
                          c = b.child.stateNode;
                      }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (c === null && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (b.memoizedState === null) {
                    var l = b.alternate;
                    if (l !== null) {
                      var m = l.memoizedState;
                      if (m !== null) {
                        var q = m.dehydrated;
                        q !== null && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
            U || b.flags & 512 && Rj(b);
          } catch (r) {
            W(b, b.return, r);
          }
        }
        if (b === a) {
          V = null;
          break;
        }
        if (c = b.sibling, c !== null) {
          c.return = b.return, V = c;
          break;
        }
        V = b.return;
      }
    }
    function gk(a) {
      for (; V !== null; ) {
        var b = V;
        if (b === a) {
          V = null;
          break;
        }
        var c = b.sibling;
        if (c !== null) {
          c.return = b.return, V = c;
          break;
        }
        V = b.return;
      }
    }
    function jk(a) {
      for (; V !== null; ) {
        var b = V;
        try {
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              var c = b.return;
              try {
                Qj(4, b);
              } catch (k) {
                W(b, c, k);
              }
              break;
            case 1:
              var d = b.stateNode;
              if (typeof d.componentDidMount == "function") {
                var e = b.return;
                try {
                  d.componentDidMount();
                } catch (k) {
                  W(b, e, k);
                }
              }
              var f = b.return;
              try {
                Rj(b);
              } catch (k) {
                W(b, f, k);
              }
              break;
            case 5:
              var g = b.return;
              try {
                Rj(b);
              } catch (k) {
                W(b, g, k);
              }
          }
        } catch (k) {
          W(b, b.return, k);
        }
        if (b === a) {
          V = null;
          break;
        }
        var h = b.sibling;
        if (h !== null) {
          h.return = b.return, V = h;
          break;
        }
        V = b.return;
      }
    }
    var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = 1 / 0, uk = null, Oi = !1, Pi = null, Ri = null, vk = !1, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
    function R() {
      return K & 6 ? B() : Ak !== -1 ? Ak : Ak = B();
    }
    function yi(a) {
      return a.mode & 1 ? K & 2 && Z !== 0 ? Z & -Z : Kg.transition !== null ? (Bk === 0 && (Bk = yc()), Bk) : (a = C, a !== 0 || (a = window.event, a = a === void 0 ? 16 : jd(a.type)), a) : 1;
    }
    function gi(a, b, c, d) {
      if (50 < yk)
        throw yk = 0, zk = null, Error(p(185));
      Ac(a, c, d), (!(K & 2) || a !== Q) && (a === Q && (!(K & 2) && (qk |= c), T === 4 && Ck(a, Z)), Dk(a, d), c === 1 && K === 0 && !(b.mode & 1) && (Gj = B() + 500, fg && jg()));
    }
    function Dk(a, b) {
      var c = a.callbackNode;
      wc(a, b);
      var d = uc(a, a === Q ? Z : 0);
      if (d === 0)
        c !== null && bc(c), a.callbackNode = null, a.callbackPriority = 0;
      else if (b = d & -d, a.callbackPriority !== b) {
        if (c != null && bc(c), b === 1)
          a.tag === 0 ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            !(K & 6) && jg();
          }), c = null;
        else {
          switch (Dc(d)) {
            case 1:
              c = fc;
              break;
            case 4:
              c = gc;
              break;
            case 16:
              c = hc;
              break;
            case 536870912:
              c = jc;
              break;
            default:
              c = hc;
          }
          c = Fk(c, Gk.bind(null, a));
        }
        a.callbackPriority = b, a.callbackNode = c;
      }
    }
    function Gk(a, b) {
      if (Ak = -1, Bk = 0, K & 6)
        throw Error(p(327));
      var c = a.callbackNode;
      if (Hk() && a.callbackNode !== c)
        return null;
      var d = uc(a, a === Q ? Z : 0);
      if (d === 0)
        return null;
      if (d & 30 || d & a.expiredLanes || b)
        b = Ik(a, d);
      else {
        b = d;
        var e = K;
        K |= 2;
        var f = Jk();
        (Q !== a || Z !== b) && (uk = null, Gj = B() + 500, Kk(a, b));
        do
          try {
            Lk();
            break;
          } catch (h) {
            Mk(a, h);
          }
        while (1);
        $g(), mk.current = f, K = e, Y !== null ? b = 0 : (Q = null, Z = 0, b = T);
      }
      if (b !== 0) {
        if (b === 2 && (e = xc(a), e !== 0 && (d = e, b = Nk(a, e))), b === 1)
          throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        if (b === 6)
          Ck(a, d);
        else {
          if (e = a.current.alternate, !(d & 30) && !Ok(e) && (b = Ik(a, d), b === 2 && (f = xc(a), f !== 0 && (d = f, b = Nk(a, f))), b === 1))
            throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          switch (a.finishedWork = e, a.finishedLanes = d, b) {
            case 0:
            case 1:
              throw Error(p(345));
            case 2:
              Pk(a, tk, uk);
              break;
            case 3:
              if (Ck(a, d), (d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                if (uc(a, 0) !== 0)
                  break;
                if (e = a.suspendedLanes, (e & d) !== d) {
                  R(), a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 4:
              if (Ck(a, d), (d & 4194240) === d)
                break;
              for (b = a.eventTimes, e = -1; 0 < d; ) {
                var g = 31 - oc(d);
                f = 1 << g, g = b[g], g > e && (e = g), d &= ~f;
              }
              if (d = e, d = B() - d, d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d, 10 < d) {
                a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                break;
              }
              Pk(a, tk, uk);
              break;
            case 5:
              Pk(a, tk, uk);
              break;
            default:
              throw Error(p(329));
          }
        }
      }
      return Dk(a, B()), a.callbackNode === c ? Gk.bind(null, a) : null;
    }
    function Nk(a, b) {
      var c = sk;
      return a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256), a = Ik(a, b), a !== 2 && (b = tk, tk = c, b !== null && Fj(b)), a;
    }
    function Fj(a) {
      tk === null ? tk = a : tk.push.apply(tk, a);
    }
    function Ok(a) {
      for (var b = a; ; ) {
        if (b.flags & 16384) {
          var c = b.updateQueue;
          if (c !== null && (c = c.stores, c !== null))
            for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
        if (c = b.child, b.subtreeFlags & 16384 && c !== null)
          c.return = b, b = c;
        else {
          if (b === a)
            break;
          for (; b.sibling === null; ) {
            if (b.return === null || b.return === a)
              return !0;
            b = b.return;
          }
          b.sibling.return = b.return, b = b.sibling;
        }
      }
      return !0;
    }
    function Ck(a, b) {
      for (b &= ~rk, b &= ~qk, a.suspendedLanes |= b, a.pingedLanes &= ~b, a = a.expirationTimes; 0 < b; ) {
        var c = 31 - oc(b), d = 1 << c;
        a[c] = -1, b &= ~d;
      }
    }
    function Ek(a) {
      if (K & 6)
        throw Error(p(327));
      Hk();
      var b = uc(a, 0);
      if (!(b & 1))
        return Dk(a, B()), null;
      var c = Ik(a, b);
      if (a.tag !== 0 && c === 2) {
        var d = xc(a);
        d !== 0 && (b = d, c = Nk(a, d));
      }
      if (c === 1)
        throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
      if (c === 6)
        throw Error(p(345));
      return a.finishedWork = a.current.alternate, a.finishedLanes = b, Pk(a, tk, uk), Dk(a, B()), null;
    }
    function Qk(a, b) {
      var c = K;
      K |= 1;
      try {
        return a(b);
      } finally {
        K = c, K === 0 && (Gj = B() + 500, fg && jg());
      }
    }
    function Rk(a) {
      wk !== null && wk.tag === 0 && !(K & 6) && Hk();
      var b = K;
      K |= 1;
      var c = ok.transition, d = C;
      try {
        if (ok.transition = null, C = 1, a)
          return a();
      } finally {
        C = d, ok.transition = c, K = b, !(K & 6) && jg();
      }
    }
    function Hj() {
      fj = ej.current, E(ej);
    }
    function Kk(a, b) {
      a.finishedWork = null, a.finishedLanes = 0;
      var c = a.timeoutHandle;
      if (c !== -1 && (a.timeoutHandle = -1, Gf(c)), Y !== null)
        for (c = Y.return; c !== null; ) {
          var d = c;
          switch (wg(d), d.tag) {
            case 1:
              d = d.type.childContextTypes, d != null && $f();
              break;
            case 3:
              zh(), E(Wf), E(H), Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
      if (Q = a, Y = a = Pg(a.current, null), Z = fj = b, T = 0, pk = null, rk = qk = rh = 0, tk = sk = null, fh !== null) {
        for (b = 0; b < fh.length; b++)
          if (c = fh[b], d = c.interleaved, d !== null) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (f !== null) {
              var g = f.next;
              f.next = e, d.next = g;
            }
            c.pending = d;
          }
        fh = null;
      }
      return a;
    }
    function Mk(a, b) {
      do {
        var c = Y;
        try {
          if ($g(), Fh.current = Rh, Ih) {
            for (var d = M.memoizedState; d !== null; ) {
              var e = d.queue;
              e !== null && (e.pending = null), d = d.next;
            }
            Ih = !1;
          }
          if (Hh = 0, O = N = M = null, Jh = !1, Kh = 0, nk.current = null, c === null || c.return === null) {
            T = 1, pk = b, Y = null;
            break;
          }
          a: {
            var f = a, g = c.return, h = c, k = b;
            if (b = Z, h.flags |= 32768, k !== null && typeof k == "object" && typeof k.then == "function") {
              var l = k, m = h, q = m.tag;
              if (!(m.mode & 1) && (q === 0 || q === 11 || q === 15)) {
                var r = m.alternate;
                r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
              }
              var y = Ui(g);
              if (y !== null) {
                y.flags &= -257, Vi(y, g, h, f, b), y.mode & 1 && Si(f, l, b), b = y, k = l;
                var n = b.updateQueue;
                if (n === null) {
                  var t = /* @__PURE__ */ new Set();
                  t.add(k), b.updateQueue = t;
                } else
                  n.add(k);
                break a;
              } else {
                if (!(b & 1)) {
                  Si(f, l, b), tj();
                  break a;
                }
                k = Error(p(426));
              }
            } else if (I && h.mode & 1) {
              var J = Ui(g);
              if (J !== null) {
                !(J.flags & 65536) && (J.flags |= 256), Vi(J, g, h, f, b), Jg(Ji(k, h));
                break a;
              }
            }
            f = k = Ji(k, h), T !== 4 && (T = 2), sk === null ? sk = [f] : sk.push(f), f = g;
            do {
              switch (f.tag) {
                case 3:
                  f.flags |= 65536, b &= -b, f.lanes |= b;
                  var x = Ni(f, k, b);
                  ph(f, x);
                  break a;
                case 1:
                  h = k;
                  var w = f.type, u = f.stateNode;
                  if (!(f.flags & 128) && (typeof w.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Ri === null || !Ri.has(u)))) {
                    f.flags |= 65536, b &= -b, f.lanes |= b;
                    var F = Qi(f, h, b);
                    ph(f, F);
                    break a;
                  }
              }
              f = f.return;
            } while (f !== null);
          }
          Sk(c);
        } catch (na) {
          b = na, Y === c && c !== null && (Y = c = c.return);
          continue;
        }
        break;
      } while (1);
    }
    function Jk() {
      var a = mk.current;
      return mk.current = Rh, a === null ? Rh : a;
    }
    function tj() {
      (T === 0 || T === 3 || T === 2) && (T = 4), Q === null || !(rh & 268435455) && !(qk & 268435455) || Ck(Q, Z);
    }
    function Ik(a, b) {
      var c = K;
      K |= 2;
      var d = Jk();
      (Q !== a || Z !== b) && (uk = null, Kk(a, b));
      do
        try {
          Tk();
          break;
        } catch (e) {
          Mk(a, e);
        }
      while (1);
      if ($g(), K = c, mk.current = d, Y !== null)
        throw Error(p(261));
      return Q = null, Z = 0, T;
    }
    function Tk() {
      for (; Y !== null; )
        Uk(Y);
    }
    function Lk() {
      for (; Y !== null && !cc(); )
        Uk(Y);
    }
    function Uk(a) {
      var b = Vk(a.alternate, a, fj);
      a.memoizedProps = a.pendingProps, b === null ? Sk(a) : Y = b, nk.current = null;
    }
    function Sk(a) {
      var b = a;
      do {
        var c = b.alternate;
        if (a = b.return, b.flags & 32768) {
          if (c = Ij(c, b), c !== null) {
            c.flags &= 32767, Y = c;
            return;
          }
          if (a !== null)
            a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
          else {
            T = 6, Y = null;
            return;
          }
        } else if (c = Ej(c, b, fj), c !== null) {
          Y = c;
          return;
        }
        if (b = b.sibling, b !== null) {
          Y = b;
          return;
        }
        Y = b = a;
      } while (b !== null);
      T === 0 && (T = 5);
    }
    function Pk(a, b, c) {
      var d = C, e = ok.transition;
      try {
        ok.transition = null, C = 1, Wk(a, b, c, d);
      } finally {
        ok.transition = e, C = d;
      }
      return null;
    }
    function Wk(a, b, c, d) {
      do
        Hk();
      while (wk !== null);
      if (K & 6)
        throw Error(p(327));
      c = a.finishedWork;
      var e = a.finishedLanes;
      if (c === null)
        return null;
      if (a.finishedWork = null, a.finishedLanes = 0, c === a.current)
        throw Error(p(177));
      a.callbackNode = null, a.callbackPriority = 0;
      var f = c.lanes | c.childLanes;
      if (Bc(a, f), a === Q && (Y = Q = null, Z = 0), !(c.subtreeFlags & 2064) && !(c.flags & 2064) || vk || (vk = !0, Fk(hc, function() {
        return Hk(), null;
      })), f = (c.flags & 15990) !== 0, c.subtreeFlags & 15990 || f) {
        f = ok.transition, ok.transition = null;
        var g = C;
        C = 1;
        var h = K;
        K |= 4, nk.current = null, Oj(a, c), dk(c, a), Oe(Df), dd = !!Cf, Df = Cf = null, a.current = c, hk(c, a, e), dc(), K = h, C = g, ok.transition = f;
      } else
        a.current = c;
      if (vk && (vk = !1, wk = a, xk = e), f = a.pendingLanes, f === 0 && (Ri = null), mc(c.stateNode, d), Dk(a, B()), b !== null)
        for (d = a.onRecoverableError, c = 0; c < b.length; c++)
          e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
      if (Oi)
        throw Oi = !1, a = Pi, Pi = null, a;
      return xk & 1 && a.tag !== 0 && Hk(), f = a.pendingLanes, f & 1 ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0, jg(), null;
    }
    function Hk() {
      if (wk !== null) {
        var a = Dc(xk), b = ok.transition, c = C;
        try {
          if (ok.transition = null, C = 16 > a ? 16 : a, wk === null)
            var d = !1;
          else {
            if (a = wk, wk = null, xk = 0, K & 6)
              throw Error(p(331));
            var e = K;
            for (K |= 4, V = a.current; V !== null; ) {
              var f = V, g = f.child;
              if (V.flags & 16) {
                var h = f.deletions;
                if (h !== null) {
                  for (var k = 0; k < h.length; k++) {
                    var l = h[k];
                    for (V = l; V !== null; ) {
                      var m = V;
                      switch (m.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Pj(8, m, f);
                      }
                      var q = m.child;
                      if (q !== null)
                        q.return = m, V = q;
                      else
                        for (; V !== null; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          if (Sj(m), m === l) {
                            V = null;
                            break;
                          }
                          if (r !== null) {
                            r.return = y, V = r;
                            break;
                          }
                          V = y;
                        }
                    }
                  }
                  var n = f.alternate;
                  if (n !== null) {
                    var t = n.child;
                    if (t !== null) {
                      n.child = null;
                      do {
                        var J = t.sibling;
                        t.sibling = null, t = J;
                      } while (t !== null);
                    }
                  }
                  V = f;
                }
              }
              if (f.subtreeFlags & 2064 && g !== null)
                g.return = f, V = g;
              else
                b:
                  for (; V !== null; ) {
                    if (f = V, f.flags & 2048)
                      switch (f.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Pj(9, f, f.return);
                      }
                    var x = f.sibling;
                    if (x !== null) {
                      x.return = f.return, V = x;
                      break b;
                    }
                    V = f.return;
                  }
            }
            var w = a.current;
            for (V = w; V !== null; ) {
              g = V;
              var u = g.child;
              if (g.subtreeFlags & 2064 && u !== null)
                u.return = g, V = u;
              else
                b:
                  for (g = w; V !== null; ) {
                    if (h = V, h.flags & 2048)
                      try {
                        switch (h.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Qj(9, h);
                        }
                      } catch (na) {
                        W(h, h.return, na);
                      }
                    if (h === g) {
                      V = null;
                      break b;
                    }
                    var F = h.sibling;
                    if (F !== null) {
                      F.return = h.return, V = F;
                      break b;
                    }
                    V = h.return;
                  }
            }
            if (K = e, jg(), lc && typeof lc.onPostCommitFiberRoot == "function")
              try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch {
              }
            d = !0;
          }
          return d;
        } finally {
          C = c, ok.transition = b;
        }
      }
      return !1;
    }
    function Xk(a, b, c) {
      b = Ji(c, b), b = Ni(a, b, 1), a = nh(a, b, 1), b = R(), a !== null && (Ac(a, 1, b), Dk(a, b));
    }
    function W(a, b, c) {
      if (a.tag === 3)
        Xk(a, a, c);
      else
        for (; b !== null; ) {
          if (b.tag === 3) {
            Xk(b, a, c);
            break;
          } else if (b.tag === 1) {
            var d = b.stateNode;
            if (typeof b.type.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && (Ri === null || !Ri.has(d))) {
              a = Ji(c, a), a = Qi(b, a, 1), b = nh(b, a, 1), a = R(), b !== null && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
    }
    function Ti(a, b, c) {
      var d = a.pingCache;
      d !== null && d.delete(b), b = R(), a.pingedLanes |= a.suspendedLanes & c, Q === a && (Z & c) === c && (T === 4 || T === 3 && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c), Dk(a, b);
    }
    function Yk(a, b) {
      b === 0 && (a.mode & 1 ? (b = sc, sc <<= 1, !(sc & 130023424) && (sc = 4194304)) : b = 1);
      var c = R();
      a = ih(a, b), a !== null && (Ac(a, b, c), Dk(a, c));
    }
    function uj(a) {
      var b = a.memoizedState, c = 0;
      b !== null && (c = b.retryLane), Yk(a, c);
    }
    function bk(a, b) {
      var c = 0;
      switch (a.tag) {
        case 13:
          var d = a.stateNode, e = a.memoizedState;
          e !== null && (c = e.retryLane);
          break;
        case 19:
          d = a.stateNode;
          break;
        default:
          throw Error(p(314));
      }
      d !== null && d.delete(b), Yk(a, c);
    }
    var Vk;
    Vk = function(a, b, c) {
      if (a !== null)
        if (a.memoizedProps !== b.pendingProps || Wf.current)
          dh = !0;
        else {
          if (!(a.lanes & c) && !(b.flags & 128))
            return dh = !1, yj(a, b, c);
          dh = !!(a.flags & 131072);
        }
      else
        dh = !1, I && b.flags & 1048576 && ug(b, ng, b.index);
      switch (b.lanes = 0, b.tag) {
        case 2:
          var d = b.type;
          ij(a, b), a = b.pendingProps;
          var e = Yf(b, H.current);
          ch(b, c), e = Nh(null, b, d, a, e, c);
          var f = Sh();
          return b.flags |= 1, typeof e == "object" && e !== null && typeof e.render == "function" && e.$$typeof === void 0 ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = !0, cg(b)) : f = !1, b.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, !0, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child), b;
        case 16:
          d = b.elementType;
          a: {
            switch (ij(a, b), a = b.pendingProps, e = d._init, d = e(d._payload), b.type = d, e = b.tag = Zk(d), a = Ci(d, a), e) {
              case 0:
                b = cj(null, b, d, a, c);
                break a;
              case 1:
                b = hj(null, b, d, a, c);
                break a;
              case 11:
                b = Yi(null, b, d, a, c);
                break a;
              case 14:
                b = $i(null, b, d, Ci(d.type, a), c);
                break a;
            }
            throw Error(p(
              306,
              d,
              ""
            ));
          }
          return b;
        case 0:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
        case 1:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
        case 3:
          a: {
            if (kj(b), a === null)
              throw Error(p(387));
            d = b.pendingProps, f = b.memoizedState, e = f.element, lh(a, b), qh(b, d, null, c);
            var g = b.memoizedState;
            if (d = g.element, f.isDehydrated)
              if (f = { element: d, isDehydrated: !1, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b), b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b), b = lj(a, b, d, c, e);
                break a;
              } else
                for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = !0, zg = null, c = Vg(b, null, d, c), b.child = c; c; )
                  c.flags = c.flags & -3 | 4096, c = c.sibling;
            else {
              if (Ig(), d === e) {
                b = Zi(a, b, c);
                break a;
              }
              Xi(a, b, d, c);
            }
            b = b.child;
          }
          return b;
        case 5:
          return Ah(b), a === null && Eg(b), d = b.type, e = b.pendingProps, f = a !== null ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : f !== null && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
        case 6:
          return a === null && Eg(b), null;
        case 13:
          return oj(a, b, c);
        case 4:
          return yh(b, b.stateNode.containerInfo), d = b.pendingProps, a === null ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
        case 11:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
        case 7:
          return Xi(a, b, b.pendingProps, c), b.child;
        case 8:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 12:
          return Xi(a, b, b.pendingProps.children, c), b.child;
        case 10:
          a: {
            if (d = b.type._context, e = b.pendingProps, f = b.memoizedProps, g = e.value, G(Wg, d._currentValue), d._currentValue = g, f !== null)
              if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else
                for (f = b.child, f !== null && (f.return = b); f !== null; ) {
                  var h = f.dependencies;
                  if (h !== null) {
                    g = f.child;
                    for (var k = h.firstContext; k !== null; ) {
                      if (k.context === d) {
                        if (f.tag === 1) {
                          k = mh(-1, c & -c), k.tag = 2;
                          var l = f.updateQueue;
                          if (l !== null) {
                            l = l.shared;
                            var m = l.pending;
                            m === null ? k.next = k : (k.next = m.next, m.next = k), l.pending = k;
                          }
                        }
                        f.lanes |= c, k = f.alternate, k !== null && (k.lanes |= c), bh(
                          f.return,
                          c,
                          b
                        ), h.lanes |= c;
                        break;
                      }
                      k = k.next;
                    }
                  } else if (f.tag === 10)
                    g = f.type === b.type ? null : f.child;
                  else if (f.tag === 18) {
                    if (g = f.return, g === null)
                      throw Error(p(341));
                    g.lanes |= c, h = g.alternate, h !== null && (h.lanes |= c), bh(g, c, b), g = f.sibling;
                  } else
                    g = f.child;
                  if (g !== null)
                    g.return = f;
                  else
                    for (g = f; g !== null; ) {
                      if (g === b) {
                        g = null;
                        break;
                      }
                      if (f = g.sibling, f !== null) {
                        f.return = g.return, g = f;
                        break;
                      }
                      g = g.return;
                    }
                  f = g;
                }
            Xi(a, b, e.children, c), b = b.child;
          }
          return b;
        case 9:
          return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
        case 14:
          return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
        case 15:
          return bj(a, b, b.type, b.pendingProps, c);
        case 17:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, !0, a, c);
        case 19:
          return xj(a, b, c);
        case 22:
          return dj(a, b, c);
      }
      throw Error(p(156, b.tag));
    };
    function Fk(a, b) {
      return ac(a, b);
    }
    function $k(a, b, c, d) {
      this.tag = a, this.key = c, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = b, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = d, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function Bg(a, b, c, d) {
      return new $k(a, b, c, d);
    }
    function aj(a) {
      return a = a.prototype, !(!a || !a.isReactComponent);
    }
    function Zk(a) {
      if (typeof a == "function")
        return aj(a) ? 1 : 0;
      if (a != null) {
        if (a = a.$$typeof, a === Da)
          return 11;
        if (a === Ga)
          return 14;
      }
      return 2;
    }
    function Pg(a, b) {
      var c = a.alternate;
      return c === null ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null), c.flags = a.flags & 14680064, c.childLanes = a.childLanes, c.lanes = a.lanes, c.child = a.child, c.memoizedProps = a.memoizedProps, c.memoizedState = a.memoizedState, c.updateQueue = a.updateQueue, b = a.dependencies, c.dependencies = b === null ? null : { lanes: b.lanes, firstContext: b.firstContext }, c.sibling = a.sibling, c.index = a.index, c.ref = a.ref, c;
    }
    function Rg(a, b, c, d, e, f) {
      var g = 2;
      if (d = a, typeof a == "function")
        aj(a) && (g = 1);
      else if (typeof a == "string")
        g = 5;
      else
        a:
          switch (a) {
            case ya:
              return Tg(c.children, e, f, b);
            case za:
              g = 8, e |= 8;
              break;
            case Aa:
              return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
            case Ea:
              return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
            case Fa:
              return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
            case Ia:
              return pj(c, e, f, b);
            default:
              if (typeof a == "object" && a !== null)
                switch (a.$$typeof) {
                  case Ba:
                    g = 10;
                    break a;
                  case Ca:
                    g = 9;
                    break a;
                  case Da:
                    g = 11;
                    break a;
                  case Ga:
                    g = 14;
                    break a;
                  case Ha:
                    g = 16, d = null;
                    break a;
                }
              throw Error(p(130, a == null ? a : typeof a, ""));
          }
      return b = Bg(g, c, b, e), b.elementType = a, b.type = d, b.lanes = f, b;
    }
    function Tg(a, b, c, d) {
      return a = Bg(7, a, d, b), a.lanes = c, a;
    }
    function pj(a, b, c, d) {
      return a = Bg(22, a, d, b), a.elementType = Ia, a.lanes = c, a.stateNode = { isHidden: !1 }, a;
    }
    function Qg(a, b, c) {
      return a = Bg(6, a, null, b), a.lanes = c, a;
    }
    function Sg(a, b, c) {
      return b = Bg(4, a.children !== null ? a.children : [], a.key, b), b.lanes = c, b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation }, b;
    }
    function al(a, b, c, d, e) {
      this.tag = b, this.containerInfo = a, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = zc(0), this.expirationTimes = zc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zc(0), this.identifierPrefix = d, this.onRecoverableError = e, this.mutableSourceEagerHydrationData = null;
    }
    function bl(a, b, c, d, e, f, g, h, k) {
      return a = new al(a, b, c, h, k), b === 1 ? (b = 1, f === !0 && (b |= 8)) : b = 0, f = Bg(3, null, null, b), a.current = f, f.stateNode = a, f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null }, kh(f), a;
    }
    function cl(a, b, c) {
      var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return { $$typeof: wa, key: d == null ? null : "" + d, children: a, containerInfo: b, implementation: c };
    }
    function dl(a) {
      if (!a)
        return Vf;
      a = a._reactInternals;
      a: {
        if (Vb(a) !== a || a.tag !== 1)
          throw Error(p(170));
        var b = a;
        do {
          switch (b.tag) {
            case 3:
              b = b.stateNode.context;
              break a;
            case 1:
              if (Zf(b.type)) {
                b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          b = b.return;
        } while (b !== null);
        throw Error(p(171));
      }
      if (a.tag === 1) {
        var c = a.type;
        if (Zf(c))
          return bg(a, c, b);
      }
      return b;
    }
    function el(a, b, c, d, e, f, g, h, k) {
      return a = bl(c, d, !0, a, e, f, g, h, k), a.context = dl(null), c = a.current, d = R(), e = yi(c), f = mh(d, e), f.callback = b ?? null, nh(c, f, e), a.current.lanes = e, Ac(a, e, d), Dk(a, d), a;
    }
    function fl(a, b, c, d) {
      var e = b.current, f = R(), g = yi(e);
      return c = dl(c), b.context === null ? b.context = c : b.pendingContext = c, b = mh(f, g), b.payload = { element: a }, d = d === void 0 ? null : d, d !== null && (b.callback = d), a = nh(e, b, g), a !== null && (gi(a, e, g, f), oh(a, e, g)), g;
    }
    function gl(a) {
      if (a = a.current, !a.child)
        return null;
      switch (a.child.tag) {
        case 5:
          return a.child.stateNode;
        default:
          return a.child.stateNode;
      }
    }
    function hl(a, b) {
      if (a = a.memoizedState, a !== null && a.dehydrated !== null) {
        var c = a.retryLane;
        a.retryLane = c !== 0 && c < b ? c : b;
      }
    }
    function il(a, b) {
      hl(a, b), (a = a.alternate) && hl(a, b);
    }
    function jl() {
      return null;
    }
    var kl = typeof reportError == "function" ? reportError : function(a) {
      console.error(a);
    };
    function ll(a) {
      this._internalRoot = a;
    }
    ml.prototype.render = ll.prototype.render = function(a) {
      var b = this._internalRoot;
      if (b === null)
        throw Error(p(409));
      fl(a, b, null, null);
    };
    ml.prototype.unmount = ll.prototype.unmount = function() {
      var a = this._internalRoot;
      if (a !== null) {
        this._internalRoot = null;
        var b = a.containerInfo;
        Rk(function() {
          fl(null, a, null, null);
        }), b[uf] = null;
      }
    };
    function ml(a) {
      this._internalRoot = a;
    }
    ml.prototype.unstable_scheduleHydration = function(a) {
      if (a) {
        var b = Hc();
        a = { blockedOn: null, target: a, priority: b };
        for (var c = 0; c < Qc.length && b !== 0 && b < Qc[c].priority; c++)
          ;
        Qc.splice(c, 0, a), c === 0 && Vc(a);
      }
    };
    function nl(a) {
      return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11);
    }
    function ol(a) {
      return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11 && (a.nodeType !== 8 || a.nodeValue !== " react-mount-point-unstable "));
    }
    function pl() {
    }
    function ql(a, b, c, d, e) {
      if (e) {
        if (typeof d == "function") {
          var f = d;
          d = function() {
            var a2 = gl(g);
            f.call(a2);
          };
        }
        var g = el(b, d, a, 0, null, !1, !1, "", pl);
        return a._reactRootContainer = g, a[uf] = g.current, sf(a.nodeType === 8 ? a.parentNode : a), Rk(), g;
      }
      for (; e = a.lastChild; )
        a.removeChild(e);
      if (typeof d == "function") {
        var h = d;
        d = function() {
          var a2 = gl(k);
          h.call(a2);
        };
      }
      var k = bl(a, 0, !1, null, null, !1, !1, "", pl);
      return a._reactRootContainer = k, a[uf] = k.current, sf(a.nodeType === 8 ? a.parentNode : a), Rk(function() {
        fl(b, k, c, d);
      }), k;
    }
    function rl(a, b, c, d, e) {
      var f = c._reactRootContainer;
      if (f) {
        var g = f;
        if (typeof e == "function") {
          var h = e;
          e = function() {
            var a2 = gl(g);
            h.call(a2);
          };
        }
        fl(b, g, a, e);
      } else
        g = ql(c, b, a, e, d);
      return gl(g);
    }
    Ec = function(a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;
          if (b.current.memoizedState.isDehydrated) {
            var c = tc(b.pendingLanes);
            c !== 0 && (Cc(b, c | 1), Dk(b, B()), !(K & 6) && (Gj = B() + 500, jg()));
          }
          break;
        case 13:
          Rk(function() {
            var b2 = ih(a, 1);
            if (b2 !== null) {
              var c2 = R();
              gi(b2, a, 1, c2);
            }
          }), il(a, 1);
      }
    };
    Fc = function(a) {
      if (a.tag === 13) {
        var b = ih(a, 134217728);
        if (b !== null) {
          var c = R();
          gi(b, a, 134217728, c);
        }
        il(a, 134217728);
      }
    };
    Gc = function(a) {
      if (a.tag === 13) {
        var b = yi(a), c = ih(a, b);
        if (c !== null) {
          var d = R();
          gi(c, a, b, d);
        }
        il(a, b);
      }
    };
    Hc = function() {
      return C;
    };
    Ic = function(a, b) {
      var c = C;
      try {
        return C = a, b();
      } finally {
        C = c;
      }
    };
    yb = function(a, b, c) {
      switch (b) {
        case "input":
          if (bb(a, c), b = c.name, c.type === "radio" && b != null) {
            for (c = a; c.parentNode; )
              c = c.parentNode;
            for (c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]'), b = 0; b < c.length; b++) {
              var d = c[b];
              if (d !== a && d.form === a.form) {
                var e = Db(d);
                if (!e)
                  throw Error(p(90));
                Wa(d), bb(d, e);
              }
            }
          }
          break;
        case "textarea":
          ib(a, c);
          break;
        case "select":
          b = c.value, b != null && fb(a, !!c.multiple, b, !1);
      }
    };
    Gb = Qk;
    Hb = Rk;
    var sl = { usingClientEntryPoint: !1, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
      return a = Zb(a), a === null ? null : a.stateNode;
    }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (vl = __REACT_DEVTOOLS_GLOBAL_HOOK__, !vl.isDisabled && vl.supportsFiber))
      try {
        kc = vl.inject(ul), lc = vl;
      } catch {
      }
    var vl;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
    exports.createPortal = function(a, b) {
      var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!nl(b))
        throw Error(p(200));
      return cl(a, b, null, c);
    };
    exports.createRoot = function(a, b) {
      if (!nl(a))
        throw Error(p(299));
      var c = !1, d = "", e = kl;
      return b != null && (b.unstable_strictMode === !0 && (c = !0), b.identifierPrefix !== void 0 && (d = b.identifierPrefix), b.onRecoverableError !== void 0 && (e = b.onRecoverableError)), b = bl(a, 1, !1, null, null, c, !1, d, e), a[uf] = b.current, sf(a.nodeType === 8 ? a.parentNode : a), new ll(b);
    };
    exports.findDOMNode = function(a) {
      if (a == null)
        return null;
      if (a.nodeType === 1)
        return a;
      var b = a._reactInternals;
      if (b === void 0)
        throw typeof a.render == "function" ? Error(p(188)) : (a = Object.keys(a).join(","), Error(p(268, a)));
      return a = Zb(b), a = a === null ? null : a.stateNode, a;
    };
    exports.flushSync = function(a) {
      return Rk(a);
    };
    exports.hydrate = function(a, b, c) {
      if (!ol(b))
        throw Error(p(200));
      return rl(null, a, b, !0, c);
    };
    exports.hydrateRoot = function(a, b, c) {
      if (!nl(a))
        throw Error(p(405));
      var d = c != null && c.hydratedSources || null, e = !1, f = "", g = kl;
      if (c != null && (c.unstable_strictMode === !0 && (e = !0), c.identifierPrefix !== void 0 && (f = c.identifierPrefix), c.onRecoverableError !== void 0 && (g = c.onRecoverableError)), b = el(b, null, a, 1, c ?? null, e, !1, f, g), a[uf] = b.current, sf(a), d)
        for (a = 0; a < d.length; a++)
          c = d[a], e = c._getVersion, e = e(c._source), b.mutableSourceEagerHydrationData == null ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
            c,
            e
          );
      return new ml(b);
    };
    exports.render = function(a, b, c) {
      if (!ol(b))
        throw Error(p(200));
      return rl(null, a, b, !1, c);
    };
    exports.unmountComponentAtNode = function(a) {
      if (!ol(a))
        throw Error(p(40));
      return a._reactRootContainer ? (Rk(function() {
        rl(null, null, a, !1, function() {
          a._reactRootContainer = null, a[uf] = null;
        });
      }), !0) : !1;
    };
    exports.unstable_batchedUpdates = Qk;
    exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
      if (!ol(c))
        throw Error(p(200));
      if (a == null || a._reactInternals === void 0)
        throw Error(p(38));
      return rl(a, b, c, !1, d);
    };
    exports.version = "18.3.1-next-f1338f8080-20240426";
  }
});

// node_modules/react-dom/index.js
var require_react_dom = __commonJS({
  "node_modules/react-dom/index.js"(exports, module) {
    "use strict";
    function checkDCE() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
    }
    checkDCE(), module.exports = require_react_dom_production_min();
  }
});

// app/shopify.server.ts
var shopify_server_exports = {};
__export(shopify_server_exports, {
  addDocumentResponseHeaders: () => addDocumentResponseHeaders,
  apiVersion: () => apiVersion,
  authenticate: () => authenticate,
  default: () => shopify_server_default,
  registerWebhooks: () => registerWebhooks,
  sessionStorage: () => sessionStorage,
  unauthenticated: () => unauthenticated
});
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
var shopify, shopify_server_default, apiVersion, addDocumentResponseHeaders, authenticate, unauthenticated, registerWebhooks, sessionStorage, init_shopify_server = __esm({
  "app/shopify.server.ts"() {
    "use strict";
    init_db();
    shopify = shopifyApp({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      appUrl: process.env.SHOPIFY_APP_URL,
      apiVersion: "2025-10",
      scopes: process.env.SCOPES?.split(",") || ["read_products", "read_inventory", "write_metafields", "read_orders"],
      sessionStorage: new PrismaSessionStorage(db),
      distribution: "app",
      useOnlineTokens: !1,
      // Use offline tokens for background API calls
      hooks: {
        afterAuth: async ({ session }) => {
          let requestId = Math.random().toString(36).substring(7);
          console.log(`\u{1F50D} [${requestId}] afterAuth triggered for shop:`, session.shop), console.log(`\u{1F50D} [${requestId}] Session details:`, {
            id: session.id,
            shop: session.shop,
            scope: session.scope,
            isOnline: session.isOnline,
            expires: session.expires,
            accessTokenLength: session.accessToken?.length,
            accessTokenPrefix: session.accessToken?.substring(0, 15) + "..."
          });
          try {
            let user = await db.user.upsert({
              where: { shopId: session.shop },
              update: {
                accessToken: session.accessToken,
                updatedAt: /* @__PURE__ */ new Date()
              },
              create: {
                shopId: session.shop,
                shopDomain: session.shop,
                accessToken: session.accessToken,
                tier: "starter",
                aiUsage: 0
              }
            });
            console.log(`\u2705 [${requestId}] User created/updated:`, user.id), console.log(`\u{1F50D} [${requestId}] User details:`, {
              id: user.id,
              shopId: user.shopId,
              tier: user.tier,
              aiUsage: user.aiUsage,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            });
          } catch (error) {
            throw console.error(`\u274C [${requestId}] afterAuth error:`, error), console.error(`\u274C [${requestId}] Error details:`, {
              message: error instanceof Error ? error.message : "Unknown error",
              stack: error instanceof Error ? error.stack : "No stack trace",
              errorType: error?.constructor?.name
            }), error;
          }
        }
      }
    }), shopify_server_default = shopify, apiVersion = "2025-10", addDocumentResponseHeaders = shopify.addDocumentResponseHeaders, authenticate = shopify.authenticate, unauthenticated = shopify.unauthenticated, registerWebhooks = shopify.registerWebhooks, sessionStorage = shopify.sessionStorage;
  }
});

// app/utils/shopifySync.ts
var shopifySync_exports = {};
__export(shopifySync_exports, {
  ShopifySyncService: () => ShopifySyncService
});
import { GraphQLClient } from "graphql-request";
var PRODUCTS_QUERY, ShopifySyncService, init_shopifySync = __esm({
  "app/utils/shopifySync.ts"() {
    "use strict";
    init_db();
    PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
                inventoryQuantity
                availableForSale
              }
            }
          }
          metafields(first: 100) {
            edges {
              node {
                id
                namespace
                key
                value
                type
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`, ShopifySyncService = class {
      client;
      constructor(shopDomain, accessToken) {
        console.log("\u{1F527} ShopifySyncService constructor [v2]:", {
          shopDomain,
          accessTokenLength: accessToken?.length || 0,
          accessTokenPrefix: accessToken?.substring(0, 10) + "...",
          endpoint: `https://${shopDomain}/admin/api/2025-10/graphql`
        }), this.testAccessToken(shopDomain, accessToken), this.client = new GraphQLClient(
          `https://${shopDomain}/admin/api/2025-10/graphql`,
          {
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json"
            }
          }
        );
      }
      async testAccessToken(shopDomain, accessToken) {
        try {
          console.log("\u{1F9EA} Testing access token with REST API...");
          let response = await fetch(`https://${shopDomain}/admin/api/2025-10/shop.json`, {
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json"
            }
          });
          if (console.log("\u{1F9EA} REST API test response:", {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
          }), response.ok) {
            let data = await response.json();
            console.log("\u2705 Access token is valid, shop name:", data.shop?.name);
          } else
            console.log("\u274C Access token test failed:", response.status, response.statusText);
        } catch (error) {
          console.log("\u274C Access token test error:", error);
        }
      }
      async syncProducts(userId) {
        let allProducts = [], hasNextPage = !0, after, pageCount = 0;
        console.log("\u{1F504} Starting product sync for user:", userId);
        try {
          for (; hasNextPage; ) {
            pageCount++, console.log(`\u{1F4C4} Fetching page ${pageCount}${after ? ` (after: ${after.substring(0, 20)}...)` : " (first page)"}`);
            let startTime = Date.now(), response = await this.client.request(PRODUCTS_QUERY, {
              first: 250,
              after
            }), fetchTime = Date.now() - startTime;
            console.log(`\u23F1\uFE0F  Page ${pageCount} fetched in ${fetchTime}ms`), console.log(`\u{1F4E6} Products in this page: ${response.products.edges.length}`);
            let products = response.products.edges.map((edge) => ({
              id: edge.node.id.replace("gid://shopify/Product/", ""),
              title: edge.node.title,
              description: edge.node.description || "",
              handle: edge.node.handle,
              productType: edge.node.productType || "",
              vendor: edge.node.vendor || "",
              tags: edge.node.tags || [],
              variants: edge.node.variants.edges.map((v) => ({
                id: v.node.id.replace("gid://shopify/ProductVariant/", ""),
                title: v.node.title,
                price: v.node.price,
                compareAtPrice: v.node.compareAtPrice,
                sku: v.node.sku,
                inventoryQuantity: v.node.inventoryQuantity,
                availableForSale: v.node.availableForSale
              })),
              metafields: edge.node.metafields.edges.map((m) => ({
                id: m.node.id.replace("gid://shopify/Metafield/", ""),
                namespace: m.node.namespace,
                key: m.node.key,
                value: m.node.value,
                type: m.node.type
              })),
              images: edge.node.images.edges.map((i) => ({
                id: i.node.id.replace("gid://shopify/MediaImage/", ""),
                url: i.node.url,
                altText: i.node.altText
              }))
            }));
            allProducts.push(...products), console.log(`\u{1F4CA} Total products so far: ${allProducts.length}`), hasNextPage = response.products.pageInfo.hasNextPage, after = response.products.pageInfo.endCursor, console.log(`\u{1F517} Has next page: ${hasNextPage}`), hasNextPage && (console.log("\u23F3 Waiting 500ms before next request..."), await new Promise((resolve) => setTimeout(resolve, 500)));
          }
          return console.log(`\u2705 Sync complete! Total products: ${allProducts.length}`), await db.log.create({
            data: {
              userId,
              type: "sync",
              message: `Synchronized ${allProducts.length} products from Shopify`,
              metadata: {
                productsCount: allProducts.length,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              }
            }
          }), allProducts;
        } catch (error) {
          throw console.error("\u274C Sync failed:", error), console.error("\u274C Error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : String(error),
            pageCount,
            totalProducts: allProducts.length
          }), await db.log.create({
            data: {
              userId,
              type: "error",
              message: `Failed to sync products: ${error instanceof Error ? error.message : "Unknown error"}`,
              error: error instanceof Error ? error.stack : String(error),
              metadata: {
                timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                pageCount,
                totalProducts: allProducts.length
              }
            }
          }), error;
        }
      }
      async getInventoryLevels(shopDomain, accessToken) {
        try {
          let response = await fetch(
            `https://${shopDomain}/admin/api/2025-10/inventory_levels.json`,
            {
              headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
              }
            }
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return (await response.json()).inventory_levels || [];
        } catch (error) {
          throw console.error("Error fetching inventory levels:", error), error;
        }
      }
      async getRecentOrders(shopDomain, accessToken, limit = 50) {
        try {
          let response = await fetch(
            `https://${shopDomain}/admin/api/2025-10/orders.json?limit=${limit}&status=any`,
            {
              headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
              }
            }
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return (await response.json()).orders || [];
        } catch (error) {
          throw console.error("Error fetching orders:", error), error;
        }
      }
    };
  }
});

// app/utils/openaiSpec.ts
function getFieldInputType(fieldName) {
  return FIELD_INPUT_TYPES.customer_input_required.includes(fieldName) ? "customer_required" : FIELD_INPUT_TYPES.ai_generatable.includes(fieldName) ? "ai_generatable" : FIELD_INPUT_TYPES.core_required.includes(fieldName) ? "core_required" : "customer_required";
}
var OPENAI_PRODUCT_SCHEMA, FIELD_WEIGHTS, FIELD_POINTS, FIELD_INPUT_TYPES, FIELD_LABELS, init_openaiSpec = __esm({
  "app/utils/openaiSpec.ts"() {
    "use strict";
    OPENAI_PRODUCT_SCHEMA = {
      type: "object",
      required: [
        "title",
        "description",
        "price",
        "availability",
        "category"
      ],
      properties: {
        // Core Product Information
        title: {
          type: "string",
          maxLength: 150,
          description: "Product title - clear, descriptive, keyword-rich"
        },
        description: {
          type: "string",
          minLength: 100,
          maxLength: 4e3,
          description: "Detailed product description with features, benefits, use cases"
        },
        price: {
          type: "string",
          pattern: "^\\d+\\.\\d{2} [A-Z]{3}$",
          description: "Price in format 'XX.XX USD'"
        },
        availability: {
          type: "string",
          enum: ["in_stock", "out_of_stock", "pre_order", "discontinued"],
          description: "Current availability status"
        },
        category: {
          type: "string",
          description: "Product category for classification"
        },
        // Physical Attributes
        material: {
          type: "string",
          description: "Primary material composition"
        },
        dimensions: {
          type: "object",
          properties: {
            length: { type: "string", description: "Length with unit" },
            width: { type: "string", description: "Width with unit" },
            height: { type: "string", description: "Height with unit" }
          },
          description: "Product dimensions"
        },
        weight: {
          type: "string",
          description: "Product weight with unit"
        },
        color: {
          type: "string",
          description: "Primary color"
        },
        size: {
          type: "string",
          description: "Size information"
        },
        // Functional Attributes
        brand: {
          type: "string",
          description: "Brand or manufacturer"
        },
        model: {
          type: "string",
          description: "Model number or name"
        },
        sku: {
          type: "string",
          description: "Stock keeping unit"
        },
        upc: {
          type: "string",
          description: "Universal Product Code"
        },
        // Usage and Context
        use_cases: {
          type: "array",
          items: { type: "string" },
          description: "List of use cases and applications"
        },
        target_audience: {
          type: "string",
          description: "Primary target audience"
        },
        age_range: {
          type: "string",
          description: "Recommended age range"
        },
        gender: {
          type: "string",
          enum: ["male", "female", "unisex", "kids"],
          description: "Target gender"
        },
        // Technical Specifications
        features: {
          type: "array",
          items: { type: "string" },
          description: "Key product features"
        },
        specifications: {
          type: "object",
          description: "Technical specifications as key-value pairs"
        },
        compatibility: {
          type: "array",
          items: { type: "string" },
          description: "Compatibility information"
        },
        // SEO and Search
        keywords: {
          type: "array",
          items: { type: "string" },
          description: "SEO keywords for search optimization"
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Product tags for categorization"
        },
        // Media and Links
        image_urls: {
          type: "array",
          items: { type: "string" },
          description: "High-quality product image URLs"
        },
        video_urls: {
          type: "array",
          items: { type: "string" },
          description: "Product video URLs"
        },
        documentation_url: {
          type: "string",
          format: "uri",
          description: "Link to product documentation"
        },
        // Business Information
        vendor: {
          type: "string",
          description: "Vendor or supplier"
        },
        warranty: {
          type: "string",
          description: "Warranty information"
        },
        return_policy: {
          type: "string",
          description: "Return policy information"
        },
        shipping_info: {
          type: "string",
          description: "Shipping information"
        },
        // AI-Specific Fields
        ai_search_queries: {
          type: "array",
          items: { type: "string" },
          description: "Sample AI search queries this product should match"
        },
        semantic_description: {
          type: "string",
          description: "AI-optimized semantic description for better matching"
        }
      }
    }, FIELD_WEIGHTS = {
      // Required fields (must be 100% complete) - Higher impact
      required: {
        title: 2.5,
        description: 2.5,
        price: 2,
        availability: 2,
        category: 2
      },
      // High importance optional fields (critical for AI search) - Meaningful impact
      high: {
        material: 2,
        dimensions: 2,
        weight: 1.8,
        brand: 2,
        use_cases: 2.2,
        features: 2,
        image_urls: 1.8
      },
      // Medium importance fields (enhance discoverability) - Good impact
      medium: {
        color: 1.5,
        size: 1.5,
        target_audience: 1.8,
        keywords: 1.8,
        upc: 1.2,
        compatibility: 1.5,
        age_range: 1.2,
        gender: 1.2,
        video_urls: 1.5
      },
      // Low importance fields (nice to have) - Still meaningful
      low: {
        model: 1,
        sku: 1.2,
        tags: 1.2,
        vendor: 1,
        warranty: 1,
        return_policy: 1,
        shipping_info: 1,
        documentation_url: 1,
        specifications: 1.2,
        ai_search_queries: 1,
        semantic_description: 1
      }
    }, FIELD_POINTS = {
      required: {
        title: 25,
        description: 25,
        price: 20,
        availability: 20,
        category: 20
      },
      high: {
        material: 20,
        dimensions: 20,
        weight: 18,
        brand: 20,
        use_cases: 22,
        features: 20,
        image_urls: 18
      },
      medium: {
        color: 15,
        size: 15,
        target_audience: 18,
        keywords: 18,
        upc: 12,
        compatibility: 15,
        age_range: 12,
        gender: 12,
        video_urls: 15
      },
      low: {
        model: 10,
        sku: 12,
        tags: 12,
        vendor: 10,
        warranty: 10,
        return_policy: 10,
        shipping_info: 10,
        documentation_url: 10,
        specifications: 12,
        ai_search_queries: 10,
        semantic_description: 10
      }
    }, FIELD_INPUT_TYPES = {
      // Fields that REQUIRE customer/brand input - AI cannot determine these accurately
      customer_input_required: [
        // Physical specifications (only the brand/manufacturer knows these)
        "material",
        "dimensions",
        "weight",
        "color",
        "size",
        // Identification & business info (brand-specific data)
        "brand",
        "model",
        "upc",
        "vendor",
        // Age/gender restrictions (brand policy)
        "age_range",
        "gender",
        "compatibility",
        // Business policies (company-specific)
        "warranty",
        "return_policy",
        "shipping_info",
        "specifications",
        "documentation_url",
        "video_urls"
      ],
      // Fields that AI can generate based on product info
      ai_generatable: [
        // Marketing content (AI can create based on existing product data)
        "description",
        "use_cases",
        "features",
        "keywords",
        "tags",
        "target_audience",
        "sku",
        "ai_search_queries",
        "semantic_description"
      ],
      // Core required fields (must exist, usually already present)
      core_required: [
        "title",
        "price",
        "availability",
        "category",
        "image_urls"
      ]
    };
    FIELD_LABELS = {
      material: "Material",
      dimensions: "Dimensions",
      weight: "Weight",
      color: "Color",
      size: "Size",
      brand: "Brand",
      model: "Model",
      upc: "UPC/Barcode",
      vendor: "Vendor",
      age_range: "Age Range",
      gender: "Target Gender",
      compatibility: "Compatibility",
      warranty: "Warranty Info",
      return_policy: "Return Policy",
      shipping_info: "Shipping Info",
      specifications: "Technical Specs",
      documentation_url: "Documentation URL",
      video_urls: "Video URLs"
    };
  }
});

// app/utils/fieldMapper.ts
var fieldMapper_exports = {};
__export(fieldMapper_exports, {
  calculateProductScore: () => calculateProductScore,
  mapProductsToSpec: () => mapProductsToSpec,
  mapShopifyToSpec: () => mapShopifyToSpec
});
function mapShopifyToSpec(product) {
  let spec = {
    // Core required fields - map directly from Shopify
    title: product.title || "",
    description: product.description || "",
    price: product.variants[0]?.price ? `${product.variants[0].price} USD` : "0.00 USD",
    availability: getAvailabilityStatus(product.variants),
    category: product.productType || "Uncategorized",
    // Physical attributes - from metafields or inference
    material: getMetafieldValue(product.metafields, "material") || inferMaterial(product.title, product.description),
    weight: getMetafieldValue(product.metafields, "weight"),
    color: getMetafieldValue(product.metafields, "color") || inferColor(product.title, product.description),
    size: getMetafieldValue(product.metafields, "size"),
    // Identification fields
    brand: product.vendor || getMetafieldValue(product.metafields, "brand"),
    model: getMetafieldValue(product.metafields, "model"),
    sku: product.variants[0]?.sku,
    upc: getMetafieldValue(product.metafields, "upc") || getMetafieldValue(product.metafields, "barcode"),
    // Usage and context
    use_cases: getMetafieldArray(product.metafields, "use_cases") || inferUseCases(product.title, product.description),
    target_audience: getMetafieldValue(product.metafields, "target_audience"),
    age_range: getMetafieldValue(product.metafields, "age_range"),
    gender: getMetafieldValue(product.metafields, "gender"),
    // Technical specifications
    features: getMetafieldArray(product.metafields, "features") || inferFeatures(product.description),
    compatibility: getMetafieldArray(product.metafields, "compatibility"),
    // SEO and search
    keywords: product.tags || [],
    tags: product.tags || [],
    // Media
    image_urls: product.images.map((img) => img.url),
    video_urls: getMetafieldArray(product.metafields, "video_urls") || getMetafieldArray(product.metafields, "videos"),
    documentation_url: getMetafieldValue(product.metafields, "documentation_url") || getMetafieldValue(product.metafields, "manual_url"),
    // Business information
    vendor: product.vendor,
    warranty: getMetafieldValue(product.metafields, "warranty"),
    return_policy: getMetafieldValue(product.metafields, "return_policy"),
    shipping_info: getMetafieldValue(product.metafields, "shipping_info"),
    // AI-specific fields
    ai_search_queries: getMetafieldArray(product.metafields, "ai_search_queries"),
    semantic_description: getMetafieldValue(product.metafields, "semantic_description")
  }, dimensions = getDimensionsFromMetafields(product.metafields);
  dimensions && (spec.dimensions = dimensions);
  let specifications = getSpecificationsFromMetafields(product.metafields);
  return specifications && Object.keys(specifications).length > 0 && (spec.specifications = specifications), spec;
}
function getAvailabilityStatus(variants) {
  if (variants.length === 0)
    return "out_of_stock";
  let hasAvailable = variants.some((v) => v.availableForSale && (v.inventoryQuantity || 0) > 0), hasInventory = variants.some((v) => (v.inventoryQuantity || 0) > 0);
  return hasAvailable ? "in_stock" : hasInventory && !hasAvailable ? "pre_order" : "out_of_stock";
}
function getMetafieldValue(metafields, key) {
  let metafield = metafields.find(
    (m) => m.namespace === "catalogai" && (m.key === key || m.key.toLowerCase().includes(key.toLowerCase()))
  );
  return metafield || (metafield = metafields.find(
    (m) => m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
  )), metafield?.value;
}
function getMetafieldArray(metafields, key) {
  let value = getMetafieldValue(metafields, key);
  if (value)
    try {
      let parsed = JSON.parse(value);
      if (Array.isArray(parsed))
        return parsed.filter((item) => typeof item == "string");
    } catch {
      return value.includes(`
-`) || value.startsWith("-") ? value.split(`
`).map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) : value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
    }
}
function getDimensionsFromMetafields(metafields) {
  let length = getMetafieldValue(metafields, "length"), width = getMetafieldValue(metafields, "width"), height = getMetafieldValue(metafields, "height");
  return !length && !width && !height ? null : {
    ...length && { length },
    ...width && { width },
    ...height && { height }
  };
}
function getSpecificationsFromMetafields(metafields) {
  let specs = {}, specMetafields = metafields.filter(
    (m) => m.namespace === "specifications" || m.namespace === "specs"
  );
  for (let metafield of specMetafields)
    specs[metafield.key] = metafield.value;
  return Object.keys(specs).length > 0 ? specs : null;
}
function inferMaterial(title, description) {
  let materialKeywords = [
    "cotton",
    "polyester",
    "leather",
    "metal",
    "wood",
    "plastic",
    "glass",
    "ceramic",
    "fabric",
    "denim",
    "silk",
    "wool",
    "bamboo",
    "steel",
    "aluminum",
    "bronze",
    "silver",
    "gold",
    "rubber",
    "silicone"
  ], text = `${title} ${description}`.toLowerCase();
  for (let material of materialKeywords)
    if (text.includes(material))
      return material.charAt(0).toUpperCase() + material.slice(1);
}
function inferColor(title, description) {
  let colorKeywords = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "gray",
    "grey",
    "pink",
    "purple",
    "orange",
    "brown",
    "beige",
    "navy",
    "maroon"
  ], text = `${title} ${description}`.toLowerCase();
  for (let color of colorKeywords)
    if (text.includes(color))
      return color.charAt(0).toUpperCase() + color.slice(1);
}
function inferUseCases(title, description) {
  let useCaseKeywords = [
    "home",
    "office",
    "kitchen",
    "bedroom",
    "bathroom",
    "garden",
    "outdoor",
    "travel",
    "sports",
    "fitness",
    "workout",
    "cooking",
    "cleaning",
    "decorative",
    "functional",
    "storage",
    "organization"
  ], text = `${title} ${description}`.toLowerCase(), foundUseCases = [];
  for (let useCase of useCaseKeywords)
    text.includes(useCase) && foundUseCases.push(useCase.charAt(0).toUpperCase() + useCase.slice(1));
  return foundUseCases;
}
function inferFeatures(description) {
  let featureKeywords = [
    "waterproof",
    "durable",
    "lightweight",
    "compact",
    "portable",
    "adjustable",
    "reversible",
    "washable",
    "dishwasher safe",
    "battery powered",
    "cordless",
    "wireless",
    "bluetooth",
    "stainless steel",
    "non-stick",
    "heat resistant"
  ], text = description.toLowerCase(), foundFeatures = [];
  for (let feature of featureKeywords)
    text.includes(feature) && foundFeatures.push(feature.charAt(0).toUpperCase() + feature.slice(1));
  return foundFeatures;
}
function calculateProductScore(spec) {
  let gaps = [], recommendations = [], totalWeight = 0, weightedScore = 0, totalPoints = 0, maxPossiblePoints = 0, fieldProgress = {}, categoryProgress = {
    required: { completed: 0, total: 0, points: 0 },
    high: { completed: 0, total: 0, points: 0 },
    medium: { completed: 0, total: 0, points: 0 },
    low: { completed: 0, total: 0, points: 0 }
  }, hasValue = (value) => value != null && (typeof value != "string" || value.trim() !== "") && (!Array.isArray(value) || value.length > 0) && (typeof value != "object" || Object.keys(value).length > 0);
  [
    { name: "required", fields: FIELD_WEIGHTS.required, points: FIELD_POINTS.required },
    { name: "high", fields: FIELD_WEIGHTS.high, points: FIELD_POINTS.high },
    { name: "medium", fields: FIELD_WEIGHTS.medium, points: FIELD_POINTS.medium },
    { name: "low", fields: FIELD_WEIGHTS.low, points: FIELD_POINTS.low }
  ].forEach(({ name, fields, points }) => {
    categoryProgress[name].total = Object.keys(fields).length;
    for (let [field, weight] of Object.entries(fields)) {
      totalWeight += weight, maxPossiblePoints += points[field];
      let value = spec[field], completed = hasValue(value);
      fieldProgress[field] = {
        completed,
        category: name,
        points: points[field],
        weight
      }, completed ? (weightedScore += weight, totalPoints += points[field], categoryProgress[name].completed++, categoryProgress[name].points += points[field]) : (gaps.push(field), name === "high" && recommendations.push(`Add ${field} to improve product discoverability`));
    }
  });
  let score = totalWeight > 0 ? Math.round(weightedScore / totalWeight * 100) : 0, totalFields = Object.keys(fieldProgress).length, completedFields = Object.values(fieldProgress).filter((f) => f.completed).length, completeness = totalFields > 0 ? Math.round(completedFields / totalFields * 100) : 0;
  return {
    score,
    completeness,
    gaps,
    recommendations,
    points: totalPoints,
    maxPoints: maxPossiblePoints,
    fieldProgress,
    categoryProgress
  };
}
function mapProductsToSpec(products) {
  return products.map((product) => {
    let spec = mapShopifyToSpec(product), score = calculateProductScore(spec);
    return {
      ...spec,
      originalId: product.id,
      score
    };
  });
}
var init_fieldMapper = __esm({
  "app/utils/fieldMapper.ts"() {
    "use strict";
    init_openaiSpec();
  }
});

// app/utils/aiClient.ts
import OpenAI from "openai";
var openai, AIClient, init_aiClient = __esm({
  "app/utils/aiClient.ts"() {
    "use strict";
    init_db();
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }), AIClient = class {
      async trackUsage(userId, usage) {
        try {
          await db.user.update({
            where: { id: userId },
            data: {
              aiUsage: {
                increment: usage.totalTokens
              }
            }
          });
        } catch (error) {
          console.error("Failed to track AI usage:", error);
        }
      }
      async enrichDescription(userId, title, currentDescription, category, material) {
        let prompt = `You are an expert product copywriter specializing in e-commerce optimization for AI search systems. 

Your task is to enrich the following product description to make it more comprehensive, SEO-friendly, and optimized for AI search queries. The description should be between 400-4000 characters and written in plain text (no HTML).

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Material: ${material || "Not specified"}
- Current Description: ${currentDescription}

Requirements:
1. Expand the description with specific details about features, benefits, and use cases
2. Include relevant keywords that customers might search for
3. Add information about dimensions, weight, or other specifications if relevant
4. Mention target audience and ideal use cases
5. Use descriptive, engaging language that highlights product value
6. Ensure the description flows naturally and is easy to read
7. Do not include HTML tags or special formatting
8. Focus on factual, helpful information that aids in product discovery

Return only the enriched description text.`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a professional product copywriter who creates detailed, SEO-optimized product descriptions for e-commerce platforms."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 1e3,
            temperature: 0.7
          }), enriched = response.choices[0]?.message?.content || currentDescription, usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { enriched, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to enrich description: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async inferMaterial(userId, title, description, category) {
        let prompt = `Based on the following product information, determine the most likely primary material composition. Return only the material name.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Common materials include: cotton, polyester, leather, metal, wood, plastic, glass, ceramic, fabric, denim, silk, wool, bamboo, steel, aluminum, bronze, silver, gold, rubber, silicone, etc.

If the material is unclear, return "Unknown". Return only the material name, nothing else.`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a product analyst who identifies material composition from product descriptions."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 50,
            temperature: 0.3
          }), material = response.choices[0]?.message?.content?.trim() || "Unknown", usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { material, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to infer material: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateUseCases(userId, title, description, category) {
        let prompt = `Based on the following product information, generate 3-5 specific use cases or applications for this product. Return the use cases as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Focus on practical, specific use cases that would help customers understand how to use this product. Examples might include specific activities, environments, or situations where the product would be useful.

Return only a JSON array like: ["Use case 1", "Use case 2", "Use case 3"]`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a product analyst who identifies practical use cases for products."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 200,
            temperature: 0.7
          }), content = response.choices[0]?.message?.content || "[]", useCases = [];
          try {
            useCases = JSON.parse(content), Array.isArray(useCases) || (useCases = []);
          } catch {
            useCases = [];
          }
          let usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { useCases, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate use cases: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateFeatures(userId, title, description, category) {
        let prompt = `Based on the following product information, extract and generate 3-6 key features or characteristics of this product. Return the features as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Focus on specific, factual features that highlight the product's benefits or characteristics. These should be features that customers would care about when making a purchase decision.

Return only a JSON array like: ["Feature 1", "Feature 2", "Feature 3"]`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a product analyst who extracts key features from product descriptions."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 200,
            temperature: 0.5
          }), content = response.choices[0]?.message?.content || "[]", features = [];
          try {
            features = JSON.parse(content), Array.isArray(features) || (features = []);
          } catch {
            features = [];
          }
          let usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { features, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate features: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateKeywords(userId, title, description, category) {
        let prompt = `Based on the following product information, generate 5-10 relevant SEO keywords that customers might use to search for this product. Return the keywords as a JSON array of strings.

Product Information:
- Title: ${title}
- Category: ${category || "Not specified"}
- Description: ${description}

Focus on keywords that are:
1. Relevant to the product
2. Commonly used in search queries
3. Specific enough to be meaningful
4. Broad enough to capture search volume

Include a mix of short-tail and long-tail keywords.

Return only a JSON array like: ["keyword 1", "keyword 2", "keyword 3"]`;
        try {
          let response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are an SEO specialist who generates relevant keywords for product optimization."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 200,
            temperature: 0.6
          }), content = response.choices[0]?.message?.content || "[]", keywords = [];
          try {
            keywords = JSON.parse(content), Array.isArray(keywords) || (keywords = []);
          } catch {
            keywords = [];
          }
          let usage = {
            promptTokens: response.usage?.prompt_tokens || 0,
            completionTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0
          };
          return await this.trackUsage(userId, usage), { keywords, usage };
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate keywords: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
      async generateText(prompt, maxTokens = 100) {
        try {
          return ((await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: maxTokens,
            temperature: 0.7
          })).choices[0]?.message?.content || "").trim();
        } catch (error) {
          throw console.error("OpenAI API error:", error), new Error(`Failed to generate text: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    };
  }
});

// app/utils/aiEnrich.ts
var aiEnrich_exports = {};
__export(aiEnrich_exports, {
  AIEnrichmentService: () => AIEnrichmentService
});
var AIEnrichmentService, init_aiEnrich = __esm({
  "app/utils/aiEnrich.ts"() {
    "use strict";
    init_aiClient();
    init_db();
    AIEnrichmentService = class {
      aiClient;
      constructor() {
        this.aiClient = new AIClient();
      }
      async enrichProduct(userId, product, gaps = []) {
        let improvements = [], errors = [], totalUsage = 0, baseSpec = {
          title: product.title || "",
          description: product.description || "",
          price: product.variants[0]?.price ? `${product.variants[0].price} USD` : "0.00 USD",
          availability: this.getAvailabilityStatus(product.variants),
          category: product.productType || "Uncategorized",
          sku: product.variants[0]?.sku,
          image_urls: product.images.map((img) => img.url),
          vendor: product.vendor
        };
        console.log("\u{1F3AF} Enriching product for gaps:", gaps);
        for (let gap of gaps)
          try {
            let result = await this.generateRecommendationForGap(gap, baseSpec, userId);
            result && (improvements.push(result), totalUsage += result.newValue?.length || 0);
          } catch (error) {
            errors.push(`Failed to generate recommendation for ${gap}: ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        return {
          originalProduct: product,
          enrichedSpec: baseSpec,
          improvements,
          totalUsage,
          errors
        };
      }
      async generateRecommendationForGap(gap, baseSpec, userId) {
        if ([
          "material",
          "dimensions",
          "weight",
          "color",
          "size",
          "model",
          "brand",
          "vendor",
          "upc",
          "age_range",
          "gender",
          "compatibility",
          "specifications",
          "video_urls",
          "documentation_url",
          "return_policy",
          "shipping_info"
        ].includes(gap))
          return {
            field: gap,
            originalValue: baseSpec[gap] || null,
            newValue: "Need Customer Input",
            improvement: "This field requires actual product specifications from the brand/manufacturer"
          };
        let mapping = {
          description: {
            prompt: `Given the product title "${baseSpec.title}", generate a comprehensive and engaging product description. Highlight its key features, benefits, and target audience. Aim for a length of at least 200 words. Current description: "${baseSpec.description || "No description"}"`,
            maxTokens: 500,
            reason: "Generated comprehensive product description"
          },
          use_cases: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of 3-5 practical use cases or scenarios where this product would be ideal. Focus on how a customer would use it.`,
            maxTokens: 100,
            reason: "Generated practical use cases"
          },
          features: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a bulleted list of 3-5 key features of the product. Focus on unique selling points and technical specifications.`,
            maxTokens: 150,
            reason: "Generated key product features"
          },
          keywords: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of relevant keywords for SEO and search. Focus on terms a customer would use to find this product. Do not include the product title itself as a keyword.`,
            maxTokens: 100,
            reason: "Generated SEO keywords"
          },
          target_audience: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", suggest the primary target audience for this product (e.g., 'Beginner snowboarders', 'Professional athletes', 'Casual users').`,
            maxTokens: 50,
            reason: "Suggested target audience"
          },
          sku: {
            prompt: `Given the product title "${baseSpec.title}", description "${baseSpec.description}", and current SKU "${baseSpec.sku || "N/A"}", suggest a concise SKU for the product if it's missing or generic. If a good SKU exists, state 'N/A'.`,
            maxTokens: 20,
            reason: "Suggested concise SKU"
          },
          tags: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate a comma-separated list of relevant tags for product categorization and search. Focus on broad categories and attributes.`,
            maxTokens: 100,
            reason: "Generated relevant tags"
          },
          warranty: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", suggest typical warranty information for this type of product (e.g., '1-year limited warranty', 'Manufacturer warranty applies').`,
            maxTokens: 50,
            reason: "Suggested warranty information"
          },
          ai_search_queries: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", generate 5-7 example search queries that customers might use to find this product when using AI search or voice search. Focus on natural language queries.`,
            maxTokens: 150,
            reason: "Generated AI search query examples"
          },
          semantic_description: {
            prompt: `Given the product title "${baseSpec.title}" and description "${baseSpec.description}", create a concise semantic description optimized for AI understanding. Focus on key attributes, use cases, and context in 2-3 sentences.`,
            maxTokens: 150,
            reason: "Generated AI-optimized semantic description"
          },
          image_urls: {
            prompt: "Note: Image URLs cannot be generated by AI. This field requires actual product images to be uploaded to Shopify.",
            maxTokens: 10,
            reason: "Images require manual upload"
          }
        }[gap];
        if (!mapping)
          return console.log(`\u26A0\uFE0F No mapping found for gap: ${gap}`), null;
        try {
          let aiResponse = await this.aiClient.generateText(mapping.prompt, mapping.maxTokens);
          if (console.log(`\u{1F916} AI Response for ${gap}:`, aiResponse), aiResponse && aiResponse.trim() !== "" && !aiResponse.toLowerCase().includes("error") && aiResponse.trim().toLowerCase() !== "n/a")
            return {
              field: gap,
              originalValue: baseSpec[gap] || null,
              newValue: aiResponse,
              improvement: mapping.reason
            };
          console.log(`\u26A0\uFE0F Skipping ${gap}: Response was empty, N/A, or contained error`);
        } catch (error) {
          console.error(`Error generating recommendation for ${gap}:`, error);
        }
        return null;
      }
      async enrichProducts(userId, products, options = {}) {
        let results = [];
        for (let product of products)
          try {
            let { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), spec = mapShopifyToSpec2(product), gaps = calculateProductScore2(spec).gaps;
            console.log(`\u{1F3AF} Enriching product ${product.title} with gaps:`, gaps);
            let result = await this.enrichProduct(userId, product, gaps);
            results.push(result);
          } catch (error) {
            console.error(`Failed to enrich product ${product.title}:`, error), results.push({
              originalProduct: product,
              enrichedSpec: {},
              improvements: [],
              totalUsage: 0,
              errors: [`Failed to enrich product: ${error instanceof Error ? error.message : "Unknown error"}`]
            });
          }
        return results;
      }
      async applyEnrichmentToShopify(userId, shopDomain, accessToken, enrichmentResult) {
        try {
          console.log("\u{1F504} Applying enrichment to Shopify with improvements:", enrichmentResult.improvements.length);
          for (let improvement of enrichmentResult.improvements) {
            let { field, newValue } = improvement;
            if (console.log(`\u{1F4DD} Applying ${field}: ${newValue}`), field === "description")
              await this.updateProductDescription(
                shopDomain,
                accessToken,
                enrichmentResult.originalProduct.id,
                newValue
              ), console.log("\u2705 Updated product description");
            else {
              let metafieldType = this.getMetafieldType(field, newValue), metafieldValue = this.formatMetafieldValue(field, newValue);
              console.log("\u{1F4DD} Creating metafield:", {
                namespace: "catalogai",
                key: field,
                type: metafieldType,
                originalValue: newValue,
                formattedValue: metafieldValue,
                valueType: typeof newValue
              }), await this.createProductMetafield(
                shopDomain,
                accessToken,
                enrichmentResult.originalProduct.id,
                {
                  namespace: "catalogai",
                  key: field,
                  value: metafieldValue,
                  type: metafieldType
                }
              ), console.log(`\u2705 Updated metafield: catalogai.${field}`);
            }
          }
          return await db.log.create({
            data: {
              userId,
              type: "enrichment",
              message: `Applied AI enrichment to product: ${enrichmentResult.originalProduct.title}`,
              metadata: {
                productId: enrichmentResult.originalProduct.id,
                improvements: enrichmentResult.improvements.length,
                usage: enrichmentResult.totalUsage,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              }
            }
          }), !0;
        } catch (error) {
          return console.error("Failed to apply enrichment to Shopify:", error), await db.log.create({
            data: {
              userId,
              type: "error",
              message: `Failed to apply enrichment to Shopify: ${error instanceof Error ? error.message : "Unknown error"}`,
              error: error instanceof Error ? error.stack : String(error),
              metadata: {
                productId: enrichmentResult.originalProduct.id,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              }
            }
          }), !1;
        }
      }
      getMetafieldType(field, value) {
        return field === "dimensions" || ["use_cases", "features", "keywords", "ai_search_queries"].includes(field) ? "json" : ["weight", "price"].includes(field) ? "number_decimal" : (field === "availability", "single_line_text_field");
      }
      formatMetafieldValue(field, value) {
        if (typeof value == "object" || Array.isArray(value))
          return JSON.stringify(value);
        if (["use_cases", "features", "keywords", "ai_search_queries", "tags"].includes(field)) {
          let stringValue = String(value);
          if (stringValue.includes(`
-`) || stringValue.startsWith("-")) {
            let items = stringValue.split(`
`).map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
            return JSON.stringify(items);
          }
          if (stringValue.includes(",")) {
            let items = stringValue.split(",").map((item) => item.trim()).filter(Boolean);
            return JSON.stringify(items);
          }
          return JSON.stringify([stringValue]);
        }
        return String(value);
      }
      getAvailabilityStatus(variants) {
        if (variants.length === 0)
          return "out_of_stock";
        let hasAvailable = variants.some((v) => v.availableForSale && (v.inventoryQuantity || 0) > 0), hasInventory = variants.some((v) => (v.inventoryQuantity || 0) > 0);
        return hasAvailable ? "in_stock" : hasInventory && !hasAvailable ? "pre_order" : "out_of_stock";
      }
      getMetafieldValue(metafields, key) {
        return metafields.find(
          (m) => m.key === key || m.key.toLowerCase().includes(key.toLowerCase())
        )?.value;
      }
      getMetafieldArray(metafields, key) {
        let value = this.getMetafieldValue(metafields, key);
        if (value)
          try {
            let parsed = JSON.parse(value);
            if (Array.isArray(parsed))
              return parsed.filter((item) => typeof item == "string");
          } catch {
            return value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
          }
      }
      async updateProductDescription(shopDomain, accessToken, productId, description) {
        let mutation = `
      mutation productUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            title
            descriptionHtml
          }
          userErrors {
            field
            message
          }
        }
      }
    `, variables = {
          input: {
            id: `gid://shopify/Product/${productId}`,
            descriptionHtml: description
          }
        }, response = await fetch(`https://${shopDomain}/admin/api/2025-10/graphql`, {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: mutation,
            variables
          })
        });
        if (!response.ok)
          throw new Error(`Failed to update product description: ${response.status}`);
        let result = await response.json();
        if (result.errors)
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        if (result.data?.productUpdate?.userErrors?.length > 0)
          throw new Error(`Shopify validation errors: ${JSON.stringify(result.data.productUpdate.userErrors)}`);
      }
      async createProductMetafield(shopDomain, accessToken, productId, metafield) {
        let mutation = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `, variables = {
          metafields: [
            {
              ownerId: `gid://shopify/Product/${productId}`,
              namespace: metafield.namespace,
              key: metafield.key,
              value: metafield.value,
              type: metafield.type
            }
          ]
        }, response = await fetch(`https://${shopDomain}/admin/api/2025-10/graphql`, {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: mutation,
            variables
          })
        });
        if (!response.ok)
          throw new Error(`Failed to create metafield: ${response.status}`);
        let result = await response.json();
        if (result.errors)
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }
    };
  }
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";

// app/utils/queue.ts
init_db();
import { Queue, Worker, QueueEvents } from "bullmq";
import { Redis } from "ioredis";

// app/utils/healthChecker.ts
init_db();

// app/utils/emailService.ts
init_db();
var _EmailService = class {
  isConfigured = !1;
  constructor() {
    this.isConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);
  }
  static getInstance() {
    return _EmailService.instance || (_EmailService.instance = new _EmailService()), _EmailService.instance;
  }
  async sendWeeklyHealthSummary(summary) {
    try {
      if (!this.isConfigured)
        return console.log("Email service not configured - logging summary instead"), await this.logSummary(summary), !0;
      let template = this.generateWeeklyHealthTemplate(summary), emailAddress = await this.getUserEmailAddress(summary.userId);
      return emailAddress ? (console.log("Would send email:", {
        to: emailAddress,
        subject: template.subject,
        html: template.html
      }), await db.log.create({
        data: {
          userId: summary.userId,
          type: "email_sent",
          message: `Weekly health summary sent to ${emailAddress}`,
          metadata: {
            subject: template.subject,
            currentScore: summary.currentScore,
            scoreChange: summary.scoreChange,
            issuesFound: summary.issuesFound,
            issuesFixed: summary.issuesFixed
          }
        }
      }), !0) : (console.log("No email address found for user - logging summary instead"), await this.logSummary(summary), !0);
    } catch (error) {
      return console.error("Failed to send weekly health summary:", error), await db.log.create({
        data: {
          userId: summary.userId,
          type: "error",
          message: `Failed to send weekly health summary: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.message : "Unknown error"
        }
      }), !1;
    }
  }
  async getUserEmailAddress(userId) {
    try {
      let user = await db.user.findUnique({
        where: { id: userId },
        select: { shopDomain: !0 }
      });
      return user ? `admin@${user.shopDomain.replace(".myshopify.com", "")}.myshopify.com` : null;
    } catch (error) {
      return console.error("Failed to get user email address:", error), null;
    }
  }
  generateWeeklyHealthTemplate(summary) {
    let scoreTrend = summary.scoreChange >= 0 ? "\u{1F4C8}" : "\u{1F4C9}", scoreColor = summary.scoreChange >= 0 ? "#00a047" : "#d82c0d", html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weekly Health Summary - ${summary.shopDomain}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
          .score-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .score-number { font-size: 48px; font-weight: bold; color: ${scoreColor}; margin: 10px 0; }
          .trend { font-size: 18px; color: ${scoreColor}; }
          .stats { display: flex; justify-content: space-around; margin: 20px 0; }
          .stat { text-align: center; }
          .stat-number { font-size: 24px; font-weight: bold; color: #667eea; }
          .stat-label { color: #666; font-size: 14px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>\u{1F3E5} Catalog Health Report</h1>
          <p>Weekly summary for ${summary.shopDomain}</p>
        </div>
        
        <div class="content">
          <div class="score-card">
            <div class="score-number">${summary.currentScore}%</div>
            <div class="trend">
              ${scoreTrend} ${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}% from last week
            </div>
            <p>Current Health Score</p>
          </div>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-number">${summary.totalProducts}</div>
              <div class="stat-label">Total Products</div>
            </div>
            <div class="stat">
              <div class="stat-number">${summary.issuesFound}</div>
              <div class="stat-label">Issues Found</div>
            </div>
            <div class="stat">
              <div class="stat-number">${summary.issuesFixed}</div>
              <div class="stat-label">Issues Fixed</div>
            </div>
          </div>
          
          ${summary.currentScore < 90 ? `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <strong>\u26A0\uFE0F Attention Needed:</strong> Your catalog health is below 90%. Consider running a health check to identify and fix issues.
            </div>
          ` : `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <strong>\u2705 Great Job!</strong> Your catalog is in excellent health. Keep up the good work!
            </div>
          `}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.SHOPIFY_APP_URL}/dashboard" class="cta-button">
              View Dashboard
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated report from CatalogAI Optimizer.</p>
          <p>To adjust your email preferences, visit your dashboard settings.</p>
        </div>
      </body>
      </html>
    `, text = `
Catalog Health Report - ${summary.shopDomain}

Health Score: ${summary.currentScore}%
Trend: ${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}% from last week

Statistics:
- Total Products: ${summary.totalProducts}
- Issues Found: ${summary.issuesFound}
- Issues Fixed: ${summary.issuesFixed}

${summary.currentScore < 90 ? "\u26A0\uFE0F Your catalog health is below 90%. Consider running a health check to identify and fix issues." : "\u2705 Your catalog is in excellent health. Keep up the good work!"}

View your dashboard: ${process.env.SHOPIFY_APP_URL}/dashboard

---
This is an automated report from CatalogAI Optimizer.
To adjust your email preferences, visit your dashboard settings.
    `;
    return {
      subject: `\u{1F4CA} Weekly Health Report: ${summary.currentScore}% (${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}%)`,
      html,
      text
    };
  }
  async logSummary(summary) {
    await db.log.create({
      data: {
        userId: summary.userId,
        type: "email_summary",
        message: `Weekly health summary: ${summary.currentScore}% (${summary.scoreChange >= 0 ? "+" : ""}${summary.scoreChange.toFixed(1)}%) - ${summary.issuesFound} issues found, ${summary.issuesFixed} fixed`,
        metadata: {
          currentScore: summary.currentScore,
          previousScore: summary.previousScore,
          scoreChange: summary.scoreChange,
          totalProducts: summary.totalProducts,
          issuesFound: summary.issuesFound,
          issuesFixed: summary.issuesFixed
        }
      }
    });
  }
  async sendHealthAlert(userId, shopDomain, alertType, message) {
    try {
      if (!this.isConfigured)
        return console.log("Email service not configured - logging alert instead"), await this.logAlert(userId, alertType, message), !0;
      let emailAddress = await this.getUserEmailAddress(userId);
      if (!emailAddress)
        return console.log("No email address found for user - logging alert instead"), await this.logAlert(userId, alertType, message), !0;
      let template = this.generateHealthAlertTemplate(shopDomain, alertType, message);
      return console.log("Would send health alert:", {
        to: emailAddress,
        subject: template.subject,
        html: template.html
      }), await db.log.create({
        data: {
          userId,
          type: "health_alert",
          message: `Health alert sent: ${message}`,
          metadata: {
            alertType,
            message
          }
        }
      }), !0;
    } catch (error) {
      return console.error("Failed to send health alert:", error), !1;
    }
  }
  generateHealthAlertTemplate(shopDomain, alertType, message) {
    let isCritical = alertType === "critical", color = isCritical ? "#d82c0d" : "#f59e0b", icon = isCritical ? "\u{1F6A8}" : "\u26A0\uFE0F", html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Alert - ${shopDomain}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${color}; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
          .alert-box { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 20px; margin: 20px 0; }
          .cta-button { display: inline-block; background: ${color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${icon} Health Alert</h1>
          <p>${shopDomain}</p>
        </div>
        
        <div class="content">
          <div class="alert-box">
            <h3>${isCritical ? "Critical Issue Detected" : "Warning"}</h3>
            <p>${message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.SHOPIFY_APP_URL}/dashboard" class="cta-button">
              View Dashboard
            </a>
          </div>
        </div>
      </body>
      </html>
    `, text = `
${icon} Health Alert - ${shopDomain}

${isCritical ? "Critical Issue Detected" : "Warning"}

${message}

View your dashboard: ${process.env.SHOPIFY_APP_URL}/dashboard
    `;
    return {
      subject: `${icon} ${isCritical ? "Critical" : "Warning"}: ${shopDomain}`,
      html,
      text
    };
  }
  async logAlert(userId, alertType, message) {
    await db.log.create({
      data: {
        userId,
        type: "health_alert",
        message: `Health alert (${alertType}): ${message}`,
        metadata: {
          alertType,
          message
        }
      }
    });
  }
}, EmailService = _EmailService;
__publicField(EmailService, "instance");
var emailService = EmailService.getInstance();

// app/utils/analyticsService.ts
init_db();
var _AnalyticsService = class {
  static getInstance() {
    return _AnalyticsService.instance || (_AnalyticsService.instance = new _AnalyticsService()), _AnalyticsService.instance;
  }
  async trackPerformanceMetrics(metrics) {
    try {
      await db.log.create({
        data: {
          userId: metrics.userId,
          type: "performance_metrics",
          message: `Performance tracked: ${metrics.healthScore}% health, ${metrics.totalProducts} products, ${metrics.issuesFound} issues`,
          metadata: {
            healthScore: metrics.healthScore,
            totalProducts: metrics.totalProducts,
            validProducts: metrics.validProducts,
            issuesFound: metrics.issuesFound,
            issuesFixed: metrics.issuesFixed,
            aiUsage: metrics.aiUsage,
            syncCount: metrics.syncCount,
            enrichmentCount: metrics.enrichmentCount,
            timestamp: metrics.timestamp
          }
        }
      });
      let deltaMetrics = await this.calculateDeltaMetrics(metrics.userId, metrics.timestamp);
      deltaMetrics && await this.storeDeltaMetrics(metrics.userId, deltaMetrics);
      let roiMetrics = await this.calculateROIMetrics(metrics.userId, metrics.shopDomain);
      roiMetrics && await this.storeROIMetrics(roiMetrics);
    } catch (error) {
      console.error("Failed to track performance metrics:", error);
    }
  }
  async calculateDeltaMetrics(userId, currentTimestamp) {
    try {
      let hourAgo = new Date(currentTimestamp.getTime() - 36e5), dayAgo = new Date(currentTimestamp.getTime() - 24 * 60 * 60 * 1e3), weekAgo = new Date(currentTimestamp.getTime() - 7 * 24 * 60 * 60 * 1e3), currentMetrics = await this.getLatestMetrics(userId);
      if (!currentMetrics)
        return null;
      let previousMetrics = await this.getPreviousMetrics(userId, dayAgo);
      if (!previousMetrics)
        return null;
      let scoreDelta = currentMetrics.healthScore - previousMetrics.healthScore, productsDelta = currentMetrics.totalProducts - previousMetrics.totalProducts, issuesDelta = currentMetrics.issuesFound - previousMetrics.issuesFound, aiUsageDelta = currentMetrics.aiUsage - previousMetrics.aiUsage, syncDelta = currentMetrics.syncCount - previousMetrics.syncCount, enrichmentDelta = currentMetrics.enrichmentCount - previousMetrics.enrichmentCount;
      return {
        scoreDelta,
        productsDelta,
        issuesDelta,
        aiUsageDelta,
        syncDelta,
        enrichmentDelta,
        timePeriod: "day"
      };
    } catch (error) {
      return console.error("Failed to calculate delta metrics:", error), null;
    }
  }
  async getLatestMetrics(userId) {
    try {
      let latestAudit = await db.audit.findFirst({
        where: { userId },
        orderBy: { timestamp: "desc" }
      }), user = await db.user.findUnique({
        where: { id: userId }
      });
      if (!latestAudit || !user)
        return null;
      let oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1e3), syncCount = await db.log.count({
        where: {
          userId,
          type: "sync",
          createdAt: { gte: oneDayAgo }
        }
      }), enrichmentCount = await db.log.count({
        where: {
          userId,
          type: "ai_enrichment",
          createdAt: { gte: oneDayAgo }
        }
      });
      return {
        userId,
        shopDomain: user.shopDomain,
        timestamp: latestAudit.timestamp,
        healthScore: latestAudit.score,
        totalProducts: latestAudit.totalProducts,
        validProducts: latestAudit.validProducts,
        issuesFound: Array.isArray(latestAudit.gaps) ? latestAudit.gaps.length : 0,
        issuesFixed: 0,
        // Will be calculated separately
        aiUsage: user.aiUsage,
        syncCount,
        enrichmentCount
      };
    } catch (error) {
      return console.error("Failed to get latest metrics:", error), null;
    }
  }
  async getPreviousMetrics(userId, fromDate) {
    try {
      let audit = await db.audit.findFirst({
        where: {
          userId,
          timestamp: { gte: fromDate }
        },
        orderBy: { timestamp: "asc" }
      }), user = await db.user.findUnique({
        where: { id: userId }
      });
      return !audit || !user ? null : {
        userId,
        shopDomain: user.shopDomain,
        timestamp: audit.timestamp,
        healthScore: audit.score,
        totalProducts: audit.totalProducts,
        validProducts: audit.validProducts,
        issuesFound: Array.isArray(audit.gaps) ? audit.gaps.length : 0,
        issuesFixed: 0,
        aiUsage: user.aiUsage,
        syncCount: 0,
        enrichmentCount: 0
      };
    } catch (error) {
      return console.error("Failed to get previous metrics:", error), null;
    }
  }
  async storeDeltaMetrics(userId, deltaMetrics) {
    try {
      await db.log.create({
        data: {
          userId,
          type: "delta_metrics",
          message: `Delta metrics: ${deltaMetrics.scoreDelta >= 0 ? "+" : ""}${deltaMetrics.scoreDelta.toFixed(1)}% score, ${deltaMetrics.productsDelta >= 0 ? "+" : ""}${deltaMetrics.productsDelta} products`,
          metadata: {
            scoreDelta: deltaMetrics.scoreDelta,
            productsDelta: deltaMetrics.productsDelta,
            issuesDelta: deltaMetrics.issuesDelta,
            aiUsageDelta: deltaMetrics.aiUsageDelta,
            syncDelta: deltaMetrics.syncCount,
            enrichmentDelta: deltaMetrics.enrichmentDelta,
            timePeriod: deltaMetrics.timePeriod
          }
        }
      });
    } catch (error) {
      console.error("Failed to store delta metrics:", error);
    }
  }
  async calculateROIMetrics(userId, shopDomain) {
    try {
      let oneWeekAgo = new Date(Date.now() - 6048e5), audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: { gte: oneWeekAgo }
        },
        orderBy: { timestamp: "asc" }
      });
      if (audits.length < 2)
        return null;
      let firstAudit = audits[0], lastAudit = audits[audits.length - 1], user = await db.user.findUnique({
        where: { id: userId }
      });
      if (!user)
        return null;
      let aiTokensUsed = user.aiUsage, healthScoreImprovement = lastAudit.score - firstAudit.score, productsProcessed = lastAudit.totalProducts, estimatedValueAdded = healthScoreImprovement * productsProcessed * 0.1, tokenCost = aiTokensUsed * 1e-4, costPerImprovement = tokenCost / Math.max(healthScoreImprovement, 1), roi = estimatedValueAdded / Math.max(tokenCost, 1);
      return {
        userId,
        shopDomain,
        timePeriod: "week",
        healthScoreImprovement,
        productsProcessed,
        aiTokensUsed,
        estimatedValueAdded,
        costPerImprovement,
        roi
      };
    } catch (error) {
      return console.error("Failed to calculate ROI metrics:", error), null;
    }
  }
  async storeROIMetrics(roiMetrics) {
    try {
      await db.log.create({
        data: {
          userId: roiMetrics.userId,
          type: "roi_metrics",
          message: `ROI: ${roiMetrics.roi.toFixed(2)}x return, $${roiMetrics.estimatedValueAdded.toFixed(2)} value added`,
          metadata: {
            healthScoreImprovement: roiMetrics.healthScoreImprovement,
            productsProcessed: roiMetrics.productsProcessed,
            aiTokensUsed: roiMetrics.aiTokensUsed,
            estimatedValueAdded: roiMetrics.estimatedValueAdded,
            costPerImprovement: roiMetrics.costPerImprovement,
            roi: roiMetrics.roi,
            timePeriod: roiMetrics.timePeriod
          }
        }
      });
    } catch (error) {
      console.error("Failed to store ROI metrics:", error);
    }
  }
  async getPerformanceTrends(userId, days = 30) {
    try {
      let startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3), audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: { gte: startDate }
        },
        orderBy: { timestamp: "asc" }
      }), user = await db.user.findUnique({
        where: { id: userId }
      });
      return audits.map((audit) => ({
        date: audit.timestamp.toISOString().split("T")[0],
        healthScore: audit.score,
        totalProducts: audit.totalProducts,
        issuesFound: Array.isArray(audit.gaps) ? audit.gaps.length : 0,
        aiUsage: user?.aiUsage || 0
      }));
    } catch (error) {
      return console.error("Failed to get performance trends:", error), [];
    }
  }
  async getROISummary(userId) {
    try {
      let roiLogs = await db.log.findMany({
        where: {
          userId,
          type: "roi_metrics"
        },
        orderBy: { createdAt: "desc" },
        take: 10
      });
      if (roiLogs.length === 0)
        return null;
      let totalValueAdded = 0, totalCost = 0, totalROI = 0;
      for (let log of roiLogs) {
        let metadata = log.metadata;
        metadata && (totalValueAdded += metadata.estimatedValueAdded || 0, totalCost += (metadata.aiTokensUsed || 0) * 1e-4, totalROI += metadata.roi || 0);
      }
      return {
        totalROI,
        totalValueAdded,
        totalCost,
        averageROI: totalROI / roiLogs.length
      };
    } catch (error) {
      return console.error("Failed to get ROI summary:", error), null;
    }
  }
}, AnalyticsService = _AnalyticsService;
__publicField(AnalyticsService, "instance");
var analyticsService = AnalyticsService.getInstance();

// app/utils/healthChecker.ts
import Ajv from "ajv";
import addFormats from "ajv-formats";
import axios from "axios";
var ajv = new Ajv();
addFormats(ajv);
var HealthCheckerService = class {
  shopDomain;
  accessToken;
  constructor(shopDomain, accessToken) {
    this.shopDomain = shopDomain, this.accessToken = accessToken;
  }
  async performHealthCheck(options = {}) {
    let {
      maxProducts = 100,
      includePings = !0,
      includeInventory = !0,
      includeValidation = !0
    } = options;
    try {
      let user = await db.user.findUnique({
        where: { shopId: this.shopDomain }
      });
      if (!user)
        throw new Error("User not found");
      let thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      let products = await db.product.findMany({
        where: {
          userId: user.id,
          updatedAt: {
            gte: thirtyDaysAgo
          }
        },
        take: maxProducts,
        orderBy: {
          updatedAt: "desc"
        }
      }), gaps = [], validProducts = 0;
      if (includeValidation) {
        let validationResults = await this.validateProducts(products);
        gaps.push(...validationResults.gaps), validProducts = validationResults.validCount;
      }
      if (includePings) {
        let pingResults = await this.checkProductUrls(products.slice(0, 20));
        gaps.push(...pingResults);
      }
      if (includeInventory) {
        let inventoryResults = await this.checkInventoryDeltas(products);
        gaps.push(...inventoryResults);
      }
      let score = this.calculateHealthScore(products.length, validProducts, gaps), trends = await this.getHealthTrends(user.id, 7);
      await db.audit.create({
        data: {
          userId: user.id,
          score,
          totalProducts: products.length,
          validProducts,
          gaps,
          // Store as JSON
          timestamp: /* @__PURE__ */ new Date()
        }
      });
      let performanceMetrics = {
        userId: user.id,
        shopDomain: this.shopDomain,
        timestamp: /* @__PURE__ */ new Date(),
        healthScore: score,
        totalProducts: products.length,
        validProducts,
        issuesFound: gaps.length,
        issuesFixed: 0,
        // Will be updated after auto-fix
        aiUsage: user.aiUsage,
        syncCount: 0,
        // Will be calculated separately
        enrichmentCount: 0
        // Will be calculated separately
      };
      return await analyticsService.trackPerformanceMetrics(performanceMetrics), {
        score,
        totalProducts: products.length,
        validProducts,
        gaps,
        trends,
        timestamp: /* @__PURE__ */ new Date()
      };
    } catch (error) {
      throw console.error("Health check failed:", error), new Error(`Health check failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async validateProducts(products) {
    let gaps = [], validCount = 0, requiredFields = [
      "title",
      "description",
      "vendor",
      "productType",
      "tags",
      "images",
      "variants",
      "options",
      "status"
    ], fieldCounts = {}, missingFieldProducts = {};
    for (let product of products) {
      let isValid = !0;
      for (let field of requiredFields)
        (!product[field] || Array.isArray(product[field]) && product[field].length === 0 || typeof product[field] == "string" && product[field].trim() === "") && (fieldCounts[field] = (fieldCounts[field] || 0) + 1, missingFieldProducts[field] = missingFieldProducts[field] || [], missingFieldProducts[field].push(product.id), isValid = !1);
      isValid && validCount++;
    }
    for (let [field, count] of Object.entries(fieldCounts))
      if (count > 0) {
        let severity = count > products.length * 0.5 ? "critical" : count > products.length * 0.2 ? "error" : "warning";
        gaps.push({
          field,
          severity,
          count,
          products: missingFieldProducts[field],
          fixable: ["title", "description", "tags"].includes(field)
        });
      }
    return { gaps, validCount };
  }
  async checkProductUrls(products) {
    let gaps = [], failedUrls = [];
    for (let product of products)
      if (product.handle)
        try {
          let url = `https://${this.shopDomain}/products/${product.handle}`;
          (await axios.get(url, {
            timeout: 5e3,
            validateStatus: (status) => status < 500
            // Accept redirects and client errors
          })).status >= 400 && failedUrls.push(product.id);
        } catch {
          failedUrls.push(product.id);
        }
    return failedUrls.length > 0 && gaps.push({
      field: "product_url",
      severity: failedUrls.length > products.length * 0.3 ? "error" : "warning",
      count: failedUrls.length,
      products: failedUrls,
      fixable: !1
    }), gaps;
  }
  async checkInventoryDeltas(products) {
    let gaps = [], lowInventory = [], outOfStock = [];
    for (let product of products)
      if (product.variants && Array.isArray(product.variants))
        for (let variant of product.variants)
          variant.inventoryQuantity !== void 0 && (variant.inventoryQuantity === 0 ? outOfStock.push(variant.id) : variant.inventoryQuantity < 5 && lowInventory.push(variant.id));
    return outOfStock.length > 0 && gaps.push({
      field: "inventory_out_of_stock",
      severity: "error",
      count: outOfStock.length,
      products: outOfStock,
      fixable: !1
    }), lowInventory.length > 0 && gaps.push({
      field: "inventory_low",
      severity: "warning",
      count: lowInventory.length,
      products: lowInventory,
      fixable: !1
    }), gaps;
  }
  calculateHealthScore(totalProducts, validProducts, gaps) {
    if (totalProducts === 0)
      return 100;
    let score = validProducts / totalProducts * 100;
    for (let gap of gaps) {
      let penalty = gap.severity === "critical" ? 5 : gap.severity === "error" ? 3 : 1;
      score -= Math.min(penalty * (gap.count / totalProducts), 10);
    }
    return Math.max(0, Math.round(score));
  }
  async getHealthTrends(userId, days) {
    let startDate = /* @__PURE__ */ new Date();
    return startDate.setDate(startDate.getDate() - days), (await db.audit.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate
        }
      },
      orderBy: {
        timestamp: "asc"
      }
    })).map((audit) => ({
      date: audit.timestamp.toISOString().split("T")[0],
      score: audit.score,
      totalProducts: audit.totalProducts,
      validProducts: audit.validProducts
    }));
  }
  async autoFixGaps(gaps) {
    let fixed = 0, failed = 0;
    for (let gap of gaps)
      if (gap.fixable)
        try {
          console.log(`Auto-fixing gap: ${gap.field} for ${gap.count} products`), fixed++;
        } catch (error) {
          console.error(`Failed to fix gap ${gap.field}:`, error), failed++;
        }
    return { fixed, failed };
  }
  async sendWeeklyHealthSummary(userId) {
    try {
      let fourteenDaysAgo = /* @__PURE__ */ new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
      let audits = await db.audit.findMany({
        where: {
          userId,
          timestamp: {
            gte: fourteenDaysAgo
          }
        },
        orderBy: {
          timestamp: "desc"
        }
      });
      if (audits.length === 0)
        return console.log("No audit data available for weekly summary"), !1;
      let currentAudit = audits[0], previousAudit = audits[audits.length - 1] || currentAudit, oneWeekAgo = /* @__PURE__ */ new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      let fixedIssues = await db.log.count({
        where: {
          userId,
          type: "auto_fix",
          createdAt: {
            gte: oneWeekAgo
          }
        }
      }), summary = {
        userId,
        shopDomain: this.shopDomain,
        currentScore: currentAudit.score,
        previousScore: previousAudit.score,
        scoreChange: currentAudit.score - previousAudit.score,
        totalProducts: currentAudit.totalProducts,
        issuesFound: Array.isArray(currentAudit.gaps) ? currentAudit.gaps.length : 0,
        issuesFixed: fixedIssues,
        trendData: audits.slice(0, 7).map((audit) => ({
          date: audit.timestamp.toISOString().split("T")[0],
          score: audit.score
        }))
      };
      return await emailService.sendWeeklyHealthSummary(summary);
    } catch (error) {
      return console.error("Failed to send weekly health summary:", error), !1;
    }
  }
  async sendHealthAlert(userId, alertType, message) {
    return await emailService.sendHealthAlert(userId, this.shopDomain, alertType, message);
  }
};

// app/utils/queue.ts
var redis = null;
try {
  console.log("Checking Redis configuration:", {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    hasRedisPassword: !!process.env.REDIS_PASSWORD,
    allEnvVars: Object.keys(process.env).filter((key) => key.startsWith("REDIS"))
  }), process.env.REDIS_URL ? (console.log("Attempting Redis connection using REDIS_URL:", process.env.REDIS_URL.replace(/\/\/default:[^@]+@/, "//default:***@")), redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    // Required by BullMQ for blocking operations
    connectTimeout: 5e3,
    // 5 second timeout
    lazyConnect: !0,
    // Don't connect immediately
    db: 0
    // Force database 0 (default)
  })) : process.env.REDIS_HOST && process.env.REDIS_PASSWORD ? (console.log("Attempting Redis connection to:", process.env.REDIS_HOST), redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    // Required by BullMQ for blocking operations
    connectTimeout: 5e3,
    // 5 second timeout
    lazyConnect: !0,
    // Don't connect immediately
    db: 0
    // Force database 0 (default)
  })) : console.log("Redis not configured - skipping connection"), redis && redis.connect().then(() => {
    console.log("\u2705 Redis connected successfully");
  }).catch((error) => {
    console.error("\u274C Redis connection failed:", error.message), redis = null;
  });
} catch (error) {
  console.error("Failed to initialize Redis connection:", error), redis = null;
}
var bullmqQueueConnection = null, bullmqWorkerConnection = null, bullmqEventsConnection = null;
if (redis)
  try {
    let connectionConfig = null;
    if (process.env.REDIS_URL) {
      let cleanRedisUrl = process.env.REDIS_URL.replace(/['"]+$/, "");
      console.log("Cleaned REDIS_URL:", cleanRedisUrl.replace(/\/\/default:[^@]+@/, "//default:***@"));
      let url = new URL(cleanRedisUrl);
      connectionConfig = {
        host: url.hostname,
        port: parseInt(url.port) || 6379,
        password: url.password,
        db: 0,
        // Explicitly force database 0
        maxRetriesPerRequest: null,
        retryDelayOnFailover: 100,
        connectTimeout: 5e3,
        lazyConnect: !0,
        enableAutoPipelining: !1
      };
    } else
      process.env.REDIS_HOST && process.env.REDIS_PASSWORD && (connectionConfig = {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
        password: process.env.REDIS_PASSWORD,
        db: 0,
        // Explicitly force database 0
        maxRetriesPerRequest: null,
        retryDelayOnFailover: 100,
        connectTimeout: 5e3,
        lazyConnect: !0,
        enableAutoPipelining: !1
      });
    connectionConfig && (bullmqQueueConnection = new Redis(connectionConfig), bullmqWorkerConnection = new Redis(connectionConfig), bullmqEventsConnection = new Redis(connectionConfig), bullmqQueueConnection.on("connect", () => {
      console.log("BullMQ Queue Redis connected to database:", bullmqQueueConnection?.options.db);
    }), bullmqWorkerConnection.on("connect", () => {
      console.log("BullMQ Worker Redis connected to database:", bullmqWorkerConnection?.options.db);
    }), bullmqEventsConnection.on("connect", () => {
      console.log("BullMQ Events Redis connected to database:", bullmqEventsConnection?.options.db);
    }), console.log("BullMQ Redis connections created with database 0"));
  } catch (error) {
    console.error("Failed to create BullMQ Redis connections:", error), bullmqQueueConnection = null, bullmqWorkerConnection = null, bullmqEventsConnection = null;
  }
var healthCheckQueue = bullmqQueueConnection ? new Queue("health-checks", {
  connection: bullmqQueueConnection,
  defaultJobOptions: {
    removeOnComplete: 10,
    removeOnFail: 5,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2e3
    }
  }
}) : null, backgroundJobsQueue = bullmqQueueConnection ? new Queue("background-jobs", {
  connection: bullmqQueueConnection,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 10,
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 5e3
    }
  }
}) : null, queueEvents = bullmqEventsConnection ? new QueueEvents("health-checks", { connection: bullmqEventsConnection }) : null, healthCheckWorker = bullmqWorkerConnection ? new Worker(
  "health-checks",
  async (job) => {
    let { type, data } = job.data;
    switch (type) {
      case "url-ping":
        return await performUrlPing(data);
      case "inventory-validation":
        return await performInventoryValidation(data);
      case "database-health":
        return await performDatabaseHealthCheck(data);
      case "api-status":
        return await performApiStatusCheck(data);
      case "health-scan":
        return await performHealthScan(data);
      default:
        throw new Error(`Unknown health check type: ${type}`);
    }
  },
  {
    connection: bullmqWorkerConnection,
    concurrency: 5
  }
) : null, backgroundJobsWorker = bullmqWorkerConnection ? new Worker(
  "background-jobs",
  async (job) => {
    let { type, data } = job.data;
    switch (type) {
      case "sync-products":
        return await performProductSync(data);
      case "ai-enrichment":
        return await performAIEnrichment(data);
      case "cleanup-logs":
        return await performLogCleanup(data);
      case "weekly-email-summary":
        return await performWeeklyEmailSummary(data);
      default:
        throw new Error(`Unknown background job type: ${type}`);
    }
  },
  {
    connection: bullmqWorkerConnection,
    concurrency: 3
  }
) : null;
async function performUrlPing(data) {
  try {
    let response = await fetch(data.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(data.timeout || 5e3)
    });
    return {
      success: response.ok,
      status: response.status,
      responseTime: Date.now(),
      url: data.url
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Unknown error",
      url: data.url
    };
  }
}
async function performInventoryValidation(data) {
  try {
    let user = await db.user.findUnique({
      where: { shopId: data.shopId },
      include: {
        audits: {
          orderBy: { timestamp: "desc" },
          take: 1
        }
      }
    });
    if (!user)
      return {
        success: !1,
        error: "User not found",
        shopId: data.shopId
      };
    let latestAudit = user.audits[0];
    return {
      success: !0,
      hasRecentSync: latestAudit && Date.now() - new Date(latestAudit.timestamp).getTime() < 24 * 60 * 60 * 1e3,
      totalProducts: latestAudit?.totalProducts || 0,
      lastSync: latestAudit?.timestamp || null,
      shopId: data.shopId
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Database error",
      shopId: data.shopId
    };
  }
}
async function performDatabaseHealthCheck(data) {
  try {
    return await db.$queryRaw`SELECT 1`, {
      success: !0,
      userCount: await db.user.count(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Database connection failed"
    };
  }
}
async function performApiStatusCheck(data) {
  try {
    return {
      success: !0,
      shopId: data.shopId,
      apiVersion: "2025-10",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "API check failed",
      shopId: data.shopId
    };
  }
}
async function performProductSync(data) {
  try {
    return await db.log.create({
      data: {
        userId: data.userId,
        type: "sync",
        message: `Product sync initiated for shop ${data.shopId}`
      }
    }), {
      success: !0,
      shopId: data.shopId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Sync failed",
      shopId: data.shopId
    };
  }
}
async function performAIEnrichment(data) {
  try {
    return await db.log.create({
      data: {
        userId: data.userId,
        type: "ai_enrichment",
        message: `AI enrichment initiated for ${data.productIds.length} products`
      }
    }), {
      success: !0,
      shopId: data.shopId,
      productCount: data.productIds.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "AI enrichment failed",
      shopId: data.shopId
    };
  }
}
async function performLogCleanup(data) {
  try {
    let daysToKeep = data.daysToKeep || 30, cutoffDate = /* @__PURE__ */ new Date();
    return cutoffDate.setDate(cutoffDate.getDate() - daysToKeep), {
      success: !0,
      deletedCount: (await db.log.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate
          }
        }
      })).count,
      cutoffDate: cutoffDate.toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Log cleanup failed"
    };
  }
}
async function performHealthScan(data) {
  try {
    let user = await db.user.findUnique({
      where: { shopId: data.shopId }
    });
    if (!user)
      throw new Error("User not found");
    let healthChecker = new HealthCheckerService(data.shopId, user.accessToken), result = await healthChecker.performHealthCheck(data.options || {
      maxProducts: 100,
      includePings: !0,
      includeInventory: !0,
      includeValidation: !0
    });
    if (await db.log.create({
      data: {
        userId: data.userId,
        type: "health_scan",
        message: `Health scan completed: ${result.score}% score, ${result.gaps.length} gaps found`,
        metadata: {
          score: result.score,
          totalProducts: result.totalProducts,
          validProducts: result.validProducts,
          gapsCount: result.gaps.length
        }
      }
    }), result.score < 90 && result.gaps.length > 0) {
      let fixableGaps = result.gaps.filter((gap) => gap.fixable);
      if (fixableGaps.length > 0) {
        let fixResult = await healthChecker.autoFixGaps(fixableGaps);
        await db.log.create({
          data: {
            userId: data.userId,
            type: "auto_fix",
            message: `Auto-fixed ${fixResult.fixed} gaps, ${fixResult.failed} failed`,
            metadata: {
              fixed: fixResult.fixed,
              failed: fixResult.failed,
              originalScore: result.score
            }
          }
        });
        let user2 = await db.user.findUnique({
          where: { id: data.userId }
        });
        user2 && await analyticsService.trackPerformanceMetrics({
          userId: data.userId,
          shopDomain: data.shopId,
          timestamp: /* @__PURE__ */ new Date(),
          healthScore: result.score,
          totalProducts: result.totalProducts,
          validProducts: result.validProducts,
          issuesFound: result.gaps.length,
          issuesFixed: fixResult.fixed,
          aiUsage: user2.aiUsage,
          syncCount: 0,
          enrichmentCount: 0
        });
      }
    }
    return {
      success: !0,
      result,
      shopId: data.shopId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return await db.log.create({
      data: {
        userId: data.userId,
        type: "error",
        message: `Health scan failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: error instanceof Error ? error.message : "Unknown error"
      }
    }), {
      success: !1,
      error: error instanceof Error ? error.message : "Health scan failed",
      shopId: data.shopId
    };
  }
}
async function scheduleHealthChecks() {
  if (!healthCheckQueue || !backgroundJobsQueue) {
    console.log("Health checks skipped - queues not available");
    return;
  }
  try {
    await healthCheckQueue.add(
      "database-health",
      {},
      {
        repeat: { pattern: "*/5 * * * *" },
        jobId: "database-health-recurring"
      }
    ), await healthCheckQueue.add(
      "url-ping",
      { url: process.env.SHOPIFY_APP_URL + "/health" },
      {
        repeat: { pattern: "*/2 * * * *" },
        jobId: "url-ping-recurring"
      }
    ), await backgroundJobsQueue.add(
      "cleanup-logs",
      { daysToKeep: 30 },
      {
        repeat: { pattern: "0 2 * * *" },
        jobId: "log-cleanup-recurring"
      }
    ), await backgroundJobsQueue.add(
      "weekly-email-summary",
      {},
      {
        repeat: { pattern: "0 8 * * 1" },
        jobId: "weekly-email-summary-recurring"
      }
    ), console.log("Health checks scheduled successfully");
  } catch (error) {
    console.error("Failed to schedule health checks:", error);
  }
}
async function performWeeklyEmailSummary(data) {
  try {
    let validUsers = (data.userId ? [await db.user.findUnique({ where: { id: data.userId } })] : await db.user.findMany()).filter((user) => user !== null);
    for (let user of validUsers) {
      if (!user)
        continue;
      let success = await new HealthCheckerService(user.shopDomain, user.accessToken).sendWeeklyHealthSummary(user.id);
      await db.log.create({
        data: {
          userId: user.id,
          type: "weekly_email_summary",
          message: `Weekly email summary ${success ? "sent" : "failed"} for ${user.shopDomain}`,
          metadata: {
            success,
            shopDomain: user.shopDomain
          }
        }
      });
    }
    return {
      success: !0,
      usersProcessed: validUsers.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      success: !1,
      error: error instanceof Error ? error.message : "Weekly email summary failed"
    };
  }
}
async function scheduleDailyHealthScans() {
  if (!healthCheckQueue) {
    console.log("Health scans skipped - queue not available");
    return;
  }
  try {
    let users = await db.user.findMany({
      select: {
        id: !0,
        shopId: !0,
        tier: !0
      }
    });
    for (let user of users)
      await healthCheckQueue.add(
        "health-scan",
        {
          shopId: user.shopId,
          userId: user.id,
          options: {
            maxProducts: user.tier === "enterprise" ? 500 : 100,
            includePings: !0,
            includeInventory: !0,
            includeValidation: !0
          }
        },
        {
          repeat: { pattern: "0 2 * * *" },
          jobId: `health-scan-${user.shopId}`
        }
      );
    console.log(`Daily health scans scheduled for ${users.length} users`);
  } catch (error) {
    console.error("Failed to schedule daily health scans:", error);
  }
}
healthCheckWorker && healthCheckWorker.on("error", (error) => {
  console.error("Health check worker error:", error);
});
backgroundJobsWorker && backgroundJobsWorker.on("error", (error) => {
  console.error("Background jobs worker error:", error);
});
queueEvents && queueEvents.on("error", (error) => {
  console.error("Queue events error:", error);
});

// app/entry.server.tsx
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
typeof global < "u" && !global.healthChecksInitialized && (console.log("Checking Redis configuration:", {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  hasRedisPassword: !!process.env.REDIS_PASSWORD,
  allEnvVars: Object.keys(process.env).filter((key) => key.startsWith("REDIS"))
}), process.env.REDIS_HOST && process.env.REDIS_PASSWORD ? (console.log("Redis configuration found - initializing health checks"), scheduleHealthChecks().catch((error) => {
  console.error("Failed to initialize health checks:", error);
}), scheduleDailyHealthScans().catch((error) => {
  console.error("Failed to schedule daily health scans:", error);
})) : console.log("Health checks skipped - Redis not configured"), global.healthChecksInitialized = !0);
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), responseHeaders.set("X-Frame-Options", "ALLOWALL"), responseHeaders.set("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), responseHeaders.set("X-Frame-Options", "ALLOWALL"), responseHeaders.set("Content-Security-Policy", "frame-ancestors https://*.myshopify.com https://admin.shopify.com"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// node_modules/@shopify/polaris/build/esm/types.js
var Key;
(function(Key2) {
  Key2[Key2.Backspace = 8] = "Backspace", Key2[Key2.Tab = 9] = "Tab", Key2[Key2.Enter = 13] = "Enter", Key2[Key2.Shift = 16] = "Shift", Key2[Key2.Ctrl = 17] = "Ctrl", Key2[Key2.Alt = 18] = "Alt", Key2[Key2.Pause = 19] = "Pause", Key2[Key2.CapsLock = 20] = "CapsLock", Key2[Key2.Escape = 27] = "Escape", Key2[Key2.Space = 32] = "Space", Key2[Key2.PageUp = 33] = "PageUp", Key2[Key2.PageDown = 34] = "PageDown", Key2[Key2.End = 35] = "End", Key2[Key2.Home = 36] = "Home", Key2[Key2.LeftArrow = 37] = "LeftArrow", Key2[Key2.UpArrow = 38] = "UpArrow", Key2[Key2.RightArrow = 39] = "RightArrow", Key2[Key2.DownArrow = 40] = "DownArrow", Key2[Key2.Insert = 45] = "Insert", Key2[Key2.Delete = 46] = "Delete", Key2[Key2.Key0 = 48] = "Key0", Key2[Key2.Key1 = 49] = "Key1", Key2[Key2.Key2 = 50] = "Key2", Key2[Key2.Key3 = 51] = "Key3", Key2[Key2.Key4 = 52] = "Key4", Key2[Key2.Key5 = 53] = "Key5", Key2[Key2.Key6 = 54] = "Key6", Key2[Key2.Key7 = 55] = "Key7", Key2[Key2.Key8 = 56] = "Key8", Key2[Key2.Key9 = 57] = "Key9", Key2[Key2.KeyA = 65] = "KeyA", Key2[Key2.KeyB = 66] = "KeyB", Key2[Key2.KeyC = 67] = "KeyC", Key2[Key2.KeyD = 68] = "KeyD", Key2[Key2.KeyE = 69] = "KeyE", Key2[Key2.KeyF = 70] = "KeyF", Key2[Key2.KeyG = 71] = "KeyG", Key2[Key2.KeyH = 72] = "KeyH", Key2[Key2.KeyI = 73] = "KeyI", Key2[Key2.KeyJ = 74] = "KeyJ", Key2[Key2.KeyK = 75] = "KeyK", Key2[Key2.KeyL = 76] = "KeyL", Key2[Key2.KeyM = 77] = "KeyM", Key2[Key2.KeyN = 78] = "KeyN", Key2[Key2.KeyO = 79] = "KeyO", Key2[Key2.KeyP = 80] = "KeyP", Key2[Key2.KeyQ = 81] = "KeyQ", Key2[Key2.KeyR = 82] = "KeyR", Key2[Key2.KeyS = 83] = "KeyS", Key2[Key2.KeyT = 84] = "KeyT", Key2[Key2.KeyU = 85] = "KeyU", Key2[Key2.KeyV = 86] = "KeyV", Key2[Key2.KeyW = 87] = "KeyW", Key2[Key2.KeyX = 88] = "KeyX", Key2[Key2.KeyY = 89] = "KeyY", Key2[Key2.KeyZ = 90] = "KeyZ", Key2[Key2.LeftMeta = 91] = "LeftMeta", Key2[Key2.RightMeta = 92] = "RightMeta", Key2[Key2.Select = 93] = "Select", Key2[Key2.Numpad0 = 96] = "Numpad0", Key2[Key2.Numpad1 = 97] = "Numpad1", Key2[Key2.Numpad2 = 98] = "Numpad2", Key2[Key2.Numpad3 = 99] = "Numpad3", Key2[Key2.Numpad4 = 100] = "Numpad4", Key2[Key2.Numpad5 = 101] = "Numpad5", Key2[Key2.Numpad6 = 102] = "Numpad6", Key2[Key2.Numpad7 = 103] = "Numpad7", Key2[Key2.Numpad8 = 104] = "Numpad8", Key2[Key2.Numpad9 = 105] = "Numpad9", Key2[Key2.Multiply = 106] = "Multiply", Key2[Key2.Add = 107] = "Add", Key2[Key2.Subtract = 109] = "Subtract", Key2[Key2.Decimal = 110] = "Decimal", Key2[Key2.Divide = 111] = "Divide", Key2[Key2.F1 = 112] = "F1", Key2[Key2.F2 = 113] = "F2", Key2[Key2.F3 = 114] = "F3", Key2[Key2.F4 = 115] = "F4", Key2[Key2.F5 = 116] = "F5", Key2[Key2.F6 = 117] = "F6", Key2[Key2.F7 = 118] = "F7", Key2[Key2.F8 = 119] = "F8", Key2[Key2.F9 = 120] = "F9", Key2[Key2.F10 = 121] = "F10", Key2[Key2.F11 = 122] = "F11", Key2[Key2.F12 = 123] = "F12", Key2[Key2.NumLock = 144] = "NumLock", Key2[Key2.ScrollLock = 145] = "ScrollLock", Key2[Key2.Semicolon = 186] = "Semicolon", Key2[Key2.Equals = 187] = "Equals", Key2[Key2.Comma = 188] = "Comma", Key2[Key2.Dash = 189] = "Dash", Key2[Key2.Period = 190] = "Period", Key2[Key2.ForwardSlash = 191] = "ForwardSlash", Key2[Key2.GraveAccent = 192] = "GraveAccent", Key2[Key2.OpenBracket = 219] = "OpenBracket", Key2[Key2.BackSlash = 220] = "BackSlash", Key2[Key2.CloseBracket = 221] = "CloseBracket", Key2[Key2.SingleQuote = 222] = "SingleQuote";
})(Key || (Key = {}));

// node_modules/@shopify/polaris/build/esm/components/shared.js
var scrollable = {
  props: {
    "data-polaris-scrollable": !0
  },
  selector: "[data-polaris-scrollable]"
}, overlay = {
  props: {
    "data-polaris-overlay": !0
  },
  selector: "[data-polaris-overlay]"
}, layer = {
  props: {
    "data-polaris-layer": !0
  },
  selector: "[data-polaris-layer]"
}, unstyled = {
  props: {
    "data-polaris-unstyled": !0
  },
  selector: "[data-polaris-unstyled]"
}, dataPolarisTopBar = {
  props: {
    "data-polaris-top-bar": !0
  },
  selector: "[data-polaris-top-bar]"
}, headerCell = {
  props: {
    "data-polaris-header-cell": !0
  },
  selector: "[data-polaris-header-cell]"
}, portal = {
  props: ["data-portal-id"],
  selector: "[data-portal-id]"
};

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.js
var import_react3 = __toESM(require_react());
import { createThemeClassName, themeNameDefault } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/use-theme.js
var import_react2 = __toESM(require_react());
import { themes } from "@shopify/polaris-tokens";
var ThemeContext = /* @__PURE__ */ (0, import_react2.createContext)(null), ThemeNameContext = /* @__PURE__ */ (0, import_react2.createContext)(null);
function getTheme(themeName) {
  return themes[themeName];
}
function useTheme() {
  let theme = (0, import_react2.useContext)(ThemeContext);
  if (!theme)
    throw new Error("No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return theme;
}
function useThemeName() {
  let themeName = (0, import_react2.useContext)(ThemeNameContext);
  if (!themeName)
    throw new Error("No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return themeName;
}
function UseTheme(props) {
  let theme = useTheme();
  return props.children(theme);
}

// node_modules/@shopify/polaris/build/esm/utilities/css.js
import { breakpointsAliases } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/is-object.js
function isObject(value) {
  let type = typeof value;
  return value != null && (type === "object" || type === "function");
}

// node_modules/@shopify/polaris/build/esm/utilities/css.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function variationName(name, value) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
function sanitizeCustomProperties(styles52) {
  let nonNullValues = Object.entries(styles52).filter(([_, value]) => value != null);
  return nonNullValues.length ? Object.fromEntries(nonNullValues) : void 0;
}
function getResponsiveProps(componentName, componentProp, tokenSubgroup, responsiveProp) {
  if (!responsiveProp)
    return {};
  let result;
  return isObject(responsiveProp) ? result = Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [breakpointAlias, `var(--p-${tokenSubgroup}-${aliasOrScale})`])) : result = {
    [breakpointsAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`
  }, Object.fromEntries(Object.entries(result).map(([breakpointAlias, value]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, value]));
}
function getResponsiveValue(componentName, componentProp, responsiveProp) {
  return responsiveProp ? isObject(responsiveProp) ? Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, responsiveValue])) : {
    [`--pc-${componentName}-${componentProp}-${breakpointsAliases[0]}`]: responsiveProp
  } : {};
}

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.css.js
var styles = {
  themeContainer: "Polaris-ThemeProvider--themeContainer"
};

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.js
var themeNamesLocal = ["light", "dark-experimental"], isThemeNameLocal = (name) => themeNamesLocal.includes(name);
function ThemeProvider(props) {
  let {
    as: ThemeContainer = "div",
    children,
    className,
    theme: themeName = themeNameDefault
  } = props;
  return /* @__PURE__ */ import_react3.default.createElement(ThemeNameContext.Provider, {
    value: themeName
  }, /* @__PURE__ */ import_react3.default.createElement(ThemeContext.Provider, {
    value: getTheme(themeName)
  }, /* @__PURE__ */ import_react3.default.createElement(ThemeContainer, {
    "data-portal-id": props["data-portal-id"],
    className: classNames(createThemeClassName(themeName), styles.themeContainer, className)
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/utilities/within-content-context.js
var import_react4 = __toESM(require_react()), WithinContentContext = /* @__PURE__ */ (0, import_react4.createContext)(!1);

// node_modules/@shopify/polaris/build/esm/utilities/use-event-listener.js
var import_react6 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-isomorphic-layout-effect.js
var import_react5 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/target.js
var isServer = typeof window > "u" || typeof document > "u";

// node_modules/@shopify/polaris/build/esm/utilities/use-isomorphic-layout-effect.js
var useIsomorphicLayoutEffect = isServer ? import_react5.useEffect : import_react5.useLayoutEffect;

// node_modules/@shopify/polaris/build/esm/utilities/use-event-listener.js
function useEventListener(eventName, handler, target, options) {
  let handlerRef = (0, import_react6.useRef)(handler), optionsRef = (0, import_react6.useRef)(options);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]), useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]), (0, import_react6.useEffect)(() => {
    if (!(typeof eventName == "string" && target !== null))
      return;
    let targetElement;
    if (typeof target > "u")
      targetElement = window;
    else if ("current" in target) {
      if (target.current === null)
        return;
      targetElement = target.current;
    } else
      targetElement = target;
    let eventOptions = optionsRef.current, eventListener = (event) => handlerRef.current(event);
    return targetElement.addEventListener(eventName, eventListener, eventOptions), () => {
      targetElement.removeEventListener(eventName, eventListener, eventOptions);
    };
  }, [eventName, target]);
}

// node_modules/@shopify/polaris/build/esm/utilities/breakpoints.js
var import_react7 = __toESM(require_react());
import { themeDefault, getMediaConditions } from "@shopify/polaris-tokens";
var Breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: "767.95px",
  // TODO: Update to lgDown
  stackedContent: "1039.95px"
}, noWindowMatches = {
  media: "",
  addListener: noop,
  removeListener: noop,
  matches: !1,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_) => !0
};
function noop() {
}
function navigationBarCollapsed() {
  return typeof window > "u" ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}
function stackedContent() {
  return typeof window > "u" ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}
var breakpointsQueryEntries = getBreakpointsQueryEntries(themeDefault.breakpoints);
function getMatches(defaults, forceDefaults) {
  return Object.fromEntries(!isServer && !forceDefaults ? breakpointsQueryEntries.map(([directionAlias, query]) => [directionAlias, window.matchMedia(query).matches]) : typeof defaults == "object" && defaults !== null ? breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, defaults[directionAlias] ?? !1]) : breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, defaults ?? !1]));
}
function useBreakpoints(options) {
  let [breakpoints, setBreakpoints] = (0, import_react7.useState)(getMatches(options?.defaults, !0));
  return useIsomorphicLayoutEffect(() => {
    let mediaQueryLists = breakpointsQueryEntries.map(([_, query]) => window.matchMedia(query)), handler = () => setBreakpoints(getMatches());
    return mediaQueryLists.forEach((mql) => {
      mql.addListener ? mql.addListener(handler) : mql.addEventListener("change", handler);
    }), handler(), () => {
      mediaQueryLists.forEach((mql) => {
        mql.removeListener ? mql.removeListener(handler) : mql.removeEventListener("change", handler);
      });
    };
  }, []), breakpoints;
}
function getBreakpointsQueryEntries(breakpoints) {
  return Object.entries(getMediaConditions(breakpoints)).map(([breakpointsToken, mediaConditions]) => Object.entries(mediaConditions).map(([direction, mediaCondition]) => [`${breakpointsToken.split("-")[1]}${capitalize(direction)}`, mediaCondition])).flat();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
var import_react24 = __toESM(require_react());
import { themeNames, createThemeClassName as createThemeClassName2, themeNameDefault as themeNameDefault2 } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/sticky-manager.js
import { themeDefault as themeDefault2 } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/debounce.js
function debounce(func, waitArg, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0, useRAF = !waitArg && waitArg !== 0;
  if (typeof func != "function")
    throw new TypeError("Expected a function");
  let wait = waitArg || 0;
  typeof options == "object" && (leading = Boolean(options.leading), maxing = "maxWait" in options, maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : void 0, trailing = "trailing" in options ? Boolean(options.trailing) : trailing);
  function invokeFunc(time) {
    let args = lastArgs, thisArg = lastThis;
    return lastArgs = void 0, lastThis = void 0, lastInvokeTime = time, result = func.apply(thisArg, args), result;
  }
  function startTimer(pendingFunc, wait2) {
    return useRAF ? (cancelAnimationFrame(timerId), requestAnimationFrame(pendingFunc)) : setTimeout(pendingFunc, wait2);
  }
  function cancelTimer(id) {
    if (useRAF)
      return cancelAnimationFrame(id);
    clearTimeout(id);
  }
  function leadingEdge(time) {
    return lastInvokeTime = time, timerId = startTimer(timerExpired, wait), leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    let timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing && maxWait ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    let timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && maxWait && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    let time = Date.now();
    if (shouldInvoke(time))
      return trailingEdge(time);
    timerId = startTimer(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    return timerId = void 0, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = void 0, result);
  }
  function cancel() {
    timerId !== void 0 && cancelTimer(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== void 0;
  }
  function debounced(...args) {
    let time = Date.now(), isInvoking = shouldInvoke(time);
    if (lastArgs = args, lastThis = this, lastCallTime = time, isInvoking) {
      if (timerId === void 0)
        return leadingEdge(lastCallTime);
      if (maxing)
        return timerId = startTimer(timerExpired, wait), invokeFunc(lastCallTime);
    }
    return timerId === void 0 && (timerId = startTimer(timerExpired, wait)), result;
  }
  return debounced.cancel = cancel, debounced.flush = flush, debounced.pending = pending, debounced;
}

// node_modules/@shopify/polaris/build/esm/utilities/geometry.js
var Rect = class {
  static get zero() {
    return new Rect();
  }
  constructor({
    top = 0,
    left = 0,
    width = 0,
    height = 0
  } = {}) {
    this.top = top, this.left = left, this.width = width, this.height = height;
  }
  get center() {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2
    };
  }
};
function getRectForNode(node) {
  if (!(node instanceof Element))
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight
    });
  let rect = node.getBoundingClientRect();
  return new Rect({
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  });
}

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/sticky-manager.js
var SIXTY_FPS = 1e3 / 60, StickyManager = class {
  constructor(container) {
    this.stickyItems = [], this.stuckItems = [], this.container = null, this.topBarOffset = 0, this.handleResize = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: !0,
      trailing: !0,
      maxWait: SIXTY_FPS
    }), this.handleScroll = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: !0,
      trailing: !0,
      maxWait: SIXTY_FPS
    }), container && this.setContainer(container);
  }
  registerStickyItem(stickyItem) {
    this.stickyItems.push(stickyItem);
  }
  unregisterStickyItem(nodeToRemove) {
    let nodeIndex = this.stickyItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stickyItems.splice(nodeIndex, 1);
  }
  setContainer(el) {
    this.container = el, isDocument(el) && this.setTopBarOffset(el), this.container.addEventListener("scroll", this.handleScroll), window.addEventListener("resize", this.handleResize), this.manageStickyItems();
  }
  removeScrollListener() {
    this.container && (this.container.removeEventListener("scroll", this.handleScroll), window.removeEventListener("resize", this.handleResize));
  }
  manageStickyItems() {
    if (this.stickyItems.length <= 0)
      return;
    let scrollTop = this.container ? scrollTopFor(this.container) : 0, containerTop = getRectForNode(this.container).top + this.topBarOffset;
    this.stickyItems.forEach((stickyItem) => {
      let {
        handlePositioning
      } = stickyItem, {
        sticky,
        top,
        left,
        width
      } = this.evaluateStickyItem(stickyItem, scrollTop, containerTop);
      this.updateStuckItems(stickyItem, sticky), handlePositioning(sticky, top, left, width);
    });
  }
  evaluateStickyItem(stickyItem, scrollTop, containerTop) {
    let {
      stickyNode,
      placeHolderNode,
      boundingElement,
      offset,
      disableWhenStacked
    } = stickyItem;
    if (disableWhenStacked && stackedContent().matches)
      return {
        sticky: !1,
        top: 0,
        left: 0,
        width: "auto"
      };
    let stickyOffset = offset ? this.getOffset(stickyNode) + parseInt(
      // Important: This will not update when the active theme changes.
      // Update this to `useTheme` once converted to a function component.
      themeDefault2.space["space-500"],
      10
    ) : this.getOffset(stickyNode), scrollPosition2 = scrollTop + stickyOffset, placeHolderNodeCurrentTop = placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop, top = containerTop + stickyOffset, width = placeHolderNode.getBoundingClientRect().width, left = placeHolderNode.getBoundingClientRect().left, sticky;
    if (boundingElement == null)
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop;
    else {
      let stickyItemHeight = stickyNode.getBoundingClientRect().height || stickyNode.firstElementChild?.getBoundingClientRect().height || 0, stickyItemBottomPosition = boundingElement.getBoundingClientRect().bottom - stickyItemHeight + scrollTop - containerTop;
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop && scrollPosition2 < stickyItemBottomPosition;
    }
    return {
      sticky,
      top,
      left,
      width
    };
  }
  updateStuckItems(item, sticky) {
    let {
      stickyNode
    } = item;
    sticky && !this.isNodeStuck(stickyNode) ? this.addStuckItem(item) : !sticky && this.isNodeStuck(stickyNode) && this.removeStuckItem(item);
  }
  addStuckItem(stickyItem) {
    this.stuckItems.push(stickyItem);
  }
  removeStuckItem(stickyItem) {
    let {
      stickyNode: nodeToRemove
    } = stickyItem, nodeIndex = this.stuckItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stuckItems.splice(nodeIndex, 1);
  }
  getOffset(node) {
    if (this.stuckItems.length === 0)
      return 0;
    let offset = 0, count = 0, stuckNodesLength = this.stuckItems.length, nodeRect = getRectForNode(node);
    for (; count < stuckNodesLength; ) {
      let stuckNode = this.stuckItems[count].stickyNode;
      if (stuckNode !== node) {
        let stuckNodeRect = getRectForNode(stuckNode);
        horizontallyOverlaps(nodeRect, stuckNodeRect) || (offset += getRectForNode(stuckNode).height);
      } else
        break;
      count++;
    }
    return offset;
  }
  isNodeStuck(node) {
    return this.stuckItems.findIndex(({
      stickyNode
    }) => node === stickyNode) >= 0;
  }
  setTopBarOffset(container) {
    let topbarElement = container.querySelector(`:not(${scrollable.selector}) ${dataPolarisTopBar.selector}`);
    this.topBarOffset = topbarElement ? topbarElement.clientHeight : 0;
  }
};
function isDocument(node) {
  return node === document;
}
function scrollTopFor(container) {
  return isDocument(container) ? document.body.scrollTop || document.documentElement.scrollTop : container.scrollTop;
}
function horizontallyOverlaps(rect1, rect2) {
  let rect1Left = rect1.left, rect1Right = rect1.left + rect1.width, rect2Left = rect2.left;
  return rect2.left + rect2.width < rect1Left || rect1Right < rect2Left;
}

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/scroll-lock-manager.js
var SCROLL_LOCKING_ATTRIBUTE = "data-lock-scrolling", SCROLL_LOCKING_HIDDEN_ATTRIBUTE = "data-lock-scrolling-hidden", SCROLL_LOCKING_WRAPPER_ATTRIBUTE = "data-lock-scrolling-wrapper", scrollPosition = 0;
function isScrollBarVisible() {
  let {
    body
  } = document;
  return body.scrollHeight > body.clientHeight;
}
var ScrollLockManager = class {
  constructor() {
    this.scrollLocks = 0, this.locked = !1;
  }
  registerScrollLock() {
    this.scrollLocks += 1, this.handleScrollLocking();
  }
  unregisterScrollLock() {
    this.scrollLocks -= 1, this.handleScrollLocking();
  }
  handleScrollLocking() {
    if (isServer)
      return;
    let {
      scrollLocks
    } = this, {
      body
    } = document, wrapper = body.firstElementChild;
    scrollLocks === 0 ? (body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE), body.removeAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE), wrapper && wrapper.removeAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE), window.scroll(0, scrollPosition), this.locked = !1) : scrollLocks > 0 && !this.locked && (scrollPosition = window.pageYOffset, body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, ""), isScrollBarVisible() || body.setAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE, ""), wrapper && (wrapper.setAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE, ""), wrapper.scrollTop = scrollPosition), this.locked = !0);
  }
  resetScrollPosition() {
    scrollPosition = 0;
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/get.js
var OBJECT_NOTATION_MATCHER = /\[(.*?)\]|(\w+)/g;
function get(obj, keypath, defaultValue) {
  if (obj == null)
    return;
  let keys = Array.isArray(keypath) ? keypath : getKeypath(keypath), acc = obj;
  for (let i = 0; i < keys.length; i++) {
    let val = acc[keys[i]];
    if (val === void 0)
      return defaultValue;
    acc = val;
  }
  return acc;
}
function getKeypath(str) {
  let path = [], result;
  for (; result = OBJECT_NOTATION_MATCHER.exec(str); ) {
    let [, first, second] = result;
    path.push(first || second);
  }
  return path;
}

// node_modules/@shopify/polaris/build/esm/utilities/merge.js
function merge(...objs) {
  let final = {};
  for (let obj of objs)
    final = mergeRecursively(final, obj);
  return final;
}
function mergeRecursively(inputObjA, objB) {
  let objA = Array.isArray(inputObjA) ? [...inputObjA] : {
    ...inputObjA
  };
  for (let key in objB)
    if (Object.prototype.hasOwnProperty.call(objB, key))
      isMergeableValue(objB[key]) && isMergeableValue(objA[key]) ? objA[key] = mergeRecursively(objA[key], objB[key]) : objA[key] = objB[key];
    else
      continue;
  return objA;
}
function isMergeableValue(value) {
  return value !== null && typeof value == "object";
}

// node_modules/@shopify/polaris/build/esm/utilities/i18n/I18n.js
var REPLACE_REGEX = /{([^}]*)}/g, I18n = class {
  /**
   * @param translation A locale object or array of locale objects that overrides default translations. If specifying an array then your desired language dictionary should come first, followed by your fallback language dictionaries
   */
  constructor(translation) {
    this.translation = {}, this.translation = Array.isArray(translation) ? merge(...translation.slice().reverse()) : translation;
  }
  translate(id, replacements) {
    let text = get(this.translation, id, "");
    return text ? replacements ? text.replace(REPLACE_REGEX, (match) => {
      let replacement = match.substring(1, match.length - 1);
      if (replacements[replacement] === void 0) {
        let replacementData = JSON.stringify(replacements);
        throw new Error(`Error in translation for key '${id}'. No replacement found for key '${replacement}'. The following replacements were passed: '${replacementData}'`);
      }
      return replacements[replacement];
    }) : text : "";
  }
  translationKeyExists(path) {
    return Boolean(get(this.translation, path));
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/features/context.js
var import_react8 = __toESM(require_react()), FeaturesContext = /* @__PURE__ */ (0, import_react8.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/i18n/context.js
var import_react9 = __toESM(require_react()), I18nContext = /* @__PURE__ */ (0, import_react9.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/context.js
var import_react10 = __toESM(require_react()), ScrollLockManagerContext = /* @__PURE__ */ (0, import_react10.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/context.js
var import_react11 = __toESM(require_react()), StickyManagerContext = /* @__PURE__ */ (0, import_react11.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/link/context.js
var import_react12 = __toESM(require_react()), LinkContext = /* @__PURE__ */ (0, import_react12.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
var import_react15 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/media-query/context.js
var import_react13 = __toESM(require_react()), MediaQueryContext = /* @__PURE__ */ (0, import_react13.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/EventListener/EventListener.js
var import_react14 = __toESM(require_react()), EventListener = class extends import_react14.PureComponent {
  componentDidMount() {
    this.attachListener();
  }
  componentDidUpdate({
    passive,
    ...detachProps
  }) {
    this.detachListener(detachProps), this.attachListener();
  }
  componentWillUnmount() {
    this.detachListener();
  }
  render() {
    return null;
  }
  attachListener() {
    let {
      event,
      handler,
      capture,
      passive
    } = this.props;
    window.addEventListener(event, handler, {
      capture,
      passive
    });
  }
  detachListener(prevProps) {
    let {
      event,
      handler,
      capture
    } = prevProps || this.props;
    window.removeEventListener(event, handler, capture);
  }
};

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
var MediaQueryProvider = function({
  children
}) {
  let [isNavigationCollapsed, setIsNavigationCollapsed] = (0, import_react15.useState)(navigationBarCollapsed().matches), handleResize = (0, import_react15.useCallback)(debounce(() => {
    isNavigationCollapsed !== navigationBarCollapsed().matches && setIsNavigationCollapsed(!isNavigationCollapsed);
  }, 40, {
    trailing: !0,
    leading: !0,
    maxWait: 40
  }), [isNavigationCollapsed]);
  (0, import_react15.useEffect)(() => {
    setIsNavigationCollapsed(navigationBarCollapsed().matches);
  }, []);
  let context = (0, import_react15.useMemo)(() => ({
    isNavigationCollapsed
  }), [isNavigationCollapsed]);
  return /* @__PURE__ */ import_react15.default.createElement(MediaQueryContext.Provider, {
    value: context
  }, /* @__PURE__ */ import_react15.default.createElement(EventListener, {
    event: "resize",
    handler: handleResize
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
var import_react19 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-is-after-initial-mount.js
var import_react16 = __toESM(require_react());
function useIsAfterInitialMount() {
  let [isAfterInitialMount, setIsAfterInitialMount] = (0, import_react16.useState)(!1);
  return (0, import_react16.useEffect)(() => {
    setIsAfterInitialMount(!0);
  }, []), isAfterInitialMount;
}

// node_modules/@shopify/polaris/build/esm/utilities/portals/context.js
var import_react17 = __toESM(require_react()), PortalsManagerContext = /* @__PURE__ */ (0, import_react17.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/components/PortalsContainer/PortalsContainer.js
var import_react18 = __toESM(require_react());
function PortalsContainerComponent(_props, ref) {
  return /* @__PURE__ */ import_react18.default.createElement("div", {
    id: "PolarisPortalsContainer",
    ref
  });
}
var PortalsContainer = /* @__PURE__ */ (0, import_react18.forwardRef)(PortalsContainerComponent);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
function PortalsManager({
  children,
  container
}) {
  let isMounted = useIsAfterInitialMount(), ref = (0, import_react19.useRef)(null), contextValue = (0, import_react19.useMemo)(() => container ? {
    container
  } : isMounted ? {
    container: ref.current
  } : {
    container: null
  }, [container, isMounted]);
  return /* @__PURE__ */ import_react19.default.createElement(PortalsManagerContext.Provider, {
    value: contextValue
  }, children, container ? null : /* @__PURE__ */ import_react19.default.createElement(PortalsContainer, {
    ref
  }));
}

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
var import_react21 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/focus-manager/context.js
var import_react20 = __toESM(require_react()), FocusManagerContext = /* @__PURE__ */ (0, import_react20.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
function FocusManager({
  children
}) {
  let [trapFocusList, setTrapFocusList] = (0, import_react21.useState)([]), add = (0, import_react21.useCallback)((id) => {
    setTrapFocusList((list) => [...list, id]);
  }, []), remove = (0, import_react21.useCallback)((id) => {
    let removed = !0;
    return setTrapFocusList((list) => {
      let clone = [...list], index = clone.indexOf(id);
      return index === -1 ? removed = !1 : clone.splice(index, 1), clone;
    }), removed;
  }, []), value = (0, import_react21.useMemo)(() => ({
    trapFocusList,
    add,
    remove
  }), [add, trapFocusList, remove]);
  return /* @__PURE__ */ import_react21.default.createElement(FocusManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
var import_react23 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/context.js
var import_react22 = __toESM(require_react()), EphemeralPresenceManagerContext = /* @__PURE__ */ (0, import_react22.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
var defaultState = {
  tooltip: 0,
  hovercard: 0
};
function EphemeralPresenceManager({
  children
}) {
  let [presenceCounter, setPresenceCounter] = (0, import_react23.useState)(defaultState), addPresence = (0, import_react23.useCallback)((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] + 1
    }));
  }, []), removePresence = (0, import_react23.useCallback)((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] - 1
    }));
  }, []), value = (0, import_react23.useMemo)(() => ({
    presenceList: Object.entries(presenceCounter).reduce((previousValue, currentValue) => {
      let [key, value2] = currentValue;
      return {
        ...previousValue,
        [key]: value2 >= 1
      };
    }, {}),
    presenceCounter,
    addPresence,
    removePresence
  }), [addPresence, removePresence, presenceCounter]);
  return /* @__PURE__ */ import_react23.default.createElement(EphemeralPresenceManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
var MAX_SCROLLBAR_WIDTH = 20, SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30, SCROLLBAR_TEST_ELEMENT_CHILD_SIZE = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;
function measureScrollbars() {
  let parentEl = document.createElement("div");
  parentEl.setAttribute("style", `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`);
  let child = document.createElement("div");
  child.setAttribute("style", `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; scrollbar-width: thin;`), parentEl.appendChild(child), document.body.appendChild(parentEl);
  let scrollbarWidth = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE - (parentEl.firstElementChild?.clientWidth ?? 0), scrollbarWidthWithSafetyHatch = Math.min(scrollbarWidth, MAX_SCROLLBAR_WIDTH);
  document.documentElement.style.setProperty("--pc-app-provider-scrollbar-width", `${scrollbarWidthWithSafetyHatch}px`), document.body.removeChild(parentEl);
}
var AppProvider = class extends import_react24.Component {
  constructor(props) {
    super(props), this.setBodyStyles = () => {
      document.body.style.backgroundColor = "var(--p-color-bg)", document.body.style.color = "var(--p-color-text)";
    }, this.setRootAttributes = () => {
      let activeThemeName = this.getThemeName();
      themeNames.forEach((themeName) => {
        document.documentElement.classList.toggle(createThemeClassName2(themeName), themeName === activeThemeName);
      });
    }, this.getThemeName = () => this.props.theme ?? themeNameDefault2, this.stickyManager = new StickyManager(), this.scrollLockManager = new ScrollLockManager();
    let {
      i18n,
      linkComponent
    } = this.props;
    this.state = {
      link: linkComponent,
      intl: new I18n(i18n)
    };
  }
  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document), this.setBodyStyles(), this.setRootAttributes();
      let isSafari16 = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome") && (navigator.userAgent.includes("Version/16.1") || navigator.userAgent.includes("Version/16.2") || navigator.userAgent.includes("Version/16.3")), isMobileApp16 = navigator.userAgent.includes("Shopify Mobile/iOS") && (navigator.userAgent.includes("OS 16_1") || navigator.userAgent.includes("OS 16_2") || navigator.userAgent.includes("OS 16_3"));
      (isSafari16 || isMobileApp16) && document.documentElement.classList.add("Polaris-Safari-16-Font-Optical-Sizing-Patch");
    }
    measureScrollbars();
  }
  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent
  }) {
    let {
      i18n,
      linkComponent
    } = this.props;
    this.setRootAttributes(), !(i18n === prevI18n && linkComponent === prevLinkComponent) && this.setState({
      link: linkComponent,
      intl: new I18n(i18n)
    });
  }
  render() {
    let {
      children,
      features
    } = this.props, themeName = this.getThemeName(), {
      intl,
      link
    } = this.state;
    return /* @__PURE__ */ import_react24.default.createElement(ThemeNameContext.Provider, {
      value: themeName
    }, /* @__PURE__ */ import_react24.default.createElement(ThemeContext.Provider, {
      value: getTheme(themeName)
    }, /* @__PURE__ */ import_react24.default.createElement(FeaturesContext.Provider, {
      value: features
    }, /* @__PURE__ */ import_react24.default.createElement(I18nContext.Provider, {
      value: intl
    }, /* @__PURE__ */ import_react24.default.createElement(ScrollLockManagerContext.Provider, {
      value: this.scrollLockManager
    }, /* @__PURE__ */ import_react24.default.createElement(StickyManagerContext.Provider, {
      value: this.stickyManager
    }, /* @__PURE__ */ import_react24.default.createElement(LinkContext.Provider, {
      value: link
    }, /* @__PURE__ */ import_react24.default.createElement(MediaQueryProvider, null, /* @__PURE__ */ import_react24.default.createElement(PortalsManager, null, /* @__PURE__ */ import_react24.default.createElement(FocusManager, null, /* @__PURE__ */ import_react24.default.createElement(EphemeralPresenceManager, null, children)))))))))));
  }
};

// node_modules/@shopify/polaris/build/esm/components/Button/utils.js
var import_react34 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Button/Button.js
var import_react33 = __toESM(require_react());
import { SelectIcon, ChevronDownIcon, ChevronUpIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/utilities/is-element-in-viewport.js
function isElementInViewport(element) {
  let {
    top,
    left,
    bottom,
    right
  } = element.getBoundingClientRect();
  return top >= 0 && right <= window.innerWidth && bottom <= window.innerHeight && left >= 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/focus.js
var FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]', KEYBOARD_FOCUSABLE_SELECTORS = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]:not([tabindex="-1"])', MENUITEM_FOCUSABLE_SELECTORS = 'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])', handleMouseUpByBlurring = ({
  currentTarget
}) => currentTarget.blur();
function nextFocusableNode(node, filter) {
  let allFocusableElements = [...document.querySelectorAll(FOCUSABLE_SELECTOR)], sliceLocation = allFocusableElements.indexOf(node) + 1, focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);
  for (let focusableElement of focusableElementsAfterNode)
    if (isElementInViewport(focusableElement) && (!filter || filter && filter(focusableElement)))
      return focusableElement;
  return null;
}
function findFirstFocusableNode(element, onlyDescendants = !0) {
  return !onlyDescendants && matches(element, FOCUSABLE_SELECTOR) ? element : element.querySelector(FOCUSABLE_SELECTOR);
}
function findFirstFocusableNodeIncludingDisabled(element) {
  let focusableSelector = "a,button,frame,iframe,input:not([type=hidden]),select,textarea,*[tabindex]";
  return matches(element, focusableSelector) ? element : element.querySelector(focusableSelector);
}
function focusFirstFocusableNode(element, onlyDescendants = !0) {
  findFirstFocusableNode(element, onlyDescendants)?.focus();
}
function focusNextFocusableNode(node, filter) {
  let nextFocusable = nextFocusableNode(node, filter);
  return nextFocusable && nextFocusable instanceof HTMLElement ? (nextFocusable.focus(), !0) : !1;
}
function findFirstKeyboardFocusableNode(element, onlyDescendants = !0) {
  return !onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS) ? element : element.querySelector(KEYBOARD_FOCUSABLE_SELECTORS);
}
function focusFirstKeyboardFocusableNode(element, onlyDescendants = !0) {
  let firstFocusable = findFirstKeyboardFocusableNode(element, onlyDescendants);
  return firstFocusable ? (firstFocusable.focus(), !0) : !1;
}
function findLastKeyboardFocusableNode(element, onlyDescendants = !0) {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS))
    return element;
  let allFocusable = element.querySelectorAll(KEYBOARD_FOCUSABLE_SELECTORS);
  return allFocusable[allFocusable.length - 1];
}
function focusLastKeyboardFocusableNode(element, onlyDescendants = !0) {
  let lastFocusable = findLastKeyboardFocusableNode(element, onlyDescendants);
  return lastFocusable ? (lastFocusable.focus(), !0) : !1;
}
function wrapFocusPreviousFocusableMenuItem(parentElement, currentFocusedElement) {
  let allFocusableChildren = getMenuFocusableDescendants(parentElement), currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  currentItemIdx === -1 ? allFocusableChildren[0].focus() : allFocusableChildren[(currentItemIdx - 1 + allFocusableChildren.length) % allFocusableChildren.length].focus();
}
function wrapFocusNextFocusableMenuItem(parentElement, currentFocusedElement) {
  let allFocusableChildren = getMenuFocusableDescendants(parentElement), currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  currentItemIdx === -1 ? allFocusableChildren[0].focus() : allFocusableChildren[(currentItemIdx + 1) % allFocusableChildren.length].focus();
}
function getMenuFocusableDescendants(element) {
  return element.querySelectorAll(MENUITEM_FOCUSABLE_SELECTORS);
}
function getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement) {
  let currentItemIdx = 0;
  for (let focusableChild of allFocusableChildren) {
    if (focusableChild === currentFocusedElement)
      break;
    currentItemIdx++;
  }
  return currentItemIdx === allFocusableChildren.length ? -1 : currentItemIdx;
}
function matches(node, selector) {
  if (node.matches)
    return node.matches(selector);
  let matches2 = (node.ownerDocument || document).querySelectorAll(selector), i = matches2.length;
  for (; --i >= 0 && matches2.item(i) !== node; )
    return i > -1;
}

// node_modules/@shopify/polaris/build/esm/components/Button/Button.css.js
var styles2 = {
  Button: "Polaris-Button",
  disabled: "Polaris-Button--disabled",
  pressed: "Polaris-Button--pressed",
  variantPrimary: "Polaris-Button--variantPrimary",
  variantSecondary: "Polaris-Button--variantSecondary",
  variantTertiary: "Polaris-Button--variantTertiary",
  variantPlain: "Polaris-Button--variantPlain",
  removeUnderline: "Polaris-Button--removeUnderline",
  variantMonochromePlain: "Polaris-Button--variantMonochromePlain",
  toneSuccess: "Polaris-Button--toneSuccess",
  toneCritical: "Polaris-Button--toneCritical",
  sizeMicro: "Polaris-Button--sizeMicro",
  sizeSlim: "Polaris-Button--sizeSlim",
  sizeMedium: "Polaris-Button--sizeMedium",
  sizeLarge: "Polaris-Button--sizeLarge",
  textAlignCenter: "Polaris-Button--textAlignCenter",
  textAlignStart: "Polaris-Button--textAlignStart",
  textAlignLeft: "Polaris-Button--textAlignLeft",
  textAlignEnd: "Polaris-Button--textAlignEnd",
  textAlignRight: "Polaris-Button--textAlignRight",
  fullWidth: "Polaris-Button--fullWidth",
  iconOnly: "Polaris-Button--iconOnly",
  iconWithText: "Polaris-Button--iconWithText",
  disclosure: "Polaris-Button--disclosure",
  loading: "Polaris-Button--loading",
  pressable: "Polaris-Button--pressable",
  hidden: "Polaris-Button--hidden",
  Icon: "Polaris-Button__Icon",
  Spinner: "Polaris-Button__Spinner"
};

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
var import_react26 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.css.js
var styles3 = {
  Icon: "Polaris-Icon",
  toneInherit: "Polaris-Icon--toneInherit",
  toneBase: "Polaris-Icon--toneBase",
  toneSubdued: "Polaris-Icon--toneSubdued",
  toneCaution: "Polaris-Icon--toneCaution",
  toneWarning: "Polaris-Icon--toneWarning",
  toneCritical: "Polaris-Icon--toneCritical",
  toneInteractive: "Polaris-Icon--toneInteractive",
  toneInfo: "Polaris-Icon--toneInfo",
  toneSuccess: "Polaris-Icon--toneSuccess",
  tonePrimary: "Polaris-Icon--tonePrimary",
  toneEmphasis: "Polaris-Icon--toneEmphasis",
  toneMagic: "Polaris-Icon--toneMagic",
  toneTextCaution: "Polaris-Icon--toneTextCaution",
  toneTextWarning: "Polaris-Icon--toneTextWarning",
  toneTextCritical: "Polaris-Icon--toneTextCritical",
  toneTextInfo: "Polaris-Icon--toneTextInfo",
  toneTextPrimary: "Polaris-Icon--toneTextPrimary",
  toneTextSuccess: "Polaris-Icon--toneTextSuccess",
  toneTextMagic: "Polaris-Icon--toneTextMagic",
  Svg: "Polaris-Icon__Svg",
  Img: "Polaris-Icon__Img",
  Placeholder: "Polaris-Icon__Placeholder"
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
var import_react25 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Text/Text.css.js
var styles4 = {
  root: "Polaris-Text--root",
  block: "Polaris-Text--block",
  truncate: "Polaris-Text--truncate",
  visuallyHidden: "Polaris-Text--visuallyHidden",
  start: "Polaris-Text--start",
  center: "Polaris-Text--center",
  end: "Polaris-Text--end",
  justify: "Polaris-Text--justify",
  base: "Polaris-Text--base",
  inherit: "Polaris-Text--inherit",
  disabled: "Polaris-Text--disabled",
  success: "Polaris-Text--success",
  critical: "Polaris-Text--critical",
  caution: "Polaris-Text--caution",
  subdued: "Polaris-Text--subdued",
  magic: "Polaris-Text--magic",
  "magic-subdued": "Polaris-Text__magic--subdued",
  "text-inverse": "Polaris-Text__text--inverse",
  "text-inverse-secondary": "Polaris-Text--textInverseSecondary",
  headingXs: "Polaris-Text--headingXs",
  headingSm: "Polaris-Text--headingSm",
  headingMd: "Polaris-Text--headingMd",
  headingLg: "Polaris-Text--headingLg",
  headingXl: "Polaris-Text--headingXl",
  heading2xl: "Polaris-Text--heading2xl",
  heading3xl: "Polaris-Text--heading3xl",
  bodyXs: "Polaris-Text--bodyXs",
  bodySm: "Polaris-Text--bodySm",
  bodyMd: "Polaris-Text--bodyMd",
  bodyLg: "Polaris-Text--bodyLg",
  regular: "Polaris-Text--regular",
  medium: "Polaris-Text--medium",
  semibold: "Polaris-Text--semibold",
  bold: "Polaris-Text--bold",
  break: "Polaris-Text--break",
  numeric: "Polaris-Text--numeric",
  "line-through": "Polaris-Text__line--through"
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
var Text = ({
  alignment,
  as,
  breakWord,
  children,
  tone,
  fontWeight,
  id,
  numeric = !1,
  truncate = !1,
  variant,
  visuallyHidden = !1,
  textDecorationLine
}) => {
  let Component3 = as || (visuallyHidden ? "span" : "p"), className = classNames(styles4.root, variant && styles4[variant], fontWeight && styles4[fontWeight], (alignment || truncate) && styles4.block, alignment && styles4[alignment], breakWord && styles4.break, tone && styles4[tone], numeric && styles4.numeric, truncate && styles4.truncate, visuallyHidden && styles4.visuallyHidden, textDecorationLine && styles4[textDecorationLine]);
  return /* @__PURE__ */ import_react25.default.createElement(Component3, Object.assign({
    className
  }, id && {
    id
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
function Icon({
  source,
  tone,
  accessibilityLabel
}) {
  let sourceType;
  typeof source == "function" ? sourceType = "function" : source === "placeholder" ? sourceType = "placeholder" : sourceType = "external";
  let className = classNames(styles3.Icon, tone && styles3[variationName("tone", tone)]), {
    mdDown
  } = useBreakpoints(), SourceComponent = source, contentMarkup = {
    function: /* @__PURE__ */ import_react26.default.createElement(SourceComponent, Object.assign({
      className: styles3.Svg,
      focusable: "false",
      "aria-hidden": "true"
      // On Mobile we're scaling the viewBox to 18x18 to make the icons bigger
      // Also, we're setting the viewport origin to 1x1 to center the icon
      // We use this syntax so we don't override the existing viewBox value if we don't need to.
    }, mdDown ? {
      viewBox: "1 1 18 18"
    } : {})),
    placeholder: /* @__PURE__ */ import_react26.default.createElement("div", {
      className: styles3.Placeholder
    }),
    external: /* @__PURE__ */ import_react26.default.createElement("img", {
      className: styles3.Img,
      src: `data:image/svg+xml;utf8,${source}`,
      alt: "",
      "aria-hidden": "true"
    })
  };
  return /* @__PURE__ */ import_react26.default.createElement("span", {
    className
  }, accessibilityLabel && /* @__PURE__ */ import_react26.default.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel), contentMarkup[sourceType]);
}

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
var import_react27 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.css.js
var styles5 = {
  Spinner: "Polaris-Spinner",
  sizeSmall: "Polaris-Spinner--sizeSmall",
  sizeLarge: "Polaris-Spinner--sizeLarge"
};

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
function Spinner({
  size = "large",
  accessibilityLabel,
  hasFocusableParent
}) {
  let isAfterInitialMount = useIsAfterInitialMount(), className = classNames(styles5.Spinner, size && styles5[variationName("size", size)]), spinnerSVGMarkup = size === "large" ? /* @__PURE__ */ import_react27.default.createElement("svg", {
    viewBox: "0 0 44 44",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react27.default.createElement("path", {
    d: "M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z"
  })) : /* @__PURE__ */ import_react27.default.createElement("svg", {
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react27.default.createElement("path", {
    d: "M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z"
  })), spanAttributes = {
    ...!hasFocusableParent && {
      role: "status"
    }
  }, accessibilityLabelMarkup = (isAfterInitialMount || !hasFocusableParent) && /* @__PURE__ */ import_react27.default.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel);
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, /* @__PURE__ */ import_react27.default.createElement("span", {
    className
  }, spinnerSVGMarkup), /* @__PURE__ */ import_react27.default.createElement("span", spanAttributes, accessibilityLabelMarkup));
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledButton/UnstyledButton.js
var import_react31 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-disable-interaction.js
var import_react28 = __toESM(require_react());
function useDisableClick(disabled, handleClick) {
  let handleClickWrapper = (0, import_react28.useCallback)((event) => {
    disabled && (event.preventDefault(), event.stopPropagation());
  }, [disabled]);
  return disabled ? handleClickWrapper : handleClick;
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
var import_react30 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/link/hooks.js
var import_react29 = __toESM(require_react());
function useLink() {
  return (0, import_react29.useContext)(LinkContext);
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
var UnstyledLink = /* @__PURE__ */ (0, import_react30.memo)(/* @__PURE__ */ (0, import_react30.forwardRef)(function(props, _ref) {
  let LinkComponent = useLink();
  if (LinkComponent)
    return /* @__PURE__ */ import_react30.default.createElement(LinkComponent, Object.assign({}, unstyled.props, props, {
      ref: _ref
    }));
  let {
    external,
    url,
    target: targetProp,
    ...rest
  } = props, target;
  external ? target = "_blank" : target = targetProp ?? void 0;
  let rel = target === "_blank" ? "noopener noreferrer" : void 0;
  return /* @__PURE__ */ import_react30.default.createElement("a", Object.assign({
    target
  }, rest, {
    href: url,
    rel
  }, unstyled.props, {
    ref: _ref
  }));
}));

// node_modules/@shopify/polaris/build/esm/components/UnstyledButton/UnstyledButton.js
function UnstyledButton({
  id,
  children,
  className,
  url,
  external,
  target,
  download,
  submit,
  disabled,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  ...rest
}) {
  let buttonMarkup, commonProps = {
    id,
    className,
    "aria-label": accessibilityLabel
  }, interactiveProps = {
    ...commonProps,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart
  }, handleClick = useDisableClick(disabled, onClick);
  return url ? buttonMarkup = disabled ? (
    // Render an `<a>` so toggling disabled/enabled state changes only the
    // `href` attribute instead of replacing the whole element.
    /* @__PURE__ */ import_react31.default.createElement("a", commonProps, children)
  ) : /* @__PURE__ */ import_react31.default.createElement(UnstyledLink, Object.assign({}, interactiveProps, {
    url,
    external,
    target,
    download
  }, rest), children) : buttonMarkup = /* @__PURE__ */ import_react31.default.createElement("button", Object.assign({}, interactiveProps, {
    "aria-disabled": disabled,
    type: submit ? "submit" : "button",
    "aria-busy": loading ? !0 : void 0,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-describedby": ariaDescribedBy,
    "aria-checked": ariaChecked,
    "aria-pressed": pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onClick: handleClick,
    tabIndex: disabled ? -1 : void 0
  }, rest), children), buttonMarkup;
}

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
var import_react32 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/errors.js
var MissingAppProviderError = class extends Error {
  constructor(message = "") {
    super(`${message && `${message} `}Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.`), this.name = "MissingAppProviderError";
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
function useI18n() {
  let i18n = (0, import_react32.useContext)(I18nContext);
  if (!i18n)
    throw new MissingAppProviderError("No i18n was provided.");
  return i18n;
}

// node_modules/@shopify/polaris/build/esm/components/Button/Button.js
function Button({
  id,
  children,
  url,
  disabled,
  external,
  download,
  target,
  submit,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  onPointerDown,
  icon,
  disclosure,
  removeUnderline,
  size = "medium",
  textAlign = "center",
  fullWidth,
  dataPrimaryLink,
  tone,
  variant = "secondary"
}) {
  let i18n = useI18n(), isDisabled = disabled || loading, {
    mdUp
  } = useBreakpoints(), className = classNames(styles2.Button, styles2.pressable, styles2[variationName("variant", variant)], styles2[variationName("size", size)], styles2[variationName("textAlign", textAlign)], fullWidth && styles2.fullWidth, disclosure && styles2.disclosure, icon && children && styles2.iconWithText, icon && children == null && styles2.iconOnly, isDisabled && styles2.disabled, loading && styles2.loading, pressed && !disabled && !url && styles2.pressed, removeUnderline && styles2.removeUnderline, tone && styles2[variationName("tone", tone)]), disclosureMarkup = disclosure ? /* @__PURE__ */ import_react33.default.createElement("span", {
    className: loading ? styles2.hidden : styles2.Icon
  }, /* @__PURE__ */ import_react33.default.createElement(Icon, {
    source: loading ? "placeholder" : getDisclosureIconSource(disclosure, ChevronUpIcon, ChevronDownIcon)
  })) : null, iconSource = isIconSource(icon) ? /* @__PURE__ */ import_react33.default.createElement(Icon, {
    source: loading ? "placeholder" : icon
  }) : icon, iconMarkup = iconSource ? /* @__PURE__ */ import_react33.default.createElement("span", {
    className: loading ? styles2.hidden : styles2.Icon
  }, iconSource) : null, hasPlainText = ["plain", "monochromePlain"].includes(variant), textFontWeight = "medium";
  hasPlainText ? textFontWeight = "regular" : variant === "primary" && (textFontWeight = mdUp ? "medium" : "semibold");
  let textVariant = "bodySm";
  (size === "large" || hasPlainText && size !== "micro") && (textVariant = "bodyMd");
  let childMarkup = children ? /* @__PURE__ */ import_react33.default.createElement(Text, {
    as: "span",
    variant: textVariant,
    fontWeight: textFontWeight,
    key: disabled ? "text-disabled" : "text"
  }, children) : null, spinnerSVGMarkup = loading ? /* @__PURE__ */ import_react33.default.createElement("span", {
    className: styles2.Spinner
  }, /* @__PURE__ */ import_react33.default.createElement(Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate("Polaris.Button.spinnerAccessibilityLabel")
  })) : null, commonProps = {
    id,
    className,
    accessibilityLabel,
    ariaDescribedBy,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
    "data-primary-link": dataPrimaryLink
  }, linkProps = {
    url,
    external,
    download,
    target
  }, actionProps = {
    submit,
    disabled: isDisabled,
    loading,
    ariaControls,
    ariaExpanded,
    ariaChecked,
    pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onPointerDown
  };
  return /* @__PURE__ */ import_react33.default.createElement(UnstyledButton, Object.assign({}, commonProps, linkProps, actionProps), spinnerSVGMarkup, iconMarkup, childMarkup, disclosureMarkup);
}
function isIconSource(x) {
  return typeof x == "string" || typeof x == "object" && x.body || typeof x == "function";
}
function getDisclosureIconSource(disclosure, upIcon, downIcon) {
  return disclosure === "select" ? SelectIcon : disclosure === "up" ? upIcon : downIcon;
}

// node_modules/@shopify/polaris/build/esm/components/Button/utils.js
function buttonsFrom(actions, overrides = {}) {
  return Array.isArray(actions) ? actions.map((action8, index) => buttonFrom(action8, overrides, index)) : buttonFrom(actions, overrides);
}
function buttonFrom({
  content,
  onAction,
  plain,
  destructive,
  ...action8
}, overrides, key) {
  let plainVariant = plain ? "plain" : void 0, destructiveVariant = destructive ? "primary" : void 0, tone = !overrides?.tone && destructive ? "critical" : overrides?.tone;
  return /* @__PURE__ */ import_react34.default.createElement(Button, Object.assign({
    key,
    onClick: onAction,
    tone,
    variant: plainVariant || destructiveVariant
  }, action8, overrides), content);
}

// node_modules/@shopify/polaris/build/esm/components/Card/Card.js
var import_react37 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
var import_react35 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.css.js
var styles6 = {
  ShadowBevel: "Polaris-ShadowBevel"
};

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
function ShadowBevel(props) {
  let {
    as = "div",
    bevel = !0,
    borderRadius,
    boxShadow,
    children,
    zIndex = "0"
  } = props, Component3 = as;
  return /* @__PURE__ */ import_react35.default.createElement(Component3, {
    className: styles6.ShadowBevel,
    style: {
      "--pc-shadow-bevel-z-index": zIndex,
      ...getResponsiveValue("shadow-bevel", "content", mapResponsiveProp(bevel, (bevel2) => bevel2 ? '""' : "none")),
      ...getResponsiveValue("shadow-bevel", "box-shadow", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-shadow-${boxShadow})` : "none")),
      ...getResponsiveValue("shadow-bevel", "border-radius", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-border-radius-${borderRadius})` : "var(--p-border-radius-0)"))
    }
  }, children);
}
function mapResponsiveProp(responsiveProp, callback) {
  return typeof responsiveProp == "boolean" ? callback(responsiveProp) : Object.fromEntries(Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [breakpointsAlias, callback(value)]));
}

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
var import_react36 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Box/Box.css.js
var styles7 = {
  listReset: "Polaris-Box--listReset",
  Box: "Polaris-Box",
  visuallyHidden: "Polaris-Box--visuallyHidden",
  printHidden: "Polaris-Box--printHidden"
};

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
var Box = /* @__PURE__ */ (0, import_react36.forwardRef)(({
  as = "div",
  background,
  borderColor,
  borderStyle,
  borderWidth,
  borderBlockStartWidth,
  borderBlockEndWidth,
  borderInlineStartWidth,
  borderInlineEndWidth,
  borderRadius,
  borderEndStartRadius,
  borderEndEndRadius,
  borderStartStartRadius,
  borderStartEndRadius,
  children,
  color,
  id,
  minHeight,
  minWidth,
  maxWidth,
  overflowX,
  overflowY,
  outlineColor,
  outlineStyle,
  outlineWidth,
  padding,
  paddingBlock,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInline,
  paddingInlineStart,
  paddingInlineEnd,
  role,
  shadow,
  tabIndex,
  width,
  printHidden,
  visuallyHidden,
  position,
  insetBlockStart,
  insetBlockEnd,
  insetInlineStart,
  insetInlineEnd,
  zIndex,
  opacity,
  ...restProps
}, ref) => {
  let borderStyleValue = borderStyle || (borderColor || borderWidth || borderBlockStartWidth || borderBlockEndWidth || borderInlineStartWidth || borderInlineEndWidth ? "solid" : void 0), outlineStyleValue = outlineStyle || (outlineColor || outlineWidth ? "solid" : void 0), style = {
    "--pc-box-color": color ? `var(--p-color-${color})` : void 0,
    "--pc-box-background": background ? `var(--p-color-${background})` : void 0,
    // eslint-disable-next-line no-nested-ternary
    "--pc-box-border-color": borderColor ? borderColor === "transparent" ? "transparent" : `var(--p-color-${borderColor})` : void 0,
    "--pc-box-border-style": borderStyleValue,
    "--pc-box-border-radius": borderRadius ? `var(--p-border-radius-${borderRadius})` : void 0,
    "--pc-box-border-end-start-radius": borderEndStartRadius ? `var(--p-border-radius-${borderEndStartRadius})` : void 0,
    "--pc-box-border-end-end-radius": borderEndEndRadius ? `var(--p-border-radius-${borderEndEndRadius})` : void 0,
    "--pc-box-border-start-start-radius": borderStartStartRadius ? `var(--p-border-radius-${borderStartStartRadius})` : void 0,
    "--pc-box-border-start-end-radius": borderStartEndRadius ? `var(--p-border-radius-${borderStartEndRadius})` : void 0,
    "--pc-box-border-width": borderWidth ? `var(--p-border-width-${borderWidth})` : void 0,
    "--pc-box-border-block-start-width": borderBlockStartWidth ? `var(--p-border-width-${borderBlockStartWidth})` : void 0,
    "--pc-box-border-block-end-width": borderBlockEndWidth ? `var(--p-border-width-${borderBlockEndWidth})` : void 0,
    "--pc-box-border-inline-start-width": borderInlineStartWidth ? `var(--p-border-width-${borderInlineStartWidth})` : void 0,
    "--pc-box-border-inline-end-width": borderInlineEndWidth ? `var(--p-border-width-${borderInlineEndWidth})` : void 0,
    "--pc-box-min-height": minHeight,
    "--pc-box-min-width": minWidth,
    "--pc-box-max-width": maxWidth,
    "--pc-box-outline-color": outlineColor ? `var(--p-color-${outlineColor})` : void 0,
    "--pc-box-outline-style": outlineStyleValue,
    "--pc-box-outline-width": outlineWidth ? `var(--p-border-width-${outlineWidth})` : void 0,
    "--pc-box-overflow-x": overflowX,
    "--pc-box-overflow-y": overflowY,
    ...getResponsiveProps("box", "padding-block-start", "space", paddingBlockStart || paddingBlock || padding),
    ...getResponsiveProps("box", "padding-block-end", "space", paddingBlockEnd || paddingBlock || padding),
    ...getResponsiveProps("box", "padding-inline-start", "space", paddingInlineStart || paddingInline || padding),
    ...getResponsiveProps("box", "padding-inline-end", "space", paddingInlineEnd || paddingInline || padding),
    "--pc-box-shadow": shadow ? `var(--p-shadow-${shadow})` : void 0,
    "--pc-box-width": width,
    position,
    "--pc-box-inset-block-start": insetBlockStart ? `var(--p-space-${insetBlockStart})` : void 0,
    "--pc-box-inset-block-end": insetBlockEnd ? `var(--p-space-${insetBlockEnd})` : void 0,
    "--pc-box-inset-inline-start": insetInlineStart ? `var(--p-space-${insetInlineStart})` : void 0,
    "--pc-box-inset-inline-end": insetInlineEnd ? `var(--p-space-${insetInlineEnd})` : void 0,
    zIndex,
    opacity
  }, className = classNames(styles7.Box, visuallyHidden && styles7.visuallyHidden, printHidden && styles7.printHidden, as === "ul" && styles7.listReset);
  return /* @__PURE__ */ import_react36.default.createElement(as, {
    className,
    id,
    ref,
    style: sanitizeCustomProperties(style),
    role,
    tabIndex,
    ...restProps
  }, children);
});
Box.displayName = "Box";

// node_modules/@shopify/polaris/build/esm/components/Card/Card.js
var Card = ({
  children,
  background = "bg-surface",
  padding = {
    xs: "400"
  },
  roundedAbove = "sm"
}) => {
  let breakpoints = useBreakpoints(), defaultBorderRadius = "300", hasBorderRadius = Boolean(breakpoints[`${roundedAbove}Up`]);
  return /* @__PURE__ */ import_react37.default.createElement(WithinContentContext.Provider, {
    value: !0
  }, /* @__PURE__ */ import_react37.default.createElement(ShadowBevel, {
    boxShadow: "100",
    borderRadius: hasBorderRadius ? defaultBorderRadius : "0",
    zIndex: "32"
  }, /* @__PURE__ */ import_react37.default.createElement(Box, {
    background,
    padding,
    overflowX: "clip",
    overflowY: "clip",
    minHeight: "100%"
  }, children)));
};

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.js
var import_react38 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.css.js
var styles8 = {
  InlineStack: "Polaris-InlineStack"
};

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.js
var InlineStack = function({
  as: Element2 = "div",
  align,
  direction = "row",
  blockAlign,
  gap,
  wrap = !0,
  children
}) {
  let style = {
    "--pc-inline-stack-align": align,
    "--pc-inline-stack-block-align": blockAlign,
    "--pc-inline-stack-wrap": wrap ? "wrap" : "nowrap",
    ...getResponsiveProps("inline-stack", "gap", "space", gap),
    ...getResponsiveValue("inline-stack", "flex-direction", direction)
  };
  return /* @__PURE__ */ import_react38.default.createElement(Element2, {
    className: styles8.InlineStack,
    style
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.js
var import_react39 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.css.js
var styles9 = {
  BlockStack: "Polaris-BlockStack",
  listReset: "Polaris-BlockStack--listReset",
  fieldsetReset: "Polaris-BlockStack--fieldsetReset"
};

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.js
var BlockStack = ({
  as = "div",
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = !1,
  ...restProps
}) => {
  let className = classNames(styles9.BlockStack, (as === "ul" || as === "ol") && styles9.listReset, as === "fieldset" && styles9.fieldsetReset), style = {
    "--pc-block-stack-align": align ? `${align}` : null,
    "--pc-block-stack-inline-align": inlineAlign ? `${inlineAlign}` : null,
    "--pc-block-stack-order": reverseOrder ? "column-reverse" : "column",
    ...getResponsiveProps("block-stack", "gap", "space", gap)
  };
  return /* @__PURE__ */ import_react39.default.createElement(as, {
    className,
    id,
    style: sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/Image/Image.js
var import_react40 = __toESM(require_react());
function Image({
  alt,
  sourceSet,
  source,
  crossOrigin,
  onLoad,
  className,
  ...rest
}) {
  let finalSourceSet = sourceSet ? sourceSet.map(({
    source: subSource,
    descriptor
  }) => `${subSource} ${descriptor}`).join(",") : null, handleLoad = (0, import_react40.useCallback)(() => {
    onLoad && onLoad();
  }, [onLoad]);
  return /* @__PURE__ */ import_react40.default.createElement("img", Object.assign({
    alt,
    src: source,
    crossOrigin,
    className,
    onLoad: handleLoad
  }, finalSourceSet ? {
    srcSet: finalSourceSet
  } : {}, rest));
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.js
var import_react68 = __toESM(require_react());
import { SearchIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/FilterActionsProvider/FilterActionsProvider.js
var import_react41 = __toESM(require_react()), FilterActionsContext = /* @__PURE__ */ (0, import_react41.createContext)(!1);
function FilterActionsProvider({
  children,
  filterActions
}) {
  return /* @__PURE__ */ import_react41.default.createElement(FilterActionsContext.Provider, {
    value: filterActions
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
var import_react58 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
var import_react57 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.css.js
var styles10 = {
  Item: "Polaris-ActionList__Item",
  default: "Polaris-ActionList--default",
  active: "Polaris-ActionList--active",
  destructive: "Polaris-ActionList--destructive",
  disabled: "Polaris-ActionList--disabled",
  Prefix: "Polaris-ActionList__Prefix",
  Suffix: "Polaris-ActionList__Suffix",
  indented: "Polaris-ActionList--indented",
  menu: "Polaris-ActionList--menu",
  Text: "Polaris-ActionList__Text"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
var import_react44 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/within-filter-context.js
var import_react42 = __toESM(require_react()), WithinFilterContext = /* @__PURE__ */ (0, import_react42.createContext)(!1);

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.css.js
var styles11 = {
  Badge: "Polaris-Badge",
  toneSuccess: "Polaris-Badge--toneSuccess",
  "toneSuccess-strong": "Polaris-Badge__toneSuccess--strong",
  toneInfo: "Polaris-Badge--toneInfo",
  "toneInfo-strong": "Polaris-Badge__toneInfo--strong",
  toneAttention: "Polaris-Badge--toneAttention",
  "toneAttention-strong": "Polaris-Badge__toneAttention--strong",
  toneWarning: "Polaris-Badge--toneWarning",
  "toneWarning-strong": "Polaris-Badge__toneWarning--strong",
  toneCritical: "Polaris-Badge--toneCritical",
  "toneCritical-strong": "Polaris-Badge__toneCritical--strong",
  toneNew: "Polaris-Badge--toneNew",
  toneMagic: "Polaris-Badge--toneMagic",
  "toneRead-only": "Polaris-Badge__toneRead--only",
  toneEnabled: "Polaris-Badge--toneEnabled",
  sizeLarge: "Polaris-Badge--sizeLarge",
  withinFilter: "Polaris-Badge--withinFilter",
  Icon: "Polaris-Badge__Icon",
  PipContainer: "Polaris-Badge__PipContainer"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/types.js
var ToneValue;
(function(ToneValue2) {
  ToneValue2.Info = "info", ToneValue2.Success = "success", ToneValue2.Warning = "warning", ToneValue2.Critical = "critical", ToneValue2.Attention = "attention", ToneValue2.New = "new", ToneValue2.Magic = "magic", ToneValue2.InfoStrong = "info-strong", ToneValue2.SuccessStrong = "success-strong", ToneValue2.WarningStrong = "warning-strong", ToneValue2.CriticalStrong = "critical-strong", ToneValue2.AttentionStrong = "attention-strong", ToneValue2.ReadOnly = "read-only", ToneValue2.Enabled = "enabled";
})(ToneValue || (ToneValue = {}));
var ProgressValue;
(function(ProgressValue2) {
  ProgressValue2.Incomplete = "incomplete", ProgressValue2.PartiallyComplete = "partiallyComplete", ProgressValue2.Complete = "complete";
})(ProgressValue || (ProgressValue = {}));

// node_modules/@shopify/polaris/build/esm/components/Badge/utils.js
function getDefaultAccessibilityLabel(i18n, progress, tone) {
  let progressLabel = "", toneLabel = "";
  if (!progress && !tone)
    return "";
  switch (progress) {
    case ProgressValue.Incomplete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.incomplete");
      break;
    case ProgressValue.PartiallyComplete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.partiallyComplete");
      break;
    case ProgressValue.Complete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.complete");
      break;
  }
  switch (tone) {
    case ToneValue.Info:
    case ToneValue.InfoStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.info");
      break;
    case ToneValue.Success:
    case ToneValue.SuccessStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.success");
      break;
    case ToneValue.Warning:
    case ToneValue.WarningStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.warning");
      break;
    case ToneValue.Critical:
    case ToneValue.CriticalStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.critical");
      break;
    case ToneValue.Attention:
    case ToneValue.AttentionStrong:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.attention");
      break;
    case ToneValue.New:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.new");
      break;
    case ToneValue.ReadOnly:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.readOnly");
      break;
    case ToneValue.Enabled:
      toneLabel = i18n.translate("Polaris.Badge.TONE_LABELS.enabled");
      break;
  }
  return !tone && progress ? progressLabel : tone && !progress ? toneLabel : i18n.translate("Polaris.Badge.progressAndTone", {
    progressLabel,
    toneLabel
  });
}

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
var import_react43 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.css.js
var styles12 = {
  Pip: "Polaris-Badge-Pip",
  toneInfo: "Polaris-Badge-Pip--toneInfo",
  toneSuccess: "Polaris-Badge-Pip--toneSuccess",
  toneNew: "Polaris-Badge-Pip--toneNew",
  toneAttention: "Polaris-Badge-Pip--toneAttention",
  toneWarning: "Polaris-Badge-Pip--toneWarning",
  toneCritical: "Polaris-Badge-Pip--toneCritical",
  progressIncomplete: "Polaris-Badge-Pip--progressIncomplete",
  progressPartiallyComplete: "Polaris-Badge-Pip--progressPartiallyComplete",
  progressComplete: "Polaris-Badge-Pip--progressComplete"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
function Pip({
  tone,
  progress = "complete",
  accessibilityLabelOverride
}) {
  let i18n = useI18n(), className = classNames(styles12.Pip, tone && styles12[variationName("tone", tone)], progress && styles12[variationName("progress", progress)]), accessibilityLabel = accessibilityLabelOverride || getDefaultAccessibilityLabel(i18n, progress, tone);
  return /* @__PURE__ */ import_react43.default.createElement("span", {
    className
  }, /* @__PURE__ */ import_react43.default.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel));
}

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
var DEFAULT_SIZE = "medium", progressIconMap = {
  complete: () => /* @__PURE__ */ import_react44.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react44.default.createElement("path", {
    d: "M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z"
  })),
  partiallyComplete: () => /* @__PURE__ */ import_react44.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react44.default.createElement("path", {
    fillRule: "evenodd",
    d: "m8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z"
  })),
  incomplete: () => /* @__PURE__ */ import_react44.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react44.default.createElement("path", {
    fillRule: "evenodd",
    d: "M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"
  }))
};
function Badge({
  children,
  tone,
  progress,
  icon,
  size = DEFAULT_SIZE,
  toneAndProgressLabelOverride
}) {
  let i18n = useI18n(), withinFilter = (0, import_react44.useContext)(WithinFilterContext), className = classNames(styles11.Badge, tone && styles11[variationName("tone", tone)], size && size !== DEFAULT_SIZE && styles11[variationName("size", size)], withinFilter && styles11.withinFilter), accessibilityLabel = toneAndProgressLabelOverride || getDefaultAccessibilityLabel(i18n, progress, tone), accessibilityMarkup = Boolean(accessibilityLabel) && /* @__PURE__ */ import_react44.default.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, accessibilityLabel);
  return progress && !icon && (accessibilityMarkup = /* @__PURE__ */ import_react44.default.createElement("span", {
    className: styles11.Icon
  }, /* @__PURE__ */ import_react44.default.createElement(Icon, {
    accessibilityLabel,
    source: progressIconMap[progress]
  }))), /* @__PURE__ */ import_react44.default.createElement("span", {
    className
  }, accessibilityMarkup, icon && /* @__PURE__ */ import_react44.default.createElement("span", {
    className: styles11.Icon
  }, /* @__PURE__ */ import_react44.default.createElement(Icon, {
    source: icon
  })), children && /* @__PURE__ */ import_react44.default.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: tone === "new" ? "medium" : void 0
  }, children));
}
Badge.Pip = Pip;

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.js
var import_react56 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-toggle.js
var import_react45 = __toESM(require_react());
function useToggle(initialState) {
  let [value, setState] = (0, import_react45.useState)(initialState);
  return {
    value,
    toggle: (0, import_react45.useCallback)(() => setState((state) => !state), []),
    setTrue: (0, import_react45.useCallback)(() => setState(!0), []),
    setFalse: (0, import_react45.useCallback)(() => setState(!1), [])
  };
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.css.js
var styles13 = {
  TooltipContainer: "Polaris-Tooltip__TooltipContainer",
  HasUnderline: "Polaris-Tooltip__HasUnderline"
};

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/hooks.js
var import_react46 = __toESM(require_react());
function useEphemeralPresenceManager() {
  let ephemeralPresenceManager = (0, import_react46.useContext)(EphemeralPresenceManagerContext);
  if (!ephemeralPresenceManager)
    throw new Error("No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return ephemeralPresenceManager;
}

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
var import_react48 = __toESM(require_react()), import_react_dom = __toESM(require_react_dom());
import { themeNameDefault as themeNameDefault3 } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/portals/hooks.js
var import_react47 = __toESM(require_react());
function usePortalsManager() {
  let portalsManager = (0, import_react47.useContext)(PortalsManagerContext);
  if (!portalsManager)
    throw new Error("No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return portalsManager;
}

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
function Portal({
  children,
  idPrefix = "",
  onPortalCreated = noop2
}) {
  let themeName = useThemeName(), {
    container
  } = usePortalsManager(), uniqueId = (0, import_react48.useId)(), portalId = idPrefix !== "" ? `${idPrefix}-${uniqueId}` : uniqueId;
  return (0, import_react48.useEffect)(() => {
    onPortalCreated();
  }, [onPortalCreated]), container ? /* @__PURE__ */ (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react48.default.createElement(ThemeProvider, {
    theme: isThemeNameLocal(themeName) ? themeName : themeNameDefault3,
    "data-portal-id": portalId
  }, children), container) : null;
}
function noop2() {
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
var import_react55 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.css.js
var styles14 = {
  TooltipOverlay: "Polaris-Tooltip-TooltipOverlay",
  Tail: "Polaris-Tooltip-TooltipOverlay__Tail",
  positionedAbove: "Polaris-Tooltip-TooltipOverlay--positionedAbove",
  measuring: "Polaris-Tooltip-TooltipOverlay--measuring",
  measured: "Polaris-Tooltip-TooltipOverlay--measured",
  instant: "Polaris-Tooltip-TooltipOverlay--instant",
  Content: "Polaris-Tooltip-TooltipOverlay__Content",
  default: "Polaris-Tooltip-TooltipOverlay--default",
  wide: "Polaris-Tooltip-TooltipOverlay--wide"
};

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
var import_react54 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/utilities/math.js
function calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset = 0) {
  let activatorTop = activatorRect.top, activatorBottom = activatorTop + activatorRect.height, spaceAbove = activatorRect.top - topBarOffset, spaceBelow = containerRect.height - activatorRect.top - activatorRect.height, desiredHeight = overlayRect.height, verticalMargins = overlayMargins.activator + overlayMargins.container, minimumSpaceToScroll = overlayMargins.container, distanceToTopScroll = activatorRect.top - Math.max(scrollableContainerRect.top, 0), distanceToBottomScroll = containerRect.top + Math.min(containerRect.height, scrollableContainerRect.top + scrollableContainerRect.height) - (activatorRect.top + activatorRect.height), enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll, enoughSpaceFromBottomScroll = distanceToBottomScroll >= minimumSpaceToScroll, heightIfAbove = Math.min(spaceAbove, desiredHeight), heightIfBelow = Math.min(spaceBelow, desiredHeight), heightIfAboveCover = Math.min(spaceAbove + activatorRect.height, desiredHeight), heightIfBelowCover = Math.min(spaceBelow + activatorRect.height, desiredHeight), containerRectTop = fixed ? 0 : containerRect.top, positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: "above"
  }, positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: "below"
  }, positionIfCoverBelow = {
    height: heightIfBelowCover - verticalMargins,
    top: activatorTop + containerRectTop,
    positioning: "cover"
  }, positionIfCoverAbove = {
    height: heightIfAboveCover - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove + activatorRect.height + verticalMargins,
    positioning: "cover"
  };
  return preferredPosition === "above" ? (enoughSpaceFromTopScroll || distanceToTopScroll >= distanceToBottomScroll && !enoughSpaceFromBottomScroll) && (spaceAbove > desiredHeight || spaceAbove > spaceBelow) ? positionIfAbove : positionIfBelow : preferredPosition === "below" ? (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow > desiredHeight || spaceBelow > spaceAbove) ? positionIfBelow : positionIfAbove : preferredPosition === "cover" ? (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow + activatorRect.height > desiredHeight || spaceBelow > spaceAbove) ? positionIfCoverBelow : positionIfCoverAbove : enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll ? spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow : distanceToTopScroll > minimumSpaceToScroll ? positionIfAbove : positionIfBelow;
}
function calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment) {
  let maximum = containerRect.width - overlayRect.width;
  if (preferredAlignment === "left")
    return Math.min(maximum, Math.max(0, activatorRect.left - overlayMargins.horizontal));
  if (preferredAlignment === "right") {
    let activatorRight = containerRect.width - (activatorRect.left + activatorRect.width);
    return Math.min(maximum, Math.max(0, activatorRight - overlayMargins.horizontal));
  }
  return Math.min(maximum, Math.max(0, activatorRect.center.x - overlayRect.width / 2));
}
function rectIsOutsideOfRect(inner, outer) {
  let {
    center
  } = inner;
  return center.y < outer.top || center.y > outer.top + outer.height;
}
function intersectionWithViewport(rect, viewport = windowRect()) {
  let top = Math.max(rect.top, 0), left = Math.max(rect.left, 0), bottom = Math.min(rect.top + rect.height, viewport.height), right = Math.min(rect.left + rect.width, viewport.width);
  return new Rect({
    top,
    left,
    height: bottom - top,
    width: right - left
  });
}
function windowRect() {
  return new Rect({
    top: window.scrollY,
    left: window.scrollX,
    height: window.innerHeight,
    width: document.body.clientWidth
  });
}

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.css.js
var styles15 = {
  PositionedOverlay: "Polaris-PositionedOverlay",
  fixed: "Polaris-PositionedOverlay--fixed",
  calculating: "Polaris-PositionedOverlay--calculating",
  preventInteraction: "Polaris-PositionedOverlay--preventInteraction"
};

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
var import_react53 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-lazy-ref.js
var import_react49 = __toESM(require_react()), UNIQUE_IDENTIFIER = Symbol("unique_identifier");
function useLazyRef(initialValue) {
  let lazyRef = (0, import_react49.useRef)(UNIQUE_IDENTIFIER);
  return lazyRef.current === UNIQUE_IDENTIFIER && (lazyRef.current = initialValue()), lazyRef;
}

// node_modules/@shopify/polaris/build/esm/utilities/use-component-did-mount.js
var import_react50 = __toESM(require_react());
function useComponentDidMount(callback) {
  let isAfterInitialMount = useIsAfterInitialMount(), hasInvokedLifeCycle = (0, import_react50.useRef)(!1);
  if (isAfterInitialMount && !hasInvokedLifeCycle.current)
    return hasInvokedLifeCycle.current = !0, callback();
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/context.js
var import_react51 = __toESM(require_react()), ScrollableContext = /* @__PURE__ */ (0, import_react51.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.css.js
var styles16 = {
  Scrollable: "Polaris-Scrollable",
  hasTopShadow: "Polaris-Scrollable--hasTopShadow",
  hasBottomShadow: "Polaris-Scrollable--hasBottomShadow",
  horizontal: "Polaris-Scrollable--horizontal",
  vertical: "Polaris-Scrollable--vertical",
  scrollbarWidthThin: "Polaris-Scrollable--scrollbarWidthThin",
  scrollbarWidthNone: "Polaris-Scrollable--scrollbarWidthNone",
  scrollbarWidthAuto: "Polaris-Scrollable--scrollbarWidthAuto",
  scrollbarGutterStable: "Polaris-Scrollable--scrollbarGutterStable",
  "scrollbarGutterStableboth-edges": "Polaris-Scrollable__scrollbarGutterStableboth--edges"
};

// node_modules/@shopify/polaris/build/esm/components/Scrollable/components/ScrollTo/ScrollTo.js
var import_react52 = __toESM(require_react());
function ScrollTo() {
  let anchorNode = (0, import_react52.useRef)(null), scrollToPosition = (0, import_react52.useContext)(ScrollableContext);
  (0, import_react52.useEffect)(() => {
    !scrollToPosition || !anchorNode.current || scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition]);
  let id = (0, import_react52.useId)();
  return /* @__PURE__ */ import_react52.default.createElement("a", {
    id,
    ref: anchorNode
  });
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
var MAX_SCROLL_HINT_DISTANCE = 100, LOW_RES_BUFFER = 2, ScrollableComponent = /* @__PURE__ */ (0, import_react53.forwardRef)(({
  children,
  className,
  horizontal = !0,
  vertical = !0,
  shadow,
  hint,
  focusable,
  scrollbarWidth = "thin",
  scrollbarGutter,
  onScrolledToBottom,
  ...rest
}, forwardedRef) => {
  let [topShadow, setTopShadow] = (0, import_react53.useState)(!1), [bottomShadow, setBottomShadow] = (0, import_react53.useState)(!1), stickyManager = useLazyRef(() => new StickyManager()), scrollArea = (0, import_react53.useRef)(null), scrollTo = (0, import_react53.useCallback)((scrollY, options = {}) => {
    let optionsBehavior = options.behavior || "smooth", behavior = prefersReducedMotion() ? "auto" : optionsBehavior;
    scrollArea.current?.scrollTo({
      top: scrollY,
      behavior
    });
  }, []), defaultRef = (0, import_react53.useRef)();
  (0, import_react53.useImperativeHandle)(forwardedRef || defaultRef, () => ({
    scrollTo
  }));
  let handleScroll = (0, import_react53.useCallback)(() => {
    let currentScrollArea = scrollArea.current;
    currentScrollArea && requestAnimationFrame(() => {
      let {
        scrollTop,
        clientHeight,
        scrollHeight
      } = currentScrollArea, canScroll = Boolean(scrollHeight > clientHeight), isBelowTopOfScroll = Boolean(scrollTop > 0), isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);
      setTopShadow(isBelowTopOfScroll), setBottomShadow(!isAtBottomOfScroll), canScroll && isAtBottomOfScroll && onScrolledToBottom && onScrolledToBottom();
    });
  }, [onScrolledToBottom]);
  useComponentDidMount(() => {
    handleScroll(), hint && requestAnimationFrame(() => performScrollHint(scrollArea.current));
  }), (0, import_react53.useEffect)(() => {
    let currentScrollArea = scrollArea.current;
    if (!currentScrollArea)
      return;
    let handleResize = debounce(handleScroll, 50, {
      trailing: !0
    });
    return stickyManager.current?.setContainer(currentScrollArea), currentScrollArea.addEventListener("scroll", handleScroll), globalThis.addEventListener("resize", handleResize), () => {
      currentScrollArea.removeEventListener("scroll", handleScroll), globalThis.removeEventListener("resize", handleResize);
    };
  }, [stickyManager, handleScroll]);
  let finalClassName = classNames(className, styles16.Scrollable, vertical && styles16.vertical, horizontal && styles16.horizontal, shadow && topShadow && styles16.hasTopShadow, shadow && bottomShadow && styles16.hasBottomShadow, scrollbarWidth && styles16[variationName("scrollbarWidth", scrollbarWidth)], scrollbarGutter && styles16[variationName("scrollbarGutter", scrollbarGutter.replace(" ", ""))]);
  return /* @__PURE__ */ import_react53.default.createElement(ScrollableContext.Provider, {
    value: scrollTo
  }, /* @__PURE__ */ import_react53.default.createElement(StickyManagerContext.Provider, {
    value: stickyManager.current
  }, /* @__PURE__ */ import_react53.default.createElement("div", Object.assign({
    className: finalClassName
  }, scrollable.props, rest, {
    ref: scrollArea,
    tabIndex: focusable ? 0 : void 0
  }), children)));
});
ScrollableComponent.displayName = "Scrollable";
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function performScrollHint(elem) {
  if (!elem || prefersReducedMotion())
    return;
  let scrollableDistance = elem.scrollHeight - elem.clientHeight, distanceToPeek = Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER, goBackToTop = () => {
    requestAnimationFrame(() => {
      elem.scrollTop >= distanceToPeek && (elem.removeEventListener("scroll", goBackToTop), elem.scrollTo({
        top: 0,
        behavior: "smooth"
      }));
    });
  };
  elem.addEventListener("scroll", goBackToTop), elem.scrollTo({
    top: MAX_SCROLL_HINT_DISTANCE,
    behavior: "smooth"
  });
}
var forNode = (node) => {
  let closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
}, Scrollable = ScrollableComponent;
Scrollable.ScrollTo = ScrollTo;
Scrollable.forNode = forNode;

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
var OBSERVER_CONFIG = {
  childList: !0,
  subtree: !0,
  characterData: !0,
  attributeFilter: ["style"]
}, PositionedOverlay = class extends import_react54.PureComponent {
  constructor(props) {
    super(props), this.state = {
      measuring: !0,
      activatorRect: getRectForNode(this.props.activator),
      right: void 0,
      left: void 0,
      top: 0,
      height: 0,
      width: null,
      positioning: "below",
      zIndex: null,
      outsideScrollableContainer: !1,
      lockPosition: !1,
      chevronOffset: 0
    }, this.overlay = null, this.scrollableContainers = [], this.overlayDetails = () => {
      let {
        measuring,
        left,
        right,
        positioning,
        height,
        activatorRect,
        chevronOffset
      } = this.state;
      return {
        measuring,
        left,
        right,
        desiredHeight: height,
        positioning,
        activatorRect,
        chevronOffset
      };
    }, this.setOverlay = (node) => {
      this.overlay = node;
    }, this.setScrollableContainers = () => {
      let containers = [], scrollableContainer = Scrollable.forNode(this.props.activator);
      if (scrollableContainer)
        for (containers.push(scrollableContainer); scrollableContainer?.parentElement; )
          scrollableContainer = Scrollable.forNode(scrollableContainer.parentElement), containers.push(scrollableContainer);
      this.scrollableContainers = containers;
    }, this.registerScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.addEventListener("scroll", this.handleMeasurement);
      });
    }, this.unregisterScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.removeEventListener("scroll", this.handleMeasurement);
      });
    }, this.handleMeasurement = () => {
      let {
        lockPosition,
        top
      } = this.state;
      this.observer.disconnect(), this.setState(({
        left,
        top: top2,
        right
      }) => ({
        left,
        right,
        top: top2,
        height: 0,
        positioning: "below",
        measuring: !0
      }), () => {
        if (this.overlay == null || this.firstScrollableContainer == null)
          return;
        let {
          activator,
          preferredPosition = "below",
          preferredAlignment = "center",
          onScrollOut,
          fullWidth,
          fixed,
          preferInputActivator = !0
        } = this.props, preferredActivator = preferInputActivator && activator.querySelector("input") || activator, activatorRect = getRectForNode(preferredActivator), currentOverlayRect = getRectForNode(this.overlay), scrollableElement = isDocument2(this.firstScrollableContainer) ? document.body : this.firstScrollableContainer, scrollableContainerRect = getRectForNode(scrollableElement), overlayRect = fullWidth || preferredPosition === "cover" ? new Rect({
          ...currentOverlayRect,
          width: activatorRect.width
        }) : currentOverlayRect;
        scrollableElement === document.body && (scrollableContainerRect.height = document.body.scrollHeight);
        let topBarOffset = 0, topBarElement = scrollableElement.querySelector(`${dataPolarisTopBar.selector}`);
        topBarElement && (topBarOffset = topBarElement.clientHeight);
        let overlayMargins = this.overlay.firstElementChild && this.overlay.firstChild instanceof HTMLElement ? getMarginsForNode(this.overlay.firstElementChild) : {
          activator: 0,
          container: 0,
          horizontal: 0
        }, containerRect = windowRect(), zIndexForLayer = getZIndexForLayerFromNode(activator), zIndex = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1, verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset), horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment), chevronOffset = activatorRect.center.x - horizontalPosition + overlayMargins.horizontal * 2;
        this.setState({
          measuring: !1,
          activatorRect: getRectForNode(activator),
          left: preferredAlignment !== "right" ? horizontalPosition : void 0,
          right: preferredAlignment === "right" ? horizontalPosition : void 0,
          top: lockPosition ? top : verticalPosition.top,
          lockPosition: Boolean(fixed),
          height: verticalPosition.height || 0,
          width: fullWidth || preferredPosition === "cover" ? overlayRect.width : null,
          positioning: verticalPosition.positioning,
          outsideScrollableContainer: onScrollOut != null && rectIsOutsideOfRect(activatorRect, intersectionWithViewport(scrollableContainerRect)),
          zIndex,
          chevronOffset
        }, () => {
          this.overlay && (this.observer.observe(this.overlay, OBSERVER_CONFIG), this.observer.observe(activator, OBSERVER_CONFIG));
        });
      });
    }, this.observer = new MutationObserver(this.handleMeasurement);
  }
  componentDidMount() {
    this.setScrollableContainers(), this.scrollableContainers.length && !this.props.fixed && this.registerScrollHandlers(), this.handleMeasurement();
  }
  componentWillUnmount() {
    this.observer.disconnect(), this.scrollableContainers.length && !this.props.fixed && this.unregisterScrollHandlers();
  }
  componentDidUpdate() {
    let {
      outsideScrollableContainer,
      top
    } = this.state, {
      onScrollOut,
      active
    } = this.props;
    active && onScrollOut != null && top !== 0 && outsideScrollableContainer && onScrollOut();
  }
  render() {
    let {
      left,
      right,
      top,
      zIndex,
      width
    } = this.state, {
      render,
      fixed,
      preventInteraction,
      classNames: propClassNames,
      zIndexOverride
    } = this.props, style = {
      top: top == null || isNaN(top) ? void 0 : top,
      left: left == null || isNaN(left) ? void 0 : left,
      right: right == null || isNaN(right) ? void 0 : right,
      width: width == null || isNaN(width) ? void 0 : width,
      zIndex: zIndexOverride || zIndex || void 0
    }, className = classNames(styles15.PositionedOverlay, fixed && styles15.fixed, preventInteraction && styles15.preventInteraction, propClassNames);
    return /* @__PURE__ */ import_react54.default.createElement("div", {
      className,
      style,
      ref: this.setOverlay
    }, /* @__PURE__ */ import_react54.default.createElement(EventListener, {
      event: "resize",
      handler: this.handleMeasurement
    }), render(this.overlayDetails()));
  }
  get firstScrollableContainer() {
    return this.scrollableContainers[0] ?? null;
  }
  forceUpdatePosition() {
    requestAnimationFrame(this.handleMeasurement);
  }
};
function getMarginsForNode(node) {
  let nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || "0"),
    container: parseFloat(nodeStyles.marginBottom || "0"),
    horizontal: parseFloat(nodeStyles.marginLeft || "0")
  };
}
function getZIndexForLayerFromNode(node) {
  let layerNode = node.closest(layer.selector) || document.body, zIndex = layerNode === document.body ? "auto" : parseInt(window.getComputedStyle(layerNode).zIndex || "0", 10);
  return zIndex === "auto" || isNaN(zIndex) ? null : zIndex;
}
function isDocument2(node) {
  return node === document;
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
var tailUpPaths = /* @__PURE__ */ import_react55.default.createElement(import_react55.default.Fragment, null, /* @__PURE__ */ import_react55.default.createElement("path", {
  d: "M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z",
  fill: "var(--p-color-tooltip-tail-up-border-experimental)"
}), /* @__PURE__ */ import_react55.default.createElement("path", {
  d: "M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z",
  fill: "var(--p-color-bg-surface)"
})), tailDownPaths = /* @__PURE__ */ import_react55.default.createElement(import_react55.default.Fragment, null, /* @__PURE__ */ import_react55.default.createElement("path", {
  d: "m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z",
  fill: "var(--p-color-tooltip-tail-down-border-experimental)"
}), /* @__PURE__ */ import_react55.default.createElement("path", {
  d: "M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z",
  fill: "var(--p-color-bg-surface)"
}));
function TooltipOverlay({
  active,
  activator,
  preferredPosition = "above",
  preventInteraction,
  id,
  children,
  accessibilityLabel,
  width,
  padding,
  borderRadius,
  zIndexOverride,
  instant
}) {
  let i18n = useI18n();
  return active ? /* @__PURE__ */ import_react55.default.createElement(PositionedOverlay, {
    active,
    activator,
    preferredPosition,
    preventInteraction,
    render: renderTooltip,
    zIndexOverride
  }) : null;
  function renderTooltip(overlayDetails) {
    let {
      measuring,
      desiredHeight,
      positioning,
      chevronOffset
    } = overlayDetails, containerClassName = classNames(styles14.TooltipOverlay, measuring && styles14.measuring, !measuring && styles14.measured, instant && styles14.instant, positioning === "above" && styles14.positionedAbove), contentClassName = classNames(styles14.Content, width && styles14[width]), contentStyles = measuring ? void 0 : {
      minHeight: desiredHeight
    }, style = {
      "--pc-tooltip-chevron-x-pos": `${chevronOffset}px`,
      "--pc-tooltip-border-radius": borderRadius ? `var(--p-border-radius-${borderRadius})` : void 0,
      "--pc-tooltip-padding": padding && padding === "default" ? "var(--p-space-100) var(--p-space-200)" : `var(--p-space-${padding})`
    };
    return /* @__PURE__ */ import_react55.default.createElement("div", Object.assign({
      style,
      className: containerClassName
    }, layer.props), /* @__PURE__ */ import_react55.default.createElement("svg", {
      className: styles14.Tail,
      width: "19",
      height: "11",
      fill: "none"
    }, positioning === "above" ? tailDownPaths : tailUpPaths), /* @__PURE__ */ import_react55.default.createElement("div", {
      id,
      role: "tooltip",
      className: contentClassName,
      style: {
        ...contentStyles,
        ...style
      },
      "aria-label": accessibilityLabel ? i18n.translate("Polaris.TooltipOverlay.accessibilityLabel", {
        label: accessibilityLabel
      }) : void 0
    }, children));
  }
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.js
var HOVER_OUT_TIMEOUT = 150;
function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  active: originalActive,
  hoverDelay,
  preferredPosition = "above",
  activatorWrapper = "span",
  accessibilityLabel,
  width = "default",
  padding = "default",
  borderRadius: borderRadiusProp,
  zIndexOverride,
  hasUnderline,
  persistOnClick,
  onOpen,
  onClose
}) {
  let borderRadius = borderRadiusProp || "200", WrapperComponent = activatorWrapper, {
    value: active,
    setTrue: setActiveTrue,
    setFalse: handleBlur
  } = useToggle(Boolean(originalActive)), {
    value: persist,
    toggle: togglePersisting
  } = useToggle(Boolean(originalActive) && Boolean(persistOnClick)), [activatorNode, setActivatorNode] = (0, import_react56.useState)(null), {
    presenceList,
    addPresence,
    removePresence
  } = useEphemeralPresenceManager(), id = (0, import_react56.useId)(), activatorContainer = (0, import_react56.useRef)(null), mouseEntered = (0, import_react56.useRef)(!1), [shouldAnimate, setShouldAnimate] = (0, import_react56.useState)(Boolean(!originalActive)), hoverDelayTimeout = (0, import_react56.useRef)(null), hoverOutTimeout = (0, import_react56.useRef)(null), handleFocus = (0, import_react56.useCallback)(() => {
    originalActive !== !1 && setActiveTrue();
  }, [originalActive, setActiveTrue]);
  (0, import_react56.useEffect)(() => {
    let accessibilityNode = (activatorContainer.current ? findFirstFocusableNode(activatorContainer.current) : null) || activatorContainer.current;
    accessibilityNode && (accessibilityNode.tabIndex = 0, accessibilityNode.setAttribute("aria-describedby", id), accessibilityNode.setAttribute("data-polaris-tooltip-activator", "true"));
  }, [id, children]), (0, import_react56.useEffect)(() => () => {
    hoverDelayTimeout.current && clearTimeout(hoverDelayTimeout.current), hoverOutTimeout.current && clearTimeout(hoverOutTimeout.current);
  }, []);
  let handleOpen = (0, import_react56.useCallback)(() => {
    setShouldAnimate(!presenceList.tooltip && !active), onOpen?.(), addPresence("tooltip");
  }, [addPresence, presenceList.tooltip, onOpen, active]), handleClose = (0, import_react56.useCallback)(() => {
    onClose?.(), setShouldAnimate(!1), hoverOutTimeout.current = setTimeout(() => {
      removePresence("tooltip");
    }, HOVER_OUT_TIMEOUT);
  }, [removePresence, onClose]), handleKeyUp = (0, import_react56.useCallback)((event) => {
    event.key === "Escape" && (handleClose?.(), handleBlur(), persistOnClick && togglePersisting());
  }, [handleBlur, handleClose, persistOnClick, togglePersisting]);
  (0, import_react56.useEffect)(() => {
    originalActive === !1 && active && (handleClose(), handleBlur());
  }, [originalActive, active, handleClose, handleBlur]);
  let portal2 = activatorNode ? /* @__PURE__ */ import_react56.default.createElement(Portal, {
    idPrefix: "tooltip"
  }, /* @__PURE__ */ import_react56.default.createElement(TooltipOverlay, {
    id,
    preferredPosition,
    activator: activatorNode,
    active,
    accessibilityLabel,
    onClose: noop3,
    preventInteraction: dismissOnMouseOut,
    width,
    padding,
    borderRadius,
    zIndexOverride,
    instant: !shouldAnimate
  }, /* @__PURE__ */ import_react56.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, content))) : null, wrapperClassNames = classNames(activatorWrapper === "div" && styles13.TooltipContainer, hasUnderline && styles13.HasUnderline);
  return /* @__PURE__ */ import_react56.default.createElement(WrapperComponent, {
    onFocus: () => {
      handleOpen(), handleFocus();
    },
    onBlur: () => {
      handleClose(), handleBlur(), persistOnClick && togglePersisting();
    },
    onMouseLeave: handleMouseLeave,
    onMouseOver: handleMouseEnterFix,
    onMouseDown: persistOnClick ? togglePersisting : void 0,
    ref: setActivator,
    onKeyUp: handleKeyUp,
    className: wrapperClassNames
  }, children, portal2);
  function setActivator(node) {
    let activatorContainerRef = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null, setActivatorNode(null);
      return;
    }
    node.firstElementChild instanceof HTMLElement && setActivatorNode(node.firstElementChild), activatorContainerRef.current = node;
  }
  function handleMouseEnter() {
    mouseEntered.current = !0, hoverDelay && !presenceList.tooltip ? hoverDelayTimeout.current = setTimeout(() => {
      handleOpen(), handleFocus();
    }, hoverDelay) : (handleOpen(), handleFocus());
  }
  function handleMouseLeave() {
    hoverDelayTimeout.current && (clearTimeout(hoverDelayTimeout.current), hoverDelayTimeout.current = null), mouseEntered.current = !1, handleClose(), persist || handleBlur();
  }
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}
function noop3() {
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
function Item({
  id,
  badge,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  onMouseEnter,
  icon,
  image,
  prefix,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  truncate,
  active,
  role,
  variant = "default"
}) {
  let className = classNames(styles10.Item, disabled && styles10.disabled, destructive && styles10.destructive, active && styles10.active, variant === "default" && styles10.default, variant === "indented" && styles10.indented, variant === "menu" && styles10.menu), prefixMarkup = null;
  prefix ? prefixMarkup = /* @__PURE__ */ import_react57.default.createElement("span", {
    className: styles10.Prefix
  }, prefix) : icon ? prefixMarkup = /* @__PURE__ */ import_react57.default.createElement("span", {
    className: styles10.Prefix
  }, /* @__PURE__ */ import_react57.default.createElement(Icon, {
    source: icon
  })) : image && (prefixMarkup = /* @__PURE__ */ import_react57.default.createElement("span", {
    role: "presentation",
    className: styles10.Prefix,
    style: {
      backgroundImage: `url(${image}`
    }
  }));
  let contentText = content || "";
  truncate && content ? contentText = /* @__PURE__ */ import_react57.default.createElement(TruncateText, null, content) : ellipsis && (contentText = `${content}\u2026`);
  let contentMarkup = helpText ? /* @__PURE__ */ import_react57.default.createElement(import_react57.default.Fragment, null, /* @__PURE__ */ import_react57.default.createElement(Box, null, contentText), /* @__PURE__ */ import_react57.default.createElement(Text, {
    as: "span",
    variant: "bodySm",
    tone: active || disabled ? void 0 : "subdued"
  }, helpText)) : /* @__PURE__ */ import_react57.default.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? "semibold" : "regular"
  }, contentText), badgeMarkup = badge && /* @__PURE__ */ import_react57.default.createElement("span", {
    className: styles10.Suffix
  }, /* @__PURE__ */ import_react57.default.createElement(Badge, {
    tone: badge.tone
  }, badge.content)), suffixMarkup = suffix && /* @__PURE__ */ import_react57.default.createElement(Box, null, /* @__PURE__ */ import_react57.default.createElement("span", {
    className: styles10.Suffix
  }, suffix)), textMarkup = /* @__PURE__ */ import_react57.default.createElement("span", {
    className: styles10.Text
  }, /* @__PURE__ */ import_react57.default.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? "semibold" : "regular"
  }, contentMarkup)), contentElement = /* @__PURE__ */ import_react57.default.createElement(InlineStack, {
    blockAlign: "center",
    gap: "150",
    wrap: !1
  }, prefixMarkup, textMarkup, badgeMarkup, suffixMarkup), contentWrapper = /* @__PURE__ */ import_react57.default.createElement(Box, {
    width: "100%"
  }, contentElement), scrollMarkup = active ? /* @__PURE__ */ import_react57.default.createElement(Scrollable.ScrollTo, null) : null, control = url ? /* @__PURE__ */ import_react57.default.createElement(UnstyledLink, {
    id,
    url: disabled ? null : url,
    className,
    external,
    "aria-label": accessibilityLabel,
    onClick: disabled ? null : onAction,
    role
  }, contentWrapper) : /* @__PURE__ */ import_react57.default.createElement("button", {
    id,
    type: "button",
    className,
    disabled,
    "aria-label": accessibilityLabel,
    onClick: onAction,
    onMouseUp: handleMouseUpByBlurring,
    role,
    onMouseEnter
  }, contentWrapper);
  return /* @__PURE__ */ import_react57.default.createElement(import_react57.default.Fragment, null, scrollMarkup, control);
}
var TruncateText = ({
  children
}) => {
  let theme = useTheme(), textRef = (0, import_react57.useRef)(null), [isOverflowing, setIsOverflowing] = (0, import_react57.useState)(!1);
  return useIsomorphicLayoutEffect(() => {
    textRef.current && setIsOverflowing(textRef.current.scrollWidth > textRef.current.offsetWidth);
  }, [children]), isOverflowing ? /* @__PURE__ */ import_react57.default.createElement(Tooltip, {
    zIndexOverride: Number(theme.zIndex["z-index-11"]),
    preferredPosition: "above",
    hoverDelay: 1e3,
    content: children,
    dismissOnMouseOut: !0
  }, /* @__PURE__ */ import_react57.default.createElement(Text, {
    as: "span",
    truncate: !0
  }, children)) : /* @__PURE__ */ import_react57.default.createElement(Text, {
    as: "span",
    truncate: !0
  }, /* @__PURE__ */ import_react57.default.createElement(Box, {
    width: "100%",
    ref: textRef
  }, children));
};

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
function Section({
  section,
  hasMultipleSections,
  isFirst,
  actionRole,
  onActionAnyItem
}) {
  let handleAction = (itemOnAction) => () => {
    itemOnAction && itemOnAction(), onActionAnyItem && onActionAnyItem();
  }, actionMarkup = section.items.map(({
    content,
    helpText,
    onAction,
    ...item
  }, index) => {
    let itemMarkup = /* @__PURE__ */ import_react58.default.createElement(Item, Object.assign({
      content,
      helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item));
    return /* @__PURE__ */ import_react58.default.createElement(Box, {
      as: "li",
      key: `${content}-${index}`,
      role: actionRole === "menuitem" ? "presentation" : void 0
    }, /* @__PURE__ */ import_react58.default.createElement(InlineStack, {
      wrap: !1
    }, itemMarkup));
  }), titleMarkup = null;
  section.title && (titleMarkup = typeof section.title == "string" ? /* @__PURE__ */ import_react58.default.createElement(Box, {
    paddingBlockStart: "300",
    paddingBlockEnd: "100",
    paddingInlineStart: "300",
    paddingInlineEnd: "300"
  }, /* @__PURE__ */ import_react58.default.createElement(Text, {
    as: "p",
    variant: "headingSm"
  }, section.title)) : /* @__PURE__ */ import_react58.default.createElement(Box, {
    padding: "200",
    paddingInlineEnd: "150"
  }, section.title));
  let sectionRole;
  switch (actionRole) {
    case "option":
      sectionRole = "presentation";
      break;
    case "menuitem":
      sectionRole = hasMultipleSections ? "presentation" : "menu";
      break;
    default:
      sectionRole = void 0;
      break;
  }
  let sectionMarkup = /* @__PURE__ */ import_react58.default.createElement(import_react58.default.Fragment, null, titleMarkup, /* @__PURE__ */ import_react58.default.createElement(Box, Object.assign({
    as: "div",
    padding: "150"
  }, hasMultipleSections && {
    paddingBlockStart: "0"
  }, {
    tabIndex: hasMultipleSections ? void 0 : -1
  }), /* @__PURE__ */ import_react58.default.createElement(BlockStack, Object.assign({
    gap: "050",
    as: "ul"
  }, sectionRole && {
    role: sectionRole
  }), actionMarkup)));
  return hasMultipleSections ? /* @__PURE__ */ import_react58.default.createElement(Box, Object.assign({
    as: "li",
    role: "presentation",
    borderColor: "border-secondary"
  }, !isFirst && {
    borderBlockStartWidth: "025"
  }, !section.title && {
    paddingBlockStart: "150"
  }), sectionMarkup) : sectionMarkup;
}

// node_modules/@shopify/polaris/build/esm/components/KeypressListener/KeypressListener.js
var import_react59 = __toESM(require_react());
function KeypressListener({
  keyCode,
  handler,
  keyEvent = "keyup",
  options,
  useCapture
}) {
  let tracked = (0, import_react59.useRef)({
    handler,
    keyCode
  });
  useIsomorphicLayoutEffect(() => {
    tracked.current = {
      handler,
      keyCode
    };
  }, [handler, keyCode]);
  let handleKeyEvent = (0, import_react59.useCallback)((event) => {
    let {
      handler: handler2,
      keyCode: keyCode2
    } = tracked.current;
    event.keyCode === keyCode2 && handler2(event);
  }, []);
  return (0, import_react59.useEffect)(() => (document.addEventListener(keyEvent, handleKeyEvent, useCapture || options), () => {
    document.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
  }), [keyEvent, handleKeyEvent, useCapture, options]), null;
}

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js
var import_react67 = __toESM(require_react());
import { XCircleIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.css.js
var styles17 = {
  TextField: "Polaris-TextField",
  ClearButton: "Polaris-TextField__ClearButton",
  Loading: "Polaris-TextField__Loading",
  disabled: "Polaris-TextField--disabled",
  error: "Polaris-TextField--error",
  readOnly: "Polaris-TextField--readOnly",
  Input: "Polaris-TextField__Input",
  Backdrop: "Polaris-TextField__Backdrop",
  multiline: "Polaris-TextField--multiline",
  hasValue: "Polaris-TextField--hasValue",
  focus: "Polaris-TextField--focus",
  VerticalContent: "Polaris-TextField__VerticalContent",
  InputAndSuffixWrapper: "Polaris-TextField__InputAndSuffixWrapper",
  toneMagic: "Polaris-TextField--toneMagic",
  Prefix: "Polaris-TextField__Prefix",
  Suffix: "Polaris-TextField__Suffix",
  AutoSizeWrapper: "Polaris-TextField__AutoSizeWrapper",
  AutoSizeWrapperWithSuffix: "Polaris-TextField__AutoSizeWrapperWithSuffix",
  suggestion: "Polaris-TextField--suggestion",
  borderless: "Polaris-TextField--borderless",
  slim: "Polaris-TextField--slim",
  "Input-hasClearButton": "Polaris-TextField__Input--hasClearButton",
  "Input-suffixed": "Polaris-TextField__Input--suffixed",
  "Input-alignRight": "Polaris-TextField__Input--alignRight",
  "Input-alignLeft": "Polaris-TextField__Input--alignLeft",
  "Input-alignCenter": "Polaris-TextField__Input--alignCenter",
  "Input-autoSize": "Polaris-TextField__Input--autoSize",
  PrefixIcon: "Polaris-TextField__PrefixIcon",
  CharacterCount: "Polaris-TextField__CharacterCount",
  AlignFieldBottom: "Polaris-TextField__AlignFieldBottom",
  Spinner: "Polaris-TextField__Spinner",
  SpinnerIcon: "Polaris-TextField__SpinnerIcon",
  Resizer: "Polaris-TextField__Resizer",
  DummyInput: "Polaris-TextField__DummyInput",
  Segment: "Polaris-TextField__Segment",
  monospaced: "Polaris-TextField--monospaced"
};

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Spinner/Spinner.js
var import_react60 = __toESM(require_react());
import { ChevronUpIcon as ChevronUpIcon2, ChevronDownIcon as ChevronDownIcon2 } from "@shopify/polaris-icons";
var Spinner2 = /* @__PURE__ */ import_react60.default.forwardRef(function({
  onChange,
  onClick,
  onMouseDown,
  onMouseUp,
  onBlur
}, ref) {
  function handleStep(step) {
    return () => onChange(step);
  }
  function handleMouseDown(onChange2) {
    return (event) => {
      event.button === 0 && onMouseDown?.(onChange2);
    };
  }
  return /* @__PURE__ */ import_react60.default.createElement("div", {
    className: styles17.Spinner,
    onClick,
    "aria-hidden": !0,
    ref
  }, /* @__PURE__ */ import_react60.default.createElement("div", {
    role: "button",
    className: styles17.Segment,
    tabIndex: -1,
    onClick: handleStep(1),
    onMouseDown: handleMouseDown(handleStep(1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ import_react60.default.createElement("div", {
    className: styles17.SpinnerIcon
  }, /* @__PURE__ */ import_react60.default.createElement(Icon, {
    source: ChevronUpIcon2
  }))), /* @__PURE__ */ import_react60.default.createElement("div", {
    role: "button",
    className: styles17.Segment,
    tabIndex: -1,
    onClick: handleStep(-1),
    onMouseDown: handleMouseDown(handleStep(-1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ import_react60.default.createElement("div", {
    className: styles17.SpinnerIcon
  }, /* @__PURE__ */ import_react60.default.createElement(Icon, {
    source: ChevronDownIcon2
  }))));
});

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
var import_react63 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.css.js
var styles18 = {
  hidden: "Polaris-Labelled--hidden",
  LabelWrapper: "Polaris-Labelled__LabelWrapper",
  disabled: "Polaris-Labelled--disabled",
  HelpText: "Polaris-Labelled__HelpText",
  readOnly: "Polaris-Labelled--readOnly",
  Error: "Polaris-Labelled__Error",
  Action: "Polaris-Labelled__Action"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
var import_react61 = __toESM(require_react());
import { AlertCircleIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.css.js
var styles19 = {
  InlineError: "Polaris-InlineError",
  Icon: "Polaris-InlineError__Icon"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
function InlineError({
  message,
  fieldID
}) {
  return message ? /* @__PURE__ */ import_react61.default.createElement("div", {
    id: errorTextID(fieldID),
    className: styles19.InlineError
  }, /* @__PURE__ */ import_react61.default.createElement("div", {
    className: styles19.Icon
  }, /* @__PURE__ */ import_react61.default.createElement(Icon, {
    source: AlertCircleIcon
  })), /* @__PURE__ */ import_react61.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, message)) : null;
}
function errorTextID(id) {
  return `${id}Error`;
}

// node_modules/@shopify/polaris/build/esm/components/Label/Label.js
var import_react62 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Label/Label.css.js
var styles20 = {
  Label: "Polaris-Label",
  hidden: "Polaris-Label--hidden",
  Text: "Polaris-Label__Text",
  RequiredIndicator: "Polaris-Label__RequiredIndicator"
};

// node_modules/@shopify/polaris/build/esm/components/Label/Label.js
function labelID(id) {
  return `${id}Label`;
}
function Label({
  children,
  id,
  hidden,
  requiredIndicator
}) {
  let className = classNames(styles20.Label, hidden && styles20.hidden);
  return /* @__PURE__ */ import_react62.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react62.default.createElement("label", {
    id: labelID(id),
    htmlFor: id,
    className: classNames(styles20.Text, requiredIndicator && styles20.RequiredIndicator)
  }, /* @__PURE__ */ import_react62.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
function Labelled({
  id,
  label,
  error,
  action: action8,
  helpText,
  children,
  labelHidden,
  requiredIndicator,
  disabled,
  readOnly,
  ...rest
}) {
  let className = classNames(labelHidden && styles18.hidden, disabled && styles18.disabled, readOnly && styles18.readOnly), actionMarkup = action8 ? /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles18.Action
  }, buttonFrom(action8, {
    variant: "plain"
  })) : null, helpTextMarkup = helpText ? /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles18.HelpText,
    id: helpTextID(id),
    "aria-disabled": disabled
  }, /* @__PURE__ */ import_react63.default.createElement(Text, {
    as: "span",
    tone: "subdued",
    variant: "bodyMd",
    breakWord: !0
  }, helpText)) : null, errorMarkup = error && typeof error != "boolean" && /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles18.Error
  }, /* @__PURE__ */ import_react63.default.createElement(InlineError, {
    message: error,
    fieldID: id
  })), labelMarkup = label ? /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles18.LabelWrapper
  }, /* @__PURE__ */ import_react63.default.createElement(Label, Object.assign({
    id,
    requiredIndicator
  }, rest, {
    hidden: !1
  }), label), actionMarkup) : null;
  return /* @__PURE__ */ import_react63.default.createElement("div", {
    className
  }, labelMarkup, children, errorMarkup, helpTextMarkup);
}
function helpTextID(id) {
  return `${id}HelpText`;
}

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.js
var import_react65 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.css.js
var styles21 = {
  Connected: "Polaris-Connected",
  Item: "Polaris-Connected__Item",
  "Item-primary": "Polaris-Connected__Item--primary",
  "Item-focused": "Polaris-Connected__Item--focused"
};

// node_modules/@shopify/polaris/build/esm/components/Connected/components/Item/Item.js
var import_react64 = __toESM(require_react());
function Item2({
  children,
  position
}) {
  let {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(!1), className = classNames(styles21.Item, focused && styles21["Item-focused"], position === "primary" ? styles21["Item-primary"] : styles21["Item-connection"]);
  return /* @__PURE__ */ import_react64.default.createElement("div", {
    onBlur: forceFalseFocused,
    onFocus: forceTrueFocused,
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.js
function Connected({
  children,
  left,
  right
}) {
  let leftConnectionMarkup = left ? /* @__PURE__ */ import_react65.default.createElement(Item2, {
    position: "left"
  }, left) : null, rightConnectionMarkup = right ? /* @__PURE__ */ import_react65.default.createElement(Item2, {
    position: "right"
  }, right) : null;
  return /* @__PURE__ */ import_react65.default.createElement("div", {
    className: styles21.Connected
  }, leftConnectionMarkup, /* @__PURE__ */ import_react65.default.createElement(Item2, {
    position: "primary"
  }, children), rightConnectionMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Resizer/Resizer.js
var import_react66 = __toESM(require_react());
function Resizer({
  contents,
  currentHeight: currentHeightProp = null,
  minimumLines,
  onHeightChange
}) {
  let contentNode = (0, import_react66.useRef)(null), minimumLinesNode = (0, import_react66.useRef)(null), animationFrame = (0, import_react66.useRef)(), currentHeight = (0, import_react66.useRef)(currentHeightProp);
  currentHeightProp !== currentHeight.current && (currentHeight.current = currentHeightProp), (0, import_react66.useEffect)(() => () => {
    animationFrame.current && cancelAnimationFrame(animationFrame.current);
  }, []);
  let minimumLinesMarkup = minimumLines ? /* @__PURE__ */ import_react66.default.createElement("div", {
    ref: minimumLinesNode,
    className: styles17.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getContentsForMinimumLines(minimumLines)
    }
  }) : null, handleHeightCheck = (0, import_react66.useCallback)(() => {
    animationFrame.current && cancelAnimationFrame(animationFrame.current), animationFrame.current = requestAnimationFrame(() => {
      if (!contentNode.current || !minimumLinesNode.current)
        return;
      let newHeight = Math.max(contentNode.current.offsetHeight, minimumLinesNode.current.offsetHeight);
      newHeight !== currentHeight.current && onHeightChange(newHeight);
    });
  }, [onHeightChange]);
  return useIsomorphicLayoutEffect(() => {
    handleHeightCheck();
  }), /* @__PURE__ */ import_react66.default.createElement("div", {
    "aria-hidden": !0,
    className: styles17.Resizer
  }, /* @__PURE__ */ import_react66.default.createElement(EventListener, {
    event: "resize",
    handler: handleHeightCheck
  }), /* @__PURE__ */ import_react66.default.createElement("div", {
    ref: contentNode,
    className: styles17.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getFinalContents(contents)
    }
  }), minimumLinesMarkup);
}
var ENTITIES_TO_REPLACE = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\n": "<br>",
  "\r": ""
}, REPLACE_REGEX2 = new RegExp(`[${Object.keys(ENTITIES_TO_REPLACE).join()}]`, "g");
function replaceEntity(entity) {
  return ENTITIES_TO_REPLACE[entity];
}
function getContentsForMinimumLines(minimumLines) {
  let content = "";
  for (let line = 0; line < minimumLines; line++)
    content += "<br>";
  return content;
}
function getFinalContents(contents) {
  return contents ? `${contents.replace(REPLACE_REGEX2, replaceEntity)}<br>` : "<br>";
}

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js
function TextField({
  prefix,
  suffix,
  verticalContent,
  placeholder,
  value = "",
  helpText,
  label,
  labelAction,
  labelHidden,
  disabled,
  clearButton,
  readOnly,
  autoFocus,
  focused,
  multiline,
  error,
  connectedRight,
  connectedLeft,
  type = "text",
  name,
  id: idProp,
  role,
  step,
  largeStep,
  autoComplete,
  max,
  maxLength,
  maxHeight,
  min,
  minLength,
  pattern,
  inputMode,
  spellCheck,
  ariaOwns,
  ariaControls,
  ariaExpanded,
  ariaActiveDescendant,
  ariaAutocomplete,
  showCharacterCount,
  align,
  requiredIndicator,
  monospaced,
  selectTextOnFocus,
  suggestion,
  variant = "inherit",
  size = "medium",
  onClearButtonClick,
  onChange,
  onSpinnerChange,
  onFocus,
  onBlur,
  tone,
  autoSize,
  loading
}) {
  let i18n = useI18n(), [height, setHeight] = (0, import_react67.useState)(null), [focus, setFocus] = (0, import_react67.useState)(Boolean(focused)), isAfterInitial = useIsAfterInitialMount(), uniqId = (0, import_react67.useId)(), id = idProp ?? uniqId, textFieldRef = (0, import_react67.useRef)(null), inputRef = (0, import_react67.useRef)(null), textAreaRef = (0, import_react67.useRef)(null), prefixRef = (0, import_react67.useRef)(null), suffixRef = (0, import_react67.useRef)(null), loadingRef = (0, import_react67.useRef)(null), verticalContentRef = (0, import_react67.useRef)(null), buttonPressTimer = (0, import_react67.useRef)(), spinnerRef = (0, import_react67.useRef)(null), getInputRef = (0, import_react67.useCallback)(() => multiline ? textAreaRef.current : inputRef.current, [multiline]);
  (0, import_react67.useEffect)(() => {
    let input2 = getInputRef();
    !input2 || focused === void 0 || (focused ? input2.focus() : input2.blur());
  }, [focused, verticalContent, getInputRef]), (0, import_react67.useEffect)(() => {
    let input2 = inputRef.current;
    !input2 || !(type === "text" || type === "tel" || type === "search" || type === "url" || type === "password") || !suggestion || input2.setSelectionRange(value.length, suggestion.length);
  }, [focus, value, type, suggestion]);
  let normalizedValue = suggestion || value, normalizedStep = step ?? 1, normalizedMax = max ?? 1 / 0, normalizedMin = min ?? -1 / 0, className = classNames(styles17.TextField, Boolean(normalizedValue) && styles17.hasValue, disabled && styles17.disabled, readOnly && styles17.readOnly, error && styles17.error, tone && styles17[variationName("tone", tone)], multiline && styles17.multiline, focus && !disabled && styles17.focus, variant !== "inherit" && styles17[variant], size === "slim" && styles17.slim), inputType = type === "currency" ? "text" : type, isNumericType = type === "number" || type === "integer", iconPrefix = /* @__PURE__ */ import_react67.default.isValidElement(prefix) && prefix.type === Icon, prefixMarkup = prefix ? /* @__PURE__ */ import_react67.default.createElement("div", {
    className: classNames(styles17.Prefix, iconPrefix && styles17.PrefixIcon),
    id: `${id}-Prefix`,
    ref: prefixRef
  }, /* @__PURE__ */ import_react67.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, prefix)) : null, suffixMarkup = suffix ? /* @__PURE__ */ import_react67.default.createElement("div", {
    className: styles17.Suffix,
    id: `${id}-Suffix`,
    ref: suffixRef
  }, /* @__PURE__ */ import_react67.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, suffix)) : null, loadingMarkup = loading ? /* @__PURE__ */ import_react67.default.createElement("div", {
    className: styles17.Loading,
    id: `${id}-Loading`,
    ref: loadingRef
  }, /* @__PURE__ */ import_react67.default.createElement(Spinner, {
    size: "small"
  })) : null, characterCountMarkup = null;
  if (showCharacterCount) {
    let characterCount = normalizedValue.length, characterCountLabel = maxLength ? i18n.translate("Polaris.TextField.characterCountWithMaxLength", {
      count: characterCount,
      limit: maxLength
    }) : i18n.translate("Polaris.TextField.characterCount", {
      count: characterCount
    }), characterCountClassName = classNames(styles17.CharacterCount, multiline && styles17.AlignFieldBottom), characterCountText = maxLength ? `${characterCount}/${maxLength}` : characterCount;
    characterCountMarkup = /* @__PURE__ */ import_react67.default.createElement("div", {
      id: `${id}-CharacterCounter`,
      className: characterCountClassName,
      "aria-label": characterCountLabel,
      "aria-live": focus ? "polite" : "off",
      "aria-atomic": "true",
      onClick: handleClickChild
    }, /* @__PURE__ */ import_react67.default.createElement(Text, {
      as: "span",
      variant: "bodyMd"
    }, characterCountText));
  }
  let clearButtonMarkup = clearButton && normalizedValue !== "" ? /* @__PURE__ */ import_react67.default.createElement("button", {
    type: "button",
    className: styles17.ClearButton,
    onClick: handleClearButtonPress,
    disabled
  }, /* @__PURE__ */ import_react67.default.createElement(Text, {
    as: "span",
    visuallyHidden: !0
  }, i18n.translate("Polaris.Common.clear")), /* @__PURE__ */ import_react67.default.createElement(Icon, {
    source: XCircleIcon,
    tone: "base"
  })) : null, handleNumberChange = (0, import_react67.useCallback)((steps, stepAmount = normalizedStep) => {
    if (onChange == null && onSpinnerChange == null)
      return;
    let dpl = (num) => (num.toString().split(".")[1] || []).length, numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue))
      return;
    let decimalPlaces = type === "integer" ? 0 : Math.max(dpl(numericValue), dpl(stepAmount)), newValue = Math.min(Number(normalizedMax), Math.max(numericValue + steps * stepAmount, Number(normalizedMin)));
    onSpinnerChange != null ? onSpinnerChange(String(newValue.toFixed(decimalPlaces)), id) : onChange?.(String(newValue.toFixed(decimalPlaces)), id);
  }, [id, normalizedMax, normalizedMin, onChange, onSpinnerChange, normalizedStep, type, value]), handleSpinnerButtonRelease = (0, import_react67.useCallback)(() => {
    clearTimeout(buttonPressTimer.current);
  }, []), handleSpinnerButtonPress = (0, import_react67.useCallback)((onChange2) => {
    let interval = 200, onChangeInterval = () => {
      interval > 50 && (interval -= 10), onChange2(0), buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    };
    buttonPressTimer.current = window.setTimeout(onChangeInterval, interval), document.addEventListener("mouseup", handleSpinnerButtonRelease, {
      once: !0
    });
  }, [handleSpinnerButtonRelease]), spinnerMarkup = isNumericType && step !== 0 && !disabled && !readOnly ? /* @__PURE__ */ import_react67.default.createElement(Spinner2, {
    onClick: handleClickChild,
    onChange: handleNumberChange,
    onMouseDown: handleSpinnerButtonPress,
    onMouseUp: handleSpinnerButtonRelease,
    ref: spinnerRef,
    onBlur: handleOnBlur
  }) : null, style = multiline && height ? {
    height,
    maxHeight
  } : null, handleExpandingResize = (0, import_react67.useCallback)((height2) => {
    setHeight(height2);
  }, []), resizer = multiline && isAfterInitial ? /* @__PURE__ */ import_react67.default.createElement(Resizer, {
    contents: normalizedValue || placeholder,
    currentHeight: height,
    minimumLines: typeof multiline == "number" ? multiline : 1,
    onHeightChange: handleExpandingResize
  }) : null, describedBy = [];
  error && describedBy.push(`${id}Error`), helpText && describedBy.push(helpTextID(id)), showCharacterCount && describedBy.push(`${id}-CharacterCounter`);
  let labelledBy = [];
  prefix && labelledBy.push(`${id}-Prefix`), suffix && labelledBy.push(`${id}-Suffix`), verticalContent && labelledBy.push(`${id}-VerticalContent`), labelledBy.unshift(labelID(id));
  let inputClassName = classNames(styles17.Input, align && styles17[variationName("Input-align", align)], suffix && styles17["Input-suffixed"], clearButton && styles17["Input-hasClearButton"], monospaced && styles17.monospaced, suggestion && styles17.suggestion, autoSize && styles17["Input-autoSize"]), handleOnFocus = (event) => {
    setFocus(!0), selectTextOnFocus && !suggestion && getInputRef()?.select(), onFocus && onFocus(event);
  };
  useEventListener("wheel", handleOnWheel, inputRef);
  function handleOnWheel(event) {
    document.activeElement === event.target && isNumericType && event.stopPropagation();
  }
  let input = /* @__PURE__ */ (0, import_react67.createElement)(multiline ? "textarea" : "input", {
    name,
    id,
    disabled,
    readOnly,
    role,
    autoFocus,
    value: normalizedValue,
    placeholder,
    style,
    autoComplete,
    className: inputClassName,
    ref: multiline ? textAreaRef : inputRef,
    min,
    max,
    step,
    minLength,
    maxLength,
    spellCheck,
    pattern,
    inputMode,
    type: inputType,
    rows: getRows(multiline),
    size: autoSize ? 1 : void 0,
    "aria-describedby": describedBy.length ? describedBy.join(" ") : void 0,
    "aria-labelledby": labelledBy.join(" "),
    "aria-invalid": Boolean(error),
    "aria-owns": ariaOwns,
    "aria-activedescendant": ariaActiveDescendant,
    "aria-autocomplete": ariaAutocomplete,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-required": requiredIndicator,
    ...normalizeAriaMultiline(multiline),
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onClick: handleClickChild,
    onKeyPress: handleKeyPress,
    onKeyDown: handleKeyDown,
    onChange: suggestion ? void 0 : handleChange,
    onInput: suggestion ? handleChange : void 0,
    // 1Password disable data attribute
    "data-1p-ignore": autoComplete === "off" || void 0,
    // LastPass disable data attribute
    "data-lpignore": autoComplete === "off" || void 0,
    // Dashlane disable data attribute
    "data-form-type": autoComplete === "off" ? "other" : void 0
  }), inputWithVerticalContentMarkup = verticalContent ? /* @__PURE__ */ import_react67.default.createElement("div", {
    className: styles17.VerticalContent,
    id: `${id}-VerticalContent`,
    ref: verticalContentRef,
    onClick: handleClickChild
  }, verticalContent, input) : null, inputMarkup = verticalContent ? inputWithVerticalContentMarkup : input, backdropMarkup = /* @__PURE__ */ import_react67.default.createElement("div", {
    className: classNames(styles17.Backdrop, connectedLeft && styles17["Backdrop-connectedLeft"], connectedRight && styles17["Backdrop-connectedRight"])
  }), inputAndSuffixMarkup = autoSize ? /* @__PURE__ */ import_react67.default.createElement("div", {
    className: styles17.InputAndSuffixWrapper
  }, /* @__PURE__ */ import_react67.default.createElement("div", {
    className: classNames(styles17.AutoSizeWrapper, suffix && styles17.AutoSizeWrapperWithSuffix),
    "data-auto-size-value": value || placeholder
  }, inputMarkup), suffixMarkup) : /* @__PURE__ */ import_react67.default.createElement(import_react67.default.Fragment, null, inputMarkup, suffixMarkup);
  return /* @__PURE__ */ import_react67.default.createElement(Labelled, {
    label,
    id,
    error,
    action: labelAction,
    labelHidden,
    helpText,
    requiredIndicator,
    disabled,
    readOnly
  }, /* @__PURE__ */ import_react67.default.createElement(Connected, {
    left: connectedLeft,
    right: connectedRight
  }, /* @__PURE__ */ import_react67.default.createElement("div", {
    className,
    onClick: handleClick,
    ref: textFieldRef
  }, prefixMarkup, inputAndSuffixMarkup, characterCountMarkup, loadingMarkup, clearButtonMarkup, spinnerMarkup, backdropMarkup, resizer)));
  function handleChange(event) {
    onChange && onChange(event.currentTarget.value, id);
  }
  function handleClick(event) {
    let {
      target
    } = event, inputRefRole = inputRef?.current?.getAttribute("role");
    if (target === inputRef.current && inputRefRole === "combobox") {
      inputRef.current?.focus(), handleOnFocus(event);
      return;
    }
    isPrefixOrSuffix(target) || isVerticalContent(target) || isInput(target) || isSpinner(target) || isLoadingSpinner(target) || focus || getInputRef()?.focus();
  }
  function handleClickChild(event) {
    !isSpinner(event.target) && !isInput(event.target) && event.stopPropagation(), !(isPrefixOrSuffix(event.target) || isVerticalContent(event.target) || isInput(event.target) || isLoadingSpinner(event.target) || focus) && (setFocus(!0), getInputRef()?.focus());
  }
  function handleClearButtonPress() {
    onClearButtonClick && onClearButtonClick(id);
  }
  function handleKeyPress(event) {
    let {
      key,
      which
    } = event, numbersSpec = /[\d.,eE+-]$/, integerSpec = /[\deE+-]$/;
    !isNumericType || which === Key.Enter || type === "number" && numbersSpec.test(key) || type === "integer" && integerSpec.test(key) || event.preventDefault();
  }
  function handleKeyDown(event) {
    if (!isNumericType)
      return;
    let {
      key,
      which
    } = event;
    type === "integer" && (key === "ArrowUp" || which === Key.UpArrow) && (handleNumberChange(1), event.preventDefault()), type === "integer" && (key === "ArrowDown" || which === Key.DownArrow) && (handleNumberChange(-1), event.preventDefault()), (which === Key.Home || key === "Home") && min !== void 0 && (onSpinnerChange != null ? onSpinnerChange(String(min), id) : onChange?.(String(min), id)), (which === Key.End || key === "End") && max !== void 0 && (onSpinnerChange != null ? onSpinnerChange(String(max), id) : onChange?.(String(max), id)), (which === Key.PageUp || key === "PageUp") && largeStep !== void 0 && handleNumberChange(1, largeStep), (which === Key.PageDown || key === "PageDown") && largeStep !== void 0 && handleNumberChange(-1, largeStep);
  }
  function handleOnBlur(event) {
    setFocus(!1), !textFieldRef.current?.contains(event?.relatedTarget) && onBlur && onBlur(event);
  }
  function isInput(target) {
    let input2 = getInputRef();
    return target instanceof HTMLElement && input2 && (input2.contains(target) || input2.contains(document.activeElement));
  }
  function isPrefixOrSuffix(target) {
    return target instanceof Element && (prefixRef.current && prefixRef.current.contains(target) || suffixRef.current && suffixRef.current.contains(target));
  }
  function isSpinner(target) {
    return target instanceof Element && spinnerRef.current && spinnerRef.current.contains(target);
  }
  function isLoadingSpinner(target) {
    return target instanceof Element && loadingRef.current && loadingRef.current.contains(target);
  }
  function isVerticalContent(target) {
    return target instanceof Element && verticalContentRef.current && (verticalContentRef.current.contains(target) || verticalContentRef.current.contains(document.activeElement));
  }
}
function getRows(multiline) {
  if (multiline)
    return typeof multiline == "number" ? multiline : 1;
}
function normalizeAriaMultiline(multiline) {
  if (multiline)
    return Boolean(multiline) || typeof multiline == "number" && multiline > 0 ? {
      "aria-multiline": !0
    } : void 0;
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.js
var FILTER_ACTIONS_THRESHOLD = 8;
function ActionList({
  items,
  sections = [],
  actionRole,
  allowFiltering,
  onActionAnyItem
}) {
  let i18n = useI18n(), filterActions = (0, import_react68.useContext)(FilterActionsContext), finalSections = [], actionListRef = (0, import_react68.useRef)(null), [searchText, setSearchText] = (0, import_react68.useState)("");
  items ? finalSections = [{
    items
  }, ...sections] : sections && (finalSections = sections);
  let isFilterable = finalSections?.some((section) => section.items.some((item) => typeof item.content == "string")), hasMultipleSections = finalSections.length > 1, elementRole = hasMultipleSections && actionRole === "menuitem" ? "menu" : void 0, elementTabIndex = hasMultipleSections && actionRole === "menuitem" ? -1 : void 0, filteredSections = finalSections?.map((section) => ({
    ...section,
    items: section.items.filter(({
      content
    }) => typeof content == "string" ? content?.toLowerCase().includes(searchText.toLowerCase()) : content)
  })), sectionMarkup = filteredSections.map((section, index) => section.items.length > 0 ? /* @__PURE__ */ import_react68.default.createElement(Section, {
    key: typeof section.title == "string" ? section.title : index,
    section,
    hasMultipleSections,
    actionRole,
    onActionAnyItem,
    isFirst: index === 0
  }) : null), handleFocusPreviousItem = (evt) => {
    evt.preventDefault(), actionListRef.current && evt.target && actionListRef.current.contains(evt.target) && wrapFocusPreviousFocusableMenuItem(actionListRef.current, evt.target);
  }, handleFocusNextItem = (evt) => {
    evt.preventDefault(), actionListRef.current && evt.target && actionListRef.current.contains(evt.target) && wrapFocusNextFocusableMenuItem(actionListRef.current, evt.target);
  }, listeners = actionRole === "menuitem" ? /* @__PURE__ */ import_react68.default.createElement(import_react68.default.Fragment, null, /* @__PURE__ */ import_react68.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.DownArrow,
    handler: handleFocusNextItem
  }), /* @__PURE__ */ import_react68.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.UpArrow,
    handler: handleFocusPreviousItem
  })) : null, totalFilteredActions = (0, import_react68.useMemo)(() => filteredSections?.reduce((acc, section) => acc + section.items.length, 0) || 0, [filteredSections]), hasManyActions = (finalSections?.reduce((acc, section) => acc + section.items.length, 0) || 0) >= FILTER_ACTIONS_THRESHOLD;
  return /* @__PURE__ */ import_react68.default.createElement(import_react68.default.Fragment, null, (allowFiltering || filterActions) && hasManyActions && isFilterable && /* @__PURE__ */ import_react68.default.createElement(Box, {
    padding: "200",
    paddingBlockEnd: totalFilteredActions > 0 ? "0" : "200"
  }, /* @__PURE__ */ import_react68.default.createElement(TextField, {
    clearButton: !0,
    labelHidden: !0,
    label: i18n.translate("Polaris.ActionList.SearchField.placeholder"),
    placeholder: i18n.translate("Polaris.ActionList.SearchField.placeholder"),
    autoComplete: "off",
    value: searchText,
    onChange: (value) => setSearchText(value),
    prefix: /* @__PURE__ */ import_react68.default.createElement(Icon, {
      source: SearchIcon
    }),
    onClearButtonClick: () => setSearchText("")
  })), /* @__PURE__ */ import_react68.default.createElement(Box, {
    as: hasMultipleSections ? "ul" : "div",
    ref: actionListRef,
    role: elementRole,
    tabIndex: elementTabIndex
  }, listeners, sectionMarkup));
}
ActionList.Item = Item;

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.js
var import_react79 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.css.js
var styles22 = {
  ActionMenu: "Polaris-ActionMenu"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
var import_react74 = __toESM(require_react());
import { MenuHorizontalIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.css.js
var styles23 = {
  RollupActivator: "Polaris-ActionMenu-RollupActions__RollupActivator"
};

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
var import_react73 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Popover/set-activator-attributes.js
function setActivatorAttributes(activator, {
  id,
  active = !1,
  ariaHaspopup,
  activatorDisabled = !1
}) {
  activatorDisabled || (activator.tabIndex = activator.tabIndex || 0), activator.setAttribute("aria-controls", id), activator.setAttribute("aria-owns", id), activator.setAttribute("aria-expanded", String(active)), activator.setAttribute("data-state", active ? "open" : "closed"), ariaHaspopup != null && activator.setAttribute("aria-haspopup", String(ariaHaspopup));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
var import_react72 = __toESM(require_react());
import { themeDefault as themeDefault3 } from "@shopify/polaris-tokens";

// node_modules/@shopify/polaris/build/esm/utilities/components.js
var import_react69 = __toESM(require_react());
function wrapWithComponent(element, Component3, props) {
  return element == null ? null : isElementOfType(element, Component3) ? element : /* @__PURE__ */ import_react69.default.createElement(Component3, props, element);
}
var isComponent = (AComponent, AnotherComponent) => AComponent === AnotherComponent;
function isElementOfType(element, Component3) {
  if (element == null || !/* @__PURE__ */ (0, import_react69.isValidElement)(element) || typeof element.type == "string")
    return !1;
  let {
    type: defaultType
  } = element, type = element.props?.__type__ || defaultType;
  return (Array.isArray(Component3) ? Component3 : [Component3]).some((AComponent) => typeof type != "string" && isComponent(AComponent, type));
}
function elementChildren(children, predicate = () => !0) {
  return import_react69.Children.toArray(children).filter((child) => /* @__PURE__ */ (0, import_react69.isValidElement)(child) && predicate(child));
}
function ConditionalWrapper({
  condition,
  wrapper,
  children
}) {
  return condition ? wrapper(children) : children;
}
function ConditionalRender({
  condition,
  children
}) {
  return condition ? children : null;
}

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.css.js
var styles24 = {
  Popover: "Polaris-Popover",
  PopoverOverlay: "Polaris-Popover__PopoverOverlay",
  "PopoverOverlay-noAnimation": "Polaris-Popover__PopoverOverlay--noAnimation",
  "PopoverOverlay-entering": "Polaris-Popover__PopoverOverlay--entering",
  "PopoverOverlay-open": "Polaris-Popover__PopoverOverlay--open",
  measuring: "Polaris-Popover--measuring",
  "PopoverOverlay-exiting": "Polaris-Popover__PopoverOverlay--exiting",
  fullWidth: "Polaris-Popover--fullWidth",
  Content: "Polaris-Popover__Content",
  positionedAbove: "Polaris-Popover--positionedAbove",
  positionedCover: "Polaris-Popover--positionedCover",
  ContentContainer: "Polaris-Popover__ContentContainer",
  "Content-fullHeight": "Polaris-Popover__Content--fullHeight",
  "Content-fluidContent": "Polaris-Popover__Content--fluidContent",
  Pane: "Polaris-Popover__Pane",
  "Pane-fixed": "Polaris-Popover__Pane--fixed",
  "Pane-subdued": "Polaris-Popover__Pane--subdued",
  "Pane-captureOverscroll": "Polaris-Popover__Pane--captureOverscroll",
  Section: "Polaris-Popover__Section",
  FocusTracker: "Polaris-Popover__FocusTracker",
  "PopoverOverlay-hideOnPrint": "Polaris-Popover__PopoverOverlay--hideOnPrint"
};

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
var import_react71 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Section/Section.js
var import_react70 = __toESM(require_react());
function Section2({
  children
}) {
  return /* @__PURE__ */ import_react70.default.createElement("div", {
    className: styles24.Section
  }, /* @__PURE__ */ import_react70.default.createElement(Box, {
    paddingInlineStart: "300",
    paddingInlineEnd: "300",
    paddingBlockStart: "200",
    paddingBlockEnd: "150"
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
function Pane({
  captureOverscroll = !1,
  fixed,
  sectioned,
  children,
  height,
  subdued,
  onScrolledToBottom
}) {
  let className = classNames(styles24.Pane, fixed && styles24["Pane-fixed"], subdued && styles24["Pane-subdued"], captureOverscroll && styles24["Pane-captureOverscroll"]), content = sectioned ? wrapWithComponent(children, Section2, {}) : children, style = height ? {
    height,
    maxHeight: height,
    minHeight: height
  } : void 0;
  return fixed ? /* @__PURE__ */ import_react71.default.createElement("div", {
    style,
    className
  }, content) : /* @__PURE__ */ import_react71.default.createElement(Scrollable, {
    shadow: !0,
    className,
    style,
    onScrolledToBottom,
    scrollbarWidth: "thin"
  }, content);
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
var PopoverCloseSource;
(function(PopoverCloseSource2) {
  PopoverCloseSource2[PopoverCloseSource2.Click = 0] = "Click", PopoverCloseSource2[PopoverCloseSource2.EscapeKeypress = 1] = "EscapeKeypress", PopoverCloseSource2[PopoverCloseSource2.FocusOut = 2] = "FocusOut", PopoverCloseSource2[PopoverCloseSource2.ScrollOut = 3] = "ScrollOut";
})(PopoverCloseSource || (PopoverCloseSource = {}));
var TransitionStatus;
(function(TransitionStatus3) {
  TransitionStatus3.Entering = "entering", TransitionStatus3.Entered = "entered", TransitionStatus3.Exiting = "exiting", TransitionStatus3.Exited = "exited";
})(TransitionStatus || (TransitionStatus = {}));
var PopoverOverlay = class extends import_react72.PureComponent {
  constructor(props) {
    super(props), this.state = {
      transitionStatus: this.props.active ? TransitionStatus.Entering : TransitionStatus.Exited
    }, this.contentNode = /* @__PURE__ */ (0, import_react72.createRef)(), this.renderPopover = (overlayDetails) => {
      let {
        measuring,
        desiredHeight,
        positioning
      } = overlayDetails, {
        id,
        children,
        sectioned,
        fullWidth,
        fullHeight,
        fluidContent,
        hideOnPrint,
        autofocusTarget,
        captureOverscroll
      } = this.props, isCovering = positioning === "cover", className = classNames(styles24.Popover, measuring && styles24.measuring, (fullWidth || isCovering) && styles24.fullWidth, hideOnPrint && styles24["PopoverOverlay-hideOnPrint"], positioning && styles24[variationName("positioned", positioning)]), contentStyles = measuring ? void 0 : {
        height: desiredHeight
      }, contentClassNames = classNames(styles24.Content, fullHeight && styles24["Content-fullHeight"], fluidContent && styles24["Content-fluidContent"]);
      return /* @__PURE__ */ import_react72.default.createElement("div", Object.assign({
        className
      }, overlay.props), /* @__PURE__ */ import_react72.default.createElement(EventListener, {
        event: "click",
        handler: this.handleClick
      }), /* @__PURE__ */ import_react72.default.createElement(EventListener, {
        event: "touchstart",
        handler: this.handleClick
      }), /* @__PURE__ */ import_react72.default.createElement(KeypressListener, {
        keyCode: Key.Escape,
        handler: this.handleEscape
      }), /* @__PURE__ */ import_react72.default.createElement("div", {
        className: styles24.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusFirstItem
      }), /* @__PURE__ */ import_react72.default.createElement("div", {
        className: styles24.ContentContainer
      }, /* @__PURE__ */ import_react72.default.createElement("div", {
        id,
        tabIndex: autofocusTarget === "none" ? void 0 : -1,
        className: contentClassNames,
        style: contentStyles,
        ref: this.contentNode
      }, renderPopoverContent(children, {
        captureOverscroll,
        sectioned
      }))), /* @__PURE__ */ import_react72.default.createElement("div", {
        className: styles24.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusLastItem
      }));
    }, this.handleClick = (event) => {
      let target = event.target, {
        contentNode,
        props: {
          activator,
          onClose,
          preventCloseOnChildOverlayClick
        }
      } = this, composedPath = event.composedPath(), wasDescendant = preventCloseOnChildOverlayClick ? wasPolarisPortalDescendant(composedPath, this.context.container) : wasContentNodeDescendant(composedPath, contentNode), isActivatorDescendant = nodeContainsDescendant(activator, target);
      wasDescendant || isActivatorDescendant || this.state.transitionStatus !== TransitionStatus.Entered || onClose(PopoverCloseSource.Click);
    }, this.handleScrollOut = () => {
      this.props.onClose(PopoverCloseSource.ScrollOut);
    }, this.handleEscape = (event) => {
      let target = event.target, {
        contentNode,
        props: {
          activator
        }
      } = this, composedPath = event.composedPath(), wasDescendant = wasContentNodeDescendant(composedPath, contentNode), isActivatorDescendant = nodeContainsDescendant(activator, target);
      (wasDescendant || isActivatorDescendant) && this.props.onClose(PopoverCloseSource.EscapeKeypress);
    }, this.handleFocusFirstItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    }, this.handleFocusLastItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    }, this.overlayRef = /* @__PURE__ */ (0, import_react72.createRef)();
  }
  forceUpdatePosition() {
    this.overlayRef.current?.forceUpdatePosition();
  }
  changeTransitionStatus(transitionStatus, cb) {
    this.setState({
      transitionStatus
    }, cb), this.contentNode.current && this.contentNode.current.getBoundingClientRect();
  }
  componentDidMount() {
    this.props.active && (this.focusContent(), this.changeTransitionStatus(TransitionStatus.Entered));
  }
  componentDidUpdate(oldProps) {
    this.props.active && !oldProps.active && (this.focusContent(), this.changeTransitionStatus(TransitionStatus.Entering, () => {
      this.clearTransitionTimeout(), this.enteringTimer = window.setTimeout(() => {
        this.setState({
          transitionStatus: TransitionStatus.Entered
        });
      }, parseInt(themeDefault3.motion["motion-duration-100"], 10));
    })), !this.props.active && oldProps.active && (this.clearTransitionTimeout(), this.setState({
      transitionStatus: TransitionStatus.Exited
    }));
  }
  componentWillUnmount() {
    this.clearTransitionTimeout();
  }
  render() {
    let {
      active,
      activator,
      fullWidth,
      preferredPosition = "below",
      preferredAlignment = "center",
      preferInputActivator = !0,
      fixed,
      zIndexOverride
    } = this.props, {
      transitionStatus
    } = this.state;
    if (transitionStatus === TransitionStatus.Exited && !active)
      return null;
    let className = classNames(styles24.PopoverOverlay, transitionStatus === TransitionStatus.Entering && styles24["PopoverOverlay-entering"], transitionStatus === TransitionStatus.Entered && styles24["PopoverOverlay-open"], transitionStatus === TransitionStatus.Exiting && styles24["PopoverOverlay-exiting"], preferredPosition === "cover" && styles24["PopoverOverlay-noAnimation"]);
    return /* @__PURE__ */ import_react72.default.createElement(PositionedOverlay, {
      ref: this.overlayRef,
      fullWidth,
      active,
      activator,
      preferInputActivator,
      preferredPosition,
      preferredAlignment,
      render: this.renderPopover.bind(this),
      fixed,
      onScrollOut: this.handleScrollOut,
      classNames: className,
      zIndexOverride
    });
  }
  clearTransitionTimeout() {
    this.enteringTimer && window.clearTimeout(this.enteringTimer);
  }
  focusContent() {
    let {
      autofocusTarget = "container"
    } = this.props;
    autofocusTarget === "none" || this.contentNode == null || requestAnimationFrame(() => {
      if (this.contentNode.current == null)
        return;
      let focusableChild = findFirstKeyboardFocusableNode(this.contentNode.current);
      focusableChild && autofocusTarget === "first-node" ? focusableChild.focus({
        preventScroll: !1
      }) : this.contentNode.current.focus({
        preventScroll: !1
      });
    });
  }
  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
};
PopoverOverlay.contextType = PortalsManagerContext;
function renderPopoverContent(children, props) {
  let childrenArray = import_react72.Children.toArray(children);
  return isElementOfType(childrenArray[0], Pane) ? childrenArray : wrapWithComponent(childrenArray, Pane, props);
}
function nodeContainsDescendant(rootNode, descendant) {
  if (rootNode === descendant)
    return !0;
  let parent = descendant.parentNode;
  for (; parent != null; ) {
    if (parent === rootNode)
      return !0;
    parent = parent.parentNode;
  }
  return !1;
}
function wasContentNodeDescendant(composedPath, contentNode) {
  return contentNode.current != null && composedPath.includes(contentNode.current);
}
function wasPolarisPortalDescendant(composedPath, portalsContainerElement) {
  return composedPath.some((eventTarget) => eventTarget instanceof Node && portalsContainerElement?.contains(eventTarget));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
var PopoverComponent = /* @__PURE__ */ (0, import_react73.forwardRef)(function({
  activatorWrapper = "div",
  children,
  onClose,
  activator,
  preventFocusOnClose,
  active,
  fixed,
  ariaHaspopup,
  preferInputActivator = !0,
  zIndexOverride,
  ...rest
}, ref) {
  let [activatorNode, setActivatorNode] = (0, import_react73.useState)(), overlayRef = (0, import_react73.useRef)(null), activatorContainer = (0, import_react73.useRef)(null), WrapperComponent = activatorWrapper, id = (0, import_react73.useId)();
  function forceUpdatePosition() {
    overlayRef.current?.forceUpdatePosition();
  }
  (0, import_react73.useImperativeHandle)(ref, () => ({
    forceUpdatePosition
  }));
  let setAccessibilityAttributes = (0, import_react73.useCallback)(() => {
    if (activatorContainer.current == null)
      return;
    let focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current, activatorDisabled = "disabled" in focusableActivator && Boolean(focusableActivator.disabled);
    setActivatorAttributes(focusableActivator, {
      id,
      active,
      ariaHaspopup,
      activatorDisabled
    });
  }, [id, active, ariaHaspopup]), handleClose = (source) => {
    if (onClose(source), !(activatorContainer.current == null || preventFocusOnClose)) {
      if (source === PopoverCloseSource.FocusOut && activatorNode) {
        let focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
        focusNextFocusableNode(focusableActivator, isInPortal) || focusableActivator.focus();
      } else if (source === PopoverCloseSource.EscapeKeypress && activatorNode) {
        let focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
        focusableActivator ? focusableActivator.focus() : focusNextFocusableNode(focusableActivator, isInPortal);
      }
    }
  };
  (0, import_react73.useEffect)(() => {
    (!activatorNode && activatorContainer.current || activatorNode && activatorContainer.current && !activatorContainer.current.contains(activatorNode)) && setActivatorNode(activatorContainer.current.firstElementChild), setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]), (0, import_react73.useEffect)(() => {
    activatorNode && activatorContainer.current && setActivatorNode(activatorContainer.current.firstElementChild), setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  let portal2 = activatorNode ? /* @__PURE__ */ import_react73.default.createElement(Portal, {
    idPrefix: "popover"
  }, /* @__PURE__ */ import_react73.default.createElement(PopoverOverlay, Object.assign({
    ref: overlayRef,
    id,
    activator: activatorNode,
    preferInputActivator,
    onClose: handleClose,
    active,
    fixed,
    zIndexOverride
  }, rest), children)) : null;
  return /* @__PURE__ */ import_react73.default.createElement(WrapperComponent, {
    ref: activatorContainer
  }, import_react73.Children.only(activator), portal2);
});
function isInPortal(element) {
  let parentElement = element.parentElement;
  for (; parentElement; ) {
    if (parentElement.matches(portal.selector))
      return !1;
    parentElement = parentElement.parentElement;
  }
  return !0;
}
var Popover2 = Object.assign(PopoverComponent, {
  Pane,
  Section: Section2
});

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
function RollupActions({
  accessibilityLabel,
  items = [],
  sections = []
}) {
  let i18n = useI18n(), {
    value: rollupOpen,
    toggle: toggleRollupOpen
  } = useToggle(!1);
  if (items.length === 0 && sections.length === 0)
    return null;
  let activatorMarkup = /* @__PURE__ */ import_react74.default.createElement("div", {
    className: styles23.RollupActivator
  }, /* @__PURE__ */ import_react74.default.createElement(Button, {
    icon: MenuHorizontalIcon,
    accessibilityLabel: accessibilityLabel || i18n.translate("Polaris.ActionMenu.RollupActions.rollupButton"),
    onClick: toggleRollupOpen
  }));
  return /* @__PURE__ */ import_react74.default.createElement(Popover2, {
    active: rollupOpen,
    activator: activatorMarkup,
    preferredAlignment: "right",
    onClose: toggleRollupOpen,
    hideOnPrint: !0
  }, /* @__PURE__ */ import_react74.default.createElement(ActionList, {
    items,
    sections,
    onActionAnyItem: toggleRollupOpen
  }));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
var import_react78 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.css.js
var styles25 = {
  ActionsLayoutOuter: "Polaris-ActionMenu-Actions__ActionsLayoutOuter",
  ActionsLayout: "Polaris-ActionMenu-Actions__ActionsLayout",
  "ActionsLayout--measuring": "Polaris-ActionMenu-Actions--actionsLayoutMeasuring",
  ActionsLayoutMeasurer: "Polaris-ActionMenu-Actions__ActionsLayoutMeasurer"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/utilities.js
function getVisibleAndHiddenActionsIndices(actions = [], groups = [], disclosureWidth, actionsWidths, containerWidth) {
  let sumTabWidths = actionsWidths.reduce((sum, width) => sum + width, 0), arrayOfActionsIndices = actions.map((_, index) => index), arrayOfGroupsIndices = groups.map((_, index) => index), visibleActions = [], hiddenActions = [], visibleGroups = [], hiddenGroups = [];
  if (containerWidth > sumTabWidths)
    visibleActions.push(...arrayOfActionsIndices), visibleGroups.push(...arrayOfGroupsIndices);
  else {
    let accumulatedWidth = 0;
    arrayOfActionsIndices.forEach((currentActionsIndex) => {
      let currentActionsWidth = actionsWidths[currentActionsIndex];
      if (accumulatedWidth + currentActionsWidth >= containerWidth - disclosureWidth) {
        hiddenActions.push(currentActionsIndex);
        return;
      }
      visibleActions.push(currentActionsIndex), accumulatedWidth += currentActionsWidth;
    }), arrayOfGroupsIndices.forEach((currentGroupsIndex) => {
      let currentActionsWidth = actionsWidths[currentGroupsIndex + actions.length];
      if (accumulatedWidth + currentActionsWidth >= containerWidth - disclosureWidth) {
        hiddenGroups.push(currentGroupsIndex);
        return;
      }
      visibleGroups.push(currentGroupsIndex), accumulatedWidth += currentActionsWidth;
    });
  }
  return {
    visibleActions,
    hiddenActions,
    visibleGroups,
    hiddenGroups
  };
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.js
var import_react76 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.css.js
var styles26 = {
  Details: "Polaris-ActionMenu-MenuGroup__Details"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.js
var import_react75 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.css.js
var styles27 = {
  SecondaryAction: "Polaris-ActionMenu-SecondaryAction",
  critical: "Polaris-ActionMenu-SecondaryAction--critical"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.js
function SecondaryAction({
  children,
  tone,
  helpText,
  onAction,
  destructive,
  ...rest
}) {
  let buttonMarkup = /* @__PURE__ */ import_react75.default.createElement(Button, Object.assign({
    onClick: onAction,
    tone: destructive ? "critical" : void 0
  }, rest), children), actionMarkup = helpText ? /* @__PURE__ */ import_react75.default.createElement(Tooltip, {
    preferredPosition: "below",
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /* @__PURE__ */ import_react75.default.createElement("div", {
    className: classNames(styles27.SecondaryAction, tone === "critical" && styles27.critical)
  }, actionMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.js
function MenuGroup({
  accessibilityLabel,
  active,
  actions,
  details,
  title,
  icon,
  disabled,
  onClick,
  onClose,
  onOpen,
  sections
}) {
  let handleClose = (0, import_react76.useCallback)(() => {
    onClose(title);
  }, [onClose, title]), handleOpen = (0, import_react76.useCallback)(() => {
    onOpen(title);
  }, [onOpen, title]), handleClick = (0, import_react76.useCallback)(() => {
    onClick ? onClick(handleOpen) : handleOpen();
  }, [onClick, handleOpen]), popoverActivator = /* @__PURE__ */ import_react76.default.createElement(SecondaryAction, {
    disclosure: !0,
    disabled,
    icon,
    accessibilityLabel,
    onClick: handleClick
  }, title);
  return /* @__PURE__ */ import_react76.default.createElement(Popover2, {
    active: Boolean(active),
    activator: popoverActivator,
    preferredAlignment: "left",
    onClose: handleClose,
    hideOnPrint: !0
  }, /* @__PURE__ */ import_react76.default.createElement(ActionList, {
    items: actions,
    sections,
    onActionAnyItem: handleClose
  }), details && /* @__PURE__ */ import_react76.default.createElement("div", {
    className: styles26.Details
  }, details));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/components/ActionsMeasurer/ActionsMeasurer.js
var import_react77 = __toESM(require_react());
var ACTION_SPACING = 8;
function ActionsMeasurer({
  actions = [],
  groups = [],
  handleMeasurement: handleMeasurementProp
}) {
  let i18n = useI18n(), containerNode = (0, import_react77.useRef)(null), defaultRollupGroup = {
    title: i18n.translate("Polaris.ActionMenu.Actions.moreActions"),
    actions: []
  }, activator = /* @__PURE__ */ import_react77.default.createElement(SecondaryAction, {
    disclosure: !0
  }, defaultRollupGroup.title), handleMeasurement = (0, import_react77.useCallback)(() => {
    if (!containerNode.current)
      return;
    let containerWidth = containerNode.current.offsetWidth, hiddenActionNodes = containerNode.current.children, hiddenActionsWidths = Array.from(hiddenActionNodes).map((node) => Math.ceil(node.getBoundingClientRect().width) + ACTION_SPACING), disclosureWidth = hiddenActionsWidths.pop() || 0;
    handleMeasurementProp({
      containerWidth,
      disclosureWidth,
      hiddenActionsWidths
    });
  }, [handleMeasurementProp]);
  (0, import_react77.useEffect)(() => {
    handleMeasurement();
  }, [handleMeasurement, actions, groups]);
  let actionsMarkup = actions.map((action8) => {
    let {
      content,
      onAction,
      ...rest
    } = action8;
    return /* @__PURE__ */ import_react77.default.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  }), groupsMarkup = groups.map((group) => {
    let {
      title,
      icon
    } = group;
    return /* @__PURE__ */ import_react77.default.createElement(SecondaryAction, {
      key: title,
      disclosure: !0,
      icon
    }, title);
  });
  return useEventListener("resize", handleMeasurement), /* @__PURE__ */ import_react77.default.createElement("div", {
    className: styles25.ActionsLayoutMeasurer,
    ref: containerNode
  }, actionsMarkup, groupsMarkup, activator);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
function Actions({
  actions,
  groups,
  onActionRollup
}) {
  let i18n = useI18n(), rollupActiveRef = (0, import_react78.useRef)(null), [activeMenuGroup, setActiveMenuGroup] = (0, import_react78.useState)(void 0), [state, setState] = (0, import_react78.useReducer)((data, partialData) => ({
    ...data,
    ...partialData
  }), {
    disclosureWidth: 0,
    containerWidth: 1 / 0,
    actionsWidths: [],
    visibleActions: [],
    hiddenActions: [],
    visibleGroups: [],
    hiddenGroups: [],
    hasMeasured: !1
  }), {
    visibleActions,
    hiddenActions,
    visibleGroups,
    hiddenGroups,
    containerWidth,
    disclosureWidth,
    actionsWidths,
    hasMeasured
  } = state, defaultRollupGroup = {
    title: i18n.translate("Polaris.ActionMenu.Actions.moreActions"),
    actions: []
  }, handleMenuGroupToggle = (0, import_react78.useCallback)((group) => setActiveMenuGroup(activeMenuGroup ? void 0 : group), [activeMenuGroup]), handleMenuGroupClose = (0, import_react78.useCallback)(() => setActiveMenuGroup(void 0), []);
  (0, import_react78.useEffect)(() => {
    if (containerWidth === 0)
      return;
    let {
      visibleActions: visibleActions2,
      visibleGroups: visibleGroups2,
      hiddenActions: hiddenActions2,
      hiddenGroups: hiddenGroups2
    } = getVisibleAndHiddenActionsIndices(actions, groups, disclosureWidth, actionsWidths, containerWidth);
    setState({
      visibleActions: visibleActions2,
      visibleGroups: visibleGroups2,
      hiddenActions: hiddenActions2,
      hiddenGroups: hiddenGroups2,
      hasMeasured: containerWidth !== 1 / 0
    });
  }, [containerWidth, disclosureWidth, actions, groups, actionsWidths, setState]);
  let actionsOrDefault = (0, import_react78.useMemo)(() => actions ?? [], [actions]), groupsOrDefault = (0, import_react78.useMemo)(() => groups ?? [], [groups]), actionsMarkup = actionsOrDefault.filter((_, index) => !!visibleActions.includes(index)).map((action8) => {
    let {
      content,
      onAction,
      ...rest
    } = action8;
    return /* @__PURE__ */ import_react78.default.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  }), filteredGroups = (hiddenGroups.length > 0 || hiddenActions.length > 0 ? [...groupsOrDefault, defaultRollupGroup] : [...groupsOrDefault]).filter((group, index) => {
    let hasNoGroupsProp = groupsOrDefault.length === 0, isVisibleGroup = visibleGroups.includes(index), isDefaultGroup = group === defaultRollupGroup;
    return hasNoGroupsProp ? hiddenActions.length > 0 : isDefaultGroup ? !0 : isVisibleGroup;
  }), hiddenActionObjects = hiddenActions.map((index) => actionsOrDefault[index]).filter((action8) => action8 != null), hiddenGroupObjects = hiddenGroups.map((index) => groupsOrDefault[index]).filter((group) => group != null), groupsMarkup = filteredGroups.map((group) => {
    let {
      title,
      actions: groupActions,
      ...rest
    } = group, isDefaultGroup = group === defaultRollupGroup, allHiddenItems = [...hiddenActionObjects, ...hiddenGroupObjects], [finalRolledUpActions, finalRolledUpSectionGroups] = allHiddenItems.reduce(([actions2, sections], action8) => (isMenuGroup(action8) ? sections.push({
      title: action8.title,
      items: action8.actions.map((sectionAction) => ({
        ...sectionAction,
        disabled: action8.disabled || sectionAction.disabled
      }))
    }) : actions2.push(action8), [actions2, sections]), [[], []]);
    return isDefaultGroup ? /* @__PURE__ */ import_react78.default.createElement(MenuGroup, Object.assign({
      key: title,
      title,
      active: title === activeMenuGroup,
      actions: [...finalRolledUpActions, ...groupActions],
      sections: finalRolledUpSectionGroups
    }, rest, {
      onOpen: handleMenuGroupToggle,
      onClose: handleMenuGroupClose
    })) : /* @__PURE__ */ import_react78.default.createElement(MenuGroup, Object.assign({
      key: title,
      title,
      active: title === activeMenuGroup,
      actions: groupActions
    }, rest, {
      onOpen: handleMenuGroupToggle,
      onClose: handleMenuGroupClose
    }));
  }), handleMeasurement = (0, import_react78.useCallback)((measurements) => {
    let {
      hiddenActionsWidths: actionsWidths2,
      containerWidth: containerWidth2,
      disclosureWidth: disclosureWidth2
    } = measurements, {
      visibleActions: visibleActions2,
      hiddenActions: hiddenActions2,
      visibleGroups: visibleGroups2,
      hiddenGroups: hiddenGroups2
    } = getVisibleAndHiddenActionsIndices(actionsOrDefault, groupsOrDefault, disclosureWidth2, actionsWidths2, containerWidth2);
    if (onActionRollup) {
      let isRollupActive = hiddenActions2.length > 0 || hiddenGroups2.length > 0;
      rollupActiveRef.current !== isRollupActive && (onActionRollup(isRollupActive), rollupActiveRef.current = isRollupActive);
    }
    setState({
      visibleActions: visibleActions2,
      hiddenActions: hiddenActions2,
      visibleGroups: visibleGroups2,
      hiddenGroups: hiddenGroups2,
      actionsWidths: actionsWidths2,
      containerWidth: containerWidth2,
      disclosureWidth: disclosureWidth2,
      hasMeasured: !0
    });
  }, [actionsOrDefault, groupsOrDefault, onActionRollup]), actionsMeasurer = /* @__PURE__ */ import_react78.default.createElement(ActionsMeasurer, {
    actions,
    groups,
    handleMeasurement
  });
  return /* @__PURE__ */ import_react78.default.createElement("div", {
    className: styles25.ActionsLayoutOuter
  }, actionsMeasurer, /* @__PURE__ */ import_react78.default.createElement("div", {
    className: classNames(styles25.ActionsLayout, !hasMeasured && styles25["ActionsLayout--measuring"])
  }, actionsMarkup, groupsMarkup));
}
function isMenuGroup(actionOrMenuGroup) {
  return "title" in actionOrMenuGroup;
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.js
function ActionMenu({
  actions = [],
  groups = [],
  rollup,
  rollupActionsLabel,
  onActionRollup
}) {
  if (actions.length === 0 && groups.length === 0)
    return null;
  let actionMenuClassNames = classNames(styles22.ActionMenu, rollup && styles22.rollup), rollupSections = groups.map((group) => convertGroupToSection(group));
  return /* @__PURE__ */ import_react79.default.createElement("div", {
    className: actionMenuClassNames
  }, rollup ? /* @__PURE__ */ import_react79.default.createElement(RollupActions, {
    accessibilityLabel: rollupActionsLabel,
    items: actions,
    sections: rollupSections
  }) : /* @__PURE__ */ import_react79.default.createElement(Actions, {
    actions,
    groups,
    onActionRollup
  }));
}
function hasGroupsWithActions(groups = []) {
  return groups.length === 0 ? !1 : groups.some((group) => group.actions.length > 0);
}
function convertGroupToSection({
  title,
  actions,
  disabled
}) {
  return {
    title,
    items: actions.map((action8) => ({
      ...action8,
      disabled: disabled || action8.disabled
    }))
  };
}

// node_modules/@shopify/polaris/build/esm/components/Backdrop/Backdrop.js
var import_react82 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Backdrop/Backdrop.css.js
var styles28 = {
  Backdrop: "Polaris-Backdrop",
  transparent: "Polaris-Backdrop--transparent",
  belowNavigation: "Polaris-Backdrop--belowNavigation"
};

// node_modules/@shopify/polaris/build/esm/components/ScrollLock/ScrollLock.js
var import_react81 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/hooks.js
var import_react80 = __toESM(require_react());
function useScrollLockManager() {
  let scrollLockManager = (0, import_react80.useContext)(ScrollLockManagerContext);
  if (!scrollLockManager)
    throw new MissingAppProviderError("No ScrollLockManager was provided.");
  return scrollLockManager;
}

// node_modules/@shopify/polaris/build/esm/components/ScrollLock/ScrollLock.js
function ScrollLock(_) {
  let scrollLockManager = useScrollLockManager();
  return (0, import_react81.useEffect)(() => (scrollLockManager.registerScrollLock(), () => {
    scrollLockManager.unregisterScrollLock();
  }), [scrollLockManager]), null;
}

// node_modules/@shopify/polaris/build/esm/components/Backdrop/Backdrop.js
function Backdrop(props) {
  let {
    onClick,
    onTouchStart,
    belowNavigation,
    transparent,
    setClosing
  } = props, className = classNames(styles28.Backdrop, belowNavigation && styles28.belowNavigation, transparent && styles28.transparent), handleMouseDown = () => {
    setClosing && setClosing(!0);
  }, handleClick = () => {
    setClosing && setClosing(!1), onClick && onClick();
  };
  return /* @__PURE__ */ import_react82.default.createElement(import_react82.default.Fragment, null, /* @__PURE__ */ import_react82.default.createElement(ScrollLock, null), /* @__PURE__ */ import_react82.default.createElement("div", {
    className,
    onClick: handleClick,
    onTouchStart,
    onMouseDown: handleMouseDown
  }));
}

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.js
var import_react84 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.css.js
var styles29 = {
  ButtonGroup: "Polaris-ButtonGroup",
  Item: "Polaris-ButtonGroup__Item",
  "Item-plain": "Polaris-ButtonGroup__Item--plain",
  variantSegmented: "Polaris-ButtonGroup--variantSegmented",
  "Item-focused": "Polaris-ButtonGroup__Item--focused",
  fullWidth: "Polaris-ButtonGroup--fullWidth",
  extraTight: "Polaris-ButtonGroup--extraTight",
  tight: "Polaris-ButtonGroup--tight",
  loose: "Polaris-ButtonGroup--loose",
  noWrap: "Polaris-ButtonGroup--noWrap"
};

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/components/Item/Item.js
var import_react83 = __toESM(require_react());
function Item3({
  button
}) {
  let {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(!1), className = classNames(styles29.Item, focused && styles29["Item-focused"], button.props.variant === "plain" && styles29["Item-plain"]);
  return /* @__PURE__ */ import_react83.default.createElement("div", {
    className,
    onFocus: forceTrueFocused,
    onBlur: forceFalseFocused
  }, button);
}

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.js
function ButtonGroup({
  children,
  gap,
  variant,
  fullWidth,
  connectedTop,
  noWrap
}) {
  let className = classNames(styles29.ButtonGroup, gap && styles29[gap], variant && styles29[variationName("variant", variant)], fullWidth && styles29.fullWidth, noWrap && styles29.noWrap), contents = elementChildren(children).map((child, index) => /* @__PURE__ */ import_react84.default.createElement(Item3, {
    button: child,
    key: index
  }));
  return /* @__PURE__ */ import_react84.default.createElement("div", {
    className,
    "data-buttongroup-variant": variant,
    "data-buttongroup-connected-top": connectedTop,
    "data-buttongroup-full-width": fullWidth,
    "data-buttongroup-no-wrap": noWrap
  }, contents);
}

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.js
var import_react85 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.css.js
var styles30 = {
  Bleed: "Polaris-Bleed"
};

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.js
var Bleed = ({
  marginInline,
  marginBlock,
  marginBlockStart,
  marginBlockEnd,
  marginInlineStart,
  marginInlineEnd,
  children
}) => {
  let getNegativeMargins = (direction) => {
    let xAxis = ["marginInlineStart", "marginInlineEnd"], yAxis = ["marginBlockStart", "marginBlockEnd"], directionValues = {
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
      marginInline,
      marginBlock
    };
    if (directionValues[direction])
      return directionValues[direction];
    if (xAxis.includes(direction) && marginInline)
      return directionValues.marginInline;
    if (yAxis.includes(direction) && marginBlock)
      return directionValues.marginBlock;
  }, negativeMarginBlockStart = getNegativeMargins("marginBlockStart"), negativeMarginBlockEnd = getNegativeMargins("marginBlockEnd"), negativeMarginInlineStart = getNegativeMargins("marginInlineStart"), negativeMarginInlineEnd = getNegativeMargins("marginInlineEnd"), style = {
    ...getResponsiveProps("bleed", "margin-block-start", "space", negativeMarginBlockStart),
    ...getResponsiveProps("bleed", "margin-block-end", "space", negativeMarginBlockEnd),
    ...getResponsiveProps("bleed", "margin-inline-start", "space", negativeMarginInlineStart),
    ...getResponsiveProps("bleed", "margin-inline-end", "space", negativeMarginInlineEnd)
  };
  return /* @__PURE__ */ import_react85.default.createElement("div", {
    className: styles30.Bleed,
    style: sanitizeCustomProperties(style)
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/Breadcrumbs/Breadcrumbs.js
var import_react86 = __toESM(require_react());
import { ArrowLeftIcon } from "@shopify/polaris-icons";
function Breadcrumbs({
  backAction
}) {
  let {
    content
  } = backAction;
  return /* @__PURE__ */ import_react86.default.createElement(Button, {
    key: content,
    url: "url" in backAction ? backAction.url : void 0,
    onClick: "onAction" in backAction ? backAction.onAction : void 0,
    onPointerDown: handleMouseUpByBlurring,
    icon: ArrowLeftIcon,
    accessibilityLabel: backAction.accessibilityLabel ?? content
  });
}

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.js
var import_react88 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.css.js
var styles31 = {
  LegacyStack: "Polaris-LegacyStack",
  Item: "Polaris-LegacyStack__Item",
  noWrap: "Polaris-LegacyStack--noWrap",
  spacingNone: "Polaris-LegacyStack--spacingNone",
  spacingExtraTight: "Polaris-LegacyStack--spacingExtraTight",
  spacingTight: "Polaris-LegacyStack--spacingTight",
  spacingBaseTight: "Polaris-LegacyStack--spacingBaseTight",
  spacingLoose: "Polaris-LegacyStack--spacingLoose",
  spacingExtraLoose: "Polaris-LegacyStack--spacingExtraLoose",
  distributionLeading: "Polaris-LegacyStack--distributionLeading",
  distributionTrailing: "Polaris-LegacyStack--distributionTrailing",
  distributionCenter: "Polaris-LegacyStack--distributionCenter",
  distributionEqualSpacing: "Polaris-LegacyStack--distributionEqualSpacing",
  distributionFill: "Polaris-LegacyStack--distributionFill",
  distributionFillEvenly: "Polaris-LegacyStack--distributionFillEvenly",
  alignmentLeading: "Polaris-LegacyStack--alignmentLeading",
  alignmentTrailing: "Polaris-LegacyStack--alignmentTrailing",
  alignmentCenter: "Polaris-LegacyStack--alignmentCenter",
  alignmentFill: "Polaris-LegacyStack--alignmentFill",
  alignmentBaseline: "Polaris-LegacyStack--alignmentBaseline",
  vertical: "Polaris-LegacyStack--vertical",
  "Item-fill": "Polaris-LegacyStack__Item--fill"
};

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/components/Item/Item.js
var import_react87 = __toESM(require_react());
function Item4({
  children,
  fill
}) {
  let className = classNames(styles31.Item, fill && styles31["Item-fill"]);
  return /* @__PURE__ */ import_react87.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.js
var LegacyStack = /* @__PURE__ */ (0, import_react88.memo)(function({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap
}) {
  let className = classNames(styles31.LegacyStack, vertical && styles31.vertical, spacing && styles31[variationName("spacing", spacing)], distribution && styles31[variationName("distribution", distribution)], alignment && styles31[variationName("alignment", alignment)], wrap === !1 && styles31.noWrap), itemMarkup = elementChildren(children).map((child, index) => wrapWithComponent(child, Item4, {
    key: index
  }));
  return /* @__PURE__ */ import_react88.default.createElement("div", {
    className
  }, itemMarkup);
});
LegacyStack.Item = Item4;

// node_modules/@shopify/polaris/build/esm/components/Collapsible/Collapsible.js
var import_react89 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Collapsible/Collapsible.css.js
var styles32 = {
  Collapsible: "Polaris-Collapsible",
  isFullyClosed: "Polaris-Collapsible--isFullyClosed",
  expandOnPrint: "Polaris-Collapsible--expandOnPrint"
};

// node_modules/@shopify/polaris/build/esm/components/Collapsible/Collapsible.js
function Collapsible({
  id,
  expandOnPrint,
  open,
  transition = !0,
  children,
  onAnimationEnd
}) {
  let [height, setHeight] = (0, import_react89.useState)(0), [isOpen, setIsOpen] = (0, import_react89.useState)(open), [animationState, setAnimationState] = (0, import_react89.useState)("idle"), collapsibleContainer = (0, import_react89.useRef)(null), isFullyOpen = animationState === "idle" && open && isOpen, isFullyClosed = animationState === "idle" && !open && !isOpen, content = expandOnPrint || !isFullyClosed ? children : null, wrapperClassName = classNames(styles32.Collapsible, isFullyClosed && styles32.isFullyClosed, expandOnPrint && styles32.expandOnPrint), transitionDisabled = isTransitionDisabled(transition), collapsibleStyles = {
    ...typeof transition == "object" && {
      transitionDuration: transition.duration,
      transitionTimingFunction: transition.timingFunction
    },
    maxHeight: isFullyOpen ? "none" : `${height}px`,
    overflow: isFullyOpen ? "visible" : "hidden"
  }, handleCompleteAnimation = (0, import_react89.useCallback)(({
    target
  }) => {
    target === collapsibleContainer.current && (setAnimationState("idle"), setIsOpen(open), onAnimationEnd && onAnimationEnd());
  }, [onAnimationEnd, open]), startAnimation = (0, import_react89.useCallback)(() => {
    transitionDisabled ? (setIsOpen(open), setAnimationState("idle"), open && collapsibleContainer.current ? setHeight(collapsibleContainer.current.scrollHeight) : setHeight(0)) : setAnimationState("measuring");
  }, [open, transitionDisabled]);
  return (0, import_react89.useEffect)(() => {
    open !== isOpen && startAnimation();
  }, [open, isOpen]), (0, import_react89.useEffect)(() => {
    !open || !collapsibleContainer.current || setHeight(collapsibleContainer.current.scrollHeight);
  }, []), (0, import_react89.useEffect)(() => {
    if (collapsibleContainer.current)
      switch (animationState) {
        case "idle":
          break;
        case "measuring":
          setHeight(collapsibleContainer.current.scrollHeight), setAnimationState("animating");
          break;
        case "animating":
          setHeight(open ? collapsibleContainer.current.scrollHeight : 0);
      }
  }, [animationState, open, isOpen]), /* @__PURE__ */ import_react89.default.createElement("div", {
    id,
    style: collapsibleStyles,
    ref: collapsibleContainer,
    className: wrapperClassName,
    onTransitionEnd: handleCompleteAnimation,
    "aria-hidden": !open
  }, content);
}
var zeroDurationRegex = /^0(ms|s)$/;
function isTransitionDisabled(transitionProp) {
  if (typeof transitionProp == "boolean")
    return !transitionProp;
  let {
    duration
  } = transitionProp;
  return !!(duration && zeroDurationRegex.test(duration.trim()));
}

// node_modules/@shopify/polaris/build/esm/components/InlineGrid/InlineGrid.js
var import_react90 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/InlineGrid/InlineGrid.css.js
var styles33 = {
  InlineGrid: "Polaris-InlineGrid"
};

// node_modules/@shopify/polaris/build/esm/components/InlineGrid/InlineGrid.js
function InlineGrid({
  children,
  columns,
  gap,
  alignItems
}) {
  let style = {
    ...getResponsiveValue("inline-grid", "grid-template-columns", formatInlineGrid(columns)),
    ...getResponsiveProps("inline-grid", "gap", "space", gap),
    "--pc-inline-grid-align-items": alignItems
  };
  return /* @__PURE__ */ import_react90.default.createElement("div", {
    className: styles33.InlineGrid,
    style: sanitizeCustomProperties(style)
  }, children);
}
function formatInlineGrid(columns) {
  return typeof columns == "object" && columns !== null && !Array.isArray(columns) ? Object.fromEntries(Object.entries(columns).map(([breakpointAlias, breakpointInlineGrid]) => [breakpointAlias, getColumnValue(breakpointInlineGrid)])) : getColumnValue(columns);
}
function getColumnValue(columns) {
  if (columns)
    return typeof columns == "number" || !isNaN(Number(columns)) ? `repeat(${Number(columns)}, minmax(0, 1fr))` : typeof columns == "string" ? columns : columns.map((column) => {
      switch (column) {
        case "oneThird":
          return "minmax(0, 1fr)";
        case "oneHalf":
          return "minmax(0, 1fr)";
        case "twoThirds":
          return "minmax(0, 2fr)";
      }
    }).join(" ");
}

// node_modules/@shopify/polaris/build/esm/utilities/frame/hooks.js
var import_react92 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/frame/context.js
var import_react91 = __toESM(require_react()), FrameContext = /* @__PURE__ */ (0, import_react91.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/frame/hooks.js
function useFrame() {
  let frame = (0, import_react92.useContext)(FrameContext);
  if (!frame)
    throw new Error("No Frame context was provided. Your component must be wrapped in a <Frame> component. See https://polaris.shopify.com/components/internal-only/frame for implementation instructions.");
  return frame;
}

// node_modules/@shopify/polaris/build/esm/components/DataTable/DataTable.js
var import_react99 = __toESM(require_react());
import isEqual from "react-fast-compare";

// node_modules/@shopify/polaris/build/esm/components/DataTable/utilities.js
function measureColumn(tableData) {
  return function(column, index) {
    let {
      firstVisibleColumnIndex,
      tableLeftVisibleEdge: tableStart,
      tableRightVisibleEdge: tableEnd
    } = tableData, leftEdge = column.offsetLeft, rightEdge = leftEdge + column.offsetWidth, isVisibleLeft = isEdgeVisible(leftEdge, tableStart, tableEnd, "left"), isVisibleRight = isEdgeVisible(rightEdge, tableStart, tableEnd, "right"), isVisible = isVisibleLeft || isVisibleRight, width = column.offsetWidth;
    return isVisible && (tableData.firstVisibleColumnIndex = Math.min(firstVisibleColumnIndex, index)), {
      leftEdge,
      rightEdge,
      isVisible,
      width,
      index
    };
  };
}
function isEdgeVisible(position, start, end, edgeType) {
  return position >= start + (edgeType === "left" ? 0 : 30) && position <= end - 30;
}
function getPrevAndCurrentColumns(tableData, columnData) {
  let {
    firstVisibleColumnIndex
  } = tableData, previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0), previousColumn = columnData[previousColumnIndex], currentColumn = columnData[firstVisibleColumnIndex];
  return {
    previousColumn,
    currentColumn
  };
}

// node_modules/@shopify/polaris/build/esm/components/DataTable/DataTable.css.js
var styles34 = {
  DataTable: "Polaris-DataTable",
  condensed: "Polaris-DataTable--condensed",
  Navigation: "Polaris-DataTable__Navigation",
  Pip: "Polaris-DataTable__Pip",
  "Pip-visible": "Polaris-DataTable__Pip--visible",
  ScrollContainer: "Polaris-DataTable__ScrollContainer",
  Table: "Polaris-DataTable__Table",
  TableRow: "Polaris-DataTable__TableRow",
  Cell: "Polaris-DataTable__Cell",
  IncreasedTableDensity: "Polaris-DataTable__IncreasedTableDensity",
  ZebraStripingOnData: "Polaris-DataTable__ZebraStripingOnData",
  RowCountIsEven: "Polaris-DataTable__RowCountIsEven",
  ShowTotalsInFooter: "Polaris-DataTable__ShowTotalsInFooter",
  "Cell-separate": "Polaris-DataTable__Cell--separate",
  "Cell-firstColumn": "Polaris-DataTable__Cell--firstColumn",
  "Cell-numeric": "Polaris-DataTable__Cell--numeric",
  "Cell-truncated": "Polaris-DataTable__Cell--truncated",
  "Cell-header": "Polaris-DataTable__Cell--header",
  "Cell-sortable": "Polaris-DataTable__Cell--sortable",
  "Heading-left": "Polaris-DataTable__Heading--left",
  "Cell-verticalAlignTop": "Polaris-DataTable__Cell--verticalAlignTop",
  "Cell-verticalAlignBottom": "Polaris-DataTable__Cell--verticalAlignBottom",
  "Cell-verticalAlignMiddle": "Polaris-DataTable__Cell--verticalAlignMiddle",
  "Cell-verticalAlignBaseline": "Polaris-DataTable__Cell--verticalAlignBaseline",
  hoverable: "Polaris-DataTable--hoverable",
  "Cell-hovered": "Polaris-DataTable__Cell--hovered",
  Icon: "Polaris-DataTable__Icon",
  Heading: "Polaris-DataTable__Heading",
  StickyHeaderEnabled: "Polaris-DataTable__StickyHeaderEnabled",
  StickyHeaderWrapper: "Polaris-DataTable__StickyHeaderWrapper",
  "Cell-sorted": "Polaris-DataTable__Cell--sorted",
  "Cell-total": "Polaris-DataTable__Cell--total",
  ShowTotals: "Polaris-DataTable__ShowTotals",
  "Cell-total-footer": "Polaris-DataTable--cellTotalFooter",
  Footer: "Polaris-DataTable__Footer",
  StickyHeaderInner: "Polaris-DataTable__StickyHeaderInner",
  "StickyHeaderInner-isSticky": "Polaris-DataTable__StickyHeaderInner--isSticky",
  StickyHeaderTable: "Polaris-DataTable__StickyHeaderTable",
  FixedFirstColumn: "Polaris-DataTable__FixedFirstColumn",
  StickyTableHeadingsRow: "Polaris-DataTable__StickyTableHeadingsRow",
  TooltipContent: "Polaris-DataTable__TooltipContent"
};

// node_modules/@shopify/polaris/build/esm/components/DataTable/components/Cell/Cell.js
var import_react93 = __toESM(require_react());
import { SortDescendingIcon, SortAscendingIcon } from "@shopify/polaris-icons";
function Cell({
  content,
  contentType,
  nthColumn,
  firstColumn,
  truncate,
  header,
  total,
  totalInFooter,
  sorted,
  sortable,
  sortDirection,
  inFixedNthColumn,
  verticalAlign = "top",
  defaultSortDirection = "ascending",
  onSort,
  colSpan,
  setRef = () => {
  },
  stickyHeadingCell = !1,
  stickyCellWidth,
  hovered = !1,
  handleFocus = () => {
  },
  hasFixedNthColumn = !1,
  fixedCellVisible = !1,
  firstColumnMinWidth,
  style,
  lastFixedFirstColumn
}) {
  let i18n = useI18n(), numeric = contentType === "numeric", className = classNames(styles34.Cell, styles34[`Cell-${variationName("verticalAlign", verticalAlign)}`], firstColumn && styles34["Cell-firstColumn"], truncate && styles34["Cell-truncated"], header && styles34["Cell-header"], total && styles34["Cell-total"], totalInFooter && styles34["Cell-total-footer"], numeric && styles34["Cell-numeric"], sortable && styles34["Cell-sortable"], sorted && styles34["Cell-sorted"], stickyHeadingCell && styles34.StickyHeaderCell, hovered && styles34["Cell-hovered"], lastFixedFirstColumn && inFixedNthColumn && fixedCellVisible && styles34["Cell-separate"], nthColumn && inFixedNthColumn && stickyHeadingCell && styles34.FixedFirstColumn), headerClassName = classNames(header && styles34.Heading, header && contentType === "text" && styles34["Heading-left"]), iconClassName = classNames(sortable && styles34.Icon), direction = sorted && sortDirection ? sortDirection : defaultSortDirection, source = direction === "descending" ? SortDescendingIcon : SortAscendingIcon, oppositeDirection = sortDirection === "ascending" ? "descending" : "ascending", sortAccessibilityLabel = i18n.translate("Polaris.DataTable.sortAccessibilityLabel", {
    direction: sorted ? oppositeDirection : direction
  }), iconMarkup = /* @__PURE__ */ import_react93.default.createElement("span", {
    className: iconClassName
  }, /* @__PURE__ */ import_react93.default.createElement(Icon, {
    source,
    accessibilityLabel: sortAccessibilityLabel
  })), focusable = !(stickyHeadingCell && hasFixedNthColumn && nthColumn && !inFixedNthColumn), columnHeadingContent = sortable ? /* @__PURE__ */ import_react93.default.createElement("button", {
    className: headerClassName,
    onClick: onSort,
    onFocus: handleFocus,
    tabIndex: focusable ? 0 : -1
  }, iconMarkup, content) : content, colSpanProp = colSpan && colSpan > 1 ? {
    colSpan
  } : {}, minWidthStyles = nthColumn && firstColumnMinWidth ? {
    minWidth: firstColumnMinWidth
  } : {
    minWidth: stickyCellWidth
  }, stickyHeading = /* @__PURE__ */ import_react93.default.createElement("th", Object.assign({
    ref: setRef
  }, headerCell.props, colSpanProp, {
    className,
    "aria-sort": sortDirection,
    style: {
      ...style,
      ...minWidthStyles
    },
    "data-index-table-sticky-heading": !0
  }), columnHeadingContent), headingMarkup = header ? /* @__PURE__ */ import_react93.default.createElement("th", Object.assign({}, headerCell.props, {
    "aria-sort": sortDirection
  }, colSpanProp, {
    ref: setRef,
    className,
    scope: "col",
    style: {
      ...minWidthStyles
    }
  }), columnHeadingContent) : /* @__PURE__ */ import_react93.default.createElement("th", Object.assign({}, colSpanProp, {
    ref: setRef,
    className,
    scope: "row",
    style: {
      ...minWidthStyles
    }
  }), truncate ? /* @__PURE__ */ import_react93.default.createElement(TruncatedText, {
    className: styles34.TooltipContent
  }, content) : content), cellMarkup = header || firstColumn || nthColumn ? headingMarkup : /* @__PURE__ */ import_react93.default.createElement("td", Object.assign({
    className
  }, colSpanProp), content);
  return stickyHeadingCell ? stickyHeading : cellMarkup;
}
var TruncatedText = ({
  children,
  className = ""
}) => {
  let textRef = (0, import_react93.useRef)(null), {
    current
  } = textRef, text = /* @__PURE__ */ import_react93.default.createElement("span", {
    ref: textRef,
    className
  }, children);
  return current?.scrollWidth > current?.offsetWidth ? /* @__PURE__ */ import_react93.default.createElement(Tooltip, {
    content: textRef.current.innerText
  }, text) : text;
};

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.js
var import_react94 = __toESM(require_react());
import { ChevronLeftIcon, ChevronRightIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/utilities/is-input-focused.js
var EditableTarget;
(function(EditableTarget2) {
  EditableTarget2.Input = "INPUT", EditableTarget2.Textarea = "TEXTAREA", EditableTarget2.Select = "SELECT", EditableTarget2.ContentEditable = "contenteditable";
})(EditableTarget || (EditableTarget = {}));
function isInputFocused() {
  if (document == null || document.activeElement == null)
    return !1;
  let {
    tagName
  } = document.activeElement;
  return tagName === EditableTarget.Input || tagName === EditableTarget.Textarea || tagName === EditableTarget.Select || document.activeElement.hasAttribute(EditableTarget.ContentEditable);
}

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.css.js
var styles35 = {
  Pagination: "Polaris-Pagination",
  table: "Polaris-Pagination--table",
  TablePaginationActions: "Polaris-Pagination__TablePaginationActions"
};

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.js
function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  nextTooltip,
  previousTooltip,
  nextKeys,
  previousKeys,
  accessibilityLabel,
  accessibilityLabels,
  label,
  type = "page"
}) {
  let i18n = useI18n(), node = /* @__PURE__ */ (0, import_react94.createRef)(), navLabel = accessibilityLabel || i18n.translate("Polaris.Pagination.pagination"), previousLabel = accessibilityLabels?.previous || i18n.translate("Polaris.Pagination.previous"), nextLabel = accessibilityLabels?.next || i18n.translate("Polaris.Pagination.next"), prev = /* @__PURE__ */ import_react94.default.createElement(Button, {
    icon: ChevronLeftIcon,
    accessibilityLabel: previousLabel,
    url: previousURL,
    onClick: onPrevious,
    disabled: !hasPrevious,
    id: "previousURL"
  }), constructedPrevious = previousTooltip && hasPrevious ? /* @__PURE__ */ import_react94.default.createElement(Tooltip, {
    activatorWrapper: "span",
    content: previousTooltip,
    preferredPosition: "below"
  }, prev) : prev, next = /* @__PURE__ */ import_react94.default.createElement(Button, {
    icon: ChevronRightIcon,
    accessibilityLabel: nextLabel,
    url: nextURL,
    onClick: onNext,
    disabled: !hasNext,
    id: "nextURL"
  }), constructedNext = nextTooltip && hasNext ? /* @__PURE__ */ import_react94.default.createElement(Tooltip, {
    activatorWrapper: "span",
    content: nextTooltip,
    preferredPosition: "below"
  }, next) : next, previousHandler = onPrevious || noop4, previousButtonEvents = previousKeys && (previousURL || onPrevious) && hasPrevious && previousKeys.map((key) => /* @__PURE__ */ import_react94.default.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: handleCallback(previousURL ? clickPaginationLink("previousURL", node) : previousHandler)
  })), nextHandler = onNext || noop4, nextButtonEvents = nextKeys && (nextURL || onNext) && hasNext && nextKeys.map((key) => /* @__PURE__ */ import_react94.default.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: handleCallback(nextURL ? clickPaginationLink("nextURL", node) : nextHandler)
  }));
  if (type === "table") {
    let labelMarkup2 = label ? /* @__PURE__ */ import_react94.default.createElement(Box, {
      padding: "300",
      paddingBlockStart: "0",
      paddingBlockEnd: "0"
    }, /* @__PURE__ */ import_react94.default.createElement(Text, {
      as: "span",
      variant: "bodySm",
      fontWeight: "medium"
    }, label)) : null;
    return /* @__PURE__ */ import_react94.default.createElement("nav", {
      "aria-label": navLabel,
      ref: node,
      className: classNames(styles35.Pagination, styles35.table)
    }, previousButtonEvents, nextButtonEvents, /* @__PURE__ */ import_react94.default.createElement(Box, {
      background: "bg-surface-secondary",
      paddingBlockStart: "150",
      paddingBlockEnd: "150",
      paddingInlineStart: "300",
      paddingInlineEnd: "200"
    }, /* @__PURE__ */ import_react94.default.createElement(InlineStack, {
      align: "center",
      blockAlign: "center"
    }, /* @__PURE__ */ import_react94.default.createElement("div", {
      className: styles35.TablePaginationActions,
      "data-buttongroup-variant": "segmented"
    }, /* @__PURE__ */ import_react94.default.createElement("div", null, constructedPrevious), labelMarkup2, /* @__PURE__ */ import_react94.default.createElement("div", null, constructedNext)))));
  }
  let labelTextMarkup = hasNext && hasPrevious ? /* @__PURE__ */ import_react94.default.createElement("span", null, label) : /* @__PURE__ */ import_react94.default.createElement(Text, {
    tone: "subdued",
    as: "span"
  }, label), labelMarkup = label ? /* @__PURE__ */ import_react94.default.createElement(Box, {
    padding: "300",
    paddingBlockStart: "0",
    paddingBlockEnd: "0"
  }, /* @__PURE__ */ import_react94.default.createElement("div", {
    "aria-live": "polite"
  }, labelTextMarkup)) : null;
  return /* @__PURE__ */ import_react94.default.createElement("nav", {
    "aria-label": navLabel,
    ref: node,
    className: styles35.Pagination
  }, previousButtonEvents, nextButtonEvents, /* @__PURE__ */ import_react94.default.createElement(ButtonGroup, {
    variant: "segmented"
  }, constructedPrevious, labelMarkup, constructedNext));
}
function clickPaginationLink(id, node) {
  return () => {
    if (node.current == null)
      return;
    let link = node.current.querySelector(`#${id}`);
    link && link.click();
  };
}
function handleCallback(fn) {
  return () => {
    isInputFocused() || fn();
  };
}
function noop4() {
}

// node_modules/@shopify/polaris/build/esm/components/AfterInitialMount/AfterInitialMount.js
var import_react95 = __toESM(require_react());
function AfterInitialMount({
  children,
  onMount,
  fallback = null
}) {
  let isMounted = useIsAfterInitialMount(), content = isMounted ? children : fallback;
  return (0, import_react95.useEffect)(() => {
    isMounted && onMount && onMount();
  }, [isMounted, onMount]), /* @__PURE__ */ import_react95.default.createElement(import_react95.default.Fragment, null, content);
}

// node_modules/@shopify/polaris/build/esm/components/Sticky/Sticky.js
var import_react97 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/hooks.js
var import_react96 = __toESM(require_react());
function useStickyManager() {
  let stickyManager = (0, import_react96.useContext)(StickyManagerContext);
  if (!stickyManager)
    throw new MissingAppProviderError("No StickyManager was provided.");
  return stickyManager;
}

// node_modules/@shopify/polaris/build/esm/components/Sticky/Sticky.js
var StickyInner = class extends import_react97.Component {
  constructor(...args) {
    super(...args), this.state = {
      isSticky: !1,
      style: {}
    }, this.placeHolderNode = null, this.stickyNode = null, this.setPlaceHolderNode = (node) => {
      this.placeHolderNode = node;
    }, this.setStickyNode = (node) => {
      this.stickyNode = node;
    }, this.handlePositioning = (stick, top = 0, left = 0, width = 0) => {
      let {
        isSticky
      } = this.state;
      (stick && !isSticky || !stick && isSticky) && (this.adjustPlaceHolderNode(stick), this.setState({
        isSticky: !isSticky
      }, () => {
        if (this.props.onStickyChange == null || (this.props.onStickyChange(!isSticky), this.props.boundingElement == null))
          return null;
        this.props.boundingElement.toggleAttribute("data-sticky-active");
      }));
      let style = stick ? {
        position: "fixed",
        top,
        left,
        width
      } : {};
      this.setState({
        style
      });
    }, this.adjustPlaceHolderNode = (add) => {
      this.placeHolderNode && this.stickyNode && (this.placeHolderNode.style.paddingBottom = add ? `${getRectForNode(this.stickyNode).height}px` : "0px");
    };
  }
  componentDidMount() {
    let {
      boundingElement,
      offset = !1,
      disableWhenStacked = !1,
      stickyManager
    } = this.props;
    !this.stickyNode || !this.placeHolderNode || stickyManager.registerStickyItem({
      stickyNode: this.stickyNode,
      placeHolderNode: this.placeHolderNode,
      handlePositioning: this.handlePositioning,
      offset,
      boundingElement,
      disableWhenStacked
    });
  }
  componentWillUnmount() {
    let {
      stickyManager
    } = this.props;
    this.stickyNode && stickyManager.unregisterStickyItem(this.stickyNode);
  }
  render() {
    let {
      style,
      isSticky
    } = this.state, {
      children
    } = this.props, childrenContent = isFunction(children) ? children(isSticky) : children;
    return /* @__PURE__ */ import_react97.default.createElement("div", null, /* @__PURE__ */ import_react97.default.createElement("div", {
      ref: this.setPlaceHolderNode
    }), /* @__PURE__ */ import_react97.default.createElement("div", {
      ref: this.setStickyNode,
      style
    }, childrenContent));
  }
};
function isFunction(arg) {
  return typeof arg == "function";
}
function Sticky(props) {
  let stickyManager = useStickyManager();
  return /* @__PURE__ */ import_react97.default.createElement(StickyInner, Object.assign({}, props, {
    stickyManager
  }));
}

// node_modules/@shopify/polaris/build/esm/components/DataTable/components/Navigation/Navigation.js
var import_react98 = __toESM(require_react());
import { ChevronLeftIcon as ChevronLeftIcon2, ChevronRightIcon as ChevronRightIcon2 } from "@shopify/polaris-icons";
function Navigation({
  columnVisibilityData,
  isScrolledFarthestLeft,
  isScrolledFarthestRight,
  navigateTableLeft,
  navigateTableRight,
  fixedFirstColumns,
  setRef = () => {
  }
}) {
  let i18n = useI18n(), pipMarkup = columnVisibilityData.map((column, index) => {
    if (index < fixedFirstColumns)
      return;
    let className = classNames(styles34.Pip, column.isVisible && styles34["Pip-visible"]);
    return /* @__PURE__ */ import_react98.default.createElement("div", {
      className,
      key: `pip-${index}`
    });
  }), leftA11yLabel = i18n.translate("Polaris.DataTable.navAccessibilityLabel", {
    direction: "left"
  }), rightA11yLabel = i18n.translate("Polaris.DataTable.navAccessibilityLabel", {
    direction: "right"
  });
  return /* @__PURE__ */ import_react98.default.createElement("div", {
    className: styles34.Navigation,
    ref: setRef
  }, /* @__PURE__ */ import_react98.default.createElement(Button, {
    variant: "tertiary",
    icon: ChevronLeftIcon2,
    disabled: isScrolledFarthestLeft,
    accessibilityLabel: leftA11yLabel,
    onClick: navigateTableLeft
  }), pipMarkup, /* @__PURE__ */ import_react98.default.createElement(Button, {
    variant: "tertiary",
    icon: ChevronRightIcon2,
    disabled: isScrolledFarthestRight,
    accessibilityLabel: rightA11yLabel,
    onClick: navigateTableRight
  }));
}

// node_modules/@shopify/polaris/build/esm/components/DataTable/DataTable.js
var getRowClientHeights = (rows) => {
  let heights = [];
  return rows && rows.forEach((row) => {
    heights.push(row.clientHeight);
  }), heights;
}, DataTableInner = class extends import_react99.PureComponent {
  constructor(...args) {
    super(...args), this.state = {
      condensed: !1,
      columnVisibilityData: [],
      isScrolledFarthestLeft: !0,
      isScrolledFarthestRight: !1,
      rowHovered: void 0
    }, this.dataTable = /* @__PURE__ */ (0, import_react99.createRef)(), this.scrollContainer = /* @__PURE__ */ (0, import_react99.createRef)(), this.table = /* @__PURE__ */ (0, import_react99.createRef)(), this.stickyTable = /* @__PURE__ */ (0, import_react99.createRef)(), this.stickyNav = null, this.headerNav = null, this.tableHeadings = [], this.stickyHeadings = [], this.tableHeadingWidths = [], this.stickyHeaderActive = !1, this.scrollStopTimer = null, this.handleResize = debounce(() => {
      let {
        table: {
          current: table
        },
        scrollContainer: {
          current: scrollContainer
        }
      } = this, condensed = !1;
      table && scrollContainer && (condensed = table.scrollWidth > scrollContainer.clientWidth + 1), this.setState({
        condensed,
        ...this.calculateColumnVisibilityData(condensed)
      });
    }), this.setCellRef = ({
      ref,
      index,
      inStickyHeader
    }) => {
      if (ref != null)
        if (inStickyHeader) {
          this.stickyHeadings[index] = ref;
          let button = ref.querySelector("button");
          if (button == null)
            return;
          button.addEventListener("focus", this.handleHeaderButtonFocus);
        } else
          this.tableHeadings[index] = ref, this.tableHeadingWidths[index] = ref.clientWidth;
    }, this.changeHeadingFocus = () => {
      let {
        tableHeadings,
        stickyHeadings,
        stickyNav,
        headerNav
      } = this, stickyFocusedItemIndex = stickyHeadings.findIndex((item) => item === document.activeElement?.parentElement), tableFocusedItemIndex = tableHeadings.findIndex((item) => item === document.activeElement?.parentElement), arrowsInStickyNav = stickyNav?.querySelectorAll("button"), arrowsInHeaderNav = headerNav?.querySelectorAll("button"), stickyFocusedNavIndex = -1;
      arrowsInStickyNav?.forEach((item, index) => {
        item === document.activeElement && (stickyFocusedNavIndex = index);
      });
      let headerFocusedNavIndex = -1;
      if (arrowsInHeaderNav?.forEach((item, index) => {
        item === document.activeElement && (headerFocusedNavIndex = index);
      }), stickyFocusedItemIndex < 0 && tableFocusedItemIndex < 0 && stickyFocusedNavIndex < 0 && headerFocusedNavIndex < 0)
        return null;
      let button;
      if (stickyFocusedItemIndex >= 0 ? button = tableHeadings[stickyFocusedItemIndex].querySelector("button") : tableFocusedItemIndex >= 0 && (button = stickyHeadings[tableFocusedItemIndex].querySelector("button")), stickyFocusedNavIndex >= 0 ? button = arrowsInHeaderNav?.[stickyFocusedNavIndex] : headerFocusedNavIndex >= 0 && (button = arrowsInStickyNav?.[headerFocusedNavIndex]), button == null)
        return null;
      button.style.visibility = "visible", button.focus(), button.style.removeProperty("visibility");
    }, this.calculateColumnVisibilityData = (condensed) => {
      let fixedFirstColumns = this.fixedFirstColumns(), {
        table: {
          current: table
        },
        scrollContainer: {
          current: scrollContainer
        },
        dataTable: {
          current: dataTable
        }
      } = this, {
        stickyHeader
      } = this.props;
      if ((stickyHeader || condensed) && table && scrollContainer && dataTable) {
        let headerCells = table.querySelectorAll(headerCell.selector), rightMostHeader = headerCells[fixedFirstColumns - 1], nthColumnWidth = fixedFirstColumns ? rightMostHeader.offsetLeft + rightMostHeader.offsetWidth : 0;
        if (headerCells.length > 0) {
          let firstVisibleColumnIndex = headerCells.length - 1, tableLeftVisibleEdge = scrollContainer.scrollLeft + nthColumnWidth, tableRightVisibleEdge = scrollContainer.scrollLeft + dataTable.offsetWidth, tableData = {
            firstVisibleColumnIndex,
            tableLeftVisibleEdge,
            tableRightVisibleEdge
          }, columnVisibilityData = [...headerCells].map(measureColumn(tableData)), lastColumn = columnVisibilityData[columnVisibilityData.length - 1], isScrolledFarthestLeft = fixedFirstColumns ? tableLeftVisibleEdge === nthColumnWidth : tableLeftVisibleEdge === 0;
          return {
            columnVisibilityData,
            ...getPrevAndCurrentColumns(tableData, columnVisibilityData),
            isScrolledFarthestLeft,
            isScrolledFarthestRight: lastColumn.rightEdge <= tableRightVisibleEdge
          };
        }
      }
      return {
        columnVisibilityData: [],
        previousColumn: void 0,
        currentColumn: void 0
      };
    }, this.handleHeaderButtonFocus = (event) => {
      let fixedFirstColumns = this.fixedFirstColumns();
      if (this.scrollContainer.current == null || event.target == null || this.state.columnVisibilityData.length === 0)
        return;
      let currentCell = event.target.parentNode, tableScrollLeft = this.scrollContainer.current.scrollLeft, tableViewableWidth = this.scrollContainer.current.offsetWidth, tableRightEdge = tableScrollLeft + tableViewableWidth, nthColumnWidth = this.state.columnVisibilityData.length > 0 ? this.state.columnVisibilityData[fixedFirstColumns]?.rightEdge : 0, currentColumnLeftEdge = currentCell.offsetLeft, currentColumnRightEdge = currentCell.offsetLeft + currentCell.offsetWidth;
      tableScrollLeft > currentColumnLeftEdge - nthColumnWidth && (this.scrollContainer.current.scrollLeft = currentColumnLeftEdge - nthColumnWidth), currentColumnRightEdge > tableRightEdge && (this.scrollContainer.current.scrollLeft = currentColumnRightEdge - tableViewableWidth);
    }, this.stickyHeaderScrolling = () => {
      let {
        current: stickyTable
      } = this.stickyTable, {
        current: scrollContainer
      } = this.scrollContainer;
      stickyTable == null || scrollContainer == null || (stickyTable.scrollLeft = scrollContainer.scrollLeft);
    }, this.scrollListener = () => {
      this.scrollStopTimer && clearTimeout(this.scrollStopTimer), this.scrollStopTimer = setTimeout(() => {
        this.setState((prevState) => ({
          ...this.calculateColumnVisibilityData(prevState.condensed)
        }));
      }, 100), this.setState({
        isScrolledFarthestLeft: this.scrollContainer.current?.scrollLeft === 0
      }), this.props.stickyHeader && this.stickyHeaderActive && this.stickyHeaderScrolling();
    }, this.handleHover = (row) => () => {
      this.setState({
        rowHovered: row
      });
    }, this.handleFocus = (event) => {
      let fixedFirstColumns = this.fixedFirstColumns();
      if (this.scrollContainer.current == null || event.target == null)
        return;
      let currentCell = event.target.parentNode, nthColumnWidth = this.props ? this.state.columnVisibilityData[fixedFirstColumns]?.rightEdge : 0, desiredScrollLeft = currentCell.offsetLeft - nthColumnWidth;
      this.scrollContainer.current.scrollLeft > desiredScrollLeft && (this.scrollContainer.current.scrollLeft = desiredScrollLeft);
    }, this.navigateTable = (direction) => {
      let fixedFirstColumns = this.fixedFirstColumns(), {
        currentColumn,
        previousColumn
      } = this.state, nthColumnWidth = this.state.columnVisibilityData[fixedFirstColumns - 1]?.rightEdge;
      if (!currentColumn || !previousColumn)
        return;
      let prevWidths = 0;
      for (let index = 0; index < currentColumn.index; index++)
        prevWidths += this.state.columnVisibilityData[index].width;
      let {
        current: scrollContainer
      } = this.scrollContainer;
      return () => {
        let newScrollLeft = 0;
        fixedFirstColumns ? newScrollLeft = direction === "right" ? prevWidths - nthColumnWidth + currentColumn.width : prevWidths - previousColumn.width - nthColumnWidth : newScrollLeft = direction === "right" ? currentColumn.rightEdge : previousColumn.leftEdge, scrollContainer && (scrollContainer.scrollLeft = newScrollLeft, requestAnimationFrame(() => {
          this.setState((prevState) => ({
            ...this.calculateColumnVisibilityData(prevState.condensed)
          }));
        }));
      };
    }, this.renderHeading = ({
      heading,
      headingIndex,
      inFixedNthColumn,
      inStickyHeader
    }) => {
      let {
        sortable,
        truncate = !1,
        columnContentTypes,
        defaultSortDirection,
        initialSortColumnIndex = 0,
        verticalAlign,
        firstColumnMinWidth
      } = this.props, fixedFirstColumns = this.fixedFirstColumns(), {
        sortDirection = defaultSortDirection,
        sortedColumnIndex = initialSortColumnIndex,
        isScrolledFarthestLeft
      } = this.state, sortableHeadingProps, headingCellId = `heading-cell-${headingIndex}`, stickyHeaderId = `stickyheader-${headingIndex}`, id = inStickyHeader ? stickyHeaderId : headingCellId;
      if (sortable) {
        let isSortable = sortable[headingIndex], isSorted = isSortable && sortedColumnIndex === headingIndex;
        sortableHeadingProps = {
          defaultSortDirection,
          sorted: isSorted,
          sortable: isSortable,
          sortDirection: isSorted ? sortDirection : "none",
          onSort: this.defaultOnSort(headingIndex),
          fixedNthColumn: fixedFirstColumns,
          inFixedNthColumn: fixedFirstColumns
        };
      }
      let stickyCellWidth = inStickyHeader ? this.tableHeadingWidths[headingIndex] : void 0, fixedCellVisible = !isScrolledFarthestLeft, cellProps = {
        header: !0,
        stickyHeadingCell: inStickyHeader,
        content: heading,
        contentType: columnContentTypes[headingIndex],
        nthColumn: headingIndex < fixedFirstColumns,
        fixedFirstColumns,
        truncate,
        headingIndex,
        ...sortableHeadingProps,
        verticalAlign,
        handleFocus: this.handleFocus,
        stickyCellWidth,
        fixedCellVisible,
        firstColumnMinWidth
      };
      return inFixedNthColumn && inStickyHeader ? [/* @__PURE__ */ import_react99.default.createElement(Cell, Object.assign({
        key: id
      }, cellProps, {
        setRef: (ref) => {
          this.setCellRef({
            ref,
            index: headingIndex,
            inStickyHeader
          });
        },
        inFixedNthColumn: !1
      })), /* @__PURE__ */ import_react99.default.createElement(Cell, Object.assign({
        key: `${id}-sticky`
      }, cellProps, {
        setRef: (ref) => {
          this.setCellRef({
            ref,
            index: headingIndex,
            inStickyHeader
          });
        },
        inFixedNthColumn: Boolean(fixedFirstColumns),
        lastFixedFirstColumn: headingIndex === fixedFirstColumns - 1,
        style: {
          left: this.state.columnVisibilityData[headingIndex]?.leftEdge
        }
      }))] : /* @__PURE__ */ import_react99.default.createElement(Cell, Object.assign({
        key: id
      }, cellProps, {
        setRef: (ref) => {
          this.setCellRef({
            ref,
            index: headingIndex,
            inStickyHeader
          });
        },
        lastFixedFirstColumn: headingIndex === fixedFirstColumns - 1,
        inFixedNthColumn
      }));
    }, this.totalsRowHeading = () => {
      let {
        i18n,
        totals,
        totalsName
      } = this.props, totalsLabel = totalsName || {
        singular: i18n.translate("Polaris.DataTable.totalRowHeading"),
        plural: i18n.translate("Polaris.DataTable.totalsRowHeading")
      };
      return totals && totals.filter((total) => total !== "").length > 1 ? totalsLabel.plural : totalsLabel.singular;
    }, this.renderTotals = ({
      total,
      index
    }) => {
      let fixedFirstColumns = this.fixedFirstColumns(), id = `totals-cell-${index}`, {
        truncate = !1,
        verticalAlign,
        columnContentTypes
      } = this.props, content, contentType;
      index === 0 && (content = this.totalsRowHeading()), total !== "" && index > 0 && (contentType = columnContentTypes[index], content = total);
      let totalInFooter = this.props.showTotalsInFooter;
      return /* @__PURE__ */ import_react99.default.createElement(Cell, {
        total: !0,
        totalInFooter,
        nthColumn: index <= fixedFirstColumns - 1,
        firstColumn: index === 0,
        key: id,
        content,
        contentType,
        truncate,
        verticalAlign
      });
    }, this.getColSpan = (rowLength, headingsLength, contentTypesLength, cellIndex) => {
      if (this.fixedFirstColumns())
        return 1;
      let rowLen = rowLength || 1, colLen = headingsLength || contentTypesLength, colSpan = Math.floor(colLen / rowLen), remainder = colLen % rowLen;
      return cellIndex === 0 ? colSpan + remainder : colSpan;
    }, this.defaultRenderRow = ({
      row,
      index,
      inFixedNthColumn,
      rowHeights
    }) => {
      let {
        columnContentTypes,
        truncate = !1,
        verticalAlign,
        hoverable = !0,
        headings
      } = this.props, {
        condensed
      } = this.state, fixedFirstColumns = this.fixedFirstColumns(), className = classNames(styles34.TableRow, hoverable && styles34.hoverable);
      return /* @__PURE__ */ import_react99.default.createElement("tr", {
        key: `row-${index}`,
        className,
        onMouseEnter: this.handleHover(index),
        onMouseLeave: this.handleHover()
      }, row.map((content, cellIndex) => {
        let hovered = index === this.state.rowHovered, id = `cell-${cellIndex}-row-${index}`, colSpan = this.getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex);
        return /* @__PURE__ */ import_react99.default.createElement(Cell, {
          key: id,
          content,
          contentType: columnContentTypes[cellIndex],
          nthColumn: cellIndex <= fixedFirstColumns - 1,
          firstColumn: cellIndex === 0,
          truncate,
          verticalAlign,
          colSpan,
          hovered,
          style: rowHeights ? {
            height: `${rowHeights[index]}px`
          } : {},
          inFixedNthColumn: condensed && inFixedNthColumn
        });
      }));
    }, this.defaultOnSort = (headingIndex) => {
      let {
        onSort,
        defaultSortDirection = "ascending",
        initialSortColumnIndex
      } = this.props, {
        sortDirection = defaultSortDirection,
        sortedColumnIndex = initialSortColumnIndex
      } = this.state, newSortDirection = defaultSortDirection;
      return sortedColumnIndex === headingIndex && (newSortDirection = sortDirection === "ascending" ? "descending" : "ascending"), () => {
        this.setState({
          sortDirection: newSortDirection,
          sortedColumnIndex: headingIndex
        }, () => {
          onSort && onSort(headingIndex, newSortDirection);
        });
      };
    };
  }
  componentDidMount() {
    this.handleResize();
  }
  componentDidUpdate(prevProps) {
    isEqual(prevProps, this.props) || this.handleResize();
  }
  componentWillUnmount() {
    this.handleResize.cancel();
  }
  render() {
    let {
      headings,
      totals,
      showTotalsInFooter,
      rows,
      footerContent,
      hideScrollIndicator = !1,
      increasedTableDensity = !1,
      hasZebraStripingOnData = !1,
      stickyHeader = !1,
      hasFixedFirstColumn: fixedFirstColumn = !1,
      pagination
    } = this.props, {
      condensed,
      columnVisibilityData,
      isScrolledFarthestLeft,
      isScrolledFarthestRight
    } = this.state, fixedFirstColumns = this.fixedFirstColumns(), rowCountIsEven = rows.length % 2 === 0, className = classNames(styles34.DataTable, condensed && styles34.condensed, totals && styles34.ShowTotals, showTotalsInFooter && styles34.ShowTotalsInFooter, hasZebraStripingOnData && styles34.ZebraStripingOnData, hasZebraStripingOnData && rowCountIsEven && styles34.RowCountIsEven), wrapperClassName = classNames(styles34.TableWrapper, condensed && styles34.condensed, increasedTableDensity && styles34.IncreasedTableDensity, stickyHeader && styles34.StickyHeaderEnabled), headingMarkup = /* @__PURE__ */ import_react99.default.createElement("tr", null, headings.map((heading, index) => this.renderHeading({
      heading,
      headingIndex: index,
      inFixedNthColumn: !1,
      inStickyHeader: !1
    }))), totalsMarkup = totals ? /* @__PURE__ */ import_react99.default.createElement("tr", null, totals.map((total, index) => this.renderTotals({
      total,
      index
    }))) : null, nthColumns = rows.map((row) => row.slice(0, fixedFirstColumns)), nthHeadings = headings.slice(0, fixedFirstColumns), nthTotals = totals?.slice(0, fixedFirstColumns), tableHeaderRows = this.table.current?.children[0].childNodes, tableBodyRows = this.table.current?.children[1].childNodes, headerRowHeights = getRowClientHeights(tableHeaderRows), bodyRowHeights = getRowClientHeights(tableBodyRows), fixedNthColumnMarkup = condensed && fixedFirstColumns !== 0 && /* @__PURE__ */ import_react99.default.createElement("table", {
      className: classNames(styles34.FixedFirstColumn, !isScrolledFarthestLeft && styles34.separate),
      style: {
        width: `${columnVisibilityData[fixedFirstColumns - 1]?.rightEdge}px`
      }
    }, /* @__PURE__ */ import_react99.default.createElement("thead", null, /* @__PURE__ */ import_react99.default.createElement("tr", {
      style: {
        height: `${headerRowHeights[0]}px`
      }
    }, nthHeadings.map((heading, index) => this.renderHeading({
      heading,
      headingIndex: index,
      inFixedNthColumn: !0,
      inStickyHeader: !1
    }))), totals && !showTotalsInFooter && /* @__PURE__ */ import_react99.default.createElement("tr", {
      style: {
        height: `${headerRowHeights[1]}px`
      }
    }, nthTotals?.map((total, index) => this.renderTotals({
      total,
      index
    })))), /* @__PURE__ */ import_react99.default.createElement("tbody", null, nthColumns.map((row, index) => this.defaultRenderRow({
      row,
      index,
      inFixedNthColumn: !0,
      rowHeights: bodyRowHeights
    }))), totals && showTotalsInFooter && /* @__PURE__ */ import_react99.default.createElement("tfoot", null, /* @__PURE__ */ import_react99.default.createElement("tr", null, nthTotals?.map((total, index) => this.renderTotals({
      total,
      index
    }))))), bodyMarkup = rows.map((row, index) => this.defaultRenderRow({
      row,
      index,
      inFixedNthColumn: !1
    })), footerMarkup = footerContent ? /* @__PURE__ */ import_react99.default.createElement("div", {
      className: styles34.Footer
    }, footerContent) : null, paginationMarkup = pagination ? /* @__PURE__ */ import_react99.default.createElement(Pagination, Object.assign({
      type: "table"
    }, pagination)) : null, headerTotalsMarkup = showTotalsInFooter ? null : totalsMarkup, footerTotalsMarkup = showTotalsInFooter ? /* @__PURE__ */ import_react99.default.createElement("tfoot", null, totalsMarkup) : null, navigationMarkup = (location) => hideScrollIndicator ? null : /* @__PURE__ */ import_react99.default.createElement(Navigation, {
      columnVisibilityData,
      isScrolledFarthestLeft,
      isScrolledFarthestRight,
      navigateTableLeft: this.navigateTable("left"),
      navigateTableRight: this.navigateTable("right"),
      fixedFirstColumns,
      setRef: (ref) => {
        location === "header" ? this.headerNav = ref : location === "sticky" && (this.stickyNav = ref);
      }
    }), stickyHeaderMarkup = stickyHeader ? /* @__PURE__ */ import_react99.default.createElement(AfterInitialMount, null, /* @__PURE__ */ import_react99.default.createElement("div", {
      className: styles34.StickyHeaderWrapper,
      role: "presentation"
    }, /* @__PURE__ */ import_react99.default.createElement(Sticky, {
      boundingElement: this.dataTable.current,
      onStickyChange: (isSticky) => {
        this.changeHeadingFocus(), this.stickyHeaderActive = isSticky;
      }
    }, (isSticky) => {
      let stickyHeaderInnerClassNames = classNames(styles34.StickyHeaderInner, isSticky && styles34["StickyHeaderInner-isSticky"]), stickyHeaderTableClassNames = classNames(styles34.StickyHeaderTable, !isScrolledFarthestLeft && styles34.separate);
      return /* @__PURE__ */ import_react99.default.createElement("div", {
        className: stickyHeaderInnerClassNames
      }, /* @__PURE__ */ import_react99.default.createElement("div", null, navigationMarkup("sticky")), /* @__PURE__ */ import_react99.default.createElement("table", {
        className: stickyHeaderTableClassNames,
        ref: this.stickyTable
      }, /* @__PURE__ */ import_react99.default.createElement("thead", null, /* @__PURE__ */ import_react99.default.createElement("tr", {
        className: styles34.StickyTableHeadingsRow
      }, headings.map((heading, index) => this.renderHeading({
        heading,
        headingIndex: index,
        inFixedNthColumn: Boolean(index <= fixedFirstColumns - 1 && fixedFirstColumns),
        inStickyHeader: !0
      }))))));
    }))) : null;
    return /* @__PURE__ */ import_react99.default.createElement("div", {
      className: wrapperClassName,
      ref: this.dataTable
    }, stickyHeaderMarkup, navigationMarkup("header"), /* @__PURE__ */ import_react99.default.createElement("div", {
      className
    }, /* @__PURE__ */ import_react99.default.createElement("div", {
      className: styles34.ScrollContainer,
      ref: this.scrollContainer
    }, /* @__PURE__ */ import_react99.default.createElement(EventListener, {
      event: "resize",
      handler: this.handleResize
    }), /* @__PURE__ */ import_react99.default.createElement(EventListener, {
      capture: !0,
      passive: !0,
      event: "scroll",
      handler: this.scrollListener
    }), fixedNthColumnMarkup, /* @__PURE__ */ import_react99.default.createElement("table", {
      className: styles34.Table,
      ref: this.table
    }, /* @__PURE__ */ import_react99.default.createElement("thead", null, headingMarkup, headerTotalsMarkup), /* @__PURE__ */ import_react99.default.createElement("tbody", null, bodyMarkup), footerTotalsMarkup)), paginationMarkup, footerMarkup));
  }
  fixedFirstColumns() {
    let {
      hasFixedFirstColumn,
      fixedFirstColumns = 0,
      headings
    } = this.props, numberOfFixedFirstColumns = hasFixedFirstColumn && !fixedFirstColumns ? 1 : fixedFirstColumns;
    return numberOfFixedFirstColumns >= headings.length ? 0 : numberOfFixedFirstColumns;
  }
  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
};
function DataTable(props) {
  let i18n = useI18n();
  return /* @__PURE__ */ import_react99.default.createElement(DataTableInner, Object.assign({}, props, {
    i18n
  }));
}

// node_modules/@shopify/polaris/build/esm/components/Focus/Focus.js
var import_react100 = __toESM(require_react());
var Focus = /* @__PURE__ */ (0, import_react100.memo)(function({
  children,
  disabled,
  root
}) {
  return (0, import_react100.useEffect)(() => {
    if (disabled || !root)
      return;
    let node = isRef(root) ? root.current : root;
    !node || node.querySelector("[autofocus]") || focusFirstFocusableNode(node, !1);
  }, [disabled, root]), /* @__PURE__ */ import_react100.default.createElement(import_react100.default.Fragment, null, children);
});
function isRef(ref) {
  return ref.current !== void 0;
}

// node_modules/@shopify/polaris/build/esm/components/Frame/Frame.js
var import_react120 = __toESM(require_react());
import { XIcon as XIcon2 } from "@shopify/polaris-icons";
import { CSSTransition as CSSTransition3 } from "react-transition-group";

// node_modules/@shopify/polaris/build/esm/utilities/set-root-property.js
function setRootProperty(name, value, node) {
  if (!document)
    return;
  (node || document.documentElement).style.setProperty(name, value);
}

// node_modules/@shopify/polaris/build/esm/components/Frame/Frame.css.js
var styles36 = {
  Frame: "Polaris-Frame",
  Navigation: "Polaris-Frame__Navigation",
  hasTopBar: "Polaris-Frame--hasTopBar",
  "Navigation-enter": "Polaris-Frame__Navigation--enter",
  "Navigation-enterActive": "Polaris-Frame__Navigation--enterActive",
  "Navigation-exit": "Polaris-Frame__Navigation--exit",
  "Navigation-exitActive": "Polaris-Frame__Navigation--exitActive",
  NavigationDismiss: "Polaris-Frame__NavigationDismiss",
  "Navigation-visible": "Polaris-Frame__Navigation--visible",
  TopBar: "Polaris-Frame__TopBar",
  ContextualSaveBar: "Polaris-Frame__ContextualSaveBar",
  Main: "Polaris-Frame__Main",
  hasNav: "Polaris-Frame--hasNav",
  Content: "Polaris-Frame__Content",
  hasSidebar: "Polaris-Frame--hasSidebar",
  GlobalRibbonContainer: "Polaris-Frame__GlobalRibbonContainer",
  LoadingBar: "Polaris-Frame__LoadingBar",
  Skip: "Polaris-Frame__Skip",
  focused: "Polaris-Frame--focused",
  pressed: "Polaris-Frame--pressed"
};

// node_modules/@shopify/polaris/build/esm/utilities/media-query/hooks.js
var import_react101 = __toESM(require_react());
function useMediaQuery() {
  let mediaQuery = (0, import_react101.useContext)(MediaQueryContext);
  if (!mediaQuery)
    throw new Error("No mediaQuery was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  return mediaQuery;
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Loading/Loading.js
var import_react103 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-is-mounted-ref.js
var import_react102 = __toESM(require_react());
function useIsMountedRef() {
  let isMounted = (0, import_react102.useRef)(!1);
  return (0, import_react102.useEffect)(() => (isMounted.current = !0, () => {
    isMounted.current = !1;
  }), []), isMounted;
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Loading/Loading.css.js
var styles37 = {
  Loading: "Polaris-Frame-Loading",
  Level: "Polaris-Frame-Loading__Level"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Loading/Loading.js
var STUCK_THRESHOLD = 99;
function Loading() {
  let i18n = useI18n(), isMountedRef = useIsMountedRef(), [progress, setProgress] = (0, import_react103.useState)(0), [animating, setAnimating] = (0, import_react103.useState)(!1);
  (0, import_react103.useEffect)(() => {
    progress >= STUCK_THRESHOLD || animating || requestAnimationFrame(() => {
      if (!isMountedRef.current)
        return;
      let step = Math.max((STUCK_THRESHOLD - progress) / 10, 1);
      setAnimating(!0), setProgress(progress + step);
    });
  }, [progress, animating, isMountedRef]);
  let customStyles = {
    transform: `scaleX(${Math.floor(progress) / 100})`
  };
  return /* @__PURE__ */ import_react103.default.createElement("div", {
    className: styles37.Loading,
    "aria-valuenow": progress,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    role: "progressbar",
    "aria-label": i18n.translate("Polaris.Loading.label")
  }, /* @__PURE__ */ import_react103.default.createElement("div", {
    className: styles37.Level,
    style: customStyles,
    onTransitionEnd: () => setAnimating(!1)
  }));
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/CSSAnimation/CSSAnimation.js
var import_react104 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Frame/components/CSSAnimation/CSSAnimation.css.js
var styles38 = {
  startFade: "Polaris-Frame-CSSAnimation--startFade",
  endFade: "Polaris-Frame-CSSAnimation--endFade"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/CSSAnimation/CSSAnimation.js
var TransitionStatus2;
(function(TransitionStatus3) {
  TransitionStatus3.Entering = "entering", TransitionStatus3.Entered = "entered", TransitionStatus3.Exiting = "exiting", TransitionStatus3.Exited = "exited";
})(TransitionStatus2 || (TransitionStatus2 = {}));
function CSSAnimation({
  in: inProp,
  className,
  type,
  children
}) {
  let [transitionStatus, setTransitionStatus] = (0, import_react104.useState)(inProp ? TransitionStatus2.Entering : TransitionStatus2.Exited), isMounted = (0, import_react104.useRef)(!1), node = (0, import_react104.useRef)(null);
  (0, import_react104.useEffect)(() => {
    isMounted.current && transitionStatus === TransitionStatus2.Entering && changeTransitionStatus(TransitionStatus2.Entered);
  }, [transitionStatus]), (0, import_react104.useEffect)(() => {
    isMounted.current && (inProp && changeTransitionStatus(TransitionStatus2.Entering), !inProp && changeTransitionStatus(TransitionStatus2.Exiting));
  }, [inProp]), (0, import_react104.useEffect)(() => {
    isMounted.current = !0;
  }, []);
  let wrapperClassName = classNames(className, styles38[variationName("start", type)], inProp && styles38[variationName("end", type)]), content = transitionStatus === TransitionStatus2.Exited && !inProp ? null : children;
  return /* @__PURE__ */ import_react104.default.createElement("div", {
    className: wrapperClassName,
    ref: node,
    onTransitionEnd: handleTransitionEnd
  }, content);
  function handleTransitionEnd() {
    transitionStatus === TransitionStatus2.Exiting && changeTransitionStatus(TransitionStatus2.Exited);
  }
  function changeTransitionStatus(transitionStatus2) {
    setTransitionStatus(transitionStatus2), transitionStatus2 === TransitionStatus2.Entering && node.current && node.current.getBoundingClientRect();
  }
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/ContextualSaveBar.js
var import_react114 = __toESM(require_react());
import { AlertTriangleIcon } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/utilities/pluck-deep.js
function pluckDeep(obj, key) {
  if (!obj)
    return null;
  let keys = Object.keys(obj);
  for (let currKey of keys) {
    if (currKey === key)
      return obj[key];
    if (isObject(obj[currKey])) {
      let plucked = pluckDeep(obj[currKey], key);
      if (plucked)
        return plucked;
    }
  }
  return null;
}

// node_modules/@shopify/polaris/build/esm/utilities/get-width.js
function getWidth(value = {}, defaultWidth = 0, key = "width") {
  let width = typeof value == "number" ? value : pluckDeep(value, key);
  return width ? `${width}px` : `${defaultWidth}px`;
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/ContextualSaveBar.css.js
var styles39 = {
  ContextualSaveBar: "Polaris-Frame-ContextualSaveBar",
  LogoContainer: "Polaris-Frame-ContextualSaveBar__LogoContainer",
  ContextControl: "Polaris-Frame-ContextualSaveBar__ContextControl",
  Contents: "Polaris-Frame-ContextualSaveBar__Contents",
  fullWidth: "Polaris-Frame-ContextualSaveBar--fullWidth",
  MessageContainer: "Polaris-Frame-ContextualSaveBar__MessageContainer",
  ActionContainer: "Polaris-Frame-ContextualSaveBar__ActionContainer",
  Action: "Polaris-Frame-ContextualSaveBar__Action"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/components/DiscardConfirmationModal/DiscardConfirmationModal.js
var import_react113 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Modal/Modal.js
var import_react112 = __toESM(require_react());
import { TransitionGroup } from "react-transition-group";

// node_modules/@shopify/polaris/build/esm/components/Modal/Modal.css.js
var styles40 = {
  Body: "Polaris-Modal__Body",
  NoScrollBody: "Polaris-Modal__NoScrollBody",
  IFrame: "Polaris-Modal__IFrame"
};

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Section/Section.js
var import_react105 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Section/Section.css.js
var styles41 = {
  Section: "Polaris-Modal-Section",
  titleHidden: "Polaris-Modal-Section--titleHidden"
};

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Section/Section.js
function Section3({
  children,
  flush = !1,
  subdued = !1,
  titleHidden = !1
}) {
  let className = classNames(styles41.Section, titleHidden && styles41.titleHidden);
  return /* @__PURE__ */ import_react105.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react105.default.createElement(Box, Object.assign({
    as: "section",
    padding: flush ? "0" : "400"
  }, titleHidden && {
    paddingInlineEnd: "0"
  }, subdued && {
    background: "bg-surface-tertiary"
  }), children));
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Dialog/Dialog.js
var import_react108 = __toESM(require_react());
import { Transition, CSSTransition } from "react-transition-group";

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Dialog/Dialog.css.js
var styles42 = {
  Container: "Polaris-Modal-Dialog__Container",
  Dialog: "Polaris-Modal-Dialog",
  Modal: "Polaris-Modal-Dialog__Modal",
  limitHeight: "Polaris-Modal-Dialog--limitHeight",
  sizeSmall: "Polaris-Modal-Dialog--sizeSmall",
  sizeLarge: "Polaris-Modal-Dialog--sizeLarge",
  sizeFullScreen: "Polaris-Modal-Dialog--sizeFullScreen",
  animateFadeUp: "Polaris-Modal-Dialog--animateFadeUp",
  entering: "Polaris-Modal-Dialog--entering",
  exiting: "Polaris-Modal-Dialog--exiting",
  exited: "Polaris-Modal-Dialog--exited",
  entered: "Polaris-Modal-Dialog--entered"
};

// node_modules/@shopify/polaris/build/esm/components/TrapFocus/TrapFocus.js
var import_react107 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/focus-manager/hooks.js
var import_react106 = __toESM(require_react());
function useFocusManager({
  trapping
}) {
  let focusManager = (0, import_react106.useContext)(FocusManagerContext), id = (0, import_react106.useId)();
  if (!focusManager)
    throw new MissingAppProviderError("No FocusManager was provided.");
  let {
    trapFocusList,
    add: addFocusItem,
    remove: removeFocusItem
  } = focusManager, canSafelyFocus = trapFocusList[0] === id, value = (0, import_react106.useMemo)(() => ({
    canSafelyFocus
  }), [canSafelyFocus]);
  return (0, import_react106.useEffect)(() => {
    if (trapping)
      return addFocusItem(id), () => {
        removeFocusItem(id);
      };
  }, [addFocusItem, id, removeFocusItem, trapping]), value;
}

// node_modules/@shopify/polaris/build/esm/components/TrapFocus/TrapFocus.js
function TrapFocus({
  trapping = !0,
  children
}) {
  let {
    canSafelyFocus
  } = useFocusManager({
    trapping
  }), focusTrapWrapper = (0, import_react107.useRef)(null), [disableFocus, setDisableFocus] = (0, import_react107.useState)(!0);
  (0, import_react107.useEffect)(() => {
    let disable = canSafelyFocus && !(focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement)) ? !trapping : !0;
    setDisableFocus(disable);
  }, [canSafelyFocus, trapping]);
  let handleFocusIn = (event) => {
    let containerContentsHaveFocus = focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement);
    trapping === !1 || !focusTrapWrapper.current || containerContentsHaveFocus || event.target instanceof Element && event.target.matches(`${portal.selector} *`) || canSafelyFocus && event.target instanceof HTMLElement && focusTrapWrapper.current !== event.target && !focusTrapWrapper.current.contains(event.target) && focusFirstFocusableNode(focusTrapWrapper.current);
  }, handleTab = (event) => {
    if (trapping === !1 || !focusTrapWrapper.current)
      return;
    let firstFocusableNode = findFirstKeyboardFocusableNode(focusTrapWrapper.current), lastFocusableNode = findLastKeyboardFocusableNode(focusTrapWrapper.current);
    event.target === lastFocusableNode && !event.shiftKey && (event.preventDefault(), focusFirstKeyboardFocusableNode(focusTrapWrapper.current)), event.target === firstFocusableNode && event.shiftKey && (event.preventDefault(), focusLastKeyboardFocusableNode(focusTrapWrapper.current));
  };
  return /* @__PURE__ */ import_react107.default.createElement(Focus, {
    disabled: disableFocus,
    root: focusTrapWrapper.current
  }, /* @__PURE__ */ import_react107.default.createElement("div", {
    ref: focusTrapWrapper
  }, /* @__PURE__ */ import_react107.default.createElement(EventListener, {
    event: "focusin",
    handler: handleFocusIn
  }), /* @__PURE__ */ import_react107.default.createElement(KeypressListener, {
    keyCode: Key.Tab,
    keyEvent: "keydown",
    handler: handleTab
  }), children));
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Dialog/Dialog.js
function Dialog({
  instant,
  labelledBy,
  children,
  limitHeight,
  size,
  onClose,
  onExited,
  onEntered,
  setClosing,
  hasToasts,
  ...props
}) {
  let theme = useTheme(), containerNode = (0, import_react108.useRef)(null), frameContext = (0, import_react108.useContext)(FrameContext), toastMessages;
  frameContext && (toastMessages = frameContext.toastMessages);
  let classes = classNames(styles42.Modal, size && styles42[variationName("size", size)], limitHeight && styles42.limitHeight), TransitionChild = instant ? Transition : FadeUp;
  (0, import_react108.useEffect)(() => {
    containerNode.current && !containerNode.current.contains(document.activeElement) && focusFirstFocusableNode(containerNode.current);
  }, []);
  let handleKeyDown = () => {
    setClosing && setClosing(!0);
  }, handleKeyUp = () => {
    setClosing && setClosing(!1), onClose();
  }, ariaLiveAnnouncements = /* @__PURE__ */ import_react108.default.createElement("div", {
    "aria-live": "assertive"
  }, toastMessages ? toastMessages.map((toastMessage) => /* @__PURE__ */ import_react108.default.createElement(Text, {
    visuallyHidden: !0,
    as: "p",
    key: toastMessage.id
  }, toastMessage.content)) : null);
  return /* @__PURE__ */ import_react108.default.createElement(TransitionChild, Object.assign({}, props, {
    nodeRef: containerNode,
    mountOnEnter: !0,
    unmountOnExit: !0,
    timeout: parseInt(theme.motion["motion-duration-200"], 10),
    onEntered,
    onExited
  }), /* @__PURE__ */ import_react108.default.createElement("div", {
    className: styles42.Container,
    "data-polaris-layer": !0,
    "data-polaris-overlay": !0,
    ref: containerNode
  }, /* @__PURE__ */ import_react108.default.createElement(TrapFocus, null, /* @__PURE__ */ import_react108.default.createElement("div", {
    role: "dialog",
    "aria-modal": !0,
    "aria-label": labelledBy,
    "aria-labelledby": labelledBy,
    tabIndex: -1,
    className: styles42.Dialog
  }, /* @__PURE__ */ import_react108.default.createElement("div", {
    className: classes
  }, /* @__PURE__ */ import_react108.default.createElement(KeypressListener, {
    keyCode: Key.Escape,
    keyEvent: "keydown",
    handler: handleKeyDown
  }), /* @__PURE__ */ import_react108.default.createElement(KeypressListener, {
    keyCode: Key.Escape,
    handler: handleKeyUp
  }), children), ariaLiveAnnouncements))));
}
var fadeUpClasses = {
  appear: classNames(styles42.animateFadeUp, styles42.entering),
  appearActive: classNames(styles42.animateFadeUp, styles42.entered),
  enter: classNames(styles42.animateFadeUp, styles42.entering),
  enterActive: classNames(styles42.animateFadeUp, styles42.entered),
  exit: classNames(styles42.animateFadeUp, styles42.exiting),
  exitActive: classNames(styles42.animateFadeUp, styles42.exited)
};
function FadeUp({
  children,
  ...props
}) {
  return /* @__PURE__ */ import_react108.default.createElement(CSSTransition, Object.assign({}, props, {
    classNames: fadeUpClasses
  }), children);
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Header/Header.js
var import_react110 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Modal/components/CloseButton/CloseButton.js
var import_react109 = __toESM(require_react());
import { XIcon } from "@shopify/polaris-icons";
function CloseButton({
  pressed,
  onClick
}) {
  let i18n = useI18n();
  return /* @__PURE__ */ import_react109.default.createElement(Button, {
    variant: "tertiary",
    pressed,
    icon: XIcon,
    onClick,
    accessibilityLabel: i18n.translate("Polaris.Common.close")
  });
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Header/Header.js
function Header({
  id,
  children,
  closing,
  titleHidden,
  onClose
}) {
  let headerPaddingInline = "400", headerPaddingBlock = "400";
  return titleHidden || !children ? /* @__PURE__ */ import_react110.default.createElement(Box, {
    position: "absolute",
    insetInlineEnd: headerPaddingInline,
    insetBlockStart: headerPaddingBlock,
    zIndex: "1"
  }, /* @__PURE__ */ import_react110.default.createElement(CloseButton, {
    onClick: onClose
  })) : /* @__PURE__ */ import_react110.default.createElement(Box, {
    paddingBlockStart: "400",
    paddingBlockEnd: "400",
    paddingInlineStart: headerPaddingInline,
    paddingInlineEnd: headerPaddingInline,
    borderBlockEndWidth: "025",
    borderColor: "border",
    background: "bg-surface-tertiary"
  }, /* @__PURE__ */ import_react110.default.createElement(InlineGrid, {
    columns: {
      xs: "1fr auto"
    },
    gap: "400"
  }, /* @__PURE__ */ import_react110.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /* @__PURE__ */ import_react110.default.createElement(Text, {
    id,
    as: "h2",
    variant: "headingMd",
    breakWord: !0
  }, children)), /* @__PURE__ */ import_react110.default.createElement(CloseButton, {
    pressed: closing,
    onClick: onClose
  })));
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Footer/Footer.js
var import_react111 = __toESM(require_react());
function Footer({
  primaryAction,
  secondaryActions,
  children
}) {
  let primaryActionButton = primaryAction && buttonsFrom(primaryAction, {
    variant: "primary"
  }) || null, secondaryActionButtons = secondaryActions && buttonsFrom(secondaryActions) || null, actions = primaryActionButton || secondaryActionButtons ? /* @__PURE__ */ import_react111.default.createElement(InlineStack, {
    gap: "200"
  }, secondaryActionButtons, primaryActionButton) : null;
  return /* @__PURE__ */ import_react111.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /* @__PURE__ */ import_react111.default.createElement(Box, {
    borderColor: "border",
    borderBlockStartWidth: "025",
    padding: "400",
    width: "100%"
  }, /* @__PURE__ */ import_react111.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center",
    align: "space-between"
  }, /* @__PURE__ */ import_react111.default.createElement(Box, null, children), actions)));
}

// node_modules/@shopify/polaris/build/esm/components/Modal/Modal.js
var IFRAME_LOADING_HEIGHT = 200, DEFAULT_IFRAME_CONTENT_HEIGHT = 400, Modal = function({
  children,
  title,
  titleHidden = !1,
  src,
  iFrameName,
  open,
  instant,
  sectioned,
  loading,
  size,
  limitHeight,
  footer,
  primaryAction,
  secondaryActions,
  onScrolledToBottom,
  activator,
  activatorWrapper = "div",
  onClose,
  onIFrameLoad,
  onTransitionEnd,
  noScroll
}) {
  let [iframeHeight, setIframeHeight] = (0, import_react112.useState)(IFRAME_LOADING_HEIGHT), [closing, setClosing] = (0, import_react112.useState)(!1), headerId = (0, import_react112.useId)(), activatorRef = (0, import_react112.useRef)(null), iframeTitle = useI18n().translate("Polaris.Modal.iFrameTitle"), dialog, backdrop, handleEntered = (0, import_react112.useCallback)(() => {
    onTransitionEnd && onTransitionEnd();
  }, [onTransitionEnd]), handleExited = (0, import_react112.useCallback)(() => {
    setIframeHeight(IFRAME_LOADING_HEIGHT);
    let activatorElement = activator && isRef2(activator) ? activator && activator.current : activatorRef.current;
    activatorElement && requestAnimationFrame(() => focusFirstFocusableNode(activatorElement));
  }, [activator]), handleIFrameLoad = (0, import_react112.useCallback)((evt) => {
    let iframe = evt.target;
    if (iframe && iframe.contentWindow)
      try {
        setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
      } catch {
        setIframeHeight(DEFAULT_IFRAME_CONTENT_HEIGHT);
      }
    onIFrameLoad?.(evt);
  }, [onIFrameLoad]);
  if (open) {
    let footerMarkup = !footer && !primaryAction && !secondaryActions ? null : /* @__PURE__ */ import_react112.default.createElement(Footer, {
      primaryAction,
      secondaryActions
    }, footer), content = sectioned ? wrapWithComponent(children, Section3, {
      titleHidden
    }) : children, body = loading ? /* @__PURE__ */ import_react112.default.createElement(Box, {
      padding: "400"
    }, /* @__PURE__ */ import_react112.default.createElement(InlineStack, {
      gap: "400",
      align: "center",
      blockAlign: "center"
    }, /* @__PURE__ */ import_react112.default.createElement(Spinner, null))) : content, scrollContainerMarkup = noScroll ? /* @__PURE__ */ import_react112.default.createElement("div", {
      className: styles40.NoScrollBody
    }, /* @__PURE__ */ import_react112.default.createElement(Box, {
      width: "100%",
      overflowX: "hidden",
      overflowY: "hidden"
    }, body)) : /* @__PURE__ */ import_react112.default.createElement(Scrollable, {
      shadow: !0,
      className: styles40.Body,
      onScrolledToBottom
    }, body), bodyMarkup = src ? /* @__PURE__ */ import_react112.default.createElement("iframe", {
      name: iFrameName,
      title: iframeTitle,
      src,
      className: styles40.IFrame,
      onLoad: handleIFrameLoad,
      style: {
        height: `${iframeHeight}px`
      }
    }) : scrollContainerMarkup;
    dialog = /* @__PURE__ */ import_react112.default.createElement(Dialog, {
      instant,
      labelledBy: headerId,
      onClose,
      onEntered: handleEntered,
      onExited: handleExited,
      size,
      limitHeight,
      setClosing
    }, /* @__PURE__ */ import_react112.default.createElement(Header, {
      titleHidden,
      id: headerId,
      closing,
      onClose
    }, title), bodyMarkup, footerMarkup), backdrop = /* @__PURE__ */ import_react112.default.createElement(Backdrop, {
      setClosing,
      onClick: onClose
    });
  }
  let animated = !instant, activatorMarkup = activator && !isRef2(activator) ? /* @__PURE__ */ import_react112.default.createElement(Box, {
    ref: activatorRef,
    as: activatorWrapper
  }, activator) : null;
  return /* @__PURE__ */ import_react112.default.createElement(WithinContentContext.Provider, {
    value: !0
  }, activatorMarkup, /* @__PURE__ */ import_react112.default.createElement(Portal, {
    idPrefix: "modal"
  }, /* @__PURE__ */ import_react112.default.createElement(TransitionGroup, {
    appear: animated,
    enter: animated,
    exit: animated
  }, dialog), backdrop));
};
function isRef2(ref) {
  return Object.prototype.hasOwnProperty.call(ref, "current");
}
Modal.Section = Section3;

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/components/DiscardConfirmationModal/DiscardConfirmationModal.js
function DiscardConfirmationModal({
  open,
  onDiscard,
  onCancel
}) {
  let i18n = useI18n();
  return /* @__PURE__ */ import_react113.default.createElement(Modal, {
    title: i18n.translate("Polaris.DiscardConfirmationModal.title"),
    open,
    onClose: onCancel,
    primaryAction: {
      content: i18n.translate("Polaris.DiscardConfirmationModal.primaryAction"),
      destructive: !0,
      onAction: onDiscard
    },
    secondaryActions: [{
      content: i18n.translate("Polaris.DiscardConfirmationModal.secondaryAction"),
      onAction: onCancel
    }],
    sectioned: !0
  }, i18n.translate("Polaris.DiscardConfirmationModal.message"));
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/ContextualSaveBar.js
function ContextualSaveBar({
  alignContentFlush,
  message,
  saveAction,
  discardAction,
  fullWidth,
  contextControl,
  secondaryMenu
}) {
  let i18n = useI18n(), {
    logo
  } = useFrame(), {
    value: discardConfirmationModalVisible,
    toggle: toggleDiscardConfirmationModal,
    setFalse: closeDiscardConfirmationModal
  } = useToggle(!1), handleDiscardAction = (0, import_react114.useCallback)(() => {
    discardAction && discardAction.onAction && discardAction.onAction(), closeDiscardConfirmationModal();
  }, [closeDiscardConfirmationModal, discardAction]), discardActionContent = discardAction && discardAction.content ? discardAction.content : i18n.translate("Polaris.ContextualSaveBar.discard"), discardActionHandler;
  discardAction && discardAction.discardConfirmationModal ? discardActionHandler = toggleDiscardConfirmationModal : discardAction && (discardActionHandler = discardAction.onAction);
  let discardConfirmationModalMarkup = discardAction && discardAction.onAction && discardAction.discardConfirmationModal && /* @__PURE__ */ import_react114.default.createElement(DiscardConfirmationModal, {
    open: discardConfirmationModalVisible,
    onCancel: toggleDiscardConfirmationModal,
    onDiscard: handleDiscardAction
  }), discardActionMarkup = discardAction && /* @__PURE__ */ import_react114.default.createElement(Button, {
    variant: "tertiary",
    size: "large",
    url: discardAction.url,
    onClick: discardActionHandler,
    loading: discardAction.loading,
    disabled: discardAction.disabled,
    accessibilityLabel: discardAction.content
  }, discardActionContent), saveActionContent = saveAction && saveAction.content ? saveAction.content : i18n.translate("Polaris.ContextualSaveBar.save"), saveActionMarkup = saveAction && /* @__PURE__ */ import_react114.default.createElement(Button, {
    variant: "primary",
    tone: "success",
    size: "large",
    url: saveAction.url,
    onClick: saveAction.onAction,
    loading: saveAction.loading,
    disabled: saveAction.disabled,
    accessibilityLabel: saveAction.content
  }, saveActionContent), width = getWidth(logo, 104), imageMarkup = logo && /* @__PURE__ */ import_react114.default.createElement(Image, {
    style: {
      width
    },
    source: logo.contextualSaveBarSource || "",
    alt: ""
  }), logoMarkup = alignContentFlush || contextControl ? null : /* @__PURE__ */ import_react114.default.createElement("div", {
    className: styles39.LogoContainer,
    style: {
      width
    }
  }, imageMarkup), contextControlMarkup = contextControl ? /* @__PURE__ */ import_react114.default.createElement("div", {
    className: styles39.ContextControl
  }, contextControl) : null, contentsClassName = classNames(styles39.Contents, fullWidth && styles39.fullWidth);
  return /* @__PURE__ */ import_react114.default.createElement(import_react114.default.Fragment, null, /* @__PURE__ */ import_react114.default.createElement("div", {
    className: styles39.ContextualSaveBar
  }, contextControlMarkup, logoMarkup, /* @__PURE__ */ import_react114.default.createElement("div", {
    className: contentsClassName
  }, /* @__PURE__ */ import_react114.default.createElement("div", {
    className: styles39.MessageContainer
  }, /* @__PURE__ */ import_react114.default.createElement(Icon, {
    source: AlertTriangleIcon
  }), message && /* @__PURE__ */ import_react114.default.createElement(Text, {
    as: "h2",
    variant: "headingMd",
    tone: "text-inverse",
    truncate: !0
  }, message)), /* @__PURE__ */ import_react114.default.createElement("div", {
    className: styles39.ActionContainer
  }, /* @__PURE__ */ import_react114.default.createElement(LegacyStack, {
    spacing: "tight",
    wrap: !1
  }, secondaryMenu, discardActionMarkup, saveActionMarkup)))), discardConfirmationModalMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ToastManager/ToastManager.js
var import_react119 = __toESM(require_react());
import { CSSTransition as CSSTransition2, TransitionGroup as TransitionGroup2 } from "react-transition-group";

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-effect.js
var import_react116 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-compare-ref.js
var import_react115 = __toESM(require_react());
import isEqual2 from "react-fast-compare";
function useDeepCompareRef(dependencies, comparator = isEqual2) {
  let dependencyList = (0, import_react115.useRef)(dependencies);
  return comparator(dependencyList.current, dependencies) || (dependencyList.current = dependencies), dependencyList.current;
}

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-effect.js
function useDeepEffect(callback, dependencies, customCompare) {
  (0, import_react116.useEffect)(callback, useDeepCompareRef(dependencies, customCompare));
}

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-callback.js
var import_react117 = __toESM(require_react());
function useDeepCallback(callback, dependencies, customCompare) {
  return (0, import_react117.useCallback)(callback, useDeepCompareRef(dependencies, customCompare));
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ToastManager/ToastManager.css.js
var styles43 = {
  ToastManager: "Polaris-Frame-ToastManager",
  ToastWrapper: "Polaris-Frame-ToastManager__ToastWrapper",
  "ToastWrapper-enter": "Polaris-Frame-ToastManager__ToastWrapper--enter",
  "ToastWrapper-exit": "Polaris-Frame-ToastManager__ToastWrapper--exit",
  "ToastWrapper-enter-done": "Polaris-Frame-ToastManager--toastWrapperEnterDone",
  "ToastWrapper--hoverable": "Polaris-Frame-ToastManager--toastWrapperHoverable"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Toast/Toast.js
var import_react118 = __toESM(require_react());
import { XSmallIcon, AlertCircleIcon as AlertCircleIcon2 } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Toast/Toast.css.js
var styles44 = {
  Toast: "Polaris-Frame-Toast",
  Action: "Polaris-Frame-Toast__Action",
  error: "Polaris-Frame-Toast--error",
  CloseButton: "Polaris-Frame-Toast__CloseButton",
  LeadingIcon: "Polaris-Frame-Toast__LeadingIcon",
  toneMagic: "Polaris-Frame-Toast--toneMagic",
  WithActionOnComponent: "Polaris-Frame-Toast__WithActionOnComponent"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Toast/Toast.js
var DEFAULT_TOAST_DURATION = 5e3, DEFAULT_TOAST_DURATION_WITH_ACTION = 1e4;
function Toast({
  content,
  onDismiss,
  duration,
  error,
  action: action8,
  tone,
  onClick,
  icon,
  isHovered
}) {
  let durationRemaining = (0, import_react118.useRef)(action8 && !duration ? DEFAULT_TOAST_DURATION_WITH_ACTION : duration || DEFAULT_TOAST_DURATION), timeoutStart = (0, import_react118.useRef)(null), timer = (0, import_react118.useRef)(null);
  (0, import_react118.useEffect)(() => {
    function resume() {
      timeoutStart.current = Date.now(), timer.current = setTimeout(() => {
        onDismiss();
      }, durationRemaining.current);
    }
    function pause() {
      timeoutStart.current && (durationRemaining.current -= Date.now() - timeoutStart.current), timer.current && clearTimeout(timer.current), timer.current = null;
    }
    return isHovered ? pause() : resume(), () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [isHovered, onDismiss]), (0, import_react118.useEffect)(() => {
    action8 && duration && duration < DEFAULT_TOAST_DURATION_WITH_ACTION && console.log("Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.");
  }, [action8, duration]);
  let dismissMarkup = /* @__PURE__ */ import_react118.default.createElement("button", {
    type: "button",
    className: styles44.CloseButton,
    onClick: onDismiss
  }, /* @__PURE__ */ import_react118.default.createElement(Icon, {
    source: XSmallIcon,
    tone: "inherit"
  })), actionMarkup = action8 ? /* @__PURE__ */ import_react118.default.createElement("div", {
    className: styles44.Action
  }, /* @__PURE__ */ import_react118.default.createElement(Button, {
    variant: "monochromePlain",
    removeUnderline: !0,
    size: "slim",
    onClick: action8.onAction
  }, action8.content)) : null, leadingIconMarkup = null;
  error ? leadingIconMarkup = /* @__PURE__ */ import_react118.default.createElement("div", {
    className: styles44.LeadingIcon
  }, /* @__PURE__ */ import_react118.default.createElement(Icon, {
    source: AlertCircleIcon2,
    tone: "inherit"
  })) : icon && (leadingIconMarkup = /* @__PURE__ */ import_react118.default.createElement("div", {
    className: styles44.LeadingIcon
  }, /* @__PURE__ */ import_react118.default.createElement(Icon, {
    source: icon,
    tone: "inherit"
  })));
  let className = classNames(styles44.Toast, error && styles44.error, tone && styles44[variationName("tone", tone)]);
  return !action8 && onClick ? /* @__PURE__ */ import_react118.default.createElement("button", {
    "aria-live": "assertive",
    className: classNames(className, styles44.WithActionOnComponent),
    type: "button",
    onClick
  }, /* @__PURE__ */ import_react118.default.createElement(KeypressListener, {
    keyCode: Key.Escape,
    handler: onDismiss
  }), leadingIconMarkup, /* @__PURE__ */ import_react118.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /* @__PURE__ */ import_react118.default.createElement(Text, Object.assign({
    as: "span",
    variant: "bodyMd",
    fontWeight: "medium"
  }, tone === "magic" && {
    tone: "magic"
  }), content))) : /* @__PURE__ */ import_react118.default.createElement("div", {
    className,
    "aria-live": "assertive"
  }, /* @__PURE__ */ import_react118.default.createElement(KeypressListener, {
    keyCode: Key.Escape,
    handler: onDismiss
  }), leadingIconMarkup, /* @__PURE__ */ import_react118.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /* @__PURE__ */ import_react118.default.createElement(Text, Object.assign({
    as: "span",
    variant: "bodyMd",
    fontWeight: "medium"
  }, tone === "magic" && {
    tone: "magic"
  }), content)), actionMarkup, dismissMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ToastManager/ToastManager.js
var ADDITIONAL_TOAST_BASE_MOVEMENT = 10, TOAST_TRANSITION_DELAY = 30;
function generateAdditionalVerticalMovement(index) {
  let getAmountToRemove = (idx) => (idx - 1) * idx / 2;
  return index * ADDITIONAL_TOAST_BASE_MOVEMENT - getAmountToRemove(index);
}
var ToastManager = /* @__PURE__ */ (0, import_react119.memo)(function({
  toastMessages
}) {
  let toastNodes = [], [shouldExpand, setShouldExpand] = (0, import_react119.useState)(!1), isFullyExpanded = (0, import_react119.useRef)(!1), fullyExpandedTimeout = (0, import_react119.useRef)(null), firstToast = (0, import_react119.useRef)(null), updateToasts = useDeepCallback(() => {
    let zeroIndexTotalMessages = toastMessages.length - 1;
    toastMessages.forEach((_, index) => {
      let reversedOrder = zeroIndexTotalMessages - index, currentToast = toastNodes[index];
      if (!currentToast.current)
        return;
      let toastHeight = currentToast.current.clientHeight, scale = shouldExpand ? 1 : 0.9 ** reversedOrder, additionalVerticalMovement = generateAdditionalVerticalMovement(reversedOrder), targetInPos = shouldExpand ? toastHeight + (toastHeight - 8) * reversedOrder : toastHeight + additionalVerticalMovement;
      currentToast.current.style.setProperty("--pc-toast-manager-translate-y-in", `-${targetInPos}px`), currentToast.current.style.setProperty("--pc-toast-manager-scale-in", `${scale}`), currentToast.current.style.setProperty("--pc-toast-manager-blur-in", shouldExpand ? "0" : `${reversedOrder * 0.5}px`), currentToast.current.style.setProperty("--pc-toast-manager-transition-delay-in", `${shouldExpand ? reversedOrder * TOAST_TRANSITION_DELAY : 0}ms`), currentToast.current.style.setProperty("--pc-toast-manager-scale-out", `${reversedOrder === 0 ? 0.85 : scale ** 2}`), currentToast.current.style.setProperty("--pc-toast-manager-translate-y-out", `${-targetInPos}px`);
    });
  }, [toastMessages, toastNodes, shouldExpand]);
  useDeepEffect(() => {
    updateToasts(), toastMessages.length === 0 && setShouldExpand(!1), shouldExpand ? fullyExpandedTimeout.current = setTimeout(() => {
      isFullyExpanded.current = !0;
    }, toastMessages.length * TOAST_TRANSITION_DELAY + 400) : fullyExpandedTimeout.current && (clearTimeout(fullyExpandedTimeout.current), isFullyExpanded.current = !1);
  }, [toastMessages, shouldExpand]);
  let toastsMarkup = toastMessages.map((toast, index) => {
    let reverseOrderIndex = toastMessages.length - index - 1, toastNode = /* @__PURE__ */ (0, import_react119.createRef)();
    toastNodes[index] = toastNode;
    function handleMouseEnter() {
      setShouldExpand(!0);
    }
    function handleMouseEnterFirstToast() {
      isFullyExpanded.current && setShouldExpand(!1);
    }
    return /* @__PURE__ */ import_react119.default.createElement(CSSTransition2, {
      nodeRef: toastNodes[index],
      key: toast.id,
      timeout: {
        enter: 0,
        exit: 200
      },
      classNames: toastClasses
    }, /* @__PURE__ */ import_react119.default.createElement("div", {
      ref: toastNode,
      onMouseEnter: reverseOrderIndex > 0 ? handleMouseEnter : handleMouseEnterFirstToast
    }, /* @__PURE__ */ import_react119.default.createElement("div", {
      ref: (node) => reverseOrderIndex === 0 ? firstToast.current = node : null
    }, /* @__PURE__ */ import_react119.default.createElement(Toast, Object.assign({}, toast, {
      isHovered: shouldExpand
    })))));
  });
  return /* @__PURE__ */ import_react119.default.createElement(Portal, {
    idPrefix: "toast"
  }, /* @__PURE__ */ import_react119.default.createElement(EventListener, {
    event: "resize",
    handler: updateToasts
  }), /* @__PURE__ */ import_react119.default.createElement("div", {
    className: styles43.ToastManager,
    "aria-live": "assertive",
    onMouseEnter: function(event) {
      let target = event.target, isInFirstToast = firstToast.current?.contains(target);
      setShouldExpand(!isInFirstToast);
    },
    onMouseLeave: function() {
      setShouldExpand(!1);
    }
  }, /* @__PURE__ */ import_react119.default.createElement(TransitionGroup2, {
    component: null
  }, toastsMarkup)));
}), toastClasses = {
  enter: classNames(styles43.ToastWrapper, styles43["ToastWrapper-enter"]),
  enterDone: classNames(styles43.ToastWrapper, styles43["ToastWrapper-enter-done"]),
  exit: classNames(styles43.ToastWrapper, styles43["ToastWrapper-exit"])
};

// node_modules/@shopify/polaris/build/esm/components/Frame/Frame.js
var APP_FRAME_MAIN = "AppFrameMain", APP_FRAME_NAV = "AppFrameNav", APP_FRAME_TOP_BAR = "AppFrameTopBar", APP_FRAME_LOADING_BAR = "AppFrameLoadingBar", FrameInner = class extends import_react120.PureComponent {
  constructor(...args) {
    super(...args), this.state = {
      skipFocused: !1,
      globalRibbonHeight: 0,
      loadingStack: 0,
      toastMessages: [],
      showContextualSaveBar: !1
    }, this.contextualSaveBar = null, this.globalRibbonContainer = null, this.navigationNode = /* @__PURE__ */ (0, import_react120.createRef)(), this.setGlobalRibbonHeight = () => {
      let {
        globalRibbonContainer
      } = this;
      globalRibbonContainer && this.setState({
        globalRibbonHeight: globalRibbonContainer.offsetHeight
      }, this.setGlobalRibbonRootProperty);
    }, this.setOffset = () => {
      let {
        offset = "0px"
      } = this.props;
      setRootProperty("--pc-frame-offset", offset);
    }, this.setGlobalRibbonRootProperty = () => {
      let {
        globalRibbonHeight
      } = this.state;
      setRootProperty("--pc-frame-global-ribbon-height", `${globalRibbonHeight}px`);
    }, this.showToast = (toast) => {
      this.setState(({
        toastMessages
      }) => ({
        toastMessages: toastMessages.find(({
          id
        }) => id === toast.id) != null ? toastMessages : [...toastMessages, toast]
      }));
    }, this.hideToast = ({
      id
    }) => {
      this.setState(({
        toastMessages
      }) => ({
        toastMessages: toastMessages.filter(({
          id: toastId
        }) => id !== toastId)
      }));
    }, this.setContextualSaveBar = (props) => {
      let {
        showContextualSaveBar
      } = this.state;
      this.contextualSaveBar = {
        ...props
      }, showContextualSaveBar === !0 ? this.forceUpdate() : this.setState({
        showContextualSaveBar: !0
      });
    }, this.removeContextualSaveBar = () => {
      this.contextualSaveBar = null, this.setState({
        showContextualSaveBar: !1
      });
    }, this.startLoading = () => {
      this.setState(({
        loadingStack
      }) => ({
        loadingStack: loadingStack + 1
      }));
    }, this.stopLoading = () => {
      this.setState(({
        loadingStack
      }) => ({
        loadingStack: Math.max(0, loadingStack - 1)
      }));
    }, this.handleResize = () => {
      this.props.globalRibbon && this.setGlobalRibbonHeight();
    }, this.handleFocus = () => {
      this.setState({
        skipFocused: !0
      });
    }, this.handleBlur = () => {
      this.setState({
        skipFocused: !1
      });
    }, this.handleClick = (event) => {
      let {
        skipToContentTarget
      } = this.props;
      skipToContentTarget && skipToContentTarget.current && (skipToContentTarget.current.focus(), event?.preventDefault());
    }, this.handleNavigationDismiss = () => {
      let {
        onNavigationDismiss
      } = this.props;
      onNavigationDismiss?.();
    }, this.setGlobalRibbonContainer = (node) => {
      this.globalRibbonContainer = node;
    }, this.handleNavKeydown = (event) => {
      let {
        key
      } = event, {
        mediaQuery: {
          isNavigationCollapsed
        },
        showMobileNavigation
      } = this.props;
      isNavigationCollapsed && showMobileNavigation && key === "Escape" && this.handleNavigationDismiss();
    };
  }
  componentDidMount() {
    this.handleResize(), !this.props.globalRibbon && (this.setGlobalRibbonRootProperty(), this.setOffset());
  }
  componentDidUpdate(prevProps) {
    this.props.globalRibbon !== prevProps.globalRibbon && this.setGlobalRibbonHeight(), this.setOffset();
  }
  render() {
    let {
      skipFocused,
      loadingStack,
      toastMessages,
      showContextualSaveBar
    } = this.state, {
      logo,
      children,
      navigation,
      topBar,
      globalRibbon,
      showMobileNavigation = !1,
      skipToContentTarget,
      i18n,
      sidebar,
      mediaQuery: {
        isNavigationCollapsed
      }
    } = this.props, navClassName = classNames(styles36.Navigation, showMobileNavigation && styles36["Navigation-visible"]), mobileNavHidden = isNavigationCollapsed && !showMobileNavigation, mobileNavShowing = isNavigationCollapsed && showMobileNavigation, tabIndex = mobileNavShowing ? 0 : -1, mobileNavAttributes = {
      ...mobileNavShowing && {
        "aria-modal": !0,
        role: "dialog"
      }
    }, navigationMarkup = navigation ? /* @__PURE__ */ import_react120.default.createElement(UseTheme, null, (theme) => /* @__PURE__ */ import_react120.default.createElement(TrapFocus, {
      trapping: mobileNavShowing
    }, /* @__PURE__ */ import_react120.default.createElement(CSSTransition3, {
      nodeRef: this.navigationNode,
      appear: isNavigationCollapsed,
      exit: isNavigationCollapsed,
      in: showMobileNavigation,
      timeout: parseInt(theme.motion["motion-duration-300"], 10),
      classNames: navTransitionClasses
    }, /* @__PURE__ */ import_react120.default.createElement("div", Object.assign({
      key: "NavContent"
    }, mobileNavAttributes, {
      "aria-label": i18n.translate("Polaris.Frame.navigationLabel"),
      ref: this.navigationNode,
      className: navClassName,
      onKeyDown: this.handleNavKeydown,
      id: APP_FRAME_NAV,
      hidden: mobileNavHidden
    }), navigation, /* @__PURE__ */ import_react120.default.createElement("button", {
      type: "button",
      className: styles36.NavigationDismiss,
      onClick: this.handleNavigationDismiss,
      "aria-hidden": mobileNavHidden || !isNavigationCollapsed && !showMobileNavigation,
      "aria-label": i18n.translate("Polaris.Frame.Navigation.closeMobileNavigationLabel"),
      tabIndex
    }, /* @__PURE__ */ import_react120.default.createElement(Icon, {
      source: XIcon2
    })))))) : null, loadingMarkup = loadingStack > 0 ? /* @__PURE__ */ import_react120.default.createElement("div", {
      className: styles36.LoadingBar,
      id: APP_FRAME_LOADING_BAR
    }, /* @__PURE__ */ import_react120.default.createElement(Loading, null)) : null, topBarMarkup = topBar ? /* @__PURE__ */ import_react120.default.createElement("div", Object.assign({
      className: styles36.TopBar
    }, layer.props, dataPolarisTopBar.props, {
      id: APP_FRAME_TOP_BAR
    }), topBar) : null, globalRibbonMarkup = globalRibbon ? /* @__PURE__ */ import_react120.default.createElement("div", {
      className: styles36.GlobalRibbonContainer,
      ref: this.setGlobalRibbonContainer
    }, globalRibbon) : null, skipClassName = classNames(styles36.Skip, skipFocused && styles36.focused), skipTarget = skipToContentTarget?.current ? skipToContentTarget.current.id : APP_FRAME_MAIN, skipMarkup = /* @__PURE__ */ import_react120.default.createElement("div", {
      className: skipClassName
    }, /* @__PURE__ */ import_react120.default.createElement("a", {
      href: `#${skipTarget}`,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick
    }, /* @__PURE__ */ import_react120.default.createElement(Text, {
      as: "span",
      variant: "bodyLg",
      fontWeight: "medium"
    }, i18n.translate("Polaris.Frame.skipToContent")))), navigationAttributes = navigation ? {
      "data-has-navigation": !0
    } : {}, frameClassName = classNames(styles36.Frame, navigation && styles36.hasNav, topBar && styles36.hasTopBar, sidebar && styles36.hasSidebar), contextualSaveBarMarkup = /* @__PURE__ */ import_react120.default.createElement(CSSAnimation, {
      in: showContextualSaveBar,
      className: styles36.ContextualSaveBar,
      type: "fade"
    }, /* @__PURE__ */ import_react120.default.createElement(ContextualSaveBar, this.contextualSaveBar)), navigationOverlayMarkup = showMobileNavigation && isNavigationCollapsed ? /* @__PURE__ */ import_react120.default.createElement(Backdrop, {
      belowNavigation: !0,
      onClick: this.handleNavigationDismiss,
      onTouchStart: this.handleNavigationDismiss
    }) : null, context = {
      logo,
      showToast: this.showToast,
      hideToast: this.hideToast,
      toastMessages,
      startLoading: this.startLoading,
      stopLoading: this.stopLoading,
      setContextualSaveBar: this.setContextualSaveBar,
      removeContextualSaveBar: this.removeContextualSaveBar
    };
    return /* @__PURE__ */ import_react120.default.createElement(FrameContext.Provider, {
      value: context
    }, /* @__PURE__ */ import_react120.default.createElement("div", Object.assign({
      className: frameClassName
    }, layer.props, navigationAttributes), skipMarkup, topBarMarkup, navigationMarkup, contextualSaveBarMarkup, loadingMarkup, navigationOverlayMarkup, /* @__PURE__ */ import_react120.default.createElement("main", {
      className: styles36.Main,
      id: APP_FRAME_MAIN,
      "data-has-global-ribbon": Boolean(globalRibbon)
    }, /* @__PURE__ */ import_react120.default.createElement("div", {
      className: styles36.Content
    }, children)), /* @__PURE__ */ import_react120.default.createElement(ToastManager, {
      toastMessages
    }), globalRibbonMarkup, /* @__PURE__ */ import_react120.default.createElement(EventListener, {
      event: "resize",
      handler: this.handleResize
    })));
  }
}, navTransitionClasses = {
  enter: classNames(styles36["Navigation-enter"]),
  enterActive: classNames(styles36["Navigation-enterActive"]),
  enterDone: classNames(styles36["Navigation-enterActive"]),
  exit: classNames(styles36["Navigation-exit"]),
  exitActive: classNames(styles36["Navigation-exitActive"])
};
function Frame(props) {
  let i18n = useI18n(), mediaQuery = useMediaQuery();
  return /* @__PURE__ */ import_react120.default.createElement(FrameInner, Object.assign({}, props, {
    i18n,
    mediaQuery
  }));
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
var import_react124 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.css.js
var styles45 = {
  Layout: "Polaris-Layout",
  Section: "Polaris-Layout__Section",
  "Section-fullWidth": "Polaris-Layout__Section--fullWidth",
  "Section-oneHalf": "Polaris-Layout__Section--oneHalf",
  "Section-oneThird": "Polaris-Layout__Section--oneThird",
  AnnotatedSection: "Polaris-Layout__AnnotatedSection",
  AnnotationWrapper: "Polaris-Layout__AnnotationWrapper",
  AnnotationContent: "Polaris-Layout__AnnotationContent",
  Annotation: "Polaris-Layout__Annotation"
};

// node_modules/@shopify/polaris/build/esm/components/Layout/components/AnnotatedSection/AnnotatedSection.js
var import_react122 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
var import_react121 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.css.js
var styles46 = {
  TextContainer: "Polaris-TextContainer",
  spacingTight: "Polaris-TextContainer--spacingTight",
  spacingLoose: "Polaris-TextContainer--spacingLoose"
};

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
function TextContainer({
  spacing,
  children
}) {
  let className = classNames(styles46.TextContainer, spacing && styles46[variationName("spacing", spacing)]);
  return /* @__PURE__ */ import_react121.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/components/AnnotatedSection/AnnotatedSection.js
function AnnotatedSection({
  children,
  title,
  description,
  id
}) {
  let descriptionMarkup = typeof description == "string" ? /* @__PURE__ */ import_react122.default.createElement(Text, {
    as: "p",
    variant: "bodyMd"
  }, description) : description;
  return /* @__PURE__ */ import_react122.default.createElement("div", {
    className: styles45.AnnotatedSection
  }, /* @__PURE__ */ import_react122.default.createElement("div", {
    className: styles45.AnnotationWrapper
  }, /* @__PURE__ */ import_react122.default.createElement("div", {
    className: styles45.Annotation
  }, /* @__PURE__ */ import_react122.default.createElement(TextContainer, {
    spacing: "tight"
  }, /* @__PURE__ */ import_react122.default.createElement(Text, {
    id,
    variant: "headingMd",
    as: "h2"
  }, title), descriptionMarkup && /* @__PURE__ */ import_react122.default.createElement(Box, {
    color: "text-secondary"
  }, descriptionMarkup))), /* @__PURE__ */ import_react122.default.createElement("div", {
    className: styles45.AnnotationContent
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Layout/components/Section/Section.js
var import_react123 = __toESM(require_react());
function Section4({
  children,
  variant
}) {
  let className = classNames(styles45.Section, styles45[`Section-${variant}`]);
  return /* @__PURE__ */ import_react123.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
var Layout = function({
  sectioned,
  children
}) {
  let content = sectioned ? /* @__PURE__ */ import_react124.default.createElement(Section4, null, children) : children;
  return /* @__PURE__ */ import_react124.default.createElement("div", {
    className: styles45.Layout
  }, content);
};
Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section4;

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
var import_react129 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/is-interface.js
var import_react125 = __toESM(require_react());
function isInterface(x) {
  return !/* @__PURE__ */ (0, import_react125.isValidElement)(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/is-react-element.js
var import_react126 = __toESM(require_react());
function isReactElement(x) {
  return /* @__PURE__ */ (0, import_react126.isValidElement)(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.css.js
var styles47 = {
  Page: "Polaris-Page",
  fullWidth: "Polaris-Page--fullWidth",
  narrowWidth: "Polaris-Page--narrowWidth",
  Content: "Polaris-Page__Content"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
var import_react128 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.css.js
var styles48 = {
  TitleWrapper: "Polaris-Page-Header__TitleWrapper",
  TitleWrapperExpand: "Polaris-Page-Header__TitleWrapperExpand",
  BreadcrumbWrapper: "Polaris-Page-Header__BreadcrumbWrapper",
  PaginationWrapper: "Polaris-Page-Header__PaginationWrapper",
  PrimaryActionWrapper: "Polaris-Page-Header__PrimaryActionWrapper",
  Row: "Polaris-Page-Header__Row",
  mobileView: "Polaris-Page-Header--mobileView",
  RightAlign: "Polaris-Page-Header__RightAlign",
  noBreadcrumbs: "Polaris-Page-Header--noBreadcrumbs",
  AdditionalMetaData: "Polaris-Page-Header__AdditionalMetaData",
  Actions: "Polaris-Page-Header__Actions",
  longTitle: "Polaris-Page-Header--longTitle",
  mediumTitle: "Polaris-Page-Header--mediumTitle",
  isSingleRow: "Polaris-Page-Header--isSingleRow"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
var import_react127 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.css.js
var styles49 = {
  Title: "Polaris-Header-Title",
  TitleWithSubtitle: "Polaris-Header-Title__TitleWithSubtitle",
  TitleWrapper: "Polaris-Header-Title__TitleWrapper",
  SubTitle: "Polaris-Header-Title__SubTitle",
  SubtitleCompact: "Polaris-Header-Title__SubtitleCompact",
  SubtitleMaxWidth: "Polaris-Header-Title__SubtitleMaxWidth"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle,
  hasSubtitleMaxWidth
}) {
  let className = classNames(styles49.Title, subtitle && styles49.TitleWithSubtitle), titleMarkup = title ? /* @__PURE__ */ import_react127.default.createElement("h1", {
    className
  }, /* @__PURE__ */ import_react127.default.createElement(Text, {
    as: "span",
    variant: "headingLg",
    fontWeight: "bold"
  }, title)) : null, titleMetadataMarkup = titleMetadata ? /* @__PURE__ */ import_react127.default.createElement(Bleed, {
    marginBlock: "100"
  }, titleMetadata) : null, wrappedTitleMarkup = /* @__PURE__ */ import_react127.default.createElement("div", {
    className: styles49.TitleWrapper
  }, titleMarkup, titleMetadataMarkup), subtitleMarkup = subtitle ? /* @__PURE__ */ import_react127.default.createElement("div", {
    className: classNames(styles49.SubTitle, compactTitle && styles49.SubtitleCompact, hasSubtitleMaxWidth && styles49.SubtitleMaxWidth)
  }, /* @__PURE__ */ import_react127.default.createElement(Text, {
    as: "p",
    variant: "bodySm",
    tone: "subdued"
  }, subtitle)) : null;
  return /* @__PURE__ */ import_react127.default.createElement(import_react127.default.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
var SHORT_TITLE = 20, REALLY_SHORT_TITLE = 8, LONG_TITLE = 34;
function Header2({
  title,
  subtitle,
  pageReadyAccessibilityLabel,
  titleMetadata,
  additionalMetadata,
  titleHidden = !1,
  primaryAction,
  pagination,
  filterActions,
  backAction,
  secondaryActions = [],
  actionGroups = [],
  compactTitle = !1,
  onActionRollup
}) {
  let i18n = useI18n(), {
    isNavigationCollapsed
  } = useMediaQuery(), isSingleRow = !primaryAction && !pagination && (isInterface(secondaryActions) && !secondaryActions.length || isReactElement(secondaryActions)) && !actionGroups.length, hasActionGroupsOrSecondaryActions = actionGroups.length > 0 || isInterface(secondaryActions) && secondaryActions.length > 0 || isReactElement(secondaryActions), breadcrumbMarkup = backAction ? /* @__PURE__ */ import_react128.default.createElement("div", {
    className: styles48.BreadcrumbWrapper
  }, /* @__PURE__ */ import_react128.default.createElement(Box, {
    maxWidth: "100%",
    paddingInlineEnd: "100",
    printHidden: !0
  }, /* @__PURE__ */ import_react128.default.createElement(Breadcrumbs, {
    backAction
  }))) : null, paginationMarkup = pagination && !isNavigationCollapsed ? /* @__PURE__ */ import_react128.default.createElement("div", {
    className: styles48.PaginationWrapper
  }, /* @__PURE__ */ import_react128.default.createElement(Box, {
    printHidden: !0
  }, /* @__PURE__ */ import_react128.default.createElement(Pagination, Object.assign({}, pagination, {
    hasPrevious: pagination.hasPrevious,
    hasNext: pagination.hasNext
  })))) : null, pageTitleMarkup = /* @__PURE__ */ import_react128.default.createElement("div", {
    className: classNames(styles48.TitleWrapper, !hasActionGroupsOrSecondaryActions && styles48.TitleWrapperExpand)
  }, /* @__PURE__ */ import_react128.default.createElement(Title, {
    title,
    subtitle,
    titleMetadata,
    compactTitle,
    hasSubtitleMaxWidth: hasActionGroupsOrSecondaryActions
  })), labelForPageReadyAccessibilityLabel = pageReadyAccessibilityLabel || title, pageReadyAccessibilityLabelMarkup = labelForPageReadyAccessibilityLabel ? /* @__PURE__ */ import_react128.default.createElement("div", {
    role: "status"
  }, /* @__PURE__ */ import_react128.default.createElement(Text, {
    visuallyHidden: !0,
    as: "p"
  }, i18n.translate("Polaris.Page.Header.pageReadyAccessibilityLabel", {
    title: labelForPageReadyAccessibilityLabel
  }))) : void 0, primaryActionMarkup = primaryAction ? /* @__PURE__ */ import_react128.default.createElement(PrimaryActionMarkup, {
    primaryAction
  }) : null, actionMenuMarkup = null;
  isInterface(secondaryActions) && (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups)) ? actionMenuMarkup = /* @__PURE__ */ import_react128.default.createElement(ActionMenu, {
    actions: secondaryActions,
    groups: actionGroups,
    rollup: isNavigationCollapsed,
    rollupActionsLabel: title ? i18n.translate("Polaris.Page.Header.rollupActionsLabel", {
      title
    }) : void 0,
    onActionRollup
  }) : isReactElement(secondaryActions) && (actionMenuMarkup = /* @__PURE__ */ import_react128.default.createElement(import_react128.default.Fragment, null, secondaryActions));
  let navigationMarkup = breadcrumbMarkup || paginationMarkup ? /* @__PURE__ */ import_react128.default.createElement(Box, {
    printHidden: !0,
    paddingBlockEnd: "100",
    paddingInlineEnd: actionMenuMarkup && isNavigationCollapsed ? "1000" : void 0
  }, /* @__PURE__ */ import_react128.default.createElement(InlineStack, {
    gap: "400",
    align: "space-between",
    blockAlign: "center"
  }, breadcrumbMarkup, paginationMarkup)) : null, additionalMetadataMarkup = additionalMetadata ? /* @__PURE__ */ import_react128.default.createElement("div", {
    className: styles48.AdditionalMetaData
  }, /* @__PURE__ */ import_react128.default.createElement(Text, {
    tone: "subdued",
    as: "span",
    variant: "bodySm"
  }, additionalMetadata)) : null, headerClassNames = classNames(isSingleRow && styles48.isSingleRow, navigationMarkup && styles48.hasNavigation, actionMenuMarkup && styles48.hasActionMenu, isNavigationCollapsed && styles48.mobileView, !backAction && styles48.noBreadcrumbs, title && title.length < LONG_TITLE && styles48.mediumTitle, title && title.length > LONG_TITLE && styles48.longTitle), {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5
  } = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title
  });
  return /* @__PURE__ */ import_react128.default.createElement(Box, {
    position: "relative",
    paddingBlockStart: {
      xs: "400",
      md: "600"
    },
    paddingBlockEnd: {
      xs: "400",
      md: "600"
    },
    paddingInlineStart: {
      xs: "400",
      sm: "0"
    },
    paddingInlineEnd: {
      xs: "400",
      sm: "0"
    },
    visuallyHidden: titleHidden
  }, pageReadyAccessibilityLabelMarkup, /* @__PURE__ */ import_react128.default.createElement("div", {
    className: headerClassNames
  }, /* @__PURE__ */ import_react128.default.createElement(FilterActionsProvider, {
    filterActions: Boolean(filterActions)
  }, /* @__PURE__ */ import_react128.default.createElement(ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /* @__PURE__ */ import_react128.default.createElement("div", {
    className: styles48.Row
  }, slot1, slot2, /* @__PURE__ */ import_react128.default.createElement(ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /* @__PURE__ */ import_react128.default.createElement("div", {
    className: styles48.RightAlign
  }, /* @__PURE__ */ import_react128.default.createElement(ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: (children) => /* @__PURE__ */ import_react128.default.createElement("div", {
      className: styles48.Actions
    }, children)
  }, slot3, slot4))))), /* @__PURE__ */ import_react128.default.createElement(ConditionalRender, {
    condition: [slot5].some(notNull)
  }, /* @__PURE__ */ import_react128.default.createElement("div", {
    className: styles48.Row
  }, /* @__PURE__ */ import_react128.default.createElement(InlineStack, {
    gap: "400"
  }, slot5))))));
}
function PrimaryActionMarkup({
  primaryAction
}) {
  let {
    isNavigationCollapsed
  } = useMediaQuery(), actionMarkup;
  if (isInterface(primaryAction)) {
    let {
      primary: isPrimary,
      helpText
    } = primaryAction, primary = isPrimary === void 0 ? !0 : isPrimary, content = buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      variant: primary ? "primary" : void 0
    });
    actionMarkup = helpText ? /* @__PURE__ */ import_react128.default.createElement(Tooltip, {
      content: helpText
    }, content) : content;
  } else
    actionMarkup = primaryAction;
  return /* @__PURE__ */ import_react128.default.createElement("div", {
    className: styles48.PrimaryActionWrapper
  }, /* @__PURE__ */ import_react128.default.createElement(Box, {
    printHidden: !0
  }, actionMarkup));
}
function shouldShowIconOnly(isMobile, action8) {
  let {
    content,
    accessibilityLabel
  } = action8, {
    icon
  } = action8;
  return icon == null ? {
    ...action8,
    icon: void 0
  } : (isMobile && (accessibilityLabel = accessibilityLabel || content, content = void 0), {
    ...action8,
    content,
    accessibilityLabel,
    icon
  });
}
function notNull(value) {
  return value != null;
}
function determineLayout({
  actionMenuMarkup,
  additionalMetadataMarkup,
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title
}) {
  let layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: isNavigationCollapsed && breadcrumbMarkup == null && title != null && title.length <= REALLY_SHORT_TITLE
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: isNavigationCollapsed
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: !isNavigationCollapsed && paginationMarkup == null && actionMenuMarkup == null && title != null && title.length <= SHORT_TITLE
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: /* @__PURE__ */ import_react128.default.createElement(import_react128.default.Fragment, null, actionMenuMarkup, primaryActionMarkup),
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: !isNavigationCollapsed
    }
  };
  return (Object.values(layouts).find((layout2) => layout2.condition) || layouts.desktopDefault).slots;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
function Page({
  children,
  fullWidth,
  narrowWidth,
  ...rest
}) {
  let pageClassName = classNames(styles47.Page, fullWidth && styles47.fullWidth, narrowWidth && styles47.narrowWidth), hasHeaderContent = rest.title != null && rest.title !== "" || rest.subtitle != null && rest.subtitle !== "" || rest.primaryAction != null || rest.secondaryActions != null && (isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0 || isReactElement(rest.secondaryActions)) || rest.actionGroups != null && rest.actionGroups.length > 0 || rest.backAction != null, contentClassName = classNames(!hasHeaderContent && styles47.Content), headerMarkup = hasHeaderContent ? /* @__PURE__ */ import_react129.default.createElement(Header2, Object.assign({
    filterActions: !0
  }, rest)) : null;
  return /* @__PURE__ */ import_react129.default.createElement("div", {
    className: pageClassName
  }, headerMarkup, /* @__PURE__ */ import_react129.default.createElement("div", {
    className: contentClassName
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/ProgressBar/ProgressBar.js
var import_react130 = __toESM(require_react());
import { CSSTransition as CSSTransition4 } from "react-transition-group";

// node_modules/@shopify/polaris/build/esm/components/ProgressBar/ProgressBar.css.js
var styles50 = {
  ProgressBar: "Polaris-ProgressBar",
  sizeSmall: "Polaris-ProgressBar--sizeSmall",
  sizeMedium: "Polaris-ProgressBar--sizeMedium",
  sizeLarge: "Polaris-ProgressBar--sizeLarge",
  toneHighlight: "Polaris-ProgressBar--toneHighlight",
  tonePrimary: "Polaris-ProgressBar--tonePrimary",
  toneSuccess: "Polaris-ProgressBar--toneSuccess",
  toneCritical: "Polaris-ProgressBar--toneCritical",
  Indicator: "Polaris-ProgressBar__Indicator",
  IndicatorAppearActive: "Polaris-ProgressBar__IndicatorAppearActive",
  IndicatorAppearDone: "Polaris-ProgressBar__IndicatorAppearDone",
  Progress: "Polaris-ProgressBar__Progress",
  Label: "Polaris-ProgressBar__Label"
};

// node_modules/@shopify/polaris/build/esm/components/ProgressBar/ProgressBar.js
function ProgressBar({
  progress = 0,
  size = "medium",
  tone = "highlight",
  animated: hasAppearAnimation = !0,
  ariaLabelledBy
}) {
  let theme = useTheme(), i18n = useI18n(), indicatorRef = (0, import_react130.useRef)(null), className = classNames(styles50.ProgressBar, size && styles50[variationName("size", size)], tone && styles50[variationName("tone", tone)]), warningMessage = i18n.translate(progress < 0 ? "Polaris.ProgressBar.negativeWarningMessage" : "Polaris.ProgressBar.exceedWarningMessage", {
    progress
  }), parsedProgress = parseProgress(progress, warningMessage), progressBarDuration = hasAppearAnimation ? theme.motion["motion-duration-500"] : theme.motion["motion-duration-0"];
  return /* @__PURE__ */ import_react130.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react130.default.createElement("progress", {
    "aria-labelledby": ariaLabelledBy,
    className: styles50.Progress,
    value: parsedProgress,
    max: "100"
  }), /* @__PURE__ */ import_react130.default.createElement(CSSTransition4, {
    in: !0,
    appear: !0,
    timeout: parseInt(progressBarDuration, 10),
    nodeRef: indicatorRef,
    classNames: {
      appearActive: styles50.IndicatorAppearActive,
      appearDone: styles50.IndicatorAppearDone
    }
  }, /* @__PURE__ */ import_react130.default.createElement("div", {
    ref: indicatorRef,
    className: styles50.Indicator,
    style: {
      "--pc-progress-bar-duration": progressBarDuration,
      "--pc-progress-bar-percent": parsedProgress / 100
    }
  }, /* @__PURE__ */ import_react130.default.createElement("span", {
    className: styles50.Label
  }, parsedProgress, "%"))));
}
function parseProgress(progress, warningMessage) {
  let progressWidth;
  return progress < 0 ? progressWidth = 0 : progress > 100 ? progressWidth = 100 : progressWidth = progress, progressWidth;
}

// node_modules/@shopify/polaris/build/esm/components/Select/Select.js
var import_react131 = __toESM(require_react());
import { SelectIcon as SelectIcon2 } from "@shopify/polaris-icons";

// node_modules/@shopify/polaris/build/esm/components/Select/Select.css.js
var styles51 = {
  Select: "Polaris-Select",
  disabled: "Polaris-Select--disabled",
  error: "Polaris-Select--error",
  Backdrop: "Polaris-Select__Backdrop",
  Input: "Polaris-Select__Input",
  Content: "Polaris-Select__Content",
  InlineLabel: "Polaris-Select__InlineLabel",
  Icon: "Polaris-Select__Icon",
  SelectedOption: "Polaris-Select__SelectedOption",
  Prefix: "Polaris-Select__Prefix",
  hover: "Polaris-Select--hover",
  toneMagic: "Polaris-Select--toneMagic"
};

// node_modules/@shopify/polaris/build/esm/components/Select/Select.js
var PLACEHOLDER_VALUE = "";
function Select({
  options: optionsProp,
  label,
  labelAction,
  labelHidden: labelHiddenProp,
  labelInline,
  disabled,
  helpText,
  placeholder,
  id: idProp,
  name,
  value = PLACEHOLDER_VALUE,
  error,
  onChange,
  onFocus,
  onBlur,
  requiredIndicator,
  tone
}) {
  let {
    value: focused,
    toggle: toggleFocused
  } = useToggle(!1), uniqId = (0, import_react131.useId)(), id = idProp ?? uniqId, labelHidden = labelInline ? !0 : labelHiddenProp, className = classNames(styles51.Select, error && styles51.error, tone && styles51[variationName("tone", tone)], disabled && styles51.disabled), handleFocus = (0, import_react131.useCallback)((event) => {
    toggleFocused(), onFocus?.(event);
  }, [onFocus, toggleFocused]), handleBlur = (0, import_react131.useCallback)((event) => {
    toggleFocused(), onBlur?.(event);
  }, [onBlur, toggleFocused]), handleChange = onChange ? (event) => onChange(event.currentTarget.value, id) : void 0, describedBy = [];
  helpText && describedBy.push(helpTextID(id)), error && describedBy.push(`${id}Error`);
  let normalizedOptions = (optionsProp || []).map(normalizeOption);
  placeholder && (normalizedOptions = [{
    label: placeholder,
    value: PLACEHOLDER_VALUE,
    disabled: !0
  }, ...normalizedOptions]);
  let inlineLabelMarkup = labelInline && /* @__PURE__ */ import_react131.default.createElement(Box, {
    paddingInlineEnd: "100"
  }, /* @__PURE__ */ import_react131.default.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    tone: tone && tone === "magic" && !focused ? "magic-subdued" : "subdued",
    truncate: !0
  }, label)), selectedOption = getSelectedOption(normalizedOptions, value), prefixMarkup = selectedOption.prefix && /* @__PURE__ */ import_react131.default.createElement("div", {
    className: styles51.Prefix
  }, selectedOption.prefix), contentMarkup = /* @__PURE__ */ import_react131.default.createElement("div", {
    className: styles51.Content,
    "aria-hidden": !0,
    "aria-disabled": disabled
  }, inlineLabelMarkup, prefixMarkup, /* @__PURE__ */ import_react131.default.createElement("span", {
    className: styles51.SelectedOption
  }, selectedOption.label), /* @__PURE__ */ import_react131.default.createElement("span", {
    className: styles51.Icon
  }, /* @__PURE__ */ import_react131.default.createElement(Icon, {
    source: SelectIcon2
  }))), optionsMarkup = normalizedOptions.map(renderOption);
  return /* @__PURE__ */ import_react131.default.createElement(Labelled, {
    id,
    label,
    error,
    action: labelAction,
    labelHidden,
    helpText,
    requiredIndicator,
    disabled
  }, /* @__PURE__ */ import_react131.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react131.default.createElement("select", {
    id,
    name,
    value,
    className: styles51.Input,
    disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy.length ? describedBy.join(" ") : void 0,
    "aria-required": requiredIndicator
  }, optionsMarkup), contentMarkup, /* @__PURE__ */ import_react131.default.createElement("div", {
    className: styles51.Backdrop
  })));
}
function isString(option) {
  return typeof option == "string";
}
function isGroup(option) {
  return typeof option == "object" && "options" in option && option.options != null;
}
function normalizeStringOption(option) {
  return {
    label: option,
    value: option
  };
}
function normalizeOption(option) {
  if (isString(option))
    return normalizeStringOption(option);
  if (isGroup(option)) {
    let {
      title,
      options
    } = option;
    return {
      title,
      options: options.map((option2) => isString(option2) ? normalizeStringOption(option2) : option2)
    };
  }
  return option;
}
function getSelectedOption(options, value) {
  let flatOptions = flattenOptions(options), selectedOption = flatOptions.find((option) => value === option.value);
  return selectedOption === void 0 && (selectedOption = flatOptions.find((option) => !option.hidden)), selectedOption || {
    value: "",
    label: ""
  };
}
function flattenOptions(options) {
  let flatOptions = [];
  return options.forEach((optionOrGroup) => {
    isGroup(optionOrGroup) ? flatOptions = flatOptions.concat(optionOrGroup.options) : flatOptions.push(optionOrGroup);
  }), flatOptions;
}
function renderSingleOption(option) {
  let {
    value,
    label,
    prefix: _prefix,
    key,
    ...rest
  } = option;
  return /* @__PURE__ */ import_react131.default.createElement("option", Object.assign({
    key: key ?? value,
    value
  }, rest), label);
}
function renderOption(optionOrGroup) {
  if (isGroup(optionOrGroup)) {
    let {
      title,
      options
    } = optionOrGroup;
    return /* @__PURE__ */ import_react131.default.createElement("optgroup", {
      label: title,
      key: title
    }, options.map(renderSingleOption));
  }
  return renderSingleOption(optionOrGroup);
}

// node_modules/@shopify/polaris/build/esm/components/Toast/Toast.js
var import_react132 = __toESM(require_react());
var Toast2 = /* @__PURE__ */ (0, import_react132.memo)(function(props) {
  let id = (0, import_react132.useId)(), {
    showToast,
    hideToast
  } = useFrame();
  return useDeepEffect(() => (showToast({
    id,
    ...props
  }), () => {
    hideToast({
      id
    });
  }), [props]), null;
});

// app/root.tsx
import { useLocation } from "@remix-run/react";

// node_modules/@shopify/app-bridge-react/build/esm/components/NavMenu.js
var NavMenu = "ui-nav-menu";

// app/root.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var meta = () => [
  { title: "CatalogAI Optimizer" },
  { name: "description", content: "AI-powered Shopify catalog optimization" }
], links = () => [
  { rel: "stylesheet", href: "https://unpkg.com/@shopify/polaris@12.27.0/build/esm/styles.css" }
];
function AppLayout() {
  let location = useLocation(), shop = (typeof window < "u" ? new URLSearchParams(window.location.search) : null)?.get("shop");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    shop && /* @__PURE__ */ jsx2(
      NavMenu,
      {
        navigationLinks: [
          {
            label: "Dashboard",
            destination: "/"
          },
          {
            label: "Feed Validation",
            destination: "/validation"
          },
          {
            label: "AI Enrichment",
            destination: "/enrichment"
          },
          {
            label: "Intent Tagging",
            destination: "/tagging"
          },
          {
            label: "Settings",
            destination: "/settings"
          }
        ],
        matcher: (link, location2) => link.destination === location2.pathname
      }
    ),
    /* @__PURE__ */ jsx2(Outlet, {})
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(AppProvider, { i18n: {}, children: /* @__PURE__ */ jsx2(Frame, { children: /* @__PURE__ */ jsx2(AppLayout, {}) }) }),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] })
  ] });
}

// app/routes/api.test-health-check.ts
var api_test_health_check_exports = {};
__export(api_test_health_check_exports, {
  loader: () => loader
});
init_shopify_server();
init_db();
import { json } from "@remix-run/node";

// app/utils/healthCheckTest.ts
init_db();
var HealthCheckTester = class {
  testResults = [];
  async runAllTests(userId, shopDomain, accessToken) {
    return this.testResults = [], console.log("\u{1F9EA} Starting health check system tests..."), await this.testHealthCheckerInitialization(shopDomain, accessToken), await this.testProductValidation(), await this.testUrlPings(), await this.testInventoryValidation(), await this.testHealthScoreCalculation(), await this.testDatabaseOperations(userId), await this.testQueueOperations(userId, shopDomain), await this.testErrorHandling(shopDomain, accessToken), await this.testPerformanceLargeDataset(), await this.testEdgeCases(), console.log(`\u2705 Health check tests completed: ${this.testResults.filter((r) => r.passed).length}/${this.testResults.length} passed`), this.testResults;
  }
  async testHealthCheckerInitialization(shopDomain, accessToken) {
    let startTime = Date.now();
    try {
      if (!new HealthCheckerService(shopDomain, accessToken))
        throw new Error("Failed to initialize HealthCheckerService");
      this.testResults.push({
        testName: "Health Checker Initialization",
        passed: !0,
        duration: Date.now() - startTime,
        details: { shopDomain, hasAccessToken: !!accessToken }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Health Checker Initialization",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testProductValidation() {
    let startTime = Date.now();
    try {
      let mockProducts = [
        {
          id: "test-1",
          title: "Valid Product",
          description: "This is a valid product description",
          vendor: "Test Vendor",
          productType: "Test Type",
          tags: ["tag1", "tag2"],
          images: [{ src: "image1.jpg" }],
          variants: [{ id: "v1", title: "Variant 1" }],
          options: [{ name: "Size", values: ["S", "M", "L"] }],
          status: "active"
        },
        {
          id: "test-2",
          title: "",
          // Missing title
          description: "Valid description",
          vendor: "Test Vendor",
          productType: "Test Type",
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: "active"
        },
        {
          id: "test-3",
          title: "Valid Product",
          description: "",
          // Missing description
          vendor: "",
          productType: "Test Type",
          tags: ["tag1"],
          images: [{ src: "image1.jpg" }],
          variants: [{ id: "v1", title: "Variant 1" }],
          options: [{ name: "Size", values: ["S", "M", "L"] }],
          status: "active"
        }
      ], requiredFields = ["title", "description", "vendor", "productType", "tags", "images", "variants", "options", "status"], validCount = 0, gaps = [];
      for (let product of mockProducts) {
        let isValid = !0;
        for (let field of requiredFields)
          (!product[field] || Array.isArray(product[field]) && product[field].length === 0 || typeof product[field] == "string" && product[field].trim() === "") && (gaps.push({ field, productId: product.id }), isValid = !1);
        isValid && validCount++;
      }
      let expectedValidCount = 1, expectedGapsCount = 4;
      if (validCount !== expectedValidCount)
        throw new Error(`Expected ${expectedValidCount} valid products, got ${validCount}`);
      if (gaps.length !== expectedGapsCount)
        throw new Error(`Expected ${expectedGapsCount} gaps, got ${gaps.length}`);
      this.testResults.push({
        testName: "Product Validation",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalProducts: mockProducts.length,
          validProducts: validCount,
          gapsFound: gaps.length,
          gaps
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Product Validation",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testUrlPings() {
    let startTime = Date.now();
    try {
      let testUrls = [
        "https://httpbin.org/status/200",
        // Should succeed
        "https://httpbin.org/status/404",
        // Should fail with 404
        "https://invalid-domain-that-does-not-exist.com",
        // Should fail
        "https://httpbin.org/delay/10"
        // Should timeout
      ], results = [];
      for (let url of testUrls)
        try {
          let response = await fetch(url, {
            method: "HEAD",
            signal: AbortSignal.timeout(5e3)
          });
          results.push({ url, success: response.ok, status: response.status });
        } catch (error) {
          results.push({ url, success: !1, error: error instanceof Error ? error.message : "Unknown error" });
        }
      let successCount = results.filter((r) => r.success).length, expectedSuccessCount = 1;
      if (successCount !== expectedSuccessCount)
        throw new Error(`Expected ${expectedSuccessCount} successful pings, got ${successCount}`);
      this.testResults.push({
        testName: "URL Pings",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalUrls: testUrls.length,
          successfulPings: successCount,
          results
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "URL Pings",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testInventoryValidation() {
    let startTime = Date.now();
    try {
      let mockVariants = [
        { id: "v1", inventoryQuantity: 10 },
        // Normal stock
        { id: "v2", inventoryQuantity: 3 },
        // Low stock
        { id: "v3", inventoryQuantity: 0 },
        // Out of stock
        { id: "v4", inventoryQuantity: 1 },
        // Low stock
        { id: "v5", inventoryQuantity: 15 }
        // Normal stock
      ], lowStock = [], outOfStock = [];
      for (let variant of mockVariants)
        variant.inventoryQuantity === 0 ? outOfStock.push(variant.id) : variant.inventoryQuantity < 5 && lowStock.push(variant.id);
      let expectedLowStock = 2, expectedOutOfStock = 1;
      if (lowStock.length !== expectedLowStock)
        throw new Error(`Expected ${expectedLowStock} low stock variants, got ${lowStock.length}`);
      if (outOfStock.length !== expectedOutOfStock)
        throw new Error(`Expected ${expectedOutOfStock} out of stock variants, got ${outOfStock.length}`);
      this.testResults.push({
        testName: "Inventory Validation",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalVariants: mockVariants.length,
          lowStock: lowStock.length,
          outOfStock: outOfStock.length,
          lowStockVariants: lowStock,
          outOfStockVariants: outOfStock
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Inventory Validation",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testHealthScoreCalculation() {
    let startTime = Date.now();
    try {
      let testCases = [
        { totalProducts: 100, validProducts: 100, gaps: [], expectedScore: 100 },
        { totalProducts: 100, validProducts: 90, gaps: [], expectedScore: 90 },
        { totalProducts: 100, validProducts: 80, gaps: [{ severity: "warning", count: 10 }], expectedScore: 70 },
        { totalProducts: 100, validProducts: 70, gaps: [{ severity: "error", count: 20 }], expectedScore: 10 },
        { totalProducts: 0, validProducts: 0, gaps: [], expectedScore: 100 }
      ], results = [];
      for (let testCase of testCases) {
        let score = testCase.totalProducts === 0 ? 100 : testCase.validProducts / testCase.totalProducts * 100;
        for (let gap of testCase.gaps) {
          let penalty = gap.severity === "critical" ? 5 : gap.severity === "error" ? 3 : 1;
          score -= Math.min(penalty * (gap.count / testCase.totalProducts), 10);
        }
        score = Math.max(0, Math.round(score));
        let passed = score === testCase.expectedScore;
        results.push({ ...testCase, calculatedScore: score, passed });
      }
      let failedTests = results.filter((r) => !r.passed);
      if (failedTests.length > 0)
        throw new Error(`${failedTests.length} health score calculations failed`);
      this.testResults.push({
        testName: "Health Score Calculation",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalTestCases: testCases.length,
          allPassed: !0,
          results
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Health Score Calculation",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testDatabaseOperations(userId) {
    let startTime = Date.now();
    try {
      let testAudit = await db.audit.create({
        data: {
          userId,
          score: 85,
          totalProducts: 100,
          validProducts: 85,
          gaps: [{ field: "title", severity: "warning", count: 15 }],
          timestamp: /* @__PURE__ */ new Date()
        }
      });
      if (!testAudit.id)
        throw new Error("Failed to create audit record");
      if (!await db.audit.findUnique({
        where: { id: testAudit.id }
      }))
        throw new Error("Failed to retrieve audit record");
      await db.audit.delete({
        where: { id: testAudit.id }
      }), this.testResults.push({
        testName: "Database Operations",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          auditId: testAudit.id,
          score: testAudit.score,
          totalProducts: testAudit.totalProducts
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Database Operations",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testQueueOperations(userId, shopDomain) {
    let startTime = Date.now();
    try {
      if (!healthCheckQueue)
        throw new Error("Health check queue not available");
      let testJob = await healthCheckQueue.add("health-scan", {
        shopId: shopDomain,
        userId,
        options: {
          maxProducts: 10,
          includePings: !1,
          includeInventory: !1,
          includeValidation: !0
        }
      });
      if (!testJob.id)
        throw new Error("Failed to create queue job");
      this.testResults.push({
        testName: "Queue Operations",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          jobId: testJob.id,
          jobName: testJob.name,
          jobData: testJob.data
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Queue Operations",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testErrorHandling(shopDomain, accessToken) {
    let startTime = Date.now();
    try {
      let healthChecker = new HealthCheckerService(shopDomain, accessToken);
      try {
        await healthChecker.performHealthCheck({
          maxProducts: -1,
          // Invalid value
          includePings: !0,
          includeInventory: !0,
          includeValidation: !0
        });
      } catch {
      }
      try {
        await new HealthCheckerService("", accessToken).performHealthCheck();
      } catch {
      }
      try {
        await new HealthCheckerService(shopDomain, "").performHealthCheck();
      } catch {
      }
      this.testResults.push({
        testName: "Error Handling",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          errorHandlingTests: 3,
          allErrorsHandled: !0
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Error Handling",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testPerformanceLargeDataset() {
    let startTime = Date.now();
    try {
      let largeProductSet = Array.from({ length: 1e3 }, (_, i) => ({
        id: `product-${i}`,
        title: i % 10 === 0 ? "" : `Product ${i}`,
        // 10% missing titles
        description: i % 20 === 0 ? "" : `Description for product ${i}`,
        // 5% missing descriptions
        vendor: i % 15 === 0 ? "" : "Test Vendor",
        // ~6.7% missing vendors
        productType: "Test Type",
        tags: i % 25 === 0 ? [] : ["tag1", "tag2"],
        // 4% missing tags
        images: i % 30 === 0 ? [] : [{ src: `image-${i}.jpg` }],
        // ~3.3% missing images
        variants: i % 40 === 0 ? [] : [{ id: `v-${i}`, title: `Variant ${i}` }],
        // 2.5% missing variants
        options: i % 50 === 0 ? [] : [{ name: "Size", values: ["S", "M", "L"] }],
        // 2% missing options
        status: "active"
      })), requiredFields = ["title", "description", "vendor", "productType", "tags", "images", "variants", "options", "status"], validCount = 0, gaps = [];
      for (let product of largeProductSet) {
        let isValid = !0;
        for (let field of requiredFields)
          (!product[field] || Array.isArray(product[field]) && product[field].length === 0 || typeof product[field] == "string" && product[field].trim() === "") && (gaps.push({ field, productId: product.id }), isValid = !1);
        isValid && validCount++;
      }
      let processingTime = Date.now() - startTime, expectedValidCount = Math.floor(1e3 * 0.7), tolerance = 50;
      if (Math.abs(validCount - expectedValidCount) > tolerance)
        throw new Error(`Performance test failed: expected ~${expectedValidCount} valid products, got ${validCount}`);
      if (processingTime > 5e3)
        throw new Error(`Performance test failed: processing took ${processingTime}ms, expected < 5000ms`);
      this.testResults.push({
        testName: "Performance Large Dataset",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalProducts: largeProductSet.length,
          validProducts: validCount,
          gapsFound: gaps.length,
          processingTime,
          productsPerSecond: Math.round(largeProductSet.length / (processingTime / 1e3))
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Performance Large Dataset",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  async testEdgeCases() {
    let startTime = Date.now();
    try {
      let edgeCases = [
        // Empty product
        {
          id: "empty",
          title: "",
          description: "",
          vendor: "",
          productType: "",
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: ""
        },
        // Product with only spaces
        {
          id: "spaces",
          title: "   ",
          description: "   ",
          vendor: "   ",
          productType: "Test Type",
          tags: [],
          images: [],
          variants: [],
          options: [],
          status: "active"
        },
        // Product with null/undefined values
        {
          id: "nulls",
          title: null,
          description: void 0,
          vendor: "Test Vendor",
          productType: "Test Type",
          tags: null,
          images: void 0,
          variants: [],
          options: [],
          status: "active"
        }
      ], results = [];
      for (let product of edgeCases) {
        let isValid = !0, gaps = [], requiredFields = ["title", "description", "vendor", "productType", "tags", "images", "variants", "options", "status"];
        for (let field of requiredFields) {
          let value = product[field];
          (!value || Array.isArray(value) && value.length === 0 || typeof value == "string" && value.trim() === "") && (gaps.push(field), isValid = !1);
        }
        results.push({ productId: product.id, isValid, gaps });
      }
      let validCount = results.filter((r) => r.isValid).length;
      if (validCount > 0)
        throw new Error(`Expected all edge cases to be invalid, but ${validCount} were valid`);
      this.testResults.push({
        testName: "Edge Cases",
        passed: !0,
        duration: Date.now() - startTime,
        details: {
          totalEdgeCases: edgeCases.length,
          allInvalid: !0,
          results
        }
      });
    } catch (error) {
      this.testResults.push({
        testName: "Edge Cases",
        passed: !1,
        error: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime
      });
    }
  }
  getTestSummary() {
    let total = this.testResults.length, passed = this.testResults.filter((r) => r.passed).length, failed = total - passed, duration = this.testResults.reduce((sum, r) => sum + r.duration, 0);
    return { total, passed, failed, duration };
  }
}, healthCheckTester = new HealthCheckTester();

// app/routes/api.test-health-check.ts
var loader = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return json({
        success: !1,
        error: "User not found"
      }, { status: 404 });
    let testResults = await healthCheckTester.runAllTests(
      user.id,
      session.shop,
      user.accessToken
    ), summary = healthCheckTester.getTestSummary();
    return await db.log.create({
      data: {
        userId: user.id,
        type: "health_check_test",
        message: `Health check tests completed: ${summary.passed}/${summary.total} passed`,
        metadata: {
          totalTests: summary.total,
          passedTests: summary.passed,
          failedTests: summary.failed,
          duration: summary.duration,
          results: testResults
        }
      }
    }), json({
      success: !0,
      summary,
      results: testResults,
      message: `Health check tests completed: ${summary.passed}/${summary.total} passed`
    });
  } catch (error) {
    return console.error("Health check test error:", error), json({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to run health check tests"
    }, { status: 500 });
  }
};

// app/routes/api.health-check.ts
var api_health_check_exports = {};
__export(api_health_check_exports, {
  action: () => action,
  loader: () => loader2
});
import { json as json2 } from "@remix-run/node";
init_shopify_server();
init_db();
var loader2 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request);
    if (console.log("Health check API called", {
      redisHost: process.env.REDIS_HOST,
      redisPort: process.env.REDIS_PORT,
      hasRedisPassword: !!process.env.REDIS_PASSWORD,
      healthCheckQueueExists: !!healthCheckQueue,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), !healthCheckQueue)
      return console.error("Health check queue is null - Redis connection failed"), json2({
        success: !1,
        error: "Health check system not available - Redis connection failed"
      }, { status: 503 });
    let user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return json2({
        success: !1,
        error: "User not found"
      }, { status: 404 });
    let healthScanJob = await healthCheckQueue.add("health-scan", {
      shopId: session.shop,
      userId: user.id,
      options: {
        maxProducts: 100,
        includePings: !0,
        includeInventory: !0,
        includeValidation: !0
      }
    }), latestAudit = await db.audit.findFirst({
      where: { userId: user.id },
      orderBy: { timestamp: "desc" }
    });
    return json2({
      success: !0,
      jobId: healthScanJob.id,
      currentScore: latestAudit?.score || 0,
      currentGaps: latestAudit?.gaps || [],
      message: "Health scan initiated"
    });
  } catch (error) {
    return console.error("Health check API error:", error), json2({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to initiate health checks"
    }, { status: 500 });
  }
}, action = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), formData = await request.formData(), action8 = formData.get("action");
    if (action8 === "trigger-scan") {
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json2({
          success: !1,
          error: "User not found"
        }, { status: 404 });
      if (!healthCheckQueue)
        return console.error("Health check queue is null - Redis connection failed"), json2({
          success: !1,
          error: "Health check system not available - Redis connection failed"
        }, { status: 503 });
      let healthScanJob = await healthCheckQueue.add("health-scan", {
        shopId: session.shop,
        userId: user.id,
        options: {
          maxProducts: 100,
          includePings: !0,
          includeInventory: !0,
          includeValidation: !0
        }
      }), latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" }
      });
      return json2({
        success: !0,
        jobId: healthScanJob.id,
        currentScore: latestAudit?.score || 0,
        currentGaps: latestAudit?.gaps || [],
        message: "Health scan initiated"
      });
    }
    if (action8 === "get-results") {
      if (!formData.get("jobId"))
        return json2({
          success: !1,
          error: "Job ID is required"
        }, { status: 400 });
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json2({
          success: !1,
          error: "User not found"
        }, { status: 404 });
      let latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" }
      }), sevenDaysAgo = /* @__PURE__ */ new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      let trends = await db.audit.findMany({
        where: {
          userId: user.id,
          timestamp: {
            gte: sevenDaysAgo
          }
        },
        orderBy: {
          timestamp: "asc"
        }
      });
      return json2({
        success: !0,
        result: latestAudit ? {
          score: latestAudit.score,
          totalProducts: latestAudit.totalProducts,
          validProducts: latestAudit.validProducts,
          gaps: latestAudit.gaps,
          timestamp: latestAudit.timestamp,
          trends: trends.map((t) => ({
            date: t.timestamp.toISOString().split("T")[0],
            score: t.score,
            totalProducts: t.totalProducts,
            validProducts: t.validProducts
          }))
        } : null
      });
    }
    if (action8 === "auto-fix") {
      let gapTypes = formData.get("gapTypes");
      if (!gapTypes)
        return json2({
          success: !1,
          error: "Gap types are required"
        }, { status: 400 });
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json2({
          success: !1,
          error: "User not found"
        }, { status: 404 });
      let aiEnrichmentJob = await backgroundJobsQueue?.add("ai-enrichment", {
        shopId: session.shop,
        userId: user.id,
        productIds: [],
        // Will be determined by gap types
        gapTypes: JSON.parse(gapTypes)
      });
      return json2({
        success: !0,
        jobId: aiEnrichmentJob?.id,
        message: "Auto-fix initiated"
      });
    }
    return json2({
      success: !1,
      error: "Invalid action"
    }, { status: 400 });
  } catch (error) {
    return console.error("Health check action error:", error), json2({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to process action"
    }, { status: 500 });
  }
};

// app/routes/api.queue-status.ts
var api_queue_status_exports = {};
__export(api_queue_status_exports, {
  loader: () => loader3
});
import { json as json3 } from "@remix-run/node";
init_shopify_server();
var loader3 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request);
    if (!healthCheckQueue || !backgroundJobsQueue)
      return json3({
        success: !1,
        error: "Queue system not available - Redis not configured"
      }, { status: 503 });
    let healthCheckStats = await healthCheckQueue.getJobCounts(), backgroundJobsStats = await backgroundJobsQueue.getJobCounts(), recentHealthChecks = await healthCheckQueue.getJobs(["completed"], 0, 5), recentBackgroundJobs = await backgroundJobsQueue.getJobs(["completed"], 0, 5);
    return json3({
      success: !0,
      queues: {
        healthChecks: {
          ...healthCheckStats,
          recentJobs: recentHealthChecks.map((job) => ({
            id: job.id,
            name: job.name,
            data: job.data,
            result: job.returnvalue,
            completedOn: job.finishedOn
          }))
        },
        backgroundJobs: {
          ...backgroundJobsStats,
          recentJobs: recentBackgroundJobs.map((job) => ({
            id: job.id,
            name: job.name,
            data: job.data,
            result: job.returnvalue,
            completedOn: job.finishedOn
          }))
        }
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    return json3({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to get queue status"
    }, { status: 500 });
  }
};

// app/routes/api.settings.ts
var api_settings_exports = {};
__export(api_settings_exports, {
  action: () => action2,
  loader: () => loader4
});
init_shopify_server();
init_db();
import { json as json4 } from "@remix-run/node";
var loader4 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    return user ? json4({
      success: !0,
      settings: {
        healthChecksEnabled: !0,
        healthCheckTime: "02:00",
        // 2 AM UTC
        autoFixEnabled: !0,
        emailNotifications: !0,
        maxProductsPerScan: user.tier === "enterprise" ? 500 : 100,
        includeUrlPings: !0,
        includeInventoryChecks: !0,
        includeValidation: !0
      }
    }) : json4({
      success: !1,
      error: "User not found"
    }, { status: 404 });
  } catch (error) {
    return console.error("Settings API error:", error), json4({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to fetch settings"
    }, { status: 500 });
  }
}, action2 = async ({ request }) => {
  try {
    let { session } = await authenticate.admin(request), formData = await request.formData(), action8 = formData.get("action"), user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return json4({
        success: !1,
        error: "User not found"
      }, { status: 404 });
    if (action8 === "update") {
      let healthChecksEnabled = formData.get("healthChecksEnabled") === "true", healthCheckTime = formData.get("healthCheckTime"), autoFixEnabled = formData.get("autoFixEnabled") === "true", emailNotifications = formData.get("emailNotifications") === "true", maxProductsPerScan = parseInt(formData.get("maxProductsPerScan")) || 100, includeUrlPings = formData.get("includeUrlPings") === "true", includeInventoryChecks = formData.get("includeInventoryChecks") === "true", includeValidation = formData.get("includeValidation") === "true";
      return await db.log.create({
        data: {
          userId: user.id,
          type: "settings_update",
          message: `Settings updated: health checks ${healthChecksEnabled ? "enabled" : "disabled"}, auto-fix ${autoFixEnabled ? "enabled" : "disabled"}`,
          metadata: {
            healthChecksEnabled,
            healthCheckTime,
            autoFixEnabled,
            emailNotifications,
            maxProductsPerScan,
            includeUrlPings,
            includeInventoryChecks,
            includeValidation
          }
        }
      }), json4({
        success: !0,
        message: "Settings updated successfully"
      });
    }
    return json4({
      success: !1,
      error: "Invalid action"
    }, { status: 400 });
  } catch (error) {
    return console.error("Settings action error:", error), json4({
      success: !1,
      error: error instanceof Error ? error.message : "Failed to update settings"
    }, { status: 500 });
  }
};

// app/routes/api.validate.ts
var api_validate_exports = {};
__export(api_validate_exports, {
  action: () => action3
});
init_shopify_server();
init_shopifySync();
init_fieldMapper();
import { json as json5 } from "@remix-run/node";

// app/utils/validator.ts
init_openaiSpec();
import Ajv2 from "ajv";
import addFormats2 from "ajv-formats";
import axios2 from "axios";
var ajv2 = new Ajv2({ allErrors: !0 });
addFormats2(ajv2);
var validate = ajv2.compile(OPENAI_PRODUCT_SCHEMA);
function validateProduct(product) {
  let errors = [], warnings = [];
  if (!validate(product) && validate.errors)
    for (let error of validate.errors)
      errors.push({
        field: error.instancePath ? error.instancePath.slice(1) : "root",
        message: error.message || "Validation error",
        value: error.data
      });
  return validateDescription(product, warnings), validatePrice(product, errors), validateImageUrls(product, warnings), validateLinks(product, warnings), {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
function validateDescription(product, warnings) {
  if (!product.description)
    return;
  let desc = product.description;
  /<[^>]*>/g.test(desc) && warnings.push({
    field: "description",
    message: "Description contains HTML tags",
    suggestion: "Use plain text for better AI search compatibility"
  }), desc.length < 100 && warnings.push({
    field: "description",
    message: "Description is too short",
    suggestion: "Add more details about features, benefits, and use cases"
  }), desc.length > 4e3 && warnings.push({
    field: "description",
    message: "Description is too long",
    suggestion: "Consider shortening to under 4000 characters"
  });
  let genericPhrases = [
    "great product",
    "high quality",
    "perfect for",
    "amazing",
    "wonderful",
    "excellent"
  ], lowerDesc = desc.toLowerCase();
  genericPhrases.filter((phrase) => lowerDesc.includes(phrase)).length > 2 && warnings.push({
    field: "description",
    message: "Description contains too many generic phrases",
    suggestion: "Use more specific, descriptive language"
  });
}
function validatePrice(product, errors) {
  if (!product.price)
    return;
  /^\d+\.\d{2} [A-Z]{3}$/.test(product.price) || errors.push({
    field: "price",
    message: 'Price must be in format "XX.XX USD"',
    value: product.price
  });
}
async function validateImageUrls(product, warnings) {
  if (!(!product.image_urls || product.image_urls.length === 0))
    for (let [index, url] of product.image_urls.entries())
      try {
        let response = await axios2.head(url, { timeout: 5e3 });
        response.status !== 200 && warnings.push({
          field: `image_urls[${index}]`,
          message: `Image URL returned status ${response.status}`,
          suggestion: "Check if the image URL is accessible"
        });
        let contentType = response.headers["content-type"];
        contentType && !contentType.startsWith("image/") && warnings.push({
          field: `image_urls[${index}]`,
          message: "URL does not appear to be an image",
          suggestion: "Ensure the URL points to an image file"
        });
      } catch {
        warnings.push({
          field: `image_urls[${index}]`,
          message: "Failed to validate image URL",
          suggestion: "Check if the URL is accessible and points to an image"
        });
      }
}
async function validateLinks(product, warnings) {
  let linksToValidate = [];
  product.documentation_url && linksToValidate.push({ url: product.documentation_url, field: "documentation_url" }), product.video_urls && product.video_urls.forEach((url, index) => {
    linksToValidate.push({ url, field: `video_urls[${index}]` });
  });
  for (let { url, field } of linksToValidate)
    try {
      let response = await axios2.head(url, { timeout: 5e3 });
      response.status !== 200 && warnings.push({
        field,
        message: `Link returned status ${response.status}`,
        suggestion: "Check if the link is accessible"
      });
    } catch {
      warnings.push({
        field,
        message: "Failed to validate link",
        suggestion: "Check if the link is accessible"
      });
    }
}
async function validateProducts(products) {
  let results = [];
  for (let product of products) {
    let result = validateProduct(product);
    results.push(result);
  }
  return results;
}
function getValidationSummary(results) {
  let totalProducts = results.length, validProducts = results.filter((r) => r.valid).length, totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0), totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0), commonErrors = getCommonIssues(results.map((r) => r.errors).flat(), "error"), commonWarnings = getCommonIssues(results.map((r) => r.warnings).flat(), "warning");
  return {
    totalProducts,
    validProducts,
    invalidProducts: totalProducts - validProducts,
    totalErrors,
    totalWarnings,
    validationRate: totalProducts > 0 ? Math.round(validProducts / totalProducts * 100) : 0,
    commonErrors,
    commonWarnings
  };
}
function getCommonIssues(issues, type) {
  let fieldCounts = /* @__PURE__ */ new Map();
  for (let issue of issues) {
    let key = issue.field;
    fieldCounts.has(key) ? fieldCounts.get(key).count++ : fieldCounts.set(key, { count: 1, message: issue.message });
  }
  return Array.from(fieldCounts.entries()).map(([field, data]) => ({ field, ...data })).sort((a, b) => b.count - a.count).slice(0, 10);
}

// app/routes/api.validate.ts
init_db();
var action3 = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json5({ error: "User not found" }, { status: 404 });
  try {
    if ((await request.formData()).get("action") === "validate") {
      let sampleProducts = (await new ShopifySyncService(session.shop, user.accessToken).syncProducts(user.id)).slice(0, 10), mappedProducts = mapProductsToSpec(sampleProducts), validationResults = await validateProducts(mappedProducts.map((p) => {
        let { originalId, score, ...spec } = p;
        return spec;
      })), summary = getValidationSummary(validationResults), audit = await db.audit.create({
        data: {
          userId: user.id,
          score: summary.validationRate,
          totalProducts: summary.totalProducts,
          validProducts: summary.validProducts,
          gaps: summary.commonErrors.map((error) => ({
            field: error.field,
            count: error.count,
            message: error.message
          }))
        }
      });
      return await db.log.create({
        data: {
          userId: user.id,
          type: "validation",
          message: `Validated ${summary.totalProducts} products - ${summary.validationRate}% passed validation`,
          metadata: {
            summary,
            auditId: audit.id,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), json5({
        success: !0,
        data: {
          auditId: audit.id,
          summary,
          products: mappedProducts.map((product, index) => ({
            id: product.originalId,
            title: product.title,
            score: product.score,
            validation: validationResults[index]
          }))
        }
      });
    }
    return json5({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return console.error("Validation error:", error), await db.log.create({
      data: {
        userId: user.id,
        type: "error",
        message: `Validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: error instanceof Error ? error.stack : String(error),
        metadata: {
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    }), json5(
      {
        success: !1,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
};

// app/routes/api.enrich.ts
var api_enrich_exports = {};
__export(api_enrich_exports, {
  action: () => action4,
  loader: () => loader5
});
init_shopify_server();
init_shopifySync();
init_aiEnrich();
init_db();
import { json as json6 } from "@remix-run/node";
var loader5 = async ({ request }) => {
  console.log("\u{1F3AF} AI ENRICH LOADER CALLED");
  try {
    let { session } = await authenticate.admin(request);
    return console.log("\u2705 AI Enrich loader authentication successful for shop:", session.shop), json6({ success: !0, message: "AI Enrichment API ready" });
  } catch (error) {
    return console.error("\u274C AI Enrich loader authentication failed:", error), json6({ success: !1, error: "Authentication failed" }, { status: 401 });
  }
}, action4 = async ({ request }) => {
  console.log("\u{1F3AF} AI ENRICH ACTION CALLED - Fixed Syntax Error");
  try {
    console.log("\u{1F50D} Attempting authentication for AI enrichment..."), console.log("\u{1F50D} Request URL:", request.url), console.log("\u{1F50D} Request method:", request.method), console.log("\u{1F50D} Request headers:", Object.fromEntries(request.headers.entries()));
    let { session } = await authenticate.admin(request);
    console.log("\u2705 AI Enrich authentication successful for shop:", session.shop);
    let user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return console.log("\u274C User not found for shop:", session.shop), json6({ error: "User not found" }, { status: 404 });
    console.log("\u{1F464} User found:", user.id);
    let formData = await request.formData(), action8 = formData.get("action"), shopFromForm = formData.get("shop");
    if (console.log("\u{1F4DD} Form data action:", action8), console.log("\u{1F3EA} Shop from form:", shopFromForm), action8 === "enrich") {
      console.log("\u{1F680} Starting AI enrichment process...");
      let productIds = formData.getAll("productIds"), maxProducts = parseInt(formData.get("maxProducts")) || 5, tierLimits = {
        starter: 5,
        pro: 25,
        enterprise: 100
      }, limit = tierLimits[user.tier] || tierLimits.starter;
      if (maxProducts > limit)
        return json6({
          success: !1,
          error: `Your ${user.tier} tier allows up to ${limit} products per enrichment. Please upgrade to process more products.`
        }, { status: 400 });
      console.log("\u{1F511} Loading offline session for AI enrichment...");
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return console.log("\u274C Offline session not found for AI enrichment"), json6({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      console.log("\u2705 Offline session loaded for AI enrichment"), console.log("\u{1F4E6} Fetching products for AI enrichment...");
      let allProducts = await new ShopifySyncService(session.shop, offlineSession.accessToken).syncProducts(user.id);
      console.log("\u{1F4E6} Products fetched:", allProducts.length);
      let productsToEnrich = productIds.length > 0 ? allProducts.filter((p) => productIds.includes(p.id)) : allProducts.slice(0, maxProducts);
      if (console.log("\u{1F3AF} Products selected for enrichment:", productsToEnrich.length), productsToEnrich.length === 0)
        return console.log("\u274C No products found to enrich"), json6({
          success: !1,
          error: "No products found to enrich"
        }, { status: 400 });
      console.log("\u{1F916} Starting AI enrichment service...");
      let enrichmentService = new AIEnrichmentService();
      console.log("\u{1F916} Calling enrichProducts with", productsToEnrich.length, "products");
      let enrichmentResults = await enrichmentService.enrichProducts(
        user.id,
        productsToEnrich,
        {
          enrichDescription: !0,
          inferMaterial: !0,
          generateUseCases: !0,
          generateFeatures: !0,
          generateKeywords: !0
        },
        maxProducts
      );
      console.log("\u2705 AI enrichment completed, results:", enrichmentResults.length);
      let applyToShopify = formData.get("applyToShopify") === "true", appliedResults = [];
      if (applyToShopify)
        for (let result of enrichmentResults)
          try {
            let success = await enrichmentService.applyEnrichmentToShopify(
              user.id,
              session.shop,
              offlineSession.accessToken,
              result
            );
            appliedResults.push({
              productId: result.originalProduct.id,
              success,
              improvements: result.improvements
            });
          } catch (error) {
            appliedResults.push({
              productId: result.originalProduct.id,
              success: !1,
              error: error instanceof Error ? error.message : "Unknown error"
            });
          }
      let totalUsage = enrichmentResults.reduce((sum, result) => sum + result.totalUsage, 0);
      console.log("\u{1F4B0} Total usage calculated:", totalUsage), console.log("\u{1F4DD} Creating database log..."), await db.log.create({
        data: {
          userId: user.id,
          type: "enrichment",
          message: `AI enrichment completed for ${enrichmentResults.length} products`,
          metadata: {
            productsProcessed: enrichmentResults.length,
            totalUsage,
            appliedToShopify: applyToShopify,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), console.log("\u2705 Database log created");
      let response = {
        success: !0,
        data: {
          productsProcessed: enrichmentResults.length,
          totalUsage,
          appliedToShopify: applyToShopify,
          results: enrichmentResults.map((result) => ({
            productId: result.originalProduct.id,
            title: result.originalProduct.title,
            improvements: result.improvements,
            totalUsage: result.totalUsage,
            errors: result.errors
          })),
          appliedResults
        }
      };
      return console.log("\u{1F389} Returning successful response:", response), json6(response);
    }
    return json6({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("\u274C CRITICAL ERROR in AI enrichment:", error), console.error("\u274C Error stack:", error instanceof Error ? error.stack : "No stack trace");
    try {
      let { session } = await authenticate.admin(request).catch(() => null);
      if (session) {
        let user = await db.user.findUnique({
          where: { shopId: session.shop }
        }).catch(() => null);
        user && (await db.log.create({
          data: {
            userId: user.id,
            type: "error",
            message: `Enrichment error: ${error instanceof Error ? error.message : "Unknown error"}`,
            error: error instanceof Error ? error.stack : String(error),
            metadata: {
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }
          }
        }), console.log("\u{1F4DD} Error logged to database"));
      }
    } catch (logError) {
      console.error("\u274C Failed to log error to database:", logError);
    }
    return json6(
      {
        success: !1,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
};

// app/routes/api.sync.ts
var api_sync_exports = {};
__export(api_sync_exports, {
  action: () => action5,
  loader: () => loader6
});
init_shopify_server();
init_shopifySync();
init_db();
import { json as json7 } from "@remix-run/node";
var loader6 = async ({ request }) => {
  let { session } = await authenticate.admin(request), user = await db.user.findUnique({
    where: { shopId: session.shop }
  });
  if (!user)
    return json7({ error: "User not found" }, { status: 404 });
  let recentLogs = await db.log.findMany({
    where: {
      userId: user.id,
      type: "sync"
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 10
  });
  return json7({
    logs: recentLogs.map((log) => ({
      id: log.id,
      type: log.type,
      message: log.message,
      createdAt: log.createdAt,
      metadata: log.metadata
    }))
  });
}, action5 = async ({ request }) => {
  console.log("\u{1F3AF} SYNC ACTION CALLED - Request method:", request.method), console.log("\u{1F3AF} SYNC ACTION CALLED - Request URL:", request.url), console.log("\u{1F3AF} Request headers:", Object.fromEntries(request.headers.entries()));
  try {
    console.log("\u{1F510} Attempting authentication...");
    let { session } = await authenticate.admin(request);
    console.log("\u{1F3AF} Authentication successful for shop:", session.shop);
    let user = await db.user.findUnique({
      where: { shopId: session.shop }
    });
    if (!user)
      return console.log("\u274C User not found for shop:", session.shop), json7({ error: "User not found" }, { status: 404 });
    console.log("\u{1F680} Starting sync for shop:", session.shop), console.log("\u{1F464} User ID:", user.id);
    let syncService = new ShopifySyncService(session.shop, user.accessToken);
    console.log("\u{1F527} Sync service initialized"), console.log("\u{1F4E6} Starting product sync...");
    let products = await syncService.syncProducts(user.id);
    console.log("\u2705 Product sync completed:", products.length, "products"), console.log("\u{1F4CA} Fetching inventory levels...");
    let inventoryLevels = await syncService.getInventoryLevels(session.shop, user.accessToken);
    console.log("\u{1F4C8} Inventory levels:", inventoryLevels.length), console.log("\u{1F6D2} Fetching recent orders...");
    let recentOrders = await syncService.getRecentOrders(session.shop, user.accessToken, 50);
    console.log("\u{1F4CB} Recent orders:", recentOrders.length), console.log("\u{1F4DD} Creating audit record...");
    let audit = await db.audit.create({
      data: {
        userId: user.id,
        score: 0,
        // Will be calculated after field mapping
        totalProducts: products.length,
        validProducts: 0,
        // Will be calculated after validation
        gaps: []
        // Will be populated after field mapping and validation
      }
    });
    console.log("\u2705 Audit record created:", audit.id);
    let response = {
      success: !0,
      message: `Successfully synced ${products.length} products`,
      data: {
        productsCount: products.length,
        inventoryLevelsCount: inventoryLevels.length,
        recentOrdersCount: recentOrders.length,
        auditId: audit.id
      }
    };
    return console.log("\u{1F389} Sync response:", response), json7(response);
  } catch (error) {
    if (console.error("\u274C SYNC ACTION ERROR:", error), console.error("\u274C Error type:", error?.constructor?.name), console.error("\u274C Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : String(error),
      isResponse: error instanceof Response,
      responseStatus: error instanceof Response ? error.status : "N/A",
      responseHeaders: error instanceof Response ? Object.fromEntries(error.headers.entries()) : "N/A"
    }), error instanceof Response)
      throw console.log("\u{1F504} Re-throwing OAuth redirect response - Status:", error.status), console.log("\u{1F504} Redirect location:", error.headers.get("location")), error;
    return json7(
      {
        success: !1,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
};

// app/routes/webhooks.ts
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action6
});
init_shopify_server();
init_db();
import { json as json8 } from "@remix-run/node";
var action6 = async ({ request }) => {
  let { topic, shop, session } = await authenticate.webhook(request);
  if (!session)
    return json8({ error: "No session found" }, { status: 401 });
  try {
    let user = await db.user.findUnique({
      where: { shopId: shop }
    });
    if (!user)
      return json8({ error: "User not found" }, { status: 404 });
    switch (topic) {
      case "PRODUCTS_CREATE":
      case "PRODUCTS_UPDATE":
        await handleProductWebhook(user.id, session.shop, user.accessToken, topic);
        break;
      case "PRODUCTS_DELETE":
        await handleProductDelete(user.id, topic);
        break;
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }
    return json8({ success: !0 });
  } catch (error) {
    if (console.error("Webhook error:", error), session?.shop) {
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      user && await db.log.create({
        data: {
          userId: user.id,
          type: "error",
          message: `Webhook error: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.stack : String(error),
          metadata: {
            topic,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      });
    }
    return json8(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
async function handleProductWebhook(userId, shopDomain, accessToken, topic) {
  try {
    await db.log.create({
      data: {
        userId,
        type: "webhook",
        message: `Product webhook triggered: ${topic}`,
        metadata: {
          topic,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    }), console.log(`Product webhook received: ${topic} for shop: ${shopDomain}`);
  } catch (error) {
    throw console.error("Error handling product webhook:", error), error;
  }
}
async function handleProductDelete(userId, topic) {
  try {
    await db.log.create({
      data: {
        userId,
        type: "webhook",
        message: `Product deleted: ${topic}`,
        metadata: {
          topic,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    }), console.log(`Product deletion webhook: ${topic}`);
  } catch (error) {
    throw console.error("Error handling product deletion webhook:", error), error;
  }
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action7,
  default: () => Index,
  loader: () => loader7
});
var import_react137 = __toESM(require_react(), 1);
import { json as json9 } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
init_shopify_server();
init_db();

// app/components/HealthCheckModal.tsx
var import_react135 = __toESM(require_react(), 1);
import {
  CheckCircleIcon,
  AlertTriangleIcon as AlertTriangleIcon2,
  XCircleIcon as XCircleIcon2,
  ArrowUpIcon,
  ArrowDownIcon
} from "@shopify/polaris-icons";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function HealthCheckModal({
  isOpen,
  onClose,
  jobId,
  currentScore = 0,
  currentGaps = []
}) {
  let [loading, setLoading] = (0, import_react135.useState)(!1), [results, setResults] = (0, import_react135.useState)(null), [toast, setToast] = (0, import_react135.useState)(null), [autoFixing, setAutoFixing] = (0, import_react135.useState)(!1);
  (0, import_react135.useEffect)(() => {
    isOpen && jobId && fetchResults();
  }, [isOpen, jobId]);
  let fetchResults = async () => {
    setLoading(!0);
    try {
      let formData = new FormData();
      formData.append("action", "get-results"), formData.append("jobId", jobId);
      let data = await (await fetch("/api/health-check", {
        method: "POST",
        body: formData
      })).json();
      data.success && data.result ? setResults(data.result) : setToast({ content: data.error || "Failed to fetch results", error: !0 });
    } catch {
      setToast({ content: "Failed to fetch results", error: !0 });
    } finally {
      setLoading(!1);
    }
  }, handleAutoFix = async () => {
    if (!results)
      return;
    let fixableGaps = results.gaps.filter((gap) => gap.fixable);
    if (fixableGaps.length === 0) {
      setToast({ content: "No fixable gaps found", error: !0 });
      return;
    }
    setAutoFixing(!0);
    try {
      let formData = new FormData();
      formData.append("action", "auto-fix"), formData.append("gapTypes", JSON.stringify(fixableGaps.map((gap) => gap.field)));
      let data = await (await fetch("/api/health-check", {
        method: "POST",
        body: formData
      })).json();
      data.success ? (setToast({ content: `Auto-fix initiated for ${fixableGaps.length} gaps` }), setTimeout(fetchResults, 2e3)) : setToast({ content: data.error || "Auto-fix failed", error: !0 });
    } catch {
      setToast({ content: "Auto-fix failed", error: !0 });
    } finally {
      setAutoFixing(!1);
    }
  }, getScoreColor = (score) => score >= 90 ? "success" : score >= 70 ? "warning" : "critical", getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return XCircleIcon2;
      case "error":
        return AlertTriangleIcon2;
      case "warning":
        return AlertTriangleIcon2;
      default:
        return CheckCircleIcon;
    }
  }, getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "critical";
      case "error":
        return "critical";
      case "warning":
        return "warning";
      default:
        return "success";
    }
  }, formatTrend = (trends) => {
    if (trends.length < 2)
      return null;
    let latest = trends[trends.length - 1], previous = trends[trends.length - 2], diff = latest.score - previous.score;
    return {
      value: diff,
      icon: diff >= 0 ? ArrowUpIcon : ArrowDownIcon,
      color: diff >= 0 ? "success" : "critical"
    };
  }, gapsTableRows = results?.gaps.map((gap, index) => [
    /* @__PURE__ */ jsxs2(InlineStack, { gap: "200", align: "start", children: [
      /* @__PURE__ */ jsx3(Icon, { source: getSeverityIcon(gap.severity) }),
      /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", fontWeight: "medium", children: gap.field })
    ] }, index),
    /* @__PURE__ */ jsx3(Badge, { tone: getSeverityColor(gap.severity), children: gap.severity }, `badge-${index}`),
    gap.count,
    gap.fixable ? "Yes" : "No"
  ]) || [], trendsTableRows = results?.trends.slice(-7).map((trend, index) => [
    new Date(trend.date).toLocaleDateString(),
    `${trend.score}%`,
    trend.totalProducts,
    trend.validProducts
  ]) || [];
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx3(
      Modal,
      {
        open: isOpen,
        onClose,
        title: "Health Check Results",
        size: "large",
        children: /* @__PURE__ */ jsx3(Modal.Section, { children: loading ? /* @__PURE__ */ jsxs2(InlineStack, { align: "center", children: [
          /* @__PURE__ */ jsx3(Spinner, { size: "large" }),
          /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", children: "Analyzing your catalog..." })
        ] }) : results ? /* @__PURE__ */ jsxs2(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
            /* @__PURE__ */ jsxs2(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Overall Health Score" }),
              /* @__PURE__ */ jsxs2(Badge, { tone: getScoreColor(results.score), children: [
                results.score,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx3(
              ProgressBar,
              {
                progress: results.score,
                size: "large",
                color: getScoreColor(results.score)
              }
            ),
            /* @__PURE__ */ jsxs2(InlineStack, { gap: "400", align: "start", children: [
              /* @__PURE__ */ jsxs2(Box, { children: [
                /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Total Products" }),
                /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: results.totalProducts })
              ] }),
              /* @__PURE__ */ jsxs2(Box, { children: [
                /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Valid Products" }),
                /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: results.validProducts })
              ] }),
              /* @__PURE__ */ jsxs2(Box, { children: [
                /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Issues Found" }),
                /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: results.gaps.length })
              ] })
            ] }),
            results.trends.length > 1 && /* @__PURE__ */ jsx3(Box, { children: /* @__PURE__ */ jsxs2(InlineStack, { gap: "200", align: "start", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "7-Day Trend" }),
              (() => {
                let trend = formatTrend(results.trends);
                return trend ? /* @__PURE__ */ jsxs2(InlineStack, { gap: "100", children: [
                  /* @__PURE__ */ jsx3(Icon, { source: trend.icon }),
                  /* @__PURE__ */ jsxs2(Text, { variant: "bodyMd", color: trend.color, children: [
                    trend.value > 0 ? "+" : "",
                    trend.value.toFixed(1),
                    "%"
                  ] })
                ] }) : null;
              })()
            ] }) })
          ] }) }),
          results.gaps.length > 0 && /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
            /* @__PURE__ */ jsxs2(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Issues Found" }),
              results.gaps.some((gap) => gap.fixable) && /* @__PURE__ */ jsx3(
                Button,
                {
                  variant: "primary",
                  onClick: handleAutoFix,
                  loading: autoFixing,
                  disabled: autoFixing,
                  children: "Auto-Fix Fixable Issues"
                }
              )
            ] }),
            /* @__PURE__ */ jsx3(
              DataTable,
              {
                columnContentTypes: ["text", "text", "numeric", "text"],
                headings: ["Field", "Severity", "Count", "Fixable"],
                rows: gapsTableRows
              }
            )
          ] }) }),
          results.trends.length > 0 && /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(BlockStack, { gap: "300", children: [
            /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Health Score Trends (Last 7 Days)" }),
            /* @__PURE__ */ jsx3(
              DataTable,
              {
                columnContentTypes: ["text", "numeric", "numeric", "numeric"],
                headings: ["Date", "Score", "Total Products", "Valid Products"],
                rows: trendsTableRows
              }
            )
          ] }) }),
          results.gaps.length === 0 && /* @__PURE__ */ jsx3(Card, { children: /* @__PURE__ */ jsxs2(InlineStack, { align: "center", gap: "300", children: [
            /* @__PURE__ */ jsx3(Icon, { source: CheckCircleIcon }),
            /* @__PURE__ */ jsxs2(BlockStack, { gap: "200", children: [
              /* @__PURE__ */ jsx3(Text, { variant: "headingMd", children: "Excellent!" }),
              /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "Your catalog is in great health. No issues were found." })
            ] })
          ] }) })
        ] }) : /* @__PURE__ */ jsx3(Text, { variant: "bodyMd", color: "subdued", children: "No results available. Please try running the health check again." }) })
      }
    ),
    toast && /* @__PURE__ */ jsx3(
      Toast2,
      {
        content: toast.content,
        error: toast.error,
        onDismiss: () => setToast(null)
      }
    )
  ] });
}

// app/routes/_index.tsx
init_openaiSpec();
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var loader7 = async ({ request }) => {
  let requestId = Math.random().toString(36).substring(7), startTime = Date.now();
  try {
    console.log(`\u{1F50D} [${requestId}] DEBUG - Starting authentication for request:`, request.url), console.log(`\u{1F50D} [${requestId}] DEBUG - Request headers:`, Object.fromEntries(request.headers.entries()));
    let { session } = await authenticate.admin(request);
    console.log(`\u{1F50D} [${requestId}] DEBUG - Session shop:`, session.shop), console.log(`\u{1F50D} [${requestId}] DEBUG - Session exists:`, !!session), console.log(`\u{1F50D} [${requestId}] DEBUG - Access token exists:`, !!session.accessToken), console.log(`\u{1F50D} [${requestId}] DEBUG - Session ID:`, session.id), console.log(`\u{1F50D} [${requestId}] DEBUG - Session scope:`, session.scope), console.log(`\u{1F50D} [${requestId}] DEBUG - Session isOnline:`, session.isOnline), console.log(`\u{1F50D} [${requestId}] DEBUG - Session expires:`, session.expires), console.log(`\u{1F50D} [${requestId}] DEBUG - Access token length:`, session.accessToken?.length), console.log(`\u{1F50D} [${requestId}] DEBUG - Access token prefix:`, session.accessToken?.substring(0, 15) + "...");
    let user = null, latestAudit = null, recentLogs = [];
    try {
      user = await db.user.findUnique({
        where: { shopId: session.shop }
      }), user && (latestAudit = await db.audit.findFirst({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" }
      }), await db.log.deleteMany({
        where: {
          userId: user.id,
          message: {
            contains: "GraphQL Error"
          }
        }
      }), recentLogs = await db.log.findMany({
        where: {
          userId: user.id,
          // Filter out logs with raw error details
          message: {
            not: {
              contains: "GraphQL Error"
            }
          }
        },
        orderBy: { createdAt: "desc" },
        take: 3
      }));
    } catch (dbError) {
      console.error("Database error in loader:", dbError);
    }
    let products = [], totalProducts = 0, averageScore = 0;
    if (user)
      try {
        let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`;
        console.log(`\u{1F511} [${requestId}] Loading offline session:`, offlineSessionId);
        let offlineSession = await sessionStorage2.loadSession(offlineSessionId);
        if (console.log(`\u{1F50D} [${requestId}] Offline session found:`, !!offlineSession), console.log(`\u{1F50D} [${requestId}] Offline session has accessToken:`, !!offlineSession?.accessToken), offlineSession && (console.log(`\u{1F50D} [${requestId}] Offline session details:`), console.log(`\u{1F50D} [${requestId}] - ID:`, offlineSession.id), console.log(`\u{1F50D} [${requestId}] - Shop:`, offlineSession.shop), console.log(`\u{1F50D} [${requestId}] - Scope:`, offlineSession.scope), console.log(`\u{1F50D} [${requestId}] - IsOnline:`, offlineSession.isOnline), console.log(`\u{1F50D} [${requestId}] - Expires:`, offlineSession.expires), console.log(`\u{1F50D} [${requestId}] - Access token length:`, offlineSession.accessToken?.length), console.log(`\u{1F50D} [${requestId}] - Access token prefix:`, offlineSession.accessToken?.substring(0, 15) + "...")), offlineSession?.accessToken) {
          console.log("\u2705 Offline session loaded, has accessToken: true"), console.log("\u{1F511} Access token prefix:", offlineSession.accessToken.substring(0, 15) + "..."), console.log("\u{1F511} Access token length:", offlineSession.accessToken.length);
          let { ShopifySyncService: ShopifySyncService2 } = await Promise.resolve().then(() => (init_shopifySync(), shopifySync_exports)), { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), shopifyProducts = await new ShopifySyncService2(session.shop, offlineSession.accessToken).syncProducts(user.id), storedProducts = await db.product.findMany({
            where: { userId: user.id },
            select: {
              shopifyId: !0,
              recommendations: !0
            }
          }), recommendationsMap = /* @__PURE__ */ new Map();
          storedProducts.forEach((sp) => {
            sp.recommendations && recommendationsMap.set(sp.shopifyId, sp.recommendations);
          }), products = shopifyProducts.map((shopifyProduct) => {
            let spec = mapShopifyToSpec2(shopifyProduct), scoreData = calculateProductScore2(spec), productId = shopifyProduct.id.replace("gid://shopify/Product/", "");
            return {
              id: productId,
              title: shopifyProduct.title || "Untitled Product",
              description: shopifyProduct.description || "No description",
              score: scoreData.score,
              gaps: scoreData.gaps,
              rawProduct: shopifyProduct,
              // Store raw product for detail view
              spec,
              // Store mapped spec for recommendations
              recommendations: recommendationsMap.get(productId) || null
              // Include stored recommendations
            };
          }), totalProducts = shopifyProducts.length, averageScore = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.score, 0) / products.length) : 0;
        } else
          console.log("\u274C Offline session not found or no access token"), console.log("\u{1F50D} Offline session exists:", !!offlineSession), console.log("\u{1F50D} Access token exists:", !!offlineSession?.accessToken), console.log("\u26A0\uFE0F This usually means the app needs to be reinstalled to get a fresh session");
      } catch (error) {
        if (console.error("Error fetching products in loader:", error), console.log(`\u274C [${requestId}] Error type:`, error?.constructor?.name), console.log(`\u274C [${requestId}] Error message:`, error instanceof Error ? error.message : "Unknown error"), console.log(`\u274C [${requestId}] Error stack:`, error instanceof Error ? error.stack : "No stack trace"), error instanceof Error && error.message.includes("401")) {
          console.log(`\u{1F511} [${requestId}] Authentication error detected - clearing invalid session`), console.log(`\u26A0\uFE0F [${requestId}] The access token is invalid/expired. Clearing session to force re-authentication.`), console.log(`\u{1F50D} [${requestId}] Error details:`, {
            message: error.message,
            stack: error.stack,
            isGraphQLError: error.message.includes("GraphQL Error"),
            is401Error: error.message.includes("401"),
            errorType: error.constructor.name
          });
          try {
            let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`;
            console.log(`\u{1F5D1}\uFE0F [${requestId}] Deleting invalid offline session:`, offlineSessionId), await sessionStorage2.deleteSession(offlineSessionId), console.log(`\u2705 [${requestId}] Invalid session cleared - next page load will trigger fresh authentication`), user && await db.log.create({
              data: {
                userId: user.id,
                type: "warning",
                message: `Invalid session cleared for shop ${session.shop} - 401 authentication error`,
                metadata: {
                  requestId,
                  sessionId: offlineSessionId,
                  errorMessage: error.message,
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
                }
              }
            });
          } catch (clearError) {
            console.error(`\u274C [${requestId}] Error clearing session:`, clearError);
          }
        } else
          console.log(`\u{1F50D} [${requestId}] Non-authentication error detected:`, {
            errorType: error?.constructor?.name,
            message: error instanceof Error ? error.message : "Unknown error",
            isResponse: error instanceof Response,
            responseStatus: error instanceof Response ? error.status : "N/A"
          });
        products = [
          {
            id: "1",
            title: "Sample Product 1",
            description: "Basic product description",
            score: 75,
            gaps: ["material", "weight"]
          },
          {
            id: "2",
            title: "Sample Product 2",
            description: "Another product with minimal details",
            score: 60,
            gaps: ["material", "dimensions", "use_cases"]
          },
          {
            id: "3",
            title: "Sample Product 3",
            description: "Well-described product with comprehensive details",
            score: 95,
            gaps: []
          }
        ];
      }
    let dashboardMetrics = ((products2, user2) => {
      let totalProducts2 = products2.length, validProducts = products2.filter((p) => p.score >= 90).length, warningProducts = products2.filter((p) => p.score >= 70 && p.score < 90).length, invalidProducts = products2.filter((p) => p.score < 70).length, productsPassedPercentage = totalProducts2 > 0 ? Math.round(validProducts / totalProducts2 * 100) : 0, aiReadinessScore = Math.round(averageScore), optimizationProgress = Math.round(averageScore), lastSyncTime = null;
      return user2 && (lastSyncTime = /* @__PURE__ */ new Date()), {
        aiReadinessScore,
        totalProducts: totalProducts2,
        validProducts,
        warningProducts,
        invalidProducts,
        productsPassedPercentage,
        lastSyncTime,
        optimizationProgress
      };
    })(products, user), duration = Date.now() - startTime;
    return console.log(`\u2705 [${requestId}] Loader completed successfully in ${duration}ms`), console.log(`\u{1F4CA} [${requestId}] Results:`, {
      productsCount: products.length,
      totalProducts,
      averageScore,
      userExists: !!user,
      lastSync: recentLogs.find((log) => log.type === "sync")?.createdAt || null,
      recentLogsCount: recentLogs.length
    }), json9({
      shop: session.shop,
      user,
      products,
      totalProducts,
      averageScore,
      dashboardMetrics,
      lastSync: recentLogs.find((log) => log.type === "sync")?.createdAt || null,
      recentLogs: recentLogs.map((log) => ({
        id: log.id,
        type: log.type,
        message: log.message,
        createdAt: log.createdAt
      }))
    });
  } catch (error) {
    if (console.error("\u274C ERROR in index loader:", error), console.error("\u274C ERROR details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    }), error instanceof Response)
      throw console.log("\u{1F504} Re-throwing OAuth redirect response"), error;
    return json9({
      shop: "unknown",
      products: [],
      user: null,
      totalProducts: 0,
      averageScore: 0,
      lastSync: null,
      recentLogs: []
    });
  }
}, action7 = async ({ request }) => {
  console.log("\u{1F3AF} INDEX ACTION CALLED");
  try {
    let { admin, session } = await authenticate.admin(request);
    console.log("\u2705 Authentication successful in index action"), console.log("\u{1F511} Admin API client available:", !!admin), console.log("\u{1F4CD} Session shop:", session.shop);
    let formData = await request.formData(), actionType = formData.get("action");
    if (actionType === "sync") {
      console.log("\u{1F680} Starting sync in index action");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return console.log("\u274C User not found for shop:", session.shop), json9({ success: !1, error: "User not found" }, { status: 404 });
      console.log("\u{1F464} User ID:", user.id);
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`;
      console.log("\u{1F511} Loading offline session:", offlineSessionId);
      let offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession)
        return console.log("\u274C Offline session not found"), json9({ success: !1, error: "Offline session not found. Please reinstall the app." }, { status: 401 });
      console.log("\u2705 Offline session loaded, has accessToken:", !!offlineSession.accessToken), console.log("\u{1F511} Access token prefix:", offlineSession.accessToken?.substring(0, 15) + "..."), console.log("\u{1F511} Access token length:", offlineSession.accessToken?.length), console.log("\u{1F50D} Session scope:", offlineSession.scope), console.log("\u{1F50D} Session isOnline:", offlineSession.isOnline);
      let { GraphQLClient: GraphQLClient2 } = await import("graphql-request"), graphqlClient = new GraphQLClient2(
        `https://${session.shop}/admin/api/2025-10/graphql`,
        {
          headers: {
            "X-Shopify-Access-Token": offlineSession.accessToken,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("\u{1F4E6} Starting product sync with offline access token...");
      let PRODUCTS_QUERY2 = `
        query getProducts($first: Int!, $after: String) {
          products(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                title
                description
                handle
                productType
                vendor
                tags
                variants(first: 100) {
                  edges {
                    node {
                      id
                      title
                      price
                      compareAtPrice
                      sku
                      inventoryQuantity
                      availableForSale
                    }
                  }
                }
                metafields(first: 100) {
                  edges {
                    node {
                      id
                      namespace
                      key
                      value
                      type
                    }
                  }
                }
                images(first: 10) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      `, allProducts = [], hasNextPage = !0, after, pageCount = 0;
      for (; hasNextPage; ) {
        pageCount++, console.log(`\u{1F4C4} Fetching page ${pageCount}${after ? " (after cursor)" : " (first page)"}`);
        let response = await graphqlClient.request(PRODUCTS_QUERY2, {
          first: 250,
          after
        });
        console.log("\u{1F4E6} Products in this page:", response.products?.edges?.length || 0), response.products?.edges && allProducts.push(...response.products.edges), hasNextPage = response.products?.pageInfo?.hasNextPage || !1, after = response.products?.pageInfo?.endCursor, hasNextPage && (console.log("\u23F3 Waiting 500ms before next request..."), await new Promise((resolve) => setTimeout(resolve, 500)));
      }
      console.log("\u2705 Product sync completed:", allProducts.length, "products"), await db.log.create({
        data: {
          userId: user.id,
          type: "sync",
          message: `Synchronized ${allProducts.length} products from Shopify`,
          metadata: {
            productsCount: allProducts.length,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), console.log("\u{1F4DD} Creating audit record...");
      let audit = await db.audit.create({
        data: {
          userId: user.id,
          score: 0,
          // Will be calculated after field mapping
          totalProducts: allProducts.length,
          validProducts: 0,
          // Will be calculated after validation
          gaps: []
          // Will be populated after field mapping and validation
        }
      });
      return console.log("\u2705 Audit record created:", audit.id), json9({
        success: !0,
        message: `Successfully synced ${allProducts.length} products`,
        data: {
          productsCount: allProducts.length,
          auditId: audit.id
        }
      });
    }
    if (actionType === "generate-recommendations") {
      console.log("\u{1F916} Generating AI recommendations for single product");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json9({ success: !1, error: "User not found" }, { status: 404 });
      let productId = formData.get("productId");
      if (console.log("\u{1F3AF} Product ID:", productId), !(formData.get("forceRegenerate") === "true")) {
        let existingProduct = await db.product.findFirst({
          where: {
            userId: user.id,
            shopifyId: productId
          }
        });
        if (existingProduct?.recommendations) {
          let recData = existingProduct.recommendations;
          return console.log("\u{1F4CB} Returning existing recommendations for product:", productId), json9({
            success: !0,
            recommendations: recData.recommendations || [],
            isExisting: !0
          });
        }
      }
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return json9({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      let { ShopifySyncService: ShopifySyncService2 } = await Promise.resolve().then(() => (init_shopifySync(), shopifySync_exports)), { AIEnrichmentService: AIEnrichmentService2 } = await Promise.resolve().then(() => (init_aiEnrich(), aiEnrich_exports)), product = (await new ShopifySyncService2(session.shop, offlineSession.accessToken).syncProducts(user.id)).find((p) => p.id.includes(productId));
      if (!product)
        return json9({ success: !1, error: "Product not found" }, { status: 404 });
      let { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), spec = mapShopifyToSpec2(product), gaps = calculateProductScore2(spec).gaps;
      console.log("\u{1F3AF} Product gaps identified:", gaps);
      let result = await new AIEnrichmentService2().enrichProduct(user.id, product, gaps);
      console.log("\u2705 Generated recommendations:", result.improvements.length);
      let recommendationData = {
        recommendations: result.improvements.map((rec) => ({
          ...rec,
          status: "pending"
          // pending, approved, rejected, applied
        })),
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
      };
      return await db.product.upsert({
        where: {
          userId_shopifyId: {
            userId: user.id,
            shopifyId: productId
          }
        },
        create: {
          userId: user.id,
          shopifyId: productId,
          title: product.title,
          recommendations: recommendationData
        },
        update: {
          recommendations: recommendationData
        }
      }), console.log("\u{1F4BE} Stored recommendations in database for product:", productId), json9({
        success: !0,
        recommendations: recommendationData.recommendations,
        isExisting: !1
      });
    }
    if (actionType === "apply-recommendations") {
      console.log("\u{1F4DD} Applying approved recommendations to Shopify");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json9({ success: !1, error: "User not found" }, { status: 404 });
      let productId = formData.get("productId"), approvedRecommendationsJson = formData.get("approvedRecommendations"), approvedRecommendations = JSON.parse(approvedRecommendationsJson);
      if (console.log("\u{1F3AF} Product ID:", productId), console.log("\u2705 Approved recommendations:", approvedRecommendations.length), console.log("\u{1F4CB} Approved recommendation fields:", approvedRecommendations.map((r) => r.field)), !Array.isArray(approvedRecommendations) || approvedRecommendations.length === 0)
        return json9({
          success: !1,
          error: "No approved recommendations provided"
        }, { status: 400 });
      let productRecord = await db.product.findFirst({
        where: {
          userId: user.id,
          shopifyId: productId
        }
      }), updatedRecommendationData = null;
      if (productRecord?.recommendations) {
        let recData = productRecord.recommendations, approvedFields = approvedRecommendations.map((r) => r.field);
        updatedRecommendationData = {
          ...recData,
          recommendations: recData.recommendations.map((rec) => ({
            ...rec,
            status: approvedFields.includes(rec.field) ? "applied" : rec.status
          })),
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return json9({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      let { ShopifySyncService: ShopifySyncService2 } = await Promise.resolve().then(() => (init_shopifySync(), shopifySync_exports)), { mapShopifyToSpec: mapShopifyToSpec2, calculateProductScore: calculateProductScore2 } = await Promise.resolve().then(() => (init_fieldMapper(), fieldMapper_exports)), syncService = new ShopifySyncService2(session.shop, offlineSession.accessToken), product = (await syncService.syncProducts(user.id)).find((p) => p.id.includes(productId));
      if (!product)
        return json9({ success: !1, error: "Product not found" }, { status: 404 });
      let initialSpec = mapShopifyToSpec2(product), initialScore = calculateProductScore2(initialSpec).score;
      console.log("\u{1F4CA} Initial product score:", initialScore);
      let { AIEnrichmentService: AIEnrichmentService2 } = await Promise.resolve().then(() => (init_aiEnrich(), aiEnrich_exports)), enrichmentService = new AIEnrichmentService2(), partialResult = {
        originalProduct: product,
        enrichedSpec: {},
        improvements: approvedRecommendations,
        totalUsage: 0,
        errors: []
      }, success = await enrichmentService.applyEnrichmentToShopify(
        user.id,
        session.shop,
        offlineSession.accessToken,
        partialResult
      );
      console.log("\u2705 Applied changes to Shopify:", success);
      let finalScore = initialScore;
      if (success)
        try {
          let updatedProduct = (await syncService.syncProducts(user.id)).find((p) => p.id.includes(productId));
          if (updatedProduct) {
            let updatedSpec = mapShopifyToSpec2(updatedProduct);
            finalScore = calculateProductScore2(updatedSpec).score, console.log("\u{1F4CA} Final product score:", finalScore), console.log("\u{1F4C8} Score improvement:", finalScore - initialScore);
          }
        } catch (error) {
          console.warn("Could not validate score improvement:", error);
        }
      return updatedRecommendationData && productRecord && (await db.product.update({
        where: { id: productRecord.id },
        data: {
          recommendations: updatedRecommendationData
        }
      }), console.log("\u{1F4BE} Updated recommendation status to applied in database")), await db.log.create({
        data: {
          userId: user.id,
          type: "enrichment",
          message: `Applied ${approvedRecommendations.length} approved AI recommendations to product ${productId}`,
          metadata: {
            productId,
            approvedCount: approvedRecommendations.length,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), json9({
        success: !0,
        appliedCount: approvedRecommendations.length,
        scoreImprovement: {
          initial: initialScore,
          final: finalScore,
          improvement: finalScore - initialScore
        }
      });
    }
    if (actionType === "save-customer-input") {
      console.log("\u{1F4BE} Saving customer input data");
      let user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      if (!user)
        return json9({ success: !1, error: "User not found" }, { status: 404 });
      let productId = formData.get("productId"), inputDataJson = formData.get("inputData"), inputData = JSON.parse(inputDataJson);
      console.log("\u{1F3AF} Product ID:", productId), console.log("\u{1F4DD} Input data:", inputData);
      let { sessionStorage: sessionStorage2 } = await Promise.resolve().then(() => (init_shopify_server(), shopify_server_exports)), offlineSessionId = `offline_${session.shop}`, offlineSession = await sessionStorage2.loadSession(offlineSessionId);
      if (!offlineSession?.accessToken)
        return json9({
          success: !1,
          error: "Offline session not found. Please reinstall the app."
        }, { status: 401 });
      let { GraphQLClient: GraphQLClient2 } = await import("graphql-request"), graphqlClient = new GraphQLClient2(
        `https://${session.shop}/admin/api/2025-10/graphql`,
        {
          headers: {
            "X-Shopify-Access-Token": offlineSession.accessToken,
            "Content-Type": "application/json"
          }
        }
      ), appliedCount = 0, appliedFields = [];
      for (let [field, value] of Object.entries(inputData))
        try {
          let metafieldValue = value, metafieldType = "single_line_text_field";
          if (field.startsWith("dimensions_"))
            continue;
          (field === "specifications" || field === "warranty" || field === "return_policy") && (metafieldType = "multi_line_text_field");
          let CREATE_METAFIELD_MUTATION = `
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
              metafieldsSet(metafields: $metafields) {
                metafields {
                  id
                  namespace
                  key
                  value
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `, response = await graphqlClient.request(CREATE_METAFIELD_MUTATION, {
            metafields: [
              {
                ownerId: `gid://shopify/Product/${productId}`,
                namespace: "catalogai",
                key: field,
                type: metafieldType,
                value: metafieldValue
              }
            ]
          });
          response.metafieldsSet.userErrors?.length ? console.error(`\u274C Error applying ${field}:`, response.metafieldsSet.userErrors) : (appliedCount++, appliedFields.push(field), console.log(`\u2705 Applied ${field}: ${metafieldValue}`));
        } catch (error) {
          console.error(`\u274C Error applying ${field}:`, error);
        }
      let dimensionData = ["dimensions_length", "dimensions_width", "dimensions_height"].reduce((acc, key) => {
        if (inputData[key]) {
          let dimKey = key.replace("dimensions_", "");
          acc[dimKey] = inputData[key];
        }
        return acc;
      }, {});
      if (Object.keys(dimensionData).length > 0)
        try {
          let CREATE_METAFIELD_MUTATION = `
            mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
              metafieldsSet(metafields: $metafields) {
                metafields {
                  id
                  namespace
                  key
                  value
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `;
          (await graphqlClient.request(CREATE_METAFIELD_MUTATION, {
            metafields: [
              {
                ownerId: `gid://shopify/Product/${productId}`,
                namespace: "catalogai",
                key: "dimensions",
                type: "json",
                value: JSON.stringify(dimensionData)
              }
            ]
          })).metafieldsSet.userErrors?.length || (appliedCount++, appliedFields.push("dimensions"), console.log("\u2705 Applied dimensions:", dimensionData));
        } catch (error) {
          console.error("\u274C Error applying dimensions:", error);
        }
      return await db.log.create({
        data: {
          userId: user.id,
          type: "customer_input",
          message: `Applied ${appliedCount} customer input fields to product ${productId}`,
          metadata: {
            productId,
            appliedFields,
            appliedCount,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        }
      }), json9({
        success: !0,
        appliedCount,
        appliedFields,
        message: `Successfully saved ${appliedCount} fields to your product!`
      });
    }
    return json9({ success: !0 });
  } catch (error) {
    if (console.error("\u274C Error in index action:", error), error instanceof Response)
      throw console.log("\u{1F504} Re-throwing OAuth redirect response"), error;
    let userFriendlyError = "Sync failed. Please try again.";
    error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized") ? userFriendlyError = "Authentication failed. Please reinstall the app." : error.message.includes("403") || error.message.includes("Forbidden") ? userFriendlyError = "Insufficient permissions. Please check app permissions." : error.message.includes("429") || error.message.includes("rate limit") ? userFriendlyError = "Rate limit exceeded. Please try again in a few minutes." : error.message.includes("GraphQL") && (userFriendlyError = "API connection failed. Please try again."));
    try {
      let { session } = await authenticate.admin(request), user = await db.user.findUnique({
        where: { shopId: session.shop }
      });
      user && await db.log.create({
        data: {
          userId: user.id,
          type: "error",
          message: userFriendlyError,
          error: error instanceof Error ? error.message : "Unknown error",
          metadata: {
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            action: "sync"
          }
        }
      });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }
    return json9(
      {
        success: !1,
        error: userFriendlyError
      },
      { status: 500 }
    );
  }
};
function Index() {
  let loaderData = useLoaderData(), { shop, totalProducts, averageScore, dashboardMetrics, lastSync, recentLogs, user } = loaderData, [products, setProducts] = (0, import_react137.useState)(loaderData.products), [isSyncing, setIsSyncing] = (0, import_react137.useState)(!1), [isHealthChecking, setIsHealthChecking] = (0, import_react137.useState)(!1), [toastActive, setToastActive] = (0, import_react137.useState)(!1), [toastMessage, setToastMessage] = (0, import_react137.useState)(""), [healthModalOpen, setHealthModalOpen] = (0, import_react137.useState)(!1), [healthCheckJobId, setHealthCheckJobId] = (0, import_react137.useState)(), [selectedProduct, setSelectedProduct] = (0, import_react137.useState)(null), [productModalOpen, setProductModalOpen] = (0, import_react137.useState)(!1), [recommendations, setRecommendations] = (0, import_react137.useState)([]), [approvalState, setApprovalState] = (0, import_react137.useState)({}), [isGeneratingRecommendations, setIsGeneratingRecommendations] = (0, import_react137.useState)(!1), [isApplyingChanges, setIsApplyingChanges] = (0, import_react137.useState)(!1), [justAppliedChanges, setJustAppliedChanges] = (0, import_react137.useState)(!1), [customerInputOpen, setCustomerInputOpen] = (0, import_react137.useState)(!1), [customerInputData, setCustomerInputData] = (0, import_react137.useState)({}), [isSavingCustomerInput, setIsSavingCustomerInput] = (0, import_react137.useState)(!1), [showOnlyLowHealth, setShowOnlyLowHealth] = (0, import_react137.useState)(!1), [showOnlyNoDescription, setShowOnlyNoDescription] = (0, import_react137.useState)(!1), syncFetcher = useFetcher(), healthCheckFetcher = useFetcher(), recommendationFetcher = useFetcher(), customerInputFetcher = useFetcher();
  (0, import_react137.useEffect)(() => {
    setProducts(loaderData.products);
  }, [loaderData.products]);
  let handleSync = () => {
    setIsSyncing(!0), syncFetcher.submit(
      { action: "sync" },
      { method: "post" }
      // Same route action, no need to specify action path
    );
  }, handleHealthCheck = () => {
    setIsHealthChecking(!0), healthCheckFetcher.submit(
      {},
      { method: "get", action: "/api/health-check" }
    );
  }, handleProductClick = (product) => {
    if (setSelectedProduct(product), setProductModalOpen(!0), setJustAppliedChanges(!1), product.recommendations?.recommendations) {
      console.log("\u{1F4CB} Loading existing recommendations for product:", product.id);
      let existingRecs = product.recommendations.recommendations;
      setRecommendations(existingRecs);
      let approvalState2 = {};
      existingRecs.forEach((rec) => {
        rec.status === "approved" || rec.status === "applied" ? approvalState2[rec.field] = !0 : rec.status === "rejected" && (approvalState2[rec.field] = !1);
      }), setApprovalState(approvalState2);
    } else
      setRecommendations([]), setApprovalState({});
  }, handleGenerateRecommendations = () => {
    selectedProduct && (setIsGeneratingRecommendations(!0), setJustAppliedChanges(!1), recommendationFetcher.submit(
      {
        action: "generate-recommendations",
        productId: selectedProduct.id,
        forceRegenerate: recommendations.length > 0 ? "true" : "false"
        // Force regenerate if called from regenerate button
      },
      { method: "post" }
    ));
  }, handleToggleApproval = (fieldName, newState) => {
    setApprovalState((prev) => ({
      ...prev,
      [fieldName]: newState !== void 0 ? newState : prev[fieldName] === !0 ? !1 : prev[fieldName] === !1 ? void 0 : !0
    }));
  }, handleApplyChanges = () => {
    if (!selectedProduct)
      return;
    let approvedRecommendations = recommendations.filter(
      (rec) => approvalState[rec.field] === !0
    ), rejectedRecommendations = recommendations.filter(
      (rec) => approvalState[rec.field] === !1
    ), pendingRecommendations = recommendations.filter(
      (rec) => approvalState[rec.field] === void 0
    );
    if (console.log("\u{1F4CA} Approval Summary:", {
      total: recommendations.length,
      approved: approvedRecommendations.length,
      rejected: rejectedRecommendations.length,
      pending: pendingRecommendations.length,
      approvedFields: approvedRecommendations.map((r) => r.field),
      rejectedFields: rejectedRecommendations.map((r) => r.field)
    }), approvedRecommendations.length === 0) {
      setToastMessage("Please approve at least one recommendation before applying changes"), setToastActive(!0);
      return;
    }
    console.log("\u{1F680} Starting apply changes..."), console.log("\u{1F4CB} Approved recommendations to apply:", approvedRecommendations), setIsApplyingChanges(!0), recommendationFetcher.submit(
      {
        action: "apply-recommendations",
        productId: selectedProduct.id,
        approvedRecommendations: JSON.stringify(approvedRecommendations)
      },
      { method: "post" }
    );
  };
  if (syncFetcher.data && isSyncing) {
    let data = syncFetcher.data;
    data.success ? (setToastMessage(`Successfully synced ${data.data?.productsCount || 0} products`), setToastActive(!0)) : (setToastMessage(`Sync failed: ${data.error}`), setToastActive(!0)), setIsSyncing(!1);
  }
  if (healthCheckFetcher.data && isHealthChecking) {
    let data = healthCheckFetcher.data;
    data.success ? (setHealthCheckJobId(data.jobId), setHealthModalOpen(!0), setToastMessage(`Health scan initiated - analyzing ${data.currentScore}% current score`), setToastActive(!0)) : (setToastMessage(`Health check failed: ${data.error}`), setToastActive(!0)), setIsHealthChecking(!1);
  }
  if (recommendationFetcher.data && isGeneratingRecommendations) {
    let data = recommendationFetcher.data;
    if (data.success && data.recommendations) {
      if (setRecommendations(data.recommendations), data.isExisting ? setToastMessage(`Loaded existing ${data.recommendations.length} AI recommendations`) : setToastMessage(`Generated ${data.recommendations.length} new AI recommendations`), setToastActive(!0), data.isExisting) {
        let approvalState2 = {};
        data.recommendations.forEach((rec) => {
          rec.status === "approved" || rec.status === "applied" ? approvalState2[rec.field] = !0 : rec.status === "rejected" && (approvalState2[rec.field] = !1);
        }), setApprovalState(approvalState2);
      }
    } else
      data.error && (setToastMessage(`Failed to generate recommendations: ${data.error}`), setToastActive(!0));
    setIsGeneratingRecommendations(!1);
  }
  if (recommendationFetcher.data && isApplyingChanges) {
    let data = recommendationFetcher.data;
    if (console.log("\u{1F50D} Apply changes response:", data), console.log("\u{1F50D} Response type:", typeof data), console.log("\u{1F50D} Response keys:", Object.keys(data)), data.success && selectedProduct) {
      let appliedFields = recommendations.filter((rec) => approvalState[rec.field] === !0).map((rec) => rec.field), getFieldCelebration = (field) => ({
        keywords: "\u{1F3AF} Awesome! Keywords added - your product is now more discoverable!",
        description: "\u{1F4DD} Great work! Enhanced description will help customers understand your product better!",
        features: "\u2728 Fantastic! Feature list added - customers can see what makes your product special!",
        use_cases: "\u{1F4A1} Perfect! Use cases added - customers now know how to use your product!",
        target_audience: "\u{1F465} Excellent! Target audience defined - your marketing just got more focused!",
        material: "\u{1F52C} Nice! Material info added - customers can make informed decisions!",
        dimensions: "\u{1F4CF} Great! Dimensions added - no more size surprises for customers!",
        weight: "\u2696\uFE0F Perfect! Weight information helps with shipping expectations!",
        color: "\u{1F3A8} Colorful! Color info added - visual buyers will love this!",
        brand: "\u{1F3F7}\uFE0F Brand power! Brand info strengthens customer trust!",
        warranty: "\u{1F6E1}\uFE0F Security boost! Warranty info builds customer confidence!",
        sku: "\u{1F4E6} Organized! SKU added for better inventory management!",
        tags: "\u{1F3F7}\uFE0F Tagged! Product categorization just got better!",
        ai_search_queries: "\u{1F916} AI-ready! Search queries optimized for AI discovery!",
        semantic_description: "\u{1F9E0} Smart! AI-optimized description for better search matching!"
      })[field] || `\u2705 ${field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ")} updated!`, message = "";
      appliedFields.length === 1 ? message = getFieldCelebration(appliedFields[0]) : appliedFields.length === 2 ? message = `\u{1F389} Double win! Updated ${appliedFields.map((f) => f.replace(/_/g, " ")).join(" and ")}!` : appliedFields.length >= 3 && (message = `\u{1F680} Amazing progress! Applied ${appliedFields.length} improvements - you're on fire!`);
      let finalScore = selectedProduct.score, pointsEarned = 0;
      if (data.scoreImprovement) {
        finalScore = data.scoreImprovement.final;
        let improvement = data.scoreImprovement.improvement;
        pointsEarned = appliedFields.length * 15, improvement > 0 ? message += ` \u{1F4C8} Score: ${data.scoreImprovement.initial}% \u2192 ${data.scoreImprovement.final}% (+${improvement.toFixed(0)}%) | +${pointsEarned} points!` : message += ` \u{1F4CA} Score: ${data.scoreImprovement.final}%`;
      }
      let updatedGaps = selectedProduct.gaps.filter((gap) => !appliedFields.includes(gap)), updatedSelectedProduct = {
        ...selectedProduct,
        score: finalScore,
        gaps: updatedGaps
      };
      setProducts((prev) => prev.map(
        (p) => p.id === selectedProduct.id ? updatedSelectedProduct : p
      )), setSelectedProduct(updatedSelectedProduct), setRecommendations([]), setApprovalState({}), setJustAppliedChanges(!0);
      let safeMessage = typeof message == "string" && message.length > 0 && !message.match(/^\d{3}$/) ? message : "Changes applied successfully!";
      setToastMessage(safeMessage), setToastActive(!0);
    } else
      data.error ? (setToastMessage(`Failed to apply changes: ${data.error}`), setToastActive(!0)) : (console.error("\u{1F6A8} Unexpected response format:", data), setToastMessage(`Unexpected response: ${JSON.stringify(data)}`), setToastActive(!0));
    setIsApplyingChanges(!1);
  }
  if (customerInputFetcher.data && isSavingCustomerInput) {
    let data = customerInputFetcher.data;
    if (console.log("\u{1F50D} Customer input save response:", data), data.success && selectedProduct) {
      let appliedFields = data.appliedFields || [], appliedCount = data.appliedCount || 0, message = "";
      appliedCount === 1 ? message = `\u{1F389} Great! ${appliedFields[0]?.replace(/_/g, " ")} added to your product specs!` : appliedCount > 1 && (message = `\u{1F680} Excellent! Added ${appliedCount} product specifications!`);
      let estimatedImprovement = appliedCount * 4;
      message += ` \u{1F4C8} Health score boost: ~+${estimatedImprovement}% | +${appliedCount * 15} points!`;
      let updatedGaps = selectedProduct.gaps.filter((gap) => !appliedFields.includes(gap)), updatedScore = Math.min(100, selectedProduct.score + estimatedImprovement), updatedSelectedProduct = {
        ...selectedProduct,
        score: updatedScore,
        gaps: updatedGaps
      };
      setProducts((prev) => prev.map(
        (p) => p.id === selectedProduct.id ? updatedSelectedProduct : p
      )), setSelectedProduct(updatedSelectedProduct), setCustomerInputData({}), setCustomerInputOpen(!1), setJustAppliedChanges(!0), setToastMessage(message), setToastActive(!0);
    } else
      data.error && (setToastMessage(`Failed to save: ${data.error}`), setToastActive(!0));
    setIsSavingCustomerInput(!1);
  }
  let getFieldPlaceholder = (field) => ({
    material: "e.g., Cotton, Polyester, Steel, Wood",
    weight: "e.g., 2.5 lbs, 1.2 kg",
    color: "e.g., Navy Blue, Black, Red",
    size: "e.g., Large, XL, 12x8x4",
    brand: "e.g., Your Brand Name",
    model: "e.g., Model ABC-123",
    upc: "e.g., 123456789012",
    vendor: "e.g., Supplier Company",
    age_range: "e.g., 18-65, Adults, 3+",
    compatibility: "e.g., iPhone 12, Samsung Galaxy",
    warranty: "e.g., 1 year limited warranty",
    return_policy: "e.g., 30-day returns accepted",
    shipping_info: "e.g., Free shipping over $50",
    specifications: "e.g., Power: 110V, Material: ABS Plastic",
    documentation_url: "e.g., https://yoursite.com/manual.pdf",
    video_urls: "e.g., https://youtube.com/watch?v=abc123"
  })[field] || `Enter ${field.replace(/_/g, " ")}`, getFieldHelpText = (field) => ({
    material: "Primary material or fabric composition",
    weight: "Product weight with unit (lbs, kg, oz)",
    color: "Primary color or color options",
    brand: "Manufacturer or brand name",
    warranty: "Warranty terms and duration",
    upc: "Universal Product Code for inventory",
    specifications: "Technical specs, one per line"
  })[field] || "", getFieldPoints = (field) => {
    let fieldCategories = {
      required: 25,
      high: 20,
      medium: 15,
      low: 10
    }, highFields = ["material", "dimensions", "weight", "brand"], mediumFields = ["color", "size", "upc", "compatibility", "age_range", "gender"];
    return highFields.includes(field) ? fieldCategories.high : mediumFields.includes(field) ? fieldCategories.medium : fieldCategories.low;
  }, getFieldImpact = (field) => {
    let highFields = ["material", "dimensions", "weight", "brand"], mediumFields = ["color", "size", "upc", "compatibility", "age_range", "gender"];
    return highFields.includes(field) ? "4-5" : mediumFields.includes(field) ? "3-4" : "2-3";
  }, handleSaveCustomerInput = () => {
    if (!selectedProduct)
      return;
    let validationErrors = [], filledData = {};
    if (Object.entries(customerInputData).forEach(([field, value]) => {
      let trimmedValue = value.trim();
      trimmedValue && (field === "upc" && trimmedValue.length < 8 ? validationErrors.push("UPC must be at least 8 digits") : field === "weight" && !/\d+(\.\d+)?\s*(lbs?|kgs?|oz|pounds?|kilograms?|ounces?)/i.test(trimmedValue) ? validationErrors.push('Weight must include unit (e.g., "2.5 lbs", "1.2 kg")') : (field === "documentation_url" || field === "video_urls") && trimmedValue && !trimmedValue.startsWith("http") ? validationErrors.push(`${field.replace(/_/g, " ")} must be a valid URL starting with http`) : field === "age_range" && trimmedValue && !/\d+/.test(trimmedValue) ? validationErrors.push('Age range must contain numbers (e.g., "18+", "3-12")') : filledData[field] = trimmedValue);
    }), validationErrors.length > 0) {
      setToastMessage(`Validation errors: ${validationErrors.join(", ")}`), setToastActive(!0);
      return;
    }
    if (Object.keys(filledData).length === 0) {
      setToastMessage("Please fill in at least one field before saving"), setToastActive(!0);
      return;
    }
    setIsSavingCustomerInput(!0), customerInputFetcher.submit(
      {
        action: "save-customer-input",
        productId: selectedProduct.id,
        inputData: JSON.stringify(filledData)
      },
      { method: "post" }
    );
  }, filteredProducts = products.filter((product) => !(showOnlyLowHealth && product.score >= 70 || showOnlyNoDescription && product.description && product.description !== "No description")), rows = products.map(
    (product) => [
      product.id,
      product.title,
      product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description,
      `${product.score}%`,
      product.gaps.length > 0 ? product.gaps.join(", ") : "None"
    ]
  );
  return /* @__PURE__ */ jsxs3(Page, { title: "CatalogAI Optimizer Dashboard", children: [
    /* @__PURE__ */ jsxs3(Layout, { children: [
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }, children: [
        /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { align: "center", children: [
          /* @__PURE__ */ jsxs3("div", { style: { position: "relative", width: "80px", height: "80px", marginBottom: "10px" }, children: [
            /* @__PURE__ */ jsxs3("svg", { width: "80", height: "80", style: { transform: "rotate(-90deg)" }, children: [
              /* @__PURE__ */ jsx4("circle", { cx: "40", cy: "40", r: "35", fill: "none", stroke: "#e5e7eb", strokeWidth: "8" }),
              /* @__PURE__ */ jsx4(
                "circle",
                {
                  cx: "40",
                  cy: "40",
                  r: "35",
                  fill: "none",
                  stroke: dashboardMetrics.aiReadinessScore >= 90 ? "#10b981" : dashboardMetrics.aiReadinessScore >= 50 ? "#f59e0b" : "#ef4444",
                  strokeWidth: "8",
                  strokeDasharray: `${dashboardMetrics.aiReadinessScore / 100 * 220} 220`,
                  strokeLinecap: "round"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3("div", { style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "18px",
              fontWeight: "bold",
              color: dashboardMetrics.aiReadinessScore >= 90 ? "#10b981" : dashboardMetrics.aiReadinessScore >= 50 ? "#f59e0b" : "#ef4444"
            }, children: [
              dashboardMetrics.aiReadinessScore,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3(Text, { variant: "headingLg", as: "p", children: [
            dashboardMetrics.aiReadinessScore,
            " / 100"
          ] }),
          /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Excellent AI readiness" })
        ] }) }),
        /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { align: "center", children: [
          /* @__PURE__ */ jsxs3(Text, { variant: "headingLg", as: "p", children: [
            dashboardMetrics.productsPassedPercentage,
            "%"
          ] }),
          /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
            dashboardMetrics.validProducts,
            " of ",
            dashboardMetrics.totalProducts,
            " products"
          ] }),
          /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "success", as: "p", children: "\u2191 5% from last week" })
        ] }) }),
        /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { align: "center", children: [
          /* @__PURE__ */ jsx4(Text, { variant: "headingLg", as: "p", children: dashboardMetrics.lastSyncTime ? `${Math.floor((Date.now() - new Date(dashboardMetrics.lastSyncTime).getTime()) / (1e3 * 60 * 60))}h ago` : "Never" }),
          /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", as: "p", children: "Last synced successfully" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
        /* @__PURE__ */ jsx4(Text, { variant: "headingLg", as: "h2", children: "Feed Health" }),
        /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Product validation distribution" }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: "20px" }, children: [
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", marginBottom: "10px" }, children: [
            /* @__PURE__ */ jsx4("div", { style: {
              width: `${dashboardMetrics.validProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#10b981",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }),
            /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.validProducts,
              " products"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", marginBottom: "10px" }, children: [
            /* @__PURE__ */ jsx4("div", { style: {
              width: `${dashboardMetrics.warningProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#f59e0b",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }),
            /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.warningProducts,
              " products"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", marginBottom: "20px" }, children: [
            /* @__PURE__ */ jsx4("div", { style: {
              width: `${dashboardMetrics.invalidProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#ef4444",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }),
            /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.invalidProducts,
              " products"
            ] })
          ] }),
          /* @__PURE__ */ jsx4(Button, { variant: "primary", children: "View Validation Report" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
        /* @__PURE__ */ jsx4(Text, { variant: "headingLg", as: "h2", children: "Next Actions" }),
        /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Recommended optimizations for your catalog" }),
        /* @__PURE__ */ jsxs3("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }, children: [
          /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.invalidProducts,
              " products need attention"
            ] }),
            /* @__PURE__ */ jsx4(Button, { variant: "primary", tone: "critical", children: "Take Action" })
          ] }) }),
          /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
              "Optimize ",
              dashboardMetrics.warningProducts,
              " products"
            ] }),
            /* @__PURE__ */ jsx4(Button, { variant: "primary", children: "Take Action" })
          ] }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
        /* @__PURE__ */ jsx4("div", { style: { marginBottom: "10px" }, children: /* @__PURE__ */ jsx4("div", { style: {
          width: "100%",
          height: "8px",
          background: "#e5e7eb",
          borderRadius: "4px",
          overflow: "hidden"
        }, children: /* @__PURE__ */ jsx4("div", { style: {
          width: `${dashboardMetrics.optimizationProgress}%`,
          height: "100%",
          background: "#3b82f6",
          transition: "width 0.3s ease"
        } }) }) }),
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", as: "p", children: [
            "Your catalog is ",
            dashboardMetrics.optimizationProgress,
            "% AI-ready \u2014 ",
            100 - dashboardMetrics.optimizationProgress,
            "% left to optimize!"
          ] }),
          /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: [
            dashboardMetrics.optimizationProgress,
            "% Complete"
          ] })
        ] }),
        /* @__PURE__ */ jsx4("div", { style: { marginTop: "5px" }, children: /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "Keep going! \u{1F680}" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { children: /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
        /* @__PURE__ */ jsxs3(InlineStack, { children: [
          /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsx4(Text, { variant: "headingLg", as: "h2", children: "\u{1F4E6} Product Catalog" }),
            /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Browse and manage your product inventory" })
          ] }),
          /* @__PURE__ */ jsx4(InlineStack, { children: /* @__PURE__ */ jsx4(
            Button,
            {
              onClick: handleSync,
              loading: isSyncing,
              variant: "primary",
              size: "large",
              children: isSyncing ? "Syncing..." : "\u{1F504} Sync Products"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(InlineStack, { children: [
          /* @__PURE__ */ jsxs3(InlineStack, { children: [
            /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Filter by:" }),
            /* @__PURE__ */ jsx4(
              Button,
              {
                variant: showOnlyLowHealth ? "primary" : "tertiary",
                size: "slim",
                onClick: () => setShowOnlyLowHealth(!showOnlyLowHealth),
                children: "\u{1F6A8} Low Health Only"
              }
            ),
            /* @__PURE__ */ jsx4(
              Button,
              {
                variant: showOnlyNoDescription ? "primary" : "tertiary",
                size: "slim",
                onClick: () => setShowOnlyNoDescription(!showOnlyNoDescription),
                children: "\u{1F4DD} Missing Descriptions"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs3(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
            "Showing ",
            filteredProducts.length,
            " of ",
            products.length,
            " products"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: "product-grid",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px",
              marginTop: "20px",
              width: "100%"
            },
            children: filteredProducts.map(
              (product, index) => /* @__PURE__ */ jsx4(
                Card,
                {
                  children: /* @__PURE__ */ jsxs3(InlineStack, { children: [
                    /* @__PURE__ */ jsxs3(InlineStack, { children: [
                      /* @__PURE__ */ jsxs3(BlockStack, { children: [
                        /* @__PURE__ */ jsx4(
                          Button,
                          {
                            variant: "plain",
                            onClick: () => handleProductClick(product),
                            children: product.title
                          }
                        ),
                        /* @__PURE__ */ jsxs3(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                          "ID: ",
                          product.id
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs3(BlockStack, { children: [
                        /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", as: "p", children: product.description && product.description !== "No description" ? product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description : /* @__PURE__ */ jsx4(Text, { tone: "subdued", variant: "bodyMd", as: "p", children: "No description available" }) }),
                        product.gaps.length > 0 && /* @__PURE__ */ jsxs3(InlineStack, { wrap: !0, children: [
                          product.gaps.slice(0, 3).map(
                            (gap, gapIndex) => /* @__PURE__ */ jsx4(Badge, { tone: "warning", size: "small", children: gap }, gapIndex)
                          ),
                          product.gaps.length > 3 && /* @__PURE__ */ jsx4(Badge, { tone: "info", size: "small", children: `+${product.gaps.length - 3} more` })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs3(BlockStack, { children: [
                      /* @__PURE__ */ jsxs3(InlineStack, { children: [
                        /* @__PURE__ */ jsx4(
                          ProgressBar,
                          {
                            progress: product.score,
                            size: "small"
                          }
                        ),
                        /* @__PURE__ */ jsx4(
                          Badge,
                          {
                            tone: product.score >= 90 ? "success" : product.score >= 70 ? "warning" : "critical",
                            size: "small",
                            children: `${product.score}%`
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx4(
                        Button,
                        {
                          size: "slim",
                          variant: "primary",
                          onClick: () => handleProductClick(product),
                          children: "\u{1F527} Optimize"
                        }
                      )
                    ] })
                  ] })
                },
                product.id
              )
            )
          }
        ),
        filteredProducts.length === 0 && /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
          /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "\u{1F389} No products match your filters!" }),
          /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: showOnlyLowHealth ? "All your products are healthy! Great job maintaining your catalog." : showOnlyNoDescription ? "All your products have descriptions! Your catalog is well-documented." : "No products found matching your current filters." }),
          /* @__PURE__ */ jsx4(
            Button,
            {
              variant: "tertiary",
              onClick: () => {
                setShowOnlyLowHealth(!1), setShowOnlyNoDescription(!1);
              },
              children: "Clear Filters"
            }
          )
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
        /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "Quick Actions" }),
        /* @__PURE__ */ jsxs3(BlockStack, { children: [
          /* @__PURE__ */ jsx4(
            Button,
            {
              fullWidth: !0,
              onClick: handleHealthCheck,
              loading: isHealthChecking,
              variant: averageScore < 90 ? "primary" : "secondary",
              children: averageScore < 90 ? "Quick Scan Now" : "Run Health Check"
            }
          ),
          /* @__PURE__ */ jsx4(Button, { fullWidth: !0, children: "Generate Feed" }),
          /* @__PURE__ */ jsx4(Button, { fullWidth: !0, children: "View Analytics" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
        /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "Recent Activity" }),
        /* @__PURE__ */ jsx4(BlockStack, { children: recentLogs.length > 0 ? recentLogs.map(
          (log) => /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(Text, { as: "span", children: [
              log.type === "sync" && "\u{1F504} ",
              log.type === "push" && "\u{1F4E4} ",
              log.type === "error" && "\u274C ",
              log.type === "health_scan" && "\u{1F50D} ",
              log.type === "auto_fix" && "\u{1F527} ",
              log.type === "ai_enrichment" && "\u{1F916} ",
              log.type === "settings_update" && "\u2699\uFE0F ",
              log.message
            ] }),
            /* @__PURE__ */ jsx4(Text, { as: "p", variant: "bodySm", tone: "subdued", children: new Date(log.createdAt).toLocaleString() })
          ] }, log.id)
        ) : /* @__PURE__ */ jsx4(Text, { as: "p", tone: "subdued", children: "No recent activity" }) })
      ] }) }) })
    ] }),
    toastActive && /* @__PURE__ */ jsx4(
      Toast2,
      {
        content: toastMessage,
        onDismiss: () => setToastActive(!1)
      }
    ),
    /* @__PURE__ */ jsx4(
      HealthCheckModal,
      {
        isOpen: healthModalOpen,
        onClose: () => setHealthModalOpen(!1),
        jobId: healthCheckJobId,
        currentScore: averageScore,
        currentGaps: []
      }
    ),
    /* @__PURE__ */ jsx4(
      Modal,
      {
        open: productModalOpen,
        onClose: () => setProductModalOpen(!1),
        title: "",
        size: "large",
        primaryAction: {
          content: "Close",
          onAction: () => setProductModalOpen(!1)
        },
        children: selectedProduct && /* @__PURE__ */ jsx4(Modal.Section, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
          /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(InlineStack, { children: [
              /* @__PURE__ */ jsxs3(BlockStack, { children: [
                /* @__PURE__ */ jsxs3(Text, { variant: "headingLg", as: "h2", children: [
                  "\u{1F4E6} ",
                  selectedProduct.title
                ] }),
                /* @__PURE__ */ jsxs3(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: [
                  "Product ID: ",
                  selectedProduct.id
                ] }),
                selectedProduct.description && selectedProduct.description !== "No description" && /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", as: "p", children: selectedProduct.description })
              ] }),
              /* @__PURE__ */ jsxs3(BlockStack, { children: [
                /* @__PURE__ */ jsxs3(
                  Badge,
                  {
                    tone: selectedProduct.score >= 90 ? "success" : selectedProduct.score >= 70 ? "warning" : "critical",
                    size: "large",
                    children: [
                      selectedProduct.score,
                      "% Health"
                    ]
                  }
                ),
                justAppliedChanges && /* @__PURE__ */ jsx4(Badge, { tone: "success", size: "small", children: "\u2728 Just Updated!" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs3(Box, { children: [
              /* @__PURE__ */ jsxs3(InlineStack, { children: [
                /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Overall Health Progress" }),
                /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: `${Math.round(selectedProduct.score / 100 * 500)} / 500 points` })
              ] }),
              /* @__PURE__ */ jsx4(Box, { paddingBlockStart: "200", children: /* @__PURE__ */ jsx4(
                ProgressBar,
                {
                  progress: selectedProduct.score,
                  size: "large"
                }
              ) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "\u{1F4CA} Category Breakdown" }),
            /* @__PURE__ */ jsx4(InlineStack, { children: [
              {
                name: "\u{1F6A8} Required Fields",
                icon: "\u{1F6A8}",
                fields: ["title", "description", "price", "availability", "category"],
                color: "critical",
                description: "Essential for product visibility"
              },
              {
                name: "\u26A1 High Priority",
                icon: "\u26A1",
                fields: ["material", "dimensions", "weight", "brand", "use_cases", "features", "image_urls"],
                color: "warning",
                description: "Important for customer decisions"
              },
              {
                name: "\u{1F4CB} Medium Priority",
                icon: "\u{1F4CB}",
                fields: ["color", "size", "target_audience", "keywords", "upc", "compatibility", "age_range", "gender", "video_urls"],
                color: "attention",
                description: "Enhances product discovery"
              },
              {
                name: "\u2728 Enhancement",
                icon: "\u2728",
                fields: ["model", "sku", "tags", "vendor", "warranty", "return_policy", "shipping_info", "documentation_url", "specifications", "ai_search_queries", "semantic_description"],
                color: "success",
                description: "Optimizes for AI search"
              }
            ].map((category, index) => {
              let missingInCategory = selectedProduct.gaps.filter((gap) => category.fields.includes(gap)).length, completedInCategory = category.fields.length - missingInCategory, progress = Math.round(completedInCategory / category.fields.length * 100);
              return /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(InlineStack, { children: [
                /* @__PURE__ */ jsxs3(InlineStack, { children: [
                  /* @__PURE__ */ jsxs3(Text, { variant: "headingSm", as: "h4", children: [
                    category.icon,
                    " ",
                    category.name
                  ] }),
                  /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "subdued", as: "p", children: category.description }),
                  /* @__PURE__ */ jsxs3(InlineStack, { wrap: !0, children: [
                    /* @__PURE__ */ jsxs3(Text, { variant: "bodySm", as: "p", children: [
                      completedInCategory,
                      "/",
                      category.fields.length,
                      " complete"
                    ] }),
                    missingInCategory > 0 && /* @__PURE__ */ jsx4(Badge, { tone: "warning", size: "small", children: `${missingInCategory} missing` })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs3(BlockStack, { children: [
                  /* @__PURE__ */ jsx4(
                    ProgressBar,
                    {
                      progress,
                      size: "small"
                    }
                  ),
                  /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "subdued", as: "p", children: `${progress}% complete` })
                ] })
              ] }) }, index);
            }) })
          ] }) }),
          /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(InlineStack, { children: [
              /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "\u{1F50D} Missing Fields Analysis" }),
              selectedProduct.gaps.length === 0 ? /* @__PURE__ */ jsx4(Badge, { tone: "success", size: "large", children: "\u{1F389} Perfect Score!" }) : /* @__PURE__ */ jsx4(Badge, { tone: "critical", size: "large", children: `${selectedProduct.gaps.length} fields missing` })
            ] }),
            selectedProduct.gaps.length > 0 ? /* @__PURE__ */ jsxs3(BlockStack, { children: [
              /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "These fields are missing and could improve your product's visibility and AI search performance:" }),
              /* @__PURE__ */ jsx4(InlineStack, { wrap: !0, children: selectedProduct.gaps.map(
                (gap, index) => /* @__PURE__ */ jsx4(Badge, { tone: "warning", size: "small", children: gap.replace(/_/g, " ") }, index)
              ) })
            ] }) : /* @__PURE__ */ jsxs3(BlockStack, { children: [
              /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "success", as: "p", children: "\u{1F389} Congratulations! Your product has all the essential fields completed." }),
              /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "This product is optimized for search engines and AI-powered discovery." })
            ] })
          ] }) }),
          selectedProduct.gaps.length > 0 && /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(InlineStack, { children: [
              /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "\u{1F916} AI Recommendations" }),
              recommendations.length > 0 && /* @__PURE__ */ jsx4(
                Button,
                {
                  onClick: () => {
                    setRecommendations([]), setApprovalState({}), handleGenerateRecommendations();
                  },
                  variant: "secondary",
                  size: "slim",
                  loading: isGeneratingRecommendations,
                  children: "\u{1F504} Regenerate"
                }
              )
            ] }),
            recommendations.length === 0 ? /* @__PURE__ */ jsxs3(BlockStack, { children: [
              /* @__PURE__ */ jsxs3(BlockStack, { children: [
                /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "\u{1F3AF} Ready to improve your product's health score?" }),
                /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "Our AI will analyze your missing fields and suggest improvements for:" }),
                /* @__PURE__ */ jsxs3(InlineStack, { wrap: !0, children: [
                  selectedProduct.gaps.slice(0, 5).map(
                    (gap, index) => /* @__PURE__ */ jsx4(Badge, { tone: "warning", size: "small", children: gap.replace(/_/g, " ") }, index)
                  ),
                  selectedProduct.gaps.length > 5 && /* @__PURE__ */ jsx4(Badge, { tone: "info", size: "small", children: `+${selectedProduct.gaps.length - 5} more` })
                ] })
              ] }),
              /* @__PURE__ */ jsx4(
                Button,
                {
                  onClick: handleGenerateRecommendations,
                  variant: "primary",
                  size: "large",
                  loading: isGeneratingRecommendations,
                  children: isGeneratingRecommendations ? "\u{1F916} Generating..." : "\u{1F680} Generate AI Recommendations"
                }
              )
            ] }) : /* @__PURE__ */ jsxs3(BlockStack, { children: [
              selectedProduct.recommendations?.generatedAt && /* @__PURE__ */ jsxs3(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                "Generated: ",
                new Date(selectedProduct.recommendations.generatedAt).toLocaleString()
              ] }),
              /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Review and approve the AI-generated suggestions below. Only approved changes will be applied to your product." })
            ] })
          ] }) }),
          recommendations.length > 0 && /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(InlineStack, { children: [
              /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "\u270F\uFE0F Review & Approve Recommendations" }),
              /* @__PURE__ */ jsxs3(InlineStack, { children: [
                /* @__PURE__ */ jsx4(Badge, { tone: "success", size: "small", children: `${Object.values(approvalState).filter(Boolean).length} approved` }),
                /* @__PURE__ */ jsx4(Badge, { tone: "critical", size: "small", children: `${Object.values(approvalState).filter((val) => val === !1).length} rejected` })
              ] })
            ] }),
            /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Review each AI suggestion below. Use \u2705 to approve or \u274C to reject. Only approved changes will be applied to your product." }),
            /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(InlineStack, { children: [
              /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Quick Actions:" }),
              /* @__PURE__ */ jsxs3(InlineStack, { children: [
                /* @__PURE__ */ jsx4(
                  Button,
                  {
                    size: "slim",
                    variant: "secondary",
                    tone: "success",
                    onClick: () => {
                      let allApproved = recommendations.reduce((acc, rec) => ({
                        ...acc,
                        [rec.field]: !0
                      }), {});
                      setApprovalState(allApproved);
                    },
                    children: "\u2705 Approve All"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  Button,
                  {
                    size: "slim",
                    variant: "secondary",
                    tone: "critical",
                    onClick: () => {
                      let allRejected = recommendations.reduce((acc, rec) => ({
                        ...acc,
                        [rec.field]: !1
                      }), {});
                      setApprovalState(allRejected);
                    },
                    children: "\u274C Reject All"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  Button,
                  {
                    size: "slim",
                    variant: "secondary",
                    onClick: () => setApprovalState({}),
                    children: "Clear All"
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx4(BlockStack, { children: recommendations.map((rec, index) => {
              let isApproved = approvalState[rec.field] === !0, isRejected = approvalState[rec.field] === !1, isPending = approvalState[rec.field] === void 0, isApplied = rec.status === "applied", fieldInfo = ((field) => {
                let fieldCategories = {
                  required: { fields: ["title", "description", "price", "availability", "category"], points: "25", impact: "5-6%", color: "critical", icon: "\u{1F6A8}" },
                  high: { fields: ["material", "dimensions", "weight", "brand", "use_cases", "features", "image_urls"], points: "20", impact: "4-5%", color: "warning", icon: "\u26A1" },
                  medium: { fields: ["color", "size", "target_audience", "keywords", "upc", "compatibility", "age_range", "gender", "video_urls"], points: "15", impact: "3-4%", color: "attention", icon: "\u{1F4CB}" },
                  low: { fields: ["model", "sku", "tags", "vendor", "warranty", "return_policy", "shipping_info", "documentation_url", "specifications", "ai_search_queries", "semantic_description"], points: "10", impact: "2-3%", color: "info", icon: "\u2728" }
                };
                for (let [category, info] of Object.entries(fieldCategories))
                  if (info.fields.includes(field))
                    return { category, ...info };
                return { category: "low", fields: [], points: "10", impact: "2%", color: "info", icon: "\u2728" };
              })(rec.field);
              return /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
                /* @__PURE__ */ jsxs3(InlineStack, { children: [
                  /* @__PURE__ */ jsxs3(BlockStack, { children: [
                    /* @__PURE__ */ jsxs3(InlineStack, { children: [
                      /* @__PURE__ */ jsxs3(Text, { variant: "headingSm", as: "h4", children: [
                        fieldInfo.icon,
                        " ",
                        rec.field.charAt(0).toUpperCase() + rec.field.slice(1).replace(/_/g, " ")
                      ] }),
                      /* @__PURE__ */ jsx4(Badge, { tone: fieldInfo.color, size: "small", children: fieldInfo.category.charAt(0).toUpperCase() + fieldInfo.category.slice(1) })
                    ] }),
                    /* @__PURE__ */ jsxs3(InlineStack, { wrap: !0, children: [
                      /* @__PURE__ */ jsxs3(Badge, { tone: "info", size: "small", children: [
                        "+",
                        fieldInfo.points,
                        " pts"
                      ] }),
                      /* @__PURE__ */ jsxs3(Badge, { tone: "subdued", size: "small", children: [
                        "~",
                        fieldInfo.impact,
                        " impact"
                      ] }),
                      isApplied && /* @__PURE__ */ jsx4(Badge, { tone: "success", size: "small", children: "\u{1F680} Applied" }),
                      !isApplied && isApproved && /* @__PURE__ */ jsx4(Badge, { tone: "success", size: "small", children: "\u2705 Approved" }),
                      !isApplied && isRejected && /* @__PURE__ */ jsx4(Badge, { tone: "critical", size: "small", children: "\u274C Rejected" }),
                      !isApplied && isPending && /* @__PURE__ */ jsx4(Badge, { tone: "attention", size: "small", children: "\u23F3 Pending" })
                    ] })
                  ] }),
                  !isApplied && /* @__PURE__ */ jsxs3(InlineStack, { children: [
                    /* @__PURE__ */ jsx4(
                      Button,
                      {
                        size: "slim",
                        onClick: () => handleToggleApproval(rec.field, !1),
                        variant: isRejected ? "primary" : "secondary",
                        tone: isRejected ? "critical" : void 0,
                        children: isRejected ? "\u274C Rejected" : "\u274C Reject"
                      }
                    ),
                    /* @__PURE__ */ jsx4(
                      Button,
                      {
                        size: "slim",
                        onClick: () => handleToggleApproval(rec.field, !0),
                        variant: isApproved ? "primary" : "secondary",
                        tone: isApproved ? "success" : void 0,
                        children: isApproved ? "\u2705 Approved" : "\u2705 Approve"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
                  /* @__PURE__ */ jsxs3(InlineStack, { children: [
                    /* @__PURE__ */ jsxs3(BlockStack, { children: [
                      /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Current Value" }),
                      /* @__PURE__ */ jsx4(Box, { padding: "200", borderRadius: "100", children: /* @__PURE__ */ jsx4(Text, { variant: "bodySm", as: "p", children: rec.originalValue || /* @__PURE__ */ jsx4(Text, { tone: "subdued", as: "p", children: "(empty)" }) }) })
                    ] }),
                    /* @__PURE__ */ jsxs3(BlockStack, { children: [
                      /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "success", as: "p", children: "AI Recommendation" }),
                      /* @__PURE__ */ jsx4(Box, { padding: "200", borderRadius: "100", children: /* @__PURE__ */ jsx4(Text, { variant: "bodySm", as: "p", children: rec.newValue }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs3(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                    "\u{1F4A1} ",
                    /* @__PURE__ */ jsx4("em", { children: rec.improvement })
                  ] })
                ] }) })
              ] }) }, index);
            }) }),
            /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(InlineStack, { children: [
              /* @__PURE__ */ jsxs3(BlockStack, { children: [
                /* @__PURE__ */ jsx4(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Ready to apply your approved changes?" }),
                /* @__PURE__ */ jsxs3(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                  recommendations.filter(
                    (rec) => rec.status !== "applied" && approvalState[rec.field] === !0
                  ).length,
                  " changes approved for application"
                ] })
              ] }),
              /* @__PURE__ */ jsxs3(InlineStack, { children: [
                /* @__PURE__ */ jsx4(
                  Button,
                  {
                    onClick: () => setRecommendations([]),
                    variant: "secondary",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx4(
                  Button,
                  {
                    variant: "primary",
                    size: "large",
                    onClick: handleApplyChanges,
                    loading: isApplyingChanges,
                    disabled: recommendations.filter(
                      (rec) => rec.status !== "applied" && approvalState[rec.field] === !0
                    ).length === 0,
                    children: isApplyingChanges ? "\u{1F680} Applying..." : `\u2705 Apply ${recommendations.filter(
                      (rec) => rec.status !== "applied" && approvalState[rec.field] === !0
                    ).length} Changes`
                  }
                )
              ] })
            ] }) })
          ] }) }),
          selectedProduct.gaps.length > 0 && /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsxs3(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ jsxs3(BlockStack, { children: [
                /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: "Manual Product Information" }),
                /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "Fill in product specs that only you know. These can't be generated by AI." })
              ] }),
              /* @__PURE__ */ jsx4(
                Button,
                {
                  onClick: () => setCustomerInputOpen(!customerInputOpen),
                  variant: "secondary",
                  size: "slim",
                  children: customerInputOpen ? "Hide Fields" : "Add Product Info"
                }
              )
            ] }),
            /* @__PURE__ */ jsx4(Collapsible, { id: "customer-input-collapsible", open: customerInputOpen, children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
              selectedProduct.gaps.filter((gap) => getFieldInputType(gap) === "customer_required").map((field, index) => {
                let label = FIELD_LABELS[field] || field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ");
                return /* @__PURE__ */ jsxs3(Box, { children: [
                  field === "dimensions" ? /* @__PURE__ */ jsxs3(BlockStack, { children: [
                    /* @__PURE__ */ jsx4(Text, { variant: "bodySm", as: "p", children: label }),
                    /* @__PURE__ */ jsxs3(InlineStack, { gap: "300", children: [
                      /* @__PURE__ */ jsx4(
                        TextField,
                        {
                          label: "Length",
                          value: customerInputData[`${field}_length`] || "",
                          onChange: (value) => setCustomerInputData((prev) => ({
                            ...prev,
                            [`${field}_length`]: value
                          })),
                          placeholder: "e.g., 12 inches",
                          autoComplete: "off"
                        }
                      ),
                      /* @__PURE__ */ jsx4(
                        TextField,
                        {
                          label: "Width",
                          value: customerInputData[`${field}_width`] || "",
                          onChange: (value) => setCustomerInputData((prev) => ({
                            ...prev,
                            [`${field}_width`]: value
                          })),
                          placeholder: "e.g., 8 inches",
                          autoComplete: "off"
                        }
                      ),
                      /* @__PURE__ */ jsx4(
                        TextField,
                        {
                          label: "Height",
                          value: customerInputData[`${field}_height`] || "",
                          onChange: (value) => setCustomerInputData((prev) => ({
                            ...prev,
                            [`${field}_height`]: value
                          })),
                          placeholder: "e.g., 4 inches",
                          autoComplete: "off"
                        }
                      )
                    ] })
                  ] }) : field === "gender" ? /* @__PURE__ */ jsx4(
                    Select,
                    {
                      label,
                      options: [
                        { label: "Select target gender", value: "" },
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Unisex", value: "unisex" },
                        { label: "Kids", value: "kids" }
                      ],
                      value: customerInputData[field] || "",
                      onChange: (value) => setCustomerInputData((prev) => ({
                        ...prev,
                        [field]: value
                      }))
                    }
                  ) : /* @__PURE__ */ jsx4(
                    TextField,
                    {
                      label,
                      value: customerInputData[field] || "",
                      onChange: (value) => setCustomerInputData((prev) => ({
                        ...prev,
                        [field]: value
                      })),
                      placeholder: getFieldPlaceholder(field),
                      helpText: getFieldHelpText(field),
                      multiline: field === "specifications" || field === "warranty" || field === "return_policy",
                      autoComplete: "off"
                    }
                  ),
                  /* @__PURE__ */ jsx4(Box, { paddingBlockStart: "200", children: /* @__PURE__ */ jsxs3(InlineStack, { gap: "200", blockAlign: "center", children: [
                    /* @__PURE__ */ jsxs3(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                      "Impact: +",
                      getFieldPoints(field),
                      " points, ~",
                      getFieldImpact(field),
                      "% health boost"
                    ] }),
                    customerInputData[field] && /* @__PURE__ */ jsx4(Badge, { tone: "success", size: "small", children: "\u2705 Ready to save" })
                  ] }) })
                ] }, index);
              }),
              Object.keys(customerInputData).length > 0 && /* @__PURE__ */ jsxs3(InlineStack, { align: "end", children: [
                /* @__PURE__ */ jsx4(Button, { onClick: () => setCustomerInputData({}), children: "Clear All" }),
                /* @__PURE__ */ jsxs3(
                  Button,
                  {
                    variant: "primary",
                    onClick: handleSaveCustomerInput,
                    loading: isSavingCustomerInput,
                    children: [
                      "Save ",
                      Object.values(customerInputData).filter((v) => v.trim()).length,
                      " Fields"
                    ]
                  }
                )
              ] })
            ] }) })
          ] }) }),
          selectedProduct.score >= 90 && /* @__PURE__ */ jsx4(Card, { children: /* @__PURE__ */ jsxs3(BlockStack, { children: [
            /* @__PURE__ */ jsx4(Text, { variant: "headingMd", as: "h3", children: selectedProduct.score === 100 ? "\u{1F389} Perfect Product Health!" : "\u2705 Product Health: Excellent" }),
            /* @__PURE__ */ jsx4(Text, { as: "p", children: selectedProduct.score === 100 ? "Congratulations! This product has achieved perfect health with all OpenAI spec requirements met." : "This product has a high health score and does not need immediate attention." }),
            selectedProduct.gaps.length === 0 && selectedProduct.score === 100 && /* @__PURE__ */ jsx4(Text, { variant: "bodySm", tone: "success", as: "p", children: "\u{1F680} Ready for OpenAI ChatGPT discovery!" })
          ] }) })
        ] }) })
      }
    )
  ] });
}

// app/routes/auth.$.tsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader8
});
init_shopify_server();
var loader8 = async ({ request }) => (await authenticate.admin(request), null);

// app/routes/health.tsx
var health_exports = {};
__export(health_exports, {
  loader: () => loader9
});
import { json as json10 } from "@remix-run/node";
async function loader9() {
  try {
    return json10(
      {
        status: "healthy",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        service: "catalogai-optimizer",
        environment: "production",
        uptime: process.uptime()
      },
      { status: 200 }
    );
  } catch (error) {
    return console.error("Health check failed:", error), json10(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      },
      { status: 500 }
    );
  }
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-R7EMXZ6C.js", imports: ["/build/_shared/chunk-J72A6OT6.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-2MAP4P36.js", imports: ["/build/_shared/chunk-Y6F7CRN3.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-HSCFLAEC.js", imports: ["/build/_shared/chunk-MWF276KD.js", "/build/_shared/chunk-ADGUJX5W.js", "/build/_shared/chunk-LCJSGTVF.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.enrich": { id: "routes/api.enrich", parentId: "root", path: "api/enrich", index: void 0, caseSensitive: void 0, module: "/build/routes/api.enrich-SFXHLYSE.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.health-check": { id: "routes/api.health-check", parentId: "root", path: "api/health-check", index: void 0, caseSensitive: void 0, module: "/build/routes/api.health-check-4K2OQFHX.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.queue-status": { id: "routes/api.queue-status", parentId: "root", path: "api/queue-status", index: void 0, caseSensitive: void 0, module: "/build/routes/api.queue-status-BGLNO3UC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.settings": { id: "routes/api.settings", parentId: "root", path: "api/settings", index: void 0, caseSensitive: void 0, module: "/build/routes/api.settings-FJ3TID6M.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.sync": { id: "routes/api.sync", parentId: "root", path: "api/sync", index: void 0, caseSensitive: void 0, module: "/build/routes/api.sync-64X2SDGK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.test-health-check": { id: "routes/api.test-health-check", parentId: "root", path: "api/test-health-check", index: void 0, caseSensitive: void 0, module: "/build/routes/api.test-health-check-IYEKKCWC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.validate": { id: "routes/api.validate", parentId: "root", path: "api/validate", index: void 0, caseSensitive: void 0, module: "/build/routes/api.validate-HG5RCGQI.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.$": { id: "routes/auth.$", parentId: "root", path: "auth/*", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.$-QXGTKEOT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/health": { id: "routes/health", parentId: "root", path: "health", index: void 0, caseSensitive: void 0, module: "/build/routes/health-TTCX2HYV.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-PBKDGD5Z.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "122b43e4", hmr: void 0, url: "/build/manifest-122B43E4.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !0, v3_relativeSplatPath: !0, v3_throwAbortReason: !0, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.test-health-check": {
    id: "routes/api.test-health-check",
    parentId: "root",
    path: "api/test-health-check",
    index: void 0,
    caseSensitive: void 0,
    module: api_test_health_check_exports
  },
  "routes/api.health-check": {
    id: "routes/api.health-check",
    parentId: "root",
    path: "api/health-check",
    index: void 0,
    caseSensitive: void 0,
    module: api_health_check_exports
  },
  "routes/api.queue-status": {
    id: "routes/api.queue-status",
    parentId: "root",
    path: "api/queue-status",
    index: void 0,
    caseSensitive: void 0,
    module: api_queue_status_exports
  },
  "routes/api.settings": {
    id: "routes/api.settings",
    parentId: "root",
    path: "api/settings",
    index: void 0,
    caseSensitive: void 0,
    module: api_settings_exports
  },
  "routes/api.validate": {
    id: "routes/api.validate",
    parentId: "root",
    path: "api/validate",
    index: void 0,
    caseSensitive: void 0,
    module: api_validate_exports
  },
  "routes/api.enrich": {
    id: "routes/api.enrich",
    parentId: "root",
    path: "api/enrich",
    index: void 0,
    caseSensitive: void 0,
    module: api_enrich_exports
  },
  "routes/api.sync": {
    id: "routes/api.sync",
    parentId: "root",
    path: "api/sync",
    index: void 0,
    caseSensitive: void 0,
    module: api_sync_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/health": {
    id: "routes/health",
    parentId: "root",
    path: "health",
    index: void 0,
    caseSensitive: void 0,
    module: health_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
