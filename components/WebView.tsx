import React from 'react';
import { WebView } from 'react-native-webview';

const MyWebComponent = () => {

  return (
    <WebView
      source={{ uri: 'https://reactnative.dev/' }}
      style={{ flex: 1 }}
      onLoadStart={() => console.log('WebView: onLoadStart')}
      onLoad={() => console.log('WebView: onLoad')}
      onLoadEnd={() => console.log('WebView: onLoadEnd')}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn(
          'WebView HTTP error: ',
          nativeEvent.url,
          nativeEvent.statusCode,
          nativeEvent.description,
        );
      }}
      onMessage={(event) => console.log('WebView message:', event.nativeEvent.data)}
    />
  );
};

export default MyWebComponent;
