import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

function NoticeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='NoticeHome' component={HomeScreen} />
      <Stack.Screen name='NoticeDetail' component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default NoticeStack;