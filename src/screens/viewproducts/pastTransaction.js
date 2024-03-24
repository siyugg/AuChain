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

  listHistory = async () => {
    console.log('Product detail for Id: ', product.tokenId.toString());
    const tokenId = product.tokenId.toString();
    const ownersOfToken = await contract.viewOwners(tokenId);
    console.log(ownersOfToken);

    setOwnersList(ownersOfToken);
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
          <Text style={styles.headerText}>Past Transaction</Text>
          <View style={styles.body}>
            <Text style={styles.bodyHeader}>Transaction History</Text>
            <View style={styles.ownersList}>
              {ownersList.map((owner, index) => (
                <Text key={index} style={styles.owner}>
                  {owner}
                </Text>
              ))}
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 230,
    marginTop: 20,
    alignItems: 'center',
  },
  bodyHeader: {
    fontsize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
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
    borderTopColor: '#ddd',
  },
  ownerList: {
    marginTop: 30,
    alignItems: 'center',
  },
  owner: {
    fontSize: 14,
    marginVertical: 5,
  },
});
export default PastTransaction;
