import React from 'react';
import { FlatList,StyleSheet } from 'react-native';
import Notice from './Notice';

function Home({noticeList}) {

  return (
    <FlatList
      data={noticeList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
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