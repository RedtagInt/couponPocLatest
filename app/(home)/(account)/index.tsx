import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CreateUserProfile from '@/components/UserProfile';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataKey } from '@/constants/appConstants';
import { UserProfile } from '@/services/homeservice';
import { getInitials } from '@/services/baseservice';

const Index = () => {

  useEffect(() => {
  }, []);

  const [userProfmodalVisible, setUserProfModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
        gender: '',
        firstName: '',
        lastName: '',
        mobileNo: null,
        email: '',
        dob: '',
        referralCode: ''
    });

  const getUserProfile = async () => {
    let user: any = await AsyncStorage.getItem(UserDataKey);
    if (user) {
      user = JSON.parse(user);
      const tempObj: any = {
        firstName: user.name ? user.name : '',
        mobileNo: user.mobileNo ? user.mobileNo : '',
        email: user.email ? user.email : '',
        gender: user.gender ? String(user.gender) : ''
      }
       
      // setUserProfile(prev => ({...prev, tempObj}));
      setUserProfile(tempObj);
      setUserProfModalVisible(true)
    }

  }

  const handleUserProfileSubmit = async (data: any) => {
    console.log('userProfile', userProfile, data);
    // const createdUserdata = await postData(APIEndpoints.addUser, data);
    // if (createdUserdata && createdUserdata.data && createdUserdata.status.code === 200) {
    //   await AsyncStorage.setItem(UserDataKey, createdUserdata.data);
    //   setUserProfModalVisible(false);
    // } else {

    // }
  };

  const handleUserprofileCancel = () => {
    setUserProfModalVisible(false);
  };

  return (
    <View className="px-6 py-4">
      <Modal
        animationType="slide"
        transparent={true}
        visible={userProfmodalVisible}
        onRequestClose={() => setUserProfModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <View className="bg-white rounded-t-3xl overflow-hidden">
              <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
                <Text className="text-2xl font-semibold">Update Profile</Text>
                <TouchableOpacity onPress={() => { setUserProfModalVisible(false) }} className="p-1">
                  <Ionicons name="close" size={28} color="#0b1220" />
                </TouchableOpacity>
              </View>

              <CreateUserProfile userProfile={userProfile} onSubmit={handleUserProfileSubmit} onCancel={handleUserprofileCancel}></CreateUserProfile>


            </View>
          </View>
        </View>
      </Modal>
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-1 pr-4">
          <Text className="text-black text-4xl font-extrabold">{userProfile?.firstName}</Text>
          <Text>{userProfile?.email}</Text>
        </View>

        {/* Avatar placeholder (no Image) */}
        <View className="w-16 h-16 rounded-full bg-[#1f1f1f] items-center justify-center">
          <Text className="text-white font-bold text-lg">
            {getInitials(userProfile?.firstName, userProfile?.firstName)}
          </Text>
        </View>
      </View>

      {/* Action cards row */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity className="flex-1 mx-1 bg-[#141414] rounded-2xl h-24 items-center justify-center"
          onPress={() => getUserProfile()}>
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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns content to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
    // marginTop: 50
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%', // Ensures full width
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activeCategory: {
    backgroundColor: 'grey',
    // color: '#4f39f6',
  },
});

export default Index