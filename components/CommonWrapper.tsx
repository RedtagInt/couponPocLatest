import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight; // Adjust for iOS status bar height if needed, 20 is a common value

const CommonWrapper = ({ children }: any) => {
    return (
        <View style={styles.container}>
            {/* Add any common header, footer, or background here */}
            {children}
        </View>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Example common background
        // padding: 16, // Example common padding
        // paddingTop: 25,
        paddingTop: STATUSBAR_HEIGHT
    },
});

export default CommonWrapper;