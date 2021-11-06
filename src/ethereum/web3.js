import { ethers } from "ethers";
import configs from "./../config";
let provider;
let signer;
let address;
let balance;

export const connectMetamask = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    try {
      // Request account access if needed
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      address = await provider.getSigner().getAddress();
    } catch (error) {}
  } else if (window.web3) {
    // Use Mist/MetaMask's provider.
    provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider,
      "any"
    );

    try {
      await provider.send("eth_requestAccounts", []);
      await window.ethereum.enable();
      signer = provider.getSigner();
      address = await provider.getSigner().getAddress();
    } catch {}
  } else {
    provider = new ethers.providers.JsonRpcProvider(configs.FALLBACK_PROVIDER);
  }
  balance = await provider.getBalance(address);

  return {
    provider,
    signer,
    address,
    balance: (balance / Math.pow(10, 18)).toFixed(2),
  };
};
