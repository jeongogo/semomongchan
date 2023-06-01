import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import useStore from '../../store/store';
import { launchImageLibrary } from 'react-native-image-picker';
import { RadioButton } from 'react-native-paper';
import { KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import BorderedInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';

function ApplyWrite() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isIssued, setIsIssued] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [photoURL, setPhotoURL] = useState([]);
  const user = useStore((state) => state.user);

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      async (res) => {
        if (res.didCancel) {
          return;
        }

        const asset = res.assets[0];
        const extension = asset.fileName.split('.').pop();
        const reference = storage().ref(`/apply/${user.id + '_' + new Date().getTime()}.${extension}`);

        if (Platform.OS === 'android') {
          await reference.putString(asset.base64, 'base64', {
            contentType: asset.type,
          });
        } else {
          await reference.putFile(asset.uri);
        }
        const url =  await reference.getDownloadURL();
        setPhotoURL(prev => [...prev, { id: reference.path, url }]);
      },
    );
  };

  const onSubmit = async () => {
    setLoading(true);

    if (title == '' || name == '' || host == '' || email == '' || phone == '' || isIssued == '' || price == '' || time == '') {
      return;
    }

    if (photoURL.length < 5) {
      console.log('사진 5개 올려주세요');
    }

    try {
      const data = {
        title,
        name,
        host,
        email,
        phone,
        photoURL,
        isIssued,
        price,
        time,
        creator: user.id,
        created: new Date(),
      }
      const collection = firestore().collection('apply');
      await collection.add(data);

      navigation.navigate('MypageHome');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.wrap}>
            <Text style={styles.title}>세미나 이름</Text>
            <BorderedInput
              value={title}
              onChangeText={setTitle}
              eturnKeyType='next'
            />
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>강의자</Text>
            <BorderedInput
              value={name}
              onChangeText={setName}
              eturnKeyType='next'
            />
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>주최</Text>
            <BorderedInput
              value={host}
              onChangeText={setHost}
              eturnKeyType='next'
            />
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>담당자 이메일</Text>
            <BorderedInput
              value={email}
              onChangeText={setEmail}
              eturnKeyType='next'
            />
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>담당자 휴대폰 번호</Text>
            <BorderedInput
              value={phone}
              onChangeText={setPhone}
              eturnKeyType='next'
              keyboardType="numeric"
            />
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>세미나 포스터</Text>
            <Text style={styles.title}>(각각 다른 날짜로 진행된 세미나 5장)</Text>
            <View style={styles.photo}>
              <Pressable onPress={onSelectImage}>
                <Image
                  style={styles.thumb}
                  source={require('../../assets/thumb.png')}
                />
              </Pressable>
              {photoURL.length > 0 &&
                photoURL.map((item) => (
                  <Image
                    key={item.id}
                    style={styles.thumb}
                    source={{uri: item.url}}
                  />
                ))
              }
            </View>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>자격증 및 수료증 발급 여부</Text>
            <RadioButton.Group onValueChange={value => setIsIssued(value)} value={isIssued}>
              <RadioButton.Item label="예" value="yes" color='#ff4e50' style={styles.radio} />
              <RadioButton.Item label="아니오" value="no" color='#ff4e50' style={styles.radio} />
            </RadioButton.Group>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>세미나 가격</Text>
            <BorderedInput
              value={price}
              onChangeText={setPrice}
              eturnKeyType='next'
            />
          </View>
          <View style={styles.wrap}>
            <Text style={styles.title}>세미나 강의 진행 시간</Text>
            <BorderedInput
              value={time}
              onChangeText={setTime}
              eturnKeyType='next'
            />
          </View>
          <View style={[styles.wrap, styles.descriptWrap]}>
            <Text style={styles.descript}>* 관리자가 심사 후 이메일 or 문자로 연락드립니다.</Text>
            <Text style={styles.descript}>* 심사 소요일 3~5일</Text>
          </View>
          {loading
            ?
              <ActivityIndicator size={32} color='#ff4250' style={styles.spinner} />
            :
              <View style={styles.btn}>
                <CustomButton title='작성하기' onPress={onSubmit} hasMarginBottom />
              </View>
          }
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  wrap: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 500,
    color: '#222',
  },
  photo: {
    marginTop: 10,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumb: {
    marginRight: 5,
    marginBottom: 5,
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radio: {
    marginTop: 10,
    fontSize: 15,
    color: '#222',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  descriptWrap: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
  },
  descript: {
    marginTop: 3,
    fontSize: 15,
    color: '#666',
  },
  btn: {

  }
});

export default ApplyWrite