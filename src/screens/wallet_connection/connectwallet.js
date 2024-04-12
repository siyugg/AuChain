import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {WalletProvider, useWallet} from './walletContext';
import WalletConnectionManager from './WalletConnectionManager';
import {useNavigation} from '@react-navigation/native';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;
const providerMetadata = {
  name: 'AuChain',
  description: 'AuChain',
};

const ConnectWallet = () => {
  const navigation = useNavigation();
  const myWallet = useContext(WalletContext);

  useEffect(() => {
    if (isConnected) {
      navigation.navigate('Home');
    }
  }, [isConnected, navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Connect to Metamask</Text>

      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        ]}
        explorerExcludedWalletIds={'ALL'}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pressableMargin: {
    marginTop: 16,
  },
});

export default ConnectWallet;
