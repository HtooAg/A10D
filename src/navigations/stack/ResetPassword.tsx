import React, { Component, FC, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { screenWidth } from '../Header';
import { ArrowLeft } from 'lucide-react-native';
import { NavigationType } from '../../type_hint/navType';
import { mainStyles } from '../../components/MainStyle';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const ResetPassword: FC<NavigationType> = ({navigation}) => {

    const CELL_COUNT = 6;

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });


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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}>
          <ArrowLeft color={'#fff'} size={25} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Verify your eamil</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTxt_header}>
          Please enter the 4-digit sent to your email
        </Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          testID="my-code-input"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}>
          <Text style={styles.buttonTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bluePart: {
    position: 'absolute',
    top: -screenWidth / 4, // Adjusting based on screen size
    backgroundColor: '#0032fc',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  header: {
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconContainer: {
    position: 'absolute',
    left: 20,
  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 1,
    top: screenWidth / 3,
    left: screenWidth / 4,
  },
  card: {
    flex: 5, // Card takes more space now
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTxt_header: {
    color: '#666',
    width: 200,
    textAlign: 'center',
    fontSize: mainStyles.textFontSize,
    fontFamily: mainStyles.fontPoppinsRegular,
    marginBottom: 10,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 20,
    columnGap: 10,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    color: '#000',
  },
  focusCell: {
    borderColor: '#000',
    color: '#000',
  },
  button: {
    backgroundColor: mainStyles.backgroundColor,
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 18,
    fontFamily: mainStyles.fontPoppinsItalic,
  },
});

export default ResetPassword;
