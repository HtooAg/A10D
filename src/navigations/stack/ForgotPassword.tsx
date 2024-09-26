import {AlignLeft, ArrowLeft} from 'lucide-react-native';
import React, {FC} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import Header, {screenWidth} from '../Header';
import {NavigationType} from '../../type_hint/navType';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-gesture-handler';
import {mainStyles} from '../../components/MainStyle';
import {useDispatch, useSelector} from 'react-redux';
import {singleRequest} from '../../api/Api';
import {addResetUser} from '../../features/reset/ResetSlice';

const ForgotPassword: FC<NavigationType> = ({navigation, route}) => {
  const loginUser = useSelector(state => state.login.loginUser);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({values: {email: loginUser.user.email}});
  const dispatch = useDispatch();
  console.log(loginUser.user.email);

  const onSubmit = async (data: {email: string}) => {
    console.log('Submitted Data: ', data);
    try {
      const response = await singleRequest(
        `api/v1/users/forgot-password?email=${data.email}`,
      );
      Alert.alert('Alert', response.data.message);

      // Dispatching the relevant part of the response (the key, otp, and email)
      dispatch(addResetUser(response.data.data));
      console.log('API Response:', response.data);

      // Navigate to ResetPassword screen with the reset key data
      navigation.navigate('ResetPassword', {
        keyData: response.data.data.key,
        otp: response.data.data.otp,
        email: data.email,
      });

      //  console.log(first)
    } catch (error) {
      console.error('Error during reset:', error);
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
        <Text style={styles.headerTxt}>Forgot Password</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTxt_header}>
          Enter the email address associated with your account.
        </Text>

        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            validate: value => {
              if (!value.includes('@')) {
                return 'Please enter a valid email address';
              }
              return true;
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
          name="email"
        />
        {errors?.email && (
          <Text
            style={{
              color: 'red',
              fontSize: mainStyles.textFontSize,
              fontFamily: mainStyles.fontPoppinsItalic,
            }}>
            {errors.email.message}
          </Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonTxt}>Reset Password</Text>
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
    top: -screenWidth / 4, // Adjusting based on screen size
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
    top: screenWidth / 350,
    // flex: 0.3, // Header now takes less space
  },
  iconContainer: {
    position: 'absolute',
    left: 20,
  },
  headerTxt: {
    color: '#fff',
    fontFamily: mainStyles.fontPoppinsBold,
    fontSize: 25,
    letterSpacing: 1,
    top: screenWidth / 3.5, // Adjusted based on screen size
    left: screenWidth / 4,
  },
  card: {
    // flex: 5, // Card takes more space now
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    top: screenWidth / 1.5,
  },
  cardTxt_header: {
    color: '#666',
    width: 350,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: mainStyles.fontPoppinsRegular,
    marginBottom: 10,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#000',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsItalic,
    width: 350,
    marginVertical: 10,
    backgroundColor: '#e3e3e3',
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
});

export default ForgotPassword;
