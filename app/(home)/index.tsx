import { View, Button, StyleSheet } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../../contexts/authContext';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomsheet from '@/components/CustomBottomsheet';
import CommonWrapper from '@/components/CommonWrapper';
import { RadioButton, TextInput , Text} from 'react-native-paper';



const Index = () => {

  const [isSelected, setIsSelected] = React.useState(false);
  const { isAuthenticated, login, logout } = useAuth();
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

  const [value, setValue] = React.useState('first');

  return (
    <CommonWrapper>
      <View style={{ flex: 1 }}>
        <Button title="Open Bottom Sheet" onPress={handlePresentPress} />
        <Button title="Close Bottom Sheet" onPress={handleClosePress} />
        <CustomBottomsheet ref={bottomSheetRef} title='New Bottomsheet'>
          <View>
            <Text variant="titleMedium">What do you identify as</Text>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <View>
                <Text variant="titleSmall">Male</Text>
                <RadioButton value="male" />
              </View>
              <View>
                <Text variant="titleSmall">Female</Text>
                <RadioButton value="female" />
              </View>
              <View>
                <Text variant="titleSmall">Other</Text>
                <RadioButton value="other" />
              </View>
            </RadioButton.Group>

            <Text variant="titleMedium">Enter your birth month and year</Text>
            <TextInput></TextInput>

            <Text variant="titleMedium">Enter Email ID</Text>
            <TextInput
              mode="outlined"
              label=""
              placeholder="Enter Email ID"
              right={<TextInput.Affix text="/100" />}
            />

            <Text variant="titleMedium">Referral Code (Optional)</Text>
            <TextInput
              mode="outlined"
              label=""
              placeholder="Referral Code (Optional)"
              right={<TextInput.Affix text="/100" />}
            />

          </View>
        </CustomBottomsheet>
      </View>
    </CommonWrapper>
  );
};


export default Index