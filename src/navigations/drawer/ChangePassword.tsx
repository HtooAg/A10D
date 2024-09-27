import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {AlignLeft, Eye, EyeOff} from 'lucide-react-native';
import Header from '../Header';
import {NavigationType} from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';

const Change: FC<NavigationType> = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [password, setPassword] = useState('');
  const [reset, setReset] = useState('');
  const [type, setType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showType, setShowType] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <View style={{top: screenWidth / 25, rowGap: 20}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{right: screenWidth / 3}}>
            <AlignLeft color={'#fff'} size={35} />
          </TouchableOpacity>
          <View style={{right: screenWidth / 8}}>
            <Text style={styles.headerTitle}>Change</Text>
            <Text style={styles.headerTitle}>Password</Text>
          </View>
        </View>
      </Header>

      {/* KeyboardAvoidingView added to handle input focus */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={screenWidth / 2.5}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{...styles.card, top: screenWidth / 2.5}}>
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Current Password"
                  placeholderTextColor="#000"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye size={20} color="#000" />
                  ) : (
                    <EyeOff size={20} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  placeholderTextColor="#000"
                  value={reset}
                  onChangeText={setReset}
                  secureTextEntry={!showReset}
                />
                <TouchableOpacity onPress={() => setShowReset(!showReset)}>
                  {showReset ? (
                    <Eye size={20} color="#000" />
                  ) : (
                    <EyeOff size={20} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#000"
                  value={type}
                  onChangeText={setType}
                  secureTextEntry={!showType}
                />
                <TouchableOpacity onPress={() => setShowType(!showType)}>
                  {showType ? (
                    <Eye size={20} color="#000" />
                  ) : (
                    <EyeOff size={20} color="#000" />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },
  headerTitle: {
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsBold,
    color: 'white',
  },
  card: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsItalic,
  },
  loginButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '70%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: mainStyles.fontPoppinsSemiBoldItalic,
    textTransform: 'uppercase',
  },
});

export default Change;
