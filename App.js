import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppNavigator from './src/navigators/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import HomeTab from './src/screens/HomeTab';
import {WalletProvider} from './src/screens/wallet_connection/walletContext';

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </WalletProvider>
  );
}
