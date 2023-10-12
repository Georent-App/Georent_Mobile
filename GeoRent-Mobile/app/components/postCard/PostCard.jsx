import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { styles } from './PostCard.styles';
import { addPointsToNumber } from '../../helpers/numberFormatter';
import { API_URL } from '../../constants';
import PlaceholderImg from '../../../assets/placeholder-image.png';
import CampingIcon from '../../../assets/Camping-icon.png';
import foodIcon from '../../../assets/Food-icon.png';
import businessIcon from '../../../assets/Business-icon.png';
import entertainmentIcon from '../../../assets/Entertainment-icon.png';
import tradesAndServicesIcon from '../../../assets/TradesAndServices-icon.png';

export function PostCard({ post }) {
  const navigation = useNavigation();

  const handleTouch = () => {
    navigation.navigate('PropertyDetail', { post });
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.shadow}
        onTouchEnd={handleTouch}
      >
        {post.type === 'CAMPING' && (
          <Image
            source={CampingIcon}
            style={styles.typeIcon}
          />
        )}
        {post.type === 'SERVICE' && (() => {
          if (post.category === 'FOOD') {
            return <Image source={foodIcon} style={styles.typeIcon} />;
          } if (post.category === 'BUSINESS') {
            return <Image source={businessIcon} style={styles.typeIcon} />;
          } if (post.category === 'ENTERTAINMENT') {
            return <Image source={entertainmentIcon} style={styles.typeIcon} />;
          } if (post.category === 'TRADES_AND_SERVICES') {
            return <Image source={tradesAndServicesIcon} style={styles.typeIcon} />;
          }
          return null;
        })()}
        {post.images[0] ? (
          <Image
            source={{ uri: `${API_URL}${post.images[0].url}` }}
            style={styles.image}
          />
        ) : (
          <Image
            source={PlaceholderImg}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.description}>
        <View style={styles.data}>
          <Text style={styles.city}>
            {post.name}
          </Text>
          <Text style={styles.distance}>
            {`A ${post.distance.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} km de distancia`}
          </Text>
          {post.type === 'PROPERTY' || post.type === 'CAMPING' ? (
            <Text style={styles.price}>
              {addPointsToNumber(post.price)}
              {' '}
              CLP
              <Text style={styles.span}>
                {' '}
                / Noche
              </Text>
            </Text>
          ) : null}
        </View>
        <View style={styles.rating}>
          <Ionicons
            name="star"
            size={14}
            color="black"
          />
          <Text style={styles.ratingText}>
            {
              post.rating_average ? (
                post.rating_average.toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
              ) : (
                'N/A'
              )
            }
          </Text>
        </View>
      </View>
    </View>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    rating_average: PropTypes.number,
  }).isRequired,
};
