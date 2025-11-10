import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { fetchData } from '@/services/baseservice';
import { APIEndpoints } from '@/constants/appConstants';
import { useTabDataContext } from './_layout';

const coupons = () => {
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    let params: any = useLocalSearchParams();
    const [categoryId, setCategoryId] = useState(null);
    const { setSharedData }: any = useTabDataContext();

    useEffect(() => {
        if (params.categoryId && categoryId !== params.categoryId) {
            console.log('categoryId', params.categoryId);
            setCategoryId(params.categoryId);
            getCategory(JSON.parse(params.categoryId));
        }
    }, [params, categoryId]);

    const getCategory = async (categoryId: any) => {
        try {
            setLoading(true);
            const category = await fetchData(APIEndpoints.getCategory + '/' + categoryId);
            if (category && category.data && category.status.code === 200) {
                setCoupons(category?.data?.[0]?.vouchers?.length ? category?.data?.[0]?.vouchers : []);
                setSharedData(category?.data?.[0]?.products?.length ? category?.data?.[0]?.products : []);
            } else {
            }
        } catch (err) {
            console.error("Failed to fetch categories", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View className="flex-row items-center mb-6">
                <View className="w-8 h-8 bg-gray-300 rounded-full mr-2" />
                <Text className="text-xl font-semibold">Fashion</Text>
            </View>

            <View className="flex-row flex-wrap justify-between mb-6">
                {coupons.map((item: any) => (
                    <View key={item._id} className="w-[48%] bg-white rounded-2xl border border-gray-200 mb-4 p-3 shadow-sm">
                        <View className="bg-gray-200 h-28 rounded-lg mb-3" />
                        <Text className="text-blue-600 text-sm font-medium mb-1">{item.brand}</Text>
                        <Text className="text-gray-700 text-sm mb-3">{item.title}</Text>
                        <TouchableOpacity className="bg-gray-800 py-2 rounded-lg">
                            <Text className="text-white text-center font-semibold text-sm">Get Coupon Code</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            {/* <FlatList
                horizontal
                data={coupons}
                keyExtractor={(item: any) => item._id.toString()}
                renderItem={({ item }) => (
                    <View className="flex-row flex-wrap justify-between mb-6">
                        {coupons.map((item: any) => (
                            <View key={item._id} className="w-[48%] bg-white rounded-2xl border border-gray-200 mb-4 p-3 shadow-sm">
                                <View className="bg-gray-200 h-28 rounded-lg mb-3" />
                                <Text className="text-blue-600 text-sm font-medium mb-1">{item.voucherTag}</Text>
                                <Text className="text-gray-700 text-sm mb-3">{item.voucherTitle}</Text>
                                <TouchableOpacity className="bg-gray-800 py-2 rounded-lg">
                                    <Text className="text-white text-center font-semibold text-sm">Get Coupon Code</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )} 
            />*/}

            {
                loading && (
                    <View style={styles.overlay}>

                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
        </View>
    )
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
    }
});

export default coupons