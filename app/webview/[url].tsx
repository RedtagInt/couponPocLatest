// WebViewScreen.js

import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Button, Platform, StatusBar, Text, TouchableOpacity, FlatList, Modal, ToastAndroid, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { fetchData } from '@/services/baseservice';
import { APIEndpoints } from '@/constants/appConstants';
import * as Clipboard from 'expo-clipboard';

const WebViewScreen = ({ route }: any) => {
  const [loading, setLoading] = useState(false);
  const [storeDataList, setStoreDataList] = useState<any>([]);
  const [vouchersData, setVouchersData] = useState<any[]>([]);
  const [isWebViewOpen, setIsWebView] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState(false);

  const { url, storeId } = useLocalSearchParams<{ url: string, storeId: string }>();
  const webviewUrl = url ? url : 'https://www.google.com';
  // console.log('url', url);

  const [copiedText, setCopiedText] = useState('');

  const handlePresentPress = useCallback(() => {
    getStore();
    setModalVisible(true);
  }, []);

  const handleClosePress = useCallback(() => {
    setModalVisible(false)
  }, []);

  const getStore = async () => {
    try {
      setLoading(true);
      const storeData = await fetchData(APIEndpoints.getStore + '/' + storeId);
      if (storeData && storeData.data && storeData.status.code === 200) {
        setStoreDataList(storeData?.data);
        const vouchers = storeData?.data?.[0]?.vouchers;
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

  const handleCopyPress = async (textToCopy: string) => {
    if (textToCopy) {
      await Clipboard.setStringAsync(textToCopy);
      const text = await Clipboard.getStringAsync();
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
          <TouchableOpacity className="ml-3 p-2" onPress={() => handleCopyPress(item?.voucherCode)}>
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
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: webviewUrl }}
        style={styles.webview}
        startInLoadingState={true}
        userAgent="Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36"
      />
      {!isWebViewOpen && (
        <Button
          title="Get Vouchers"
          onPress={handlePresentPress}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View>
              <View className="px-4 pb-3 flex-row items-center justify-between">
                <Text className="text-xl font-semibold">{storeDataList?.[0]?.storeName}</Text>
                <TouchableOpacity className="w-9 h-9 rounded-full items-center justify-center bg-gray-100"
                  onPress={handleClosePress}>
                  <Text className="text-gray-600 font-medium">x</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={vouchersData}
                keyExtractor={(i) => i._id}
                renderItem={({ item }) => <CouponRow item={item} />}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default WebViewScreen;
