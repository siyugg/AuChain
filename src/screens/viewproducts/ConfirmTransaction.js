import React, {useState, useEffect} from 'react';
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
import useContract from '../../components/contractSetup';
import {useWallet} from '../wallet_connection/walletContext';
import {Web3Provider} from '@ethersproject/providers';

const {width} = Dimensions.get('screen');

const ConfirmTransaction = ({route, navigation, item}) => {
  const [recipientName, setRecipientName] = useState('');
  const {product, recipientAddress} = route.params;
  const {address, provider: web3Provider} = useWallet();
  const gasLimit = ethers.utils.hexlify(6721975);
  const {contract} = useContract;
  // const [signer, setSigner] = useState('');

  //refer to contractSetup for getting signer through private key
  // useEffect(() => {
  //   const connectSigner = () => {
  //     const provider = new ethers.providers.Web3Provider(web3Provider);
  //     let signer;
  //     let signerAddress;

  //     if (provider && provider.getSigner) {
  //       // Check if provider and getSigner method exist
  //       signer = provider.getSigner(); // Obtain signer from provider
  //       setSigner(signer);
  //       signer.getAddress().then(address => {
  //         signerAddress = ethers.utils.getAddress(address);
  //         console.log('signer address: ', signerAddress);
  //       });
  //     }
  //   };
  // });

  console.log('signer: ', signer);
  // After successful transaction
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
    // setProducts(updatedProducts);
  };

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
        .initiateTransfer(recipientAddress, product.tokenId, {
          gasLimit: gasLimit,
        });
      // const txResponse = await signer.sendTransaction(tx);

      const transactionHash = tx.hash;
      console.log('transactionHash is ' + transactionHash);

      // Wait for the transaction to be mined (optional)
      const receipt = await tx.wait();
      console.log('Transaction was mined in block:', receipt.blockNumber);

      // await tx.wait();
      console.log(tx);
      console.log('success');
      refreshProductList();

      navigation.navigate('SuccessTransaction', {product: product});
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
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsContainer: {
    padding: 20,
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
    backgroundColor: '#f0f0f0',
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
    borderTopColor: '#ddd',
  },
});
export default ConfirmTransaction;