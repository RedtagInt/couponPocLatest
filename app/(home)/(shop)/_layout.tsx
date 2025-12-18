import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { usePathname } from 'expo-router';

const _layout = () => {
    const pathname = usePathname();

    const isTabActive = (tabPath: string) => {
        // console.log('tabpath', tabPath, pathname);
        return pathname === tabPath;
    };
    return (
        <View style={styles.container}>
            <View>
                <Text className='bg-purple-950 italic text-white text-center text-3xl font-bold pt-5'>Coupons</Text>
            </View>
            <Tabs>
                <TabList style={styles.tabList}>
                    <TabTrigger name="index" href="/(home)/(shop)" style={styles.tabTriggerBtn}>
                        <Text style={isTabActive('/') ? styles.activeTabButton : styles.tabButton}>Brands</Text>
                    </TabTrigger>
                    <TabTrigger name="brands" href="/(home)/(shop)/categories" style={styles.tabTriggerBtn}>
                        <Text style={isTabActive('/categories') ? styles.activeTabButton : styles.tabButton}>Categories</Text>
                    </TabTrigger>
                </TabList>
                <View style={{ flex: 1 }}>
                    <TabSlot />
                </View>
            </Tabs>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center'
    },
    cusotmTabs: {
        padding: 10,
        borderBottomWidth: 2,
        flexDirection: 'row',
        backgroundColor: '#f8f8f8'

    },
    tabList: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#3c0366',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    tabTriggerBtn: {
        width: '50%',
    },
    tabButton: {
        width: '100%',
        // paddingHorizontal: 15,
        // paddingVertical: 8,
        // borderRadius: 5,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 16,
        color: 'white',
    },
    activeTabButton: {
        backgroundColor: '#3c0366',
        textAlign: 'center', // Example active background color
        fontSize: 16,
        color: '#f3e8ff',
        borderBottomWidth: 2,
        borderBottomColor: '#f3e8ff',
        paddingVertical: 16,
        fontWeight: '600'
    },
    tabText: {
        fontSize: 16,
        color: '#9810fa',
    },
    activeTabText: {
        color: '#fff', // Example active text color
        fontWeight: 'bold',
    },
});

export default _layout