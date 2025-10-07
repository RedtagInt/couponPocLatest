import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { usePathname } from 'expo-router';

const _layout = () => {
    const pathname = usePathname();

    const isTabActive = (tabPath: string) => {
        console.log('tabpath', tabPath, pathname);
        return pathname === tabPath;
    };
    return (
        <View style={styles.container}>
            <Tabs>
                <TabList style={styles.tabList}>
                    <TabTrigger name="index" href="/(home)/(shop)" style={styles.tabTriggerBtn}>
                        <Text style={isTabActive('/') ? styles.activeTabButton: styles.tabButton }>Categories</Text>

                    </TabTrigger>
                    <TabTrigger name="brands" href="/(home)/(shop)/brands" style={styles.tabTriggerBtn}>
                        <Text style={isTabActive('/brands') ? styles.activeTabButton: styles.tabButton  }>Brands</Text>
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
        borderBottomWidth: 2,
        borderBottomColor: 'gray',

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
         fontSize: 16,
         paddingVertical: 10
    },
    activeTabButton: {
        backgroundColor: 'white',
        textAlign: 'center', // Example active background color
        fontSize: 16,
        color: 'blue',
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
        paddingVertical: 10
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    activeTabText: {
        color: '#fff', // Example active text color
        fontWeight: 'bold',
    },
});

export default _layout