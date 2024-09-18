import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Attendance from './Attendance';
import AttendanceDetails from './AttendanceDetails';
import AttendanceDetailOfLocation from './AttendanceDetailOfLocation';

const AttendanceStack: React.FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Attendance">
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AttendanceDetail"
        component={AttendanceDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AttendanceDetailOfLocation"
        component={AttendanceDetailOfLocation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AttendanceStack;
