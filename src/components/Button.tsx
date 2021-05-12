import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean
}

export function Button ({ title, disabled = false, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity
      style={disabled ? styles.disabled : styles.enabled}
      {...rest}
      >
        <Text style={disabled ? styles.textDisabled : styles.text}>
          { title }
        </Text>
      </TouchableOpacity>
  )
}

const styles = EStyleSheet.create({
  disabled: {
    backgroundColor: colors.green_light,
    height: '4rem',
    borderRadius: '1rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enabled: {
    backgroundColor: colors.green,
    height: '4rem',
    borderRadius: '1rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDisabled: {
    fontSize: '1rem',
    color: colors.gray,
    fontFamily: fonts.heading
  },
  text: {
    fontSize: '1rem',
    color: colors.white,
    fontFamily: fonts.heading
  }
})