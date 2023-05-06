import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Pressable, Text } from 'react-native';

function Comment({handleSubmitComment}) {
  const [content, setContent] = useState('');

  const onSubmit = () => {
    Keyboard.dismiss();
    handleSubmitComment(content);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={content} onChangeText={setContent} />
      <Pressable onPress={onSubmit} style={styles.btn}>
        <Text style={styles.btnText}>전송</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ededed',
    backgroundColor: '#fff',
  },
  input: {
    flexGrow: 1,
    height: 32,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    borderRadius: 5,
  },
  btn: {
    marginLeft: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FF1744',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
  }
})

export default Comment;