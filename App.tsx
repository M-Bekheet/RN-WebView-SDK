import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View
} from 'react-native';
import WebViewComponent from './components/WebView';

function App(): React.JSX.Element {
  const backgroundStyle = {
    flex: 1, 
  };


  return (
    <View style={backgroundStyle}>
      <StatusBar
      />
     <SafeAreaView style={{ flex: 1 }}>
      <WebViewComponent />
     </SafeAreaView>
    </View>
  );
}


export default App;
