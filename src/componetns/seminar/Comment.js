import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Comment({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text>{item.writer}</Text>
      </View>
      <View style={styles.wrap}>
        <Text>{item.content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 7,
  },
  wrap: {
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Comment;