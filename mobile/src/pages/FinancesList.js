
import React, { useEffect, useState } from 'react';

import { ImageBackground, View, Text, ScrollView, StyleSheet, Dimensions, Alert, ToastAndroid } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import bgImg from '../assets/images/background.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FinancesList() {

    const navigation = useNavigation();

    function handleNavigate() {
        navigation.navigate('Finances');
    }

    const [transactions, setTransactions] = useState([]);

    async function loadTransactions() {
        try {
            const value = await AsyncStorage.getItem('transactions');
            if (value !== null) {
                setTransactions(JSON.parse(value));
            } else {
                await AsyncStorage.setItem('transactions', JSON.stringify([]));
                setTransactions([]);
            }

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

    useEffect(() => {
        loadTransactions();
    }, []);

    function moeda(e) {

        let value = String(e);
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{2})$/, "$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

        value = e < 100 ? "0," + (e < 10 ? "0" + value : value) : value;
        return value;
    }

    async function removeCard(id) {
        let updatedTransactions = transactions.filter((transaction) => {
            if (transaction.id !== id) {
                return true
            }
            return false;
        });
        setTransactions(updatedTransactions);
        await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));

        ToastAndroid.show('Item removido da lista', ToastAndroid.SHORT);
    }

    return (
        <>
            <View style={styles.statusBar} />
            <View style={styles.container}>
                <ImageBackground source={bgImg} style={styles.header}>
                    <View style={styles.headerItens}>
                        <RectButton onPress={handleNavigate} style={styles.headerButton}>
                            <Feather name="arrow-left" size={24} color="#FFF" />
                        </RectButton>
                        <Text style={styles.title}>Transações</Text>
                        <View style={styles.headerEmpty}></View>
                    </View>
                </ImageBackground>

                <ScrollView
                    style={styles.ScrollViewContainer}
                >
                    {transactions.map((trx) => {
                        return (
                            <View key={trx.id} style={styles.cardWite}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.cardDescriptionValue}>{trx.description}</Text>
                                        <Text style={styles.cardDescription}>{trx.date}</Text>
                                        <Text style={styles.cardValue}>{trx.isExpense && "-"}R$ {moeda(trx.amount)}</Text>
                                    </View>
                                    <View>
                                        <RectButton onPress={() => removeCard(trx.id)} style={styles.headerButtonCard}>
                                            <Feather name="minus-circle" size={24} color="#F00" />
                                        </RectButton>
                                    </View>
                                </View>

                            </View>
                        );
                    })}
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
    ScrollViewContainer: {
        width: '100%',
        height: 'auto',
        marginTop: -108,
    },
    title: {
        fontFamily: 'Poppins_400Regular',
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
    headerButtonCard: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerButtonText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#f0f2f5',
    },
    cardWite: {
        borderRadius: 4,
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
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
    },
    cardValueGreen: {
        fontSize: 32,
        fontWeight: '600',
        color: '#f0f2f5'
    },
    cardDescription: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        color: '#363f5f',
        marginBottom: 12,
    },
    cardDescriptionValue: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 24,
        color: '#363f5f',
    },
    cardText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        color: '#363f5f',
        marginBottom: 24,
    },
    cardValue: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 32,
        color: '#363f5f'
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