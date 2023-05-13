import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Pressable, Image, View } from 'react-native';

function Wish({item}) {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.block} onPress={() => navigation.navigate('SeminarDetail', {id: item.id})}>
      <Image
        source={{uri: item.posterUrl}}
        style={styles.image}
        resizeMethod='resize'
        resizeMode='cover'
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.count}>관심도 {item.wishCount}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  block: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed'
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: 100,
    aspectRatio: 1,
    borderRadius: 5,
  },
  content: {
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    color: '#222',
  },
  date: {
    marginTop: 3,
    fontSize: 13,
    color: '#454545',
  },
  count: {
    marginTop: 3,
    fontSize: 12,
    color: '#999',
  }
})

export default Wish