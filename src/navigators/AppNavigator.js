import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../screens/AppIntro';
import Home from './HomeTab';
import HomeTab from './HomeTab';
import WalletConnectionManager from '../screens/wallet_connection/WalletConnectionManager';

const Stack = createNativeStackNavigator();

function AppNavigator(initialRouteName) {
  return (
    <Stack.Navigator initialRouteName={IntroScreen}>
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConnectWallet"
        component={WalletConnectionManager}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AppNavigator;
