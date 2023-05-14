import React from 'react';
import { useQuery } from 'react-query';
import { getDocs } from '../../lib/doc';
import Home from '../../componetns/home/Home';
import Loader from '../../componetns/common/Loader';

function HomeScreen() {
  const getSeminarList = () => {
    return getDocs('seminar');
  }

  const {data} = useQuery('seminar', getSeminarList);

  if (!data) {
    return <Loader />
  }

  return (
    <Home seminarList={data} />
  );
}



export default HomeScreen;