import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

type Ref = BottomSheetModal;

interface Props {
    title: string;
    children: any,
    onChange: any,
    snapPoints: any
}

const CustomBottomsheetModal = forwardRef<Ref, Props>((props, ref) => {

    const defaultSnapPoints = useMemo(() => ['75%'], []);
    const sheetSnapPoints = props.snapPoints || defaultSnapPoints;


    const handleSheetChanges = (index: any) => {
        if (props.onChange) {
            props.onChange(index); // Call the parent's onChange handler
        }
    };

    // renders
    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheetModalProvider>

                <BottomSheetModal
                    ref={ref}
                    index={-1} // -1 means hidden by default
                    snapPoints={sheetSnapPoints}
                    enablePanDownToClose={true}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        
                        <View style={styles.contentContainer}>
                            {props.children}
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
    // position: 'static',
    // zIndex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomBottomsheetModal;