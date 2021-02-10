
import React from 'react';

import { ImageBackground, View, Text, StyleSheet, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import bgImg from '../assets/images/background.png'

export default function FinancesList() {

    const navigation = useNavigation();

    function handleNavigate() {
        navigation.navigate('Finances');
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
                        <Text style={styles.title}>Listas</Text>
                        <View style={styles.headerEmpty}></View>
                    </View>
                </ImageBackground>
                <View style={styles.cardWite}>
                    <Text style={styles.cardText}>Entradas</Text>
                    <Text style={styles.cardValue}>R$ 5.000,00</Text>
                </View>
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
        fontSize: 18,
        fontWeight: '600',
        color: '#f0f2f5',
        textAlign: 'center',
    },
})