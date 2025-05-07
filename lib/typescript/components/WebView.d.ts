import React from 'react';
import WebView, { WebViewProps } from 'react-native-webview';
import type { WebView as WebViewType } from 'react-native-webview';
export interface RNWebViewLibraryProps extends WebViewProps {
    enableLogging?: boolean;
}
export type RNWebViewLibraryMethods = WebViewType;
/**
 * RNWebViewLibrary - An enhanced WebView component with additional functionality
 *
 * This component wraps the react-native-webview WebView component and adds:
 * - Ref forwarding for accessing WebView methods
 * - Optional console logging for debugging
 * - All standard WebView props plus custom library props
 */
declare const RNWebViewLibrary: React.ForwardRefExoticComponent<RNWebViewLibraryProps & React.RefAttributes<WebView<{}>>>;
export default RNWebViewLibrary;
//# sourceMappingURL=WebView.d.ts.map