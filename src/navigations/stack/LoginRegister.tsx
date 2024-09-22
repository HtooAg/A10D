import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import Login from './Login';
import Register from './Register';
import Header from '../Header';
import {FC, useState} from 'react';
import {ArrowLeft} from 'lucide-react-native';
import {NavigationType} from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';

const LoginRegister: FC<NavigationType> = ({navigation, route}) => {
  const {spaceId} = route.params||'';
  
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const [isToggle, setIsToggle] = useState(true);
  

  console.log(spaceId)
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
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
              <View style={{...styles.topStyle, top: screenWidth / 15}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SpaceId');
                  }}
                  style={{
                    ...styles.buttonStyle,
                    right: (screenWidth / 10) * 4,
                  }}>
                  <ArrowLeft size={28} color="#fff" />
                </TouchableOpacity>

                <Text
                  style={{
                    ...styles.headerTitle,
                    right: screenWidth / 4.5,
                    fontFamily: mainStyles.fontPoppinsRegular,
                  }}>
                  {isToggle ? 'Login' : 'Register'}
                </Text>
              </View>

              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, isToggle && styles.activeToggle]}
                  onPress={() => setIsToggle(true)}>
                  <Text
                    style={[
                      styles.toggleText,
                      isToggle && styles.activeToggleText,
                    ]}>
                    Login
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    !isToggle && styles.activeToggle,
                  ]}
                  onPress={() => setIsToggle(false)}>
                  <Text
                    style={[
                      styles.toggleText,
                      !isToggle && styles.activeToggleText,
                      
                    ]}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              {isToggle ? (
                <Login navigation={navigation} spaceId={spaceId} />
              ) : (
                <Register spaceId={spaceId} />
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bluePart: {
    position: 'absolute',
    top: -90,
    backgroundColor: mainStyles.backgroundColor,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    position: 'relative',
    alignItems: 'center',
  },
  topStyle: {
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonStyle: {},
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    width: '50%',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '17%',
    alignSelf: 'center',
    zIndex: 100,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: mainStyles.fontPoppinsRegular,
    color: '#031f0a',
  },
  activeToggleText: {
    color: '#e3e3e3',
  },
});

export default LoginRegister;
