import React from 'react';
import { StyleSheet, Image } from 'react-native';

function Notice({item}) {
  return (
    <Image style={styles.image} source={{uri: item.posterUrl}} />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 1,
  }
});

export default Notice