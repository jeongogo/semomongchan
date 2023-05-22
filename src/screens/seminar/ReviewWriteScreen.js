import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../store/store';
import { createDoc } from '../../lib/doc';
import { updateUser } from '../../lib/user';
import ReviewWrite from '../../components/seminar/ReviewWrite';

function ReviewWriteScreen() {  
  const queryClient = useQueryClient();
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  
  const handleWriteReview = async (data) => {
    setIsLoading(true);
    try {
      await createDoc('review', data);
      if (!user.isReviewWrite) {
        await updateUser(user.id, {isReviewWrite: true});
        setUser({...user, isReviewWrite: true})
      }
      queryClient.invalidateQueries('seminarReviews');
      navigation.navigate('SeminarDetail', {id: route.params.id});
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ReviewWrite isLoading={isLoading} handleWriteReview={handleWriteReview} />
  )
}

export default ReviewWriteScreen;