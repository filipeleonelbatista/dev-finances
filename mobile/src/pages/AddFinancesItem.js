
import React, { useEffect, useState } from 'react';

import { Button, ImageBackground, View, Switch, Text, StyleSheet, Dimensions, TextInput, Alert, ToastAndroid } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import bgImg from '../assets/images/background.png';

import 'react-native-get-random-values';
import { v4 } from 'uuid';

export default function AddFinancesItem() {

    function moeda(e) {
        let value = e;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{2})$/, "$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setAmount(value);
    }
    function maskDate(e) {
        let value = e;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3");
        setData(value);
    }

    const navigation = useNavigation();

    const [transactions, setTransactions] = useState([]);

    async function loadTransactions() {
        try {
            const value = await AsyncStorage.getItem('transactions');

            if (value !== null) {
                setTransactions(JSON.parse(value));
            }
        } catch (e) {
            Alert.alert(
                "Erro",
                "Não foi possível carregar dados do armazenamento\n\nErro:\n" + e,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }
    useEffect(() => {
        loadTransactions();
    }, []);




    const [Description, setDescription] = useState("");
    const [Amount, setAmount] = useState("");
    const [data, setData] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setData(`${currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()}/${(currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)}/${currentDate.getFullYear()}`);
    };

    function handleNavigate() {
        navigation.navigate('Finances');
    }

    async function handleSaveTransaction() {
        if ((Description.trim() === "") ||
            (Amount.trim() === "") ||
            (data.trim() === "")) {
            Alert.alert(
                "Faltou algo",
                "Por favor, preencha todos os campos",
                [
                    { text: "OK", onPress: () => { } }
                ],
                { cancelable: false }
            );
            return;
        }
        const valueAmount = Math.round(parseFloat(Amount.replace(".", "").replace(",", ".")) * 100);
        let trx = transactions;

        trx.push({
            id: v4(),
            description: Description,
            amount: valueAmount,
            date: data,
            isExpense: isEnabled
        })

        setTransactions(trx);
        await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
        ToastAndroid.show('Item adicionado a lista', ToastAndroid.SHORT);

        navigation.navigate('Finances');
    }
    return (
        <>
            <View style={styles.statusBar} />
            <View style={styles.container}>
                <ImageBackground source={bgImg} style={styles.header}>
                    <View style={styles.headerItens}>
                        <Text style={styles.title}>Nova transação</Text>
                    </View>
                </ImageBackground>
                <View style={styles.cardWite}>
                    <View>
                        <Text style={styles.label}>Descrição</Text>
                        <TextInput style={styles.input}
                            placeholder="Descrição"
                            onChangeText={(text) => { setDescription(text) }}
                            value={Description}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Valor</Text>
                        <TextInput style={styles.input}
                            keyboardType="decimal-pad"
                            placeholder="Valor"
                            onChangeText={(text) => { moeda(text) }}
                            value={Amount}
                        />
                        {/* <Text style={styles.subtitle}>
                            Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais
                        </Text> */}
                    </View>
                    <View>
                        <Text style={styles.label}>Data</Text>
                        <View style={styles.inputGroup}>
                            <TextInput
                                placeholder="dd/mm/aaaa"
                                keyboardType="decimal-pad"
                                maxLength={10}
                                value={data}
                                style={styles.inputInputGroup}
                                onChangeText={(text) => { maskDate(text) }} />
                            <TouchableOpacity onPress={() => { setShow(true) }} style={styles.buttonInputGroup}>
                                <Feather name="calendar" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#767577" }}
                            thumbColor={isEnabled ? "#04D361" : "#3e3e3e"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={styles.labelSwitch}>Despesa</Text>
                    </View>
                    <TouchableOpacity onPress={handleSaveTransaction} style={styles.buttonSave}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNavigate} style={styles.buttonCancel}>
                        <Text style={styles.buttonTextCancel}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
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
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    inputInputGroup: {
        marginTop: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FFF',
        borderColor: "#CCC",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 0,
        width: '81%',
        height: 48,
        borderWidth: 1
    },
    buttonInputGroup: {
        marginTop: 6,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderColor: "#CCC",
        borderWidth: 1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 8,
    },
    buttonCancel: {
        borderRadius: 4,
        marginVertical: 6,
        backgroundColor: '#FFF',
        borderColor: "#F00",
        borderWidth: 1,
        paddingHorizontal: 48,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSave: {
        borderRadius: 4,
        marginVertical: 6,
        backgroundColor: '#49AA26',
        paddingHorizontal: 48,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        fontWeight: '600',
        color: '#363f5f'
    },
    label: {
        marginTop: 18,
        fontSize: 18,
        color: '#363f5f',
        fontFamily: 'Poppins_400Regular',
    },
    labelSwitch: {
        fontSize: 18,
        color: '#363f5f',
        fontFamily: 'Poppins_400Regular',
    },
    input: {
        marginTop: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FFF',
        borderColor: "#CCC",
        borderRadius: 4,
        width: '100%',
        height: 48,
        borderWidth: 1
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
        paddingTop: 12,
        height: 192,
        width: '100%',
        backgroundColor: '#2D4A22',
    },
    headerItens: {
        marginHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
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
        marginTop: -100,
        borderRadius: 4,
        marginHorizontal: 24,
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
    cardText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#363f5f',
        marginBottom: 24,
    },
    cardValue: {
        fontSize: 32,
        fontWeight: '600',
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
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        color: '#f0f2f5',
        textAlign: 'center',
    },
    buttonTextCancel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        color: '#F00',
        textAlign: 'center',
    },
})