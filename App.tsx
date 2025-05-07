import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import { RNWebViewLibrary } from './src';
import type { RNWebViewLibraryMethods } from './src';

/**
 * Example app demonstrating how to use the RNWebViewLibrary
 */
function App(): React.JSX.Element {
  // State for the URL input
  const [url, setUrl] = useState('https://reactnative.dev/');
  const [inputUrl, setInputUrl] = useState(url);

  // Reference to access WebView methods
  const webViewRef = useRef<RNWebViewLibraryMethods>(null);

  // Handle URL submission
  const handleLoadUrl = () => {
    setUrl(inputUrl);
  };

  // WebView control methods
  const goBack = () => {
    webViewRef.current?.goBack();
  };

  const goForward = () => {
    webViewRef.current?.goForward();
  };

  const reload = () => {
    webViewRef.current?.reload();
  };

  const injectJavaScript = () => {
    webViewRef.current?.injectJavaScript(`
      alert('Hello from injected JavaScript!');
      true; // Note that injected JS must return true
    `);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>RNWebViewLibrary Demo</Text>

        {/* URL input and load button */}
        <View style={styles.urlContainer}>
          <TextInput
            style={styles.urlInput}
            value={inputUrl}
            onChangeText={setInputUrl}
            placeholder="Enter URL"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            onSubmitEditing={handleLoadUrl}
          />
          <Button title="Load" onPress={handleLoadUrl} />
        </View>

        {/* The WebView component from our library */}
        <RNWebViewLibrary
          ref={webViewRef}
          source={{ uri: url }}
          style={styles.webView}
          enableLogging={true}
          onLoadStart={() => console.log('App handler: WebView is starting to load...')}
          onLoadEnd={() => console.log('App handler: WebView has finished loading')}
        />

        {/* Navigation controls */}
        <View style={styles.controls}>
          <Button title="Back" onPress={goBack} />
          <Button title="Forward" onPress={goForward} />
          <Button title="Reload" onPress={reload} />
          <Button title="Inject JS" onPress={injectJavaScript} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  urlContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  urlInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
    marginRight: 10,
  },
  webView: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    margin: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default App;
