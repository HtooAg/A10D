import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Location from "./drawer/Location";
import GoogleMap from "./drawer/GoogleMap";
const LocationStack = () => {
	 const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Location">
      <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoogleMap"
        component={GoogleMap}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default LocationStack;