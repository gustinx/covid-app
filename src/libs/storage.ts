import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CityProps {
  name: string;
  ibge: string
}

export interface StorageCityProps {
  [id: string]: {
    data: CityProps
  }
}

export async function followCity(city: CityProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@newssarscovid19:followed');
    const oldCities = data ? (JSON.parse(data) as StorageCityProps): {};

    const newCity = {
      [city.ibge]: {
        data: city
      }
    }

    await AsyncStorage.setItem('@newssarscovid19:followed', 
      JSON.stringify({
        ...newCity,
        ...oldCities
      })
    );
  } catch (error) {
    throw new Error(error)
  }
}

export async function loadFollowedCities(): Promise<CityProps[]> {
  try {
    const data = await AsyncStorage.getItem('@newssarscovid19:followed');
    const cities = data ? (JSON.parse(data) as StorageCityProps): {};

    const citiesSorted = Object.keys(cities).map((city) => {
      return {
        ...cities[city].data
      }

      
    })
    return citiesSorted;

  } catch (error) {
    throw new Error(error)
  }
}

export async function unfollowCity(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@newssarscovid19:followed');
  const cities = data ? (JSON.parse(data) as StorageCityProps) : {};

  delete cities[id];

  await AsyncStorage.setItem('@newssarscovid19:followed', JSON.stringify(cities));
}