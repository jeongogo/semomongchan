import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

function Comment({item, handleCommentWrite}) {
  const [content, setContent] = useState('');

  const onWrite = (id) => {
    setContent('');
    handleCommentWrite(id, content);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.comment}>
        <View style={styles.avatar}>
          
        </View>
        <View style={styles.contentWrap}>
          <Text style={styles.writer}>{item.writer}</Text>
          {item.photoURL &&
            <Image style={styles.image} source={{uri: item.photoURL}} />
          }
          <View style={styles.content}>
            <Text style={styles.contentText}>{item.content}</Text>
          </View>
        </View>
      </View>
      {item.recomments.length > 0 &&
        item.recomments.map((i) => (
          <View key={i.created} style={[styles.comment, styles.recomment]}>
            <View style={styles.avatar}></View>
            <View style={styles.contentWrap}>
              <Text style={styles.writer}>{i.writer}</Text>
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
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  writer: {
    marginBottom: 10,
    fontSize: 14,
    color: '#222',
  },
  contentWrap: {
    padding: 15,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
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
    paddingLeft: 40,
    marginTop: 10,
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
    marginTop: 10,
  },
});

export default Comment;