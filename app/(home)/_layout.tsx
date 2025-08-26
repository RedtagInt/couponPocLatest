import CommonWrapper from "@/components/CommonWrapper";
import { useAuth } from "@/contexts/authContext";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Stack } from "expo-router";
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
export default function HomeLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    // <Stack>
    //        <Stack.Screen name="index" options={{title: 'Dashboard'}} />
    //   {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    // </Stack>
 <CommonWrapper>
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen

        name="index" // Matches app/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(shop)/index" // Matches app/(tabs)/profile.tsx
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(rewards)/index" // Matches app/(tabs)/index.tsx
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gift" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(account)/index" // Matches app/(tabs)/index.tsx
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="user" color={color} />,
        }}
      />
    </Tabs>
    </CommonWrapper>
  );

  const styles = StyleSheet.create({
    screenContainer: {
      backgroundColor: '#f0f0f0', // Common background color for all screens
      padding: 20, // Common padding
    },
  });
}