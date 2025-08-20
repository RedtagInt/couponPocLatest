import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import { OTPWidget } from '@msg91comm/sendotp-react-native';
import { OtpInput } from "react-native-otp-entry";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/authContext';

const Verify = () => {
    const { login } = useAuth();
    const route = useRoute();
    const router = useRouter();
    const navigation: any = useNavigation();

    let text: any;
    // console.log(' route.params', route.params);
    const otpReqData: any = route.params;
    const handleVerifyOtp = async (text: any) => {
        const body = {
            reqId: otpReqData.otpData.message,
            otp: text
        }
        const response = await OTPWidget.verifyOTP(body);
        // console.log('verify response', response);
        if (response && response.type === 'success') {
            // router.navigate('/(home)');
            console.log('usertoken', response.message)
            login();
            router.navigate("/(home)");  
        }
    }
    return (
        <View style={styles.container}>
            <OtpInput numberOfDigits={4} onFilled={(text) => handleVerifyOtp(text)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default Verify