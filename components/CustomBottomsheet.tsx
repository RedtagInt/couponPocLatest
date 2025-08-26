import { View, Text, Button, StyleSheet } from 'react-native'
import React, { forwardRef, useMemo } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props {
    title: string;
    children: any
}

type Ref = BottomSheet;

const CustomBottomsheet = forwardRef<Ref, Props>((props, ref) => {

    const snapPoints = useMemo(() => ['25%', '75%'], []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>

        <BottomSheet
          ref={ref}
          index={-1} // -1 means hidden by default
          snapPoints={snapPoints}
          enablePanDownToClose={true} // allows closing by panning down
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetHandleIndicator}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            {props.children}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
});

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

export default CustomBottomsheet