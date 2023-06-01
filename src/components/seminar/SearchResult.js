import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Search from './Search';
import Seminar from './Seminar';

function Result({data, handleSearch}) {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Search handleSearch={handleSearch} />
        <View style={styles.list}>
          {data.length
            ?
              <FlatList
                data={data}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            :
              <View style={styles.empty}>
                <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
              </View>
          }
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const renderItem = ({item}) => (
  <Seminar style={styles.item} item={item} home />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  empty: {
    marginTop: 50,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  list: {
    marginTop: 15,
    paddingHorizontal: 15,
  }
});

export default Result;