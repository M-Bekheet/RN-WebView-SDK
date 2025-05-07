"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeWebview = _interopRequireDefault(require("react-native-webview"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// For typing the ref

// Define the props your library component will accept.
// It extends all standard WebViewProps and adds any custom props specific to this library

// Export the native WebView method types for consumers

/**
 * RNWebViewLibrary - An enhanced WebView component with additional functionality
 * 
 * This component wraps the react-native-webview WebView component and adds:
 * - Ref forwarding for accessing WebView methods
 * - Optional console logging for debugging
 * - All standard WebView props plus custom library props
 */
const RNWebViewLibrary = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    enableLogging = true,
    // Enable logging by default
    style,
    ...restProps
  } = props;
  const internalWebViewRef = (0, _react.useRef)(null);

  // Forward all underlying WebView methods to the parent via ref
  (0, _react.useImperativeHandle)(ref, () => internalWebViewRef.current);
  return /*#__PURE__*/_react.default.createElement(_reactNativeWebview.default, _extends({
    ref: internalWebViewRef,
    style: [styles.webView, style] // Apply default style + user style
  }, restProps, {
    // Pass all other props to WebView

    // Enhanced event handlers with optional logging
    onLoadStart: e => {
      if (enableLogging) console.log('RNWebViewLibrary: onLoadStart', e.nativeEvent.url);
      props.onLoadStart?.(e); // Call consumer's handler if provided
    },
    onLoad: e => {
      if (enableLogging) console.log('RNWebViewLibrary: onLoad', e.nativeEvent.url);
      props.onLoad?.(e);
    },
    onLoadEnd: e => {
      if (enableLogging) console.log('RNWebViewLibrary: onLoadEnd', e.nativeEvent.url);
      props.onLoadEnd?.(e);
    },
    onError: syntheticEvent => {
      const {
        nativeEvent
      } = syntheticEvent;
      if (enableLogging) console.warn('RNWebViewLibrary error:', nativeEvent);
      props.onError?.(syntheticEvent);
    },
    onHttpError: syntheticEvent => {
      const {
        nativeEvent
      } = syntheticEvent;
      if (enableLogging) {
        console.warn('RNWebViewLibrary HTTP error:', nativeEvent.url, nativeEvent.statusCode, nativeEvent.description);
      }
      props.onHttpError?.(syntheticEvent);
    },
    onMessage: event => {
      if (enableLogging) console.log('RNWebViewLibrary message:', event.nativeEvent.data);
      props.onMessage?.(event);
    }
  }));
});
const styles = _reactNative.StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
var _default = exports.default = RNWebViewLibrary;
//# sourceMappingURL=WebView.js.map