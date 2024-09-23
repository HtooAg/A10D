import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Modal from 'react-native-modal';
import {DoorOpen, LogOut} from 'lucide-react-native';
import { mainStyles } from '../../components/MainStyle';

type LogoutDrawerProps = {
  navigation: any;
};

const LogoutDrawer: React.FC<LogoutDrawerProps> = props => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogoutPress = () => {
    props.navigation.closeDrawer();
    setModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    setModalVisible(false);
    // console.log('Logged out');
    props.navigation.navigate('Login');
  };

  const handleLogoutCancel = () => {
    setModalVisible(false);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={() => <LogOut size={23} color={'black'} />}
        onPress={handleLogoutPress}
        labelStyle={{color: 'black'}}
        labelStyle={{
          color: 'black',
          fontFamily: 'Poppins-Bold', // Add your custom font here
          fontSize: 12, // Optional: Adjust the font size
        }}
      />

      <Modal isVisible={isModalVisible} onBackdropPress={handleLogoutCancel}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirm Logout</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <LogOut size={100} color="black" />
          </View>

          <Text style={styles.modalMessage}>
            Are you sure you want to log out?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleLogoutCancel}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleLogoutConfirm}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: mainStyles.headerFontsize,
    fontFamily: mainStyles.fontPoppinsRegular,
    color: 'black',
  },
  modalMessage: {
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsRegular,
    color: 'grey',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsRegular,
  },
  baseColor: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default LogoutDrawer;
