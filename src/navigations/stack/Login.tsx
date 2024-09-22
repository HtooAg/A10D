import {
  ArrowLeft,
  Eye,
  LockIcon,
  Mail,
  EyeOff,
  Check,
} from 'lucide-react-native';
import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {postRequest} from '../../api/Api';
import {useDispatch, useSelector} from 'react-redux';
import {addLoginUser} from '../../features/login/loginSlice';
import {addRegisterUser} from '../../features/register/RegisterSlice';
import { mainStyles } from '../../components/MainStyle';

const Login: FC<{navigation: any; spaceId: string}> = ({
  navigation,
  spaceId,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      space_id: spaceId,
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.login.loginUser);
  const RegisterUser = useSelector(state => state.register.registerUser);

  // const userEmail = RegisterUser?.email;
  // const userPassword = RegisterUser?.password;
  console.log('Login: ', loginUser);
  // console.log('Login Detail : ', loginUser.email);
  // console.log('Register: ', RegisterUser);
  // console.log('Register Detail : ', RegisterUser.trim().name);
  // Object.keys(RegisterUser).map(key => {
  //   console.log(`${key}: ${RegisterUser[key]}`);
  // });

  const onSubmit = async loginData => {
    try {
      const fetchAPI = await postRequest(
        '/api/v1/users/user-login?',
        loginData,
      );

      
        console.log('Login Data: ',fetchAPI.data);
        
          dispatch(addLoginUser(fetchAPI.data));
        if(fetchAPI.request.status===200){

          navigation.navigate('Home', {
            screen: 'HomeStack',
            params: {
              spaceId: spaceId,
              user: loginUser,
            },
          });
        }
      
      // reset({
      //   email: '',
      //   password: '',
      //   space_id: spaceId,
      // });
    } catch (error) {
      console.log('Failed to login:', error);
    }
  };

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.card}>
      <View style={{marginTop: 20}}>
        <View style={styles.inputContainer}>
          <Mail size={20} color="#000" style={styles.inputIcon} />
          <Controller
            control={control}
            rules={{required: true}}
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
          {/* {RegisterUser?.map(user => {
            console.log('User Email: ', user.email);
            console.log('User Password: ', user.password);
            return (
              <View key={user.id}>
                <Text>{user.email}</Text>
                <Text>{user.password}</Text>
              </View>
            );
          })} */}
        </View>
        {errors.email && (
          <Text
            style={{
              color: 'red',
              paddingHorizontal: 10,
              fontSize: 10,
              fontFamily: mainStyles.fontPoppinsItalic,
            }}>
            Email is required.
          </Text>
        )}
        <View style={styles.inputContainer}>
          <LockIcon size={20} color="#000" style={styles.inputIcon} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#000"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
              />
            )}
            name="password"
          />
          <TouchableOpacity
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => setShowPassword(!showPassword)}
            style={[
              styles.eye_icon,
              {backgroundColor: isPressed ? '#000' : '#fff'},
            ]}>
            {showPassword ? (
              <Eye size={20} color="#000" />
            ) : (
              <EyeOff size={20} color="#000" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text
            style={{
              color: 'red',
              paddingHorizontal: 10,
              fontSize: 10,
              fontFamily: mainStyles.fontPoppinsItalic,
            }}>
            Password is required.
          </Text>
        )}

        {loginUser.status === 'fail' && (
          <Text
            style={{
              color: 'red',
              paddingHorizontal: 10,
              fontSize: 10,
              fontFamily: mainStyles.fontPoppinsItalic,
            }}>
            {loginUser.message}
          </Text>
        )}

        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)}>
            {rememberMe && <Check size={20} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 24,
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    top: '20%',
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsItalic,
  },
  eye_icon: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2563eb',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  rememberText: {
    fontSize: mainStyles.textFontSize,
    color: '#666',
    fontFamily: mainStyles.fontPoppinsItalic,
  },
  loginButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: mainStyles.fontPoppinsSemiBoldItalic,
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: mainStyles.textFontSize,
    color: '#000',
    fontFamily: mainStyles.fontPoppinsItalic,
  },
});

export default Login;
