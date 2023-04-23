import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import SeminarDetailScreen from '../seminar/DetailScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='SeminarDetail' component={SeminarDetailScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;