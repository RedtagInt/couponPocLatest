import { useAuth } from "@/contexts/authContext";
import { Redirect, Stack } from "expo-router";
export default function HomeLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
           <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}