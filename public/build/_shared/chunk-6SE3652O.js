import {
  require_react_dom
} from "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement2(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement2(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge2(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge2;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge2;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge2(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge2.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge2(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge2;
    module.exports = deepmerge_1;
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal2 = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal2;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text2) {
        var message = "Warning: " + text2;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values2, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values2, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text2) {
        var message = "Warning: " + text2;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement5, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement5(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement5(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        var it;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b.get(i.value[0])))
              return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i])
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function")
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function")
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        if (hasElementType && a instanceof Element)
          return false;
        for (i = length; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual3(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
var import_react20 = __toESM(require_react());

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/breakpoints.mjs
var breakpointsAliases = ["xs", "sm", "md", "lg", "xl"];
var breakpoints = {
  "breakpoints-xs": {
    value: "0px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-sm": {
    value: "490px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-md": {
    value: "768px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-lg": {
    value: "1040px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-xl": {
    value: "1440px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/_virtual/_rollupPluginBabelHelpers.mjs
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  strings.raw = raw;
  return strings;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@shopify/polaris-tokens/dist/esm/src/utils.mjs
var _templateObject;
var BASE_FONT_SIZE = 16;
var UNIT_PX = "px";
var UNIT_EM = "em";
var UNIT_REM = "rem";
var DIGIT_REGEX = new RegExp(String.raw(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["-?d+(?:.d+|d*)"], ["-?\\d+(?:\\.\\d+|\\d*)"]))));
var UNIT_REGEX = new RegExp(UNIT_PX + "|" + UNIT_EM + "|" + UNIT_REM);
function getUnit(value) {
  if (value === void 0) {
    value = "";
  }
  var unit = value.match(new RegExp(DIGIT_REGEX.source + "(" + UNIT_REGEX.source + ")"));
  return unit && unit[1];
}
function toPx(value) {
  if (value === void 0) {
    value = "";
  }
  var unit = getUnit(value);
  if (!unit)
    return value;
  if (unit === UNIT_PX) {
    return value;
  }
  if (unit === UNIT_EM || unit === UNIT_REM) {
    return "" + parseFloat(value) * BASE_FONT_SIZE + UNIT_PX;
  }
}
function toEm(value, fontSize) {
  if (value === void 0) {
    value = "";
  }
  if (fontSize === void 0) {
    fontSize = BASE_FONT_SIZE;
  }
  var unit = getUnit(value);
  if (!unit)
    return value;
  if (unit === UNIT_EM) {
    return value;
  }
  if (unit === UNIT_PX) {
    return "" + parseFloat(value) / fontSize + UNIT_EM;
  }
  if (unit === UNIT_REM) {
    return "" + parseFloat(value) * BASE_FONT_SIZE / fontSize + UNIT_EM;
  }
}
function toRem(value) {
  if (value === void 0) {
    value = "";
  }
  var unit = getUnit(value);
  if (!unit)
    return value;
  if (unit === UNIT_REM) {
    return value;
  }
  if (unit === UNIT_EM) {
    return "" + parseFloat(value) + UNIT_REM;
  }
  if (unit === UNIT_PX) {
    return "" + parseFloat(value) / BASE_FONT_SIZE + UNIT_REM;
  }
}
function rem(value) {
  return value.replace(new RegExp(DIGIT_REGEX.source + "(" + UNIT_PX + ")", "g"), function(px) {
    var _toRem;
    return (_toRem = toRem(px)) != null ? _toRem : px;
  });
}
function tokenGroupToRems(metaTokenGroup) {
  return Object.fromEntries(
    Object.entries(metaTokenGroup).map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), tokenName = _ref2[0], tokenProperties = _ref2[1];
      return [tokenName, Object.assign(Object.assign({}, tokenProperties), {}, {
        value: rem(tokenProperties.value)
      })];
    })
    // We loose the `metaTokenGroup` inference after transforming the object with
    // `Object.fromEntries()` and `Object.entries()`. Thus, we cast the result
    // back to `T` since we are simply converting the `value` from px to rem.
  );
}
function createVarName(tokenName) {
  return "--p-" + tokenName;
}
function createVar(tokenName) {
  return "var(" + createVarName(tokenName) + ")";
}
function getTokenNames(theme) {
  return Object.values(theme).flatMap(function(tokenGroup) {
    return Object.keys(tokenGroup);
  });
}
function getMediaConditions(breakpoints2) {
  var breakpointEntries = Object.entries(breakpoints2);
  var lastBreakpointIndex = breakpointEntries.length - 1;
  return Object.fromEntries(breakpointEntries.map(function(entry, index) {
    var _ref3 = entry, _ref4 = _slicedToArray(_ref3, 2), breakpointsTokenName = _ref4[0], breakpoint = _ref4[1];
    var upMediaCondition = getUpMediaCondition(breakpoint);
    var downMediaCondition = getDownMediaCondition(breakpoint);
    var onlyMediaCondition = index === lastBreakpointIndex ? upMediaCondition : upMediaCondition + " and " + getDownMediaCondition(breakpointEntries[index + 1][1]);
    return [breakpointsTokenName, {
      // Media condition for the current breakpoint and up
      up: upMediaCondition,
      // Media condition for current breakpoint and down
      down: downMediaCondition,
      // Media condition for only the current breakpoint
      only: onlyMediaCondition
    }];
  }));
}
function getUpMediaCondition(breakpoint) {
  return "(min-width: " + toEm(breakpoint) + ")";
}
function getDownMediaCondition(breakpoint) {
  var _toPx2;
  var offsetBreakpoint = parseFloat((_toPx2 = toPx(breakpoint)) != null ? _toPx2 : "") - 0.04;
  return "(max-width: " + toEm(offsetBreakpoint + "px") + ")";
}
var tokenGroupNamesToRems = ["border", "breakpoints", "font", "height", "shadow", "space", "text", "width"];
function createMetaThemeBase(metaTheme) {
  return Object.fromEntries(Object.entries(metaTheme).map(function(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2), tokenGroupName = _ref6[0], tokenGroup = _ref6[1];
    return [tokenGroupName, tokenGroupNamesToRems.includes(tokenGroupName) ? tokenGroupToRems(tokenGroup) : tokenGroup];
  }));
}

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/utils.mjs
var import_deepmerge = __toESM(require_cjs(), 1);

// node_modules/@shopify/polaris-tokens/dist/esm/src/size.mjs
var size = {
  "0": "0px",
  "0165": "0.66px",
  "025": "1px",
  "050": "2px",
  "100": "4px",
  "150": "6px",
  "200": "8px",
  "275": "11px",
  "300": "12px",
  "325": "13px",
  "350": "14px",
  "400": "16px",
  "450": "18px",
  "500": "20px",
  "550": "22px",
  "600": "24px",
  "700": "28px",
  "750": "30px",
  "800": "32px",
  "900": "36px",
  "1000": "40px",
  "1200": "48px",
  "1600": "64px",
  "2000": "80px",
  "2400": "96px",
  "2800": "112px",
  "3200": "128px"
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/border.mjs
var border = {
  "border-radius-0": {
    value: size[0]
  },
  "border-radius-050": {
    value: size["050"]
  },
  "border-radius-100": {
    value: size[100]
  },
  "border-radius-150": {
    value: size[150]
  },
  "border-radius-200": {
    value: size[200]
  },
  "border-radius-300": {
    value: size[300]
  },
  "border-radius-400": {
    value: size[400]
  },
  "border-radius-500": {
    value: size[500]
  },
  "border-radius-750": {
    value: size[750]
  },
  "border-radius-full": {
    value: "9999px"
  },
  "border-width-0": {
    value: size["0"]
  },
  "border-width-0165": {
    value: size["0165"]
  },
  "border-width-025": {
    value: size["025"]
  },
  "border-width-050": {
    value: size["050"]
  },
  "border-width-100": {
    value: size[100]
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/colors.mjs
var gray = {
  1: "rgba(255, 255, 255, 1)",
  2: "rgba(253, 253, 253, 1)",
  3: "rgba(250, 250, 250, 1)",
  4: "rgba(247, 247, 247, 1)",
  5: "rgba(243, 243, 243, 1)",
  6: "rgba(241, 241, 241, 1)",
  7: "rgba(235, 235, 235, 1)",
  8: "rgba(227, 227, 227, 1)",
  9: "rgba(212, 212, 212, 1)",
  10: "rgba(204, 204, 204, 1)",
  11: "rgba(181, 181, 181, 1)",
  12: "rgba(138, 138, 138, 1)",
  13: "rgba(97, 97, 97, 1)",
  14: "rgba(74, 74, 74, 1)",
  15: "rgba(48, 48, 48, 1)",
  16: "rgba(26, 26, 26, 1)"
};
var azure = {
  "1": "rgba(251, 253, 255, 1)",
  "2": "rgba(242, 249, 255, 1)",
  "3": "rgba(234, 244, 255, 1)",
  "4": "rgba(224, 240, 255, 1)",
  "5": "rgba(213, 235, 255, 1)",
  "6": "rgba(202, 230, 255, 1)",
  "7": "rgba(192, 225, 255, 1)",
  "8": "rgba(168, 216, 255, 1)",
  "9": "rgba(145, 208, 255, 1)",
  "10": "rgba(81, 192, 255, 1)",
  "11": "rgba(0, 148, 213, 1)",
  "12": "rgba(0, 124, 180, 1)",
  "13": "rgba(0, 103, 155, 1)",
  "14": "rgba(0, 82, 124, 1)",
  "15": "rgba(0, 58, 90, 1)",
  "16": "rgba(0, 33, 51, 1)"
};
var blue = {
  "1": "rgba(252, 253, 255, 1)",
  "2": "rgba(246, 248, 255, 1)",
  "3": "rgba(240, 242, 255, 1)",
  "4": "rgba(234, 237, 255, 1)",
  "5": "rgba(226, 231, 255, 1)",
  "6": "rgba(219, 225, 255, 1)",
  "7": "rgba(213, 220, 255, 1)",
  "8": "rgba(197, 208, 255, 1)",
  "9": "rgba(186, 199, 255, 1)",
  "10": "rgba(151, 173, 255, 1)",
  "11": "rgba(65, 136, 255, 1)",
  "12": "rgba(0, 113, 233, 1)",
  "13": "rgba(0, 91, 211, 1)",
  "14": "rgba(0, 66, 153, 1)",
  "15": "rgba(0, 46, 106, 1)",
  "16": "rgba(0, 22, 51, 1)"
};
var green = {
  "1": "rgba(248, 255, 251, 1)",
  "2": "rgba(227, 255, 237, 1)",
  "3": "rgba(205, 254, 225, 1)",
  "4": "rgba(180, 254, 210, 1)",
  "5": "rgba(146, 254, 194, 1)",
  "6": "rgba(99, 253, 176, 1)",
  "7": "rgba(56, 250, 163, 1)",
  "8": "rgba(53, 238, 155, 1)",
  "9": "rgba(50, 225, 147, 1)",
  "10": "rgba(46, 211, 137, 1)",
  "11": "rgba(50, 160, 110, 1)",
  "12": "rgba(41, 132, 90, 1)",
  "13": "rgba(19, 111, 69, 1)",
  "14": "rgba(12, 81, 50, 1)",
  "15": "rgba(8, 61, 37, 1)",
  "16": "rgba(9, 42, 27, 1)"
};
var lime = {
  "1": "rgba(250, 255, 250, 1)",
  "2": "rgba(228, 255, 229, 1)",
  "3": "rgba(208, 255, 209, 1)",
  "4": "rgba(187, 254, 190, 1)",
  "5": "rgba(157, 254, 160, 1)",
  "6": "rgba(119, 254, 122, 1)",
  "7": "rgba(56, 254, 62, 1)",
  "8": "rgba(40, 242, 47, 1)",
  "9": "rgba(37, 232, 43, 1)",
  "10": "rgba(32, 207, 39, 1)",
  "11": "rgba(24, 168, 29, 1)",
  "12": "rgba(17, 135, 21, 1)",
  "13": "rgba(12, 113, 15, 1)",
  "14": "rgba(11, 85, 13, 1)",
  "15": "rgba(3, 61, 5, 1)",
  "16": "rgba(3, 33, 4, 1)"
};
var magenta = {
  "1": "rgba(255, 253, 255, 1)",
  "2": "rgba(255, 245, 255, 1)",
  "3": "rgba(253, 239, 253, 1)",
  "4": "rgba(254, 231, 254, 1)",
  "5": "rgba(252, 223, 252, 1)",
  "6": "rgba(251, 215, 251, 1)",
  "7": "rgba(251, 207, 251, 1)",
  "8": "rgba(249, 190, 249, 1)",
  "9": "rgba(248, 177, 248, 1)",
  "10": "rgba(246, 141, 246, 1)",
  "11": "rgba(225, 86, 225, 1)",
  "12": "rgba(197, 48, 197, 1)",
  "13": "rgba(159, 38, 159, 1)",
  "14": "rgba(121, 26, 121, 1)",
  "15": "rgba(86, 16, 86, 1)",
  "16": "rgba(52, 6, 52, 1)"
};
var orange = {
  "1": "rgba(255, 253, 250, 1)",
  "2": "rgba(255, 247, 238, 1)",
  "3": "rgba(255, 241, 227, 1)",
  "4": "rgba(255, 235, 213, 1)",
  "5": "rgba(255, 228, 198, 1)",
  "6": "rgba(255, 221, 182, 1)",
  "7": "rgba(255, 214, 164, 1)",
  "8": "rgba(255, 200, 121, 1)",
  "9": "rgba(255, 184, 0, 1)",
  "10": "rgba(229, 165, 0, 1)",
  "11": "rgba(178, 132, 0, 1)",
  "12": "rgba(149, 111, 0, 1)",
  "13": "rgba(124, 88, 0, 1)",
  "14": "rgba(94, 66, 0, 1)",
  "15": "rgba(65, 45, 0, 1)",
  "16": "rgba(37, 26, 0, 1)"
};
var purple = {
  "1": "rgba(253, 253, 255, 1)",
  "2": "rgba(248, 247, 255, 1)",
  "3": "rgba(243, 241, 255, 1)",
  "4": "rgba(239, 236, 255, 1)",
  "5": "rgba(233, 229, 255, 1)",
  "6": "rgba(228, 222, 255, 1)",
  "7": "rgba(223, 217, 255, 1)",
  "8": "rgba(212, 204, 255, 1)",
  "9": "rgba(199, 188, 255, 1)",
  "10": "rgba(170, 149, 255, 1)",
  "11": "rgba(148, 116, 255, 1)",
  "12": "rgba(128, 81, 255, 1)",
  "13": "rgba(113, 38, 255, 1)",
  "14": "rgba(87, 0, 209, 1)",
  "15": "rgba(59, 0, 147, 1)",
  "16": "rgba(28, 0, 79, 1)"
};
var red = {
  "1": "rgba(255, 251, 251, 1)",
  "2": "rgba(255, 246, 246, 1)",
  "3": "rgba(255, 237, 236, 1)",
  "4": "rgba(254, 233, 232, 1)",
  "5": "rgba(254, 226, 225, 1)",
  "6": "rgba(254, 218, 217, 1)",
  "7": "rgba(254, 211, 209, 1)",
  "8": "rgba(254, 195, 193, 1)",
  "9": "rgba(253, 176, 172, 1)",
  "10": "rgba(253, 129, 122, 1)",
  "11": "rgba(239, 77, 47, 1)",
  "12": "rgba(229, 28, 0, 1)",
  "13": "rgba(181, 38, 11, 1)",
  "14": "rgba(142, 31, 11, 1)",
  "15": "rgba(95, 21, 7, 1)",
  "16": "rgba(47, 10, 4, 1)"
};
var rose = {
  "1": "rgba(255, 253, 253, 1)",
  "2": "rgba(255, 246, 248, 1)",
  "3": "rgba(255, 239, 243, 1)",
  "4": "rgba(255, 232, 238, 1)",
  "5": "rgba(255, 225, 232, 1)",
  "6": "rgba(255, 217, 227, 1)",
  "7": "rgba(254, 209, 221, 1)",
  "8": "rgba(254, 193, 210, 1)",
  "9": "rgba(254, 181, 202, 1)",
  "10": "rgba(254, 142, 177, 1)",
  "11": "rgba(253, 75, 146, 1)",
  "12": "rgba(227, 12, 118, 1)",
  "13": "rgba(185, 7, 95, 1)",
  "14": "rgba(141, 4, 72, 1)",
  "15": "rgba(100, 2, 49, 1)",
  "16": "rgba(62, 1, 28, 1)"
};
var teal = {
  "1": "rgba(248, 255, 254, 1)",
  "2": "rgba(232, 252, 250, 1)",
  "3": "rgba(215, 250, 247, 1)",
  "4": "rgba(195, 247, 242, 1)",
  "5": "rgba(170, 246, 239, 1)",
  "6": "rgba(137, 245, 236, 1)",
  "7": "rgba(112, 240, 229, 1)",
  "8": "rgba(90, 230, 219, 1)",
  "9": "rgba(44, 224, 212, 1)",
  "10": "rgba(30, 199, 188, 1)",
  "11": "rgba(0, 161, 152, 1)",
  "12": "rgba(18, 131, 124, 1)",
  "13": "rgba(12, 106, 100, 1)",
  "14": "rgba(12, 83, 79, 1)",
  "15": "rgba(3, 60, 57, 1)",
  "16": "rgba(6, 44, 41, 1)"
};
var yellow = {
  "1": "rgba(255, 253, 246, 1)",
  "2": "rgba(255, 248, 219, 1)",
  "3": "rgba(255, 244, 191, 1)",
  "4": "rgba(255, 239, 157, 1)",
  "5": "rgba(255, 235, 120, 1)",
  "6": "rgba(255, 230, 0, 1)",
  "7": "rgba(247, 223, 0, 1)",
  "8": "rgba(234, 211, 0, 1)",
  "9": "rgba(225, 203, 0, 1)",
  "10": "rgba(197, 178, 0, 1)",
  "11": "rgba(153, 138, 0, 1)",
  "12": "rgba(130, 117, 0, 1)",
  "13": "rgba(105, 95, 0, 1)",
  "14": "rgba(79, 71, 0, 1)",
  "15": "rgba(51, 46, 0, 1)",
  "16": "rgba(31, 28, 0, 1)"
};
var blackAlpha = {
  1: "rgba(0, 0, 0, 0)",
  2: "rgba(0, 0, 0, 0.01)",
  3: "rgba(0, 0, 0, 0.02)",
  4: "rgba(0, 0, 0, 0.03)",
  5: "rgba(0, 0, 0, 0.05)",
  6: "rgba(0, 0, 0, 0.06)",
  7: "rgba(0, 0, 0, 0.08)",
  8: "rgba(0, 0, 0, 0.11)",
  9: "rgba(0, 0, 0, 0.17)",
  10: "rgba(0, 0, 0, 0.20)",
  11: "rgba(0, 0, 0, 0.29)",
  12: "rgba(0, 0, 0, 0.46)",
  13: "rgba(0, 0, 0, 0.62)",
  14: "rgba(0, 0, 0, 0.71)",
  15: "rgba(0, 0, 0, 0.81)",
  16: "rgba(0, 0, 0, 0.90)"
};
var whiteAlpha = {
  1: "rgba(255, 255, 255, 0)",
  2: "rgba(255, 255, 255, 0.01)",
  3: "rgba(255, 255, 255, 0.02)",
  4: "rgba(255, 255, 255, 0.03)",
  5: "rgba(255, 255, 255, 0.05)",
  6: "rgba(255, 255, 255, 0.06)",
  7: "rgba(255, 255, 255, 0.08)",
  8: "rgba(255, 255, 255, 0.11)",
  9: "rgba(255, 255, 255, 0.17)",
  10: "rgba(255, 255, 255, 0.20)",
  11: "rgba(255, 255, 255, 0.28)",
  12: "rgba(255, 255, 255, 0.46)",
  13: "rgba(255, 255, 255, 0.62)",
  14: "rgba(255, 255, 255, 0.71)",
  15: "rgba(255, 255, 255, 0.81)",
  16: "rgba(255, 255, 255, 0.90)"
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/color.mjs
var color = {
  "color-scheme": {
    value: "light"
  },
  "color-bg": {
    value: gray[6],
    description: "The default background color of the admin."
  },
  "color-bg-inverse": {
    value: gray[16],
    description: "Use for high contrast page or component backgrounds."
  },
  "color-bg-surface": {
    value: gray[1],
    description: "The background color for elements with the highest level of prominence, like a card."
  },
  "color-bg-surface-hover": {
    value: gray[4],
    description: "The hover state color for elements with the highest level of prominence."
  },
  "color-bg-surface-active": {
    value: gray[5],
    description: "The active state (on press) color for elements with the highest level of prominence."
  },
  "color-bg-surface-selected": {
    value: gray[6],
    description: "The selected state color for elements with the highest level of prominence."
  },
  "color-bg-surface-disabled": {
    value: blackAlpha[5],
    description: "The disabled state color for elements."
  },
  "color-bg-surface-secondary": {
    value: gray[4],
    description: "The background color for elements with a secondary level of prominence."
  },
  "color-bg-surface-secondary-hover": {
    value: gray[6],
    description: "The hover state color for elements with a secondary level of prominence."
  },
  "color-bg-surface-secondary-active": {
    value: gray[7],
    description: "The active state (on press) color for elements with a secondary level of prominence."
  },
  "color-bg-surface-secondary-selected": {
    value: gray[7],
    description: "The selected state color for elements with a secondary level of prominence."
  },
  "color-bg-surface-tertiary": {
    value: gray[5],
    description: "The background color for elements with a third level of prominence."
  },
  "color-bg-surface-tertiary-hover": {
    value: gray[7],
    description: "The hover state color for elements with a third level of prominence."
  },
  "color-bg-surface-tertiary-active": {
    value: gray[8],
    description: "The active state (on press) color for elements with a third level of prominence."
  },
  "color-bg-surface-brand": {
    value: gray[8],
    description: "Use to apply the key color to elements."
  },
  "color-bg-surface-brand-hover": {
    value: gray[7],
    description: "The hover state color for key elements."
  },
  "color-bg-surface-brand-active": {
    value: gray[6],
    description: "The active state (on press) color for key elements."
  },
  "color-bg-surface-brand-selected": {
    value: gray[6],
    description: "The selected state color for key elements."
  },
  "color-bg-surface-info": {
    value: azure[3],
    description: "Use for backgrounds communicating important information, like banners."
  },
  "color-bg-surface-info-hover": {
    value: azure[4],
    description: "The hover state color for communicating important information."
  },
  "color-bg-surface-info-active": {
    value: azure[6],
    description: "The active state (on press) color for communicating important information."
  },
  "color-bg-surface-success": {
    value: green[3],
    description: "Use for backgrounds communicating success, like banners."
  },
  "color-bg-surface-success-hover": {
    value: green[4],
    description: "The hover state color for communicating success."
  },
  "color-bg-surface-success-active": {
    value: green[5],
    description: "The active state (on press) color for communicating success."
  },
  "color-bg-surface-caution": {
    value: yellow[2],
    description: "Use for backgrounds communicating caution, like banners."
  },
  "color-bg-surface-caution-hover": {
    value: yellow[3],
    description: "The hover state for communicating caution."
  },
  "color-bg-surface-caution-active": {
    value: yellow[4],
    description: "The active state (on press) color for communicating caution."
  },
  "color-bg-surface-warning": {
    value: orange[3],
    description: "Use for backgrounds communicating warning, like banners."
  },
  "color-bg-surface-warning-hover": {
    value: orange[4],
    description: "The hover state color for communicating warning."
  },
  "color-bg-surface-warning-active": {
    value: orange[5],
    description: "The active state (on press) color for communicating warning."
  },
  "color-bg-surface-critical": {
    value: red[4],
    description: "Use for backgrounds communicating critical information, like banners or input errors."
  },
  "color-bg-surface-critical-hover": {
    value: red[5],
    description: "The hover state color for communicating critical information."
  },
  "color-bg-surface-critical-active": {
    value: red[6],
    description: "The active state (on press) color for communicating critical information."
  },
  "color-bg-surface-emphasis": {
    value: blue[3],
    description: "Use for backgrounds indicating areas of focus in editors, such as the theme editor."
  },
  "color-bg-surface-emphasis-hover": {
    value: blue[4],
    description: "The hover state color for elements indicating areas of focus in editors."
  },
  "color-bg-surface-emphasis-active": {
    value: blue[5],
    description: "The active state (on press) color for elements indicating areas of focus in editors."
  },
  "color-bg-surface-magic": {
    value: purple[2],
    description: "Use for backgrounds of elements suggested by magic AI."
  },
  "color-bg-surface-magic-hover": {
    value: purple[3],
    description: "The hover state color for elements suggested by magic AI."
  },
  "color-bg-surface-magic-active": {
    value: purple[5],
    description: "The active state (on press) color for elements suggested by magic AI."
  },
  "color-bg-surface-inverse": {
    value: gray[15],
    description: "Use for elements on bg-inverse."
  },
  "color-bg-surface-transparent": {
    value: blackAlpha[1],
    description: "Use for elements that need a fully transparent background."
  },
  "color-bg-fill": {
    value: gray[1],
    description: "The background color of contained elements with a smaller surface area, like a button."
  },
  "color-bg-fill-hover": {
    value: gray[3],
    description: "The hover state color of contained elements with a smaller surface area, like a button."
  },
  "color-bg-fill-active": {
    value: gray[4],
    description: "The active state (on press) color of contained elements with a smaller surface area, like a button."
  },
  "color-bg-fill-selected": {
    value: gray[10],
    description: "The selected state color of contained elements with a smaller surface area, like a button or checkbox."
  },
  "color-bg-fill-disabled": {
    value: blackAlpha[5],
    description: "The disabled state color of contained elements with a smaller surface area, like a button."
  },
  "color-bg-fill-secondary": {
    value: gray[6],
    description: "The background color of elements with a smaller surface area and a secondary level of prominence."
  },
  "color-bg-fill-secondary-hover": {
    value: gray[7],
    description: "The hover state color of elements with a smaller surface area and a secondary level of prominence."
  },
  "color-bg-fill-secondary-active": {
    value: gray[8],
    description: "The active state (on press) color of elements with a smaller surface area and a secondary level of prominence."
  },
  "color-bg-fill-tertiary": {
    value: gray[8],
    description: "The background color of elements with a smaller surface area and a third level of prominence."
  },
  "color-bg-fill-tertiary-hover": {
    value: gray[9],
    description: "The hover state color of elements with a smaller surface area and a third level of prominence."
  },
  "color-bg-fill-tertiary-active": {
    value: gray[10],
    description: "The active state (on press) color of elements with a smaller surface area and a third level of prominence."
  },
  "color-bg-fill-brand": {
    value: gray[15],
    description: "The background color of main actions, like primary buttons."
  },
  "color-bg-fill-brand-hover": {
    value: gray[16],
    description: "The hover state color of main actions, like primary buttons."
  },
  "color-bg-fill-brand-active": {
    value: gray[16],
    description: "The active state (on press) color of main actions, like primary buttons."
  },
  "color-bg-fill-brand-selected": {
    value: gray[15],
    description: "The selected state color of main actions, like primary buttons."
  },
  "color-bg-fill-brand-disabled": {
    value: blackAlpha[9],
    description: "The disabled state color of main actions, like primary buttons."
  },
  "color-bg-fill-info": {
    value: azure[9],
    description: "Use for backgrounds communicating important information on elements with a smaller surface area, like a badge or button."
  },
  "color-bg-fill-info-hover": {
    value: azure[10],
    description: "The hover state color for communicating important information on elements with a smaller surface area."
  },
  "color-bg-fill-info-active": {
    value: azure[11],
    description: "The active state (on press) color for communicating important information on elements with a smaller surface area."
  },
  "color-bg-fill-info-secondary": {
    value: azure[5],
    description: "Use for backgrounds communicating important information on elements with a smaller surface area, with a secondary level of prominence."
  },
  "color-bg-fill-success": {
    value: green[12],
    description: "Use for backgrounds communicating success on elements with a smaller surface area, like a badge or a banner."
  },
  "color-bg-fill-success-hover": {
    value: green[13],
    description: "The hover state color for communicating success on elements with a smaller surface area."
  },
  "color-bg-fill-success-active": {
    value: green[14],
    description: "The active state (on press) color for communicating success on elements with a smaller surface area."
  },
  "color-bg-fill-success-secondary": {
    value: green[4],
    description: "Use for backgrounds communicating success on elements with a smaller surface area, with a secondary level of prominence."
  },
  "color-bg-fill-warning": {
    value: orange[9],
    description: "Use for backgrounds communicating warning on elements with a smaller surface area, like a badge or a banner."
  },
  "color-bg-fill-warning-hover": {
    value: orange[10],
    description: "The hover state color for communicating warning on elements with a smaller surface area."
  },
  "color-bg-fill-warning-active": {
    value: orange[11],
    description: "The active state (on press) color for communicating warning on elements with a smaller surface area."
  },
  "color-bg-fill-warning-secondary": {
    value: orange[7],
    description: "Use for backgrounds communicating warning on elements with a smaller surface area, with a secondary level of prominence."
  },
  "color-bg-fill-caution": {
    value: yellow[6],
    description: "Use for backgrounds communicating caution on elements with a smaller surface area, like a badge or a banner."
  },
  "color-bg-fill-caution-hover": {
    value: yellow[8],
    description: "The hover state color for communicating caution on elements with a smaller surface area."
  },
  "color-bg-fill-caution-active": {
    value: yellow[9],
    description: "The active state (on press) color for communicating caution on elements with a smaller surface area."
  },
  "color-bg-fill-caution-secondary": {
    value: yellow[5],
    description: "Use for backgrounds communicating caution on elements with a smaller surface area, with a secondary level of prominence."
  },
  "color-bg-fill-critical": {
    value: red[12],
    description: "Use for backgrounds communicating critical information on elements with a smaller surface area, like a badge or a banner."
  },
  "color-bg-fill-critical-hover": {
    value: red[13],
    description: "The hover state color for communicating critical information on elements with a smaller surface area."
  },
  "color-bg-fill-critical-active": {
    value: red[14],
    description: "The active state (on press) color for communicating critical information on elements with a smaller surface area."
  },
  "color-bg-fill-critical-selected": {
    value: red[14],
    description: "The selected state color for communicating critical information on elements with a smaller surface area."
  },
  "color-bg-fill-critical-secondary": {
    value: red[7],
    description: "Use for backgrounds communicating critical information on elements with a smaller surface area, with a secondary level of prominence."
  },
  "color-bg-fill-emphasis": {
    value: blue[13],
    description: "Use for backgrounds indicating areas of focus in editors on elements with a smaller surface area, like a button or a badge."
  },
  "color-bg-fill-emphasis-hover": {
    value: blue[14],
    description: "The hover state color for indicating areas of focus in editors on elements with a smaller surface area."
  },
  "color-bg-fill-emphasis-active": {
    value: blue[15],
    description: "The active state (on press) color for indicating areas of focus in editors on elements with a smaller surface area."
  },
  "color-bg-fill-magic": {
    value: purple[12],
    description: "The background color of elements suggested by magic AI, like a badge or a banner."
  },
  "color-bg-fill-magic-secondary": {
    value: purple[5],
    description: "The background color of elements suggested by magic AI, with a secondary level of prominence."
  },
  "color-bg-fill-magic-secondary-hover": {
    value: purple[6],
    description: "The hover state color of elements suggested by magic AI, with a secondary level of prominence."
  },
  "color-bg-fill-magic-secondary-active": {
    value: purple[7],
    description: "The active state (on press) color of elements suggested by magic AI, with a secondary level of prominence."
  },
  "color-bg-fill-inverse": {
    value: gray[15],
    description: "The background color of elements with a smaller surface area on an inverse background."
  },
  "color-bg-fill-inverse-hover": {
    value: gray[14],
    description: "The hover state color of elements with a smaller surface area on an inverse background."
  },
  "color-bg-fill-inverse-active": {
    value: gray[13],
    description: "The active state (on press) color of elements with a smaller surface area on an inverse background."
  },
  "color-bg-fill-transparent": {
    value: blackAlpha[3],
    description: "The background color of elements that need to sit on different background colors, like tabs."
  },
  "color-bg-fill-transparent-hover": {
    value: blackAlpha[5],
    description: "The hover state color of elements that need to sit on different background colors, like tabs."
  },
  "color-bg-fill-transparent-active": {
    value: blackAlpha[7],
    description: "The active state (on press) color of elements that need to sit on different background colors, like tabs."
  },
  "color-bg-fill-transparent-selected": {
    value: blackAlpha[7],
    description: "The selected state color of elements that need to sit on different background colors, like tabs."
  },
  "color-bg-fill-transparent-secondary": {
    value: blackAlpha[6],
    description: "The background color of elements that need to sit on different background colors, with a secondary level of prominence."
  },
  "color-bg-fill-transparent-secondary-hover": {
    value: blackAlpha[7],
    description: "The hover state color of elements that need to sit on different background colors, with a secondary level of prominence."
  },
  "color-bg-fill-transparent-secondary-active": {
    value: blackAlpha[8],
    description: "The active state (on press) color of elements that need to sit on different background colors, with a secondary level of prominence."
  },
  "color-text": {
    value: gray[15],
    description: "The default text color."
  },
  "color-text-secondary": {
    value: gray[13],
    description: "Use for text with a secondary level of prominence."
  },
  "color-text-disabled": {
    value: gray[11],
    description: "Use for text in a disabled state."
  },
  "color-text-link": {
    value: blue[13],
    description: "Use for text links."
  },
  "color-text-link-hover": {
    value: blue[14],
    description: "The hover state color for text links."
  },
  "color-text-link-active": {
    value: blue[15],
    description: "The active state (on press) color for text links."
  },
  "color-text-brand": {
    value: gray[14],
    description: "Use for text that needs to pull attention."
  },
  "color-text-brand-hover": {
    value: gray[15],
    description: "The hover state color for text that needs to pull attention."
  },
  "color-text-brand-on-bg-fill": {
    value: gray[1],
    description: "Use for text on bg-fill-brand, like primary buttons."
  },
  "color-text-brand-on-bg-fill-hover": {
    value: gray[8],
    description: "The hover state color for text on bg-fill-brand-hover."
  },
  "color-text-brand-on-bg-fill-active": {
    value: gray[10],
    description: "The active state (on press) color for text on bg-fill-brand."
  },
  "color-text-brand-on-bg-fill-disabled": {
    value: gray[1],
    description: "The disabled state color for text on bg-fill-brand-disabled."
  },
  "color-text-info": {
    value: azure[15],
    description: "Use for text communicating important information."
  },
  "color-text-info-hover": {
    value: azure[15],
    description: "The hover state color for text communicating important information."
  },
  "color-text-info-active": {
    value: azure[16],
    description: "The active state (on press) color for text communicating important information."
  },
  "color-text-info-secondary": {
    value: azure[12],
    description: "Use for text communicating important information with a secondary level of prominence."
  },
  "color-text-info-on-bg-fill": {
    value: azure[16],
    description: "Use for text and icons on bg-fill-info."
  },
  "color-text-success": {
    value: green[14],
    description: "Use for text communicating success."
  },
  "color-text-success-hover": {
    value: green[15],
    description: "The hover state color for text communicating success."
  },
  "color-text-success-active": {
    value: green[16],
    description: "The active state (on press) color for text communicating success."
  },
  "color-text-success-secondary": {
    value: green[12],
    description: "Use for text communicating success with a secondary level of prominence."
  },
  "color-text-success-on-bg-fill": {
    value: green[1],
    description: "Use for text and icons on bg-fill-success."
  },
  "color-text-caution": {
    value: yellow[14],
    description: "Use for text communicating caution."
  },
  "color-text-caution-hover": {
    value: yellow[15],
    description: "The hover state color for text communicating caution."
  },
  "color-text-caution-active": {
    value: yellow[16],
    description: "The active state (on press) color for text communicating caution."
  },
  "color-text-caution-secondary": {
    value: yellow[12],
    description: "Use for text communicating caution with a secondary level of prominence."
  },
  "color-text-caution-on-bg-fill": {
    value: yellow[15],
    description: "Use for text and icons on bg-fill-caution."
  },
  "color-text-warning": {
    value: orange[14],
    description: "Use for text communicating warning."
  },
  "color-text-warning-hover": {
    value: orange[15],
    description: "The hover state color for text communicating warning."
  },
  "color-text-warning-active": {
    value: orange[16],
    description: "The active state (on press) color for text communicating warning."
  },
  "color-text-warning-secondary": {
    value: orange[12],
    description: "Use for text communicating warning with a secondary level of prominence."
  },
  "color-text-warning-on-bg-fill": {
    value: orange[16],
    description: "Use for text and icons on bg-fill-warning."
  },
  "color-text-critical": {
    value: red[14],
    description: "Use for text communicating critical information."
  },
  "color-text-critical-hover": {
    value: red[15],
    description: "The hover state color for text communicating critical information."
  },
  "color-text-critical-active": {
    value: red[16],
    description: "The active state (on press) color for text communicating critical information."
  },
  "color-text-critical-secondary": {
    value: red[12],
    description: "Use for text communicating critical information with a secondary level of prominence."
  },
  "color-text-critical-on-bg-fill": {
    value: red[1],
    description: "Use for text and icons on bg-fill-critical."
  },
  "color-text-emphasis": {
    value: blue[13],
    description: "Use for text indicating areas of focus in editors, like the theme editor."
  },
  "color-text-emphasis-hover": {
    value: blue[14],
    description: "The hover state color for text indicating areas of focus."
  },
  "color-text-emphasis-active": {
    value: blue[15],
    description: "The active state (on press) color for text indicating areas of focus."
  },
  "color-text-emphasis-on-bg-fill": {
    value: blue[1],
    description: "Use for text and icons on bg-fill-emphasis."
  },
  "color-text-emphasis-on-bg-fill-hover": {
    value: blue[5],
    description: "Use for text and icons on bg-fill-emphasis-hover."
  },
  "color-text-emphasis-on-bg-fill-active": {
    value: blue[7],
    description: "Use for text and icons on bg-fill-emphasis-active."
  },
  "color-text-magic": {
    value: purple[14],
    description: "Use for text suggested by magic AI."
  },
  "color-text-magic-secondary": {
    value: purple[13],
    description: "Use for text suggested by magic AI with a secondary level of prominence."
  },
  "color-text-magic-on-bg-fill": {
    value: purple[1],
    description: "Use for text and icons on bg-fill-magic."
  },
  "color-text-inverse": {
    value: gray[8],
    description: "Use for text on an inverse background."
  },
  "color-text-inverse-secondary": {
    value: gray[11],
    description: "Use for secondary text on an inverse background."
  },
  "color-text-link-inverse": {
    value: blue[8],
    description: "Use for text links on an inverse background."
  },
  "color-border": {
    value: gray[8],
    description: "The default color for borders on any element."
  },
  "color-border-hover": {
    value: gray[10],
    description: "The hover color for borders on any element."
  },
  "color-border-disabled": {
    value: gray[7],
    description: "The disabled color for borders on any element."
  },
  "color-border-secondary": {
    value: gray[7],
    description: "The color for hr elements or any visual dividers."
  },
  "color-border-tertiary": {
    value: gray[10],
    description: "The border color on any element. Pair with bg-surface-tertiary or bg-fill-tertiary."
  },
  "color-border-focus": {
    value: blue[13],
    description: "The focus ring for any interactive element in a focused state."
  },
  "color-border-brand": {
    value: gray[8],
    description: "Use for borders paired with brand colors."
  },
  "color-border-info": {
    value: azure[8],
    description: "Use for borders communicating information."
  },
  "color-border-success": {
    value: green[5],
    description: "Use for borders communicating success."
  },
  "color-border-caution": {
    value: yellow[5],
    description: "Use for borders communicating caution."
  },
  "color-border-warning": {
    value: orange[8],
    description: "Use for borders communicating warning."
  },
  "color-border-critical": {
    value: red[8],
    description: "Use for borders communicating critical information."
  },
  "color-border-critical-secondary": {
    value: red[14],
    description: "Use for borders communicating critical information, such as borders on invalid text fields."
  },
  "color-border-emphasis": {
    value: blue[13],
    description: "Use for borders indicating areas of focus."
  },
  "color-border-emphasis-hover": {
    value: blue[14],
    description: "The hover state color for borders indicating areas of focus."
  },
  "color-border-emphasis-active": {
    value: blue[15],
    description: "The active state (on press) color for borders indicating areas of focus."
  },
  "color-border-magic": {
    value: purple[6],
    description: "Use for borders suggested by magic AI."
  },
  "color-border-magic-secondary": {
    value: purple[11],
    description: "Use for borders suggested by magic AI, such as borders on text fields."
  },
  "color-border-magic-secondary-hover": {
    value: purple[12],
    description: "Use for borders suggested by magic AI, such as borders on text fields."
  },
  "color-border-inverse": {
    value: gray[13],
    description: "Use for borders on an inverse background, such as borders on the global search."
  },
  "color-border-inverse-hover": {
    value: gray[10],
    description: "The hover state color for borders on an inverse background."
  },
  "color-border-inverse-active": {
    value: gray[8],
    description: "The active state (on press) color for borders on an inverse background."
  },
  "color-tooltip-tail-down-border-experimental": {
    value: gray[9],
    description: "The border color for tooltip tails pointing down."
  },
  "color-tooltip-tail-up-border-experimental": {
    value: gray[8],
    description: "The border color for tooltip tails pointing up."
  },
  "color-border-gradient-experimental": {
    value: "linear-gradient(to bottom, " + gray[7] + ", " + gray[10] + " 78%, " + gray[11] + ")"
  },
  "color-border-gradient-hover-experimental": {
    value: "linear-gradient(to bottom, " + gray[7] + ", " + gray[10] + " 78%, " + gray[11] + ")"
  },
  "color-border-gradient-selected-experimental": {
    value: "linear-gradient(to bottom, " + gray[7] + ", " + gray[10] + " 78%, " + gray[11] + ")"
  },
  "color-border-gradient-active-experimental": {
    value: "linear-gradient(to bottom, " + gray[7] + ", " + gray[10] + " 78%, " + gray[11] + ")"
  },
  "color-icon": {
    value: gray[14],
    description: "The default color for icons."
  },
  "color-icon-hover": {
    value: gray[15],
    description: "The hover state color for icons."
  },
  "color-icon-active": {
    value: gray[16],
    description: "The active state (on press) color for icons."
  },
  "color-icon-disabled": {
    value: gray[10],
    description: "The disabled state color for icons."
  },
  "color-icon-secondary": {
    value: gray[12],
    description: "Use for secondary icons."
  },
  "color-icon-secondary-hover": {
    value: gray[13],
    description: "The hover state color for secondary icons."
  },
  "color-icon-secondary-active": {
    value: gray[14],
    description: "The active state (on press) color for secondary icons."
  },
  "color-icon-brand": {
    value: gray[16],
    description: "Use for icons that need to pull more focus."
  },
  "color-icon-info": {
    value: azure[11],
    description: "Use for icons communicating information."
  },
  "color-icon-success": {
    value: green[12],
    description: "Use for icons communicating success."
  },
  "color-icon-caution": {
    value: yellow[11],
    description: "Use for icons communicating caution."
  },
  "color-icon-warning": {
    value: orange[11],
    description: "Use for icons communicating warning."
  },
  "color-icon-critical": {
    value: red[11],
    description: "Use for icons communicating critical information."
  },
  "color-icon-emphasis": {
    value: blue[13],
    description: "Use for icons indicating areas of focus in editors, like the theme editor."
  },
  "color-icon-emphasis-hover": {
    value: blue[14],
    description: "The hover color for icons indicating areas of focus in editors."
  },
  "color-icon-emphasis-active": {
    value: blue[15],
    description: "The active state (on press) color for icons indicating areas of focus in editors."
  },
  "color-icon-magic": {
    value: purple[12],
    description: "Use for icons suggested by magic AI."
  },
  "color-icon-inverse": {
    value: gray[8],
    description: "Use for icons on an inverse background."
  },
  "color-avatar-bg-fill": {
    value: gray[11]
  },
  "color-avatar-five-bg-fill": {
    value: rose[11]
  },
  "color-avatar-five-text-on-bg-fill": {
    value: rose[2]
  },
  "color-avatar-four-bg-fill": {
    value: azure[10]
  },
  "color-avatar-four-text-on-bg-fill": {
    value: azure[16]
  },
  "color-avatar-one-bg-fill": {
    value: magenta[12]
  },
  "color-avatar-one-text-on-bg-fill": {
    value: magenta[3]
  },
  "color-avatar-seven-bg-fill": {
    value: purple[11]
  },
  "color-avatar-seven-text-on-bg-fill": {
    value: purple[2]
  },
  "color-avatar-six-bg-fill": {
    value: lime[9]
  },
  "color-avatar-six-text-on-bg-fill": {
    value: lime[15]
  },
  "color-avatar-text-on-bg-fill": {
    value: gray[1]
  },
  "color-avatar-three-bg-fill": {
    value: teal[9]
  },
  "color-avatar-three-text-on-bg-fill": {
    value: teal[15]
  },
  "color-avatar-two-bg-fill": {
    value: green[7]
  },
  "color-avatar-two-text-on-bg-fill": {
    value: green[14]
  },
  "color-backdrop-bg": {
    value: blackAlpha[14]
  },
  "color-button-gradient-bg-fill": {
    value: "linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)"
  },
  "color-checkbox-bg-surface-disabled": {
    value: blackAlpha[7]
  },
  "color-checkbox-icon-disabled": {
    value: gray[1]
  },
  "color-input-bg-surface": {
    value: gray[2]
  },
  "color-input-bg-surface-hover": {
    value: gray[3]
  },
  "color-input-bg-surface-active": {
    value: gray[4]
  },
  "color-input-border": {
    value: gray[12]
  },
  "color-input-border-hover": {
    value: gray[13]
  },
  "color-input-border-active": {
    value: gray[16]
  },
  "color-nav-bg": {
    value: gray[7]
  },
  "color-nav-bg-surface": {
    value: blackAlpha[3]
  },
  "color-nav-bg-surface-hover": {
    value: gray[6]
  },
  "color-nav-bg-surface-active": {
    value: gray[3]
  },
  "color-nav-bg-surface-selected": {
    value: gray[3]
  },
  "color-radio-button-bg-surface-disabled": {
    value: blackAlpha[7]
  },
  "color-radio-button-icon-disabled": {
    value: gray[1]
  },
  "color-video-thumbnail-play-button-bg-fill-hover": {
    value: blackAlpha[15]
  },
  "color-video-thumbnail-play-button-bg-fill": {
    value: blackAlpha[14]
  },
  "color-video-thumbnail-play-button-text-on-bg-fill": {
    value: gray[1]
  },
  "color-scrollbar-thumb-bg-hover": {
    value: gray[12]
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/font.mjs
var font = {
  "font-family-sans": {
    value: "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
  },
  "font-family-mono": {
    value: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace"
  },
  "font-size-275": {
    value: size[275]
  },
  "font-size-300": {
    value: size[300]
  },
  "font-size-325": {
    value: size[325]
  },
  "font-size-350": {
    value: size[350]
  },
  "font-size-400": {
    value: size[400]
  },
  "font-size-450": {
    value: size[450]
  },
  "font-size-500": {
    value: size[500]
  },
  "font-size-550": {
    value: size[550]
  },
  "font-size-600": {
    value: size[600]
  },
  "font-size-750": {
    value: size[750]
  },
  "font-size-800": {
    value: size[800]
  },
  "font-size-900": {
    value: size[900]
  },
  "font-size-1000": {
    value: size[1e3]
  },
  "font-weight-regular": {
    value: "450"
  },
  "font-weight-medium": {
    value: "550"
  },
  "font-weight-semibold": {
    value: "650"
  },
  "font-weight-bold": {
    value: "700"
  },
  "font-letter-spacing-densest": {
    value: "-0.54px"
  },
  "font-letter-spacing-denser": {
    value: "-0.3px"
  },
  "font-letter-spacing-dense": {
    value: "-0.2px"
  },
  "font-letter-spacing-normal": {
    value: "0px"
  },
  "font-line-height-300": {
    value: size[300]
  },
  "font-line-height-400": {
    value: size[400]
  },
  "font-line-height-500": {
    value: size[500]
  },
  "font-line-height-600": {
    value: size[600]
  },
  "font-line-height-700": {
    value: size[700]
  },
  "font-line-height-800": {
    value: size[800]
  },
  "font-line-height-1000": {
    value: size[1e3]
  },
  "font-line-height-1200": {
    value: size[1200]
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/height.mjs
var height = {
  "height-0": {
    value: size[0]
  },
  "height-025": {
    value: size["025"]
  },
  "height-050": {
    value: size["050"]
  },
  "height-100": {
    value: size[100]
  },
  "height-150": {
    value: size[150]
  },
  "height-200": {
    value: size[200]
  },
  "height-300": {
    value: size[300]
  },
  "height-400": {
    value: size[400]
  },
  "height-500": {
    value: size[500]
  },
  "height-600": {
    value: size[600]
  },
  "height-700": {
    value: size[700]
  },
  "height-800": {
    value: size[800]
  },
  "height-900": {
    value: size[900]
  },
  "height-1000": {
    value: size[1e3]
  },
  "height-1200": {
    value: size[1200]
  },
  "height-1600": {
    value: size[1600]
  },
  "height-2000": {
    value: size[2e3]
  },
  "height-2400": {
    value: size[2400]
  },
  "height-2800": {
    value: size[2800]
  },
  "height-3200": {
    value: size[3200]
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/motion.mjs
var motion = {
  "motion-duration-0": {
    value: "0ms"
  },
  "motion-duration-50": {
    value: "50ms"
  },
  "motion-duration-100": {
    value: "100ms"
  },
  "motion-duration-150": {
    value: "150ms"
  },
  "motion-duration-200": {
    value: "200ms"
  },
  "motion-duration-250": {
    value: "250ms"
  },
  "motion-duration-300": {
    value: "300ms"
  },
  "motion-duration-350": {
    value: "350ms"
  },
  "motion-duration-400": {
    value: "400ms"
  },
  "motion-duration-450": {
    value: "450ms"
  },
  "motion-duration-500": {
    value: "500ms"
  },
  "motion-duration-5000": {
    value: "5000ms"
  },
  "motion-ease": {
    value: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    description: "Responds quickly and finishes with control. A great default for any user interaction."
  },
  "motion-ease-in": {
    value: "cubic-bezier(0.42, 0, 1, 1)",
    description: "Starts slowly and finishes at top speed. Use sparingly."
  },
  "motion-ease-out": {
    value: "cubic-bezier(0.19, 0.91, 0.38, 1)",
    description: "Starts at top speed and finishes slowly. Use sparingly."
  },
  "motion-ease-in-out": {
    value: "cubic-bezier(0.42, 0, 0.58, 1)",
    description: "Starts and finishes with equal speed. A good default for transitions triggered by the system."
  },
  "motion-linear": {
    value: "cubic-bezier(0, 0, 1, 1)",
    description: "Moves with constant speed. Use for continuous and mechanical animations, such as rotating spinners."
  },
  "motion-keyframes-bounce": {
    value: "{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }"
  },
  "motion-keyframes-fade-in": {
    value: "{ to { opacity: 1 } }"
  },
  "motion-keyframes-pulse": {
    value: "{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }"
  },
  "motion-keyframes-spin": {
    value: "{ to { transform: rotate(1turn) } }"
  },
  "motion-keyframes-appear-above": {
    value: "{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }"
  },
  "motion-keyframes-appear-below": {
    value: "{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/shadow.mjs
var shadow = {
  "shadow-0": {
    value: "none"
  },
  "shadow-100": {
    value: "0px 1px 0px 0px rgba(26, 26, 26, 0.07)"
  },
  "shadow-200": {
    value: "0px 3px 1px -1px rgba(26, 26, 26, 0.07)"
  },
  "shadow-300": {
    value: "0px 4px 6px -2px rgba(26, 26, 26, 0.20)"
  },
  "shadow-400": {
    value: "0px 8px 16px -4px rgba(26, 26, 26, 0.22)"
  },
  "shadow-500": {
    value: "0px 12px 20px -8px rgba(26, 26, 26, 0.24)"
  },
  "shadow-600": {
    value: "0px 20px 20px -8px rgba(26, 26, 26, 0.28)"
  },
  "shadow-bevel-100": {
    value: "1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, -1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.17) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.5) inset"
  },
  "shadow-inset-100": {
    value: "0px 1px 2px 0px rgba(26, 26, 26, 0.15) inset, 0px 1px 1px 0px rgba(26, 26, 26, 0.15) inset"
  },
  "shadow-inset-200": {
    value: "0px 2px 1px 0px rgba(26, 26, 26, 0.20) inset, 1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset, -1px 0px 1px 0px rgba(26, 26, 26, 0.12) inset"
  },
  "shadow-button": {
    value: "0px -1px 0px 0px #b5b5b5 inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.1) inset, 0px 0.5px 0px 1.5px #FFF inset"
  },
  "shadow-button-hover": {
    value: "0px 1px 0px 0px #EBEBEB inset, -1px 0px 0px 0px #EBEBEB inset, 1px 0px 0px 0px #EBEBEB inset, 0px -1px 0px 0px #CCC inset"
  },
  "shadow-button-inset": {
    value: "-1px 0px 1px 0px rgba(26, 26, 26, 0.122) inset, 1px 0px 1px 0px rgba(26, 26, 26, 0.122) inset, 0px 2px 1px 0px rgba(26, 26, 26, 0.2) inset"
  },
  "shadow-button-primary": {
    value: "0px -1px 0px 1px rgba(0, 0, 0, 0.8) inset, 0px 0px 0px 1px rgba(48, 48, 48, 1) inset, 0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.25) inset;"
  },
  "shadow-button-primary-hover": {
    value: "0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1px 0px 0px #000 inset, 0px -1px 0px 1px #1A1A1A"
  },
  "shadow-button-primary-inset": {
    value: "0px 3px 0px 0px rgb(0, 0, 0) inset"
  },
  "shadow-button-primary-critical": {
    value: "0px -1px 0px 1px rgba(142, 31, 11, 0.8) inset, 0px 0px 0px 1px rgba(181, 38, 11, 0.8) inset, 0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.349) inset"
  },
  "shadow-button-primary-critical-hover": {
    value: "0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset"
  },
  "shadow-button-primary-critical-inset": {
    value: "-1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 0px 2px 0px 0px rgba(0, 0, 0, 0.6) inset"
  },
  "shadow-button-primary-success": {
    value: "0px -1px 0px 1px rgba(12, 81, 50, 0.8) inset, 0px 0px 0px 1px rgba(19, 111, 69, 0.8) inset, 0px 0.5px 0px 1.5px rgba(255, 255, 255, 0.251) inset"
  },
  "shadow-button-primary-success-hover": {
    value: "0px 1px 0px 0px rgba(255, 255, 255, 0.48) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset"
  },
  "shadow-button-primary-success-inset": {
    value: "-1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.2) inset, 0px 2px 0px 0px rgba(0, 0, 0, 0.6) inset"
  },
  "shadow-border-inset": {
    value: "0px 0px 0px 1px rgba(0, 0, 0, 0.08) inset"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/space.mjs
var space = {
  "space-0": {
    value: size[0]
  },
  "space-025": {
    value: size["025"]
  },
  "space-050": {
    value: size["050"]
  },
  "space-100": {
    value: size[100]
  },
  "space-150": {
    value: size[150]
  },
  "space-200": {
    value: size[200]
  },
  "space-300": {
    value: size[300]
  },
  "space-400": {
    value: size[400]
  },
  "space-500": {
    value: size[500]
  },
  "space-600": {
    value: size[600]
  },
  "space-800": {
    value: size[800]
  },
  "space-1000": {
    value: size[1e3]
  },
  "space-1200": {
    value: size[1200]
  },
  "space-1600": {
    value: size[1600]
  },
  "space-2000": {
    value: size[2e3]
  },
  "space-2400": {
    value: size[2400]
  },
  "space-2800": {
    value: size[2800]
  },
  "space-3200": {
    value: size[3200]
  },
  "space-button-group-gap": {
    value: createVar2("space-200")
  },
  "space-card-gap": {
    value: createVar2("space-400")
  },
  "space-card-padding": {
    value: createVar2("space-400")
  },
  "space-table-cell-padding": {
    value: createVar2("space-150")
  }
};
function createVar2(spaceTokenName) {
  return "var(" + createVarName(spaceTokenName) + ")";
}

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/text.mjs
var text = {
  // heading-3xl
  "text-heading-3xl-font-family": {
    value: createVar("font-family-sans")
  },
  "text-heading-3xl-font-size": {
    value: createVar("font-size-900")
  },
  "text-heading-3xl-font-weight": {
    value: createVar("font-weight-bold")
  },
  "text-heading-3xl-font-letter-spacing": {
    value: createVar("font-letter-spacing-densest")
  },
  "text-heading-3xl-font-line-height": {
    value: createVar("font-line-height-1200")
  },
  // heading-2xl
  "text-heading-2xl-font-family": {
    value: createVar("font-family-sans")
  },
  "text-heading-2xl-font-size": {
    value: createVar("font-size-750")
  },
  "text-heading-2xl-font-weight": {
    value: createVar("font-weight-bold")
  },
  "text-heading-2xl-font-letter-spacing": {
    value: createVar("font-letter-spacing-denser")
  },
  "text-heading-2xl-font-line-height": {
    value: createVar("font-line-height-1000")
  },
  // heading-xl
  "text-heading-xl-font-family": {
    value: createVar("font-family-sans")
  },
  "text-heading-xl-font-size": {
    value: createVar("font-size-600")
  },
  "text-heading-xl-font-weight": {
    value: createVar("font-weight-bold")
  },
  "text-heading-xl-font-letter-spacing": {
    value: createVar("font-letter-spacing-dense")
  },
  "text-heading-xl-font-line-height": {
    value: createVar("font-line-height-800")
  },
  // heading-lg
  "text-heading-lg-font-family": {
    value: createVar("font-family-sans")
  },
  "text-heading-lg-font-size": {
    value: createVar("font-size-500")
  },
  "text-heading-lg-font-weight": {
    value: createVar("font-weight-semibold")
  },
  "text-heading-lg-font-letter-spacing": {
    value: createVar("font-letter-spacing-dense")
  },
  "text-heading-lg-font-line-height": {
    value: createVar("font-line-height-600")
  },
  // heading-md
  "text-heading-md-font-family": {
    value: createVar("font-family-sans")
  },
  "text-heading-md-font-size": {
    value: createVar("font-size-350")
  },
  "text-heading-md-font-weight": {
    value: createVar("font-weight-semibold")
  },
  "text-heading-md-font-letter-spacing": {
    value: createVar("font-letter-spacing-normal")
  },
  "text-heading-md-font-line-height": {
    value: createVar("font-line-height-500")
  },
  // heading-sm
  "text-heading-sm-font-family": {
    value: createVar("font-family-sans")
  },
  "text-heading-sm-font-size": {
    value: createVar("font-size-325")
  },
  "text-heading-sm-font-weight": {
    value: createVar("font-weight-semibold")
  },
  "text-heading-sm-font-letter-spacing": {
    value: createVar("font-letter-spacing-normal")
  },
  "text-heading-sm-font-line-height": {
    value: createVar("font-line-height-500")
  },
  // heading-xs
  "text-heading-xs-font-family": {
    value: createVar("font-family-sans")
  },
  "text-heading-xs-font-size": {
    value: createVar("font-size-300")
  },
  "text-heading-xs-font-weight": {
    value: createVar("font-weight-semibold")
  },
  "text-heading-xs-font-letter-spacing": {
    value: createVar("font-letter-spacing-normal")
  },
  "text-heading-xs-font-line-height": {
    value: createVar("font-line-height-400")
  },
  // body-lg
  "text-body-lg-font-family": {
    value: createVar("font-family-sans")
  },
  "text-body-lg-font-size": {
    value: createVar("font-size-350")
  },
  "text-body-lg-font-weight": {
    value: createVar("font-weight-regular")
  },
  "text-body-lg-font-letter-spacing": {
    value: createVar("font-letter-spacing-normal")
  },
  "text-body-lg-font-line-height": {
    value: createVar("font-line-height-500")
  },
  // body-md
  "text-body-md-font-family": {
    value: createVar("font-family-sans")
  },
  "text-body-md-font-size": {
    value: createVar("font-size-325")
  },
  "text-body-md-font-weight": {
    value: createVar("font-weight-regular")
  },
  "text-body-md-font-letter-spacing": {
    value: createVar("font-letter-spacing-normal")
  },
  "text-body-md-font-line-height": {
    value: createVar("font-line-height-500")
  },
  // body-sm
  "text-body-sm-font-family": {
    value: createVar("font-family-sans")
  },
  "text-body-sm-font-size": {
    value: createVar("font-size-300")
  },
  "text-body-sm-font-weight": {
    value: createVar("font-weight-regular")
  },
  "text-body-sm-font-letter-spacing": {
    value: createVar("font-letter-spacing-normal")
  },
  "text-body-sm-font-line-height": {
    value: createVar("font-line-height-400")
  },
  // body-xs
  "text-body-xs-font-family": {
    value: createVar("font-family-sans")
  },
  "text-body-xs-font-size": {
    value: createVar("font-size-275")
  },
  "text-body-xs-font-weight": {
    value: createVar("font-weight-regular")
  },
  "text-body-xs-font-letter-spacing": {
    value: createVar("font-letter-spacing-normal")
  },
  "text-body-xs-font-line-height": {
    value: createVar("font-line-height-300")
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/width.mjs
var width = {
  "width-0": {
    value: size[0]
  },
  "width-025": {
    value: size["025"]
  },
  "width-050": {
    value: size["050"]
  },
  "width-100": {
    value: size[100]
  },
  "width-150": {
    value: size[150]
  },
  "width-200": {
    value: size[200]
  },
  "width-300": {
    value: size[300]
  },
  "width-400": {
    value: size[400]
  },
  "width-500": {
    value: size[500]
  },
  "width-600": {
    value: size[600]
  },
  "width-700": {
    value: size[700]
  },
  "width-800": {
    value: size[800]
  },
  "width-900": {
    value: size[900]
  },
  "width-1000": {
    value: size[1e3]
  },
  "width-1200": {
    value: size[1200]
  },
  "width-1600": {
    value: size[1600]
  },
  "width-2000": {
    value: size[2e3]
  },
  "width-2400": {
    value: size[2400]
  },
  "width-2800": {
    value: size[2800]
  },
  "width-3200": {
    value: size[3200]
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/zIndex.mjs
var zIndex = {
  "z-index-0": {
    value: "auto"
  },
  "z-index-1": {
    value: "100"
  },
  "z-index-2": {
    value: "400"
  },
  "z-index-3": {
    value: "510"
  },
  "z-index-4": {
    value: "512"
  },
  "z-index-5": {
    value: "513"
  },
  "z-index-6": {
    value: "514"
  },
  "z-index-7": {
    value: "515"
  },
  "z-index-8": {
    value: "516"
  },
  "z-index-9": {
    value: "517"
  },
  "z-index-10": {
    value: "518"
  },
  "z-index-11": {
    value: "519"
  },
  "z-index-12": {
    value: "520"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/base/index.mjs
var metaThemeBase = createMetaThemeBase({
  border,
  breakpoints,
  color,
  font,
  height,
  motion,
  shadow,
  space,
  text,
  width,
  zIndex
});

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/utils.mjs
function createMetaThemePartial(metaThemePartial) {
  return Object.fromEntries(Object.entries(metaThemePartial).map(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), tokenGroupName = _ref2[0], tokenGroup = _ref2[1];
    return [tokenGroupName, tokenGroup && tokenGroupNamesToRems.includes(tokenGroupName) ? tokenGroupToRems(tokenGroup) : tokenGroup];
  }));
}
function createMetaTheme(metaThemePartial) {
  return (0, import_deepmerge.default)(metaThemeBase, metaThemePartial);
}
function createThemeClassName(themeName) {
  return "p-theme-" + themeName;
}
function createIsTokenName(theme) {
  var tokenNames = new Set(getTokenNames(theme));
  return function(tokenName) {
    return tokenNames.has(tokenName);
  };
}
createIsTokenName(metaThemeBase);

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/constants.mjs
var themeNameLight = "light";
var themeNameDefault = themeNameLight;
var themeNames = [themeNameLight, "light-mobile", "light-high-contrast-experimental", "dark-experimental"];

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/light.mjs
var metaThemeLightPartial = createMetaThemePartial({});
var metaThemeLight = createMetaTheme(metaThemeLightPartial);

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/light-high-contrast.mjs
var metaThemeLightHighContrastPartial = createMetaThemePartial({
  color: {
    "color-text": {
      value: gray[16]
    },
    "color-text-secondary": {
      value: gray[16]
    },
    "color-text-brand": {
      value: gray[16]
    },
    "color-icon-secondary": {
      value: gray[14]
    },
    "color-border": {
      value: gray[12]
    },
    "color-input-border": {
      value: gray[14]
    },
    "color-border-secondary": {
      value: gray[12]
    },
    "color-bg-surface-secondary": {
      value: gray[6]
    }
  },
  shadow: {
    "shadow-bevel-100": {
      value: "0px 1px 0px 0px rgba(26, 26, 26, 0.07), 0px 1px 0px 0px rgba(208, 208, 208, 0.40) inset, 1px 0px 0px 0px #CCC inset, -1px 0px 0px 0px #CCC inset, 0px -1px 0px 0px #999 inset"
    }
  }
});
var metaThemeLightHighContrast = createMetaTheme(metaThemeLightHighContrastPartial);

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/light-mobile.mjs
var buttonShadow = "0 0 0 " + createVar("border-width-025") + " " + createVar("color-border") + " inset";
var metaThemeLightMobilePartial = createMetaThemePartial({
  color: {
    "color-button-gradient-bg-fill": {
      value: "none"
    }
  },
  shadow: {
    "shadow-100": {
      value: "none"
    },
    "shadow-bevel-100": {
      value: "none"
    },
    "shadow-button": {
      value: buttonShadow
    },
    "shadow-button-hover": {
      value: buttonShadow
    },
    "shadow-button-inset": {
      value: buttonShadow
    },
    "shadow-button-primary": {
      value: "none"
    },
    "shadow-button-primary-hover": {
      value: "none"
    },
    "shadow-button-primary-inset": {
      value: "none"
    },
    "shadow-button-primary-critical": {
      value: "none"
    },
    "shadow-button-primary-critical-hover": {
      value: "none"
    },
    "shadow-button-primary-critical-inset": {
      value: "none"
    },
    "shadow-button-primary-success": {
      value: "none"
    },
    "shadow-button-primary-success-hover": {
      value: "none"
    },
    "shadow-button-primary-success-inset": {
      value: "none"
    }
  },
  space: {
    "space-card-gap": {
      value: createVar("space-200")
    }
  },
  text: {
    // heading-2xl
    "text-heading-2xl-font-size": {
      value: createVar("font-size-800")
    },
    // heading-xl
    "text-heading-xl-font-size": {
      value: createVar("font-size-550")
    },
    "text-heading-xl-font-line-height": {
      value: createVar("font-line-height-700")
    },
    // heading-lg
    "text-heading-lg-font-size": {
      value: createVar("font-size-450")
    },
    // heading-md
    "text-heading-md-font-size": {
      value: createVar("font-size-400")
    },
    // heading-sm
    "text-heading-sm-font-size": {
      value: createVar("font-size-350")
    },
    // body-lg
    "text-body-lg-font-size": {
      value: createVar("font-size-450")
    },
    "text-body-lg-font-line-height": {
      value: createVar("font-line-height-700")
    },
    // body-md
    "text-body-md-font-size": {
      value: createVar("font-size-400")
    },
    "text-body-md-font-line-height": {
      value: createVar("font-line-height-600")
    },
    // body-sm
    "text-body-sm-font-size": {
      value: createVar("font-size-350")
    },
    "text-body-sm-font-line-height": {
      value: createVar("font-line-height-500")
    },
    // body-xs
    "text-body-xs-font-size": {
      value: createVar("font-size-300")
    },
    "text-body-xs-font-line-height": {
      value: createVar("font-line-height-400")
    }
  }
});
var metaThemeLightMobile = createMetaTheme(metaThemeLightMobilePartial);

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/dark.mjs
var metaThemeDarkPartial = createMetaThemePartial({
  color: {
    "color-scheme": {
      value: "dark"
    },
    "color-bg": {
      value: gray[16]
    },
    "color-bg-surface": {
      value: gray[15]
    },
    "color-bg-fill": {
      value: gray[15]
    },
    "color-icon": {
      value: gray[8]
    },
    "color-icon-secondary": {
      value: gray[12]
    },
    "color-text": {
      value: gray[8]
    },
    "color-text-secondary": {
      value: gray[11]
    },
    "color-bg-surface-secondary-active": {
      value: gray[13]
    },
    "color-bg-surface-secondary-hover": {
      value: gray[14]
    },
    "color-bg-fill-transparent": {
      value: whiteAlpha[8]
    },
    "color-bg-fill-brand": {
      value: gray[1]
    },
    "color-text-brand-on-bg-fill": {
      value: gray[15]
    },
    "color-bg-surface-hover": {
      value: gray[14]
    },
    "color-bg-fill-hover": {
      value: gray[14]
    },
    "color-bg-fill-transparent-hover": {
      value: whiteAlpha[9]
    },
    "color-bg-fill-brand-hover": {
      value: gray[5]
    },
    "color-bg-surface-selected": {
      value: gray[13]
    },
    "color-bg-fill-selected": {
      value: gray[13]
    },
    "color-bg-fill-transparent-selected": {
      value: whiteAlpha[11]
    },
    "color-bg-fill-brand-selected": {
      value: gray[9]
    },
    "color-bg-surface-active": {
      value: gray[13]
    },
    "color-bg-fill-active": {
      value: gray[13]
    },
    "color-bg-fill-transparent-active": {
      value: whiteAlpha[10]
    },
    "color-bg-fill-brand-active": {
      value: gray[4]
    },
    "color-bg-surface-brand-selected": {
      value: gray[14]
    },
    "color-border-secondary": {
      value: gray[13]
    },
    "color-tooltip-tail-down-border-experimental": {
      value: "rgba(60, 60, 60, 1)"
    },
    "color-tooltip-tail-up-border-experimental": {
      value: "rgba(71, 71, 71, 1)"
    },
    "color-border-gradient-experimental": {
      value: "linear-gradient(to bottom, " + whiteAlpha[9] + ", " + whiteAlpha[4] + ")"
    },
    "color-border-gradient-hover-experimental": {
      value: "linear-gradient(to bottom, " + whiteAlpha[9] + ", " + whiteAlpha[4] + ")"
    },
    "color-border-gradient-selected-experimental": {
      value: "linear-gradient(to bottom, " + blackAlpha[10] + ", " + whiteAlpha[10] + ")"
    },
    "color-border-gradient-active-experimental": {
      value: "linear-gradient(to bottom, " + whiteAlpha[10] + ", " + whiteAlpha[4] + ")"
    }
  },
  shadow: {
    "shadow-bevel-100": {
      value: "1px 0px 0px 0px rgba(204, 204, 204, 0.08) inset, -1px 0px 0px 0px rgba(204, 204, 204, 0.08) inset, 0px -1px 0px 0px rgba(204, 204, 204, 0.08) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.16) inset"
    }
  }
});
var metaThemeDark = createMetaTheme(metaThemeDarkPartial);

// node_modules/@shopify/polaris-tokens/dist/esm/src/themes/index.mjs
var metaThemePartials = {
  light: metaThemeLightPartial,
  "light-mobile": metaThemeLightMobilePartial,
  "light-high-contrast-experimental": metaThemeLightHighContrastPartial,
  "dark-experimental": metaThemeDarkPartial
};
var metaThemeDefaultPartial = metaThemePartials[themeNameDefault];
var metaThemeDefault = createMetaTheme(metaThemeDefaultPartial);

// node_modules/@shopify/polaris-tokens/dist/esm/build/index.mjs
var themes = {
  "light": {
    "border": {
      "border-radius-0": "0rem",
      "border-radius-050": "0.125rem",
      "border-radius-100": "0.25rem",
      "border-radius-150": "0.375rem",
      "border-radius-200": "0.5rem",
      "border-radius-300": "0.75rem",
      "border-radius-400": "1rem",
      "border-radius-500": "1.25rem",
      "border-radius-750": "1.875rem",
      "border-radius-full": "624.9375rem",
      "border-width-0": "0rem",
      "border-width-0165": "0.04125rem",
      "border-width-025": "0.0625rem",
      "border-width-050": "0.125rem",
      "border-width-100": "0.25rem"
    },
    "breakpoints": {
      "breakpoints-xs": "0rem",
      "breakpoints-sm": "30.625rem",
      "breakpoints-md": "48rem",
      "breakpoints-lg": "65rem",
      "breakpoints-xl": "90rem"
    },
    "color": {
      "color-scheme": "light",
      "color-bg": "rgba(241, 241, 241, 1)",
      "color-bg-inverse": "rgba(26, 26, 26, 1)",
      "color-bg-surface": "rgba(255, 255, 255, 1)",
      "color-bg-surface-hover": "rgba(247, 247, 247, 1)",
      "color-bg-surface-active": "rgba(243, 243, 243, 1)",
      "color-bg-surface-selected": "rgba(241, 241, 241, 1)",
      "color-bg-surface-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-surface-secondary": "rgba(247, 247, 247, 1)",
      "color-bg-surface-secondary-hover": "rgba(241, 241, 241, 1)",
      "color-bg-surface-secondary-active": "rgba(235, 235, 235, 1)",
      "color-bg-surface-secondary-selected": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary": "rgba(243, 243, 243, 1)",
      "color-bg-surface-tertiary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary-active": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-brand-active": "rgba(241, 241, 241, 1)",
      "color-bg-surface-brand-selected": "rgba(241, 241, 241, 1)",
      "color-bg-surface-info": "rgba(234, 244, 255, 1)",
      "color-bg-surface-info-hover": "rgba(224, 240, 255, 1)",
      "color-bg-surface-info-active": "rgba(202, 230, 255, 1)",
      "color-bg-surface-success": "rgba(205, 254, 225, 1)",
      "color-bg-surface-success-hover": "rgba(180, 254, 210, 1)",
      "color-bg-surface-success-active": "rgba(146, 254, 194, 1)",
      "color-bg-surface-caution": "rgba(255, 248, 219, 1)",
      "color-bg-surface-caution-hover": "rgba(255, 244, 191, 1)",
      "color-bg-surface-caution-active": "rgba(255, 239, 157, 1)",
      "color-bg-surface-warning": "rgba(255, 241, 227, 1)",
      "color-bg-surface-warning-hover": "rgba(255, 235, 213, 1)",
      "color-bg-surface-warning-active": "rgba(255, 228, 198, 1)",
      "color-bg-surface-critical": "rgba(254, 233, 232, 1)",
      "color-bg-surface-critical-hover": "rgba(254, 226, 225, 1)",
      "color-bg-surface-critical-active": "rgba(254, 218, 217, 1)",
      "color-bg-surface-emphasis": "rgba(240, 242, 255, 1)",
      "color-bg-surface-emphasis-hover": "rgba(234, 237, 255, 1)",
      "color-bg-surface-emphasis-active": "rgba(226, 231, 255, 1)",
      "color-bg-surface-magic": "rgba(248, 247, 255, 1)",
      "color-bg-surface-magic-hover": "rgba(243, 241, 255, 1)",
      "color-bg-surface-magic-active": "rgba(233, 229, 255, 1)",
      "color-bg-surface-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-surface-transparent": "rgba(0, 0, 0, 0)",
      "color-bg-fill": "rgba(255, 255, 255, 1)",
      "color-bg-fill-hover": "rgba(250, 250, 250, 1)",
      "color-bg-fill-active": "rgba(247, 247, 247, 1)",
      "color-bg-fill-selected": "rgba(204, 204, 204, 1)",
      "color-bg-fill-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-fill-secondary": "rgba(241, 241, 241, 1)",
      "color-bg-fill-secondary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-fill-secondary-active": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary-hover": "rgba(212, 212, 212, 1)",
      "color-bg-fill-tertiary-active": "rgba(204, 204, 204, 1)",
      "color-bg-fill-brand": "rgba(48, 48, 48, 1)",
      "color-bg-fill-brand-hover": "rgba(26, 26, 26, 1)",
      "color-bg-fill-brand-active": "rgba(26, 26, 26, 1)",
      "color-bg-fill-brand-selected": "rgba(48, 48, 48, 1)",
      "color-bg-fill-brand-disabled": "rgba(0, 0, 0, 0.17)",
      "color-bg-fill-info": "rgba(145, 208, 255, 1)",
      "color-bg-fill-info-hover": "rgba(81, 192, 255, 1)",
      "color-bg-fill-info-active": "rgba(0, 148, 213, 1)",
      "color-bg-fill-info-secondary": "rgba(213, 235, 255, 1)",
      "color-bg-fill-success": "rgba(41, 132, 90, 1)",
      "color-bg-fill-success-hover": "rgba(19, 111, 69, 1)",
      "color-bg-fill-success-active": "rgba(12, 81, 50, 1)",
      "color-bg-fill-success-secondary": "rgba(180, 254, 210, 1)",
      "color-bg-fill-warning": "rgba(255, 184, 0, 1)",
      "color-bg-fill-warning-hover": "rgba(229, 165, 0, 1)",
      "color-bg-fill-warning-active": "rgba(178, 132, 0, 1)",
      "color-bg-fill-warning-secondary": "rgba(255, 214, 164, 1)",
      "color-bg-fill-caution": "rgba(255, 230, 0, 1)",
      "color-bg-fill-caution-hover": "rgba(234, 211, 0, 1)",
      "color-bg-fill-caution-active": "rgba(225, 203, 0, 1)",
      "color-bg-fill-caution-secondary": "rgba(255, 235, 120, 1)",
      "color-bg-fill-critical": "rgba(229, 28, 0, 1)",
      "color-bg-fill-critical-hover": "rgba(181, 38, 11, 1)",
      "color-bg-fill-critical-active": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-selected": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-secondary": "rgba(254, 211, 209, 1)",
      "color-bg-fill-emphasis": "rgba(0, 91, 211, 1)",
      "color-bg-fill-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-bg-fill-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-bg-fill-magic": "rgba(128, 81, 255, 1)",
      "color-bg-fill-magic-secondary": "rgba(233, 229, 255, 1)",
      "color-bg-fill-magic-secondary-hover": "rgba(228, 222, 255, 1)",
      "color-bg-fill-magic-secondary-active": "rgba(223, 217, 255, 1)",
      "color-bg-fill-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-fill-inverse-hover": "rgba(74, 74, 74, 1)",
      "color-bg-fill-inverse-active": "rgba(97, 97, 97, 1)",
      "color-bg-fill-transparent": "rgba(0, 0, 0, 0.02)",
      "color-bg-fill-transparent-hover": "rgba(0, 0, 0, 0.05)",
      "color-bg-fill-transparent-active": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-selected": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-secondary": "rgba(0, 0, 0, 0.06)",
      "color-bg-fill-transparent-secondary-hover": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-secondary-active": "rgba(0, 0, 0, 0.11)",
      "color-text": "rgba(48, 48, 48, 1)",
      "color-text-secondary": "rgba(97, 97, 97, 1)",
      "color-text-disabled": "rgba(181, 181, 181, 1)",
      "color-text-link": "rgba(0, 91, 211, 1)",
      "color-text-link-hover": "rgba(0, 66, 153, 1)",
      "color-text-link-active": "rgba(0, 46, 106, 1)",
      "color-text-brand": "rgba(74, 74, 74, 1)",
      "color-text-brand-hover": "rgba(48, 48, 48, 1)",
      "color-text-brand-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-text-brand-on-bg-fill-hover": "rgba(227, 227, 227, 1)",
      "color-text-brand-on-bg-fill-active": "rgba(204, 204, 204, 1)",
      "color-text-brand-on-bg-fill-disabled": "rgba(255, 255, 255, 1)",
      "color-text-info": "rgba(0, 58, 90, 1)",
      "color-text-info-hover": "rgba(0, 58, 90, 1)",
      "color-text-info-active": "rgba(0, 33, 51, 1)",
      "color-text-info-secondary": "rgba(0, 124, 180, 1)",
      "color-text-info-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-text-success": "rgba(12, 81, 50, 1)",
      "color-text-success-hover": "rgba(8, 61, 37, 1)",
      "color-text-success-active": "rgba(9, 42, 27, 1)",
      "color-text-success-secondary": "rgba(41, 132, 90, 1)",
      "color-text-success-on-bg-fill": "rgba(248, 255, 251, 1)",
      "color-text-caution": "rgba(79, 71, 0, 1)",
      "color-text-caution-hover": "rgba(51, 46, 0, 1)",
      "color-text-caution-active": "rgba(31, 28, 0, 1)",
      "color-text-caution-secondary": "rgba(130, 117, 0, 1)",
      "color-text-caution-on-bg-fill": "rgba(51, 46, 0, 1)",
      "color-text-warning": "rgba(94, 66, 0, 1)",
      "color-text-warning-hover": "rgba(65, 45, 0, 1)",
      "color-text-warning-active": "rgba(37, 26, 0, 1)",
      "color-text-warning-secondary": "rgba(149, 111, 0, 1)",
      "color-text-warning-on-bg-fill": "rgba(37, 26, 0, 1)",
      "color-text-critical": "rgba(142, 31, 11, 1)",
      "color-text-critical-hover": "rgba(95, 21, 7, 1)",
      "color-text-critical-active": "rgba(47, 10, 4, 1)",
      "color-text-critical-secondary": "rgba(229, 28, 0, 1)",
      "color-text-critical-on-bg-fill": "rgba(255, 251, 251, 1)",
      "color-text-emphasis": "rgba(0, 91, 211, 1)",
      "color-text-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-text-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-text-emphasis-on-bg-fill": "rgba(252, 253, 255, 1)",
      "color-text-emphasis-on-bg-fill-hover": "rgba(226, 231, 255, 1)",
      "color-text-emphasis-on-bg-fill-active": "rgba(213, 220, 255, 1)",
      "color-text-magic": "rgba(87, 0, 209, 1)",
      "color-text-magic-secondary": "rgba(113, 38, 255, 1)",
      "color-text-magic-on-bg-fill": "rgba(253, 253, 255, 1)",
      "color-text-inverse": "rgba(227, 227, 227, 1)",
      "color-text-inverse-secondary": "rgba(181, 181, 181, 1)",
      "color-text-link-inverse": "rgba(197, 208, 255, 1)",
      "color-border": "rgba(227, 227, 227, 1)",
      "color-border-hover": "rgba(204, 204, 204, 1)",
      "color-border-disabled": "rgba(235, 235, 235, 1)",
      "color-border-secondary": "rgba(235, 235, 235, 1)",
      "color-border-tertiary": "rgba(204, 204, 204, 1)",
      "color-border-focus": "rgba(0, 91, 211, 1)",
      "color-border-brand": "rgba(227, 227, 227, 1)",
      "color-border-info": "rgba(168, 216, 255, 1)",
      "color-border-success": "rgba(146, 254, 194, 1)",
      "color-border-caution": "rgba(255, 235, 120, 1)",
      "color-border-warning": "rgba(255, 200, 121, 1)",
      "color-border-critical": "rgba(254, 195, 193, 1)",
      "color-border-critical-secondary": "rgba(142, 31, 11, 1)",
      "color-border-emphasis": "rgba(0, 91, 211, 1)",
      "color-border-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-border-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-border-magic": "rgba(228, 222, 255, 1)",
      "color-border-magic-secondary": "rgba(148, 116, 255, 1)",
      "color-border-magic-secondary-hover": "rgba(128, 81, 255, 1)",
      "color-border-inverse": "rgba(97, 97, 97, 1)",
      "color-border-inverse-hover": "rgba(204, 204, 204, 1)",
      "color-border-inverse-active": "rgba(227, 227, 227, 1)",
      "color-tooltip-tail-down-border-experimental": "rgba(212, 212, 212, 1)",
      "color-tooltip-tail-up-border-experimental": "rgba(227, 227, 227, 1)",
      "color-border-gradient-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-hover-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-selected-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-active-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-icon": "rgba(74, 74, 74, 1)",
      "color-icon-hover": "rgba(48, 48, 48, 1)",
      "color-icon-active": "rgba(26, 26, 26, 1)",
      "color-icon-disabled": "rgba(204, 204, 204, 1)",
      "color-icon-secondary": "rgba(138, 138, 138, 1)",
      "color-icon-secondary-hover": "rgba(97, 97, 97, 1)",
      "color-icon-secondary-active": "rgba(74, 74, 74, 1)",
      "color-icon-brand": "rgba(26, 26, 26, 1)",
      "color-icon-info": "rgba(0, 148, 213, 1)",
      "color-icon-success": "rgba(41, 132, 90, 1)",
      "color-icon-caution": "rgba(153, 138, 0, 1)",
      "color-icon-warning": "rgba(178, 132, 0, 1)",
      "color-icon-critical": "rgba(239, 77, 47, 1)",
      "color-icon-emphasis": "rgba(0, 91, 211, 1)",
      "color-icon-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-icon-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-icon-magic": "rgba(128, 81, 255, 1)",
      "color-icon-inverse": "rgba(227, 227, 227, 1)",
      "color-avatar-bg-fill": "rgba(181, 181, 181, 1)",
      "color-avatar-five-bg-fill": "rgba(253, 75, 146, 1)",
      "color-avatar-five-text-on-bg-fill": "rgba(255, 246, 248, 1)",
      "color-avatar-four-bg-fill": "rgba(81, 192, 255, 1)",
      "color-avatar-four-text-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-avatar-one-bg-fill": "rgba(197, 48, 197, 1)",
      "color-avatar-one-text-on-bg-fill": "rgba(253, 239, 253, 1)",
      "color-avatar-seven-bg-fill": "rgba(148, 116, 255, 1)",
      "color-avatar-seven-text-on-bg-fill": "rgba(248, 247, 255, 1)",
      "color-avatar-six-bg-fill": "rgba(37, 232, 43, 1)",
      "color-avatar-six-text-on-bg-fill": "rgba(3, 61, 5, 1)",
      "color-avatar-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-avatar-three-bg-fill": "rgba(44, 224, 212, 1)",
      "color-avatar-three-text-on-bg-fill": "rgba(3, 60, 57, 1)",
      "color-avatar-two-bg-fill": "rgba(56, 250, 163, 1)",
      "color-avatar-two-text-on-bg-fill": "rgba(12, 81, 50, 1)",
      "color-backdrop-bg": "rgba(0, 0, 0, 0.71)",
      "color-button-gradient-bg-fill": "linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)",
      "color-checkbox-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-checkbox-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-input-bg-surface": "rgba(253, 253, 253, 1)",
      "color-input-bg-surface-hover": "rgba(250, 250, 250, 1)",
      "color-input-bg-surface-active": "rgba(247, 247, 247, 1)",
      "color-input-border": "rgba(138, 138, 138, 1)",
      "color-input-border-hover": "rgba(97, 97, 97, 1)",
      "color-input-border-active": "rgba(26, 26, 26, 1)",
      "color-nav-bg": "rgba(235, 235, 235, 1)",
      "color-nav-bg-surface": "rgba(0, 0, 0, 0.02)",
      "color-nav-bg-surface-hover": "rgba(241, 241, 241, 1)",
      "color-nav-bg-surface-active": "rgba(250, 250, 250, 1)",
      "color-nav-bg-surface-selected": "rgba(250, 250, 250, 1)",
      "color-radio-button-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-radio-button-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-video-thumbnail-play-button-bg-fill-hover": "rgba(0, 0, 0, 0.81)",
      "color-video-thumbnail-play-button-bg-fill": "rgba(0, 0, 0, 0.71)",
      "color-video-thumbnail-play-button-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-scrollbar-thumb-bg-hover": "rgba(138, 138, 138, 1)"
    },
    "font": {
      "font-family-sans": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "font-family-mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      "font-size-275": "0.6875rem",
      "font-size-300": "0.75rem",
      "font-size-325": "0.8125rem",
      "font-size-350": "0.875rem",
      "font-size-400": "1rem",
      "font-size-450": "1.125rem",
      "font-size-500": "1.25rem",
      "font-size-550": "1.375rem",
      "font-size-600": "1.5rem",
      "font-size-750": "1.875rem",
      "font-size-800": "2rem",
      "font-size-900": "2.25rem",
      "font-size-1000": "2.5rem",
      "font-weight-regular": "450",
      "font-weight-medium": "550",
      "font-weight-semibold": "650",
      "font-weight-bold": "700",
      "font-letter-spacing-densest": "-0.03375rem",
      "font-letter-spacing-denser": "-0.01875rem",
      "font-letter-spacing-dense": "-0.0125rem",
      "font-letter-spacing-normal": "0rem",
      "font-line-height-300": "0.75rem",
      "font-line-height-400": "1rem",
      "font-line-height-500": "1.25rem",
      "font-line-height-600": "1.5rem",
      "font-line-height-700": "1.75rem",
      "font-line-height-800": "2rem",
      "font-line-height-1000": "2.5rem",
      "font-line-height-1200": "3rem"
    },
    "height": {
      "height-0": "0rem",
      "height-025": "0.0625rem",
      "height-050": "0.125rem",
      "height-100": "0.25rem",
      "height-150": "0.375rem",
      "height-200": "0.5rem",
      "height-300": "0.75rem",
      "height-400": "1rem",
      "height-500": "1.25rem",
      "height-600": "1.5rem",
      "height-700": "1.75rem",
      "height-800": "2rem",
      "height-900": "2.25rem",
      "height-1000": "2.5rem",
      "height-1200": "3rem",
      "height-1600": "4rem",
      "height-2000": "5rem",
      "height-2400": "6rem",
      "height-2800": "7rem",
      "height-3200": "8rem"
    },
    "motion": {
      "motion-duration-0": "0ms",
      "motion-duration-50": "50ms",
      "motion-duration-100": "100ms",
      "motion-duration-150": "150ms",
      "motion-duration-200": "200ms",
      "motion-duration-250": "250ms",
      "motion-duration-300": "300ms",
      "motion-duration-350": "350ms",
      "motion-duration-400": "400ms",
      "motion-duration-450": "450ms",
      "motion-duration-500": "500ms",
      "motion-duration-5000": "5000ms",
      "motion-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      "motion-ease-in": "cubic-bezier(0.42, 0, 1, 1)",
      "motion-ease-out": "cubic-bezier(0.19, 0.91, 0.38, 1)",
      "motion-ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
      "motion-linear": "cubic-bezier(0, 0, 1, 1)",
      "motion-keyframes-bounce": "{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }",
      "motion-keyframes-fade-in": "{ to { opacity: 1 } }",
      "motion-keyframes-pulse": "{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }",
      "motion-keyframes-spin": "{ to { transform: rotate(1turn) } }",
      "motion-keyframes-appear-above": "{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }",
      "motion-keyframes-appear-below": "{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }"
    },
    "shadow": {
      "shadow-0": "none",
      "shadow-100": "0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07)",
      "shadow-200": "0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)",
      "shadow-300": "0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)",
      "shadow-400": "0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)",
      "shadow-500": "0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)",
      "shadow-600": "0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)",
      "shadow-bevel-100": "0.0625rem 0rem 0rem 0rem rgba(0, 0, 0, 0.13) inset, -0.0625rem 0rem 0rem 0rem rgba(0, 0, 0, 0.13) inset, 0rem -0.0625rem 0rem 0rem rgba(0, 0, 0, 0.17) inset, 0rem 0.0625rem 0rem 0rem rgba(204, 204, 204, 0.5) inset",
      "shadow-inset-100": "0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset",
      "shadow-inset-200": "0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset",
      "shadow-button": "0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset",
      "shadow-button-hover": "0rem 0.0625rem 0rem 0rem #EBEBEB inset, -0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0rem -0.0625rem 0rem 0rem #CCC inset",
      "shadow-button-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.2) inset",
      "shadow-button-primary": "0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;",
      "shadow-button-primary-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.24) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.0625rem 0rem 0rem #000 inset, 0rem -0.0625rem 0rem 0.0625rem #1A1A1A",
      "shadow-button-primary-inset": "0rem 0.1875rem 0rem 0rem rgb(0, 0, 0) inset",
      "shadow-button-primary-critical": "0rem -0.0625rem 0rem 0.0625rem rgba(142, 31, 11, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(181, 38, 11, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.349) inset",
      "shadow-button-primary-critical-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset",
      "shadow-button-primary-critical-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset",
      "shadow-button-primary-success": "0rem -0.0625rem 0rem 0.0625rem rgba(12, 81, 50, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(19, 111, 69, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.251) inset",
      "shadow-button-primary-success-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset",
      "shadow-button-primary-success-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset",
      "shadow-border-inset": "0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset"
    },
    "space": {
      "space-0": "0rem",
      "space-025": "0.0625rem",
      "space-050": "0.125rem",
      "space-100": "0.25rem",
      "space-150": "0.375rem",
      "space-200": "0.5rem",
      "space-300": "0.75rem",
      "space-400": "1rem",
      "space-500": "1.25rem",
      "space-600": "1.5rem",
      "space-800": "2rem",
      "space-1000": "2.5rem",
      "space-1200": "3rem",
      "space-1600": "4rem",
      "space-2000": "5rem",
      "space-2400": "6rem",
      "space-2800": "7rem",
      "space-3200": "8rem",
      "space-button-group-gap": "0.5rem",
      "space-card-gap": "1rem",
      "space-card-padding": "1rem",
      "space-table-cell-padding": "0.375rem"
    },
    "text": {
      "text-heading-3xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-3xl-font-size": "2.25rem",
      "text-heading-3xl-font-weight": "700",
      "text-heading-3xl-font-letter-spacing": "-0.03375rem",
      "text-heading-3xl-font-line-height": "3rem",
      "text-heading-2xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-2xl-font-size": "1.875rem",
      "text-heading-2xl-font-weight": "700",
      "text-heading-2xl-font-letter-spacing": "-0.01875rem",
      "text-heading-2xl-font-line-height": "2.5rem",
      "text-heading-xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xl-font-size": "1.5rem",
      "text-heading-xl-font-weight": "700",
      "text-heading-xl-font-letter-spacing": "-0.0125rem",
      "text-heading-xl-font-line-height": "2rem",
      "text-heading-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-lg-font-size": "1.25rem",
      "text-heading-lg-font-weight": "650",
      "text-heading-lg-font-letter-spacing": "-0.0125rem",
      "text-heading-lg-font-line-height": "1.5rem",
      "text-heading-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-md-font-size": "0.875rem",
      "text-heading-md-font-weight": "650",
      "text-heading-md-font-letter-spacing": "0rem",
      "text-heading-md-font-line-height": "1.25rem",
      "text-heading-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-sm-font-size": "0.8125rem",
      "text-heading-sm-font-weight": "650",
      "text-heading-sm-font-letter-spacing": "0rem",
      "text-heading-sm-font-line-height": "1.25rem",
      "text-heading-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xs-font-size": "0.75rem",
      "text-heading-xs-font-weight": "650",
      "text-heading-xs-font-letter-spacing": "0rem",
      "text-heading-xs-font-line-height": "1rem",
      "text-body-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-lg-font-size": "0.875rem",
      "text-body-lg-font-weight": "450",
      "text-body-lg-font-letter-spacing": "0rem",
      "text-body-lg-font-line-height": "1.25rem",
      "text-body-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-md-font-size": "0.8125rem",
      "text-body-md-font-weight": "450",
      "text-body-md-font-letter-spacing": "0rem",
      "text-body-md-font-line-height": "1.25rem",
      "text-body-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-sm-font-size": "0.75rem",
      "text-body-sm-font-weight": "450",
      "text-body-sm-font-letter-spacing": "0rem",
      "text-body-sm-font-line-height": "1rem",
      "text-body-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-xs-font-size": "0.6875rem",
      "text-body-xs-font-weight": "450",
      "text-body-xs-font-letter-spacing": "0rem",
      "text-body-xs-font-line-height": "0.75rem"
    },
    "width": {
      "width-0": "0rem",
      "width-025": "0.0625rem",
      "width-050": "0.125rem",
      "width-100": "0.25rem",
      "width-150": "0.375rem",
      "width-200": "0.5rem",
      "width-300": "0.75rem",
      "width-400": "1rem",
      "width-500": "1.25rem",
      "width-600": "1.5rem",
      "width-700": "1.75rem",
      "width-800": "2rem",
      "width-900": "2.25rem",
      "width-1000": "2.5rem",
      "width-1200": "3rem",
      "width-1600": "4rem",
      "width-2000": "5rem",
      "width-2400": "6rem",
      "width-2800": "7rem",
      "width-3200": "8rem"
    },
    "zIndex": {
      "z-index-0": "auto",
      "z-index-1": "100",
      "z-index-2": "400",
      "z-index-3": "510",
      "z-index-4": "512",
      "z-index-5": "513",
      "z-index-6": "514",
      "z-index-7": "515",
      "z-index-8": "516",
      "z-index-9": "517",
      "z-index-10": "518",
      "z-index-11": "519",
      "z-index-12": "520"
    }
  },
  "light-mobile": {
    "border": {
      "border-radius-0": "0rem",
      "border-radius-050": "0.125rem",
      "border-radius-100": "0.25rem",
      "border-radius-150": "0.375rem",
      "border-radius-200": "0.5rem",
      "border-radius-300": "0.75rem",
      "border-radius-400": "1rem",
      "border-radius-500": "1.25rem",
      "border-radius-750": "1.875rem",
      "border-radius-full": "624.9375rem",
      "border-width-0": "0rem",
      "border-width-0165": "0.04125rem",
      "border-width-025": "0.0625rem",
      "border-width-050": "0.125rem",
      "border-width-100": "0.25rem"
    },
    "breakpoints": {
      "breakpoints-xs": "0rem",
      "breakpoints-sm": "30.625rem",
      "breakpoints-md": "48rem",
      "breakpoints-lg": "65rem",
      "breakpoints-xl": "90rem"
    },
    "color": {
      "color-scheme": "light",
      "color-bg": "rgba(241, 241, 241, 1)",
      "color-bg-inverse": "rgba(26, 26, 26, 1)",
      "color-bg-surface": "rgba(255, 255, 255, 1)",
      "color-bg-surface-hover": "rgba(247, 247, 247, 1)",
      "color-bg-surface-active": "rgba(243, 243, 243, 1)",
      "color-bg-surface-selected": "rgba(241, 241, 241, 1)",
      "color-bg-surface-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-surface-secondary": "rgba(247, 247, 247, 1)",
      "color-bg-surface-secondary-hover": "rgba(241, 241, 241, 1)",
      "color-bg-surface-secondary-active": "rgba(235, 235, 235, 1)",
      "color-bg-surface-secondary-selected": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary": "rgba(243, 243, 243, 1)",
      "color-bg-surface-tertiary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary-active": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-brand-active": "rgba(241, 241, 241, 1)",
      "color-bg-surface-brand-selected": "rgba(241, 241, 241, 1)",
      "color-bg-surface-info": "rgba(234, 244, 255, 1)",
      "color-bg-surface-info-hover": "rgba(224, 240, 255, 1)",
      "color-bg-surface-info-active": "rgba(202, 230, 255, 1)",
      "color-bg-surface-success": "rgba(205, 254, 225, 1)",
      "color-bg-surface-success-hover": "rgba(180, 254, 210, 1)",
      "color-bg-surface-success-active": "rgba(146, 254, 194, 1)",
      "color-bg-surface-caution": "rgba(255, 248, 219, 1)",
      "color-bg-surface-caution-hover": "rgba(255, 244, 191, 1)",
      "color-bg-surface-caution-active": "rgba(255, 239, 157, 1)",
      "color-bg-surface-warning": "rgba(255, 241, 227, 1)",
      "color-bg-surface-warning-hover": "rgba(255, 235, 213, 1)",
      "color-bg-surface-warning-active": "rgba(255, 228, 198, 1)",
      "color-bg-surface-critical": "rgba(254, 233, 232, 1)",
      "color-bg-surface-critical-hover": "rgba(254, 226, 225, 1)",
      "color-bg-surface-critical-active": "rgba(254, 218, 217, 1)",
      "color-bg-surface-emphasis": "rgba(240, 242, 255, 1)",
      "color-bg-surface-emphasis-hover": "rgba(234, 237, 255, 1)",
      "color-bg-surface-emphasis-active": "rgba(226, 231, 255, 1)",
      "color-bg-surface-magic": "rgba(248, 247, 255, 1)",
      "color-bg-surface-magic-hover": "rgba(243, 241, 255, 1)",
      "color-bg-surface-magic-active": "rgba(233, 229, 255, 1)",
      "color-bg-surface-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-surface-transparent": "rgba(0, 0, 0, 0)",
      "color-bg-fill": "rgba(255, 255, 255, 1)",
      "color-bg-fill-hover": "rgba(250, 250, 250, 1)",
      "color-bg-fill-active": "rgba(247, 247, 247, 1)",
      "color-bg-fill-selected": "rgba(204, 204, 204, 1)",
      "color-bg-fill-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-fill-secondary": "rgba(241, 241, 241, 1)",
      "color-bg-fill-secondary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-fill-secondary-active": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary-hover": "rgba(212, 212, 212, 1)",
      "color-bg-fill-tertiary-active": "rgba(204, 204, 204, 1)",
      "color-bg-fill-brand": "rgba(48, 48, 48, 1)",
      "color-bg-fill-brand-hover": "rgba(26, 26, 26, 1)",
      "color-bg-fill-brand-active": "rgba(26, 26, 26, 1)",
      "color-bg-fill-brand-selected": "rgba(48, 48, 48, 1)",
      "color-bg-fill-brand-disabled": "rgba(0, 0, 0, 0.17)",
      "color-bg-fill-info": "rgba(145, 208, 255, 1)",
      "color-bg-fill-info-hover": "rgba(81, 192, 255, 1)",
      "color-bg-fill-info-active": "rgba(0, 148, 213, 1)",
      "color-bg-fill-info-secondary": "rgba(213, 235, 255, 1)",
      "color-bg-fill-success": "rgba(41, 132, 90, 1)",
      "color-bg-fill-success-hover": "rgba(19, 111, 69, 1)",
      "color-bg-fill-success-active": "rgba(12, 81, 50, 1)",
      "color-bg-fill-success-secondary": "rgba(180, 254, 210, 1)",
      "color-bg-fill-warning": "rgba(255, 184, 0, 1)",
      "color-bg-fill-warning-hover": "rgba(229, 165, 0, 1)",
      "color-bg-fill-warning-active": "rgba(178, 132, 0, 1)",
      "color-bg-fill-warning-secondary": "rgba(255, 214, 164, 1)",
      "color-bg-fill-caution": "rgba(255, 230, 0, 1)",
      "color-bg-fill-caution-hover": "rgba(234, 211, 0, 1)",
      "color-bg-fill-caution-active": "rgba(225, 203, 0, 1)",
      "color-bg-fill-caution-secondary": "rgba(255, 235, 120, 1)",
      "color-bg-fill-critical": "rgba(229, 28, 0, 1)",
      "color-bg-fill-critical-hover": "rgba(181, 38, 11, 1)",
      "color-bg-fill-critical-active": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-selected": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-secondary": "rgba(254, 211, 209, 1)",
      "color-bg-fill-emphasis": "rgba(0, 91, 211, 1)",
      "color-bg-fill-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-bg-fill-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-bg-fill-magic": "rgba(128, 81, 255, 1)",
      "color-bg-fill-magic-secondary": "rgba(233, 229, 255, 1)",
      "color-bg-fill-magic-secondary-hover": "rgba(228, 222, 255, 1)",
      "color-bg-fill-magic-secondary-active": "rgba(223, 217, 255, 1)",
      "color-bg-fill-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-fill-inverse-hover": "rgba(74, 74, 74, 1)",
      "color-bg-fill-inverse-active": "rgba(97, 97, 97, 1)",
      "color-bg-fill-transparent": "rgba(0, 0, 0, 0.02)",
      "color-bg-fill-transparent-hover": "rgba(0, 0, 0, 0.05)",
      "color-bg-fill-transparent-active": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-selected": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-secondary": "rgba(0, 0, 0, 0.06)",
      "color-bg-fill-transparent-secondary-hover": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-secondary-active": "rgba(0, 0, 0, 0.11)",
      "color-text": "rgba(48, 48, 48, 1)",
      "color-text-secondary": "rgba(97, 97, 97, 1)",
      "color-text-disabled": "rgba(181, 181, 181, 1)",
      "color-text-link": "rgba(0, 91, 211, 1)",
      "color-text-link-hover": "rgba(0, 66, 153, 1)",
      "color-text-link-active": "rgba(0, 46, 106, 1)",
      "color-text-brand": "rgba(74, 74, 74, 1)",
      "color-text-brand-hover": "rgba(48, 48, 48, 1)",
      "color-text-brand-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-text-brand-on-bg-fill-hover": "rgba(227, 227, 227, 1)",
      "color-text-brand-on-bg-fill-active": "rgba(204, 204, 204, 1)",
      "color-text-brand-on-bg-fill-disabled": "rgba(255, 255, 255, 1)",
      "color-text-info": "rgba(0, 58, 90, 1)",
      "color-text-info-hover": "rgba(0, 58, 90, 1)",
      "color-text-info-active": "rgba(0, 33, 51, 1)",
      "color-text-info-secondary": "rgba(0, 124, 180, 1)",
      "color-text-info-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-text-success": "rgba(12, 81, 50, 1)",
      "color-text-success-hover": "rgba(8, 61, 37, 1)",
      "color-text-success-active": "rgba(9, 42, 27, 1)",
      "color-text-success-secondary": "rgba(41, 132, 90, 1)",
      "color-text-success-on-bg-fill": "rgba(248, 255, 251, 1)",
      "color-text-caution": "rgba(79, 71, 0, 1)",
      "color-text-caution-hover": "rgba(51, 46, 0, 1)",
      "color-text-caution-active": "rgba(31, 28, 0, 1)",
      "color-text-caution-secondary": "rgba(130, 117, 0, 1)",
      "color-text-caution-on-bg-fill": "rgba(51, 46, 0, 1)",
      "color-text-warning": "rgba(94, 66, 0, 1)",
      "color-text-warning-hover": "rgba(65, 45, 0, 1)",
      "color-text-warning-active": "rgba(37, 26, 0, 1)",
      "color-text-warning-secondary": "rgba(149, 111, 0, 1)",
      "color-text-warning-on-bg-fill": "rgba(37, 26, 0, 1)",
      "color-text-critical": "rgba(142, 31, 11, 1)",
      "color-text-critical-hover": "rgba(95, 21, 7, 1)",
      "color-text-critical-active": "rgba(47, 10, 4, 1)",
      "color-text-critical-secondary": "rgba(229, 28, 0, 1)",
      "color-text-critical-on-bg-fill": "rgba(255, 251, 251, 1)",
      "color-text-emphasis": "rgba(0, 91, 211, 1)",
      "color-text-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-text-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-text-emphasis-on-bg-fill": "rgba(252, 253, 255, 1)",
      "color-text-emphasis-on-bg-fill-hover": "rgba(226, 231, 255, 1)",
      "color-text-emphasis-on-bg-fill-active": "rgba(213, 220, 255, 1)",
      "color-text-magic": "rgba(87, 0, 209, 1)",
      "color-text-magic-secondary": "rgba(113, 38, 255, 1)",
      "color-text-magic-on-bg-fill": "rgba(253, 253, 255, 1)",
      "color-text-inverse": "rgba(227, 227, 227, 1)",
      "color-text-inverse-secondary": "rgba(181, 181, 181, 1)",
      "color-text-link-inverse": "rgba(197, 208, 255, 1)",
      "color-border": "rgba(227, 227, 227, 1)",
      "color-border-hover": "rgba(204, 204, 204, 1)",
      "color-border-disabled": "rgba(235, 235, 235, 1)",
      "color-border-secondary": "rgba(235, 235, 235, 1)",
      "color-border-tertiary": "rgba(204, 204, 204, 1)",
      "color-border-focus": "rgba(0, 91, 211, 1)",
      "color-border-brand": "rgba(227, 227, 227, 1)",
      "color-border-info": "rgba(168, 216, 255, 1)",
      "color-border-success": "rgba(146, 254, 194, 1)",
      "color-border-caution": "rgba(255, 235, 120, 1)",
      "color-border-warning": "rgba(255, 200, 121, 1)",
      "color-border-critical": "rgba(254, 195, 193, 1)",
      "color-border-critical-secondary": "rgba(142, 31, 11, 1)",
      "color-border-emphasis": "rgba(0, 91, 211, 1)",
      "color-border-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-border-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-border-magic": "rgba(228, 222, 255, 1)",
      "color-border-magic-secondary": "rgba(148, 116, 255, 1)",
      "color-border-magic-secondary-hover": "rgba(128, 81, 255, 1)",
      "color-border-inverse": "rgba(97, 97, 97, 1)",
      "color-border-inverse-hover": "rgba(204, 204, 204, 1)",
      "color-border-inverse-active": "rgba(227, 227, 227, 1)",
      "color-tooltip-tail-down-border-experimental": "rgba(212, 212, 212, 1)",
      "color-tooltip-tail-up-border-experimental": "rgba(227, 227, 227, 1)",
      "color-border-gradient-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-hover-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-selected-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-active-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-icon": "rgba(74, 74, 74, 1)",
      "color-icon-hover": "rgba(48, 48, 48, 1)",
      "color-icon-active": "rgba(26, 26, 26, 1)",
      "color-icon-disabled": "rgba(204, 204, 204, 1)",
      "color-icon-secondary": "rgba(138, 138, 138, 1)",
      "color-icon-secondary-hover": "rgba(97, 97, 97, 1)",
      "color-icon-secondary-active": "rgba(74, 74, 74, 1)",
      "color-icon-brand": "rgba(26, 26, 26, 1)",
      "color-icon-info": "rgba(0, 148, 213, 1)",
      "color-icon-success": "rgba(41, 132, 90, 1)",
      "color-icon-caution": "rgba(153, 138, 0, 1)",
      "color-icon-warning": "rgba(178, 132, 0, 1)",
      "color-icon-critical": "rgba(239, 77, 47, 1)",
      "color-icon-emphasis": "rgba(0, 91, 211, 1)",
      "color-icon-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-icon-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-icon-magic": "rgba(128, 81, 255, 1)",
      "color-icon-inverse": "rgba(227, 227, 227, 1)",
      "color-avatar-bg-fill": "rgba(181, 181, 181, 1)",
      "color-avatar-five-bg-fill": "rgba(253, 75, 146, 1)",
      "color-avatar-five-text-on-bg-fill": "rgba(255, 246, 248, 1)",
      "color-avatar-four-bg-fill": "rgba(81, 192, 255, 1)",
      "color-avatar-four-text-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-avatar-one-bg-fill": "rgba(197, 48, 197, 1)",
      "color-avatar-one-text-on-bg-fill": "rgba(253, 239, 253, 1)",
      "color-avatar-seven-bg-fill": "rgba(148, 116, 255, 1)",
      "color-avatar-seven-text-on-bg-fill": "rgba(248, 247, 255, 1)",
      "color-avatar-six-bg-fill": "rgba(37, 232, 43, 1)",
      "color-avatar-six-text-on-bg-fill": "rgba(3, 61, 5, 1)",
      "color-avatar-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-avatar-three-bg-fill": "rgba(44, 224, 212, 1)",
      "color-avatar-three-text-on-bg-fill": "rgba(3, 60, 57, 1)",
      "color-avatar-two-bg-fill": "rgba(56, 250, 163, 1)",
      "color-avatar-two-text-on-bg-fill": "rgba(12, 81, 50, 1)",
      "color-backdrop-bg": "rgba(0, 0, 0, 0.71)",
      "color-button-gradient-bg-fill": "none",
      "color-checkbox-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-checkbox-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-input-bg-surface": "rgba(253, 253, 253, 1)",
      "color-input-bg-surface-hover": "rgba(250, 250, 250, 1)",
      "color-input-bg-surface-active": "rgba(247, 247, 247, 1)",
      "color-input-border": "rgba(138, 138, 138, 1)",
      "color-input-border-hover": "rgba(97, 97, 97, 1)",
      "color-input-border-active": "rgba(26, 26, 26, 1)",
      "color-nav-bg": "rgba(235, 235, 235, 1)",
      "color-nav-bg-surface": "rgba(0, 0, 0, 0.02)",
      "color-nav-bg-surface-hover": "rgba(241, 241, 241, 1)",
      "color-nav-bg-surface-active": "rgba(250, 250, 250, 1)",
      "color-nav-bg-surface-selected": "rgba(250, 250, 250, 1)",
      "color-radio-button-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-radio-button-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-video-thumbnail-play-button-bg-fill-hover": "rgba(0, 0, 0, 0.81)",
      "color-video-thumbnail-play-button-bg-fill": "rgba(0, 0, 0, 0.71)",
      "color-video-thumbnail-play-button-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-scrollbar-thumb-bg-hover": "rgba(138, 138, 138, 1)"
    },
    "font": {
      "font-family-sans": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "font-family-mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      "font-size-275": "0.6875rem",
      "font-size-300": "0.75rem",
      "font-size-325": "0.8125rem",
      "font-size-350": "0.875rem",
      "font-size-400": "1rem",
      "font-size-450": "1.125rem",
      "font-size-500": "1.25rem",
      "font-size-550": "1.375rem",
      "font-size-600": "1.5rem",
      "font-size-750": "1.875rem",
      "font-size-800": "2rem",
      "font-size-900": "2.25rem",
      "font-size-1000": "2.5rem",
      "font-weight-regular": "450",
      "font-weight-medium": "550",
      "font-weight-semibold": "650",
      "font-weight-bold": "700",
      "font-letter-spacing-densest": "-0.03375rem",
      "font-letter-spacing-denser": "-0.01875rem",
      "font-letter-spacing-dense": "-0.0125rem",
      "font-letter-spacing-normal": "0rem",
      "font-line-height-300": "0.75rem",
      "font-line-height-400": "1rem",
      "font-line-height-500": "1.25rem",
      "font-line-height-600": "1.5rem",
      "font-line-height-700": "1.75rem",
      "font-line-height-800": "2rem",
      "font-line-height-1000": "2.5rem",
      "font-line-height-1200": "3rem"
    },
    "height": {
      "height-0": "0rem",
      "height-025": "0.0625rem",
      "height-050": "0.125rem",
      "height-100": "0.25rem",
      "height-150": "0.375rem",
      "height-200": "0.5rem",
      "height-300": "0.75rem",
      "height-400": "1rem",
      "height-500": "1.25rem",
      "height-600": "1.5rem",
      "height-700": "1.75rem",
      "height-800": "2rem",
      "height-900": "2.25rem",
      "height-1000": "2.5rem",
      "height-1200": "3rem",
      "height-1600": "4rem",
      "height-2000": "5rem",
      "height-2400": "6rem",
      "height-2800": "7rem",
      "height-3200": "8rem"
    },
    "motion": {
      "motion-duration-0": "0ms",
      "motion-duration-50": "50ms",
      "motion-duration-100": "100ms",
      "motion-duration-150": "150ms",
      "motion-duration-200": "200ms",
      "motion-duration-250": "250ms",
      "motion-duration-300": "300ms",
      "motion-duration-350": "350ms",
      "motion-duration-400": "400ms",
      "motion-duration-450": "450ms",
      "motion-duration-500": "500ms",
      "motion-duration-5000": "5000ms",
      "motion-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      "motion-ease-in": "cubic-bezier(0.42, 0, 1, 1)",
      "motion-ease-out": "cubic-bezier(0.19, 0.91, 0.38, 1)",
      "motion-ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
      "motion-linear": "cubic-bezier(0, 0, 1, 1)",
      "motion-keyframes-bounce": "{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }",
      "motion-keyframes-fade-in": "{ to { opacity: 1 } }",
      "motion-keyframes-pulse": "{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }",
      "motion-keyframes-spin": "{ to { transform: rotate(1turn) } }",
      "motion-keyframes-appear-above": "{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }",
      "motion-keyframes-appear-below": "{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }"
    },
    "shadow": {
      "shadow-0": "none",
      "shadow-100": "none",
      "shadow-200": "0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)",
      "shadow-300": "0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)",
      "shadow-400": "0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)",
      "shadow-500": "0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)",
      "shadow-600": "0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)",
      "shadow-bevel-100": "none",
      "shadow-inset-100": "0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset",
      "shadow-inset-200": "0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset",
      "shadow-button": "0 0 0 var(--p-border-width-025) var(--p-color-border) inset",
      "shadow-button-hover": "0 0 0 var(--p-border-width-025) var(--p-color-border) inset",
      "shadow-button-inset": "0 0 0 var(--p-border-width-025) var(--p-color-border) inset",
      "shadow-button-primary": "none",
      "shadow-button-primary-hover": "none",
      "shadow-button-primary-inset": "none",
      "shadow-button-primary-critical": "none",
      "shadow-button-primary-critical-hover": "none",
      "shadow-button-primary-critical-inset": "none",
      "shadow-button-primary-success": "none",
      "shadow-button-primary-success-hover": "none",
      "shadow-button-primary-success-inset": "none",
      "shadow-border-inset": "0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset"
    },
    "space": {
      "space-0": "0rem",
      "space-025": "0.0625rem",
      "space-050": "0.125rem",
      "space-100": "0.25rem",
      "space-150": "0.375rem",
      "space-200": "0.5rem",
      "space-300": "0.75rem",
      "space-400": "1rem",
      "space-500": "1.25rem",
      "space-600": "1.5rem",
      "space-800": "2rem",
      "space-1000": "2.5rem",
      "space-1200": "3rem",
      "space-1600": "4rem",
      "space-2000": "5rem",
      "space-2400": "6rem",
      "space-2800": "7rem",
      "space-3200": "8rem",
      "space-button-group-gap": "0.5rem",
      "space-card-gap": "0.5rem",
      "space-card-padding": "1rem",
      "space-table-cell-padding": "0.375rem"
    },
    "text": {
      "text-heading-3xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-3xl-font-size": "2.25rem",
      "text-heading-3xl-font-weight": "700",
      "text-heading-3xl-font-letter-spacing": "-0.03375rem",
      "text-heading-3xl-font-line-height": "3rem",
      "text-heading-2xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-2xl-font-size": "2rem",
      "text-heading-2xl-font-weight": "700",
      "text-heading-2xl-font-letter-spacing": "-0.01875rem",
      "text-heading-2xl-font-line-height": "2.5rem",
      "text-heading-xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xl-font-size": "1.375rem",
      "text-heading-xl-font-weight": "700",
      "text-heading-xl-font-letter-spacing": "-0.0125rem",
      "text-heading-xl-font-line-height": "1.75rem",
      "text-heading-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-lg-font-size": "1.125rem",
      "text-heading-lg-font-weight": "650",
      "text-heading-lg-font-letter-spacing": "-0.0125rem",
      "text-heading-lg-font-line-height": "1.5rem",
      "text-heading-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-md-font-size": "1rem",
      "text-heading-md-font-weight": "650",
      "text-heading-md-font-letter-spacing": "0rem",
      "text-heading-md-font-line-height": "1.25rem",
      "text-heading-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-sm-font-size": "0.875rem",
      "text-heading-sm-font-weight": "650",
      "text-heading-sm-font-letter-spacing": "0rem",
      "text-heading-sm-font-line-height": "1.25rem",
      "text-heading-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xs-font-size": "0.75rem",
      "text-heading-xs-font-weight": "650",
      "text-heading-xs-font-letter-spacing": "0rem",
      "text-heading-xs-font-line-height": "1rem",
      "text-body-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-lg-font-size": "1.125rem",
      "text-body-lg-font-weight": "450",
      "text-body-lg-font-letter-spacing": "0rem",
      "text-body-lg-font-line-height": "1.75rem",
      "text-body-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-md-font-size": "1rem",
      "text-body-md-font-weight": "450",
      "text-body-md-font-letter-spacing": "0rem",
      "text-body-md-font-line-height": "1.5rem",
      "text-body-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-sm-font-size": "0.875rem",
      "text-body-sm-font-weight": "450",
      "text-body-sm-font-letter-spacing": "0rem",
      "text-body-sm-font-line-height": "1.25rem",
      "text-body-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-xs-font-size": "0.75rem",
      "text-body-xs-font-weight": "450",
      "text-body-xs-font-letter-spacing": "0rem",
      "text-body-xs-font-line-height": "1rem"
    },
    "width": {
      "width-0": "0rem",
      "width-025": "0.0625rem",
      "width-050": "0.125rem",
      "width-100": "0.25rem",
      "width-150": "0.375rem",
      "width-200": "0.5rem",
      "width-300": "0.75rem",
      "width-400": "1rem",
      "width-500": "1.25rem",
      "width-600": "1.5rem",
      "width-700": "1.75rem",
      "width-800": "2rem",
      "width-900": "2.25rem",
      "width-1000": "2.5rem",
      "width-1200": "3rem",
      "width-1600": "4rem",
      "width-2000": "5rem",
      "width-2400": "6rem",
      "width-2800": "7rem",
      "width-3200": "8rem"
    },
    "zIndex": {
      "z-index-0": "auto",
      "z-index-1": "100",
      "z-index-2": "400",
      "z-index-3": "510",
      "z-index-4": "512",
      "z-index-5": "513",
      "z-index-6": "514",
      "z-index-7": "515",
      "z-index-8": "516",
      "z-index-9": "517",
      "z-index-10": "518",
      "z-index-11": "519",
      "z-index-12": "520"
    }
  },
  "light-high-contrast-experimental": {
    "border": {
      "border-radius-0": "0rem",
      "border-radius-050": "0.125rem",
      "border-radius-100": "0.25rem",
      "border-radius-150": "0.375rem",
      "border-radius-200": "0.5rem",
      "border-radius-300": "0.75rem",
      "border-radius-400": "1rem",
      "border-radius-500": "1.25rem",
      "border-radius-750": "1.875rem",
      "border-radius-full": "624.9375rem",
      "border-width-0": "0rem",
      "border-width-0165": "0.04125rem",
      "border-width-025": "0.0625rem",
      "border-width-050": "0.125rem",
      "border-width-100": "0.25rem"
    },
    "breakpoints": {
      "breakpoints-xs": "0rem",
      "breakpoints-sm": "30.625rem",
      "breakpoints-md": "48rem",
      "breakpoints-lg": "65rem",
      "breakpoints-xl": "90rem"
    },
    "color": {
      "color-scheme": "light",
      "color-bg": "rgba(241, 241, 241, 1)",
      "color-bg-inverse": "rgba(26, 26, 26, 1)",
      "color-bg-surface": "rgba(255, 255, 255, 1)",
      "color-bg-surface-hover": "rgba(247, 247, 247, 1)",
      "color-bg-surface-active": "rgba(243, 243, 243, 1)",
      "color-bg-surface-selected": "rgba(241, 241, 241, 1)",
      "color-bg-surface-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-surface-secondary": "rgba(241, 241, 241, 1)",
      "color-bg-surface-secondary-hover": "rgba(241, 241, 241, 1)",
      "color-bg-surface-secondary-active": "rgba(235, 235, 235, 1)",
      "color-bg-surface-secondary-selected": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary": "rgba(243, 243, 243, 1)",
      "color-bg-surface-tertiary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary-active": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-brand-active": "rgba(241, 241, 241, 1)",
      "color-bg-surface-brand-selected": "rgba(241, 241, 241, 1)",
      "color-bg-surface-info": "rgba(234, 244, 255, 1)",
      "color-bg-surface-info-hover": "rgba(224, 240, 255, 1)",
      "color-bg-surface-info-active": "rgba(202, 230, 255, 1)",
      "color-bg-surface-success": "rgba(205, 254, 225, 1)",
      "color-bg-surface-success-hover": "rgba(180, 254, 210, 1)",
      "color-bg-surface-success-active": "rgba(146, 254, 194, 1)",
      "color-bg-surface-caution": "rgba(255, 248, 219, 1)",
      "color-bg-surface-caution-hover": "rgba(255, 244, 191, 1)",
      "color-bg-surface-caution-active": "rgba(255, 239, 157, 1)",
      "color-bg-surface-warning": "rgba(255, 241, 227, 1)",
      "color-bg-surface-warning-hover": "rgba(255, 235, 213, 1)",
      "color-bg-surface-warning-active": "rgba(255, 228, 198, 1)",
      "color-bg-surface-critical": "rgba(254, 233, 232, 1)",
      "color-bg-surface-critical-hover": "rgba(254, 226, 225, 1)",
      "color-bg-surface-critical-active": "rgba(254, 218, 217, 1)",
      "color-bg-surface-emphasis": "rgba(240, 242, 255, 1)",
      "color-bg-surface-emphasis-hover": "rgba(234, 237, 255, 1)",
      "color-bg-surface-emphasis-active": "rgba(226, 231, 255, 1)",
      "color-bg-surface-magic": "rgba(248, 247, 255, 1)",
      "color-bg-surface-magic-hover": "rgba(243, 241, 255, 1)",
      "color-bg-surface-magic-active": "rgba(233, 229, 255, 1)",
      "color-bg-surface-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-surface-transparent": "rgba(0, 0, 0, 0)",
      "color-bg-fill": "rgba(255, 255, 255, 1)",
      "color-bg-fill-hover": "rgba(250, 250, 250, 1)",
      "color-bg-fill-active": "rgba(247, 247, 247, 1)",
      "color-bg-fill-selected": "rgba(204, 204, 204, 1)",
      "color-bg-fill-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-fill-secondary": "rgba(241, 241, 241, 1)",
      "color-bg-fill-secondary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-fill-secondary-active": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary-hover": "rgba(212, 212, 212, 1)",
      "color-bg-fill-tertiary-active": "rgba(204, 204, 204, 1)",
      "color-bg-fill-brand": "rgba(48, 48, 48, 1)",
      "color-bg-fill-brand-hover": "rgba(26, 26, 26, 1)",
      "color-bg-fill-brand-active": "rgba(26, 26, 26, 1)",
      "color-bg-fill-brand-selected": "rgba(48, 48, 48, 1)",
      "color-bg-fill-brand-disabled": "rgba(0, 0, 0, 0.17)",
      "color-bg-fill-info": "rgba(145, 208, 255, 1)",
      "color-bg-fill-info-hover": "rgba(81, 192, 255, 1)",
      "color-bg-fill-info-active": "rgba(0, 148, 213, 1)",
      "color-bg-fill-info-secondary": "rgba(213, 235, 255, 1)",
      "color-bg-fill-success": "rgba(41, 132, 90, 1)",
      "color-bg-fill-success-hover": "rgba(19, 111, 69, 1)",
      "color-bg-fill-success-active": "rgba(12, 81, 50, 1)",
      "color-bg-fill-success-secondary": "rgba(180, 254, 210, 1)",
      "color-bg-fill-warning": "rgba(255, 184, 0, 1)",
      "color-bg-fill-warning-hover": "rgba(229, 165, 0, 1)",
      "color-bg-fill-warning-active": "rgba(178, 132, 0, 1)",
      "color-bg-fill-warning-secondary": "rgba(255, 214, 164, 1)",
      "color-bg-fill-caution": "rgba(255, 230, 0, 1)",
      "color-bg-fill-caution-hover": "rgba(234, 211, 0, 1)",
      "color-bg-fill-caution-active": "rgba(225, 203, 0, 1)",
      "color-bg-fill-caution-secondary": "rgba(255, 235, 120, 1)",
      "color-bg-fill-critical": "rgba(229, 28, 0, 1)",
      "color-bg-fill-critical-hover": "rgba(181, 38, 11, 1)",
      "color-bg-fill-critical-active": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-selected": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-secondary": "rgba(254, 211, 209, 1)",
      "color-bg-fill-emphasis": "rgba(0, 91, 211, 1)",
      "color-bg-fill-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-bg-fill-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-bg-fill-magic": "rgba(128, 81, 255, 1)",
      "color-bg-fill-magic-secondary": "rgba(233, 229, 255, 1)",
      "color-bg-fill-magic-secondary-hover": "rgba(228, 222, 255, 1)",
      "color-bg-fill-magic-secondary-active": "rgba(223, 217, 255, 1)",
      "color-bg-fill-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-fill-inverse-hover": "rgba(74, 74, 74, 1)",
      "color-bg-fill-inverse-active": "rgba(97, 97, 97, 1)",
      "color-bg-fill-transparent": "rgba(0, 0, 0, 0.02)",
      "color-bg-fill-transparent-hover": "rgba(0, 0, 0, 0.05)",
      "color-bg-fill-transparent-active": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-selected": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-secondary": "rgba(0, 0, 0, 0.06)",
      "color-bg-fill-transparent-secondary-hover": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-secondary-active": "rgba(0, 0, 0, 0.11)",
      "color-text": "rgba(26, 26, 26, 1)",
      "color-text-secondary": "rgba(26, 26, 26, 1)",
      "color-text-disabled": "rgba(181, 181, 181, 1)",
      "color-text-link": "rgba(0, 91, 211, 1)",
      "color-text-link-hover": "rgba(0, 66, 153, 1)",
      "color-text-link-active": "rgba(0, 46, 106, 1)",
      "color-text-brand": "rgba(26, 26, 26, 1)",
      "color-text-brand-hover": "rgba(48, 48, 48, 1)",
      "color-text-brand-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-text-brand-on-bg-fill-hover": "rgba(227, 227, 227, 1)",
      "color-text-brand-on-bg-fill-active": "rgba(204, 204, 204, 1)",
      "color-text-brand-on-bg-fill-disabled": "rgba(255, 255, 255, 1)",
      "color-text-info": "rgba(0, 58, 90, 1)",
      "color-text-info-hover": "rgba(0, 58, 90, 1)",
      "color-text-info-active": "rgba(0, 33, 51, 1)",
      "color-text-info-secondary": "rgba(0, 124, 180, 1)",
      "color-text-info-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-text-success": "rgba(12, 81, 50, 1)",
      "color-text-success-hover": "rgba(8, 61, 37, 1)",
      "color-text-success-active": "rgba(9, 42, 27, 1)",
      "color-text-success-secondary": "rgba(41, 132, 90, 1)",
      "color-text-success-on-bg-fill": "rgba(248, 255, 251, 1)",
      "color-text-caution": "rgba(79, 71, 0, 1)",
      "color-text-caution-hover": "rgba(51, 46, 0, 1)",
      "color-text-caution-active": "rgba(31, 28, 0, 1)",
      "color-text-caution-secondary": "rgba(130, 117, 0, 1)",
      "color-text-caution-on-bg-fill": "rgba(51, 46, 0, 1)",
      "color-text-warning": "rgba(94, 66, 0, 1)",
      "color-text-warning-hover": "rgba(65, 45, 0, 1)",
      "color-text-warning-active": "rgba(37, 26, 0, 1)",
      "color-text-warning-secondary": "rgba(149, 111, 0, 1)",
      "color-text-warning-on-bg-fill": "rgba(37, 26, 0, 1)",
      "color-text-critical": "rgba(142, 31, 11, 1)",
      "color-text-critical-hover": "rgba(95, 21, 7, 1)",
      "color-text-critical-active": "rgba(47, 10, 4, 1)",
      "color-text-critical-secondary": "rgba(229, 28, 0, 1)",
      "color-text-critical-on-bg-fill": "rgba(255, 251, 251, 1)",
      "color-text-emphasis": "rgba(0, 91, 211, 1)",
      "color-text-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-text-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-text-emphasis-on-bg-fill": "rgba(252, 253, 255, 1)",
      "color-text-emphasis-on-bg-fill-hover": "rgba(226, 231, 255, 1)",
      "color-text-emphasis-on-bg-fill-active": "rgba(213, 220, 255, 1)",
      "color-text-magic": "rgba(87, 0, 209, 1)",
      "color-text-magic-secondary": "rgba(113, 38, 255, 1)",
      "color-text-magic-on-bg-fill": "rgba(253, 253, 255, 1)",
      "color-text-inverse": "rgba(227, 227, 227, 1)",
      "color-text-inverse-secondary": "rgba(181, 181, 181, 1)",
      "color-text-link-inverse": "rgba(197, 208, 255, 1)",
      "color-border": "rgba(138, 138, 138, 1)",
      "color-border-hover": "rgba(204, 204, 204, 1)",
      "color-border-disabled": "rgba(235, 235, 235, 1)",
      "color-border-secondary": "rgba(138, 138, 138, 1)",
      "color-border-tertiary": "rgba(204, 204, 204, 1)",
      "color-border-focus": "rgba(0, 91, 211, 1)",
      "color-border-brand": "rgba(227, 227, 227, 1)",
      "color-border-info": "rgba(168, 216, 255, 1)",
      "color-border-success": "rgba(146, 254, 194, 1)",
      "color-border-caution": "rgba(255, 235, 120, 1)",
      "color-border-warning": "rgba(255, 200, 121, 1)",
      "color-border-critical": "rgba(254, 195, 193, 1)",
      "color-border-critical-secondary": "rgba(142, 31, 11, 1)",
      "color-border-emphasis": "rgba(0, 91, 211, 1)",
      "color-border-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-border-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-border-magic": "rgba(228, 222, 255, 1)",
      "color-border-magic-secondary": "rgba(148, 116, 255, 1)",
      "color-border-magic-secondary-hover": "rgba(128, 81, 255, 1)",
      "color-border-inverse": "rgba(97, 97, 97, 1)",
      "color-border-inverse-hover": "rgba(204, 204, 204, 1)",
      "color-border-inverse-active": "rgba(227, 227, 227, 1)",
      "color-tooltip-tail-down-border-experimental": "rgba(212, 212, 212, 1)",
      "color-tooltip-tail-up-border-experimental": "rgba(227, 227, 227, 1)",
      "color-border-gradient-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-hover-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-selected-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-border-gradient-active-experimental": "linear-gradient(to bottom, rgba(235, 235, 235, 1), rgba(204, 204, 204, 1) 78%, rgba(181, 181, 181, 1))",
      "color-icon": "rgba(74, 74, 74, 1)",
      "color-icon-hover": "rgba(48, 48, 48, 1)",
      "color-icon-active": "rgba(26, 26, 26, 1)",
      "color-icon-disabled": "rgba(204, 204, 204, 1)",
      "color-icon-secondary": "rgba(74, 74, 74, 1)",
      "color-icon-secondary-hover": "rgba(97, 97, 97, 1)",
      "color-icon-secondary-active": "rgba(74, 74, 74, 1)",
      "color-icon-brand": "rgba(26, 26, 26, 1)",
      "color-icon-info": "rgba(0, 148, 213, 1)",
      "color-icon-success": "rgba(41, 132, 90, 1)",
      "color-icon-caution": "rgba(153, 138, 0, 1)",
      "color-icon-warning": "rgba(178, 132, 0, 1)",
      "color-icon-critical": "rgba(239, 77, 47, 1)",
      "color-icon-emphasis": "rgba(0, 91, 211, 1)",
      "color-icon-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-icon-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-icon-magic": "rgba(128, 81, 255, 1)",
      "color-icon-inverse": "rgba(227, 227, 227, 1)",
      "color-avatar-bg-fill": "rgba(181, 181, 181, 1)",
      "color-avatar-five-bg-fill": "rgba(253, 75, 146, 1)",
      "color-avatar-five-text-on-bg-fill": "rgba(255, 246, 248, 1)",
      "color-avatar-four-bg-fill": "rgba(81, 192, 255, 1)",
      "color-avatar-four-text-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-avatar-one-bg-fill": "rgba(197, 48, 197, 1)",
      "color-avatar-one-text-on-bg-fill": "rgba(253, 239, 253, 1)",
      "color-avatar-seven-bg-fill": "rgba(148, 116, 255, 1)",
      "color-avatar-seven-text-on-bg-fill": "rgba(248, 247, 255, 1)",
      "color-avatar-six-bg-fill": "rgba(37, 232, 43, 1)",
      "color-avatar-six-text-on-bg-fill": "rgba(3, 61, 5, 1)",
      "color-avatar-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-avatar-three-bg-fill": "rgba(44, 224, 212, 1)",
      "color-avatar-three-text-on-bg-fill": "rgba(3, 60, 57, 1)",
      "color-avatar-two-bg-fill": "rgba(56, 250, 163, 1)",
      "color-avatar-two-text-on-bg-fill": "rgba(12, 81, 50, 1)",
      "color-backdrop-bg": "rgba(0, 0, 0, 0.71)",
      "color-button-gradient-bg-fill": "linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)",
      "color-checkbox-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-checkbox-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-input-bg-surface": "rgba(253, 253, 253, 1)",
      "color-input-bg-surface-hover": "rgba(250, 250, 250, 1)",
      "color-input-bg-surface-active": "rgba(247, 247, 247, 1)",
      "color-input-border": "rgba(74, 74, 74, 1)",
      "color-input-border-hover": "rgba(97, 97, 97, 1)",
      "color-input-border-active": "rgba(26, 26, 26, 1)",
      "color-nav-bg": "rgba(235, 235, 235, 1)",
      "color-nav-bg-surface": "rgba(0, 0, 0, 0.02)",
      "color-nav-bg-surface-hover": "rgba(241, 241, 241, 1)",
      "color-nav-bg-surface-active": "rgba(250, 250, 250, 1)",
      "color-nav-bg-surface-selected": "rgba(250, 250, 250, 1)",
      "color-radio-button-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-radio-button-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-video-thumbnail-play-button-bg-fill-hover": "rgba(0, 0, 0, 0.81)",
      "color-video-thumbnail-play-button-bg-fill": "rgba(0, 0, 0, 0.71)",
      "color-video-thumbnail-play-button-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-scrollbar-thumb-bg-hover": "rgba(138, 138, 138, 1)"
    },
    "font": {
      "font-family-sans": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "font-family-mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      "font-size-275": "0.6875rem",
      "font-size-300": "0.75rem",
      "font-size-325": "0.8125rem",
      "font-size-350": "0.875rem",
      "font-size-400": "1rem",
      "font-size-450": "1.125rem",
      "font-size-500": "1.25rem",
      "font-size-550": "1.375rem",
      "font-size-600": "1.5rem",
      "font-size-750": "1.875rem",
      "font-size-800": "2rem",
      "font-size-900": "2.25rem",
      "font-size-1000": "2.5rem",
      "font-weight-regular": "450",
      "font-weight-medium": "550",
      "font-weight-semibold": "650",
      "font-weight-bold": "700",
      "font-letter-spacing-densest": "-0.03375rem",
      "font-letter-spacing-denser": "-0.01875rem",
      "font-letter-spacing-dense": "-0.0125rem",
      "font-letter-spacing-normal": "0rem",
      "font-line-height-300": "0.75rem",
      "font-line-height-400": "1rem",
      "font-line-height-500": "1.25rem",
      "font-line-height-600": "1.5rem",
      "font-line-height-700": "1.75rem",
      "font-line-height-800": "2rem",
      "font-line-height-1000": "2.5rem",
      "font-line-height-1200": "3rem"
    },
    "height": {
      "height-0": "0rem",
      "height-025": "0.0625rem",
      "height-050": "0.125rem",
      "height-100": "0.25rem",
      "height-150": "0.375rem",
      "height-200": "0.5rem",
      "height-300": "0.75rem",
      "height-400": "1rem",
      "height-500": "1.25rem",
      "height-600": "1.5rem",
      "height-700": "1.75rem",
      "height-800": "2rem",
      "height-900": "2.25rem",
      "height-1000": "2.5rem",
      "height-1200": "3rem",
      "height-1600": "4rem",
      "height-2000": "5rem",
      "height-2400": "6rem",
      "height-2800": "7rem",
      "height-3200": "8rem"
    },
    "motion": {
      "motion-duration-0": "0ms",
      "motion-duration-50": "50ms",
      "motion-duration-100": "100ms",
      "motion-duration-150": "150ms",
      "motion-duration-200": "200ms",
      "motion-duration-250": "250ms",
      "motion-duration-300": "300ms",
      "motion-duration-350": "350ms",
      "motion-duration-400": "400ms",
      "motion-duration-450": "450ms",
      "motion-duration-500": "500ms",
      "motion-duration-5000": "5000ms",
      "motion-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      "motion-ease-in": "cubic-bezier(0.42, 0, 1, 1)",
      "motion-ease-out": "cubic-bezier(0.19, 0.91, 0.38, 1)",
      "motion-ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
      "motion-linear": "cubic-bezier(0, 0, 1, 1)",
      "motion-keyframes-bounce": "{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }",
      "motion-keyframes-fade-in": "{ to { opacity: 1 } }",
      "motion-keyframes-pulse": "{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }",
      "motion-keyframes-spin": "{ to { transform: rotate(1turn) } }",
      "motion-keyframes-appear-above": "{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }",
      "motion-keyframes-appear-below": "{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }"
    },
    "shadow": {
      "shadow-0": "none",
      "shadow-100": "0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07)",
      "shadow-200": "0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)",
      "shadow-300": "0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)",
      "shadow-400": "0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)",
      "shadow-500": "0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)",
      "shadow-600": "0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)",
      "shadow-bevel-100": "0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07), 0rem 0.0625rem 0rem 0rem rgba(208, 208, 208, 0.40) inset, 0.0625rem 0rem 0rem 0rem #CCC inset, -0.0625rem 0rem 0rem 0rem #CCC inset, 0rem -0.0625rem 0rem 0rem #999 inset",
      "shadow-inset-100": "0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset",
      "shadow-inset-200": "0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset",
      "shadow-button": "0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset",
      "shadow-button-hover": "0rem 0.0625rem 0rem 0rem #EBEBEB inset, -0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0rem -0.0625rem 0rem 0rem #CCC inset",
      "shadow-button-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.2) inset",
      "shadow-button-primary": "0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;",
      "shadow-button-primary-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.24) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.0625rem 0rem 0rem #000 inset, 0rem -0.0625rem 0rem 0.0625rem #1A1A1A",
      "shadow-button-primary-inset": "0rem 0.1875rem 0rem 0rem rgb(0, 0, 0) inset",
      "shadow-button-primary-critical": "0rem -0.0625rem 0rem 0.0625rem rgba(142, 31, 11, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(181, 38, 11, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.349) inset",
      "shadow-button-primary-critical-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset",
      "shadow-button-primary-critical-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset",
      "shadow-button-primary-success": "0rem -0.0625rem 0rem 0.0625rem rgba(12, 81, 50, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(19, 111, 69, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.251) inset",
      "shadow-button-primary-success-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset",
      "shadow-button-primary-success-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset",
      "shadow-border-inset": "0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset"
    },
    "space": {
      "space-0": "0rem",
      "space-025": "0.0625rem",
      "space-050": "0.125rem",
      "space-100": "0.25rem",
      "space-150": "0.375rem",
      "space-200": "0.5rem",
      "space-300": "0.75rem",
      "space-400": "1rem",
      "space-500": "1.25rem",
      "space-600": "1.5rem",
      "space-800": "2rem",
      "space-1000": "2.5rem",
      "space-1200": "3rem",
      "space-1600": "4rem",
      "space-2000": "5rem",
      "space-2400": "6rem",
      "space-2800": "7rem",
      "space-3200": "8rem",
      "space-button-group-gap": "0.5rem",
      "space-card-gap": "1rem",
      "space-card-padding": "1rem",
      "space-table-cell-padding": "0.375rem"
    },
    "text": {
      "text-heading-3xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-3xl-font-size": "2.25rem",
      "text-heading-3xl-font-weight": "700",
      "text-heading-3xl-font-letter-spacing": "-0.03375rem",
      "text-heading-3xl-font-line-height": "3rem",
      "text-heading-2xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-2xl-font-size": "1.875rem",
      "text-heading-2xl-font-weight": "700",
      "text-heading-2xl-font-letter-spacing": "-0.01875rem",
      "text-heading-2xl-font-line-height": "2.5rem",
      "text-heading-xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xl-font-size": "1.5rem",
      "text-heading-xl-font-weight": "700",
      "text-heading-xl-font-letter-spacing": "-0.0125rem",
      "text-heading-xl-font-line-height": "2rem",
      "text-heading-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-lg-font-size": "1.25rem",
      "text-heading-lg-font-weight": "650",
      "text-heading-lg-font-letter-spacing": "-0.0125rem",
      "text-heading-lg-font-line-height": "1.5rem",
      "text-heading-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-md-font-size": "0.875rem",
      "text-heading-md-font-weight": "650",
      "text-heading-md-font-letter-spacing": "0rem",
      "text-heading-md-font-line-height": "1.25rem",
      "text-heading-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-sm-font-size": "0.8125rem",
      "text-heading-sm-font-weight": "650",
      "text-heading-sm-font-letter-spacing": "0rem",
      "text-heading-sm-font-line-height": "1.25rem",
      "text-heading-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xs-font-size": "0.75rem",
      "text-heading-xs-font-weight": "650",
      "text-heading-xs-font-letter-spacing": "0rem",
      "text-heading-xs-font-line-height": "1rem",
      "text-body-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-lg-font-size": "0.875rem",
      "text-body-lg-font-weight": "450",
      "text-body-lg-font-letter-spacing": "0rem",
      "text-body-lg-font-line-height": "1.25rem",
      "text-body-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-md-font-size": "0.8125rem",
      "text-body-md-font-weight": "450",
      "text-body-md-font-letter-spacing": "0rem",
      "text-body-md-font-line-height": "1.25rem",
      "text-body-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-sm-font-size": "0.75rem",
      "text-body-sm-font-weight": "450",
      "text-body-sm-font-letter-spacing": "0rem",
      "text-body-sm-font-line-height": "1rem",
      "text-body-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-xs-font-size": "0.6875rem",
      "text-body-xs-font-weight": "450",
      "text-body-xs-font-letter-spacing": "0rem",
      "text-body-xs-font-line-height": "0.75rem"
    },
    "width": {
      "width-0": "0rem",
      "width-025": "0.0625rem",
      "width-050": "0.125rem",
      "width-100": "0.25rem",
      "width-150": "0.375rem",
      "width-200": "0.5rem",
      "width-300": "0.75rem",
      "width-400": "1rem",
      "width-500": "1.25rem",
      "width-600": "1.5rem",
      "width-700": "1.75rem",
      "width-800": "2rem",
      "width-900": "2.25rem",
      "width-1000": "2.5rem",
      "width-1200": "3rem",
      "width-1600": "4rem",
      "width-2000": "5rem",
      "width-2400": "6rem",
      "width-2800": "7rem",
      "width-3200": "8rem"
    },
    "zIndex": {
      "z-index-0": "auto",
      "z-index-1": "100",
      "z-index-2": "400",
      "z-index-3": "510",
      "z-index-4": "512",
      "z-index-5": "513",
      "z-index-6": "514",
      "z-index-7": "515",
      "z-index-8": "516",
      "z-index-9": "517",
      "z-index-10": "518",
      "z-index-11": "519",
      "z-index-12": "520"
    }
  },
  "dark-experimental": {
    "border": {
      "border-radius-0": "0rem",
      "border-radius-050": "0.125rem",
      "border-radius-100": "0.25rem",
      "border-radius-150": "0.375rem",
      "border-radius-200": "0.5rem",
      "border-radius-300": "0.75rem",
      "border-radius-400": "1rem",
      "border-radius-500": "1.25rem",
      "border-radius-750": "1.875rem",
      "border-radius-full": "624.9375rem",
      "border-width-0": "0rem",
      "border-width-0165": "0.04125rem",
      "border-width-025": "0.0625rem",
      "border-width-050": "0.125rem",
      "border-width-100": "0.25rem"
    },
    "breakpoints": {
      "breakpoints-xs": "0rem",
      "breakpoints-sm": "30.625rem",
      "breakpoints-md": "48rem",
      "breakpoints-lg": "65rem",
      "breakpoints-xl": "90rem"
    },
    "color": {
      "color-scheme": "dark",
      "color-bg": "rgba(26, 26, 26, 1)",
      "color-bg-inverse": "rgba(26, 26, 26, 1)",
      "color-bg-surface": "rgba(48, 48, 48, 1)",
      "color-bg-surface-hover": "rgba(74, 74, 74, 1)",
      "color-bg-surface-active": "rgba(97, 97, 97, 1)",
      "color-bg-surface-selected": "rgba(97, 97, 97, 1)",
      "color-bg-surface-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-surface-secondary": "rgba(247, 247, 247, 1)",
      "color-bg-surface-secondary-hover": "rgba(74, 74, 74, 1)",
      "color-bg-surface-secondary-active": "rgba(97, 97, 97, 1)",
      "color-bg-surface-secondary-selected": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary": "rgba(243, 243, 243, 1)",
      "color-bg-surface-tertiary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-tertiary-active": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand": "rgba(227, 227, 227, 1)",
      "color-bg-surface-brand-hover": "rgba(235, 235, 235, 1)",
      "color-bg-surface-brand-active": "rgba(241, 241, 241, 1)",
      "color-bg-surface-brand-selected": "rgba(74, 74, 74, 1)",
      "color-bg-surface-info": "rgba(234, 244, 255, 1)",
      "color-bg-surface-info-hover": "rgba(224, 240, 255, 1)",
      "color-bg-surface-info-active": "rgba(202, 230, 255, 1)",
      "color-bg-surface-success": "rgba(205, 254, 225, 1)",
      "color-bg-surface-success-hover": "rgba(180, 254, 210, 1)",
      "color-bg-surface-success-active": "rgba(146, 254, 194, 1)",
      "color-bg-surface-caution": "rgba(255, 248, 219, 1)",
      "color-bg-surface-caution-hover": "rgba(255, 244, 191, 1)",
      "color-bg-surface-caution-active": "rgba(255, 239, 157, 1)",
      "color-bg-surface-warning": "rgba(255, 241, 227, 1)",
      "color-bg-surface-warning-hover": "rgba(255, 235, 213, 1)",
      "color-bg-surface-warning-active": "rgba(255, 228, 198, 1)",
      "color-bg-surface-critical": "rgba(254, 233, 232, 1)",
      "color-bg-surface-critical-hover": "rgba(254, 226, 225, 1)",
      "color-bg-surface-critical-active": "rgba(254, 218, 217, 1)",
      "color-bg-surface-emphasis": "rgba(240, 242, 255, 1)",
      "color-bg-surface-emphasis-hover": "rgba(234, 237, 255, 1)",
      "color-bg-surface-emphasis-active": "rgba(226, 231, 255, 1)",
      "color-bg-surface-magic": "rgba(248, 247, 255, 1)",
      "color-bg-surface-magic-hover": "rgba(243, 241, 255, 1)",
      "color-bg-surface-magic-active": "rgba(233, 229, 255, 1)",
      "color-bg-surface-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-surface-transparent": "rgba(0, 0, 0, 0)",
      "color-bg-fill": "rgba(48, 48, 48, 1)",
      "color-bg-fill-hover": "rgba(74, 74, 74, 1)",
      "color-bg-fill-active": "rgba(97, 97, 97, 1)",
      "color-bg-fill-selected": "rgba(97, 97, 97, 1)",
      "color-bg-fill-disabled": "rgba(0, 0, 0, 0.05)",
      "color-bg-fill-secondary": "rgba(241, 241, 241, 1)",
      "color-bg-fill-secondary-hover": "rgba(235, 235, 235, 1)",
      "color-bg-fill-secondary-active": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary": "rgba(227, 227, 227, 1)",
      "color-bg-fill-tertiary-hover": "rgba(212, 212, 212, 1)",
      "color-bg-fill-tertiary-active": "rgba(204, 204, 204, 1)",
      "color-bg-fill-brand": "rgba(255, 255, 255, 1)",
      "color-bg-fill-brand-hover": "rgba(243, 243, 243, 1)",
      "color-bg-fill-brand-active": "rgba(247, 247, 247, 1)",
      "color-bg-fill-brand-selected": "rgba(212, 212, 212, 1)",
      "color-bg-fill-brand-disabled": "rgba(0, 0, 0, 0.17)",
      "color-bg-fill-info": "rgba(145, 208, 255, 1)",
      "color-bg-fill-info-hover": "rgba(81, 192, 255, 1)",
      "color-bg-fill-info-active": "rgba(0, 148, 213, 1)",
      "color-bg-fill-info-secondary": "rgba(213, 235, 255, 1)",
      "color-bg-fill-success": "rgba(41, 132, 90, 1)",
      "color-bg-fill-success-hover": "rgba(19, 111, 69, 1)",
      "color-bg-fill-success-active": "rgba(12, 81, 50, 1)",
      "color-bg-fill-success-secondary": "rgba(180, 254, 210, 1)",
      "color-bg-fill-warning": "rgba(255, 184, 0, 1)",
      "color-bg-fill-warning-hover": "rgba(229, 165, 0, 1)",
      "color-bg-fill-warning-active": "rgba(178, 132, 0, 1)",
      "color-bg-fill-warning-secondary": "rgba(255, 214, 164, 1)",
      "color-bg-fill-caution": "rgba(255, 230, 0, 1)",
      "color-bg-fill-caution-hover": "rgba(234, 211, 0, 1)",
      "color-bg-fill-caution-active": "rgba(225, 203, 0, 1)",
      "color-bg-fill-caution-secondary": "rgba(255, 235, 120, 1)",
      "color-bg-fill-critical": "rgba(229, 28, 0, 1)",
      "color-bg-fill-critical-hover": "rgba(181, 38, 11, 1)",
      "color-bg-fill-critical-active": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-selected": "rgba(142, 31, 11, 1)",
      "color-bg-fill-critical-secondary": "rgba(254, 211, 209, 1)",
      "color-bg-fill-emphasis": "rgba(0, 91, 211, 1)",
      "color-bg-fill-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-bg-fill-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-bg-fill-magic": "rgba(128, 81, 255, 1)",
      "color-bg-fill-magic-secondary": "rgba(233, 229, 255, 1)",
      "color-bg-fill-magic-secondary-hover": "rgba(228, 222, 255, 1)",
      "color-bg-fill-magic-secondary-active": "rgba(223, 217, 255, 1)",
      "color-bg-fill-inverse": "rgba(48, 48, 48, 1)",
      "color-bg-fill-inverse-hover": "rgba(74, 74, 74, 1)",
      "color-bg-fill-inverse-active": "rgba(97, 97, 97, 1)",
      "color-bg-fill-transparent": "rgba(255, 255, 255, 0.11)",
      "color-bg-fill-transparent-hover": "rgba(255, 255, 255, 0.17)",
      "color-bg-fill-transparent-active": "rgba(255, 255, 255, 0.20)",
      "color-bg-fill-transparent-selected": "rgba(255, 255, 255, 0.28)",
      "color-bg-fill-transparent-secondary": "rgba(0, 0, 0, 0.06)",
      "color-bg-fill-transparent-secondary-hover": "rgba(0, 0, 0, 0.08)",
      "color-bg-fill-transparent-secondary-active": "rgba(0, 0, 0, 0.11)",
      "color-text": "rgba(227, 227, 227, 1)",
      "color-text-secondary": "rgba(181, 181, 181, 1)",
      "color-text-disabled": "rgba(181, 181, 181, 1)",
      "color-text-link": "rgba(0, 91, 211, 1)",
      "color-text-link-hover": "rgba(0, 66, 153, 1)",
      "color-text-link-active": "rgba(0, 46, 106, 1)",
      "color-text-brand": "rgba(74, 74, 74, 1)",
      "color-text-brand-hover": "rgba(48, 48, 48, 1)",
      "color-text-brand-on-bg-fill": "rgba(48, 48, 48, 1)",
      "color-text-brand-on-bg-fill-hover": "rgba(227, 227, 227, 1)",
      "color-text-brand-on-bg-fill-active": "rgba(204, 204, 204, 1)",
      "color-text-brand-on-bg-fill-disabled": "rgba(255, 255, 255, 1)",
      "color-text-info": "rgba(0, 58, 90, 1)",
      "color-text-info-hover": "rgba(0, 58, 90, 1)",
      "color-text-info-active": "rgba(0, 33, 51, 1)",
      "color-text-info-secondary": "rgba(0, 124, 180, 1)",
      "color-text-info-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-text-success": "rgba(12, 81, 50, 1)",
      "color-text-success-hover": "rgba(8, 61, 37, 1)",
      "color-text-success-active": "rgba(9, 42, 27, 1)",
      "color-text-success-secondary": "rgba(41, 132, 90, 1)",
      "color-text-success-on-bg-fill": "rgba(248, 255, 251, 1)",
      "color-text-caution": "rgba(79, 71, 0, 1)",
      "color-text-caution-hover": "rgba(51, 46, 0, 1)",
      "color-text-caution-active": "rgba(31, 28, 0, 1)",
      "color-text-caution-secondary": "rgba(130, 117, 0, 1)",
      "color-text-caution-on-bg-fill": "rgba(51, 46, 0, 1)",
      "color-text-warning": "rgba(94, 66, 0, 1)",
      "color-text-warning-hover": "rgba(65, 45, 0, 1)",
      "color-text-warning-active": "rgba(37, 26, 0, 1)",
      "color-text-warning-secondary": "rgba(149, 111, 0, 1)",
      "color-text-warning-on-bg-fill": "rgba(37, 26, 0, 1)",
      "color-text-critical": "rgba(142, 31, 11, 1)",
      "color-text-critical-hover": "rgba(95, 21, 7, 1)",
      "color-text-critical-active": "rgba(47, 10, 4, 1)",
      "color-text-critical-secondary": "rgba(229, 28, 0, 1)",
      "color-text-critical-on-bg-fill": "rgba(255, 251, 251, 1)",
      "color-text-emphasis": "rgba(0, 91, 211, 1)",
      "color-text-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-text-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-text-emphasis-on-bg-fill": "rgba(252, 253, 255, 1)",
      "color-text-emphasis-on-bg-fill-hover": "rgba(226, 231, 255, 1)",
      "color-text-emphasis-on-bg-fill-active": "rgba(213, 220, 255, 1)",
      "color-text-magic": "rgba(87, 0, 209, 1)",
      "color-text-magic-secondary": "rgba(113, 38, 255, 1)",
      "color-text-magic-on-bg-fill": "rgba(253, 253, 255, 1)",
      "color-text-inverse": "rgba(227, 227, 227, 1)",
      "color-text-inverse-secondary": "rgba(181, 181, 181, 1)",
      "color-text-link-inverse": "rgba(197, 208, 255, 1)",
      "color-border": "rgba(227, 227, 227, 1)",
      "color-border-hover": "rgba(204, 204, 204, 1)",
      "color-border-disabled": "rgba(235, 235, 235, 1)",
      "color-border-secondary": "rgba(97, 97, 97, 1)",
      "color-border-tertiary": "rgba(204, 204, 204, 1)",
      "color-border-focus": "rgba(0, 91, 211, 1)",
      "color-border-brand": "rgba(227, 227, 227, 1)",
      "color-border-info": "rgba(168, 216, 255, 1)",
      "color-border-success": "rgba(146, 254, 194, 1)",
      "color-border-caution": "rgba(255, 235, 120, 1)",
      "color-border-warning": "rgba(255, 200, 121, 1)",
      "color-border-critical": "rgba(254, 195, 193, 1)",
      "color-border-critical-secondary": "rgba(142, 31, 11, 1)",
      "color-border-emphasis": "rgba(0, 91, 211, 1)",
      "color-border-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-border-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-border-magic": "rgba(228, 222, 255, 1)",
      "color-border-magic-secondary": "rgba(148, 116, 255, 1)",
      "color-border-magic-secondary-hover": "rgba(128, 81, 255, 1)",
      "color-border-inverse": "rgba(97, 97, 97, 1)",
      "color-border-inverse-hover": "rgba(204, 204, 204, 1)",
      "color-border-inverse-active": "rgba(227, 227, 227, 1)",
      "color-tooltip-tail-down-border-experimental": "rgba(60, 60, 60, 1)",
      "color-tooltip-tail-up-border-experimental": "rgba(71, 71, 71, 1)",
      "color-border-gradient-experimental": "linear-gradient(to bottom, rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.03))",
      "color-border-gradient-hover-experimental": "linear-gradient(to bottom, rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.03))",
      "color-border-gradient-selected-experimental": "linear-gradient(to bottom, rgba(0, 0, 0, 0.20), rgba(255, 255, 255, 0.20))",
      "color-border-gradient-active-experimental": "linear-gradient(to bottom, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.03))",
      "color-icon": "rgba(227, 227, 227, 1)",
      "color-icon-hover": "rgba(48, 48, 48, 1)",
      "color-icon-active": "rgba(26, 26, 26, 1)",
      "color-icon-disabled": "rgba(204, 204, 204, 1)",
      "color-icon-secondary": "rgba(138, 138, 138, 1)",
      "color-icon-secondary-hover": "rgba(97, 97, 97, 1)",
      "color-icon-secondary-active": "rgba(74, 74, 74, 1)",
      "color-icon-brand": "rgba(26, 26, 26, 1)",
      "color-icon-info": "rgba(0, 148, 213, 1)",
      "color-icon-success": "rgba(41, 132, 90, 1)",
      "color-icon-caution": "rgba(153, 138, 0, 1)",
      "color-icon-warning": "rgba(178, 132, 0, 1)",
      "color-icon-critical": "rgba(239, 77, 47, 1)",
      "color-icon-emphasis": "rgba(0, 91, 211, 1)",
      "color-icon-emphasis-hover": "rgba(0, 66, 153, 1)",
      "color-icon-emphasis-active": "rgba(0, 46, 106, 1)",
      "color-icon-magic": "rgba(128, 81, 255, 1)",
      "color-icon-inverse": "rgba(227, 227, 227, 1)",
      "color-avatar-bg-fill": "rgba(181, 181, 181, 1)",
      "color-avatar-five-bg-fill": "rgba(253, 75, 146, 1)",
      "color-avatar-five-text-on-bg-fill": "rgba(255, 246, 248, 1)",
      "color-avatar-four-bg-fill": "rgba(81, 192, 255, 1)",
      "color-avatar-four-text-on-bg-fill": "rgba(0, 33, 51, 1)",
      "color-avatar-one-bg-fill": "rgba(197, 48, 197, 1)",
      "color-avatar-one-text-on-bg-fill": "rgba(253, 239, 253, 1)",
      "color-avatar-seven-bg-fill": "rgba(148, 116, 255, 1)",
      "color-avatar-seven-text-on-bg-fill": "rgba(248, 247, 255, 1)",
      "color-avatar-six-bg-fill": "rgba(37, 232, 43, 1)",
      "color-avatar-six-text-on-bg-fill": "rgba(3, 61, 5, 1)",
      "color-avatar-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-avatar-three-bg-fill": "rgba(44, 224, 212, 1)",
      "color-avatar-three-text-on-bg-fill": "rgba(3, 60, 57, 1)",
      "color-avatar-two-bg-fill": "rgba(56, 250, 163, 1)",
      "color-avatar-two-text-on-bg-fill": "rgba(12, 81, 50, 1)",
      "color-backdrop-bg": "rgba(0, 0, 0, 0.71)",
      "color-button-gradient-bg-fill": "linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, 0.15) 100%)",
      "color-checkbox-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-checkbox-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-input-bg-surface": "rgba(253, 253, 253, 1)",
      "color-input-bg-surface-hover": "rgba(250, 250, 250, 1)",
      "color-input-bg-surface-active": "rgba(247, 247, 247, 1)",
      "color-input-border": "rgba(138, 138, 138, 1)",
      "color-input-border-hover": "rgba(97, 97, 97, 1)",
      "color-input-border-active": "rgba(26, 26, 26, 1)",
      "color-nav-bg": "rgba(235, 235, 235, 1)",
      "color-nav-bg-surface": "rgba(0, 0, 0, 0.02)",
      "color-nav-bg-surface-hover": "rgba(241, 241, 241, 1)",
      "color-nav-bg-surface-active": "rgba(250, 250, 250, 1)",
      "color-nav-bg-surface-selected": "rgba(250, 250, 250, 1)",
      "color-radio-button-bg-surface-disabled": "rgba(0, 0, 0, 0.08)",
      "color-radio-button-icon-disabled": "rgba(255, 255, 255, 1)",
      "color-video-thumbnail-play-button-bg-fill-hover": "rgba(0, 0, 0, 0.81)",
      "color-video-thumbnail-play-button-bg-fill": "rgba(0, 0, 0, 0.71)",
      "color-video-thumbnail-play-button-text-on-bg-fill": "rgba(255, 255, 255, 1)",
      "color-scrollbar-thumb-bg-hover": "rgba(138, 138, 138, 1)"
    },
    "font": {
      "font-family-sans": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "font-family-mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
      "font-size-275": "0.6875rem",
      "font-size-300": "0.75rem",
      "font-size-325": "0.8125rem",
      "font-size-350": "0.875rem",
      "font-size-400": "1rem",
      "font-size-450": "1.125rem",
      "font-size-500": "1.25rem",
      "font-size-550": "1.375rem",
      "font-size-600": "1.5rem",
      "font-size-750": "1.875rem",
      "font-size-800": "2rem",
      "font-size-900": "2.25rem",
      "font-size-1000": "2.5rem",
      "font-weight-regular": "450",
      "font-weight-medium": "550",
      "font-weight-semibold": "650",
      "font-weight-bold": "700",
      "font-letter-spacing-densest": "-0.03375rem",
      "font-letter-spacing-denser": "-0.01875rem",
      "font-letter-spacing-dense": "-0.0125rem",
      "font-letter-spacing-normal": "0rem",
      "font-line-height-300": "0.75rem",
      "font-line-height-400": "1rem",
      "font-line-height-500": "1.25rem",
      "font-line-height-600": "1.5rem",
      "font-line-height-700": "1.75rem",
      "font-line-height-800": "2rem",
      "font-line-height-1000": "2.5rem",
      "font-line-height-1200": "3rem"
    },
    "height": {
      "height-0": "0rem",
      "height-025": "0.0625rem",
      "height-050": "0.125rem",
      "height-100": "0.25rem",
      "height-150": "0.375rem",
      "height-200": "0.5rem",
      "height-300": "0.75rem",
      "height-400": "1rem",
      "height-500": "1.25rem",
      "height-600": "1.5rem",
      "height-700": "1.75rem",
      "height-800": "2rem",
      "height-900": "2.25rem",
      "height-1000": "2.5rem",
      "height-1200": "3rem",
      "height-1600": "4rem",
      "height-2000": "5rem",
      "height-2400": "6rem",
      "height-2800": "7rem",
      "height-3200": "8rem"
    },
    "motion": {
      "motion-duration-0": "0ms",
      "motion-duration-50": "50ms",
      "motion-duration-100": "100ms",
      "motion-duration-150": "150ms",
      "motion-duration-200": "200ms",
      "motion-duration-250": "250ms",
      "motion-duration-300": "300ms",
      "motion-duration-350": "350ms",
      "motion-duration-400": "400ms",
      "motion-duration-450": "450ms",
      "motion-duration-500": "500ms",
      "motion-duration-5000": "5000ms",
      "motion-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      "motion-ease-in": "cubic-bezier(0.42, 0, 1, 1)",
      "motion-ease-out": "cubic-bezier(0.19, 0.91, 0.38, 1)",
      "motion-ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
      "motion-linear": "cubic-bezier(0, 0, 1, 1)",
      "motion-keyframes-bounce": "{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }",
      "motion-keyframes-fade-in": "{ to { opacity: 1 } }",
      "motion-keyframes-pulse": "{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }",
      "motion-keyframes-spin": "{ to { transform: rotate(1turn) } }",
      "motion-keyframes-appear-above": "{ from { transform: translateY(var(--p-space-100)); opacity: 0; } to { transform: none; opacity: 1; } }",
      "motion-keyframes-appear-below": "{ from { transform: translateY(calc(var(--p-space-100) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }"
    },
    "shadow": {
      "shadow-0": "none",
      "shadow-100": "0rem 0.0625rem 0rem 0rem rgba(26, 26, 26, 0.07)",
      "shadow-200": "0rem 0.1875rem 0.0625rem -0.0625rem rgba(26, 26, 26, 0.07)",
      "shadow-300": "0rem 0.25rem 0.375rem -0.125rem rgba(26, 26, 26, 0.20)",
      "shadow-400": "0rem 0.5rem 1rem -0.25rem rgba(26, 26, 26, 0.22)",
      "shadow-500": "0rem 0.75rem 1.25rem -0.5rem rgba(26, 26, 26, 0.24)",
      "shadow-600": "0rem 1.25rem 1.25rem -0.5rem rgba(26, 26, 26, 0.28)",
      "shadow-bevel-100": "0.0625rem 0rem 0rem 0rem rgba(204, 204, 204, 0.08) inset, -0.0625rem 0rem 0rem 0rem rgba(204, 204, 204, 0.08) inset, 0rem -0.0625rem 0rem 0rem rgba(204, 204, 204, 0.08) inset, 0rem 0.0625rem 0rem 0rem rgba(204, 204, 204, 0.16) inset",
      "shadow-inset-100": "0rem 0.0625rem 0.125rem 0rem rgba(26, 26, 26, 0.15) inset, 0rem 0.0625rem 0.0625rem 0rem rgba(26, 26, 26, 0.15) inset",
      "shadow-inset-200": "0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.20) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset, -0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.12) inset",
      "shadow-button": "0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset",
      "shadow-button-hover": "0rem 0.0625rem 0rem 0rem #EBEBEB inset, -0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0.0625rem 0rem 0rem 0rem #EBEBEB inset, 0rem -0.0625rem 0rem 0rem #CCC inset",
      "shadow-button-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, 0.122) inset, 0rem 0.125rem 0.0625rem 0rem rgba(26, 26, 26, 0.2) inset",
      "shadow-button-primary": "0rem -0.0625rem 0rem 0.0625rem rgba(0, 0, 0, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(48, 48, 48, 1) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.25) inset;",
      "shadow-button-primary-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.24) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.0625rem 0rem 0rem #000 inset, 0rem -0.0625rem 0rem 0.0625rem #1A1A1A",
      "shadow-button-primary-inset": "0rem 0.1875rem 0rem 0rem rgb(0, 0, 0) inset",
      "shadow-button-primary-critical": "0rem -0.0625rem 0rem 0.0625rem rgba(142, 31, 11, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(181, 38, 11, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.349) inset",
      "shadow-button-primary-critical-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset",
      "shadow-button-primary-critical-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset",
      "shadow-button-primary-success": "0rem -0.0625rem 0rem 0.0625rem rgba(12, 81, 50, 0.8) inset, 0rem 0rem 0rem 0.0625rem rgba(19, 111, 69, 0.8) inset, 0rem 0.03125rem 0rem 0.09375rem rgba(255, 255, 255, 0.251) inset",
      "shadow-button-primary-success-hover": "0rem 0.0625rem 0rem 0rem rgba(255, 255, 255, 0.48) inset, 0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, -0.0625rem 0rem 0rem 0rem rgba(255, 255, 255, 0.20) inset, 0rem -0.09375rem 0rem 0rem rgba(0, 0, 0, 0.25) inset",
      "shadow-button-primary-success-inset": "-0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.2) inset, 0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.6) inset",
      "shadow-border-inset": "0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.08) inset"
    },
    "space": {
      "space-0": "0rem",
      "space-025": "0.0625rem",
      "space-050": "0.125rem",
      "space-100": "0.25rem",
      "space-150": "0.375rem",
      "space-200": "0.5rem",
      "space-300": "0.75rem",
      "space-400": "1rem",
      "space-500": "1.25rem",
      "space-600": "1.5rem",
      "space-800": "2rem",
      "space-1000": "2.5rem",
      "space-1200": "3rem",
      "space-1600": "4rem",
      "space-2000": "5rem",
      "space-2400": "6rem",
      "space-2800": "7rem",
      "space-3200": "8rem",
      "space-button-group-gap": "0.5rem",
      "space-card-gap": "1rem",
      "space-card-padding": "1rem",
      "space-table-cell-padding": "0.375rem"
    },
    "text": {
      "text-heading-3xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-3xl-font-size": "2.25rem",
      "text-heading-3xl-font-weight": "700",
      "text-heading-3xl-font-letter-spacing": "-0.03375rem",
      "text-heading-3xl-font-line-height": "3rem",
      "text-heading-2xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-2xl-font-size": "1.875rem",
      "text-heading-2xl-font-weight": "700",
      "text-heading-2xl-font-letter-spacing": "-0.01875rem",
      "text-heading-2xl-font-line-height": "2.5rem",
      "text-heading-xl-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xl-font-size": "1.5rem",
      "text-heading-xl-font-weight": "700",
      "text-heading-xl-font-letter-spacing": "-0.0125rem",
      "text-heading-xl-font-line-height": "2rem",
      "text-heading-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-lg-font-size": "1.25rem",
      "text-heading-lg-font-weight": "650",
      "text-heading-lg-font-letter-spacing": "-0.0125rem",
      "text-heading-lg-font-line-height": "1.5rem",
      "text-heading-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-md-font-size": "0.875rem",
      "text-heading-md-font-weight": "650",
      "text-heading-md-font-letter-spacing": "0rem",
      "text-heading-md-font-line-height": "1.25rem",
      "text-heading-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-sm-font-size": "0.8125rem",
      "text-heading-sm-font-weight": "650",
      "text-heading-sm-font-letter-spacing": "0rem",
      "text-heading-sm-font-line-height": "1.25rem",
      "text-heading-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-heading-xs-font-size": "0.75rem",
      "text-heading-xs-font-weight": "650",
      "text-heading-xs-font-letter-spacing": "0rem",
      "text-heading-xs-font-line-height": "1rem",
      "text-body-lg-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-lg-font-size": "0.875rem",
      "text-body-lg-font-weight": "450",
      "text-body-lg-font-letter-spacing": "0rem",
      "text-body-lg-font-line-height": "1.25rem",
      "text-body-md-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-md-font-size": "0.8125rem",
      "text-body-md-font-weight": "450",
      "text-body-md-font-letter-spacing": "0rem",
      "text-body-md-font-line-height": "1.25rem",
      "text-body-sm-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-sm-font-size": "0.75rem",
      "text-body-sm-font-weight": "450",
      "text-body-sm-font-letter-spacing": "0rem",
      "text-body-sm-font-line-height": "1rem",
      "text-body-xs-font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      "text-body-xs-font-size": "0.6875rem",
      "text-body-xs-font-weight": "450",
      "text-body-xs-font-letter-spacing": "0rem",
      "text-body-xs-font-line-height": "0.75rem"
    },
    "width": {
      "width-0": "0rem",
      "width-025": "0.0625rem",
      "width-050": "0.125rem",
      "width-100": "0.25rem",
      "width-150": "0.375rem",
      "width-200": "0.5rem",
      "width-300": "0.75rem",
      "width-400": "1rem",
      "width-500": "1.25rem",
      "width-600": "1.5rem",
      "width-700": "1.75rem",
      "width-800": "2rem",
      "width-900": "2.25rem",
      "width-1000": "2.5rem",
      "width-1200": "3rem",
      "width-1600": "4rem",
      "width-2000": "5rem",
      "width-2400": "6rem",
      "width-2800": "7rem",
      "width-3200": "8rem"
    },
    "zIndex": {
      "z-index-0": "auto",
      "z-index-1": "100",
      "z-index-2": "400",
      "z-index-3": "510",
      "z-index-4": "512",
      "z-index-5": "513",
      "z-index-6": "514",
      "z-index-7": "515",
      "z-index-8": "516",
      "z-index-9": "517",
      "z-index-10": "518",
      "z-index-11": "519",
      "z-index-12": "520"
    }
  }
};
var themeDefault = themes[themeNameDefault];
var isTokenName = createIsTokenName(themes[themeNameDefault]);

// node_modules/@shopify/polaris/build/esm/utilities/use-theme.js
var import_react = __toESM(require_react());
var ThemeContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var ThemeNameContext = /* @__PURE__ */ (0, import_react.createContext)(null);
function getTheme(themeName) {
  return themes[themeName];
}
function useTheme() {
  const theme = (0, import_react.useContext)(ThemeContext);
  if (!theme) {
    throw new Error("No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return theme;
}
function useThemeName() {
  const themeName = (0, import_react.useContext)(ThemeNameContext);
  if (!themeName) {
    throw new Error("No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return themeName;
}
function UseTheme(props) {
  const theme = useTheme();
  return props.children(theme);
}

// node_modules/@shopify/polaris/build/esm/utilities/debounce.js
function debounce(func, waitArg, options) {
  let lastArgs;
  let lastThis;
  let maxWait;
  let result;
  let timerId;
  let lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;
  const useRAF = !waitArg && waitArg !== 0;
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  const wait = waitArg || 0;
  if (typeof options === "object") {
    leading = Boolean(options.leading);
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : void 0;
    trailing = "trailing" in options ? Boolean(options.trailing) : trailing;
  }
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = void 0;
    lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function startTimer(pendingFunc, wait2) {
    if (useRAF) {
      cancelAnimationFrame(timerId);
      return requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait2);
  }
  function cancelTimer(id) {
    if (useRAF) {
      return cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing && maxWait ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && maxWait && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== void 0;
  }
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}

// node_modules/@shopify/polaris/build/esm/components/shared.js
var scrollable = {
  props: {
    "data-polaris-scrollable": true
  },
  selector: "[data-polaris-scrollable]"
};
var overlay = {
  props: {
    "data-polaris-overlay": true
  },
  selector: "[data-polaris-overlay]"
};
var layer = {
  props: {
    "data-polaris-layer": true
  },
  selector: "[data-polaris-layer]"
};
var unstyled = {
  props: {
    "data-polaris-unstyled": true
  },
  selector: "[data-polaris-unstyled]"
};
var dataPolarisTopBar = {
  props: {
    "data-polaris-top-bar": true
  },
  selector: "[data-polaris-top-bar]"
};
var headerCell = {
  props: {
    "data-polaris-header-cell": true
  },
  selector: "[data-polaris-header-cell]"
};
var portal = {
  props: ["data-portal-id"],
  selector: "[data-portal-id]"
};

// node_modules/@shopify/polaris/build/esm/utilities/breakpoints.js
var import_react3 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/target.js
var isServer = typeof window === "undefined" || typeof document === "undefined";

// node_modules/@shopify/polaris/build/esm/utilities/use-isomorphic-layout-effect.js
var import_react2 = __toESM(require_react());
var useIsomorphicLayoutEffect = isServer ? import_react2.useEffect : import_react2.useLayoutEffect;

// node_modules/@shopify/polaris/build/esm/utilities/breakpoints.js
var Breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: "767.95px",
  // TODO: Update to lgDown
  stackedContent: "1039.95px"
};
var noWindowMatches = {
  media: "",
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_) => true
};
function noop() {
}
function navigationBarCollapsed() {
  return typeof window === "undefined" ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}
function stackedContent() {
  return typeof window === "undefined" ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}
var breakpointsQueryEntries = getBreakpointsQueryEntries(themeDefault.breakpoints);
function getMatches(defaults, forceDefaults) {
  if (!isServer && !forceDefaults) {
    return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias, query]) => [directionAlias, window.matchMedia(query).matches]));
  }
  if (typeof defaults === "object" && defaults !== null) {
    return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, defaults[directionAlias] ?? false]));
  }
  return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, defaults ?? false]));
}
function useBreakpoints(options) {
  const [breakpoints2, setBreakpoints] = (0, import_react3.useState)(getMatches(options?.defaults, true));
  useIsomorphicLayoutEffect(() => {
    const mediaQueryLists = breakpointsQueryEntries.map(([_, query]) => window.matchMedia(query));
    const handler = () => setBreakpoints(getMatches());
    mediaQueryLists.forEach((mql) => {
      if (mql.addListener) {
        mql.addListener(handler);
      } else {
        mql.addEventListener("change", handler);
      }
    });
    handler();
    return () => {
      mediaQueryLists.forEach((mql) => {
        if (mql.removeListener) {
          mql.removeListener(handler);
        } else {
          mql.removeEventListener("change", handler);
        }
      });
    };
  }, []);
  return breakpoints2;
}
function getBreakpointsQueryEntries(breakpoints2) {
  const mediaConditionEntries = Object.entries(getMediaConditions(breakpoints2));
  return mediaConditionEntries.map(([breakpointsToken, mediaConditions]) => Object.entries(mediaConditions).map(([direction, mediaCondition]) => {
    const breakpointsAlias = breakpointsToken.split("-")[1];
    const directionAlias = `${breakpointsAlias}${capitalize(direction)}`;
    return [directionAlias, mediaCondition];
  })).flat();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// node_modules/@shopify/polaris/build/esm/utilities/geometry.js
var Rect = class {
  static get zero() {
    return new Rect();
  }
  constructor({
    top = 0,
    left = 0,
    width: width2 = 0,
    height: height2 = 0
  } = {}) {
    this.top = top;
    this.left = left;
    this.width = width2;
    this.height = height2;
  }
  get center() {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2
    };
  }
};
function getRectForNode(node) {
  if (!(node instanceof Element)) {
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  const rect = node.getBoundingClientRect();
  return new Rect({
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  });
}

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/sticky-manager.js
var SIXTY_FPS = 1e3 / 60;
var StickyManager = class {
  constructor(container) {
    this.stickyItems = [];
    this.stuckItems = [];
    this.container = null;
    this.topBarOffset = 0;
    this.handleResize = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: true,
      trailing: true,
      maxWait: SIXTY_FPS
    });
    this.handleScroll = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: true,
      trailing: true,
      maxWait: SIXTY_FPS
    });
    if (container) {
      this.setContainer(container);
    }
  }
  registerStickyItem(stickyItem) {
    this.stickyItems.push(stickyItem);
  }
  unregisterStickyItem(nodeToRemove) {
    const nodeIndex = this.stickyItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stickyItems.splice(nodeIndex, 1);
  }
  setContainer(el) {
    this.container = el;
    if (isDocument(el)) {
      this.setTopBarOffset(el);
    }
    this.container.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.manageStickyItems();
  }
  removeScrollListener() {
    if (this.container) {
      this.container.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("resize", this.handleResize);
    }
  }
  manageStickyItems() {
    if (this.stickyItems.length <= 0) {
      return;
    }
    const scrollTop = this.container ? scrollTopFor(this.container) : 0;
    const containerTop = getRectForNode(this.container).top + this.topBarOffset;
    this.stickyItems.forEach((stickyItem) => {
      const {
        handlePositioning
      } = stickyItem;
      const {
        sticky,
        top,
        left,
        width: width2
      } = this.evaluateStickyItem(stickyItem, scrollTop, containerTop);
      this.updateStuckItems(stickyItem, sticky);
      handlePositioning(sticky, top, left, width2);
    });
  }
  evaluateStickyItem(stickyItem, scrollTop, containerTop) {
    const {
      stickyNode,
      placeHolderNode,
      boundingElement,
      offset,
      disableWhenStacked
    } = stickyItem;
    if (disableWhenStacked && stackedContent().matches) {
      return {
        sticky: false,
        top: 0,
        left: 0,
        width: "auto"
      };
    }
    const stickyOffset = offset ? this.getOffset(stickyNode) + parseInt(
      // Important: This will not update when the active theme changes.
      // Update this to `useTheme` once converted to a function component.
      themeDefault.space["space-500"],
      10
    ) : this.getOffset(stickyNode);
    const scrollPosition2 = scrollTop + stickyOffset;
    const placeHolderNodeCurrentTop = placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop;
    const top = containerTop + stickyOffset;
    const width2 = placeHolderNode.getBoundingClientRect().width;
    const left = placeHolderNode.getBoundingClientRect().left;
    let sticky;
    if (boundingElement == null) {
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop;
    } else {
      const stickyItemHeight = stickyNode.getBoundingClientRect().height || stickyNode.firstElementChild?.getBoundingClientRect().height || 0;
      const stickyItemBottomPosition = boundingElement.getBoundingClientRect().bottom - stickyItemHeight + scrollTop - containerTop;
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop && scrollPosition2 < stickyItemBottomPosition;
    }
    return {
      sticky,
      top,
      left,
      width: width2
    };
  }
  updateStuckItems(item, sticky) {
    const {
      stickyNode
    } = item;
    if (sticky && !this.isNodeStuck(stickyNode)) {
      this.addStuckItem(item);
    } else if (!sticky && this.isNodeStuck(stickyNode)) {
      this.removeStuckItem(item);
    }
  }
  addStuckItem(stickyItem) {
    this.stuckItems.push(stickyItem);
  }
  removeStuckItem(stickyItem) {
    const {
      stickyNode: nodeToRemove
    } = stickyItem;
    const nodeIndex = this.stuckItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stuckItems.splice(nodeIndex, 1);
  }
  getOffset(node) {
    if (this.stuckItems.length === 0) {
      return 0;
    }
    let offset = 0;
    let count = 0;
    const stuckNodesLength = this.stuckItems.length;
    const nodeRect = getRectForNode(node);
    while (count < stuckNodesLength) {
      const stuckNode = this.stuckItems[count].stickyNode;
      if (stuckNode !== node) {
        const stuckNodeRect = getRectForNode(stuckNode);
        if (!horizontallyOverlaps(nodeRect, stuckNodeRect)) {
          offset += getRectForNode(stuckNode).height;
        }
      } else {
        break;
      }
      count++;
    }
    return offset;
  }
  isNodeStuck(node) {
    const nodeFound = this.stuckItems.findIndex(({
      stickyNode
    }) => node === stickyNode);
    return nodeFound >= 0;
  }
  setTopBarOffset(container) {
    const topbarElement = container.querySelector(`:not(${scrollable.selector}) ${dataPolarisTopBar.selector}`);
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
  const rect1Left = rect1.left;
  const rect1Right = rect1.left + rect1.width;
  const rect2Left = rect2.left;
  const rect2Right = rect2.left + rect2.width;
  return rect2Right < rect1Left || rect1Right < rect2Left;
}

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/scroll-lock-manager.js
var SCROLL_LOCKING_ATTRIBUTE = "data-lock-scrolling";
var SCROLL_LOCKING_HIDDEN_ATTRIBUTE = "data-lock-scrolling-hidden";
var SCROLL_LOCKING_WRAPPER_ATTRIBUTE = "data-lock-scrolling-wrapper";
var scrollPosition = 0;
function isScrollBarVisible() {
  const {
    body
  } = document;
  return body.scrollHeight > body.clientHeight;
}
var ScrollLockManager = class {
  constructor() {
    this.scrollLocks = 0;
    this.locked = false;
  }
  registerScrollLock() {
    this.scrollLocks += 1;
    this.handleScrollLocking();
  }
  unregisterScrollLock() {
    this.scrollLocks -= 1;
    this.handleScrollLocking();
  }
  handleScrollLocking() {
    if (isServer)
      return;
    const {
      scrollLocks
    } = this;
    const {
      body
    } = document;
    const wrapper = body.firstElementChild;
    if (scrollLocks === 0) {
      body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE);
      body.removeAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE);
      if (wrapper) {
        wrapper.removeAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE);
      }
      window.scroll(0, scrollPosition);
      this.locked = false;
    } else if (scrollLocks > 0 && !this.locked) {
      scrollPosition = window.pageYOffset;
      body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, "");
      if (!isScrollBarVisible()) {
        body.setAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE, "");
      }
      if (wrapper) {
        wrapper.setAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE, "");
        wrapper.scrollTop = scrollPosition;
      }
      this.locked = true;
    }
  }
  resetScrollPosition() {
    scrollPosition = 0;
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/get.js
var OBJECT_NOTATION_MATCHER = /\[(.*?)\]|(\w+)/g;
function get(obj, keypath, defaultValue) {
  if (obj == null)
    return void 0;
  const keys = Array.isArray(keypath) ? keypath : getKeypath(keypath);
  let acc = obj;
  for (let i = 0; i < keys.length; i++) {
    const val = acc[keys[i]];
    if (val === void 0)
      return defaultValue;
    acc = val;
  }
  return acc;
}
function getKeypath(str) {
  const path = [];
  let result;
  while (result = OBJECT_NOTATION_MATCHER.exec(str)) {
    const [, first, second] = result;
    path.push(first || second);
  }
  return path;
}

// node_modules/@shopify/polaris/build/esm/utilities/merge.js
function merge(...objs) {
  let final = {};
  for (const obj of objs) {
    final = mergeRecursively(final, obj);
  }
  return final;
}
function mergeRecursively(inputObjA, objB) {
  const objA = Array.isArray(inputObjA) ? [...inputObjA] : {
    ...inputObjA
  };
  for (const key in objB) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      continue;
    } else if (isMergeableValue(objB[key]) && isMergeableValue(objA[key])) {
      objA[key] = mergeRecursively(objA[key], objB[key]);
    } else {
      objA[key] = objB[key];
    }
  }
  return objA;
}
function isMergeableValue(value) {
  return value !== null && typeof value === "object";
}

// node_modules/@shopify/polaris/build/esm/utilities/i18n/I18n.js
var REPLACE_REGEX = /{([^}]*)}/g;
var I18n = class {
  /**
   * @param translation A locale object or array of locale objects that overrides default translations. If specifying an array then your desired language dictionary should come first, followed by your fallback language dictionaries
   */
  constructor(translation) {
    this.translation = {};
    this.translation = Array.isArray(translation) ? merge(...translation.slice().reverse()) : translation;
  }
  translate(id, replacements) {
    const text2 = get(this.translation, id, "");
    if (!text2) {
      return "";
    }
    if (replacements) {
      return text2.replace(REPLACE_REGEX, (match) => {
        const replacement = match.substring(1, match.length - 1);
        if (replacements[replacement] === void 0) {
          const replacementData = JSON.stringify(replacements);
          throw new Error(`Error in translation for key '${id}'. No replacement found for key '${replacement}'. The following replacements were passed: '${replacementData}'`);
        }
        return replacements[replacement];
      });
    }
    return text2;
  }
  translationKeyExists(path) {
    return Boolean(get(this.translation, path));
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/features/context.js
var import_react4 = __toESM(require_react());
var FeaturesContext = /* @__PURE__ */ (0, import_react4.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/i18n/context.js
var import_react5 = __toESM(require_react());
var I18nContext = /* @__PURE__ */ (0, import_react5.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/context.js
var import_react6 = __toESM(require_react());
var ScrollLockManagerContext = /* @__PURE__ */ (0, import_react6.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/context.js
var import_react7 = __toESM(require_react());
var StickyManagerContext = /* @__PURE__ */ (0, import_react7.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/link/context.js
var import_react8 = __toESM(require_react());
var LinkContext = /* @__PURE__ */ (0, import_react8.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
var import_react11 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/media-query/context.js
var import_react9 = __toESM(require_react());
var MediaQueryContext = /* @__PURE__ */ (0, import_react9.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/EventListener/EventListener.js
var import_react10 = __toESM(require_react());
var EventListener = class extends import_react10.PureComponent {
  componentDidMount() {
    this.attachListener();
  }
  componentDidUpdate({
    passive,
    ...detachProps
  }) {
    this.detachListener(detachProps);
    this.attachListener();
  }
  componentWillUnmount() {
    this.detachListener();
  }
  render() {
    return null;
  }
  attachListener() {
    const {
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
    const {
      event,
      handler,
      capture
    } = prevProps || this.props;
    window.removeEventListener(event, handler, capture);
  }
};

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
var MediaQueryProvider = function MediaQueryProvider2({
  children
}) {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = (0, import_react11.useState)(navigationBarCollapsed().matches);
  const handleResize = (0, import_react11.useCallback)(debounce(() => {
    if (isNavigationCollapsed !== navigationBarCollapsed().matches) {
      setIsNavigationCollapsed(!isNavigationCollapsed);
    }
  }, 40, {
    trailing: true,
    leading: true,
    maxWait: 40
  }), [isNavigationCollapsed]);
  (0, import_react11.useEffect)(() => {
    setIsNavigationCollapsed(navigationBarCollapsed().matches);
  }, []);
  const context = (0, import_react11.useMemo)(() => ({
    isNavigationCollapsed
  }), [isNavigationCollapsed]);
  return /* @__PURE__ */ import_react11.default.createElement(MediaQueryContext.Provider, {
    value: context
  }, /* @__PURE__ */ import_react11.default.createElement(EventListener, {
    event: "resize",
    handler: handleResize
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
var import_react15 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-is-after-initial-mount.js
var import_react12 = __toESM(require_react());
function useIsAfterInitialMount() {
  const [isAfterInitialMount, setIsAfterInitialMount] = (0, import_react12.useState)(false);
  (0, import_react12.useEffect)(() => {
    setIsAfterInitialMount(true);
  }, []);
  return isAfterInitialMount;
}

// node_modules/@shopify/polaris/build/esm/utilities/portals/context.js
var import_react13 = __toESM(require_react());
var PortalsManagerContext = /* @__PURE__ */ (0, import_react13.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/components/PortalsContainer/PortalsContainer.js
var import_react14 = __toESM(require_react());
function PortalsContainerComponent(_props, ref) {
  return /* @__PURE__ */ import_react14.default.createElement("div", {
    id: "PolarisPortalsContainer",
    ref
  });
}
var PortalsContainer = /* @__PURE__ */ (0, import_react14.forwardRef)(PortalsContainerComponent);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
function PortalsManager({
  children,
  container
}) {
  const isMounted = useIsAfterInitialMount();
  const ref = (0, import_react15.useRef)(null);
  const contextValue = (0, import_react15.useMemo)(() => {
    if (container) {
      return {
        container
      };
    } else if (isMounted) {
      return {
        container: ref.current
      };
    } else {
      return {
        container: null
      };
    }
  }, [container, isMounted]);
  return /* @__PURE__ */ import_react15.default.createElement(PortalsManagerContext.Provider, {
    value: contextValue
  }, children, container ? null : /* @__PURE__ */ import_react15.default.createElement(PortalsContainer, {
    ref
  }));
}

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
var import_react17 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/focus-manager/context.js
var import_react16 = __toESM(require_react());
var FocusManagerContext = /* @__PURE__ */ (0, import_react16.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
function FocusManager({
  children
}) {
  const [trapFocusList, setTrapFocusList] = (0, import_react17.useState)([]);
  const add = (0, import_react17.useCallback)((id) => {
    setTrapFocusList((list) => [...list, id]);
  }, []);
  const remove = (0, import_react17.useCallback)((id) => {
    let removed = true;
    setTrapFocusList((list) => {
      const clone = [...list];
      const index = clone.indexOf(id);
      if (index === -1) {
        removed = false;
      } else {
        clone.splice(index, 1);
      }
      return clone;
    });
    return removed;
  }, []);
  const value = (0, import_react17.useMemo)(() => ({
    trapFocusList,
    add,
    remove
  }), [add, trapFocusList, remove]);
  return /* @__PURE__ */ import_react17.default.createElement(FocusManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
var import_react19 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/context.js
var import_react18 = __toESM(require_react());
var EphemeralPresenceManagerContext = /* @__PURE__ */ (0, import_react18.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
var defaultState = {
  tooltip: 0,
  hovercard: 0
};
function EphemeralPresenceManager({
  children
}) {
  const [presenceCounter, setPresenceCounter] = (0, import_react19.useState)(defaultState);
  const addPresence = (0, import_react19.useCallback)((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] + 1
    }));
  }, []);
  const removePresence = (0, import_react19.useCallback)((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] - 1
    }));
  }, []);
  const value = (0, import_react19.useMemo)(() => ({
    presenceList: Object.entries(presenceCounter).reduce((previousValue, currentValue) => {
      const [key, value2] = currentValue;
      return {
        ...previousValue,
        [key]: value2 >= 1
      };
    }, {}),
    presenceCounter,
    addPresence,
    removePresence
  }), [addPresence, removePresence, presenceCounter]);
  return /* @__PURE__ */ import_react19.default.createElement(EphemeralPresenceManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
var MAX_SCROLLBAR_WIDTH = 20;
var SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30;
var SCROLLBAR_TEST_ELEMENT_CHILD_SIZE = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;
function measureScrollbars() {
  const parentEl = document.createElement("div");
  parentEl.setAttribute("style", `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`);
  const child = document.createElement("div");
  child.setAttribute("style", `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; scrollbar-width: thin;`);
  parentEl.appendChild(child);
  document.body.appendChild(parentEl);
  const scrollbarWidth = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE - (parentEl.firstElementChild?.clientWidth ?? 0);
  const scrollbarWidthWithSafetyHatch = Math.min(scrollbarWidth, MAX_SCROLLBAR_WIDTH);
  document.documentElement.style.setProperty("--pc-app-provider-scrollbar-width", `${scrollbarWidthWithSafetyHatch}px`);
  document.body.removeChild(parentEl);
}
var AppProvider = class extends import_react20.Component {
  constructor(props) {
    super(props);
    this.setBodyStyles = () => {
      document.body.style.backgroundColor = "var(--p-color-bg)";
      document.body.style.color = "var(--p-color-text)";
    };
    this.setRootAttributes = () => {
      const activeThemeName = this.getThemeName();
      themeNames.forEach((themeName) => {
        document.documentElement.classList.toggle(createThemeClassName(themeName), themeName === activeThemeName);
      });
    };
    this.getThemeName = () => this.props.theme ?? themeNameDefault;
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    const {
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
      this.stickyManager.setContainer(document);
      this.setBodyStyles();
      this.setRootAttributes();
      const isSafari16 = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome") && (navigator.userAgent.includes("Version/16.1") || navigator.userAgent.includes("Version/16.2") || navigator.userAgent.includes("Version/16.3"));
      const isMobileApp16 = navigator.userAgent.includes("Shopify Mobile/iOS") && (navigator.userAgent.includes("OS 16_1") || navigator.userAgent.includes("OS 16_2") || navigator.userAgent.includes("OS 16_3"));
      if (isSafari16 || isMobileApp16) {
        document.documentElement.classList.add("Polaris-Safari-16-Font-Optical-Sizing-Patch");
      }
    }
    measureScrollbars();
  }
  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent
  }) {
    const {
      i18n,
      linkComponent
    } = this.props;
    this.setRootAttributes();
    if (i18n === prevI18n && linkComponent === prevLinkComponent) {
      return;
    }
    this.setState({
      link: linkComponent,
      intl: new I18n(i18n)
    });
  }
  render() {
    const {
      children,
      features
    } = this.props;
    const themeName = this.getThemeName();
    const {
      intl,
      link
    } = this.state;
    return /* @__PURE__ */ import_react20.default.createElement(ThemeNameContext.Provider, {
      value: themeName
    }, /* @__PURE__ */ import_react20.default.createElement(ThemeContext.Provider, {
      value: getTheme(themeName)
    }, /* @__PURE__ */ import_react20.default.createElement(FeaturesContext.Provider, {
      value: features
    }, /* @__PURE__ */ import_react20.default.createElement(I18nContext.Provider, {
      value: intl
    }, /* @__PURE__ */ import_react20.default.createElement(ScrollLockManagerContext.Provider, {
      value: this.scrollLockManager
    }, /* @__PURE__ */ import_react20.default.createElement(StickyManagerContext.Provider, {
      value: this.stickyManager
    }, /* @__PURE__ */ import_react20.default.createElement(LinkContext.Provider, {
      value: link
    }, /* @__PURE__ */ import_react20.default.createElement(MediaQueryProvider, null, /* @__PURE__ */ import_react20.default.createElement(PortalsManager, null, /* @__PURE__ */ import_react20.default.createElement(FocusManager, null, /* @__PURE__ */ import_react20.default.createElement(EphemeralPresenceManager, null, children)))))))))));
  }
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
var import_react21 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/is-object.js
function isObject(value) {
  const type = typeof value;
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
  const nonNullValues = Object.entries(styles52).filter(([_, value]) => value != null);
  return nonNullValues.length ? Object.fromEntries(nonNullValues) : void 0;
}
function getResponsiveProps(componentName, componentProp, tokenSubgroup, responsiveProp) {
  if (!responsiveProp)
    return {};
  let result;
  if (!isObject(responsiveProp)) {
    result = {
      [breakpointsAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`
    };
  } else {
    result = Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [breakpointAlias, `var(--p-${tokenSubgroup}-${aliasOrScale})`]));
  }
  return Object.fromEntries(Object.entries(result).map(([breakpointAlias, value]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, value]));
}
function getResponsiveValue(componentName, componentProp, responsiveProp) {
  if (!responsiveProp)
    return {};
  if (!isObject(responsiveProp)) {
    return {
      [`--pc-${componentName}-${componentProp}-${breakpointsAliases[0]}`]: responsiveProp
    };
  }
  return Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, responsiveValue]));
}

// node_modules/@shopify/polaris/build/esm/components/Text/Text.css.js
var styles = {
  "root": "Polaris-Text--root",
  "block": "Polaris-Text--block",
  "truncate": "Polaris-Text--truncate",
  "visuallyHidden": "Polaris-Text--visuallyHidden",
  "start": "Polaris-Text--start",
  "center": "Polaris-Text--center",
  "end": "Polaris-Text--end",
  "justify": "Polaris-Text--justify",
  "base": "Polaris-Text--base",
  "inherit": "Polaris-Text--inherit",
  "disabled": "Polaris-Text--disabled",
  "success": "Polaris-Text--success",
  "critical": "Polaris-Text--critical",
  "caution": "Polaris-Text--caution",
  "subdued": "Polaris-Text--subdued",
  "magic": "Polaris-Text--magic",
  "magic-subdued": "Polaris-Text__magic--subdued",
  "text-inverse": "Polaris-Text__text--inverse",
  "text-inverse-secondary": "Polaris-Text--textInverseSecondary",
  "headingXs": "Polaris-Text--headingXs",
  "headingSm": "Polaris-Text--headingSm",
  "headingMd": "Polaris-Text--headingMd",
  "headingLg": "Polaris-Text--headingLg",
  "headingXl": "Polaris-Text--headingXl",
  "heading2xl": "Polaris-Text--heading2xl",
  "heading3xl": "Polaris-Text--heading3xl",
  "bodyXs": "Polaris-Text--bodyXs",
  "bodySm": "Polaris-Text--bodySm",
  "bodyMd": "Polaris-Text--bodyMd",
  "bodyLg": "Polaris-Text--bodyLg",
  "regular": "Polaris-Text--regular",
  "medium": "Polaris-Text--medium",
  "semibold": "Polaris-Text--semibold",
  "bold": "Polaris-Text--bold",
  "break": "Polaris-Text--break",
  "numeric": "Polaris-Text--numeric",
  "line-through": "Polaris-Text__line--through"
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
var deprecatedVariants = {
  heading3xl: "heading2xl"
};
var Text = ({
  alignment,
  as,
  breakWord,
  children,
  tone,
  fontWeight,
  id,
  numeric = false,
  truncate = false,
  variant,
  visuallyHidden = false,
  textDecorationLine
}) => {
  if (variant && Object.prototype.hasOwnProperty.call(deprecatedVariants, variant)) {
    console.warn(`Deprecation: <Text variant="${variant}" />. The value "${variant}" will be removed in a future major version of Polaris. Use "${deprecatedVariants[variant]}" instead.`);
  }
  const Component3 = as || (visuallyHidden ? "span" : "p");
  const className = classNames(styles.root, variant && styles[variant], fontWeight && styles[fontWeight], (alignment || truncate) && styles.block, alignment && styles[alignment], breakWord && styles.break, tone && styles[tone], numeric && styles.numeric, truncate && styles.truncate, visuallyHidden && styles.visuallyHidden, textDecorationLine && styles[textDecorationLine]);
  return /* @__PURE__ */ import_react21.default.createElement(Component3, Object.assign({
    className
  }, id && {
    id
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/Button/Button.js
var import_react48 = __toESM(require_react());

// node_modules/@shopify/polaris-icons/dist/icons/AlertCircleIcon.svg.mjs
var import_react22 = __toESM(require_react(), 1);
var SvgAlertCircleIcon = function SvgAlertCircleIcon2(props) {
  return /* @__PURE__ */ import_react22.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react22.default.createElement("path", {
    d: "M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"
  }), /* @__PURE__ */ import_react22.default.createElement("path", {
    d: "M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  }), /* @__PURE__ */ import_react22.default.createElement("path", {
    fillRule: "evenodd",
    d: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
  }));
};
SvgAlertCircleIcon.displayName = "AlertCircleIcon";

// node_modules/@shopify/polaris-icons/dist/icons/AlertTriangleIcon.svg.mjs
var import_react23 = __toESM(require_react(), 1);
var SvgAlertTriangleIcon = function SvgAlertTriangleIcon2(props) {
  return /* @__PURE__ */ import_react23.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react23.default.createElement("path", {
    d: "M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"
  }), /* @__PURE__ */ import_react23.default.createElement("path", {
    d: "M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  }), /* @__PURE__ */ import_react23.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z"
  }));
};
SvgAlertTriangleIcon.displayName = "AlertTriangleIcon";

// node_modules/@shopify/polaris-icons/dist/icons/ArrowDownIcon.svg.mjs
var import_react24 = __toESM(require_react(), 1);
var SvgArrowDownIcon = function SvgArrowDownIcon2(props) {
  return /* @__PURE__ */ import_react24.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react24.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 3.5a.75.75 0 0 1 .75.75v9.69l2.72-2.72a.75.75 0 0 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 1.06-1.06l2.72 2.72v-9.69a.75.75 0 0 1 .75-.75Z"
  }));
};
SvgArrowDownIcon.displayName = "ArrowDownIcon";

// node_modules/@shopify/polaris-icons/dist/icons/ArrowLeftIcon.svg.mjs
var import_react25 = __toESM(require_react(), 1);
var SvgArrowLeftIcon = function SvgArrowLeftIcon2(props) {
  return /* @__PURE__ */ import_react25.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react25.default.createElement("path", {
    fillRule: "evenodd",
    d: "M16.5 10a.75.75 0 0 1-.75.75h-9.69l2.72 2.72a.75.75 0 0 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-2.72 2.72h9.69a.75.75 0 0 1 .75.75Z"
  }));
};
SvgArrowLeftIcon.displayName = "ArrowLeftIcon";

// node_modules/@shopify/polaris-icons/dist/icons/ArrowUpIcon.svg.mjs
var import_react26 = __toESM(require_react(), 1);
var SvgArrowUpIcon = function SvgArrowUpIcon2(props) {
  return /* @__PURE__ */ import_react26.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react26.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 16.5a.75.75 0 0 1-.75-.75v-9.69l-2.72 2.72a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06l-2.72-2.72v9.69a.75.75 0 0 1-.75.75Z"
  }));
};
SvgArrowUpIcon.displayName = "ArrowUpIcon";

// node_modules/@shopify/polaris-icons/dist/icons/CheckCircleIcon.svg.mjs
var import_react27 = __toESM(require_react(), 1);
var SvgCheckCircleIcon = function SvgCheckCircleIcon2(props) {
  return /* @__PURE__ */ import_react27.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react27.default.createElement("path", {
    d: "M13.28 9.03a.75.75 0 0 0-1.06-1.06l-2.97 2.97-1.22-1.22a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.5-3.5Z"
  }), /* @__PURE__ */ import_react27.default.createElement("path", {
    fillRule: "evenodd",
    d: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
  }));
};
SvgCheckCircleIcon.displayName = "CheckCircleIcon";

// node_modules/@shopify/polaris-icons/dist/icons/ChevronDownIcon.svg.mjs
var import_react28 = __toESM(require_react(), 1);
var SvgChevronDownIcon = function SvgChevronDownIcon2(props) {
  return /* @__PURE__ */ import_react28.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react28.default.createElement("path", {
    fillRule: "evenodd",
    d: "M5.72 8.47a.75.75 0 0 1 1.06 0l3.47 3.47 3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06Z"
  }));
};
SvgChevronDownIcon.displayName = "ChevronDownIcon";

// node_modules/@shopify/polaris-icons/dist/icons/ChevronLeftIcon.svg.mjs
var import_react29 = __toESM(require_react(), 1);
var SvgChevronLeftIcon = function SvgChevronLeftIcon2(props) {
  return /* @__PURE__ */ import_react29.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react29.default.createElement("path", {
    fillRule: "evenodd",
    d: "M11.764 5.204a.75.75 0 0 1 .032 1.06l-3.516 3.736 3.516 3.736a.75.75 0 1 1-1.092 1.028l-4-4.25a.75.75 0 0 1 0-1.028l4-4.25a.75.75 0 0 1 1.06-.032Z"
  }));
};
SvgChevronLeftIcon.displayName = "ChevronLeftIcon";

// node_modules/@shopify/polaris-icons/dist/icons/ChevronRightIcon.svg.mjs
var import_react30 = __toESM(require_react(), 1);
var SvgChevronRightIcon = function SvgChevronRightIcon2(props) {
  return /* @__PURE__ */ import_react30.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react30.default.createElement("path", {
    fillRule: "evenodd",
    d: "M7.72 14.53a.75.75 0 0 1 0-1.06l3.47-3.47-3.47-3.47a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0Z"
  }));
};
SvgChevronRightIcon.displayName = "ChevronRightIcon";

// node_modules/@shopify/polaris-icons/dist/icons/ChevronUpIcon.svg.mjs
var import_react31 = __toESM(require_react(), 1);
var SvgChevronUpIcon = function SvgChevronUpIcon2(props) {
  return /* @__PURE__ */ import_react31.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react31.default.createElement("path", {
    fillRule: "evenodd",
    d: "M14.53 12.28a.75.75 0 0 1-1.06 0l-3.47-3.47-3.47 3.47a.75.75 0 0 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06Z"
  }));
};
SvgChevronUpIcon.displayName = "ChevronUpIcon";

// node_modules/@shopify/polaris-icons/dist/icons/MenuHorizontalIcon.svg.mjs
var import_react32 = __toESM(require_react(), 1);
var SvgMenuHorizontalIcon = function SvgMenuHorizontalIcon2(props) {
  return /* @__PURE__ */ import_react32.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react32.default.createElement("path", {
    d: "M6 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  }), /* @__PURE__ */ import_react32.default.createElement("path", {
    d: "M11.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  }), /* @__PURE__ */ import_react32.default.createElement("path", {
    d: "M17 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  }));
};
SvgMenuHorizontalIcon.displayName = "MenuHorizontalIcon";

// node_modules/@shopify/polaris-icons/dist/icons/SearchIcon.svg.mjs
var import_react33 = __toESM(require_react(), 1);
var SvgSearchIcon = function SvgSearchIcon2(props) {
  return /* @__PURE__ */ import_react33.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react33.default.createElement("path", {
    fillRule: "evenodd",
    d: "M12.323 13.383a5.5 5.5 0 1 1 1.06-1.06l2.897 2.897a.75.75 0 1 1-1.06 1.06l-2.897-2.897Zm.677-4.383a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
  }));
};
SvgSearchIcon.displayName = "SearchIcon";

// node_modules/@shopify/polaris-icons/dist/icons/SelectIcon.svg.mjs
var import_react34 = __toESM(require_react(), 1);
var SvgSelectIcon = function SvgSelectIcon2(props) {
  return /* @__PURE__ */ import_react34.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react34.default.createElement("path", {
    d: "M10.884 4.323a1.25 1.25 0 0 0-1.768 0l-2.646 2.647a.75.75 0 0 0 1.06 1.06l2.47-2.47 2.47 2.47a.75.75 0 1 0 1.06-1.06l-2.646-2.647Z"
  }), /* @__PURE__ */ import_react34.default.createElement("path", {
    d: "m13.53 13.03-2.646 2.647a1.25 1.25 0 0 1-1.768 0l-2.646-2.647a.75.75 0 0 1 1.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 0 1 1.06 1.06Z"
  }));
};
SvgSelectIcon.displayName = "SelectIcon";

// node_modules/@shopify/polaris-icons/dist/icons/SortAscendingIcon.svg.mjs
var import_react35 = __toESM(require_react(), 1);
var SvgSortAscendingIcon = function SvgSortAscendingIcon2(props) {
  return /* @__PURE__ */ import_react35.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react35.default.createElement("path", {
    fillRule: "evenodd",
    d: "M9.116 4.323a1.25 1.25 0 0 1 1.768 0l2.646 2.647a.75.75 0 0 1-1.06 1.06l-2.47-2.47-2.47 2.47a.75.75 0 1 1-1.06-1.06l2.646-2.647Z"
  }), /* @__PURE__ */ import_react35.default.createElement("path", {
    fillOpacity: 0.33,
    fillRule: "evenodd",
    d: "M9.116 15.677a1.25 1.25 0 0 0 1.768 0l2.646-2.647a.75.75 0 0 0-1.06-1.06l-2.47 2.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647Z"
  }));
};
SvgSortAscendingIcon.displayName = "SortAscendingIcon";

// node_modules/@shopify/polaris-icons/dist/icons/SortDescendingIcon.svg.mjs
var import_react36 = __toESM(require_react(), 1);
var SvgSortDescendingIcon = function SvgSortDescendingIcon2(props) {
  return /* @__PURE__ */ import_react36.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react36.default.createElement("path", {
    fillOpacity: 0.33,
    fillRule: "evenodd",
    d: "M9.116 4.823a1.25 1.25 0 0 1 1.768 0l2.646 2.647a.75.75 0 0 1-1.06 1.06l-2.47-2.47-2.47 2.47a.75.75 0 1 1-1.06-1.06l2.646-2.647Z"
  }), /* @__PURE__ */ import_react36.default.createElement("path", {
    fillRule: "evenodd",
    d: "M9.116 15.177a1.25 1.25 0 0 0 1.768 0l2.646-2.647a.75.75 0 0 0-1.06-1.06l-2.47 2.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647Z"
  }));
};
SvgSortDescendingIcon.displayName = "SortDescendingIcon";

// node_modules/@shopify/polaris-icons/dist/icons/XCircleIcon.svg.mjs
var import_react37 = __toESM(require_react(), 1);
var SvgXCircleIcon = function SvgXCircleIcon2(props) {
  return /* @__PURE__ */ import_react37.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react37.default.createElement("path", {
    d: "M13.03 6.97a.75.75 0 0 1 0 1.06l-1.97 1.97 1.97 1.97a.75.75 0 1 1-1.06 1.06l-1.97-1.97-1.97 1.97a.75.75 0 0 1-1.06-1.06l1.97-1.97-1.97-1.97a.75.75 0 0 1 1.06-1.06l1.97 1.97 1.97-1.97a.75.75 0 0 1 1.06 0Z"
  }), /* @__PURE__ */ import_react37.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
  }));
};
SvgXCircleIcon.displayName = "XCircleIcon";

// node_modules/@shopify/polaris-icons/dist/icons/XIcon.svg.mjs
var import_react38 = __toESM(require_react(), 1);
var SvgXIcon = function SvgXIcon2(props) {
  return /* @__PURE__ */ import_react38.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react38.default.createElement("path", {
    d: "M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"
  }));
};
SvgXIcon.displayName = "XIcon";

// node_modules/@shopify/polaris-icons/dist/icons/XSmallIcon.svg.mjs
var import_react39 = __toESM(require_react(), 1);
var SvgXSmallIcon = function SvgXSmallIcon2(props) {
  return /* @__PURE__ */ import_react39.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react39.default.createElement("path", {
    d: "M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"
  }));
};
SvgXSmallIcon.displayName = "XSmallIcon";

// node_modules/@shopify/polaris-icons/dist/index.mjs
var import_react40 = __toESM(require_react(), 1);

// node_modules/@shopify/polaris/build/esm/utilities/is-element-in-viewport.js
function isElementInViewport(element) {
  const {
    top,
    left,
    bottom,
    right
  } = element.getBoundingClientRect();
  return top >= 0 && right <= window.innerWidth && bottom <= window.innerHeight && left >= 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/focus.js
var FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]';
var KEYBOARD_FOCUSABLE_SELECTORS = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]:not([tabindex="-1"])';
var MENUITEM_FOCUSABLE_SELECTORS = 'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])';
var handleMouseUpByBlurring = ({
  currentTarget
}) => currentTarget.blur();
function nextFocusableNode(node, filter) {
  const allFocusableElements = [...document.querySelectorAll(FOCUSABLE_SELECTOR)];
  const sliceLocation = allFocusableElements.indexOf(node) + 1;
  const focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);
  for (const focusableElement of focusableElementsAfterNode) {
    if (isElementInViewport(focusableElement) && (!filter || filter && filter(focusableElement))) {
      return focusableElement;
    }
  }
  return null;
}
function findFirstFocusableNode(element, onlyDescendants = true) {
  if (!onlyDescendants && matches(element, FOCUSABLE_SELECTOR)) {
    return element;
  }
  return element.querySelector(FOCUSABLE_SELECTOR);
}
function findFirstFocusableNodeIncludingDisabled(element) {
  const focusableSelector = `a,button,frame,iframe,input:not([type=hidden]),select,textarea,*[tabindex]`;
  if (matches(element, focusableSelector)) {
    return element;
  }
  return element.querySelector(focusableSelector);
}
function focusFirstFocusableNode(element, onlyDescendants = true) {
  findFirstFocusableNode(element, onlyDescendants)?.focus();
}
function focusNextFocusableNode(node, filter) {
  const nextFocusable = nextFocusableNode(node, filter);
  if (nextFocusable && nextFocusable instanceof HTMLElement) {
    nextFocusable.focus();
    return true;
  }
  return false;
}
function findFirstKeyboardFocusableNode(element, onlyDescendants = true) {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  return element.querySelector(KEYBOARD_FOCUSABLE_SELECTORS);
}
function focusFirstKeyboardFocusableNode(element, onlyDescendants = true) {
  const firstFocusable = findFirstKeyboardFocusableNode(element, onlyDescendants);
  if (firstFocusable) {
    firstFocusable.focus();
    return true;
  }
  return false;
}
function findLastKeyboardFocusableNode(element, onlyDescendants = true) {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  const allFocusable = element.querySelectorAll(KEYBOARD_FOCUSABLE_SELECTORS);
  return allFocusable[allFocusable.length - 1];
}
function focusLastKeyboardFocusableNode(element, onlyDescendants = true) {
  const lastFocusable = findLastKeyboardFocusableNode(element, onlyDescendants);
  if (lastFocusable) {
    lastFocusable.focus();
    return true;
  }
  return false;
}
function wrapFocusPreviousFocusableMenuItem(parentElement, currentFocusedElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[(currentItemIdx - 1 + allFocusableChildren.length) % allFocusableChildren.length].focus();
  }
}
function wrapFocusNextFocusableMenuItem(parentElement, currentFocusedElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[(currentItemIdx + 1) % allFocusableChildren.length].focus();
  }
}
function getMenuFocusableDescendants(element) {
  return element.querySelectorAll(MENUITEM_FOCUSABLE_SELECTORS);
}
function getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement) {
  let currentItemIdx = 0;
  for (const focusableChild of allFocusableChildren) {
    if (focusableChild === currentFocusedElement) {
      break;
    }
    currentItemIdx++;
  }
  return currentItemIdx === allFocusableChildren.length ? -1 : currentItemIdx;
}
function matches(node, selector) {
  if (node.matches) {
    return node.matches(selector);
  }
  const matches2 = (node.ownerDocument || document).querySelectorAll(selector);
  let i = matches2.length;
  while (--i >= 0 && matches2.item(i) !== node)
    return i > -1;
}

// node_modules/@shopify/polaris/build/esm/components/Button/Button.css.js
var styles2 = {
  "Button": "Polaris-Button",
  "disabled": "Polaris-Button--disabled",
  "pressed": "Polaris-Button--pressed",
  "variantPrimary": "Polaris-Button--variantPrimary",
  "variantSecondary": "Polaris-Button--variantSecondary",
  "variantTertiary": "Polaris-Button--variantTertiary",
  "variantPlain": "Polaris-Button--variantPlain",
  "removeUnderline": "Polaris-Button--removeUnderline",
  "variantMonochromePlain": "Polaris-Button--variantMonochromePlain",
  "toneSuccess": "Polaris-Button--toneSuccess",
  "toneCritical": "Polaris-Button--toneCritical",
  "sizeMicro": "Polaris-Button--sizeMicro",
  "sizeSlim": "Polaris-Button--sizeSlim",
  "sizeMedium": "Polaris-Button--sizeMedium",
  "sizeLarge": "Polaris-Button--sizeLarge",
  "textAlignCenter": "Polaris-Button--textAlignCenter",
  "textAlignStart": "Polaris-Button--textAlignStart",
  "textAlignLeft": "Polaris-Button--textAlignLeft",
  "textAlignEnd": "Polaris-Button--textAlignEnd",
  "textAlignRight": "Polaris-Button--textAlignRight",
  "fullWidth": "Polaris-Button--fullWidth",
  "iconOnly": "Polaris-Button--iconOnly",
  "iconWithText": "Polaris-Button--iconWithText",
  "disclosure": "Polaris-Button--disclosure",
  "loading": "Polaris-Button--loading",
  "pressable": "Polaris-Button--pressable",
  "hidden": "Polaris-Button--hidden",
  "Icon": "Polaris-Button__Icon",
  "Spinner": "Polaris-Button__Spinner"
};

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
var import_react41 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.css.js
var styles3 = {
  "Icon": "Polaris-Icon",
  "toneInherit": "Polaris-Icon--toneInherit",
  "toneBase": "Polaris-Icon--toneBase",
  "toneSubdued": "Polaris-Icon--toneSubdued",
  "toneCaution": "Polaris-Icon--toneCaution",
  "toneWarning": "Polaris-Icon--toneWarning",
  "toneCritical": "Polaris-Icon--toneCritical",
  "toneInteractive": "Polaris-Icon--toneInteractive",
  "toneInfo": "Polaris-Icon--toneInfo",
  "toneSuccess": "Polaris-Icon--toneSuccess",
  "tonePrimary": "Polaris-Icon--tonePrimary",
  "toneEmphasis": "Polaris-Icon--toneEmphasis",
  "toneMagic": "Polaris-Icon--toneMagic",
  "toneTextCaution": "Polaris-Icon--toneTextCaution",
  "toneTextWarning": "Polaris-Icon--toneTextWarning",
  "toneTextCritical": "Polaris-Icon--toneTextCritical",
  "toneTextInfo": "Polaris-Icon--toneTextInfo",
  "toneTextPrimary": "Polaris-Icon--toneTextPrimary",
  "toneTextSuccess": "Polaris-Icon--toneTextSuccess",
  "toneTextMagic": "Polaris-Icon--toneTextMagic",
  "Svg": "Polaris-Icon__Svg",
  "Img": "Polaris-Icon__Img",
  "Placeholder": "Polaris-Icon__Placeholder"
};

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
function Icon({
  source,
  tone,
  accessibilityLabel
}) {
  let sourceType;
  if (typeof source === "function") {
    sourceType = "function";
  } else if (source === "placeholder") {
    sourceType = "placeholder";
  } else {
    sourceType = "external";
  }
  if (tone && sourceType === "external" && true) {
    console.warn("Recoloring external SVGs is not supported. Set the intended color on your SVG instead.");
  }
  const className = classNames(styles3.Icon, tone && styles3[variationName("tone", tone)]);
  const {
    mdDown
  } = useBreakpoints();
  const SourceComponent = source;
  const contentMarkup = {
    function: /* @__PURE__ */ import_react41.default.createElement(SourceComponent, Object.assign({
      className: styles3.Svg,
      focusable: "false",
      "aria-hidden": "true"
      // On Mobile we're scaling the viewBox to 18x18 to make the icons bigger
      // Also, we're setting the viewport origin to 1x1 to center the icon
      // We use this syntax so we don't override the existing viewBox value if we don't need to.
    }, mdDown ? {
      viewBox: "1 1 18 18"
    } : {})),
    placeholder: /* @__PURE__ */ import_react41.default.createElement("div", {
      className: styles3.Placeholder
    }),
    external: /* @__PURE__ */ import_react41.default.createElement("img", {
      className: styles3.Img,
      src: `data:image/svg+xml;utf8,${source}`,
      alt: "",
      "aria-hidden": "true"
    })
  };
  return /* @__PURE__ */ import_react41.default.createElement("span", {
    className
  }, accessibilityLabel && /* @__PURE__ */ import_react41.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel), contentMarkup[sourceType]);
}

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
var import_react42 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.css.js
var styles4 = {
  "Spinner": "Polaris-Spinner",
  "sizeSmall": "Polaris-Spinner--sizeSmall",
  "sizeLarge": "Polaris-Spinner--sizeLarge"
};

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
function Spinner({
  size: size2 = "large",
  accessibilityLabel,
  hasFocusableParent
}) {
  const isAfterInitialMount = useIsAfterInitialMount();
  const className = classNames(styles4.Spinner, size2 && styles4[variationName("size", size2)]);
  const spinnerSVGMarkup = size2 === "large" ? /* @__PURE__ */ import_react42.default.createElement("svg", {
    viewBox: "0 0 44 44",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react42.default.createElement("path", {
    d: "M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z"
  })) : /* @__PURE__ */ import_react42.default.createElement("svg", {
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react42.default.createElement("path", {
    d: "M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z"
  }));
  const spanAttributes = {
    ...!hasFocusableParent && {
      role: "status"
    }
  };
  const accessibilityLabelMarkup = (isAfterInitialMount || !hasFocusableParent) && /* @__PURE__ */ import_react42.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel);
  return /* @__PURE__ */ import_react42.default.createElement(import_react42.default.Fragment, null, /* @__PURE__ */ import_react42.default.createElement("span", {
    className
  }, spinnerSVGMarkup), /* @__PURE__ */ import_react42.default.createElement("span", spanAttributes, accessibilityLabelMarkup));
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledButton/UnstyledButton.js
var import_react46 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-disable-interaction.js
var import_react43 = __toESM(require_react());
function useDisableClick(disabled, handleClick) {
  const handleClickWrapper = (0, import_react43.useCallback)((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [disabled]);
  if (!disabled) {
    return handleClick;
  }
  return handleClickWrapper;
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
var import_react45 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/link/hooks.js
var import_react44 = __toESM(require_react());
function useLink() {
  return (0, import_react44.useContext)(LinkContext);
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
var UnstyledLink = /* @__PURE__ */ (0, import_react45.memo)(/* @__PURE__ */ (0, import_react45.forwardRef)(function UnstyledLink2(props, _ref) {
  const LinkComponent = useLink();
  if (LinkComponent) {
    return /* @__PURE__ */ import_react45.default.createElement(LinkComponent, Object.assign({}, unstyled.props, props, {
      ref: _ref
    }));
  }
  const {
    external,
    url,
    target: targetProp,
    ...rest
  } = props;
  let target;
  if (external) {
    target = "_blank";
  } else {
    target = targetProp ?? void 0;
  }
  const rel = target === "_blank" ? "noopener noreferrer" : void 0;
  return /* @__PURE__ */ import_react45.default.createElement("a", Object.assign({
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
  let buttonMarkup;
  const commonProps = {
    id,
    className,
    "aria-label": accessibilityLabel
  };
  const interactiveProps = {
    ...commonProps,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart
  };
  const handleClick = useDisableClick(disabled, onClick);
  if (url) {
    buttonMarkup = disabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the
      // `href` attribute instead of replacing the whole element.
      /* @__PURE__ */ import_react46.default.createElement("a", commonProps, children)
    ) : /* @__PURE__ */ import_react46.default.createElement(UnstyledLink, Object.assign({}, interactiveProps, {
      url,
      external,
      target,
      download
    }, rest), children);
  } else {
    buttonMarkup = /* @__PURE__ */ import_react46.default.createElement("button", Object.assign({}, interactiveProps, {
      "aria-disabled": disabled,
      type: submit ? "submit" : "button",
      "aria-busy": loading ? true : void 0,
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
    }, rest), children);
  }
  return buttonMarkup;
}

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
var import_react47 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/errors.js
var MissingAppProviderError = class extends Error {
  constructor(message = "") {
    super(`${message ? `${message} ` : message}Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.`);
    this.name = "MissingAppProviderError";
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
function useI18n() {
  const i18n = (0, import_react47.useContext)(I18nContext);
  if (!i18n) {
    throw new MissingAppProviderError("No i18n was provided.");
  }
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
  size: size2 = "medium",
  textAlign = "center",
  fullWidth,
  dataPrimaryLink,
  tone,
  variant = "secondary"
}) {
  const i18n = useI18n();
  const isDisabled = disabled || loading;
  const {
    mdUp
  } = useBreakpoints();
  const className = classNames(styles2.Button, styles2.pressable, styles2[variationName("variant", variant)], styles2[variationName("size", size2)], styles2[variationName("textAlign", textAlign)], fullWidth && styles2.fullWidth, disclosure && styles2.disclosure, icon && children && styles2.iconWithText, icon && children == null && styles2.iconOnly, isDisabled && styles2.disabled, loading && styles2.loading, pressed && !disabled && !url && styles2.pressed, removeUnderline && styles2.removeUnderline, tone && styles2[variationName("tone", tone)]);
  const disclosureMarkup = disclosure ? /* @__PURE__ */ import_react48.default.createElement("span", {
    className: loading ? styles2.hidden : styles2.Icon
  }, /* @__PURE__ */ import_react48.default.createElement(Icon, {
    source: loading ? "placeholder" : getDisclosureIconSource(disclosure, SvgChevronUpIcon, SvgChevronDownIcon)
  })) : null;
  const iconSource = isIconSource(icon) ? /* @__PURE__ */ import_react48.default.createElement(Icon, {
    source: loading ? "placeholder" : icon
  }) : icon;
  const iconMarkup = iconSource ? /* @__PURE__ */ import_react48.default.createElement("span", {
    className: loading ? styles2.hidden : styles2.Icon
  }, iconSource) : null;
  const hasPlainText = ["plain", "monochromePlain"].includes(variant);
  let textFontWeight = "medium";
  if (hasPlainText) {
    textFontWeight = "regular";
  } else if (variant === "primary") {
    textFontWeight = mdUp ? "medium" : "semibold";
  }
  let textVariant = "bodySm";
  if (size2 === "large" || hasPlainText && size2 !== "micro") {
    textVariant = "bodyMd";
  }
  const childMarkup = children ? /* @__PURE__ */ import_react48.default.createElement(Text, {
    as: "span",
    variant: textVariant,
    fontWeight: textFontWeight,
    key: disabled ? "text-disabled" : "text"
  }, children) : null;
  const spinnerSVGMarkup = loading ? /* @__PURE__ */ import_react48.default.createElement("span", {
    className: styles2.Spinner
  }, /* @__PURE__ */ import_react48.default.createElement(Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate("Polaris.Button.spinnerAccessibilityLabel")
  })) : null;
  const commonProps = {
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
  };
  const linkProps = {
    url,
    external,
    download,
    target
  };
  const actionProps = {
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
  const buttonMarkup = /* @__PURE__ */ import_react48.default.createElement(UnstyledButton, Object.assign({}, commonProps, linkProps, actionProps), spinnerSVGMarkup, iconMarkup, childMarkup, disclosureMarkup);
  return buttonMarkup;
}
function isIconSource(x) {
  return typeof x === "string" || typeof x === "object" && x.body || typeof x === "function";
}
function getDisclosureIconSource(disclosure, upIcon, downIcon) {
  if (disclosure === "select") {
    return SvgSelectIcon;
  }
  return disclosure === "up" ? upIcon : downIcon;
}

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
var import_react49 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Box/Box.css.js
var styles5 = {
  "listReset": "Polaris-Box--listReset",
  "Box": "Polaris-Box",
  "visuallyHidden": "Polaris-Box--visuallyHidden",
  "printHidden": "Polaris-Box--printHidden"
};

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
var Box = /* @__PURE__ */ (0, import_react49.forwardRef)(({
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
  color: color2,
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
  shadow: shadow2,
  tabIndex,
  width: width2,
  printHidden,
  visuallyHidden,
  position,
  insetBlockStart,
  insetBlockEnd,
  insetInlineStart,
  insetInlineEnd,
  zIndex: zIndex2,
  opacity,
  ...restProps
}, ref) => {
  const borderStyleValue = borderStyle ? borderStyle : borderColor || borderWidth || borderBlockStartWidth || borderBlockEndWidth || borderInlineStartWidth || borderInlineEndWidth ? "solid" : void 0;
  const outlineStyleValue = outlineStyle ? outlineStyle : outlineColor || outlineWidth ? "solid" : void 0;
  const style = {
    "--pc-box-color": color2 ? `var(--p-color-${color2})` : void 0,
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
    "--pc-box-shadow": shadow2 ? `var(--p-shadow-${shadow2})` : void 0,
    "--pc-box-width": width2,
    position,
    "--pc-box-inset-block-start": insetBlockStart ? `var(--p-space-${insetBlockStart})` : void 0,
    "--pc-box-inset-block-end": insetBlockEnd ? `var(--p-space-${insetBlockEnd})` : void 0,
    "--pc-box-inset-inline-start": insetInlineStart ? `var(--p-space-${insetInlineStart})` : void 0,
    "--pc-box-inset-inline-end": insetInlineEnd ? `var(--p-space-${insetInlineEnd})` : void 0,
    zIndex: zIndex2,
    opacity
  };
  const className = classNames(styles5.Box, visuallyHidden && styles5.visuallyHidden, printHidden && styles5.printHidden, as === "ul" && styles5.listReset);
  return /* @__PURE__ */ import_react49.default.createElement(as, {
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
var import_react52 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/within-content-context.js
var import_react50 = __toESM(require_react());
var WithinContentContext = /* @__PURE__ */ (0, import_react50.createContext)(false);

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
var import_react51 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.css.js
var styles6 = {
  "ShadowBevel": "Polaris-ShadowBevel"
};

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
function ShadowBevel(props) {
  const {
    as = "div",
    bevel = true,
    borderRadius,
    boxShadow,
    children,
    zIndex: zIndex2 = "0"
  } = props;
  const Component3 = as;
  return /* @__PURE__ */ import_react51.default.createElement(Component3, {
    className: styles6.ShadowBevel,
    style: {
      "--pc-shadow-bevel-z-index": zIndex2,
      ...getResponsiveValue("shadow-bevel", "content", mapResponsiveProp(bevel, (bevel2) => bevel2 ? '""' : "none")),
      ...getResponsiveValue("shadow-bevel", "box-shadow", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-shadow-${boxShadow})` : "none")),
      ...getResponsiveValue("shadow-bevel", "border-radius", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-border-radius-${borderRadius})` : "var(--p-border-radius-0)"))
    }
  }, children);
}
function mapResponsiveProp(responsiveProp, callback) {
  if (typeof responsiveProp === "boolean") {
    return callback(responsiveProp);
  }
  return Object.fromEntries(Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [breakpointsAlias, callback(value)]));
}

// node_modules/@shopify/polaris/build/esm/components/Card/Card.js
var Card = ({
  children,
  background = "bg-surface",
  padding = {
    xs: "400"
  },
  roundedAbove = "sm"
}) => {
  const breakpoints2 = useBreakpoints();
  const defaultBorderRadius = "300";
  const hasBorderRadius = Boolean(breakpoints2[`${roundedAbove}Up`]);
  return /* @__PURE__ */ import_react52.default.createElement(WithinContentContext.Provider, {
    value: true
  }, /* @__PURE__ */ import_react52.default.createElement(ShadowBevel, {
    boxShadow: "100",
    borderRadius: hasBorderRadius ? defaultBorderRadius : "0",
    zIndex: "32"
  }, /* @__PURE__ */ import_react52.default.createElement(Box, {
    background,
    padding,
    overflowX: "clip",
    overflowY: "clip",
    minHeight: "100%"
  }, children)));
};

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.js
var import_react53 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.css.js
var styles7 = {
  "InlineStack": "Polaris-InlineStack"
};

// node_modules/@shopify/polaris/build/esm/components/InlineStack/InlineStack.js
var InlineStack = function InlineStack2({
  as: Element2 = "div",
  align,
  direction = "row",
  blockAlign,
  gap,
  wrap = true,
  children
}) {
  const style = {
    "--pc-inline-stack-align": align,
    "--pc-inline-stack-block-align": blockAlign,
    "--pc-inline-stack-wrap": wrap ? "wrap" : "nowrap",
    ...getResponsiveProps("inline-stack", "gap", "space", gap),
    ...getResponsiveValue("inline-stack", "flex-direction", direction)
  };
  return /* @__PURE__ */ import_react53.default.createElement(Element2, {
    className: styles7.InlineStack,
    style
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.js
var import_react54 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.css.js
var styles8 = {
  "BlockStack": "Polaris-BlockStack",
  "listReset": "Polaris-BlockStack--listReset",
  "fieldsetReset": "Polaris-BlockStack--fieldsetReset"
};

// node_modules/@shopify/polaris/build/esm/components/BlockStack/BlockStack.js
var BlockStack = ({
  as = "div",
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = false,
  ...restProps
}) => {
  const className = classNames(styles8.BlockStack, (as === "ul" || as === "ol") && styles8.listReset, as === "fieldset" && styles8.fieldsetReset);
  const style = {
    "--pc-block-stack-align": align ? `${align}` : null,
    "--pc-block-stack-inline-align": inlineAlign ? `${inlineAlign}` : null,
    "--pc-block-stack-order": reverseOrder ? "column-reverse" : "column",
    ...getResponsiveProps("block-stack", "gap", "space", gap)
  };
  return /* @__PURE__ */ import_react54.default.createElement(as, {
    className,
    id,
    style: sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
var import_react57 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/within-filter-context.js
var import_react55 = __toESM(require_react());
var WithinFilterContext = /* @__PURE__ */ (0, import_react55.createContext)(false);

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.css.js
var styles9 = {
  "Badge": "Polaris-Badge",
  "toneSuccess": "Polaris-Badge--toneSuccess",
  "toneSuccess-strong": "Polaris-Badge__toneSuccess--strong",
  "toneInfo": "Polaris-Badge--toneInfo",
  "toneInfo-strong": "Polaris-Badge__toneInfo--strong",
  "toneAttention": "Polaris-Badge--toneAttention",
  "toneAttention-strong": "Polaris-Badge__toneAttention--strong",
  "toneWarning": "Polaris-Badge--toneWarning",
  "toneWarning-strong": "Polaris-Badge__toneWarning--strong",
  "toneCritical": "Polaris-Badge--toneCritical",
  "toneCritical-strong": "Polaris-Badge__toneCritical--strong",
  "toneNew": "Polaris-Badge--toneNew",
  "toneMagic": "Polaris-Badge--toneMagic",
  "toneRead-only": "Polaris-Badge__toneRead--only",
  "toneEnabled": "Polaris-Badge--toneEnabled",
  "sizeLarge": "Polaris-Badge--sizeLarge",
  "withinFilter": "Polaris-Badge--withinFilter",
  "Icon": "Polaris-Badge__Icon",
  "PipContainer": "Polaris-Badge__PipContainer"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/types.js
var ToneValue;
(function(ToneValue2) {
  ToneValue2["Info"] = "info";
  ToneValue2["Success"] = "success";
  ToneValue2["Warning"] = "warning";
  ToneValue2["Critical"] = "critical";
  ToneValue2["Attention"] = "attention";
  ToneValue2["New"] = "new";
  ToneValue2["Magic"] = "magic";
  ToneValue2["InfoStrong"] = "info-strong";
  ToneValue2["SuccessStrong"] = "success-strong";
  ToneValue2["WarningStrong"] = "warning-strong";
  ToneValue2["CriticalStrong"] = "critical-strong";
  ToneValue2["AttentionStrong"] = "attention-strong";
  ToneValue2["ReadOnly"] = "read-only";
  ToneValue2["Enabled"] = "enabled";
})(ToneValue || (ToneValue = {}));
var ProgressValue;
(function(ProgressValue2) {
  ProgressValue2["Incomplete"] = "incomplete";
  ProgressValue2["PartiallyComplete"] = "partiallyComplete";
  ProgressValue2["Complete"] = "complete";
})(ProgressValue || (ProgressValue = {}));

// node_modules/@shopify/polaris/build/esm/components/Badge/utils.js
function getDefaultAccessibilityLabel(i18n, progress, tone) {
  let progressLabel = "";
  let toneLabel = "";
  if (!progress && !tone) {
    return "";
  }
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
  if (!tone && progress) {
    return progressLabel;
  } else if (tone && !progress) {
    return toneLabel;
  } else {
    return i18n.translate("Polaris.Badge.progressAndTone", {
      progressLabel,
      toneLabel
    });
  }
}

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
var import_react56 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.css.js
var styles10 = {
  "Pip": "Polaris-Badge-Pip",
  "toneInfo": "Polaris-Badge-Pip--toneInfo",
  "toneSuccess": "Polaris-Badge-Pip--toneSuccess",
  "toneNew": "Polaris-Badge-Pip--toneNew",
  "toneAttention": "Polaris-Badge-Pip--toneAttention",
  "toneWarning": "Polaris-Badge-Pip--toneWarning",
  "toneCritical": "Polaris-Badge-Pip--toneCritical",
  "progressIncomplete": "Polaris-Badge-Pip--progressIncomplete",
  "progressPartiallyComplete": "Polaris-Badge-Pip--progressPartiallyComplete",
  "progressComplete": "Polaris-Badge-Pip--progressComplete"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
function Pip({
  tone,
  progress = "complete",
  accessibilityLabelOverride
}) {
  const i18n = useI18n();
  const className = classNames(styles10.Pip, tone && styles10[variationName("tone", tone)], progress && styles10[variationName("progress", progress)]);
  const accessibilityLabel = accessibilityLabelOverride ? accessibilityLabelOverride : getDefaultAccessibilityLabel(i18n, progress, tone);
  return /* @__PURE__ */ import_react56.default.createElement("span", {
    className
  }, /* @__PURE__ */ import_react56.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel));
}

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
var DEFAULT_SIZE = "medium";
var progressIconMap = {
  complete: () => /* @__PURE__ */ import_react57.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react57.default.createElement("path", {
    d: "M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z"
  })),
  partiallyComplete: () => /* @__PURE__ */ import_react57.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react57.default.createElement("path", {
    fillRule: "evenodd",
    d: "m8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z"
  })),
  incomplete: () => /* @__PURE__ */ import_react57.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react57.default.createElement("path", {
    fillRule: "evenodd",
    d: "M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"
  }))
};
function Badge({
  children,
  tone,
  progress,
  icon,
  size: size2 = DEFAULT_SIZE,
  toneAndProgressLabelOverride
}) {
  const i18n = useI18n();
  const withinFilter = (0, import_react57.useContext)(WithinFilterContext);
  const className = classNames(styles9.Badge, tone && styles9[variationName("tone", tone)], size2 && size2 !== DEFAULT_SIZE && styles9[variationName("size", size2)], withinFilter && styles9.withinFilter);
  const accessibilityLabel = toneAndProgressLabelOverride ? toneAndProgressLabelOverride : getDefaultAccessibilityLabel(i18n, progress, tone);
  let accessibilityMarkup = Boolean(accessibilityLabel) && /* @__PURE__ */ import_react57.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel);
  if (progress && !icon) {
    accessibilityMarkup = /* @__PURE__ */ import_react57.default.createElement("span", {
      className: styles9.Icon
    }, /* @__PURE__ */ import_react57.default.createElement(Icon, {
      accessibilityLabel,
      source: progressIconMap[progress]
    }));
  }
  return /* @__PURE__ */ import_react57.default.createElement("span", {
    className
  }, accessibilityMarkup, icon && /* @__PURE__ */ import_react57.default.createElement("span", {
    className: styles9.Icon
  }, /* @__PURE__ */ import_react57.default.createElement(Icon, {
    source: icon
  })), children && /* @__PURE__ */ import_react57.default.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: tone === "new" ? "medium" : void 0
  }, children));
}
Badge.Pip = Pip;

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js
var import_react68 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/types.js
var Key;
(function(Key2) {
  Key2[Key2["Backspace"] = 8] = "Backspace";
  Key2[Key2["Tab"] = 9] = "Tab";
  Key2[Key2["Enter"] = 13] = "Enter";
  Key2[Key2["Shift"] = 16] = "Shift";
  Key2[Key2["Ctrl"] = 17] = "Ctrl";
  Key2[Key2["Alt"] = 18] = "Alt";
  Key2[Key2["Pause"] = 19] = "Pause";
  Key2[Key2["CapsLock"] = 20] = "CapsLock";
  Key2[Key2["Escape"] = 27] = "Escape";
  Key2[Key2["Space"] = 32] = "Space";
  Key2[Key2["PageUp"] = 33] = "PageUp";
  Key2[Key2["PageDown"] = 34] = "PageDown";
  Key2[Key2["End"] = 35] = "End";
  Key2[Key2["Home"] = 36] = "Home";
  Key2[Key2["LeftArrow"] = 37] = "LeftArrow";
  Key2[Key2["UpArrow"] = 38] = "UpArrow";
  Key2[Key2["RightArrow"] = 39] = "RightArrow";
  Key2[Key2["DownArrow"] = 40] = "DownArrow";
  Key2[Key2["Insert"] = 45] = "Insert";
  Key2[Key2["Delete"] = 46] = "Delete";
  Key2[Key2["Key0"] = 48] = "Key0";
  Key2[Key2["Key1"] = 49] = "Key1";
  Key2[Key2["Key2"] = 50] = "Key2";
  Key2[Key2["Key3"] = 51] = "Key3";
  Key2[Key2["Key4"] = 52] = "Key4";
  Key2[Key2["Key5"] = 53] = "Key5";
  Key2[Key2["Key6"] = 54] = "Key6";
  Key2[Key2["Key7"] = 55] = "Key7";
  Key2[Key2["Key8"] = 56] = "Key8";
  Key2[Key2["Key9"] = 57] = "Key9";
  Key2[Key2["KeyA"] = 65] = "KeyA";
  Key2[Key2["KeyB"] = 66] = "KeyB";
  Key2[Key2["KeyC"] = 67] = "KeyC";
  Key2[Key2["KeyD"] = 68] = "KeyD";
  Key2[Key2["KeyE"] = 69] = "KeyE";
  Key2[Key2["KeyF"] = 70] = "KeyF";
  Key2[Key2["KeyG"] = 71] = "KeyG";
  Key2[Key2["KeyH"] = 72] = "KeyH";
  Key2[Key2["KeyI"] = 73] = "KeyI";
  Key2[Key2["KeyJ"] = 74] = "KeyJ";
  Key2[Key2["KeyK"] = 75] = "KeyK";
  Key2[Key2["KeyL"] = 76] = "KeyL";
  Key2[Key2["KeyM"] = 77] = "KeyM";
  Key2[Key2["KeyN"] = 78] = "KeyN";
  Key2[Key2["KeyO"] = 79] = "KeyO";
  Key2[Key2["KeyP"] = 80] = "KeyP";
  Key2[Key2["KeyQ"] = 81] = "KeyQ";
  Key2[Key2["KeyR"] = 82] = "KeyR";
  Key2[Key2["KeyS"] = 83] = "KeyS";
  Key2[Key2["KeyT"] = 84] = "KeyT";
  Key2[Key2["KeyU"] = 85] = "KeyU";
  Key2[Key2["KeyV"] = 86] = "KeyV";
  Key2[Key2["KeyW"] = 87] = "KeyW";
  Key2[Key2["KeyX"] = 88] = "KeyX";
  Key2[Key2["KeyY"] = 89] = "KeyY";
  Key2[Key2["KeyZ"] = 90] = "KeyZ";
  Key2[Key2["LeftMeta"] = 91] = "LeftMeta";
  Key2[Key2["RightMeta"] = 92] = "RightMeta";
  Key2[Key2["Select"] = 93] = "Select";
  Key2[Key2["Numpad0"] = 96] = "Numpad0";
  Key2[Key2["Numpad1"] = 97] = "Numpad1";
  Key2[Key2["Numpad2"] = 98] = "Numpad2";
  Key2[Key2["Numpad3"] = 99] = "Numpad3";
  Key2[Key2["Numpad4"] = 100] = "Numpad4";
  Key2[Key2["Numpad5"] = 101] = "Numpad5";
  Key2[Key2["Numpad6"] = 102] = "Numpad6";
  Key2[Key2["Numpad7"] = 103] = "Numpad7";
  Key2[Key2["Numpad8"] = 104] = "Numpad8";
  Key2[Key2["Numpad9"] = 105] = "Numpad9";
  Key2[Key2["Multiply"] = 106] = "Multiply";
  Key2[Key2["Add"] = 107] = "Add";
  Key2[Key2["Subtract"] = 109] = "Subtract";
  Key2[Key2["Decimal"] = 110] = "Decimal";
  Key2[Key2["Divide"] = 111] = "Divide";
  Key2[Key2["F1"] = 112] = "F1";
  Key2[Key2["F2"] = 113] = "F2";
  Key2[Key2["F3"] = 114] = "F3";
  Key2[Key2["F4"] = 115] = "F4";
  Key2[Key2["F5"] = 116] = "F5";
  Key2[Key2["F6"] = 117] = "F6";
  Key2[Key2["F7"] = 118] = "F7";
  Key2[Key2["F8"] = 119] = "F8";
  Key2[Key2["F9"] = 120] = "F9";
  Key2[Key2["F10"] = 121] = "F10";
  Key2[Key2["F11"] = 122] = "F11";
  Key2[Key2["F12"] = 123] = "F12";
  Key2[Key2["NumLock"] = 144] = "NumLock";
  Key2[Key2["ScrollLock"] = 145] = "ScrollLock";
  Key2[Key2["Semicolon"] = 186] = "Semicolon";
  Key2[Key2["Equals"] = 187] = "Equals";
  Key2[Key2["Comma"] = 188] = "Comma";
  Key2[Key2["Dash"] = 189] = "Dash";
  Key2[Key2["Period"] = 190] = "Period";
  Key2[Key2["ForwardSlash"] = 191] = "ForwardSlash";
  Key2[Key2["GraveAccent"] = 192] = "GraveAccent";
  Key2[Key2["OpenBracket"] = 219] = "OpenBracket";
  Key2[Key2["BackSlash"] = 220] = "BackSlash";
  Key2[Key2["CloseBracket"] = 221] = "CloseBracket";
  Key2[Key2["SingleQuote"] = 222] = "SingleQuote";
})(Key || (Key = {}));

// node_modules/@shopify/polaris/build/esm/utilities/use-event-listener.js
var import_react58 = __toESM(require_react());
function useEventListener(eventName, handler, target, options) {
  const handlerRef = (0, import_react58.useRef)(handler);
  const optionsRef = (0, import_react58.useRef)(options);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);
  (0, import_react58.useEffect)(() => {
    if (!(typeof eventName === "string" && target !== null))
      return;
    let targetElement;
    if (typeof target === "undefined") {
      targetElement = window;
    } else if ("current" in target) {
      if (target.current === null)
        return;
      targetElement = target.current;
    } else {
      targetElement = target;
    }
    const eventOptions = optionsRef.current;
    const eventListener = (event) => handlerRef.current(event);
    targetElement.addEventListener(eventName, eventListener, eventOptions);
    return () => {
      targetElement.removeEventListener(eventName, eventListener, eventOptions);
    };
  }, [eventName, target]);
}

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.css.js
var styles11 = {
  "TextField": "Polaris-TextField",
  "ClearButton": "Polaris-TextField__ClearButton",
  "Loading": "Polaris-TextField__Loading",
  "disabled": "Polaris-TextField--disabled",
  "error": "Polaris-TextField--error",
  "readOnly": "Polaris-TextField--readOnly",
  "Input": "Polaris-TextField__Input",
  "Backdrop": "Polaris-TextField__Backdrop",
  "multiline": "Polaris-TextField--multiline",
  "hasValue": "Polaris-TextField--hasValue",
  "focus": "Polaris-TextField--focus",
  "VerticalContent": "Polaris-TextField__VerticalContent",
  "InputAndSuffixWrapper": "Polaris-TextField__InputAndSuffixWrapper",
  "toneMagic": "Polaris-TextField--toneMagic",
  "Prefix": "Polaris-TextField__Prefix",
  "Suffix": "Polaris-TextField__Suffix",
  "AutoSizeWrapper": "Polaris-TextField__AutoSizeWrapper",
  "AutoSizeWrapperWithSuffix": "Polaris-TextField__AutoSizeWrapperWithSuffix",
  "suggestion": "Polaris-TextField--suggestion",
  "borderless": "Polaris-TextField--borderless",
  "slim": "Polaris-TextField--slim",
  "Input-hasClearButton": "Polaris-TextField__Input--hasClearButton",
  "Input-suffixed": "Polaris-TextField__Input--suffixed",
  "Input-alignRight": "Polaris-TextField__Input--alignRight",
  "Input-alignLeft": "Polaris-TextField__Input--alignLeft",
  "Input-alignCenter": "Polaris-TextField__Input--alignCenter",
  "Input-autoSize": "Polaris-TextField__Input--autoSize",
  "PrefixIcon": "Polaris-TextField__PrefixIcon",
  "CharacterCount": "Polaris-TextField__CharacterCount",
  "AlignFieldBottom": "Polaris-TextField__AlignFieldBottom",
  "Spinner": "Polaris-TextField__Spinner",
  "SpinnerIcon": "Polaris-TextField__SpinnerIcon",
  "Resizer": "Polaris-TextField__Resizer",
  "DummyInput": "Polaris-TextField__DummyInput",
  "Segment": "Polaris-TextField__Segment",
  "monospaced": "Polaris-TextField--monospaced"
};

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Spinner/Spinner.js
var import_react59 = __toESM(require_react());
var Spinner2 = /* @__PURE__ */ import_react59.default.forwardRef(function Spinner3({
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
      if (event.button !== 0)
        return;
      onMouseDown?.(onChange2);
    };
  }
  return /* @__PURE__ */ import_react59.default.createElement("div", {
    className: styles11.Spinner,
    onClick,
    "aria-hidden": true,
    ref
  }, /* @__PURE__ */ import_react59.default.createElement("div", {
    role: "button",
    className: styles11.Segment,
    tabIndex: -1,
    onClick: handleStep(1),
    onMouseDown: handleMouseDown(handleStep(1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ import_react59.default.createElement("div", {
    className: styles11.SpinnerIcon
  }, /* @__PURE__ */ import_react59.default.createElement(Icon, {
    source: SvgChevronUpIcon
  }))), /* @__PURE__ */ import_react59.default.createElement("div", {
    role: "button",
    className: styles11.Segment,
    tabIndex: -1,
    onClick: handleStep(-1),
    onMouseDown: handleMouseDown(handleStep(-1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ import_react59.default.createElement("div", {
    className: styles11.SpinnerIcon
  }, /* @__PURE__ */ import_react59.default.createElement(Icon, {
    source: SvgChevronDownIcon
  }))));
});

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
var import_react63 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.css.js
var styles12 = {
  "hidden": "Polaris-Labelled--hidden",
  "LabelWrapper": "Polaris-Labelled__LabelWrapper",
  "disabled": "Polaris-Labelled--disabled",
  "HelpText": "Polaris-Labelled__HelpText",
  "readOnly": "Polaris-Labelled--readOnly",
  "Error": "Polaris-Labelled__Error",
  "Action": "Polaris-Labelled__Action"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
var import_react60 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.css.js
var styles13 = {
  "InlineError": "Polaris-InlineError",
  "Icon": "Polaris-InlineError__Icon"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
function InlineError({
  message,
  fieldID
}) {
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ import_react60.default.createElement("div", {
    id: errorTextID(fieldID),
    className: styles13.InlineError
  }, /* @__PURE__ */ import_react60.default.createElement("div", {
    className: styles13.Icon
  }, /* @__PURE__ */ import_react60.default.createElement(Icon, {
    source: SvgAlertCircleIcon
  })), /* @__PURE__ */ import_react60.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, message));
}
function errorTextID(id) {
  return `${id}Error`;
}

// node_modules/@shopify/polaris/build/esm/components/Label/Label.js
var import_react61 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Label/Label.css.js
var styles14 = {
  "Label": "Polaris-Label",
  "hidden": "Polaris-Label--hidden",
  "Text": "Polaris-Label__Text",
  "RequiredIndicator": "Polaris-Label__RequiredIndicator"
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
  const className = classNames(styles14.Label, hidden && styles14.hidden);
  return /* @__PURE__ */ import_react61.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react61.default.createElement("label", {
    id: labelID(id),
    htmlFor: id,
    className: classNames(styles14.Text, requiredIndicator && styles14.RequiredIndicator)
  }, /* @__PURE__ */ import_react61.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Button/utils.js
var import_react62 = __toESM(require_react());
function buttonsFrom(actions, overrides = {}) {
  if (Array.isArray(actions)) {
    return actions.map((action, index) => buttonFrom(action, overrides, index));
  } else {
    const action = actions;
    return buttonFrom(action, overrides);
  }
}
function buttonFrom({
  content,
  onAction,
  plain,
  destructive,
  ...action
}, overrides, key) {
  const plainVariant = plain ? "plain" : void 0;
  const destructiveVariant = destructive ? "primary" : void 0;
  const tone = !overrides?.tone && destructive ? "critical" : overrides?.tone;
  return /* @__PURE__ */ import_react62.default.createElement(Button, Object.assign({
    key,
    onClick: onAction,
    tone,
    variant: plainVariant || destructiveVariant
  }, action, overrides), content);
}

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
function Labelled({
  id,
  label,
  error,
  action,
  helpText,
  children,
  labelHidden,
  requiredIndicator,
  disabled,
  readOnly,
  ...rest
}) {
  const className = classNames(labelHidden && styles12.hidden, disabled && styles12.disabled, readOnly && styles12.readOnly);
  const actionMarkup = action ? /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles12.Action
  }, buttonFrom(action, {
    variant: "plain"
  })) : null;
  const helpTextMarkup = helpText ? /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles12.HelpText,
    id: helpTextID(id),
    "aria-disabled": disabled
  }, /* @__PURE__ */ import_react63.default.createElement(Text, {
    as: "span",
    tone: "subdued",
    variant: "bodyMd",
    breakWord: true
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== "boolean" && /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles12.Error
  }, /* @__PURE__ */ import_react63.default.createElement(InlineError, {
    message: error,
    fieldID: id
  }));
  const labelMarkup = label ? /* @__PURE__ */ import_react63.default.createElement("div", {
    className: styles12.LabelWrapper
  }, /* @__PURE__ */ import_react63.default.createElement(Label, Object.assign({
    id,
    requiredIndicator
  }, rest, {
    hidden: false
  }), label), actionMarkup) : null;
  return /* @__PURE__ */ import_react63.default.createElement("div", {
    className
  }, labelMarkup, children, errorMarkup, helpTextMarkup);
}
function helpTextID(id) {
  return `${id}HelpText`;
}

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.js
var import_react66 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.css.js
var styles15 = {
  "Connected": "Polaris-Connected",
  "Item": "Polaris-Connected__Item",
  "Item-primary": "Polaris-Connected__Item--primary",
  "Item-focused": "Polaris-Connected__Item--focused"
};

// node_modules/@shopify/polaris/build/esm/components/Connected/components/Item/Item.js
var import_react65 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-toggle.js
var import_react64 = __toESM(require_react());
function useToggle(initialState) {
  const [value, setState] = (0, import_react64.useState)(initialState);
  return {
    value,
    toggle: (0, import_react64.useCallback)(() => setState((state) => !state), []),
    setTrue: (0, import_react64.useCallback)(() => setState(true), []),
    setFalse: (0, import_react64.useCallback)(() => setState(false), [])
  };
}

// node_modules/@shopify/polaris/build/esm/components/Connected/components/Item/Item.js
function Item({
  children,
  position
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(false);
  const className = classNames(styles15.Item, focused && styles15["Item-focused"], position === "primary" ? styles15["Item-primary"] : styles15["Item-connection"]);
  return /* @__PURE__ */ import_react65.default.createElement("div", {
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
  const leftConnectionMarkup = left ? /* @__PURE__ */ import_react66.default.createElement(Item, {
    position: "left"
  }, left) : null;
  const rightConnectionMarkup = right ? /* @__PURE__ */ import_react66.default.createElement(Item, {
    position: "right"
  }, right) : null;
  return /* @__PURE__ */ import_react66.default.createElement("div", {
    className: styles15.Connected
  }, leftConnectionMarkup, /* @__PURE__ */ import_react66.default.createElement(Item, {
    position: "primary"
  }, children), rightConnectionMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Resizer/Resizer.js
var import_react67 = __toESM(require_react());
function Resizer({
  contents,
  currentHeight: currentHeightProp = null,
  minimumLines,
  onHeightChange
}) {
  const contentNode = (0, import_react67.useRef)(null);
  const minimumLinesNode = (0, import_react67.useRef)(null);
  const animationFrame = (0, import_react67.useRef)();
  const currentHeight = (0, import_react67.useRef)(currentHeightProp);
  if (currentHeightProp !== currentHeight.current) {
    currentHeight.current = currentHeightProp;
  }
  (0, import_react67.useEffect)(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);
  const minimumLinesMarkup = minimumLines ? /* @__PURE__ */ import_react67.default.createElement("div", {
    ref: minimumLinesNode,
    className: styles11.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getContentsForMinimumLines(minimumLines)
    }
  }) : null;
  const handleHeightCheck = (0, import_react67.useCallback)(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      if (!contentNode.current || !minimumLinesNode.current) {
        return;
      }
      const newHeight = Math.max(contentNode.current.offsetHeight, minimumLinesNode.current.offsetHeight);
      if (newHeight !== currentHeight.current) {
        onHeightChange(newHeight);
      }
    });
  }, [onHeightChange]);
  useIsomorphicLayoutEffect(() => {
    handleHeightCheck();
  });
  return /* @__PURE__ */ import_react67.default.createElement("div", {
    "aria-hidden": true,
    className: styles11.Resizer
  }, /* @__PURE__ */ import_react67.default.createElement(EventListener, {
    event: "resize",
    handler: handleHeightCheck
  }), /* @__PURE__ */ import_react67.default.createElement("div", {
    ref: contentNode,
    className: styles11.DummyInput,
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
};
var REPLACE_REGEX2 = new RegExp(`[${Object.keys(ENTITIES_TO_REPLACE).join()}]`, "g");
function replaceEntity(entity) {
  return ENTITIES_TO_REPLACE[entity];
}
function getContentsForMinimumLines(minimumLines) {
  let content = "";
  for (let line = 0; line < minimumLines; line++) {
    content += "<br>";
  }
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
  size: size2 = "medium",
  onClearButtonClick,
  onChange,
  onSpinnerChange,
  onFocus,
  onBlur,
  tone,
  autoSize,
  loading
}) {
  const i18n = useI18n();
  const [height2, setHeight] = (0, import_react68.useState)(null);
  const [focus, setFocus] = (0, import_react68.useState)(Boolean(focused));
  const isAfterInitial = useIsAfterInitialMount();
  const uniqId = (0, import_react68.useId)();
  const id = idProp ?? uniqId;
  const textFieldRef = (0, import_react68.useRef)(null);
  const inputRef = (0, import_react68.useRef)(null);
  const textAreaRef = (0, import_react68.useRef)(null);
  const prefixRef = (0, import_react68.useRef)(null);
  const suffixRef = (0, import_react68.useRef)(null);
  const loadingRef = (0, import_react68.useRef)(null);
  const verticalContentRef = (0, import_react68.useRef)(null);
  const buttonPressTimer = (0, import_react68.useRef)();
  const spinnerRef = (0, import_react68.useRef)(null);
  const getInputRef = (0, import_react68.useCallback)(() => {
    return multiline ? textAreaRef.current : inputRef.current;
  }, [multiline]);
  (0, import_react68.useEffect)(() => {
    const input2 = getInputRef();
    if (!input2 || focused === void 0)
      return;
    focused ? input2.focus() : input2.blur();
  }, [focused, verticalContent, getInputRef]);
  (0, import_react68.useEffect)(() => {
    const input2 = inputRef.current;
    const isSupportedInputType = type === "text" || type === "tel" || type === "search" || type === "url" || type === "password";
    if (!input2 || !isSupportedInputType || !suggestion) {
      return;
    }
    input2.setSelectionRange(value.length, suggestion.length);
  }, [focus, value, type, suggestion]);
  const normalizedValue = suggestion ? suggestion : value;
  const normalizedStep = step != null ? step : 1;
  const normalizedMax = max != null ? max : Infinity;
  const normalizedMin = min != null ? min : -Infinity;
  const className = classNames(styles11.TextField, Boolean(normalizedValue) && styles11.hasValue, disabled && styles11.disabled, readOnly && styles11.readOnly, error && styles11.error, tone && styles11[variationName("tone", tone)], multiline && styles11.multiline, focus && !disabled && styles11.focus, variant !== "inherit" && styles11[variant], size2 === "slim" && styles11.slim);
  const inputType = type === "currency" ? "text" : type;
  const isNumericType = type === "number" || type === "integer";
  const iconPrefix = /* @__PURE__ */ import_react68.default.isValidElement(prefix) && prefix.type === Icon;
  const prefixMarkup = prefix ? /* @__PURE__ */ import_react68.default.createElement("div", {
    className: classNames(styles11.Prefix, iconPrefix && styles11.PrefixIcon),
    id: `${id}-Prefix`,
    ref: prefixRef
  }, /* @__PURE__ */ import_react68.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, prefix)) : null;
  const suffixMarkup = suffix ? /* @__PURE__ */ import_react68.default.createElement("div", {
    className: styles11.Suffix,
    id: `${id}-Suffix`,
    ref: suffixRef
  }, /* @__PURE__ */ import_react68.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, suffix)) : null;
  const loadingMarkup = loading ? /* @__PURE__ */ import_react68.default.createElement("div", {
    className: styles11.Loading,
    id: `${id}-Loading`,
    ref: loadingRef
  }, /* @__PURE__ */ import_react68.default.createElement(Spinner, {
    size: "small"
  })) : null;
  let characterCountMarkup = null;
  if (showCharacterCount) {
    const characterCount = normalizedValue.length;
    const characterCountLabel = maxLength ? i18n.translate("Polaris.TextField.characterCountWithMaxLength", {
      count: characterCount,
      limit: maxLength
    }) : i18n.translate("Polaris.TextField.characterCount", {
      count: characterCount
    });
    const characterCountClassName = classNames(styles11.CharacterCount, multiline && styles11.AlignFieldBottom);
    const characterCountText = !maxLength ? characterCount : `${characterCount}/${maxLength}`;
    characterCountMarkup = /* @__PURE__ */ import_react68.default.createElement("div", {
      id: `${id}-CharacterCounter`,
      className: characterCountClassName,
      "aria-label": characterCountLabel,
      "aria-live": focus ? "polite" : "off",
      "aria-atomic": "true",
      onClick: handleClickChild
    }, /* @__PURE__ */ import_react68.default.createElement(Text, {
      as: "span",
      variant: "bodyMd"
    }, characterCountText));
  }
  const clearButtonVisible = normalizedValue !== "";
  const clearButtonMarkup = clearButton && clearButtonVisible ? /* @__PURE__ */ import_react68.default.createElement("button", {
    type: "button",
    className: styles11.ClearButton,
    onClick: handleClearButtonPress,
    disabled
  }, /* @__PURE__ */ import_react68.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, i18n.translate("Polaris.Common.clear")), /* @__PURE__ */ import_react68.default.createElement(Icon, {
    source: SvgXCircleIcon,
    tone: "base"
  })) : null;
  const handleNumberChange = (0, import_react68.useCallback)((steps, stepAmount = normalizedStep) => {
    if (onChange == null && onSpinnerChange == null) {
      return;
    }
    const dpl = (num) => (num.toString().split(".")[1] || []).length;
    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) {
      return;
    }
    const decimalPlaces = type === "integer" ? 0 : Math.max(dpl(numericValue), dpl(stepAmount));
    const newValue = Math.min(Number(normalizedMax), Math.max(numericValue + steps * stepAmount, Number(normalizedMin)));
    if (onSpinnerChange != null) {
      onSpinnerChange(String(newValue.toFixed(decimalPlaces)), id);
    } else if (onChange != null) {
      onChange(String(newValue.toFixed(decimalPlaces)), id);
    }
  }, [id, normalizedMax, normalizedMin, onChange, onSpinnerChange, normalizedStep, type, value]);
  const handleSpinnerButtonRelease = (0, import_react68.useCallback)(() => {
    clearTimeout(buttonPressTimer.current);
  }, []);
  const handleSpinnerButtonPress = (0, import_react68.useCallback)((onChange2) => {
    const minInterval = 50;
    const decrementBy = 10;
    let interval = 200;
    const onChangeInterval = () => {
      if (interval > minInterval)
        interval -= decrementBy;
      onChange2(0);
      buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    };
    buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    document.addEventListener("mouseup", handleSpinnerButtonRelease, {
      once: true
    });
  }, [handleSpinnerButtonRelease]);
  const spinnerMarkup = isNumericType && step !== 0 && !disabled && !readOnly ? /* @__PURE__ */ import_react68.default.createElement(Spinner2, {
    onClick: handleClickChild,
    onChange: handleNumberChange,
    onMouseDown: handleSpinnerButtonPress,
    onMouseUp: handleSpinnerButtonRelease,
    ref: spinnerRef,
    onBlur: handleOnBlur
  }) : null;
  const style = multiline && height2 ? {
    height: height2,
    maxHeight
  } : null;
  const handleExpandingResize = (0, import_react68.useCallback)((height3) => {
    setHeight(height3);
  }, []);
  const resizer = multiline && isAfterInitial ? /* @__PURE__ */ import_react68.default.createElement(Resizer, {
    contents: normalizedValue || placeholder,
    currentHeight: height2,
    minimumLines: typeof multiline === "number" ? multiline : 1,
    onHeightChange: handleExpandingResize
  }) : null;
  const describedBy = [];
  if (error) {
    describedBy.push(`${id}Error`);
  }
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (showCharacterCount) {
    describedBy.push(`${id}-CharacterCounter`);
  }
  const labelledBy = [];
  if (prefix) {
    labelledBy.push(`${id}-Prefix`);
  }
  if (suffix) {
    labelledBy.push(`${id}-Suffix`);
  }
  if (verticalContent) {
    labelledBy.push(`${id}-VerticalContent`);
  }
  labelledBy.unshift(labelID(id));
  const inputClassName = classNames(styles11.Input, align && styles11[variationName("Input-align", align)], suffix && styles11["Input-suffixed"], clearButton && styles11["Input-hasClearButton"], monospaced && styles11.monospaced, suggestion && styles11.suggestion, autoSize && styles11["Input-autoSize"]);
  const handleOnFocus = (event) => {
    setFocus(true);
    if (selectTextOnFocus && !suggestion) {
      const input2 = getInputRef();
      input2?.select();
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  useEventListener("wheel", handleOnWheel, inputRef);
  function handleOnWheel(event) {
    if (document.activeElement === event.target && isNumericType) {
      event.stopPropagation();
    }
  }
  const input = /* @__PURE__ */ (0, import_react68.createElement)(multiline ? "textarea" : "input", {
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
    onChange: !suggestion ? handleChange : void 0,
    onInput: suggestion ? handleChange : void 0,
    // 1Password disable data attribute
    "data-1p-ignore": autoComplete === "off" || void 0,
    // LastPass disable data attribute
    "data-lpignore": autoComplete === "off" || void 0,
    // Dashlane disable data attribute
    "data-form-type": autoComplete === "off" ? "other" : void 0
  });
  const inputWithVerticalContentMarkup = verticalContent ? /* @__PURE__ */ import_react68.default.createElement("div", {
    className: styles11.VerticalContent,
    id: `${id}-VerticalContent`,
    ref: verticalContentRef,
    onClick: handleClickChild
  }, verticalContent, input) : null;
  const inputMarkup = verticalContent ? inputWithVerticalContentMarkup : input;
  const backdropMarkup = /* @__PURE__ */ import_react68.default.createElement("div", {
    className: classNames(styles11.Backdrop, connectedLeft && styles11["Backdrop-connectedLeft"], connectedRight && styles11["Backdrop-connectedRight"])
  });
  const inputAndSuffixMarkup = autoSize ? /* @__PURE__ */ import_react68.default.createElement("div", {
    className: styles11.InputAndSuffixWrapper
  }, /* @__PURE__ */ import_react68.default.createElement("div", {
    className: classNames(styles11.AutoSizeWrapper, suffix && styles11.AutoSizeWrapperWithSuffix),
    "data-auto-size-value": value || placeholder
  }, inputMarkup), suffixMarkup) : /* @__PURE__ */ import_react68.default.createElement(import_react68.default.Fragment, null, inputMarkup, suffixMarkup);
  return /* @__PURE__ */ import_react68.default.createElement(Labelled, {
    label,
    id,
    error,
    action: labelAction,
    labelHidden,
    helpText,
    requiredIndicator,
    disabled,
    readOnly
  }, /* @__PURE__ */ import_react68.default.createElement(Connected, {
    left: connectedLeft,
    right: connectedRight
  }, /* @__PURE__ */ import_react68.default.createElement("div", {
    className,
    onClick: handleClick,
    ref: textFieldRef
  }, prefixMarkup, inputAndSuffixMarkup, characterCountMarkup, loadingMarkup, clearButtonMarkup, spinnerMarkup, backdropMarkup, resizer)));
  function handleChange(event) {
    onChange && onChange(event.currentTarget.value, id);
  }
  function handleClick(event) {
    const {
      target
    } = event;
    const inputRefRole = inputRef?.current?.getAttribute("role");
    if (target === inputRef.current && inputRefRole === "combobox") {
      inputRef.current?.focus();
      handleOnFocus(event);
      return;
    }
    if (isPrefixOrSuffix(target) || isVerticalContent(target) || isInput(target) || isSpinner(target) || isLoadingSpinner(target) || focus) {
      return;
    }
    getInputRef()?.focus();
  }
  function handleClickChild(event) {
    if (!isSpinner(event.target) && !isInput(event.target)) {
      event.stopPropagation();
    }
    if (isPrefixOrSuffix(event.target) || isVerticalContent(event.target) || isInput(event.target) || isLoadingSpinner(event.target) || focus) {
      return;
    }
    setFocus(true);
    getInputRef()?.focus();
  }
  function handleClearButtonPress() {
    onClearButtonClick && onClearButtonClick(id);
  }
  function handleKeyPress(event) {
    const {
      key,
      which
    } = event;
    const numbersSpec = /[\d.,eE+-]$/;
    const integerSpec = /[\deE+-]$/;
    if (!isNumericType || which === Key.Enter || type === "number" && numbersSpec.test(key) || type === "integer" && integerSpec.test(key)) {
      return;
    }
    event.preventDefault();
  }
  function handleKeyDown(event) {
    if (!isNumericType) {
      return;
    }
    const {
      key,
      which
    } = event;
    if (type === "integer" && (key === "ArrowUp" || which === Key.UpArrow)) {
      handleNumberChange(1);
      event.preventDefault();
    }
    if (type === "integer" && (key === "ArrowDown" || which === Key.DownArrow)) {
      handleNumberChange(-1);
      event.preventDefault();
    }
    if ((which === Key.Home || key === "Home") && min !== void 0) {
      if (onSpinnerChange != null) {
        onSpinnerChange(String(min), id);
      } else if (onChange != null) {
        onChange(String(min), id);
      }
    }
    if ((which === Key.End || key === "End") && max !== void 0) {
      if (onSpinnerChange != null) {
        onSpinnerChange(String(max), id);
      } else if (onChange != null) {
        onChange(String(max), id);
      }
    }
    if ((which === Key.PageUp || key === "PageUp") && largeStep !== void 0) {
      handleNumberChange(1, largeStep);
    }
    if ((which === Key.PageDown || key === "PageDown") && largeStep !== void 0) {
      handleNumberChange(-1, largeStep);
    }
  }
  function handleOnBlur(event) {
    setFocus(false);
    if (textFieldRef.current?.contains(event?.relatedTarget)) {
      return;
    }
    if (onBlur) {
      onBlur(event);
    }
  }
  function isInput(target) {
    const input2 = getInputRef();
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
  if (!multiline)
    return void 0;
  return typeof multiline === "number" ? multiline : 1;
}
function normalizeAriaMultiline(multiline) {
  if (!multiline)
    return void 0;
  return Boolean(multiline) || typeof multiline === "number" && multiline > 0 ? {
    "aria-multiline": true
  } : void 0;
}

// node_modules/@shopify/polaris/build/esm/components/Collapsible/Collapsible.js
var import_react69 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Collapsible/Collapsible.css.js
var styles16 = {
  "Collapsible": "Polaris-Collapsible",
  "isFullyClosed": "Polaris-Collapsible--isFullyClosed",
  "expandOnPrint": "Polaris-Collapsible--expandOnPrint"
};

// node_modules/@shopify/polaris/build/esm/components/Collapsible/Collapsible.js
function Collapsible({
  id,
  expandOnPrint,
  open,
  transition = true,
  children,
  onAnimationEnd
}) {
  const [height2, setHeight] = (0, import_react69.useState)(0);
  const [isOpen, setIsOpen] = (0, import_react69.useState)(open);
  const [animationState, setAnimationState] = (0, import_react69.useState)("idle");
  const collapsibleContainer = (0, import_react69.useRef)(null);
  const isFullyOpen = animationState === "idle" && open && isOpen;
  const isFullyClosed = animationState === "idle" && !open && !isOpen;
  const content = expandOnPrint || !isFullyClosed ? children : null;
  const wrapperClassName = classNames(styles16.Collapsible, isFullyClosed && styles16.isFullyClosed, expandOnPrint && styles16.expandOnPrint);
  const transitionDisabled = isTransitionDisabled(transition);
  const transitionStyles = typeof transition === "object" && {
    transitionDuration: transition.duration,
    transitionTimingFunction: transition.timingFunction
  };
  const collapsibleStyles = {
    ...transitionStyles,
    ...{
      maxHeight: isFullyOpen ? "none" : `${height2}px`,
      overflow: isFullyOpen ? "visible" : "hidden"
    }
  };
  const handleCompleteAnimation = (0, import_react69.useCallback)(({
    target
  }) => {
    if (target === collapsibleContainer.current) {
      setAnimationState("idle");
      setIsOpen(open);
      onAnimationEnd && onAnimationEnd();
    }
  }, [onAnimationEnd, open]);
  const startAnimation = (0, import_react69.useCallback)(() => {
    if (transitionDisabled) {
      setIsOpen(open);
      setAnimationState("idle");
      if (open && collapsibleContainer.current) {
        setHeight(collapsibleContainer.current.scrollHeight);
      } else {
        setHeight(0);
      }
    } else {
      setAnimationState("measuring");
    }
  }, [open, transitionDisabled]);
  (0, import_react69.useEffect)(() => {
    if (open !== isOpen) {
      startAnimation();
    }
  }, [open, isOpen]);
  (0, import_react69.useEffect)(() => {
    if (!open || !collapsibleContainer.current)
      return;
    setHeight(collapsibleContainer.current.scrollHeight);
  }, []);
  (0, import_react69.useEffect)(() => {
    if (!collapsibleContainer.current)
      return;
    switch (animationState) {
      case "idle":
        break;
      case "measuring":
        setHeight(collapsibleContainer.current.scrollHeight);
        setAnimationState("animating");
        break;
      case "animating":
        setHeight(open ? collapsibleContainer.current.scrollHeight : 0);
    }
  }, [animationState, open, isOpen]);
  return /* @__PURE__ */ import_react69.default.createElement("div", {
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
  if (typeof transitionProp === "boolean") {
    return !transitionProp;
  }
  const {
    duration
  } = transitionProp;
  if (duration && zeroDurationRegex.test(duration.trim())) {
    return true;
  }
  return false;
}

// node_modules/@shopify/polaris/build/esm/components/Modal/Modal.js
var import_react98 = __toESM(require_react());

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r)
    return {};
  var t = {};
  for (var n in r)
    if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n))
        continue;
      t[n] = r[n];
    }
  return t;
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}

// node_modules/react-transition-group/esm/CSSTransition.js
var import_prop_types3 = __toESM(require_prop_types());

// node_modules/dom-helpers/esm/hasClass.js
function hasClass(element, className) {
  if (element.classList)
    return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

// node_modules/dom-helpers/esm/addClass.js
function addClass(element, className) {
  if (element.classList)
    element.classList.add(className);
  else if (!hasClass(element, className))
    if (typeof element.className === "string")
      element.className = element.className + " " + className;
    else
      element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}

// node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
  }
}

// node_modules/react-transition-group/esm/CSSTransition.js
var import_react72 = __toESM(require_react());

// node_modules/react-transition-group/esm/Transition.js
var import_prop_types2 = __toESM(require_prop_types());
var import_react71 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/react-transition-group/esm/config.js
var config_default = {
  disabled: false
};

// node_modules/react-transition-group/esm/utils/PropTypes.js
var import_prop_types = __toESM(require_prop_types());
var timeoutsShape = true ? import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
  enter: import_prop_types.default.number,
  exit: import_prop_types.default.number,
  appear: import_prop_types.default.number
}).isRequired]) : null;
var classNamesShape = true ? import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.shape({
  enter: import_prop_types.default.string,
  exit: import_prop_types.default.string,
  active: import_prop_types.default.string
}), import_prop_types.default.shape({
  enter: import_prop_types.default.string,
  enterDone: import_prop_types.default.string,
  enterActive: import_prop_types.default.string,
  exit: import_prop_types.default.string,
  exitDone: import_prop_types.default.string,
  exitActive: import_prop_types.default.string
})]) : null;

// node_modules/react-transition-group/esm/TransitionGroupContext.js
var import_react70 = __toESM(require_react());
var TransitionGroupContext_default = import_react70.default.createContext(null);

// node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow2(node) {
  return node.scrollTop;
};

// node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
          if (node)
            forceReflow(node);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom.default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config_default.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : import_react_dom.default.findDOMNode(this);
    if (!exit || config_default.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children, _in = _this$props.in, _mountOnEnter = _this$props.mountOnEnter, _unmountOnExit = _this$props.unmountOnExit, _appear = _this$props.appear, _enter = _this$props.enter, _exit = _this$props.exit, _timeout = _this$props.timeout, _addEndListener = _this$props.addEndListener, _onEnter = _this$props.onEnter, _onEntering = _this$props.onEntering, _onEntered = _this$props.onEntered, _onExit = _this$props.onExit, _onExiting = _this$props.onExiting, _onExited = _this$props.onExited, _nodeRef = _this$props.nodeRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ import_react71.default.createElement(TransitionGroupContext_default.Provider, {
        value: null
      }, typeof children === "function" ? children(status, childProps) : import_react71.default.cloneElement(import_react71.default.Children.only(children), childProps))
    );
  };
  return Transition2;
}(import_react71.default.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = true ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: import_prop_types2.default.shape({
    current: typeof Element === "undefined" ? import_prop_types2.default.any : function(propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return import_prop_types2.default.instanceOf(value && "ownerDocument" in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: import_prop_types2.default.oneOfType([import_prop_types2.default.func.isRequired, import_prop_types2.default.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: import_prop_types2.default.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: import_prop_types2.default.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: import_prop_types2.default.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: import_prop_types2.default.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: import_prop_types2.default.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: import_prop_types2.default.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener)
      pt = pt.isRequired;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return pt.apply(void 0, [props].concat(args));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: import_prop_types2.default.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: import_prop_types2.default.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: import_prop_types2.default.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: import_prop_types2.default.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: import_prop_types2.default.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: import_prop_types2.default.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: import_prop_types2.default.func
} : {};
function noop2() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop2,
  onEntering: noop2,
  onEntered: noop2,
  onExit: noop2,
  onExiting: noop2,
  onExited: noop2
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition_default = Transition;

// node_modules/react-transition-group/esm/CSSTransition.js
var _addClass = function addClass2(node, classes) {
  return node && classes && classes.split(" ").forEach(function(c) {
    return addClass(node, c);
  });
};
var removeClass2 = function removeClass3(node, classes) {
  return node && classes && classes.split(" ").forEach(function(c) {
    return removeClass(node, c);
  });
};
var CSSTransition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(CSSTransition2, _React$Component);
  function CSSTransition2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };
    _this.onEnter = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument[0], appearing = _this$resolveArgument[1];
      _this.removeClasses(node, "exit");
      _this.addClass(node, appearing ? "appear" : "enter", "base");
      if (_this.props.onEnter) {
        _this.props.onEnter(maybeNode, maybeAppearing);
      }
    };
    _this.onEntering = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument2[0], appearing = _this$resolveArgument2[1];
      var type = appearing ? "appear" : "enter";
      _this.addClass(node, type, "active");
      if (_this.props.onEntering) {
        _this.props.onEntering(maybeNode, maybeAppearing);
      }
    };
    _this.onEntered = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument3[0], appearing = _this$resolveArgument3[1];
      var type = appearing ? "appear" : "enter";
      _this.removeClasses(node, type);
      _this.addClass(node, type, "done");
      if (_this.props.onEntered) {
        _this.props.onEntered(maybeNode, maybeAppearing);
      }
    };
    _this.onExit = function(maybeNode) {
      var _this$resolveArgument4 = _this.resolveArguments(maybeNode), node = _this$resolveArgument4[0];
      _this.removeClasses(node, "appear");
      _this.removeClasses(node, "enter");
      _this.addClass(node, "exit", "base");
      if (_this.props.onExit) {
        _this.props.onExit(maybeNode);
      }
    };
    _this.onExiting = function(maybeNode) {
      var _this$resolveArgument5 = _this.resolveArguments(maybeNode), node = _this$resolveArgument5[0];
      _this.addClass(node, "exit", "active");
      if (_this.props.onExiting) {
        _this.props.onExiting(maybeNode);
      }
    };
    _this.onExited = function(maybeNode) {
      var _this$resolveArgument6 = _this.resolveArguments(maybeNode), node = _this$resolveArgument6[0];
      _this.removeClasses(node, "exit");
      _this.addClass(node, "exit", "done");
      if (_this.props.onExited) {
        _this.props.onExited(maybeNode);
      }
    };
    _this.resolveArguments = function(maybeNode, maybeAppearing) {
      return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] : [maybeNode, maybeAppearing];
    };
    _this.getClassNames = function(type) {
      var classNames2 = _this.props.classNames;
      var isStringClassNames = typeof classNames2 === "string";
      var prefix = isStringClassNames && classNames2 ? classNames2 + "-" : "";
      var baseClassName = isStringClassNames ? "" + prefix + type : classNames2[type];
      var activeClassName = isStringClassNames ? baseClassName + "-active" : classNames2[type + "Active"];
      var doneClassName = isStringClassNames ? baseClassName + "-done" : classNames2[type + "Done"];
      return {
        baseClassName,
        activeClassName,
        doneClassName
      };
    };
    return _this;
  }
  var _proto = CSSTransition2.prototype;
  _proto.addClass = function addClass3(node, type, phase) {
    var className = this.getClassNames(type)[phase + "ClassName"];
    var _this$getClassNames = this.getClassNames("enter"), doneClassName = _this$getClassNames.doneClassName;
    if (type === "appear" && phase === "done" && doneClassName) {
      className += " " + doneClassName;
    }
    if (phase === "active") {
      if (node)
        forceReflow(node);
    }
    if (className) {
      this.appliedClasses[type][phase] = className;
      _addClass(node, className);
    }
  };
  _proto.removeClasses = function removeClasses(node, type) {
    var _this$appliedClasses$ = this.appliedClasses[type], baseClassName = _this$appliedClasses$.base, activeClassName = _this$appliedClasses$.active, doneClassName = _this$appliedClasses$.done;
    this.appliedClasses[type] = {};
    if (baseClassName) {
      removeClass2(node, baseClassName);
    }
    if (activeClassName) {
      removeClass2(node, activeClassName);
    }
    if (doneClassName) {
      removeClass2(node, doneClassName);
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, _ = _this$props.classNames, props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);
    return /* @__PURE__ */ import_react72.default.createElement(Transition_default, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };
  return CSSTransition2;
}(import_react72.default.Component);
CSSTransition.defaultProps = {
  classNames: ""
};
CSSTransition.propTypes = true ? _extends({}, Transition_default.propTypes, {
  /**
   * The animation classNames applied to the component as it appears, enters,
   * exits or has finished the transition. A single name can be provided, which
   * will be suffixed for each stage, e.g. `classNames="fade"` applies:
   *
   * - `fade-appear`, `fade-appear-active`, `fade-appear-done`
   * - `fade-enter`, `fade-enter-active`, `fade-enter-done`
   * - `fade-exit`, `fade-exit-active`, `fade-exit-done`
   *
   * A few details to note about how these classes are applied:
   *
   * 1. They are _joined_ with the ones that are already defined on the child
   *    component, so if you want to add some base styles, you can use
   *    `className` without worrying that it will be overridden.
   *
   * 2. If the transition component mounts with `in={false}`, no classes are
   *    applied yet. You might be expecting `*-exit-done`, but if you think
   *    about it, a component cannot finish exiting if it hasn't entered yet.
   *
   * 2. `fade-appear-done` and `fade-enter-done` will _both_ be applied. This
   *    allows you to define different behavior for when appearing is done and
   *    when regular entering is done, using selectors like
   *    `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply
   *    an epic entrance animation when element first appears in the DOM using
   *    [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
   *    simply use `fade-enter-done` for defining both cases.
   *
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  appearDone: 'my-done-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  enterDone: 'my-done-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   *  exitDone: 'my-done-exit',
   * }}
   * ```
   *
   * If you want to set these classes using CSS Modules:
   *
   * ```js
   * import styles from './styles.css';
   * ```
   *
   * you might want to use camelCase in your CSS file, that way could simply
   * spread them instead of listing them one by one:
   *
   * ```js
   * classNames={{ ...styles }}
   * ```
   *
   * @type {string | {
   *  appear?: string,
   *  appearActive?: string,
   *  appearDone?: string,
   *  enter?: string,
   *  enterActive?: string,
   *  enterDone?: string,
   *  exit?: string,
   *  exitActive?: string,
   *  exitDone?: string,
   * }}
   */
  classNames: classNamesShape,
  /**
   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEnter: import_prop_types3.default.func,
  /**
   * A `<Transition>` callback fired immediately after the 'enter-active' or
   * 'appear-active' class is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: import_prop_types3.default.func,
  /**
   * A `<Transition>` callback fired immediately after the 'enter' or
   * 'appear' classes are **removed** and the `done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntered: import_prop_types3.default.func,
  /**
   * A `<Transition>` callback fired immediately after the 'exit' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExit: import_prop_types3.default.func,
  /**
   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExiting: import_prop_types3.default.func,
  /**
   * A `<Transition>` callback fired immediately after the 'exit' classes
   * are **removed** and the `exit-done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExited: import_prop_types3.default.func
}) : {};
var CSSTransition_default = CSSTransition;

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

// node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types4 = __toESM(require_prop_types());
var import_react74 = __toESM(require_react());

// node_modules/react-transition-group/esm/utils/ChildMapping.js
var import_react73 = __toESM(require_react());
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && (0, import_react73.isValidElement)(child) ? mapFn(child) : child;
  };
  var result = /* @__PURE__ */ Object.create(null);
  if (children)
    import_react73.Children.map(children, function(c) {
      return c;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = /* @__PURE__ */ Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return (0, import_react73.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!(0, import_react73.isValidElement)(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = (0, import_react73.isValidElement)(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = (0, import_react73.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = (0, import_react73.cloneElement)(child, {
        in: false
      });
    } else if (hasNext && hasPrev && (0, import_react73.isValidElement)(prevChild)) {
      children[key] = (0, import_react73.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}

// node_modules/react-transition-group/esm/TransitionGroup.js
var values = Object.values || function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, Component3 = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component3 === null) {
      return /* @__PURE__ */ import_react74.default.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ import_react74.default.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ import_react74.default.createElement(Component3, props, children));
  };
  return TransitionGroup2;
}(import_react74.default.Component);
TransitionGroup.propTypes = true ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: import_prop_types4.default.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: import_prop_types4.default.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: import_prop_types4.default.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: import_prop_types4.default.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: import_prop_types4.default.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: import_prop_types4.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// node_modules/@shopify/polaris/build/esm/utilities/components.js
var import_react75 = __toESM(require_react());
function wrapWithComponent(element, Component3, props) {
  if (element == null) {
    return null;
  }
  return isElementOfType(element, Component3) ? element : /* @__PURE__ */ import_react75.default.createElement(Component3, props, element);
}
var isComponent = true ? hotReloadComponentCheck : (AComponent, AnotherComponent) => AComponent === AnotherComponent;
function isElementOfType(element, Component3) {
  if (element == null || !/* @__PURE__ */ (0, import_react75.isValidElement)(element) || typeof element.type === "string") {
    return false;
  }
  const {
    type: defaultType
  } = element;
  const overrideType = element.props?.__type__;
  const type = overrideType || defaultType;
  const Components = Array.isArray(Component3) ? Component3 : [Component3];
  return Components.some((AComponent) => typeof type !== "string" && isComponent(AComponent, type));
}
function elementChildren(children, predicate = () => true) {
  return import_react75.Children.toArray(children).filter((child) => /* @__PURE__ */ (0, import_react75.isValidElement)(child) && predicate(child));
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
function hotReloadComponentCheck(AComponent, AnotherComponent) {
  const componentName = AComponent.name;
  const anotherComponentName = AnotherComponent.displayName;
  return AComponent === AnotherComponent || Boolean(componentName) && componentName === anotherComponentName;
}

// node_modules/@shopify/polaris/build/esm/components/Modal/Modal.css.js
var styles17 = {
  "Body": "Polaris-Modal__Body",
  "NoScrollBody": "Polaris-Modal__NoScrollBody",
  "IFrame": "Polaris-Modal__IFrame"
};

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Section/Section.js
var import_react76 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Section/Section.css.js
var styles18 = {
  "Section": "Polaris-Modal-Section",
  "titleHidden": "Polaris-Modal-Section--titleHidden"
};

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Section/Section.js
function Section({
  children,
  flush = false,
  subdued = false,
  titleHidden = false
}) {
  const className = classNames(styles18.Section, titleHidden && styles18.titleHidden);
  return /* @__PURE__ */ import_react76.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react76.default.createElement(Box, Object.assign({
    as: "section",
    padding: flush ? "0" : "400"
  }, titleHidden && {
    paddingInlineEnd: "0"
  }, subdued && {
    background: "bg-surface-tertiary"
  }), children));
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Dialog/Dialog.js
var import_react82 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Dialog/Dialog.css.js
var styles19 = {
  "Container": "Polaris-Modal-Dialog__Container",
  "Dialog": "Polaris-Modal-Dialog",
  "Modal": "Polaris-Modal-Dialog__Modal",
  "limitHeight": "Polaris-Modal-Dialog--limitHeight",
  "sizeSmall": "Polaris-Modal-Dialog--sizeSmall",
  "sizeLarge": "Polaris-Modal-Dialog--sizeLarge",
  "sizeFullScreen": "Polaris-Modal-Dialog--sizeFullScreen",
  "animateFadeUp": "Polaris-Modal-Dialog--animateFadeUp",
  "entering": "Polaris-Modal-Dialog--entering",
  "exiting": "Polaris-Modal-Dialog--exiting",
  "exited": "Polaris-Modal-Dialog--exited",
  "entered": "Polaris-Modal-Dialog--entered"
};

// node_modules/@shopify/polaris/build/esm/utilities/frame/context.js
var import_react77 = __toESM(require_react());
var FrameContext = /* @__PURE__ */ (0, import_react77.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/TrapFocus/TrapFocus.js
var import_react81 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/focus-manager/hooks.js
var import_react78 = __toESM(require_react());
function useFocusManager({
  trapping
}) {
  const focusManager = (0, import_react78.useContext)(FocusManagerContext);
  const id = (0, import_react78.useId)();
  if (!focusManager) {
    throw new MissingAppProviderError("No FocusManager was provided.");
  }
  const {
    trapFocusList,
    add: addFocusItem,
    remove: removeFocusItem
  } = focusManager;
  const canSafelyFocus = trapFocusList[0] === id;
  const value = (0, import_react78.useMemo)(() => ({
    canSafelyFocus
  }), [canSafelyFocus]);
  (0, import_react78.useEffect)(() => {
    if (!trapping)
      return;
    addFocusItem(id);
    return () => {
      removeFocusItem(id);
    };
  }, [addFocusItem, id, removeFocusItem, trapping]);
  return value;
}

// node_modules/@shopify/polaris/build/esm/components/Focus/Focus.js
var import_react79 = __toESM(require_react());
var Focus = /* @__PURE__ */ (0, import_react79.memo)(function Focus2({
  children,
  disabled,
  root
}) {
  (0, import_react79.useEffect)(() => {
    if (disabled || !root) {
      return;
    }
    const node = isRef(root) ? root.current : root;
    if (!node || node.querySelector("[autofocus]")) {
      return;
    }
    focusFirstFocusableNode(node, false);
  }, [disabled, root]);
  return /* @__PURE__ */ import_react79.default.createElement(import_react79.default.Fragment, null, children);
});
function isRef(ref) {
  return ref.current !== void 0;
}

// node_modules/@shopify/polaris/build/esm/components/KeypressListener/KeypressListener.js
var import_react80 = __toESM(require_react());
function KeypressListener({
  keyCode,
  handler,
  keyEvent = "keyup",
  options,
  useCapture
}) {
  const tracked = (0, import_react80.useRef)({
    handler,
    keyCode
  });
  useIsomorphicLayoutEffect(() => {
    tracked.current = {
      handler,
      keyCode
    };
  }, [handler, keyCode]);
  const handleKeyEvent = (0, import_react80.useCallback)((event) => {
    const {
      handler: handler2,
      keyCode: keyCode2
    } = tracked.current;
    if (event.keyCode === keyCode2) {
      handler2(event);
    }
  }, []);
  (0, import_react80.useEffect)(() => {
    document.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
    };
  }, [keyEvent, handleKeyEvent, useCapture, options]);
  return null;
}

// node_modules/@shopify/polaris/build/esm/components/TrapFocus/TrapFocus.js
function TrapFocus({
  trapping = true,
  children
}) {
  const {
    canSafelyFocus
  } = useFocusManager({
    trapping
  });
  const focusTrapWrapper = (0, import_react81.useRef)(null);
  const [disableFocus, setDisableFocus] = (0, import_react81.useState)(true);
  (0, import_react81.useEffect)(() => {
    const disable = canSafelyFocus && !(focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement)) ? !trapping : true;
    setDisableFocus(disable);
  }, [canSafelyFocus, trapping]);
  const handleFocusIn = (event) => {
    const containerContentsHaveFocus = focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement);
    if (trapping === false || !focusTrapWrapper.current || containerContentsHaveFocus || event.target instanceof Element && event.target.matches(`${portal.selector} *`)) {
      return;
    }
    if (canSafelyFocus && event.target instanceof HTMLElement && focusTrapWrapper.current !== event.target && !focusTrapWrapper.current.contains(event.target)) {
      focusFirstFocusableNode(focusTrapWrapper.current);
    }
  };
  const handleTab = (event) => {
    if (trapping === false || !focusTrapWrapper.current) {
      return;
    }
    const firstFocusableNode = findFirstKeyboardFocusableNode(focusTrapWrapper.current);
    const lastFocusableNode = findLastKeyboardFocusableNode(focusTrapWrapper.current);
    if (event.target === lastFocusableNode && !event.shiftKey) {
      event.preventDefault();
      focusFirstKeyboardFocusableNode(focusTrapWrapper.current);
    }
    if (event.target === firstFocusableNode && event.shiftKey) {
      event.preventDefault();
      focusLastKeyboardFocusableNode(focusTrapWrapper.current);
    }
  };
  return /* @__PURE__ */ import_react81.default.createElement(Focus, {
    disabled: disableFocus,
    root: focusTrapWrapper.current
  }, /* @__PURE__ */ import_react81.default.createElement("div", {
    ref: focusTrapWrapper
  }, /* @__PURE__ */ import_react81.default.createElement(EventListener, {
    event: "focusin",
    handler: handleFocusIn
  }), /* @__PURE__ */ import_react81.default.createElement(KeypressListener, {
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
  size: size2,
  onClose,
  onExited,
  onEntered,
  setClosing,
  hasToasts,
  ...props
}) {
  const theme = useTheme();
  const containerNode = (0, import_react82.useRef)(null);
  const frameContext = (0, import_react82.useContext)(FrameContext);
  let toastMessages;
  if (frameContext) {
    toastMessages = frameContext.toastMessages;
  }
  const classes = classNames(styles19.Modal, size2 && styles19[variationName("size", size2)], limitHeight && styles19.limitHeight);
  const TransitionChild = instant ? Transition_default : FadeUp;
  (0, import_react82.useEffect)(() => {
    containerNode.current && !containerNode.current.contains(document.activeElement) && focusFirstFocusableNode(containerNode.current);
  }, []);
  const handleKeyDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };
  const handleKeyUp = () => {
    if (setClosing) {
      setClosing(false);
    }
    onClose();
  };
  const ariaLiveAnnouncements = /* @__PURE__ */ import_react82.default.createElement("div", {
    "aria-live": "assertive"
  }, toastMessages ? toastMessages.map((toastMessage) => /* @__PURE__ */ import_react82.default.createElement(Text, {
    visuallyHidden: true,
    as: "p",
    key: toastMessage.id
  }, toastMessage.content)) : null);
  return /* @__PURE__ */ import_react82.default.createElement(TransitionChild, Object.assign({}, props, {
    nodeRef: containerNode,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: parseInt(theme.motion["motion-duration-200"], 10),
    onEntered,
    onExited
  }), /* @__PURE__ */ import_react82.default.createElement("div", {
    className: styles19.Container,
    "data-polaris-layer": true,
    "data-polaris-overlay": true,
    ref: containerNode
  }, /* @__PURE__ */ import_react82.default.createElement(TrapFocus, null, /* @__PURE__ */ import_react82.default.createElement("div", {
    role: "dialog",
    "aria-modal": true,
    "aria-label": labelledBy,
    "aria-labelledby": labelledBy,
    tabIndex: -1,
    className: styles19.Dialog
  }, /* @__PURE__ */ import_react82.default.createElement("div", {
    className: classes
  }, /* @__PURE__ */ import_react82.default.createElement(KeypressListener, {
    keyCode: Key.Escape,
    keyEvent: "keydown",
    handler: handleKeyDown
  }), /* @__PURE__ */ import_react82.default.createElement(KeypressListener, {
    keyCode: Key.Escape,
    handler: handleKeyUp
  }), children), ariaLiveAnnouncements))));
}
var fadeUpClasses = {
  appear: classNames(styles19.animateFadeUp, styles19.entering),
  appearActive: classNames(styles19.animateFadeUp, styles19.entered),
  enter: classNames(styles19.animateFadeUp, styles19.entering),
  enterActive: classNames(styles19.animateFadeUp, styles19.entered),
  exit: classNames(styles19.animateFadeUp, styles19.exiting),
  exitActive: classNames(styles19.animateFadeUp, styles19.exited)
};
function FadeUp({
  children,
  ...props
}) {
  return /* @__PURE__ */ import_react82.default.createElement(CSSTransition_default, Object.assign({}, props, {
    classNames: fadeUpClasses
  }), children);
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Header/Header.js
var import_react85 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Modal/components/CloseButton/CloseButton.js
var import_react83 = __toESM(require_react());
function CloseButton({
  pressed,
  onClick
}) {
  const i18n = useI18n();
  return /* @__PURE__ */ import_react83.default.createElement(Button, {
    variant: "tertiary",
    pressed,
    icon: SvgXIcon,
    onClick,
    accessibilityLabel: i18n.translate("Polaris.Common.close")
  });
}

// node_modules/@shopify/polaris/build/esm/components/InlineGrid/InlineGrid.js
var import_react84 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/InlineGrid/InlineGrid.css.js
var styles20 = {
  "InlineGrid": "Polaris-InlineGrid"
};

// node_modules/@shopify/polaris/build/esm/components/InlineGrid/InlineGrid.js
function InlineGrid({
  children,
  columns,
  gap,
  alignItems
}) {
  const style = {
    ...getResponsiveValue("inline-grid", "grid-template-columns", formatInlineGrid(columns)),
    ...getResponsiveProps("inline-grid", "gap", "space", gap),
    "--pc-inline-grid-align-items": alignItems
  };
  return /* @__PURE__ */ import_react84.default.createElement("div", {
    className: styles20.InlineGrid,
    style: sanitizeCustomProperties(style)
  }, children);
}
function formatInlineGrid(columns) {
  if (typeof columns === "object" && columns !== null && !Array.isArray(columns)) {
    return Object.fromEntries(Object.entries(columns).map(([breakpointAlias, breakpointInlineGrid]) => [breakpointAlias, getColumnValue(breakpointInlineGrid)]));
  }
  return getColumnValue(columns);
}
function getColumnValue(columns) {
  if (!columns)
    return void 0;
  if (typeof columns === "number" || !isNaN(Number(columns))) {
    return `repeat(${Number(columns)}, minmax(0, 1fr))`;
  }
  if (typeof columns === "string")
    return columns;
  return columns.map((column) => {
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

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Header/Header.js
function Header({
  id,
  children,
  closing,
  titleHidden,
  onClose
}) {
  const headerPaddingInline = "400";
  const headerPaddingBlock = "400";
  if (titleHidden || !children) {
    return /* @__PURE__ */ import_react85.default.createElement(Box, {
      position: "absolute",
      insetInlineEnd: headerPaddingInline,
      insetBlockStart: headerPaddingBlock,
      zIndex: "1"
    }, /* @__PURE__ */ import_react85.default.createElement(CloseButton, {
      onClick: onClose
    }));
  }
  return /* @__PURE__ */ import_react85.default.createElement(Box, {
    paddingBlockStart: "400",
    paddingBlockEnd: "400",
    paddingInlineStart: headerPaddingInline,
    paddingInlineEnd: headerPaddingInline,
    borderBlockEndWidth: "025",
    borderColor: "border",
    background: "bg-surface-tertiary"
  }, /* @__PURE__ */ import_react85.default.createElement(InlineGrid, {
    columns: {
      xs: "1fr auto"
    },
    gap: "400"
  }, /* @__PURE__ */ import_react85.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /* @__PURE__ */ import_react85.default.createElement(Text, {
    id,
    as: "h2",
    variant: "headingMd",
    breakWord: true
  }, children)), /* @__PURE__ */ import_react85.default.createElement(CloseButton, {
    pressed: closing,
    onClick: onClose
  })));
}

// node_modules/@shopify/polaris/build/esm/components/Backdrop/Backdrop.js
var import_react88 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Backdrop/Backdrop.css.js
var styles21 = {
  "Backdrop": "Polaris-Backdrop",
  "transparent": "Polaris-Backdrop--transparent",
  "belowNavigation": "Polaris-Backdrop--belowNavigation"
};

// node_modules/@shopify/polaris/build/esm/components/ScrollLock/ScrollLock.js
var import_react87 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/hooks.js
var import_react86 = __toESM(require_react());
function useScrollLockManager() {
  const scrollLockManager = (0, import_react86.useContext)(ScrollLockManagerContext);
  if (!scrollLockManager) {
    throw new MissingAppProviderError("No ScrollLockManager was provided.");
  }
  return scrollLockManager;
}

// node_modules/@shopify/polaris/build/esm/components/ScrollLock/ScrollLock.js
function ScrollLock(_) {
  const scrollLockManager = useScrollLockManager();
  (0, import_react87.useEffect)(() => {
    scrollLockManager.registerScrollLock();
    return () => {
      scrollLockManager.unregisterScrollLock();
    };
  }, [scrollLockManager]);
  return null;
}

// node_modules/@shopify/polaris/build/esm/components/Backdrop/Backdrop.js
function Backdrop(props) {
  const {
    onClick,
    onTouchStart,
    belowNavigation,
    transparent,
    setClosing
  } = props;
  const className = classNames(styles21.Backdrop, belowNavigation && styles21.belowNavigation, transparent && styles21.transparent);
  const handleMouseDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };
  const handleClick = () => {
    if (setClosing) {
      setClosing(false);
    }
    if (onClick) {
      onClick();
    }
  };
  return /* @__PURE__ */ import_react88.default.createElement(import_react88.default.Fragment, null, /* @__PURE__ */ import_react88.default.createElement(ScrollLock, null), /* @__PURE__ */ import_react88.default.createElement("div", {
    className,
    onClick: handleClick,
    onTouchStart,
    onMouseDown: handleMouseDown
  }));
}

// node_modules/@shopify/polaris/build/esm/components/Modal/components/Footer/Footer.js
var import_react89 = __toESM(require_react());
function Footer({
  primaryAction,
  secondaryActions,
  children
}) {
  const primaryActionButton = primaryAction && buttonsFrom(primaryAction, {
    variant: "primary"
  }) || null;
  const secondaryActionButtons = secondaryActions && buttonsFrom(secondaryActions) || null;
  const actions = primaryActionButton || secondaryActionButtons ? /* @__PURE__ */ import_react89.default.createElement(InlineStack, {
    gap: "200"
  }, secondaryActionButtons, primaryActionButton) : null;
  return /* @__PURE__ */ import_react89.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /* @__PURE__ */ import_react89.default.createElement(Box, {
    borderColor: "border",
    borderBlockStartWidth: "025",
    padding: "400",
    width: "100%"
  }, /* @__PURE__ */ import_react89.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center",
    align: "space-between"
  }, /* @__PURE__ */ import_react89.default.createElement(Box, null, children), actions)));
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
var import_react94 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-lazy-ref.js
var import_react90 = __toESM(require_react());
var UNIQUE_IDENTIFIER = Symbol("unique_identifier");
function useLazyRef(initialValue) {
  const lazyRef = (0, import_react90.useRef)(UNIQUE_IDENTIFIER);
  if (lazyRef.current === UNIQUE_IDENTIFIER) {
    lazyRef.current = initialValue();
  }
  return lazyRef;
}

// node_modules/@shopify/polaris/build/esm/utilities/use-component-did-mount.js
var import_react91 = __toESM(require_react());
function useComponentDidMount(callback) {
  const isAfterInitialMount = useIsAfterInitialMount();
  const hasInvokedLifeCycle = (0, import_react91.useRef)(false);
  if (isAfterInitialMount && !hasInvokedLifeCycle.current) {
    hasInvokedLifeCycle.current = true;
    return callback();
  }
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/context.js
var import_react92 = __toESM(require_react());
var ScrollableContext = /* @__PURE__ */ (0, import_react92.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.css.js
var styles22 = {
  "Scrollable": "Polaris-Scrollable",
  "hasTopShadow": "Polaris-Scrollable--hasTopShadow",
  "hasBottomShadow": "Polaris-Scrollable--hasBottomShadow",
  "horizontal": "Polaris-Scrollable--horizontal",
  "vertical": "Polaris-Scrollable--vertical",
  "scrollbarWidthThin": "Polaris-Scrollable--scrollbarWidthThin",
  "scrollbarWidthNone": "Polaris-Scrollable--scrollbarWidthNone",
  "scrollbarWidthAuto": "Polaris-Scrollable--scrollbarWidthAuto",
  "scrollbarGutterStable": "Polaris-Scrollable--scrollbarGutterStable",
  "scrollbarGutterStableboth-edges": "Polaris-Scrollable__scrollbarGutterStableboth--edges"
};

// node_modules/@shopify/polaris/build/esm/components/Scrollable/components/ScrollTo/ScrollTo.js
var import_react93 = __toESM(require_react());
function ScrollTo() {
  const anchorNode = (0, import_react93.useRef)(null);
  const scrollToPosition = (0, import_react93.useContext)(ScrollableContext);
  (0, import_react93.useEffect)(() => {
    if (!scrollToPosition || !anchorNode.current) {
      return;
    }
    scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition]);
  const id = (0, import_react93.useId)();
  return /* @__PURE__ */ import_react93.default.createElement("a", {
    id,
    ref: anchorNode
  });
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
var MAX_SCROLL_HINT_DISTANCE = 100;
var LOW_RES_BUFFER = 2;
var ScrollableComponent = /* @__PURE__ */ (0, import_react94.forwardRef)(({
  children,
  className,
  horizontal = true,
  vertical = true,
  shadow: shadow2,
  hint,
  focusable,
  scrollbarWidth = "thin",
  scrollbarGutter,
  onScrolledToBottom,
  ...rest
}, forwardedRef) => {
  const [topShadow, setTopShadow] = (0, import_react94.useState)(false);
  const [bottomShadow, setBottomShadow] = (0, import_react94.useState)(false);
  const stickyManager = useLazyRef(() => new StickyManager());
  const scrollArea = (0, import_react94.useRef)(null);
  const scrollTo = (0, import_react94.useCallback)((scrollY, options = {}) => {
    const optionsBehavior = options.behavior || "smooth";
    const behavior = prefersReducedMotion() ? "auto" : optionsBehavior;
    scrollArea.current?.scrollTo({
      top: scrollY,
      behavior
    });
  }, []);
  const defaultRef = (0, import_react94.useRef)();
  (0, import_react94.useImperativeHandle)(forwardedRef || defaultRef, () => ({
    scrollTo
  }));
  const handleScroll = (0, import_react94.useCallback)(() => {
    const currentScrollArea = scrollArea.current;
    if (!currentScrollArea) {
      return;
    }
    requestAnimationFrame(() => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = currentScrollArea;
      const canScroll = Boolean(scrollHeight > clientHeight);
      const isBelowTopOfScroll = Boolean(scrollTop > 0);
      const isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);
      setTopShadow(isBelowTopOfScroll);
      setBottomShadow(!isAtBottomOfScroll);
      if (canScroll && isAtBottomOfScroll && onScrolledToBottom) {
        onScrolledToBottom();
      }
    });
  }, [onScrolledToBottom]);
  useComponentDidMount(() => {
    handleScroll();
    if (hint) {
      requestAnimationFrame(() => performScrollHint(scrollArea.current));
    }
  });
  (0, import_react94.useEffect)(() => {
    const currentScrollArea = scrollArea.current;
    if (!currentScrollArea) {
      return;
    }
    const handleResize = debounce(handleScroll, 50, {
      trailing: true
    });
    stickyManager.current?.setContainer(currentScrollArea);
    currentScrollArea.addEventListener("scroll", handleScroll);
    globalThis.addEventListener("resize", handleResize);
    return () => {
      currentScrollArea.removeEventListener("scroll", handleScroll);
      globalThis.removeEventListener("resize", handleResize);
    };
  }, [stickyManager, handleScroll]);
  const finalClassName = classNames(className, styles22.Scrollable, vertical && styles22.vertical, horizontal && styles22.horizontal, shadow2 && topShadow && styles22.hasTopShadow, shadow2 && bottomShadow && styles22.hasBottomShadow, scrollbarWidth && styles22[variationName("scrollbarWidth", scrollbarWidth)], scrollbarGutter && styles22[variationName("scrollbarGutter", scrollbarGutter.replace(" ", ""))]);
  return /* @__PURE__ */ import_react94.default.createElement(ScrollableContext.Provider, {
    value: scrollTo
  }, /* @__PURE__ */ import_react94.default.createElement(StickyManagerContext.Provider, {
    value: stickyManager.current
  }, /* @__PURE__ */ import_react94.default.createElement("div", Object.assign({
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
  } catch (err) {
    return false;
  }
}
function performScrollHint(elem) {
  if (!elem || prefersReducedMotion()) {
    return;
  }
  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek = Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;
  const goBackToTop = () => {
    requestAnimationFrame(() => {
      if (elem.scrollTop >= distanceToPeek) {
        elem.removeEventListener("scroll", goBackToTop);
        elem.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  };
  elem.addEventListener("scroll", goBackToTop);
  elem.scrollTo({
    top: MAX_SCROLL_HINT_DISTANCE,
    behavior: "smooth"
  });
}
var forNode = (node) => {
  const closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
};
var Scrollable = ScrollableComponent;
Scrollable.ScrollTo = ScrollTo;
Scrollable.forNode = forNode;

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
var import_react97 = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());

// node_modules/@shopify/polaris/build/esm/utilities/portals/hooks.js
var import_react95 = __toESM(require_react());
function usePortalsManager() {
  const portalsManager = (0, import_react95.useContext)(PortalsManagerContext);
  if (!portalsManager) {
    throw new Error("No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return portalsManager;
}

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.js
var import_react96 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.css.js
var styles23 = {
  "themeContainer": "Polaris-ThemeProvider--themeContainer"
};

// node_modules/@shopify/polaris/build/esm/components/ThemeProvider/ThemeProvider.js
var themeNamesLocal = ["light", "dark-experimental"];
var isThemeNameLocal = (name) => themeNamesLocal.includes(name);
function ThemeProvider(props) {
  const {
    as: ThemeContainer = "div",
    children,
    className,
    theme: themeName = themeNameDefault
  } = props;
  return /* @__PURE__ */ import_react96.default.createElement(ThemeNameContext.Provider, {
    value: themeName
  }, /* @__PURE__ */ import_react96.default.createElement(ThemeContext.Provider, {
    value: getTheme(themeName)
  }, /* @__PURE__ */ import_react96.default.createElement(ThemeContainer, {
    "data-portal-id": props["data-portal-id"],
    className: classNames(createThemeClassName(themeName), styles23.themeContainer, className)
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
function Portal({
  children,
  idPrefix = "",
  onPortalCreated = noop3
}) {
  const themeName = useThemeName();
  const {
    container
  } = usePortalsManager();
  const uniqueId = (0, import_react97.useId)();
  const portalId = idPrefix !== "" ? `${idPrefix}-${uniqueId}` : uniqueId;
  (0, import_react97.useEffect)(() => {
    onPortalCreated();
  }, [onPortalCreated]);
  return container ? /* @__PURE__ */ (0, import_react_dom2.createPortal)(/* @__PURE__ */ import_react97.default.createElement(ThemeProvider, {
    theme: isThemeNameLocal(themeName) ? themeName : themeNameDefault,
    "data-portal-id": portalId
  }, children), container) : null;
}
function noop3() {
}

// node_modules/@shopify/polaris/build/esm/components/Modal/Modal.js
var IFRAME_LOADING_HEIGHT = 200;
var DEFAULT_IFRAME_CONTENT_HEIGHT = 400;
var Modal = function Modal2({
  children,
  title,
  titleHidden = false,
  src,
  iFrameName,
  open,
  instant,
  sectioned,
  loading,
  size: size2,
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
  const [iframeHeight, setIframeHeight] = (0, import_react98.useState)(IFRAME_LOADING_HEIGHT);
  const [closing, setClosing] = (0, import_react98.useState)(false);
  const headerId = (0, import_react98.useId)();
  const activatorRef = (0, import_react98.useRef)(null);
  const i18n = useI18n();
  const iframeTitle = i18n.translate("Polaris.Modal.iFrameTitle");
  let dialog;
  let backdrop;
  const handleEntered = (0, import_react98.useCallback)(() => {
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  }, [onTransitionEnd]);
  const handleExited = (0, import_react98.useCallback)(() => {
    setIframeHeight(IFRAME_LOADING_HEIGHT);
    const activatorElement = activator && isRef2(activator) ? activator && activator.current : activatorRef.current;
    if (activatorElement) {
      requestAnimationFrame(() => focusFirstFocusableNode(activatorElement));
    }
  }, [activator]);
  const handleIFrameLoad = (0, import_react98.useCallback)((evt) => {
    const iframe = evt.target;
    if (iframe && iframe.contentWindow) {
      try {
        setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
      } catch (_error) {
        setIframeHeight(DEFAULT_IFRAME_CONTENT_HEIGHT);
      }
    }
    if (onIFrameLoad != null) {
      onIFrameLoad(evt);
    }
  }, [onIFrameLoad]);
  if (open) {
    const footerMarkup = !footer && !primaryAction && !secondaryActions ? null : /* @__PURE__ */ import_react98.default.createElement(Footer, {
      primaryAction,
      secondaryActions
    }, footer);
    const content = sectioned ? wrapWithComponent(children, Section, {
      titleHidden
    }) : children;
    const body = loading ? /* @__PURE__ */ import_react98.default.createElement(Box, {
      padding: "400"
    }, /* @__PURE__ */ import_react98.default.createElement(InlineStack, {
      gap: "400",
      align: "center",
      blockAlign: "center"
    }, /* @__PURE__ */ import_react98.default.createElement(Spinner, null))) : content;
    const scrollContainerMarkup = noScroll ? /* @__PURE__ */ import_react98.default.createElement("div", {
      className: styles17.NoScrollBody
    }, /* @__PURE__ */ import_react98.default.createElement(Box, {
      width: "100%",
      overflowX: "hidden",
      overflowY: "hidden"
    }, body)) : /* @__PURE__ */ import_react98.default.createElement(Scrollable, {
      shadow: true,
      className: styles17.Body,
      onScrolledToBottom
    }, body);
    const bodyMarkup = src ? /* @__PURE__ */ import_react98.default.createElement("iframe", {
      name: iFrameName,
      title: iframeTitle,
      src,
      className: styles17.IFrame,
      onLoad: handleIFrameLoad,
      style: {
        height: `${iframeHeight}px`
      }
    }) : scrollContainerMarkup;
    dialog = /* @__PURE__ */ import_react98.default.createElement(Dialog, {
      instant,
      labelledBy: headerId,
      onClose,
      onEntered: handleEntered,
      onExited: handleExited,
      size: size2,
      limitHeight,
      setClosing
    }, /* @__PURE__ */ import_react98.default.createElement(Header, {
      titleHidden,
      id: headerId,
      closing,
      onClose
    }, title), bodyMarkup, footerMarkup);
    backdrop = /* @__PURE__ */ import_react98.default.createElement(Backdrop, {
      setClosing,
      onClick: onClose
    });
  }
  const animated = !instant;
  const activatorMarkup = activator && !isRef2(activator) ? /* @__PURE__ */ import_react98.default.createElement(Box, {
    ref: activatorRef,
    as: activatorWrapper
  }, activator) : null;
  return /* @__PURE__ */ import_react98.default.createElement(WithinContentContext.Provider, {
    value: true
  }, activatorMarkup, /* @__PURE__ */ import_react98.default.createElement(Portal, {
    idPrefix: "modal"
  }, /* @__PURE__ */ import_react98.default.createElement(TransitionGroup_default, {
    appear: animated,
    enter: animated,
    exit: animated
  }, dialog), backdrop));
};
function isRef2(ref) {
  return Object.prototype.hasOwnProperty.call(ref, "current");
}
Modal.Section = Section;

// node_modules/@shopify/polaris/build/esm/components/Frame/Frame.js
var import_react114 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/set-root-property.js
function setRootProperty(name, value, node) {
  if (!document)
    return;
  const element = node || document.documentElement;
  element.style.setProperty(name, value);
}

// node_modules/@shopify/polaris/build/esm/components/Frame/Frame.css.js
var styles24 = {
  "Frame": "Polaris-Frame",
  "Navigation": "Polaris-Frame__Navigation",
  "hasTopBar": "Polaris-Frame--hasTopBar",
  "Navigation-enter": "Polaris-Frame__Navigation--enter",
  "Navigation-enterActive": "Polaris-Frame__Navigation--enterActive",
  "Navigation-exit": "Polaris-Frame__Navigation--exit",
  "Navigation-exitActive": "Polaris-Frame__Navigation--exitActive",
  "NavigationDismiss": "Polaris-Frame__NavigationDismiss",
  "Navigation-visible": "Polaris-Frame__Navigation--visible",
  "TopBar": "Polaris-Frame__TopBar",
  "ContextualSaveBar": "Polaris-Frame__ContextualSaveBar",
  "Main": "Polaris-Frame__Main",
  "hasNav": "Polaris-Frame--hasNav",
  "Content": "Polaris-Frame__Content",
  "hasSidebar": "Polaris-Frame--hasSidebar",
  "GlobalRibbonContainer": "Polaris-Frame__GlobalRibbonContainer",
  "LoadingBar": "Polaris-Frame__LoadingBar",
  "Skip": "Polaris-Frame__Skip",
  "focused": "Polaris-Frame--focused",
  "pressed": "Polaris-Frame--pressed"
};

// node_modules/@shopify/polaris/build/esm/utilities/media-query/hooks.js
var import_react99 = __toESM(require_react());
function useMediaQuery() {
  const mediaQuery = (0, import_react99.useContext)(MediaQueryContext);
  if (!mediaQuery) {
    throw new Error("No mediaQuery was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return mediaQuery;
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Loading/Loading.js
var import_react101 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-is-mounted-ref.js
var import_react100 = __toESM(require_react());
function useIsMountedRef() {
  const isMounted = (0, import_react100.useRef)(false);
  (0, import_react100.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Loading/Loading.css.js
var styles25 = {
  "Loading": "Polaris-Frame-Loading",
  "Level": "Polaris-Frame-Loading__Level"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Loading/Loading.js
var STUCK_THRESHOLD = 99;
function Loading() {
  const i18n = useI18n();
  const isMountedRef = useIsMountedRef();
  const [progress, setProgress] = (0, import_react101.useState)(0);
  const [animating, setAnimating] = (0, import_react101.useState)(false);
  (0, import_react101.useEffect)(() => {
    if (progress >= STUCK_THRESHOLD || animating) {
      return;
    }
    requestAnimationFrame(() => {
      if (!isMountedRef.current)
        return;
      const step = Math.max((STUCK_THRESHOLD - progress) / 10, 1);
      setAnimating(true);
      setProgress(progress + step);
    });
  }, [progress, animating, isMountedRef]);
  const customStyles = {
    transform: `scaleX(${Math.floor(progress) / 100})`
  };
  return /* @__PURE__ */ import_react101.default.createElement("div", {
    className: styles25.Loading,
    "aria-valuenow": progress,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    role: "progressbar",
    "aria-label": i18n.translate("Polaris.Loading.label")
  }, /* @__PURE__ */ import_react101.default.createElement("div", {
    className: styles25.Level,
    style: customStyles,
    onTransitionEnd: () => setAnimating(false)
  }));
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/CSSAnimation/CSSAnimation.js
var import_react102 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Frame/components/CSSAnimation/CSSAnimation.css.js
var styles26 = {
  "startFade": "Polaris-Frame-CSSAnimation--startFade",
  "endFade": "Polaris-Frame-CSSAnimation--endFade"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/CSSAnimation/CSSAnimation.js
var TransitionStatus;
(function(TransitionStatus3) {
  TransitionStatus3["Entering"] = "entering";
  TransitionStatus3["Entered"] = "entered";
  TransitionStatus3["Exiting"] = "exiting";
  TransitionStatus3["Exited"] = "exited";
})(TransitionStatus || (TransitionStatus = {}));
function CSSAnimation({
  in: inProp,
  className,
  type,
  children
}) {
  const [transitionStatus, setTransitionStatus] = (0, import_react102.useState)(inProp ? TransitionStatus.Entering : TransitionStatus.Exited);
  const isMounted = (0, import_react102.useRef)(false);
  const node = (0, import_react102.useRef)(null);
  (0, import_react102.useEffect)(() => {
    if (!isMounted.current)
      return;
    transitionStatus === TransitionStatus.Entering && changeTransitionStatus(TransitionStatus.Entered);
  }, [transitionStatus]);
  (0, import_react102.useEffect)(() => {
    if (!isMounted.current)
      return;
    inProp && changeTransitionStatus(TransitionStatus.Entering);
    !inProp && changeTransitionStatus(TransitionStatus.Exiting);
  }, [inProp]);
  (0, import_react102.useEffect)(() => {
    isMounted.current = true;
  }, []);
  const wrapperClassName = classNames(className, styles26[variationName("start", type)], inProp && styles26[variationName("end", type)]);
  const content = transitionStatus === TransitionStatus.Exited && !inProp ? null : children;
  return /* @__PURE__ */ import_react102.default.createElement("div", {
    className: wrapperClassName,
    ref: node,
    onTransitionEnd: handleTransitionEnd
  }, content);
  function handleTransitionEnd() {
    transitionStatus === TransitionStatus.Exiting && changeTransitionStatus(TransitionStatus.Exited);
  }
  function changeTransitionStatus(transitionStatus2) {
    setTransitionStatus(transitionStatus2);
    if (transitionStatus2 === TransitionStatus.Entering)
      node.current && node.current.getBoundingClientRect();
  }
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/ContextualSaveBar.js
var import_react108 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/pluck-deep.js
function pluckDeep(obj, key) {
  if (!obj) {
    return null;
  }
  const keys = Object.keys(obj);
  for (const currKey of keys) {
    if (currKey === key) {
      return obj[key];
    }
    if (isObject(obj[currKey])) {
      const plucked = pluckDeep(obj[currKey], key);
      if (plucked) {
        return plucked;
      }
    }
  }
  return null;
}

// node_modules/@shopify/polaris/build/esm/utilities/get-width.js
function getWidth(value = {}, defaultWidth = 0, key = "width") {
  const width2 = typeof value === "number" ? value : pluckDeep(value, key);
  return width2 ? `${width2}px` : `${defaultWidth}px`;
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/ContextualSaveBar.css.js
var styles27 = {
  "ContextualSaveBar": "Polaris-Frame-ContextualSaveBar",
  "LogoContainer": "Polaris-Frame-ContextualSaveBar__LogoContainer",
  "ContextControl": "Polaris-Frame-ContextualSaveBar__ContextControl",
  "Contents": "Polaris-Frame-ContextualSaveBar__Contents",
  "fullWidth": "Polaris-Frame-ContextualSaveBar--fullWidth",
  "MessageContainer": "Polaris-Frame-ContextualSaveBar__MessageContainer",
  "ActionContainer": "Polaris-Frame-ContextualSaveBar__ActionContainer",
  "Action": "Polaris-Frame-ContextualSaveBar__Action"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ContextualSaveBar/components/DiscardConfirmationModal/DiscardConfirmationModal.js
var import_react103 = __toESM(require_react());
function DiscardConfirmationModal({
  open,
  onDiscard,
  onCancel
}) {
  const i18n = useI18n();
  return /* @__PURE__ */ import_react103.default.createElement(Modal, {
    title: i18n.translate("Polaris.DiscardConfirmationModal.title"),
    open,
    onClose: onCancel,
    primaryAction: {
      content: i18n.translate("Polaris.DiscardConfirmationModal.primaryAction"),
      destructive: true,
      onAction: onDiscard
    },
    secondaryActions: [{
      content: i18n.translate("Polaris.DiscardConfirmationModal.secondaryAction"),
      onAction: onCancel
    }],
    sectioned: true
  }, i18n.translate("Polaris.DiscardConfirmationModal.message"));
}

// node_modules/@shopify/polaris/build/esm/utilities/frame/hooks.js
var import_react104 = __toESM(require_react());
function useFrame() {
  const frame = (0, import_react104.useContext)(FrameContext);
  if (!frame) {
    throw new Error("No Frame context was provided. Your component must be wrapped in a <Frame> component. See https://polaris.shopify.com/components/internal-only/frame for implementation instructions.");
  }
  return frame;
}

// node_modules/@shopify/polaris/build/esm/components/Image/Image.js
var import_react105 = __toESM(require_react());
function Image({
  alt,
  sourceSet,
  source,
  crossOrigin,
  onLoad,
  className,
  ...rest
}) {
  const finalSourceSet = sourceSet ? sourceSet.map(({
    source: subSource,
    descriptor
  }) => `${subSource} ${descriptor}`).join(",") : null;
  const handleLoad = (0, import_react105.useCallback)(() => {
    if (onLoad)
      onLoad();
  }, [onLoad]);
  return /* @__PURE__ */ import_react105.default.createElement("img", Object.assign({
    alt,
    src: source,
    crossOrigin,
    className,
    onLoad: handleLoad
  }, finalSourceSet ? {
    srcSet: finalSourceSet
  } : {}, rest));
}

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.js
var import_react107 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.css.js
var styles28 = {
  "LegacyStack": "Polaris-LegacyStack",
  "Item": "Polaris-LegacyStack__Item",
  "noWrap": "Polaris-LegacyStack--noWrap",
  "spacingNone": "Polaris-LegacyStack--spacingNone",
  "spacingExtraTight": "Polaris-LegacyStack--spacingExtraTight",
  "spacingTight": "Polaris-LegacyStack--spacingTight",
  "spacingBaseTight": "Polaris-LegacyStack--spacingBaseTight",
  "spacingLoose": "Polaris-LegacyStack--spacingLoose",
  "spacingExtraLoose": "Polaris-LegacyStack--spacingExtraLoose",
  "distributionLeading": "Polaris-LegacyStack--distributionLeading",
  "distributionTrailing": "Polaris-LegacyStack--distributionTrailing",
  "distributionCenter": "Polaris-LegacyStack--distributionCenter",
  "distributionEqualSpacing": "Polaris-LegacyStack--distributionEqualSpacing",
  "distributionFill": "Polaris-LegacyStack--distributionFill",
  "distributionFillEvenly": "Polaris-LegacyStack--distributionFillEvenly",
  "alignmentLeading": "Polaris-LegacyStack--alignmentLeading",
  "alignmentTrailing": "Polaris-LegacyStack--alignmentTrailing",
  "alignmentCenter": "Polaris-LegacyStack--alignmentCenter",
  "alignmentFill": "Polaris-LegacyStack--alignmentFill",
  "alignmentBaseline": "Polaris-LegacyStack--alignmentBaseline",
  "vertical": "Polaris-LegacyStack--vertical",
  "Item-fill": "Polaris-LegacyStack__Item--fill"
};

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/components/Item/Item.js
var import_react106 = __toESM(require_react());
function Item2({
  children,
  fill
}) {
  const className = classNames(styles28.Item, fill && styles28["Item-fill"]);
  return /* @__PURE__ */ import_react106.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.js
var LegacyStack = /* @__PURE__ */ (0, import_react107.memo)(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap
}) {
  const className = classNames(styles28.LegacyStack, vertical && styles28.vertical, spacing && styles28[variationName("spacing", spacing)], distribution && styles28[variationName("distribution", distribution)], alignment && styles28[variationName("alignment", alignment)], wrap === false && styles28.noWrap);
  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = {
      key: index
    };
    return wrapWithComponent(child, Item2, props);
  });
  return /* @__PURE__ */ import_react107.default.createElement("div", {
    className
  }, itemMarkup);
});
LegacyStack.Item = Item2;

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
  const i18n = useI18n();
  const {
    logo
  } = useFrame();
  const {
    value: discardConfirmationModalVisible,
    toggle: toggleDiscardConfirmationModal,
    setFalse: closeDiscardConfirmationModal
  } = useToggle(false);
  const handleDiscardAction = (0, import_react108.useCallback)(() => {
    if (discardAction && discardAction.onAction) {
      discardAction.onAction();
    }
    closeDiscardConfirmationModal();
  }, [closeDiscardConfirmationModal, discardAction]);
  const discardActionContent = discardAction && discardAction.content ? discardAction.content : i18n.translate("Polaris.ContextualSaveBar.discard");
  let discardActionHandler;
  if (discardAction && discardAction.discardConfirmationModal) {
    discardActionHandler = toggleDiscardConfirmationModal;
  } else if (discardAction) {
    discardActionHandler = discardAction.onAction;
  }
  const discardConfirmationModalMarkup = discardAction && discardAction.onAction && discardAction.discardConfirmationModal && /* @__PURE__ */ import_react108.default.createElement(DiscardConfirmationModal, {
    open: discardConfirmationModalVisible,
    onCancel: toggleDiscardConfirmationModal,
    onDiscard: handleDiscardAction
  });
  const discardActionMarkup = discardAction && /* @__PURE__ */ import_react108.default.createElement(Button, {
    variant: "tertiary",
    size: "large",
    url: discardAction.url,
    onClick: discardActionHandler,
    loading: discardAction.loading,
    disabled: discardAction.disabled,
    accessibilityLabel: discardAction.content
  }, discardActionContent);
  const saveActionContent = saveAction && saveAction.content ? saveAction.content : i18n.translate("Polaris.ContextualSaveBar.save");
  const saveActionMarkup = saveAction && /* @__PURE__ */ import_react108.default.createElement(Button, {
    variant: "primary",
    tone: "success",
    size: "large",
    url: saveAction.url,
    onClick: saveAction.onAction,
    loading: saveAction.loading,
    disabled: saveAction.disabled,
    accessibilityLabel: saveAction.content
  }, saveActionContent);
  const width2 = getWidth(logo, 104);
  const imageMarkup = logo && /* @__PURE__ */ import_react108.default.createElement(Image, {
    style: {
      width: width2
    },
    source: logo.contextualSaveBarSource || "",
    alt: ""
  });
  const logoMarkup = alignContentFlush || contextControl ? null : /* @__PURE__ */ import_react108.default.createElement("div", {
    className: styles27.LogoContainer,
    style: {
      width: width2
    }
  }, imageMarkup);
  const contextControlMarkup = contextControl ? /* @__PURE__ */ import_react108.default.createElement("div", {
    className: styles27.ContextControl
  }, contextControl) : null;
  const contentsClassName = classNames(styles27.Contents, fullWidth && styles27.fullWidth);
  return /* @__PURE__ */ import_react108.default.createElement(import_react108.default.Fragment, null, /* @__PURE__ */ import_react108.default.createElement("div", {
    className: styles27.ContextualSaveBar
  }, contextControlMarkup, logoMarkup, /* @__PURE__ */ import_react108.default.createElement("div", {
    className: contentsClassName
  }, /* @__PURE__ */ import_react108.default.createElement("div", {
    className: styles27.MessageContainer
  }, /* @__PURE__ */ import_react108.default.createElement(Icon, {
    source: SvgAlertTriangleIcon
  }), message && /* @__PURE__ */ import_react108.default.createElement(Text, {
    as: "h2",
    variant: "headingMd",
    tone: "text-inverse",
    truncate: true
  }, message)), /* @__PURE__ */ import_react108.default.createElement("div", {
    className: styles27.ActionContainer
  }, /* @__PURE__ */ import_react108.default.createElement(LegacyStack, {
    spacing: "tight",
    wrap: false
  }, secondaryMenu, discardActionMarkup, saveActionMarkup)))), discardConfirmationModalMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ToastManager/ToastManager.js
var import_react113 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-effect.js
var import_react110 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-compare-ref.js
var import_react109 = __toESM(require_react());
var import_react_fast_compare = __toESM(require_react_fast_compare());
function useDeepCompareRef(dependencies, comparator = import_react_fast_compare.default) {
  const dependencyList = (0, import_react109.useRef)(dependencies);
  if (!comparator(dependencyList.current, dependencies)) {
    dependencyList.current = dependencies;
  }
  return dependencyList.current;
}

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-effect.js
function useDeepEffect(callback, dependencies, customCompare) {
  (0, import_react110.useEffect)(callback, useDeepCompareRef(dependencies, customCompare));
}

// node_modules/@shopify/polaris/build/esm/utilities/use-deep-callback.js
var import_react111 = __toESM(require_react());
function useDeepCallback(callback, dependencies, customCompare) {
  return (0, import_react111.useCallback)(callback, useDeepCompareRef(dependencies, customCompare));
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ToastManager/ToastManager.css.js
var styles29 = {
  "ToastManager": "Polaris-Frame-ToastManager",
  "ToastWrapper": "Polaris-Frame-ToastManager__ToastWrapper",
  "ToastWrapper-enter": "Polaris-Frame-ToastManager__ToastWrapper--enter",
  "ToastWrapper-exit": "Polaris-Frame-ToastManager__ToastWrapper--exit",
  "ToastWrapper-enter-done": "Polaris-Frame-ToastManager--toastWrapperEnterDone",
  "ToastWrapper--hoverable": "Polaris-Frame-ToastManager--toastWrapperHoverable"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Toast/Toast.js
var import_react112 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Toast/Toast.css.js
var styles30 = {
  "Toast": "Polaris-Frame-Toast",
  "Action": "Polaris-Frame-Toast__Action",
  "error": "Polaris-Frame-Toast--error",
  "CloseButton": "Polaris-Frame-Toast__CloseButton",
  "LeadingIcon": "Polaris-Frame-Toast__LeadingIcon",
  "toneMagic": "Polaris-Frame-Toast--toneMagic",
  "WithActionOnComponent": "Polaris-Frame-Toast__WithActionOnComponent"
};

// node_modules/@shopify/polaris/build/esm/components/Frame/components/Toast/Toast.js
var DEFAULT_TOAST_DURATION = 5e3;
var DEFAULT_TOAST_DURATION_WITH_ACTION = 1e4;
function Toast({
  content,
  onDismiss,
  duration,
  error,
  action,
  tone,
  onClick,
  icon,
  isHovered
}) {
  const defaultDurationWithoutAction = duration || DEFAULT_TOAST_DURATION;
  const defaultDuration = action && !duration ? DEFAULT_TOAST_DURATION_WITH_ACTION : defaultDurationWithoutAction;
  const durationRemaining = (0, import_react112.useRef)(defaultDuration);
  const timeoutStart = (0, import_react112.useRef)(null);
  const timer = (0, import_react112.useRef)(null);
  (0, import_react112.useEffect)(() => {
    function resume() {
      timeoutStart.current = Date.now();
      timer.current = setTimeout(() => {
        onDismiss();
      }, durationRemaining.current);
    }
    function pause() {
      if (timeoutStart.current) {
        durationRemaining.current -= Date.now() - timeoutStart.current;
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = null;
    }
    if (isHovered) {
      pause();
    } else {
      resume();
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isHovered, onDismiss]);
  (0, import_react112.useEffect)(() => {
    if (action && duration && duration < DEFAULT_TOAST_DURATION_WITH_ACTION) {
      console.log("Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.");
    }
  }, [action, duration]);
  const dismissMarkup = /* @__PURE__ */ import_react112.default.createElement("button", {
    type: "button",
    className: styles30.CloseButton,
    onClick: onDismiss
  }, /* @__PURE__ */ import_react112.default.createElement(Icon, {
    source: SvgXSmallIcon,
    tone: "inherit"
  }));
  const actionMarkup = action ? /* @__PURE__ */ import_react112.default.createElement("div", {
    className: styles30.Action
  }, /* @__PURE__ */ import_react112.default.createElement(Button, {
    variant: "monochromePlain",
    removeUnderline: true,
    size: "slim",
    onClick: action.onAction
  }, action.content)) : null;
  let leadingIconMarkup = null;
  if (error) {
    leadingIconMarkup = /* @__PURE__ */ import_react112.default.createElement("div", {
      className: styles30.LeadingIcon
    }, /* @__PURE__ */ import_react112.default.createElement(Icon, {
      source: SvgAlertCircleIcon,
      tone: "inherit"
    }));
  } else if (icon) {
    leadingIconMarkup = /* @__PURE__ */ import_react112.default.createElement("div", {
      className: styles30.LeadingIcon
    }, /* @__PURE__ */ import_react112.default.createElement(Icon, {
      source: icon,
      tone: "inherit"
    }));
  }
  const className = classNames(styles30.Toast, error && styles30.error, tone && styles30[variationName("tone", tone)]);
  if (!action && onClick) {
    return /* @__PURE__ */ import_react112.default.createElement("button", {
      "aria-live": "assertive",
      className: classNames(className, styles30.WithActionOnComponent),
      type: "button",
      onClick
    }, /* @__PURE__ */ import_react112.default.createElement(KeypressListener, {
      keyCode: Key.Escape,
      handler: onDismiss
    }), leadingIconMarkup, /* @__PURE__ */ import_react112.default.createElement(InlineStack, {
      gap: "400",
      blockAlign: "center"
    }, /* @__PURE__ */ import_react112.default.createElement(Text, Object.assign({
      as: "span",
      variant: "bodyMd",
      fontWeight: "medium"
    }, tone === "magic" && {
      tone: "magic"
    }), content)));
  }
  return /* @__PURE__ */ import_react112.default.createElement("div", {
    className,
    "aria-live": "assertive"
  }, /* @__PURE__ */ import_react112.default.createElement(KeypressListener, {
    keyCode: Key.Escape,
    handler: onDismiss
  }), leadingIconMarkup, /* @__PURE__ */ import_react112.default.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /* @__PURE__ */ import_react112.default.createElement(Text, Object.assign({
    as: "span",
    variant: "bodyMd",
    fontWeight: "medium"
  }, tone === "magic" && {
    tone: "magic"
  }), content)), actionMarkup, dismissMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/Frame/components/ToastManager/ToastManager.js
var ADDITIONAL_TOAST_BASE_MOVEMENT = 10;
var TOAST_TRANSITION_DELAY = 30;
function generateAdditionalVerticalMovement(index) {
  const getAmountToRemove = (idx) => (idx - 1) * idx / 2;
  return index * ADDITIONAL_TOAST_BASE_MOVEMENT - getAmountToRemove(index);
}
var ToastManager = /* @__PURE__ */ (0, import_react113.memo)(function ToastManager2({
  toastMessages
}) {
  const toastNodes = [];
  const [shouldExpand, setShouldExpand] = (0, import_react113.useState)(false);
  const isFullyExpanded = (0, import_react113.useRef)(false);
  const fullyExpandedTimeout = (0, import_react113.useRef)(null);
  const firstToast = (0, import_react113.useRef)(null);
  const updateToasts = useDeepCallback(() => {
    const zeroIndexTotalMessages = toastMessages.length - 1;
    toastMessages.forEach((_, index) => {
      const reversedOrder = zeroIndexTotalMessages - index;
      const currentToast = toastNodes[index];
      if (!currentToast.current)
        return;
      const toastHeight = currentToast.current.clientHeight;
      const scale = shouldExpand ? 1 : 0.9 ** reversedOrder;
      const additionalVerticalMovement = generateAdditionalVerticalMovement(reversedOrder);
      const targetInPos = shouldExpand ? toastHeight + (toastHeight - 8) * reversedOrder : toastHeight + additionalVerticalMovement;
      currentToast.current.style.setProperty("--pc-toast-manager-translate-y-in", `-${targetInPos}px`);
      currentToast.current.style.setProperty("--pc-toast-manager-scale-in", `${scale}`);
      currentToast.current.style.setProperty("--pc-toast-manager-blur-in", shouldExpand ? "0" : `${reversedOrder * 0.5}px`);
      currentToast.current.style.setProperty("--pc-toast-manager-transition-delay-in", `${shouldExpand ? reversedOrder * TOAST_TRANSITION_DELAY : 0}ms`);
      currentToast.current.style.setProperty("--pc-toast-manager-scale-out", `${reversedOrder === 0 ? 0.85 : scale ** 2}`);
      currentToast.current.style.setProperty("--pc-toast-manager-translate-y-out", `${-targetInPos}px`);
    });
  }, [toastMessages, toastNodes, shouldExpand]);
  useDeepEffect(() => {
    updateToasts();
    if (toastMessages.length === 0) {
      setShouldExpand(false);
    }
    if (shouldExpand) {
      fullyExpandedTimeout.current = setTimeout(() => {
        isFullyExpanded.current = true;
      }, toastMessages.length * TOAST_TRANSITION_DELAY + 400);
    } else if (fullyExpandedTimeout.current) {
      clearTimeout(fullyExpandedTimeout.current);
      isFullyExpanded.current = false;
    }
  }, [toastMessages, shouldExpand]);
  const toastsMarkup = toastMessages.map((toast, index) => {
    const reverseOrderIndex = toastMessages.length - index - 1;
    const toastNode = /* @__PURE__ */ (0, import_react113.createRef)();
    toastNodes[index] = toastNode;
    function handleMouseEnter() {
      setShouldExpand(true);
    }
    function handleMouseEnterFirstToast() {
      if (isFullyExpanded.current) {
        setShouldExpand(false);
      }
    }
    return /* @__PURE__ */ import_react113.default.createElement(CSSTransition_default, {
      nodeRef: toastNodes[index],
      key: toast.id,
      timeout: {
        enter: 0,
        exit: 200
      },
      classNames: toastClasses
    }, /* @__PURE__ */ import_react113.default.createElement("div", {
      ref: toastNode,
      onMouseEnter: reverseOrderIndex > 0 ? handleMouseEnter : handleMouseEnterFirstToast
    }, /* @__PURE__ */ import_react113.default.createElement("div", {
      ref: (node) => reverseOrderIndex === 0 ? firstToast.current = node : null
    }, /* @__PURE__ */ import_react113.default.createElement(Toast, Object.assign({}, toast, {
      isHovered: shouldExpand
    })))));
  });
  return /* @__PURE__ */ import_react113.default.createElement(Portal, {
    idPrefix: "toast"
  }, /* @__PURE__ */ import_react113.default.createElement(EventListener, {
    event: "resize",
    handler: updateToasts
  }), /* @__PURE__ */ import_react113.default.createElement("div", {
    className: styles29.ToastManager,
    "aria-live": "assertive",
    onMouseEnter: function(event) {
      const target = event.target;
      const isInFirstToast = firstToast.current?.contains(target);
      setShouldExpand(!isInFirstToast);
    },
    onMouseLeave: function() {
      setShouldExpand(false);
    }
  }, /* @__PURE__ */ import_react113.default.createElement(TransitionGroup_default, {
    component: null
  }, toastsMarkup)));
});
var toastClasses = {
  enter: classNames(styles29.ToastWrapper, styles29["ToastWrapper-enter"]),
  enterDone: classNames(styles29.ToastWrapper, styles29["ToastWrapper-enter-done"]),
  exit: classNames(styles29.ToastWrapper, styles29["ToastWrapper-exit"])
};

// node_modules/@shopify/polaris/build/esm/components/Frame/Frame.js
var APP_FRAME_MAIN = "AppFrameMain";
var APP_FRAME_NAV = "AppFrameNav";
var APP_FRAME_TOP_BAR = "AppFrameTopBar";
var APP_FRAME_LOADING_BAR = "AppFrameLoadingBar";
var FrameInner = class extends import_react114.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      skipFocused: false,
      globalRibbonHeight: 0,
      loadingStack: 0,
      toastMessages: [],
      showContextualSaveBar: false
    };
    this.contextualSaveBar = null;
    this.globalRibbonContainer = null;
    this.navigationNode = /* @__PURE__ */ (0, import_react114.createRef)();
    this.setGlobalRibbonHeight = () => {
      const {
        globalRibbonContainer
      } = this;
      if (globalRibbonContainer) {
        this.setState({
          globalRibbonHeight: globalRibbonContainer.offsetHeight
        }, this.setGlobalRibbonRootProperty);
      }
    };
    this.setOffset = () => {
      const {
        offset = "0px"
      } = this.props;
      setRootProperty("--pc-frame-offset", offset);
    };
    this.setGlobalRibbonRootProperty = () => {
      const {
        globalRibbonHeight
      } = this.state;
      setRootProperty("--pc-frame-global-ribbon-height", `${globalRibbonHeight}px`);
    };
    this.showToast = (toast) => {
      this.setState(({
        toastMessages
      }) => {
        const hasToastById = toastMessages.find(({
          id
        }) => id === toast.id) != null;
        return {
          toastMessages: hasToastById ? toastMessages : [...toastMessages, toast]
        };
      });
    };
    this.hideToast = ({
      id
    }) => {
      this.setState(({
        toastMessages
      }) => {
        return {
          toastMessages: toastMessages.filter(({
            id: toastId
          }) => id !== toastId)
        };
      });
    };
    this.setContextualSaveBar = (props) => {
      const {
        showContextualSaveBar
      } = this.state;
      this.contextualSaveBar = {
        ...props
      };
      if (showContextualSaveBar === true) {
        this.forceUpdate();
      } else {
        this.setState({
          showContextualSaveBar: true
        });
      }
    };
    this.removeContextualSaveBar = () => {
      this.contextualSaveBar = null;
      this.setState({
        showContextualSaveBar: false
      });
    };
    this.startLoading = () => {
      this.setState(({
        loadingStack
      }) => ({
        loadingStack: loadingStack + 1
      }));
    };
    this.stopLoading = () => {
      this.setState(({
        loadingStack
      }) => ({
        loadingStack: Math.max(0, loadingStack - 1)
      }));
    };
    this.handleResize = () => {
      if (this.props.globalRibbon) {
        this.setGlobalRibbonHeight();
      }
    };
    this.handleFocus = () => {
      this.setState({
        skipFocused: true
      });
    };
    this.handleBlur = () => {
      this.setState({
        skipFocused: false
      });
    };
    this.handleClick = (event) => {
      const {
        skipToContentTarget
      } = this.props;
      if (skipToContentTarget && skipToContentTarget.current) {
        skipToContentTarget.current.focus();
        event?.preventDefault();
      }
    };
    this.handleNavigationDismiss = () => {
      const {
        onNavigationDismiss
      } = this.props;
      if (onNavigationDismiss != null) {
        onNavigationDismiss();
      }
    };
    this.setGlobalRibbonContainer = (node) => {
      this.globalRibbonContainer = node;
    };
    this.handleNavKeydown = (event) => {
      const {
        key
      } = event;
      const {
        mediaQuery: {
          isNavigationCollapsed
        },
        showMobileNavigation
      } = this.props;
      const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
      if (mobileNavShowing && key === "Escape") {
        this.handleNavigationDismiss();
      }
    };
  }
  componentDidMount() {
    this.handleResize();
    if (this.props.globalRibbon) {
      return;
    }
    this.setGlobalRibbonRootProperty();
    this.setOffset();
  }
  componentDidUpdate(prevProps) {
    if (this.props.globalRibbon !== prevProps.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
    this.setOffset();
  }
  render() {
    const {
      skipFocused,
      loadingStack,
      toastMessages,
      showContextualSaveBar
    } = this.state;
    const {
      logo,
      children,
      navigation,
      topBar,
      globalRibbon,
      showMobileNavigation = false,
      skipToContentTarget,
      i18n,
      sidebar,
      mediaQuery: {
        isNavigationCollapsed
      }
    } = this.props;
    const navClassName = classNames(styles24.Navigation, showMobileNavigation && styles24["Navigation-visible"]);
    const mobileNavHidden = isNavigationCollapsed && !showMobileNavigation;
    const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
    const tabIndex = mobileNavShowing ? 0 : -1;
    const mobileNavAttributes = {
      ...mobileNavShowing && {
        "aria-modal": true,
        role: "dialog"
      }
    };
    const navigationMarkup = navigation ? /* @__PURE__ */ import_react114.default.createElement(UseTheme, null, (theme) => /* @__PURE__ */ import_react114.default.createElement(TrapFocus, {
      trapping: mobileNavShowing
    }, /* @__PURE__ */ import_react114.default.createElement(CSSTransition_default, {
      nodeRef: this.navigationNode,
      appear: isNavigationCollapsed,
      exit: isNavigationCollapsed,
      in: showMobileNavigation,
      timeout: parseInt(theme.motion["motion-duration-300"], 10),
      classNames: navTransitionClasses
    }, /* @__PURE__ */ import_react114.default.createElement("div", Object.assign({
      key: "NavContent"
    }, mobileNavAttributes, {
      "aria-label": i18n.translate("Polaris.Frame.navigationLabel"),
      ref: this.navigationNode,
      className: navClassName,
      onKeyDown: this.handleNavKeydown,
      id: APP_FRAME_NAV,
      hidden: mobileNavHidden
    }), navigation, /* @__PURE__ */ import_react114.default.createElement("button", {
      type: "button",
      className: styles24.NavigationDismiss,
      onClick: this.handleNavigationDismiss,
      "aria-hidden": mobileNavHidden || !isNavigationCollapsed && !showMobileNavigation,
      "aria-label": i18n.translate("Polaris.Frame.Navigation.closeMobileNavigationLabel"),
      tabIndex
    }, /* @__PURE__ */ import_react114.default.createElement(Icon, {
      source: SvgXIcon
    })))))) : null;
    const loadingMarkup = loadingStack > 0 ? /* @__PURE__ */ import_react114.default.createElement("div", {
      className: styles24.LoadingBar,
      id: APP_FRAME_LOADING_BAR
    }, /* @__PURE__ */ import_react114.default.createElement(Loading, null)) : null;
    const topBarMarkup = topBar ? /* @__PURE__ */ import_react114.default.createElement("div", Object.assign({
      className: styles24.TopBar
    }, layer.props, dataPolarisTopBar.props, {
      id: APP_FRAME_TOP_BAR
    }), topBar) : null;
    const globalRibbonMarkup = globalRibbon ? /* @__PURE__ */ import_react114.default.createElement("div", {
      className: styles24.GlobalRibbonContainer,
      ref: this.setGlobalRibbonContainer
    }, globalRibbon) : null;
    const skipClassName = classNames(styles24.Skip, skipFocused && styles24.focused);
    const skipTarget = skipToContentTarget?.current ? skipToContentTarget.current.id : APP_FRAME_MAIN;
    const skipMarkup = /* @__PURE__ */ import_react114.default.createElement("div", {
      className: skipClassName
    }, /* @__PURE__ */ import_react114.default.createElement("a", {
      href: `#${skipTarget}`,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick
    }, /* @__PURE__ */ import_react114.default.createElement(Text, {
      as: "span",
      variant: "bodyLg",
      fontWeight: "medium"
    }, i18n.translate("Polaris.Frame.skipToContent"))));
    const navigationAttributes = navigation ? {
      "data-has-navigation": true
    } : {};
    const frameClassName = classNames(styles24.Frame, navigation && styles24.hasNav, topBar && styles24.hasTopBar, sidebar && styles24.hasSidebar);
    const contextualSaveBarMarkup = /* @__PURE__ */ import_react114.default.createElement(CSSAnimation, {
      in: showContextualSaveBar,
      className: styles24.ContextualSaveBar,
      type: "fade"
    }, /* @__PURE__ */ import_react114.default.createElement(ContextualSaveBar, this.contextualSaveBar));
    const navigationOverlayMarkup = showMobileNavigation && isNavigationCollapsed ? /* @__PURE__ */ import_react114.default.createElement(Backdrop, {
      belowNavigation: true,
      onClick: this.handleNavigationDismiss,
      onTouchStart: this.handleNavigationDismiss
    }) : null;
    const context = {
      logo,
      showToast: this.showToast,
      hideToast: this.hideToast,
      toastMessages,
      startLoading: this.startLoading,
      stopLoading: this.stopLoading,
      setContextualSaveBar: this.setContextualSaveBar,
      removeContextualSaveBar: this.removeContextualSaveBar
    };
    return /* @__PURE__ */ import_react114.default.createElement(FrameContext.Provider, {
      value: context
    }, /* @__PURE__ */ import_react114.default.createElement("div", Object.assign({
      className: frameClassName
    }, layer.props, navigationAttributes), skipMarkup, topBarMarkup, navigationMarkup, contextualSaveBarMarkup, loadingMarkup, navigationOverlayMarkup, /* @__PURE__ */ import_react114.default.createElement("main", {
      className: styles24.Main,
      id: APP_FRAME_MAIN,
      "data-has-global-ribbon": Boolean(globalRibbon)
    }, /* @__PURE__ */ import_react114.default.createElement("div", {
      className: styles24.Content
    }, children)), /* @__PURE__ */ import_react114.default.createElement(ToastManager, {
      toastMessages
    }), globalRibbonMarkup, /* @__PURE__ */ import_react114.default.createElement(EventListener, {
      event: "resize",
      handler: this.handleResize
    })));
  }
};
var navTransitionClasses = {
  enter: classNames(styles24["Navigation-enter"]),
  enterActive: classNames(styles24["Navigation-enterActive"]),
  enterDone: classNames(styles24["Navigation-enterActive"]),
  exit: classNames(styles24["Navigation-exit"]),
  exitActive: classNames(styles24["Navigation-exitActive"])
};
function Frame(props) {
  const i18n = useI18n();
  const mediaQuery = useMediaQuery();
  return /* @__PURE__ */ import_react114.default.createElement(FrameInner, Object.assign({}, props, {
    i18n,
    mediaQuery
  }));
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
var import_react118 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.css.js
var styles31 = {
  "Layout": "Polaris-Layout",
  "Section": "Polaris-Layout__Section",
  "Section-fullWidth": "Polaris-Layout__Section--fullWidth",
  "Section-oneHalf": "Polaris-Layout__Section--oneHalf",
  "Section-oneThird": "Polaris-Layout__Section--oneThird",
  "AnnotatedSection": "Polaris-Layout__AnnotatedSection",
  "AnnotationWrapper": "Polaris-Layout__AnnotationWrapper",
  "AnnotationContent": "Polaris-Layout__AnnotationContent",
  "Annotation": "Polaris-Layout__Annotation"
};

// node_modules/@shopify/polaris/build/esm/components/Layout/components/AnnotatedSection/AnnotatedSection.js
var import_react116 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
var import_react115 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.css.js
var styles32 = {
  "TextContainer": "Polaris-TextContainer",
  "spacingTight": "Polaris-TextContainer--spacingTight",
  "spacingLoose": "Polaris-TextContainer--spacingLoose"
};

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
function TextContainer({
  spacing,
  children
}) {
  const className = classNames(styles32.TextContainer, spacing && styles32[variationName("spacing", spacing)]);
  return /* @__PURE__ */ import_react115.default.createElement("div", {
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
  const descriptionMarkup = typeof description === "string" ? /* @__PURE__ */ import_react116.default.createElement(Text, {
    as: "p",
    variant: "bodyMd"
  }, description) : description;
  return /* @__PURE__ */ import_react116.default.createElement("div", {
    className: styles31.AnnotatedSection
  }, /* @__PURE__ */ import_react116.default.createElement("div", {
    className: styles31.AnnotationWrapper
  }, /* @__PURE__ */ import_react116.default.createElement("div", {
    className: styles31.Annotation
  }, /* @__PURE__ */ import_react116.default.createElement(TextContainer, {
    spacing: "tight"
  }, /* @__PURE__ */ import_react116.default.createElement(Text, {
    id,
    variant: "headingMd",
    as: "h2"
  }, title), descriptionMarkup && /* @__PURE__ */ import_react116.default.createElement(Box, {
    color: "text-secondary"
  }, descriptionMarkup))), /* @__PURE__ */ import_react116.default.createElement("div", {
    className: styles31.AnnotationContent
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Layout/components/Section/Section.js
var import_react117 = __toESM(require_react());
function Section2({
  children,
  variant
}) {
  const className = classNames(styles31.Section, styles31[`Section-${variant}`]);
  return /* @__PURE__ */ import_react117.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
var Layout = function Layout2({
  sectioned,
  children
}) {
  const content = sectioned ? /* @__PURE__ */ import_react118.default.createElement(Section2, null, children) : children;
  return /* @__PURE__ */ import_react118.default.createElement("div", {
    className: styles31.Layout
  }, content);
};
Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section2;

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
var import_react146 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/is-interface.js
var import_react119 = __toESM(require_react());
function isInterface(x) {
  return !/* @__PURE__ */ (0, import_react119.isValidElement)(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/is-react-element.js
var import_react120 = __toESM(require_react());
function isReactElement(x) {
  return /* @__PURE__ */ (0, import_react120.isValidElement)(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.css.js
var styles33 = {
  "Page": "Polaris-Page",
  "fullWidth": "Polaris-Page--fullWidth",
  "narrowWidth": "Polaris-Page--narrowWidth",
  "Content": "Polaris-Page__Content"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
var import_react145 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.css.js
var styles34 = {
  "TitleWrapper": "Polaris-Page-Header__TitleWrapper",
  "TitleWrapperExpand": "Polaris-Page-Header__TitleWrapperExpand",
  "BreadcrumbWrapper": "Polaris-Page-Header__BreadcrumbWrapper",
  "PaginationWrapper": "Polaris-Page-Header__PaginationWrapper",
  "PrimaryActionWrapper": "Polaris-Page-Header__PrimaryActionWrapper",
  "Row": "Polaris-Page-Header__Row",
  "mobileView": "Polaris-Page-Header--mobileView",
  "RightAlign": "Polaris-Page-Header__RightAlign",
  "noBreadcrumbs": "Polaris-Page-Header--noBreadcrumbs",
  "AdditionalMetaData": "Polaris-Page-Header__AdditionalMetaData",
  "Actions": "Polaris-Page-Header__Actions",
  "longTitle": "Polaris-Page-Header--longTitle",
  "mediumTitle": "Polaris-Page-Header--mediumTitle",
  "isSingleRow": "Polaris-Page-Header--isSingleRow"
};

// node_modules/@shopify/polaris/build/esm/components/Breadcrumbs/Breadcrumbs.js
var import_react121 = __toESM(require_react());
function Breadcrumbs({
  backAction
}) {
  const {
    content
  } = backAction;
  return /* @__PURE__ */ import_react121.default.createElement(Button, {
    key: content,
    url: "url" in backAction ? backAction.url : void 0,
    onClick: "onAction" in backAction ? backAction.onAction : void 0,
    onPointerDown: handleMouseUpByBlurring,
    icon: SvgArrowLeftIcon,
    accessibilityLabel: backAction.accessibilityLabel ?? content
  });
}

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
var import_react123 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.css.js
var styles35 = {
  "Title": "Polaris-Header-Title",
  "TitleWithSubtitle": "Polaris-Header-Title__TitleWithSubtitle",
  "TitleWrapper": "Polaris-Header-Title__TitleWrapper",
  "SubTitle": "Polaris-Header-Title__SubTitle",
  "SubtitleCompact": "Polaris-Header-Title__SubtitleCompact",
  "SubtitleMaxWidth": "Polaris-Header-Title__SubtitleMaxWidth"
};

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.js
var import_react122 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.css.js
var styles36 = {
  "Bleed": "Polaris-Bleed"
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
  const getNegativeMargins = (direction) => {
    const xAxis = ["marginInlineStart", "marginInlineEnd"];
    const yAxis = ["marginBlockStart", "marginBlockEnd"];
    const directionValues = {
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
      marginInline,
      marginBlock
    };
    if (directionValues[direction]) {
      return directionValues[direction];
    } else if (xAxis.includes(direction) && marginInline) {
      return directionValues.marginInline;
    } else if (yAxis.includes(direction) && marginBlock) {
      return directionValues.marginBlock;
    }
  };
  const negativeMarginBlockStart = getNegativeMargins("marginBlockStart");
  const negativeMarginBlockEnd = getNegativeMargins("marginBlockEnd");
  const negativeMarginInlineStart = getNegativeMargins("marginInlineStart");
  const negativeMarginInlineEnd = getNegativeMargins("marginInlineEnd");
  const style = {
    ...getResponsiveProps("bleed", "margin-block-start", "space", negativeMarginBlockStart),
    ...getResponsiveProps("bleed", "margin-block-end", "space", negativeMarginBlockEnd),
    ...getResponsiveProps("bleed", "margin-inline-start", "space", negativeMarginInlineStart),
    ...getResponsiveProps("bleed", "margin-inline-end", "space", negativeMarginInlineEnd)
  };
  return /* @__PURE__ */ import_react122.default.createElement("div", {
    className: styles36.Bleed,
    style: sanitizeCustomProperties(style)
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle,
  hasSubtitleMaxWidth
}) {
  const className = classNames(styles35.Title, subtitle && styles35.TitleWithSubtitle);
  const titleMarkup = title ? /* @__PURE__ */ import_react123.default.createElement("h1", {
    className
  }, /* @__PURE__ */ import_react123.default.createElement(Text, {
    as: "span",
    variant: "headingLg",
    fontWeight: "bold"
  }, title)) : null;
  const titleMetadataMarkup = titleMetadata ? /* @__PURE__ */ import_react123.default.createElement(Bleed, {
    marginBlock: "100"
  }, titleMetadata) : null;
  const wrappedTitleMarkup = /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles35.TitleWrapper
  }, titleMarkup, titleMetadataMarkup);
  const subtitleMarkup = subtitle ? /* @__PURE__ */ import_react123.default.createElement("div", {
    className: classNames(styles35.SubTitle, compactTitle && styles35.SubtitleCompact, hasSubtitleMaxWidth && styles35.SubtitleMaxWidth)
  }, /* @__PURE__ */ import_react123.default.createElement(Text, {
    as: "p",
    variant: "bodySm",
    tone: "subdued"
  }, subtitle)) : null;
  return /* @__PURE__ */ import_react123.default.createElement(import_react123.default.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.js
var import_react141 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.css.js
var styles37 = {
  "ActionMenu": "Polaris-ActionMenu"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
var import_react136 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.css.js
var styles38 = {
  "RollupActivator": "Polaris-ActionMenu-RollupActions__RollupActivator"
};

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
var import_react128 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Popover/set-activator-attributes.js
function setActivatorAttributes(activator, {
  id,
  active = false,
  ariaHaspopup,
  activatorDisabled = false
}) {
  if (!activatorDisabled) {
    activator.tabIndex = activator.tabIndex || 0;
  }
  activator.setAttribute("aria-controls", id);
  activator.setAttribute("aria-owns", id);
  activator.setAttribute("aria-expanded", String(active));
  activator.setAttribute("data-state", active ? "open" : "closed");
  if (ariaHaspopup != null) {
    activator.setAttribute("aria-haspopup", String(ariaHaspopup));
  }
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
var import_react127 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.css.js
var styles39 = {
  "Popover": "Polaris-Popover",
  "PopoverOverlay": "Polaris-Popover__PopoverOverlay",
  "PopoverOverlay-noAnimation": "Polaris-Popover__PopoverOverlay--noAnimation",
  "PopoverOverlay-entering": "Polaris-Popover__PopoverOverlay--entering",
  "PopoverOverlay-open": "Polaris-Popover__PopoverOverlay--open",
  "measuring": "Polaris-Popover--measuring",
  "PopoverOverlay-exiting": "Polaris-Popover__PopoverOverlay--exiting",
  "fullWidth": "Polaris-Popover--fullWidth",
  "Content": "Polaris-Popover__Content",
  "positionedAbove": "Polaris-Popover--positionedAbove",
  "positionedCover": "Polaris-Popover--positionedCover",
  "ContentContainer": "Polaris-Popover__ContentContainer",
  "Content-fullHeight": "Polaris-Popover__Content--fullHeight",
  "Content-fluidContent": "Polaris-Popover__Content--fluidContent",
  "Pane": "Polaris-Popover__Pane",
  "Pane-fixed": "Polaris-Popover__Pane--fixed",
  "Pane-subdued": "Polaris-Popover__Pane--subdued",
  "Pane-captureOverscroll": "Polaris-Popover__Pane--captureOverscroll",
  "Section": "Polaris-Popover__Section",
  "FocusTracker": "Polaris-Popover__FocusTracker",
  "PopoverOverlay-hideOnPrint": "Polaris-Popover__PopoverOverlay--hideOnPrint"
};

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
var import_react125 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Section/Section.js
var import_react124 = __toESM(require_react());
function Section3({
  children
}) {
  return /* @__PURE__ */ import_react124.default.createElement("div", {
    className: styles39.Section
  }, /* @__PURE__ */ import_react124.default.createElement(Box, {
    paddingInlineStart: "300",
    paddingInlineEnd: "300",
    paddingBlockStart: "200",
    paddingBlockEnd: "150"
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
function Pane({
  captureOverscroll = false,
  fixed,
  sectioned,
  children,
  height: height2,
  subdued,
  onScrolledToBottom
}) {
  const className = classNames(styles39.Pane, fixed && styles39["Pane-fixed"], subdued && styles39["Pane-subdued"], captureOverscroll && styles39["Pane-captureOverscroll"]);
  const content = sectioned ? wrapWithComponent(children, Section3, {}) : children;
  const style = height2 ? {
    height: height2,
    maxHeight: height2,
    minHeight: height2
  } : void 0;
  return fixed ? /* @__PURE__ */ import_react125.default.createElement("div", {
    style,
    className
  }, content) : /* @__PURE__ */ import_react125.default.createElement(Scrollable, {
    shadow: true,
    className,
    style,
    onScrolledToBottom,
    scrollbarWidth: "thin"
  }, content);
}

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
var import_react126 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/utilities/math.js
function calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset = 0) {
  const activatorTop = activatorRect.top;
  const activatorBottom = activatorTop + activatorRect.height;
  const spaceAbove = activatorRect.top - topBarOffset;
  const spaceBelow = containerRect.height - activatorRect.top - activatorRect.height;
  const desiredHeight = overlayRect.height;
  const verticalMargins = overlayMargins.activator + overlayMargins.container;
  const minimumSpaceToScroll = overlayMargins.container;
  const distanceToTopScroll = activatorRect.top - Math.max(scrollableContainerRect.top, 0);
  const distanceToBottomScroll = containerRect.top + Math.min(containerRect.height, scrollableContainerRect.top + scrollableContainerRect.height) - (activatorRect.top + activatorRect.height);
  const enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll;
  const enoughSpaceFromBottomScroll = distanceToBottomScroll >= minimumSpaceToScroll;
  const heightIfAbove = Math.min(spaceAbove, desiredHeight);
  const heightIfBelow = Math.min(spaceBelow, desiredHeight);
  const heightIfAboveCover = Math.min(spaceAbove + activatorRect.height, desiredHeight);
  const heightIfBelowCover = Math.min(spaceBelow + activatorRect.height, desiredHeight);
  const containerRectTop = fixed ? 0 : containerRect.top;
  const positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: "above"
  };
  const positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: "below"
  };
  const positionIfCoverBelow = {
    height: heightIfBelowCover - verticalMargins,
    top: activatorTop + containerRectTop,
    positioning: "cover"
  };
  const positionIfCoverAbove = {
    height: heightIfAboveCover - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove + activatorRect.height + verticalMargins,
    positioning: "cover"
  };
  if (preferredPosition === "above") {
    return (enoughSpaceFromTopScroll || distanceToTopScroll >= distanceToBottomScroll && !enoughSpaceFromBottomScroll) && (spaceAbove > desiredHeight || spaceAbove > spaceBelow) ? positionIfAbove : positionIfBelow;
  }
  if (preferredPosition === "below") {
    return (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow > desiredHeight || spaceBelow > spaceAbove) ? positionIfBelow : positionIfAbove;
  }
  if (preferredPosition === "cover") {
    return (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow + activatorRect.height > desiredHeight || spaceBelow > spaceAbove) ? positionIfCoverBelow : positionIfCoverAbove;
  }
  if (enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll) {
    return spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow;
  }
  return distanceToTopScroll > minimumSpaceToScroll ? positionIfAbove : positionIfBelow;
}
function calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment) {
  const maximum = containerRect.width - overlayRect.width;
  if (preferredAlignment === "left") {
    return Math.min(maximum, Math.max(0, activatorRect.left - overlayMargins.horizontal));
  } else if (preferredAlignment === "right") {
    const activatorRight = containerRect.width - (activatorRect.left + activatorRect.width);
    return Math.min(maximum, Math.max(0, activatorRight - overlayMargins.horizontal));
  }
  return Math.min(maximum, Math.max(0, activatorRect.center.x - overlayRect.width / 2));
}
function rectIsOutsideOfRect(inner, outer) {
  const {
    center
  } = inner;
  return center.y < outer.top || center.y > outer.top + outer.height;
}
function intersectionWithViewport(rect, viewport = windowRect()) {
  const top = Math.max(rect.top, 0);
  const left = Math.max(rect.left, 0);
  const bottom = Math.min(rect.top + rect.height, viewport.height);
  const right = Math.min(rect.left + rect.width, viewport.width);
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
var styles40 = {
  "PositionedOverlay": "Polaris-PositionedOverlay",
  "fixed": "Polaris-PositionedOverlay--fixed",
  "calculating": "Polaris-PositionedOverlay--calculating",
  "preventInteraction": "Polaris-PositionedOverlay--preventInteraction"
};

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
var OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  attributeFilter: ["style"]
};
var PositionedOverlay = class extends import_react126.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      measuring: true,
      activatorRect: getRectForNode(this.props.activator),
      right: void 0,
      left: void 0,
      top: 0,
      height: 0,
      width: null,
      positioning: "below",
      zIndex: null,
      outsideScrollableContainer: false,
      lockPosition: false,
      chevronOffset: 0
    };
    this.overlay = null;
    this.scrollableContainers = [];
    this.overlayDetails = () => {
      const {
        measuring,
        left,
        right,
        positioning,
        height: height2,
        activatorRect,
        chevronOffset
      } = this.state;
      return {
        measuring,
        left,
        right,
        desiredHeight: height2,
        positioning,
        activatorRect,
        chevronOffset
      };
    };
    this.setOverlay = (node) => {
      this.overlay = node;
    };
    this.setScrollableContainers = () => {
      const containers = [];
      let scrollableContainer = Scrollable.forNode(this.props.activator);
      if (scrollableContainer) {
        containers.push(scrollableContainer);
        while (scrollableContainer?.parentElement) {
          scrollableContainer = Scrollable.forNode(scrollableContainer.parentElement);
          containers.push(scrollableContainer);
        }
      }
      this.scrollableContainers = containers;
    };
    this.registerScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.addEventListener("scroll", this.handleMeasurement);
      });
    };
    this.unregisterScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.removeEventListener("scroll", this.handleMeasurement);
      });
    };
    this.handleMeasurement = () => {
      const {
        lockPosition,
        top
      } = this.state;
      this.observer.disconnect();
      this.setState(({
        left,
        top: top2,
        right
      }) => ({
        left,
        right,
        top: top2,
        height: 0,
        positioning: "below",
        measuring: true
      }), () => {
        if (this.overlay == null || this.firstScrollableContainer == null) {
          return;
        }
        const {
          activator,
          preferredPosition = "below",
          preferredAlignment = "center",
          onScrollOut,
          fullWidth,
          fixed,
          preferInputActivator = true
        } = this.props;
        const preferredActivator = preferInputActivator ? activator.querySelector("input") || activator : activator;
        const activatorRect = getRectForNode(preferredActivator);
        const currentOverlayRect = getRectForNode(this.overlay);
        const scrollableElement = isDocument2(this.firstScrollableContainer) ? document.body : this.firstScrollableContainer;
        const scrollableContainerRect = getRectForNode(scrollableElement);
        const overlayRect = fullWidth || preferredPosition === "cover" ? new Rect({
          ...currentOverlayRect,
          width: activatorRect.width
        }) : currentOverlayRect;
        if (scrollableElement === document.body) {
          scrollableContainerRect.height = document.body.scrollHeight;
        }
        let topBarOffset = 0;
        const topBarElement = scrollableElement.querySelector(`${dataPolarisTopBar.selector}`);
        if (topBarElement) {
          topBarOffset = topBarElement.clientHeight;
        }
        const overlayMargins = this.overlay.firstElementChild && this.overlay.firstChild instanceof HTMLElement ? getMarginsForNode(this.overlay.firstElementChild) : {
          activator: 0,
          container: 0,
          horizontal: 0
        };
        const containerRect = windowRect();
        const zIndexForLayer = getZIndexForLayerFromNode(activator);
        const zIndex2 = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
        const verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset);
        const horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment);
        const chevronOffset = activatorRect.center.x - horizontalPosition + overlayMargins.horizontal * 2;
        this.setState({
          measuring: false,
          activatorRect: getRectForNode(activator),
          left: preferredAlignment !== "right" ? horizontalPosition : void 0,
          right: preferredAlignment === "right" ? horizontalPosition : void 0,
          top: lockPosition ? top : verticalPosition.top,
          lockPosition: Boolean(fixed),
          height: verticalPosition.height || 0,
          width: fullWidth || preferredPosition === "cover" ? overlayRect.width : null,
          positioning: verticalPosition.positioning,
          outsideScrollableContainer: onScrollOut != null && rectIsOutsideOfRect(activatorRect, intersectionWithViewport(scrollableContainerRect)),
          zIndex: zIndex2,
          chevronOffset
        }, () => {
          if (!this.overlay)
            return;
          this.observer.observe(this.overlay, OBSERVER_CONFIG);
          this.observer.observe(activator, OBSERVER_CONFIG);
        });
      });
    };
    this.observer = new MutationObserver(this.handleMeasurement);
  }
  componentDidMount() {
    this.setScrollableContainers();
    if (this.scrollableContainers.length && !this.props.fixed) {
      this.registerScrollHandlers();
    }
    this.handleMeasurement();
  }
  componentWillUnmount() {
    this.observer.disconnect();
    if (this.scrollableContainers.length && !this.props.fixed) {
      this.unregisterScrollHandlers();
    }
  }
  componentDidUpdate() {
    const {
      outsideScrollableContainer,
      top
    } = this.state;
    const {
      onScrollOut,
      active
    } = this.props;
    if (active && onScrollOut != null && top !== 0 && outsideScrollableContainer) {
      onScrollOut();
    }
  }
  render() {
    const {
      left,
      right,
      top,
      zIndex: zIndex2,
      width: width2
    } = this.state;
    const {
      render,
      fixed,
      preventInteraction,
      classNames: propClassNames,
      zIndexOverride
    } = this.props;
    const style = {
      top: top == null || isNaN(top) ? void 0 : top,
      left: left == null || isNaN(left) ? void 0 : left,
      right: right == null || isNaN(right) ? void 0 : right,
      width: width2 == null || isNaN(width2) ? void 0 : width2,
      zIndex: zIndexOverride || zIndex2 || void 0
    };
    const className = classNames(styles40.PositionedOverlay, fixed && styles40.fixed, preventInteraction && styles40.preventInteraction, propClassNames);
    return /* @__PURE__ */ import_react126.default.createElement("div", {
      className,
      style,
      ref: this.setOverlay
    }, /* @__PURE__ */ import_react126.default.createElement(EventListener, {
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
  const nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || "0"),
    container: parseFloat(nodeStyles.marginBottom || "0"),
    horizontal: parseFloat(nodeStyles.marginLeft || "0")
  };
}
function getZIndexForLayerFromNode(node) {
  const layerNode = node.closest(layer.selector) || document.body;
  const zIndex2 = layerNode === document.body ? "auto" : parseInt(window.getComputedStyle(layerNode).zIndex || "0", 10);
  return zIndex2 === "auto" || isNaN(zIndex2) ? null : zIndex2;
}
function isDocument2(node) {
  return node === document;
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
var PopoverCloseSource;
(function(PopoverCloseSource2) {
  PopoverCloseSource2[PopoverCloseSource2["Click"] = 0] = "Click";
  PopoverCloseSource2[PopoverCloseSource2["EscapeKeypress"] = 1] = "EscapeKeypress";
  PopoverCloseSource2[PopoverCloseSource2["FocusOut"] = 2] = "FocusOut";
  PopoverCloseSource2[PopoverCloseSource2["ScrollOut"] = 3] = "ScrollOut";
})(PopoverCloseSource || (PopoverCloseSource = {}));
var TransitionStatus2;
(function(TransitionStatus3) {
  TransitionStatus3["Entering"] = "entering";
  TransitionStatus3["Entered"] = "entered";
  TransitionStatus3["Exiting"] = "exiting";
  TransitionStatus3["Exited"] = "exited";
})(TransitionStatus2 || (TransitionStatus2 = {}));
var PopoverOverlay = class extends import_react127.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transitionStatus: this.props.active ? TransitionStatus2.Entering : TransitionStatus2.Exited
    };
    this.contentNode = /* @__PURE__ */ (0, import_react127.createRef)();
    this.renderPopover = (overlayDetails) => {
      const {
        measuring,
        desiredHeight,
        positioning
      } = overlayDetails;
      const {
        id,
        children,
        sectioned,
        fullWidth,
        fullHeight,
        fluidContent,
        hideOnPrint,
        autofocusTarget,
        captureOverscroll
      } = this.props;
      const isCovering = positioning === "cover";
      const className = classNames(styles39.Popover, measuring && styles39.measuring, (fullWidth || isCovering) && styles39.fullWidth, hideOnPrint && styles39["PopoverOverlay-hideOnPrint"], positioning && styles39[variationName("positioned", positioning)]);
      const contentStyles = measuring ? void 0 : {
        height: desiredHeight
      };
      const contentClassNames = classNames(styles39.Content, fullHeight && styles39["Content-fullHeight"], fluidContent && styles39["Content-fluidContent"]);
      return /* @__PURE__ */ import_react127.default.createElement("div", Object.assign({
        className
      }, overlay.props), /* @__PURE__ */ import_react127.default.createElement(EventListener, {
        event: "click",
        handler: this.handleClick
      }), /* @__PURE__ */ import_react127.default.createElement(EventListener, {
        event: "touchstart",
        handler: this.handleClick
      }), /* @__PURE__ */ import_react127.default.createElement(KeypressListener, {
        keyCode: Key.Escape,
        handler: this.handleEscape
      }), /* @__PURE__ */ import_react127.default.createElement("div", {
        className: styles39.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusFirstItem
      }), /* @__PURE__ */ import_react127.default.createElement("div", {
        className: styles39.ContentContainer
      }, /* @__PURE__ */ import_react127.default.createElement("div", {
        id,
        tabIndex: autofocusTarget === "none" ? void 0 : -1,
        className: contentClassNames,
        style: contentStyles,
        ref: this.contentNode
      }, renderPopoverContent(children, {
        captureOverscroll,
        sectioned
      }))), /* @__PURE__ */ import_react127.default.createElement("div", {
        className: styles39.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusLastItem
      }));
    };
    this.handleClick = (event) => {
      const target = event.target;
      const {
        contentNode,
        props: {
          activator,
          onClose,
          preventCloseOnChildOverlayClick
        }
      } = this;
      const composedPath = event.composedPath();
      const wasDescendant = preventCloseOnChildOverlayClick ? wasPolarisPortalDescendant(composedPath, this.context.container) : wasContentNodeDescendant(composedPath, contentNode);
      const isActivatorDescendant = nodeContainsDescendant(activator, target);
      if (wasDescendant || isActivatorDescendant || this.state.transitionStatus !== TransitionStatus2.Entered) {
        return;
      }
      onClose(PopoverCloseSource.Click);
    };
    this.handleScrollOut = () => {
      this.props.onClose(PopoverCloseSource.ScrollOut);
    };
    this.handleEscape = (event) => {
      const target = event.target;
      const {
        contentNode,
        props: {
          activator
        }
      } = this;
      const composedPath = event.composedPath();
      const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
      const isActivatorDescendant = nodeContainsDescendant(activator, target);
      if (wasDescendant || isActivatorDescendant) {
        this.props.onClose(PopoverCloseSource.EscapeKeypress);
      }
    };
    this.handleFocusFirstItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    };
    this.handleFocusLastItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    };
    this.overlayRef = /* @__PURE__ */ (0, import_react127.createRef)();
  }
  forceUpdatePosition() {
    this.overlayRef.current?.forceUpdatePosition();
  }
  changeTransitionStatus(transitionStatus, cb) {
    this.setState({
      transitionStatus
    }, cb);
    this.contentNode.current && this.contentNode.current.getBoundingClientRect();
  }
  componentDidMount() {
    if (this.props.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus2.Entered);
    }
  }
  componentDidUpdate(oldProps) {
    if (this.props.active && !oldProps.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus2.Entering, () => {
        this.clearTransitionTimeout();
        this.enteringTimer = window.setTimeout(() => {
          this.setState({
            transitionStatus: TransitionStatus2.Entered
          });
        }, parseInt(themeDefault.motion["motion-duration-100"], 10));
      });
    }
    if (!this.props.active && oldProps.active) {
      this.clearTransitionTimeout();
      this.setState({
        transitionStatus: TransitionStatus2.Exited
      });
    }
  }
  componentWillUnmount() {
    this.clearTransitionTimeout();
  }
  render() {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = "below",
      preferredAlignment = "center",
      preferInputActivator = true,
      fixed,
      zIndexOverride
    } = this.props;
    const {
      transitionStatus
    } = this.state;
    if (transitionStatus === TransitionStatus2.Exited && !active)
      return null;
    const className = classNames(styles39.PopoverOverlay, transitionStatus === TransitionStatus2.Entering && styles39["PopoverOverlay-entering"], transitionStatus === TransitionStatus2.Entered && styles39["PopoverOverlay-open"], transitionStatus === TransitionStatus2.Exiting && styles39["PopoverOverlay-exiting"], preferredPosition === "cover" && styles39["PopoverOverlay-noAnimation"]);
    return /* @__PURE__ */ import_react127.default.createElement(PositionedOverlay, {
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
    if (this.enteringTimer) {
      window.clearTimeout(this.enteringTimer);
    }
  }
  focusContent() {
    const {
      autofocusTarget = "container"
    } = this.props;
    if (autofocusTarget === "none" || this.contentNode == null) {
      return;
    }
    requestAnimationFrame(() => {
      if (this.contentNode.current == null) {
        return;
      }
      const focusableChild = findFirstKeyboardFocusableNode(this.contentNode.current);
      if (focusableChild && autofocusTarget === "first-node") {
        focusableChild.focus({
          preventScroll: true
        });
      } else {
        this.contentNode.current.focus({
          preventScroll: true
        });
      }
    });
  }
  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
};
PopoverOverlay.contextType = PortalsManagerContext;
function renderPopoverContent(children, props) {
  const childrenArray = import_react127.Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) {
    return childrenArray;
  }
  return wrapWithComponent(childrenArray, Pane, props);
}
function nodeContainsDescendant(rootNode, descendant) {
  if (rootNode === descendant) {
    return true;
  }
  let parent = descendant.parentNode;
  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}
function wasContentNodeDescendant(composedPath, contentNode) {
  return contentNode.current != null && composedPath.includes(contentNode.current);
}
function wasPolarisPortalDescendant(composedPath, portalsContainerElement) {
  return composedPath.some((eventTarget) => eventTarget instanceof Node && portalsContainerElement?.contains(eventTarget));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
var PopoverComponent = /* @__PURE__ */ (0, import_react128.forwardRef)(function Popover({
  activatorWrapper = "div",
  children,
  onClose,
  activator,
  preventFocusOnClose,
  active,
  fixed,
  ariaHaspopup,
  preferInputActivator = true,
  zIndexOverride,
  ...rest
}, ref) {
  const [activatorNode, setActivatorNode] = (0, import_react128.useState)();
  const overlayRef = (0, import_react128.useRef)(null);
  const activatorContainer = (0, import_react128.useRef)(null);
  const WrapperComponent = activatorWrapper;
  const id = (0, import_react128.useId)();
  function forceUpdatePosition() {
    overlayRef.current?.forceUpdatePosition();
  }
  (0, import_react128.useImperativeHandle)(ref, () => {
    return {
      forceUpdatePosition
    };
  });
  const setAccessibilityAttributes = (0, import_react128.useCallback)(() => {
    if (activatorContainer.current == null) {
      return;
    }
    const firstFocusable = findFirstFocusableNodeIncludingDisabled(activatorContainer.current);
    const focusableActivator = firstFocusable || activatorContainer.current;
    const activatorDisabled = "disabled" in focusableActivator && Boolean(focusableActivator.disabled);
    setActivatorAttributes(focusableActivator, {
      id,
      active,
      ariaHaspopup,
      activatorDisabled
    });
  }, [id, active, ariaHaspopup]);
  const handleClose = (source) => {
    onClose(source);
    if (activatorContainer.current == null || preventFocusOnClose) {
      return;
    }
    if (source === PopoverCloseSource.FocusOut && activatorNode) {
      const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
      if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
        focusableActivator.focus();
      }
    } else if (source === PopoverCloseSource.EscapeKeypress && activatorNode) {
      const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
      if (focusableActivator) {
        focusableActivator.focus();
      } else {
        focusNextFocusableNode(focusableActivator, isInPortal);
      }
    }
  };
  (0, import_react128.useEffect)(() => {
    if (!activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    } else if (activatorNode && activatorContainer.current && !activatorContainer.current.contains(activatorNode)) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  (0, import_react128.useEffect)(() => {
    if (activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  const portal2 = activatorNode ? /* @__PURE__ */ import_react128.default.createElement(Portal, {
    idPrefix: "popover"
  }, /* @__PURE__ */ import_react128.default.createElement(PopoverOverlay, Object.assign({
    ref: overlayRef,
    id,
    activator: activatorNode,
    preferInputActivator,
    onClose: handleClose,
    active,
    fixed,
    zIndexOverride
  }, rest), children)) : null;
  return /* @__PURE__ */ import_react128.default.createElement(WrapperComponent, {
    ref: activatorContainer
  }, import_react128.Children.only(activator), portal2);
});
function isInPortal(element) {
  let parentElement = element.parentElement;
  while (parentElement) {
    if (parentElement.matches(portal.selector))
      return false;
    parentElement = parentElement.parentElement;
  }
  return true;
}
var Popover2 = Object.assign(PopoverComponent, {
  Pane,
  Section: Section3
});

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.js
var import_react135 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/FilterActionsProvider/FilterActionsProvider.js
var import_react129 = __toESM(require_react());
var FilterActionsContext = /* @__PURE__ */ (0, import_react129.createContext)(false);
function FilterActionsProvider({
  children,
  filterActions
}) {
  return /* @__PURE__ */ import_react129.default.createElement(FilterActionsContext.Provider, {
    value: filterActions
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
var import_react134 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
var import_react133 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.css.js
var styles41 = {
  "Item": "Polaris-ActionList__Item",
  "default": "Polaris-ActionList--default",
  "active": "Polaris-ActionList--active",
  "destructive": "Polaris-ActionList--destructive",
  "disabled": "Polaris-ActionList--disabled",
  "Prefix": "Polaris-ActionList__Prefix",
  "Suffix": "Polaris-ActionList__Suffix",
  "indented": "Polaris-ActionList--indented",
  "menu": "Polaris-ActionList--menu",
  "Text": "Polaris-ActionList__Text"
};

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.js
var import_react132 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.css.js
var styles42 = {
  "TooltipContainer": "Polaris-Tooltip__TooltipContainer",
  "HasUnderline": "Polaris-Tooltip__HasUnderline"
};

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/hooks.js
var import_react130 = __toESM(require_react());
function useEphemeralPresenceManager() {
  const ephemeralPresenceManager = (0, import_react130.useContext)(EphemeralPresenceManagerContext);
  if (!ephemeralPresenceManager) {
    throw new Error("No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return ephemeralPresenceManager;
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
var import_react131 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.css.js
var styles43 = {
  "TooltipOverlay": "Polaris-Tooltip-TooltipOverlay",
  "Tail": "Polaris-Tooltip-TooltipOverlay__Tail",
  "positionedAbove": "Polaris-Tooltip-TooltipOverlay--positionedAbove",
  "measuring": "Polaris-Tooltip-TooltipOverlay--measuring",
  "measured": "Polaris-Tooltip-TooltipOverlay--measured",
  "instant": "Polaris-Tooltip-TooltipOverlay--instant",
  "Content": "Polaris-Tooltip-TooltipOverlay__Content",
  "default": "Polaris-Tooltip-TooltipOverlay--default",
  "wide": "Polaris-Tooltip-TooltipOverlay--wide"
};

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
var tailUpPaths = /* @__PURE__ */ import_react131.default.createElement(import_react131.default.Fragment, null, /* @__PURE__ */ import_react131.default.createElement("path", {
  d: "M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z",
  fill: "var(--p-color-tooltip-tail-up-border-experimental)"
}), /* @__PURE__ */ import_react131.default.createElement("path", {
  d: "M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z",
  fill: "var(--p-color-bg-surface)"
}));
var tailDownPaths = /* @__PURE__ */ import_react131.default.createElement(import_react131.default.Fragment, null, /* @__PURE__ */ import_react131.default.createElement("path", {
  d: "m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z",
  fill: "var(--p-color-tooltip-tail-down-border-experimental)"
}), /* @__PURE__ */ import_react131.default.createElement("path", {
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
  width: width2,
  padding,
  borderRadius,
  zIndexOverride,
  instant
}) {
  const i18n = useI18n();
  const markup = active ? /* @__PURE__ */ import_react131.default.createElement(PositionedOverlay, {
    active,
    activator,
    preferredPosition,
    preventInteraction,
    render: renderTooltip,
    zIndexOverride
  }) : null;
  return markup;
  function renderTooltip(overlayDetails) {
    const {
      measuring,
      desiredHeight,
      positioning,
      chevronOffset
    } = overlayDetails;
    const containerClassName = classNames(styles43.TooltipOverlay, measuring && styles43.measuring, !measuring && styles43.measured, instant && styles43.instant, positioning === "above" && styles43.positionedAbove);
    const contentClassName = classNames(styles43.Content, width2 && styles43[width2]);
    const contentStyles = measuring ? void 0 : {
      minHeight: desiredHeight
    };
    const style = {
      "--pc-tooltip-chevron-x-pos": `${chevronOffset}px`,
      "--pc-tooltip-border-radius": borderRadius ? `var(--p-border-radius-${borderRadius})` : void 0,
      "--pc-tooltip-padding": padding && padding === "default" ? "var(--p-space-100) var(--p-space-200)" : `var(--p-space-${padding})`
    };
    return /* @__PURE__ */ import_react131.default.createElement("div", Object.assign({
      style,
      className: containerClassName
    }, layer.props), /* @__PURE__ */ import_react131.default.createElement("svg", {
      className: styles43.Tail,
      width: "19",
      height: "11",
      fill: "none"
    }, positioning === "above" ? tailDownPaths : tailUpPaths), /* @__PURE__ */ import_react131.default.createElement("div", {
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
  width: width2 = "default",
  padding = "default",
  borderRadius: borderRadiusProp,
  zIndexOverride,
  hasUnderline,
  persistOnClick,
  onOpen,
  onClose
}) {
  const borderRadius = borderRadiusProp || "200";
  const WrapperComponent = activatorWrapper;
  const {
    value: active,
    setTrue: setActiveTrue,
    setFalse: handleBlur
  } = useToggle(Boolean(originalActive));
  const {
    value: persist,
    toggle: togglePersisting
  } = useToggle(Boolean(originalActive) && Boolean(persistOnClick));
  const [activatorNode, setActivatorNode] = (0, import_react132.useState)(null);
  const {
    presenceList,
    addPresence,
    removePresence
  } = useEphemeralPresenceManager();
  const id = (0, import_react132.useId)();
  const activatorContainer = (0, import_react132.useRef)(null);
  const mouseEntered = (0, import_react132.useRef)(false);
  const [shouldAnimate, setShouldAnimate] = (0, import_react132.useState)(Boolean(!originalActive));
  const hoverDelayTimeout = (0, import_react132.useRef)(null);
  const hoverOutTimeout = (0, import_react132.useRef)(null);
  const handleFocus = (0, import_react132.useCallback)(() => {
    if (originalActive !== false) {
      setActiveTrue();
    }
  }, [originalActive, setActiveTrue]);
  (0, import_react132.useEffect)(() => {
    const firstFocusable = activatorContainer.current ? findFirstFocusableNode(activatorContainer.current) : null;
    const accessibilityNode = firstFocusable || activatorContainer.current;
    if (!accessibilityNode)
      return;
    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute("aria-describedby", id);
    accessibilityNode.setAttribute("data-polaris-tooltip-activator", "true");
  }, [id, children]);
  (0, import_react132.useEffect)(() => {
    return () => {
      if (hoverDelayTimeout.current) {
        clearTimeout(hoverDelayTimeout.current);
      }
      if (hoverOutTimeout.current) {
        clearTimeout(hoverOutTimeout.current);
      }
    };
  }, []);
  const handleOpen = (0, import_react132.useCallback)(() => {
    setShouldAnimate(!presenceList.tooltip && !active);
    onOpen?.();
    addPresence("tooltip");
  }, [addPresence, presenceList.tooltip, onOpen, active]);
  const handleClose = (0, import_react132.useCallback)(() => {
    onClose?.();
    setShouldAnimate(false);
    hoverOutTimeout.current = setTimeout(() => {
      removePresence("tooltip");
    }, HOVER_OUT_TIMEOUT);
  }, [removePresence, onClose]);
  const handleKeyUp = (0, import_react132.useCallback)((event) => {
    if (event.key !== "Escape")
      return;
    handleClose?.();
    handleBlur();
    persistOnClick && togglePersisting();
  }, [handleBlur, handleClose, persistOnClick, togglePersisting]);
  (0, import_react132.useEffect)(() => {
    if (originalActive === false && active) {
      handleClose();
      handleBlur();
    }
  }, [originalActive, active, handleClose, handleBlur]);
  const portal2 = activatorNode ? /* @__PURE__ */ import_react132.default.createElement(Portal, {
    idPrefix: "tooltip"
  }, /* @__PURE__ */ import_react132.default.createElement(TooltipOverlay, {
    id,
    preferredPosition,
    activator: activatorNode,
    active,
    accessibilityLabel,
    onClose: noop4,
    preventInteraction: dismissOnMouseOut,
    width: width2,
    padding,
    borderRadius,
    zIndexOverride,
    instant: !shouldAnimate
  }, /* @__PURE__ */ import_react132.default.createElement(Text, {
    as: "span",
    variant: "bodyMd"
  }, content))) : null;
  const wrapperClassNames = classNames(activatorWrapper === "div" && styles42.TooltipContainer, hasUnderline && styles42.HasUnderline);
  return /* @__PURE__ */ import_react132.default.createElement(WrapperComponent, {
    onFocus: () => {
      handleOpen();
      handleFocus();
    },
    onBlur: () => {
      handleClose();
      handleBlur();
      if (persistOnClick) {
        togglePersisting();
      }
    },
    onMouseLeave: handleMouseLeave,
    onMouseOver: handleMouseEnterFix,
    onMouseDown: persistOnClick ? togglePersisting : void 0,
    ref: setActivator,
    onKeyUp: handleKeyUp,
    className: wrapperClassNames
  }, children, portal2);
  function setActivator(node) {
    const activatorContainerRef = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null;
      setActivatorNode(null);
      return;
    }
    node.firstElementChild instanceof HTMLElement && setActivatorNode(node.firstElementChild);
    activatorContainerRef.current = node;
  }
  function handleMouseEnter() {
    mouseEntered.current = true;
    if (hoverDelay && !presenceList.tooltip) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
        handleFocus();
      }, hoverDelay);
    } else {
      handleOpen();
      handleFocus();
    }
  }
  function handleMouseLeave() {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }
    mouseEntered.current = false;
    handleClose();
    if (!persist) {
      handleBlur();
    }
  }
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}
function noop4() {
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
function Item3({
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
  const className = classNames(styles41.Item, disabled && styles41.disabled, destructive && styles41.destructive, active && styles41.active, variant === "default" && styles41.default, variant === "indented" && styles41.indented, variant === "menu" && styles41.menu);
  let prefixMarkup = null;
  if (prefix) {
    prefixMarkup = /* @__PURE__ */ import_react133.default.createElement("span", {
      className: styles41.Prefix
    }, prefix);
  } else if (icon) {
    prefixMarkup = /* @__PURE__ */ import_react133.default.createElement("span", {
      className: styles41.Prefix
    }, /* @__PURE__ */ import_react133.default.createElement(Icon, {
      source: icon
    }));
  } else if (image) {
    prefixMarkup = /* @__PURE__ */ import_react133.default.createElement("span", {
      role: "presentation",
      className: styles41.Prefix,
      style: {
        backgroundImage: `url(${image}`
      }
    });
  }
  let contentText = content || "";
  if (truncate && content) {
    contentText = /* @__PURE__ */ import_react133.default.createElement(TruncateText, null, content);
  } else if (ellipsis) {
    contentText = `${content}\u2026`;
  }
  const contentMarkup = helpText ? /* @__PURE__ */ import_react133.default.createElement(import_react133.default.Fragment, null, /* @__PURE__ */ import_react133.default.createElement(Box, null, contentText), /* @__PURE__ */ import_react133.default.createElement(Text, {
    as: "span",
    variant: "bodySm",
    tone: active || disabled ? void 0 : "subdued"
  }, helpText)) : /* @__PURE__ */ import_react133.default.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? "semibold" : "regular"
  }, contentText);
  const badgeMarkup = badge && /* @__PURE__ */ import_react133.default.createElement("span", {
    className: styles41.Suffix
  }, /* @__PURE__ */ import_react133.default.createElement(Badge, {
    tone: badge.tone
  }, badge.content));
  const suffixMarkup = suffix && /* @__PURE__ */ import_react133.default.createElement(Box, null, /* @__PURE__ */ import_react133.default.createElement("span", {
    className: styles41.Suffix
  }, suffix));
  const textMarkup = /* @__PURE__ */ import_react133.default.createElement("span", {
    className: styles41.Text
  }, /* @__PURE__ */ import_react133.default.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? "semibold" : "regular"
  }, contentMarkup));
  const contentElement = /* @__PURE__ */ import_react133.default.createElement(InlineStack, {
    blockAlign: "center",
    gap: "150",
    wrap: false
  }, prefixMarkup, textMarkup, badgeMarkup, suffixMarkup);
  const contentWrapper = /* @__PURE__ */ import_react133.default.createElement(Box, {
    width: "100%"
  }, contentElement);
  const scrollMarkup = active ? /* @__PURE__ */ import_react133.default.createElement(Scrollable.ScrollTo, null) : null;
  const control = url ? /* @__PURE__ */ import_react133.default.createElement(UnstyledLink, {
    id,
    url: disabled ? null : url,
    className,
    external,
    "aria-label": accessibilityLabel,
    onClick: disabled ? null : onAction,
    role
  }, contentWrapper) : /* @__PURE__ */ import_react133.default.createElement("button", {
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
  return /* @__PURE__ */ import_react133.default.createElement(import_react133.default.Fragment, null, scrollMarkup, control);
}
var TruncateText = ({
  children
}) => {
  const theme = useTheme();
  const textRef = (0, import_react133.useRef)(null);
  const [isOverflowing, setIsOverflowing] = (0, import_react133.useState)(false);
  useIsomorphicLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollWidth > textRef.current.offsetWidth);
    }
  }, [children]);
  const text2 = /* @__PURE__ */ import_react133.default.createElement(Text, {
    as: "span",
    truncate: true
  }, /* @__PURE__ */ import_react133.default.createElement(Box, {
    width: "100%",
    ref: textRef
  }, children));
  return isOverflowing ? /* @__PURE__ */ import_react133.default.createElement(Tooltip, {
    zIndexOverride: Number(theme.zIndex["z-index-11"]),
    preferredPosition: "above",
    hoverDelay: 1e3,
    content: children,
    dismissOnMouseOut: true
  }, /* @__PURE__ */ import_react133.default.createElement(Text, {
    as: "span",
    truncate: true
  }, children)) : text2;
};

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
function Section4({
  section,
  hasMultipleSections,
  isFirst,
  actionRole,
  onActionAnyItem
}) {
  const handleAction = (itemOnAction) => {
    return () => {
      if (itemOnAction) {
        itemOnAction();
      }
      if (onActionAnyItem) {
        onActionAnyItem();
      }
    };
  };
  const actionMarkup = section.items.map(({
    content,
    helpText,
    onAction,
    ...item
  }, index) => {
    const itemMarkup = /* @__PURE__ */ import_react134.default.createElement(Item3, Object.assign({
      content,
      helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item));
    return /* @__PURE__ */ import_react134.default.createElement(Box, {
      as: "li",
      key: `${content}-${index}`,
      role: actionRole === "menuitem" ? "presentation" : void 0
    }, /* @__PURE__ */ import_react134.default.createElement(InlineStack, {
      wrap: false
    }, itemMarkup));
  });
  let titleMarkup = null;
  if (section.title) {
    titleMarkup = typeof section.title === "string" ? /* @__PURE__ */ import_react134.default.createElement(Box, {
      paddingBlockStart: "300",
      paddingBlockEnd: "100",
      paddingInlineStart: "300",
      paddingInlineEnd: "300"
    }, /* @__PURE__ */ import_react134.default.createElement(Text, {
      as: "p",
      variant: "headingSm"
    }, section.title)) : /* @__PURE__ */ import_react134.default.createElement(Box, {
      padding: "200",
      paddingInlineEnd: "150"
    }, section.title);
  }
  let sectionRole;
  switch (actionRole) {
    case "option":
      sectionRole = "presentation";
      break;
    case "menuitem":
      sectionRole = !hasMultipleSections ? "menu" : "presentation";
      break;
    default:
      sectionRole = void 0;
      break;
  }
  const sectionMarkup = /* @__PURE__ */ import_react134.default.createElement(import_react134.default.Fragment, null, titleMarkup, /* @__PURE__ */ import_react134.default.createElement(Box, Object.assign({
    as: "div",
    padding: "150"
  }, hasMultipleSections && {
    paddingBlockStart: "0"
  }, {
    tabIndex: !hasMultipleSections ? -1 : void 0
  }), /* @__PURE__ */ import_react134.default.createElement(BlockStack, Object.assign({
    gap: "050",
    as: "ul"
  }, sectionRole && {
    role: sectionRole
  }), actionMarkup)));
  return hasMultipleSections ? /* @__PURE__ */ import_react134.default.createElement(Box, Object.assign({
    as: "li",
    role: "presentation",
    borderColor: "border-secondary"
  }, !isFirst && {
    borderBlockStartWidth: "025"
  }, !section.title && {
    paddingBlockStart: "150"
  }), sectionMarkup) : sectionMarkup;
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
  const i18n = useI18n();
  const filterActions = (0, import_react135.useContext)(FilterActionsContext);
  let finalSections = [];
  const actionListRef = (0, import_react135.useRef)(null);
  const [searchText, setSearchText] = (0, import_react135.useState)("");
  if (items) {
    finalSections = [{
      items
    }, ...sections];
  } else if (sections) {
    finalSections = sections;
  }
  const isFilterable = finalSections?.some((section) => section.items.some((item) => typeof item.content === "string"));
  const hasMultipleSections = finalSections.length > 1;
  const elementRole = hasMultipleSections && actionRole === "menuitem" ? "menu" : void 0;
  const elementTabIndex = hasMultipleSections && actionRole === "menuitem" ? -1 : void 0;
  const filteredSections = finalSections?.map((section) => ({
    ...section,
    items: section.items.filter(({
      content
    }) => typeof content === "string" ? content?.toLowerCase().includes(searchText.toLowerCase()) : content)
  }));
  const sectionMarkup = filteredSections.map((section, index) => {
    return section.items.length > 0 ? /* @__PURE__ */ import_react135.default.createElement(Section4, {
      key: typeof section.title === "string" ? section.title : index,
      section,
      hasMultipleSections,
      actionRole,
      onActionAnyItem,
      isFirst: index === 0
    }) : null;
  });
  const handleFocusPreviousItem = (evt) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target)) {
        wrapFocusPreviousFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const handleFocusNextItem = (evt) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target)) {
        wrapFocusNextFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const listeners = actionRole === "menuitem" ? /* @__PURE__ */ import_react135.default.createElement(import_react135.default.Fragment, null, /* @__PURE__ */ import_react135.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.DownArrow,
    handler: handleFocusNextItem
  }), /* @__PURE__ */ import_react135.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.UpArrow,
    handler: handleFocusPreviousItem
  })) : null;
  const totalFilteredActions = (0, import_react135.useMemo)(() => {
    const totalSectionItems = filteredSections?.reduce((acc, section) => acc + section.items.length, 0) || 0;
    return totalSectionItems;
  }, [filteredSections]);
  const totalActions = finalSections?.reduce((acc, section) => acc + section.items.length, 0) || 0;
  const hasManyActions = totalActions >= FILTER_ACTIONS_THRESHOLD;
  return /* @__PURE__ */ import_react135.default.createElement(import_react135.default.Fragment, null, (allowFiltering || filterActions) && hasManyActions && isFilterable && /* @__PURE__ */ import_react135.default.createElement(Box, {
    padding: "200",
    paddingBlockEnd: totalFilteredActions > 0 ? "0" : "200"
  }, /* @__PURE__ */ import_react135.default.createElement(TextField, {
    clearButton: true,
    labelHidden: true,
    label: i18n.translate("Polaris.ActionList.SearchField.placeholder"),
    placeholder: i18n.translate("Polaris.ActionList.SearchField.placeholder"),
    autoComplete: "off",
    value: searchText,
    onChange: (value) => setSearchText(value),
    prefix: /* @__PURE__ */ import_react135.default.createElement(Icon, {
      source: SvgSearchIcon
    }),
    onClearButtonClick: () => setSearchText("")
  })), /* @__PURE__ */ import_react135.default.createElement(Box, {
    as: hasMultipleSections ? "ul" : "div",
    ref: actionListRef,
    role: elementRole,
    tabIndex: elementTabIndex
  }, listeners, sectionMarkup));
}
ActionList.Item = Item3;

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
function RollupActions({
  accessibilityLabel,
  items = [],
  sections = []
}) {
  const i18n = useI18n();
  const {
    value: rollupOpen,
    toggle: toggleRollupOpen
  } = useToggle(false);
  if (items.length === 0 && sections.length === 0) {
    return null;
  }
  const activatorMarkup = /* @__PURE__ */ import_react136.default.createElement("div", {
    className: styles38.RollupActivator
  }, /* @__PURE__ */ import_react136.default.createElement(Button, {
    icon: SvgMenuHorizontalIcon,
    accessibilityLabel: accessibilityLabel || i18n.translate("Polaris.ActionMenu.RollupActions.rollupButton"),
    onClick: toggleRollupOpen
  }));
  return /* @__PURE__ */ import_react136.default.createElement(Popover2, {
    active: rollupOpen,
    activator: activatorMarkup,
    preferredAlignment: "right",
    onClose: toggleRollupOpen,
    hideOnPrint: true
  }, /* @__PURE__ */ import_react136.default.createElement(ActionList, {
    items,
    sections,
    onActionAnyItem: toggleRollupOpen
  }));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
var import_react140 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.css.js
var styles44 = {
  "ActionsLayoutOuter": "Polaris-ActionMenu-Actions__ActionsLayoutOuter",
  "ActionsLayout": "Polaris-ActionMenu-Actions__ActionsLayout",
  "ActionsLayout--measuring": "Polaris-ActionMenu-Actions--actionsLayoutMeasuring",
  "ActionsLayoutMeasurer": "Polaris-ActionMenu-Actions__ActionsLayoutMeasurer"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/utilities.js
function getVisibleAndHiddenActionsIndices(actions = [], groups = [], disclosureWidth, actionsWidths, containerWidth) {
  const sumTabWidths = actionsWidths.reduce((sum, width2) => sum + width2, 0);
  const arrayOfActionsIndices = actions.map((_, index) => {
    return index;
  });
  const arrayOfGroupsIndices = groups.map((_, index) => {
    return index;
  });
  const visibleActions = [];
  const hiddenActions = [];
  const visibleGroups = [];
  const hiddenGroups = [];
  if (containerWidth > sumTabWidths) {
    visibleActions.push(...arrayOfActionsIndices);
    visibleGroups.push(...arrayOfGroupsIndices);
  } else {
    let accumulatedWidth = 0;
    arrayOfActionsIndices.forEach((currentActionsIndex) => {
      const currentActionsWidth = actionsWidths[currentActionsIndex];
      if (accumulatedWidth + currentActionsWidth >= containerWidth - disclosureWidth) {
        hiddenActions.push(currentActionsIndex);
        return;
      }
      visibleActions.push(currentActionsIndex);
      accumulatedWidth += currentActionsWidth;
    });
    arrayOfGroupsIndices.forEach((currentGroupsIndex) => {
      const currentActionsWidth = actionsWidths[currentGroupsIndex + actions.length];
      if (accumulatedWidth + currentActionsWidth >= containerWidth - disclosureWidth) {
        hiddenGroups.push(currentGroupsIndex);
        return;
      }
      visibleGroups.push(currentGroupsIndex);
      accumulatedWidth += currentActionsWidth;
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
var import_react138 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.css.js
var styles45 = {
  "Details": "Polaris-ActionMenu-MenuGroup__Details"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.js
var import_react137 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.css.js
var styles46 = {
  "SecondaryAction": "Polaris-ActionMenu-SecondaryAction",
  "critical": "Polaris-ActionMenu-SecondaryAction--critical"
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
  const buttonMarkup = /* @__PURE__ */ import_react137.default.createElement(Button, Object.assign({
    onClick: onAction,
    tone: destructive ? "critical" : void 0
  }, rest), children);
  const actionMarkup = helpText ? /* @__PURE__ */ import_react137.default.createElement(Tooltip, {
    preferredPosition: "below",
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /* @__PURE__ */ import_react137.default.createElement("div", {
    className: classNames(styles46.SecondaryAction, tone === "critical" && styles46.critical)
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
  const handleClose = (0, import_react138.useCallback)(() => {
    onClose(title);
  }, [onClose, title]);
  const handleOpen = (0, import_react138.useCallback)(() => {
    onOpen(title);
  }, [onOpen, title]);
  const handleClick = (0, import_react138.useCallback)(() => {
    if (onClick) {
      onClick(handleOpen);
    } else {
      handleOpen();
    }
  }, [onClick, handleOpen]);
  const popoverActivator = /* @__PURE__ */ import_react138.default.createElement(SecondaryAction, {
    disclosure: true,
    disabled,
    icon,
    accessibilityLabel,
    onClick: handleClick
  }, title);
  return /* @__PURE__ */ import_react138.default.createElement(Popover2, {
    active: Boolean(active),
    activator: popoverActivator,
    preferredAlignment: "left",
    onClose: handleClose,
    hideOnPrint: true
  }, /* @__PURE__ */ import_react138.default.createElement(ActionList, {
    items: actions,
    sections,
    onActionAnyItem: handleClose
  }), details && /* @__PURE__ */ import_react138.default.createElement("div", {
    className: styles45.Details
  }, details));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/components/ActionsMeasurer/ActionsMeasurer.js
var import_react139 = __toESM(require_react());
var ACTION_SPACING = 8;
function ActionsMeasurer({
  actions = [],
  groups = [],
  handleMeasurement: handleMeasurementProp
}) {
  const i18n = useI18n();
  const containerNode = (0, import_react139.useRef)(null);
  const defaultRollupGroup = {
    title: i18n.translate("Polaris.ActionMenu.Actions.moreActions"),
    actions: []
  };
  const activator = /* @__PURE__ */ import_react139.default.createElement(SecondaryAction, {
    disclosure: true
  }, defaultRollupGroup.title);
  const handleMeasurement = (0, import_react139.useCallback)(() => {
    if (!containerNode.current) {
      return;
    }
    const containerWidth = containerNode.current.offsetWidth;
    const hiddenActionNodes = containerNode.current.children;
    const hiddenActionNodesArray = Array.from(hiddenActionNodes);
    const hiddenActionsWidths = hiddenActionNodesArray.map((node) => {
      const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
      return buttonWidth + ACTION_SPACING;
    });
    const disclosureWidth = hiddenActionsWidths.pop() || 0;
    handleMeasurementProp({
      containerWidth,
      disclosureWidth,
      hiddenActionsWidths
    });
  }, [handleMeasurementProp]);
  (0, import_react139.useEffect)(() => {
    handleMeasurement();
  }, [handleMeasurement, actions, groups]);
  const actionsMarkup = actions.map((action) => {
    const {
      content,
      onAction,
      ...rest
    } = action;
    return /* @__PURE__ */ import_react139.default.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  });
  const groupsMarkup = groups.map((group) => {
    const {
      title,
      icon
    } = group;
    return /* @__PURE__ */ import_react139.default.createElement(SecondaryAction, {
      key: title,
      disclosure: true,
      icon
    }, title);
  });
  useEventListener("resize", handleMeasurement);
  return /* @__PURE__ */ import_react139.default.createElement("div", {
    className: styles44.ActionsLayoutMeasurer,
    ref: containerNode
  }, actionsMarkup, groupsMarkup, activator);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
function Actions({
  actions,
  groups,
  onActionRollup
}) {
  const i18n = useI18n();
  const rollupActiveRef = (0, import_react140.useRef)(null);
  const [activeMenuGroup, setActiveMenuGroup] = (0, import_react140.useState)(void 0);
  const [state, setState] = (0, import_react140.useReducer)((data, partialData) => {
    return {
      ...data,
      ...partialData
    };
  }, {
    disclosureWidth: 0,
    containerWidth: Infinity,
    actionsWidths: [],
    visibleActions: [],
    hiddenActions: [],
    visibleGroups: [],
    hiddenGroups: [],
    hasMeasured: false
  });
  const {
    visibleActions,
    hiddenActions,
    visibleGroups,
    hiddenGroups,
    containerWidth,
    disclosureWidth,
    actionsWidths,
    hasMeasured
  } = state;
  const defaultRollupGroup = {
    title: i18n.translate("Polaris.ActionMenu.Actions.moreActions"),
    actions: []
  };
  const handleMenuGroupToggle = (0, import_react140.useCallback)((group) => setActiveMenuGroup(activeMenuGroup ? void 0 : group), [activeMenuGroup]);
  const handleMenuGroupClose = (0, import_react140.useCallback)(() => setActiveMenuGroup(void 0), []);
  (0, import_react140.useEffect)(() => {
    if (containerWidth === 0) {
      return;
    }
    const {
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
      hasMeasured: containerWidth !== Infinity
    });
  }, [containerWidth, disclosureWidth, actions, groups, actionsWidths, setState]);
  const actionsOrDefault = (0, import_react140.useMemo)(() => actions ?? [], [actions]);
  const groupsOrDefault = (0, import_react140.useMemo)(() => groups ?? [], [groups]);
  const actionsMarkup = actionsOrDefault.filter((_, index) => {
    if (!visibleActions.includes(index)) {
      return false;
    }
    return true;
  }).map((action) => {
    const {
      content,
      onAction,
      ...rest
    } = action;
    return /* @__PURE__ */ import_react140.default.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  });
  const groupsToFilter = hiddenGroups.length > 0 || hiddenActions.length > 0 ? [...groupsOrDefault, defaultRollupGroup] : [...groupsOrDefault];
  const filteredGroups = groupsToFilter.filter((group, index) => {
    const hasNoGroupsProp = groupsOrDefault.length === 0;
    const isVisibleGroup = visibleGroups.includes(index);
    const isDefaultGroup = group === defaultRollupGroup;
    if (hasNoGroupsProp) {
      return hiddenActions.length > 0;
    }
    if (isDefaultGroup) {
      return true;
    }
    return isVisibleGroup;
  });
  const hiddenActionObjects = hiddenActions.map((index) => actionsOrDefault[index]).filter((action) => action != null);
  const hiddenGroupObjects = hiddenGroups.map((index) => groupsOrDefault[index]).filter((group) => group != null);
  const groupsMarkup = filteredGroups.map((group) => {
    const {
      title,
      actions: groupActions,
      ...rest
    } = group;
    const isDefaultGroup = group === defaultRollupGroup;
    const allHiddenItems = [...hiddenActionObjects, ...hiddenGroupObjects];
    const [finalRolledUpActions, finalRolledUpSectionGroups] = allHiddenItems.reduce(([actions2, sections], action) => {
      if (isMenuGroup(action)) {
        sections.push({
          title: action.title,
          items: action.actions.map((sectionAction) => ({
            ...sectionAction,
            disabled: action.disabled || sectionAction.disabled
          }))
        });
      } else {
        actions2.push(action);
      }
      return [actions2, sections];
    }, [[], []]);
    if (!isDefaultGroup) {
      return /* @__PURE__ */ import_react140.default.createElement(MenuGroup, Object.assign({
        key: title,
        title,
        active: title === activeMenuGroup,
        actions: groupActions
      }, rest, {
        onOpen: handleMenuGroupToggle,
        onClose: handleMenuGroupClose
      }));
    }
    return /* @__PURE__ */ import_react140.default.createElement(MenuGroup, Object.assign({
      key: title,
      title,
      active: title === activeMenuGroup,
      actions: [...finalRolledUpActions, ...groupActions],
      sections: finalRolledUpSectionGroups
    }, rest, {
      onOpen: handleMenuGroupToggle,
      onClose: handleMenuGroupClose
    }));
  });
  const handleMeasurement = (0, import_react140.useCallback)((measurements) => {
    const {
      hiddenActionsWidths: actionsWidths2,
      containerWidth: containerWidth2,
      disclosureWidth: disclosureWidth2
    } = measurements;
    const {
      visibleActions: visibleActions2,
      hiddenActions: hiddenActions2,
      visibleGroups: visibleGroups2,
      hiddenGroups: hiddenGroups2
    } = getVisibleAndHiddenActionsIndices(actionsOrDefault, groupsOrDefault, disclosureWidth2, actionsWidths2, containerWidth2);
    if (onActionRollup) {
      const isRollupActive = hiddenActions2.length > 0 || hiddenGroups2.length > 0;
      if (rollupActiveRef.current !== isRollupActive) {
        onActionRollup(isRollupActive);
        rollupActiveRef.current = isRollupActive;
      }
    }
    setState({
      visibleActions: visibleActions2,
      hiddenActions: hiddenActions2,
      visibleGroups: visibleGroups2,
      hiddenGroups: hiddenGroups2,
      actionsWidths: actionsWidths2,
      containerWidth: containerWidth2,
      disclosureWidth: disclosureWidth2,
      hasMeasured: true
    });
  }, [actionsOrDefault, groupsOrDefault, onActionRollup]);
  const actionsMeasurer = /* @__PURE__ */ import_react140.default.createElement(ActionsMeasurer, {
    actions,
    groups,
    handleMeasurement
  });
  return /* @__PURE__ */ import_react140.default.createElement("div", {
    className: styles44.ActionsLayoutOuter
  }, actionsMeasurer, /* @__PURE__ */ import_react140.default.createElement("div", {
    className: classNames(styles44.ActionsLayout, !hasMeasured && styles44["ActionsLayout--measuring"])
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
  if (actions.length === 0 && groups.length === 0) {
    return null;
  }
  const actionMenuClassNames = classNames(styles37.ActionMenu, rollup && styles37.rollup);
  const rollupSections = groups.map((group) => convertGroupToSection(group));
  return /* @__PURE__ */ import_react141.default.createElement("div", {
    className: actionMenuClassNames
  }, rollup ? /* @__PURE__ */ import_react141.default.createElement(RollupActions, {
    accessibilityLabel: rollupActionsLabel,
    items: actions,
    sections: rollupSections
  }) : /* @__PURE__ */ import_react141.default.createElement(Actions, {
    actions,
    groups,
    onActionRollup
  }));
}
function hasGroupsWithActions(groups = []) {
  return groups.length === 0 ? false : groups.some((group) => group.actions.length > 0);
}
function convertGroupToSection({
  title,
  actions,
  disabled
}) {
  return {
    title,
    items: actions.map((action) => ({
      ...action,
      disabled: disabled || action.disabled
    }))
  };
}

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.js
var import_react144 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/is-input-focused.js
var EditableTarget;
(function(EditableTarget2) {
  EditableTarget2["Input"] = "INPUT";
  EditableTarget2["Textarea"] = "TEXTAREA";
  EditableTarget2["Select"] = "SELECT";
  EditableTarget2["ContentEditable"] = "contenteditable";
})(EditableTarget || (EditableTarget = {}));
function isInputFocused() {
  if (document == null || document.activeElement == null) {
    return false;
  }
  const {
    tagName
  } = document.activeElement;
  return tagName === EditableTarget.Input || tagName === EditableTarget.Textarea || tagName === EditableTarget.Select || document.activeElement.hasAttribute(EditableTarget.ContentEditable);
}

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.css.js
var styles47 = {
  "Pagination": "Polaris-Pagination",
  "table": "Polaris-Pagination--table",
  "TablePaginationActions": "Polaris-Pagination__TablePaginationActions"
};

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.js
var import_react143 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.css.js
var styles48 = {
  "ButtonGroup": "Polaris-ButtonGroup",
  "Item": "Polaris-ButtonGroup__Item",
  "Item-plain": "Polaris-ButtonGroup__Item--plain",
  "variantSegmented": "Polaris-ButtonGroup--variantSegmented",
  "Item-focused": "Polaris-ButtonGroup__Item--focused",
  "fullWidth": "Polaris-ButtonGroup--fullWidth",
  "extraTight": "Polaris-ButtonGroup--extraTight",
  "tight": "Polaris-ButtonGroup--tight",
  "loose": "Polaris-ButtonGroup--loose",
  "noWrap": "Polaris-ButtonGroup--noWrap"
};

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/components/Item/Item.js
var import_react142 = __toESM(require_react());
function Item4({
  button
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(false);
  const className = classNames(styles48.Item, focused && styles48["Item-focused"], button.props.variant === "plain" && styles48["Item-plain"]);
  return /* @__PURE__ */ import_react142.default.createElement("div", {
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
  const className = classNames(styles48.ButtonGroup, gap && styles48[gap], variant && styles48[variationName("variant", variant)], fullWidth && styles48.fullWidth, noWrap && styles48.noWrap);
  const contents = elementChildren(children).map((child, index) => /* @__PURE__ */ import_react143.default.createElement(Item4, {
    button: child,
    key: index
  }));
  return /* @__PURE__ */ import_react143.default.createElement("div", {
    className,
    "data-buttongroup-variant": variant,
    "data-buttongroup-connected-top": connectedTop,
    "data-buttongroup-full-width": fullWidth,
    "data-buttongroup-no-wrap": noWrap
  }, contents);
}

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
  const i18n = useI18n();
  const node = /* @__PURE__ */ (0, import_react144.createRef)();
  const navLabel = accessibilityLabel || i18n.translate("Polaris.Pagination.pagination");
  const previousLabel = accessibilityLabels?.previous || i18n.translate("Polaris.Pagination.previous");
  const nextLabel = accessibilityLabels?.next || i18n.translate("Polaris.Pagination.next");
  const prev = /* @__PURE__ */ import_react144.default.createElement(Button, {
    icon: SvgChevronLeftIcon,
    accessibilityLabel: previousLabel,
    url: previousURL,
    onClick: onPrevious,
    disabled: !hasPrevious,
    id: "previousURL"
  });
  const constructedPrevious = previousTooltip && hasPrevious ? /* @__PURE__ */ import_react144.default.createElement(Tooltip, {
    activatorWrapper: "span",
    content: previousTooltip,
    preferredPosition: "below"
  }, prev) : prev;
  const next = /* @__PURE__ */ import_react144.default.createElement(Button, {
    icon: SvgChevronRightIcon,
    accessibilityLabel: nextLabel,
    url: nextURL,
    onClick: onNext,
    disabled: !hasNext,
    id: "nextURL"
  });
  const constructedNext = nextTooltip && hasNext ? /* @__PURE__ */ import_react144.default.createElement(Tooltip, {
    activatorWrapper: "span",
    content: nextTooltip,
    preferredPosition: "below"
  }, next) : next;
  const previousHandler = onPrevious || noop5;
  const previousButtonEvents = previousKeys && (previousURL || onPrevious) && hasPrevious && previousKeys.map((key) => /* @__PURE__ */ import_react144.default.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: previousURL ? handleCallback(clickPaginationLink("previousURL", node)) : handleCallback(previousHandler)
  }));
  const nextHandler = onNext || noop5;
  const nextButtonEvents = nextKeys && (nextURL || onNext) && hasNext && nextKeys.map((key) => /* @__PURE__ */ import_react144.default.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: nextURL ? handleCallback(clickPaginationLink("nextURL", node)) : handleCallback(nextHandler)
  }));
  if (type === "table") {
    const labelMarkup2 = label ? /* @__PURE__ */ import_react144.default.createElement(Box, {
      padding: "300",
      paddingBlockStart: "0",
      paddingBlockEnd: "0"
    }, /* @__PURE__ */ import_react144.default.createElement(Text, {
      as: "span",
      variant: "bodySm",
      fontWeight: "medium"
    }, label)) : null;
    return /* @__PURE__ */ import_react144.default.createElement("nav", {
      "aria-label": navLabel,
      ref: node,
      className: classNames(styles47.Pagination, styles47.table)
    }, previousButtonEvents, nextButtonEvents, /* @__PURE__ */ import_react144.default.createElement(Box, {
      background: "bg-surface-secondary",
      paddingBlockStart: "150",
      paddingBlockEnd: "150",
      paddingInlineStart: "300",
      paddingInlineEnd: "200"
    }, /* @__PURE__ */ import_react144.default.createElement(InlineStack, {
      align: "center",
      blockAlign: "center"
    }, /* @__PURE__ */ import_react144.default.createElement("div", {
      className: styles47.TablePaginationActions,
      "data-buttongroup-variant": "segmented"
    }, /* @__PURE__ */ import_react144.default.createElement("div", null, constructedPrevious), labelMarkup2, /* @__PURE__ */ import_react144.default.createElement("div", null, constructedNext)))));
  }
  const labelTextMarkup = hasNext && hasPrevious ? /* @__PURE__ */ import_react144.default.createElement("span", null, label) : /* @__PURE__ */ import_react144.default.createElement(Text, {
    tone: "subdued",
    as: "span"
  }, label);
  const labelMarkup = label ? /* @__PURE__ */ import_react144.default.createElement(Box, {
    padding: "300",
    paddingBlockStart: "0",
    paddingBlockEnd: "0"
  }, /* @__PURE__ */ import_react144.default.createElement("div", {
    "aria-live": "polite"
  }, labelTextMarkup)) : null;
  return /* @__PURE__ */ import_react144.default.createElement("nav", {
    "aria-label": navLabel,
    ref: node,
    className: styles47.Pagination
  }, previousButtonEvents, nextButtonEvents, /* @__PURE__ */ import_react144.default.createElement(ButtonGroup, {
    variant: "segmented"
  }, constructedPrevious, labelMarkup, constructedNext));
}
function clickPaginationLink(id, node) {
  return () => {
    if (node.current == null) {
      return;
    }
    const link = node.current.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}
function handleCallback(fn) {
  return () => {
    if (isInputFocused()) {
      return;
    }
    fn();
  };
}
function noop5() {
}

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
var SHORT_TITLE = 20;
var REALLY_SHORT_TITLE = 8;
var LONG_TITLE = 34;
function Header2({
  title,
  subtitle,
  pageReadyAccessibilityLabel,
  titleMetadata,
  additionalMetadata,
  titleHidden = false,
  primaryAction,
  pagination,
  filterActions,
  backAction,
  secondaryActions = [],
  actionGroups = [],
  compactTitle = false,
  onActionRollup
}) {
  const i18n = useI18n();
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  const isSingleRow = !primaryAction && !pagination && (isInterface(secondaryActions) && !secondaryActions.length || isReactElement(secondaryActions)) && !actionGroups.length;
  const hasActionGroupsOrSecondaryActions = actionGroups.length > 0 || isInterface(secondaryActions) && secondaryActions.length > 0 || isReactElement(secondaryActions);
  const breadcrumbMarkup = backAction ? /* @__PURE__ */ import_react145.default.createElement("div", {
    className: styles34.BreadcrumbWrapper
  }, /* @__PURE__ */ import_react145.default.createElement(Box, {
    maxWidth: "100%",
    paddingInlineEnd: "100",
    printHidden: true
  }, /* @__PURE__ */ import_react145.default.createElement(Breadcrumbs, {
    backAction
  }))) : null;
  const paginationMarkup = pagination && !isNavigationCollapsed ? /* @__PURE__ */ import_react145.default.createElement("div", {
    className: styles34.PaginationWrapper
  }, /* @__PURE__ */ import_react145.default.createElement(Box, {
    printHidden: true
  }, /* @__PURE__ */ import_react145.default.createElement(Pagination, Object.assign({}, pagination, {
    hasPrevious: pagination.hasPrevious,
    hasNext: pagination.hasNext
  })))) : null;
  const pageTitleMarkup = /* @__PURE__ */ import_react145.default.createElement("div", {
    className: classNames(styles34.TitleWrapper, !hasActionGroupsOrSecondaryActions && styles34.TitleWrapperExpand)
  }, /* @__PURE__ */ import_react145.default.createElement(Title, {
    title,
    subtitle,
    titleMetadata,
    compactTitle,
    hasSubtitleMaxWidth: hasActionGroupsOrSecondaryActions
  }));
  const labelForPageReadyAccessibilityLabel = pageReadyAccessibilityLabel || title;
  const pageReadyAccessibilityLabelMarkup = labelForPageReadyAccessibilityLabel ? /* @__PURE__ */ import_react145.default.createElement("div", {
    role: "status"
  }, /* @__PURE__ */ import_react145.default.createElement(Text, {
    visuallyHidden: true,
    as: "p"
  }, i18n.translate("Polaris.Page.Header.pageReadyAccessibilityLabel", {
    title: labelForPageReadyAccessibilityLabel
  }))) : void 0;
  const primaryActionMarkup = primaryAction ? /* @__PURE__ */ import_react145.default.createElement(PrimaryActionMarkup, {
    primaryAction
  }) : null;
  let actionMenuMarkup = null;
  if (isInterface(secondaryActions) && (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups))) {
    actionMenuMarkup = /* @__PURE__ */ import_react145.default.createElement(ActionMenu, {
      actions: secondaryActions,
      groups: actionGroups,
      rollup: isNavigationCollapsed,
      rollupActionsLabel: title ? i18n.translate("Polaris.Page.Header.rollupActionsLabel", {
        title
      }) : void 0,
      onActionRollup
    });
  } else if (isReactElement(secondaryActions)) {
    actionMenuMarkup = /* @__PURE__ */ import_react145.default.createElement(import_react145.default.Fragment, null, secondaryActions);
  }
  const navigationMarkup = breadcrumbMarkup || paginationMarkup ? /* @__PURE__ */ import_react145.default.createElement(Box, {
    printHidden: true,
    paddingBlockEnd: "100",
    paddingInlineEnd: actionMenuMarkup && isNavigationCollapsed ? "1000" : void 0
  }, /* @__PURE__ */ import_react145.default.createElement(InlineStack, {
    gap: "400",
    align: "space-between",
    blockAlign: "center"
  }, breadcrumbMarkup, paginationMarkup)) : null;
  const additionalMetadataMarkup = additionalMetadata ? /* @__PURE__ */ import_react145.default.createElement("div", {
    className: styles34.AdditionalMetaData
  }, /* @__PURE__ */ import_react145.default.createElement(Text, {
    tone: "subdued",
    as: "span",
    variant: "bodySm"
  }, additionalMetadata)) : null;
  const headerClassNames = classNames(isSingleRow && styles34.isSingleRow, navigationMarkup && styles34.hasNavigation, actionMenuMarkup && styles34.hasActionMenu, isNavigationCollapsed && styles34.mobileView, !backAction && styles34.noBreadcrumbs, title && title.length < LONG_TITLE && styles34.mediumTitle, title && title.length > LONG_TITLE && styles34.longTitle);
  const {
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
  return /* @__PURE__ */ import_react145.default.createElement(Box, {
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
  }, pageReadyAccessibilityLabelMarkup, /* @__PURE__ */ import_react145.default.createElement("div", {
    className: headerClassNames
  }, /* @__PURE__ */ import_react145.default.createElement(FilterActionsProvider, {
    filterActions: Boolean(filterActions)
  }, /* @__PURE__ */ import_react145.default.createElement(ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /* @__PURE__ */ import_react145.default.createElement("div", {
    className: styles34.Row
  }, slot1, slot2, /* @__PURE__ */ import_react145.default.createElement(ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /* @__PURE__ */ import_react145.default.createElement("div", {
    className: styles34.RightAlign
  }, /* @__PURE__ */ import_react145.default.createElement(ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: (children) => /* @__PURE__ */ import_react145.default.createElement("div", {
      className: styles34.Actions
    }, children)
  }, slot3, slot4))))), /* @__PURE__ */ import_react145.default.createElement(ConditionalRender, {
    condition: [slot5].some(notNull)
  }, /* @__PURE__ */ import_react145.default.createElement("div", {
    className: styles34.Row
  }, /* @__PURE__ */ import_react145.default.createElement(InlineStack, {
    gap: "400"
  }, slot5))))));
}
function PrimaryActionMarkup({
  primaryAction
}) {
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  let actionMarkup;
  if (isInterface(primaryAction)) {
    const {
      primary: isPrimary,
      helpText
    } = primaryAction;
    const primary = isPrimary === void 0 ? true : isPrimary;
    const content = buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      variant: primary ? "primary" : void 0
    });
    actionMarkup = helpText ? /* @__PURE__ */ import_react145.default.createElement(Tooltip, {
      content: helpText
    }, content) : content;
  } else {
    actionMarkup = primaryAction;
  }
  return /* @__PURE__ */ import_react145.default.createElement("div", {
    className: styles34.PrimaryActionWrapper
  }, /* @__PURE__ */ import_react145.default.createElement(Box, {
    printHidden: true
  }, actionMarkup));
}
function shouldShowIconOnly(isMobile, action) {
  let {
    content,
    accessibilityLabel
  } = action;
  const {
    icon
  } = action;
  if (icon == null)
    return {
      ...action,
      icon: void 0
    };
  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = void 0;
  }
  return {
    ...action,
    content,
    accessibilityLabel,
    icon
  };
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
  const layouts = {
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
        slot3: /* @__PURE__ */ import_react145.default.createElement(import_react145.default.Fragment, null, actionMenuMarkup, primaryActionMarkup),
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup
      },
      condition: !isNavigationCollapsed
    }
  };
  const layout = Object.values(layouts).find((layout2) => layout2.condition) || layouts.desktopDefault;
  return layout.slots;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
function Page({
  children,
  fullWidth,
  narrowWidth,
  ...rest
}) {
  const pageClassName = classNames(styles33.Page, fullWidth && styles33.fullWidth, narrowWidth && styles33.narrowWidth);
  const hasHeaderContent = rest.title != null && rest.title !== "" || rest.subtitle != null && rest.subtitle !== "" || rest.primaryAction != null || rest.secondaryActions != null && (isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0 || isReactElement(rest.secondaryActions)) || rest.actionGroups != null && rest.actionGroups.length > 0 || rest.backAction != null;
  const contentClassName = classNames(!hasHeaderContent && styles33.Content);
  const headerMarkup = hasHeaderContent ? /* @__PURE__ */ import_react146.default.createElement(Header2, Object.assign({
    filterActions: true
  }, rest)) : null;
  return /* @__PURE__ */ import_react146.default.createElement("div", {
    className: pageClassName
  }, headerMarkup, /* @__PURE__ */ import_react146.default.createElement("div", {
    className: contentClassName
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/ProgressBar/ProgressBar.js
var import_react147 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ProgressBar/ProgressBar.css.js
var styles49 = {
  "ProgressBar": "Polaris-ProgressBar",
  "sizeSmall": "Polaris-ProgressBar--sizeSmall",
  "sizeMedium": "Polaris-ProgressBar--sizeMedium",
  "sizeLarge": "Polaris-ProgressBar--sizeLarge",
  "toneHighlight": "Polaris-ProgressBar--toneHighlight",
  "tonePrimary": "Polaris-ProgressBar--tonePrimary",
  "toneSuccess": "Polaris-ProgressBar--toneSuccess",
  "toneCritical": "Polaris-ProgressBar--toneCritical",
  "Indicator": "Polaris-ProgressBar__Indicator",
  "IndicatorAppearActive": "Polaris-ProgressBar__IndicatorAppearActive",
  "IndicatorAppearDone": "Polaris-ProgressBar__IndicatorAppearDone",
  "Progress": "Polaris-ProgressBar__Progress",
  "Label": "Polaris-ProgressBar__Label"
};

// node_modules/@shopify/polaris/build/esm/components/ProgressBar/ProgressBar.js
function ProgressBar({
  progress = 0,
  size: size2 = "medium",
  tone = "highlight",
  animated: hasAppearAnimation = true,
  ariaLabelledBy
}) {
  const theme = useTheme();
  const i18n = useI18n();
  const indicatorRef = (0, import_react147.useRef)(null);
  const className = classNames(styles49.ProgressBar, size2 && styles49[variationName("size", size2)], tone && styles49[variationName("tone", tone)]);
  const warningMessage = i18n.translate(progress < 0 ? "Polaris.ProgressBar.negativeWarningMessage" : "Polaris.ProgressBar.exceedWarningMessage", {
    progress
  });
  const parsedProgress = parseProgress(progress, warningMessage);
  const progressBarDuration = hasAppearAnimation ? theme.motion["motion-duration-500"] : theme.motion["motion-duration-0"];
  return /* @__PURE__ */ import_react147.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react147.default.createElement("progress", {
    "aria-labelledby": ariaLabelledBy,
    className: styles49.Progress,
    value: parsedProgress,
    max: "100"
  }), /* @__PURE__ */ import_react147.default.createElement(CSSTransition_default, {
    in: true,
    appear: true,
    timeout: parseInt(progressBarDuration, 10),
    nodeRef: indicatorRef,
    classNames: {
      appearActive: styles49.IndicatorAppearActive,
      appearDone: styles49.IndicatorAppearDone
    }
  }, /* @__PURE__ */ import_react147.default.createElement("div", {
    ref: indicatorRef,
    className: styles49.Indicator,
    style: {
      "--pc-progress-bar-duration": progressBarDuration,
      "--pc-progress-bar-percent": parsedProgress / 100
    }
  }, /* @__PURE__ */ import_react147.default.createElement("span", {
    className: styles49.Label
  }, parsedProgress, "%"))));
}
function parseProgress(progress, warningMessage) {
  let progressWidth;
  if (progress < 0) {
    if (true) {
      console.warn(warningMessage);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (true) {
      console.warn(warningMessage);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}

// node_modules/@shopify/polaris/build/esm/components/Select/Select.js
var import_react148 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Select/Select.css.js
var styles50 = {
  "Select": "Polaris-Select",
  "disabled": "Polaris-Select--disabled",
  "error": "Polaris-Select--error",
  "Backdrop": "Polaris-Select__Backdrop",
  "Input": "Polaris-Select__Input",
  "Content": "Polaris-Select__Content",
  "InlineLabel": "Polaris-Select__InlineLabel",
  "Icon": "Polaris-Select__Icon",
  "SelectedOption": "Polaris-Select__SelectedOption",
  "Prefix": "Polaris-Select__Prefix",
  "hover": "Polaris-Select--hover",
  "toneMagic": "Polaris-Select--toneMagic"
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
  const {
    value: focused,
    toggle: toggleFocused
  } = useToggle(false);
  const uniqId = (0, import_react148.useId)();
  const id = idProp ?? uniqId;
  const labelHidden = labelInline ? true : labelHiddenProp;
  const className = classNames(styles50.Select, error && styles50.error, tone && styles50[variationName("tone", tone)], disabled && styles50.disabled);
  const handleFocus = (0, import_react148.useCallback)((event) => {
    toggleFocused();
    onFocus?.(event);
  }, [onFocus, toggleFocused]);
  const handleBlur = (0, import_react148.useCallback)((event) => {
    toggleFocused();
    onBlur?.(event);
  }, [onBlur, toggleFocused]);
  const handleChange = onChange ? (event) => onChange(event.currentTarget.value, id) : void 0;
  const describedBy = [];
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (error) {
    describedBy.push(`${id}Error`);
  }
  const options = optionsProp || [];
  let normalizedOptions = options.map(normalizeOption);
  if (placeholder) {
    normalizedOptions = [{
      label: placeholder,
      value: PLACEHOLDER_VALUE,
      disabled: true
    }, ...normalizedOptions];
  }
  const inlineLabelMarkup = labelInline && /* @__PURE__ */ import_react148.default.createElement(Box, {
    paddingInlineEnd: "100"
  }, /* @__PURE__ */ import_react148.default.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    tone: tone && tone === "magic" && !focused ? "magic-subdued" : "subdued",
    truncate: true
  }, label));
  const selectedOption = getSelectedOption(normalizedOptions, value);
  const prefixMarkup = selectedOption.prefix && /* @__PURE__ */ import_react148.default.createElement("div", {
    className: styles50.Prefix
  }, selectedOption.prefix);
  const contentMarkup = /* @__PURE__ */ import_react148.default.createElement("div", {
    className: styles50.Content,
    "aria-hidden": true,
    "aria-disabled": disabled
  }, inlineLabelMarkup, prefixMarkup, /* @__PURE__ */ import_react148.default.createElement("span", {
    className: styles50.SelectedOption
  }, selectedOption.label), /* @__PURE__ */ import_react148.default.createElement("span", {
    className: styles50.Icon
  }, /* @__PURE__ */ import_react148.default.createElement(Icon, {
    source: SvgSelectIcon
  })));
  const optionsMarkup = normalizedOptions.map(renderOption);
  return /* @__PURE__ */ import_react148.default.createElement(Labelled, {
    id,
    label,
    error,
    action: labelAction,
    labelHidden,
    helpText,
    requiredIndicator,
    disabled
  }, /* @__PURE__ */ import_react148.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react148.default.createElement("select", {
    id,
    name,
    value,
    className: styles50.Input,
    disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy.length ? describedBy.join(" ") : void 0,
    "aria-required": requiredIndicator
  }, optionsMarkup), contentMarkup, /* @__PURE__ */ import_react148.default.createElement("div", {
    className: styles50.Backdrop
  })));
}
function isString(option) {
  return typeof option === "string";
}
function isGroup(option) {
  return typeof option === "object" && "options" in option && option.options != null;
}
function normalizeStringOption(option) {
  return {
    label: option,
    value: option
  };
}
function normalizeOption(option) {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const {
      title,
      options
    } = option;
    return {
      title,
      options: options.map((option2) => {
        return isString(option2) ? normalizeStringOption(option2) : option2;
      })
    };
  }
  return option;
}
function getSelectedOption(options, value) {
  const flatOptions = flattenOptions(options);
  let selectedOption = flatOptions.find((option) => value === option.value);
  if (selectedOption === void 0) {
    selectedOption = flatOptions.find((option) => !option.hidden);
  }
  return selectedOption || {
    value: "",
    label: ""
  };
}
function flattenOptions(options) {
  let flatOptions = [];
  options.forEach((optionOrGroup) => {
    if (isGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(optionOrGroup.options);
    } else {
      flatOptions.push(optionOrGroup);
    }
  });
  return flatOptions;
}
function renderSingleOption(option) {
  const {
    value,
    label,
    prefix: _prefix,
    key,
    ...rest
  } = option;
  return /* @__PURE__ */ import_react148.default.createElement("option", Object.assign({
    key: key ?? value,
    value
  }, rest), label);
}
function renderOption(optionOrGroup) {
  if (isGroup(optionOrGroup)) {
    const {
      title,
      options
    } = optionOrGroup;
    return /* @__PURE__ */ import_react148.default.createElement("optgroup", {
      label: title,
      key: title
    }, options.map(renderSingleOption));
  }
  return renderSingleOption(optionOrGroup);
}

// node_modules/@shopify/polaris/build/esm/components/Toast/Toast.js
var import_react149 = __toESM(require_react());
var Toast2 = /* @__PURE__ */ (0, import_react149.memo)(function Toast3(props) {
  const id = (0, import_react149.useId)();
  const {
    showToast,
    hideToast
  } = useFrame();
  useDeepEffect(() => {
    showToast({
      id,
      ...props
    });
    return () => {
      hideToast({
        id
      });
    };
  }, [props]);
  return null;
});

// node_modules/@shopify/polaris/build/esm/components/DataTable/DataTable.js
var import_react155 = __toESM(require_react());
var import_react_fast_compare2 = __toESM(require_react_fast_compare());

// node_modules/@shopify/polaris/build/esm/components/DataTable/utilities.js
function measureColumn(tableData) {
  return function(column, index) {
    const {
      firstVisibleColumnIndex,
      tableLeftVisibleEdge: tableStart,
      tableRightVisibleEdge: tableEnd
    } = tableData;
    const leftEdge = column.offsetLeft;
    const rightEdge = leftEdge + column.offsetWidth;
    const isVisibleLeft = isEdgeVisible(leftEdge, tableStart, tableEnd, "left");
    const isVisibleRight = isEdgeVisible(rightEdge, tableStart, tableEnd, "right");
    const isVisible = isVisibleLeft || isVisibleRight;
    const width2 = column.offsetWidth;
    if (isVisible) {
      tableData.firstVisibleColumnIndex = Math.min(firstVisibleColumnIndex, index);
    }
    return {
      leftEdge,
      rightEdge,
      isVisible,
      width: width2,
      index
    };
  };
}
function isEdgeVisible(position, start, end, edgeType) {
  const minVisiblePixels = 30;
  return position >= start + (edgeType === "left" ? 0 : minVisiblePixels) && position <= end - minVisiblePixels;
}
function getPrevAndCurrentColumns(tableData, columnData) {
  const {
    firstVisibleColumnIndex
  } = tableData;
  const previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0);
  const previousColumn = columnData[previousColumnIndex];
  const currentColumn = columnData[firstVisibleColumnIndex];
  return {
    previousColumn,
    currentColumn
  };
}

// node_modules/@shopify/polaris/build/esm/components/DataTable/DataTable.css.js
var styles51 = {
  "DataTable": "Polaris-DataTable",
  "condensed": "Polaris-DataTable--condensed",
  "Navigation": "Polaris-DataTable__Navigation",
  "Pip": "Polaris-DataTable__Pip",
  "Pip-visible": "Polaris-DataTable__Pip--visible",
  "ScrollContainer": "Polaris-DataTable__ScrollContainer",
  "Table": "Polaris-DataTable__Table",
  "TableRow": "Polaris-DataTable__TableRow",
  "Cell": "Polaris-DataTable__Cell",
  "IncreasedTableDensity": "Polaris-DataTable__IncreasedTableDensity",
  "ZebraStripingOnData": "Polaris-DataTable__ZebraStripingOnData",
  "RowCountIsEven": "Polaris-DataTable__RowCountIsEven",
  "ShowTotalsInFooter": "Polaris-DataTable__ShowTotalsInFooter",
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
  "hoverable": "Polaris-DataTable--hoverable",
  "Cell-hovered": "Polaris-DataTable__Cell--hovered",
  "Icon": "Polaris-DataTable__Icon",
  "Heading": "Polaris-DataTable__Heading",
  "StickyHeaderEnabled": "Polaris-DataTable__StickyHeaderEnabled",
  "StickyHeaderWrapper": "Polaris-DataTable__StickyHeaderWrapper",
  "Cell-sorted": "Polaris-DataTable__Cell--sorted",
  "Cell-total": "Polaris-DataTable__Cell--total",
  "ShowTotals": "Polaris-DataTable__ShowTotals",
  "Cell-total-footer": "Polaris-DataTable--cellTotalFooter",
  "Footer": "Polaris-DataTable__Footer",
  "StickyHeaderInner": "Polaris-DataTable__StickyHeaderInner",
  "StickyHeaderInner-isSticky": "Polaris-DataTable__StickyHeaderInner--isSticky",
  "StickyHeaderTable": "Polaris-DataTable__StickyHeaderTable",
  "FixedFirstColumn": "Polaris-DataTable__FixedFirstColumn",
  "StickyTableHeadingsRow": "Polaris-DataTable__StickyTableHeadingsRow",
  "TooltipContent": "Polaris-DataTable__TooltipContent"
};

// node_modules/@shopify/polaris/build/esm/components/DataTable/components/Cell/Cell.js
var import_react150 = __toESM(require_react());
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
  stickyHeadingCell = false,
  stickyCellWidth,
  hovered = false,
  handleFocus = () => {
  },
  hasFixedNthColumn = false,
  fixedCellVisible = false,
  firstColumnMinWidth,
  style,
  lastFixedFirstColumn
}) {
  const i18n = useI18n();
  const numeric = contentType === "numeric";
  const className = classNames(styles51.Cell, styles51[`Cell-${variationName("verticalAlign", verticalAlign)}`], firstColumn && styles51["Cell-firstColumn"], truncate && styles51["Cell-truncated"], header && styles51["Cell-header"], total && styles51["Cell-total"], totalInFooter && styles51["Cell-total-footer"], numeric && styles51["Cell-numeric"], sortable && styles51["Cell-sortable"], sorted && styles51["Cell-sorted"], stickyHeadingCell && styles51.StickyHeaderCell, hovered && styles51["Cell-hovered"], lastFixedFirstColumn && inFixedNthColumn && fixedCellVisible && styles51["Cell-separate"], nthColumn && inFixedNthColumn && stickyHeadingCell && styles51.FixedFirstColumn);
  const headerClassName = classNames(header && styles51.Heading, header && contentType === "text" && styles51["Heading-left"]);
  const iconClassName = classNames(sortable && styles51.Icon);
  const direction = sorted && sortDirection ? sortDirection : defaultSortDirection;
  const source = direction === "descending" ? SvgSortDescendingIcon : SvgSortAscendingIcon;
  const oppositeDirection = sortDirection === "ascending" ? "descending" : "ascending";
  const sortAccessibilityLabel = i18n.translate("Polaris.DataTable.sortAccessibilityLabel", {
    direction: sorted ? oppositeDirection : direction
  });
  const iconMarkup = /* @__PURE__ */ import_react150.default.createElement("span", {
    className: iconClassName
  }, /* @__PURE__ */ import_react150.default.createElement(Icon, {
    source,
    accessibilityLabel: sortAccessibilityLabel
  }));
  const focusable = !(stickyHeadingCell && hasFixedNthColumn && nthColumn && !inFixedNthColumn);
  const sortableHeadingContent = /* @__PURE__ */ import_react150.default.createElement("button", {
    className: headerClassName,
    onClick: onSort,
    onFocus: handleFocus,
    tabIndex: focusable ? 0 : -1
  }, iconMarkup, content);
  const columnHeadingContent = sortable ? sortableHeadingContent : content;
  const colSpanProp = colSpan && colSpan > 1 ? {
    colSpan
  } : {};
  const minWidthStyles = nthColumn && firstColumnMinWidth ? {
    minWidth: firstColumnMinWidth
  } : {
    minWidth: stickyCellWidth
  };
  const stickyHeading = /* @__PURE__ */ import_react150.default.createElement("th", Object.assign({
    ref: setRef
  }, headerCell.props, colSpanProp, {
    className,
    "aria-sort": sortDirection,
    style: {
      ...style,
      ...minWidthStyles
    },
    "data-index-table-sticky-heading": true
  }), columnHeadingContent);
  const headingMarkup = header ? /* @__PURE__ */ import_react150.default.createElement("th", Object.assign({}, headerCell.props, {
    "aria-sort": sortDirection
  }, colSpanProp, {
    ref: setRef,
    className,
    scope: "col",
    style: {
      ...minWidthStyles
    }
  }), columnHeadingContent) : /* @__PURE__ */ import_react150.default.createElement("th", Object.assign({}, colSpanProp, {
    ref: setRef,
    className,
    scope: "row",
    style: {
      ...minWidthStyles
    }
  }), truncate ? /* @__PURE__ */ import_react150.default.createElement(TruncatedText, {
    className: styles51.TooltipContent
  }, content) : content);
  const cellMarkup = header || firstColumn || nthColumn ? headingMarkup : /* @__PURE__ */ import_react150.default.createElement("td", Object.assign({
    className
  }, colSpanProp), content);
  return stickyHeadingCell ? stickyHeading : cellMarkup;
}
var TruncatedText = ({
  children,
  className = ""
}) => {
  const textRef = (0, import_react150.useRef)(null);
  const {
    current
  } = textRef;
  const text2 = /* @__PURE__ */ import_react150.default.createElement("span", {
    ref: textRef,
    className
  }, children);
  return current?.scrollWidth > current?.offsetWidth ? /* @__PURE__ */ import_react150.default.createElement(Tooltip, {
    content: textRef.current.innerText
  }, text2) : text2;
};

// node_modules/@shopify/polaris/build/esm/components/AfterInitialMount/AfterInitialMount.js
var import_react151 = __toESM(require_react());
function AfterInitialMount({
  children,
  onMount,
  fallback = null
}) {
  const isMounted = useIsAfterInitialMount();
  const content = isMounted ? children : fallback;
  (0, import_react151.useEffect)(() => {
    if (isMounted && onMount) {
      onMount();
    }
  }, [isMounted, onMount]);
  return /* @__PURE__ */ import_react151.default.createElement(import_react151.default.Fragment, null, content);
}

// node_modules/@shopify/polaris/build/esm/components/Sticky/Sticky.js
var import_react153 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/hooks.js
var import_react152 = __toESM(require_react());
function useStickyManager() {
  const stickyManager = (0, import_react152.useContext)(StickyManagerContext);
  if (!stickyManager) {
    throw new MissingAppProviderError("No StickyManager was provided.");
  }
  return stickyManager;
}

// node_modules/@shopify/polaris/build/esm/components/Sticky/Sticky.js
var StickyInner = class extends import_react153.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isSticky: false,
      style: {}
    };
    this.placeHolderNode = null;
    this.stickyNode = null;
    this.setPlaceHolderNode = (node) => {
      this.placeHolderNode = node;
    };
    this.setStickyNode = (node) => {
      this.stickyNode = node;
    };
    this.handlePositioning = (stick, top = 0, left = 0, width2 = 0) => {
      const {
        isSticky
      } = this.state;
      if (stick && !isSticky || !stick && isSticky) {
        this.adjustPlaceHolderNode(stick);
        this.setState({
          isSticky: !isSticky
        }, () => {
          if (this.props.onStickyChange == null) {
            return null;
          }
          this.props.onStickyChange(!isSticky);
          if (this.props.boundingElement == null) {
            return null;
          }
          this.props.boundingElement.toggleAttribute("data-sticky-active");
        });
      }
      const style = stick ? {
        position: "fixed",
        top,
        left,
        width: width2
      } : {};
      this.setState({
        style
      });
    };
    this.adjustPlaceHolderNode = (add) => {
      if (this.placeHolderNode && this.stickyNode) {
        this.placeHolderNode.style.paddingBottom = add ? `${getRectForNode(this.stickyNode).height}px` : "0px";
      }
    };
  }
  componentDidMount() {
    const {
      boundingElement,
      offset = false,
      disableWhenStacked = false,
      stickyManager
    } = this.props;
    if (!this.stickyNode || !this.placeHolderNode)
      return;
    stickyManager.registerStickyItem({
      stickyNode: this.stickyNode,
      placeHolderNode: this.placeHolderNode,
      handlePositioning: this.handlePositioning,
      offset,
      boundingElement,
      disableWhenStacked
    });
  }
  componentWillUnmount() {
    const {
      stickyManager
    } = this.props;
    if (!this.stickyNode)
      return;
    stickyManager.unregisterStickyItem(this.stickyNode);
  }
  render() {
    const {
      style,
      isSticky
    } = this.state;
    const {
      children
    } = this.props;
    const childrenContent = isFunction(children) ? children(isSticky) : children;
    return /* @__PURE__ */ import_react153.default.createElement("div", null, /* @__PURE__ */ import_react153.default.createElement("div", {
      ref: this.setPlaceHolderNode
    }), /* @__PURE__ */ import_react153.default.createElement("div", {
      ref: this.setStickyNode,
      style
    }, childrenContent));
  }
};
function isFunction(arg) {
  return typeof arg === "function";
}
function Sticky(props) {
  const stickyManager = useStickyManager();
  return /* @__PURE__ */ import_react153.default.createElement(StickyInner, Object.assign({}, props, {
    stickyManager
  }));
}

// node_modules/@shopify/polaris/build/esm/components/DataTable/components/Navigation/Navigation.js
var import_react154 = __toESM(require_react());
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
  const i18n = useI18n();
  const pipMarkup = columnVisibilityData.map((column, index) => {
    if (index < fixedFirstColumns)
      return;
    const className = classNames(styles51.Pip, column.isVisible && styles51["Pip-visible"]);
    return /* @__PURE__ */ import_react154.default.createElement("div", {
      className,
      key: `pip-${index}`
    });
  });
  const leftA11yLabel = i18n.translate("Polaris.DataTable.navAccessibilityLabel", {
    direction: "left"
  });
  const rightA11yLabel = i18n.translate("Polaris.DataTable.navAccessibilityLabel", {
    direction: "right"
  });
  return /* @__PURE__ */ import_react154.default.createElement("div", {
    className: styles51.Navigation,
    ref: setRef
  }, /* @__PURE__ */ import_react154.default.createElement(Button, {
    variant: "tertiary",
    icon: SvgChevronLeftIcon,
    disabled: isScrolledFarthestLeft,
    accessibilityLabel: leftA11yLabel,
    onClick: navigateTableLeft
  }), pipMarkup, /* @__PURE__ */ import_react154.default.createElement(Button, {
    variant: "tertiary",
    icon: SvgChevronRightIcon,
    disabled: isScrolledFarthestRight,
    accessibilityLabel: rightA11yLabel,
    onClick: navigateTableRight
  }));
}

// node_modules/@shopify/polaris/build/esm/components/DataTable/DataTable.js
var getRowClientHeights = (rows) => {
  const heights = [];
  if (!rows) {
    return heights;
  }
  rows.forEach((row) => {
    heights.push(row.clientHeight);
  });
  return heights;
};
var DataTableInner = class extends import_react155.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      condensed: false,
      columnVisibilityData: [],
      isScrolledFarthestLeft: true,
      isScrolledFarthestRight: false,
      rowHovered: void 0
    };
    this.dataTable = /* @__PURE__ */ (0, import_react155.createRef)();
    this.scrollContainer = /* @__PURE__ */ (0, import_react155.createRef)();
    this.table = /* @__PURE__ */ (0, import_react155.createRef)();
    this.stickyTable = /* @__PURE__ */ (0, import_react155.createRef)();
    this.stickyNav = null;
    this.headerNav = null;
    this.tableHeadings = [];
    this.stickyHeadings = [];
    this.tableHeadingWidths = [];
    this.stickyHeaderActive = false;
    this.scrollStopTimer = null;
    this.handleResize = debounce(() => {
      const {
        table: {
          current: table
        },
        scrollContainer: {
          current: scrollContainer
        }
      } = this;
      let condensed = false;
      if (table && scrollContainer) {
        condensed = table.scrollWidth > scrollContainer.clientWidth + 1;
      }
      this.setState({
        condensed,
        ...this.calculateColumnVisibilityData(condensed)
      });
    });
    this.setCellRef = ({
      ref,
      index,
      inStickyHeader
    }) => {
      if (ref == null) {
        return;
      }
      if (inStickyHeader) {
        this.stickyHeadings[index] = ref;
        const button = ref.querySelector("button");
        if (button == null) {
          return;
        }
        button.addEventListener("focus", this.handleHeaderButtonFocus);
      } else {
        this.tableHeadings[index] = ref;
        this.tableHeadingWidths[index] = ref.clientWidth;
      }
    };
    this.changeHeadingFocus = () => {
      const {
        tableHeadings,
        stickyHeadings,
        stickyNav,
        headerNav
      } = this;
      const stickyFocusedItemIndex = stickyHeadings.findIndex((item) => item === document.activeElement?.parentElement);
      const tableFocusedItemIndex = tableHeadings.findIndex((item) => item === document.activeElement?.parentElement);
      const arrowsInStickyNav = stickyNav?.querySelectorAll("button");
      const arrowsInHeaderNav = headerNav?.querySelectorAll("button");
      let stickyFocusedNavIndex = -1;
      arrowsInStickyNav?.forEach((item, index) => {
        if (item === document.activeElement) {
          stickyFocusedNavIndex = index;
        }
      });
      let headerFocusedNavIndex = -1;
      arrowsInHeaderNav?.forEach((item, index) => {
        if (item === document.activeElement) {
          headerFocusedNavIndex = index;
        }
      });
      if (stickyFocusedItemIndex < 0 && tableFocusedItemIndex < 0 && stickyFocusedNavIndex < 0 && headerFocusedNavIndex < 0) {
        return null;
      }
      let button;
      if (stickyFocusedItemIndex >= 0) {
        button = tableHeadings[stickyFocusedItemIndex].querySelector("button");
      } else if (tableFocusedItemIndex >= 0) {
        button = stickyHeadings[tableFocusedItemIndex].querySelector("button");
      }
      if (stickyFocusedNavIndex >= 0) {
        button = arrowsInHeaderNav?.[stickyFocusedNavIndex];
      } else if (headerFocusedNavIndex >= 0) {
        button = arrowsInStickyNav?.[headerFocusedNavIndex];
      }
      if (button == null) {
        return null;
      }
      button.style.visibility = "visible";
      button.focus();
      button.style.removeProperty("visibility");
    };
    this.calculateColumnVisibilityData = (condensed) => {
      const fixedFirstColumns = this.fixedFirstColumns();
      const {
        table: {
          current: table
        },
        scrollContainer: {
          current: scrollContainer
        },
        dataTable: {
          current: dataTable
        }
      } = this;
      const {
        stickyHeader
      } = this.props;
      if ((stickyHeader || condensed) && table && scrollContainer && dataTable) {
        const headerCells = table.querySelectorAll(headerCell.selector);
        const rightMostHeader = headerCells[fixedFirstColumns - 1];
        const nthColumnWidth = fixedFirstColumns ? rightMostHeader.offsetLeft + rightMostHeader.offsetWidth : 0;
        if (headerCells.length > 0) {
          const firstVisibleColumnIndex = headerCells.length - 1;
          const tableLeftVisibleEdge = scrollContainer.scrollLeft + nthColumnWidth;
          const tableRightVisibleEdge = scrollContainer.scrollLeft + dataTable.offsetWidth;
          const tableData = {
            firstVisibleColumnIndex,
            tableLeftVisibleEdge,
            tableRightVisibleEdge
          };
          const columnVisibilityData = [...headerCells].map(measureColumn(tableData));
          const lastColumn = columnVisibilityData[columnVisibilityData.length - 1];
          const isScrolledFarthestLeft = fixedFirstColumns ? tableLeftVisibleEdge === nthColumnWidth : tableLeftVisibleEdge === 0;
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
    };
    this.handleHeaderButtonFocus = (event) => {
      const fixedFirstColumns = this.fixedFirstColumns();
      if (this.scrollContainer.current == null || event.target == null || this.state.columnVisibilityData.length === 0) {
        return;
      }
      const target = event.target;
      const currentCell = target.parentNode;
      const tableScrollLeft = this.scrollContainer.current.scrollLeft;
      const tableViewableWidth = this.scrollContainer.current.offsetWidth;
      const tableRightEdge = tableScrollLeft + tableViewableWidth;
      const nthColumnWidth = this.state.columnVisibilityData.length > 0 ? this.state.columnVisibilityData[fixedFirstColumns]?.rightEdge : 0;
      const currentColumnLeftEdge = currentCell.offsetLeft;
      const currentColumnRightEdge = currentCell.offsetLeft + currentCell.offsetWidth;
      if (tableScrollLeft > currentColumnLeftEdge - nthColumnWidth) {
        this.scrollContainer.current.scrollLeft = currentColumnLeftEdge - nthColumnWidth;
      }
      if (currentColumnRightEdge > tableRightEdge) {
        this.scrollContainer.current.scrollLeft = currentColumnRightEdge - tableViewableWidth;
      }
    };
    this.stickyHeaderScrolling = () => {
      const {
        current: stickyTable
      } = this.stickyTable;
      const {
        current: scrollContainer
      } = this.scrollContainer;
      if (stickyTable == null || scrollContainer == null) {
        return;
      }
      stickyTable.scrollLeft = scrollContainer.scrollLeft;
    };
    this.scrollListener = () => {
      if (this.scrollStopTimer) {
        clearTimeout(this.scrollStopTimer);
      }
      this.scrollStopTimer = setTimeout(() => {
        this.setState((prevState) => ({
          ...this.calculateColumnVisibilityData(prevState.condensed)
        }));
      }, 100);
      this.setState({
        isScrolledFarthestLeft: this.scrollContainer.current?.scrollLeft === 0
      });
      if (this.props.stickyHeader && this.stickyHeaderActive) {
        this.stickyHeaderScrolling();
      }
    };
    this.handleHover = (row) => () => {
      this.setState({
        rowHovered: row
      });
    };
    this.handleFocus = (event) => {
      const fixedFirstColumns = this.fixedFirstColumns();
      if (this.scrollContainer.current == null || event.target == null) {
        return;
      }
      const currentCell = event.target.parentNode;
      const fixedNthColumn = this.props;
      const nthColumnWidth = fixedNthColumn ? this.state.columnVisibilityData[fixedFirstColumns]?.rightEdge : 0;
      const currentColumnLeftEdge = currentCell.offsetLeft;
      const desiredScrollLeft = currentColumnLeftEdge - nthColumnWidth;
      if (this.scrollContainer.current.scrollLeft > desiredScrollLeft) {
        this.scrollContainer.current.scrollLeft = desiredScrollLeft;
      }
    };
    this.navigateTable = (direction) => {
      const fixedFirstColumns = this.fixedFirstColumns();
      const {
        currentColumn,
        previousColumn
      } = this.state;
      const nthColumnWidth = this.state.columnVisibilityData[fixedFirstColumns - 1]?.rightEdge;
      if (!currentColumn || !previousColumn) {
        return;
      }
      let prevWidths = 0;
      for (let index = 0; index < currentColumn.index; index++) {
        prevWidths += this.state.columnVisibilityData[index].width;
      }
      const {
        current: scrollContainer
      } = this.scrollContainer;
      const handleScroll = () => {
        let newScrollLeft = 0;
        if (fixedFirstColumns) {
          newScrollLeft = direction === "right" ? prevWidths - nthColumnWidth + currentColumn.width : prevWidths - previousColumn.width - nthColumnWidth;
        } else {
          newScrollLeft = direction === "right" ? currentColumn.rightEdge : previousColumn.leftEdge;
        }
        if (scrollContainer) {
          scrollContainer.scrollLeft = newScrollLeft;
          requestAnimationFrame(() => {
            this.setState((prevState) => ({
              ...this.calculateColumnVisibilityData(prevState.condensed)
            }));
          });
        }
      };
      return handleScroll;
    };
    this.renderHeading = ({
      heading,
      headingIndex,
      inFixedNthColumn,
      inStickyHeader
    }) => {
      const {
        sortable,
        truncate = false,
        columnContentTypes,
        defaultSortDirection,
        initialSortColumnIndex = 0,
        verticalAlign,
        firstColumnMinWidth
      } = this.props;
      const fixedFirstColumns = this.fixedFirstColumns();
      const {
        sortDirection = defaultSortDirection,
        sortedColumnIndex = initialSortColumnIndex,
        isScrolledFarthestLeft
      } = this.state;
      let sortableHeadingProps;
      const headingCellId = `heading-cell-${headingIndex}`;
      const stickyHeaderId = `stickyheader-${headingIndex}`;
      const id = inStickyHeader ? stickyHeaderId : headingCellId;
      if (sortable) {
        const isSortable = sortable[headingIndex];
        const isSorted = isSortable && sortedColumnIndex === headingIndex;
        const direction = isSorted ? sortDirection : "none";
        sortableHeadingProps = {
          defaultSortDirection,
          sorted: isSorted,
          sortable: isSortable,
          sortDirection: direction,
          onSort: this.defaultOnSort(headingIndex),
          fixedNthColumn: fixedFirstColumns,
          inFixedNthColumn: fixedFirstColumns
        };
      }
      const stickyCellWidth = inStickyHeader ? this.tableHeadingWidths[headingIndex] : void 0;
      const fixedCellVisible = !isScrolledFarthestLeft;
      const cellProps = {
        header: true,
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
      if (inFixedNthColumn && inStickyHeader) {
        return [/* @__PURE__ */ import_react155.default.createElement(Cell, Object.assign({
          key: id
        }, cellProps, {
          setRef: (ref) => {
            this.setCellRef({
              ref,
              index: headingIndex,
              inStickyHeader
            });
          },
          inFixedNthColumn: false
        })), /* @__PURE__ */ import_react155.default.createElement(Cell, Object.assign({
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
        }))];
      }
      return /* @__PURE__ */ import_react155.default.createElement(Cell, Object.assign({
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
    };
    this.totalsRowHeading = () => {
      const {
        i18n,
        totals,
        totalsName
      } = this.props;
      const totalsLabel = totalsName ? totalsName : {
        singular: i18n.translate("Polaris.DataTable.totalRowHeading"),
        plural: i18n.translate("Polaris.DataTable.totalsRowHeading")
      };
      return totals && totals.filter((total) => total !== "").length > 1 ? totalsLabel.plural : totalsLabel.singular;
    };
    this.renderTotals = ({
      total,
      index
    }) => {
      const fixedFirstColumns = this.fixedFirstColumns();
      const id = `totals-cell-${index}`;
      const {
        truncate = false,
        verticalAlign,
        columnContentTypes
      } = this.props;
      let content;
      let contentType;
      if (index === 0) {
        content = this.totalsRowHeading();
      }
      if (total !== "" && index > 0) {
        contentType = columnContentTypes[index];
        content = total;
      }
      const totalInFooter = this.props.showTotalsInFooter;
      return /* @__PURE__ */ import_react155.default.createElement(Cell, {
        total: true,
        totalInFooter,
        nthColumn: index <= fixedFirstColumns - 1,
        firstColumn: index === 0,
        key: id,
        content,
        contentType,
        truncate,
        verticalAlign
      });
    };
    this.getColSpan = (rowLength, headingsLength, contentTypesLength, cellIndex) => {
      const fixedFirstColumns = this.fixedFirstColumns();
      if (fixedFirstColumns) {
        return 1;
      }
      const rowLen = rowLength ? rowLength : 1;
      const colLen = headingsLength ? headingsLength : contentTypesLength;
      const colSpan = Math.floor(colLen / rowLen);
      const remainder = colLen % rowLen;
      return cellIndex === 0 ? colSpan + remainder : colSpan;
    };
    this.defaultRenderRow = ({
      row,
      index,
      inFixedNthColumn,
      rowHeights
    }) => {
      const {
        columnContentTypes,
        truncate = false,
        verticalAlign,
        hoverable = true,
        headings
      } = this.props;
      const {
        condensed
      } = this.state;
      const fixedFirstColumns = this.fixedFirstColumns();
      const className = classNames(styles51.TableRow, hoverable && styles51.hoverable);
      return /* @__PURE__ */ import_react155.default.createElement("tr", {
        key: `row-${index}`,
        className,
        onMouseEnter: this.handleHover(index),
        onMouseLeave: this.handleHover()
      }, row.map((content, cellIndex) => {
        const hovered = index === this.state.rowHovered;
        const id = `cell-${cellIndex}-row-${index}`;
        const colSpan = this.getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex);
        return /* @__PURE__ */ import_react155.default.createElement(Cell, {
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
    };
    this.defaultOnSort = (headingIndex) => {
      const {
        onSort,
        defaultSortDirection = "ascending",
        initialSortColumnIndex
      } = this.props;
      const {
        sortDirection = defaultSortDirection,
        sortedColumnIndex = initialSortColumnIndex
      } = this.state;
      let newSortDirection = defaultSortDirection;
      if (sortedColumnIndex === headingIndex) {
        newSortDirection = sortDirection === "ascending" ? "descending" : "ascending";
      }
      const handleSort = () => {
        this.setState({
          sortDirection: newSortDirection,
          sortedColumnIndex: headingIndex
        }, () => {
          if (onSort) {
            onSort(headingIndex, newSortDirection);
          }
        });
      };
      return handleSort;
    };
  }
  componentDidMount() {
    if (true) {
      setTimeout(() => {
        this.handleResize();
      }, 10);
    } else {
      this.handleResize();
    }
  }
  componentDidUpdate(prevProps) {
    if ((0, import_react_fast_compare2.default)(prevProps, this.props)) {
      return;
    }
    this.handleResize();
  }
  componentWillUnmount() {
    this.handleResize.cancel();
  }
  render() {
    const {
      headings,
      totals,
      showTotalsInFooter,
      rows,
      footerContent,
      hideScrollIndicator = false,
      increasedTableDensity = false,
      hasZebraStripingOnData = false,
      stickyHeader = false,
      hasFixedFirstColumn: fixedFirstColumn = false,
      pagination
    } = this.props;
    const {
      condensed,
      columnVisibilityData,
      isScrolledFarthestLeft,
      isScrolledFarthestRight
    } = this.state;
    if (fixedFirstColumn && true) {
      console.warn("Deprecation: The `hasFixedFirstColumn` prop on the `DataTable` has been deprecated. Use fixedFirstColumns={n} instead.");
    }
    const fixedFirstColumns = this.fixedFirstColumns();
    const rowCountIsEven = rows.length % 2 === 0;
    const className = classNames(styles51.DataTable, condensed && styles51.condensed, totals && styles51.ShowTotals, showTotalsInFooter && styles51.ShowTotalsInFooter, hasZebraStripingOnData && styles51.ZebraStripingOnData, hasZebraStripingOnData && rowCountIsEven && styles51.RowCountIsEven);
    const wrapperClassName = classNames(styles51.TableWrapper, condensed && styles51.condensed, increasedTableDensity && styles51.IncreasedTableDensity, stickyHeader && styles51.StickyHeaderEnabled);
    const headingMarkup = /* @__PURE__ */ import_react155.default.createElement("tr", null, headings.map((heading, index) => this.renderHeading({
      heading,
      headingIndex: index,
      inFixedNthColumn: false,
      inStickyHeader: false
    })));
    const totalsMarkup = totals ? /* @__PURE__ */ import_react155.default.createElement("tr", null, totals.map((total, index) => this.renderTotals({
      total,
      index
    }))) : null;
    const nthColumns = rows.map((row) => row.slice(0, fixedFirstColumns));
    const nthHeadings = headings.slice(0, fixedFirstColumns);
    const nthTotals = totals?.slice(0, fixedFirstColumns);
    const tableHeaderRows = this.table.current?.children[0].childNodes;
    const tableBodyRows = this.table.current?.children[1].childNodes;
    const headerRowHeights = getRowClientHeights(tableHeaderRows);
    const bodyRowHeights = getRowClientHeights(tableBodyRows);
    const fixedNthColumnMarkup = condensed && fixedFirstColumns !== 0 && /* @__PURE__ */ import_react155.default.createElement("table", {
      className: classNames(styles51.FixedFirstColumn, !isScrolledFarthestLeft && styles51.separate),
      style: {
        width: `${columnVisibilityData[fixedFirstColumns - 1]?.rightEdge}px`
      }
    }, /* @__PURE__ */ import_react155.default.createElement("thead", null, /* @__PURE__ */ import_react155.default.createElement("tr", {
      style: {
        height: `${headerRowHeights[0]}px`
      }
    }, nthHeadings.map((heading, index) => this.renderHeading({
      heading,
      headingIndex: index,
      inFixedNthColumn: true,
      inStickyHeader: false
    }))), totals && !showTotalsInFooter && /* @__PURE__ */ import_react155.default.createElement("tr", {
      style: {
        height: `${headerRowHeights[1]}px`
      }
    }, nthTotals?.map((total, index) => this.renderTotals({
      total,
      index
    })))), /* @__PURE__ */ import_react155.default.createElement("tbody", null, nthColumns.map((row, index) => this.defaultRenderRow({
      row,
      index,
      inFixedNthColumn: true,
      rowHeights: bodyRowHeights
    }))), totals && showTotalsInFooter && /* @__PURE__ */ import_react155.default.createElement("tfoot", null, /* @__PURE__ */ import_react155.default.createElement("tr", null, nthTotals?.map((total, index) => this.renderTotals({
      total,
      index
    })))));
    const bodyMarkup = rows.map((row, index) => this.defaultRenderRow({
      row,
      index,
      inFixedNthColumn: false
    }));
    const footerMarkup = footerContent ? /* @__PURE__ */ import_react155.default.createElement("div", {
      className: styles51.Footer
    }, footerContent) : null;
    const paginationMarkup = pagination ? /* @__PURE__ */ import_react155.default.createElement(Pagination, Object.assign({
      type: "table"
    }, pagination)) : null;
    const headerTotalsMarkup = !showTotalsInFooter ? totalsMarkup : null;
    const footerTotalsMarkup = showTotalsInFooter ? /* @__PURE__ */ import_react155.default.createElement("tfoot", null, totalsMarkup) : null;
    const navigationMarkup = (location) => hideScrollIndicator ? null : /* @__PURE__ */ import_react155.default.createElement(Navigation, {
      columnVisibilityData,
      isScrolledFarthestLeft,
      isScrolledFarthestRight,
      navigateTableLeft: this.navigateTable("left"),
      navigateTableRight: this.navigateTable("right"),
      fixedFirstColumns,
      setRef: (ref) => {
        if (location === "header") {
          this.headerNav = ref;
        } else if (location === "sticky") {
          this.stickyNav = ref;
        }
      }
    });
    const stickyHeaderMarkup = stickyHeader ? /* @__PURE__ */ import_react155.default.createElement(AfterInitialMount, null, /* @__PURE__ */ import_react155.default.createElement("div", {
      className: styles51.StickyHeaderWrapper,
      role: "presentation"
    }, /* @__PURE__ */ import_react155.default.createElement(Sticky, {
      boundingElement: this.dataTable.current,
      onStickyChange: (isSticky) => {
        this.changeHeadingFocus();
        this.stickyHeaderActive = isSticky;
      }
    }, (isSticky) => {
      const stickyHeaderInnerClassNames = classNames(styles51.StickyHeaderInner, isSticky && styles51["StickyHeaderInner-isSticky"]);
      const stickyHeaderTableClassNames = classNames(styles51.StickyHeaderTable, !isScrolledFarthestLeft && styles51.separate);
      return /* @__PURE__ */ import_react155.default.createElement("div", {
        className: stickyHeaderInnerClassNames
      }, /* @__PURE__ */ import_react155.default.createElement("div", null, navigationMarkup("sticky")), /* @__PURE__ */ import_react155.default.createElement("table", {
        className: stickyHeaderTableClassNames,
        ref: this.stickyTable
      }, /* @__PURE__ */ import_react155.default.createElement("thead", null, /* @__PURE__ */ import_react155.default.createElement("tr", {
        className: styles51.StickyTableHeadingsRow
      }, headings.map((heading, index) => {
        return this.renderHeading({
          heading,
          headingIndex: index,
          inFixedNthColumn: Boolean(index <= fixedFirstColumns - 1 && fixedFirstColumns),
          inStickyHeader: true
        });
      })))));
    }))) : null;
    return /* @__PURE__ */ import_react155.default.createElement("div", {
      className: wrapperClassName,
      ref: this.dataTable
    }, stickyHeaderMarkup, navigationMarkup("header"), /* @__PURE__ */ import_react155.default.createElement("div", {
      className
    }, /* @__PURE__ */ import_react155.default.createElement("div", {
      className: styles51.ScrollContainer,
      ref: this.scrollContainer
    }, /* @__PURE__ */ import_react155.default.createElement(EventListener, {
      event: "resize",
      handler: this.handleResize
    }), /* @__PURE__ */ import_react155.default.createElement(EventListener, {
      capture: true,
      passive: true,
      event: "scroll",
      handler: this.scrollListener
    }), fixedNthColumnMarkup, /* @__PURE__ */ import_react155.default.createElement("table", {
      className: styles51.Table,
      ref: this.table
    }, /* @__PURE__ */ import_react155.default.createElement("thead", null, headingMarkup, headerTotalsMarkup), /* @__PURE__ */ import_react155.default.createElement("tbody", null, bodyMarkup), footerTotalsMarkup)), paginationMarkup, footerMarkup));
  }
  fixedFirstColumns() {
    const {
      hasFixedFirstColumn,
      fixedFirstColumns = 0,
      headings
    } = this.props;
    const numberOfFixedFirstColumns = hasFixedFirstColumn && !fixedFirstColumns ? 1 : fixedFirstColumns;
    if (numberOfFixedFirstColumns >= headings.length) {
      return 0;
    }
    return numberOfFixedFirstColumns;
  }
  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
};
function DataTable(props) {
  const i18n = useI18n();
  return /* @__PURE__ */ import_react155.default.createElement(DataTableInner, Object.assign({}, props, {
    i18n
  }));
}

export {
  AppProvider,
  SvgAlertTriangleIcon,
  SvgArrowDownIcon,
  SvgArrowUpIcon,
  SvgCheckCircleIcon,
  SvgXCircleIcon,
  Text,
  Icon,
  Spinner,
  Button,
  Box,
  Card,
  InlineStack,
  BlockStack,
  Badge,
  TextField,
  Collapsible,
  DataTable,
  Modal,
  Frame,
  Layout,
  Page,
  ProgressBar,
  Select,
  Toast2 as Toast
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
//# sourceMappingURL=/build/_shared/chunk-6SE3652O.js.map
