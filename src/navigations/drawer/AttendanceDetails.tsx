import {ChevronLeft} from 'lucide-react-native';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';

const AttendanceDetails: React.FC<NavigationType> = ({navigation}) => {
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
        <Text style={styles.card_Txt}>dd-mm-yyyy</Text>
        <Text style={styles.card_Times}>Times</Text>
      </View>
      <ScrollView
        style={{flex: 1}} // Ensure ScrollView expands
        contentContainerStyle={styles.scrollContent} // Ensure content has room to grow
      >
        {Array.from({length: 10}).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardDetail}
            onPress={() => navigation.navigate('AttendanceDetailOfLocation')}>
            <View style={styles.cardDetail_Item}>
              <Text style={{color: '#fff'}}>Hours</Text>
              <Text style={{color: '#fff'}}>#{index + 1}</Text>
            </View>
            <Text style={styles.cardDetail_Txt}>Place! (MICT)</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
