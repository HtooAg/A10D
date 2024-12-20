import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [displayedText, setDisplayedText] = useState('');
  const [displayedEndText, setDisplayedEndText] = useState('');
  const fullText = 'More Presence...';
  const endText = 'Better Attendance...';

  const rotateY = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    const spinAnimation = () => {
      rotateValue.setValue(0);
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spinAnimation());
    };
    spinAnimation();

    let currentIndex = 0;
    let typingTimeout: any;

    const typeFullText = () => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex += 1;
        typingTimeout = setTimeout(typeFullText, 50);
      } else {
        setTimeout(typeEndText, 300);
      }
    };

    let endIndex = 0;
    const typeEndText = () => {
      if (endIndex <= endText.length) {
        setDisplayedEndText(endText.substring(0, endIndex));
        endIndex += 1;
        typingTimeout = setTimeout(typeEndText, 50);
      } else {
        // clearEndText();
        null;
      }
    };

    const clearEndText = () => {
      let endClearIndex = endText.length;
      const clearEndTextInterval = setInterval(() => {
        if (endClearIndex >= 0) {
          setDisplayedEndText(endText.substring(0, endClearIndex));
          endClearIndex -= 1;
        } else {
          clearInterval(clearEndTextInterval);
          clearFullText();
        }
      }, 100);
    };

    const clearFullText = () => {
      let fullClearIndex = fullText.length;
      const clearFullTextInterval = setInterval(() => {
        if (fullClearIndex >= 0) {
          setDisplayedText(fullText.substring(0, fullClearIndex));
          fullClearIndex -= 1;
        } else {
          clearInterval(clearFullTextInterval);
          setDisplayedEndText('');
          currentIndex = 0;
          endIndex = 0;
          typeFullText();
        }
      }, 100);
    };

    typeFullText();

    return () => clearTimeout(typingTimeout);
  }, [rotateValue]);

  return (
    <>
      <LinearGradient
        colors={['rgba(0, 50, 252, 1)', 'rgba(0, 50, 252, 1)']}
        style={styles.gradientContainer}
        start={{x: 0.5, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.iconContainer}>
          <Animated.Image
            style={[
              styles.icon,
              {
                transform: [{perspective: 1000}, {rotateY}],
              },
            ]}
            source={require('../assets/imgs/location.png')}
          />
          <Text style={styles.text}>A 10 D</Text>
        </View>

        <View style={styles.textContainer}>
          <View
            style={{
              width: 200,
            }}>
            <Text style={styles.fullText}>{displayedText}</Text>
          </View>

          <View
            style={{
              width: 200,
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.endText}>{displayedEndText}</Text>
          </View>
        </View>

        <View style={{flex: 1}}></View>
      </LinearGradient>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  icon: {
    width: 130,
    height: 130,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 55,
    letterSpacing: 2,
    width: 200,
    textAlign: 'center',
    fontWeight: '700',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    width: 320,
    justifyContent: 'center',
  },
  fullText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#fafcfc',
    letterSpacing: 1,
  },
  endText: {
    marginStart: 25,
    fontSize: 15,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#fafcfc',
    letterSpacing: 1,
  },
});
