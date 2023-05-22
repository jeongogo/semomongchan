import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Photo() {
  const route = useRoute();
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: route.params.url}} />
      <Pressable style={styles.btn} onPress={onBack}>
        <Icon name="close" size={24} color='#fff' />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  btn: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
});

export default Photo;