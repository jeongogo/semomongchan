import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Detail from '../../componetns/seminar/Detail';

function DetailScreen({route}) {
  const [seminar, setSeminar] = useState('');

  const getChallenge = async () => {
    try {
      const res = await firestore().collection('seminar').doc(route.params.id).get();
      setSeminar(res.data());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getChallenge();
  }, []);

  return (
    <Detail seminar={seminar} />
  )
}

export default DetailScreen;