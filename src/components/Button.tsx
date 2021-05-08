import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
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

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: colors.green_light,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  enabled: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDisabled: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: fonts.heading
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
})