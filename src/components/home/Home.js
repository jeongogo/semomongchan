import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
import Search from '../search/Search';
import Seminar from '../seminar/Seminar';
import Review from './Review';

function Home({seminarData, reviewData}) {
  const [active, setActive] = useState('all');

  const onTab = (tab) => {
    console.log('tab');
    setActive(tab);
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.contentWrap}>
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
          <View style={styles.wrap}>
            <Text style={styles.title}>최신 세미나</Text>
          </View>
          <View style={styles.seminarlist}>
            {seminarData.length && seminarData.map((seminar) => (
              <Seminar key={seminar.id} seminar={seminar} />
            ))}
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>최신 리뷰</Text>
          </View>
          <View style={styles.reviewList}>
            <Swiper style={styles.swiper} key={reviewData.length} autoplay={true} showsPagination	={false}>
              {reviewData.length && reviewData.map((review) => (
                <Review key={review.id} review={review} />
              ))}
            </Swiper>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrap: {
    paddingTop: 20,
    paddingHorizontal: 15,
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
  wrap: {
    marginTop: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 700,
    color: '#222',
  },
  seminarlist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reviewList: {
    paddingBottom: 40,
  },
  swiper: {
    height: 100,
  }
})

export default Home