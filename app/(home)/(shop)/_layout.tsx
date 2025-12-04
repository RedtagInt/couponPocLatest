import { View, Text, StyleSheet } from 'react-native'
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
            <Tabs>
                <TabList style={styles.tabList}>
                    <TabTrigger name="index" href="/(home)/(shop)/categories" style={styles.tabTriggerBtn}>
                        <Text style={isTabActive('/categories') ? styles.activeTabButton: styles.tabButton }>Categories</Text>
                    </TabTrigger>
                    <TabTrigger name="brands" href="/(home)/(shop)" style={styles.tabTriggerBtn}>
                        <Text style={isTabActive('/') ? styles.activeTabButton: styles.tabButton  }>Brands</Text>
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
        backgroundColor: '#ffffff',
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
    tabTriggerBtn: {
        width: '50%',
        // padding: 10
    },
    tabButton: {
        width: '100%',
        // paddingHorizontal: 15,
        // paddingVertical: 8,
        // borderRadius: 5,
         flexDirection: 'row',
         textAlign: 'center',
         fontSize: 18,
         paddingVertical: 16
    },
    activeTabButton: {
        backgroundColor: 'white',
        textAlign: 'center', // Example active background color
        fontSize: 18,
        color: '#4f39f6',
        borderBottomWidth: 2,
        borderBottomColor: '#4f39f6',
        paddingVertical: 16,
        fontWeight: '600'
    },
    tabText: {
        fontSize: 16,
        color: '#d1d5dc',
    },
    activeTabText: {
        color: '#fff', // Example active text color
        fontWeight: 'bold',
    },
});

export default _layout