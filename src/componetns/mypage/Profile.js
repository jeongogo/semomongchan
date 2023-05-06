import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Profile() {
  return (
    <View style={styles.container}>
      <Text>mypage</Text>
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
})

export default Profile