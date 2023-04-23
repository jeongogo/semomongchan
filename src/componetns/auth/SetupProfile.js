import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View,  StyleSheet} from 'react-native';
import useStore from '../../store/store';
import { createUser } from '../../lib/users';
import { signOut } from '../../lib/auth';
import BorderedInput from '../common/BorderedInput';
import CustomButton from '../common/CustomButton';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const setUser = useStore((state) => state.setUser);

  const {params} = useRoute();
  const {uid} = params || {};

  const onSubmit = () => {
    const user = {
      id: uid,
      displayName,
      photoURL: null,
    };
    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <View style={styles.circle} />
      <View style={styles.form}>
        <BorderedInput
          placeholder='name'
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType='next'
        />
        <View style={styles.buttons}>
          <CustomButton title='next' onPress={onSubmit} hasMarginBottom />
          <CustomButton  title='cancel' onPress={onCancel} />
        </View>
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
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;