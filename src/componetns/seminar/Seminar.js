import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Image, Text } from 'react-native';

function Seminar({item}) {
  const navigation = useNavigation();
  // const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // const current = new Date(item.date.toDate());
    // const year = current.getFullYear();
    // const month = current.getMonth() + 1;
    // const date = current.getDate();
    // setCurrentDate(year + '년 ' + month + '월 ' + date + '일');
  }, []);

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
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.host}>{item.host}</Text>
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