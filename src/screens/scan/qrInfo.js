import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fetchIPFSData from '../../components/retrieve-ipfs-data';

const QrInfo = ({route, navigation}) => {
  const {decryptedData} = route.params;
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('qrinfo: ', decryptedData);
    const decryptedDataObject = JSON.parse(decryptedData);
    const cid = decryptedDataObject.cid;

    const fetchProductData = async cid => {
      try {
        const data = await fetchIPFSData(cid).then(data => ({
          ...data,
        }));
        console.log('Data at qr info:', data);
        setProductData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      }
    };

    fetchProductData(cid);
  }, [decryptedData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>QR Info</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : productData ? (
          <View style={styles.info}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${productData.base64String}`,
              }}
              style={styles.productImage}
            />
            <Text style={styles.name}>
              Product Name: {productData.productName}
            </Text>
            <Text style={styles.id}>Product ID: {productData.productId}</Text>
            <Text style={styles.date}>
              Manufacture Date: {productData.manufactureDate}
            </Text>
          </View>
        ) : (
          <Text>No product data found for CID: {decryptedData.cid}</Text>
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
    marginLeft: 135,
  },
  info: {
    alignItems: 'center',
    marginTop: 50,
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginVertical: 30,
  },
  name: {
    fontSize: 16,
    marginTop: 10,
  },
  id: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default QrInfo;
