import {
  View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, TextInput, ScrollView, ActivityIndicator,
  StyleSheet,
  Button,
  Modal,
  Alert
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { fetchData, postData } from '@/services/baseservice';
import { APIEndpoints, UserDataKey, UsermobKey } from '@/constants/appConstants';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import CreateUserProfile from '@/components/UserProfile';
import { UserProfile } from '@/services/homeservice';
import { useAuth } from '@/contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const brands = ({ navigation }: any) => {

  const navigationNative: any = useNavigation();
  const router = useRouter();

  const [userMob, setUserMob] = useState('');
  const [userData, setUserData] = useState(null);
  const { createUserData } = useAuth();

  const [brandList, setAllBrands] = useState<any[]>([]);
  const [searchBrandsText, setSearchBrandsText] = useState('');
  const [filteredBrandListData, setFilteredBrandListData] = useState(brandList);

  let categoryWiseBrandsTemp: any[];
  const [categoryWiseBrands, setcategoryWiseBrands] = useState<any[]>([]);
  const [filteredcategoryWiseBrands, setFilteredcategoryWiseBrands] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const flatListRef: any = useRef(null);

  const [trendingBrands, setTrendingBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [userProfmodalVisible, setUserProfModalVisible] = useState(false);

  useEffect(() => {
    getUserMob();
    getBrands();
    getCategoryWiseBrands();
  }, []);

  const getUserMob = async () => {
    const mob = await AsyncStorage.getItem(UsermobKey);
    if (mob) {
      setUserMob(mob);
      checkUserExist(mob);
    }
  }

  const checkUserExist = async (mob: any) => {
    const fetchedData = await fetchData(APIEndpoints.getUser + '/' + mob);
    if (fetchedData && fetchedData.data && fetchedData.status.code === 200) {
      createUserData(fetchedData.data);
    } else {
      setUserProfModalVisible(true);
    }
  }

  const handleUserProfileSubmit = async (data: any) => {
    const createdUserdata = await postData(APIEndpoints.addUser, data);
    if (createdUserdata && createdUserdata.data && createdUserdata.status.code === 200) {
      await AsyncStorage.setItem(UserDataKey, createdUserdata.data);
      setUserProfModalVisible(false);
    } else {

    }
  };

  const handleUserprofileCancel = () => {
    setUserProfModalVisible(false);
  };

  const categoryTabs = ["Travel", "Fashion", "Gifts", "Health", "Beauty", "Electronics"];

  const getBrands = async () => {
    try {
      setLoading(true);
      const brandList = await fetchData(APIEndpoints.getAllStores);
      // console.log('brandList', brandList);
      if (brandList && brandList.data && brandList.status.code === 200) {
        setAllBrands(brandList.data?.allStores);
        setTrendingBrands(brandList.data?.popularStores);
        // setFilteredBrandListData(brandList.data?.allStores);
      }
    } catch (err) {
      console.error("Failed to fetch brandList", err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryWiseBrands = async () => {
    try {
      setLoading(true);
      const data = await fetchData(APIEndpoints.getPopularCategories);
      // console.log('data/yy', data);
      categoryWiseBrandsTemp = data.data;
      if (data && data.data && data.status.code === 200) {
        setcategoryWiseBrands(data.data);
        // console.log('get data', categoryWiseBrands);
        handleFilterClick(categoryTabs[1], true);
        // if (categoryWiseBrands.length > 0 && flatListRef.current) {
        //   flatListRef.current.scrollToIndex({ index: 1, animated: true });
        // }
      }
    } catch (err) {
      console.error("Failed to fetch categoryWiseBrands", err);
    } finally {
      setLoading(false);
    }
  }

  const openWebView = (affiliateLink: string, storeId: string) => {
    navigationNative.navigate('webview/[url]', { url: affiliateLink, storeId: storeId });
  }

  const handleSearch = (text: string) => {
    setSearchBrandsText(text);
    const newData = brandList.filter(item => {
      const itemData = item?.storeName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredBrandListData(newData);
  };

  const handleFilterClick = (category: string, isFirstTime = false) => {

    setSelectedCategory(category);
    const arrYToFilter = isFirstTime ? categoryWiseBrandsTemp : categoryWiseBrands;
    if (arrYToFilter && arrYToFilter.length) {
      const newData = category ? arrYToFilter.filter(item => item.categoryName === category) : [];
      setFilteredcategoryWiseBrands(newData);
      // console.log('newdata', category, categoryWiseBrands);
    }

    // Optional: Scroll to the first item of the filtered list
    // if (newData.length > 0 && flatListRef.current) {
    //   flatListRef.current.scrollToIndex({ index: 0, animated: true });
    // }
  };


  const handleItemClick = (item: any) => {
    // Find the index of the clicked item within the *filtered* data
    const index = filteredcategoryWiseBrands.findIndex((dataItem: any) => dataItem.id === item.id);
    // if (index !== -1 && flatListRef.current) {
    //   flatListRef.current.scrollToIndex({ index, animated: true });
    // }
  };

  return (

    <SafeAreaView className="flex-1 bg-white">
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
                <Text className="text-2xl font-semibold">User Not Found !!!</Text>
                <TouchableOpacity onPress={handleUserprofileCancel} className="p-1">
                  <Ionicons name="close" size={28} color="#0b1220" />
                </TouchableOpacity>
              </View>
              <CreateUserProfile onSubmit={handleUserProfileSubmit} onCancel={handleUserprofileCancel}></CreateUserProfile>

            </View>
          </View>
        </View>
      </Modal>

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
              value={searchBrandsText}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* Alphabet Buttons */}
        <View className="px-4 mt-4 flex flex-row gap-3 overflow-scroll">
          {categoryTabs.map((label) => (
            <TouchableOpacity
              key={label}
              className="px-4 py-2 bg-blue-600 rounded-full"
              style={selectedCategory === label ? styles.activeCategory : ''}
              onPress={() => handleFilterClick(label)}
            >
              <Text className="text-white font-medium">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brand List */}



        <View className="mt-5 flex flex-row flex-wrap justify-center">
          {searchBrandsText && filteredBrandListData?.map((item) => (
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
      {!searchBrandsText &&
        <FlatList
          ref={flatListRef}
          data={filteredcategoryWiseBrands[0]?.stores}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemClick(item)}>
              <Text>{item.storeName} ({item.storeLink})</Text>
            </TouchableOpacity>
          )}
        />}


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
  },
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

export default brands