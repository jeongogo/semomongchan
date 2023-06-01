import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import useStore from '../../store/store';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateUser } from '../../lib/user';
import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from 'react-native';
import BorderedInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';

function Profile() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

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
      let photoURL = user.photoURL;
  
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
        name,
        phone,
        photoURL,
      }
  
      await updateUser(user.id, {data});
      setUser({...user, ...data});

      navigation.navigate('MypageHome');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.photo}>
        <Pressable onPress={onSelectImage}>
          <Image
            style={styles.circle}
            source={response ? {uri: response?.assets[0]?.uri} : user.photoURL ? {uri: user.photoURL} : require('../../assets/user.png')}
          />
        </Pressable>
      </View>
      <View style={styles.info}>
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
      </View>
      {loading
          ?
            <ActivityIndicator size={32} color='#ff4250' style={styles.spinner} />
          :
            <View style={styles.btn}>
              <CustomButton title='저장' onPress={onSubmit} hasMarginBottom />
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  photo: {
    display: 'flex',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  info: {
    marginTop: 32,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 16,
  }
})

export default Profile