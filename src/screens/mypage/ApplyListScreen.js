import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { useInfiniteQuery } from 'react-query';
import ApplyList from '../../components/mypage/ApplyList';
import Loader from '../../components/common/Loader';

function ApplyListScreen() {
  const applyQuery = useInfiniteQuery(
    ["apply"],
    async ({queryKey, pageParam}) => {
      return pageParam
        ?
          await firestore()
          .collection("apply")
          .orderBy("created", "desc")
          .startAfter(pageParam)
          .limit(10)
          .get()
          .then((querySnapshot) => querySnapshot)
        :
          await firestore()
          .collection("apply")
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
    if (applyQuery.hasNextPage) {
      applyQuery.fetchNextPage();
    } else {
      console.log("no next page");
    }
  }

  if (!applyQuery.data) {
    return <Loader />
  }
  
  return (
    <ApplyList data={applyQuery.data} onMore={onMore} />
  );
}

export default ApplyListScreen;