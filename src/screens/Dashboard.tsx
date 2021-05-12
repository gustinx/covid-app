import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FollowedCityCard } from '../components/FollowedCityCard';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton } from 'react-native-gesture-handler';

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

        <View style={styles.followedCitiesList}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            keyExtractor={(item) => String(item)}
            renderItem={({ item }) => (
              <FollowedCityCard
                city_name='Pontal'
                confirmed_cases={767}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>

      </View>

      <View style={styles.addCitiesToFollow}>
        <RectButton style={styles.addCitiesToFollowButton}>   
          <Feather name='plus' size={18} color={colors.white} />
        </RectButton>
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
    flex: 1,
  },
  actualCity: {
    backgroundColor: colors.white,
    width: '93%',
    padding: '1rem',
    borderRadius: '0.5rem',
    top: '-1.5rem',
    marginHorizontal: '0.9rem'
  },
  actualCityText: {
    fontSize: '1rem',
    fontFamily: fonts.heading,
  },
  actualCityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '0.6rem',
  },
  actualCityContentText: {
    fontSize: '1rem',
    fontFamily: fonts.text_semibold,
    color: colors.heading
  },
  confirmedCasesNumber: {
    fontSize: '1rem',
    fontFamily: fonts.heading,
    color: colors.green
  },
  totalDeathsNumber: {
    fontSize: '1rem',
    fontFamily: fonts.heading,
    color: colors.red
  },
  totalCuresNumber: {
    fontSize: '1rem',
    fontFamily: fonts.heading,
  },
  mortalityNumber: {
    fontSize: '1rem',
    fontFamily: fonts.heading,
  },
  followedCitiesTitle: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: '0.9rem'
  },
  followedCitiesList: {
    flex: 1,
    marginTop: '0.9rem',
    paddingHorizontal: '0.9rem',
    alignItems: 'center'
  },
  addCitiesToFollow: {
    alignSelf: 'center',
    marginVertical: '0.6rem'
  },
  addCitiesToFollowButton: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '1.2rem',
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  }
})