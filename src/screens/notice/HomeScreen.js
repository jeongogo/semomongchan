import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { useInfiniteQuery } from 'react-query';
import Home from '../../components/notice/Home';
import Loader from '../../components/common/Loader';

function HomeScreen() {
  const noticeQuery = useInfiniteQuery(
    ["notice"],
    async ({queryKey, pageParam}) => {
      return pageParam
        ?
          await firestore()
          .collection("notice")
          .orderBy("created", "desc")
          .startAfter(pageParam)
          .limit(10)
          .get()
          .then((querySnapshot) => querySnapshot)
        :
          await firestore()
          .collection("notice")
          .orderBy("created", "desc") 
          .limit(10)
          .get()
          .then((querySnapshot) => querySnapshot)
    }, 
    {
      getNextPageParam: (querySnapshot) => {
        if (querySnapshot.size < 10) return null;
        else return querySnapshot.docs[querySnapshot.docs.length - 1];
      },
    }
  );

  const onMore = () => {
    if (noticeQuery.hasNextPage) {
      noticeQuery.fetchNextPage();
    } else {
      console.log("no next page");
    }
  }

  if (!noticeQuery.data) {
    return <Loader />
  }
  
  return (
    <Home data={noticeQuery.data} onMore={onMore} />
  );
}

export default HomeScreen;