import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { styles } from './ClusterMarker.styles';

export default function ClusterMarker({ coordinate, count, onMarkerPress }) {
  return (
    <Marker coordinate={coordinate} onPress={onMarkerPress}>
      <View style={styles.clusterContainer}>
        <Text style={styles.clusterText}>
          {count}
        </Text>
      </View>
    </Marker>
  );
}

ClusterMarker.propTypes = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  onMarkerPress: PropTypes.func.isRequired,
};
