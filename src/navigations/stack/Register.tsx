import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import {
  Eye,
  LockIcon,
  Mail,
  EyeOff, User,
  Fingerprint,
  Phone,
  AlertTriangle
} from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { NavigationType } from '../../type_hint/navType';
import { FC, useState } from 'react';
import { postRequest } from '../../api/Api';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';


type RegisterData = {
  name: string;
  email: string;
  password: string;
  space_id: number;
  staffid: string;
  phoneNo: string;
};

const Register: FC<NavigationType> = ({navigation, spaceId}) => {

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      space_id: spaceId,
      staffid: '',
      phoneNo: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (registerData: RegisterData) => {
    try {
      const response = await postRequest(
        '/api/v1/users/register',
        registerData,
      );

      // console.log(response.data)
      

      if (response.data.status === 'fail') {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Warning',
          textBody: response.data.message,
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Register successful!',
        });
      }
    reset({
      name: '',
      email: '',
      password: '',
      space_id: spaceId,
      staffid: '',
      phoneNo: '',
    });
      // navigation.navigate('Home');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={{marginTop: 20}}>
        <View style={styles.inputContainer}>
          <User size={20} color="#000" style={styles.inputIcon} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Name"
                placeholderTextColor="#000"
              />
            )}
            name="name"
          />
        </View>
        {errors?.name && (
          <Text style={{color: 'red', fontSize: 10}}>Name is required.</Text>
        )}

        <View style={styles.inputContainer}>
          <Phone size={20} color="#000" style={styles.inputIcon} />
          <Controller
            control={control}
            rules={{
              validate: value => {
                if (!value) {
                  return 'Phone number is required';
                }
                if (value.length !== 11) {
                  // Ensures exactly 11 digits
                  // !/^\d{11}$/.test(value);
                  return 'Phone number must be exactly 11 digits';
                }
                return true;
              },
              required: 'Phone number is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Phone"
                placeholderTextColor="#000"
                keyboardType="phone-pad"
              />
            )}
            name="phoneNo"
          />
        </View>
        {errors?.phoneNo && (
          <Text style={{color: 'red', fontSize: 10}}>
            {errors.phoneNo.message}
          </Text>
        )}

        <View style={styles.inputContainer}>
          <Mail size={20} color="#000" style={styles.inputIcon} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
                placeholderTextColor="#000"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
        </View>
        {errors?.email && (
          <Text style={{color: 'red', fontSize: 10}}>Email is required.</Text>
        )}

        <View style={styles.inputContainer}>
          <LockIcon size={20} color="#000" style={styles.inputIcon} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Password"
                placeholderTextColor="#000"
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
        {errors?.password && (
          <Text style={{color: 'red', fontSize: 10}}>
            Password is required.
          </Text>
        )}

        <View style={styles.inputContainer}>
          <Fingerprint size={20} color="#000" style={styles.inputIcon} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Staff ID"
                placeholderTextColor="#000"
                keyboardType="phone-pad"
              />
            )}
            name="staffid"
          />
        </View>
        {errors?.staffid && (
          <Text style={{color: 'red', fontSize: 10}}>
            Staff ID is required.
          </Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>Register</Text>
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
    marginTop: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Register;
