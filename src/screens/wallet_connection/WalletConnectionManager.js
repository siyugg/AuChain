import React, {useEffect} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {useWallet} from './walletContext';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WalletConnectionManager = () => {
  const {isConnected, address, connectWallet, disconnectWallet, provider} =
    useWallet();
  const navigation = useNavigation();

  useEffect(() => {
    if (isConnected) {
      navigation.navigate('Home');
    }
  }, [isConnected, navigation]);

  const handleConnection = async () => {
    if (isConnected) {
      console.log('wallet is connected');
      disconnectWallet();
    } else {
      console.log('Wallet is not connected');
      await connectWallet().then(res => {
        console.log('connect wallet result: ', res);
      });
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="wallet" size={30} />
      <Text style={styles.connection}>
        {isConnected ? address : 'Connect to Your Wallet'}
      </Text>
      <Pressable onPress={handleConnection} style={styles.pressableMargin}>
        <Text style={styles.connectionText}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'eee',
    alignItems: 'center',
    justifyContent: 'center',
  },

  connection: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },

  pressableMargin: {
    backgroundColor: '#0ac2ff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 50,
    width: '50%',
  },
  connectionText: {
    fontSize: 16,
    fontWeight: '500',
    width: '90%',
    textAlign: 'center',
    color: 'white',
  },
});

export default WalletConnectionManager;
