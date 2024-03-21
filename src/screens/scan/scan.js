import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import {useWallet} from '../wallet_connection/walletContext';
import contract from '../../components/contractSetup';
import useContract from '../../components/contractSetup';

const ScanPage = () => {
  const [scannedData, setScannedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [viewFocused, setViewFocused] = useState(false);
  const navigation = useNavigation();
  const {address} = useWallet();
  const {contract} = useContract;

  const checkOwner0 = async () => {
    ownerAddress = await contract.ownerOf(decryptedData.tokenId);
    console.log(ownerAddress);
  };

  const checkOwner = async tokenId => {
    try {
      const ownerAddress = await contract.ownerOf(tokenId);
      console.log('Owner address:', ownerAddress);

      if (ownerAddress === address) {
        // If owner address matches user address, navigate to QrInfo screen
        navigation.navigate('QrInfo', {decryptedData: decryptedData});
      } else {
        // If owner address doesn't match user address, display an alert
        Alert.alert('Alert', 'You are not the owner of this token.');
      }
    } catch (error) {
      console.error('Error checking owner:', error);
      Alert.alert('Error', 'Failed to check owner.');
    }
  };

  const handleQrScan = async data => {
    if (!isDecrypted) {
      setScannedData(data);

      // Decrypt the scanned data
      const secretKey = 'ok'; // Add your secret key here
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      const decryptedDataObject = JSON.parse(decryptedData);
      const tokenId = decryptedDataObject.tokenId;
      // console.log(decryptedData);

      setDecryptedData(decryptedData);
      setIsDecrypted(true);
      checkOwner(tokenId);

      // Navigate to qrInfoPage and pass the decrypted data as a parameter
      navigation.navigate('QrInfo', {decryptedData: decryptedData});
    }
  };

  // Use useFocusEffect to handle focus and blur events
  useFocusEffect(
    React.useCallback(() => {
      setViewFocused(true); // Set viewFocused to true when screen is focused

      return () => {
        setViewFocused(false); // Set viewFocused to false when screen is blurred
        setIsDecrypted(false); // Reset decryption flag
      };
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      {viewFocused && ( // Render camera only when view is focused
        <RNCamera
          style={{flex: 1}}
          onBarCodeRead={data => handleQrScan(data.data)}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
      )}
      {scannedData !== '' && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: 20,
          }}>
          <Text>Scanned QR Code: {scannedData}</Text>
          <Text>Decrypted Data: {decryptedData}</Text>
        </View>
      )}
    </View>
  );
};

export default ScanPage;
