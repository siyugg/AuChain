import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  // Button,
  Pressable,
} from 'react-native';
import {ethers} from 'ethers';
import ButtonBig from '../../../assets/common/buttonBig';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import WalletConnectionManager from '../wallet_connection/WalletConnectionManager';
import {useNavigation} from '@react-navigation/native'; // or your navigation library
import {useWallet} from '../wallet_connection/walletContext';
import useContract from '../../components/contractSetup';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [showFullText, setShowFullText] = useState(false);

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

  const {address, isConnected, connectWallet, disconnectWallet, provider} =
    useWallet();
  const handleButtonPress = () => {
    if (isConnected) {
      console.log('wallet is connected');
      disconnectWallet();
    } else {
      console.log('Wallet is not connected');
      connectWallet();
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.account}>
          {isConnected ? (
            <>
              <Text style={styles.accountHeader}>Your Address:</Text>
              {/* <Text>{address}</Text> */}
              <TouchableOpacity
                onPress={toggleTextVisibility}
                style={styles.addressField}>
                <Text
                  style={showFullText ? styles.fullText : styles.revealText}>
                  {showFullText ? address : 'Tap to Reveal'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleButtonPress}
                style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Disconnect</Text>
              </TouchableOpacity>
              {/* <Button
                title="Disconnect"
                onPress={handleButtonPress}
                style={styles.button2}></Button> */}
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={handleButtonPress}
                style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Connect</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mine a Token</Text>
          <Text style={styles.sectionDescription}></Text>
          <ButtonBig
            title={'Create New Token'}
            onPress={() => {
              navigation.navigate('CreateNewToken');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SettingItem = ({title, iconName}) => (
  <TouchableOpacity style={styles.settingItem}>
    {/* <Icon name={iconName} size={24} color="black" /> */}
    <Text style={styles.itemTitle}>{title}</Text>
    {/* <Icon name="chevron-right" size={24} color="black" /> */}
  </TouchableOpacity>
);

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
    justifyContent: 'center',
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pressableMargin: {
    marginTop: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },

  addressField: {
    marginTop: 20,
    height: '20%',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  revealText: {
    fontStyle: 'italic',
    color: '#aaa',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  fullText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
  },

  smallButton: {
    backgroundColor: '#0ac2ff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    height: 50,
    width: '30%',
  },
  smallButtonText: {
    fontSize: 16,
    fontWeight: '500',
    width: '90%',
    height: 'fit',
    textAlign: 'center',
    color: 'white',
  },

  account: {
    marginVertical: 30,
    alignItems: 'center',
    // backgroundColor: '#0a74ff',
    paddingTop: 20,
    justifyContent: 'center',
  },

  accountHeader: {
    fontSize: 20,
  },
  section: {
    marginTop: 6,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
  },
  sectionDescription: {
    color: 'gray',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default ProfilePage;
