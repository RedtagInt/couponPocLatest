import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useTabDataContext } from './_layout';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { sharedData }: any = useTabDataContext();
  const navigationNative: any = useNavigation();
  useEffect(() => {
    // console.log('sharedData', sharedData);
    setProducts(sharedData && sharedData.products ? sharedData.products : []);
  }, [sharedData]);

  const openWebView = (affiliateLink: string, storeId: string) => {
    if (affiliateLink) {
      navigationNative.navigate('webview/[url]', { url: affiliateLink, storeId: storeId });
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View className="flex-row items-center py-3 px-4">
        <View className="w-8 h-8 bg-gray-300 rounded-full mr-2" />
        <Text className="text-xl font-semibold">{sharedData?.categoryName}</Text>
      </View>
      <ScrollView>
        <View className="flex-row flex-wrap justify-between pt-2 px-4">
          {products.map((item: any) => (
            <View key={item._id} className="w-[48%] bg-white rounded-2xl border border-gray-200 mb-4 p-3 shadow-sm">
              {/* <View className="bg-gray-200 h-36 rounded-lg mb-3" /> */}
              <Image className="bg-gray-200 h-36 rounded-lg mb-3" source={{ uri: item?.images?.[0]?.url }}></Image>
              <Text className="text-yellow-500 text-xs font-semibold mb-1">{item.productTag}</Text>
              {/* <Text className="text-black font-semibold mb-1">{item.brand}</Text> */}
              <Text className="text-gray-700 text-sm mb-3 line-clamp-2 h-10">{item.productTitle}</Text>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-black font-semibold text-base">₹{item.price}</Text>
                  <Text className="text-gray-400 text-sm line-through ml-2">₹{item.originalPrice}</Text>
                </View>
                <TouchableOpacity className="bg-gray-800 px-3 py-1 rounded" onPress={() => openWebView(item.productLink, item.storeId)}>
                  <Text className="text-white text-xs font-semibold">Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {
        loading && (
          <View style={styles.overlay}>

            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
    </View>
  )
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
  }
});

export default Index