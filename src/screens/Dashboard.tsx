import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FollowedCityCard } from '../components/FollowedCityCard';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';

import { Loading } from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, getCovidData } from '../services/api';
import { CityProps, loadFollowedCities, unfollowCity } from '../libs/storage';

export function Dashboard() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [city, setCity] = useState('');
  const [cityDetails, setCityDetails] = useState([])
  const [loading, setloading] = useState(false);
  const [confirmedCases, setConfirmedCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [mortality, setMortality] = useState(0);
  const [updatedAt, setupdatedAt] = useState(String(new Date()));
  const [name, setName] = useState('kkk');
  const [followedCities, setFollowedCities] = useState<CityProps[]>([]);

  useEffect(() => {
    async function getUserName() {
      
      const user = await AsyncStorage.getItem('@newssarscovid19:user');

      setName(String(user));
    }
    getUserName()
  },[])

  useEffect(() => {
    async function loadStoragedCities() {
      
      const citiesFollowed = await loadFollowedCities();

      setFollowedCities(citiesFollowed);
      
    }
    loadStoragedCities()
  }, [isFocused])

  useEffect(() => {
    async function loadDetails() {
      setloading(true);
      const cep = await AsyncStorage.getItem('@newssarscovid19:loc');
      const { PostalCode } = JSON.parse(cep!);
      let data = await getCovidData(PostalCode);

      setCityDetails(data)
      setCity(data.results[0].city);
      setConfirmedCases(data.results[0].last_available_confirmed);
      setDeaths(data.results[0].last_available_deaths);
      setMortality(data.results[0].last_available_death_rate * 100);
      setupdatedAt(format(parseISO(data.results[0].last_available_date), "dd'/'MM'/'yyyy"));
      setloading(false)
      
    }
    
    loadDetails();
    
    
  }, [])

  

function handleRemove(city: CityProps) {
  Alert.alert("Remover", `Deseja mesmo deixar de seguir  ${city.name}?`, [
    {
      text: 'Não',
      style: 'cancel'
    },
    {
      text: 'Sim',
      onPress: async () => {
        try {
          await unfollowCity(city.ibge);

          setFollowedCities((oldData) => 
            oldData.filter((item) => item.ibge !== city.ibge)
          );  
        } catch (error) {
          Alert.alert('Não foi possível remover!')
        }
      }
    }
  ])
}

  function handleActualCityDetails() {
    navigation.navigate('CityDetails', { cityDetails: cityDetails.results});
  }

  const handleCityDetails = async (ibge: number) => {
    const { data } = await api.get(`?city_ibge_code=${ibge}&is_repeated=False&page_size=5&format=json`);
    navigation.navigate('CityDetails', { cityDetails: data.results });
  }
  
  function handleAddFollow(){
    if (followedCities.length !== 10){
      navigation.navigate('Cidades');
    } else {
    Alert.alert('Você só pode seguir 10 municípios');
    return;
  }
}

  console.log(followedCities.length)

  if (loading === true) {
    return <Loading />
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={name}
        updatedDate={updatedAt}
      />
      <View style={styles.content}>
        <RectButton style={styles.actualCity} onPress={handleActualCityDetails}>
          <Text style={styles.actualCityText}>Municipio atual - {city}</Text>

          <View style={styles.actualCityContent}>
            <Text style={styles.actualCityContentText}>Total de casos confirmados</Text>
            <Text style={styles.confirmedCasesNumber}>{Intl.NumberFormat().format(confirmedCases)}</Text>
          </View>

          <View style={styles.actualCityContent}>
            <Text style={styles.actualCityContentText}>Total de óbitos</Text>
            <Text style={styles.totalDeathsNumber}>{deaths}</Text>
          </View>

          <View style={styles.actualCityContent}>
            <Text style={styles.actualCityContentText}>Taxa de mortalidade</Text>
            <Text style={styles.mortalityNumber}>{(mortality).toFixed(2)}%</Text>
          </View>

        </RectButton>

        <View style={styles.followedCitiesContainer}>
          <Text style={styles.followedCitiesTitle}>Municípios
            que você segue:</Text>
        </View>

        <View style={styles.followedCitiesList}>
        {followedCities.length !== 0 ? <FlatList
            data={followedCities}
            keyExtractor={(item) => String(item.ibge)}
            
            renderItem={({ item }) => (
              <FollowedCityCard
                city_name={item.name}
                handleRemove={() => handleRemove(item)}
                onPress={() => handleCityDetails(Number(item.ibge))}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          /> : (
            <Text style={styles.emptyFollowListText}>
              Clique no botão abaixo, escolha uma cidade e clique em seguir, 
              as cidades que você segue aparecerão aqui, você pode seguir
              no máximo 10 cidades.
            </Text>
          )}
        </View>

      </View>

      <View style={styles.addCitiesToFollow}>
        <RectButton style={styles.addCitiesToFollowButton} onPress={handleAddFollow}>
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
    padding: '0.9rem',
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
    paddingVertical: '0.4rem',
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
  followedCitiesContainer: {
    marginTop: '-1rem'
  },
  followedCitiesTitle: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: '0.9rem'
  },
  followedCitiesList: {
    flex: 1,
    marginTop: '0.2rem',
    paddingHorizontal: '0.9rem',
    alignItems: 'center'
  },
  emptyFollowListText: {
    fontFamily: fonts.heading,
    marginTop: '6rem',
    color: colors.heading,
    textAlign: 'center'
  },
  addCitiesToFollow: {
    alignSelf: 'center',
    marginVertical: Platform.OS === 'ios' ? '-1.5rem' : '0.5rem'
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