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
import Header, { screenWidth } from '../Header';
import {AlignLeft} from 'lucide-react-native';
import { NavigationType } from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';
import { getRequestWithToken, postRequest, postRequestWithToken, setAuthToken } from '../../api/Api';
import DeviceInfo from 'react-native-device-info';
import DateTime from '../../components/DateTime';
import { useSelector } from 'react-redux';
import GetLocation from './GetLocation';
import moment from 'moment';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const Home: FC<NavigationType> = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [localTime, setLocalTime] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [deviceData, setDeviceData] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [location, setLocation] = useState<object>({})
  

  const loginUser = useSelector(state => state.login.loginUser);

  console.log('User Info: ', loginUser?.token?.access_token);
  // console.log('User Location: ', loginUser?.user?.locations);

  
  const responseOfDevice = async () => {
    try {
      await setAuthToken(loginUser?.token?.access_token);
      const response = await getRequestWithToken(`/api/v1/devices`);
      setDeviceData(response.data);
      console.log('Device Data: ', response.data);
    } catch (error) {
      console.error(error)
    }
    
  }

  const responseOfDashboard = async () => {
    try {
      await setAuthToken(loginUser?.token?.access_token);
      const response = await getRequestWithToken('/api/v1/dashboard');
      setDashboardData(response.data.data);
      console.log(
        'Dashboard Data: ',
        dashboardData,
      );
    } catch (error) {
      console.error(error)
    }
  }

  const fetchLoaction = async () => {
    const data = await GetLocation();
    setLocation(data||{});
    console.log('Location: ',location)
  }



  const handleCheckInSubmit = async () => {
    try {
      // responseOfDevice();
      responseOfDashboard();
      fetchLoaction();
      const device_id = deviceData?.data.find(device =>
        device.state === 'APPROVED' ? device : null,
      );

      if(dashboardData.check_in_status == true){
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Warning',
          textBody: 'Sorry that you can not check-in/check-out in this moment cuz api issue.',
        });

        const spaceid = loginUser?.user?.space_id;
        const location_id = loginUser?.user?.locations[0].id;
        const data = `device_id=${device_id.udid}&space_id=${spaceid}&location_id=${location_id}`;
        console.log('Device Id: ', data);

        // await setAuthToken(loginUser?.token?.access_token);
        // const response = await postRequestWithToken(
        //   '/api/v1/check-in?',
        //   `device_id=${device_id.udid}&space_id=${spaceid}&location_id=${location_id}`,
        // );
        // console.log('check in: ', response);
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    responseOfDevice();
    responseOfDashboard();
  }, []);

  

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
        <DateTime />
      </Header>
      <View style={{flex: 1}}>
        <View style={styles.card}>
          <View style={{alignItems: 'center'}}>
            {dashboardData?.check_in_status == true ? (
              <>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: mainStyles.fontPoppinsBold,
                  }}>
                  CheckIn
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: mainStyles.fontPoppinsRegular,
                  }}>
                  {dashboardData?.check_in_detail?.check_in_time
                    ? moment(
                        dashboardData.check_in_detail.check_in_time,
                        'HH:mm:ss',
                      ).format('h:mm:ss A')
                    : ''}
                </Text>
              </>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.cardItem}>
            <Text
              style={{
                color: mainStyles.greenColor,
                fontFamily: mainStyles.fontPoppinsRegular,
                fontSize: mainStyles.headerFontsize,
                textTransform: 'uppercase',
              }}>
              {dashboardData?.check_in_detail?.attendance_type || 'Free'}
            </Text>
            <View style={{height: 80, borderLeftWidth: 1}}></View>
            <Text
              style={{
                color: '#000',
                fontFamily: mainStyles.fontPoppinsRegular,
              }}>
              Checkin Location
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: mainStyles.fontPoppinsBold,
              }}>
              {dashboardData?.check_in_detail?.check_in_location_name}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            {dashboardData?.check_out_status==true ? (
              <>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: mainStyles.fontPoppinsBold,
                  }}>
                  CheckOut
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: mainStyles.fontPoppinsRegular,
                  }}>
                  {dashboardData?.check_out_detail?.check_out_time
                    ? moment(
                        dashboardData.check_out_detail.check_out_time,
                        'HH:mm:ss',
                      ).format('h:mm:ss A')
                    : ''}
                </Text>
              </>
            ) : (
              <></>
            )}
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
        onPress={handleCheckInSubmit}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: mainStyles.fontPoppinsRegular,
          }}>
          Check-In
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
    top: screenWidth / 3,
    transform: [{translateY: -100}],
  },
  cardItem: {
    alignItems: 'center',
  },
  cardCheckIn: {
    marginTop: screenWidth / 1,
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
    bottom: screenWidth / 4,
  },
});

export default Home
