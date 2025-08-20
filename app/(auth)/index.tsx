import { useAuth } from "@/contexts/authContext";
import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Modal, SafeAreaView, TouchableOpacity } from 'react-native';
// import { OTPVerification } from '@msg91comm/react-native-sendotp';
import { OTPWidget } from '@msg91comm/sendotp-react-native';
import {MsgAPiTokenAuth, MsgApWidgetId} from '../../constants/appConstants'
import { useNavigation } from "@react-navigation/native";
const widgetId = MsgApWidgetId;
const tokenAuth = MsgAPiTokenAuth;

export default function SignIn() {

  useEffect(() => {
    OTPWidget.initializeWidget(widgetId, tokenAuth); //Widget initialization
  }, []);

  let [number, setNumber] = useState('');
  let [otpRes] = useState('');
   const navigation: any = useNavigation();

  const handleSendOtp = async () => {
    const data = {
      identifier: number
    }
    // console.log(data, number);
    const response = await OTPWidget.sendOTP(data);
    // console.log(response);
    if (response && response.type === 'success') {
      number = '';
      otpRes = response;
      navigation.navigate("verify", {otpData: response});  
    }
  }
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Number'
        value={number}
        keyboardType='numeric'
        style={{ backgroundColor: '#ededed', margin: 10 }}
        onChangeText={(text) => {
          setNumber(text)
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSendOtp()
        }}
      >
        <Text>
          Send OTP
        </Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#C0EDD2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    margin: 14
  },
  textinputstyle: {
    height: 40,
    // width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  textA: {
    fontSize: 16,
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
  },
})
