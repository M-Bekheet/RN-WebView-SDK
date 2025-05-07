import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';
import type { WebView as WebViewType } from 'react-native-webview'; // For typing the ref

// Define the props your library component will accept.
// It extends all standard WebViewProps and adds any custom props specific to this library
export interface RNWebViewLibraryProps extends WebViewProps {
  // You can add custom props specific to your library here
  // For example:
  enableLogging?: boolean;
}

// Export the native WebView method types for consumers
export type RNWebViewLibraryMethods = WebViewType;

/**
 * RNWebViewLibrary - An enhanced WebView component with additional functionality
 * 
 * This component wraps the react-native-webview WebView component and adds:
 * - Ref forwarding for accessing WebView methods
 * - Optional console logging for debugging
 * - All standard WebView props plus custom library props
 */
const RNWebViewLibrary = forwardRef<WebViewType, RNWebViewLibraryProps>((props, ref) => {
  const {
    enableLogging = true, // Enable logging by default
    style,
    ...restProps
  } = props;
  
  const internalWebViewRef = useRef<WebViewType>(null);

  // Forward all underlying WebView methods to the parent via ref
  useImperativeHandle(ref, () => internalWebViewRef.current as WebViewType);

  return (
    <WebView
      ref={internalWebViewRef}
      style={[styles.webView, style]} // Apply default style + user style
      {...restProps} // Pass all other props to WebView
      
      // Enhanced event handlers with optional logging
      onLoadStart={(e) => {
        if (enableLogging) console.log('RNWebViewLibrary: onLoadStart', e.nativeEvent.url);
        props.onLoadStart?.(e); // Call consumer's handler if provided
      }}
      
      onLoad={(e) => {
        if (enableLogging) console.log('RNWebViewLibrary: onLoad', e.nativeEvent.url);
        props.onLoad?.(e);
      }}
      
      onLoadEnd={(e) => {
        if (enableLogging) console.log('RNWebViewLibrary: onLoadEnd', e.nativeEvent.url);
        props.onLoadEnd?.(e);
      }}
      
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        if (enableLogging) console.warn('RNWebViewLibrary error:', nativeEvent);
        props.onError?.(syntheticEvent);
      }}
      
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        if (enableLogging) {
          console.warn(
            'RNWebViewLibrary HTTP error:',
            nativeEvent.url,
            nativeEvent.statusCode,
            nativeEvent.description,
          );
        }
        props.onHttpError?.(syntheticEvent);
      }}
      
      onMessage={(event) => {
        if (enableLogging) console.log('RNWebViewLibrary message:', event.nativeEvent.data);
        props.onMessage?.(event);
      }}
    />
  );
});

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default RNWebViewLibrary; 