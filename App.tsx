import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CustomProvider} from './src/components/Context'; // Correctly import the CustomProvider
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState, useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import SplashScreen from './src/components/SplashScreen';
import StartScreenStack from './src/navigations/StartScreenStack';
import { Provider } from 'react-redux';
import {store, persistor} from './src/store/Store';
import {PersistGate} from 'redux-persist/integration/react'; // Correct import path for PersistGate
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';



export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);
  const [changeDevice, setChangeDevice] = useState(false);
  
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
          <GestureHandlerRootView style={{flex: 1}}>
            <AlertNotificationRoot>
              <NavigationContainer theme={DefaultTheme}>
                <CustomProvider>
                  {showSplash ? (
                    <SplashScreen />
                  ) : (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="App"
                        component={StartScreenStack}
                        options={{headerShown: false}}
                      />
                    </Stack.Navigator>
                  )}
                </CustomProvider>
              </NavigationContainer>
            </AlertNotificationRoot>
          </GestureHandlerRootView>
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
