/* eslint-disable consistent-return */
import React, {
  createContext, useState, useEffect, useContext, useMemo,
} from 'react';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  const getInitLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLocationPermissionGranted(false);
        setLocationLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLocationPermissionGranted(true);
      setLocationLoading(false);
    } catch (error) {
      setErrorMsg(error.message);
      setLocationLoading(false);
    }
  };

  async function updateLocation() {
    if (!locationPermissionGranted) {
      await getInitLocation();
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
