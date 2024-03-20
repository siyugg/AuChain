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
import {useNavigation} from '@react-navigation/native'; // or your navigation library
import {useRoute} from '@react-navigation/native';

// import {MaterialIcons} from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductDetails from './ProductDetails';
import 'react-native-gesture-handler';
import ProductData from '../data/data';
import contract from '../components/contractSetup';
import Button from '../../assets/common/button';
import {useWallet} from './wallet_connection/walletContext';
import fetchIPFSData from '../components/retrieve-ipfs-data';

const Item = ({name, id, manuDate, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.item}>
      {/* <Image source={image} style={styles.productImage} /> */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{name}</Text>

        <Text style={styles.id}>{id}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{manuDate}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProductListScreen = () => {
  const {address, isConnected} = useWallet();
  const [productInfo, setProductInfo] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  if (!isConnected) {
    console.log('your app is not connected');
    return null;
  }
  const navigation = useNavigation(); // hook to get the navigation object

  // const renderItem = ({item}) => (
  //   <Item
  //     name={item.name}
  //     username={item.username}
  //     price={item.price}
  //     change={item.change}
  //     image={item.image}
  //     onPress={() => navigation.navigate('ProductDetails', {product: item})}
  //   />
  // );

  const renderEachItem = ({item}) => (
    <Item
      name={item.productName}
      id={item.productId}
      manuDate={item.manufactureDate}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}
    />
  );

  const listTokens = async () => {
    console.log('getting balance');
    balance = await contract.balanceOf(address);
    console.log('balance:', balance.toString());

    for (let i = 1; i <= balance; i++) {
      currToken = await contract.tokenInfo(i);
      console.log(
        `TokenID: ${currToken.id.toString()}, Owner Address: ${
          currToken.ownerAddress
        }, CID: ${currToken.cid}`,
      );
    }
  };

  const loadProducts = async () => {
    try {
      const balance = await contract.balanceOf(address);
      console.log('balance of user:', balance.toString());
      const productPromises = [];

      for (let i = 0; i < balance.toNumber(); i++) {
        // const currToken = await contract.tokenInfo(i);
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);

        const cid = await contract.getCID(tokenId);
        // const tokenId = currToken.id.toString();
        console.log('currtoken, id: ', cid, tokenId);

        const productPromise = fetchIPFSData(cid).then(data => ({
          ...data, // Spread the fetched product data
          tokenId: tokenId, // Include the tokenId
        }));

        productPromises.push(productPromise);
      }

      const productsData = await Promise.all(productPromises);
      const validProducts = productsData.filter(product => product !== null);
      setProducts(validProducts);

      console.log(productsData);
      // setProducts(productsData);
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
        {/* <FlatList
          data={ProductData} // use the imported data
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> */}
        <FlatList
          data={products}
          renderItem={renderEachItem}
          keyExtractor={item => item.productId}
        />
        <TouchableOpacity>
          <Button onPress={listTokens} title="List Tokens"></Button>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light gray border color
  },

  backButton: {
    marginLeft: 10, // Adjust as needed
    // Add any other styling for your back button
  },
  headerText: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
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
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
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
