import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import uuid from 'react-native-uuid';
import { getDoc, getDocsByKey, updateDoc } from '../../lib/doc';
import { updateUser } from '../../lib/user';
import useStore from '../../store/store';
import Detail from '../../components/seminar/Detail';
import Loader from '../../components/common/Loader';

function DetailScreen({route}) {
  const queryClient = useQueryClient();
  const [wishToggle, setWishToggle] = useState();
  const toastRef = useRef(null);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  /** 세미나 가져오기 */
  const getSeminar = () => {
    return getDoc('seminar', route.params.id);
  }

  /** 리뷰 가져오기 */
  const getReviews = () => {
    return getDocsByKey('review', 'seminarId', route.params.id);
  }

  /** Query */
  const seminarQuery = useQuery('seminarDetail', getSeminar);
  const reviewQuery = useQuery('seminarReviews', getReviews);

  /** 위시리스트 토글 */
  const handleWish = async () => {
    if (wishToggle) {
      const count = seminarQuery.data.wishCount <= 1 ? 0 : seminarQuery.data.wishCount - 1;
      await updateDoc('seminar', route.params.id, {
        wishCount: count
      });

      const filterData = user.wishList.filter((i) => i.id !== route.params.id);
      await updateUser(user.id, {
        wishList: filterData.length < 1 ? [] : filterData
      });
      setUser({...user, wishList: filterData.length < 1 ? [] : filterData});
      toastRef.current.show('위시리스트에서 제거되었습니다.');
    } else {
      const count = seminarQuery.data.wishCount + 1;
      await updateDoc('seminar', route.params.id, {
        wishCount: count,
      });

      await updateUser(user.id, {
        wishList: [...user.wishList, {
          id: route.params.id,
          title: seminarQuery.data.title,
          content: seminarQuery.data.content,
          posterUrl: seminarQuery.data.posterUrl,
          wishCount: count,
        }]
      });
      setUser({
        ...user,
        wishList: [...user.wishList, {
          id: route.params.id,
          title: seminarQuery.data.title,
          content: seminarQuery.data.content,
          posterUrl: seminarQuery.data.posterUrl,
          wishCount: count,
        }]
      });
      toastRef.current.show('위시리스트에 추가되었습니다.');
    }
  }

  /** 대댓글 달기 */
  const handleCommentWrite = async (comment) => {
    const data = {
      id: uuid.v4(),
      writer: {
        id: user.id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
      content: comment.content,
      created: new Date(),
      likes: 0,
      isDeleted: false,
    }

    const currentReviews = reviewQuery.data.filter((i) => i.id === comment.id);
    await updateDoc('review', comment.id, {comments: currentReviews[0].comments.concat(data)});
  }

  /** Mutation - 위시리스트 */
  const wishMutation = useMutation(handleWish, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('seminarDetail');
    },
  });

  /** Mutation - 대댓글 */
  const commentMutation = useMutation(handleCommentWrite, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('seminarReviews');
    },
  });

  /** 리뷰 삭제 */
  const handleDeleteReview = async (id) => {
    try {
      await updateDoc('review', id, {content: '작성자에 의해 삭제된 리뷰입니다.', isDeleted: true});
      queryClient.invalidateQueries('seminarReviews');
    } catch (e) {
      console.log(e);
    }
  }

  /** 대댓글 수정 */
  const handleUpdateComment = async (id, commentId, content) => {
    try {
      const currentReviews = reviewQuery.data.filter((i) => i.id === id);
      const currentComments = currentReviews[0].comments.map((i) => {
        if (i.id === commentId) {
          return {
            ...i,
            content
          }
        }
        return i;
      });
      await updateDoc('review', id, {comments: currentComments});
      queryClient.invalidateQueries('seminarReviews');
    } catch (e) {
      console.log(e);
    }
  }

  /** 대댓글 삭제 */
  const handleDeleteComment = async (id, commentId) => {
    try {
      const currentReviews = reviewQuery.data.filter((i) => i.id === id);
      const currentComments = currentReviews[0].comments.map((i) => {
        if (i.id === commentId) {
          return {
            ...i,
            content: '작성자에 의해 삭제된 리뷰입니다.',
            isDeleted: true,
          }
        }
        return i;
      });
      await updateDoc('review', id, {comments: currentComments});
      queryClient.invalidateQueries('seminarReviews');
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const filterData = user.wishList.filter((i) => i.id === route.params.id);
    setWishToggle(filterData.length > 0 ? true : false);
  }, [user.wishList]);

  if (!seminarQuery.data || !reviewQuery.data) {
    return (
      <Loader />
    )
  }

  return (
    <Detail
      toastRef={toastRef}
      seminar={seminarQuery.data}
      reviews={reviewQuery.data}
      wishToggle={wishToggle}
      setWishToggle={setWishToggle}
      wishMutation={wishMutation}
      commentMutation={commentMutation}
      handleDeleteReview={handleDeleteReview}
      handleUpdateComment={handleUpdateComment}
      handleDeleteComment={handleDeleteComment}
    />
  )
}

export default DetailScreen;