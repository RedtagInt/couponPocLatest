// WebViewScreen.js
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = ({ route }: any) => {

  const { url } = useLocalSearchParams<{ url: string }>();
  const webviewUrl = url ? url : 'https://www.google.com';
  console.log('url', url);
  // const { uri } = route?.params;
  // console.log('at webview', route?.params);
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: webviewUrl }}
        style={styles.webview}
        // Optional: Add a loading indicator while the page loads
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;
