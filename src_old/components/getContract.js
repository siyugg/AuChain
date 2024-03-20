import React, {useState, useRef, useContext, useEffect} from 'react';
import {useWallet} from '../screens/wallet_connection/walletContext';
import {ethers} from 'ethers';
import {contractAddress, contractABI} from '../data/contractInfo';

const {address, isConnected, provider} = useWallet();
const ganacheUrl = process.env.REACT_APP_GANACHE_URL;
const privateKey = process.env.REACT_APP_ACCOUNT_PRIVATE_KEY;

const activateContract = async ({cid}) => {
  // 2.Connect to Metamask
  console.log(`Attempting to connect to Ganache at ${ganacheUrl}`);
  const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);
  // console.log('Provider instantiated:', provider);

  const signer = new ethers.Wallet(privateKey, provider);
  // console.log('signer ready: ', signer);

  // Connect to contract
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log('Initiating transaction');
  try {
    const transaction = await contract.safeMint(address, cid, {
      gasLimit: 285000,
      value: ethers.utils.parseEther('0.05'),
    });
    console.log('Transaction initiated: ', transaction);
    const receipt = await transaction.wait();
    console.log('receipt: ', receipt);
    balance = await contract.balanceOf(address);
    console.log('assets balance: ', balance.toString());
  } catch (error) {
    console.error('Error in initiating transaction: ', error);
  }
};

export default activateContract;
