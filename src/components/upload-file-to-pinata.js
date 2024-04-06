import axios from 'axios';

const pinataFileUploader = async productInfo => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const pinataAPIKey = process.env.REACT_APP_PINATA_API_KEY;
  const pinataSecretAPIKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

  try {
    const response = await axios.post(url, productInfo, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: pinataAPIKey,
        pinata_secret_api_key: pinataSecretAPIKey,
      },
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading product information:', error);
    return null;
  }
};

export default pinataFileUploader;
