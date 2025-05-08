# React Native WebView Library

A customizable WebView SDK for React Native applications that provides an enhanced WebView component with additional features and simplified integration.

## Features

- 📱 Fully compatible with iOS and Android
- 🔄 Forwarded refs for accessing WebView methods
- 🔍 Optional console logging for debugging
- 🧩 TypeScript support with comprehensive type definitions
- 🛠️ Easy to integrate into any React Native project
- 📦 Install directly from GitHub (no npm registry required)
- 🔄 Standard WebView functionality enhanced with additional features

## Installation

### Installing from GitHub

```bash
# Using npm
npm install github:M-Bekheet/RN-WebView-SDK

# Using yarn
yarn add github:M-Bekheet/RN-WebView-SDK

# Using a specific branch or tag
npm install github:M-Bekheet/RN-WebView-SDK#main
yarn add github:M-Bekheet/RN-WebView-SDK#v0.1.0
```

### Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

```bash
# Using npm
npm install react-native-webview@11.23.1

# Using yarn
yarn add react-native-webview
```

For iOS, don't forget to install the pods:

```bash
cd ios && pod install && cd ..
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { RNWebViewLibrary } from 'rn-webview-library';

const MyComponent = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNWebViewLibrary 
        source={{ uri: 'https://reactnative.dev/' }} 
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default MyComponent;
```

### Using WebView Methods with Refs

```jsx
import React, { useRef } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import { RNWebViewLibrary, RNWebViewLibraryMethods } from 'rn-webview-library';

const WebViewWithControls = () => {
  // Create a ref to access WebView methods
  const webViewRef = useRef<RNWebViewLibraryMethods>(null);

  // Navigation functions
  const goBack = () => webViewRef.current?.goBack();
  const goForward = () => webViewRef.current?.goForward();
  const reload = () => webViewRef.current?.reload();
  
  // Execute JavaScript in the WebView
  const injectJS = () => {
    webViewRef.current?.injectJavaScript(`
      alert('Hello from injected JavaScript!');
      true; // Note that injected JS must return true
    `);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNWebViewLibrary
        ref={webViewRef}
        source={{ uri: 'https://reactnative.dev/' }}
        style={{ flex: 1 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Back" onPress={goBack} />
        <Button title="Forward" onPress={goForward} />
        <Button title="Reload" onPress={reload} />
        <Button title="Inject JS" onPress={injectJS} />
      </View>
    </SafeAreaView>
  );
};

export default WebViewWithControls;
```

### Custom Props and Event Handling

```jsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RNWebViewLibrary } from 'rn-webview-library';

const WebViewWithEvents = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNWebViewLibrary
        source={{ uri: 'https://reactnative.dev/' }}
        style={{ flex: 1 }}
        enableLogging={true} // Enable console logging (default is true)
        
        // Handle WebView events
        onLoadStart={(e) => console.log('Loading started:', e.nativeEvent.url)}
        onLoad={(e) => console.log('Page loaded:', e.nativeEvent.url)}
        onLoadEnd={(e) => console.log('Loading finished:', e.nativeEvent.url)}
        onError={(e) => console.error('Error:', e.nativeEvent)}
        onHttpError={(e) => console.warn('HTTP Error:', e.nativeEvent.statusCode)}
        
        // Handle communication from WebView to React Native
        onMessage={(e) => {
          console.log('Message from WebView:', e.nativeEvent.data);
          // Process message data here
        }}
        
        // Standard WebView props are also supported
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </SafeAreaView>
  );
};

export default WebViewWithEvents;
```

## API Reference

### RNWebViewLibrary Component

The main component exported by this library.

#### Props

`RNWebViewLibrary` accepts all standard [react-native-webview props](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md) plus the following additional props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableLogging` | boolean | `true` | Enable/disable console logging of WebView events |

#### Methods

All methods from the standard WebView are available via ref:

| Method | Description |
|--------|-------------|
| `goBack()` | Navigate back in the WebView history |
| `goForward()` | Navigate forward in the WebView history |
| `reload()` | Reload the current page |
| `stopLoading()` | Stop loading the current page |
| `injectJavaScript(script)` | Execute JavaScript in the WebView |
| *...and more* | All standard WebView methods are available |

## Building and Development

### Project Structure

```
rn-webview-library/
├── lib/                   # Compiled output (generated - do not edit)
├── src/                   # Library source code
│   ├── components/        # React components
│   │   └── WebView.tsx    # The main WebView component
│   └── index.ts           # Entry point
├── App.tsx                # Example app for testing
├── package.json           # Project configuration
└── tsconfig.json          # TypeScript configuration
```

### Development Workflow

1. Clone the repository
   ```bash
   git clone https://github.com/M-Bekheet/RN-WebView-SDK.git
   cd rn-webview-library
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the example app
   ```bash
   # iOS
   npm run ios
   # or
   yarn ios

   # Android
   npm run android
   # or
   yarn android
   ```

4. Make changes to the library code in the `src/` directory

5. Build the library
   ```bash
   npm run build
   # or
   yarn build
   ```

### Publishing Updates

1. Make your changes to the library code
2. Build the library with `npm run build`
3. Update version in `package.json`
4. Commit and push your changes to GitHub
5. Create a new release/tag on GitHub (optional)

## License

MIT

