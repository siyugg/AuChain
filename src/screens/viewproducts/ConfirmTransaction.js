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
import ButtonBig from '../../../assets/common/buttonBig';

const {width} = Dimensions.get('screen');

const ConfirmTransaction = ({route, navigation, item}) => {
  const [recipientName, setRecipientName] = useState('');
  const {product, recipientAddress} = route.params;
  const {address} = useWallet();
  const gasLimit = ethers.utils.hexlify(6721975);
  const {contract, provider, signer} = useContract;
  const base64 = product.base64String;

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
    try {
      const resultTokenId = product.tokenId.toNumber();
      console.log(resultTokenId);

      // Initiating the transfer directly
      const tx = await contract
        .connect(signer)
        .initiateTransfer(recipientAddress, product.tokenId, {
          gasLimit: gasLimit,
        });

      const transactionHash = tx.hash;
      refreshProductList();

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log('Transaction was mined in block:', receipt.blockNumber);

      console.log('Transaction success');
      navigation.navigate('SuccessTransaction', {
        product: product,
        recipientAddress: recipientAddress,
      });
    } catch (error) {
      console.log('Failed to transfer ownership:', error);
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
          <Image
            source={{uri: `data:image/jpeg;base64,${base64}`}}
            style={styles.productImage}
          />
          <Text style={styles.productTitle}>
            <Text style={styles.nameText}>Product Name: </Text>
            <Text>{product.productName} </Text>
          </Text>
          <Text style={styles.productId}>
            <Text style={styles.idText}>Product Id: </Text>
            {product.productId}
          </Text>
          {/* <Text style={styles.productPrice}>{product.productId}</Text> */}
          {/* <View style={styles.toWrapper}> */}
          <Text style={styles.transferTo}>Transfer to:</Text>
          <Text style={styles.recipientAddress}>{recipientAddress}</Text>
          {/* </View> */}
        </View>

        <ButtonBig title={'Transfer My Ownership'} onPress={handleTransfer} />
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: '#ddd',
  },
  detailsContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 83,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 230,
  },

  productTitle: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 100,
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-between',
  },
  nameText: {
    margin: 100,
  },
  productId: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
  },

  transferTo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40,
    marginBottom: '10',
  },
  recipientAddress: {
    alignSelf: 'center',
    fontWeight: 'bold',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    margin: 5,
    // marginTop: 30,
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
  productImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
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
