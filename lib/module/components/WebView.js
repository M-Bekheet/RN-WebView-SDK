function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
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
const RNWebViewLibrary = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    enableLogging = true,
    // Enable logging by default
    style,
    ...restProps
  } = props;
  const internalWebViewRef = useRef(null);

  // Forward all underlying WebView methods to the parent via ref
  useImperativeHandle(ref, () => internalWebViewRef.current);
  return /*#__PURE__*/React.createElement(WebView, _extends({
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
const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
export default RNWebViewLibrary;
//# sourceMappingURL=WebView.js.map