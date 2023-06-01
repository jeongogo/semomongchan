import React, {useEffect, useState} from 'react';
import { getDocsBySearch } from '../../lib/doc';
import SearchResult from '../../components/seminar/SearchResult';

function SearchScreen({route}) {
  const [data, setData] = useState([]);

  const handleSearch = (text) => {
    getDocsBySearch('seminar', 'keyword', text).then(setData);
  }

  useEffect(() => {
    if (route.params?.keyword) {
      handleSearch(route.params.keyword);
    }
  }, []);

  return (
    <SearchResult data={data} handleSearch={handleSearch} />
  );
}

export default SearchScreen;