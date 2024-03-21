import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const QrInfo = () => {
  return (
    <View style={styles.container}>
      <Text>QRInfo here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrInfo;
