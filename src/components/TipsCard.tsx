import React, { ReactComponentElement, useEffect, useState } from 'react';
import { Modal, ModalProps, Pressable, ScrollView, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'
import LottieView from 'lottie-react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';

import fonts from '../styles/fonts';

interface TipsCardsProps extends ModalProps {
  modalText: JSX.Element;
  onPress: RectButtonProps;
  animation: string;
  subtitle: string;
}

export function TipsCard({modalText, animation, subtitle, ...rest}: TipsCardsProps) {
  const [text, setText] = useState();

  useEffect(() => {
    setText(modalText)
  }, [modalText])

  console.log(text)

  return (
    <View style={styles.container}>
    <RectButton  style={styles.content}{...rest}
     >

      <LottieView
        source={animation}
        autoPlay
        loop
        style={styles.animation}
      />

      <Modal
        {...rest}
        
      >
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView} showsVerticalScrollIndicator={false}>
          <Text>{text}</Text>

          
          <Pressable
              style={[styles.button, styles.buttonClose]}
              {...rest}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
            </ScrollView>
        </View>
      </Modal>
    </RectButton>
    <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    marginHorizontal: '0.9rem',
    marginBottom: '0.7rem'
  },
  content: {
    flex: 1,
    width: '9rem',
    maxHeight: '9rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: '0.5rem',
    
  },
  animation: {
    width: '9rem',
    height: '9rem'
  },
  subtitle: {
    fontSize: '1rem',
    paddingTop: '0.3rem',
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    maxWidth: '9rem'
  },
  centeredView: {
    flex: 1,
    height: '7rem',
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: "center",
  },
  modalView: {
    margin: '2.5rem',
    backgroundColor: "white",
    borderRadius: 8,
    padding: '2rem',
  },
  button: {
    borderRadius: 8,
    padding: '0.7rem',
    marginBottom: '3.5rem'
  },
  buttonClose: {
    marginTop: '1rem',
    backgroundColor: colors.green,
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: 'center'
  },
  modalText: {
    marginBottom: '1rem',
    textAlign: "justify",
    fontFamily: fonts.text,
  }
})