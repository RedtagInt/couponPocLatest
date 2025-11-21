import { View, Text, TouchableOpacity  } from 'react-native'
import React from 'react'

const Index = () => {
  return (
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1 pr-4">
            <Text className="text-black text-4xl font-extrabold">Hrushikesh Patil</Text>
            <Text>hrushikesh.patil27@gmail.com</Text>
          </View>

          {/* Avatar placeholder (no Image) */}
          <View className="w-16 h-16 rounded-full bg-[#1f1f1f] items-center justify-center">
            <Text className="text-white font-bold text-lg">HP</Text>
          </View>
        </View>

        {/* Action cards row */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity className="flex-1 mx-1 bg-[#141414] rounded-2xl h-24 items-center justify-center">
            <View className="bg-[#171717] rounded-lg p-3 mb-2">
              <Text className="text-white text-xl">👤</Text>
            </View>
            <Text className="text-gray-200">Manage Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 mx-1 bg-[#141414] rounded-2xl h-24 items-center justify-center">
            <View className="bg-[#171717] rounded-lg p-3 mb-2">
              <Text className="text-white text-xl">💳</Text>
            </View>
            <Text className="text-gray-200">Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 mx-1 bg-[#141414] rounded-2xl h-24 items-center justify-center">
            <View className="bg-[#171717] rounded-lg p-3 mb-2">
              <Text className="text-white text-xl">📋</Text>
            </View>
            <Text className="text-gray-200">Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        

        {/* Divider */}
        <View className="h-px bg-[#232323] mb-4" />

        {/* Menu list */}
        <View className="space-y-4 pb-24">
          <TouchableOpacity className="flex-row items-center px-1 py-3 rounded-md">
            <View className="w-10 items-center">
              <Text className="text-gray-300 text-lg">⚙️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-black text-base">Terms & Conditions</Text>
            </View>
            <Text className="text-gray-500">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-1 py-3 rounded-md">
            <View className="w-10 items-center">
              <Text className="text-gray-300 text-lg">ℹ️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-black text-base">Legal</Text>
            </View>
            <Text className="text-gray-500">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-1 py-3 rounded-md">
            <View className="w-10 items-center">
              <Text className="text-gray-300 text-lg">👤</Text>
            </View>
            <View className="flex-1">
              <Text className="text-black text-base">SignOut</Text>
            </View>
            <Text className="text-gray-500">›</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default Index