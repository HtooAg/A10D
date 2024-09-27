import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {AlignLeft, Eye, EyeOff} from 'lucide-react-native';
import Header from '../Header';
import {NavigationType} from '../../type_hint/navType';
import {mainStyles} from '../../components/MainStyle';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {patchRequest} from '../../api/Api';
import {addLoginUser} from '../../features/login/loginSlice';

type ChangeData = {
  oldPassword: string;
  newPassword: string;
};

const Change: FC<NavigationType> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
    },
  });
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get('window').width;

  const [showPassword, setShowPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showType, setShowType] = useState(false);
  const loginUser = useSelector(state => state.login.loginUser);
  const RegisterUser = useSelector(state => state.register.registerUser);
  console.log('Register User Data: ', RegisterUser);

  console.log('Login User:', loginUser?.user);

  const onSubmit = async (loginData: ChangeData) => {
    try {
      const fetchAPI = await patchRequest(
        `/api/v1/users/change-password?old-password=${loginData.oldPassword}&new-password=${loginData.newPassword}`,
      );

      console.log('Login Data: ', fetchAPI.data);
      dispatch(addLoginUser(fetchAPI.data.data || fetchAPI.data));

      if (fetchAPI.data.status === 'success') {
        navigation.navigate('Login', {
          screen: 'Login',
          params: {
            user: loginUser.user,
            token: loginUser.token,
          },
        });
      }

      Alert.alert('Alert', fetchAPI.data.message);
      reset({
        newPassword: '',
        oldPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log('Failed to login:', error);
      // You can display an error message to the user here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <View style={{top: screenWidth / 25, rowGap: 20}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{right: screenWidth / 3}}>
            <AlignLeft color={'#fff'} size={35} />
          </TouchableOpacity>
          <View style={{right: screenWidth / 8}}>
            <Text style={styles.headerTitle}>Change</Text>
            <Text style={styles.headerTitle}>Password</Text>
          </View>
        </View>
      </Header>

      {/* KeyboardAvoidingView added to handle input focus */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={screenWidth / 2.5}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{...styles.card, top: screenWidth / 2.5}}>
            <View>
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{required: 'Current Password is required!'}}
                  name="oldPassword"
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Current Password"
                      placeholderTextColor="#000"
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showPassword}
                    />
                  )}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye size={20} color="#000" />
                  ) : (
                    <EyeOff size={20} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
              {errors?.oldPassword && (
                <Text
                  style={{
                    color: 'red',
                    paddingHorizontal: 10,
                    fontSize: 10,
                    fontFamily: mainStyles.fontPoppinsItalic,
                  }}>
                  {errors?.oldPassword.message}
                </Text>
              )}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="newPassword"
                  rules={{
                    required: 'New Password is required!',
                    validate: value => {
                      if (RegisterUser.password === value) {
                        return 'New password cannot be the same as the old password.';
                      }
                      return true;
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.input}
                      placeholder="New Password"
                      placeholderTextColor="#000"
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showReset}
                    />
                  )}
                />
                <TouchableOpacity onPress={() => setShowReset(!showReset)}>
                  {showReset ? (
                    <Eye size={20} color="#000" />
                  ) : (
                    <EyeOff size={20} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
              {errors?.newPassword && (
                <Text
                  style={{
                    color: 'red',
                    paddingHorizontal: 10,
                    fontSize: 10,
                    fontFamily: mainStyles.fontPoppinsItalic,
                  }}>
                  {errors?.newPassword.message}
                </Text>
              )}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Confirm Password is required!',
                    validate: value => {
                      if (value !== getValues('newPassword')) {
                        return 'Passwords do not match!';
                      }
                      return true;
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#000"
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showType}
                    />
                  )}
                />
                <TouchableOpacity onPress={() => setShowType(!showType)}>
                  {showType ? (
                    <Eye size={20} color="#000" />
                  ) : (
                    <EyeOff size={20} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
              {errors?.confirmPassword && (
                <Text
                  style={{
                    color: 'red',
                    paddingHorizontal: 10,
                    fontSize: 10,
                    fontFamily: mainStyles.fontPoppinsItalic,
                  }}>
                  {errors?.confirmPassword.message}
                </Text>
              )}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.loginButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },
  headerTitle: {
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsBold,
    color: 'white',
  },
  card: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsItalic,
  },
  loginButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '70%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: mainStyles.fontPoppinsSemiBoldItalic,
    textTransform: 'uppercase',
  },
});

export default Change;
