import CommonWrapper from "@/components/CommonWrapper";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/authContext";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Stack } from "expo-router";
import { Tabs } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';
export default function HomeLayout() {
  const { isAuthenticated } = useAuth();
  // console.log('isAuthenticated at home layout', isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/signin" />;
  }
  return (
     
    <CommonWrapper>
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#59168b",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 2,
        },
        }}
      >
        
        <Tabs.Screen
          name="(shop)" // Matches app/(tabs)/profile.tsx
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
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="(fashion)" // Matches app/(tabs)/index.tsx
          options={{
            title: 'Fashion',
            // tabBarIcon: ({ color }) => <FontAwesome size={25} name="user" color={color} />,
            // tabBarButton: () => null
            tabBarItemStyle: {display: 'none'}
            
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