import React from 'react';
import { format } from 'date-fns';
import { StyleSheet, View, Text } from 'react-native';

function Review({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.name}>{item.writer.name}</Text>
        <Text style={styles.date}>{format(new Date(item.created.toDate()), 'yyyy.MM.dd')}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    color: '#222',
  },
  date: {
    fontSize: 13,
    color: '#999',
  },
  content: {
    marginTop: 7,
    fontSize: 15,
    color: '#454545',
  },
});

export default Review