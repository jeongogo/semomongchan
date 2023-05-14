import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

function Comment({item, commentMutation}) {
  const navigation = useNavigation();
  const [content, setContent] = useState('');

  const getDate = (currentDate) => {
    const current = new Date(currentDate.toDate());
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const date = current.getDate();
    return year + '. ' + month + '. ' + date
  }

  const onWrite = (id) => {
    setContent('');
    commentMutation.mutate({id, content});
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.comment}>
        <View style={styles.avatar}>
          <Image style={styles.avatarImage} source={item.writer.photoURL ? {uri: item.writer.photoURL} : require('../assets/user.png')} />
        </View>
        <View style={styles.contentWrap}>
          <View style={styles.wrap}>
            <Text style={styles.writer}>{item.writer.name}</Text>
            <Text style={styles.date}>{getDate(item.created)}</Text>
          </View>
          {item.photoURL &&
            <Pressable onPress={() => navigation.navigate('Photo', {url: item.photoURL})}>
              <Image style={styles.image} source={{uri: item.photoURL}} />
            </Pressable>
          }
          <View style={styles.content}>
            <Text style={styles.contentText}>{item.content}</Text>
          </View>
        </View>
      </View>
      {item.recomments.length > 0 &&
        item.recomments.map((i) => (
          <View key={i.created} style={[styles.comment, styles.recomment]}>
            <View style={styles.avatar}>
              <Image style={styles.avatarImage} source={i.writer.photoURL ? {uri: i.writer.photoURL} : require('../assets/user.png')} />
            </View>
            <View style={styles.contentWrap}>
              <View style={styles.wrap}>
                <Text style={styles.writer}>{i.writer.name}</Text>
                <Text style={styles.date}>{getDate(i.created)}</Text>
              </View>
              <Text style={styles.content}>{i.content}</Text>
            </View>
          </View>
        ))
      }
      <View style={styles.write}>
        <TextInput style={styles.writeInput} value={content} onChangeText={setContent} />
        <Pressable style={styles.writeBtn} onPress={() => onWrite(item.id)}>
          <Text style={styles.writeBtnText}>전송</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  comment: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  avatar: {
    marginRight: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  contentWrap: {
    padding: 15,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  writer: {
    marginRight: 10,
    fontSize: 14,
    color: '#222',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: '#454545',
  },
  write: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50,
    marginTop: 15,
  },
  writeInput: {
    height: 40,
    marginRight: 5,
    paddingHorizontal: 10,
    color: '#222',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 5,
  },
  writeBtn: {
    display: 'flex',
    justifyContent: 'center',
    height: 38,
    paddingHorizontal: 10,
    backgroundColor: '#ff4e50',
    borderRadius: 5,
  },
  writeBtnText: {
    fontSize: 14,
    color: '#fff',
  },
  recomment: {
    paddingLeft: 50,
    marginTop: 15,
  },
});

export default Comment;