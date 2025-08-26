import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../../contexts/authContext';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Index = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const handleLogout = () => {
    logout();
  }

  //   return (
  // <View>
  //        <Text>Welocme to Dashboard</Text>
  //       <Button title='Logout' onPress={handleLogout} /> 
  // </View>
  //   )

  const bottomSheetRef = useRef<BottomSheet>(null);

  // define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callback for when the bottom sheet's state changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // function to open the bottom sheet
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.expand(); // or .snapToIndex(0) for the first snap point
  }, []);

  // function to close the bottom sheet
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>React Native Bottom Sheet Example</Text>
        <Button title="Open Bottom Sheet" onPress={handlePresentPress} />

        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // -1 means hidden by default
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true} // allows closing by panning down
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetHandleIndicator}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <View>
              <Text style={styles.contentTitle}>Bottom Sheet Content</Text>
              <Text>This is some example content inside the bottom sheet.</Text>
              <Text>You can add any components here, like text inputs, buttons, etc.</Text>
              <Button title="Close Sheet" onPress={handleClosePress} />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomSheetBackground: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  bottomSheetHandleIndicator: {
    backgroundColor: '#cccccc',
  },
  contentContainer: {
    padding: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


export default Index