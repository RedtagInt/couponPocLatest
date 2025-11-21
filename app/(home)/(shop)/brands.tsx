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
  const categoryTabs = ["Travel", "Fashion", "Gift", "Health", "Beauty", "Electronics"];

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
    navigationNative.navigate('webview/[url]', { url: affiliateLink, storeId: storeId });
    // console.log(abcd);
    //  router.push(abcd);
  }


  // if (loading) {
  //   return (
  //     <SafeAreaView className="flex-1 items-center justify-center bg-white">
  //       <ActivityIndicator size="large" />
  //     </SafeAreaView>
  //   );
  // }

  return (

    <SafeAreaView className="flex-1 bg-white">

      {/* Header */}
      {/* <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity className="p-2" onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Explore Products</Text>
      </View> */}


      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trending Brands */}
        <View className="px-4 mt-4">
          <Text className="text-xl font-semibold mb-3">Trending Brands</Text>
          <FlatList
            horizontal
            data={trendingBrands}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View className="mr-5 items-center">
                <View className="w-24 h-24 bg-white rounded-2xl overflow-hidden shadow">
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
        <View className="px-4 mt-4 flex flex-row gap-3 overflow-scroll">
          {categoryTabs.map((label) => (
            <TouchableOpacity
              key={label}
              className="px-4 py-2 bg-blue-600 rounded-full"
            >
              <Text className="text-white font-medium">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brand List */}

        <View className="mt-5 flex flex-row flex-wrap justify-center">
          {brandList?.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => openWebView(item.affiliateLink, item._id)}
              className="w-1/3 mb-10 px-2 items-center"
            >
              <View className="items-center">
                <View className="w-20 h-20 rounded-lg bg-gray-50 items-center justify-center overflow-hidden">
                  <Image
                    source={{ uri: item?.logoImage?.url }}
                    className="w-20 h-20"
                    resizeMode="contain"
                  />
                </View>

                <Text className="text-center text-sm font-medium mt-2">
                  {item?.storeName}
                </Text>
                <Text className="text-center text-gray-500 text-xs">
                  {item?.profitPer}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {loading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 900,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 50, // Adjust as needed
  }
});

export default brands