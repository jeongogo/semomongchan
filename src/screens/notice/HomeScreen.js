import React from 'react';
import { useQuery } from 'react-query';
import { getDocs } from '../../lib/doc';
import Home from '../../componetns/notice/Home';
import Loader from '../../componetns/common/Loader';

function HomeScreen() {
  const getNoticeList = () => {
    return getDocs('notice');
  }

  const {data} = useQuery('notice', getNoticeList);

  if (!data) {
    return <Loader />
  }
  
  return (
    <Home noticeList={data} />
  );
}

export default HomeScreen;