import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SpaceId from './stack/SpaceId';
import LoginRegister from './stack/LoginRegister';
import ForgotPassword from './stack/ForgotPassword';
import ResetPassword from './stack/ResetPassword';
import ResetScreen from './stack/ResetScreen';

const StackScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SpaceId">
      <Stack.Screen
        name="SpaceId"
        component={SpaceId}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginRegister}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetScreen"
        component={ResetScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackScreens;
