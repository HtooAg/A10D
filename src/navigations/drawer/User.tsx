import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {screenWidth} from '../Header';
import {AlignLeft, User2} from 'lucide-react-native';
import { NavigationType } from '../../type_hint/navType';
const User: React.FC<NavigationType> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bluePart,
          {
            width: screenWidth * 2,
            height: screenWidth,
            borderRadius: (screenWidth * 2) / 2,
          },
        ]}
      />
      <View style={{top: 15}}>
        <View style={{...styles.header}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{left: 310}}>
            <AlignLeft color={'#fff'} size={35} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>User Profile</Text>
          <Text style={{opacity: 0}}>home</Text>
        </View>
        <View style={styles.headerCard}>
          <User2 color={'#e3e3e3'} size={'40%'} />
          <Text style={styles.headerCardText}>Name: </Text>
          <Text style={styles.headerCardSubText}>Email: </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTxt}>Staff Id</Text>
          <Text style={styles.cardTxt}>0000</Text>
        </View>
        <View>
          <Text style={styles.cardTxt}>Space Name</Text>
          <Text style={styles.cardTxt}>LOGCDC</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bluePart: {
    position: 'absolute',
    top: -100,
    backgroundColor: '#0032fc',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // paddingTop: 70,
    // top: 210,
  },
  headerTxt: {
    color: '#fafcfc',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
  },
  headerCard: {
    alignItems: 'center',
    marginTop: 20,
    rowGap: 15,
  },
  headerCardText: {
    fontSize: 23,
    fontWeight: '500',
    color: '#fafcfc',
  },
  headerCardSubText: {
    fontSize: 16,
    color: '#fafcfc',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    elevation: 5,
  },
  cardTxt: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
});

export default User;
