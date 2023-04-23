import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Seminar from './Seminar';

function Home({seminarList}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>새로 등록된 세미나</Text>
      <FlatList
        data={seminarList}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const renderItem = ({item}) => (
  <Seminar style={styles.item} item={item} />
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
  },
  item: {
    flex: 0.5,
  }
})

export default Home