import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SpaceId from './stack/SpaceId';
import LoginRegister from './stack/LoginRegister';
import DrawerApp from './DrawerApp';
import StackScreens from './StackScreens';

const StartScreenStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="StackScreen">
      <Stack.Screen
        name="StackScreen"
        component={StackScreens}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={DrawerApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StartScreenStack;
