import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './auth/SignInScreen';
import WelcomeScreen from './auth/WelcomeScreen';
import FindPasswordScreen from './auth/FindPasswordScreen';
import useStore from '../store/store';
import MainTab from './MainTab';
import BannerDetailScreen from './banner/DetailScreen';
import PhotoScreen from './seminar/PhotoScreen';
import { subscribeAuth } from '../lib/auth';
import { getUser } from '../lib/user';

const Stack = createNativeStackNavigator();

function RootStack() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) {
        return;
      }
      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {user
        ?
          <>
            <Stack.Screen
              name='MainTab'
              component={MainTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name='BannerDetail'
              component={BannerDetailScreen}
            />
            <Stack.Screen
              name='Photo'
              component={PhotoScreen}
              options={{headerShown: false}}
            />
          </>
        :
          <>
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name='FindPassword'
              component={FindPasswordScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name='Welcome'
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
          </>
      }
    </Stack.Navigator>
  )
}

export default RootStack;