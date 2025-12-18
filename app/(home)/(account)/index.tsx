import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CreateUserProfile from '@/components/UserProfile';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataKey } from '@/constants/appConstants';
import { UserProfile } from '@/services/homeservice';
import { createBirthDate, getInitials } from '@/services/baseservice';

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
      console.log('user', user);
      const tempObj: any = {
        firstName: user.name ? user.name : '',
        mobileNo: user.mobileNo ? user.mobileNo : '',
        email: user.email ? user.email : '',
        gender: user.gender ? String(user.gender) : '',
        dob: createBirthDate(user?.birthYear, user?.birthMonth)
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
    <View>
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
                <Text className="text-2xl font-semibold text-black">Update Profile</Text>
                <TouchableOpacity onPress={() => { setUserProfModalVisible(false) }} className="p-1">
                  <Ionicons name="close" size={28} color="#0b1220" />
                </TouchableOpacity>
              </View>

              <CreateUserProfile userProfile={userProfile} onSubmit={handleUserProfileSubmit} onCancel={handleUserprofileCancel}></CreateUserProfile>

            </View>
          </View>
        </View>
      </Modal>

      <View className='bg-black p-8'>

        <View className="mb-6">
          {/* Avatar placeholder (no Image) */}
          <View className="w-16 h-16 rounded-full bg-[#1f1f1f] items-center justify-center mx-auto mb-5">
            <Text className="text-white font-bold text-lg">
              HP
            </Text>
            {/* <Text className="text-white font-bold text-lg">
              {getInitials(userProfile?.firstName, userProfile?.firstName)}
            </Text> */}
          </View>
          <View className="pr-4">
            <Text className="text-white text-3xl font-extrabold text-center mb-2">Hrushikesh Patil</Text>
            <Text className='text-stone-500 text-center mb-5'>hrushikesh.patil27@gmail.com</Text>
            {/* <Text className="text-black text-4xl font-extrabold">{userProfile?.firstName}</Text>
            <Text className='text-black'>{userProfile?.email}</Text> */}
          </View>

          
        </View>

        {/* Action cards row */}
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-1 bg-stone-900 rounded-2xl items-center justify-center py-4"
            onPress={() => getUserProfile()}>
              <Text>👤</Text>
            <Text className="text-gray-200 pt-2 text-lg">Manage Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-stone-900 rounded-2xl items-center justify-center py-4 ml-5">
              <Text>📋</Text>
            <Text className="text-gray-200 pt-2 text-lg">Privacy Policy</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Divider */}
      <View className="h-px bg-[#232323] mb-4" />

      {/* Menu list */}
      <View className="p-6">
        <TouchableOpacity className="flex-row items-center bg-white border border-gray-300 p-4 rounded-xl mb-3">
          <View className="w-10 items-center">
            <Text className="text-gray-300 text-lg">⚙️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-black text-lg">Terms & Conditions</Text>
          </View>
          <Text className="text-gray-500">›</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white border border-gray-300 p-4 rounded-xl mb-3">
          <View className="w-10 items-center">
            <Text className="text-gray-300 text-lg">ℹ️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-black text-lg">Legal</Text>
          </View>
          <Text className="text-gray-500">›</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white border border-gray-300 p-4 rounded-xl">
          <View className="w-10 items-center">
            <Text className="text-gray-300 text-lg">👤</Text>
          </View>
          <View className="flex-1">
            <Text className="text-black text-lg">SignOut</Text>
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
  }
});

export default Index