import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const brands = () => {
  const trendingBrands = [
    { id: 1, name: "DOT & KEY", image: "https://images.savingaround.com/Logo/dot%20and%20key%20logo.png" },
    { id: 2, name: "Just Herbs", image: "https://media.publit.io/file/fil-q0o.png" },
    { id: 3, name: "Mamaearth", image: "https://media.publit.io/file/fil-w8Z.png" },
    { id: 4, name: "Cashify.", image: "https://media.publit.io/file/fil-ler.png" },
  ];

  const brandList = [
    { id: 1, name: "4700BC", trials: "5 Trials", image: "https://via.placeholder.com/80" },
    { id: 2, name: "52 Sundaze", trials: "2 Trials", image: "https://via.placeholder.com/80" },
    { id: 3, name: "Aaranyaa", trials: "3 Trials", image: "https://via.placeholder.com/80" },
    { id: 4, name: "Aigner", trials: "1 Trial", image: "https://via.placeholder.com/80" },
    { id: 5, name: "AndStirred", trials: "1 Trial", image: "https://via.placeholder.com/80" },
    { id: 6, name: "Aqualogica", trials: "4 Trials", image: "https://via.placeholder.com/80" },
  ];

  const alphabetButtons = ["A-D", "E-H", "I-L", "M-P", "Q-T", "U-Z"];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity className="p-2">
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="mr-3 items-center">
                <View className="w-28 h-28 bg-white rounded-2xl overflow-hidden shadow">
                  <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                </View>
                <Text className="mt-2 font-medium text-sm">{item.name}</Text>
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
          {brandList.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center px-4 py-3 border-b border-gray-100"
            >
              <View className="w-12 h-12 rounded-lg bg-gray-50 items-center justify-center mr-4 overflow-hidden border">
                <Image
                  source={{ uri: item.image }}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium">{item.name}</Text>
                <Text className="text-gray-500 text-sm">{item.trials}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#0b1220" />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default brands