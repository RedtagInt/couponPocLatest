import { useAuth } from '@/contexts/authContext';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, StatusBar, Platform, Button, Pressable } from 'react-native';

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const CommonWrapper = ({ children, title }: any) => {
    const { isAuthenticated, login, logout, userData } = useAuth();
    const handleLogout = () => {
        // console.log('userdata', userData);
        logout();
    }
    return (
        <View style={styles.container}>
            {/* <Text style={styles.headerTitle}>{title}</Text> */}
            <View className="px-6 bg-gray-100 py-2 hidden" style={styles.userRow}>
                <View>
                    <Text>Welcome,</Text>
                    <Text style={styles.userName}>{userData?.name}</Text>
                </View>

                <Pressable onPress={handleLogout} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={20} color="white" />
                </Pressable>
            </View>
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
        // paddingTop: STATUSBAR_HEIGHT
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#000',
        color: '#fff',
        padding: 0
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: "600",
    },
    logoutBtn: {
        padding: 8,
        borderRadius: 16,
        backgroundColor: "#fb2c36"
    },
});

export default CommonWrapper;