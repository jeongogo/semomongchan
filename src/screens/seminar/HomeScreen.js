import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { useInfiniteQuery } from 'react-query';
import Home from '../../components/seminar/Home';
import Loader from '../../components/common/Loader';

function HomeScreen() {
  const seminarQuery = useInfiniteQuery(
    ["seminar"],
    async ({queryKey, pageParam}) => {
      return pageParam
        ?
          await firestore()
          .collection("seminar")
          .orderBy("created", "desc")
          .startAfter(pageParam)
          .limit(10)
          .get()
          .then((querySnapshot) => querySnapshot)
        :
          await firestore()
          .collection("seminar")
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
    if (seminarQuery.hasNextPage) {
      seminarQuery.fetchNextPage();
    } else {
      console.log("no next page");
    }
  }

  if (!seminarQuery.data) {
    return <Loader />
  }
  
  return (
    <Home data={seminarQuery.data} onMore={onMore} />
  );
}

export default HomeScreen;