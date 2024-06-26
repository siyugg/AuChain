import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useWallet} from '../wallet_connection/walletContext';
import fetchIPFSData from '../../components/retrieve-ipfs-data';

const Item = ({name, id, base64, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.item}>
      <Image
        source={{uri: `data:image/jpeg;base64,${base64}`}}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.productName}>{name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProductListScreen = () => {
  const {address, isConnected, signer, contract} = useWallet();
  const [productInfo, setProductInfo] = useState(null);
  const [products, setProducts] = useState([]);
  // const {contract, signer} = useContract();
  const navigation = useNavigation();
  const [base64Data, setBase64Data] = useState(null);

  useEffect(() => {
    console.log('all prodcuts: ', signer, contract);
    loadProducts();
  }, []);

  if (!isConnected) {
    console.log('your app is not connected');
    return null;
  }

  const renderEachItem = ({item}) => (
    <Item
      name={item.productName}
      id={item.productId}
      manuDate={item.manufactureDate}
      base64={item.base64String}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}
    />
  );

  const loadProducts = async () => {
    try {
      const balance = await contract.balanceOf(address);
      console.log('balance of user:', balance.toString());
      const productPromises = [];

      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const cid = await contract.getCID(tokenId);

        const productPromise = fetchIPFSData(cid).then(data => ({
          ...data,
          tokenId: tokenId,
        }));
        productPromises.push(productPromise);
      }

      const productsData = await Promise.all(productPromises);
      const validProducts = productsData.filter(product => product !== null);
      setProducts(validProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Products</Text>
        </View>
        <FlatList
          data={products}
          renderItem={renderEachItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {base64Data && (
          <Image
            source={{uri: `data:image/jpeg;base64,${base64Data}`}}
            style={{width: 200, height: 200}}
          />
        )}
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
  },
  header: {
    flexDirection: 'row',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 110,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    marginBottom: 5,
  },
  id: {
    marginBottom: 5,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  username: {
    color: 'gray',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  change: {
    color: 'green',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default ProductListScreen;
