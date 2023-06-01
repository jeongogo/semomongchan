import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import SearchScreen from '../seminar/SearchScreen';
import SeminarDetailScreen from '../seminar/DetailScreen';
import SeminarReviewWriteScreen from '../seminar/ReviewWriteScreen';

const Stack = createNativeStackNavigator();

function SeminarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SeminarHome'
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='SearchResult'
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='SeminarDetail'
        component={SeminarDetailScreen}
        options={({route}) => ({
          title: '',
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('SeminarReviewWrite', {id: route.params.id})}>
              <Icon name="create" size={24} color={'#000'} />
            </Pressable>
          )
        })}
      />
      <Stack.Screen
        name='SeminarReviewWrite'
        component={SeminarReviewWriteScreen}
        options={{title: '리뷰 작성하기'}}
      />
    </Stack.Navigator>
  );
}

export default SeminarStack;