import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: colors.green,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.white,
  },
  updatedAt: {
    color: colors.heading,
    fontSize: 12,
    fontFamily: fonts.text
  }
})