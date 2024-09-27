import React, {Component, useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import {AlignLeft, Smartphone, HomeIcon} from 'lucide-react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DeviceChange from '../../alert/DeviceChange';
import ContextProvider from '../../components/Context';
import { mainStyles } from '../../components/MainStyle';
import { screenWidth } from '../Header';
import { getRequestWithToken, setAuthToken, singleRequest } from './../../api/Api';
import DeviceInfo from 'react-native-device-info';
import { useSelector } from 'react-redux';

type Device = {
  setChangeDevice: boolean;
};
type Types = Device & NavigationType;
const Device: React.FC<Types> = ({navigation}) => {
  const {changeDevice, setChangeDevice} = useContext(ContextProvider);
  const [deviceData, setDeviceData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const loginUser = useSelector(state => state.login.loginUser);

  const responseOfDevice = async () => {
    await setAuthToken(loginUser?.token?.access_token);
    const response = await getRequestWithToken(`/api/v1/devices`);
    setDeviceData(response.data.data);
    console.log('Device Data: ', deviceData);
  };

  useEffect(() => {
    responseOfDevice();
  }, []);
  return (
    <View
      style={{flex: 1, position: 'relative', zIndex: 0, alignItems: 'center'}}>
      {changeDevice ? <DeviceChange setChangeDevice={setChangeDevice} /> : ''}
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <AlignLeft color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Device Register List</Text>
      </View>
      <View style={{flex: 2, marginVertical: screenWidth / 3, rowGap: 10}}>
        <TouchableOpacity
          style={styles.changeDevice}
          onPress={() => setChangeDevice(true)}>
          <Smartphone color={'#000'} size={35} strokeWidth={1} />
          <Text style={styles.changeDevice_Txt}>Change Device</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          
            <FlatList
              // style={{flex: 1}}
              data={deviceData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View>
                  <View style={styles.cardBody}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: mainStyles.textFontSize,
                        fontFamily: mainStyles.fontPoppinsRegular,
                      }}>
                      {item?.type}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: mainStyles.textFontSize,
                        fontFamily: mainStyles.fontPoppinsRegular,
                      }}>
                      {item?.os}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.cardBody,
                      backgroundColor: '#63b307',
                      width: '90%',
                      height: 50,
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}>
                    <Text style={styles.cardTxt}>{item?.model}</Text>
                    <Text style={styles.cardTxt}>{item?.state}</Text>
                  </View>
                </View>
              )}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bluePart: {
    position: 'absolute',
    top: -100,
    backgroundColor: mainStyles.backgroundColor,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    right: screenWidth / 6,
    top: screenWidth / 20,
    flex: 1,
  },
  headerTxt: {
    color: '#fff',
    fontSize: mainStyles.headerFontsize,
    fontFamily: mainStyles.fontPoppinsBold,
    letterSpacing: 1,
    paddingStart: 50,
    paddingTop: 30,
    width: 230,
  },
  changeDevice: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    right: 20,
  },
  changeDevice_Txt: {
    color: '#2563eb',
    textDecorationLine: 'underline',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsRegular,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 5,
    // flex: 1
  },
  cardBody: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    columnGap: 20,
  },
  cardTxt: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsRegular,
  },
});

export default Device;
