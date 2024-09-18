import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This app needs to access your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } else {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return status === RESULTS.GRANTED;
    } else {
      console.log('Location permission denied');
      return false;
    }
  }
};

const getLocation = (): Promise<{
  deviceLatitude: number;
  deviceLongitude: number;
}> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({deviceLatitude: latitude, deviceLongitude: longitude});
      },
      error => {
        console.log('Error getting location:', error.message);
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};

const GetLocation = async (
  retryCount: number = 0,
): Promise<{deviceLatitude: number; deviceLongitude: number} | null> => {
  const hasPermission = await requestLocationPermission();
  if (hasPermission) {
    try {
      const location = await getLocation();
      return location;
    } catch (error) {
      console.log('Failed to get location:', error);
      console.log(`Retrying to get location... Attempt: ${retryCount + 1}`);
      return await GetLocation(retryCount + 1);
    }
  } else {
    console.log('Location permission not granted');
    return null;
  }
};

export default GetLocation;
