import {
  AlignLeft,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ClipboardPenLine,
  NotebookPen,
  PlusIcon,
} from 'lucide-react-native';
import React, {Component, FC} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {NavigationType} from '../type_hint/navType';

const Location: FC<NavigationType> = ({navigation}) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <AlignLeft color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Location List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GoogleMap')}>
          <PlusIcon color={'#fff'} size={30} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardNoAtt}>
        <ClipboardPenLine color={'#ccc'} size={250} strokeWidth={0.5} />
        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
          There is no location records
        </Text>
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
    paddingTop: 25,
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
  cardNoAtt: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Location;
