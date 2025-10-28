// WebViewScreen.js
import CustomBottomsheet from '@/components/CustomBottomsheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Button, Platform, StatusBar, Text, TouchableOpacity, FlatList } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import WebView from 'react-native-webview';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { fetchData } from '@/services/baseservice';
import { APIEndpoints } from '@/constants/appConstants';

const WebViewScreen = ({ route }: any) => {
  const [loading, setLoading] = useState(false);
  const [storeDataList, setStoreDataList] = useState<any>([]);
  const [vouchersData, setVouchersData] = useState<any[]>([]);
  const [isWebViewOpen, setIsWebView] = useState<boolean>(false);

  const { url, storeId } = useLocalSearchParams<{ url: string, storeId: string }>();
  const webviewUrl = url ? url : 'https://www.google.com';
  console.log('url', url);

  const [isSelected, setIsSelected] = React.useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePresentPress = useCallback(() => {
    getStore();
    bottomSheetRef.current?.expand();
    console.log('bottomSheetRef', bottomSheetRef);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsSelected(false)
  }, []);

  const handleSheetChanges = (index: any) => {
    console.log('index', index);
    if (index === -1) {
      setIsWebView(false);
    } else if (index === 2) {
      setIsWebView(true);
    }
  };

  const getStore = async () => {
    try {
      setLoading(true);
      const storeData = await fetchData(APIEndpoints.getStore + '/' + storeId);
      if (storeData && storeData.data && storeData.status.code === 200) {
        setStoreDataList(storeData?.data);
        // console.log('storeDataList', storeDataList);
        const vouchers = storeData?.data?.[0]?.vouchers;
        console.log('vouchers', vouchers);
        if (vouchers && vouchers.length) {
          setVouchersData(vouchers);
        } else {
          setVouchersData([]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch storeData", err);
    } finally {
      setLoading(false);
    }
  };
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
            <Text className="text-base text-gray-800 font-medium">{item?.voucherTitle}</Text>
          </View>

          {/* coupon code */}
          <View className="ml-3 items-center justify-center">
            <TouchableOpacity activeOpacity={0.85} className="px-4 py-2 rounded-lg"
              style={styles.dottedBox}
            >
              <Text className="text-sm font-semibold text-yellow-600">{item?.voucherCode}</Text>
            </TouchableOpacity>
          </View>

          {/* copy icon */}
          <TouchableOpacity className="ml-3 p-2">
            <MaterialIcons name="content-copy" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-gray-500 mt-3">Terms - {item?.terms}</Text>

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
      {!isWebViewOpen && (
        <Button
          title="Get Vouchers"
          onPress={handlePresentPress} // Attach the function to the onPress prop
        />
      )}

      <CustomBottomsheet ref={bottomSheetRef} title='New Bottomsheet'
        onChange={handleSheetChanges}>
        <View>
          {/* header */}
          <View className="px-4 pb-3 flex-row items-center justify-between">
            <Text className="text-xl font-semibold">{storeDataList?.[0]?.storeName}</Text>

            {/* close button */}
            <TouchableOpacity className="w-9 h-9 rounded-full items-center justify-center bg-gray-100"
              onPress={handleClosePress}>
              <Text className="text-gray-600 font-medium">x</Text>
            </TouchableOpacity>
          </View>
          {/* list */}
          <FlatList
            data={vouchersData}
            keyExtractor={(i) => i._id}
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
