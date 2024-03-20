import React, {useState} from 'react';
import {ethers} from 'ethers';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import contract from '../components/contractSetup';
import {useWallet} from './wallet_connection/walletContext';

const {width} = Dimensions.get('screen');

const ConfirmTransaction = ({route, navigation, item}) => {
  // const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const {product, recipientAddress} = route.params;
  const {address} = useWallet();
  const gasLimit = ethers.utils.hexlify(6721975); // Example gas limit, you may need more or less

  // This function should be called after a successful transaction.
  const refreshProductList = async () => {
    const updatedProducts = [];
    const balance = await contract.balanceOf(address);

    for (let i = 0; i < balance.toNumber(); i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const cid = await contract.getCID(tokenId);
      const productData = await fetchIPFSData(cid);
      updatedProducts.push({
        ...productData,
        tokenId: tokenId.toString(),
      });
    }

    setProducts(updatedProducts);
  };

  // Call this function after the transaction is confirmed

  const handleTransfer = async () => {
    console.log('attempting to initiate transaction');

    let owner = await contract.ownerOf(product.tokenId);
    if (owner !== address) {
      const isApproved = await contract.getApproved(product.tokenId);
      const isOperatorApproved = await contract.isApprovedForAll(
        owner,
        address,
      );
      if (address !== isApproved && !isOperatorApproved) {
        console.log(
          'The caller is neither the owner nor approved to transfer this token.',
        );
        return;
      }
    }

    try {
      console.log(
        `from ${address}, to: ${recipientAddress}, id:${product.tokenId}`,
      );
      owner = await contract.ownerOf(product.tokenId);
      console.log(`owner of ${product.tokenId} is ${owner}`);

      const tx = await contract
        .connect(signer)
        .transferFrom(address, recipientAddress, product.tokenId, {
          gasLimit: gasLimit,
        });
      await tx.wait();
      console.log(tx);
      console.log('success');
      refreshProductList();

      // navigation.navigate('SuccessTransaction');
    } catch (error) {
      console.log('Failed to transferownership', error);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Confirm Transaction</Text>
        </View>
        <View style={styles.detailsContainer}>
          {/* <Image
            source={require('../images/c-bag.png')}
            style={styles.productImage}
          /> */}
          <Text style={styles.productTitle}>{product.productName}</Text>
          <Text style={styles.productId}>{product.productId}</Text>
          <Text style={styles.productPrice}>{product.productId}</Text>
          <Text>Transfer to: {recipientAddress}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleTransfer}>
          <Text style={styles.buttonText}>Transfer my Ownership</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Change the color to match your theme
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light gray border color
  },
  detailsContainer: {
    padding: 20,
    // additional styles if needed
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 230,
  },
  button: {
    backgroundColor: '#f0f0f0', // Light gray background for the button
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Light gray border color
  },
});
export default ConfirmTransaction;
