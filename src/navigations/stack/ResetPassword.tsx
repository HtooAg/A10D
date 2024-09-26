import {AlignLeft, ArrowLeft} from 'lucide-react-native';
import React, {FC, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {screenWidth} from '../Header';
import {NavigationType} from '../../type_hint/navType';
import {mainStyles} from '../../components/MainStyle';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useForm} from 'react-hook-form';
import {singleRequest} from '../../api/Api';
import {useDispatch, useSelector} from 'react-redux';

const ResetPassword: FC<NavigationType> = ({navigation, route}) => {
  // Old OTP
  const {keyData, otp, email} = route.params;
  console.log('Key data:', keyData, 'OTP data:', otp, 'Email:', email);
  const loginUser = useSelector(state => state.login.loginUser);
  const CELL_COUNT = 4;

  const [value, setValue] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [newOtpValue, setNewOtpValue] = useState(''); 
  const [keyValue, setKeyValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // New OTP
  const onSubmit = async () => {
    console.log('Submitted Data: ', loginUser.user);
    try {
      const response = await singleRequest(
        `api/v1/users/resent-otp?email=${email}`,
      );
      Alert.alert('Alert', response.data.message);
      setOtpValue(response.data.data.otp);
      setKeyValue(response.data.data.key);

      console.log('API Response:', response.data);

      console.log('New OTP:', response.data.data.otp);
    } catch (error) {
      console.error('Error during reset:', error);
    }
  };

  const confirmSubmit = () => {
    console.log('Input Value: ',value,'Old OTP:', otp,'newOTP', otpValue);

    if (CELL_COUNT !== 4 || value.length === 0) {
      Alert.alert('Alert', 'Please enter valid OTP');
    } else if (value == otp || value == otpValue) {
      console.log('OTP Matched');
      // OTP is correct
      navigation.navigate('ResetScreen', {
        email: email,
        otp: otpValue ? otpValue : otp,
        keyData: keyValue ? keyValue : keyData,
      });
    } else {
      // OTP is incorrect
      Alert.alert('Alert', 'OTP Mismatched');
      console.log('OTP DisMatched');
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bluePart,
          {
            width: screenWidth * 2,
            height: screenWidth,
            borderRadius: (screenWidth * 2) / 2,
          },
        ]}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}>
          <ArrowLeft color={'#fff'} size={25} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Verify your email</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTxt_header}>
          Please enter the 4-digit code sent to your email
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          testID="my-code-input"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.resendTxt}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={confirmSubmit}>
          <Text style={styles.buttonTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bluePart: {
    position: 'absolute',
    top: -screenWidth / 4,
    backgroundColor: '#0032fc',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  header: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconContainer: {
    position: 'absolute',
    left: 20,
  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
    top: screenWidth / 3,
    left: screenWidth / 4,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    top: screenWidth / 1.5,
  },
  cardTxt_header: {
    color: '#666',
    width: 300,
    textAlign: 'center',
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsRegular,
    marginBottom: 10,
  },
  codeFieldRoot: {
    marginTop: 20,
    columnGap: 10,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#e3e3e3',
  },
  focusCell: {
    borderColor: '#000',
    color: '#000',
  },
  button: {
    backgroundColor: mainStyles.backgroundColor,
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 18,
    fontFamily: mainStyles.fontPoppinsItalic,
  },
  resendTxt: {
    color: 'purple',
    textDecorationLine: 'underline',
  },
});

export default ResetPassword;
