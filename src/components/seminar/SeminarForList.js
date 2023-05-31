import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Pressable, Image } from 'react-native';

function SeminarForList({item}) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('SeminarDetail', {id: item.id})} style={styles.block}>
      {item._data.posterUrl &&
        <Image
          source={{uri: item._data.posterUrl}}
          style={styles.image}
          resizeMethod='resize'
          resizeMode='cover'
        />
      }
      <Text style={styles.title}>{item._data.title}</Text>
      <Text style={styles.host}>{item._data.host}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  block: {
    width: '48%',
    marginTop: 15,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 500,
    color: '#222',
  },
  host: {
    marginTop: 5,
    fontSize: 13,
    color: '#999',
  }
});

export default SeminarForList;