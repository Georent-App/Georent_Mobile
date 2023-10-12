import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import iconImage from '../../../assets/Location-pin-100px.png';
import campingPin from '../../../assets/Camping-pin-100px.png';
import foodPin from '../../../assets/Food-pin-100px.png';
import tradesAndServicesPin from '../../../assets/TradesAndServices-pin-100px.png';
import businessPin from '../../../assets/Business-pin-100px.png';
import entertainmentPin from '../../../assets/Entertainment-pin-100px.png';

export function MapMarker({ post, onMarkerPress }) {
  const handlePress = () => {
    onMarkerPress(post);
  };

  return (
    <Marker
      coordinate={{
        latitude: post.latitude,
        longitude: post.longitude,
      }}
      onPress={() => {
        handlePress();
      }}
    >
      {post.type === 'PROPERTY' && (
        <Image source={iconImage} style={{ width: 40, height: 40 }} resizeMode="contain" />
      )}
      {post.type === 'CAMPING' && (
        <Image source={campingPin} style={{ width: 40, height: 40 }} resizeMode="contain" />
      )}
      {post.type === 'SERVICE' && (() => {
        if (post.category === 'FOOD') {
          return <Image source={foodPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
        } if (post.category === 'BUSINESS') {
          return <Image source={businessPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
        } if (post.category === 'ENTERTAINMENT') {
          return <Image source={entertainmentPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
        } if (post.category === 'TRADES_AND_SERVICES') {
          return <Image source={tradesAndServicesPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
        }
        return null;
      })()}
    </Marker>
  );
}

MapMarker.propTypes = {
  post: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    category: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onMarkerPress: PropTypes.func.isRequired,
};
