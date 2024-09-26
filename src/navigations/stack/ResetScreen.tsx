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

const ResetScreen: FC<NavigationType> = ({navigation, route}) => {
  const {email, keyData, otp} = route.params;
  const loginUser = useSelector(state => state.login.loginUser);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({values: {password: ''}});
  const dispatch = useDispatch();

  const onSubmit = async (data: {password: string}) => {
    console.log('Submitted Data: ', data.password, otp, email, keyData);

    try {
      const response = await singleRequest(
        `/api/v1/users/reset-password?email=${email}&key=${keyData}&otp=${otp}&new-password=${data.password}`,
      );
      Alert.alert('Alert', response.data.message);
      console.log('API Response:', response.data);

     if (response.data.status === 'success') {
       navigation.navigate('Login');
     }
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
        <Text style={styles.headerTxt}>Reset Password</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTxt_header}>
          Enter the email address associated with your account.
        </Text>

        <Controller
          control={control}
          rules={{
            required: 'New Password is required',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Enter New Password"
              placeholderTextColor="#000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors?.password && (
          <Text
            style={{
              color: 'red',
              fontSize: mainStyles.textFontSize,
              fontFamily: mainStyles.fontPoppinsItalic,
            }}>
            {errors.password.message}
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

export default ResetScreen;
