import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import fetchIPFSData from '../../components/retrieve-ipfs-data';

const QrInfo = ({route}) => {
  const {decryptedData} = route.params;
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('qrinfo: ', decryptedData);
    const decryptedDataObject = JSON.parse(decryptedData);
    const cid = decryptedDataObject.cid;

    const fetchProductData = async cid => {
      try {
        const data = await fetchIPFSData(cid);
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : productData ? (
        <View>
          <Text>Product Name: {productData.productName}</Text>
          <Text>Manufacture Date: {productData.manufactureDate}</Text>
          <Text>Product ID: {productData.productId}</Text>
        </View>
      ) : (
        <Text>No product data found for CID: {decryptedData.cid}</Text>
      )}
    </View>
  );
};

export default QrInfo;
