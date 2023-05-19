import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={32} color='#ff4250' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
  }
});

export default Loader