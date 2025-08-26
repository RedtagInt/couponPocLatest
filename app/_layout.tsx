
import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)"  options={{ headerShown: false }}/>
      </Stack>
    </AuthProvider>
  );
}