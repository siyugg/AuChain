import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react';
import HomeStackNavigate from './HomeStackNavigator';
import ProfileStackNavigate from './ProfileNavigator';
import ScanPageStackNavigate from './ScanPageNavigator';

const HomeTab = ({navigation}) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeStackNavigate"
      activeColor="#e1bf92"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="ScanPageStackNavigate"
        component={ScanPageStackNavigate}
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
