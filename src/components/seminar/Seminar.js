import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Image, Text } from 'react-native';

function Seminar({item, home}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('SeminarDetail', {id: item.id})
      }}
      style={styles.block}
    >
      <Image
        source={{uri: home ? item.posterUrl : item._data.posterUrl}}
        style={styles.image}
        resizeMethod='resize'
        resizeMode='cover'
      />
      <Text style={styles.title}>{home ? item.title : item._data.title}</Text>
      <Text style={styles.host}>{home ? item.host : item._data.host}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  block: {
    width: '48%',
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 10,
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
})

export default Seminar