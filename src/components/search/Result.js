import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Search from './Search';
import Seminar from '../seminar/Seminar';

function Result({seminarList}) {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Search />
        <View style={styles.list}>
          <FlatList
            data={seminarList}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const renderItem = ({item}) => (
  <Seminar style={styles.item} item={item} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  list: {
    marginTop: 15,
    paddingHorizontal: 15,
  }
});

export default Result;