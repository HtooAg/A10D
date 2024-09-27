import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {screenWidth} from '../Header';
import {AlignLeft, User2} from 'lucide-react-native';
import { NavigationType } from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';
import { useSelector } from 'react-redux';
const User: React.FC<NavigationType> = ({navigation}) => {

  const loginUser = useSelector(state => state.login.loginUser);
  const spaceUser = useSelector(state => state.spaceId.spaceUser) || {};

  console.log('User Info: ', loginUser);
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
      <View style={{top: 15, flex: 0.7}}>
        <View style={{...styles.header}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{left: screenWidth / 1.23}}>
            <AlignLeft color={'#fff'} size={35} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>User Profile</Text>
          <Text style={{opacity: 0}}>home</Text>
        </View>
        <View style={styles.headerCard}>
          <User2 color={'#e3e3e3'} size={'40%'} />
          <Text style={styles.headerCardText}>{loginUser.user.name}</Text>
          <Text style={styles.headerCardSubText}>{loginUser.user.email}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.card}>
          <View>
            <Text style={styles.cardTxt}>Staff Id</Text>
            <Text style={styles.cardTxt}>{loginUser.user.staff_id}</Text>
          </View>
          <View>
            <Text style={styles.cardTxt}>Space Name</Text>
            <Text style={styles.cardTxt}>{spaceUser?.title}</Text>
          </View>
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
    backgroundColor: mainStyles.backgroundColor,
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
  },
  headerTxt: {
    color: '#fafcfc',
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsBold,
    letterSpacing: 1,
  },
  headerCard: {
    alignItems: 'center',
    rowGap: 15,
  },
  headerCardText: {
    fontSize: 20,
    fontFamily: mainStyles.fontPoppinsBold,
    color: '#fafcfc',
  },
  headerCardSubText: {
    fontSize: 16,
    fontFamily: mainStyles.fontPoppinsRegular,
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
    fontSize: 14,
    color: '#000',
    fontFamily: mainStyles.fontPoppinsRegular,
  },
});

export default User;
