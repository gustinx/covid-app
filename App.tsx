import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar';
import { useFonts, Jost_400Regular, Jost_600SemiBold, Jost_700Bold } from '@expo-google-fonts/jost'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'


import Routes from './src/routes';

EStyleSheet.build({})

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_700Bold
  });

  useEffect(() => {
    async function getUserLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      

      await fetch(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=JY5it_4Kg7phKr64ljgiSTJ3w-LJo9zWnW9NW_wURbo&mode=retrieveAddresses&prox=${loc.coords.latitude},${loc.coords.longitude}`)
      .then((response) => response.json())
      .then(async (responseJson) => {
        const PostalCode = responseJson.Response.View[0].Result[0].Location.Address.PostalCode;
        await AsyncStorage.setItem('@newssarscovid19:loc', JSON.stringify({PostalCode}))
      })

      
    };
    getUserLocation()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <Routes />
    </SafeAreaProvider>
  );
}

