import React, {createContext, useContext, useState, useEffect} from 'react';
import '@walletconnect/react-native-compat';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
const projectId = '91068e323d87f3f46c7c134efcf234f6';

const providerMetadata = {
  name: 'Authentic8',
  description: 'Authentic8',
  url: 'https://authentic8.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const WalletContext = createContext();

export const WalletProvider = ({children}) => {
  const {isConnected, address, open, close, provider} = useWalletConnectModal();

  // Provide an interface to control the modal outside the hook
  const connectWallet = () => open();
  const disconnectWallet = () => {
    if (provider) {
      provider.disconnect();
    }
  };

  // Expose the wallet connection state and methods
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
