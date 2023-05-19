import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import Search from '../search/Search';
import Seminar from '../seminar/Seminar';

function Home({data, onMore}) {
  const [active, setActive] = useState('all');
  const [list, setList] = useState([]);

  const onTab = (tab) => {
    console.log('tab');
    setActive(tab);
  }

  useEffect(() => {
    let filterData = [];
    data.pages.map((i) => {
      filterData.push(i._docs);
      return i._docs
    });
    setList(filterData[0]);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/* <View style={styles.tabWrap}>
          <Pressable style={[styles.tabItem, active === 'all' && styles.active]} onPress={() => onTab('all')}>
            <Text style={styles.tabText}>전체</Text>
          </Pressable>
          <Pressable style={[styles.tabItem, active === 'training' && styles.active]} onPress={() => onTab('training')}>
            <Text style={styles.tabText}>트레이닝</Text>
          </Pressable>
          <Pressable style={[styles.tabItem, active === 'physiotherapy' && styles.active]} onPress={() => onTab('physiotherapy')}>
            <Text style={styles.tabText}>물리치료</Text>
          </Pressable>
          <Pressable style={[styles.tabItem, active === 'beauty' && styles.active]} onPress={() => onTab('beauty')}>
            <Text style={styles.tabText}>미용</Text>
          </Pressable>
        </View> */}
        <Search home />
        <View style={styles.list}>
          <FlatList
            data={list}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={onMore}
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
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  tabWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  active: {
    marginBottom: -2,
    borderBottomWidth: 3,
    borderBottomColor: '#ff4250'
  },
  tabText: {
    fontSize: 14,
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  item: {
    flex: 0.5,
  }
})

export default Home