import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Ionicons} from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import {CurrentRenderContext} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native'; // or your navigation library
import 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');

const ViewPending = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Scan QR</Text>
        </View>
        {/* Body */}
        <View style={styles.body}>
          <Text>Insert Scan Features</Text>
          {/* <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => navigation.navigate('ProductStackNa')}
              style={styles.buttonText}>
              View My Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Pending</Text>
          </TouchableOpacity> */}
        </View>
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
export default ViewPending;
