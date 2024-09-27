import {
  Bell,
  HelpCircle,
  HomeIcon,
  ListTodo,
  LocateIcon,
  Smartphone,
  TimerReset,
  User2,
} from 'lucide-react-native';
import Change from './drawer/ChangePassword';
import Home from './drawer/Home';
import Help from './drawer/Help';
import Noti from './drawer/Noti';
import Device from './drawer/Device';
import LocationStack from './LocationStack';
import LogoutDrawer from './drawer/LogoutDrawer';
import AttendanceStack from './drawer/AttendanceStack';
import {Text, View} from 'react-native';
import User from './drawer/User';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// Stack navigator for managing screens within the home section
const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* Add more screens inside the home section if needed */}
    </Stack.Navigator>
  );
};

const DrawerApp: React.FC = () => {
  const Drawer = createDrawerNavigator();
  const [isLogin, setIsLogin] = useState(false);
  const [changeDevice, setChangeDevice] = useState(false);


  const loginUser = useSelector(state => state.login.loginUser);
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={props => <LogoutDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: 'rgba(0, 50, 252, 0.5)',
        drawerActiveTintColor: '#0032fc',
        drawerInactiveTintColor: '#000',
        drawerItemStyle: {
          borderRadius: 12,
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins-Bold', // Replace with your custom font
          fontSize: 12, // Optional: Adjust the font size
        },
      }}>
      {/* User screen at the top of the drawer */}
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
              <Text style={{color: color, fontFamily: 'Poppins-Bold', fontSize: 15}}>
                {loginUser?.user?.name}
              </Text>
              <Text style={{opacity: 0}}>User</Text>
            </View>
          ),
        }}
      />

      {/* Home Stack screen */}
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          headerShown: false,
          drawerInactiveTintColor: '#031f0a',
          drawerActiveTintColor: '#2563eb',
          drawerIcon: ({size, color}) => <HomeIcon size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Attendance"
        component={AttendanceStack}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => <ListTodo size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Location"
        component={LocationStack}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => (
            <LocateIcon size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="ChangePassword"
        component={Change}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => (
            <TimerReset size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Devices"
        component={Device}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => (
            <Smartphone size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Notification Setting"
        component={Noti}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => <Bell size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          drawerIcon: ({size, color}) => (
            <HelpCircle size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerApp;
