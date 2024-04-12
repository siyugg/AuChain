import {ethers} from 'ethers';
import {contractAddress, contractABI} from '../data/contractInfo';

const ganacheUrl = process.env.REACT_APP_GANACHE_URL;
const privateKey = process.env.REACT_APP_ACCOUNT_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, signer);

const useContract = {
  provider,
  signer,
  contract,
};

export default useContract;
