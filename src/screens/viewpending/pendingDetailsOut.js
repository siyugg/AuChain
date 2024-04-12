import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useWallet} from '../wallet_connection/walletContext';
import useContract from '../../components/contractSetup';

const PendingDetailsOut = ({route, navigation}) => {
  const {product} = route.params;
  const {address} = useWallet();
  const {contract, provider, signer} = useContract;
  console.log('Product detail for Id: ', product.tokenId.toString());
  const base64 = product.base64String;

  const rejectTransfer = async tokenId => {
    try {
      await contract.rejectTransfer(tokenId);
      console.log('Transfer Rejected');
    } catch (error) {
      console.error('Error in rejecting transaction: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Pending Details</Text>
        </View>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${product.ipfsData.base64String}`,
          }}
          style={styles.productImage}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.productName}</Text>
          <Text style={styles.productId}>
            Product Id: {product.ipfsData.productId}
          </Text>
          <Text style={styles.productName}>
            Product Name: {product.ipfsData.productName}
          </Text>
          <Text style={styles.creationDate}>
            Created on: {product.ipfsData.manufactureDate}
          </Text>
          <Text style={styles.creatorInfo}>
            Pending transfer to: {product.toAddress}
          </Text>
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonReject}>
              <Text onPress={rejectTransfer} style={styles.buttonText}>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 100,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 110,
  },
  detailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  buttonReject: {
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
    marginBottom: 25,
    backgroundColor: 'red',
    marginHorizontal: 10,
    width: '45%',
  },
  productTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productId: {
    fontSize: 15,
    marginBottom: 5,
  },
  productName: {
    fontSize: 15,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  purchaseDate: {
    fontSize: 15,
    marginBottom: 20,
  },
  creatorInfo: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  creationDate: {
    fontSize: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PendingDetailsOut;
