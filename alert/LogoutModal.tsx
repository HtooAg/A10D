import {Dot, MoveRight, Smartphone} from 'lucide-react-native';
import React, {Component, useContext} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import ContextProvider from '../components/Context';

type Device = {
  setChangeDevice: boolean;
};
const LogoutModal: React.FC<Device> = ({setIsLogoutModalVisible}) => {
  const {changeModal, setChangeModal} =
    useContext(ContextProvider);
  return (
    <View style={styles.container}>
      <View style={styles.deviceAlert}>
        <View style={styles.cardIcon}>
          <Smartphone color={'#000'} size={35} strokeWidth={1} />
          <View style={styles.cardIcon}>
            <Dot color={'#000'} size={35} strokeWidth={0.5} />
            <MoveRight color={'#000'} size={35} strokeWidth={0.5} />
          </View>
          <Smartphone
            color={'#000'}
            size={35}
            strokeWidth={1}
            style={{marginStart: 10}}
          />
        </View>
        <Text style={styles.infoTxt}>Are you sure want to leave?</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setIsLogoutModalVisible(false)}>
            <Text style={styles.btnTxt}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsLogoutModalVisible(false);
              // Add any additional logout logic here if needed
            }}>
            <Text style={styles.btnTxt}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.8,
  },
  deviceAlert: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
  cardIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  infoTxt: {
    color: '#000',
    width: 200,
    fontSize: 12,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    columnGap: 20,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: 90,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LogoutModal;
