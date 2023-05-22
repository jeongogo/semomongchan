import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../store/store';
import { signOut } from '../../lib/auth';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Home({}) {
  const navigation = useNavigation();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const onLogout = () => {
    signOut();
    setUser('');
  }

  return (
    <View style={styles.container}>
      <Pressable  style={styles.profile} onPress={() => navigation.navigate('MyProfile')}>
        <View style={styles.avatar}>
          <Image
            style={styles.circle}
            source={user.photoURL ? {uri: user.photoURL} : require('../assets/user.png')}
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Icon name="navigate-next" size={24} color='#000' />
      </Pressable> 
      <View style={styles.hr}></View>
      <View style={styles.menuWrap}>
        <Pressable style={styles.menu} onPress={() => navigation.navigate('ApplyWrite')}>
          <Text style={styles.menuText}>세미나 등록 신청하기</Text>
          <Icon name="navigate-next" size={24} color='#000' />
        </Pressable>
        <Pressable style={styles.menu} onPress={() => navigation.navigate('ApplyList')}>
          <Text style={styles.menuText}>세미나 등록 신청 내역</Text>
          <Icon name="navigate-next" size={24} color='#000' />
        </Pressable>
      </View>
      <Pressable onPress={onLogout} style={styles.logout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  avatar: {
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  circle: {
    width: 60,
    height: 60,
  },
  hr: {
    borderBottomWidth: 7,
    borderBottomColor: '#ededed',
  },
  name: {
    marginRight: 'auto',
    fontSize: 15,
    color: '#222',
  },
  menuWrap: {
    paddingVertical: 10,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  menuText: {
    fontSize: 15,
    color: '#222',
  },
  logout: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  logoutText: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  }
})

export default Home