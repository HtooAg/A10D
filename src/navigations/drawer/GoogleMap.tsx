import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from './GetLocation';
import {ChevronLeft} from 'lucide-react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {mainStyles} from '../../components/MainStyle';
import {getRequest, postRequest} from '../../api/Api';
import {Controller, useForm} from 'react-hook-form';
const apiKey = `AIzaSyCvalwepO3-J4QeiNP5SjmMwttdh44NOsw`;

const GoogleMap = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [markers, setMarkers] = useState([
    {latitude: 16.8501223, longitude: 96.1282766, title: 'Marker 1'},
  ]);
  const [location, setLocation] = useState<object>({});
  const [deviceData, setDeviceData] = useState({});

  const [deviceLocation, setDeviceLocation] = useState<{
    deviceLatitude: number;
    deviceLongitude: number;
  } | null>(null);

  // const getLocation = async () => {
  //   const data = await GetLocation();
  //   setLocation(data || {});
  //   console.log('Location: ', location);
  // };

  const responseOfDevice = async () => {
    //  await setAuthToken(loginUser?.token?.access_token);
    const response = await getRequest(`/api/v1/devices`);
    setDeviceData(response.data);
    console.log('Device Data: ', response.data);
  };

  const registerHomeAPI = async data => {
    const device_id = deviceData?.data?.find(
      device => device.state === 'APPROVED',
    );
    console.log('Device ID:', device_id);
    const response = await postRequest('/api/v1/register-home-location', {
      name: data.name,
      device_id: device_id.id,
      latitude: location.deviceLatitude,
      longitude: location.deviceLongitude,
    });
    console.log('Response Data:', response.data);
  };

  const fetchLocation = async () => {
    const location = await GetLocation();
    setLocation(location || {});

    console.log(location);
    if (location) {
      setDeviceLocation(location);
      setMarkers(prevMarkers => [
        ...prevMarkers,
        {
          latitude: location.deviceLatitude,
          longitude: location.deviceLongitude,
          title: 'device location',
        },
      ]);
    }
  };
  useEffect(() => {
    // await   fetchLocation();
    // getLocation();
    responseOfDevice();
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
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter Place Name"
                  placeholderTextColor="#000"
                />
              )}
              name="name"
            />
            {errors?.name && (
              <Text style={{color: 'red', fontSize: 10}}>
                Place Name is required.
              </Text>
            )}
            <Pressable
              style={styles.buttonStyle}
              onPress={handleSubmit(registerHomeAPI)}>
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
                <Text style={{color: '#000'}}>{location.deviceLatitude}</Text>
              </View>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
                  Longitude
                </Text>
                <Text style={{color: '#000'}}>{location.deviceLongitude}</Text>
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
    paddingHorizontal: 10,
    paddingTop: 25,
    zIndex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  sheetStyle: {
    paddingHorizontal: 12,
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
    alignItems: 'center',
    gap: 50,
  },
  headerTxt: {
    color: '#fff',
    fontSize: mainStyles.navFontSize,
    fontFamily: mainStyles.fontPoppinsBold,
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
