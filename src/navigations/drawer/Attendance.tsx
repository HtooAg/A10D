import {
  AlignLeft,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ClipboardPenLine,
  ListTodo,
  NotebookPen,
} from 'lucide-react-native';
import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { mainStyles } from '../../components/MainStyle';
import { getRequest, getRequestWithToken, setAuthToken } from '../../api/Api';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const Attendance: React.FC<NavigationType> = ({navigation}) => {
  const [showCalander, setShowCalander] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [fromDate, setFromDate] = useState(
    moment().startOf('month').format('YYYY-MM-DD'),
  );
  const [toDate, setToDate] = useState(
    moment().endOf('month').format('YYYY-MM-DD'),
  );
  const [currentMonth, setCurrentMonth] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const loginUser = useSelector(state => state.login.loginUser);
  console.log('User Info: ', loginUser.token.access_token);

  // console.log('Calendar: ', attendanceData);

  // const markedAttendance = {
  //   '2024-01-01': {dots: [{color: 'green'}, {color: 'red'}]},
  //   '2024-07-04': {dots: [{color: 'green'}, {color: 'red'}]},
  //   '2024-12-25': {dots: [{color: 'green'}, {color: 'red'}]},
  // };

  // Handle previous month button press
  const handlePrevMonth = () => {
    setCurrentMonth(
      moment(currentMonth).subtract(1, 'month').format('YYYY-MM-DD'),
    );
  };

  // Handle next month button press
  const handleNextMonth = () => {
    setCurrentMonth(moment(currentMonth).add(1, 'month').format('YYYY-MM-DD'));
  };

  // Handle day press logic
  const handleDayPress = day => {
    if (!fromDate) {
      setFromDate(day.dateString);
    } else if (!toDate && moment(day.dateString).isAfter(fromDate)) {
      setToDate(day.dateString);
    } else {
      setFromDate(day.dateString);
      setToDate('');
    }
  };

  // Function to get marked dates for the calendar
  const getMarkedDates = () => {
    const markedDates = {
      [fromDate]: {
        selected: true,
        disableTouchEvent: true,
        marked: true,
        selectedColor: mainStyles.greenColor,
      },
      [toDate]: {
        selected: true,
        disableTouchEvent: true,
        marked: true,
        selectedColor: mainStyles.greenColor,
      },
      dots: [{color: 'yellow'}, {color: 'yellow'}],
    };

    if (fromDate && toDate) {
      const start = moment(fromDate);
      const end = moment(toDate);
      for (
        let m = moment(start);
        m.isBefore(end) || m.isSame(end);
        m.add(1, 'days')
      ) {
        markedDates[m.format('YYYY-MM-DD')] = {selected: true, color: 'green'};
      }
    }

    return markedDates;
  };

  // Use effect to fetch data based on date range changes
  useEffect(() => {
    fetchAPI(fromDate, toDate);
  }, [fromDate, toDate]);

  // Fetch attendance data from the API to show the whole month
  const fetchAPI = async (startDate: string, endDate: string) => {
    try {
      setAuthToken(loginUser.token.access_token);
      const response = await getRequestWithToken(
        `/api/v1/attendances?from-date=${startDate}&to-date=${endDate}`,
      );
      setAttendanceData(response.data.data);
      // console.log('Attendace Data', response.data.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  

  const formatTime = time => {
    const [hours, minutes, seconds] = time.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // convert 24-hour format to 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatDateToDay = dateString => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <AlignLeft color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Attendance Lists</Text>
        {showCalander ? (
          <TouchableOpacity onPress={() => setShowCalander(false)}>
            <ListTodo color={'#fff'} size={30} strokeWidth={1} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowCalander(true)}>
            <Calculator color={'#fff'} size={30} strokeWidth={1} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.card, {marginTop: 20}]}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <ChevronLeft color={'#fff'} />
        </TouchableOpacity>
        <Text
          style={{fontFamily: mainStyles.fontPoppinsBold, color: '#e3e3e3'}}>
          {moment(currentMonth).format('MMMM, YYYY')}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <ChevronRight color={'#fff'} />
        </TouchableOpacity>
      </View>
      {showCalander ? (
        <View style={[styles.cardNoAtt, {flex: 1}]}>
          <View style={{flex: 1}}>
            <Calendar
              key={currentMonth}
              style={{
                borderWidth: 1,
                borderColor: 'lightgray',
                width: 400,
              }}
              onDayPress={handleDayPress}
              markedDates={getMarkedDates()}
              markingType={'multi-dot'}
              hideArrows={true}
              renderHeader={() => null}
              current={currentMonth}
              theme={{
                backgroundColor: '#f2f2f2',
                textSectionTitleColor: '#000',
                dayTextColor: '#000',
                selectedDayTextColor: '#000',
                todayTextColor: mainStyles.greenColor,
                selectedDayBackgroundColor: '#f2f2f2',
                currentDayBackgroundColor: '#f2f2f2',
                monthTextColor: '#000',
                indicatorColor: '#000',
                textDisabledColor: '#d9d9d9',
                weekdayTextColor: '#000',
                arrowColor: '#000',
                disabledArrowColor: '#d9d9d9',
                hasToday: true,
              }}
            />

            <View style={{flex: 1, marginTop: 10}}>
              {attendanceData.length > 0 && showCalander == true ? (
                <View style={[styles.cardWithAtt]}>
                  <FlatList
                    data={attendanceData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          borderBottomColor: '#031f0a',
                          borderBottomWidth: 1,
                          borderRadius: 30,
                        }}>
                        <View style={[styles.cardWithAtt_item]}>
                          <Text
                            style={{
                              color: '#000',
                              paddingStart: 15,
                              fontFamily: mainStyles.fontPoppinsRegular,
                            }}>
                            {item?.check_in_location.name}
                          </Text>
                          <TouchableOpacity
                            style={{opacity: 0}}
                            // onPress={() =>
                            //   navigation.navigate(
                            //     'AttendanceDetailOfLocation',
                            //     {id: item.id, item: item},
                            //   )
                            // }
                            >
                            <ChevronRight color={'#000'} size={35} />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            ...styles.card,
                            width: '85%',
                            marginBottom: 20,
                          }}>
                          <Text
                            style={{
                              fontFamily: mainStyles.fontPoppinsRegular,
                              color: '#e3e3e3',
                            }}>
                            {formatTime(item?.check_in_time)}
                          </Text>
                          <Text
                            style={{
                              fontFamily: mainStyles.fontPoppinsRegular,
                              color: '#e3e3e3',
                            }}>
                            # {index + 1}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              ) : (
                <View style={styles.cardNoAtt}>
                  <ClipboardPenLine
                    color={'#ccc'}
                    size={150}
                    strokeWidth={0.2}
                  />
                  <Text
                    style={{
                      color: '#000',
                      fontSize: mainStyles.textFontSize,
                      fontFamily: mainStyles.fontPoppinsRegular,
                    }}>
                    There is no attendance records
                  </Text>
                  <Text
                    style={{
                      color: '#ccc',
                      fontSize: mainStyles.textFontSize,
                      width: '70%',
                      textAlign: 'center',
                      fontFamily: mainStyles.fontPoppinsRegular,
                    }}>
                    The record will be display according to the check in/out
                    process
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {attendanceData.length > 0 && showCalander == false ? (
        <View style={{flex: 1, marginTop: 10}}>
          {attendanceData.length > 0 ? (
            <View style={[styles.cardWithAtt]}>
              <FlatList
                data={attendanceData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      borderBottomColor: '#031f0a',
                      borderBottomWidth: 1,
                      borderRadius: 30,
                    }}>
                    <View style={styles.cardWithAtt_item}>
                      <Text
                        style={{
                          color: '#000',
                          paddingStart: 15,
                          fontFamily: mainStyles.fontPoppinsRegular,
                        }}>
                        {item?.date}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AttendanceDetail', {item: item})
                        }>
                        <ChevronRight color={'#000'} size={35} />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{...styles.card, width: '85%', marginBottom: 20}}>
                      <Text
                        style={{
                          fontFamily: mainStyles.fontPoppinsRegular,
                          color: '#e3e3e3',
                        }}>
                        {formatDateToDay(item?.date)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: mainStyles.fontPoppinsRegular,
                          color: '#e3e3e3',
                        }}>
                        {formatTime(item?.check_in_time)} -{' '}
                        {formatTime(item?.check_out_time)}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          ) : (
            <View style={styles.cardNoAtt}>
              <ClipboardPenLine color={'#ccc'} size={150} strokeWidth={0.2} />
              <Text
                style={{
                  color: '#000',
                  fontSize: mainStyles.textFontSize,
                  fontFamily: mainStyles.fontPoppinsRegular,
                }}>
                There is no attendance records
              </Text>
              <Text
                style={{
                  color: '#ccc',
                  fontSize: mainStyles.textFontSize,
                  width: '70%',
                  textAlign: 'center',
                  fontFamily: mainStyles.fontPoppinsRegular,
                }}>
                The record will be display according to the check in/out process
              </Text>
            </View>
          )}
        </View>
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0032fc',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerTxt: {
    color: '#fff',
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsBold,
    letterSpacing: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0032fc',
    width: '90%',
    height: 50,
    borderRadius: 10,
  },
  cardWithAtt: {
    // flex: 1,
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    top: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  cardWithAtt_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  cardNoAtt: {
    alignItems: 'center',
    marginTop: '5%',
  },
});

export default Attendance;
