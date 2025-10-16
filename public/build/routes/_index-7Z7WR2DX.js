import {
  FIELD_LABELS,
  getFieldInputType
} from "/build/_shared/chunk-EJGQX3FZ.js";
import "/build/_shared/chunk-7LEGIGN6.js";
import {
  require_shopify
} from "/build/_shared/chunk-WKL2Q47I.js";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Collapsible,
  DataTable,
  Icon,
  InlineStack,
  Layout,
  Modal,
  Page,
  ProgressBar,
  Select,
  Spinner,
  SvgAlertTriangleIcon,
  SvgArrowDownIcon,
  SvgArrowUpIcon,
  SvgCheckCircleIcon,
  SvgXCircleIcon,
  Text,
  TextField,
  Toast
} from "/build/_shared/chunk-6SE3652O.js";
import {
  useFetcher,
  useLoaderData
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
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:@remix-run/node
var require_node = __commonJS({
  "empty-module:@remix-run/node"(exports, module) {
    module.exports = {};
  }
});

// app/routes/_index.tsx
var import_node = __toESM(require_node());
var import_react3 = __toESM(require_react());
var import_shopify = __toESM(require_shopify());

// app/components/HealthCheckModal.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/HealthCheckModal.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/HealthCheckModal.tsx"
  );
  import.meta.hot.lastModified = "1759515818169.546";
}
function HealthCheckModal({
  isOpen,
  onClose,
  jobId,
  currentScore = 0,
  currentGaps = []
}) {
  _s();
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [results, setResults] = (0, import_react.useState)(null);
  const [toast, setToast] = (0, import_react.useState)(null);
  const [autoFixing, setAutoFixing] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (isOpen && jobId) {
      fetchResults();
    }
  }, [isOpen, jobId]);
  const fetchResults = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("action", "get-results");
      formData.append("jobId", jobId);
      const response = await fetch("/api/health-check", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success && data.result) {
        setResults(data.result);
      } else {
        setToast({
          content: data.error || "Failed to fetch results",
          error: true
        });
      }
    } catch (error) {
      setToast({
        content: "Failed to fetch results",
        error: true
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAutoFix = async () => {
    if (!results)
      return;
    const fixableGaps = results.gaps.filter((gap) => gap.fixable);
    if (fixableGaps.length === 0) {
      setToast({
        content: "No fixable gaps found",
        error: true
      });
      return;
    }
    setAutoFixing(true);
    try {
      const formData = new FormData();
      formData.append("action", "auto-fix");
      formData.append("gapTypes", JSON.stringify(fixableGaps.map((gap) => gap.field)));
      const response = await fetch("/api/health-check", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setToast({
          content: `Auto-fix initiated for ${fixableGaps.length} gaps`
        });
        setTimeout(fetchResults, 2e3);
      } else {
        setToast({
          content: data.error || "Auto-fix failed",
          error: true
        });
      }
    } catch (error) {
      setToast({
        content: "Auto-fix failed",
        error: true
      });
    } finally {
      setAutoFixing(false);
    }
  };
  const getScoreColor = (score) => {
    if (score >= 90)
      return "success";
    if (score >= 70)
      return "warning";
    return "critical";
  };
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return SvgXCircleIcon;
      case "error":
        return SvgAlertTriangleIcon;
      case "warning":
        return SvgAlertTriangleIcon;
      default:
        return SvgCheckCircleIcon;
    }
  };
  const getSeverityColor = (severity) => {
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
  };
  const formatTrend = (trends) => {
    if (trends.length < 2)
      return null;
    const latest = trends[trends.length - 1];
    const previous = trends[trends.length - 2];
    const diff = latest.score - previous.score;
    return {
      value: diff,
      icon: diff >= 0 ? SvgArrowUpIcon : SvgArrowDownIcon,
      color: diff >= 0 ? "success" : "critical"
    };
  };
  const gapsTableRows = results?.gaps.map((gap, index) => [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { gap: "200", align: "start", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { source: getSeverityIcon(gap.severity) }, void 0, false, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", fontWeight: "medium", children: gap.field }, void 0, false, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this)
  ] }, index, true, {
    fileName: "app/components/HealthCheckModal.tsx",
    lineNumber: 151,
    columnNumber: 60
  }, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { tone: getSeverityColor(gap.severity), children: gap.severity }, `badge-${index}`, false, {
    fileName: "app/components/HealthCheckModal.tsx",
    lineNumber: 154,
    columnNumber: 21
  }, this), gap.count, gap.fixable ? "Yes" : "No"]) || [];
  const trendsTableRows = results?.trends.slice(-7).map((trend, index) => [new Date(trend.date).toLocaleDateString(), `${trend.score}%`, trend.totalProducts, trend.validProducts]) || [];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { open: isOpen, onClose, title: "Health Check Results", size: "large", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal.Section, { children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Spinner, { size: "large" }, void 0, false, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 162,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: "Analyzing your catalog..." }, void 0, false, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 163,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 161,
      columnNumber: 22
    }, this) : results ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", children: "Overall Health Score" }, void 0, false, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 169,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { tone: getScoreColor(results.score), children: [
            results.score,
            "%"
          ] }, void 0, true, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 170,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 168,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProgressBar, { progress: results.score, size: "large", color: getScoreColor(results.score) }, void 0, false, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 175,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { gap: "400", align: "start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", color: "subdued", children: "Total Products" }, void 0, false, {
              fileName: "app/components/HealthCheckModal.tsx",
              lineNumber: 179,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", children: results.totalProducts }, void 0, false, {
              fileName: "app/components/HealthCheckModal.tsx",
              lineNumber: 180,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 178,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", color: "subdued", children: "Valid Products" }, void 0, false, {
              fileName: "app/components/HealthCheckModal.tsx",
              lineNumber: 183,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", children: results.validProducts }, void 0, false, {
              fileName: "app/components/HealthCheckModal.tsx",
              lineNumber: 184,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 182,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", color: "subdued", children: "Issues Found" }, void 0, false, {
              fileName: "app/components/HealthCheckModal.tsx",
              lineNumber: 187,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", children: results.gaps.length }, void 0, false, {
              fileName: "app/components/HealthCheckModal.tsx",
              lineNumber: 188,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 186,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 177,
          columnNumber: 19
        }, this),
        results.trends.length > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { gap: "200", align: "start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", color: "subdued", children: "7-Day Trend" }, void 0, false, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 194,
            columnNumber: 25
          }, this),
          (() => {
            const trend = formatTrend(results.trends);
            return trend ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { gap: "100", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { source: trend.icon }, void 0, false, {
                fileName: "app/components/HealthCheckModal.tsx",
                lineNumber: 198,
                columnNumber: 31
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", color: trend.color, children: [
                trend.value > 0 ? "+" : "",
                trend.value.toFixed(1),
                "%"
              ] }, void 0, true, {
                fileName: "app/components/HealthCheckModal.tsx",
                lineNumber: 199,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/HealthCheckModal.tsx",
              lineNumber: 197,
              columnNumber: 36
            }, this) : null;
          })()
        ] }, void 0, true, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 193,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 192,
          columnNumber: 49
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 167,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 166,
        columnNumber: 15
      }, this),
      results.gaps.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", children: "Issues Found" }, void 0, false, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 213,
            columnNumber: 23
          }, this),
          results.gaps.some((gap) => gap.fixable) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "primary", onClick: handleAutoFix, loading: autoFixing, disabled: autoFixing, children: "Auto-Fix Fixable Issues" }, void 0, false, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 214,
            columnNumber: 65
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 212,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DataTable, { columnContentTypes: ["text", "text", "numeric", "text"], headings: ["Field", "Severity", "Count", "Fixable"], rows: gapsTableRows }, void 0, false, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 219,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 211,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 210,
        columnNumber: 43
      }, this),
      results.trends.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", children: "Health Score Trends (Last 7 Days)" }, void 0, false, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 226,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DataTable, { columnContentTypes: ["text", "numeric", "numeric", "numeric"], headings: ["Date", "Score", "Total Products", "Valid Products"], rows: trendsTableRows }, void 0, false, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 227,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 225,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 224,
        columnNumber: 45
      }, this),
      results.gaps.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "center", gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { source: SvgCheckCircleIcon }, void 0, false, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 234,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", children: "Excellent!" }, void 0, false, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 236,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", color: "subdued", children: "Your catalog is in great health. No issues were found." }, void 0, false, {
            fileName: "app/components/HealthCheckModal.tsx",
            lineNumber: 237,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/HealthCheckModal.tsx",
          lineNumber: 235,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 233,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/components/HealthCheckModal.tsx",
        lineNumber: 232,
        columnNumber: 45
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 164,
      columnNumber: 40
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", color: "subdued", children: "No results available. Please try running the health check again." }, void 0, false, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 243,
      columnNumber: 29
    }, this) }, void 0, false, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 160,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 159,
      columnNumber: 7
    }, this),
    toast && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toast, { content: toast.content, error: toast.error, onDismiss: () => setToast(null) }, void 0, false, {
      fileName: "app/components/HealthCheckModal.tsx",
      lineNumber: 249,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/HealthCheckModal.tsx",
    lineNumber: 158,
    columnNumber: 10
  }, this);
}
_s(HealthCheckModal, "4AooCBtbNi6UJdul5NqhGJfxiyI=");
_c = HealthCheckModal;
var _c;
$RefreshReg$(_c, "HealthCheckModal");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
}
function Index() {
  _s2();
  const loaderData = useLoaderData();
  const {
    shop,
    totalProducts,
    averageScore,
    dashboardMetrics,
    lastSync,
    recentLogs,
    user
  } = loaderData;
  const [products, setProducts] = (0, import_react3.useState)(loaderData.products);
  const [isSyncing, setIsSyncing] = (0, import_react3.useState)(false);
  const [isHealthChecking, setIsHealthChecking] = (0, import_react3.useState)(false);
  const [toastActive, setToastActive] = (0, import_react3.useState)(false);
  const [toastMessage, setToastMessage] = (0, import_react3.useState)("");
  const [healthModalOpen, setHealthModalOpen] = (0, import_react3.useState)(false);
  const [healthCheckJobId, setHealthCheckJobId] = (0, import_react3.useState)();
  const [selectedProduct, setSelectedProduct] = (0, import_react3.useState)(null);
  const [productModalOpen, setProductModalOpen] = (0, import_react3.useState)(false);
  const [recommendations, setRecommendations] = (0, import_react3.useState)([]);
  const [approvalState, setApprovalState] = (0, import_react3.useState)({});
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = (0, import_react3.useState)(false);
  const [isApplyingChanges, setIsApplyingChanges] = (0, import_react3.useState)(false);
  const [justAppliedChanges, setJustAppliedChanges] = (0, import_react3.useState)(false);
  const [customerInputOpen, setCustomerInputOpen] = (0, import_react3.useState)(false);
  const [customerInputData, setCustomerInputData] = (0, import_react3.useState)({});
  const [isSavingCustomerInput, setIsSavingCustomerInput] = (0, import_react3.useState)(false);
  const [showOnlyLowHealth, setShowOnlyLowHealth] = (0, import_react3.useState)(false);
  const [showOnlyNoDescription, setShowOnlyNoDescription] = (0, import_react3.useState)(false);
  const syncFetcher = useFetcher();
  const healthCheckFetcher = useFetcher();
  const recommendationFetcher = useFetcher();
  const customerInputFetcher = useFetcher();
  (0, import_react3.useEffect)(() => {
    setProducts(loaderData.products);
  }, [loaderData.products]);
  const handleSync = () => {
    setIsSyncing(true);
    syncFetcher.submit(
      {
        action: "sync"
      },
      {
        method: "post"
      }
      // Same route action, no need to specify action path
    );
  };
  const handleHealthCheck = () => {
    setIsHealthChecking(true);
    healthCheckFetcher.submit({}, {
      method: "get",
      action: "/api/health-check"
    });
  };
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
    setJustAppliedChanges(false);
    if (product.recommendations?.recommendations) {
      console.log("\u{1F4CB} Loading existing recommendations for product:", product.id);
      const existingRecs = product.recommendations.recommendations;
      setRecommendations(existingRecs);
      const approvalState2 = {};
      existingRecs.forEach((rec) => {
        if (rec.status === "approved" || rec.status === "applied") {
          approvalState2[rec.field] = true;
        } else if (rec.status === "rejected") {
          approvalState2[rec.field] = false;
        }
      });
      setApprovalState(approvalState2);
    } else {
      setRecommendations([]);
      setApprovalState({});
    }
  };
  const handleGenerateRecommendations = () => {
    if (!selectedProduct)
      return;
    setIsGeneratingRecommendations(true);
    setJustAppliedChanges(false);
    recommendationFetcher.submit({
      action: "generate-recommendations",
      productId: selectedProduct.id,
      forceRegenerate: recommendations.length > 0 ? "true" : "false"
      // Force regenerate if called from regenerate button
    }, {
      method: "post"
    });
  };
  const handleToggleApproval = (fieldName, newState) => {
    setApprovalState((prev) => ({
      ...prev,
      [fieldName]: newState !== void 0 ? newState : prev[fieldName] === true ? false : prev[fieldName] === false ? void 0 : true
    }));
  };
  const handleApplyChanges = () => {
    if (!selectedProduct)
      return;
    const approvedRecommendations = recommendations.filter((rec) => approvalState[rec.field] === true);
    const rejectedRecommendations = recommendations.filter((rec) => approvalState[rec.field] === false);
    const pendingRecommendations = recommendations.filter((rec) => approvalState[rec.field] === void 0);
    console.log("\u{1F4CA} Approval Summary:", {
      total: recommendations.length,
      approved: approvedRecommendations.length,
      rejected: rejectedRecommendations.length,
      pending: pendingRecommendations.length,
      approvedFields: approvedRecommendations.map((r) => r.field),
      rejectedFields: rejectedRecommendations.map((r) => r.field)
    });
    if (approvedRecommendations.length === 0) {
      setToastMessage("Please approve at least one recommendation before applying changes");
      setToastActive(true);
      return;
    }
    console.log("\u{1F680} Starting apply changes...");
    console.log("\u{1F4CB} Approved recommendations to apply:", approvedRecommendations);
    setIsApplyingChanges(true);
    recommendationFetcher.submit({
      action: "apply-recommendations",
      productId: selectedProduct.id,
      approvedRecommendations: JSON.stringify(approvedRecommendations)
    }, {
      method: "post"
    });
  };
  if (syncFetcher.data && isSyncing) {
    const data = syncFetcher.data;
    if (data.success) {
      setToastMessage(`Successfully synced ${data.data?.productsCount || 0} products`);
      setToastActive(true);
    } else {
      setToastMessage(`Sync failed: ${data.error}`);
      setToastActive(true);
    }
    setIsSyncing(false);
  }
  if (healthCheckFetcher.data && isHealthChecking) {
    const data = healthCheckFetcher.data;
    if (data.success) {
      setHealthCheckJobId(data.jobId);
      setHealthModalOpen(true);
      setToastMessage(`Health scan initiated - analyzing ${data.currentScore}% current score`);
      setToastActive(true);
    } else {
      setToastMessage(`Health check failed: ${data.error}`);
      setToastActive(true);
    }
    setIsHealthChecking(false);
  }
  if (recommendationFetcher.data && isGeneratingRecommendations) {
    const data = recommendationFetcher.data;
    if (data.success && data.recommendations) {
      setRecommendations(data.recommendations);
      if (data.isExisting) {
        setToastMessage(`Loaded existing ${data.recommendations.length} AI recommendations`);
      } else {
        setToastMessage(`Generated ${data.recommendations.length} new AI recommendations`);
      }
      setToastActive(true);
      if (data.isExisting) {
        const approvalState2 = {};
        data.recommendations.forEach((rec) => {
          if (rec.status === "approved" || rec.status === "applied") {
            approvalState2[rec.field] = true;
          } else if (rec.status === "rejected") {
            approvalState2[rec.field] = false;
          }
        });
        setApprovalState(approvalState2);
      }
    } else if (data.error) {
      setToastMessage(`Failed to generate recommendations: ${data.error}`);
      setToastActive(true);
    }
    setIsGeneratingRecommendations(false);
  }
  if (recommendationFetcher.data && isApplyingChanges) {
    const data = recommendationFetcher.data;
    console.log("\u{1F50D} Apply changes response:", data);
    console.log("\u{1F50D} Response type:", typeof data);
    console.log("\u{1F50D} Response keys:", Object.keys(data));
    if (data.success && selectedProduct) {
      const appliedFields = recommendations.filter((rec) => approvalState[rec.field] === true).map((rec) => rec.field);
      const getFieldCelebration = (field) => {
        const celebrations = {
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
        };
        return celebrations[field] || `\u2705 ${field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ")} updated!`;
      };
      let message = "";
      if (appliedFields.length === 1) {
        message = getFieldCelebration(appliedFields[0]);
      } else if (appliedFields.length === 2) {
        message = `\u{1F389} Double win! Updated ${appliedFields.map((f) => f.replace(/_/g, " ")).join(" and ")}!`;
      } else if (appliedFields.length >= 3) {
        message = `\u{1F680} Amazing progress! Applied ${appliedFields.length} improvements - you're on fire!`;
      }
      let finalScore = selectedProduct.score;
      let pointsEarned = 0;
      if (data.scoreImprovement) {
        finalScore = data.scoreImprovement.final;
        const improvement = data.scoreImprovement.improvement;
        pointsEarned = appliedFields.length * 15;
        if (improvement > 0) {
          message += ` \u{1F4C8} Score: ${data.scoreImprovement.initial}% \u2192 ${data.scoreImprovement.final}% (+${improvement.toFixed(0)}%) | +${pointsEarned} points!`;
        } else {
          message += ` \u{1F4CA} Score: ${data.scoreImprovement.final}%`;
        }
      }
      const updatedGaps = selectedProduct.gaps.filter((gap) => !appliedFields.includes(gap));
      const updatedSelectedProduct = {
        ...selectedProduct,
        score: finalScore,
        gaps: updatedGaps
      };
      setProducts((prev) => prev.map((p) => p.id === selectedProduct.id ? updatedSelectedProduct : p));
      setSelectedProduct(updatedSelectedProduct);
      setRecommendations([]);
      setApprovalState({});
      setJustAppliedChanges(true);
      const safeMessage = typeof message === "string" && message.length > 0 && !message.match(/^\d{3}$/) ? message : "Changes applied successfully!";
      setToastMessage(safeMessage);
      setToastActive(true);
    } else if (data.error) {
      setToastMessage(`Failed to apply changes: ${data.error}`);
      setToastActive(true);
    } else {
      console.error("\u{1F6A8} Unexpected response format:", data);
      setToastMessage(`Unexpected response: ${JSON.stringify(data)}`);
      setToastActive(true);
    }
    setIsApplyingChanges(false);
  }
  if (customerInputFetcher.data && isSavingCustomerInput) {
    const data = customerInputFetcher.data;
    console.log("\u{1F50D} Customer input save response:", data);
    if (data.success && selectedProduct) {
      const appliedFields = data.appliedFields || [];
      const appliedCount = data.appliedCount || 0;
      let message = "";
      if (appliedCount === 1) {
        const fieldName = appliedFields[0]?.replace(/_/g, " ");
        message = `\u{1F389} Great! ${fieldName} added to your product specs!`;
      } else if (appliedCount > 1) {
        message = `\u{1F680} Excellent! Added ${appliedCount} product specifications!`;
      }
      const estimatedImprovement = appliedCount * 4;
      message += ` \u{1F4C8} Health score boost: ~+${estimatedImprovement}% | +${appliedCount * 15} points!`;
      const updatedGaps = selectedProduct.gaps.filter((gap) => !appliedFields.includes(gap));
      const updatedScore = Math.min(100, selectedProduct.score + estimatedImprovement);
      const updatedSelectedProduct = {
        ...selectedProduct,
        score: updatedScore,
        gaps: updatedGaps
      };
      setProducts((prev) => prev.map((p) => p.id === selectedProduct.id ? updatedSelectedProduct : p));
      setSelectedProduct(updatedSelectedProduct);
      setCustomerInputData({});
      setCustomerInputOpen(false);
      setJustAppliedChanges(true);
      setToastMessage(message);
      setToastActive(true);
    } else if (data.error) {
      setToastMessage(`Failed to save: ${data.error}`);
      setToastActive(true);
    }
    setIsSavingCustomerInput(false);
  }
  const getFieldPlaceholder = (field) => {
    const placeholders = {
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
    };
    return placeholders[field] || `Enter ${field.replace(/_/g, " ")}`;
  };
  const getFieldHelpText = (field) => {
    const helpTexts = {
      material: "Primary material or fabric composition",
      weight: "Product weight with unit (lbs, kg, oz)",
      color: "Primary color or color options",
      brand: "Manufacturer or brand name",
      warranty: "Warranty terms and duration",
      upc: "Universal Product Code for inventory",
      specifications: "Technical specs, one per line"
    };
    return helpTexts[field] || "";
  };
  const getFieldPoints = (field) => {
    const fieldCategories = {
      required: 25,
      high: 20,
      medium: 15,
      low: 10
    };
    const highFields = ["material", "dimensions", "weight", "brand"];
    const mediumFields = ["color", "size", "upc", "compatibility", "age_range", "gender"];
    if (highFields.includes(field))
      return fieldCategories.high;
    if (mediumFields.includes(field))
      return fieldCategories.medium;
    return fieldCategories.low;
  };
  const getFieldImpact = (field) => {
    const highFields = ["material", "dimensions", "weight", "brand"];
    const mediumFields = ["color", "size", "upc", "compatibility", "age_range", "gender"];
    if (highFields.includes(field))
      return "4-5";
    if (mediumFields.includes(field))
      return "3-4";
    return "2-3";
  };
  const handleSaveCustomerInput = () => {
    if (!selectedProduct)
      return;
    const validationErrors = [];
    const filledData = {};
    Object.entries(customerInputData).forEach(([field, value]) => {
      const trimmedValue = value.trim();
      if (!trimmedValue)
        return;
      if (field === "upc" && trimmedValue.length < 8) {
        validationErrors.push("UPC must be at least 8 digits");
      } else if (field === "weight" && !/\d+(\.\d+)?\s*(lbs?|kgs?|oz|pounds?|kilograms?|ounces?)/i.test(trimmedValue)) {
        validationErrors.push('Weight must include unit (e.g., "2.5 lbs", "1.2 kg")');
      } else if ((field === "documentation_url" || field === "video_urls") && trimmedValue && !trimmedValue.startsWith("http")) {
        validationErrors.push(`${field.replace(/_/g, " ")} must be a valid URL starting with http`);
      } else if (field === "age_range" && trimmedValue && !/\d+/.test(trimmedValue)) {
        validationErrors.push('Age range must contain numbers (e.g., "18+", "3-12")');
      } else {
        filledData[field] = trimmedValue;
      }
    });
    if (validationErrors.length > 0) {
      setToastMessage(`Validation errors: ${validationErrors.join(", ")}`);
      setToastActive(true);
      return;
    }
    if (Object.keys(filledData).length === 0) {
      setToastMessage("Please fill in at least one field before saving");
      setToastActive(true);
      return;
    }
    setIsSavingCustomerInput(true);
    customerInputFetcher.submit({
      action: "save-customer-input",
      productId: selectedProduct.id,
      inputData: JSON.stringify(filledData)
    }, {
      method: "post"
    });
  };
  const filteredProducts = products.filter((product) => {
    if (showOnlyLowHealth && product.score >= 70)
      return false;
    if (showOnlyNoDescription && product.description && product.description !== "No description")
      return false;
    return true;
  });
  const rows = products.map((product) => [product.id, product.title, product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description, `${product.score}%`, product.gaps.length > 0 ? product.gaps.join(", ") : "None"]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Page, { title: "CatalogAI Optimizer Dashboard", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { align: "center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
            position: "relative",
            width: "80px",
            height: "80px",
            marginBottom: "10px"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { width: "80", height: "80", style: {
              transform: "rotate(-90deg)"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("circle", { cx: "40", cy: "40", r: "35", fill: "none", stroke: "#e5e7eb", strokeWidth: "8" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1519,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("circle", { cx: "40", cy: "40", r: "35", fill: "none", stroke: dashboardMetrics.aiReadinessScore >= 90 ? "#10b981" : dashboardMetrics.aiReadinessScore >= 50 ? "#f59e0b" : "#ef4444", strokeWidth: "8", strokeDasharray: `${dashboardMetrics.aiReadinessScore / 100 * 220} 220`, strokeLinecap: "round" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1520,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1516,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
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
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1523,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1510,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingLg", as: "p", children: [
            dashboardMetrics.aiReadinessScore,
            " / 100"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1535,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Excellent AI readiness" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1536,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1509,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1508,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { align: "center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingLg", as: "p", children: [
            dashboardMetrics.productsPassedPercentage,
            "%"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1543,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: [
            dashboardMetrics.validProducts,
            " of ",
            dashboardMetrics.totalProducts,
            " products"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1544,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "success", as: "p", children: "\u2191 5% from last week" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1545,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1542,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1541,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { align: "center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingLg", as: "p", children: dashboardMetrics.lastSyncTime ? `${Math.floor((Date.now() - new Date(dashboardMetrics.lastSyncTime).getTime()) / (1e3 * 60 * 60))}h ago` : "Never" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1552,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: "Last synced successfully" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1555,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1551,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1550,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1502,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1501,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingLg", as: "h2", children: "Feed Health" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1565,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Product validation distribution" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1566,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          marginTop: "20px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
            display: "flex",
            alignItems: "center",
            marginBottom: "10px"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
              width: `${dashboardMetrics.validProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#10b981",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1577,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.validProducts,
              " products"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1585,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1572,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
            display: "flex",
            alignItems: "center",
            marginBottom: "10px"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
              width: `${dashboardMetrics.warningProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#f59e0b",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1594,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.warningProducts,
              " products"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1602,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1589,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
            display: "flex",
            alignItems: "center",
            marginBottom: "20px"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
              width: `${dashboardMetrics.invalidProducts / dashboardMetrics.totalProducts * 200}px`,
              height: "8px",
              background: "#ef4444",
              borderRadius: "4px",
              marginRight: "10px",
              minWidth: "20px"
            } }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1611,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.invalidProducts,
              " products"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1619,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1606,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: "primary", children: "View Validation Report" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1622,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1568,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1564,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1563,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1562,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingLg", as: "h2", children: "Next Actions" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1632,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Recommended optimizations for your catalog" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1633,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: [
              dashboardMetrics.invalidProducts,
              " products need attention"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1644,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: "primary", tone: "critical", children: "Take Action" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1645,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1643,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1642,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: [
              "Optimize ",
              dashboardMetrics.warningProducts,
              " products"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1652,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: "primary", children: "Take Action" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1653,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1651,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1650,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1635,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1631,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1630,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1629,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          marginBottom: "10px"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          width: "100%",
          height: "8px",
          background: "#e5e7eb",
          borderRadius: "4px",
          overflow: "hidden"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          width: `${dashboardMetrics.optimizationProgress}%`,
          height: "100%",
          background: "#3b82f6",
          transition: "width 0.3s ease"
        } }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1675,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1668,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1665,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: [
            "Your catalog is ",
            dashboardMetrics.optimizationProgress,
            "% AI-ready \u2014 ",
            100 - dashboardMetrics.optimizationProgress,
            "% left to optimize!"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1689,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: [
            dashboardMetrics.optimizationProgress,
            "% Complete"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1692,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1684,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: {
          marginTop: "5px"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "Keep going! \u{1F680}" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1700,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1697,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1664,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1663,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1662,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingLg", as: "h2", children: "\u{1F4E6} Product Catalog" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1714,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Browse and manage your product inventory" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1717,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1713,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { onClick: handleSync, loading: isSyncing, variant: "primary", size: "large", children: isSyncing ? "Syncing..." : "\u{1F504} Sync Products" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1722,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1721,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1712,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Filter by:" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1733,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: showOnlyLowHealth ? "primary" : "tertiary", size: "slim", onClick: () => setShowOnlyLowHealth(!showOnlyLowHealth), children: "\u{1F6A8} Low Health Only" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1734,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: showOnlyNoDescription ? "primary" : "tertiary", size: "slim", onClick: () => setShowOnlyNoDescription(!showOnlyNoDescription), children: "\u{1F4DD} Missing Descriptions" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1738,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1732,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
            "Showing ",
            filteredProducts.length,
            " of ",
            products.length,
            " products"
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1743,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1731,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1730,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "product-grid", style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          marginTop: "20px",
          width: "100%"
        }, children: filteredProducts.map((product, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: "plain", onClick: () => handleProductClick(product), children: product.title }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1763,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                "ID: ",
                product.id
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1767,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1762,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: product.description && product.description !== "No description" ? product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { tone: "subdued", variant: "bodyMd", as: "p", children: "No description available" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1774,
                columnNumber: 201
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1773,
                columnNumber: 27
              }, this),
              product.gaps.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { wrap: true, children: [
                product.gaps.slice(0, 3).map((gap, gapIndex) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "warning", size: "small", children: gap }, gapIndex, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1777,
                  columnNumber: 80
                }, this)),
                product.gaps.length > 3 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "info", size: "small", children: `+${product.gaps.length - 3} more` }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1780,
                  columnNumber: 59
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1776,
                columnNumber: 55
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1772,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1761,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ProgressBar, { progress: product.score, size: "small" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1789,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: product.score >= 90 ? "success" : product.score >= 70 ? "warning" : "critical", size: "small", children: `${product.score}%` }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1791,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1788,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { size: "slim", variant: "primary", onClick: () => handleProductClick(product), children: "\u{1F527} Optimize" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1797,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1787,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1760,
          columnNumber: 21
        }, this) }, product.id, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1758,
          columnNumber: 59
        }, this)) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1750,
          columnNumber: 15
        }, this),
        filteredProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "\u{1F389} No products match your filters!" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1808,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: showOnlyLowHealth ? "All your products are healthy! Great job maintaining your catalog." : showOnlyNoDescription ? "All your products have descriptions! Your catalog is well-documented." : "No products found matching your current filters." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1809,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: "tertiary", onClick: () => {
            setShowOnlyLowHealth(false);
            setShowOnlyNoDescription(false);
          }, children: "Clear Filters" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1812,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1807,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1806,
          columnNumber: 49
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1711,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1710,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1709,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "Quick Actions" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1828,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { fullWidth: true, onClick: handleHealthCheck, loading: isHealthChecking, variant: averageScore < 90 ? "primary" : "secondary", children: averageScore < 90 ? "Quick Scan Now" : "Run Health Check" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1832,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { fullWidth: true, children: "Generate Feed" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1836,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { fullWidth: true, children: "View Analytics" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1837,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1831,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1827,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1826,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1825,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout.Section, { variant: "oneHalf", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "Recent Activity" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1846,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: recentLogs.length > 0 ? recentLogs.map((log) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { as: "span", children: [
            log.type === "sync" && "\u{1F504} ",
            log.type === "push" && "\u{1F4E4} ",
            log.type === "error" && "\u274C ",
            log.type === "health_scan" && "\u{1F50D} ",
            log.type === "auto_fix" && "\u{1F527} ",
            log.type === "ai_enrichment" && "\u{1F916} ",
            log.type === "settings_update" && "\u2699\uFE0F ",
            log.message
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1851,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { as: "p", variant: "bodySm", tone: "subdued", children: new Date(log.createdAt).toLocaleString() }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1861,
            columnNumber: 23
          }, this)
        ] }, log.id, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1850,
          columnNumber: 64
        }, this)) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { as: "p", tone: "subdued", children: "No recent activity" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1864,
          columnNumber: 38
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1849,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1845,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1844,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1843,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 1499,
      columnNumber: 7
    }, this),
    toastActive && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Toast, { content: toastMessage, onDismiss: () => setToastActive(false) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 1871,
      columnNumber: 23
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      HealthCheckModal,
      {
        isOpen: healthModalOpen,
        onClose: () => setHealthModalOpen(false),
        jobId: healthCheckJobId,
        currentScore: averageScore,
        currentGaps: []
      },
      void 0,
      false,
      {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1873,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Modal, { open: productModalOpen, onClose: () => setProductModalOpen(false), title: "", size: "large", primaryAction: {
      content: "Close",
      onAction: () => setProductModalOpen(false)
    }, children: selectedProduct && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Modal.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingLg", as: "h2", children: [
              "\u{1F4E6} ",
              selectedProduct.title
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1889,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: [
              "Product ID: ",
              selectedProduct.id
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1892,
              columnNumber: 23
            }, this),
            selectedProduct.description && selectedProduct.description !== "No description" && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: selectedProduct.description }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1895,
              columnNumber: 107
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1888,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: selectedProduct.score >= 90 ? "success" : selectedProduct.score >= 70 ? "warning" : "critical", size: "large", children: [
              selectedProduct.score,
              "% Health"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1901,
              columnNumber: 21
            }, this),
            justAppliedChanges && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "success", size: "small", children: "\u2728 Just Updated!" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1905,
              columnNumber: 44
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1900,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1887,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Overall Health Progress" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1914,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: `${Math.round(selectedProduct.score / 100 * 500)} / 500 points` }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1915,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1913,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box, { paddingBlockStart: "200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ProgressBar, { progress: selectedProduct.score, size: "large" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1920,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1919,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1912,
          columnNumber: 23
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1886,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1885,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "\u{1F4CA} Category Breakdown" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1930,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [{
          name: "\u{1F6A8} Required Fields",
          icon: "\u{1F6A8}",
          fields: ["title", "description", "price", "availability", "category"],
          color: "critical",
          description: "Essential for product visibility"
        }, {
          name: "\u26A1 High Priority",
          icon: "\u26A1",
          fields: ["material", "dimensions", "weight", "brand", "use_cases", "features", "image_urls"],
          color: "warning",
          description: "Important for customer decisions"
        }, {
          name: "\u{1F4CB} Medium Priority",
          icon: "\u{1F4CB}",
          fields: ["color", "size", "target_audience", "keywords", "upc", "compatibility", "age_range", "gender", "video_urls"],
          color: "attention",
          description: "Enhances product discovery"
        }, {
          name: "\u2728 Enhancement",
          icon: "\u2728",
          fields: ["model", "sku", "tags", "vendor", "warranty", "return_policy", "shipping_info", "documentation_url", "specifications", "ai_search_queries", "semantic_description"],
          color: "success",
          description: "Optimizes for AI search"
        }].map((category, index) => {
          const missingInCategory = selectedProduct.gaps.filter((gap) => category.fields.includes(gap)).length;
          const completedInCategory = category.fields.length - missingInCategory;
          const progress = Math.round(completedInCategory / category.fields.length * 100);
          return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingSm", as: "h4", children: [
                category.icon,
                " ",
                category.name
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1966,
                columnNumber: 31
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: category.description }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1969,
                columnNumber: 31
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { wrap: true, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", as: "p", children: [
                  completedInCategory,
                  "/",
                  category.fields.length,
                  " complete"
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1973,
                  columnNumber: 33
                }, this),
                missingInCategory > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "warning", size: "small", children: `${missingInCategory} missing` }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 1976,
                  columnNumber: 59
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1972,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1965,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ProgressBar, { progress, size: "small" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1983,
                columnNumber: 31
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: `${progress}% complete` }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 1985,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 1982,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1964,
            columnNumber: 27
          }, this) }, index, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 1963,
            columnNumber: 26
          }, this);
        }) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1934,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1929,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1928,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "\u{1F50D} Missing Fields Analysis" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2e3,
            columnNumber: 21
          }, this),
          selectedProduct.gaps.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "success", size: "large", children: "\u{1F389} Perfect Score!" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2003,
            columnNumber: 58
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "critical", size: "large", children: `${selectedProduct.gaps.length} fields missing` }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2005,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 1999,
          columnNumber: 19
        }, this),
        selectedProduct.gaps.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "These fields are missing and could improve your product's visibility and AI search performance:" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2011,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { wrap: true, children: selectedProduct.gaps.map((gap, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "warning", size: "small", children: gap.replace(/_/g, " ") }, index, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2015,
            columnNumber: 67
          }, this)) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2014,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2010,
          columnNumber: 54
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "success", as: "p", children: "\u{1F389} Congratulations! Your product has all the essential fields completed." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2020,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "This product is optimized for search engines and AI-powered discovery." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2023,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2019,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1998,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 1997,
        columnNumber: 15
      }, this),
      selectedProduct.gaps.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "\u{1F916} AI Recommendations" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2034,
            columnNumber: 23
          }, this),
          recommendations.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { onClick: () => {
            setRecommendations([]);
            setApprovalState({});
            handleGenerateRecommendations();
          }, variant: "secondary", size: "slim", loading: isGeneratingRecommendations, children: "\u{1F504} Regenerate" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2037,
            columnNumber: 54
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2033,
          columnNumber: 21
        }, this),
        recommendations.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "\u{1F3AF} Ready to improve your product's health score?" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2049,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "Our AI will analyze your missing fields and suggest improvements for:" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2052,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { wrap: true, children: [
              selectedProduct.gaps.slice(0, 5).map((gap, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "warning", size: "small", children: gap.replace(/_/g, " ") }, index, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2056,
                columnNumber: 83
              }, this)),
              selectedProduct.gaps.length > 5 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "info", size: "small", children: `+${selectedProduct.gaps.length - 5} more` }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2059,
                columnNumber: 65
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2055,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2048,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { onClick: handleGenerateRecommendations, variant: "primary", size: "large", loading: isGeneratingRecommendations, children: isGeneratingRecommendations ? "\u{1F916} Generating..." : "\u{1F680} Generate AI Recommendations" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2065,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2047,
          columnNumber: 53
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          selectedProduct.recommendations?.generatedAt && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
            "Generated: ",
            new Date(selectedProduct.recommendations.generatedAt).toLocaleString()
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2070,
            columnNumber: 70
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Review and approve the AI-generated suggestions below. Only approved changes will be applied to your product." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2074,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2069,
          columnNumber: 39
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2032,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2031,
        columnNumber: 51
      }, this),
      recommendations.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "\u270F\uFE0F Review & Approve Recommendations" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2085,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "success", size: "small", children: `${Object.values(approvalState).filter(Boolean).length} approved` }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2089,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "critical", size: "small", children: `${Object.values(approvalState).filter((val) => val === false).length} rejected` }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2092,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2088,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2084,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Review each AI suggestion below. Use \u2705 to approve or \u274C to reject. Only approved changes will be applied to your product." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2098,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Quick Actions:" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2105,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { size: "slim", variant: "secondary", tone: "success", onClick: () => {
              const allApproved = recommendations.reduce((acc, rec) => ({
                ...acc,
                [rec.field]: true
              }), {});
              setApprovalState(allApproved);
            }, children: "\u2705 Approve All" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2107,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { size: "slim", variant: "secondary", tone: "critical", onClick: () => {
              const allRejected = recommendations.reduce((acc, rec) => ({
                ...acc,
                [rec.field]: false
              }), {});
              setApprovalState(allRejected);
            }, children: "\u274C Reject All" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2117,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { size: "slim", variant: "secondary", onClick: () => setApprovalState({}), children: "Clear All" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2127,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2106,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2104,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2103,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: recommendations.map((rec, index) => {
          const isApproved = approvalState[rec.field] === true;
          const isRejected = approvalState[rec.field] === false;
          const isPending = approvalState[rec.field] === void 0;
          const isApplied = rec.status === "applied";
          const getFieldInfo = (field) => {
            const fieldCategories = {
              required: {
                fields: ["title", "description", "price", "availability", "category"],
                points: "25",
                impact: "5-6%",
                color: "critical",
                icon: "\u{1F6A8}"
              },
              high: {
                fields: ["material", "dimensions", "weight", "brand", "use_cases", "features", "image_urls"],
                points: "20",
                impact: "4-5%",
                color: "warning",
                icon: "\u26A1"
              },
              medium: {
                fields: ["color", "size", "target_audience", "keywords", "upc", "compatibility", "age_range", "gender", "video_urls"],
                points: "15",
                impact: "3-4%",
                color: "attention",
                icon: "\u{1F4CB}"
              },
              low: {
                fields: ["model", "sku", "tags", "vendor", "warranty", "return_policy", "shipping_info", "documentation_url", "specifications", "ai_search_queries", "semantic_description"],
                points: "10",
                impact: "2-3%",
                color: "info",
                icon: "\u2728"
              }
            };
            for (const [category, info] of Object.entries(fieldCategories)) {
              if (info.fields.includes(field)) {
                return {
                  category,
                  ...info
                };
              }
            }
            return {
              category: "low",
              fields: [],
              points: "10",
              impact: "2%",
              color: "info",
              icon: "\u2728"
            };
          };
          const fieldInfo = getFieldInfo(rec.field);
          return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingSm", as: "h4", children: [
                    fieldInfo.icon,
                    " ",
                    rec.field.charAt(0).toUpperCase() + rec.field.slice(1).replace(/_/g, " ")
                  ] }, void 0, true, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2199,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: fieldInfo.color, size: "small", children: fieldInfo.category.charAt(0).toUpperCase() + fieldInfo.category.slice(1) }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2202,
                    columnNumber: 37
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2198,
                  columnNumber: 35
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { wrap: true, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "info", size: "small", children: [
                    "+",
                    fieldInfo.points,
                    " pts"
                  ] }, void 0, true, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2208,
                    columnNumber: 37
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "subdued", size: "small", children: [
                    "~",
                    fieldInfo.impact,
                    " impact"
                  ] }, void 0, true, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2211,
                    columnNumber: 37
                  }, this),
                  isApplied && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "success", size: "small", children: "\u{1F680} Applied" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2214,
                    columnNumber: 49
                  }, this),
                  !isApplied && isApproved && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "success", size: "small", children: "\u2705 Approved" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2215,
                    columnNumber: 64
                  }, this),
                  !isApplied && isRejected && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "critical", size: "small", children: "\u274C Rejected" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2216,
                    columnNumber: 64
                  }, this),
                  !isApplied && isPending && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "attention", size: "small", children: "\u23F3 Pending" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2217,
                    columnNumber: 63
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2207,
                  columnNumber: 35
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2197,
                columnNumber: 27
              }, this),
              !isApplied && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { size: "slim", onClick: () => handleToggleApproval(rec.field, false), variant: isRejected ? "primary" : "secondary", tone: isRejected ? "critical" : void 0, children: isRejected ? "\u274C Rejected" : "\u274C Reject" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2223,
                  columnNumber: 33
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { size: "slim", onClick: () => handleToggleApproval(rec.field, true), variant: isApproved ? "primary" : "secondary", tone: isApproved ? "success" : void 0, children: isApproved ? "\u2705 Approved" : "\u2705 Approve" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2227,
                  columnNumber: 33
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2222,
                columnNumber: 46
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2196,
              columnNumber: 31
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Current Value" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2239,
                    columnNumber: 39
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box, { padding: "200", borderRadius: "100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", as: "p", children: rec.originalValue || /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { tone: "subdued", as: "p", children: "(empty)" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2242,
                    columnNumber: 65
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2241,
                    columnNumber: 29
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2240,
                    columnNumber: 39
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2238,
                  columnNumber: 37
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "success", as: "p", children: "AI Recommendation" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2248,
                    columnNumber: 39
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box, { padding: "200", borderRadius: "100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", as: "p", children: rec.newValue }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2250,
                    columnNumber: 29
                  }, this) }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2249,
                    columnNumber: 39
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2247,
                  columnNumber: 37
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2237,
                columnNumber: 35
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                "\u{1F4A1} ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("em", { children: rec.improvement }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2258,
                  columnNumber: 40
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2257,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2236,
              columnNumber: 33
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2235,
              columnNumber: 31
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2194,
            columnNumber: 29
          }, this) }, index, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2193,
            columnNumber: 26
          }, this);
        }) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2136,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", as: "p", children: "Ready to apply your approved changes?" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2271,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
              recommendations.filter((rec) => rec.status !== "applied" && approvalState[rec.field] === true).length,
              " changes approved for application"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2274,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2270,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { onClick: () => setRecommendations([]), variant: "secondary", children: "Cancel" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2280,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: "primary", size: "large", onClick: handleApplyChanges, loading: isApplyingChanges, disabled: recommendations.filter((rec) => rec.status !== "applied" && approvalState[rec.field] === true).length === 0, children: isApplyingChanges ? "\u{1F680} Applying..." : `\u2705 Apply ${recommendations.filter((rec) => rec.status !== "applied" && approvalState[rec.field] === true).length} Changes` }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2284,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2279,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2269,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2268,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2083,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2082,
        columnNumber: 46
      }, this),
      selectedProduct.gaps.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { align: "space-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: "Manual Product Information" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2299,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: "Fill in product specs that only you know. These can't be generated by AI." }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2300,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2298,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { onClick: () => setCustomerInputOpen(!customerInputOpen), variant: "secondary", size: "slim", children: customerInputOpen ? "Hide Fields" : "Add Product Info" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2304,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2297,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Collapsible, { id: "customer-input-collapsible", open: customerInputOpen, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
          selectedProduct.gaps.filter((gap) => getFieldInputType(gap) === "customer_required").map((field, index) => {
            const label = FIELD_LABELS[field] || field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ");
            return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box, { children: [
              field === "dimensions" ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", as: "p", children: label }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2318,
                  columnNumber: 37
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { gap: "300", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(TextField, { label: "Length", value: customerInputData[`${field}_length`] || "", onChange: (value) => setCustomerInputData((prev) => ({
                    ...prev,
                    [`${field}_length`]: value
                  })), placeholder: "e.g., 12 inches", autoComplete: "off" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2320,
                    columnNumber: 39
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(TextField, { label: "Width", value: customerInputData[`${field}_width`] || "", onChange: (value) => setCustomerInputData((prev) => ({
                    ...prev,
                    [`${field}_width`]: value
                  })), placeholder: "e.g., 8 inches", autoComplete: "off" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2325,
                    columnNumber: 39
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(TextField, { label: "Height", value: customerInputData[`${field}_height`] || "", onChange: (value) => setCustomerInputData((prev) => ({
                    ...prev,
                    [`${field}_height`]: value
                  })), placeholder: "e.g., 4 inches", autoComplete: "off" }, void 0, false, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 2330,
                    columnNumber: 39
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2319,
                  columnNumber: 37
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2317,
                columnNumber: 59
              }, this) : field === "gender" ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Select, { label, options: [{
                label: "Select target gender",
                value: ""
              }, {
                label: "Male",
                value: "male"
              }, {
                label: "Female",
                value: "female"
              }, {
                label: "Unisex",
                value: "unisex"
              }, {
                label: "Kids",
                value: "kids"
              }], value: customerInputData[field] || "", onChange: (value) => setCustomerInputData((prev) => ({
                ...prev,
                [field]: value
              })) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2336,
                columnNumber: 72
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(TextField, { label, value: customerInputData[field] || "", onChange: (value) => setCustomerInputData((prev) => ({
                ...prev,
                [field]: value
              })), placeholder: getFieldPlaceholder(field), helpText: getFieldHelpText(field), multiline: field === "specifications" || field === "warranty" || field === "return_policy", autoComplete: "off" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2354,
                columnNumber: 33
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box, { paddingBlockStart: "200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { gap: "200", blockAlign: "center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "subdued", as: "p", children: [
                  "Impact: +",
                  getFieldPoints(field),
                  " points, ~",
                  getFieldImpact(field),
                  "% health boost"
                ] }, void 0, true, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2362,
                  columnNumber: 37
                }, this),
                customerInputData[field] && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Badge, { tone: "success", size: "small", children: "\u2705 Ready to save" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 2365,
                  columnNumber: 66
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2361,
                columnNumber: 35
              }, this) }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 2360,
                columnNumber: 33
              }, this)
            ] }, index, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2315,
              columnNumber: 28
            }, this);
          }),
          Object.keys(customerInputData).length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(InlineStack, { align: "end", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { onClick: () => setCustomerInputData({}), children: "Clear All" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2373,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Button, { variant: "primary", onClick: handleSaveCustomerInput, loading: isSavingCustomerInput, children: [
              "Save ",
              Object.values(customerInputData).filter((v) => v.trim()).length,
              " Fields"
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 2376,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 2372,
            columnNumber: 71
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2311,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2310,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2296,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2295,
        columnNumber: 51
      }, this),
      selectedProduct.score >= 90 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(BlockStack, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "headingMd", as: "h3", children: selectedProduct.score === 100 ? "\u{1F389} Perfect Product Health!" : "\u2705 Product Health: Excellent" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2388,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { as: "p", children: selectedProduct.score === 100 ? "Congratulations! This product has achieved perfect health with all OpenAI spec requirements met." : "This product has a high health score and does not need immediate attention." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2391,
          columnNumber: 21
        }, this),
        selectedProduct.gaps.length === 0 && selectedProduct.score === 100 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Text, { variant: "bodySm", tone: "success", as: "p", children: "\u{1F680} Ready for OpenAI ChatGPT discovery!" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 2394,
          columnNumber: 92
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2387,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 2386,
        columnNumber: 47
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 1883,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 1882,
      columnNumber: 31
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 1877,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 1498,
    columnNumber: 10
  }, this);
}
_s2(Index, "8bDs+k1udq0yZzmTuENaMgTLpPU=", false, function() {
  return [useLoaderData, useFetcher, useFetcher, useFetcher, useFetcher];
});
_c2 = Index;
var _c2;
$RefreshReg$(_c2, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-7Z7WR2DX.js.map
