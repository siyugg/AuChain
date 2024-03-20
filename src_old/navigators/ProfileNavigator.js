import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import ScanPage from '../screens/scan';
import Home from '../screens/home';
import ProfilePage from '../screens/profile';
import CreateNewToken from '../screens/createNewToken';
import TestCreateToken from '../screens/createNewToken';

const ProfileStack = createNativeStackNavigator();

function ProfileStackNavigate({initialRouteName}) {
  return (
    <ProfileStack.Navigator initialRouteName="ProfilePage">
      <ProfileStack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="createNewToken"
        component={CreateNewToken}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigate;
