import {
  AlignLeft,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ClipboardPenLine,
  ListTodo,
  NotebookPen,
} from 'lucide-react-native';
import React, {Component, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const Attendance: React.FC<NavigationType> = ({navigation}) => {
  const [showCalander, setShowCalander] = useState(false);

  return (
    <>
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
      <View style={styles.card}>
        <TouchableOpacity>
          <ChevronLeft color={'#fff'} />
        </TouchableOpacity>
        <Text>Month,0000</Text>
        <TouchableOpacity>
          <ChevronRight color={'#fff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardWithAtt}>
        <View style={styles.cardWithAtt_item}>
          <Text style={{color: '#000', paddingStart: 15}}>0000-00-00</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AttendanceDetail')}>
            <ChevronRight color={'#000'} size={35} />
          </TouchableOpacity>
        </View>
        <View style={{...styles.card, width: '85%'}}>
          <Text>Month,0000</Text>
          <Text>Month,0000</Text>
        </View>
      </View>
      <View style={styles.cardNoAtt}>
        {showCalander ? (
          <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
            style={{
              backgroundColor: '#fff',
              width: 370,
            }}
          />
        ) : (
          <>
            <ClipboardPenLine color={'#ccc'} size={150} strokeWidth={0.2} />
            <Text style={{color: '#000', fontSize: 15}}>
              There is no attendance records
            </Text>
            <Text
              style={{
                color: '#ccc',
                fontSize: 15,
                width: '70%',
                textAlign: 'center',
              }}>
              The record will be display according to the check in/out process
            </Text>
          </>
        )}
      </View>
    </>
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
    paddingLeft: 25,
  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
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
    marginTop: 20,
    borderRadius: 10,
  },
  cardWithAtt: {
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    top: 20,
    borderRadius: 10,
  },
  cardWithAtt_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  cardNoAtt: {
    alignItems: 'center',
    marginTop: '20%',
  },
});

export default Attendance;
