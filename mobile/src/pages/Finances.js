import React, { useEffect, useState } from 'react';

import { Image, ImageBackground, View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from '@expo/vector-icons';

import bgImg from '../assets/images/background.png';
import logo from '../assets/images/logo.png';

export default function Finances() {

  const navigation = useNavigation()
  const [transactions, setTransactions] = useState([]);
  const [Incomings, setIncomings] = useState("0,00");
  const [Expenses, setExpenses] = useState("0,00");
  const [Total, setTotal] = useState("0,00");
  const [Load, setLoad] = useState(true);

  async function loadTransactions() {
    try {
      const value = await AsyncStorage.getItem('transactions');
      const valueArray = JSON.parse(value)
      if (value !== null) {
        setTransactions(JSON.parse(value))
      } else {
        await AsyncStorage.setItem('transactions', JSON.stringify([]));
      }


      let incomings = 0;
      let expenses = 0;
      let total = 0;

      valueArray.map(transaction => {
        if(transaction.isExpense){
          expenses = expenses + parseFloat(transaction.amount);
        }else{          
          incomings = incomings + parseFloat(transaction.amount);
        }
      });
      
      total = incomings - expenses;

      let totalFormat = String(total).replace(/\D/g, "");
      totalFormat = totalFormat.replace(/(\d)(\d{2})$/, "$1,$2");
      totalFormat = totalFormat.replace(/(?=(\d{3})+(\D))\B/g, ".");

      let expenseFormat = String(expenses).replace(/\D/g, "");
      expenseFormat = expenseFormat.replace(/(\d)(\d{2})$/, "$1,$2");
      expenseFormat = expenseFormat.replace(/(?=(\d{3})+(\D))\B/g, ".");

      let incomingsFormat = String(incomings).replace(/\D/g, "");
      incomingsFormat = incomingsFormat.replace(/(\d)(\d{2})$/, "$1,$2");
      incomingsFormat = incomingsFormat.replace(/(?=(\d{3})+(\D))\B/g, ".");

      let resultTotal = total >= 0 ? "R$ " + (totalFormat ==="0"? "0,00" : (total < 100 ? "0,"+ totalFormat : totalFormat)) : "-R$ " + (total > -100 ? "0," + totalFormat : totalFormat);
      let resultExpense =  expenses === 0 ? ( expenses > -100 ? "-R$ 0," + expenseFormat : "-R$ " + expenseFormat ) : "-R$ " + expenseFormat;
      let resultIncoming = incomings === 0 ? ( incomings < 100 ? "R$ 0," + incomingsFormat : "R$ " + incomingsFormat ) : "R$ " + incomingsFormat;

      setTotal(resultTotal);
      setExpenses(resultExpense);
      setIncomings(resultIncoming);
    } catch (e) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar dados do armazenamento\n\nErro:\n" + e,
        [
          { text: "OK", onPress: () => { } }
        ],
        { cancelable: false }
      );
    }

    return;
  }

  useFocusEffect(() => {
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
            <Image source={logo} style={styles.imageHeader} />
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
            <Text style={styles.cardValue}>{Incomings}</Text>
          </View>
          <View style={styles.cardWite}>
            <View style={styles.cardTitleOrientation}>
              <Text style={styles.cardText}>Saídas</Text>
              <Feather name="arrow-down-circle" size={48} color="#e83e5a" />
            </View>
            <Text style={styles.cardValue}>{Expenses}</Text>
          </View>
          <View style={styles.cardGreen}>
            <View style={styles.cardTitleOrientation}>
              <Text style={styles.cardTextGreen}>Total</Text>
              <Feather name="dollar-sign" size={48} color="#FFF" />
            </View>
            <Text style={styles.cardValueGreen}>{Total}</Text>
          </View>

          <RectButton onPress={handleNavigateList} style={styles.button}>
            <Text style={styles.buttonText} >Ver Transações</Text>
          </RectButton>
          {/* <RectButton onPress={() => { console.log(transactions) }} style={styles.button}>
            <Text style={styles.buttonText} >Ver Console.log</Text>
          </RectButton>
          <RectButton onPress={async () => {
            await AsyncStorage.setItem('transactions', JSON.stringify([]));
            loadTransactions();
          }} style={styles.button}>
            <Text style={styles.buttonText} >Limpar Transações</Text>
          </RectButton> */}

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
    color: '#f0f2f5',
    marginVertical: 24,
  },
  ScrollViewContainer: {
    width: '100%',
    height: 'auto',
    marginTop: -108,
  },
  header: {
    paddingTop: 12,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 32,
    backgroundColor: '#49AA26',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageHeader: {
    width: 150,
    height: 21,
  },
  headerButtonText: {
    fontSize: 24,
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
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: '#f0f2f5',
    marginBottom: 24,
    marginBottom: 12,
  },
  cardValueGreen: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 28,
    color: '#f0f2f5'
  },
  cardText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    marginBottom: 24,
    marginBottom: 12,
  },
  cardValue: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 28,
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
    marginVertical: 6,
    backgroundColor: '#49AA26',
    paddingHorizontal: 48,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: '#f0f2f5',
    textAlign: 'center',
  },
})