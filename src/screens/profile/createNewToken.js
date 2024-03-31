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
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ButtonBig from '../../../assets/common/buttonBig';
import ButtonSmall from '../../../assets/common/buttonSmall';
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
import {abort} from 'process';
import ViewShot from 'react-native-view-shot';

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
  const [showQRModal, setShowQRModal] = useState(false);
  const viewShotRef = useRef();
  const [saveImageSuccess, setSaveImageSuccess] = useState(false);

  // useEffect(() => {
  //   const date = new Date();
  //   setManufactureDate(date);
  //   console.log(manufactureDate);
  // });

  //uncomment this
  useEffect(() => {
    // Get today's date
    const today = new Date();

    // Format the date as YYYY-MM-DD
    const formattedDate = today.toISOString().split('T')[0];

    // Set the formatted date as the manufacture date
    setManufactureDate(formattedDate);
  }, []);

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
    // Connect to contract
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

  const handleSaveImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const saveResult = await CameraRoll.saveAsset(uri);
      setSaveImageSuccess(true);
      console.log('image saved', saveResult);
    } catch (error) {
      console.error('faield to save image: ', error);
    }
  };

  const handleGenerateQR = async () => {
    try {
      // Upload product information to IPFS
      const blob = await fetch(selectedImage).then(response => response.blob());
      const uploadedProductInfo = {
        productName,
        productId,
        manufactureDate,
        blob,
      };
      setProductInfo(uploadedProductInfo);
      const uploadedCid = await pinataFileUploader(uploadedProductInfo);
      setCid(uploadedCid);
      console.log(`Upload success! IPFS hash: ${uploadedCid}`);

      const fetchedData = fetchIPFSData(uploadedCid);

      console.log(fetchedData);

      await activateContract({cid: uploadedCid});

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
        setShowQRModal(true);
      });
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const toggleQRModal = () => {
    setShowQRModal(!showQRModal);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mint a Token</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.detailsImage}>Upload Product Image</Text>

            {selectedImage ? (
              <>
                <View style={styles.selectedImageT}>
                  {selectedImage && (
                    <Image
                      source={{uri: selectedImage}}
                      style={{width: 200, height: 200}} // Fixed size of 200px by 200px
                      resizeMode="contain"
                    />
                  )}

                  <MaterialCommunityIcons
                    onPress={removeSelectedImage}
                    name="close-circle"
                    size={42}
                    color="#0ac2ff"
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.selectedImageF}>
                  <ButtonSmall
                    title="Choose from Device"
                    onPress={openImagePicker}
                    color="#fff"
                    fontSize="1px"
                  />
                  <ButtonSmall
                    title="Open Camera"
                    onPress={handleCameraLaunch}
                    color="#fff"
                  />
                </View>
              </>
            )}
            <View style={styles.inputDetails}>
              <Text style={styles.details}>Product Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
              />
              <Text style={styles.details}>Product ID:</Text>
              <TextInput
                style={styles.input}
                placeholder="Product ID"
                value={productId}
                onChangeText={setProductId}
              />
              <Text style={styles.details}>Manufacture Date:</Text>

              <TextInput
                style={styles.input}
                placeholder="Manufacture Date"
                value={manufactureDate}
                onChangeText={setManufactureDate}
                // editable={false}
              />

              <Text style={styles.details}>Secret Key:</Text>
              <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={secretKey}
                onChangeText={setSecretKey}
              />
            </View>
          </View>
          <ButtonBig title={'Generate QR Code'} onPress={handleGenerateQR} />

          <Modal
            visible={showQRModal}
            transparent={true}
            animationType="fade"
            onRequestClose={toggleQRModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.qrtext}>Generated QR Code</Text>
                <TouchableOpacity
                  onPress={toggleQRModal}
                  style={styles.closeButton}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <ViewShot
                  ref={viewShotRef}
                  options={{format: 'png', quality: 0.9}}>
                  <View style={styles.qrContainer} ref={qrRef}>
                    <QRCode
                      value={qrValue}
                      size={200}
                      color="black"
                      backgroundColor="white"
                    />
                  </View>
                </ViewShot>

                <ButtonSmall
                  title={'Save QR Code'}
                  onPress={handleSaveImage}></ButtonSmall>

                {/* <TouchableOpacity onPress={handleSaveImage}>
                  <Text>Save QR Code to Camera Roll</Text>
                  <MaterialIcons name="save" size={30} color="blue" />
                </TouchableOpacity> */}
                {saveImageSuccess && (
                  <Text style={styles.successMessage}>
                    QR Code save to camera roll
                  </Text>
                )}
              </View>
            </View>
          </Modal>
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
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 110,
  },
  detailsImage: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 16,
    paddingTop: 10,
  },
  details: {
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  backButton: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 10,
    width: '90%',
    alignContent: 'space-between',
    alignSelf: 'center',
  },
  selectedImageT: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
  selectedImageF: {
    marginVertical: 10,
    alignItems: 'center',
  },
  qrtext: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    top: 20,
    position: 'absolute',
  },
  qrContainer: {
    marginVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 60,
    alignItems: 'center',
  },
  successMessage: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default CreateNewToken;
