import {FC} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

type childType = {
  children: any;
};
export const screenWidth = Dimensions.get('window').width; // Get screen width

const Header: FC<childType> = ({children}) => {
  return (
    <View style={styles.container}>
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
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  bluePart: {
    position: 'absolute',
    top: -100,
    backgroundColor: 'blue',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
});

export default Header;
