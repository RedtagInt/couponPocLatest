// WebViewScreen.js
import CustomBottomsheet from '@/components/CustomBottomsheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Button } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = ({ route }: any) => {

  const { url } = useLocalSearchParams<{ url: string }>();
  const webviewUrl = url ? url : 'https://www.google.com';
  console.log('url', url);
  
   const [isSelected, setIsSelected] = React.useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsSelected(false)
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: webviewUrl }}
        style={styles.webview}
        // Optional: Add a loading indicator while the page loads
        startInLoadingState={true}
      />
      <Button
        title="Press Me"
        onPress={handlePresentPress} // Attach the function to the onPress prop
      />
      <CustomBottomsheet ref={bottomSheetRef} title='New Bottomsheet'>
         <View></View>
      </CustomBottomsheet>
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
