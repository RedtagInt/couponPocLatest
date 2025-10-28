import {
  View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, TextInput, ScrollView, ActivityIndicator,
  StyleSheet,
  Button
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { fetchData } from '@/services/baseservice';
import { APIEndpoints } from '@/constants/appConstants';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const brands = ({ navigation }: any) => {

  const navigationNative: any = useNavigation();
const router = useRouter();
  const [brandList, setAllBrands] = useState<any[]>([]);
  const [trendingBrands, setTrendingBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);
  const alphabetButtons = ["A-D", "E-H", "I-L", "M-P", "Q-T", "U-Z"];

  const getBrands = async () => {
    try {
      setLoading(true);
      const brandList = await fetchData(APIEndpoints.getAllStores);
      console.log('brandList', brandList);
      if (brandList && brandList.data && brandList.status.code === 200) {
        // createUserData(fetchedData.data);
        setAllBrands(brandList.data?.allStores);
        setTrendingBrands(brandList.data?.popularStores)
      }
    } catch (err) {
      console.error("Failed to fetch brandList", err);
    } finally {
      setLoading(false);
    }
  };

  const openWebView = (affiliateLink: string, storeId: string) => {
    // console.log('navigation', navigationNative);
    // const abcd = `webview/${affiliateLink}`;
    navigationNative.navigate('webview/[url]', {url: affiliateLink, storeId: storeId});
    // console.log(abcd);
  //  router.push(abcd);
  }


  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (

    <SafeAreaView className="flex-1 bg-white">

      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity className="p-2" onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Explore Products</Text>
      </View>


      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trending Brands */}
        <View className="px-4 mt-4">
          <Text className="text-lg font-semibold mb-3">Trending Brands</Text>
          <FlatList
            horizontal
            data={trendingBrands}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View className="mr-3 items-center">
                <View className="w-28 h-28 bg-white rounded-2xl overflow-hidden shadow">
                  <Image source={{ uri: item?.logoImage?.url }} className="w-full h-full" resizeMode="cover" />
                </View>
                <Text className="mt-2 font-medium text-sm">{item?.storeName}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Search Bar */}
        <View className="px-4 mt-5">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              placeholder="Search brands"
              className="ml-3 flex-1 text-base"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Alphabet Buttons */}
        <View className="px-4 mt-4 flex-row flex-wrap gap-3">
          {alphabetButtons.map((label) => (
            <TouchableOpacity
              key={label}
              className="px-4 py-2 bg-blue-600 rounded-full"
            >
              <Text className="text-white font-medium">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brand List */}

        <View className="mt-5">
          <Text className="px-4 text-lg font-semibold mb-2">#</Text>
          {brandList?.map((item) => (

            <View
              key={item._id}
              className="flex-row items-center px-4 py-3 border-b border-gray-100"

            >
              <TouchableOpacity onPress={() => openWebView(item.affiliateLink, item._id)}>
                <View className="w-12 h-12 rounded-lg bg-gray-50 items-center justify-center mr-4 overflow-hidden border">
                  <Image
                    source={{ uri: item?.logoImage?.url }}
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium">{item?.storeName}</Text>
                  <Text className="text-gray-500 text-sm">{item?.profitPer}</Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#0b1220" />
              </TouchableOpacity>
            </View>

          ))}

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 50, // Adjust as needed
  }
});

export default brands