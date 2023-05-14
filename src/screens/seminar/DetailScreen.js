import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getDoc, getDocsByKey, updateDoc } from '../../lib/doc';
import { updateUser } from '../../lib/user';
import useStore from '../../store/store';
import Detail from '../../componetns/seminar/Detail';
import Loader from '../../componetns/common/Loader';

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
  const getComments = () => {
    return getDocsByKey('comment', 'seminarId', route.params.id);
  }

  /** Query */
  const seminarQuery = useQuery('seminarDetail', getSeminar);
  const commentQuery = useQuery('seminarComments', getComments);

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
      writer: {
        id: user.id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
      content: comment.content,
      created: new Date(),
      likes: 0,
    }

    const currentComments = commentQuery.data.filter((i) => i.id === comment.id);
    await updateDoc('comment', comment.id, {recomments: currentComments[0].recomments.concat(data)});
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
      queryClient.invalidateQueries('seminarComments');
    },
  });
  
  useEffect(() => {
    const filterData = user.wishList.filter((i) => i.id === route.params.id);
    setWishToggle(filterData.length > 0 ? true : false);
  }, [user.wishList]);

  if (!seminarQuery.data || !commentQuery.data) {
    return (
      <Loader />
    )
  }

  return (
    <Detail
      toastRef={toastRef}
      seminar={seminarQuery.data}
      comments={commentQuery.data}
      wishToggle={wishToggle}
      setWishToggle={setWishToggle}
      wishMutation={wishMutation}
      commentMutation={commentMutation}
    />
  )
}

export default DetailScreen;