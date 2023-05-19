import React, { useEffect, useState } from 'react';
import { FlatList,StyleSheet } from 'react-native';
import Notice from './Notice';

function Home({data, onMore}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    let filterData = [];
    data.pages.map((i) => {
      filterData.push(i._docs);
      return i._docs
    });
    setList(filterData[0]);
  }, []);

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
      onEndReached={onMore}
    />
  )
}

const renderItem = ({item}) => (
  <Notice item={item} />
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ededed'
  },
})

export default Home;