import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import { SelectDayButton } from '../components/SelectDayButton';
import { Button } from '../components/Button';
import { useRoute } from '@react-navigation/core';
import { format, parseISO } from 'date-fns';
import { PieChartWithCenteredLabels } from '../components/Chart';
import { CityProps, followCity, loadFollowedCities } from '../libs/storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CityDetailsParams {
  cityDetails: {
    city: string;
    city_ibge_code: number;
    estimated_population: number;
    last_available_confirmed: number;
    last_available_date: string;
    last_available_death_rate: number;
    last_available_deaths: number,
    new_confirmed: number;
    new_deaths: number;
  }[]
}

interface DateProps {
  key: string;
  title: string;
}



export function CityDetails() {
  const navigation = useNavigation();
  const [dates, setDates] = useState<DateProps[]>([]);
  const [details, setDetails] = useState<CityDetailsParams>();
  const [filteredDates, setFilteredDates] = useState();
  const [dateSelected, setDateSelected] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);
  const [updatedAt, setupdatedAt] = useState(String(new Date()));
  const [followed, setFollowed] = useState<CityProps[]>([]);

  const route = useRoute();

  const data = route.params as CityDetailsParams

  useEffect(() => {
    async function checkIfIsFollowed() {
      const citiesFollowed = await loadFollowedCities();
      const curretCityIbge = data.cityDetails[0].city_ibge_code;

      setFollowed(citiesFollowed)

      const check = citiesFollowed.find(city => city.ibge === String(curretCityIbge));

      if (check) {
        setIsFollowed(true)
      } else {
        setIsFollowed(false)
      }
    }

    checkIfIsFollowed()
  }, [])

  useEffect(() => {

    const datesFormatedd = data.cityDetails.map((item) => {
      const dateFormatted = format(parseISO(item.last_available_date), "dd'/'MM")

      return {
        key: item.last_available_date,
        title: dateFormatted
      }
    })

    setDates([
      {
        key: 'all',
        title: 'Total'
      },
      ...datesFormatedd
    ])
    
    
    setDetails(data)
    setFilteredDates(data.cityDetails)
    setDateSelected('all')
    setupdatedAt(format(parseISO(data.cityDetails[0].last_available_date), "dd'/'MM'/'yyyy"));
  }, [])



  function handleDateSelected(date: string) {
    setDateSelected(date);

    if (date === 'all')
      return setFilteredDates(data.cityDetails)

    const filtered = details?.cityDetails.find(item => item.last_available_date === date)

    setFilteredDates(filtered)
  }
  
  async function handleFollow() {
    try {
      if (followed.length !== 10){
      await followCity({
        ibge: String(data.cityDetails[0].city_ibge_code),
        name: data.cityDetails[0].city
        
      });
      Alert.alert(`Agora você esta seguindo ${data.cityDetails[0].city}`)
      navigation.navigate('Home')
    } else {
      Alert.alert('Você só pode seguir 10 municípios')
      return;
    }
    } catch {
      Alert.alert('Não foi possível seguir.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <Header
        actualScreenName={data.cityDetails[0].city}
      />
      <View style={styles.content}>
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Detalhes</Text>

          <View>
            <FlatList
              data={dates}
              keyExtractor={(item) => String(item.key)}
              renderItem={({ item }) => (
                <SelectDayButton
                  title={item.title}
                  active={item.key === dateSelected}
                  onPress={() => handleDateSelected(item.key)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.environmentList}
              ListHeaderComponent={<View />}
            />
          </View>
          
          <PieChartWithCenteredLabels 
              new_confirmed={dateSelected !== 'all' ? filteredDates?.new_confirmed : filteredDates[0].last_available_confirmed}
              new_deaths={dateSelected !== 'all' ? filteredDates?.new_deaths : filteredDates[0].last_available_deaths}
          />


          <View style={styles.legend}>

            <View style={styles.legendConfirmedItems}>
              <FontAwesome name="circle" style={styles.legendConfirmed} />
              <Text style={styles.legendConfirmedText}> - {dateSelected !== 'all' ? Intl.NumberFormat().format(filteredDates?.new_confirmed) : Intl.NumberFormat().format(filteredDates[0].last_available_confirmed)} Casos confirmados</Text>
            </View>


            <View style={styles.legendDeathsItems}>
              <FontAwesome name="circle" style={styles.legendDeaths} />
              <Text style={styles.legendDeathsText}> - {dateSelected !== 'all' ? Intl.NumberFormat().format(filteredDates?.new_deaths) : Intl.NumberFormat().format(filteredDates[0].last_available_deaths)} Óbitos</Text>
            </View>

            <View style={styles.legendDeathsItems}>
              <Text style={styles.legendDeathsText}>
                Taxa de mortalidade {dateSelected !== 'all' ?  (filteredDates?.last_available_death_rate * 100).toFixed(2) : (filteredDates[0].last_available_death_rate * 100).toFixed(2) }%
              </Text>
            </View>

          </View >
          <View style={styles.populationContainer}>
            <Text style={styles.populationText}>Populaçao estimada {Intl.NumberFormat().format(data.cityDetails[0].estimated_population)} habitantes</Text>
            </View>
        </View>
        <View style={styles.followButton}>
          <Button
            title={isFollowed ? 'Já seguindo' : 'Seguir município'}
            onPress={handleFollow}
            disabled={isFollowed}
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.shape,
    alignItems: 'center'
  },
  content: {
    width: '100%',
    flexDirection: 'column'
  },
  details: {
    backgroundColor: colors.white,
    width: '93%',
    padding: '0.9rem',
    borderRadius: '0.5rem',
    top: '-1.5rem',
    marginHorizontal: '0.9rem',

  },
  detailsTitle: {
    fontSize: '1.2rem',
    fontFamily: fonts.heading,
    marginLeft: '0.6rem',
    marginBottom: '0.6rem'
  },
  environmentList: {
    height: 40,
    paddingBottom: 5,
    marginVertical: '0.6rem'
  },
  legend: {
    alignItems: 'center',
    marginTop: '0.6rem'
  },
  legendConfirmedItems: {
    marginTop: '1.5rem',
    alignSelf: 'flex-start',
    marginHorizontal: '0.6rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  legendConfirmed: {
    fontSize: '1.5rem',
    color: colors.green
  },
  legendConfirmedText: {
    fontSize: '1rem',
    fontFamily: fonts.text,
    marginLeft: '0.1rem'
  },
  legendCuredItems: {
    marginTop: '1.5rem',
    alignSelf: 'flex-start',
    marginHorizontal: '0.6rem',
    flexDirection: 'row',
    alignItems: 'center'
  },
  legendDeathsItems: {
    marginTop: '1.5rem',
    alignSelf: 'flex-start',
    marginHorizontal: '0.6rem',
    flexDirection: 'row',
    alignItems: 'center'
  },
  legendDeaths: {
    fontSize: '1.5rem',
    color: colors.red
  },
  legendDeathsText: {
    fontSize: '1rem',
    fontFamily: fonts.text,
    marginBottom: '1rem'
  },
  populationContainer: {
    alignItems: 'center',
    top: '2.5rem'
  },
  populationText: {
    fontFamily: fonts.text,
    fontSize: '0.75rem',
    color: colors.heading,
  },
  followButton: {
    width: '50%',
    height: '1rem',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '1rem'
  }
})