// // import React from 'react';
// // import {Alert, View, Text} from 'react-native';
// // import {RNCamera} from 'react-native-camera';
// // import QRCodeScanner from 'react-native-qrcode-scanner';

// // const QRScanner = () => {
// //   const onSuccess = e => {
// //     Alert.alert('QR Code', e.data);
// //     // Handle the scanned data from e.data
// //   };

// //   return (
// //     <View style={{flex: 1}}>
// //       <QRCodeScanner
// //         onRead={onSuccess}
// //         flashMode={RNCamera.Constants.FlashMode.auto}
// //         topContent={
// //           <View>
// //             <Text>Scan your QR code</Text>
// //           </View>
// //         }
// //         bottomContent={
// //           <View>
// //             <Text>Point your camera at a QR code</Text>
// //           </View>
// //         }
// //       />
// //     </View>
// //   );
// // };
// // export default QRScanner;
// import React from 'react';
// import {Alert, View, Text} from 'react-native';
// import {RNCamera} from 'react-native-camera'; // Ensure it's installed for QRCodeScanner to work
// import QRCodeScanner from 'react-native-qrcode-scanner';

// const ScanPage = () => {
//   const onSuccess = e => {
//     Alert.alert('QR Code', e.data); // This will show an alert with the QR code data
//     // Handle the scanned data from e.data here
//   };

//   return (
//     <View style={{flex: 1}}>
//       <QRCodeScanner
//         onRead={onSuccess}
//         flashMode={RNCamera.Constants.FlashMode.auto}
//         topContent={
//           <View>
//             <Text>Scan your QR code</Text>
//           </View>
//         }
//         bottomContent={
//           <View>
//             <Text>Point your camera at a QR code</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// export default ScanPage;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ScanPage = () => {
  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ScanPage;
