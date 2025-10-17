import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from "/build/_shared/chunk-KB66VNYM.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-JWO2UMNO.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/root.tsx
var import_react3 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.tsx"
  );
}
var meta = () => {
  return [{
    title: "CatalogAI Optimizer"
  }, {
    name: "description",
    content: "AI-powered Shopify catalog optimization"
  }];
};
var links = () => [{
  rel: "stylesheet",
  href: "https://unpkg.com/@shopify/polaris@12.27.0/build/esm/styles.css"
}];
function AppLayout() {
  _s();
  const location = useLocation();
  const [shop, setShop] = (0, import_react3.useState)(null);
  const [isClient, setIsClient] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    setIsClient(true);
    const urlParams = new URLSearchParams(window.location.search);
    const shopParam = urlParams.get("shop");
    setShop(shopParam);
  }, []);
  const navigationLinks = [{
    label: "Dashboard",
    destination: "/"
  }, {
    label: "Feed Validation",
    destination: "/validation"
  }, {
    label: "AI Enrichment",
    destination: "/enrichment"
  }, {
    label: "Intent Tagging",
    destination: "/tagging"
  }, {
    label: "Settings",
    destination: "/settings"
  }];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    isClient && shop && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      position: "fixed",
      left: 0,
      top: 0,
      width: "250px",
      height: "100vh",
      backgroundColor: "#f6f6f7",
      borderRight: "1px solid #e1e3e5",
      padding: "20px",
      zIndex: 1e3
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginBottom: "20px"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        color: "#202223"
      }, children: "Atlas: AI Store Builder" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 83,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { children: navigationLinks.map((link) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginBottom: "8px"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: link.destination, style: {
        display: "block",
        padding: "8px 12px",
        textDecoration: "none",
        color: location.pathname === link.destination ? "#008060" : "#202223",
        backgroundColor: location.pathname === link.destination ? "#f0f9f7" : "transparent",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: location.pathname === link.destination ? "600" : "400",
        transition: "all 0.2s ease"
      }, children: link.label }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 97,
        columnNumber: 17
      }, this) }, link.destination, false, {
        fileName: "app/root.tsx",
        lineNumber: 94,
        columnNumber: 42
      }, this)) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 69,
      columnNumber: 28
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginLeft: isClient && shop ? "250px" : "0",
      transition: "margin-left 0.2s ease"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 120,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 67,
    columnNumber: 10
  }, this);
}
_s(AppLayout, "FR5WxUhTmg9L7YcjI2p7L3QKvKQ=", false, function() {
  return [useLocation];
});
_c = AppLayout;
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 134,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppLayout, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 139,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 129,
    columnNumber: 10
  }, this);
}
_c2 = App;
var _c;
var _c2;
$RefreshReg$(_c, "AppLayout");
$RefreshReg$(_c2, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-7P3B7Q77.js.map
