import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from 'react-native';
import ButtonBig from '../../../assets/common/buttonBig';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import 'react-native-gesture-handler';

// const {width} = Dimensions.get('screen');

const TransactionDetails = ({route, navigation, item}) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const {product} = route.params;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Transaction Details</Text>
        </View>

        {/* Recipient Address Input */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Enter Recipient Address</Text>
          <TextInput
            placeholder="Enter recipient's address"
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            style={styles.input}
          />
        </View>

        {/* Recipient Name Input */}
        {/* <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Recipient Name</Text>
          <TextInput
            placeholder="Enter recipient's name"
            value={recipientName}
            onChangeText={setRecipientName}
            style={styles.input}
          /> */}
        {/* </View> */}

        <ButtonBig
          title={'Next'}
          onPress={() =>
            navigation.navigate('ConfirmTransaction', {
              product: product,
              recipientAddress: recipientAddress,
            })
          }
        />
      </View>
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
    // padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 83,
  },
  inputBox: {
    width: 400,
    marginBottom: 15,
    padding: 5,
    alignSelf: 'center',
  },
  inputLabel: {
    paddingTop: 10,
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
    // width: '95%',
    alignSelf: 'center',
  },
  // button: {
  //   backgroundColor: '#f0f0f0',
  //   borderRadius: 10,
  //   padding: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   elevation: 3,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 2},
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  //   marginTop: 10,
  // },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TransactionDetails;
