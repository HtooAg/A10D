import LottieView from "lottie-react-native";
import { View } from "react-native";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(204, 204, 204, .85)',
        zIndex: 5,
      }}>
      <LottieView
        source={require('../json/loading.json')}
        autoPlay
        loop
        style={{width: 150, height: 150}}
      />
    </View>
  );
};

export default Loading;