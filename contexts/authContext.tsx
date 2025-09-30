import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'expo-router'; // Or use React Navigation if not using Expo Router
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/components/Themed";
import { APIEndpoints, TokenKey, UserDataKey, UsermobKey } from "@/constants/appConstants";
import { fetchData, postData } from "@/services/baseservice";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (mobNumber: any, token: string) => void;
  logout: () => void;
  // user: { number: string } | null;
  isLoading: boolean,
  userData: any;
  createUserData: (userData: any) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const navigation: any = useNavigation();

  useEffect(() => {
    checkAuth();
  }, [])

  const checkAuth = async () => {
    const storedToken = await AsyncStorage.getItem(TokenKey);
    const storedMob = await AsyncStorage.getItem(UsermobKey);
    if (storedToken && storedMob) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }


  const login = async (mobNumber: any, token: string) => {
    setIsLoading(true);
    await AsyncStorage.setItem(TokenKey, token);
    await AsyncStorage.setItem(UsermobKey, mobNumber);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem(TokenKey);
    await AsyncStorage.removeItem(UsermobKey);
    await AsyncStorage.removeItem(UserDataKey);
    setUserData(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };


  const createUserData = async (userData: any) => {
    if (userData) {
      setUserData(userData);
      await AsyncStorage.setItem(UserDataKey, JSON.stringify(userData));
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, userData, createUserData }}>
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