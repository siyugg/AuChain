import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import ScanPage from '../screens/scan';
import QrInfo from '../screens/qrInfo';

const ScanPageStack = createNativeStackNavigator();

function ScanPageStackNavigate({initialRouteName}) {
  return (
    <ScanPageStack.Navigator initialRouteName="ScanPage">
      <ScanPageStack.Screen
        name="ScanPage"
        component={ScanPage}
        options={{headerShown: false}}
      />
      <ScanPageStack.Screen
        name="QrInfo"
        component={QrInfo}
        options={{headerShown: false}}
      />
    </ScanPageStack.Navigator>
  );
}

export default ScanPageStackNavigate;
