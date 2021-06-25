import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface SelectCityCardProps extends RectButtonProps {
  name: string;
  uf: string
}

export function SelectCityCard({name, uf, ...rest}: SelectCityCardProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <Text style={styles.text}>
        {name} - {uf}
      </Text>
    </RectButton>
  )
}

const styles = EStyleSheet.create({
  container: {
    padding: '0.9rem',
    backgroundColor: colors.white,
    marginBottom: '0.4rem',
    borderRadius: '0.5rem'
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.heading,
    alignSelf: 'flex-start',
  },
})