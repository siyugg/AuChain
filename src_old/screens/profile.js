import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import WalletConnectionManager from './connectwallet';
import {useNavigation} from '@react-navigation/native'; // or your navigation library
import {useWallet} from './wallet_connection/walletContext';
const ProfilePage = () => {
  const navigation = useNavigation();
  const {address, isConnected, connectWallet, disconnectWallet} = useWallet();
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
          <TouchableOpacity>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <Image
            source={{uri: 'your-profile-image-url'}}
            style={styles.profileImage}
          />
        </View>
        {/* <WalletConnectionManager /> */}

        <View>
          {isConnected ? (
            <>
              <Text>Your Address:</Text>
              <Text>{address}</Text>
              <Button title="Disconnect" onPress={handleButtonPress}></Button>
            </>
          ) : (
            <>
              <Button title="Connect" onPress={handleButtonPress}></Button>
            </>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mine a Token</Text>
          <Text style={styles.sectionDescription}></Text>
          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => {
                try {
                  navigation.navigate('createNewToken');
                } catch (error) {
                  console.log('unable to open', error);
                }
              }}
              style={styles.buttonText}>
              Create New Token
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.sectionDescription}></Text>
          <SettingItem title="Account information" iconName="person-outline" />
          <SettingItem title="Friends" iconName="people-outline" />
          <SettingItem title="Notifications" iconName="notifications-none" />
        </View>
        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>Privacy</Text> */}
          <Text style={styles.sectionDescription}></Text>
          <SettingItem title="Security" iconName="security" />
          <SettingItem title="Login details" iconName="input" />
          <SettingItem title="Payment" iconName="payment" />
          <SettingItem title="Privacy" iconName="privacy-tip" />
        </View>
        <Button title="Lock Wallet" onPress={{}} />
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
    justifyContent: 'space-between',
    padding: 16,
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  button: {
    backgroundColor: '#f0f0f0', // Light gray background for the button
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
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfilePage;
