import React, {Component, useState, useEffect, FC} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import Header from '../Header';
import {AlignLeft} from 'lucide-react-native';
import { NavigationType } from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';
import { getRequestWithToken, postRequest, postRequestWithToken, setAuthToken } from '../../api/Api';
import DeviceInfo from 'react-native-device-info';
import DateTime from '../../components/DateTime';
import { useSelector } from 'react-redux';
import GetLocation from './GetLocation';

const Home: FC<NavigationType> = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [localTime, setLocalTime] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [deviceData, setDeviceData] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [location, setLocation] = useState()
  

  const loginUser = useSelector(state => state.login.loginUser);

  console.log('User Info: ', loginUser?.user)
  // console.log('User Location: ', loginUser?.user?.locations);

  const responseOfDevice = async () => {

    setAuthToken(loginUser?.token?.access_token);
    const response = await getRequestWithToken(`/api/v1/devices`);
    setDeviceData(response.data);
    console.log('Device Data: ', response.data);
  }

  const responseOfDashboard = async () => {
    try {
      setAuthToken(loginUser?.token?.access_token);
      const response = await getRequestWithToken('/api/v1/dashboard');
      setDashboardData(response.data);
      console.log('Dashboard Data: ', response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const fetchLoaction = async () => {
    const data = GetLocation();
    console.log('Location: ',data)
  }
  const checkInSubmit = async () => {
    try {
      responseOfDevice()
      responseOfDashboard()
      fetchLoaction()
  //     const device_id = responseOfDevice?.data
  //       ?.data.map(device => (device.state === "APPROVED" ? device : null))
  // .filter(device => device !== null);
      // const staff_id = loginUser?.user?.staff_id;
      // const location_id = loginUser?.user?.locations?.id;
      // const data = `device_id=${device_id[0].id}&space_id=${loginUser?.user?.space_id}&location_id=${loginUser?.user?.locations[0]?.id}`;
      // setAuthToken(loginUser?.token?.access_token);
      // const responseOfCheckIn = postRequestWithToken('/api/v1/check-in', data);

      console.log('check in: ');

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View style={{flex: 1}}>
      <Header>
        <View
          style={[
            styles.headerCard,
            {
              flexDirection: 'row',
              alignItems: 'center',
              top: screenWidth / 30.5,
              paddingHorizontal: 15,
            },
          ]}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AlignLeft color={'#fff'} size={35} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text style={styles.headerTxt}>Attendance</Text>
          </View>
          <View style={{flex: 1}} />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          {/* <Text
            style={{
              fontSize: 35,
              color: '#fff',
              marginBottom: 20,
              marginTop: 20,
              fontFamily: mainStyles.fontPoppinsRegular,
            }}>
            {hours}:{minutes}:{seconds} {hours > 12 ? 'PM' : 'AM'}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              marginBottom: 20,
              fontFamily: mainStyles.fontPoppinsRegular,
            }}>
            {dayOfWeek}, {date} {month} {year}
          </Text> */}
          <DateTime />
        </View>
      </Header>
      <View style={{flex: 1}}>
        <View style={styles.card}>
          <View>
            <Text
              style={{
                color: '#000',
                fontFamily: mainStyles.fontPoppinsRegular,
              }}>
              CheckIn
            </Text>
          </View>
          <View style={styles.cardItem}>
            <Text
              style={{
                color: mainStyles.greenColor,
                fontFamily: mainStyles.fontPoppinsRegular,
                fontSize: mainStyles.textFontSize,
                textTransform: 'uppercase'
              }}>
              Free
            </Text>
            <View style={{height: 80, borderLeftWidth: 1}}></View>
            <Text
              style={{
                color: '#000',
                fontFamily: mainStyles.fontPoppinsRegular,
              }}>
              Checkin Location
            </Text>
          </View>
          <View>
            <Text style={{opacity: 0}}>CheckIn</Text>
          </View>
        </View>
        <View style={styles.cardCheckIn}>
          <Text
            style={{color: '#000', fontFamily: mainStyles.fontPoppinsRegular}}>
            Free Check In
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{...styles.cardCheckOut, opacity: isEnabled ? 0.3 : 1}}
        onPress={checkInSubmit}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: mainStyles.fontPoppinsRegular,
          }}>
          Check-Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTxt: {
    color: '#fff',
    fontSize: mainStyles.navFontSize,
    letterSpacing: 1,
    alignItems: 'center',
    fontFamily: mainStyles.fontPoppinsBold,
  },
  headerCard: {
    // alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '80%',
    height: 200,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    top: '30%',
    transform: [{translateY: -100}],
  },
  cardItem: {
    alignItems: 'center',
  },
  cardCheckIn: {
    marginTop: '90%',
    position: 'absolute',
    // top: '55%',
    left: '70%',
    transform: [{translateY: -100}],
    rowGap: 10,
    alignItems: 'center',
  },
  cardCheckOut: {
    width: 150,
    height: 150,
    backgroundColor: '#2563eb',
    opacity: 0.5,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    bottom: '10%',
  },
});

export default Home
