import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import ProfilePage from '../screens/profile';
// import CreateNewToken from '../screens/createNewToken';

const ProfileStack = createNativeStackNavigator();

function ProfileStackNavigate({initialRouteName}) {
  return (
    <ProfileStack.Navigator initialRouteName="ProfilePage">
      <ProfileStack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{headerShown: false}}
      />
      {/* <ProfileStack.Screen
        name="createNewToken"
        component={CreateNewToken}
        options={{headerShown: false}}
      /> */}
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigate;
