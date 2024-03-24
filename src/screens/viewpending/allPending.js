import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import useContract from '../../components/contractSetup';
import {useWallet} from '../wallet_connection/walletContext';
import {ethers} from 'ethers';

const AllPending = () => {
  const [tab, setTab] = useState('In');
  const {contract} = useContract;
  //   const {provider} = useWallet();
  const [pendingIn, setPendingIn] = useState([]);
  const [pendingOut, setPendingOut] = useState([]);

  // cant get signer here (manually enter private key, see contractSetup)
  const provider = new ethers.providers.Web3Provider(provider);
  let signer;
  let signerAddress;

  if (provider && provider.getSigner) {
    // Check if provider and getSigner method exist
    signer = provider.getSigner(); // Obtain signer from provider
    signer.getAddress().then(address => {
      signerAddress = ethers.utils.getAddress(address);
      console.log('signer address: ', signerAddress);
    });
  }

  const handleTabChange = selectedTab => {
    setTab(selectedTab);
  };

  useEffect(() => {
    const getPendingIn = async () => {
      const pendingInResult = await contract
        .connect(signer)
        .getPendingTransfersIn({});
      console.log(pendingInResult);
      setPendingIn(pendingInResult);
    };

    const getPendingOut = async () => {
      const pendingOutResult = await contract.getPendingTransfersOut({
        from: signer.getAddress(),
      });
      console.log(pendingOutResult);
      setPendingOut(pendingOutResult);
    };

    if (tab === 'In') {
      getPendingIn();
    } else if (tab === 'Out') {
      getPendingOut();
    }
  }, [tab, contract]);

  const renderInTabContent = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabContentText}>Pending transfers In</Text>
      {pendingIn.map((transfer, index) => (
        <View key={index} style={styles.transferContainer}>
          <Text
            style={styles.transferText}>{`Token ID: ${transfer.tokenId}`}</Text>
          <Text style={styles.transferText}>{`From: ${transfer.from}`}</Text>
        </View>
      ))}
    </View>
  );

  const renderOutTabContent = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabContentText}>Pending transfers Out</Text>
      {pendingOut.map((transfer, index) => (
        <View key={index} style={styles.transferContainer}>
          <Text
            style={styles.transferText}>{`Token ID: ${transfer.tokenId}`}</Text>
          <Text style={styles.transferText}>{`To: ${transfer.to}`}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Transfers</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === 'In' && styles.activeTab]}
          onPress={() => handleTabChange('In')}>
          <Text style={styles.tabText}>In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Out' && styles.activeTab]}
          onPress={() => handleTabChange('Out')}>
          <Text style={styles.tabText}>Out</Text>
        </TouchableOpacity>
      </View>
      {/* Conditionally render content based on the selected tab */}
      <View style={styles.pendingTransfers}>
        {tab === 'In' ? renderInTabContent() : renderOutTabContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  tabText: {
    fontSize: 18,
    color: '#333',
  },
  pendingTransfers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
  },
  tabContentText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AllPending;
