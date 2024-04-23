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

const PendingDetailsIn = ({route, navigation}) => {
  const {product} = route.params;
  const {contract, signer} = useWallet();
  // const {contract, signer} = useContract;
  console.log('Product detail for Id: ', product.tokenId.toString());

  const acceptTransfer = async tokenId => {
    try {
      await contract
        .connect(signer)
        .acceptTransfer(tokenId)
        .then(() => navigation.navigate('AllPending'));
      console.log('Transfer accepted');
    } catch (error) {
      console.error('Error in accepting transaction: ', error);
    }
  };

  const rejectTransfer = async tokenId => {
    try {
      await contract
        .connect(signer)
        .rejectTransfer(tokenId)
        .then(navigation.navigate('AllPending'));
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
        </View>
        <View style={styles.creatorInfoContainer}>
          <Text style={styles.creatorInfo}>
            Pending transfer from: {product.fromAddress}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonAccept}>
            <MaterialIcons name="check" size={20} color="white" />
            <Text
              style={styles.buttonText}
              onPress={() => acceptTransfer(product.tokenId)}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonReject}>
            <MaterialIcons name="close" size={20} color="white" />
            <Text
              style={styles.buttonText}
              onPress={() => rejectTransfer(product.tokenId)}>
              Reject
            </Text>
          </TouchableOpacity>
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
    alignItems: 'right',
    left: 100,
  },
  buttonAccept: {
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
    backgroundColor: 'green',
    marginHorizontal: 10,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  creatorInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 142, 43, 0.2)',
    width: '95%',
    alignSelf: 'center',
  },
  creatorInfo: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  creationDate: {
    fontSize: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PendingDetailsIn;
