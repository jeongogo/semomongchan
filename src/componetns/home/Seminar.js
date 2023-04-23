import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Image } from 'react-native';

function Seminar({item}) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('SeminarDetail', {id: item.id})} style={styles.block}>
      {item.posterUrl &&
        <Image
          source={{uri: item.posterUrl}}
          style={styles.image}
          resizeMethod='resize'
          resizeMode='cover'
        />
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  block: {
    // paddingTop: 16,
    // paddingBottom: 16,
    width: '48%',
    height: '48%',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
  }
})

export default Seminar