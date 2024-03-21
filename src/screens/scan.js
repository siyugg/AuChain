import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useWallet} from './wallet_connection/walletContext';
import contract from '../components/contractSetup';

const ScanPage = () => {
  const [scannedData, setScannedData] = useState('');
  const {address} = useWallet();

  const onBarcodeScanned = async ({data}) => {
    setScannedData(data);
    // Call handleQrScan function with the scanned data
    handleQrScan(data);
  };

  const handleQrScan = async scannedData => {
    const tokenId = scannedData.tokenId;
    console.log(tokenId);
    // Call other functions or perform actions based on the scanned data
    // For example:
    // const qrOwner = await contract.ownerOf(tokenId);
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        style={{flex: 1}}
        onBarCodeRead={onBarcodeScanned}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      />
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
        </View>
      )}
    </View>
  );
};

export default ScanPage;
