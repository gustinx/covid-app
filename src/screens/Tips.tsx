import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { TipsCard } from '../components/TipsCard';

import maskAnimation from '../assets/mask.json';
import washHands from '../assets/washhands.json';
import distance from '../assets/distance.json';
import help from '../assets/help.json';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Tips() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tip, setTip] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem('@newssarscovid19:user');

      setName(String(user))
    }
    getUserName()
  }, [])

  function handleCloseModal() {
    setModalVisible(!modalVisible)
  }


  const Tips = [
    {
      id: 1,
      modalText: <Text key='1' style={styles.modalText}>
        A <Text style={{ fontFamily: fonts.heading }}>covid-19</Text>, doença causada pelo coronavírus SARS-Cov-2, é transmitida
      principalmente por meio do contato com <Text style={{ fontFamily: fonts.heading }}>pequenas gotículas</Text> que contêm o
      vírus e são expelidas por pessoas infectadas. Elas entram em contato com
      as nossas vias aéreas, e novo coronavírus pode começar a se multiplicar no
      nosso corpo. Portanto, o uso de <Text style={{ fontFamily: fonts.heading }}>máscaras</Text> é importante como medida de proteção
      tanto para você mesmo quanto para as pessoas a seu redor.
      {'\n'}
      {'\n'}
      As máscaras funcionam como uma <Text style={{ fontFamily: fonts.heading }}>barreira física</Text> para a liberação dessas gotículas no ar quando
      há tosse, espirros e até mesmo durante conversas. Seu uso é importante principalmente em locais
      em que não é possível manter uma distância mínima de segurança. Apesar de sua eficácia, seu uso
      deve ser acompanhado de <Text style={{ fontFamily: fonts.heading }}>outras medidas de proteção</Text> como limpeza frequente das mãos e distanciamento
      físico de 2 metros de outras pessoas.
      {'\n'}
      {'\n'}
      Para <Text style={{ fontFamily: fonts.heading }}>higienizar</Text> sua máscara:
      {'\n'}
      {'\n'}
      A melhor opção é lavá-la com detergente ou sabão e água quente (pelo menos 60ºC) diariamente;
      caso não seja possível, você pode deixá-la de molho em solução com cloro a 0,1%
      (uma colher de sopa a cada litro) por 1 minuto e enxaguá-la ou lavá-la em água em temperatura
      ambiente e, após a lavagem, realizar fervura por 1 minuto.
    </Text>,
      animation: maskAnimation,
      subtitle: `Use a máscara sempre!`,
    },
    {
    id: 2,
    modalText: <Text style={styles.modalText}>
    A <Text style={{ fontFamily: fonts.heading }}>higienização da mãos</Text> é uma medida de prevenção de transmissão de diversas doenças.
    Entre essas doenças, podemos destacar a covid-19. Uma das principais formas de sua transmissão
    ocorre quando há o contato do vírus com olhos, nariz e boca por meio de mãos não lavadas.
    {'\n'}
    {'\n'}
    Dessa forma, manter as mãos limpas evita a infecção e transmissão do novo coronavírus.
    Não deixe de conferir logo abaixo como essa limpeza deve ser feita!
    {'\n'}
    {'\n'}
    Estudos apontam que a educação sobre a lavagem das mãos é capaz de reduzir cerca de <Text style={{ fontFamily: fonts.heading }}>20% 
    das doenças respiratórias</Text> na população em geral. E isso não é diferente com novo o 
    coronavírus: a higienização das mãos é uma das maneiras mais eficazes de se proteger 
    da covid-19. Segue abaixo alguns <Text style={{ fontFamily: fonts.heading }}>momentos</Text> em que essa <Text style={{ fontFamily: fonts.heading }}>higienização</Text> é crucial:
    {'\n'}
    {'\n'}
    1 - Depois que você estiver em um local público e tocado em um item ou superfície 
    que possa ser frequentemente tocada por outras pessoas, como maçanetas, mesas, 
    bombas de gasolina, carrinhos de compras ou caixas registradoras / telas eletrônicas, etc.;
    {'\n'}
    2 - Antes de tocar nos olhos, nariz ou boca;
    {'\n'}
    3 - Antes, durante e depois de preparar a comida;
    {'\n'}
    4 - Antes de comer;
    {'\n'}
    5 - Antes e depois de cuidar de alguém com sintomas respiratórios;
    {'\n'}
    6 - Depois de assoar o nariz, tossir ou espirrar;
    {'\n'}
    7 - Depois de usar o banheiro.
    </Text>,
    animation: washHands,
    subtitle: 'Lave as mãos!',
    },
    {
      id: 3,
      modalText: <Text style={styles.modalText}>
      O termo <Text style={{ fontFamily: fonts.heading }}>distanciamento social</Text> significa manter uma distância segura 
      entre você e outras pessoas que <Text style={{ fontFamily: fonts.heading }}>não</Text> pertencem à sua casa. Uma de suas formas é 
      conhecida como “distanciamento físico” e, hoje, a <Text style={{ fontFamily: fonts.heading }}>recomendação</Text> é manter-se a uma 
      distância de <Text style={{ fontFamily: fonts.heading }}>2 metros</Text> (cerca de 2 braços) de outras pessoas. Essa recomendação deve 
      ser observada tanto em espaços internos, como restaurantes, quanto externos, como parques 
      e praças públicas.
      {'\n'}
      {'\n'}
      O distanciamento físico deve ser praticado em combinação com <Text style={{ fontFamily: fonts.heading }}>outras medidas preventivas</Text> diárias, 
      incluindo o uso de máscaras faciais cobrindo nariz e boca, evitar tocar o rosto com as mãos 
      sujas e lavar as mãos com água e sabão ou álcool em gel de 70% de álcool.  
      {'\n'}
      {'\n'}
      Sabemos que o coronavírus se espalha principalmente entre pessoas que estão em contato próximo. 
      A propagação acontece quando uma pessoa infectada tosse, espirra ou fala e gotículas são 
      lançadas no ar, caindo na boca ou no nariz das pessoas próximas. As gotículas também podem 
      ser inaladas até os pulmões. Ficar distante, portanto, é uma forma de proteção.
      {'\n'}
      {'\n'}
      Estudos recentes indicam que pessoas infectadas, mas que <Text style={{ fontFamily: fonts.heading }}>não apresentam sintomas</Text>,
      provavelmente também desempenham um papel na disseminação da covid-19. 
      Como as pessoas podem espalhar o vírus antes mesmo de saberem que estão doentes, 
      é importante respeitar o distanciamento de 2 metros <Text style={{ fontFamily: fonts.heading }}>independente da presença de sintomas</Text>.
      {'\n'}
      {'\n'}
      Um estudo recente publicado em uma revista de grande impacto,  The Lancet, 
      reuniu resultados de 172 estudos sobre o impacto do distanciamento físico na 
      transmissão do coronavírus realizados em 16 países diferentes.
      {'\n'}
      {'\n'}
      Como conclusão, o estudo demonstra que a transmissão do vírus é <Text style={{ fontFamily: fonts.heading }}>diminuída </Text>
      quando o distanciamento físico é adotado. Além disso, a transmissão é menor 
      quando a distância entre as pessoas é de 1 metro ou mais, quando comparado
      com distanciamento de 1 metro ou menos. Para não facilitar para o vírus, 
      recomendamos uma distância ainda maior de 2 metros!
      </Text>,
      animation: distance,
      subtitle: 'Distânciamento social'
    },{
      id: 4,
      modalText: <Text style={styles.modalText}>
      Para entendermos melhor o que fazer se tivermos sintomas da covid-19, vamos explicar 
      as características das formas leves (<Text style={{ fontFamily: fonts.heading }}>Síndrome Gripal</Text>) e das graves (<Text style={{ fontFamily: fonts.heading }}>Síndrome Respiratória 
      Aguda Grave</Text>). Ficou interessado? Acompanhe!
      {'\n'}
      {'\n'}
      Os <Text style={{ fontFamily: fonts.heading }}>sintomas</Text> da infecção pelo novo coronavírus geralmente são semelhantes a 
      infecções respiratórias comuns, como resfriados, gripes e sinusite. No entanto, 
      podem complicar para um quadro mais grave. Nesse sentido, podemos dividí-los em:
      {'\n'}
      {'\n'}
      <Text style={{ fontFamily: fonts.heading }}>Sintomas leves</Text>
      {'\n'}
      {'\n'}
      A forma leve é conhecida como <Text style={{ fontFamily: fonts.heading }}>Síndrome Gripal</Text>. De acordo com a Secretaria do Estado 
      de Saúde de Minas Gerais, os sintomas leves são:
      {'\n'}
      {'\n'}
      - Febre (temperatura axilar maior que 37,8ºC) ou sensação febril;
      {'\n'}
      - Calafrios;
      {'\n'}
      - Tosse;
      {'\n'}
      - Dor de garganta;
      {'\n'}
      - Dor de cabeça;
      {'\n'}
      - Congestão nasal (coriza);
      {'\n'}
      - Problemas no olfato ou no paladar.
      {'\n'}
      {'\n'}
      <Text style={{ fontFamily: fonts.heading }}>Sintomas graves</Text>
      {'\n'}
      {'\n'}
      A forma grave é conhecida como <Text style={{ fontFamily: fonts.heading }}>Síndrome Respiratória Aguda Grave</Text>, pois a vida 
      do paciente pode ficar em risco em um curto período de tempo. De acordo com a 
      Secretaria do Estado de Saúde de Minas Gerais, os sintomas são de uma pessoa 
      com sintomas leves que também apresente:
      {'\n'}
      {'\n'}
      - Dificuldade intensa para respirar ou desconforto respiratório; 
      {'\n'}
      - Pressão duradoura no peito;
      {'\n'}
      - Saturação de oxigênio no sangue menor que 95 porcento;
      {'\n'}
      - Coloração azulada na região dos lábios ou do rosto (cianose).
      {'\n'}
      {'\n'}
      A maioria dos pacientes apresenta sintomas leves, sem necessidade de internação 
      hospitalar ou avaliação médica presencial. Isso porque ainda não existe um tratamento 
      com eficácia comprovada e os casos leves costumam ser autolimitados — ou seja, evoluem 
      naturalmente para a cura da infecção. Nessas pessoas, o deslocamento ao médico pode 
      apresentar um risco tanto ao paciente quanto às pessoas à sua volta.
      {'\n'}
      {'\n'}
      Diante disso, pessoas com sintomas leves e que não fazem parte de grupo de risco, 
      devem permanecer em <Text style={{ fontFamily: fonts.heading }}>isolamento domiciliar</Text>. Se estiver inseguro telefone para o Posto de saúde
      ou Hospital mais próximo.
      {'\n'}
      {'\n'}
      Pessoas com <Text style={{ fontFamily: fonts.heading }}>sintomas graves</Text> devem sempre procurar atendimento médico. Além disso, 
      algumas pessoas têm maior predisposição para desenvolver formas graves da covid-19, 
      denominadas de <Text style={{ fontFamily: fonts.heading }}>grupo de risco</Text>:
      {'\n'}
      {'\n'}
      - Idosos acima de 60 anos;
      {'\n'}
      - Grávidas ou mulheres que tiveram o parto há menos de 2 semanas;
      {'\n'}
      - Crianças menores de 5 anos;
      {'\n'}
      - Indígenas e/ou população aldeada;
      {'\n'}
      - Portadores de doenças pulmonares e de tuberculose;
      {'\n'}
      - Portadores de doenças metabólicas e cardiovasculares;
      {'\n'}
      - Obesos (IMC acima de 40);
      {'\n'}
      - Imunossuprimidos ou em tratamento oncológico;
      {'\n'}
      - Pacientes com distúrbios do desenvolvimento ou com doenças cromossômicas;
      {'\n'}
      - Portadores de doenças nos rins, no fígado ou do sangue.
      {'\n'}
      {'\n'}
      Essas pessoas devem sempre ser avaliadas por um profissional de saúde, 
      <Text style={{ fontFamily: fonts.heading }}> mesmo apresentando sintomas leves</Text>!
      {'\n'}
      {'\n'}
      Pessoas com sintomas de gravidade devem ser atendidas na emergência, preferencialmente 
      em Unidade de Pronto Atendimento (UPA) ou hospital. Devemos estar sempre atentos ao 
      desenvolvimento desse quadro nas pessoas que começaram com sintomas leves!
      {'\n'}
      {'\n'}
      Esperamos que agora você se sinta mais seguro e saiba o que fazer se tiver sintomas 
      da covid-19! A informação é sempre importante para tomar a decisão mais correta.
      </Text>,
      animation: help,
      subtitle: 'Sentindo algum sintoma?'
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header
        actualScreenName='Dicas de prevenção contra o Covid'
      />
      <View style={styles.content}>
        <Text style={styles.tipsText}>
          Hey {name}, aqui você encontrará algumas dicas
          de como se prevenir contra a Covid!
        </Text>
      </View>

      <FlatList
        data={Tips}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tipList}
        numColumns={2}
        renderItem={({ item }) => (
          <TipsCard
            onPress={() => {
              setModalVisible(!modalVisible)
              setTip(item.modalText)
            }}
            modalText={tip}
            visible={modalVisible}
            onRequestClose={() => handleCloseModal()}
            animation={item.animation}
            subtitle={item.subtitle}
          />
        )}
      />
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
  tipsText: {
    textAlign: 'center',
    fontSize: '1rem',
    fontFamily: fonts.text,
    color: colors.heading
  },
  tipList: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    alignItems: 'center'
  },
  modalText: {
    paddingBottom: '2rem',
    textAlign: "justify",
    fontFamily: fonts.text,
    fontSize: '1rem'
  }
})

