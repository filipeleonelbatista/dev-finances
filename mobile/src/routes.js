import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AboutUs from './pages/AboutUs';
import RoutesFinancesStack from './routesFinancesStack';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Finances') {
                            iconName = 'dollar-sign';
                        } else if (route.name === 'AboutUs') {
                            iconName = 'user';
                        }

                        // You can return any component that you like here!
                        return <Feather name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#12a454',
                    inactiveTintColor: '#2D4A22',
                }}
            >
                <Tab.Screen name="Finances" component={RoutesFinancesStack} />
                <Tab.Screen name="AboutUs" component={AboutUs} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
