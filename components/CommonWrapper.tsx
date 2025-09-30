import { useAuth } from '@/contexts/authContext';
import { View, Text, StyleSheet, StatusBar, Platform, Button } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight; // Adjust for iOS status bar height if needed, 20 is a common value

const CommonWrapper = ({ children, title }: any) => {
    const { isAuthenticated, login, logout, userData } = useAuth();
    const handleLogout = () => {
        // console.log('userdata', userData);
        logout();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerTitle}>{userData?.name}</Text>
            <Button title="Logout" onPress={handleLogout} />
            {/* <Text>Hello {userMob}</Text> */}
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
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CommonWrapper;