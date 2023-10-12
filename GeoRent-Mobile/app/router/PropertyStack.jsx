import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PropertyDetail, PropertiesIndex } from '../views/index';

const Stack = createStackNavigator();

export default function PropertiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PropertiesIndex" options={{ headerShown: false }} component={PropertiesIndex} />
      <Stack.Screen name="PropertyDetail" options={{ headerShown: false }} component={PropertyDetail} />
    </Stack.Navigator>
  );
}
