/**
 * RNWebViewLibrary - A customizable WebView SDK for React Native applications
 * 
 * This library provides an enhanced WebView component with additional features
 * and simplified integration for React Native applications.
 * 
 * @package rn-webview-library
 */

// Export the main WebView component
export { default as RNWebViewLibrary } from './components/WebView';

// Export types
export type { 
  RNWebViewLibraryProps, 
  RNWebViewLibraryMethods 
} from './components/WebView';

// Re-export useful types from react-native-webview for convenience
export type { 
  WebViewProps,
  WebViewNavigation,
  WebViewMessageEvent
} from 'react-native-webview';

// Export utility functions if you have any
// export { someUtilityFunction } from './utils/someUtility'; 