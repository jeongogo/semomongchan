import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../store/store';
import { createDoc } from '../../lib/doc';
import { updateUser } from '../../lib/user';
import CommentWrite from '../../components/seminar/CommentWrite';

function CommentScreen() {  
  const route = useRoute();
  const navigation = useNavigation();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  
  const handleSubmitComment = async (data) => {
    try {
      await createDoc('comment', data);
      if (!user.isCommentWrite) {
        await updateUser(user.id, {isCommentWrite: true});
        setUser({...user, isCommentWrite: true})
      }
      navigation.navigate('SeminarDetail', {id: route.params.id});
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <CommentWrite handleSubmitComment={handleSubmitComment} />
  )
}

export default CommentScreen;