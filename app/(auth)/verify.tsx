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
            // console.log('usertoken', response.message)
            login(otpReqData.otpData.number, response.message);
            // router.navigate("/(home)");  
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <OtpInput numberOfDigits={4} focusColor="orange" onFilled={(text) => handleVerifyOtp(text)} theme={{ pinCodeTextStyle: styles.Text, }} />
        </View>
    )
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
        marginBottom: 36,
    },
    Text: {
        color: '#fff'
    }
});

export default Verify