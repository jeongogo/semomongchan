import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Search({handleSearch}) {
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
    if (route.params?.keyword) {
      handleSearch(keyword);
    } else {
      navigation.navigate('SearchResult', {keyword});
    }
  }

  useEffect(() => {
    setKeyword(route.params?.keyword);
  }, [isFocused]);
  
  return (
    <View style={styles.container}>
      {route.params?.keyword &&
        <Pressable style={styles.prev} onPress={onPrev}>
          <Icon name="navigate-before" size={28} color='#666' />
        </Pressable>
      }
      <TextInput style={styles.input} value={keyword} onChangeText={setKeyword} onSubmitEditing={onSearch} />
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
    paddingHorizontal: 15,
  },
  prev: {
    
  },
  input: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fafafa',
    borderRadius: 3,
    flexGrow: 1,
  },
  search: {
    position: 'absolute',
    top: 10,
    right: 30,
    zIndex: 2,
  }
});

export default Search;