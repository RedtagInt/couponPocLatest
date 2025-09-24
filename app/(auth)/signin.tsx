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

export default function Signin() {

  useEffect(() => {
    OTPWidget.initializeWidget(widgetId, tokenAuth); //Widget initialization
  }, []);

  let [number, setNumber] = useState('');
  let [otpRes] = useState('');
   const navigation: any = useNavigation();

  const handleSendOtp = async () => {
    const data = {
      identifier: 91 + number
    }
    // console.log(data, number);
    const response = await OTPWidget.sendOTP(data);
    console.log(response);
    if (response && response.type === 'success') {
      response.number = number;
      otpRes = response;
      number = '';
      navigation.navigate("verify", {otpData: response});
    }
  }
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Mobile Number</Text>
      <Text style={styles.subtitle}>To log in or join CouponApp</Text>
      <TextInput
        placeholder='Mobile Number'
        value={number}
        keyboardType='numeric'
        maxLength={10}
        style={styles.input}
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
        <Text style={styles.buttonText}>
          Send OTP
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        By continuing you agree to our <Text style={styles.link}>Privacy notice</Text>
      </Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 36,
    backgroundColor: '#000'
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#b9b9b9ff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#FF5A00', // orange like your screenshot
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  link: {
    color: '#FF5A00',
    textDecorationLine: 'underline',
  },
})
