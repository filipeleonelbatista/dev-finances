import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Routes />
    </>
  );
}
