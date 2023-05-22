import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { useQuery, useInfiniteQuery } from 'react-query';
import Home from '../../components/home/Home';
import Loader from '../../components/common/Loader';

function HomeScreen() {
  const getSeminars = async () => {
    const snapshot = await firestore().collection('seminar').orderBy('created', 'desc').get();
    let data = [];
    snapshot.forEach(doc => {
      const item = {
        id: doc.id,
        ...doc.data(),
      };
      data.push(item);
    });
    return data;
  }

  const getReviews = async () => {
    const snapshot = await firestore().collection('review').orderBy('created', 'desc').get();
    let data = [];
    snapshot.forEach(doc => {
      const item = {
        id: doc.id,
        ...doc.data(),
      };
      data.push(item);
    });
    return data;
  }

  const seminarQuery = useQuery('newSeminars', getSeminars);
  const reviewQuery = useQuery('newReviews', getReviews);

  if (!seminarQuery.data || !reviewQuery.data) {
    return <Loader />
  }

  return (
    <Home seminarData={seminarQuery.data} reviewData={reviewQuery.data} />
  );
}



export default HomeScreen;