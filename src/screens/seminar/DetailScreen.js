import React, { useState, useEffect, useRef } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { getDoc, getDocsByKey, createDoc, updateDoc } from '../../lib/doc';
import { updateUser } from '../../lib/user';
import useStore from '../../store/store';
import Detail from '../../componetns/seminar/Detail';

function DetailScreen({route}) {
  const isFocused = useIsFocused();
  const [seminar, setSeminar] = useState('');
  const [comments, setComments] = useState([]);
  const [wishToggle, setWishToggle] = useState();
  const toastRef = useRef();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  /** 세미나 가져오기 */
  const handleGetSeminar = async () => {
    try {
      const data = await getDoc('seminar', route.params.id);
      setSeminar(data);
    } catch (e) {
      console.log(e);
    }
  }

  /** 리뷰 가져오기 */
  const handleGetComments = async () => {
    try {
      const data = await getDocsByKey('comment', 'seminarId', route.params.id);
      setComments(data);
    } catch (e) {
      console.log(e);
    }
  }

  /** 위시 리스트 토글 */
  const handleWish = async () => {
    try {
      if (wishToggle) {
        const count = seminar.wishCount <= 1 ? 0 : seminar.wishCount - 1;
        await updateDoc('seminar', route.params.id, {
          wishCount: count
        });
        setSeminar({...seminar, wishCount: count});

        const filterData = user.wishList.filter((i) => i.id !== route.params.id);
        await updateUser(user.id, {
          wishList: filterData.length < 1 ? [] : filterData
        });
        setUser({...user, wishList: filterData.length < 1 ? [] : filterData});
        toastRef.current.show('위시리스트에서 제거되었습니다.');
      } else {
        const count = seminar.wishCount + 1;
        await updateDoc('seminar', route.params.id, {
          wishCount: count,
        });
        setSeminar({...seminar, wishCount: count});

        await updateUser(user.id, {
          wishList: [...user.wishList, {
            id: route.params.id,
            title: seminar.title,
            content: seminar.content,
            posterUrl: seminar.posterUrl,
            wishCount: count,
          }]
        });
        setUser({
          ...user,
          wishList: [...user.wishList, {
            id: route.params.id,
            title: seminar.title,
            content: seminar.content,
            posterUrl: seminar.posterUrl,
            wishCount: count,
          }]
        });
        toastRef.current.show('위시리스트에 추가되었습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleCommentWrite = async (id, content) => {
    try {
      const data = {
        userId: user.id,
        writer: user.name,
        content,
        created: new Date(),
        likes: 0,
      }
      const filterComments = comments.map((i) => {
        if (i.id === id) {
          return {
            ...i,
            recomments: i.recomments.concat(data)
          };
        }
        return i;
      });
      setComments(filterComments);

      const currentComments = comments.filter((i) => i.id === id);
      await updateDoc('comment', id, {recomments: currentComments[0].recomments.concat(data)});
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleGetSeminar();
    handleGetComments();
  }, [isFocused]);
  
  useEffect(() => {
    const filterData = user.wishList.filter((i) => i.id === route.params.id);
    setWishToggle(filterData.length > 0 ? true : false);
  }, [user.wishList]);

  return (
    <Detail
      toastRef={toastRef}
      seminar={seminar}
      comments={comments}
      wishToggle={wishToggle}
      setWishToggle={setWishToggle}
      handleWish={handleWish}
      handleCommentWrite={handleCommentWrite}
    />
  )
}

export default DetailScreen;