import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';

const AllPending = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pending Transactions</Text>
      </View>
      <View style={styles.transactionCard}>
        <Image
          source={require('../images/c-bag.png')} // Replace with actual image path
          style={styles.productImage}
        />
        <Text style={styles.productTitle}>H Bag</Text>
        <Text style={styles.productId}>Product ID: AUT10897562</Text>
        <Text style={styles.productPrice}>6969 ETH</Text>
        {/* Additional transaction details */}
      </View>
      <TouchableOpacity style={styles.approveButton} onPress={() => {}}>
        <Text style={styles.approveButtonText}>Approve Transfer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  transactionCard: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9', // Use appropriate color
    alignItems: 'center',
    // Add shadow and other styling as needed
  },
  productImage: {
    width: 100, // Set image size as needed
    height: 100, // Set image size as needed
    resizeMode: 'contain',
  },
  productTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productId: {
    fontSize: 16,
    color: 'grey',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  approveButton: {
    backgroundColor: '#0000ff', // Replace with your button color
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add styles for any other elements as needed
});

export default AllPending;
