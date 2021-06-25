import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Feather } from '@expo/vector-icons';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

interface HeaderProps {
  userName?: string;
  actualScreenName?: string;
  updatedDate?: string;
}


export function Header({ userName, actualScreenName, updatedDate}: HeaderProps) {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {userName && <Text style={styles.text}>Olá, {userName}</Text>}
        {actualScreenName && 
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name='chevron-left' style={styles.backButtonIcon} />
            <Text style={styles.backButtonText}>
              {actualScreenName}
            </Text>
          </TouchableOpacity>
        }

        {updatedDate && <Text style={styles.updatedAt}>*Dados atualizados em {updatedDate}</Text>}
      </View>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    height: '5rem',
    backgroundColor: colors.green,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    paddingHorizontal: '1rem',
    alignItems: 'center'
  },
  text: {
    fontSize: '1.25rem',
    fontFamily: fonts.heading,
    color: colors.white,
  },
  updatedAt: {
    color: colors.heading,
    fontSize: '0.7rem',
    fontFamily: fonts.text,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcon: {
    color: colors.white,
    fontSize: '1.25rem',
  },
  backButtonText: {
    color: colors.white,
    fontSize: '1.25rem',
    fontFamily: fonts.heading,
    marginLeft: '0.5rem'
  }
})