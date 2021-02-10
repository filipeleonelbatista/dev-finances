import React, { useEffect, useState } from 'react';

import { ImageBackground, View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from '@expo/vector-icons';

import bgImg from '../assets/images/background.png'

export default function Finances() {

  const navigation = useNavigation()
  const [transactions, setTransactions] = useState({});

  async function loadTransactions() {
    try {
      const value = await AsyncStorage.getItem('transactions')
      if (value !== null) {
        setTransactions(JSON.parse(value))
      }
    } catch (e) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar dados do armazenamento\n\nErro:\n"+e,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
  }
  useEffect(() => {
    loadTransactions();
  });

  function handleNavigate() {
    navigation.navigate('AddFinancesItem');
  }

  function handleNavigateList() {
    navigation.navigate('FinancesList');
  }

  return (
    <>
      <View style={styles.statusBar} />
      <View style={styles.container}>
        <ImageBackground source={bgImg} style={styles.header}>
          <View style={styles.headerItens}>
            <View style={styles.headerEmpty} />
            <Text style={styles.title}>dev.finance$</Text>
            <RectButton onPress={handleNavigate} style={styles.headerButton}>
              <Feather name="plus" size={24} color="#FFF" />
            </RectButton>
          </View>
        </ImageBackground>
        <ScrollView
          style={styles.ScrollViewContainer}
        >
          <View style={styles.cardWite}>
            <View style={styles.cardTitleOrientation}>
              <Text style={styles.cardText}>Entradas</Text>
              <Feather name="arrow-up-circle" size={48} color="#12a454" />
            </View>
            <Text style={styles.cardValue}>R$ 5.000,00</Text>
          </View>
          <View style={styles.cardWite}>
            <View style={styles.cardTitleOrientation}>
              <Text style={styles.cardText}>Saídas</Text>
              <Feather name="arrow-up-circle" size={48} color="#e83e5a" />
            </View>
            <Text style={styles.cardValue}>-R$ 5.000,00</Text>
          </View>
          <View style={styles.cardGreen}>
            <View style={styles.cardTitleOrientation}>
              <Text style={styles.cardTextGreen}>Total</Text>
              <Feather name="dollar-sign" size={48} color="#FFF" />
            </View>
            <Text style={styles.cardValueGreen}>-R$ 5.000,00</Text>
          </View>

          <RectButton onPress={handleNavigateList} style={styles.button}>
            <Text style={styles.buttonText} >Ver Transações</Text>
          </RectButton>

        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f0f2f5',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    color: '#f0f2f5',
    marginVertical: 24,
  },
  ScrollViewContainer: {
    width: '100%',
    height: 'auto',
    marginTop: -108,
  },
  header: {
    height: 192,
    width: '100%',
    backgroundColor: '#2D4A22',
  },
  headerItens: {
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerEmpty: {
    width: 48,
    height: 48,
    borderRadius: 32,
  },
  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 32,
    backgroundColor: '#49AA26',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f0f2f5',
  },
  cardWite: {
    flexDirection: 'column',
    borderRadius: 4,
    marginHorizontal: 24,
    marginVertical: 6,
    backgroundColor: '#FFF',
    paddingHorizontal: 48,
    paddingVertical: 24,
  },
  cardGreen: {
    borderRadius: 4,
    marginHorizontal: 24,
    marginVertical: 6,
    backgroundColor: '#49AA26',
    paddingHorizontal: 48,
    paddingVertical: 24,
  },
  cardTextGreen: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f0f2f5',
    marginBottom: 24,
    marginBottom: 12,
  },
  cardValueGreen: {
    fontSize: 32,
    fontWeight: '600',
    color: '#f0f2f5'
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '600',
    color: '#363f5f'
  },
  cardTitleOrientation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusBar: {
    height: 24,
    width: '100%',
    backgroundColor: '#2D4A22',
  },
  button: {
    borderRadius: 48,
    marginHorizontal: 24,
    marginVertical: 12,
    backgroundColor: '#49AA26',
    paddingHorizontal: 48,
    paddingVertical: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f0f2f5',
    textAlign: 'center',
  },
})