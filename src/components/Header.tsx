import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Header(){
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.text}>Olá, Mateus</Text>
      <Text style={styles.updatedAt}>*Dados atualizados em 27/04/2021</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    height: '5rem',
    backgroundColor: colors.green,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    paddingHorizontal: '1rem',
    alignItems: 'center'
  },
  text: {
    fontSize: '1.25rem',
    fontFamily: fonts.heading,
    color: colors.white,
  },
  updatedAt: {
    color: colors.heading,
    fontSize: '0.7rem',
    fontFamily: fonts.text,
  }
})