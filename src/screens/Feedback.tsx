import React, { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { firebase } from '../services/firebase';

export function Feedback() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem('@newssarscovid19:user');

      setName(String(user))
    }
    getUserName()
  }, [])

  const entityRef = firebase.firestore().collection('feedbacks')

  const sendFeedback = () => {
    setLoading(true)
    if (text && text.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        feedback: text,
        createdAt: timestamp,
      };

      entityRef
        .add(data)
        .then(doc => {
          setText('')
          setLoading(false);
          Keyboard.dismiss()
        })
        .catch((error) => {
          setLoading(false);
          alert(error)
        });
    }
  }

  const onSubmit = () => {
    Keyboard.dismiss();
  }
  return (
    <SafeAreaView style={styles.container}>
        <Header
          actualScreenName='Feedback'
        />

        <View style={styles.content}>
          <Text style={styles.feedbackText}>
            Olá, {name}! Que tal nos dar uma opinião sobre o
            que você esta achando do aplicativo?
            A sua opinião é muito importante para nós!
          </Text>
        </View>

        <View style={styles.feedBackInputContainer}>
          <TextInput
            style={styles.feedbackInput}
            placeholder='Digite aqui alguma sugestão ou reclamação
            sobre nosso aplicativo…'
            placeholderTextColor={colors.gray}
            multiline={true}
            maxLength={700}
            textAlign='left'
            autoCompleteType='off'
            scrollEnabled={false}
            onChangeText={(text) => setText(text)}
            value={text}
            keyboardType='default'
            onSubmitEditing={onSubmit}
            enablesReturnKeyAutomatically
          />
        </View>

        <View style={styles.sendButton}>
          <Button
            title='Enviar'
            onPress={sendFeedback}
            disabled={!text}
            loading={loading}
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
    backgroundColor: colors.white,
    width: '93%',
    padding: '0.9rem',
    borderRadius: '0.5rem',
    top: '-1.5rem',
    marginHorizontal: '0.9rem',
    alignItems: 'center',
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: '1rem',
    fontFamily: fonts.text,
    color: colors.heading
  },
  feedBackInputContainer: {
    height: '20rem',
    backgroundColor: colors.white,
    borderRadius: '0.5rem',
    alignItems: 'center',
    marginHorizontal: '0.9rem',
    
  },
  feedbackInput: {
    fontFamily: fonts.text,
    color: colors.heading,
    width: '93%',
    top: '1.5rem',
  },
  sendButton: {
    width: '50%',
    height: '1rem',
    alignSelf: 'center',
    justifyContent: 'center',
    top: '3rem'
  }
})