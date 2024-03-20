import axios from 'axios';

const pinataFileUpload = async productInfo => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  // Using REACT_APP_ prefix for environment variables
  const pinataAPIKey = process.env.REACT_APP_PINATA_API_KEY;
  const pinataSecretAPIKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
  console.log('API Key:', process.env.REACT_APP_PINATA_API_KEY);
  console.log('Secret Key:', process.env.REACT_APP_PINATA_SECRET_API_KEY);

  try {
    const response = await axios.post(url, productInfo, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: pinataAPIKey,
        pinata_secret_api_key: pinataSecretAPIKey,
      },
    });

    console.log('Product info uploaded:', response.data);
    return response.data.IpfsHash; // Return the CID (IpfsHash)
  } catch (error) {
    console.error('Error uploading product information:', error);
    return null;
  }
};

export default pinataFileUpload;
