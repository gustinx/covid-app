import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation, useRoute } from '@react-navigation/native'

import { Button } from '../components/Button';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  nextScreen: string;
}

export function Confirmation() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    nextScreen
  } = route.params as Params;

  function handleNextScreen() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          { title }
        </Text>

        <Text style={styles.subtitle}>
          { subtitle }
        </Text>

        <View style={styles.footer}>
          <Button 
            title={buttonTitle}
            onPress={handleNextScreen}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '2.5rem'
  },
  title: {
    fontSize: '1.5rem',
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: '2rem',
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: '1rem',
    paddingVertical: '0.6rem',
    color: colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: '2rem',
    marginTop: '1.5rem'
  }
})