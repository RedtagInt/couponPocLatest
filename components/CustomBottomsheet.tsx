import { View, Text, Button, StyleSheet } from 'react-native'
import React, { forwardRef, useMemo } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props {
  title: string;
  children: any,
  onChange: any,
  snapPoints: any
}

type Ref = BottomSheet;

const CustomBottomsheet = forwardRef<Ref, Props>((props, ref) => {

  // const snapPoints = useMemo(() => ['25%', '75%'], []);

  const defaultSnapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const sheetSnapPoints = props.snapPoints || defaultSnapPoints;


  const handleSheetChanges = (index: any) => {
    if (props.onChange) {
      props.onChange(index); // Call the parent's onChange handler
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>

        <BottomSheet
          ref={ref}
          index={-1} // -1 means hidden by default
          snapPoints={sheetSnapPoints}
          enablePanDownToClose={true} // allows closing by panning down
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetHandleIndicator}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            {props.children}
          </View>
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