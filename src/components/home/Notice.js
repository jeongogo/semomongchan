import React from 'react';
import { StyleSheet, Image } from 'react-native';

function Review({notice}) {
  return (
    <Image style={styles.image} source={{uri: notice.posterUrl}} />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 1,
  }
});

export default Review