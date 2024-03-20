// import React, {useState, useEffect, useContext} from 'react';
// import {StyleSheet, Text, View, Pressable} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {
//   WalletConnectModal,
//   useWalletConnectModal,
// } from '@walletconnect/modal-react-native';
// import {WalletProvider} from './walletContext';
// import Home from './HomeTab';
// import HomePageNavigate from '../navigators/HomeStackNavigator';
// import CreateNewToken from './createNewToken';

// const projectId = '91068e323d87f3f46c7c134efcf234f6';

// const providerMetadata = {
//   name: 'Authentic8',
//   description: 'Authentic8',
//   // url: 'https://authentic8.com/',
//   // icons: ['https://your-project-logo.com/'],
//   // redirect: {
//   //   native: 'YOUR_APP_SCHEME://',
//   //   universal: 'YOUR_APP_UNIVERSAL_LINK.com',
//   // },
// };

// // Parent component to manage wallet connection state
// export default function WalletConnectionManager() {
//   const {open, isConnected, address, provider} = useWalletConnectModal();
//   const navigation = useNavigation();

//   const handleButtonPress = async () => {
//     if (isConnected) {
//       return provider?.disconnect();
//     } else {
//       open();
//     }
//   };

//   return (
//     <>
//       <ConnectWallet
//         isConnected={isConnected}
//         address={address}
//         handleButtonPress={handleButtonPress}
//       />
//       <CreateNewToken address={address} isConnected={isConnected} />
//     </>
//   );
// }

// // export default function WalletConnectionManager() {
// //   const {open, isConnected, address, provider} = useWalletConnectModal();
// //   const navigation = useNavigation();
// //   const {setWalletAddress, setIsConnected} = useContext(WalletContext); // Use context to set wallet details

// //   // Update context whenever the connection status or address changes
// //   React.useEffect(() => {
// //     setIsConnected(isConnected);
// //     setWalletAddress(address);
// //   }, [isConnected, address, setIsConnected, setWalletAddress]);

// //   const handleButtonPress = async () => {
// //     if (isConnected) {
// //       provider?.disconnect();
// //       setIsConnected(false); // Update context on disconnect
// //       setWalletAddress(''); // Clear the address in context
// //     } else {
// //       open();
// //     }
// //   };

// //   // Depending on your app structure, you might need to adjust how you use the navigation and isConnected state
// //   return (
// //     <ConnectWallet
// //       isConnected={isConnected}
// //       address={address}
// //       handleButtonPress={handleButtonPress}
// //     />
// //   );
// // }

// // ConnectWallet component
// function ConnectWallet({isConnected, address, handleButtonPress}) {
//   const navigation = useNavigation();

//   useEffect(() => {
//     if (isConnected) {
//       navigation.navigate('Home');
//     }
//   }, [isConnected, navigation]);

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.heading}>Connect to Metamask</Text> */}
//       <Text>{isConnected ? address : 'Not Connected'}</Text>
//       <Pressable onPress={handleButtonPress} style={styles.pressableMargin}>
//         <Text>{isConnected ? 'Disconnect' : 'Connect'}</Text>
//       </Pressable>

//       <WalletConnectModal
//         explorerRecommendedWalletIds={[
//           'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
//         ]}
//         explorerExcludedWalletIds={'ALL'}
//         projectId={projectId}
//         providerMetadata={providerMetadata}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   pressableMargin: {
//     marginTop: 16,
//   },
// });
