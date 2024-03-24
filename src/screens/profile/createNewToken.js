import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CryptoJS from 'crypto-js';
import QRCode from 'react-native-qrcode-svg';
import {useWallet} from '../wallet_connection/walletContext';
import pinataFileUploader from '../../components/upload-file-to-pinata';
import fetchIPFSData from '../../components/retrieve-ipfs-data';
import {ethers} from 'ethers';
import {contractAddress} from '../../data/contractInfo';
import useContract from '../../components/contractSetup';
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CreateNewToken = () => {
  const {address, isConnected} = useWallet();
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [cid, setCid] = useState('');
  const [qrValue, setQrValue] = useState(' ');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef();
  const {contract} = useContract;
  const [productImage, setProductImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isConnected) {
    console.log('your app is not connected');
    return null;
  }

  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  const activateContract = async ({cid}) => {
    // 2.Connect to Metamask
    console.log('Initiating transaction');
    try {
      const transaction = await contract.safeMint(address, cid, {
        gasLimit: 6721975,
        value: ethers.utils.parseEther('0.05'),
      });
      console.log('Transaction initiated: ', transaction);
      const receipt = await transaction.wait();
      console.log('receipt: ', receipt);
      balance = await contract.balanceOf(address);
      console.log('assets balance: ', balance.toString());
      // contract.on('TokenMinted', (to, tokenId, cid) => {
      //   console.log(`Token with ID ${tokenId} minted to ${to} with CID ${cid}`);
      // });
    } catch (error) {
      console.error('Error in initiating transaction: ', error);
    }
  };

  const handleGenerateQR = async () => {
    try {
      // 1. Upload product information to IPFS
      const blob = await fetch(selectedImage).then(response => response.blob());

      const uploadedProductInfo = {
        productName,
        productId,
        manufactureDate,
        blob,
      };
      console.log(uploadedProductInfo);
      setProductInfo(uploadedProductInfo); // Update productInfo state
      const uploadedCid = await pinataFileUploader(uploadedProductInfo);
      setCid(uploadedCid); // Update CID state
      console.log(`Upload success! IPFS hash: ${uploadedCid}`);

      // fetchIPFSData(uploadedCid);
      const fetchedData = fetchIPFSData(uploadedCid);
      console.log(fetchedData);

      await activateContract({cid: uploadedCid}); // Pass the uploaded CID to activateContract
      const tokenId = contract.on('TokenMinted', (to, tokenId, cid) => {
        const qrData = {
          tokenId: tokenId.toString(),
          contractAddress: contractAddress,
          cid: cid,
        };
        const qrDataString = JSON.stringify(qrData);
        const encryptedData = CryptoJS.AES.encrypt(
          qrDataString,
          secretKey,
        ).toString();
        setQrValue(encryptedData);
        setShowQR(true);
      });
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Mine a Token</Text>
          <View style={styles.inputContainer}>
            <Text>Upload Product Image</Text>

            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={{width: 200, height: 200}} // Fixed size of 200px by 200px
                resizeMode="contain"
              />
            )}
            <View style={{marginTop: 20}}>
              <Button title="Choose from Device" onPress={openImagePicker} />
            </View>
            <View style={{marginTop: 20, marginBottom: 50}}>
              <Button title="Open Camera" onPress={handleCameraLaunch} />
            </View>

            <Text>Product Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
            />
            <Text>Product ID:</Text>
            <TextInput
              style={styles.input}
              placeholder="Product ID"
              value={productId}
              onChangeText={setProductId}
            />
            <Text>Manufacture Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Manufacture Date"
              value={manufactureDate}
              onChangeText={setManufactureDate}
            />

            <Text>Secret Key</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={secretKey}
              onChangeText={setSecretKey}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
            <Text style={styles.buttonText}>Generate QR Code</Text>
          </TouchableOpacity>
          {cid && <Text>Uploaded CID: {cid}</Text>}
          {productInfo && (
            <View>
              <Text>Product Name: {productInfo.productName}</Text>
              <Text>Product ID: {productInfo.productId}</Text>
              <Text>Manufacture Date: {productInfo.manufactureDate}</Text>
              <Image
                source={{uri: productInfo.selectedImage}}
                style={{width: 200, height: 200}} // Fixed size of 200px by 200px
                resizeMode="contain"
              />
            </View>
          )}

          {showQR && (
            <View style={styles.qrContainer} ref={qrRef}>
              <QRCode
                value={qrValue}
                size={200}
                color="black"
                backgroundColor="white"
              />
            </View>
          )}
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
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: 30,
    marginLeft: 50,
  },
});

export default CreateNewToken;
