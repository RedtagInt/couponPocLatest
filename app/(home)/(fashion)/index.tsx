import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useTabDataContext } from './_layout';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { sharedData }: any = useTabDataContext();
  useEffect(() => {
    console.log('sharedData', sharedData);
    setProducts(sharedData);
  },[sharedData]);

  // const products: any = [];
  return (
    <View style={{ flex: 1 }}>
      <View className="flex-row items-center mb-6">
        <View className="w-8 h-8 bg-gray-300 rounded-full mr-2" />
        <Text className="text-xl font-semibold">Fashion</Text>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {products.map((item: any) => (
          <View key={item._id} className="w-[48%] bg-white rounded-2xl border border-gray-200 mb-4 p-3 shadow-sm">
            <View className="bg-gray-200 h-36 rounded-lg mb-3" />
            <Text className="text-yellow-500 text-xs font-semibold mb-1">{item.discount}</Text>
            <Text className="text-black font-semibold mb-1">{item.brand}</Text>
            <Text className="text-gray-700 text-sm mb-3">{item.title}</Text>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-black font-semibold text-base">₹{item.price}</Text>
                <Text className="text-gray-400 text-sm line-through ml-2">₹{item.mrp}</Text>
              </View>
              <TouchableOpacity className="bg-gray-800 px-3 py-1 rounded">
                <Text className="text-white text-xs font-semibold">Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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