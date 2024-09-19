import React, {useState, useEffect, FC} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {ChevronDown, ChevronUp} from 'lucide-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NavigationType} from '../../type_hint/navType';

const SpaceId: FC<NavigationType> = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [customInput, setCustomInput] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      spaceName: '',
    },
  });

  // useFocusEffect(
  //   React.useCallback(() => {
  //     reset({spaceName: 'Space name'});
  //   }, [reset]),
  // );

  const onSubmit = data => {
    navigation.navigate('Login', {spaceId: data.spaceName});
  };

  const emojisWithIcons = [{title: 7}];

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
      <View style={{top: screenWidth / 15, rowGap: screenWidth / 8}}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{left: screenWidth / 1.6}}>
          <Text style={styles.btnTxt}>Next</Text>
        </TouchableOpacity>
        <Text style={{...styles.headerText, right: screenWidth / 10}}>
          Enter your space id
        </Text>
      </View>

      <View style={{top: screenWidth / 4}}>
        <Controller
          control={control}
          rules={{
            validate: value => {
              if (!value) {
                return 'Space name is required';
              }
              return true;
            },
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <SelectDropdown
              data={emojisWithIcons}
              onSelect={selectedItem => onChange(selectedItem.title)}
              renderButton={(selectedItem, isOpened) => (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem ? (
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedItem && selectedItem.title}
                    </Text>
                  ) : (
                    <TextInput
                      value={value}
                      placeholder="Space name"
                      placeholderTextColor="#000"
                      autoCapitalize="none"
                      cursorColor={'#000'}
                      onChangeText={onChange}
                      style={styles.textInput}
                    />
                  )}

                  {isOpened ? (
                    <ChevronUp color={'#000'} />
                  ) : (
                    <ChevronDown color={'#000'} />
                  )}
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          )}
          name="spaceName"
        />
        {errors.spaceName && (
          <Text style={{color: 'red', marginTop: 5}}>
            {errors.spaceName.message} Space name is required.
          </Text>
        )}
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
    top: -180,
    backgroundColor: '#0032fc',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 2,
    fontSize: 26,
    width: 200,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  dropdownButtonStyle: {
    width: '90%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  textInput: {
    flex: 1,
    color: '#151E26',
  },
});

export default SpaceId;
