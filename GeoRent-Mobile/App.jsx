import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Auth0Provider } from 'react-native-auth0';
import { NavBar } from './app/components/navbar/Navbar';
import { LocationProvider } from './app/context/LocationContext';

export default function App() {
  return (
    <Auth0Provider domain="georent-mobile.us.auth0.com" clientId="aLxD3IrbENsJsly0SnRAciWBKRmgYxpV">
      <LocationProvider>
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </LocationProvider>
    </Auth0Provider>
  );
}
