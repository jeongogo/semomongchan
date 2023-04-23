import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

function MypageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyProfileHome' component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default MypageStack;