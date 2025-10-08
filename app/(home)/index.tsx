import { View, Button, StyleSheet, Pressable, TextInput, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../../contexts/authContext';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomsheet from '@/components/CustomBottomsheet';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { APIEndpoints, UserDataKey, UsermobKey } from '@/constants/appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/services/homeservice';
import { fetchData, postData } from '@/services/baseservice';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";


const Index = () => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [userMob, setUserMob] = useState('');
  const [userData, setUserData] = useState(null);
  const { createUserData } = useAuth();

  useEffect(() => {
    getUserMob();
  }, []);

  const getUserMob = async () => {
    const mob = await AsyncStorage.getItem(UsermobKey);
    if (mob) {
      setUserMob(mob);
      checkUserExist(mob);
    }
  }

  const checkUserExist = async (mob: any) => {
    const fetchedData = await fetchData(APIEndpoints.getUser + '/' + mob);
    // console.log('fetcheduser', fetchedData);
    if (fetchedData && fetchedData.data && fetchedData.status.code === 200) {
      createUserData(fetchedData.data);
    } else {
      handlePresentPress();
    }
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
      // console.log('Form submitted:', formData);
      // Perform further actions like sending data to an API
      const tempObj = {
        mobileNo: Number(userMob),
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        birthMonth: new Date(formData.dob).getMonth(),
        birthYear: new Date(formData.dob).getFullYear(),
        gender: Number(formData.gender)
      }
      // console.log('tempObj', tempObj);
      const createdUserdata = await postData(APIEndpoints.addUser, tempObj);
      // console.log('created user', createdUserdata);

      if (createdUserdata && createdUserdata.data && createdUserdata.status.code === 200) {
        await AsyncStorage.setItem(UserDataKey, createdUserdata.data);
        handleClosePress();
      } else {

      }
    } else {
      console.log('Form has errors.');
    }
  }

  type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
  const genderOptions: { label: string; value: string; icon: IconName }[] = [
    { label: "Male", value: "1", icon: "gender-male" },
    { label: "Female", value: "2", icon: "gender-female" },
    { label: "Other", value: "3", icon: "gender-transgender" },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* <Button title="Open Bottom Sheet" onPress={handlePresentPress} /> */}
      {/* <Button title="Close Bottom Sheet" onPress={handleClosePress} /> */}

      <CustomBottomsheet ref={bottomSheetRef} title='New Bottomsheet'>
        <View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-lg font-bold text-black mb-2">First Name</Text>
              <TextInput style={styles.input}
                placeholder=""
                className="p-3 bg-white border border-gray-300 rounded-lg text-lg"
                onChangeText={text => handleInputChange('firstName', text)}
              />
              {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-black mb-2">Last Name</Text>
              <TextInput style={styles.input}
                placeholder=""
                className="p-3 bg-white border border-gray-300 rounded-lg text-lg"
                onChangeText={text => handleInputChange('lastName', text)}
              />
              {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
            </View>
          </View>
          {/* <TextInput style={styles.input}
              mode="outlined"
              label=""
              placeholder="Mobile No."
              onChangeText={text => handleInputChange('mobileNo', text)}
            /> */}
          <Text className="text-lg font-bold text-black mb-2 mt-4">What do you identify as</Text>
          <View className="flex-row gap-3 mb-4">
            {[
              { label: "Male", value: "1", icon: "gender-male" },
              { label: "Female", value: "2", icon: "gender-female" },
              { label: "Other", value: "3", icon: "gender-transgender" },
            ].map((item) => {
              const selected = formData.gender === item.value;
              return (
                <Pressable
                  key={item.value}
                  onPress={() => handleInputChange("gender", item.value)}
                  className={`flex-1 flex-row items-center justify-center py-3 rounded-lg border 
                    ${selected ? "bg-indigo-600 border-blue-600" : "bg-white border-gray-300"}`}
                >
                  <MaterialCommunityIcons
                    name={item.icon as ComponentProps<typeof MaterialCommunityIcons>["name"]}
                    size={24}
                    color={selected ? "white" : "black"}
                  />
                  <Text
                    className={`font-medium text-lg ml-2 ${selected ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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
          <Text className="text-lg font-bold text-black mb-2 mt-4">Enter Email ID</Text>
          <TextInput style={styles.input}
            // mode="outlined"
            // label=""
            placeholder="Enter Email ID"
            className="p-3 bg-white border border-gray-300 rounded-lg text-lg"
            onChangeText={text => handleInputChange('email', text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <Text className="text-lg font-bold text-black mb-2 mt-4">Referral Code (Optional)</Text>
          <TextInput style={styles.input}
            // mode="outlined"
            // label=""
            placeholder="Referral Code (Optional)"
            className="p-3 bg-white border border-gray-300 rounded-lg text-lg"
            onChangeText={text => handleInputChange('referralCode', text)}
          />
          {errors.referralCode && <Text style={styles.errorText}>{errors.referralCode}</Text>}
          {/* <Button onPress={addUser} title="Confirm" /> */}
          <Pressable className="bg-indigo-600 p-3 rounded-md mt-6" onPress={addUser}>
            <Text className="text-white text-center font-bold uppercase text-lg">Confirm</Text>
          </Pressable>
        </View>
      </CustomBottomsheet>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // height: 25,
    // width: 200,
    // paddingHorizontal: 2,
    // paddingVertical: 10
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default Index