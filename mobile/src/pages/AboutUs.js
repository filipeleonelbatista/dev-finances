import React from 'react';
import { ImageBackground, Image, View, Text, StyleSheet, Dimensions, Linking, Clipboard, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import userImg from '../assets/images/20867392.png'
import bgImg from '../assets/images/background.png'
import jsImg from '../assets/images/js.png'
import reactImg from '../assets/images/react.png'
import nodeImg from '../assets/images/nodejs.png'

export default function AboutUs() {
    const navigation = useNavigation()

    function handleCopyToClipboardPixKey() {
        Clipboard.setString("f1bfe5be-67eb-42ad-8928-f71e02e1c99b");
        Alert.alert(
            "Chave pix copiada",
            "Agora só fazer um pix de qualquer valor usando a chave copiada neste botão", !
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
            { cancelable: false }
        );
    }

    return (
        <>
            <View style={styles.statusBar} />
            <View style={styles.container}>
                <ImageBackground source={bgImg} style={styles.header}>
                    <View style={styles.headerItens}>
                        <Text style={styles.title}>Sobre mim</Text>
                    </View>
                </ImageBackground>

                <ScrollView
                    style={styles.ScrollViewContainer}
                >
                    <View style={styles.imageContainer}>
                        <View style={styles.imageBorder} >
                            <View style={styles.imageBackgroundWhite}>
                                <Image source={userImg} style={styles.image} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.dev}>Filipe de Leonel Batista</Text>
                        <Text style={styles.subtitle}>Desenvolvedor</Text>
                        <View style={styles.contentImg}>
                            <Image source={jsImg} style={styles.techs} />
                            <Image source={reactImg} style={styles.techs} />
                            <Image source={nodeImg} style={styles.techs} />
                        </View>
                        <RectButton onPress={handleCopyToClipboardPixKey} style={styles.button}>
                            <Text style={styles.buttonText} >
                                Me pague uma pizza 😉
                        </Text>
                        </RectButton>
                        <Text style={styles.subtitle}>Via PIX</Text>
                    </View>
                    <RectButton onPress={() => { Linking.openURL("https://www.instagram.com/filipeleonelbatista/") }} style={styles.button}>
                        <Feather name="instagram" size={24} style={{ marginRight: 6 }} color="#FFF" />
                        <Text style={styles.buttonText} >
                            Instagram
                        </Text>
                    </RectButton>
                    <RectButton onPress={() => { Linking.openURL("https://github.com/filipeleonelbatista/") }} style={styles.button}>
                        <Feather name="github" size={24} style={{ marginRight: 6 }} color="#FFF" />
                        <Text style={styles.buttonText} >
                            Github
                        </Text>
                    </RectButton>
                    <RectButton onPress={() => { Linking.openURL("https://www.linkedin.com/in/filipeleonelbatista/") }} style={styles.button}>
                        <Feather name="linkedin" size={24} style={{ marginRight: 6 }} color="#FFF" />
                        <Text style={styles.buttonText} >
                            Linkedin
                        </Text>
                    </RectButton>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dev: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#363f5f'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#363f5f'
    },
    contentImg: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    content: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24
    },
    imageBorder: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: '#12a454',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackgroundWhite: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    techs: {
        width: 32,
        height: 32,
        borderRadius: 8,
        marginHorizontal: 4,
    },
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
        marginTop: -120,
    },
    header: {
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
        marginVertical: 6,
        backgroundColor: '#49AA26',
        paddingHorizontal: 48,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#f0f2f5',
        textAlign: 'center',
    },
})