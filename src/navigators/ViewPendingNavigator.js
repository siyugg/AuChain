import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from '../screens/home';
import AllPending from '../screens/viewpending/allPending';
import PendingDetailsOut from '../screens/viewpending/pendingDetailsOut';
import PendingDetailsIn from '../screens/viewpending/pendingDetailsIn';
const PendingStack = createNativeStackNavigator();

function ViewPending(initialRouteName) {
  return (
    <PendingStack.Navigator initialRouteName="AllPending">
      <PendingStack.Screen
        name="AllPending"
        component={AllPending}
        options={{headerShown: false}}
      />
      <PendingStack.Screen
        name="PendingDetailsOut"
        component={PendingDetailsOut}
        options={{headerShown: false}}
      />
      <PendingStack.Screen
        name="PendingDetailsIn"
        component={PendingDetailsIn}
        options={{headerShown: false}}
      />
    </PendingStack.Navigator>
  );
}
export default ViewPending;
