import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchData } from "@/services/baseservice";
import { APIEndpoints } from "@/constants/appConstants";
import { router, Link } from 'expo-router';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const FALLBACK_IMG = "https://img.icons8.com/ios-filled/100/backpack.png";

export default function CategoriesScreen({ navigation }: any) {
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [subCategories, setSubCategories] = useState<any>([]);

  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const categories = await fetchData(APIEndpoints.getAllCategories);
      if (categories && categories.data && categories.status.code === 200) {
        setAllCategories(categories.data);

      } else {
      }
      // setAllCategories(categories);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async (cat: any) => {
    try {
      setLoading(true);
      // console.log('cat', cat);
      const catId = String(cat._id);
      setSelectedCategory(cat);
      const category = await fetchData(APIEndpoints.getCategory + '/' + catId);
      if (category && category.data && category.status.code === 200) {
        // setSubCategories(category.data.length ? category.data : []);
        // setModalVisible(true);

      } else {
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  function openCategory(cat: any) {
    // getCategory(cat);
    // console.log('cat', cat);
    setSelectedCategory(cat);
    if (allCategories && allCategories.length) {
      const selectedCategory = allCategories.find(category => category.categoryLink === cat.categoryLink);
      setSubCategories(selectedCategory?.relatedCategories);
      setModalVisible(true);
    }
  }

  function closeSheet() {
    setModalVisible(false);

  }

  const handleBack = () => {
    // navigation?.goBack?.();
  }

  const navigateToProducts = (subCategory: any) => {
    // console.log('item', subCategory._id);
    router.navigate({
      pathname: '/(home)/(fashion)/coupons',
      params: {
        categoryId: JSON.stringify(subCategory._id)
      },
    });
  }

  const categoryCard = ({ item }: { item: any }) => {
    const bgClass = item.bgColorClass ?? "bg-gray-100";
    const imageUri = item.image || FALLBACK_IMG;
    return (
      <TouchableOpacity
        className={`flex-1 m-3 p-5 rounded-2xl ${bgClass}`}
        activeOpacity={0.85}
        onPress={() => openCategory(item)}
      >
        <View className="flex-row justify-between items-start">
          <View style={{ flex: 1 }}>
            <Text className="text-lg font-semibold text-black">{item.categoryName}</Text>
            <Text className="text-sm text-gray-600 mt-1">{item.offers ?? 0} Offers</Text>
          </View>

        </View>
        <View>
          <Image source={{ uri: imageUri }} className="w-16 h-16 ml-auto" resizeMode="contain" />
        </View>
      </TouchableOpacity>
    );
  };

  const subItem = ({ item }: { item: any }) => {
    const imageUri = item.image || FALLBACK_IMG;
    return (
      <TouchableOpacity
        className="flex-row items-center px-4 py-5 bg-white inner"
        activeOpacity={0.7}
        onPress={() => {
          navigateToProducts(item);
        }}
      >
        <View className="w-12 h-12 rounded-full bg-[#f4e9d8] items-center justify-center mr-4 overflow-hidden">
          <Image source={{ uri: imageUri }} className="w-10 h-10" resizeMode="contain" />
        </View>

        <Text className="flex-1 text-lg font-medium text-black">{item.categoryName}</Text>

        <Ionicons name="chevron-forward" size={22} color="#0b1220" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }} className="py-3 bg-white">
      <View style={{ flex: 1 }}>
        {/* <View className="flex-row items-center px-4 pt-3">
          <TouchableOpacity className="p-2" onPress={() => handleBack()}>
            <Ionicons name="arrow-back" size={24} color="#0b1220" />
          </TouchableOpacity>
          <Text className="text-xl font-bold ml-2">Explore Products</Text>
        </View> */}


        <FlatList
          style={{ flexGrow: 1 }}
          data={allCategories}
          renderItem={categoryCard}
          keyExtractor={(i) => String(i._id)}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 0, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20">
              <Text className="text-gray-500">No categories found.</Text>
            </View>
          )}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>

              <View className="bg-white rounded-t-3xl overflow-hidden">

                <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-200">
                  <Text className="text-2xl font-semibold">{selectedCategory?.categoryName ?? "Category"}</Text>
                  <TouchableOpacity onPress={closeSheet} className="p-1">
                    <Ionicons name="close" size={28} color="#0b1220" />
                  </TouchableOpacity>
                </View>


                <FlatList
                  data={subCategories}
                  keyExtractor={(i: any) => String(i._id)}
                  renderItem={subItem}
                  ItemSeparatorComponent={() => <View className="h-px bg-gray-200 ml-20" />}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 40 }}
                  ListEmptyComponent={() => (
                    <View className="py-8 px-4">
                      <Text className="text-gray-500">No subcategories available.</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {
        loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
    </View >
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
  sheetContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: Math.min(SCREEN_HEIGHT * 0.65, 720),
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: "transparent",
  },
  inner: {
    paddingBottom: 20
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
  }
});
