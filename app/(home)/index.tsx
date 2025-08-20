import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../../contexts/authContext';

const Index = () => {
const { isAuthenticated, login, logout } = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (

    <View>
      <Text>Welocme to Dashboard</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default Index