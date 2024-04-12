import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import ProfilePage from '../screens/profile/profile';
import CreateNewToken from '../screens/profile/createNewToken';

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
        name="CreateNewToken"
        component={CreateNewToken}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigate;
