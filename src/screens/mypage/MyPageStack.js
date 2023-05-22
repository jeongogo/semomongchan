import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import ApplyWriteScreen from './ApplyWriteScreen';
import ApplyListScreen from './ApplyListScreen';
import ApplyDetailScreen from './ApplyDetailScreen';

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
      <Stack.Screen
        name='ApplyWrite'
        component={ApplyWriteScreen}
        options={{
          title: '세미나 등록 신청',
        }}
      />
      <Stack.Screen
        name='ApplyList'
        component={ApplyListScreen}
        options={{
          title: '세미나 등록 신청 내역',
        }}
      />
      <Stack.Screen
        name='ApplyDetail'
        component={ApplyDetailScreen}
        options={{
          title: '세미나 등록 신청 상세',
        }}
      />
    </Stack.Navigator>
  );
}

export default MypageStack;