import React, { useState } from 'react';
import { format } from 'date-fns';
import { Image, StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import useStore from '../../store/store';
import Icon from 'react-native-vector-icons/Ionicons';

function Recomment({id, item, handleUpdateComment, handleDeleteComment}) {
  const user = useStore((state) => state.user);
  const [activeModify, setActiveModify] = useState(false);
  const [content, setContent] = useState(item.content);

  const onModify = () => {
    handleUpdateComment(id, item.id, content);
    setActiveModify(false)
    setContent('');
  }

  const onDelete = () => {
    Alert.alert("", "댓글을 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => null,
      },
      {
        text: "확인",
        onPress: () => {
          handleDeleteComment(id, item.id);
        }
      }
    ]);
  }

  return (
    <View style={styles.recomment}>
      <View style={styles.topArea}>
        <View style={styles.avatar}>
          <Image style={styles.avatarImage} source={item.writer.photoURL ? {uri: item.writer.photoURL} : require('../../assets/user.png')} />
        </View>
        <Text style={styles.name}>{item.writer.name}</Text>
        <Text style={styles.date}>{format(new Date(item.created.toDate()), 'yyyy.MM.dd')}</Text>
        {(item.writer.id === user.id && !item.isDeleted) &&
          <View style={styles.btns}>
            <Pressable style={styles.btn} onPress={() => setActiveModify(true)}>
              <Icon name="create-outline" size={16} color='#666' />
            </Pressable>
            <Pressable style={styles.btn} onPress={onDelete}>
              <Icon name="trash-outline" size={16} color='#666' />
            </Pressable>
          </View>
        }
      </View>
      <View style={styles.contentArea}>
        {activeModify
          ?
            <View style={styles.modify}>
              <TextInput value={content} onChangeText={setContent} style={styles.input} onSubmitEditing={onModify} />
              <Pressable style={styles.btnSubmit} onPress={onModify}>
                <Icon name="checkmark-sharp" size={20} color='#333' />
              </Pressable>
              <Pressable style={styles.btnCancel} onPress={() => setActiveModify(false)}>
                <Icon name="close" size={20} color='#333' />
              </Pressable>
            </View>
          : <Text style={[styles.content, item.isDeleted && styles.deleted]}>{item.content}</Text>
        }        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recomment: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
  },
  topArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    marginRight: 7,
  },
  avatarImage: {
    width: 26,
    height: 26,
    resizeMode: 'cover',
    borderRadius: 13,
  },
  name: {
    marginRight: 7,
    fontSize: 16,
    color: '#222',
  },
  date: {
    marginRight: 'auto',
    fontSize: 14,
    color: '#999',
  },
  btns: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    marginLeft: 7,
  },
  contentArea: {
    marginTop: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#222',
  },
  deleted: {
    color: '#999',
  },
  modify: {
    
  },
  input: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 50,
    fontSize: 15,
    color: '#222',
    borderWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  btnSubmit: {
    position: 'absolute',
    top: 8,
    right: 35,
  },
  btnCancel: {
    position: 'absolute',
    top: 8,
    right: 10,
  }
});

export default Recomment