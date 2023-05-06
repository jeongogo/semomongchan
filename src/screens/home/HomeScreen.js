import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { getDocs } from '../../lib/doc';
import Home from '../../componetns/home/Home';

function HomeScreen() {
  const isFocused = useIsFocused();
  const [seminarList, setSeminarList] = useState([]);

  useEffect(() => {
    getDocs('seminar').then(setSeminarList);
  }, [isFocused]);

  return (
    <Home seminarList={seminarList} />
  );
}



export default HomeScreen;