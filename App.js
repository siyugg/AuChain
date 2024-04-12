import React from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
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
