import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Finances from './pages/Finances';
import AddFinancesItem from './pages/AddFinancesItem';
import FinancesList from './pages/FinancesList';

const Stack = createStackNavigator();

export default function RoutesFinancesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#F2F3F5' } }}>
        <Stack.Screen name="Finances" component={Finances} />
        <Stack.Screen name="AddFinancesItem" component={AddFinancesItem} />
        <Stack.Screen name="FinancesList" component={FinancesList} />
      </Stack.Navigator>
  );
}