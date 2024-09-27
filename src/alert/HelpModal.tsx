import { X } from 'lucide-react-native';
import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  View, Dimensions,
  Modal,
  Linking,
  Pressable
} from 'react-native';
import ContextProvider, { useCustomContext } from '../components/Context';

type Device = {
  setChangeDevice: boolean;
};
const HelpModal: React.FC<Device> = () => {
  const screenWidth = Dimensions.get('window').width;
  const {
    emailModalVisible,
    setEmailModalVisible,
    callModalVisible,
    setCallModalVisible,
  } = useCustomContext();

  return (
    <>
      <Modal
        transparent={true}
        visible={emailModalVisible}
        animationType="slide"
        onRequestClose={() => setEmailModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setEmailModalVisible(false)}>
              <X size={24} color="#000" />
            </Pressable>
            <Text style={styles.modalTitle}>Email to</Text>
            <Pressable
              onPress={() => Linking.openURL('mailto:yimontint.ymt@gmail.com')}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                overflow: 'hidden',
                borderColor: '#e3e3e3',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  fontSize: 17,
                  fontWeight: 500,
                }}>
                YMT
              </Text>
              <Text
                style={{
                  ...styles.modalText,
                  backgroundColor: 'blue',
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                }}>
                yimontint.ymt@gmail.com
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={callModalVisible}
        animationType="slide"
        onRequestClose={() => setCallModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setCallModalVisible(false)}>
              <X size={24} color="#000" />
            </Pressable>
            <Text style={styles.modalTitle}>Contact to</Text>
            <Pressable
              onPress={() => Linking.openURL('tel:09750115358')}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                overflow: 'hidden',
                borderColor: '#e3e3e3',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  fontSize: 17,
                  fontWeight: 500,
                }}>
                YMT
              </Text>
              <Text
                style={{
                  ...styles.modalText,
                  backgroundColor: 'blue',
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                }}>
                09750115358
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: "center"
  },
  modalText: {
    fontSize: 16,
color: '#fff',
  },
  closeButton: {
   alignSelf: "flex-end",
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HelpModal;
