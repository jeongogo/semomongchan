import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Pressable } from 'react-native';

function Apply({item}) {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const current = new Date(item._data.created.toDate());
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const date = current.getDate();
    setCurrentDate(year + '년 ' + month + '월 ' + date + '일');
  }, []);

  return (
    <Pressable onPress={() => navigation.navigate('ApplyDetail', {id: item.id})} style={styles.block}>
      <Text style={styles.date}>{currentDate}</Text>
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

export default Apply