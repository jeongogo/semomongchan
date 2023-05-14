import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import Toast from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useStore from '../../store/store';
import Comment from './Comment';

function Detail({
  toastRef,
  seminar,
  wishToggle,
  comments,
  wishMutation,
  commentMutation,
}) {
  const user = useStore((state) => state.user);

  const onCommentView = () => {
    Alert.alert("", "후기를 보려면 하나 이상의 후기를 남겨주세요.", [
      {
        text: "확인",
        onPress: () => null,
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toast
          ref={toastRef}
          position='bottom'
          positionValue={200}
          fadeInDuration={400}
          fadeOutDuration={1000}
          style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}
        />
        <Image
          source={{uri: seminar.posterUrl}}
          style={styles.image}
          resizeMethod='resize'
          resizeMode='cover'
        />
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{seminar.title}</Text>
            <Text style={styles.host}>{seminar.host}</Text>
          </View>
          <View style={styles.wish}>
            <Pressable onPress={() => wishMutation.mutate()}>
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
        {user.isCommentWrite
          ?
            <View style={styles.comments}>
              {comments &&
                comments.map((item) => (
                  <Comment key={item.id} item={item} commentMutation={commentMutation} />
                ))          
              }
            </View>
          :
            <Pressable style={styles.commentViewBtn} onPress={onCommentView}>
              <Text style={styles.commentViewBtnText}>댓글 보기</Text>
            </Pressable>
        }
      </ScrollView>
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
  host: {
    marginTop: 5,
    fontSize: 14,
    color: '#454545',
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
  },
  commentViewBtn: {
    marginVertical: 20,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ff4250',
    borderRadius: 5,
  },
  commentViewBtnText: {
    fontSize: 14,
    color: '#ff4250',
    textAlign: 'center',
  },
})

export default Detail;