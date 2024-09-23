import React, {Component, FC, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Header from '../Header';
import {AlignLeft} from 'lucide-react-native';
import { NavigationType } from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';

const Home: FC<NavigationType> = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Time components
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  // Day of the week
  const dayOfWeek = currentTime.toLocaleString('default', {weekday: 'short'});

  // Date components
  const year = currentTime.getFullYear();
  const month = currentTime.toLocaleString('default', {month: 'short'}); // Full month name
  const date = currentTime.getDate();
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
          <Text
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
          </Text>
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
                color: '#000',
                fontFamily: mainStyles.fontPoppinsRegular,
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
        onPress={() => Alert.alert('Hi')}>
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
