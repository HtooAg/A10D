import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import moment, {Moment} from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const initialTimeRef = useRef<Moment | null>(null);

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

  return (
    <>
      {isLoading ? (
        <Text style={{color: 'white', fontSize: 14}}>Loading....</Text>
      ) : (
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: 1,
              textAlign: 'center',
            }}>
            {currentTime}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 5,
              color: 'white',
              textAlign: 'center',
            }}>
            {currentDate}
          </Text>
        </View>
      )}
    </>
  );
};

export default DateTime;
