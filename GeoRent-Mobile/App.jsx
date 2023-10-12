import React from 'react';
import { Amplify } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { NavBar } from './app/components/navbar/Navbar';
import { AuthProvider } from './app/context/AuthContext';
import { LocationProvider } from './app/context/LocationContext';
import config from './aws-exports';

Amplify.configure(config);
export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </LocationProvider>
    </AuthProvider>
  );
}
