import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";

import colors from '../styles/colors';
import Animated from 'react-native-reanimated';
import fonts from '../styles/fonts';

interface FollowedCitiesProps extends RectButtonProps {
  city_name: string;
  confirmed_cases: number;
  handleRemove?: () => void;
}

export function FollowedCityCard({ city_name, confirmed_cases, handleRemove, ...rest }: FollowedCitiesProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name="trash" size={28} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <Text style={styles.cityName}>
          {city_name}
        </Text>
        <Text style={styles.confirmedCases}>
          {confirmed_cases}
        </Text>
      </RectButton>
    </Swipeable>
  )
}

const styles = EStyleSheet.create({
  container: {
    width: '11rem',
    height: '4rem',
    justifyContent: 'center',
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    borderRadius: '0.5rem',
    margin: '0.4rem',
    paddingHorizontal: '0.9rem'
  },
  cityName: {
    fontSize: '0.75rem',
    fontFamily: fonts.text,
    color: colors.heading
  },
  confirmedCases: {
    fontSize: '1.2rem',
    fontFamily: fonts.heading,
  },
  buttonRemove: {
    width: '4rem',
    height: '3.3rem',
    marginTop: '0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: '1rem',
    paddingLeft: '0.9rem'
  }
})