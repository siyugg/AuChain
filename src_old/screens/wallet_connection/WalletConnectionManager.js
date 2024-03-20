// // WalletConnectionManager.js
import React, {useEffect} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {useWallet} from './walletContext'; // Adjust the import path to where you saved WalletContext.js
import {useNavigation} from '@react-navigation/native';

export default WalletConnectionManager = () => {
  const {isConnected, address, connectWallet, disconnectWallet} = useWallet();
  const navigation = useNavigation();

  useEffect(() => {
    if (isConnected) {
      navigation.navigate('Home');
    }
  }, [isConnected, navigation]);

  const handleButtonPress = () => {
    if (isConnected) {
      console.log('wallet is connected');
      disconnectWallet();
    } else {
      console.log('Wallet is not connected');
      connectWallet();
    }
  };

  return (
    <View style={styles.container}>
      <Text>WalletConnectionManager Screen</Text>
      <Text>{isConnected ? address : 'Not Connected'}</Text>
      <Pressable onPress={handleButtonPress} style={styles.pressableMargin}>
        <Text>{isConnected ? 'Disconnect' : 'Connect'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableMargin: {
    marginTop: 16,
  },
});
