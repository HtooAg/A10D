import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import {AlignLeft, Clock} from 'lucide-react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';

type Noti = {
  setChangeDevice: boolean;
};
type Types = Noti & NavigationType;
const Noti: React.FC<Types> = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
      style={{flex: 1, position: 'relative', zIndex: 0, alignItems: 'center'}}>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <AlignLeft color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Notification Setting</Text>
      </View>
      <View style={{flex: 1, top: 30, rowGap: 10}}>
        <View style={{...styles.card}}>
          <ScrollView contentContainerStyle={{rowGap: 10}}>
            <View style={styles.cardBody}>
              <Text style={{color: '#000'}}>Notification Alert</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={{color: '#000'}}>Check In Time</Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text style={{color: 'lightgreen'}}>9:00 AM</Text>
                <Clock size={21} color="lightgreen" />
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={{color: '#000'}}>Check Out Time</Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text style={{color: 'lightgreen'}}>9:00 AM</Text>
                <Clock size={21} color="lightgreen" />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    right: 30,
    top: 20,
    flex: 1,
  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
    letterSpacing: 1,
    paddingStart: 50,
    paddingTop: 30,
    width: 290,
  },
  changeDevice: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    right: 20,
  },
  changeDevice_Txt: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  card: {
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    // flex: 2
  },
  cardBody: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    columnGap: 20,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: '#ddd',
  },
  cardTxt: {
    textTransform: 'uppercase',
    color: '#000',
  },
});

export default Noti;
