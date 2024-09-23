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
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {postRequest} from '../../api/Api';
import {useDispatch, useSelector} from 'react-redux';
import {addRegisterUser} from '../../features/register/RegisterSlice';

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
  const RegisterUser = useSelector(state => state.register.registerUser);

  const userEmail = RegisterUser?.email;
  const userPassword = RegisterUser?.password;

  console.log('Register User:', userEmail);

  const onSubmit = async loginData => {
    try {
      const fetchAPI = await postRequest('/api/v1/users/user-login', loginData);
      const apiResponseData = fetchAPI?.data;

      if (apiResponseData) {
        dispatch(addRegisterUser(apiResponseData));

        // Navigate to Home if login is successful
        if (
          loginData.email === apiResponseData.email &&
          loginData.password === apiResponseData.password
        ) {
          navigation.navigate('Home', {
            screen: 'HomeStack',
            params: {
              spaceId: spaceId,
              userId: apiResponseData.id,
            },
          });
        }
      }

      reset({
        email: '',
        password: '',
        space_id: spaceId,
      });
    } catch (error) {
      console.log('Failed to login:', error);
      // You can display an error message to the user here
    }
  };

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.card}>
      <View style={{marginTop: 20}}>
        {/* Email Input */}
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
        </View>
        {errors.email && (
          <Text style={{color: 'red', paddingHorizontal: 10}}>
            Email is required.
          </Text>
        )}

        {/* Password Input */}
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
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye size={20} color="#000" />
            ) : (
              <EyeOff size={20} color="#000" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={{color: 'red', paddingHorizontal: 10}}>
            Password is required.
          </Text>
        )}

        {/* Remember Me */}
        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)}>
            {rememberMe && <Check size={20} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
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
    fontSize: 16,
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
    fontSize: 14,
    color: '#666',
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
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login;
