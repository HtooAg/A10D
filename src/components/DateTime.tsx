import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import moment, {Moment} from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { mainStyles } from './MainStyle';

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const initialTimeRef = useRef<Moment | null>(null);
  const [localTime, setLocalTime] = useState(new Date());

  const fetchTime = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Etc/UTC',
      );
      const utcDateTime: string = response.data.datetime;
      const deviceTimezone: string = RNLocalize.getTimeZone();
      initialTimeRef.current = moment(utcDateTime).tz(deviceTimezone);
      console.log('api fetch');

      console.log(utcDateTime);
      console.log(deviceTimezone);
    } catch (error) {
      const dateTime: Moment = moment();
      initialTimeRef.current = dateTime;
      console.error('Error fetching time from api :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTime();
    // console.log('render at mount');
    const intervalId = setInterval(() => {
      if (initialTimeRef.current) {
        const updatedTime = initialTimeRef.current
          .add(1, 'second')
          .format('HH:mm:ss A');
        setCurrentTime(updatedTime);
        const updatedDate = initialTimeRef.current.format('ddd, DD MMM YYYY');
        setCurrentDate(updatedDate);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Time components
  const hours = localTime.getHours();
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const seconds = localTime.getSeconds().toString().padStart(2, '0');

  // Day of the week
  const dayOfWeek = localTime.toLocaleString('default', {weekday: 'short'});

  // Date components
  const year = localTime.getFullYear();
  const month = localTime.toLocaleString('default', {month: 'short'}); // Full month name
  const date = localTime.getDate();

  return (
    <>
      {isLoading ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 35,
              color: '#fff',
              marginBottom: 20,
              marginTop: 20,
              fontFamily: mainStyles.fontPoppinsRegular,
              textAlign: 'center',
            }}>
            {currentTime}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              marginBottom: 20,
              fontFamily: mainStyles.fontPoppinsRegular,
            }}>
            {currentDate}
          </Text>
        </View>
      )}
    </>
  );
};

export default DateTime;
