import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'expo-router'; // Or use React Navigation if not using Expo Router
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/components/Themed";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (mobNumber: any, token: string) => void;
  logout: () => void;
  user: { number: string } | null;
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const navigation: any = useNavigation();

  // useEffect(() => {
  //   const loadSession = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('userToken');
  //       console.log('storetoken before', storedToken);
  //       if (storedToken) {
  //         // You might want to validate this token with your backend here
  //         // For simplicity, we'll assume a valid token means authenticated
  //         setIsAuthenticated(true);
  //         // Fetch user data if needed
  //         // setUser(parsedUserData);
  //       }
  //     } catch (error) {
  //       console.error('Failed to load session:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   loadSession();
  // }, []);

  useEffect(() => {
    checkAuth();
  }, [])

  const checkAuth = async () => {
    const storedToken = await AsyncStorage.getItem('userToken');
    console.log('storetoken before', storedToken);
    if (storedToken) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }


  const login = async (mobNumber: any, token: string) => {
    setIsLoading(true);
    await AsyncStorage.setItem('userToken', token);
    setIsAuthenticated(true);
    setUser(mobNumber);
    console.log('storetoken at login', token);
    // const storedToken = await AsyncStorage.getItem('userToken');
    // console.log('storetoken after login', storedToken);
    setIsLoading(false);
    // router.replace("/(home)");
  };

  const logout = async () => {
     setIsLoading(true);
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
    // router.replace("/(auth)");
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (children)
      }
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};