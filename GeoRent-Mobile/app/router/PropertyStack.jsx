import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PropertiesIndex } from '../views/index';

const Stack = createStackNavigator();

export default function PropertiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PropertiesIndex" options={{ headerShown: false }} component={PropertiesIndex} />
    </Stack.Navigator>
  );
}
