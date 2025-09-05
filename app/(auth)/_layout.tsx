import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { useAuth } from "../../contexts/authContext";

export default function AuthLayout() {
    const { isAuthenticated, user, isLoading } = useAuth();
    console.log('layout loaded auth');
    if (isAuthenticated) {
        return <Redirect href="/(home)" />;
    }
    return (
        <Stack>
            {/* Define your stack screens here, or other navigators */}
            <Stack.Screen name="signin" options={{ title: 'Login' }} />
            <Stack.Screen name="verify" options={{ title: 'Verify OTP' }} />
            {/* Add more Stack.Screen components for other routes */}
        </Stack>
    );
}