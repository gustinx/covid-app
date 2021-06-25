import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function AboutUs() {
  const [name, setName] = useState('');

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem('@newssarscovid19:user');

      setName(String(user))
    }
    getUserName()
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        actualScreenName='Sobre nós'
      />
      <View style={styles.content}>
        <Text style={styles.aboutUsText}>
          {name}, aqui você encontrará informações sobre o nosso
          Projeto Integrador VI no curso de Engenharia da computação da 
          UNIVESP
        </Text>
      </View>

      <View style={styles.aboutUs}>
        <Text style={styles.aboutUsInfo}>
          Este APP é a solução proposta pelo nosso grupo para o Projeto Integrador VI da UNIVESP.
          {'\n'}
          {'\n'}
          <Text style={{ fontFamily: fonts.heading }}>Integrantes do grupo:</Text>
          {'\n'}
          {'\n'}
          - Daniel do Nascimento
          {'\n'}
          - Leonardo Tardim Ditadi
          {'\n'}
          - Luciano Rosa
          {'\n'}
          - Mateus Bueno Santos 
          {'\n'}
          - Paulo Victor Rodrigues Siqueira 
          {'\n'}
          - Roberto Lucio Bazan Mari 
          {'\n'}
          - Silvio Parede Sanchez Junior
          {'\n'}
          {'\n'}
          <Text style={{ fontFamily: fonts.heading }}>Orientador: </Text>Ray Silva
          {'\n'}
          {'\n'}
          UNIVESP - Polo: Pontal - Grupo 4N.1
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shape
  },
  content: {
    backgroundColor: colors.white,
    width: '93%',
    padding: '0.9rem',
    borderRadius: '0.5rem',
    top: '-1.5rem',
    marginHorizontal: '0.9rem',
    alignItems: 'center',
  },
  aboutUsText: {
    textAlign: 'center',
    fontSize: '1rem',
    fontFamily: fonts.text,
    color: colors.heading
  },
  aboutUs: {
    backgroundColor: colors.white,
    width: '93%',
    padding: '0.9rem',
    marginHorizontal: '0.9rem',
    alignItems: 'center',
    borderRadius: '0.5rem',
  },
  aboutUsInfo: {
    textAlign: "justify",
    fontFamily: fonts.text,
    fontSize: '1rem',
    color: colors.heading
  }
})