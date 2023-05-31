import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View } from 'react-native';
import SeminarForList from './SeminarForList';

function Home({data, onMore}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    let filterData = [];
    data.pages.map((i) => {
      filterData.push(i._docs);
    });
    setList(filterData[0]);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <View style={styles.list}>
          <FlatList
            data={list}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={(item) => item.id}
            onEndReached={onMore}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const renderItem = ({item}) => (
  <SeminarForList item={item} />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 5,
    paddingHorizontal: 15,
  }
})

export default Home;