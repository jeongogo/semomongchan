import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

function WishStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='WishHome'
        component={HomeScreen}
        options={{
          title: '위시리스트',
        }}
      />
    </Stack.Navigator>
  );
}

export default WishStack;