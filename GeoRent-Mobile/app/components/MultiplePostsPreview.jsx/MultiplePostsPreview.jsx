/* eslint-disable react/jsx-props-no-spreading */
import React, { useImperativeHandle, forwardRef } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import MapPostPreviewScrolleable from './MapPostPreviewScrolleable';
import { styles } from './MultiplePostPreview.styles';

const slideOutLeft = {
  from: {
    translateX: 0,
  },
  to: {
    translateX: -500,
  },
};

const MapMultiplePostsReview = forwardRef(({ posts, isOpen, setIsOpen }, ref) => {
  let scrolleablePostPreviewRef;

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    scrolleablePostPreviewRef.animate(slideOutLeft, 300).then(() => setIsOpen(false));
  };

  useImperativeHandle(ref, () => ({
    handleClose,
  }));

  const renderItem = ({ item }) => (
    <MapPostPreviewScrolleable
      post={item}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );

  return (
    <Animatable.View
      ref={(refs) => {
        scrolleablePostPreviewRef = refs;
      }}
      animation="slideInLeft"
      duration={200}
      style={styles.animatableView}
    >
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.flatListContent}
      />
    </Animatable.View>
  );
});

export default forwardRef((props, ref) => <MapMultiplePostsReview {...props} ref={ref} />);

MapMultiplePostsReview.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      category: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
