import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { useQuery, useInfiniteQuery } from 'react-query';
import Home from '../../components/home/Home';
import Loader from '../../components/common/Loader';

function HomeScreen() {
  const getSeminars = async () => {
    const snapshot = await firestore().collection('seminar').orderBy('created', 'desc').limit(10).get();
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

  const getNoticeMain = async () => {
    const snapshot = await firestore().collection('notice').where('isShowMain', '==', true).orderBy('created', 'desc').get();
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

  const getBannerMain = async () => {
    const snapshot = await firestore().collection('banner').where('isShowMain', '==', true).orderBy('created', 'desc').get();
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
  const noticeQuery = useQuery('newNotice', getNoticeMain);
  const reviewQuery = useQuery('newReviews', getReviews);
  const bannerQuery = useQuery('newBanners', getBannerMain);

  if (!seminarQuery.data || !reviewQuery.data || !noticeQuery.data || !bannerQuery.data) {
    return <Loader />
  }

  return (
    <Home seminarData={seminarQuery.data} noticeData={noticeQuery.data} reviewData={reviewQuery.data} bannerData={bannerQuery.data} />
  );
}



export default HomeScreen;