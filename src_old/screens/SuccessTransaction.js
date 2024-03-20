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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Ionicons} from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import {CurrentRenderContext} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native'; // or your navigation library
import 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');

const SuccessTransaction = ({route, navigation, item}) => {
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
          <Text style={styles.headerText}>Transaction Successful</Text>
        </View>
        <View style={styles.detailsContainer}>
          {/* <Image
            source={require('../images/c-bag.png')}
            style={styles.productImage}
          /> */}
          <Text style={styles.productTitle}>{product.productName}</Text>
          <Text style={styles.productId}>{product.productId}</Text>
          <Text style={styles.productPrice}>{product.productId}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Recipient Address"
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            style={styles.input}
          />
          <TextInput
            placeholder="Recipient Name"
            value={recipientName}
            onChangeText={setRecipientName}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Change the color to match your theme
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light gray border color
  },
  detailsContainer: {
    padding: 20,
    // additional styles if needed
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 230,
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Light gray border color
  },
});
export default SuccessTransaction;
