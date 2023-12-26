import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, PropertyDetail } from '../views/index';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Stack.Screen name="PropertyDetail" options={{ headerShown: false }} component={PropertyDetail} />
    </Stack.Navigator>
  );
}
