import React from 'react';
import { NavigationType } from '../type_hint/navType';
import { Smartphone, User2 } from 'lucide-react-native';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Change from './drawer/ChangePassword';
import Home from './drawer/Home';
import Help from './drawer/Help';
import Noti from './drawer/Noti';
import Device from './drawer/Device';
import {
  Bell,
  HelpCircle,
  HomeIcon,
  ListTodo,
  LocateIcon, TimerReset
} from 'lucide-react-native';
import LocationStack from './LocationStack';
import LogoutDrawer from './drawer/LogoutDrawer';
import AttendanceStack from './drawer/AttendanceStack';
import { Text, View } from 'react-native';
import User from './drawer/User';
const DrawerApp: React.FC<NavigationType> = ({navigation}) => {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);
  const [changeDevice, setChangeDevice] = useState(false);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <LogoutDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: 'rgba(0, 50, 252, 0.5)',
        drawerActiveTintColor: '#0032fc',
        drawerInactiveTintColor: '#000',
        drawerItemStyle: {
          borderRadius: 12,
          // opacity: 0.5,
        },
      }}>
      <Drawer.Screen
        name="User"
        component={User}
        options={{
          headerShown: false,
          drawerInactiveTintColor: '#031f0a',
          drawerActiveTintColor: '#2563eb',
          drawerIcon: ({color, size}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderBottomWidth: 1,
                width: '100%',
                paddingBottom: 10,
              
              }}>
              <User2 color={color} size={45} strokeWidth={1.5} />
              <Text style={{color: color, fontWeight: '500'}}>
                Htoo Aung Wai
              </Text>
              <Text style={{opacity: 0}}>User</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => <HomeIcon size={size} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Attendence"
        component={AttendanceStack}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => <ListTodo size={size} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Location"
        component={LocationStack}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => <LocateIcon size={size} color="black" />,
        }}
      />

      <Drawer.Screen
        name="Change"
        component={Change}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => <TimerReset size={size} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Devices"
        component={Device}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => <Smartphone size={size} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Notification Setting"
        component={Noti}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => <Bell size={size} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => <HelpCircle size={size} color="black" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerApp;
