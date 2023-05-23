import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import useStore from '../../store/store';
import Comment from './Comment';
import Icon from 'react-native-vector-icons/Ionicons';

function Review({item, commentMutation, handleDeleteReview, handleUpdateComment, handleDeleteComment}) {
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const user = useStore((state) => state.user);

  const onWrite = () => {
    setContent('');
    commentMutation.mutate({id: item.id, content});
  }

  const onDelete = (id) => {
    Alert.alert("", "리뷰를 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => null,
      },
      {
        text: "확인",
        onPress: () => {
          handleDeleteReview(id);
        }
      }
    ]);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.contentWrap}>
        <View style={styles.topArea}>
          <View style={styles.avatar}>
            <Image style={styles.avatarImage} source={item.writer.photoURL ? {uri: item.writer.photoURL} : require('../../assets/user.png')} />
          </View>
          <Text style={styles.name}>{item.writer.name}</Text>
          <Text style={styles.date}>{format(new Date(item.created.toDate()), 'yyyy.MM.dd')}</Text>
          {/* {(item.writer.id === user.id && !item.isDeleted) &&
            <View style={styles.btns}>
              <Pressable style={styles.btn} onPress={() => {}}>
                <Icon name="create-outline" size={16} color='#666' />
              </Pressable>
              <Pressable style={styles.btn} onPress={() => onDelete(item.id)}>
                <Icon name="trash-outline" size={16} color='#666' />
              </Pressable>
            </View>
          } */}
        </View>
        <View style={styles.contentArea}>
          {(item.photoURL && !item.isDeleted) &&
            <Pressable onPress={() => navigation.navigate('Photo', {url: item.photoURL})}>
              <Image style={styles.image} source={{uri: item.photoURL}} />
            </Pressable>
          }
          <Text style={[styles.contentText, item.isDeleted && styles.deleted]}>{item.content}</Text>
        </View>
      </View>
      {item.comments.length > 0 &&
        <View style={styles.commentWrap}>
          {item.comments.map((i) => (
            <Comment
              id={item.id}
              key={i.created}
              item={i}
              handleUpdateComment={handleUpdateComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </View>
      }
      <View style={styles.writeWrap}>
        <TextInput
          style={styles.writeInput}
          value={content} onChangeText={setContent}
          placeholder='댓글 쓰기'
          placeholderTextColor='#aaa'
          onSubmitEditing={onWrite}
        />
        <Pressable style={styles.writeBtn} onPress={onWrite}>
          <Text style={styles.writeBtnText}>작성</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#ededed',
  },
  contentWrap: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 7,
    borderTopColor: '#f3f3f3',
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
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#222',
  },
  deleted: {
    color: '#999',
  },
  commentWrap: {
    marginTop: 20,
    paddingTop: 5,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ededed',
  },
  writeWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  writeInput: {
    height: 40,
    marginRight: 10,
    paddingHorizontal: 10,
    fontSize: 15,
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
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ff4e50',
    borderRadius: 5,
  },
  writeBtnText: {
    fontSize: 15,
    color: '#ff4e50',
  },
});

export default Review;