import {AlignLeft, Phone, Send} from 'lucide-react-native';
import React, {Component, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { NavigationType } from '../../type_hint/navType';
import HelpModal from '../../alert/HelpModal';
import ContextProvider from '../../components/Context';
import Header from '../Header';
const Help: React.FC<NavigationType> = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const {
    emailModalVisible,
    setEmailModalVisible,
    callModalVisible,
    setCallModalVisible,
  } = useContext(ContextProvider);
  return (
    <View style={styles.container}>
      {emailModalVisible || callModalVisible ? <HelpModal /> : null}
      <Header>
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
      </Header>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{left: 310}}>
            <AlignLeft color={'#fff'} size={35} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>Help</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTxt_header}>How can we help you?</Text>
        <Text style={styles.cardTxt_body}>
          It's look like you are experiencing problems with our process. We are
          here to help so please in touch with us.
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setEmailModalVisible(true)}>
          <Send color={'#0032fc'} size={35} />
          <Text style={styles.btnTxt}>Email Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCallModalVisible(true)}>
          <Phone color={'#0032fc'} size={35} />
          <Text style={styles.btnTxt}>Call Us</Text>
        </TouchableOpacity>
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
  headerContainer: {
    bottom: 250,
    flex: 3,
  },
  header: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 70,
    top: 200,
  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
    top: 100,
    right: 50,
  },
  card: {
    flex: 2,
    alignItems: 'center',
    rowGap: 15,
  },
  cardTxt_header: {
    color: '#031f0a',
    fontSize: 25,
    fontWeight: '500',
  },
  cardTxt_body: {
    color: '#666',
    fontSize: 14,
    width: 400,
    textAlign: 'center',
    lineHeight: 25,
  },
  btnContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  btn: {
    backgroundColor: '#e3e3e3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: 140,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#031f0a',
    paddingTop: 20,
  },
});

export default Help;
