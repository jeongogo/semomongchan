import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

function MypageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MypageHome'
        component={HomeScreen}
        options={{
          title: '프로필',
        }}
      />
      <Stack.Screen
        name='MyProfile'
        component={ProfileScreen}
        options={{
          title: '프로필 수정',
        }}
      />
    </Stack.Navigator>
  );
}

export default MypageStack;