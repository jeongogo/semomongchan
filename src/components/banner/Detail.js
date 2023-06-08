import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Text, View, StyleSheet } from 'react-native';

function Detail({banner}) {
  const { width } = useWindowDimensions();
  const source = {
    html: `${banner.content}`
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{banner.title}</Text>
      <RenderHtml
        contentWidth={width}
        source={source}
      />
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