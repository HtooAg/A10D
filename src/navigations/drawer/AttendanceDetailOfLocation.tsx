import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {NavigationType} from '../../type_hint/navType';
import {ChevronLeft} from 'lucide-react-native';
import GetLocation from './GetLocation';
import MapView, {Marker} from 'react-native-maps';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import { mainStyles } from '../../components/MainStyle';

const AttendanceDetailOfLocation: React.FC<NavigationType> = ({navigation}) => {
  const [markers, setMarkers] = useState([
    {latitude: 16.8501223, longitude: 96.1282766, title: 'Marker 1'},
  ]);

  const [deviceLocation, setDeviceLocation] = useState<{
    deviceLatitude: number;
    deviceLongitude: number;
  } | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

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
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={'#fff'} size={35} strokeWidth={0.9} />
        </TouchableOpacity>
        <Text style={styles.navBar_Txt}>Location(MICT)</Text>
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
            <Text style={styles.sheetTitle}>MICT</Text>
            <View style={styles.sheetCard}>
              <View style={{...styles.sheetCard_Item}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    fontWeight: '700',
                    fontSize: 18,
                  }}>
                  Action
                </Text>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    fontWeight: '700',
                    fontSize: 18,
                    paddingRight: 30,
                  }}>
                  Time
                </Text>
              </View>
              <View style={{...styles.sheetCard_Item}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    textTransform: 'uppercase',
                  }}>
                  Check-In
                </Text>
                <Text style={styles.sheetCard_ItemTxt}>hh-mm-ss</Text>
              </View>
              <View style={{...styles.sheetCard_Item, marginTop: 50}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    fontWeight: '700',
                  }}>
                  Latitude
                </Text>
                <Text style={{...styles.sheetCard_ItemTxt, fontWeight: '700'}}>
                  Longitude
                </Text>
              </View>
              <View style={{...styles.sheetCard_Item}}>
                <Text
                  style={{
                    ...styles.sheetCard_ItemTxt,
                    textTransform: 'uppercase',
                  }}>
                  {deviceLocation?.deviceLatitude}
                </Text>
                <Text style={styles.sheetCard_ItemTxt}>
                  {deviceLocation?.deviceLongitude}
                </Text>
              </View>
            </View>
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
    color: '#0032fc',
    // color: '#031f0a',
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
    color: '#666',
    fontSize: 16,
  },
});

export default AttendanceDetailOfLocation;
