import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Image, Text } from 'react-native';

function Seminar({seminar}) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('SeminarDetail', {id: seminar.id})} style={styles.block}>
      {seminar.posterUrl &&
        <Image
          source={{uri: seminar.posterUrl}}
          style={styles.image}
          resizeMethod='resize'
          resizeMode='cover'
        />
      }
      <Text style={styles.title}>{seminar.title}</Text>
      <Text style={styles.host}>{seminar.host}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  block: {
    // paddingTop: 16,
    // paddingBottom: 16,
    width: '48%',
    marginBottom: 15,
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
})

export default Seminar