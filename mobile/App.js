import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text} from 'react-native';
import Routes from './src/routes';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Routes />
    </>
  );

}
