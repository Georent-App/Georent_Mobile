/* eslint-disable react/prop-types */
import React from 'react';
import { Image, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import iconImage from '../../../assets/Location-pin-100px.png';
import campingPin from '../../../assets/Camping-pin-100px.png';
import foodPin from '../../../assets/Food-pin-100px.png';
import tradesAndServicesPin from '../../../assets/TradesAndServices-pin-100px.png';
import businessPin from '../../../assets/Business-pin-100px.png';
import entertainmentPin from '../../../assets/Entertainment-pin-100px.png';
import { addPointsToNumber } from '../../helpers/numberFormatter';

export default function SameAddressMapMarker({ posts, onSameAddressMarkerPress, showPricesOnMap }) {
  const handlePress = () => {
    onSameAddressMarkerPress(posts);
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  const getMaxPriceFromPosts = () => {
    let maxPrice = 0;
    posts.forEach((post) => {
      if (post.price > maxPrice) {
        maxPrice = post.price;
      }
    });
    return maxPrice;
  };

  const getMinPriceFromPosts = () => {
    let minPrice = posts[0].price;
    posts.forEach((post) => {
      if (post.price < minPrice) {
        minPrice = post.price;
      }
    });
    return minPrice;
  };

  const getPriceRange = () => {
    const maxPrice = getMaxPriceFromPosts();
    const minPrice = getMinPriceFromPosts();
    const maxPriceFormatted = addPointsToNumber(maxPrice);
    const minPriceFormatted = addPointsToNumber(minPrice);
    return `$${minPriceFormatted} - $${maxPriceFormatted}`;
  };

  const representativePost = posts[0];

  return (
    <Marker
      coordinate={{
        latitude: representativePost.latitude,
        longitude: representativePost.longitude,
      }}
      onPress={() => {
        handlePress();
      }}
    >
      <View style={{ alignItems: 'center' }}>
        {representativePost.type === 'PROPERTY' && (
        <View style={{ alignItems: 'center' }}>
          { showPricesOnMap && (
          <Text style={{
            alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: '600',
          }}
          >
            {getPriceRange()}
          </Text>
          )}
          <Image source={iconImage} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </View>
        )}
        {representativePost.type === 'CAMPING' && (
          <Image source={campingPin} style={{ width: 40, height: 40 }} resizeMode="contain" />
        )}
        {representativePost.type === 'SERVICE' && (() => {
          if (representativePost.category === 'FOOD') {
            return <Image source={foodPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
          } if (representativePost.category === 'BUSINESS') {
            return <Image source={businessPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
          } if (representativePost.category === 'ENTERTAINMENT') {
            return <Image source={entertainmentPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
          } if (representativePost.category === 'TRADES_AND_SERVICES') {
            return <Image source={tradesAndServicesPin} style={{ width: 40, height: 40 }} resizeMode="contain" />;
          }
          return null;
        })()}
        <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>
          {posts.length}
        </Text>
      </View>
    </Marker>
  );
}

SameAddressMapMarker.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      category: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSameAddressMarkerPress: PropTypes.func.isRequired,
  showPricesOnMap: PropTypes.bool.isRequired,
};
