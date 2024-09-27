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
  ActivityIndicator,
} from 'react-native';

import Login from './Login';
import Register from './Register';
import {FC, useState} from 'react';
import {ArrowLeft} from 'lucide-react-native';
import {NavigationType} from '../../type_hint/navType';
import {mainStyles} from '../../components/MainStyle';
import Loading from '../../components/Loading';
import {useSelector} from 'react-redux';

const LoginRegister: FC<NavigationType> = ({navigation, route}) => {
  // const {spaceId, spaceName} = route.params || '';
  const spaceUser = useSelector(state => state.spaceId.spaceUser) || {};

  console.log('Space User: ', spaceUser);

  const screenWidth = Dimensions.get('window').width;
  const [isToggle, setIsToggle] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log(
    'Space ID:',
    spaceUser?.index,
    'Space Name:',
    spaceUser?.title,
  );

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
              <View style={{...styles.topStyle, top: (screenWidth / 150) * 3}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SpaceId');
                  }}
                  style={{
                    ...styles.buttonStyle,
                    right: (screenWidth / 10) * 4,
                    top: screenWidth / 30,
                  }}>
                  <ArrowLeft size={28} color="#fff" />
                </TouchableOpacity>

                <Text
                  style={{
                    ...styles.headerTitle,
                    right: screenWidth / 4.5,
                    top: screenWidth / 10,
                    fontFamily: mainStyles.fontPoppinsRegular,
                  }}>
                  {isToggle ? 'Login' : 'Register'}
                </Text>
              </View>

              {loading ? <Loading /> : ''}
              <>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      isToggle && styles.activeToggle,
                    ]}
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
                  <Login
                    navigation={navigation}
                    spaceId={spaceUser?.index}
                    setLoading={setLoading}
                  />
                ) : (
                  <Register
                    spaceId={spaceUser?.index}
                    navigation={navigation}
                    setLoading={setLoading}
                  />
                )}
              </>
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
  loadingIndicator: {
    marginTop: 20, // Adjust as needed
  },
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
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
    zIndex: 1,
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
