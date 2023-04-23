import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Pressable } from 'react-native';

function Notice({item}) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('NoticeDetail', {id: item.id})} style={styles.block}>
      <Text>{item.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed'
  },
})

export default Notice