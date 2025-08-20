import { useAuth } from "@/contexts/authContext";
import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Modal, SafeAreaView, TouchableOpacity } from 'react-native';
// import { OTPVerification } from '@msg91comm/react-native-sendotp';
import { OTPWidget } from '@msg91comm/sendotp-react-native';
const widgetId = "3568746a614a353031343431";
const tokenAuth = "420946ToQK9IJX68a59e31P1";

export default function SignIn() {

  useEffect(() => {
    OTPWidget.initializeWidget(widgetId, tokenAuth); //Widget initialization
  }, []);

  const [number, setNumber] = useState('');


  const handleSendOtp = async () => {
    const data = {
      identifier: number
    }
    console.log(data, number);
    const response = await OTPWidget.sendOTP(data);
    console.log(response);
  }
  const { login } = useAuth();
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);

  const gotodash = () => {
    router.navigate('/(home)');
  }
  return (

    // <SafeAreaView style={styles.container}>
    //   <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
    //     <Text>Login With OTP</Text>
    //   </TouchableOpacity>

    //   <Modal visible={isModalVisible}>
    //     <OTPVerification 
    //       onVisible={isModalVisible} 
    //       onCompletion={(data) => {
    //         console.log('otp success', data)                       // Get your response of success/failure.
    //         setModalVisible(false)
    //         router.navigate('/(home)');
    //       }} 
    //       widgetId={'3568746a614a353031343431'}     // Get widgetId from MSG91 OTP Widget Configuration
    //       authToken={'420946ToQK9IJX68a59e31P1'}   // Get authToken from MSG91 OTP Tokens
    //     />
    //   </Modal>
    // </SafeAreaView>
    // <View style={{ flex: 1, alignItems: "center" }}>
    //   <Text  style={styles.textA}>OTP Verification</Text>
    //   <Text style={styles.text}>Enter a phone number to send one time password</Text>
    //   <TextInput style={styles.textinputstyle}></TextInput>

    //   <Button title="Log In" onPress={login} />
    // </View>
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
                onPress={()=>{
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
