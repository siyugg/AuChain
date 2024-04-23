import React, {createContext, useContext, useState, useEffect} from 'react';
import '@walletconnect/react-native-compat';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import {ethers} from 'ethers';
import {contractAddress, contractABI} from '../../data/contractInfo';

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
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const connectWallet = () => open();
  const ganacheUrl = process.env.REACT_APP_GANACHE_URL;
  const projectId = process.env.WALLETCONNECT_PROJECT_ID;

  useEffect(() => {
    const initializeContractAndSigner = async () => {
      if (isConnected && address) {
        const ganacheProvider = new ethers.providers.JsonRpcProvider(
          ganacheUrl,
        );
        // setProvider(newProvider);
        const importedAccounts = {};
        const mnemonic = process.env.REACT_APP_GANACHE_MNEMONIC;
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

        for (let i = 0; i < 10; i++) {
          const account = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
          importedAccounts[account.address] = account;
        }

        for (let account in importedAccounts) {
          const accountLower = account.toLowerCase();
          if (accountLower === address.toLowerCase()) {
            const object = importedAccounts[account];
            const privateKey = object.privateKey;
            const newSigner = new ethers.Wallet(privateKey, ganacheProvider);
            setSigner(newSigner);
            console.log(newSigner);

            const newContract = new ethers.Contract(
              contractAddress,
              contractABI,
              newSigner,
            );
            setContract(newContract);
            break;
          }
        }
      }
    };
    initializeContractAndSigner();
  }, [isConnected, address]);

  const disconnectWallet = () => {
    if (provider) {
      provider.disconnect();
    }
  };
  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        provider,
        connectWallet,
        disconnectWallet,
        signer,
        contract,
      }}>
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
