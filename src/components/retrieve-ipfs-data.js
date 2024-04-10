import React from 'react';
import axios from 'axios';

const fetchIPFSData = async cid => {
  const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
  console.log('Fetching data from IPFS for CID:', cid);
  try {
    const response = await fetch(url);
    console.log('Response status:', response.status);
    if (!response.ok)
      throw new Error(`Failed to fetch data from IPFS for CID: ${cid}`);
    const data = await response.json();

    const {base64, ...textData} = data;
    console.log('Text data:', textData);

    // console.log(`Fetched IPFS data for CID ${cid}:`, base64, textData);
    return data;
  } catch (error) {
    console.error(`Error fetching IPFS data for CID ${cid}:`, error);
    return null;
  }
};

export default fetchIPFSData;
