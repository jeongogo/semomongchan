import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { getDocs } from '../../lib/doc';
import Home from '../../componetns/notice/Home';

function HomeScreen() {
  const isFocused = useIsFocused();
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    getDocs('notice').then(setNoticeList);
  }, [isFocused]);

  return (
    <Home noticeList={noticeList} />
  );
}

export default HomeScreen;