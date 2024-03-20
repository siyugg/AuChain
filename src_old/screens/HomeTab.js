import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ScanPage from './scan';
import ProfilePage from './profile';
import Home from './home';
import React from 'react';
import {Text} from 'react-native';
import HomeStackNavigate from '../navigators/HomeStackNavigator';
import ProfileStackNavigate from '../navigators/ProfileNavigator';

const HomeTab = ({navigation}) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeStackNavigate"
      activeColor="#e1bf92"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Scan"
        component={ScanPage}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="Scan" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeStackNavigate"
        component={HomeStackNavigate}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigate}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
