import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.actualCity}>
          <Text style={styles.actualCityText}>Municipio atual - Pontal</Text>

          <View style={styles.actualCityContent}>
            <Text style={styles.actualCityContentText}>Casos confirmados</Text>
            <Text style={styles.confirmedCasesNumber}>4.019</Text>
          </View>

          <View style={styles.actualCityContent}>
            <Text style={styles.actualCityContentText}>Total de óbitos</Text>
            <Text style={styles.totalDeathsNumber}>140</Text>
          </View>

          <View style={styles.actualCityContent}>
            <Text style={styles.actualCityContentText}>Total curados</Text>
            <Text style={styles.totalCuresNumber}>3.797</Text>
          </View>

          <View style={styles.actualCityContent}>
            <Text style={styles.actualCityContentText}>Taxa de mortalidade</Text>
            <Text style={styles.mortalityNumber}>3.10%</Text>
          </View>

        </View>

        <View>
          <Text style={styles.followedCitiesTitle}>Casos confirmados nos municípios {'\n'}
            que você segue</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shape
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  actualCity: {
    backgroundColor: colors.white,
    width: '93%',
    padding: 20,
    borderRadius: 8,
    top: -25,
  },
  actualCityText: {
    fontSize: 20,
    fontFamily: fonts.heading,
  },
  actualCityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  actualCityContentText: {
    fontSize: 18,
    fontFamily: fonts.text_semibold,
    color: colors.gray_dark
  },
  confirmedCasesNumber: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.green
  },
  totalDeathsNumber: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.red
  },
  totalCuresNumber: {
    fontSize: 18,
    fontFamily: fonts.heading,
  },
  mortalityNumber: {
    fontSize: 18,
    fontFamily: fonts.heading,
  },
  followedCitiesTitle: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: 16
  }
})