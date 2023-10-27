/* eslint-disable react/jsx-props-no-spreading */
import React, { useImperativeHandle, forwardRef } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import MapPostPreviewScrolleable from './MapPostPreviewScrolleable';
import { styles } from './MultiplePostPreview.styles';

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

  return (
    <Animatable.View
      ref={(refs) => {
        scrolleablePostPreviewRef = refs;
      }}
      animation={slideInLeft}
      duration={200}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {posts.map((post) => (
          <MapPostPreviewScrolleable
            key={post.id}
            post={post}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ))}
      </ScrollView>
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
