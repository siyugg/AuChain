import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from '../screens/home';
import AllProducts from '../screens/AllProducts';
import ProductDetails from '../screens/ProductDetails';
import ProductListScreen from '../screens/AllProducts';
import TransferOwnership from '../screens/transferownership';
import PastTransaction from '../screens/pasttransaction';
import TransactionDetails from '../screens/transactionDetails';
import ConfirmTransaction from '../screens/ConfirmTransaction';
import SuccessTransaction from '../screens/SuccessTransaction';

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
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="TransferOwnership"
        component={TransferOwnership}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="PastTransaction"
        component={PastTransaction}
        options={{headerShown: false}}
      />
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
