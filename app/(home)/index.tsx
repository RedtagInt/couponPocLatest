import { View, Button, StyleSheet, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '../../contexts/authContext';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomsheet from '@/components/CustomBottomsheet';
import CommonWrapper from '@/components/CommonWrapper';
import { RadioButton, TextInput, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { APIEndpoints, UsermobKey } from '@/constants/appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/services/homeservice';
import { fetchData, postData } from '@/services/baseservice';



const Index = () => {
  const [isSelected, setIsSelected] = React.useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const [userMob, setUserMob] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserMob();
  }, []);

  const getUserMob = async () => {
    const mob = await AsyncStorage.getItem(UsermobKey);
    if (mob) {
      console.log('user mobile number', mob);
      setUserMob(mob);
      checkUserExist(mob);
      console.log('userData', JSON.stringify(userData));
    }
  }

  const checkUserExist = async (mob: any) => {
    const fetchedData = await fetchData(APIEndpoints.getUser + '/' + mob);
    console.log('fetcheduser', fetchedData);

    if (fetchedData && fetchedData.data && fetchedData.status.code === 200) {
      setUserData(fetchedData);
    } else {
      handlePresentPress();
    }
  }

  const handleLogout = () => {
    logout();
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsSelected(false)
  }, []);

  const [date, setDate] = useState(new Date());
  const [mode, setMode]: any = useState('date');
  const [show, setShow] = useState(false);


  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    handleInputChange('dob', selectedDate)
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [formData, setFormData] = useState<UserProfile>({
    gender: '',
    firstName: '',
    lastName: '',
    mobileNo: null,
    email: '',
    dob: '',
    referralCode: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.dob) {
      newErrors.dob = 'DOB is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    // if (!formData.password) {
    //   newErrors.password = 'Password is required';
    // } else if (formData.password.length < 6) {
    //   newErrors.password = 'Password must be at least 6 characters';
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const addUser = async () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Perform further actions like sending data to an API
      const tempObj = {
        mobileNo: Number(userMob),
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        birthMonth: new Date(formData.dob).getMonth(),
        birthYear: new Date(formData.dob).getFullYear(),
        gender: Number(formData.gender)
      }
      console.log('tempObj', tempObj);
      const createdUserdata = await postData(APIEndpoints.addUser, tempObj);
      console.log('created user', createdUserdata);

      if (createdUserdata && createdUserdata.data && createdUserdata.status.code === 200) {
        handleClosePress();
      } else {

      }
    } else {
      console.log('Form has errors.');
    }
  }


  return (
    <CommonWrapper>
      <View style={{ flex: 1 }}>
        {/* <Button title="Open Bottom Sheet" onPress={handlePresentPress} /> */}
        {/* <Button title="Close Bottom Sheet" onPress={handleClosePress} /> */}
        <Button title="Logout" onPress={handleLogout} />
        <Button title="Logout" onPress={handleLogout} />
        <Text>Hello {userMob}</Text>
        <CustomBottomsheet ref={bottomSheetRef} title='New Bottomsheet'>
          <View>
            <TextInput style={styles.input}
              mode="outlined"

              label=""
              placeholder="First Name"
              onChangeText={text => handleInputChange('firstName', text)}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            <TextInput style={styles.input}
              mode="outlined"
              label=""
              placeholder="Last Name"
              onChangeText={text => handleInputChange('lastName', text)}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
            {/* <TextInput style={styles.input}
              mode="outlined"
              label=""
              placeholder="Mobile No."
              onChangeText={text => handleInputChange('mobileNo', text)}
            /> */}
            <Text variant="titleMedium">What do you identify as</Text>
            <RadioButton.Group onValueChange={newValue => handleInputChange('gender', newValue)} value={formData.gender}>
              <View>
                <Text variant="titleSmall">Male</Text>
                <RadioButton value="1" />
              </View>
              <View>
                <Text variant="titleSmall">Female</Text>
                <RadioButton value="2" />
              </View>
              <View>
                <Text variant="titleSmall">Other</Text>
                <RadioButton value="3" />
              </View>
            </RadioButton.Group>
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
            <Button onPress={showDatepicker} title="Select Date of Birth!" />
            {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
            {/* <Text>selected: {date.toLocaleString()}</Text> */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
            {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
            <Text variant="titleMedium">Enter Email ID</Text>
            <TextInput style={styles.input}
              mode="outlined"
              label=""
              placeholder="Enter Email ID"
              onChangeText={text => handleInputChange('email', text)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <Text variant="titleMedium">Referral Code (Optional)</Text>
            <TextInput style={styles.input}
              mode="outlined"
              label=""
              placeholder="Referral Code (Optional)"
              onChangeText={text => handleInputChange('referralCode', text)}
            />
            {errors.referralCode && <Text style={styles.errorText}>{errors.referralCode}</Text>}
            <Button onPress={addUser} title="Confirm" />
          </View>
        </CustomBottomsheet>
      </View>
    </CommonWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 25, // Fixed height of 40 points
    width: 200,  // Fixed width of 200 points
    paddingHorizontal: 2,
    paddingVertical: 10
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default Index