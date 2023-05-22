import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Search({home, handleSearch}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [keyword, setKeyword] = useState('');

  const onPrev = () => {
    navigation.goBack();
  }

  const onSearch = () => {
    if (keyword === '') {
      return;
    }
    if (home) {
      navigation.navigate('Search', {keyword});
      return;
    }
    handleSearch(keyword);
  }

  useEffect(() => {
    if (home) {
      setKeyword('');
    } else {
      setKeyword(route.params.keyword);
    }
  }, [isFocused]);
  
  return (
    <View style={styles.container}>
      {!home &&
        <Pressable style={styles.prev} onPress={onPrev}>
          <Icon name="navigate-before" size={28} color='#666' />
        </Pressable>
      }
      <TextInput style={styles.input} value={keyword} onChangeText={setKeyword} />
      <Pressable style={styles.search} onPress={onSearch}>
        <Icon name="search" size={24} color='#666' />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  prev: {
    
  },
  input: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    flexGrow: 1,
  },
  search: {
    position: 'absolute',
    top: 8,
    right: 15,
    zIndex: 2,
  }
});

export default Search;