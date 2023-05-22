import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Review({review}) {
  const getDate = (currentDate) => {
    const current = new Date(currentDate.toDate());
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const date = current.getDate();
    return year + '.' + month + '.' + date
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.name}>{review.writer.name}</Text>
        <Text style={styles.date}>{getDate(review.created)}</Text>
      </View>
      <Text style={styles.content}>{review.content}</Text>
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
    fontSize: 15,
    color: '#999',
  },
  content: {
    marginTop: 7,
    fontSize: 15,
    color: '#454545',
  },
});

export default Review