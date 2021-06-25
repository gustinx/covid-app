import React from 'react';
import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/loading.json';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    width: 200,
    height: 200
  }
})

