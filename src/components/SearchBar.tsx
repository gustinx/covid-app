import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function SearchBar({...rest}: TextInputProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name='search' style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder='Digite o nome da cidade...'
        placeholderTextColor={colors.gray}
        {...rest}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    width: '93%',
    height: '3rem',
    backgroundColor: colors.white,
    borderRadius: '1.5rem',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '0.9rem',
    top: '-1.5rem',
  },
  searchIcon: {
    fontSize: '1.7rem',
    color: colors.gray,
    marginHorizontal: '0.9rem'
  },
  searchInput: {
    fontFamily: fonts.text,
    color: colors.heading,
    width: '100%'
  }
})