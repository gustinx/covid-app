import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Welcome() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@newssarscovid19:user');
      
      if (user) {
        navigation.navigate('Dashboard')
      }
    }

    loadStorageUserName()
  }, [])

  console.log(name)

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setName(value);
    setIsFilled(!!value);
  }

  async function handleSubmit() {
    if (!name) 
      return Alert.alert('Por favor, digite seu primeiro nome');

    try {
      await AsyncStorage.setItem('@newssarscovid19:user', name);
      navigation.navigate('Confirmation', {
        title: `Prontinho ${name}!`,
        subtitle: 'Vamos agora começar',
        buttonTitle: 'Começar',
        nextScreen: 'Dashboard'
      });
    } catch {
      Alert.alert('Não foi possivel salvar o seu nome')
    }
    
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>
                <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && {borderColor: colors.green}
                ]}
                placeholder='Digite seu primeiro nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                autoCorrect={false}
                />

                <View style={styles.footer}>
                  <Button
                    title='Confirmar'
                    onPress={handleSubmit}
                    disabled={!name}
                  />
                </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '4rem',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: '1rem',
    marginTop: '3rem',
    padding: '0.6rem',
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    marginTop: '2rem',
    paddingHorizontal: '1.5rem'
  } 
})
