import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home/HomeStack';
import NoticeStack from './notice/NoticeStack';
import MyPageStack from './mypage/MyPageStack';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#6200ee',
      }}
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="NoticeStack"
        component={NoticeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="article" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name='MyPageStack'
        component={MyPageStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTab;