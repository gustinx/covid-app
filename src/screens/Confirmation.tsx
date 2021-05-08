import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
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
    padding: 30
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})