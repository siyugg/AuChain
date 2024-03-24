import React from 'react';
import axios from 'axios';

// const fetchIPFSData = async (cid, setProductInfo) => {
//   // Construct the URL using the CID
//   const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Failed to fetch data from IPFS');
//     const data = await response.json();
//     setProductInfo(data);
//   } catch (error) {
//     console.error('Error fetching IPFS data:', error);
//     setProductInfo(null);
//   }
// };

// export default fetchIPFSData;
// const fetchIPFSData = async cid => {
//   const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok)
//       throw new Error(`Failed to fetch data from IPFS for CID: ${cid}`);
//     const data = await response.json();
//     console.log(`Fetched IPFS data for CID ${cid}:`, data);
//     return data;
//   } catch (error) {
//     console.error(`Error fetching IPFS data for CID ${cid}:`, error);
//     return null;
//   }
// };

// export default fetchIPFSData;

// revert to this
const fetchIPFSData = async cid => {
  const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
  console.log('Fetching data from IPFS for CID:', cid);
  try {
    const response = await fetch(url);
    console.log('Response status:', response.status);
    if (!response.ok)
      throw new Error(`Failed to fetch data from IPFS for CID: ${cid}`);
    const data = await response.json();

    const {blob, ...textData} = data;

    console.log(`Fetched IPFS data for CID ${cid}:`, blob, textData);
    return data;
  } catch (error) {
    console.error(`Error fetching IPFS data for CID ${cid}:`, error);
    return null;
  }
};

export default fetchIPFSData;
