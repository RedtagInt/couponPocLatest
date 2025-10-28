import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchData } from "@/services/baseservice";
import { APIEndpoints } from "@/constants/appConstants";
import CustomBottomsheet from "@/components/CustomBottomsheet";
import BottomSheet from "@gorhom/bottom-sheet";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const FALLBACK_IMG = "https://img.icons8.com/ios-filled/100/backpack.png";

export default function CategoriesScreen({ navigation }: any) {
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);

  // control "sheet open" state
  const [sheetOpen, setSheetOpen] = useState(false);

  // Animated value for translateY of sheet
  const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    getCategories();
  }, []);

  // When sheetOpen changes, animate sheet up/down
  useEffect(() => {

  });

  const getCategories = async () => {
    try {
      setLoading(true);
      const categories = await fetchData(APIEndpoints.getAllCategories);
      // console.log('fetcheduser', fetchedData);
      if (categories && categories.data && categories.status.code === 200) {
        // createUserData(fetchedData.data);
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
      const category = await fetchData(APIEndpoints.getCategory + '/' + cat._id);
      console.log('category', category);
      if (category && category.data && category.status.code === 200) {
        // createUserData(fetchedData.data);

        setSelectedCategory(category.data.length ? category.data : []);

        // bottomSheetRef.current?.expand();
      } else {
      }
      // setAllCategories(categories);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  function openCategory(cat: any) {
    // getCategory(cat);
    bottomSheetRef.current?.expand();
    // setSheetOpen(true);
  }

  function closeSheet() {
    // setSheetOpen(false);
  }

  const categoryCard = ({ item }: { item: any }) => {
    const bgClass = item.bgColorClass ?? "bg-slate-100";
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
        className="flex-row items-center px-4 py-5 bg-white"
        activeOpacity={0.7}
        onPress={() => {
          console.log("Subcategory tapped:", item.categoryName);
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
      <View className="flex-row items-center px-4 pt-3">
        <TouchableOpacity className="p-2" onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={24} color="#0b1220" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Explore Products</Text>
      </View>



      {/* Grid */}
      <FlatList
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


      {/* {sheetOpen && (
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )} */}


      <CustomBottomsheet ref={bottomSheetRef} title='New Bottomsheet'
        onChange={() => { }}>
        <View>
          <View className="bg-white rounded-t-3xl overflow-hidden" style={{ flex: 1 }}>

            <View className="items-center pt-3 pb-1">
              <View className="w-12 h-1 rounded-full bg-gray-300" />
            </View>

            <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-200">
              <Text className="text-2xl font-semibold">{selectedCategory?.name ?? "Category"}</Text>
              <TouchableOpacity onPress={closeSheet} className="p-1">
                <Ionicons name="close" size={28} color="#0b1220" />
              </TouchableOpacity>
            </View>


            <FlatList
              data={selectedCategory}
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
      </CustomBottomsheet>


      {/* <Animated.View
        pointerEvents={sheetOpen ? "auto" : "none"}
        style={[
          styles.sheetContainer,
          {
            transform: [{ translateY: sheetTranslateY }],
            elevation: 20,
            zIndex: 1000,
          },
        ]}
      >
        <View className="bg-white rounded-t-3xl overflow-hidden" style={{ flex: 1 }}>
        
          <View className="items-center pt-3 pb-1">
            <View className="w-12 h-1 rounded-full bg-gray-300" />
          </View>

          <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-200">
            <Text className="text-2xl font-semibold">{selectedCategory?.name ?? "Category"}</Text>
            <TouchableOpacity onPress={closeSheet} className="p-1">
              <Ionicons name="close" size={28} color="#0b1220" />
            </TouchableOpacity>
          </View>

        
          <FlatList
            data={selectedCategory?.subcategories ?? []}
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
      </Animated.View> */}
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
});
