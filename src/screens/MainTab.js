import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home/HomeStack';
import SeminarStack from "./seminar/SeminarStack";
import NoticeStack from './notice/NoticeStack';
import WishStack from './wish/WishStack';
import MyPageStack from './mypage/MyPageStack';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
      }}
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name='SeminarStack'
        component={SeminarStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="search" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="NoticeStack"
        component={NoticeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="article" size={28} color={color} />
        }}
      />
      <Tab.Screen
        name="WishStack"
        component={WishStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="favorite-outline" size={28} color={color} />
        }}
      />
      <Tab.Screen
        name='MyPageStack'
        component={MyPageStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTab;