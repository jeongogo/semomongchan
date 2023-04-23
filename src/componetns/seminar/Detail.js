import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function Notice({seminar}) {
  return (
    <View style={styles.container}>
      <Text>{seminar.title}</Text>
      <Text>{seminar.content}</Text>
      <Image
        source={{uri: seminar.posterUrl}}
        style={styles.image}
        resizeMethod='resize'
        resizeMode='cover'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  }
})

export default Notice