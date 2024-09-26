import {ChevronLeft} from 'lucide-react-native';
import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';
import { getRequestWithToken, setAuthToken } from '../../api/Api';
import { useSelector } from 'react-redux';
import moment from 'moment';

const AttendanceDetails: React.FC<NavigationType> = ({navigation, route}) => {

  const [attendanceDetail, setAttendanceDetail] = useState([])
  const [date, setDate] = useState([])
  const {item} = route.params;
  const loginUser = useSelector(state => state.login.loginUser);

  // console.log('Detail Id: ', item.id)
  // console.log('Detail Info: ', attendanceDetail.id);
  const fetchAttendandceDetail = async () => {
    try {
      setAuthToken(loginUser.token.access_token);
      const response = await getRequestWithToken(
        `/api/v1/attendances/${item.id}`,
      );
      setAttendanceDetail(response.data.data.histories);
      setDate(response.data);
      // console.log('Attendace Data', attendanceDetail);
    } catch (error) {
      console.log('Error:', error);
    }
  }

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

  useEffect(() => {
    fetchAttendandceDetail();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text style={styles.navBar_Txt}>Attendance Details</Text>
        <Text style={{opacity: 0}}>Detail</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.card_Txt}>
          {moment(date?.data?.date).format('DD-MMMM-YYYY')}
        </Text>
        <Text style={styles.card_Times}>{attendanceDetail?.length} times</Text>
      </View>

      <FlatList
        data={attendanceDetail}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={styles.cardDetail}
            onPress={() =>
              navigation.navigate('AttendanceDetailOfLocation', {item: item})
            }>
            <View style={styles.cardDetail_Item}>
              <Text style={{color: '#fff'}}>{formatTime(item?.time)}</Text>
              <Text style={{color: '#fff'}}># {index + 1}</Text>
            </View>
            <Text style={styles.cardDetail_Txt}>({item?.location_name})</Text>
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: 60,
    backgroundColor: '#0032fc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  navBar_Txt: {
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsBold,
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 20,
  },
  card_Txt: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  card_Times: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    color: '#fff',
  },
  scrollContent: {
    paddingVertical: 20,
  },
  cardDetail: {
    marginHorizontal: 20,
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  cardDetail_Item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 10,
  },
  cardDetail_Txt: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AttendanceDetails;
