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
import {addUser} from '../../features/login/loginSlice';

const Login: FC<{navigation: any; spaceId: string}> = ({
  navigation,
  spaceId,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      space_id: spaceId,
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const {loginUser} = useSelector(state => state.login.login);

  console.log(loginUser);

  const onSubmit = async loginData => {
    try {
      const fetchAPI = await postRequest(
        '/api/v1/users/user-login?',
        loginData,
      );

      //  const serializableData = {
      //    data: fetchAPI.config.data,
         
      //    message: fetchAPI.data.message,
      //    status: fetchAPI.status,
      //  };
      // console.log(fetchAPI.config);
      dispatch(addUser(fetchAPI.config.data));
      if(fetchAPI.status === 200){
        navigation.navigate('Home', {
          screen: 'HomeStack',
          params: {
            spaceId: spaceId,
            userId: fetchAPI.config.data.id,
          },
        });
      }
    } catch (error) {
      console.log('Failed to login:', error);
    }
  };

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        </View>
        {errors.email && (
          <Text style={{color: 'red', paddingHorizontal: 10}}>
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
