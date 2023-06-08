import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Detail from '../../components/banner/Detail';

function DetailScreen({route}) {
  const [banner, setBanner] = useState('');

  const getBanner = async () => {
    try {
      const res = await firestore().collection('banner').doc(route.params.id).get();
      setBanner(res.data());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <Detail banner={banner} />
  )
}

export default DetailScreen