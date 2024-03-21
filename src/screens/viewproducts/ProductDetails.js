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
import {useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ensure this is correctly installed
import ProductListScreen from './AllProducts';
// import TransferOwnership from './transferownership';
// import PastTransaction from './pasttransaction';
import contract from '../../components/contractSetup';
import {useWallet} from '../wallet_connection/walletContext';

const ProductDetailsScreen = ({route, navigation, item}) => {
  const {product} = route.params;
  const {address} = useWallet();
  console.log(product.tokenId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Image source={product.image} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.productName}</Text>
          <Text style={styles.productId}>Product ID: {product.productId}</Text>
          <Text style={styles.productPrice}>
            {product.price} ETH ({product.usdPrice})
          </Text>
          <Text style={styles.purchaseDate}>
            Purchased on: {product.manufactureDate}
          </Text>
          <Text style={styles.creatorInfo}>Creator: {address}</Text>
          <Text style={styles.creationDate}>
            Created on: {product.manufactureDate}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text
                onPress={() =>
                  navigation.navigate('TransactionDetails', {product: product})
                }>
                Transfer Ownership
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text
                onPress={() =>
                  navigation.navigate('PastTransaction', {product: product})
                }>
                View Past Transactions
              </Text>
            </TouchableOpacity>
          </View>
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
  backButton: {
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
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
    marginBottom: 25,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productId: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  purchaseDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  creatorInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  creationDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
});

export default ProductDetailsScreen;
