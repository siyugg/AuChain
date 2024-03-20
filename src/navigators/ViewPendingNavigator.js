import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from '../screens/home';
import AllPending from '../screens/AllPending';

const PendingStack = createNativeStackNavigator();

function ViewPending(initialRouteName) {
  return (
    <PendingStack.Navigator initialRouteName="AllPending">
      <PendingStack.Screen
        name="AllPending"
        component={AllPending}
        options={{headerShown: false}}
      />
      {/* <PendingStack.Screen
        name="PendingDetails"
        component={PendingDetails}
        options={{headerShown: false}}
      /> */}
    </PendingStack.Navigator>
  );
}

export default ViewPending;
