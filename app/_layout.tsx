import "./global.css"
import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <StatusBar style="light" backgroundColor="#000000" />
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false,
            header: ({options}) => (
              <Header  title={options.title || ''}/>
            ),  
          }}>
            <Stack.Screen name="(home)"  options={{ headerShown: false }}/>
            <Stack.Screen name="webview/[url]" options={{ headerShown: false }}/>
          </Stack>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}