import React from 'react';

import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function ShoppingList() {
    return (
        <View style={styles.container}>
          <View style={styles.statusBar} />
          <Text>Lista de compras</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      statusBar: {
        marginTop: 24,
        backgroundColor: 'red'
      },
    })