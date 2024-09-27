import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import {ChevronLeft} from 'lucide-react-native';
import GetLocation from './GetLocation';
import MapView, {Marker} from 'react-native-maps';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import { mainStyles } from '../../components/MainStyle';
import { getRequestWithToken, setAuthToken } from '../../api/Api';
import { useSelector } from 'react-redux';

const AttendanceDetailOfLocation: React.FC<NavigationType> = ({navigation, route}) => {
  const [markers, setMarkers] = useState([
    {latitude: 16.8501223, longitude: 96.1282766, title: 'Marker 1'},
  ]);
  const [deviceLocation, setDeviceLocation] = useState<{
    deviceLatitude: number;
    deviceLongitude: number;
  } | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [attendanceDetail, setAttendanceDetail] = useState([]);
  const loginUser = useSelector(state => state.login.loginUser);
  const {id, item} = route.params;
  console.log('Map Id: ', id);
  console.log('Map Detail: ', item);
  // console.log('Attendace Data', attendanceDetail);

  const fetchAttendandceDetail = async () => {
    try {
      setAuthToken(loginUser.token.access_token);
      const response = await getRequestWithToken(
        `/api/v1/attendances/${id}`,
      );
      setAttendanceDetail(response.data.data);
      console.log('Attendace Data', attendanceDetail);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await GetLocation();
      if (location) {
        setDeviceLocation(location);
        setMarkers([
          ...markers,
          {
            latitude: location.deviceLatitude,
            longitude: location.deviceLongitude,
            title: 'device location',
          },
        ]);
      }
    };
    fetchLocation();
    fetchAttendandceDetail();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text
          style={[styles.navBar_Txt, {fontFamily: mainStyles.fontPoppinsBold}]}>
          {item?.location_name}
        </Text>
        <Text style={{opacity: 0}}>Detail</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: deviceLocation ? deviceLocation.deviceLatitude : 16.8501223,
          longitude: deviceLocation
            ? deviceLocation.deviceLongitude
            : 96.1282766,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.02105,
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[300, 500]}>
        <BottomSheetView style={styles.sheetContainer}>
          <View style={styles.sheetCardContainer}>
            <Text style={styles.sheetTitle}>{item?.location_name}</Text>
            <View style={styles.sheetCard}>
              <View style={{...styles.sheetCard_Item}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    fontFamily: mainStyles.fontPoppinsBold,
                    fontSize: 18,
                  }}>
                  Action
                </Text>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    fontFamily: mainStyles.fontPoppinsBold,
                    fontSize: 18,
                  }}>
                  Time
                </Text>
              </View>
              <View style={{...styles.sheetCard_Item}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    textTransform: 'uppercase',
                    fontFamily: mainStyles.fontPoppinsItalic,
                  }}>
                  {item?.action}
                </Text>
                <Text
                  style={[
                    styles.sheetCard_ItemTxt,
                    {fontFamily: mainStyles.fontPoppinsItalic},
                  ]}>
                  {item?.time}
                </Text>
              </View>
              <View style={{...styles.sheetCard_Item, marginTop: 50}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    textTransform: 'uppercase',
                    fontFamily: mainStyles.fontPoppinsBold,
                  }}>
                  Latitude
                </Text>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    textTransform: 'uppercase',
                    fontFamily: mainStyles.fontPoppinsBold,
                  }}>
                  Longitude
                </Text>
              </View>
              <View style={{...styles.sheetCard_Item}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    textTransform: 'uppercase',
                    fontFamily: mainStyles.fontPoppinsItalic,
                  }}>
                  {item?.latitude}
                </Text>
                <Text
                  style={[
                    styles.sheetCard_ItemTxt,
                    {fontFamily: mainStyles.fontPoppinsItalic},
                  ]}>
                  {item?.longitude}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#ccc',
              marginHorizontal: 10,
            }}>
            <FlatList
              data={attendanceDetail}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View>
                  
                </View>
              )}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  navBar: {
    height: 60,
    backgroundColor: '#0032fc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 1,
  },
  navBar_Txt: {
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsBold,
    color: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: mainStyles.backgroundColor,
  },
  sheetCardContainer: {
    paddingHorizontal: 20,
  },
  sheetCard: {
    rowGap: 10,
  },
  sheetCard_Item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  sheetCard_ItemTxt: {
    color: mainStyles.textColor,
    fontSize: mainStyles.textFontSize,
  },
});

export default AttendanceDetailOfLocation;
