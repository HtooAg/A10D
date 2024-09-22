import {AlignLeft, ArrowLeft} from 'lucide-react-native';
import React, {FC} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Header, {screenWidth} from '../Header';
import {NavigationType} from '../../type_hint/navType';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';

const ForgotPassword: FC<NavigationType> = ({navigation}) => {

  const {control, handleSubmit, formState: {errors}} = useForm({values: {email: ''}})

  const onSubmit = (data) => {
    console.log(data);
    // call API to send reset password link
    // navigation.navigate('ResetPassword', {email: data.email});
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
          <ArrowLeft color={'#fff'} size={35} />
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
            required: true,
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
              placeholder="Password"
              placeholderTextColor="#000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
          name="email"
        />
        {errors?.email && <Text style={{color: 'red'}}>{errors.email.message}</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonTxt}>Submit</Text>
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
    marginTop: 40, // Margin to adjust header position below bluePart
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
    top: screenWidth / 4,
    left: screenWidth / 4,
  },
  card: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTxt_header: {
    color: '#666',
    fontSize: 18,
    width: 300,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ForgotPassword;
