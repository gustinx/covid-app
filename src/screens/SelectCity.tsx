import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { matchSorter } from 'match-sorter';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { SearchBar } from '../components/SearchBar';
import { SelectCityCard } from '../components/SelectCityCard';
import { api } from '../services/api';
import colors from '../styles/colors';

export function SelectCity() {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetch('https://api.npoint.io/5c030b659e630d129a5f')
    .then((response) => response.json())
    .then((responseJson) => {
      setFilteredDataSource(responseJson);
      setMasterDataSource(responseJson);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleCityDetails = async (ibge: number) => {
    const { data } = await api.get(`?city_ibge_code=${ibge}&is_repeated=False&page_size=5&format=json`);
    setSearch('')
    navigation.navigate('CityDetails', { cityDetails: data.results });
  }


  const searchFilterFunction = (text) => {
    if (text) {
      // const newData = masterDataSource.filter(function (item) {
      //   const itemData = item.nome
      //     ? item.nome.toUpperCase()
      //     : ''.toUpperCase();
      //   const textData = text.toUpperCase();
      //   return itemData.indexOf(textData) > -1;
      // });
      const newData = matchSorter(masterDataSource, text, {keys: ['nome', 'uf']})
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  
  if (loading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        actualScreenName='Selecione a cidade'
      />
      <SearchBar 
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
      />
      <View style={styles.content}>
        <FlatList 
          data={filteredDataSource}
          keyExtractor={(item) => String(item.codigo_ibge)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cityList}
          alwaysBounceVertical
          renderItem={({ item }) => (
            <SelectCityCard name={item.nome} uf={item.uf} onPress={() => handleCityDetails(item.codigo_ibge)}/>
          )}
        />
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
    width: '93%',
    marginHorizontal: '0.9rem',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  },
  cityList: {
    borderRadius: '0.5rem',
    overflow: 'hidden'
  }
})