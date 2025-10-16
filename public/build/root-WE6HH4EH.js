import {
  AppProvider,
  Frame
} from "/build/_shared/chunk-6SE3652O.js";
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
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-JWO2UMNO.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/@shopify/app-bridge-react/build/esm/components/NavMenu.js
var NavMenu = "ui-nav-menu";

// app/root.tsx
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
  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const shop = urlParams?.get("shop");
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
    shop && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavMenu, { navigationLinks, matcher: (link, location2) => link.destination === location2.pathname }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 61,
      columnNumber: 16
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
_s(AppLayout, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function() {
  return [useLocation];
});
_c = AppLayout;
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppProvider, { i18n: {}, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Frame, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppLayout, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 70,
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
//# sourceMappingURL=/build/root-WE6HH4EH.js.map
