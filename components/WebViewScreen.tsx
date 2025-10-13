import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }: any) => {
  const { url } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: url }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
