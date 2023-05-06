import React, { useState, useEffect } from 'react';
import { getDoc, getDocsById, createDoc, updateDoc } from '../../lib/doc';
import { updateUser } from '../../lib/users';
import useStore from '../../store/store';
import Detail from '../../componetns/seminar/Detail';

function DetailScreen({route}) {
  const [seminar, setSeminar] = useState('');
  const [comments, setComments] = useState([]);
  const [wishToggle, setWishToggle] = useState();
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
      const data = await getDocsById('comment', route.params.id);
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
            date: seminar.date,
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
            date: seminar.date,
            wishCount: count,
          }]
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  /** 댓글 작성하기 */
  const handleSubmitComment = async (content) => {
    try {
      const data = {
        docId: route.params.id,
        content,
        writer: user.displayName,
        created: new Date(),
      }
      await createDoc('comment', data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleGetSeminar();
    handleGetComments();
  }, []);
  
  useEffect(() => {
    const filterData = user.wishList.filter((i) => i.id === route.params.id);
    setWishToggle(filterData.length > 0 ? true : false);
  }, [user.wishList]);

  return (
    <Detail
      route={route}
      seminar={seminar}
      comments={comments}
      wishToggle={wishToggle}
      setWishToggle={setWishToggle}
      handleWish={handleWish}
      handleSubmitComment={handleSubmitComment}
    />
  )
}

export default DetailScreen;