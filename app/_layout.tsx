import "./global.css"
import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  return (
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
  );
}