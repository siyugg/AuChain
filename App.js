import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppNavigator from './src/navigators/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import HomeTab from './src/screens/HomeTab';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Hello, world!</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

// export default App;

export default function App() {
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
}
