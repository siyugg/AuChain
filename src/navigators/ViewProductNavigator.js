import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import ProductListScreen from '../screens/viewproducts/AllProducts';
import ProductDetailsScreen from '../screens/viewproducts/ProductDetails';
import TransferOwnership from '../screens/viewproducts/transferownership';
import TransactionDetails from '../screens/viewproducts/transactionDetails';
import ConfirmTransaction from '../screens/viewproducts/ConfirmTransaction';
import SuccessTransaction from '../screens/viewproducts/SuccessTransaction';
// import PastTransaction from '../screens/pasttransaction';

const ProductStack = createNativeStackNavigator();

function ViewProduct(initialRouteName) {
  return (
    <ProductStack.Navigator initialRouteName="AllProducts">
      <ProductStack.Screen
        name="AllProducts"
        component={ProductListScreen}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="TransferOwnership"
        component={TransferOwnership}
        options={{headerShown: false}}
      />
      {/* <ProductStack.Screen
        name="PastTransaction"
        component={PastTransaction}
        options={{headerShown: false}}
      /> */}
      <ProductStack.Screen
        name="TransactionDetails"
        component={TransactionDetails}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="ConfirmTransaction"
        component={ConfirmTransaction}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="SuccessTransaction"
        component={SuccessTransaction}
        options={{headerShown: false}}
      />
    </ProductStack.Navigator>
  );
}

export default ViewProduct;
