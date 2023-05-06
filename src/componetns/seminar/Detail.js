import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Comment from './Comment';
import CommentWrite from './CommentWrite';

function Detail({
  seminar,
  wishToggle,
  comments,
  handleWish,
  handleSubmitComment
}) {
  const [visibleCommentWriteBtn, setVisibleCommentWriteBtn] = useState(true);  // 로그인 여부에 따라

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{uri: seminar.posterUrl}}
          style={styles.image}
          resizeMethod='resize'
          resizeMode='cover'
        />
        <View style={styles.info}>
          <Text style={styles.title}>{seminar.title}</Text>
          <View style={styles.wish}>
            <Pressable onPress={() => handleWish()}>
              {wishToggle
                ?
                  <Icon name="favorite" size={24} color='#ff4250' />
                :
                  <Icon name="favorite-outline" size={24} color='#ddd' />
              }
            </Pressable>
            <Text style={styles.count}>{seminar.wishCount}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text>{seminar.content}</Text>
        </View>
        <View style={styles.comments}>
          {comments &&
            comments.map((item) => (
              <Comment key={item.id} item={item} />
            ))          
          }
        </View>
      </ScrollView>
      {visibleCommentWriteBtn && <CommentWrite handleSubmitComment={handleSubmitComment} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  wish: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    color: '#222',
  },
  count: {
    fontSize: 12,
    color: '#999',
  },
  content: {
    padding: 10,
    fontSize: 14,
    color: '#222',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  comments: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  btn: {
    height: 32,
    marginHorizontal: 3,
    paddingHorizontal: 20,
    fontSize: 12,
    lineHeight: 30,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 7,
  }
})

export default Detail;