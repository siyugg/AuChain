import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from '../screens/home';
import ViewProduct from './ViewProductNavigator';
import ViewPending from './ViewPendingNavigator';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigate({navigation}) {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ViewProduct"
        component={ViewProduct}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ViewPending"
        component={ViewPending}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigate;
