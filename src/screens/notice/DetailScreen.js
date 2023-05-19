import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Detail from '../../components/notice/Detail';

function DetailScreen({route}) {
  const [notice, setNotice] = useState('');

  const getChallenge = async () => {
    try {
      const res = await firestore().collection('notice').doc(route.params.id).get();
      setNotice(res.data());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getChallenge();
  }, []);

  return (
    <Detail notice={notice} />
  )
}

export default DetailScreen;