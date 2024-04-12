import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonBig from '../../../assets/common/buttonBig';

const SuccessTransaction = ({route, navigation}) => {
  const {product, recipientAddress} = route.params;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={72}
            color="green"
            style={styles.tickIcon}
          />
          <Text style={styles.text1}>Transaction Successful</Text>
          <Text style={styles.text2}>Pending Approval from recipient:</Text>
          <Text style={styles.recipientAddress}>{recipientAddress}</Text>
        </View>

        <ButtonBig
          title={'Back to Home'}
          onPress={() => navigation.navigate('Home')}></ButtonBig>
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
    flexDirection: 'row',
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
    marginLeft: 83,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 230,
  },
  tickIcon: {
    alignSelf: 'center',
    marginTop: 100,
  },
  text1: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 15,
  },
  text2: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 100,
  },
  recipientAddress: {
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 15,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
export default SuccessTransaction;
