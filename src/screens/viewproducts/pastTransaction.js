import React, {useState, useEffect} from 'react';
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
import 'react-native-gesture-handler';
import useContract from '../../components/contractSetup';

const {width} = Dimensions.get('screen');

const PastTransaction = ({route, navigation}) => {
  const {product} = route.params;
  const {contract} = useContract;
  const [ownersList, setOwnersList] = useState([]);

  useEffect(() => {
    listHistory();
  }, []);

  const listHistory = async () => {
    console.log('Product detail for Id: ', product.tokenId.toString());
    const tokenId = product.tokenId.toString();
    const ownersOfToken = await contract.viewOwners(tokenId);
    console.log(ownersOfToken);

    setOwnersList(ownersOfToken.slice(1));
  };

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
          <Text style={styles.headerText}>Transaction History</Text>
        </View>
        {/* Body */}
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.ownersContainer}>
            <MaterialIcons name="lens" size={20} />
            {ownersList.map((owner, index) => (
              <View key={index} style={styles.ownerBox}>
                <Text style={styles.ownerText}>
                  Owner {index + 1}: {owner}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 80,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  ownersContainer: {
    alignItems: 'center',
  },
  ownerBox: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  ownerText: {
    fontSize: 14,
    paddingVertical: 2,
  },
});

export default PastTransaction;
