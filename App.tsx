import React from 'react';
import AppLoading from 'expo-app-loading';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Jost_400Regular, Jost_600SemiBold, Jost_700Bold } from '@expo-google-fonts/jost'

import Routes from './src/routes';

EStyleSheet.build({})

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style='auto' />
      <Routes />
    </>
  );
}

