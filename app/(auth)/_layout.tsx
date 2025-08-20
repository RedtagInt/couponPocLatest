import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { useAuth } from "../../contexts/authContext";

export default function AuthLayout() {
    return (
        <Stack>
            {/* Define your stack screens here, or other navigators */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* Add more Stack.Screen components for other routes */}
        </Stack>
    );
}