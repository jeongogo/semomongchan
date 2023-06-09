import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

function NoticeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='NoticeHome'
        component={HomeScreen}
        options={{
          title: '공지사항',
        }}
      />
      <Stack.Screen
        name='NoticeDetail'
        component={DetailScreen}
        options={{
          title: '공지사항 상세',
        }}
      />
    </Stack.Navigator>
  );
}

export default NoticeStack;