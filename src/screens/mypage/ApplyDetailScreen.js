import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import ApplyDetail from '../../components/mypage/ApplyDetail';

function ApplyDetailScreen({route}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apply, setApply] = useState('');

  const getApply = async () => {
    setIsLoading(true);
    try {
      const res = await firestore().collection('apply').doc(route.params.id).get();
      setApply(res.data());
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getApply();
  }, []);

  return (
    <ApplyDetail isLoading={isLoading} apply={apply} />
  )
}

export default ApplyDetailScreen;