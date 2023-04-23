import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Detail({notice}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notice.title}</Text>
      <Text style={styles.content}>{notice.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  content: {
    marginTop: 10,
    fontSize: 14,
  }
});

export default Detail;