import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Pressable, Image } from 'react-native';

function Banner({item}) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('BannerDetail', {id: item.id})}>
      <Image style={styles.image} source={{uri: item.posterUrl}} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  }
});

export default Banner;