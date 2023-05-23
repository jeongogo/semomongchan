import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import useStore from '../../store/store';
import { ActivityIndicator, View,  StyleSheet, Platform, Pressable, Image} from 'react-native';
import { createUser } from '../../lib/user';
import { signOut } from '../../lib/auth';
import BorderedInput from '../common/BorderedInput';
import CustomButton from '../common/CustomButton';

function SetupProfile() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [response, setResponse] = useState(null);
  const email = useStore((state) => state.email);
  const setUser = useStore((state) => state.setUser);

  const {params} = useRoute();
  const {uid} = params || {};

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
    setLoading(true);
    try {
      let photoURL = null;
  
      if (response) {
        const asset = response.assets[0];
        const extension = asset.fileName.split('.').pop();
        const reference = storage().ref(`/profile/${uid}.${extension}`);
  
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
        id: uid,
        name,
        phone,
        email,
        photoURL,
        wishList: [],
        isCommentWrite: false,
      };
      createUser(data);
      setUser(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={styles.circle}
          source={response ? {uri: response?.assets[0]?.uri} : require('../../assets/user.png')}
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder='이름'
          value={name}
          onChangeText={setName}
          onSubmitEditing={onSubmit}
          returnKeyType='next'
          hasMarginBottom
        />
        <BorderedInput
          placeholder='핸드폰 번호'
          value={phone}
          onChangeText={setPhone}
          onSubmitEditing={onSubmit}
          returnKeyType='next'
        />
        {loading
          ?
            <ActivityIndicator size={32} color='#ff4250' style={styles.spinner} />
          :
            <View style={styles.buttons}>
              <CustomButton title='다음' onPress={onSubmit} hasMarginBottom />
              <CustomButton  title='취소' onPress={onCancel} theme='secondary' />
            </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;