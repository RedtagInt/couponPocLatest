import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview';

const Index = () => {
 const [showWebView, setShowWebView] = useState(false);
  
  const handleOpenWebView = () => {
    console.log('clicked');
    setShowWebView(true);
  };

  const handleCloseWebView = () => {
    setShowWebView(false);
  };
  return (
     <View style={{ flex: 1 }}>
        {!showWebView ? (
          <Button title="Open WebView" onPress={handleOpenWebView} />
        ) : (
          <>
            <WebView
              source={{ uri: 'https://www.google.com' }} // Replace with your desired URL
              style={styles.webview}
              onNavigationStateChange={(navState) => {
                // Optional: Handle navigation changes within the WebView
                console.log('WebView navigation state:', navState);
              }}
            />
            <Button title="Close WebView" onPress={handleCloseWebView} />
          </>
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 50, // Adjust as needed
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});

export default Index