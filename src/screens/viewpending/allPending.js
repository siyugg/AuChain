import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import useContract from '../../components/contractSetup';
import fetchIPFSData from '../../components/retrieve-ipfs-data';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AllPending = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState('In');
  const {contract, signer} = useContract;
  const [productDataIn, setProductDataIn] = useState([]); //ipfsDataIn
  const [productDataOut, setProductDataOut] = useState([]); //ipfsDataOut

  const handleTabChange = selectedTab => {
    setTab(selectedTab);
  };

  const getIpfs = async tokenId => {
    const cid = await contract.getCID(tokenId);
    const ipfsData = await fetchIPFSData(cid);
    return ipfsData;
  };

  const getProductInfo = async tokenId => {
    console.log('get product Info');
    const productData = await getIpfs(tokenId);
    return productData;
  };

  const getToAddress = async tokenId => {
    const tokenPendingResult = await contract.transferRequests(tokenId);
    const toAddress = tokenPendingResult.to;
    console.log('to address:', toAddress);
    return toAddress;
  };

  const getFromAddress = async tokenId => {
    const tokenPendingResult = await contract.transferRequests(tokenId);
    const fromAddress = tokenPendingResult.from;
    console.log('from address:', fromAddress);
    return fromAddress;
  };

  const mergeDataOut = async tokenId => {
    console.log('mergeDataOut');
    const ipfsData = await getProductInfo(tokenId);
    const toAddress = await getToAddress(tokenId);
    console.log('gotten mergedata');
    return {tokenId, ipfsData, toAddress};
  };

  const mergeDataIn = async tokenId => {
    console.log('mergeDataIn');
    const ipfsData = await getProductInfo(tokenId);
    const fromAddress = await getFromAddress(tokenId);
    console.log('gotten mergedata');
    return {tokenId, ipfsData, fromAddress};
  };

  useEffect(() => {
    const getPendingIn = async () => {
      const pendingInResult = await contract
        .connect(signer)
        .getPendingTransfersIn({});
      const pendingInTokens = pendingInResult.toString();
      setPendingOut(pendingInTokens);
      const newData = await Promise.all(
        pendingInResult.map(tokenId => mergeDataIn(tokenId)),
      );
      setProductDataIn(newData);
    };
    const getPendingOut = async () => {
      const pendingOutResult = await contract
        .connect(signer)
        .getPendingTransfersOut({});
      const pendingOutTokens = pendingOutResult.toString();
      setPendingOut(pendingOutTokens);
      const newData = await Promise.all(
        pendingOutResult.map(tokenId => mergeDataOut(tokenId)),
      );
      setProductDataOut(newData);
    };
    if (tab === 'In') {
      getPendingIn();
    } else if (tab === 'Out') {
      getPendingOut();
    }
  }, [tab, contract]);

  const renderInTabContent = () => (
    <View style={styles.tabContent}>
      {productDataIn.length === 0 ? (
        <Text style={styles.tabContentText}>No Incoming Pending Transfers</Text>
      ) : (
        <FlatList
          data={productDataIn}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('PendingDetailsIn', {product: item})
              }>
              <View style={styles.itemContainer}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${item.ipfsData.base64String}`,
                  }}
                  style={styles.image}
                />
                <View style={styles.itemTextContainer}>
                  <Text
                    style={styles.itemText}>{`Token ID: ${item.tokenId}`}</Text>
                  <Text
                    style={
                      styles.itemText
                    }>{`Product Id: ${item.ipfsData.productId}`}</Text>

                  <Text
                    style={
                      styles.itemText
                    }>{`Product Name: ${item.ipfsData.productName}`}</Text>
                </View>
              </View>
              <View style={styles.addressContainer}>
                <Text
                  style={styles.toAddress}>{`From: ${item.fromAddress}`}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.tokenId.toString()}
        />
      )}
    </View>
  );
  const renderOutTabContent = () => (
    <View style={styles.tabContent}>
      {productDataOut.length === 0 ? (
        <Text style={styles.tabContentText}>No Outgoing Pending Transfers</Text>
      ) : (
        <FlatList
          data={productDataOut}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('PendingDetailsOut', {product: item})
              }>
              <View style={styles.itemContainer}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${item.ipfsData.base64String}`,
                  }}
                  style={styles.image}
                />
                <View style={styles.itemTextContainer}>
                  <Text
                    style={styles.itemText}>{`Token ID: ${item.tokenId}`}</Text>
                  <Text
                    style={
                      styles.itemText
                    }>{`Product Id: ${item.ipfsData.productId}`}</Text>

                  <Text
                    style={
                      styles.itemText
                    }>{`Product Name: ${item.ipfsData.productName}`}</Text>
                </View>
              </View>
              <View style={styles.addressContainer}>
                <Text style={styles.toAddress}>{`To: ${item.toAddress}`}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.tokenId.toString()}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pending Transfers</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === 'In' && styles.activeTab]}
          onPress={() => handleTabChange('In')}>
          <Text style={styles.tabText}>Incoming</Text>
        </TouchableOpacity>
        <View style={styles.centerLine}></View>
        <TouchableOpacity
          style={[styles.tab, tab === 'Out' && styles.activeTab]}
          onPress={() => handleTabChange('Out')}>
          <Text style={styles.tabText}>Outgoing</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 88,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#F9F9F9',
  },
  tab: {
    paddingVertical: 10,
    width: '45%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 142, 43, 0.4)',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  itemTextContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
  },
  addressContainer: {
    backgroundColor: 'rgba(255, 142, 43, 0.2)',
    borderRadius: 10,
    padding: 2,
  },
  toAddress: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 13,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 15,
    right: 40,
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
  centerLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#ddd',
  },
});

export default AllPending;
