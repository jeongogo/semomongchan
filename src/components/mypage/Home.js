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

  const onProfile = () => {
    navigation.navigate('MyProfile');
  }

  const onLogout = () => {
    signOut();
    setUser('');
  }

  return (
    <View style={styles.container}>
      <Pressable  style={styles.profile} onPress={onProfile}>
        <View style={styles.avatar}>
          <Image
            style={styles.circle}
            source={user.photoURL ? {uri: user.photoURL} : require('../assets/user.png')}
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Icon name="navigate-next" size={24} color='#000' />
      </Pressable> 
      <View style={styles.snb}>
        <Pressable onPress={onLogout}>
          <Text style={styles.logout}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  name: {
    marginRight: 'auto',
    fontSize: 14,
    color: '#222',
  },
  snb: {
    paddingVertical: 20,
  },
  logout: {
    fontSize: 14,
    color: '#222',
    textDecorationLine: 'underline',
  }
})

export default Home