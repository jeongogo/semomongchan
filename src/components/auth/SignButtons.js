import React from 'react';
import { ActivityIndicator, StyleSheet, View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../common/CustomButton';

function SignButtons({isSignUp, onSubmit, loading}) {
  const navigation = useNavigation();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('SignIn', {isSignUp: true});
    }
  }

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color='#ff4250' />
      </View>
    )
  }

  return (
    <View style={styles.buttons}>
      <CustomButton
        title={primaryTitle}
        onPress={onSubmit}
      />
      <CustomButton
        title={secondaryTitle}
        theme='secondary'
        onPress={onSecondaryButtonPress}
      />
      <Pressable style={styles.find} onPress={() => navigation.navigate('FindPassword')}>
        <Text style={styles.findText}>비밀번호 찾기</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    marginTop: 24,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 24,
  },
  find: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'flex-end',
  },
  findText: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  }
});

export default SignButtons;