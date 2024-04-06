import React, {createContext, useContext, useState, useEffect} from 'react';
import '@walletconnect/react-native-compat';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
const projectId = process.env.WALLETCONNECT_PROJECT_ID;

const providerMetadata = {
  name: 'AuChain',
  description: 'AuChain',
  url: 'https://AuChain.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const WalletContext = createContext();
export const WalletProvider = ({children}) => {
  const {isConnected, address, open, close, provider} = useWalletConnectModal();
  const connectWallet = () => open();
  const disconnectWallet = () => {
    if (provider) {
      provider.disconnect();
    }
  };
  return (
    <WalletContext.Provider
      value={{isConnected, address, provider, connectWallet, disconnectWallet}}>
      {children}
      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        ]}
        explorerExcludedWalletIds={'ALL'}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </WalletContext.Provider>
  );
};
export const useWallet = () => useContext(WalletContext);
