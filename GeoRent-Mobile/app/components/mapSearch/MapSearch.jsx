/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useState } from 'react';
import { Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles } from './MapSearch.styles';

const GOOGLE_API_KEY = 'AIzaSyB8ZY1bvvsQpYvq9JFLcBUEY3QoyEwJchg';

const MapSearch = forwardRef(({
  goToSearchedLocation, focus, onFocus, onBlur,
}, ref) => {
  const [animationValue] = useState(new Animated.Value(0));

  const containerWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['85%', '100%'],
  });

  Animated.timing(animationValue, {
    toValue: focus ? 1 : 0,
    duration: 300,
    useNativeDriver: false,
  }).start();

  return (
    <Animated.View style={[styles.container, { width: containerWidth }]}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={25} color="#2573DA" style={styles.iconLeft} />
        <GooglePlacesAutocomplete
          ref={ref}
          enablePoweredByContainer={false}
          minLength={2}
          placeholder="Busca aquí tu destino"
          fetchDetails
          query={{
            key: GOOGLE_API_KEY,
            language: 'es',
            components: 'country:cl',
          }}
          onPress={(data, details) => {
            goToSearchedLocation(details.geometry.location);
          }}
          numberOfLines={1}
          returnKeyType="Buscar"
          textInputProps={{
            cursorColor: '#858585',
            blurOnSubmit: true,
            onFocus: () => onFocus(),
            onBlur: () => onBlur(),
          }}
          onFail={(error) => console.error(error)}
          styles={{
            container: {
              flexGrow: 1,
            },
            textInput: {
              marginTop: 5,
            },
          }}
        />
        { ref && ref.current?.getAddressText().length > 0 && (
          <Ionicons
            name="close-outline"
            size={21}
            color="#858585"
            style={styles.iconRight}
            onPress={
            () => {
              ref.current?.setAddressText('');
            }
          }
          />
        )}
      </View>
    </Animated.View>
  );
});

export default forwardRef((props, ref) => (
  <MapSearch {...props} ref={ref} />
));

MapSearch.propTypes = {
  goToSearchedLocation: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
