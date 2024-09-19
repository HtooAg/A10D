import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContextProvider from './src/components/Context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import DrawerApp from './src/navigations/DrawerApp';
import SplashScreen from './src/components/SplashScreen';
import StartScreenStack from './src/navigations/StartScreenStack';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/Store';
import { PersistGate } from 'redux-persist/es/integration/react';


export default function App() {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);
  const [changeDevice, setChangeDevice] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [callModalVisible, setCallModalVisible] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    Orientation.lockToPortrait();

    setTimeout(() => {
      setShowSplash(false);
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0032fc" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>

            <NavigationContainer>
              <ContextProvider.Provider
                value={{
                  isLogin,
                  setIsLogin,
                  changeDevice,
                  setChangeDevice,
                  changeModal,
                  setChangeModal,
                  emailModalVisible,
                  setEmailModalVisible,
                  callModalVisible,
                  setCallModalVisible,
                }}>
                {showSplash ? (
                  <SplashScreen />
                ) : (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="SpaceId"
                      component={StartScreenStack}
                      options={{headerShown: false}}
                    />
                    <Stack.Screen
                      name="DrawerApp"
                      component={DrawerApp}
                      options={{headerShown: false}}
                    />
                  </Stack.Navigator>
                )}
              </ContextProvider.Provider>
            </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
