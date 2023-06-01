import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text } from 'react-native';
import BorderedInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';

function FindPassword({handleResetPassword}) {
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    if (email === '') {
      return;
    }
    handleResetPassword(email);
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>비밀번호 찾기</Text>
        <BorderedInput
          placeholder='이메일'
          value={email}
          onChangeText={setEmail}
          hasMarginBottom
          onSubmitEditing={onSubmit}
        />
        <CustomButton
          title='인증 메일 보내기'
          onPress={onSubmit}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 700,
    color: '#222',
    textAlign: 'center',
  }
});

export default FindPassword;