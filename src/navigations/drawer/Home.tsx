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
    <>
      <Header>
        <View
          style={[
            styles.headerCard,
            {
              flexDirection: 'row',
              alignItems: 'center',
              top: screenWidth / 15,
              paddingHorizontal: 21,
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
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
          <Text
            style={{
              fontSize: 40,
              color: '#fff',
              marginBottom: 20,
              marginTop: 20,
              fontWeight: 'bold',
            }}>
            {hours}:{minutes}:{seconds} {hours > 12 ? 'PM' : 'AM'}
          </Text>
          <Text style={{fontSize: 25, color: '#fff', marginBottom: 20}}>
            {dayOfWeek}, {date} {month} {year}
          </Text>
        </View>
      </Header>
      <View style={{flex: 1}}>
        <View style={styles.card}>
          <View>
            <Text style={{color: '#000'}}>CheckIn</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={{color: '#000'}}>Free</Text>
            <View style={{height: 80, borderLeftWidth: 1}}></View>
            <Text style={{color: '#000'}}>Checkin Location</Text>
          </View>
          <View>
            <Text style={{opacity: 0}}>CheckIn</Text>
          </View>
        </View>
        <View style={styles.cardCheckIn}>
          <Text style={{color: '#000'}}>Free Check In</Text>
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
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          Check-Out
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
    alignItems: 'center',
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
    top: '20%',
    transform: [{translateY: -100}],

  },
  cardItem: {
    alignItems: 'center',
  },
  cardCheckIn: {
    marginTop: "80%",
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
    bottom: "20%",
  },
});

export default Home
