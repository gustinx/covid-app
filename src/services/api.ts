import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.brasil.io/v1/dataset/covid19/caso_full/data/'
});

  api.defaults.headers.common['Authorization'] = 'Token 574a31d6baf1301864e724568ad1ebb2f04b12fa'



export async function getCovidData(cep: string) {
  const { ibge }  = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(response => response.json());

  const { data } = await api.get(`?city_ibge_code=${ibge}&is_repeated=False&page_size=5&format=json`);

  return data;

}

