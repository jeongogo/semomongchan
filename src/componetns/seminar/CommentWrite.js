import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { StyleSheet, TextInput, View, Keyboard, Pressable, Text, Image } from 'react-native';
import useStore from '../../store/store';

function Comment({handleSubmitComment}) {
  const route = useRoute();
  const [content, setContent] = useState('');
  const [response, setResponse] = useState(null);
  const user = useStore((state) => state.user);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      (res) => {
        if (res.didCancel) {
          return;
        }
        setResponse(res);
      },
    );
  };

  const onSubmit = async () => {
    try {
      let photoURL = '';
      if (response) {
        const asset = response.assets[0];
        const extension = asset.fileName.split('.').pop();
        const reference = storage().ref(`/profile/${user.id}.${extension}`);
  
        if (Platform.OS === 'android') {
          await reference.putString(asset.base64, 'base64', {
            contentType: asset.type,
          });
        } else {
          await reference.putFile(asset.uri);
        }
  
        photoURL = response ? await reference.getDownloadURL() : null;
      }

      const data = {
        seminarId: route.params.id,
        userId: user.id,
        writer: user.name,
        content,
        recomments: [],
        created: new Date(),
        likes: 0,
        photoURL,
      }

      handleSubmitComment(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onSelectImage}>
        <Text>이미지 등록</Text>
      </Pressable>
      {response &&
        <Image
          style={styles.image}
          source={{uri: response?.assets[0]?.uri}}
        />
      }
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Pressable onPress={onSubmit} style={styles.btn}>
        <Text style={styles.btnText}>전송</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  input: {
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  btn: {
    marginTop: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FF1744',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  }
})

export default Comment;