import React, {useEffect, useState} from 'react';
import { getDocsBySearch } from '../../lib/doc';
import Result from '../../components/search/Result';

function SearchScreen({route}) {
  const [seminarList, setSeminarList] = useState([]);

  const handleSearch = (text) => {
    getDocsBySearch('seminar', 'keyword', text).then(setSeminarList);
  }

  useEffect(() => {
    if (route.params?.keyword) {
      handleSearch(route.params.keyword);
    }
  }, []);

  return (
    <Result seminarList={seminarList} handleSearch={handleSearch} />
  );
}

export default SearchScreen;