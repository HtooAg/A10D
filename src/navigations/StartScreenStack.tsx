import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Space} from 'lucide-react-native';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import SpaceId from './stack/SpaceId';
import LoginRegister from './stack/LoginRegister';

const StartScreenStack = () => {
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
    </Stack.Navigator>
  );
};

export default StartScreenStack;
