/* eslint-disable consistent-return */
import React, {
  createContext, useState, useEffect, useContext, useMemo,
} from 'react';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  const defaultLocation = {
    latitude: -33.4489, // Coordenadas de Santiago, Chile
    longitude: -70.6693,
  };

  async function getCurrentLocation() {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setIsCurrentLocation(true);
    } catch (error) {
      setErrorMsg(`Background location update failed: ${error.message}`);
    }
  }

  const getInitLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLocationPermissionGranted(false);
        setLocationLoading(false);
        return;
      }

      try {
        const lastKnownLocation = await Location.getLastKnownPositionAsync();
        if (lastKnownLocation) {
          setLocation(lastKnownLocation.coords);
        } else {
          setLocation(defaultLocation);
        }
        setIsCurrentLocation(false);
      } catch (error) {
        setLocation(defaultLocation);
        setIsCurrentLocation(false);
      }

      setLocationPermissionGranted(true);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLocationLoading(false);
    }
  };

  async function updateLocation() {
    if (!locationPermissionGranted) {
      await getCurrentLocation();
      return;
    }
    try {
      setLocationLoading(true);
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLocationLoading(false);
      return currentLocation.coords;
    } catch (error) {
      setErrorMsg(error.message);
      setLocationLoading(false);
    }
  }

  useEffect(() => {
    if (!isCurrentLocation && locationPermissionGranted) {
      // Intenta actualizar la ubicación en segundo plano
      getCurrentLocation();
    }
  }, [isCurrentLocation, locationPermissionGranted]);

  useEffect(() => {
    if (!locationPermissionGranted) {
      getInitLocation();
      return;
    }
    updateLocation();
  }, [locationPermissionGranted]);

  const value = useMemo(() => ({
    location,
    errorMsg,
    locationPermissionGranted,
    locationLoading,
    updateLocation,
  }), [location, errorMsg, locationPermissionGranted, locationLoading]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
