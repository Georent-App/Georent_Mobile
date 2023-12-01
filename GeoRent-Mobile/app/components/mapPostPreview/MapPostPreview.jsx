/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View, Text, Image, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addPointsToNumber } from '../../helpers/numberFormatter';
import { styles } from './MapPostPreview.styles';
import { API_URL } from '../../constants';
import PlaceholderImg from '../../../assets/placeholder-image.png';

const slideInLeft = {
  from: {
    translateX: -500,
  },
  to: {
    translateX: 0,
  },
};

const slideOutLeft = {
  from: {
    translateX: 0,
  },
  to: {
    translateX: -500,
  },
};

const MapPostPreview = forwardRef(({ post, isOpen, setIsOpen }, ref) => {
  const navigation = useNavigation();
  let postPreviewRef;

  const handleClose = () => {
    postPreviewRef.animate(slideOutLeft, 300).then(() => setIsOpen(false));
  };

  useImperativeHandle(ref, () => ({
    handleClose,
  }));

  const onPress = () => {
    navigation.navigate('Inicio', { screen: 'PropertyDetail', params: { post } });
  };

  const checkIfAreImages = () => {
    if (post.images === null) {
      return false;
    } if (post.images.length === 0) {
      return false;
    }
    return true;
  };

  if (isOpen) {
    return (
      <Animatable.View
        style={styles.container}
        ref={(refs) => {
          postPreviewRef = refs;
        }}
        animation={slideInLeft}
        duration={200}
      >
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.postPreview}>
            <View
              style={{
                width: 120,
                height: 120,
                alignContent: 'center',
                justifyContent: 'center',
                paddingBottom: checkIfAreImages() ? 0 : 20,
              }}
            >
              {checkIfAreImages() ? (
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    resizeMode: 'cover',
                  }}
                  source={{ uri: `${API_URL}${post.images.url}` }}
                />
              ) : (
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    resizeMode: 'cover',
                    backgroundColor: '#f2f2f2',
                  }}
                  source={PlaceholderImg}
                />
              )}
            </View>
            <View style={styles.data}>
              <Text style={styles.title} numberOfLines={1}>
                {post.name}
              </Text>
              {post.type !== 'SERVICE' && (
              <Text style={styles.price} numberOfLines={1}>
                {addPointsToNumber(post.price)}
                {' '}
                <Text style={{ color: '#696969' }}>
                  CLP/noche
                </Text>
              </Text>
              )}
              <Text style={styles.address} numberOfLines={1}>
                {post.address}
              </Text>
            </View>
            <View style={styles.button}>
              <Text>
                <Ionicons name="chevron-forward-outline" size={30} color="#696969" />
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  }
  return null;
});

export default forwardRef((props, ref) => (
  <MapPostPreview {...props} ref={ref} />
));

MapPostPreview.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    images: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
      }),
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
      })),
    ]),
  }),
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

MapPostPreview.defaultProps = {
  post: null,
};
