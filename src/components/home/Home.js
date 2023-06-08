import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
import Seminar from '../seminar/Seminar';
import Review from './Review';
import Notice from './Notice';
import Banner from './Banner';

function Home({seminarData, noticeData, reviewData, bannerData}) {
  const [slideTime, setSlideTime] = useState(1);

  useEffect(() => {
    const autoTimer = setTimeout(() => setSlideTime(8), 2000);
    return () => clearTimeout(autoTimer);
  }, [])

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.contentWrap}>
          <View style={styles.wrap}>
            <Text style={styles.logo}>SEMINAR.U</Text>
          </View>
          <View style={styles.noticeList}>
            <Swiper
              style={styles.swiper}
              key={noticeData.length}
              autoplay={true}
              showsPagination	={true}
              autoplayTimeout={slideTime}
              dotColor='#eee'
              activeDotColor='#ff4e50'
              paginationStyle={{bottom: 10}}
            >
              {noticeData.length && noticeData.map((item) => (
                <Notice key={item.id} item={item} />
              ))}
            </Swiper>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>최신 세미나</Text>
            <View style={styles.seminarlist}>
              {seminarData.length && seminarData.map((item) => (
                <Seminar key={item.id} item={item} home />
              ))}
            </View>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>최신 리뷰</Text>
            <View style={styles.reviewList}>
              <Swiper
                style={styles.swiper}
                key={reviewData.length}
                autoplay={true}
                showsPagination	={false}
                autoplayTimeout={slideTime}
              >
                {reviewData.length && reviewData.map((item) => (
                  <Review key={item.id} item={item} />
                ))}
              </Swiper>
            </View>
          </View>
          {bannerData.length > 0 &&
            <View style={styles.wrap}>
              <View style={styles.bannerList}>
                <Swiper
                  style={styles.swiper}
                  key={bannerData.length}
                  autoplay={true}
                  showsPagination	={false}
                  autoplayTimeout={slideTime}
                >
                  {bannerData.length && bannerData.map((item) => (
                    <Banner key={item.id} item={item} />
                  ))}
                </Swiper>
              </View>
            </View>
          }
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
    
  },
  wrap: {
    marginTop: 24,
    paddingHorizontal: 15,
  },
  logo: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 700,
    color: '#222',
    textAlign: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 700,
    color: '#222',
  },
  noticeList: {
    marginBottom: 10,
    height: 150,
  },
  seminarlist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reviewList: {
    height: 100,
  },
  bannerList: {
    height: 120,
  },
})

export default Home