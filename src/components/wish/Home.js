import React from 'react';
import { FlatList,StyleSheet } from 'react-native';
import useStore from '../../store/store';
import Wish from './Wish';

function Home() {
  const user = useStore((state) => state.user);

  return (
    <FlatList
      data={user.wishList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  )
}

const renderItem = ({item}) => (
  <Wish item={item} />
)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
})

export default Home;