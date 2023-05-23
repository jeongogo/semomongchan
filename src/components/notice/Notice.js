import React from 'react';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Pressable } from 'react-native';

function Notice({item}) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('NoticeDetail', {id: item.id})} style={styles.block}>
      <Text style={styles.date}>{format(new Date(item._data.created.toDate()), 'yyyy.MM.dd')}</Text>
      <Text style={styles.title}>{item._data.title}</Text>
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
  title: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
  },
  date: {
    fontSize: 13,
    color: '#999'
  }
});

export default Notice