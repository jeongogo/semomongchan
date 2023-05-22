import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, useWindowDimensions } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import Loader from '../common/Loader';

function Detail({isLoading, apply}) {
  const { width } = useWindowDimensions();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (apply && !isLoading) {
      const current = new Date(apply.created.toDate());
      const year = current.getFullYear();
      const month = current.getMonth() + 1;
      const date = current.getDate();
      setCurrentDate(year + '년 ' + month + '월 ' + date + '일');
    }
  }, [isLoading]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentWrap}>
        {isLoading && <Loader />}
        <View style={styles.topInfo}>
          <Text style={styles.title}>{apply.title}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>주최: {apply.host}</Text>
          <Text style={styles.text}>이메일 : {apply.email}</Text>
          <Text style={styles.text}>휴대폰 번호 : {apply.phone}</Text>
          <Text style={styles.text}>자격증 및 수료증 발급 여부 : {apply.isIssued}</Text>
          <Text style={styles.text}>세미나 가격 : {apply.price}</Text>
          <Text style={styles.text}>세미나 진행 시간 : {apply.time}</Text>
          <View style={styles.photo}>
            {apply.photoURL && apply.photoURL.map((item) => (
              <Image key={item.id} source={{uri: item.url}} style={styles.image} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrap: {
    padding: 10,
  },
  topInfo: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#222',
    fontWeight: 500,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  content: {
    marginTop: 10,
    fontSize: 14,
  },
  text: {
    marginTop: 5,
    fontSize: 15,
    color: '#222',
  },
  photo: {
    marginTop: 10,
    paddingBottom: 30,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 200,
    marginTop: 10,
    aspectRatio: 1,
  }
});

export default Detail;