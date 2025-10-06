import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { APIEndpoints } from '@/constants/appConstants';
import { fetchData } from '@/services/baseservice';

const Index = () => {
  const [allCategories, setData] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);


  const getCategories = async () => {
    const fetchedData = await fetchData(APIEndpoints.getAllCategories);
    // console.log('fetcheduser', fetchedData);
    if (fetchedData && fetchedData.data && fetchedData.status.code === 200) {
      setData(fetchedData.data);
    }

    console.log('allCategories', allCategories);
  }

  if (allCategories.length) {
    return (
      <View>
        <Text>Categories</Text>
        <View style={styles.container}>
          <Text style={styles.header}>Categories</Text>
          {allCategories.map((category: any) => (
            <View key={category._id} style={styles.categoryItem}>
              <Text style={styles.categoryName}>{category.categoryName}</Text>
              <Text style={styles.categoryName}>{category.categoryLink}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  } else {
    return (
      <View>
        <Text>Categories</Text>
        <View style={styles.container}>
          <Text style={styles.header}>Categories</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryItem: {
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Index