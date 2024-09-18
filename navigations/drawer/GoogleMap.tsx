import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Pressable} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from './GetLocation';
import {ChevronLeft} from 'lucide-react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';
const apiKey = `AIzaSyCvalwepO3-J4QeiNP5SjmMwttdh44NOsw`;
const GoogleMap = ({navigation}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [markers, setMarkers] = useState([
    {latitude: 16.8501223, longitude: 96.1282766, title: 'Marker 1'},
  ]);

  const [deviceLocation, setDeviceLocation] = useState<{
    deviceLatitude: number;
    deviceLongitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await GetLocation();
      console.log(location)
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Request Location</Text>
        <View />
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
        snapPoints={['35%', '50%']}>
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.sheetStyle}>
            <Text style={styles.headerTitle}>Marked Location</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Place Name"
              placeholderTextColor="black"
            />
            <Pressable style={styles.buttonStyle}>
              <Text style={{color: 'white', fontSize: 18}}>
                Request Location
              </Text>
            </Pressable>
            <Text style={styles.headerTitle}>Address</Text>
            <View style={styles.addressStyle}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
                  Latitude
                </Text>
                <Text style={{color: '#000'}}>
                  {markers[markers.length - 1].latitude}
                </Text>
              </View>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
                  Longitude
                </Text>
                <Text style={{color: '#000'}}>
                  {markers[markers.length - 1].longitude}
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
  header: {
    backgroundColor: '#0032fc',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingLeft: 25,
    zIndex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#000"
  },
  sheetStyle: {
    paddingHorizontal:12,
    paddingVertical: 12,
   
  },
  inputStyle: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  buttonStyle: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 13,
    marginBottom: 20,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  addressStyle: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
    alignItems: "center",
    gap: 50,
  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMap;
