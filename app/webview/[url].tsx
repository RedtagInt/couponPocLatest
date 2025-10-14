// WebViewScreen.js
import CustomBottomsheet from '@/components/CustomBottomsheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Button, Platform, StatusBar, Text, TouchableOpacity, FlatList } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import WebView from 'react-native-webview';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const WebViewScreen = ({ route }: any) => {

  const { url } = useLocalSearchParams<{ url: string }>();
  const webviewUrl = url ? url : 'https://www.google.com';
  console.log('url', url);
  
   const [isSelected, setIsSelected] = React.useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsSelected(false)
  }, []);
  const CouponData = [
  {
    id: "c1",
    description:
      "Get 20% Cashback in IGP Wallet",
    code: "BLOOM",
    terms: "Valid on orders above ₹999",
  },
  {
    id: "c2",
    description:
      "Get 20% Cashback in IGP Wallet on Purchasing Flowers",
    code: "IGPBLOOM",
    terms: "Valid on orders above ₹999",
  },
  {
    id: "c3",
    description:
      "Get 20% Cashback in IGP Wallet on Purchasing Flowers",
    code: "BLOOM",
    terms: "Valid on orders above ₹999",
  },
  {
    id: "c4",
    description:
      "Get 20% Cashback in IGP Wallet on Purchasing Flowers",
    code: "BLOOM",
    terms: "Valid on orders above ₹999",
  },
];
function CouponRow({ item }: { item: any }) {
  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center space-x-3">
        {/* left information icon */}
        <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-2">
          <Ionicons name="information-circle-outline" size={18} color="#111827" />
        </View>

        {/* coupon description */}
        <View className="flex-1">
          <Text className="text-base text-gray-800 font-medium">{item.description}</Text>
        </View>

        {/* coupon code */}
        <View className="ml-3 items-center justify-center">
          <TouchableOpacity activeOpacity={0.85} className="px-4 py-2 rounded-lg"
            style={styles.dottedBox}
          >
            <Text className="text-sm font-semibold text-yellow-600">{item.code}</Text>
          </TouchableOpacity>
        </View>

        {/* copy icon */}
        <TouchableOpacity className="ml-3 p-2">
          <MaterialIcons name="content-copy" size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <Text className="text-xs text-gray-500 mt-3">Terms - {item.terms}</Text>

      {/* divider */}
      <View className="mt-3" style={styles.divider} />
    </View>
  );
}
  
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: webviewUrl }}
        style={styles.webview}
        // Optional: Add a loading indicator while the page loads
        startInLoadingState={true}
      />
      <Button
        title="Press Me"
        onPress={handlePresentPress} // Attach the function to the onPress prop
      />
      <CustomBottomsheet ref={bottomSheetRef} title='New Bottomsheet'>
         <View>
          {/* header */}
          <View className="px-4 pb-3 flex-row items-center justify-between">
            <Text className="text-xl font-semibold">Store Name</Text>

            {/* close button */}
            <TouchableOpacity className="w-9 h-9 rounded-full items-center justify-center bg-gray-100">
              <Text className="text-gray-600 font-medium">x</Text>
            </TouchableOpacity>
          </View>
          {/* list */}
          <FlatList
            data={CouponData}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <CouponRow item={item} />}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
          
         </View>
      </CustomBottomsheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  webview: {
    flex: 1,
  },
  dottedBox: {
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 12,
  },
});

export default WebViewScreen;
