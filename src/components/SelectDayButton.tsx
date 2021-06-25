import React from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function SelectDayButton({ title, active = false, ...rest }: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive
        ]}>
        { title }
      </Text>
    </RectButton>
  )
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: '4rem',
    height: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.75rem',
    marginHorizontal: '0.2rem'
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
});